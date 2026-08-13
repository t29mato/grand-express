/**
 * 雪解け水で道が水浸しになる。山の雪が川筋の流量を超える速さで解け、
 * 町外れの低い道は一週間近く膝の深さまで水に浸かった。
 *
 * **水をかぶった道と、流れてきた板きれ**だけで筋を見せる。
 * 動くのは、漂ってくる板きれ1つだけ。
 */
export function UkrainePovin() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った春の空。 */}
      <rect width="400" height="210" fill="#7f9aa8" />
      <g fill="#94aeb8">
        <ellipse cx="90" cy="34" rx="80" ry="20" />
        <ellipse cx="300" cy="26" rx="100" ry="24" />
      </g>

      {/* 遠くの丘。 */}
      <path d="M0,110c60,-26 120,-26 180,0c60,-24 140,-24 220,0v10H0z" fill="#5f8a5c" />

      {/* 水をかぶった道。 */}
      <rect y="120" width="400" height="90" fill="#3f7fae" />
      <g stroke="#bfe8f4" strokeWidth="2" opacity="0.7" fill="none">
        <path d="M20,150h70M180,160h100M60,180h70" />
      </g>

      {/* 半分沈んだ道標。 */}
      <rect x="94" y="150" width="6" height="60" fill="#6b5330" />
      <rect x="80" y="150" width="34" height="14" fill="#c9a877" stroke="#5a4630" strokeWidth="2" />

      {/* 沈んだ柵。 */}
      <g stroke="#8a6a3a" strokeWidth="4" opacity="0.8">
        <path d="M260,140v20M280,138v22M300,140v20M320,138v22" />
      </g>

      {/* 水を見て立ちすくむ人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M200,150 L194,180" stroke="#3d3a42" strokeWidth="9" fill="none" />
        <path d="M210,150 L216,180" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M204,122 L204,152" stroke="#c8102e" strokeWidth="20" fill="none" />
        <circle cx="204" cy="110" r="10" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <path d="M192,130 L178,138" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>

      {/* 手前の水面(道路が沈む線)。 */}
      <rect y="176" width="400" height="34" fill="#2f6ea8" opacity="0.9" />

      {/* 漂ってくる板きれ。**ここだけが動く。** */}
      <g className="upv-plank">
        <rect x="-16" y="-3" width="32" height="6" rx="2" fill="#8a6a3a" stroke="#5a4630" strokeWidth="1.5" />
      </g>

      <style>{`
        .upv-plank {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: upv-drift 4.4s linear infinite;
        }
        @keyframes upv-drift {
          0%   { transform: translate(400px, 156px) rotate(-6deg); }
          50%  { transform: translate(200px, 192px) rotate(8deg); }
          100% { transform: translate(0px, 172px) rotate(-4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .upv-plank {
            animation: none;
            transform: translate(180px, 186px) rotate(4deg);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
