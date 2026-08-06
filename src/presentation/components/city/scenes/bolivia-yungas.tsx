/**
 * ユンガス(雲霧林)の街に重ねる、谷を渡る霧と坂を下る自転車。
 *
 * コロイコの斜面は一日じゅう霧が上がったり下がったりしている。
 * 白い帯が緑の山肌をなでて流れ、その下の細い道をダウンヒルの自転車が下っていく。
 */
export function BoliviaYungas() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 山肌を流れる霧の帯 */}
      <g fill="#eaf6f4">
        <g className="bolyung-mist-a" opacity="0.2">
          <ellipse cx="70" cy="99" rx="44" ry="4.4" />
          <ellipse cx="120" cy="96" rx="52" ry="5.4" />
          <ellipse cx="168" cy="101" rx="40" ry="4" />
          <ellipse cx="196" cy="98" rx="22" ry="2.6" />
        </g>
        <g className="bolyung-mist-b" opacity="0.24">
          <ellipse cx="200" cy="126" rx="46" ry="4.4" />
          <ellipse cx="258" cy="122" rx="58" ry="5.6" />
          <ellipse cx="316" cy="127" rx="44" ry="4.2" />
          <ellipse cx="352" cy="123" rx="24" ry="2.8" />
        </g>
        <g className="bolyung-mist-c" opacity="0.18">
          <ellipse cx="46" cy="143" rx="38" ry="3.6" />
          <ellipse cx="94" cy="140" rx="44" ry="4.4" />
          <ellipse cx="138" cy="144" rx="30" ry="3" />
        </g>
      </g>

      {/* 谷から湧き上がる霧 */}
      <g fill="#f0faf8">
        <g className="bolyung-rise-a" opacity="0.2">
          <ellipse cx="150" cy="150" rx="18" ry="12" />
          <ellipse cx="170" cy="143" rx="13" ry="9" />
          <ellipse cx="133" cy="141" rx="12" ry="8" />
          <ellipse cx="156" cy="134" rx="10" ry="7" />
        </g>
        <g className="bolyung-rise-b" opacity="0.16">
          <ellipse cx="320" cy="156" rx="16" ry="10" />
          <ellipse cx="338" cy="149" rx="11" ry="7" />
          <ellipse cx="303" cy="148" rx="10" ry="6.4" />
        </g>
      </g>

      {/* 道を下る自転車 */}
      <g className="bolyung-rider">
        <circle cx="-4" cy="-5" r="2.6" fill="#3a2b1e" />
        <circle cx="4" cy="-5" r="2.6" fill="#3a2b1e" />
        <path d="M-4,-5 L-1,-10 L4,-5 M-1,-10 L1,-12" stroke="#2b2050" strokeWidth="1.1" fill="none" />
        <path d="M-2,-11 L0,-16 L3,-13" stroke="#e8443f" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <circle cx="1" cy="-18" r="2.4" fill="#f5b31c" />
      </g>

      {/* 木々の上をすべる鳥 */}
      <g stroke="#243c28" strokeWidth="1.4" fill="none" strokeLinecap="round">
        <g className="bolyung-bird-a">
          <path className="bolyung-wing-a" d="M-6,0 Q-3,-4 0,0 Q3,-4 6,0" />
        </g>
        <g className="bolyung-bird-b">
          <path className="bolyung-wing-b" d="M-5,0 Q-2.5,-3.2 0,0 Q2.5,-3.2 5,0" />
        </g>
      </g>

      <style>{`
        .bolyung-mist-a, .bolyung-mist-b, .bolyung-mist-c,
        .bolyung-rise-a, .bolyung-rise-b,
        .bolyung-bird-a, .bolyung-bird-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .bolyung-mist-a { animation: bolyung-drift 40s ease-in-out infinite; }
        .bolyung-mist-b { animation: bolyung-drift 52s ease-in-out infinite; animation-delay: -20s; }
        .bolyung-mist-c { animation: bolyung-drift 46s ease-in-out infinite; animation-delay: -32s; }
        .bolyung-rise-a { animation: bolyung-rise 14s ease-out infinite; }
        .bolyung-rise-b { animation: bolyung-rise 17s ease-out infinite; animation-delay: -8s; }
        .bolyung-rider {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: translate(120px, 164px);
          animation: bolyung-descend 22s linear infinite;
        }
        .bolyung-bird-a { transform: translate(88px, 66px); animation: bolyung-glide-a 31s linear infinite; }
        .bolyung-bird-b { transform: translate(308px, 50px); animation: bolyung-glide-b 39s linear infinite; }
        .bolyung-wing-a, .bolyung-wing-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .bolyung-wing-a { animation: bolyung-flap 1s ease-in-out infinite; }
        .bolyung-wing-b { animation: bolyung-flap 1.3s ease-in-out infinite; animation-delay: -0.45s; }
        @keyframes bolyung-drift {
          0%, 100% { transform: translate(-40px, 4px) scaleX(1); opacity: 0.12; }
          50% { transform: translate(46px, -6px) scaleX(1.16); opacity: 0.26; }
        }
        @keyframes bolyung-rise {
          0% { transform: translate(0, 18px) scale(0.5); opacity: 0; }
          30% { opacity: 0.22; }
          70% { opacity: 0.14; }
          100% { transform: translate(-24px, -54px) scale(1.5); opacity: 0; }
        }
        @keyframes bolyung-descend {
          0% { transform: translate(414px, 150px); opacity: 0; }
          8% { opacity: 1; }
          20% { transform: translate(341px, 153.5px); }
          40% { transform: translate(250px, 160px); }
          60% { transform: translate(181px, 166px); }
          75% { transform: translate(120px, 164px); }
          90% { transform: translate(59px, 162px); opacity: 1; }
          100% { transform: translate(-14px, 168px); opacity: 0; }
        }
        @keyframes bolyung-glide-a {
          0% { transform: translate(-24px, 82px); }
          50% { transform: translate(190px, 60px); }
          100% { transform: translate(426px, 76px); }
        }
        @keyframes bolyung-glide-b {
          0% { transform: translate(426px, 46px); }
          50% { transform: translate(200px, 66px); }
          100% { transform: translate(-24px, 44px); }
        }
        @keyframes bolyung-flap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.32); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bolyung-mist-a, .bolyung-mist-b, .bolyung-mist-c,
          .bolyung-rise-a, .bolyung-rise-b,
          .bolyung-rider,
          .bolyung-bird-a, .bolyung-bird-b,
          .bolyung-wing-a, .bolyung-wing-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
