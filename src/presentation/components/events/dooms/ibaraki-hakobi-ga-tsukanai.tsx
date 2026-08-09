/**
 * 運び手がつかまらない。ここのものはすべて道路で出ていく。
 * その道路が今日は止まっている。県じゅうの荷を東京へ運ぶ幹線は二、三本しかない。
 *
 * ## 描き直しでやったこと
 *
 * 人が7枚とも同じ赤いシャツの立ち姿だったので、ここは
 * **荷の上に腰を下ろして伝票を持ったまま待っている人**にした。
 * **座っているのはこの1枚だけ**なので、他と重ならない。待つしかない状況も出る。
 * 倉庫の壁一枚しか無かった背景に、道路・門型の標識・電柱の列・パレットを入れた。
 *
 * **動くものは1つだけ**——道路に掛かる標識の赤い×が点滅する。
 * **これが原因で、荷が出せないのが結果**という並びにしてある。
 * 事故そのものは描かない(`docs/50-authoring/04-doom-animation-guide.md`)。
 * 点滅は「見えている状態」を既定にしてあるので、動きを止めても×は残る。
 */
export function IbarakiHakobiGaTsukanai() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 明け方。荷は夜のうちに積んであり、朝いちばんに出るはずだった。 */}
      <rect width="400" height="210" fill="#2f3548" />
      <rect y="34" width="400" height="24" fill="#403d5c" />
      <rect y="58" width="400" height="20" fill="#6b4f66" />
      <rect y="78" width="400" height="16" fill="#a86a52" />

      {/* 遠景の林と電柱の列。 */}
      <rect y="92" width="400" height="6" fill="#2b3328" />
      <g fill="#35402f">
        <ellipse cx="236" cy="91" rx="20" ry="6" />
        <ellipse cx="312" cy="90" rx="17" ry="6" />
        <ellipse cx="384" cy="91" rx="18" ry="6" />
      </g>
      <g stroke="#5c5646" strokeWidth="2.5" strokeLinecap="round">
        <path d="M356,96 L356,64" />
        <path d="M348,70 L364,70" />
        <path d="M310,96 L310,74" />
        <path d="M304,78 L316,78" />
      </g>

      {/* 積み込み場の床。**道路より先に描く。**あとに描いたら、
          道路の手前半分を塗り潰して、白線だけが床に浮いて見えた。 */}
      <path d="M0,152 L240,152 L200,210 L0,210z" fill="#585862" />
      <path d="M0,152 L240,152 L238,156 L0,156z" fill="#6a6a74" />
      <rect x="10" y="176" width="140" height="4" fill="#8a8570" opacity="0.7" />

      {/* 幹線道路。奥へ収束させて、ここから東京へ出ていく道だと示す。
          **床とはっきり明度を離す。**近い灰色どうしだと境目が見えず、
          白線が床の上に浮いているようにしか見えなかった。 */}
      <path d="M232,98 L400,98 L400,210 L200,210z" fill="#33363f" />
      <path d="M232,98 L400,98 L400,102 L236,102z" fill="#43464f" />
      {/* 縁石。床と道の境をはっきりさせる。 */}
      <path d="M240,152 L200,210 L216,210 L252,152z" fill="#7d7d88" />
      <path d="M252,152 L216,210 L221,210 L256,152z" fill="#c9c4b4" opacity="0.5" />
      <g fill="#c9c4b4">
        <rect x="292" y="106" width="18" height="4" />
        <rect x="298" y="124" width="26" height="5" />
        <rect x="308" y="150" width="36" height="7" />
        <rect x="322" y="186" width="48" height="9" />
      </g>

      {/* 道路に掛かる門型の標識。 */}
      <g stroke="#1c2029" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="238" y="52" width="8" height="48" fill="#7d7a72" />
        <rect x="384" y="52" width="8" height="48" fill="#7d7a72" />
        <rect x="234" y="44" width="162" height="10" fill="#8a877e" />
        <rect x="284" y="54" width="64" height="34" rx="3" fill="#24282f" />
      </g>

      {/* 倉庫。積み込み口が二つ、どちらも車が来ない。 */}
      <rect x="0" y="50" width="222" height="102" fill="#5a5a64" />
      <rect x="0" y="46" width="222" height="8" fill="#6b6b76" />
      <rect x="0" y="140" width="222" height="12" fill="#43434c" />
      <g stroke="#33333c" strokeWidth="2">
        <rect x="18" y="70" width="80" height="70" fill="#242832" stroke="none" />
        <path d="M18,82 L98,82" />
        <path d="M18,96 L98,96" />
        <path d="M18,110 L98,110" />
        <path d="M18,124 L98,124" />
      </g>
      <g stroke="#33333c" strokeWidth="2">
        <rect x="118" y="74" width="72" height="66" fill="#4a4a54" stroke="none" />
        <path d="M118,86 L190,86" />
        <path d="M118,100 L190,100" />
        <path d="M118,114 L190,114" />
        <path d="M118,128 L190,128" />
      </g>
      {/* 消えたままの庫内灯。 */}
      <circle cx="58" cy="62" r="6" fill="#4c4f56" stroke="#33333c" strokeWidth="2" />

      {/* 出せないままの荷。れんこんの箱を積み上げてある。 */}
      <g stroke="#241f18" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="24" y="146" width="54" height="30" rx="2" fill="#a8875a" />
        <rect x="24" y="158" width="54" height="6" fill="#8a6a44" />
        <rect x="30" y="116" width="46" height="30" rx="2" fill="#96784c" />
        <rect x="30" y="128" width="46" height="6" fill="#7a5f3a" />
        <rect x="88" y="152" width="50" height="26" rx="2" fill="#96784c" />
        <rect x="88" y="162" width="50" height="5" fill="#7a5f3a" />
      </g>
      <g fill="#e8dcc0" stroke="#241f18" strokeWidth="2">
        <circle cx="42" cy="114" r="8" />
        <circle cx="60" cy="112" r="8" />
      </g>
      {/* 空のパレット。積む先がもう無い。 */}
      <g stroke="#241f18" strokeWidth="2" strokeLinejoin="round">
        <path d="M150,190 L214,184 L216,194 L152,200z" fill="#7a5f3a" />
        <path d="M154,194 L212,188" stroke="#5f4a2c" />
      </g>

      {/* 荷の上に腰を下ろし、伝票を持ったまま待っている人。**座るのはこの1枚だけ。** */}
      <g strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="252" cy="196" rx="34" ry="6" fill="#3f3f46" />
        <g stroke="#241f18" strokeWidth="2.5">
          <rect x="238" y="160" width="56" height="34" rx="2" fill="#8a6f42" />
          <path d="M238,172 L294,172" stroke="#6b5432" />
        </g>
        <path d="M244,166 L228,178 L232,192" stroke="#3d3a42" strokeWidth="11" fill="none" />
        <path d="M250,164 L234,176 L238,192" stroke="#4a4650" strokeWidth="11" fill="none" />
        <path d="M262,162 L258,130" stroke="#4a6b8a" strokeWidth="24" fill="none" />
        {/* 前掛け。暗い背中に明るい面を一つ入れて、輪郭を拾えるようにする。 */}
        <path d="M249,140 L274,142 L272,166 L247,164z" fill="#c2b48a" stroke="#3a3228" strokeWidth="2" />
        <circle cx="255" cy="118" r="11" fill="#d9a273" stroke="#3a3228" strokeWidth="2" />
        <path d="M244,117 a11,11 0 0 1 22,0z" fill="#3f4a5c" />
        <path d="M241,116 L268,114 L268,119 L241,120z" fill="#3f4a5c" />
        {/* 伝票。行き先が決まらないまま束のまま。手を最後に重ねて、持たせる。 */}
        <g stroke="#241f18" strokeWidth="2" strokeLinejoin="round">
          <path d="M218,150 L244,146 L247,164 L221,168z" fill="#e0dcd0" />
          <path d="M223,154 L241,151 M224,160 L242,157" stroke="#a8a596" />
        </g>
        <path d="M252,136 L242,150 L234,156" stroke="#4a6b8a" strokeWidth="9" fill="none" />
        <circle cx="232" cy="158" r="5.5" fill="#d9a273" />
      </g>

      {/* 通行止めの×。**ここだけが動く。**止めても見えている状態を既定にする。 */}
      <g className="ihkt-cross" stroke="#e05252" strokeWidth="7" strokeLinecap="round">
        <path d="M300,62 L332,80" />
        <path d="M332,62 L300,80" />
      </g>

      <style>{`
        .ihkt-cross {
          animation: ihkt-blink 1.6s steps(1, end) infinite;
        }
        @keyframes ihkt-blink {
          0%, 55%   { opacity: 1; }
          56%, 100% { opacity: 0.28; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ihkt-cross { animation: none; }
        }
      `}</style>
    </svg>
  );
}
