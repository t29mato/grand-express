/**
 * 海峡に霧が下りる。狭い海峡で暖かい水と冷たい水がぶつかると、
 * 数分で視界が数メートルまで落ちる。フェリーはその場に錨を下ろす。
 * **海底トンネルを行く列車だけは、渡らずに潜っているぶん動き続ける。**
 *
 * 夜明け前。**上が海面、下が海底の断面**。人は出さない。
 * 動くのは、流れる霧・トンネルを走る列車・船の灯。
 */
export function KyushuKanmonKiri() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜明け前の空。 */}
      <rect width="400" height="210" fill="#26303c" />
      <rect y="0" width="400" height="52" fill="#33404f" />
      <rect y="40" width="400" height="20" fill="#455566" />
      <g fill="#8fa4b4" opacity="0.35">
        <circle cx="60" cy="14" r="1.6" />
        <circle cx="132" cy="8" r="1.3" />
        <circle cx="300" cy="12" r="1.5" />
        <circle cx="356" cy="22" r="1.2" />
      </g>

      {/* 両岸の岬(海峡はいちばん狭い所で700m足らず)。 */}
      <path d="M0,62q30,-24 68,-18q34,6 50,18z" fill="#2c3a34" />
      <path d="M282,62q32,-22 68,-16q32,6 50,16z" fill="#2c3a34" />
      <g fill="#f5b31c" opacity="0.75">
        <rect x="30" y="46" width="4" height="5" />
        <rect x="52" y="50" width="4" height="4" />
        <rect x="330" y="48" width="4" height="5" />
        <rect x="356" y="52" width="4" height="4" />
      </g>

      {/* 海面。 */}
      <rect y="60" width="400" height="16" fill="#243a48" />
      <rect y="72" width="400" height="16" fill="#2b4658" />
      <rect y="84" width="400" height="14" fill="#325266" />
      <g stroke="#5f8fa8" strokeWidth="2" opacity="0.45" fill="none">
        <path d="M20,68h56M270,66h84M14,82h48M300,84h80M70,94h60M290,94h84" />
      </g>

      {/* 錨を下ろしたフェリー。動かない。 */}
      <g>
        <path d="M112,90q40,16 96,0l-8,-12h-80z" fill="#4a5158" />
        <rect x="122" y="60" width="72" height="18" fill="#e2ddd0" />
        <g fill="#3f5566">
          <rect x="128" y="65" width="9" height="7" />
          <rect x="142" y="65" width="9" height="7" />
          <rect x="156" y="65" width="9" height="7" />
          <rect x="170" y="65" width="9" height="7" />
        </g>
        <rect x="140" y="48" width="30" height="12" fill="#f2ede0" />
        <rect x="152" y="34" width="4" height="14" fill="#8a939c" />
        <path d="M116,80h88v4h-88z" fill="#8a3a34" />
        {/* 錨の鎖。 */}
        <path
          d="M118,84L104,116"
          stroke="#6f7680"
          strokeWidth="2"
          fill="none"
        />
        <path d="M100,116h10v4h-10z" fill="#6f7680" />
        <path
          d="M105,120v10M99,126h12M105,130q-6,-1 -7,-6M105,130q6,-1 7,-6"
          stroke="#6f7680"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      {/* 船の灯。明滅する。 */}
      <circle className="kkk-lamp" cx="154" cy="31" r="4.4" fill="#e8443f" />

      {/* 小舟も止まっている。 */}
      <g>
        <path d="M300,94q18,8 44,0l-4,-6h-36z" fill="#5a4630" />
        <rect x="314" y="80" width="14" height="8" fill="#4a7f9a" />
        <rect x="320" y="68" width="2.4" height="12" fill="#6b5330" />
        <circle className="kkk-lamp2" cx="321" cy="66" r="3" fill="#f5b31c" />
      </g>

      {/* 海底。地層と、その中を貫くトンネル。 */}
      <rect y="98" width="400" height="112" fill="#3a3a34" />
      <path d="M0,98q60,14 120,8t130,10q70,-6 150,4v10H0z" fill="#4a4840" />
      <rect y="120" width="400" height="90" fill="#332f2a" />
      <g stroke="#443f38" strokeWidth="2" opacity="0.8" fill="none">
        <path d="M0,138h400M0,168h400M0,196h400" />
      </g>

      {/* 海底トンネル。**ここだけが動いている。** */}
      <rect x="0" y="142" width="400" height="34" fill="#4f4a42" />
      <rect x="0" y="142" width="400" height="4" fill="#6b6458" />
      <rect x="0" y="172" width="400" height="4" fill="#6b6458" />
      <rect x="0" y="146" width="400" height="26" fill="#1e1c19" />
      <g fill="#f5b31c" opacity="0.6">
        <circle cx="40" cy="151" r="2" />
        <circle cx="120" cy="151" r="2" />
        <circle cx="200" cy="151" r="2" />
        <circle cx="280" cy="151" r="2" />
        <circle cx="360" cy="151" r="2" />
      </g>
      <g stroke="#5f584c" strokeWidth="2" fill="none">
        <path d="M0,170h400" />
      </g>
      {/* 走る列車。 */}
      <g className="kkk-train">
        <rect x="0" y="152" width="52" height="17" rx="4" fill="#e2ddd0" />
        <rect x="56" y="152" width="46" height="17" rx="4" fill="#e2ddd0" />
        <rect x="106" y="152" width="46" height="17" rx="4" fill="#e2ddd0" />
        <g fill="#c2453c">
          <rect x="0" y="163" width="52" height="4" />
          <rect x="56" y="163" width="46" height="4" />
          <rect x="106" y="163" width="46" height="4" />
        </g>
        <g fill="#3f5566">
          <rect x="8" y="155" width="12" height="6" />
          <rect x="26" y="155" width="12" height="6" />
          <rect x="62" y="155" width="12" height="6" />
          <rect x="80" y="155" width="12" height="6" />
          <rect x="112" y="155" width="12" height="6" />
          <rect x="130" y="155" width="12" height="6" />
        </g>
        <circle cx="4" cy="158" r="2.6" fill="#f8e2a0" />
      </g>

      {/* 霧。**海面の上を左右に流れる。** */}
      <g className="kkk-fog-a" fill="#c8d2d8" opacity="0.75">
        <ellipse cx="60" cy="70" rx="90" ry="15" />
        <ellipse cx="220" cy="64" rx="110" ry="13" />
        <ellipse cx="360" cy="74" rx="80" ry="14" />
      </g>
      <g className="kkk-fog-b" fill="#dde4e8" opacity="0.68">
        <ellipse cx="120" cy="86" rx="120" ry="14" />
        <ellipse cx="320" cy="92" rx="100" ry="12" />
      </g>
      <g className="kkk-fog-c" fill="#b8c4cc" opacity="0.6">
        <ellipse cx="180" cy="52" rx="130" ry="12" />
        <ellipse cx="40" cy="46" rx="70" ry="9" />
      </g>

      <style>{`
        .kkk-fog-a, .kkk-fog-b, .kkk-fog-c {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .kkk-fog-a { animation: kkk-drift-r 13s ease-in-out infinite; }
        .kkk-fog-b { animation: kkk-drift-l 17s ease-in-out infinite; }
        .kkk-fog-c { animation: kkk-drift-r 21s ease-in-out infinite; }
        @keyframes kkk-drift-r {
          0%, 100% { transform: translateX(-26px); }
          50%      { transform: translateX(26px); }
        }
        @keyframes kkk-drift-l {
          0%, 100% { transform: translateX(24px); }
          50%      { transform: translateX(-24px); }
        }
        .kkk-train {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: kkk-run 5.5s linear infinite;
        }
        @keyframes kkk-run {
          0%   { transform: translateX(-170px); }
          100% { transform: translateX(410px); }
        }
        .kkk-lamp  { animation: kkk-blink 1.8s steps(1, end) infinite; }
        .kkk-lamp2 { animation: kkk-blink 1.8s steps(1, end) 0.9s infinite; }
        @keyframes kkk-blink {
          0%, 55%   { opacity: 1; }
          56%, 100% { opacity: 0.2; }
        }
        @media (prefers-reduced-motion: reduce) {
          .kkk-fog-a, .kkk-fog-b, .kkk-fog-c, .kkk-train, .kkk-lamp, .kkk-lamp2 { animation: none; }
          .kkk-train { transform: translateX(150px); transform-box: fill-box; transform-origin: 0% 50%; }
          .kkk-lamp, .kkk-lamp2 { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
