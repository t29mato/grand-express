/**
 * 大聖堂の街(ランス、シャルトル、ストラスブールなど)に重ねる動き。
 *
 * 薔薇窓のステンドグラスが順に光を通し、広場のハトが飛び立ち、
 * 街灯がともって、双塔の上を雲がゆっくりわたる。
 * 聖堂・広場・敷石は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function FranceCathedral() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 薔薇窓(200,90)のステンドグラスを順に灯す */}
      <g>
        <circle className="frcat-pane frcat-p1" cx="217" cy="90" r="5" fill="#ff6b60" opacity="0.5" />
        <circle className="frcat-pane frcat-p2" cx="208.5" cy="104.7" r="5" fill="#ffd06a" opacity="0.5" />
        <circle className="frcat-pane frcat-p3" cx="191.5" cy="104.7" r="5" fill="#8fb8ff" opacity="0.5" />
        <circle className="frcat-pane frcat-p4" cx="183" cy="90" r="5" fill="#ff6b60" opacity="0.5" />
        <circle className="frcat-pane frcat-p5" cx="191.5" cy="75.3" r="5" fill="#ffd06a" opacity="0.5" />
        <circle className="frcat-pane frcat-p6" cx="208.5" cy="75.3" r="5" fill="#8fb8ff" opacity="0.5" />
        <circle className="frcat-heart" cx="200" cy="90" r="6.5" fill="#ffd06a" opacity="0.4" />
      </g>

      {/* 尖塔窓(108,74 と 282,74)のほのかな灯り */}
      <g fill="#ffd98a">
        <path className="frcat-lancet-a" d="M108,116V74q0,-7 4,-10q4,3 4,10v42z" opacity="0.3" />
        <path className="frcat-lancet-b" d="M282,116V74q0,-7 4,-10q4,3 4,10v42z" opacity="0.3" />
      </g>

      {/* 街灯(356,114)の灯り */}
      <circle className="frcat-lamp" cx="358" cy="114" r="8" fill="#f5b31c" opacity="0.35" />

      {/* 流れる雲 */}
      <g fill="#f6efe2">
        <g className="frcat-cloud-a" opacity="0.3">
          <ellipse cx="180" cy="16" rx="17" ry="4.4" />
          <ellipse cx="169" cy="18" rx="10" ry="3" />
          <ellipse cx="191" cy="18" rx="11" ry="3" />
        </g>
        <g className="frcat-cloud-b" opacity="0.24">
          <ellipse cx="60" cy="48" rx="14" ry="3.6" />
          <ellipse cx="51" cy="50" rx="8.4" ry="2.5" />
        </g>
      </g>

      {/* 広場から飛び立つハト */}
      <g transform="translate(120,150)">
        <g className="frcat-dove-a">
          <path className="frcat-flap-a" d="M-7,0 Q-3.5,-4.6 0,-0.7 Q3.5,-4.6 7,0" fill="none" stroke="#e8e2d4" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </g>
      <g transform="translate(300,164)">
        <g className="frcat-dove-b">
          <path className="frcat-flap-b" d="M-6,0 Q-3,-4 0,-0.6 Q3,-4 6,0" fill="none" stroke="#e8e2d4" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </g>

      <style>{`
        .frcat-pane, .frcat-heart, .frcat-lancet-a, .frcat-lancet-b, .frcat-lamp,
        .frcat-cloud-a, .frcat-cloud-b, .frcat-flap-a, .frcat-flap-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .frcat-pane { animation: frcat-glass 9s ease-in-out infinite; }
        .frcat-p1 { animation-delay: 0s; }
        .frcat-p2 { animation-delay: -1.5s; }
        .frcat-p3 { animation-delay: -3s; }
        .frcat-p4 { animation-delay: -4.5s; }
        .frcat-p5 { animation-delay: -6s; }
        .frcat-p6 { animation-delay: -7.5s; }
        .frcat-heart { animation: frcat-heart 6s ease-in-out infinite; }
        .frcat-lancet-a { animation: frcat-lancet 8s ease-in-out infinite; }
        .frcat-lancet-b { animation: frcat-lancet 10s ease-in-out infinite; animation-delay: -4s; }
        .frcat-lamp { animation: frcat-lamp 5.5s ease-in-out infinite; }
        .frcat-cloud-a { animation: frcat-drift 92s linear infinite; }
        .frcat-cloud-b { animation: frcat-drift 74s linear infinite; animation-delay: -30s; }
        .frcat-dove-a { animation: frcat-liftoff-a 21s ease-in-out infinite; }
        .frcat-dove-b { animation: frcat-liftoff-b 27s ease-in-out infinite; animation-delay: -9s; }
        .frcat-flap-a { transform-origin: 50% 100%; animation: frcat-flap 1.3s ease-in-out infinite; }
        .frcat-flap-b { transform-origin: 50% 100%; animation: frcat-flap 1.6s ease-in-out infinite; }
        @keyframes frcat-glass {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 0.72; }
        }
        @keyframes frcat-heart {
          0%, 100% { opacity: 0.2; transform: scale(0.85); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }
        @keyframes frcat-lancet {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.4; }
        }
        @keyframes frcat-lamp {
          0%, 100% { opacity: 0.18; transform: scale(0.85); }
          50% { opacity: 0.5; transform: scale(1.15); }
        }
        @keyframes frcat-drift {
          0% { transform: translateX(-210px); }
          100% { transform: translateX(430px); }
        }
        @keyframes frcat-liftoff-a {
          0% { transform: translate(-70px, 40px); opacity: 0; }
          10% { opacity: 0.9; }
          85% { opacity: 0.9; }
          100% { transform: translate(180px, -110px); opacity: 0; }
        }
        @keyframes frcat-liftoff-b {
          0% { transform: translate(60px, 30px); opacity: 0; }
          12% { opacity: 0.85; }
          85% { opacity: 0.85; }
          100% { transform: translate(-190px, -120px); opacity: 0; }
        }
        @keyframes frcat-flap {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          .frcat-pane, .frcat-heart, .frcat-lancet-a, .frcat-lancet-b, .frcat-lamp,
          .frcat-cloud-a, .frcat-cloud-b, .frcat-dove-a, .frcat-dove-b,
          .frcat-flap-a, .frcat-flap-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
