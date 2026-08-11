/**
 * 台風が海岸を通る。何日も前から進路が追われていたが、それでも縛っていなかった
 * ものは何もかもなぎ倒す。
 *
 * 壊れたものではなく、**傾いた松と、飛ばされる笠**で風の強さを示す。
 * 動くのは、飛んでいく笠1つだけ。
 */
export function KoreaTaepung() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 荒れた空。 */}
      <rect width="400" height="210" fill="#2f3b4f" />
      <g fill="#3a465c">
        <ellipse cx="70" cy="40" rx="90" ry="26" />
        <ellipse cx="240" cy="30" rx="100" ry="30" />
        <ellipse cx="370" cy="46" rx="60" ry="22" />
      </g>

      {/* 雨脚。斜めに強く。 */}
      <g stroke="#5a6c86" strokeWidth="2.5" strokeLinecap="round" opacity="0.75">
        <path d="M40,60 L20,100" />
        <path d="M80,54 L60,94" />
        <path d="M160,58 L142,98" />
        <path d="M300,56 L282,96" />
        <path d="M340,60 L322,100" />
      </g>

      {/* 海と波頭。 */}
      <rect y="140" width="400" height="70" fill="#1e4a68" />
      <g fill="#dbe6e0" opacity="0.85">
        <path d="M20,150q10,-8 20,0t20,0t20,0t20,0" />
        <path d="M240,158q10,-8 20,0t20,0t20,0t20,0" />
      </g>

      {/* 防波堤。 */}
      <rect y="130" width="400" height="12" fill="#8a8478" />

      {/* 傾いた松。風の強さを幹の傾きで示す。 */}
      <g strokeLinecap="round">
        <path d="M90,130 Q100,100 130,86" stroke="#5a4630" strokeWidth="9" fill="none" />
        <path d="M130,86 q-26,-4 -40,6M130,86 q4,-20 -6,-34M130,86 q22,2 34,-10" stroke="#1f4a30" strokeWidth="7" fill="none" />
      </g>
      <g strokeLinecap="round">
        <path d="M330,132 Q338,106 362,94" stroke="#5a4630" strokeWidth="7" fill="none" />
        <path d="M362,94 q-20,-2 -30,6M362,94 q4,-16 -4,-26" stroke="#1f4a30" strokeWidth="5" fill="none" />
      </g>

      {/* 傘を取り落として身をかがめる人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M210,168 L204,196" stroke="#3d3a42" strokeWidth="9" fill="none" />
        <path d="M222,168 L230,194" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M216,140 L216,170" stroke="#e8443f" strokeWidth="22" fill="none" />
        <circle cx="216" cy="126" r="11" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <path d="M200,150 L182,158" stroke="#d9a273" strokeWidth="8" fill="none" />
      </g>

      {/* 飛んでいく笠。**ここだけが動く。** */}
      <g className="ktp-hat">
        <path d="M0,0 L-22,10 L22,10z" fill="#c8a878" stroke="#5a4630" strokeWidth="2" strokeLinejoin="round" />
      </g>

      <style>{`
        .ktp-hat {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ktp-fly 2.6s ease-in infinite;
        }
        @keyframes ktp-fly {
          0%   { transform: translate(170px, 130px) rotate(0deg); opacity: 1; }
          80%  { transform: translate(330px, 60px) rotate(340deg); opacity: 1; }
          100% { transform: translate(170px, 130px) rotate(0deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ktp-hat {
            animation: none;
            transform: translate(300px, 70px) rotate(300deg);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
