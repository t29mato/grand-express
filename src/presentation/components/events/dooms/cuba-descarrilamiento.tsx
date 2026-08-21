/**
 * サトウキビ貨車が脱線する。
 *
 * 本文の芯は3つ。**古く緩んだ路盤のカーブで積みすぎた貨車が落ちること・
 * 作業班が手とジャッキで起こすまで線が塞がること・古い専用線では
 * 一季節に一度で済まないこと。**
 *
 * 7枚の描き分けで、ここは**乾季の昼の黄土色**の担当。水を使わない。
 * 人は3人で、全員ちがう服・ちがう仕事(ジャッキを漕ぐ・バールで押す・
 * 散ったキビを運び戻す)。
 *
 * 動くのは**ジャッキの腕と貨車のわずかな持ち上がり・バールに体重を掛ける
 * 動き・キビを運ぶ人の往復・立ちのぼる土ぼこり**。
 * 止めた状態でも、傾いた貨車・浮いた車輪・散ったキビで分かる。
 */
export function CubaDescarrilamiento() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 乾季の白っぽい空 */}
      <rect width="400" height="210" fill="#c8d4d0" />
      <rect width="400" height="52" fill="#bcccca" />
      <circle cx="58" cy="30" r="13" fill="#f2e2a0" />

      {/* 地平線のキビ畑(刈り残し) */}
      <rect y="86" width="400" height="22" fill="#8a9a4f" />
      <g stroke="#9aaa5a" strokeWidth="2" opacity="0.8" fill="none">
        <path d="M8,108v-18M24,108v-18M40,108v-18M56,108v-18M72,108v-18M88,108v-18M104,108v-18M120,108v-18M136,108v-18M296,108v-18M312,108v-18M328,108v-18M344,108v-18M360,108v-18M376,108v-18M392,108v-18" />
      </g>

      {/* 乾いた地面 */}
      <rect y="108" width="400" height="102" fill="#c2a870" />
      <rect y="108" width="400" height="10" fill="#b09a5f" />
      <rect y="170" width="400" height="40" fill="#b89e62" />

      {/* カーブする専用線(奥から手前へ曲がる)。カーブの外側で持ち上がったレール */}
      <g fill="#6b5a3a">
        <path d="M150,112l8,-1l1,4l-8,1z" />
        <path d="M172,114l8,-1l1,4l-8,1z" />
        <path d="M194,118l8,0l1,4l-8,0z" />
        <path d="M216,124l8,1l0,4l-8,-1z" />
        <path d="M238,131l8,2l-1,4l-8,-2z" />
        <path d="M258,140l8,2l-1,4l-8,-2z" />
        <path d="M277,150l8,3l-2,4l-7,-3z" />
        <path d="M295,161l7,3l-2,4l-7,-3z" />
        <path d="M312,173l7,4l-2,4l-7,-4z" />
        <path d="M328,186l7,4l-3,4l-6,-4z" />
        <path d="M343,199l7,5l-3,4l-6,-5z" />
      </g>
      <path d="M148,114q60,2 104,22q56,26 100,74" stroke="#7f8288" strokeWidth="2.6" fill="none" />
      <path d="M150,120q56,3 98,22q54,25 96,70" stroke="#7f8288" strokeWidth="2.6" fill="none" />
      {/* 外側のレールが1本、枕木から浮いて曲がっている */}
      <path d="M96,132q26,-10 54,-11q10,0 12,3" stroke="#8a8f92" strokeWidth="2.8" fill="none" />
      <path d="M96,132q26,-10 54,-11" stroke="#5f4526" strokeWidth="1" fill="none" opacity="0.4" />

      {/* 脱線して傾いた貨車(カーブの外に落ちている) */}
      <g transform="translate(96,124)">
        <g className="cuds-wagon">
          <g transform="rotate(-13)">
            <rect x="-34" y="-26" width="66" height="20" fill="#6b6a5a" />
            <rect x="-34" y="-26" width="66" height="3.4" fill="#7f7e6c" />
            <g stroke="#4a4a40" strokeWidth="1.8" fill="none">
              <path d="M-22,-26v20M-8,-26v20M6,-26v20M20,-26v20" />
            </g>
            {/* 積み荷のキビ(まだ半分残っている) */}
            <g stroke="#8f9a4a" strokeWidth="3" fill="none" strokeLinecap="round">
              <path d="M-30,-26q4,-10 9,-12M-19,-26q4,-11 10,-13M-8,-26q4,-10 9,-12M3,-26q4,-11 10,-12M14,-26q4,-10 9,-11" />
            </g>
            {/* 車輪。カーブ側の1軸が完全に浮いている */}
            <g fill="#33302c">
              <circle cx="-20" cy="-2" r="5.4" />
              <circle cx="18" cy="-2" r="5.4" />
            </g>
            <g fill="#8a8f92">
              <circle cx="-20" cy="-2" r="1.8" />
              <circle cx="18" cy="-2" r="1.8" />
            </g>
          </g>
        </g>
      </g>

      {/* 地面に散ったキビ */}
      <g stroke="#9aa84f" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M30,152q16,-8 34,-7M44,160q18,-9 38,-8M22,168q16,-7 32,-6M64,150q14,-7 30,-6" />
      </g>
      <g stroke="#8a9740" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <path d="M40,176q16,-7 32,-6M96,166q14,-6 28,-5" />
      </g>

      {/* ジャッキと、それを漕ぐ人(青シャツ) */}
      <g transform="translate(148,150)">
        <rect x="-4" y="-14" width="9" height="16" fill="#8a4a30" />
        <rect x="-6" y="0" width="13" height="4" fill="#6b3722" />
        <rect x="-1.4" y="-22" width="3.4" height="9" fill="#5f5a4a" />
        <g className="cuds-jackarm">
          <path d="M2,-16l20,-8" stroke="#5f5a4a" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      </g>
      <g transform="translate(178,142)">
        <g className="cuds-pumper">
          <rect x="-3.6" y="14" width="3.4" height="14" fill="#3f3428" />
          <rect x="0.6" y="14" width="3.4" height="14" fill="#3f3428" />
          <path d="M-5.4,-4h11l1,19H-6.4z" fill="#5b8fe8" />
          <circle cx="0" cy="-8.6" r="5.6" fill="#c98f5f" />
          <path d="M-4,-2l-14,-8" stroke="#c98f5f" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* バールで押す人(黄シャツ・麦わら帽) */}
      <g transform="translate(64,120)">
        <path d="M-14,22L16,-4" stroke="#6b5330" strokeWidth="3" strokeLinecap="round" fill="none" />
        <g className="cuds-lever">
          <rect x="-22.4" y="16" width="3.4" height="14" fill="#3f3428" />
          <rect x="-17.6" y="16" width="3.4" height="14" fill="#3f3428" />
          <path d="M-24,-2h11l1,19h-13z" fill="#f5b31c" />
          <circle cx="-18" cy="-6.6" r="5.6" fill="#b8794a" />
          <ellipse cx="-18" cy="-10" rx="8.4" ry="2.4" fill="#d8bd7f" />
          <path d="M-22,-10q4,-5.4 8,0z" fill="#c8a95f" />
          <path d="M-13,0l10,6M-14,4l9,7" stroke="#b8794a" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* キビを運び戻す人(緑シャツ) */}
      <g className="cuds-carrier">
        <rect x="-3.6" y="14" width="3.4" height="13" fill="#3f3428" />
        <rect x="0.6" y="14" width="3.4" height="13" fill="#3f3428" />
        <path d="M-5.4,-4h11l1,19H-6.4z" fill="#4f8f6a" />
        <circle cx="0" cy="-8.6" r="5.4" fill="#c98f5f" />
        <g stroke="#9aa84f" strokeWidth="2.8" strokeLinecap="round" fill="none">
          <path d="M-10,-6q10,-5 21,-3M-10,-3q10,-4 21,-3" />
        </g>
        <path d="M-4,-2l-6,4M4,-2l6,3" stroke="#c98f5f" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>

      {/* 土ぼこり */}
      <g className="cuds-dust1" fill="#d8c49a" opacity="0.8">
        <ellipse cx="0" cy="0" rx="12" ry="6" />
        <ellipse cx="-13" cy="-5" rx="8" ry="4.4" />
        <circle cx="8" cy="-10" r="4" />
      </g>
      <g className="cuds-dust2" fill="#e0d0a8" opacity="0.7">
        <ellipse cx="0" cy="0" rx="10" ry="5" />
        <circle cx="-8" cy="-8" r="3.6" />
      </g>

      {/* 手前の乾いた草 */}
      <g stroke="#a08a4a" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M20,204q3,-7 1,-12M350,206q3,-7 1,-12M382,200q3,-7 1,-12M250,204q3,-7 1,-12" />
      </g>

      <style>{`
        /* 貨車はジャッキの周期に合わせてほんの少しだけ持ち上がり、また沈む */
        .cuds-wagon {
          transform-box: fill-box;
          transform-origin: 80% 100%;
          animation: cuds-lift 2.8s ease-in-out infinite;
        }
        @keyframes cuds-lift {
          0%, 100% { transform: rotate(0deg); }
          45%      { transform: rotate(1.6deg); }
          60%      { transform: rotate(1.2deg); }
        }
        .cuds-jackarm {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: cuds-pump 2.8s ease-in-out infinite;
        }
        @keyframes cuds-pump {
          0%, 100% { transform: rotate(0deg); }
          40%      { transform: rotate(22deg); }
        }
        .cuds-pumper {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cuds-lean 2.8s ease-in-out infinite;
        }
        @keyframes cuds-lean {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          40%      { transform: rotate(-6deg) translateY(2px); }
        }
        .cuds-lever {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cuds-push 2.1s ease-in-out infinite;
        }
        @keyframes cuds-push {
          0%, 100% { transform: rotate(0deg); }
          55%      { transform: rotate(7deg); }
        }
        /* 散ったキビを拾って貨車へ往復する */
        .cuds-carrier { animation: cuds-haul 6.4s ease-in-out infinite; }
        @keyframes cuds-haul {
          0%       { transform: translate(52px, 178px) scaleX(-1); }
          42%      { transform: translate(120px, 166px) scaleX(-1); }
          50%      { transform: translate(126px, 164px) scaleX(1); }
          92%      { transform: translate(58px, 176px) scaleX(1); }
          100%     { transform: translate(52px, 178px) scaleX(-1); }
        }
        .cuds-dust1 { animation: cuds-puff1 2.8s ease-out infinite; }
        .cuds-dust2 { animation: cuds-puff2 2.8s ease-out 1.3s infinite; }
        @keyframes cuds-puff1 {
          0%   { transform: translate(112px, 158px) scale(0.4); opacity: 0; }
          30%  { opacity: 0.8; }
          100% { transform: translate(104px, 138px) scale(1.4); opacity: 0; }
        }
        @keyframes cuds-puff2 {
          0%   { transform: translate(150px, 156px) scale(0.4); opacity: 0; }
          30%  { opacity: 0.7; }
          100% { transform: translate(158px, 140px) scale(1.3); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cuds-wagon, .cuds-jackarm, .cuds-pumper, .cuds-lever,
          .cuds-carrier, .cuds-dust1, .cuds-dust2 {
            animation: none;
          }
          /* 運ぶ人はキビを抱えて貨車へ向かう途中、土ぼこりは薄く一つだけ。 */
          .cuds-carrier { transform: translate(96px, 170px) scaleX(-1); }
          .cuds-dust1 {
            transform: translate(108px, 150px) scale(1);
            opacity: 0.4;
          }
          .cuds-dust2 { opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
