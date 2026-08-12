/**
 * 北海の高潮(シュトルムフルート)。堤防を波が繰り返し越え、
 * 堤防の内側の家々に水しぶきが飛ぶ。住人は窓から水位を見張っている。
 *
 * 家が壊れる場面は描かない。**堤防を越える波としぶき**の繰り返しだけで
 * 「これはただ事ではない」を伝える。
 */
export function GermanySturmflut() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 荒れた空。 */}
      <rect width="400" height="210" fill="#48607a" />
      <rect y="0" width="400" height="70" fill="#5c7690" />
      <g fill="#4a5f76" opacity="0.8">
        <ellipse cx="80" cy="24" rx="70" ry="18" />
        <ellipse cx="300" cy="16" rx="80" ry="20" />
      </g>

      {/* 荒れる海。 */}
      <rect y="60" width="400" height="70" fill="#1e4a66" />
      <g className="gsf-sea" stroke="#4a7fa0" strokeWidth="3" fill="none" opacity="0.7">
        <path d="M0,80 q25,-10 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0" />
        <path d="M0,100 q25,10 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0" />
      </g>

      {/* 堤防。 */}
      <path d="M0,130 Q200,100 400,130 L400,150 Q200,120 0,150z" fill="#7a8a5c" />
      <path d="M0,130 Q200,100 400,130" stroke="#5f7f4a" strokeWidth="3" fill="none" />

      {/* 堤防を越える波としぶき。 */}
      <g className="gsf-splash">
        <path d="M140,110 Q200,88 260,110 Q220,118 200,124 Q180,118 140,110z" fill="#bfe8f4" opacity="0.9" />
        <circle cx="170" cy="98" r="3" fill="#bfe8f4" />
        <circle cx="230" cy="94" r="3.4" fill="#bfe8f4" />
        <circle cx="200" cy="86" r="2.6" fill="#bfe8f4" />
      </g>

      {/* 堤防の内側の家並み。 */}
      <g strokeLinejoin="round">
        <rect x="40" y="150" width="46" height="34" fill="#e8dcc0" />
        <path d="M36,150h54l-8,-14h-38z" fill="#7a3a2a" />
        <rect x="300" y="146" width="50" height="38" fill="#f2ead8" />
        <path d="M296,146h58l-9,-15h-40z" fill="#8a3a2a" />
      </g>

      {/* 窓から水位を見張る住人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <rect x="52" y="160" width="20" height="18" rx="2" fill="#3f7fae" opacity="0.5" />
        <circle cx="62" cy="166" r="7" fill="#d9a273" stroke="#241a10" strokeWidth="1.5" />
      </g>

      {/* 土嚢を積む人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <g fill="#8a6a3a"><rect x="200" y="186" width="20" height="12" rx="4" /><rect x="216" y="188" width="20" height="12" rx="4" /></g>
        <rect x="210" y="152" width="20" height="36" rx="7" fill="#4a5c69" />
        <circle cx="220" cy="140" r="11" fill="#d9a273" stroke="#241a10" strokeWidth="1.6" />
      </g>

      {/* 水位を示す杭の目盛り。潮位に合わせて水しぶきが上下する。 */}
      <rect x="380" y="130" width="4" height="60" fill="#4a3826" />
      <g stroke="#e05252" strokeWidth="2">
        <line x1="376" y1="140" x2="388" y2="140" />
      </g>

      <style>{`
        .gsf-sea { animation: gsf-drift 3s linear infinite; }
        .gsf-splash {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: gsf-wave 2.4s ease-in-out infinite;
        }
        @keyframes gsf-drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50px); }
        }
        @keyframes gsf-wave {
          0%, 100% { transform: scaleY(0.4) translateY(10px); opacity: 0.3; }
          50% { transform: scaleY(1.15) translateY(-6px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gsf-sea, .gsf-splash { animation: none; }
        }
      `}</style>
    </svg>
  );
}
