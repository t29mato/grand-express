/**
 * 2月。旅に最も良い数週間。
 *
 * 乾いて穏やかで、どこまでも晴れる。寺の門も浜も丘の宿もいっぱいで、
 * 客の列は途切れず、値段も一緒に上がっていく。
 */
export function India10() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* からりと晴れた空 */}
      <rect width="400" height="210" fill="#a4d8f0" />
      <g className="i10-sun">
        <g className="i10-rays" stroke="#f5d05a" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M56,34 l0,-26" />
          <path d="M56,34 l18,-18" />
          <path d="M56,34 l26,0" />
          <path d="M56,34 l18,18" />
          <path d="M56,34 l0,26" />
          <path d="M56,34 l-18,18" />
          <path d="M56,34 l-26,0" />
          <path d="M56,34 l-18,-18" />
        </g>
        <circle cx="56" cy="34" r="15" fill="#f5b31c" />
      </g>
      <g fill="#f6efe2" opacity="0.9">
        <g className="i10-cloud-a">
          <ellipse cx="180" cy="34" rx="26" ry="10" />
          <ellipse cx="196" cy="28" rx="18" ry="9" />
        </g>
        <g className="i10-cloud-b">
          <ellipse cx="320" cy="22" rx="22" ry="8" />
          <ellipse cx="334" cy="17" rx="15" ry="7" />
        </g>
      </g>

      {/* 遠い丘 */}
      <g fill="#79a877">
        <ellipse cx="60" cy="128" rx="90" ry="34" />
        <ellipse cx="180" cy="132" rx="80" ry="28" />
        <ellipse cx="330" cy="126" rx="96" ry="32" />
      </g>
      <g fill="#5f8f60">
        <ellipse cx="24" cy="124" rx="46" ry="22" />
        <ellipse cx="286" cy="124" rx="48" ry="22" />
      </g>

      {/* 浜と海 */}
      <rect y="140" width="400" height="70" fill="#e8d3a8" />
      <path d="M0,140 L150,140 L120,168 L0,168 z" fill="#3f9cb8" />
      <g fill="#7fc8dc">
        <rect className="i10-wave-a" x="10" y="150" width="60" height="4" rx="2" />
        <rect className="i10-wave-b" x="60" y="160" width="50" height="4" rx="2" />
      </g>
      <g className="i10-boat">
        <path d="M-16,0 L16,0 L11,7 L-11,7 z" fill="#8a5a2a" />
        <rect x="-2" y="-14" width="3" height="14" fill="#6b4a2a" />
        <path d="M0,-14 L11,-4 L0,-4 z" fill="#f6efe2" />
      </g>

      {/* 椰子 */}
      <g className="i10-palm-a">
        <rect x="42" y="96" width="7" height="76" fill="#8a6a3a" />
        <g fill="#3a7a4a">
          <ellipse cx="26" cy="96" rx="22" ry="6" />
          <ellipse cx="64" cy="96" rx="22" ry="6" />
          <ellipse cx="34" cy="86" rx="15" ry="6" transform="rotate(-24 34 86)" />
          <ellipse cx="58" cy="86" rx="15" ry="6" transform="rotate(24 58 86)" />
        </g>
        <circle cx="41" cy="98" r="4" fill="#8a6a3a" />
        <circle cx="50" cy="99" r="4" fill="#8a6a3a" />
      </g>
      <g className="i10-palm-b">
        <rect x="106" y="108" width="6" height="64" fill="#8a6a3a" />
        <g fill="#3a7a4a">
          <ellipse cx="92" cy="108" rx="19" ry="5" />
          <ellipse cx="126" cy="108" rx="19" ry="5" />
          <ellipse cx="99" cy="99" rx="13" ry="5" transform="rotate(-24 99 99)" />
          <ellipse cx="120" cy="99" rx="13" ry="5" transform="rotate(24 120 99)" />
        </g>
      </g>

      {/* 寺の門(ゴープラム) */}
      <g>
        <path d="M248,176 L382,176 L376,142 L254,142 z" fill="#e8d9bc" />
        <path d="M254,142 L376,142 L370,114 L260,114 z" fill="#e0cfae" />
        <path d="M260,114 L370,114 L364,90 L266,90 z" fill="#e8d9bc" />
        <path d="M266,90 L364,90 L358,70 L272,70 z" fill="#e0cfae" />
        <path d="M272,70 L358,70 L352,54 L278,54 z" fill="#e8d9bc" />
        <rect x="272" y="46" width="86" height="9" rx="3" fill="#c93a3a" />
        <g fill="#f5b31c">
          <ellipse cx="286" cy="42" rx="5" ry="7" />
          <ellipse cx="304" cy="40" rx="5" ry="8" />
          <ellipse cx="322" cy="39" rx="5" ry="8" />
          <ellipse cx="340" cy="40" rx="5" ry="8" />
          <ellipse cx="356" cy="42" rx="5" ry="7" />
        </g>
        <g fill="#c93a3a">
          <rect x="258" y="148" width="10" height="22" />
          <rect x="362" y="148" width="10" height="22" />
          <rect x="266" y="120" width="9" height="18" />
          <rect x="356" y="120" width="9" height="18" />
          <rect x="274" y="96" width="8" height="14" />
          <rect x="348" y="96" width="8" height="14" />
        </g>
        <g fill="#5b8fe8">
          <rect x="286" y="120" width="9" height="18" />
          <rect x="336" y="120" width="9" height="18" />
          <rect x="294" y="96" width="8" height="14" />
          <rect x="328" y="96" width="8" height="14" />
        </g>
        <path d="M300,176 L300,148 Q315,134 330,148 L330,176 z" fill="#6b4a2a" />
        <path d="M306,176 L306,150 Q315,140 324,150 L324,176 z" fill="#3f2a18" />
      </g>

      {/* 途切れない客の列 */}
      <g className="i10-queue">
        <g className="i10-walker">
          <rect x="16" y="152" width="15" height="22" rx="5" fill="#e8443f" />
          <circle cx="23" cy="146" r="7" fill="#c08a5a" />
          <rect className="i10-leg-a" x="18" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
          <rect className="i10-leg-b" x="25" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
        </g>
        <g className="i10-walker">
          <rect x="50" y="150" width="15" height="24" rx="5" fill="#f5b31c" />
          <circle cx="57" cy="144" r="7" fill="#8a5a2a" />
          <rect x="42" y="154" width="10" height="12" rx="2" fill="#6b4a2a" />
          <rect className="i10-leg-a" x="52" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
          <rect className="i10-leg-b" x="59" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
        </g>
        <g className="i10-walker">
          <rect x="84" y="152" width="15" height="22" rx="5" fill="#5b8fe8" />
          <circle cx="91" cy="146" r="7" fill="#c08a5a" />
          <rect className="i10-leg-a" x="86" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
          <rect className="i10-leg-b" x="93" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
        </g>
        <g className="i10-walker">
          <rect x="118" y="150" width="15" height="24" rx="5" fill="#f6efe2" />
          <circle cx="125" cy="144" r="7" fill="#c08a5a" />
          <rect x="132" y="140" width="6" height="18" rx="3" fill="#c08a5a" />
          <rect className="i10-leg-a" x="120" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
          <rect className="i10-leg-b" x="127" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
        </g>
        <g className="i10-walker">
          <rect x="152" y="152" width="15" height="22" rx="5" fill="#3a7a4a" />
          <circle cx="159" cy="146" r="7" fill="#8a5a2a" />
          <rect className="i10-leg-a" x="154" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
          <rect className="i10-leg-b" x="161" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
        </g>
        <g className="i10-walker">
          <rect x="186" y="150" width="15" height="24" rx="5" fill="#e8447a" />
          <circle cx="193" cy="144" r="7" fill="#c08a5a" />
          <rect x="178" y="154" width="10" height="12" rx="2" fill="#6b4a2a" />
          <rect className="i10-leg-a" x="188" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
          <rect className="i10-leg-b" x="195" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
        </g>
        <g className="i10-walker">
          <rect x="220" y="152" width="15" height="22" rx="5" fill="#f5931c" />
          <circle cx="227" cy="146" r="7" fill="#8a5a2a" />
          <rect className="i10-leg-a" x="222" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
          <rect className="i10-leg-b" x="229" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
        </g>
        <g className="i10-walker">
          <rect x="254" y="150" width="15" height="24" rx="5" fill="#7a4fa8" />
          <circle cx="261" cy="144" r="7" fill="#c08a5a" />
          <rect className="i10-leg-a" x="256" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
          <rect className="i10-leg-b" x="263" y="172" width="5" height="14" rx="2.5" fill="#3a3348" />
        </g>
      </g>

      {/* 一緒に上がる値段 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="i10-coin-a" cx="200" cy="120" r="8" />
        <circle className="i10-coin-b" cx="222" cy="128" r="7" />
        <circle className="i10-coin-c" cx="180" cy="130" r="6" />
      </g>

      <style>{`
        .i10-sun { animation: i10-hover 8s ease-in-out infinite; }
        .i10-rays { transform-origin: 56px 34px; animation: i10-turn 30s linear infinite; }
        .i10-cloud-a { animation: i10-sail 20s linear infinite; }
        .i10-cloud-b { animation: i10-sail 26s linear infinite; animation-delay: -9s; }
        .i10-wave-a { animation: i10-lap 5s linear infinite; }
        .i10-wave-b { animation: i10-lap 6.4s linear infinite; animation-delay: -2.2s; }
        .i10-boat { transform: translate(70px, 152px); animation: i10-bob 4s ease-in-out infinite; }
        .i10-palm-a { transform-box: fill-box; transform-origin: 50% 100%; animation: i10-sway 4.6s ease-in-out infinite; }
        .i10-palm-b { transform-box: fill-box; transform-origin: 50% 100%; animation: i10-sway 5.6s ease-in-out infinite; animation-delay: -1.8s; }
        .i10-queue { animation: i10-shuffle 3.4s linear infinite; }
        .i10-leg-a { transform-box: fill-box; transform-origin: 50% 0; animation: i10-stride 0.85s ease-in-out infinite; }
        .i10-leg-b { transform-box: fill-box; transform-origin: 50% 0; animation: i10-stride 0.85s ease-in-out infinite reverse; }
        .i10-coin-a { animation: i10-rise 2.6s ease-out infinite; }
        .i10-coin-b { animation: i10-rise 2.6s ease-out infinite; animation-delay: -0.9s; }
        .i10-coin-c { animation: i10-rise 2.6s ease-out infinite; animation-delay: -1.8s; }
        @keyframes i10-hover {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -4px); }
        }
        @keyframes i10-turn {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes i10-sail {
          0% { transform: translate(-90px, 0); }
          100% { transform: translate(300px, 0); }
        }
        @keyframes i10-lap {
          0% { transform: translate(40px, 0); opacity: 0; }
          25%, 70% { opacity: 0.9; }
          100% { transform: translate(-60px, 0); opacity: 0; }
        }
        @keyframes i10-bob {
          0%, 100% { transform: translate(70px, 152px) rotate(-3deg); }
          50% { transform: translate(78px, 149px) rotate(3deg); }
        }
        @keyframes i10-sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes i10-shuffle {
          0% { transform: translate(0, 0); }
          100% { transform: translate(34px, 0); }
        }
        @keyframes i10-stride {
          0%, 100% { transform: rotate(20deg); }
          50% { transform: rotate(-20deg); }
        }
        @keyframes i10-rise {
          0% { transform: translate(0, 14px); opacity: 0; }
          22%, 68% { opacity: 1; }
          100% { transform: translate(8px, -40px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .i10-sun, .i10-rays, .i10-cloud-a, .i10-cloud-b,
          .i10-wave-a, .i10-wave-b, .i10-boat, .i10-palm-a, .i10-palm-b,
          .i10-queue, .i10-leg-a, .i10-leg-b,
          .i10-coin-a, .i10-coin-b, .i10-coin-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
