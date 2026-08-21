/**
 * 軌間の切り替え地点で強いられる積み替え(皆に払う)。
 *
 * 7枚の構図表でここは**昼・積み替え場・黄土**の担当。
 * **2つの軌間の違いを必ず見せる**——左は広軌(枕木が長く太い)の大きな貨車、
 * 右は1000mm軌(枕木が短く細かい)の小さな貨車。線路はつながっていない。
 * この盤面の芯そのものの絵。
 *
 * 動くのは**肩に袋を担いで渡る人足・親方の手に落ちる硬貨・巻き上がる土埃**。
 * 止めた状態でも、途切れた2本の線路と、そのあいだで袋を担ぐ人の構図で分かる。
 */
export function ArgentinaTrasbordoforzado() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼の乾いた操車場。 */}
      <rect width="400" height="210" fill="#c2a060" />
      <rect width="400" height="64" fill="#d8c890" />
      <rect y="64" width="400" height="8" fill="#b08e54" />
      <circle cx="42" cy="26" r="12" fill="#f6e8c8" />
      <g fill="#efe4c2" opacity="0.85">
        <ellipse cx="220" cy="26" rx="40" ry="7" />
        <ellipse cx="330" cy="40" rx="30" ry="6" />
      </g>

      {/* 中景:積み替え倉庫と給水塔。 */}
      <rect x="150" y="34" width="104" height="38" fill="#a8824f" />
      <path d="M144,34h116l-12,-14H156z" fill="#7a5c38" />
      <rect x="188" y="48" width="26" height="24" fill="#6b4a30" />
      <g stroke="#8a6a44" strokeWidth="2" fill="none">
        <path d="M160,42v30M240,42v30" />
      </g>
      <g>
        <path d="M312,72V46" stroke="#6b5330" strokeWidth="4" />
        <path d="M302,46h20v-14h-20z" fill="#8f8a7c" />
        <path d="M302,32a10,5 0 0 1 20,0z" fill="#6f6a5e" />
      </g>

      {/* 左:広軌。枕木が長く太い。大きな貨車。 */}
      <g fill="#5f4c33">
        {[0, 20, 40, 60, 80, 100, 120, 140].map((x) => (
          <rect key={x} x={x} y={148} width={12} height={13} />
        ))}
      </g>
      <rect y="150" width="158" height="4" fill="#8a8f92" />
      <rect y="157" width="158" height="4" fill="#8a8f92" />
      <g>
        <rect x="10" y="96" width="120" height="46" fill="#8a4a30" />
        <rect x="10" y="92" width="120" height="7" fill="#5f3320" />
        <rect x="56" y="104" width="28" height="34" fill="#5f4c33" />
        <path d="M14,104h34M14,112h34M96,104h30M96,112h30" stroke="#a86048" strokeWidth="2.4" />
        <g fill="#33302c">
          <circle cx="36" cy="146" r="7.4" />
          <circle cx="104" cy="146" r="7.4" />
        </g>
        <g fill="#8a8f92">
          <circle cx="36" cy="146" r="2.6" />
          <circle cx="104" cy="146" r="2.6" />
        </g>
      </g>

      {/* 右:1000mm軌。枕木が短く細かい。小さな貨車。線路は左とつながらない。 */}
      <g fill="#6b5a3a">
        {[252, 266, 280, 294, 308, 322, 336, 350, 364, 378, 392].map((x) => (
          <rect key={x} x={x} y={152} width={8} height={9} />
        ))}
      </g>
      <rect x="252" y="153.4" width="148" height="3" fill="#7f8288" />
      <rect x="252" y="158.6" width="148" height="3" fill="#7f8288" />
      <g>
        <rect x="272" y="112" width="88" height="34" fill="#3f6b5f" />
        <rect x="272" y="108" width="88" height="6" rx="2" fill="#2c4a42" />
        <rect x="304" y="118" width="22" height="28" fill="#2c4a42" />
        <g fill="#33302c">
          <circle cx="290" cy="150" r="5.6" />
          <circle cx="342" cy="150" r="5.6" />
        </g>
        <g fill="#8a8f92">
          <circle cx="290" cy="150" r="2" />
          <circle cx="342" cy="150" r="2" />
        </g>
      </g>

      {/* 2本の線路の断絶を強調する狭い土の帯。 */}
      <path d="M162,146h86v20h-86z" fill="#b08e54" />

      {/* 積み替えを待つ袋の山(左の貨車の前)。 */}
      <g fill="#d8c88f">
        <ellipse cx="152" cy="176" rx="15" ry="6" />
        <ellipse cx="170" cy="182" rx="13" ry="5.4" />
        <ellipse cx="158" cy="168" rx="11" ry="5" />
      </g>
      <g stroke="#b8a35f" strokeWidth="1.4" fill="none">
        <path d="M144,175h16M162,181h14M152,167h12" />
      </g>

      {/* 人足1:袋を担いで右へ渡る(オリーブ)。 */}
      <g className="atf-carrier">
        <ellipse cx="0" cy="34" rx="16" ry="4" fill="#000" opacity="0.2" />
        <g fill="#3a3430">
          <rect x="-8" y="12" width="7" height="22" rx="3" />
          <rect x="3" y="12" width="7" height="22" rx="3" />
        </g>
        <path d="M-9,16l4,-30h12l4,30z" fill="#6b6b3f" />
        <circle cx="1" cy="-20" r="8.4" fill="#8a6a4a" />
        <path d="M-8,-21a9,7 0 0 1 18,0z" fill="#c8a13f" />
        {/* 肩の袋。 */}
        <ellipse cx="7" cy="-30" rx="15" ry="8" fill="#d8c88f" transform="rotate(-12 7 -30)" />
        <path d="M-4,-27l20,-6" stroke="#b8a35f" strokeWidth="1.6" fill="none" />
        <path d="M-8,-12l10,-12M10,-14l4,-10" stroke="#6b6b3f" strokeWidth="5.4" strokeLinecap="round" fill="none" />
      </g>

      {/* 人足2:空手で戻ってくる(マスタード)。 */}
      <g className="atf-returner">
        <ellipse cx="0" cy="34" rx="15" ry="4" fill="#000" opacity="0.2" />
        <g fill="#4a3a26">
          <rect x="-8" y="12" width="7" height="22" rx="3" />
          <rect x="3" y="12" width="7" height="22" rx="3" />
        </g>
        <path d="M-9,16l4,-28h12l4,28z" fill="#c8963f" />
        <circle cx="1" cy="-17" r="8" fill="#c98f5f" />
        <path d="M-7,-18a8,6 0 0 1 16,0z" fill="#5a4326" />
        <path d="M-9,-8l-8,12M11,-8l8,12" stroke="#c8963f" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>

      {/* 親方:帳面と、差し出された手のひら(白シャツ)。 */}
      <g>
        <ellipse cx="226" cy="204" rx="24" ry="4.6" fill="#000" opacity="0.2" />
        <g fill="#3a3430">
          <rect x="218" y="180" width="8" height="24" rx="3" />
          <rect x="230" y="180" width="8" height="24" rx="3" />
        </g>
        <path d="M214,182l5,-38h18l5,38z" fill="#efe8d8" />
        <path d="M214,182h28v5h-28z" fill="#c8bfa8" />
        <circle cx="228" cy="134" r="9.4" fill="#8a6a4a" />
        <path d="M218,132a10,7 0 0 1 20,0z" fill="#33302c" />
        <path d="M216,100h24l-4,8h-16z" fill="#6b5330" opacity="0" />
        {/* 帳面。 */}
        <path d="M216,152l-12,10" stroke="#efe8d8" strokeWidth="5.4" strokeLinecap="round" fill="none" />
        <rect x="194" y="158" width="13" height="17" rx="2" fill="#c8b494" />
        {/* 差し出す手のひら。 */}
        <path d="M240,152l16,6" stroke="#efe8d8" strokeWidth="5.4" strokeLinecap="round" fill="none" />
        <circle cx="258" cy="159" r="4" fill="#8a6a4a" />
      </g>
      {/* 手のひらへ落ちる硬貨。 */}
      <g className="atf-coin" fill="#c8a13f">
        <circle cx="262" cy="120" r="4.6" />
      </g>
      <g className="atf-coin atf-coin2" fill="#c8a13f">
        <circle cx="256" cy="120" r="3.6" />
      </g>

      {/* 巻き上がる土埃。 */}
      <g className="atf-dust" fill="#d8c090" opacity="0.6">
        <ellipse cx="196" cy="196" rx="14" ry="4.4" />
        <ellipse cx="180" cy="190" rx="9" ry="3" />
      </g>

      <style>{`
        .atf-carrier { animation: atf-cross 5.6s ease-in-out infinite; }
        @keyframes atf-cross {
          0%   { transform: translate(150px, 168px); }
          55%  { transform: translate(288px, 172px); }
          62%  { transform: translate(288px, 172px); }
          100% { transform: translate(150px, 168px); }
        }
        .atf-returner { animation: atf-back 5.6s ease-in-out infinite; }
        @keyframes atf-back {
          0%   { transform: translate(268px, 176px); }
          50%  { transform: translate(168px, 178px); }
          100% { transform: translate(268px, 176px); }
        }
        .atf-coin { animation: atf-drop 2.8s ease-in infinite; }
        .atf-coin2 { animation-delay: 1.4s; }
        @keyframes atf-drop {
          0%, 55%   { transform: translateY(-26px); opacity: 0; }
          65%       { opacity: 1; }
          92%, 100% { transform: translateY(36px); opacity: 0; }
        }
        .atf-dust {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: atf-puff 2.8s ease-out infinite;
        }
        @keyframes atf-puff {
          0%   { transform: scale(0.5); opacity: 0; }
          40%  { opacity: .6; }
          100% { transform: scale(1.5) translateX(10px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .atf-carrier, .atf-returner, .atf-coin, .atf-coin2, .atf-dust {
            animation: none;
          }
          /* 担ぎ手は2本の線路のあいだ、親方から少し離して止める。 */
          .atf-carrier { transform: translate(166px, 172px); }
          .atf-returner { transform: translate(120px, 178px); opacity: 0; }
          .atf-coin { transform: translateY(30px); }
          .atf-coin2 { opacity: 0; }
          .atf-dust { opacity: .3; }
        }
      `}</style>
    </svg>
  );
}
