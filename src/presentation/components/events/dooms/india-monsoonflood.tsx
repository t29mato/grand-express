/**
 * モンスーンの氾濫。一週間ぶんの雨がひと晩で降る。
 *
 * 濁った水がじりじり嵩を増して枕木とレールを呑んでいき、
 * 水が引かないうちに修理費の請求書だけが空から降ってくる。
 *
 * 位置決めは外側の <g transform> に、動きは内側のクラスに分ける。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function IndiaMonsoonflood() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨雲の空 */}
      <rect width="400" height="210" fill="#16283a" />
      <g fill="#1d3348">
        <rect width="400" height="34" />
        <ellipse cx="48" cy="36" rx="62" ry="20" />
        <ellipse cx="178" cy="32" rx="78" ry="22" />
        <ellipse cx="334" cy="38" rx="66" ry="20" />
      </g>

      {/* 水に浸かりはじめた田畑と椰子 */}
      <rect y="96" width="400" height="18" fill="#24392e" />
      <g fill="#1b2f26">
        <rect x="34" y="70" width="4" height="28" />
        <path d="M36,70 q-22,-3 -28,11 q17,-7 28,1z" />
        <path d="M36,70 q22,-3 28,11 q-17,-7 -28,1z" />
        <path d="M36,70 q-4,-16 6,-22 q-1,14 -3,22z" />
        <rect x="102" y="76" width="4" height="22" />
        <path d="M104,76 q-18,-3 -23,9 q14,-6 23,1z" />
        <path d="M104,76 q18,-3 23,9 q-14,-6 -23,1z" />
        <rect x="286" y="72" width="4" height="26" />
        <path d="M288,72 q-20,-3 -25,10 q15,-6 25,1z" />
        <path d="M288,72 q20,-3 25,10 q-15,-6 -25,1z" />
      </g>

      {/* 電信柱 */}
      <g fill="#2a3f52">
        <rect x="150" y="58" width="5" height="56" />
        <rect x="140" y="62" width="25" height="4" />
        <rect x="212" y="66" width="4" height="48" />
        <rect x="204" y="70" width="21" height="4" />
      </g>

      {/* 築堤と線路 */}
      <rect y="108" width="400" height="102" fill="#59605c" />
      <rect y="108" width="400" height="6" fill="#69706b" />
      <g fill="#3c433f">
        <path d="M10,114 L30,114 L22,170 L0,170z" />
        <path d="M52,114 L72,114 L64,170 L42,170z" />
        <path d="M94,114 L114,114 L106,170 L84,170z" />
        <path d="M136,114 L156,114 L148,170 L126,170z" />
        <path d="M178,114 L198,114 L190,170 L168,170z" />
        <path d="M220,114 L240,114 L232,170 L210,170z" />
        <path d="M262,114 L282,114 L274,170 L252,170z" />
        <path d="M304,114 L324,114 L316,170 L294,170z" />
        <path d="M346,114 L366,114 L358,170 L336,170z" />
        <path d="M388,114 L408,114 L400,170 L378,170z" />
      </g>
      <rect y="118" width="400" height="10" fill="#c3bbaa" />
      <rect y="126" width="400" height="4" fill="#8a8272" />
      <rect y="158" width="400" height="11" fill="#c3bbaa" />
      <rect y="166" width="400" height="5" fill="#8a8272" />

      {/* 信号機(足元は水に浸かる) */}
      <g>
        <rect x="342" y="40" width="8" height="140" fill="#55606b" />
        <rect x="330" y="54" width="30" height="6" fill="#55606b" />
        <circle className="imf-lamp" cx="346" cy="34" r="9" fill="#e05252" />
      </g>

      {/* 嵩を増す濁流。水越しにレールが透けて見える */}
      <g className="imf-water">
        <path
          d="M0,128 q25,-6 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 L400,276 L0,276z"
          fill="#6b4a26"
          opacity="0.68"
        />
        <path
          d="M0,128 q25,-6 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 l0,7 q-25,6 -50,0 t-50,0 t-50,0 t-50,0 t-50,0 t-50,0 t-50,0 t-50,0z"
          fill="#a3743f"
        />
        <g fill="#8f6535">
          <rect className="imf-ripple-a" x="30" y="146" width="96" height="5" rx="2" />
          <rect className="imf-ripple-b" x="164" y="164" width="118" height="5" rx="2" />
          <rect className="imf-ripple-c" x="256" y="186" width="104" height="5" rx="2" />
          <rect className="imf-ripple-d" x="70" y="204" width="86" height="5" rx="2" />
          <rect className="imf-ripple-e" x="180" y="222" width="120" height="5" rx="2" />
        </g>
        <g fill="none" stroke="#b08a55" strokeWidth="2.5">
          <ellipse className="imf-ring-a" cx="196" cy="156" rx="18" ry="6" />
          <ellipse className="imf-ring-b" cx="98" cy="184" rx="18" ry="6" />
        </g>
        {/* 流されていく枕木と流木 */}
        <g transform="translate(200,152)">
          <g className="imf-debris-a">
            <rect x="-24" y="-5" width="48" height="10" rx="2" fill="#3c433f" />
            <rect x="-24" y="-5" width="48" height="3" fill="#4d5450" />
          </g>
        </g>
        <g transform="translate(200,196)">
          <g className="imf-debris-b">
            <path d="M-26,0 l18,-6 l14,4 l16,-5 l2,7 l-20,5 l-14,-3 l-16,4z" fill="#3d3326" />
          </g>
        </g>
      </g>

      {/* 降ってくる修理費の請求書 */}
      <g transform="translate(112,146)">
        <g className="imf-bill-a">
          <rect x="-16" y="-12" width="32" height="24" rx="2" fill="#efe7d6" />
          <g fill="#9aa0a8">
            <rect x="-11" y="-7" width="15" height="2.5" />
            <rect x="-11" y="-2" width="21" height="2.5" />
            <rect x="-11" y="3" width="12" height="2.5" />
          </g>
          <circle cx="10" cy="6" r="4" fill="#e05252" />
        </g>
      </g>
      <g transform="translate(240,140)">
        <g className="imf-bill-b">
          <rect x="-14" y="-10" width="28" height="21" rx="2" fill="#e6dcc9" />
          <g fill="#9aa0a8">
            <rect x="-9" y="-5" width="13" height="2.5" />
            <rect x="-9" y="0" width="18" height="2.5" />
          </g>
          <circle cx="8" cy="6" r="3.5" fill="#e05252" />
        </g>
      </g>

      {/* 降り続く雨 */}
      <g stroke="#a8cfe4" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5">
        <path className="imf-rain-a" d="M26,18 l-5,22" />
        <path className="imf-rain-b" d="M70,60 l-5,22" />
        <path className="imf-rain-c" d="M118,12 l-5,22" />
        <path className="imf-rain-d" d="M162,78 l-5,22" />
        <path className="imf-rain-e" d="M206,28 l-5,22" />
        <path className="imf-rain-f" d="M252,104 l-5,22" />
        <path className="imf-rain-g" d="M294,50 l-5,22" />
        <path className="imf-rain-h" d="M336,16 l-5,22" />
        <path className="imf-rain-i" d="M374,90 l-5,22" />
        <path className="imf-rain-j" d="M48,124 l-5,22" />
        <path className="imf-rain-k" d="M182,132 l-5,22" />
      </g>

      <style>{`
        .imf-water {
          transform-box: fill-box;
          transform-origin: center;
          transform: translate(0, 18px);
          animation: imf-rise 7s ease-in-out infinite;
        }
        .imf-ripple-a { transform-box: fill-box; transform-origin: center; animation: imf-drift 5.2s linear infinite; }
        .imf-ripple-b { transform-box: fill-box; transform-origin: center; animation: imf-drift 6.6s linear infinite; animation-delay: -2.1s; }
        .imf-ripple-c { transform-box: fill-box; transform-origin: center; animation: imf-drift 5.8s linear infinite; animation-delay: -3.5s; }
        .imf-ripple-d { transform-box: fill-box; transform-origin: center; animation: imf-drift 7.2s linear infinite; animation-delay: -1.3s; }
        .imf-ripple-e { transform-box: fill-box; transform-origin: center; animation: imf-drift 6.2s linear infinite; animation-delay: -4.4s; }
        .imf-ring-a {
          transform-box: fill-box;
          transform-origin: center;
          animation: imf-bow 1.8s ease-out infinite;
        }
        .imf-ring-b {
          transform-box: fill-box;
          transform-origin: center;
          animation: imf-bow 1.8s ease-out infinite;
          animation-delay: -0.9s;
        }
        .imf-debris-a {
          transform-box: fill-box;
          transform-origin: center;
          animation: imf-float 7s linear infinite;
        }
        .imf-debris-b {
          transform-box: fill-box;
          transform-origin: center;
          animation: imf-float 9s linear infinite;
          animation-delay: -3.6s;
        }
        .imf-lamp { animation: imf-blink 1.4s steps(1, end) infinite; }
        .imf-bill-a {
          transform-box: fill-box;
          transform-origin: center;
          animation: imf-flutter 5.2s ease-in-out infinite;
        }
        .imf-bill-b {
          transform-box: fill-box;
          transform-origin: center;
          animation: imf-flutter 5.2s ease-in-out infinite;
          animation-delay: -2.6s;
        }
        .imf-rain-a { animation: imf-fall 0.72s linear infinite; }
        .imf-rain-b { animation: imf-fall 0.86s linear infinite; animation-delay: -0.3s; }
        .imf-rain-c { animation: imf-fall 0.64s linear infinite; animation-delay: -0.5s; }
        .imf-rain-d { animation: imf-fall 0.92s linear infinite; animation-delay: -0.1s; }
        .imf-rain-e { animation: imf-fall 0.76s linear infinite; animation-delay: -0.6s; }
        .imf-rain-f { animation: imf-fall 0.68s linear infinite; animation-delay: -0.25s; }
        .imf-rain-g { animation: imf-fall 0.88s linear infinite; animation-delay: -0.45s; }
        .imf-rain-h { animation: imf-fall 0.6s linear infinite; animation-delay: -0.15s; }
        .imf-rain-i { animation: imf-fall 0.8s linear infinite; animation-delay: -0.55s; }
        .imf-rain-j { animation: imf-fall 0.7s linear infinite; animation-delay: -0.35s; }
        .imf-rain-k { animation: imf-fall 0.84s linear infinite; animation-delay: -0.65s; }
        @keyframes imf-rise {
          0%, 100% { transform: translate(0, 34px); }
          55% { transform: translate(0, 0); }
        }
        @keyframes imf-drift {
          0% { transform: translate(80px, 0); opacity: 0; }
          20%, 72% { opacity: 1; }
          100% { transform: translate(-104px, 0); opacity: 0; }
        }
        @keyframes imf-bow {
          0% { transform: scale(0.3); opacity: 0.85; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes imf-float {
          0% { transform: translate(210px, -4px) rotate(6deg); opacity: 0; }
          12%, 84% { opacity: 1; }
          100% { transform: translate(-215px, 8px) rotate(-16deg); opacity: 0; }
        }
        @keyframes imf-blink {
          0%, 55% { opacity: 1; }
          56%, 100% { opacity: 0.25; }
        }
        @keyframes imf-flutter {
          0% { transform: translate(56px, -178px) rotate(-24deg); opacity: 0; }
          10% { opacity: 1; }
          44% { transform: translate(-10px, -74px) rotate(20deg); }
          64% { transform: translate(0, 0) rotate(-5deg); }
          80% { transform: translate(-4px, 3px) rotate(4deg); }
          92% { transform: translate(0, 0) rotate(-2deg); opacity: 1; }
          100% { transform: translate(3px, 2px) rotate(0deg); opacity: 0; }
        }
        @keyframes imf-fall {
          0% { transform: translate(18px, -78px); opacity: 0; }
          16%, 84% { opacity: 0.55; }
          100% { transform: translate(-16px, 86px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .imf-water, .imf-ripple-a, .imf-ripple-b, .imf-ripple-c, .imf-ripple-d, .imf-ripple-e,
          .imf-ring-a, .imf-ring-b, .imf-debris-a, .imf-debris-b, .imf-lamp,
          .imf-bill-a, .imf-bill-b,
          .imf-rain-a, .imf-rain-b, .imf-rain-c, .imf-rain-d, .imf-rain-e, .imf-rain-f,
          .imf-rain-g, .imf-rain-h, .imf-rain-i, .imf-rain-j, .imf-rain-k { animation: none; }
        }
      `}</style>
    </svg>
  );
}
