import { describe, expect, it } from "vitest";
import { REGION_MUSIC } from "./region-music-table";

describe("REGION_MUSIC", () => {
  it("ボリビア・日本の全地方(8つ)のプロファイルを持つ", () => {
    expect(Object.keys(REGION_MUSIC).sort()).toEqual(
      ["alt", "ama", "cha", "kan", "kin", "kyu", "nor", "val"].sort(),
    );
  });

  it("すべてのプロファイルが正の周波数3音とbpmを持つ", () => {
    for (const profile of Object.values(REGION_MUSIC)) {
      expect(profile.bpm).toBeGreaterThan(0);
      expect(profile.chord).toHaveLength(3);
      for (const freq of profile.chord) {
        expect(freq).toBeGreaterThan(0);
      }
      expect(["flute", "pluck"]).toContain(profile.lead);
    }
  });
});
