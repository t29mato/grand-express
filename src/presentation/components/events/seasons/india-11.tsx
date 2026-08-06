/**
 * 3月。ホーリー。
 *
 * 前の晩の焚き火がまだ燻っている朝、色粉が空じゅうに舞い、水鉄砲が飛んで、
 * だれがだれだか分からなくなる。商いは一日止まって、翌日また動きだす。
 */
export function India11() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 色粉の朝 */}
      <rect width="400" height="210" fill="#f3e4c6" />

      {/* 町の壁 */}
      <rect y="112" width="400" height="54" fill="#b5895c" />
      <rect y="106" width="400" height="8" fill="#8e6b45" />
      <g fill="#7a5a38">
        <rect x="24" y="126" width="20" height="24" rx="2" />
        <rect x="118" y="126" width="20" height="24" rx="2" />
        <rect x="222" y="126" width="20" height="24" rx="2" />
        <rect x="330" y="126" width="20" height="24" rx="2" />
      </g>
      <g opacity="0.55">
        <ellipse cx="76" cy="140" rx="17" ry="12" fill="#e8447a" />
        <ellipse cx="180" cy="152" rx="14" ry="10" fill="#4fb06a" />
        <ellipse cx="288" cy="132" rx="15" ry="11" fill="#7a4fa8" />
        <ellipse cx="384" cy="150" rx="13" ry="9" fill="#f5b31c" />
      </g>

      {/* 地面と色の跡 */}
      <rect y="166" width="400" height="44" fill="#cbb184" />
      <g opacity="0.65">
        <ellipse cx="110" cy="192" rx="28" ry="8" fill="#e8447a" />
        <ellipse cx="196" cy="202" rx="32" ry="7" fill="#5b8fe8" />
        <ellipse cx="284" cy="188" rx="24" ry="7" fill="#4fb06a" />
        <ellipse cx="360" cy="200" rx="28" ry="8" fill="#f5b31c" />
        <ellipse cx="30" cy="200" rx="24" ry="7" fill="#7a4fa8" />
      </g>

      {/* 前の晩の焚き火 */}
      <g>
        <g stroke="#6b4a2a" strokeWidth="7" strokeLinecap="round" fill="none">
          <path d="M26,182 L58,166" />
          <path d="M62,182 L30,166" />
          <path d="M44,184 L44,162" />
        </g>
        <path className="i11-flame-a" d="M44,176 C27,164 32,146 44,132 C56,146 61,164 44,176 z" fill="#e8443f" />
        <path className="i11-flame-b" d="M44,175 C33,166 36,152 44,142 C52,152 55,166 44,175 z" fill="#f5931c" />
        <path className="i11-flame-c" d="M44,174 C38,167 39,158 44,151 C49,158 50,167 44,174 z" fill="#f5e2a8" />
        <g fill="#b9a894" opacity="0.7">
          <circle className="i11-smoke-a" cx="46" cy="120" r="7" />
          <circle className="i11-smoke-b" cx="52" cy="104" r="6" />
          <circle className="i11-smoke-c" cx="42" cy="88" r="8" />
        </g>
      </g>

      {/* 色粉を撒く人 */}
      <g className="i11-thrower">
        <rect x="130" y="174" width="7" height="14" rx="3" fill="#4a4260" />
        <rect x="142" y="174" width="7" height="14" rx="3" fill="#4a4260" />
        <rect x="128" y="142" width="24" height="34" rx="7" fill="#f6efe2" />
        <circle cx="134" cy="152" r="5" fill="#e8447a" />
        <circle cx="147" cy="164" r="4.5" fill="#4fb06a" />
        <circle cx="138" cy="170" r="4" fill="#5b8fe8" />
        <circle cx="140" cy="132" r="11" fill="#c08a5a" />
        <circle cx="135" cy="129" r="4" fill="#e8447a" />
        <circle cx="145" cy="135" r="3.5" fill="#f5b31c" />
        <rect className="i11-throw-arm" x="150" y="132" width="24" height="7" rx="3.5" fill="#c08a5a" />
      </g>
      <g className="i11-handful" fill="#e8447a">
        <circle cx="180" cy="118" r="3.5" />
        <circle cx="190" cy="110" r="3" />
        <circle cx="198" cy="118" r="2.6" />
        <circle cx="188" cy="124" r="2.6" />
      </g>

      {/* 浴びせられる人 */}
      <g className="i11-hit">
        <rect x="234" y="174" width="7" height="14" rx="3" fill="#4a4260" />
        <rect x="246" y="174" width="7" height="14" rx="3" fill="#4a4260" />
        <rect x="232" y="142" width="24" height="34" rx="7" fill="#f6efe2" />
        <circle cx="238" cy="150" r="5.5" fill="#5b8fe8" />
        <circle cx="250" cy="162" r="5" fill="#f5b31c" />
        <circle cx="240" cy="170" r="4" fill="#e8447a" />
        <rect className="i11-arm-l" x="212" y="146" width="22" height="7" rx="3.5" fill="#8a5a2a" />
        <rect className="i11-arm-r" x="254" y="146" width="22" height="7" rx="3.5" fill="#8a5a2a" />
        <circle cx="244" cy="132" r="11" fill="#8a5a2a" />
        <circle cx="240" cy="128" r="4.5" fill="#4fb06a" />
        <circle cx="249" cy="136" r="4" fill="#7a4fa8" />
      </g>

      {/* 水鉄砲の人 */}
      <g className="i11-shooter">
        <rect x="318" y="174" width="7" height="14" rx="3" fill="#4a4260" />
        <rect x="330" y="174" width="7" height="14" rx="3" fill="#4a4260" />
        <rect x="316" y="142" width="24" height="34" rx="7" fill="#f6efe2" />
        <circle cx="322" cy="152" r="5" fill="#f5b31c" />
        <circle cx="334" cy="164" r="4.5" fill="#e8447a" />
        <circle cx="328" cy="132" r="11" fill="#c08a5a" />
        <circle cx="332" cy="129" r="4" fill="#5b8fe8" />
        <circle cx="323" cy="136" r="3.5" fill="#4fb06a" />
        <g>
          <rect x="288" y="142" width="32" height="8" rx="3" fill="#4fb06a" />
          <rect x="284" y="139" width="10" height="14" rx="3" fill="#3a7a4a" />
          <rect className="i11-pump" x="316" y="144" width="16" height="5" rx="2.5" fill="#8a5a2a" />
          <rect x="304" y="150" width="7" height="12" rx="3" fill="#3a7a4a" />
        </g>
        <rect x="300" y="140" width="20" height="7" rx="3.5" fill="#c08a5a" />
      </g>

      {/* 飛ぶ色水 */}
      <g fill="#4fb06a">
        <circle className="i11-jet-a" cx="276" cy="145" r="4" />
        <circle className="i11-jet-b" cx="266" cy="143" r="3.5" />
        <circle className="i11-jet-c" cx="256" cy="142" r="3" />
      </g>

      {/* 舞い上がる色粉 */}
      <g opacity="0.85">
        <g className="i11-puff-a" fill="#e8447a">
          <circle cx="196" cy="82" r="15" />
          <circle cx="212" cy="90" r="11" />
          <circle cx="182" cy="92" r="10" />
        </g>
        <g className="i11-puff-b" fill="#f5b31c">
          <circle cx="98" cy="70" r="14" />
          <circle cx="114" cy="78" r="10" />
          <circle cx="84" cy="80" r="9" />
        </g>
        <g className="i11-puff-c" fill="#5b8fe8">
          <circle cx="296" cy="76" r="13" />
          <circle cx="310" cy="84" r="10" />
          <circle cx="282" cy="86" r="9" />
        </g>
        <g className="i11-puff-d" fill="#7a4fa8">
          <circle cx="360" cy="106" r="12" />
          <circle cx="374" cy="114" r="9" />
        </g>
        <g className="i11-puff-e" fill="#4fb06a">
          <circle cx="152" cy="52" r="11" />
          <circle cx="164" cy="60" r="8" />
        </g>
      </g>

      <style>{`
        .i11-flame-a, .i11-flame-b, .i11-flame-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: i11-burn 1.1s ease-in-out infinite;
        }
        .i11-flame-b { animation-duration: 0.8s; animation-delay: -0.3s; }
        .i11-flame-c { animation-duration: 0.65s; animation-delay: -0.5s; }
        .i11-smoke-a { animation: i11-rise 4.4s linear infinite; }
        .i11-smoke-b { animation: i11-rise 5.2s linear infinite; animation-delay: -1.7s; }
        .i11-smoke-c { animation: i11-rise 4.8s linear infinite; animation-delay: -3.2s; }
        .i11-thrower { transform-box: fill-box; transform-origin: 50% 100%; animation: i11-hop 1.6s ease-in-out infinite; }
        .i11-throw-arm { transform-box: fill-box; transform-origin: 0 50%; animation: i11-fling 1.6s ease-in-out infinite; }
        .i11-handful { animation: i11-toss 1.6s ease-out infinite; }
        .i11-hit { transform-box: fill-box; transform-origin: 50% 100%; animation: i11-flinch 1.4s ease-in-out infinite; }
        .i11-arm-l { transform-box: fill-box; transform-origin: 100% 50%; animation: i11-wave-l 1.4s ease-in-out infinite; }
        .i11-arm-r { transform-box: fill-box; transform-origin: 0 50%; animation: i11-wave-r 1.4s ease-in-out infinite; }
        .i11-shooter { transform-box: fill-box; transform-origin: 50% 100%; animation: i11-hop 1.9s ease-in-out infinite; animation-delay: -0.7s; }
        .i11-pump { animation: i11-push 1.1s ease-in-out infinite; }
        .i11-jet-a { animation: i11-squirt 1.1s linear infinite; }
        .i11-jet-b { animation: i11-squirt 1.1s linear infinite; animation-delay: -0.36s; }
        .i11-jet-c { animation: i11-squirt 1.1s linear infinite; animation-delay: -0.72s; }
        .i11-puff-a, .i11-puff-b, .i11-puff-c, .i11-puff-d, .i11-puff-e {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: i11-bloom 3s ease-out infinite;
        }
        .i11-puff-b { animation-duration: 3.6s; animation-delay: -1.2s; }
        .i11-puff-c { animation-duration: 3.2s; animation-delay: -2.1s; }
        .i11-puff-d { animation-duration: 3.8s; animation-delay: -0.6s; }
        .i11-puff-e { animation-duration: 3.4s; animation-delay: -2.6s; }
        @keyframes i11-burn {
          0%, 100% { transform: scale(1, 1); }
          50% { transform: scale(0.8, 1.2); }
        }
        @keyframes i11-rise {
          0% { transform: translate(0, 30px) scale(0.4); opacity: 0; }
          25% { opacity: 0.7; }
          100% { transform: translate(16px, -60px) scale(1.5); opacity: 0; }
        }
        @keyframes i11-hop {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -5px); }
        }
        @keyframes i11-fling {
          0%, 100% { transform: rotate(-14deg); }
          40% { transform: rotate(-62deg); }
        }
        @keyframes i11-toss {
          0% { transform: translate(-26px, 34px) scale(0.5); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(20px, -34px) scale(1.4); opacity: 0; }
        }
        @keyframes i11-flinch {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg) translate(-3px, -3px); }
        }
        @keyframes i11-wave-l {
          0%, 100% { transform: rotate(30deg); }
          50% { transform: rotate(56deg); }
        }
        @keyframes i11-wave-r {
          0%, 100% { transform: rotate(-30deg); }
          50% { transform: rotate(-56deg); }
        }
        @keyframes i11-push {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-7px, 0); }
        }
        @keyframes i11-squirt {
          0% { transform: translate(14px, 2px) scale(0.5); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(-34px, -6px) scale(1.3); opacity: 0; }
        }
        @keyframes i11-bloom {
          0% { transform: scale(0.25); opacity: 0; }
          25% { opacity: 0.9; }
          70% { opacity: 0.7; }
          100% { transform: scale(1.7) translateY(-14px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .i11-flame-a, .i11-flame-b, .i11-flame-c,
          .i11-smoke-a, .i11-smoke-b, .i11-smoke-c,
          .i11-thrower, .i11-throw-arm, .i11-handful,
          .i11-hit, .i11-arm-l, .i11-arm-r,
          .i11-shooter, .i11-pump, .i11-jet-a, .i11-jet-b, .i11-jet-c,
          .i11-puff-a, .i11-puff-b, .i11-puff-c,
          .i11-puff-d, .i11-puff-e { animation: none; }
        }
      `}</style>
    </svg>
  );
}
