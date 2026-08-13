/**
 * 夕立が手作りの屋根を水浸しにする。丘の上の家のトタン屋根が塞ぎ切れて
 * いない継ぎ目から雨を通し、内壁を伝って下に置いてあったものを濡らす。
 *
 * 動くのは、斜めに吹きつける雨脚と、天井から滴り落ち続ける一滴だけ。
 */
export function VenezuelaTechoInundado() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨雲の空。 */}
      <rect width="400" height="210" fill="#5f6a72" />
      <rect y="0" width="400" height="70" fill="#707c84" />
      <g fill="#828e94" opacity="0.85">
        <ellipse cx="90" cy="36" rx="60" ry="16" />
        <ellipse cx="300" cy="24" rx="70" ry="18" />
      </g>

      {/* 丘の斜面。 */}
      <path d="M0,150 Q100,130 200,148 T400,140 V210 H0 z" fill="#4a5a3a" />

      {/* トタン屋根の家。 */}
      <g strokeLinejoin="round">
        <rect x="120" y="120" width="160" height="70" fill="#c8a06a" stroke="#20364a" strokeWidth="2" />
        <path d="M112,120 h176 l-16,-24 h-144 z" fill="#9aa0a8" stroke="#20364a" strokeWidth="2" />
        {/* トタン板の継ぎ目 */}
        <g stroke="#7f8690" strokeWidth="1.4">
          <line x1="140" y1="97" x2="128" y2="120" />
          <line x1="170" y1="96" x2="160" y2="120" />
          <line x1="200" y1="96" x2="196" y2="120" />
          <line x1="230" y1="96" x2="232" y2="120" />
          <line x1="260" y1="97" x2="266" y2="120" />
        </g>
        <rect x="160" y="150" width="30" height="40" fill="#6b5330" />
        <rect x="220" y="145" width="26" height="20" fill="#cfe4f0" />
      </g>

      {/* 内壁を伝う水の染み。 */}
      <path d="M198,120 q4,20 -2,40 q-5,18 2,30" fill="none" stroke="#3f7fae" strokeWidth="3" opacity="0.7" />

      {/* バケツと水たまり。 */}
      <path d="M186,182 h20 l-2,14 h-16 z" fill="#8b8f98" />
      <ellipse cx="196" cy="198" rx="14" ry="4" fill="#3f7fae" opacity="0.7" />

      {/* 雨脚。**動く要素その1。** */}
      <g className="vti-rain" stroke="#dfe8ee" strokeWidth="2" strokeLinecap="round" opacity="0.75">
        <path d="M40,0 L14,50" />
        <path d="M100,-10 L74,40" />
        <path d="M320,-6 L294,44" />
        <path d="M360,4 L334,54" />
      </g>

      {/* 天井から落ち続ける一滴。**動く要素その2。** */}
      <ellipse className="vti-drip" cx="196" cy="150" rx="3" ry="5" fill="#bfe8f4" />

      <style>{`
        .vti-rain {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: vti-fall 0.6s linear infinite;
        }
        @keyframes vti-fall {
          0% { transform: translate(30px, -20px); }
          100% { transform: translate(-10px, 220px); }
        }
        .vti-drip {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: vti-drip 1.1s ease-in infinite;
        }
        @keyframes vti-drip {
          0% { transform: translateY(0); opacity: 1; }
          70% { transform: translateY(44px); opacity: 1; }
          78% { transform: translateY(48px) scaleY(0.4); opacity: 0.6; }
          80%, 100% { transform: translateY(0); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vti-rain { animation: none; opacity: 0.4; }
          .vti-drip { animation: none; opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
