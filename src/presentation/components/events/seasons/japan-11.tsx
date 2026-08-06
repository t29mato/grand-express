/**
 * 3月 — 年度末。
 *
 * 校舎の前で袴姿の卒業生が証書筒を振り、桜はまだ蕾。
 * 横では引越しトラックに段ボールが運び込まれ、遠くの道にも転勤の車が走る。
 * 時計塔の針だけが休まず回る。
 */
export function Japan11() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 早春の空 */}
      <rect width="400" height="210" fill="#a8d0ee" />
      <g fill="#f6f9fc">
        <g className="j11-cloud j11-cloud-a">
          <ellipse cx="66" cy="26" rx="30" ry="11" />
          <ellipse cx="86" cy="20" rx="20" ry="12" />
        </g>
        <g className="j11-cloud j11-cloud-b">
          <ellipse cx="262" cy="18" rx="34" ry="10" />
          <ellipse cx="286" cy="13" rx="20" ry="10" />
        </g>
        <g className="j11-cloud j11-cloud-c">
          <ellipse cx="360" cy="40" rx="26" ry="9" />
        </g>
      </g>

      {/* 遠くの町なみ */}
      <g fill="#8fa8bd">
        <rect x="150" y="112" width="26" height="34" />
        <rect x="182" y="122" width="20" height="24" />
        <rect x="248" y="106" width="30" height="40" />
        <rect x="286" y="118" width="24" height="28" />
        <rect x="326" y="110" width="28" height="36" />
        <rect x="362" y="124" width="30" height="22" />
      </g>

      {/* 遠くの道と、走り去る転勤の車 */}
      <rect y="146" width="400" height="12" fill="#71778a" />
      <g className="j11-far j11-far-a">
        <rect x="0" y="136" width="24" height="10" rx="1" fill="#eae4d6" />
        <rect x="22" y="139" width="9" height="7" fill="#3b6fa8" />
        <circle cx="7" cy="147" r="2.6" fill="#2b2436" />
        <circle cx="25" cy="147" r="2.6" fill="#2b2436" />
      </g>
      <g className="j11-far j11-far-b">
        <rect x="0" y="138" width="20" height="8" rx="1" fill="#dcd3c0" />
        <rect x="18" y="140" width="8" height="6" fill="#c0392b" />
        <circle cx="6" cy="147" r="2.2" fill="#2b2436" />
        <circle cx="21" cy="147" r="2.2" fill="#2b2436" />
      </g>

      {/* 地面 */}
      <rect y="156" width="400" height="54" fill="#b3ad9b" />
      <rect y="156" width="400" height="5" fill="#9c9683" />

      {/* 校舎と時計塔 */}
      <path d="M58,34 L79,14 L100,34 Z" fill="#8a8272" />
      <rect x="64" y="34" width="30" height="28" fill="#e4dac8" />
      <circle cx="79" cy="48" r="9.5" fill="#f6efe2" />
      <circle cx="79" cy="48" r="9.5" fill="none" stroke="#8a8272" strokeWidth="2" />
      <rect className="j11-hand j11-hand-h" x="77.6" y="42" width="2.8" height="7" rx="1.4" fill="#3a3244" />
      <rect className="j11-hand j11-hand-m" x="78" y="39" width="2" height="10" rx="1" fill="#3a3244" />
      <rect x="6" y="58" width="140" height="9" fill="#8a8272" />
      <rect x="12" y="67" width="128" height="89" fill="#e4dac8" />
      <g fill="#86b7d8">
        <rect x="20" y="76" width="24" height="17" />
        <rect x="50" y="76" width="24" height="17" />
        <rect x="80" y="76" width="24" height="17" />
        <rect x="110" y="76" width="24" height="17" />
        <rect x="20" y="102" width="24" height="17" />
        <rect x="50" y="102" width="24" height="17" />
        <rect x="80" y="102" width="24" height="17" />
        <rect x="110" y="102" width="24" height="17" />
        <rect x="20" y="128" width="24" height="17" />
        <rect x="110" y="128" width="24" height="17" />
      </g>
      <rect x="54" y="124" width="46" height="32" fill="#4f3626" />
      <rect x="60" y="128" width="16" height="28" fill="#b8dcf0" />
      <rect x="78" y="128" width="16" height="28" fill="#b8dcf0" />
      <rect x="50" y="118" width="54" height="7" fill="#8a8272" />

      {/* まだ蕾の桜 */}
      <path d="M196,192 L196,132 L188,116 L194,114 L200,128 L204,110 L209,112 L203,134 L204,192 Z" fill="#6b4a33" />
      <g fill="#e8a8bd">
        <circle cx="180" cy="106" r="15" />
        <circle cx="204" cy="94" r="19" />
        <circle cx="228" cy="108" r="14" />
        <circle cx="194" cy="120" r="13" />
        <circle cx="218" cy="122" r="12" />
      </g>
      <g fill="#f4cddb">
        <circle cx="176" cy="100" r="4" />
        <circle cx="200" cy="86" r="4.5" />
        <circle cx="226" cy="102" r="3.6" />
        <circle cx="190" cy="118" r="3.4" />
        <circle cx="214" cy="126" r="3.8" />
        <circle cx="208" cy="106" r="4.2" />
      </g>

      {/* 証書筒を振る卒業生 */}
      <g transform="translate(150,196)">
        <ellipse cx="0" cy="2" rx="26" ry="6" fill="#9c9683" />
        <path d="M-20,-40 L20,-40 L26,2 L-26,2 Z" fill="#4a2f52" />
        <rect x="-21" y="-46" width="42" height="9" fill="#f5b31c" />
        <path d="M-17,-76 L17,-76 L20,-44 L-20,-44 Z" fill="#d94f6a" />
        <circle cx="-9" cy="-66" r="3.5" fill="#f6efe2" />
        <circle cx="8" cy="-58" r="3" fill="#f6efe2" />
        <circle cx="0" cy="-72" r="2.6" fill="#f6efe2" />
        <path d="M-17,-74 L-27,-72 L-23,-48 L-14,-50 Z" fill="#c43f5c" />
        <path d="M17,-74 L27,-72 L23,-48 L14,-50 Z" fill="#c43f5c" />
        <rect x="-9" y="-88" width="18" height="12" fill="#f6efe2" />
        <circle cx="0" cy="-96" r="13" fill="#f6efe2" />
        <path d="M-13,-98 a13,13 0 0 1 26,0 L12,-92 L-12,-92 Z" fill="#2b2436" />
        <circle cx="-13" cy="-101" r="5" fill="#2b2436" />
        <circle cx="13" cy="-101" r="5" fill="#2b2436" />
        <circle cx="12" cy="-106" r="4.5" fill="#f5b31c" />
        <g className="j11-tube">
          <rect x="20" y="-74" width="18" height="8" rx="4" fill="#f6efe2" />
          <rect x="30" y="-108" width="13" height="42" rx="5" fill="#2b3550" />
          <rect x="30" y="-104" width="13" height="5" fill="#f5b31c" />
          <rect x="30" y="-74" width="13" height="5" fill="#f5b31c" />
        </g>
      </g>

      {/* 引越しトラック */}
      <g>
        <rect x="264" y="114" width="108" height="6" fill="#cfc7b4" />
        <rect x="266" y="120" width="104" height="60" fill="#eae4d6" />
        <rect x="266" y="146" width="104" height="8" fill="#3b6fa8" />
        <rect x="266" y="122" width="46" height="56" fill="#3a3244" />
        {/* 荷台の段ボール */}
        <g fill="#c9944f">
          <rect x="272" y="152" width="24" height="22" />
          <rect x="272" y="130" width="20" height="20" />
          <rect x="294" y="136" width="18" height="16" />
          <rect x="296" y="154" width="16" height="20" />
        </g>
        <g fill="#a87837">
          <rect x="282" y="152" width="4" height="22" />
          <rect x="280" y="130" width="4" height="20" />
          <rect x="302" y="136" width="3" height="16" />
        </g>
        {/* 運転席 */}
        <path d="M370,132 L396,132 L400,152 L400,180 L370,180 Z" fill="#3b6fa8" />
        <rect x="376" y="136" width="22" height="15" rx="2" fill="#b8dcf0" />
        <rect x="370" y="160" width="30" height="6" fill="#2f5c8c" />
        {/* 車輪 */}
        <circle cx="294" cy="182" r="14" fill="#2b2436" />
        <circle cx="294" cy="182" r="6" fill="#8f8f9c" />
        <circle cx="378" cy="182" r="14" fill="#2b2436" />
        <circle cx="378" cy="182" r="6" fill="#8f8f9c" />
      </g>

      {/* 積み込みのスロープ */}
      <path d="M266,174 L280,174 L242,200 L226,200 Z" fill="#9a8f7a" />
      <rect x="212" y="184" width="26" height="22" fill="#c9944f" />
      <rect x="222" y="184" width="5" height="22" fill="#a87837" />

      {/* 段ボールを運ぶ人 */}
      <g className="j11-loader">
        <rect x="-8" y="-20" width="7" height="20" rx="3.5" fill="#3a3244" />
        <rect x="2" y="-20" width="7" height="20" rx="3.5" fill="#3a3244" />
        <rect x="-11" y="-46" width="22" height="28" rx="5" fill="#4f8a5a" />
        <circle cx="0" cy="-54" r="9" fill="#f6efe2" />
        <path d="M-9,-56 a9,9 0 0 1 18,0 L8,-52 L-8,-52 Z" fill="#2b2436" />
        <rect x="-16" y="-42" width="32" height="22" fill="#c9944f" />
        <rect x="-16" y="-33" width="32" height="4" fill="#e8ddc8" />
      </g>

      {/* 舞う花びら */}
      <g fill="#f4cddb">
        <ellipse className="j11-petal j11-petal-a" cx="0" cy="0" rx="4" ry="2.8" />
        <ellipse className="j11-petal j11-petal-b" cx="0" cy="0" rx="3.4" ry="2.4" />
        <ellipse className="j11-petal j11-petal-c" cx="0" cy="0" rx="4.4" ry="3" />
      </g>

      <style>{`
        .j11-cloud-a { animation: j11-drift 30s ease-in-out infinite; }
        .j11-cloud-b { animation: j11-drift 38s ease-in-out -14s infinite; }
        .j11-cloud-c { animation: j11-drift 26s ease-in-out -8s infinite; }
        .j11-hand { transform-box: fill-box; transform-origin: 50% 100%; }
        .j11-hand-h { animation: j11-tick 24s linear infinite; }
        .j11-hand-m { animation: j11-tick 6s linear infinite; }
        .j11-far-a { animation: j11-pass 9s linear infinite; }
        .j11-far-b { animation: j11-pass 13s linear -5s infinite; }
        .j11-tube { transform-box: fill-box; transform-origin: 4% 82%; animation: j11-wave 2.2s ease-in-out infinite; }
        .j11-loader { transform: translate(240px, 190px); animation: j11-carry 3.6s linear infinite; }
        .j11-petal { transform-box: fill-box; transform-origin: 50% 50%; }
        .j11-petal-a { transform: translate(172px, 132px) rotate(24deg); animation: j11-flutter-a 6s linear infinite; }
        .j11-petal-b { transform: translate(234px, 126px) rotate(-40deg); animation: j11-flutter-b 7.6s linear -3s infinite; }
        .j11-petal-c { transform: translate(190px, 148px) rotate(58deg); animation: j11-flutter-c 8.6s linear -5s infinite; }
        @keyframes j11-drift {
          0%, 100% { transform: translateX(-16px); }
          50% { transform: translateX(16px); }
        }
        @keyframes j11-tick {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes j11-pass {
          from { transform: translateX(-40px); }
          to { transform: translateX(432px); }
        }
        @keyframes j11-wave {
          0%, 100% { transform: rotate(-16deg); }
          50% { transform: rotate(18deg); }
        }
        @keyframes j11-carry {
          0% { transform: translate(206px, 202px); opacity: 0; }
          10% { transform: translate(214px, 200px); opacity: 1; }
          72% { transform: translate(262px, 178px); opacity: 1; }
          84% { transform: translate(276px, 176px); opacity: 0; }
          100% { transform: translate(276px, 176px); opacity: 0; }
        }
        @keyframes j11-flutter-a {
          0% { transform: translate(188px, 96px) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(150px, 178px) rotate(420deg); opacity: 0; }
        }
        @keyframes j11-flutter-b {
          0% { transform: translate(214px, 88px) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(252px, 172px) rotate(-380deg); opacity: 0; }
        }
        @keyframes j11-flutter-c {
          0% { transform: translate(200px, 104px) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(178px, 186px) rotate(340deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .j11-cloud-a, .j11-cloud-b, .j11-cloud-c,
          .j11-hand-h, .j11-hand-m, .j11-far-a, .j11-far-b,
          .j11-tube, .j11-loader,
          .j11-petal-a, .j11-petal-b, .j11-petal-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
