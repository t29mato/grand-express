/**
 * 喜望峰の強風(ケープ・ドクター)で港のクレーンが止まる。
 * 夏に南東から吹くこの風は、街の煙と埃を洗い流すので「医者」と呼ばれている。
 * 災難というより**毎夏の顔なじみ**なので、**7枚のうちでいちばん明るい絵**にする。
 *
 * 構図: テーブルマウンテンの平らな頂から、雲が「テーブルクロス」になって
 * 縁を越えて流れ落ちている——この風が吹いているときの、あの山の姿そのもの。
 * 手前の港では、ガントリークレーンが荷役をやめて**ブームを上げた休止の姿勢**で
 * 固定されている。荷を積むはずだったコンテナ列車は待たされたまま。
 * 吹き流しは真横に伸び、紙屑が岸壁を転がっていく。
 *
 * 動くのは5つ: 縁を越えて落ちる雲、吹き流し、転がる紙屑、白波、
 * 風に揺れる吊り具。止めた状態でも「山に雲がかかり、ブームが上がり、
 * 吹き流しが真横を向いている」で伝わる。
 */
export function SouthafricaCapeDoctorCrane() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夏の高い空。 */}
      <rect width="400" height="210" fill="#8fc6e4" />
      <rect width="400" height="52" fill="#5aa8d4" />
      <rect y="46" width="400" height="30" fill="#78bade" />
      <circle cx="356" cy="26" r="15" fill="#f8e6a8" />
      <circle cx="356" cy="26" r="24" fill="#f8e6a8" opacity="0.28" />

      {/* デビルズピーク(テーブルの右肩)。低く小さく。 */}
      <path d="M180,118 L212,70 l20,22 l22,26z" fill="#5f6a62" />
      <path d="M212,70 l12,13 l-8,3 l-6,-6z" fill="#788278" />

      {/* テーブルマウンテン。**平らな頂**と、切り立った岩肌。 */}
      <path d="M14,118 L38,68 h146 l20,50z" fill="#6b756c" />
      <path d="M14,118 L38,68 h42 l-10,50z" fill="#7d867c" />
      <g stroke="#525b54" strokeWidth="2" fill="none" opacity="0.75">
        <path d="M54,118 V72 M84,118 V70 M112,118 V70 M142,118 V70 M166,116 V70" />
      </g>
      <rect x="36" y="66" width="150" height="4" fill="#8b9389" />
      {/* 山裾の町。 */}
      <g fill="#d8d2c4">
        <rect x="4" y="106" width="14" height="12" />
        <rect x="22" y="110" width="12" height="8" />
        <rect x="196" y="106" width="16" height="12" />
        <rect x="216" y="110" width="12" height="8" />
      </g>

      {/* ── テーブルクロス。**平らな頂に載り、右の縁を越えて流れ落ちる。** */}
      <g fill="#f4f8fa">
        <ellipse cx="72" cy="56" rx="38" ry="10" />
        <ellipse cx="124" cy="53" rx="42" ry="11" />
        <ellipse cx="168" cy="57" rx="24" ry="9" />
      </g>
      <g className="sa-cd-cloth-a" fill="#eef4f6" opacity="0.9">
        <ellipse cx="180" cy="68" rx="20" ry="9" />
        <ellipse cx="194" cy="80" rx="15" ry="8" />
      </g>
      <g className="sa-cd-cloth-b" fill="#e4ecf0" opacity="0.8">
        <ellipse cx="188" cy="74" rx="17" ry="8" />
        <ellipse cx="200" cy="88" rx="13" ry="7" />
      </g>
      <g className="sa-cd-cloth-c" fill="#dae4e8" opacity="0.7">
        <ellipse cx="196" cy="84" rx="14" ry="7" />
        <ellipse cx="206" cy="96" rx="11" ry="6" />
      </g>

      {/* ── 港の水。風で白波が立っている。 */}
      <rect y="118" width="400" height="32" fill="#2f7fa8" />
      <rect y="118" width="400" height="10" fill="#3a92bc" />
      <g className="sa-cd-chop-a" stroke="#dff0f6" strokeWidth="2.4" fill="none" opacity="0.75">
        <path d="M14,128 h20 M76,134 h24 M158,126 h20 M240,136 h22 M320,128 h24" />
      </g>
      <g className="sa-cd-chop-b" stroke="#cfe8f2" strokeWidth="2" fill="none" opacity="0.6">
        <path d="M46,142 h22 M124,140 h20 M206,144 h24 M292,142 h20 M362,140 h22" />
      </g>

      {/* ── 岸壁。 */}
      <rect y="146" width="400" height="64" fill="#b0aa9a" />
      <rect y="146" width="400" height="5" fill="#8f8a7c" />
      <rect y="196" width="400" height="14" fill="#9c9686" />
      <g stroke="#8f8a7c" strokeWidth="1.6" fill="none" opacity="0.7">
        <path d="M0,168 h400 M40,151 v45 M140,151 v45 M240,151 v45 M340,151 v45" />
      </g>
      {/* 係船柱。 */}
      <g fill="#5f5a52">
        <path d="M20,150 q6,-8 12,0 v6 H20z" />
        <path d="M300,150 q6,-8 12,0 v6 h-12z" />
      </g>

      {/* ── ガントリークレーン2基。**ブームを上げて留めてある=荷役していない。** */}
      <g>
        {/* 1基目。脚が線路をまたいでいる。 */}
        <g fill="#f0b429">
          <rect x="246" y="70" width="9" height="98" />
          <rect x="314" y="70" width="9" height="98" />
        </g>
        <rect x="238" y="60" width="94" height="12" fill="#f0b429" />
        <rect x="238" y="60" width="94" height="4" fill="#c98d18" />
        <rect x="260" y="72" width="18" height="14" fill="#3f4a52" />
        <g stroke="#f0b429" strokeWidth="4" fill="none">
          <path d="M250,118 h70 M250,144 h70" />
        </g>
        {/* 上げたブーム。海側へ張り出さず、空へ向けて留めてある。 */}
        <g>
          <path d="M326,62 L360,14 l9,6 l-30,46z" fill="#f0b429" />
          <path d="M356,10 h18 l3,10 h-18z" fill="#f0b429" />
          <g stroke="#c98d18" strokeWidth="2.2" fill="none">
            <path d="M333,52 l9,6 M342,38 l9,6 M351,24 l9,6" />
          </g>
        </g>
        {/* 垂れた吊り具。風で振られている。 */}
        <path d="M284,72 v14" stroke="#5f5a52" strokeWidth="2" fill="none" />
        <g className="sa-cd-spreader">
          <path d="M284,86 v14" stroke="#5f5a52" strokeWidth="2" fill="none" />
          <rect x="266" y="100" width="36" height="7" rx="2" fill="#c2453c" />
          <rect x="269" y="107" width="5" height="5" fill="#8f3129" />
          <rect x="294" y="107" width="5" height="5" fill="#8f3129" />
        </g>
        <g fill="#3f4a52">
          <rect x="242" y="166" width="18" height="7" rx="2" />
          <rect x="310" y="166" width="18" height="7" rx="2" />
        </g>
      </g>
      <g opacity="0.92">
        {/* 2基目。遠くに小さく、同じ休止の姿勢で。 */}
        <g fill="#e0a824">
          <rect x="356" y="86" width="7" height="80" />
          <rect x="392" y="86" width="7" height="80" />
        </g>
        <rect x="350" y="78" width="50" height="9" fill="#e0a824" />
        <g stroke="#e0a824" strokeWidth="3.4" fill="none">
          <path d="M360,122 h36 M360,146 h36" />
        </g>
        <path d="M394,80 L400,42 v38z" fill="#e0a824" />
        <g fill="#3f4a52">
          <rect x="353" y="164" width="14" height="6" rx="2" />
          <rect x="389" y="164" width="11" height="6" rx="2" />
        </g>
      </g>

      {/* ── 積み上がったコンテナ。荷役が止まっているので山のまま。 */}
      <g>
        <g fill="#c2453c">
          <rect x="16" y="158" width="46" height="14" />
          <rect x="66" y="158" width="46" height="14" />
          <rect x="40" y="144" width="46" height="14" />
        </g>
        <g fill="#3f7f9f">
          <rect x="16" y="172" width="46" height="14" />
          <rect x="66" y="172" width="46" height="14" />
          <rect x="116" y="158" width="46" height="14" />
        </g>
        <g fill="#4f8f5a">
          <rect x="116" y="172" width="46" height="14" />
          <rect x="90" y="144" width="46" height="14" />
        </g>
        <g stroke="#2f3a3e" strokeWidth="1.4" fill="none" opacity="0.6">
          <path d="M28,158 v28 M44,158 v28 M78,158 v28 M94,158 v28 M128,158 v28 M144,158 v28 M52,144 v14 M102,144 v14" />
        </g>
      </g>

      {/* ── 待たされているコンテナ列車。低く、岸壁の手前を走る線路に。 */}
      <rect y="190" width="400" height="6" fill="#8a8578" />
      <g fill="#6f6a5e">
        <rect x="10" y="191" width="12" height="4" />
        <rect x="46" y="191" width="12" height="4" />
        <rect x="82" y="191" width="12" height="4" />
        <rect x="118" y="191" width="12" height="4" />
        <rect x="154" y="191" width="12" height="4" />
        <rect x="190" y="191" width="12" height="4" />
        <rect x="226" y="191" width="12" height="4" />
        <rect x="262" y="191" width="12" height="4" />
        <rect x="298" y="191" width="12" height="4" />
        <rect x="334" y="191" width="12" height="4" />
        <rect x="370" y="191" width="12" height="4" />
      </g>
      <g>
        <rect x="188" y="182" width="88" height="6" fill="#4a4f52" />
        <rect x="196" y="166" width="72" height="16" fill="#e0873c" />
        <g stroke="#a85c1c" strokeWidth="1.6" fill="none">
          <path d="M208,166 v16 M222,166 v16 M236,166 v16 M250,166 v16" />
        </g>
        <rect x="284" y="182" width="88" height="6" fill="#4a4f52" />
        <rect x="292" y="166" width="72" height="16" fill="#5f7f9f" />
        <g stroke="#3f5a72" strokeWidth="1.6" fill="none">
          <path d="M304,166 v16 M318,166 v16 M332,166 v16 M346,166 v16" />
        </g>
        <g fill="#2b2f33">
          <circle cx="200" cy="190" r="4.4" />
          <circle cx="264" cy="190" r="4.4" />
          <circle cx="296" cy="190" r="4.4" />
          <circle cx="360" cy="190" r="4.4" />
        </g>
      </g>

      {/* ── 吹き流し。真横に伸びきっている=作業限界を超えた風。 */}
      <g>
        <rect x="174" y="106" width="4" height="62" fill="#8f8a7c" />
        <circle cx="176" cy="104" r="3.4" fill="#5f5a52" />
        <g className="sa-cd-sock">
          <path d="M178,108 l30,4 l-1,12 l-29,2z" fill="#e8443f" />
          <path d="M186,109 l7,1 l-1,13 l-7,1z" fill="#f2ede0" />
          <path d="M200,111 l8,1 l-1,12 l-8,1z" fill="#f2ede0" />
        </g>
      </g>

      {/* 帽子を押さえて歩く港湾労働者。 */}
      <g>
        <g fill="#2b3038">
          <rect x="146" y="192" width="5" height="14" />
          <rect x="155" y="192" width="5" height="14" />
        </g>
        <path d="M144,176 h18 l2,18 h-22z" fill="#c8e04a" />
        <rect x="143" y="184" width="20" height="3.4" fill="#f2f6e0" />
        <circle cx="154" cy="168" r="7.4" fill="#6b4a34" />
        <path d="M146,165 q8,-8 16,-1 h-16z" fill="#3f4a56" />
        {/* 片手で帽子を押さえ、もう片手は風に流れている。 */}
        <path d="M160,178 q6,-9 2,-14" stroke="#6b4a34" strokeWidth="4.2" fill="none" strokeLinecap="round" />
        <path d="M145,178 q-9,3 -12,10" stroke="#6b4a34" strokeWidth="4.2" fill="none" strokeLinecap="round" />
      </g>

      {/* ── 岸壁を転がっていく紙屑と埃。風の向きを一目で出す。 */}
      <g className="sa-cd-litter-a" fill="#f2ede0">
        <path d="M40,200 l8,-4 l5,6 l-9,3z" />
      </g>
      <g className="sa-cd-litter-b" fill="#e4dcc8">
        <path d="M20,182 l7,-3 l4,5 l-8,3z" />
      </g>
      <g className="sa-cd-litter-c" fill="#d8d0bc" opacity="0.85">
        <path d="M10,206 l9,-4 l5,5 l-10,4z" />
      </g>
      <g className="sa-cd-dust" fill="#cfc6ae" opacity="0.4">
        <ellipse cx="60" cy="204" rx="34" ry="5" />
        <ellipse cx="230" cy="200" rx="42" ry="4.4" />
      </g>

      {/* 風に流されるカモメ。ぐいと横に押されている。 */}
      <g stroke="#f2ede0" strokeWidth="2.4" fill="none">
        <path d="M300,42 q7,-6 13,-1 q7,-6 14,0" />
        <path d="M262,32 q5,-5 10,-1 q6,-5 11,0" />
      </g>

      <style>{`
        .sa-cd-cloth-a { animation: sa-cd-pour 4.4s ease-in infinite; }
        .sa-cd-cloth-b { animation: sa-cd-pour 4.4s ease-in -1.5s infinite; }
        .sa-cd-cloth-c { animation: sa-cd-pour 4.4s ease-in -3s infinite; }
        @keyframes sa-cd-pour {
          0% { transform: translate(-10px, -12px); opacity: 0; }
          25% { opacity: 0.9; }
          100% { transform: translate(24px, 34px); opacity: 0; }
        }
        .sa-cd-sock {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: sa-cd-snap 1.3s ease-in-out infinite;
        }
        @keyframes sa-cd-snap {
          0%, 100% { transform: rotate(-5deg) scaleY(1); }
          50% { transform: rotate(4deg) scaleY(1.1); }
        }
        .sa-cd-spreader {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: sa-cd-swing 2.6s ease-in-out infinite;
        }
        @keyframes sa-cd-swing {
          0%, 100% { transform: rotate(-9deg); }
          50% { transform: rotate(9deg); }
        }
        .sa-cd-chop-a { animation: sa-cd-run 2.6s linear infinite; }
        .sa-cd-chop-b { animation: sa-cd-run 3.4s linear -1.2s infinite; }
        @keyframes sa-cd-run {
          0% { transform: translateX(0); opacity: 0.2; }
          30% { opacity: 0.8; }
          100% { transform: translateX(34px); opacity: 0; }
        }
        .sa-cd-litter-a { animation: sa-cd-blow 3.2s linear infinite; }
        .sa-cd-litter-b { animation: sa-cd-blow 4.1s linear -1.6s infinite; }
        .sa-cd-litter-c { animation: sa-cd-blow 2.7s linear -0.9s infinite; }
        @keyframes sa-cd-blow {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translate(360px, -18px) rotate(560deg); opacity: 0; }
        }
        .sa-cd-dust { animation: sa-cd-haze 5s ease-in-out infinite; }
        @keyframes sa-cd-haze {
          0%, 100% { transform: translateX(0); opacity: 0.28; }
          50% { transform: translateX(26px); opacity: 0.46; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-cd-cloth-a,
          .sa-cd-cloth-b,
          .sa-cd-cloth-c,
          .sa-cd-sock,
          .sa-cd-spreader,
          .sa-cd-chop-a,
          .sa-cd-chop-b,
          .sa-cd-litter-a,
          .sa-cd-litter-b,
          .sa-cd-litter-c,
          .sa-cd-dust { animation: none; }
        }
      `}</style>
    </svg>
  );
}
