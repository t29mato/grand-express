/**
 * トナカイが線路に寝そべる。
 *
 * 除雪された砂利敷きの線路が両脇の深い雪より心地よいので、群れが動かない。
 * 運転士は警笛より、じっと辛抱強く待つほうが効くと知っている。
 * 動くのは**寝そべった一頭の耳と尾・立っている一頭の白い息・列車の前照灯**だけ。
 * 止めた状態でも、線路上のトナカイと停まった列車で何が起きたか分かる。
 */
export function NorwayReinsdyrspor() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冬の低い空。 */}
      <rect width="400" height="210" fill="#c8d8e4" />
      <rect y="0" width="400" height="70" fill="#a8bfd4" />
      <circle cx="326" cy="118" r="26" fill="#f5c890" opacity="0.35" />
      <circle cx="326" cy="118" r="13" fill="#f5c05a" />

      {/* 遠景の丘とまばらな林(中景)。 */}
      <path d="M0,112c46,-22 104,-28 154,-18l-8,18z" fill="#8a95a0" />
      <path d="M400,112c-44,-24 -100,-28 -150,-16l8,16z" fill="#7f8a96" />
      <g fill="#22352a">
        <path d="M28,116l8,-24 8,24z" />
        <path d="M52,120l7,-20 7,20z" />
        <path d="M348,118l8,-22 8,22z" />
        <path d="M370,122l7,-19 7,19z" />
      </g>
      <g stroke="#6b5a48" strokeWidth="2" fill="none">
        <path d="M96,122l-4,-12 6,-5M96,122l6,-10 8,3" />
        <path d="M312,124l-5,-13 7,-4M312,124l7,-10 8,3" />
      </g>

      {/* 深い雪。 */}
      <rect y="112" width="400" height="98" fill="#e8eef4" />
      <g fill="#cfdce8">
        <path d="M0,132q60,-12 120,0t150,-6 130,4v20H0z" />
        <path d="M0,196q80,-10 160,2t240,-8v20H0z" />
      </g>

      {/* 除雪された道床と線路。 */}
      <path d="M0,148h400v46H0z" fill="#9a9488" />
      <path d="M0,148h400v6H0z" fill="#e8eef4" />
      <path d="M0,190h400v5H0z" fill="#e8eef4" />
      <g fill="#4a3a28">
        <rect x="6" y="164" width="14" height="9" />
        <rect x="36" y="164" width="14" height="9" />
        <rect x="66" y="164" width="14" height="9" />
        <rect x="96" y="164" width="14" height="9" />
        <rect x="126" y="164" width="14" height="9" />
        <rect x="156" y="164" width="14" height="9" />
        <rect x="186" y="164" width="14" height="9" />
        <rect x="216" y="164" width="14" height="9" />
        <rect x="246" y="164" width="14" height="9" />
        <rect x="276" y="164" width="14" height="9" />
      </g>
      <g stroke="#b8bcc4" strokeWidth="2.6" fill="none">
        <path d="M0,166h400M0,172h400" />
      </g>

      {/* 辛抱強く待つ列車(奥・右)。 */}
      <g>
        <rect x="300" y="122" width="100" height="42" rx="4" fill="#2f4a3a" />
        <rect x="300" y="150" width="100" height="7" fill="#1f3a2a" />
        <rect x="300" y="143" width="100" height="4" fill="#c0453c" />
        <g fill="#bfe0f2">
          <rect x="310" y="128" width="18" height="13" />
          <rect x="334" y="128" width="18" height="13" />
          <rect x="358" y="128" width="18" height="13" />
          <rect x="382" y="128" width="18" height="13" />
        </g>
        <g fill="#2f2a26">
          <circle cx="318" cy="166" r="6" />
          <circle cx="382" cy="166" r="6" />
        </g>
        <g className="nrs-lamp">
          <circle cx="298" cy="146" r="12" fill="#f5b31c" opacity="0.3" />
          <circle cx="298" cy="146" r="4.6" fill="#f8dc90" />
        </g>
      </g>

      {/* 立っているトナカイ(中景・角が背より高い)。 */}
      <g>
        <ellipse cx="96" cy="182" rx="30" ry="6" fill="#000" opacity="0.12" />
        <ellipse cx="96" cy="160" rx="26" ry="12" fill="#8a7258" />
        <g fill="#8a7258">
          <rect x="76" y="160" width="6" height="22" />
          <rect x="88" y="160" width="6" height="22" />
          <rect x="104" y="160" width="6" height="22" />
          <rect x="114" y="160" width="6" height="22" />
        </g>
        <ellipse cx="72" cy="158" rx="8" ry="5" fill="#e4e0d6" />
        <path d="M118,152l14,-26 9,4 -12,26z" fill="#8a7258" />
        <path d="M130,124l20,-4 2,10 -19,5z" fill="#9a8266" />
        <circle cx="144" cy="126" r="2" fill="#2f2820" />
        <g stroke="#5a4630" strokeWidth="3.4" fill="none" strokeLinecap="round">
          <path d="M134,120L128,92l-14,7" />
          <path d="M130,104l-13,-4" />
          <path d="M140,120L152,94l11,5" />
          <path d="M147,106l11,-3" />
        </g>
        {/* 白い息。 */}
        <g className="nrs-breath">
          <ellipse cx="158" cy="128" rx="10" ry="5" fill="#f4f9fc" opacity="0.8" />
          <ellipse cx="174" cy="124" rx="7" ry="3.4" fill="#f4f9fc" opacity="0.5" />
        </g>
      </g>

      {/* 線路に寝そべったトナカイ(主役・手前)。 */}
      <g>
        <ellipse cx="200" cy="196" rx="66" ry="8" fill="#000" opacity="0.14" />
        <ellipse cx="196" cy="180" rx="52" ry="17" fill="#7a6450" />
        <ellipse cx="176" cy="176" rx="30" ry="11" fill="#8a7258" />
        <path d="M150,186q-16,4 -26,-2q12,-2 26,-6z" fill="#7a6450" />
        <ellipse cx="152" cy="184" rx="12" ry="5" fill="#e4e0d6" />
        {/* 前へ伸ばした脚(寝そべっている)。 */}
        <g fill="#6b5847">
          <path d="M232,182h34l-2,10h-34z" />
          <path d="M228,190h30l-2,8h-30z" />
        </g>
        {/* 首と頭は起こしている。 */}
        <path d="M238,176l16,-22 11,6 -14,22z" fill="#7a6450" />
        <path d="M252,154l24,-6 3,11 -23,7z" fill="#8a7258" />
        <circle cx="270" cy="156" r="2.4" fill="#2f2820" />
        <ellipse cx="278" cy="152" rx="3.4" ry="2.6" fill="#4a3f34" />
        <g stroke="#5a4630" strokeWidth="4" fill="none" strokeLinecap="round">
          <path d="M256,148L246,116l-17,9" />
          <path d="M250,132l-16,-5" />
          <path d="M264,148L280,116l13,7" />
          <path d="M273,132l14,-4" />
        </g>
        {/* 動くのは耳と尾だけ。 */}
        <path className="nrs-ear" d="M252,150l-11,-9 13,-2z" fill="#6b5847" />
        <path className="nrs-tail" d="M144,172l-13,-6 3,10z" fill="#e4e0d6" />
      </g>

      {/* もう一頭、雪の中で待っている(遠景・小さく)。 */}
      <g opacity="0.9">
        <ellipse cx="52" cy="136" rx="15" ry="7" fill="#7a6450" />
        <g fill="#7a6450">
          <rect x="42" y="136" width="4" height="12" />
          <rect x="52" y="136" width="4" height="12" />
          <rect x="60" y="136" width="4" height="12" />
        </g>
        <path d="M64,132l8,-13 5,3 -7,13z" fill="#7a6450" />
        <g stroke="#5a4630" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M70,118l-3,-12 -7,4" />
          <path d="M75,118l7,-11 6,3" />
        </g>
      </g>

      <style>{`
        .nrs-ear {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: nrs-flick 2.6s ease-in-out infinite;
        }
        @keyframes nrs-flick {
          0%, 68%, 100% { transform: rotate(0deg); }
          76%           { transform: rotate(-24deg); }
          86%           { transform: rotate(10deg); }
        }
        .nrs-tail {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: nrs-swish 3.2s ease-in-out infinite;
        }
        @keyframes nrs-swish {
          0%, 100% { transform: rotate(-12deg); }
          50%      { transform: rotate(14deg); }
        }
        .nrs-breath {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: nrs-puff 3.4s ease-out infinite;
        }
        @keyframes nrs-puff {
          0%, 100% { transform: scale(0.3) translateX(-8px); opacity: 0; }
          25%      { transform: scale(1) translateX(0); opacity: 1; }
          70%      { transform: scale(1.5) translateX(14px); opacity: 0; }
        }
        .nrs-lamp { animation: nrs-glow 2.4s ease-in-out infinite; }
        @keyframes nrs-glow {
          0%, 100% { opacity: 0.7; }
          50%      { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nrs-ear, .nrs-tail, .nrs-breath, .nrs-lamp { animation: none; }
          .nrs-breath {
            transform: scale(1);
            transform-box: fill-box;
            transform-origin: 0% 50%;
          }
        }
      `}</style>
    </svg>
  );
}
