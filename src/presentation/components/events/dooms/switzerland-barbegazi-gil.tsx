/**
 * 霧の中で迷わされる。下りの九十九折りはどの折り返しも同じ景色に見え、霧が晴れて
 * ようやく、同じ岩の前を三度通っていたと分かった。昔話はこれをバルベガジのしわざとする。
 *
 * **この盤面の厄災の神はバルベガジ。**アルプスの伝承の小人で、
 * **足がスキー板ほど大きく**、斜面を滑り降りながら口笛を吹き、ときどき小さな雪崩を
 * 起こす。**意地悪であって、残酷ではない。**姿を隠す存在ではないので、
 * ここでは**はっきり見せる**(峰の霊アプや、姿を出さないトッケビとは逆の扱い)。
 * 足が読めなければ別の小人になってしまうので、**足だけは体より大きく描く。**
 *
 * 構図: 霧の斜面を巻く九十九折り。**目印の岩はひとつだけ**置き、その周りを
 * **三度回った足あと**が渦になって戻ってきている(=同じ所を三度通った)。
 * 旅人は後ろ姿で、どちらへ下ればよいか分からずに立っている。
 * バルベガジは上の雪の斜面を、大きな足のまま滑って横切っていく。
 *
 * 動くのは5つ: 流れる霧、滑るバルベガジと残る雪の筋、口笛の輪、
 * 三度ぶんの足あとが順に浮かんでは消える、旅人がゆっくり向きを変える。
 * 止めても「渦になった足あと・ひとつの岩・大きな足の小人」で伝わる。
 */
export function SwitzerlandBarbegaziGil() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 霧。上ほど白く、下へ行くほど地面が見えてくる。 */}
      <rect width="400" height="210" fill="#7f877e" />
      <rect width="400" height="118" fill="#a4aeae" />
      <rect width="400" height="54" fill="#bcc4c2" />

      {/* 霧の切れ間に、稜線だけがうっすら見える。 */}
      <path
        d="M18,64L72,24L116,56L168,18L224,58L284,26L336,62L392,32"
        stroke="#78828a"
        strokeWidth="5"
        fill="none"
        opacity="0.45"
      />
      <ellipse cx="200" cy="70" rx="220" ry="16" fill="#b0b8b8" opacity="0.7" />

      {/* 上の雪の斜面。**バルベガジが滑る場所。** */}
      <path d="M0,98q90,-20 180,-4q96,16 220,-14v46H0z" fill="#e2e9ec" />
      <path d="M0,112q100,-14 200,2q100,15 200,-10v18H0z" fill="#cdd6d8" />

      {/* 下の斜面。**雪より2段暗く**して、霧の中でも面が分かれるようにする。 */}
      <path d="M0,132q110,-14 210,4q94,16 190,-8v82H0z" fill="#767e72" />
      <path d="M0,158q120,-12 220,6q88,14 180,-6v52H0z" fill="#68705f" />
      <g fill="#5c6454">
        <ellipse cx="70" cy="196" rx="70" ry="10" />
        <ellipse cx="320" cy="204" rx="80" ry="10" />
      </g>
      <g fill="#24402f">
        <path d="M24,152l-9,20h18zM24,140l-7,16h14zM370,158l-9,20h18zM370,146l-7,16h14z" />
      </g>

      {/* 九十九折りの道。折り返しがどれも同じに見える。 */}
      <g stroke="#b4b8a6" strokeWidth="13" fill="none" strokeLinecap="round">
        <path d="M400,126q-70,4 -120,16q-52,12 -46,24q6,12 62,10q56,-2 60,12q4,14 -70,18H0" />
      </g>
      <g stroke="#8f9484" strokeWidth="1.6" fill="none">
        <path d="M400,133q-70,4 -120,16q-52,12 -46,24q6,12 62,10q56,-2 60,12q4,14 -70,18H0" />
      </g>
      <g stroke="#d0d4c2" strokeWidth="2.4" strokeDasharray="12 15" fill="none">
        <path d="M400,126q-70,4 -120,16q-52,12 -46,24q6,12 62,10q56,-2 60,12q4,14 -70,18H0" />
      </g>

      {/* **三度回った足あと。**渦になって同じ岩へ戻ってくる。 */}
      <g className="chb-track1" fill="#48503f">
        <ellipse cx="112" cy="198" rx="6.4" ry="3.6" />
        <ellipse cx="136" cy="192" rx="6.4" ry="3.6" />
        <ellipse cx="160" cy="188" rx="6.4" ry="3.6" />
        <ellipse cx="184" cy="188" rx="6.4" ry="3.6" />
      </g>
      <g className="chb-track2" fill="#48503f">
        <ellipse cx="208" cy="192" rx="6.4" ry="3.6" />
        <ellipse cx="228" cy="184" rx="6.4" ry="3.6" />
        <ellipse cx="234" cy="172" rx="6.4" ry="3.6" />
        <ellipse cx="220" cy="164" rx="6.4" ry="3.6" />
      </g>
      <g className="chb-track3" fill="#48503f">
        <ellipse cx="200" cy="162" rx="6.4" ry="3.6" />
        <ellipse cx="180" cy="166" rx="6.4" ry="3.6" />
        <ellipse cx="170" cy="176" rx="6.4" ry="3.6" />
        <ellipse cx="176" cy="188" rx="6.4" ry="3.6" />
      </g>

      {/* **目印の岩はひとつだけ。**割れ目の向きで「さっきと同じ岩」だと分かる形にする。 */}
      <g>
        <ellipse cx="264" cy="184" rx="30" ry="8" fill="#000" opacity="0.2" />
        <path d="M238,184l6,-36l22,-16l26,24l-4,28z" fill="#6f757a" />
        <path d="M244,148l22,-16l26,24l-18,6z" fill="#8d939a" />
        <path d="M266,132l26,24l-4,28h-12l2,-30z" fill="#535a60" />
        <path d="M252,158l6,26" stroke="#454b52" strokeWidth="3" fill="none" />
        <path d="M272,150l-5,12l10,7" stroke="#454b52" strokeWidth="2.4" fill="none" />
        <path d="M244,148q11,-4 20,-2l-5,5q-8,-2 -15,-3z" fill="#e8eef0" opacity="0.85" />
      </g>

      {/* 滑った跡(雪の筋)。バルベガジの後ろに残る。 */}
      <path
        className="chb-trail"
        d="M46,118q60,-14 120,-8q64,6 120,-8"
        stroke="#f6fafd"
        strokeWidth="6"
        fill="none"
        opacity="0.85"
      />

      {/* **バルベガジ。**白い長い髭と、体より大きい足。滑って横切っていく。 */}
      <g className="chb-gnome">
        {/* 巻き上がる雪 */}
        <ellipse cx="26" cy="112" rx="22" ry="6" fill="#f6fafd" opacity="0.8" />
        {/* **大きな足。**そのままスキー板。体の幅の3倍に取る。 */}
        <path d="M-26,110h54q7,0 7,5t-7,5h-54q-7,0 -7,-5t7,-5z" fill="#efe6d0" />
        <path d="M28,110q7,0 7,5t-7,5z" fill="#cdc3a8" />
        <path d="M-30,106h34q4,0 4,4h-38z" fill="#f6efe2" />
        <ellipse cx="0" cy="122" rx="34" ry="4" fill="#000" opacity="0.16" />
        {/* 胴と外套 */}
        <path d="M-13,110q-8,-24 7,-24q15,0 7,24z" fill="#6f8aa0" />
        <path d="M-6,86q7,-2 8,4l-2,20h-8z" fill="#84a0b6" />
        {/* 長い白髭 */}
        <path d="M-11,90q10,26 15,3q5,18 8,-5z" fill="#f8fbfe" />
        <path d="M-12,86q11,5 23,0l-2,8q-9,4 -18,0z" fill="#eef4f8" />
        {/* 顔と帽子 */}
        <circle cx="0" cy="78" r="9.4" fill="#dfc7a8" />
        <path d="M-10,76q1,-13 10,-13q9,0 10,13z" fill="#4f7590" />
        <path d="M-11,76h22v3.4h-22z" fill="#3f6178" />
        <circle cx="-3" cy="78" r="1.4" fill="#3f3428" />
        <circle cx="4" cy="78" r="1.4" fill="#3f3428" />
        <path d="M-2,84q4,2 7,-1" stroke="#a8886a" strokeWidth="1.4" fill="none" />
        {/* 腕 */}
        <path d="M-12,96l-12,-7" stroke="#dfc7a8" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M12,96l12,-8" stroke="#dfc7a8" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* 口笛の輪 */}
        <g className="chb-whistle" fill="none" stroke="#f8fbfe" strokeWidth="2.2">
          <path d="M12,72q8,-5 15,0" />
          <path d="M18,64q9,-6 18,0" />
        </g>
      </g>

      {/* 旅人。**後ろ姿**にして、他の6枚と姿勢を変える。 */}
      <g transform="translate(104,0)">
        <ellipse cx="0" cy="192" rx="14" ry="4" fill="#000" opacity="0.22" />
        <g className="chb-lost">
          <path d="M-7,192l-2,-24h18l-2,24z" fill="#39404c" />
          <path d="M-12,168q-1,-24 12,-24q13,0 12,24z" fill="#c8102e" />
          {/* 背負った荷 */}
          <rect x="-9" y="146" width="18" height="20" rx="3" fill="#3f6a4e" />
          <path d="M-9,153h18" stroke="#2f5240" strokeWidth="2.2" fill="none" />
          <circle cx="0" cy="134" r="9.4" fill="#8a6a48" />
          <path d="M-10,133q1,-12 10,-12q9,0 10,12z" fill="#f5b31c" />
          {/* 見回している腕と杖 */}
          <path d="M-11,158l-13,10" stroke="#e0b48a" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M11,158l13,7" stroke="#e0b48a" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M24,165v27" stroke="#8a8578" strokeWidth="2.6" fill="none" />
        </g>
      </g>

      {/* 流れる霧。**いちばん広く動く。**下は薄めにして地面を殺さない。 */}
      <g className="chb-fog1" fill="#e4eae8" opacity="0.34">
        <ellipse cx="110" cy="126" rx="180" ry="12" />
        <ellipse cx="320" cy="148" rx="150" ry="9" />
        <ellipse cx="180" cy="182" rx="190" ry="7" />
      </g>
      <g className="chb-fog2" fill="#f2f6f4" opacity="0.26">
        <ellipse cx="270" cy="114" rx="180" ry="11" />
        <ellipse cx="70" cy="160" rx="160" ry="8" />
        <ellipse cx="240" cy="204" rx="190" ry="8" />
      </g>

      <style>{`
        .chb-fog1, .chb-fog2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .chb-fog1 { animation: chb-roll 7.2s linear infinite; }
        .chb-fog2 { animation: chb-roll 9.6s linear -3.8s infinite; }
        @keyframes chb-roll {
          0%   { transform: translateX(-56px); opacity: 0.1; }
          50%  { opacity: 0.5; }
          100% { transform: translateX(56px); opacity: 0.1; }
        }
        .chb-gnome {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: chb-slide 6.4s ease-in-out infinite;
        }
        @keyframes chb-slide {
          0%   { transform: translate(322px, -8px) rotate(-3deg); opacity: 0; }
          14%  { opacity: 1; }
          50%  { transform: translate(196px, 0px) rotate(2deg); opacity: 1; }
          86%  { opacity: 1; }
          100% { transform: translate(70px, 8px) rotate(-2deg); opacity: 0; }
        }
        .chb-trail {
          stroke-dasharray: 60 260;
          animation: chb-draw 6.4s ease-in-out infinite;
        }
        @keyframes chb-draw {
          0%   { stroke-dashoffset: -60; opacity: 0; }
          20%  { opacity: 0.85; }
          100% { stroke-dashoffset: 240; opacity: 0; }
        }
        .chb-whistle {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: chb-toot 1.8s ease-out infinite;
        }
        @keyframes chb-toot {
          0%   { transform: scale(0.5); opacity: 0.9; }
          100% { transform: scale(1.6) translate(6px, -6px); opacity: 0; }
        }
        .chb-track1, .chb-track2, .chb-track3 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .chb-track1 { animation: chb-step 4.8s ease-in-out infinite; }
        .chb-track2 { animation: chb-step 4.8s ease-in-out -1.6s infinite; }
        .chb-track3 { animation: chb-step 4.8s ease-in-out -3.2s infinite; }
        @keyframes chb-step {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        .chb-lost {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: chb-turn 7s ease-in-out infinite;
        }
        @keyframes chb-turn {
          0%, 100% { transform: scaleX(1); }
          46%      { transform: scaleX(0.84); }
          54%      { transform: scaleX(-0.84); }
          96%      { transform: scaleX(-1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .chb-fog1, .chb-fog2, .chb-gnome, .chb-trail,
          .chb-whistle, .chb-track1, .chb-track2, .chb-track3, .chb-lost { animation: none; }
          .chb-gnome { transform: translate(206px, 0px) rotate(1deg); }
          .chb-trail { stroke-dasharray: none; opacity: 0.85; }
          .chb-whistle { opacity: 0.9; }
        }
      `}</style>
    </svg>
  );
}
