/**
 * からっ風が止まない。四日続けば、持ち物のすべてに砂が入る。
 * 縫い目にも、食べ物にも、錠の中にも。
 *
 * ## 描き直しでやったこと
 *
 * 前の絵は、**空1枚と地面1枚のあいだに人が1人立っているだけ**だった。
 * 他の6枚と同じ赤いシャツ・同じ片腕の上げかたで、**7枚とも同じ人**になっていた。
 *
 * - 人は**自転車を押して風上へ進む人**にした。前かがみの姿勢と、
 *   後ろへ流れる襟巻きで、**止まっていても風向きが分かる**
 * - 中景を入れた。**屋敷林**(母屋の西側にだけ木を植えて風を切る、この平野の作り)、
 *   電柱の列、砂よけの簀垣、畑の畝
 * - 遠景の山は**双耳峰**にした。この盤面のクイズが「頂上が二つ」を訊いている
 *
 * **動くものは1つだけ**——ひと吹きの砂が右へ流れる。
 * 砂は何本かの筋だが、ひとつの `<g>` にまとめて同じ動きをさせている
 * (別々に動かすと、目で追う先が増えて何を見ればよいか分からなくなる)。
 */
export function IbarakiKarakkazeDoom() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冬の乾いた空。地面に近いほど砂で白く濁る。 */}
      <rect width="400" height="210" fill="#7d8ba1" />
      <rect y="34" width="400" height="26" fill="#94a0b2" />
      <rect y="60" width="400" height="20" fill="#adb4bd" />
      <rect y="80" width="400" height="18" fill="#c2c0b4" />
      <circle cx="336" cy="56" r="16" fill="#e8e0c4" opacity="0.8" />

      {/* 風の下りてくる山。**頂が二つ。** */}
      <path d="M8,98 L58,40 L92,74 L118,44 L168,98z" fill="#535c70" />
      <path d="M58,40 L92,74 L74,98 L34,98z" fill="#5f6a80" />
      <path d="M118,44 L136,64 L124,98 L100,98z" fill="#5f6a80" />
      <g fill="#c8ccd4">
        <path d="M58,40 L68,52 L48,52z" />
        <path d="M118,44 L127,56 L109,56z" />
      </g>

      {/* 遠景の林。 */}
      <rect y="94" width="400" height="6" fill="#39492f" />
      <g fill="#43563a">
        <ellipse cx="196" cy="93" rx="20" ry="6" />
        <ellipse cx="368" cy="93" rx="22" ry="6" />
      </g>

      {/* 吹きさらしの畑。 */}
      <rect y="98" width="400" height="112" fill="#a89468" />
      <rect y="98" width="400" height="5" fill="#bda67a" />

      {/* 屋敷林と母屋。**風上の側にだけ木を立てて風を切る**、この平野の作り。 */}
      <g>
        <path d="M232,104 L232,52 Q248,44 262,52 L262,104z" fill="#2f4030" />
        <path d="M236,104 L236,58 Q246,52 252,56 L252,104z" fill="#3a4f38" />
        <ellipse cx="240" cy="52" rx="12" ry="8" fill="#2f4030" />
        <ellipse cx="256" cy="56" rx="11" ry="7" fill="#2f4030" />
      </g>
      <g stroke="#26221c" strokeWidth="2" strokeLinejoin="round">
        <rect x="262" y="78" width="74" height="26" fill="#b7a882" />
        <path d="M256,78 L299,60 L342,78z" fill="#6a6f74" />
        <rect x="256" y="76" width="86" height="5" fill="#7d8288" />
        <rect x="274" y="86" width="16" height="18" fill="#4a4238" />
        <rect x="302" y="86" width="20" height="12" fill="#8e836a" />
      </g>

      {/* 電柱の列。奥ほど小さくして、平野の広さを出す。 */}
      <g stroke="#6b6252" strokeWidth="3" strokeLinecap="round">
        <path d="M212,104 L212,84" />
        <path d="M206,88 L218,88" />
        <path d="M158,110 L158,78" />
        <path d="M150,84 L166,84" />
        <path d="M74,120 L74,66" />
        <path d="M62,74 L86,74" />
      </g>
      <g stroke="#6b6252" strokeWidth="1.5" fill="none">
        <path d="M74,72 Q116,80 158,82" />
        <path d="M158,82 Q186,86 212,86" />
      </g>

      {/* 砂よけの簀垣。板の隙間から砂が抜ける。 */}
      <g>
        <rect x="12" y="118" width="120" height="26" fill="#8a7748" />
        <g stroke="#6f5f38" strokeWidth="3">
          <path d="M22,118 L22,144" />
          <path d="M38,118 L38,144" />
          <path d="M54,118 L54,144" />
          <path d="M70,118 L70,144" />
          <path d="M86,118 L86,144" />
          <path d="M102,118 L102,144" />
          <path d="M118,118 L118,144" />
        </g>
        <rect x="10" y="116" width="124" height="5" fill="#9c8a58" />
      </g>

      {/* 畑の畝。奥へ収束させる。 */}
      <g stroke="#96835a" strokeWidth="3" fill="none">
        <path d="M400,120 L150,106" />
        <path d="M400,142 L146,116" />
        <path d="M400,172 L138,130" />
        <path d="M400,204 L128,148" />
      </g>

      {/* 千切れかけた赤い布を巻いた杭。災難の赤はここだけ。 */}
      <g stroke="#26221c" strokeWidth="2" strokeLinejoin="round">
        <rect x="352" y="128" width="5" height="34" fill="#6b5c46" />
        <path d="M357,130 q18,-4 30,6 q-16,2 -30,10z" fill="#e05252" />
      </g>

      {/* 自転車を押して風上へ進む人。**前かがみと後ろへ流れる襟巻き**で、
          止まっていても風の向きが分かるようにする。 */}
      <g strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="186" cy="196" rx="52" ry="6" fill="#8a7748" />
        {/* 自転車。人より先に描く。横から見ているので、人が半分を隠す。 */}
        <g fill="none" stroke="#2a2630">
          <circle cx="150" cy="178" r="18" strokeWidth="3.5" />
          <circle cx="208" cy="178" r="18" strokeWidth="3.5" />
          <path d="M150,178 L156,146 L194,142 L208,178" strokeWidth="3" />
          <path d="M156,146 L182,178 L194,142" strokeWidth="3" />
          <path d="M156,146 L146,139" strokeWidth="3" />
          <path d="M138,136 L154,142" strokeWidth="3.5" />
        </g>
        {/* 前かご。畑からの帰りなので中身を少し出しておく。 */}
        <g stroke="#26221c" strokeWidth="2">
          <rect x="124" y="150" width="28" height="18" rx="2" fill="#9c8a58" />
          <path d="M130,150 L126,136 M138,150 L138,134 M146,150 L151,137" stroke="#4f6b3c" strokeWidth="3" />
        </g>
        {/* 押している人。**広がる形は襟巻きひとつだけ**にする。
            上着の裾も広げたら、二枚重なって翼に見えた。 */}
        <path d="M198,168 L208,182 L204,196" stroke="#2f2c34" strokeWidth="10" fill="none" />
        <path d="M196,168 L184,182 L176,194" stroke="#3d3a42" strokeWidth="10" fill="none" />
        <path d="M198,170 L192,136" stroke="#3d5a7a" strokeWidth="24" fill="none" />
        <path d="M186,166 L210,168 L212,178 L184,176z" fill="#33506e" />
        {/* 襟巻き。**頭より先に描く。**あとに描いたら顔から出ているように見えた。
            先を割っておく。まっすぐな三角にすると赤い槍になる。 */}
        <path
          d="M192,130 q20,-7 38,-2 q-7,4 -14,3 q7,4 -2,6 q-12,2 -22,-1z"
          fill="#e05252"
          stroke="#a83c3c"
          strokeWidth="1.5"
        />
        {/* 腕。**袖と前腕を塗り分ける。**全部を肌色にすると、板が横たわって見えた。 */}
        <path d="M192,139 L174,143" stroke="#3d5a7a" strokeWidth="10" fill="none" />
        <path d="M174,143 L158,148" stroke="#d9a273" strokeWidth="7" fill="none" />
        <circle cx="155" cy="149" r="5.5" fill="#d9a273" />
        <circle cx="187" cy="124" r="12" fill="#d9a273" />
        <path d="M175,124 a12,12 0 0 1 24,0z" fill="#4a4250" />
        <rect x="173" y="121" width="26" height="5" rx="2" fill="#4a4250" />
      </g>

      {/* 足もとの枯れ草。すべて風下へ倒す。静物。 */}
      <g stroke="#8a7748" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M40,200 q10,-14 26,-16 M46,202 q12,-10 24,-10" />
        <path d="M104,206 q12,-14 28,-16 M112,208 q12,-10 26,-10" />
        <path d="M300,200 q10,-14 26,-16 M306,202 q12,-10 24,-10" />
      </g>

      {/* ひと吹きの砂。**ここだけが動く。** */}
      <g className="ikkz-dust" fill="none" stroke="#e0d3b4" strokeLinecap="round">
        <path d="M20,124 q40,-8 84,-2" strokeWidth="3.5" opacity="0.85" />
        <path d="M8,152 q56,-10 110,-4" strokeWidth="3" opacity="0.7" />
        <path d="M36,178 q46,-9 92,-3" strokeWidth="2.5" opacity="0.6" />
        <path d="M0,198 q50,-8 96,-2" strokeWidth="3" opacity="0.5" />
      </g>

      <style>{`
        .ikkz-dust {
          transform-box: fill-box;
          transform-origin: 0 50%;
          animation: ikkz-gust 2.1s linear infinite;
        }
        @keyframes ikkz-gust {
          0%   { transform: translateX(-40px); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(300px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ikkz-dust { animation: none; }
        }
      `}</style>
    </svg>
  );
}
