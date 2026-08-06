/**
 * ガンジス川のガート(リシケシュ)に重ねる、流れと灯明。
 *
 * 山を出たばかりの川は速い。水の筋が横に流れ、
 * 人が流した灯明(ディヤ)が炎を揺らしながら下っていく。
 * 岸の寺からは線香の煙がまっすぐ立ちのぼる。
 */
export function IndiaGhat() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 寺から立ちのぼる線香の煙 */}
      <g fill="#f2ead8">
        <g className="indghat-smoke-a" opacity="0.3">
          <ellipse cx="57" cy="41" rx="5.4" ry="4.6" />
          <ellipse cx="60" cy="34" rx="4.6" ry="4" />
          <ellipse cx="56" cy="28" rx="4" ry="3.4" />
          <ellipse cx="60" cy="22" rx="3.2" ry="2.8" />
        </g>
        <g className="indghat-smoke-b" opacity="0.24">
          <ellipse cx="313" cy="35" rx="4.6" ry="4" />
          <ellipse cx="316" cy="29" rx="4" ry="3.4" />
          <ellipse cx="312" cy="23" rx="3.2" ry="2.8" />
          <ellipse cx="315" cy="18" rx="2.6" ry="2.2" />
        </g>
      </g>

      {/* 川面にかかる朝もや */}
      <g fill="#dfeee6">
        <ellipse className="indghat-mist-a" cx="140" cy="172" rx="96" ry="5" opacity="0.22" />
        <ellipse className="indghat-mist-b" cx="290" cy="180" rx="88" ry="4.4" opacity="0.18" />
      </g>

      {/* 川の流れの筋 */}
      <g stroke="#bfe0cf" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <path className="indghat-flow-a" d="M40,178 h44" opacity="0.4" />
        <path className="indghat-flow-b" d="M210,186 h56" opacity="0.34" />
        <path className="indghat-flow-c" d="M96,196 h50" opacity="0.36" />
        <path className="indghat-flow-d" d="M264,202 h62" opacity="0.3" />
        <path className="indghat-flow-e" d="M150,208 h46" opacity="0.26" />
      </g>

      {/* 流れていく灯明 */}
      <g className="indghat-diya-a">
        <ellipse cx="0" cy="6" rx="5.5" ry="1.8" fill="#f5b31c" opacity="0.3" />
        <g className="indghat-bob-a">
          <path d="M-6,0 C-4,4 4,4 6,0 C3,1.6 -3,1.6 -6,0z" fill="#e8904a" />
          <path d="M-6,0 C-3,-2.6 3,-2.6 6,0 C3,-1 -3,-1 -6,0z" fill="#f2c48a" />
          <ellipse className="indghat-flame-a" cx="0" cy="-3.4" rx="1.5" ry="3" fill="#f5b31c" />
        </g>
      </g>
      <g className="indghat-diya-b">
        <g className="indghat-bob-b">
          <path d="M-5,0 C-3.4,3.4 3.4,3.4 5,0 C2.6,1.4 -2.6,1.4 -5,0z" fill="#e8904a" />
          <path d="M-5,0 C-2.6,-2.2 2.6,-2.2 5,0 C2.6,-0.9 -2.6,-0.9 -5,0z" fill="#f2c48a" />
          <ellipse className="indghat-flame-b" cx="0" cy="-2.8" rx="1.3" ry="2.6" fill="#f5b31c" />
        </g>
      </g>
      <g className="indghat-diya-c">
        <g className="indghat-bob-c">
          <path d="M-4.4,0 C-3,3 3,3 4.4,0 C2.2,1.2 -2.2,1.2 -4.4,0z" fill="#e8904a" />
          <path d="M-4.4,0 C-2.2,-2 2.2,-2 4.4,0 C2.2,-0.8 -2.2,-0.8 -4.4,0z" fill="#f2c48a" />
          <ellipse className="indghat-flame-c" cx="0" cy="-2.4" rx="1.2" ry="2.2" fill="#f5b31c" />
        </g>
      </g>

      <style>{`
        .indghat-smoke-a, .indghat-smoke-b,
        .indghat-mist-a, .indghat-mist-b,
        .indghat-flow-a, .indghat-flow-b, .indghat-flow-c,
        .indghat-flow-d, .indghat-flow-e,
        .indghat-diya-a, .indghat-diya-b, .indghat-diya-c {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .indghat-smoke-a { transform-origin: 50% 100%; animation: indghat-rise 8.5s ease-out infinite; }
        .indghat-smoke-b { transform-origin: 50% 100%; animation: indghat-rise 10.5s ease-out infinite; animation-delay: -4.5s; }
        .indghat-mist-a { animation: indghat-mist 30s ease-in-out infinite; }
        .indghat-mist-b { animation: indghat-mist 38s ease-in-out infinite; animation-delay: -16s; }
        .indghat-flow-a { animation: indghat-current 9s linear infinite; }
        .indghat-flow-b { animation: indghat-current 11s linear infinite; animation-delay: -4s; }
        .indghat-flow-c { animation: indghat-current 8s linear infinite; animation-delay: -6s; }
        .indghat-flow-d { animation: indghat-current 12s linear infinite; animation-delay: -2s; }
        .indghat-flow-e { animation: indghat-current 10s linear infinite; animation-delay: -8s; }
        .indghat-diya-a { transform: translate(116px, 184px); animation: indghat-float-a 19s linear infinite; }
        .indghat-diya-b { transform: translate(268px, 196px); animation: indghat-float-b 24s linear infinite; }
        .indghat-diya-c { transform: translate(58px, 204px); animation: indghat-float-c 28s linear infinite; }
        .indghat-bob-a, .indghat-bob-b, .indghat-bob-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .indghat-bob-a { animation: indghat-bob 3.2s ease-in-out infinite; }
        .indghat-bob-b { animation: indghat-bob 3.9s ease-in-out infinite; animation-delay: -1.3s; }
        .indghat-bob-c { animation: indghat-bob 2.8s ease-in-out infinite; animation-delay: -2.1s; }
        .indghat-flame-a, .indghat-flame-b, .indghat-flame-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .indghat-flame-a { animation: indghat-flicker 0.9s ease-in-out infinite; }
        .indghat-flame-b { animation: indghat-flicker 1.15s ease-in-out infinite; animation-delay: -0.4s; }
        .indghat-flame-c { animation: indghat-flicker 0.75s ease-in-out infinite; animation-delay: -0.6s; }
        @keyframes indghat-rise {
          0% { transform: translate(0, 16px) scale(0.4); opacity: 0; }
          25% { opacity: 0.3; }
          70% { opacity: 0.18; }
          100% { transform: translate(14px, -22px) scale(1.5); opacity: 0; }
        }
        @keyframes indghat-mist {
          0%, 100% { transform: translateX(-24px) scaleX(1); opacity: 0.14; }
          50% { transform: translateX(28px) scaleX(1.16); opacity: 0.26; }
        }
        @keyframes indghat-current {
          0% { transform: translateX(-90px) scaleX(0.6); opacity: 0; }
          20% { opacity: 0.38; }
          78% { opacity: 0.28; }
          100% { transform: translateX(150px) scaleX(1.25); opacity: 0; }
        }
        @keyframes indghat-float-a {
          0% { transform: translate(-24px, 184px); opacity: 0; }
          10% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translate(428px, 184px); opacity: 0; }
        }
        @keyframes indghat-float-b {
          0% { transform: translate(-24px, 196px); opacity: 0; }
          10% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translate(428px, 196px); opacity: 0; }
        }
        @keyframes indghat-float-c {
          0% { transform: translate(-24px, 204px); opacity: 0; }
          10% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translate(428px, 204px); opacity: 0; }
        }
        @keyframes indghat-bob {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-1.4px) rotate(3deg); }
        }
        @keyframes indghat-flicker {
          0%, 100% { transform: scaleY(1) skewX(-4deg); opacity: 1; }
          50% { transform: scaleY(0.72) skewX(5deg); opacity: 0.75; }
        }
        @media (prefers-reduced-motion: reduce) {
          .indghat-smoke-a, .indghat-smoke-b,
          .indghat-mist-a, .indghat-mist-b,
          .indghat-flow-a, .indghat-flow-b, .indghat-flow-c,
          .indghat-flow-d, .indghat-flow-e,
          .indghat-diya-a, .indghat-diya-b, .indghat-diya-c,
          .indghat-bob-a, .indghat-bob-b, .indghat-bob-c,
          .indghat-flame-a, .indghat-flame-b, .indghat-flame-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
