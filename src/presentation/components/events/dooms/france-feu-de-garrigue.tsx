/**
 * ガリーグの火事。乾いた低木、北風、路肩の火花ひとつ。
 *
 * 斜面の低木に沿って炎が走り、煙が立ち上る。右手の石造りの小屋は
 * 壁を焦がされている。消火飛行艇は夜明けに来るが、火のほうが先に着いた。
 *
 * 炎そのものは低く抑え、煙と逃げる羊で伝える(焼けるものは描かない)。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function FranceFeuDeGarrigue() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 明け方前の空 */}
      <rect width="400" height="210" fill="#2a2b3a" />
      <rect width="400" height="64" fill="#20212e" />
      <rect y="64" width="400" height="26" fill="#3a3040" />

      {/* 煙 */}
      <g fill="#6f6c7a" opacity="0.6">
        <circle className="ffg-smoke-a" cx="150" cy="120" r="22" />
        <circle className="ffg-smoke-b" cx="196" cy="126" r="26" />
        <circle className="ffg-smoke-c" cx="248" cy="122" r="20" />
        <circle className="ffg-smoke-d" cx="108" cy="128" r="18" />
      </g>

      {/* 消火飛行艇 */}
      <g transform="translate(80,40)">
        <g className="ffg-plane">
          <ellipse cx="0" cy="0" rx="34" ry="9" fill="#d8d2c4" />
          <path d="M-30,0 l16,0 l-4,-9 -14,0z" fill="#e8b33f" />
          <rect x="-10" y="-14" width="30" height="6" rx="3" fill="#b8b2a4" />
          <rect x="-14" y="2" width="34" height="6" rx="3" fill="#b8b2a4" />
          <path d="M26,-2 l12,-12 l3,0 l-6,14z" fill="#e05252" />
          <circle cx="-20" cy="-2" r="4" fill="#2a3a4a" />
        </g>
      </g>
      {/* 投下される水 */}
      <g transform="translate(80,52)">
        <g className="ffg-water">
          <path
            d="M-26,0 q26,-8 52,0 l16,54 q-42,14 -84,0z"
            fill="#5b8fe8"
            opacity="0.7"
          />
          <path
            d="M-14,20 q14,-4 28,0 l6,32 q-20,7 -40,0z"
            fill="#8fc4e8"
            opacity="0.6"
          />
        </g>
      </g>

      {/* 斜面 */}
      <path
        d="M0,146 q80,-24 156,-6 q90,22 174,-14 l70,0 0,84 -400,0z"
        fill="#4a4433"
      />
      <path
        d="M0,168 q110,-18 210,4 q96,20 190,-8 l0,46 -400,0z"
        fill="#3a3628"
      />

      {/* 低木 */}
      <g fill="#3f5232">
        <path d="M28,166 q14,-20 30,0z" />
        <path d="M74,160 q14,-20 30,0z" />
        <path d="M300,150 q14,-20 30,0z" />
        <path d="M344,154 q14,-20 30,0z" />
      </g>

      {/* 燃えている低木 */}
      <g transform="translate(140,158)">
        <path d="M-16,0 q16,-22 32,0z" fill="#4a3a22" />
        <g className="ffg-flame-a">
          <path
            d="M0,-4 q-14,-16 -4,-30 q2,10 8,14 q0,-14 8,-20 q-4,16 6,24 q6,10 -18,12z"
            fill="#e8863f"
          />
          <path
            d="M0,-6 q-8,-10 -2,-20 q2,8 6,10 q2,-8 4,-12 q-2,12 4,18 q2,6 -12,4z"
            fill="#f5c93f"
          />
        </g>
      </g>
      <g transform="translate(196,164)">
        <path d="M-18,0 q18,-24 36,0z" fill="#4a3a22" />
        <g className="ffg-flame-b">
          <path
            d="M0,-4 q-16,-18 -4,-34 q2,12 9,16 q0,-16 9,-22 q-5,18 7,26 q7,12 -21,14z"
            fill="#e05252"
          />
          <path
            d="M0,-6 q-9,-12 -2,-22 q2,9 7,11 q2,-9 4,-13 q-2,13 5,20 q2,7 -14,4z"
            fill="#f5b31c"
          />
        </g>
      </g>
      <g transform="translate(248,156)">
        <path d="M-15,0 q15,-20 30,0z" fill="#4a3a22" />
        <g className="ffg-flame-c">
          <path
            d="M0,-4 q-13,-15 -3,-28 q2,10 7,13 q0,-13 7,-19 q-4,15 6,23 q6,9 -17,11z"
            fill="#e8863f"
          />
        </g>
      </g>

      {/* 火の粉 */}
      <g fill="#f5b31c">
        <circle className="ffg-ember-a" cx="160" cy="150" r="3" />
        <circle className="ffg-ember-b" cx="212" cy="156" r="2.5" />
        <circle className="ffg-ember-c" cx="262" cy="148" r="3" />
      </g>

      {/* 壁を焦がされた石小屋 */}
      <g transform="translate(342,178)">
        <rect x="-38" y="-46" width="76" height="46" fill="#9d8f74" />
        <path d="M-44,-46 L0,-70 L44,-46z" fill="#7d6f56" />
        <rect x="-12" y="-26" width="24" height="26" rx="2" fill="#3a3226" />
        {/* 火に炙られた側の壁 */}
        <path d="M-38,-46 l26,0 l0,46 -26,0z" fill="#4a4032" />
        <path d="M-38,0 q6,-22 2,-34 q10,14 10,34z" fill="#2a2520" />
        <path d="M-26,0 q8,-16 4,-26 q9,12 9,26z" fill="#332c25" />
        <path d="M-38,-46 l5,0 l0,46 -5,0z" fill="#e8863f" opacity="0.5" />
      </g>

      {/* 逃げる羊 */}
      <g transform="translate(66,190)">
        <g className="ffg-sheep">
          <ellipse cx="0" cy="-10" rx="17" ry="11" fill="#e2dccc" />
          <circle cx="-15" cy="-16" r="7" fill="#48413a" />
          <rect x="-9" y="-2" width="4" height="10" rx="2" fill="#48413a" />
          <rect x="6" y="-2" width="4" height="10" rx="2" fill="#48413a" />
          <circle cx="-18" cy="-17" r="1.8" fill="#f6efe2" />
        </g>
      </g>

      <style>{`
        .ffg-smoke-a { transform-box: fill-box; transform-origin: center; animation: ffg-rise 5s ease-out infinite; }
        .ffg-smoke-b { transform-box: fill-box; transform-origin: center; animation: ffg-rise 6s ease-out infinite; animation-delay: -2s; }
        .ffg-smoke-c { transform-box: fill-box; transform-origin: center; animation: ffg-rise 5.4s ease-out infinite; animation-delay: -3.4s; }
        .ffg-smoke-d { transform-box: fill-box; transform-origin: center; animation: ffg-rise 6.4s ease-out infinite; animation-delay: -1.2s; }
        .ffg-plane { transform-box: fill-box; transform-origin: center; animation: ffg-fly 6.5s linear infinite; }
        .ffg-water { transform-box: fill-box; transform-origin: 50% 0; animation: ffg-drop 6.5s linear infinite; }
        .ffg-flame-a { transform-box: fill-box; transform-origin: 50% 100%; animation: ffg-lick 0.9s ease-in-out infinite; }
        .ffg-flame-b { transform-box: fill-box; transform-origin: 50% 100%; animation: ffg-lick 1.1s ease-in-out infinite; animation-delay: -0.4s; }
        .ffg-flame-c { transform-box: fill-box; transform-origin: 50% 100%; animation: ffg-lick 0.8s ease-in-out infinite; animation-delay: -0.6s; }
        .ffg-ember-a { transform-box: fill-box; transform-origin: center; animation: ffg-spark 2.6s ease-out infinite; }
        .ffg-ember-b { transform-box: fill-box; transform-origin: center; animation: ffg-spark 3.1s ease-out infinite; animation-delay: -1.1s; }
        .ffg-ember-c { transform-box: fill-box; transform-origin: center; animation: ffg-spark 2.9s ease-out infinite; animation-delay: -1.9s; }
        .ffg-sheep { transform-box: fill-box; transform-origin: 50% 100%; animation: ffg-bolt 2.2s ease-in-out infinite; }
        @keyframes ffg-rise {
          0% { transform: translate(0, 16px) scale(0.5); opacity: 0; }
          25% { opacity: 0.55; }
          100% { transform: translate(-40px, -104px) scale(1.5); opacity: 0; }
        }
        @keyframes ffg-fly {
          0% { transform: translate(-130px, 26px); }
          100% { transform: translate(340px, -14px); }
        }
        @keyframes ffg-drop {
          0%, 40% { transform: translate(-130px, 26px) scaleY(0); opacity: 0; }
          48% { transform: translate(30px, 20px) scaleY(0.4); opacity: 0.8; }
          62% { transform: translate(120px, 12px) scaleY(1.4); opacity: 0.8; }
          76%, 100% { transform: translate(210px, 4px) scaleY(1.8); opacity: 0; }
        }
        @keyframes ffg-lick {
          0%, 100% { transform: scale(1, 1) skewX(0deg); }
          35% { transform: scale(0.9, 1.2) skewX(-6deg); }
          70% { transform: scale(1.08, 0.9) skewX(5deg); }
        }
        @keyframes ffg-spark {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          16% { opacity: 1; }
          100% { transform: translate(-34px, -78px) scale(0.3); opacity: 0; }
        }
        @keyframes ffg-bolt {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-9px, -5px) rotate(-5deg); }
          60% { transform: translate(-17px, 0) rotate(3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ffg-smoke-a, .ffg-smoke-b, .ffg-smoke-c, .ffg-smoke-d,
          .ffg-plane, .ffg-water, .ffg-flame-a, .ffg-flame-b, .ffg-flame-c,
          .ffg-ember-a, .ffg-ember-b, .ffg-ember-c, .ffg-sheep { animation: none; }
        }
      `}</style>
    </svg>
  );
}
