/**
 * 全域が停電する。
 *
 * 本文の芯は4つ。**発電所が一つ止まるだけで島全体が一斉に暗くなること・
 * 列車が駅と駅のあいだで止まること・カード読み取り機が反応しなくなること・
 * 使えるのは現金だけになること。**
 *
 * 暗い画面なので、**明かりの数を絞る**——非常灯の緑、携帯の白、
 * ろうそくの橙、遠くの発電所の赤い航空障害灯。それ以外は光らせない。
 * 空だけは残しておかないと、真っ黒の板になって何も読めなくなる。
 *
 * 動くのは**携帯の明かりの揺れ・非常灯の点滅・レジの上のろうそく・
 * 発電所の障害灯**だけ。止めた状態でも、駅間で止まった列車・暗い店先・
 * 反応しないカード読み取り機に差し出された現金で分かる。
 */
export function HokkaidoBurakkuauto() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜。**星は出ている。**街の灯が消えたので、かえって見える。 */}
      <rect width="400" height="210" fill="#0f1826" />
      <rect width="400" height="88" fill="#121e30" />
      <g fill="#cfdce8" opacity="0.75">
        <circle cx="36" cy="18" r="1.4" />
        <circle cx="84" cy="34" r="1.1" />
        <circle cx="150" cy="14" r="1.5" />
        <circle cx="212" cy="30" r="1.2" />
        <circle cx="268" cy="16" r="1.3" />
        <circle cx="330" cy="36" r="1.4" />
        <circle cx="376" cy="20" r="1.1" />
      </g>

      {/* 遠くの発電所。**煙突の赤い灯だけが残っている。** */}
      <g fill="#16243a">
        <rect x="300" y="62" width="70" height="30" />
        <rect x="316" y="34" width="10" height="28" />
        <rect x="340" y="42" width="9" height="20" />
      </g>
      <g className="hkb-tower">
        <circle cx="321" cy="32" r="2.6" fill="#e8443f" />
        <circle cx="321" cy="32" r="8" fill="#e8443f" opacity="0.2" />
      </g>

      {/* 暗い町並み(中景)。**窓は一つも点いていない。** */}
      <g fill="#182640">
        <rect x="0" y="70" width="54" height="42" />
        <rect x="60" y="80" width="40" height="32" />
        <rect x="106" y="64" width="46" height="48" />
        <rect x="158" y="84" width="36" height="28" />
        <rect x="236" y="76" width="44" height="36" />
      </g>
      <g fill="#101a2c">
        <rect x="8" y="80" width="10" height="12" />
        <rect x="26" y="80" width="10" height="12" />
        <rect x="114" y="74" width="10" height="12" />
        <rect x="132" y="74" width="10" height="12" />
        <rect x="246" y="86" width="9" height="11" />
        <rect x="262" y="86" width="9" height="11" />
      </g>

      {/* 高架と、駅間で止まった列車。**非常灯だけが緑に点く。** */}
      <rect y="112" width="400" height="10" fill="#22304a" />
      <g fill="#1a2740">
        <rect x="30" y="122" width="14" height="26" />
        <rect x="180" y="122" width="14" height="26" />
        <rect x="330" y="122" width="14" height="26" />
      </g>
      <g>
        <rect x="52" y="82" width="196" height="30" rx="5" fill="#243450" />
        <rect x="52" y="104" width="196" height="8" fill="#1b2740" />
        <g fill="#0f1826">
          <rect x="62" y="88" width="26" height="14" />
          <rect x="96" y="88" width="26" height="14" />
          <rect x="130" y="88" width="26" height="14" />
          <rect x="164" y="88" width="26" height="14" />
          <rect x="198" y="88" width="26" height="14" />
        </g>
        {/* 車内の非常灯と、立ったままの乗客の影。 */}
        <g className="hkb-emergency">
          <rect x="62" y="88" width="26" height="4" fill="#6fd89a" opacity="0.85" />
          <rect x="130" y="88" width="26" height="4" fill="#6fd89a" opacity="0.85" />
          <rect x="198" y="88" width="26" height="4" fill="#6fd89a" opacity="0.85" />
        </g>
        <g fill="#0b1220">
          <path d="M70,102v-7a4,4 0 0 1 8,0v7z" />
          <circle cx="74" cy="93" r="3.4" />
          <path d="M138,102v-8a4,4 0 0 1 8,0v8z" />
          <circle cx="142" cy="92" r="3.4" />
          <path d="M206,102v-6a4,4 0 0 1 8,0v6z" />
          <circle cx="210" cy="94" r="3.4" />
        </g>
      </g>

      {/* 通り。 */}
      <rect y="148" width="400" height="62" fill="#141f31" />
      <rect y="148" width="400" height="5" fill="#1d2b42" />

      {/* 店先。**シャッターの下、カード読み取り機は黒いまま。ろうそくが一本。** */}
      <g>
        <rect x="236" y="118" width="164" height="60" fill="#1a2740" />
        <rect x="236" y="118" width="164" height="7" fill="#22304a" />
        <g stroke="#141f31" strokeWidth="1.6" fill="none">
          <path d="M236,132h164M236,142h164M236,152h164M236,162h164" />
        </g>
        {/* レジ台 */}
        <rect x="262" y="164" width="112" height="10" fill="#4a5a70" />
        <rect x="284" y="150" width="34" height="14" rx="2" fill="#3a4a63" />
        {/* カード読み取り機。**画面は真っ暗。** */}
        <rect x="330" y="146" width="20" height="18" rx="3" fill="#57657c" />
        <rect x="333" y="149" width="14" height="8" fill="#0b1220" />
        {/* 差し出された現金 */}
        <g transform="rotate(-12 296 158)">
          <rect x="286" y="152" width="24" height="12" rx="1.4" fill="#efe6c2" />
          <rect x="290" y="155" width="16" height="6" rx="1" fill="#c0b48c" />
        </g>
        {/* ろうそく */}
        <rect x="268" y="152" width="6" height="12" fill="#e8e0cc" />
        <g className="hkb-flame">
          <ellipse cx="271" cy="148" rx="3" ry="5" fill="#f5b31c" />
          <ellipse cx="271" cy="149" rx="1.4" ry="2.6" fill="#f8e8a8" />
        </g>
        <circle cx="271" cy="150" r="30" fill="#f5b31c" opacity="0.1" className="hkb-candleglow" />
      </g>

      {/* 携帯の明かりを掲げる人。**黄色い上着。この絵で一番明るいのは手のひらの上。** */}
      <g>
        <path d="M96,206h9l3,-26h-9z" fill="#101a2c" />
        <path d="M110,206h9l1,-26h-9z" fill="#16243a" />
        <path d="M92,180l5,-30h24l5,30z" fill="#c8a02c" />
        <rect x="94" y="164" width="28" height="5" fill="#8a6a1c" />
        <circle cx="109" cy="142" r="9" fill="#c8a880" />
        <path d="M100,141a9,9 0 0 1 18,0z" fill="#2b3d54" />
        <g className="hkb-phone">
          <path d="M120,162l14,-18" stroke="#c8a02c" strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="130" y="132" width="9" height="15" rx="2" fill="#e8eef4" />
          <path d="M134,132l-26,-26 66,0z" fill="#e8eef4" opacity="0.16" />
          <circle cx="134" cy="138" r="17" fill="#e8eef4" opacity="0.14" />
        </g>
        <path d="M94,162l-12,10" stroke="#c8a02c" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>

      {/* 消えた信号機と街灯。**光っていないことを見せる。** */}
      <g>
        <rect x="200" y="140" width="4" height="52" fill="#2b3d54" />
        <rect x="188" y="132" width="30" height="11" rx="2.4" fill="#22304a" />
        <g fill="#111c2e">
          <circle cx="196" cy="137.5" r="3.4" />
          <circle cx="206" cy="137.5" r="3.4" />
          <circle cx="215" cy="137.5" r="2.6" />
        </g>
      </g>
      <g fill="#22304a">
        <rect x="44" y="128" width="4" height="60" />
        <path d="M40,128h12l-3,7h-6z" />
      </g>

      <style>{`
        .hkb-phone {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: hkb-sweep 4.2s ease-in-out infinite;
        }
        @keyframes hkb-sweep {
          0%, 100% { transform: rotate(-6deg); }
          50%      { transform: rotate(9deg); }
        }
        .hkb-flame {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: hkb-flicker 1.3s ease-in-out infinite;
        }
        @keyframes hkb-flicker {
          0%, 100% { transform: scale(1) skewX(0deg); }
          30%      { transform: scale(1.15, 0.9) skewX(6deg); }
          65%      { transform: scale(0.9, 1.1) skewX(-5deg); }
        }
        .hkb-candleglow { animation: hkb-glow 1.3s ease-in-out infinite; }
        @keyframes hkb-glow {
          0%, 100% { opacity: 0.08; }
          40%      { opacity: 0.16; }
        }
        .hkb-emergency { animation: hkb-blink 2.6s steps(1, end) infinite; }
        @keyframes hkb-blink {
          0%, 74%   { opacity: 1; }
          75%, 100% { opacity: 0.35; }
        }
        .hkb-tower { animation: hkb-beacon 2s ease-in-out infinite; }
        @keyframes hkb-beacon {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hkb-phone, .hkb-flame, .hkb-candleglow, .hkb-emergency, .hkb-tower { animation: none; }
          .hkb-phone {
            transform: rotate(6deg);
            transform-box: fill-box;
            transform-origin: 0% 100%;
          }
        }
      `}</style>
    </svg>
  );
}
