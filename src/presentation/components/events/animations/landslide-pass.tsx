/**
 * モンスーンの雨で山肌が崩れ、峠道が塞がって二日足止めになる。
 *
 * 雨が斜めに降りつづけ、右手の斜面から岩が転がり落ちて道の上に土砂が積もる。
 * 手前ではバスが止まり、旅人が立ち尽くす。左端の茶屋からは煙が上がっている。
 */
export function LandslidePass() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* モンスーンの空 */}
      <rect width="400" height="210" fill="#44586a" />
      <g fill="#37485a">
        <ellipse cx="70" cy="20" rx="62" ry="20" />
        <ellipse cx="190" cy="12" rx="70" ry="18" />
        <ellipse cx="330" cy="18" rx="66" ry="20" />
      </g>

      {/* 奥の峰 */}
      <g fill="#54687c">
        <path d="M0,146 L54,58 L108,146 z" />
        <path d="M84,146 L146,44 L208,146 z" />
      </g>
      <g fill="#dce8f0">
        <path d="M40,80 L54,58 L68,80 L58,74 L48,78 z" />
        <path d="M132,68 L146,44 L160,68 L150,62 L140,66 z" />
      </g>

      {/* 崩れた斜面 */}
      <path d="M226,178 L286,40 L330,10 L400,10 L400,178 z" fill="#4a4234" />
      <path d="M296,18 L322,18 L300,178 L246,178 z" fill="#6b5a3a" />

      {/* 峠道 */}
      <rect y="146" width="400" height="28" fill="#51535a" />
      <rect y="146" width="400" height="3" fill="#6a6c74" />
      <rect y="174" width="400" height="36" fill="#33402f" />
      <g fill="#7d7f86">
        <rect x="14" y="158" width="22" height="4" />
        <rect x="58" y="158" width="22" height="4" />
        <rect x="102" y="158" width="22" height="4" />
      </g>

      {/* 道をふさぐ土砂 */}
      <path d="M218,174 Q248,132 288,142 Q332,152 348,174 z" fill="#6b5a3a" />
      <g fill="#57503f">
        <circle cx="252" cy="160" r="11" />
        <circle cx="288" cy="152" r="14" />
        <circle cx="320" cy="164" r="10" />
        <circle cx="270" cy="170" r="8" />
      </g>

      {/* 落ちてくる岩 */}
      <g transform="translate(302,34)">
        <g className="lslide-rock lslide-rock-a">
          <path d="M-11,-9 L9,-12 L13,6 L-4,12 L-13,2 z" fill="#6f6753" />
        </g>
      </g>
      <g transform="translate(312,26)">
        <g className="lslide-rock lslide-rock-b">
          <path d="M-8,-7 L7,-9 L10,5 L-3,9 L-10,1 z" fill="#7d7460" />
        </g>
      </g>
      <g transform="translate(294,44)">
        <g className="lslide-rock lslide-rock-c">
          <path d="M-6,-5 L5,-7 L8,4 L-2,7 L-8,1 z" fill="#5f5849" />
        </g>
      </g>

      {/* 足止めのバス */}
      <g>
        <rect x="64" y="108" width="116" height="42" rx="6" fill="#e8443f" />
        <rect x="64" y="136" width="116" height="6" fill="#c22f2c" />
        <g fill="#8fc4e8">
          <rect x="72" y="116" width="22" height="16" rx="2" />
          <rect x="100" y="116" width="22" height="16" rx="2" />
          <rect x="128" y="116" width="22" height="16" rx="2" />
          <rect x="156" y="116" width="18" height="16" rx="2" />
        </g>
        <circle className="lslide-lamp" cx="176" cy="144" r="5" fill="#f5b31c" />
        <circle cx="86" cy="152" r="10" fill="#1f1f24" />
        <circle cx="158" cy="152" r="10" fill="#1f1f24" />
        <rect
          className="lslide-wiper"
          x="160"
          y="114"
          width="18"
          height="3"
          rx="1.5"
          fill="#2b2b30"
        />
      </g>

      {/* 立ち尽くす旅人 */}
      <g className="lslide-wait">
        <rect x="192" y="152" width="7" height="18" fill="#3a3348" />
        <rect x="202" y="152" width="7" height="18" fill="#3a3348" />
        <rect x="190" y="122" width="21" height="32" rx="7" fill="#5b8fe8" />
        <circle cx="200" cy="112" r="10" fill="#f6efe2" />
        <rect x="180" y="112" width="12" height="7" rx="3.5" fill="#f6efe2" />
        <rect x="209" y="112" width="12" height="7" rx="3.5" fill="#f6efe2" />
      </g>

      {/* 二日を過ごす茶屋 */}
      <g>
        <rect x="8" y="116" width="50" height="32" fill="#8a6a4a" />
        <path d="M0,116 L33,94 L66,116 z" fill="#5a4632" />
        <rect className="lslide-tea" x="16" y="124" width="14" height="12" fill="#f5b31c" />
        <rect x="38" y="126" width="12" height="22" fill="#3a2c1e" />
        <rect x="44" y="98" width="8" height="16" fill="#6b543a" />
      </g>
      <g className="lslide-smoke" fill="#8d9aa4">
        <circle className="lslide-puff-a" cx="48" cy="92" r="6" />
        <circle className="lslide-puff-b" cx="48" cy="92" r="5" />
        <circle className="lslide-puff-c" cx="48" cy="92" r="4" />
      </g>

      {/* 降りつづける雨 */}
      <g className="lslide-rain" stroke="#a8c2d4" strokeWidth="2" strokeLinecap="round">
        <path d="M20,-30 l-6,18" />
        <path d="M62,-14 l-6,18" />
        <path d="M104,-34 l-6,18" />
        <path d="M146,-6 l-6,18" />
        <path d="M188,-26 l-6,18" />
        <path d="M230,-12 l-6,18" />
        <path d="M272,-32 l-6,18" />
        <path d="M314,-8 l-6,18" />
        <path d="M356,-24 l-6,18" />
        <path d="M38,30 l-6,18" />
        <path d="M80,52 l-6,18" />
        <path d="M122,26 l-6,18" />
        <path d="M164,58 l-6,18" />
        <path d="M206,34 l-6,18" />
        <path d="M248,60 l-6,18" />
        <path d="M290,28 l-6,18" />
        <path d="M332,54 l-6,18" />
        <path d="M374,32 l-6,18" />
        <path d="M14,94 l-6,18" />
        <path d="M56,118 l-6,18" />
        <path d="M98,90 l-6,18" />
        <path d="M140,124 l-6,18" />
        <path d="M182,96 l-6,18" />
        <path d="M224,120 l-6,18" />
        <path d="M266,92 l-6,18" />
        <path d="M308,126 l-6,18" />
        <path d="M350,98 l-6,18" />
        <path d="M32,158 l-6,18" />
        <path d="M116,162 l-6,18" />
        <path d="M200,156 l-6,18" />
        <path d="M284,164 l-6,18" />
        <path d="M368,158 l-6,18" />
      </g>

      <style>{`
        .lslide-rain { animation: lslide-fall 0.7s linear infinite; }
        .lslide-rock { animation: lslide-tumble 2.4s ease-in infinite; }
        .lslide-rock-b { animation-delay: 0.8s; }
        .lslide-rock-c { animation-delay: 1.5s; }
        .lslide-lamp { animation: lslide-flicker 1.8s ease-in-out infinite; }
        .lslide-wiper { animation: lslide-wipe 1.4s ease-in-out infinite; transform-origin: 178px 116px; }
        .lslide-wait { animation: lslide-shrug 3s ease-in-out infinite; }
        .lslide-tea { animation: lslide-flicker 2.6s ease-in-out infinite; }
        .lslide-puff-a { animation: lslide-rise 3s ease-out infinite; }
        .lslide-puff-b { animation: lslide-rise 3s ease-out infinite 1s; }
        .lslide-puff-c { animation: lslide-rise 3s ease-out infinite 2s; }
        @keyframes lslide-fall {
          from { transform: translate(4px, -32px); }
          to { transform: translate(-4px, 0); }
        }
        @keyframes lslide-tumble {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(-32px, 112px) rotate(300deg); opacity: 0; }
        }
        @keyframes lslide-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes lslide-wipe {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-32deg); }
        }
        @keyframes lslide-shrug {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -2px); }
        }
        @keyframes lslide-rise {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
          100% { transform: translate(-14px, -46px) scale(1.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lslide-rain, .lslide-rock, .lslide-lamp, .lslide-wiper, .lslide-wait,
          .lslide-tea, .lslide-puff-a, .lslide-puff-b, .lslide-puff-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
