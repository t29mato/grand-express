/**
 * 腹を空かせたニッセに化かされる。
 *
 * この盤面の厄災の神は**ニッセ**(農場を見守る小人。粥をもらえないとすねる)。
 * 残酷な存在ではないので、**すねて柵の杭に座り、空の粥椀に背を向けている**姿にした。
 * 旅人は同じ柵沿いをぐるぐる回っている。動くのは**輪を回る旅人と提灯・
 * ニッセのぶらぶらさせた足**だけ。
 * 止めた状態でも、輪になった足あと・空の椀・すねたニッセで何が起きたか分かる。
 */
export function NorwayNissespill() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 薄明の農場。 */}
      <rect width="400" height="210" fill="#26344a" />
      <rect y="0" width="400" height="82" fill="#1c2740" />
      <g fill="#e8eef4" opacity="0.7">
        <circle cx="46" cy="18" r="1.6" />
        <circle cx="122" cy="34" r="1.3" />
        <circle cx="204" cy="14" r="1.6" />
        <circle cx="288" cy="30" r="1.3" />
        <circle cx="352" cy="18" r="1.5" />
      </g>
      <circle cx="336" cy="42" r="20" fill="#cfe0ea" opacity="0.14" />
      <circle cx="336" cy="42" r="11" fill="#e8eef4" />

      {/* 遠景の森と納屋(中景)。 */}
      <path d="M0,104c46,-18 100,-24 152,-16l-8,16z" fill="#1a2b22" />
      <path d="M400,104c-44,-20 -98,-24 -150,-14l8,14z" fill="#16261e" />
      <g fill="#12201a">
        <path d="M24,106l10,-26 10,26z" />
        <path d="M48,108l9,-22 9,22z" />
        <path d="M72,104l10,-28 10,28z" />
        <path d="M320,106l10,-25 10,25z" />
        <path d="M344,109l9,-21 9,21z" />
        <path d="M368,104l10,-27 10,27z" />
      </g>
      <g>
        <rect x="232" y="70" width="88" height="38" fill="#6b2a24" />
        <path d="M226,70h100l-50,-24z" fill="#2a2f36" />
        <rect x="252" y="82" width="18" height="26" fill="#3a1f1a" />
        <rect x="286" y="80" width="16" height="14" fill="#f5b31c" />
        <circle cx="294" cy="87" r="14" fill="#f5b31c" opacity="0.14" />
      </g>

      {/* 雪の野。 */}
      <rect y="104" width="400" height="106" fill="#3f4f62" />
      <path d="M0,116c60,-8 130,-6 200,4c66,10 134,10 200,0v90H0z" fill="#4a5c70" />

      {/* ぐるぐる回った足あと(輪になっている)。 */}
      <g fill="#2f3d4e">
        <ellipse cx="120" cy="140" rx="7" ry="3.4" />
        <ellipse cx="160" cy="132" rx="7" ry="3.4" />
        <ellipse cx="204" cy="130" rx="7" ry="3.4" />
        <ellipse cx="248" cy="136" rx="7" ry="3.4" />
        <ellipse cx="282" cy="150" rx="7" ry="3.4" />
        <ellipse cx="296" cy="170" rx="7" ry="3.4" />
        <ellipse cx="272" cy="188" rx="7" ry="3.4" />
        <ellipse cx="226" cy="198" rx="7" ry="3.4" />
        <ellipse cx="178" cy="198" rx="7" ry="3.4" />
        <ellipse cx="136" cy="186" rx="7" ry="3.4" />
        <ellipse cx="112" cy="166" rx="7" ry="3.4" />
      </g>
      <ellipse
        cx="204"
        cy="164"
        rx="96"
        ry="36"
        fill="none"
        stroke="#354456"
        strokeWidth="3"
        strokeDasharray="9 11"
      />

      {/* 同じ柵がどこまでも続いているように見える(化かされている理由)。 */}
      <g fill="#4a3a2c">
        <rect x="150" y="112" width="5" height="26" />
        <rect x="196" y="110" width="5" height="26" />
        <rect x="242" y="112" width="5" height="26" />
        <rect x="288" y="116" width="5" height="26" />
        <rect x="334" y="120" width="5" height="26" />
        <rect x="380" y="124" width="5" height="26" />
      </g>
      <g fill="#5a4630">
        <path d="M150,118h236v4H150z" />
        <path d="M150,128h236v4H150z" />
      </g>

      {/* 輪を回る旅人と提灯。**ここが動く。** */}
      <g className="nns-walker">
        <ellipse cx="0" cy="14" rx="14" ry="4" fill="#000" opacity="0.2" />
        <rect x="-6" y="-4" width="5" height="16" fill="#2a2f38" />
        <rect x="1" y="-4" width="5" height="16" fill="#343a44" />
        <path d="M-9,-26h18l3,24h-24z" fill="#3f5f8f" />
        <circle cx="0" cy="-33" r="8" fill="#e8c8a8" />
        <path d="M-9,-34a9,9 0 0 1 18,0z" fill="#c0453c" />
        <circle cx="0" cy="-43" r="2.4" fill="#c0453c" />
        <path d="M9,-20l11,7" stroke="#3f5f8f" strokeWidth="4" strokeLinecap="round" fill="none" />
        <rect x="19" y="-14" width="2" height="7" fill="#3a3228" />
        <circle cx="20" cy="-2" r="6" fill="#f5b31c" />
        <circle cx="20" cy="-2" r="16" fill="#f5b31c" opacity="0.18" />
      </g>

      {/* すねたニッセ(厄災の神)と、空の粥椀。手前・左。 */}
      <g>
        <rect x="52" y="140" width="14" height="64" fill="#4a3a2c" />
        <path d="M46,140h26l-13,-10z" fill="#3a2c20" />
        <ellipse cx="59" cy="204" rx="24" ry="6" fill="#000" opacity="0.18" />
        {/* 体は杭の上。腕を組んですねている。 */}
        <path d="M40,140h38l5,-24h-48z" fill="#3f6b52" />
        <path d="M46,124h26l2,-8h-30z" fill="#355944" />
        <circle cx="59" cy="106" r="13" fill="#e8c8a8" />
        {/* 灰色のひげ。 */}
        <path d="M46,108c0,12 6,20 13,20s13,-8 13,-20c-4,6 -22,6 -26,0z" fill="#cfd4d8" />
        <path d="M48,110c0,9 5,15 11,15s11,-6 11,-15c-3,4 -19,4 -22,0z" fill="#e4e8ec" />
        {/* とんがり帽子。 */}
        <path d="M40,100L59,68l19,32z" fill="#c0453c" />
        <path d="M38,100h42v7H38z" fill="#a8352c" />
        <circle cx="59" cy="66" r="3.4" fill="#a8352c" />
        <g fill="#3a3228">
          <ellipse cx="54" cy="106" rx="1.6" ry="1.1" />
          <ellipse cx="65" cy="106" rx="1.6" ry="1.1" />
        </g>
        {/* 口はへの字(すねている)。 */}
        <path d="M54,114q5,-4 10,0" stroke="#8a6f5a" strokeWidth="1.6" fill="none" />
        {/* 組んだ腕。 */}
        <g stroke="#3f6b52" strokeWidth="7" strokeLinecap="round" fill="none">
          <path d="M42,130l22,-6" />
          <path d="M76,130l-22,-6" />
        </g>
        {/* ぶらぶらさせた足。**ここだけが動く。** */}
        <g className="nns-foot">
          <rect x="50" y="140" width="7" height="16" fill="#5a4630" />
          <path d="M48,154h13l2,6h-15z" fill="#3a2c20" />
        </g>
        {/* 空の粥椀(倒れている)。 */}
        <g transform="rotate(-22 26 190)">
          <path d="M10,182h32c-2,10 -6,15 -16,15s-14,-5 -16,-15z" fill="#c8c4b8" />
          <ellipse cx="26" cy="182" rx="16" ry="4.4" fill="#e8e4d8" />
          <ellipse cx="26" cy="182" rx="11" ry="2.6" fill="#a89f8c" />
        </g>
        <path d="M14,200h26l2,6H12z" fill="#3a4450" opacity="0.5" />
      </g>

      {/* 手前の雪だまり。 */}
      <g fill="#56687e">
        <ellipse cx="330" cy="200" rx="46" ry="12" />
        <ellipse cx="120" cy="206" rx="38" ry="10" />
      </g>

      <style>{`
        .nns-walker {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nns-loop 7s linear infinite;
        }
        @keyframes nns-loop {
          0%   { transform: translate(300px, 164px) scale(0.92); }
          25%  { transform: translate(204px, 128px) scale(0.74); }
          50%  { transform: translate(108px, 164px) scale(0.92); }
          75%  { transform: translate(204px, 200px) scale(1.1); }
          100% { transform: translate(300px, 164px) scale(0.92); }
        }
        .nns-foot {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: nns-kick 2.4s ease-in-out infinite;
        }
        @keyframes nns-kick {
          0%, 100% { transform: rotate(-16deg); }
          50%      { transform: rotate(18deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nns-walker, .nns-foot { animation: none; }
          .nns-walker {
            transform: translate(258px, 190px) scale(1.04);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
          .nns-foot {
            transform: rotate(14deg);
            transform-box: fill-box;
            transform-origin: 50% 0%;
          }
        }
      `}</style>
    </svg>
  );
}
