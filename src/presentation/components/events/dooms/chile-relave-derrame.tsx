/**
 * 尾鉱ダムがあふれる(loseProperties)。
 *
 * 本文の芯は「豪雨で上流の尾鉱ダムがあふれ、灰色の泥が川筋を伝って
 * 畑を覆い井戸を塞いだ。古い小さな堆積池はいまも雨季に見張られている」。
 *
 * 構図表:昼 / 谷の俯瞰 / 主役は**緑の畑へ広がる灰色の舌** / 人1(遠くで
 * 見ている農夫)/ 地色は畑の緑。**灰色を使うのはこの1枚だけ。**
 *
 * 動くのは**川筋を下る灰色の泥・畑へ広がる舌・ダムの上の雨雲**。
 * 止めた状態でも、覆われた畑と塞がれた井戸で分かる。惨状ではなく
 * 「色が変わってしまった土地」で語る。
 */
export function ChileRelaveDerrame() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 晴れた昼の谷。**雨はもう上流で降り終わっている。** */}
      <rect width="400" height="210" fill="#a8c4d8" />
      <rect y="52" width="400" height="30" fill="#b8ccd4" />

      {/* 上流の山と尾鉱ダム(左上) */}
      <path d="M0,82l52,-52l44,34l30,-24l46,44H0z" fill="#8a7a86" />
      <path d="M52,30l12,10l-9,5l-10,-8z" fill="#e8ecf0" />
      {/* 堆積池:段になった土手と、灰色の池 */}
      <path d="M22,60h76l8,10H16z" fill="#9a8a6c" />
      <ellipse cx="60" cy="60" rx="34" ry="7" fill="#b0b0a8" />
      <path d="M16,70h94v6H16z" fill="#8a7a5c" />
      {/* 土手の切れた箇所 */}
      <path d="M96,70l10,-8l8,10l-10,6z" fill="#b0b0a8" />
      {/* 残っている雨雲 */}
      <g className="crd-cloud" fill="#6f6a60" opacity="0.9">
        <ellipse cx="56" cy="18" rx="42" ry="12" />
        <ellipse cx="96" cy="14" rx="30" ry="10" />
      </g>

      {/* 谷の畑。区画で色を変える。 */}
      <rect y="82" width="400" height="128" fill="#7f9a5f" />
      <path d="M0,82h400v10H0z" fill="#6b8a5a" />
      <g>
        <path d="M0,100h150v30H0z" fill="#8faa5a" />
        <path d="M0,138h140v34H0z" fill="#6b9a4a" />
        <path d="M250,96h150v36H250z" fill="#9aa858" />
        <path d="M262,140h138v40H262z" fill="#7f9a4f" />
        <path d="M0,180h150v30H0z" fill="#8faa5a" />
        <path d="M270,188h130v22H270z" fill="#6b9a4a" />
      </g>
      {/* 畝 */}
      <g stroke="#5f7f3a" strokeWidth="2" opacity="0.6" fill="none">
        <path d="M8,108h130M8,120h130M258,104h130M258,116h130M270,148h120M270,160h120M8,188h130M8,198h130" />
      </g>
      {/* ポプラの列と農家 */}
      <g>
        <rect x="330" y="60" width="42" height="24" fill="#e8dcc0" />
        <path d="M324,60h54l-7,-12h-40z" fill="#a86a48" />
        <rect x="342" y="68" width="8" height="16" fill="#5a4630" />
        <rect x="360" y="66" width="7" height="7" fill="#4a6274" />
        <g fill="#4f7f3a">
          <ellipse cx="300" cy="70" rx="5" ry="13" />
          <ellipse cx="314" cy="72" rx="5" ry="13" />
        </g>
        <g fill="#5a4630">
          <rect x="299" y="80" width="2.4" height="6" />
          <rect x="313" y="82" width="2.4" height="6" />
        </g>
      </g>

      {/* 畑の柵と、逃げ出した鶏 */}
      <g fill="#6b5a3a">
        <rect x="258" y="132" width="2.4" height="9" />
        <rect x="276" y="132" width="2.4" height="9" />
        <rect x="294" y="132" width="2.4" height="9" />
        <rect x="312" y="132" width="2.4" height="9" />
      </g>
      <path d="M258,134h56M258,138h56" stroke="#6b5a3a" strokeWidth="1.4" fill="none" />
      <g>
        <ellipse cx="342" cy="188" rx="5" ry="3.6" fill="#f2ece0" />
        <circle cx="347" cy="185" r="2" fill="#f2ece0" />
        <path d="M349,185l2.6,0.8l-2.6,0.8z" fill="#f5b31c" />
        <path d="M347,183.4l-1,-2l2,0.6z" fill="#c8452f" />
        <path d="M340,191.4v3M344,191.4v3" stroke="#c8a13f" strokeWidth="1.2" fill="none" />
      </g>
      {/* 飛び立った鳥 */}
      <g stroke="#3a3a34" strokeWidth="1.4" fill="none" strokeLinecap="round">
        <path d="M186,44q3,-4 6,0q3,-4 6,0" />
        <path d="M212,36q2.6,-3.4 5.2,0q2.6,-3.4 5.2,0" />
      </g>

      {/* 川筋。**上流から灰色に変わっていく。** */}
      <path d="M108,72q30,24 24,52q-6,30 30,48q30,16 28,38h-34q2,-16 -24,-30q-40,-22 -32,-58q5,-24 -14,-42z" fill="#5b8fe8" opacity="0.65" />
      {/* 泥の本流 */}
      <g className="crd-flow">
        <path d="M104,68q36,28 28,56q-6,28 32,46q32,16 30,40h-40q0,-14 -26,-28q-42,-22 -34,-60q5,-22 -12,-40z" fill="#b0b0a8" />
        <path d="M110,74q28,24 22,50q-6,26 30,44q26,14 26,34h-14q-2,-12 -24,-24q-40,-20 -33,-56q5,-24 -13,-40z" fill="#c2c2ba" opacity="0.9" />
      </g>
      {/* 畑へ広がる舌 */}
      <g className="crd-tongue">
        <path d="M150,128q34,10 60,8q30,-2 44,10q10,9 6,20q-30,10 -68,4q-42,-7 -52,-20q-2,-14 10,-22z" fill="#b0b0a8" />
        <path d="M158,134q28,8 50,7q26,-1 38,8q6,6 4,12q-26,7 -58,2q-34,-6 -44,-15q0,-9 10,-14z" fill="#9a9a92" />
      </g>

      {/* 塞がれた井戸(舌の先) */}
      <g>
        <path d="M250,146a10,7 0 0 1 20,0v8h-20z" fill="#8a7a5c" />
        <path d="M248,144h24v4h-24z" fill="#6b5c44" />
        <path d="M252,150q8,4 16,1v5h-16z" fill="#b0b0a8" />
      </g>

      {/* 見ている農夫。**手が下りている。** */}
      <g>
        <ellipse cx="330" cy="164" rx="12" ry="3.4" fill="#000" opacity="0.16" />
        <g fill="#3f3428">
          <rect x="325" y="150" width="4.4" height="14" rx="2" />
          <rect x="332" y="150" width="4.4" height="14" rx="2" />
        </g>
        <path d="M323,152l3,-22h10l3,22z" fill="#5b8fe8" />
        <circle cx="331" cy="123" r="6.6" fill="#c98f5f" />
        <path d="M323,121h16l-2,-4h-12z" fill="#8a6f2c" />
        <path d="M324,136l-7,10M338,136l7,10" stroke="#5b8fe8" strokeWidth="4.4" strokeLinecap="round" fill="none" />
      </g>
      {/* 犬が泥の縁の匂いを嗅ぐ */}
      <g fill="#5a4630">
        <ellipse cx="296" cy="170" rx="8" ry="3.6" />
        <circle cx="288" cy="169" r="2.6" />
        <rect x="291" y="170" width="2" height="6" />
        <rect x="300" y="170" width="2" height="6" />
        <path d="M303,167q4,-3 4,-6" stroke="#5a4630" strokeWidth="1.8" fill="none" />
      </g>

      <style>{`
        .crd-flow {
          transform-box: fill-box;
          transform-origin: 20% 0%;
          animation: crd-run 6s ease-out infinite;
        }
        @keyframes crd-run {
          0% { transform: scaleY(0.12); }
          45%, 100% { transform: scaleY(1); }
        }
        .crd-tongue {
          transform-box: fill-box;
          transform-origin: 10% 40%;
          animation: crd-spread 6s ease-out infinite;
        }
        @keyframes crd-spread {
          0%, 38% { transform: scale(0.1); opacity: 0; }
          48% { opacity: 1; }
          80%, 100% { transform: scale(1); opacity: 1; }
        }
        .crd-cloud { animation: crd-drift 6s ease-in-out infinite; }
        @keyframes crd-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .crd-flow, .crd-tongue, .crd-cloud { animation: none; }
          /* 泥は流れ下り、舌は畑を覆いきった状態で止める。 */
        }
      `}</style>
    </svg>
  );
}
