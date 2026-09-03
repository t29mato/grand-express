import { CityId, CountryId, GameSessionId, RegionId } from "../shared-kernel/ids";
import { Money } from "../shared-kernel/money";
import { Player } from "../player/player";
import { INITIAL_MISFORTUNE_STATE, MisfortuneSpiritState } from "../misfortune/misfortune-spirit";
import { EMPTY_LEARNING_RECORD, LearningRecord } from "../quiz/learning-record";

export type GameSessionStatus = "in-progress" | "finished";

/**
 * ゲームセッション集約。現行コードのグローバル変数(`players`, `turnIdx`,
 * `month`, `dest`, `spiritHolder` 等)を1つの不変オブジェクトにまとめたもの
 * (docs/10-architecture/02-domain-model-ddd.md 2.1節)。
 */
export interface GameSession {
  readonly id: GameSessionId;
  readonly countryId: CountryId;
  readonly month: number;
  readonly maxMonths: number;
  readonly activePlayerIndex: number;
  readonly players: readonly Player[];
  readonly destination: CityId;
  readonly misfortune: MisfortuneSpiritState;
  readonly status: GameSessionStatus;
  readonly regionIncomeModifiers: ReadonlyMap<RegionId, number>;
  /** この回のプレイで間違えた問題(終了時のおさらいに使う)。 */
  readonly learningRecord: LearningRecord;
}

export function createGameSession(params: {
  id: GameSessionId;
  countryId: CountryId;
  maxMonths: number;
  players: readonly Player[];
  destination: CityId;
}): GameSession {
  return {
    id: params.id,
    countryId: params.countryId,
    month: 0,
    maxMonths: params.maxMonths,
    activePlayerIndex: 0,
    players: params.players,
    destination: params.destination,
    misfortune: INITIAL_MISFORTUNE_STATE,
    status: "in-progress",
    regionIncomeModifiers: new Map(),
    learningRecord: EMPTY_LEARNING_RECORD,
  };
}

export function currentPlayer(session: GameSession): Player {
  return session.players[session.activePlayerIndex];
}

export function replacePlayer(session: GameSession, updated: Player): GameSession {
  return {
    ...session,
    players: session.players.map((p) => (p.id === updated.id ? updated : p)),
  };
}

export function replacePlayers(session: GameSession, players: readonly Player[]): GameSession {
  return { ...session, players };
}

/** 手番を次のプレイヤーへ進める。1周したら新しい月が始まったことを合わせて返す。 */
export function advanceTurn(session: GameSession): { session: GameSession; newMonthStarted: boolean } {
  const nextIndex = (session.activePlayerIndex + 1) % session.players.length;
  const wrapped = nextIndex === 0;
  return {
    session: {
      ...session,
      activePlayerIndex: nextIndex,
      month: wrapped ? session.month + 1 : session.month,
    },
    newMonthStarted: wrapped,
  };
}

export function isOver(session: GameSession): boolean {
  return session.status === "finished" || session.month >= session.maxMonths;
}

export function finish(session: GameSession): GameSession {
  return { ...session, status: "finished" };
}

/** 目的地到着時の賞金の、出発時点の額。 */
export const DESTINATION_PRIZE_BASE = 700;

/**
 * 1ヶ月経つごとに増える賞金の額。
 *
 * **誰も着かなくても、月が進めば増える。**遅れている人にも「いま取れば大きい」
 * という道が残るようにするための仕組みだが、画面には増えた金額しか出ておらず、
 * 遊んだ人には**理由が分からないまま数字だけが動いて見えていた**
 * (実プレイの記録 2026-09-02: ¥7,000,000 → 7,700,000 → 8,400,000 → 9,100,000)。
 * 増える幅をここに名前付きで置き、画面でも「1ヶ月で +◯◯」と添える。
 */
export const DESTINATION_PRIZE_PER_MONTH = 70;

/** 目的地到着時の賞金(月が進むほど増える。現行コードの `destBonus`)。 */
export function destinationPrize(session: GameSession): Money {
  return Money.of(DESTINATION_PRIZE_BASE + DESTINATION_PRIZE_PER_MONTH * session.month);
}

/**
 * **画面の前にいる人。**サイドバーの主役はいつもこの人。
 *
 * 実プレイの記録(2026-09-02)で、CPU 1 の手番のあいだサイドバーの「アイテム」が
 * CPU 1 の持ちものに切り替わり、**自分の持ちものが見えなくなった。**
 * 手番の人と、画面を見ている人は別である。
 *
 * - 手番の人が人間なら、その人(パス&プレイでは手番の人に切り替わるのが正しい)
 * - 手番の人がCPUなら、**直前に手番だった人間**(手番の並びを逆に辿る)
 * - 人間が1人もいなければ、手番の人をそのまま返す
 */
export function spotlightPlayer(session: GameSession): Player {
  const count = session.players.length;
  for (let back = 0; back < count; back++) {
    const player = session.players[(session.activePlayerIndex - back + count * count) % count];
    if (!player.isCpu) return player;
  }
  return currentPlayer(session);
}

export function setDestination(session: GameSession, destination: CityId): GameSession {
  return { ...session, destination };
}

export function setRegionIncomeModifiers(
  session: GameSession,
  modifiers: ReadonlyMap<RegionId, number>,
): GameSession {
  return { ...session, regionIncomeModifiers: modifiers };
}

export function setMisfortune(session: GameSession, misfortune: MisfortuneSpiritState): GameSession {
  return { ...session, misfortune };
}

/** 0=4月始まりの月インデックス(現行コードの `month%12`)。 */
export function seasonIndex(session: GameSession): number {
  return session.month % 12;
}

export function currentYear(session: GameSession): number {
  return Math.floor(session.month / 12) + 1;
}

/** 四半期(3ヶ月)ごとの収入発生タイミングかどうか(現行コードの `month%3===0`)。 */
export function isQuarterlyIncomeMonth(session: GameSession): boolean {
  return session.month % 3 === 0;
}
