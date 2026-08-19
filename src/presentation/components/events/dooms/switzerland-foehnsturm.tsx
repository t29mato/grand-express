/**
 * フェーン嵐が吹き荒れる。ふだんは頭痛の種でしかない温かい風が一夜で暴風になり、
 * 屋根の瓦を剥ぎ、固定されていないものを谷じゅうでなぎ倒した。
 * 消防団はこういう夜、眠らずに待機する——鎧戸を壊したのと同じ乾いた風が、
 * 飛び火にとって好都合な条件でもあるからである。
 *
 * 構図: 稜線に**フェーンの雲の壁**(この風の目印)。屋根から瓦が剥がれて
 * 野地板がむき出しになり、剥がれた瓦が横向きに飛んでいく。
 * 右に**灯りをつけて開いている消防団の車庫**と、外を見ている団員。
 * 左手前は**飛ばされかけた洗濯物を取り込もうと手を伸ばしている人**。
 * 木も洗濯物も鎧戸も、**倒れる向きを全部そろえる**(風の絵はこれで決まる)。
 *
 * 動くのは6つ: 飛ぶ瓦、流れる雲、しなる木、はためく鎧戸と洗濯物、
 * 車庫の灯り、舞い上がる火の粉。止めても「瓦の抜けた屋根と、飛んでいる瓦」で伝わる。
 */
export function SwitzerlandFoehnsturm() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 生ぬるい夜明け前の空。フェーンの日の妙に温かい色。 */}
      <rect width="400" height="210" fill="#c98f5c" />
      <rect width="400" height="92" fill="#8a6a58" />
      <rect width="400" height="46" fill="#5f4a4e" />

      {/* 稜線と、**フェーンの雲の壁。**峰の向こうから垂れ下がる。 */}
      <path d="M0,96L70,44L128,84L196,36L264,88L330,48L400,92V210H0z" fill="#4f4a52" />
      <g className="chf-wall" fill="#d8b49a" opacity="0.55">
        <ellipse cx="90" cy="52" rx="80" ry="20" />
        <ellipse cx="220" cy="42" rx="90" ry="18" />
        <ellipse cx="340" cy="56" rx="70" ry="16" />
      </g>
      <g className="chf-wall2" fill="#f0d0b0" opacity="0.4">
        <ellipse cx="150" cy="66" rx="110" ry="14" />
        <ellipse cx="330" cy="74" rx="90" ry="12" />
      </g>

      {/* 谷の斜面と、同じ向きにしなる木。 */}
      <path d="M0,120q90,-14 180,-2q98,13 220,-8v40H0z" fill="#3f4a3a" />
      <rect y="140" width="400" height="70" fill="#4f5a42" />
      <rect y="168" width="400" height="42" fill="#5a6448" />
      <g className="chf-tree1" fill="#2b3a2c">
        <path d="M28,168l-6,-30l16,4l-10,-16l18,6l-12,-14l22,10l-8,-12l24,18l-30,34z" />
      </g>
      <g className="chf-tree2" fill="#25332a">
        <path d="M352,176l-4,-26l14,4l-8,-14l16,6l-10,-12l22,16l-24,26z" />
      </g>

      {/* 瓦の抜けた屋根の家。**野地板が出ている。** */}
      <g>
        <rect x="96" y="126" width="128" height="60" fill="#e0d6bf" />
        <rect x="96" y="126" width="128" height="5" fill="#c9bfa6" />
        <g fill="#5f7f96">
          <rect x="110" y="140" width="20" height="18" />
          <rect x="188" y="140" width="20" height="18" />
        </g>
        <path d="M148,186v-26a14,14 0 0 1 28,0v26z" fill="#6b4423" />
        {/* 屋根。左半分は瓦、右半分は剥がれて野地板。 */}
        <path d="M88,126h144l-30,-32h-84z" fill="#8a5040" />
        <g stroke="#6f3f32" strokeWidth="1.6" opacity="0.8" fill="none">
          <path d="M96,118h128M104,110h112M112,102h96" />
        </g>
        <path d="M168,126h64l-30,-32h-16z" fill="#a8865c" />
        <g stroke="#7f6440" strokeWidth="2" fill="none">
          <path d="M176,118h48M182,110h40M190,102h26M186,94l-10,32M204,94l-8,32" />
        </g>
        {/* 剥がれかけの一枚。 */}
        <path d="M214,102l18,4l-4,10l-18,-4z" fill="#8a5040" />
      </g>

      {/* はためく洗濯物と、外れかけた鎧戸。 */}
      <g className="chf-shutter">
        <rect x="208" y="140" width="6" height="18" fill="#4a6b52" />
      </g>
      <path d="M40,136h44" stroke="#8a8578" strokeWidth="1.6" fill="none" />
      <g className="chf-cloth1">
        <path d="M44,136h16l4,18h-22z" fill="#f2ede0" />
      </g>
      <g className="chf-cloth2">
        <path d="M68,136h14l3,14h-19z" fill="#5b8fe8" />
      </g>

      {/* 消防団の車庫。灯りがついていて、扉が開いている。 */}
      <g>
        <rect x="268" y="120" width="120" height="66" fill="#9a8f80" />
        <path d="M262,120h132l-12,-14H274z" fill="#4f4a44" />
        <rect x="284" y="136" width="86" height="50" fill="#241f1c" />
        <rect x="284" y="132" width="86" height="6" fill="#5f5a52" />
        {/* 中の消防車。 */}
        <rect x="296" y="150" width="62" height="26" rx="3" fill="#c2453c" />
        <rect x="296" y="150" width="62" height="4" fill="#e0665c" />
        <g fill="#f5d06a">
          <rect x="302" y="156" width="10" height="8" />
          <rect x="318" y="156" width="10" height="8" />
        </g>
        <g fill="#2f3338">
          <circle cx="308" cy="178" r="5" />
          <circle cx="346" cy="178" r="5" />
        </g>
        <circle className="chf-lamp" cx="376" cy="128" r="5" fill="#f5b31c" />
        <circle className="chf-lamp" cx="376" cy="128" r="11" fill="#f5b31c" opacity="0.25" />
      </g>

      {/* 外を見ている消防団員(車庫の前)。腰に手を当てて立っている。 */}
      <g transform="translate(376,0)">
        <ellipse cx="0" cy="186" rx="11" ry="3.4" fill="#000" opacity="0.2" />
        <path d="M-5,186l-2,-18h12l-2,18z" fill="#2f3338" />
        <path d="M-9,168q0,-17 9,-17q9,0 9,17z" fill="#3f454c" />
        <path d="M-9,160h18" stroke="#f5b31c" strokeWidth="3" fill="none" />
        <path d="M-8,164l-6,6M8,164l6,6" stroke="#3f454c" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="0" cy="144" r="7.6" fill="#e0b48a" />
        <path d="M-9,143q0,-9 9,-9q9,0 9,9z" fill="#c2453c" />
        <path d="M-11,144h22v2.6h-22z" fill="#a03830" />
      </g>

      {/* 鎧戸を押さえている人(左手前)。風上に体を傾けている。 */}
      <g transform="translate(56,0)">
        <ellipse cx="0" cy="196" rx="12" ry="3.6" fill="#000" opacity="0.2" />
        <path d="M-7,196l2,-18h12l-2,18z" fill="#3f3a34" />
        <path d="M-10,178q-2,-18 8,-19q10,-1 10,17z" fill="#4a6b52" />
        <circle cx="4" cy="152" r="8" fill="#c99a70" />
        <path d="M-5,151q1,-10 9,-10q8,0 9,10z" fill="#6b5330" />
        <path d="M6,164l16,-8" stroke="#c99a70" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M2,166l12,-14" stroke="#c99a70" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>

      {/* **飛んでいく瓦。**風の向きを1つに揃える。 */}
      <g className="chf-tile1">
        <path d="M0,0h20l-4,9H-4z" fill="#8a5040" />
      </g>
      <g className="chf-tile2">
        <path d="M0,0h16l-3,7H-3z" fill="#a05a46" />
      </g>
      <g className="chf-tile3">
        <path d="M0,0h13l-3,6H-3z" fill="#7f4a3c" />
      </g>

      {/* 舞い上がる火の粉。**乾いた風は飛び火の条件でもある。** */}
      <g className="chf-spark" fill="#f5b31c">
        <circle cx="286" cy="150" r="2" />
        <circle cx="300" cy="140" r="1.6" />
        <circle cx="272" cy="132" r="1.4" />
      </g>

      <style>{`
        .chf-wall, .chf-wall2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .chf-wall  { animation: chf-stream 9s linear infinite; }
        .chf-wall2 { animation: chf-stream 12s linear -4s infinite; }
        @keyframes chf-stream {
          0%   { transform: translateX(-60px); opacity: 0.2; }
          50%  { opacity: 0.6; }
          100% { transform: translateX(60px); opacity: 0.2; }
        }
        .chf-tree1, .chf-tree2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .chf-tree1 { animation: chf-bend 2.4s ease-in-out infinite; }
        .chf-tree2 { animation: chf-bend 2.4s ease-in-out -0.7s infinite; }
        @keyframes chf-bend {
          0%, 100% { transform: skewX(6deg); }
          50%      { transform: skewX(17deg); }
        }
        .chf-cloth1, .chf-cloth2, .chf-shutter {
          transform-box: fill-box;
          transform-origin: 50% 0%;
        }
        .chf-cloth1 { animation: chf-flap 1.5s ease-in-out infinite; }
        .chf-cloth2 { animation: chf-flap 1.5s ease-in-out -0.5s infinite; }
        .chf-shutter { transform-origin: 0% 0%; animation: chf-swing 1.9s ease-in-out infinite; }
        @keyframes chf-flap {
          0%, 100% { transform: skewX(10deg) scaleY(1); }
          50%      { transform: skewX(30deg) scaleY(0.86); }
        }
        @keyframes chf-swing {
          0%, 100% { transform: rotate(4deg); }
          50%      { transform: rotate(26deg); }
        }
        .chf-tile1, .chf-tile2, .chf-tile3 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .chf-tile1 { animation: chf-fly1 2.8s linear infinite; }
        .chf-tile2 { animation: chf-fly2 3.4s linear -1.2s infinite; }
        .chf-tile3 { animation: chf-fly3 2.2s linear -0.6s infinite; }
        @keyframes chf-fly1 {
          0%   { transform: translate(214px, 100px) rotate(0deg); opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: translate(30px, 42px) rotate(-320deg); opacity: 0; }
        }
        @keyframes chf-fly2 {
          0%   { transform: translate(222px, 112px) rotate(0deg); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translate(46px, 150px) rotate(280deg); opacity: 0; }
        }
        @keyframes chf-fly3 {
          0%   { transform: translate(206px, 96px) rotate(0deg); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translate(64px, 20px) rotate(-220deg); opacity: 0; }
        }
        .chf-lamp { animation: chf-glow 2.6s ease-in-out infinite; }
        @keyframes chf-glow {
          0%, 100% { opacity: 0.45; }
          50%      { opacity: 1; }
        }
        .chf-spark {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: chf-rise 3.6s linear infinite;
        }
        @keyframes chf-rise {
          0%   { transform: translate(0, 10px); opacity: 0; }
          25%  { opacity: 1; }
          100% { transform: translate(-58px, -54px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .chf-wall, .chf-wall2, .chf-tree1, .chf-tree2,
          .chf-cloth1, .chf-cloth2, .chf-shutter,
          .chf-tile1, .chf-tile2, .chf-tile3,
          .chf-lamp, .chf-spark { animation: none; }
          .chf-tree1, .chf-tree2 { transform: skewX(14deg); }
          .chf-cloth1, .chf-cloth2 { transform: skewX(24deg); }
          .chf-shutter { transform: rotate(20deg); }
          .chf-tile1 { transform: translate(120px, 68px) rotate(-140deg); }
          .chf-tile2 { transform: translate(150px, 122px) rotate(120deg); }
          .chf-tile3 { transform: translate(140px, 52px) rotate(-90deg); }
          .chf-spark { transform: translate(-30px, -26px); }
        }
      `}</style>
    </svg>
  );
}
