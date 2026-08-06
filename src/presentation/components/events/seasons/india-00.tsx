/**
 * インド 4月 — バイサーキーと初夏の熱。
 *
 * 北インド一帯で麦が実り、それに合わせてドールが鳴る。踊り手は両腕を上げて跳ね、
 * 白い太陽が畑の上に陽炎を立てる。月末には正午の平原は歩けないほど熱くなる。
 */
export function India00() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 熱でしらんだ空 */}
      <rect width="400" height="210" fill="#9cc8e2" />
      <rect y="52" width="400" height="40" fill="#b6d6ea" />
      <rect y="92" width="400" height="26" fill="#d6e6ee" />

      {/* 白い太陽 */}
      <circle cx="320" cy="42" r="34" fill="#f2e6b4" opacity="0.45" />
      <circle className="baisakhi-sun" cx="320" cy="42" r="22" fill="#f8f0cc" />

      {/* 遠くの木立と村 */}
      <g fill="#5f7a4a">
        <ellipse cx="30" cy="102" rx="26" ry="14" />
        <ellipse cx="88" cy="106" rx="20" ry="11" />
        <ellipse cx="212" cy="104" rx="24" ry="12" />
        <ellipse cx="374" cy="106" rx="22" ry="11" />
      </g>
      <g fill="#4a6038">
        <rect x="27" y="102" width="5" height="16" />
        <rect x="86" y="106" width="4" height="12" />
        <rect x="210" y="104" width="4" height="14" />
        <rect x="372" y="106" width="4" height="12" />
      </g>
      <g fill="#c7a878">
        <rect x="126" y="98" width="30" height="20" />
        <rect x="160" y="104" width="22" height="14" />
        <rect x="286" y="100" width="26" height="18" />
      </g>
      <g fill="#a08056">
        <path d="M122,98 L141,88 L160,98z" />
        <path d="M282,100 L299,90 L316,100z" />
      </g>

      {/* 麦畑 */}
      <rect y="116" width="400" height="94" fill="#d9a94a" />
      <rect y="116" width="400" height="8" fill="#c69736" />
      <rect y="148" width="400" height="6" fill="#cfa040" opacity="0.7" />
      <rect y="182" width="400" height="6" fill="#cfa040" opacity="0.7" />

      {/* 畑の縁に立つ麦の穂 */}
      <g className="baisakhi-stalks-a">
        <g stroke="#b8862c" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M10,120 l-2,-20" />
          <path d="M26,120 l1,-18" />
          <path d="M42,120 l-2,-22" />
          <path d="M58,120 l1,-17" />
          <path d="M74,120 l-1,-20" />
          <path d="M90,120 l2,-18" />
        </g>
        <g fill="#e8c464">
          <ellipse cx="8" cy="96" rx="3" ry="7" />
          <ellipse cx="27" cy="98" rx="3" ry="7" />
          <ellipse cx="40" cy="94" rx="3" ry="7" />
          <ellipse cx="59" cy="99" rx="3" ry="7" />
          <ellipse cx="73" cy="96" rx="3" ry="7" />
          <ellipse cx="92" cy="98" rx="3" ry="7" />
        </g>
      </g>
      <g className="baisakhi-stalks-b">
        <g stroke="#b8862c" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M112,120 l-2,-21" />
          <path d="M128,120 l1,-17" />
          <path d="M144,120 l-1,-20" />
          <path d="M160,120 l2,-18" />
          <path d="M176,120 l-2,-22" />
          <path d="M192,120 l1,-17" />
        </g>
        <g fill="#e8c464">
          <ellipse cx="110" cy="95" rx="3" ry="7" />
          <ellipse cx="129" cy="99" rx="3" ry="7" />
          <ellipse cx="143" cy="96" rx="3" ry="7" />
          <ellipse cx="162" cy="98" rx="3" ry="7" />
          <ellipse cx="174" cy="94" rx="3" ry="7" />
          <ellipse cx="193" cy="99" rx="3" ry="7" />
        </g>
      </g>
      <g className="baisakhi-stalks-c">
        <g stroke="#b8862c" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M214,120 l-1,-19" />
          <path d="M230,120 l2,-21" />
          <path d="M246,120 l-2,-17" />
          <path d="M262,120 l1,-20" />
          <path d="M278,120 l-1,-18" />
          <path d="M294,120 l2,-22" />
        </g>
        <g fill="#e8c464">
          <ellipse cx="213" cy="97" rx="3" ry="7" />
          <ellipse cx="232" cy="95" rx="3" ry="7" />
          <ellipse cx="244" cy="99" rx="3" ry="7" />
          <ellipse cx="263" cy="96" rx="3" ry="7" />
          <ellipse cx="277" cy="98" rx="3" ry="7" />
          <ellipse cx="296" cy="94" rx="3" ry="7" />
        </g>
      </g>
      <g className="baisakhi-stalks-d">
        <g stroke="#b8862c" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M316,120 l-2,-18" />
          <path d="M332,120 l1,-21" />
          <path d="M348,120 l-1,-17" />
          <path d="M364,120 l2,-20" />
          <path d="M380,120 l-2,-18" />
          <path d="M396,120 l1,-21" />
        </g>
        <g fill="#e8c464">
          <ellipse cx="314" cy="98" rx="3" ry="7" />
          <ellipse cx="333" cy="95" rx="3" ry="7" />
          <ellipse cx="347" cy="99" rx="3" ry="7" />
          <ellipse cx="366" cy="96" rx="3" ry="7" />
          <ellipse cx="378" cy="98" rx="3" ry="7" />
          <ellipse cx="397" cy="95" rx="3" ry="7" />
        </g>
      </g>

      {/* 陽炎 */}
      <g stroke="#f6efe2" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4">
        <path className="baisakhi-shimmer-a" d="M40,132 q14,-5 28,0 q14,5 28,0" />
        <path className="baisakhi-shimmer-b" d="M180,138 q14,-5 28,0 q14,5 28,0" />
        <path className="baisakhi-shimmer-c" d="M300,130 q14,-5 28,0 q14,5 28,0" />
        <path className="baisakhi-shimmer-b" d="M110,158 q14,-5 28,0 q14,5 28,0" />
      </g>

      {/* 刈り取った束 */}
      <g transform="translate(34,200)">
        <g stroke="#d8b055" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M0,8 L-18,-26" />
          <path d="M0,8 L-9,-32" />
          <path d="M0,8 L1,-34" />
          <path d="M0,8 L11,-31" />
          <path d="M0,8 L20,-24" />
        </g>
        <g fill="#e8c464">
          <ellipse cx="-19" cy="-29" rx="3" ry="6" />
          <ellipse cx="-10" cy="-35" rx="3" ry="6" />
          <ellipse cx="1" cy="-38" rx="3" ry="6" />
          <ellipse cx="12" cy="-35" rx="3" ry="6" />
          <ellipse cx="21" cy="-28" rx="3" ry="6" />
        </g>
        <rect x="-15" y="-10" width="30" height="7" rx="3" fill="#a8762c" />
      </g>
      <g transform="translate(362,196)">
        <g stroke="#d8b055" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M0,8 L-16,-23" />
          <path d="M0,8 L-8,-29" />
          <path d="M0,8 L1,-31" />
          <path d="M0,8 L10,-28" />
          <path d="M0,8 L18,-21" />
        </g>
        <g fill="#e8c464">
          <ellipse cx="-17" cy="-26" rx="3" ry="6" />
          <ellipse cx="-9" cy="-32" rx="3" ry="6" />
          <ellipse cx="1" cy="-35" rx="3" ry="6" />
          <ellipse cx="11" cy="-32" rx="3" ry="6" />
          <ellipse cx="19" cy="-25" rx="3" ry="6" />
        </g>
        <rect x="-13" y="-9" width="26" height="7" rx="3" fill="#a8762c" />
      </g>

      {/* 踊り手 */}
      <g transform="translate(126,196)">
        <g className="baisakhi-dancer">
          <rect x="-16" y="-8" width="14" height="8" rx="3" fill="#6b4630" />
          <rect x="4" y="-8" width="14" height="8" rx="3" fill="#6b4630" />
          <rect x="-14" y="-34" width="11" height="27" rx="3" fill="#e8e2d2" />
          <rect x="4" y="-34" width="11" height="27" rx="3" fill="#e8e2d2" />
          <rect x="-16" y="-42" width="32" height="14" rx="3" fill="#4f9e4a" />
          <rect x="-15" y="-70" width="30" height="32" rx="6" fill="#f6efe2" />
          <path d="M-15,-70 L15,-70 L15,-62 L-15,-62z" fill="#e8443f" />
          <rect x="-17" y="-52" width="34" height="6" rx="3" fill="#e8443f" />
          <g transform="translate(-13,-66) rotate(-26)">
            <g className="baisakhi-arm-a">
              <rect x="-5" y="-40" width="10" height="44" rx="5" fill="#f6efe2" />
              <circle cx="0" cy="-42" r="6" fill="#a8703c" />
              <rect x="-2.5" y="-56" width="5" height="14" rx="2.5" fill="#a8703c" />
            </g>
          </g>
          <g transform="translate(13,-66) rotate(26)">
            <g className="baisakhi-arm-b">
              <rect x="-5" y="-40" width="10" height="44" rx="5" fill="#f6efe2" />
              <circle cx="0" cy="-42" r="6" fill="#a8703c" />
              <rect x="-2.5" y="-56" width="5" height="14" rx="2.5" fill="#a8703c" />
            </g>
          </g>
          <circle cx="0" cy="-80" r="11" fill="#a8703c" />
          <path d="M-10,-74 q10,16 20,0 q-4,10 -10,10 q-6,0 -10,-10z" fill="#3b2f2a" />
          <circle cx="-4" cy="-82" r="1.8" fill="#2a2028" />
          <circle cx="4" cy="-82" r="1.8" fill="#2a2028" />
          <path d="M-12,-84 q4,-16 12,-16 q9,0 12,15 q-6,-6 -12,-6 q-7,0 -12,7z" fill="#f5b31c" />
          <path d="M-1,-100 q6,-6 10,0 q-5,-3 -10,0z" fill="#e8a20c" />
        </g>
      </g>

      {/* ドール(太鼓)を叩く人 */}
      <g transform="translate(258,200)">
        <g className="baisakhi-drummer">
          <rect x="-15" y="-8" width="13" height="8" rx="3" fill="#6b4630" />
          <rect x="3" y="-8" width="13" height="8" rx="3" fill="#6b4630" />
          <rect x="-13" y="-32" width="11" height="25" rx="3" fill="#e8e2d2" />
          <rect x="3" y="-32" width="11" height="25" rx="3" fill="#e8e2d2" />
          <rect x="-15" y="-64" width="30" height="34" rx="6" fill="#5b8fe8" />
          <path d="M-13,-64 L-2,-46 L13,-64z" fill="#f6efe2" />
          <circle cx="0" cy="-74" r="10" fill="#c98a5e" />
          <path d="M-9,-69 q9,14 18,0 q-4,9 -9,9 q-5,0 -9,-9z" fill="#3b2f2a" />
          <path d="M-11,-78 q4,-15 11,-15 q8,0 11,14 q-5,-6 -11,-6 q-6,0 -11,7z" fill="#e8823f" />
          {/* 肩紐と胴 */}
          <path d="M-12,-62 L18,-42" stroke="#c0392b" strokeWidth="5" fill="none" />
          <g>
            <rect x="-26" y="-46" width="52" height="30" rx="9" fill="#a8763f" />
            <ellipse cx="-26" cy="-31" rx="7" ry="15" fill="#f0e4cc" />
            <ellipse cx="26" cy="-31" rx="7" ry="15" fill="#e8dcc0" />
            <g stroke="#7c5426" strokeWidth="2" fill="none">
              <path d="M-20,-45 L-20,-17" />
              <path d="M-8,-46 L-8,-16" />
              <path d="M4,-46 L4,-16" />
              <path d="M16,-45 L16,-17" />
            </g>
          </g>
          {/* ばち */}
          <g transform="translate(-28,-32)">
            <g className="baisakhi-stick-a">
              <path
                d="M0,2 C-10,-4 -14,-14 -10,-24"
                stroke="#f0dcae"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          </g>
          <g transform="translate(28,-32)">
            <g className="baisakhi-stick-b">
              <rect x="-2.5" y="-26" width="5" height="30" rx="2.5" fill="#f0dcae" />
            </g>
          </g>
        </g>
      </g>

      <style>{`
        .baisakhi-sun {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: baisakhi-blaze 3.6s ease-in-out infinite;
        }
        .baisakhi-stalks-a, .baisakhi-stalks-b, .baisakhi-stalks-c, .baisakhi-stalks-d {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .baisakhi-stalks-a { animation: baisakhi-sway 3.2s ease-in-out infinite; }
        .baisakhi-stalks-b { animation: baisakhi-sway 3.8s ease-in-out infinite; animation-delay: -0.9s; }
        .baisakhi-stalks-c { animation: baisakhi-sway 3.4s ease-in-out infinite; animation-delay: -1.7s; }
        .baisakhi-stalks-d { animation: baisakhi-sway 4.1s ease-in-out infinite; animation-delay: -2.4s; }
        .baisakhi-shimmer-a { animation: baisakhi-waver 2.4s ease-in-out infinite; }
        .baisakhi-shimmer-b { animation: baisakhi-waver 3s ease-in-out infinite; animation-delay: -1.1s; }
        .baisakhi-shimmer-c { animation: baisakhi-waver 2.7s ease-in-out infinite; animation-delay: -1.9s; }
        .baisakhi-dancer {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: baisakhi-hop 0.86s ease-in-out infinite;
        }
        .baisakhi-arm-a, .baisakhi-arm-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .baisakhi-arm-a { animation: baisakhi-reach 0.86s ease-in-out infinite; }
        .baisakhi-arm-b { animation: baisakhi-reach 0.86s ease-in-out infinite reverse; }
        .baisakhi-drummer {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: baisakhi-hop 0.86s ease-in-out infinite;
          animation-delay: -0.43s;
        }
        .baisakhi-stick-a {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: baisakhi-beat 0.43s ease-in-out infinite;
        }
        .baisakhi-stick-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: baisakhi-beat 0.43s ease-in-out infinite reverse;
        }
        @keyframes baisakhi-blaze {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.86; }
        }
        @keyframes baisakhi-sway {
          0%, 100% { transform: skewX(5deg); }
          50% { transform: skewX(-5deg); }
        }
        @keyframes baisakhi-waver {
          0%, 100% { transform: translateX(-5px) scaleY(1); opacity: 0.25; }
          50% { transform: translateX(5px) scaleY(1.5); opacity: 0.5; }
        }
        @keyframes baisakhi-hop {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes baisakhi-reach {
          0%, 100% { transform: rotate(-11deg); }
          50% { transform: rotate(11deg); }
        }
        @keyframes baisakhi-beat {
          0%, 100% { transform: rotate(-38deg); }
          50% { transform: rotate(10deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .baisakhi-sun, .baisakhi-stalks-a, .baisakhi-stalks-b, .baisakhi-stalks-c,
          .baisakhi-stalks-d, .baisakhi-shimmer-a, .baisakhi-shimmer-b, .baisakhi-shimmer-c,
          .baisakhi-dancer, .baisakhi-arm-a, .baisakhi-arm-b, .baisakhi-drummer,
          .baisakhi-stick-a, .baisakhi-stick-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
