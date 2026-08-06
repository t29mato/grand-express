/**
 * 島の丘の温泉町(松山など)に重ねる動き。
 *
 * 木立のあいだから湯気が3本、丘の上の空へゆっくり立ちのぼる。
 * 入江の海面はときどき光る。
 * 背景(空・丘・海・木立)は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function JapanIslandhill() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 入江のきらめき(木立の切れ間の海) */}
      <g stroke="#eaf6fb" strokeWidth="2" strokeLinecap="round" opacity="0.55">
        <line className="jih-glint jih-glint-a" x1="24" y1="128" x2="44" y2="128" />
        <line className="jih-glint jih-glint-b" x1="46" y1="140" x2="62" y2="140" />
        <line className="jih-glint jih-glint-c" x1="70" y1="132" x2="88" y2="132" />
        <line className="jih-glint jih-glint-d" x1="34" y1="146" x2="52" y2="146" />
      </g>

      {/* 湯気(左の湯壺) */}
      <g transform="translate(104,140)" fill="#ffffff">
        <ellipse className="jih-steam jih-s1" cx="0" cy="0" rx="9" ry="5" opacity="0.34" />
        <ellipse className="jih-steam jih-s2" cx="4" cy="-20" rx="11" ry="6" opacity="0.4" />
        <ellipse className="jih-steam jih-s3" cx="-3" cy="-40" rx="13" ry="7" opacity="0.32" />
        <ellipse className="jih-steam jih-s4" cx="6" cy="-60" rx="15" ry="8" opacity="0.18" />
      </g>

      {/* 湯気(中央の湯壺) */}
      <g transform="translate(200,146)" fill="#ffffff">
        <ellipse className="jih-steam jih-s2" cx="0" cy="0" rx="10" ry="6" opacity="0.34" />
        <ellipse className="jih-steam jih-s4" cx="-5" cy="-22" rx="12" ry="7" opacity="0.42" />
        <ellipse className="jih-steam jih-s1" cx="3" cy="-44" rx="14" ry="8" opacity="0.3" />
        <ellipse className="jih-steam jih-s3" cx="-4" cy="-66" rx="17" ry="9" opacity="0.16" />
      </g>

      {/* 湯気(右の湯壺) */}
      <g transform="translate(292,138)" fill="#ffffff">
        <ellipse className="jih-steam jih-s3" cx="0" cy="0" rx="8" ry="5" opacity="0.32" />
        <ellipse className="jih-steam jih-s1" cx="5" cy="-19" rx="10" ry="6" opacity="0.38" />
        <ellipse className="jih-steam jih-s4" cx="-2" cy="-38" rx="12" ry="7" opacity="0.28" />
        <ellipse className="jih-steam jih-s2" cx="4" cy="-57" rx="14" ry="8" opacity="0.15" />
      </g>

      <style>{`
        .jih-steam {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: jih-rise 10s ease-in infinite;
        }
        .jih-s2 { animation-delay: -2.5s; }
        .jih-s3 { animation-delay: -5s; animation-duration: 11.5s; }
        .jih-s4 { animation-delay: -7.5s; animation-duration: 9s; }
        .jih-glint { animation: jih-shine 7s ease-in-out infinite; }
        .jih-glint-b { animation-delay: -1.6s; animation-duration: 8.5s; }
        .jih-glint-c { animation-delay: -3.2s; animation-duration: 6.4s; }
        .jih-glint-d { animation-delay: -4.8s; animation-duration: 9s; }
        @keyframes jih-rise {
          0% { transform: translate(0, 14px) scale(0.5); opacity: 0; }
          30% { opacity: 0.42; }
          70% { opacity: 0.24; }
          100% { transform: translate(8px, -30px) scale(1.7); opacity: 0; }
        }
        @keyframes jih-shine {
          0%, 100% { transform: translateX(0); opacity: 0.12; }
          50% { transform: translateX(9px); opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .jih-steam, .jih-glint { animation: none; }
        }
      `}</style>
    </svg>
  );
}
