/**
 * 2月。謝肉祭。
 *
 * 夜の大通りを山車が進む。羽根飾りの踊り手が跳ね、太鼓が鳴り、
 * 紙吹雪と紙テープが降りつづける。12ヶ月でいちばん賑やかな絵にしてある。
 */
export function World10() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の街 */}
      <rect width="400" height="210" fill="#2a1f42" />
      <rect width="400" height="72" fill="#1f1734" />
      <g fill="#3a2f56">
        <rect x="0" y="40" width="54" height="110" />
        <rect x="62" y="24" width="46" height="126" />
        <rect x="292" y="30" width="50" height="120" />
        <rect x="350" y="48" width="50" height="102" />
      </g>
      <g fill="#f5e2a8" opacity="0.8">
        <rect x="10" y="52" width="10" height="12" />
        <rect x="28" y="52" width="10" height="12" />
        <rect x="10" y="76" width="10" height="12" />
        <rect x="72" y="38" width="10" height="12" />
        <rect x="90" y="38" width="10" height="12" />
        <rect x="72" y="62" width="10" height="12" />
        <rect x="302" y="44" width="10" height="12" />
        <rect x="320" y="44" width="10" height="12" />
        <rect x="302" y="68" width="10" height="12" />
        <rect x="360" y="62" width="10" height="12" />
        <rect x="378" y="62" width="10" height="12" />
      </g>

      {/* 通り */}
      <rect y="150" width="400" height="60" fill="#3a2f4e" />
      <rect y="150" width="400" height="7" fill="#4d3f64" />

      {/* 山車 */}
      <g className="w10-float">
        <path d="M132,150 L268,150 L262,110 L138,110z" fill="#c93a3a" />
        <path d="M138,110 L262,110 L252,92 L148,92z" fill="#e8443f" />
        <g fill="#f5b31c">
          <path d="M200,92 L207,74 L214,92z" />
          <path d="M186,92 L200,60 L214,92 L200,80z" />
          <circle cx="200" cy="56" r="8" />
        </g>
        <g fill="#5b8fe8">
          <rect x="146" y="122" width="24" height="18" rx="3" />
          <rect x="188" y="122" width="24" height="18" rx="3" />
          <rect x="230" y="122" width="24" height="18" rx="3" />
        </g>
        <g fill="#2a2f38">
          <circle cx="158" cy="152" r="9" />
          <circle cx="244" cy="152" r="9" />
        </g>
      </g>

      {/* 羽根飾りの踊り手 */}
      <g className="w10-dancer">
        <g fill="#3f8f7a">
          <path d="M78,132 L60,110 L64,106 L82,126z" />
          <path d="M78,132 L96,110 L92,106 L74,126z" />
          <path d="M78,128 L58,128 L58,122 L78,122z" />
          <path d="M78,128 L98,128 L98,122 L78,122z" />
        </g>
        <path d="M68,186 L68,146 Q78,136 88,146 L88,186z" fill="#f5b31c" />
        <circle cx="78" cy="128" r="10" fill="#f6efe2" />
        <path d="M68,120 L88,120 L84,110 L72,110z" fill="#e8447a" />
        <g stroke="#f5b31c" strokeWidth="5" strokeLinecap="round">
          <path d="M68,152 L52,140 M88,152 L104,140" />
        </g>
      </g>
      <g className="w10-dancer w10-d2">
        <g fill="#e8447a">
          <path d="M330,140 L314,120 L318,116 L334,134z" />
          <path d="M330,140 L346,120 L342,116 L326,134z" />
        </g>
        <path d="M322,190 L322,154 Q330,145 338,154 L338,190z" fill="#5b8fe8" />
        <circle cx="330" cy="137" r="9" fill="#f6efe2" />
        <path d="M321,130 L339,130 L336,121 L324,121z" fill="#f5b31c" />
        <g stroke="#5b8fe8" strokeWidth="5" strokeLinecap="round">
          <path d="M322,160 L308,150 M338,160 L352,150" />
        </g>
      </g>

      {/* 太鼓 */}
      <g className="w10-drum">
        <ellipse cx="290" cy="176" rx="22" ry="9" fill="#f6efe2" />
        <path d="M268,176 L268,192 a22,9 0 0 0 44,0 L312,176z" fill="#c93a3a" />
        <g stroke="#8a5a2c" strokeWidth="3" strokeLinecap="round">
          <path d="M282,166 L272,152 M298,166 L308,152" />
        </g>
      </g>

      {/* 紙テープ */}
      <g fill="none" strokeWidth="3" strokeLinecap="round">
        <path className="w10-streamer" d="M40,0 q10,22 -2,44 q-10,20 2,40" stroke="#f5b31c" />
        <path className="w10-streamer w10-st2" d="M124,0 q-10,20 2,40 q10,22 -2,44" stroke="#e8447a" />
        <path className="w10-streamer w10-st3" d="M282,0 q10,22 -2,44 q-10,20 2,40" stroke="#5b8fe8" />
        <path className="w10-streamer w10-st4" d="M366,0 q-10,20 2,40 q10,22 -2,44" stroke="#3f8f7a" />
      </g>

      {/* 紙吹雪 */}
      <g>
        <rect className="w10-conf" x="30" y="20" width="7" height="5" fill="#f5b31c" />
        <rect className="w10-conf w10-c2" x="96" y="8" width="6" height="5" fill="#e8447a" />
        <rect className="w10-conf w10-c3" x="160" y="26" width="7" height="5" fill="#5b8fe8" />
        <rect className="w10-conf w10-c4" x="222" y="12" width="6" height="5" fill="#3f8f7a" />
        <rect className="w10-conf w10-c5" x="288" y="30" width="7" height="5" fill="#f6efe2" />
        <rect className="w10-conf w10-c6" x="352" y="16" width="6" height="5" fill="#f5b31c" />
        <rect className="w10-conf w10-c7" x="66" y="44" width="6" height="5" fill="#e8443f" />
        <rect className="w10-conf w10-c8" x="196" y="48" width="7" height="5" fill="#e8447a" />
        <rect className="w10-conf w10-c9" x="320" y="52" width="6" height="5" fill="#5b8fe8" />
        <rect className="w10-conf w10-c10" x="132" y="60" width="7" height="5" fill="#f5b31c" />
      </g>

      <style>{`
        .w10-float {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w10-trundle 5.6s ease-in-out infinite;
        }
        .w10-dancer {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w10-jump 1.6s ease-in-out infinite;
        }
        .w10-d2 { animation-delay: -0.8s; animation-duration: 1.4s; }
        .w10-drum {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w10-beat 0.8s ease-in-out infinite;
        }
        .w10-streamer {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: w10-wave 3.4s ease-in-out infinite;
        }
        .w10-st2 { animation-delay: -0.9s; animation-duration: 3s; }
        .w10-st3 { animation-delay: -1.8s; animation-duration: 3.8s; }
        .w10-st4 { animation-delay: -2.6s; animation-duration: 3.2s; }
        .w10-conf {
          transform-box: fill-box; transform-origin: center;
          animation: w10-flutter 4.4s linear infinite;
        }
        .w10-c2 { animation-delay: -0.5s; animation-duration: 5s; }
        .w10-c3 { animation-delay: -1s; animation-duration: 4s; }
        .w10-c4 { animation-delay: -1.5s; animation-duration: 5.4s; }
        .w10-c5 { animation-delay: -2s; animation-duration: 4.6s; }
        .w10-c6 { animation-delay: -2.5s; animation-duration: 5.2s; }
        .w10-c7 { animation-delay: -3s; animation-duration: 4.2s; }
        .w10-c8 { animation-delay: -3.5s; animation-duration: 4.8s; }
        .w10-c9 { animation-delay: -4s; animation-duration: 5.6s; }
        .w10-c10 { animation-delay: -4.4s; animation-duration: 4.4s; }
        @keyframes w10-trundle {
          0%, 100% { transform: translateX(-8px) rotate(-0.6deg); }
          50% { transform: translateX(8px) rotate(0.6deg); }
        }
        @keyframes w10-jump {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-11px) rotate(3deg); }
        }
        @keyframes w10-beat {
          0%, 100% { transform: scale(1, 1); }
          50% { transform: scale(1.07, 0.94); }
        }
        @keyframes w10-wave {
          0%, 100% { transform: translateX(-5px) scaleY(1); }
          50% { transform: translateX(5px) scaleY(1.06); }
        }
        @keyframes w10-flutter {
          0% { transform: translate(0, -30px) rotate(0deg); opacity: 0; }
          10%, 86% { opacity: 1; }
          100% { transform: translate(-46px, 190px) rotate(520deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .w10-float, .w10-dancer, .w10-drum, .w10-streamer, .w10-conf { animation: none; }
        }
      `}</style>
    </svg>
  );
}
