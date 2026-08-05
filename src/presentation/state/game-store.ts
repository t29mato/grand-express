"use client";

import { create } from "zustand";
import { GameSessionId, ItemKey, cityIdToNodeId } from "../../domain/shared-kernel/ids";
import { currentPlayer } from "../../domain/game-session/game-session";
import { createGameEngineContext } from "../../application/game-engine-context";
import { startGame } from "../../application/use-cases/start-game/start-game.use-case";
import { rollOneDie } from "../../application/use-cases/roll-dice/roll-dice.use-case";
import { reachableNodesFor, movePlayerAlongPath } from "../../application/use-cases/move-player/move-player.use-case";
import { answerQuiz } from "../../application/use-cases/answer-quiz/answer-quiz.use-case";
import { buyProperty, investInProperty, sellPropertyUseCase } from "../../application/use-cases/property-transactions/property-transactions.use-case";
import { stallStockFor, buyStallItem } from "../../application/use-cases/visit-stall/visit-stall.use-case";
import { applyItemUse } from "../../application/use-cases/use-item/use-item.use-case";
import { resolveMisfortuneStrike } from "../../application/use-cases/resolve-misfortune-strike/resolve-misfortune-strike.use-case";
import { loadGame, saveGame } from "../../application/use-cases/save-load-game/save-load-game.use-case";
import { GameStoreState } from "./game-store-types";
import { contentRepository, gameRepository, random, soundAdapter } from "./game-store-dependencies";
import { newLogId, pushLog } from "./game-store-log";
import { describeStrike } from "./game-store-formatters";
import { createTurnFlowActions } from "./game-store-turn-flow";

export type { UiState, LogEntry } from "./game-store-types";
export { contentRepository, soundAdapter } from "./game-store-dependencies";

export const useGameStore = create<GameStoreState>((set, get) => {
  const { runCpuLoopIfNeeded, finishHumanLandingAndAdvance, resolveLandingForHuman } = createTurnFlowActions(set, get);

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

    async startNewGame(config) {
      const content = await contentRepository.load(config.countryId);
      const context = createGameEngineContext(content);
      const session = startGame(context, random, {
        countryId: config.countryId,
        players: config.players,
        maxMonths: config.maxMonths,
        cpuLevel: config.cpuLevel,
        sessionId: GameSessionId(`session-${Date.now()}`),
      });
      set({ context, session, ui: { kind: "idle" }, log: [{ id: newLogId(), text: "New journey started!", tone: "gold" }] });
      await soundAdapter.setCountry(config.countryId);
      soundAdapter.setRegion(context.getNode(currentPlayer(session).location).regionId);
      saveGame(gameRepository, session);
      runCpuLoopIfNeeded();
    },

    async loadSavedGame() {
      const saved = loadGame(gameRepository);
      if (!saved) return;
      const content = await contentRepository.load(saved.countryId);
      const context = createGameEngineContext(content);
      set({ context, session: saved, ui: { kind: "idle" }, log: [{ id: newLogId(), text: "Journey restored from your last save.", tone: "gold" }] });
      await soundAdapter.setCountry(saved.countryId);
      soundAdapter.setRegion(context.getNode(currentPlayer(saved).location).regionId);
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
        if (strike.result.type === "struck") soundAdapter.playDoom(strike.result.wasKing);
        set((s) => ({ session: strike.session, log: pushLog(s, describeStrike(player.name, strike.result), "bad") }));
        if (currentPlayer(strike.session).skipNextTurn) {
          const cleared = { ...strike.session, players: strike.session.players.map((p) => (p.id === player.id ? { ...p, skipNextTurn: false } : p)) };
          set({ session: cleared });
          finishHumanLandingAndAdvance();
          return;
        }
      }

      const latestSession = get().session!;
      soundAdapter.playRattle();
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
          log = [{ id: newLogId(), text: `The spirit passes to ${evt.toPlayerId}!`, tone: "bad" }, ...log];
        }
        return { session: moveResult.session, log };
      });
      soundAdapter.setRegion(context.getNode(moveResult.finalNode).regionId);
      resolveLandingForHuman(moveResult.finalNode);
    },

    answerQuizOption(optionIndex) {
      const { context, session, ui } = get();
      if (!context || !session || ui.kind !== "quiz") return;
      const player = currentPlayer(session);
      const outcome = answerQuiz(context, session, player.id, ui.question, ui.tier, optionIndex, random);
      if (outcome.correct) soundAdapter.playRight();
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
        soundAdapter.playBuy();
        set((s) => ({ session: result.value.session, log: pushLog(s, `${player.name} bought a property`, "gold") }));
      }
    },

    investCityProperty(ref) {
      const { context, session } = get();
      if (!context || !session) return;
      const player = currentPlayer(session);
      const result = investInProperty(context, session, player.id, ref);
      if (result.ok) {
        soundAdapter.playBuy();
        set((s) => ({ session: result.value.session, log: pushLog(s, `${player.name} invested in a property`, "gold") }));
      }
    },

    sellCityProperty(ref) {
      const { context, session } = get();
      if (!context || !session) return;
      const player = currentPlayer(session);
      const result = sellPropertyUseCase(context, session, player.id, ref);
      if (result.ok) {
        soundAdapter.playCoin();
        set((s) => ({ session: result.value.session, log: pushLog(s, `${player.name} sold a property`, "bad") }));
      }
    },

    buyCityItem(key) {
      const { context, session, ui } = get();
      if (!context || !session || ui.kind !== "city") return;
      const player = currentPlayer(session);
      const result = buyStallItem(context, session, player.id, ui.cityId, key);
      if (result.ok) {
        soundAdapter.playBuy();
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

export function stallStockForCurrentCity(): readonly ItemKey[] {
  const { context, session } = useGameStore.getState();
  if (!context || !session) return [];
  return stallStockFor(context, session.destination, session.month);
}
