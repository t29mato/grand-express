/**
 * やけに厳しい駐車監視員。駐車券を2分の余裕で買ったはずが、車に戻る途中で
 * ちょうど切れた瞬間をカメラに捉えられていた。
 *
 * 警告灯を光らせた監視員の手元から、罰金の紙が伸びていく様子で
 * 「切符を切られた」ことを一目で示す。動くのは、印字されて伸びる紙と、
 * 警告灯の点滅。
 */
export function UkParkingWarden() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った通りの空。 */}
      <rect width="400" height="210" fill="#a8b0a8" />
      <rect y="0" width="400" height="80" fill="#bcc4bc" />

      {/* 街路樹と建物のシルエット。 */}
      <g fill="#8a9488" opacity="0.8">
        <rect x="10" y="50" width="30" height="40" />
        <rect x="350" y="42" width="34" height="48" />
      </g>
      <circle cx="330" cy="56" r="16" fill="#5f7f4a" opacity="0.7" />
      <rect x="326" y="70" width="6" height="14" fill="#5a4526" opacity="0.7" />

      {/* 歩道と道路。 */}
      <rect y="90" width="400" height="30" fill="#9a9484" />
      <rect y="120" width="400" height="90" fill="#5a5f5c" />
      <g stroke="#dfe4e0" strokeWidth="4" strokeDasharray="20 16">
        <path d="M0,160 H400" />
      </g>

      {/* 駐車券の柱。 */}
      <rect x="30" y="96" width="6" height="24" fill="#4a4f56" />
      <rect x="20" y="86" width="26" height="12" rx="2" fill="#3f7fae" />

      {/* 駐車した車。 */}
      <g strokeLinejoin="round">
        <path d="M130,158 L146,130 L246,130 L262,158z" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" />
        <rect x="126" y="156" width="140" height="26" rx="4" fill="#4a7bd0" stroke="#20364a" strokeWidth="2.5" />
        <rect x="150" y="136" width="30" height="18" fill="#dfe8ee" opacity="0.8" />
        <rect x="200" y="136" width="30" height="18" fill="#dfe8ee" opacity="0.8" />
        <circle cx="156" cy="184" r="11" fill="#2a2a30" />
        <circle cx="236" cy="184" r="11" fill="#2a2a30" />
        {/* ワイパー。 */}
        <line x1="150" y1="156" x2="180" y2="150" stroke="#2a2a30" strokeWidth="2" />
      </g>

      {/* 駐車監視員。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M300,168 L296,196" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M308,168 L314,196" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M302,138 L302,170" stroke="#1a3a5a" strokeWidth="22" fill="none" />
        <circle cx="302" cy="126" r="11" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <path d="M292,120 a12,8 0 0 1 20,0z" fill="#1a3a5a" />
        {/* 警告灯を光らせた帽子の記章。**ここが動く。** */}
        <circle className="ukw-light" cx="302" cy="118" r="3" fill="#f5b31c" />
        {/* 端末を持つ腕。 */}
        <path d="M292,146 L272,158" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>

      {/* 手元の発券端末。 */}
      <rect x="252" y="152" width="24" height="20" rx="2" fill="#3a3540" stroke="#20364a" strokeWidth="1.6" />
      <rect x="256" y="156" width="16" height="6" fill="#5fd0a0" opacity="0.8" />

      {/* 印字されて伸びる罰金の紙。**ここも動く。** */}
      <g className="ukw-ticket">
        <rect x="255" y="171" width="18" height="0" fill="#f6efe2" stroke="#c8bda0" strokeWidth="1" />
        <line x1="258" y1="0" x2="270" y2="0" stroke="#c8383f" strokeWidth="1.4" />
        <line x1="258" y1="0" x2="270" y2="0" stroke="#8a8478" strokeWidth="1" />
      </g>

      <style>{`
        .ukw-light {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ukw-blink 0.8s steps(2) infinite;
        }
        @keyframes ukw-blink {
          0%, 100% { opacity: 1; fill: #f5b31c; }
          50% { opacity: 0.4; fill: #e05252; }
        }
        .ukw-ticket rect {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: ukw-print 2.4s ease-in-out infinite;
        }
        .ukw-ticket line:nth-of-type(1) {
          transform-box: fill-box;
          animation: ukw-line1 2.4s ease-in-out infinite;
        }
        .ukw-ticket line:nth-of-type(2) {
          transform-box: fill-box;
          animation: ukw-line2 2.4s ease-in-out infinite;
        }
        @keyframes ukw-print {
          0%   { height: 0; opacity: 0; }
          30%  { height: 0; opacity: 1; }
          70%  { height: 34px; opacity: 1; }
          100% { height: 34px; opacity: 1; }
        }
        @keyframes ukw-line1 {
          0%, 30% { transform: translateY(171px); opacity: 0; }
          70%, 100% { transform: translateY(180px); opacity: 1; }
        }
        @keyframes ukw-line2 {
          0%, 30% { transform: translateY(171px); opacity: 0; }
          70%, 100% { transform: translateY(190px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ukw-light { animation: none; }
          .ukw-ticket rect { animation: none; height: 34px; opacity: 1; }
          .ukw-ticket line:nth-of-type(1) { animation: none; transform: translateY(180px); opacity: 1; }
          .ukw-ticket line:nth-of-type(2) { animation: none; transform: translateY(190px); opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
