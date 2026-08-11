"use client";

import { useEffect, useRef } from "react";
import { soundAdapter } from "../../state/game-store-dependencies";
import { prefersReducedMotion } from "../../state/motion-preference";

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

/** 最後に接地する時刻(全体を1としたときの位置)。ここから先は転がらず、揺れが収まるだけ。 */
const LAND_AT = 0.84;
/** 一度弾むごとに、次の高さがこの割合まで落ちる。 */
const BOUNCE_DECAY = 0.4;
/**
 * 転がりの減速の効き方。
 * 2 だと一定の摩擦で素直に止まるが、最後の接地よりだいぶ前に目が読めてしまう。
 * 1.5 にすると接地の直前まで回り続け、地面に「捕まって」止まるように見える。
 */
const SPIN_POWER = 1.5;
/** 止まりぎわに行き過ぎて戻る角度。ぴたりと止まると作り物に見える。 */
const OVERSHOOT_DEG = 13;

/**
 * 弾むたびの滞空時間(正規化)。高さが r 倍なら滞空は √r 倍になるので、
 * 弾むほど低く、**そして短く**なる。等間隔で弾ませると浮いて見える。
 */
const ARC_SPAN: readonly number[] = Array.from({ length: BOUNCES }, (_, i) => Math.pow(BOUNCE_DECAY, i / 2));
const ARC_TOTAL = ARC_SPAN.reduce((sum, s) => sum + s, 0);
/** 各弧の始まり(正規化時間 0〜1)。境目がそのまま接地の瞬間。 */
const ARC_START: readonly number[] = ARC_SPAN.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + ARC_SPAN[i - 1] / ARC_TOTAL);
  return acc;
}, []);

/** 転がりの進み具合。最後の接地(LAND_AT)でちょうど目的の角度に届く。 */
function spinProgress(t: number): number {
  return 1 - Math.pow(1 - Math.min(1, t / LAND_AT), SPIN_POWER);
}

/**
 * 接地してからの揺り戻し。行き過ぎた角度が往復しながら 0 に収まる。
 * s=0 で 1(行き過ぎた分そのまま)、s=1 でちょうど 0。
 */
function settleWobble(s: number): number {
  return Math.cos(s * Math.PI * 2.2) * Math.pow(1 - s, 2);
}

export function DiceStage({
  values,
  onReveal,
  onDone,
}: {
  /**
   * 振ったサイコロの目(1〜6)を振った個数ぶん。
   * 新幹線(2個)・のぞみ(3個)のようなアイテムでは複数個になる。
   * **合計がそのまま進むマス数**なので、1個に丸めて見せると
   * 「サイコロの目より多く進んでいる」ように見えてしまう。
   */
  values: readonly number[];
  /**
   * サイコロが着地して、出目が読める状態になった瞬間に呼ばれる。
   * ここで初めて画面の他の場所(進むマス数・行けるマスのハイライト)に
   * 結果を出す。転がっている間に出すと、演出を見る意味が無くなる。
   */
  onReveal?: () => void;
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
      // **目的の角度そのもの。**傾きをここに足してはいけない。
      //
      // 以前はここで faceX に -9〜-16度を足していた。面1・3・4・6は faceX が0なので
      // 3/4の眺めになって良かったが、**面2は faceX=90、面5は -90** なので、
      // 足すと 74〜81度・-99〜-106度になり、**サイコロが横倒しで止まった。**
      // 出目2と5のときだけ倒れかけた姿勢になり、正しい面が斜めを向いて
      // 隣の面のほうが大きく見えていた(出目の読み違いの原因)。
      //
      // 傾きは `place()` で**視点側から**当てる。そうすればどの面でも同じ小ささになる。
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
        // 行き過ぎて戻る角度。向きと大きさを1個ずつ変えて、揃って揺れないようにする。
        overX: OVERSHOOT_DEG * (0.7 + Math.random() * 0.6) * (Math.random() < 0.5 ? -1 : 1),
        overY: OVERSHOOT_DEG * 0.7 * (0.7 + Math.random() * 0.6) * (Math.random() < 0.5 ? -1 : 1),
        // 視点側からの傾き。**面の角度とは別に持つ。**これを面の角度に足し込むと、
        // 面2(90度)・面5(-90度)で角度が重なってサイコロが横倒しになる。
        tiltX: -(8 + Math.random() * 5),
        tiltY: (Math.random() < 0.5 ? -1 : 1) * (9 + Math.random() * 6),
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
      const { tiltX, tiltY } = plans[i];
      // **傾きは面の角度より外側に置く。**CSSの変換は右から順に効くので、
      // まず面を正面へ向け(rotateX(rx) rotateY(ry))、そのうえで視点側から
      // 少しだけ傾ける。こうするとどの出目でも傾きの見え方が同じになる。
      // 面の角度に足し込むと、面2(90度)・面5(-90度)だけ横倒しになる。
      dice[i].style.transform =
        `translate3d(${x - 48 * s}px, ${y - 48 * s}px, 0) ` +
        `rotateX(${tiltX.toFixed(1)}deg) rotateY(${tiltY.toFixed(1)}deg) rotateX(${rx}deg) rotateY(${ry}deg) ` +
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
    // 出目を伏せていた画面の他の場所も、ここで初めて一斉に開く。
    const showResult = () => {
      result.textContent = faces.length > 1 ? `${faces.join(" + ")} = ${total}` : String(total);
      result.className = `die-result show${faces.length > 1 ? " multi" : ""}`;
      onReveal?.();
    };

    /** 次に接地する弧の番号。最後の1回が「止まった」瞬間になる。 */
    let nextImpact = 0;
    let landed = false;
    let ended = false;
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

    /** 止まった瞬間に地面へ広がる衝撃の輪。 */
    const ring = (x: number, y: number, scale: number) => {
      const el = document.createElement("div");
      el.className = "die-ring";
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.width = `${104 * scale}px`;
      el.style.height = `${34 * scale}px`;
      stage.appendChild(el);
      setTimeout(() => el.remove(), 460);
    };

    /** 接地する瞬間(弾みの正規化時間)。最後の1つで止まる。 */
    const impactAt = [...ARC_START.slice(1), 1];

    /**
     * 最後に接地した瞬間。ここで初めて目を見せる。
     * この後は少し揺り戻すだけなので、答えが分かっても待たされた感じにならない。
     */
    const land = (x: number) => {
      if (landed) return;
      landed = true;
      // 止まった手応え。輪が広がるのと、目が出るのと、音を同じ瞬間に揃える。
      ring(x, ground + 34 * s, s);
      showResult();
      soundAdapter.playCoin();
    };

    const t0 = performance.now();
    soundAdapter.playRattle();

    const frame = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION_MS);
      // 弾んでいる間の進み具合。最後の接地(LAND_AT)で1になり、以降は転がらない。
      const b = Math.min(1, t / LAND_AT);
      // 横に転がる距離。弾みが終わるのと同時に止まる。
      const e = 1 - Math.pow(1 - b, 2.4);
      const flying = b < 1;

      while (nextImpact < impactAt.length && b >= impactAt[nextImpact]) {
        const isLast = nextImpact === impactAt.length - 1;
        nextImpact++;
        soundAdapter.playThud();
        const at = plans[0].startX + (plans[0].endX - plans[0].startX) * e;
        // 弾んだ位置に砂ぼこりを出す。音だけより着地が分かりやすい。
        // 最後の接地はいちばん大きく出して、止まったことを目でも分かるようにする。
        puff(at, ground + 34 * s, s * (isLast ? 1.5 : 1));
        if (isLast) land(at);
      }

      // 何回目の弧を飛んでいるか。弾むほど低く、そして短くなる。
      const seg = Math.min(BOUNCES - 1, nextImpact);
      const frac = flying ? (b - ARC_START[seg]) / (ARC_SPAN[seg] / ARC_TOTAL) : 1;
      const amp = H * 0.26 * Math.pow(BOUNCE_DECAY, seg);
      // 接地後は、行き過ぎた分が戻るのに合わせてわずかに浮き沈みする。
      const settle = flying ? 0 : (t - LAND_AT) / (1 - LAND_AT);
      const y = flying ? ground - Math.sin(Math.PI * frac) * amp : ground - Math.abs(settleWobble(settle)) * H * 0.012;

      const g = spinProgress(t);
      plans.forEach((plan, i) => {
        const x = plan.startX + (plan.endX - plan.startX) * e;
        // 転がっている間は行き過ぎた角度まで回し、接地してからその分を揺り戻す。
        // 目的の角度でぴたりと止めると、機械が止まったように見えてしまう。
        const w = settleWobble(settle);
        const rx = flying ? plan.rx0 + (plan.rx1 + plan.overX - plan.rx0) * g : plan.rx1 + plan.overX * w;
        const ry = flying ? plan.ry0 + (plan.ry1 + plan.overY - plan.ry0) * g : plan.ry1 + plan.overY * w;
        place(i, x, y, rx, ry);
      });

      if (t < 1) {
        raf = requestAnimationFrame(frame);
      } else if (!ended) {
        ended = true;
        // 転がりが終わる前に接地の合図が来なかったときの保険。
        land(plans[0].endX);
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
          {FACES.map(([transform, value], faceIndex) => (
            // 面ごとの明るさを変えるためのクラス。隣り合う面の明るさが違わないと、
            // 立方体ではなく平たい札に見えてしまう(FACES の並び順と対応)。
            <div className={`f f${faceIndex}`} style={{ transform }} key={value}>
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
