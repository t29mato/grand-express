/**
 * テホ場での散々な夜(コロンビア盤の厄災 5/7・payOthers)。
 *
 * 構図表の担当:**夜・屋内のコート正面・粘土の的と金の火花が主役・人3。
 * 屋外と空は描かない。**
 *
 * 粘土の的に仕込んだメチャ(火薬の紙包)は、他人の投げでは弾けるのに
 * 自分の番では鳴らない——そして賭け金だけが育っていく。
 * 投げたテホ(鉄の円盤)が的に届き、火花がぱっと開く。勝った側は乾杯している。
 * 動くのは**円盤の軌道・火花・揺れる裸電球・勝者のビール瓶**。
 * 止めた状態でも、的に刺さった円盤+開いた火花+乾杯で「勝負がついた」と分かる。
 */
export function ColombiaTejoApuestaPerdida() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の屋内。藍色の壁と木の梁 */}
      <rect width="400" height="210" fill="#2b3450" />
      <rect width="400" height="8" fill="#1f2740" />
      <g fill="#4a3a28">
        <rect x="0" y="8" width="400" height="7" />
        <rect x="36" y="8" width="7" height="40" />
        <rect x="180" y="8" width="7" height="34" />
        <rect x="330" y="8" width="7" height="40" />
      </g>
      {/* 奥の壁の棚と瓶 */}
      <rect x="20" y="56" width="86" height="4" fill="#4a3a28" />
      <g fill="#7a5c30">
        <rect x="28" y="42" width="7" height="14" rx="2" />
        <rect x="42" y="44" width="7" height="12" rx="2" />
        <rect x="58" y="42" width="7" height="14" rx="2" />
        <rect x="74" y="44" width="7" height="12" rx="2" />
      </g>

      {/* 揺れる裸電球2つ */}
      <g className="tej-lamp1">
        <path d="M140,15 v22" stroke="#1f2740" strokeWidth="2" fill="none" />
        <circle cx="140" cy="42" r="13" fill="#f5d78a" opacity="0.22" />
        <circle cx="140" cy="42" r="6" fill="#f5d78a" />
      </g>
      <g className="tej-lamp2">
        <path d="M296,15 v18" stroke="#1f2740" strokeWidth="2" fill="none" />
        <circle cx="296" cy="38" r="11" fill="#f5d78a" opacity="0.2" />
        <circle cx="296" cy="38" r="6" fill="#f5d78a" />
      </g>

      {/* 床:踏み固めた土 */}
      <rect y="150" width="400" height="60" fill="#5f4c33" />
      <rect y="150" width="400" height="6" fill="#6f5a3e" />

      {/* 的:斜めに構えた粘土の箱(カンチャ)。右側 */}
      <g transform="translate(322,0)">
        <ellipse cx="0" cy="158" rx="52" ry="7" fill="#000" opacity="0.25" />
        <path d="M-44,152 L44,152 L34,96 L-34,96 Z" fill="#7a5c30" />
        <path d="M-34,100 L34,100 L28,110 L-28,110 Z" fill="#5f4526" />
        {/* 粘土面 */}
        <path d="M-38,148 L38,148 L30,104 L-30,104 Z" fill="#a85a3a" />
        <path d="M-34,144 L34,144 L28,110 L-28,110 Z" fill="#b06a45" />
        {/* 中央の金属の輪(ボシン)とメチャ(紙の三角) */}
        <circle cx="0" cy="126" r="9" fill="#8f5230" stroke="#e8c87a" strokeWidth="2.6" />
        <g fill="#f2efe4">
          <path d="M-8,120 l5,-6 l3,6 z" />
          <path d="M2,132 l5,-6 l3,6 z" />
          <path d="M-10,133 l4,-5 l3,5 z" />
        </g>
        {/* 過去の投擲の跡(めり込んだ円盤と穴) */}
        <circle cx="-18" cy="138" r="4.6" fill="#6f5c3b" />
        <circle cx="16" cy="116" r="4" fill="#6f5c3b" />
        {/* 刺さったテホ(主役の終着点)。静的位置=命中 */}
        <g className="tej-disc">
          <ellipse cx="0" cy="125" rx="7.4" ry="6.4" fill="#8a8f92" />
          <ellipse cx="-1" cy="124" rx="4" ry="3.4" fill="#b8bec2" />
        </g>
        {/* 火花(開いた状態が基準) */}
        <g className="tej-burst">
          <g stroke="#f5b31c" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M0,112 v-12 M12,116 l8,-9 M-12,116 l-8,-9 M16,126 l11,-2 M-16,126 l-11,-2" />
          </g>
          <g fill="#f5d78a">
            <circle cx="0" cy="96" r="2.6" />
            <circle cx="22" cy="104" r="2.2" />
            <circle cx="-22" cy="104" r="2.2" />
          </g>
        </g>
      </g>

      {/* 投げた人:緑シャツ。振り抜いた姿勢のまま(左) */}
      <g transform="translate(96,0)">
        <ellipse cx="0" cy="196" rx="15" ry="4" fill="#000" opacity="0.25" />
        <path d="M-6,168 l-4,26 h6 l4,-22 z" fill="#3f3428" />
        <path d="M4,168 l8,24 h6 l-8,-26 z" fill="#3f3428" />
        <path d="M-9,136 h18 l4,34 h-24 z" fill="#3f8f52" />
        <circle cx="2" cy="128" r="7.6" fill="#c98f5f" />
        <path d="M-5,124 a8,8 0 0 1 14,-2 l-1,3 z" fill="#33302c" />
        {/* 振り抜いた腕 */}
        <g className="tej-arm">
          <path d="M8,142 q16,-12 26,-26" stroke="#3f8f52" strokeWidth="5.4" strokeLinecap="round" fill="none" />
          <circle cx="34" cy="116" r="3.4" fill="#c98f5f" />
        </g>
        <path d="M-8,142 l-10,10" stroke="#3f8f52" strokeWidth="5.4" strokeLinecap="round" fill="none" />
      </g>

      {/* 飛んでいくテホの残像(軌道)。基準=的に着いた側で薄く */}
      <g className="tej-trace" opacity="0.5">
        <ellipse cx="180" cy="118" rx="5" ry="4.4" fill="#8a8f92" opacity="0.35" />
        <ellipse cx="236" cy="112" rx="5.6" ry="4.8" fill="#8a8f92" opacity="0.5" />
      </g>

      {/* 勝った2人:テーブルで乾杯(中央手前) */}
      <g transform="translate(196,0)">
        {/* テーブルと賭け金の紙幣・瓶 */}
        <ellipse cx="0" cy="200" rx="40" ry="6" fill="#000" opacity="0.25" />
        <rect x="-34" y="176" width="68" height="6" rx="2" fill="#8a6b3a" />
        <rect x="-28" y="182" width="5" height="20" fill="#6b5330" />
        <rect x="23" y="182" width="5" height="20" fill="#6b5330" />
        <g fill="#8f9a5a">
          <rect x="-14" y="170" width="12" height="6" rx="1" transform="rotate(-8 -8 173)" />
          <rect x="-2" y="169" width="12" height="6" rx="1" transform="rotate(6 4 172)" />
        </g>
        <rect x="12" y="164" width="6" height="13" rx="2" fill="#7a5c30" />
        <rect x="-22" y="165" width="6" height="12" rx="2" fill="#7a5c30" />
      </g>
      {/* 勝者1:黄シャツ、瓶を掲げる */}
      <g transform="translate(158,0)">
        <path d="M-5,166 v28 h5 v-28 z M5,166 v28 h5 v-28 z" fill="#4a3a30" />
        <path d="M-9,134 h18 l3,32 h-24 z" fill="#f5b31c" />
        <circle cx="0" cy="126" r="7.4" fill="#8a6a4a" />
        <g className="tej-cheer">
          <path d="M8,140 q12,-8 16,-20" stroke="#f5b31c" strokeWidth="5" strokeLinecap="round" fill="none" />
          <rect x="20" y="106" width="6" height="14" rx="2.4" fill="#7a5c30" />
        </g>
        <path d="M-8,140 l-8,12" stroke="#f5b31c" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
      {/* 勝者2:空色シャツ、笑って指をさす */}
      <g transform="translate(238,0)">
        <path d="M-5,166 v28 h5 v-28 z M5,166 v28 h5 v-28 z" fill="#3f3428" />
        <path d="M-9,134 h18 l3,32 h-24 z" fill="#5b8fe8" />
        <circle cx="0" cy="126" r="7.4" fill="#c98f5f" />
        <path d="M-7,121 a7.6,7.6 0 0 1 14,0 z" fill="#5a4630" />
        <path d="M-8,140 l-14,-6" stroke="#5b8fe8" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M8,142 l10,8" stroke="#5b8fe8" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>

      {/* 手前:空いた瓶が並ぶ(夜が長かった) */}
      <g fill="#7a5c30">
        <rect x="20" y="192" width="7" height="16" rx="2.6" />
        <rect x="34" y="196" width="7" height="14" rx="2.6" />
        <rect x="366" y="194" width="7" height="15" rx="2.6" />
      </g>

      <style>{`
        .tej-disc {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: tej-throw 3.6s cubic-bezier(.3,.7,.5,1) infinite;
        }
        @keyframes tej-throw {
          0%, 8%   { transform: translate(-192px, -4px) rotate(-160deg); opacity: 0; }
          10%      { opacity: 1; }
          38%      { transform: translate(-90px, -34px) rotate(-60deg); }
          58%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
        }
        .tej-burst {
          transform-box: fill-box;
          transform-origin: 50% 80%;
          animation: tej-flash 3.6s ease-out infinite;
        }
        @keyframes tej-flash {
          0%, 55%  { transform: scale(0.1); opacity: 0; }
          62%      { transform: scale(1.15); opacity: 1; }
          78%      { transform: scale(1); opacity: 0.9; }
          100%     { transform: scale(1); opacity: 0; }
        }
        .tej-trace { animation: tej-fade 3.6s linear infinite; }
        @keyframes tej-fade {
          0%, 30%  { opacity: 0; }
          45%      { opacity: 0.55; }
          60%, 100% { opacity: 0; }
        }
        .tej-arm {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: tej-swing 3.6s ease-in-out infinite;
        }
        @keyframes tej-swing {
          0%       { transform: rotate(60deg); }
          10%, 100% { transform: rotate(0deg); }
        }
        .tej-lamp1, .tej-lamp2 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: tej-sway 4.8s ease-in-out infinite;
        }
        .tej-lamp2 { animation-delay: 1.2s; }
        @keyframes tej-sway {
          0%, 100% { transform: rotate(3deg); }
          50%      { transform: rotate(-3deg); }
        }
        .tej-cheer {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: tej-toast 2.8s ease-in-out infinite;
        }
        @keyframes tej-toast {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-10deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tej-disc, .tej-burst, .tej-trace, .tej-arm, .tej-lamp1, .tej-lamp2, .tej-cheer {
            animation: none;
          }
          /* 円盤は的に刺さり、火花は開いた状態で止まる */
          .tej-trace { opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
