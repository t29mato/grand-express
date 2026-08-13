/**
 * 国境検問が詰まる。遮断棒の下に列車が並んで待たされ、
 * 係官が書類を確かめる。対立や暴力は描かない。**点滅する警告灯**と
 * 上下しない遮断棒で、待たされている様子を伝える。
 */
export function EuropeGrenzstau() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="80" fill="#cfe4f0" />

      {/* 国境の小屋。 */}
      <rect x="300" y="70" width="60" height="50" fill="#c7ccce" stroke="#20364a" strokeWidth="2" />
      <path d="M296,70 L330,48 L364,70z" fill="#5c6a72" />
      <rect x="322" y="90" width="16" height="30" fill="#4a4a52" />

      {/* 地面と線路。 */}
      <rect y="150" width="400" height="60" fill="#c9a877" />
      <rect y="150" width="400" height="5" fill="#dabb8c" />
      <rect y="182" width="400" height="6" fill="#3a332c" />
      <g stroke="#241a10" strokeWidth="3">
        <path d="M20,184 L380,184" />
        <path d="M40,178 L40,190M80,178 L80,190M120,178 L120,190M160,178 L160,190M200,178 L200,190M240,178 L240,190" />
      </g>

      {/* 並んで待つ車両の列。 */}
      <g strokeLinejoin="round">
        <rect x="10" y="150" width="70" height="26" rx="3" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="28" cy="176" r="8" fill="#241a10" />
        <circle cx="62" cy="176" r="8" fill="#241a10" />
        <rect x="90" y="150" width="70" height="26" rx="3" fill="#8b8f98" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="108" cy="176" r="8" fill="#241a10" />
        <circle cx="142" cy="176" r="8" fill="#241a10" />
        <rect x="170" y="150" width="70" height="26" rx="3" fill="#f5b31c" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="188" cy="176" r="8" fill="#241a10" />
        <circle cx="222" cy="176" r="8" fill="#241a10" />
      </g>

      {/* 遮断棒の支柱。棒は下りたまま。 */}
      <rect x="256" y="130" width="8" height="70" fill="#e6e9ea" stroke="#20364a" strokeWidth="2" />
      <g strokeLinejoin="round">
        <rect x="260" y="140" width="120" height="9" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <rect x="260" y="140" width="18" height="9" fill="#e8443f" />
        <rect x="296" y="140" width="18" height="9" fill="#e8443f" />
        <rect x="332" y="140" width="18" height="9" fill="#e8443f" />
      </g>

      {/* 書類を確かめる係官。 */}
      <g strokeLinejoin="round">
        <circle cx="270" cy="160" r="9" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <rect x="260" y="168" width="20" height="24" rx="3" fill="#4a4a52" stroke="#20364a" strokeWidth="2" />
        <rect x="276" y="172" width="14" height="18" rx="1" fill="#f6efe2" stroke="#20364a" strokeWidth="1.5" />
      </g>

      {/* 点滅する警告灯。 */}
      <circle className="egz-light" cx="260" cy="128" r="6" fill="#e8443f" />

      <style>{`
        .egz-light {
          animation: egz-blink 1s steps(1) infinite;
        }
        @keyframes egz-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.15; }
        }
        @media (prefers-reduced-motion: reduce) {
          .egz-light { animation: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
