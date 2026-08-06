/**
 * ドワールカー(arabianport)に重ねる動き。
 *
 * 沖のダウ船が波にゆれ、白い波頭が横に流れ、かもめが二羽わたる。
 * 海の底では、沈んだ都の尖塔がゆっくり見えかくれする。
 * 背景(空・海・砂浜・船)は下の静止画が描いているので、ここでは動くものだけ。
 */
export function IndiaArabianport() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 海に沈んだ都の尖塔 */}
      <g className="arp-sunken" fill="none" stroke="#bfe8f4" strokeWidth="2" strokeLinejoin="round">
        <path d="M104,158v-16l12,-14l12,14v16" />
        <path d="M116,128v-8" />
        <path d="M134,158v-12l10,-10l10,10v12" />
        <path d="M100,146h56" />
      </g>

      {/* 横に流れる波頭 */}
      <g stroke="#dff4fa" strokeWidth="2" strokeLinecap="round" fill="none">
        <path className="arp-crest arp-crest-1" d="M20,120h40" />
        <path className="arp-crest arp-crest-2" d="M120,132h52" />
        <path className="arp-crest arp-crest-3" d="M230,124h46" />
        <path className="arp-crest arp-crest-4" d="M300,146h40" />
      </g>

      {/* 波にゆれるダウ船(背景の船にぴったり重ねてある) */}
      <g className="arp-dhow">
        <path d="M250,140c16,-6 54,-6 68,0c-10,10 -58,10 -68,0z" fill="#7a5a34" />
        <path d="M284,138v-40l26,40z" fill="#f6efe2" />
      </g>

      {/* かもめ */}
      <g className="arp-gull arp-gull-1">
        <path className="arp-wing" d="M-9,0Q-4.5,-6 0,0Q4.5,-6 9,0" fill="none" stroke="#f2f6f8" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      <g className="arp-gull arp-gull-2">
        <path className="arp-wing arp-wing-slow" d="M-6,0Q-3,-4 0,0Q3,-4 6,0" fill="none" stroke="#eef4f7" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      <style>{`
        .arp-sunken { opacity: 0; animation: arp-surface 13s ease-in-out infinite; }
        @keyframes arp-surface {
          0%, 62%, 100% { opacity: 0; }
          20%, 42%      { opacity: 0.28; }
        }

        .arp-crest { opacity: 0; }
        .arp-crest-1 { animation: arp-drift 8s ease-in-out infinite; }
        .arp-crest-2 { animation: arp-drift 10s ease-in-out 2.2s infinite; }
        .arp-crest-3 { animation: arp-drift 9s ease-in-out 4.5s infinite; }
        .arp-crest-4 { animation: arp-drift 11s ease-in-out 1.3s infinite; }
        @keyframes arp-drift {
          0%   { transform: translateX(-20px); opacity: 0; }
          50%  { opacity: 0.6; }
          100% { transform: translateX(24px); opacity: 0; }
        }

        .arp-dhow {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: arp-rock 5.5s ease-in-out infinite;
        }
        @keyframes arp-rock {
          0%, 100% { transform: rotate(-2.2deg) translateY(0px); }
          50%      { transform: rotate(2.2deg) translateY(-2px); }
        }

        .arp-gull-1 { animation: arp-glide-a 24s linear infinite; }
        .arp-gull-2 { animation: arp-glide-b 31s linear 6s infinite; }
        @keyframes arp-glide-a {
          0%   { transform: translate(-26px, 40px); }
          100% { transform: translate(426px, 24px); }
        }
        @keyframes arp-glide-b {
          0%   { transform: translate(426px, 22px); }
          100% { transform: translate(-26px, 44px); }
        }
        .arp-wing { transform-box: fill-box; transform-origin: 50% 100%; animation: arp-flap 1s ease-in-out infinite alternate; }
        .arp-wing-slow { animation-duration: 1.4s; }
        @keyframes arp-flap {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .arp-sunken, .arp-crest-1, .arp-crest-2, .arp-crest-3, .arp-crest-4,
          .arp-dhow, .arp-gull-1, .arp-gull-2, .arp-wing, .arp-wing-slow { animation: none; }
          .arp-sunken { opacity: 0.26; }
          .arp-crest { opacity: 0.55; }
          .arp-dhow { transform: rotate(-2deg); }
          .arp-gull-1 { transform: translate(150px, 34px); }
          .arp-gull-2 { transform: translate(210px, 26px); }
        }
      `}</style>
    </svg>
  );
}
