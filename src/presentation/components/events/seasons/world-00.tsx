/**
 * 4月。北は花、南は収穫。
 *
 * 画面を左右に割って、同じ週の二つの半球を並べる。左は花の咲いた木から
 * 花びらが落ち、右はぶどうの房が切られて箱に落ちていく。
 */
export function World00() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 左=北半球の春 / 右=南半球の秋 */}
      <rect width="200" height="210" fill="#a9d3ee" />
      <rect x="200" width="200" height="210" fill="#e8b36a" />

      {/* 遠景 */}
      <path d="M0,118 L40,92 L78,118 L128,88 L176,118 L200,104 L200,124 L0,124z" fill="#8cadc4" />
      <path d="M200,110 L242,90 L286,110 L330,86 L376,110 L400,98 L400,124 L200,124z" fill="#c99a5c" />

      {/* 地面 */}
      <rect y="118" width="200" height="92" fill="#5f8a4c" />
      <rect x="200" y="118" width="200" height="92" fill="#c9a85c" />
      <rect y="118" width="200" height="7" fill="#4a7342" />
      <rect x="200" y="118" width="200" height="7" fill="#a8853c" />

      {/* 花の咲いた木(北) */}
      <rect x="84" y="104" width="9" height="44" fill="#5a3a22" />
      <path d="M88,112 L76,100 M88,108 L100,96" stroke="#5a3a22" strokeWidth="5" strokeLinecap="round" />
      <g className="w00-bloom">
        <circle cx="88" cy="86" r="26" fill="#f7b8cf" />
        <circle cx="62" cy="98" r="16" fill="#f0a9c4" />
        <circle cx="116" cy="96" r="17" fill="#f0a9c4" />
        <circle cx="92" cy="64" r="15" fill="#fbd0e0" />
      </g>

      {/* 木の下の花びらだまりと、咲きだした野の花 */}
      <g fill="#fbd0e0" opacity="0.8">
        <ellipse cx="88" cy="152" rx="30" ry="6" />
      </g>
      <g>
        <g className="w00-flower">
          <path d="M28,196 L28,178" stroke="#3f6b3a" strokeWidth="3" />
          <circle cx="28" cy="174" r="6" fill="#f5b31c" />
        </g>
        <g className="w00-flower w00-fl2">
          <path d="M50,200 L50,184" stroke="#3f6b3a" strokeWidth="3" />
          <circle cx="50" cy="180" r="5" fill="#f6efe2" />
        </g>
        <g className="w00-flower w00-fl3">
          <path d="M148,198 L148,180" stroke="#3f6b3a" strokeWidth="3" />
          <circle cx="148" cy="176" r="6" fill="#e8447a" />
        </g>
        <g className="w00-flower w00-fl4">
          <path d="M170,204 L170,190" stroke="#3f6b3a" strokeWidth="3" />
          <circle cx="170" cy="186" r="5" fill="#f5b31c" />
        </g>
      </g>

      {/* 舞い落ちる花びら(北) */}
      <g fill="#fbd0e0">
        <ellipse className="w00-petal" cx="48" cy="52" rx="6" ry="4" />
        <ellipse className="w00-petal w00-p2" cx="118" cy="36" rx="5" ry="3.5" />
        <ellipse className="w00-petal w00-p3" cx="160" cy="60" rx="6" ry="4" />
        <ellipse className="w00-petal w00-p4" cx="24" cy="72" rx="5" ry="3.5" />
        <ellipse className="w00-petal w00-p5" cx="140" cy="88" rx="5" ry="3.5" />
      </g>

      {/* ぶどう畑(南)。支柱と針金 */}
      <g stroke="#8a6a3c" strokeWidth="4" strokeLinecap="round">
        <path d="M228,140 L228,110" />
        <path d="M282,140 L282,110" />
        <path d="M336,140 L336,110" />
        <path d="M388,140 L388,110" />
      </g>
      <g stroke="#6b5330" strokeWidth="2">
        <path d="M222,118 L400,118" />
        <path d="M222,130 L400,130" />
      </g>
      <g fill="#4d7a44">
        <ellipse cx="246" cy="116" rx="16" ry="10" />
        <ellipse cx="300" cy="114" rx="17" ry="10" />
        <ellipse cx="356" cy="116" rx="16" ry="10" />
      </g>

      {/* ぶどうの房。左端の房が切られて落ちる */}
      <g fill="#6b4a7a">
        <path className="w00-grape" d="M246,124 q9,0 9,9 q0,13 -9,20 q-9,-7 -9,-20 q0,-9 9,-9z" />
        <path d="M300,122 q9,0 9,9 q0,13 -9,20 q-9,-7 -9,-20 q0,-9 9,-9z" />
        <path d="M356,124 q9,0 9,9 q0,13 -9,20 q-9,-7 -9,-20 q0,-9 9,-9z" />
      </g>

      {/* 房を切る人。落ちていく房とは重ならない位置に立たせている */}
      <g>
        <path d="M294,206 L294,174 Q310,161 326,174 L326,206z" fill="#5b8fe8" />
        <circle cx="310" cy="156" r="11" fill="#f6efe2" />
        <path d="M296,150 L324,150 L318,140 L302,140z" fill="#e8c88a" />
        <ellipse cx="310" cy="151" rx="20" ry="4.5" fill="#e8c88a" />
        {/* 腕は帽子より後に描く(重ねると腕が消えるため) */}
        <g className="w00-arm">
          <path d="M300,178 L286,144" stroke="#5b8fe8" strokeWidth="8" strokeLinecap="round" />
          <circle cx="286" cy="142" r="5.5" fill="#f6efe2" />
        </g>
      </g>

      {/* 収穫の木箱と積まれた房 */}
      <rect x="216" y="176" width="72" height="30" fill="#a8813c" />
      <rect x="216" y="176" width="72" height="6" fill="#8a6a2c" />
      <g fill="#6b4a7a">
        <circle cx="230" cy="176" r="7" />
        <circle cx="246" cy="173" r="8" />
        <circle cx="264" cy="176" r="7" />
        <circle cx="280" cy="175" r="6" />
      </g>
      <g stroke="#8a6a2c" strokeWidth="2">
        <path d="M234,182 L234,206 M252,182 L252,206 M270,182 L270,206" />
      </g>

      {/* 半球の境目 */}
      <rect x="197" width="6" height="210" fill="#f6efe2" opacity="0.35" />
      <path
        d="M200,0 L200,210"
        stroke="#f6efe2"
        strokeWidth="2"
        strokeDasharray="10 9"
        opacity="0.75"
      />

      {/* 渡り鳥。境目をまたいで飛ぶ */}
      <g className="w00-bird" fill="none" stroke="#3a3f48" strokeWidth="3" strokeLinecap="round">
        <path d="M150,44 q8,-7 16,0 q8,-7 16,0" />
      </g>
      <g className="w00-bird w00-bird2" fill="none" stroke="#3a3f48" strokeWidth="2.4" strokeLinecap="round">
        <path d="M186,28 q6,-6 12,0 q6,-6 12,0" />
      </g>

      <style>{`
        .w00-bloom {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w00-open 7s ease-in-out infinite;
        }
        .w00-petal {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w00-fall 5.6s linear infinite;
        }
        .w00-p2 { animation-delay: 1.1s; animation-duration: 6.4s; }
        .w00-p3 { animation-delay: 2.2s; animation-duration: 5s; }
        .w00-p4 { animation-delay: 3.3s; animation-duration: 6s; }
        .w00-p5 { animation-delay: 4.4s; animation-duration: 5.4s; }
        .w00-grape {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: w00-drop 5s ease-in infinite;
        }
        .w00-arm {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w00-cut 5s ease-in-out infinite;
        }
        .w00-bird {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w00-cross 9s linear infinite;
        }
        .w00-bird2 { animation-delay: -3.4s; animation-duration: 11s; }
        .w00-flower {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w00-nod 4.4s ease-in-out infinite;
        }
        .w00-fl2 { animation-delay: -1.1s; }
        .w00-fl3 { animation-delay: -2.2s; }
        .w00-fl4 { animation-delay: -3.3s; }
        @keyframes w00-open {
          0% { transform: scale(0.72); }
          16%, 86% { transform: scale(1); }
          100% { transform: scale(0.72); }
        }
        @keyframes w00-fall {
          0% { transform: translate(0, -34px) rotate(0deg); opacity: 0; }
          12%, 86% { opacity: 1; }
          100% { transform: translate(-46px, 150px) rotate(320deg); opacity: 0; }
        }
        @keyframes w00-drop {
          0%, 22% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          64% { transform: translate(-14px, 46px) rotate(-24deg); opacity: 1; }
          78%, 100% { transform: translate(-16px, 52px) rotate(-30deg); opacity: 0; }
        }
        @keyframes w00-cut {
          0%, 10% { transform: rotate(0deg) translateY(0); }
          20% { transform: rotate(-9deg) translateY(-4px); }
          30%, 100% { transform: rotate(0deg) translateY(0); }
        }
        @keyframes w00-cross {
          0% { transform: translate(-160px, 18px); }
          100% { transform: translate(260px, -22px); }
        }
        @keyframes w00-nod {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .w00-bloom, .w00-petal, .w00-grape, .w00-arm, .w00-bird,
          .w00-flower { animation: none; }
        }
      `}</style>
    </svg>
  );
}
