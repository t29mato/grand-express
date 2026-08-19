/**
 * 渡し船の積み過ぎ。満員になり次第出るはずが、船頭がもう一人、
 * もう一台の自転車、もう一箱と手招きを続け、船は喫水線ぎりぎりまで沈む。
 *
 * 構図: 右に喫水の下がった渡し船(人・自転車・木箱・山羊)、
 * 左の岸に**次こそ乗せてもらいたい人の列**。船頭は艫に立って手招きしている。
 * 岸には停まった車と椰子、対岸は霞んだデルタの緑。
 *
 * 災難だが**怒っている人は描かない**。文面のとおり、
 * 岸の誰もが次に乗せてもらいたいと思っているので、みな待っている。
 *
 * 動くのは4つ: 船の沈み込み(乗るたびに少し下がる)、船頭の手招き、
 * 舷側で上下する水面、岸の列がじりじり詰める動き。
 * 止めても「水面すれすれの満載の船と、岸の列」で伝わる。
 */
export function EgyptFerryoverload() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方に近い川面の空。 */}
      <rect width="400" height="210" fill="#4f8fae" />
      <rect width="400" height="96" fill="#9fc4d8" />
      <rect width="400" height="44" fill="#e8c99a" />
      <circle cx="330" cy="30" r="17" fill="#f4dca6" />

      {/* 対岸。霞んだデルタの緑と椰子。 */}
      <rect y="90" width="400" height="16" fill="#7fa878" />
      <g fill="#5f8f5a" opacity="0.9">
        <rect x="24" y="80" width="22" height="12" />
        <rect x="54" y="84" width="16" height="8" />
        <rect x="300" y="82" width="20" height="10" />
      </g>
      <g stroke="#4f7a4a" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M92,90 v-16 M92,74 q-10,-4 -16,1 M92,74 q10,-4 16,1 M92,74 q-7,-9 -14,-8" />
        <path d="M348,90 v-14 M348,76 q-9,-4 -14,1 M348,76 q9,-4 14,1" />
      </g>

      {/* 川。 */}
      <rect y="106" width="400" height="104" fill="#3f7f9f" />
      <rect y="106" width="400" height="8" fill="#4f92ae" />
      <g stroke="#8fd0dc" strokeWidth="2" fill="none" opacity="0.5">
        <path d="M14,124 h64 M250,132 h84 M40,190 h70 M300,196 h74" />
      </g>

      {/* 左の岸。桟橋と、待っている列。 */}
      <path d="M0,140 h150 v70 H0z" fill="#c5a271" />
      <path d="M0,140 h150 v9 H0z" fill="#d6b483" />
      <rect x="118" y="150" width="62" height="7" fill="#8a6a46" />
      <g fill="#8a6a46">
        <rect x="126" y="157" width="5" height="20" />
        <rect x="168" y="157" width="5" height="20" />
      </g>
      {/* 岸の椰子。**人より先に描いて、人の後ろに立たせる。** */}
      <g stroke="#8a6a46" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M14,150 v-34 M14,116 q-14,-6 -22,2 M14,116 q14,-6 22,2 M14,116 q-10,-13 -19,-12 M14,116 q10,-13 19,-12" />
      </g>
      <g className="egypt-fo-queue">
        {/* 頭に籠を載せた人。 */}
        <g transform="translate(36,0)">
          <circle cx="0" cy="118" r="7.4" fill="#6d5238" />
          <path d="M-9,110 h18 v5 h-18z" fill="#c98a4a" />
          <path d="M-7,126 q-3,16 -1,26 h16 q-3,-18 -3,-26z" fill="#3f9f7f" />
        </g>
        {/* 荷物を提げた人。 */}
        <g transform="translate(64,0)">
          <circle cx="0" cy="122" r="7" fill="#7a5a3c" />
          <path d="M-8,116 q8,-7 16,0 q0,-4 -8,-4 q-8,0 -8,4z" fill="#efe5cd" />
          <path d="M-6,129 q-2,15 -1,23 h14 q-2,-16 -2,-23z" fill="#c94f3c" />
          <rect x="9" y="140" width="11" height="10" fill="#8a6a46" />
        </g>
        {/* 自転車を押す人。 */}
        <g transform="translate(94,0)">
          <circle cx="0" cy="124" r="6.6" fill="#6d5238" />
          <path d="M-6,131 q-2,14 -1,21 h13 q-2,-15 -2,-21z" fill="#2f6f9a" />
          <g stroke="#3a3a3e" strokeWidth="2" fill="none">
            <circle cx="12" cy="146" r="7" />
            <circle cx="30" cy="146" r="7" />
            <path d="M12,146 l7,-10 h9 l3,10 M19,136 v-5 h6" />
          </g>
        </g>
      </g>

      {/* 岸に積んである、次の便に載せる荷。 */}
      <g fill="#a07a4c">
        <rect x="4" y="158" width="24" height="16" />
        <rect x="30" y="164" width="18" height="10" />
        <rect x="8" y="148" width="18" height="10" />
      </g>
      <g stroke="#8a6a46" strokeWidth="1.4" fill="none" opacity="0.7">
        <path d="M4,166 h24 M8,153 h18" />
      </g>

      {/* 満載の渡し船。喫水がほとんど無い。**止めても残る主役。** */}
      <g className="egypt-fo-boat">
        <path
          d="M196,158 h172 q-6,20 -26,22 H216 q-16,-4 -20,-22z"
          fill="#6b4f34"
        />
        <path d="M196,158 h172 v5 H196z" fill="#8a6a46" />
        {/* 乗っている人と荷。ぎっしり詰める。 */}
        <g>
          <circle cx="216" cy="140" r="7" fill="#7a5a3c" />
          <path d="M210,147 q-2,7 -1,11 h14 q-2,-7 -2,-11z" fill="#e8b21c" />
          <circle cx="238" cy="136" r="7" fill="#6d5238" />
          <path d="M232,143 q-2,8 -1,15 h14 q-2,-9 -2,-15z" fill="#c94f3c" />
          <circle cx="262" cy="140" r="6.6" fill="#7a5a3c" />
          <path d="M256,147 q-2,6 -1,11 h13 q-2,-6 -2,-11z" fill="#2f6f9a" />
          <circle cx="286" cy="137" r="7" fill="#6d5238" />
          <path d="M280,144 q-2,8 -1,14 h14 q-2,-8 -2,-14z" fill="#3f9f7f" />
        </g>
        {/* 積んだ自転車と木箱と山羊。 */}
        <g stroke="#3a3a3e" strokeWidth="2" fill="none">
          <circle cx="308" cy="148" r="7" />
          <circle cx="326" cy="148" r="7" />
          <path d="M308,148 l7,-10 h9 l3,10" />
        </g>
        <g fill="#a07a4c">
          <rect x="334" y="140" width="20" height="18" />
          <rect x="336" y="130" width="16" height="10" />
        </g>
        <g fill="#efe5cd">
          <ellipse cx="204" cy="150" rx="9" ry="5.4" />
          <path d="M210,146 q6,-2 8,2 l-8,2z" />
        </g>
        {/* 船頭。艫に立って、もう一人と手招きしている。 */}
        <g transform="translate(360,0)">
          <circle cx="0" cy="128" r="7.4" fill="#6d5238" />
          <path d="M-7,135 q-3,13 -1,23 h16 q-3,-14 -3,-23z" fill="#efe5cd" />
          <path d="M-7,142 h16" stroke="#c94f3c" strokeWidth="3" fill="none" />
          <g className="egypt-fo-wave">
            <path
              d="M-6,140 q-14,-4 -20,-14"
              stroke="#6d5238"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>

      {/* 舷側すれすれの水面。上下して「もう余裕が無い」ことを示す。 */}
      <g
        className="egypt-fo-waterline"
        stroke="#8fd0dc"
        strokeWidth="3"
        fill="none"
        opacity="0.75"
      >
        <path d="M188,176 q22,-6 44,0 t44,0 t44,0 t44,0" />
      </g>

      <style>{`
        .egypt-fo-boat {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: egypt-fo-sink 3.4s ease-in-out infinite;
        }
        @keyframes egypt-fo-sink {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          45% { transform: translateY(4px) rotate(-1deg); }
        }
        .egypt-fo-waterline {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: egypt-fo-lap 3.4s ease-in-out infinite;
        }
        @keyframes egypt-fo-lap {
          0%, 100% { transform: translateY(0); opacity: 0.55; }
          45% { transform: translateY(-4px); opacity: 0.9; }
        }
        .egypt-fo-wave {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: egypt-fo-beckon 1.1s ease-in-out infinite;
        }
        @keyframes egypt-fo-beckon {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-24deg); }
        }
        .egypt-fo-queue {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: egypt-fo-shuffle 4.2s ease-in-out infinite;
        }
        @keyframes egypt-fo-shuffle {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .egypt-fo-boat,
          .egypt-fo-waterline,
          .egypt-fo-wave,
          .egypt-fo-queue { animation: none; }
        }
      `}</style>
    </svg>
  );
}
