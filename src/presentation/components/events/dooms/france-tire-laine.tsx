/**
 * 懐に伸びる手。扉のあたりの人だかり、少し近すぎる位置に畳まれた新聞。
 *
 * 右の旅人は開いた扉の外を見ている。左の相手は新聞を衝立のように立て、
 * その陰から手を伸ばして外套の隠しを探る。札入れは新聞の裏へ引かれていく。
 * 次の駅に着く頃には、懐が軽くなっている。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function FranceTireLaine() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 車内 */}
      <rect width="400" height="210" fill="#2b3038" />
      <rect width="400" height="24" fill="#232830" />
      <rect y="188" width="400" height="22" fill="#1e232a" />

      {/* 明るい仕切りと窓。**手が伸びる帯の背後を明るくするために置いている。**
          暗い袖を暗い車内に置いていたので、**盤面の大きさではスリが見えず、
          新聞を読んでいる人にしか読めなかった。**
          `japan-suri` は明るい背広に暗い手、`india-chori` は明るいリュックに手を掛ける。
          **盗る手は、明るい面の上を通らないと見えない。** */}
      <g>
        <rect x="126" y="24" width="112" height="164" fill="#3f4a58" />
        <rect x="126" y="24" width="112" height="7" fill="#4e5b6b" />
        <rect x="134" y="44" width="96" height="76" rx="4" fill="#55677a" />
        <rect x="140" y="50" width="84" height="64" fill="#6b7f92" />
        <rect x="126" y="122" width="112" height="5" fill="#4e5b6b" />
      </g>

      {/* 開いた扉と、その外のホーム */}
      <g>
        <rect x="292" y="24" width="108" height="164" fill="#1a2028" />
        <rect x="302" y="40" width="88" height="100" rx="4" fill="#3b4a58" />
        <rect x="308" y="46" width="76" height="88" fill="#4e5f6e" />
        <g fill="#6b7c8c">
          <rect x="314" y="64" width="20" height="62" rx="3" />
          <rect x="342" y="72" width="18" height="54" rx="3" />
          <rect x="366" y="60" width="20" height="66" rx="3" />
        </g>
        <circle cx="352" cy="52" r="6" fill="#f5b31c" opacity="0.6" />
        <rect x="284" y="24" width="12" height="164" fill="#4a5866" />
        <rect x="284" y="24" width="116" height="10" fill="#4a5866" />
      </g>

      {/* つり革 */}
      <g fill="#5b6673">
        <rect x="52" y="24" width="5" height="26" />
        <rect x="256" y="24" width="5" height="22" />
      </g>
      <g className="ftl-strap-a">
        <rect
          x="46"
          y="46"
          width="17"
          height="22"
          rx="8"
          fill="none"
          stroke="#8d7d5c"
          strokeWidth="4"
        />
      </g>
      <g className="ftl-strap-b">
        <rect
          x="250"
          y="42"
          width="17"
          height="22"
          rx="8"
          fill="none"
          stroke="#8d7d5c"
          strokeWidth="4"
        />
      </g>

      {/* 押し合う人影 */}
      <g fill="#1c222a">
        <g className="ftl-crowd-a">
          <circle cx="18" cy="92" r="19" />
          <rect x="-12" y="112" width="60" height="86" rx="16" />
        </g>
        <g className="ftl-crowd-b">
          <circle cx="272" cy="86" r="17" />
          <rect x="246" y="104" width="54" height="94" rx="16" />
        </g>
      </g>

      {/* 外を見ている旅人(右向き) */}
      <g className="ftl-victim">
        {/* 外套を明るくした。**暗い手を暗い外套に伸ばしていたので見えなかった。** */}
        <path d="M198,116 q36,-20 72,0 l8,86 -88,0z" fill="#8298ad" />
        <path d="M236,116 l0,86" stroke="#6d8299" strokeWidth="3" fill="none" />
        <rect x="272" y="130" width="18" height="10" rx="4" fill="#6d8299" />
        {/* 相手の側を向いた隠し。**口だけを暗くして、狙いどころを見せる。** */}
        <rect x="198" y="140" width="40" height="16" rx="4" fill="#9db1c4" />
        <rect x="198" y="140" width="40" height="6" rx="3" fill="#3a4a5b" />
        {/* 頭(右を向いている) */}
        <circle cx="238" cy="84" r="25" fill="#f0e2cf" />
        <path
          d="M213,80 a25,25 0 0 1 50,0 l0,5 q-16,-11 -50,-2z"
          fill="#463225"
        />
        <circle cx="256" cy="86" r="3" fill="#2a1f18" />
        <path
          d="M262,93 q6,3 0,7"
          stroke="#c98a6c"
          strokeWidth="3"
          fill="none"
        />
        <path d="M214,104 q28,15 54,2 l2,13 q-30,13 -58,-3z" fill="#a8503a" />
      </g>

      {/* 衝立にされた新聞と、その持ち主 */}
      <g fill="#31394a">
        <circle cx="104" cy="76" r="20" />
        <rect x="70" y="96" width="70" height="102" rx="18" />
      </g>
      <path d="M82,66 q22,-14 44,0 l4,-6 q-26,-16 -52,0z" fill="#232b3a" />
      <g transform="translate(112,152)">
        <g className="ftl-paper">
          <rect x="-46" y="-50" width="92" height="72" rx="2" fill="#e4dccb" />
          <rect x="-46" y="-50" width="92" height="13" rx="2" fill="#cdc4b2" />
          <g fill="#9aa0a6">
            <rect x="-40" y="-31" width="36" height="4" rx="2" />
            <rect x="-40" y="-22" width="36" height="4" rx="2" />
            <rect x="-40" y="-13" width="28" height="4" rx="2" />
            <rect x="4" y="-31" width="34" height="24" rx="2" />
            <rect x="4" y="-2" width="34" height="4" rx="2" />
          </g>
          <rect x="-46" y="-16" width="92" height="3" fill="#b9b0a0" />
        </g>
      </g>

      {/* 新聞の陰から伸びる手 */}
      <g transform="translate(146,148)">
        <g className="ftl-hand">
          <rect x="0" y="-8" width="50" height="17" rx="8" fill="#3a3040" />
          <ellipse cx="50" cy="0" rx="13" ry="11" fill="#e0b088" />
          <rect x="56" y="-4" width="11" height="6" rx="3" fill="#cf9f77" />
        </g>
      </g>

      {/* 抜かれて新聞の裏へ引かれる札入れ */}
      <g transform="translate(206,148)">
        <g className="ftl-wallet">
          <rect x="-15" y="-11" width="30" height="22" rx="3" fill="#5c3a20" />
          <rect x="-15" y="-11" width="30" height="7" rx="3" fill="#6e4828" />
          <rect x="-5" y="-16" width="14" height="8" rx="2" fill="#f5b31c" />
          <circle cx="8" cy="2" r="4" fill="#c98a12" />
        </g>
      </g>

      {/* こぼれた硬貨 */}
      <g transform="translate(196,160)">
        <g className="ftl-coin">
          <circle r="7" fill="#f5b31c" />
          <circle r="3" fill="#c98a12" />
        </g>
      </g>

      <style>{`
        .ftl-victim { transform-box: fill-box; transform-origin: 50% 100%; animation: ftl-sway 3s ease-in-out infinite; }
        .ftl-crowd-a { transform-box: fill-box; transform-origin: 50% 100%; animation: ftl-sway 3.4s ease-in-out infinite; animation-delay: -0.7s; }
        .ftl-crowd-b { transform-box: fill-box; transform-origin: 50% 100%; animation: ftl-sway 2.6s ease-in-out infinite; animation-delay: -1.2s; }
        .ftl-strap-a { transform-box: fill-box; transform-origin: 50% 0; animation: ftl-swing 3s ease-in-out infinite; }
        .ftl-strap-b { transform-box: fill-box; transform-origin: 50% 0; animation: ftl-swing 3.4s ease-in-out infinite; animation-delay: -0.9s; }
        .ftl-paper { transform-box: fill-box; transform-origin: 50% 100%; animation: ftl-screen 5s ease-in-out infinite; }
        .ftl-hand { transform-box: fill-box; transform-origin: left center; animation: ftl-reach 5s ease-in-out infinite; }
        .ftl-wallet { transform-box: fill-box; transform-origin: center; opacity: 0; animation: ftl-lift 5s ease-in-out infinite; }
        .ftl-coin { transform-box: fill-box; transform-origin: center; opacity: 0; animation: ftl-spill 5s ease-in infinite; }
        @keyframes ftl-sway {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(3px, 0) rotate(1.2deg); }
        }
        @keyframes ftl-swing {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes ftl-screen {
          0%, 12% { transform: translate(0, 0) rotate(0deg); }
          34%, 74% { transform: translate(10px, -5px) rotate(-3deg); }
          94%, 100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes ftl-reach {
          0%, 14% { transform: translate(-34px, 0); }
          38%, 62% { transform: translate(14px, -2px); }
          86%, 100% { transform: translate(-34px, 0); }
        }
        @keyframes ftl-lift {
          0%, 46% { transform: translate(0, 0); opacity: 0; }
          54% { transform: translate(-4px, -2px); opacity: 1; }
          74% { transform: translate(-38px, -6px) rotate(-12deg); opacity: 1; }
          92%, 100% { transform: translate(-76px, 2px) rotate(-22deg); opacity: 0; }
        }
        @keyframes ftl-spill {
          0%, 58% { transform: translate(0, 0); opacity: 0; }
          64% { transform: translate(0, 0); opacity: 1; }
          90%, 100% { transform: translate(-8px, 40px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ftl-victim, .ftl-crowd-a, .ftl-crowd-b, .ftl-strap-a, .ftl-strap-b,
          .ftl-paper, .ftl-hand, .ftl-wallet, .ftl-coin { animation: none; }
          /* **札入れは規則そのものに opacity:0 が書いてある。**
             動きを止めるだけだと消えたままで、**止めた絵からスリが消える。**
             止めたときこそ、抜かれた札入れが見えていないといけない。 */
          .ftl-wallet { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
