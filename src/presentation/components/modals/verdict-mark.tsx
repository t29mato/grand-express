"use client";

/**
 * 正解・不正解の印(○ / ✕)。
 *
 * **絵文字(⭕ / ❌)を使ってはいけない。**
 * 絵文字はフォント側の色で描かれ、CSSの `color` を無視する。
 * `.quiz-verdict.correct` を緑にしていたのに **⭕ は赤い丸のまま出ていた** —
 * つまり正解も不正解も赤で、形を読まないと区別が付かなかった。
 * (日本式の ○/✕ は通じても、赤は日本の外では「悪い」を意味する、という指摘)
 *
 * `currentColor` で描けば文字色がそのまま印の色になる。
 * **色だけに頼らない。**形(○ / ✕)と言葉(correct / wrong)も併せて残す。
 */
export function VerdictMark({ correct, size = 19 }: { correct: boolean; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ verticalAlign: "-3px", marginRight: 7 }}
    >
      {correct ? (
        <circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" strokeWidth="3.2" />
      ) : (
        <path
          d="M5.6,5.6L18.4,18.4M18.4,5.6L5.6,18.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
