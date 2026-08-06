/**
 * ホテイアオイに水路をふさがれ、ハウスボートが乗り上げる。
 *
 * 舳先を持ち上げたまま動かない船に細い舟が綱を張って引く。綱は張りっぱなしで
 * 震え、船体は緑の浮草に埋もれてほとんど揺れない。
 */
export function BackwaterDetour() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った空と椰子の岸 */}
      <rect width="400" height="210" fill="#16303a" />
      <rect width="400" height="124" fill="#6d95b0" />
      <rect y="112" width="400" height="22" fill="#1f3a2c" />
      <g fill="none" stroke="#1f3a2c" strokeWidth="4" strokeLinecap="round">
        <g transform="translate(44,116)">
          <path d="M0,0 q-4,-22 1,-36" />
          <path d="M1,-36 q-18,-6 -26,4 M1,-36 q18,-6 26,4 M1,-36 q-12,-16 -6,-24 M1,-36 q14,-14 24,-12" />
        </g>
        <g transform="translate(120,116) scale(0.82)">
          <path d="M0,0 q4,-22 -1,-36" />
          <path d="M-1,-36 q-18,-6 -26,4 M-1,-36 q18,-6 26,4 M-1,-36 q12,-16 6,-24 M-1,-36 q-14,-14 -24,-12" />
        </g>
        <g transform="translate(288,116) scale(0.9)">
          <path d="M0,0 q-4,-22 1,-36" />
          <path d="M1,-36 q-18,-6 -26,4 M1,-36 q18,-6 26,4 M1,-36 q-12,-16 -6,-24 M1,-36 q14,-14 24,-12" />
        </g>
        <g transform="translate(360,116) scale(0.74)">
          <path d="M0,0 q4,-22 -1,-36" />
          <path d="M-1,-36 q-18,-6 -26,4 M-1,-36 q18,-6 26,4 M-1,-36 q12,-16 6,-24 M-1,-36 q-14,-14 -24,-12" />
        </g>
      </g>

      {/* よどんだ水路 */}
      <rect y="132" width="400" height="78" fill="#2f5a4f" />
      <g fill="#417a6a">
        <rect className="bd-ripple-a" x="12" y="146" width="70" height="3" rx="1.5" />
        <rect className="bd-ripple-b" x="300" y="200" width="86" height="3" rx="1.5" />
      </g>

      {/* 船の向こう側の浮草 */}
      <g className="bd-weed-b" fill="#3f7a3c">
        <ellipse cx="130" cy="142" rx="14" ry="7" />
        <ellipse cx="160" cy="146" rx="12" ry="6" />
        <ellipse cx="200" cy="141" rx="15" ry="7" />
        <ellipse cx="242" cy="145" rx="13" ry="6" />
        <ellipse cx="286" cy="141" rx="16" ry="7" />
        <ellipse cx="330" cy="146" rx="13" ry="6" />
        <ellipse cx="368" cy="142" rx="14" ry="7" />
      </g>

      {/* 乗り上げたハウスボート */}
      <g className="bd-boat">
        <path d="M-92,0 Q-98,18 -68,22 L68,22 Q98,18 92,0z" fill="#6a4a2c" />
        <rect x="-88" y="3" width="176" height="5" fill="#4f3520" />
        <rect x="-84" y="-5" width="168" height="7" rx="2" fill="#8a6a44" />
        <path d="M-74,-5 Q-74,-54 0,-54 Q74,-54 74,-5z" fill="#c9a877" />
        <g fill="none" stroke="#a8834d" strokeWidth="3">
          <path d="M-56,-5 Q-56,-42 -22,-51" />
          <path d="M-20,-5 Q-20,-50 0,-53" />
          <path d="M20,-5 Q20,-50 0,-53" />
          <path d="M56,-5 Q56,-42 22,-51" />
        </g>
        <g fill="#26333a">
          <rect x="-52" y="-30" width="24" height="16" rx="3" />
          <rect x="-12" y="-33" width="24" height="16" rx="3" />
          <rect x="28" y="-30" width="24" height="16" rx="3" />
        </g>
      </g>

      {/* 張った引き綱 */}
      <path
        className="bd-rope"
        d="M126,167 L160,143"
        stroke="#f4ead6"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* 引いている小舟 */}
      <g className="bd-canoe">
        <path d="M-32,0 Q-36,12 -16,14 L16,14 Q36,12 32,0z" fill="#5a3f26" />
        <path d="M14,-42 L-20,10" stroke="#8a6a44" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="-6" y="-26" width="13" height="24" rx="5" fill="#e8d6b6" />
        <circle cx="0" cy="-32" r="7.5" fill="#c08a5c" />
      </g>

      {/* 船の手前を覆う浮草 */}
      <g className="bd-weed-a">
        <g fill="#4f8a46">
          <ellipse cx="118" cy="176" rx="17" ry="8" />
          <ellipse cx="156" cy="182" rx="15" ry="7" />
          <ellipse cx="196" cy="177" rx="18" ry="8" />
          <ellipse cx="238" cy="184" rx="16" ry="7" />
          <ellipse cx="278" cy="176" rx="19" ry="9" />
          <ellipse cx="322" cy="183" rx="16" ry="7" />
          <ellipse cx="364" cy="177" rx="17" ry="8" />
        </g>
        <g fill="#6fae57">
          <ellipse cx="136" cy="194" rx="16" ry="8" />
          <ellipse cx="178" cy="199" rx="18" ry="8" />
          <ellipse cx="224" cy="195" rx="15" ry="7" />
          <ellipse cx="266" cy="201" rx="18" ry="8" />
          <ellipse cx="310" cy="194" rx="16" ry="8" />
          <ellipse cx="352" cy="200" rx="17" ry="8" />
        </g>
        <g fill="#9f7fd0">
          <ellipse cx="150" cy="172" rx="5" ry="8" />
          <ellipse cx="248" cy="176" rx="5" ry="8" />
          <ellipse cx="300" cy="188" rx="5" ry="8" />
          <ellipse cx="196" cy="190" rx="5" ry="8" />
        </g>
      </g>

      <style>{`
        .bd-boat {
          transform: translate(250px, 152px) rotate(5deg);
          animation: bd-stuck 2.4s ease-in-out infinite;
        }
        .bd-canoe {
          transform: translate(94px, 172px);
          animation: bd-tug 2.4s ease-in-out infinite;
        }
        .bd-rope { animation: bd-strain 0.16s linear infinite; }
        .bd-weed-a { animation: bd-bob 4.2s ease-in-out infinite; }
        .bd-weed-b { animation: bd-bob 5.4s ease-in-out infinite; animation-delay: -1.8s; }
        .bd-ripple-a { animation: bd-drift 7s linear infinite; }
        .bd-ripple-b { animation: bd-drift 8.5s linear infinite; animation-delay: -3s; }
        @keyframes bd-stuck {
          0%, 100% { transform: translate(250px, 152px) rotate(5deg); }
          45% { transform: translate(248px, 151px) rotate(5.8deg); }
        }
        @keyframes bd-tug {
          0%, 100% { transform: translate(94px, 172px) rotate(0deg); }
          45% { transform: translate(84px, 172px) rotate(-3deg); }
          70% { transform: translate(90px, 173px) rotate(1deg); }
        }
        @keyframes bd-strain {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -1px); }
        }
        @keyframes bd-bob {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-4px, -3px); }
        }
        @keyframes bd-drift {
          0% { transform: translate(-40px, 0); opacity: 0; }
          25%, 75% { opacity: 0.8; }
          100% { transform: translate(70px, 0); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bd-boat, .bd-canoe, .bd-rope, .bd-weed-a, .bd-weed-b,
          .bd-ripple-a, .bd-ripple-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
