/**
 * カササギが急降下して光る物を持ち去る。接触や痛がる様子は描かず、
 * 急降下の弧と、持ち去られる金属片の煌めきだけで示す。
 */
export function AustraliaMagpieSwoop() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 明るい春の空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="60" fill="#cfe4f0" />
      <g fill="#f6efe2" opacity="0.9">
        <ellipse cx="330" cy="30" rx="26" ry="10" />
      </g>

      {/* 公園の遊歩道。 */}
      <rect y="150" width="400" height="60" fill="#5f9a4a" />
      <path d="M0,190 Q200,178 400,190 L400,210 L0,210 Z" fill="#c8bda0" />

      {/* 自転車に乗る人。ヘルメットに結束バンド。 */}
      <g>
        <circle cx="130" cy="150" r="16" fill="none" stroke="#20242a" strokeWidth="3" />
        <circle cx="260" cy="150" r="16" fill="none" stroke="#20242a" strokeWidth="3" />
        <path d="M130,150 L180,110 L220,110 L260,150" stroke="#4a4a52" strokeWidth="3" fill="none" />
        <path d="M180,110 L170,150" stroke="#4a4a52" strokeWidth="3" />
        <circle cx="196" cy="94" r="12" fill="#e8443f" />
        <g stroke="#f6efe2" strokeWidth="1.6">
          <path d="M190,84 v-6" />
          <path d="M202,84 v-6" />
        </g>
        <path d="M196,106 L182,140" stroke="#d9a273" strokeWidth="6" strokeLinecap="round" />
        <rect x="150" y="128" width="24" height="4" fill="#4a4436" />
      </g>

      {/* 開いたバッグと、光る金属片。 */}
      <rect x="150" y="126" width="20" height="14" rx="2" fill="#8a7050" />
      <rect className="amp-shine" x="156" y="128" width="6" height="6" fill="#f6efe2" />

      {/* 急降下するカササギ。弧を描いて金属片をかすめ取る。 */}
      <g className="amp-magpie" style={{ transformOrigin: "196px 30px" }}>
        <path d="M0,0 q10,-6 20,0 q-10,4 -20,0z" fill="#20242a" />
        <path d="M4,0 q6,4 12,0" fill="#f6efe2" />
        <path d="M0,0 q-10,-8 -16,-4" stroke="#20242a" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      <style>{`
        .amp-magpie {
          transform-box: fill-box;
          animation: amp-dive 2.2s ease-in-out infinite;
        }
        @keyframes amp-dive {
          0%   { transform: translate(0px, 0px) rotate(0deg); }
          45%  { transform: translate(-38px, 96px) rotate(35deg); }
          55%  { transform: translate(-42px, 100px) rotate(35deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
        .amp-shine {
          animation: amp-glint 2.2s ease-in-out infinite;
        }
        @keyframes amp-glint {
          0%, 40%  { opacity: 1; transform: translate(0, 0); }
          55%      { opacity: 1; transform: translate(-40px, -94px); }
          70%, 100% { opacity: 0; transform: translate(-40px, -94px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .amp-magpie, .amp-shine {
            animation: none;
          }
          .amp-magpie { transform: translate(-40px, 98px) rotate(35deg); }
          .amp-shine { opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
