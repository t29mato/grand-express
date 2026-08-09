/**
 * 平野の雷。遮るもののない平地で午後じゅう育った雷雲が、いちばん高いものへ落ちる。
 * 電気が止まり、ポンプが止まり、冷蔵庫の中身は夕方には値打ちを下げている。
 *
 * ## 描き直しでやったこと
 *
 * 人が7枚とも同じ赤いシャツの立ち姿だったので、ここは
 * **暗くなった保冷庫から箱を抱えて出てくる人**にした。
 * 両腕で抱える形は他の6枚と重ならないうえ、**電気が止まって困っている中身**が
 * そのまま絵に出る(鉄塔が折れた絵ではなく、荷を抱えた人で伝える)。
 * 空と地面だけだった背景に、集荷場・鉄塔の列・遠くの雨脚・用水路を入れた。
 *
 * **動くものは1つだけ**——落ちた雷そのものが明滅する。
 * 光る輪と稲妻はひとつの `<g>` にまとめてあるので、動くのは1か所。
 *
 * 壊れたものは描かない(`docs/50-authoring/04-doom-animation-guide.md`)。
 * 明滅は「見えている状態」を既定にしてある。透明から始めると、
 * `prefers-reduced-motion` で動きを止めたとき稲妻ごと消えてしまう。
 */
export function IbarakiKaminari() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 午後の雷雲。下ほど明るくして、雲の底を出す。 */}
      <rect width="400" height="210" fill="#2f3b4f" />
      <g fill="#232b3a">
        <ellipse cx="60" cy="28" rx="72" ry="28" />
        <ellipse cx="180" cy="18" rx="86" ry="30" />
        <ellipse cx="308" cy="26" rx="78" ry="28" />
        <ellipse cx="392" cy="36" rx="48" ry="22" />
      </g>
      {/* 雲の底。**平たく重ねる。**丸く離すと空に円盤が浮いて見えた。 */}
      <g fill="#3a465c">
        <ellipse cx="90" cy="52" rx="96" ry="10" />
        <ellipse cx="230" cy="48" rx="104" ry="11" />
        <ellipse cx="352" cy="54" rx="78" ry="9" />
      </g>
      {/* 遠くの雨脚。まだこちらには来ていない。静物。 */}
      <g stroke="#4a5872" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
        <path d="M40,62 L30,92" />
        <path d="M58,60 L48,92" />
        <path d="M76,62 L66,92" />
        <path d="M330,60 L322,92" />
        <path d="M348,58 L340,92" />
        <path d="M366,60 L358,92" />
      </g>

      {/* 遠景の林と、どこまでも平らな関東平野。 */}
      <rect y="92" width="400" height="6" fill="#2c3a2a" />
      <g fill="#33472f">
        <ellipse cx="66" cy="91" rx="20" ry="6" />
        <ellipse cx="200" cy="90" rx="24" ry="7" />
        <ellipse cx="336" cy="91" rx="18" ry="6" />
      </g>
      <rect y="96" width="400" height="114" fill="#3f5a3a" />
      <rect y="96" width="400" height="4" fill="#4b6b44" />
      <g stroke="#375032" strokeWidth="3" fill="none">
        <path d="M400,116 L120,104" />
        <path d="M400,140 L96,116" />
        <path d="M400,196 L60,140" />
      </g>

      {/* 用水路。ポンプが止まると水が来なくなる先。 */}
      <path d="M0,164 L400,150 L400,162 L0,178z" fill="#35485a" />
      <path d="M0,164 L400,150 L400,154 L0,168z" fill="#46607a" />

      {/* 灯りの消えた集荷場と保冷庫。窓と裸電球が暗いことで「電気が止まった」を示す。 */}
      <g stroke="#1c232f" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M14,108 L86,92 L158,108z" fill="#5a4030" />
        <rect x="20" y="106" width="132" height="52" fill="#6b5040" />
        <rect x="18" y="104" width="136" height="6" fill="#7d6048" />
        {/* 開いた保冷庫の戸。中は真っ暗。 */}
        <rect x="34" y="118" width="34" height="40" fill="#1a212c" />
        <rect x="68" y="116" width="8" height="42" fill="#8a8f99" />
        {/* シャッター。 */}
        <rect x="96" y="120" width="46" height="38" fill="#4a4438" />
        <g stroke="#5c5646" strokeWidth="2">
          <path d="M96,128 L142,128" />
          <path d="M96,138 L142,138" />
          <path d="M96,148 L142,148" />
        </g>
        {/* 消えた裸電球。 */}
        <path d="M86,106 L86,116" stroke="#8a8f99" strokeWidth="2" />
        <circle cx="86" cy="120" r="5" fill="#5c5f66" />
      </g>

      {/* 平地でいちばん高いもの——送電鉄塔。手前の1基に落ちる。 */}
      <g stroke="#6f757f" strokeWidth="2" fill="none" strokeLinejoin="round">
        <path d="M356,120 L364,80 L372,120" />
        <path d="M359,104 L369,104" />
        <path d="M357,114 L371,114" />
      </g>
      <g stroke="#8a8f99" strokeWidth="3" fill="none" strokeLinejoin="round">
        <path d="M244,186 L268,58 L292,186" />
        <path d="M251,150 L285,150" />
        <path d="M256,122 L280,122" />
        <path d="M259,98 L277,98" />
        <path d="M246,174 L290,174" />
        <path d="M252,80 L284,80" />
        <path d="M251,150 L259,122 L268,150 L277,122 L285,150" />
        <path d="M246,174 L251,150 L290,174" />
        <path d="M256,122 L262,98 L272,122 L277,98" />
      </g>
      <g stroke="#8a8f99" strokeWidth="2.5" fill="none">
        <path d="M212,88 Q232,84 252,80" />
        <path d="M284,80 Q322,80 359,80" />
      </g>

      {/* 暗くなった保冷庫から箱を抱えて出てきた人。**両腕で抱える形**にして、
          他の6枚の立ち姿と重ならないようにする。 */}
      <g strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="192" cy="196" rx="34" ry="6" fill="#33472f" />
        <path d="M186,168 L182,196" stroke="#2b3546" strokeWidth="10" fill="none" />
        <path d="M198,168 L204,194" stroke="#38445c" strokeWidth="10" fill="none" />
        <path d="M192,140 L192,170" stroke="#7a4a3c" strokeWidth="26" fill="none" />
        <circle cx="192" cy="118" r="12" fill="#d9a273" />
        <path d="M180,118 a12,12 0 0 1 24,0z" fill="#241c1a" />
        <path d="M183,128 L201,128 L200,133 L184,133z" fill="#e0dcd0" />
        {/* 抱えた木箱。中身は値打ちを落としかけている。 */}
        <g stroke="#241f18" strokeWidth="2.5">
          <rect x="168" y="150" width="48" height="26" rx="2" fill="#a8875a" />
          <path d="M168,158 L216,158" stroke="#8a6f42" />
          <g fill="#6f8a4a" stroke="none">
            <ellipse cx="180" cy="150" rx="9" ry="6" />
            <ellipse cx="196" cy="148" rx="9" ry="6" />
            <ellipse cx="210" cy="151" rx="8" ry="5" />
          </g>
        </g>
        {/* 腕。**箱より後に描く。**先に描いたら箱に隠れて、腕が無い人になった。 */}
        <path d="M180,142 L168,156 L172,168" stroke="#7a4a3c" strokeWidth="9" fill="none" />
        <path d="M204,142 L216,156 L212,168" stroke="#7a4a3c" strokeWidth="9" fill="none" />
        <circle cx="173" cy="170" r="5.5" fill="#d9a273" />
        <circle cx="211" cy="170" r="5.5" fill="#d9a273" />
      </g>

      {/* 落ちた雷。**ここだけが動く。** */}
      <g className="ikam-bolt">
        <ellipse cx="266" cy="40" rx="34" ry="26" fill="#f5e08a" opacity="0.22" />
        <path
          d="M264,6 L248,40 L263,40 L255,66 L282,34 L267,34 L279,6z"
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
