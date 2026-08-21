/**
 * レティーロ駅でひったくりに遭う(すられる)。
 *
 * 7枚の構図表でここは**昼・コンコースの中・石造ベージュ**の担当。
 * **3つのアーチ=肩を並べる3つの別々の駅**(ミトレ・サンマルティン・
 * ベルグラノ)を必ず見せる。犯人はそのうちの1つへ走り込み、人混みに紛れる
 * ——この駅の構造そのものが逃げ道になる、という絵。
 *
 * 動くのは**引かれるバッグと駆けるひったくり・追う腕・人混みのざわめき・
 * 出発案内の点滅(文字は描かない)**。止めた状態でも、ストラップが伸び切った
 * バッグと、アーチへ向かう犯人の構図で分かる。
 */
export function ArgentinaArrebatoretiro() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 石造のコンコース。 */}
      <rect width="400" height="210" fill="#c8b894" />
      <rect width="400" height="34" fill="#a8946b" />
      <rect y="34" width="400" height="6" fill="#8a7452" />

      {/* 3つのアーチ。高さも色味も揃っていない——別々の会社が建てた。 */}
      <g>
        <path d="M22,148V80a44,40 0 0 1 88,0v68z" fill="#8a7452" />
        <path d="M30,148V82a36,33 0 0 1 72,0v66z" fill="#e0d0b0" />
        <path d="M150,148V70a50,46 0 0 1 100,0v78z" fill="#8a7452" />
        <path d="M158,148V72a42,39 0 0 1 84,0v76z" fill="#d8c8a8" />
        <path d="M290,148V84a44,38 0 0 1 88,0v64z" fill="#8a7452" />
        <path d="M298,148V86a36,31 0 0 1 72,0v62z" fill="#e8d8b8" />
      </g>
      {/* アーチの中に、それぞれの駅のホームと違う色の列車。 */}
      <g>
        <rect x="42" y="118" width="48" height="18" rx="3" fill="#8f3f32" />
        <g fill="#f2d98a">
          <rect x="48" y="123" width="8" height="7" />
          <rect x="62" y="123" width="8" height="7" />
          <rect x="76" y="123" width="8" height="7" />
        </g>
        <rect x="42" y="136" width="48" height="4" fill="#5a4a34" />
        <rect x="172" y="112" width="56" height="22" rx="3" fill="#3f5f8f" />
        <g fill="#f2d98a">
          <rect x="179" y="118" width="9" height="8" />
          <rect x="195" y="118" width="9" height="8" />
          <rect x="211" y="118" width="9" height="8" />
        </g>
        <rect x="172" y="134" width="56" height="4" fill="#5a4a34" />
        <rect x="312" y="120" width="44" height="16" rx="3" fill="#3f6b4a" />
        <g fill="#f2d98a">
          <rect x="318" y="124" width="7" height="7" />
          <rect x="330" y="124" width="7" height="7" />
          <rect x="342" y="124" width="7" height="7" />
        </g>
        <rect x="312" y="136" width="44" height="4" fill="#5a4a34" />
      </g>
      {/* 出発案内の板(文字は描かず、点滅する行だけ)。3枚ある——駅ごとに別。 */}
      <g>
        <rect x="46" y="52" width="40" height="18" rx="2" fill="#33302c" />
        <g className="atr-board" fill="#f2d98a">
          <rect x="50" y="56" width="20" height="3" />
          <rect x="50" y="62" width="28" height="3" />
        </g>
        <rect x="176" y="46" width="48" height="20" rx="2" fill="#33302c" />
        <g className="atr-board atr-board2" fill="#f2d98a">
          <rect x="181" y="50" width="26" height="3" />
          <rect x="181" y="56" width="34" height="3" />
          <rect x="181" y="62" width="22" height="3" />
        </g>
        <rect x="314" y="54" width="40" height="16" rx="2" fill="#33302c" />
        <g className="atr-board" fill="#f2d98a">
          <rect x="318" y="58" width="24" height="3" />
          <rect x="318" y="64" width="18" height="3" />
        </g>
      </g>

      {/* 床。 */}
      <rect y="148" width="400" height="62" fill="#b8a582" />
      <g stroke="#a08e6b" strokeWidth="2" opacity="0.8" fill="none">
        <path d="M0,162h400M0,180h400M0,198h400" />
        <path d="M60,148L30,210M140,148L128,210M270,148L282,210M350,148L378,210" />
      </g>

      {/* 人混み(中景のシルエット)。犯人はこの中へ消える。 */}
      <g className="atr-crowd">
        <g fill="#8a7a5f">
          <circle cx="58" cy="146" r="7" />
          <path d="M50,168l3,-16h10l3,16z" />
          <circle cx="86" cy="150" r="6" />
          <path d="M79,170l3,-14h8l3,14z" />
          <circle cx="332" cy="148" r="7" />
          <path d="M324,170l3,-16h10l3,16z" />
          <circle cx="360" cy="152" r="6" />
          <path d="M353,172l3,-14h8l3,14z" />
          <circle cx="196" cy="148" r="6" />
          <path d="M189,168l3,-14h8l3,14z" />
        </g>
      </g>

      {/* 旅人(空色のシャツ)。腕が伸びる——間に合わない。 */}
      <g>
        <ellipse cx="120" cy="204" rx="26" ry="5" fill="#000" opacity="0.2" />
        <g fill="#3a3430">
          <rect x="110" y="178" width="9" height="26" rx="3" />
          <rect x="124" y="178" width="9" height="26" rx="3" />
        </g>
        <path d="M106,180l5,-40h20l5,40z" fill="#75aadb" />
        <path d="M106,180h30v5h-30z" fill="#5688b8" />
        <circle cx="121" cy="130" r="10" fill="#c98f5f" />
        <path d="M110,130a11,8 0 0 1 22,0z" fill="#6b4a30" />
        {/* 追いすがる腕。 */}
        <g className="atr-reach">
          <path d="M132,146l30,10" stroke="#75aadb" strokeWidth="6.4" strokeLinecap="round" fill="none" />
          <circle cx="164" cy="157" r="4.4" fill="#c98f5f" />
        </g>
        <path d="M108,146l-8,18" stroke="#75aadb" strokeWidth="6.4" strokeLinecap="round" fill="none" />
      </g>

      {/* ひったくり(灰の上着)。バッグを掴んで真ん中のアーチへ。 */}
      <g className="atr-thief">
        <ellipse cx="0" cy="46" rx="24" ry="5" fill="#000" opacity="0.2" />
        {/* 走る脚。 */}
        <path d="M-4,22l-16,18M4,22l14,14" stroke="#3a3430" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M-6,24l6,-38h14l4,30z" fill="#6f6a5e" />
        <circle cx="4" cy="-22" r="9" fill="#c98f5f" />
        <path d="M-5,-24a10,8 0 0 1 19,0z" fill="#33302c" />
        {/* バッグを後ろ手に掴む。ストラップが伸び切っている。 */}
        <path d="M-4,-4l-26,4" stroke="#6f6a5e" strokeWidth="5.6" strokeLinecap="round" fill="none" />
        <g className="atr-bag">
          <path d="M-46,2q10,-6 18,2" stroke="#5a4326" strokeWidth="2.4" fill="none" />
          <rect x="-52" y="2" width="22" height="16" rx="3" fill="#8a4a30" />
          <path d="M-52,8h22" stroke="#5f3320" strokeWidth="2" />
        </g>
        {/* 前へ振る腕。 */}
        <path d="M10,-6l16,-8" stroke="#6f6a5e" strokeWidth="5.6" strokeLinecap="round" fill="none" />
      </g>
      {/* 動きの線。 */}
      <g className="atr-lines" stroke="#8a7a5f" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M140,168q10,-2 20,0M136,178q12,-2 24,0M146,188q9,-2 18,0" />
      </g>

      <style>{`
        .atr-thief { animation: atr-dash 3.6s ease-in infinite; }
        @keyframes atr-dash {
          0%, 12%  { transform: translate(178px, 176px); opacity: 1; }
          70%      { transform: translate(224px, 148px) scale(0.72); opacity: 1; }
          84%,100% { transform: translate(238px, 138px) scale(0.6); opacity: 0; }
        }
        .atr-bag {
          transform-box: fill-box;
          transform-origin: 100% 20%;
          animation: atr-swing 0.9s ease-in-out infinite;
        }
        @keyframes atr-swing {
          0%, 100% { transform: rotate(6deg); }
          50%      { transform: rotate(-8deg); }
        }
        .atr-reach {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: atr-grasp 3.6s ease-out infinite;
        }
        @keyframes atr-grasp {
          0%, 10%   { transform: rotate(14deg); }
          35%, 100% { transform: rotate(0deg); }
        }
        .atr-crowd { animation: atr-murmur 3.2s ease-in-out infinite; }
        @keyframes atr-murmur {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(3px); }
        }
        .atr-board { animation: atr-flip 2.4s steps(1) infinite; }
        .atr-board2 { animation-delay: 1.2s; }
        @keyframes atr-flip {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }
        .atr-lines { animation: atr-fade 3.6s ease-in infinite; }
        @keyframes atr-fade {
          0%, 15%  { opacity: 0.7; }
          60%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .atr-thief, .atr-bag, .atr-reach, .atr-crowd, .atr-board, .atr-board2, .atr-lines {
            animation: none;
          }
          /* 犯人はバッグを掴んで駆け出した瞬間で止める。 */
          .atr-thief { transform: translate(190px, 172px); }
          .atr-reach {
            transform: rotate(8deg);
            transform-box: fill-box;
            transform-origin: 0% 50%;
          }
        }
      `}</style>
    </svg>
  );
}
