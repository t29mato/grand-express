import { LocalizedText } from "../shared-kernel/localized-text";
import { PlayerId, RegionId } from "../shared-kernel/ids";
import { Player } from "../player/player";
import { PropertyRef } from "../shared-kernel/ids";

/**
 * ゲーム終了時の表彰。
 *
 * 総資産の順位だけだと、最後の集計を見た瞬間に勝負がついてしまう。
 * 「◯◯王」という形で**総資産以外のいろいろな観点**から賞を出し、
 * 1つずつめくっていくことで、最後まで誰が勝ったか分からないようにする。
 *
 * 賞は「その旅で実際に起きたこと」から選ぶ。該当者がいない賞は出さない
 * (誰もクイズに正解していないのに「クイズ王」を出すと嘘になる)。
 */
export type AwardId =
  | "quiz-master"
  | "property-baron"
  | "region-lord"
  | "traveller"
  | "walker"
  | "unlucky";

export interface Award {
  readonly id: AwardId;
  readonly winnerId: PlayerId;
  /** 表彰の根拠になった数値(「12問正解」など)。 */
  readonly value: number;
  /** 地方王のときだけ、その地方。 */
  readonly regionId?: RegionId;
}

/** 賞ごとの、比べる値の取り出し方。0以下なら該当者なしとして賞を出さない。 */
const MEASURES: Readonly<
  Record<Exclude<AwardId, "region-lord">, (player: Player) => number>
> = {
  "quiz-master": (p) => p.stats.quizCorrect,
  "property-baron": (p) => p.portfolio.size,
  traveller: (p) => p.stats.destinationsReached,
  walker: (p) => p.stats.squaresMoved,
  unlucky: (p) => p.stats.misfortuneTurns,
};

/**
 * 表彰を決める。
 *
 * 同点のときは賞を出さない——「1位が2人」を見せると、めくっていく楽しみが
 * 濁るうえ、誰が勝ったのかも伝わりにくい。
 */
export function decideAwards(
  players: readonly Player[],
  regionOfProperty: (ref: PropertyRef) => RegionId | undefined,
): readonly Award[] {
  const awards: Award[] = [];

  for (const [id, measure] of Object.entries(MEASURES) as [
    Exclude<AwardId, "region-lord">,
    (player: Player) => number,
  ][]) {
    const scored = players.map((p) => ({ p, value: measure(p) })).sort((a, b) => b.value - a.value);
    const top = scored[0];
    if (!top || top.value <= 0) continue;
    if (scored.length > 1 && scored[1].value === top.value) continue; // 同点は出さない
    awards.push({ id, winnerId: top.p.id, value: top.value });
  }

  // 地方王: 1つの地方にいちばん多く物件を持っている人。
  let best: Award | null = null;
  let tied = false;
  for (const player of players) {
    const byRegion = new Map<RegionId, number>();
    for (const ref of player.portfolio.keys()) {
      const region = regionOfProperty(ref);
      if (region) byRegion.set(region, (byRegion.get(region) ?? 0) + 1);
    }
    for (const [regionId, count] of byRegion) {
      if (!best || count > best.value) {
        best = { id: "region-lord", winnerId: player.id, value: count, regionId };
        tied = false;
      } else if (count === best.value && player.id !== best.winnerId) {
        tied = true;
      }
    }
  }
  // 物件を2つ以上持っていて初めて「その地方の王」と言える。
  if (best && best.value >= 2 && !tied) awards.push(best);

  return awards;
}

/** 賞の名前・説明の文言キー(UI側の i18n で引く)。 */
export const AWARD_TEXT_KEYS: Readonly<Record<AwardId, { name: string; detail: string }>> = {
  "quiz-master": { name: "awardQuizMaster", detail: "awardQuizMasterDetail" },
  "property-baron": { name: "awardPropertyBaron", detail: "awardPropertyBaronDetail" },
  "region-lord": { name: "awardRegionLord", detail: "awardRegionLordDetail" },
  traveller: { name: "awardTraveller", detail: "awardTravellerDetail" },
  walker: { name: "awardWalker", detail: "awardWalkerDetail" },
  unlucky: { name: "awardUnlucky", detail: "awardUnluckyDetail" },
};

export type AwardLabels = Readonly<Record<AwardId, LocalizedText>>;
