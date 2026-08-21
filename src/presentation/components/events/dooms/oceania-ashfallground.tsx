/**
 * 火山灰がすべての便を欠航させる。
 *
 * 本文の芯は3つ。**細かい灰色の灰の柱が風下へ流れること・航路にも滑走路にも
 * 同じように降ること・灰がエンジンを傷めるので全便を欠航させ、乗客と貨物が
 * ターミナルに積み上がること。**
 *
 * 欠航の3枚の描き分けで、ここは **青を1色も使わない** 担当。
 * 空も海も灰色にして、色が付いているのは噴煙の底の橙だけにする。
 * (`kingtideflood` は薄明の藍と桃、`islandhopperfog` は乳白。)
 *
 * 動くのは**斜めに降る灰・翼の上に積もっていく灰・箒を動かす貨物係・
 * 上がり続ける噴煙・止まったままのプロペラの前を通る灰**。
 * 止めた状態でも、機体が灰をかぶり、貨物が積み上がっている構図で分かる。
 */
export function OceaniaAshfallground() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灰の空。**青はどこにも無い。** */}
      <rect width="400" height="210" fill="#a8a196" />
      <rect width="400" height="58" fill="#8a857c" />
      <rect y="58" width="400" height="30" fill="#9a948a" />

      {/* 風下へ流れる灰の層。 */}
      <g className="oaf-veil1" fill="#7f7a72" opacity="0.6">
        <ellipse cx="120" cy="26" rx="150" ry="14" />
      </g>
      <g className="oaf-veil2" fill="#8f8a80" opacity="0.55">
        <ellipse cx="290" cy="50" rx="140" ry="12" />
      </g>

      {/* 噴煙の柱(右奥)。**色が付いているのはここだけ。** */}
      <g>
        <path d="M328,104L316,88h34l-10,16z" fill="#4a453c" />
        <path d="M296,104q22,-26 44,-26q24,0 34,26z" fill="#5a544a" />
        <path d="M296,104q22,-26 44,-26v26z" fill="#686156" />
        <g className="oaf-plume" fill="#b0aaa0" opacity="0.9">
          <ellipse cx="330" cy="78" rx="14" ry="9" />
          <ellipse cx="336" cy="60" rx="20" ry="12" />
          <ellipse cx="344" cy="40" rx="26" ry="15" />
          <ellipse cx="354" cy="18" rx="32" ry="17" />
        </g>
        <g className="oaf-glow" fill="#c8622f" opacity="0.85">
          <path d="M322,86l8,-11l8,11z" />
          <ellipse cx="330" cy="88" rx="12" ry="4" />
        </g>
      </g>

      {/* 灰をかぶった山と、灰色の海。 */}
      <path d="M0,104q54,-24 116,-16q60,8 104,16z" fill="#6b665c" />
      <rect y="104" width="400" height="16" fill="#7f7a70" />
      <rect y="120" width="400" height="90" fill="#b0a99c" />

      {/* ターミナルの建物(左)。**灰で屋根が白っぽい。** */}
      <g>
        <rect x="0" y="76" width="104" height="44" fill="#c2bbac" />
        <rect x="0" y="72" width="110" height="7" fill="#8f8a80" />
        <rect x="0" y="70" width="110" height="4" fill="#d8d2c6" />
        <g fill="#6b665c">
          <rect x="10" y="86" width="18" height="16" />
          <rect x="36" y="86" width="18" height="16" />
          <rect x="62" y="86" width="18" height="16" />
        </g>
        <rect x="14" y="106" width="22" height="14" fill="#5a554c" />
        {/* 管制の小塔 */}
        <rect x="84" y="44" width="20" height="30" fill="#c2bbac" />
        <rect x="80" y="34" width="28" height="12" fill="#8f8a80" />
        <rect x="82" y="36" width="24" height="8" fill="#6b665c" />
        <rect x="80" y="30" width="28" height="4" fill="#d8d2c6" />
      </g>

      {/* 駐機場。**灰が積もって輪郭が丸い。** */}
      <rect y="128" width="400" height="82" fill="#9a9488" />
      <path d="M0,128q84,-8 176,0q96,8 224,-6v12H0z" fill="#aaa397" />
      <g stroke="#847e73" strokeWidth="2.2" opacity="0.8" fill="none">
        <path d="M0,152h400M0,182h400M110,128v82M290,128v82" />
      </g>
      <g fill="#c8c2b4" opacity="0.85">
        <ellipse cx="60" cy="196" rx="58" ry="8" />
        <ellipse cx="330" cy="204" rx="66" ry="8" />
        <ellipse cx="200" cy="188" rx="44" ry="6" />
      </g>

      {/* **灰をかぶった小型機。**プロペラは止まっている。 */}
      <g>
        <ellipse cx="196" cy="180" rx="88" ry="9" fill="#6b665c" opacity="0.3" />
        {/* 胴体 */}
        <path d="M126,168q18,-16 54,-16h50q22,0 26,11q-10,12 -36,12h-72z" fill="#cfc9bc" />
        <path d="M126,168h104q2,3 2,6H130z" fill="#a8a196" />
        {/* 尾翼 */}
        <path d="M126,168l-8,-30h16l6,30z" fill="#a8a196" />
        <path d="M112,140h30v6h-30z" fill="#bfb9ac" />
        {/* 主翼。**この上に灰が積もる。** */}
        <rect x="118" y="140" width="98" height="8" rx="3" fill="#c2bbae" />
        <g className="oaf-wingash">
          <path d="M118,140h98q0,-6 -14,-7q-40,-3 -70,1q-14,2 -14,6z" fill="#e0dad0" />
        </g>
        {/* 窓と扉 */}
        <g fill="#5a554c">
          <rect x="150" y="156" width="9" height="7" rx="2" />
          <rect x="166" y="156" width="9" height="7" rx="2" />
          <rect x="188" y="155" width="13" height="9" rx="2" />
        </g>
        <path d="M204,152h20q14,0 16,8q-8,4 -20,4h-16z" fill="#b8b1a4" />
        {/* 止まったプロペラ */}
        <g>
          <rect x="240" y="146" width="4" height="26" rx="2" fill="#5a554c" />
          <circle cx="242" cy="159" r="4" fill="#7f7a70" />
        </g>
        {/* 車輪 */}
        <g fill="#3f3a34">
          <circle cx="158" cy="178" r="8" />
          <circle cx="226" cy="178" r="6" />
        </g>
        <g fill="#7f7a70">
          <circle cx="158" cy="178" r="3" />
          <circle cx="226" cy="178" r="2.4" />
        </g>
        {/* 機体に積もった灰 */}
        <g className="oaf-bodyash" fill="#ded8ce" opacity="0.9">
          <path d="M140,152q30,-4 62,0q-32,3 -62,0z" />
          <path d="M118,140q42,-4 84,0q-44,3 -84,0z" />
        </g>
      </g>

      {/* 貨物係。**翼の灰を箒で払っている。** */}
      <g>
        <ellipse cx="98" cy="196" rx="16" ry="4" fill="#6b665c" opacity="0.35" />
        <g fill="#4a453c">
          <rect x="91" y="180" width="6" height="16" rx="2" />
          <rect x="100" y="180" width="6" height="16" rx="2" />
        </g>
        <path d="M88,182l4,-28h14l4,28z" fill="#c8622f" />
        <circle cx="99" cy="148" r="8" fill="#8a6a4a" />
        <path d="M90,149a9,9 0 0 1 18,0z" fill="#e0dad0" />
        {/* マスク */}
        <rect x="93" y="150" width="12" height="5" rx="2" fill="#e8e4dc" />
        <g className="oaf-sweep">
          <path d="M108,160l22,-14" stroke="#c8622f" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M126,148l-4,-14" stroke="#8a6a3a" strokeWidth="3" fill="none" />
          <path d="M116,136h16l3,-10h-22z" fill="#a8894a" />
          <g stroke="#8a7038" strokeWidth="1.2" fill="none">
            <path d="M120,136v-9M126,136v-9M131,136v-9" />
          </g>
        </g>
      </g>

      {/* 積み上がった貨物。**運べないまま増えていく。** */}
      <g>
        <ellipse cx="330" cy="200" rx="56" ry="6" fill="#6b665c" opacity="0.3" />
        <g fill="#9a8258">
          <rect x="288" y="176" width="30" height="22" />
          <rect x="322" y="172" width="34" height="26" />
          <rect x="360" y="180" width="28" height="18" />
          <rect x="304" y="154" width="30" height="21" />
          <rect x="340" y="150" width="26" height="21" />
        </g>
        <g stroke="#7a6640" strokeWidth="1.6" fill="none">
          <path d="M288,176l30,22M318,176l-30,22M322,172l34,26M356,172l-34,26M304,154l30,21M334,154l-30,21M340,150l26,21M366,150l-26,21M360,180l28,18M388,180l-28,18" />
        </g>
        {/* 貨物の上にも灰 */}
        <g fill="#ded8ce" opacity="0.9">
          <rect x="304" y="154" width="30" height="3" />
          <rect x="340" y="150" width="26" height="3" />
          <rect x="360" y="180" width="28" height="3" />
        </g>
        <rect x="292" y="200" width="96" height="4" fill="#7f7a70" />
      </g>

      {/* 斜めに降る灰。3層。 */}
      <g className="oaf-fall1" fill="#e0dad0" opacity="0.75">
        <circle cx="24" cy="0" r="1.6" />
        <circle cx="88" cy="34" r="1.3" />
        <circle cx="150" cy="12" r="1.5" />
        <circle cx="212" cy="46" r="1.2" />
        <circle cx="276" cy="20" r="1.6" />
        <circle cx="340" cy="52" r="1.3" />
        <circle cx="382" cy="8" r="1.4" />
      </g>
      <g className="oaf-fall2" fill="#efe9e0" opacity="0.65">
        <circle cx="56" cy="18" r="1.2" />
        <circle cx="120" cy="52" r="1.5" />
        <circle cx="184" cy="28" r="1.2" />
        <circle cx="248" cy="60" r="1.4" />
        <circle cx="308" cy="34" r="1.2" />
        <circle cx="366" cy="64" r="1.5" />
      </g>
      <g className="oaf-fall3" fill="#f2ede6" opacity="0.55">
        <circle cx="12" cy="44" r="1.8" />
        <circle cx="104" cy="6" r="1.6" />
        <circle cx="200" cy="70" r="1.7" />
        <circle cx="292" cy="8" r="1.5" />
        <circle cx="352" cy="30" r="1.8" />
      </g>

      <style>{`
        .oaf-veil1 { animation: oaf-drift 11s linear infinite; }
        .oaf-veil2 { animation: oaf-drift 8s linear infinite reverse; }
        @keyframes oaf-drift {
          from { transform: translateX(-70px); }
          to   { transform: translateX(70px); }
        }
        .oaf-plume {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oaf-rise 5.6s ease-out infinite;
        }
        @keyframes oaf-rise {
          0%   { transform: translateY(16px) scale(0.82); opacity: 0.5; }
          40%  { opacity: 0.95; }
          100% { transform: translateY(-10px) scale(1.1); opacity: 0.7; }
        }
        .oaf-glow { animation: oaf-pulse 3.2s ease-in-out infinite; }
        @keyframes oaf-pulse {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 0.95; }
        }
        .oaf-fall1 { animation: oaf-drop 3.4s linear infinite; }
        .oaf-fall2 { animation: oaf-drop 4.6s linear infinite; }
        .oaf-fall3 { animation: oaf-drop 6s linear infinite; }
        @keyframes oaf-drop {
          from { transform: translate(0, -40px); }
          to   { transform: translate(-34px, 210px); }
        }
        .oaf-wingash {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oaf-pile 5.6s ease-in-out infinite;
        }
        .oaf-bodyash {
          animation: oaf-thicken 5.6s ease-in-out infinite;
        }
        @keyframes oaf-pile {
          0%, 100% { transform: scaleY(0.35); }
          60%      { transform: scaleY(1); }
        }
        @keyframes oaf-thicken {
          0%, 100% { opacity: 0.35; }
          60%      { opacity: 0.95; }
        }
        .oaf-sweep {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: oaf-brush 2.2s ease-in-out infinite;
        }
        @keyframes oaf-brush {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-13deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .oaf-veil1, .oaf-veil2, .oaf-plume, .oaf-glow, .oaf-fall1,
          .oaf-fall2, .oaf-fall3, .oaf-wingash, .oaf-bodyash, .oaf-sweep {
            animation: none;
          }
          /* 灰は積もりきった状態、箒は振り切った位置で止める。 */
          .oaf-wingash {
            transform: scaleY(1);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
          .oaf-bodyash { opacity: 0.95; }
          .oaf-sweep {
            transform: rotate(-13deg);
            transform-box: fill-box;
            transform-origin: 0% 100%;
          }
        }
      `}</style>
    </svg>
  );
}
