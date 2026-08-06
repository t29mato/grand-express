/**
 * 船が別の港に寄る。積み荷が二つ先の港で要るというので、
 * 予定の寄港は取り消され、客は荷物の行く先へ運ばれる。
 *
 * 思ってもみなかった海岸に降ろされ、舷梯はもう上げられている。
 * 手元に残っているのは、船がもう寄らない街までの切符だけ。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function WorldWrongPort() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 日暮れの海 */}
      <rect width="400" height="210" fill="#2a3d52" />
      <rect width="400" height="52" fill="#3d4056" />
      <rect y="52" width="400" height="22" fill="#6b4f56" />
      <circle cx="66" cy="70" r="16" fill="#e8a44a" opacity="0.55" />

      {/* 見たことのない岸 */}
      <g fill="#20303f">
        <path d="M0,74 q40,-16 84,-4 q46,14 90,-2 l0,20 -174,0z" />
      </g>
      <g transform="translate(44,88)">
        <g className="wwp-palm">
          <rect x="-3" y="-34" width="7" height="36" fill="#3f3627" />
          <path d="M0,-34 q-24,-6 -34,6 q22,-2 34,4z" fill="#2f5136" />
          <path d="M0,-34 q24,-6 34,6 q-22,-2 -34,4z" fill="#2f5136" />
          <path d="M0,-34 q-10,-18 -26,-22 q14,12 22,26z" fill="#28462f" />
          <path d="M0,-34 q10,-18 26,-22 q-14,12 -22,26z" fill="#28462f" />
        </g>
      </g>

      {/* 海 */}
      <rect y="90" width="400" height="52" fill="#22405c" />
      <g fill="#2d5477">
        <rect
          className="wwp-wave-a"
          x="180"
          y="104"
          width="140"
          height="5"
          rx="2.5"
        />
        <rect
          className="wwp-wave-b"
          x="60"
          y="122"
          width="170"
          height="5"
          rx="2.5"
        />
        <rect
          className="wwp-wave-c"
          x="250"
          y="134"
          width="130"
          height="5"
          rx="2.5"
        />
      </g>

      {/* 出ていく船 */}
      <g transform="translate(300,110)">
        <g className="wwp-ship">
          {/* 煙 */}
          <g fill="#5f6270" opacity="0.55">
            <circle className="wwp-smoke-a" cx="-6" cy="-58" r="10" />
            <circle className="wwp-smoke-b" cx="-6" cy="-58" r="12" />
          </g>
          <rect x="-14" y="-58" width="18" height="24" rx="3" fill="#c04434" />
          <rect x="-14" y="-58" width="18" height="7" rx="3" fill="#8d3227" />
          <rect x="-46" y="-40" width="76" height="18" rx="4" fill="#d8d2c4" />
          <g fill="#2a3a4a">
            <rect x="-38" y="-35" width="12" height="9" rx="2" />
            <rect x="-20" y="-35" width="12" height="9" rx="2" />
            <rect x="-2" y="-35" width="12" height="9" rx="2" />
          </g>
          <path d="M-92,-22 l178,0 l-20,28 -138,0z" fill="#2f4a5f" />
          <rect x="-92" y="-22" width="178" height="6" fill="#3d5d76" />
          <g fill="#f5b31c" opacity="0.7">
            <circle cx="-64" cy="-10" r="4" />
            <circle cx="-34" cy="-10" r="4" />
            <circle cx="-4" cy="-10" r="4" />
            <circle cx="26" cy="-10" r="4" />
          </g>
          {/* 上げられた舷梯 */}
          <g transform="rotate(-38 -86 -20)">
            <rect
              x="-124"
              y="-24"
              width="42"
              height="8"
              rx="3"
              fill="#8d949c"
            />
          </g>
        </g>
      </g>

      {/* 岸壁 */}
      <rect y="142" width="400" height="68" fill="#57544c" />
      <rect y="142" width="400" height="6" fill="#67645a" />
      <g fill="#4a473f">
        <rect x="60" y="148" width="4" height="62" />
        <rect x="180" y="148" width="4" height="62" />
        <rect x="300" y="148" width="4" height="62" />
      </g>

      {/* 係船柱と外された舫い */}
      <g transform="translate(330,148)">
        <rect x="-11" y="-18" width="22" height="20" rx="4" fill="#3f4048" />
        <ellipse cx="0" cy="-19" rx="14" ry="6" fill="#4a4b54" />
        <g className="wwp-rope">
          <path
            d="M8,-14 q28,10 44,-2"
            stroke="#a8905c"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* 降ろされた旅人 */}
      <g transform="translate(150,206)">
        {/* 鞄 */}
        <rect x="18" y="-30" width="52" height="30" rx="4" fill="#5c4632" />
        <rect x="18" y="-30" width="52" height="7" rx="3" fill="#6e553c" />
        <rect x="38" y="-36" width="14" height="8" rx="4" fill="#3f3022" />
        <g className="wwp-stand">
          <path d="M-24,0 q24,-22 48,0z" fill="#46586b" />
          <path d="M-20,-4 q20,-16 40,0 l-4,-52 -32,0z" fill="#4a6a8a" />
          {/* 見送る腕 */}
          <g className="wwp-arm">
            <rect x="14" y="-64" width="42" height="11" rx="5" fill="#4a6a8a" />
            <ellipse cx="58" cy="-59" rx="10" ry="8" fill="#f0e2cf" />
          </g>
          {/* 切符 */}
          <rect
            x="-40"
            y="-52"
            width="24"
            height="11"
            rx="2"
            fill="#f6efe2"
            transform="rotate(-14 -28 -46)"
          />
          <rect x="-38" y="-56" width="20" height="10" rx="4" fill="#4a6a8a" />
          <circle cx="0" cy="-78" r="17" fill="#f0e2cf" />
          <path d="M-17,-82 a17,17 0 0 1 34,0 l0,4 -34,0z" fill="#3a2a1e" />
          <circle cx="-6" cy="-77" r="2.8" fill="#2a1f18" />
          <circle cx="6" cy="-77" r="2.8" fill="#2a1f18" />
          <ellipse cx="0" cy="-68" rx="4" ry="4.6" fill="#a8503a" />
        </g>
      </g>

      {/* 置き去りの木箱 */}
      <g fill="#6b5233">
        <rect x="240" y="164" width="44" height="34" rx="3" />
        <rect x="240" y="164" width="44" height="7" rx="3" fill="#7d6140" />
        <rect x="288" y="176" width="34" height="22" rx="3" />
      </g>

      <style>{`
        .wwp-ship { transform-box: fill-box; transform-origin: center; animation: wwp-leave 7s ease-in infinite; }
        .wwp-smoke-a { transform-box: fill-box; transform-origin: center; animation: wwp-puff 2.6s ease-out infinite; }
        .wwp-smoke-b { transform-box: fill-box; transform-origin: center; animation: wwp-puff 2.6s ease-out infinite; animation-delay: -1.3s; }
        .wwp-palm { transform-box: fill-box; transform-origin: 50% 100%; animation: wwp-sway 4.6s ease-in-out infinite; }
        .wwp-rope { transform-box: fill-box; transform-origin: left center; animation: wwp-slack 4.6s ease-in-out infinite; }
        .wwp-stand { transform-box: fill-box; transform-origin: 50% 100%; animation: wwp-sag 7s ease-in-out infinite; }
        .wwp-arm { transform-box: fill-box; transform-origin: left center; animation: wwp-hail 7s ease-in-out infinite; }
        .wwp-wave-a { transform-box: fill-box; transform-origin: center; animation: wwp-drift 6s linear infinite; }
        .wwp-wave-b { transform-box: fill-box; transform-origin: center; animation: wwp-drift 7.6s linear infinite; animation-delay: -2.4s; }
        .wwp-wave-c { transform-box: fill-box; transform-origin: center; animation: wwp-drift 5.4s linear infinite; animation-delay: -3.6s; }
        @keyframes wwp-leave {
          0%, 8% { transform: translate(-40px, 0); }
          100% { transform: translate(120px, 0); }
        }
        @keyframes wwp-puff {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          25% { opacity: 0.55; }
          100% { transform: translate(-34px, -40px) scale(1.6); opacity: 0; }
        }
        @keyframes wwp-sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes wwp-slack {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(4deg) translate(0, 3px); }
        }
        @keyframes wwp-sag {
          0%, 26% { transform: rotate(0deg) translate(0, 0); }
          62%, 100% { transform: rotate(0deg) translate(0, 3px) scaleY(0.98); }
        }
        @keyframes wwp-hail {
          0%, 14% { transform: rotate(-42deg); }
          34% { transform: rotate(-52deg); }
          52% { transform: rotate(-36deg); }
          76%, 100% { transform: rotate(6deg); }
        }
        @keyframes wwp-drift {
          0% { transform: translate(-26px, 0); opacity: 0.4; }
          50% { opacity: 0.9; }
          100% { transform: translate(26px, 0); opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wwp-ship, .wwp-smoke-a, .wwp-smoke-b, .wwp-palm, .wwp-rope,
          .wwp-stand, .wwp-arm, .wwp-wave-a, .wwp-wave-b, .wwp-wave-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
