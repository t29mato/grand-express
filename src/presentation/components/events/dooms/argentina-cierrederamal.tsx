/**
 * 支線が完全に閉じる(持ち物件を失う)。
 *
 * 7枚の構図表でここは**夕・パンパの小駅・セピア**の担当。**青を使わない。**
 * 廃墟は描かない——駅舎はきれいなまま、線路だけが車止めで終わる
 * (北海道盤と同じ扱い。人はいまも住んでいる)。
 * 官報の1行の告示は、柱に貼られた**白い紙1枚**で語る。
 *
 * 動くのは**風にめくれる告示の紙・レールの間で揺れる草・転がる枯れ草の玉・
 * 夕日の長い影の明滅**。止めた状態でも、車止めと貼り紙と、
 * 自転車を停めて読む人の構図で分かる。
 */
export function ArgentinaCierrederamal() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕焼けのセピア。青は使わない。 */}
      <rect width="400" height="210" fill="#c28a5a" />
      <rect width="400" height="46" fill="#a8704a" />
      <rect y="46" width="400" height="26" fill="#d09a62" />
      <rect y="72" width="400" height="22" fill="#e0b070" />
      <circle cx="330" cy="60" r="15" fill="#f2c26b" />
      <g fill="#b87e50">
        <ellipse cx="90" cy="38" rx="56" ry="7" />
        <ellipse cx="230" cy="26" rx="40" ry="5" />
      </g>

      {/* 地平線と乾いた草の平原。 */}
      <rect y="94" width="400" height="116" fill="#a8834f" />
      <rect y="94" width="400" height="8" fill="#bd9257" />
      {/* 遠くの防風林と風車(中景)。町はまだ生きている。 */}
      <g fill="#6b5330">
        <ellipse cx="30" cy="92" rx="18" ry="10" />
        <ellipse cx="58" cy="94" rx="14" ry="8" />
      </g>
      <g stroke="#7a5c38" strokeWidth="2.4" fill="none">
        <path d="M352,94V64M345,80h14" />
        <path d="M352,64l9,7M352,64l-9,7M352,64l9,-7M352,64l-9,-7" />
      </g>
      <circle cx="352" cy="64" r="2.6" fill="#5f4526" />

      {/* 小さな駅舎。手入れされたまま(廃墟にしない)。 */}
      <rect x="24" y="108" width="90" height="52" fill="#c8a06b" />
      <path d="M16,108h106l-10,-16H26z" fill="#7a4a30" />
      <g fill="#8a5f3a">
        <rect x="36" y="120" width="16" height="18" rx="2" />
        <rect x="86" y="120" width="16" height="18" rx="2" />
      </g>
      <rect x="60" y="126" width="18" height="34" fill="#6b4a30" />
      <rect x="14" y="160" width="116" height="6" fill="#8a6a44" />
      {/* 窓には鉢植え。人はいまも住んでいる。 */}
      <rect x="38" y="116" width="12" height="4" fill="#8f6b3f" />
      <path d="M41,116q1,-5 3,-6q2,1 3,6z" fill="#7f7a3f" />

      {/* 線路。画面の途中で終わる。 */}
      <g fill="#6b4f30">
        {[0, 22, 44, 66, 88, 110, 132, 154, 176, 198, 220, 242].map((x) => (
          <rect key={x} x={x} y={178} width={13} height={11} />
        ))}
      </g>
      <rect y="180" width="258" height="3.4" fill="#8a7454" />
      <rect y="186" width="258" height="3.4" fill="#8a7454" />
      {/* 車止め。この絵の主役。 */}
      <g>
        <path d="M258,192L270,164h4L266,192z" fill="#6b5f50" />
        <path d="M292,192L280,164h-4l8,28z" fill="#6b5f50" />
        <rect x="256" y="166" width="38" height="10" fill="#c8452f" />
        <g fill="#efe8d8">
          <rect x="256" y="166" width="9" height="10" />
          <rect x="275" y="166" width="9" height="10" />
        </g>
        <rect x="254" y="192" width="42" height="5" fill="#5a4a34" />
        <ellipse cx="275" cy="198" rx="26" ry="4" fill="#000" opacity="0.18" />
      </g>
      {/* 車止めの先は草だけ。 */}
      <g stroke="#bd9257" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M312,204q3,-8 8,-12M320,206q3,-9 9,-13M330,204q2,-7 7,-10M370,200q3,-8 8,-11M382,204q2,-7 7,-10" />
      </g>
      {/* レールの間から伸びる草。もう列車は来ない。 */}
      <g className="amc-grass">
        <g stroke="#a89148" strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d="M160,190q1,-7 4,-10M168,192q1,-6 4,-9M204,190q1,-7 4,-10M212,192q1,-6 3,-8" />
        </g>
      </g>

      {/* 告示の柱。白い紙が1枚(文字は描かない)。 */}
      <g>
        <rect x="182" y="122" width="7" height="70" fill="#6b4a30" />
        <g className="amc-notice">
          <rect x="164" y="128" width="26" height="32" fill="#efe8dc" />
          <path d="M168,134h18M168,140h18M168,146h14M168,152h17" stroke="#b8a482" strokeWidth="1.8" />
        </g>
        <circle cx="185" cy="130" r="2" fill="#4a3a26" />
      </g>

      {/* 自転車を停めて読む人(こげ茶)。 */}
      <g>
        <ellipse cx="150" cy="204" rx="30" ry="4.4" fill="#000" opacity="0.18" />
        <g stroke="#4a3a26" strokeWidth="2.6" fill="none">
          <circle cx="132" cy="196" r="9" />
          <circle cx="160" cy="196" r="9" />
          <path d="M132,196l8,-14h14l6,14M140,182l-4,-5h8M160,196l-5,-16h7" />
        </g>
        <g>
          <g fill="#5a4326">
            <rect x="141" y="168" width="5.4" height="18" rx="2" />
            <rect x="149" y="168" width="5.4" height="18" rx="2" />
          </g>
          <path d="M138,170l3,-24h14l3,24z" fill="#7a5238" />
          <circle cx="148" cy="138" r="8" fill="#c98f5f" />
          <path d="M139,138a9,7 0 0 1 18,0z" fill="#4a3a26" />
          {/* 紙を見上げる腕。 */}
          <path d="M156,152l14,-14" stroke="#7a5238" strokeWidth="5.4" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* 転がる枯れ草の玉。 */}
      <g className="amc-tumble">
        <g stroke="#a8834f" strokeWidth="2" fill="none">
          <circle cx="0" cy="0" r="7" />
          <path d="M-5,-4q5,4 10,0M-5,4q5,-4 10,0M0,-7v14" />
        </g>
      </g>

      {/* 電線の切れた電柱(送電は止まったが、倒れてはいない)。 */}
      <g stroke="#6b4a30" strokeWidth="3" fill="none">
        <path d="M330,192V128M322,140h16" />
      </g>
      <path d="M338,140q14,10 20,26" stroke="#5a4a34" strokeWidth="1.6" fill="none" />

      <style>{`
        .amc-notice {
          transform-box: fill-box;
          transform-origin: 85% 8%;
          animation: amc-flap 3.2s ease-in-out infinite;
        }
        @keyframes amc-flap {
          0%, 100% { transform: rotate(0deg); }
          40%      { transform: rotate(-7deg) skewY(-3deg); }
          60%      { transform: rotate(-3deg); }
        }
        .amc-grass {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: amc-sway 2.4s ease-in-out infinite;
        }
        @keyframes amc-sway {
          0%, 100% { transform: skewX(6deg); }
          50%      { transform: skewX(-4deg); }
        }
        .amc-tumble { animation: amc-roll 8s linear infinite; }
        @keyframes amc-roll {
          0%   { transform: translate(420px, 200px) rotate(0deg); }
          100% { transform: translate(-30px, 194px) rotate(-900deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .amc-notice, .amc-grass, .amc-tumble { animation: none; }
          /* 枯れ草は車止めの根元で止める。 */
          .amc-tumble { transform: translate(300px, 200px); }
        }
      `}</style>
    </svg>
  );
}
