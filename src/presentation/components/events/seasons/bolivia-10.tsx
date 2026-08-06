/**
 * ボリビア 2月 — オルロのカーニバル。
 *
 * 4万人の踊り手と1万人の楽隊が4キロの坂道を20時間降りつづける。先頭は悪魔(ディアブラーダ)。
 * 手前の大きな悪魔の面が跳ね、後ろに小さな悪魔と金管の列が続き、紙吹雪が降りやまない。
 */
export function Bolivia10() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* オルロの空と街 */}
      <rect width="400" height="210" fill="#5aa6dc" />
      <g fill="#b8785a">
        <rect x="0" y="34" width="72" height="94" />
        <rect x="76" y="48" width="58" height="80" />
        <rect x="138" y="28" width="66" height="100" />
        <rect x="208" y="46" width="54" height="82" />
        <rect x="266" y="32" width="70" height="96" />
        <rect x="340" y="50" width="60" height="78" />
      </g>
      <g fill="#8f5a42">
        <rect x="0" y="34" width="72" height="7" />
        <rect x="76" y="48" width="58" height="7" />
        <rect x="138" y="28" width="66" height="7" />
        <rect x="208" y="46" width="54" height="7" />
        <rect x="266" y="32" width="70" height="7" />
        <rect x="340" y="50" width="60" height="7" />
      </g>
      <g fill="#5f3b2c">
        <rect x="14" y="52" width="12" height="16" />
        <rect x="42" y="52" width="12" height="16" />
        <rect x="92" y="64" width="12" height="16" />
        <rect x="154" y="46" width="12" height="16" />
        <rect x="182" y="46" width="12" height="16" />
        <rect x="224" y="62" width="12" height="16" />
        <rect x="284" y="50" width="12" height="16" />
        <rect x="312" y="50" width="12" height="16" />
        <rect x="356" y="66" width="12" height="16" />
      </g>

      {/* バルコニーの紙テープ */}
      <g fill="none" strokeWidth="4" strokeLinecap="round">
        <path className="oruro-streamer-a" d="M30,70 C38,84 24,94 32,108" stroke="#f5b31c" />
        <path className="oruro-streamer-b" d="M168,64 C176,78 162,88 170,102" stroke="#e8443f" />
        <path className="oruro-streamer-c" d="M300,68 C308,82 294,92 302,106" stroke="#4f9e4a" />
        <path className="oruro-streamer-a" d="M370,84 C378,96 364,104 372,116" stroke="#5b8fe8" />
      </g>

      {/* 沿道の見物人 */}
      <g>
        <rect y="112" width="400" height="26" fill="#3f4a5e" />
        <g className="oruro-crowd-a" fill="#2f3949">
          <circle cx="14" cy="112" r="9" />
          <circle cx="46" cy="114" r="8" />
          <circle cx="78" cy="111" r="9" />
          <circle cx="110" cy="114" r="8" />
        </g>
        <g className="oruro-crowd-b" fill="#2f3949">
          <circle cx="142" cy="112" r="9" />
          <circle cx="174" cy="114" r="8" />
          <circle cx="206" cy="111" r="9" />
          <circle cx="238" cy="114" r="8" />
        </g>
        <g className="oruro-crowd-c" fill="#2f3949">
          <circle cx="270" cy="112" r="9" />
          <circle cx="302" cy="114" r="8" />
          <circle cx="334" cy="111" r="9" />
          <circle cx="366" cy="114" r="8" />
          <circle cx="394" cy="113" r="8" />
        </g>
      </g>

      {/* 通り */}
      <rect y="134" width="400" height="76" fill="#7d7268" />
      <rect y="134" width="400" height="6" fill="#6a6058" />

      {/* 楽隊(いちばん奥) */}
      <g transform="translate(346,172) scale(0.5)">
        <g className="oruro-band-a">
          <rect x="-16" y="-46" width="32" height="46" rx="7" fill="#2a3550" />
          <circle cx="0" cy="-58" r="13" fill="#c98a5e" />
          <rect x="-16" y="-70" width="32" height="7" rx="3" fill="#2a3550" />
          <circle cx="26" cy="-34" r="24" fill="none" stroke="#f5b31c" strokeWidth="9" />
          <rect x="6" y="-56" width="10" height="26" rx="4" fill="#f5b31c" />
          <circle cx="26" cy="-56" r="13" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(298,178) scale(0.58)">
        <g className="oruro-band-b">
          <rect x="-16" y="-46" width="32" height="46" rx="7" fill="#2a3550" />
          <circle cx="0" cy="-58" r="13" fill="#e8c39e" />
          <rect x="-16" y="-70" width="32" height="7" rx="3" fill="#2a3550" />
          <circle cx="0" cy="-24" r="22" fill="#f6efe2" stroke="#c0392b" strokeWidth="5" />
          <rect className="oruro-stick" x="14" y="-44" width="26" height="6" rx="3" fill="#d8b98a" />
        </g>
      </g>

      {/* 後ろに続く踊り手 */}
      <g transform="translate(238,186) scale(0.5)">
        <g className="oruro-dancer-b">
          <path d="M-40,-96 L40,-96 L56,-8 L-56,-8z" fill="#2f7a4a" />
          <rect x="-26" y="-86" width="52" height="56" rx="8" fill="#c0392b" />
          <rect x="-22" y="-14" width="16" height="20" rx="4" fill="#f5b31c" />
          <rect x="6" y="-14" width="16" height="20" rx="4" fill="#f5b31c" />
          <path d="M-22,-116 C-38,-122 -47,-132 -45,-144 C-38,-134 -26,-128 -8,-128z" fill="#f5b31c" />
          <path d="M22,-116 C38,-122 47,-132 45,-144 C38,-134 26,-128 8,-128z" fill="#f5b31c" />
          <ellipse cx="0" cy="-108" rx="27" ry="25" fill="#e8443f" />
          <path d="M-25,-127 L-3,-118 L-3,-113 L-24,-119z" fill="#8f2820" />
          <path d="M25,-127 L3,-118 L3,-113 L24,-119z" fill="#8f2820" />
          <circle cx="-11" cy="-110" r="9" fill="#f6efe2" />
          <circle cx="11" cy="-110" r="9" fill="#f6efe2" />
          <circle cx="-11" cy="-110" r="4.5" fill="#2a2028" />
          <circle cx="11" cy="-110" r="4.5" fill="#2a2028" />
          <path d="M-16,-95 q16,15 32,0z" fill="#f6efe2" />
        </g>
      </g>
      <g transform="translate(174,194) scale(0.66)">
        <g className="oruro-dancer-c">
          <path d="M-40,-96 L40,-96 L56,-8 L-56,-8z" fill="#3b5fb8" />
          <rect x="-26" y="-86" width="52" height="56" rx="8" fill="#f5b31c" />
          <rect x="-22" y="-14" width="16" height="20" rx="4" fill="#f6efe2" />
          <rect x="6" y="-14" width="16" height="20" rx="4" fill="#f6efe2" />
          <path d="M-22,-116 C-38,-122 -47,-132 -45,-144 C-38,-134 -26,-128 -8,-128z" fill="#f5b31c" />
          <path d="M22,-116 C38,-122 47,-132 45,-144 C38,-134 26,-128 8,-128z" fill="#f5b31c" />
          <ellipse cx="0" cy="-108" rx="27" ry="25" fill="#e8443f" />
          <path d="M-25,-127 L-3,-118 L-3,-113 L-24,-119z" fill="#8f2820" />
          <path d="M25,-127 L3,-118 L3,-113 L24,-119z" fill="#8f2820" />
          <circle cx="-11" cy="-110" r="9" fill="#f6efe2" />
          <circle cx="11" cy="-110" r="9" fill="#f6efe2" />
          <circle cx="-11" cy="-110" r="4.5" fill="#2a2028" />
          <circle cx="11" cy="-110" r="4.5" fill="#2a2028" />
          <path d="M-16,-95 q16,15 32,0z" fill="#f6efe2" />
        </g>
      </g>

      {/* 先頭の悪魔 */}
      <g transform="translate(84,204)">
        <g className="oruro-devil">
          {/* マント */}
          <g className="oruro-cape">
            <path d="M-36,-96 L36,-96 L58,-14 L-58,-14z" fill="#2f7a4a" />
            <path d="M-58,-14 L58,-14 L56,-22 L-56,-22z" fill="#f5b31c" />
          </g>
          {/* 脚と長靴 */}
          <rect x="-20" y="-42" width="14" height="30" fill="#f6efe2" />
          <rect x="8" y="-42" width="14" height="30" fill="#f6efe2" />
          <rect x="-24" y="-14" width="20" height="14" rx="4" fill="#f5b31c" />
          <rect x="6" y="-14" width="20" height="14" rx="4" fill="#f5b31c" />
          {/* 胴 */}
          <rect x="-24" y="-80" width="48" height="44" rx="8" fill="#c0392b" />
          <rect x="-20" y="-74" width="40" height="12" rx="3" fill="#f5b31c" />
          <circle cx="-10" cy="-52" r="5" fill="#f5b31c" />
          <circle cx="10" cy="-52" r="5" fill="#f5b31c" />
          {/* 腕 */}
          <rect className="oruro-arm-a" x="-46" y="-80" width="24" height="11" rx="5.5" fill="#c0392b" />
          <rect className="oruro-arm-b" x="22" y="-80" width="24" height="11" rx="5.5" fill="#c0392b" />
          {/* 面 */}
          <g className="oruro-mask">
            {/* ねじれた角 */}
            <path d="M-22,-108 C-38,-114 -47,-124 -45,-136 C-38,-126 -26,-120 -8,-120z" fill="#f5b31c" />
            <path d="M22,-108 C38,-114 47,-124 45,-136 C38,-126 26,-120 8,-120z" fill="#f5b31c" />
            <g stroke="#c07f0c" strokeWidth="2" fill="none" strokeLinecap="round">
              <path d="M-35,-115 L-27,-123" />
              <path d="M-41,-122 L-34,-129" />
              <path d="M35,-115 L27,-123" />
              <path d="M41,-122 L34,-129" />
            </g>
            {/* 竜の飾り */}
            <path d="M-11,-127 q6,-14 11,-6 q5,-10 11,4 q-11,-3 -22,2z" fill="#4f9e4a" />
            {/* 顔 */}
            <ellipse cx="0" cy="-100" rx="27" ry="25" fill="#e8443f" />
            <path d="M-25,-119 L-3,-110 L-3,-105 L-24,-111z" fill="#8f2820" />
            <path d="M25,-119 L3,-110 L3,-105 L24,-111z" fill="#8f2820" />
            <circle cx="-11" cy="-102" r="9" fill="#f6efe2" />
            <circle cx="11" cy="-102" r="9" fill="#f6efe2" />
            <circle cx="-11" cy="-102" r="4.5" fill="#2a2028" />
            <circle cx="11" cy="-102" r="4.5" fill="#2a2028" />
            <path d="M-4,-94 L4,-94 L0,-88z" fill="#8f2820" />
            <path d="M-17,-87 q17,15 34,0z" fill="#f6efe2" />
            <path d="M-14,-87 L-10,-79 L-6,-87z" fill="#c0392b" />
            <path d="M-3,-87 L1,-77 L5,-87z" fill="#c0392b" />
            <path d="M8,-87 L12,-79 L16,-87z" fill="#c0392b" />
          </g>
        </g>
      </g>

      {/* 紙吹雪 */}
      <g>
        <rect className="oruro-confetti-a" x="26" y="20" width="8" height="8" rx="1" fill="#f5b31c" />
        <rect className="oruro-confetti-b" x="74" y="46" width="7" height="7" rx="1" fill="#e8443f" />
        <rect className="oruro-confetti-c" x="122" y="14" width="8" height="8" rx="1" fill="#5bc8e8" />
        <rect className="oruro-confetti-d" x="176" y="54" width="7" height="7" rx="1" fill="#f6efe2" />
        <rect className="oruro-confetti-e" x="222" y="22" width="8" height="8" rx="1" fill="#4f9e4a" />
        <rect className="oruro-confetti-f" x="270" y="50" width="7" height="7" rx="1" fill="#f5b31c" />
        <rect className="oruro-confetti-g" x="318" y="16" width="8" height="8" rx="1" fill="#e8443f" />
        <rect className="oruro-confetti-h" x="366" y="44" width="7" height="7" rx="1" fill="#5bc8e8" />
        <rect className="oruro-confetti-b" x="52" y="82" width="7" height="7" rx="1" fill="#4f9e4a" />
        <rect className="oruro-confetti-d" x="200" y="88" width="8" height="8" rx="1" fill="#f5b31c" />
        <rect className="oruro-confetti-f" x="344" y="86" width="7" height="7" rx="1" fill="#f6efe2" />
      </g>

      <style>{`
        .oruro-devil {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oruro-stomp 0.72s ease-in-out infinite;
        }
        .oruro-mask {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oruro-toss 1.44s ease-in-out infinite;
        }
        .oruro-cape {
          transform-box: fill-box;
          transform-origin: 50% 0;
          animation: oruro-swirl 1.44s ease-in-out infinite;
        }
        .oruro-arm-a {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: oruro-wave 0.72s ease-in-out infinite;
        }
        .oruro-arm-b {
          transform-box: fill-box;
          transform-origin: 0 50%;
          animation: oruro-wave 0.72s ease-in-out infinite reverse;
        }
        .oruro-dancer-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oruro-stomp 0.72s ease-in-out infinite;
          animation-delay: -0.24s;
        }
        .oruro-dancer-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oruro-stomp 0.72s ease-in-out infinite;
          animation-delay: -0.48s;
        }
        .oruro-band-a {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oruro-stomp 0.72s ease-in-out infinite;
          animation-delay: -0.36s;
        }
        .oruro-band-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oruro-stomp 0.72s ease-in-out infinite;
          animation-delay: -0.12s;
        }
        .oruro-stick {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: oruro-beat 0.72s ease-in-out infinite;
        }
        .oruro-crowd-a {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oruro-cheer 0.9s ease-in-out infinite;
        }
        .oruro-crowd-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oruro-cheer 0.9s ease-in-out infinite;
          animation-delay: -0.3s;
        }
        .oruro-crowd-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oruro-cheer 0.9s ease-in-out infinite;
          animation-delay: -0.6s;
        }
        .oruro-streamer-a { animation: oruro-sway 2.6s ease-in-out infinite; }
        .oruro-streamer-b { animation: oruro-sway 3.2s ease-in-out infinite; animation-delay: -1s; }
        .oruro-streamer-c { animation: oruro-sway 2.9s ease-in-out infinite; animation-delay: -1.8s; }
        .oruro-confetti-a, .oruro-confetti-b, .oruro-confetti-c, .oruro-confetti-d,
        .oruro-confetti-e, .oruro-confetti-f, .oruro-confetti-g, .oruro-confetti-h {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .oruro-confetti-a { animation: oruro-flutter 3.4s linear infinite; }
        .oruro-confetti-b { animation: oruro-flutter 4.2s linear infinite; animation-delay: -1.3s; }
        .oruro-confetti-c { animation: oruro-flutter 3.8s linear infinite; animation-delay: -2.4s; }
        .oruro-confetti-d { animation: oruro-flutter 4.6s linear infinite; animation-delay: -0.7s; }
        .oruro-confetti-e { animation: oruro-flutter 3.2s linear infinite; animation-delay: -2.9s; }
        .oruro-confetti-f { animation: oruro-flutter 4s linear infinite; animation-delay: -1.7s; }
        .oruro-confetti-g { animation: oruro-flutter 3.6s linear infinite; animation-delay: -3.3s; }
        .oruro-confetti-h { animation: oruro-flutter 4.4s linear infinite; animation-delay: -2.1s; }
        @keyframes oruro-stomp {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-9px) rotate(2deg); }
        }
        @keyframes oruro-toss {
          0%, 100% { transform: rotate(-7deg); }
          50% { transform: rotate(7deg); }
        }
        @keyframes oruro-swirl {
          0%, 100% { transform: skewX(7deg); }
          50% { transform: skewX(-7deg); }
        }
        @keyframes oruro-wave {
          0%, 100% { transform: rotate(-22deg); }
          50% { transform: rotate(16deg); }
        }
        @keyframes oruro-beat {
          0%, 100% { transform: rotate(-34deg); }
          50% { transform: rotate(12deg); }
        }
        @keyframes oruro-cheer {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes oruro-sway {
          0%, 100% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
        }
        @keyframes oruro-flutter {
          0% { transform: translate(0, -46px) rotate(0deg); opacity: 0; }
          10%, 86% { opacity: 1; }
          100% { transform: translate(-20px, 132px) rotate(320deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .oruro-devil, .oruro-mask, .oruro-cape, .oruro-arm-a, .oruro-arm-b,
          .oruro-dancer-b, .oruro-dancer-c, .oruro-band-a, .oruro-band-b, .oruro-stick,
          .oruro-crowd-a, .oruro-crowd-b, .oruro-crowd-c,
          .oruro-streamer-a, .oruro-streamer-b, .oruro-streamer-c,
          .oruro-confetti-a, .oruro-confetti-b, .oruro-confetti-c, .oruro-confetti-d,
          .oruro-confetti-e, .oruro-confetti-f, .oruro-confetti-g,
          .oruro-confetti-h { animation: none; }
        }
      `}</style>
    </svg>
  );
}
