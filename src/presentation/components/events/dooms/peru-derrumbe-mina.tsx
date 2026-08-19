/**
 * 鉱山の坑道が崩れる。地下のどこかで坑道が崩れ、安全検査官は地面を
 * 一メートルずつ確かめ終えるまで、同じ斜面のすべてを閉鎖する。
 * 地図に残っていない古い坑道の近くに建てられた物件は、二度と開かないこともある。
 *
 * 構図: **坑内ではなく、坑口の外の斜面。**塞がった坑口、傾いだ支保工、
 * 途中で止まったトロッコ、渡された立入禁止の帯。斜面のあちこちに検査の灯りが点る。
 *
 * **人が巻き込まれる場面は描かない。**閉じた口・止まった車・遠くの灯りという
 * 構造だけで、「今日はもう誰も入れない」ことが伝わる。
 *
 * 動くのは4つ: 坑口から流れ出て沈む土埃、揺れる立入禁止の帯、
 * 斜面で動く検査の灯り、こぼれ落ちる小石。
 * 止めても「塞がった坑口と、渡された帯」で伝わる。
 *
 * (ボリビア盤の落盤とは別物にする: あちらは**坑内**、天井の亀裂、逃げる鉱夫。
 *  こちらは**外・昼・無人**で、崩れた後の静けさを描く。)
 */
export function PeruDerrumbeMina() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 土埃で濁った昼の空。 */}
      <rect width="400" height="210" fill="#a89a7c" />
      <rect width="400" height="92" fill="#9fb0b8" />
      <rect width="400" height="40" fill="#8fa4b0" />
      <ellipse cx="200" cy="88" rx="220" ry="26" fill="#cfc4ac" opacity="0.5" />

      {/* 掘られた山肌。段になっている。 */}
      <path d="M0,92h400v22H0z" fill="#8f7f68" />
      <path d="M0,114h400v20H0z" fill="#82725c" />
      <path d="M0,134h400v76H0z" fill="#907f66" />
      <g stroke="#6f6152" strokeWidth="1.6" opacity="0.5" fill="none">
        <path d="M0,104h400M0,124h400M0,146h400" />
      </g>

      {/* 崩れて塞がった坑口。木の支保工が傾いでいる。 */}
      <g transform="translate(104,0)">
        {/* 坑口の枠。石を積んだ口 */}
        <path d="M-36,168v-28a36,32 0 0 1 72,0v28z" fill="#7f6f58" />
        {/* 口の奥。**上半分だけ黒く残す。**下は土砂で塞がっている */}
        <path d="M-28,168v-24a28,25 0 0 1 56,0v24z" fill="#231f1a" />
        {/* 崩れた土砂。口の下半分を埋めている */}
        <path d="M-29,168q8,-30 29,-24q23,7 29,24z" fill="#a08f76" />
        <path d="M-22,168q8,-19 22,-15q15,4 22,15z" fill="#b09c80" />
        <g fill="#8f7f68">
          <circle cx="-14" cy="160" r="5" />
          <circle cx="4" cy="154" r="6" />
          <circle cx="20" cy="162" r="4.4" />
          <circle cx="-2" cy="164" r="4" />
        </g>
        <g stroke="#6f6152" strokeWidth="1.6" opacity="0.6" fill="none">
          <path d="M-36,152h10M26,152h10M-34,162h8M28,162h8" />
        </g>
        {/* 傾いだ支保工 */}
        <g fill="#7a5f3c">
          <path d="M-36,168l4,-40l7,1l-4,39z" />
          <path d="M34,168l-6,-40l7,-1l6,41z" />
          <path d="M-34,130l8,-6l62,4l-1,7z" />
        </g>
        {/* 坑口の上のトタン庇 */}
        <path d="M-44,122h88l-8,-9h-72z" fill="#8f9298" />
      </g>

      {/* 途中で止まったトロッコ。荷は積んだまま。 */}
      <g>
        <rect x="0" y="176" width="400" height="6" fill="#7a6a4e" />
        {Array.from({ length: 14 }).map((_, i) => (
          <rect
            key={i}
            x={4 + i * 29}
            y="174"
            width="12"
            height="10"
            fill="#6b5a44"
          />
        ))}
        <g stroke="#5a5a60" strokeWidth="2.4" fill="none">
          <path d="M0,176h400M0,182h400" />
        </g>
        <g transform="translate(258,0)">
          <path d="M-26,158h52l-5,18h-42z" fill="#5f5346" />
          <path d="M-24,158q26,-11 48,0z" fill="#8a7a5a" />
          <g fill="#2f2a26">
            <circle cx="-12" cy="178" r="6" />
            <circle cx="12" cy="178" r="6" />
          </g>
          <path d="M26,166h14" stroke="#5f5346" strokeWidth="3" fill="none" />
        </g>
      </g>

      {/* 立入禁止の帯。斜面を横切って渡してある。 */}
      <g fill="#8f8878">
        <rect x="40" y="140" width="5" height="50" />
        <rect x="340" y="146" width="5" height="44" />
      </g>
      <g className="peru-dm-tape">
        <path
          d="M42,150q90,16 180,4q90,-12 120,2"
          fill="none"
          stroke="#e8b21c"
          strokeWidth="7"
        />
        <path
          d="M42,150q90,16 180,4q90,-12 120,2"
          fill="none"
          stroke="#2f2a26"
          strokeWidth="7"
          strokeDasharray="10 20"
        />
      </g>

      {/* 斜面に散らばる検査の灯り。人影は小さく、危険の外にいる。 */}
      <g className="peru-dm-lamps">
        <g fill="#f7e2a0">
          <circle cx="316" cy="128" r="4" />
          <circle cx="356" cy="118" r="3.4" />
          <circle cx="386" cy="132" r="3" />
        </g>
        <g fill="#3f4a56">
          <rect x="313" y="130" width="6" height="12" rx="2" />
          <rect x="353" y="120" width="6" height="11" rx="2" />
          <rect x="383" y="134" width="6" height="10" rx="2" />
        </g>
      </g>
      <g fill="#e8702c">
        <path d="M310,128h12l-2,-4h-8z" />
        <path d="M350,118h12l-2,-4h-8z" />
      </g>

      {/* 坑口から流れ出て、地面に沈んでいく土埃。
          薄く広く重ねる。濃い楕円を数枚置くと、地面の水たまりに見える。 */}
      <g className="peru-dm-dust1" fill="#c9bca4" opacity="0.34">
        <ellipse cx="146" cy="162" rx="86" ry="8" />
        <ellipse cx="230" cy="190" rx="90" ry="6" />
      </g>
      <g className="peru-dm-dust2" fill="#dcd2bc" opacity="0.28">
        <ellipse cx="92" cy="150" rx="70" ry="7" />
        <ellipse cx="180" cy="178" rx="110" ry="6" />
      </g>

      {/* こぼれ落ちる小石。 */}
      <g className="peru-dm-pebble" fill="#7f7058">
        <circle cx="150" cy="140" r="3" />
        <circle cx="72" cy="134" r="2.4" />
      </g>

      <style>{`
        .peru-dm-dust1 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: peru-dm-settle 4.6s ease-out infinite;
        }
        .peru-dm-dust2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: peru-dm-settle 6.2s ease-out -2.4s infinite;
        }
        @keyframes peru-dm-settle {
          0% { transform: translateY(-8px) scale(0.82); opacity: 0.15; }
          45% { opacity: 0.6; }
          100% { transform: translateY(8px) scale(1.16); opacity: 0.08; }
        }
        .peru-dm-tape {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: peru-dm-flap 3.4s ease-in-out infinite;
        }
        @keyframes peru-dm-flap {
          0%, 100% { transform: scaleY(1) translateY(0); }
          50% { transform: scaleY(1.5) translateY(-2px); }
        }
        .peru-dm-lamps {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: peru-dm-search 3.2s ease-in-out infinite;
        }
        @keyframes peru-dm-search {
          0%, 100% { transform: translate(0, 0); opacity: 0.85; }
          50% { transform: translate(-5px, 3px); opacity: 1; }
        }
        .peru-dm-pebble {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: peru-dm-fall 2.6s ease-in infinite;
        }
        @keyframes peru-dm-fall {
          0% { transform: translateY(-4px); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(26px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .peru-dm-dust1,
          .peru-dm-dust2,
          .peru-dm-tape,
          .peru-dm-lamps,
          .peru-dm-pebble { animation: none; }
        }
      `}</style>
    </svg>
  );
}
