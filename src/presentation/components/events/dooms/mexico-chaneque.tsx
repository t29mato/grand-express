/**
 * チャネケに化かされる。森の道をいくら歩いても、さっき見たはずの
 * 赤い花の茂みと白い石のところへ何度でも戻ってくる。
 *
 * この盤面の厄災の神は**チャネケ**(ナワトル系民話の、森と泉を守る
 * 小さないたずら好きの精霊)。残酷な悪霊ではないので、木の陰から
 * 顔を出してくすくす笑っている姿で描く。
 *
 * 「同じ道を歩かされている」ことは、**旅人はその場で足踏みし、
 * まったく同じ目印(赤い花の茂み+白い石)が繰り返し流れてくる**ことで示す。
 * 動きを止めても、同じ目印が画面に2組見えていて、木の陰からチャネケが
 * 覗いているので、何が起きたかは分かる。
 */
export function MexicoChaneque() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕暮れの森。 */}
      <rect width="400" height="210" fill="#2a4636" />
      <rect width="400" height="64" fill="#223a2b" />
      {/* 頭上の林冠。 */}
      <g fill="#1b2f22">
        <ellipse cx="40" cy="8" rx="70" ry="26" />
        <ellipse cx="150" cy="2" rx="80" ry="22" />
        <ellipse cx="270" cy="10" rx="76" ry="26" />
        <ellipse cx="380" cy="4" rx="66" ry="24" />
      </g>
      {/* 奥の木立。 */}
      <g fill="#22382a">
        <rect x="30" y="30" width="7" height="100" />
        <rect x="96" y="24" width="8" height="106" />
        <rect x="204" y="30" width="7" height="100" />
        <rect x="258" y="22" width="8" height="108" />
      </g>

      {/* 森の床と、踏み固められた道。 */}
      <rect y="128" width="400" height="82" fill="#3a4a2e" />
      <path d="M0,156 Q200,148 400,154 L400,192 Q200,198 0,190 z" fill="#8a7a58" />
      <path d="M0,156 Q200,148 400,154" stroke="#6b5e44" strokeWidth="2" fill="none" />
      <path d="M0,190 Q200,198 400,192" stroke="#6b5e44" strokeWidth="2" fill="none" />
      {/* 何度も往復した足あと。 */}
      <g fill="#6b5e44" opacity="0.85">
        <ellipse cx="60" cy="170" rx="5" ry="2.6" />
        <ellipse cx="84" cy="176" rx="5" ry="2.6" />
        <ellipse cx="110" cy="169" rx="5" ry="2.6" />
        <ellipse cx="196" cy="178" rx="5" ry="2.6" />
        <ellipse cx="224" cy="171" rx="5" ry="2.6" />
        <ellipse cx="252" cy="177" rx="5" ry="2.6" />
      </g>

      {/* 泉(チャネケの棲む水辺)。左手前。 */}
      <ellipse cx="52" cy="200" rx="44" ry="11" fill="#2f6f9e" />
      <path d="M22,200 q12,-3 26,0" stroke="#7fc4d8" strokeWidth="1.6" fill="none" opacity="0.8" />
      <g stroke="#4a6b3a" strokeWidth="2" strokeLinecap="round">
        <path d="M92,198 L94,182" />
        <path d="M99,199 L99,184" />
      </g>
      <ellipse cx="94" cy="181" rx="2.4" ry="4" fill="#6b4a2a" />
      <ellipse cx="99" cy="183" rx="2.2" ry="3.6" fill="#6b4a2a" />

      {/* 同じ目印が流れてくる(赤い花の茂み+白い石+切り株)。**ここが動く。** */}
      <g className="mxch-scroll">
        {[0, 200, 400].map((dx) => (
          <g key={dx} transform={`translate(${dx},0)`}>
            <circle cx="60" cy="150" r="11" fill="#2f5f38" />
            <circle cx="50" cy="154" r="8" fill="#3a6f42" />
            <g fill="#e8443f">
              <circle cx="55" cy="146" r="2.4" />
              <circle cx="64" cy="150" r="2.2" />
              <circle cx="48" cy="151" r="2" />
            </g>
            <path d="M78,158 a7,4 0 0 1 14,0 l-1,4 h-12 z" fill="#d8d0bc" />
            <rect x="34" y="150" width="8" height="9" fill="#6b4a2a" />
            <ellipse cx="38" cy="150" rx="4.6" ry="1.8" fill="#8a6a44" />
          </g>
        ))}
      </g>

      {/* 旅人。足踏みしながら、同じ景色に首をかしげている。 */}
      <g transform="translate(150,0)">
        <ellipse cx="0" cy="185" rx="14" ry="3.4" fill="#141a12" opacity="0.4" />
        <g className="mxch-body">
          <path className="mxch-leg-a" d="M-4,158 L-7,182" stroke="#3f3428" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path className="mxch-leg-b" d="M4,158 L8,182" stroke="#4d4234" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* サラーペ(縞の肩掛け)。 */}
          <path d="M-10,134 L10,134 L13,162 L-13,162 z" fill="#c85a3f" />
          <path d="M-11,144 L11,144 l1,6 h-13 z" fill="#f4c430" />
          <path d="M-12,152 L12,152 l1,5 h-14 z" fill="#5b8fe8" />
          {/* 荷物の紐と鞄。 */}
          <path d="M-8,138 L10,158" stroke="#6b4a2a" strokeWidth="3" />
          <rect x="8" y="154" width="12" height="10" rx="2" fill="#8a5a3a" />
          {/* 首をかしげた頭とつば広の帽子。 */}
          <g className="mxch-head">
            <circle cx="0" cy="124" r="9" fill="#c98a5f" />
            <circle cx="-3.4" cy="123" r="1.3" fill="#2a1a10" />
            <path d="M-5,129 q3,2 6,1" stroke="#2a1a10" strokeWidth="1.3" fill="none" />
            <ellipse cx="0" cy="117" rx="15" ry="4" fill="#d8b060" />
            <path d="M-7,117 a7,7 0 0 1 14,0 z" fill="#c8a050" />
          </g>
          {/* 頭をかく腕。 */}
          <path d="M9,140 Q16,132 10,122" stroke="#c98a5f" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* チャネケ。セイバの木の陰から覗く(木より先に描いて、陰に隠れる)。 */}
      <g transform="translate(334,0)">
        <g className="mxch-chaneke">
          <circle cx="0" cy="152" r="9" fill="#b5835a" />
          <ellipse cx="-2" cy="143" rx="7" ry="3.4" fill="#3f8f4f" />
          <path d="M-8,142 q6,-5 13,-1" stroke="#2f6b3f" strokeWidth="2" fill="none" />
          <circle cx="-3.6" cy="151" r="2" fill="#f6efe2" />
          <circle cx="2.4" cy="151" r="2" fill="#f6efe2" />
          <circle cx="-3.6" cy="151.5" r="1" fill="#241a10" />
          <circle cx="2.4" cy="151.5" r="1" fill="#241a10" />
          <path d="M-3,157 q3,2.6 6,0" stroke="#241a10" strokeWidth="1.3" fill="none" />
          <rect x="-5" y="160" width="10" height="12" rx="3" fill="#8a6a44" />
          <path d="M-5,164 L-12,160" stroke="#b5835a" strokeWidth="3" strokeLinecap="round" />
          <path d="M-3,172 L-5,178 M3,172 L5,178" stroke="#b5835a" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>

      {/* セイバの大樹(手前・右)。板根が広がる。 */}
      <path d="M322,60 L314,196 L352,196 L342,60 z" fill="#5a4630" />
      <path d="M318,196 L302,196 L318,150 z" fill="#4d3b28" />
      <path d="M348,196 L366,196 L348,150 z" fill="#4d3b28" />
      <path d="M326,80 q6,30 0,60" stroke="#4d3b28" strokeWidth="2.4" fill="none" />
      <ellipse cx="332" cy="48" rx="72" ry="30" fill="#1f4a30" />
      <ellipse cx="286" cy="66" rx="34" ry="16" fill="#2f5f38" />
      <ellipse cx="382" cy="64" rx="30" ry="15" fill="#2f5f38" />

      {/* いたずらの気配(金色の火の粉)。 */}
      <g className="mxch-spark">
        <circle r="3.4" fill="#f5b31c" opacity="0.9" />
        <circle r="7" fill="#f5b31c" opacity="0.3" />
      </g>
      <circle cx="238" cy="108" r="1.8" fill="#f5b31c" opacity="0.6" />
      <circle cx="120" cy="96" r="1.6" fill="#f5b31c" opacity="0.5" />

      <style>{`
        .mxch-scroll {
          animation: mxch-scroll 5s linear infinite;
        }
        @keyframes mxch-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-200px); }
        }
        .mxch-body {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: mxch-bob 0.7s ease-in-out infinite;
        }
        @keyframes mxch-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2.5px); }
        }
        .mxch-leg-a, .mxch-leg-b {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: mxch-step 0.7s ease-in-out infinite;
        }
        .mxch-leg-b { animation-delay: -0.35s; }
        @keyframes mxch-step {
          0%, 100% { transform: rotate(14deg); }
          50%      { transform: rotate(-14deg); }
        }
        .mxch-chaneke {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: mxch-peek 4s ease-in-out infinite;
        }
        @keyframes mxch-peek {
          0%, 8%    { transform: translateX(2px); }
          18%, 62%  { transform: translateX(-30px); }
          40%       { transform: translateX(-30px) rotate(-6deg); }
          74%, 100% { transform: translateX(2px); }
        }
        .mxch-spark {
          animation: mxch-drift 4s ease-in-out infinite;
        }
        @keyframes mxch-drift {
          0%   { transform: translate(292px, 140px); opacity: 0.4; }
          35%  { transform: translate(268px, 112px); opacity: 1; }
          70%  { transform: translate(288px, 92px); opacity: 0.5; }
          100% { transform: translate(292px, 140px); opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mxch-scroll, .mxch-body, .mxch-leg-a, .mxch-leg-b,
          .mxch-chaneke, .mxch-spark {
            animation: none;
          }
          /* 止まっていても分かるように: チャネケは覗いた姿勢で固定。 */
          .mxch-chaneke { transform: translateX(-30px); }
          .mxch-spark { transform: translate(280px, 112px); }
        }
      `}</style>
    </svg>
  );
}
