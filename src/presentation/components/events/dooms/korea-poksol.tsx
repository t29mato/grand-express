/**
 * 大雪で足止め。一夜で山の反対側に一メートルの雪が積もり、道路も唯一の鉄道も
 * 除雪が終わるまで閉ざされた。乗客は駅の売店でカップ麺を買いながら待つ。
 *
 * **止まった列車と、湯気の立つカップ麺**で「足止め」を示す。
 * 動くのは、降り続く雪1つだけ。
 */
export function KoreaPoksol() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雪雲の空。 */}
      <rect width="400" height="210" fill="#7f8fa0" />
      <rect y="0" width="400" height="70" fill="#96a4b4" />

      {/* 雪をかぶった山なみ。 */}
      <path d="M0,90 L60,44 L110,80 L170,30 L230,80 L290,50 L340,84 L400,60 L400,110 L0,110z" fill="#c4ccd4" />
      <path d="M0,90 L60,44 L110,80 L170,30 L230,80 L290,50 L340,84 L400,60" fill="none" stroke="#e8eef2" strokeWidth="4" />

      {/* 積もった駅のホーム。 */}
      <rect y="110" width="400" height="100" fill="#e8eef2" />
      <rect y="150" width="400" height="6" fill="#9aa0a8" />

      {/* 止まった列車。 */}
      <g strokeLinejoin="round">
        <rect x="30" y="118" width="180" height="34" rx="6" fill="#2f6ea8" stroke="#1c2b3a" strokeWidth="2.5" />
        <rect x="40" y="124" width="26" height="16" rx="2" fill="#bfe0f0" />
        <rect x="74" y="124" width="26" height="16" rx="2" fill="#bfe0f0" />
        <rect x="108" y="124" width="26" height="16" rx="2" fill="#bfe0f0" />
        {/* 屋根に積もった雪。 */}
        <path d="M30,118 q90,-10 180,0v6h-180z" fill="#f2f6f8" />
      </g>

      {/* 売店の小さな屋台。 */}
      <g strokeLinejoin="round">
        <rect x="270" y="140" width="70" height="46" fill="#8a5a3a" stroke="#3a2a1c" strokeWidth="2.5" />
        <path d="M264,140h82l-6,-14h-70z" fill="#c8102e" stroke="#3a2a1c" strokeWidth="2" />
        <rect x="282" y="154" width="20" height="24" fill="#f6efe2" />
      </g>

      {/* カップ麺を持って待つ人。湯気が立つ。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M226,168 L222,196" stroke="#3d3a42" strokeWidth="9" fill="none" />
        <path d="M238,168 L242,196" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M232,138 L232,170" stroke="#e8443f" strokeWidth="22" fill="none" />
        <circle cx="232" cy="124" r="11" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <path d="M244,150 L256,156" stroke="#d9a273" strokeWidth="7" fill="none" />
        <path d="M254,146 L266,150 L264,164 L252,164z" fill="#f5b31c" stroke="#3a2a1c" strokeWidth="2" />
      </g>
      <g className="kpk-steam" stroke="#f6efe2" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M258,144 q-4,-8 0,-14" />
        <path d="M264,144 q4,-8 0,-14" />
      </g>

      {/* 降り続く雪。**ここだけが動く。** */}
      <g className="kpk-snow" fill="#f6efe2">
        <circle cx="60" cy="20" r="3" />
        <circle cx="140" cy="10" r="2.4" />
        <circle cx="200" cy="24" r="3.2" />
        <circle cx="330" cy="14" r="2.6" />
        <circle cx="380" cy="30" r="3" />
        <circle cx="20" cy="40" r="2.4" />
      </g>

      <style>{`
        .kpk-snow {
          animation: kpk-fall 3s linear infinite;
        }
        @keyframes kpk-fall {
          0%   { transform: translateY(-10px); opacity: 0.9; }
          100% { transform: translateY(190px); opacity: 0.9; }
        }
        .kpk-steam {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: kpk-rise 2.2s ease-in-out infinite;
        }
        @keyframes kpk-rise {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.9; transform: translateY(-6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kpk-snow, .kpk-steam { animation: none; }
        }
      `}</style>
    </svg>
  );
}
