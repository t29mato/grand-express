/**
 * カチョで負け続ける。回ってきたサイコロのカップはことごとく悪い目を出し、
 * 最後の勝負のころには賭け金は始めたときには妥当に思えた額をずいぶん超えていた。
 * カチョはバス停から駅の長い待ち時間まで至る所で打たれ、
 * その得点は運と同じくらい度胸がものを言う。
 *
 * 構図: 待合の卓。**7枚のうちで唯一の屋内で、唯一の暖色。**
 * 手前に伏せた革のカップと転がった5つのサイコロ、卓の上を向こう側へ滑っていく紙幣と硬貨。
 * 左に負けているほうの手(こちらの手)、右に勝っているほうが札を寄せている。
 * 奥の窓の外はバスの停まる薄暗い庭で、待合であることが分かる。
 *
 * 動くのは4つ: 落ちて跳ねるサイコロ、向こうへ滑る硬貨、得点表に増える線、
 * 天井の裸電球の揺れ。止めても「悪い目の5つと、向こうへ渡った札」で伝わる。
 */
export function PeruCachoPerdido() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 待合の壁。裸電球の暖色。 */}
      <rect width="400" height="210" fill="#5a4230" />
      <rect width="400" height="120" fill="#6b5038" />
      <ellipse
        cx="200"
        cy="40"
        rx="180"
        ry="60"
        fill="#c98a3c"
        opacity="0.22"
      />

      {/* 奥の窓。外は薄暗く、バスが停まっている。 */}
      <rect x="14" y="26" width="96" height="54" fill="#2f3a44" />
      <rect
        x="14"
        y="26"
        width="96"
        height="54"
        fill="none"
        stroke="#8a6a46"
        strokeWidth="4"
      />
      <path
        d="M62,26v54M14,53h96"
        stroke="#8a6a46"
        strokeWidth="3"
        fill="none"
      />
      <g fill="#4f5a64">
        <rect x="20" y="58" width="40" height="18" rx="3" />
        <rect x="68" y="62" width="36" height="14" rx="3" />
      </g>
      <g fill="#c9a83c" opacity="0.8">
        <rect x="24" y="62" width="7" height="6" />
        <rect x="34" y="62" width="7" height="6" />
        <rect x="72" y="66" width="6" height="5" />
      </g>

      {/* 天井の裸電球。 */}
      <g>
        <path d="M300,0v22" stroke="#4a382a" strokeWidth="2" fill="none" />
        <g className="peru-cp-bulb">
          <circle cx="300" cy="28" r="8" fill="#f7d05a" />
          <rect x="296" y="18" width="8" height="5" fill="#8f8878" />
          <ellipse
            cx="300"
            cy="30"
            rx="30"
            ry="22"
            fill="#f7d05a"
            opacity="0.14"
          />
        </g>
      </g>

      {/* 卓。 */}
      <rect y="112" width="400" height="98" fill="#8a5f38" />
      <rect y="112" width="400" height="8" fill="#a0744a" />
      <g stroke="#7a5230" strokeWidth="2" opacity="0.6" fill="none">
        <path d="M0,140h400M0,170h400" />
      </g>

      {/* 得点表。数字は描かない。正の字のような線が並ぶだけ。 */}
      <g transform="translate(320,0)">
        <rect x="-30" y="128" width="66" height="46" rx="2" fill="#efe7d4" />
        <path
          d="M-30,140h66M3,128v46"
          stroke="#b8a88c"
          strokeWidth="1.6"
          fill="none"
        />
        <g stroke="#5a4230" strokeWidth="2" fill="none">
          <path d="M-24,148v10M-19,148v10M-14,148v10M-24,164v8M-19,164v8" />
        </g>
        <g
          className="peru-cp-tally"
          stroke="#c8102e"
          strokeWidth="2"
          fill="none"
        >
          <path d="M10,148v10M15,148v10M20,148v10M25,148v10M8,153l19,4" />
        </g>
      </g>

      {/* 伏せた革のカップ。 */}
      <g transform="translate(96,0)">
        <path d="M-20,168q3,-34 20,-34q17,0 20,34z" fill="#7a4a28" />
        <path
          d="M-20,168q3,-34 20,-34q17,0 20,34z"
          fill="none"
          stroke="#5f3618"
          strokeWidth="2"
        />
        <ellipse cx="0" cy="168" rx="20" ry="5" fill="#8f5a30" />
        <g stroke="#5f3618" strokeWidth="1.6" opacity="0.7" fill="none">
          <path d="M-17,152h34M-19,160h38" />
        </g>
      </g>

      {/* 転がったサイコロ5つ。**どれも悪い目。** */}
      <g className="peru-cp-dice">
        <g fill="#f2ece0">
          <rect x="140" y="164" width="17" height="17" rx="3" />
          <rect x="162" y="172" width="15" height="15" rx="3" />
          <rect x="184" y="162" width="16" height="16" rx="3" />
          <rect x="206" y="174" width="15" height="15" rx="3" />
          <rect x="228" y="166" width="16" height="16" rx="3" />
        </g>
        <g fill="#3f3a34">
          <circle cx="148.5" cy="172.5" r="2.2" />
          <circle cx="169.5" cy="179.5" r="2" />
          <circle cx="188" cy="166" r="2" />
          <circle cx="196" cy="174" r="2" />
          <circle cx="213.5" cy="181.5" r="2" />
          <circle cx="232" cy="170" r="2" />
          <circle cx="240" cy="178" r="2" />
        </g>
      </g>

      {/* 向こうへ滑っていく硬貨と札。 */}
      <g className="peru-cp-stake">
        <g fill="#e8b21c">
          <circle cx="262" cy="150" r="7" />
          <circle cx="276" cy="144" r="6" />
          <circle cx="288" cy="152" r="5.4" />
        </g>
        <g fill="#c8901c">
          <circle cx="262" cy="150" r="3" />
          <circle cx="276" cy="144" r="2.6" />
        </g>
        <g fill="#7fae8a">
          <rect
            x="246"
            y="128"
            width="30"
            height="13"
            rx="2"
            transform="rotate(-8 246 128)"
          />
          <rect
            x="268"
            y="124"
            width="30"
            height="13"
            rx="2"
            transform="rotate(6 268 124)"
          />
        </g>
      </g>

      {/* 負けているほうの手(手前・左)。空になった手のひら。 */}
      <g transform="translate(52,0)">
        <path d="M0,210v-24q0,-8 9,-8h16q9,0 9,8v24z" fill="#8a6a48" />
        <path
          d="M4,182q10,-8 26,0"
          fill="none"
          stroke="#7a5a3c"
          strokeWidth="3"
        />
        <g stroke="#7a5a3c" strokeWidth="2" fill="none">
          <path d="M10,178v-8M18,178v-9M26,178v-7" />
        </g>
      </g>

      {/* 勝っているほうの腕(右)。札を手前へ寄せている。 */}
      <g transform="translate(348,0)">
        <path
          d="M52,196q-38,-4 -60,-18"
          fill="none"
          stroke="#7a5a3c"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <ellipse cx="-10" cy="176" rx="11" ry="8" fill="#8a6a48" />
      </g>

      <style>{`
        .peru-cp-dice {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: peru-cp-roll 3.4s ease-out infinite;
        }
        @keyframes peru-cp-roll {
          0% { transform: translate(-16px, -22px) rotate(-14deg); opacity: 0.5; }
          22% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          28% { transform: translateY(-5px); }
          34%, 100% { transform: translateY(0); opacity: 1; }
        }
        .peru-cp-stake {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: peru-cp-slide 3.4s ease-in-out infinite;
        }
        @keyframes peru-cp-slide {
          0%, 40% { transform: translate(0, 0); opacity: 1; }
          80%, 100% { transform: translate(34px, -12px); opacity: 0.55; }
        }
        .peru-cp-tally {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: peru-cp-mark 3.4s steps(2, end) infinite;
        }
        @keyframes peru-cp-mark {
          0%, 55% { transform: scaleX(0.55); opacity: 0.6; }
          70%, 100% { transform: scaleX(1); opacity: 1; }
        }
        .peru-cp-bulb {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: peru-cp-sway 4.2s ease-in-out infinite;
        }
        @keyframes peru-cp-sway {
          0%, 100% { transform: rotate(-2.4deg); }
          50% { transform: rotate(2.4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .peru-cp-dice,
          .peru-cp-stake,
          .peru-cp-tally,
          .peru-cp-bulb { animation: none; }
        }
      `}</style>
    </svg>
  );
}
