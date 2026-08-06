/**
 * 古都(京都など)に重ねる動き。
 *
 * 町家の軒先で暖簾が風に揺れ、通りには紅葉がひらひらと降る。
 * 空には薄い雲がゆっくり流れる。
 * 空・山・町家は静止画が描いているので、ここでは何も塗りつぶさない。
 */

/** 背景の町家の戸口(x=38,118,…)の上に掛ける暖簾。 */
const JOC_DOORS = [38, 118, 198, 278, 358];

export function JapanOldcapital() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 流れる薄雲 */}
      <g transform="translate(180,48)">
        <g className="joc-cloud" fill="#ffffff" opacity="0.34">
          <ellipse cx="0" cy="0" rx="23" ry="7" />
          <ellipse cx="-13" cy="3" rx="14" ry="5" />
          <ellipse cx="14" cy="3" rx="16" ry="5" />
        </g>
      </g>

      {/* 軒先の暖簾 */}
      <g fill="#2f4f8f">
        {JOC_DOORS.map((x, i) => (
          <g key={x} transform={`translate(${x + 7},160)`}>
            <g className="joc-noren" style={{ animationDelay: `-${(i * 0.9).toFixed(1)}s` }}>
              <path d="M-10,0 h6.6 v10 h-6.6 Z" opacity="0.9" />
              <path d="M-2.6,0 h5.2 v10.6 h-5.2 Z" opacity="0.9" />
              <path d="M3.4,0 h6.6 v10 h-6.6 Z" opacity="0.9" />
              <rect x="-10.6" y="-1.6" width="21.2" height="2.4" fill="#3f3a34" opacity="0.85" />
            </g>
          </g>
        ))}
      </g>

      {/* 舞い落ちる落ち葉 */}
      <g>
        <g transform="translate(62,112)">
          <g className="joc-leaf joc-m1">
            <path d="M0,-5 C3.4,-2.6 3.6,2.2 0,4.6 C-3.6,2.2 -3.4,-2.6 0,-5 Z" fill="#d4593f" opacity="0.9" />
            <path d="M0,-3 L0,6.2" stroke="#a8402c" strokeWidth="0.9" strokeLinecap="round" opacity="0.85" />
          </g>
        </g>
        <g transform="translate(128,146)">
          <g className="joc-leaf joc-m2">
            <path d="M0,-4.2 C2.9,-2.2 3,1.8 0,3.9 C-3,1.8 -2.9,-2.2 0,-4.2 Z" fill="#e08a3c" opacity="0.85" />
            <path d="M0,-2.4 L0,5.2" stroke="#b06a24" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
          </g>
        </g>
        <g transform="translate(268,98)">
          <g className="joc-leaf joc-m3">
            <path d="M0,-5 C3.4,-2.6 3.6,2.2 0,4.6 C-3.6,2.2 -3.4,-2.6 0,-5 Z" fill="#c94a35" opacity="0.9" />
            <path d="M0,-3 L0,6.2" stroke="#9c3826" strokeWidth="0.9" strokeLinecap="round" opacity="0.85" />
          </g>
        </g>
        <g transform="translate(330,124)">
          <g className="joc-leaf joc-m4">
            <path d="M0,-4.2 C2.9,-2.2 3,1.8 0,3.9 C-3,1.8 -2.9,-2.2 0,-4.2 Z" fill="#d4593f" opacity="0.85" />
            <path d="M0,-2.4 L0,5.2" stroke="#a8402c" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
          </g>
        </g>
        <g transform="translate(376,150)">
          <g className="joc-leaf joc-m5">
            <path d="M0,-5 C3.4,-2.6 3.6,2.2 0,4.6 C-3.6,2.2 -3.4,-2.6 0,-5 Z" fill="#e08a3c" opacity="0.9" />
            <path d="M0,-3 L0,6.2" stroke="#b06a24" strokeWidth="0.9" strokeLinecap="round" opacity="0.85" />
          </g>
        </g>
        <g transform="translate(22,150)">
          <g className="joc-leaf joc-m6">
            <path d="M0,-4.2 C2.9,-2.2 3,1.8 0,3.9 C-3,1.8 -2.9,-2.2 0,-4.2 Z" fill="#c94a35" opacity="0.85" />
            <path d="M0,-2.4 L0,5.2" stroke="#9c3826" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
          </g>
        </g>
      </g>

      <style>{`
        .joc-cloud { animation: joc-drift 68s linear infinite; animation-delay: -34s; }
        .joc-noren {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: joc-sway 5.6s ease-in-out infinite;
        }
        .joc-leaf {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: joc-fall 15s linear infinite;
        }
        .joc-m2 { animation-duration: 19s; animation-delay: -7s; }
        .joc-m3 { animation-duration: 13s; animation-delay: -4s; }
        .joc-m4 { animation-duration: 17s; animation-delay: -11s; }
        .joc-m5 { animation-duration: 21s; animation-delay: -2s; }
        .joc-m6 { animation-duration: 16s; animation-delay: -13s; }
        @keyframes joc-drift {
          0% { transform: translateX(-230px); }
          100% { transform: translateX(250px); }
        }
        @keyframes joc-sway {
          0%, 100% { transform: rotate(-3.5deg) skewX(2deg); }
          50% { transform: rotate(3.5deg) skewX(-2deg); }
        }
        @keyframes joc-fall {
          0% { transform: translate(0, -66px) rotate(0deg); }
          50% { transform: translate(-16px, 0) rotate(200deg); }
          100% { transform: translate(-40px, 68px) rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .joc-cloud, .joc-noren, .joc-leaf { animation: none; }
        }
      `}</style>
    </svg>
  );
}
