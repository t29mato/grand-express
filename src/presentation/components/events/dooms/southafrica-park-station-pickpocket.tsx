/**
 * 駅の人混みですりに遭う。ヨハネスブルグのパーク駅、乗り換えのコンコース。
 * 肩がぶつかった程度にしか感じないうちに終わっていて、
 * ホームに出てはじめてポケットの軽さに気づく。
 *
 * 構図: **人がとにかく多い**こと自体がこの絵の要点。
 * 頭と肩が帯になって左右いっぱいに詰まり、その真ん中で肩がぶつかる。
 * 抜かれた財布は、そのまま人の波へ吸い込まれて見えなくなる。
 * 犯人を悪相に描かない——**顔も見ないうちに終わる**のが本題だからである。
 *
 * 動くのは4つ: 人波の上下、ぶつかった相手の腕、抜かれて沈んでいく財布、
 * 発車標のめくれ。
 * 止めた状態でも「人混みのなかで、後ろポケットへ手が伸びている」で伝わる。
 *
 * (アジア盤のバザールのすりとは別物にする: あちらは**無人・手だけ・薄暗い屋根の下**。
 *  こちらは**人だらけ・明るい駅の中・財布が波に消える**)
 */
export function SouthafricaParkStationPickpocket() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* コンコースの中。天井の高い、明るい空間。 */}
      <rect width="400" height="210" fill="#b8a888" />
      <rect width="400" height="66" fill="#8f8068" />
      {/* 天窓と梁。 */}
      <g fill="#d8ccae">
        <rect x="18" y="8" width="58" height="14" rx="2" />
        <rect x="112" y="8" width="58" height="14" rx="2" />
        <rect x="206" y="8" width="58" height="14" rx="2" />
        <rect x="300" y="8" width="58" height="14" rx="2" />
      </g>
      <g fill="#6f6250">
        <rect y="0" width="400" height="8" />
        <rect x="86" y="0" width="10" height="26" />
        <rect x="180" y="0" width="10" height="26" />
        <rect x="274" y="0" width="10" height="26" />
        <rect y="24" width="400" height="6" />
      </g>
      {/* 光の落ちる筋。 */}
      <g fill="#f2e6c4" opacity="0.2">
        <path d="M22,24 L2,96 h44 l14,-72z" />
        <path d="M212,24 L192,96 h44 l14,-72z" />
      </g>

      {/* 柱。 */}
      <g fill="#7f7158">
        <rect x="30" y="30" width="16" height="82" />
        <rect x="228" y="30" width="16" height="82" />
        <rect x="352" y="30" width="16" height="82" />
      </g>
      <g fill="#6a5d47">
        <rect x="26" y="30" width="24" height="6" />
        <rect x="224" y="30" width="24" height="6" />
        <rect x="348" y="30" width="24" height="6" />
      </g>

      {/* 発車標。行がぱらぱらとめくれる。 */}
      <g>
        <rect x="252" y="34" width="94" height="46" rx="3" fill="#2b2f33" />
        <rect x="252" y="34" width="94" height="6" fill="#454b50" />
        <g fill="#f5b31c">
          <rect className="sa-pp-row-a" x="258" y="44" width="30" height="6" />
          <rect x="292" y="44" width="20" height="6" />
          <rect x="316" y="44" width="24" height="6" />
          <rect x="258" y="54" width="26" height="6" />
          <rect className="sa-pp-row-b" x="288" y="54" width="24" height="6" />
          <rect x="316" y="54" width="24" height="6" />
          <rect x="258" y="64" width="34" height="6" />
          <rect x="296" y="64" width="16" height="6" />
          <rect className="sa-pp-row-c" x="316" y="64" width="24" height="6" />
        </g>
      </g>

      {/* 案内の吊り看板(矢印だけ。文字は描かない)。 */}
      <g>
        <rect x="96" y="34" width="76" height="24" rx="2" fill="#2f6b52" />
        <path d="M108,46 h24 l-6,-7 M108,46 h24 l-6,7" stroke="#f2ede0" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="146" y="40" width="18" height="12" rx="2" fill="#f2ede0" opacity="0.9" />
        <rect x="130" y="26" width="4" height="8" fill="#6f6250" />
      </g>

      {/* 床。 */}
      <rect y="112" width="400" height="98" fill="#9c8d70" />
      <path d="M0,124 q100,-6 200,2 q100,8 200,-4 v88 H0z" fill="#8d7f64" />
      <g stroke="#7d7059" strokeWidth="1.6" fill="none" opacity="0.7">
        <path d="M0,150 h400 M0,176 h400 M0,200 h400 M60,124 v86 M160,124 v86 M260,124 v86 M340,124 v86" />
      </g>

      {/* ── 奥の人波。頭と肩の帯。**まず「多い」を出す。** */}
      <g className="sa-pp-crowd-a">
        <g fill="#3f4a56">
          <path d="M4,112 q0,-11 10,-11 q10,0 10,11z" />
          <path d="M52,112 q0,-11 10,-11 q10,0 10,11z" />
          <path d="M118,112 q0,-11 10,-11 q10,0 10,11z" />
          <path d="M186,112 q0,-11 10,-11 q10,0 10,11z" />
          <path d="M252,112 q0,-11 10,-11 q10,0 10,11z" />
          <path d="M318,112 q0,-11 10,-11 q10,0 10,11z" />
          <path d="M372,112 q0,-11 10,-11 q10,0 10,11z" />
        </g>
        <g fill="#3f2f24">
          <circle cx="14" cy="97" r="6" />
          <circle cx="62" cy="97" r="6" />
          <circle cx="128" cy="97" r="6" />
          <circle cx="196" cy="97" r="6" />
          <circle cx="262" cy="97" r="6" />
          <circle cx="328" cy="97" r="6" />
          <circle cx="382" cy="97" r="6" />
        </g>
      </g>
      <g className="sa-pp-crowd-b">
        <g fill="#6b5a7a">
          <path d="M28,116 q0,-12 11,-12 q11,0 11,12z" />
          <path d="M84,116 q0,-12 11,-12 q11,0 11,12z" />
          <path d="M150,116 q0,-12 11,-12 q11,0 11,12z" />
          <path d="M216,116 q0,-12 11,-12 q11,0 11,12z" />
          <path d="M286,116 q0,-12 11,-12 q11,0 11,12z" />
          <path d="M348,116 q0,-12 11,-12 q11,0 11,12z" />
        </g>
        <g fill="#5a4232">
          <circle cx="39" cy="99" r="6.4" />
          <circle cx="95" cy="99" r="6.4" />
          <circle cx="161" cy="99" r="6.4" />
          <circle cx="227" cy="99" r="6.4" />
          <circle cx="297" cy="99" r="6.4" />
          <circle cx="359" cy="99" r="6.4" />
        </g>
      </g>

      {/* ── 中景の人波。色をばらして、同じ人の使い回しに見せない。 */}
      <g className="sa-pp-crowd-c">
        <g>
          <path d="M6,138 q0,-15 13,-15 q13,0 13,15z" fill="#c2453c" />
          <circle cx="19" cy="118" r="7.6" fill="#4a352a" />
        </g>
        <g>
          <path d="M46,140 q0,-16 13,-16 q13,0 13,16z" fill="#e0a83c" />
          <circle cx="59" cy="118" r="7.6" fill="#3f2f24" />
          <path d="M51,115 q8,-8 16,-1 h-16z" fill="#2f6b52" />
        </g>
        <g>
          <path d="M88,137 q0,-15 12,-15 q12,0 12,15z" fill="#4f7f9f" />
          <circle cx="100" cy="117" r="7.4" fill="#5a4232" />
        </g>
        <g>
          <path d="M298,139 q0,-16 13,-16 q13,0 13,16z" fill="#5f8f5a" />
          <circle cx="311" cy="118" r="7.6" fill="#4a352a" />
        </g>
        <g>
          <path d="M338,137 q0,-15 12,-15 q12,0 12,15z" fill="#8f5f9a" />
          <circle cx="350" cy="117" r="7.4" fill="#3f2f24" />
          <path d="M342,114 q8,-8 16,-1 h-16z" fill="#f2ede0" />
        </g>
        <g>
          <path d="M374,140 q0,-16 13,-16 q13,0 13,16z" fill="#d8804a" />
          <circle cx="387" cy="118" r="7.6" fill="#5a4232" />
        </g>
      </g>

      {/* ── 手前。**ここで肩がぶつかる。** */}
      {/* すられる人。背を向けて立ち、後ろポケットに財布。 */}
      <g>
        <g fill="#2b3038">
          <rect x="168" y="176" width="7" height="26" />
          <rect x="181" y="176" width="7" height="26" />
        </g>
        <path d="M164,140 h28 l4,38 h-36z" fill="#3f6b8a" />
        <circle cx="178" cy="130" r="10" fill="#4a352a" />
        <path d="M168,128 q10,-11 20,-1 h-20z" fill="#2f3a44" />
        {/* 肩に掛けた鞄。**反対側**に回しておく(伸びてくる手と重ならないように)。 */}
        <path d="M166,144 l-8,24" stroke="#5f4a2c" strokeWidth="3.4" fill="none" />
        <rect x="148" y="164" width="16" height="13" rx="2" fill="#6b5330" />
        <rect x="148" y="164" width="16" height="3" fill="#8a6d40" />
        {/* 後ろポケット。**財布はここから抜かれる。** */}
        <rect x="182" y="166" width="15" height="11" rx="1.6" fill="#2f4f68" />
        <rect x="182" y="166" width="15" height="2.6" fill="#26415a" />
      </g>

      {/* 抜かれた財布。ポケットから出て、人波の下へ沈んで消える。 */}
      <g className="sa-pp-wallet">
        <rect x="184" y="168" width="12" height="8" rx="1.4" fill="#7a4a24" />
        <rect x="184" y="171" width="12" height="2" fill="#5f3818" />
      </g>

      {/* ぶつかってきた人。顔は見えない。腕だけが伸びて、また引く。 */}
      <g>
        <g fill="#33383f">
          <rect x="206" y="180" width="7" height="24" />
          <rect x="219" y="180" width="7" height="24" />
        </g>
        <path d="M202,146 h28 l4,34 h-36z" fill="#6f6a52" />
        <circle cx="216" cy="136" r="10" fill="#3f2f24" />
        <path d="M206,133 q10,-10 20,-1 h-20z" fill="#8a4a34" />
        <g className="sa-pp-hand">
          <path d="M206,156 q-10,7 -17,15" stroke="#3f2f24" strokeWidth="5.4" fill="none" strokeLinecap="round" />
        </g>
        {/* もう一方の腕は、ごく普通に下がっている。 */}
        <path d="M232,156 q7,8 6,18" stroke="#3f2f24" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>

      {/* 手前を横切る人たち。上下の動きで「流れている」ことを出す。 */}
      <g className="sa-pp-crowd-d">
        <g>
          <path d="M28,200 q0,-22 16,-22 q16,0 16,22z" fill="#3f7f6a" />
          <circle cx="44" cy="172" r="10.4" fill="#4a352a" />
        </g>
        <g>
          <path d="M84,204 q0,-24 17,-24 q17,0 17,24z" fill="#b0435a" />
          <circle cx="101" cy="174" r="11" fill="#3f2f24" />
          <path d="M90,171 q11,-11 22,-1 h-22z" fill="#f2c869" />
        </g>
        <g>
          <path d="M270,202 q0,-23 16,-23 q16,0 16,23z" fill="#4a5f9a" />
          <circle cx="286" cy="173" r="10.6" fill="#5a4232" />
        </g>
        <g>
          <path d="M330,206 q0,-25 17,-25 q17,0 17,25z" fill="#c98a3c" />
          <circle cx="347" cy="175" r="11" fill="#4a352a" />
        </g>
      </g>

      <style>{`
        .sa-pp-crowd-a { animation: sa-pp-shuffle 2.6s ease-in-out infinite; }
        .sa-pp-crowd-b { animation: sa-pp-shuffle 3.2s ease-in-out -0.9s infinite; }
        .sa-pp-crowd-c { animation: sa-pp-shuffle 2.9s ease-in-out -1.6s infinite; }
        .sa-pp-crowd-d { animation: sa-pp-shuffle 3.6s ease-in-out -2.2s infinite; }
        @keyframes sa-pp-shuffle {
          0%, 100% { transform: translate(0, 0); }
          30% { transform: translate(3px, -2.4px); }
          65% { transform: translate(-3px, 1.6px); }
        }
        .sa-pp-hand {
          transform-box: fill-box;
          transform-origin: 100% 0%;
          animation: sa-pp-lift 4.6s ease-in-out infinite;
        }
        @keyframes sa-pp-lift {
          0%, 14% { transform: rotate(16deg); }
          32%, 48% { transform: rotate(0deg); }
          70%, 100% { transform: rotate(20deg); }
        }
        .sa-pp-wallet { animation: sa-pp-slip 4.6s ease-in-out infinite; }
        @keyframes sa-pp-slip {
          0%, 34% { transform: translate(0, 0); opacity: 1; }
          52% { transform: translate(16px, 10px); opacity: 1; }
          72% { transform: translate(30px, 22px); opacity: 0.5; }
          84%, 100% { transform: translate(40px, 30px); opacity: 0; }
        }
        .sa-pp-row-a { animation: sa-pp-flip 3.8s steps(1, end) infinite; }
        .sa-pp-row-b { animation: sa-pp-flip 3.8s steps(1, end) -1.3s infinite; }
        .sa-pp-row-c { animation: sa-pp-flip 3.8s steps(1, end) -2.6s infinite; }
        @keyframes sa-pp-flip {
          0%, 88% { opacity: 1; }
          90% { opacity: 0.25; }
          94% { opacity: 1; }
          96% { opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-pp-crowd-a,
          .sa-pp-crowd-b,
          .sa-pp-crowd-c,
          .sa-pp-crowd-d,
          .sa-pp-hand,
          .sa-pp-wallet,
          .sa-pp-row-a,
          .sa-pp-row-b,
          .sa-pp-row-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
