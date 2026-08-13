/**
 * フアイコが谷を下る。アンデスの谷の上流での豪雨で、泥と岩と鉄砲水の
 * 奔流が前触れなく線路を横切って下ってくる。
 *
 * 人を描かず、**線路を横切る泥流と、傾いた信号機**で「足止め」を表す。
 * 動くのは、谷を下ってくる泥流の帯1つだけ。
 */
export function SouthamericaHuayco() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った山あいの空。 */}
      <rect width="400" height="210" fill="#8a9aa8" />
      <rect y="0" width="400" height="80" fill="#a4b2be" />

      {/* 遠景の山肌。 */}
      <path d="M0,90 L60,20 L130,90z" fill="#6f7f6a" opacity="0.85" />
      <path d="M90,90 L180,10 L260,90z" fill="#5f6f5c" opacity="0.85" />
      <path d="M220,90 L300,30 L400,90z" fill="#6f7f6a" opacity="0.85" />

      {/* 谷の斜面と線路。 */}
      <rect y="90" width="400" height="120" fill="#7a8a6a" />
      <rect x="0" y="150" width="400" height="16" fill="#8b8f98" />
      <g stroke="#5a4a34" strokeWidth="3">
        <line x1="10" y1="158" x2="10" y2="174" />
        <line x1="40" y1="158" x2="40" y2="174" />
        <line x1="70" y1="158" x2="70" y2="174" />
        <line x1="330" y1="158" x2="330" y2="174" />
        <line x1="360" y1="158" x2="360" y2="174" />
        <line x1="390" y1="158" x2="390" y2="174" />
      </g>
      <line x1="0" y1="156" x2="400" y2="156" stroke="#3a3f46" strokeWidth="3" />
      <line x1="0" y1="168" x2="400" y2="168" stroke="#3a3f46" strokeWidth="3" />

      {/* 傾いた信号機。 */}
      <g strokeLinecap="round" strokeLinejoin="round" transform="rotate(-14 320 150)">
        <line x1="320" y1="150" x2="320" y2="96" stroke="#4a4a52" strokeWidth="5" />
        <rect x="308" y="80" width="24" height="20" rx="3" fill="#20364a" stroke="#141a26" strokeWidth="2" />
        <circle cx="320" cy="90" r="5" fill="#e8443f" />
      </g>

      {/* 押し流された貨車。 */}
      <g strokeLinejoin="round">
        <rect x="150" y="132" width="60" height="26" rx="3" fill="#8b5a3c" stroke="#3a3f46" strokeWidth="2.5" transform="rotate(6 180 145)" />
        <circle cx="162" cy="164" r="7" fill="#241a10" transform="rotate(6 180 145)" />
        <circle cx="198" cy="164" r="7" fill="#241a10" transform="rotate(6 180 145)" />
      </g>

      {/* 泥流に埋もれる線路の先。 */}
      <path d="M120,210 Q160,150 220,140 Q280,132 400,150 L400,210z" fill="#6b5334" opacity="0.9" />
      <path d="M120,210 Q170,160 240,150 Q300,144 400,160 L400,210z" fill="#5a4428" opacity="0.9" />

      {/* 谷を下ってくる泥流の帯。**ここだけが動く。** */}
      <g className="sa-huayco-flow">
        <ellipse cx="180" cy="60" rx="40" ry="14" fill="#7a6142" opacity="0.85" />
        <ellipse cx="200" cy="90" rx="46" ry="16" fill="#6b5334" opacity="0.9" />
      </g>

      <style>{`
        .sa-huayco-flow {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: sa-huayco-slide 3.2s ease-in infinite;
        }
        @keyframes sa-huayco-slide {
          0%   { transform: translateY(-40px) scale(0.7); opacity: 0.4; }
          60%  { transform: translateY(30px) scale(1); opacity: 0.9; }
          100% { transform: translateY(60px) scale(1.1); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-huayco-flow {
            animation: none;
            transform: translateY(20px);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
