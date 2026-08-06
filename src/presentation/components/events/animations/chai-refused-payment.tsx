/**
 * チャイ屋が代金を受け取らない。
 *
 * その日の最初の客なので縁起物として一杯ただ。素焼きの器へ高い位置から注ぎ、
 * 差し出した硬貨は手のひらで押し返される。飲み終えた器は地面で割られる。
 */
export function ChaiRefusedPayment() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 明け方の街 */}
      <rect width="400" height="210" fill="#f0b96a" />
      <circle cx="352" cy="46" r="21" fill="#f5b31c" />

      {/* 通りの建物 */}
      <g fill="#b58a6a">
        <rect x="-4" y="86" width="72" height="66" />
        <rect x="72" y="96" width="60" height="56" />
        <rect x="196" y="90" width="66" height="62" />
        <rect x="268" y="102" width="54" height="50" />
      </g>
      <g fill="#6b4629">
        <rect x="10" y="102" width="18" height="22" />
        <rect x="40" y="102" width="18" height="22" />
        <rect x="88" y="110" width="16" height="20" />
        <rect x="212" y="104" width="18" height="22" />
        <rect x="280" y="116" width="16" height="18" />
      </g>
      {/* ドーム */}
      <g transform="translate(348,152)">
        <rect x="-30" y="-38" width="60" height="38" fill="#c9a877" />
        <path d="M-26,-38 A26,26 0 0,1 26,-38z" fill="#e0c294" />
        <rect x="-2" y="-78" width="4" height="14" fill="#c98b3f" />
        <circle cx="0" cy="-80" r="4" fill="#c98b3f" />
      </g>
      {/* 電線 */}
      <rect x="296" y="18" width="5" height="94" fill="#6b4629" />
      <rect x="286" y="22" width="26" height="4" fill="#6b4629" />
      <g stroke="#4a3423" strokeWidth="1.6" fill="none">
        <path d="M0,28 Q150,42 296,22" />
        <path d="M0,38 Q150,50 296,30" />
      </g>
      <g fill="#3b2f2a">
        <path d="M110,36 l6,-4 l6,4 l-3,3 h-6z" />
        <path d="M204,32 l6,-4 l6,4 l-3,3 h-6z" />
      </g>

      {/* 地面 */}
      <rect y="152" width="400" height="58" fill="#8a6a4a" />
      <rect y="152" width="400" height="5" fill="#6b4f34" />

      {/* 屋台の奥の暗がり */}
      <rect x="42" y="64" width="230" height="88" fill="#6b4a30" />
      <rect x="42" y="64" width="230" height="12" fill="#553a24" />

      {/* 屋台の柱と日除け */}
      <rect x="46" y="66" width="7" height="126" fill="#6b4629" />
      <rect x="262" y="66" width="7" height="126" fill="#6b4629" />
      <g>
        <rect x="38" y="52" width="238" height="18" fill="#e8443f" />
        <g fill="#f0e2c4">
          <rect x="60" y="52" width="20" height="18" />
          <rect x="104" y="52" width="20" height="18" />
          <rect x="148" y="52" width="20" height="18" />
          <rect x="192" y="52" width="20" height="18" />
          <rect x="236" y="52" width="20" height="18" />
        </g>
        <path
          d="M38,70 l12,10 l12,-10 l12,10 l12,-10 l12,10 l12,-10 l12,10 l12,-10 l12,10 l12,-10 l12,10 l12,-10 l12,10 l12,-10 l12,10 l12,-10 l12,10 l12,-10 v-4 h-238z"
          fill="#c9382f"
        />
      </g>

      {/* チャイ屋の主人 */}
      <g transform="translate(154,166)">
        <rect x="-17" y="-56" width="34" height="48" rx="9" fill="#f0e2c4" />
        <path d="M-17,-40 L17,-40" stroke="#c98b3f" strokeWidth="4" />
        <circle cx="0" cy="-68" r="12" fill="#f6efe2" />
        <path d="M-12,-72 Q0,-86 12,-72 Q0,-79 -12,-72z" fill="#3b2f2a" />
        <rect x="-6" y="-63" width="12" height="3.5" rx="1.5" fill="#3b2f2a" />
        {/* 高く掲げた腕 */}
        <path
          d="M-15,-50 L-34,-66 L-58,-98"
          stroke="#f0e2c4"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="-60" cy="-100" r="6" fill="#f6efe2" />
        {/* 受け取らない手 */}
        <g className="cw-palm">
          <rect x="0" y="-5" width="48" height="10" rx="5" fill="#f0e2c4" />
          <rect x="42" y="-11" width="14" height="22" rx="6" fill="#f6efe2" />
          <g fill="#f6efe2">
            <rect x="52" y="-10" width="8" height="4.5" rx="2" />
            <rect x="52" y="-4" width="9" height="4.5" rx="2" />
            <rect x="52" y="2" width="8" height="4.5" rx="2" />
          </g>
        </g>
      </g>

      {/* 注ぐ薬缶 */}
      <g transform="translate(110,76) rotate(28) scale(0.85)">
        <g className="cw-kettle">
          <path d="M-16,-8 L16,-8 L12,10 L-12,10z" fill="#b9c2c9" />
          <ellipse cx="0" cy="-8" rx="16" ry="4.5" fill="#d6dde2" />
          <rect x="-3" y="-15" width="6" height="7" rx="2" fill="#8a9099" />
          <path d="M14,-5 L32,4 L29,10 L12,4z" fill="#b9c2c9" />
          <path d="M-16,-6 q-13,9 -3,17" stroke="#8a9099" strokeWidth="3.5" fill="none" />
        </g>
      </g>

      {/* 屋台の台 */}
      <rect x="52" y="146" width="212" height="46" fill="#8a5a30" />
      <rect x="48" y="138" width="220" height="9" rx="2" fill="#c9a877" />
      <g fill="#6b4629">
        <rect x="60" y="154" width="8" height="34" />
        <rect x="130" y="154" width="8" height="34" />
        <rect x="200" y="154" width="8" height="34" />
        <rect x="248" y="154" width="8" height="34" />
      </g>

      {/* 竈と鍋 */}
      <rect x="58" y="118" width="38" height="20" fill="#4a4f57" />
      <rect x="66" y="124" width="22" height="14" fill="#22252b" />
      <path className="cw-flame" d="M77,138 q8,-10 0,-18 q-8,8 0,18z" fill="#f5b31c" />
      <rect x="52" y="104" width="50" height="15" rx="4" fill="#b9c2c9" />
      <ellipse cx="77" cy="104" rx="25" ry="5" fill="#8a9099" />

      {/* 注がれるチャイ */}
      <path d="M133,93 Q136,110 131,126" stroke="#c9772f" strokeWidth="5" fill="none" />
      <path
        className="cw-stream"
        d="M133,93 Q136,110 131,126"
        stroke="#f0c489"
        strokeWidth="5"
        strokeDasharray="7 9"
        fill="none"
      />
      <path d="M120,124 L142,124 L138,140 L124,140z" fill="#b5563c" />
      <ellipse cx="131" cy="124" rx="11" ry="3.5" fill="#8f3f28" />

      {/* 湯気 */}
      <g stroke="#f6efe2" strokeWidth="3" fill="none" strokeLinecap="round">
        <path className="cw-steam-a" d="M126,120 q7,-8 0,-15 q-7,-7 0,-14" />
        <path className="cw-steam-b" d="M70,102 q7,-8 0,-15 q-7,-7 0,-14" />
      </g>

      {/* 割られた素焼きの器 */}
      <g transform="translate(196,200)">
        <ellipse cx="0" cy="2" rx="30" ry="6" fill="#6b4f34" opacity="0.5" />
        <g fill="#b5563c">
          <path d="M-24,0 L-14,-8 L-8,0z" />
          <path d="M-6,1 L4,-9 L10,1z" />
          <path d="M12,0 L22,-6 L26,1z" />
          <path d="M-16,3 L-6,6 L-14,8z" />
          <path d="M6,4 L18,6 L8,9z" />
        </g>
      </g>

      {/* 硬貨を差し出す客 */}
      <g transform="translate(316,192)">
        <rect x="-11" y="-30" width="9" height="30" fill="#4a5b6b" />
        <rect x="3" y="-30" width="9" height="30" fill="#4a5b6b" />
        <rect x="-15" y="-70" width="30" height="42" rx="9" fill="#5b8fe8" />
        <circle cx="-2" cy="-80" r="12" fill="#f6efe2" />
        <path d="M-14,-83 Q-2,-97 10,-83 Q-2,-90 -14,-83z" fill="#3b2f2a" />
        <g className="cw-offer">
          <rect x="-52" y="-5" width="52" height="10" rx="5" fill="#5b8fe8" />
          <circle cx="-54" cy="0" r="7" fill="#f6efe2" />
          <circle cx="-62" cy="-2" r="7" fill="#f5b31c" />
          <circle cx="-62" cy="-2" r="4" fill="#d99a12" />
        </g>
      </g>

      <style>{`
        .cw-palm {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          transform: translate(16px, -48px) rotate(-2deg);
          animation: cw-refuse 2.8s ease-in-out infinite;
        }
        .cw-offer {
          transform: translate(-6px, -64px);
          animation: cw-push 2.8s ease-in-out infinite;
        }
        .cw-kettle {
          transform-box: fill-box;
          transform-origin: 10% 90%;
          animation: cw-tip 3.4s ease-in-out infinite;
        }
        .cw-stream {
          animation: cw-flow 0.6s linear infinite;
        }
        .cw-flame {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cw-lick 1.1s ease-in-out infinite;
        }
        .cw-steam-a, .cw-steam-b {
          opacity: 0.55;
          animation: cw-waft 3s ease-out infinite;
        }
        .cw-steam-b { animation-delay: 1.4s; }
        @keyframes cw-refuse {
          0%, 100% { transform: translate(16px, -48px) rotate(-2deg); }
          38% { transform: translate(22px, -49px) rotate(-5deg); }
          56% { transform: translate(18px, -48px) rotate(-2deg); }
        }
        @keyframes cw-push {
          0%, 100% { transform: translate(-6px, -64px); }
          34% { transform: translate(-22px, -64px); }
          52% { transform: translate(4px, -62px); }
          72% { transform: translate(-6px, -64px); }
        }
        @keyframes cw-tip {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes cw-flow {
          to { stroke-dashoffset: -16; }
        }
        @keyframes cw-lick {
          0%, 100% { transform: scale(1, 1); opacity: 0.95; }
          50% { transform: scale(0.8, 1.2); opacity: 1; }
        }
        @keyframes cw-waft {
          0% { transform: translate(0, 4px) scale(0.7); opacity: 0; }
          30% { opacity: 0.6; }
          100% { transform: translate(-6px, -26px) scale(1.2); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cw-palm, .cw-offer, .cw-kettle, .cw-stream, .cw-flame,
          .cw-steam-a, .cw-steam-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
