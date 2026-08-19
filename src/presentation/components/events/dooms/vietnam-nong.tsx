/**
 * ノン(熱波)。山から吹き下ろす乾いた「火の風」が、中部沿岸の気温を
 * 何日も40度以上に押し上げる。レールがわずかに歪むほどの暑さで、
 * いちばん暑い区間では夕方まで列車がのろのろ運転になることもある。
 *
 * 構図: 白く灼けた昼下がりの町。**主役は線路ではなく、暑さのしのぎかた。**
 * 左に日よけの下のハンモックで動かない人、中央に氷を入れたサトウキビ搾りの屋台、
 * トラックの下で伸びている犬。列車は右奥をのろのろ通り過ぎるだけにしてある。
 *
 * **レールの工学の絵にしない。**アジア盤とエジプト盤に、
 * 反ったレールを直す絵がすでに2枚ある。**こちらは町の側から描く。**
 *
 * 動くのは5つ: 地面から立つ陽炎、ハンモックの揺れ、扇風機の首振り、
 * のろのろ進む列車、犬の尻尾。止めても「日陰に寄った人と、白く灼けた通り」で伝わる。
 */
export function VietnamNong() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灼けて白茶けた空。 */}
      <rect width="400" height="210" fill="#e0d0a0" />
      <rect width="400" height="82" fill="#f2e6c0" />
      <rect width="400" height="36" fill="#f7efd4" />
      <circle cx="196" cy="30" r="26" fill="#f7d05a" />
      <circle cx="196" cy="30" r="40" fill="#f7d05a" opacity="0.26" />

      {/* 中景: 白く灼けた町並みと、遠くの山(火の風はここから下りてくる)。 */}
      <path
        d="M0,90L54,58L104,84L164,54L222,86L280,60L336,88L400,66v28z"
        fill="#c4b294"
      />
      <g fill="#efe7d0">
        <rect x="0" y="94" width="60" height="40" />
        <rect x="64" y="100" width="44" height="34" />
        <rect x="286" y="96" width="54" height="38" />
        <rect x="344" y="102" width="56" height="32" />
      </g>
      <g fill="#dcd2b8">
        <path d="M-2,94h64l-6,-8H4zM62,100h48l-5,-7H67zM284,96h58l-6,-8h-46zM342,102h60l-5,-7h-50z" />
      </g>
      <g fill="#3f7a5a" opacity="0.85">
        <rect x="10" y="104" width="12" height="16" />
        <rect x="32" y="104" width="12" height="16" />
        <rect x="76" y="110" width="11" height="14" />
        <rect x="298" y="106" width="12" height="16" />
        <rect x="320" y="106" width="12" height="16" />
        <rect x="358" y="112" width="11" height="14" />
      </g>

      {/* のろのろ通る列車(右奥)。 */}
      <g className="vietnam-nong-crawl">
        <rect x="292" y="136" width="76" height="22" rx="3" fill="#c8b48a" />
        <rect x="292" y="136" width="76" height="5" fill="#da251d" />
        <g fill="#7f8c94">
          <rect x="298" y="144" width="13" height="8" />
          <rect x="316" y="144" width="13" height="8" />
          <rect x="334" y="144" width="13" height="8" />
          <rect x="352" y="144" width="13" height="8" />
        </g>
        <rect x="290" y="158" width="80" height="3" fill="#4c4638" />
      </g>
      <g>
        <rect y="160" width="400" height="4" fill="#6f6a5c" />
        <g fill="#8a7a5e" opacity="0.8">
          <rect x="12" y="158" width="10" height="7" />
          <rect x="52" y="158" width="10" height="7" />
          <rect x="92" y="158" width="10" height="7" />
          <rect x="132" y="158" width="10" height="7" />
          <rect x="172" y="158" width="10" height="7" />
          <rect x="212" y="158" width="10" height="7" />
          <rect x="252" y="158" width="10" height="7" />
          <rect x="292" y="158" width="10" height="7" />
          <rect x="332" y="158" width="10" height="7" />
          <rect x="372" y="158" width="10" height="7" />
        </g>
      </g>

      {/* 通り。 */}
      <rect y="166" width="400" height="44" fill="#cfc0a0" />
      <rect y="166" width="400" height="5" fill="#d8cbac" />

      {/* 左: 日よけとハンモック。動かない人。 */}
      <g>
        <path d="M-4,124h112l8,14H2z" fill="#2f8f8a" />
        <g fill="#8a6a46">
          <rect x="6" y="138" width="5" height="34" />
          <rect x="98" y="138" width="5" height="34" />
        </g>
        <g className="vietnam-nong-hammock">
          <path
            d="M10,150q44,26 90,0"
            fill="none"
            stroke="#a88a56"
            strokeWidth="2.4"
          />
          <path
            d="M16,152q38,22 78,0q-8,16 -39,16q-31,0 -39,-16z"
            fill="#da251d"
          />
          <path d="M20,158q30,14 66,0l-3,5q-27,11 -60,0z" fill="#e8b21c" />
          <circle cx="90" cy="152" r="7" fill="#8a6a48" />
          <path d="M84,150q6,-7 12,0q0,-6 -6,-6q-6,0 -6,6z" fill="#3f3a34" />
        </g>
        {/* 扇風機 */}
        <g transform="translate(112,0)">
          <rect x="-2" y="150" width="4" height="22" fill="#7f8c94" />
          <rect x="-8" y="172" width="16" height="4" rx="2" fill="#7f8c94" />
          <g className="vietnam-nong-fan">
            <circle
              cx="0"
              cy="142"
              r="11"
              fill="none"
              stroke="#7f8c94"
              strokeWidth="2.4"
            />
            <path
              d="M0,142l8,-6M0,142l-2,10M0,142l-9,-4"
              stroke="#5f6a72"
              strokeWidth="2.4"
              fill="none"
            />
          </g>
        </g>
      </g>

      {/* 中央: 氷を入れたサトウキビ搾りの屋台。 */}
      <g transform="translate(196,0)">
        <path d="M-46,148h92l6,10h-104z" fill="#e8b21c" />
        <rect x="-40" y="158" width="80" height="24" fill="#c9a878" />
        <g fill="#8a6a46">
          <rect x="-38" y="182" width="5" height="14" />
          <rect x="33" y="182" width="5" height="14" />
        </g>
        {/* 搾り機 */}
        <rect x="-30" y="142" width="18" height="16" rx="2" fill="#7f8c94" />
        <circle cx="-21" cy="150" r="4.4" fill="#5f6a72" />
        {/* 氷とグラス */}
        <g fill="#bfe0e4">
          <path d="M2,158h14l-2,16H4z" />
          <path d="M22,158h13l-2,16h-9z" />
        </g>
        <g fill="#8fae3a">
          <rect x="2" y="158" width="14" height="6" />
          <rect x="22" y="158" width="13" height="5" />
        </g>
        {/* サトウキビの束 */}
        <g stroke="#6f9f4a" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M-42,158v-22M-36,158v-26M-30,158v-20" />
        </g>
      </g>

      {/* トラックの下で伸びている犬。 */}
      <g transform="translate(320,0)">
        <rect x="-40" y="168" width="70" height="18" rx="3" fill="#5f7a8a" />
        <rect x="24" y="160" width="26" height="12" rx="2" fill="#5f7a8a" />
        <g fill="#2f3238">
          <circle cx="-24" cy="188" r="7" />
          <circle cx="36" cy="188" r="7" />
        </g>
        <g fill="#c9a878">
          <ellipse cx="-6" cy="196" rx="17" ry="6" />
          <ellipse cx="-24" cy="194" rx="7" ry="5" />
          <rect x="-14" y="199" width="4" height="5" />
          <rect x="4" y="199" width="4" height="5" />
        </g>
        <g className="vietnam-nong-tail">
          <path
            d="M11,195q10,-2 13,-7"
            stroke="#c9a878"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* 陽炎。**ここが主に動く。**地面すれすれで揺れる。 */}
      <g
        className="vietnam-nong-heat1"
        stroke="#f7efd4"
        strokeWidth="3"
        fill="none"
        opacity="0.55"
        strokeLinecap="round"
      >
        <path d="M40,180q11,-7 22,0t22,0M148,186q11,-7 22,0t22,0M262,178q11,-7 22,0t22,0" />
      </g>
      <g
        className="vietnam-nong-heat2"
        stroke="#f7efd4"
        strokeWidth="2.4"
        fill="none"
        opacity="0.45"
        strokeLinecap="round"
      >
        <path d="M96,196q11,-7 22,0t22,0M212,200q11,-7 22,0t22,0M330,194q11,-7 22,0t22,0" />
      </g>

      <style>{`
        .vietnam-nong-heat1 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-nong-shimmer 2.6s ease-in-out infinite;
        }
        .vietnam-nong-heat2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-nong-shimmer 3.4s ease-in-out -1.2s infinite;
        }
        @keyframes vietnam-nong-shimmer {
          0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.25; }
          50% { transform: translateY(-7px) scaleY(1.35); opacity: 0.65; }
        }
        .vietnam-nong-hammock {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: vietnam-nong-sway 5.2s ease-in-out infinite;
        }
        @keyframes vietnam-nong-sway {
          0%, 100% { transform: rotate(-1.2deg); }
          50% { transform: rotate(1.2deg); }
        }
        .vietnam-nong-fan {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-nong-oscillate 3.6s ease-in-out infinite;
        }
        @keyframes vietnam-nong-oscillate {
          0%, 100% { transform: rotate(-16deg); }
          50% { transform: rotate(16deg); }
        }
        .vietnam-nong-crawl {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: vietnam-nong-slow 11s linear infinite;
        }
        @keyframes vietnam-nong-slow {
          0% { transform: translateX(28px); }
          100% { transform: translateX(-30px); }
        }
        .vietnam-nong-tail {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: vietnam-nong-wag 3.8s ease-in-out infinite;
        }
        @keyframes vietnam-nong-wag {
          0%, 84%, 100% { transform: rotate(0deg); }
          90% { transform: rotate(-14deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .vietnam-nong-heat1,
          .vietnam-nong-heat2,
          .vietnam-nong-hammock,
          .vietnam-nong-fan,
          .vietnam-nong-crawl,
          .vietnam-nong-tail { animation: none; }
        }
      `}</style>
    </svg>
  );
}
