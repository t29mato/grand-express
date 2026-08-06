/** 雪の季節に温泉宿が人手を欠き、その場で雇ってもらえる。 */
export function SnowCountryInn() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      <rect width="400" height="210" fill="#2a3350" />
      <rect y="126" width="400" height="84" fill="#e6edf7" />

      {/* 灯りのともる木造の宿 */}
      <g>
        <rect x="60" y="70" width="200" height="60" fill="#5a4530" />
        <path d="M48,70h224l-16,-20H64z" fill="#3f3020" />
        <path className="sn-roofsnow" d="M48,70h224l-10,-12H58z" fill="#f8fbff" />
        <g fill="#f5d06a">
          <rect className="sn-w1" x="76" y="86" width="26" height="24" rx="3" />
          <rect className="sn-w2" x="118" y="86" width="26" height="24" rx="3" />
          <rect className="sn-w3" x="160" y="86" width="26" height="24" rx="3" />
          <rect className="sn-w4" x="202" y="86" width="26" height="24" rx="3" />
        </g>
        {/* 暖簾 */}
        <rect x="132" y="112" width="44" height="18" fill="#e8443f" />
      </g>

      {/* 露天風呂の湯けむり */}
      <ellipse cx="318" cy="152" rx="52" ry="16" fill="#7fb8cf" />
      <g className="sn-steam" fill="#dfeef5" opacity="0.75">
        <circle className="sn-s1" cx="300" cy="146" r="11" />
        <circle className="sn-s2" cx="322" cy="146" r="9" />
        <circle className="sn-s3" cx="340" cy="146" r="12" />
      </g>

      {/* 迎える宿の人 */}
      <g className="sn-host" transform="translate(154,126)">
        <circle cy="-28" r="9" fill="#f6efe2" />
        <rect x="-8" y="-19" width="16" height="19" rx="5" fill="#37b3a4" />
        <rect className="sn-hand" x="8" y="-16" width="6" height="14" rx="3" fill="#f6efe2" />
      </g>

      {/* 降る雪 */}
      <g fill="#f8fbff">
        {[30, 90, 150, 210, 270, 330, 380].map((x, i) => (
          <circle key={x} className={`sn-f sn-f${i % 3}`} cx={x} cy="-6" r="3" />
        ))}
      </g>

      <style>{`
        .sn-w1, .sn-w2, .sn-w3, .sn-w4 { animation: sn-lamp 3s ease-in-out infinite; }
        .sn-w2 { animation-delay: -0.7s; }
        .sn-w3 { animation-delay: -1.4s; }
        .sn-w4 { animation-delay: -2.1s; }
        .sn-roofsnow { transform-box: fill-box; transform-origin: 50% 100%; animation: sn-settle 5s ease-in-out infinite; }
        .sn-hand { transform-box: fill-box; transform-origin: 50% 0; animation: sn-wave 0.6s ease-in-out infinite; }
        .sn-s1, .sn-s2, .sn-s3 { animation: sn-rise 3.2s ease-out infinite; }
        .sn-s2 { animation-delay: -1.1s; }
        .sn-s3 { animation-delay: -2.2s; }
        .sn-f { animation: sn-drop 5s linear infinite; }
        .sn-f1 { animation-delay: -1.7s; }
        .sn-f2 { animation-delay: -3.4s; }

        @keyframes sn-lamp { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes sn-settle { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.1); } }
        @keyframes sn-wave { 0%, 100% { transform: rotate(-26deg); } 50% { transform: rotate(20deg); } }
        @keyframes sn-rise {
          0% { transform: translateY(0) scale(0.6); opacity: 0.8; }
          100% { transform: translateY(-56px) scale(1.5); opacity: 0; }
        }
        @keyframes sn-drop {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate(-16px, 224px); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sn-w1, .sn-w2, .sn-w3, .sn-w4, .sn-roofsnow, .sn-hand,
          .sn-s1, .sn-s2, .sn-s3, .sn-f { animation: none; }
          .sn-f { transform: translate(-8px, 118px); }
        }
      `}</style>
    </svg>
  );
}
