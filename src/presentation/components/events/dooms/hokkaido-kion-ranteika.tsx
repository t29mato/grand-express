/**
 * 急な陽気で道がぬかるむ。
 *
 * 本文の芯は3つ。**季節外れの暖かさが固く締まった雪を深いぬかるみに変えること・
 * 車軸まで沈むこと・夜にはまた固く凍りつくこと。**
 *
 * 雪の絵3枚の描き分けで、ここは **白を主役にしない** 担当。
 * 画面の大半は**溶けかけた雪の下から出てきた茶色い泥**で、
 * 白は屋根と日陰に残った雪、そして**軒から滴る雫**にだけ使う。
 *
 * 動くのは**沈む車輪と跳ねる泥・空回りのタイヤ・押す人の踏ん張り・
 * 軒から落ちる雫**だけ。止めた状態でも、車輪が泥に埋まり、
 * 二人がかりで押している構図で分かる。
 */
export function HokkaidoKionRanteika() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 春めいた午後。空は薄い黄味を帯びる。 */}
      <rect width="400" height="210" fill="#c8b48a" />
      <rect width="400" height="64" fill="#9fbcd0" />
      <rect y="64" width="400" height="22" fill="#c4cfcc" />
      <circle cx="322" cy="30" r="18" fill="#f8dc90" opacity="0.9" />
      <circle cx="322" cy="30" r="36" fill="#f8dc90" opacity="0.18" />

      {/* 奥の丘。**雪はもう斑にしか残っていない。** */}
      <path d="M0,92q54,-24 116,-12q62,12 122,-8q60,-20 162,6v18H0z" fill="#7a7a62" />
      <g fill="#e4ecf0" opacity="0.85">
        <path d="M24,86q22,-8 44,-2q-22,5 -44,2z" />
        <path d="M138,80q26,-9 52,-2q-26,6 -52,2z" />
        <path d="M300,84q24,-8 48,-2q-24,6 -48,2z" />
      </g>
      {/* 林。 */}
      <g fill="#33513f">
        <path d="M8,100l7,-20 7,20z" />
        <path d="M28,100l6,-17 6,17z" />
        <path d="M48,100l7,-19 7,19z" />
        <path d="M348,100l7,-20 7,20z" />
        <path d="M370,100l6,-17 6,17z" />
      </g>

      {/* 農家の小屋。**屋根の雪が溶けて、軒から雫が落ちる。** */}
      <g>
        <rect x="272" y="104" width="88" height="38" fill="#d8cfbc" />
        <path d="M266,104h100l-16,-20h-68z" fill="#8a5a3a" />
        <path d="M266,104h100v-4H266z" fill="#e8eef2" />
        <path d="M270,100h92q-24,-6 -46,-4q-22,2 -46,4z" fill="#f2f7fa" />
        <g fill="#4a4038">
          <rect x="288" y="116" width="16" height="16" />
          <rect x="322" y="116" width="16" height="16" />
        </g>
        <rect x="298" y="126" width="26" height="16" fill="#6b5a44" />
      </g>
      <g className="hkm-drip1" fill="#cfe4f0">
        <ellipse cx="278" cy="106" rx="2.4" ry="4" />
      </g>
      <g className="hkm-drip2" fill="#cfe4f0">
        <ellipse cx="352" cy="106" rx="2.2" ry="3.6" />
      </g>
      {/* つらら。 */}
      <g fill="#dfeef8">
        <path d="M274,104l2.4,10 2.4,-10z" />
        <path d="M300,104l2,8 2,-8z" />
        <path d="M348,104l2.4,9 2.4,-9z" />
      </g>

      {/* 溶けかけた雪原と、その下から出た泥。 */}
      <rect y="108" width="400" height="102" fill="#8a7a5a" />
      <path d="M0,108q60,10 128,4q80,-8 150,4q66,10 122,-2v18H0z" fill="#a89474" />
      <g fill="#e4ecf0" opacity="0.9">
        <path d="M0,116q36,-10 76,-2q-38,8 -76,2z" />
        <path d="M336,120q34,-8 64,-1q-32,7 -64,1z" />
        <path d="M150,112q30,-8 58,-1q-28,7 -58,1z" />
      </g>

      {/* 道。**わだちが深くえぐれている。** */}
      <path d="M0,146h400v64H0z" fill="#6b5232" />
      <path d="M0,146q80,-8 168,2q92,10 232,-4v10H0z" fill="#7f6440" />
      <g fill="#59422a" opacity="0.9">
        <path d="M0,176q90,-10 190,2q90,10 210,-2v12q-120,12 -210,2q-100,-10 -190,0z" />
      </g>
      {/* 水たまり。**空の色を映す。** */}
      <g fill="#9fb0b4" opacity="0.8">
        <ellipse cx="66" cy="192" rx="46" ry="9" />
        <ellipse cx="330" cy="182" rx="38" ry="7" />
      </g>
      <g fill="#c4d4d8" opacity="0.55">
        <ellipse cx="54" cy="190" rx="18" ry="3.4" />
        <ellipse cx="322" cy="181" rx="14" ry="2.6" />
      </g>

      {/* 泥にはまった車。**後輪が軸まで沈んでいる。** */}
      <g>
        <g className="hkm-car">
          <path d="M118,180v-20q0,-6 8,-6h16l13,-17h44l11,17h18q7,0 7,6v20z" fill="#c0453c" />
          <path d="M118,180v-9h117v9z" fill="#8f312b" />
          <path d="M148,154l11,-14h34l9,14z" fill="#9fb4c4" />
          <path d="M160,152l7,-10h22l6,10z" fill="#5f7386" />
          {/* 運転席の人影 */}
          <path d="M170,152v-7a4.6,4.6 0 0 1 9.2,0v7z" fill="#3a3f47" />
          <circle cx="174.6" cy="144" r="3.6" fill="#3a3f47" />
          <g fill="#f8dc90">
            <rect x="228" y="162" width="8" height="6" rx="2" />
          </g>
          {/* 前輪(まだ回る) */}
          <g fill="#2a2620">
            <circle cx="146" cy="180" r="10" />
          </g>
          <circle cx="146" cy="180" r="3.6" fill="#8a8f96" />
          {/* 後輪。**泥に沈み、空転している。** */}
          <g className="hkm-spin">
            <circle cx="216" cy="180" r="10" fill="#2a2620" />
            <g stroke="#7a7f86" strokeWidth="2" fill="none">
              <path d="M216,171v18M207,180h18M210,174l12,12M222,174l-12,12" />
            </g>
          </g>
        </g>
        {/* 沈んだぶんを埋める泥。**車体の下に厚く盛る。** */}
        <path d="M186,186q30,-10 62,-2q-6,12 -32,14q-26,2 -30,-12z" fill="#59422a" />
        <path d="M196,190q22,-6 44,0q-8,7 -24,8q-18,0 -20,-8z" fill="#4a3620" />
      </g>

      {/* 跳ねる泥。**空転する車輪の後ろへ飛ぶ。** */}
      <g className="hkm-splat" fill="#4a3620">
        <ellipse cx="0" cy="0" rx="7" ry="5" />
        <ellipse cx="13" cy="-7" rx="4.4" ry="3.4" />
        <ellipse cx="-11" cy="-4" rx="3.4" ry="2.6" />
      </g>

      {/* 押している人。**赤。前かがみで踏ん張る。** */}
      <g className="hkm-push">
        <path d="M262,204h10l1,-24h-10z" fill="#3a3228" />
        <path d="M276,204h10l-2,-24h-10z" fill="#4a4038" />
        <path d="M258,180l8,-28h22l4,28z" fill="#c0453c" />
        <circle cx="286" cy="146" r="9" fill="#e8c8a8" />
        <path d="M277,145a9,9 0 0 1 18,0z" fill="#f5b31c" />
        <path d="M262,158l-22,14" stroke="#c0453c" strokeWidth="6.4" strokeLinecap="round" fill="none" />
        <path d="M266,168l-20,10" stroke="#c0453c" strokeWidth="6.4" strokeLinecap="round" fill="none" />
      </g>

      {/* スコップで泥をかく人。**青。しゃがんだ姿勢。別の人物にする。** */}
      <g>
        <g className="hkm-dig">
          <path d="M330,204h10l2,-20h-10z" fill="#2f3a48" />
          <path d="M344,204h10v-20h-10z" fill="#39455a" />
          <path d="M326,184l6,-24h22l4,24z" fill="#2f6f9a" />
          <rect x="328" y="170" width="28" height="5" fill="#1f5678" />
          <circle cx="342" cy="152" r="9" fill="#c8a880" />
          <path d="M333,151a9,9 0 0 1 18,0z" fill="#e8e4d8" />
          <path d="M328,168l-22,10" stroke="#2f6f9a" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M304,176l-16,8" stroke="#6b5330" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M290,180l-16,10 5,10 16,-9z" fill="#b8bcc4" />
        </g>
      </g>

      {/* 泥の上の轍(手前)。 */}
      <g stroke="#59422a" strokeWidth="2.6" fill="none" opacity="0.8">
        <path d="M0,200q80,-8 160,2M0,208q84,-8 168,2" />
      </g>

      <style>{`
        .hkm-car {
          transform-box: fill-box;
          transform-origin: 20% 100%;
          animation: hkm-rock 2.8s ease-in-out infinite;
        }
        @keyframes hkm-rock {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          40%      { transform: translateY(2.4px) rotate(1.4deg); }
          70%      { transform: translateY(0.8px) rotate(-0.6deg); }
        }
        .hkm-spin {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: hkm-slip 0.7s linear infinite;
        }
        @keyframes hkm-slip {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .hkm-splat {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: hkm-fly 1.4s ease-out infinite;
        }
        @keyframes hkm-fly {
          0%   { transform: translate(224px, 182px) scale(0.4); opacity: 0; }
          25%  { transform: translate(248px, 160px) scale(0.9); opacity: 1; }
          70%  { transform: translate(276px, 152px) scale(1.1); opacity: 0.9; }
          100% { transform: translate(304px, 188px) scale(1.2); opacity: 0; }
        }
        .hkm-push {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: hkm-heave 2.8s ease-in-out infinite;
        }
        @keyframes hkm-heave {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          40%      { transform: translateX(-5px) rotate(-4deg); }
        }
        .hkm-dig {
          transform-box: fill-box;
          transform-origin: 70% 100%;
          animation: hkm-scoop 2.2s ease-in-out infinite;
        }
        @keyframes hkm-scoop {
          0%, 100% { transform: rotate(0deg); }
          45%      { transform: rotate(8deg); }
        }
        .hkm-drip1 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: hkm-fall 2.1s ease-in infinite;
        }
        .hkm-drip2 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: hkm-fall 2.1s ease-in 0.9s infinite;
        }
        @keyframes hkm-fall {
          0%   { transform: translateY(0) scaleY(0.6); opacity: 0; }
          20%  { transform: translateY(6px) scaleY(1); opacity: 1; }
          100% { transform: translateY(56px) scaleY(1.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hkm-car, .hkm-spin, .hkm-splat, .hkm-push, .hkm-dig,
          .hkm-drip1, .hkm-drip2 { animation: none; }
          .hkm-splat {
            transform: translate(240px, 152px) scale(1);
            transform-box: fill-box;
            transform-origin: 50% 50%;
          }
          .hkm-push {
            transform: translateX(-5px) rotate(-4deg);
            transform-box: fill-box;
            transform-origin: 100% 100%;
          }
          .hkm-drip1 {
            transform: translateY(20px);
            transform-box: fill-box;
            transform-origin: 50% 0%;
          }
        }
      `}</style>
    </svg>
  );
}
