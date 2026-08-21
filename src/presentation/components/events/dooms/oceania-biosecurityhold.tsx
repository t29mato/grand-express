/**
 * 検疫がすべての木箱を波止場で足止めする。
 *
 * 本文の芯は3つ。**検査官が農産物の木箱のなかに、誰もすぐには名前を言えない
 * 虫を見つけること・天敵のいない島で定着する危険を冒せないこと・専門家が
 * 空輸されて同定できるまで、荷物**全体**が波止場に留め置かれること。**
 *
 * 7枚の描き分けで、ここは **強い日差しの昼** の担当。地色は珊瑚砂の白と
 * 木箱の茶で、**水面を主役にしない**(海の3枚と混ざるため)。
 * 影を短く濃くして、真上から日が当たっているようにしてある。
 *
 * 動くのは**木箱のまわりを飛ぶ小さな虫・虫眼鏡を寄せる検査官の腕・
 * 積んだ荷を横切って張られていく黄色い検疫テープ・待つ荷主の足踏み・
 * 板の隙間で光る海**。止めた状態でも、テープが張られ、虫が箱の上にいて、
 * 検査官が覗き込んでいる構図で分かる。
 */
export function OceaniaBiosecurityhold() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 真昼の空。 */}
      <rect width="400" height="210" fill="#e4d8b8" />
      <rect width="400" height="52" fill="#8fc4e8" />
      <rect y="52" width="400" height="26" fill="#bcdcee" />
      <g fill="#f6efe2" opacity="0.9">
        <ellipse cx="52" cy="22" rx="26" ry="9" />
        <ellipse cx="34" cy="26" rx="16" ry="7" />
        <ellipse cx="300" cy="16" rx="30" ry="10" />
        <ellipse cx="326" cy="22" rx="18" ry="7" />
      </g>
      <circle cx="356" cy="42" r="17" fill="#f8e08a" />
      <circle cx="356" cy="42" r="30" fill="#f8e08a" opacity="0.22" />

      {/* 湾の向こうの緑と、細い海。**主役にはしない。** */}
      <path d="M0,78q60,-22 128,-16q66,6 108,16z" fill="#4f7f5f" />
      <path d="M400,78q-56,-20 -120,-14q-52,6 -78,14z" fill="#3f6b4a" />
      <rect y="78" width="400" height="24" fill="#3f92ae" />
      <rect y="94" width="400" height="8" fill="#5fb8c4" />
      <g stroke="#bfe8f4" strokeWidth="2" opacity="0.6" fill="none">
        <path d="M16,88q10,-3 20,0M262,84q10,-3 20,0M328,92q10,-3 20,0" />
      </g>

      {/* 波止場の板。**ここが舞台。** */}
      <rect y="102" width="400" height="108" fill="#b08c5c" />
      <rect y="102" width="400" height="6" fill="#c8a470" />
      <g stroke="#8a6a3c" strokeWidth="2.4" opacity="0.85" fill="none">
        <path d="M0,120h400M0,140h400M0,162h400M0,186h400M0,208h400" />
      </g>
      <g stroke="#8a6a3c" strokeWidth="2" opacity="0.5" fill="none">
        <path d="M52,102v108M148,102v108M256,102v108M348,102v108" />
      </g>
      {/* 板の隙間から見える海。 */}
      <g className="oby-gap" fill="#5fb8c4" opacity="0.55">
        <rect x="0" y="139" width="400" height="2" />
        <rect x="0" y="185" width="400" height="2" />
      </g>
      {/* 係船柱 */}
      <g fill="#6b6458">
        <rect x="12" y="110" width="14" height="16" rx="6" />
        <rect x="368" y="112" width="14" height="16" rx="6" />
      </g>

      {/* 留め置かれた木箱の山(右)。**荷物「全体」が動けない。** */}
      <g>
        <ellipse cx="316" cy="196" rx="76" ry="8" fill="#6b4f2c" opacity="0.3" />
        <g fill="#b08a4f">
          <rect x="252" y="158" width="42" height="34" />
          <rect x="298" y="150" width="46" height="42" />
          <rect x="348" y="164" width="40" height="28" />
          <rect x="268" y="126" width="42" height="30" />
          <rect x="314" y="118" width="38" height="30" />
        </g>
        <g stroke="#7f6234" strokeWidth="1.8" fill="none">
          <path d="M252,158l42,34M294,158l-42,34M298,150l46,42M344,150l-46,42M348,164l40,28M388,164l-40,28M268,126l42,30M310,126l-42,30M314,118l38,30M352,118l-38,30" />
        </g>
        <g fill="#c49a58">
          <rect x="252" y="158" width="42" height="4" />
          <rect x="298" y="150" width="46" height="4" />
          <rect x="268" y="126" width="42" height="4" />
          <rect x="314" y="118" width="38" height="4" />
          <rect x="348" y="164" width="40" height="4" />
        </g>
        {/* 中身が見える箱(すのこの隙間から) */}
        <g fill="#5f8f3f" opacity="0.9">
          <circle cx="330" cy="132" r="5" />
          <circle cx="340" cy="136" r="4" />
          <circle cx="322" cy="138" r="4.4" />
        </g>
      </g>

      {/* **黄色い検疫テープ。**荷の前を横切って張られる。 */}
      <g className="oby-tape">
        <path d="M0,150q100,10 200,0q100,-10 200,4v11q-100,-14 -200,-4q-100,10 -200,0z" fill="#f0c33a" />
        <g fill="#33302c" opacity="0.9">
          <path d="M16,152l12,12h-10l-12,-12z" />
          <path d="M56,154l12,12h-10l-12,-12z" />
          <path d="M96,155l12,12h-10l-12,-12z" />
          <path d="M136,155l12,12h-10l-12,-12z" />
          <path d="M176,154l12,12h-10l-12,-12z" />
          <path d="M216,152l12,12h-10l-12,-12z" />
          <path d="M256,150l12,12h-10l-12,-12z" />
          <path d="M296,149l12,12h-10l-12,-12z" />
          <path d="M336,149l12,12h-10l-12,-12z" />
          <path d="M376,151l12,12h-10l-12,-12z" />
        </g>
      </g>

      {/* **開けられた木箱と、名前の分からない虫。**この絵の主役。 */}
      <g>
        <ellipse cx="106" cy="198" rx="52" ry="7" fill="#6b4f2c" opacity="0.32" />
        <path d="M70,196v-38h72v38z" fill="#b08a4f" />
        <path d="M70,158h72v5H70z" fill="#c49a58" />
        <g stroke="#7f6234" strokeWidth="1.8" fill="none">
          <path d="M70,163l72,33M142,163l-72,33" />
        </g>
        {/* 開いた蓋 */}
        <path d="M66,158l-16,-26l68,-8l14,26z" fill="#c49a58" />
        <g stroke="#8a6b3a" strokeWidth="1.6" fill="none">
          <path d="M56,146l64,-8M62,138l60,-7" />
        </g>
        {/* 中身の農産物 */}
        <g fill="#5f9a3f">
          <ellipse cx="88" cy="160" rx="11" ry="7" />
          <ellipse cx="112" cy="158" rx="12" ry="7.4" />
          <ellipse cx="132" cy="162" rx="9" ry="6" />
          <ellipse cx="100" cy="152" rx="10" ry="6" />
        </g>
        <g fill="#7fb85a">
          <ellipse cx="85" cy="157" rx="5" ry="3" />
          <ellipse cx="109" cy="155" rx="5.4" ry="3.2" />
        </g>
      </g>

      {/* 虫。**1匹だけ。名前が分からないから、荷物ぜんぶが止まる。** */}
      <g className="oby-bug">
        <ellipse cx="0" cy="0" rx="5" ry="3.4" fill="#4a3a2c" />
        <ellipse cx="-4" cy="-1" rx="2.4" ry="2" fill="#2f2620" />
        <path d="M-1,-2q6,-5 10,-1q-5,3 -10,1z" fill="#c8452f" opacity="0.9" />
        <g className="oby-wing" fill="#e8e4dc" opacity="0.6">
          <ellipse cx="1" cy="-4" rx="6" ry="2.2" />
        </g>
        <g stroke="#2f2620" strokeWidth="1" fill="none">
          <path d="M-5,-3l-3,-3M-5,1l-4,2M3,3l2,3" />
        </g>
      </g>
      {/* 虫が飛んだ跡 */}
      <g className="oby-trail" stroke="#8a6a3c" strokeWidth="1.4" strokeDasharray="3 4" opacity="0.5" fill="none">
        <path d="M96,140q22,-16 44,-4q20,11 34,-6" />
      </g>

      {/* 検査官。**虫眼鏡で覗き込んでいる。**白いシャツ。 */}
      <g>
        <ellipse cx="188" cy="200" rx="17" ry="4" fill="#6b4f2c" opacity="0.35" />
        <g fill="#3a4048">
          <rect x="181" y="184" width="6" height="16" rx="2" />
          <rect x="190" y="184" width="6" height="16" rx="2" />
        </g>
        <path d="M178,186l4,-32h16l4,32z" fill="#f2ece0" />
        <path d="M178,186h24v4h-24z" fill="#3f6f9a" />
        <circle cx="190" cy="146" r="8.4" fill="#8a6a4a" />
        <path d="M181,146a9,9 0 0 1 18,0z" fill="#e8e4dc" />
        <path d="M198,160l10,10" stroke="#f2ece0" strokeWidth="5" strokeLinecap="round" fill="none" />
        <g className="oby-lens">
          <path d="M176,160l-14,-6" stroke="#f2ece0" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M162,154l-12,-8" stroke="#8a6a3c" strokeWidth="3" fill="none" />
          <circle cx="140" cy="140" r="12" fill="#bfe8f4" opacity="0.6" />
          <circle cx="140" cy="140" r="12" fill="none" stroke="#8a8f8a" strokeWidth="3" />
          <path d="M133,133a10,10 0 0 1 8,-3" stroke="#f6fbfd" strokeWidth="2.4" fill="none" />
        </g>
        {/* 手にした書類ばさみ */}
        <rect x="204" y="164" width="14" height="18" rx="2" fill="#c8a13f" transform="rotate(12 211 173)" />
      </g>

      {/* 待つ荷主。**別の姿勢・別の色。腕を組んでいる。** */}
      <g className="oby-wait">
        <ellipse cx="232" cy="200" rx="16" ry="4" fill="#6b4f2c" opacity="0.35" />
        <g fill="#4a3a2c">
          <rect x="225" y="186" width="6" height="14" rx="2" />
          <rect x="234" y="186" width="6" height="14" rx="2" />
        </g>
        <path d="M222,188l4,-28h14l4,28z" fill="#c8452f" />
        <circle cx="233" cy="152" r="8" fill="#c98f5f" />
        <path d="M225,150a8.4,8.4 0 0 1 17,1z" fill="#3a3228" />
        <path d="M223,168h20v5h-20z" fill="#c98f5f" />
        <path d="M222,166h22v3h-22z" fill="#a8462c" />
      </g>

      {/* 波止場の縁に置かれた台車。**動かせないので空のまま。** */}
      <g>
        <rect x="16" y="182" width="42" height="6" rx="2" fill="#6b6458" />
        <g fill="#3f3a34">
          <circle cx="24" cy="192" r="4.4" />
          <circle cx="50" cy="192" r="4.4" />
        </g>
        <path d="M56,182v-16h10" stroke="#6b6458" strokeWidth="3" fill="none" />
      </g>

      <style>{`
        .oby-bug {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: oby-buzz 4.6s ease-in-out infinite;
        }
        @keyframes oby-buzz {
          0%   { transform: translate(96px, 142px) rotate(0deg); }
          20%  { transform: translate(126px, 128px) rotate(14deg); }
          42%  { transform: translate(152px, 138px) rotate(-10deg); }
          64%  { transform: translate(132px, 150px) rotate(8deg); }
          84%  { transform: translate(104px, 148px) rotate(-6deg); }
          100% { transform: translate(96px, 142px) rotate(0deg); }
        }
        .oby-wing {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oby-flap 0.18s ease-in-out infinite;
        }
        @keyframes oby-flap {
          0%, 100% { transform: scaleY(1) rotate(-6deg); }
          50%      { transform: scaleY(0.4) rotate(6deg); }
        }
        .oby-trail { animation: oby-fade 4.6s ease-in-out infinite; }
        @keyframes oby-fade {
          0%, 100% { opacity: 0.15; }
          50%      { opacity: 0.55; }
        }
        .oby-tape {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: oby-stretch 6s ease-out infinite;
        }
        @keyframes oby-stretch {
          0%       { transform: scaleX(0.02); }
          30%,100% { transform: scaleX(1); }
        }
        .oby-lens {
          transform-box: fill-box;
          transform-origin: 100% 70%;
          animation: oby-peer 3.4s ease-in-out infinite;
        }
        @keyframes oby-peer {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          50%      { transform: rotate(-7deg) translateX(-5px); }
        }
        .oby-wait {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oby-shift 5.2s ease-in-out infinite;
        }
        @keyframes oby-shift {
          0%, 44%, 100% { transform: rotate(0deg); }
          58%           { transform: rotate(-2.6deg); }
          76%           { transform: rotate(2.2deg); }
        }
        .oby-gap { animation: oby-glint 3.8s ease-in-out infinite; }
        @keyframes oby-glint {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 0.75; }
        }
        @media (prefers-reduced-motion: reduce) {
          .oby-bug, .oby-wing, .oby-trail, .oby-tape, .oby-lens,
          .oby-wait, .oby-gap { animation: none; }
          /* テープは張り終えた状態、虫は箱の上、虫眼鏡は寄せた位置で止める。 */
          .oby-bug {
            transform: translate(126px, 128px) rotate(14deg);
            transform-box: fill-box;
            transform-origin: 50% 50%;
          }
          .oby-trail { opacity: 0.5; }
          .oby-lens {
            transform: rotate(-7deg) translateX(-5px);
            transform-box: fill-box;
            transform-origin: 100% 70%;
          }
        }
      `}</style>
    </svg>
  );
}
