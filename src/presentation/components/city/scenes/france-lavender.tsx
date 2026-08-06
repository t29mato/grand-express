/**
 * ラベンダー畑(プロヴァンス、ヴァランソルなど)に重ねる動き。
 *
 * 畝の上を陽射しの帯が滑り、手前の穂が風にそろって傾き、
 * 蜜蜂が畝のあいだを行き来して、遠くの山際に熱がゆらぐ。
 * 畝・農家・糸杉は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function FranceLavender() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 陽射しの帯が畝の上を滑る */}
      <g fill="#fff0c0">
        <ellipse className="frlav-sun-a" cx="180" cy="150" rx="70" ry="12" opacity="0.14" />
        <ellipse className="frlav-sun-b" cx="280" cy="188" rx="96" ry="14" opacity="0.11" />
      </g>

      {/* 太陽(316,34)の光の脈 */}
      <circle className="frlav-sun" cx="316" cy="34" r="22" fill="#ffe9a8" opacity="0.2" />

      {/* 山際の熱のゆらぎ */}
      <g fill="#dfe0ee">
        <ellipse className="frlav-heat-a" cx="120" cy="112" rx="70" ry="4" opacity="0.24" />
        <ellipse className="frlav-heat-b" cx="310" cy="110" rx="70" ry="3.4" opacity="0.2" />
      </g>

      {/* 手前のラベンダーの穂(風にそろって傾く) */}
      <g stroke="#6f5f9c" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path className="frlav-spike frlav-k1" d="M40,206v-16" opacity="0.75" />
        <path className="frlav-spike frlav-k2" d="M78,202v-14" opacity="0.7" />
        <path className="frlav-spike frlav-k3" d="M126,208v-15" opacity="0.72" />
        <path className="frlav-spike frlav-k4" d="M258,204v-14" opacity="0.7" />
        <path className="frlav-spike frlav-k5" d="M312,208v-16" opacity="0.72" />
        <path className="frlav-spike frlav-k6" d="M362,202v-13" opacity="0.68" />
      </g>
      <g fill="#8a7ab8">
        <ellipse className="frlav-bud frlav-k1" cx="40" cy="188" rx="2.6" ry="4.4" opacity="0.85" />
        <ellipse className="frlav-bud frlav-k2" cx="78" cy="186" rx="2.4" ry="4" opacity="0.8" />
        <ellipse className="frlav-bud frlav-k3" cx="126" cy="191" rx="2.5" ry="4.2" opacity="0.82" />
        <ellipse className="frlav-bud frlav-k4" cx="258" cy="188" rx="2.4" ry="4" opacity="0.8" />
        <ellipse className="frlav-bud frlav-k5" cx="312" cy="190" rx="2.6" ry="4.4" opacity="0.82" />
        <ellipse className="frlav-bud frlav-k6" cx="362" cy="187" rx="2.3" ry="3.8" opacity="0.78" />
      </g>

      {/* 畝を行き来する蜜蜂 */}
      <g transform="translate(200,160)">
        <g className="frlav-bee-a">
          <ellipse cx="0" cy="0" rx="2.4" ry="1.6" fill="#f5b31c" />
          <ellipse cx="0.8" cy="0" rx="1" ry="1.5" fill="#4a4436" />
        </g>
      </g>
      <g transform="translate(150,178)">
        <g className="frlav-bee-b">
          <ellipse cx="0" cy="0" rx="2.1" ry="1.4" fill="#f5b31c" />
          <ellipse cx="0.7" cy="0" rx="0.9" ry="1.3" fill="#4a4436" />
        </g>
      </g>

      <style>{`
        .frlav-sun-a, .frlav-sun-b, .frlav-sun,
        .frlav-heat-a, .frlav-heat-b, .frlav-spike, .frlav-bud {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .frlav-sun-a { animation: frlav-sweep 26s linear infinite; }
        .frlav-sun-b { animation: frlav-sweep 34s linear infinite; animation-delay: -14s; }
        .frlav-sun { animation: frlav-pulse 9s ease-in-out infinite; }
        .frlav-heat-a { animation: frlav-heat 7s ease-in-out infinite; }
        .frlav-heat-b { animation: frlav-heat 9s ease-in-out infinite; animation-delay: -3.5s; }
        .frlav-spike { transform-origin: 50% 100%; animation: frlav-bend 5s ease-in-out infinite; }
        .frlav-bud { transform-origin: 50% 100%; animation: frlav-nod 5s ease-in-out infinite; }
        .frlav-k2 { animation-duration: 5.8s; animation-delay: -1.2s; }
        .frlav-k3 { animation-duration: 4.4s; animation-delay: -2.4s; }
        .frlav-k4 { animation-duration: 5.4s; animation-delay: -0.7s; }
        .frlav-k5 { animation-duration: 6.2s; animation-delay: -3.1s; }
        .frlav-k6 { animation-duration: 4.8s; animation-delay: -1.9s; }
        .frlav-bee-a { animation: frlav-buzz-a 16s ease-in-out infinite; }
        .frlav-bee-b { animation: frlav-buzz-b 21s ease-in-out infinite; animation-delay: -7s; }
        @keyframes frlav-sweep {
          0% { transform: translateX(-280px) scaleX(0.8); opacity: 0; }
          20%, 80% { opacity: 0.16; }
          100% { transform: translateX(300px) scaleX(1.2); opacity: 0; }
        }
        @keyframes frlav-pulse {
          0%, 100% { transform: scale(0.82); opacity: 0.12; }
          50% { transform: scale(1.18); opacity: 0.3; }
        }
        @keyframes frlav-heat {
          0%, 100% { transform: scaleY(1) translateY(0); opacity: 0.14; }
          50% { transform: scaleY(1.8) translateY(-2px); opacity: 0.3; }
        }
        @keyframes frlav-bend {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(13deg); }
        }
        @keyframes frlav-nod {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(3px, 0) rotate(11deg); }
        }
        @keyframes frlav-buzz-a {
          0%, 100% { transform: translate(-70px, 6px); }
          25% { transform: translate(-16px, -14px); }
          50% { transform: translate(40px, 10px); }
          75% { transform: translate(96px, -8px); }
        }
        @keyframes frlav-buzz-b {
          0%, 100% { transform: translate(90px, -6px); }
          30% { transform: translate(24px, 12px); }
          60% { transform: translate(-48px, -10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .frlav-sun-a, .frlav-sun-b, .frlav-sun,
          .frlav-heat-a, .frlav-heat-b, .frlav-spike, .frlav-bud,
          .frlav-bee-a, .frlav-bee-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
