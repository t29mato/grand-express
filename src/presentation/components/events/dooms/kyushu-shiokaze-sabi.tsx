/**
 * 潮風が線路を錆びさせる。九州で海水から100km以上離れた場所はどこにもない。
 * 分岐器は白い塩の膜で詰まり、手でワイヤーブラシをかけるまで動かない。
 *
 * **分岐器の寄り**で見せる。人は**手袋の手だけ**。朝の海が背後にある。
 * 動くのは、往復するブラシと、風に飛ぶ塩の粒。
 */
export function KyushuShiokazeSabi() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 朝の空と海。 */}
      <rect width="400" height="210" fill="#8f8878" />
      <rect y="0" width="400" height="46" fill="#a8c8dc" />
      <rect y="34" width="400" height="16" fill="#cfdfe4" />
      <circle cx="336" cy="20" r="13" fill="#f8e0a0" />
      <g stroke="#4a4436" strokeWidth="1.6" fill="none" opacity="0.7">
        <path d="M60,18q4,-4 8,0q4,-4 8,0M96,28q3.4,-3.4 6.8,0q3.4,-3.4 6.8,0" />
      </g>
      <rect y="50" width="400" height="16" fill="#2f7396" />
      <rect y="62" width="400" height="12" fill="#3b83a6" />
      <g stroke="#bfe0f0" strokeWidth="2" opacity="0.55" fill="none">
        <path d="M20,56h60M250,54h80M40,68h50M280,70h90" />
      </g>
      {/* 波しぶき。塩はここから来る。 */}
      <path
        d="M0,72q40,-8 84,0t92,4q46,-6 96,0t128,-4v10H0z"
        fill="#e2f0f4"
        opacity="0.85"
      />

      {/* 護岸と、防風の松。 */}
      <rect y="78" width="400" height="12" fill="#a5a08c" />
      <g stroke="#847f6c" strokeWidth="1.2" fill="none">
        <path d="M0,84h400M40,78v12M120,78v12M200,78v12M280,78v12M360,78v12" />
      </g>
      <g>
        <path
          d="M356,78q-4,-14 2,-24"
          stroke="#5a4630"
          strokeWidth="3"
          fill="none"
        />
        <g fill="#2f6b42">
          <ellipse cx="358" cy="52" rx="16" ry="5" />
          <ellipse cx="346" cy="60" rx="12" ry="4" />
          <ellipse cx="372" cy="62" rx="11" ry="4" />
        </g>
      </g>

      {/* 路盤。 */}
      <rect y="90" width="400" height="120" fill="#8a8272" />
      <g fill="#9a9280" opacity="0.9">
        <circle cx="30" cy="180" r="4" />
        <circle cx="76" cy="196" r="3.4" />
        <circle cx="330" cy="186" r="4.4" />
        <circle cx="374" cy="200" r="3.6" />
        <circle cx="150" cy="200" r="3.4" />
      </g>

      {/* 枕木。 */}
      <g fill="#5a4a38">
        <rect x="0" y="108" width="400" height="9" />
        <rect x="0" y="134" width="400" height="10" />
        <rect x="0" y="164" width="400" height="11" />
        <rect x="0" y="196" width="400" height="12" />
      </g>

      {/* 分岐器。基本レールと、開いたトングレール。**地面と色を大きく離す。** */}
      <g stroke="#3a3d42" strokeWidth="8" fill="none" strokeLinecap="round">
        <path d="M-10,126h420" />
        <path d="M-10,178h420" />
      </g>
      <g stroke="#dfdcd2" strokeWidth="3.4" fill="none">
        <path d="M-10,122h420M-10,174h420" />
      </g>
      {/* 分岐して外れていくトングレール。 */}
      <g stroke="#3a3d42" strokeWidth="7" fill="none" strokeLinecap="round">
        <path d="M60,178q120,-4 340,-46" />
      </g>
      <g stroke="#dfdcd2" strokeWidth="2.8" fill="none">
        <path d="M60,174q120,-4 340,-46" />
      </g>
      {/* 転てつ棒とレバー。 */}
      <g fill="#5f6a74">
        <rect x="96" y="140" width="150" height="8" rx="3" />
        <rect x="88" y="130" width="18" height="30" rx="4" />
      </g>
      <rect x="90" y="112" width="7" height="22" fill="#5f6a74" />
      <circle cx="93" cy="110" r="6" fill="#e8443f" />

      {/* 塩の白い膜。**動かない。詰まっているのはこれ。**レールが読めるよう小ぶりにする。 */}
      <g fill="#f2f4f2" opacity="0.95">
        <ellipse cx="150" cy="144" rx="34" ry="7" />
        <ellipse cx="234" cy="150" rx="26" ry="6" />
        <ellipse cx="112" cy="130" rx="20" ry="5" />
        <ellipse cx="300" cy="160" rx="24" ry="5" />
      </g>
      <g fill="#dfe6e4" opacity="0.9">
        <circle cx="122" cy="138" r="3" />
        <circle cx="176" cy="150" r="2.6" />
        <circle cx="210" cy="144" r="2.4" />
        <circle cx="262" cy="156" r="3" />
      </g>
      {/* レールの頭に吹いた塩(白い筋)。 */}
      <g
        stroke="#f2f4f2"
        strokeWidth="3"
        opacity="0.95"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M40,122h56M180,122h44M96,174h50M250,174h64" />
      </g>
      {/* 錆(塩の下から出てきた色)。 */}
      <g fill="#a8543c" opacity="0.85">
        <ellipse cx="272" cy="126" rx="34" ry="4" />
        <ellipse cx="60" cy="150" rx="26" ry="4" />
      </g>

      {/* ワイヤーブラシと手袋の手。**ここが動く。** */}
      <g className="kss-brush">
        <rect x="180" y="160" width="56" height="12" rx="3" fill="#8a6a44" />
        <g stroke="#c9c0ac" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M186,172v9M194,172v10M202,172v9M210,172v10M218,172v9M226,172v10M232,172v9" />
        </g>
        {/* 手袋の手(顔は出さない)。 */}
        <path
          d="M212,160q-6,-16 6,-22q10,-5 18,2l12,10q4,4 0,8t-8,2z"
          fill="#f5b31c"
        />
        <path
          d="M216,142q8,-8 18,-2"
          stroke="#d99a10"
          strokeWidth="2.4"
          fill="none"
        />
        <rect
          x="230"
          y="126"
          width="26"
          height="14"
          rx="5"
          fill="#4a5a66"
          transform="rotate(-18 243 133)"
        />
      </g>

      {/* 風に飛ぶ塩の粒。 */}
      <g className="kss-salt-a" fill="#f2f4f2">
        <circle cx="0" cy="0" r="2.6" />
        <circle cx="14" cy="6" r="1.8" />
        <circle cx="26" cy="-4" r="2" />
      </g>
      <g className="kss-salt-b" fill="#e8eef0">
        <circle cx="0" cy="0" r="2.2" />
        <circle cx="16" cy="-6" r="1.6" />
        <circle cx="30" cy="4" r="2.4" />
      </g>

      <style>{`
        .kss-brush {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: kss-scrub 1.2s ease-in-out infinite;
        }
        @keyframes kss-scrub {
          0%, 100% { transform: translateX(-16px); }
          50%      { transform: translateX(16px); }
        }
        .kss-salt-a, .kss-salt-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .kss-salt-a { animation: kss-blow 4.2s linear infinite; }
        .kss-salt-b { animation: kss-blow 4.2s linear 2.1s infinite; }
        @keyframes kss-blow {
          0%   { transform: translate(20px, 96px); opacity: 0; }
          12%  { opacity: 0.95; }
          85%  { opacity: 0.95; }
          100% { transform: translate(390px, 74px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .kss-brush, .kss-salt-a, .kss-salt-b { animation: none; }
          .kss-salt-a { transform: translate(150px, 88px); transform-box: fill-box; opacity: 0.95; }
          .kss-salt-b { transform: translate(280px, 80px); transform-box: fill-box; opacity: 0.95; }
        }
      `}</style>
    </svg>
  );
}
