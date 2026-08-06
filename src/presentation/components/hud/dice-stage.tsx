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
/** 動きを減らす設定のときに、出目だけを見せておく時間。 */
const REDUCED_MOTION_LINGER_MS = 500;

/** OS/ブラウザ側で「視差効果を減らす」が有効になっているか。 */
function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

export function DiceStage({
  values,
  onDone,
}: {
  /**
   * 振ったサイコロの目(1〜6)を振った個数ぶん。
   * 新幹線(2個)・のぞみ(3個)のようなアイテムでは複数個になる。
   * **合計がそのまま進むマス数**なので、1個に丸めて見せると
   * 「サイコロの目より多く進んでいる」ように見えてしまう。
   */
  values: readonly number[];
  /** 演出が終わったときに呼ばれる。 */
  onDone: () => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const diceRef = useRef<(HTMLDivElement | null)[]>([]);
  const shadowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);
  // 出目の並びが変わったときだけ演出をやり直すための鍵。
  const key = values.join(",");

  useEffect(() => {
    const stage = stageRef.current;
    const result = resultRef.current;
    if (!stage || !result) return;

    const faces = values.map((v) => Math.min(6, Math.max(1, Math.round(v))));
    const total = faces.reduce((sum, v) => sum + v, 0);
    const dice = faces.map((_, i) => diceRef.current[i]).filter((d): d is HTMLDivElement => d !== null);
    const shadows = faces.map((_, i) => shadowsRef.current[i]).filter((d): d is HTMLDivElement => d !== null);
    if (dice.length !== faces.length || shadows.length !== faces.length) return;

    result.className = "die-result";
    result.textContent = "";

    const W = stage.clientWidth || 620;
    const H = stage.clientHeight || 620;
    // サイコロが増えるぶんだけ小さくして、重ならないように横に並べる。
    const s = Math.max(0.42, Math.min(1.15, W / 640) / Math.max(1, faces.length * 0.8));
    const ground = H * 0.58;
    const spread = W * 0.2;

    // 1個ごとの初期姿勢・着地位置(見た目だけの乱数。ゲーム結果には影響しない)。
    const plans = faces.map((v, i) => {
      const [tx0, ty0] = FACE_ROT[v];
      const rx0 = Math.random() * 360;
      const ry0 = Math.random() * 360;
      const spin = 3;
      const centred = i - (faces.length - 1) / 2;
      return {
        startX: W * 0.16 + centred * spread * 0.5,
        endX: W * 0.45 + centred * spread + (Math.random() * 0.1 - 0.05) * W,
        rx0,
        ry0,
        rx1: tx0 + 360 * (spin + Math.floor(Math.random() * 3)) + 360 * Math.ceil(rx0 / 360),
        ry1: ty0 + 360 * (spin + Math.floor(Math.random() * 3)) + 360 * Math.ceil(ry0 / 360),
        face: [tx0, ty0] as const,
      };
    });

    // 弾む瞬間だけ縦に潰す。これがあると「当たった」感じが出る。
    const squashAt = (y: number) => {
      const airborne = Math.min(1, (ground - y) / (H * 0.2));
      return 1 - (1 - airborne) * 0.22;
    };

    const place = (i: number, x: number, y: number, rx: number, ry: number) => {
      const squash = squashAt(y);
      dice[i].style.transform =
        `translate3d(${x - 48 * s}px, ${y - 48 * s}px, 0) rotateX(${rx}deg) rotateY(${ry}deg) ` +
        `scale3d(${s / squash}, ${s * squash}, ${s})`;
      const air = Math.min(1, (ground - y) / (H * 0.26));
      const sc = (1 - air * 0.45) * s;
      const shadow = shadows[i];
      shadow.style.width = `${84 * sc}px`;
      shadow.style.height = `${19 * sc}px`;
      shadow.style.left = `${x - 42 * sc}px`;
      shadow.style.top = `${ground + 40 * s}px`;
      shadow.style.opacity = (0.12 + 0.32 * sc).toFixed(2);
    };

    // 合計が分かるように、複数個なら「4 + 5 = 9」の形で見せる。
    const showResult = () => {
      result.textContent = faces.length > 1 ? `${faces.join(" + ")} = ${total}` : String(total);
      result.className = `die-result show${faces.length > 1 ? " multi" : ""}`;
    };

    let lastSeg = 0;
    let finished = false;
    let raf = 0;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;

    // 「視差効果を減らす」設定なら、転がる演出を飛ばして出目だけを見せる。
    // 毎ターン2秒以上のアニメーションを見せられるのは、動きに弱い人には負担になる。
    if (prefersReducedMotion()) {
      plans.forEach((plan, i) => place(i, plan.endX, ground, plan.face[0], plan.face[1]));
      showResult();
      soundAdapter.playCoin();
      doneTimer = setTimeout(onDone, REDUCED_MOTION_LINGER_MS);
      return () => {
        if (doneTimer) clearTimeout(doneTimer);
      };
    }

    /** 着地の砂ぼこり。CSSアニメーションで膨らんで消えるだけの短命な円。 */
    const puff = (x: number, y: number, scale: number) => {
      const dot = document.createElement("div");
      dot.className = "die-puff";
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.width = `${52 * scale}px`;
      dot.style.height = `${16 * scale}px`;
      stage.appendChild(dot);
      setTimeout(() => dot.remove(), 480);
    };

    const t0 = performance.now();
    soundAdapter.playRattle();

    const frame = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION_MS);
      const e = 1 - Math.pow(1 - t, 3);
      const k = Math.min(1, t / 0.88);
      const phase = k * BOUNCES;
      const seg = Math.floor(phase);
      const frac = phase - seg;
      const amp = H * 0.25 * Math.pow(0.45, seg) * (1 - k * 0.15);
      const y = t >= 1 ? ground : ground - Math.abs(Math.sin(Math.PI * frac)) * amp;

      if (seg > lastSeg && seg <= BOUNCES) {
        lastSeg = seg;
        soundAdapter.playThud();
        // 弾んだ位置に砂ぼこりを出す。音だけより着地が分かりやすい。
        puff(plans[0].startX + (plans[0].endX - plans[0].startX) * e, ground + 34 * s, s);
      }

      plans.forEach((plan, i) => {
        const x = plan.startX + (plan.endX - plan.startX) * e;
        place(i, x, y, plan.rx0 + (plan.rx1 - plan.rx0) * e, plan.ry0 + (plan.ry1 - plan.ry0) * e);
      });

      if (t < 1) {
        raf = requestAnimationFrame(frame);
      } else if (!finished) {
        finished = true;
        showResult();
        soundAdapter.playCoin();
        doneTimer = setTimeout(onDone, RESULT_LINGER_MS);
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      if (doneTimer) clearTimeout(doneTimer);
    };
    // 出目が変わるたびに(=新しいロールのたびに)最初から再生する。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <div className="dice-stage" ref={stageRef} aria-hidden="true">
      {values.map((_, i) => (
        <div
          className="die-shadow"
          key={`shadow-${i}`}
          ref={(el) => {
            shadowsRef.current[i] = el;
          }}
        />
      ))}
      {values.map((_, i) => (
        <div
          className="die3d"
          key={`die-${i}`}
          ref={(el) => {
            diceRef.current[i] = el;
          }}
        >
          {FACES.map(([transform, value]) => (
            <div className="f" style={{ transform }} key={value}>
              {PIP_POS[value].map(([r, c], j) => (
                <i key={j} style={{ gridRow: r, gridColumn: c }} />
              ))}
            </div>
          ))}
        </div>
      ))}
      <div className="die-result" ref={resultRef} />
    </div>
  );
}
