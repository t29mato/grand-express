/**
 * 計画停電で電化区間が止まる。**いまの南アフリカの日常**の側の厄災なので、
 * 事故ではなく「予定どおり来た夕暮れ」として描く。
 *
 * 構図: 画面をまんなかで割り、**左は落ちた区画、右はまだ灯っている区画。**
 * 段階ごとに落とすので、暗いのは点ではなく面で来る。暗い側の窓には蝋燭が点る。
 * その暗い側の下で電車が止まっていて、乗客はもう降りて土手で待っている。
 * 慌てている人はいない。
 *
 * 動くのは4つ: 暗い区画の蝋燭、待つ人の携帯の灯り、団扇であおぐ手、
 * 車内の非常灯のかすかな明滅。
 * 止めた状態でも「町の片側だけ暗く、電車が止まり、人が降りて待っている」で伝わる。
 *
 * (アジア盤の停電とは別物にする: あちらは無人・夜・パンタグラフの火花。
 *  こちらは夕方・人がいて・火花は出ない=そもそも電気が来ていない)
 */
export function SouthafricaLoadSheddingLine() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕暮れの空。上は藍、地平は残照。 */}
      <rect width="400" height="210" fill="#2b2f52" />
      <rect width="400" height="58" fill="#232748" />
      <rect y="86" width="400" height="12" fill="#6d4257" />
      <rect y="96" width="400" height="10" fill="#b0603a" />
      <g fill="#e8e4d0" opacity="0.75">
        <circle cx="46" cy="20" r="1.6" />
        <circle cx="122" cy="36" r="1.2" />
        <circle cx="214" cy="16" r="1.4" />
        <circle cx="304" cy="30" r="1.2" />
        <circle cx="368" cy="12" r="1.5" />
        <circle cx="256" cy="52" r="1.2" />
      </g>
      <circle cx="330" cy="34" r="13" fill="#e8e4d0" opacity="0.85" />
      <circle cx="325" cy="30" r="3.4" fill="#cdc8b2" opacity="0.6" />

      {/* 遠くのなだらかな高原。 */}
      <path d="M0,106 q66,-12 134,-4 q84,10 152,-8 q60,-12 114,4 v28 H0z" fill="#3a3358" />

      {/* ── 左半分: 落ちた区画。窓は消えたまま(止めても暗い)。 */}
      <g fill="#26243c">
        <rect x="4" y="108" width="34" height="26" />
        <rect x="42" y="114" width="28" height="20" />
        <rect x="74" y="104" width="38" height="30" />
        <rect x="116" y="112" width="30" height="22" />
        <rect x="150" y="106" width="36" height="28" />
      </g>
      <g fill="#332f4a">
        <rect x="1" y="105" width="40" height="4" />
        <rect x="71" y="101" width="44" height="4" />
        <rect x="147" y="103" width="42" height="4" />
      </g>
      <g fill="#1c1a2e">
        <rect x="10" y="114" width="9" height="8" />
        <rect x="24" y="114" width="9" height="8" />
        <rect x="48" y="120" width="9" height="8" />
        <rect x="82" y="110" width="10" height="9" />
        <rect x="96" y="110" width="10" height="9" />
        <rect x="82" y="123" width="10" height="8" />
        <rect x="122" y="118" width="9" height="8" />
        <rect x="157" y="112" width="10" height="9" />
        <rect x="171" y="112" width="10" height="9" />
      </g>
      {/* 蝋燭。暗い窓のなかで4つだけ点る。 */}
      <g fill="#f5b31c">
        <ellipse className="sa-ls-candle-a" cx="28.5" cy="119" rx="2.4" ry="3.4" />
        <ellipse className="sa-ls-candle-b" cx="87" cy="115" rx="2.6" ry="3.6" />
        <ellipse className="sa-ls-candle-c" cx="126.5" cy="123" rx="2.4" ry="3.4" />
        <ellipse className="sa-ls-candle-d" cx="176" cy="117" rx="2.4" ry="3.4" />
      </g>
      {/* 落ちた側の街灯は消えている。 */}
      <g stroke="#413c5e" strokeWidth="2.4" fill="none">
        <path d="M62,134 V112 h9" />
      </g>
      <circle cx="72" cy="112" r="3.4" fill="#3a3552" />

      {/* ── 右半分: まだ灯っている区画。**境目がこの絵の芯。** */}
      <g fill="#26243c">
        <rect x="212" y="106" width="36" height="28" />
        <rect x="252" y="114" width="28" height="20" />
        <rect x="284" y="102" width="38" height="32" />
        <rect x="326" y="112" width="30" height="22" />
        <rect x="360" y="106" width="38" height="28" />
      </g>
      <g fill="#332f4a">
        <rect x="209" y="103" width="42" height="4" />
        <rect x="281" y="99" width="44" height="4" />
        <rect x="357" y="103" width="43" height="4" />
      </g>
      <g fill="#f2c869">
        <rect x="219" y="112" width="10" height="9" />
        <rect x="233" y="112" width="10" height="9" />
        <rect x="219" y="125" width="10" height="8" />
        <rect x="258" y="120" width="9" height="8" />
        <rect x="292" y="108" width="10" height="9" />
        <rect x="306" y="108" width="10" height="9" />
        <rect x="292" y="121" width="10" height="9" />
        <rect x="332" y="118" width="9" height="8" />
        <rect x="367" y="112" width="10" height="9" />
        <rect x="381" y="112" width="10" height="9" />
        <rect x="367" y="125" width="10" height="8" />
      </g>
      <g stroke="#4a4468" strokeWidth="2.4" fill="none">
        <path d="M204,134 V110 h9" />
        <path d="M348,134 V108 h9" />
      </g>
      <circle cx="214" cy="110" r="3.6" fill="#f2c869" />
      <circle cx="358" cy="108" r="3.6" fill="#f2c869" />
      <path d="M214,110 l-6,24 h12z" fill="#f2c869" opacity="0.1" />
      <path d="M358,108 l-6,26 h12z" fill="#f2c869" opacity="0.1" />

      {/* ── 土手と線路。 */}
      <rect y="134" width="400" height="76" fill="#2f3a34" />
      <path d="M0,146 q96,-8 190,2 q106,10 210,-4 v10 H0z" fill="#39463c" />
      <rect y="166" width="400" height="7" fill="#3a3428" />
      <g fill="#4c4636">
        <rect x="4" y="167" width="11" height="5" />
        <rect x="36" y="167" width="11" height="5" />
        <rect x="68" y="167" width="11" height="5" />
        <rect x="100" y="167" width="11" height="5" />
        <rect x="132" y="167" width="11" height="5" />
        <rect x="164" y="167" width="11" height="5" />
        <rect x="196" y="167" width="11" height="5" />
        <rect x="228" y="167" width="11" height="5" />
        <rect x="260" y="167" width="11" height="5" />
        <rect x="292" y="167" width="11" height="5" />
        <rect x="324" y="167" width="11" height="5" />
        <rect x="356" y="167" width="11" height="5" />
      </g>
      <rect y="164" width="400" height="3" fill="#6b6a62" />

      {/* 架線。柱は立っているが、線に電気は来ていない。 */}
      <g stroke="#585470" strokeWidth="3.4" fill="none">
        <path d="M232,164 V72 h18" />
        <path d="M392,164 V72 h-18" />
      </g>
      <path d="M250,80 Q312,88 374,80" stroke="#6a6580" strokeWidth="2" fill="none" />

      {/* ── 落ちた区画の下で止まった電車。前照灯も室内灯も落ちている。 */}
      <g>
        <rect x="-6" y="126" width="204" height="40" rx="6" fill="#3f5a6b" />
        <rect x="-6" y="126" width="204" height="8" fill="#a63f38" />
        <rect x="-6" y="158" width="204" height="4" fill="#2c3f4c" />
        <g fill="#1c2431">
          <rect x="6" y="138" width="20" height="15" rx="2" />
          <rect x="34" y="138" width="20" height="15" rx="2" />
          <rect x="62" y="138" width="20" height="15" rx="2" />
          <rect x="112" y="138" width="20" height="15" rx="2" />
          <rect x="140" y="138" width="20" height="15" rx="2" />
          <rect x="168" y="138" width="20" height="15" rx="2" />
        </g>
        {/* 非常灯だけが弱く残る。 */}
        <rect className="sa-ls-emerg" x="34" y="138" width="20" height="15" rx="2" fill="#7f8f5a" />
        <rect className="sa-ls-emerg2" x="140" y="138" width="20" height="15" rx="2" fill="#7f8f5a" />
        <path d="M198,126 q12,16 10,40 h-10z" fill="#3f5a6b" />
        <circle cx="202" cy="150" r="4" fill="#4a4a48" />
        {/* 開いた扉と、降りるための段。 */}
        <rect x="88" y="134" width="20" height="28" fill="#161b22" />
        <rect x="86" y="162" width="24" height="4" fill="#2c3f4c" />
        {/* 上げたままのパンタグラフ。触れてはいるが火花は出ない。 */}
        <path d="M56,126 l14,-16 l14,16" stroke="#8a8f98" strokeWidth="3" fill="none" />
        <path d="M62,84 h16" stroke="#8a8f98" strokeWidth="3" />
        <path d="M70,84 V110" stroke="#8a8f98" strokeWidth="3" />
        <path d="M0,88 Q36,84 78,88" stroke="#6a6580" strokeWidth="2" fill="none" />
        <g fill="#161b22">
          <circle cx="22" cy="167" r="6" />
          <circle cx="50" cy="167" r="6" />
          <circle cx="150" cy="167" r="6" />
          <circle cx="178" cy="167" r="6" />
        </g>
      </g>

      {/* ── 土手で待つ人たち。三人とも別の服・別の姿勢。 */}
      {/* 荷物に腰かけて携帯を見ている人。 */}
      <g>
        <rect x="224" y="191" width="30" height="14" rx="2" fill="#6b5a3a" />
        <rect x="224" y="191" width="30" height="3.4" fill="#8a7449" />
        {/* 腰かけた姿勢。膝を前へ、背をやや丸めて携帯を覗き込む。 */}
        <path d="M238,191 l10,10 M232,191 l6,12" stroke="#2c3a4c" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M234,191 V178 q0,-5 6,-5 h4 q4,0 4,5 v13z" fill="#3f7f62" />
        <circle cx="241" cy="168" r="7.4" fill="#6b4a34" />
        <path d="M245,181 q9,1 12,5" stroke="#3f7f62" strokeWidth="4.6" fill="none" strokeLinecap="round" />
        <rect x="255" y="182" width="6.4" height="10" rx="1.4" fill="#20242e" />
        <rect x="256" y="183" width="4.4" height="7" rx="0.8" fill="#9fc4d8" />
        <ellipse className="sa-ls-phone" cx="258" cy="180" rx="9" ry="7" fill="#bfe0f0" opacity="0.35" />
      </g>
      {/* 立って団扇であおぐ人。 */}
      <g>
        <path d="M300,203 V182" stroke="#5b8fe8" strokeWidth="11" strokeLinecap="round" fill="none" />
        <path d="M296,203 l-4,7 M304,203 l4,7" stroke="#2c3a4c" strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="300" cy="172" r="7.6" fill="#8a5a3c" />
        <path d="M300,182 q11,-2 15,-8" stroke="#5b8fe8" strokeWidth="5" fill="none" strokeLinecap="round" />
        <g className="sa-ls-fan">
          <path d="M315,174 q11,-9 15,2 q-11,8 -15,-2z" fill="#d8c9a4" />
        </g>
      </g>
      {/* 子どもと灯油ランプ。 */}
      <g>
        <path d="M356,204 V192" stroke="#e8443f" strokeWidth="9" strokeLinecap="round" fill="none" />
        <circle cx="356" cy="184" r="6.2" fill="#6b4a34" />
        <path d="M356,194 q-9,2 -12,8" stroke="#e8443f" strokeWidth="4.4" fill="none" strokeLinecap="round" />
      </g>
      <g>
        <rect x="326" y="192" width="15" height="13" rx="2" fill="#4a4a52" />
        <path d="M328,192 h11 l-2,-8 h-7z" fill="#c9c2a8" opacity="0.5" />
        <ellipse className="sa-ls-lamp" cx="333.5" cy="192" rx="3.2" ry="4.6" fill="#f5b31c" />
        <rect x="324" y="205" width="19" height="3.4" rx="1.4" fill="#4a4a52" />
        <ellipse cx="333" cy="188" rx="14" ry="11" fill="#f5b31c" opacity="0.12" />
      </g>

      <style>{`
        .sa-ls-candle-a, .sa-ls-candle-b, .sa-ls-candle-c,
        .sa-ls-candle-d, .sa-ls-lamp {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .sa-ls-candle-a { animation: sa-ls-flicker 2.2s ease-in-out infinite; }
        .sa-ls-candle-b { animation: sa-ls-flicker 2.6s ease-in-out -0.8s infinite; }
        .sa-ls-candle-c { animation: sa-ls-flicker 1.9s ease-in-out -1.4s infinite; }
        .sa-ls-candle-d { animation: sa-ls-flicker 2.4s ease-in-out -2s infinite; }
        .sa-ls-lamp { animation: sa-ls-flicker 1.7s ease-in-out -0.5s infinite; }
        @keyframes sa-ls-flicker {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          35% { transform: scaleY(0.74); opacity: 0.72; }
          62% { transform: scaleY(1.14); opacity: 1; }
        }
        .sa-ls-phone { animation: sa-ls-glow 3.4s ease-in-out infinite; }
        @keyframes sa-ls-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.52; }
        }
        .sa-ls-emerg { animation: sa-ls-weak 4.6s ease-in-out infinite; }
        .sa-ls-emerg2 { animation: sa-ls-weak 4.6s ease-in-out -2.3s infinite; }
        @keyframes sa-ls-weak {
          0%, 100% { opacity: 0.5; }
          46% { opacity: 0.2; }
          52% { opacity: 0.62; }
        }
        .sa-ls-fan {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: sa-ls-wave 1.1s ease-in-out infinite;
        }
        @keyframes sa-ls-wave {
          0%, 100% { transform: rotate(-18deg); }
          50% { transform: rotate(14deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-ls-candle-a,
          .sa-ls-candle-b,
          .sa-ls-candle-c,
          .sa-ls-candle-d,
          .sa-ls-lamp,
          .sa-ls-phone,
          .sa-ls-emerg,
          .sa-ls-emerg2,
          .sa-ls-fan { animation: none; }
        }
      `}</style>
    </svg>
  );
}
