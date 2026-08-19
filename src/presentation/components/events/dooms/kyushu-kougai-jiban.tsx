/**
 * 線路の下が抜ける。地下に蜂の巣のように走る旧坑道の天井が、
 * 道路や線路の下でついに落ちる。埋める前に「何世紀の坑道か」を調べねばならない。
 *
 * **地面の断面**で見せる。上が線路、下が古い坑道の空洞。人は出さない。
 * 動くのは、沈む枕木・落ちる小石・工事灯の3つだけ。
 */
export function KyushuKougaiJiban() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った昼の空。 */}
      <rect width="400" height="210" fill="#8f9aa2" />
      <rect y="0" width="400" height="62" fill="#9aa4aa" />
      <g fill="#b0b8bc" opacity="0.7">
        <ellipse cx="70" cy="22" rx="46" ry="12" />
        <ellipse cx="300" cy="16" rx="54" ry="11" />
      </g>

      {/* 中景。筑豊のボタ山と炭鉱町の家並み。 */}
      <path d="M0,62 L46,34 L86,62z" fill="#4f5348" />
      <path d="M300,62 L344,30 L388,62z" fill="#4f5348" />
      <g fill="#6f6a5e">
        <rect x="106" y="44" width="26" height="18" />
        <rect x="140" y="48" width="22" height="14" />
        <rect x="242" y="46" width="24" height="16" />
      </g>
      <g fill="#3f4852">
        <path d="M102,44h34l-5,-6h-24z" />
        <path d="M136,48h30l-4,-5h-22z" />
        <path d="M238,46h32l-5,-6h-22z" />
      </g>

      {/* 地表。 */}
      <rect y="62" width="400" height="26" fill="#7f8a68" />
      <rect y="84" width="400" height="10" fill="#8f8878" />

      {/* 路盤(バラスト)。中央だけが落ちている。 */}
      <path d="M0,94h150l-6,26H0z" fill="#a09884" />
      <path d="M256,94h144v26H262z" fill="#a09884" />
      <g fill="#8a8272">
        <circle cx="24" cy="102" r="2.4" />
        <circle cx="58" cy="108" r="2" />
        <circle cx="102" cy="100" r="2.2" />
        <circle cx="300" cy="104" r="2.4" />
        <circle cx="352" cy="110" r="2" />
      </g>

      {/* 陥没した穴。地下の旧坑道がのぞく。 */}
      <path d="M144,120 L150,94h106v26z" fill="#2a2622" />
      <path d="M150,94h106v6H150z" fill="#3f3a33" />
      <rect x="132" y="120" width="140" height="52" fill="#2a2622" />
      <path d="M132,120q70,-14 140,0v52H132z" fill="#241f1c" />
      {/* 坑道の枠(古い坑木)。 */}
      <g fill="#6b5330">
        <rect x="148" y="130" width="7" height="42" />
        <rect x="248" y="130" width="7" height="42" />
        <rect x="144" y="124" width="115" height="7" />
      </g>
      <g fill="#5a4630">
        <rect x="182" y="136" width="6" height="36" />
        <rect x="216" y="136" width="6" height="36" />
        <rect x="178" y="131" width="48" height="6" />
      </g>
      {/* 坑道の奥の暗がりとレール跡。 */}
      <rect x="158" y="160" width="88" height="12" fill="#1b1815" />
      <g stroke="#5f584c" strokeWidth="2" fill="none">
        <path d="M160,166h84M160,170h84" />
      </g>

      {/* 崩れた土。 */}
      <path d="M132,172q34,-16 70,-6t68,6v10H132z" fill="#5a5348" />
      <rect y="172" width="400" height="38" fill="#6b6252" />
      <g fill="#5f584c" opacity="0.8">
        <ellipse cx="80" cy="192" rx="60" ry="8" />
        <ellipse cx="330" cy="196" rx="64" ry="7" />
      </g>

      {/* 線路。中央で途切れ、枕木が宙に垂れている。 */}
      <g fill="#3f3226">
        <rect x="4" y="84" width="16" height="8" />
        <rect x="30" y="84" width="16" height="8" />
        <rect x="56" y="84" width="16" height="8" />
        <rect x="82" y="84" width="16" height="8" />
        <rect x="108" y="84" width="16" height="8" />
        <rect x="134" y="84" width="12" height="8" />
        <rect x="262" y="84" width="16" height="8" />
        <rect x="288" y="84" width="16" height="8" />
        <rect x="314" y="84" width="16" height="8" />
        <rect x="340" y="84" width="16" height="8" />
        <rect x="366" y="84" width="16" height="8" />
      </g>
      <g stroke="#3a3d42" strokeWidth="4.4" fill="none">
        <path d="M0,83h146M258,83h142M0,93h146M258,93h142" />
      </g>
      <g stroke="#dfdcd2" strokeWidth="1.8" fill="none">
        <path d="M0,82h146M258,82h142M0,92h146M258,92h142" />
      </g>
      {/* 穴の上に垂れ下がったレール。 */}
      <g stroke="#3a3d42" strokeWidth="4.4" fill="none">
        <path d="M146,83q28,26 56,28q28,-2 56,-28" />
        <path d="M146,93q28,26 56,28q28,-2 56,-28" />
      </g>
      <g stroke="#dfdcd2" strokeWidth="1.8" fill="none">
        <path d="M146,82q28,26 56,28q28,-2 56,-28" />
        <path d="M146,92q28,26 56,28q28,-2 56,-28" />
      </g>
      {/* 宙に残った枕木。**ここが沈む。** */}
      <g className="kjb-sleeper" fill="#3f3226">
        <rect x="164" y="98" width="18" height="7" />
        <rect x="192" y="110" width="18" height="7" />
        <rect x="222" y="100" width="18" height="7" />
      </g>

      {/* 落ちる小石。 */}
      <circle className="kjb-stone-a" cx="176" cy="112" r="3" fill="#8a8272" />
      <circle
        className="kjb-stone-b"
        cx="238"
        cy="106"
        r="2.4"
        fill="#a09884"
      />

      {/* 立入禁止の柵とコーン(人は出さない)。 */}
      <g fill="#e8443f">
        <path d="M46,172l10,-26h8l-10,26z" />
        <path d="M338,174l10,-26h8l-10,26z" />
      </g>
      <g fill="#f2ede0">
        <path d="M49,163l10,-1.4l-1.6,4.4l-10,1.4z" />
        <path d="M341,165l10,-1.4l-1.6,4.4l-10,1.4z" />
      </g>
      <rect x="64" y="158" width="272" height="7" fill="#f5b31c" />
      <g fill="#3a332c">
        <path d="M70,158h14l-8,7h-14zM104,158h14l-8,7h-14zM138,158h14l-8,7h-14zM172,158h14l-8,7h-14zM206,158h14l-8,7h-14zM240,158h14l-8,7h-14zM274,158h14l-8,7h-14zM308,158h14l-8,7h-14z" />
      </g>
      {/* 工事灯。**明滅する。** */}
      <circle className="kjb-lamp" cx="54" cy="150" r="6" fill="#f5b31c" />
      <circle cx="54" cy="150" r="2.6" fill="#f8e2a0" />

      <style>{`
        .kjb-sleeper {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: kjb-sink 3.6s ease-in-out infinite;
        }
        @keyframes kjb-sink {
          0%, 60% { transform: translateY(0); }
          78%     { transform: translateY(7px) rotate(1.5deg); }
          100%    { transform: translateY(0); }
        }
        .kjb-stone-a, .kjb-stone-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .kjb-stone-a { animation: kjb-fall 3.6s ease-in 0.6s infinite; }
        .kjb-stone-b { animation: kjb-fall 3.6s ease-in 2.1s infinite; }
        @keyframes kjb-fall {
          0%       { transform: translateY(0); opacity: 0; }
          10%      { opacity: 1; }
          55%      { transform: translateY(56px); opacity: 1; }
          70%, 100%{ transform: translateY(58px); opacity: 0; }
        }
        .kjb-lamp { animation: kjb-blink 1.4s steps(1, end) infinite; }
        @keyframes kjb-blink {
          0%, 49%   { opacity: 1; }
          50%, 100% { opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          .kjb-sleeper, .kjb-stone-a, .kjb-stone-b, .kjb-lamp { animation: none; }
          .kjb-sleeper { transform: translateY(6px); transform-box: fill-box; transform-origin: 50% 0%; }
          .kjb-stone-a { transform: translateY(30px); transform-box: fill-box; }
          .kjb-stone-b { transform: translateY(16px); transform-box: fill-box; }
          .kjb-lamp { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
