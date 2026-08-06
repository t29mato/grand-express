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
        <g className="icav-leaf icav-leaf-1">
          <path d={CAV_LEAF} fill="#6b9f4f" />
        </g>
      </g>
      <g transform="translate(104,-24)">
        <g className="icav-leaf icav-leaf-2">
          <path d={CAV_LEAF} fill="#4d7a44" />
        </g>
      </g>
      <g transform="translate(300,-20)">
        <g className="icav-leaf icav-leaf-3">
          <path d={CAV_LEAF} fill="#86b45c" />
        </g>
      </g>
      <g transform="translate(348,-30)">
        <g className="icav-leaf icav-leaf-4">
          <path d={CAV_LEAF} fill="#5f8f47" />
        </g>
      </g>
      <g transform="translate(38,-14)">
        <g className="icav-leaf icav-leaf-5">
          <path d={CAV_LEAF} fill="#4d7a44" />
        </g>
      </g>

      {/* 供えられた燈明 */}
      <g>
        <ellipse className="icav-glow icav-glow-1" cx="118" cy="160" rx="17" ry="13" fill="#f5b31c" />
        <path d="M110,167h16l-3,7h-10z" fill="#a8813c" />
        <ellipse cx="118" cy="167" rx="8" ry="2.4" fill="#c9a04c" />
        <path className="icav-flame icav-flame-1" d="M118,165c-3.4,-4 -1.8,-8.6 0,-11c1.8,2.4 3.4,7 0,11z" fill="#f5d06a" />
      </g>
      <g>
        <ellipse className="icav-glow icav-glow-2" cx="282" cy="167" rx="14" ry="11" fill="#f5b31c" />
        <path d="M275,174h14l-2.5,6h-9z" fill="#a8813c" />
        <ellipse cx="282" cy="174" rx="7" ry="2.2" fill="#c9a04c" />
        <path className="icav-flame icav-flame-2" d="M282,172c-3,-3.6 -1.6,-7.6 0,-9.8c1.6,2.2 3,6.2 0,9.8z" fill="#f5d06a" />
      </g>

      {/* 燈明からのぼる細い煙 */}
      <g transform="translate(118,152)">
        <path className="icav-smoke" d="M0,0c-4,-9 4,-13 0,-22c-3,-7 2,-11 0,-16" fill="none" stroke="#e6e0d0" strokeWidth="2" strokeLinecap="round" />
      </g>

      <style>{`
        .icav-leaf { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .icav-leaf-1 { animation: icav-fall-a 13s linear infinite; }
        .icav-leaf-2 { animation: icav-fall-b 17s linear 4s infinite; }
        .icav-leaf-3 { animation: icav-fall-a 15s linear 8s infinite; }
        .icav-leaf-4 { animation: icav-fall-b 19s linear 2s infinite; }
        .icav-leaf-5 { animation: icav-fall-a 21s linear 11s infinite; }
        @keyframes icav-fall-a {
          0%   { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          8%   { opacity: 0.95; }
          50%  { transform: translate(-20px, 110px) rotate(150deg); }
          92%  { opacity: 0.95; }
          100% { transform: translate(8px, 216px) rotate(320deg); opacity: 0; }
        }
        @keyframes icav-fall-b {
          0%   { transform: translate(0, 0) rotate(20deg); opacity: 0; }
          8%   { opacity: 0.95; }
          50%  { transform: translate(22px, 116px) rotate(-130deg); }
          92%  { opacity: 0.95; }
          100% { transform: translate(-10px, 224px) rotate(-300deg); opacity: 0; }
        }

        .icav-glow { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0.16; }
        .icav-glow-1 { animation: icav-breathe 3.4s ease-in-out infinite alternate; }
        .icav-glow-2 { animation: icav-breathe 4.2s ease-in-out 1s infinite alternate; }
        @keyframes icav-breathe {
          from { transform: scale(0.82); opacity: 0.12; }
          to   { transform: scale(1.14); opacity: 0.26; }
        }

        .icav-flame { transform-box: fill-box; transform-origin: 50% 100%; }
        .icav-flame-1 { animation: icav-flicker 0.7s ease-in-out infinite alternate; }
        .icav-flame-2 { animation: icav-flicker 0.9s ease-in-out 0.3s infinite alternate; }
        @keyframes icav-flicker {
          from { transform: scale(0.85, 0.86) skewX(4deg); }
          to   { transform: scale(1.06, 1.14) skewX(-5deg); }
        }

        .icav-smoke {
          transform-box: fill-box; transform-origin: 50% 100%;
          opacity: 0; animation: icav-waft 8s ease-out infinite;
        }
        @keyframes icav-waft {
          0%   { transform: translateY(6px) scaleY(0.5); opacity: 0; }
          25%  { opacity: 0.34; }
          100% { transform: translateY(-26px) scaleY(1.2); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .icav-leaf-1, .icav-leaf-2, .icav-leaf-3, .icav-leaf-4, .icav-leaf-5,
          .icav-glow-1, .icav-glow-2, .icav-flame-1, .icav-flame-2, .icav-smoke { animation: none; }
          .icav-leaf { opacity: 0.95; }
          .icav-leaf-1 { transform: translate(-14px, 74px) rotate(120deg); }
          .icav-leaf-2 { transform: translate(16px, 132px) rotate(-40deg); }
          .icav-leaf-3 { transform: translate(-8px, 46px) rotate(210deg); }
          .icav-leaf-4 { transform: translate(10px, 164px) rotate(60deg); }
          .icav-leaf-5 { transform: translate(-18px, 104px) rotate(-90deg); }
          .icav-glow { opacity: 0.22; }
          .icav-smoke { opacity: 0.3; }
        }
      `}</style>
    </svg>
  );
}
