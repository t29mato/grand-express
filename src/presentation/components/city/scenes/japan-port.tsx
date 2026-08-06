/**
 * 港町(函館など)に重ねる動き。
 *
 * 湾に白い波の筋が流れ、かもめが二羽わたっていき、沖の小舟がゆっくり揺れる。
 * 空・海・倉庫は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function JapanPort() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 流れる波の筋 */}
      <g stroke="#bfe8f4" strokeWidth="2" strokeLinecap="round" fill="none">
        <path className="jpt-wave jpt-w1" d="M18,126h44" opacity="0.5" />
        <path className="jpt-wave jpt-w2" d="M300,130h52" opacity="0.45" />
        <path className="jpt-wave jpt-w3" d="M132,164h64" opacity="0.55" />
        <path className="jpt-wave jpt-w4" d="M244,182h58" opacity="0.5" />
        <path className="jpt-wave jpt-w5" d="M44,196h70" opacity="0.45" />
      </g>

      {/* 沖の小舟 */}
      <g transform="translate(346,172)">
        <g className="jpt-boat">
          <path d="M-15,0 L15,0 L11,7 L-11,7 Z" fill="#f0e6d2" />
          <rect x="-5" y="-7" width="10" height="7" fill="#b8513f" />
          <path d="M8,0 L8,-13" stroke="#5a4634" strokeWidth="1.6" />
        </g>
      </g>

      {/* 渡るかもめ(手前) */}
      <g transform="translate(90,44)">
        <g className="jpt-gull-a">
          <path
            className="jpt-flap-a"
            d="M-11,0 Q-5,-7 0,-1 Q5,-7 11,0"
            fill="none"
            stroke="#f6efe2"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* 渡るかもめ(奥・小さめ) */}
      <g transform="translate(230,26)">
        <g className="jpt-gull-b">
          <path
            className="jpt-flap-b"
            d="M-8,0 Q-4,-5 0,-0.8 Q4,-5 8,0"
            fill="none"
            stroke="#f6efe2"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      </g>

      <style>{`
        .jpt-wave { animation: jpt-drift 15s linear infinite; animation-delay: -5s; }
        .jpt-w2 { animation-duration: 19s; animation-delay: -6s; }
        .jpt-w3 { animation-duration: 13s; animation-delay: -3s; }
        .jpt-w4 { animation-duration: 17s; animation-delay: -9s; }
        .jpt-w5 { animation-duration: 11s; animation-delay: -5s; }
        .jpt-boat { transform-box: fill-box; transform-origin: 50% 100%; animation: jpt-rock 5.2s ease-in-out infinite; }
        .jpt-gull-a { animation: jpt-cross-a 24s linear infinite; animation-delay: -9s; }
        .jpt-gull-b { animation: jpt-cross-b 33s linear infinite; animation-delay: -15s; }
        .jpt-flap-a, .jpt-flap-b {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: jpt-flap 1.9s ease-in-out infinite;
        }
        .jpt-flap-b { animation-duration: 2.4s; }
        @keyframes jpt-drift {
          0% { transform: translateX(-34px); opacity: 0; }
          30%, 70% { opacity: 0.55; }
          100% { transform: translateX(34px); opacity: 0; }
        }
        @keyframes jpt-rock {
          0%, 100% { transform: rotate(-4deg) translateY(0); }
          50% { transform: rotate(4deg) translateY(-2px); }
        }
        @keyframes jpt-cross-a {
          0% { transform: translate(-140px, 12px); }
          100% { transform: translate(230px, -14px); }
        }
        @keyframes jpt-cross-b {
          0% { transform: translate(-280px, -6px); }
          100% { transform: translate(190px, 10px); }
        }
        @keyframes jpt-flap {
          0%, 100% { transform: scaleY(0.55); }
          50% { transform: scaleY(1.35); }
        }
        @media (prefers-reduced-motion: reduce) {
          .jpt-wave, .jpt-boat, .jpt-gull-a, .jpt-gull-b, .jpt-flap-a, .jpt-flap-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
