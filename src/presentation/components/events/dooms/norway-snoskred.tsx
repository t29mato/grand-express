/**
 * 雪崩で線路が塞がる。
 *
 * 何週間も安定して見えていた斜面が前触れなく崩れ、数分で線路を雪と岩で埋める。
 * 動くのは**斜面を滑り落ちる雪の塊と、舞い上がる粉雪**だけ。
 * 止めた状態でも、線路の上に雪が積もり列車が停まっている構図で分かるようにしてある。
 */
export function NorwaySnoskred() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冬の空。 */}
      <rect width="400" height="210" fill="#8fa8bc" />
      <rect y="0" width="400" height="76" fill="#7f97ad" />
      <g fill="#a8bccc" opacity="0.55">
        <ellipse cx="80" cy="26" rx="34" ry="10" />
        <ellipse cx="300" cy="18" rx="28" ry="8" />
      </g>

      {/* 遠くの峰(中景)。 */}
      <path d="M240,120L300,34l34,32 26,-20 40,44v30z" fill="#6b7886" />
      <path d="M300,34l16,15 -10,4 -8,-6z" fill="#e4ecf4" />
      <path d="M360,46l14,16 -12,3 -8,-8z" fill="#e4ecf4" />

      {/* 崩れた斜面。上半分が雪、下は剥き出しの岩。 */}
      <path d="M0,0h216L150,132 0,152z" fill="#5f6670" />
      <path d="M0,0h176L112,124 0,140z" fill="#525963" />
      <g stroke="#41474f" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M40,10l14,44-10,34" />
        <path d="M112,4l-10,40 16,36" />
        <path d="M166,16l-14,38 12,30" />
      </g>
      {/* 崩れ落ちた跡(破断面)。 */}
      <path d="M8,6h188L128,116 12,134z" fill="#dfe8f0" opacity="0.35" />
      <g fill="#e4ecf4">
        <path d="M30,2l16,26-30,6z" />
        <path d="M126,0l14,22-26,5z" />
      </g>

      {/* トウヒの林(中景)。半分が雪に飲まれている。 */}
      <g fill="#22352a">
        <path d="M232,140l10,-30 10,30z" />
        <path d="M258,144l9,-26 9,26z" />
        <path d="M286,138l11,-32 11,32z" />
        <path d="M318,146l9,-26 9,26z" />
      </g>

      {/* 線路と道床。 */}
      <rect y="150" width="400" height="60" fill="#8a8578" />
      <g fill="#4a3a28">
        <rect x="4" y="166" width="12" height="8" />
        <rect x="30" y="166" width="12" height="8" />
        <rect x="56" y="166" width="12" height="8" />
        <rect x="252" y="166" width="12" height="8" />
        <rect x="278" y="166" width="12" height="8" />
        <rect x="304" y="166" width="12" height="8" />
        <rect x="330" y="166" width="12" height="8" />
        <rect x="356" y="166" width="12" height="8" />
        <rect x="382" y="166" width="12" height="8" />
      </g>
      <g stroke="#b8bcc4" strokeWidth="2.4" fill="none">
        <path d="M0,168h400M0,174h400" />
      </g>

      {/* 停まった列車(右)。前照灯が点いたまま。 */}
      <g>
        <ellipse cx="330" cy="186" rx="66" ry="6" fill="#000" opacity="0.18" />
        <rect x="264" y="128" width="136" height="42" rx="5" fill="#2f4a3a" />
        <rect x="264" y="156" width="136" height="7" fill="#1f3a2a" />
        <rect x="264" y="148" width="136" height="4" fill="#c0453c" />
        <g fill="#bfe0f2">
          <rect x="274" y="134" width="20" height="14" />
          <rect x="302" y="134" width="20" height="14" />
          <rect x="330" y="134" width="20" height="14" />
          <rect x="358" y="134" width="20" height="14" />
        </g>
        <g fill="#2f2a26">
          <circle cx="286" cy="172" r="6" />
          <circle cx="368" cy="172" r="6" />
        </g>
        <circle cx="266" cy="152" r="4.4" fill="#f8dc90" />
        <path d="M262,152l-40,-14v28z" fill="#f5b31c" opacity="0.28" />
      </g>

      {/* 線路の上に積もった雪(止めても「塞がっている」ことが分かる)。 */}
      <path d="M0,182c34,-26 74,-38 118,-34c40,4 76,-2 104,-16l16,52H0z" fill="#eef4f8" />
      <path d="M0,192c30,-20 66,-28 106,-24c36,4 68,0 92,-10l10,52H0z" fill="#dfe8f0" />
      <g fill="#8a8f96">
        <ellipse cx="52" cy="180" rx="14" ry="7" />
        <ellipse cx="128" cy="172" rx="11" ry="6" />
        <ellipse cx="188" cy="164" rx="9" ry="5" />
      </g>

      {/* ここから下だけが動く。斜面を滑り落ちる雪の塊。 */}
      <g className="nsk-slide">
        <path
          d="M92,18c22,-8 44,-2 56,14l14,-4 -8,16 12,6 -16,10 6,16 -18,-2 -6,18 -16,-10 -14,12 -8,-16 -18,2 4,-18 -14,-8 14,-12 -4,-16z"
          fill="#f4f9fc"
        />
        <path d="M104,34c17,-5 32,2 38,15c6,13 0,25 -11,30c-13,5 -28,2 -34,-9c-6,-11 -4,-32 7,-36z" fill="#e4edf4" />
        <g fill="#c4d4e2">
          <ellipse cx="112" cy="52" rx="7" ry="4" />
          <ellipse cx="134" cy="70" rx="5" ry="3" />
          <ellipse cx="120" cy="82" rx="6" ry="3.4" />
        </g>
        <g fill="#6b7078">
          <ellipse cx="146" cy="52" rx="4" ry="3" />
          <ellipse cx="98" cy="70" rx="3.4" ry="2.6" />
        </g>
      </g>
      <g className="nsk-dust">
        <ellipse cx="70" cy="120" rx="30" ry="14" fill="#f4f9fc" opacity="0.7" />
        <ellipse cx="112" cy="104" rx="22" ry="11" fill="#f4f9fc" opacity="0.55" />
        <ellipse cx="40" cy="136" rx="24" ry="12" fill="#f4f9fc" opacity="0.5" />
      </g>
      <g className="nsk-dust2">
        <ellipse cx="150" cy="128" rx="24" ry="12" fill="#f4f9fc" opacity="0.6" />
        <ellipse cx="188" cy="146" rx="18" ry="9" fill="#f4f9fc" opacity="0.45" />
      </g>

      <style>{`
        .nsk-slide {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: nsk-fall 3.6s ease-in infinite;
        }
        @keyframes nsk-fall {
          0%   { transform: translate(0, -60px) scale(0.7); opacity: 0; }
          18%  { transform: translate(0, -30px) scale(0.85); opacity: 1; }
          70%  { transform: translate(-40px, 96px) scale(1.15); opacity: 1; }
          100% { transform: translate(-64px, 140px) scale(1.3); opacity: 0; }
        }
        .nsk-dust {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nsk-puff 3.6s ease-out infinite;
        }
        .nsk-dust2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nsk-puff 3.6s ease-out infinite 0.5s;
        }
        @keyframes nsk-puff {
          0%, 45% { transform: scale(0.4) translateY(20px); opacity: 0; }
          70%     { transform: scale(1) translateY(0); opacity: 0.9; }
          100%    { transform: scale(1.5) translateY(-14px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nsk-slide, .nsk-dust, .nsk-dust2 { animation: none; }
          .nsk-slide {
            transform: translate(-52px, 118px) scale(1.2);
            transform-box: fill-box;
            transform-origin: 50% 50%;
          }
          .nsk-dust2 { opacity: 0.5; }
        }
      `}</style>
    </svg>
  );
}
