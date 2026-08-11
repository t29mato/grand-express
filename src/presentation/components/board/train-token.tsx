"use client";

import { TOKEN_BASE_SCALE } from "./token-layout";

/**
 * プレイヤーの駒。ただの丸だと自分がどこにいるのか地図の中で埋もれてしまうため、
 * 桃太郎電鉄と同じように**横から見た機関車**の形にしている。
 * 車体をプレイヤー色で塗り、窓・煙突・車輪は共通の暗色にして、
 * どの色でも輪郭が読めるようにしている。
 */
export function TrainToken({
  x,
  y,
  color,
  isActive,
  scale = TOKEN_BASE_SCALE,
  carriedEmoji = null,
  stepMs,
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
  carriedEmoji?: string | null;
  /**
   * 1マスぶん滑るのにかける時間。道のりを歩いているあいだだけ渡す。
   * 渡さなければ globals.css の既定(0.35秒)のまま。
   *
   * インラインで上書きしているのは、`globals.css` が他の担当と共有だから。
   * 動きを減らす設定のときは歩き自体を飛ばすので、ここには来ない。
   */
  stepMs?: number;
}) {
  const s = scale;
  return (
    <g
      className={`token${isActive ? " active" : ""}`}
      transform={`translate(${x}, ${y}) scale(${s})`}
      style={stepMs === undefined ? undefined : { transition: `transform ${stepMs}ms linear` }}
    >
      {isActive && <circle r={15} fill="none" stroke="#f6efe2" strokeWidth={1.6} opacity={0.85} className="token-ring" />}
      {/* 影 */}
      <ellipse cx={0} cy={7.5} rx={10} ry={2.6} fill="#0d0a18" opacity={0.45} />
      {/* 車体 */}
      <path
        d="M-10,4.2V-2.2a2,2 0 0 1 2,-2h5.4v-3.2a1.4,1.4 0 0 1 1.4,-1.4h4.4a1.4,1.4 0 0 1 1.4,1.4v3.2h1.6a4,4 0 0 1 4,4v4.4z"
        fill={color}
        stroke="#1b1330"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* 運転席の窓 */}
      <rect x={-8.2} y={-2.6} width={4.4} height={3.6} rx={0.8} fill="#f6efe2" opacity={0.92} />
      {/* 煙突 */}
      <rect x={4.6} y={-6.4} width={2.6} height={2.6} rx={0.6} fill="#1b1330" />
      {/* 車輪 */}
      <g fill="#1b1330">
        <circle cx={-5.6} cy={5} r={2.4} />
        <circle cx={1.4} cy={5} r={2.4} />
        <circle cx={7} cy={5.4} r={1.8} />
      </g>
      <g fill="#f6efe2" opacity={0.75}>
        <circle cx={-5.6} cy={5} r={0.8} />
        <circle cx={1.4} cy={5} r={0.8} />
      </g>
      {/* 運ばれている最中の目印。機関車の上に、運んでいるものを乗せる。
          文字なので盤面の縮尺に関わらず読める大きさに固定はせず、駒と一緒に拡縮させる
          (駒が小さくなる場面では、これも一緒に小さくないと駒を覆ってしまう)。 */}
      {carriedEmoji && (
        <text x={0} y={-11} fontSize={11} textAnchor="middle" aria-hidden="true">
          {carriedEmoji}
        </text>
      )}
    </g>
  );
}
