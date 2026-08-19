/**
 * プナの霧が道を隠す。前触れもなく雲が高原を覆い、同じ三つの目印を
 * 二度通り過ぎたように思えたころ、ようやく霧が晴れたのは、
 * 思っていた道からずいぶん離れた場所だった。
 * プナをよく渡る地元の人は、こういう天気のときに急ごうとするのをやめている。
 *
 * 構図: 灰緑の高原。**同じ形の石塚(アパチェタ)が3つ、間隔をあけて並ぶ。**
 * 手前の轍はその3つを回り込んで輪になって戻ってきている——同じ所を二度通った跡。
 * 中央の旅人は小さく、どちらを向けばいいのか分からずに立っている。
 *
 * **アプはここにいる。**峰の霊なので**顔も人の形も描かない。**
 * 霧の上に、雲の切れ目から山の稜線だけが一瞬見える。それだけにしてある。
 * 目や口をつけたら、まったく別の存在になってしまう。
 *
 * 動くのは4つ: 横切る霧の帯、3つの石塚が位相をずらして霞に消えては現れる、
 * イチュ草の揺れ、旅人がゆっくり向きを変える。
 * 止めても「同じ石塚が3つと、輪になった轍」で伝わる。
 *
 * (イギリス盤の霧とは別物にする: あちらは港と汽笛の輪。こちらは陸の高原で、
 *  **同じ目印を二度通る**ことそのものを絵にしてある。)
 */
export function PeruNeblinaPuna() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 霧に沈んだ高原。 */}
      <rect width="400" height="210" fill="#a8ac9c" />
      <rect width="400" height="118" fill="#b8bcb0" />
      <rect width="400" height="52" fill="#c4c8bc" />

      {/* 雲の切れ目から、稜線だけが見える。**アプ。顔は描かない。** */}
      <path
        d="M96,74L142,34L176,62L216,26L262,66L300,40L330,72z"
        fill="#8f96a0"
        opacity="0.55"
      />
      <path
        d="M142,34l-12,14q8,4 12,-2q4,-3 9,2zM216,26l-14,16q9,4 13,-2q5,-4 10,2z"
        fill="#e8eef0"
        opacity="0.6"
      />
      <ellipse
        cx="200"
        cy="80"
        rx="210"
        ry="20"
        fill="#c4c8bc"
        opacity="0.75"
      />

      {/* 高原の地面。 */}
      <rect y="118" width="400" height="92" fill="#9aa08c" />
      <path d="M0,118q100,-8 200,0q100,8 200,-4v12H0z" fill="#a8ac96" />
      <rect y="150" width="400" height="60" fill="#a8a888" />

      {/* 輪になって戻ってきた轍。**同じ所を二度通った跡。** */}
      <g stroke="#7a7a62" strokeWidth="5" fill="none" opacity="0.85">
        <path d="M0,204q60,-22 128,-18q72,4 96,-14q22,-16 -6,-24q-30,-8 -50,10q-20,18 22,26q44,8 110,-10" />
      </g>
      <g stroke="#6f7058" strokeWidth="2.4" fill="none" opacity="0.6">
        <path d="M0,210q60,-22 128,-18q72,4 96,-14q22,-16 -6,-24q-30,-8 -50,10q-20,18 22,26q44,8 110,-10" />
      </g>

      {/* 同じ形の石塚が3つ。**同じ形にすることが要点。** */}
      <g className="peru-np-cairn1">
        <g fill="#6f6a60">
          <ellipse cx="52" cy="164" rx="17" ry="6" />
          <ellipse cx="52" cy="156" rx="13" ry="5" />
          <ellipse cx="52" cy="149" rx="9" ry="4" />
          <ellipse cx="52" cy="143" rx="5.4" ry="3" />
        </g>
        <path d="M52,140v-8" stroke="#7f7a72" strokeWidth="2.4" fill="none" />
      </g>
      <g className="peru-np-cairn2">
        <g fill="#6f6a60">
          <ellipse cx="200" cy="150" rx="15" ry="5.4" />
          <ellipse cx="200" cy="143" rx="11.4" ry="4.4" />
          <ellipse cx="200" cy="137" rx="8" ry="3.6" />
          <ellipse cx="200" cy="132" rx="4.8" ry="2.6" />
        </g>
        <path d="M200,129v-7" stroke="#7f7a72" strokeWidth="2.2" fill="none" />
      </g>
      <g className="peru-np-cairn3">
        <g fill="#6f6a60">
          <ellipse cx="344" cy="170" rx="18" ry="6.4" />
          <ellipse cx="344" cy="161" rx="13.6" ry="5.2" />
          <ellipse cx="344" cy="154" rx="9.6" ry="4.2" />
          <ellipse cx="344" cy="148" rx="5.8" ry="3.2" />
        </g>
        <path d="M344,145v-8" stroke="#7f7a72" strokeWidth="2.6" fill="none" />
      </g>

      {/* イチュ草。 */}
      <g
        className="peru-np-ichu"
        stroke="#b5a267"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      >
        <path d="M18,190l-6,-9M18,190v-11M18,190l6,-9M112,198l-6,-9M112,198v-11M112,198l6,-9M268,192l-6,-9M268,192v-11M268,192l6,-9M382,200l-6,-9M382,200v-11M382,200l6,-9" />
      </g>

      {/* 旅人。小さく、どちらへ行けばよいか分からずに立っている。 */}
      <g transform="translate(150,0)">
        <g className="peru-np-lost">
          <path d="M-8,196q0,-26 8,-26q8,0 8,26z" fill="#3f6a8a" />
          <path d="M-7,180h14" stroke="#c8102e" strokeWidth="3.4" fill="none" />
          <circle cx="0" cy="163" r="8.4" fill="#8a6a48" />
          <path d="M-9,161q9,-9 18,0q0,-7 -9,-7q-9,0 -9,7z" fill="#e8b21c" />
          <path
            d="M-6,198l-4,10M6,198l4,10"
            stroke="#3f3a34"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          {/* 荷 */}
          <rect x="-16" y="176" width="10" height="14" rx="2" fill="#c8102e" />
        </g>
      </g>

      {/* 横切る霧。**ここが主に動く。**薄く広く重ねる。 */}
      <g className="peru-np-fog1" fill="#dfe4dc" opacity="0.3">
        <ellipse cx="110" cy="126" rx="160" ry="8" />
        <ellipse cx="300" cy="184" rx="140" ry="7" />
      </g>
      <g className="peru-np-fog2" fill="#eef2ec" opacity="0.26">
        <ellipse cx="280" cy="114" rx="150" ry="7" />
        <ellipse cx="80" cy="196" rx="150" ry="7" />
      </g>

      <style>{`
        .peru-np-fog1 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: peru-np-roll 6.4s linear infinite;
        }
        .peru-np-fog2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: peru-np-roll 8.8s linear -3.4s infinite;
        }
        @keyframes peru-np-roll {
          0% { transform: translateX(-52px); opacity: 0.14; }
          50% { opacity: 0.6; }
          100% { transform: translateX(52px); opacity: 0.14; }
        }
        .peru-np-cairn1,
        .peru-np-cairn2,
        .peru-np-cairn3 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .peru-np-cairn1 { animation: peru-np-vanish 5.2s ease-in-out infinite; }
        .peru-np-cairn2 { animation: peru-np-vanish 5.2s ease-in-out -1.7s infinite; }
        .peru-np-cairn3 { animation: peru-np-vanish 5.2s ease-in-out -3.4s infinite; }
        @keyframes peru-np-vanish {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.22; }
        }
        .peru-np-ichu {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: peru-np-sway 3.6s ease-in-out infinite;
        }
        @keyframes peru-np-sway {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(6deg); }
        }
        .peru-np-lost {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: peru-np-turn 6s ease-in-out infinite;
        }
        @keyframes peru-np-turn {
          0%, 100% { transform: scaleX(1); }
          48% { transform: scaleX(0.82); }
          52% { transform: scaleX(-0.82); }
          96% { transform: scaleX(-1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .peru-np-fog1,
          .peru-np-fog2,
          .peru-np-cairn1,
          .peru-np-cairn2,
          .peru-np-cairn3,
          .peru-np-ichu,
          .peru-np-lost { animation: none; }
        }
      `}</style>
    </svg>
  );
}
