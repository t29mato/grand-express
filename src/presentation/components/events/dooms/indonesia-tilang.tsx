/**
 * 交通取締りで切符を切られる(ティランン)。警官が手を上げてバイクを止め、
 * バイクは急ブレーキで止まる。警官はもう片方の手に切符の紙を持って振る。
 *
 * 動くのはバイクの走行・急停止と、切符の紙の振り、警官の腕だけ。
 */
export function IndonesiaTilang() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼の空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="90" fill="#cfe4f0" />

      {/* 遠景の低い建物。 */}
      <path d="M0,110h60v-24h30v24h50v-16h40v16h60v-20h30v20h130v20H0z" fill="#8a8f95" opacity="0.7" />

      {/* 道路。 */}
      <rect y="120" width="400" height="90" fill="#4a4a52" />
      <g stroke="#e8dcc0" strokeWidth="4" strokeDasharray="26 20">
        <path d="M0,164h400" />
      </g>

      {/* 警官(道端に立つ)。 */}
      <g strokeLinejoin="round">
        <rect x="326" y="150" width="16" height="26" rx="3" fill="#3a5f3a" stroke="#20364a" strokeWidth="1.6" />
        <circle cx="334" cy="144" r="9" fill="#c9a877" stroke="#20364a" strokeWidth="1.6" />
        <path d="M325,140a9,7 0 0 1 18,0z" fill="#20364a" />
        <rect x="322" y="176" width="8" height="20" fill="#20364a" />
        <rect x="338" y="176" width="8" height="20" fill="#20364a" />
        {/* 上げた腕(止まれの合図)。 */}
        <g className="idn-tl-arm" transform="translate(334,152)">
          <path d="M0,4 L-2,-18" stroke="#c9a877" strokeWidth="6" strokeLinecap="round" />
          <circle cx="-2" cy="-20" r="4" fill="#c9a877" />
        </g>
      </g>

      {/* バイク(左から来て急停止する)。 */}
      <g className="idn-tl-bike">
        <path d="M40,196 L70,196 L74,180 L58,180 L52,188 L44,188z" fill="#e8443f" stroke="#20364a" strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="46" cy="198" r="8" fill="#241a10" />
        <circle cx="70" cy="198" r="8" fill="#241a10" />
        <circle cx="58" cy="176" r="7" fill="#f6efe2" stroke="#20364a" strokeWidth="1.6" />
        <rect x="52" y="182" width="10" height="8" fill="#3a5f3a" />
      </g>

      {/* 急停止のスキッド跡(バイクが止まったあとに現れる)。 */}
      <path className="idn-tl-skid" d="M60,206 q20,-2 40,0" fill="none" stroke="#2a2a30" strokeWidth="3" strokeLinecap="round" />

      {/* 切符の紙(警官の手からバイクの方へ差し出される)。 */}
      <g className="idn-tl-ticket">
        <rect x="280" y="130" width="26" height="18" rx="1.5" fill="#f6efe2" stroke="#20364a" strokeWidth="1.6" />
        <line x1="284" y1="136" x2="302" y2="136" stroke="#8a8f95" strokeWidth="1.4" />
        <line x1="284" y1="141" x2="298" y2="141" stroke="#8a8f95" strokeWidth="1.4" />
      </g>

      <style>{`
        .idn-tl-bike {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: idn-tl-drive 3.4s ease-in-out infinite;
        }
        @keyframes idn-tl-drive {
          0% { transform: translateX(-60px); }
          45% { transform: translateX(190px); }
          55% { transform: translateX(200px); }
          100% { transform: translateX(200px); }
        }
        .idn-tl-skid {
          opacity: 0;
          animation: idn-tl-skidshow 3.4s ease-in-out infinite;
        }
        @keyframes idn-tl-skidshow {
          0% { opacity: 0; }
          44% { opacity: 0; }
          48% { opacity: 0.8; }
          100% { opacity: 0.8; }
        }
        .idn-tl-arm {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: idn-tl-wave 1.4s ease-in-out infinite;
        }
        @keyframes idn-tl-wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-12deg); }
        }
        .idn-tl-ticket {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          opacity: 0;
          animation: idn-tl-showticket 3.4s ease-in-out infinite;
        }
        @keyframes idn-tl-showticket {
          0% { opacity: 0; transform: translateY(0); }
          55% { opacity: 0; transform: translateY(0); }
          65% { opacity: 1; transform: translateY(-4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .idn-tl-bike { animation: none; transform: translateX(200px); }
          .idn-tl-skid { animation: none; opacity: 0.8; }
          .idn-tl-arm { animation: none; }
          .idn-tl-ticket { animation: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
