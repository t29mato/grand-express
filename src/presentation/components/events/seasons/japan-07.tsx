/**
 * 11月・新酒と七五三。
 *
 * 酒蔵の軒には搾りたてを知らせる青い杉玉が吊るされて揺れ、
 * その先の鳥居へ、千歳飴を提げた晴れ着の子どもが歩いていく。
 */
export function Japan07() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 晩秋の空 */}
      <rect width="400" height="210" fill="#b6c9d6" />
      <path
        d="M0,132 Q70,112 140,128 Q220,146 290,124 Q346,108 400,126 L400,152 L0,152z"
        fill="#8a7a52"
      />
      <g fill="#a8853a">
        <circle cx="206" cy="126" r="14" />
        <circle cx="232" cy="132" r="11" />
        <circle cx="330" cy="122" r="13" />
      </g>

      {/* 酒蔵 */}
      <g>
        <rect x="0" y="66" width="152" height="106" fill="#eae6dc" />
        <rect x="0" y="66" width="152" height="8" fill="#c9c2b2" />
        <path d="M-4,66 L-4,46 L160,46 L172,68z" fill="#46586b" />
        <rect x="-4" y="42" width="168" height="7" rx="2" fill="#33445a" />
        <rect x="0" y="104" width="152" height="6" fill="#8a7f6a" />
        <rect x="0" y="164" width="152" height="8" fill="#8a7f6a" />
        {/* 入口と暖簾 */}
        <rect x="36" y="106" width="66" height="66" fill="#3a3730" />
        <rect x="34" y="106" width="70" height="6" fill="#5c5344" />
        <g className="j07-noren">
          <rect x="36" y="110" width="20" height="34" fill="#2f4a6b" />
        </g>
        <g className="j07-noren j07-noren2">
          <rect x="58" y="110" width="20" height="34" fill="#2f4a6b" />
        </g>
        <g className="j07-noren j07-noren3">
          <rect x="80" y="110" width="20" height="34" fill="#2f4a6b" />
        </g>
        {/* 菰樽 */}
        <g>
          <rect x="112" y="140" width="34" height="32" rx="3" fill="#efe6cc" />
          <rect x="112" y="146" width="34" height="4" fill="#c0392b" />
          <rect x="112" y="164" width="34" height="4" fill="#c0392b" />
          <ellipse cx="129" cy="140" rx="17" ry="5" fill="#d9cfae" />
        </g>
        {/* 杉玉 */}
        <path d="M126,68 L126,84" stroke="#6b5a3e" strokeWidth="3" />
        <g transform="translate(126,70)">
          <g className="j07-sugidama">
            <path d="M0,0 L0,16" stroke="#6b5a3e" strokeWidth="3" fill="none" />
            <circle cx="0" cy="38" r="22" fill="#3f6b3c" />
            <g fill="#4f8f47">
              <circle cx="-11" cy="30" r="8" />
              <circle cx="10" cy="32" r="7" />
              <circle cx="-2" cy="48" r="8" />
              <circle cx="14" cy="46" r="6" />
              <circle cx="-15" cy="44" r="6" />
              <circle cx="2" cy="24" r="6" />
            </g>
            <rect x="-5" y="14" width="10" height="6" rx="2" fill="#8a6b3e" />
          </g>
        </g>
        {/* 蒸気 */}
        <rect x="46" y="34" width="20" height="12" rx="2" fill="#33445a" />
        <ellipse className="j07-steam" cx="52" cy="32" rx="7" ry="5" fill="#f6f8fa" />
        <ellipse className="j07-steam j07-steam2" cx="58" cy="30" rx="6" ry="4" fill="#f6f8fa" />
        <ellipse className="j07-steam j07-steam3" cx="55" cy="33" rx="7" ry="5" fill="#f6f8fa" />
      </g>

      {/* 鳥居 */}
      <g>
        <rect x="256" y="90" width="15" height="86" fill="#a52f2b" />
        <rect x="362" y="90" width="15" height="86" fill="#a52f2b" />
        <rect x="252" y="106" width="129" height="10" fill="#c0392b" />
        <rect x="311" y="80" width="11" height="26" fill="#c0392b" />
        <rect x="244" y="84" width="145" height="9" fill="#c0392b" />
        <path d="M238,84 Q316,66 394,84 L394,76 Q316,58 238,76z" fill="#c0392b" />
        <rect x="252" y="170" width="23" height="7" fill="#8f2724" />
        <rect x="358" y="170" width="23" height="7" fill="#8f2724" />
      </g>

      {/* 石畳 */}
      <rect y="172" width="400" height="38" fill="#8f8b7e" />
      <g stroke="#7a7568" strokeWidth="2">
        <path d="M0,186 L400,186 M44,172 L44,186 M118,172 L118,186 M192,186 L192,210 M266,172 L266,186 M340,172 L340,186 M78,186 L78,210 M266,186 L266,210 M340,186 L340,210" />
      </g>

      {/* 付き添いの大人 */}
      <g transform="translate(180,198)">
        <g className="j07-parent">
          <rect x="-9" y="-24" width="8" height="24" rx="3" fill="#2f3a4a" />
          <rect x="2" y="-24" width="8" height="24" rx="3" fill="#2f3a4a" />
          <path d="M-13,-22 L-13,-56 Q0,-64 13,-56 L13,-22z" fill="#4a5a7a" />
          <circle cx="0" cy="-68" r="11" fill="#f6efe2" />
          <path d="M-11,-70 Q0,-84 11,-70 L11,-76 Q0,-88 -11,-76z" fill="#2a2233" />
        </g>
      </g>

      {/* 晴れ着の子ども */}
      <g transform="translate(218,200)">
        <g className="j07-child">
          <rect className="j07-leg" x="-7" y="-16" width="7" height="16" rx="3" fill="#3b3550" />
          <rect className="j07-leg j07-leg2" x="1" y="-16" width="7" height="16" rx="3" fill="#3b3550" />
          <path d="M-13,-14 L-11,-44 Q0,-50 11,-44 L13,-14z" fill="#e8443f" />
          <path d="M-12,-30 L12,-30 L12,-24 L-12,-24z" fill="#f5b31c" />
          <path d="M-4,-48 L4,-48 L4,-30 L-4,-30z" fill="#f8f0e4" />
          <circle cx="0" cy="-58" r="11" fill="#f6efe2" />
          <path d="M-11,-60 Q0,-73 11,-60 L11,-65 Q0,-77 -11,-65z" fill="#2a2233" />
          <circle cx="10" cy="-70" r="3.5" fill="#e8443f" />
          <circle cx="10" cy="-70" r="1.4" fill="#f5b31c" />
          <g transform="translate(12,-38)">
            <g className="j07-candy">
              <path d="M0,0 L4,4" stroke="#f6efe2" strokeWidth="6" strokeLinecap="round" fill="none" />
              <rect x="0" y="4" width="13" height="34" rx="2" fill="#f8f0e4" />
              <path d="M0,10 L13,6 M0,18 L13,14 M0,26 L13,22 M0,34 L13,30" stroke="#e8443f" strokeWidth="3" />
              <rect x="0" y="4" width="13" height="34" rx="2" fill="none" stroke="#d8cfbc" strokeWidth="1.5" />
            </g>
          </g>
        </g>
      </g>

      {/* 散る銀杏 */}
      <g fill="#f0c93c">
        <g transform="translate(196,46)">
          <path className="j07-leaf" d="M0,0 Q-9,-9 -7,-15 L7,-15 Q9,-9 0,0 Z" />
        </g>
        <g transform="translate(240,88)">
          <path className="j07-leaf j07-leaf2" d="M0,0 Q-8,-8 -6,-13 L6,-13 Q8,-8 0,0 Z" />
        </g>
        <g transform="translate(312,54)">
          <path className="j07-leaf j07-leaf3" d="M0,0 Q-9,-9 -7,-15 L7,-15 Q9,-9 0,0 Z" />
        </g>
        <g transform="translate(348,118)">
          <path className="j07-leaf j07-leaf4" d="M0,0 Q-8,-8 -6,-13 L6,-13 Q8,-8 0,0 Z" />
        </g>
        <g transform="translate(268,140)">
          <path className="j07-leaf j07-leaf5" d="M0,0 Q-9,-9 -7,-15 L7,-15 Q9,-9 0,0 Z" />
        </g>
        <g transform="translate(180,110)">
          <path className="j07-leaf j07-leaf6" d="M0,0 Q-8,-8 -6,-13 L6,-13 Q8,-8 0,0 Z" />
        </g>
      </g>

      <style>{`
        .j07-sugidama {
          transform-box: fill-box; transform-origin: 50% 0%;
          animation: j07-swing 3.6s ease-in-out infinite;
        }
        .j07-noren {
          transform-box: fill-box; transform-origin: 50% 0%;
          animation: j07-flap 3s ease-in-out infinite;
        }
        .j07-noren2 { animation-delay: 0.3s; }
        .j07-noren3 { animation-delay: 0.6s; }
        .j07-steam {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: j07-rise 4s ease-out infinite;
        }
        .j07-steam2 { animation-delay: 1.3s; animation-duration: 4.6s; }
        .j07-steam3 { animation-delay: 2.6s; animation-duration: 3.6s; }
        .j07-child { animation: j07-walk 1.4s ease-in-out infinite; }
        .j07-leg {
          transform-box: fill-box; transform-origin: 50% 0%;
          animation: j07-stride 0.7s ease-in-out infinite;
        }
        .j07-leg2 { animation-direction: reverse; }
        .j07-candy {
          transform-box: fill-box; transform-origin: 8% 0%;
          animation: j07-dangle 1.4s ease-in-out infinite;
        }
        .j07-parent { animation: j07-walk 1.4s ease-in-out infinite; animation-delay: 0.2s; }
        .j07-leaf {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: j07-drift 6.4s linear infinite;
        }
        .j07-leaf2 { animation-delay: 1.1s; animation-duration: 7.2s; }
        .j07-leaf3 { animation-delay: 2.2s; animation-duration: 5.8s; }
        .j07-leaf4 { animation-delay: 3.3s; animation-duration: 6.8s; }
        .j07-leaf5 { animation-delay: 4.4s; animation-duration: 6s; }
        .j07-leaf6 { animation-delay: 5.5s; animation-duration: 7.6s; }
        @keyframes j07-swing {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes j07-flap {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(-7deg); }
        }
        @keyframes j07-rise {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          25% { opacity: 0.85; }
          100% { transform: translate(16px, -34px) scale(1.7); opacity: 0; }
        }
        @keyframes j07-walk {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes j07-stride {
          0%, 100% { transform: rotate(16deg); }
          50% { transform: rotate(-16deg); }
        }
        @keyframes j07-dangle {
          0%, 100% { transform: rotate(-7deg); }
          50% { transform: rotate(7deg); }
        }
        @keyframes j07-drift {
          0% { transform: translate(0, -20px) rotate(0deg); opacity: 0; }
          12% { opacity: 1; }
          86% { opacity: 1; }
          100% { transform: translate(-46px, 110px) rotate(300deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .j07-sugidama, .j07-noren, .j07-steam, .j07-child, .j07-leg,
          .j07-candy, .j07-parent, .j07-leaf { animation: none; }
        }
      `}</style>
    </svg>
  );
}
