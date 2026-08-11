import { describe, expect, it } from "vitest";
import { COUNTRY_INDEX } from "../../../infrastructure/content/country-index";

import { COUNTRY_GROUPS, boardScale, groupCountries } from "./country-groups";

describe("盤面の束ね方", () => {
  it("すべての盤面がどれかの束に入っている", () => {
    // **分類漏れは静かに起きる。**新しい盤面を足した人は、選ぶ画面の
    // いちばん下に「そのほか」として出ていることに気づかない。ここで止める。
    const grouped = groupCountries(COUNTRY_INDEX);
    const other = grouped.find((g) => g.group.key === "other");
    expect(
      other?.entries.map((e) => e.id) ?? [],
      "country-groups.ts の COUNTRY_GROUPS に足してください",
    ).toEqual([]);
  });

  it("盤面をひとつも取りこぼさない", () => {
    const grouped = groupCountries(COUNTRY_INDEX);
    const flat = grouped.flatMap((g) => g.entries.map((e) => e.id));
    expect(flat.sort()).toEqual(COUNTRY_INDEX.map((e) => e.id).sort());
  });

  it("同じ盤面を2つの束に入れない", () => {
    const seen = COUNTRY_GROUPS.flatMap((g) => g.countryIds);
    expect(seen.length, `重複: ${seen.filter((id, i) => seen.indexOf(id) !== i).join(", ")}`).toBe(
      new Set(seen).size,
    );
  });

  it("束の順番は決め打ちで、登録順に引きずられない", () => {
    // 新しい盤面が増えるたびに並びが変わると、いつもの場所にいつものものが無くなる。
    const keys = groupCountries(COUNTRY_INDEX).map((g) => g.group.key);
    expect(keys).toEqual([...keys].sort((a, b) => order(a) - order(b)));
  });

  it("縮尺の印が付く", () => {
    expect(boardScale("world")).toBe("world");
    expect(boardScale("ibaraki")).toBe("region");
    expect(boardScale("france")).toBe("country");
    // 知らない盤面は「国」。世界地図や県はここでは作られないので、既定はこれでよい。
    expect(boardScale("atlantis")).toBe("country");
  });
});

function order(key: string): number {
  const index = COUNTRY_GROUPS.findIndex((g) => g.key === key);
  return index < 0 ? COUNTRY_GROUPS.length : index;
}
