"use client";

/**
 * 方位記号。
 *
 * 地図には方位があるもの、という佇まいを足すためだけの飾り。盤面はどれも
 * 北が上の正距円筒図法なので、常に真上を指していれば嘘にならない。
 *
 * **縮尺は出さない。** 世界一周の盤面では緯度によって1度の長さが変わるので、
 * 1本の縮尺尺を置くとどこかで必ず嘘になる。方位だけなら全盤面で正しい。
 *
 * 凡例と同じく盤面のSVGの外(画面に貼るHTML)に置く。盤面の中に入れると
 * 地形に被り、ズームで大きさが変わってしまう。
 */
export function BoardCompass() {
  return (
    <div className="board-compass" aria-hidden="true">
      <svg viewBox="0 0 40 40" role="presentation">
        <circle cx="20" cy="20" r="18" fill="rgb(20 29 49 / 0.86)" stroke="#3b4a63" strokeWidth="1.5" />
        {/* 北の針(明るいほう)と南の針 */}
        <path d="M20,5 L24,20 L20,17 L16,20 Z" fill="#f5b31c" />
        <path d="M20,35 L16,20 L20,23 L24,20 Z" fill="#8792a8" />
        <text
          x="20"
          y="13"
          textAnchor="middle"
          fontSize="7"
          fontWeight="800"
          fill="#1b1330"
          style={{ pointerEvents: "none" }}
        >
          N
        </text>
      </svg>
    </div>
  );
}
