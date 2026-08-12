/**
 * スクーターに乗った引ったくりに鞄を奪われる。歩道を歩く人の後ろから
 * スクーターが近づき、鞄の持ち手だけをさらって走り去る。
 *
 * 暴力は描かない。奪われるのは鞄だけで、人は驚いた表情で立ち止まるだけにする。
 * 動くのはスクーターの走行と、飛んでいく鞄だけ。
 */
export function ItalyScippo() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 街の夕方。 */}
      <rect width="400" height="210" fill="#5f7f9f" />
      <rect y="0" width="400" height="80" fill="#7f9fb8" />

      {/* 建物(遠景)。 */}
      <g fill="#4a4f5a" opacity="0.85">
        <rect x="20" y="60" width="60" height="80" />
        <rect x="300" y="50" width="70" height="90" />
      </g>
      <g fill="#f4c430" opacity="0.7">
        <rect x="34" y="74" width="10" height="12" />
        <rect x="54" y="74" width="10" height="12" />
        <rect x="316" y="66" width="10" height="12" />
        <rect x="340" y="66" width="10" height="12" />
      </g>

      {/* 歩道。 */}
      <rect y="140" width="400" height="70" fill="#9a9484" />
      <g stroke="#8a8478" strokeWidth="1.4">
        <path d="M0,160h400M0,180h400" />
      </g>

      {/* 立ち止まって驚く歩行者(鞄の持ち手だけが手に残る)。 */}
      <g>
        <circle cx="300" cy="164" r="9" fill="#d9a273" />
        <path d="M291,158 a9,9 0 0 1 18,0" fill="none" stroke="#241a10" strokeWidth="2" />
        <rect x="288" y="176" width="24" height="28" rx="4" fill="#5b8fe8" />
        <path d="M296,176 q0,-10 8,-10 q8,0 8,10" fill="none" stroke="#4a4436" strokeWidth="2.5" />
      </g>
      {/* 手に残った持ち手(短い、驚きの印)。 */}
      <path d="M304,176 q0,-8 6,-9" fill="none" stroke="#8a5a3a" strokeWidth="2.5" strokeLinecap="round" />

      {/* 奪われた鞄本体(スクーターと一緒に飛んでいく)。 */}
      <g className="ita-sp-bag">
        <rect x="0" y="0" width="26" height="20" rx="4" fill="#c9714a" stroke="#7a3a1f" strokeWidth="1.6" />
      </g>

      {/* スクーターに乗った引ったくり(右から左へ走り抜ける)。 */}
      <g className="ita-sp-scooter">
        <ellipse cx="0" cy="190" rx="46" ry="6" fill="#20364a" opacity="0.3" />
        <circle cx="-22" cy="188" r="10" fill="#241a10" />
        <circle cx="22" cy="188" r="10" fill="#241a10" />
        <path d="M-24,188 q4,-24 20,-26 q10,-1 26,-2" fill="none" stroke="#4a4a52" strokeWidth="4" strokeLinecap="round" />
        <rect x="-6" y="158" width="30" height="16" rx="6" fill="#e8443f" />
        <circle cx="4" cy="150" r="8" fill="#f6efe2" />
        <rect x="-2" y="144" width="12" height="8" rx="3" fill="#241a10" />
      </g>

      {/* 速さを示す線。 */}
      <g className="ita-sp-lines" stroke="#f6efe2" strokeWidth="2" opacity="0.6">
        <path d="M0,0h30M0,10h20M0,20h26" />
      </g>

      <style>{`
        .ita-sp-scooter {
          animation: ita-sp-ride 2.2s linear infinite;
        }
        @keyframes ita-sp-ride {
          0% { transform: translateX(430px); }
          100% { transform: translateX(-60px); }
        }
        .ita-sp-bag {
          animation: ita-sp-fly 2.2s linear infinite;
        }
        @keyframes ita-sp-fly {
          0% { transform: translate(410px, 150px) rotate(0deg); opacity: 0; }
          8% { opacity: 1; }
          100% { transform: translate(-80px, 145px) rotate(-40deg); opacity: 1; }
        }
        .ita-sp-lines {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: ita-sp-blur 2.2s linear infinite;
        }
        @keyframes ita-sp-blur {
          0% { transform: translate(430px, 165px); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translate(-60px, 165px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ita-sp-scooter { animation: none; transform: translateX(140px); }
          .ita-sp-bag { animation: none; transform: translate(150px, 148px) rotate(-20deg); opacity: 1; }
          .ita-sp-lines { animation: none; opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
