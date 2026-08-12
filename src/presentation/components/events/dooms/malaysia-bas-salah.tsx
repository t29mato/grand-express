/**
 * バスターミナルで、似た行き先の2台のバスを乗り間違える。ゲートに
 * 停まった2台のバスのうち、乗り込んだほうが違う方向へ走り去っていく。
 * 行き先の文字は書かず、バスの向きと走り去る動きだけで表す。
 *
 * 動くのは走り去るバスと、ホームで振り返る人影だけ。
 */
export function MalaysiaBasSalah() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* バスターミナルの屋根の下。 */}
      <rect width="400" height="210" fill="#7f8898" />
      <rect y="0" width="400" height="60" fill="#9aa4b0" />
      <rect y="50" width="400" height="16" fill="#5a5a5a" />
      <g fill="#4a4a52">
        <rect x="20" y="50" width="8" height="30" />
        <rect x="372" y="50" width="8" height="30" />
      </g>

      {/* ホームの床。 */}
      <rect y="150" width="400" height="60" fill="#9a9484" />
      <g stroke="#8a8478" strokeWidth="2">
        <path d="M0,150h400" />
      </g>

      {/* 発着案内(文字なし、行き先ランプだけ)。 */}
      <g>
        <rect x="60" y="70" width="60" height="20" rx="3" fill="#241a10" />
        <circle cx="72" cy="80" r="4" fill="#f4c430" />
        <circle cx="86" cy="80" r="4" fill="#f4c430" opacity="0.5" />
        <rect x="280" y="70" width="60" height="20" rx="3" fill="#241a10" />
        <circle cx="292" cy="80" r="4" fill="#f4c430" />
        <circle cx="306" cy="80" r="4" fill="#f4c430" opacity="0.5" />
      </g>

      {/* ゲートAに停まる別方向行きのバス(奥、動かない)。 */}
      <g>
        <rect x="30" y="100" width="90" height="46" rx="8" fill="#5b8fe8" />
        <rect x="38" y="108" width="74" height="18" fill="#bfe0f0" />
        <circle cx="48" cy="150" r="8" fill="#241a10" />
        <circle cx="100" cy="150" r="8" fill="#241a10" />
      </g>

      {/* 乗り込んで走り去るバス(手前、右へ発車)。 */}
      <g className="my-bs-bus">
        <rect x="0" y="0" width="110" height="52" rx="8" fill="#e8443f" />
        <rect x="10" y="8" width="90" height="20" fill="#bfe0f0" />
        <circle cx="20" cy="56" r="9" fill="#241a10" />
        <circle cx="80" cy="56" r="9" fill="#241a10" />
      </g>

      {/* 速さを示す線。 */}
      <g className="my-bs-lines" stroke="#f6efe2" strokeWidth="2" opacity="0.6">
        <path d="M0,0h26M0,10h18M0,20h22" />
      </g>

      {/* ホームで振り返る人影(切符を手に、驚いた様子)。 */}
      <g>
        <circle cx="220" cy="132" r="8" fill="#d9a273" />
        <rect x="210" y="146" width="20" height="26" rx="4" fill="#7fae5a" />
        <rect x="228" y="150" width="10" height="6" fill="#f6efe2" />
      </g>

      <style>{`
        .my-bs-bus {
          transform: translate(150px, 96px);
          animation: my-bs-depart 2.6s ease-in infinite;
        }
        @keyframes my-bs-depart {
          0%, 30% { transform: translate(150px, 96px); }
          100% { transform: translate(460px, 96px); }
        }
        .my-bs-lines {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: my-bs-blur 2.6s ease-in infinite;
        }
        @keyframes my-bs-blur {
          0%, 30% { transform: translate(150px, 122px); opacity: 0; }
          40% { opacity: 0.6; }
          100% { transform: translate(460px, 122px); opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .my-bs-bus { animation: none; transform: translate(260px, 96px); }
          .my-bs-lines { animation: none; opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
