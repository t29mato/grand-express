/**
 * 杜の都(仙台など)に重ねる動き。
 *
 * 七夕のくす玉と吹き流しが通りの上でゆっくり揺れ、ビルの窓に灯りがともる。
 * 背景(空・ビル・並木)は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function JapanCitygreen() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 吹き流し(左) */}
      <g transform="translate(44,0)">
        <g className="jcg-sway jcg-sway-a">
          <line x1="0" y1="0" x2="0" y2="12" stroke="#8a6a3a" strokeWidth="2" />
          <circle cx="0" cy="19" r="8" fill="#e8443f" />
          <circle cx="0" cy="19" r="4" fill="#f5b31c" />
          <g strokeWidth="3" strokeLinecap="round" opacity="0.9">
            <line x1="-5" y1="26" x2="-7" y2="60" stroke="#e8443f" />
            <line x1="0" y1="27" x2="0" y2="66" stroke="#f5b31c" />
            <line x1="5" y1="26" x2="7" y2="58" stroke="#f07ab0" />
          </g>
        </g>
      </g>

      {/* 吹き流し(中) */}
      <g transform="translate(158,0)">
        <g className="jcg-sway jcg-sway-b">
          <line x1="0" y1="0" x2="0" y2="16" stroke="#8a6a3a" strokeWidth="2" />
          <circle cx="0" cy="24" r="9" fill="#59c06d" />
          <circle cx="0" cy="24" r="4.5" fill="#f6efe2" />
          <g strokeWidth="3" strokeLinecap="round" opacity="0.9">
            <line x1="-6" y1="32" x2="-8" y2="72" stroke="#59c06d" />
            <line x1="0" y1="33" x2="1" y2="80" stroke="#5b8fe8" />
            <line x1="6" y1="32" x2="8" y2="70" stroke="#f5b31c" />
          </g>
        </g>
      </g>

      {/* 吹き流し(右) */}
      <g transform="translate(266,0)">
        <g className="jcg-sway jcg-sway-c">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#8a6a3a" strokeWidth="2" />
          <circle cx="0" cy="17" r="7.5" fill="#5b8fe8" />
          <circle cx="0" cy="17" r="3.8" fill="#f6efe2" />
          <g strokeWidth="3" strokeLinecap="round" opacity="0.9">
            <line x1="-5" y1="24" x2="-6" y2="54" stroke="#5b8fe8" />
            <line x1="0" y1="25" x2="0" y2="62" stroke="#f07ab0" />
            <line x1="5" y1="24" x2="6" y2="52" stroke="#f5b31c" />
          </g>
        </g>
      </g>

      {/* 吹き流し(端) */}
      <g transform="translate(356,0)">
        <g className="jcg-sway jcg-sway-d">
          <line x1="0" y1="0" x2="0" y2="14" stroke="#8a6a3a" strokeWidth="2" />
          <circle cx="0" cy="21" r="7" fill="#f5b31c" />
          <circle cx="0" cy="21" r="3.5" fill="#e8443f" />
          <g strokeWidth="3" strokeLinecap="round" opacity="0.9">
            <line x1="-5" y1="27" x2="-6" y2="52" stroke="#f5b31c" />
            <line x1="0" y1="28" x2="1" y2="58" stroke="#59c06d" />
            <line x1="5" y1="27" x2="6" y2="50" stroke="#e8443f" />
          </g>
        </g>
      </g>

      {/* ともる窓(背景のビルの窓と同じ位置) */}
      <g fill="#f5b31c">
        <rect className="jcg-lit jcg-lit-a" x="14" y="134" width="28" height="8" opacity="0.35" />
        <rect className="jcg-lit jcg-lit-b" x="70" y="110" width="28" height="8" opacity="0.3" />
        <rect className="jcg-lit jcg-lit-c" x="70" y="146" width="28" height="8" opacity="0.4" />
        <rect className="jcg-lit jcg-lit-d" x="182" y="96" width="28" height="8" opacity="0.32" />
        <rect className="jcg-lit jcg-lit-e" x="182" y="132" width="28" height="8" opacity="0.38" />
        <rect className="jcg-lit jcg-lit-f" x="238" y="124" width="28" height="8" opacity="0.3" />
        <rect className="jcg-lit jcg-lit-g" x="294" y="88" width="28" height="8" opacity="0.42" />
        <rect className="jcg-lit jcg-lit-h" x="294" y="142" width="28" height="8" opacity="0.28" />
        <rect className="jcg-lit jcg-lit-b" x="350" y="120" width="28" height="8" opacity="0.36" />
      </g>

      <style>{`
        .jcg-sway {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: jcg-swing 6.5s ease-in-out infinite;
        }
        .jcg-sway-b { animation-duration: 8s; animation-delay: -1.8s; }
        .jcg-sway-c { animation-duration: 7.2s; animation-delay: -3.4s; }
        .jcg-sway-d { animation-duration: 9s; animation-delay: -5.1s; }
        .jcg-lit { animation: jcg-glow 6s ease-in-out infinite; }
        .jcg-lit-b { animation-duration: 7.5s; animation-delay: -1.2s; }
        .jcg-lit-c { animation-duration: 5.2s; animation-delay: -2.4s; }
        .jcg-lit-d { animation-duration: 8.4s; animation-delay: -3.6s; }
        .jcg-lit-e { animation-duration: 6.8s; animation-delay: -0.8s; }
        .jcg-lit-f { animation-duration: 9.2s; animation-delay: -4.5s; }
        .jcg-lit-g { animation-duration: 5.6s; animation-delay: -2.9s; }
        .jcg-lit-h { animation-duration: 7.8s; animation-delay: -5.4s; }
        @keyframes jcg-swing {
          0%, 100% { transform: rotate(-3.5deg); }
          50% { transform: rotate(3.5deg); }
        }
        @keyframes jcg-glow {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.62; }
        }
        @media (prefers-reduced-motion: reduce) {
          .jcg-sway, .jcg-lit { animation: none; }
        }
      `}</style>
    </svg>
  );
}
