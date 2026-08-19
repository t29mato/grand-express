/**
 * 乗継列車が運休になる。新幹線の二つの区間をつなぐ列車がその日は運休で、
 * 西へ向かう者は皆、引き返してバスを探す羽目になる。
 *
 * 昼・晴。駅のホーム。主役は**空いたままの乗継ホーム**と、代わりのバス。
 * 人は**3人**、待っている。文字は描けないので、案内板は
 * **列車の絵柄に赤い×**、その下に**バスの絵柄**で示す。
 */
export function KyushuKigyouTorikeshi() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空と、ホーム上屋の外。 */}
      <rect width="400" height="210" fill="#8f8a7c" />
      <rect y="0" width="400" height="54" fill="#8fc4e8" />
      <rect y="44" width="400" height="16" fill="#cfe4f0" />
      <g fill="#f6efe2" opacity="0.75">
        <ellipse cx="66" cy="18" rx="20" ry="7" />
        <ellipse cx="52" cy="18" rx="12" ry="5.4" />
        <ellipse cx="300" cy="12" rx="22" ry="7" />
      </g>
      {/* 遠くの山と町。 */}
      <path d="M0,60q54,-26 120,-20q64,6 96,20z" fill="#6b8060" />
      <path d="M262,60q40,-22 84,-18q38,4 54,18z" fill="#5f7456" />
      <g fill="#c9c4b6">
        <rect x="228" y="42" width="14" height="18" />
        <rect x="248" y="36" width="12" height="24" />
      </g>

      {/* ホームの上屋。 */}
      <rect y="60" width="400" height="10" fill="#8a939c" />
      <rect y="68" width="400" height="4" fill="#6f7680" />
      <g fill="#7f8a94">
        <rect x="34" y="72" width="7" height="64" />
        <rect x="196" y="72" width="7" height="64" />
        <rect x="358" y="72" width="7" height="64" />
      </g>

      {/* 線路(乗継ホーム側。列車は来ない)。 */}
      <rect y="128" width="400" height="30" fill="#6f6a5e" />
      <g fill="#5a4a38">
        <rect x="4" y="136" width="18" height="6" />
        <rect x="40" y="136" width="18" height="6" />
        <rect x="76" y="136" width="18" height="6" />
        <rect x="112" y="136" width="18" height="6" />
        <rect x="148" y="136" width="18" height="6" />
        <rect x="184" y="136" width="18" height="6" />
        <rect x="220" y="136" width="18" height="6" />
        <rect x="256" y="136" width="18" height="6" />
        <rect x="292" y="136" width="18" height="6" />
        <rect x="328" y="136" width="18" height="6" />
        <rect x="364" y="136" width="18" height="6" />
      </g>
      <g stroke="#a09884" strokeWidth="3" fill="none">
        <path d="M0,134h400M0,146h400" />
      </g>

      {/* ホームの床。手前。 */}
      <rect y="158" width="400" height="52" fill="#b0aa9c" />
      <rect y="158" width="400" height="4" fill="#c4bfb2" />
      <rect y="164" width="400" height="7" fill="#f5b31c" />
      <g fill="#d9a10f">
        <rect x="0" y="166" width="400" height="1.6" />
      </g>
      <g stroke="#9a9488" strokeWidth="1.6" opacity="0.7" fill="none">
        <path d="M0,186h400M0,202h400M60,171v39M160,171v39M260,171v39M350,171v39" />
      </g>

      {/* 案内板。**列車に赤い×が入り、下にバスが出る。** */}
      <rect x="86" y="72" width="112" height="4" fill="#5f6a74" />
      <rect x="132" y="76" width="6" height="8" fill="#5f6a74" />
      <rect x="82" y="82" width="116" height="46" rx="3" fill="#2f3640" />
      <rect x="86" y="86" width="108" height="38" fill="#1e252c" />
      {/* 上段: 列車の絵柄。 */}
      <g>
        <rect x="92" y="90" width="46" height="14" rx="4" fill="#8fa8c4" />
        <rect x="92" y="99" width="46" height="3" fill="#5f8fb0" />
        <g fill="#2f3640">
          <rect x="97" y="93" width="9" height="5" />
          <rect x="110" y="93" width="9" height="5" />
          <rect x="123" y="93" width="9" height="5" />
        </g>
        <circle cx="100" cy="105" r="2" fill="#5f6a74" />
        <circle cx="130" cy="105" r="2" fill="#5f6a74" />
      </g>
      <g
        className="kkt-cross"
        stroke="#e8443f"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M92,90l46,16M138,90l-46,16" />
      </g>
      {/* 下段: バスの絵柄(振替)。 */}
      <g>
        <rect x="148" y="90" width="40" height="16" rx="4" fill="#f5b31c" />
        <rect x="148" y="90" width="40" height="5" fill="#f8cf68" />
        <g fill="#2f3640">
          <rect x="152" y="96" width="8" height="5" />
          <rect x="164" y="96" width="8" height="5" />
          <rect x="176" y="96" width="8" height="5" />
        </g>
        <circle cx="157" cy="107" r="2.4" fill="#5f6a74" />
        <circle cx="180" cy="107" r="2.4" fill="#5f6a74" />
      </g>
      <g className="kkt-arrow" fill="#f5b31c">
        <path d="M140,116h14l-4,-4h10l8,5l-8,5h-10l4,-4h-14z" />
      </g>

      {/* 待つ人3人。年格好も持ち物も変える。 */}
      {/* 1人目: スーツケースを引く人。 */}
      <g>
        <rect x="248" y="184" width="6" height="20" fill="#3f4852" />
        <rect x="258" y="184" width="6" height="20" fill="#3f4852" />
        <path d="M245,154h22l3,32h-28z" fill="#4a5a8a" />
        <circle cx="256" cy="147" r="8" fill="#e0b48a" />
        <path d="M247,145a9,9 0 0 1 18,0q-4,-5 -9,-5t-9,5z" fill="#3a332c" />
        <path
          d="M268,158L282,168"
          stroke="#e0b48a"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="282" y="168" width="4" height="18" fill="#5f6a74" />
        <rect x="274" y="186" width="22" height="20" rx="3" fill="#c2453c" />
        <rect x="274" y="192" width="22" height="3" fill="#8a3a34" />
        <circle cx="279" cy="207" r="2.6" fill="#3a3d42" />
        <circle cx="291" cy="207" r="2.6" fill="#3a3d42" />
      </g>
      {/* 2人目: 案内板を見上げる人。 */}
      <g>
        <rect x="212" y="188" width="5.4" height="18" fill="#5a4a38" />
        <rect x="221" y="188" width="5.4" height="18" fill="#5a4a38" />
        <path d="M209,162h20l2.6,28h-25z" fill="#4f8f7a" />
        <circle cx="219" cy="155" r="7.4" fill="#e0b48a" />
        <path d="M211,154a8,8 0 0 1 16,0q-4,-4 -8,-4t-8,4z" fill="#5f4a34" />
        <path
          d="M209,168L198,158"
          stroke="#e0b48a"
          strokeWidth="3.6"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      {/* 3人目: 荷物に腰かけて待つ人。 */}
      <g transform="translate(-172,0)">
        <rect x="316" y="192" width="28" height="16" rx="3" fill="#8a6a44" />
        <rect x="316" y="198" width="28" height="3" fill="#6b5330" />
        <path d="M320,192h20l1.6,-22h-23z" fill="#f5b31c" />
        <circle cx="331" cy="164" r="7" fill="#e0b48a" />
        <path d="M324,163a7,7 0 0 1 14,0q-3.4,-4 -7,-4t-7,4z" fill="#3a332c" />
        <path
          d="M320,186l-6,14M342,186l6,14"
          stroke="#3f4852"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* 振替のバス。**右から入ってくる。** */}
      <g className="kkt-bus">
        <rect x="0" y="0" width="126" height="46" rx="7" fill="#f5b31c" />
        <rect x="0" y="0" width="126" height="12" rx="6" fill="#f8cf68" />
        <rect x="0" y="30" width="126" height="6" fill="#d9a10f" />
        <g fill="#3f5566">
          <rect x="8" y="14" width="20" height="13" rx="2" />
          <rect x="34" y="14" width="20" height="13" rx="2" />
          <rect x="60" y="14" width="20" height="13" rx="2" />
          <rect x="88" y="12" width="30" height="16" rx="2" />
        </g>
        <rect x="82" y="30" width="6" height="16" fill="#d9a10f" />
        <circle cx="24" cy="46" r="8" fill="#3a3d42" />
        <circle cx="24" cy="46" r="3.4" fill="#8a8f94" />
        <circle cx="100" cy="46" r="8" fill="#3a3d42" />
        <circle cx="100" cy="46" r="3.4" fill="#8a8f94" />
        <rect x="118" y="18" width="8" height="6" rx="2" fill="#f8e2a0" />
      </g>

      <style>{`
        .kkt-cross {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: kkt-blink 1.6s steps(1, end) infinite;
        }
        @keyframes kkt-blink {
          0%, 62%   { opacity: 1; }
          63%, 100% { opacity: 0.45; }
        }
        .kkt-arrow {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: kkt-nudge 1.6s ease-in-out infinite;
        }
        @keyframes kkt-nudge {
          0%, 100% { transform: translateX(-3px); opacity: 0.7; }
          50%      { transform: translateX(3px); opacity: 1; }
        }
        .kkt-bus {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: kkt-arrive 6s ease-out infinite;
        }
        @keyframes kkt-arrive {
          0%       { transform: translate(410px, 152px); }
          55%, 100%{ transform: translate(300px, 150px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kkt-cross, .kkt-arrow, .kkt-bus { animation: none; }
          .kkt-cross { opacity: 1; }
          .kkt-arrow { opacity: 1; }
          .kkt-bus { transform: translate(300px, 150px); transform-box: fill-box; transform-origin: 0% 50%; }
        }
      `}</style>
    </svg>
  );
}
