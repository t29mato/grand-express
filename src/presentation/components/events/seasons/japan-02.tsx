/**
 * 6月・梅雨。
 *
 * 灰色の空から雨が降りつづけ、ベランダの洗濯物はいつまでも乾かず、
 * 傘の下を人が行き、紫陽花とかたつむりだけが元気にしている。
 */
export function Japan02() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 濡れた灰色の空 */}
      <rect width="400" height="210" fill="#78899a" />
      <path
        d="M0,0 L400,0 L400,44 Q372,60 342,48 Q304,64 266,50 Q226,66 186,50 Q146,64 106,50 Q64,64 26,50 Q12,46 0,52z"
        fill="#5b6f80"
      />

      {/* 濡れた地面 */}
      <rect y="178" width="400" height="32" fill="#4a554e" />
      <ellipse cx="196" cy="198" rx="96" ry="11" fill="#6f8ea4" opacity="0.85" />
      <ellipse className="j02-ripple" cx="176" cy="197" rx="12" ry="4" fill="none" stroke="#a9cbe0" strokeWidth="2" />
      <ellipse className="j02-ripple j02-r2" cx="228" cy="201" rx="10" ry="3.5" fill="none" stroke="#a9cbe0" strokeWidth="2" />
      <ellipse className="j02-ripple j02-r3" cx="140" cy="203" rx="11" ry="4" fill="none" stroke="#a9cbe0" strokeWidth="2" />

      {/* 家とベランダ */}
      <rect x="0" y="62" width="120" height="118" fill="#b2b9b4" />
      <rect x="0" y="56" width="126" height="10" fill="#3d4f61" />
      <rect x="16" y="74" width="46" height="34" rx="2" fill="#6f8ea4" />
      <rect x="16" y="74" width="46" height="34" rx="2" fill="none" stroke="#8f9a96" strokeWidth="3" />
      <rect x="38" y="74" width="3" height="34" fill="#8f9a96" />
      <rect x="0" y="146" width="120" height="8" fill="#8f9a96" />
      <g fill="#8f9a96">
        <rect x="12" y="150" width="5" height="26" />
        <rect x="42" y="150" width="5" height="26" />
        <rect x="72" y="150" width="5" height="26" />
        <rect x="102" y="150" width="5" height="26" />
      </g>

      {/* 乾かない洗濯物 */}
      <path d="M4,120 Q60,128 116,120" fill="none" stroke="#6b746f" strokeWidth="2" />
      <g transform="translate(26,123)">
        <g className="j02-shirt">
          <path d="M-14,2 L-14,13 L-9,13 L-9,34 L9,34 L9,13 L14,13 L14,2 Q0,-4 -14,2 Z" fill="#f6efe2" />
          <circle cx="0" cy="-2" r="3" fill="#6b746f" />
          <ellipse className="j02-drip" cx="0" cy="40" rx="2.5" ry="4" fill="#cfe4f2" />
        </g>
      </g>
      <g transform="translate(62,126)">
        <g className="j02-shirt j02-shirt2">
          <path d="M-13,2 L-13,12 L-8,12 L-8,32 L8,32 L8,12 L13,12 L13,2 Q0,-4 -13,2 Z" fill="#5b8fe8" />
          <circle cx="0" cy="-2" r="3" fill="#6b746f" />
          <ellipse className="j02-drip j02-drip2" cx="0" cy="38" rx="2.5" ry="4" fill="#cfe4f2" />
        </g>
      </g>
      <g transform="translate(98,124)">
        <g className="j02-shirt j02-shirt3">
          <path d="M-12,2 L-12,26 L12,26 L12,2 Q0,-4 -12,2 Z" fill="#e8a11c" />
          <circle cx="0" cy="-2" r="3" fill="#6b746f" />
          <ellipse className="j02-drip j02-drip3" cx="0" cy="32" rx="2.5" ry="4" fill="#cfe4f2" />
        </g>
      </g>

      {/* 傘をさして歩く人 */}
      <g>
        <rect x="185" y="164" width="7" height="18" rx="3" fill="#3b3550" />
        <rect x="196" y="164" width="7" height="18" rx="3" fill="#3b3550" />
        <path d="M180,166 L180,148 Q194,138 208,148 L208,166z" fill="#4a5a7a" />
        <circle cx="194" cy="140" r="12" fill="#f6efe2" />
        <path d="M182,138 Q194,123 206,138 L206,131 Q194,118 182,131z" fill="#2a2233" />
        <path d="M203,152 L214,147" stroke="#f6efe2" strokeWidth="6" strokeLinecap="round" />
        <g className="j02-umbrella">
          <rect x="210" y="118" width="4" height="42" rx="2" fill="#6b5a3e" />
          <path d="M212,158 q0,8 -8,8" fill="none" stroke="#6b5a3e" strokeWidth="4" strokeLinecap="round" />
          <path
            d="M176,120 Q212,84 248,120 Q230,110 212,120 Q194,110 176,120z"
            fill="#f5b31c"
          />
          <path d="M176,120 Q212,84 248,120" fill="none" stroke="#d8930d" strokeWidth="3" />
          <circle cx="212" cy="86" r="3" fill="#d8930d" />
          <ellipse className="j02-drip j02-drip4" cx="178" cy="128" rx="2.5" ry="4" fill="#cfe4f2" />
          <ellipse className="j02-drip j02-drip5" cx="246" cy="128" rx="2.5" ry="4" fill="#cfe4f2" />
        </g>
      </g>

      {/* 紫陽花 */}
      <g>
        <g fill="#3f6b3c">
          <ellipse cx="272" cy="188" rx="26" ry="11" transform="rotate(-14 272 188)" />
          <ellipse cx="336" cy="196" rx="28" ry="12" transform="rotate(10 336 196)" />
          <ellipse cx="386" cy="182" rx="22" ry="10" transform="rotate(-20 386 182)" />
          <rect x="298" y="160" width="4" height="34" fill="#4f7f45" />
          <rect x="350" y="172" width="4" height="26" fill="#4f7f45" />
          <rect x="270" y="182" width="4" height="22" fill="#4f7f45" />
        </g>
        <g className="j02-bloom">
          <g fill="#7b8fd0">
            <circle cx="300" cy="152" r="9" />
            <circle cx="316" cy="152" r="9" />
            <circle cx="308" cy="166" r="9" />
            <circle cx="292" cy="166" r="9" />
            <circle cx="284" cy="152" r="9" />
            <circle cx="292" cy="138" r="9" />
            <circle cx="308" cy="138" r="9" />
          </g>
          <g fill="#cfd8f5">
            <circle cx="300" cy="152" r="3" />
            <circle cx="316" cy="152" r="3" />
            <circle cx="308" cy="166" r="3" />
            <circle cx="292" cy="166" r="3" />
            <circle cx="284" cy="152" r="3" />
            <circle cx="292" cy="138" r="3" />
            <circle cx="308" cy="138" r="3" />
          </g>
        </g>
        <g className="j02-bloom j02-bloom2">
          <g fill="#c88fc0">
            <circle cx="352" cy="166" r="8" />
            <circle cx="366" cy="166" r="8" />
            <circle cx="359" cy="178" r="8" />
            <circle cx="345" cy="178" r="8" />
            <circle cx="338" cy="166" r="8" />
            <circle cx="345" cy="154" r="8" />
            <circle cx="359" cy="154" r="8" />
          </g>
          <g fill="#f2dcee">
            <circle cx="352" cy="166" r="2.6" />
            <circle cx="366" cy="166" r="2.6" />
            <circle cx="359" cy="178" r="2.6" />
            <circle cx="345" cy="178" r="2.6" />
            <circle cx="338" cy="166" r="2.6" />
            <circle cx="345" cy="154" r="2.6" />
            <circle cx="359" cy="154" r="2.6" />
          </g>
        </g>
        <g className="j02-bloom j02-bloom3">
          <g fill="#8f7fc4">
            <circle cx="266" cy="176" r="7" />
            <circle cx="278" cy="176" r="7" />
            <circle cx="272" cy="186" r="7" />
            <circle cx="260" cy="186" r="7" />
            <circle cx="254" cy="176" r="7" />
            <circle cx="260" cy="166" r="7" />
            <circle cx="272" cy="166" r="7" />
          </g>
          <g fill="#ded6f2">
            <circle cx="266" cy="176" r="2.4" />
            <circle cx="278" cy="176" r="2.4" />
            <circle cx="272" cy="186" r="2.4" />
            <circle cx="260" cy="186" r="2.4" />
            <circle cx="254" cy="176" r="2.4" />
            <circle cx="260" cy="166" r="2.4" />
            <circle cx="272" cy="166" r="2.4" />
          </g>
        </g>

        {/* かたつむり */}
        <g className="j02-snail">
          <ellipse cx="326" cy="198" rx="12" ry="5" fill="#e0d6c0" />
          <path d="M318,196 l-4,-7 M322,195 l-2,-8" stroke="#e0d6c0" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="332" cy="192" r="8" fill="#c9a877" />
          <path d="M332,192 a4,4 0 1,1 -3,-3.8" fill="none" stroke="#8a6b3e" strokeWidth="2" />
        </g>
      </g>

      {/* 降りつづける雨 */}
      <g stroke="#d3e6f2" strokeWidth="2" strokeLinecap="round" opacity="0.75">
        <path className="j02-rain" d="M20,10 l-5,20" />
        <path className="j02-rain j02-n2" d="M58,44 l-5,20" />
        <path className="j02-rain j02-n3" d="M96,-4 l-5,20" />
        <path className="j02-rain j02-n4" d="M134,60 l-5,20" />
        <path className="j02-rain j02-n5" d="M172,20 l-5,20" />
        <path className="j02-rain j02-n6" d="M210,52 l-5,20" />
        <path className="j02-rain j02-n7" d="M248,4 l-5,20" />
        <path className="j02-rain j02-n8" d="M286,68 l-5,20" />
        <path className="j02-rain j02-n9" d="M324,28 l-5,20" />
        <path className="j02-rain j02-n10" d="M362,80 l-5,20" />
        <path className="j02-rain j02-n11" d="M396,36 l-5,20" />
        <path className="j02-rain j02-n12" d="M40,96 l-5,20" />
        <path className="j02-rain j02-n13" d="M156,112 l-5,20" />
        <path className="j02-rain j02-n14" d="M270,120 l-5,20" />
        <path className="j02-rain j02-n15" d="M340,104 l-5,20" />
        <path className="j02-rain j02-n16" d="M116,140 l-5,20" />
      </g>

      <style>{`
        .j02-rain { animation: j02-pour 1.1s linear infinite; }
        .j02-n2 { animation-delay: 0.07s; animation-duration: 1.25s; }
        .j02-n3 { animation-delay: 0.14s; animation-duration: 0.95s; }
        .j02-n4 { animation-delay: 0.21s; animation-duration: 1.15s; }
        .j02-n5 { animation-delay: 0.28s; animation-duration: 1.05s; }
        .j02-n6 { animation-delay: 0.35s; animation-duration: 1.3s; }
        .j02-n7 { animation-delay: 0.42s; animation-duration: 0.9s; }
        .j02-n8 { animation-delay: 0.49s; animation-duration: 1.2s; }
        .j02-n9 { animation-delay: 0.56s; animation-duration: 1s; }
        .j02-n10 { animation-delay: 0.63s; animation-duration: 1.35s; }
        .j02-n11 { animation-delay: 0.7s; animation-duration: 1.1s; }
        .j02-n12 { animation-delay: 0.77s; animation-duration: 0.98s; }
        .j02-n13 { animation-delay: 0.84s; animation-duration: 1.22s; }
        .j02-n14 { animation-delay: 0.91s; animation-duration: 1.02s; }
        .j02-n15 { animation-delay: 0.98s; animation-duration: 1.28s; }
        .j02-n16 { animation-delay: 0.4s; animation-duration: 1.12s; }
        .j02-shirt {
          transform-box: fill-box; transform-origin: 50% 0%;
          animation: j02-hang 4.4s ease-in-out infinite;
        }
        .j02-shirt2 { animation-delay: 0.7s; }
        .j02-shirt3 { animation-delay: 1.4s; }
        .j02-drip {
          transform-box: fill-box; transform-origin: 50% 0%;
          animation: j02-fall-drop 2.2s ease-in infinite;
        }
        .j02-drip2 { animation-delay: 0.5s; }
        .j02-drip3 { animation-delay: 1s; }
        .j02-drip4 { animation-delay: 0.3s; animation-duration: 1.6s; }
        .j02-drip5 { animation-delay: 1.1s; animation-duration: 1.6s; }
        .j02-umbrella {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: j02-tilt 5s ease-in-out infinite;
        }
        .j02-ripple {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: j02-spread 1.8s ease-out infinite;
        }
        .j02-r2 { animation-delay: 0.6s; }
        .j02-r3 { animation-delay: 1.2s; }
        .j02-bloom {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: j02-nod 5.6s ease-in-out infinite;
        }
        .j02-bloom2 { animation-delay: 1.2s; }
        .j02-bloom3 { animation-delay: 2.4s; }
        .j02-snail { animation: j02-crawl 7s ease-in-out infinite; }
        @keyframes j02-pour {
          0% { transform: translate(0, -34px); opacity: 0; }
          15% { opacity: 0.85; }
          85% { opacity: 0.85; }
          100% { transform: translate(-16px, 226px); opacity: 0; }
        }
        @keyframes j02-hang {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes j02-fall-drop {
          0%, 40% { transform: translateY(0) scaleY(0.7); opacity: 0; }
          55% { opacity: 1; }
          100% { transform: translateY(30px) scaleY(1.4); opacity: 0; }
        }
        @keyframes j02-tilt {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes j02-spread {
          0% { transform: scale(0.2); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes j02-nod {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes j02-crawl {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-14px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .j02-rain, .j02-shirt, .j02-drip, .j02-umbrella,
          .j02-ripple, .j02-bloom, .j02-snail { animation: none; }
        }
      `}</style>
    </svg>
  );
}
