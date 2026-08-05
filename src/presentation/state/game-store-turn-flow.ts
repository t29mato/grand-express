import { NodeId, PlayerId } from "../../domain/shared-kernel/ids";
import { currentPlayer, isOver } from "../../domain/game-session/game-session";
import { isCityNode } from "../../domain/board/node";
import { advanceTurn } from "../../application/use-cases/advance-turn/advance-turn.use-case";
import { settleSpiritAfterTurn } from "../../application/use-cases/move-player/settle-spirit-after-turn.use-case";
import { landOnMoneySquare } from "../../application/use-cases/land-on-square/money-square.use-case";
import { landOnCardSquare } from "../../application/use-cases/land-on-square/card-square.use-case";
import { arriveAtDestination } from "../../application/use-cases/land-on-square/arrive-destination.use-case";
import { cpuTakeTurn } from "../../application/use-cases/cpu-take-turn/cpu-take-turn.use-case";
import { endGame } from "../../application/use-cases/end-game/end-game.use-case";
import { saveGame } from "../../application/use-cases/save-load-game/save-load-game.use-case";
import { formatMoney } from "../i18n/money-format";
import { GetGameState, LogEntry, SetGameState } from "./game-store-types";
import { gameRepository, random, soundAdapter } from "./game-store-dependencies";
import { logEntry, pushLog } from "./game-store-log";
import { describeCpuTurn, shuffledIndexes } from "./game-store-formatters";

/** CPUの1手番を見せるための間(ミリ秒)。人がログと駒の動きを追える速さにする。 */
const CPU_TURN_DELAY_MS = 1100;

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

        // 「◯◯が手番を進めています」を出してから、少し待って結果を見せる。
        set({ ui: { kind: "cpu-turn", playerName: player.name } });
        await delay(CPU_TURN_DELAY_MS * 0.35);
        if (generation !== cpuLoopGeneration) return;

        const result = cpuTakeTurn(context, session, player.id, random);
        if (result.strike?.type === "struck") soundAdapter.playDoom(result.strike.wasKing);
        const moved = result.session.players.find((p) => p.id === player.id);
        if (moved) soundAdapter.setRegion(context.getNode(moved.location).regionId);
        if (result.landing?.type === "destination") soundAdapter.playFanfare();
        else if (result.landing?.type === "quiz") {
          if (result.landing.outcome.correct) soundAdapter.playRight();
          else soundAdapter.playWrong();
        } else if (result.landing?.type === "money") {
          if (result.landing.outcome.gained) soundAdapter.playCoin();
          else soundAdapter.playWrong();
        }

        set({ session: result.session });
        appendLogs(describeCpuTurn(context, player.name, result));
        await delay(CPU_TURN_DELAY_MS * 0.65);
        if (generation !== cpuLoopGeneration) return;

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
          return;
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
      soundAdapter.playFanfare();
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
      const question = context.content.quiz[random.nextInt(context.content.quiz.length)];
      set({ ui: { kind: "quiz", question, tier: node.tier, optionOrder: shuffledIndexes(question.options.length, random) } });
      return;
    }
    if (node.type === "blue" || node.type === "red") {
      const outcome = landOnMoneySquare(session, player.id, node.type === "blue", random);
      if (outcome.gained) soundAdapter.playCoin();
      else soundAdapter.playWrong();
      set((s) => ({
        session: outcome.session,
        log: pushLog(
          s,
          outcome.gained ? "blueLog" : "redLog",
          [player.name, money(outcome.amount)],
          outcome.gained ? "good" : "bad",
        ),
      }));
      finishHumanLandingAndAdvance();
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
    cancelCpuLoop,
    finishHumanLandingAndAdvance,
    resolveLandingForHuman,
    dismissSeasonModal,
    closeCityModal,
    dismissNextLeg,
  };
}
