/**
 * チャウ・ニャウ(乾杯ゲーム)に負けて全員分を払う。
 * サイコロの入った椀はビールが追いつかないほど速く卓を回り、三回続けて負けると、
 * 自分の分だけでなく全員のグラス分を払う羽目になった。
 * 「モッ、ハイ、バー、ヨー!」という掛け声は国じゅうのビアホイの卓でほぼ毎晩響く。
 *
 * 構図: 夕方の街角のビアホイ。**屋外・低い青いプラスチックの椅子・氷入りのグラス**の
 * 3つで場所が決まる。卓を囲む4人が一斉にグラスを上げていて、
 * 手前の1人だけが札を出している——負けたのはこの人。
 *
 * **主役は掛け声と勘定**にしてある。サイコロは卓の隅に転がっているだけ。
 *
 * 動くのは5つ: 一斉に上がるグラス、氷の泡、掛け声の輪、
 * 差し出された札、裸電球の揺れ。
 * 止めても「上がった4つのグラスと、1人だけ出している札」で伝わる。
 *
 * (ペルー盤のカチョとは別物にする: あちらは屋内の待合、茶色い卓、伏せた革のカップが主役。
 *  こちらは**屋外・夕方・青い椅子**で、主役は乾杯そのもの。)
 */
export function VietnamChaunhau() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の街角。 */}
      <rect width="400" height="210" fill="#4a4438" />
      <rect width="400" height="112" fill="#6a5a48" />
      <rect width="400" height="52" fill="#8a6f52" />

      {/* 通りの向こうの店先と、バイクの列。 */}
      <g fill="#5f5240">
        <rect x="0" y="30" width="86" height="66" />
        <rect x="92" y="42" width="64" height="54" />
        <rect x="286" y="34" width="72" height="62" />
      </g>
      <g fill="#e0b060" opacity="0.75">
        <rect x="12" y="44" width="16" height="18" />
        <rect x="38" y="44" width="16" height="18" />
        <rect x="104" y="54" width="14" height="16" />
        <rect x="298" y="48" width="16" height="18" />
        <rect x="324" y="48" width="16" height="18" />
      </g>
      <g stroke="#3f3a30" strokeWidth="2" fill="none" opacity="0.8">
        <circle cx="196" cy="86" r="9" />
        <circle cx="222" cy="86" r="9" />
        <path d="M196,86l7,-12h11l4,12" />
      </g>

      {/* 裸電球。 */}
      <path d="M310,0v18" stroke="#3f3a30" strokeWidth="2" fill="none" />
      <g className="vietnam-cn-bulb">
        <circle cx="310" cy="24" r="8" fill="#f7d05a" />
        <rect x="306" y="14" width="8" height="5" fill="#8f8878" />
        <ellipse
          cx="310"
          cy="26"
          rx="34"
          ry="26"
          fill="#f7d05a"
          opacity="0.16"
        />
      </g>

      {/* 歩道。 */}
      <rect y="112" width="400" height="98" fill="#7a6f5a" />
      <rect y="112" width="400" height="5" fill="#8a7f68" />
      <g stroke="#6a6050" strokeWidth="2" opacity="0.6" fill="none">
        <path d="M0,150h400M0,186h400M80,112v98M200,112v98M320,112v98" />
      </g>

      {/* ビールの樽。 */}
      <g transform="translate(46,0)">
        <path d="M-20,178V138q0,-7 20,-7t20,7v40z" fill="#b8a06a" />
        <g fill="#9a8450">
          <rect x="-21" y="146" width="42" height="5" />
          <rect x="-21" y="166" width="42" height="5" />
        </g>
        <ellipse cx="0" cy="138" rx="20" ry="6" fill="#c9b078" />
        <path d="M20,158h10v5H20z" fill="#5f5a4a" />
      </g>

      {/* 卓と、氷入りのグラス。 */}
      <g transform="translate(214,0)">
        <ellipse cx="0" cy="164" rx="72" ry="18" fill="#c9a878" />
        <ellipse cx="0" cy="160" rx="72" ry="18" fill="#dcbc8c" />
        <g fill="#8a6a46">
          <rect x="-6" y="172" width="12" height="30" />
        </g>
        {/* 卓の隅に転がったサイコロと椀 */}
        <path d="M-64,152q9,-2 18,0q-2,8 -9,8q-7,0 -9,-8z" fill="#7a4a28" />
        <g fill="#f2ece0">
          <rect x="-44" y="152" width="9" height="9" rx="2" />
          <rect x="-32" y="155" width="8" height="8" rx="2" />
        </g>
        <g fill="#3f3a34">
          <circle cx="-39.5" cy="156.5" r="1.4" />
          <circle cx="-28" cy="159" r="1.2" />
        </g>
      </g>

      {/* 一斉に上がる4つのグラス。 */}
      <g className="vietnam-cn-toast">
        <g fill="#e8a81c">
          <path d="M150,118h16l-2,20h-12z" />
          <path d="M186,112h16l-2,20h-12z" />
          <path d="M226,112h16l-2,20h-12z" />
          <path d="M262,118h16l-2,20h-12z" />
        </g>
        <g fill="#f2ece0" opacity="0.85">
          <rect x="150" y="118" width="16" height="4" />
          <rect x="186" y="112" width="16" height="4" />
          <rect x="226" y="112" width="16" height="4" />
          <rect x="262" y="118" width="16" height="4" />
        </g>
        <g className="vietnam-cn-fizz" fill="#f7e2a0">
          <circle cx="156" cy="128" r="1.6" />
          <circle cx="162" cy="132" r="1.2" />
          <circle cx="192" cy="122" r="1.6" />
          <circle cx="232" cy="124" r="1.4" />
          <circle cx="270" cy="130" r="1.6" />
        </g>
      </g>

      {/* 卓を囲む4人。シャツの色も体つきも別。 */}
      <g transform="translate(158,0)">
        <path d="M-12,196v-30q0,-8 12,-8q12,0 12,8v30z" fill="#da251d" />
        <circle cx="0" cy="146" r="10" fill="#8a6a48" />
        <path
          d="M-10,144q10,-11 20,0q0,-8 -10,-8q-10,0 -10,8z"
          fill="#3f3a34"
        />
        <path
          d="M4,160q8,-14 4,-26"
          stroke="#da251d"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M-14,178h-14"
          stroke="#2f6fb0"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(194,0)">
        <path d="M-11,196v-32q0,-7 11,-7q11,0 11,7v32z" fill="#2f8f8a" />
        <circle cx="0" cy="142" r="9.4" fill="#8a6a48" />
        <path d="M-10,140h20l-4,-6h-12z" fill="#e0c890" />
        <path
          d="M2,156q6,-16 4,-28"
          stroke="#2f8f8a"
          strokeWidth="6.4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(234,0)">
        <path d="M-11,196v-32q0,-7 11,-7q11,0 11,7v32z" fill="#e8b21c" />
        <circle cx="0" cy="142" r="9.4" fill="#8a6a48" />
        <path
          d="M-10,140q10,-10 20,0q0,-8 -10,-8q-10,0 -10,8z"
          fill="#5f4a34"
        />
        <path
          d="M-2,156q6,-16 4,-28"
          stroke="#e8b21c"
          strokeWidth="6.4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(270,0)">
        <path d="M-12,196v-30q0,-8 12,-8q12,0 12,8v30z" fill="#7f5f9a" />
        <circle cx="0" cy="146" r="10" fill="#8a6a48" />
        <path
          d="M-10,144q10,-11 20,0q0,-8 -10,-8q-10,0 -10,8z"
          fill="#3f3a34"
        />
        <path
          d="M-4,160q-8,-14 -4,-26"
          stroke="#7f5f9a"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* 低い青いプラスチックの椅子。 */}
      <g fill="#2f6fb0">
        <rect x="146" y="196" width="26" height="7" rx="2" />
        <rect x="184" y="196" width="22" height="7" rx="2" />
        <rect x="224" y="196" width="22" height="7" rx="2" />
        <rect x="258" y="196" width="26" height="7" rx="2" />
        <rect x="112" y="190" width="28" height="8" rx="2" />
      </g>
      <g fill="#255e98">
        <rect x="150" y="203" width="5" height="7" />
        <rect x="163" y="203" width="5" height="7" />
        <rect x="188" y="203" width="4" height="7" />
        <rect x="198" y="203" width="4" height="7" />
        <rect x="228" y="203" width="4" height="7" />
        <rect x="238" y="203" width="4" height="7" />
        <rect x="262" y="203" width="5" height="7" />
        <rect x="275" y="203" width="5" height="7" />
        <rect x="116" y="198" width="5" height="8" />
        <rect x="131" y="198" width="5" height="8" />
      </g>

      {/* 負けた人が差し出す札。**この1枚が厄災の中身。** */}
      <g className="vietnam-cn-pay">
        <g fill="#7fae8a">
          <rect
            x="104"
            y="168"
            width="30"
            height="14"
            rx="2"
            transform="rotate(-9 104 168)"
          />
          <rect
            x="108"
            y="162"
            width="30"
            height="14"
            rx="2"
            transform="rotate(4 108 162)"
          />
        </g>
        <g fill="#5f8f6a">
          <circle cx="120" cy="172" r="3" />
        </g>
      </g>

      {/* 掛け声の輪。 */}
      <g
        className="vietnam-cn-cheer1"
        fill="none"
        stroke="#f2ece0"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.85"
      >
        <path d="M300,132q9,-7 9,-18M310,138q13,-9 13,-26" />
      </g>
      <g
        className="vietnam-cn-cheer2"
        fill="none"
        stroke="#f2ece0"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.85"
      >
        <path d="M132,132q-9,-7 -9,-18M122,138q-13,-9 -13,-26" />
      </g>

      <style>{`
        .vietnam-cn-toast {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-cn-raise 2.2s ease-in-out infinite;
        }
        @keyframes vietnam-cn-raise {
          0%, 100% { transform: translateY(6px); }
          45%, 60% { transform: translateY(-4px); }
        }
        .vietnam-cn-fizz {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-cn-bubble 1.6s ease-in infinite;
        }
        @keyframes vietnam-cn-bubble {
          0% { transform: translateY(6px); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(-8px); opacity: 0; }
        }
        .vietnam-cn-cheer1 {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: vietnam-cn-shout 2.2s ease-out infinite;
        }
        .vietnam-cn-cheer2 {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: vietnam-cn-shout 2.2s ease-out -0.3s infinite;
        }
        @keyframes vietnam-cn-shout {
          0%, 30% { transform: scale(0.5); opacity: 0; }
          55% { transform: scale(1); opacity: 0.9; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .vietnam-cn-pay {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: vietnam-cn-hand 3.6s ease-in-out infinite;
        }
        @keyframes vietnam-cn-hand {
          0%, 100% { transform: translateX(-10px); opacity: 0.7; }
          45%, 70% { transform: translateX(6px); opacity: 1; }
        }
        .vietnam-cn-bulb {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: vietnam-cn-sway 4.6s ease-in-out infinite;
        }
        @keyframes vietnam-cn-sway {
          0%, 100% { transform: rotate(-2.2deg); }
          50% { transform: rotate(2.2deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .vietnam-cn-toast,
          .vietnam-cn-fizz,
          .vietnam-cn-cheer1,
          .vietnam-cn-cheer2,
          .vietnam-cn-pay,
          .vietnam-cn-bulb { animation: none; }
        }
      `}</style>
    </svg>
  );
}
