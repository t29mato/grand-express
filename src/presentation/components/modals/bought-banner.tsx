"use client";

/**
 * 買った直後の行に立つ「のぼり」。
 *
 * 購入は静かすぎた——押した瞬間に金が引かれるだけで、何も起きたように見えない。
 * 竿と布の小さな絵を、根元から立ち上がるように出す(CSS の `bought-banner-rise`)。
 * 布の色は金(自分のもの、の色としてこのゲームで使っている色)。
 *
 * 動きを減らす設定では、`globals.css` の規則で animation が止まり、
 * 立った状態でそのまま出る。
 */
export function BoughtBanner({ label }: { label: string }) {
  return (
    <span className="bought-banner" data-testid="bought-banner">
      <svg className="nobori" viewBox="0 0 16 30" width="12" height="22" aria-hidden="true">
        {/* 竿 */}
        <rect x="1" y="2" width="1.6" height="28" rx="0.8" fill="var(--salt-dim)" />
        <circle cx="1.8" cy="1.8" r="1.8" fill="var(--gold)" />
        {/* 布。右へなびく形にして、旗ではなく「のぼり」に見せる。 */}
        <path d="M3 3 H15 L13.2 12 L15 21 H3 Z" fill="var(--gold)" />
        <path d="M5 6 H12 M5 10 H12 M5 14 H12 M5 18 H12" stroke="#1b1330" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      </svg>
      <span className="txt">{label}</span>
    </span>
  );
}
