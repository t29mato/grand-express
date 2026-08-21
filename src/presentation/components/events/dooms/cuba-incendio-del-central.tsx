/**
 * 工場の建屋を火が焼く。
 *
 * 本文の芯は3つ。**乾いたキビ滓と古材がすぐ燃え広がること・ポンプが水を
 * かける前に建物ひとつ飲まれること・増築を重ねた工場にスプリンクラーなど
 * 無いこと。**
 *
 * 7枚の描き分けで、ここだけが**夜**。ただし「暗い絵は数字が健全なまま
 * 主役が消える」ので、**炎の明かりが届く範囲だけ**を明るくし、
 * 燃えている小屋・手押しポンプ・バケツの人はその圏内に置く。
 *
 * 動くのは**ゆらぐ炎・立ちのぼる煙・舞う火の粉・ポンプの梁を漕ぐ人・
 * バケツを振る人・壁に揺れる火明かり**。
 * 止めた状態でも、炎と黒煙、駆けつけた2人で分かる。
 */
export function CubaIncendioDelCentral() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜空 */}
      <rect width="400" height="210" fill="#1c2233" />
      <rect width="400" height="80" fill="#161c2b" />
      <g fill="#e8e4da" opacity="0.7">
        <circle cx="40" cy="22" r="1.3" />
        <circle cx="96" cy="14" r="1" />
        <circle cx="150" cy="30" r="1.1" />
        <circle cx="360" cy="18" r="1.2" />
        <circle cx="326" cy="38" r="1" />
      </g>
      <circle cx="368" cy="40" r="11" fill="#d8d4c2" opacity="0.9" />
      <circle cx="364" cy="37" r="3" fill="#b8b4a4" opacity="0.5" />

      {/* 工場のシルエット(本体は暗いまま) */}
      <rect x="0" y="74" width="150" height="72" fill="#232a3a" />
      <rect x="16" y="34" width="12" height="40" fill="#1e2432" />
      <rect x="70" y="26" width="14" height="48" fill="#1e2432" />
      <g fill="#2e3546">
        <rect x="12" y="88" width="12" height="14" />
        <rect x="34" y="88" width="12" height="14" />
        <rect x="56" y="88" width="12" height="14" />
      </g>

      {/* 燃えている小屋(工場の翼。炎の明かりで浮かぶ) */}
      <rect x="150" y="92" width="92" height="54" fill="#4a3626" />
      <rect x="150" y="92" width="92" height="6" fill="#5f4530" />
      <path d="M144,92h104l-10,-16H154z" fill="#3a2a1c" />
      {/* 火明かりが届く壁面 */}
      <g className="cuin-glowwall">
        <path d="M242,146V92h-46l-8,-14h56z" fill="#8a5230" opacity="0.9" />
        <rect x="196" y="98" width="46" height="48" fill="#7a4a2a" opacity="0.7" />
      </g>
      {/* 窓の中の火 */}
      <g className="cuin-window">
        <rect x="206" y="104" width="13" height="16" fill="#f5b31c" />
        <rect x="226" y="104" width="12" height="16" fill="#e8781f" />
        <rect x="160" y="106" width="12" height="14" fill="#c8571f" />
      </g>

      {/* 屋根を破った炎(3つの舌) */}
      <g transform="translate(212,76)">
        <g className="cuin-flame1">
          <path d="M0,0q-10,-14 -2,-28q2,8 8,10q-2,-12 6,-20q0,12 8,18q6,-6 4,-14q8,12 2,26q-6,12 -26,8z" fill="#e8781f" />
          <path d="M2,-2q-6,-10 0,-20q2,7 7,9q0,-10 5,-14q1,10 6,14q-2,10 -18,11z" fill="#f5b31c" />
          <path d="M6,-4q-2,-7 2,-12q3,6 6,7q-1,7 -8,5z" fill="#f8e08a" />
        </g>
      </g>
      <g transform="translate(174,84)">
        <g className="cuin-flame2">
          <path d="M0,0q-8,-10 -2,-22q3,7 7,8q-1,-10 6,-15q0,10 6,14q-2,12 -17,15z" fill="#e8781f" />
          <path d="M2,-2q-4,-8 0,-15q3,6 6,7q0,-7 4,-10q1,9 4,11q-3,8 -14,7z" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(240,86)">
        <g className="cuin-flame3">
          <path d="M0,0q-7,-9 -1,-19q2,6 6,7q-1,-9 5,-13q0,9 5,12q-1,10 -15,13z" fill="#d8641f" />
          <path d="M2,-2q-3,-7 0,-13q2,5 5,6q1,-6 3,-8q1,8 3,9q-2,7 -11,6z" fill="#f2a31c" />
        </g>
      </g>

      {/* 黒煙(夜空より少し明るい灰で読めるように) */}
      <g className="cuin-smoke1" fill="#4a4650" opacity="0.85">
        <ellipse cx="0" cy="0" rx="14" ry="9" />
        <ellipse cx="12" cy="-10" rx="17" ry="11" />
        <ellipse cx="28" cy="-22" rx="21" ry="13" />
      </g>
      <g className="cuin-smoke2" fill="#3e3a46" opacity="0.8">
        <ellipse cx="0" cy="0" rx="12" ry="8" />
        <ellipse cx="14" cy="-12" rx="16" ry="10" />
      </g>

      {/* 舞う火の粉 */}
      <g className="cuin-spark1" fill="#f5b31c">
        <circle r="1.7" />
      </g>
      <g className="cuin-spark2" fill="#e8781f">
        <circle r="1.4" />
      </g>
      <g className="cuin-spark3" fill="#f8e08a">
        <circle r="1.2" />
      </g>

      {/* 地面。炎の前だけ明るい */}
      <rect y="146" width="400" height="64" fill="#242433" />
      <path d="M140,146h140q26,0 46,10q-10,10 -46,10H150q-16,-10 -10,-20z" fill="#5f4530" opacity="0.8" />
      <rect y="196" width="400" height="14" fill="#1e1d2b" />

      {/* 手押しポンプと漕ぐ人(炎の明かりの圏内) */}
      <g transform="translate(288,168)">
        <rect x="-16" y="-12" width="32" height="10" fill="#6b3a2a" />
        <rect x="-19" y="-2" width="38" height="4" fill="#4f2c20" />
        <g fill="#33302c">
          <circle cx="-11" cy="4" r="4" />
          <circle cx="11" cy="4" r="4" />
        </g>
        <g className="cuin-beam">
          <path d="M-22,-18L22,-24" stroke="#8a6b43" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        </g>
        <path d="M0,-12v-8" stroke="#5f4530" strokeWidth="3" fill="none" />
        {/* ホースと水(炎に届きはじめたところ) */}
        <path d="M-16,-8q-24,2 -36,-8" stroke="#4a4038" strokeWidth="3" fill="none" />
        <g className="cuin-water">
          <path d="M-52,-16q-14,-26 -28,-40" stroke="#7fb8d8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
        </g>
      </g>
      <g transform="translate(312,158)">
        <g className="cuin-pumper">
          <rect x="-3.6" y="14" width="3.4" height="14" fill="#2c2620" />
          <rect x="0.6" y="14" width="3.4" height="14" fill="#2c2620" />
          <path d="M-5.4,-4h11l1,19H-6.4z" fill="#a85a8a" />
          <circle cx="0" cy="-8.6" r="5.4" fill="#b8794a" />
          <path d="M-4,-2l-12,-8" stroke="#b8794a" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* バケツを振る人 */}
      <g transform="translate(130,168)">
        <rect x="-3.6" y="14" width="3.4" height="14" fill="#2c2620" />
        <rect x="0.6" y="14" width="3.4" height="14" fill="#2c2620" />
        <path d="M-5.4,-4h11l1,19H-6.4z" fill="#c2b45f" />
        <circle cx="0" cy="-8.6" r="5.4" fill="#c98f5f" />
        <g className="cuin-bucket">
          <path d="M4,-2l13,4" stroke="#c98f5f" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <path d="M16,2l6,0l-1,7h-4.4z" fill="#5f6b70" />
          <path d="M16.4,2a3,2.4 0 0 1 5.2,0" stroke="#8a949a" strokeWidth="1.2" fill="none" />
        </g>
      </g>

      {/* 引き込み線の名残(前景の細部) */}
      <g fill="#33323e">
        <rect x="10" y="188" width="16" height="3" />
        <rect x="40" y="188" width="16" height="3" />
        <rect x="70" y="188" width="16" height="3" />
      </g>
      <path d="M0,187h110" stroke="#3e3d4a" strokeWidth="2" fill="none" />

      <style>{`
        .cuin-flame1, .cuin-flame2, .cuin-flame3 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .cuin-flame1 { animation: cuin-flick 0.9s ease-in-out infinite; }
        .cuin-flame2 { animation: cuin-flick 0.7s ease-in-out 0.2s infinite; }
        .cuin-flame3 { animation: cuin-flick 0.8s ease-in-out 0.45s infinite; }
        @keyframes cuin-flick {
          0%, 100% { transform: scaleY(1) skewX(0deg); }
          50%      { transform: scaleY(1.14) skewX(-3deg); }
        }
        .cuin-glowwall { animation: cuin-throb 1.8s ease-in-out infinite; }
        .cuin-window { animation: cuin-throb 1.1s ease-in-out 0.3s infinite; }
        @keyframes cuin-throb {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.72; }
        }
        .cuin-smoke1 { animation: cuin-rise1 5s linear infinite; }
        .cuin-smoke2 { animation: cuin-rise2 6s linear 1.4s infinite; }
        @keyframes cuin-rise1 {
          0%   { transform: translate(206px, 52px) scale(0.6); opacity: 0; }
          20%  { opacity: 0.85; }
          100% { transform: translate(238px, -34px) scale(1.5); opacity: 0; }
        }
        @keyframes cuin-rise2 {
          0%   { transform: translate(170px, 60px) scale(0.6); opacity: 0; }
          20%  { opacity: 0.8; }
          100% { transform: translate(196px, -24px) scale(1.4); opacity: 0; }
        }
        .cuin-spark1 { animation: cuin-fly1 2.4s ease-out infinite; }
        .cuin-spark2 { animation: cuin-fly2 3s ease-out 0.9s infinite; }
        .cuin-spark3 { animation: cuin-fly3 2.7s ease-out 1.6s infinite; }
        @keyframes cuin-fly1 {
          0%   { transform: translate(212px, 60px); opacity: 1; }
          100% { transform: translate(258px, -8px); opacity: 0; }
        }
        @keyframes cuin-fly2 {
          0%   { transform: translate(180px, 70px); opacity: 1; }
          100% { transform: translate(214px, 6px); opacity: 0; }
        }
        @keyframes cuin-fly3 {
          0%   { transform: translate(240px, 72px); opacity: 1; }
          100% { transform: translate(286px, 14px); opacity: 0; }
        }
        .cuin-beam {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: cuin-seesaw 1.6s ease-in-out infinite;
        }
        @keyframes cuin-seesaw {
          0%, 100% { transform: rotate(-7deg); }
          50%      { transform: rotate(7deg); }
        }
        .cuin-pumper {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cuin-row 1.6s ease-in-out infinite;
        }
        @keyframes cuin-row {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(3px) rotate(-5deg); }
        }
        .cuin-water { animation: cuin-jet 1.6s ease-in-out infinite; }
        @keyframes cuin-jet {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
        .cuin-bucket {
          transform-box: fill-box;
          transform-origin: 0% 20%;
          animation: cuin-swing 2.2s ease-in-out infinite;
        }
        @keyframes cuin-swing {
          0%, 100% { transform: rotate(0deg); }
          45%      { transform: rotate(-26deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cuin-flame1, .cuin-flame2, .cuin-flame3, .cuin-glowwall,
          .cuin-window, .cuin-smoke1, .cuin-smoke2,
          .cuin-spark1, .cuin-spark2, .cuin-spark3,
          .cuin-beam, .cuin-pumper, .cuin-water, .cuin-bucket {
            animation: none;
          }
          /* 煙は建物の上に一塊、火の粉は消し、水は炎に届いた位置で止める。 */
          .cuin-smoke1 { transform: translate(222px, 20px) scale(1.1); opacity: 0.8; }
          .cuin-smoke2 { transform: translate(184px, 34px) scale(1); opacity: 0.7; }
          .cuin-spark1, .cuin-spark2, .cuin-spark3 { opacity: 0; }
          .cuin-water { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
