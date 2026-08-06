/**
 * 4月・鐘がローマから帰ってくる。
 *
 * 聖週間のあいだ黙っていた鐘が翼を生やして空を渡り、帰り道に卵を落としていく。
 * 下の庭では子どもが籠を持ってそれを拾い、市の台には最初の白アスパラガスが並ぶ。
 */
export function France00() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 春の空 */}
      <rect width="400" height="210" fill="#a9d3ee" />
      <g fill="#e2eff9">
        <ellipse className="f00-cloud" cx="70" cy="30" rx="42" ry="14" />
        <ellipse className="f00-cloud f00-cloud2" cx="236" cy="20" rx="52" ry="15" />
        <ellipse className="f00-cloud f00-cloud3" cx="350" cy="42" rx="38" ry="12" />
      </g>

      {/* 遠くの丘 */}
      <path d="M0,132 Q70,110 150,128 Q230,146 300,120 Q356,102 400,122 L400,150 L0,150z" fill="#8fb87a" />

      {/* 村の教会。鐘楼の窓が空いている(鐘は留守) */}
      <g transform="translate(310,60)">
        <rect x="-4" y="30" width="62" height="60" fill="#d8cdb8" />
        <path d="M-10,30 L54,30 L24,6z" fill="#9c6b52" />
        <rect x="-26" y="16" width="30" height="74" fill="#e3d9c6" />
        <path d="M-32,16 L10,16 L-11,-8z" fill="#8a5a45" />
        {/* 鐘楼の空いた窓 */}
        <rect x="-20" y="26" width="18" height="24" rx="9" fill="#4a4436" />
        <rect x="8" y="52" width="14" height="22" rx="7" fill="#4a4436" />
        <rect x="34" y="52" width="14" height="22" rx="7" fill="#4a4436" />
      </g>

      {/* 草地 */}
      <rect y="148" width="400" height="62" fill="#6ea34e" />
      <g stroke="#58893f" strokeWidth="3" strokeLinecap="round">
        <path d="M18,182 l0,-10 M30,190 l0,-9 M96,176 l0,-10 M150,196 l0,-9 M262,180 l0,-10 M330,192 l0,-9" />
      </g>

      {/*
        空を渡る鐘。位置決めは外の g、飛行と揺れは内側に分ける。
        翼は羽根の切れ込みを付けて輪郭線を引き、空に対して形が読めるようにする。
      */}
      <g transform="translate(0,66)">
        <g className="f00-fly">
          <g transform="translate(-13,-9)">
            <path
              className="f00-wing"
              d="M0,-4 q-14,-14 -30,-13 q6,5 12,6 q-8,3 -14,3 q7,5 14,4 q-6,4 -12,5 q13,4 30,-5z"
              fill="#fdf6e6"
              stroke="#c9a94a"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </g>
          <g transform="translate(13,-9)">
            <path
              className="f00-wing f00-wing-r"
              d="M0,-4 q14,-14 30,-13 q-6,5 -12,6 q8,3 14,3 q-7,5 -14,4 q6,4 12,5 q-13,4 -30,-5z"
              fill="#fdf6e6"
              stroke="#c9a94a"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </g>
          <g className="f00-swing">
            <path d="M-8,-16 q-2,-8 8,-10 q10,2 8,10 l3,16 h-22z" fill="#f5b31c" />
            <path d="M-13,0 h26 q3,6 -3,7 h-20 q-6,-1 -3,-7z" fill="#d99a10" />
            <circle cx="0" cy="10" r="3.5" fill="#8a6b1c" />
            <rect x="-2" y="-28" width="4" height="6" rx="2" fill="#8a6b1c" />
          </g>
        </g>
      </g>
      <g transform="translate(0,104)">
        <g className="f00-fly f00-fly2">
          <g transform="translate(-10,-7)">
            <path
              className="f00-wing f00-wing3"
              d="M0,-3 q-11,-11 -23,-10 q5,4 9,5 q-6,2 -11,2 q5,4 11,3 q-5,3 -9,4 q10,3 23,-4z"
              fill="#fdf6e6"
              stroke="#c9a94a"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </g>
          <g transform="translate(10,-7)">
            <path
              className="f00-wing f00-wing-r f00-wing3"
              d="M0,-3 q11,-11 23,-10 q-5,4 -9,5 q6,2 11,2 q-5,4 -11,3 q5,3 9,4 q-10,3 -23,-4z"
              fill="#fdf6e6"
              stroke="#c9a94a"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </g>
          <g className="f00-swing f00-swing2">
            <path d="M-6,-12 q-2,-6 6,-8 q8,2 6,8 l2,12 h-16z" fill="#e8c247" />
            <path d="M-10,0 h20 q2,5 -2,6 h-16 q-4,-1 -2,-6z" fill="#c9a20e" />
            <circle cx="0" cy="8" r="3" fill="#8a6b1c" />
          </g>
        </g>
      </g>

      {/* 落ちてくる卵 */}
      <ellipse className="f00-egg" cx="118" cy="70" rx="7" ry="9" fill="#e8443f" />
      <ellipse className="f00-egg f00-egg2" cx="196" cy="60" rx="7" ry="9" fill="#5b8fe8" />
      <ellipse className="f00-egg f00-egg3" cx="252" cy="80" rx="6.5" ry="8.5" fill="#f7b8cf" />
      <ellipse className="f00-egg f00-egg4" cx="76" cy="92" rx="6.5" ry="8.5" fill="#7bc86c" />

      {/* 草に残った卵 */}
      <ellipse cx="212" cy="188" rx="7" ry="9" fill="#f5b31c" />
      <ellipse cx="296" cy="172" rx="6.5" ry="8.5" fill="#e8443f" />

      {/* 籠を持って屈む子ども */}
      <g transform="translate(146,196)">
        <g className="f00-child">
          <path d="M-13,0 L-10,-26 L10,-26 L13,0z" fill="#5b8fe8" />
          <circle cx="0" cy="-36" r="11" fill="#f6efe2" />
          <path d="M-11,-38 q11,-11 22,-2 q-4,-9 -12,-9 q-9,0 -10,11z" fill="#6b4326" />
          {/* 腕は胴と同じ色の袖にして、体から生えて見えるようにする(先だけ手) */}
          <path d="M-11,-21 q-6,4 -8,9" stroke="#5b8fe8" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="-19" cy="-12" r="3" fill="#f6efe2" />
        </g>
        <g transform="translate(-30,-4)">
          <path d="M-11,0 q0,10 11,10 q11,0 11,-10z" fill="#c9954a" />
          <rect x="-12" y="-3" width="24" height="4" rx="2" fill="#a97a32" />
          <ellipse cx="-3" cy="1" rx="5" ry="6" fill="#e8443f" />
          <ellipse cx="5" cy="2" rx="5" ry="6" fill="#5b8fe8" />
        </g>
      </g>

      {/* 市の台に並んだ白アスパラガス */}
      <g transform="translate(48,204)">
        <rect x="-40" y="-16" width="80" height="7" rx="2" fill="#a97a32" />
        <rect x="-34" y="-9" width="6" height="9" fill="#8a6128" />
        <rect x="28" y="-9" width="6" height="9" fill="#8a6128" />
        <g className="f00-spear">
          <rect x="-34" y="-30" width="7" height="15" rx="3" fill="#f4ead6" />
          <path d="M-30.5,-34 q4,3 3.5,4 h-7 q-0.5,-1 3.5,-4z" fill="#c3d6a0" />
          <rect x="-25" y="-33" width="7" height="18" rx="3" fill="#faf3e2" />
          <path d="M-21.5,-37 q4,3 3.5,4 h-7 q-0.5,-1 3.5,-4z" fill="#c3d6a0" />
          <rect x="-16" y="-31" width="7" height="16" rx="3" fill="#f4ead6" />
          <path d="M-12.5,-35 q4,3 3.5,4 h-7 q-0.5,-1 3.5,-4z" fill="#b8cd93" />
          <rect x="-7" y="-34" width="7" height="19" rx="3" fill="#faf3e2" />
          <path d="M-3.5,-38 q4,3 3.5,4 h-7 q-0.5,-1 3.5,-4z" fill="#c3d6a0" />
        </g>
        <path d="M2,-15 q6,-16 18,-4 q10,-11 18,2z" fill="#e0d3b4" />
      </g>

      <style>{`
        .f00-cloud { animation: f00-drift 13s ease-in-out infinite; }
        .f00-cloud2 { animation-delay: 2.4s; animation-duration: 16s; }
        .f00-cloud3 { animation-delay: 4.8s; animation-duration: 11s; }
        .f00-fly {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f00-cross 9s linear infinite backwards;
        }
        .f00-fly2 { animation-delay: 3.4s; animation-duration: 11s; }
        .f00-swing {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: f00-ring 1.1s ease-in-out infinite;
        }
        .f00-swing2 { animation-duration: 1.4s; }
        .f00-wing {
          transform-box: fill-box; transform-origin: 100% 50%;
          animation: f00-flap 0.5s ease-in-out infinite;
        }
        .f00-wing-r { transform-origin: 0 50%; }
        .f00-wing3 { animation-duration: 0.62s; }
        .f00-egg {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f00-drop 4.6s ease-in infinite backwards;
        }
        .f00-egg2 { animation-delay: 1.2s; animation-duration: 5.4s; }
        .f00-egg3 { animation-delay: 2.4s; animation-duration: 4.2s; }
        .f00-egg4 { animation-delay: 3.4s; animation-duration: 5s; }
        .f00-child {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f00-stoop 3.4s ease-in-out infinite;
        }
        .f00-spear {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f00-lean 5s ease-in-out infinite;
        }
        @keyframes f00-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(20px); }
        }
        /* 画面の端で中途半端に切れないよう、入りぎわと出ぎわで薄くする。 */
        @keyframes f00-cross {
          0% { transform: translate(-62px, 8px); opacity: 0; }
          17% { opacity: 1; }
          50% { transform: translate(200px, -10px); opacity: 1; }
          83% { opacity: 1; }
          100% { transform: translate(462px, 6px); opacity: 0; }
        }
        @keyframes f00-ring {
          0%, 100% { transform: rotate(-13deg); }
          50% { transform: rotate(13deg); }
        }
        @keyframes f00-flap {
          0%, 100% { transform: rotate(-27deg) scaleY(1); }
          50% { transform: rotate(21deg) scaleY(0.62); }
        }
        @keyframes f00-drop {
          0% { transform: translate(0, -46px) rotate(0deg); opacity: 0; }
          12% { opacity: 1; }
          78% { opacity: 1; }
          92% { transform: translate(-14px, 108px) rotate(150deg); opacity: 1; }
          100% { transform: translate(-14px, 112px) rotate(160deg); opacity: 0; }
        }
        @keyframes f00-stoop {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(9deg); }
        }
        @keyframes f00-lean {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .f00-cloud, .f00-fly, .f00-swing, .f00-wing,
          .f00-egg, .f00-child, .f00-spear { animation: none; }
        }
      `}</style>
    </svg>
  );
}
