/**
 * 代行バスが満員で乗れない。
 *
 * 本文の芯は3つ。**鉄道の代わりのバスは1日4本しかないこと・
 * 停留所に着く前からもう立ち客で埋まっていること・次は3時間後であること。**
 *
 * **この盤面の芯(廃線)に一番近い1枚**なので、背景に**草に埋もれた路盤と
 * 錆びた踏切**を置いた。都市の背景で使った車止めと同じことを、別の角度から言う。
 * **廃墟としては描かない。**バスは走っているし、人も待っている。
 *
 * 動くのは**走り去るバス・立ち客の揺れ・上がる砂ぼこり・
 * 手を挙げたまま止まった旅人の腕**だけ。止めた状態でも、満員のバスが停留所を
 * 過ぎていき、鞄を持った旅人が残されている構図で分かる。
 */
export function HokkaidoDaikoubasuManin() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼下がりの曇り空。 */}
      <rect width="400" height="210" fill="#b9c8cc" />
      <rect width="400" height="72" fill="#aabcc4" />
      <g fill="#c8d4d8" opacity="0.8">
        <ellipse cx="70" cy="30" rx="34" ry="11" />
        <ellipse cx="300" cy="22" rx="42" ry="12" />
      </g>

      {/* 奥の丘と防風林。 */}
      <path d="M0,86q60,-22 130,-12q70,10 132,-8q66,-18 138,4v22H0z" fill="#6e8470" />
      <g fill="#33513f">
        <path d="M14,92l7,-18 7,18z" />
        <path d="M34,92l6,-15 6,15z" />
        <path d="M54,92l7,-17 7,17z" />
        <path d="M240,92l7,-19 7,19z" />
        <path d="M262,92l6,-16 6,16z" />
        <path d="M284,92l7,-18 7,18z" />
        <path d="M306,92l6,-15 6,15z" />
        <path d="M328,92l7,-17 7,17z" />
      </g>
      <rect y="90" width="400" height="8" fill="#33513f" />

      {/* 草原。 */}
      <rect y="96" width="400" height="114" fill="#8a9a5f" />
      <rect y="96" width="400" height="16" fill="#7f9052" />

      {/* **草に埋もれた路盤。**レールはもう無い。砂利の帯と枕木だけが残る。 */}
      <path d="M0,122h400v14H0z" fill="#a09880" opacity="0.75" />
      <g fill="#5a4a36" opacity="0.9">
        <rect x="6" y="126" width="17" height="5" />
        <rect x="34" y="128" width="17" height="5" />
        <rect x="62" y="126" width="17" height="5" />
        <rect x="90" y="128" width="17" height="5" />
        <rect x="118" y="126" width="17" height="5" />
        <rect x="146" y="128" width="17" height="5" />
        <rect x="286" y="126" width="17" height="5" />
        <rect x="314" y="128" width="17" height="5" />
        <rect x="342" y="126" width="17" height="5" />
        <rect x="370" y="128" width="17" height="5" />
      </g>
      <g stroke="#7f9a52" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <path d="M20,138l-3,-7M20,138v-8M20,138l4,-7" />
        <path d="M78,136l-3,-6M78,136v-7M78,136l4,-6" />
        <path d="M132,139l-3,-7M132,139v-8M132,139l4,-7" />
        <path d="M300,138l-3,-7M300,138v-8M300,138l4,-7" />
        <path d="M358,136l-3,-6M358,136v-7M358,136l4,-6" />
      </g>

      {/* 錆びた踏切。**遮断機は上がったまま、二度と下りない。** */}
      <g>
        <rect x="196" y="96" width="5" height="42" fill="#8a5a3a" />
        <path d="M182,96h34l-17,-11z" fill="#8a5a3a" />
        <g stroke="#e8e0d0" strokeWidth="4" fill="none">
          <path d="M184,72l30,20M214,72l-30,20" />
        </g>
        <g fill="#c0453c">
          <circle cx="190" cy="100" r="3.4" />
          <circle cx="208" cy="100" r="3.4" />
        </g>
        <g>
          <rect x="204" y="70" width="5" height="42" fill="#e8e0d0" />
          <rect x="204" y="78" width="5" height="10" fill="#c0453c" />
          <rect x="204" y="96" width="5" height="10" fill="#c0453c" />
        </g>
      </g>

      {/* 道路。手前を横切る。 */}
      <rect y="144" width="400" height="66" fill="#6b6b62" />
      <rect y="144" width="400" height="5" fill="#8a8a7e" />
      <g fill="#e8e4d0" opacity="0.75">
        <rect x="10" y="186" width="36" height="4" />
        <rect x="86" y="186" width="36" height="4" />
        <rect x="162" y="186" width="36" height="4" />
        <rect x="238" y="186" width="36" height="4" />
        <rect x="314" y="186" width="36" height="4" />
      </g>

      {/* 満員のまま走り去る代行バス。 */}
      <g className="hkd-bus">
        <ellipse cx="230" cy="180" rx="98" ry="7" fill="#000" opacity="0.22" />
        <rect x="136" y="118" width="190" height="58" rx="7" fill="#e8e4d8" />
        <rect x="136" y="160" width="190" height="16" fill="#3f6f9a" />
        <rect x="136" y="118" width="190" height="8" rx="4" fill="#d8d4c8" />
        {/* 窓。**立っている人で埋まっている。** */}
        <g fill="#5f8fa8">
          <rect x="146" y="126" width="38" height="26" />
          <rect x="190" y="126" width="38" height="26" />
          <rect x="234" y="126" width="38" height="26" />
          <rect x="278" y="126" width="38" height="26" />
        </g>
        <g className="hkd-riders" fill="#2f3a48">
          <circle cx="156" cy="136" r="5" />
          <circle cx="170" cy="139" r="5" />
          <circle cx="200" cy="135" r="5" />
          <circle cx="214" cy="139" r="5" />
          <circle cx="244" cy="137" r="5" />
          <circle cx="258" cy="134" r="5" />
          <circle cx="288" cy="138" r="5" />
          <circle cx="302" cy="135" r="5" />
        </g>
        <g fill="#46536b">
          <rect x="151" y="141" width="10" height="11" />
          <rect x="165" y="144" width="10" height="8" />
          <rect x="195" y="140" width="10" height="12" />
          <rect x="209" y="144" width="10" height="8" />
          <rect x="239" y="142" width="10" height="10" />
          <rect x="253" y="139" width="10" height="13" />
          <rect x="283" y="143" width="10" height="9" />
          <rect x="297" y="140" width="10" height="12" />
        </g>
        {/* つり革 */}
        <g stroke="#8a8578" strokeWidth="1.4" fill="none">
          <path d="M162,126v6M206,126v6M250,126v6M294,126v6" />
        </g>
        <g fill="#3a3f47">
          <circle cx="172" cy="176" r="11" />
          <circle cx="292" cy="176" r="11" />
        </g>
        <g fill="#8a8f96">
          <circle cx="172" cy="176" r="4" />
          <circle cx="292" cy="176" r="4" />
        </g>
        <rect x="316" y="130" width="12" height="9" rx="2" fill="#f5b31c" />
        <rect x="140" y="130" width="12" height="9" rx="2" fill="#c0453c" />
        {/* 行き先の幕(文字は描かない。色の帯だけ) */}
        <rect x="222" y="120" width="52" height="6" fill="#3a3f47" />
        <rect x="228" y="121.4" width="16" height="3.4" fill="#f5b31c" />
      </g>

      {/* バスが巻き上げる砂ぼこり。 */}
      <g className="hkd-dust" fill="#c8bfa4" opacity="0.55">
        <ellipse cx="120" cy="176" rx="26" ry="9" />
        <ellipse cx="92" cy="182" rx="18" ry="7" />
        <ellipse cx="66" cy="176" rx="12" ry="5" />
      </g>

      {/* 停留所の標識。**時刻表は4本しか無い。**(文字は描かず、線の数で示す) */}
      <g>
        <rect x="46" y="126" width="4.4" height="66" fill="#6b7078" />
        <ellipse cx="48" cy="124" rx="11" ry="11.5" fill="#f0ece0" />
        <ellipse cx="48" cy="124" rx="11" ry="11.5" fill="none" stroke="#3f6f9a" strokeWidth="2.6" />
        <path d="M42,120h12v7H42z" fill="#3f6f9a" />
        <rect x="50" y="146" width="19" height="26" fill="#e8e4d8" />
        <g stroke="#8a8578" strokeWidth="1.6" fill="none">
          <path d="M53,152h13M53,158h13M53,164h13M53,170h9" />
        </g>
      </g>

      {/* 置いていかれた旅人。**緑の上着・鞄・手を挙げたまま。** */}
      <g>
        <path d="M84,204h9l3,-24h-9z" fill="#3a3228" />
        <path d="M98,204h9l1,-24h-9z" fill="#4a4038" />
        <path d="M80,180l5,-28h22l5,28z" fill="#3f7a5a" />
        <rect x="82" y="166" width="26" height="5" fill="#2f5f44" />
        <circle cx="96" cy="144" r="9" fill="#e8c8a8" />
        <path d="M87,143a9,9 0 0 1 18,0z" fill="#c8a02c" />
        <g className="hkd-hail">
          <path d="M108,162l14,-16" stroke="#3f7a5a" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="124" cy="144" r="4" fill="#e8c8a8" />
        </g>
        <path d="M82,164l-10,12" stroke="#3f7a5a" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* 足元の鞄 */}
        <rect x="58" y="184" width="26" height="20" rx="3" fill="#8a5a3a" />
        <rect x="58" y="190" width="26" height="4" fill="#6b4028" />
        <path d="M66,184v-6h10v6" stroke="#6b4028" strokeWidth="2.4" fill="none" />
      </g>

      {/* 草の株(手前)。 */}
      <g stroke="#7f9a4a" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M340,206l-4,-9M340,206v-10M340,206l5,-9" />
        <path d="M372,200l-3,-8M372,200v-9M372,200l4,-8" />
      </g>

      <style>{`
        .hkd-bus {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: hkd-leave 4.6s ease-in infinite;
        }
        @keyframes hkd-leave {
          0%   { transform: translateX(-26px); }
          70%  { transform: translateX(46px); }
          100% { transform: translateX(76px); }
        }
        .hkd-riders {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: hkd-sway 1.5s ease-in-out infinite;
        }
        @keyframes hkd-sway {
          0%, 100% { transform: translateX(-2.4px) rotate(-1deg); }
          50%      { transform: translateX(2.4px) rotate(1deg); }
        }
        .hkd-dust {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: hkd-puff 2.4s ease-out infinite;
        }
        @keyframes hkd-puff {
          0%   { transform: translateX(20px) scale(0.5); opacity: 0.6; }
          100% { transform: translateX(-34px) scale(1.5); opacity: 0; }
        }
        .hkd-hail {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: hkd-drop 4.6s ease-in-out infinite;
        }
        @keyframes hkd-drop {
          0%, 40%   { transform: rotate(0deg); }
          60%, 100% { transform: rotate(26deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hkd-bus, .hkd-riders, .hkd-dust, .hkd-hail { animation: none; }
          .hkd-bus {
            transform: translateX(46px);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
          .hkd-dust { opacity: 0.4; }
        }
      `}</style>
    </svg>
  );
}
