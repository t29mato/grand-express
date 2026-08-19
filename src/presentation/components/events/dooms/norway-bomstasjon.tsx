/**
 * 思わぬ通行料金所。
 *
 * 地図では無料に見えた橋やトンネルに、遮断機の無い自動料金所がある。
 * ナンバープレートを読み取られ、請求書は数週間後に手数料つきで郵送されてくる。
 * 動くのは**門型をくぐる車・読み取りのフラッシュ・遅れて舞い込む請求書**。
 * 止めた状態でも、門の下の車・光る読み取り機・手前の請求書で分かる。
 */
export function NorwayBomstasjon() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の空。 */}
      <rect width="400" height="210" fill="#8fa8c0" />
      <rect y="0" width="400" height="66" fill="#6b88a8" />
      <g fill="#c8b0a0" opacity="0.5">
        <ellipse cx="86" cy="24" rx="40" ry="10" />
        <ellipse cx="310" cy="16" rx="34" ry="9" />
      </g>

      {/* 遠景の丘とトンネルの坑口(中景)。 */}
      <path d="M0,106c50,-30 116,-36 172,-22l-10,22z" fill="#4a6b52" />
      <path d="M400,106c-46,-32 -108,-36 -164,-20l10,20z" fill="#3f5f48" />
      <g fill="#2a4a36">
        <path d="M30,110l9,-24 9,24z" />
        <path d="M56,112l8,-21 8,21z" />
        <path d="M336,110l9,-23 9,23z" />
        <path d="M362,113l8,-20 8,20z" />
      </g>
      <path d="M170,106V80a30,26 0 0 1 60,0v26z" fill="#6b6f76" />
      <path d="M176,106V82a24,20 0 0 1 48,0v24z" fill="#241f1c" />

      {/* 路面。 */}
      <rect y="106" width="400" height="104" fill="#4a4f55" />
      <path d="M156,106h88l86,104H70z" fill="#5a5f66" />
      <g fill="#f0ece0" opacity="0.85">
        <path d="M196,110h8l2,12h-12z" />
        <path d="M194,128h12l3,18h-18z" />
        <path d="M190,152h20l4,26h-28z" />
        <path d="M184,184h32l5,26h-42z" />
      </g>
      <g fill="#7a8072">
        <path d="M0,106h70l-70,84z" />
        <path d="M400,106h-70l70,84z" />
      </g>
      <g stroke="#3a3f45" strokeWidth="2.4" fill="none">
        <path d="M156,106L70,210M244,106L330,210" />
      </g>

      {/* 門型の料金所(中景・上)。遮断機は無い。 */}
      <g>
        <rect x="34" y="22" width="16" height="98" fill="#6b7078" />
        <rect x="350" y="22" width="16" height="98" fill="#6b7078" />
        <rect x="28" y="112" width="28" height="8" fill="#5f646e" />
        <rect x="344" y="112" width="28" height="8" fill="#5f646e" />
        <rect x="34" y="22" width="332" height="16" fill="#7a8088" />
        <rect x="34" y="38" width="332" height="5" fill="#5f646e" />
        <g stroke="#5f646e" strokeWidth="2" fill="none">
          <path d="M50,30h300" />
        </g>
        {/* 読み取り機とカメラ。 */}
        <g fill="#3a3f47">
          <rect x="128" y="43" width="30" height="16" rx="3" />
          <rect x="242" y="43" width="30" height="16" rx="3" />
          <rect x="182" y="43" width="36" height="20" rx="3" />
        </g>
        <g className="nbs-reader" fill="#5b8fe8">
          <rect x="134" y="47" width="18" height="7" rx="2" />
          <rect x="248" y="47" width="18" height="7" rx="2" />
        </g>
        <circle cx="200" cy="53" r="6" fill="#1c222b" />
        <circle cx="200" cy="53" r="2.6" fill="#7fb0d8" />
      </g>

      {/* フラッシュ。**ここが光る。** */}
      <g className="nbs-flash">
        <path d="M200,60L150,150h100z" fill="#f8f2d8" opacity="0.55" />
        <circle cx="200" cy="58" r="14" fill="#ffffff" opacity="0.8" />
      </g>

      {/* 門をくぐる車。**ここが動く。** */}
      <g className="nbs-car">
        <ellipse cx="200" cy="176" rx="56" ry="8" fill="#000" opacity="0.2" />
        <path d="M152,150h96l10,20h-116z" fill="#c0453c" />
        <path d="M166,150l10,-22h48l10,22z" fill="#a8352c" />
        <path d="M172,148l7,-16h42l7,16z" fill="#7fb0d8" />
        <rect x="142" y="164" width="116" height="14" rx="4" fill="#c0453c" />
        <rect x="142" y="172" width="116" height="6" fill="#8a2a24" />
        <g fill="#2f2a26">
          <circle cx="166" cy="180" r="10" />
          <circle cx="234" cy="180" r="10" />
        </g>
        <g fill="#8a8f96">
          <circle cx="166" cy="180" r="4" />
          <circle cx="234" cy="180" r="4" />
        </g>
        <g fill="#f8dc90">
          <rect x="146" y="162" width="12" height="7" rx="2" />
          <rect x="242" y="162" width="12" height="7" rx="2" />
        </g>
        {/* ナンバープレート(読み取られる側)。文字は描かない。 */}
        <rect x="182" y="176" width="36" height="12" rx="2" fill="#f4f2ea" />
        <rect x="182" y="176" width="8" height="12" fill="#2f5fa8" />
        <g fill="#3a3228">
          <rect x="194" y="180" width="4" height="5" />
          <rect x="201" y="180" width="4" height="5" />
          <rect x="208" y="180" width="4" height="5" />
        </g>
      </g>

      {/* 手前に舞い込む請求書。**遅れて届く。** */}
      <g className="nbs-bill">
        <rect x="0" y="0" width="86" height="58" rx="2" fill="#f4f2ea" />
        <rect x="0" y="0" width="86" height="10" fill="#c0453c" />
        <g fill="#a8a49a">
          <rect x="8" y="18" width="52" height="4" />
          <rect x="8" y="28" width="66" height="4" />
          <rect x="8" y="38" width="40" height="4" />
        </g>
        <g fill="#3a3228">
          <rect x="52" y="46" width="26" height="6" />
        </g>
        <path d="M0,58l86,-6v6z" fill="#dcd8cc" />
      </g>

      {/* 路肩に立つ標識(料金所であることを示す図形)。 */}
      <g>
        <rect x="332" y="130" width="6" height="46" fill="#5f646e" />
        <circle cx="335" cy="120" r="18" fill="#f4f2ea" />
        <circle cx="335" cy="120" r="18" fill="none" stroke="#c0453c" strokeWidth="5" />
        <g fill="#f5b31c">
          <circle cx="335" cy="120" r="9" />
        </g>
        <circle cx="335" cy="120" r="4" fill="#d8a03c" />
      </g>

      <style>{`
        .nbs-car {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nbs-drive 4.2s ease-in infinite;
        }
        @keyframes nbs-drive {
          0%   { transform: translate(0, -46px) scale(0.5); opacity: 0; }
          22%  { transform: translate(0, -30px) scale(0.66); opacity: 1; }
          62%  { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(0, 34px) scale(1.3); opacity: 1; }
        }
        .nbs-flash {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: nbs-snap 4.2s linear infinite;
        }
        @keyframes nbs-snap {
          0%, 40%, 52%, 100% { opacity: 0; }
          44%, 48%           { opacity: 1; }
        }
        .nbs-reader { animation: nbs-blink 1.4s ease-in-out infinite; }
        @keyframes nbs-blink {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
        .nbs-bill {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: nbs-post 4.2s ease-out infinite;
        }
        @keyframes nbs-post {
          0%, 55%  { transform: translate(-110px, 200px) rotate(-40deg); opacity: 0; }
          72%      { transform: translate(10px, 150px) rotate(-14deg); opacity: 1; }
          100%     { transform: translate(34px, 146px) rotate(-8deg); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nbs-car, .nbs-flash, .nbs-reader, .nbs-bill { animation: none; }
          .nbs-flash { opacity: 1; }
          .nbs-bill {
            transform: translate(34px, 146px) rotate(-8deg);
            transform-box: fill-box;
            transform-origin: 50% 50%;
          }
        }
      `}</style>
    </svg>
  );
}
