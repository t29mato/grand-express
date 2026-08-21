/**
 * 海図に無い珊瑚の頭が船体に穴を開ける。
 *
 * 本文の芯は3つ。**前回の測量以降に育った珊瑚であること・誰もが知り尽くして
 * いると思っていた海域だったこと・乗組員が一晩じゅう排水し、無線で曳航を
 * 呼び続けることになること。**
 *
 * 7枚の描き分けで、ここは **唯一の夜** の担当。ほかの6枚には夜を使わない。
 * ただし **暗い絵は主役が沈む**(熊が林に溶けた例がある)ので、
 * **ランプが届く範囲だけ明度を上げて**、傾いた甲板・排水する人・
 * 船底にあたっている珊瑚の3つが必ず読めるようにしてある。
 *
 * 動くのは**傾いた船の揺れ・バケツから弧を描いて落ちる水・揺れるランプと
 * その光の輪・無線のアンテナの灯・水面下で揺れる珊瑚の影**。
 * 止めた状態でも、船が傾き、バケツが振り切られている構図で分かる。
 */
export function OceaniaReefstrand() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜。星と、水平線にわずかな残照。 */}
      <rect width="400" height="210" fill="#16283a" />
      <rect width="400" height="46" fill="#101d2c" />
      <rect y="46" width="400" height="26" fill="#1a2c40" />
      <rect y="72" width="400" height="10" fill="#243c50" />
      <g fill="#cfd8e8" opacity="0.8">
        <circle cx="30" cy="16" r="1.5" />
        <circle cx="88" cy="30" r="1.2" />
        <circle cx="152" cy="10" r="1.6" />
        <circle cx="214" cy="24" r="1.1" />
        <circle cx="268" cy="12" r="1.4" />
        <circle cx="330" cy="28" r="1.3" />
        <circle cx="376" cy="14" r="1.5" />
        <circle cx="118" cy="52" r="1.1" />
        <circle cx="292" cy="48" r="1.2" />
      </g>

      {/* 夜の海。 */}
      <rect y="82" width="400" height="128" fill="#1a3550" />
      <rect y="82" width="400" height="26" fill="#152c46" />
      <rect y="130" width="400" height="80" fill="#1f4060" />
      <g stroke="#3f6a90" strokeWidth="2" opacity="0.5" fill="none">
        <path d="M14,96q11,-4 22,0M300,90q11,-4 22,0M60,118q13,-4 26,0M330,126q13,-4 26,0" />
      </g>

      {/* 奥に続く礁の稜。**この海域ぜんぶが浅い。** */}
      <g fill="#2f5f6a" opacity="0.5">
        <ellipse cx="330" cy="196" rx="76" ry="16" />
        <ellipse cx="286" cy="184" rx="34" ry="10" />
      </g>

      {/* **傾いた小型貨物船。**船体・甲板・人・ランプをまとめて揺らす。 */}
      <g className="oreef-hull">
        {/* 船体 */}
        <path d="M30,178q26,-14 96,-16q78,-2 122,8q-6,26 -66,32q-84,6 -152,-24z" fill="#2f2b26" />
        <path d="M30,178q26,-14 96,-16q78,-2 122,8q-58,-2 -122,2q-58,4 -96,6z" fill="#5a4a34" />
        <path d="M34,172q28,-12 92,-14q74,-2 116,8q-8,10 -64,12q-84,4 -144,-6z" fill="#8a4a30" />
        {/* 甲板 */}
        <path d="M40,164q30,-10 88,-11q68,-1 104,7q-10,7 -62,9q-78,3 -130,-5z" fill="#a8823f" />
        <g stroke="#8a6a2c" strokeWidth="1.4" opacity="0.8" fill="none">
          <path d="M56,163q60,-8 140,-1M52,169q64,-8 152,0" />
        </g>
        {/* 喫水線を越えた水 */}
        <path d="M28,182q40,10 108,8q66,-2 112,-10q-8,14 -64,18q-84,4 -156,-16z" fill="#2f5f80" opacity="0.55" />

        {/* 船室と無線のアンテナ */}
        <g>
          <path d="M188,156v-30h44v34z" fill="#4a453c" />
          <path d="M186,126h48l-4,-8h-40z" fill="#5f584c" />
          <g fill="#8fb0c0" opacity="0.9">
            <rect x="194" y="132" width="12" height="10" rx="2" />
            <rect x="212" y="132" width="12" height="10" rx="2" />
          </g>
          <path d="M232,118v-32" stroke="#6b6458" strokeWidth="2.4" fill="none" />
          <path d="M226,92h12M228,86h8" stroke="#6b6458" strokeWidth="2" fill="none" />
          <circle className="oreef-radio" cx="232" cy="82" r="3.6" fill="#e8443f" />
        </g>

        {/* 揺れるランプ。**この光の範囲だけ明るくする。** */}
        <g>
          <path d="M120,148V116h44" stroke="#5f584c" strokeWidth="2.4" fill="none" />
          <g className="oreef-lamp">
            <path d="M158,118v10" stroke="#5f584c" strokeWidth="1.8" fill="none" />
            <path d="M150,128h16l-3,14h-10z" fill="#c8a13f" />
            <path d="M152,130h12l-2,10h-8z" fill="#f8e08a" />
            <ellipse cx="158" cy="142" rx="6" ry="2" fill="#f8e08a" />
          </g>
        </g>

        {/* 排水する乗組員(左)。**バケツを振り切って海へ捨てる。** */}
        <g>
          <g fill="#3a3228">
            <rect x="66" y="150" width="6" height="14" rx="2" transform="rotate(-8 69 157)" />
            <rect x="76" y="150" width="6" height="14" rx="2" transform="rotate(-8 79 157)" />
          </g>
          <path d="M62,152l5,-26h14l4,26z" fill="#e8945f" />
          <circle cx="74" cy="119" r="8" fill="#a8764c" />
          <path d="M66,118a8.6,8.6 0 0 1 17,0z" fill="#3a3228" />
          <g className="oreef-arm">
            <path d="M64,132l-22,-8" stroke="#e8945f" strokeWidth="5" strokeLinecap="round" fill="none" />
            <g>
              <path d="M30,118h20l-4,14H34z" fill="#9aa0a0" />
              <path d="M30,118h20v3H30z" fill="#c2c8c8" />
              <path d="M30,118q10,-7 20,0" stroke="#c2c8c8" strokeWidth="1.6" fill="none" />
            </g>
          </g>
        </g>
        {/* 捨てられる水。 */}
        <g className="oreef-water" fill="#8fc8e0" opacity="0.85">
          <path d="M0,0q9,-4 15,3q-8,8 -15,-3z" />
          <circle cx="14" cy="10" r="3" />
          <circle cx="-6" cy="9" r="2.4" />
        </g>

        {/* 無線を持つ乗組員(右)。**別の人・別の姿勢にする。** */}
        <g>
          <g fill="#2f3a3a">
            <rect x="164" y="150" width="6" height="14" rx="2" />
            <rect x="174" y="150" width="6" height="14" rx="2" />
          </g>
          <path d="M160,152l4,-26h16l4,26z" fill="#4f8f9a" />
          <circle cx="172" cy="119" r="8" fill="#c98f5f" />
          <path d="M164,116a8.6,8.6 0 0 1 17,2z" fill="#e8e0cc" />
          <path d="M182,130l12,-6" stroke="#4f8f9a" strokeWidth="4.6" strokeLinecap="round" fill="none" />
          <path d="M164,128l-4,-8" stroke="#4f8f9a" strokeWidth="4.6" strokeLinecap="round" fill="none" />
          <rect x="156" y="112" width="7" height="12" rx="2" fill="#3a3228" transform="rotate(-16 159 118)" />
        </g>
      </g>

      {/* **船体にあたっている珊瑚の頭。**
          船の**手前側**に置く。奥に置くと船体に隠れて、この絵の主役が消える。
          前回の測量には無かったもので、いま船底を削っている。 */}
      <g className="oreef-coral">
        <g fill="#7f9a92">
          <path d="M18,210q-4,-30 14,-42q18,-12 34,2q16,14 12,40z" />
          <path d="M62,210q-2,-20 12,-28q14,-8 24,4q10,12 8,24z" />
        </g>
        <g fill="#a4bcb0">
          <path d="M26,210q-4,-24 10,-34q14,-10 24,2q10,12 8,32z" />
          <path d="M70,210q-2,-15 9,-21q11,-6 18,3q7,9 6,18z" />
        </g>
        <g fill="#c8dcd0" opacity="0.9">
          <ellipse cx="44" cy="170" rx="11" ry="7" />
          <ellipse cx="30" cy="180" rx="8" ry="5" />
          <ellipse cx="58" cy="178" rx="7" ry="4.4" />
          <ellipse cx="84" cy="190" rx="8" ry="5" />
        </g>
        {/* 船底に食い込んでいる先端。 */}
        <g fill="#dfeae4">
          <path d="M44,172l5,-14l6,14z" />
          <path d="M82,186l4,-11l5,11z" />
        </g>
        <g stroke="#5f7a74" strokeWidth="1.6" opacity="0.85" fill="none">
          <path d="M32,206q6,-16 14,-22M72,206q4,-12 12,-16M56,208q2,-14 8,-20" />
        </g>
      </g>
      {/* 削られた船底から出る泡。**穴があいた場所。** */}
      <g className="oreef-leak" fill="#cfeaf4" opacity="0.8">
        <circle cx="50" cy="164" r="3" />
        <circle cx="56" cy="152" r="2.4" />
        <circle cx="47" cy="142" r="1.8" />
        <circle cx="53" cy="132" r="1.3" />
      </g>

      {/* **ランプの届く範囲。**暗い絵で主役が消えないようにするための一点。 */}
      <g className="oreef-halo" fill="#f8e08a" opacity="0.12">
        <ellipse cx="146" cy="150" rx="104" ry="52" />
      </g>
      <g fill="#f8e08a" opacity="0.07">
        <ellipse cx="146" cy="150" rx="150" ry="76" />
      </g>

      {/* 無線が届いた先の、遠い灯り。**まだ来ない。** */}
      <g className="oreef-far" fill="#f5b31c" opacity="0.5">
        <circle cx="356" cy="76" r="2.4" />
      </g>

      {/* 手前の波。 */}
      <g className="oreef-wave" fill="#2f5f80" opacity="0.7">
        <path d="M0,198q60,-12 124,-2q66,10 132,-4q56,-12 144,4v14H0z" />
      </g>
      <g fill="#3f7a9a" opacity="0.6">
        <path d="M0,206q70,-8 140,0q70,8 140,-2q60,-8 120,2v4H0z" />
      </g>

      <style>{`
        .oreef-hull {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oreef-list 4.4s ease-in-out infinite;
        }
        @keyframes oreef-list {
          0%, 100% { transform: rotate(-5.5deg) translateY(0); }
          50%      { transform: rotate(-2.5deg) translateY(-3px); }
        }
        .oreef-arm {
          transform-box: fill-box;
          transform-origin: 100% 60%;
          animation: oreef-bail 2.4s ease-in-out infinite;
        }
        @keyframes oreef-bail {
          0%, 100% { transform: rotate(24deg); }
          45%      { transform: rotate(-30deg); }
        }
        .oreef-water {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: oreef-toss 2.4s ease-out infinite;
        }
        @keyframes oreef-toss {
          0%, 40% { transform: translate(38px, 122px) scale(0.3); opacity: 0; }
          55%     { transform: translate(18px, 130px) scale(1); opacity: 0.9; }
          80%     { transform: translate(4px, 158px) scale(1.2); opacity: 0.8; }
          100%    { transform: translate(-4px, 184px) scale(1.4); opacity: 0; }
        }
        .oreef-lamp {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: oreef-swing 3.2s ease-in-out infinite;
        }
        @keyframes oreef-swing {
          0%, 100% { transform: rotate(-11deg); }
          50%      { transform: rotate(11deg); }
        }
        .oreef-halo { animation: oreef-breathe 3.2s ease-in-out infinite; }
        @keyframes oreef-breathe {
          0%, 100% { opacity: 0.09; }
          50%      { opacity: 0.16; }
        }
        .oreef-radio { animation: oreef-blink 1.4s steps(1, end) infinite; }
        @keyframes oreef-blink {
          0%, 49%   { opacity: 1; }
          50%, 100% { opacity: 0.15; }
        }
        .oreef-far { animation: oreef-faint 5s ease-in-out infinite; }
        @keyframes oreef-faint {
          0%, 100% { opacity: 0.2; }
          50%      { opacity: 0.6; }
        }
        .oreef-coral {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oreef-sway 4.4s ease-in-out infinite;
        }
        @keyframes oreef-sway {
          0%, 100% { transform: skewX(-1.4deg); }
          50%      { transform: skewX(1.4deg); }
        }
        .oreef-leak {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oreef-bubble 2.8s linear infinite;
        }
        @keyframes oreef-bubble {
          0%   { transform: translateY(14px) scale(0.6); opacity: 0; }
          25%  { opacity: 0.85; }
          100% { transform: translateY(-26px) scale(1.1); opacity: 0; }
        }
        .oreef-wave {
          animation: oreef-lap 3.6s ease-in-out infinite;
        }
        @keyframes oreef-lap {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .oreef-hull, .oreef-arm, .oreef-water, .oreef-lamp, .oreef-halo,
          .oreef-radio, .oreef-far, .oreef-coral, .oreef-leak, .oreef-wave {
            animation: none;
          }
          /* 傾いた船・振り切ったバケツ・落ちる水を、そのまま止める。 */
          .oreef-hull {
            transform: rotate(-5.5deg);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
          .oreef-arm {
            transform: rotate(-30deg);
            transform-box: fill-box;
            transform-origin: 100% 60%;
          }
          .oreef-water {
            transform: translate(14px, 140px) scale(1.1);
            opacity: 0.85;
            transform-box: fill-box;
            transform-origin: 50% 50%;
          }
          .oreef-lamp {
            transform: rotate(-11deg);
            transform-box: fill-box;
            transform-origin: 50% 0%;
          }
          .oreef-halo { opacity: 0.16; }
        }
      `}</style>
    </svg>
  );
}
