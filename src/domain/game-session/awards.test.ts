import { describe, expect, it } from "vitest";
import { PlayerId, PropertyIndex, PropertyRef, RegionId, CityId, NodeId } from "../shared-kernel/ids";
import { Money } from "../shared-kernel/money";
import { Player } from "../player/player";
import { EMPTY_STATS, PlayerStats } from "../player/player-stats";
import { decideAwards } from "./awards";

function player(id: string, stats: Partial<PlayerStats> = {}, refs: string[] = []): Player {
  return {
    id: PlayerId(id),
    name: id,
    isCpu: false,
    knowledgeLevel: "familiar",
    cash: Money.of(1000),
    location: NodeId("x"),
    portfolio: new Map(refs.map((r) => [r as PropertyRef, 1 as never])),
    inventory: [],
    skipNextTurn: false,
    hasExtraTurn: false,
    stats: { ...EMPTY_STATS, ...stats },
    seenCities: new Set(),
  };
}
const ref = (city: string, i: number) => PropertyRef.of(CityId(city), PropertyIndex(i));
const regionOf = (r: PropertyRef) =>
  RegionId(PropertyRef.parse(r).cityId.startsWith("n") ? "north" : "south");

describe("表彰", () => {
  it("その旅で実際に起きたことだけを賞にする", () => {
    // 誰もクイズに正解していなければ「クイズ王」は出さない。
    const awards = decideAwards([player("a"), player("b")], regionOf);
    expect(awards.map((x) => x.id)).toEqual([]);
  });

  it("同点のときは賞を出さない(誰が勝ったか濁るため)", () => {
    const awards = decideAwards(
      [player("a", { quizCorrect: 3 }), player("b", { quizCorrect: 3 })],
      regionOf,
    );
    expect(awards.find((x) => x.id === "quiz-master")).toBeUndefined();
  });

  it("観点ごとに違う人が選ばれる", () => {
    const awards = decideAwards(
      [
        player("a", { quizCorrect: 5, squaresMoved: 10 }),
        player("b", { quizCorrect: 1, squaresMoved: 80 }),
        player("c", { destinationsReached: 4, misfortuneTurns: 6 }),
      ],
      regionOf,
    );
    const by = Object.fromEntries(awards.map((x) => [x.id, x.winnerId]));
    expect(by["quiz-master"]).toBe("a");
    expect(by["walker"]).toBe("b");
    expect(by["traveller"]).toBe("c");
    expect(by["unlucky"]).toBe("c");
  });

  it("地方王は、ひとつの地方に2件以上持っている人に出る", () => {
    const awards = decideAwards(
      [
        player("a", {}, [ref("north1", 0), ref("north2", 0), ref("south1", 0)]),
        player("b", {}, [ref("south2", 0)]),
      ],
      regionOf,
    );
    const lord = awards.find((x) => x.id === "region-lord");
    expect(lord?.winnerId).toBe("a");
    expect(lord?.value).toBe(2);
    expect(lord?.regionId).toBe("north");
  });

  it("1件しか持っていなければ地方王は出さない", () => {
    const awards = decideAwards([player("a", {}, [ref("north1", 0)])], regionOf);
    expect(awards.find((x) => x.id === "region-lord")).toBeUndefined();
  });
});
