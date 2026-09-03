import { CityId, NodeId, PlayerId, RegionId } from "../../domain/shared-kernel/ids";
import { hasSeenCity, markCitySeen } from "../../domain/player/player";
import { currentPlayer, isOver } from "../../domain/game-session/game-session";
import { RevealEventKind, revealClassFor, revealModeFor } from "../../domain/game-session/reveal-class";
import { isCityNode } from "../../domain/board/node";
import { windowNoteFor } from "../../domain/board/window-note";
import { monopolisedCities } from "../../domain/property/property-income-service";
import { advanceTurn } from "../../application/use-cases/advance-turn/advance-turn.use-case";
import { QuarterlySettlementRow } from "../../application/use-cases/advance-turn/advance-turn.use-case";
import { settleSpiritAfterTurn } from "../../application/use-cases/move-player/settle-spirit-after-turn.use-case";
import { landOnCardSquare } from "../../application/use-cases/land-on-square/card-square.use-case";
import { arriveAtDestination } from "../../application/use-cases/land-on-square/arrive-destination.use-case";
import { cpuTakeTurn } from "../../application/use-cases/cpu-take-turn/cpu-take-turn.use-case";
import { endGame } from "../../application/use-cases/end-game/end-game.use-case";
import { saveGame } from "../../application/use-cases/save-load-game/save-load-game.use-case";
import { economyContextFor } from "../../application/economy-context";
import { formatMoney } from "../i18n/money-format";
import { GameEngineContext } from "../../application/game-engine-context";
import { GameSession } from "../../domain/game-session/game-session";
import { GetGameState, LogEntry, SetGameState } from "./game-store-types";
import { gameRepository, random, soundAdapter } from "./game-store-dependencies";
import { logEntry, pushLog } from "./game-store-log";
import { updateFinalStretchMusic } from "./final-stretch-music";
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
  /**
   * 月替わりのモーダルを出しておく時間(クリックで飛ばせる)。
   * 結果モーダルより長い。季節の話は読む量が多く、絵もあるため。
   */
  seasonModal: 4200,
} as const;

/**
 * 出来事の階級ごとに、画面に置いておく時間(ミリ秒)。
 *
 * **止めて見せる場面が増えたぶん、流す場面は短くする。**
 * 他人の手番の結果カードは 2900ms から 2000ms に詰めた。増えたのは
 * 盤面全体の見せ場(到着・新目的地・独占・決算)で、そちらは長めに置くが
 * **押せばその場で飛ばせる。**
 */
const REVEAL_TIMING = {
  /** 本人以外の手番で流す、自動送りのカード。 */
  auto: 2000,
  /** 盤面全体の見せ場。押すか、この時間で送る。 */
  headline: 5200,
} as const;

/**
 * 階級だけでは決められない、出来事ごとの置き時間。
 *
 * **到達は2枚に分かれた**(全画面の演出 → 着いた町のカード)。
 * どちらも見せ場だからと 5200ms ずつ置くと、CPUが目的地に着くたびに
 * 案内(`next-leg`)まで含めて15秒以上待たされる。
 * 1枚あたりを詰めて、**合わせて元の1枚+1.2秒**に収める。
 * どちらも押せばその場で飛ばせる。
 */
const HOLD_MS_OVERRIDES: Partial<Record<RevealEventKind, number>> = {
  "arrival-fanfare": 3200,
  "destination-arrival": 3200,
};

function holdMsFor(kind: RevealEventKind): number {
  const override = HOLD_MS_OVERRIDES[kind];
  if (override !== undefined) return override;
  return revealClassFor(kind) === "headline" ? REVEAL_TIMING.headline : REVEAL_TIMING.auto;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * その到達が、**この旅の一番乗り**か(誰もまだ目的地に着いていなかった)。
 *
 * 「その人にとって初めて」ではなく**卓ぜんたいで初めて**にしてある。
 * 演出側(`modals/arrival-fanfare.tsx`)がこの真偽で華やかさを変えるので、
 * 1回の旅で1度きりのほうが、その大きい絵が安売りにならない。
 *
 * `arriveAtDestination` が `destinationsReached` を1つ増やしたあとの局面を渡すこと
 * (増やす前の局面を渡すと、初回が0のままで常に false になる)。
 */
function isFirstArrivalOfJourney(sessionAfterArrival: GameSession): boolean {
  const total = sessionAfterArrival.players.reduce((sum, p) => sum + p.stats.destinationsReached, 0);
  return total === 1;
}

/**
 * 手番進行(CPUループ・人間の着地後処理・着地内容の解決)。
 * zustandの `set`/`get` を閉じ込めるため、ファクトリ関数として `game-store.ts` の
 * `create()` コールバックから呼び出す。
 */
export function createTurnFlowActions(set: SetGameState, get: GetGameState) {
  /**
   * 人間の手番で、町のモーダルを閉じたあとに続けて見せるもの。
   *
   * 見せ場は**順番に1枚ずつ**出す。町 → 独占 → 次の区間、の順。
   * 到着でない普通の町への停車では、どちらも null のまま
   * (=そのまま手番を終える)。
   */
  let pendingNextLeg: {
    firstTimeSpiritAppearance: boolean;
    spiritHolderId: PlayerId | null;
    arrivedBy: string;
    prize: string;
  } | null = null;
  /** いま独占した町(人間の手番。町のモーダルを閉じたあとに見せる)。 */
  let pendingMonopoly: { playerName: string; cityId: CityId } | null = null;
  /**
   * 到達の全画面演出を閉じたあとに開く、着いた町の画面。
   * 演出のあいだに `ui` から町のIDが読めなくなるので、ここに預けておく。
   */
  let pendingArrivalCity: { cityId: CityId; prize: number } | null = null;
  /** 月替わりのモーダルを閉じたあとに見せる、四半期の決算。 */
  let pendingSettlement: { rows: readonly QuarterlySettlementRow[]; month: number } | null = null;

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

  /**
   * CPUが出したカードをプレイヤーが手動で閉じる(演出を飛ばす)。
   * **見せ場も飛ばせる。**押した人はもう読み終えている。
   */
  function dismissCpuModal() {
    const kind = get().ui.kind;
    if (!isCpuAutoClose(kind)) return;
    const player = get().session ? currentPlayer(get().session!) : null;
    set({ ui: { kind: "cpu-turn", playerName: player?.name ?? "" } });
  }

  function cancelCpuLoop() {
    cpuLoopGeneration++;
    cpuLoopRunning = false;
  }

  /**
   * 人間の手番で、町のモーダルのあとに控えている見せ場を1枚出す。
   * もう無ければ手番の後始末に進む。
   */
  function showNextHumanReveal() {
    if (pendingMonopoly) {
      const next = pendingMonopoly;
      pendingMonopoly = null;
      soundAdapter.playFanfare();
      set({ ui: { kind: "monopoly", ...next } });
      return;
    }
    if (pendingNextLeg) {
      const next = pendingNextLeg;
      pendingNextLeg = null;
      set({ ui: { kind: "next-leg", ...next, onCpuTurn: false } });
      return;
    }
    finishHumanLandingAndAdvance();
  }

  function closeCityModal() {
    // 町の一言(1行ガイド)は、この町を閉じたら役目を終える。
    set((s) => (s.guide.cityHintOpen ? { guide: { ...s.guide, cityHintOpen: false } } : {}));
    showNextHumanReveal();
  }

  /**
   * 到達の全画面演出を閉じる。
   *
   * - 人間の手番 … 続けて、着いた町の画面を開く(順番は 到達 → 町 → 次の区間)。
   * - CPUの手番 … 手番を進めるのはCPUループの仕事なので、待ちを解くだけにする。
   */
  function dismissArrival() {
    if (get().ui.kind !== "arrival") return;
    const session = get().session;
    const player = session ? currentPlayer(session) : null;
    if (player?.isCpu) {
      set({ ui: { kind: "cpu-turn", playerName: player.name } });
      return;
    }
    const next = pendingArrivalCity;
    pendingArrivalCity = null;
    if (!next) {
      showNextHumanReveal();
      return;
    }
    openCityModal(next.cityId, next.prize);
  }

  function dismissNextLeg() {
    // **CPUの手番でも出る画面になった。**そのときは手番を進めず、
    // CPUループの待ちを解くだけにする(進めるのはループの仕事)。
    const session = get().session;
    const player = session ? currentPlayer(session) : null;
    if (player?.isCpu) {
      set({ ui: { kind: "cpu-turn", playerName: player.name } });
      return;
    }
    showNextHumanReveal();
  }

  function dismissMonopoly() {
    const session = get().session;
    const player = session ? currentPlayer(session) : null;
    if (player?.isCpu) {
      set({ ui: { kind: "cpu-turn", playerName: player.name } });
      return;
    }
    showNextHumanReveal();
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

  /**
   * 月替わりを閉じる。四半期の決算が控えていれば、続けてそれを出す。
   * 決算は**全員ぶんを1枚で**見せるので、月替わりと同じ「全員の話」の並びに置く。
   */
  function dismissSeasonModal() {
    const { context, session } = get();
    if (!context || !session) return;
    if (isOver(session)) {
      const outcome = endGame(context, session);
      set({ session: outcome.session, ui: { kind: "game-over", outcome } });
      return;
    }
    if (pendingSettlement) {
      const next = pendingSettlement;
      pendingSettlement = null;
      soundAdapter.playCoin();
      set({ ui: { kind: "settlement", ...next } });
      return;
    }
    set({ ui: { kind: "idle" } });
    saveGame(gameRepository, session);
    void runCpuLoopIfNeeded();
  }

  /** 四半期の決算を閉じる。CPUの手番ならループの待ちを解くだけ。 */
  function dismissSettlement() {
    if (get().ui.kind !== "settlement") return;
    const { session } = get();
    const player = session ? currentPlayer(session) : null;
    if (player?.isCpu) {
      set({ ui: { kind: "cpu-turn", playerName: player.name } });
      return;
    }
    set({ ui: { kind: "idle" } });
    if (session) saveGame(gameRepository, session);
    void runCpuLoopIfNeeded();
  }

  /** 車窓の一言を消す(0.8秒後に表示側から呼ぶ)。 */
  function clearArrivalBeat() {
    set({ arrivalBeat: null });
  }

  /** 複数行のログをまとめて先頭に積む。 */
  function appendLogs(entries: readonly LogEntry[]) {
    if (entries.length === 0) return;
    set((s) => ({ log: [...[...entries].reverse(), ...s.log].slice(0, 60) }));
  }

  /**
   * 独占が増えたかを前後で比べる。増えていれば、その町を1つ返す。
   *
   * 独占は収入が2倍になる盤面全体の見せ場だが、達成した瞬間は
   * 旅人一覧の `👑` が1つ増えるだけで、誰も気づかなかった。
   */
  function newMonopoly(
    context: GameEngineContext,
    before: GameSession,
    after: GameSession,
    playerId: PlayerId,
  ): CityId | null {
    const beforePlayer = before.players.find((p) => p.id === playerId);
    const afterPlayer = after.players.find((p) => p.id === playerId);
    if (!beforePlayer || !afterPlayer) return null;
    const had = new Set(monopolisedCities(beforePlayer, economyContextFor(context, before)));
    const now = monopolisedCities(afterPlayer, economyContextFor(context, after));
    return now.find((cityId) => !had.has(cityId)) ?? null;
  }

  /** 人間が物件を買った直後に呼ぶ。独占が増えていれば、町を閉じたあとに知らせる。 */
  function notePurchase(context: GameEngineContext, before: GameSession, after: GameSession, playerId: PlayerId) {
    const cityId = newMonopoly(context, before, after, playerId);
    if (!cityId) return;
    const name = after.players.find((p) => p.id === playerId)?.name ?? "";
    pendingMonopoly = { playerName: name, cityId };
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

        // 2.5 手番の頭で受けた災難を、短いカードで見せる。
        // **これまではCPUの災難は音だけだった。**厄災の神は誰に憑いているかで
        // 盤面が変わるのに、CPUが何を失ったのかは記録を読まないと分からなかった。
        if (result.strike?.type === "struck") {
          set({
            ui: {
              kind: "doom",
              playerName: player.name,
              flavor: result.strike.flavor,
              wasKing: result.strike.wasKing,
              outcome: result.strike.outcome,
              onCpuTurn: true,
            },
          });
          if (!(await holdModal(generation, "doom", holdMsFor("doom")))) return;
        }

        // 3. 着地した先で何が起きたかを、人間と同じ形のモーダルで見せる。
        const shown = await showCpuLanding(context, session, player, result, generation);
        if (!shown) return;

        // 見せ終えた結果モーダルは、ここで畳む。**出したまま手番の後始末に進まない。**
        // `money-event` は人間の手番でも同じ `kind` を使うので、残したままだと
        // このあと手番を返すときに「CPUが出した画面か、人間自身の画面か」が
        // 見分けられなくなる(下の `CPU_OWNED_UI` を参照)。
        if (isCpuAutoClose(get().ui.kind)) set({ ui: { kind: "cpu-turn", playerName: player.name } });

        const afterTurn = get().session;
        if (!afterTurn) return;
        if (isOver(afterTurn)) break;
        if (result.extraTurn) continue;

        const adv = advanceTurn(context, afterTurn, random);
        set({ session: adv.session });
        // 残り2ヶ月に入ったら曲を終盤の色に変える(暦の帯が赤くなるのと同じ月)。
        updateFinalStretchMusic(adv.session);
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
        }

        // 四半期の決算。**月替わりがあってもなくても出す**(月替わりの直後に続けて出る)。
        if (adv.quarterlySettlement.length > 0) {
          soundAdapter.playCoin();
          set({ ui: { kind: "settlement", rows: adv.quarterlySettlement, month: adv.session.month } });
          if (!(await holdModal(generation, "settlement", holdMsFor("settlement")))) return;
          if (get().ui.kind === "settlement") set({ ui: { kind: "idle" } });
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

      // **人間がもう自分の手番を始めていたら、その画面には触らない。**
      // 月替わりを閉じてからループが止まるまでには `waitForSeason` の刻み1つぶんの
      // 間があり、そのあいだに人間はサイコロを振れる。ここで無条件に `idle` へ
      // 戻していたため、**振ったそばから出目が消え、サイコロがまた押せる状態に戻り、
      // 同じ手番を二度振れてしまっていた**(手番の頭に戻るので厄災も二度起きる)。
      if (isCpuOwnedUi(get().ui.kind)) set({ ui: { kind: "idle" } });
      saveGame(gameRepository, session);
    } finally {
      if (generation === cpuLoopGeneration) cpuLoopRunning = false;
    }
  }


  /**
   * 町の画面を開く。**開くと同時に「読んだ」印を付ける。**
   *
   * 初めてかどうかは開いた瞬間の値を `ui` に持たせる。印を付けたあとに
   * 引き直すと必ず「2回目」になってしまうため。
   */
  function openCityModal(cityId: CityId, arrivalPrize: number | null): void {
    const session = get().session;
    if (!session) return;
    const player = currentPlayer(session);
    const firstVisit = !hasSeenCity(player, cityId);
    if (firstVisit) {
      set((s) => ({
        session: {
          ...s.session!,
          players: s.session!.players.map((p) => (p.id === player.id ? markCitySeen(p, cityId) : p)),
        },
      }));
    }
    // **初めて町の画面を開いた「はじめて」の人に、物件の一言を出す。**
    // ここだけは手番の数で切らない。町が遠い引きだと、3手番で切ると
    // **いちばん出したい場面で一度も出ないまま終わる**(実プレイでは5手番かかった)。
    set((s) => {
      const guide = s.guide;
      if (guide.dismissed || guide.cityHintDone) return {};
      if (player.isCpu || player.knowledgeLevel !== "newcomer") return {};
      return { guide: { ...guide, cityHintOpen: true, cityHintDone: true } };
    });
    set({ ui: { kind: "city", cityId, arrivalPrize, firstVisit } });
  }

  /**
   * CPUが着地したマスの結果を、人間の手番と同じ見せ方でモーダル表示する。
   *
   * **何を止めて見せ、何を流すかは `reveal-class.ts` の表だけが決める。**
   * ここで個別に判断を書くと、また「CPUの到着だけ何も出ない」ような穴が空く。
   *
   * 戻り値がfalseなら、途中でループが中断された(=呼び出し側は打ち切る)。
   */
  async function showCpuLanding(
    context: GameEngineContext,
    sessionBefore: GameSession,
    actor: { readonly id: PlayerId; readonly name: string },
    result: ReturnType<typeof cpuTakeTurn>,
    generation: number,
  ): Promise<boolean> {
    const playerName = actor.name;
    const landing = result.landing;
    if (!landing) return generation === cpuLoopGeneration;
    const money = (amount: number) => formatMoney(amount, context.content.currency);
    /** CPUの手番なので、どの出来事も「本人ではない」側から見ることになる。 */
    const show = async (kind: RevealEventKind, uiKind: string): Promise<boolean> => {
      if (revealModeFor(kind, { isOwnTurn: false }) === "none") return generation === cpuLoopGeneration;
      return holdModal(generation, uiKind, holdMsFor(kind));
    };

    if (landing.type === "quiz") {
      if (landing.outcome.correct) soundAdapter.playRight();
      else soundAdapter.playWrong();
      set({
        ui: {
          kind: "cpu-quiz",
          playerName,
          question: landing.question,
          correct: landing.outcome.correct,
          amount: money(landing.outcome.amount.amount),
        },
      });
      return show("quiz", "cpu-quiz");
    }

    if (landing.type === "money") {
      if (landing.outcome.gained) soundAdapter.playCoin();
      else soundAdapter.playWrong();
      set({
        ui: {
          kind: "money-event",
          playerName,
          event: landing.outcome.event,
          amount: money(landing.outcome.amount.amount),
          gained: landing.outcome.gained,
        },
      });
      return show("money-event", "money-event");
    }

    if (landing.type === "card") {
      soundAdapter.playChime();
      return generation === cpuLoopGeneration;
    }

    if (landing.type === "city" || landing.type === "destination") {
      const visit = landing.visit;
      // **町の買い物より先に、着いたことを全画面で見せる。**
      // 誰の手番でも出す見せ場なので、CPUの手番でもここを通る
      // (押さなければ `holdMsFor("arrival-fanfare")` で自動的に送られる)。
      if (landing.type === "destination") {
        soundAdapter.playArrival();
        set({
          ui: {
            kind: "arrival",
            playerName,
            playerIndex: result.session.players.findIndex((p) => p.id === actor.id),
            cityId: visit.cityId,
            prize: landing.outcome.prize,
            isFirstArrival: isFirstArrivalOfJourney(result.session),
          },
        });
        if (!(await show("arrival-fanfare", "arrival"))) return false;
      }
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
      // 到着そのものは盤面全体の見せ場、ただの寄り道は本人だけの出来事。
      if (!(await show(landing.type === "destination" ? "destination-arrival" : "purchase", "cpu-city"))) return false;

      // 独占した町があれば、続けて知らせる。
      const gained = newMonopoly(context, sessionBefore, result.session, actor.id);
      if (gained) {
        soundAdapter.playFanfare();
        set({ ui: { kind: "monopoly", playerName, cityId: gained } });
        if (!(await show("monopoly", "monopoly"))) return false;
      }

      // **目的地に着いたら、次の区間の案内を誰の手番でも出す。**
      // ここが無かったため、CPUが着いたときは目的地が入れ替わったことも、
      // 厄災の神が誰に憑いたのかも画面に出ないままだった。
      if (landing.type === "destination") {
        set({
          ui: {
            kind: "next-leg",
            firstTimeSpiritAppearance: landing.outcome.firstTimeSpiritAppearance,
            spiritHolderId: landing.outcome.spiritHolderId,
            onCpuTurn: true,
            arrivedBy: playerName,
            prize: money(landing.outcome.prize),
          },
        });
        if (!(await show("new-destination", "next-leg"))) return false;
      }
      return generation === cpuLoopGeneration;
    }

    return generation === cpuLoopGeneration;
  }

  /**
   * CPUの手番のあいだ、CPUループが**自分で出して自分で畳む**画面。
   *
   * ここに入っているものは、押さなくても一定時間で送られる。
   * 押せばその場で飛ばせる(`dismissCpuModal`)。
   *
   * **人間の手番では自動で閉じない。**そちらは自分に起きたことなので、
   * 読み終えてから進めたい。ここに入るのはCPUの手番のあいだだけ。
   *
   * ## 厄災(`doom`)を入れた理由
   *
   * 以前は「CPUの手番ではモーダルを出さず音だけ」だったので、この一覧に
   * 入れる必要が無かった。**いまは出す。**厄災の神が誰に憑いていて何を
   * したのかは盤面の読みに直に効くのに、CPUに落ちた災難は記録を読まないと
   * 分からなかった(実プレイの記録 2026-09-02)。本人以外の手番なので
   * 短い自動送りのカードにする(`reveal-class.ts` の `personal`)。
   */
  const CPU_AUTO_CLOSE = [
    "cpu-city",
    "cpu-quiz",
    "money-event",
    "doom",
    "monopoly",
    "next-leg",
    "settlement",
    "arrival",
  ] as const;

  function isCpuAutoClose(kind: string): boolean {
    return (CPU_AUTO_CLOSE as readonly string[]).includes(kind);
  }

  /**
   * **CPUループが自分で出した画面。**手番を人間に返すとき、片付けてよいのはこれだけ。
   *
   * 結果モーダル(`cpu-city`・`cpu-quiz`・`money-event` など)はCPUの手番の終わりに
   * `cpu-turn` へ畳んであるので、ここには入れない。とくに `money-event` は
   * **人間の手番でも同じ `kind`** を使うため、入れると人間の画面まで消してしまう。
   */
  const CPU_OWNED_UI = ["cpu-turn", "season"] as const;

  function isCpuOwnedUi(kind: string): boolean {
    return (CPU_OWNED_UI as readonly string[]).includes(kind);
  }

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

  /**
   * いま出している画面を `ms` のあいだ置く。プレイヤーが閉じたら待たずに進む。
   * 戻り値がfalseなら、途中でループが中断された。
   */
  async function holdModal(generation: number, kind: string, ms: number): Promise<boolean> {
    const step = 100;
    for (let waited = 0; waited < ms; waited += step) {
      await delay(step);
      if (generation !== cpuLoopGeneration) return false;
      // プレイヤーが自分で閉じたら、待たずに進む。
      if (get().ui.kind !== kind) return true;
    }
    return generation === cpuLoopGeneration;
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
    // 残り2ヶ月に入ったら曲を終盤の色に変える(暦の帯が赤くなるのと同じ月)。
    updateFinalStretchMusic(current);
    if (adv.season) soundAdapter.playChime();
    // 決算は月替わりの**あと**に出す(月替わりを閉じたら `dismissSeasonModal` が拾う)。
    pendingSettlement =
      adv.quarterlySettlement.length > 0 ? { rows: adv.quarterlySettlement, month: current.month } : null;
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
      // 旅が終わったら決算は出さない。持ち越すと、次の旅の途中で
      // 前の旅の決算が出てくる。
      pendingSettlement = null;
      const outcome = endGame(context, current);
      set({ session: outcome.session, ui: { kind: "game-over", outcome } });
      return;
    }
    if (!adv.season && pendingSettlement) {
      const next = pendingSettlement;
      pendingSettlement = null;
      soundAdapter.playCoin();
      set({ ui: { kind: "settlement", ...next } });
      saveGame(gameRepository, current);
      return;
    }
    saveGame(gameRepository, current);
    if (!adv.season) void runCpuLoopIfNeeded();
  }

  /** 着地したマスが、どの種類の出来事にあたるか(`reveal-class.ts` の表を引く鍵)。 */
  function landingRevealKind(session: GameSession, node: ReturnType<GameEngineContext["getNode"]>): RevealEventKind {
    if (isCityNode(node)) return node.cityId === session.destination ? "destination-arrival" : "purchase";
    if (node.type === "quiz") return "quiz";
    if (node.type === "blue" || node.type === "red") return "money-event";
    if (node.type === "card") return "card";
    return "quiet";
  }

  function resolveLandingForHuman(landedNodeId: NodeId) {
    const { context, session } = get();
    if (!context || !session) return;
    const player = currentPlayer(session);
    const node = context.getNode(landedNodeId);
    const money = (amount: number) => formatMoney(amount, context.content.currency);

    // **止めて見せるか、返事だけ返すかは `reveal-class.ts` の表が決める。**
    // CPUループ(`showCpuLanding`)と同じ表を、人間の着地でもここで引く。
    // 分岐を両側に書き散らすと、また「CPUの到着だけ何も出ない」ような穴が空く。
    if (revealModeFor(landingRevealKind(session, node), { isOwnTurn: true }) === "none") {
      // 何も起きないマス。**出来事にはしない。返事だけ返す。**
      // 短い汽笛・駒の小さなバウンド・0.8秒の車窓の一言だけで、
      // `ui` は動かさずそのまま手番を終える。
      soundAdapter.playWhistle();
      set((s) => ({
        arrivalBeat: {
          nonce: (s.arrivalBeat?.nonce ?? 0) + 1,
          playerId: player.id,
          nodeId: landedNodeId,
          note: windowNoteFor(node),
        },
      }));
      finishHumanLandingAndAdvance();
      return;
    }

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
        arrivedBy: player.name,
        prize: money(arrival.prize),
      };
      // **町の画面より先に、着いたことを全画面で見せる。**閉じたら町へ進む
      // (`dismissArrival`)。順番は 到達 →(町)→ 次の区間。
      pendingArrivalCity = { cityId: node.cityId, prize: arrival.prize };
      set({
        ui: {
          kind: "arrival",
          playerName: player.name,
          playerIndex: session.activePlayerIndex,
          cityId: node.cityId,
          prize: arrival.prize,
          isFirstArrival: isFirstArrivalOfJourney(arrival.session),
        },
      });
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
          amount: money(outcome.amount.amount),
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
      openCityModal(node.cityId, null);
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
    dismissSettlement,
    dismissMonopoly,
    clearArrivalBeat,
    closeCityModal,
    dismissNextLeg,
    dismissArrival,
    notePurchase,
  };
}
