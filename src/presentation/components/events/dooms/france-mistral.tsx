/**
 * ミストラル。ローヌの谷を吹き下ろす風が、屋根瓦を一枚ずつ剥がしていく。
 *
 * 屋根の面に丸瓦が並び、three枚が順に浮き上がって左へ飛ぶ。
 * 抜けたあとには暗い穴が残る。糸杉は風下へ傾ぎ、
 * 葺き直しの請求書が、まだ吹いているうちに飛んでくる。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function FranceMistral() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 吹きさらしの空 */}
      <rect width="400" height="210" fill="#2b3d52" />
      <rect width="400" height="58" fill="#223141" />

      {/* 風の筋 */}
      <g fill="#a8cfe4" opacity="0.3">
        <rect
          className="fmi-gust-a"
          x="240"
          y="18"
          width="150"
          height="5"
          rx="2.5"
        />
        <rect
          className="fmi-gust-b"
          x="240"
          y="40"
          width="110"
          height="4"
          rx="2"
        />
        <rect
          className="fmi-gust-c"
          x="240"
          y="60"
          width="170"
          height="5"
          rx="2.5"
        />
        <rect
          className="fmi-gust-d"
          x="240"
          y="96"
          width="130"
          height="4"
          rx="2"
        />
      </g>

      {/* 向こうの丘 */}
      <path
        d="M0,116 q60,-26 128,-8 q70,20 140,-6 q76,-28 132,10 l0,98 -400,0z"
        fill="#33452f"
      />

      {/* 風下へ傾ぐ糸杉 */}
      <g transform="translate(28,142)">
        <g className="fmi-cypress">
          <path d="M-14,0 q-4,-58 14,-94 q18,36 14,94z" fill="#223c29" />
          <path d="M-6,-30 q6,-24 8,-44 q4,22 4,44z" fill="#2e5136" />
          <rect x="-5" y="-8" width="10" height="16" fill="#3a2c1e" />
        </g>
      </g>

      {/* 母屋 */}
      <rect x="58" y="126" width="252" height="84" fill="#a8906f" />
      <rect x="58" y="126" width="252" height="8" fill="#8d7757" />
      <rect x="96" y="150" width="46" height="60" rx="3" fill="#3c3226" />
      <rect x="196" y="152" width="52" height="42" rx="3" fill="#26313d" />
      <rect
        x="202"
        y="158"
        width="40"
        height="30"
        fill="#f5b31c"
        opacity="0.55"
      />
      <rect x="218" y="152" width="6" height="42" fill="#3c3226" />

      {/* 屋根の面 */}
      <path d="M52,128 L110,72 L346,72 L376,128z" fill="#8a4a34" />
      <g stroke="#6f3928" strokeWidth="3" fill="none">
        <path d="M70,115 L352,115" />
        <path d="M86,100 L350,100" />
        <path d="M100,86 L348,86" />
      </g>

      {/* 剥がれた跡 */}
      <g fill="#4a2419">
        <rect x="118" y="76" width="22" height="10" rx="3" />
        <rect x="170" y="90" width="22" height="10" rx="3" />
        <rect x="150" y="104" width="22" height="10" rx="3" />
      </g>

      {/* まだ乗っている丸瓦 */}
      <g fill="#c4623c">
        <path d="M100,86 a11,8 0 0 1 22,0z" />
        <path d="M210,86 a11,8 0 0 1 22,0z" />
        <path d="M240,86 a11,8 0 0 1 22,0z" />
        <path d="M270,86 a11,8 0 0 1 22,0z" />
        <path d="M300,86 a11,8 0 0 1 22,0z" />
        <path d="M200,100 a11,8 0 0 1 22,0z" />
        <path d="M230,100 a11,8 0 0 1 22,0z" />
        <path d="M260,100 a11,8 0 0 1 22,0z" />
        <path d="M290,100 a11,8 0 0 1 22,0z" />
        <path d="M180,114 a11,8 0 0 1 22,0z" />
        <path d="M210,114 a11,8 0 0 1 22,0z" />
        <path d="M240,114 a11,8 0 0 1 22,0z" />
        <path d="M270,114 a11,8 0 0 1 22,0z" />
        <path d="M300,114 a11,8 0 0 1 22,0z" />
      </g>

      {/* 一枚ずつ浮いて飛んでいく瓦 */}
      <g transform="translate(130,80)">
        <g className="fmi-tile-a">
          <path d="M-11,4 a11,8 0 0 1 22,0z" fill="#d06f47" />
          <path d="M-11,4 l22,0 l0,3 -22,0z" fill="#a8502f" />
        </g>
      </g>
      <g transform="translate(182,94)">
        <g className="fmi-tile-b">
          <path d="M-11,4 a11,8 0 0 1 22,0z" fill="#d06f47" />
          <path d="M-11,4 l22,0 l0,3 -22,0z" fill="#a8502f" />
        </g>
      </g>
      <g transform="translate(162,108)">
        <g className="fmi-tile-c">
          <path d="M-11,4 a11,8 0 0 1 22,0z" fill="#d06f47" />
          <path d="M-11,4 l22,0 l0,3 -22,0z" fill="#a8502f" />
        </g>
      </g>

      {/* 舞い込む請求書 */}
      <g transform="translate(330,44)">
        <g className="fmi-bill">
          <rect x="-17" y="-22" width="34" height="44" rx="2" fill="#f6efe2" />
          <rect x="-11" y="-14" width="22" height="4" rx="2" fill="#9aa4ae" />
          <rect x="-11" y="-5" width="22" height="4" rx="2" fill="#9aa4ae" />
          <rect x="-11" y="6" width="15" height="6" rx="3" fill="#e05252" />
        </g>
      </g>

      <style>{`
        .fmi-gust-a { transform-box: fill-box; transform-origin: center; animation: fmi-blow 1.5s linear infinite; }
        .fmi-gust-b { transform-box: fill-box; transform-origin: center; animation: fmi-blow 1.9s linear infinite; animation-delay: -0.6s; }
        .fmi-gust-c { transform-box: fill-box; transform-origin: center; animation: fmi-blow 1.3s linear infinite; animation-delay: -0.9s; }
        .fmi-gust-d { transform-box: fill-box; transform-origin: center; animation: fmi-blow 1.7s linear infinite; animation-delay: -0.3s; }
        .fmi-cypress { transform-box: fill-box; transform-origin: 50% 100%; animation: fmi-bend 2.4s ease-in-out infinite; }
        .fmi-tile-a { transform-box: fill-box; transform-origin: center; animation: fmi-liftoff 4.2s ease-in infinite; }
        .fmi-tile-b { transform-box: fill-box; transform-origin: center; animation: fmi-liftoff 4.2s ease-in infinite; animation-delay: -1.4s; }
        .fmi-tile-c { transform-box: fill-box; transform-origin: center; animation: fmi-liftoff 4.2s ease-in infinite; animation-delay: -2.8s; }
        .fmi-bill { transform-box: fill-box; transform-origin: center; animation: fmi-flutter 4.2s ease-in-out infinite; }
        @keyframes fmi-blow {
          0% { transform: translate(170px, 0) scaleX(0.5); opacity: 0; }
          25%, 65% { opacity: 0.3; }
          100% { transform: translate(-300px, 0) scaleX(1.3); opacity: 0; }
        }
        @keyframes fmi-bend {
          0%, 100% { transform: rotate(-7deg); }
          50% { transform: rotate(-15deg); }
        }
        @keyframes fmi-liftoff {
          0%, 12% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          26% { transform: translate(-10px, -12px) rotate(-22deg); opacity: 1; }
          58% { transform: translate(-72px, -34px) rotate(-96deg); opacity: 1; }
          88%, 100% { transform: translate(-150px, -18px) rotate(-186deg); opacity: 0; }
        }
        @keyframes fmi-flutter {
          0% { transform: translate(84px, -22px) rotate(24deg); opacity: 0; }
          18% { opacity: 1; }
          40% { transform: translate(16px, 12px) rotate(-12deg); }
          62% { transform: translate(-14px, -4px) rotate(16deg); }
          84% { transform: translate(-40px, 22px) rotate(-8deg); opacity: 1; }
          100% { transform: translate(-70px, 40px) rotate(20deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fmi-gust-a, .fmi-gust-b, .fmi-gust-c, .fmi-gust-d, .fmi-cypress,
          .fmi-tile-a, .fmi-tile-b, .fmi-tile-c, .fmi-bill { animation: none; }
        }
      `}</style>
    </svg>
  );
}
