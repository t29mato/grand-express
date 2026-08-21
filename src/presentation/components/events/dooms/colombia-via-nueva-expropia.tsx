/**
 * 新しい幹線道路が真ん中を通る(コロンビア盤の厄災 4/7・loseProperties)。
 *
 * 構図表の担当:**朝の白い光・家の正面・測量杭と点線のルートが主役・人2(測量士)。
 * 強調色は杭とベストの橙だけ。**
 *
 * 何年も建っていた家の敷地に、予告なく測量杭が打ち込まれ、
 * 計画路線の点線が家の真ん中を通り抜けていく。奥にはブルドーザーが待つ。
 * 動くのは**点線のルート(流れる)・測量旗のはためき・機器を覗く測量士・
 * ブルドーザーの排気**。止めた状態でも、家を貫く杭の列で「収用」と分かる。
 */
export function ColombiaViaNuevaExpropia() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 朝の白い空 */}
      <rect width="400" height="210" fill="#d8dcd4" />
      <rect y="52" width="400" height="22" fill="#e8e8de" />
      <circle cx="330" cy="34" r="13" fill="#f2e8c8" opacity="0.9" />
      <g fill="#c2c8bc" opacity="0.8">
        <ellipse cx="70" cy="30" rx="46" ry="8" />
        <ellipse cx="190" cy="20" rx="40" ry="7" />
      </g>

      {/* 地面:乾いた土。奥に薄い野 */}
      <rect y="74" width="400" height="136" fill="#b0a080" />
      <rect y="74" width="400" height="14" fill="#9a9a78" />
      <path d="M0,88 q100,-5 200,0 q100,5 200,-3 v6 q-100,7 -200,2 Q100,88 0,94 Z" fill="#a89878" opacity="0.8" />

      {/* 家:白壁+瓦。長年そこにあったもの(正面) */}
      <g transform="translate(84,0)">
        <ellipse cx="0" cy="164" rx="66" ry="7" fill="#000" opacity="0.14" />
        <rect x="-56" y="112" width="112" height="50" fill="#f2ece0" />
        <path d="M-64,112 h128 l-13,-22 h-102 z" fill="#a85a3a" />
        <g stroke="#8a4a30" strokeWidth="1.6" fill="none" opacity="0.8">
          <path d="M-38,90 l5,22 M-12,90 l3,22 M14,90 l1,22 M40,90 l-2,22" />
        </g>
        <rect x="-9" y="132" width="18" height="30" fill="#5a4630" />
        <g fill="#5f7f96">
          <rect x="-44" y="124" width="16" height="16" />
          <rect x="28" y="124" width="16" height="16" />
        </g>
        <g fill="#4f7f6a">
          <rect x="-47" y="121" width="22" height="3" />
          <rect x="25" y="121" width="22" height="3" />
        </g>
        {/* 庭の木と、干してあった洗濯ひも */}
        <rect x="-78" y="132" width="5" height="30" fill="#5a4630" />
        <ellipse cx="-75" cy="122" rx="17" ry="12" fill="#6b8a5a" />
        <path d="M-58,140 q22,6 46,4" stroke="#8a8578" strokeWidth="1.4" fill="none" />
        <rect x="-40" y="141" width="8" height="9" fill="#c8944a" opacity="0.9" />
        <rect x="-24" y="143" width="8" height="9" fill="#7a8fa8" opacity="0.9" />
      </g>

      {/* 主役:家を斜めに貫く計画路線の点線+杭の列 */}
      <g className="vne-route" stroke="#c86a1f" strokeWidth="5" strokeDasharray="16 12" fill="none" opacity="0.9">
        <path d="M-20,196 L84,158 L200,132 L330,108 L410,96" />
      </g>
      {/* 白い中心線(計画図らしさ) */}
      <path d="M-20,196 L84,158 L200,132 L330,108 L410,96" stroke="#f2efe4" strokeWidth="1.4" strokeDasharray="4 20" fill="none" opacity="0.8" />
      {/* 測量杭:橙の頭の木杭が点々と */}
      {[
        [30, 182],
        [96, 156],
        [156, 142],
        [232, 126],
        [300, 113],
        [356, 104],
      ].map(([x, y]) => (
        <g key={x} transform={`translate(${x},${y})`}>
          <ellipse cx="0" cy="9" rx="5" ry="1.8" fill="#000" opacity="0.16" />
          <rect x="-2.4" y="-12" width="4.8" height="21" fill="#d8ccb4" />
          <rect x="-2.4" y="-12" width="4.8" height="5.4" fill="#c86a1f" />
        </g>
      ))}

      {/* 測量士1:三脚のセオドライトを覗く(オレンジベスト) */}
      <g transform="translate(258,0)">
        <ellipse cx="0" cy="172" rx="16" ry="4" fill="#000" opacity="0.16" />
        {/* 三脚と機器 */}
        <g stroke="#5f5a4a" strokeWidth="2.6" fill="none">
          <path d="M-14,170 L-4,132 M6,170 L-2,132 M-4,170 L-3,132" />
        </g>
        <rect x="-9" y="124" width="12" height="8" rx="2" fill="#5a5a52" />
        <circle cx="-11" cy="128" r="2.6" fill="#3a3a34" />
        {/* 覗く人:屈む姿勢 */}
        <g className="vne-peer">
          <rect x="10" y="150" width="4.6" height="22" fill="#4a4438" />
          <rect x="16.4" y="150" width="4.6" height="22" fill="#4a4438" />
          <path d="M8,128 q10,-4 16,2 l3,22 h-18 z" fill="#e0e4e8" />
          <path d="M9,132 q9,-3 14,1 l2,17 h-15 z" fill="#c86a1f" />
          <circle cx="6" cy="126" r="7" fill="#c98f5f" />
          <path d="M-1,124 a7.6,7.6 0 0 1 14,-2 l-1,3 z" fill="#f2efe4" />
          <path d="M10,134 l-12,-6" stroke="#e0e4e8" strokeWidth="4.6" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* 測量士2:標尺を立てて持つ(家の際=収用線のただ中) */}
      <g transform="translate(148,0)">
        <ellipse cx="0" cy="178" rx="13" ry="3.6" fill="#000" opacity="0.16" />
        <rect x="-4.6" y="154" width="4.4" height="24" fill="#4a4438" />
        <rect x="1" y="154" width="4.4" height="24" fill="#4a4438" />
        <path d="M-8,128 h16 l3,28 h-22 z" fill="#c86a1f" />
        <path d="M-8,134 h18" stroke="#a8560f" strokeWidth="2" />
        <circle cx="0" cy="120" r="7.2" fill="#8a6a4a" />
        <path d="M-8,117 a8,8 0 0 1 16,0 z" fill="#f5d78a" />
        {/* 標尺(赤白)を支える腕 */}
        <path d="M7,138 l14,-2" stroke="#c86a1f" strokeWidth="5" strokeLinecap="round" fill="none" />
        <rect x="22" y="104" width="5" height="74" fill="#f2efe4" />
        <g fill="#c8452f">
          <rect x="22" y="104" width="5" height="9" />
          <rect x="22" y="122" width="5" height="9" />
          <rect x="22" y="140" width="5" height="9" />
          <rect x="22" y="158" width="5" height="9" />
        </g>
        {/* 測量旗 */}
        <path d="M-26,178 V132" stroke="#8a8578" strokeWidth="2.4" fill="none" />
        <path className="vne-flag" d="M-26,132 l18,5 l-18,5 z" fill="#c86a1f" />
      </g>

      {/* 奥で待つブルドーザー(左) */}
      <g transform="translate(30,0)">
        <ellipse cx="0" cy="106" rx="26" ry="4" fill="#000" opacity="0.12" />
        <rect x="-20" y="88" width="34" height="13" rx="2" fill="#c8a13f" />
        <rect x="-8" y="78" width="16" height="12" rx="2" fill="#c8a13f" />
        <rect x="-4" y="81" width="9" height="6" fill="#d8e0e4" />
        <path d="M16,90 q8,2 8,10 v2 h-8 z" fill="#a8842f" />
        <path d="M24,102 l-4,-14 l4,-2 l3,16 z" fill="#8a8f92" />
        <rect x="-22" y="98" width="40" height="8" rx="4" fill="#4a4438" />
        <g fill="#8a8f92">
          <circle cx="-14" cy="102" r="2.6" />
          <circle cx="-2" cy="102" r="2.6" />
          <circle cx="10" cy="102" r="2.6" />
        </g>
        <g className="vne-smoke" fill="#8a8578">
          <ellipse cx="-14" cy="72" rx="3.4" ry="2.6" opacity="0.8" />
          <ellipse cx="-12" cy="64" rx="4.6" ry="3" opacity="0.6" />
        </g>
        <rect x="-16" y="72" width="4" height="7" fill="#5a5a52" />
      </g>

      {/* 手前の乾いた草と石 */}
      <g stroke="#9a8a5f" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M340,204 q2,-6 6,-9 M350,206 q1,-5 4,-8 M18,204 q2,-6 6,-9" />
      </g>
      <ellipse cx="376" cy="196" rx="8" ry="3" fill="#9a8a6a" />

      <style>{`
        .vne-route { animation: vne-march 2.8s linear infinite; }
        @keyframes vne-march {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -56; }
        }
        .vne-flag {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: vne-wave 2.4s ease-in-out infinite;
        }
        @keyframes vne-wave {
          0%, 100% { transform: scaleX(1); }
          50%      { transform: scaleX(0.78) skewY(4deg); }
        }
        .vne-peer {
          transform-box: fill-box;
          transform-origin: 30% 100%;
          animation: vne-lean 4.4s ease-in-out infinite;
        }
        @keyframes vne-lean {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-4deg); }
        }
        .vne-smoke {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vne-puff 3.4s ease-in-out infinite;
        }
        @keyframes vne-puff {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%      { transform: translateY(-6px); opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vne-route, .vne-flag, .vne-peer, .vne-smoke {
            animation: none;
          }
        }
      `}</style>
    </svg>
  );
}
