/**
 * 11月・菊、そして新酒。
 *
 * 一日は墓地が菊の鉢で埋まり、第三木曜の零時にはその年の最初の葡萄酒が
 * どこでも一斉に開けられる。そのあいだの国は、灰色で忙しい。
 * 左に霧雨の墓地、右に灯りのついた店。壁の時計はまもなく零時。
 */
export function France07() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灰色の空 */}
      <rect width="400" height="210" fill="#7f8894" />
      <g fill="#6d7683">
        <ellipse className="f07-cloud" cx="90" cy="20" rx="88" ry="20" />
        <ellipse className="f07-cloud f07-cloud2" cx="280" cy="14" rx="96" ry="18" />
      </g>

      {/* 裸の木 */}
      <g transform="translate(150,140)">
        <path d="M-3,0 L-2,-40 L2,-40 L3,0z" fill="#4a3a2c" />
        <g stroke="#4a3a2c" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M0,-32 q-14,-8 -20,-20 M0,-36 q14,-8 22,-18 M0,-24 q-12,-4 -16,-14 M0,-26 q12,-4 18,-12" />
        </g>
      </g>

      {/* 地面 */}
      <rect y="140" width="400" height="70" fill="#5f6a56" />
      <rect y="140" width="400" height="5" fill="#4d5646" />

      {/* 墓地。菊の鉢が並ぶ */}
      <g transform="translate(64,178)">
        <rect x="-52" y="-34" width="24" height="34" rx="3" fill="#a9adb0" />
        <rect x="-16" y="-42" width="24" height="42" rx="3" fill="#9aa0a4" />
        <rect x="20" y="-30" width="24" height="30" rx="3" fill="#a9adb0" />
        {/* 菊の鉢 */}
        <g transform="translate(-40,2)">
          <path d="M-8,0 L-6,-10 L6,-10 L8,0z" fill="#b3663a" />
          <g className="f07-mum" fill="#f5b31c">
            <circle cx="0" cy="-16" r="7" />
            <circle cx="-7" cy="-12" r="4.5" />
            <circle cx="7" cy="-12" r="4.5" />
            <circle cx="0" cy="-23" r="4.5" />
          </g>
        </g>
        <g transform="translate(-4,2)">
          <path d="M-8,0 L-6,-10 L6,-10 L8,0z" fill="#b3663a" />
          <g className="f07-mum f07-mum2" fill="#f4f1e8">
            <circle cx="0" cy="-16" r="7" />
            <circle cx="-7" cy="-12" r="4.5" />
            <circle cx="7" cy="-12" r="4.5" />
            <circle cx="0" cy="-23" r="4.5" />
          </g>
        </g>
        <g transform="translate(32,2)">
          <path d="M-8,0 L-6,-10 L6,-10 L8,0z" fill="#b3663a" />
          <g className="f07-mum f07-mum3" fill="#c98fd0">
            <circle cx="0" cy="-16" r="7" />
            <circle cx="-7" cy="-12" r="4.5" />
            <circle cx="7" cy="-12" r="4.5" />
            <circle cx="0" cy="-23" r="4.5" />
          </g>
        </g>
      </g>

      {/* 灯りのついた店。零時に新酒が開く */}
      <g transform="translate(292,140)">
        <rect x="-92" y="-102" width="184" height="102" fill="#4e4238" />
        <rect x="-92" y="-102" width="184" height="9" fill="#3d332b" />
        <rect x="-78" y="-84" width="156" height="70" rx="3" fill="#f2c86a" />
        <rect x="-78" y="-84" width="156" height="70" rx="3" fill="none" stroke="#3d332b" strokeWidth="4" />

        {/* 壁の時計。針が零時へ回る */}
        <g transform="translate(-52,-62)">
          <circle r="13" fill="#fdf8ec" stroke="#5a4d40" strokeWidth="2.5" />
          <g className="f07-hand">
            <rect x="-1.4" y="-11" width="2.8" height="12" rx="1.4" fill="#3d332b" />
          </g>
          <circle r="1.8" fill="#3d332b" />
        </g>

        {/* 瓶。栓が抜けて飛ぶ */}
        <g transform="translate(4,-20)">
          <path d="M-9,0 L-9,-24 q0,-6 3,-9 l0,-11 h12 l0,11 q3,3 3,9 L9,0z" fill="#5a3a72" />
          <rect x="-7" y="-22" width="14" height="12" rx="1" fill="#e8443f" />
          <g className="f07-cork">
            <rect x="-3" y="-52" width="6" height="9" rx="2" fill="#c9954a" />
          </g>
        </g>

        {/* 掲げられたグラス */}
        <g transform="translate(38,-22)">
          <g className="f07-glass">
            <path d="M-8,-22 q0,12 8,14 q8,-2 8,-14z" fill="#8f3f6a" />
            <path d="M-8,-22 h16 v3 h-16z" fill="#c76a92" />
            <rect x="-1.2" y="-8" width="2.4" height="8" fill="#f4f1e8" />
            <ellipse cx="0" cy="0" rx="7" ry="2" fill="#f4f1e8" />
          </g>
        </g>
        <g transform="translate(62,-20)">
          <g className="f07-glass f07-glass2">
            <path d="M-7,-20 q0,11 7,13 q7,-2 7,-13z" fill="#8f3f6a" />
            <path d="M-7,-20 h14 v3 h-14z" fill="#c76a92" />
            <rect x="-1.1" y="-7" width="2.2" height="7" fill="#f4f1e8" />
            <ellipse cx="0" cy="0" rx="6" ry="2" fill="#f4f1e8" />
          </g>
        </g>

        {/* 客の後ろ姿 */}
        <g transform="translate(-24,-14)">
          <circle cx="0" cy="-30" r="10" fill="#2f2a24" />
          <path d="M-13,0 L-11,-22 L11,-22 L13,0z" fill="#3f5a7a" />
        </g>
      </g>

      {/* 霧雨 */}
      <g stroke="#cfd8de" strokeWidth="1.8" strokeLinecap="round" opacity="0.55">
        <path className="f07-drizzle" d="M24,0 l-4,14" />
        <path className="f07-drizzle f07-d2" d="M62,20 l-4,14" />
        <path className="f07-drizzle f07-d3" d="M104,4 l-4,14" />
        <path className="f07-drizzle f07-d4" d="M142,28 l-4,14" />
        <path className="f07-drizzle f07-d5" d="M186,10 l-4,14" />
        <path className="f07-drizzle f07-d6" d="M228,34 l-4,14" />
        <path className="f07-drizzle f07-d7" d="M268,6 l-4,14" />
        <path className="f07-drizzle f07-d8" d="M320,24 l-4,14" />
        <path className="f07-drizzle f07-d9" d="M362,12 l-4,14" />
        <path className="f07-drizzle f07-d10" d="M88,48 l-4,14" />
      </g>

      <style>{`
        .f07-cloud { animation: f07-drift 16s ease-in-out infinite; }
        .f07-cloud2 { animation-delay: 4s; animation-duration: 13s; }
        .f07-mum {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f07-nod 4.2s ease-in-out infinite;
        }
        .f07-mum2 { animation-delay: 0.9s; animation-duration: 4.8s; }
        .f07-mum3 { animation-delay: 1.8s; animation-duration: 3.6s; }
        .f07-hand {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f07-tick 6s linear infinite;
        }
        .f07-cork {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f07-pop 6s ease-out infinite;
        }
        .f07-glass {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f07-toast 6s ease-in-out infinite;
        }
        .f07-glass2 { animation-delay: 0.12s; }
        .f07-drizzle { animation: f07-fall 2.1s linear infinite; }
        .f07-d2 { animation-delay: 0.2s; animation-duration: 2.4s; }
        .f07-d3 { animation-delay: 0.4s; animation-duration: 1.9s; }
        .f07-d4 { animation-delay: 0.6s; animation-duration: 2.3s; }
        .f07-d5 { animation-delay: 0.8s; animation-duration: 2s; }
        .f07-d6 { animation-delay: 1s; animation-duration: 2.5s; }
        .f07-d7 { animation-delay: 1.2s; animation-duration: 2.1s; }
        .f07-d8 { animation-delay: 1.4s; animation-duration: 2.2s; }
        .f07-d9 { animation-delay: 1.6s; animation-duration: 1.95s; }
        .f07-d10 { animation-delay: 0.9s; animation-duration: 2.35s; }
        @keyframes f07-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(26px); }
        }
        @keyframes f07-nod {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes f07-tick {
          0% { transform: rotate(-42deg); }
          62%, 100% { transform: rotate(0deg); }
        }
        @keyframes f07-pop {
          0%, 60% { transform: translateY(30px) rotate(0deg); opacity: 0; }
          64% { opacity: 1; }
          78% { transform: translateY(-10px) rotate(150deg); opacity: 1; }
          100% { transform: translateY(-4px) rotate(300deg); opacity: 0; }
        }
        @keyframes f07-toast {
          0%, 62% { transform: translateY(6px) rotate(0deg); }
          72% { transform: translateY(-6px) rotate(-10deg); }
          80% { transform: translateY(-4px) rotate(8deg); }
          92%, 100% { transform: translateY(6px) rotate(0deg); }
        }
        @keyframes f07-fall {
          0% { transform: translate(0, -22px); opacity: 0; }
          18% { opacity: 0.6; }
          82% { opacity: 0.6; }
          100% { transform: translate(-16px, 152px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .f07-cloud, .f07-mum, .f07-hand, .f07-cork,
          .f07-glass, .f07-drizzle { animation: none; }
        }
      `}</style>
    </svg>
  );
}
