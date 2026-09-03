"use client";

import { useLayoutEffect, useRef } from "react";
import { TOKEN_BASE_SCALE } from "./token-layout";
import { SpacecraftBody, TrainBody, Vehicle } from "./token-vehicle";

/**
 * これ以上いっぺんに動いたら、滑らせずに**瞬間移動**として描く距離(盤面座標)。
 *
 * 世界一周の盤面では太平洋が左右の端に分かれていて、日付変更線をまたぐ1歩で
 * 駒の座標が3300ほど飛ぶ。そのまま滑らせると、**駒がアフリカの上を横切って
 * 盤面を走り抜ける。**線を端で切ってあるのに駒だけ地図を横断しては意味がない。
 *
 * ふつうの1歩はいちばん広い盤面(seg=150)でもこの半分に届かない。
 */
const JUMP_DISTANCE = 400;

/**
 * プレイヤーの駒。ただの丸だと自分がどこにいるのか地図の中で埋もれてしまうため、
 * **横から見た機関車**の形にしている。
 * 車体をプレイヤー色で塗り、窓・煙突・車輪は共通の暗色にして、
 * どの色でも輪郭が読めるようにしている。
 */
export function TrainToken({
  x,
  y,
  color,
  isActive,
  scale = TOKEN_BASE_SCALE,
  vehicle = "train",
  carriedEmoji = null,
  spiritEmoji = null,
  stepMs,
  isHuman = false,
  pulseNonce = 0,
  bounceNonce = 0,
}: {
  x: number;
  y: number;
  color: string;
  /** 手番のプレイヤーの駒。目印のリングを足す。 */
  isActive: boolean;
  /** 描く倍率。同じマスに何人もいるときは小さくして、駒どうしが重ならないようにする。 */
  scale?: number;
  /**
   * 運んでくれているアイテムの絵文字(エケコ人形・帆引き船・飛行機など)。
   * 6盤面で効果は同じだがアイテムは別物なので、**何に運ばれているか**をここで見せる。
   */
  /** 乗り物。盤面によって変わる(太陽系は探査機)。 */
  vehicle?: Vehicle;
  carriedEmoji?: string | null;
  /**
   * 憑いている厄災の神の絵文字(ボリビアはエル・ティオ、茨城はダイダラボウの足跡)。
   * **憑かれている駒にだけ渡す。**盤面のどこに居ても、誰が背負っているかが見える。
   */
  spiritEmoji?: string | null;
  /**
   * 1マスぶん滑るのにかける時間。道のりを歩いているあいだだけ渡す。
   * 渡さなければ globals.css の既定(0.35秒)のまま。
   *
   * インラインで上書きしているのは、`globals.css` が他の担当と共有だから。
   * 動きを減らす設定のときは歩き自体を飛ばすので、ここには来ない。
   */
  stepMs?: number;
  /**
   * 人間が動かす駒。**常時**、色付きの淡いリングと影を付け、他の駒より一段大きく描く。
   * 開始直後の東京のように駒とマークが密集した場所で、自分の駒(赤い機関車)が
   * 埋もれて探すことになっていた(実プレイで観察)。
   */
  isHuman?: boolean;
  /**
   * 手番が回ってきた瞬間に一度だけ広がる輪。0 なら出さない。
   * 値が変わるたびに要素が作り直され、輪がもう一度広がる(`key` に使う)。
   */
  pulseNonce?: number;
  /**
   * 着いたマスで小さく弾む合図(F-13、何も起きないマスでも「返事」を返す)。
   * 0 なら弾まない。値が変わるたびに内側の g が作り直され、同じマスに続けて
   * 止まっても弾み直す。CSS は `reveal.css` の `.token-bounce`(状態層の所有)。
   */
  bounceNonce?: number;
}) {
  // 人間の駒は一段大きく。混み合ったマスでも他の駒より前に出る。
  const s = scale * (isHuman ? 1.18 : 1);

  // 前に描いた場所を覚えておき、飛んだときだけ滑りを切る。
  // 描画中に ref を読むことはできないので(React の決まり)、描いたあと・
  // 画面に出る前に差し込む。`useLayoutEffect` はそのために使う。
  const group = useRef<SVGGElement>(null);
  const lastAt = useRef<{ x: number; y: number } | null>(null);
  useLayoutEffect(() => {
    const element = group.current;
    const previous = lastAt.current;
    lastAt.current = { x, y };
    if (!element || !previous) return;
    if (Math.hypot(x - previous.x, y - previous.y) <= JUMP_DISTANCE) return;
    const saved = element.style.transition;
    element.style.transition = "none";
    // 1枚ぶん待って戻す。すぐ戻すと、同じ描画のうちに元通りになって効かない。
    const timer = requestAnimationFrame(() => {
      element.style.transition = saved;
    });
    return () => cancelAnimationFrame(timer);
  }, [x, y]);

  return (
    <g
      ref={group}
      className={`token${isActive ? " active" : ""}${isHuman ? " human" : ""}`}
      transform={`translate(${x}, ${y}) scale(${s})`}
      style={stepMs === undefined ? undefined : { transition: `transform ${stepMs}ms linear` }}
    >
      {/* 弾むのは内側の g。外側は transform 属性で位置を決めているので、
          そこに CSS の transform(translateY)を当てると原点へ飛ぶ。 */}
      <g key={bounceNonce} className={bounceNonce > 0 ? "token-bounce" : undefined}>
      {/* 自分の駒の目印。色付きの淡い円と細い輪。手番のリング(白)より内側に置き、両方が同時に見える。 */}
      {isHuman && (
        <>
          <circle r={13} fill={color} opacity={0.2} />
          <circle r={13} fill="none" stroke={color} strokeWidth={1.4} className="token-self-ring" />
        </>
      )}
      {isActive && <circle r={15} fill="none" stroke="#f6efe2" strokeWidth={1.6} opacity={0.85} className="token-ring" />}
      {/* 手番の始まりに一度広がる輪(F-10)。位置は外側の g、広がりは CSS の transform。 */}
      {pulseNonce > 0 && <circle key={pulseNonce} r={15} stroke={color} className="token-pulse" />}
      {/* 影 */}
      <ellipse cx={0} cy={7.5} rx={10} ry={2.6} fill="#0d0a18" opacity={0.45} />
      {vehicle === "spacecraft" ? <SpacecraftBody color={color} /> : <TrainBody color={color} />}
      {/* 運ばれている最中の目印。機関車の上に、運んでいるものを乗せる。
          文字なので盤面の縮尺に関わらず読める大きさに固定はせず、駒と一緒に拡縮させる
          (駒が小さくなる場面では、これも一緒に小さくないと駒を覆ってしまう)。 */}
      {carriedEmoji && (
        <text
          x={spiritEmoji ? 12 : 0}
          y={spiritEmoji ? -7 : -11}
          fontSize={11}
          textAnchor="middle"
          aria-hidden="true"
        >
          {carriedEmoji}
        </text>
      )}
      {/* 憑いている厄災の神。**駒の真上に乗せて、一緒に走らせる。**
          旅人一覧に 👹 が出るだけで、盤面を見ているあいだは誰に憑いているのか
          分からなかった。厄災の神は駒にくっついて
          追いかけてくるのが見えていないと、逃げる気持ちが起きない。

          **後ろ(左)ではなく真上に置いている。**同じマスに複数の駒がいるときは
          間隔22で横に並ぶので、後ろに出すと左隣の車体にかかる(実測)。
          撮って見ると、神が**どちらの駒に憑いているのか分からない絵**になった ——
          誰が背負っているかを見せるための絵が、逆を伝えていた。
          真上なら左右の隣と重ならないので、取り違えようがない。
          (3人以上が同じマスに乗ると上下2段になるため、上の段の駒には
           かかることがある。持ち主の色の輪はそのために残している。)

          運ばれている最中のアイテムとは場所を譲り合う。両方が同時に出る。 */}
      {spiritEmoji && (
        <g transform="translate(0, -12)">
          {/* 位置は外側の g、揺れは内側の g。**CSS の transform は SVG の
              transform 属性を上書きする**ので、同じ要素に両方は置けない。 */}
          <g className="token-spirit">
            <circle r={6.2} fill="#1b1330" opacity={0.72} />
            <circle r={6.2} fill="none" stroke={color} strokeWidth={1.2} opacity={0.9} />
            <text y={3.4} fontSize={9} textAnchor="middle" aria-hidden="true">
              {spiritEmoji}
            </text>
          </g>
        </g>
      )}
      </g>
    </g>
  );
}
