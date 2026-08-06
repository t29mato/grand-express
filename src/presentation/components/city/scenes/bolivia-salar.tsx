/**
 * ウユニ塩湖に重ねる、鏡の水面。
 *
 * 雨季の塩原は数センチの水をかぶり、空をそのまま映す。
 * 空の雲がゆっくり流れ、その下では上下反転した雲が同じ速さで滑り、
 * 塩の六角模様の上を薄い水の光がなでていく。
 */
export function BoliviaSalar() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空を流れる薄雲 */}
      <g fill="#f6efe2">
        <g className="bolsalar-cloud-a" opacity="0.5">
          <ellipse cx="150" cy="46" rx="34" ry="6" />
          <ellipse cx="130" cy="50" rx="20" ry="4" />
          <ellipse cx="172" cy="50" rx="22" ry="4" />
        </g>
        <g className="bolsalar-cloud-b" opacity="0.36">
          <ellipse cx="300" cy="62" rx="26" ry="4.4" />
          <ellipse cx="284" cy="65" rx="16" ry="3" />
        </g>
      </g>

      {/* 水面に映る雲(上下反転・押しつぶし) */}
      <g fill="#9fc0e0">
        <g className="bolsalar-mirror-a" opacity="0.42">
          <ellipse cx="150" cy="104" rx="34" ry="3.4" />
          <ellipse cx="130" cy="101" rx="20" ry="2.2" />
          <ellipse cx="172" cy="101" rx="22" ry="2.2" />
        </g>
        <g className="bolsalar-mirror-b" opacity="0.3">
          <ellipse cx="300" cy="100" rx="26" ry="2.6" />
          <ellipse cx="284" cy="98" rx="16" ry="1.8" />
        </g>
        {/* 背景の雲(80,32 と 250,24)の映り込み */}
        <g className="bolsalar-still-a" opacity="0.4">
          <ellipse cx="80" cy="106" rx="24" ry="3" />
          <ellipse cx="67" cy="103" rx="15" ry="2.2" />
          <ellipse cx="95" cy="103" rx="18" ry="2.2" />
        </g>
        <g className="bolsalar-still-b" opacity="0.34">
          <ellipse cx="250" cy="102" rx="20" ry="2.4" />
          <ellipse cx="239" cy="100" rx="13" ry="1.8" />
          <ellipse cx="263" cy="100" rx="14" ry="1.8" />
        </g>
        {/* 太陽(320,28)の映り込み */}
        <ellipse className="bolsalar-sunpath" cx="320" cy="112" rx="13" ry="3" fill="#f5d68a" opacity="0.55" />
        <ellipse className="bolsalar-sunpath-b" cx="320" cy="126" rx="9" ry="2.2" fill="#f5d68a" opacity="0.4" />
      </g>

      {/* 塩の上をなでる水の光 */}
      <g fill="#bcd8ee">
        <ellipse className="bolsalar-sheen-a" cx="110" cy="132" rx="76" ry="4.4" opacity="0.34" />
        <ellipse className="bolsalar-sheen-b" cx="250" cy="158" rx="92" ry="5.4" opacity="0.28" />
        <ellipse className="bolsalar-sheen-c" cx="160" cy="186" rx="86" ry="6" opacity="0.24" />
        <ellipse className="bolsalar-sheen-d" cx="300" cy="204" rx="70" ry="5" opacity="0.2" />
      </g>

      {/* 波紋 */}
      <g fill="none" stroke="#8fb8dc" strokeWidth="1.2">
        <ellipse className="bolsalar-ripple-a" cx="86" cy="170" rx="14" ry="3.4" opacity="0.4" />
        <ellipse className="bolsalar-ripple-b" cx="228" cy="196" rx="18" ry="4" opacity="0.32" />
        <ellipse className="bolsalar-ripple-c" cx="348" cy="146" rx="12" ry="3" opacity="0.36" />
      </g>

      <style>{`
        .bolsalar-cloud-a, .bolsalar-cloud-b,
        .bolsalar-mirror-a, .bolsalar-mirror-b,
        .bolsalar-still-a, .bolsalar-still-b,
        .bolsalar-sheen-a, .bolsalar-sheen-b, .bolsalar-sheen-c, .bolsalar-sheen-d,
        .bolsalar-ripple-a, .bolsalar-ripple-b, .bolsalar-ripple-c,
        .bolsalar-sunpath, .bolsalar-sunpath-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .bolsalar-cloud-a, .bolsalar-mirror-a { animation: bolsalar-drift 64s linear infinite; }
        .bolsalar-cloud-b, .bolsalar-mirror-b { animation: bolsalar-drift 82s linear infinite; animation-delay: -34s; }
        .bolsalar-mirror-a { animation-name: bolsalar-drift-wobble; }
        .bolsalar-mirror-b { animation-name: bolsalar-drift-wobble; }
        .bolsalar-still-a { animation: bolsalar-quiver 9s ease-in-out infinite; }
        .bolsalar-still-b { animation: bolsalar-quiver 11.5s ease-in-out infinite; animation-delay: -4s; }
        .bolsalar-sunpath { animation: bolsalar-glint 6s ease-in-out infinite; }
        .bolsalar-sunpath-b { animation: bolsalar-glint 7.6s ease-in-out infinite; animation-delay: -2.4s; }
        .bolsalar-sheen-a { animation: bolsalar-sheen 17s linear infinite; }
        .bolsalar-sheen-b { animation: bolsalar-sheen 22s linear infinite; animation-delay: -8s; }
        .bolsalar-sheen-c { animation: bolsalar-sheen 26s linear infinite; animation-delay: -15s; }
        .bolsalar-sheen-d { animation: bolsalar-sheen 20s linear infinite; animation-delay: -4s; }
        .bolsalar-ripple-a { animation: bolsalar-ripple 8s ease-out infinite; }
        .bolsalar-ripple-b { animation: bolsalar-ripple 10.5s ease-out infinite; animation-delay: -4s; }
        .bolsalar-ripple-c { animation: bolsalar-ripple 9s ease-out infinite; animation-delay: -6.5s; }
        @keyframes bolsalar-drift {
          0% { transform: translateX(-230px); }
          100% { transform: translateX(280px); }
        }
        @keyframes bolsalar-drift-wobble {
          0% { transform: translateX(-230px) scaleY(1); }
          25% { transform: translateX(-102px) scaleY(1.22); }
          50% { transform: translateX(25px) scaleY(0.86); }
          75% { transform: translateX(152px) scaleY(1.16); }
          100% { transform: translateX(280px) scaleY(1); }
        }
        @keyframes bolsalar-quiver {
          0%, 100% { transform: scaleY(1) translateX(0); opacity: 0.38; }
          50% { transform: scaleY(1.5) translateX(4px); opacity: 0.24; }
        }
        @keyframes bolsalar-glint {
          0%, 100% { transform: scaleX(1); opacity: 0.5; }
          50% { transform: scaleX(1.45); opacity: 0.22; }
        }
        @keyframes bolsalar-sheen {
          0% { transform: translateX(-260px) scaleX(0.8); opacity: 0; }
          18% { opacity: 0.3; }
          80% { opacity: 0.22; }
          100% { transform: translateX(300px) scaleX(1.2); opacity: 0; }
        }
        @keyframes bolsalar-ripple {
          0% { transform: scale(0.2); opacity: 0.45; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bolsalar-cloud-a, .bolsalar-cloud-b,
          .bolsalar-mirror-a, .bolsalar-mirror-b,
          .bolsalar-still-a, .bolsalar-still-b,
          .bolsalar-sheen-a, .bolsalar-sheen-b, .bolsalar-sheen-c, .bolsalar-sheen-d,
          .bolsalar-ripple-a, .bolsalar-ripple-b, .bolsalar-ripple-c,
          .bolsalar-sunpath, .bolsalar-sunpath-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
