/**
 * エル・トゥンチェの口笛に化かされる。木々のあいだのどこからか口笛が響き、
 * 鳴るたびに近づきながら、決して前と同じ方向からは聞こえてこなかった。
 * 道を完全に見失ったころには、もう遅かった。
 *
 * エル・トゥンチェ自身の姿は出さない。**円を描く足あとと、
 * どこからともなく広がる口笛の波紋**だけで「化かされている」ことを表す
 * (韓国のトッケビに化かされる絵と同じ考え方)。動くのは口笛の波紋1つだけ。
 */
export function SouthamericaTunchesilba() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の密林。 */}
      <rect width="400" height="210" fill="#141f18" />
      <rect y="0" width="400" height="70" fill="#1c2c22" />
      <circle cx="60" cy="34" r="16" fill="#e8e0c8" opacity="0.8" />

      {/* 木々のシルエット。 */}
      <g fill="#0e1710" opacity="0.9">
        <circle cx="30" cy="90" r="34" />
        <circle cx="70" cy="72" r="26" />
        <circle cx="340" cy="86" r="36" />
        <circle cx="300" cy="66" r="24" />
      </g>

      {/* 林床。 */}
      <rect y="120" width="400" height="90" fill="#1c2818" />

      {/* 堂々巡りした足あと。輪になっている。 */}
      <g fill="#0e1710" opacity="0.9">
        <ellipse cx="160" cy="176" rx="7" ry="4" />
        <ellipse cx="188" cy="160" rx="7" ry="4" />
        <ellipse cx="220" cy="156" rx="7" ry="4" />
        <ellipse cx="246" cy="168" rx="7" ry="4" />
        <ellipse cx="250" cy="192" rx="7" ry="4" />
        <ellipse cx="222" cy="204" rx="7" ry="4" />
        <ellipse cx="190" cy="204" rx="7" ry="4" />
        <ellipse cx="164" cy="194" rx="7" ry="4" />
      </g>

      {/* 立ち止まって耳をすます人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M200,182 L196,206" stroke="#241a10" strokeWidth="8" fill="none" />
        <path d="M208,182 L214,206" stroke="#2f2418" strokeWidth="8" fill="none" />
        <path d="M202,158 L202,184" stroke="#3f5a4a" strokeWidth="18" fill="none" />
        <circle cx="202" cy="146" r="10" fill="#d9a273" stroke="#0e1710" strokeWidth="2" />
        <path d="M192,150 L180,142" stroke="#d9a273" strokeWidth="6" fill="none" />
      </g>

      {/* 遠くの密林の縁。 */}
      <g fill="#122016" opacity="0.85">
        <circle cx="20" cy="140" r="20" />
        <circle cx="380" cy="150" r="24" />
      </g>

      {/* どこからともなく広がる口笛の波紋。**ここだけが動く。** */}
      <g className="sa-tunche-whistle" fill="none" stroke="#9ff0c8">
        <circle cx="300" cy="120" r="6" />
        <circle cx="300" cy="120" r="16" />
        <circle cx="300" cy="120" r="28" />
      </g>

      <style>{`
        .sa-tunche-whistle {
          transform-box: fill-box;
          transform-origin: 300px 120px;
          animation: sa-tunche-ripple 3.4s ease-out infinite;
        }
        @keyframes sa-tunche-ripple {
          0%   { transform: scale(0.4) translate(30px, 20px); opacity: 0.9; stroke-width: 3; }
          60%  { transform: scale(1.3) translate(-40px, -10px); opacity: 0.4; stroke-width: 1.4; }
          100% { transform: scale(1.6) translate(-40px, -10px); opacity: 0; stroke-width: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-tunche-whistle {
            animation: none;
            opacity: 0.5;
          }
        }
      `}</style>
    </svg>
  );
}
