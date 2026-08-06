/**
 * 12月・師走。
 *
 * 「師(僧)さえ走る」月。灯りの消えない商店街を袈裟の僧が白い息で駆け抜け、
 * 時計の針が回り、店先にはもう門松が立っている。
 */
export function Japan08() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 年の瀬の夕闇 */}
      <rect width="400" height="210" fill="#26324a" />

      {/* 灯りの消えない商店街 */}
      <g>
        <g>
          <rect x="0" y="72" width="94" height="90" fill="#3a4257" />
          <rect x="0" y="72" width="94" height="11" fill="#a52f2b" />
          <g fill="#e8c9c4">
            <rect x="6" y="72" width="9" height="11" />
            <rect x="30" y="72" width="9" height="11" />
            <rect x="54" y="72" width="9" height="11" />
            <rect x="78" y="72" width="9" height="11" />
          </g>
          <rect className="j08-lit" x="8" y="94" width="78" height="44" fill="#f5b31c" />
          <g fill="#3a4257">
            <rect x="34" y="94" width="4" height="44" />
            <rect x="58" y="94" width="4" height="44" />
          </g>
          <rect x="30" y="138" width="34" height="24" fill="#232b3d" />
        </g>
        <g>
          <rect x="98" y="66" width="94" height="96" fill="#333b50" />
          <rect x="98" y="66" width="94" height="11" fill="#2f4a6b" />
          <g fill="#cfe0ee">
            <rect x="104" y="66" width="9" height="11" />
            <rect x="128" y="66" width="9" height="11" />
            <rect x="152" y="66" width="9" height="11" />
            <rect x="176" y="66" width="9" height="11" />
          </g>
          <rect className="j08-lit j08-lit2" x="106" y="90" width="78" height="46" fill="#f5d17c" />
          <g fill="#333b50">
            <rect x="132" y="90" width="4" height="46" />
            <rect x="156" y="90" width="4" height="46" />
          </g>
          <rect x="128" y="136" width="34" height="26" fill="#232b3d" />
        </g>
        <g>
          <rect x="196" y="76" width="94" height="86" fill="#3a4257" />
          <rect x="196" y="76" width="94" height="11" fill="#8a6b3e" />
          <g fill="#e6d9bc">
            <rect x="202" y="76" width="9" height="11" />
            <rect x="226" y="76" width="9" height="11" />
            <rect x="250" y="76" width="9" height="11" />
            <rect x="274" y="76" width="9" height="11" />
          </g>
          <rect className="j08-lit j08-lit3" x="204" y="96" width="78" height="42" fill="#f5b31c" />
          <g fill="#3a4257">
            <rect x="230" y="96" width="4" height="42" />
            <rect x="254" y="96" width="4" height="42" />
          </g>
          <rect x="226" y="138" width="34" height="24" fill="#232b3d" />
        </g>
        <g>
          <rect x="294" y="70" width="106" height="92" fill="#333b50" />
          <rect x="294" y="70" width="106" height="11" fill="#4a7f45" />
          <g fill="#d8ecd0">
            <rect x="300" y="70" width="9" height="11" />
            <rect x="324" y="70" width="9" height="11" />
            <rect x="348" y="70" width="9" height="11" />
            <rect x="372" y="70" width="9" height="11" />
          </g>
          <rect className="j08-lit j08-lit4" x="302" y="92" width="90" height="44" fill="#f5d17c" />
          <g fill="#333b50">
            <rect x="332" y="92" width="4" height="44" />
            <rect x="360" y="92" width="4" height="44" />
          </g>
          <rect x="330" y="136" width="34" height="26" fill="#232b3d" />
        </g>
      </g>

      {/* 通り */}
      <rect y="160" width="400" height="50" fill="#333c4e" />
      <rect y="160" width="400" height="4" fill="#4a5468" />
      <g fill="#f5b31c" opacity="0.14">
        <rect x="8" y="164" width="78" height="42" />
        <rect x="204" y="164" width="78" height="42" />
      </g>

      {/* 時計 */}
      <rect x="346" y="96" width="8" height="70" fill="#6d6f76" />
      <circle cx="350" cy="74" r="23" fill="#f8f4ea" />
      <circle cx="350" cy="74" r="23" fill="none" stroke="#4a5468" strokeWidth="4" />
      <g fill="#4a5468">
        <rect x="349" y="55" width="2" height="5" />
        <rect x="349" y="88" width="2" height="5" />
        <rect x="331" y="73" width="5" height="2" />
        <rect x="364" y="73" width="5" height="2" />
      </g>
      <g transform="translate(350,74)">
        <rect className="j08-hour" x="-2.5" y="-11" width="5" height="11" rx="2" fill="#2a3142" />
        <rect className="j08-minute" x="-2" y="-18" width="4" height="18" rx="2" fill="#2a3142" />
        <circle cx="0" cy="0" r="3" fill="#2a3142" />
      </g>

      {/* 走る僧 */}
      <g transform="translate(168,198)">
        <g className="j08-monk">
          <g className="j08-robe-tail">
            <path d="M10,-52 Q34,-46 48,-26 Q32,-18 14,-24 Z" fill="#3a4759" />
          </g>
          <g transform="translate(-4,-30)">
            <g className="j08-leg">
              <rect x="-5" y="0" width="9" height="24" rx="4" fill="#e8c9a0" />
              <rect x="-9" y="20" width="16" height="6" rx="3" fill="#8a6b3e" />
            </g>
          </g>
          <g transform="translate(8,-30)">
            <g className="j08-leg j08-leg2">
              <rect x="-5" y="0" width="9" height="24" rx="4" fill="#e8c9a0" />
              <rect x="-9" y="20" width="16" height="6" rx="3" fill="#8a6b3e" />
            </g>
          </g>
          <path d="M-16,-26 L-12,-62 Q2,-70 14,-62 L20,-26 Z" fill="#2f3a4a" />
          <rect x="-16" y="-58" width="34" height="10" rx="2" fill="#f5b31c" transform="rotate(20 1 -53)" />
          <circle cx="-2" cy="-74" r="12" fill="#e8c9a0" />
          <circle cx="-13" cy="-74" r="3" fill="#dbb98c" />
          <circle cx="-8" cy="-75" r="1.8" fill="#2a2233" />
          <g transform="translate(-12,-60)">
            <g className="j08-arm">
              <rect x="-6" y="-4" width="9" height="26" rx="4" fill="#2f3a4a" />
              <circle cx="-2" cy="21" r="5" fill="#e8c9a0" />
            </g>
          </g>
          <g transform="translate(14,-60)">
            <g className="j08-arm j08-arm2">
              <rect x="-4" y="-4" width="9" height="26" rx="4" fill="#2f3a4a" />
              <circle cx="0" cy="21" r="5" fill="#e8c9a0" />
            </g>
          </g>
        </g>
        {/* 白い息 */}
        <ellipse className="j08-breath" cx="-20" cy="-78" rx="7" ry="5" fill="#f2f6fa" />
        <ellipse className="j08-breath j08-breath2" cx="-30" cy="-82" rx="5" ry="4" fill="#f2f6fa" />
      </g>

      {/* 走る勢いの線 */}
      <g stroke="#cfe0ee" strokeWidth="3" strokeLinecap="round" opacity="0.4">
        <path className="j08-speed" d="M196,140 l30,0" />
        <path className="j08-speed j08-speed2" d="M204,158 l24,0" />
        <path className="j08-speed j08-speed3" d="M198,176 l34,0" />
      </g>

      {/* 急ぐ人影 */}
      <g fill="#232b3d">
        <g className="j08-hurry">
          <circle cx="258" cy="150" r="8" />
          <path d="M246,178 L248,158 Q258,152 268,158 L270,178 Z" />
          <rect x="250" y="176" width="7" height="14" rx="3" />
          <rect x="260" y="176" width="7" height="14" rx="3" />
        </g>
        <g className="j08-hurry j08-hurry2">
          <circle cx="306" cy="154" r="7" />
          <path d="M296,180 L298,162 Q306,157 314,162 L316,180 Z" />
          <rect x="299" y="178" width="6" height="12" rx="3" />
          <rect x="308" y="178" width="6" height="12" rx="3" />
        </g>
      </g>

      {/* 門松 */}
      <g transform="translate(48,200)">
        <g fill="#4a7f45">
          <path d="M-16,-20 L-16,-54 L-7,-61 L-7,-20 Z" />
          <path d="M-5,-20 L-5,-64 L4,-72 L4,-20 Z" />
          <path d="M6,-20 L6,-48 L15,-55 L15,-20 Z" />
        </g>
        <g fill="#d5e8b8">
          <path d="M-16,-54 L-7,-61 L-7,-57 L-16,-50 Z" />
          <path d="M-5,-64 L4,-72 L4,-68 L-5,-60 Z" />
          <path d="M6,-48 L15,-55 L15,-51 L6,-44 Z" />
        </g>
        <g fill="#2c5c3a">
          <ellipse cx="-19" cy="-26" rx="11" ry="6" transform="rotate(-28 -19 -26)" />
          <ellipse cx="19" cy="-24" rx="11" ry="6" transform="rotate(26 19 -24)" />
          <ellipse cx="0" cy="-28" rx="9" ry="5" />
        </g>
        <rect x="-20" y="-22" width="40" height="22" rx="2" fill="#c9a877" />
        <g stroke="#8a6b3e" strokeWidth="3">
          <path d="M-20,-16 L20,-16 M-20,-8 L20,-8" />
        </g>
        <circle cx="-14" cy="-30" r="4" fill="#e8443f" />
        <circle cx="12" cy="-32" r="3.5" fill="#e8443f" />
      </g>

      {/* 粉雪 */}
      <g fill="#eef4fa">
        <circle className="j08-snow" cx="34" cy="20" r="2.6" />
        <circle className="j08-snow j08-snow2" cx="92" cy="46" r="2.2" />
        <circle className="j08-snow j08-snow3" cx="150" cy="12" r="2.8" />
        <circle className="j08-snow j08-snow4" cx="212" cy="40" r="2.2" />
        <circle className="j08-snow j08-snow5" cx="272" cy="18" r="2.6" />
        <circle className="j08-snow j08-snow6" cx="330" cy="48" r="2.4" />
        <circle className="j08-snow j08-snow7" cx="382" cy="24" r="2.8" />
        <circle className="j08-snow j08-snow8" cx="64" cy="106" r="2.2" />
        <circle className="j08-snow j08-snow9" cx="240" cy="118" r="2.6" />
        <circle className="j08-snow j08-snow10" cx="358" cy="130" r="2.2" />
      </g>

      <style>{`
        .j08-lit { animation: j08-open 4s ease-in-out infinite; }
        .j08-lit2 { animation-delay: 1s; }
        .j08-lit3 { animation-delay: 2s; }
        .j08-lit4 { animation-delay: 3s; }
        .j08-monk { animation: j08-dash 0.44s ease-in-out infinite; }
        .j08-leg {
          transform-box: fill-box; transform-origin: 50% 0%;
          animation: j08-pump 0.44s ease-in-out infinite;
        }
        .j08-leg2 { animation-direction: reverse; }
        .j08-arm {
          transform-box: fill-box; transform-origin: 50% 0%;
          animation: j08-pump 0.44s ease-in-out infinite;
        }
        .j08-arm2 { animation-direction: reverse; }
        .j08-robe-tail {
          transform-box: fill-box; transform-origin: 0% 50%;
          animation: j08-flutter 0.62s ease-in-out infinite;
        }
        .j08-breath {
          transform-box: fill-box; transform-origin: 100% 50%;
          animation: j08-puff 1.9s ease-out infinite;
        }
        .j08-breath2 { animation-delay: 0.95s; }
        .j08-speed { animation: j08-streak 0.7s linear infinite; }
        .j08-speed2 { animation-delay: 0.22s; }
        .j08-speed3 { animation-delay: 0.44s; }
        .j08-hour {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: j08-tick 8s linear infinite;
        }
        .j08-minute {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: j08-tick 1.4s linear infinite;
        }
        .j08-hurry { animation: j08-scurry 0.7s ease-in-out infinite; }
        .j08-hurry2 { animation-delay: 0.3s; animation-duration: 0.62s; }
        .j08-snow { animation: j08-drift 6s linear infinite; }
        .j08-snow2 { animation-delay: 0.6s; animation-duration: 7s; }
        .j08-snow3 { animation-delay: 1.2s; animation-duration: 5.4s; }
        .j08-snow4 { animation-delay: 1.8s; animation-duration: 6.6s; }
        .j08-snow5 { animation-delay: 2.4s; animation-duration: 5.8s; }
        .j08-snow6 { animation-delay: 3s; animation-duration: 7.4s; }
        .j08-snow7 { animation-delay: 3.6s; animation-duration: 6.2s; }
        .j08-snow8 { animation-delay: 4.2s; animation-duration: 5.6s; }
        .j08-snow9 { animation-delay: 4.8s; animation-duration: 6.8s; }
        .j08-snow10 { animation-delay: 5.4s; animation-duration: 6.4s; }
        @keyframes j08-open {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.82; }
        }
        @keyframes j08-dash {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes j08-pump {
          0%, 100% { transform: rotate(26deg); }
          50% { transform: rotate(-26deg); }
        }
        @keyframes j08-flutter {
          0%, 100% { transform: rotate(-7deg) scaleX(1); }
          50% { transform: rotate(5deg) scaleX(1.1); }
        }
        @keyframes j08-puff {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          25% { opacity: 0.9; }
          100% { transform: translate(-26px, -12px) scale(1.7); opacity: 0; }
        }
        @keyframes j08-streak {
          0% { transform: translateX(0); opacity: 0; }
          25% { opacity: 0.5; }
          100% { transform: translateX(58px); opacity: 0; }
        }
        @keyframes j08-tick {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes j08-scurry {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes j08-drift {
          0% { transform: translate(0, -20px); opacity: 0; }
          12% { opacity: 1; }
          86% { opacity: 1; }
          100% { transform: translate(-24px, 190px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .j08-lit, .j08-monk, .j08-leg, .j08-arm, .j08-robe-tail, .j08-breath,
          .j08-speed, .j08-hour, .j08-minute, .j08-hurry, .j08-snow { animation: none; }
        }
      `}</style>
    </svg>
  );
}
