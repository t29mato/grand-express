"use client";

import { create } from "zustand";
import {
  CityId,
  CountryId,
  GameSessionId,
  ItemKey,
  NodeId,
  PropertyIndex,
  PropertyRef,
  cityIdToNodeId,
} from "../../domain/shared-kernel/ids";
import { GameSession, currentPlayer, isOver } from "../../domain/game-session/game-session";
import { isCityNode } from "../../domain/board/node";
import { QuizQuestion, QuizTier } from "../../domain/quiz/quiz-question";
import { CpuLevel } from "../../domain/cpu/cpu-level";
import { GameEngineContext, createGameEngineContext } from "../../application/game-engine-context";
import { JsonCountryContentRepository } from "../../infrastructure/content/json-country-content-repository";
import { LocalStorageGameRepository } from "../../infrastructure/persistence/local-storage-game-repository";
import { CryptoRandomAdapter } from "../../infrastructure/random/crypto-random-adapter";
import { WebAudioSoundAdapter } from "../../infrastructure/audio/web-audio-sound-adapter";
import { startGame, PlayerSetup } from "../../application/use-cases/start-game/start-game.use-case";
import { rollOneDie } from "../../application/use-cases/roll-dice/roll-dice.use-case";
import { reachableNodesFor, movePlayerAlongPath } from "../../application/use-cases/move-player/move-player.use-case";
import { settleSpiritAfterTurn } from "../../application/use-cases/move-player/settle-spirit-after-turn.use-case";
import { advanceTurn } from "../../application/use-cases/advance-turn/advance-turn.use-case";
import { answerQuiz } from "../../application/use-cases/answer-quiz/answer-quiz.use-case";
import { landOnMoneySquare } from "../../application/use-cases/land-on-square/money-square.use-case";
import { landOnCardSquare } from "../../application/use-cases/land-on-square/card-square.use-case";
import { arriveAtDestination } from "../../application/use-cases/land-on-square/arrive-destination.use-case";
import { buyProperty, investInProperty, sellPropertyUseCase } from "../../application/use-cases/property-transactions/property-transactions.use-case";
import { stallStockFor, buyStallItem } from "../../application/use-cases/visit-stall/visit-stall.use-case";
import { applyItemUse } from "../../application/use-cases/use-item/use-item.use-case";
import { resolveMisfortuneStrike } from "../../application/use-cases/resolve-misfortune-strike/resolve-misfortune-strike.use-case";
import { cpuTakeTurn } from "../../application/use-cases/cpu-take-turn/cpu-take-turn.use-case";
import { endGame, EndGameOutcome } from "../../application/use-cases/end-game/end-game.use-case";
import { loadGame, saveGame } from "../../application/use-cases/save-load-game/save-load-game.use-case";

export type UiState =
  | { readonly kind: "setup" }
  | { readonly kind: "idle" }
  | { readonly kind: "choosing-square"; readonly steps: number; readonly reachable: ReadonlyMap<NodeId, readonly NodeId[]> }
  | { readonly kind: "quiz"; readonly question: QuizQuestion; readonly tier: QuizTier; readonly optionOrder: readonly number[] }
  | { readonly kind: "city"; readonly cityId: CityId; readonly arrivalPrize: number | null }
  | { readonly kind: "game-over"; readonly outcome: EndGameOutcome };

export interface LogEntry {
  readonly id: number;
  readonly text: string;
  readonly tone: "neutral" | "good" | "bad" | "gold";
}

interface GameStoreState {
  context: GameEngineContext | null;
  session: GameSession | null;
  ui: UiState;
  log: readonly LogEntry[];
  hasSavedGame: boolean;

  startNewGame(config: { countryId: CountryId; players: readonly PlayerSetup[]; maxMonths: number; cpuLevel: CpuLevel }): void;
  loadSavedGame(): void;
  backToSetup(): void;
  rollForHumanTurn(): void;
  chooseSquare(nodeId: NodeId): void;
  answerQuizOption(optionIndex: number): void;
  closeCityModal(): void;
  buyCityProperty(index: PropertyIndex): void;
  investCityProperty(ref: PropertyRef): void;
  sellCityProperty(ref: PropertyRef): void;
  buyCityItem(key: ItemKey): void;
  useInventoryItem(index: number): void;
  chooseExactDiceValue(value: number): void;
  save(): void;
}

let nextLogId = 1;

export const contentRepository = new JsonCountryContentRepository();
const gameRepository = new LocalStorageGameRepository();
const random = new CryptoRandomAdapter();
export const soundAdapter = new WebAudioSoundAdapter();

function pushLog(state: GameStoreState, text: string, tone: LogEntry["tone"] = "neutral"): LogEntry[] {
  return [{ id: nextLogId++, text, tone }, ...state.log].slice(0, 60);
}

export const useGameStore = create<GameStoreState>((set, get) => {
  /** 現在の手番プレイヤーがCPUである限り、自動で手番を進め続ける。 */
  function runCpuLoopIfNeeded() {
    const { context, session } = get();
    if (!context || !session || isOver(session)) return;

    let current = session;
    const logs: LogEntry[] = [];
    let guard = 0;
    while (!isOver(current) && currentPlayer(current).isCpu && guard < 50) {
      guard++;
      const player = currentPlayer(current);
      const result = cpuTakeTurn(context, current, player.id, random);
      current = result.session;
      logs.push({ id: nextLogId++, text: describeCpuTurn(player.name, result), tone: "neutral" });

      if (isOver(current)) break;
      if (!result.extraTurn) {
        const adv = advanceTurn(context, current, random);
        current = adv.session;
        if (adv.season) {
          logs.push({ id: nextLogId++, text: `${adv.season.emoji} ${adv.season.name.en}`, tone: "gold" });
        }
        for (const q of adv.quarterlyIncome) {
          logs.push({ id: nextLogId++, text: `${q.playerId} +${q.amount} (quarterly income)`, tone: "good" });
        }
      }
    }

    if (isOver(current)) {
      const outcome = endGame(context, current);
      set((s) => ({ session: outcome.session, ui: { kind: "game-over", outcome }, log: [...logs.reverse(), ...s.log].slice(0, 60) }));
      return;
    }

    set((s) => ({ session: current, ui: { kind: "idle" }, log: [...logs.reverse(), ...s.log].slice(0, 60) }));
    saveGame(gameRepository, current);
  }

  function finishHumanLandingAndAdvance() {
    const { context, session } = get();
    if (!context || !session) return;
    const player = currentPlayer(session);
    let current = settleSpiritAfterTurn(context, session);

    if (isOver(current)) {
      const outcome = endGame(context, current);
      set((s) => ({ session: outcome.session, ui: { kind: "game-over", outcome }, log: pushLog(s, "Game over", "gold") }));
      return;
    }

    if (player.hasExtraTurn) {
      current = { ...current, players: current.players.map((p) => (p.id === player.id ? { ...p, hasExtraTurn: false } : p)) };
      set((s) => ({ session: current, ui: { kind: "idle" }, log: pushLog(s, `${player.name} takes an extra turn!`, "gold") }));
      return;
    }

    const adv = advanceTurn(context, current, random);
    current = adv.session;
    set((s) => {
      let log = s.log;
      if (adv.season) log = [{ id: nextLogId++, text: `${adv.season.emoji} ${adv.season.name.en}`, tone: "gold" }, ...log];
      for (const q of adv.quarterlyIncome) {
        log = [{ id: nextLogId++, text: `+${q.amount} quarterly income (${q.playerId})`, tone: "good" }, ...log];
      }
      return { session: current, ui: { kind: "idle" }, log: log.slice(0, 60) };
    });

    if (isOver(current)) {
      const outcome = endGame(context, current);
      set({ session: outcome.session, ui: { kind: "game-over", outcome } });
      return;
    }
    saveGame(gameRepository, current);
    runCpuLoopIfNeeded();
  }

  function resolveLandingForHuman(landedNodeId: NodeId) {
    const { context, session } = get();
    if (!context || !session) return;
    const player = currentPlayer(session);
    const node = context.getNode(landedNodeId);

    if (isCityNode(node) && node.cityId === session.destination) {
      const arrival = arriveAtDestination(context, session, player.id, random);
      set((s) => ({ session: arrival.session, log: pushLog(s, `${player.name} reaches the destination! +${arrival.prize}`, "gold") }));
      set({ ui: { kind: "city", cityId: node.cityId, arrivalPrize: arrival.prize } });
      return;
    }
    if (node.type === "quiz") {
      const question = context.content.quiz[random.nextInt(context.content.quiz.length)];
      set({ ui: { kind: "quiz", question, tier: node.tier, optionOrder: shuffledIndexes(question.options.length, random) } });
      return;
    }
    if (node.type === "blue" || node.type === "red") {
      const outcome = landOnMoneySquare(session, player.id, node.type === "blue", random);
      set((s) => ({
        session: outcome.session,
        log: pushLog(s, outcome.gained ? `${player.name} +${outcome.amount}` : `${player.name} -${outcome.amount}`, outcome.gained ? "good" : "bad"),
      }));
      finishHumanLandingAndAdvance();
      return;
    }
    if (node.type === "card") {
      const outcome = landOnCardSquare(context, session, player.id, random);
      set((s) => ({ session: outcome.session, log: pushLog(s, outcome.itemKey ? `${player.name} found ${outcome.itemKey}` : `${player.name} found nothing`, "gold") }));
      finishHumanLandingAndAdvance();
      return;
    }
    if (isCityNode(node)) {
      set({ ui: { kind: "city", cityId: node.cityId, arrivalPrize: null } });
      return;
    }
    finishHumanLandingAndAdvance();
  }

  return {
    context: null,
    session: null,
    ui: { kind: "setup" },
    log: [],
    hasSavedGame: (() => {
      try {
        return gameRepository.load() !== null;
      } catch {
        return false;
      }
    })(),

    startNewGame(config) {
      const content = contentRepository.load(config.countryId);
      const context = createGameEngineContext(content);
      const session = startGame(context, random, {
        countryId: config.countryId,
        players: config.players,
        maxMonths: config.maxMonths,
        cpuLevel: config.cpuLevel,
        sessionId: GameSessionId(`session-${Date.now()}`),
      });
      set({ context, session, ui: { kind: "idle" }, log: [{ id: nextLogId++, text: "New journey started!", tone: "gold" }] });
      saveGame(gameRepository, session);
      runCpuLoopIfNeeded();
    },

    loadSavedGame() {
      const saved = loadGame(gameRepository);
      if (!saved) return;
      const content = contentRepository.load(saved.countryId);
      const context = createGameEngineContext(content);
      set({ context, session: saved, ui: { kind: "idle" }, log: [{ id: nextLogId++, text: "Journey restored from your last save.", tone: "gold" }] });
      runCpuLoopIfNeeded();
    },

    backToSetup() {
      set({ context: null, session: null, ui: { kind: "setup" }, log: [] });
    },

    rollForHumanTurn() {
      const { context, session } = get();
      if (!context || !session) return;
      const player = currentPlayer(session);

      if (player.skipNextTurn) {
        const cleared = { ...session, players: session.players.map((p) => (p.id === player.id ? { ...p, skipNextTurn: false } : p)) };
        set((s) => ({ session: cleared, log: pushLog(s, `${player.name} is stuck and loses the turn.`, "bad") }));
        finishHumanLandingAndAdvance();
        return;
      }
      if (session.misfortune.level > 0 && session.misfortune.holderId === player.id) {
        const strike = resolveMisfortuneStrike(context, session, player.id, random);
        set((s) => ({ session: strike.session, log: pushLog(s, describeStrike(player.name, strike.result), "bad") }));
        if (currentPlayer(strike.session).skipNextTurn) {
          const cleared = { ...strike.session, players: strike.session.players.map((p) => (p.id === player.id ? { ...p, skipNextTurn: false } : p)) };
          set({ session: cleared });
          finishHumanLandingAndAdvance();
          return;
        }
      }

      const latestSession = get().session!;
      soundAdapter.playDiceRoll();
      const steps = rollOneDie(random);
      const reachable = reachableNodesFor(context, latestSession, player.id, steps);
      set({ ui: { kind: "choosing-square", steps, reachable } });
    },

    chooseSquare(nodeId) {
      const { context, session, ui } = get();
      if (!context || !session || ui.kind !== "choosing-square") return;
      const path = ui.reachable.get(nodeId);
      if (!path) return;
      const player = currentPlayer(session);
      const moveResult = movePlayerAlongPath(session, player.id, path);
      set((s) => {
        let log = s.log;
        for (const evt of moveResult.spiritPassEvents) {
          log = [{ id: nextLogId++, text: `The spirit passes to ${evt.toPlayerId}!`, tone: "bad" }, ...log];
        }
        return { session: moveResult.session, log };
      });
      resolveLandingForHuman(moveResult.finalNode);
    },

    answerQuizOption(optionIndex) {
      const { context, session, ui } = get();
      if (!context || !session || ui.kind !== "quiz") return;
      const player = currentPlayer(session);
      const outcome = answerQuiz(context, session, player.id, ui.question, ui.tier, optionIndex, random);
      if (outcome.correct) soundAdapter.playCoin();
      else soundAdapter.playWrong();
      set((s) => ({
        session: outcome.session,
        ui: { kind: "idle" },
        log: pushLog(s, outcome.correct ? `${player.name} answered correctly! +${outcome.amount.amount}` : `${player.name} answered incorrectly. -${outcome.amount.amount}`, outcome.correct ? "good" : "bad"),
      }));
      finishHumanLandingAndAdvance();
    },

    closeCityModal() {
      finishHumanLandingAndAdvance();
    },

    buyCityProperty(index) {
      const { context, session, ui } = get();
      if (!context || !session || ui.kind !== "city") return;
      const player = currentPlayer(session);
      const result = buyProperty(context, session, player.id, ui.cityId, index);
      if (result.ok) {
        soundAdapter.playCoin();
        set((s) => ({ session: result.value.session, log: pushLog(s, `${player.name} bought a property`, "gold") }));
      }
    },

    investCityProperty(ref) {
      const { context, session } = get();
      if (!context || !session) return;
      const player = currentPlayer(session);
      const result = investInProperty(context, session, player.id, ref);
      if (result.ok) {
        soundAdapter.playCoin();
        set((s) => ({ session: result.value.session, log: pushLog(s, `${player.name} invested in a property`, "gold") }));
      }
    },

    sellCityProperty(ref) {
      const { context, session } = get();
      if (!context || !session) return;
      const player = currentPlayer(session);
      const result = sellPropertyUseCase(context, session, player.id, ref);
      if (result.ok) {
        set((s) => ({ session: result.value.session, log: pushLog(s, `${player.name} sold a property`, "bad") }));
      }
    },

    buyCityItem(key) {
      const { context, session, ui } = get();
      if (!context || !session || ui.kind !== "city") return;
      const player = currentPlayer(session);
      const result = buyStallItem(context, session, player.id, ui.cityId, key);
      if (result.ok) {
        soundAdapter.playCoin();
        set((s) => ({ session: result.value, log: pushLog(s, `${player.name} bought an item`, "gold") }));
      }
    },

    useInventoryItem(index) {
      const { context, session } = get();
      if (!context || !session) return;
      const player = currentPlayer(session);
      const result = applyItemUse(context, session, player.id, index, random);
      set((s) => ({ session: result.session, log: pushLog(s, `${player.name} used an item`, "gold") }));

      if (result.result.type === "teleport-to-destination") {
        resolveLandingForHuman(cityIdToNodeId(result.session.destination));
      } else if (result.result.type === "rolled") {
        const reachable = reachableNodesFor(context, result.session, player.id, result.result.steps);
        set({ ui: { kind: "choosing-square", steps: result.result.steps, reachable } });
      }
    },

    chooseExactDiceValue(value) {
      const { context, session } = get();
      if (!context || !session) return;
      const player = currentPlayer(session);
      const reachable = reachableNodesFor(context, session, player.id, value);
      set({ ui: { kind: "choosing-square", steps: value, reachable } });
    },

    save() {
      const { session } = get();
      if (!session) return;
      saveGame(gameRepository, session);
      set((s) => ({ log: pushLog(s, "Journey saved.", "gold") }));
    },
  };
});

/** クイズの選択肢の表示順をシャッフルする(元のインデックスの並びを返す)。 */
function shuffledIndexes(length: number, random: { nextInt(n: number): number }): number[] {
  const indexes = Array.from({ length }, (_, i) => i);
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = random.nextInt(i + 1);
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes;
}

function describeStrike(playerName: string, result: ReturnType<typeof resolveMisfortuneStrike>["result"]): string {
  switch (result.type) {
    case "rested":
      return `The spirit rests this turn.`;
    case "warded":
      return `${playerName} wards off the misfortune!`;
    case "pleased":
      return `${playerName} pleases the spirit and gains ${result.amount}!`;
    case "struck":
      return `${playerName} is struck by misfortune (${result.outcome.effectId}).`;
    default:
      return "";
  }
}

function describeCpuTurn(playerName: string, result: ReturnType<typeof cpuTakeTurn>): string {
  if (result.skippedTurn) return `${playerName} is stuck and loses the turn.`;
  if (!result.landing) return `${playerName} rolls ${result.steps ?? "?"} and moves.`;
  switch (result.landing.type) {
    case "quiz":
      return `${playerName} answers a quiz (${result.landing.outcome.correct ? "correct" : "wrong"}).`;
    case "money":
      return `${playerName} lands on a ${result.landing.outcome.gained ? "blue" : "red"} square.`;
    case "card":
      return `${playerName} lands on a card square.`;
    case "destination":
      return `${playerName} reaches the destination! +${result.landing.outcome.prize}`;
    case "city":
      return `${playerName} visits a town.`;
    default:
      return `${playerName} takes a turn.`;
  }
}

export function stallStockForCurrentCity(): readonly ItemKey[] {
  const { context, session } = useGameStore.getState();
  if (!context || !session) return [];
  return stallStockFor(context, session.destination, session.month);
}
