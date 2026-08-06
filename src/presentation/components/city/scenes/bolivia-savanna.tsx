/**
 * ベニ川流域の大サバンナ(トリニダーなど)に重ねる動き。
 *
 * 大きな雲がゆっくり流れ、白鷺が三羽、氾濫原の上を渡る。
 * 曲がりくねった水路が日を返して光る。
 * 背景(空・草原・水路)は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function BoliviaSavanna() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 流れる雲 */}
      <g transform="translate(170,56)">
        <g className="bsv-cloud-a" fill="#ffffff" opacity="0.4">
          <ellipse cx="0" cy="0" rx="30" ry="9" />
          <ellipse cx="-16" cy="3" rx="18" ry="7" />
          <ellipse cx="18" cy="3" rx="20" ry="7" />
        </g>
      </g>
      <g transform="translate(320,80)">
        <g className="bsv-cloud-b" fill="#ffffff" opacity="0.28">
          <ellipse cx="0" cy="0" rx="22" ry="6" />
          <ellipse cx="15" cy="2" rx="14" ry="5" />
        </g>
      </g>

      {/* 氾濫原を渡る白鷺 */}
      <g transform="translate(150,104)">
        <g className="bsv-egret-a">
          <ellipse cx="0" cy="0" rx="7" ry="2.2" fill="#fbf7ef" />
          <path d="M6,-0.6 L13,-1.6 L16,-1 L13,0.2 Z" fill="#fbf7ef" />
          <path className="bsv-wing-a" d="M-3,-0.6 L1,-9 L6,-1 Z" fill="#ffffff" />
          <path className="bsv-wing-a2" d="M-3,0.6 L0,7.4 L5,1 Z" fill="#e2dccd" />
        </g>
      </g>
      <g transform="translate(196,92)">
        <g className="bsv-egret-b">
          <ellipse cx="0" cy="0" rx="6" ry="2" fill="#fbf7ef" />
          <path d="M5,-0.6 L11,-1.4 L14,-0.8 L11,0.2 Z" fill="#fbf7ef" />
          <path className="bsv-wing-b" d="M-2.6,-0.6 L0.6,-8 L5,-1 Z" fill="#ffffff" />
          <path className="bsv-wing-b2" d="M-2.6,0.6 L0,6.4 L4.4,1 Z" fill="#e2dccd" />
        </g>
      </g>
      <g transform="translate(238,110)">
        <g className="bsv-egret-c">
          <ellipse cx="0" cy="0" rx="5.4" ry="1.8" fill="#fbf7ef" />
          <path d="M4.6,-0.6 L10,-1.2 L12.6,-0.8 L10,0.2 Z" fill="#fbf7ef" />
          <path className="bsv-wing-c" d="M-2.4,-0.6 L0.4,-7 L4.4,-1 Z" fill="#ffffff" />
          <path className="bsv-wing-c2" d="M-2.4,0.6 L0,5.6 L4,1 Z" fill="#e2dccd" />
        </g>
      </g>

      {/* 水路のきらめき */}
      <g stroke="#eaf5ff" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path className="bsv-glint bsv-q1" d="M44,138 h20" opacity="0.5" />
        <path className="bsv-glint bsv-q2" d="M176,142 h22" opacity="0.44" />
        <path className="bsv-glint bsv-q3" d="M328,135 h20" opacity="0.48" />
        <path className="bsv-glint bsv-q4" d="M56,184 h22" opacity="0.46" />
        <path className="bsv-glint bsv-q5" d="M198,186 h24" opacity="0.42" />
        <path className="bsv-glint bsv-q6" d="M346,178 h20" opacity="0.46" />
      </g>

      <style>{`
        .bsv-cloud-a { animation: bsv-drift-a 64s linear infinite; }
        .bsv-cloud-b { animation: bsv-drift-b 82s linear infinite; }
        .bsv-egret-a { animation: bsv-fly 34s linear infinite; }
        .bsv-egret-b { animation: bsv-fly 34s linear infinite; animation-delay: -1.4s; }
        .bsv-egret-c { animation: bsv-fly 34s linear infinite; animation-delay: -2.6s; }
        .bsv-wing-a, .bsv-wing-b, .bsv-wing-c {
          transform-box: fill-box; transform-origin: 55% 100%;
          animation: bsv-flap-up 2.2s ease-in-out infinite;
        }
        .bsv-wing-a2, .bsv-wing-b2, .bsv-wing-c2 {
          transform-box: fill-box; transform-origin: 55% 0%;
          animation: bsv-flap-dn 2.2s ease-in-out infinite;
        }
        .bsv-wing-b, .bsv-wing-b2 { animation-delay: -0.5s; }
        .bsv-wing-c, .bsv-wing-c2 { animation-delay: -1s; }
        .bsv-glint { animation: bsv-shine 8.5s ease-in-out infinite; }
        .bsv-q2 { animation-duration: 10s; animation-delay: -2s; }
        .bsv-q3 { animation-duration: 7.5s; animation-delay: -4s; }
        .bsv-q4 { animation-duration: 11s; animation-delay: -1s; }
        .bsv-q5 { animation-duration: 9s; animation-delay: -5.5s; }
        .bsv-q6 { animation-duration: 12s; animation-delay: -3s; }
        @keyframes bsv-drift-a {
          0% { transform: translateX(-230px); }
          100% { transform: translateX(260px); }
        }
        @keyframes bsv-drift-b {
          0% { transform: translateX(-380px); }
          100% { transform: translateX(120px); }
        }
        @keyframes bsv-fly {
          0% { transform: translate(-230px, 10px); }
          100% { transform: translate(250px, -12px); }
        }
        @keyframes bsv-flap-up {
          0%, 100% { transform: rotate(-14deg); }
          50% { transform: rotate(24deg); }
        }
        @keyframes bsv-flap-dn {
          0%, 100% { transform: rotate(14deg); }
          50% { transform: rotate(-24deg); }
        }
        @keyframes bsv-shine {
          0%, 100% { transform: translateX(-8px); opacity: 0.1; }
          50% { transform: translateX(8px); opacity: 0.55; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bsv-cloud-a, .bsv-cloud-b,
          .bsv-egret-a, .bsv-egret-b, .bsv-egret-c,
          .bsv-wing-a, .bsv-wing-b, .bsv-wing-c,
          .bsv-wing-a2, .bsv-wing-b2, .bsv-wing-c2,
          .bsv-glint { animation: none; }
        }
      `}</style>
    </svg>
  );
}
