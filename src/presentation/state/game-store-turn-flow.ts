import { NodeId, PlayerId, RegionId } from "../../domain/shared-kernel/ids";
import { currentPlayer, isOver } from "../../domain/game-session/game-session";
import { isCityNode } from "../../domain/board/node";
import { advanceTurn } from "../../application/use-cases/advance-turn/advance-turn.use-case";
import { settleSpiritAfterTurn } from "../../application/use-cases/move-player/settle-spirit-after-turn.use-case";
import { landOnCardSquare } from "../../application/use-cases/land-on-square/card-square.use-case";
import { arriveAtDestination } from "../../application/use-cases/land-on-square/arrive-destination.use-case";
import { cpuTakeTurn } from "../../application/use-cases/cpu-take-turn/cpu-take-turn.use-case";
import { endGame } from "../../application/use-cases/end-game/end-game.use-case";
import { saveGame } from "../../application/use-cases/save-load-game/save-load-game.use-case";
import { formatMoney } from "../i18n/money-format";
import { GameEngineContext } from "../../application/game-engine-context";
import { GetGameState, LogEntry, SetGameState } from "./game-store-types";
import { gameRepository, random, soundAdapter } from "./game-store-dependencies";
import { logEntry, pushLog } from "./game-store-log";
import { QuizSelector, rollDifficulty } from "../../domain/quiz/quiz-selection-service";
import { MoneyEventSelector } from "../../domain/board/money-event-selection-service";
import { MoneyEvent } from "../../domain/board/money-event";
import { applyMoneyEvent } from "../../application/use-cases/land-on-square/money-event.use-case";
import { QuizDifficulty, QuizQuestion } from "../../domain/quiz/quiz-question";
import { describeCpuTurn, visibleOptionOrder } from "./game-store-formatters";

/**
 * CPUの手番の演出タイミング(ミリ秒)。
 * 人間の手番と同じものを見せる: サイコロを振る → 駒が動く → 何をしたかのモーダル。
 */
const CPU_TIMING = {
  /** 「◯◯の手番」を出してからサイコロを振り始めるまで。 */
  beforeRoll: 450,
  /** サイコロ演出(dice-stage.tsx の再生時間 1.6s + 結果表示 0.7s)。 */
  diceAnimation: 2350,
  /** 駒が移動しカメラが追いつくまで(駒のCSSトランジションは0.35s)。 */
  afterMove: 750,
  /** 町・クイズなどの結果モーダルを出しておく時間(クリックで飛ばせる)。 */
  resultModal: 2900,
  /**
   * 月替わりのモーダルを出しておく時間(クリックで飛ばせる)。
   * 結果モーダルより長い。季節の話は読む量が多く、絵もあるため。
   */
  seasonModal: 4200,
} as const;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 手番進行(CPUループ・人間の着地後処理・着地内容の解決)。
 * zustandの `set`/`get` を閉じ込めるため、ファクトリ関数として `game-store.ts` の
 * `create()` コールバックから呼び出す。
 */
export function createTurnFlowActions(set: SetGameState, get: GetGameState) {
  /**
   * 目的地に到着したとき、町のモーダルを閉じたあとに「次の区間」の案内を出すための保留情報。
   * 到着でない普通の町への停車では null のまま(=案内を出さずにそのまま手番を終える)。
   */
  let pendingNextLeg: { firstTimeSpiritAppearance: boolean; spiritHolderId: PlayerId | null } | null = null;

  /**
   * CPUループの世代番号。`cancelCpuLoop()`(セットアップに戻る等)で繰り上げることで、
   * 進行中のループが次のステップで自分が古い世代だと気づいて止まれるようにする。
   */
  let cpuLoopGeneration = 0;
  let cpuLoopRunning = false;

  /**
   * クイズの山札。使い切るまで同じ問題が出ないようにするため、
   * **人間とCPUで1つを共有する**(袋を分けると重複が戻る)。
   * ゲーム開始・ロード時に作り直す。
   */
  let quizSelector: QuizSelector | null = null;

  /**
   * ゲーム開始・ロード時に、**その国の山札を作り直す。**
   *
   * クイズだけ作り直して出来事を放っていたため、インドで遊んだあと
   * ボリビアを始めると、**出来事だけインドのものが出続けていた**
   * (「The chai wallah won't take payment」がボリビアで出た、という報告)。
   * `context` は差し替わるのに、`moneyEventSelector` は
   * `if (!moneyEventSelector)` で一度きりしか作られない作りだった。
   *
   * **国ごとに持つものは、ここでまとめて捨てること。**片方だけ捨てると、
   * 捨て忘れたほうが前の国のまま残る。
   */
  function resetDecks(content: { quiz: readonly QuizQuestion[]; moneyEvents: readonly MoneyEvent[] }) {
    quizSelector = new QuizSelector(content.quiz, random);
    moneyEventSelector = new MoneyEventSelector(content.moneyEvents, random);
  }

  /**
   * 青マス・赤マスの出来事の山札。クイズと同じく、同じ話が続けて出ないよう
   * 人間とCPUで1つを共有する。
   */
  let moneyEventSelector: MoneyEventSelector | null = null;

  /** その地方で起こりうる出来事を1つ引く。 */
  function drawMoneyEvent(kind: "gain" | "loss", regionId: RegionId) {
    const { context, session } = get();
    if (!moneyEventSelector && context) resetDecks(context.content);
    // 季節に合わない話(夏の流氷など)を候補から外す。
    return moneyEventSelector!.draw(kind, regionId, session?.month);
  }

  /** 指定された難易度にいちばん近い問題を、山札から1問引く。 */
  function drawQuestion(difficulty: QuizDifficulty): QuizQuestion {
    const { context } = get();
    if (!quizSelector && context) resetDecks(context.content);
    return quizSelector!.draw(difficulty);
  }

  /** CPUの結果モーダルをプレイヤーが手動で閉じる(演出を飛ばす)。 */
  function dismissCpuModal() {
    const kind = get().ui.kind;
    if (kind === "cpu-city" || kind === "cpu-quiz") {
      const player = get().session ? currentPlayer(get().session!) : null;
      set({ ui: { kind: "cpu-turn", playerName: player?.name ?? "" } });
    }
  }

  function cancelCpuLoop() {
    cpuLoopGeneration++;
    cpuLoopRunning = false;
  }

  function closeCityModal() {
    if (pendingNextLeg) {
      const next = pendingNextLeg;
      pendingNextLeg = null;
      set({ ui: { kind: "next-leg", ...next } });
      return;
    }
    finishHumanLandingAndAdvance();
  }

  function dismissNextLeg() {
    finishHumanLandingAndAdvance();
  }

  /**
   * 青マス・赤マスの出来事を閉じる。
   * 人間の手番なら次へ進め、CPUの手番ならCPUループの待ちを解く。
   */
  function dismissMoneyEvent() {
    if (get().ui.kind !== "money-event") return;
    const session = get().session;
    const player = session ? currentPlayer(session) : null;
    if (player?.isCpu) {
      set({ ui: { kind: "cpu-turn", playerName: player.name } });
      return;
    }
    finishHumanLandingAndAdvance();
  }

  function dismissSeasonModal() {
    const { context, session } = get();
    if (!context || !session) return;
    if (isOver(session)) {
      const outcome = endGame(context, session);
      set({ session: outcome.session, ui: { kind: "game-over", outcome } });
      return;
    }
    set({ ui: { kind: "idle" } });
    saveGame(gameRepository, session);
    void runCpuLoopIfNeeded();
  }

  /** 複数行のログをまとめて先頭に積む。 */
  function appendLogs(entries: readonly LogEntry[]) {
    if (entries.length === 0) return;
    set((s) => ({ log: [...[...entries].reverse(), ...s.log].slice(0, 60) }));
  }

  /**
   * 現在の手番プレイヤーがCPUである限り、自動で手番を進め続ける。
   *
   * legacyはCPUの手番でも駒の移動アニメーションやモーダルを `await` していたため、
   * 何が起きたか目で追えた。このアプリではドメイン処理自体は同期的に完了するので、
   * **1手番ごとに間を置き、その都度セッションとログを反映**することで同じ体験にする
   * (一瞬で全CPUの手番が終わってしまう問題への対応)。
   */
  async function runCpuLoopIfNeeded(): Promise<void> {
    if (cpuLoopRunning) return;
    const generation = ++cpuLoopGeneration;
    cpuLoopRunning = true;
    try {
      let guard = 0;
      while (guard++ < 200) {
        if (generation !== cpuLoopGeneration) return;
        const { context, session } = get();
        if (!context || !session || isOver(session)) break;
        const player = currentPlayer(session);
        if (!player.isCpu) break;

        // 「◯◯の手番」を出す。
        set({ ui: { kind: "cpu-turn", playerName: player.name } });
        await delay(CPU_TIMING.beforeRoll);
        if (generation !== cpuLoopGeneration) return;

        const result = cpuTakeTurn(context, session, player.id, random, drawQuestion, drawMoneyEvent);
        if (result.strike?.type === "struck") soundAdapter.playDoom(result.strike.wasKing);

        // 1. サイコロを人間の手番と同じフル演出で見せる(振った目が分かるように)。
        if (result.steps !== undefined) {
          soundAdapter.playRattle();
          set((s) => ({
            diceRoll: {
              nonce: (s.diceRoll?.nonce ?? 0) + 1,
              value: result.steps!,
              // CPUは複数個振るアイテムを使わない(cpu-item-strategyが対象外にしている)ので常に1個。
              rolls: [result.steps!],
            },
          }));
          await delay(CPU_TIMING.diceAnimation);
          if (generation !== cpuLoopGeneration) return;
        }

        // 2. 盤面に反映して駒を動かす(トークンはCSSトランジションで滑る)。
        set({ session: result.session });
        const moved = result.session.players.find((p) => p.id === player.id);
        if (moved) soundAdapter.setRegion(context.getNode(moved.location).regionId);
        appendLogs(describeCpuTurn(context, player.name, result));
        await delay(CPU_TIMING.afterMove);
        if (generation !== cpuLoopGeneration) return;

        // 3. 着地した先で何が起きたかを、人間と同じ形のモーダルで見せる。
        const shown = await showCpuLanding(context, player.name, result, generation);
        if (!shown) return;

        const afterTurn = get().session;
        if (!afterTurn) return;
        if (isOver(afterTurn)) break;
        if (result.extraTurn) continue;

        const adv = advanceTurn(context, afterTurn, random);
        set({ session: adv.session });
        appendLogs(
          adv.quarterlyIncome.map((q) => {
            const name = adv.session.players.find((p) => p.id === q.playerId)?.name ?? String(q.playerId);
            return logEntry("quarterly", [name, formatMoney(q.amount, context.content.currency)], "good");
          }),
        );

        if (isOver(adv.session)) break;
        if (adv.season) {
          // 月替わりイベントのモーダルを表示するため、ここで一旦止める
          // (閉じられたら dismissSeasonModal から自動進行を再開する)。
          soundAdapter.playChime();
          appendLogs([logEntry("seasonLog", [adv.season.emoji, adv.season.name], "gold")]);
          set({ ui: { kind: "season", season: adv.season } });
          saveGame(gameRepository, adv.session);
          // **CPUの手番のあいだは、待って自動で進む。**
          // 月替わりは全員に関わるので消さない。ただしここで止めると、
          // 決めることが無いのに毎月「続ける」を押させることになる
          // (CPU2人・12ヶ月で相当な回数、という報告が出た)。
          // 押せばその場で飛ばせる(`waitForSeason` は kind の変化で抜ける)。
          await waitForSeason(generation);
          if (generation !== cpuLoopGeneration) return;
          if (get().ui.kind === "season") set({ ui: { kind: "idle" } });
          continue;
        }
      }

      if (generation !== cpuLoopGeneration) return;
      const { context, session } = get();
      if (!context || !session) return;

      if (isOver(session)) {
        const outcome = endGame(context, session);
        soundAdapter.playWin();
        set((s) => ({
          session: outcome.session,
          ui: { kind: "game-over", outcome },
          log: pushLog(s, "gameOverLog", [], "gold"),
        }));
        return;
      }

      set({ ui: { kind: "idle" } });
      saveGame(gameRepository, session);
    } finally {
      if (generation === cpuLoopGeneration) cpuLoopRunning = false;
    }
  }

  /**
   * CPUが着地したマスの結果を、人間の手番と同じ見せ方でモーダル表示する。
   * legacyもCPUの手番では自動で閉じるモーダル(`autoModal`)を出していた。
   * 戻り値がfalseなら、途中でループが中断された(=呼び出し側は打ち切る)。
   */
  async function showCpuLanding(
    context: GameEngineContext,
    playerName: string,
    result: ReturnType<typeof cpuTakeTurn>,
    generation: number,
  ): Promise<boolean> {
    const landing = result.landing;
    if (!landing) return generation === cpuLoopGeneration;

    if (landing.type === "quiz") {
      if (landing.outcome.correct) soundAdapter.playRight();
      else soundAdapter.playWrong();
      set({
        ui: {
          kind: "cpu-quiz",
          playerName,
          question: landing.question,
          correct: landing.outcome.correct,
          amount: formatMoney(landing.outcome.amount.amount, context.content.currency),
        },
      });
      await waitForModal(generation);
      return generation === cpuLoopGeneration;
    }

    if (landing.type === "money") {
      if (landing.outcome.gained) soundAdapter.playCoin();
      else soundAdapter.playWrong();
      set({
        ui: {
          kind: "money-event",
          playerName,
          event: landing.outcome.event,
          amount: formatMoney(landing.outcome.amount.amount, context.content.currency),
          gained: landing.outcome.gained,
        },
      });
      await waitForModal(generation);
      return generation === cpuLoopGeneration;
    }

    if (landing.type === "card") {
      soundAdapter.playChime();
      return generation === cpuLoopGeneration;
    }

    if (landing.type === "city" || landing.type === "destination") {
      const visit = landing.visit;
      if (landing.type === "destination") soundAdapter.playArrival();
      if (visit.purchases.length > 0 || visit.upgrades.length > 0 || visit.boughtItem) soundAdapter.playBuy();
      set({
        ui: {
          kind: "cpu-city",
          playerName,
          cityId: visit.cityId,
          visit,
          arrivalPrize: landing.type === "destination" ? landing.outcome.prize : null,
        },
      });
      await waitForModal(generation);
      return generation === cpuLoopGeneration;
    }

    return generation === cpuLoopGeneration;
  }

  /**
   * CPUの結果モーダルを一定時間表示する。プレイヤーが閉じた(= uiが別の状態に
   * 変わった)場合は待たずに進み、待たされ続けないようにする。
   */
  /**
   * CPUの手番で出るモーダルのうち、**プレイヤーに決めることが無いもの。**
   *
   * 町とクイズは前から自動で閉じていたが、**出来事(青・赤マス)**は
   * `waitForModal` を呼んでいるのに**待つ対象に入っていなかった**ので、
   * すぐ抜けて押すまで残っていた。CPU2人・12ヶ月だと、決めることが無いのに
   * 押させる回数がかなりの数になる、という報告が出た。
   *
   * 厄災(`doom`)はここに入れない。**CPUの手番ではモーダルを出さず音だけ**で、
   * `doom` が出るのは人間の手番だけだから。
   *
   * **人間の手番では自動で閉じない。**そちらは自分に起きたことなので、
   * 読み終えてから進めたい。ここに入るのはCPUの手番のあいだだけ。
   */
  const CPU_AUTO_CLOSE = ["cpu-city", "cpu-quiz", "money-event"] as const;

  /**
   * 月替わりのモーダルを、CPUの手番のあいだだけ待つ。
   * 読む時間が要るので、結果モーダルより長めに置く。
   */
  async function waitForSeason(generation: number): Promise<void> {
    const step = 100;
    for (let waited = 0; waited < CPU_TIMING.seasonModal; waited += step) {
      await delay(step);
      if (generation !== cpuLoopGeneration) return;
      if (get().ui.kind !== "season") return; // プレイヤーが閉じた
    }
  }

  async function waitForModal(generation: number): Promise<void> {
    const step = 100;
    for (let waited = 0; waited < CPU_TIMING.resultModal; waited += step) {
      await delay(step);
      if (generation !== cpuLoopGeneration) return;
      const kind = get().ui.kind;
      // プレイヤーが自分で閉じたら、待たずに進む。
      if (!(CPU_AUTO_CLOSE as readonly string[]).includes(kind)) return;
    }
  }

  function finishHumanLandingAndAdvance() {
    const { context, session } = get();
    if (!context || !session) return;
    const player = currentPlayer(session);
    let current = settleSpiritAfterTurn(context, session);

    if (isOver(current)) {
      const outcome = endGame(context, current);
      soundAdapter.playWin();
      set((s) => ({
        session: outcome.session,
        ui: { kind: "game-over", outcome },
        log: pushLog(s, "gameOverLog", [], "gold"),
      }));
      return;
    }

    if (player.hasExtraTurn) {
      current = { ...current, players: current.players.map((p) => (p.id === player.id ? { ...p, hasExtraTurn: false } : p)) };
      set((s) => ({ session: current, ui: { kind: "idle" }, log: pushLog(s, "extraTurn", [player.name], "gold") }));
      return;
    }

    const adv = advanceTurn(context, current, random);
    current = adv.session;
    if (adv.season) soundAdapter.playChime();
    set((s) => {
      const extra: LogEntry[] = [];
      if (adv.season) extra.push(logEntry("seasonLog", [adv.season.emoji, adv.season.name], "gold"));
      for (const q of adv.quarterlyIncome) {
        const name = current.players.find((p) => p.id === q.playerId)?.name ?? String(q.playerId);
        extra.push(logEntry("quarterly", [name, formatMoney(q.amount, context.content.currency)], "good"));
      }
      const ui = adv.season ? ({ kind: "season", season: adv.season } as const) : ({ kind: "idle" } as const);
      return { session: current, ui, log: [...extra.reverse(), ...s.log].slice(0, 60) };
    });

    if (isOver(current)) {
      const outcome = endGame(context, current);
      set({ session: outcome.session, ui: { kind: "game-over", outcome } });
      return;
    }
    saveGame(gameRepository, current);
    if (!adv.season) void runCpuLoopIfNeeded();
  }

  function resolveLandingForHuman(landedNodeId: NodeId) {
    const { context, session } = get();
    if (!context || !session) return;
    const player = currentPlayer(session);
    const node = context.getNode(landedNodeId);
    const money = (amount: number) => formatMoney(amount, context.content.currency);

    if (isCityNode(node) && node.cityId === session.destination) {
      const arrival = arriveAtDestination(context, session, player.id, random);
      soundAdapter.playArrival();
      set((s) => ({
        session: arrival.session,
        log: pushLog(s, "arriveDestLog", [player.name, money(arrival.prize)], "gold"),
      }));
      pendingNextLeg = {
        firstTimeSpiritAppearance: arrival.firstTimeSpiritAppearance,
        spiritHolderId: arrival.spiritHolderId,
      };
      set({ ui: { kind: "city", cityId: node.cityId, arrivalPrize: arrival.prize } });
      return;
    }
    if (node.type === "quiz") {
      // 出題する難易度はプレイヤーの知識レベルに応じて抽選する。
      // どの難易度も確率0にはならないので、くわしい人にもたまに易しい問題が出る。
      const difficulty = rollDifficulty(player.knowledgeLevel, random);
      const question = drawQuestion(difficulty);
      set({
        ui: {
          kind: "quiz",
          question,
          // 知識レベルが初級なら誤答を1つ伏せて2択にする。
          optionOrder: visibleOptionOrder(question, player.knowledgeLevel, random),
        },
      });
      return;
    }
    if (node.type === "blue" || node.type === "red") {
      const event = drawMoneyEvent(node.type === "blue" ? "gain" : "loss", node.regionId);
      const outcome = applyMoneyEvent(session, player.id, event);
      if (outcome.gained) soundAdapter.playCoin();
      else soundAdapter.playWrong();
      set((s) => ({
        session: outcome.session,
        log: pushLog(
          s,
          outcome.gained ? "blueLog" : "redLog",
          [player.name, money(outcome.amount.amount)],
          outcome.gained ? "good" : "bad",
        ),
        ui: {
          kind: "money-event",
          playerName: player.name,
          event: outcome.event,
          amount: formatMoney(outcome.amount.amount, context.content.currency),
          gained: outcome.gained,
        },
      }));
      return;
    }

    if (node.type === "card") {
      const outcome = landOnCardSquare(context, session, player.id, random);
      soundAdapter.playChime();
      const item = outcome.itemKey ? context.content.items.find((i) => i.key === outcome.itemKey) : undefined;
      set((s) => ({
        session: outcome.session,
        log: item
          ? pushLog(s, "cardLog", [player.name, item.emoji, item.name], "gold")
          : pushLog(s, "cardEmptyLog", [player.name], "neutral"),
      }));
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
    runCpuLoopIfNeeded,
    resetDecks,
    drawMoneyEvent,
    cancelCpuLoop,
    dismissCpuModal,
    dismissMoneyEvent,
    finishHumanLandingAndAdvance,
    resolveLandingForHuman,
    dismissSeasonModal,
    closeCityModal,
    dismissNextLeg,
  };
}
