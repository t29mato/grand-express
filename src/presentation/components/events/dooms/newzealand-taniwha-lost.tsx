/**
 * タニファに化かされる。夕暮れの原生林で道が堂々巡りになり、
 * 気づけば同じ入り江のまわりを何周もしている。
 *
 * この盤面の厄災の神は**タニファ**(水辺の主)。害意ではなく縄張り意識が
 * 強すぎるだけの存在として、**滑稽にも残酷にもしない**。姿は水面に浮かぶ
 * なめらかな背中と、じっとこちらを見る金の目だけ。彫刻の意匠は特定の部族の
 * 写しを避け、一般的なコル(渦巻)の抽象にとどめる。
 *
 * 動くのは、入り江のまわりを歩き続ける旅人(楕円軌道)と、
 * ゆっくり息をするように沈み浮きするタニファ、漂う霧。
 */
export function NewzealandTaniwhaLost() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕暮れの空。南の高い空が緑がかって残る。 */}
      <rect width="400" height="210" fill="#27405c" />
      <rect y="52" width="400" height="34" fill="#3c5a6a" />
      <rect y="80" width="400" height="16" fill="#5a7a72" />
      <g fill="#e8e0c8" opacity="0.7">
        <circle cx="52" cy="22" r="1.6" />
        <circle cx="128" cy="40" r="1.3" />
        <circle cx="336" cy="18" r="1.6" />
        <circle cx="374" cy="46" r="1.3" />
      </g>

      {/* 遠景: 原生林の丘。 */}
      <path d="M0,96 L48,78 L96,92 L150,74 L210,90 L266,76 L320,90 L368,80 L400,90 V96 Z" fill="#1f3a30" />
      <rect y="94" width="400" height="116" fill="#2a3c2e" />

      {/* 中景: シダの木(ポンガ)の茂み。 */}
      <g stroke="#16281f" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M36,128 V96" />
        <path d="M36,96 q-10,-8 -22,-4 M36,96 q-4,-12 -14,-16 M36,96 q4,-12 12,-16 M36,96 q10,-8 22,-4" />
        <path d="M338,124 V90" />
        <path d="M338,90 q-10,-8 -22,-4 M338,90 q-4,-12 -14,-16 M338,90 q4,-12 12,-16 M338,90 q10,-8 22,-4" />
        <path d="M382,132 V104" />
        <path d="M382,104 q-9,-7 -19,-4 M382,104 q-2,-11 -11,-14 M382,104 q8,-9 18,-7" />
      </g>

      {/* 入り江。タニファの水域。 */}
      <ellipse cx="228" cy="152" rx="92" ry="27" fill="#16303c" />
      <ellipse cx="228" cy="150" rx="78" ry="21" fill="#1e3a46" />
      <g stroke="#3f6b6e" strokeWidth="1.6" opacity="0.6" fill="none">
        <path d="M172,146 h30 M250,142 h34 M196,160 h40 M258,158 h26" />
      </g>

      {/* 堂々巡りの道。入り江をぐるりと囲む。 */}
      <ellipse cx="228" cy="156" rx="112" ry="39" fill="none" stroke="#4a4438" strokeWidth="11" />
      <ellipse cx="228" cy="156" rx="112" ry="39" fill="none" stroke="#5a5344" strokeWidth="7" />
      {/* 何周もした足あと(左右の足が交互に、少し乱れて続く)。 */}
      <g fill="#332e24" opacity="0.85">
        <ellipse cx="338" cy="150" rx="2.6" ry="1.6" />
        <ellipse cx="333" cy="158" rx="2.6" ry="1.6" />
        <ellipse cx="327" cy="171" rx="2.6" ry="1.6" />
        <ellipse cx="318" cy="178" rx="2.6" ry="1.6" />
        <ellipse cx="300" cy="185" rx="2.6" ry="1.6" />
        <ellipse cx="290" cy="190" rx="2.6" ry="1.6" />
        <ellipse cx="264" cy="192" rx="2.6" ry="1.6" />
        <ellipse cx="253" cy="196" rx="2.6" ry="1.6" />
        <ellipse cx="226" cy="194" rx="2.6" ry="1.6" />
        <ellipse cx="215" cy="198" rx="2.6" ry="1.6" />
        <ellipse cx="188" cy="192" rx="2.6" ry="1.6" />
        <ellipse cx="178" cy="195" rx="2.6" ry="1.6" />
        <ellipse cx="152" cy="184" rx="2.6" ry="1.6" />
        <ellipse cx="144" cy="188" rx="2.6" ry="1.6" />
        <ellipse cx="128" cy="170" rx="2.6" ry="1.6" />
        <ellipse cx="121" cy="174" rx="2.6" ry="1.6" />
        <ellipse cx="117" cy="153" rx="2.6" ry="1.6" />
        <ellipse cx="123" cy="146" rx="2.6" ry="1.6" />
        <ellipse cx="132" cy="134" rx="2.6" ry="1.6" />
        <ellipse cx="141" cy="129" rx="2.6" ry="1.6" />
        <ellipse cx="160" cy="123" rx="2.6" ry="1.6" />
        <ellipse cx="171" cy="119" rx="2.6" ry="1.6" />
        <ellipse cx="202" cy="117" rx="2.6" ry="1.6" />
        <ellipse cx="213" cy="120" rx="2.6" ry="1.6" />
        <ellipse cx="248" cy="117" rx="2.6" ry="1.6" />
        <ellipse cx="258" cy="121" rx="2.6" ry="1.6" />
        <ellipse cx="292" cy="125" rx="2.6" ry="1.6" />
        <ellipse cx="300" cy="130" rx="2.6" ry="1.6" />
        <ellipse cx="322" cy="136" rx="2.6" ry="1.6" />
        <ellipse cx="329" cy="142" rx="2.6" ry="1.6" />
      </g>

      {/* タニファ。水面に出ているのは、なめらかな背中と金の目だけ。 */}
      <g className="nztl-tani">
        {/* 背中。丸太のように低く長い。 */}
        <path d="M186,152 q17,-14 40,-12 q20,2 30,10 l-2,4 q-36,7 -68,-2z" fill="#24504a" />
        <path d="M194,146 q13,-9 30,-8" stroke="#3f7f6e" strokeWidth="2" fill="none" />
        {/* 背の稜。丸い鰭がゆるく並ぶ。 */}
        <g fill="#1e453f">
          <path d="M203,141 q5,-8 11,-1z" />
          <path d="M220,137 q5,-8 11,0z" />
          <path d="M237,138 q5,-7 10,1z" />
        </g>
        {/* 肩のコル(渦巻)。 */}
        <path d="M212,148 a5,5 0 1 1 7.5,3.5 a3,3 0 1 0 -3,-4.4" stroke="#6fae9a" strokeWidth="1.6" fill="none" />
        {/* 頭。水面に出た丸いこぶ。目は金色で、怒りではなく見張り。 */}
        <path d="M254,152 q2,-9 10,-9 q9,0 10,9 q-10,4 -20,0z" fill="#24504a" />
        <circle cx="267" cy="148" r="2.6" fill="#f5b31c" />
        <circle cx="267.8" cy="148" r="1.1" fill="#141a26" />
        <path d="M259,145 q3,-2 6,-2" stroke="#3f7f6e" strokeWidth="1.4" fill="none" />
      </g>
      {/* 尾が立てる静かな波紋(後ろにだけ)。 */}
      <g className="nztl-wake" stroke="#4f8f86" strokeWidth="1.6" fill="none" opacity="0.7">
        <path d="M170,154 q10,4 22,2" />
        <path d="M164,160 q14,5 30,3" />
      </g>

      {/* 旅人。入り江のまわりを歩かされ続ける。 */}
      <g transform="translate(228,156)">
        <g className="nztl-walkx">
          <g className="nztl-walky">
            <g className="nztl-face">
              <g className="nztl-bob">
                <ellipse cx="0" cy="1" rx="9" ry="2.6" fill="#000" opacity="0.22" />
                {/* 足 */}
                <path d="M-2,-12 L-5,0" stroke="#3f3428" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M2,-12 L5,0" stroke="#4a3f30" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                {/* 胴(緑のアノラック) */}
                <path d="M-6,-27 h12 l1.5,16 h-15 z" fill="#4f6b52" />
                {/* スーツケース */}
                <path d="M7,-16 l3,4" stroke="#e0b48a" strokeWidth="2.6" strokeLinecap="round" fill="none" />
                <rect x="7" y="-12" width="12" height="9" rx="1.5" fill="#a8763c" />
                <rect x="11.5" y="-14" width="3" height="2.6" fill="#6b5330" />
                {/* 先を探す腕 */}
                <path d="M-5,-24 l-7,3" stroke="#e0b48a" strokeWidth="2.6" strokeLinecap="round" fill="none" />
                {/* 頭とビーニー */}
                <circle cx="0" cy="-32" r="5.2" fill="#e0b48a" />
                <path d="M-5.4,-33.5 a5.4,5.4 0 0 1 10.8,0 z" fill="#c2453c" />
              </g>
            </g>
          </g>
        </g>
      </g>

      {/* 漂う霧。薄く、細くたなびく。 */}
      <g className="nztl-mist" fill="#cfdadd" opacity="0.2">
        <ellipse cx="120" cy="128" rx="58" ry="4.5" />
        <ellipse cx="300" cy="120" rx="52" ry="4" />
        <ellipse cx="210" cy="103" rx="46" ry="3.5" />
      </g>

      <style>{`
        .nztl-walkx {
          animation: nztl-x 12s ease-in-out infinite;
        }
        .nztl-walky {
          animation: nztl-y 12s ease-in-out infinite;
          animation-delay: -3s;
        }
        .nztl-face {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: nztl-flip 12s steps(1) infinite;
        }
        .nztl-bob {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nztl-bob 0.55s ease-in-out infinite alternate;
        }
        .nztl-tani {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nztl-breathe 5s ease-in-out infinite;
        }
        .nztl-wake {
          animation: nztl-wake 5s ease-in-out infinite;
        }
        .nztl-mist {
          animation: nztl-drift 9s ease-in-out infinite alternate;
        }
        @keyframes nztl-x {
          0% { transform: translateX(112px); }
          50% { transform: translateX(-112px); }
          100% { transform: translateX(112px); }
        }
        @keyframes nztl-y {
          0% { transform: translateY(39px); }
          50% { transform: translateY(-39px); }
          100% { transform: translateY(39px); }
        }
        @keyframes nztl-flip {
          0% { transform: scaleX(1); }
          50% { transform: scaleX(-1); }
          100% { transform: scaleX(1); }
        }
        @keyframes nztl-bob {
          from { transform: translateY(0); }
          to { transform: translateY(-2.2px); }
        }
        @keyframes nztl-breathe {
          0%, 100% { transform: translateY(3px); }
          50% { transform: translateY(-1.5px); }
        }
        @keyframes nztl-wake {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes nztl-drift {
          from { transform: translateX(-10px); }
          to { transform: translateX(12px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nztl-walkx, .nztl-walky, .nztl-face, .nztl-bob,
          .nztl-tani, .nztl-wake, .nztl-mist {
            animation: none;
          }
          /* 止めても分かる構図: 足あとの輪の上、手前の道に旅人が立ち、
             タニファが水面からこちらを見ている。 */
          .nztl-walkx { transform: translateX(66px); }
          .nztl-walky { transform: translateY(32px); }
        }
      `}</style>
    </svg>
  );
}
