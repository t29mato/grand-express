/**
 * 海へ向かう高速道路が朝十時に止まり、サービスエリアで一夜を明かす(南仏)。
 *
 *   - 二車線とも屋根に荷物を積んだ車で詰まり、一台も進まない
 *   - ブレーキランプだけが赤く点いたり消えたりする
 *   - 対向車線は帰る人の列。すれ違うはずの二つの流れが同じ日に重なっている
 */
export function ChasseCroise() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 白茶けた真夏の空 */}
      <rect width="400" height="210" fill="#8fa8bc" />
      <rect y="44" width="400" height="24" fill="#a8bcc4" />
      <circle cx="330" cy="34" r="18" fill="#f0c060" opacity="0.85" />

      {/* 地平の陽炎 */}
      <g fill="#c8d0cc">
        <ellipse className="chc-heat chc-e1" cx="150" cy="78" rx="130" ry="4" opacity="0.35" />
        <ellipse className="chc-heat chc-e2" cx="290" cy="84" rx="110" ry="3.4" opacity="0.28" />
      </g>

      {/* 乾いた丘 */}
      <path d="M0,82 Q80,66 168,82 Q260,98 400,76 L400,96 L0,96z" fill="#9a9a6a" />

      {/* 路肩と路面 */}
      <rect y="94" width="400" height="116" fill="#6f6f6a" />
      <rect y="94" width="400" height="8" fill="#8a8a76" />
      {/* 中央分離帯 */}
      <rect y="136" width="400" height="10" fill="#8a8a76" />
      <g fill="#4f6b45">
        <ellipse cx="40" cy="136" rx="14" ry="5" />
        <ellipse cx="150" cy="136" rx="14" ry="5" />
        <ellipse cx="260" cy="136" rx="14" ry="5" />
        <ellipse cx="370" cy="136" rx="14" ry="5" />
      </g>
      {/* 車線 */}
      <g stroke="#e0dbcd" strokeWidth="3" strokeDasharray="20 18" opacity="0.6" fill="none">
        <path d="M0,118h400M0,176h400" />
      </g>

      {/* 対向車線(帰る人の列・奥) */}
      <g opacity="0.85">
        <g transform="translate(56,124)">
          <rect x="-20" y="-9" width="40" height="11" rx="4" fill="#c96a4a" />
          <path d="M-12,-9 q12,-8 24,0z" fill="#3b4a63" />
          <rect x="-9" y="-15" width="18" height="5" rx="2" fill="#8a5a2c" />
          <circle cx="-11" cy="3" r="4.4" fill="#2a2f38" />
          <circle cx="11" cy="3" r="4.4" fill="#2a2f38" />
        </g>
        <g transform="translate(140,124)">
          <rect x="-20" y="-9" width="40" height="11" rx="4" fill="#7d8fa8" />
          <path d="M-12,-9 q12,-8 24,0z" fill="#3b4a63" />
          <circle cx="-11" cy="3" r="4.4" fill="#2a2f38" />
          <circle cx="11" cy="3" r="4.4" fill="#2a2f38" />
        </g>
        <g transform="translate(226,124)">
          <rect x="-20" y="-9" width="40" height="11" rx="4" fill="#e0c060" />
          <path d="M-12,-9 q12,-8 24,0z" fill="#3b4a63" />
          <rect x="-9" y="-15" width="18" height="5" rx="2" fill="#8a5a2c" />
          <circle cx="-11" cy="3" r="4.4" fill="#2a2f38" />
          <circle cx="11" cy="3" r="4.4" fill="#2a2f38" />
        </g>
        <g transform="translate(312,124)">
          <rect x="-20" y="-9" width="40" height="11" rx="4" fill="#6f9f7a" />
          <path d="M-12,-9 q12,-8 24,0z" fill="#3b4a63" />
          <circle cx="-11" cy="3" r="4.4" fill="#2a2f38" />
          <circle cx="11" cy="3" r="4.4" fill="#2a2f38" />
        </g>
        <g transform="translate(388,124)">
          <rect x="-20" y="-9" width="40" height="11" rx="4" fill="#b06a8a" />
          <path d="M-12,-9 q12,-8 24,0z" fill="#3b4a63" />
          <circle cx="-11" cy="3" r="4.4" fill="#2a2f38" />
          <circle cx="11" cy="3" r="4.4" fill="#2a2f38" />
        </g>
      </g>

      {/* こちらの車線(海へ向かう列・手前) */}
      <g>
        {/* 3台目 */}
        <g transform="translate(66,182)">
          <rect x="-32" y="-14" width="64" height="18" rx="6" fill="#6f9f7a" />
          <path d="M-20,-14 q20,-13 40,0z" fill="#3b4a63" />
          <path d="M-15,-14 q15,-9 30,0z" fill="#bfd8ee" />
          <rect x="-15" y="-24" width="30" height="8" rx="3" fill="#8a5a2c" />
          <circle cx="-18" cy="6" r="7" fill="#2a2f38" />
          <circle cx="18" cy="6" r="7" fill="#2a2f38" />
          <g fill="#e8443f">
            <rect className="chc-tail chc-t1" x="-35" y="-10" width="6" height="6" rx="2" />
          </g>
        </g>
        {/* 2台目 */}
        <g transform="translate(184,186)">
          <rect x="-34" y="-15" width="68" height="19" rx="6" fill="#5b8fe8" />
          <path d="M-21,-15 q21,-14 42,0z" fill="#3b4a63" />
          <path d="M-16,-15 q16,-10 32,0z" fill="#bfd8ee" />
          <rect x="-16" y="-25" width="32" height="8" rx="3" fill="#c96a4a" />
          <circle cx="-19" cy="7" r="7.4" fill="#2a2f38" />
          <circle cx="19" cy="7" r="7.4" fill="#2a2f38" />
          <g fill="#e8443f">
            <rect className="chc-tail chc-t2" x="-37" y="-11" width="6" height="6" rx="2" />
          </g>
        </g>
        {/* 先頭(旅人の車) */}
        <g transform="translate(310,190)">
          <rect x="-36" y="-16" width="72" height="20" rx="7" fill="#e8443f" />
          <path d="M-22,-16 q22,-15 44,0z" fill="#3b4a63" />
          <path d="M-17,-16 q17,-11 34,0z" fill="#bfd8ee" />
          <rect x="-17" y="-27" width="34" height="9" rx="3" fill="#8a5a2c" />
          <rect x="-13" y="-31" width="26" height="5" rx="2" fill="#6b4423" />
          <circle cx="-20" cy="7" r="8" fill="#2a2f38" />
          <circle cx="20" cy="7" r="8" fill="#2a2f38" />
          <circle cx="-20" cy="7" r="3.2" fill="#8a8578" />
          <circle cx="20" cy="7" r="3.2" fill="#8a8578" />
          <g fill="#e8443f">
            <rect className="chc-tail chc-t3" x="-39" y="-12" width="7" height="7" rx="2" />
          </g>
          {/* 窓から出した腕 */}
          <rect className="chc-arm" x="-6" y="-12" width="16" height="6" rx="3" fill="#f6efe2" />
        </g>
      </g>

      {/* 停まったままの排気 */}
      <g fill="#b8bcb4">
        <circle className="chc-fume chc-u1" cx="268" cy="196" r="4" opacity="0.5" />
        <circle className="chc-fume chc-u2" cx="142" cy="192" r="3.4" opacity="0.42" />
      </g>

      {/* 動かない時間ぶんの出費 */}
      <g className="chc-coin chc-c1">
        <circle cx="112" cy="110" r="9" fill="#f5b31c" />
        <circle cx="112" cy="110" r="4.5" fill="#c98a0d" />
      </g>
      <g className="chc-coin chc-c2">
        <circle cx="92" cy="98" r="7.4" fill="#f5b31c" />
        <circle cx="92" cy="98" r="3.6" fill="#c98a0d" />
      </g>

      <style>{`
        .chc-heat, .chc-tail, .chc-arm, .chc-fume, .chc-coin {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .chc-e1 { animation: chc-shimmer 6.5s ease-in-out infinite; }
        .chc-e2 { animation: chc-shimmer 8.5s ease-in-out infinite; animation-delay: -3s; }
        .chc-tail { animation: chc-brake 2.6s ease-in-out infinite; }
        .chc-t2 { animation-duration: 3.4s; animation-delay: -1.2s; }
        .chc-t3 { animation-duration: 2.1s; animation-delay: -0.7s; }
        .chc-arm { transform-origin: 0% 50%; animation: chc-tap 3.2s ease-in-out infinite; }
        .chc-fume { animation: chc-fume 5s linear infinite; }
        .chc-u2 { animation-duration: 6.4s; animation-delay: -3s; }
        .chc-coin { animation: chc-spend 2.8s ease-in infinite; }
        .chc-c2 { animation-delay: -1.4s; }
        @keyframes chc-shimmer {
          0%, 100% { transform: scaleY(1); opacity: 0.2; }
          50% { transform: scaleY(2.2); opacity: 0.45; }
        }
        @keyframes chc-brake {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        @keyframes chc-tap {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-16deg); }
        }
        @keyframes chc-fume {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          25% { opacity: 0.45; }
          100% { transform: translate(-26px, -30px) scale(2.2); opacity: 0; }
        }
        @keyframes chc-spend {
          0% { transform: translate(0, 0); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(-40px, 48px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .chc-heat, .chc-tail, .chc-arm, .chc-fume, .chc-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
