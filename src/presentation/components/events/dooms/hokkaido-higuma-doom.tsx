/**
 * 道路にヒグマが出た。
 *
 * 本文の芯は3つ。**夜明けに幹線道路を横切るのが目撃されたこと・
 * 立ち去ったと確認できるまで警察が区間を封鎖すること・迂回で時間と通行料がかかること。**
 *
 * **怖がらせない。**熊は襲っていない。**もう道を渡り終えて、林へ帰るところ**を
 * 遠くに小さく描く。手前にあるのは封鎖の柵と、待たされている車である。
 *
 * 動くのは**回転する赤色灯・誘導灯の振り・遠ざかる熊の足取り・朝もや**だけ。
 * 止めた状態でも、封鎖された道・警官・林へ歩き去る熊で分かる。
 */
export function HokkaidoHigumaDoom() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜明け。空の下だけが橙。 */}
      <rect width="400" height="210" fill="#2b3d54" />
      <rect width="400" height="44" fill="#22344b" />
      <rect y="44" width="400" height="26" fill="#3d4f63" />
      <rect y="70" width="400" height="22" fill="#7d6a63" />
      <rect y="82" width="400" height="14" fill="#c07a4c" />
      <circle cx="286" cy="94" r="14" fill="#f5b463" opacity="0.9" />
      <circle cx="286" cy="94" r="28" fill="#f5b463" opacity="0.16" />

      {/* 奥のトドマツ林。**夜明けの逆光なので、ほぼ黒い輪郭。** */}
      <g fill="#1b2c33">
        <path d="M6,110l9,-32 9,32z" />
        <path d="M30,110l8,-26 8,26z" />
        <path d="M52,110l10,-34 10,34z" />
        <path d="M78,110l8,-27 8,27z" />
        <path d="M100,110l9,-30 9,30z" />
        <path d="M126,110l8,-25 8,25z" />
        <path d="M150,110l10,-33 10,33z" />
        <path d="M176,110l8,-26 8,26z" />
        <path d="M200,110l9,-31 9,31z" />
        <path d="M226,110l8,-24 8,24z" />
        <path d="M250,110l10,-32 10,32z" />
        <path d="M300,110l9,-30 9,30z" />
        <path d="M326,110l8,-26 8,26z" />
        <path d="M350,110l10,-33 10,33z" />
        <path d="M376,110l8,-27 8,27z" />
      </g>
      <rect y="108" width="400" height="8" fill="#1b2c33" />

      {/* 道。奥へ細くなる。 */}
      <path d="M0,210h400V126H0z" fill="#2e3a46" />
      <path d="M140,126h120l90,84H50z" fill="#3a4854" />
      <g fill="#c8c2a8" opacity="0.55">
        <path d="M196,128h8l1.4,10h-11z" />
        <path d="M192,146h16l2,14h-20z" />
        <path d="M186,170h28l3,20h-34z" />
      </g>
      {/* 路肩の雪と草。 */}
      <g fill="#4a5a52">
        <path d="M0,132q40,-6 96,2v10H0z" />
        <path d="M290,134q56,-8 110,0v12H290z" />
      </g>

      {/* 熊。**遠くを、こちらに背を向けて林へ入っていく。**小さく、穏やかに。 */}
      <g className="hkg-bear">
        <ellipse cx="250" cy="130" rx="21" ry="11" fill="#6b5140" />
        <ellipse cx="232" cy="121" rx="11" ry="9" fill="#7a5c48" />
        <circle cx="226" cy="114" r="3.2" fill="#6b5140" />
        <circle cx="237" cy="113" r="3.2" fill="#6b5140" />
        <path d="M224,122q-6,1 -7,4q5,1 7,-4z" fill="#8a6a52" />
        <path d="M269,125q8,-2 11,4q-7,2 -11,-4z" fill="#6b5140" />
        <g fill="#54402f">
          <rect x="236" y="139" width="6" height="10" />
          <rect x="247" y="140" width="6" height="9" />
          <rect x="258" y="139" width="6" height="10" />
        </g>
        <ellipse cx="250" cy="151" rx="22" ry="4" fill="#1c2a36" opacity="0.4" />
      </g>

      {/* 封鎖。**A型バリケードと、赤白のコーン。** */}
      <g>
        <g fill="#e8e0d0">
          <path d="M96,196l6,-42h6l-4,42z" />
          <path d="M150,196l-6,-42h-6l4,42z" />
          <rect x="96" y="156" width="56" height="9" />
        </g>
        <g fill="#c0453c">
          <rect x="96" y="156" width="14" height="9" />
          <rect x="124" y="156" width="14" height="9" />
        </g>
        <g fill="#e8e0d0">
          <path d="M264,196l6,-40h6l-4,40z" />
          <path d="M316,196l-6,-40h-6l4,40z" />
          <rect x="264" y="158" width="52" height="8" />
        </g>
        <g fill="#c0453c">
          <rect x="264" y="158" width="13" height="8" />
          <rect x="290" y="158" width="13" height="8" />
        </g>
        <g fill="#d8553c">
          <path d="M186,204l7,-24h6l7,24z" />
          <path d="M226,200l6,-21h5l6,21z" />
        </g>
        <g fill="#f0ece0">
          <path d="M189,192h11v4h-12z" />
          <path d="M229,190h9v3.4h-10z" />
        </g>
      </g>

      {/* パトカー(手前左)。**赤色灯が回る。** */}
      <g>
        <ellipse cx="70" cy="196" rx="66" ry="7" fill="#000" opacity="0.3" />
        <path d="M12,190v-18q0,-6 8,-6h14l12,-16h40l10,16h16q7,0 7,6v18z" fill="#e8e4d8" />
        <path d="M12,190v-8h107v8z" fill="#2f3a48" />
        <path d="M40,166l10,-13h30l8,13z" fill="#5f7386" />
        <path d="M12,178h107v-8H12z" fill="#3f6f9a" />
        <g fill="#1c2733">
          <circle cx="38" cy="190" r="8.4" />
          <circle cx="98" cy="190" r="8.4" />
        </g>
        <g fill="#7a8794">
          <circle cx="38" cy="190" r="3" />
          <circle cx="98" cy="190" r="3" />
        </g>
        <rect x="46" y="146" width="34" height="8" rx="2.4" fill="#8a8f96" />
        <g className="hkg-beacon">
          <rect x="46" y="146" width="17" height="8" rx="2.4" fill="#e8443f" />
          <rect x="63" y="146" width="17" height="8" rx="2.4" fill="#f0ece0" />
        </g>
        <circle cx="63" cy="150" r="24" fill="#e8443f" opacity="0.14" className="hkg-beacon-glow" />
      </g>

      {/* 待たされている車(奥・ヘッドライトだけ点いている)。 */}
      <g>
        <path d="M300,182v-14q0,-5 6,-5h12l9,-12h32l8,12h13q6,0 6,5v14z" fill="#3a4656" />
        <path d="M320,163l7,-10h24l6,10z" fill="#6b7f92" />
        <g fill="#1c2733">
          <circle cx="320" cy="182" r="6.4" />
          <circle cx="368" cy="182" r="6.4" />
        </g>
        <g fill="#f8dc90">
          <rect x="296" y="170" width="7" height="6" rx="2" />
        </g>
        <path d="M296,170l-40,26h34l12,-20z" fill="#f5b31c" opacity="0.12" />
        {/* 窓から顔を出して覗く運転手。 */}
        <circle cx="330" cy="160" r="4.4" fill="#e8c8a8" />
        <path d="M325.6,159a4.4,4.4 0 0 1 8.8,0z" fill="#c0453c" />
      </g>

      {/* 誘導灯を振る警官。**紺の制服、別の姿勢。** */}
      <g>
        <path d="M176,206h9l2,-24h-9z" fill="#22303f" />
        <path d="M188,206h9l1,-24h-9z" fill="#2b3d54" />
        <path d="M172,182l5,-28h22l5,28z" fill="#2f4a6b" />
        <rect x="174" y="168" width="26" height="5" fill="#e8e4d8" />
        <circle cx="188" cy="146" r="9" fill="#e8c8a8" />
        <path d="M179,145a9,9 0 0 1 18,0z" fill="#22303f" />
        <path d="M177,142h22v3h-22z" fill="#1a2532" />
        <g className="hkg-baton">
          <path d="M200,164l16,-6" stroke="#2f4a6b" strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="212" y="146" width="5" height="16" rx="2.4" fill="#e8443f" transform="rotate(22 214 154)" />
          <circle cx="219" cy="146" r="9" fill="#e8443f" opacity="0.2" />
        </g>
        <path d="M176,164l-14,-4" stroke="#2f4a6b" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>

      {/* 夜明けの靄。**道の上を薄く流れる。** */}
      <g className="hkg-mist" fill="#c8d8e0" opacity="0.18">
        <ellipse cx="120" cy="124" rx="110" ry="10" />
        <ellipse cx="300" cy="130" rx="90" ry="8" />
      </g>

      <style>{`
        .hkg-beacon {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: hkg-rotate 1.4s steps(2, end) infinite;
        }
        @keyframes hkg-rotate {
          0%   { transform: scaleX(1); }
          50%  { transform: scaleX(-1); }
          100% { transform: scaleX(1); }
        }
        .hkg-beacon-glow { animation: hkg-pulse 1.4s ease-in-out infinite; }
        @keyframes hkg-pulse {
          0%, 100% { opacity: 0.08; }
          50%      { opacity: 0.26; }
        }
        .hkg-baton {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: hkg-wave 1.8s ease-in-out infinite;
        }
        @keyframes hkg-wave {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-24deg); }
        }
        .hkg-bear {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: hkg-walk 6s ease-in-out infinite;
        }
        @keyframes hkg-walk {
          0%   { transform: translateX(-16px) scale(1.06); }
          100% { transform: translateX(22px) scale(0.94); }
        }
        .hkg-mist { animation: hkg-drift 9s ease-in-out infinite; }
        @keyframes hkg-drift {
          0%, 100% { transform: translateX(-18px); opacity: 0.12; }
          50%      { transform: translateX(18px); opacity: 0.24; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hkg-beacon, .hkg-beacon-glow, .hkg-baton, .hkg-bear, .hkg-mist { animation: none; }
          .hkg-baton {
            transform: rotate(-24deg);
            transform-box: fill-box;
            transform-origin: 0% 100%;
          }
          .hkg-bear {
            transform: translateX(16px) scale(0.96);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
        }
      `}</style>
    </svg>
  );
}
