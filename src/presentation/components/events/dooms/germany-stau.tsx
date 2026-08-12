/**
 * アウトバーンの渋滞(シュタウ)。工事区間の手前で車列が固まり、
 * ブレーキランプが点滅し続ける。誰も進まないまま、ハンドルを指で叩く音だけが響く。
 *
 * 事故や衝突は描かない。**点滅するブレーキランプ**と
 * **ハンドルを叩く指**だけで「動けない苛立ち」を伝える。
 */
export function GermanyStau() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った夕方の空。 */}
      <rect width="400" height="210" fill="#7a8a92" />
      <rect y="0" width="400" height="80" fill="#94a3aa" />

      {/* 工事の看板(渋滞の理由)。 */}
      <g strokeLinejoin="round">
        <rect x="330" y="60" width="50" height="40" rx="3" fill="#f4c430" stroke="#241a10" strokeWidth="2" />
        <path d="M340,72l8,16h20l8,-16z" fill="none" stroke="#241a10" strokeWidth="3" />
      </g>

      {/* 三車線の道路。 */}
      <rect y="90" width="400" height="120" fill="#4a4a52" />
      <g stroke="#e8dcc0" strokeWidth="3" strokeDasharray="14 10" opacity="0.7">
        <line x1="0" y1="130" x2="400" y2="130" />
        <line x1="0" y1="170" x2="400" y2="170" />
      </g>

      {/* 手前の車(運転席から見た視点)。 */}
      <g strokeLinejoin="round">
        <rect x="60" y="150" width="130" height="46" rx="10" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" />
        <rect x="72" y="158" width="106" height="18" rx="4" fill="#20364a" opacity="0.5" />
        <circle cx="90" cy="196" r="12" fill="#20364a" />
        <circle cx="170" cy="196" r="12" fill="#20364a" />
      </g>
      {/* 点滅するブレーキランプ。 */}
      <g fill="#e05252">
        <rect className="gst-light-a" x="64" y="164" width="10" height="10" rx="2" />
        <rect className="gst-light-b" x="176" y="164" width="10" height="10" rx="2" />
      </g>

      {/* 先に詰まった車列(遠景)。 */}
      <g fill="#8f9aa4" opacity="0.85">
        <rect x="220" y="158" width="70" height="26" rx="6" />
        <rect x="300" y="160" width="60" height="24" rx="6" />
      </g>
      <g fill="#a8b0b6" opacity="0.6">
        <rect x="240" y="196" width="40" height="14" rx="5" />
        <rect x="120" y="200" width="46" height="12" rx="5" />
      </g>
      <g fill="#c9d2d6" opacity="0.5">
        <circle className="gst-exhaust" cx="212" cy="176" r="4" />
      </g>
      <g fill="#e05252">
        <rect className="gst-light-c" x="284" y="164" width="6" height="6" rx="1.5" />
        <rect className="gst-light-d" x="354" y="166" width="6" height="6" rx="1.5" />
      </g>

      {/* ハンドルを叩く指(運転席)。 */}
      <g strokeLinecap="round">
        <circle cx="100" cy="150" r="26" fill="none" stroke="#2a2a30" strokeWidth="8" />
        <g className="gst-fingers" fill="#d9a273">
          <circle cx="86" cy="150" r="6" />
          <circle cx="98" cy="146" r="6" />
          <circle cx="110" cy="150" r="6" />
        </g>
      </g>

      {/* ラジオの交通情報の波。 */}
      <g className="gst-radio" stroke="#f6efe2" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M340,140 q6,-6 0,-12M348,144 q10,-10 0,-20" />
      </g>

      <style>{`
        .gst-light-a { animation: gst-blink 1s steps(1,end) infinite; }
        .gst-light-b { animation: gst-blink 1s steps(1,end) infinite; }
        .gst-light-c { animation: gst-blink 1.1s steps(1,end) infinite; animation-delay: -0.3s; }
        .gst-light-d { animation: gst-blink 0.9s steps(1,end) infinite; animation-delay: -0.5s; }
        .gst-fingers {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: gst-tap 0.7s ease-in-out infinite;
        }
        .gst-radio { animation: gst-pulse 1.6s ease-in-out infinite; }
        .gst-exhaust {
          transform-box: fill-box;
          transform-origin: center;
          animation: gst-puff 1.8s ease-out infinite;
        }
        @keyframes gst-puff {
          0% { transform: scale(0.4) translate(0, 0); opacity: 0.5; }
          100% { transform: scale(1.8) translate(-14px, -4px); opacity: 0; }
        }
        @keyframes gst-blink {
          0%, 55% { opacity: 1; }
          56%, 100% { opacity: 0.25; }
        }
        @keyframes gst-tap {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        @keyframes gst-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gst-light-a, .gst-light-b, .gst-light-c, .gst-light-d,
          .gst-fingers, .gst-radio, .gst-exhaust { animation: none; opacity: 0.5; }
        }
      `}</style>
    </svg>
  );
}
