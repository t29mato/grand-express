/**
 * 国民投票の日曜、時刻表が変わる。投票所に人が集まりすぎて、自治体は乗り継ぎバスを
 * 臨時駐車場の誘導に振り替えてしまった。同じ直接民主主義が今朝、無関係な国政の
 * 案件を三つ決めたのと同じ日に。旅行者の目に留まる場所に知らせを出そうと思いついた
 * 者は誰もおらず、乗り継ぎはそのまま逃した。
 *
 * **この一枚は災害ではない。**落石や雪崩と同じ調子で描くと浮くので、
 * **明るい昼の、ふつうの日曜**にしてある。
 *
 * 構図: 左は投票所の集会所と、扉まで続く列(背丈も服も帽子も全員ちがう)。
 * 投票箱に票が落ちる。中央は案件三つの掲示板(**文字は描かない。**丸と斜線だけ)。
 * 右は**バス停に立ち尽くす旅行者**と、乗り継ぎバスだったはずの黄色いバス——
 * いまは草地の駐車場でコーンを立てて誘導している。
 * 知らせの紙は、**旅行者の背中側**のポールではためいている。
 *
 * 動くのは6つ: 列の前進、落ちる票、はためく知らせ、バスのハザード、
 * 誘導係の腕、途方に暮れた旅行者の肩。
 * 止めても「列・投票箱・誘導に使われているバス・空のバス停」で伝わる。
 */
export function SwitzerlandAbstimmungssonntag() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* よく晴れた日曜の空。 */}
      <rect width="400" height="210" fill="#a8cfe0" />
      <rect width="400" height="72" fill="#8fc4e8" />
      <g fill="#f6efe2" opacity="0.85">
        <ellipse cx="300" cy="28" rx="26" ry="8" />
        <ellipse cx="284" cy="34" rx="16" ry="6" />
        <ellipse cx="120" cy="20" rx="20" ry="6" />
      </g>

      {/* 前アルプスの丘と、村の緑。 */}
      <path d="M0,96q60,-24 130,-10q70,14 130,-6q60,-18 140,2v30H0z" fill="#6f8a5f" />
      <rect y="112" width="400" height="98" fill="#7f9f5a" />
      <g fill="#3f7f4a">
        <circle cx="238" cy="104" r="13" />
        <circle cx="228" cy="110" r="9" />
        <circle cx="248" cy="110" r="8" />
        <rect x="236" y="112" width="4" height="14" fill="#6b5330" />
      </g>

      {/* 投票所の集会所。 */}
      <g>
        <rect x="0" y="72" width="150" height="84" fill="#eae4d6" />
        <path d="M-6,72h162l-18,-18H12z" fill="#a8563c" />
        <rect x="-6" y="72" width="162" height="4" fill="#8f4a38" />
        <g fill="#5f7f96">
          <rect x="14" y="86" width="20" height="20" />
          <rect x="46" y="86" width="20" height="20" />
          <rect x="110" y="86" width="20" height="20" />
        </g>
        <g fill="#4a6b52">
          <rect x="10" y="86" width="4" height="20" />
          <rect x="34" y="86" width="4" height="20" />
          <rect x="42" y="86" width="4" height="20" />
          <rect x="66" y="86" width="4" height="20" />
        </g>
        <path d="M76,156v-32a16,16 0 0 1 32,0v32z" fill="#6b4423" />
        <path d="M76,124a16,16 0 0 1 32,0z" fill="#8a5a2c" />
        <rect x="150" y="96" width="4" height="60" fill="#8a8578" />
        <path d="M154,98h20v14h-20z" fill="#e8443f" />
        <g fill="#f6efe2">
          <rect x="162" y="101" width="4" height="8" />
          <rect x="160" y="103.6" width="8" height="2.8" />
        </g>
      </g>

      {/* 投票箱の卓と、落ちる票。 */}
      <g>
        <rect x="108" y="140" width="44" height="4" fill="#a8763c" />
        <g fill="#8a6a44">
          <rect x="112" y="144" width="3.4" height="16" />
          <rect x="144" y="144" width="3.4" height="16" />
        </g>
        <rect x="116" y="122" width="30" height="18" fill="#a8763c" />
        <rect x="116" y="122" width="30" height="3.4" fill="#c9964a" />
        <rect x="124" y="122" width="14" height="2.4" fill="#4a3a24" />
      </g>
      <g className="chv-slip">
        <rect x="126" y="106" width="11" height="14" rx="1" fill="#f6efe2" />
        <path d="M129,110h5M129,114h5" stroke="#b8ae98" strokeWidth="1.2" fill="none" />
      </g>

      {/* 扉へ続く列。**背丈も服も帽子も全員ちがう。** */}
      <g className="chv-queue">
        <g transform="translate(70,0)">
          <ellipse cx="0" cy="176" rx="10" ry="3" fill="#000" opacity="0.14" />
          <path d="M-5,176l-2,-16h11l-2,16z" fill="#3f3a34" />
          <path d="M-8,160q0,-16 8,-16q8,0 8,16z" fill="#4a6b52" />
          <circle cx="0" cy="136" r="7.4" fill="#e0b48a" />
          <path d="M-9,135q1,-9 9,-9q8,0 9,9z" fill="#6b5330" />
          <path d="M-11,136h22v2.4h-22z" fill="#5a4630" />
          <path d="M-7,150l-6,8" stroke="#e0b48a" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
        <g transform="translate(96,0)">
          <ellipse cx="0" cy="180" rx="10" ry="3" fill="#000" opacity="0.14" />
          <path d="M-5,180l-2,-18h11l-2,18z" fill="#2f3a44" />
          <path d="M-8,162q-1,-18 8,-18q9,0 8,18z" fill="#c2453c" />
          <circle cx="0" cy="136" r="7.8" fill="#c99a70" />
          <path d="M-8,132q2,-8 8,-8q6,0 8,8z" fill="#3f3a34" />
          <path d="M7,152l7,6" stroke="#c99a70" strokeWidth="4" strokeLinecap="round" fill="none" />
          <rect x="12" y="156" width="12" height="12" rx="2" fill="#8a6a44" />
        </g>
        <g transform="translate(124,0)">
          <ellipse cx="0" cy="184" rx="8" ry="2.6" fill="#000" opacity="0.14" />
          <path d="M-4,184l-1,-12h9l-1,12z" fill="#3f3a34" />
          <path d="M-6,172q-1,-12 6,-12q7,0 6,12z" fill="#f5b31c" />
          <circle cx="0" cy="153" r="6" fill="#e0b48a" />
          <path d="M-6,152q0,-7 6,-7q6,0 6,7z" fill="#8a3f4a" />
        </g>
        <g transform="translate(150,0)">
          <ellipse cx="0" cy="178" rx="10" ry="3" fill="#000" opacity="0.14" />
          <path d="M-5,178l-2,-17h11l-2,17z" fill="#4a4436" />
          <path d="M-8,161q0,-17 8,-17q8,0 8,17z" fill="#5b8fe8" />
          <circle cx="0" cy="137" r="7.4" fill="#8a6a48" />
          <path d="M-8,134q2,-8 8,-8q6,0 8,8z" fill="#f6efe2" />
          <path d="M8,151l8,-6" stroke="#8a6a48" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* 案件三つの掲示板。**文字は描かない。**丸と斜線だけ。 */}
      <g>
        <rect x="188" y="120" width="4" height="34" fill="#6b5330" />
        <rect x="252" y="120" width="4" height="34" fill="#6b5330" />
        <rect x="182" y="96" width="80" height="28" fill="#f2ede0" />
        <rect x="182" y="92" width="80" height="5" fill="#a8763c" />
        <g fill="#dfd8c8">
          <rect x="186" y="100" width="22" height="20" />
          <rect x="211" y="100" width="22" height="20" />
          <rect x="236" y="100" width="22" height="20" />
        </g>
        <path d="M191,110l4,5l8,-9" stroke="#4f8f3f" strokeWidth="2.6" fill="none" />
        <path d="M216,104l12,12M228,104l-12,12" stroke="#c2453c" strokeWidth="2.6" fill="none" />
        <path d="M241,110l4,5l8,-9" stroke="#4f8f3f" strokeWidth="2.6" fill="none" />
      </g>

      {/* 臨時駐車場の草地とコーン。 */}
      <path d="M256,158q60,-12 144,-4v56H256z" fill="#6f9f52" />
      <g fill="#e8703a">
        <path d="M266,176l4,-14h4l4,14z" />
        <path d="M300,182l4,-14h4l4,14z" />
      </g>
      <g fill="#f6efe2">
        <rect x="267.4" y="168" width="9" height="2.6" />
        <rect x="301.4" y="174" width="9" height="2.6" />
      </g>

      {/* 乗り継ぎバスだったはずの黄色いバス。いま誘導に使われている。 */}
      <g>
        <rect x="286" y="112" width="106" height="36" rx="5" fill="#f5c518" />
        <rect x="286" y="112" width="106" height="5" rx="2.5" fill="#f8dc7c" />
        <g fill="#5f7f96">
          <rect x="294" y="120" width="18" height="12" />
          <rect x="318" y="120" width="18" height="12" />
          <rect x="342" y="120" width="18" height="12" />
          <rect x="366" y="120" width="20" height="12" />
        </g>
        <rect x="288" y="140" width="102" height="4" fill="#c99a12" />
        <g fill="#2f3338">
          <circle cx="306" cy="148" r="6" />
          <circle cx="368" cy="148" r="6" />
        </g>
        <circle className="chv-hazard" cx="290" cy="136" r="3.4" fill="#e8703a" />
        <circle className="chv-hazard" cx="388" cy="136" r="3.4" fill="#e8703a" />
      </g>

      {/* 誘導係。橙のベストで腕を振っている。 */}
      <g transform="translate(276,0)">
        <ellipse cx="0" cy="184" rx="11" ry="3.4" fill="#000" opacity="0.16" />
        <path d="M-5,184l-2,-17h12l-2,17z" fill="#3f3a34" />
        <path d="M-9,167q0,-17 9,-17q9,0 9,17z" fill="#f28c1e" />
        <path d="M-9,159h18" stroke="#f6efe2" strokeWidth="3" fill="none" />
        <circle cx="0" cy="143" r="7.6" fill="#c99a70" />
        <path d="M-9,142q1,-9 9,-9q8,0 9,9z" fill="#f5b31c" />
        <g className="chv-wave">
          <path d="M4,154l14,-10" stroke="#c99a70" strokeWidth="5" strokeLinecap="round" fill="none" />
          <rect x="16" y="138" width="7" height="10" rx="2" fill="#e8443f" />
        </g>
      </g>

      {/* バス停。**知らせの紙は旅行者の背中側でひらひらしている。** */}
      <g>
        <rect x="228" y="140" width="5" height="52" fill="#4a4f56" />
        <rect x="218" y="128" width="26" height="14" rx="2" fill="#3f5f8f" />
        <circle cx="231" cy="135" r="4" fill="#f6efe2" />
      </g>
      <g className="chv-notice">
        <rect x="233" y="146" width="16" height="20" rx="1" fill="#f6efe2" />
        <g stroke="#b8ae98" strokeWidth="1.3" fill="none">
          <path d="M236,151h10M236,155h10M236,159h7" />
        </g>
      </g>

      {/* 取り残された旅行者。鞄を提げ、肩をすくめている。 */}
      <g transform="translate(206,0)">
        <ellipse cx="0" cy="192" rx="11" ry="3.4" fill="#000" opacity="0.18" />
        <path d="M-5,192l-2,-18h12l-2,18z" fill="#2f3a44" />
        <g className="chv-shrug">
          <path d="M-9,174q0,-18 9,-18q9,0 9,18z" fill="#8a3f4a" />
          <circle cx="0" cy="150" r="8" fill="#e0b48a" />
          <path d="M-9,148q1,-10 9,-10q8,0 9,10z" fill="#4a4436" />
          <path d="M-8,162l-10,-4M8,162l10,-4" stroke="#e0b48a" strokeWidth="4.6" strokeLinecap="round" fill="none" />
        </g>
        <rect x="12" y="160" width="18" height="14" rx="2" fill="#6b4423" />
        <rect x="12" y="160" width="18" height="3" fill="#8a5a2c" />
        <path d="M18,160v-4h6v4" stroke="#4a3a24" strokeWidth="2" fill="none" />
      </g>

      <style>{`
        .chv-queue {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: chv-shuffle 5.2s ease-in-out infinite;
        }
        @keyframes chv-shuffle {
          0%, 40%   { transform: translateX(6px); }
          70%, 100% { transform: translateX(0px); }
        }
        .chv-slip {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: chv-drop 3.4s ease-in infinite;
        }
        @keyframes chv-drop {
          0%   { transform: translate(0, -16px) rotate(-8deg); opacity: 0; }
          25%  { opacity: 1; }
          70%  { transform: translate(0, 16px) rotate(2deg); opacity: 1; }
          80%, 100% { transform: translate(0, 18px) rotate(2deg); opacity: 0; }
        }
        .chv-notice {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: chv-flap 2.6s ease-in-out infinite;
        }
        @keyframes chv-flap {
          0%, 100% { transform: skewX(0deg) rotate(-1deg); }
          50%      { transform: skewX(14deg) rotate(3deg); }
        }
        .chv-hazard { animation: chv-blink 1.2s steps(1, end) infinite; }
        @keyframes chv-blink {
          0%, 49%   { opacity: 1; }
          50%, 100% { opacity: 0.2; }
        }
        .chv-wave {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: chv-swing 2.2s ease-in-out infinite;
        }
        @keyframes chv-swing {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-24deg); }
        }
        .chv-shrug {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: chv-sigh 4.4s ease-in-out infinite;
        }
        @keyframes chv-sigh {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .chv-queue, .chv-slip, .chv-notice,
          .chv-hazard, .chv-wave, .chv-shrug { animation: none; }
          .chv-slip { transform: translate(0, 4px) rotate(-4deg); }
          .chv-notice { transform: skewX(10deg) rotate(2deg); }
          .chv-wave { transform: rotate(-16deg); }
        }
      `}</style>
    </svg>
  );
}
