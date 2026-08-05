import { NodeId } from "../../domain/shared-kernel/ids";
import { currentPlayer, isOver } from "../../domain/game-session/game-session";
import { isCityNode } from "../../domain/board/node";
import { SeasonDefinition } from "../../domain/season/season-effect";
import { advanceTurn } from "../../application/use-cases/advance-turn/advance-turn.use-case";
import { settleSpiritAfterTurn } from "../../application/use-cases/move-player/settle-spirit-after-turn.use-case";
import { landOnMoneySquare } from "../../application/use-cases/land-on-square/money-square.use-case";
import { landOnCardSquare } from "../../application/use-cases/land-on-square/card-square.use-case";
import { arriveAtDestination } from "../../application/use-cases/land-on-square/arrive-destination.use-case";
import { cpuTakeTurn } from "../../application/use-cases/cpu-take-turn/cpu-take-turn.use-case";
import { endGame } from "../../application/use-cases/end-game/end-game.use-case";
import { saveGame } from "../../application/use-cases/save-load-game/save-load-game.use-case";
import { GetGameState, LogEntry, SetGameState } from "./game-store-types";
import { gameRepository, random, soundAdapter } from "./game-store-dependencies";
import { newLogId, pushLog } from "./game-store-log";
import { describeCpuTurn, shuffledIndexes } from "./game-store-formatters";

/**
 * 手番進行(CPUループ・人間の着地後処理・着地内容の解決)を担う3つの関数。
 * zustandの `set`/`get` を閉じ込めるため、ファクトリ関数として `game-store.ts` の
 * `create()` コールバックから呼び出す。
 */
export function createTurnFlowActions(set: SetGameState, get: GetGameState) {
  /**
   * 月替わりイベントのモーダル(ui.kind === "season")を閉じて、保留していた手番の続きに進む。
   * legacyの `applySeason()` は月替わりのたびに(1ヶ月目を除き)モーダルを表示して
   * `await` で止まるが、季節効果自体(収入補正・現金増減等)はモーダル表示に関わらず
   * 即座に反映される。このアプリでも `advanceTurn` の時点で効果はすでに `session` へ
   * 反映済みなので、ここでの再開処理は「表示を閉じてCPUの自動進行を再開する」だけでよい。
   */
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
    runCpuLoopIfNeeded();
  }

  /** 現在の手番プレイヤーがCPUである限り、自動で手番を進め続ける。 */
  function runCpuLoopIfNeeded() {
    const { context, session } = get();
    if (!context || !session || isOver(session)) return;

    let current = session;
    const logs: LogEntry[] = [];
    let guard = 0;
    let pendingSeason: SeasonDefinition | undefined;
    while (!isOver(current) && currentPlayer(current).isCpu && guard < 50) {
      guard++;
      const player = currentPlayer(current);
      const result = cpuTakeTurn(context, current, player.id, random);
      current = result.session;
      logs.push({ id: newLogId(), text: describeCpuTurn(player.name, result), tone: "neutral" });
      if (result.strike?.type === "struck") soundAdapter.playDoom(result.strike.wasKing);
      const movedPlayer = current.players.find((p) => p.id === player.id);
      if (movedPlayer) soundAdapter.setRegion(context.getNode(movedPlayer.location).regionId);

      if (isOver(current)) break;
      if (!result.extraTurn) {
        const adv = advanceTurn(context, current, random);
        current = adv.session;
        for (const q of adv.quarterlyIncome) {
          logs.push({ id: newLogId(), text: `${q.playerId} +${q.amount} (quarterly income)`, tone: "good" });
        }
        if (adv.season) {
          // 月替わりイベントのモーダルを表示するため、CPUの連続進行を一旦止める
          // (ダイアログはdismissSeasonModal経由で閉じられ、そこから自動進行を再開する)。
          pendingSeason = adv.season;
          break;
        }
      }
    }

    if (isOver(current)) {
      const outcome = endGame(context, current);
      soundAdapter.playWin();
      set((s) => ({ session: outcome.session, ui: { kind: "game-over", outcome }, log: [...logs.reverse(), ...s.log].slice(0, 60) }));
      return;
    }

    if (pendingSeason) {
      soundAdapter.playChime();
      set((s) => ({ session: current, ui: { kind: "season", season: pendingSeason! }, log: [...logs.reverse(), ...s.log].slice(0, 60) }));
      saveGame(gameRepository, current);
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
      soundAdapter.playWin();
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
    if (adv.season) soundAdapter.playChime();
    set((s) => {
      let log = s.log;
      if (adv.season) {
        log = [{ id: newLogId(), text: `${adv.season.emoji} ${adv.season.name.en}`, tone: "gold" }, ...log];
      }
      for (const q of adv.quarterlyIncome) {
        log = [{ id: newLogId(), text: `+${q.amount} quarterly income (${q.playerId})`, tone: "good" }, ...log];
      }
      // 月が替わったらイベントのモーダルを表示し、閉じられるまで手番の進行を止める
      // (legacyの `applySeason()` が `await modalOnce(...)` で止めるのと同じ挙動)。
      const ui = adv.season ? ({ kind: "season", season: adv.season } as const) : ({ kind: "idle" } as const);
      return { session: current, ui, log: log.slice(0, 60) };
    });

    if (isOver(current)) {
      const outcome = endGame(context, current);
      set({ session: outcome.session, ui: { kind: "game-over", outcome } });
      return;
    }
    saveGame(gameRepository, current);
    // 季節モーダルを出した場合は、閉じたとき(dismissSeasonModal)に自動進行を再開する。
    if (!adv.season) runCpuLoopIfNeeded();
  }

  function resolveLandingForHuman(landedNodeId: NodeId) {
    const { context, session } = get();
    if (!context || !session) return;
    const player = currentPlayer(session);
    const node = context.getNode(landedNodeId);

    if (isCityNode(node) && node.cityId === session.destination) {
      const arrival = arriveAtDestination(context, session, player.id, random);
      soundAdapter.playFanfare();
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
      if (outcome.gained) soundAdapter.playCoin();
      else soundAdapter.playWrong();
      set((s) => ({
        session: outcome.session,
        log: pushLog(s, outcome.gained ? `${player.name} +${outcome.amount}` : `${player.name} -${outcome.amount}`, outcome.gained ? "good" : "bad"),
      }));
      finishHumanLandingAndAdvance();
      return;
    }
    if (node.type === "card") {
      const outcome = landOnCardSquare(context, session, player.id, random);
      soundAdapter.playChime();
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

  return { runCpuLoopIfNeeded, finishHumanLandingAndAdvance, resolveLandingForHuman, dismissSeasonModal };
}
