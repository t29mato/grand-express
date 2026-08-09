/**
 * 運び手がつかまらない。ここのものはすべて道路で出ていく。
 * その道路が今日は止まっている。県じゅうの荷を東京へ運ぶ幹線は二、三本しかない。
 *
 * **動くものは1つだけ**——空いたままの積み込み口で、赤いランプが点滅する。
 * 荷は積まれているのに運ぶ車が来ない、という形で「止まっている」を伝える。
 * 事故そのものは描かない。
 */
export function IbarakiHakobiGaTsukanai() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 明け方の集荷場。 */}
      <rect width="400" height="210" fill="#3a4150" />
      <rect y="44" width="400" height="24" fill="#454d5e" />
      <rect y="128" width="400" height="82" fill="#4a4a52" />
      <rect y="128" width="400" height="4" fill="#5a5a62" />

      {/* 倉庫の壁と、開いたまま誰も来ない積み込み口。 */}
      <rect x="0" y="60" width="236" height="70" fill="#5a5a64" />
      <rect x="0" y="56" width="236" height="8" fill="#6b6b76" />
      <rect x="26" y="76" width="86" height="54" fill="#242832" />
      <g stroke="#33333c" strokeWidth="2">
        <line x1="26" y1="86" x2="112" y2="86" />
        <line x1="26" y1="98" x2="112" y2="98" />
        <line x1="26" y1="110" x2="112" y2="110" />
      </g>
      {/* 積み込み口の縁 */}
      <rect x="20" y="128" width="98" height="8" fill="#6b6b76" />

      {/* 出せないままの荷。静物。 */}
      <g stroke="#241f18" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="132" y="96" width="42" height="34" rx="2" fill="#a8875a" />
        <rect x="132" y="110" width="42" height="6" fill="#8a6a44" />
        <rect x="178" y="104" width="38" height="26" rx="2" fill="#96784c" />
        <rect x="178" y="115" width="38" height="5" fill="#7a5f3a" />
        <rect x="140" y="62" width="38" height="34" rx="2" fill="#96784c" />
        <rect x="140" y="76" width="38" height="6" fill="#7a5f3a" />
      </g>
      {/* 中身が分かるよう、上の箱にれんこんを覗かせる。 */}
      <g fill="#e8dcc0" stroke="#241f18" strokeWidth="2">
        <circle cx="150" cy="60" r="7" />
        <circle cx="166" cy="58" r="7" />
      </g>

      {/* 誰も来ない車線。白線だけが続く。 */}
      <g fill="#c9c4b4">
        <rect x="252" y="158" width="34" height="5" />
        <rect x="306" y="156" width="34" height="5" />
        <rect x="360" y="154" width="34" height="5" />
      </g>

      {/* 電話をかけている人。つかまらない。 */}
      <g stroke="#232b3a" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cx="286" cy="200" rx="28" ry="5" fill="#42424a" stroke="none" />
        <rect x="274" y="170" width="12" height="30" rx="5" fill="#2f3b4f" />
        <rect x="288" y="170" width="12" height="30" rx="5" fill="#2f3b4f" />
        <rect x="270" y="128" width="34" height="44" rx="10" fill="#e05252" />
        <circle cx="287" cy="116" r="13" fill="#d9a273" />
        <path d="M274,114 a13,13 0 0 1 26,0z" fill="#241c1a" />
        <g transform="translate(302,138) rotate(-108)">
          <rect x="0" y="-6" width="28" height="12" rx="6" fill="#d9a273" />
        </g>
        <circle cx="296" cy="112" r="6" fill="#d9a273" />
        <rect x="296" y="104" width="7" height="13" rx="2" fill="#2a2f3a" />
      </g>

      {/* 空いた積み込み口の赤ランプ。**ここだけが動く。** */}
      <g className="ihkt-lamp">
        <circle cx="69" cy="70" r="16" fill="#e05252" opacity="0.25" />
        <circle cx="69" cy="70" r="7" fill="#e05252" stroke="#241f18" strokeWidth="2" />
      </g>

      <style>{`
        .ihkt-lamp {
          animation: ihkt-blink 1.6s steps(1, end) infinite;
        }
        @keyframes ihkt-blink {
          0%, 49%   { opacity: 1; }
          50%, 100% { opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ihkt-lamp { animation: none; }
        }
      `}</style>
    </svg>
  );
}
