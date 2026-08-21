/**
 * 土石流(アルビオン)が唯一の道をふさぐ(skipTurn)。
 *
 * 本文の芯は「乾ききった丘に降った雨が土石流になり、迂回路を切り開く間も
 * なく道を埋めた。雨の降らない前提で建てられた町が不意を突かれる」。
 *
 * 構図表:曇りの夕方 / 道路の正面 / 主役は**道を横切って埋める泥の舌** /
 * 人0(停まったバスの車内の影だけ)/ 地色は砂漠のオークルと泥の茶。
 * **白を使わない**(雪ではなく泥の災害なので)。
 *
 * 動くのは**泥の舌が谷から押し出してくる動き・転がる岩・遠い雨のすじ**。
 * 止めた状態でも、道を覆いきった泥と手前で停まったバスで分かる。
 */
export function ChileAluvion() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った夕方の空。雨雲が丘の上だけにある。 */}
      <rect width="400" height="210" fill="#b8a88e" />
      <rect width="400" height="60" fill="#9a8e80" />
      <rect y="60" width="400" height="30" fill="#ab9c86" />

      {/* 遠くの雨雲と雨のすじ。**降ったのは山の上だけ。** */}
      <g fill="#6f6658">
        <ellipse cx="90" cy="34" rx="64" ry="16" />
        <ellipse cx="150" cy="28" rx="46" ry="13" />
        <ellipse cx="40" cy="28" rx="40" ry="12" />
      </g>
      <g className="cal-rain" stroke="#8a8070" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8">
        <path d="M52,44l-5,16M84,46l-5,16M116,42l-5,16M148,44l-5,16" />
      </g>

      {/* 乾いた丘。谷筋が一本だけ濡れて暗い。 */}
      <path d="M0,90l70,-38l60,30l52,-24l70,32l60,-26l88,30v116H0z" fill="#c2a06a" />
      <path d="M120,64l-34,26h30l24,-18z" fill="#a8875a" />
      {/* 泥の出てくる谷筋 */}
      <path d="M130,58l-24,32l24,14l20,-30z" fill="#8a6a44" />

      {/* 道。画面手前へまっすぐ。 */}
      <path d="M150,210L186,96h28L260,210z" fill="#c9b184" />
      <path d="M201,102v14M198,126v16M194,148v18M189,172v22" stroke="#a8916a" strokeWidth="4" fill="none" />

      {/* 泥の舌。**道を横切って広がる。** */}
      <g className="cal-mud">
        <path d="M96,92q60,-6 130,4q60,8 120,2q30,-2 54,4v34q-70,14 -170,10q-90,-4 -134,-16z" fill="#7a5a38" />
        <path d="M96,92q60,-6 130,4q60,8 120,2q30,-2 54,4v8q-60,8 -150,6q-90,-2 -154,-10z" fill="#8a6a44" />
        <g fill="#5f4526">
          <ellipse cx="150" cy="112" rx="12" ry="7" />
          <ellipse cx="236" cy="120" rx="14" ry="8" />
          <ellipse cx="318" cy="116" rx="11" ry="6" />
        </g>
        {/* 巻き込まれた電柱と標識 */}
        <path d="M282,116l10,-26M287,96l8,3" stroke="#5a4630" strokeWidth="3" fill="none" />
        <g transform="rotate(24 130 104)">
          <rect x="128" y="84" width="3" height="22" fill="#8a8478" />
          <rect x="122" y="76" width="15" height="10" rx="1.6" fill="#c8a13f" />
          <path d="M126,80h8M126,83h6" stroke="#33302c" strokeWidth="1.4" fill="none" />
        </g>
      </g>
      {/* 転がり続ける岩 */}
      <g className="cal-rock">
        <path d="M0,0l7,-4l6,3l1,7l-6,3l-7,-3z" fill="#6b5a44" />
      </g>

      {/* 手前で停まったバス。乗客は影だけ。 */}
      <g>
        <ellipse cx="196" cy="200" rx="60" ry="6" fill="#000" opacity="0.2" />
        <rect x="142" y="148" width="108" height="50" rx="6" fill="#c8452f" />
        <rect x="142" y="148" width="108" height="14" rx="6" fill="#a83626" />
        <rect x="150" y="166" width="92" height="18" rx="2" fill="#3a3430" />
        {/* 車内の影 */}
        <g fill="#1f1c18">
          <circle cx="164" cy="174" r="5" />
          <circle cx="186" cy="175" r="5" />
          <circle cx="212" cy="174" r="5" />
          <circle cx="232" cy="175" r="5" />
        </g>
        <rect x="150" y="166" width="92" height="4" fill="#57534c" opacity="0.6" />
        <g fill="#2f2b26">
          <circle cx="164" cy="198" r="8" />
          <circle cx="228" cy="198" r="8" />
        </g>
        <g fill="#8a8f92">
          <circle cx="164" cy="198" r="3" />
          <circle cx="228" cy="198" r="3" />
        </g>
        {/* ハザードランプ */}
        <g className="cal-hazard" fill="#f5b31c">
          <rect x="144" y="156" width="8" height="6" rx="1.4" />
          <rect x="240" y="156" width="8" height="6" rx="1.4" />
        </g>
      </g>

      {/* 巻き込まれかけたガードレールの端 */}
      <g stroke="#8a8478" strokeWidth="3" fill="none">
        <path d="M258,148l30,6M300,158l24,6" />
      </g>
      <g fill="#7a746a">
        <rect x="262" y="148" width="3" height="10" />
        <rect x="292" y="154" width="3" height="10" />
        <rect x="318" y="162" width="3" height="10" />
      </g>

      {/* 道端のキロポスト(白は使わず生成りで) */}
      <g>
        <rect x="272" y="182" width="5" height="16" fill="#d8c8a0" />
        <rect x="272" y="182" width="5" height="4" fill="#8a6a44" />
        <rect x="118" y="186" width="5" height="16" fill="#d8c8a0" />
        <rect x="118" y="186" width="5" height="4" fill="#8a6a44" />
      </g>

      {/* 手前の乾いた地面のひびとサボテン(雨の前からある景色) */}
      <g stroke="#a8916a" strokeWidth="1.6" fill="none" opacity="0.8">
        <path d="M40,196l14,-3l8,4M300,192l14,3l10,-4M60,206l12,-2M344,204l12,-3" />
      </g>
      <g stroke="#8a7a52" strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M46,178q2,-6 5,-8M52,178q1,-6 3,-8M330,180q2,-6 5,-8M336,180q1,-5 3,-7" />
      </g>
      <g fill="#6b7a4a">
        <rect x="28" y="150" width="5" height="20" rx="2.4" />
        <path d="M28,158q-6,-1 -6,-8q0,-3 2.6,-3q2.4,0 2.4,3q0,4 1,5z" />
        <path d="M33,154q6,-1 6,-9q0,-3 -2.6,-3q-2.4,0 -2.4,3q0,4 -1,5z" />
        <rect x="362" y="158" width="4.4" height="17" rx="2.2" />
        <path d="M366.4,164q6,-1 6,-8q0,-2.6 -2.4,-2.6q-2.2,0 -2.2,2.6q0,3.6 -1.4,4.6z" />
      </g>

      <style>{`
        .cal-mud {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: cal-flow 5.2s ease-out infinite;
        }
        @keyframes cal-flow {
          0% { transform: translate(-34px, -8px) scaleX(0.88); }
          60%, 100% { transform: translate(0, 0) scaleX(1); }
        }
        .cal-rock {
          animation: cal-tumble 5.2s ease-in infinite;
        }
        @keyframes cal-tumble {
          0% { transform: translate(120px, 78px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          55% { transform: translate(210px, 116px) rotate(280deg); opacity: 1; }
          70%, 100% { transform: translate(226px, 122px) rotate(360deg); opacity: 0; }
        }
        .cal-rain { animation: cal-drift 1.4s linear infinite; }
        @keyframes cal-drift {
          0% { transform: translate(0, -6px); opacity: 0.2; }
          55% { opacity: 0.85; }
          100% { transform: translate(-5px, 10px); opacity: 0.1; }
        }
        .cal-hazard { animation: cal-blink 1.2s steps(1) infinite; }
        @keyframes cal-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cal-mud, .cal-rock, .cal-rain, .cal-hazard { animation: none; }
          /* 泥は道を覆いきった位置で止め、転がる岩は消しておく。 */
          .cal-rock { opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
