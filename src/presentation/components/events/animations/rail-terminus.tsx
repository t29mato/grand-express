/**
 * 国境の貨物ヤードで、列車が折り返す前の積み込みを手伝う。
 *
 * **動くものは1つだけ**——人足が持ち上げた木箱が、貨車の戸口へ上がってゆく。
 *
 * この話の芯は「**線路がここで終わっている**」こと。ボリビアの鉄道は東西の網が
 * 今も繋がっていない。そのため車止めを画面の右端に、レールが途切れる位置まで
 * はっきり描いてある(静物)。
 */
export function RailTerminus() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* チャコの夕方。増える話なので空は明るいまま暖色に寄せる。 */}
      <rect width="400" height="210" fill="#e8b06a" />
      <rect y="52" width="400" height="46" fill="#d99a55" />
      <circle cx="66" cy="52" r="24" fill="#f5d08a" />
      {/* 乾いた森の輪郭。静物。 */}
      <path d="M0,98 L26,74 L52,98z" fill="#7a6a44" />
      <path d="M40,98 L72,68 L104,98z" fill="#6b5c3c" />
      <path d="M96,98 L120,78 L144,98z" fill="#7a6a44" />
      <rect y="98" width="400" height="112" fill="#c9a877" />
      <rect y="98" width="400" height="4" fill="#d8b98c" />

      {/* 線路。**右端で途切れて終わる。**
          枕木を先に敷き、その上にレールを2本。順を逆にすると枕木がレールの上に
          出てしまい、線路ではなく柵に見える(最初にそうなった)。 */}
      <g fill="#8a6a44">
        <rect x="8" y="172" width="12" height="26" />
        <rect x="56" y="172" width="12" height="26" />
        <rect x="104" y="172" width="12" height="26" />
        <rect x="152" y="172" width="12" height="26" />
        <rect x="200" y="172" width="12" height="26" />
        <rect x="248" y="172" width="12" height="26" />
        <rect x="296" y="172" width="12" height="26" />
      </g>
      <rect y="172" width="344" height="6" fill="#9c9088" />
      <rect y="192" width="344" height="6" fill="#9c9088" />
      {/* 車止め。ここから先に線路は無い。 */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="344" y="158" width="20" height="44" fill="#8a3f38" />
        <rect x="336" y="158" width="40" height="14" rx="3" fill="#c2443a" />
        <path d="M364,202 L392,202 L392,186 L364,174z" fill="#6b5a44" />
      </g>

      {/* 貨車。戸口を開けて待っている。 */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="176" y="80" width="150" height="76" rx="5" fill="#5c6b4a" />
        <rect x="176" y="74" width="150" height="10" rx="3" fill="#4a5740" />
        <rect x="232" y="94" width="58" height="62" fill="#2f3329" />
        <rect x="176" y="94" width="52" height="30" rx="3" fill="#6b7a56" />
        <rect x="294" y="94" width="30" height="30" rx="3" fill="#6b7a56" />
        <circle cx="204" cy="164" r="12" fill="#3d3a42" />
        <circle cx="300" cy="164" r="12" fill="#3d3a42" />
        <circle cx="204" cy="164" r="4.5" fill="#6b6870" />
        <circle cx="300" cy="164" r="4.5" fill="#6b6870" />
      </g>

      {/* 積み終えた木箱。静物。 */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="240" y="120" width="34" height="30" rx="2" fill="#b98a52" />
        <rect x="240" y="132" width="34" height="5" fill="#8a6a44" />
        <rect x="58" y="166" width="36" height="30" rx="2" fill="#b98a52" />
        <rect x="58" y="178" width="36" height="5" fill="#8a6a44" />
      </g>

      {/* 人足。箱を持ち上げている。**動かさない。** */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cx="140" cy="200" rx="30" ry="6" fill="#a8864f" stroke="none" />
        <rect x="128" y="162" width="13" height="38" rx="6" fill="#3b4a63" />
        <rect x="145" y="162" width="13" height="38" rx="6" fill="#3b4a63" />
        <rect x="122" y="108" width="44" height="60" rx="12" fill="#e8443f" />
        <circle cx="144" cy="92" r="16" fill="#c98a5e" />
        <path d="M128,90 a16,16 0 0 1 32,0z" fill="#241c1a" />
        {/* 箱を抱える両腕。胸の高さで支える。 */}
        <g transform="translate(126,120) rotate(-24)">
          <rect x="0" y="-7" width="38" height="14" rx="7" fill="#c98a5e" />
        </g>
        <g transform="translate(164,120) rotate(-156)">
          <rect x="0" y="-7" width="38" height="14" rx="7" fill="#c98a5e" />
        </g>
      </g>

      {/* 持ち上げている木箱。**ここだけが動く。** */}
      <g className="rlts-crate">
        <rect x="122" y="122" width="46" height="36" rx="2" fill="#c9a877" stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="122" y="136" width="46" height="6" fill="#8a6a44" />
      </g>

      <style>{`
        .rlts-crate {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: rlts-lift 2.8s ease-in-out infinite;
        }
        @keyframes rlts-lift {
          0%   { transform: translateY(16px); }
          45%  { transform: translateY(-10px); }
          60%  { transform: translateY(-10px); }
          100% { transform: translateY(16px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rlts-crate { animation: none; }
        }
      `}</style>
    </svg>
  );
}
