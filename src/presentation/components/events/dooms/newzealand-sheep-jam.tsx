/**
 * 羊の大群が道を塞ぐ。踏切いっぱいに広がった群れで列車も車も立ち往生する、
 * ニュージーランドの定番の光景。farmerと牧羊犬が追うが、羊は急がない。
 *
 * 動くのは、もぞもぞ揺れる羊の群れ(3群で位相を変える)・
 * 尻尾を振って走り回る牧羊犬・踏切の警報灯の点滅。
 */
export function NewzealandSheepJam() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 明るい牧場の朝。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="46" fill="#7fb4dc" />
      <g fill="#f6efe2" opacity="0.85">
        <ellipse cx="90" cy="30" rx="46" ry="8" />
        <ellipse cx="300" cy="22" rx="54" ry="9" />
      </g>
      {/* 丘。 */}
      <path d="M0,92 q70,-26 140,-10 q80,18 160,2 q60,-10 100,4 v40 H0 Z" fill="#6fae5a" />
      <rect y="104" width="400" height="106" fill="#5a9a4f" />

      {/* 線路(左から)。列車が止まっている。 */}
      <g>
        <rect x="0" y="128" width="150" height="4" fill="#57534a" />
        <rect x="0" y="136" width="150" height="4" fill="#57534a" />
        <g fill="#6b5330">
          <rect x="8" y="126" width="5" height="16" />
          <rect x="32" y="126" width="5" height="16" />
          <rect x="56" y="126" width="5" height="16" />
          <rect x="80" y="126" width="5" height="16" />
          <rect x="104" y="126" width="5" height="16" />
          <rect x="128" y="126" width="5" height="16" />
        </g>
      </g>
      {/* 待ちぼうけの赤い気動車。 */}
      <g>
        <rect x="8" y="92" width="104" height="40" rx="5" fill="#c2453c" />
        <rect x="14" y="99" width="20" height="14" rx="2" fill="#cfe4f0" />
        <rect x="42" y="99" width="20" height="14" rx="2" fill="#cfe4f0" />
        <rect x="70" y="99" width="20" height="14" rx="2" fill="#cfe4f0" />
        <rect x="96" y="99" width="12" height="14" rx="2" fill="#cfe4f0" />
        {/* 運転士が身を乗り出している。 */}
        <circle cx="103" cy="106" r="4.4" fill="#d9a273" />
        <path d="M98.5,105 a4.6,4.6 0 0 1 9,0 z" fill="#3a4453" />
        <rect x="8" y="118" width="104" height="4" fill="#8a2a24" />
        <g fill="#2a2622">
          <circle cx="30" cy="133" r="6" />
          <circle cx="60" cy="133" r="6" />
          <circle cx="92" cy="133" r="6" />
        </g>
        <path d="M112,102 l10,8 -10,8 z" fill="#8a2a24" />
      </g>

      {/* 道路(右から踏切へ)。 */}
      <path d="M150,120 L400,108 v34 L150,150 z" fill="#6f6a5e" />
      <path d="M150,134 L400,124" stroke="#f6efe2" strokeWidth="2.6" strokeDasharray="12 10" opacity="0.7" fill="none" />
      {/* 待っている車。 */}
      <g>
        <path d="M332,102 v-7 q2,-6 10,-6 h8 l6,-8 h18 l6,8 h4 q8,0 10,6 v7 z" fill="#4a6b80" />
        <rect x="358" y="87" width="16" height="6" rx="1" fill="#cfe4f0" />
        <g fill="#2a2622">
          <circle cx="344" cy="103" r="5.5" />
          <circle cx="380" cy="103" r="5.5" />
        </g>
        <g fill="#8a8578">
          <circle cx="344" cy="103" r="2.2" />
          <circle cx="380" cy="103" r="2.2" />
        </g>
      </g>

      {/* 踏切標識(交差の板と警報灯。文字は描かない)。 */}
      <g>
        <rect x="152" y="74" width="4" height="58" fill="#8a8578" />
        <g fill="#f6efe2" stroke="#c2453c" strokeWidth="2">
          <rect x="136" y="76" width="36" height="7" rx="3" transform="rotate(24 154 80)" />
          <rect x="136" y="76" width="36" height="7" rx="3" transform="rotate(-24 154 80)" />
        </g>
        <circle className="nzsj-lampL" cx="147" cy="96" r="4" fill="#e8443f" />
        <circle className="nzsj-lampR" cx="161" cy="96" r="4" fill="#e8443f" />
      </g>

      {/* 羊の大群。3つの群で別々にもぞもぞ動く。 */}
      <g className="nzsj-mobA">
        <g>
          <ellipse cx="170" cy="152" rx="14" ry="9" fill="#f6efe2" />
          <circle cx="182" cy="147" r="5" fill="#4a4436" />
          <ellipse cx="200" cy="160" rx="15" ry="10" fill="#efe6d2" />
          <circle cx="213" cy="154" r="5.4" fill="#4a4436" />
          <ellipse cx="152" cy="170" rx="15" ry="10" fill="#f6efe2" />
          <circle cx="140" cy="164" r="5.4" fill="#3a3630" />
          <ellipse cx="230" cy="146" rx="13" ry="8.4" fill="#f6efe2" />
          <circle cx="242" cy="141" r="4.8" fill="#4a4436" />
        </g>
      </g>
      <g className="nzsj-mobB">
        <g>
          <ellipse cx="188" cy="178" rx="16" ry="10" fill="#f6efe2" />
          <circle cx="202" cy="172" r="5.6" fill="#4a4436" />
          <ellipse cx="226" cy="170" rx="15" ry="9.4" fill="#efe6d2" />
          <circle cx="239" cy="164" r="5.2" fill="#3a3630" />
          <ellipse cx="256" cy="152" rx="13" ry="8.4" fill="#f6efe2" />
          <circle cx="268" cy="147" r="4.8" fill="#4a4436" />
          <ellipse cx="160" cy="192" rx="16" ry="10" fill="#f6efe2" />
          <circle cx="146" cy="186" r="5.6" fill="#4a4436" />
        </g>
      </g>
      <g className="nzsj-mobC">
        <g>
          <ellipse cx="222" cy="192" rx="17" ry="11" fill="#efe6d2" />
          <circle cx="237" cy="186" r="5.8" fill="#4a4436" />
          <ellipse cx="262" cy="180" rx="15" ry="10" fill="#f6efe2" />
          <circle cx="275" cy="174" r="5.4" fill="#3a3630" />
          <ellipse cx="288" cy="160" rx="13" ry="8.4" fill="#f6efe2" />
          <circle cx="299" cy="155" r="4.8" fill="#4a4436" />
          <ellipse cx="192" cy="204" rx="16" ry="9" fill="#f6efe2" />
          <circle cx="177" cy="199" r="5.4" fill="#4a4436" />
          <ellipse cx="256" cy="200" rx="15" ry="9" fill="#efe6d2" />
          <circle cx="270" cy="195" r="5.2" fill="#4a4436" />
        </g>
      </g>

      {/* 牧羊犬。群れの外を走り回る。 */}
      <g className="nzsj-dog">
        <g>
          <ellipse cx="0" cy="0" rx="9" ry="5" fill="#3a3630" />
          <circle cx="8" cy="-4" r="3.6" fill="#3a3630" />
          <path d="M10.6,-5.4 l3.4,1.4 -3.4,1.2 z" fill="#8a6a3c" />
          <path d="M6,-7.4 l-1.6,-3 3,0.6 z" fill="#3a3630" />
          <path d="M-8,-2 q-5,-4 -4,-8" stroke="#3a3630" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <g stroke="#2a2622" strokeWidth="2.2" strokeLinecap="round" fill="none">
            <path d="M-4,4 l-2,5 M4,4 l2,5" />
          </g>
        </g>
      </g>

      {/* 口笛を吹く farmer(腕を上げて合図)。 */}
      <ellipse cx="330" cy="196" rx="12" ry="3.4" fill="#000" opacity="0.2" />
      <g strokeLinecap="round">
        <path d="M326,176 L322,195" stroke="#4a3a2c" strokeWidth="5" fill="none" />
        <path d="M334,176 L338,195" stroke="#5a4736" strokeWidth="5" fill="none" />
        <path d="M330,150 L330,178" stroke="#6b7f52" strokeWidth="13" fill="none" />
        <path d="M330,152 L330,164" stroke="#4a5568" strokeWidth="13" fill="none" />
        <circle cx="330" cy="143" r="7" fill="#d9a273" />
        <path d="M322.5,141.5 a7.5,7.5 0 0 1 15,0 z" fill="#4f6b52" />
        <path d="M325,160 L316,150 L318,144" stroke="#d9a273" strokeWidth="3.4" fill="none" />
        <path d="M335,160 L346,164" stroke="#d9a273" strokeWidth="3.4" fill="none" />
        <path d="M346,164 L354,158" stroke="#8a6a3c" strokeWidth="2.4" fill="none" />
      </g>

      <style>{`
        .nzsj-mobA {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nzsj-shuffle 1.1s ease-in-out infinite alternate;
        }
        .nzsj-mobB {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nzsj-shuffle 0.9s ease-in-out infinite alternate;
          animation-delay: -0.45s;
        }
        .nzsj-mobC {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nzsj-shuffle 1.3s ease-in-out infinite alternate;
          animation-delay: -0.7s;
        }
        .nzsj-dog { animation: nzsj-run 4s ease-in-out infinite; }
        .nzsj-lampL { animation: nzsj-blink 1.2s steps(1) infinite; }
        .nzsj-lampR { animation: nzsj-blink 1.2s steps(1) infinite; animation-delay: -0.6s; }
        @keyframes nzsj-shuffle {
          from { transform: translate(0, 0); }
          to { transform: translate(2.4px, -1.6px); }
        }
        @keyframes nzsj-run {
          0% { transform: translate(300px, 190px) scale(1, 1); }
          40% { transform: translate(160px, 205px) scale(1, 1); }
          50% { transform: translate(150px, 203px) scale(-1, 1); }
          90% { transform: translate(295px, 188px) scale(-1, 1); }
          100% { transform: translate(300px, 190px) scale(1, 1); }
        }
        @keyframes nzsj-blink {
          0% { opacity: 1; }
          50% { opacity: 0.25; }
          100% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nzsj-mobA, .nzsj-mobB, .nzsj-mobC, .nzsj-dog, .nzsj-lampL, .nzsj-lampR {
            animation: none;
          }
          /* 止めても、犬が群れのそばにいるようにする。 */
          .nzsj-dog { transform: translate(300px, 190px); }
        }
      `}</style>
    </svg>
  );
}
