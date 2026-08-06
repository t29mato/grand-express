/**
 * 地震。
 *
 * 携帯が三秒前に鳴き、部屋ごと揺れる。棚のものが床に落ち、
 * 吊り照明が振れ、旅人は机の下にもぐる。
 */
export function JapanQuake() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      <g className="jq-room">
        {/* 部屋。揺れても隙間が出ないよう画面より少し大きく取る */}
        <rect x="-12" y="-12" width="424" height="234" fill="#2c3b4b" />
        <rect x="-12" y="158" width="424" height="64" fill="#4a3a2c" />
        <rect x="-12" y="158" width="424" height="4" fill="#5e4a37" />

        {/* 傾く壁の額 */}
        <g className="jq-frame">
          <rect x="300" y="30" width="42" height="32" rx="2" fill="#6b4b32" />
          <rect x="305" y="35" width="32" height="22" fill="#3f6b8a" />
        </g>

        {/* 揺れる吊り照明 */}
        <g className="jq-lamp">
          <rect x="178" y="-12" width="3" height="46" fill="#3a4a58" />
          <path d="M163,56 L180,34 L197,56 z" fill="#8f9aa4" />
          <circle cx="180" cy="58" r="7" fill="#f5e2a8" />
        </g>

        {/* 中身が落ちる棚 */}
        <g>
          <rect x="22" y="52" width="98" height="110" rx="3" fill="#6b4b32" />
          <rect x="28" y="58" width="86" height="98" fill="#4f3924" />
          <rect x="28" y="88" width="86" height="6" fill="#6b4b32" />
          <rect x="28" y="122" width="86" height="6" fill="#6b4b32" />
          {/* 棚に残っているもの */}
          <g>
            <rect className="jq-book-a" x="34" y="66" width="9" height="22" fill="#e05252" />
            <rect className="jq-book-b" x="45" y="66" width="9" height="22" fill="#5b8fe8" />
            <rect className="jq-book-c" x="56" y="66" width="9" height="22" fill="#e0a052" />
            <ellipse cx="94" cy="118" rx="14" ry="5" fill="#cfd7de" />
          </g>
        </g>

        {/* 棚から落ちるもの */}
        <g className="jq-fall-a">
          <path d="M-12,-5 a12,12 0 0 0 24,0 z" fill="#dfe6ec" />
          <ellipse cy="-5" rx="12" ry="4" fill="#f2f6f9" />
        </g>
        <g className="jq-fall-b">
          <rect x="-11" y="-7" width="22" height="14" rx="1" fill="#5b8fe8" />
          <rect x="-11" y="-7" width="5" height="14" fill="#3f6b8a" />
        </g>
        <g className="jq-fall-c">
          <ellipse rx="9" ry="9" fill="#e0a052" />
          <ellipse cy="-3" rx="9" ry="3" fill="#f0bf7c" />
        </g>

        {/* 座布団をかぶってしゃがむ旅人 */}
        <g className="jq-hider">
          <path d="M226,158 q4,-32 24,-32 q20,0 24,32 z" fill="#3f6b8a" />
          <circle cx="250" cy="116" r="14" fill="#f6efe2" />
          <path d="M236,114 a14,14 0 0 1 28,0 l-6,-6 -10,3 -12,3 z" fill="#2a1f18" />
          <g className="jq-hand-l">
            <rect x="222" y="88" width="9" height="48" rx="4.5" fill="#3f6b8a" />
            <circle cx="226.5" cy="89" r="5" fill="#f6efe2" />
          </g>
          <g className="jq-hand-r">
            <rect x="269" y="88" width="9" height="48" rx="4.5" fill="#3f6b8a" />
            <circle cx="273.5" cy="89" r="5" fill="#f6efe2" />
          </g>
          <g className="jq-cushion">
            <rect x="212" y="70" width="76" height="20" rx="6" fill="#c76a4a" />
            <rect x="218" y="74" width="64" height="10" rx="5" fill="#e0a052" />
          </g>
        </g>

        {/* 三秒前に鳴った携帯 */}
        <g>
          <rect x="342" y="128" width="50" height="30" rx="2" fill="#6b4b32" />
          <g className="jq-phone">
            <rect x="356" y="96" width="24" height="42" rx="4" fill="#1a2530" />
            <rect x="359" y="100" width="18" height="32" rx="2" fill="#e05252" />
            <path d="M368,106 l7,13 l-14,0 z" fill="#ffe9b0" />
          </g>
          <g className="jq-alert" fill="none" stroke="#e05252" strokeWidth="3" strokeLinecap="round">
            <path className="jq-wave-a" d="M340,104 q-10,14 0,28" />
            <path className="jq-wave-b" d="M332,98 q-15,20 0,40" />
          </g>
        </g>
      </g>

      <style>{`
        .jq-room { animation: jq-shake 0.42s linear infinite; }
        .jq-frame {
          transform-box: fill-box;
          transform-origin: 50% 0;
          animation: jq-tilt 1.6s ease-in-out infinite;
        }
        .jq-lamp {
          transform-box: fill-box;
          transform-origin: 50% 0;
          animation: jq-swing 1.5s ease-in-out infinite;
        }
        .jq-book-a {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jq-lean 0.9s ease-in-out infinite;
        }
        .jq-book-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jq-lean 1.1s ease-in-out infinite;
          animation-delay: -0.3s;
        }
        .jq-book-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jq-lean 0.8s ease-in-out infinite;
          animation-delay: -0.5s;
        }
        .jq-fall-a {
          transform: translate(132px, 96px) rotate(-30deg);
          transform-box: fill-box;
          transform-origin: center;
          animation: jq-drop-a 2.4s ease-in infinite;
        }
        .jq-fall-b {
          transform: translate(152px, 120px) rotate(20deg);
          transform-box: fill-box;
          transform-origin: center;
          animation: jq-drop-b 2.4s ease-in infinite;
          animation-delay: -0.8s;
        }
        .jq-fall-c {
          transform: translate(118px, 138px) rotate(40deg);
          transform-box: fill-box;
          transform-origin: center;
          animation: jq-drop-c 2.4s ease-in infinite;
          animation-delay: -1.5s;
        }
        .jq-hider {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jq-duck 0.84s ease-in-out infinite;
        }
        .jq-hand-l {
          transform: rotate(6deg);
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jq-hold-l 0.84s ease-in-out infinite;
        }
        .jq-hand-r {
          transform: rotate(-6deg);
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jq-hold-r 0.84s ease-in-out infinite;
        }
        .jq-cushion {
          transform-box: fill-box;
          transform-origin: center;
          animation: jq-jostle 0.84s ease-in-out infinite;
        }
        .jq-phone {
          transform-box: fill-box;
          transform-origin: center;
          animation: jq-buzz 0.16s linear infinite;
        }
        .jq-wave-a { animation: jq-ping 1.2s ease-out infinite; }
        .jq-wave-b { animation: jq-ping 1.2s ease-out infinite; animation-delay: -0.6s; }
        @keyframes jq-shake {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(5px, -2px); }
          40% { transform: translate(-5px, 2px); }
          60% { transform: translate(4px, 2px); }
          80% { transform: translate(-4px, -1px); }
        }
        @keyframes jq-tilt {
          0%, 100% { transform: rotate(-7deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes jq-swing {
          0%, 100% { transform: rotate(-13deg); }
          50% { transform: rotate(13deg); }
        }
        @keyframes jq-lean {
          0%, 100% { transform: rotate(-9deg); }
          50% { transform: rotate(11deg); }
        }
        @keyframes jq-drop-a {
          0% { transform: translate(112px, 62px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          72% { transform: translate(140px, 156px) rotate(-140deg); opacity: 1; }
          100% { transform: translate(150px, 162px) rotate(-176deg); opacity: 0; }
        }
        @keyframes jq-drop-b {
          0% { transform: translate(122px, 96px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          74% { transform: translate(160px, 158px) rotate(110deg); opacity: 1; }
          100% { transform: translate(168px, 163px) rotate(128deg); opacity: 0; }
        }
        @keyframes jq-drop-c {
          0% { transform: translate(106px, 116px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          70% { transform: translate(128px, 155px) rotate(180deg); opacity: 1; }
          100% { transform: translate(136px, 161px) rotate(220deg); opacity: 0; }
        }
        @keyframes jq-duck {
          0%, 100% { transform: translate(0, 0) rotate(-2deg); }
          50% { transform: translate(-3px, 2px) rotate(2deg); }
        }
        @keyframes jq-hold-l {
          0%, 100% { transform: rotate(4deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes jq-hold-r {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(-10deg); }
        }
        @keyframes jq-jostle {
          0%, 100% { transform: translate(0, 0) rotate(-3deg); }
          50% { transform: translate(2px, -2px) rotate(3deg); }
        }
        @keyframes jq-buzz {
          0%, 100% { transform: translate(0.8px, 0) rotate(1.5deg); }
          50% { transform: translate(-0.8px, 0) rotate(-1.5deg); }
        }
        @keyframes jq-ping {
          0% { opacity: 0; transform: translate(6px, 0); }
          30% { opacity: 0.95; }
          100% { opacity: 0; transform: translate(-10px, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .jq-room, .jq-frame, .jq-lamp, .jq-book-a, .jq-book-b, .jq-book-c,
          .jq-fall-a, .jq-fall-b, .jq-fall-c, .jq-hider, .jq-hand-l, .jq-hand-r,
          .jq-cushion, .jq-phone, .jq-wave-a, .jq-wave-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
