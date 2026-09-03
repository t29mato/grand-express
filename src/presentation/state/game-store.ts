"use client";

import { create } from "zustand";
import { GameSessionId, ItemKey, NodeId, PlayerId, PropertyRef } from "../../domain/shared-kernel/ids";
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
import { prefersReducedMotion, WALK_STEP_MS } from "./motion-preference";
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
    resetDecks,
    cancelCpuLoop,
    dismissCpuModal,
    dismissMoneyEvent,
    finishHumanLandingAndAdvance,
    resolveLandingForHuman,
    dismissSeasonModal,
    dismissSettlement,
    dismissMonopoly,
    clearArrivalBeat,
    closeCityModal,
    dismissNextLeg,
    notePurchase,
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

  /**
   * いまの手番の人のサイコロを実際に振る。
   *
   * **災難のモーダルを閉じたあとも、ここから直に振る。**
   * 以前は `ui` を `idle` に戻すだけで、プレイヤーがもう一度サイコロを
   * 押す作りだった。ところが手番の頭では毎回厄災の判定が走るので、
   * **押し直すとまた災難が起きる。**閉じて押して、また災難——と繰り返し、
   * いつまでもサイコロが振れなくなっていた(本番で発生。
   * 旅の記録に「👹 …is struck by misfortune.」が延々と伸びた)。
   *
   * ここから振れば `ui` は `rolling` に移り、サイコロのボタンは無効になる。
   * 手番の頭に戻る道が無くなるので、災難は1手番に1回しか起きない。
   */
  function rollNow() {
    const { context, session } = get();
    if (!context || !session) return;
    const player = currentPlayer(session);
    const steps = rollOneDie(random);
    const reachable = reachableNodesFor(context, session, player.id, steps);
    beginRoll(steps, reachable, [steps]);
  }

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
   * 駒を経路に沿って1マスずつ進めて見せる。**見た目だけ**で、盤の状態は変えない。
   *
   * 進んでいるあいだ `walk` に居場所を持たせ、盤面はそちらを優先して駒を描く
   * (`board-view.tsx`)。カメラも `walk` を追うので、道のりに沿って画面が付いていく。
   */
  async function showWalk(playerId: PlayerId, path: readonly NodeId[], emoji: string | null) {
    // 動きを減らす設定のときは、待ち時間だけ残さずに一気に着地させる。
    if (prefersReducedMotion() || path.length === 0) return;
    for (const nodeId of path) {
      set({ walk: { playerId, nodeId, emoji } });
      await new Promise((resolve) => setTimeout(resolve, WALK_STEP_MS));
    }
  }

  /**
   * 決まった経路に沿って駒を動かし、着地の処理へ渡す。
   * 自分でマスを選んだとき(`chooseSquare`)も、風まかせで運ばれたとき
   * (`carried-far` のアイテム)も、移動はここを通る。
   *
   * **道のりを見せ終わってから着地の処理を呼ぶ。**以前は移動と着地が同じ瞬間に起き、
   * 着地のモーダル(クイズ・青赤の出来事・町)が**駒が動くのと同じフレームで開いていた**。
   * 暗幕の下で駒が滑るので、8〜12マス運ばれるアイテムでも動きが一度も見えなかった。
   */
  async function walkAlongPath(
    path: readonly NodeId[],
    options: {
      /** 運んでくれているアイテムの絵文字。道のりのあいだ駒に乗せる。 */
      readonly carriedEmoji?: string | null;
      /** 駒が着いた直後・着地の処理より前に呼ぶ。着いてから出したい記録に使う。 */
      readonly onArrived?: () => void;
    } = {},
  ) {
    const before = get();
    if (!before.context || !before.session) return;
    const playerId = currentPlayer(before.session).id;

    await showWalk(playerId, path, options.carriedEmoji ?? null);
    options.onArrived?.();

    // 道のりのあいだに待っているので、状態を取り直してから盤に反映する。
    const { context, session } = get();
    if (!context || !session) return;
    const player = session.players.find((p) => p.id === playerId);
    if (!player) return;
    const moveResult = movePlayerAlongPath(session, playerId, path);
    set((s) => {
      let log = s.log;
      for (const evt of moveResult.spiritPassEvents) {
        const to = session.players.find((p) => p.id === evt.toPlayerId)?.name ?? String(evt.toPlayerId);
        log = [logEntry("passLog", [context.content.spirit.emoji, player.name, to], "bad"), ...log];
      }
      // 駒はもう着いているので、見た目の位置(`walk`)は盤の状態と同時に外す。
      // 先に外すと、1フレームだけ出発地点へ戻ってしまう。
      return { session: moveResult.session, log, walk: null };
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
    walk: null,
    arrivalBeat: null,
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
      resetDecks(content);
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
      resetDecks(content);
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
      set({ context: null, session: null, ui: { kind: "setup" }, log: [], diceRoll: null, arrivalBeat: null });
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
              // **何をされたかを画面まで運ぶ。**以前は名前と物語しか渡しておらず、
              // いくら失ったのか・何を失ったのかがカードに出ていなかった。
              outcome: strike.result.outcome,
              onCpuTurn: false,
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

      rollNow();
    },

    chooseSquare(nodeId) {
      const { context, session, ui } = get();
      if (!context || !session || ui.kind !== "choosing-square") return;
      // 道のりを見せているあいだは受け付けない。以前は移動が一瞬だったので
      // 二重に押される隙が無かったが、いまは1秒近く歩いている。
      if (get().walk) return;
      const path = ui.reachable.get(nodeId);
      if (!path) return;
      void walkAlongPath(path);
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
        // 町の物件がそろったら、町の画面を閉じたあとに知らせる(`showNextHumanReveal`)。
        notePurchase(context, session, result.value.session, player.id);
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
      const { context, session, walk } = get();
      if (!context || !session) return;
      // 駒が道のりを歩いているあいだは使わせない(運ばれている最中に
      // もう1つ運ぶアイテムを使うと、経路が二重になる)。
      if (walk) return;
      const player = currentPlayer(session);
      // 使用したアイテムはこの後インベントリから消えるため、先に控えておく。
      const usedItem = context.content.items.find((i) => i.key === player.inventory[index]);
      const result = applyItemUse(context, session, player.id, index, random);
      set((s) => ({ session: result.session, log: pushLog(s, "usedItemLog", [player.name, usedItem?.emoji ?? "", usedItem?.name ?? ""], "gold") }));

      /*
       * **すべての結果を明示的に受ける。**`else if` の並びだったころ、
       * `await-exact-dice-choice`(出目を選べるアイテム)の枝が無く、
       * 時刻表・タクシー・周遊券などは**持ち物から消えるだけで何も起きなかった。**
       * ドメイン側は正しく返していて単体テストもあったので、緑のまま死んでいた。
       *
       * switch を網羅にして、最後に `never` を置いてある。**結果の種類を足すと
       * ここが型エラーになる**ので、受け皿を書き忘れたまま通ることはない。
       * 何もしなくてよい結果も、理由を書いて明示的に置く。
       */
      const outcome = result.result;
      switch (outcome.type) {
        case "carried-far": {
          // 行き先は抽選済み。選ばせずにそのまま運ぶ(向きが選べないのが、このアイテムの肝)。
          const { steps, path, toNode } = outcome;
          const landing = context.getNode(toNode);
          // **何マス進んでどこに着いたかは、着いてから出す。**先に出すと、駒が動き出す前に
          // 答えが画面に出てしまい、道のりを見る理由が無くなる(サイコロと同じ理屈)。
          void walkAlongPath(path, {
            carriedEmoji: usedItem?.emoji ?? null,
            onArrived: () =>
              set((s) => ({
                log: isCityNode(landing)
                  ? pushLog(s, "carriedToLog", [player.name, steps, context.getCity(landing.cityId).name], "gold")
                  : pushLog(s, "carriedLog", [player.name, steps], "gold"),
              })),
          });
          break;
        }
        case "rolled": {
          const { steps, rolls } = outcome;
          const reachable = reachableNodesFor(context, result.session, player.id, steps);
          // 振ったサイコロを個数ぶんそのまま見せる(合計だけだと目と進む数が食い違って見える)。
          beginRoll(steps, reachable, rolls);
          break;
        }
        case "await-exact-dice-choice":
          // 1〜6を選ぶ画面を出すところまでが、このアイテムの効果。
          set({ ui: { kind: "exact-dice" } });
          break;
        case "gained-cash":
          // 所持金は `result.session` に反映済みで、旅人一覧がそのまま新しい額を出す。
          break;
        case "extra-turn":
          // `hasExtraTurn` が立つ。手番の終わりに `finishHumanLandingAndAdvance` が拾う。
          break;
        case "repelled-spirit": {
          // **押し付けた相手を伝える。**局面は `result.session` で変わっていたが、
          // 誰に移ったかをどこにも出しておらず、旅人一覧の👹が動いたことに
          // 気づくしかなかった(`toPlayerId` は返ってきているのに捨てていた)。
          //
          // すれ違いで移るときは `passLog` が出てトーストにも載る。**同じ出来事**なので、
          // 文言も見せかたも揃える(押し付けたときだけ黙っている理由が無い)。
          const { toPlayerId } = outcome;
          if (toPlayerId) {
            const to = result.session.players.find((p) => p.id === toPlayerId)?.name ?? String(toPlayerId);
            set((s) => ({ log: pushLog(s, "passLog", [context.content.spirit.emoji, player.name, to], "bad") }));
          }
          break;
        }
        case "no-effect":
          // 使う条件を満たしていなかった場合(厄災を持っていないのに追い払う等)。
          break;
        default: {
          const unhandled: never = outcome;
          throw new Error(`受け皿の無いアイテム結果: ${JSON.stringify(unhandled)}`);
        }
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
    dismissSettlement,
    dismissMonopoly,
    clearArrivalBeat,

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
      // **手番の頭には戻さない。**戻すと厄災の判定がもう一度走り、
      // 災難が繰り返して永久にサイコロが振れなくなる(`rollNow` の説明を参照)。
      rollNow();
    },

    /**
     * いまの局面を保存する。
     *
     * **開いているモーダルを「保存しました」で潰さない。**「保存」はヘッダにあって
     * いつでも押せるのに、以前は `ui` を無条件に差し替えていた。モーダルの多くは
     * **閉じたときに手番の続きを走らせる**ので、潰されるとその続きが永久に走らない。
     * とくに月替わりのモーダルは、閉じたときに `dismissSeasonModal` が
     * **CPUの自動進行を再開する**唯一の場所だった。保存を挟むとそれが失われ、
     * **CPUの手番が始まらないまま盤面が固まっていた**(猿試験で再現)。
     * 保存自体は済ませ、知らせは旅の記録に残す。
     */
    save() {
      const { session, ui } = get();
      if (!session) return;
      saveGame(gameRepository, session);
      set((s) => ({ log: pushLog(s, "saved", [], "gold"), savedGame: readSavedGameSummary() }));
      if (ui.kind === "idle") set({ ui: { kind: "saved" } });
    },

    dismissSavedModal() {
      set({ ui: { kind: "idle" } });
      // 保存を挟んでいるあいだにCPUの手番になっていることがある。
      // 動いていれば何もしない(`runCpuLoopIfNeeded` が自分で見る)。
      void runCpuLoopIfNeeded();
    },
  };
});

export function stallStockForCurrentCity(): readonly ItemKey[] {
  const { context, session } = useGameStore.getState();
  if (!context || !session) return [];
  return stallStockFor(context, session.destination, session.month);
}
