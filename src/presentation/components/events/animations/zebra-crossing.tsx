/**
 * ラパスの「シマウマ隊」に助けられる。
 *
 * 横断歩道でシマウマの着ぐるみを着た若者が車を止め、落とした鞄を拾って投げ返してくれる。
 */
export function ZebraCrossing() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空とイリマニ */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <path d="M228,150 L296,40 L364,150z" fill="#6d87a6" />
      <path d="M296,40 L324,86 L310,78 L296,90 L282,78 L268,86z" fill="#f6efe2" />

      {/* すり鉢の斜面に建つ煉瓦の家 */}
      <g fill="#a2603f">
        <rect x="-2" y="104" width="36" height="46" />
        <rect x="36" y="116" width="30" height="34" />
        <rect x="70" y="98" width="40" height="52" />
        <rect x="114" y="110" width="34" height="40" />
        <rect x="152" y="120" width="28" height="30" />
        <rect x="184" y="104" width="30" height="46" />
        <rect x="218" y="114" width="32" height="36" />
        <rect x="254" y="122" width="26" height="28" />
        <rect x="286" y="110" width="30" height="40" />
        <rect x="320" y="118" width="34" height="32" />
        <rect x="358" y="102" width="44" height="48" />
      </g>
      <g fill="#f5b31c">
        <rect x="8" y="112" width="6" height="7" />
        <rect x="80" y="106" width="6" height="7" />
        <rect x="94" y="120" width="6" height="7" />
        <rect x="192" y="114" width="6" height="7" />
        <rect x="296" y="120" width="6" height="7" />
        <rect x="368" y="112" width="6" height="7" />
      </g>

      {/* 車道と横断歩道 */}
      <rect y="146" width="400" height="6" fill="#7c8189" />
      <rect y="152" width="400" height="58" fill="#3a3f46" />
      <g fill="#f6efe2" opacity="0.85">
        <rect x="60" y="158" width="13" height="46" />
        <rect x="86" y="158" width="13" height="46" />
        <rect x="112" y="158" width="13" height="46" />
        <rect x="138" y="158" width="13" height="46" />
        <rect x="164" y="158" width="13" height="46" />
        <rect x="190" y="158" width="13" height="46" />
        <rect x="216" y="158" width="13" height="46" />
      </g>

      {/* 止まってくれた車 */}
      <g transform="translate(330,176)">
        <ellipse cx="0" cy="7" rx="48" ry="6" fill="#22252b" opacity="0.35" />
        <g className="zb-car">
          <path d="M-28,-24 L-16,-42 L16,-42 L28,-24z" fill="#e8443f" />
          <path d="M-21,-27 L-12,-38 L12,-38 L20,-27z" fill="#8fc4e8" />
          <rect x="-46" y="-26" width="92" height="21" rx="6" fill="#e8443f" />
          <rect x="-49" y="-21" width="7" height="8" rx="2" fill="#f5b31c" />
          <circle cx="-26" cy="-4" r="9" fill="#22252b" />
          <circle cx="28" cy="-4" r="9" fill="#22252b" />
          <circle cx="-26" cy="-4" r="3.5" fill="#7c8189" />
          <circle cx="28" cy="-4" r="3.5" fill="#7c8189" />
        </g>
      </g>

      {/* 交通整理のシマウマ */}
      <g transform="translate(190,178)">
        <ellipse cx="0" cy="1" rx="18" ry="5" fill="#22252b" opacity="0.35" />
        {/* 脚 */}
        <rect x="-11" y="-24" width="8" height="24" rx="3" fill="#f6efe2" />
        <rect x="3" y="-24" width="8" height="24" rx="3" fill="#f6efe2" />
        <g fill="#22252b">
          <rect x="-11" y="-19" width="8" height="4" />
          <rect x="3" y="-19" width="8" height="4" />
          <rect x="-11" y="-9" width="8" height="4" />
          <rect x="3" y="-9" width="8" height="4" />
        </g>
        {/* 胴と縞 */}
        <rect x="-14" y="-58" width="28" height="37" rx="9" fill="#f6efe2" />
        <g fill="#22252b">
          <rect x="-12" y="-53" width="24" height="5" rx="2" />
          <rect x="-13" y="-43" width="26" height="5" rx="2" />
          <rect x="-12" y="-33" width="24" height="5" rx="2" />
        </g>
        {/* 首と頭 */}
        <rect x="-5" y="-70" width="11" height="15" fill="#f6efe2" />
        <path d="M-6,-73 L-12,-55 L-4,-60 L-3,-71z" fill="#22252b" />
        <ellipse cx="3" cy="-76" rx="14" ry="9" fill="#f6efe2" />
        <ellipse cx="14" cy="-74" rx="6" ry="5" fill="#22252b" />
        <circle cx="2" cy="-79" r="2" fill="#22252b" />
        <rect x="-4" y="-82" width="4" height="9" fill="#22252b" />
        <rect x="4" y="-83" width="4" height="8" fill="#22252b" />
        <path d="M-7,-84 L-4,-95 L0,-83z" fill="#f6efe2" />
        <path d="M3,-84 L8,-94 L10,-82z" fill="#f6efe2" />
        {/* 車を止める腕 */}
        <g className="zb-stop">
          <rect x="0" y="-5" width="25" height="10" rx="5" fill="#f6efe2" />
          <rect x="9" y="-5" width="5" height="10" fill="#22252b" />
          <circle cx="29" cy="0" r="7" fill="#f6efe2" />
        </g>
        {/* 鞄を返す腕 */}
        <g className="zb-give">
          <rect x="-25" y="-5" width="25" height="10" rx="5" fill="#f6efe2" />
          <rect x="-14" y="-5" width="5" height="10" fill="#22252b" />
          <circle cx="-29" cy="0" r="6" fill="#f6efe2" />
        </g>
      </g>

      {/* 鞄を落とした旅人 */}
      <g transform="translate(88,186)">
        <ellipse cx="0" cy="1" rx="16" ry="5" fill="#22252b" opacity="0.35" />
        <rect x="-9" y="-22" width="7" height="22" rx="3" fill="#3b2f4a" />
        <rect x="2" y="-22" width="7" height="22" rx="3" fill="#3b2f4a" />
        <rect x="4" y="-50" width="15" height="23" rx="5" fill="#c9a877" />
        <rect x="-12" y="-53" width="24" height="33" rx="7" fill="#5b8fe8" />
        <circle cx="0" cy="-63" r="11" fill="#f6efe2" />
        <path d="M-11,-64 Q0,-80 11,-64 Q0,-72 -11,-64z" fill="#3b2f4a" />
        <g className="zb-catch">
          <rect x="0" y="-4" width="22" height="9" rx="4" fill="#f6efe2" />
          <circle cx="25" cy="0" r="6" fill="#f6efe2" />
        </g>
      </g>

      {/* 投げ返された鞄 */}
      <g transform="translate(156,132)">
        <g className="zb-bag">
          <path d="M-7,-6 A7,9 0 0,1 7,-6" fill="none" stroke="#6b4629" strokeWidth="3" />
          <rect x="-11" y="-7" width="22" height="17" rx="3" fill="#c9a877" />
          <rect x="-11" y="-3" width="22" height="5" fill="#8a6a44" />
        </g>
      </g>

      <style>{`
        .zb-car {
          transform: translate(6px, 0);
          animation: zb-halt 2.6s ease-in-out infinite;
        }
        .zb-stop {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          transform: translate(13px, -52px) rotate(-14deg);
          animation: zb-wave 1.5s ease-in-out infinite;
        }
        .zb-give {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          transform: translate(-13px, -47px) rotate(6deg);
          animation: zb-hand 3s ease-in-out infinite;
        }
        .zb-catch {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          transform: translate(11px, -46px) rotate(-40deg);
          animation: zb-reach 3s ease-in-out infinite;
        }
        .zb-bag {
          transform: translate(-24px, -14px) rotate(-16deg);
          animation: zb-toss 3s ease-in-out infinite;
        }
        @keyframes zb-halt {
          0%, 100% { transform: translate(6px, 0); }
          45% { transform: translate(0, 0); }
          55% { transform: translate(1px, 1px); }
        }
        @keyframes zb-wave {
          0%, 100% { transform: translate(13px, -52px) rotate(2deg); }
          50% { transform: translate(13px, -52px) rotate(-28deg); }
        }
        @keyframes zb-hand {
          0%, 18%, 100% { transform: translate(-13px, -47px) rotate(6deg); }
          6% { transform: translate(-13px, -47px) rotate(-12deg); }
        }
        @keyframes zb-reach {
          0%, 100% { transform: translate(11px, -46px) rotate(-34deg); }
          55%, 80% { transform: translate(11px, -46px) rotate(-46deg); }
        }
        @keyframes zb-toss {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          28% { transform: translate(-18px, -16px) rotate(-14deg); opacity: 1; }
          58% { transform: translate(-42px, -8px) rotate(-30deg); opacity: 1; }
          82% { transform: translate(-42px, -8px) rotate(-30deg); opacity: 1; }
          92% { transform: translate(-42px, -8px) rotate(-30deg); opacity: 0; }
          99% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .zb-car, .zb-stop, .zb-give, .zb-catch, .zb-bag { animation: none; }
        }
      `}</style>
    </svg>
  );
}
