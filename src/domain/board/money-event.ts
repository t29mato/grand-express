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
  /**
   * その出来事が起こりうる月(0始まりで 0=4月)。空なら通年。
   *
   * 流氷が夏に来たり、モンスーンの氾濫が乾季に起きたりすると嘘になる。
   * 季節を絞ることで、冬の日本海側は雪の事故が増える、といった偏りが
   * 自然に生まれる(マスの色そのものは変えない。毎月色が変わると
   * 盤面の見え方が安定せず、かえって分かりにくくなるため)。
   */
  readonly monthIndices: readonly number[];
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
  monthIndex?: number,
): readonly MoneyEvent[] {
  const inSeason = (event: MoneyEvent) =>
    monthIndex === undefined ||
    event.monthIndices.length === 0 ||
    event.monthIndices.includes(monthIndex);

  const matching = events.filter(
    (event) =>
      event.kind === kind &&
      (event.regionIds.length === 0 || event.regionIds.includes(regionId)) &&
      inSeason(event),
  );
  if (matching.length > 0) return matching;

  // 地方と季節の両方に合う話が無いことがある。手番が止まらないよう、
  // まず季節の条件だけを外し、それでも無ければ種別だけで拾い直す。
  const ignoringRegion = events.filter((event) => event.kind === kind && inSeason(event));
  if (ignoringRegion.length > 0) return ignoringRegion;
  return events.filter((event) => event.kind === kind);
}
