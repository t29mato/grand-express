/**
 * 混み合う地下鉄でスリに遭う(steal)。
 *
 * 本文の芯は「ラッシュの車内で、ドアの音にまぎれて、開いたバッグから
 * 携帯が一駅ぶんのあいだに抜き取られた」。
 *
 * 構図表:地下(人工照明)/ 地下鉄の車内近景 / 主役は**バッグから
 * 抜かれていく携帯** / 人5(吊り革の乗客の列)/ 地色は車内の白と
 * サンティアゴ地下鉄の赤いドア。
 *
 * 動くのは**車両の揺れ・吊り革・窓の外を流れるトンネルの灯り・
 * するりと抜かれる携帯**。止めた状態でも、携帯が半分抜き出され、
 * 持ち主がよそ見をしている構図で分かる。
 */
export function ChileLanzaMetro() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 車内全体がゆれるグループ */}
      <g className="clm-car">
        {/* 車内の壁と床 */}
        <rect width="400" height="210" fill="#e4e0d4" />
        <rect y="160" width="400" height="50" fill="#8a8e92" />
        <path d="M0,160h400v4H0z" fill="#6b7076" />

        {/* 窓。外はトンネルの闇と流れる灯り。 */}
        <g>
          <rect x="16" y="26" width="110" height="46" rx="4" fill="#141414" />
          <rect x="146" y="26" width="110" height="46" rx="4" fill="#141414" />
          <rect x="276" y="26" width="110" height="46" rx="4" fill="#141414" />
          <g className="clm-lights" fill="#f5d34c" opacity="0.7">
            <rect x="30" y="44" width="16" height="5" rx="2.5" />
            <rect x="96" y="44" width="16" height="5" rx="2.5" />
            <rect x="162" y="44" width="16" height="5" rx="2.5" />
            <rect x="228" y="44" width="16" height="5" rx="2.5" />
            <rect x="294" y="44" width="16" height="5" rx="2.5" />
            <rect x="360" y="44" width="16" height="5" rx="2.5" />
          </g>
        </g>
        {/* 赤いドア(サンティアゴ地下鉄の色)。右端。 */}
        <g>
          <rect x="352" y="20" width="48" height="140" fill="#c8452f" />
          <rect x="374" y="20" width="4" height="140" fill="#8a2f20" />
          <rect x="358" y="34" width="14" height="34" rx="3" fill="#141414" />
          <rect x="382" y="34" width="14" height="34" rx="3" fill="#141414" />
        </g>

        {/* 手すりと吊り革 */}
        <rect y="14" width="400" height="5" fill="#9aa2a8" />
        <g className="clm-straps">
          <g stroke="#7f888e" strokeWidth="3" fill="none">
            <path d="M60,19v16M140,19v16M215,19v16M290,19v16" />
          </g>
          <g fill="none" stroke="#5f6874" strokeWidth="3.4">
            <circle cx="60" cy="41" r="6" />
            <circle cx="140" cy="41" r="6" />
            <circle cx="215" cy="41" r="6" />
            <circle cx="290" cy="41" r="6" />
          </g>
        </g>

        {/* 乗客の列。肩がぶつかる密度。 */}
        {/* 1: 新聞を読む人(左端) */}
        <g>
          <ellipse cx="48" cy="204" rx="16" ry="4" fill="#000" opacity="0.16" />
          <path d="M36,206l4,-52h16l4,52z" fill="#4f9a5f" />
          <circle cx="48" cy="146" r="9" fill="#8a6a4a" />
          <path d="M39,144h18l-2,-5H41z" fill="#33302c" />
          <path d="M34,168l-6,10l12,4z" fill="#f6f2e4" />
          <path d="M32,172l8,3M31,176l8,3" stroke="#8a8478" strokeWidth="1" fill="none" />
        </g>
        {/* 2: 被害に遭う人。**顔は窓の外、バッグは背中側で口が開いている。** */}
        <g>
          <ellipse cx="128" cy="206" rx="17" ry="4" fill="#000" opacity="0.16" />
          <path d="M116,208l4,-54h17l4,54z" fill="#3f5f9f" />
          <circle cx="128" cy="146" r="9.4" fill="#c98f5f" />
          {/* 顔が左(窓)を向いている:目の位置で示す */}
          <path d="M121,144q2,-1.6 4,-0.6M121,148q3,1 5,0" stroke="#33302c" strokeWidth="1.2" fill="none" />
          <path d="M139,160l8,14" stroke="#3f5f9f" strokeWidth="5.4" strokeLinecap="round" fill="none" />
          {/* 肩掛けバッグ。口が開いている。 */}
          <path d="M132,152l14,4" stroke="#8a6f2c" strokeWidth="2.6" fill="none" />
          <path d="M142,156h16q3,0 3,4v10q0,4 -4,4h-14q-4,0 -4,-4v-10q0,-4 3,-4z" fill="#c8a13f" />
          <path d="M141,158q9,-3 21,0" stroke="#8a6f2c" strokeWidth="2" fill="none" />
        </g>
        {/* 抜かれていく携帯 */}
        <g className="clm-phone">
          <rect x="148" y="150" width="9" height="16" rx="2" fill="#33302c" />
          <rect x="150" y="153" width="5" height="9" rx="1" fill="#5b8fe8" />
        </g>
        {/* 3: スリ。体は前を向き、腕だけ後ろへ。 */}
        <g>
          <ellipse cx="196" cy="206" rx="16" ry="4" fill="#000" opacity="0.16" />
          <path d="M185,208l4,-52h15l4,52z" fill="#6b7278" />
          <circle cx="196" cy="148" r="9" fill="#c98f5f" />
          <path d="M187,145h18l-2,-5h-14z" fill="#5f6874" />
          {/* 素知らぬ顔:正面向きの目 */}
          <path d="M192,147h2M199,147h2" stroke="#33302c" strokeWidth="1.4" fill="none" />
          {/* 後ろへ伸びる腕 */}
          <g className="clm-arm">
            <path d="M186,162q-14,-2 -26,-6" stroke="#6b7278" strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="158" cy="155" r="4" fill="#c98f5f" />
          </g>
          {/* 表の手は吊り革へ(アリバイ) */}
          <path d="M206,158l8,-18" stroke="#6b7278" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
        {/* 4: イヤホンの人(気づかない) */}
        <g>
          <ellipse cx="262" cy="204" rx="16" ry="4" fill="#000" opacity="0.16" />
          <path d="M251,206l4,-50h15l4,50z" fill="#e8884f" />
          <circle cx="262" cy="148" r="9" fill="#8a6a4a" />
          <path d="M253,146q0,-8 9,-8q9,0 9,8" stroke="#f2f4f6" strokeWidth="2.4" fill="none" />
          <circle cx="253" cy="148" r="2.4" fill="#f2f4f6" />
          <circle cx="271" cy="148" r="2.4" fill="#f2f4f6" />
          <path d="M256,151q6,4 12,0" stroke="#33302c" strokeWidth="1.4" fill="none" />
        </g>
        {/* 5: ドア際で降りる支度の人 */}
        <g>
          <ellipse cx="330" cy="206" rx="15" ry="4" fill="#000" opacity="0.16" />
          <path d="M320,208l4,-50h13l4,50z" fill="#c86a9a" />
          <circle cx="330" cy="150" r="8.6" fill="#c98f5f" />
          <path d="M338,164l10,10" stroke="#c86a9a" strokeWidth="5" strokeLinecap="round" fill="none" />
          <rect x="344" y="172" width="12" height="16" rx="2" fill="#5a4630" />
        </g>

        {/* 路線図(文字なし:点と線) */}
        <g>
          <rect x="150" y="86" width="104" height="10" rx="4" fill="#f2f4f6" />
          <path d="M158,91h88" stroke="#c8452f" strokeWidth="2.4" fill="none" />
          <g fill="#33302c">
            <circle cx="166" cy="91" r="2" />
            <circle cx="186" cy="91" r="2" />
            <circle cx="206" cy="91" r="2" />
            <circle cx="226" cy="91" r="2" />
            <circle cx="242" cy="91" r="2" />
          </g>
        </g>
      </g>

      <style>{`
        .clm-car { animation: clm-rattle 0.9s linear infinite; }
        @keyframes clm-rattle {
          0%, 100% { transform: translate(0, 0); }
          30% { transform: translate(-1.6px, 1px); }
          60% { transform: translate(1.4px, -1px); }
        }
        .clm-straps {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: clm-swing 1.8s ease-in-out infinite;
        }
        @keyframes clm-swing {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        .clm-lights { animation: clm-pass 1.4s linear infinite; }
        @keyframes clm-pass {
          0% { transform: translateX(0); opacity: 0.7; }
          100% { transform: translateX(-66px); opacity: 0.7; }
        }
        .clm-phone { animation: clm-slip 4.2s ease-in-out infinite; }
        @keyframes clm-slip {
          0%, 30% { transform: translate(0, 8px) rotate(0deg); }
          60% { transform: translate(2px, 0) rotate(-8deg); }
          80%, 100% { transform: translate(6px, -2px) rotate(-14deg); }
        }
        .clm-arm {
          transform-box: fill-box;
          transform-origin: 100% 80%;
          animation: clm-reach 4.2s ease-in-out infinite;
        }
        @keyframes clm-reach {
          0%, 25% { transform: rotate(10deg); }
          55%, 100% { transform: rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .clm-car, .clm-straps, .clm-lights, .clm-phone, .clm-arm { animation: none; }
          /* 携帯はバッグから半分抜き出された位置で止める。 */
          .clm-phone { transform: translate(2px, 0) rotate(-8deg); }
        }
      `}</style>
    </svg>
  );
}
