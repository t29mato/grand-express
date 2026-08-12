/**
 * 渋滞に午後まるごと飲み込まれる(マチェット)。バイクと車が隙間なく並び、
 * ほんの数センチずつにじり寄っては止まる、を繰り返す。誰も先へ進めない。
 *
 * 動くのは車列のわずかな前後の揺れと、排気の白い煙だけ。
 */
export function IndonesiaMacet() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の空(暑さと苛立ちを示す少し暗めの地色)。 */}
      <rect width="400" height="210" fill="#7f8a6a" />
      <rect y="0" width="400" height="90" fill="#a8b088" />

      {/* 遠景の低い建物。 */}
      <path d="M0,110h50v-18h30v18h60v-26h40v26h60v-14h30v14h130v20H0z" fill="#8a8f78" opacity="0.75" />

      {/* 道路(車線いっぱい)。 */}
      <rect y="120" width="400" height="90" fill="#4a4a52" />
      <g stroke="#e8dcc0" strokeWidth="4" strokeDasharray="26 20">
        <path d="M0,164h400" />
      </g>

      {/* にじり寄る車列(全体をまとめて揺らす)。 */}
      <g className="idn-mc-jam">
        <g strokeLinejoin="round">
          {/* 車1。 */}
          <path d="M20,178 L34,158 L86,158 L100,178z" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.2" />
          <rect x="16" y="176" width="88" height="18" rx="4" fill="#4a7bd0" stroke="#20364a" strokeWidth="2.2" />
          <circle cx="36" cy="196" r="8" fill="#241a10" />
          <circle cx="84" cy="196" r="8" fill="#241a10" />
          {/* バイク1。 */}
          <path d="M120,196 L146,196 L150,182 L136,182 L130,190 L124,190z" fill="#e8443f" stroke="#20364a" strokeWidth="2" />
          <circle cx="126" cy="198" r="7" fill="#241a10" />
          <circle cx="146" cy="198" r="7" fill="#241a10" />
          {/* バイク2。 */}
          <path d="M170,196 L196,196 L200,182 L186,182 L180,190 L174,190z" fill="#f5b31c" stroke="#20364a" strokeWidth="2" />
          <circle cx="176" cy="198" r="7" fill="#241a10" />
          <circle cx="196" cy="198" r="7" fill="#241a10" />
          {/* 車2。 */}
          <path d="M230,178 L244,158 L296,158 L310,178z" fill="#c9a877" stroke="#20364a" strokeWidth="2.2" />
          <rect x="226" y="176" width="88" height="18" rx="4" fill="#a87f4a" stroke="#20364a" strokeWidth="2.2" />
          <circle cx="246" cy="196" r="8" fill="#241a10" />
          <circle cx="294" cy="196" r="8" fill="#241a10" />
          {/* バイク3。 */}
          <path d="M330,196 L356,196 L360,182 L346,182 L340,190 L334,190z" fill="#3f8fc4" stroke="#20364a" strokeWidth="2" />
          <circle cx="336" cy="198" r="7" fill="#241a10" />
          <circle cx="356" cy="198" r="7" fill="#241a10" />
        </g>
      </g>

      {/* 排気の白い煙(細かく吹き上がる)。 */}
      <g className="idn-mc-smoke" fill="#e8e0cc" opacity="0.7">
        <circle cx="14" cy="192" r="4" />
        <circle cx="252" cy="192" r="4" />
      </g>

      <style>{`
        .idn-mc-jam {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: idn-mc-creep 2.6s ease-in-out infinite;
        }
        @keyframes idn-mc-creep {
          0% { transform: translateX(0); }
          40% { transform: translateX(6px); }
          50% { transform: translateX(6px); }
          90% { transform: translateX(-1px); }
          100% { transform: translateX(0); }
        }
        .idn-mc-smoke {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: idn-mc-puff 2.6s ease-in-out infinite;
        }
        @keyframes idn-mc-puff {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          35% { transform: translateY(-4px) scale(1); opacity: 0.7; }
          70% { transform: translateY(-14px) scale(1.3); opacity: 0; }
          100% { transform: translateY(-14px) scale(1.3); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .idn-mc-jam { animation: none; }
          .idn-mc-smoke { animation: none; opacity: 0.4; transform: translateY(-6px) scale(0.9); }
        }
      `}</style>
    </svg>
  );
}
