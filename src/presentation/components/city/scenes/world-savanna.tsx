/**
 * サバンナ(ナイロビ、ザンジバル、ハラレなど)に重ねる動き。
 *
 * 草原に陽炎が立ちのぼり、乾いた土ぼこりが風に流れ、
 * 象が耳をあおいで、白鷺が群れの上をわたっていく。
 * 草原・アカシア・動物は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function WorldSavanna() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 太陽(84,40)の陽の脈 */}
      <circle className="wsav-sun" cx="84" cy="40" r="28" fill="#ffcf80" opacity="0.16" />

      {/* 地平の陽炎 */}
      <g fill="#f2dcae">
        <ellipse className="wsav-heat-a" cx="200" cy="126" rx="150" ry="4" opacity="0.3" />
        <ellipse className="wsav-heat-b" cx="130" cy="152" rx="120" ry="3.4" opacity="0.22" />
      </g>

      {/* 風に流れる土ぼこり */}
      <g fill="#d8bc72">
        <ellipse className="wsav-dust wsav-u1" cx="140" cy="176" rx="40" ry="4" opacity="0.4" />
        <ellipse className="wsav-dust wsav-u2" cx="300" cy="192" rx="52" ry="4.4" opacity="0.34" />
        <ellipse className="wsav-dust wsav-u3" cx="80" cy="202" rx="46" ry="4" opacity="0.3" />
      </g>

      {/* 象(176,196)の耳をあおぐ。静止画の耳 ellipse(19,-28) を同じ位置に重ねる */}
      <g transform="translate(176,196) scale(0.92)">
        <ellipse className="wsav-ear" cx="19" cy="-28" rx="8.5" ry="9.5" fill="#5c5546" />
      </g>

      {/* なびく枯れ草(静止画の草 20,200 ほかに重ねる) */}
      <g stroke="#a8913c" strokeWidth="2" strokeLinecap="round" fill="none">
        <path className="wsav-blade wsav-g1" d="M20,200v-10" opacity="0.7" />
        <path className="wsav-blade wsav-g2" d="M32,204v-12" opacity="0.7" />
        <path className="wsav-blade wsav-g3" d="M44,198v-9" opacity="0.65" />
        <path className="wsav-blade wsav-g4" d="M356,202v-11" opacity="0.7" />
        <path className="wsav-blade wsav-g5" d="M368,206v-13" opacity="0.7" />
        <path className="wsav-blade wsav-g6" d="M380,200v-10" opacity="0.65" />
      </g>

      {/* 群れの上をわたる白鷺 */}
      <g transform="translate(220,66)">
        <g className="wsav-egret-a">
          <path className="wsav-flap-a" d="M-8,0 Q-4,-5.4 0,-0.8 Q4,-5.4 8,0" fill="none" stroke="#f6efe2" strokeWidth="1.9" strokeLinecap="round" />
        </g>
      </g>
      <g transform="translate(280,84)">
        <g className="wsav-egret-b">
          <path className="wsav-flap-b" d="M-6,0 Q-3,-4.2 0,-0.6 Q3,-4.2 6,0" fill="none" stroke="#f6efe2" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </g>

      <style>{`
        .wsav-sun, .wsav-heat-a, .wsav-heat-b, .wsav-dust,
        .wsav-ear, .wsav-blade, .wsav-flap-a, .wsav-flap-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .wsav-sun { animation: wsav-pulse 11s ease-in-out infinite; }
        .wsav-heat-a { animation: wsav-heat 7s ease-in-out infinite; }
        .wsav-heat-b { animation: wsav-heat 9s ease-in-out infinite; animation-delay: -4s; }
        .wsav-dust { animation: wsav-blow 18s linear infinite; }
        .wsav-u2 { animation-duration: 23s; animation-delay: -9s; }
        .wsav-u3 { animation-duration: 15s; animation-delay: -5s; }
        .wsav-ear { transform-origin: 0% 50%; animation: wsav-fan 4.2s ease-in-out infinite; }
        .wsav-blade { transform-origin: 50% 100%; animation: wsav-bend 4.6s ease-in-out infinite; }
        .wsav-g2 { animation-duration: 5.4s; animation-delay: -1.4s; }
        .wsav-g3 { animation-duration: 4s; animation-delay: -2.6s; }
        .wsav-g4 { animation-duration: 5.8s; animation-delay: -0.8s; }
        .wsav-g5 { animation-duration: 4.8s; animation-delay: -3.2s; }
        .wsav-g6 { animation-duration: 5.2s; animation-delay: -2s; }
        .wsav-egret-a { animation: wsav-cross-a 28s linear infinite; animation-delay: -10s; }
        .wsav-egret-b { animation: wsav-cross-b 34s linear infinite; animation-delay: -17s; }
        .wsav-flap-a { transform-origin: 50% 100%; animation: wsav-flap 1.8s ease-in-out infinite; }
        .wsav-flap-b { transform-origin: 50% 100%; animation: wsav-flap 2.2s ease-in-out infinite; }
        @keyframes wsav-pulse {
          0%, 100% { transform: scale(0.84); opacity: 0.1; }
          50% { transform: scale(1.18); opacity: 0.28; }
        }
        @keyframes wsav-heat {
          0%, 100% { transform: scaleY(1) translateY(0); opacity: 0.16; }
          50% { transform: scaleY(2.1) translateY(-3px); opacity: 0.36; }
        }
        @keyframes wsav-blow {
          0% { transform: translateX(-90px) scaleX(0.6); opacity: 0; }
          25% { opacity: 0.38; }
          75% { opacity: 0.26; }
          100% { transform: translateX(120px) scaleX(1.4); opacity: 0; }
        }
        @keyframes wsav-fan {
          0%, 100% { transform: scaleX(1) rotate(0deg); }
          50% { transform: scaleX(0.62) rotate(-7deg); }
        }
        @keyframes wsav-bend {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(15deg); }
        }
        @keyframes wsav-cross-a {
          0% { transform: translate(-250px, 10px); }
          100% { transform: translate(220px, -14px); }
        }
        @keyframes wsav-cross-b {
          0% { transform: translate(160px, -8px); }
          100% { transform: translate(-320px, 12px); }
        }
        @keyframes wsav-flap {
          0%, 100% { transform: scaleY(0.55); }
          50% { transform: scaleY(1.35); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wsav-sun, .wsav-heat-a, .wsav-heat-b, .wsav-dust, .wsav-ear,
          .wsav-blade, .wsav-egret-a, .wsav-egret-b, .wsav-flap-a, .wsav-flap-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
