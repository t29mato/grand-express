/**
 * 大気汚染で車が締め出される(オイ・ノ・シルクラ)。霞んだ大通りに
 * 「車は今日は駄目」の標識、締め出されて路肩に停めた車の列、
 * すし詰めのバスが着き、スーツの会社員が腕時計を確かめて待つ。
 *
 * 動くのは、着いたバスの上下動・排気(むしろ電動バスなら出ない…
 * ここは旧型バスの小さな排気)・時計を見上げる腕。
 * 止めても「規制の日」(標識+停めた車列+満員バス+待つ人)が分かる。
 */
export function MexicoContingencia() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* スモッグに霞む街。 */}
      <rect width="400" height="210" fill="#b8ac9c" />
      <rect width="400" height="60" fill="#c4b8a8" />
      {/* ビルのシルエット(霞の中)。 */}
      <g fill="#9a9088" opacity="0.75">
        <rect x="16" y="60" width="38" height="80" />
        <rect x="62" y="42" width="30" height="98" />
        <rect x="240" y="52" width="34" height="88" />
        <rect x="282" y="68" width="28" height="72" />
        <rect x="340" y="46" width="40" height="94" />
      </g>
      <g fill="#b0a698" opacity="0.7">
        <rect x="110" y="70" width="44" height="70" />
        <rect x="190" y="62" width="40" height="78" />
      </g>
      {/* 霞の帯。 */}
      <rect y="96" width="400" height="12" fill="#c4b8a8" opacity="0.7" />

      {/* 道路。 */}
      <rect y="140" width="400" height="70" fill="#6b6862" />
      <rect y="136" width="400" height="6" fill="#8a8680" />
      <path d="M0,176 h28 M56,176 h28 M112,176 h28 M168,176 h28 M224,176 h28 M280,176 h28 M336,176 h28" stroke="#d8d4c8" strokeWidth="3" />

      {/* 締め出されて路肩に停めた車の列(左)。 */}
      <g>
        <path d="M14,136 q3,-8 13,-8 h20 q10,0 13,8 l2,7 h-50 z" fill="#c8383f" />
        <circle cx="26" cy="144" r="4.4" fill="#2a2a2a" />
        <circle cx="52" cy="144" r="4.4" fill="#2a2a2a" />
        <path d="M18,134 q2,-5 9,-5 h18 q7,0 9,5 z" fill="#e8e0d0" />
      </g>
      <g>
        <path d="M78,136 q3,-8 13,-8 h20 q10,0 13,8 l2,7 h-50 z" fill="#5b8fe8" />
        <circle cx="90" cy="144" r="4.4" fill="#2a2a2a" />
        <circle cx="116" cy="144" r="4.4" fill="#2a2a2a" />
        <path d="M82,134 q2,-5 9,-5 h18 q7,0 9,5 z" fill="#e8e0d0" />
      </g>

      {/* 規制の標識: 赤丸+斜線の中に車。 */}
      <g transform="translate(160,0)">
        <rect x="-2.4" y="96" width="4.8" height="60" fill="#6b6862" />
        <circle cx="0" cy="78" r="21" fill="#f6efe2" stroke="#d43a30" strokeWidth="6" />
        <path d="M-11,80 q2,-6 9,-6 h6 q7,0 9,6 l1,4 h-26 z" fill="#4a4a52" />
        <circle cx="-6" cy="85" r="2.6" fill="#2a2a2a" />
        <circle cx="7" cy="85" r="2.6" fill="#2a2a2a" />
        <path d="M-15,63 L15,93" stroke="#d43a30" strokeWidth="5" />
      </g>

      {/* すし詰めのバス(右から着いたところ)。 */}
      <g className="mxco-bus">
        <rect x="252" y="98" width="126" height="52" rx="6" fill="#3f8f4f" />
        <rect x="252" y="98" width="126" height="12" fill="#f6efe2" />
        {/* 窓いっぱいの乗客。 */}
        <g>
          <rect x="260" y="112" width="22" height="18" fill="#c4d8dc" />
          <rect x="288" y="112" width="22" height="18" fill="#c4d8dc" />
          <rect x="316" y="112" width="22" height="18" fill="#c4d8dc" />
          <rect x="346" y="112" width="24" height="18" fill="#c4d8dc" />
          <g fill="#b5835a">
            <circle cx="266" cy="122" r="4" />
            <circle cx="276" cy="121" r="4" />
            <circle cx="294" cy="122" r="4" />
            <circle cx="304" cy="120" r="4" />
            <circle cx="322" cy="122" r="4" />
            <circle cx="332" cy="121" r="4" />
            <circle cx="352" cy="122" r="4" />
            <circle cx="362" cy="120" r="4" />
          </g>
        </g>
        <circle cx="274" cy="152" r="7" fill="#2a2a2a" />
        <circle cx="352" cy="152" r="7" fill="#2a2a2a" />
        <rect x="254" y="132" width="10" height="10" fill="#f5b31c" />
      </g>
      {/* 排気のけむり。 */}
      <g className="mxco-smoke" fill="#8a8680">
        <ellipse cx="0" cy="0" rx="7" ry="4.4" />
        <ellipse cx="12" cy="-7" rx="5" ry="3.4" />
      </g>

      {/* バス停で待つ会社員(グレーのスーツ+鞄)。時計を見る。 */}
      <g transform="translate(214,0)">
        <ellipse cx="0" cy="200" rx="13" ry="3.2" fill="#3a3a3e" opacity="0.4" />
        <path d="M-4,168 L-5,198" stroke="#3a3a42" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M4,168 L6,198" stroke="#4a4a54" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M-9,138 L9,138 L11,172 L-11,172 z" fill="#5a5a66" />
        <path d="M0,140 l0,20" stroke="#c8383f" strokeWidth="3" />
        <circle cx="0" cy="128" r="9.5" fill="#c98a5f" />
        <path d="M-6,124 a8,8 0 0 1 12,0" stroke="#2a1a10" strokeWidth="3" fill="none" />
        <circle cx="-3" cy="127" r="1.2" fill="#2a1a10" />
        <path d="M-4,133 q3,1.6 6,0" stroke="#2a1a10" strokeWidth="1.2" fill="none" />
        {/* 鞄を持つ腕。 */}
        <path d="M8,146 L14,166" stroke="#5a5a66" strokeWidth="5" strokeLinecap="round" fill="none" />
        <rect x="8" y="166" width="18" height="13" rx="2" fill="#8a5a3a" />
        {/* 時計を見上げる腕。**ここが動く。** */}
        <g className="mxco-watch">
          <path d="M-8,148 Q-20,142 -14,132" stroke="#5a5a66" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <rect x="-19" y="128" width="8" height="7" rx="2" fill="#2a2a32" />
          <circle cx="-15" cy="131.5" r="2.2" fill="#e8e0d0" />
        </g>
      </g>
      {/* 並んで待つもうひとり(緑のワンピース)。 */}
      <g transform="translate(188,0)">
        <path d="M-3,172 L-4,198" stroke="#5a4a3a" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M3,172 L4,198" stroke="#6b5a48" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M-8,144 L8,144 L11,174 L-11,174 z" fill="#3f8f4f" />
        <circle cx="0" cy="134" r="8.6" fill="#b5835a" />
        <path d="M-8,132 a8.6,8.6 0 0 1 17,0 l0,6 l-4,-4 l-9,0 z" fill="#2a1a10" />
        <path d="M-6,152 l-6,12" stroke="#b5835a" strokeWidth="4.4" strokeLinecap="round" />
      </g>

      <style>{`
        .mxco-bus {
          animation: mxco-idle 1.1s ease-in-out infinite;
        }
        @keyframes mxco-idle {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2px); }
        }
        .mxco-smoke {
          animation: mxco-puff 2.2s ease-out infinite;
        }
        @keyframes mxco-puff {
          0%   { transform: translate(384px, 146px) scale(0.5); opacity: 0.8; }
          70%  { transform: translate(398px, 128px) scale(1.15); opacity: 0.25; }
          100% { transform: translate(404px, 120px) scale(1.3); opacity: 0; }
        }
        .mxco-watch {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: mxco-check 2.8s ease-in-out infinite;
        }
        @keyframes mxco-check {
          0%, 55%, 100% { transform: rotate(0deg); }
          70%, 85%      { transform: rotate(-14deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mxco-bus, .mxco-smoke, .mxco-watch {
            animation: none;
          }
          .mxco-smoke { transform: translate(390px, 138px); opacity: 0.5; }
        }
      `}</style>
    </svg>
  );
}
