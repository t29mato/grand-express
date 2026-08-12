/**
 * 高速道路のAES(自動取締システム)のカメラ橋げたが、通り過ぎる車を
 * 静かに撮影する。カメラのフラッシュが光り、あとから罰金の通知が届く、
 * という体で描く(通知自体は絵にしない。フラッシュと車だけ)。
 *
 * 動くのは走り抜ける車と、カメラのフラッシュの明滅だけ。
 */
export function MalaysiaDendaAes() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 高速道路の昼間。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="110" fill="#a8d4ec" />

      {/* 遠景の緑地帯。 */}
      <path d="M0,110c60,-16 340,-16 400,0v14H0z" fill="#7fae5a" opacity="0.85" />

      {/* 高速道路。 */}
      <rect y="124" width="400" height="86" fill="#5a5a5a" />
      <g stroke="#f4c430" strokeWidth="3" opacity="0.85">
        <path d="M0,150h30M60,150h30M120,150h30M180,150h30M240,150h30M300,150h30M360,150h30" />
      </g>
      <g stroke="#f6efe2" strokeWidth="2" opacity="0.7">
        <path d="M0,180h30M60,180h30M120,180h30M180,180h30M240,180h30M300,180h30M360,180h30" />
      </g>

      {/* AESのカメラ橋げた。 */}
      <g fill="#8a8478">
        <rect x="20" y="60" width="8" height="64" />
        <rect x="372" y="60" width="8" height="64" />
        <rect x="20" y="56" width="360" height="10" />
      </g>
      <g fill="#241a10">
        <rect x="190" y="66" width="20" height="14" rx="2" />
        <circle cx="200" cy="73" r="4" fill="#4a4a52" />
      </g>

      {/* カメラのフラッシュ。 */}
      <circle className="my-aes-flash" cx="200" cy="73" r="10" fill="#f6efe2" />

      {/* 走り抜ける車。 */}
      <g className="my-aes-car">
        <rect x="-30" y="164" width="60" height="20" rx="6" fill="#e8443f" />
        <rect x="-20" y="152" width="36" height="16" rx="5" fill="#c9d4de" />
        <circle cx="-16" cy="186" r="7" fill="#241a10" />
        <circle cx="16" cy="186" r="7" fill="#241a10" />
      </g>

      {/* 速さを示す線。 */}
      <g className="my-aes-lines" stroke="#f6efe2" strokeWidth="2" opacity="0.6">
        <path d="M0,0h26M0,8h18M0,16h22" />
      </g>

      <style>{`
        .my-aes-car {
          animation: my-aes-drive 2.4s linear infinite;
        }
        @keyframes my-aes-drive {
          0% { transform: translateX(-40px); }
          100% { transform: translateX(440px); }
        }
        .my-aes-lines {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: my-aes-blur 2.4s linear infinite;
        }
        @keyframes my-aes-blur {
          0% { transform: translate(-40px, 172px); opacity: 0; }
          10% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translate(400px, 172px); opacity: 0; }
        }
        .my-aes-flash {
          opacity: 0;
          animation: my-aes-strobe 2.4s linear infinite;
        }
        @keyframes my-aes-strobe {
          0%, 44% { opacity: 0; }
          47% { opacity: 1; }
          50% { opacity: 0; }
          53% { opacity: 0.8; }
          56%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .my-aes-car { animation: none; transform: translateX(200px); }
          .my-aes-lines { animation: none; opacity: 0; }
          .my-aes-flash { animation: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
