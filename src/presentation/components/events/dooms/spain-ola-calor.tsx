/**
 * 熱波でレールが曲がる恐れ。記録的な暑さで速度制限がかかり
 * (実際にスペイン国鉄が行う措置)、AVEが徐行して遅れる。
 *
 * 白いAVE(標準軌の高速車両)が、照りつける太陽の下、
 * 黄色の信号の前でそろそろと進む。レールの上には陽炎が立つ。
 *
 * 動き: 陽炎の揺らぎ・黄信号の明滅・太陽の脈動・列車がわずかに進んでは止まる。
 */
export function SpainOlaCalor() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 白っぽく灼けた空 */}
      <rect width="400" height="210" fill="#e8d9a8" />
      <rect width="400" height="70" fill="#f0e2b8" />

      {/* 照りつける太陽 */}
      <g className="sola-sun">
        <circle cx="60" cy="42" r="22" fill="#f5b31c" />
        <g stroke="#f5b31c" strokeWidth="3" strokeLinecap="round">
          <path d="M60,10 v-6 M60,74 v6 M28,42 h-6 M92,42 h6" />
          <path d="M37,19 l-4,-4 M83,19 l4,-4 M37,65 l-4,4 M83,65 l4,4" />
        </g>
      </g>

      {/* 乾いた大地の遠景とオリーブ */}
      <rect y="118" width="400" height="92" fill="#c9a24a" />
      <path d="M0,118 q100,-10 200,-4 t200,-2 v8 H0z" fill="#b58a3f" />
      <g fill="#8fa06a">
        <circle cx="330" cy="108" r="9" />
        <circle cx="342" cy="112" r="7" />
        <circle cx="296" cy="112" r="7" />
      </g>
      <g fill="#6b5330">
        <rect x="328" y="112" width="3" height="8" />
        <rect x="295" y="114" width="2.5" height="6" />
      </g>

      {/* 黄色の速度制限信号 */}
      <g transform="translate(352,150)">
        <rect x="-3" y="-46" width="6" height="46" fill="#4a4a52" />
        <rect x="-10" y="-72" width="20" height="30" rx="4" fill="#20364a" />
        <circle cx="0" cy="-62" r="5.5" fill="#5a5548" />
        <circle className="sola-amber" cx="0" cy="-49" r="5.5" fill="#f5b31c" />
      </g>

      {/* バラスト軌道とレール(標準軌) */}
      <rect y="166" width="400" height="44" fill="#a8906a" />
      <g fill="#8a7350">
        <ellipse cx="40" cy="176" rx="6" ry="2.5" />
        <ellipse cx="120" cy="182" rx="6" ry="2.5" />
        <ellipse cx="250" cy="178" rx="6" ry="2.5" />
        <ellipse cx="340" cy="184" rx="6" ry="2.5" />
      </g>
      <g fill="#6b5330">
        <rect x="6" y="170" width="10" height="34" />
        <rect x="46" y="170" width="10" height="34" />
        <rect x="86" y="170" width="10" height="34" />
        <rect x="126" y="170" width="10" height="34" />
        <rect x="166" y="170" width="10" height="34" />
        <rect x="206" y="170" width="10" height="34" />
        <rect x="246" y="170" width="10" height="34" />
        <rect x="286" y="170" width="10" height="34" />
        <rect x="326" y="170" width="10" height="34" />
        <rect x="366" y="170" width="10" height="34" />
      </g>
      {/* 熱で緩んだレールはわずかにうねる */}
      <path d="M0,174 q50,-2 100,0 t100,1 t100,-2 t100,1" stroke="#5a5548" strokeWidth="5" fill="none" />
      <path d="M0,196 q50,2 100,0 t100,-1 t100,2 t100,-1" stroke="#5a5548" strokeWidth="5" fill="none" />

      {/* AVE(白い流線形。そろそろと進む) */}
      <g className="sola-train">
        <g>
          <path d="M30,168 V140 q0,-8 8,-8 h150 q26,0 40,14 l16,16 q2,4 -4,4z" fill="#f6efe2" />
          <path d="M30,168 V158 h206 q4,4 4,6 q2,4 -4,4z" fill="#8a98a4" />
          <path d="M196,132 q22,0 34,12 l12,12 h-46z" fill="#20364a" opacity="0.9" />
          <g fill="#20364a" opacity="0.85">
            <rect x="44" y="140" width="26" height="12" rx="3" />
            <rect x="80" y="140" width="26" height="12" rx="3" />
            <rect x="116" y="140" width="26" height="12" rx="3" />
            <rect x="152" y="140" width="26" height="12" rx="3" />
          </g>
          <path d="M34,164 h200" stroke="#e8443f" strokeWidth="3" />
          {/* 台車 */}
          <g fill="#4a4a52">
            <circle cx="60" cy="170" r="7" />
            <circle cx="90" cy="170" r="7" />
            <circle cx="180" cy="170" r="7" />
            <circle cx="212" cy="170" r="7" />
          </g>
        </g>
      </g>

      {/* レールから立ちのぼる陽炎(主の動き) */}
      <g stroke="#f6efe2" strokeWidth="2.4" fill="none" opacity="0.65">
        <path className="sola-heat-a" d="M70,162 q5,-9 0,-18 q-5,-9 0,-18" />
        <path className="sola-heat-b" d="M150,164 q5,-9 0,-18 q-5,-9 0,-18" />
        <path className="sola-heat-c" d="M262,162 q5,-9 0,-18 q-5,-9 0,-18" />
        <path className="sola-heat-d" d="M320,164 q5,-9 0,-18 q-5,-9 0,-18" />
      </g>

      <style>{`
        .sola-sun { transform-box: fill-box; transform-origin: center; animation: sola-throb 2.6s ease-in-out infinite; }
        .sola-amber { animation: sola-blink 1.2s step-end infinite; }
        .sola-train { animation: sola-crawl 5s ease-in-out infinite; }
        .sola-heat-a { animation: sola-rise 2.2s linear infinite; }
        .sola-heat-b { animation: sola-rise 2.2s linear infinite; animation-delay: -0.55s; }
        .sola-heat-c { animation: sola-rise 2.2s linear infinite; animation-delay: -1.1s; }
        .sola-heat-d { animation: sola-rise 2.2s linear infinite; animation-delay: -1.65s; }
        @keyframes sola-throb {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }
        @keyframes sola-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @keyframes sola-crawl {
          0%, 55% { transform: translateX(0); }
          70%, 100% { transform: translateX(5px); }
        }
        @keyframes sola-rise {
          0% { transform: translateY(8px); opacity: 0; }
          30% { opacity: 0.65; }
          100% { transform: translateY(-12px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sola-sun, .sola-amber, .sola-train,
          .sola-heat-a, .sola-heat-b, .sola-heat-c, .sola-heat-d { animation: none; }
        }
      `}</style>
    </svg>
  );
}
