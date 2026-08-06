/**
 * トップページの見出しに流す、夜明けの汽車。
 *
 * 出来事アニメーション(docs/50-authoring/02-animation-guide.md)と同じ作法で作る。
 * 自己完結・`<style>` にキーフレーム直書き・無限ループ・`prefers-reduced-motion` 対応。
 * 横長の帯として使うので viewBox だけは `0 0 800 200` にしてある。
 *
 * 落とし穴への対応:
 *   - 位置決めは外側の `<g transform>`、動きは内側の要素のクラス
 *     (CSSキーフレームの transform は SVG の transform 属性を上書きするため)
 *   - 変形する要素には `transform-box: fill-box` と `transform-origin` を書く
 *
 * ずっと止まらずに繰り返させるため、流れる部分はすべて
 *   - 枕木・線路 … 破線の `stroke-dashoffset` を動かす(継ぎ目が出ない)
 *   - 丘・電柱  … 同じ絵を横に並べて1タイルぶん左へ送る
 * のどちらかにしてある。汽車自体はその場で上下に揺れるだけ。
 */
export function SetupHeroTrain() {
  return (
    <svg
      className="hero-art"
      viewBox="0 0 800 200"
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="sh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b1330" />
          <stop offset="52%" stopColor="#3a2d66" />
          <stop offset="80%" stopColor="#7c4a6e" />
          <stop offset="100%" stopColor="#e08a3c" />
        </linearGradient>

        {/* 遠くの丘(1タイル400px、始点と終点の高さを揃えて継ぎ目を消す) */}
        <g id="sh-hills-far">
          <path
            d="M0,150 q40,-24 80,0 q40,-24 80,0 q40,-24 80,0 q40,-24 80,0 q40,-24 80,0 L400,200 L0,200z"
            fill="#3d2f5e"
          />
        </g>

        {/* 手前の丘 */}
        <g id="sh-hills-near">
          <path
            d="M0,164 q50,-30 100,0 q50,-30 100,0 q50,-30 100,0 q50,-30 100,0 L400,200 L0,200z"
            fill="#2b2049"
          />
        </g>

        {/* 電柱1本 */}
        <g id="sh-pole">
          <rect x="-2" y="-58" width="4" height="58" fill="#241a3f" />
          <rect x="-13" y="-58" width="26" height="4" rx="2" fill="#241a3f" />
          <circle cx="-9" cy="-52" r="2" fill="#4a3b7d" />
          <circle cx="9" cy="-52" r="2" fill="#4a3b7d" />
        </g>
      </defs>

      {/* 空 */}
      <rect width="800" height="200" fill="url(#sh-sky)" />

      {/* 星(またたく) */}
      <g fill="#f6efe2">
        <circle className="sh-star" cx="62" cy="30" r="1.8" />
        <circle className="sh-star" cx="148" cy="18" r="1.4" style={{ animationDelay: "0.7s" }} />
        <circle className="sh-star" cx="214" cy="46" r="1.6" style={{ animationDelay: "1.4s" }} />
        <circle className="sh-star" cx="330" cy="24" r="1.3" style={{ animationDelay: "0.3s" }} />
        <circle className="sh-star" cx="428" cy="52" r="1.7" style={{ animationDelay: "1.9s" }} />
        <circle className="sh-star" cx="512" cy="22" r="1.4" style={{ animationDelay: "1.1s" }} />
        <circle className="sh-star" cx="602" cy="40" r="1.5" style={{ animationDelay: "2.3s" }} />
        <circle className="sh-star" cx="712" cy="28" r="1.8" style={{ animationDelay: "0.5s" }} />
        <circle className="sh-star" cx="766" cy="58" r="1.3" style={{ animationDelay: "1.6s" }} />
      </g>

      {/* 昇りはじめた日。汽車の進む先(右)に置く。 */}
      <circle cx="706" cy="138" r="48" fill="#f5b31c" opacity="0.14" />
      <circle cx="706" cy="138" r="28" fill="#f5b31c" opacity="0.92" />

      {/* 遠景(ゆっくり流れる) */}
      <g className="sh-far">
        <use href="#sh-hills-far" x="0" />
        <use href="#sh-hills-far" x="400" />
        <use href="#sh-hills-far" x="800" />
      </g>
      <g className="sh-near">
        <use href="#sh-hills-near" x="0" />
        <use href="#sh-hills-near" x="400" />
        <use href="#sh-hills-near" x="800" />
      </g>

      {/* 電柱(手前なので速く流れる) */}
      <g className="sh-poles">
        <g transform="translate(30,172)">
          <use href="#sh-pole" />
        </g>
        <g transform="translate(220,172)">
          <use href="#sh-pole" />
        </g>
        <g transform="translate(410,172)">
          <use href="#sh-pole" />
        </g>
        <g transform="translate(600,172)">
          <use href="#sh-pole" />
        </g>
        <g transform="translate(790,172)">
          <use href="#sh-pole" />
        </g>
        <g transform="translate(980,172)">
          <use href="#sh-pole" />
        </g>
      </g>

      {/* 築堤 */}
      <rect y="176" width="800" height="24" fill="#241a3f" />

      {/* 枕木・レール。破線を送ることで継ぎ目なく流す。 */}
      <line className="sh-sleepers" x1="0" y1="180" x2="800" y2="180" stroke="#4a3b7d" strokeWidth="9" strokeDasharray="9 15" />
      <line x1="0" y1="176.5" x2="800" y2="176.5" stroke="#6b5a9e" strokeWidth="2" />
      <line x1="0" y1="183.5" x2="800" y2="183.5" stroke="#6b5a9e" strokeWidth="2" />

      {/* これから敷かれてゆく線路(汽車の前方だけ金色に光って走る) */}
      <line
        className="sh-laying"
        x1="600"
        y1="180"
        x2="800"
        y2="180"
        stroke="#f5b31c"
        strokeWidth="3"
        strokeDasharray="14 12"
        opacity="0.85"
      />

      {/*
        汽車。位置決めは外側の g、揺れは内側のクラスに分ける。
        帯は slice で切り取られるので、狭い画面でも残る中央〜右寄りに置く
        (375px幅では viewBox の x=150〜650 あたりしか見えない)。
      */}
      <g transform="translate(560,177)">
        <g className="sh-train">
          {/* 後ろの客車 */}
          <g transform="translate(-206,0)">
            <rect x="0" y="-38" width="66" height="30" rx="5" fill="#37b3a4" />
            <rect x="0" y="-38" width="66" height="7" rx="3" fill="#2a8d81" />
            <rect x="7" y="-30" width="14" height="12" rx="2" fill="#1b1330" />
            <rect x="26" y="-30" width="14" height="12" rx="2" fill="#1b1330" />
            <rect x="45" y="-30" width="14" height="12" rx="2" fill="#1b1330" />
            <g transform="translate(15,-7)">
              <g className="sh-wheel">
                <circle r="7" fill="#2a1f3d" stroke="#6b5a9e" strokeWidth="2" />
                <rect x="-1" y="-6" width="2" height="12" fill="#6b5a9e" />
                <rect x="-6" y="-1" width="12" height="2" fill="#6b5a9e" />
              </g>
            </g>
            <g transform="translate(51,-7)">
              <g className="sh-wheel">
                <circle r="7" fill="#2a1f3d" stroke="#6b5a9e" strokeWidth="2" />
                <rect x="-1" y="-6" width="2" height="12" fill="#6b5a9e" />
                <rect x="-6" y="-1" width="12" height="2" fill="#6b5a9e" />
              </g>
            </g>
          </g>

          {/* 前の客車 */}
          <g transform="translate(-132,0)">
            <rect x="0" y="-38" width="66" height="30" rx="5" fill="#f5b31c" />
            <rect x="0" y="-38" width="66" height="7" rx="3" fill="#c98f10" />
            <rect x="7" y="-30" width="14" height="12" rx="2" fill="#1b1330" />
            <rect x="26" y="-30" width="14" height="12" rx="2" fill="#1b1330" />
            <rect x="45" y="-30" width="14" height="12" rx="2" fill="#1b1330" />
            <g transform="translate(15,-7)">
              <g className="sh-wheel">
                <circle r="7" fill="#2a1f3d" stroke="#6b5a9e" strokeWidth="2" />
                <rect x="-1" y="-6" width="2" height="12" fill="#6b5a9e" />
                <rect x="-6" y="-1" width="12" height="2" fill="#6b5a9e" />
              </g>
            </g>
            <g transform="translate(51,-7)">
              <g className="sh-wheel">
                <circle r="7" fill="#2a1f3d" stroke="#6b5a9e" strokeWidth="2" />
                <rect x="-1" y="-6" width="2" height="12" fill="#6b5a9e" />
                <rect x="-6" y="-1" width="12" height="2" fill="#6b5a9e" />
              </g>
            </g>
          </g>

          {/* 連結器 */}
          <rect x="-140" y="-20" width="10" height="4" fill="#2a1f3d" />
          <rect x="-66" y="-20" width="10" height="4" fill="#2a1f3d" />

          {/* 機関車 */}
          <g transform="translate(-56,0)">
            {/* 運転室 */}
            <rect x="0" y="-46" width="30" height="38" rx="4" fill="#3a2d66" />
            <rect x="5" y="-40" width="20" height="15" rx="2" fill="#8fc4e8" />
            {/* 罐 */}
            <rect x="28" y="-32" width="52" height="24" rx="6" fill="#c2453b" />
            <rect x="28" y="-32" width="52" height="6" rx="3" fill="#9c332b" />
            <circle cx="76" cy="-20" r="9" fill="#f5b31c" />
            <circle cx="76" cy="-20" r="4" fill="#fff6de" />
            {/* 煙突 */}
            <rect x="60" y="-48" width="12" height="18" rx="2" fill="#2a1f3d" />
            <rect x="56" y="-52" width="20" height="6" rx="3" fill="#2a1f3d" />
            {/* 排障器 */}
            <path d="M80,-14 L92,-2 L80,-2z" fill="#2a1f3d" />
            {/* 動輪 */}
            <g transform="translate(20,-9)">
              <g className="sh-wheel sh-wheel-big">
                <circle r="9" fill="#2a1f3d" stroke="#f5b31c" strokeWidth="2" />
                <rect x="-1" y="-8" width="2" height="16" fill="#f5b31c" />
                <rect x="-8" y="-1" width="16" height="2" fill="#f5b31c" />
              </g>
            </g>
            <g transform="translate(48,-8)">
              <g className="sh-wheel">
                <circle r="8" fill="#2a1f3d" stroke="#6b5a9e" strokeWidth="2" />
                <rect x="-1" y="-7" width="2" height="14" fill="#6b5a9e" />
                <rect x="-7" y="-1" width="14" height="2" fill="#6b5a9e" />
              </g>
            </g>
            <g transform="translate(70,-8)">
              <g className="sh-wheel">
                <circle r="8" fill="#2a1f3d" stroke="#6b5a9e" strokeWidth="2" />
                <rect x="-1" y="-7" width="2" height="14" fill="#6b5a9e" />
                <rect x="-7" y="-1" width="14" height="2" fill="#6b5a9e" />
              </g>
            </g>
          </g>

          {/* 煙(煙突から上がって後ろへ流れる)。
              動きを止めたときにも煙の筋に見えるよう、静止位置は外側の g でずらしてある。 */}
          <g transform="translate(10,-54)">
            <circle className="sh-puff" r="8" fill="#f6efe2" />
          </g>
          <g transform="translate(-2,-62)">
            <circle className="sh-puff" r="10" fill="#f6efe2" style={{ animationDelay: "0.6s" }} />
          </g>
          <g transform="translate(-16,-70)">
            <circle className="sh-puff" r="12" fill="#f6efe2" style={{ animationDelay: "1.2s" }} />
          </g>
        </g>
      </g>

      <style>{`
        .sh-star { animation: sh-twinkle 3s ease-in-out infinite; }
        .sh-far { animation: sh-drift 26s linear infinite; }
        .sh-near { animation: sh-drift 15s linear infinite; }
        .sh-poles { animation: sh-drift-pole 3.6s linear infinite; }
        .sh-sleepers { animation: sh-rails 0.6s linear infinite; }
        .sh-laying { animation: sh-rails 0.9s linear infinite; }
        .sh-train { animation: sh-bob 0.9s ease-in-out infinite; }
        .sh-wheel {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: sh-roll 0.62s linear infinite;
        }
        .sh-wheel-big { animation-duration: 0.78s; }
        .sh-puff {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: sh-steam 1.8s ease-out infinite;
          opacity: 0;
        }
        @keyframes sh-twinkle {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.95; }
        }
        @keyframes sh-drift {
          from { transform: translateX(0); }
          to { transform: translateX(-400px); }
        }
        @keyframes sh-drift-pole {
          from { transform: translateX(0); }
          to { transform: translateX(-190px); }
        }
        @keyframes sh-rails {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -26px; }
        }
        @keyframes sh-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
        }
        @keyframes sh-roll {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sh-steam {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          18% { opacity: 0.72; }
          100% { transform: translate(-52px, -30px) scale(1.5); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sh-star, .sh-far, .sh-near, .sh-poles, .sh-sleepers,
          .sh-laying, .sh-train, .sh-wheel, .sh-puff { animation: none; }
          .sh-puff { opacity: 0.5; }
        }
      `}</style>
    </svg>
  );
}
