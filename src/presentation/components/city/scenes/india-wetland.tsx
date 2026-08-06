/**
 * グワハーティ(wetland)に重ねる動き。
 *
 * 葦がそろって風になびき、水面に波紋がひろがって消え、
 * 白鷺が二羽、川面すれすれを渡る。朝もやが低く流れる。
 * 背景(空・丘・湿地・犀)は下の静止画が描いているので、ここでは動くものだけ。
 */

/** 背景の葦のあいだに足す、少し丈のある葦。x座標と高さ。 */
const WET_REEDS: ReadonlyArray<readonly [number, number]> = [
  [50, 16],
  [90, 13],
  [130, 18],
  [170, 14],
  [210, 17],
  [250, 13],
  [290, 18],
  [330, 15],
  [370, 12],
];

export function IndiaWetland() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 低く流れる朝もや */}
      <g fill="#e6f2ec">
        <ellipse className="iwet-mist iwet-mist-1" cx="110" cy="136" rx="110" ry="8" />
        <ellipse className="iwet-mist iwet-mist-2" cx="300" cy="146" rx="86" ry="6" />
      </g>

      {/* 風になびく葦 */}
      <g fill="#8fc46a">
        {WET_REEDS.map(([x, h], i) => (
          <path
            key={x}
            className="iwet-reed"
            d={`M${x},168c-0.6,${-h * 0.5} -0.2,${-h * 0.8} 1.4,${-h}c1.2,${h * 0.3} 1.4,${h * 0.6} 0.6,${h}z`}
            style={{ animationDelay: `${(i * 0.4) % 2.4}s`, animationDuration: `${4.4 + (i % 3) * 0.9}s` }}
          />
        ))}
      </g>

      {/* 水面の波紋 */}
      <g fill="none" stroke="#cfeadf" strokeWidth="1.6" vectorEffect="non-scaling-stroke">
        <g transform="translate(84,184)">
          <ellipse className="iwet-ring iwet-ring-1" cx="0" cy="0" rx="10" ry="3" />
        </g>
        <g transform="translate(306,194)">
          <ellipse className="iwet-ring iwet-ring-2" cx="0" cy="0" rx="10" ry="3" />
        </g>
        <g transform="translate(180,202)">
          <ellipse className="iwet-ring iwet-ring-3" cx="0" cy="0" rx="10" ry="3" />
        </g>
      </g>

      {/* 川面を渡る白鷺 */}
      <g className="iwet-egret iwet-egret-1">
        <path className="iwet-wing" d="M-11,0Q-5.5,-6 0,0Q5.5,-6 11,0" fill="none" stroke="#f4faf7" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <g className="iwet-egret iwet-egret-2">
        <path className="iwet-wing iwet-wing-slow" d="M-8,0Q-4,-5 0,0Q4,-5 8,0" fill="none" stroke="#eef7f3" strokeWidth="2" strokeLinecap="round" />
      </g>

      <style>{`
        .iwet-mist { opacity: 0; }
        .iwet-mist-1 { animation: iwet-flow-a 30s linear infinite; }
        .iwet-mist-2 { animation: iwet-flow-b 38s linear 9s infinite; }
        @keyframes iwet-flow-a {
          0%   { transform: translateX(-130px); opacity: 0; }
          30%, 70% { opacity: 0.32; }
          100% { transform: translateX(150px); opacity: 0; }
        }
        @keyframes iwet-flow-b {
          0%   { transform: translateX(110px); opacity: 0; }
          30%, 70% { opacity: 0.26; }
          100% { transform: translateX(-150px); opacity: 0; }
        }

        .iwet-reed {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation-name: iwet-bend; animation-iteration-count: infinite; animation-timing-function: ease-in-out;
        }
        @keyframes iwet-bend {
          0%, 100% { transform: rotate(-9deg); }
          50%      { transform: rotate(9deg); }
        }

        .iwet-ring { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
        .iwet-ring-1 { animation: iwet-spread 7s ease-out infinite; }
        .iwet-ring-2 { animation: iwet-spread 9s ease-out 3s infinite; }
        .iwet-ring-3 { animation: iwet-spread 8s ease-out 5.5s infinite; }
        @keyframes iwet-spread {
          0%   { transform: scale(0.3); opacity: 0; }
          20%  { opacity: 0.5; }
          100% { transform: scale(2.6); opacity: 0; }
        }

        .iwet-egret-1 { animation: iwet-cross-a 22s linear infinite; }
        .iwet-egret-2 { animation: iwet-cross-b 28s linear 7s infinite; }
        @keyframes iwet-cross-a {
          0%   { transform: translate(-26px, 132px); }
          100% { transform: translate(426px, 118px); }
        }
        @keyframes iwet-cross-b {
          0%   { transform: translate(426px, 112px); }
          100% { transform: translate(-26px, 126px); }
        }
        .iwet-wing { transform-box: fill-box; transform-origin: 50% 100%; animation: iwet-flap 1.1s ease-in-out infinite alternate; }
        .iwet-wing-slow { animation-duration: 1.5s; }
        @keyframes iwet-flap {
          from { transform: scaleY(0.35); }
          to   { transform: scaleY(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .iwet-mist-1, .iwet-mist-2, .iwet-reed,
          .iwet-ring-1, .iwet-ring-2, .iwet-ring-3,
          .iwet-egret-1, .iwet-egret-2, .iwet-wing, .iwet-wing-slow { animation: none; }
          .iwet-mist { opacity: 0.3; }
          .iwet-reed { transform: rotate(-7deg); }
          .iwet-ring { opacity: 0.45; }
          .iwet-ring-2 { transform: scale(1.8); }
          .iwet-ring-3 { transform: scale(2.2); }
          .iwet-egret-1 { transform: translate(96px, 126px); }
          .iwet-egret-2 { transform: translate(320px, 116px); }
        }
      `}</style>
    </svg>
  );
}
