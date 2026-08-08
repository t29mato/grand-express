/**
 * チャランゴの弦を張る。祭りを前にした工房で、張り終えた一本を弾いて音を見ている。
 *
 * **動くものは1つだけ**——いま弾いた弦が震える。
 * 弦は「レンズ形(中ほどが太い)」で描き、縦に潰したり広げたりして、
 * 止まった弦と震えている弦のあいだを行き来させている。
 * レンズの高さは片側3.5pxに抑えてある。広げすぎると弦の震えではなく
 * 白い塊に見え、隣の弦にもかぶる(最初に描いたとき実際にそうなった)。
 *
 * **職人は動かさない。**動くものを2つ入れると、どちらを見ればよいか分からなくなる。
 * 弾いた手を弦の手前に重ねてあるので、誰が鳴らしたのかは止まっていても分かる。
 *
 * 楽器と人の大きさは**寄りの構図**で釣り合わせている。引いて全身を入れると、
 * 弦の震えが見える大きさに描いた楽器が人より大きくなってしまう(一度そうなった)。
 *
 * 棚の甲羅、削りかけの胴、床の木くずが工房を作る。甲羅は**静物**。
 * この楽器の胴がかつて何で作られていたかを、動かさずに伝えるため。
 */
export function CharangoStrings() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 工房の壁と床。増える話なので、灯りの入った暖かい色にする。 */}
      <rect width="400" height="210" fill="#5a4030" />
      <rect y="150" width="400" height="60" fill="#8a6a45" />
      <rect y="150" width="400" height="4" fill="#a8865a" />

      {/* 壁の棚。仕上がった胴と、まだ何も張っていないアルマジロの甲羅。 */}
      <rect y="34" width="168" height="9" fill="#8a5c38" />
      <rect y="43" width="168" height="4" fill="#6b4630" />
      <g stroke="#2a2028" strokeWidth="2" strokeLinejoin="round">
        <ellipse cx="34" cy="20" rx="19" ry="14" fill="#e8c98a" />
        <path d="M88,34 a23,17 0 0 1 46,0z" fill="#6b4a2f" />
      </g>
      <g fill="none" stroke="#4a3220" strokeWidth="2">
        <path d="M91,34 a20,15 0 0 1 40,0" />
        <path d="M97,34 a14,12 0 0 1 28,0" />
        <path d="M104,34 a7,8 0 0 1 14,0" />
      </g>
      {/* 釘に掛けた替え弦の束 */}
      <g fill="none" stroke="#e8c98a" strokeWidth="2.5">
        <circle cx="348" cy="34" r="13" />
        <circle cx="348" cy="34" r="7" />
        <circle cx="380" cy="38" r="9" />
        <circle cx="380" cy="38" r="5" />
      </g>
      <g fill="#4a3220">
        <circle cx="348" cy="19" r="3" />
        <circle cx="380" cy="27" r="3" />
      </g>

      {/* 職人。腰掛けて楽器を抱えている。**動かさない。** */}
      <ellipse cx="204" cy="206" rx="44" ry="6" fill="#6b5033" />
      <rect x="232" y="178" width="9" height="26" fill="#6b4630" />
      <rect x="168" y="174" width="78" height="8" rx="3" fill="#8a5c38" />
      <rect x="186" y="162" width="14" height="44" rx="7" fill="#2f3b4f" />
      <rect x="208" y="162" width="14" height="44" rx="7" fill="#2f3b4f" />
      <rect x="166" y="84" width="76" height="86" rx="16" fill="#3b4a63" />
      <rect x="174" y="112" width="60" height="58" rx="7" fill="#c9a877" />
      <circle cx="204" cy="64" r="19" fill="#d9a273" />
      <path d="M185,62 a19,19 0 0 1 38,0z" fill="#241c1a" />

      {/* チャランゴ。棹を左、胴を右へ抱えている。 */}
      <g stroke="#2a2028" strokeWidth="3" strokeLinejoin="round">
        <rect x="132" y="138" width="112" height="30" rx="5" fill="#6b4a2f" />
        <rect x="136" y="142" width="104" height="24" fill="#4a3220" />
        <path d="M134,134 L102,130 L96,142 L96,164 L102,176 L134,172z" fill="#6b4a2f" />
        <ellipse cx="286" cy="153" rx="44" ry="36" fill="#e8c98a" />
        <circle cx="286" cy="153" r="11" fill="#4a3220" />
        <circle cx="286" cy="153" r="15" fill="none" stroke="#f5b31c" strokeWidth="2.5" />
        <rect x="312" y="144" width="8" height="18" rx="2" fill="#6b4a2f" />
      </g>
      <g stroke="#a8865a" strokeWidth="2">
        <line x1="160" y1="143" x2="160" y2="165" />
        <line x1="184" y1="143" x2="184" y2="165" />
        <line x1="208" y1="143" x2="208" y2="165" />
        <line x1="232" y1="143" x2="232" y2="165" />
      </g>
      <g fill="#f5b31c" stroke="#2a2028" strokeWidth="2">
        <circle cx="110" cy="139" r="4.5" />
        <circle cx="125" cy="136" r="4.5" />
        <circle cx="110" cy="166" r="4.5" />
        <circle cx="125" cy="169" r="4.5" />
      </g>

      {/* 張り終えた弦。止まっている3本。 */}
      <g stroke="#f6efe2" strokeWidth="2" strokeLinecap="round">
        <line x1="110" y1="151" x2="316" y2="151" />
        <line x1="110" y1="157" x2="316" y2="157" />
        <line x1="110" y1="163" x2="316" y2="163" />
      </g>

      {/* いま弾いた一本。**ここだけが動く。** */}
      <path
        className="chrg-string"
        d="M110,145 Q213,141.5 316,145 Q213,148.5 110,145z"
        fill="#f6efe2"
      />

      {/* 腕と手。弦より手前に描く。誰が鳴らしたのかが止まっていても分かるように。
          肩の位置から回して伸ばす(浮いた棒に見えないように)。 */}
      <g fill="#d9a273" stroke="#2a2028" strokeWidth="2" strokeLinejoin="round">
        <g transform="translate(176,104) rotate(100)">
          <rect x="0" y="-7" width="48" height="14" rx="7" />
        </g>
        <g transform="translate(238,104) rotate(37)">
          <rect x="0" y="-7" width="74" height="14" rx="7" />
        </g>
        <circle cx="168" cy="151" r="9" />
        <circle cx="298" cy="149" r="9" />
      </g>

      {/* 床の木くず。静物。 */}
      <g fill="#e8c98a" stroke="#a8865a" strokeWidth="1.5">
        <path d="M46,196 q9,-9 18,0 q-9,6 -18,0z" />
        <path d="M78,188 q7,-7 14,0 q-7,5 -14,0z" />
        <path d="M344,198 q10,-9 20,0 q-10,6 -20,0z" />
      </g>

      <style>{`
        .chrg-string {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: chrg-vibrate 0.22s ease-in-out infinite alternate;
        }
        @keyframes chrg-vibrate {
          from { transform: scaleY(0.3); }
          to   { transform: scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .chrg-string { animation: none; }
        }
      `}</style>
    </svg>
  );
}
