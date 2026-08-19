/**
 * ラクレットの鉄板がひっくり返る。袖が卓上の小さな鉄板に引っかかり、削っている
 * 途中だった半玉分の溶けたチーズが、木のテーブルと客の膝、そしてこの夕食には
 * まったく予定されていなかった絨毯の上へ落ちた。主人は毎シーズン一度は起きると言い、
 * テーブルクロスのことはもう気にしないことにしている。
 *
 * **この一枚も災害ではない。**7枚のうちここだけが**屋内**で、夜の暖かいランプの色。
 * 山でも雪でもないので、並べたときにいちばん違って見える。
 *
 * 構図: 木の壁と吊りランプ。赤白の格子のクロスを掛けたテーブル。
 * 傾いた鉄板から**溶けたチーズが糸を引いて**縁を越え、座った客の膝、
 * さらに絨毯へ落ちている。客は椅子ごとのけぞり(**座ったままの姿勢**)、
 * 主人は布を持って回り込んでくる。倒れかけたワイングラスが揺れている。
 *
 * 動くのは6つ: 垂れるチーズ、揺れる鉄板、のけぞる客、駆け寄る主人の布、
 * 揺れるグラス、湯気。止めても「傾いた鉄板と、膝と絨毯のチーズ」で伝わる。
 */
export function SwitzerlandRacletteMissgeschick() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 木の壁と床。屋内の夜。 */}
      <rect width="400" height="210" fill="#5a3f24" />
      <rect width="400" height="126" fill="#7f5228" />
      <g stroke="#66401c" strokeWidth="2" opacity="0.7" fill="none">
        <path d="M0,22h400M0,52h400M0,82h400M0,110h400M64,0v126M188,0v126M312,0v126" />
      </g>

      {/* 窓。外は夜の谷。 */}
      <rect x="292" y="24" width="72" height="52" fill="#2f3f56" />
      <rect x="288" y="20" width="80" height="6" fill="#8a5a2c" />
      <rect x="288" y="74" width="80" height="6" fill="#8a5a2c" />
      <path d="M292,64l14,-16l12,10l16,-18l14,16l14,-8v28h-70z" fill="#46566e" />
      <g fill="#e8eef4" opacity="0.8">
        <circle cx="306" cy="34" r="1.6" />
        <circle cx="338" cy="30" r="1.4" />
        <circle cx="352" cy="42" r="1.4" />
      </g>
      <rect x="326" y="24" width="4" height="52" fill="#8a5a2c" />

      {/* 吊りランプ。テーブルの上に暖かい光。 */}
      <rect x="126" y="0" width="3" height="22" fill="#4a3a24" />
      <path d="M104,22h48l-10,16h-28z" fill="#c2453c" />
      <circle cx="127.5" cy="40" r="5" fill="#f8e08a" />
      <path d="M110,44q14,50 -2,82h40q-16,-32 -2,-82z" fill="#f5d06a" opacity="0.1" />

      {/* 壁の飾り(牛の鈴)。**この盤面のお守りでもある。** */}
      <g>
        <rect x="222" y="30" width="20" height="5" rx="1.4" fill="#8a3f4a" />
        <path d="M226,35h12l5,16h-22z" fill="#c9962c" />
        <path d="M226,35h6l-3,16h-6z" fill="#e0b83c" />
        <circle cx="232" cy="53" r="2.6" fill="#8a7a3c" />
      </g>

      {/* テーブル。赤白の格子のクロス。 */}
      <path d="M28,126h300v12H28z" fill="#e8e2d4" />
      <path d="M28,138h300l-10,10H38z" fill="#d8d0be" />
      <g fill="#c2453c" opacity="0.85">
        <rect x="44" y="126" width="18" height="12" />
        <rect x="80" y="126" width="18" height="12" />
        <rect x="116" y="126" width="18" height="12" />
        <rect x="152" y="126" width="18" height="12" />
        <rect x="188" y="126" width="18" height="12" />
        <rect x="224" y="126" width="18" height="12" />
        <rect x="260" y="126" width="18" height="12" />
        <rect x="296" y="126" width="18" height="12" />
      </g>
      <g fill="#c2453c" opacity="0.6">
        <rect x="62" y="138" width="18" height="8" />
        <rect x="98" y="138" width="18" height="8" />
        <rect x="134" y="138" width="18" height="8" />
        <rect x="170" y="138" width="18" height="8" />
        <rect x="206" y="138" width="18" height="8" />
        <rect x="242" y="138" width="18" height="8" />
        <rect x="278" y="138" width="18" height="8" />
      </g>
      <g fill="#6b4423">
        <rect x="44" y="148" width="8" height="34" />
        <rect x="300" y="148" width="8" height="34" />
      </g>

      {/* 絨毯。ここにも落ちた。 */}
      <rect y="182" width="400" height="28" fill="#8a3f4a" />
      <g stroke="#6b2f3a" strokeWidth="2.4" opacity="0.8" fill="none">
        <path d="M0,188h400M0,204h400" />
      </g>

      {/* 皿とじゃがいも、ピクルス。ラクレットの食卓。 */}
      <g>
        <ellipse cx="212" cy="132" rx="22" ry="7" fill="#f2ede0" />
        <ellipse cx="212" cy="130" rx="16" ry="5" fill="#e0dcd0" />
        <g fill="#d8b45c">
          <ellipse cx="206" cy="128" rx="6" ry="4" />
          <ellipse cx="216" cy="129" rx="5.4" ry="3.6" />
        </g>
        <g fill="#4f8f3f">
          <ellipse cx="226" cy="131" rx="5" ry="2.4" />
          <ellipse cx="230" cy="128" rx="4.4" ry="2" />
        </g>
      </g>

      {/* 倒れかけたワイングラス。 */}
      <g className="chr-glass">
        <path d="M256,126l-5,-16h14l-5,16z" fill="#8a2f3c" opacity="0.85" />
        <path d="M250,110h16l-1.4,-6h-13.2z" fill="#e8e2d4" opacity="0.6" />
        <rect x="257" y="126" width="2" height="8" fill="#e8e2d4" opacity="0.7" />
        <ellipse cx="258" cy="134" rx="7" ry="2.4" fill="#e8e2d4" opacity="0.7" />
      </g>

      {/* **ひっくり返った鉄板。**半玉のチーズが縁からずり落ちている。 */}
      <g className="chr-grill">
        <path d="M96,124h60v8H96z" fill="#5f676e" />
        <path d="M92,132h68l-6,8H98z" fill="#4a5158" />
        <g fill="#3f454c">
          <rect x="100" y="140" width="5" height="10" />
          <rect x="146" y="140" width="5" height="10" />
        </g>
        <path d="M104,124h44l-4,-10h-36z" fill="#8a939c" />
        <circle cx="150" cy="128" r="3" fill="#e8443f" />
        {/* 半玉のチーズ。切り口を下に向けて傾いている。 */}
        <path d="M110,120q0,-16 20,-16q20,0 20,16z" fill="#e8c766" />
        <path d="M110,120q0,-16 20,-16v16z" fill="#f2dc94" />
        <path d="M108,120h44v6h-44z" fill="#c9a64c" />
      </g>

      {/* **垂れて落ちるチーズ。**卓の縁を越えて膝と絨毯へ。 */}
      <g className="chr-drip">
        <path d="M126,126q-4,20 2,34q6,14 0,26" stroke="#f2c94c" strokeWidth="9" strokeLinecap="round" fill="none" />
        <ellipse cx="128" cy="188" rx="16" ry="5" fill="#f2c94c" />
        <ellipse cx="128" cy="187" rx="9" ry="3" fill="#f8e08a" />
      </g>
      <ellipse cx="150" cy="198" rx="22" ry="6" fill="#e8bd3c" />
      <ellipse cx="146" cy="196" rx="11" ry="3.4" fill="#f2c94c" />
      <path d="M96,148q18,6 30,2l4,10q-20,6 -36,-2z" fill="#f2c94c" />

      {/* 湯気。溶けたチーズの真上から立つ。 */}
      <g className="chr-steam" fill="#fbf6ea" opacity="0.55">
        <ellipse cx="146" cy="112" rx="11" ry="4.4" />
        <ellipse cx="158" cy="102" rx="8" ry="3.4" />
        <ellipse cx="150" cy="93" rx="5.4" ry="2.6" />
      </g>

      {/* のけぞる客。**座ったままの姿勢**にして、他の6枚の立ち姿と変える。 */}
      <g transform="translate(70,0)">
        <g className="chr-guest">
          {/* 椅子 */}
          <rect x="-26" y="152" width="30" height="6" fill="#8a5a2c" />
          <rect x="-26" y="118" width="6" height="40" fill="#8a5a2c" />
          <g fill="#6b4423">
            <rect x="-24" y="158" width="5" height="26" />
            <rect x="-2" y="158" width="5" height="26" />
          </g>
          {/* 腿と脛(座っている) */}
          <path d="M-18,152h30v10h-30z" fill="#3f5f8f" />
          <path d="M8,156h10l2,28h-12z" fill="#3f5f8f" />
          <path d="M8,184h14l2,6H8z" fill="#3f3a34" />
          {/* 胴(後ろへ倒れている) */}
          <path d="M-20,150q-6,-24 6,-30q12,-6 18,10l4,18z" fill="#4f8f7a" />
          <circle cx="-14" cy="112" r="9" fill="#e0b48a" />
          <path d="M-23,110q1,-11 9,-11q9,0 9,11z" fill="#4a3a24" />
          {/* 上げた両腕 */}
          <path d="M-6,126l14,-16" stroke="#e0b48a" strokeWidth="5.4" strokeLinecap="round" fill="none" />
          <path d="M-18,126l-10,-16" stroke="#e0b48a" strokeWidth="5.4" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* 布を持って回り込んでくる主人。前かがみで、卓のほうを向いている。 */}
      <g transform="translate(336,0)">
        <ellipse cx="-2" cy="192" rx="14" ry="4" fill="#000" opacity="0.24" />
        <g fill="#2f3338">
          <path d="M-10,192l1,-22h8l-1,22z" />
          <path d="M2,192l1,-22h8l-1,22z" />
        </g>
        <path d="M-12,172h24l-1,6h-22z" fill="#4a4436" />
        <path d="M-12,172q-3,-26 12,-26q15,0 12,26z" fill="#e8e2d4" />
        <path d="M-9,156h18l2,16h-22z" fill="#8a6a44" />
        <path d="M-3,146h6v6h-6z" fill="#c99a70" />
        <circle cx="0" cy="136" r="9" fill="#c99a70" />
        <path d="M-9,133q2,-11 9,-11q7,0 9,11q-9,-5 -18,0z" fill="#4a3a24" />
        <circle cx="-4" cy="137" r="1.2" fill="#3f3428" />
        <path d="M-8,142q5,3 9,0" stroke="#a8785c" strokeWidth="1.3" fill="none" />
        {/* 卓へ伸ばした腕と、提げた布 */}
        <path d="M-9,160l-16,8" stroke="#c99a70" strokeWidth="5.4" strokeLinecap="round" fill="none" />
        <g className="chr-cloth">
          <path d="M-25,166q-16,2 -22,16q18,4 26,-6z" fill="#f6efe2" />
          <path d="M-25,166q-9,1 -15,6q9,3 17,-1z" fill="#dfd8c8" />
        </g>
      </g>

      <style>{`
        .chr-grill {
          transform-box: fill-box;
          transform-origin: 88% 100%;
          animation: chr-tip 4.2s ease-in-out infinite;
        }
        @keyframes chr-tip {
          0%, 100% { transform: rotate(-10deg); }
          50%      { transform: rotate(-18deg); }
        }
        .chr-drip {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: chr-ooze 3.6s ease-in-out infinite;
        }
        @keyframes chr-ooze {
          0%, 100% { transform: scaleY(0.94); }
          50%      { transform: scaleY(1.06); }
        }
        .chr-steam {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: chr-rise 4.6s ease-in-out infinite;
        }
        @keyframes chr-rise {
          0%   { transform: translate(0, 8px) scale(0.7); opacity: 0.08; }
          45%  { transform: translate(-6px, -6px) scale(1.1); opacity: 0.45; }
          100% { transform: translate(-14px, -20px) scale(1.3); opacity: 0; }
        }
        .chr-guest {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: chr-recoil 3.4s ease-in-out infinite;
        }
        @keyframes chr-recoil {
          0%, 100% { transform: rotate(-2deg); }
          45%      { transform: rotate(-8deg) translateX(-4px); }
        }
        .chr-cloth {
          transform-box: fill-box;
          transform-origin: 100% 0%;
          animation: chr-wipe 2.4s ease-in-out infinite;
        }
        @keyframes chr-wipe {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-18deg); }
        }
        .chr-glass {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: chr-wobble 2.8s ease-in-out infinite;
        }
        @keyframes chr-wobble {
          0%, 100% { transform: rotate(-6deg); }
          50%      { transform: rotate(7deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .chr-grill, .chr-drip, .chr-steam,
          .chr-guest, .chr-cloth, .chr-glass { animation: none; }
          .chr-grill { transform: rotate(-16deg); }
          .chr-guest { transform: rotate(-6deg); }
          .chr-glass { transform: rotate(-7deg); }
          .chr-steam { opacity: 0.3; }
        }
      `}</style>
    </svg>
  );
}
