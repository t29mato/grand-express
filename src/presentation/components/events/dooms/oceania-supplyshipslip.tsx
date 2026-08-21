/**
 * 四半期に一度の補給船が予定をずらす。
 *
 * 本文の芯は3つ。**二つ前の港での故障で船がすでに遅れていること・無線で
 * 「あと少なくとも一か月来ない」と知らされること・前回の寄港以来すでに
 * 乏しかった雑貨店の棚が、さらにもちこたえなければならないこと。**
 *
 * 7枚の描き分けで、ここは **唯一の屋内** の担当。海の3枚と混ざらないよう
 * **海を主役にしない。**ただし窓の外だけは開けてある——
 * そこに **何も無い水平線** を置いた。この盤面の厄災の神は「まだ来ない船」で、
 * **姿を持たない。**来ないこと自体が災いなので、**窓の外には最後まで
 * 何も現れない。**光る影も、人型も、幻の船も描かない。
 *
 * 動くのは**無線機の赤いランプと音の波紋・ゆっくり回る天井扇・
 * 棚の缶を前へ寄せる店主の腕・窓から差す光の帯**。
 * 止めた状態でも、棚がほとんど空で、窓の外の水平線に何も無い構図で分かる。
 */
export function OceaniaSupplyshipslip() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 店の中。板張りの壁と床。 */}
      <rect width="400" height="210" fill="#8a6a44" />
      <rect width="400" height="150" fill="#a8845a" />
      <g stroke="#8a6a3c" strokeWidth="2" opacity="0.65" fill="none">
        <path d="M0,20h400M0,44h400M0,68h400M0,92h400M0,116h400M0,140h400" />
      </g>
      {/* 床 */}
      <rect y="150" width="400" height="60" fill="#7a5c3a" />
      <path d="M0,150q96,-5 200,3q98,8 200,-5v6H0z" fill="#8f6d44" />
      <g stroke="#63482c" strokeWidth="2" opacity="0.7" fill="none">
        <path d="M0,168h400M0,188h400M0,208h400M70,150v60M180,150v60M300,150v60" />
      </g>

      {/* **窓。外は水平線だけ。船は最後まで来ない。** */}
      <g>
        <rect x="272" y="24" width="112" height="76" fill="#4a4438" />
        <rect x="277" y="29" width="102" height="66" fill="#bcdcee" />
        {/* 空 */}
        <rect x="277" y="29" width="102" height="34" fill="#8fc4e8" />
        <rect x="277" y="55" width="102" height="10" fill="#bcdcee" />
        {/* 海。**水平線の上にも下にも、何も無い。** */}
        <rect x="277" y="65" width="102" height="30" fill="#3f92ae" />
        <rect x="277" y="78" width="102" height="17" fill="#57b0c0" />
        <rect x="277" y="64" width="102" height="2" fill="#e8f4f8" opacity="0.8" />
        <g stroke="#bfe8f4" strokeWidth="1.6" opacity="0.6" fill="none">
          <path d="M286,74q8,-3 16,0M330,84q8,-3 16,0M298,90q8,-3 16,0" />
        </g>
        {/* 窓枠 */}
        <g fill="#4a4438">
          <rect x="326" y="29" width="5" height="66" />
          <rect x="277" y="60" width="102" height="4" />
        </g>
        <rect x="268" y="18" width="120" height="8" fill="#5f4c33" />
        <rect x="268" y="98" width="120" height="7" fill="#5f4c33" />
      </g>
      {/* 窓から差す光の帯。 */}
      <g className="oss-light" fill="#f8f0c8" opacity="0.18">
        <path d="M277,100L188,210h96l70,-110z" />
      </g>

      {/* **ほとんど空の棚。**缶が数個、間隔をあけて残っている。 */}
      <g>
        <rect x="10" y="34" width="196" height="118" fill="#6b5330" />
        <rect x="14" y="38" width="188" height="110" fill="#9a7a4c" />
        <g fill="#c2ae86">
          <rect x="14" y="66" width="188" height="6" />
          <rect x="14" y="100" width="188" height="6" />
          <rect x="14" y="134" width="188" height="6" />
        </g>
        <g fill="#7f6238">
          <rect x="14" y="72" width="188" height="3" opacity="0.6" />
          <rect x="14" y="106" width="188" height="3" opacity="0.6" />
          <rect x="14" y="140" width="188" height="3" opacity="0.6" />
        </g>
        {/* 上段:缶が2つだけ */}
        <g>
          <rect x="22" y="50" width="15" height="16" rx="1.5" fill="#c8452f" />
          <rect x="22" y="50" width="15" height="4" rx="1.5" fill="#e0705c" />
          <rect x="22" y="56" width="15" height="5" fill="#f0e0b8" />
          <rect x="40" y="50" width="15" height="16" rx="1.5" fill="#4f7f6a" />
          <rect x="40" y="50" width="15" height="4" rx="1.5" fill="#6f9f8a" />
          <rect x="40" y="56" width="15" height="5" fill="#f0e0b8" />
        </g>
        {/* 中段:袋が1つと缶が1つ。**あとは板が見えている。** */}
        <g>
          <path d="M96,100V86q0,-6 8,-6h8q8,0 8,6v14z" fill="#d8c8a0" />
          <path d="M96,88h24v4H96z" fill="#b8a47c" />
          <rect x="168" y="84" width="15" height="16" rx="1.5" fill="#c2a13f" />
          <rect x="168" y="84" width="15" height="4" rx="1.5" fill="#dcc060" />
          <rect x="168" y="90" width="15" height="5" fill="#f0e0b8" />
        </g>
        {/* 下段:1つだけ。 */}
        <g>
          <rect x="24" y="118" width="15" height="16" rx="1.5" fill="#3f6f9a" />
          <rect x="24" y="118" width="15" height="4" rx="1.5" fill="#5f8fb8" />
          <rect x="24" y="118" width="15" height="0" />
          <rect x="24" y="124" width="15" height="5" fill="#f0e0b8" />
        </g>
        {/* 空いた場所に残った、缶の輪の跡。**前はここまで詰まっていた。** */}
        <g fill="none" stroke="#7f6238" strokeWidth="1.4" opacity="0.55">
          <ellipse cx="76" cy="64" rx="7.5" ry="2" />
          <ellipse cx="100" cy="64" rx="7.5" ry="2" />
          <ellipse cx="128" cy="64" rx="7.5" ry="2" />
          <ellipse cx="156" cy="64" rx="7.5" ry="2" />
          <ellipse cx="184" cy="64" rx="7.5" ry="2" />
          <ellipse cx="142" cy="98" rx="7.5" ry="2" />
          <ellipse cx="60" cy="132" rx="7.5" ry="2" />
          <ellipse cx="88" cy="132" rx="7.5" ry="2" />
          <ellipse cx="116" cy="132" rx="7.5" ry="2" />
          <ellipse cx="150" cy="132" rx="7.5" ry="2" />
          <ellipse cx="180" cy="132" rx="7.5" ry="2" />
        </g>
      </g>

      {/* カウンターと無線機。 */}
      <g>
        <rect x="228" y="150" width="164" height="12" fill="#6b5330" />
        <rect x="228" y="150" width="164" height="4" fill="#8f7044" />
        <rect x="236" y="162" width="150" height="48" fill="#5f4c33" />
        <g stroke="#4a3a24" strokeWidth="2" opacity="0.7" fill="none">
          <path d="M280,162v48M336,162v48" />
        </g>
      </g>
      <g>
        {/* 無線機 */}
        <rect x="292" y="114" width="66" height="36" rx="3" fill="#4a4f4a" />
        <rect x="292" y="114" width="66" height="5" rx="2" fill="#65695f" />
        <rect x="298" y="122" width="26" height="16" rx="2" fill="#2f3a32" />
        <g fill="#8fc48f" opacity="0.85">
          <rect x="301" y="126" width="20" height="3" />
          <rect x="301" y="132" width="13" height="3" />
        </g>
        <g fill="#8a8f8a">
          <circle cx="336" cy="128" r="5" />
          <circle cx="350" cy="128" r="4" />
        </g>
        <rect x="330" y="140" width="24" height="5" rx="2" fill="#33302c" />
        <circle className="oss-lamp" cx="316" cy="144" r="3.6" fill="#e8443f" />
        {/* アンテナ */}
        <path d="M356,114V88" stroke="#8a8f8a" strokeWidth="2.4" fill="none" />
        <path d="M350,94h12" stroke="#8a8f8a" strokeWidth="1.8" fill="none" />
        {/* 音の波紋。**知らせだけが届いた。** */}
        <g className="oss-wave1" fill="none" stroke="#e8e0cc" strokeWidth="2" opacity="0.6">
          <path d="M362,120a14,14 0 0 1 0,20" />
        </g>
        <g className="oss-wave2" fill="none" stroke="#e8e0cc" strokeWidth="2" opacity="0.5">
          <path d="M368,114a22,22 0 0 1 0,32" />
        </g>
        <g className="oss-wave3" fill="none" stroke="#e8e0cc" strokeWidth="2" opacity="0.4">
          <path d="M374,108a30,30 0 0 1 0,44" />
        </g>
      </g>

      {/* 天井扇。**ゆっくり回っている。** */}
      <g>
        <path d="M226,0v14" stroke="#5f4c33" strokeWidth="3" fill="none" />
        <g className="oss-fan">
          <ellipse cx="226" cy="16" rx="34" ry="4" fill="#7f6844" />
          <ellipse cx="226" cy="16" rx="34" ry="4" fill="#8f7850" opacity="0.6" />
        </g>
        <circle cx="226" cy="16" r="5" fill="#5f4c33" />
      </g>

      {/* 店主。**残った缶を数えて、前へ寄せている。** */}
      <g>
        <ellipse cx="224" cy="206" rx="20" ry="5" fill="#4a3a24" opacity="0.35" />
        <g fill="#3a3228">
          <rect x="216" y="186" width="7" height="20" rx="2" />
          <rect x="227" y="186" width="7" height="20" rx="2" />
        </g>
        <path d="M210,188l5,-38h20l5,38z" fill="#4f8f9a" />
        <path d="M210,188h30v5h-30z" fill="#3a7180" />
        <circle cx="225" cy="141" r="10" fill="#8a6a4a" />
        <path d="M215,140a10,10 0 0 1 20,0z" fill="#3a3228" />
        <path d="M236,158l14,10" stroke="#4f8f9a" strokeWidth="5.6" strokeLinecap="round" fill="none" />
        <g className="oss-reach">
          <path d="M212,158l-24,-22" stroke="#4f8f9a" strokeWidth="5.6" strokeLinecap="round" fill="none" />
          <circle cx="186" cy="134" r="4.4" fill="#8a6a4a" />
        </g>
      </g>

      {/* 床に置かれた空の木箱。**次の船まで、これも埋まらない。** */}
      <g>
        <rect x="24" y="176" width="46" height="30" fill="#b08a4f" />
        <rect x="24" y="176" width="46" height="5" fill="#c49a58" />
        <path d="M24,181l46,25M70,181l-46,25" stroke="#7f6234" strokeWidth="1.8" fill="none" />
        <path d="M18,176l12,-14h44l-8,14z" fill="#c49a58" />
      </g>
      <g>
        <rect x="84" y="188" width="34" height="20" fill="#9a7a44" />
        <rect x="84" y="188" width="34" height="4" fill="#b08a4f" />
        <path d="M84,192l34,16M118,192l-34,16" stroke="#7f6234" strokeWidth="1.6" fill="none" />
      </g>

      <style>{`
        .oss-lamp { animation: oss-blink 1.6s steps(1, end) infinite; }
        @keyframes oss-blink {
          0%, 45%   { opacity: 1; }
          46%, 100% { opacity: 0.2; }
        }
        .oss-wave1 {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: oss-pulse 2.4s ease-out infinite;
        }
        .oss-wave2 {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: oss-pulse 2.4s ease-out 0.3s infinite;
        }
        .oss-wave3 {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: oss-pulse 2.4s ease-out 0.6s infinite;
        }
        @keyframes oss-pulse {
          0%   { transform: scale(0.4); opacity: 0; }
          30%  { opacity: 0.65; }
          100% { transform: scale(1.25); opacity: 0; }
        }
        .oss-fan {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: oss-spin 3.4s linear infinite;
        }
        @keyframes oss-spin {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }
        .oss-reach {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: oss-tidy 5.2s ease-in-out infinite;
        }
        @keyframes oss-tidy {
          0%, 100% { transform: rotate(0deg); }
          40%      { transform: rotate(-12deg); }
          70%      { transform: rotate(5deg); }
        }
        .oss-light { animation: oss-shift 7s ease-in-out infinite; }
        @keyframes oss-shift {
          0%, 100% { opacity: 0.12; }
          50%      { opacity: 0.24; }
        }
        @media (prefers-reduced-motion: reduce) {
          .oss-lamp, .oss-wave1, .oss-wave2, .oss-wave3, .oss-fan,
          .oss-reach, .oss-light { animation: none; }
          /* ランプは点いたまま、波紋は広がった位置、腕は棚へ伸ばした姿勢で止める。 */
          .oss-wave1, .oss-wave2, .oss-wave3 { opacity: 0.5; }
          .oss-reach {
            transform: rotate(-12deg);
            transform-box: fill-box;
            transform-origin: 100% 100%;
          }
          .oss-light { opacity: 0.2; }
        }
      `}</style>
    </svg>
  );
}
