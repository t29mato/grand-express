import { describe, expect, it } from "vitest";
import { REVEAL_CLASS, RevealEventKind, revealClassFor, revealModeFor } from "./reveal-class";

describe("出来事の見せかたの階級", () => {
  it("盤面全体の見せ場は、誰の手番でも止めて見せる", () => {
    const headlines: RevealEventKind[] = [
      "destination-arrival",
      "new-destination",
      "spirit-attached",
      "monopoly",
      "settlement",
    ];
    for (const kind of headlines) {
      expect(revealClassFor(kind), kind).toBe("headline");
      expect(revealModeFor(kind, { isOwnTurn: false }), kind).toBe("hold");
      expect(revealModeFor(kind, { isOwnTurn: true }), kind).toBe("hold");
    }
  });

  it("本人だけの出来事は、本人なら止め、他人なら自動で送る", () => {
    const personal: RevealEventKind[] = ["money-event", "doom", "quiz", "purchase", "card", "spirit-drifted"];
    for (const kind of personal) {
      expect(revealClassFor(kind), kind).toBe("personal");
      expect(revealModeFor(kind, { isOwnTurn: true }), kind).toBe("hold");
      expect(revealModeFor(kind, { isOwnTurn: false }), kind).toBe("auto");
    }
  });

  it("何もないマスは止めない", () => {
    expect(revealClassFor("quiet")).toBe("silent");
    expect(revealModeFor("quiet", { isOwnTurn: true })).toBe("none");
    expect(revealModeFor("quiet", { isOwnTurn: false })).toBe("none");
  });

  it("すべての種類に階級が決まっている(足したときの書き忘れを止める)", () => {
    const kinds = Object.keys(REVEAL_CLASS) as RevealEventKind[];
    expect(kinds.length).toBeGreaterThan(0);
    for (const kind of kinds) {
      expect(["headline", "personal", "silent"]).toContain(revealClassFor(kind));
    }
  });

  it("厄災の神の自然な移動は見せ場にしない(毎手番起きるため)", () => {
    // ここが headline になると、3人で遊ぶと毎手番全画面が出る。
    expect(revealClassFor("spirit-drifted")).not.toBe("headline");
    // 一方、憑いた瞬間(目的地の抽選・すれ違い)は見せ場。
    expect(revealClassFor("spirit-attached")).toBe("headline");
  });
});
