/**
 * インド 5月 — ルー(熱風)が吹く。
 *
 * 砂漠から45℃の乾いた風が来て、正午から4時まで街から人が消える。
 * 開いているのは氷屋と素焼きの水瓶(マトカ)の店だけ。犬は日陰から動かない。
 */
export function India01() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 砂埃で黄土色になった空 */}
      <rect width="400" height="210" fill="#e2c489" />
      <rect width="400" height="46" fill="#e8d09a" />
      <rect y="86" width="400" height="40" fill="#dcb877" />

      {/* 白く焼ける太陽 */}
      <circle cx="80" cy="38" r="34" fill="#f6ecc6" opacity="0.5" />
      <circle className="looheat-sun" cx="80" cy="38" r="21" fill="#fbf6e2" />

      {/* 閉まった街 */}
      <g fill="#c4a274">
        <rect x="0" y="60" width="86" height="86" />
        <rect x="92" y="76" width="64" height="70" />
        <rect x="316" y="54" width="84" height="92" />
      </g>
      <g fill="#ab8b5e">
        <rect x="0" y="60" width="86" height="7" />
        <rect x="92" y="76" width="64" height="7" />
        <rect x="316" y="54" width="84" height="7" />
      </g>
      {/* 下ろされたシャッター */}
      <g fill="#8a7050">
        <rect x="12" y="98" width="30" height="48" />
        <rect x="52" y="104" width="26" height="42" />
        <rect x="104" y="106" width="30" height="40" />
        <rect x="330" y="96" width="32" height="50" />
        <rect x="372" y="104" width="24" height="42" />
      </g>
      <g stroke="#6f5940" strokeWidth="2" fill="none">
        <path d="M12,108 H42 M12,118 H42 M12,128 H42 M12,138 H42" />
        <path d="M52,114 H78 M52,124 H78 M52,134 H78" />
        <path d="M104,116 H134 M104,126 H134 M104,136 H134" />
        <path d="M330,106 H362 M330,116 H362 M330,126 H362 M330,136 H362" />
        <path d="M372,114 H396 M372,124 H396 M372,134 H396" />
      </g>

      {/* 通り */}
      <rect y="144" width="400" height="66" fill="#d8b87e" />
      <rect y="144" width="400" height="5" fill="#c4a26a" />
      <rect y="184" width="400" height="26" fill="#cfad72" />

      {/* 日陰 */}
      <path d="M0,146 L130,146 L106,186 L0,186z" fill="#a8875c" opacity="0.55" />
      <rect x="170" y="146" width="146" height="30" fill="#a8875c" opacity="0.5" />

      {/* 氷とマトカの店の日よけ */}
      <g>
        <rect x="176" y="116" width="6" height="46" fill="#8a6a48" />
        <rect x="304" y="116" width="6" height="46" fill="#8a6a48" />
        <g className="looheat-awning">
          <path d="M168,100 L318,100 L312,120 L174,120z" fill="#f0e4cc" />
          <g fill="#e8823f">
            <path d="M186,100 L204,100 L200,120 L182,120z" />
            <path d="M222,100 L240,100 L236,120 L218,120z" />
            <path d="M258,100 L276,100 L272,120 L254,120z" />
            <path d="M294,100 L312,100 L308,120 L290,120z" />
          </g>
          <path d="M174,120 L312,120 L310,127 L176,127z" fill="#c96c2c" />
        </g>
      </g>

      {/* マトカ(素焼きの水瓶) */}
      <g fill="#b06a44">
        <path d="M182,163 q-15,-9 -15,-19 q0,-13 15,-13 q15,0 15,13 q0,10 -15,19z" />
        <path d="M174,138 q8,-5 16,0 q-8,3 -16,0z" fill="#c9855c" />
        <rect x="173" y="127" width="18" height="6" rx="2.5" fill="#945534" />
        <path d="M218,163 q-15,-9 -15,-19 q0,-13 15,-13 q15,0 15,13 q0,10 -15,19z" />
        <path d="M210,138 q8,-5 16,0 q-8,3 -16,0z" fill="#c9855c" />
        <rect x="209" y="127" width="18" height="6" rx="2.5" fill="#945534" />
        <path d="M200,126 q-12,-7 -12,-15 q0,-10 12,-10 q12,0 12,10 q0,8 -12,15z" />
        <rect x="192" y="101" width="16" height="5" rx="2" fill="#945534" />
      </g>
      <g fill="#a8d8ee">
        <path className="looheat-drip-a" d="M178,165 a4,4 0 0 0 8,0 L182,157z" />
        <path className="looheat-drip-b" d="M214,165 a4,4 0 0 0 8,0 L218,157z" />
      </g>

      {/* 氷の塊を積んだ荷車 */}
      <g>
        <rect x="242" y="150" width="66" height="8" rx="2" fill="#8a6a48" />
        <rect x="248" y="158" width="54" height="5" fill="#6f5436" />
        <circle cx="256" cy="166" r="8" fill="#4a3a2a" />
        <circle cx="296" cy="166" r="8" fill="#4a3a2a" />
        <circle cx="256" cy="166" r="3" fill="#7a6850" />
        <circle cx="296" cy="166" r="3" fill="#7a6850" />
        <rect x="250" y="124" width="50" height="26" rx="3" fill="#bfe0ea" />
        <rect x="250" y="124" width="50" height="8" rx="3" fill="#d8f0f6" />
        <rect x="254" y="118" width="42" height="8" rx="3" fill="#cfe8f0" />
        <path d="M262,124 L268,150 M282,124 L288,150" stroke="#a4cfdd" strokeWidth="3" fill="none" />
      </g>
      <g fill="#a8d8ee">
        <path className="looheat-drip-c" d="M254,164 a4,4 0 0 0 8,0 L258,156z" />
        <path className="looheat-drip-d" d="M292,164 a4,4 0 0 0 8,0 L296,156z" />
      </g>
      <ellipse className="looheat-puddle" cx="276" cy="180" rx="30" ry="6" fill="#b8ccc8" opacity="0.7" />

      {/* あおいでいる店主 */}
      <g transform="translate(230,176)">
        <path d="M-18,0 q0,-14 18,-14 q18,0 18,14z" fill="#e8e2d2" />
        <rect x="-13" y="-36" width="26" height="26" rx="6" fill="#5b8fe8" />
        <circle cx="0" cy="-45" r="10" fill="#a8703c" />
        <path d="M-9,-40 q9,13 18,0 q-4,9 -9,9 q-5,0 -9,-9z" fill="#3b2f2a" />
        <path d="M-11,-49 q4,-14 11,-14 q8,0 11,13 q-5,-5 -11,-5 q-6,0 -11,6z" fill="#f6efe2" />
        <g transform="translate(21,-28)">
          <g className="looheat-fan">
            <rect x="-2.5" y="-4" width="5" height="12" rx="2.5" fill="#8a6a48" />
            <path d="M-13,-6 q13,-14 26,0 L0,-2z" fill="#e8c464" />
            <path d="M-9,-6 L0,-13 M0,-6 L0,-14 M9,-6 L0,-13" stroke="#c69736" strokeWidth="1.4" fill="none" />
          </g>
        </g>
      </g>

      {/* 日陰で伸びている犬 */}
      <g transform="translate(46,170)">
        <path
          className="looheat-tail"
          d="M-30,-2 q-16,-4 -22,6"
          stroke="#c08a52"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="-20" cy="-2" rx="17" ry="14" fill="#b98046" />
        <ellipse cx="0" cy="2" rx="30" ry="12" fill="#c08a52" />
        <rect x="16" y="6" width="34" height="9" rx="4.5" fill="#b98046" />
        <rect x="10" y="9" width="34" height="8" rx="4" fill="#c08a52" />
        <ellipse cx="30" cy="-12" rx="15" ry="13" fill="#c08a52" />
        <path d="M42,-12 q16,0 18,6 q-4,5 -18,3z" fill="#c9955e" />
        <circle cx="58" cy="-7" r="3" fill="#2a2028" />
        <circle cx="34" cy="-16" r="2.4" fill="#2a2028" />
        <path d="M46,-4 q6,3 11,1" stroke="#8a5c38" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path className="looheat-ear" d="M22,-22 q-9,-6 -4,-14 q10,3 12,15z" fill="#a86e3c" />
      </g>

      {/* 吹き抜ける砂 */}
      <g fill="#efdcae" opacity="0.7">
        <rect className="looheat-dust-a" x="0" y="70" width="90" height="4" rx="2" />
        <rect className="looheat-dust-b" x="0" y="96" width="120" height="5" rx="2.5" />
        <rect className="looheat-dust-c" x="0" y="132" width="76" height="4" rx="2" />
        <rect className="looheat-dust-d" x="0" y="158" width="130" height="5" rx="2.5" />
        <rect className="looheat-dust-e" x="0" y="192" width="100" height="4" rx="2" />
        <rect className="looheat-dust-f" x="0" y="48" width="110" height="4" rx="2" />
        <rect className="looheat-dust-g" x="0" y="204" width="80" height="4" rx="2" />
      </g>

      {/* 転がっていく紙くず */}
      <g className="looheat-scrap">
        <path d="M0,0 L14,-4 L18,8 L4,12z" fill="#f6efe2" />
      </g>

      {/* 陽炎 */}
      <g stroke="#fbf6e2" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.45">
        <path className="looheat-shimmer-a" d="M96,154 q16,-6 32,0 q16,6 32,0" />
        <path className="looheat-shimmer-b" d="M300,166 q16,-6 32,0 q16,6 32,0" />
        <path className="looheat-shimmer-c" d="M140,196 q16,-6 32,0 q16,6 32,0" />
      </g>

      <style>{`
        .looheat-sun {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: looheat-blaze 4.2s ease-in-out infinite;
        }
        .looheat-awning {
          transform-box: fill-box;
          transform-origin: 50% 0;
          animation: looheat-flap 1.6s ease-in-out infinite;
        }
        .looheat-fan {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: looheat-wave 0.9s ease-in-out infinite;
        }
        .looheat-ear {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: looheat-twitch 3.4s ease-in-out infinite;
        }
        .looheat-tail {
          transform-box: fill-box;
          transform-origin: 100% 0;
          animation: looheat-twitch 2.6s ease-in-out infinite;
        }
        .looheat-drip-a { animation: looheat-drop 1.9s ease-in infinite; }
        .looheat-drip-b { animation: looheat-drop 2.4s ease-in infinite; animation-delay: -0.8s; }
        .looheat-drip-c { animation: looheat-drop 1.6s ease-in infinite; animation-delay: -0.4s; }
        .looheat-drip-d { animation: looheat-drop 2.1s ease-in infinite; animation-delay: -1.3s; }
        .looheat-puddle {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: looheat-seep 3.2s ease-in-out infinite;
        }
        .looheat-dust-a { animation: looheat-gust 1.5s linear infinite; }
        .looheat-dust-b { animation: looheat-gust 1.9s linear infinite; animation-delay: -0.6s; }
        .looheat-dust-c { animation: looheat-gust 1.3s linear infinite; animation-delay: -1.1s; }
        .looheat-dust-d { animation: looheat-gust 2.1s linear infinite; animation-delay: -0.3s; }
        .looheat-dust-e { animation: looheat-gust 1.7s linear infinite; animation-delay: -1.4s; }
        .looheat-dust-f { animation: looheat-gust 2.3s linear infinite; animation-delay: -0.9s; }
        .looheat-dust-g { animation: looheat-gust 1.6s linear infinite; animation-delay: -0.2s; }
        .looheat-scrap {
          transform: translate(160px, 196px);
          animation: looheat-tumble 4.4s linear infinite;
        }
        .looheat-shimmer-a { animation: looheat-waver 2.2s ease-in-out infinite; }
        .looheat-shimmer-b { animation: looheat-waver 2.8s ease-in-out infinite; animation-delay: -1s; }
        .looheat-shimmer-c { animation: looheat-waver 2.5s ease-in-out infinite; animation-delay: -1.7s; }
        @keyframes looheat-blaze {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.84; }
        }
        @keyframes looheat-flap {
          0%, 100% { transform: skewX(0deg) scaleY(1); }
          50% { transform: skewX(-3deg) scaleY(1.06); }
        }
        @keyframes looheat-wave {
          0%, 100% { transform: rotate(-30deg); }
          50% { transform: rotate(24deg); }
        }
        @keyframes looheat-twitch {
          0%, 82%, 100% { transform: rotate(0deg); }
          88% { transform: rotate(-16deg); }
          94% { transform: rotate(10deg); }
        }
        @keyframes looheat-drop {
          0% { transform: translateY(-6px); opacity: 0; }
          22% { opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        @keyframes looheat-seep {
          0%, 100% { transform: scaleX(1); opacity: 0.55; }
          50% { transform: scaleX(1.12); opacity: 0.78; }
        }
        @keyframes looheat-gust {
          0% { transform: translateX(-140px); opacity: 0; }
          20%, 72% { opacity: 0.75; }
          100% { transform: translateX(420px); opacity: 0; }
        }
        @keyframes looheat-tumble {
          0% { transform: translate(-30px, 200px) rotate(0deg); }
          25% { transform: translate(80px, 186px) rotate(220deg); }
          50% { transform: translate(190px, 200px) rotate(400deg); }
          75% { transform: translate(300px, 184px) rotate(620deg); }
          100% { transform: translate(430px, 198px) rotate(800deg); }
        }
        @keyframes looheat-waver {
          0%, 100% { transform: translateX(-6px) scaleY(1); opacity: 0.28; }
          50% { transform: translateX(6px) scaleY(1.6); opacity: 0.55; }
        }
        @media (prefers-reduced-motion: reduce) {
          .looheat-sun, .looheat-awning, .looheat-fan, .looheat-ear, .looheat-tail,
          .looheat-drip-a, .looheat-drip-b, .looheat-drip-c, .looheat-drip-d,
          .looheat-puddle,
          .looheat-dust-a, .looheat-dust-b, .looheat-dust-c, .looheat-dust-d,
          .looheat-dust-e, .looheat-dust-f, .looheat-dust-g, .looheat-scrap,
          .looheat-shimmer-a, .looheat-shimmer-b, .looheat-shimmer-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
