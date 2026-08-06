/**
 * 5月・ゴールデンウィーク。
 *
 * 屋根の上で鯉のぼりが風にはためき、矢車が回り、
 * 下の道路では日本じゅうが一斉に動いた渋滞がのろのろ進む。
 */
export function Japan01() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 五月晴れ */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <g fill="#f6fbff">
        <ellipse className="j01-cloud" cx="300" cy="42" rx="34" ry="14" />
        <ellipse className="j01-cloud j01-c2" cx="326" cy="34" rx="24" ry="12" />
      </g>

      {/* 新緑の山 */}
      <path
        d="M0,144 Q60,108 132,140 Q200,104 268,140 Q338,110 400,142 L400,152 L0,152z"
        fill="#6f9c56"
      />

      {/* 家並み */}
      <g>
        <g>
          <rect x="2" y="150" width="56" height="26" fill="#e2ddd0" />
          <rect x="14" y="156" width="14" height="12" rx="1" fill="#8fb6d8" />
          <rect x="34" y="156" width="14" height="12" rx="1" fill="#8fb6d8" />
          <path d="M-3,152 L8,136 L52,136 L63,152z" fill="#46586b" />
          <rect x="6" y="133" width="48" height="5" rx="2" fill="#33445a" />
        </g>
        <g>
          <rect x="64" y="152" width="56" height="24" fill="#d5cfc0" />
          <rect x="76" y="158" width="14" height="11" rx="1" fill="#8fb6d8" />
          <rect x="96" y="158" width="14" height="11" rx="1" fill="#8fb6d8" />
          <path d="M59,154 L70,140 L114,140 L125,154z" fill="#3d4f61" />
          <rect x="68" y="137" width="48" height="5" rx="2" fill="#33445a" />
        </g>
        <g>
          <rect x="126" y="150" width="56" height="26" fill="#e2ddd0" />
          <rect x="138" y="156" width="14" height="12" rx="1" fill="#8fb6d8" />
          <rect x="158" y="156" width="14" height="12" rx="1" fill="#8fb6d8" />
          <path d="M121,152 L132,136 L176,136 L187,152z" fill="#46586b" />
          <rect x="130" y="133" width="48" height="5" rx="2" fill="#33445a" />
        </g>
        <g>
          <rect x="188" y="152" width="56" height="24" fill="#d5cfc0" />
          <rect x="200" y="158" width="14" height="11" rx="1" fill="#8fb6d8" />
          <rect x="220" y="158" width="14" height="11" rx="1" fill="#8fb6d8" />
          <path d="M183,154 L194,141 L238,141 L249,154z" fill="#3d4f61" />
          <rect x="192" y="138" width="48" height="5" rx="2" fill="#33445a" />
        </g>
        <g>
          <rect x="250" y="150" width="56" height="26" fill="#e2ddd0" />
          <rect x="262" y="156" width="14" height="12" rx="1" fill="#8fb6d8" />
          <rect x="282" y="156" width="14" height="12" rx="1" fill="#8fb6d8" />
          <path d="M245,152 L256,136 L300,136 L311,152z" fill="#46586b" />
          <rect x="254" y="133" width="48" height="5" rx="2" fill="#33445a" />
        </g>
        <g>
          <rect x="312" y="152" width="56" height="24" fill="#d5cfc0" />
          <rect x="324" y="158" width="14" height="11" rx="1" fill="#8fb6d8" />
          <rect x="344" y="158" width="14" height="11" rx="1" fill="#8fb6d8" />
          <path d="M307,154 L318,140 L362,140 L373,154z" fill="#3d4f61" />
          <rect x="316" y="137" width="48" height="5" rx="2" fill="#33445a" />
        </g>
        <g>
          <rect x="374" y="150" width="28" height="26" fill="#e2ddd0" />
          <rect x="382" y="156" width="14" height="12" rx="1" fill="#8fb6d8" />
          <path d="M369,152 L380,137 L402,137 L402,152z" fill="#46586b" />
        </g>
      </g>

      {/* 鯉のぼりの竿 */}
      <rect x="61" y="16" width="6" height="186" rx="3" fill="#6d6f76" />

      {/* 矢車 */}
      <g className="j01-wheel">
        <circle cx="64" cy="18" r="10" fill="none" stroke="#c9a877" strokeWidth="3" />
        <g stroke="#c9a877" strokeWidth="2.5" strokeLinecap="round">
          <path d="M64,8 L64,28 M54,18 L74,18 M57,11 L71,25 M71,11 L57,25" />
        </g>
        <circle cx="64" cy="18" r="3" fill="#f5b31c" />
      </g>

      {/* 吹き流し */}
      <g transform="translate(68,20)">
        <g className="j01-streamer" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M0,-8 q36,-8 72,4" stroke="#8e5fb0" />
          <path d="M0,-3 q36,-6 72,6" stroke="#e8443f" />
          <path d="M0,2 q36,-4 72,8" stroke="#f5b31c" />
          <path d="M0,7 q36,-2 72,10" stroke="#f6efe2" />
          <path d="M0,12 q36,0 72,12" stroke="#5b8fe8" />
        </g>
      </g>

      {/* 真鯉 */}
      <g transform="translate(68,58) scale(1.4)">
        <g className="j01-carp">
          <path d="M0,-16 C22,-19 46,-13 58,-4 L58,4 C46,13 22,19 0,16 Z" fill="#2f3a4a" />
          <g fill="#5b8fe8">
            <circle cx="26" cy="-7" r="4" />
            <circle cx="26" cy="6" r="4" />
            <circle cx="38" cy="-5" r="3.5" />
            <circle cx="38" cy="5" r="3.5" />
            <circle cx="48" cy="0" r="3" />
          </g>
          <rect x="-2" y="-16" width="7" height="32" rx="3" fill="#f6efe2" />
          <circle cx="14" cy="-7" r="5" fill="#f6efe2" />
          <circle cx="14" cy="-7" r="2.5" fill="#20364a" />
          <path className="j01-tail" d="M56,-6 L72,-17 L72,17 L56,6 Z" fill="#3d4f61" />
        </g>
      </g>

      {/* 緋鯉 */}
      <g transform="translate(68,104) scale(1.05)">
        <g className="j01-carp j01-carp2">
          <path d="M0,-16 C22,-19 46,-13 58,-4 L58,4 C46,13 22,19 0,16 Z" fill="#e8443f" />
          <g fill="#f5b31c">
            <circle cx="26" cy="-7" r="4" />
            <circle cx="26" cy="6" r="4" />
            <circle cx="38" cy="-5" r="3.5" />
            <circle cx="38" cy="5" r="3.5" />
            <circle cx="48" cy="0" r="3" />
          </g>
          <rect x="-2" y="-16" width="7" height="32" rx="3" fill="#f6efe2" />
          <circle cx="14" cy="-7" r="5" fill="#f6efe2" />
          <circle cx="14" cy="-7" r="2.5" fill="#20364a" />
          <path className="j01-tail j01-tail2" d="M56,-6 L72,-17 L72,17 L56,6 Z" fill="#c0392b" />
        </g>
      </g>

      {/* 子鯉 */}
      <g transform="translate(68,138) scale(0.78)">
        <g className="j01-carp j01-carp3">
          <path d="M0,-16 C22,-19 46,-13 58,-4 L58,4 C46,13 22,19 0,16 Z" fill="#5b8fe8" />
          <g fill="#d5ecff">
            <circle cx="26" cy="-7" r="4" />
            <circle cx="26" cy="6" r="4" />
            <circle cx="38" cy="-5" r="3.5" />
            <circle cx="38" cy="5" r="3.5" />
            <circle cx="48" cy="0" r="3" />
          </g>
          <rect x="-2" y="-16" width="7" height="32" rx="3" fill="#f6efe2" />
          <circle cx="14" cy="-7" r="5" fill="#f6efe2" />
          <circle cx="14" cy="-7" r="2.5" fill="#20364a" />
          <path className="j01-tail j01-tail3" d="M56,-6 L72,-17 L72,17 L56,6 Z" fill="#3d6fc4" />
        </g>
      </g>

      {/* 道路 */}
      <rect y="174" width="400" height="36" fill="#55565c" />
      <rect y="174" width="400" height="3" fill="#7a7c84" />
      <g fill="#f0e6c0">
        <rect x="14" y="207" width="26" height="3" />
        <rect x="72" y="207" width="26" height="3" />
        <rect x="130" y="207" width="26" height="3" />
        <rect x="188" y="207" width="26" height="3" />
        <rect x="246" y="207" width="26" height="3" />
        <rect x="304" y="207" width="26" height="3" />
        <rect x="362" y="207" width="26" height="3" />
      </g>

      {/* 数珠つなぎの渋滞 */}
      <g>
        <g className="j01-car">
          <rect x="0" y="188" width="46" height="12" rx="4" fill="#e8443f" />
          <path d="M11,188 L16,178 L32,178 L38,188z" fill="#c0392b" />
          <path d="M14,187 L18,180 L30,180 L34,187z" fill="#bcd8ee" />
          <rect className="j01-brake" x="0" y="190" width="5" height="5" rx="2" fill="#ff5544" />
          <circle cx="11" cy="199" r="5" fill="#2a2233" />
          <circle cx="35" cy="199" r="5" fill="#2a2233" />
        </g>
        <g className="j01-car j01-car2">
          <rect x="62" y="188" width="46" height="12" rx="4" fill="#f6efe2" />
          <path d="M73,188 L78,178 L94,178 L100,188z" fill="#d8d3c6" />
          <path d="M76,187 L80,180 L92,180 L96,187z" fill="#bcd8ee" />
          <rect className="j01-brake" x="62" y="190" width="5" height="5" rx="2" fill="#ff5544" />
          <circle cx="73" cy="199" r="5" fill="#2a2233" />
          <circle cx="97" cy="199" r="5" fill="#2a2233" />
        </g>
        <g className="j01-car j01-car3">
          <rect x="124" y="188" width="46" height="12" rx="4" fill="#5b8fe8" />
          <path d="M135,188 L140,178 L156,178 L162,188z" fill="#3d6fc4" />
          <path d="M138,187 L142,180 L154,180 L158,187z" fill="#bcd8ee" />
          <rect className="j01-brake" x="124" y="190" width="5" height="5" rx="2" fill="#ff5544" />
          <circle cx="135" cy="199" r="5" fill="#2a2233" />
          <circle cx="159" cy="199" r="5" fill="#2a2233" />
        </g>
        <g className="j01-car j01-car4">
          <rect x="186" y="188" width="46" height="12" rx="4" fill="#f5b31c" />
          <path d="M197,188 L202,178 L218,178 L224,188z" fill="#d8930d" />
          <path d="M200,187 L204,180 L216,180 L220,187z" fill="#bcd8ee" />
          <rect className="j01-brake" x="186" y="190" width="5" height="5" rx="2" fill="#ff5544" />
          <circle cx="197" cy="199" r="5" fill="#2a2233" />
          <circle cx="221" cy="199" r="5" fill="#2a2233" />
        </g>
        <g className="j01-car j01-car5">
          <rect x="248" y="188" width="46" height="12" rx="4" fill="#4a5a7a" />
          <path d="M259,188 L264,178 L280,178 L286,188z" fill="#33445a" />
          <path d="M262,187 L266,180 L278,180 L282,187z" fill="#bcd8ee" />
          <rect className="j01-brake" x="248" y="190" width="5" height="5" rx="2" fill="#ff5544" />
          <circle cx="259" cy="199" r="5" fill="#2a2233" />
          <circle cx="283" cy="199" r="5" fill="#2a2233" />
        </g>
        <g className="j01-car j01-car6">
          <rect x="310" y="188" width="46" height="12" rx="4" fill="#cfd6d2" />
          <path d="M321,188 L326,178 L342,178 L348,188z" fill="#a8b0ac" />
          <path d="M324,187 L328,180 L340,180 L344,187z" fill="#bcd8ee" />
          <rect className="j01-brake" x="310" y="190" width="5" height="5" rx="2" fill="#ff5544" />
          <circle cx="321" cy="199" r="5" fill="#2a2233" />
          <circle cx="345" cy="199" r="5" fill="#2a2233" />
        </g>
      </g>

      <style>{`
        .j01-carp {
          transform-box: fill-box; transform-origin: 0% 50%;
          animation: j01-swim 2.4s ease-in-out infinite;
        }
        .j01-carp2 { animation-delay: 0.25s; animation-duration: 2.1s; }
        .j01-carp3 { animation-delay: 0.5s; animation-duration: 1.8s; }
        .j01-tail {
          transform-box: fill-box; transform-origin: 0% 50%;
          animation: j01-flick 1.2s ease-in-out infinite;
        }
        .j01-tail2 { animation-delay: 0.2s; animation-duration: 1.05s; }
        .j01-tail3 { animation-delay: 0.4s; animation-duration: 0.9s; }
        .j01-streamer {
          transform-box: fill-box; transform-origin: 0% 50%;
          animation: j01-swim 2.4s ease-in-out infinite;
        }
        .j01-wheel {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: j01-spin 1.6s linear infinite;
        }
        .j01-car {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: j01-crawl 3.2s ease-in-out infinite;
        }
        .j01-car2 { animation-delay: 0.2s; }
        .j01-car3 { animation-delay: 0.4s; }
        .j01-car4 { animation-delay: 0.6s; }
        .j01-car5 { animation-delay: 0.8s; }
        .j01-car6 { animation-delay: 1s; }
        .j01-brake { animation: j01-blink 3.2s ease-in-out infinite; }
        .j01-cloud { animation: j01-drift 9s ease-in-out infinite; }
        .j01-c2 { animation-delay: 1.4s; }
        @keyframes j01-swim {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes j01-flick {
          0%, 100% { transform: rotate(9deg); }
          50% { transform: rotate(-9deg); }
        }
        @keyframes j01-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes j01-crawl {
          0%, 16% { transform: translateX(0); }
          38%, 62% { transform: translateX(10px); }
          92%, 100% { transform: translateX(0); }
        }
        @keyframes j01-blink {
          0%, 34% { opacity: 1; }
          52%, 78% { opacity: 0.35; }
          96%, 100% { opacity: 1; }
        }
        @keyframes j01-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-16px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .j01-carp, .j01-tail, .j01-streamer, .j01-wheel,
          .j01-car, .j01-brake, .j01-cloud { animation: none; }
        }
      `}</style>
    </svg>
  );
}
