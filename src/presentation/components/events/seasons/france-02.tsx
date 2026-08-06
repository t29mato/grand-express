/**
 * 6月・どの通りにも音楽。
 *
 * 一年でいちばん長い夕暮れ。空はまだ明るいのに窓には灯りが入り、
 * 通りではアコーディオン弾きとギター弾きが勝手に演奏していて、
 * カフェのテラスは人で埋まっている。音符が屋根の上まで昇っていく。
 */
export function France02() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 暮れきらない空 */}
      <defs>
        <linearGradient id="f02-dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f5f96" />
          <stop offset="52%" stopColor="#7f7fb4" />
          <stop offset="100%" stopColor="#f0b878" />
        </linearGradient>
      </defs>
      <rect width="400" height="210" fill="url(#f02-dusk)" />

      {/* 早い星 */}
      <g fill="#fdf6e6">
        <circle className="f02-star" cx="52" cy="16" r="1.8" />
        <circle className="f02-star f02-star2" cx="150" cy="10" r="1.5" />
        <circle className="f02-star f02-star3" cx="336" cy="14" r="1.7" />
      </g>

      {/* 通りの建物と灯りの入った窓 */}
      <g fill="#3a3550">
        <rect x="-4" y="40" width="120" height="120" />
        <rect x="120" y="26" width="104" height="134" />
        <rect x="228" y="46" width="90" height="114" />
        <rect x="322" y="32" width="82" height="128" />
      </g>
      <g fill="#4a4463">
        <rect x="-4" y="40" width="120" height="6" />
        <rect x="120" y="26" width="104" height="6" />
        <rect x="228" y="46" width="90" height="6" />
        <rect x="322" y="32" width="82" height="6" />
      </g>
      <g fill="#f5cf6a">
        <rect className="f02-win" x="14" y="58" width="20" height="26" rx="2" />
        <rect className="f02-win f02-win2" x="62" y="58" width="20" height="26" rx="2" />
        <rect className="f02-win f02-win3" x="140" y="46" width="20" height="26" rx="2" />
        <rect className="f02-win f02-win4" x="184" y="46" width="20" height="26" rx="2" />
        <rect className="f02-win f02-win5" x="248" y="66" width="20" height="26" rx="2" />
        <rect className="f02-win f02-win6" x="286" y="66" width="20" height="26" rx="2" />
        <rect className="f02-win f02-win7" x="342" y="52" width="20" height="26" rx="2" />
        <rect className="f02-win f02-win8" x="14" y="104" width="20" height="26" rx="2" />
        <rect className="f02-win f02-win9" x="184" y="92" width="20" height="26" rx="2" />
        <rect className="f02-win f02-win10" x="342" y="98" width="20" height="26" rx="2" />
      </g>

      {/* カフェの日除け */}
      <g transform="translate(330,140)">
        <path d="M-46,0 L46,0 L38,-18 L-38,-18z" fill="#e8443f" />
        <path d="M-38,-18 L38,-18 L34,-26 L-34,-26z" fill="#c9302c" />
        <path d="M-46,0 q8,7 15,0 q8,7 15,0 q8,7 15,0 q8,7 15,0 q8,7 15,0" fill="#fdf6e6" opacity="0.85" />
      </g>

      {/* 通り */}
      <rect y="158" width="400" height="52" fill="#5a5468" />
      <rect y="158" width="400" height="5" fill="#736c85" />

      {/* アコーディオン弾き。蛇腹が伸び縮みする */}
      <g transform="translate(94,200)">
        <g className="f02-player">
          <path d="M-15,0 L-13,-30 L13,-30 L15,0z" fill="#37b3a4" />
          <circle cx="0" cy="-41" r="12" fill="#f6efe2" />
          <path d="M-12,-44 q12,-11 24,-1 q-3,-11 -12,-11 q-11,0 -12,12z" fill="#2a2233" />
          <g transform="translate(0,-24)">
            <rect x="-20" y="-8" width="7" height="20" rx="2" fill="#8a1f1c" />
            <g className="f02-bellows">
              <path d="M-13,-8 h26 v20 h-26z" fill="#e8443f" />
              <path d="M-9,-8 v20 M-4,-8 v20 M1,-8 v20 M6,-8 v20 M11,-8 v20" stroke="#a82823" strokeWidth="2" />
            </g>
            <rect x="13" y="-8" width="7" height="20" rx="2" fill="#8a1f1c" />
          </g>
        </g>
      </g>

      {/* ギター弾き。腕が弦をかき鳴らす */}
      <g transform="translate(180,202)">
        <g className="f02-player f02-player2">
          <path d="M-14,0 L-12,-28 L12,-28 L14,0z" fill="#f5b31c" />
          <circle cx="0" cy="-38" r="11" fill="#f6efe2" />
          <path d="M-11,-40 q11,-10 22,-1 q-3,-10 -11,-10 q-10,0 -11,11z" fill="#6b4326" />
          <g transform="translate(4,-18) rotate(-18)">
            <ellipse cx="0" cy="4" rx="12" ry="13" fill="#c9853a" />
            <ellipse cx="0" cy="-7" rx="9" ry="9" fill="#c9853a" />
            <circle cx="0" cy="2" r="4" fill="#5a3a1c" />
            <rect x="-2" y="-32" width="4" height="20" fill="#7a4a20" />
          </g>
          <path className="f02-strum" d="M8,-21 q6,3 7,8" stroke="#f6efe2" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* 太鼓を叩く人 */}
      <g transform="translate(258,202)">
        <g className="f02-player f02-player3">
          <path d="M-13,0 L-11,-26 L11,-26 L13,0z" fill="#5b8fe8" />
          <circle cx="0" cy="-36" r="10" fill="#f6efe2" />
          <path d="M-10,-39 q10,-9 20,0 q-2,-9 -10,-9 q-9,0 -10,9z" fill="#3b2f24" />
          <g transform="translate(-16,-10)">
            <rect x="-11" y="-8" width="22" height="16" rx="3" fill="#e0d4bd" />
            <rect x="-11" y="-8" width="22" height="4" rx="2" fill="#b9ab8e" />
          </g>
          <path className="f02-beat" d="M-6,-21 q-5,2 -6,6" stroke="#f6efe2" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* テラスの客 */}
      <g transform="translate(348,196)">
        <g className="f02-sitter">
          <circle cx="0" cy="-24" r="9" fill="#f6efe2" />
          <path d="M-11,0 L-9,-16 L9,-16 L11,0z" fill="#7bc86c" />
        </g>
        <rect x="-24" y="-14" width="4" height="14" fill="#3a3550" />
        <ellipse cx="-22" cy="-15" rx="10" ry="3" fill="#4a4463" />
      </g>

      {/* 昇っていく音符 */}
      <g fill="#fdf6e6">
        <g className="f02-note">
          <ellipse cx="118" cy="140" rx="6" ry="4.5" transform="rotate(-18 118 140)" />
          <rect x="122" y="123" width="3" height="18" />
        </g>
        <g className="f02-note f02-note2">
          <ellipse cx="204" cy="150" rx="5.5" ry="4" transform="rotate(-18 204 150)" />
          <rect x="207.5" y="134" width="3" height="17" />
          <path d="M210.5,134 q9,4 6,13 q1,-9 -6,-9z" />
        </g>
        <g className="f02-note f02-note3">
          <ellipse cx="278" cy="146" rx="6" ry="4.5" transform="rotate(-18 278 146)" />
          <rect x="282" y="129" width="3" height="18" />
        </g>
        <g className="f02-note f02-note4">
          <ellipse cx="66" cy="150" rx="5.5" ry="4" transform="rotate(-18 66 150)" />
          <rect x="69.5" y="134" width="3" height="17" />
          <path d="M72.5,134 q9,4 6,13 q1,-9 -6,-9z" />
        </g>
        <g className="f02-note f02-note5">
          <ellipse cx="322" cy="132" rx="6" ry="4.5" transform="rotate(-18 322 132)" />
          <rect x="326" y="115" width="3" height="18" />
        </g>
      </g>

      <style>{`
        .f02-star { animation: f02-twinkle 3.4s ease-in-out infinite; }
        .f02-star2 { animation-delay: 1.1s; }
        .f02-star3 { animation-delay: 2.2s; }
        .f02-win { animation: f02-lamp 5s ease-in-out infinite; }
        .f02-win2 { animation-delay: 0.5s; }
        .f02-win3 { animation-delay: 1s; }
        .f02-win4 { animation-delay: 1.5s; }
        .f02-win5 { animation-delay: 2s; }
        .f02-win6 { animation-delay: 2.5s; }
        .f02-win7 { animation-delay: 3s; }
        .f02-win8 { animation-delay: 3.5s; }
        .f02-win9 { animation-delay: 4s; }
        .f02-win10 { animation-delay: 4.5s; }
        .f02-player {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f02-groove 1.15s ease-in-out infinite;
        }
        .f02-player2 { animation-duration: 0.98s; animation-delay: 0.2s; }
        .f02-player3 { animation-duration: 1.3s; animation-delay: 0.45s; }
        .f02-bellows {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f02-squeeze 1.15s ease-in-out infinite;
        }
        .f02-strum {
          transform-box: fill-box; transform-origin: 0 0;
          animation: f02-pluck 0.49s ease-in-out infinite;
        }
        .f02-beat {
          transform-box: fill-box; transform-origin: 100% 0;
          animation: f02-tap 0.65s ease-in-out infinite;
        }
        .f02-sitter {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f02-lean 3.2s ease-in-out infinite;
        }
        .f02-note {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f02-rise 5.2s linear infinite;
        }
        .f02-note2 { animation-delay: 1s; animation-duration: 6s; }
        .f02-note3 { animation-delay: 2s; animation-duration: 4.6s; }
        .f02-note4 { animation-delay: 3s; animation-duration: 5.6s; }
        .f02-note5 { animation-delay: 4s; animation-duration: 5s; }
        @keyframes f02-twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes f02-lamp {
          0%, 100% { opacity: 0.72; }
          50% { opacity: 1; }
        }
        @keyframes f02-groove {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-4px) rotate(2deg); }
        }
        @keyframes f02-squeeze {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.55); }
        }
        @keyframes f02-pluck {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(14deg); }
        }
        @keyframes f02-tap {
          0%, 100% { transform: rotate(16deg); }
          50% { transform: rotate(-14deg); }
        }
        @keyframes f02-lean {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes f02-rise {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          14% { opacity: 0.95; }
          80% { opacity: 0.95; }
          100% { transform: translate(-26px, -128px) rotate(-22deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .f02-star, .f02-win, .f02-player, .f02-bellows, .f02-strum,
          .f02-beat, .f02-sitter, .f02-note { animation: none; }
        }
      `}</style>
    </svg>
  );
}
