/**
 * ハリケーンが海岸を通る。空を暗くし、椰子の木を風にしならせ、
 * 屋根板が一枚だけ剥がれて飛んでいく様子で「被害」ではなく「大慌て」を示す。
 * 瓦礫や壊れた家そのものは描かない。
 *
 * 動くのは、しなる椰子の木と、飛んでいく屋根板・雨粒だけ。
 */
export function NorthamericaHurricane() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 暗い嵐の空。 */}
      <rect width="400" height="210" fill="#3a4a5a" />
      <rect y="0" width="400" height="80" fill="#20364a" />
      <g fill="#4a5a68" opacity="0.85">
        <ellipse cx="80" cy="40" rx="60" ry="16" />
        <ellipse cx="260" cy="30" rx="70" ry="18" />
        <ellipse cx="360" cy="55" rx="50" ry="14" />
      </g>

      {/* 砂浜。家はここに立つ(海に浸からせない)。 */}
      <rect y="150" width="400" height="30" fill="#c9a877" />

      {/* 海。砂浜の手前に離して置く。白波を立てる。 */}
      <rect y="180" width="400" height="30" fill="#1e4a5f" />
      <g stroke="#bfe0ea" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M0,192q20,-6 40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0" />
      </g>

      {/* 海辺の家。砂浜の上に立ち、屋根板が一枚めくれている。 */}
      <g strokeLinejoin="round">
        <rect x="30" y="110" width="70" height="40" fill="#e8dcc0" stroke="#20364a" strokeWidth="2.5" />
        <path d="M24,110 L65,82 L106,110z" fill="#8a5a3a" stroke="#20364a" strokeWidth="2.5" />
        <rect x="52" y="128" width="18" height="22" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 椰子の木。幹は固定、葉の房だけがしなる。 */}
      <g transform="translate(220,180)">
        <rect x="-4" y="-70" width="8" height="70" fill="#8a6a3f" />
        <g className="hur-palm">
          <path d="M0,-70 q-40,-10 -55,10" stroke="#2f7a44" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M0,-70 q-25,-30 -10,-48" stroke="#2f7a44" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M0,-70 q20,-32 8,-50" stroke="#2f7a44" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M0,-70 q42,-6 58,12" stroke="#2f7a44" strokeWidth="9" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* めくれる屋根板。**静止したときも屋根の端に浮いた板として見える**
          位置を既定にし、そこから風で飛んでいく。 */}
      <g className="hur-shingle">
        <rect x="86" y="94" width="20" height="10" rx="2" fill="#6b4428" stroke="#20364a" strokeWidth="1.5" />
      </g>

      {/* 斜めに降る雨。 */}
      <g className="hur-rain" stroke="#bfe0ea" strokeWidth="2" opacity="0.6">
        <path d="M40,20 l-14,26" />
        <path d="M140,10 l-14,26" />
        <path d="M320,20 l-14,26" />
        <path d="M380,60 l-14,26" />
      </g>

      <style>{`
        .hur-palm {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: hur-sway 1.4s ease-in-out infinite;
        }
        @keyframes hur-sway {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(10deg); }
        }
        .hur-shingle {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: hur-fly 2.2s linear infinite;
        }
        @keyframes hur-fly {
          0%, 10% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(220px, -80px) rotate(340deg); opacity: 0; }
        }
        .hur-rain {
          animation: hur-fall 0.5s linear infinite;
        }
        @keyframes hur-fall {
          0% { transform: translate(0, -10px); opacity: 0; }
          40% { opacity: 0.7; }
          100% { transform: translate(-6px, 20px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hur-palm, .hur-shingle, .hur-rain { animation: none; }
        }
      `}</style>
    </svg>
  );
}
