/**
 * 12月。婚礼の季節。
 *
 * 楽隊と天幕と馬が何週間も先まで押さえられる。飾り馬の花婿が進み、
 * うしろの北の峰は雪に閉ざされて、山の町は静まりかえっている。
 */
export function India08() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冬の夕空 */}
      <rect width="400" height="210" fill="#47598c" />
      <g fill="#f5e2a8">
        <circle className="i08-star-a" cx="40" cy="20" r="2" />
        <circle className="i08-star-b" cx="118" cy="14" r="1.6" />
        <circle className="i08-star-c" cx="214" cy="24" r="2" />
      </g>

      {/* 閉ざされた北の峰 */}
      <path d="M-10,152 L40,60 L86,152 z" fill="#c3d0de" />
      <path d="M60,152 L112,44 L164,152 z" fill="#dbe4ee" />
      <path d="M140,152 L182,76 L224,152 z" fill="#b0c0d2" />
      <path d="M40,60 L26,86 L40,80 L52,90 L58,74 z" fill="#f6efe2" />
      <path d="M112,44 L96,74 L110,66 L124,78 L130,60 z" fill="#f6efe2" />

      {/* 静かな山の町 */}
      <g fill="#2f3a56">
        <rect x="18" y="134" width="26" height="18" />
        <rect x="48" y="140" width="20" height="12" />
        <rect x="78" y="130" width="24" height="22" />
        <rect x="112" y="138" width="18" height="14" />
        <path d="M14,134 L31,124 L48,134 z" />
        <path d="M74,130 L90,120 L106,130 z" />
      </g>
      <g fill="#f5b31c" opacity="0.8">
        <rect className="i08-win-a" x="24" y="140" width="6" height="7" />
        <rect x="84" y="136" width="6" height="7" />
      </g>

      {/* 通り */}
      <rect y="152" width="400" height="58" fill="#6b5a48" />
      <rect y="152" width="400" height="4" fill="#54452f" />

      {/* 天幕(シャミヤーナ) */}
      <rect x="262" y="84" width="8" height="98" fill="#7a6a58" />
      <rect x="386" y="84" width="8" height="98" fill="#7a6a58" />
      <g>
        <rect x="248" y="64" width="152" height="22" fill="#f0e6d2" />
        <g fill="#c93a3a">
          <rect x="248" y="64" width="19" height="22" />
          <rect x="286" y="64" width="19" height="22" />
          <rect x="324" y="64" width="19" height="22" />
          <rect x="362" y="64" width="19" height="22" />
        </g>
        <g className="i08-frill" fill="#f5b31c">
          <circle cx="256" cy="88" r="7" />
          <circle cx="272" cy="88" r="7" />
          <circle cx="288" cy="88" r="7" />
          <circle cx="304" cy="88" r="7" />
          <circle cx="320" cy="88" r="7" />
          <circle cx="336" cy="88" r="7" />
          <circle cx="352" cy="88" r="7" />
          <circle cx="368" cy="88" r="7" />
          <circle cx="384" cy="88" r="7" />
          <circle cx="398" cy="88" r="7" />
        </g>
      </g>
      <g fill="#f5e2a8">
        <circle className="i08-bulb-a" cx="278" cy="102" r="3.5" />
        <circle className="i08-bulb-b" cx="308" cy="106" r="3.5" />
        <circle className="i08-bulb-c" cx="338" cy="106" r="3.5" />
        <circle className="i08-bulb-d" cx="368" cy="102" r="3.5" />
      </g>
      <path d="M266,98 Q330,116 390,98" fill="none" stroke="#4a4030" strokeWidth="2" />

      {/* 楽隊 */}
      <g className="i08-drummer">
        <rect x="34" y="166" width="8" height="18" fill="#3a3348" />
        <rect x="46" y="166" width="8" height="18" fill="#3a3348" />
        <rect x="32" y="136" width="24" height="34" rx="7" fill="#b5342f" />
        <rect x="32" y="146" width="24" height="4" fill="#f5b31c" />
        <circle cx="44" cy="128" r="11" fill="#c08a5a" />
        <path d="M33,126 a11,11 0 0 1 22,0 l0,4 -22,0 z" fill="#f5b31c" />
        <rect x="22" y="152" width="44" height="20" rx="4" fill="#f0e6d2" />
        <rect x="22" y="152" width="44" height="20" rx="4" fill="none" stroke="#b5342f" strokeWidth="3" />
        <rect className="i08-stick-a" x="8" y="142" width="20" height="4" rx="2" fill="#6b4a2a" />
        <rect className="i08-stick-b" x="60" y="142" width="20" height="4" rx="2" fill="#6b4a2a" />
      </g>
      <g className="i08-horn">
        <rect x="98" y="166" width="8" height="18" fill="#3a3348" />
        <rect x="110" y="166" width="8" height="18" fill="#3a3348" />
        <rect x="96" y="136" width="24" height="34" rx="7" fill="#b5342f" />
        <rect x="96" y="146" width="24" height="4" fill="#f5b31c" />
        <circle cx="108" cy="128" r="11" fill="#f6efe2" />
        <path d="M97,126 a11,11 0 0 1 22,0 l0,4 -22,0 z" fill="#f5b31c" />
        <g className="i08-brass" fill="#f5b31c">
          <rect x="116" y="128" width="30" height="6" rx="3" />
          <path d="M144,120 L156,114 L156,148 L144,142 z" />
        </g>
      </g>

      {/* 飾り馬と花婿 */}
      <g className="i08-baraat">
        <g fill="#e0d5c0">
          <rect className="i08-leg-a" x="152" y="156" width="9" height="28" rx="4" />
          <rect className="i08-leg-b" x="176" y="156" width="9" height="28" rx="4" />
          <rect className="i08-leg-c" x="204" y="156" width="9" height="28" rx="4" />
          <rect className="i08-leg-d" x="226" y="156" width="9" height="28" rx="4" />
        </g>
        <ellipse cx="194" cy="148" rx="46" ry="22" fill="#f6efe2" />
        <path className="i08-tail" d="M150,138 q-18,10 -14,32" fill="none" stroke="#e0d5c0" strokeWidth="7" strokeLinecap="round" />
        <path d="M162,152 q32,14 64,0 l0,-14 -64,0 z" fill="#e8443f" />
        <g fill="#f5b31c">
          <circle cx="172" cy="158" r="3.5" />
          <circle cx="186" cy="162" r="3.5" />
          <circle cx="200" cy="162" r="3.5" />
          <circle cx="214" cy="158" r="3.5" />
        </g>
        <g className="i08-head">
          <rect x="228" y="112" width="16" height="34" rx="7" fill="#f6efe2" />
          <path d="M232,118 L262,110 L266,124 L238,132 z" fill="#f6efe2" />
          <path d="M230,110 l-2,-10 8,6 z" fill="#f6efe2" />
          <path d="M240,110 l2,-10 6,8 z" fill="#f6efe2" />
          <circle cx="252" cy="118" r="2.4" fill="#3a2a1a" />
          <rect x="230" y="112" width="18" height="6" rx="3" fill="#e8443f" />
          <g className="i08-plume">
            <rect x="232" y="92" width="5" height="14" fill="#c93a3a" />
            <circle cx="234" cy="90" r="7" fill="#f5b31c" />
          </g>
        </g>
        {/* 花婿 */}
        <rect x="184" y="106" width="24" height="34" rx="8" fill="#f0e6d2" />
        <rect x="200" y="130" width="12" height="26" rx="5" fill="#f0e6d2" />
        <circle cx="196" cy="98" r="12" fill="#c08a5a" />
        <circle cx="192" cy="98" r="1.8" fill="#3a2a1a" />
        <circle cx="201" cy="98" r="1.8" fill="#3a2a1a" />
        <path d="M190,104 q6,4 12,0" fill="none" stroke="#3a2a1a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M183,94 a13,13 0 0 1 26,0 l0,3 -26,0 z" fill="#f5b31c" />
        <rect x="183" y="88" width="26" height="4" fill="#c93a3a" />
        <circle cx="196" cy="78" r="5" fill="#f5b31c" />
        <rect x="194" y="80" width="4" height="8" fill="#e09a10" />
        <g className="i08-sehra" fill="#f5931c">
          <circle cx="186" cy="112" r="3.6" />
          <circle cx="188" cy="120" r="3.6" />
          <circle cx="194" cy="126" r="3.6" />
          <circle cx="202" cy="126" r="3.6" />
          <circle cx="207" cy="119" r="3.6" />
          <circle cx="209" cy="111" r="3.6" />
        </g>
      </g>

      {/* 峠の雪 */}
      <g fill="#f6efe2">
        <circle className="i08-snow-a" cx="30" cy="40" r="2.6" />
        <circle className="i08-snow-b" cx="72" cy="26" r="2.2" />
        <circle className="i08-snow-c" cx="110" cy="52" r="2.6" />
        <circle className="i08-snow-d" cx="150" cy="34" r="2.2" />
        <circle className="i08-snow-e" cx="192" cy="58" r="2.6" />
        <circle className="i08-snow-f" cx="56" cy="76" r="2.2" />
        <circle className="i08-snow-g" cx="134" cy="92" r="2.4" />
      </g>

      <style>{`
        .i08-baraat { animation: i08-march 1.4s ease-in-out infinite; }
        .i08-leg-a, .i08-leg-b, .i08-leg-c, .i08-leg-d {
          transform-box: fill-box;
          transform-origin: 50% 0;
          animation: i08-step 0.7s ease-in-out infinite;
        }
        .i08-leg-b { animation-delay: -0.35s; }
        .i08-leg-c { animation-delay: -0.35s; }
        .i08-head { transform-box: fill-box; transform-origin: 0 100%; animation: i08-nod 2.2s ease-in-out infinite; }
        .i08-plume { transform-box: fill-box; transform-origin: 50% 100%; animation: i08-bob 1.4s ease-in-out infinite; }
        .i08-tail { transform-box: fill-box; transform-origin: 100% 0; animation: i08-flick 2s ease-in-out infinite; }
        .i08-sehra { transform-box: fill-box; transform-origin: 50% 0; animation: i08-bob 1.8s ease-in-out infinite; }
        .i08-drummer { transform-box: fill-box; transform-origin: 50% 100%; animation: i08-bounce 0.7s ease-in-out infinite; }
        .i08-horn { transform-box: fill-box; transform-origin: 50% 100%; animation: i08-bounce 0.7s ease-in-out infinite; animation-delay: -0.35s; }
        .i08-stick-a { transform-box: fill-box; transform-origin: 100% 50%; animation: i08-beat 0.7s ease-in-out infinite; }
        .i08-stick-b { transform-box: fill-box; transform-origin: 0 50%; animation: i08-beat 0.7s ease-in-out infinite reverse; }
        .i08-brass { transform-box: fill-box; transform-origin: 0 50%; animation: i08-blow 1.4s ease-in-out infinite; }
        .i08-frill { transform-box: fill-box; transform-origin: 50% 0; animation: i08-ripple 2.6s ease-in-out infinite; }
        .i08-bulb-a { animation: i08-blink 1.4s steps(1, end) infinite; }
        .i08-bulb-b { animation: i08-blink 1.4s steps(1, end) infinite; animation-delay: -0.35s; }
        .i08-bulb-c { animation: i08-blink 1.4s steps(1, end) infinite; animation-delay: -0.7s; }
        .i08-bulb-d { animation: i08-blink 1.4s steps(1, end) infinite; animation-delay: -1.05s; }
        .i08-win-a { animation: i08-blink 4s steps(1, end) infinite; }
        .i08-star-a { animation: i08-twinkle 2.6s ease-in-out infinite; }
        .i08-star-b { animation: i08-twinkle 3.2s ease-in-out infinite; animation-delay: -1.1s; }
        .i08-star-c { animation: i08-twinkle 2.9s ease-in-out infinite; animation-delay: -1.9s; }
        .i08-snow-a { animation: i08-fall 6s linear infinite; }
        .i08-snow-b { animation: i08-fall 7.2s linear infinite; animation-delay: -2.4s; }
        .i08-snow-c { animation: i08-fall 6.6s linear infinite; animation-delay: -4s; }
        .i08-snow-d { animation: i08-fall 7.8s linear infinite; animation-delay: -1.2s; }
        .i08-snow-e { animation: i08-fall 6.2s linear infinite; animation-delay: -5s; }
        .i08-snow-f { animation: i08-fall 8.4s linear infinite; animation-delay: -3.2s; }
        .i08-snow-g { animation: i08-fall 7s linear infinite; animation-delay: -6s; }
        @keyframes i08-march {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-5px, -3px); }
        }
        @keyframes i08-step {
          0%, 100% { transform: rotate(14deg); }
          50% { transform: rotate(-14deg); }
        }
        @keyframes i08-nod {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes i08-bob {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes i08-flick {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes i08-bounce {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -4px); }
        }
        @keyframes i08-beat {
          0%, 100% { transform: rotate(-28deg); }
          50% { transform: rotate(12deg); }
        }
        @keyframes i08-blow {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-4deg) scale(1.06); }
        }
        @keyframes i08-ripple {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.25); }
        }
        @keyframes i08-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.25; }
        }
        @keyframes i08-twinkle {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        @keyframes i08-fall {
          0% { transform: translate(0, -30px); opacity: 0; }
          16%, 84% { opacity: 0.95; }
          100% { transform: translate(-18px, 110px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .i08-baraat, .i08-leg-a, .i08-leg-b, .i08-leg-c, .i08-leg-d,
          .i08-head, .i08-plume, .i08-tail, .i08-sehra,
          .i08-drummer, .i08-horn, .i08-stick-a, .i08-stick-b, .i08-brass,
          .i08-frill, .i08-bulb-a, .i08-bulb-b, .i08-bulb-c, .i08-bulb-d,
          .i08-win-a, .i08-star-a, .i08-star-b, .i08-star-c,
          .i08-snow-a, .i08-snow-b, .i08-snow-c, .i08-snow-d,
          .i08-snow-e, .i08-snow-f, .i08-snow-g { animation: none; }
        }
      `}</style>
    </svg>
  );
}
