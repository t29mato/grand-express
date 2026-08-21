/**
 * ゼネストが列車を止める(足止め)。
 *
 * 7枚の構図表でここは**曇りの昼・車両基地の柵越し・鉛色**の担当。
 * **太陽を出さない。**基地に列車は全部いる——動かないだけ。
 * 荒れた絵にはしない。旗と、待つ人と、回り続ける時計で語る。
 *
 * 動くのは**柵の無地の赤い旗2本・駅の時計の針・流れる鉛色の雲・
 * ベンチで待つ人の貧乏ゆすり**。止めた状態でも、留置された列車の列と
 * 旗と、スーツケースを提げて座る人の構図で分かる。
 */
export function ArgentinaParogeneral() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 鉛色の空。太陽は無い。 */}
      <rect width="400" height="210" fill="#8f989f" />
      <rect width="400" height="70" fill="#7a848c" />
      <g className="amg-cloud" fill="#9aa4aa">
        <ellipse cx="80" cy="30" rx="58" ry="12" />
        <ellipse cx="112" cy="22" rx="34" ry="8" />
      </g>
      <g className="amg-cloud amg-cloud2" fill="#a8b0b6">
        <ellipse cx="300" cy="46" rx="64" ry="11" />
        <ellipse cx="330" cy="38" rx="36" ry="7" />
      </g>

      {/* 車両基地。留置された近郊電車の列(中景)。 */}
      <rect y="70" width="400" height="60" fill="#6f7a80" />
      <g>
        {[8, 148, 288].map((x) => (
          <g key={x}>
            <rect x={x} y={84} width={124} height={34} rx={5} fill="#3f6b5f" />
            <rect x={x} y={84} width={124} height={8} rx={4} fill="#f5b31c" />
            <g fill="#2c3e38">
              <rect x={x + 10} y={96} width={16} height={13} rx={2} />
              <rect x={x + 34} y={96} width={16} height={13} rx={2} />
              <rect x={x + 58} y={96} width={16} height={13} rx={2} />
              <rect x={x + 82} y={96} width={16} height={13} rx={2} />
              <rect x={x + 104} y={96} width={12} height={13} rx={2} />
            </g>
            <rect x={x} y={118} width={124} height={5} fill="#2c3e38" />
          </g>
        ))}
      </g>
      <rect y="128" width="400" height="6" fill="#5a646a" />

      {/* 基地の金網の柵。 */}
      <g stroke="#4c565c" strokeWidth="2.4" fill="none">
        {[10, 60, 110, 160, 210, 260, 310, 360].map((x) => (
          <path key={x} d={`M${x},70V134`} />
        ))}
        <path d="M0,74h400M0,130h400" />
      </g>
      <g stroke="#5f6a70" strokeWidth="1" opacity="0.7" fill="none">
        <path d="M0,86h400M0,98h400M0,110h400M0,122h400" />
      </g>

      {/* 柵に結ばれた無地の旗(組合の赤)。紋章も文字も描かない。 */}
      <g>
        <path d="M96,70V40" stroke="#4c565c" strokeWidth="3" />
        <g className="amg-flag">
          <path d="M96,40q11,4 22,0q11,-4 22,0v14q-11,4 -22,0q-11,-4 -22,0z" fill="#c8452f" />
        </g>
      </g>
      <g>
        <path d="M282,70V36" stroke="#4c565c" strokeWidth="3" />
        <g className="amg-flag amg-flag2">
          <path d="M282,36q11,4 22,0q11,-4 22,0v14q-11,4 -22,0q-11,-4 -22,0z" fill="#c8452f" />
        </g>
      </g>

      {/* ホーム。 */}
      <rect y="134" width="400" height="76" fill="#8f8a80" />
      <rect y="134" width="400" height="7" fill="#a8a298" />
      <path d="M0,141h400v3H0z" fill="#6f6a62" />

      {/* 駅の時計(数字は描かない)。針だけが回り続ける。 */}
      <g>
        <path d="M52,150V96" stroke="#4c565c" strokeWidth="4" />
        <circle cx="52" cy="88" r="15" fill="#e8e4da" stroke="#4c565c" strokeWidth="3" />
        <g stroke="#33383c" strokeWidth="2.4" strokeLinecap="round">
          <path className="amg-hand-h" d="M52,88L52,79" />
          <path className="amg-hand-m" d="M52,88L60,88" />
        </g>
        <circle cx="52" cy="88" r="1.8" fill="#33383c" />
      </g>

      {/* 閉じた改札の門。 */}
      <g>
        <rect x="330" y="146" width="8" height="42" fill="#5a646a" />
        <rect x="384" y="146" width="8" height="42" fill="#5a646a" />
        <g stroke="#7a848c" strokeWidth="4" fill="none">
          <path d="M338,154h46M338,166h46M338,178h46" />
        </g>
        <rect x="352" y="158" width="18" height="12" rx="2" fill="#c8452f" />
        <rect x="355" y="161" width="12" height="6" rx="1" fill="#efe8d8" />
      </g>

      {/* ベンチで待つ人(緑のコート)とスーツケース。 */}
      <g>
        <rect x="130" y="172" width="70" height="7" rx="2" fill="#6b5330" />
        <g fill="#5a4326">
          <rect x="136" y="179" width="6" height="16" />
          <rect x="188" y="179" width="6" height="16" />
        </g>
        <ellipse cx="162" cy="198" rx="30" ry="5" fill="#000" opacity="0.2" />
        {/* 座る人。 */}
        <path d="M148,174l4,-26h20l4,26z" fill="#4f7057" />
        <circle cx="162" cy="140" r="9" fill="#c98f5f" />
        <path d="M152,140a10,8 0 0 1 20,0z" fill="#3a3430" />
        <g className="amg-knee">
          <rect x="150" y="172" width="9" height="18" rx="3" fill="#3a3430" />
        </g>
        <rect x="163" y="172" width="9" height="18" rx="3" fill="#3a3430" />
        <path d="M150,152l-8,14" stroke="#4f7057" strokeWidth="5.4" strokeLinecap="round" fill="none" />
        {/* 頬杖。 */}
        <path d="M174,152l-6,-10" stroke="#4f7057" strokeWidth="5.4" strokeLinecap="round" fill="none" />
        {/* スーツケース。 */}
        <rect x="206" y="176" width="26" height="20" rx="3" fill="#8a4a30" />
        <rect x="214" y="172" width="10" height="5" rx="2" fill="#5f3320" />
        <path d="M206,184h26" stroke="#5f3320" strokeWidth="2" />
      </g>

      {/* 風で転がる新聞紙(文字は描かない)。 */}
      <g className="amg-paper">
        <path d="M0,0q6,-6 12,0q-4,4 -12,0z" fill="#dcd8cc" />
      </g>

      <style>{`
        .amg-cloud { animation: amg-drift 14s linear infinite; }
        .amg-cloud2 { animation-duration: 18s; animation-delay: -7s; }
        @keyframes amg-drift {
          0%   { transform: translateX(-30px); }
          100% { transform: translateX(60px); }
        }
        .amg-flag {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: amg-wave 2.8s ease-in-out infinite;
        }
        .amg-flag2 { animation-delay: 1.1s; }
        @keyframes amg-wave {
          0%, 100% { transform: skewY(3deg); }
          50%      { transform: skewY(-3deg); }
        }
        .amg-hand-m {
          transform-box: view-box;
          transform-origin: 52px 88px;
          animation: amg-min 6s linear infinite;
        }
        .amg-hand-h {
          transform-box: view-box;
          transform-origin: 52px 88px;
          animation: amg-min 72s linear infinite;
        }
        @keyframes amg-min {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .amg-knee {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: amg-tap 0.9s ease-in-out infinite;
        }
        @keyframes amg-tap {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2.6px); }
        }
        .amg-paper { animation: amg-tumble 7s linear infinite; }
        @keyframes amg-tumble {
          0%   { transform: translate(-20px, 196px) rotate(0deg); }
          100% { transform: translate(420px, 188px) rotate(720deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .amg-cloud, .amg-cloud2, .amg-flag, .amg-flag2,
          .amg-hand-m, .amg-hand-h, .amg-knee, .amg-paper {
            animation: none;
          }
          /* 紙は改札の前に落ちた状態で止める。 */
          .amg-paper { transform: translate(310px, 196px); }
        }
      `}</style>
    </svg>
  );
}
