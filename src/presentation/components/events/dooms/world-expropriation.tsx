/**
 * 事業が接収される。朝六時のラジオで政令が読み上げられ、
 * 七時には門の前に人が立っている。
 *
 * 門に鎖が回され、錠が下ろされ、封印の紙が貼られる。
 * 昨日まで自分のものだった上屋が、今日から国のものになる。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function WorldExpropriation() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 明け方 */}
      <rect width="400" height="210" fill="#33384a" />
      <rect width="400" height="28" fill="#282c3c" />
      <rect y="28" width="400" height="16" fill="#6b5058" />
      <circle cx="322" cy="36" r="13" fill="#e8a44a" opacity="0.7" />

      {/* 上屋(接収される建物) */}
      <rect x="20" y="42" width="360" height="118" fill="#4a4f5c" />
      <rect x="20" y="42" width="360" height="9" fill="#565c6a" />
      <g fill="#343948">
        <rect x="36" y="58" width="42" height="26" rx="3" />
        <rect x="92" y="58" width="42" height="26" rx="3" />
        <rect x="266" y="58" width="42" height="26" rx="3" />
        <rect x="322" y="58" width="42" height="26" rx="3" />
      </g>
      {/* 荷物用の大扉 */}
      <rect x="148" y="58" width="104" height="102" fill="#2b3040" />
      <g stroke="#3a4050" strokeWidth="4" fill="none">
        <path d="M148,74 L252,74" />
        <path d="M148,92 L252,92" />
        <path d="M148,110 L252,110" />
        <path d="M148,128 L252,128" />
      </g>

      {/* 地面 */}
      <rect y="160" width="400" height="50" fill="#3c4150" />
      <rect y="160" width="400" height="5" fill="#474c5c" />

      {/* 鉄の門 */}
      <g fill="#6b727e">
        <rect x="112" y="72" width="10" height="96" rx="3" />
        <rect x="278" y="72" width="10" height="96" rx="3" />
      </g>
      <g fill="#5b6270">
        <rect x="122" y="86" width="76" height="7" />
        <rect x="122" y="150" width="76" height="7" />
        <rect x="202" y="86" width="76" height="7" />
        <rect x="202" y="150" width="76" height="7" />
        <rect x="130" y="86" width="6" height="71" />
        <rect x="152" y="86" width="6" height="71" />
        <rect x="174" y="86" width="6" height="71" />
        <rect x="212" y="86" width="6" height="71" />
        <rect x="234" y="86" width="6" height="71" />
        <rect x="256" y="86" width="6" height="71" />
      </g>

      {/* 渡される鎖と錠 */}
      <g transform="translate(200,124)">
        <g className="wqx-chain">
          <rect x="-60" y="-5" width="120" height="10" rx="5" fill="#8d949c" />
          <g fill="#6b727a">
            <circle cx="-40" cy="0" r="6" />
            <circle cx="-14" cy="0" r="6" />
            <circle cx="14" cy="0" r="6" />
            <circle cx="40" cy="0" r="6" />
          </g>
        </g>
      </g>
      <g transform="translate(200,138)">
        <g className="wqx-lock">
          <rect x="-13" y="-8" width="26" height="22" rx="4" fill="#e8c23f" />
          <path
            d="M-8,-8 l0,-8 a8,8 0 0 1 16,0 l0,8"
            stroke="#c9a112"
            strokeWidth="5"
            fill="none"
          />
          <circle cx="0" cy="2" r="3.5" fill="#8d7412" />
        </g>
      </g>

      {/* 封印の紙 */}
      <g transform="translate(238,106)">
        <g className="wqx-seal">
          <rect x="-24" y="-17" width="48" height="34" rx="2" fill="#f6efe2" />
          <g fill="#9aa4ae">
            <rect x="-18" y="-10" width="26" height="3.5" rx="1.75" />
            <rect x="-18" y="-3" width="26" height="3.5" rx="1.75" />
            <rect x="-18" y="4" width="16" height="3.5" rx="1.75" />
          </g>
          <circle cx="13" cy="7" r="7" fill="#e05252" />
        </g>
      </g>

      {/* 門の前に立つ二人 */}
      <g fill="#20242f">
        <g className="wqx-guard-a">
          <circle cx="98" cy="120" r="15" />
          <path d="M74,168 q24,-30 48,0z" />
          <rect x="80" y="132" width="36" height="38" rx="10" />
        </g>
        <g className="wqx-guard-b">
          <circle cx="330" cy="124" r="14" />
          <rect x="313" y="136" width="34" height="34" rx="10" />
        </g>
      </g>

      {/* 政令を読み上げるラジオ */}
      <g transform="translate(48,176)">
        <rect x="-26" y="-22" width="52" height="30" rx="4" fill="#6b5233" />
        <rect x="-26" y="-22" width="52" height="7" rx="3" fill="#7d6140" />
        <circle cx="-11" cy="-6" r="8" fill="#3a2c1c" />
        <rect x="2" y="-13" width="18" height="4" rx="2" fill="#3a2c1c" />
        <circle cx="8" cy="-2" r="4" fill="#e8c23f" />
        <rect x="16" y="-34" width="3" height="14" fill="#8d949c" />
      </g>
      <g transform="translate(72,144)">
        <g className="wqx-wave-a">
          <path
            d="M0,0 q10,10 0,20"
            stroke="#e8c23f"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
        <g className="wqx-wave-b">
          <path
            d="M9,-5 q16,15 0,30"
            stroke="#e8c23f"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>

      <style>{`
        .wqx-chain { transform-box: fill-box; transform-origin: center; animation: wqx-draw 5s ease-in-out infinite; }
        .wqx-lock { transform-box: fill-box; transform-origin: 50% 0; animation: wqx-shut 5s ease-in-out infinite; }
        .wqx-seal { transform-box: fill-box; transform-origin: left center; animation: wqx-paste 5s ease-in-out infinite; }
        .wqx-guard-a { transform-box: fill-box; transform-origin: 50% 100%; animation: wqx-stand 4.4s ease-in-out infinite; }
        .wqx-guard-b { transform-box: fill-box; transform-origin: 50% 100%; animation: wqx-stand 5.2s ease-in-out infinite; animation-delay: -1.6s; }
        .wqx-wave-a { transform-box: fill-box; transform-origin: left center; animation: wqx-air 1.8s ease-out infinite; }
        .wqx-wave-b { transform-box: fill-box; transform-origin: left center; animation: wqx-air 1.8s ease-out infinite; animation-delay: -0.6s; }
        @keyframes wqx-draw {
          0%, 10% { transform: scaleX(0.1); opacity: 0; }
          30%, 100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes wqx-shut {
          0%, 30% { transform: translate(0, -18px) rotate(-16deg); opacity: 0; }
          44% { transform: translate(0, 2px) rotate(6deg); opacity: 1; }
          56%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
        }
        @keyframes wqx-paste {
          0%, 26% { transform: rotate(-70deg) translate(0, -8px); opacity: 0; }
          40% { transform: rotate(6deg); opacity: 1; }
          52%, 100% { transform: rotate(0deg); opacity: 1; }
        }
        @keyframes wqx-stand {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -3px); }
        }
        @keyframes wqx-air {
          0% { transform: scale(0.4); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wqx-chain, .wqx-lock, .wqx-seal, .wqx-guard-a, .wqx-guard-b,
          .wqx-wave-a, .wqx-wave-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
