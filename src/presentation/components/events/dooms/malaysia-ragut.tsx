/**
 * バイクに乗った引ったくり(ラグット)に鞄を奪われる。五フィート街路を
 * 歩く人の後ろからバイクが近づき、鞄の持ち手だけをさらって走り去る。
 *
 * 暴力は描かない。奪われるのは鞄だけで、人は驚いて立ち止まるだけにする。
 * 動くのはバイクの走行と、飛んでいく鞄、速さを示す線だけ。
 */
export function MalaysiaRagut() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 五フィート街路のアーケード、夕方。 */}
      <rect width="400" height="210" fill="#5f7f9f" />
      <rect y="0" width="400" height="90" fill="#7f9fb8" />

      {/* ショップハウスの並び(遠景)。 */}
      <g fill="#4a4f5a" opacity="0.85">
        <rect x="10" y="60" width="70" height="80" />
        <rect x="310" y="50" width="80" height="90" />
      </g>
      <g fill="#f4c430" opacity="0.7">
        <rect x="24" y="76" width="10" height="12" />
        <rect x="48" y="76" width="10" height="12" />
        <rect x="326" y="66" width="10" height="12" />
        <rect x="352" y="66" width="10" height="12" />
      </g>

      {/* アーケードの柱と歩道。 */}
      <rect y="140" width="400" height="70" fill="#9a9484" />
      <g fill="#8a8478">
        <rect x="30" y="120" width="8" height="30" />
        <rect x="130" y="120" width="8" height="30" />
        <rect x="260" y="120" width="8" height="30" />
        <rect x="360" y="120" width="8" height="30" />
      </g>
      <rect y="118" width="400" height="6" fill="#9a8f70" opacity="0.9" />

      {/* 立ち止まって驚く歩行者(鞄の持ち手だけが手に残る)。 */}
      <g>
        <circle cx="300" cy="164" r="9" fill="#c9a877" />
        <path d="M291,158 a9,9 0 0 1 18,0" fill="none" stroke="#241a10" strokeWidth="2" />
        <rect x="288" y="176" width="24" height="28" rx="4" fill="#5b8fe8" />
        <path d="M296,176 q0,-10 8,-10 q8,0 8,10" fill="none" stroke="#4a4436" strokeWidth="2.5" />
      </g>
      <path d="M304,176 q0,-8 6,-9" fill="none" stroke="#8a5a3a" strokeWidth="2.5" strokeLinecap="round" />

      {/* 奪われた鞄本体(バイクと一緒に飛んでいく)。 */}
      <g className="my-rg-bag">
        <rect x="0" y="0" width="26" height="20" rx="4" fill="#c9714a" stroke="#7a3a1f" strokeWidth="1.6" />
      </g>

      {/* バイクに乗った引ったくり(右から左へ走り抜ける、二人乗り)。 */}
      <g className="my-rg-bike">
        <ellipse cx="0" cy="190" rx="46" ry="6" fill="#20364a" opacity="0.3" />
        <circle cx="-22" cy="188" r="10" fill="#241a10" />
        <circle cx="22" cy="188" r="10" fill="#241a10" />
        <path d="M-24,188 q4,-24 20,-26 q10,-1 26,-2" fill="none" stroke="#4a4a52" strokeWidth="4" strokeLinecap="round" />
        <rect x="-8" y="160" width="18" height="16" rx="5" fill="#e8443f" />
        <circle cx="0" cy="152" r="8" fill="#f6efe2" />
        <rect x="-6" y="146" width="12" height="8" rx="3" fill="#241a10" />
        {/* 後部座席の同乗者 */}
        <rect x="10" y="156" width="16" height="16" rx="5" fill="#2f6a30" />
        <circle cx="18" cy="148" r="7" fill="#e8dcc0" />
        <rect x="12" y="142" width="12" height="7" rx="3" fill="#241a10" />
      </g>

      {/* 速さを示す線。 */}
      <g className="my-rg-lines" stroke="#f6efe2" strokeWidth="2" opacity="0.6">
        <path d="M0,0h30M0,10h20M0,20h26" />
      </g>

      <style>{`
        .my-rg-bike {
          animation: my-rg-ride 2.2s linear infinite;
        }
        @keyframes my-rg-ride {
          0% { transform: translateX(430px); }
          100% { transform: translateX(-70px); }
        }
        .my-rg-bag {
          animation: my-rg-fly 2.2s linear infinite;
        }
        @keyframes my-rg-fly {
          0% { transform: translate(410px, 150px) rotate(0deg); opacity: 0; }
          8% { opacity: 1; }
          100% { transform: translate(-90px, 145px) rotate(-40deg); opacity: 1; }
        }
        .my-rg-lines {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: my-rg-blur 2.2s linear infinite;
        }
        @keyframes my-rg-blur {
          0% { transform: translate(430px, 165px); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translate(-70px, 165px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .my-rg-bike { animation: none; transform: translateX(140px); }
          .my-rg-bag { animation: none; transform: translate(150px, 148px) rotate(-20deg); opacity: 1; }
          .my-rg-lines { animation: none; opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
