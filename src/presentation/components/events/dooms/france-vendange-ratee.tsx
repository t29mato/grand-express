/**
 * ぶどうが穫れない年。六月に雹、九月に腐敗。摘む前に棒に振られる。
 *
 * 畝の上に雹が降り、葉が打たれて落ちる。房のひとつは灰色に変わり、
 * 粒がひとつずつ地に落ちていく。摘み籠は空のまま横倒しになっている。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function FranceVendangeRatee() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った空 */}
      <rect width="400" height="210" fill="#3b4655" />
      <rect width="400" height="70" fill="#2f3946" />
      <g fill="#4a5666" opacity="0.7">
        <ellipse cx="80" cy="30" rx="72" ry="22" />
        <ellipse cx="230" cy="20" rx="88" ry="20" />
        <ellipse cx="350" cy="36" rx="66" ry="18" />
      </g>

      {/* 奥の畝 */}
      <rect y="112" width="400" height="98" fill="#6b6042" />
      <g stroke="#5a5137" strokeWidth="4" fill="none">
        <path d="M0,132 L400,126" />
        <path d="M0,156 L400,148" />
        <path d="M0,186 L400,176" />
      </g>

      {/* 支柱と針金 */}
      <g fill="#4d4230">
        <rect x="44" y="76" width="7" height="52" />
        <rect x="188" y="72" width="7" height="56" />
        <rect x="330" y="76" width="7" height="52" />
      </g>
      <g stroke="#5a4f3a" strokeWidth="3" fill="none">
        <path d="M0,92 L400,88" />
        <path d="M0,110 L400,106" />
      </g>

      {/* ぶどうの葉 */}
      <g fill="#3f6b39">
        <path d="M70,96 q22,-18 40,-2 q-14,22 -40,2z" />
        <path d="M140,92 q20,-16 38,-2 q-13,20 -38,2z" />
        <path d="M246,94 q21,-17 39,-2 q-13,21 -39,2z" />
        <path d="M312,90 q20,-16 37,-2 q-12,20 -37,2z" />
      </g>

      {/* 打たれて落ちる葉 */}
      <g transform="translate(142,106)">
        <g className="fvr-leaf">
          <path d="M-19,2 q20,-17 38,-2 q-13,21 -38,2z" fill="#6b7a34" />
        </g>
      </g>

      {/* 無事な房 */}
      <g fill="#5c3a72">
        <g transform="translate(96,118)">
          <circle cx="0" cy="0" r="6" />
          <circle cx="11" cy="2" r="6" />
          <circle cx="5" cy="11" r="6" />
          <circle cx="-6" cy="9" r="6" />
          <circle cx="4" cy="21" r="6" />
        </g>
        <g transform="translate(280,116)">
          <circle cx="0" cy="0" r="6" />
          <circle cx="11" cy="2" r="6" />
          <circle cx="5" cy="11" r="6" />
          <circle cx="-6" cy="9" r="6" />
          <circle cx="4" cy="21" r="6" />
        </g>
      </g>

      {/* 腐って灰色になった房 */}
      <g transform="translate(190,118)">
        <g className="fvr-rot">
          <circle cx="0" cy="0" r="7" fill="#7a6f66" />
          <circle cx="13" cy="3" r="7" fill="#8a7d70" />
          <circle cx="6" cy="13" r="7" fill="#6f6459" />
          <circle cx="-7" cy="11" r="7" fill="#7a6f66" />
          <circle cx="5" cy="25" r="7" fill="#655b52" />
        </g>
      </g>
      {/* こぼれ落ちる粒 */}
      <g transform="translate(194,146)">
        <g className="fvr-berry-a">
          <circle r="6" fill="#6f6459" />
        </g>
      </g>
      <g transform="translate(184,150)">
        <g className="fvr-berry-b">
          <circle r="5" fill="#7a6f66" />
        </g>
      </g>

      {/* 空のままの摘み籠 */}
      <g transform="translate(336,196) rotate(-11)">
        <g className="fvr-basket">
          <path d="M-27,-40 L27,-40 L19,0 L-19,0z" fill="#a8814a" />
          <g stroke="#8a6635" strokeWidth="3" fill="none">
            <path d="M-24,-28 L24,-28" />
            <path d="M-22,-16 L22,-16" />
          </g>
          <ellipse cx="0" cy="-40" rx="27" ry="8" fill="#8d6b3c" />
          <ellipse cx="0" cy="-40" rx="20" ry="5" fill="#453520" />
        </g>
      </g>

      {/* 雹 */}
      <g fill="#dfeaf2">
        <circle className="fvr-hail-a" cx="60" cy="0" r="5" />
        <circle className="fvr-hail-b" cx="130" cy="0" r="4" />
        <circle className="fvr-hail-c" cx="212" cy="0" r="6" />
        <circle className="fvr-hail-d" cx="288" cy="0" r="4.5" />
        <circle className="fvr-hail-e" cx="356" cy="0" r="5" />
        <circle className="fvr-hail-f" cx="24" cy="0" r="4" />
      </g>

      {/* 値下がりの矢 */}
      <g transform="translate(96,46)">
        <g className="fvr-arrow">
          <rect x="-5" y="-24" width="11" height="32" rx="3" fill="#e05252" />
          <path d="M-15,4 L0,24 L15,4z" fill="#e05252" />
        </g>
      </g>

      <style>{`
        .fvr-hail-a { transform-box: fill-box; transform-origin: center; animation: fvr-fall 1.2s linear infinite; }
        .fvr-hail-b { transform-box: fill-box; transform-origin: center; animation: fvr-fall 1.5s linear infinite; animation-delay: -0.5s; }
        .fvr-hail-c { transform-box: fill-box; transform-origin: center; animation: fvr-fall 1.1s linear infinite; animation-delay: -0.8s; }
        .fvr-hail-d { transform-box: fill-box; transform-origin: center; animation: fvr-fall 1.4s linear infinite; animation-delay: -0.2s; }
        .fvr-hail-e { transform-box: fill-box; transform-origin: center; animation: fvr-fall 1.3s linear infinite; animation-delay: -1s; }
        .fvr-hail-f { transform-box: fill-box; transform-origin: center; animation: fvr-fall 1.6s linear infinite; animation-delay: -0.6s; }
        .fvr-leaf { transform-box: fill-box; transform-origin: center; animation: fvr-drop 3.6s ease-in infinite; }
        .fvr-rot { transform-box: fill-box; transform-origin: 50% 0; animation: fvr-wither 3.6s ease-in-out infinite; }
        .fvr-berry-a { transform-box: fill-box; transform-origin: center; animation: fvr-shed 3.6s ease-in infinite; }
        .fvr-berry-b { transform-box: fill-box; transform-origin: center; animation: fvr-shed 3.6s ease-in infinite; animation-delay: -1.8s; }
        .fvr-basket { transform-box: fill-box; transform-origin: 50% 100%; animation: fvr-rock 3.6s ease-in-out infinite; }
        .fvr-arrow { transform-box: fill-box; transform-origin: center; animation: fvr-sink 3.6s ease-in-out infinite; }
        @keyframes fvr-fall {
          0% { transform: translate(0, -18px); opacity: 0; }
          14% { opacity: 1; }
          78% { opacity: 1; }
          100% { transform: translate(-14px, 200px); opacity: 0; }
        }
        @keyframes fvr-drop {
          0%, 22% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          46% { transform: translate(-8px, 26px) rotate(-40deg); opacity: 1; }
          80%, 100% { transform: translate(-16px, 76px) rotate(-120deg); opacity: 0; }
        }
        @keyframes fvr-wither {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.9) rotate(2deg); }
        }
        @keyframes fvr-shed {
          0%, 30% { transform: translate(0, -14px); opacity: 0; }
          40% { transform: translate(0, -6px); opacity: 1; }
          82%, 100% { transform: translate(-4px, 44px); opacity: 0; }
        }
        @keyframes fvr-rock {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-3deg); }
        }
        @keyframes fvr-sink {
          0%, 100% { transform: translate(0, -6px); opacity: 0.75; }
          50% { transform: translate(0, 8px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fvr-hail-a, .fvr-hail-b, .fvr-hail-c, .fvr-hail-d, .fvr-hail-e, .fvr-hail-f,
          .fvr-leaf, .fvr-rot, .fvr-berry-a, .fvr-berry-b,
          .fvr-basket, .fvr-arrow { animation: none; }
        }
      `}</style>
    </svg>
  );
}
