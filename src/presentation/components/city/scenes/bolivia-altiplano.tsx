/**
 * 高原(アルティプラーノ)の街に重ねる、乾いた風。
 *
 * ビジャソンのような 3,500m の高原は一日じゅう風が吹いている。
 * 薄い雲が空を横切り、土の上を砂ぼこりの帯が流れ、イチュ草が同じ向きに倒れる。
 * 背景(空・山・地面)は静止画が描いているので、ここでは動くものだけを重ねる。
 */
export function BoliviaAltiplano() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 高いところを流れる薄雲 */}
      <g fill="#f6efe2">
        <g className="bolalti-cloud-a" opacity="0.4">
          <ellipse cx="110" cy="16" rx="52" ry="4.4" />
          <ellipse cx="148" cy="21" rx="28" ry="2.6" />
        </g>
        <g className="bolalti-cloud-b" opacity="0.3">
          <ellipse cx="250" cy="52" rx="44" ry="3.6" />
          <ellipse cx="214" cy="56" rx="24" ry="2.2" />
        </g>
        <g className="bolalti-cloud-c" opacity="0.22">
          <ellipse cx="60" cy="74" rx="38" ry="3" />
        </g>
      </g>

      {/* 空をすべる鳥 */}
      <g stroke="#3f4a63" strokeWidth="1.4" fill="none" strokeLinecap="round">
        <g className="bolalti-bird-a">
          <path className="bolalti-wing-a" d="M-7,0 Q-3.5,-4.5 0,0 Q3.5,-4.5 7,0" />
        </g>
        <g className="bolalti-bird-b">
          <path className="bolalti-wing-b" d="M-5,0 Q-2.5,-3.4 0,0 Q2.5,-3.4 5,0" />
        </g>
      </g>

      {/* 地表を流れる砂ぼこり */}
      <g fill="#e6cfa4">
        <ellipse className="bolalti-dust-a" cx="80" cy="150" rx="48" ry="3.4" opacity="0.3" />
        <ellipse className="bolalti-dust-b" cx="220" cy="173" rx="60" ry="4.2" opacity="0.26" />
        <ellipse className="bolalti-dust-c" cx="140" cy="197" rx="52" ry="3.6" opacity="0.22" />
      </g>

      {/* 風になびくイチュ草 */}
      <g stroke="#8a7440" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <g transform="translate(34,200)">
          <g className="bolalti-tuft-a">
            <path d="M0,0 L-5,-12 M0,0 L0,-15 M0,0 L5,-11" />
          </g>
        </g>
        <g transform="translate(126,190)">
          <g className="bolalti-tuft-b">
            <path d="M0,0 L-4,-9 M0,0 L1,-12 M0,0 L5,-8" />
          </g>
        </g>
        <g transform="translate(232,204)">
          <g className="bolalti-tuft-c">
            <path d="M0,0 L-6,-13 M0,0 L0,-16 M0,0 L6,-12" />
          </g>
        </g>
        <g transform="translate(318,186)">
          <g className="bolalti-tuft-d">
            <path d="M0,0 L-4,-8 M0,0 L0,-11 M0,0 L4,-8" />
          </g>
        </g>
        <g transform="translate(378,199)">
          <g className="bolalti-tuft-a">
            <path d="M0,0 L-5,-10 M0,0 L1,-13 M0,0 L5,-9" />
          </g>
        </g>
      </g>

      <style>{`
        .bolalti-cloud-a, .bolalti-cloud-b, .bolalti-cloud-c,
        .bolalti-dust-a, .bolalti-dust-b, .bolalti-dust-c,
        .bolalti-bird-a, .bolalti-bird-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .bolalti-cloud-a { animation: bolalti-cloud 52s linear infinite; }
        .bolalti-cloud-b { animation: bolalti-cloud 68s linear infinite; animation-delay: -22s; }
        .bolalti-cloud-c { animation: bolalti-cloud 44s linear infinite; animation-delay: -30s; }
        .bolalti-dust-a { animation: bolalti-blow 19s linear infinite; }
        .bolalti-dust-b { animation: bolalti-blow 26s linear infinite; animation-delay: -9s; }
        .bolalti-dust-c { animation: bolalti-blow 23s linear infinite; animation-delay: -16s; }
        .bolalti-bird-a { transform: translate(86px, 58px); animation: bolalti-glide-a 34s linear infinite; }
        .bolalti-bird-b { transform: translate(306px, 40px); animation: bolalti-glide-b 42s linear infinite; }
        .bolalti-wing-a, .bolalti-wing-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .bolalti-wing-a { animation: bolalti-flap 1.1s ease-in-out infinite; }
        .bolalti-wing-b { animation: bolalti-flap 1.4s ease-in-out infinite; animation-delay: -0.5s; }
        .bolalti-tuft-a, .bolalti-tuft-b, .bolalti-tuft-c, .bolalti-tuft-d {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .bolalti-tuft-a { animation: bolalti-sway 4.2s ease-in-out infinite; }
        .bolalti-tuft-b { animation: bolalti-sway 5.1s ease-in-out infinite; animation-delay: -1.4s; }
        .bolalti-tuft-c { animation: bolalti-sway 3.6s ease-in-out infinite; animation-delay: -2.2s; }
        .bolalti-tuft-d { animation: bolalti-sway 4.8s ease-in-out infinite; animation-delay: -0.8s; }
        @keyframes bolalti-cloud {
          0% { transform: translateX(-210px); }
          100% { transform: translateX(300px); }
        }
        @keyframes bolalti-blow {
          0% { transform: translateX(-190px) scaleX(0.7); opacity: 0; }
          16% { opacity: 0.3; }
          82% { opacity: 0.24; }
          100% { transform: translateX(330px) scaleX(1.3); opacity: 0; }
        }
        @keyframes bolalti-glide-a {
          0% { transform: translate(-30px, 74px); }
          50% { transform: translate(200px, 52px); }
          100% { transform: translate(430px, 68px); }
        }
        @keyframes bolalti-glide-b {
          0% { transform: translate(430px, 38px); }
          50% { transform: translate(200px, 58px); }
          100% { transform: translate(-30px, 34px); }
        }
        @keyframes bolalti-flap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.34); }
        }
        @keyframes bolalti-sway {
          0%, 100% { transform: skewX(6deg) rotate(2deg); }
          50% { transform: skewX(20deg) rotate(7deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bolalti-cloud-a, .bolalti-cloud-b, .bolalti-cloud-c,
          .bolalti-dust-a, .bolalti-dust-b, .bolalti-dust-c,
          .bolalti-bird-a, .bolalti-bird-b,
          .bolalti-wing-a, .bolalti-wing-b,
          .bolalti-tuft-a, .bolalti-tuft-b, .bolalti-tuft-c, .bolalti-tuft-d { animation: none; }
        }
      `}</style>
    </svg>
  );
}
