/**
 * 12月。二つの気温のクリスマス。
 *
 * 左は雪の市。木の小屋から湯気が立ち、雪が降る。
 * 右は砂浜。同じ樅の木が砂に立ち、隣で網の上に炭が熾っている。
 * 二本の木の電飾だけは、同じ拍子で点滅する。
 */
export function World08() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 左=北の冬 / 右=南の夏 */}
      <rect width="200" height="210" fill="#33405c" />
      <rect x="200" width="200" height="210" fill="#8fc4e8" />
      <circle cx="356" cy="34" r="20" fill="#f5b31c" />
      <circle cx="44" cy="34" r="15" fill="#e6eef4" />
      <g fill="#f6efe2" opacity="0.8">
        <circle cx="88" cy="24" r="1.6" />
        <circle cx="128" cy="46" r="1.2" />
        <circle cx="20" cy="62" r="1.4" />
        <circle cx="168" cy="30" r="1.6" />
      </g>

      {/* 雪の地面 */}
      <rect y="140" width="200" height="70" fill="#e6eef4" />
      <path d="M0,158 c40,-10 70,6 110,0 c34,-5 60,2 90,6 L200,210 L0,210z" fill="#d7e2ec" />

      {/* 木の市の小屋 */}
      <rect x="20" y="106" width="98" height="40" fill="#8a5a2c" />
      <path d="M12,106 L126,106 L104,84 L34,84z" fill="#6b4a2a" />
      <rect x="30" y="116" width="34" height="24" fill="#f5e2a8" />
      <rect x="74" y="116" width="34" height="24" fill="#c9702c" />
      <g fill="#e0dbcd">
        <rect x="18" y="102" width="102" height="6" />
      </g>
      {/* 店先の鍋と、そこから立つ湯気 */}
      <rect x="18" y="152" width="30" height="12" rx="3" fill="#4a4438" />
      <rect x="15" y="149" width="36" height="5" rx="2.5" fill="#6f6a5e" />
      <g className="w08-steam" fill="#dfe6ee" opacity="0.6">
        <ellipse cx="33" cy="140" rx="7" ry="5" />
        <ellipse cx="39" cy="128" rx="9" ry="6" />
        <ellipse cx="47" cy="114" rx="11" ry="7" />
      </g>

      {/* 雪の樅の木と電飾 */}
      <g>
        <rect x="156" y="132" width="7" height="16" fill="#5a4630" />
        <path d="M132,134 L159,90 L186,134z" fill="#2f5f3f" />
        <path d="M138,110 L159,74 L180,110z" fill="#376b46" />
        <g fill="#f8fbfd" opacity="0.85">
          <path d="M136,130 L159,96 L182,130 L159,124z" />
        </g>
        <g className="w08-light">
          <circle cx="148" cy="122" r="3.4" fill="#f5b31c" />
          <circle cx="170" cy="120" r="3.4" fill="#e8443f" />
          <circle cx="159" cy="102" r="3.4" fill="#5b8fe8" />
          <circle cx="152" cy="86" r="3" fill="#f5b31c" />
        </g>
        <path d="M159,68 l3.4,7 7.6,1 -5.5,5.4 1.3,7.6 -6.8,-3.6 -6.8,3.6 1.3,-7.6 -5.5,-5.4 7.6,-1z" fill="#f5b31c" />
      </g>

      {/* 降る雪 */}
      <g fill="#f8fbfd">
        <circle className="w08-snow" cx="30" cy="60" r="3" />
        <circle className="w08-snow w08-sn2" cx="78" cy="40" r="2.4" />
        <circle className="w08-snow w08-sn3" cx="118" cy="66" r="3.2" />
        <circle className="w08-snow w08-sn4" cx="160" cy="46" r="2.6" />
        <circle className="w08-snow w08-sn5" cx="54" cy="86" r="2.8" />
        <circle className="w08-snow w08-sn6" cx="188" cy="72" r="2.4" />
      </g>

      {/* 南の海と砂浜 */}
      <rect x="200" y="116" width="200" height="34" fill="#2f9fb8" />
      <rect x="200" y="140" width="200" height="12" fill="#5fc8d0" />
      <g stroke="#bfeef4" strokeWidth="3" strokeLinecap="round" fill="none">
        <path className="w08-surf" d="M214,128 q14,-6 28,0" />
        <path className="w08-surf w08-s2" d="M300,136 q14,-6 28,0" />
        <path className="w08-surf w08-s3" d="M356,124 q14,-6 28,0" />
      </g>
      <rect x="200" y="150" width="200" height="60" fill="#f0e0b8" />
      <path d="M200,150 q40,8 80,2 q46,-7 120,4 L400,210 L200,210z" fill="#e8d4a4" />

      {/* 砂に立てた樅の木と、同じ電飾 */}
      <g>
        <rect x="238" y="136" width="7" height="16" fill="#5a4630" />
        <path d="M214,138 L241,94 L268,138z" fill="#2f7d3f" />
        <path d="M220,114 L241,78 L262,114z" fill="#3f8f4f" />
        <g className="w08-light w08-lg2">
          <circle cx="230" cy="126" r="3.4" fill="#f5b31c" />
          <circle cx="252" cy="124" r="3.4" fill="#e8443f" />
          <circle cx="241" cy="106" r="3.4" fill="#5b8fe8" />
          <circle cx="234" cy="90" r="3" fill="#f5b31c" />
        </g>
        <path d="M241,72 l3.4,7 7.6,1 -5.5,5.4 1.3,7.6 -6.8,-3.6 -6.8,3.6 1.3,-7.6 -5.5,-5.4 7.6,-1z" fill="#f5b31c" />
      </g>

      {/* 浜のパラソルと焼き網 */}
      <g className="w08-brolly">
        <rect x="330" y="118" width="4" height="52" fill="#8a6a3c" />
        <path d="M302,120 q30,-30 60,0z" fill="#e8443f" />
        <path d="M302,120 q15,-15 30,0 q15,-15 30,0z" fill="#f6efe2" />
      </g>
      <g>
        <rect x="272" y="184" width="52" height="8" rx="2" fill="#4a4438" />
        <g stroke="#6f6a5e" strokeWidth="2">
          <path d="M280,192 L274,206 M316,192 L322,206" />
        </g>
        <g fill="#e8443f">
          <rect x="280" y="178" width="14" height="6" rx="3" />
          <rect x="302" y="178" width="14" height="6" rx="3" />
        </g>
        <g className="w08-coal" fill="#f5b31c" opacity="0.9">
          <ellipse cx="298" cy="188" rx="20" ry="3" />
        </g>
      </g>
      {/* 網から立つ煙 */}
      <g className="w08-smoke" fill="#b0aa9c" opacity="0.6">
        <ellipse cx="286" cy="170" rx="7" ry="5" />
        <ellipse cx="280" cy="158" rx="9" ry="6" />
        <ellipse cx="272" cy="144" rx="11" ry="7" />
      </g>

      {/* 半球の境目 */}
      <rect x="197" width="6" height="210" fill="#f6efe2" opacity="0.32" />
      <path d="M200,0 L200,210" stroke="#f6efe2" strokeWidth="2" strokeDasharray="10 9" opacity="0.7" />

      <style>{`
        .w08-light {
          transform-box: fill-box; transform-origin: center;
          animation: w08-twinkle 2.4s ease-in-out infinite;
        }
        .w08-lg2 { animation-delay: 0s; }
        .w08-snow {
          transform-box: fill-box; transform-origin: center;
          animation: w08-drop 7s linear infinite;
        }
        .w08-sn2 { animation-delay: -1.2s; animation-duration: 8s; }
        .w08-sn3 { animation-delay: -2.4s; animation-duration: 6.4s; }
        .w08-sn4 { animation-delay: -3.6s; animation-duration: 7.6s; }
        .w08-sn5 { animation-delay: -4.8s; animation-duration: 6.8s; }
        .w08-sn6 { animation-delay: -6s; animation-duration: 8.4s; }
        .w08-steam {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w08-rise 5s ease-out infinite;
        }
        .w08-smoke {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w08-rise 4.4s ease-out infinite;
        }
        .w08-surf {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w08-lap 3.8s ease-in-out infinite;
        }
        .w08-s2 { animation-delay: -1.3s; }
        .w08-s3 { animation-delay: -2.6s; }
        .w08-brolly {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w08-tilt 5s ease-in-out infinite;
        }
        .w08-coal {
          transform-box: fill-box; transform-origin: center;
          animation: w08-ember 2.2s ease-in-out infinite;
        }
        @keyframes w08-twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes w08-drop {
          0% { transform: translate(0, -40px); opacity: 0; }
          10%, 88% { opacity: 1; }
          100% { transform: translate(-22px, 150px); opacity: 0; }
        }
        @keyframes w08-rise {
          0% { transform: translate(0, 12px) scale(0.5); opacity: 0.7; }
          100% { transform: translate(-14px, -34px) scale(1.25); opacity: 0; }
        }
        @keyframes w08-lap {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(12px); }
        }
        @keyframes w08-tilt {
          0%, 100% { transform: rotate(-2.5deg); }
          50% { transform: rotate(2.5deg); }
        }
        @keyframes w08-ember {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .w08-light, .w08-snow, .w08-steam, .w08-smoke, .w08-surf,
          .w08-brolly, .w08-coal { animation: none; }
        }
      `}</style>
    </svg>
  );
}
