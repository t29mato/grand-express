/**
 * ツンドラ(レイキャヴィク、ムルマンスク、イエローナイフなど)に重ねる動き。
 *
 * オーロラの帳がゆっくり揺れ、星が瞬き、粉雪が斜めに降って、
 * 小屋の窓のランプがまたたく。
 * 空・雪原・小屋は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function WorldTundra() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* オーロラの帳(静止画の3本の帯のあいだに重ねる) */}
      <g fill="none" strokeLinecap="round">
        <path
          className="wtun-veil-a"
          d="M6,46q76,-34 148,-6t146,-20"
          stroke="#5fd8a8"
          strokeWidth="10"
          opacity="0.3"
        />
        <path
          className="wtun-veil-b"
          d="M0,64q84,-28 164,6t156,-18"
          stroke="#7fe8c8"
          strokeWidth="11"
          opacity="0.24"
        />
        <path
          className="wtun-veil-c"
          d="M30,28q94,-22 176,8t152,-16"
          stroke="#a8d8f4"
          strokeWidth="9"
          opacity="0.2"
        />
      </g>

      {/* 瞬く星 */}
      <g fill="#f6efe2">
        <circle className="wtun-star wtun-t1" cx="52" cy="12" r="1.3" opacity="0.8" />
        <circle className="wtun-star wtun-t2" cx="118" cy="24" r="1.1" opacity="0.7" />
        <circle className="wtun-star wtun-t3" cx="196" cy="46" r="1.4" opacity="0.8" />
        <circle className="wtun-star wtun-t4" cx="268" cy="16" r="1.1" opacity="0.7" />
        <circle className="wtun-star wtun-t5" cx="332" cy="34" r="1.3" opacity="0.75" />
        <circle className="wtun-star wtun-t6" cx="368" cy="60" r="1.1" opacity="0.7" />
        <circle className="wtun-star wtun-t7" cx="88" cy="70" r="1.2" opacity="0.7" />
        <circle className="wtun-star wtun-t8" cx="228" cy="66" r="1.1" opacity="0.65" />
      </g>

      {/* 小屋の窓(280,136)のランプ */}
      <rect className="wtun-lamp" x="280" y="136" width="14" height="12" fill="#ffd98a" opacity="0.5" />

      {/* 斜めに降る粉雪 */}
      <g fill="#f8fbfd">
        <circle className="wtun-flake wtun-k1" cx="40" cy="0" r="1.6" opacity="0.8" />
        <circle className="wtun-flake wtun-k2" cx="96" cy="0" r="1.3" opacity="0.7" />
        <circle className="wtun-flake wtun-k3" cx="152" cy="0" r="1.8" opacity="0.75" />
        <circle className="wtun-flake wtun-k4" cx="208" cy="0" r="1.4" opacity="0.7" />
        <circle className="wtun-flake wtun-k5" cx="264" cy="0" r="1.7" opacity="0.75" />
        <circle className="wtun-flake wtun-k6" cx="320" cy="0" r="1.3" opacity="0.65" />
        <circle className="wtun-flake wtun-k7" cx="372" cy="0" r="1.6" opacity="0.7" />
        <circle className="wtun-flake wtun-k8" cx="128" cy="0" r="1.1" opacity="0.6" />
        <circle className="wtun-flake wtun-k9" cx="296" cy="0" r="1.2" opacity="0.6" />
      </g>

      <style>{`
        .wtun-veil-a, .wtun-veil-b, .wtun-veil-c,
        .wtun-star, .wtun-lamp, .wtun-flake {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .wtun-veil-a { animation: wtun-wave-a 17s ease-in-out infinite; }
        .wtun-veil-b { animation: wtun-wave-b 23s ease-in-out infinite; animation-delay: -7s; }
        .wtun-veil-c { animation: wtun-wave-a 29s ease-in-out infinite; animation-delay: -13s; }
        .wtun-star { animation: wtun-twinkle 4.5s ease-in-out infinite; }
        .wtun-t2 { animation-duration: 3.4s; animation-delay: -1.2s; }
        .wtun-t3 { animation-duration: 5.6s; animation-delay: -2.6s; }
        .wtun-t4 { animation-duration: 4s; animation-delay: -0.8s; }
        .wtun-t5 { animation-duration: 6s; animation-delay: -3.4s; }
        .wtun-t6 { animation-duration: 3.8s; animation-delay: -2s; }
        .wtun-t7 { animation-duration: 5.2s; animation-delay: -4.1s; }
        .wtun-t8 { animation-duration: 4.4s; animation-delay: -1.7s; }
        .wtun-lamp { animation: wtun-flicker 5.5s ease-in-out infinite; }
        .wtun-flake { animation: wtun-fall 12s linear infinite; }
        .wtun-k1 { animation-duration: 14s; animation-delay: -3s; }
        .wtun-k2 { animation-duration: 17s; animation-delay: -8s; }
        .wtun-k3 { animation-duration: 13s; animation-delay: -12s; }
        .wtun-k4 { animation-duration: 16s; animation-delay: -5s; }
        .wtun-k5 { animation-duration: 11.5s; animation-delay: -9s; }
        .wtun-k6 { animation-duration: 18s; animation-delay: -14s; }
        .wtun-k7 { animation-duration: 13.5s; animation-delay: -6s; }
        .wtun-k8 { animation-duration: 19s; animation-delay: -16s; }
        .wtun-k9 { animation-duration: 15s; animation-delay: -2s; }
        @keyframes wtun-wave-a {
          0%, 100% { transform: translate(0, 0) scaleY(1); opacity: 0.14; }
          50% { transform: translate(10px, 6px) scaleY(1.45); opacity: 0.4; }
        }
        @keyframes wtun-wave-b {
          0%, 100% { transform: translate(0, 0) scaleY(1.2); opacity: 0.1; }
          50% { transform: translate(-12px, -5px) scaleY(0.8); opacity: 0.34; }
        }
        @keyframes wtun-twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.7); }
          50% { opacity: 0.95; transform: scale(1.3); }
        }
        @keyframes wtun-flicker {
          0%, 100% { opacity: 0.28; }
          40% { opacity: 0.72; }
          62% { opacity: 0.4; }
        }
        @keyframes wtun-fall {
          0% { transform: translate(0, -6px); opacity: 0; }
          10% { opacity: 0.75; }
          90% { opacity: 0.6; }
          100% { transform: translate(-34px, 216px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wtun-veil-a, .wtun-veil-b, .wtun-veil-c,
          .wtun-star, .wtun-lamp, .wtun-flake { animation: none; }
        }
      `}</style>
    </svg>
  );
}
