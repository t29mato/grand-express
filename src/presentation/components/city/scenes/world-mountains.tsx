/**
 * 山岳の町(クスコ、ラサ、インターラーケンなど)に重ねる動き。
 *
 * 高架橋を汽車が渡っていき、稜線から雪煙が流れ、
 * 山湖の面が光を返して、雲がゆっくり山を越える。
 * 山・高架橋・松は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function WorldMountains() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 高架橋(桁の上端は y=120)を渡る汽車 */}
      <g className="wmnt-train">
        <rect x="0" y="110" width="22" height="10" rx="2" fill="#3f4a58" />
        <rect x="4" y="105" width="7" height="6" fill="#3f4a58" />
        <rect x="26" y="112" width="18" height="8" rx="1.5" fill="#8a4f42" />
        <rect x="48" y="112" width="18" height="8" rx="1.5" fill="#8a4f42" />
        <g fill="#f0e6d2" opacity="0.85">
          <rect x="29" y="114" width="4" height="4" />
          <rect x="37" y="114" width="4" height="4" />
          <rect x="51" y="114" width="4" height="4" />
          <rect x="59" y="114" width="4" height="4" />
        </g>
      </g>

      {/* 機関車の煙 */}
      <g fill="#e6ecef">
        <circle className="wmnt-puff wmnt-f1" cx="0" cy="0" r="3.4" opacity="0.45" />
        <circle className="wmnt-puff wmnt-f2" cx="0" cy="0" r="4.4" opacity="0.34" />
      </g>

      {/* 稜線から流れる雪煙(峰 58,58 / 142,42 / 306,80) */}
      <g fill="#f8fbfd">
        <ellipse className="wmnt-drift-a" cx="70" cy="56" rx="16" ry="2.6" opacity="0.45" />
        <ellipse className="wmnt-drift-b" cx="156" cy="40" rx="20" ry="3" opacity="0.5" />
        <ellipse className="wmnt-drift-c" cx="318" cy="78" rx="15" ry="2.4" opacity="0.42" />
      </g>

      {/* 山湖のきらめき(湖は y=180〜210) */}
      <g stroke="#dff0fa" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <path className="wmnt-glint wmnt-g1" d="M46,188h64" opacity="0.5" />
        <path className="wmnt-glint wmnt-g2" d="M206,198h72" opacity="0.45" />
        <path className="wmnt-glint wmnt-g3" d="M300,186h56" opacity="0.4" />
      </g>

      {/* 山を越える雲 */}
      <g fill="#f6efe2">
        <g className="wmnt-cloud" opacity="0.34">
          <ellipse cx="200" cy="26" rx="20" ry="5" />
          <ellipse cx="188" cy="28" rx="12" ry="3.4" />
          <ellipse cx="213" cy="28" rx="13" ry="3.4" />
        </g>
      </g>

      <style>{`
        .wmnt-train, .wmnt-puff, .wmnt-drift-a, .wmnt-drift-b, .wmnt-drift-c,
        .wmnt-glint, .wmnt-cloud {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .wmnt-train { animation: wmnt-run 22s linear infinite; }
        .wmnt-puff { animation: wmnt-puff 22s linear infinite; }
        .wmnt-f2 { animation-name: wmnt-puff-b; }
        .wmnt-drift-a { animation: wmnt-blow 14s ease-in-out infinite; }
        .wmnt-drift-b { animation: wmnt-blow 11s ease-in-out infinite; animation-delay: -5s; }
        .wmnt-drift-c { animation: wmnt-blow 17s ease-in-out infinite; animation-delay: -9s; }
        .wmnt-glint { animation: wmnt-slide 17s linear infinite; }
        .wmnt-g2 { animation-duration: 22s; animation-delay: -8s; }
        .wmnt-g3 { animation-duration: 13s; animation-delay: -5s; }
        .wmnt-cloud { animation: wmnt-drift 92s linear infinite; }
        @keyframes wmnt-run {
          0% { transform: translateX(74px); opacity: 0; }
          6% { opacity: 1; }
          92% { opacity: 1; }
          100% { transform: translateX(384px); opacity: 0; }
        }
        @keyframes wmnt-puff {
          0% { transform: translate(82px, 104px) scale(0.4); opacity: 0; }
          10% { opacity: 0.4; }
          100% { transform: translate(300px, 62px) scale(2); opacity: 0; }
        }
        @keyframes wmnt-puff-b {
          0% { transform: translate(160px, 104px) scale(0.4); opacity: 0; }
          10% { opacity: 0.32; }
          100% { transform: translate(360px, 58px) scale(2.2); opacity: 0; }
        }
        @keyframes wmnt-blow {
          0%, 100% { transform: translateX(0) scaleX(1); opacity: 0.16; }
          50% { transform: translateX(14px) scaleX(1.5); opacity: 0.48; }
        }
        @keyframes wmnt-slide {
          0% { transform: translateX(-26px); opacity: 0; }
          30%, 70% { opacity: 0.5; }
          100% { transform: translateX(26px); opacity: 0; }
        }
        @keyframes wmnt-drift {
          0% { transform: translateX(-230px); }
          100% { transform: translateX(420px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wmnt-train, .wmnt-puff, .wmnt-drift-a, .wmnt-drift-b, .wmnt-drift-c,
          .wmnt-glint, .wmnt-cloud { animation: none; }
        }
      `}</style>
    </svg>
  );
}
