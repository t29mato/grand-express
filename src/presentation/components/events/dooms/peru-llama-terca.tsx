/**
 * 頑固なリャマ。荷を背負ったリャマは、もう十分運んだと決めたらしく、
 * つづら折りの道の真ん中で脚を折って座り込み、引いても押しても頼んでも動かなかった。
 * リャマ自身の判断を超えて荷を積みすぎると、予定はろくなことにならない。
 *
 * 構図: 山肌のつづら折り。手前の折り返しの真ん中に、脚を折って座ったリャマ1頭。
 * 綱を引く追い手は体ごと後ろへ傾いでいるが、リャマは横を向いて草を噛んでいる。
 * 後ろに、待たされている連れの2頭。
 *
 * **1頭だけ・座っている・山の九十九折り**の3つで、
 * ニュージーランド盤の羊の群れ(踏切にあふれる群れ)と別物にしてある。
 *
 * 動くのは4つ: 張っては緩む綱、追い手の踏ん張り、リャマの耳と口、
 * 後ろの2頭の足踏み。止めても「道の真ん中で座ったリャマと、引く人」で伝わる。
 */
export function PeruLlamaTerca() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 高地の空。 */}
      <rect width="400" height="210" fill="#c2b077" />
      <rect width="400" height="88" fill="#4f8fd0" />
      <rect width="400" height="30" fill="#3f7cba" />

      {/* 山肌。つづら折りが上へ続く。 */}
      <path d="M0,88h400v34H0z" fill="#a08f76" />
      <path
        d="M0,96L60,66L118,92L182,60L248,90L310,64L370,92L400,80v42H0z"
        fill="#8f7f68"
      />
      <path
        d="M60,66l-14,16q9,4 14,-2q5,-4 12,2zM182,60l-14,16q9,4 14,-2q5,-4 12,2zM310,64l-12,14q8,4 13,-2z"
        fill="#efe8dc"
      />

      {/* 上の折り返し(奥)。**山肌の中に収める。**
          端まで伸ばすと、空に渡した板に見える。 */}
      <g stroke="#7f7060" strokeWidth="5" fill="none">
        <path d="M108,118L274,100L124,112" />
      </g>
      <g
        stroke="#c9bfa2"
        strokeWidth="1.6"
        strokeDasharray="9 11"
        opacity="0.5"
        fill="none"
      >
        <path d="M108,118L274,100L124,112" />
      </g>

      {/* 手前の折り返し。ここで止まっている。 */}
      <rect y="152" width="400" height="58" fill="#b5a267" />
      <path d="M0,152q100,-8 200,0q100,8 200,-4v10H0z" fill="#c2b077" />
      <rect y="162" width="400" height="30" fill="#9a8d70" />
      <g
        stroke="#c9bfa2"
        strokeWidth="3"
        strokeDasharray="18 16"
        opacity="0.5"
        fill="none"
      >
        <path d="M0,177h400" />
      </g>
      {/* 谷側の石積みと、峠の石塚(アパチェタ) */}
      <g fill="#8f8878">
        <rect x="0" y="192" width="400" height="6" />
        <rect x="30" y="186" width="14" height="6" />
        <rect x="120" y="186" width="14" height="6" />
        <rect x="300" y="186" width="14" height="6" />
      </g>
      <g fill="#9a9084">
        <ellipse cx="368" cy="158" rx="15" ry="5" />
        <ellipse cx="368" cy="151" rx="11" ry="4" />
        <ellipse cx="368" cy="145" rx="7" ry="3" />
      </g>

      {/* 座り込んだリャマ。**これが主役。**脚を折って伏せている。 */}
      <g transform="translate(196,0)">
        {/* 荷。積みすぎている */}
        <g fill="#c8102e">
          <rect x="-22" y="140" width="44" height="14" rx="3" />
        </g>
        <g fill="#e8b21c">
          <rect x="-20" y="130" width="40" height="11" rx="3" />
        </g>
        <g fill="#1f6fb0">
          <rect x="-14" y="122" width="28" height="9" rx="3" />
        </g>
        <path d="M-24,146h48" stroke="#8a6a46" strokeWidth="2.4" fill="none" />
        {/* 伏せた体 */}
        <ellipse cx="0" cy="164" rx="30" ry="15" fill="#e2d8c4" />
        <path d="M-26,176q10,-6 22,-3l-2,6h-18z" fill="#cfc4ac" />
        <path d="M14,176q10,-5 20,-2l-2,5h-16z" fill="#cfc4ac" />
        {/* 立てた首と、横を向いた顔 */}
        <path d="M22,158q7,-4 8,-14l11,2q-1,14 -10,18z" fill="#e2d8c4" />
        <ellipse cx="40" cy="140" rx="10" ry="7" fill="#e2d8c4" />
        <ellipse cx="48" cy="142" rx="5" ry="4" fill="#cfc4ac" />
        <g className="peru-lt-ear">
          <path d="M34,134l-1,-11l6,8z" fill="#e2d8c4" />
          <path d="M43,133l3,-11l3,8z" fill="#e2d8c4" />
        </g>
        <circle cx="43" cy="139" r="1.8" fill="#3a2a1a" />
        <g className="peru-lt-chew">
          <path
            d="M45,146h6"
            stroke="#8a7a62"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
        {/* 噛んでいる草 */}
        <g stroke="#8fae5a" strokeWidth="1.8" fill="none" strokeLinecap="round">
          <path d="M52,145l7,-3M52,147l7,1" />
        </g>
      </g>

      {/* 綱を引く追い手。体ごと後ろへ傾いでいる。 */}
      <g transform="translate(96,0)">
        <g className="peru-lt-puller">
          <path d="M-12,186q0,-30 10,-30q10,0 12,30z" fill="#7f4a8a" />
          <path d="M-10,168h22" stroke="#e8b21c" strokeWidth="4" fill="none" />
          <circle cx="0" cy="148" r="10" fill="#8a6a48" />
          <path d="M-10,146q10,-11 20,-1l1,-6q-10,-8 -22,1z" fill="#c8102e" />
          <path d="M-9,141h18l-2,-5h-14z" fill="#c8102e" />
          <path
            d="M-8,190l-8,14M8,190l8,14"
            stroke="#3f3a34"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M8,160q16,-2 24,4"
            stroke="#7f4a8a"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>
      {/* 綱。張っては緩む。 */}
      <g className="peru-lt-rope">
        <path
          d="M130,166q40,10 74,-8"
          fill="none"
          stroke="#c9b48e"
          strokeWidth="3"
        />
      </g>

      {/* 待たされている連れの2頭(後ろ)。 */}
      <g className="peru-lt-wait">
        <g fill="#cfc4ac">
          <ellipse cx="322" cy="150" rx="17" ry="9" />
          <rect x="311" y="156" width="4" height="12" />
          <rect x="319" y="156" width="4" height="12" />
          <rect x="329" y="156" width="4" height="12" />
          <path d="M334,146q5,-3 5,-11l7,1q-1,12 -6,15z" />
          <ellipse cx="343" cy="132" rx="7" ry="5" />
          <path d="M339,127l-1,-7l4,5z" />
          <path d="M346,127l2,-7l2,5z" />
        </g>
        <circle cx="345" cy="131" r="1.4" fill="#3a2a1a" />
        <g fill="#c2b49c">
          <ellipse cx="364" cy="164" rx="14" ry="7.4" />
          <rect x="355" y="169" width="3.4" height="10" />
          <rect x="363" y="169" width="3.4" height="10" />
          <rect x="371" y="169" width="3.4" height="10" />
          <path d="M374,159q4,-3 4,-10l6,1q-1,11 -5,14z" />
          <ellipse cx="383" cy="147" rx="6" ry="4.4" />
          <path d="M379,143l-1,-6l4,4z" />
          <path d="M385,143l2,-6l2,4z" />
        </g>
        <circle cx="385" cy="146" r="1.2" fill="#3a2a1a" />
      </g>

      <style>{`
        .peru-lt-rope {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: peru-lt-pull 2.2s ease-in-out infinite;
        }
        @keyframes peru-lt-pull {
          0%, 100% { transform: scaleX(1) translateY(0); }
          50% { transform: scaleX(0.965) translateY(-3px); }
        }
        .peru-lt-puller {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: peru-lt-lean 2.2s ease-in-out infinite;
        }
        @keyframes peru-lt-lean {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-8deg); }
        }
        .peru-lt-ear {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: peru-lt-flick 3.4s ease-in-out infinite;
        }
        @keyframes peru-lt-flick {
          0%, 82%, 100% { transform: rotate(0deg); }
          88% { transform: rotate(-13deg); }
          94% { transform: rotate(7deg); }
        }
        .peru-lt-chew {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: peru-lt-munch 0.9s ease-in-out infinite;
        }
        @keyframes peru-lt-munch {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(1.4px); }
        }
        .peru-lt-wait {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: peru-lt-shift 3.8s ease-in-out infinite;
        }
        @keyframes peru-lt-shift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .peru-lt-rope,
          .peru-lt-puller,
          .peru-lt-ear,
          .peru-lt-chew,
          .peru-lt-wait { animation: none; }
        }
      `}</style>
    </svg>
  );
}
