/**
 * 6月 — ティワナクのアイマラ新年(ボリビア)。
 *
 * 凍える夜を明かした人々が「太陽の門」の前に立ち、
 * 石の門をくぐって昇ってくる最初の陽に両手のひらを向ける。
 * 白い息が立ちのぼり、ウィパラがはためく。
 */
export function Bolivia02() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜明けの空 */}
      <rect width="400" height="210" fill="#241f47" />
      <rect y="42" width="400" height="30" fill="#3a3466" />
      <rect y="72" width="400" height="24" fill="#6a4470" />
      <rect y="96" width="400" height="22" fill="#b8603f" />
      <rect y="118" width="400" height="18" fill="#e08a3c" />

      {/* 消えていく星 */}
      <g fill="#f6efe2">
        <circle className="b02-star b02-star-a" cx="42" cy="18" r="2" />
        <circle className="b02-star b02-star-b" cx="118" cy="30" r="1.6" />
        <circle className="b02-star b02-star-c" cx="292" cy="16" r="2.2" />
        <circle className="b02-star b02-star-d" cx="358" cy="34" r="1.8" />
        <circle className="b02-star b02-star-e" cx="206" cy="12" r="1.6" />
      </g>

      {/* 遠くの山なみ */}
      <path d="M0,136 L40,110 L84,136 Z" fill="#4a3f5e" />
      <path d="M60,136 L112,102 L168,136 Z" fill="#413757" />
      <path d="M244,136 L300,100 L356,136 Z" fill="#413757" />
      <path d="M330,136 L372,112 L400,136 Z" fill="#4a3f5e" />

      {/* 門の向こうの陽ざし */}
      <circle className="b02-glow" cx="200" cy="112" r="104" fill="#f5b31c" opacity="0.14" />
      <circle className="b02-glow" cx="200" cy="112" r="66" fill="#f5b31c" opacity="0.18" />
      <circle className="b02-sun" cx="200" cy="112" r="25" fill="#f7d34a" />

      {/* 太陽の門(戸口はくり抜いてあり、向こうに陽が見える) */}
      <path
        d="M126,44 L274,44 L274,152 L126,152 Z M170,86 L170,152 L230,152 L230,86 Z"
        fillRule="evenodd"
        fill="#6f6a62"
      />
      <path d="M126,44 L274,44 L274,52 L126,52 Z" fill="#867f75" />
      <rect x="126" y="36" width="34" height="9" fill="#6f6a62" />
      <rect x="184" y="34" width="32" height="11" fill="#6f6a62" />
      <rect x="240" y="36" width="34" height="9" fill="#6f6a62" />
      {/* 彫られた帯 */}
      <g fill="#524d47">
        <rect x="134" y="58" width="12" height="12" />
        <rect x="150" y="58" width="12" height="12" />
        <rect x="238" y="58" width="12" height="12" />
        <rect x="254" y="58" width="12" height="12" />
        <rect x="134" y="76" width="30" height="6" />
        <rect x="236" y="76" width="30" height="6" />
        <rect x="134" y="98" width="26" height="42" />
        <rect x="240" y="98" width="26" height="42" />
      </g>
      {/* 中央の神像 */}
      <g fill="#4a4540">
        <rect x="188" y="58" width="24" height="20" />
        <rect x="180" y="62" width="6" height="6" />
        <rect x="214" y="62" width="6" height="6" />
        <rect x="192" y="52" width="4" height="8" />
        <rect x="204" y="52" width="4" height="8" />
        <rect x="198" y="49" width="4" height="10" />
      </g>
      <g fill="#8d867c">
        <rect x="192" y="64" width="5" height="5" />
        <rect x="203" y="64" width="5" height="5" />
      </g>
      {/* 台座 */}
      <rect x="114" y="152" width="172" height="11" fill="#55504a" />
      <rect x="114" y="152" width="172" height="3" fill="#7a746a" />

      {/* 地面 */}
      <rect y="160" width="400" height="50" fill="#3b3542" />
      <rect y="160" width="400" height="5" fill="#4d4653" />

      {/* うしろに並ぶ人々 */}
      <g fill="#241f33">
        <g transform="translate(24,170)">
          <circle cx="0" cy="-16" r="5" />
          <path d="M-8,0 L-5,-14 L5,-14 L8,0 Z" />
        </g>
        <g transform="translate(46,171)">
          <circle cx="0" cy="-15" r="4.6" />
          <path d="M-7,0 L-4.6,-13 L4.6,-13 L7,0 Z" />
        </g>
        <g transform="translate(102,170)">
          <circle cx="0" cy="-16" r="5" />
          <path d="M-8,0 L-5,-14 L5,-14 L8,0 Z" />
        </g>
        <g transform="translate(150,171)">
          <circle cx="0" cy="-15" r="4.6" />
          <path d="M-7,0 L-4.6,-13 L4.6,-13 L7,0 Z" />
        </g>
        <g transform="translate(252,171)">
          <circle cx="0" cy="-15" r="4.6" />
          <path d="M-7,0 L-4.6,-13 L4.6,-13 L7,0 Z" />
        </g>
        <g transform="translate(300,170)">
          <circle cx="0" cy="-16" r="5" />
          <path d="M-8,0 L-5,-14 L5,-14 L8,0 Z" />
        </g>
        <g transform="translate(370,171)">
          <circle cx="0" cy="-15" r="4.6" />
          <path d="M-7,0 L-4.6,-13 L4.6,-13 L7,0 Z" />
        </g>
      </g>

      {/* ウィパラ */}
      <g>
        <rect x="56" y="98" width="3.5" height="82" fill="#5a4a3a" />
        <g className="b02-flag b02-flag-a">
          <g>
            <rect x="60" y="100" width="10" height="10" fill="#e8443f" />
            <rect x="70" y="100" width="10" height="10" fill="#ef8a2f" />
            <rect x="80" y="100" width="10" height="10" fill="#f5d21c" />
            <rect x="90" y="100" width="10" height="10" fill="#f6efe2" />
            <rect x="60" y="110" width="10" height="10" fill="#ef8a2f" />
            <rect x="70" y="110" width="10" height="10" fill="#f5d21c" />
            <rect x="80" y="110" width="10" height="10" fill="#f6efe2" />
            <rect x="90" y="110" width="10" height="10" fill="#4f9e4a" />
            <rect x="60" y="120" width="10" height="10" fill="#f5d21c" />
            <rect x="70" y="120" width="10" height="10" fill="#f6efe2" />
            <rect x="80" y="120" width="10" height="10" fill="#4f9e4a" />
            <rect x="90" y="120" width="10" height="10" fill="#3b6fa8" />
            <rect x="60" y="130" width="10" height="10" fill="#f6efe2" />
            <rect x="70" y="130" width="10" height="10" fill="#4f9e4a" />
            <rect x="80" y="130" width="10" height="10" fill="#3b6fa8" />
            <rect x="90" y="130" width="10" height="10" fill="#7a4a9e" />
          </g>
        </g>
      </g>
      <g>
        <rect x="340" y="94" width="3.5" height="86" fill="#5a4a3a" />
        <g className="b02-flag b02-flag-b">
          <g>
            <rect x="344" y="96" width="9" height="9" fill="#e8443f" />
            <rect x="353" y="96" width="9" height="9" fill="#ef8a2f" />
            <rect x="362" y="96" width="9" height="9" fill="#f5d21c" />
            <rect x="371" y="96" width="9" height="9" fill="#f6efe2" />
            <rect x="344" y="105" width="9" height="9" fill="#ef8a2f" />
            <rect x="353" y="105" width="9" height="9" fill="#f5d21c" />
            <rect x="362" y="105" width="9" height="9" fill="#f6efe2" />
            <rect x="371" y="105" width="9" height="9" fill="#4f9e4a" />
            <rect x="344" y="114" width="9" height="9" fill="#f5d21c" />
            <rect x="353" y="114" width="9" height="9" fill="#f6efe2" />
            <rect x="362" y="114" width="9" height="9" fill="#4f9e4a" />
            <rect x="371" y="114" width="9" height="9" fill="#3b6fa8" />
            <rect x="344" y="123" width="9" height="9" fill="#f6efe2" />
            <rect x="353" y="123" width="9" height="9" fill="#4f9e4a" />
            <rect x="362" y="123" width="9" height="9" fill="#3b6fa8" />
            <rect x="371" y="123" width="9" height="9" fill="#7a4a9e" />
          </g>
        </g>
      </g>

      {/* 白い息 */}
      <g fill="#e8eef6">
        <ellipse className="b02-breath b02-breath-a" cx="0" cy="0" rx="7" ry="5" />
        <ellipse className="b02-breath b02-breath-b" cx="0" cy="0" rx="6" ry="4.4" />
        <ellipse className="b02-breath b02-breath-c" cx="0" cy="0" rx="8" ry="5.4" />
      </g>

      {/* 手のひらを掲げる人々 */}
      <g transform="translate(96,202)">
        <path d="M-17,0 L-11,-36 L11,-36 L17,0 Z" fill="#2b2440" />
        <path d="M-14,-22 L14,-22 L15,-15 L-15,-15 Z" fill="#8a3f5e" />
        <circle cx="0" cy="-45" r="9.5" fill="#2b2440" />
        <rect x="-14" y="-53" width="28" height="4" rx="2" fill="#2b2440" />
        <rect x="-9" y="-61" width="18" height="9" rx="2" fill="#2b2440" />
        <g className="b02-arm b02-arm-a">
          <rect x="-15" y="-60" width="7" height="26" rx="3.5" fill="#2b2440" />
          <circle cx="-11.5" cy="-62" r="5" fill="#3a3252" />
        </g>
        <g className="b02-arm b02-arm-b">
          <rect x="8" y="-60" width="7" height="26" rx="3.5" fill="#2b2440" />
          <circle cx="11.5" cy="-62" r="5" fill="#3a3252" />
        </g>
      </g>
      <g transform="translate(200,206)">
        <path d="M-19,0 L-12,-40 L12,-40 L19,0 Z" fill="#241f38" />
        <path d="M-16,-25 L16,-25 L17,-17 L-17,-17 Z" fill="#3b6fa8" />
        <circle cx="0" cy="-50" r="10.5" fill="#241f38" />
        <rect x="-15" y="-59" width="30" height="4" rx="2" fill="#241f38" />
        <rect x="-10" y="-68" width="20" height="10" rx="2" fill="#241f38" />
        <g className="b02-arm b02-arm-c">
          <rect x="-17" y="-68" width="8" height="30" rx="4" fill="#241f38" />
          <circle cx="-13" cy="-70" r="5.5" fill="#35304a" />
        </g>
        <g className="b02-arm b02-arm-d">
          <rect x="9" y="-68" width="8" height="30" rx="4" fill="#241f38" />
          <circle cx="13" cy="-70" r="5.5" fill="#35304a" />
        </g>
      </g>
      <g transform="translate(300,200)">
        <path d="M-16,0 L-10,-34 L10,-34 L16,0 Z" fill="#2b2440" />
        <path d="M-13,-21 L13,-21 L14,-14 L-14,-14 Z" fill="#4f9e4a" />
        <circle cx="0" cy="-43" r="9" fill="#2b2440" />
        <rect x="-13" y="-51" width="26" height="4" rx="2" fill="#2b2440" />
        <g className="b02-arm b02-arm-e">
          <rect x="-14" y="-57" width="7" height="25" rx="3.5" fill="#2b2440" />
          <circle cx="-10.5" cy="-59" r="4.8" fill="#3a3252" />
        </g>
        <g className="b02-arm b02-arm-f">
          <rect x="7" y="-57" width="7" height="25" rx="3.5" fill="#2b2440" />
          <circle cx="10.5" cy="-59" r="4.8" fill="#3a3252" />
        </g>
      </g>

      <style>{`
        .b02-sun { transform-box: fill-box; transform-origin: 50% 100%; animation: b02-rise 9s ease-out infinite; }
        .b02-glow { transform-box: fill-box; transform-origin: 50% 100%; animation: b02-flood 9s ease-out infinite; }
        .b02-star-a { animation: b02-fade 9s ease-in-out infinite; }
        .b02-star-b { animation: b02-fade 9s ease-in-out -0.6s infinite; }
        .b02-star-c { animation: b02-fade 9s ease-in-out -1.2s infinite; }
        .b02-star-d { animation: b02-fade 9s ease-in-out -1.8s infinite; }
        .b02-star-e { animation: b02-fade 9s ease-in-out -2.4s infinite; }
        .b02-arm { transform-box: fill-box; transform-origin: 50% 100%; }
        .b02-arm-a { transform: rotate(-16deg); animation: b02-raise-l 4.5s ease-in-out infinite; }
        .b02-arm-b { transform: rotate(16deg); animation: b02-raise-r 4.5s ease-in-out infinite; }
        .b02-arm-c { transform: rotate(-14deg); animation: b02-raise-l 4.5s ease-in-out -0.6s infinite; }
        .b02-arm-d { transform: rotate(14deg); animation: b02-raise-r 4.5s ease-in-out -0.6s infinite; }
        .b02-arm-e { transform: rotate(-18deg); animation: b02-raise-l 4.5s ease-in-out -1.3s infinite; }
        .b02-arm-f { transform: rotate(18deg); animation: b02-raise-r 4.5s ease-in-out -1.3s infinite; }
        .b02-flag { transform-box: fill-box; transform-origin: 0% 50%; }
        .b02-flag-a { animation: b02-wave 3.2s ease-in-out infinite; }
        .b02-flag-b { animation: b02-wave 3.2s ease-in-out -1.6s infinite; }
        .b02-breath-a { transform: translate(112px, 150px); animation: b02-puff 3.6s ease-out infinite; }
        .b02-breath-b { transform: translate(316px, 152px); animation: b02-puff-b 4.2s ease-out -1.8s infinite; }
        .b02-breath-c { transform: translate(216px, 140px); animation: b02-puff-c 4.8s ease-out -3s infinite; }
        @keyframes b02-rise {
          0% { transform: translateY(54px) scale(0.9); opacity: 0.35; }
          12% { opacity: 1; }
          70%, 88% { transform: translateY(0px) scale(1); opacity: 1; }
          100% { transform: translateY(-8px) scale(1); opacity: 0; }
        }
        @keyframes b02-flood {
          0% { transform: translateY(54px) scale(0.5); opacity: 0.08; }
          70%, 88% { transform: translateY(0px) scale(1); opacity: 0.3; }
          100% { transform: translateY(-8px) scale(1.1); opacity: 0; }
        }
        @keyframes b02-fade {
          0%, 10% { opacity: 0.95; }
          60%, 90% { opacity: 0.1; }
          100% { opacity: 0.95; }
        }
        @keyframes b02-raise-l {
          0%, 100% { transform: rotate(-16deg); }
          50% { transform: rotate(-34deg); }
        }
        @keyframes b02-raise-r {
          0%, 100% { transform: rotate(16deg); }
          50% { transform: rotate(34deg); }
        }
        @keyframes b02-wave {
          0%, 100% { transform: skewY(-5deg) scaleX(0.94); }
          50% { transform: skewY(5deg) scaleX(1); }
        }
        @keyframes b02-puff {
          0% { transform: translate(112px, 156px) scale(0.3); opacity: 0; }
          25% { opacity: 0.7; }
          100% { transform: translate(104px, 126px) scale(1.5); opacity: 0; }
        }
        @keyframes b02-puff-b {
          0% { transform: translate(316px, 158px) scale(0.3); opacity: 0; }
          25% { opacity: 0.7; }
          100% { transform: translate(326px, 128px) scale(1.5); opacity: 0; }
        }
        @keyframes b02-puff-c {
          0% { transform: translate(224px, 148px) scale(0.3); opacity: 0; }
          25% { opacity: 0.6; }
          100% { transform: translate(232px, 118px) scale(1.5); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .b02-sun, .b02-glow,
          .b02-star-a, .b02-star-b, .b02-star-c, .b02-star-d, .b02-star-e,
          .b02-arm-a, .b02-arm-b, .b02-arm-c, .b02-arm-d, .b02-arm-e, .b02-arm-f,
          .b02-flag-a, .b02-flag-b,
          .b02-breath-a, .b02-breath-b, .b02-breath-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
