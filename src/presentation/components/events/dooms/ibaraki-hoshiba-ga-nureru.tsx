/**
 * 干し場が濡れる。薄切りは、そうするほかないので野天に出してあった。
 * 生ぬるく湿った一夜が、そのすべてを持っていった。
 *
 * 干し芋は全国の九割がこの土地で作られ、**からっ風で干す**。
 * だから屋内で作る方法がなく、一週間の悪天がその年になる。
 *
 * ## 描き直しでやったこと
 *
 * 人が7枚とも同じ赤いシャツの立ち姿だったので、ここは
 * **雨合羽を着て筵を掛けようとしている人**にした。両手で広げた筵が大きな面になるので、
 * 立ち姿でも他と重ならない。**半分しか掛かっていない**ことで手遅れも出る。
 * 簾は一台だけだったが、**奥へ三列**にして干し場の広さを出した。
 * 母屋・防風林・積んだ籠・一輪車を入れて、空と地面だけの帯をやめている。
 *
 * **動くものは1つだけ**——斜めに降る雨。何本かの筋をひとつの `<g>` にまとめてある。
 */
export function IbarakiHoshibaGaNureru() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 生ぬるく湿った夜。 */}
      <rect width="400" height="210" fill="#3d4450" />
      <g fill="#333a45">
        <ellipse cx="70" cy="20" rx="80" ry="26" />
        <ellipse cx="220" cy="12" rx="90" ry="26" />
        <ellipse cx="360" cy="22" rx="72" ry="24" />
      </g>
      <g fill="#454c58">
        <ellipse cx="120" cy="46" rx="100" ry="9" />
        <ellipse cx="300" cy="44" rx="96" ry="9" />
      </g>

      {/* 防風林と母屋。干し場は屋敷のすぐ裏にある。 */}
      <rect y="70" width="400" height="6" fill="#2b3328" />
      <g fill="#35402f">
        <ellipse cx="40" cy="68" rx="24" ry="9" />
        <ellipse cx="96" cy="66" rx="20" ry="8" />
        <ellipse cx="376" cy="68" rx="22" ry="9" />
      </g>
      <g stroke="#1f1c18" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M244,74 L296,46 L348,74z" fill="#4a4038" />
        <rect x="250" y="72" width="92" height="30" fill="#6b5a44" />
        <rect x="248" y="70" width="96" height="5" fill="#7d6a50" />
        <rect x="262" y="80" width="22" height="22" fill="#2b2620" />
        <rect x="300" y="82" width="28" height="14" fill="#8a7a58" />
      </g>

      {/* 干し場の地面。踏み固めてある。 */}
      <rect y="76" width="400" height="134" fill="#4a4a3e" />
      <rect y="76" width="400" height="4" fill="#5a5a4a" />
      <g stroke="#41412f" strokeWidth="3" fill="none">
        <path d="M0,120 L400,112" />
        <path d="M0,178 L400,162" />
      </g>

      {/* 奥の簾。小さくして列に見せる。 */}
      <g stroke="#241f18" strokeWidth="2" strokeLinejoin="round">
        <rect x="30" y="86" width="96" height="6" rx="2" fill="#6b5a3c" />
        <rect x="34" y="92" width="5" height="16" fill="#5a4a30" />
        <rect x="118" y="92" width="5" height="16" fill="#5a4a30" />
        <g fill="#8a5f2c">
          <rect x="36" y="78" width="16" height="9" rx="3" />
          <rect x="56" y="78" width="16" height="9" rx="3" />
          <rect x="76" y="78" width="16" height="9" rx="3" />
          <rect x="96" y="78" width="16" height="9" rx="3" />
        </g>
      </g>

      {/* 中ほどの簾。 */}
      <g stroke="#241f18" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="228" y="108" width="140" height="9" rx="2" fill="#6b5a3c" />
        <rect x="234" y="117" width="7" height="26" fill="#5a4a30" />
        <rect x="354" y="117" width="7" height="26" fill="#5a4a30" />
        <g stroke="#241f18" strokeWidth="2">
          <rect x="234" y="96" width="22" height="13" rx="4" fill="#96682f" />
          <rect x="260" y="96" width="22" height="13" rx="4" fill="#a8763c" />
          <rect x="286" y="96" width="22" height="13" rx="4" fill="#8a5f2c" />
          <rect x="312" y="96" width="22" height="13" rx="4" fill="#96682f" />
          <rect x="338" y="96" width="22" height="13" rx="4" fill="#a8763c" />
        </g>
      </g>

      {/* 手前の簾。濡れて色が沈み、艶が出ている。 */}
      <g stroke="#241f18" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="24" y="146" width="176" height="11" rx="2" fill="#6b5a3c" />
        <rect x="32" y="157" width="9" height="34" fill="#5a4a30" />
        <rect x="184" y="157" width="9" height="34" fill="#5a4a30" />
        <g stroke="#241f18" strokeWidth="2">
          <rect x="32" y="130" width="28" height="17" rx="5" fill="#7d5426" />
          <rect x="64" y="130" width="28" height="17" rx="5" fill="#8a5f2c" />
          <rect x="96" y="130" width="28" height="17" rx="5" fill="#7d5426" />
          <rect x="128" y="130" width="28" height="17" rx="5" fill="#96682f" />
          <rect x="160" y="130" width="28" height="17" rx="5" fill="#8a5f2c" />
        </g>
        {/* 濡れた艶。乾いていない印。 */}
        <g fill="#c8b48a" opacity="0.35" stroke="none">
          <ellipse cx="44" cy="134" rx="9" ry="2.5" />
          <ellipse cx="108" cy="134" rx="9" ry="2.5" />
          <ellipse cx="172" cy="134" rx="9" ry="2.5" />
        </g>
      </g>

      {/* 積んである籠と一輪車。まだ広げていない分。 */}
      <g stroke="#241f18" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M300,164 L346,164 L342,182 L304,182z" fill="#a8875a" />
        <path d="M304,150 L342,150 L339,164 L307,164z" fill="#96784c" />
        <circle cx="366" cy="186" r="12" fill="none" stroke="#3a352c" strokeWidth="3.5" />
        <path d="M354,178 L390,170" stroke="#5c5646" strokeWidth="4" fill="none" />
      </g>

      {/* 雨合羽を着て、筵を掛けようとしている人。**両手で広げた面**が大きいので、
          立ち姿でも他の6枚と重ならない。半分しか掛かっていないことで手遅れを出す。 */}
      <g strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="220" cy="196" rx="32" ry="6" fill="#403f34" />
        <path d="M214,170 L210,196" stroke="#2b3546" strokeWidth="10" fill="none" />
        <path d="M226,170 L232,194" stroke="#38445c" strokeWidth="10" fill="none" />
        {/* 合羽。裾を広げた釣鐘形にすると雨具に見える。 */}
        <path d="M198,176 L206,124 L236,124 L246,176z" fill="#6f7a4a" stroke="#2e3320" strokeWidth="2.5" />
        <path d="M200,166 L244,166" stroke="#5a6339" strokeWidth="3" fill="none" />
        {/* 頭巾を先に、顔をあとに描く。**逆にしたら顔が塗り潰されて緑の塊になった。** */}
        <circle cx="224" cy="110" r="16" fill="#6f7a4a" stroke="#2e3320" strokeWidth="2.5" />
        <circle cx="215" cy="114" r="10" fill="#d9a273" stroke="#3a3228" strokeWidth="2" />
        <path d="M205,114 a10,10 0 0 1 20,0 l4,-7 a16,16 0 0 0 -27,3z" fill="#6f7a4a" />
        {/* 持ち上げた筵。半分だけ簾に掛かっている。下辺を垂らすと莚に見える。 */}
        <path d="M156,118 L206,110 L212,138 q-14,8 -28,4 q-14,-4 -28,4z" fill="#8a8258" stroke="#2e2a1c" strokeWidth="2.5" />
        <g stroke="#6f6a44" strokeWidth="2" fill="none">
          <path d="M158,126 L208,118" />
          <path d="M160,136 L210,128" />
        </g>
        {/* 両手とも筵に掛ける。片手だけだと合羽から腕が飛び出して見えた。
            **顔に近づけないこと。**同じ肌色なので、触れると顔と腕が一塊になる。 */}
        <path d="M218,134 L206,130" stroke="#d9a273" strokeWidth="8" fill="none" />
        <path d="M230,146 L212,146" stroke="#d9a273" strokeWidth="8" fill="none" />
      </g>

      {/* 斜めに降る雨。**ここだけが動く。** */}
      <g className="ihgn-rain" stroke="#a8c4d8" strokeWidth="2.5" strokeLinecap="round" opacity="0.75">
        <path d="M40,0 L28,30" />
        <path d="M96,10 L84,40" />
        <path d="M150,0 L138,30" />
        <path d="M206,14 L194,44" />
        <path d="M262,2 L250,32" />
        <path d="M318,12 L306,42" />
        <path d="M372,0 L360,30" />
        <path d="M68,44 L56,74" />
        <path d="M178,48 L166,78" />
        <path d="M290,46 L278,76" />
        <path d="M392,42 L380,72" />
      </g>

      <style>{`
        .ihgn-rain {
          animation: ihgn-fall 1.1s linear infinite;
        }
        @keyframes ihgn-fall {
          0%   { transform: translate(0, 0); opacity: 0; }
          15%  { opacity: 0.75; }
          85%  { opacity: 0.75; }
          100% { transform: translate(-56px, 140px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ihgn-rain { animation: none; }
        }
      `}</style>
    </svg>
  );
}
