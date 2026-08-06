"use client";

import { EVENT_ANIMATIONS } from "./animations";

/**
 * 青マス・赤マスの出来事の絵。
 *
 * 文字だけだと何が起きたのか頭に残らないので、出来事ごとに短い動く絵を出す。
 * 絵は出来事IDで引く。用意されていない出来事は、増減だけが分かる汎用の絵になる。
 */
export function EventAnimation({ eventId, gained }: { eventId: string; gained: boolean }) {
  const Scene = EVENT_ANIMATIONS[eventId];
  return (
    <div className="event-anim">
      {Scene ? <Scene /> : <FallbackScene gained={gained} />}
    </div>
  );
}

/** 専用の絵がまだ無い出来事のための、増える/減るだけを示す絵。 */
function FallbackScene({ gained }: { gained: boolean }) {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      <rect width="400" height="210" fill={gained ? "#1d3b2a" : "#3b1d22"} />
      <g className={gained ? "coin-up" : "coin-down"}>
        <circle cx="200" cy="105" r="34" fill="#f5b31c" stroke="#a8760a" strokeWidth="4" />
        <text x="200" y="118" textAnchor="middle" fontSize="34" fill="#7a5405" fontWeight="700">
          {gained ? "+" : "−"}
        </text>
      </g>
      <style>{`
        .coin-up { animation: coinUp 1.6s ease-in-out infinite; }
        .coin-down { animation: coinDown 1.6s ease-in-out infinite; }
        @keyframes coinUp { 0%,100% { transform: translateY(8px); } 50% { transform: translateY(-8px); } }
        @keyframes coinDown { 0%,100% { transform: translateY(-8px); } 50% { transform: translateY(8px); } }
        @media (prefers-reduced-motion: reduce) { .coin-up, .coin-down { animation: none; } }
      `}</style>
    </svg>
  );
}
