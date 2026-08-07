"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 数字が転がって増減するときの時間の決め方。
 *
 * 金額の幅を測ってから決めた(推測ではなく実データ):
 *   クイズ不正解 30〜80 / クイズ正解 100〜220 / 青赤マス 120〜320(中央240)
 *   目的地の到着賞金 700〜3150 / 開始所持金 1200
 *
 * 小銭は速く、大金はゆっくり。ただし比例させると、賞金3150が小銭30の10倍の
 * 時間になって待たされるので、平方根で伸びを鈍らせる。
 */
const MIN_MS = 260;
const SPAN_MS = 620;
const MAX_MS = 1400;
/** 「見せ場」の基準額。到着賞金の下限に合わせてある。 */
const REFERENCE = 700;

export function countUpDuration(delta: number): number {
  const magnitude = Math.abs(delta);
  if (magnitude === 0) return 0;
  return Math.min(MAX_MS, MIN_MS + SPAN_MS * Math.sqrt(magnitude / REFERENCE));
}

/**
 * 動きを減らす設定。jsdom には `matchMedia` が無いので、無ければ false を返す
 * (テスト環境で落とさないため)。
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface CountUpState {
  /** いま画面に出す値(転がっている途中の端数を含む)。 */
  readonly display: number;
  /** 直前の値からいくら動いたか。増なら正、減なら負。色と吹き出しに使う。 */
  readonly delta: number;
  /** 増減のたびに増える。演出を作り直して再生し直すための目印。 */
  readonly nonce: number;
  readonly running: boolean;
}

/**
 * 値が変わったとき、そこまで数字を転がす。
 *
 * 最初の描画では転がさない(所持金が0から始まったように見えてしまう)。
 * 転がっている途中にまた値が変わったら、**いま出ている値から**続きを始める
 * (前の目標値へ飛んでから動き直すと、数字が跳ねて見える)。
 */
export function useCountUp(value: number): CountUpState {
  const [state, setState] = useState<CountUpState>({ display: value, delta: 0, nonce: 0, running: false });
  /** 直前に受け取った値。増減の幅はここから測る。 */
  const targetRef = useRef(value);
  /** いま画面に出ている値。転がりの開始点はここ。 */
  const displayRef = useRef(value);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (targetRef.current === value) return;
    const delta = value - targetRef.current;
    targetRef.current = value;
    const from = displayRef.current;

    const settle = () => {
      displayRef.current = value;
      setState((s) => ({ display: value, delta, nonce: s.nonce + 1, running: false }));
    };

    if (prefersReducedMotion()) {
      settle();
      return;
    }

    const duration = countUpDuration(delta);
    const startedAt = performance.now();
    setState((s) => ({ display: from, delta, nonce: s.nonce + 1, running: true }));

    const step = (now: number) => {
      const t = Math.min(1, (now - startedAt) / duration);
      // 終わりに向けて緩む。お金が積み上がって落ち着く感じにするため。
      const eased = 1 - Math.pow(1 - t, 3);
      if (t >= 1) {
        displayRef.current = value;
        setState((s) => ({ ...s, display: value, running: false }));
        frameRef.current = null;
        return;
      }
      const current = from + delta * eased;
      displayRef.current = current;
      setState((s) => ({ ...s, display: current }));
      frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [value]);

  return state;
}
