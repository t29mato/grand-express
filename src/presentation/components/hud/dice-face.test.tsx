import { render } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DiceStage } from "./dice-stage";

/**
 * **止まったサイコロで、視点側を向いている面の目が、渡した出目と一致するか。**
 *
 * `dice-stage.tsx` の `FACE_ROT`・`FACES`・`PIP_POS` は legacy から移した定数で、
 * 「この出目にするには立方体をどう回すか」を角度で書いてある。**角度の表なので、
 * 間違っていても TypeScript も lint も何も言わない。**画面を見て初めて分かる。
 *
 * v0.23.0 で一度事故が起きている。視点側の傾き(-9〜-16度)を面の角度に足し込んで
 * いたため、faceX が 0 の面(1・3・4・6)は3/4の眺めになって良かったが、
 * **faceX=90 の面2と faceX=-90 の面5だけがサイコロごと転んだ姿勢で止まり**、
 * 正しい面が斜めを向いて隣の面のほうが大きく見えていた。
 *
 * ここでは定数を読むのではなく、**描いた結果の CSS 変換から測る**。
 *   1. サイコロ本体(`.die3d`)の回転と、面(`.f`)自身の回転を掛け合わせる
 *   2. 面の法線(自分から見て手前 = +Z)が画面手前をいちばん向いている面を選ぶ
 *   3. その面に描かれている目(`<i>` の数)が、渡した出目と同じかを見る
 *
 * さらに姿勢そのものも測る。正しい実装では、**視点側の傾きは面の角度の外側**に
 * 掛かるので、正面を向いた面の姿勢は**どの出目でも同じ**になる
 * (画面の上向きが真上のまま=転んでいない)。面の角度に傾きを足し込むと、
 * 面2と面5だけがここで転ぶ。
 */

type Matrix = readonly [number, number, number, number, number, number, number, number, number];

const IDENTITY: Matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

const rad = (deg: number) => (deg * Math.PI) / 180;

/** CSS の `rotateX(a)`(仕様の行列そのもの。画面座標は x=右・y=下・z=手前)。 */
function rotateX(deg: number): Matrix {
  const c = Math.cos(rad(deg));
  const s = Math.sin(rad(deg));
  return [1, 0, 0, 0, c, -s, 0, s, c];
}

/** CSS の `rotateY(a)`。 */
function rotateY(deg: number): Matrix {
  const c = Math.cos(rad(deg));
  const s = Math.sin(rad(deg));
  return [c, 0, s, 0, 1, 0, -s, 0, c];
}

function multiply(a: Matrix, b: Matrix): Matrix {
  const out = new Array<number>(9).fill(0);
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      out[row * 3 + col] = a[row * 3] * b[col] + a[row * 3 + 1] * b[3 + col] + a[row * 3 + 2] * b[6 + col];
    }
  }
  return out as unknown as Matrix;
}

function apply(m: Matrix, v: readonly [number, number, number]): [number, number, number] {
  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
  ];
}

/**
 * `transform` の文字列から回転だけを取り出して掛け合わせる。
 * 平行移動(`translate3d`・`translateZ`)と拡大(`scale3d`)は、
 * どちらも軸に沿った変換なので**どの面が手前を向くかを変えない**ため読み飛ばす。
 */
function rotationOf(transform: string): Matrix {
  let m = IDENTITY;
  for (const [, axis, deg] of transform.matchAll(/rotate([XY])\((-?[\d.]+)deg\)/g)) {
    m = multiply(m, axis === "X" ? rotateX(Number(deg)) : rotateY(Number(deg)));
  }
  return m;
}

/** 止まったサイコロ1個について、手前を向いている面を測った結果。 */
type FrontFace = {
  /** その面に描かれている目の数。 */
  pips: number;
  /** 面の法線がどれだけ手前を向いているか(1 で真正面)。 */
  facing: number;
  /** 2番目に手前を向いている面の値。正面がはっきりしていれば小さい。 */
  runnerUp: number;
  /** 面の「上」が画面上でどれだけ横へ倒れているか(0 で真上、1 で真横)。 */
  roll: number;
};

function measureDie(die: Element): FrontFace {
  const dieRotation = rotationOf((die as HTMLElement).style.transform);
  const measured = [...die.querySelectorAll(".f")].map((face) => {
    const total = multiply(dieRotation, rotationOf((face as HTMLElement).style.transform));
    // 面の法線(面から見て手前)と、面の「上」。
    const normal = apply(total, [0, 0, 1]);
    const up = apply(total, [0, -1, 0]);
    return { pips: face.querySelectorAll("i").length, facing: normal[2], roll: Math.abs(up[0]) };
  });
  const sorted = [...measured].sort((a, b) => b.facing - a.facing);
  return { ...sorted[0], runnerUp: sorted[1].facing };
}

/** 転がる演出を飛ばす(= `placeAtRest` で最終姿勢を作る)ための設定。 */
const stubMotion = (reduce: boolean) =>
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce && query.includes("prefers-reduced-motion"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));

const ALL_VALUES = [1, 2, 3, 4, 5, 6];

/** 正面を向いた面の姿勢が、出目によらず同じであることまで確かめる。 */
function expectFrontFaceMatches(die: Element, value: number) {
  const front = measureDie(die);
  expect(front.pips, `出目 ${value}: 手前を向いている面の目が違う`).toBe(value);
  // 真正面から25度以内。傾きが面の角度に混ざると、ここが崩れて隣の面と競り合う。
  expect(front.facing, `出目 ${value}: 正面の向き`).toBeGreaterThan(Math.cos(rad(25)));
  // 2番目との差。正面がはっきりしていないと、目を読み違える。
  expect(front.runnerUp, `出目 ${value}: 2番目に手前の面`).toBeLessThan(0.5);
  // **転んでいないこと。**面2・面5だけが転んだのが v0.23.0 の不具合。
  expect(front.roll, `出目 ${value}: 面が横に転んでいる`).toBeLessThan(Math.sin(rad(2)));
}

describe("止まったサイコロの、手前を向く面", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("動きを減らす設定(転がりを飛ばして最終姿勢だけを作る)", () => {
    beforeEach(() => stubMotion(true));

    it.each(ALL_VALUES)("出目 %i の面が手前を向く", (value) => {
      const { container } = render(<DiceStage values={[value]} onDone={() => {}} />);
      expectFrontFaceMatches(container.querySelectorAll(".die3d")[0], value);
    });

    it("6個まとめて振っても、それぞれの出目の面が手前を向く", () => {
      const { container } = render(<DiceStage values={ALL_VALUES} onDone={() => {}} />);
      const dice = container.querySelectorAll(".die3d");
      expect(dice.length).toBe(ALL_VALUES.length);
      ALL_VALUES.forEach((value, i) => expectFrontFaceMatches(dice[i], value));
    });

    it("6つの面は1〜6が1回ずつで、向かい合う面の和は7", () => {
      const { container } = render(<DiceStage values={[1]} onDone={() => {}} />);
      const die = container.querySelectorAll(".die3d")[0];
      const dieRotation = rotationOf((die as HTMLElement).style.transform);
      const faces = [...die.querySelectorAll(".f")].map((face) => ({
        pips: face.querySelectorAll("i").length,
        normal: apply(multiply(dieRotation, rotationOf((face as HTMLElement).style.transform)), [0, 0, 1]),
      }));

      expect(faces.map((f) => f.pips).sort((a, b) => a - b)).toEqual(ALL_VALUES);
      for (const face of faces) {
        // 法線が正反対の面。普通のサイコロは向かい合う面の和が7になっている。
        const opposite = faces.find(
          (other) =>
            other !== face &&
            face.normal.every((component, axis) => Math.abs(component + other.normal[axis]) < 1e-9),
        );
        expect(opposite, `${face.pips} の向かいの面が見つからない`).toBeDefined();
        expect(face.pips + (opposite?.pips ?? 0), `${face.pips} の向かいの面`).toBe(7);
      }
    });
  });

  describe("通常の演出(転がり切ったあとの姿勢)", () => {
    beforeEach(() => {
      stubMotion(false);
      vi.useFakeTimers({
        toFake: ["setTimeout", "clearTimeout", "requestAnimationFrame", "cancelAnimationFrame", "performance"],
      });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("転がり終えたとき、出目の面が手前を向いて止まっている", () => {
      const { container } = render(<DiceStage values={ALL_VALUES} onDone={() => {}} />);
      // 転がりの尺(1.6秒)を過ぎるまで進める。行き過ぎた角度の揺り戻しもここで終わる。
      act(() => {
        vi.advanceTimersByTime(1700);
      });
      const dice = container.querySelectorAll(".die3d");
      ALL_VALUES.forEach((value, i) => expectFrontFaceMatches(dice[i], value));
    });

    it("rAF が一度も来なくても(隠れたタブ)、番人が作る姿勢は同じ", () => {
      vi.stubGlobal("requestAnimationFrame", () => 1);
      vi.stubGlobal("cancelAnimationFrame", () => {});
      const { container } = render(<DiceStage values={ALL_VALUES} onDone={() => {}} />);
      act(() => {
        vi.advanceTimersByTime(2100);
      });
      const dice = container.querySelectorAll(".die3d");
      ALL_VALUES.forEach((value, i) => expectFrontFaceMatches(dice[i], value));
    });
  });
});
