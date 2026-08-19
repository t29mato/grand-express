/**
 * 夏の停電。いちばん暑い午後に地域一帯の電気が止まり、冷蔵・冷凍設備も
 * 道連れになる。生鮮品がいちばん傷みやすい、まさにその時である。
 *
 * 構図: 暗い集合住宅の谷間の店先。窓はほとんど真っ暗で、
 * 発電機を回している一軒だけが灯っている。手前に扉の開いた冷蔵ケース、
 * 溶けはじめた氷と傷みかけの野菜、床に落ちる雫。店主はうちわと蝋燭で待つ。
 *
 * **7枚のうちでいちばん暗い絵。**慌てさせるのではなく、
 * 「待つしかない」しんとした様子で伝える。
 *
 * 動くのは4つ: 蝋燭の炎、冷蔵ケースから落ちる雫、うちわ、
 * 遠くの窓がひとつ消える瞬間。止めても「開いた冷蔵ケースと真っ暗な窓」で伝わる。
 */
export function EgyptBlackout() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 熱の残る夜。地色はいちばん暗い。 */}
      <rect width="400" height="210" fill="#171d2c" />
      <rect width="400" height="66" fill="#202942" />

      {/* 集合住宅の谷間。窓はほとんど真っ暗。 */}
      <g fill="#2a2536">
        <rect x="0" y="10" width="70" height="132" />
        <rect x="72" y="34" width="52" height="108" />
        <rect x="278" y="22" width="60" height="120" />
        <rect x="340" y="46" width="60" height="96" />
      </g>
      {/* 消えている窓。 */}
      <g fill="#20263a">
        <rect x="10" y="24" width="13" height="14" />
        <rect x="32" y="24" width="13" height="14" />
        <rect x="10" y="50" width="13" height="14" />
        <rect x="32" y="50" width="13" height="14" />
        <rect x="10" y="76" width="13" height="14" />
        <rect x="32" y="76" width="13" height="14" />
        <rect x="84" y="48" width="12" height="13" />
        <rect x="104" y="48" width="12" height="13" />
        <rect x="84" y="74" width="12" height="13" />
        <rect x="288" y="36" width="13" height="14" />
        <rect x="312" y="36" width="13" height="14" />
        <rect x="288" y="62" width="13" height="14" />
        <rect x="312" y="62" width="13" height="14" />
        <rect x="352" y="60" width="12" height="13" />
        <rect x="374" y="60" width="12" height="13" />
        <rect x="352" y="86" width="12" height="13" />
      </g>
      {/* 発電機を回している一軒だけが灯っている。 */}
      <g fill="#e0a83c" opacity="0.9">
        <rect x="104" y="74" width="12" height="13" />
        <rect x="374" y="86" width="12" height="13" />
      </g>
      {/* 消えかけの窓。**ひとつだけ明滅して落ちる。** */}
      <rect
        className="egypt-bo-dying"
        x="312"
        y="88"
        width="13"
        height="14"
        fill="#e0a83c"
      />

      {/* 街路と店の床。 */}
      <rect y="142" width="400" height="68" fill="#241f2e" />
      <rect y="142" width="400" height="6" fill="#332c3e" />

      {/* 店先の庇。暗がりに沈みきらないよう、縞を残す。 */}
      <path d="M118,116 h190 l9,12 H109z" fill="#5a4650" />
      <g fill="#7a4a46">
        <path d="M126,116 h20 l-9,12 h-20z" />
        <path d="M166,116 h20 l-9,12 h-20z" />
        <path d="M206,116 h20 l-9,12 h-20z" />
        <path d="M246,116 h20 l-9,12 h-20z" />
        <path d="M286,116 h20 l-9,12 h-20z" />
      </g>
      <g fill="#3c3040">
        <rect x="112" y="128" width="6" height="16" />
        <rect x="310" y="128" width="6" height="16" />
      </g>

      {/* 扉の開いた冷蔵ケース。**止めても残る主役。** */}
      <g>
        <rect x="212" y="128" width="96" height="70" rx="4" fill="#3c4456" />
        <rect x="218" y="134" width="84" height="58" fill="#232a38" />
        {/* 開いた扉。中の冷気は残っていない。 */}
        <path d="M308,128 l40,-12 v78 l-40,4z" fill="#4a5468" opacity="0.9" />
        <path d="M312,133 l32,-9 v66 l-32,3z" fill="#6d8fa8" opacity="0.35" />
        {/* 棚と、傷みかけの生鮮品。 */}
        <rect x="218" y="156" width="84" height="4" fill="#3c4456" />
        <rect x="218" y="176" width="84" height="4" fill="#3c4456" />
        <g fill="#7f8f4a">
          <circle cx="232" cy="149" r="7" />
          <circle cx="248" cy="151" r="6" />
        </g>
        <g fill="#8a5f3c">
          <circle cx="268" cy="150" r="6.4" />
          <circle cx="284" cy="151" r="5.6" />
        </g>
        <g fill="#6a4a52">
          <rect x="226" y="164" width="20" height="12" rx="2" />
          <rect x="252" y="166" width="18" height="10" rx="2" />
          <rect x="276" y="164" width="22" height="12" rx="2" />
        </g>
        {/* 溶けはじめた氷。 */}
        <g fill="#8fb4c4" opacity="0.5">
          <rect x="230" y="184" width="16" height="7" rx="2" />
          <rect x="252" y="185" width="13" height="6" rx="2" />
          <rect x="272" y="184" width="15" height="7" rx="2" />
        </g>
      </g>
      {/* 落ちる雫と、床に広がった水たまり。 */}
      <ellipse cx="258" cy="200" rx="34" ry="6" fill="#3f5a6a" opacity="0.7" />
      <g className="egypt-bo-drip" fill="#8fd0dc">
        <path d="M258,196 q-3,4 0,6 q3,-2 0,-6z" />
      </g>

      {/* 店主。うちわと蝋燭だけで待っている。
       **蝋燭の光の輪を先に敷いて**、暗がりの中でも人が見えるようにする。 */}
      <g transform="translate(140,0)">
        <circle cx="-30" cy="152" r="52" fill="#f5b31c" opacity="0.09" />
        <circle cx="-30" cy="152" r="30" fill="#f5b31c" opacity="0.13" />
        <rect x="-24" y="176" width="46" height="8" fill="#4a3c46" />
        <circle cx="0" cy="140" r="9" fill="#9a7450" />
        <path d="M-9,152 q-4,14 -2,24 h20 q-5,-16 -5,-24z" fill="#efe8d6" />
        <path d="M-6,176 v-4 h14 v4" fill="#efe8d6" />
        <g className="egypt-bo-fan">
          <path d="M8,150 q16,-4 22,-16 l6,4 q-6,16 -26,20z" fill="#d8b478" />
        </g>
        {/* 蝋燭。 */}
        <rect x="-34" y="160" width="8" height="16" fill="#efe8d6" />
        <g className="egypt-bo-flame">
          <path d="M-30,160 q-6,-8 0,-14 q6,6 0,14z" fill="#f5b31c" />
          <path d="M-30,158 q-3,-5 0,-9 q3,4 0,9z" fill="#f7e2a0" />
        </g>
      </g>

      <style>{`
        .egypt-bo-flame {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: egypt-bo-flicker 1.5s ease-in-out infinite;
        }
        @keyframes egypt-bo-flicker {
          0%, 100% { transform: scale(1) skewX(0deg); opacity: 1; }
          30% { transform: scale(0.82, 1.12) skewX(6deg); opacity: 0.8; }
          65% { transform: scale(1.08, 0.9) skewX(-5deg); opacity: 1; }
        }
        .egypt-bo-drip {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: egypt-bo-fall 2.1s ease-in infinite;
        }
        @keyframes egypt-bo-fall {
          0% { transform: translateY(-8px) scaleY(0.7); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translateY(6px) scaleY(1.3); opacity: 0; }
        }
        .egypt-bo-fan {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: egypt-bo-fanning 1.1s ease-in-out infinite;
        }
        @keyframes egypt-bo-fanning {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-20deg); }
        }
        .egypt-bo-dying {
          animation: egypt-bo-cutout 4.4s steps(1, end) infinite;
        }
        @keyframes egypt-bo-cutout {
          0%, 55% { opacity: 0.9; }
          60%, 70% { opacity: 0.2; }
          75%, 100% { opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .egypt-bo-flame,
          .egypt-bo-drip,
          .egypt-bo-fan,
          .egypt-bo-dying { animation: none; }
        }
      `}</style>
    </svg>
  );
}
