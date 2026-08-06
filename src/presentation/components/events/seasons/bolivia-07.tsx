/**
 * ボリビア 11月 — 雨季の再来。
 *
 * 積み上がった雲がコルディジェラにぶつかって割れる。数日でベニの草原は
 * 浅い内海に変わる。半分沈んだ木と、水面から顔を出す草だけが残る。
 */
export function Bolivia07() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨雲の下の空 */}
      <rect width="400" height="210" fill="#3a5063" />
      <rect width="400" height="96" fill="#2a3b4d" />

      {/* 稲光 */}
      <rect className="beniflood-flash" width="400" height="210" fill="#cfe4f2" opacity="0" />

      {/* コルディジェラ */}
      <g fill="#33455a">
        <path d="M212,124 L262,44 L312,124z" />
        <path d="M286,124 L340,30 L394,124z" />
        <path d="M356,124 L400,58 L400,124z" />
        <path d="M170,124 L206,66 L242,124z" />
      </g>
      <g fill="#b9d2e2">
        <path d="M246,68 L262,44 L278,68 L268,62 L258,72 L252,64z" />
        <path d="M322,58 L340,30 L358,58 L346,50 L336,62 L330,52z" />
        <path d="M192,90 L206,66 L220,90 L212,84 L202,92z" />
      </g>

      {/* コルディジェラに積み上がる雲 */}
      <g fill="#1f2c3b">
        <g className="beniflood-cloud-a">
          <ellipse cx="70" cy="46" rx="46" ry="22" />
          <ellipse cx="112" cy="34" rx="34" ry="20" />
          <ellipse cx="34" cy="34" rx="28" ry="17" />
        </g>
        <g className="beniflood-cloud-b">
          <ellipse cx="228" cy="38" rx="54" ry="24" />
          <ellipse cx="276" cy="26" rx="36" ry="19" />
          <ellipse cx="186" cy="26" rx="30" ry="16" />
        </g>
        <g className="beniflood-cloud-c">
          <ellipse cx="352" cy="46" rx="44" ry="20" />
          <ellipse cx="392" cy="32" rx="30" ry="16" />
        </g>
      </g>
      <g fill="#2f4256">
        <ellipse cx="150" cy="62" rx="52" ry="16" />
        <ellipse cx="308" cy="66" rx="46" ry="14" />
        <ellipse cx="42" cy="72" rx="40" ry="13" />
      </g>

      {/* 稲妻 */}
      <path
        className="beniflood-bolt"
        d="M264,60 L250,96 L262,96 L246,132 L280,88 L266,88 L280,60z"
        fill="#f5e2a8"
      />

      {/* 水没した草原 */}
      <rect y="120" width="400" height="16" fill="#3f5a45" />
      <rect y="132" width="400" height="78" fill="#3d6d88" />
      <rect y="132" width="400" height="10" fill="#4e819b" />

      {/* 水面から出ている草 */}
      <g stroke="#4f7a52" strokeWidth="3" strokeLinecap="round" fill="none">
        <g className="beniflood-reed-a">
          <path d="M40,178 q-4,-16 -12,-26" />
          <path d="M46,178 q0,-20 2,-30" />
          <path d="M52,178 q6,-14 14,-22" />
        </g>
        <g className="beniflood-reed-b">
          <path d="M232,196 q-6,-18 -16,-30" />
          <path d="M240,196 q0,-22 2,-34" />
          <path d="M248,196 q8,-16 18,-26" />
        </g>
        <g className="beniflood-reed-c">
          <path d="M338,166 q-4,-12 -10,-20" />
          <path d="M344,166 q0,-16 1,-24" />
          <path d="M350,166 q6,-11 12,-17" />
        </g>
      </g>

      {/* 半分沈んだ木 */}
      <g>
        <rect x="112" y="96" width="10" height="62" fill="#3a2b20" />
        <path d="M117,118 L96,102 M117,112 L140,96" stroke="#3a2b20" strokeWidth="6" fill="none" />
        <g className="beniflood-canopy">
          <ellipse cx="117" cy="92" rx="38" ry="22" fill="#2f5138" />
          <ellipse cx="94" cy="98" rx="22" ry="14" fill="#2f5138" />
          <ellipse cx="142" cy="98" rx="22" ry="14" fill="#2f5138" />
        </g>
        <ellipse cx="117" cy="158" rx="26" ry="6" fill="#33607a" />
      </g>

      {/* 水面に広がる波紋 */}
      <g fill="none" stroke="#7cb0c8" strokeWidth="2.5">
        <ellipse className="beniflood-ring-a" cx="196" cy="152" rx="16" ry="5" />
        <ellipse className="beniflood-ring-b" cx="310" cy="182" rx="16" ry="5" />
        <ellipse className="beniflood-ring-c" cx="72" cy="196" rx="16" ry="5" />
        <ellipse className="beniflood-ring-d" cx="380" cy="146" rx="16" ry="5" />
      </g>
      <g fill="#5b93ad">
        <rect className="beniflood-swell-a" x="14" y="146" width="84" height="4" rx="2" />
        <rect className="beniflood-swell-b" x="180" y="170" width="110" height="4" rx="2" />
        <rect className="beniflood-swell-c" x="270" y="200" width="96" height="4" rx="2" />
      </g>

      {/* 降りしきる雨 */}
      <g stroke="#b9d2e2" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55">
        <path className="beniflood-rain-a" d="M22,10 l-7,26" />
        <path className="beniflood-rain-b" d="M62,60 l-7,26" />
        <path className="beniflood-rain-c" d="M104,4 l-7,26" />
        <path className="beniflood-rain-d" d="M146,84 l-7,26" />
        <path className="beniflood-rain-e" d="M188,26 l-7,26" />
        <path className="beniflood-rain-f" d="M226,116 l-7,26" />
        <path className="beniflood-rain-g" d="M268,44 l-7,26" />
        <path className="beniflood-rain-h" d="M306,140 l-7,26" />
        <path className="beniflood-rain-i" d="M348,16 l-7,26" />
        <path className="beniflood-rain-j" d="M386,92 l-7,26" />
        <path className="beniflood-rain-k" d="M44,150 l-7,26" />
        <path className="beniflood-rain-l" d="M168,178 l-7,26" />
        <path className="beniflood-rain-m" d="M330,70 l-7,26" />
        <path className="beniflood-rain-n" d="M84,110 l-7,26" />
      </g>

      <style>{`
        .beniflood-cloud-a { animation: beniflood-pile 9s ease-in-out infinite; }
        .beniflood-cloud-b { animation: beniflood-pile 11s ease-in-out infinite; animation-delay: -4s; }
        .beniflood-cloud-c { animation: beniflood-pile 8s ease-in-out infinite; animation-delay: -6s; }
        .beniflood-flash { animation: beniflood-strike 5.4s steps(1, end) infinite; }
        .beniflood-bolt { animation: beniflood-bolt 5.4s steps(1, end) infinite; }
        .beniflood-canopy {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: beniflood-lash 2.6s ease-in-out infinite;
        }
        .beniflood-reed-a {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: beniflood-lash 2.2s ease-in-out infinite;
        }
        .beniflood-reed-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: beniflood-lash 2.8s ease-in-out infinite;
          animation-delay: -0.9s;
        }
        .beniflood-reed-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: beniflood-lash 2.4s ease-in-out infinite;
          animation-delay: -1.5s;
        }
        .beniflood-ring-a, .beniflood-ring-b, .beniflood-ring-c, .beniflood-ring-d {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: beniflood-spread 1.5s ease-out infinite;
        }
        .beniflood-ring-b { animation-delay: -0.4s; }
        .beniflood-ring-c { animation-delay: -0.8s; }
        .beniflood-ring-d { animation-delay: -1.1s; }
        .beniflood-swell-a { animation: beniflood-drift 6s linear infinite; }
        .beniflood-swell-b { animation: beniflood-drift 7.6s linear infinite; animation-delay: -2.6s; }
        .beniflood-swell-c { animation: beniflood-drift 6.8s linear infinite; animation-delay: -4.4s; }
        .beniflood-rain-a { animation: beniflood-fall 0.66s linear infinite; }
        .beniflood-rain-b { animation: beniflood-fall 0.78s linear infinite; animation-delay: -0.3s; }
        .beniflood-rain-c { animation: beniflood-fall 0.6s linear infinite; animation-delay: -0.5s; }
        .beniflood-rain-d { animation: beniflood-fall 0.84s linear infinite; animation-delay: -0.12s; }
        .beniflood-rain-e { animation: beniflood-fall 0.7s linear infinite; animation-delay: -0.62s; }
        .beniflood-rain-f { animation: beniflood-fall 0.64s linear infinite; animation-delay: -0.24s; }
        .beniflood-rain-g { animation: beniflood-fall 0.8s linear infinite; animation-delay: -0.46s; }
        .beniflood-rain-h { animation: beniflood-fall 0.58s linear infinite; animation-delay: -0.16s; }
        .beniflood-rain-i { animation: beniflood-fall 0.74s linear infinite; animation-delay: -0.54s; }
        .beniflood-rain-j { animation: beniflood-fall 0.68s linear infinite; animation-delay: -0.36s; }
        .beniflood-rain-k { animation: beniflood-fall 0.62s linear infinite; animation-delay: -0.7s; }
        .beniflood-rain-l { animation: beniflood-fall 0.76s linear infinite; animation-delay: -0.2s; }
        .beniflood-rain-m { animation: beniflood-fall 0.56s linear infinite; animation-delay: -0.42s; }
        .beniflood-rain-n { animation: beniflood-fall 0.72s linear infinite; animation-delay: -0.58s; }
        @keyframes beniflood-pile {
          0%, 100% { transform: translate(-14px, 0) scale(1); }
          50% { transform: translate(14px, -4px) scale(1.06); }
        }
        @keyframes beniflood-strike {
          0%, 92% { opacity: 0; }
          93% { opacity: 0.5; }
          94% { opacity: 0; }
          95% { opacity: 0.34; }
          97%, 100% { opacity: 0; }
        }
        @keyframes beniflood-bolt {
          0%, 92% { opacity: 0; }
          93% { opacity: 1; }
          94% { opacity: 0; }
          95% { opacity: 0.9; }
          97%, 100% { opacity: 0; }
        }
        @keyframes beniflood-lash {
          0%, 100% { transform: skewX(6deg) rotate(2deg); }
          50% { transform: skewX(-8deg) rotate(-3deg); }
        }
        @keyframes beniflood-spread {
          0% { transform: scale(0.25); opacity: 0.85; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes beniflood-drift {
          0% { transform: translateX(70px); opacity: 0; }
          20%, 70% { opacity: 0.75; }
          100% { transform: translateX(-96px); opacity: 0; }
        }
        @keyframes beniflood-fall {
          0% { transform: translate(24px, -80px); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translate(-20px, 88px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .beniflood-cloud-a, .beniflood-cloud-b, .beniflood-cloud-c,
          .beniflood-flash, .beniflood-bolt, .beniflood-canopy,
          .beniflood-reed-a, .beniflood-reed-b, .beniflood-reed-c,
          .beniflood-ring-a, .beniflood-ring-b, .beniflood-ring-c, .beniflood-ring-d,
          .beniflood-swell-a, .beniflood-swell-b, .beniflood-swell-c,
          .beniflood-rain-a, .beniflood-rain-b, .beniflood-rain-c, .beniflood-rain-d,
          .beniflood-rain-e, .beniflood-rain-f, .beniflood-rain-g, .beniflood-rain-h,
          .beniflood-rain-i, .beniflood-rain-j, .beniflood-rain-k, .beniflood-rain-l,
          .beniflood-rain-m, .beniflood-rain-n { animation: none; }
        }
      `}</style>
    </svg>
  );
}
