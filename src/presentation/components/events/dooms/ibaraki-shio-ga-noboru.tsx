/**
 * 潮が川を遡る。大潮になると海水が内陸まで押し上がり、河口に近い田に入り込む。
 *
 * この土地は同じ潮でシジミを太らせてもいるので、**潮を呪い、潮に感謝する。**
 * 絵でもそれを出したかったので、川べりにシジミ籠を静物で置いてある。
 *
 * **動くものは1つだけ**——田へ差し込んだ潮の舌が、じわりと伸び縮みする。
 */
export function IbarakiShioGaNoboru() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 大潮の夕。 */}
      <rect width="400" height="210" fill="#4c4a62" />
      <rect y="40" width="400" height="26" fill="#5b5872" />
      <circle cx="66" cy="42" r="20" fill="#e8dcc0" opacity="0.55" />
      <rect y="88" width="400" height="122" fill="#4f6b40" />
      <rect y="88" width="400" height="4" fill="#5e7c4c" />

      {/* 河口の川。海から内陸へ、画面の奥から手前に流れる。 */}
      <path d="M0,88 L96,88 L150,210 L20,210z" fill="#3f5a70" />
      <path d="M28,88 L74,88 L118,210 L58,210z" fill="#4a6b84" opacity="0.7" />

      {/* 塩に弱い田。畦で区切る。 */}
      <g stroke="#3f5733" strokeWidth="3">
        <line x1="150" y1="118" x2="400" y2="112" />
        <line x1="160" y1="156" x2="400" y2="148" />
        <line x1="176" y1="196" x2="400" y2="186" />
      </g>
      <g fill="#6b8a4c">
        <ellipse cx="230" cy="134" rx="26" ry="8" />
        <ellipse cx="316" cy="130" rx="24" ry="8" />
        <ellipse cx="270" cy="172" rx="28" ry="8" />
        <ellipse cx="358" cy="168" rx="22" ry="7" />
      </g>

      {/* シジミ籠。潮の恵みのほう。静物。 */}
      <g stroke="#241f18" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M44,182 L86,182 L80,204 L50,204z" fill="#a8875a" />
        <rect x="42" y="176" width="46" height="8" rx="3" fill="#8a6a44" />
        <g fill="#4a4a52">
          <ellipse cx="56" cy="176" rx="7" ry="4" />
          <ellipse cx="70" cy="174" rx="7" ry="4" />
          <ellipse cx="63" cy="170" rx="7" ry="4" />
        </g>
      </g>

      {/* 畦の上から田を見ている人。 */}
      <g stroke="#232b3a" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cx="330" cy="204" rx="26" ry="5" fill="#3f5733" stroke="none" />
        <rect x="318" y="174" width="11" height="30" rx="5" fill="#2f3b4f" />
        <rect x="332" y="174" width="11" height="30" rx="5" fill="#2f3b4f" />
        <rect x="314" y="134" width="32" height="42" rx="10" fill="#e05252" />
        <circle cx="330" cy="122" r="13" fill="#d9a273" />
        <path d="M317,120 a13,13 0 0 1 26,0z" fill="#241c1a" />
        <ellipse cx="330" cy="110" rx="21" ry="5" fill="#8a8258" />
        <path d="M320,98 L340,98 L344,110 L316,110z" fill="#8a8258" />
        <g transform="translate(314,146) rotate(190)">
          <rect x="0" y="-6" width="38" height="12" rx="6" fill="#d9a273" />
        </g>
        <circle cx="278" cy="139" r="6" fill="#d9a273" />
      </g>

      {/* 田へ差し込む潮。**ここだけが動く。** */}
      <path
        className="isgn-tongue"
        d="M84,92 L88,196 C150,192 214,178 268,152 C232,132 168,112 108,96z"
        fill="#3f5a70"
        stroke="#7fa4bc"
        strokeWidth="2.5"
        strokeLinejoin="round"
        opacity="0.92"
      />

      <style>{`
        .isgn-tongue {
          transform-box: fill-box;
          transform-origin: 0 50%;
          animation: isgn-push 4.2s ease-in-out infinite alternate;
        }
        @keyframes isgn-push {
          from { transform: scaleX(0.45); }
          to   { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .isgn-tongue { animation: none; }
        }
      `}</style>
    </svg>
  );
}
