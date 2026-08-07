"use client";

import { create } from "zustand";
import { GameSessionId, ItemKey, NodeId, PropertyRef } from "../../domain/shared-kernel/ids";
import { currentPlayer } from "../../domain/game-session/game-session";
import { isCityNode } from "../../domain/board/node";
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
import { GameStoreState, SavedGameSummary } from "./game-store-types";
import { contentRepository, gameRepository, random, soundAdapter } from "./game-store-dependencies";
import { logEntry, pushLog } from "./game-store-log";
import { describeStrike } from "./game-store-formatters";
import { formatMoney } from "../i18n/money-format";
import { createTurnFlowActions } from "./game-store-turn-flow";

export type { UiState, LogEntry } from "./game-store-types";
export { contentRepository, soundAdapter } from "./game-store-dependencies";

/**
 * 保存済みセッションの要約を読む。localStorageが使えない環境(サーバー描画・
 * プライベートブラウジング)では null を返す。
 */
function readSavedGameSummary(): SavedGameSummary | null {
  try {
    const saved = loadGame(gameRepository);
    if (!saved) return null;
    return {
      countryId: saved.countryId,
      month: saved.month,
      maxMonths: saved.maxMonths,
      players: saved.players.map((p) => ({ name: p.name, isCpu: p.isCpu, cash: p.cash.amount })),
    };
  } catch {
    return null;
  }
}

export const useGameStore = create<GameStoreState>((set, get) => {
  const {
    runCpuLoopIfNeeded,
    resetQuizDeck,
    cancelCpuLoop,
    dismissCpuModal,
    dismissMoneyEvent,
    finishHumanLandingAndAdvance,
    resolveLandingForHuman,
    dismissSeasonModal,
    closeCityModal,
    dismissNextLeg,
  } = createTurnFlowActions(set, get);

  /**
   * 厄災のモーダルを閉じたあと何をするか。
   * 手番を飛ばされる災難("skip")なら次の人へ、そうでなければサイコロへ。
   */
  let pendingAfterDoom: "skip" | "roll" | null = null;

  /**
   * 振ってしまったが、まだ見せていない出目。
   *
   * ドメインの抽選はボタンを押した瞬間に済んでいる(演出の途中で結果が変わることはない)。
   * ただし**それをそのまま画面に出すと、サイコロが転がっている間に答えが分かってしまう**。
   * 出目・行けるマスはここに預けておき、演出が着地した合図(`revealDiceRoll`)で公開する。
   */
  let pendingRoll: { steps: number; reachable: ReadonlyMap<NodeId, readonly NodeId[]> } | null = null;

  /** サイコロ演出を始める。出目は伏せたまま、転がる絵だけを出す。 */
  function beginRoll(steps: number, reachable: ReadonlyMap<NodeId, readonly NodeId[]>, rolls: readonly number[]) {
    pendingRoll = { steps, reachable };
    set((s) => ({
      ui: { kind: "rolling" },
      diceRoll: { nonce: (s.diceRoll?.nonce ?? 0) + 1, value: steps, rolls },
    }));
  }

  /** 伏せておいた出目を公開する。まだ振っていなければ何もしない。 */
  function revealPendingRoll() {
    if (!pendingRoll) return;
    const { steps, reachable } = pendingRoll;
    pendingRoll = null;
    set({ ui: { kind: "choosing-square", steps, reachable } });
  }

  /**
   * 決まった経路に沿って駒を動かし、着地の処理へ渡す。
   * 自分でマスを選んだとき(`chooseSquare`)も、風まかせで運ばれたとき
   * (`carried-far` のアイテム)も、移動はここを通る。
   */
  function walkAlongPath(path: readonly NodeId[]) {
    const { context, session } = get();
    if (!context || !session) return;
    const player = currentPlayer(session);
    const moveResult = movePlayerAlongPath(session, player.id, path);
    set((s) => {
      let log = s.log;
      for (const evt of moveResult.spiritPassEvents) {
        const to = session.players.find((p) => p.id === evt.toPlayerId)?.name ?? String(evt.toPlayerId);
        log = [logEntry("passLog", [context.content.spirit.emoji, player.name, to], "bad"), ...log];
      }
      return { session: moveResult.session, log };
    });
    soundAdapter.setRegion(context.getNode(moveResult.finalNode).regionId);
    resolveLandingForHuman(moveResult.finalNode);
  }

  return {
    context: null,
    session: null,
    ui: { kind: "setup" },
    log: [],
    diceRoll: null,
    savedGame: null,

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
      resetQuizDeck(content.quiz);
      // legacyのstartGame()と同様、出発ストーリーのモーダル(intro)をまず表示し、
      // それを閉じてから(dismissIntro経由で)CPUの自動進行を開始する。
      set({ context, session, ui: { kind: "intro" }, log: [logEntry("newJourneyLog", [], "gold")] });
      await soundAdapter.setCountry(config.countryId);
      soundAdapter.setRegion(context.getNode(currentPlayer(session).location).regionId);
      saveGame(gameRepository, session);
    },

    dismissIntro() {
      set({ ui: { kind: "idle" } });
      runCpuLoopIfNeeded();
    },

    async loadSavedGame() {
      const saved = loadGame(gameRepository);
      if (!saved) return;
      const content = await contentRepository.load(saved.countryId);
      const context = createGameEngineContext(content);
      resetQuizDeck(content.quiz);
      set({ context, session: saved, ui: { kind: "idle" }, log: [logEntry("resumed", [], "gold")] });
      await soundAdapter.setCountry(saved.countryId);
      soundAdapter.setRegion(context.getNode(currentPlayer(saved).location).regionId);
      runCpuLoopIfNeeded();
    },

    refreshSavedGame() {
      set({ savedGame: readSavedGameSummary() });
    },

    discardSavedGame() {
      try {
        gameRepository.clear();
      } catch {
        // ストレージが使えない環境では何もできることがない。
      }
      set({ savedGame: null });
    },

    revealDiceRoll() {
      revealPendingRoll();
    },

    clearDiceRoll() {
      // 着地の合図が来ないまま演出が終わった場合の保険。ここで公開しておかないと、
      // 出目を伏せたまま操作できない状態で止まってしまう。
      revealPendingRoll();
      set({ diceRoll: null });
    },

    backToSetup() {
      cancelCpuLoop();
      // 旅が終わったので、その国のBGMもここで終わりにする(ミュート設定は変えない)。
      // セットアップ画面のテーマ曲は、次に何か操作されたときに鳴り始める。
      soundAdapter.stopMusic();
      pendingRoll = null;
      set({ context: null, session: null, ui: { kind: "setup" }, log: [], diceRoll: null });
    },

    cancelCpuLoop,
    dismissCpuModal,

    rollForHumanTurn() {
      const { context, session } = get();
      if (!context || !session) return;
      const player = currentPlayer(session);

      if (player.skipNextTurn) {
        const cleared = { ...session, players: session.players.map((p) => (p.id === player.id ? { ...p, skipNextTurn: false } : p)) };
        set((s) => ({ session: cleared, log: pushLog(s, "stuck", [player.name], "bad") }));
        finishHumanLandingAndAdvance();
        return;
      }
      if (session.misfortune.level > 0 && session.misfortune.holderId === player.id) {
        const strike = resolveMisfortuneStrike(context, session, player.id, random);
        if (strike.result.type === "struck") soundAdapter.playDoom(strike.result.wasKing);
        set((s) => ({ session: strike.session, log: [describeStrike(player.name, strike.result, context.content.currency), ...s.log].slice(0, 60) }));
        // 何が起きたのかを絵と文章で見せる。閉じたあとにサイコロへ進む。
        if (strike.result.type === "struck") {
          pendingAfterDoom = currentPlayer(strike.session).skipNextTurn ? "skip" : "roll";
          set({
            ui: {
              kind: "doom",
              playerName: player.name,
              flavor: strike.result.flavor,
              wasKing: strike.result.wasKing,
            },
          });
          return;
        }
        if (currentPlayer(strike.session).skipNextTurn) {
          const cleared = { ...strike.session, players: strike.session.players.map((p) => (p.id === player.id ? { ...p, skipNextTurn: false } : p)) };
          set({ session: cleared });
          finishHumanLandingAndAdvance();
          return;
        }
      }

      const latestSession = get().session!;
      const steps = rollOneDie(random);
      const reachable = reachableNodesFor(context, latestSession, player.id, steps);
      beginRoll(steps, reachable, [steps]);
    },

    chooseSquare(nodeId) {
      const { context, session, ui } = get();
      if (!context || !session || ui.kind !== "choosing-square") return;
      const path = ui.reachable.get(nodeId);
      if (!path) return;
      walkAlongPath(path);
    },

    answerQuizOption(optionIndex) {
      const { context, session, ui } = get();
      if (!context || !session || ui.kind !== "quiz") return;
      const player = currentPlayer(session);
      const outcome = answerQuiz(context, session, player.id, ui.question, optionIndex, random);
      if (outcome.correct) soundAdapter.playRight();
      else soundAdapter.playWrong();
      // 手番を進める前に結果(正解・解説)を見せる。フィードバックの無い出題は
      // 学習にならないため(docs/40-learning-design/01-quiz-as-learning-device.md)。
      set((s) => ({
        session: outcome.session,
        ui: {
          kind: "quiz-result",
          question: ui.question,
          chosenOptionIndex: optionIndex,
          correct: outcome.correct,
          amount: formatMoney(outcome.amount.amount, context.content.currency),
          savedByCharm: outcome.savedByCharm,
          bonusItem: outcome.bonusItem,
        },
        log: pushLog(s, outcome.correct ? "quizOkLog" : "quizNoLog", [player.name, formatMoney(outcome.amount.amount, context.content.currency)], outcome.correct ? "good" : "bad"),
      }));
    },

    dismissQuizResult() {
      if (get().ui.kind !== "quiz-result") return;
      set({ ui: { kind: "idle" } });
      finishHumanLandingAndAdvance();
    },

    closeCityModal,

    buyCityProperty(index) {
      const { context, session, ui } = get();
      if (!context || !session || ui.kind !== "city") return;
      const player = currentPlayer(session);
      const result = buyProperty(context, session, player.id, ui.cityId, index);
      if (result.ok) {
        soundAdapter.playBuy();
        set((s) => ({ session: result.value.session, log: pushLog(s, "boughtLog", [player.name, context.getCity(ui.cityId).properties[index].name, context.getCity(ui.cityId).name, formatMoney(context.getCity(ui.cityId).properties[index].cost, context.content.currency)], "gold") }));
      }
    },

    investCityProperty(ref) {
      const { context, session } = get();
      if (!context || !session) return;
      const player = currentPlayer(session);
      const result = investInProperty(context, session, player.id, ref);
      if (result.ok) {
        soundAdapter.playBuy();
        set((s) => ({ session: result.value.session, log: pushLog(s, "investCpuLog", [player.name, context.getCity(PropertyRef.parse(ref).cityId).properties[PropertyRef.parse(ref).index].name], "gold") }));
      }
    },

    sellCityProperty(ref) {
      const { context, session } = get();
      if (!context || !session) return;
      const player = currentPlayer(session);
      const result = sellPropertyUseCase(context, session, player.id, ref);
      if (result.ok) {
        soundAdapter.playCoin();
        set((s) => ({ session: result.value.session, log: pushLog(s, "sellLog", [player.name, context.getCity(PropertyRef.parse(ref).cityId).properties[PropertyRef.parse(ref).index].name, ""], "bad") }));
      }
    },

    buyCityItem(key) {
      const { context, session, ui } = get();
      if (!context || !session || ui.kind !== "city") return;
      const player = currentPlayer(session);
      const result = buyStallItem(context, session, player.id, ui.cityId, key);
      if (result.ok) {
        soundAdapter.playBuy();
        const item = context.content.items.find((i) => i.key === key);
        set((s) => ({ session: result.value, log: pushLog(s, "boughtItemLog", [player.name, item?.emoji ?? "", item?.name ?? key], "gold") }));
      }
    },

    useInventoryItem(index) {
      const { context, session } = get();
      if (!context || !session) return;
      const player = currentPlayer(session);
      // 使用したアイテムはこの後インベントリから消えるため、先に控えておく。
      const usedItem = context.content.items.find((i) => i.key === player.inventory[index]);
      const result = applyItemUse(context, session, player.id, index, random);
      set((s) => ({ session: result.session, log: pushLog(s, "usedItemLog", [player.name, usedItem?.emoji ?? "", usedItem?.name ?? ""], "gold") }));

      if (result.result.type === "carried-far") {
        // 行き先は抽選済み。選ばせずにそのまま運ぶ(向きが選べないのが、このアイテムの肝)。
        const { steps, path, toNode } = result.result;
        const landing = context.getNode(toNode);
        set((s) => ({
          log: isCityNode(landing)
            ? pushLog(s, "carriedToLog", [player.name, steps, context.getCity(landing.cityId).name], "gold")
            : pushLog(s, "carriedLog", [player.name, steps], "gold"),
        }));
        walkAlongPath(path);
      } else if (result.result.type === "rolled") {
        const { steps, rolls } = result.result;
        const reachable = reachableNodesFor(context, result.session, player.id, steps);
        // 振ったサイコロを個数ぶんそのまま見せる(合計だけだと目と進む数が食い違って見える)。
        beginRoll(steps, reachable, rolls);
      }
    },

    chooseExactDiceValue(value) {
      const { context, session } = get();
      if (!context || !session) return;
      const player = currentPlayer(session);
      const reachable = reachableNodesFor(context, session, player.id, value);
      set({ ui: { kind: "choosing-square", steps: value, reachable } });
    },

    dismissSeasonModal,
    dismissNextLeg,
    dismissMoneyEvent,

    /**
     * 厄災のモーダルを閉じる。
     * 手番を飛ばされる災難なら次の人へ、そうでなければサイコロへ進む。
     */
    dismissDoom() {
      if (get().ui.kind !== "doom") return;
      const after = pendingAfterDoom;
      pendingAfterDoom = null;
      const { session } = get();
      if (after === "skip" && session) {
        const player = currentPlayer(session);
        set({
          session: {
            ...session,
            players: session.players.map((p) => (p.id === player.id ? { ...p, skipNextTurn: false } : p)),
          },
        });
        finishHumanLandingAndAdvance();
        return;
      }
      set({ ui: { kind: "idle" } });
    },

    save() {
      const { session } = get();
      if (!session) return;
      saveGame(gameRepository, session);
      set((s) => ({ log: pushLog(s, "saved", [], "gold"), ui: { kind: "saved" }, savedGame: readSavedGameSummary() }));
    },

    dismissSavedModal() {
      set({ ui: { kind: "idle" } });
    },
  };
});

export function stallStockForCurrentCity(): readonly ItemKey[] {
  const { context, session } = useGameStore.getState();
  if (!context || !session) return [];
  return stallStockFor(context, session.destination, session.month);
}
