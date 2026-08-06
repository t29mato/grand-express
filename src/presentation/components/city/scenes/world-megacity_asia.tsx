/**
 * アジアの巨大都市(東京、ソウル、香港など)に重ねる動き。
 *
 * 縦看板のネオンが上から下へ順に灯り、高架を走る車両の窓が明滅し、
 * 高層階の灯りが入れ替わって、夜空を航空灯がわたっていく。
 * ビル・看板・車両は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function WorldMegacityAsia() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 赤い縦看板(164,34)の文字が上から順に灯る */}
      <g fill="#fff2e0">
        <rect className="wmeg-neon wmeg-n1" x="167" y="39" width="7" height="4" opacity="0.5" />
        <rect className="wmeg-neon wmeg-n2" x="167" y="48" width="7" height="4" opacity="0.5" />
        <rect className="wmeg-neon wmeg-n3" x="167" y="57" width="7" height="4" opacity="0.5" />
        <rect className="wmeg-neon wmeg-n4" x="167" y="66" width="7" height="4" opacity="0.5" />
        <rect className="wmeg-neon wmeg-n5" x="167" y="75" width="7" height="4" opacity="0.5" />
        <rect className="wmeg-neon wmeg-n6" x="167" y="84" width="7" height="4" opacity="0.5" />
        <rect className="wmeg-neon wmeg-n7" x="167" y="93" width="7" height="4" opacity="0.5" />
        <rect className="wmeg-neon wmeg-n8" x="167" y="102" width="7" height="4" opacity="0.5" />
      </g>

      {/* 黄色い縦看板(180,46)の明滅 */}
      <g fill="#fff2e0">
        <rect className="wmeg-neon wmeg-m1" x="183" y="51" width="7" height="4" opacity="0.5" />
        <rect className="wmeg-neon wmeg-m2" x="183" y="60" width="7" height="4" opacity="0.5" />
        <rect className="wmeg-neon wmeg-m3" x="183" y="69" width="7" height="4" opacity="0.5" />
        <rect className="wmeg-neon wmeg-m4" x="183" y="78" width="7" height="4" opacity="0.5" />
      </g>

      {/* 看板そのものの光のにじみ */}
      <g>
        <rect className="wmeg-glow-a" x="164" y="34" width="13" height="74" fill="#ff6b60" opacity="0.24" />
        <rect className="wmeg-glow-b" x="180" y="46" width="13" height="56" fill="#ffd06a" opacity="0.22" />
      </g>

      {/* 高架の車両(96,126)の窓が流れるように明滅 */}
      <g fill="#eaf6ff">
        <rect className="wmeg-car wmeg-c1" x="106" y="132" width="22" height="11" opacity="0.5" />
        <rect className="wmeg-car wmeg-c2" x="134" y="132" width="22" height="11" opacity="0.5" />
        <rect className="wmeg-car wmeg-c3" x="162" y="132" width="22" height="11" opacity="0.5" />
        <rect className="wmeg-car wmeg-c4" x="190" y="132" width="22" height="11" opacity="0.5" />
      </g>

      {/* 高層階の灯り(静止画の窓 6x7 に重ねる) */}
      <g fill="#ffe6a0">
        <rect className="wmeg-win wmeg-w1" x="364" y="128" width="6" height="7" opacity="0.5" />
        <rect className="wmeg-win wmeg-w2" x="376" y="142" width="6" height="7" opacity="0.5" />
        <rect className="wmeg-win wmeg-w3" x="376" y="128" width="6" height="7" opacity="0.5" />
      </g>

      {/* 月(340,34)のにじみ */}
      <circle className="wmeg-moon" cx="340" cy="34" r="18" fill="#f2ede0" opacity="0.14" />

      {/* 夜空をわたる航空灯 */}
      <circle className="wmeg-plane" cx="0" cy="22" r="1.6" fill="#ff8a80" opacity="0.9" />

      <style>{`
        .wmeg-neon, .wmeg-glow-a, .wmeg-glow-b, .wmeg-car,
        .wmeg-win, .wmeg-moon, .wmeg-plane {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .wmeg-neon { animation: wmeg-blink 3.2s ease-in-out infinite; }
        .wmeg-n2 { animation-delay: -0.4s; }
        .wmeg-n3 { animation-delay: -0.8s; }
        .wmeg-n4 { animation-delay: -1.2s; }
        .wmeg-n5 { animation-delay: -1.6s; }
        .wmeg-n6 { animation-delay: -2s; }
        .wmeg-n7 { animation-delay: -2.4s; }
        .wmeg-n8 { animation-delay: -2.8s; }
        .wmeg-m1 { animation-duration: 2.4s; animation-delay: -0.3s; }
        .wmeg-m2 { animation-duration: 2.4s; animation-delay: -0.9s; }
        .wmeg-m3 { animation-duration: 2.4s; animation-delay: -1.5s; }
        .wmeg-m4 { animation-duration: 2.4s; animation-delay: -2.1s; }
        .wmeg-glow-a { animation: wmeg-hum 4.6s ease-in-out infinite; }
        .wmeg-glow-b { animation: wmeg-hum 5.8s ease-in-out infinite; animation-delay: -2.4s; }
        .wmeg-car { animation: wmeg-run 2.8s ease-in-out infinite; }
        .wmeg-c2 { animation-delay: -0.35s; }
        .wmeg-c3 { animation-delay: -0.7s; }
        .wmeg-c4 { animation-delay: -1.05s; }
        .wmeg-win { animation: wmeg-lamp 7.5s ease-in-out infinite; }
        .wmeg-w2 { animation-duration: 6s; animation-delay: -2.5s; }
        .wmeg-w3 { animation-duration: 9s; animation-delay: -4.5s; }
        .wmeg-moon { animation: wmeg-halo 12s ease-in-out infinite; }
        .wmeg-plane { transform-origin: 50% 50%; animation: wmeg-fly 34s linear infinite; }
        @keyframes wmeg-blink {
          0%, 100% { opacity: 0.14; }
          50% { opacity: 0.85; }
        }
        @keyframes wmeg-hum {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.36; }
        }
        @keyframes wmeg-run {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.75; }
        }
        @keyframes wmeg-lamp {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.6; }
        }
        @keyframes wmeg-halo {
          0%, 100% { transform: scale(0.85); opacity: 0.08; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }
        @keyframes wmeg-fly {
          0% { transform: translate(-20px, 0); opacity: 0; }
          8% { opacity: 0.9; }
          20%, 40%, 60%, 80% { opacity: 0.25; }
          30%, 50%, 70%, 90% { opacity: 0.9; }
          100% { transform: translate(420px, -14px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wmeg-neon, .wmeg-glow-a, .wmeg-glow-b, .wmeg-car,
          .wmeg-win, .wmeg-moon, .wmeg-plane { animation: none; }
        }
      `}</style>
    </svg>
  );
}
