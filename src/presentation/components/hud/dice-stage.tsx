"use client";

import { useEffect, useRef } from "react";
import { soundAdapter } from "../../state/game-store-dependencies";

/**
 * legacy(`grand-express.html`)の3Dダイス物理演出の移植。
 * サイコロの目(pipの配置)と各面の回転角、バウンドの物理式(イージング・
 * 減衰する跳ね返り振幅)はlegacyの `rollDice()` と完全に同じ計算式を使用している。
 *
 * legacyとの意図的な簡略化:
 * - 「タップして止める」インタラクションは実装していない(常に固定尺で再生)。
 * - 出目は既にドメイン層の乱数ポートで確定済みの値を渡すだけで、この演出自体は
 *   その値を「見せる」ための飾りであり、ゲームの結果には一切影響しない
 *   (盤面のクリックをブロックしないよう `pointer-events: none` にしてある)。
 * - 揺れ始めの初期回転角・スピン量はこの演出限定の見た目の乱数であり、
 *   ドメインの乱数(GameSession)には触れない。
 */

const PIP_POS: Record<number, ReadonlyArray<readonly [number, number]>> = {
  1: [[2, 2]],
  2: [
    [1, 1],
    [3, 3],
  ],
  3: [
    [1, 1],
    [2, 2],
    [3, 3],
  ],
  4: [
    [1, 1],
    [1, 3],
    [3, 1],
    [3, 3],
  ],
  5: [
    [1, 1],
    [1, 3],
    [2, 2],
    [3, 1],
    [3, 3],
  ],
  6: [
    [1, 1],
    [1, 3],
    [2, 1],
    [2, 3],
    [3, 1],
    [3, 3],
  ],
};

const FACE_ROT: Record<number, readonly [number, number]> = {
  1: [0, 0],
  2: [90, 0],
  3: [0, -90],
  4: [0, 90],
  5: [-90, 0],
  6: [0, 180],
};

const FACES: ReadonlyArray<readonly [string, number]> = [
  ["translateZ(48px)", 1],
  ["rotateY(180deg) translateZ(48px)", 6],
  ["rotateY(90deg) translateZ(48px)", 3],
  ["rotateY(-90deg) translateZ(48px)", 4],
  ["rotateX(90deg) translateZ(48px)", 5],
  ["rotateX(-90deg) translateZ(48px)", 2],
];

const BOUNCES = 3;
const DURATION_MS = 1600;
const RESULT_LINGER_MS = 700;

export function DiceStage({
  targetValue,
  onDone,
}: {
  /** 表示する出目(1〜6)。 */
  targetValue: number;
  /** 演出が終わったときに呼ばれる。 */
  onDone: () => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const dieRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const die = dieRef.current;
    const shadow = shadowRef.current;
    const result = resultRef.current;
    if (!stage || !die || !shadow || !result) return;

    const v = Math.min(6, Math.max(1, Math.round(targetValue)));
    result.className = "die-result";
    result.textContent = "";

    const W = stage.clientWidth || 620;
    const H = stage.clientHeight || 620;
    const s = Math.max(0.6, Math.min(1.15, W / 640));
    const startX = W * 0.16;
    const endX = W * 0.45 + (Math.random() * 0.2 - 0.1) * W;
    const ground = H * 0.58;
    const [tx0, ty0] = FACE_ROT[v];
    const rx0 = Math.random() * 360;
    const ry0 = Math.random() * 360;
    const spin = 3;
    const rx1 = tx0 + 360 * (spin + Math.floor(Math.random() * 3)) + 360 * Math.ceil(rx0 / 360);
    const ry1 = ty0 + 360 * (spin + Math.floor(Math.random() * 3)) + 360 * Math.ceil(ry0 / 360);

    let lastSeg = 0;
    let finished = false;
    let raf = 0;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;
    const t0 = performance.now();

    soundAdapter.playRattle();

    const frame = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION_MS);
      const e = 1 - Math.pow(1 - t, 3);
      const x = startX + (endX - startX) * e;
      const k = Math.min(1, t / 0.88);
      const phase = k * BOUNCES;
      const seg = Math.floor(phase);
      const frac = phase - seg;
      const amp = H * 0.25 * Math.pow(0.45, seg) * (1 - k * 0.15);
      const y = t >= 1 ? ground : ground - Math.abs(Math.sin(Math.PI * frac)) * amp;

      if (seg > lastSeg && seg <= BOUNCES) {
        lastSeg = seg;
        soundAdapter.playThud();
      }

      die.style.transform = `translate3d(${x - 48 * s}px, ${y - 48 * s}px, 0) rotateX(${rx0 + (rx1 - rx0) * e}deg) rotateY(${ry0 + (ry1 - ry0) * e}deg) scale3d(${s}, ${s}, ${s})`;
      const air = Math.min(1, (ground - y) / (H * 0.26));
      const sc = (1 - air * 0.45) * s;
      shadow.style.width = `${84 * sc}px`;
      shadow.style.height = `${19 * sc}px`;
      shadow.style.left = `${x - 42 * sc}px`;
      shadow.style.top = `${ground + 40 * s}px`;
      shadow.style.opacity = (0.12 + 0.32 * sc).toFixed(2);

      if (t < 1) {
        raf = requestAnimationFrame(frame);
      } else if (!finished) {
        finished = true;
        result.textContent = String(v);
        result.className = "die-result show";
        soundAdapter.playCoin();
        doneTimer = setTimeout(onDone, RESULT_LINGER_MS);
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      if (doneTimer) clearTimeout(doneTimer);
    };
    // targetValueが変わるたびに(=新しいロールのたびに)最初から再生する。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetValue]);

  return (
    <div className="dice-stage" ref={stageRef} aria-hidden="true">
      <div className="die-shadow" ref={shadowRef} />
      <div className="die3d" ref={dieRef}>
        {FACES.map(([transform, value]) => (
          <div className="f" style={{ transform }} key={value}>
            {PIP_POS[value].map(([r, c], i) => (
              <i key={i} style={{ gridRow: r, gridColumn: c }} />
            ))}
          </div>
        ))}
      </div>
      <div className="die-result" ref={resultRef} />
    </div>
  );
}
