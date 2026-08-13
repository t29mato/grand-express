/**
 * サイクロンが海岸を通る。壊れた建物や飛ばされる人は描かない。
 *
 * 動くのは渦を巻く雲、横殴りの雨、大きくしなるユーカリの幹だけ。
 * 傾いても折れない、という描き方にして怖がらせすぎない。
 */
export function AustraliaCoastalCyclone() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 荒れた空。 */}
      <rect width="400" height="210" fill="#2a3c48" />

      {/* 渦を巻く雲。中心を軸にゆっくり回す。 */}
      <g className="acy-swirl" style={{ transformOrigin: "300px 55px" }}>
        <ellipse cx="300" cy="55" rx="90" ry="40" fill="#3e5462" opacity="0.85" />
        <ellipse cx="270" cy="40" rx="50" ry="22" fill="#4c6674" opacity="0.8" />
        <ellipse cx="330" cy="70" rx="46" ry="20" fill="#4c6674" opacity="0.8" />
        <ellipse cx="300" cy="55" rx="18" ry="10" fill="#213038" />
      </g>
      <g fill="#334856" opacity="0.7">
        <ellipse cx="70" cy="34" rx="80" ry="22" />
        <ellipse cx="150" cy="60" rx="60" ry="18" />
      </g>

      {/* 海と防波堤。 */}
      <rect y="150" width="400" height="60" fill="#1e4a68" />
      <g stroke="#dbe6e0" strokeWidth="2" opacity="0.8" fill="none">
        <path d="M20,158q10,-10 20,0t20,0t20,0t20,0" />
        <path d="M240,166q10,-10 20,0t20,0t20,0t20,0" />
      </g>
      <rect y="140" width="400" height="12" fill="#8a8478" />

      {/* 横殴りの雨。 */}
      <g stroke="#9fc0d8" strokeWidth="2" strokeLinecap="round" opacity="0.75">
        <path className="acy-rain" d="M30,60 L14,100" style={{ animationDelay: "0s" }} />
        <path className="acy-rain" d="M90,50 L72,92" style={{ animationDelay: "0.15s" }} />
        <path className="acy-rain" d="M160,64 L142,104" style={{ animationDelay: "0.3s" }} />
        <path className="acy-rain" d="M340,58 L322,98" style={{ animationDelay: "0.1s" }} />
        <path className="acy-rain" d="M380,68 L362,108" style={{ animationDelay: "0.25s" }} />
      </g>

      {/* 大きくしなるユーカリ。根元は折れず、幹全体が傾く。 */}
      <g className="acy-tree" style={{ transformOrigin: "140px 140px" }}>
        <path d="M140,140 Q150,100 170,72" stroke="#5a4630" strokeWidth="9" fill="none" strokeLinecap="round" />
        <g fill="#4a6b3f">
          <ellipse cx="180" cy="66" rx="22" ry="12" />
          <ellipse cx="196" cy="78" rx="16" ry="9" />
          <ellipse cx="168" cy="52" rx="14" ry="8" />
        </g>
      </g>

      <style>{`
        .acy-swirl {
          transform-box: fill-box;
          animation: acy-spin 4s linear infinite;
        }
        @keyframes acy-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .acy-rain {
          animation: acy-fall 0.5s linear infinite;
        }
        @keyframes acy-fall {
          0%   { opacity: 0; transform: translate(0, -10px); }
          20%  { opacity: 0.9; }
          100% { opacity: 0; transform: translate(-16px, 40px); }
        }
        .acy-tree {
          transform-box: fill-box;
          animation: acy-sway 1.4s ease-in-out infinite alternate;
        }
        @keyframes acy-sway {
          0%   { transform: rotate(-4deg); }
          100% { transform: rotate(14deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .acy-swirl, .acy-rain, .acy-tree {
            animation: none;
          }
          .acy-tree { transform: rotate(10deg); }
        }
      `}</style>
    </svg>
  );
}
