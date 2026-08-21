/**
 * 職場のサッカー賭けに負ける(payOthers)。
 *
 * 本文の芯は「職場のみんなでラ・ロハの試合にポージャ(賭け金)を出し合い、
 * 負けた側は月曜の朝、みんなの前で払った」。
 *
 * 構図表:昼 / オフィス休憩室の近景 / 主役は**手から手へ渡る札** /
 * 人3(払う1人・受け取る1人・にやにや見ている1人)/ 地色は明るいオフィス。
 *
 * 動くのは**差し出される札・受け取る側の手・テレビの中のボール・
 * 勝った側の弾む肩**。止めた状態でも、札が手の上にあり、payOthers の
 * 「みんなに払う」が並んだ3人で分かる。
 */
export function ChilePollaPerdida() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 明るい休憩室 */}
      <rect width="400" height="210" fill="#e8e0cc" />
      <rect width="400" height="8" fill="#d8ccb0" />
      <rect y="150" width="400" height="60" fill="#9a8e78" />
      <path d="M0,150h400v4H0z" fill="#7f7462" />

      {/* 壁のテレビ。昨夜の試合のリプレイ。 */}
      <g>
        <rect x="20" y="24" width="96" height="60" rx="3" fill="#33302c" />
        <rect x="25" y="29" width="86" height="50" fill="#4f9a5f" />
        <path d="M25,54h86" stroke="#e8ecf0" strokeWidth="1.6" opacity="0.8" fill="none" />
        <circle cx="68" cy="54" r="9" fill="none" stroke="#e8ecf0" strokeWidth="1.6" opacity="0.8" />
        <rect x="25" y="29" width="86" height="8" fill="#3f7a4c" />
        {/* スコアボード(数字は描かない:色の帯だけ) */}
        <rect x="30" y="32" width="14" height="4" fill="#c8452f" />
        <rect x="48" y="32" width="14" height="4" fill="#f2f4f6" />
        <g className="cpp-ball">
          <circle cx="0" cy="0" r="3.4" fill="#f2f4f6" />
        </g>
        <g fill="#e8ecf0" opacity="0.9">
          <rect x="34" y="64" width="4" height="9" />
          <rect x="52" y="60" width="4" height="13" />
          <rect x="88" y="62" width="4" height="11" />
        </g>
      </g>

      {/* ホワイトボード:対戦表(文字なし、色の丸とライン) */}
      <g>
        <rect x="288" y="22" width="92" height="64" rx="3" fill="#f6f2e8" />
        <rect x="284" y="18" width="100" height="6" rx="2" fill="#b8a888" />
        <g stroke="#8a8478" strokeWidth="1.6" fill="none">
          <path d="M296,38h56M296,52h64M296,66h48" />
        </g>
        <g fill="#c8452f"><circle cx="366" cy="38" r="4" /></g>
        <g fill="#3f5f9f"><circle cx="370" cy="52" r="4" /></g>
        <g fill="#f5b31c"><circle cx="356" cy="66" r="4" /></g>
        <path d="M292,30l70,44M362,30l-70,44" stroke="#c8452f" strokeWidth="2.4" opacity="0.55" fill="none" />
      </g>

      {/* コーヒーの机 */}
      <rect x="150" y="120" width="110" height="8" rx="2" fill="#8a6f4a" />
      <rect x="158" y="128" width="7" height="32" fill="#7a552f" />
      <rect x="246" y="128" width="7" height="32" fill="#7a552f" />
      <g>
        <rect x="176" y="108" width="12" height="12" rx="2" fill="#c8452f" />
        <path d="M188,111q6,0 6,5q0,4 -6,3" stroke="#c8452f" strokeWidth="2" fill="none" />
        <path className="cpp-steam" d="M182,104q-3,-5 0,-9" stroke="#b8b0a0" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>

      {/* 払う人(左)。うつむき、札を差し出す。 */}
      <g>
        <ellipse cx="140" cy="202" rx="16" ry="4.4" fill="#000" opacity="0.16" />
        <g fill="#3f3428">
          <rect x="133" y="184" width="6" height="18" rx="2" />
          <rect x="143" y="184" width="6" height="18" rx="2" />
        </g>
        <path d="M130,186l4,-34h13l4,34z" fill="#e8443f" />
        <circle cx="140" cy="144" r="8.4" fill="#c98f5f" />
        {/* うつむいた口 */}
        <path d="M136,149q4,-2.6 8,0" stroke="#33302c" strokeWidth="1.4" fill="none" />
        <path d="M134,141q2,-2 5,-1M142,140q3,-1 5,1" stroke="#33302c" strokeWidth="1.2" fill="none" />
        <g className="cpp-pay">
          <path d="M148,160l22,8" stroke="#e8443f" strokeWidth="5.4" strokeLinecap="round" fill="none" />
          {/* 差し出される札 */}
          <g transform="rotate(-12 178 166)">
            <rect x="168" y="160" width="20" height="11" rx="1.6" fill="#7fae8a" />
            <circle cx="178" cy="165.5" r="3" fill="#5f8f6a" />
            <rect x="170" y="162" width="4" height="7" fill="#5f8f6a" opacity="0.7" />
          </g>
        </g>
      </g>

      {/* 受け取る人(中央右)。手のひらを出して待つ。 */}
      <g>
        <ellipse cx="236" cy="204" rx="16" ry="4.4" fill="#000" opacity="0.16" />
        <g fill="#2f3a48">
          <rect x="229" y="186" width="6" height="18" rx="2" />
          <rect x="239" y="186" width="6" height="18" rx="2" />
        </g>
        <path d="M226,188l4,-34h13l4,34z" fill="#3f5f9f" />
        <circle cx="236" cy="146" r="8.4" fill="#8a6a4a" />
        <path d="M231,148q5,4 10,0" stroke="#33302c" strokeWidth="1.4" fill="none" />
        <g className="cpp-take">
          <path d="M228,162l-20,8" stroke="#3f5f9f" strokeWidth="5.4" strokeLinecap="round" fill="none" />
          <circle cx="206" cy="171" r="4" fill="#8a6a4a" />
        </g>
      </g>

      {/* 勝って肩を揺らして見ている人(右端) */}
      <g className="cpp-cheer">
        <ellipse cx="318" cy="206" rx="16" ry="4.4" fill="#000" opacity="0.16" />
        <g fill="#3f3428">
          <rect x="311" y="188" width="6" height="18" rx="2" />
          <rect x="321" y="188" width="6" height="18" rx="2" />
        </g>
        <path d="M308,190l4,-34h13l4,34z" fill="#f5b31c" />
        <circle cx="318" cy="148" r="8.4" fill="#c98f5f" />
        <path d="M313,150q5,4.6 10,0" stroke="#33302c" strokeWidth="1.6" fill="none" />
        <path d="M326,164l12,-12" stroke="#f5b31c" strokeWidth="5.4" strokeLinecap="round" fill="none" />
        {/* 手にした自分の取り分 */}
        <g transform="rotate(20 342 150)">
          <rect x="334" y="146" width="17" height="9" rx="1.4" fill="#7fae8a" />
          <circle cx="342" cy="150.5" r="2.4" fill="#5f8f6a" />
        </g>
      </g>

      {/* 床に落ちた賭けのメモ(文字なし・チェック柄) */}
      <g transform="rotate(-14 100 192)">
        <rect x="90" y="186" width="20" height="13" rx="1.6" fill="#f6f2e8" />
        <path d="M93,190h14M93,193h14M93,196h9" stroke="#b0a890" strokeWidth="1.2" fill="none" />
        <path d="M104,195l3,3l5,-6" stroke="#c8452f" strokeWidth="1.6" fill="none" />
      </g>

      <style>{`
        .cpp-pay {
          transform-box: fill-box;
          transform-origin: 0% 20%;
          animation: cpp-offer 3.4s ease-in-out infinite;
        }
        @keyframes cpp-offer {
          0%, 20% { transform: rotate(14deg) translateY(4px); }
          55%, 85% { transform: rotate(0deg) translateY(0); }
          100% { transform: rotate(14deg) translateY(4px); }
        }
        .cpp-take {
          transform-box: fill-box;
          transform-origin: 100% 20%;
          animation: cpp-open 3.4s ease-in-out infinite;
        }
        @keyframes cpp-open {
          0%, 20% { transform: rotate(-8deg); }
          55%, 85% { transform: rotate(0deg); }
          100% { transform: rotate(-8deg); }
        }
        .cpp-cheer {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cpp-bounce 1.7s ease-in-out infinite;
        }
        @keyframes cpp-bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-2deg); }
        }
        .cpp-ball { animation: cpp-kick 3.4s ease-in-out infinite; }
        @keyframes cpp-kick {
          0%, 100% { transform: translate(36px, 64px); }
          45% { transform: translate(70px, 46px); }
          70% { transform: translate(94px, 60px); }
        }
        .cpp-steam { animation: cpp-rise 2.6s ease-in-out infinite; }
        @keyframes cpp-rise {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.85; transform: translateY(-3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cpp-pay, .cpp-take, .cpp-cheer, .cpp-ball, .cpp-steam { animation: none; }
          /* 札は相手の手の上に渡りきった位置で止める。 */
          .cpp-ball { transform: translate(70px, 46px); }
        }
      `}</style>
    </svg>
  );
}
