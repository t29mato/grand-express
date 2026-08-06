/**
 * プレモンスーンの砂嵐。午後がオレンジに染まり、カメラは二度と直らない。
 *
 * 右から砂の壁が押し寄せ、砂粒が横殴りに飛ぶ。倒れたカメラのレンズには
 * 上から砂が流れ込み、内側からじわじわ埋まっていく。
 */
export function SandstormRepair() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 砂で濁った空と砂丘 */}
      <rect width="400" height="210" fill="#2e1c10" />
      <rect width="400" height="150" fill="#8f4e20" />
      <circle cx="312" cy="40" r="19" fill="#b9702a" />
      <rect y="140" width="400" height="70" fill="#8d6b3d" />
      <path
        d="M0,150 Q66,126 134,148 Q206,172 276,144 Q342,120 400,142 L400,210 L0,210z"
        fill="#8d6b3d"
      />
      <path d="M0,178 Q90,158 170,180 Q254,200 400,176 L400,210 L0,210z" fill="#a8834d" />

      {/* レンズへ落ちてくる砂の筋 */}
      <path d="M156,48 Q146,108 114,170 L100,166 Q136,106 144,46z" fill="#e0b273" opacity="0.2" />
      <g transform="translate(102,163)">
        <circle className="sr-grain-a" r="3.4" fill="#e8c48c" />
        <circle className="sr-grain-b" r="2.6" fill="#e8c48c" />
        <circle className="sr-grain-c" r="3" fill="#e8c48c" />
        <circle className="sr-grain-d" r="2.2" fill="#e8c48c" />
        <circle className="sr-grain-e" r="3.2" fill="#e8c48c" />
      </g>

      {/* 砂に半分埋もれて転がったカメラ */}
      <g className="sr-camera">
        <rect x="15" y="-31" width="12" height="31" rx="3" fill="#150f09" />
        <rect x="-27" y="-31" width="52" height="31" rx="4" fill="#231a13" />
        <rect x="-14" y="-39" width="18" height="9" rx="2" fill="#231a13" />
        <rect x="-24" y="-26" width="9" height="5" rx="2" fill="#8d6b3d" />
        <circle cx="-2" cy="-15" r="14" fill="#150f09" />
        <circle cx="-2" cy="-15" r="10" fill="#3a2c1e" />
        <circle cx="-2" cy="-15" r="8" fill="#5b8fe8" />
        <circle className="sr-fill" cx="-2" cy="-15" r="8" fill="#d9a967" />
      </g>
      {/* カメラの足元に積もった砂 */}
      <path d="M58,180 Q86,166 112,173 Q134,166 152,182 L152,196 L58,196z" fill="#a8834d" />

      {/* 右から迫る砂の壁 */}
      <g className="sr-gust">
        <g fill="#c98b4a" opacity="0.45">
          <ellipse cx="34" cy="52" rx="30" ry="26" />
          <ellipse cx="18" cy="104" rx="26" ry="30" />
          <ellipse cx="46" cy="156" rx="32" ry="28" />
          <ellipse cx="82" cy="30" rx="34" ry="28" />
          <ellipse cx="74" cy="120" rx="40" ry="42" />
          <ellipse cx="96" cy="186" rx="36" ry="26" />
          <rect x="70" y="0" width="300" height="210" />
        </g>
        <g fill="#dda863" opacity="0.34">
          <ellipse cx="120" cy="64" rx="34" ry="34" />
          <ellipse cx="136" cy="146" rx="40" ry="38" />
          <ellipse cx="164" cy="30" rx="30" ry="26" />
          <rect x="150" y="0" width="230" height="210" />
        </g>
      </g>

      {/* 横殴りに飛ぶ砂粒 */}
      <g fill="#e0b273" opacity="0.75">
        <rect className="sr-grit-a" x="266" y="34" width="30" height="3" rx="1.5" />
        <rect className="sr-grit-b" x="182" y="66" width="24" height="3" rx="1.5" />
        <rect className="sr-grit-c" x="314" y="96" width="34" height="3" rx="1.5" />
        <rect className="sr-grit-d" x="120" y="122" width="22" height="3" rx="1.5" />
        <rect className="sr-grit-e" x="238" y="152" width="28" height="3" rx="1.5" />
        <rect className="sr-grit-f" x="52" y="88" width="20" height="3" rx="1.5" />
      </g>

      <style>{`
        .sr-camera {
          transform: translate(104px, 176px) rotate(-9deg);
          animation: sr-rattle 0.42s ease-in-out infinite;
        }
        .sr-fill {
          transform-box: fill-box;
          transform-origin: center;
          animation: sr-bury 3.4s ease-in infinite;
        }
        .sr-gust { transform: translate(178px, 0); animation: sr-sweep 6s linear infinite; }
        .sr-grain-a { transform: translate(34px, -46px); animation: sr-pour 1.4s linear infinite; }
        .sr-grain-b {
          transform: translate(34px, -46px);
          animation: sr-pour 1.4s linear infinite;
          animation-delay: -0.5s;
        }
        .sr-grain-c {
          transform: translate(34px, -46px);
          animation: sr-pour 1.4s linear infinite;
          animation-delay: -0.95s;
        }
        .sr-grain-d {
          transform: translate(50px, -70px);
          animation: sr-pour 1.4s linear infinite;
          animation-delay: -0.25s;
        }
        .sr-grain-e {
          transform: translate(16px, -22px);
          animation: sr-pour 1.4s linear infinite;
          animation-delay: -1.2s;
        }
        .sr-grit-a { animation: sr-blow 1.1s linear infinite; }
        .sr-grit-b { animation: sr-blow 0.9s linear infinite; animation-delay: -0.4s; }
        .sr-grit-c { animation: sr-blow 1.3s linear infinite; animation-delay: -0.7s; }
        .sr-grit-d { animation: sr-blow 0.8s linear infinite; animation-delay: -0.2s; }
        .sr-grit-e { animation: sr-blow 1.2s linear infinite; animation-delay: -0.9s; }
        .sr-grit-f { animation: sr-blow 1s linear infinite; animation-delay: -0.55s; }
        @keyframes sr-rattle {
          0%, 100% { transform: translate(104px, 176px) rotate(-9deg); }
          30% { transform: translate(102px, 175px) rotate(-12deg); }
          70% { transform: translate(106px, 177px) rotate(-6deg); }
        }
        @keyframes sr-bury {
          0% { transform: scale(0.15); }
          80%, 100% { transform: scale(1); }
        }
        @keyframes sr-sweep {
          0% { transform: translate(400px, 0); }
          100% { transform: translate(-320px, 0); }
        }
        @keyframes sr-pour {
          0% { transform: translate(66px, -92px); opacity: 0; }
          20% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translate(0, 2px); opacity: 0; }
        }
        @keyframes sr-blow {
          0% { transform: translate(150px, -8px); opacity: 0; }
          15% { opacity: 0.85; }
          80% { opacity: 0.85; }
          100% { transform: translate(-260px, 14px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sr-camera, .sr-fill, .sr-gust,
          .sr-grain-a, .sr-grain-b, .sr-grain-c, .sr-grain-d, .sr-grain-e,
          .sr-grit-a, .sr-grit-b, .sr-grit-c,
          .sr-grit-d, .sr-grit-e, .sr-grit-f { animation: none; }
        }
      `}</style>
    </svg>
  );
}
