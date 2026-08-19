/**
 * 逃げ切れない大雨警報。九州は毎年、梅雨前線がまず通る場所にある。
 * 警報が出た時には、水はもう戸口まで来ていることが多い。
 *
 * 夕方・豪雨。**低い目線の中景**。主役は戸口まで来た水と、防災無線のスピーカー。
 * 人は**2人**、高台の石段を上っていく。動くのは雨脚・水面・音の輪。
 */
export function KyushuGouuKeihou() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨の夕空。 */}
      <rect width="400" height="210" fill="#4a5460" />
      <rect y="0" width="400" height="70" fill="#5a6470" />
      <g fill="#3f4852" opacity="0.85">
        <ellipse cx="70" cy="16" rx="90" ry="20" />
        <ellipse cx="240" cy="10" rx="110" ry="18" />
        <ellipse cx="370" cy="20" rx="70" ry="16" />
      </g>

      {/* 山あいの稜線。 */}
      <path
        d="M0,70 L54,38 L96,62 L150,30 L206,66 L262,36 L320,64 L400,40 V80 H0z"
        fill="#39463f"
      />
      <g fill="#2f3a34">
        <path d="M20,70l-7,-16l7,-3l7,3zM120,66l-6,-14l6,-3l6,3zM290,64l-7,-15l7,-3l7,3z" />
      </g>

      {/* 町並み。瓦屋根が雨に濡れている。 */}
      <rect y="72" width="400" height="52" fill="#4a5148" />
      <g fill="#d8d2c2">
        <rect x="12" y="88" width="60" height="36" />
        <rect x="82" y="94" width="52" height="30" />
        <rect x="268" y="90" width="56" height="34" />
        <rect x="332" y="96" width="54" height="28" />
      </g>
      <g fill="#39424b">
        <path d="M4,88h76l-11,-14H15z" />
        <path d="M74,94h68l-10,-12H84z" />
        <path d="M260,90h72l-10,-13h-52z" />
        <path d="M324,96h70l-10,-12h-50z" />
      </g>
      <g fill="#2f3640">
        <rect x="4" y="86" width="76" height="3" />
        <rect x="74" y="92" width="68" height="3" />
        <rect x="260" y="88" width="72" height="3" />
        <rect x="324" y="94" width="70" height="3" />
      </g>
      {/* 灯りのついた窓と、開いたままの戸口。 */}
      <g fill="#f5b31c" opacity="0.9">
        <rect x="20" y="98" width="12" height="10" />
        <rect x="52" y="98" width="12" height="10" />
        <rect x="92" y="102" width="11" height="9" />
        <rect x="278" y="100" width="12" height="10" />
        <rect x="344" y="104" width="11" height="9" />
      </g>
      <rect x="34" y="110" width="18" height="14" fill="#3a3226" />
      <rect x="292" y="110" width="18" height="14" fill="#3a3226" />

      {/* 防災無線の柱とスピーカー。**音の輪が出る。** */}
      <rect x="196" y="40" width="8" height="90" fill="#6f7680" />
      <g fill="#8a9096">
        <path d="M182,52h18l6,-6v22l-6,-6h-18z" />
        <rect x="198" y="46" width="10" height="16" rx="3" />
      </g>
      <g className="kgk-ring" fill="none" stroke="#f5b31c" strokeWidth="2.4">
        <path d="M176,44q-10,13 0,26" />
        <path d="M168,38q-16,19 0,38" opacity="0.7" />
        <path d="M160,32q-22,25 0,50" opacity="0.45" />
      </g>

      {/* 戸口まで来た水。**水面がわずかに上下する。** */}
      <g className="kgk-water">
        <rect y="120" width="400" height="90" fill="#5a6b64" />
        <rect y="120" width="400" height="4" fill="#8fa89c" />
        <path
          d="M0,132q46,-6 92,2q48,7 96,-2q50,-7 100,2q44,7 112,-4v14H0z"
          fill="#4f6058"
          opacity="0.9"
        />
        <g stroke="#8fa89c" strokeWidth="2" opacity="0.55" fill="none">
          <path d="M20,148h64M200,158h90M110,172h70M290,180h84M40,194h80" />
        </g>
        {/* 流されている物。 */}
        <g fill="#8a6a44">
          <rect
            x="130"
            y="152"
            width="34"
            height="7"
            rx="2"
            transform="rotate(-6 147 155)"
          />
          <rect
            x="248"
            y="176"
            width="26"
            height="6"
            rx="2"
            transform="rotate(5 261 179)"
          />
        </g>
        <g fill="#c2453c">
          <path d="M312,164q10,-8 20,0q-8,6 -20,0z" />
        </g>
      </g>

      {/* 高台へ上がる石段と、上っていく2人。 */}
      <g fill="#8a8272">
        <path d="M356,210v-8h44v8z" />
        <path d="M362,202v-8h38v8z" />
        <path d="M368,194v-8h32v8z" />
        <path d="M374,186v-8h26v8z" />
        <path d="M380,178v-9h20v9z" />
      </g>
      <g fill="#a09884">
        <rect x="356" y="202" width="44" height="2" />
        <rect x="362" y="194" width="38" height="2" />
        <rect x="368" y="186" width="32" height="2" />
        <rect x="374" y="178" width="26" height="2" />
      </g>
      {/* 傘をさして上る大人。 */}
      <g>
        <rect x="374" y="176" width="4" height="16" fill="#3f4852" />
        <rect x="380" y="176" width="4" height="16" fill="#3f4852" />
        <path d="M372,160h14l2,17h-18z" fill="#e8443f" />
        <circle cx="379" cy="155" r="5" fill="#e0b48a" />
        <path d="M379,150v-6" stroke="#3a3d42" strokeWidth="1.6" fill="none" />
        <path d="M364,144q15,-11 30,0z" fill="#3f5aa0" />
        <path d="M364,144q7,-4 15,-4v4z" fill="#4f6ab0" />
      </g>
      {/* 手を引かれる子ども。 */}
      <g>
        <rect x="392" y="184" width="3.4" height="12" fill="#3f4852" />
        <rect x="397" y="184" width="3.4" height="12" fill="#3f4852" />
        <path d="M390,172h11l1.6,13h-14z" fill="#f5b31c" />
        <circle cx="395.6" cy="167" r="4.2" fill="#e0b48a" />
      </g>
      <path
        d="M384,158L392,174"
        stroke="#e0b48a"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* 雨脚。**画面いっぱいに斜めに落ちる。** */}
      <g
        className="kgk-rain"
        stroke="#c8dae4"
        strokeWidth="1.8"
        opacity="0.65"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M10,-20l-8,26M46,-30l-8,26M84,-14l-8,26M120,-26l-8,26M158,-18l-8,26M196,-32l-8,26M232,-16l-8,26M270,-28l-8,26M306,-20l-8,26M344,-30l-8,26M380,-14l-8,26" />
        <path d="M28,14l-8,26M64,4l-8,26M102,20l-8,26M140,8l-8,26M176,18l-8,26M214,2l-8,26M250,20l-8,26M288,6l-8,26M324,16l-8,26M362,4l-8,26" />
        <path d="M16,48l-8,26M52,38l-8,26M90,54l-8,26M128,42l-8,26M164,52l-8,26M202,36l-8,26M238,54l-8,26M276,40l-8,26M312,50l-8,26M350,38l-8,26" />
      </g>

      <style>{`
        .kgk-rain {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: kgk-pour 0.62s linear infinite;
        }
        @keyframes kgk-pour {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(-10px, 34px); }
        }
        .kgk-water {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: kgk-rise 4.4s ease-in-out infinite;
        }
        @keyframes kgk-rise {
          0%, 100% { transform: translateY(4px); }
          50%      { transform: translateY(-3px); }
        }
        .kgk-ring {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: kgk-call 2.2s ease-out infinite;
        }
        @keyframes kgk-call {
          0%   { opacity: 0.2; transform: scale(0.7); }
          40%  { opacity: 1; transform: scale(1); }
          100% { opacity: 0.2; transform: scale(1.12); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kgk-rain, .kgk-water, .kgk-ring { animation: none; }
          .kgk-water { transform: translateY(0); transform-box: fill-box; }
          .kgk-ring { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
