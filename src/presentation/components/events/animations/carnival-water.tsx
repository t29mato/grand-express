/**
 * カルナバル前の水風船。誰彼かまわず狙われ、ポケットのスマホごとずぶ濡れになる。
 *
 *   - バルコニーから水風船が飛んでくる
 *   - 胸で弾けて水しぶきが広がり、体から雫が垂れ続ける
 *   - ポケットから落ちたスマホが水を滴らせている
 */
export function CarnivalWater() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 街並みと通り */}
      <rect width="400" height="210" fill="#5b7fa8" />
      <rect y="62" width="400" height="94" fill="#4a4252" />
      <g fill="#2f2b3a">
        <rect x="24" y="80" width="26" height="34" rx="3" />
        <rect x="76" y="80" width="26" height="34" rx="3" />
        <rect x="196" y="76" width="26" height="34" rx="3" />
        <rect x="248" y="76" width="26" height="34" rx="3" />
      </g>
      <rect y="152" width="400" height="58" fill="#6b6154" />

      {/* バルコニー */}
      <rect x="286" y="96" width="106" height="8" fill="#8a5c38" />
      <g fill="#6b4630">
        <rect x="290" y="104" width="5" height="20" />
        <rect x="312" y="104" width="5" height="20" />
        <rect x="334" y="104" width="5" height="20" />
        <rect x="356" y="104" width="5" height="20" />
        <rect x="378" y="104" width="5" height="20" />
        <rect x="286" y="122" width="106" height="6" />
      </g>

      {/* 投げてくる人たち */}
      <g transform="translate(316,96)">
        <rect x="-10" y="-30" width="20" height="30" rx="6" fill="#e8443f" />
        <circle cx="0" cy="-40" r="10" fill="#c98a5e" />
        <path d="M-10,-42 a10,10 0 0 1 20,0z" fill="#2a2028" />
        <g className="carn-arm">
          <rect x="6" y="-44" width="8" height="24" rx="4" fill="#c98a5e" />
        </g>
        <circle cx="12" cy="-50" r="7" fill="#5bc8e8" />
      </g>
      <g transform="translate(362,96)">
        <rect x="-10" y="-28" width="20" height="28" rx="6" fill="#f5b31c" />
        <circle cx="0" cy="-38" r="10" fill="#e8c39e" />
        <path d="M-10,-40 a10,10 0 0 1 20,0z" fill="#3b2f2a" />
        <rect x="-18" y="-36" width="12" height="7" rx="3" fill="#e8c39e" />
      </g>

      {/* 紙テープと紙吹雪 */}
      <g className="carn-streamers" stroke="none">
        <path d="M40,62 C48,78 32,88 40,104 C48,120 34,128 40,142" stroke="#e8443f" strokeWidth="4" fill="none" />
        <path d="M118,62 C126,76 110,86 118,100 C126,114 112,122 118,136" stroke="#f5b31c" strokeWidth="4" fill="none" />
        <path d="M262,62 C270,76 254,86 262,100 C270,114 256,122 262,136" stroke="#4f9e4a" strokeWidth="4" fill="none" />
      </g>
      <g>
        <rect className="carn-confetti" x="60" y="20" width="7" height="7" rx="1" fill="#f5b31c" />
        <rect className="carn-confetti" x="132" y="46" width="6" height="6" rx="1" fill="#e8443f" />
        <rect className="carn-confetti" x="188" y="16" width="7" height="7" rx="1" fill="#5bc8e8" />
        <rect className="carn-confetti" x="228" y="52" width="6" height="6" rx="1" fill="#f6efe2" />
        <rect className="carn-confetti" x="292" y="24" width="7" height="7" rx="1" fill="#4f9e4a" />
        <rect className="carn-confetti" x="344" y="46" width="6" height="6" rx="1" fill="#e8443f" />
        <rect className="carn-confetti" x="88" y="118" width="6" height="6" rx="1" fill="#5bc8e8" />
        <rect className="carn-confetti" x="248" y="126" width="7" height="7" rx="1" fill="#f5b31c" />
      </g>

      {/* 飛んでくる水風船 */}
      <g transform="translate(240,120)">
        <g className="carn-balloon carn-balloon-a">
          <ellipse cx="0" cy="0" rx="9" ry="10" fill="#5bc8e8" />
          <path d="M-3,9 L3,9 L0,15z" fill="#3fa8cf" />
        </g>
      </g>
      <g transform="translate(288,104)">
        <g className="carn-balloon carn-balloon-b">
          <ellipse cx="0" cy="0" rx="8" ry="9" fill="#8fd0f0" />
          <path d="M-3,8 L3,8 L0,13z" fill="#5bc8e8" />
        </g>
      </g>

      {/* ずぶ濡れの旅人 */}
      <g transform="translate(130,196)">
        <ellipse className="carn-puddle" cx="0" cy="2" rx="40" ry="8" fill="#7fa8c4" />
        <rect x="-11" y="-26" width="9" height="26" rx="4" fill="#3b4a63" />
        <rect x="2" y="-26" width="9" height="26" rx="4" fill="#3b4a63" />
        <rect x="-18" y="-64" width="36" height="40" rx="8" fill="#f5b31c" />
        <path d="M-18,-44 C-8,-38 8,-38 18,-44 L18,-24 L-18,-24z" fill="#c98a1c" />
        <rect x="-34" y="-74" width="14" height="30" rx="7" fill="#f6efe2" transform="rotate(24 -27 -59)" />
        <rect x="20" y="-74" width="14" height="30" rx="7" fill="#f6efe2" transform="rotate(-24 27 -59)" />
        <circle cx="0" cy="-78" r="14" fill="#f6efe2" />
        <path d="M-14,-80 a14,14 0 0 1 28,0 L13,-78 L-13,-78z" fill="#3b3a42" />
        <path d="M-6,-74 a3,3 0 0 1 6,0z" fill="#2a2028" />
        <path d="M2,-74 a3,3 0 0 1 6,0z" fill="#2a2028" />
        <path d="M-6,-66 q6,5 12,0" stroke="#2a2028" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 弾けた水しぶき */}
        <g className="carn-splash" fill="#8fd0f0">
          <path d="M0,-52 L9,-64 L8,-50 L22,-56 L12,-44 L26,-42 L11,-38 L20,-27 L6,-34 L6,-20 L-1,-33 L-10,-22 L-8,-36 L-22,-32 L-11,-41 L-24,-48 L-9,-45 L-14,-58 L-3,-49z" />
        </g>
        {/* したたる雫 */}
        <g fill="#8fd0f0">
          <path className="carn-drip" d="M-26,-30 a4,4 0 0 0 8,0 L-22,-38z" />
          <path className="carn-drip" d="M20,-30 a4,4 0 0 0 8,0 L24,-38z" />
          <path className="carn-drip" d="M-8,-20 a4,4 0 0 0 8,0 L-4,-28z" />
          <path className="carn-drip" d="M8,-18 a4,4 0 0 0 8,0 L12,-26z" />
        </g>
      </g>

      {/* 落ちた濡れスマホ */}
      <g transform="translate(186,168)">
        <g className="carn-phone">
          <rect x="-9" y="-16" width="18" height="32" rx="3" fill="#22242c" />
          <rect x="-6" y="-13" width="12" height="24" rx="1" fill="#3f4450" />
          <circle cx="0" cy="13" r="1.6" fill="#5a606e" />
        </g>
      </g>
      <g fill="#8fd0f0">
        <path className="carn-drip" d="M180,186 a4,4 0 0 0 8,0 L184,178z" />
        <path className="carn-drip" d="M192,190 a3.5,3.5 0 0 0 7,0 L195.5,183z" />
      </g>

      <style>{`
        .carn-balloon { transform-box: fill-box; transform-origin: 50% 50%; }
        .carn-balloon-a { animation: carn-throw 1.9s ease-in infinite; }
        .carn-balloon-b { animation: carn-throw 1.9s ease-in infinite; animation-delay: -1s; }
        .carn-splash { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0.85; animation: carn-burst 1.9s ease-out infinite; }
        .carn-drip { animation: carn-drop 1.3s ease-in infinite; }
        .carn-drip:nth-child(2n) { animation-delay: -0.4s; }
        .carn-drip:nth-child(3n) { animation-delay: -0.85s; }
        .carn-confetti { transform-box: fill-box; transform-origin: 50% 50%; animation: carn-flutter 3.2s linear infinite; }
        .carn-confetti:nth-child(3n) { animation-duration: 4.4s; animation-delay: -1.9s; }
        .carn-confetti:nth-child(3n+1) { animation-duration: 3.8s; animation-delay: -2.7s; }
        .carn-streamers { animation: carn-sway 3s ease-in-out infinite; }
        .carn-arm { transform-box: fill-box; transform-origin: 50% 100%; animation: carn-hurl 1.9s ease-in-out infinite; }
        .carn-phone {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          transform: rotate(-14deg);
          animation: carn-tumble 2.6s ease-in-out infinite;
        }
        .carn-puddle {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: carn-ripple 2.2s ease-in-out infinite;
        }
        @keyframes carn-throw {
          0% { transform: translate(76px, -30px) scale(0.7); opacity: 0; }
          12% { opacity: 1; }
          92% { transform: translate(-104px, 18px) scale(1.05); opacity: 1; }
          100% { transform: translate(-104px, 18px) scale(1.2); opacity: 0; }
        }
        @keyframes carn-burst {
          0%, 78% { transform: scale(0.15); opacity: 0; }
          88% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes carn-drop {
          0% { transform: translateY(-4px); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translateY(18px); opacity: 0; }
        }
        @keyframes carn-flutter {
          0% { transform: translate(0, -40px) rotate(0deg); opacity: 0; }
          12%, 84% { opacity: 1; }
          100% { transform: translate(-16px, 62px) rotate(300deg); opacity: 0; }
        }
        @keyframes carn-sway {
          0%, 100% { transform: translateX(-3px); }
          50% { transform: translateX(3px); }
        }
        @keyframes carn-hurl {
          0%, 60% { transform: rotate(0deg); }
          80% { transform: rotate(-52deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes carn-tumble {
          0%, 100% { transform: rotate(-16deg) translateY(0); }
          50% { transform: rotate(-4deg) translateY(-3px); }
        }
        @keyframes carn-ripple {
          0%, 100% { transform: scaleX(1); opacity: 0.55; }
          50% { transform: scaleX(1.12); opacity: 0.8; }
        }
        @media (prefers-reduced-motion: reduce) {
          .carn-balloon-a, .carn-balloon-b, .carn-splash, .carn-drip, .carn-confetti,
          .carn-streamers, .carn-arm, .carn-phone, .carn-puddle { animation: none; }
        }
      `}</style>
    </svg>
  );
}
