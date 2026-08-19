/**
 * 雪崩で線路が塞がる。
 *
 * 本文の芯は3つ。**雪と岩で埋まること・急峻な山岳路線であること・
 * 除雪隊が掘り出すまで線が閉じること。**
 *
 * 昼の青空にアルプスの峰、停まった列車の脇に白い雪塊——という枠は
 * `europe-lawine` が既に持っている。こちらは**極夜の濃紺・フィヨルドの壁を
 * 削った棚の線路・雪に混じった岩・黄色いロータリー除雪車と掘っている除雪隊**で組む。
 *
 * 動くのは**除雪車のオーガと投雪・作業灯・ガリーを伝って落ち続ける雪**だけ。
 * 止めた状態でも、岩まじりの堆積が線路を埋め、除雪車と隊員が掘っている構図で分かる。
 */
export function NorwaySnoskred() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 極夜の空。 */}
      <rect width="400" height="210" fill="#16233a" />
      <rect y="0" width="400" height="86" fill="#111c30" />
      <g fill="#cfdce8" opacity="0.75">
        <circle cx="248" cy="16" r="1.5" />
        <circle cx="292" cy="34" r="1.2" />
        <circle cx="330" cy="12" r="1.4" />
        <circle cx="368" cy="30" r="1.2" />
        <circle cx="212" cy="40" r="1.1" />
      </g>
      <path d="M212,26c48,-14 104,-8 188,10v10c-84,-16 -140,-20 -188,-8z" fill="#3f7a68" opacity="0.28" />

      {/* 対岸(中景)。灯りがひとつだけ点いている。 */}
      <path d="M232,124c34,-20 82,-26 168,-18v18z" fill="#1a2c3e" />
      <g fill="#f5b31c">
        <rect x="318" y="112" width="5" height="5" />
      </g>
      <circle cx="320.5" cy="114" r="10" fill="#f5b31c" opacity="0.12" />

      {/* フィヨルドの黒い水(中景・右下)。 */}
      <rect y="124" width="400" height="86" fill="#12202e" />
      <g stroke="#25405a" strokeWidth="2.4" fill="none" opacity="0.8">
        <path d="M258,140h80M300,158h92M272,176h64" />
      </g>

      {/* 壁を削った棚。線路はその上を通る。 */}
      <path d="M0,210V0h196l-16,42 22,26 -18,34 26,30 -14,26 18,52z" fill="#2a3444" />
      <path d="M0,210V0h136l-14,40 20,26 -16,32 24,30 -12,26 16,56z" fill="#212a38" />
      <g stroke="#151c27" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <path d="M34,8l16,52-10,38 14,30" />
        <path d="M94,2l-10,44 18,36-8,32" />
        <path d="M156,14l-14,40 16,34" />
      </g>
      {/* 崩れ落ちたガリー(溝)。 */}
      <path d="M118,0h34l-6,46 12,30 -16,38 10,28h-40l8,-30 -14,-36 14,-32z" fill="#39465a" />
      <path d="M126,0h18l-4,44 8,28 -10,36 6,26h-20l4,-28 -10,-34 10,-30z" fill="#4a5a70" />

      {/* 壁を削った棚(路盤)。フィヨルドの上に細く張り出している。 */}
      <path d="M0,172h400v38H0z" fill="#2a3444" />
      <path d="M0,166h400v8H0z" fill="#4a5666" />
      <path d="M0,196h400v14H0z" fill="#212a38" />
      {/* 落石よけの柵(急峻な路線であることを示す)。 */}
      <g fill="#232c38">
        <rect x="196" y="140" width="4" height="28" />
        <rect x="228" y="142" width="4" height="26" />
        <rect x="260" y="144" width="4" height="24" />
        <rect x="292" y="146" width="4" height="22" />
        <rect x="324" y="148" width="4" height="20" />
        <rect x="356" y="150" width="4" height="18" />
      </g>
      <g stroke="#232c38" strokeWidth="2" fill="none">
        <path d="M194,148h168M194,158h168" />
      </g>

      {/* 線路。**右半分は埋まらずに残る**ので、鉄道の絵だと分かる。 */}
      <g fill="#2a2018">
        <rect x="6" y="176" width="16" height="9" />
        <rect x="38" y="176" width="16" height="9" />
        <rect x="70" y="176" width="16" height="9" />
        <rect x="102" y="176" width="16" height="9" />
        <rect x="134" y="176" width="16" height="9" />
        <rect x="166" y="176" width="16" height="9" />
        <rect x="326" y="176" width="16" height="9" />
        <rect x="358" y="176" width="16" height="9" />
        <rect x="390" y="176" width="16" height="9" />
      </g>
      <g stroke="#9aa4b0" strokeWidth="2.6" fill="none">
        <path d="M0,178h400M0,186h400" />
      </g>

      {/* ガリーを伝って落ち続ける雪。**細く動く。** */}
      <g className="nsk-trickle">
        <path d="M132,0c6,26 4,52 -2,78c-4,18 -2,34 4,50h-18c-6,-18 -8,-34 -4,-52c6,-26 8,-50 2,-76z" fill="#dfe8f0" opacity="0.85" />
        <g fill="#5f6b7a">
          <ellipse cx="128" cy="46" rx="5" ry="3.4" />
          <ellipse cx="120" cy="88" rx="4" ry="3" />
        </g>
      </g>

      {/* 線路を埋めた堆積。**雪に岩が混じっている。**平らな板にならないよう、
          丸い塊を重ねて積む。 */}
      <g fill="#e8eef4">
        <ellipse cx="24" cy="150" rx="46" ry="34" />
        <ellipse cx="74" cy="164" rx="44" ry="30" />
        <ellipse cx="122" cy="178" rx="38" ry="24" />
        <ellipse cx="158" cy="192" rx="30" ry="18" />
        <rect x="0" y="160" width="190" height="50" />
      </g>
      <g fill="#dbe4ee">
        <ellipse cx="14" cy="178" rx="40" ry="24" />
        <ellipse cx="70" cy="190" rx="40" ry="20" />
        <ellipse cx="126" cy="198" rx="32" ry="14" />
      </g>
      <g fill="#c4d2e0">
        <ellipse cx="34" cy="202" rx="44" ry="14" />
        <ellipse cx="104" cy="206" rx="38" ry="11" />
      </g>
      {/* 岩。半分埋まっているものを混ぜる。 */}
      <g fill="#3f4a5c">
        <path d="M18,140l20,-9 14,15 -13,14 -18,-6z" />
        <path d="M92,158l16,-7 10,13 -11,11 -14,-5z" />
        <path d="M46,182l14,-6 9,11 -10,10 -12,-5z" />
      </g>
      <g fill="#57647a">
        <path d="M66,148l12,-5 7,9 -8,8 -10,-4z" />
        <path d="M126,176l11,-5 6,9 -8,7 -9,-4z" />
        <path d="M6,168l13,-6 7,10 -9,8 -10,-4z" />
      </g>
      <g fill="#4a5666">
        <path d="M28,196l16,-5 6,10 -12,7 -10,-5z" />
        <path d="M96,200l14,-4 5,8 -11,6 -8,-4z" />
        <path d="M152,196l11,-4 4,7 -9,5 -6,-3z" />
      </g>

      {/* 黄色いロータリー除雪車。**オーガが回り、投雪が飛ぶ。** */}
      <g>
        <ellipse cx="248" cy="196" rx="72" ry="8" fill="#000" opacity="0.28" />
        <rect x="214" y="152" width="112" height="34" rx="5" fill="#e8a01c" />
        <rect x="214" y="176" width="112" height="10" fill="#b8781c" />
        <rect x="238" y="130" width="60" height="24" rx="4" fill="#e8a01c" />
        <rect x="246" y="136" width="44" height="14" fill="#2f4a5f" />
        <g fill="#3a3228">
          <circle cx="238" cy="188" r="9" />
          <circle cx="304" cy="188" r="9" />
        </g>
        <g fill="#8a8f96">
          <circle cx="238" cy="188" r="3.4" />
          <circle cx="304" cy="188" r="3.4" />
        </g>
        {/* 投雪の筒。 */}
        <path d="M240,130l-6,-24h20l2,24z" fill="#c8881c" />
        <path d="M232,106h26v-8h-26z" fill="#a8681c" />
        {/* オーガ(回転する刃)。 */}
        <g>
          <rect x="182" y="150" width="36" height="40" rx="4" fill="#c8881c" />
          <circle cx="200" cy="170" r="17" fill="#3a3f47" />
          <g className="nsk-auger">
            <path d="M200,153a17,17 0 0 1 14.7,8.5l-7.4,4.3A8.5,8.5 0 0 0 200,161.5z" fill="#c8ccd4" />
            <path d="M214.7,178.5a17,17 0 0 1 -14.7,8.5v-8.5a8.5,8.5 0 0 0 7.3,-4.2z" fill="#c8ccd4" />
            <path d="M185.3,178.5a17,17 0 0 0 14.7,8.5v-8.5a8.5,8.5 0 0 1 -7.3,-4.2z" fill="#e0e6ec" />
            <path d="M200,153a17,17 0 0 0 -14.7,8.5l7.4,4.3A8.5,8.5 0 0 1 200,161.5z" fill="#e0e6ec" />
            <circle cx="200" cy="170" r="4" fill="#8a8f96" />
          </g>
        </g>
        {/* 作業灯。 */}
        <g className="nsk-worklight">
          <rect x="240" y="124" width="14" height="7" rx="2" fill="#f8dc90" />
          <rect x="282" y="124" width="14" height="7" rx="2" fill="#f8dc90" />
          <path d="M240,131L146,206h58l52,-75z" fill="#f5b31c" opacity="0.16" />
          <path d="M296,131l52,68h-40l-24,-68z" fill="#f5b31c" opacity="0.12" />
        </g>
        <rect x="256" y="118" width="24" height="8" rx="3" fill="#c0453c" />
      </g>

      {/* 投雪。**筒から弧を描いて飛ぶ。** */}
      <g className="nsk-throw">
        <ellipse cx="0" cy="0" rx="16" ry="10" fill="#f4f9fc" opacity="0.9" />
        <ellipse cx="18" cy="-8" rx="10" ry="6" fill="#f4f9fc" opacity="0.6" />
        <ellipse cx="-16" cy="6" rx="8" ry="5" fill="#f4f9fc" opacity="0.5" />
      </g>

      {/* 掘っている除雪隊(2人・別の姿勢と別の色)。 */}
      <g>
        {/* かがんでスコップを入れている人。 */}
        <g className="nsk-dig1">
          <path d="M96,204h9l4,-22h-9z" fill="#2f3a48" />
          <path d="M110,204h9l2,-22h-9z" fill="#3a4656" />
          <path d="M92,182l6,-24h20l6,24z" fill="#e8a01c" />
          <rect x="94" y="166" width="30" height="5" fill="#f4f2ea" />
          <circle cx="112" cy="152" r="9" fill="#e8c8a8" />
          <path d="M103,150a9,9 0 0 1 18,0z" fill="#c0453c" />
          <path d="M120,166l18,10" stroke="#e8a01c" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M136,174l14,10" stroke="#6b5330" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <path d="M146,180l16,10 -6,10 -16,-10z" fill="#b8bcc4" />
        </g>
        {/* 立って雪を運び上げている人。 */}
        <g className="nsk-dig2">
          <path d="M46,206h8l2,-20h-8z" fill="#2f3a48" />
          <path d="M58,206h8v-20h-8z" fill="#3a4656" />
          <path d="M42,186l5,-26h20l5,26z" fill="#3f7a68" />
          <rect x="44" y="170" width="28" height="5" fill="#f4f2ea" />
          <circle cx="57" cy="152" r="9" fill="#c8a880" />
          <path d="M48,151a9,9 0 0 1 18,0z" fill="#f5b31c" />
          <path d="M44,166l-14,-14" stroke="#3f7a68" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M70,166l12,-14" stroke="#3f7a68" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M30,152l-2,-22" stroke="#6b5330" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <path d="M20,132h18l2,-12H22z" fill="#b8bcc4" />
        </g>
      </g>

      <style>{`
        .nsk-auger {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: nsk-spin 0.5s linear infinite;
        }
        @keyframes nsk-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .nsk-throw {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: nsk-arc 1.6s ease-out infinite;
        }
        @keyframes nsk-arc {
          0%   { transform: translate(244px, 100px) scale(0.4); opacity: 0; }
          20%  { transform: translate(272px, 66px) scale(0.8); opacity: 1; }
          60%  { transform: translate(326px, 48px) scale(1.1); opacity: 0.95; }
          100% { transform: translate(388px, 104px) scale(1.3); opacity: 0; }
        }
        .nsk-worklight { animation: nsk-flicker 2.2s ease-in-out infinite; }
        @keyframes nsk-flicker {
          0%, 100% { opacity: 0.72; }
          40%      { opacity: 1; }
          62%      { opacity: 0.85; }
        }
        .nsk-trickle {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: nsk-run 2.8s linear infinite;
        }
        @keyframes nsk-run {
          0%   { transform: translateY(-30px) scaleY(0.9); opacity: 0.35; }
          50%  { transform: translateY(0) scaleY(1); opacity: 0.95; }
          100% { transform: translateY(26px) scaleY(1.1); opacity: 0.25; }
        }
        .nsk-dig1 {
          transform-box: fill-box;
          transform-origin: 40% 100%;
          animation: nsk-shovel 1.8s ease-in-out infinite;
        }
        @keyframes nsk-shovel {
          0%, 100% { transform: rotate(0deg); }
          45%      { transform: rotate(9deg); }
        }
        .nsk-dig2 {
          transform-box: fill-box;
          transform-origin: 60% 100%;
          animation: nsk-lift 2.4s ease-in-out infinite;
        }
        @keyframes nsk-lift {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-7deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nsk-auger, .nsk-throw, .nsk-worklight, .nsk-trickle, .nsk-dig1, .nsk-dig2 { animation: none; }
          .nsk-throw {
            transform: translate(320px, 50px) scale(1.1);
            transform-box: fill-box;
            transform-origin: 50% 50%;
          }
          .nsk-dig1 {
            transform: rotate(9deg);
            transform-box: fill-box;
            transform-origin: 40% 100%;
          }
        }
      `}</style>
    </svg>
  );
}
