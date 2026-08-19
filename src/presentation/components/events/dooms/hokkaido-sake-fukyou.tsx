/**
 * 鮭が不漁の年。
 *
 * 本文の芯は3つ。**遡上が3年続けて細いこと・市場の値段がそれに合わせて上がったこと・
 * 同じ予算で去年の半分しか買えないこと。**
 *
 * **獲れないこと**を、魚の多さではなく**空の木箱の数**で描く。
 * 網に1尾だけ残り、氷の敷かれた箱はほとんど空で、値札の矢印だけが上を向いている
 * (文字は描けないので、値段は**赤い矢印**で示す)。
 *
 * 動くのは**引き上げられる網・網の中の1尾の跳ね・値札の矢印・待つカモメ・
 * 岸を打つ波**だけ。止めた状態でも、空の箱と、たった1尾の網で分かる。
 */
export function HokkaidoSakeFukyou() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方。低い橙の光。 */}
      <rect width="400" height="210" fill="#2f4258" />
      <rect width="400" height="40" fill="#26374d" />
      <rect y="40" width="400" height="24" fill="#4a5468" />
      <rect y="60" width="400" height="20" fill="#a86a4a" />
      <circle cx="64" cy="80" r="17" fill="#f0a04c" opacity="0.9" />
      <circle cx="64" cy="80" r="34" fill="#f0a04c" opacity="0.16" />

      {/* 対岸の岬と、帰ってきた船の影。 */}
      <path d="M0,84q56,-12 116,-4q64,8 128,-6q60,-14 156,2v14H0z" fill="#2a3a48" />
      <g fill="#22303f">
        <path d="M296,84h34l-5,-8h-24z" />
        <rect x="306" y="70" width="4" height="8" />
      </g>

      {/* 海。夕日の帯が一本。 */}
      <rect y="94" width="400" height="46" fill="#22394f" />
      <g fill="#c8814c" opacity="0.35">
        <rect x="46" y="96" width="36" height="42" />
      </g>
      <g className="hks-wave" stroke="#4f7a92" strokeWidth="2.4" fill="none" opacity="0.75">
        <path d="M120,104h64M232,114h96M150,124h72M300,100h84" />
      </g>

      {/* 岸壁。手前いっぱい。 */}
      <rect y="136" width="400" height="74" fill="#4a4a44" />
      <rect y="136" width="400" height="7" fill="#63635a" />
      <g stroke="#3a3a34" strokeWidth="2" fill="none" opacity="0.8">
        <path d="M0,166h400M0,192h400M92,143v67M244,143v67" />
      </g>

      {/* 空の木箱。**積まれているのに、中は氷だけ。** */}
      <g>
        <rect x="238" y="160" width="62" height="28" rx="2.4" fill="#8a5a3a" />
        <rect x="238" y="160" width="62" height="6" fill="#a87a4a" />
        <g stroke="#6b4028" strokeWidth="1.6" fill="none">
          <path d="M238,174h62M268,166v22" />
        </g>
        <rect x="244" y="164" width="50" height="6" fill="#dfe8ee" />

        <rect x="306" y="166" width="58" height="24" rx="2.4" fill="#7a4e32" />
        <rect x="306" y="166" width="58" height="5" fill="#996a42" />
        <g stroke="#5f3a24" strokeWidth="1.6" fill="none">
          <path d="M306,178h58M334,171v19" />
        </g>

        <rect x="252" y="134" width="58" height="26" rx="2.4" fill="#96683f" />
        <rect x="252" y="134" width="58" height="5" fill="#b08a58" />
        <rect x="258" y="139" width="46" height="6" fill="#dfe8ee" />
        {/* 箱の中に1尾だけ。 */}
        <g fill="#7f97a4">
          <path d="M266,148q9,-5 20,0q-9,5 -20,0z" />
          <path d="M266,148l-5,-3v6z" />
        </g>
        <path d="M270,148q6,-2 12,0" stroke="#c06a4a" strokeWidth="1.6" fill="none" />
      </g>

      {/* 値札の板。**文字は描けないので、赤い矢印だけが上を向く。** */}
      <g>
        <rect x="336" y="112" width="5" height="54" fill="#6b5f48" />
        <rect x="312" y="96" width="54" height="30" rx="3" fill="#e8e0cc" />
        <rect x="312" y="96" width="54" height="6" rx="3" fill="#c8bfa4" />
        <g fill="#b0a68c">
          <rect x="318" y="108" width="22" height="3.4" />
          <rect x="318" y="116" width="14" height="3.4" />
        </g>
        <g className="hks-arrow" fill="#d8443c">
          <path d="M352,122l-9,-13h18z" transform="rotate(180 352 115)" />
          <rect x="349" y="115" width="6" height="9" />
        </g>
      </g>

      {/* 引き上げられる定置網。**中は1尾だけ。** */}
      <g>
        <rect x="96" y="96" width="6" height="18" fill="#5f5f57" />
        <path d="M60,96h76l-8,-8H68z" fill="#6b6b62" />
        <g className="hks-net">
          <path d="M99,96v22" stroke="#c8bfa4" strokeWidth="2.4" fill="none" />
          <path d="M70,118h58l-10,44H80z" fill="#3f7a5a" opacity="0.55" />
          <g stroke="#2f5f44" strokeWidth="1.2" fill="none" opacity="0.9">
            <path d="M76,130h46M80,144h38M84,156h30M84,118l-4,44M99,118v44M114,118l4,44" />
          </g>
          {/* 網の中でただ1尾。 */}
          <g className="hks-fish">
            <path d="M86,142q13,-8 28,0q-13,8 -28,0z" fill="#7f97a4" />
            <path d="M86,142l-7,-5v10z" fill="#6b8391" />
            <path d="M92,142q10,-3 18,0" stroke="#c06a4a" strokeWidth="2" fill="none" />
            <circle cx="108" cy="140.6" r="1.4" fill="#22303f" />
          </g>
        </g>
      </g>

      {/* 網を引く漁師。**橙の胴付き長靴、両手で引く。** */}
      <g>
        <path d="M150,206h10l1,-26h-10z" fill="#c8801c" />
        <path d="M164,206h10l-1,-26h-10z" fill="#e8983c" />
        <path d="M146,180l6,-30h24l6,30z" fill="#e8983c" />
        <rect x="148" y="164" width="30" height="5" fill="#b06a1c" />
        <circle cx="163" cy="142" r="9.4" fill="#c8a880" />
        <path d="M153.6,141a9.4,9.4 0 0 1 18.8,0z" fill="#2f4a5f" />
        <g className="hks-pull">
          <path d="M148,162l-26,-8" stroke="#e8983c" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M152,172l-24,-4" stroke="#e8983c" strokeWidth="6" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* 待っているカモメ。**魚が上がらないので、動かない。** */}
      <g>
        <g className="hks-gull">
          <ellipse cx="212" cy="150" rx="11" ry="6" fill="#f4f8fa" />
          <path d="M220,146l7,-11h2.4l-4,12z" fill="#f4f8fa" />
          <path d="M202,150l-8,2 8,3z" fill="#c8ccd0" />
          <circle cx="228" cy="134" r="3" fill="#f4f8fa" />
          <path d="M230,134l6,-1.6" stroke="#f5b31c" strokeWidth="2" fill="none" />
          <g fill="#5f5f57">
            <rect x="208" y="156" width="2.4" height="8" />
            <rect x="214" y="156" width="2.4" height="8" />
          </g>
        </g>
        <g fill="#f4f8fa" opacity="0.9">
          <ellipse cx="188" cy="130" rx="7" ry="4" />
          <path d="M193,128l5,-8h1.6l-2.6,8z" />
        </g>
        <g fill="#5f5f57">
          <rect x="186" y="134" width="1.8" height="5" />
          <rect x="190" y="134" width="1.8" height="5" />
        </g>
      </g>

      {/* 岸を打つ波。 */}
      <g className="hks-surf" fill="#dfeaf0" opacity="0.55">
        <path d="M0,136q30,-7 62,0q-30,5 -62,0z" />
        <path d="M188,138q28,-6 56,0q-28,5 -56,0z" />
      </g>

      <style>{`
        .hks-net {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: hks-haul 4.2s ease-in-out infinite;
        }
        @keyframes hks-haul {
          0%, 100% { transform: translateY(6px) rotate(-1.6deg); }
          50%      { transform: translateY(-6px) rotate(1.6deg); }
        }
        .hks-fish {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: hks-flap 1.6s ease-in-out infinite;
        }
        @keyframes hks-flap {
          0%, 100% { transform: rotate(-9deg) translateY(0); }
          50%      { transform: rotate(9deg) translateY(-3px); }
        }
        .hks-pull {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: hks-tug 4.2s ease-in-out infinite;
        }
        @keyframes hks-tug {
          0%, 100% { transform: translateX(3px) rotate(4deg); }
          50%      { transform: translateX(-3px) rotate(-4deg); }
        }
        .hks-arrow {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: hks-rise 3s ease-in-out infinite;
        }
        @keyframes hks-rise {
          0%, 100% { transform: translateY(3px); opacity: 0.75; }
          50%      { transform: translateY(-5px); opacity: 1; }
        }
        .hks-gull {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: hks-peer 3.6s ease-in-out infinite;
        }
        @keyframes hks-peer {
          0%, 100% { transform: rotate(0deg); }
          40%      { transform: rotate(-7deg); }
          70%      { transform: rotate(4deg); }
        }
        .hks-wave { animation: hks-slide 5s ease-in-out infinite; }
        @keyframes hks-slide {
          0%, 100% { transform: translateX(-8px); opacity: 0.55; }
          50%      { transform: translateX(8px); opacity: 0.85; }
        }
        .hks-surf {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: hks-lap 3.4s ease-in-out infinite;
        }
        @keyframes hks-lap {
          0%, 100% { transform: translateY(0) scaleX(1); opacity: 0.4; }
          50%      { transform: translateY(-3px) scaleX(1.1); opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hks-net, .hks-fish, .hks-pull, .hks-arrow, .hks-gull, .hks-wave, .hks-surf { animation: none; }
          .hks-arrow {
            transform: translateY(-5px);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
        }
      `}</style>
    </svg>
  );
}
