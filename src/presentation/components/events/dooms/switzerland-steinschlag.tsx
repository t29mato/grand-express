/**
 * 落石で線路が閉ざされる。凍結と融解を繰り返した岩盤から、配送トラックほどの
 * 塊が一夜のうちに抜け落ち、いま線路をまっすぐふさいでいる。
 *
 * 構図: 左の岩壁に**剥がれたばかりの明るい傷跡**と、押さえ切れずに破れた落石防護網。
 * 線路の上に載った角ばった岩塊。手前で**双眼鏡を上げて斜面を見上げる保線員**
 * (春と秋にこの斜面を見回っているのはこの人たち)。右端で止まった赤い列車。
 * 「シャベルではなくクレーンを待つ」話なので、人ひとりでは動かせない大きさに描く。
 *
 * 動くのは4つ: 傷跡から落ち続ける小石、岩の根元の土埃、保線員の双眼鏡、
 * 線路脇の赤い信号。止めても「線路の上の岩と、剥がれた岩肌」で伝わる。
 */
export function SwitzerlandSteinschlag() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冷えた朝の空。 */}
      <rect width="400" height="210" fill="#c4d0d8" />
      <rect width="400" height="72" fill="#aec0cc" />
      <ellipse cx="300" cy="34" rx="60" ry="12" fill="#c8d4dc" opacity="0.7" />

      {/* 谷の向こうの稜線。 */}
      <path d="M180,96L232,44L268,74L312,36L360,80L400,58V210H180z" fill="#78828e" />
      <path d="M232,44l10,14l-6,-2l-5,3l-4,-3l-5,2zM312,36l9,13l-5,-2l-4,3l-4,-3l-5,2z" fill="#eef3f6" />
      <path d="M180,120q60,-14 120,-6q54,7 100,-6v102H180z" fill="#5f6b62" />

      {/* 左の岩壁。斜めの面で明暗を割る(等間隔の格子は煉瓦塀に見える)。 */}
      <path d="M0,0h150l-18,60l14,54l-20,96H0z" fill="#7f8590" />
      <path d="M0,0h64l-8,58l10,56l-14,96H0z" fill="#69707b" />
      <path d="M104,0h46l-18,60l14,54l-10,50l-26,-60l14,-50z" fill="#8f959e" />
      <g stroke="#545a63" strokeWidth="2" opacity="0.65" fill="none">
        <path d="M28,26l10,42M70,10l-8,36M92,80l12,44M46,120l-10,40" />
      </g>

      {/* **剥がれたばかりの傷跡。**周りより明るく、輪郭が角張っている。 */}
      <path d="M96,42l34,10l-6,34l16,26l-30,14l-22,-32l14,-24z" fill="#c4c8ce" />
      <path d="M96,42l34,10l-6,34l-20,-8l6,-22z" fill="#dde1e6" />

      {/* 破れた落石防護網。**山を押さえつけていた人工物が負けている。** */}
      <g stroke="#4f555c" strokeWidth="1.4" opacity="0.75" fill="none">
        <path d="M60,20l-6,66M84,16l-4,64M108,120l-4,54M132,116l-6,58M56,44h54M54,66h48M104,140h30M102,160h32" />
      </g>
      <path d="M110,86q16,10 26,26q-22,-4 -34,-16z" fill="#5f666e" opacity="0.5" />
      <g fill="#3f454c">
        <rect x="52" y="14" width="4" height="8" />
        <rect x="82" y="10" width="4" height="8" />
        <rect x="104" y="114" width="4" height="8" />
      </g>

      {/* 斜面の樅と、崩れ落ちた小さな岩。 */}
      <g fill="#25402f">
        <path d="M158,150l-9,20h18zM158,138l-7,16h14zM178,158l-8,18h16zM178,148l-6,14h12z" />
      </g>
      <g fill="#5a616a">
        <ellipse cx="150" cy="176" rx="14" ry="6" />
        <ellipse cx="186" cy="180" rx="10" ry="4.4" />
      </g>

      {/* 線路。バラスト・枕木・レール。 */}
      <rect y="182" width="400" height="28" fill="#8f8a7c" />
      <rect y="180" width="400" height="9" fill="#9a9384" />
      <g fill="#6b5330">
        <rect x="10" y="184" width="9" height="6" />
        <rect x="36" y="184" width="9" height="6" />
        <rect x="62" y="184" width="9" height="6" />
        <rect x="88" y="184" width="9" height="6" />
        <rect x="288" y="184" width="9" height="6" />
        <rect x="314" y="184" width="9" height="6" />
        <rect x="340" y="184" width="9" height="6" />
        <rect x="366" y="184" width="9" height="6" />
      </g>
      <rect y="183" width="400" height="2.6" fill="#5f6b72" />
      <rect y="190" width="400" height="2.6" fill="#8a949a" />

      {/* 架線柱。 */}
      <g fill="#4f555c">
        <rect x="36" y="120" width="5" height="62" />
        <rect x="26" y="118" width="26" height="4" />
        <rect x="252" y="126" width="5" height="56" />
        <rect x="242" y="124" width="26" height="4" />
      </g>
      <path d="M38,124h216" stroke="#4f555c" strokeWidth="1.4" fill="none" />

      {/* **線路をふさいだ岩塊。**角ばった面で、人の背より高く描く。 */}
      <g className="chs-slab">
        <path d="M150,188l6,-52l38,-16l52,10l10,58z" fill="#6f7680" />
        <path d="M150,188l6,-52l38,-16l4,68z" fill="#868d97" />
        <path d="M194,120l52,10l10,58l-58,-2z" fill="#5a616a" />
        <g stroke="#454b52" strokeWidth="2" opacity="0.7" fill="none">
          <path d="M170,132l8,50M214,126l6,58M228,140l22,6" />
        </g>
        <path d="M156,136l30,-14l6,10l-32,12z" fill="#a2a8b0" opacity="0.6" />
      </g>

      {/* 岩の根元の土埃。 */}
      <g className="chs-dust" fill="#c9c4b4" opacity="0.5">
        <ellipse cx="150" cy="188" rx="46" ry="10" />
        <ellipse cx="240" cy="190" rx="34" ry="8" />
      </g>

      {/* 落ち続ける小石。傷跡の下から3組が時間をずらして落ちる。 */}
      <g className="chs-peb1" fill="#8f959e">
        <circle cx="120" cy="92" r="3.4" />
        <circle cx="132" cy="102" r="2.4" />
        <circle cx="112" cy="110" r="2" />
      </g>
      <g className="chs-peb2" fill="#7f8590">
        <circle cx="138" cy="86" r="2.6" />
        <circle cx="126" cy="98" r="3" />
      </g>
      <g className="chs-peb3" fill="#a2a8b0">
        <circle cx="108" cy="80" r="2.2" />
        <circle cx="118" cy="96" r="2.8" />
        <circle cx="130" cy="112" r="2" />
      </g>

      {/* 止まった赤い列車(右端)。運転士は見に来ている。 */}
      <g>
        <rect x="330" y="140" width="70" height="42" rx="4" fill="#c8102e" />
        <rect x="330" y="140" width="70" height="5" rx="2.5" fill="#f2ede0" opacity="0.55" />
        <g fill="#cfe4f0">
          <rect x="340" y="150" width="16" height="12" />
          <rect x="364" y="150" width="16" height="12" />
        </g>
        <rect x="332" y="172" width="66" height="5" fill="#3f3a34" />
        <g fill="#2f3338">
          <circle cx="348" cy="181" r="5" />
          <circle cx="384" cy="181" r="5" />
        </g>
        <rect x="330" y="152" width="5" height="6" rx="1.4" fill="#f5d06a" />
      </g>

      {/* 線路脇の信号。**赤が点滅する。** */}
      <g>
        <rect x="290" y="148" width="5" height="34" fill="#4a4f56" />
        <rect x="284" y="132" width="17" height="20" rx="3" fill="#3f454c" />
        <circle cx="292.5" cy="146" r="4" fill="#4f5a44" />
        <circle className="chs-signal" cx="292.5" cy="138" r="4" fill="#e8443f" />
      </g>

      {/* 双眼鏡で斜面を見上げる保線員。橙の作業服。 */}
      <g transform="translate(84,0)">
        <ellipse cx="0" cy="186" rx="13" ry="4" fill="#000" opacity="0.18" />
        <path d="M-5,186l-2,-22h14l-2,22z" fill="#3f4450" />
        <path d="M-9,164q0,-18 9,-18q9,0 9,18z" fill="#f28c1e" />
        <path d="M-9,156h18" stroke="#f6efe2" strokeWidth="3" fill="none" />
        <circle cx="0" cy="139" r="8" fill="#e0b48a" />
        <path d="M-9,137q0,-9 9,-9q9,0 9,9z" fill="#f5d06a" />
        <g className="chs-look">
          <path d="M-2,150l-14,-14" stroke="#e0b48a" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M4,150l-8,-16" stroke="#e0b48a" strokeWidth="5" strokeLinecap="round" fill="none" />
          <rect x="-22" y="130" width="16" height="9" rx="2" fill="#3f454c" />
          <rect x="-24" y="132" width="5" height="5" fill="#6f7880" />
        </g>
      </g>

      <style>{`
        .chs-peb1, .chs-peb2, .chs-peb3 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
        }
        .chs-peb1 { animation: chs-fall 2.4s ease-in infinite; }
        .chs-peb2 { animation: chs-fall 2.4s ease-in -0.9s infinite; }
        .chs-peb3 { animation: chs-fall 2.4s ease-in -1.7s infinite; }
        @keyframes chs-fall {
          0%   { transform: translate(0, -10px); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translate(14px, 78px); opacity: 0; }
        }
        .chs-dust {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: chs-puff 3.6s ease-in-out infinite;
        }
        @keyframes chs-puff {
          0%, 100% { transform: scale(0.9, 0.7); opacity: 0.28; }
          45%      { transform: scale(1.12, 1.2); opacity: 0.55; }
        }
        .chs-slab {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: chs-settle 5.2s ease-in-out infinite;
        }
        @keyframes chs-settle {
          0%, 84%, 100% { transform: translate(0, 0) rotate(0deg); }
          88%  { transform: translate(-1px, 1px) rotate(-0.6deg); }
          93%  { transform: translate(1px, 0) rotate(0.4deg); }
        }
        .chs-look {
          transform-box: fill-box;
          transform-origin: 90% 90%;
          animation: chs-scan 4.4s ease-in-out infinite;
        }
        @keyframes chs-scan {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-9deg); }
        }
        .chs-signal { animation: chs-blink 1.3s steps(1, end) infinite; }
        @keyframes chs-blink {
          0%, 49%   { opacity: 1; }
          50%, 100% { opacity: 0.22; }
        }
        @media (prefers-reduced-motion: reduce) {
          .chs-peb1, .chs-peb2, .chs-peb3,
          .chs-dust, .chs-slab, .chs-look, .chs-signal { animation: none; }
          .chs-peb1 { transform: translate(7px, 34px); }
          .chs-peb2 { transform: translate(10px, 52px); }
          .chs-peb3 { transform: translate(4px, 20px); }
        }
      `}</style>
    </svg>
  );
}
