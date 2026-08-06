/**
 * ムンバイ(megacity)に重ねる動き。
 *
 * ビルの窓が一つずつ灯ってはまた消え、下の道路をヘッドライトと
 * テールランプが流れ、街のもやがゆっくり横に渡る。
 * 背景(空・ビル・道路)は下の静止画が描いているので、ここでは動くものだけ。
 */

/** 明滅させる窓。背景の点灯済みの窓とは別の枠に足している。 */
const MEG_WINDOWS: ReadonlyArray<readonly [number, number]> = [
  [28, 104],
  [42, 120],
  [28, 136],
  [72, 114],
  [82, 130],
  [114, 90],
  [128, 122],
  [114, 138],
  [290, 112],
  [304, 96],
  [336, 122],
  [348, 138],
];

export function IndiaMegacity() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 街にかかるもや */}
      <g fill="#dfe8ef">
        <ellipse className="meg-haze meg-haze-1" cx="120" cy="112" rx="140" ry="9" />
        <ellipse className="meg-haze meg-haze-2" cx="300" cy="100" rx="104" ry="7" />
      </g>

      {/* 明滅する窓 */}
      <g fill="#f5d06a">
        {MEG_WINDOWS.map(([x, y], i) => (
          <rect
            key={`${x}-${y}`}
            className="meg-win"
            x={x}
            y={y}
            width="6"
            height="8"
            style={{ animationDelay: `${(i * 1.7) % 9}s`, animationDuration: `${9 + (i % 4) * 2}s` }}
          />
        ))}
      </g>

      {/* 道路を流れるライト */}
      <g>
        <rect className="meg-head meg-head-1" x="-30" y="188" width="20" height="4" rx="2" fill="#f7e6a8" />
        <rect className="meg-head meg-head-2" x="-30" y="196" width="16" height="3.5" rx="1.7" fill="#fff3cf" />
        <rect className="meg-head meg-head-3" x="-30" y="184" width="24" height="4" rx="2" fill="#f7e6a8" />
        <rect className="meg-tail meg-tail-1" x="410" y="202" width="18" height="4" rx="2" fill="#e8443f" />
        <rect className="meg-tail meg-tail-2" x="410" y="192" width="14" height="3.5" rx="1.7" fill="#f26a5a" />
      </g>

      <style>{`
        .meg-haze { opacity: 0; }
        .meg-haze-1 { animation: meg-drift-a 34s linear infinite; }
        .meg-haze-2 { animation: meg-drift-b 44s linear 8s infinite; }
        @keyframes meg-drift-a {
          0%   { transform: translateX(-140px); opacity: 0; }
          30%, 70% { opacity: 0.13; }
          100% { transform: translateX(160px); opacity: 0; }
        }
        @keyframes meg-drift-b {
          0%   { transform: translateX(120px); opacity: 0; }
          30%, 70% { opacity: 0.1; }
          100% { transform: translateX(-160px); opacity: 0; }
        }

        .meg-win { opacity: 0; animation-name: meg-blink; animation-iteration-count: infinite; animation-timing-function: ease-in-out; }
        @keyframes meg-blink {
          0%, 8%, 92%, 100% { opacity: 0; }
          22%, 74%          { opacity: 0.85; }
        }

        .meg-head { opacity: 0; }
        .meg-head-1 { animation: meg-run-r 6.5s linear infinite; }
        .meg-head-2 { animation: meg-run-r 9s linear 2.4s infinite; }
        .meg-head-3 { animation: meg-run-r 7.8s linear 4.6s infinite; }
        @keyframes meg-run-r {
          0%   { transform: translateX(0); opacity: 0; }
          10%, 88% { opacity: 0.9; }
          100% { transform: translateX(462px); opacity: 0; }
        }
        .meg-tail { opacity: 0; }
        .meg-tail-1 { animation: meg-run-l 8.5s linear 1.2s infinite; }
        .meg-tail-2 { animation: meg-run-l 11s linear 5.5s infinite; }
        @keyframes meg-run-l {
          0%   { transform: translateX(0); opacity: 0; }
          10%, 88% { opacity: 0.85; }
          100% { transform: translateX(-448px); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .meg-haze-1, .meg-haze-2, .meg-win,
          .meg-head-1, .meg-head-2, .meg-head-3, .meg-tail-1, .meg-tail-2 { animation: none; }
          .meg-haze { opacity: 0.18; }
          .meg-win { opacity: 0.85; }
          .meg-head-1 { opacity: 0.9; transform: translateX(120px); }
          .meg-head-2 { opacity: 0.9; transform: translateX(250px); }
          .meg-head-3 { opacity: 0.9; transform: translateX(330px); }
          .meg-tail-1 { opacity: 0.85; transform: translateX(-160px); }
          .meg-tail-2 { opacity: 0.85; transform: translateX(-300px); }
        }
      `}</style>
    </svg>
  );
}
