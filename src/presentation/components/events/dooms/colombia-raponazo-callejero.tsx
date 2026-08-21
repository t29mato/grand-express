/**
 * 混雑した通りでのラポナソ(コロンビア盤の厄災 7/7・steal)。
 *
 * 構図表の担当:**真昼の強い日差し・街路を横から・走る影と電話が主役・人3。
 * 街は暖色、走り去る者だけ無彩色**(誰でもない「速さ」だけの存在にする)。
 *
 * 手が電話をひったくった、その3軒先。被害者は手を伸ばしたまま、
 * 通行人は振り向いたばかり。ラポナソは始まると同時に終わる。
 * 動くのは**走る者の跳ね・モーションライン・飛んだ麦わら帽・驚いて
 * 飛び立つ鳩**。止めた状態でも、伸ばした手と走り去る背中で「盗られた」と分かる。
 */
export function ColombiaRaponazoCallejero() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 真昼の空(短い帯)と強い光 */}
      <rect width="400" height="210" fill="#9fc8e0" />
      <circle cx="52" cy="22" r="13" fill="#f5c84a" />

      {/* 商店の連なり(色鮮やか。3軒) */}
      <g>
        {/* 店1:黄 */}
        <rect x="0" y="36" width="132" height="120" fill="#e8b83f" />
        <rect x="0" y="36" width="132" height="7" fill="#c8944a" />
        <path d="M8,64 h116 l-8,18 H16 Z" fill="#c8452f" />
        <path d="M8,64 h116" stroke="#8a2f24" strokeWidth="2" />
        <g fill="#f2ece0">
          <path d="M20,82 h12 l-3,8 h-12 z" />
          <path d="M48,82 h12 l-3,8 h-12 z" />
          <path d="M76,82 h12 l-3,8 h-12 z" />
          <path d="M104,82 h12 l-3,8 h-12 z" />
        </g>
        <rect x="18" y="96" width="42" height="60" fill="#7a5c30" />
        <rect x="24" y="102" width="30" height="34" fill="#f5d78a" />
        {/* 果物の山棚 */}
        <rect x="76" y="120" width="44" height="36" fill="#8a6b3a" />
        <g>
          <circle cx="86" cy="118" r="5" fill="#e8443f" />
          <circle cx="97" cy="116" r="5" fill="#f5b31c" />
          <circle cx="108" cy="118" r="5" fill="#8fae4a" />
          <circle cx="92" cy="110" r="5" fill="#c8944a" />
          <circle cx="103" cy="109" r="5" fill="#e8443f" />
        </g>
      </g>
      <g>
        {/* 店2:空色 */}
        <rect x="132" y="44" width="128" height="112" fill="#7ab0c8" />
        <rect x="132" y="44" width="128" height="7" fill="#4f8fae" />
        <path d="M140,72 h112 l-7,16 h-98 z" fill="#f2ece0" />
        <g stroke="#c8452f" strokeWidth="7" fill="none">
          <path d="M146,73 l-5,13 M168,73 l-5,13 M190,73 l-5,13 M212,73 l-5,13 M234,73 l-5,13" />
        </g>
        <rect x="150" y="96" width="40" height="60" fill="#33506b" />
        <rect x="156" y="102" width="28" height="32" fill="#bfe0ee" />
        <rect x="206" y="96" width="40" height="60" fill="#33506b" />
        <rect x="212" y="102" width="28" height="32" fill="#bfe0ee" />
      </g>
      <g>
        {/* 店3:桃色 */}
        <rect x="260" y="38" width="140" height="118" fill="#d88a9a" />
        <rect x="260" y="38" width="140" height="7" fill="#b0546a" />
        <path d="M268,66 h124 l-8,18 h-108 z" fill="#4f7f6a" />
        <g fill="#f2ece0">
          <path d="M280,84 h12 l-3,8 h-12 z" />
          <path d="M310,84 h12 l-3,8 h-12 z" />
          <path d="M340,84 h12 l-3,8 h-12 z" />
          <path d="M368,84 h12 l-3,8 h-12 z" />
        </g>
        <rect x="278" y="98" width="44" height="58" fill="#7a4a56" />
        <rect x="284" y="104" width="32" height="32" fill="#f2d8c8" />
        <rect x="336" y="98" width="46" height="58" fill="#7a4a56" />
      </g>

      {/* 歩道と車道。真昼の濃い影 */}
      <rect y="156" width="400" height="54" fill="#c2b494" />
      <rect y="156" width="400" height="5" fill="#d8ccaa" />
      <rect y="192" width="400" height="18" fill="#8a8578" />
      <g fill="#000" opacity="0.14">
        <path d="M0,156 h132 l-10,10 H0 Z" />
        <path d="M260,156 h140 v10 h-130 z" />
      </g>

      {/* 被害者:紫のシャツ。手を伸ばしたまま(左) */}
      <g transform="translate(96,0)">
        <ellipse cx="0" cy="188" rx="14" ry="4" fill="#000" opacity="0.22" />
        <path d="M-6,160 l-3,26 h6 l3,-24 z" fill="#4a3a30" />
        <path d="M4,160 l6,26 h6 l-7,-26 z" fill="#4a3a30" />
        <path d="M-9,128 h18 l3,34 h-24 z" fill="#8a5a9a" />
        <circle cx="1" cy="120" r="7.6" fill="#8a6a4a" />
        <path d="M-6,115 a7.8,7.8 0 0 1 14,1 l-14,1 z" fill="#33302c" />
        {/* 伸ばした腕(基準=伸びきった状態) */}
        <g className="rap-reach">
          <path d="M8,134 L34,120" stroke="#8a5a9a" strokeWidth="5.4" strokeLinecap="round" fill="none" />
          <circle cx="37" cy="118" r="3.4" fill="#8a6a4a" />
        </g>
        <path d="M-8,134 l-8,10" stroke="#8a5a9a" strokeWidth="5.4" strokeLinecap="round" fill="none" />
        {/* 落とした買い物袋 */}
        <path d="M-22,178 q0,-9 8,-9 q8,0 8,9 l-2,8 h-12 z" fill="#c8944a" />
        <circle cx="-18" cy="188" r="3.4" fill="#e8443f" />
        <circle cx="-8" cy="190" r="3.4" fill="#8fae4a" />
      </g>

      {/* 走り去る者:無彩色のシルエット。**すでに3軒先(右)** */}
      <g transform="translate(312,0)">
        <g className="rap-runner">
          <ellipse cx="0" cy="188" rx="16" ry="4" fill="#000" opacity="0.22" />
          {/* 大きく開いた脚 */}
          <path d="M-4,158 L-26,180 l4,5 L-1,166 Z" fill="#4a4a4a" />
          <path d="M2,158 L20,176 l6,-3 L10,156 Z" fill="#4a4a4a" />
          <path d="M-28,183 l-8,2 l1,4 l9,-1 z" fill="#33302c" />
          <path d="M24,175 l8,-4 l3,3 l-8,5 z" fill="#33302c" />
          {/* 前傾の胴 */}
          <path d="M-8,132 l20,-4 l6,30 l-22,4 z" fill="#5f5f5f" />
          <circle cx="16" cy="122" r="7.2" fill="#6f6f6f" />
          {/* 後ろへ流れる腕/前の腕は電話を握る */}
          <path d="M-6,138 l-18,8" stroke="#5f5f5f" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M14,136 l20,-10" stroke="#5f5f5f" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* 奪った電話(黒い板が手の先に) */}
          <rect x="34" y="118" width="8" height="13" rx="2" fill="#33302c" />
          <rect x="35.4" y="120" width="5.2" height="9" rx="1" fill="#5b8fe8" />
        </g>
        {/* モーションライン */}
        <g className="rap-lines" stroke="#f2efe4" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85">
          <path d="M-44,132 h-26 M-40,148 h-34 M-46,164 h-24" />
        </g>
      </g>

      {/* 通行人:緑シャツ。振り向いたばかり(中央) */}
      <g transform="translate(206,0)">
        <ellipse cx="0" cy="192" rx="13" ry="3.6" fill="#000" opacity="0.2" />
        <rect x="-5.4" y="166" width="5" height="26" fill="#3f3428" />
        <rect x="1" y="166" width="5" height="26" fill="#3f3428" />
        <path d="M-9,136 h18 l3,32 h-24 z" fill="#4f9a5f" />
        <g className="rap-turn">
          <circle cx="0" cy="128" r="7.4" fill="#c98f5f" />
          <path d="M-7.4,126 a7.6,7.6 0 0 1 10,-6 l-2,8 z" fill="#5a4630" />
        </g>
        <path d="M-8,142 l-6,14" stroke="#4f9a5f" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M8,142 l7,-11" stroke="#4f9a5f" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>

      {/* 飛んだ麦わら帽(奪られた勢いで) */}
      <g className="rap-hat">
        <ellipse cx="156" cy="118" rx="11" ry="3.4" fill="#e0c88a" />
        <path d="M150,116 a7,5 0 0 1 12,0 z" fill="#d0b878" />
      </g>

      {/* 驚いて飛び立つ鳩 */}
      <g className="rap-doves" stroke="#f2f2ee" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M252,96 q4,-5 8,0 q4,-5 8,0" />
        <path d="M276,84 q3.4,-4.4 6.8,0 q3.4,-4.4 6.8,0" />
      </g>

      <style>{`
        .rap-runner {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: rap-dash 0.8s ease-in-out infinite;
        }
        @keyframes rap-dash {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-7px) rotate(2deg); }
        }
        .rap-lines { animation: rap-zoom 0.8s linear infinite; }
        @keyframes rap-zoom {
          0%   { transform: translateX(0); opacity: 0.85; }
          100% { transform: translateX(-28px); opacity: 0; }
        }
        .rap-reach {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: rap-grasp 2.6s ease-in-out infinite;
        }
        @keyframes rap-grasp {
          0%, 100% { transform: rotate(0deg); }
          45%      { transform: rotate(-6deg); }
        }
        .rap-turn {
          transform-box: fill-box;
          transform-origin: 50% 90%;
          animation: rap-look 2.6s ease-in-out infinite;
        }
        @keyframes rap-look {
          0%, 100% { transform: rotate(0deg); }
          40%      { transform: rotate(8deg); }
        }
        .rap-hat {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: rap-tumble 2.6s ease-out infinite;
        }
        @keyframes rap-tumble {
          0%   { transform: translate(-36px, -10px) rotate(-30deg); opacity: 0; }
          18%  { opacity: 1; }
          60%  { transform: translate(0px, 28px) rotate(14deg); }
          80%, 100% { transform: translate(4px, 46px) rotate(20deg); opacity: 1; }
        }
        .rap-doves { animation: rap-flee 3.4s ease-out infinite; }
        @keyframes rap-flee {
          0%   { transform: translate(0, 0); opacity: 1; }
          70%  { transform: translate(46px, -50px); opacity: 0.6; }
          100% { transform: translate(70px, -74px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rap-runner, .rap-lines, .rap-reach, .rap-turn, .rap-hat, .rap-doves {
            animation: none;
          }
          /* 帽子は落ちた位置で止める */
          .rap-hat { transform: translate(4px, 46px) rotate(20deg); }
        }
      `}</style>
    </svg>
  );
}
