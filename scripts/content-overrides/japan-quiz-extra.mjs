/**
 * 日本 のクイズを**足す**ぶん。
 *
 * この盤面の問題は凍結した `legacy/grand-express.html` の中にあり、既存の
 * `japan-quiz.mjs` は**添字で差し替える**ことしかできない。**増やす口はここだけ。**
 *
 * 足す理由: 遊ぶ人から「プレイするほどクイズが被る」と報せがあった。原因は
 * 問題数ではなく**難易度の偏り**で、「くわしい」を選ぶと難易度8前後しか
 * 引かれないのに、その層が数問しか無い盤面があった。**足すぶんは難しい層に寄せる。**
 *
 * 難易度は自分で持つ(`quiz-difficulty.mjs` は legacy のぶんとだけ件数を合わせる)。
 */
function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

/** 1問。`o` は選択肢3つ、`a` は正解の添字(0〜2)。 */
function q(difficulty, question, options, a, fact) {
  return { difficulty, q: t(question), o: options.map(t), a, f: t(fact) };
}

export const JAPAN_QUIZ_EXTRA = [
  // ここに足す
];
