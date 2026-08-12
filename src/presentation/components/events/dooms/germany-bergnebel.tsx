/**
 * 山霧に迷わされる。リーゼン山地の道は、どこからともなく湧いた霧の帯に
 * 覆われて分かれ道が見えなくなり、道標が霧の中で揺れて見える。
 *
 * 遭難や恐怖は描かない。**流れ込む霧の帯**と**立ち尽くす旅人**だけで
 * 「方向が分からなくなった」を伝える。
 */
export function GermanyBergnebel() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った山あいの空。 */}
      <rect width="400" height="210" fill="#7a8a86" />
      <rect y="0" width="400" height="90" fill="#94a3a0" />

      {/* 遠くの山並み。 */}
      <path d="M0,100 L60,50 L100,80 L160,30 L220,80 L280,45 L340,85 L400,60 L400,110 L0,110z" fill="#6f7f78" opacity="0.7" />

      {/* 森と小道。 */}
      <rect y="100" width="400" height="110" fill="#4f6b4a" />
      <path d="M170,210 Q190,150 180,100 Q220,150 220,210z" fill="#5f7f4a" opacity="0.6" />
      <g fill="#2f5f3f">
        <path d="M60,150l-16,30h32z" /><rect x="42" y="176" width="4" height="16" fill="#5a4630" />
        <path d="M330,140l-18,32h36z" /><rect x="310" y="168" width="4" height="18" fill="#5a4630" />
        <path d="M270,160l-14,26h28z" /><rect x="254" y="184" width="4" height="14" fill="#5a4630" />
        <path d="M20,168l-12,22h24z" /><rect x="6" y="188" width="4" height="12" fill="#5a4630" />
      </g>
      <g fill="#8b8f98" opacity="0.7">
        <ellipse cx="150" cy="205" rx="10" ry="4" />
        <ellipse cx="300" cy="203" rx="8" ry="3.4" />
      </g>

      {/* 道標(分かれ道)。 */}
      <g strokeLinejoin="round">
        <rect x="196" y="140" width="6" height="50" fill="#6b5330" />
        <path d="M202,150l24,-4l0,10l-24,-4z" fill="#e8dcc0" stroke="#4a3826" strokeWidth="1.4" />
        <path d="M196,160l-24,-4l0,10l24,-4z" fill="#e8dcc0" stroke="#4a3826" strokeWidth="1.4" />
      </g>

      {/* 立ち尽くす旅人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <rect x="90" y="164" width="20" height="38" rx="7" fill="#3f6b8a" />
        <circle cx="100" cy="152" r="11" fill="#d9a273" stroke="#241a10" strokeWidth="1.6" />
        <rect x="94" y="196" width="4" height="12" fill="#4a3826" />
        <rect x="104" y="196" width="4" height="12" fill="#4a3826" />
      </g>

      {/* 流れ込む霧の帯。何層も重ねてじわじわ動く。 */}
      <g fill="#e8f0ec" opacity="0.7">
        <ellipse className="gbn-fog-a" cx="0" cy="140" rx="120" ry="26" />
        <ellipse className="gbn-fog-b" cx="0" cy="170" rx="150" ry="30" />
        <ellipse className="gbn-fog-c" cx="0" cy="110" rx="100" ry="20" />
        <ellipse className="gbn-fog-d" cx="0" cy="190" rx="90" ry="18" />
      </g>

      <style>{`
        .gbn-fog-a { animation: gbn-drift 5s ease-in-out infinite; }
        .gbn-fog-b { animation: gbn-drift 6.5s ease-in-out infinite; animation-delay: -2s; }
        .gbn-fog-c { animation: gbn-drift 4.2s ease-in-out infinite; animation-delay: -1s; }
        .gbn-fog-d { animation: gbn-drift 5.6s ease-in-out infinite; animation-delay: -3s; }
        @keyframes gbn-drift {
          0% { transform: translateX(-60px); opacity: 0.4; }
          50% { transform: translateX(220px); opacity: 0.85; }
          100% { transform: translateX(460px); opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gbn-fog-a, .gbn-fog-b, .gbn-fog-c, .gbn-fog-d { animation: none; opacity: 0.65; }
        }
      `}</style>
    </svg>
  );
}
