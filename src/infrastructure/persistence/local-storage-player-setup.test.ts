import { beforeEach, describe, expect, it } from "vitest";
import { clearPlayerSetup, loadPlayerSetup, savePlayerSetup } from "./local-storage-player-setup";

const STORAGE_KEY = "grand-express:players:v1";

describe("前の旅の顔ぶれを覚える", () => {
  beforeEach(() => {
    window.localStorage.clear();
    clearPlayerSetup();
  });

  it("自分で付けた名前は覚えていて、次に読み出せる", () => {
    savePlayerSetup([
      { name: "みか", mode: "human" },
      { name: "たろう", mode: "human" },
      { name: null, mode: "cpu" },
      { name: null, mode: "off" },
    ]);
    expect(loadPlayerSetup()).toEqual([
      { name: "みか", mode: "human" },
      { name: "たろう", mode: "human" },
      { name: null, mode: "cpu" },
      { name: null, mode: "off" },
    ]);
  });

  /**
   * 既定名は文字列にせず `null` のまま覚える。
   * 「あなた」を保存すると、次に別の言語で開いたときに前の言語の既定名が残り、
   * **言語に追随しなくなる**(v0.16.2 で入れた挙動が壊れる)。
   */
  it("全員が既定名なら、何も覚えない", () => {
    savePlayerSetup([
      { name: null, mode: "human" },
      { name: null, mode: "cpu" },
      { name: null, mode: "cpu" },
    ]);
    expect(loadPlayerSetup()).toBeNull();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("名前を全部消して始め直すと、覚えていたものも消える", () => {
    savePlayerSetup([{ name: "みか", mode: "human" }, { name: null, mode: "cpu" }]);
    expect(loadPlayerSetup()).not.toBeNull();
    savePlayerSetup([{ name: null, mode: "human" }, { name: null, mode: "cpu" }]);
    expect(loadPlayerSetup(), "名前を消したのに前の名前が残っている").toBeNull();
  });

  it("空白だけの名前は既定名として扱う", () => {
    savePlayerSetup([{ name: "   ", mode: "human" }, { name: "みか", mode: "cpu" }]);
    expect(loadPlayerSetup()).toEqual([
      { name: null, mode: "human" },
      { name: "みか", mode: "cpu" },
    ]);
  });

  // 手で書き換えられることがある。落ちずに既定へ戻ること。
  it.each([
    ["壊れたJSON", "not json"],
    ["配列でない", '{"name":"みか"}'],
    ["空の配列", "[]"],
    ["枠が多すぎる", JSON.stringify(Array.from({ length: 9 }, () => ({ name: null, mode: "cpu" })))],
    ["mode が知らない値", '[{"name":"みか","mode":"robot"}]'],
    ["name が数値", '[{"name":123,"mode":"human"}]'],
    ["中身が null", "[null]"],
  ])("保存が壊れていても落ちない(%s)", (_label, raw) => {
    window.localStorage.setItem(STORAGE_KEY, raw);
    clearPlayerSetup();
    window.localStorage.setItem(STORAGE_KEY, raw);
    expect(() => loadPlayerSetup()).not.toThrow();
    expect(loadPlayerSetup()).toBeNull();
  });

  it("長すぎる名前は切り詰めて覚える", () => {
    savePlayerSetup([{ name: "あ".repeat(200), mode: "human" }, { name: null, mode: "cpu" }]);
    const loaded = loadPlayerSetup();
    expect(loaded?.[0].name?.length).toBeLessThanOrEqual(24);
  });
});
