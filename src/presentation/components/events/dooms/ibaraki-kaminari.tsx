/**
 * 平野の雷。遮るもののない平地で午後じゅう育った雷雲が、いちばん高いものへ落ちる。
 * 電気が止まり、ポンプが止まる。
 *
 * **動くものは1つだけ**——落ちた雷そのものが明滅する。
 * 光る輪と稲妻はひとつの `<g>` にまとめてあるので、動くのは1か所。
 *
 * 壊れたものは描かない(`docs/50-authoring/04-doom-animation-guide.md`)。
 * 倒れた鉄塔ではなく、**灯りの消えた家と見上げる人**で「困っている」を伝える。
 *
 * 明滅は「見えている状態」を既定にしてある。透明から始めると、
 * `prefers-reduced-motion` で動きを止めたとき稲妻ごと消えてしまう。
 */
export function IbarakiKaminari() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 午後の雷雲。災難なので暗い地色。 */}
      <rect width="400" height="210" fill="#2f3b4f" />
      <g fill="#232b3a">
        <ellipse cx="70" cy="34" rx="66" ry="26" />
        <ellipse cx="180" cy="24" rx="78" ry="28" />
        <ellipse cx="300" cy="32" rx="72" ry="26" />
        <ellipse cx="386" cy="40" rx="46" ry="20" />
      </g>
      <rect y="52" width="400" height="10" fill="#293347" />

      {/* どこまでも平らな関東平野。 */}
      <rect y="128" width="400" height="82" fill="#3f5a3a" />
      <rect y="128" width="400" height="4" fill="#4b6b44" />
      {/* れんこん田。水面に空が映る。 */}
      <rect y="176" width="400" height="34" fill="#35485a" />
      <g stroke="#2b3a49" strokeWidth="2">
        <line x1="0" y1="186" x2="400" y2="186" />
        <line x1="0" y1="198" x2="400" y2="198" />
      </g>
      <g fill="#4b6b44">
        <ellipse cx="52" cy="190" rx="15" ry="5" />
        <ellipse cx="140" cy="200" rx="17" ry="5" />
        <ellipse cx="286" cy="192" rx="14" ry="5" />
        <ellipse cx="356" cy="203" rx="16" ry="5" />
      </g>

      {/* 灯りの消えた農家。窓が暗いことで「電気が止まった」を示す。 */}
      <g stroke="#1c232f" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M28,132 L74,104 L120,132z" fill="#5a4030" />
        <rect x="38" y="130" width="72" height="44" fill="#6b5040" />
        <rect x="52" y="142" width="20" height="18" fill="#232b3a" />
        <rect x="82" y="142" width="20" height="18" fill="#232b3a" />
        <rect x="66" y="160" width="16" height="14" fill="#3d3226" />
      </g>

      {/* 平地でいちばん高いもの——送電鉄塔。ここに落ちる。 */}
      <g stroke="#8a8f99" strokeWidth="3" fill="none" strokeLinejoin="round">
        <path d="M268,178 L288,76 L308,178" />
        <path d="M274,148 L302,148" />
        <path d="M278,124 L298,124" />
        <path d="M281,104 L295,104" />
        <path d="M270,166 L306,166" />
        <path d="M272,90 L304,90" />
        <path d="M274,148 L281,124 L288,148 L295,124 L302,148" />
        <path d="M270,166 L274,148 L306,166" />
        <path d="M278,124 L284,104 L292,124 L295,104" />
      </g>
      <g stroke="#8a8f99" strokeWidth="2.5">
        <line x1="248" y1="92" x2="272" y2="90" />
        <line x1="304" y1="90" x2="332" y2="94" />
      </g>

      {/* 空を見上げる人。慌てているが、痛みは描かない。 */}
      <g stroke="#1c232f" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cx="176" cy="180" rx="24" ry="5" fill="#33472f" stroke="none" />
        <rect x="166" y="150" width="10" height="30" rx="5" fill="#2f3b4f" />
        <rect x="178" y="150" width="10" height="30" rx="5" fill="#2f3b4f" />
        <rect x="162" y="112" width="30" height="42" rx="9" fill="#e05252" />
        <circle cx="177" cy="100" r="12" fill="#d9a273" />
        <path d="M165,98 a12,12 0 0 1 24,0z" fill="#241c1a" />
        {/* 額にかざした手 */}
        <g transform="translate(190,116) rotate(-100)">
          <rect x="0" y="-5" width="23" height="10" rx="5" fill="#d9a273" />
        </g>
        <circle cx="186" cy="93" r="5.5" fill="#d9a273" />
      </g>

      {/* 落ちた雷。**ここだけが動く。** */}
      <g className="ikam-bolt">
        <ellipse cx="286" cy="54" rx="32" ry="24" fill="#f5e08a" opacity="0.22" />
        <path
          d="M284,22 L268,56 L283,56 L275,80 L302,50 L287,50 L299,22z"
          fill="#f5e08a"
          stroke="#f5b31c"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </g>

      <style>{`
        .ikam-bolt {
          animation: ikam-flash 2.4s ease-in-out infinite;
        }
        @keyframes ikam-flash {
          0%, 38%, 100% { opacity: 1; }
          44% { opacity: 0.25; }
          50% { opacity: 1; }
          56% { opacity: 0.3; }
          62% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ikam-bolt { animation: none; }
        }
      `}</style>
    </svg>
  );
}
