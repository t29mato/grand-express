/**
 * ブッダガヤ(cavetemple)に重ねる動き。
 *
 * 菩提樹の葉が岩肌の前をくるくる落ちてゆき、
 * 石窟の前に供えた燈明がゆらぎ、細い煙がのぼる。
 * 背景(岩肌・石窟・地面)は下の静止画が描いているので、ここでは動くものだけ。
 */

/** 菩提樹の葉のかたち(先が細くのびる)。 */
const CAV_LEAF = "M0,0c-6,1.4 -7.4,8.6 -3.4,13.4c1.6,2 3.4,4.6 3.4,7.4c0,-2.8 1.8,-5.4 3.4,-7.4c4,-4.8 2.6,-12 -3.4,-13.4z";

export function IndiaCavetemple() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 落ちてくる菩提樹の葉 */}
      <g transform="translate(58,-18)">
        <g className="cav-leaf cav-leaf-1">
          <path d={CAV_LEAF} fill="#6b9f4f" />
        </g>
      </g>
      <g transform="translate(104,-24)">
        <g className="cav-leaf cav-leaf-2">
          <path d={CAV_LEAF} fill="#4d7a44" />
        </g>
      </g>
      <g transform="translate(300,-20)">
        <g className="cav-leaf cav-leaf-3">
          <path d={CAV_LEAF} fill="#86b45c" />
        </g>
      </g>
      <g transform="translate(348,-30)">
        <g className="cav-leaf cav-leaf-4">
          <path d={CAV_LEAF} fill="#5f8f47" />
        </g>
      </g>
      <g transform="translate(38,-14)">
        <g className="cav-leaf cav-leaf-5">
          <path d={CAV_LEAF} fill="#4d7a44" />
        </g>
      </g>

      {/* 供えられた燈明 */}
      <g>
        <ellipse className="cav-glow cav-glow-1" cx="118" cy="160" rx="17" ry="13" fill="#f5b31c" />
        <path d="M110,167h16l-3,7h-10z" fill="#a8813c" />
        <ellipse cx="118" cy="167" rx="8" ry="2.4" fill="#c9a04c" />
        <path className="cav-flame cav-flame-1" d="M118,165c-3.4,-4 -1.8,-8.6 0,-11c1.8,2.4 3.4,7 0,11z" fill="#f5d06a" />
      </g>
      <g>
        <ellipse className="cav-glow cav-glow-2" cx="282" cy="167" rx="14" ry="11" fill="#f5b31c" />
        <path d="M275,174h14l-2.5,6h-9z" fill="#a8813c" />
        <ellipse cx="282" cy="174" rx="7" ry="2.2" fill="#c9a04c" />
        <path className="cav-flame cav-flame-2" d="M282,172c-3,-3.6 -1.6,-7.6 0,-9.8c1.6,2.2 3,6.2 0,9.8z" fill="#f5d06a" />
      </g>

      {/* 燈明からのぼる細い煙 */}
      <g transform="translate(118,152)">
        <path className="cav-smoke" d="M0,0c-4,-9 4,-13 0,-22c-3,-7 2,-11 0,-16" fill="none" stroke="#e6e0d0" strokeWidth="2" strokeLinecap="round" />
      </g>

      <style>{`
        .cav-leaf { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .cav-leaf-1 { animation: cav-fall-a 13s linear infinite; }
        .cav-leaf-2 { animation: cav-fall-b 17s linear 4s infinite; }
        .cav-leaf-3 { animation: cav-fall-a 15s linear 8s infinite; }
        .cav-leaf-4 { animation: cav-fall-b 19s linear 2s infinite; }
        .cav-leaf-5 { animation: cav-fall-a 21s linear 11s infinite; }
        @keyframes cav-fall-a {
          0%   { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          8%   { opacity: 0.95; }
          50%  { transform: translate(-20px, 110px) rotate(150deg); }
          92%  { opacity: 0.95; }
          100% { transform: translate(8px, 216px) rotate(320deg); opacity: 0; }
        }
        @keyframes cav-fall-b {
          0%   { transform: translate(0, 0) rotate(20deg); opacity: 0; }
          8%   { opacity: 0.95; }
          50%  { transform: translate(22px, 116px) rotate(-130deg); }
          92%  { opacity: 0.95; }
          100% { transform: translate(-10px, 224px) rotate(-300deg); opacity: 0; }
        }

        .cav-glow { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0.16; }
        .cav-glow-1 { animation: cav-breathe 3.4s ease-in-out infinite alternate; }
        .cav-glow-2 { animation: cav-breathe 4.2s ease-in-out 1s infinite alternate; }
        @keyframes cav-breathe {
          from { transform: scale(0.82); opacity: 0.12; }
          to   { transform: scale(1.14); opacity: 0.26; }
        }

        .cav-flame { transform-box: fill-box; transform-origin: 50% 100%; }
        .cav-flame-1 { animation: cav-flicker 0.7s ease-in-out infinite alternate; }
        .cav-flame-2 { animation: cav-flicker 0.9s ease-in-out 0.3s infinite alternate; }
        @keyframes cav-flicker {
          from { transform: scale(0.85, 0.86) skewX(4deg); }
          to   { transform: scale(1.06, 1.14) skewX(-5deg); }
        }

        .cav-smoke {
          transform-box: fill-box; transform-origin: 50% 100%;
          opacity: 0; animation: cav-waft 8s ease-out infinite;
        }
        @keyframes cav-waft {
          0%   { transform: translateY(6px) scaleY(0.5); opacity: 0; }
          25%  { opacity: 0.34; }
          100% { transform: translateY(-26px) scaleY(1.2); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cav-leaf-1, .cav-leaf-2, .cav-leaf-3, .cav-leaf-4, .cav-leaf-5,
          .cav-glow-1, .cav-glow-2, .cav-flame-1, .cav-flame-2, .cav-smoke { animation: none; }
          .cav-leaf { opacity: 0.95; }
          .cav-leaf-1 { transform: translate(-14px, 74px) rotate(120deg); }
          .cav-leaf-2 { transform: translate(16px, 132px) rotate(-40deg); }
          .cav-leaf-3 { transform: translate(-8px, 46px) rotate(210deg); }
          .cav-leaf-4 { transform: translate(10px, 164px) rotate(60deg); }
          .cav-leaf-5 { transform: translate(-18px, 104px) rotate(-90deg); }
          .cav-glow { opacity: 0.22; }
          .cav-smoke { opacity: 0.3; }
        }
      `}</style>
    </svg>
  );
}
