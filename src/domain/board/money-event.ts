import { LocalizedText } from "../shared-kernel/localized-text";
import { MoneyEventId, RegionId } from "../shared-kernel/ids";

/**
 * 青マス・赤マスで起きる出来事。
 *
 * かつては「ルーレットで金額が決まる」だけで、なぜ増えたのか減ったのかが
 * 分からなかった。所持金が動く理由を**その国のその地方でありそうな話**として
 * 持たせることで、止まるたびに土地のことが少しずつ分かるようにする。
 * (例: 高山病で病院にかかる/祭りの人手を頼まれて日当をもらう)
 */
export interface MoneyEvent {
  readonly id: MoneyEventId;
  /** 所持金が増えるか減るか。青マスは gain、赤マスは loss から選ばれる。 */
  readonly kind: "gain" | "loss";
  /**
   * この出来事が起こりうる地方。空なら国内どこでも起こりうる。
   * 「知床でヒグマに出会う」のように土地に強く結びついた話は地方を絞る。
   */
  readonly regionIds: readonly RegionId[];
  readonly emoji: string;
  readonly title: LocalizedText;
  /** 何が起きたのか(2文程度)。 */
  readonly narrative: LocalizedText;
  /** 動く金額(正の値。減る場合も正で持ち、符号は kind が決める)。 */
  readonly amount: number;
}

/**
 * その地方で起こりうる出来事だけに絞り込む。
 * 地方を指定していない出来事は常に候補に含まれる。
 */
export function eventsFor(
  events: readonly MoneyEvent[],
  kind: MoneyEvent["kind"],
  regionId: RegionId,
): readonly MoneyEvent[] {
  const matching = events.filter(
    (event) =>
      event.kind === kind &&
      (event.regionIds.length === 0 || event.regionIds.includes(regionId)),
  );
  // その地方向けの話が1つも無い場合に手番が止まらないよう、種別だけで拾い直す。
  return matching.length > 0 ? matching : events.filter((event) => event.kind === kind);
}
