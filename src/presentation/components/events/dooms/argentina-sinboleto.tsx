/**
 * 無賃乗車を見つかる(罰金)。
 *
 * 7枚の構図表でここは**昼・車内・暖色**の担当。屋外の景色は窓の中だけ。
 * 検札係が一列ずつ確かめながら通路を進んできて、もう降りる隙は無い——
 * その「詰み」を、**窓の外だけが動き続ける**車内で描く。
 *
 * 動くのは**窓の外を流れるパンパ・検札係の切符鋏・うつむく乗客の頭・
 * 吊り革の揺れ**。止めた状態でも、制帽の検札係が鋏を構えて乗客の席の前に
 * 立っている構図で分かる。
 */
export function ArgentinaSinboleto() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 車内。木の内装の暖色。 */}
      <rect width="400" height="210" fill="#8a6a4a" />
      <rect width="400" height="30" fill="#6b5330" />
      <rect y="30" width="400" height="60" fill="#5f4c33" />
      <rect y="150" width="400" height="60" fill="#7a5c38" />
      <rect y="146" width="400" height="6" fill="#5a4326" />

      {/* 窓の帯。外は昼のパンパが流れていく。 */}
      <g>
        <rect x="14" y="38" width="104" height="46" rx="5" fill="#9cc8e4" />
        <rect x="148" y="38" width="104" height="46" rx="5" fill="#9cc8e4" />
        <rect x="282" y="38" width="104" height="46" rx="5" fill="#9cc8e4" />
      </g>
      {/* 流れる景色(窓ごとにクリップ)。 */}
      <clipPath id="asb-w1">
        <rect x="14" y="38" width="104" height="46" rx="5" />
      </clipPath>
      <clipPath id="asb-w2">
        <rect x="148" y="38" width="104" height="46" rx="5" />
      </clipPath>
      <clipPath id="asb-w3">
        <rect x="282" y="38" width="104" height="46" rx="5" />
      </clipPath>
      {[
        ["asb-w1", 0],
        ["asb-w2", 134],
        ["asb-w3", 268],
      ].map(([clip, dx]) => (
        <g key={String(clip)} clipPath={`url(#${clip})`}>
          <g transform={`translate(${dx},0)`}>
            <g className="asb-scroll">
              <rect x="-400" y="66" width="800" height="18" fill="#a8b874" />
              <rect x="-400" y="60" width="800" height="8" fill="#c8b45f" />
              {[-380, -310, -240, -170, -100, -30, 40, 110, 180, 250, 320].map((x) => (
                <g key={x}>
                  <ellipse cx={x} cy={62} rx={9} ry={7} fill="#3f6b3a" />
                  <rect x={x - 1.5} y={66} width={3} height={6} fill="#6b5a44" />
                </g>
              ))}
              {[-350, -210, -70, 70, 210, 350].map((x) => (
                <circle key={x} cx={x} cy={48} r={6} fill="#f6efe2" opacity="0.8" />
              ))}
            </g>
          </g>
        </g>
      ))}
      {/* 窓枠。 */}
      <g fill="none" stroke="#4a3a26" strokeWidth="4">
        <rect x="14" y="38" width="104" height="46" rx="5" />
        <rect x="148" y="38" width="104" height="46" rx="5" />
        <rect x="282" y="38" width="104" height="46" rx="5" />
      </g>

      {/* 吊り革。車体の揺れでゆっくり振れる。 */}
      <g className="asb-strap">
        <path d="M60,0v16" stroke="#4a3a26" strokeWidth="3" />
        <rect x="53" y="16" width="14" height="10" rx="4" fill="#c8a13f" />
      </g>
      <g className="asb-strap asb-strap2">
        <path d="M340,0v16" stroke="#4a3a26" strokeWidth="3" />
        <rect x="333" y="16" width="14" height="10" rx="4" fill="#c8a13f" />
      </g>

      {/* 座席の列(緑のモケット)。奥へ小さく。 */}
      <g>
        <rect x="20" y="108" width="52" height="42" rx="6" fill="#3f6b4a" />
        <rect x="20" y="142" width="58" height="10" rx="3" fill="#2f5238" />
        <rect x="330" y="108" width="52" height="42" rx="6" fill="#3f6b4a" />
        <rect x="324" y="142" width="58" height="10" rx="3" fill="#2f5238" />
      </g>

      {/* うつむく乗客(黄のシャツ)。座席の陰でバッグを抱えている。 */}
      <g>
        <ellipse cx="352" cy="152" rx="26" ry="5" fill="#000" opacity="0.18" />
        <path d="M334,150l5,-32h26l5,32z" fill="#f5b31c" />
        <path d="M334,150h36v5h-36z" fill="#d09410" />
        <g className="asb-slump">
          <circle cx="349" cy="112" r="10" fill="#c98f5f" />
          <path d="M338,113a11,11 0 0 1 22,0z" fill="#5a4326" />
        </g>
        <path d="M338,128l-12,14" stroke="#f5b31c" strokeWidth="6" strokeLinecap="round" fill="none" />
        <rect x="316" y="138" width="18" height="13" rx="3" fill="#8a4a30" />
      </g>

      {/* 検札係(紺の制服・制帽)。乗客の席の前に立つ。 */}
      <g>
        <ellipse cx="236" cy="200" rx="30" ry="6" fill="#000" opacity="0.2" />
        <g fill="#2f3a5f">
          <rect x="224" y="164" width="10" height="42" rx="3" />
          <rect x="240" y="164" width="10" height="42" rx="3" />
        </g>
        <path d="M219,168l6,-52h24l6,52z" fill="#3f4a78" />
        <path d="M219,168h36v6h-36z" fill="#2c355a" />
        <g fill="#c8a13f">
          <circle cx="230" cy="132" r="2.4" />
          <circle cx="230" cy="144" r="2.4" />
        </g>
        <circle cx="237" cy="102" r="11" fill="#c98f5f" />
        <path d="M225,100a12,8 0 0 1 24,0z" fill="#2c355a" />
        <rect x="224" y="98" width="26" height="5" rx="2" fill="#1f2740" />
        <rect x="245" y="99" width="10" height="4" rx="2" fill="#1f2740" />
        {/* 左腕は帳面を抱える。 */}
        <path d="M222,120l-12,16" stroke="#3f4a78" strokeWidth="6" strokeLinecap="round" fill="none" />
        <rect x="198" y="132" width="16" height="20" rx="2" fill="#e8dcc0" />
        <path d="M200,138h12M200,143h12M200,148h9" stroke="#b8a482" strokeWidth="1.6" />
        {/* 右腕が切符鋏を構える。 */}
        <g className="asb-punch">
          <path d="M252,120l24,10" stroke="#3f4a78" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="278" cy="131" r="3.4" fill="#c98f5f" />
          <g stroke="#8f9aa4" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M280,129l12,-4" />
            <path d="M280,133l12,3" />
          </g>
          <circle cx="281" cy="131" r="2" fill="#5f6874" />
        </g>
      </g>

      {/* 通路に落ちた切符が1枚。誰のものでもない。 */}
      <rect x="150" y="188" width="16" height="9" rx="1.5" fill="#e8dcc0" transform="rotate(-12 158 192)" />
      <path d="M154,191l8,2" stroke="#b8a482" strokeWidth="1.4" />

      <style>{`
        .asb-scroll { animation: asb-move 5.2s linear infinite; }
        @keyframes asb-move {
          0%   { transform: translateX(0); }
          100% { transform: translateX(140px); }
        }
        .asb-strap {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: asb-sway 2.6s ease-in-out infinite;
        }
        .asb-strap2 { animation-delay: 1.3s; }
        @keyframes asb-sway {
          0%, 100% { transform: rotate(4deg); }
          50%      { transform: rotate(-4deg); }
        }
        .asb-punch {
          transform-box: fill-box;
          transform-origin: 0% 30%;
          animation: asb-snip 1.8s ease-in-out infinite;
        }
        @keyframes asb-snip {
          0%, 100% { transform: rotate(0deg); }
          55%      { transform: rotate(-9deg); }
          70%      { transform: rotate(2deg); }
        }
        .asb-slump {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: asb-hang 3.4s ease-in-out infinite;
        }
        @keyframes asb-hang {
          0%, 100% { transform: rotate(6deg); }
          50%      { transform: rotate(10deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .asb-scroll, .asb-strap, .asb-strap2, .asb-punch, .asb-slump {
            animation: none;
          }
          /* 頭はうなだれた位置で止める。 */
          .asb-slump {
            transform: rotate(8deg);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
        }
      `}</style>
    </svg>
  );
}
