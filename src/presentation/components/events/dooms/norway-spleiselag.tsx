/**
 * 割り勘(スプレイセラーグ)が足りない。
 *
 * 全員で均等に払うはずが、皿が下げられてから数え直すと一人ぶんが勘定から漏れている。
 * 不文律で、**最初に気づいた者が差額を持つ。**
 * 動くのは**並べた硬貨の上を数える指・一枚だけ回って倒れる硬貨・空いた枠の点滅**。
 * 止めた状態でも、硬貨の列に空いた枠と、財布に手を伸ばす人で分かる。
 */
export function NorwaySpleiselag() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 店の中。壁は暗く、卓の上だけが明るい。 */}
      <rect width="400" height="210" fill="#3a2e28" />
      <rect y="0" width="400" height="96" fill="#4a3a30" />
      <g stroke="#3f322a" strokeWidth="2" opacity="0.8" fill="none">
        <path d="M0,24h400M0,52h400M0,80h400" />
      </g>

      {/* 吊り下げた灯り(中景)。 */}
      <rect x="196" y="0" width="4" height="20" fill="#2a221c" />
      <path d="M170,20h58l-12,16h-34z" fill="#2f3a44" />
      <ellipse cx="199" cy="38" rx="15" ry="4" fill="#f8dc90" />
      <path d="M172,36L146,96h106L226,36z" fill="#f5b31c" opacity="0.14" />

      {/* 壁の棚と瓶(中景・左右)。 */}
      <rect x="8" y="52" width="86" height="6" fill="#5a4630" />
      <g fill="#6b8a72">
        <path d="M18,52V34a5,5 0 0 1 3,-5v-5h6v5a5,5 0 0 1 3,5v18z" />
        <path d="M40,52V36a5,5 0 0 1 3,-5v-5h6v5a5,5 0 0 1 3,5v16z" />
      </g>
      <g fill="#8a6f4a">
        <path d="M62,52V32a5,5 0 0 1 3,-5v-5h6v5a5,5 0 0 1 3,5v20z" />
      </g>
      <rect x="306" y="46" width="86" height="6" fill="#5a4630" />
      <g fill="#4a6b8a">
        <rect x="316" y="26" width="16" height="20" rx="2" />
        <rect x="340" y="30" width="16" height="16" rx="2" />
        <rect x="364" y="24" width="16" height="22" rx="2" />
      </g>

      {/* 卓(手前・大きく)。 */}
      <path d="M0,96h400v22H0z" fill="#8a5f3a" />
      <path d="M0,118h400v92H0z" fill="#a8794c" />
      <g stroke="#8a6038" strokeWidth="2.4" opacity="0.7" fill="none">
        <path d="M0,140h400M0,168h400M0,196h400" />
      </g>

      {/* 下げられた皿の重ね(左)。 */}
      <g>
        <ellipse cx="58" cy="118" rx="42" ry="12" fill="#e8e4d8" />
        <ellipse cx="58" cy="112" rx="42" ry="12" fill="#f4f2ea" />
        <ellipse cx="58" cy="106" rx="42" ry="12" fill="#e8e4d8" />
        <ellipse cx="58" cy="100" rx="42" ry="12" fill="#f4f2ea" />
        <ellipse cx="58" cy="100" rx="26" ry="7" fill="#dcd8cc" />
        <g fill="#8a8578">
          <rect x="20" y="126" width="46" height="4" rx="2" transform="rotate(-8 43 128)" />
          <rect x="26" y="134" width="46" height="4" rx="2" transform="rotate(6 49 136)" />
        </g>
      </g>

      {/* 空になったグラス(右)。 */}
      <g fill="#cfe0ea" opacity="0.85">
        <path d="M318,84h26l-4,26h-18z" />
        <path d="M352,88h22l-3,22h-16z" />
      </g>
      <g fill="#a8bcc8">
        <rect x="324" y="110" width="14" height="4" />
        <rect x="356" y="110" width="12" height="4" />
      </g>

      {/* 勘定書(手前・右)。 */}
      <g transform="rotate(-7 320 168)">
        <rect x="278" y="132" width="86" height="66" rx="2" fill="#f4f2ea" />
        <g fill="#b8b4a8">
          <rect x="286" y="142" width="58" height="4" />
          <rect x="286" y="152" width="66" height="4" />
          <rect x="286" y="162" width="48" height="4" />
          <rect x="286" y="172" width="60" height="4" />
        </g>
        <rect x="286" y="184" width="70" height="3" fill="#3a3228" />
        <rect x="316" y="190" width="40" height="6" fill="#c0453c" />
      </g>

      {/* 硬貨の列。**一枠だけ空いている。** */}
      <g>
        <g fill="#c8a03c">
          <ellipse cx="118" cy="176" rx="17" ry="7" />
          <ellipse cx="118" cy="171" rx="17" ry="7" />
        </g>
        <ellipse cx="118" cy="171" rx="11" ry="4.4" fill="#f5b31c" />
        <g fill="#c8a03c">
          <ellipse cx="158" cy="178" rx="17" ry="7" />
          <ellipse cx="158" cy="173" rx="17" ry="7" />
        </g>
        <ellipse cx="158" cy="173" rx="11" ry="4.4" fill="#f5b31c" />
        <g fill="#b8bcc4">
          <ellipse cx="198" cy="180" rx="17" ry="7" />
          <ellipse cx="198" cy="175" rx="17" ry="7" />
        </g>
        <ellipse cx="198" cy="175" rx="11" ry="4.4" fill="#dfe4ea" />
        {/* ここが誰か一人ぶん。空いたまま。 */}
        <g className="nsp-gap">
          <ellipse
            cx="240"
            cy="180"
            rx="17"
            ry="7"
            fill="none"
            stroke="#c0453c"
            strokeWidth="3"
            strokeDasharray="6 5"
          />
        </g>
        <g fill="#c8a03c">
          <ellipse cx="282" cy="180" rx="17" ry="7" />
          <ellipse cx="282" cy="175" rx="17" ry="7" />
        </g>
        <ellipse cx="282" cy="175" rx="11" ry="4.4" fill="#f5b31c" />
      </g>

      {/* 卓に落ちてくる最後の一枚。**回って倒れるが、空きは埋まらない。** */}
      <g className="nsp-coin">
        <ellipse cx="0" cy="0" rx="16" ry="16" fill="#c8a03c" />
        <ellipse cx="0" cy="0" rx="10" ry="10" fill="#f5b31c" />
        <ellipse cx="0" cy="0" rx="4" ry="4" fill="#d8a03c" />
      </g>

      {/* 数える指(左の人)。**列の上を往復する。** */}
      <g className="nsp-hand">
        <path d="M92,110l30,26" stroke="#e8c8a8" strokeWidth="13" strokeLinecap="round" fill="none" />
        <path d="M118,130l16,14" stroke="#e8c8a8" strokeWidth="9" strokeLinecap="round" fill="none" />
        <ellipse cx="136" cy="146" rx="6" ry="4.6" fill="#e8c8a8" />
        <path d="M84,102l16,12" stroke="#3f5f8f" strokeWidth="15" strokeLinecap="round" fill="none" />
      </g>

      {/* 財布に手を伸ばす人(気づいてしまった側・右)。 */}
      <g>
        <path d="M340,96h44l6,22h-56z" fill="#7a4a56" />
        <circle cx="362" cy="80" r="14" fill="#e8c8a8" />
        <path d="M348,76a14,14 0 0 1 28,0z" fill="#4a3a2c" />
        <g fill="#3a3228">
          <ellipse cx="356" cy="82" rx="1.8" ry="1.2" />
          <ellipse cx="369" cy="82" rx="1.8" ry="1.2" />
        </g>
        <path d="M356,90q6,3 12,0" stroke="#8a6f5a" strokeWidth="1.6" fill="none" />
        <path d="M340,106l-26,16" stroke="#7a4a56" strokeWidth="11" strokeLinecap="round" fill="none" />
        <rect x="296" y="112" width="26" height="18" rx="3" fill="#4a3a2c" />
        <rect x="296" y="118" width="26" height="4" fill="#3a2c22" />
        <rect x="310" y="108" width="9" height="8" fill="#f5b31c" />
      </g>

      <style>{`
        .nsp-hand {
          transform-box: fill-box;
          transform-origin: 0% 0%;
          animation: nsp-count 3.6s ease-in-out infinite;
        }
        @keyframes nsp-count {
          0%, 100% { transform: translate(0, 0); }
          30%      { transform: translate(40px, 6px); }
          60%      { transform: translate(84px, 10px); }
          80%      { transform: translate(122px, 10px); }
        }
        .nsp-coin {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: nsp-drop 3.6s ease-in infinite;
        }
        @keyframes nsp-drop {
          0%   { transform: translate(282px, -30px) scaleX(1); opacity: 0; }
          20%  { transform: translate(282px, 60px) scaleX(0.2); opacity: 1; }
          46%  { transform: translate(282px, 168px) scaleX(1); opacity: 1; }
          58%  { transform: translate(282px, 174px) scaleY(0.28); opacity: 1; }
          100% { transform: translate(282px, 174px) scaleY(0.28); opacity: 0; }
        }
        .nsp-gap { animation: nsp-blink 1.8s ease-in-out infinite; }
        @keyframes nsp-blink {
          0%, 100% { opacity: 0.45; }
          50%      { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nsp-hand, .nsp-coin, .nsp-gap { animation: none; }
          .nsp-hand {
            transform: translate(84px, 10px);
            transform-box: fill-box;
            transform-origin: 0% 0%;
          }
          .nsp-coin {
            transform: translate(282px, 168px);
            transform-box: fill-box;
            transform-origin: 50% 50%;
          }
          .nsp-gap { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
