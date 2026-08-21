/**
 * 前触れなく大地が揺れる(percentLoss)。
 *
 * 本文の芯は「棚が揺れ、漆喰にひびが入る。毎日何十回も記録される揺れの
 * 一つで、大きめのが近くに来ると保険と修理が貯えを食う」。
 *
 * 構図表:昼 / **7枚で唯一の室内** / 主役は揺れる食器棚と吊りランプ /
 * 人1(テーブルの下に隠れる)/ 地色はクリームの壁。
 *
 * 惨状ではなく**揺れている最中の部屋の仕草**で描く:部屋全体が小刻みに
 * 揺れ、ランプが振り子になり、皿が棚の縁へ滑り、壁のひびが伸びる。
 * 止めた状態でも、傾いた額と皿・テーブル下の人で「地震」と分かる。
 */
export function ChileTerremoto() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      <rect width="400" height="210" fill="#e8dcc0" />
      {/* 部屋ごと揺れるグループ */}
      <g className="cte-room">
        {/* 壁と床 */}
        <rect width="400" height="150" fill="#efe6cc" />
        <rect y="150" width="400" height="60" fill="#a8794a" />
        <path d="M0,150h400v5H0z" fill="#8a6238" />
        <path d="M40,210V155M120,210V155M200,210V155M280,210V155M360,210V155" stroke="#8a6238" strokeWidth="2" opacity="0.5" fill="none" />

        {/* 窓の外の街と山(昼) */}
        <rect x="252" y="28" width="82" height="62" fill="#8fc4e8" />
        <path d="M252,66l20,-16l16,10l14,-14l32,20v24h-82z" fill="#9a8a86" />
        <path d="M272,50l6,5l-5,3l-6,-4z" fill="#f2f4f6" />
        <rect x="258" y="76" width="10" height="14" fill="#b0a08a" />
        <rect x="274" y="80" width="10" height="10" fill="#b0a08a" />
        <rect x="248" y="24" width="90" height="5" fill="#8a6f4a" />
        <rect x="248" y="90" width="90" height="5" fill="#8a6f4a" />
        <rect x="290" y="28" width="4" height="62" fill="#8a6f4a" />

        {/* 壁のひび。**揺れのあいだに伸びる。** */}
        <g stroke="#b8a888" strokeWidth="2" fill="none" strokeLinecap="round">
          <path className="cte-crack" d="M198,8l-8,16l10,12l-7,14l9,10" />
          <path d="M60,4l6,12l-5,8" opacity="0.7" />
        </g>

        {/* 傾いた額(無地の絵) */}
        <g className="cte-frame">
          <rect x="66" y="34" width="34" height="26" fill="#8a6f4a" />
          <rect x="70" y="38" width="26" height="18" fill="#7fae8a" />
          <path d="M70,52l8,-8l6,4l8,-9" stroke="#4f7f5a" strokeWidth="2" fill="none" />
        </g>

        {/* 壁の時計。振り子ごと傾いている。 */}
        <g className="cte-clock">
          <circle cx="150" cy="40" r="12" fill="#f2ece0" stroke="#8a6f4a" strokeWidth="3" />
          <path d="M150,40V32M150,40l6,4" stroke="#33302c" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <circle cx="150" cy="40" r="1.6" fill="#33302c" />
        </g>

        {/* 床に落ちて割れたカップとこぼれたコーヒー */}
        <g>
          <ellipse cx="122" cy="196" rx="12" ry="3.4" fill="#6b4a2a" opacity="0.6" />
          <path d="M112,190l6,-4l3,3l-4,4z" fill="#e8b45a" />
          <path d="M124,186l5,2l-2,4l-5,-1z" fill="#e8b45a" />
        </g>

        {/* 食器棚(左)。皿が縁へ滑る。 */}
        <g>
          <rect x="8" y="70" width="112" height="80" fill="#8a6238" />
          <rect x="14" y="76" width="100" height="30" fill="#6b4a2a" />
          <rect x="14" y="112" width="100" height="32" fill="#6b4a2a" />
          <path d="M8,70h112v-6H8z" fill="#7a552f" />
          {/* 上段の皿。1枚が傾いて縁から出ている。 */}
          <g fill="#f2ece0">
            <ellipse cx="34" cy="102" rx="12" ry="4" />
            <ellipse cx="62" cy="102" rx="12" ry="4" />
            <g className="cte-plate">
              <ellipse cx="98" cy="100" rx="12" ry="4" />
            </g>
          </g>
          <path d="M22,102h24M50,102h24" stroke="#c8bfa8" strokeWidth="1.4" fill="none" />
          {/* 下段のカップが跳ねる */}
          <g fill="#e8b45a">
            <g className="cte-cup1"><rect x="26" y="134" width="10" height="10" rx="2" /></g>
            <g className="cte-cup2"><rect x="56" y="134" width="10" height="10" rx="2" /></g>
            <rect x="86" y="134" width="10" height="10" rx="2" />
          </g>
        </g>

        {/* 吊りランプ。振り子になる。 */}
        <g className="cte-lamp">
          <path d="M200,0v34" stroke="#5a4630" strokeWidth="2.4" fill="none" />
          <path d="M188,46a12,12 0 0 1 24,0z" fill="#c8a13f" />
          <circle cx="200" cy="40" r="4" fill="#f5d34c" />
        </g>

        {/* テーブルと、その下に隠れた人。**教わったとおりの正しい行動。** */}
        <g>
          <ellipse cx="200" cy="196" rx="60" ry="6" fill="#000" opacity="0.14" />
          <rect x="148" y="150" width="104" height="8" rx="2" fill="#8a6f4a" />
          <rect x="154" y="158" width="8" height="36" fill="#7a552f" />
          <rect x="238" y="158" width="8" height="36" fill="#7a552f" />
          <g>
            <circle cx="200" cy="172" r="8" fill="#c98f5f" />
            <path d="M188,192q0,-14 12,-14q12,0 12,14z" fill="#4f9a5f" />
            <path d="M191,176l-5,8M209,176l5,8" stroke="#c98f5f" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M195,169q5,-4 10,0" stroke="#33302c" strokeWidth="1.4" fill="none" />
          </g>
        </g>

        {/* 倒れた椅子 */}
        <g transform="rotate(-74 320 196)">
          <rect x="308" y="160" width="26" height="6" fill="#8a6f4a" />
          <rect x="310" y="166" width="5" height="26" fill="#7a552f" />
          <rect x="327" y="166" width="5" height="26" fill="#7a552f" />
          <rect x="310" y="132" width="5" height="30" fill="#7a552f" />
          <rect x="327" y="132" width="5" height="30" fill="#7a552f" />
          <rect x="308" y="132" width="26" height="6" fill="#8a6f4a" />
        </g>
      </g>

      <style>{`
        .cte-room { animation: cte-shake 0.42s linear infinite; }
        @keyframes cte-shake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-3px, 1px); }
          50% { transform: translate(2px, -1px); }
          75% { transform: translate(-1px, 2px); }
        }
        .cte-lamp {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: cte-swing 1.6s ease-in-out infinite;
        }
        @keyframes cte-swing {
          0%, 100% { transform: rotate(-13deg); }
          50% { transform: rotate(13deg); }
        }
        .cte-frame {
          transform-box: fill-box;
          transform-origin: 50% 10%;
          animation: cte-tilt 1.6s ease-in-out infinite;
        }
        @keyframes cte-tilt {
          0%, 100% { transform: rotate(-7deg); }
          50% { transform: rotate(3deg); }
        }
        .cte-plate {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cte-slide 3.2s ease-in-out infinite;
        }
        @keyframes cte-slide {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          60%, 85% { transform: translateX(9px) rotate(10deg); }
        }
        .cte-cup1 { animation: cte-hop 0.42s linear infinite; }
        .cte-cup2 { animation: cte-hop 0.42s linear 0.2s infinite; }
        @keyframes cte-hop {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .cte-clock {
          transform-box: fill-box;
          transform-origin: 50% 8%;
          animation: cte-clocktilt 1.6s ease-in-out infinite;
        }
        @keyframes cte-clocktilt {
          0%, 100% { transform: rotate(9deg); }
          50% { transform: rotate(-4deg); }
        }
        .cte-crack {
          stroke-dasharray: 70;
          animation: cte-grow 4.8s ease-out infinite;
        }
        @keyframes cte-grow {
          0% { stroke-dashoffset: 70; }
          55%, 100% { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cte-room, .cte-lamp, .cte-frame, .cte-plate, .cte-cup1, .cte-cup2, .cte-crack, .cte-clock {
            animation: none;
          }
          /* ランプと額と時計は振れた角度、皿は縁まで滑った位置、ひびは伸びきった状態で止める。 */
          .cte-lamp { transform: rotate(-13deg); transform-box: fill-box; transform-origin: 50% 0%; }
          .cte-frame { transform: rotate(-7deg); transform-box: fill-box; transform-origin: 50% 10%; }
          .cte-clock { transform: rotate(9deg); transform-box: fill-box; transform-origin: 50% 8%; }
          .cte-plate { transform: translateX(9px) rotate(10deg); transform-box: fill-box; transform-origin: 50% 100%; }
          .cte-crack { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}
