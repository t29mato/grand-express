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
      <g className="iarp-sunken" fill="none" stroke="#bfe8f4" strokeWidth="2" strokeLinejoin="round">
        <path d="M104,158v-16l12,-14l12,14v16" />
        <path d="M116,128v-8" />
        <path d="M134,158v-12l10,-10l10,10v12" />
        <path d="M100,146h56" />
      </g>

      {/* 横に流れる波頭 */}
      <g stroke="#dff4fa" strokeWidth="2" strokeLinecap="round" fill="none">
        <path className="iarp-crest iarp-crest-1" d="M20,120h40" />
        <path className="iarp-crest iarp-crest-2" d="M120,132h52" />
        <path className="iarp-crest iarp-crest-3" d="M230,124h46" />
        <path className="iarp-crest iarp-crest-4" d="M300,146h40" />
      </g>

      {/* 波にゆれるダウ船(背景の船にぴったり重ねてある) */}
      <g className="iarp-dhow">
        <path d="M250,140c16,-6 54,-6 68,0c-10,10 -58,10 -68,0z" fill="#7a5a34" />
        <path d="M284,138v-40l26,40z" fill="#f6efe2" />
      </g>

      {/* かもめ */}
      <g className="iarp-gull iarp-gull-1">
        <path className="iarp-wing" d="M-9,0Q-4.5,-6 0,0Q4.5,-6 9,0" fill="none" stroke="#f2f6f8" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      <g className="iarp-gull iarp-gull-2">
        <path className="iarp-wing iarp-wing-slow" d="M-6,0Q-3,-4 0,0Q3,-4 6,0" fill="none" stroke="#eef4f7" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      <style>{`
        .iarp-sunken { opacity: 0; animation: iarp-surface 13s ease-in-out infinite; }
        @keyframes iarp-surface {
          0%, 62%, 100% { opacity: 0; }
          20%, 42%      { opacity: 0.28; }
        }

        .iarp-crest { opacity: 0; }
        .iarp-crest-1 { animation: iarp-drift 8s ease-in-out infinite; }
        .iarp-crest-2 { animation: iarp-drift 10s ease-in-out 2.2s infinite; }
        .iarp-crest-3 { animation: iarp-drift 9s ease-in-out 4.5s infinite; }
        .iarp-crest-4 { animation: iarp-drift 11s ease-in-out 1.3s infinite; }
        @keyframes iarp-drift {
          0%   { transform: translateX(-20px); opacity: 0; }
          50%  { opacity: 0.6; }
          100% { transform: translateX(24px); opacity: 0; }
        }

        .iarp-dhow {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: iarp-rock 5.5s ease-in-out infinite;
        }
        @keyframes iarp-rock {
          0%, 100% { transform: rotate(-2.2deg) translateY(0px); }
          50%      { transform: rotate(2.2deg) translateY(-2px); }
        }

        .iarp-gull-1 { animation: iarp-glide-a 24s linear infinite; }
        .iarp-gull-2 { animation: iarp-glide-b 31s linear 6s infinite; }
        @keyframes iarp-glide-a {
          0%   { transform: translate(-26px, 40px); }
          100% { transform: translate(426px, 24px); }
        }
        @keyframes iarp-glide-b {
          0%   { transform: translate(426px, 22px); }
          100% { transform: translate(-26px, 44px); }
        }
        .iarp-wing { transform-box: fill-box; transform-origin: 50% 100%; animation: iarp-flap 1s ease-in-out infinite alternate; }
        .iarp-wing-slow { animation-duration: 1.4s; }
        @keyframes iarp-flap {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .iarp-sunken, .iarp-crest-1, .iarp-crest-2, .iarp-crest-3, .iarp-crest-4,
          .iarp-dhow, .iarp-gull-1, .iarp-gull-2, .iarp-wing, .iarp-wing-slow { animation: none; }
          .iarp-sunken { opacity: 0.26; }
          .iarp-crest { opacity: 0.55; }
          .iarp-dhow { transform: rotate(-2deg); }
          .iarp-gull-1 { transform: translate(150px, 34px); }
          .iarp-gull-2 { transform: translate(210px, 26px); }
        }
      `}</style>
    </svg>
  );
}
