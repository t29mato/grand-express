/**
 * 降灰が便を止める。いつもより強い噴火は、灰を最寄りの空港が閉まるほどの高さまで
 * 噴き上げる。**地上では誰もが戸口に箒を置き、ただ掃くだけである。**
 *
 * 昼・灰色。空港の駐機場。主役は灰をかぶった機体と箒。人は**1人**、掃いている。
 * 動くのは、降る灰と往復する箒。
 */
export function KyushuKazanBaiKansoku() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灰色の空。 */}
      <rect width="400" height="210" fill="#9a9288" />
      <rect y="0" width="400" height="66" fill="#a8a49a" />
      <rect y="56" width="400" height="20" fill="#b0aca2" />

      {/* 遠くの火山と噴煙。**災害としてではなく、いつもの景色として奥に置く。** */}
      <g fill="#8a8478" opacity="0.75">
        <ellipse cx="330" cy="18" rx="30" ry="14" />
        <ellipse cx="308" cy="30" rx="22" ry="11" />
        <ellipse cx="344" cy="36" rx="18" ry="9" />
      </g>
      <path d="M282,70L328,26l14,12l12,-8l32,40z" fill="#7f7a6e" />
      <path d="M328,26l14,12l-9,2l-7,-6l-8,5z" fill="#948e82" />
      <path d="M0,70q54,-22 116,-16q60,6 92,16z" fill="#6f7460" />

      {/* ターミナルの建物。 */}
      <rect y="70" width="400" height="18" fill="#8f8a7c" />
      <rect x="10" y="52" width="128" height="20" fill="#c9c4b6" />
      <path d="M4,52h140l-10,-9H14z" fill="#7f7a6c" />
      <g fill="#5f6a74">
        <rect x="18" y="58" width="16" height="9" />
        <rect x="42" y="58" width="16" height="9" />
        <rect x="66" y="58" width="16" height="9" />
        <rect x="90" y="58" width="16" height="9" />
        <rect x="114" y="58" width="16" height="9" />
      </g>
      {/* 管制塔。 */}
      <rect x="176" y="34" width="14" height="38" fill="#b0aa9c" />
      <rect x="168" y="24" width="30" height="14" rx="3" fill="#c9c4b6" />
      <rect x="171" y="27" width="24" height="8" fill="#4a5a66" />
      <rect x="181" y="14" width="4" height="10" fill="#8a8478" />
      <circle cx="183" cy="12" r="3" fill="#e8443f" />

      {/* 駐機場の舗装。 */}
      <rect y="88" width="400" height="122" fill="#8a8578" />
      <rect y="88" width="400" height="5" fill="#9a9488" />
      <g stroke="#7a7568" strokeWidth="2" fill="none">
        <path d="M0,126h400M0,166h400" />
      </g>
      <g
        stroke="#d8d2c0"
        strokeWidth="3"
        opacity="0.6"
        strokeDasharray="20 16"
        fill="none"
      >
        <path d="M0,150h400" />
      </g>

      {/* 灰をかぶった機体。左に寄せる。 */}
      <g>
        {/* 主翼(手前)。 */}
        <path d="M56,138q60,-8 128,4l-6,14q-70,-4 -128,-4z" fill="#c4bfb2" />
        <path d="M56,138q60,-8 128,4l-2,4q-66,-8 -126,-2z" fill="#d8d2c4" />
        {/* 胴体。 */}
        <path
          d="M14,120q34,-16 130,-14q60,2 96,14q10,3 0,7q-92,12 -196,6q-32,-2 -30,-13z"
          fill="#e2ddd0"
        />
        <path
          d="M14,120q34,-16 130,-14q60,2 96,14q-90,-6 -226,0z"
          fill="#f2ede0"
        />
        <g fill="#4a5a66">
          <circle cx="60" cy="118" r="3.4" />
          <circle cx="78" cy="117" r="3.4" />
          <circle cx="96" cy="116" r="3.4" />
          <circle cx="114" cy="116" r="3.4" />
          <circle cx="132" cy="116" r="3.4" />
          <circle cx="150" cy="116" r="3.4" />
          <circle cx="168" cy="117" r="3.4" />
        </g>
        <path d="M24,112q10,-6 24,-8l-2,10q-14,2 -22,-2z" fill="#3f5566" />
        {/* 尾翼。 */}
        <path d="M226,120L246,80h12l4,42z" fill="#c2453c" />
        <path d="M232,122q26,-8 52,2l-4,6q-24,-6 -48,-2z" fill="#d8d2c4" />
        {/* エンジン。 */}
        <rect x="96" y="132" width="34" height="16" rx="7" fill="#a8a294" />
        <rect x="96" y="132" width="8" height="16" rx="4" fill="#5f6a74" />
        {/* 脚。 */}
        <rect x="52" y="132" width="4" height="20" fill="#6f7680" />
        <circle cx="54" cy="154" r="5" fill="#3a3d42" />
        <rect x="150" y="140" width="4" height="14" fill="#6f7680" />
        <circle cx="152" cy="156" r="5" fill="#3a3d42" />
        {/* 積もった灰。 */}
        <g fill="#a5a096" opacity="0.9">
          <path d="M20,110q60,-8 140,-6q46,2 76,6q-100,-6 -216,0z" />
          <path d="M60,133q56,-6 120,3l-1.4,3.4q-62,-8 -118,-3z" />
          <path d="M240,86q8,-4 14,0l1,6q-8,-4 -14,0z" />
        </g>
      </g>

      {/* 掃く人。**箒が往復する。** */}
      <g>
        <rect x="286" y="172" width="6" height="24" fill="#3f4852" />
        <rect x="298" y="172" width="6" height="24" fill="#3f4852" />
        <path d="M283,144h24l3,30h-30z" fill="#4a7f9a" />
        <circle cx="295" cy="137" r="8" fill="#e0b48a" />
        <path d="M286,136a9,9 0 0 1 18,0z" fill="#f5b31c" />
        <rect x="285" y="134" width="20" height="3" rx="1.4" fill="#d99a10" />
        {/* マスク。 */}
        <path d="M288,139h14v5h-14z" fill="#f2ede0" />
      </g>
      <g className="kkb-broom">
        <path
          d="M304,150L342,180"
          stroke="#8a6a44"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M334,176q14,-4 22,10q-16,10 -28,-2z" fill="#c9a05c" />
        <g stroke="#a8763c" strokeWidth="1.2" fill="none">
          <path d="M338,178l12,10M342,176l10,10M334,182l14,8" />
        </g>
      </g>
      <path
        d="M295,145L306,152"
        stroke="#e0b48a"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* 掃き寄せた灰の山。 */}
      <path d="M330,196q22,-14 44,0z" fill="#a5a096" />
      <path d="M336,196q16,-9 32,0z" fill="#b8b3a8" />

      {/* 降る灰。 */}
      <g className="kkb-ash-a" fill="#6f6a60" opacity="0.85">
        <circle cx="30" cy="0" r="3.2" />
        <circle cx="96" cy="-14" r="2.6" />
        <circle cx="160" cy="-4" r="3.4" />
        <circle cx="228" cy="-18" r="2.8" />
        <circle cx="292" cy="-6" r="3.2" />
        <circle cx="356" cy="-16" r="2.7" />
      </g>
      <g className="kkb-ash-b" fill="#7f7a70" opacity="0.8">
        <circle cx="62" cy="-30" r="2.7" />
        <circle cx="128" cy="-18" r="3.3" />
        <circle cx="196" cy="-32" r="2.6" />
        <circle cx="262" cy="-22" r="3.1" />
        <circle cx="324" cy="-34" r="2.8" />
        <circle cx="386" cy="-24" r="2.6" />
      </g>

      <style>{`
        .kkb-broom {
          transform-box: fill-box;
          transform-origin: 0% 0%;
          animation: kkb-sweep 1.6s ease-in-out infinite;
        }
        @keyframes kkb-sweep {
          0%, 100% { transform: rotate(-13deg); }
          50%      { transform: rotate(9deg); }
        }
        .kkb-ash-a, .kkb-ash-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .kkb-ash-a { animation: kkb-fall 6s linear infinite; }
        .kkb-ash-b { animation: kkb-fall 6s linear 3s infinite; }
        @keyframes kkb-fall {
          0%   { transform: translate(0, 0); opacity: 0; }
          8%   { opacity: 0.9; }
          88%  { opacity: 0.9; }
          100% { transform: translate(-22px, 238px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .kkb-broom, .kkb-ash-a, .kkb-ash-b { animation: none; }
          .kkb-broom { transform: rotate(-6deg); transform-box: fill-box; transform-origin: 0% 0%; }
          .kkb-ash-a { transform: translate(-10px, 110px); transform-box: fill-box; opacity: 0.9; }
          .kkb-ash-b { transform: translate(-16px, 180px); transform-box: fill-box; opacity: 0.8; }
        }
      `}</style>
    </svg>
  );
}
