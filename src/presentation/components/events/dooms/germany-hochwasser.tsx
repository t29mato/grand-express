/**
 * ライン川の増水。コブレンツのドイチェス・エックで水位がじわじわ石段を
 * のぼり、地下室の水をポンプで汲み出す人と、土嚢を積む人が慌ただしく働く。
 *
 * 破壊は描かない。**水位線がじりじり上がり続けること**と
 * **ポンプの水しぶき**だけで「増水で物入りになった」を伝える。
 */
export function GermanyHochwasser() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇り空。 */}
      <rect width="400" height="210" fill="#5f7386" />
      <rect y="0" width="400" height="70" fill="#788c9e" />
      <g fill="#697d8f" opacity="0.8">
        <ellipse cx="90" cy="30" rx="60" ry="16" />
        <ellipse cx="300" cy="20" rx="70" ry="18" />
      </g>

      {/* 石段(合流点の記念碑の階段)。 */}
      <g fill="#8a8478">
        <rect x="0" y="150" width="400" height="60" />
        <rect x="0" y="140" width="400" height="10" />
        <rect x="0" y="130" width="400" height="10" opacity="0.85" />
        <rect x="0" y="120" width="400" height="10" opacity="0.7" />
      </g>
      {/* 洪水の目盛り線(過去の水位の記録)。 */}
      <g stroke="#4a3826" strokeWidth="1.4" opacity="0.6">
        <line x1="20" y1="120" x2="34" y2="120" />
        <line x1="20" y1="105" x2="34" y2="105" />
        <line x1="20" y1="90" x2="34" y2="90" />
      </g>

      {/* 増水した川。水面が揺れながらじりじり上がる。 */}
      <g className="ghw-water">
        <rect x="0" y="0" width="400" height="220" fill="#2a5478" />
        <path className="ghw-wave" d="M0,6 q25,-6 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 v214 h-400z" fill="#2a5478" />
        <path d="M0,10 q25,-5 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0" stroke="#5f8fae" strokeWidth="2" fill="none" opacity="0.6" />
      </g>

      {/* 土嚢を積む人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <g fill="#8a6a3a"><rect x="46" y="180" width="24" height="14" rx="4" /><rect x="66" y="182" width="24" height="14" rx="4" /></g>
        <rect x="58" y="140" width="24" height="42" rx="8" fill="#4a5c69" />
        <circle cx="70" cy="126" r="13" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <g className="ghw-arm">
          <path d="M60,150 Q46,158 44,176" stroke="#d9a273" strokeWidth="8" fill="none" />
        </g>
      </g>

      {/* ホースで排水する人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <rect x="300" y="150" width="24" height="40" rx="8" fill="#3f6b8a" />
        <circle cx="312" cy="136" r="12" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <path d="M304,158 Q286,150 270,150" stroke="#d9a273" strokeWidth="7" fill="none" />
        <rect x="255" y="146" width="16" height="8" rx="3" fill="#4a4a52" />
      </g>
      {/* 噴き出す水しぶき。 */}
      <g className="ghw-spray" fill="#bfe8f4" opacity="0.85">
        <circle r="3" />
        <circle r="2.2" cx="8" cy="-4" />
        <circle r="2" cx="-6" cy="-3" />
      </g>

      <style>{`
        .ghw-water {
          transform-box: fill-box;
          transform-origin: bottom;
          animation: ghw-rise 6s ease-in-out infinite;
        }
        .ghw-wave { animation: ghw-ripple 2.6s ease-in-out infinite; }
        .ghw-arm {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ghw-lift 1.6s ease-in-out infinite;
        }
        .ghw-spray {
          transform-box: fill-box;
          transform-origin: center;
          animation: ghw-squirt 0.9s linear infinite;
        }
        @keyframes ghw-rise {
          0% { transform: translateY(30px); }
          50% { transform: translateY(0px); }
          100% { transform: translateY(30px); }
        }
        @keyframes ghw-ripple {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-50px); }
        }
        @keyframes ghw-lift {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-18deg); }
        }
        @keyframes ghw-squirt {
          0% { transform: translate(250px, 152px) scale(0.4); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translate(220px, 168px) scale(1.1); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ghw-water, .ghw-wave, .ghw-arm, .ghw-spray { animation: none; }
        }
      `}</style>
    </svg>
  );
}
