/**
 * 鼻の利く犬を連れた農家について行き、掘り出したトリュフの分け前をもらう(ラルベンク)。
 *
 *   - 樫の木の下で犬が鼻を落とし、前足で土を掻く
 *   - 掻いた先から黒いトリュフが現れる
 *   - 市の籠にはすでに何個か入っていて、支払いは現金で舞い上がる
 */
export function TruffeLalbenque() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冬の低い日ざしの空 */}
      <rect width="400" height="210" fill="#c9b98c" />
      <rect width="400" height="72" fill="#a8bcc8" />
      <rect y="60" width="400" height="18" fill="#c4c8b8" />
      <circle cx="336" cy="34" r="16" fill="#f0d68a" opacity="0.8" />

      {/* 樫の疎林 */}
      <g fill="#5a4630">
        <rect x="46" y="46" width="15" height="76" />
        <rect x="288" y="52" width="13" height="66" />
        <rect x="356" y="58" width="11" height="58" />
      </g>
      <g fill="#6f7a44">
        <ellipse cx="53" cy="42" rx="46" ry="24" />
        <ellipse cx="294" cy="46" rx="38" ry="20" />
        <ellipse cx="362" cy="52" rx="30" ry="16" />
      </g>
      <g fill="#5c6738">
        <ellipse cx="30" cy="52" rx="24" ry="14" />
        <ellipse cx="276" cy="56" rx="20" ry="11" />
      </g>

      {/* 石灰岩の畑 */}
      <rect y="112" width="400" height="98" fill="#bda877" />
      <path d="M0,140 Q110,128 220,142 Q320,154 400,138 L400,210 L0,210z" fill="#a8926a" />
      <rect y="182" width="400" height="28" fill="#96805b" />
      <g fill="#cfc0a0" opacity="0.7">
        <ellipse cx="60" cy="196" rx="16" ry="5" />
        <ellipse cx="330" cy="188" rx="13" ry="4" />
      </g>

      {/* 落ち葉 */}
      <g fill="#8a6a34">
        <ellipse className="tru-leaf tru-f1" cx="120" cy="130" rx="4" ry="2.2" />
        <ellipse className="tru-leaf tru-f2" cx="238" cy="122" rx="3.6" ry="2" />
        <ellipse className="tru-leaf tru-f3" cx="318" cy="136" rx="4.2" ry="2.4" />
      </g>

      {/* 掘っている犬 */}
      <g transform="translate(148,170)">
        {/* 尻尾 */}
        <path className="tru-tail" d="M30,-24 c12,-4 16,-14 12,-22" stroke="#4a3526" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* 胴 */}
        <ellipse cx="12" cy="-20" rx="30" ry="17" fill="#5a4030" />
        {/* 後脚 */}
        <rect x="24" y="-8" width="8" height="14" rx="3" fill="#4a3526" />
        {/* 前脚(土を掻く) */}
        <g className="tru-paw">
          <rect x="-18" y="-10" width="8" height="16" rx="3" fill="#6b4c38" />
        </g>
        <rect x="-6" y="-8" width="8" height="14" rx="3" fill="#4a3526" />
        {/* 首と頭(鼻を落としている) */}
        <g className="tru-head">
          <path d="M-14,-30 L-2,-16 L-34,-6 L-42,-18z" fill="#5a4030" />
          <ellipse cx="-40" cy="-14" rx="15" ry="10" fill="#6b4c38" />
          <ellipse cx="-51" cy="-9" rx="6" ry="4.4" fill="#3a2a20" />
          <circle cx="-42" cy="-19" r="2" fill="#2a2028" />
          <path d="M-32,-22 q10,-4 12,8 q-8,3 -12,-8z" fill="#4a3526" />
        </g>
      </g>

      {/* 掻き上げられた土 */}
      <g fill="#8a7350">
        <circle className="tru-dirt tru-d1" cx="108" cy="168" r="3" />
        <circle className="tru-dirt tru-d2" cx="100" cy="174" r="2.4" />
        <circle className="tru-dirt tru-d3" cx="114" cy="176" r="2.6" />
      </g>

      {/* 現れるトリュフ */}
      <g className="tru-find">
        <circle cx="104" cy="180" r="9" fill="#2f2620" />
        <g fill="#463a30">
          <circle cx="100" cy="177" r="2.6" />
          <circle cx="107" cy="182" r="2.2" />
          <circle cx="103" cy="185" r="1.8" />
        </g>
      </g>

      {/* 市の籠 */}
      <g transform="translate(310,178)">
        <path d="M-30,-16 L30,-16 L24,14 L-24,14z" fill="#c08a45" />
        <g stroke="#a06f33" strokeWidth="2.4" fill="none">
          <path d="M-28,-8 L28,-8M-26,0 L26,0M-25,8 L25,8" />
        </g>
        <rect x="-32" y="-20" width="64" height="6" rx="3" fill="#a06f33" />
        <path d="M-16,-22 a16,12 0 0 1 32,0" stroke="#a06f33" strokeWidth="3" fill="none" />
        {/* すでに入っているトリュフ */}
        <g fill="#2f2620">
          <circle cx="-13" cy="-24" r="8" />
          <circle cx="2" cy="-27" r="8.6" />
          <circle cx="17" cy="-24" r="7.4" />
        </g>
      </g>

      {/* 現金の分け前 */}
      <g className="tru-coin tru-c1">
        <circle cx="240" cy="150" r="10" fill="#f5b31c" />
        <circle cx="240" cy="150" r="5" fill="#d8930d" />
      </g>
      <g className="tru-coin tru-c2">
        <circle cx="262" cy="162" r="8" fill="#f5b31c" />
        <circle cx="262" cy="162" r="4" fill="#d8930d" />
      </g>

      <style>{`
        .tru-leaf, .tru-tail, .tru-paw, .tru-head,
        .tru-dirt, .tru-find, .tru-coin {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .tru-leaf { animation: tru-flutter 6s linear infinite; }
        .tru-f2 { animation-duration: 7.5s; animation-delay: -3s; }
        .tru-f3 { animation-duration: 5.4s; animation-delay: -4s; }
        .tru-tail { transform-origin: 0% 100%; animation: tru-wag 0.7s ease-in-out infinite; }
        .tru-paw { transform-origin: 50% 0%; animation: tru-scratch 0.6s ease-in-out infinite; }
        .tru-head { transform-origin: 100% 0%; animation: tru-snuffle 1.6s ease-in-out infinite; }
        .tru-dirt { animation: tru-fling 0.6s ease-out infinite; }
        .tru-d2 { animation-delay: -0.2s; }
        .tru-d3 { animation-delay: -0.4s; }
        .tru-find { animation: tru-reveal 3.6s ease-out infinite; }
        .tru-coin { animation: tru-rise 2.6s ease-out infinite; }
        .tru-c2 { animation-delay: -1.3s; }
        @keyframes tru-flutter {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          15% { opacity: 0.9; }
          100% { transform: translate(-30px, 44px) rotate(300deg); opacity: 0; }
        }
        @keyframes tru-wag {
          0%, 100% { transform: rotate(-16deg); }
          50% { transform: rotate(16deg); }
        }
        @keyframes tru-scratch {
          0%, 100% { transform: rotate(-14deg); }
          50% { transform: rotate(22deg); }
        }
        @keyframes tru-snuffle {
          0%, 100% { transform: rotate(-2deg) translateY(0); }
          50% { transform: rotate(2deg) translateY(2px); }
        }
        @keyframes tru-fling {
          0% { transform: translate(0, 0); opacity: 0; }
          25% { opacity: 0.9; }
          100% { transform: translate(-20px, -14px); opacity: 0; }
        }
        @keyframes tru-reveal {
          0%, 20% { transform: translateY(9px) scale(0.4); opacity: 0; }
          45% { transform: translateY(0) scale(1); opacity: 1; }
          85% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-4px) scale(1.05); opacity: 0; }
        }
        @keyframes tru-rise {
          0% { transform: translate(0, 16px); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(10px, -40px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tru-leaf, .tru-tail, .tru-paw, .tru-head,
          .tru-dirt, .tru-find, .tru-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
