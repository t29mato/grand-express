/**
 * グイヘが水没した支線へ導く。
 *
 * 本文の芯は3つ。**本流に見えたほうへ進んだこと・気づけば水に浸かった
 * 支流の奥にいたこと・地元は地図よりグイヘのせいにすること。**
 *
 * グイヘは**姿では描かない**(tranca-de-rio と同じ扱い)。小舟の少し先を
 * 進んでいく波紋の列だけが「導いている」を語る。神秘化もしない。
 *
 * 7枚の描き分けで、ここは**朝もやの暗い緑**の担当(tranca-de-rio の
 * 明るい真昼と対)。渡し場・手押し車は出さない。水没した支流だと
 * 分かるように、**水から生える柵の杭と、幹まで浸かった木**を置く。
 *
 * 動くのは**流れる霧の帯・先導する波紋の列・ゆっくり支流へ進む小舟と
 * 棹を差す人・水面の浮き草**。止めた状態でも、分岐の奥に入り込んだ舟と
 * 水中の柵で分かる。
 */
export function CubaDesvioDelGuije() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜明けの空 */}
      <rect width="400" height="210" fill="#8fa8a4" />
      <rect width="400" height="40" fill="#7f9a98" />
      <rect y="40" width="400" height="24" fill="#9ab0a8" />
      <circle cx="330" cy="34" r="10" fill="#e8e0c2" opacity="0.8" />

      {/* 対岸の密林(暗い) */}
      <path d="M0,64q26,-14 52,-8q22,-12 48,-6q24,-12 50,-4q20,-8 44,-4q26,-8 52,-2q24,-6 48,0q28,-6 54,2q26,-4 52,4v22H0z" fill="#3a5f4a" />
      <path d="M0,76q40,-8 90,-4q60,4 120,0q70,-4 130,2q30,2 60,6v10H0z" fill="#2f5240" />

      {/* 川面(緑がかった朝の水) */}
      <rect y="88" width="400" height="122" fill="#4f8a80" />
      <rect y="88" width="400" height="20" fill="#3f7568" />
      <rect y="150" width="400" height="60" fill="#5a968a" />

      {/* 分岐:本流は右へ明るく、支流は左下へ暗く入り込む */}
      <path d="M400,96q-60,10 -110,26q-40,13 -60,28v60h170z" fill="#5f9e92" />
      <path d="M0,120q60,4 104,16q36,10 56,26q10,8 12,18l-4,30H0z" fill="#3f6f5f" />
      {/* 支流の奥は木立が両側から被さって暗い */}
      <path d="M0,108q30,-8 62,-2q26,4 42,12v10q-40,-12 -104,-6z" fill="#335844" />

      {/* 水没した柵(支流が「道だった場所」であること) */}
      <g fill="#5f4c33">
        <rect x="36" y="140" width="4" height="16" />
        <rect x="62" y="146" width="4" height="14" />
        <rect x="88" y="152" width="4" height="13" />
        <rect x="114" y="158" width="4" height="12" />
      </g>
      <path d="M38,144l26,7l26,7l26,7" stroke="#5f4c33" strokeWidth="1.8" fill="none" opacity="0.8" />
      <g stroke="#dff0e8" strokeWidth="1.2" opacity="0.6" fill="none">
        <path d="M32,156q6,2 12,0M58,161q6,2 12,0M84,166q6,2 12,0" />
      </g>

      {/* 幹まで浸かった木(2本) */}
      <g>
        <rect x="146" y="118" width="5" height="22" fill="#4a3a2a" />
        <g fill="#2f5f46">
          <ellipse cx="148" cy="108" rx="16" ry="10" />
          <ellipse cx="138" cy="114" rx="9" ry="6" />
          <ellipse cx="158" cy="113" rx="9" ry="6" />
        </g>
        <path d="M140,140q8,3 16,0" stroke="#dff0e8" strokeWidth="1.4" opacity="0.7" fill="none" />
      </g>
      <g>
        <rect x="52" y="106" width="4.4" height="18" fill="#4a3a2a" />
        <g fill="#2f5f46">
          <ellipse cx="54" cy="98" rx="13" ry="8" />
          <ellipse cx="46" cy="103" rx="7" ry="5" />
        </g>
      </g>

      {/* 先導する波紋の列(グイヘの道筋。支流の奥へ向かって順に開く) */}
      <g className="cugu-lead1" stroke="#dff0e8" strokeWidth="1.8" fill="none">
        <ellipse cx="0" cy="0" rx="12" ry="4.6" />
      </g>
      <g className="cugu-lead2" stroke="#dff0e8" strokeWidth="1.6" fill="none">
        <ellipse cx="0" cy="0" rx="12" ry="4.6" />
      </g>
      <g className="cugu-lead3" stroke="#d0ece2" strokeWidth="1.4" fill="none">
        <ellipse cx="0" cy="0" rx="12" ry="4.6" />
      </g>

      {/* 小舟と棹を差す人(支流へゆっくり進んでいる) */}
      <g className="cugu-boat">
        <path d="M-30,0q14,9 34,7q16,-1 24,-7q-14,-6 -29,-6q-16,0 -29,6z" fill="#6b4a2f" />
        <path d="M-24,-1h46v2.6h-46z" fill="#8a6b43" />
        {/* 積み荷(市場へ持っていくはずだった籠) */}
        <path d="M-16,-2h12l-2,-8h-8z" fill="#b08a4f" />
        <path d="M-14.6,-5.4h9.2M-13.8,-8h7.6" stroke="#8a6b3a" strokeWidth="0.9" fill="none" />
        <g fill="#4f8f52">
          <ellipse cx="-10" cy="-11" rx="4.6" ry="1.8" />
          <ellipse cx="-13" cy="-12.6" rx="3.4" ry="1.4" />
        </g>
        {/* 船頭 */}
        <g transform="translate(10,-14)">
          <path d="M-5,-4h10l1.2,15H-6.2z" fill="#8a5a9a" />
          <circle cx="0" cy="-8.4" r="5.2" fill="#b8794a" />
          <ellipse cx="0" cy="-11.6" rx="8" ry="2.2" fill="#d8bd7f" />
          <path d="M-3.8,-11.6q3.8,-5 7.6,0z" fill="#c8a95f" />
          <g className="cugu-pole">
            <path d="M4,-2l10,4" stroke="#b8794a" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M14,2l6,20" stroke="#8a6b43" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </g>
        </g>
        {/* 舟の後ろに残る筋 */}
        <path d="M30,2q16,-2 30,-7" stroke="#c8e4da" strokeWidth="1.6" opacity="0.6" fill="none" />
      </g>

      {/* 浮き草 */}
      <g className="cugu-pad1" fill="#4f8a5f">
        <ellipse cx="0" cy="0" rx="7" ry="2.8" />
        <path d="M0,0l5,-1.4" stroke="#3f7048" strokeWidth="1" fill="none" />
      </g>
      <g className="cugu-pad2" fill="#5a9a6a">
        <ellipse cx="0" cy="0" rx="5.6" ry="2.2" />
      </g>
      <g className="cugu-pad3" fill="#4f8a5f">
        <ellipse cx="0" cy="0" rx="6" ry="2.4" />
      </g>

      {/* 本流側の水鳥(正しい道はあちらだった) */}
      <g transform="translate(330,120)">
        <ellipse cx="0" cy="0" rx="5.6" ry="3.6" fill="#e8e8dc" />
        <path d="M4,-2q3,-2 3,-6" stroke="#e8e8dc" strokeWidth="2.2" fill="none" />
        <circle cx="7.4" cy="-8.4" r="2" fill="#e8e8dc" />
        <path d="M9.2,-8.4l3,0.8" stroke="#c8a13f" strokeWidth="1.1" fill="none" />
        <path d="M-6,3q6,2.6 12,0" stroke="#dff0e8" strokeWidth="1.3" opacity="0.7" fill="none" />
      </g>

      {/* 流れる霧の帯(3層) */}
      <g className="cugu-mist1" fill="#e4ece4" opacity="0.5">
        <ellipse cx="90" cy="96" rx="120" ry="10" />
        <ellipse cx="300" cy="102" rx="100" ry="8" />
      </g>
      <g className="cugu-mist2" fill="#dce8de" opacity="0.42">
        <ellipse cx="200" cy="130" rx="150" ry="10" />
        <ellipse cx="40" cy="140" rx="80" ry="8" />
      </g>
      <g className="cugu-mist3" fill="#e4ece4" opacity="0.35">
        <ellipse cx="130" cy="178" rx="140" ry="11" />
        <ellipse cx="340" cy="186" rx="110" ry="9" />
      </g>

      <style>{`
        /* 舟は本流との分かれ目から、支流の奥へゆっくり入っていく */
        .cugu-boat { animation: cugu-stray 9s ease-in-out infinite; }
        @keyframes cugu-stray {
          0%   { transform: translate(268px, 128px) scale(1); }
          55%  { transform: translate(176px, 152px) scale(0.92); }
          90%, 100% { transform: translate(112px, 170px) scale(0.84); }
        }
        .cugu-pole {
          transform-box: fill-box;
          transform-origin: 0% 0%;
          animation: cugu-row 2.6s ease-in-out infinite;
        }
        @keyframes cugu-row {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-12deg); }
        }
        /* 波紋は舟の少し先に、奥へ奥へと順に開く */
        .cugu-lead1, .cugu-lead2, .cugu-lead3 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .cugu-lead1 { animation: cugu-call1 9s ease-out infinite; }
        .cugu-lead2 { animation: cugu-call2 9s ease-out infinite; }
        .cugu-lead3 { animation: cugu-call3 9s ease-out infinite; }
        @keyframes cugu-call1 {
          0%, 4%    { transform: translate(232px, 142px) scale(0.5); opacity: 0.9; }
          18%       { transform: translate(232px, 142px) scale(1.8); opacity: 0; }
          100%      { transform: translate(232px, 142px) scale(1.8); opacity: 0; }
        }
        @keyframes cugu-call2 {
          0%, 34%   { transform: translate(160px, 158px) scale(0.5); opacity: 0; }
          38%       { transform: translate(160px, 158px) scale(0.5); opacity: 0.9; }
          54%       { transform: translate(160px, 158px) scale(1.8); opacity: 0; }
          100%      { transform: translate(160px, 158px) scale(1.8); opacity: 0; }
        }
        @keyframes cugu-call3 {
          0%, 62%   { transform: translate(92px, 174px) scale(0.5); opacity: 0; }
          66%       { transform: translate(92px, 174px) scale(0.5); opacity: 0.9; }
          84%       { transform: translate(92px, 174px) scale(1.8); opacity: 0; }
          100%      { transform: translate(92px, 174px) scale(1.8); opacity: 0; }
        }
        .cugu-mist1 { animation: cugu-drift1 8s linear infinite; }
        @keyframes cugu-drift1 {
          from { transform: translateX(-36px); }
          to   { transform: translateX(36px); }
        }
        .cugu-mist2 { animation: cugu-drift2 10s linear infinite; }
        @keyframes cugu-drift2 {
          from { transform: translateX(30px); }
          to   { transform: translateX(-30px); }
        }
        .cugu-mist3 { animation: cugu-drift3 7s linear infinite; }
        @keyframes cugu-drift3 {
          from { transform: translateX(-24px); }
          to   { transform: translateX(24px); }
        }
        .cugu-pad1 { animation: cugu-bob1 4.2s ease-in-out infinite; }
        .cugu-pad2 { animation: cugu-bob2 5s ease-in-out 1.2s infinite; }
        .cugu-pad3 { animation: cugu-bob3 4.6s ease-in-out 2s infinite; }
        @keyframes cugu-bob1 {
          0%, 100% { transform: translate(60px, 130px); }
          50%      { transform: translate(64px, 132px); }
        }
        @keyframes cugu-bob2 {
          0%, 100% { transform: translate(250px, 168px); }
          50%      { transform: translate(246px, 170px); }
        }
        @keyframes cugu-bob3 {
          0%, 100% { transform: translate(350px, 150px); }
          50%      { transform: translate(354px, 152px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cugu-boat, .cugu-pole, .cugu-lead1, .cugu-lead2, .cugu-lead3,
          .cugu-mist1, .cugu-mist2, .cugu-mist3,
          .cugu-pad1, .cugu-pad2, .cugu-pad3 {
            animation: none;
          }
          /* 舟は支流の奥に入り込んだ位置、波紋はさらに先に一つ。 */
          .cugu-boat { transform: translate(112px, 170px) scale(0.84); }
          .cugu-lead3 {
            transform: translate(92px, 174px) scale(1);
            transform-box: fill-box;
            transform-origin: 50% 50%;
            opacity: 0.7;
          }
          .cugu-lead1, .cugu-lead2 { opacity: 0; }
          .cugu-pad1 { transform: translate(60px, 130px); }
          .cugu-pad2 { transform: translate(250px, 168px); }
          .cugu-pad3 { transform: translate(350px, 150px); }
        }
      `}</style>
    </svg>
  );
}
