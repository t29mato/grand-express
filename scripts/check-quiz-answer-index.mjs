#!/usr/bin/env node
/**
 * **解説が、正解ではない選択肢のほうを指していないか**を見る。
 *
 *   node scripts/check-quiz-answer-index.mjs            全部
 *   node scripts/check-quiz-answer-index.mjs hokkaido   1枚
 *
 * ## なぜ要るか
 *
 * 2026-08-20、北海道盤の難易度10でこれが出た。
 *
 * ```
 * 問い    自らアイヌと申告した人はおよそ何人か
 * 選択肢  [0] およそ1万3000人   [1] およそ30万人   [2] およそ1000人
 * 正解    a: 1  →  「およそ30万人」
 * 解説    「およそ**1万3000人**とされ、調査を重ねるごとに数は減っている」
 * ```
 *
 * **解説が選択肢0を説明しているのに、正解は1になっていた。**
 * 事実は合っている。**添字だけがずれている。**
 *
 * これは他のどの検査にも掛からない。
 * `check-quiz.mjs` は答えの漏れと言語の混入を見る。
 * `check-quiz-risky.mjs` は年号や最上級の形を拾う。
 * 相互レビューは**解説と答えを別々に読む**ので、突き合わせないと出ない。
 *
 * **そして、いちばん悪い壊れ方をする。**知らない人は当てずっぽうで当たることがあり、
 * **知っている人だけが確実に間違える。**「その土地をよく知っている」を選んだ人ほど
 * 損をする。
 *
 * ## 見かた
 *
 * 解説の中に**正解以外の選択肢がそのまま入っていて、正解のほうは入っていない**
 * ものを拾う。
 *
 * ### **数値の選択肢だけを見る**
 *
 * 最初は全部の選択肢で拾ったら、40枚で34件出て**ほとんどが誤検知**だった。
 * 解説が誤答に触れるのは、**正しい書き方であることが多い。**
 *
 * ```
 * usa Q17  正解=レイバーデー
 *          解説「ハロウィンとバレンタインデーは広く祝われてはいるが、
 *                有給の連邦祝日ではない」          ← 誤答を説明している。正しい
 * uk Q10   正解=スコットランド
 *          解説「アイルランド共和国は1922年に離脱した別の国」 ← 同上
 * ```
 *
 * **数値なら話が違う。**「およそ1万3000人」と「およそ30万人」は、
 * 片方を説明したら、もう片方は答えではない。**言い訳の余地がない。**
 * だから数値の選択肢に絞る。拾える範囲は狭くなるが、**出たものは本物に近い。**
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, "..", "src", "infrastructure", "content");

const only = process.argv[2];
const boards = readdirSync(contentDir)
  .filter((f) => f.endsWith(".content.json"))
  .map((f) => f.replace(".content.json", ""))
  .filter((id) => !only || id === only);

/** 比べるための正規化。区切りと空白を落とす。 */
const norm = (t) => String(t).replace(/[、。,.\s・]/g, "");

/** 短すぎる選択肢は、解説にたまたま含まれるので見ない。 */
const MIN = 4;

/**
 * **数値を含む選択肢か。**漢数字の単位(万・億・千)も数える。
 * 「およそ1万3000人」「約54km」「1902年」のような形を拾う。
 */
const hasNumber = (t) => /[0-9０-９]/.test(t) || /[一二三四五六七八九十百千万億]/.test(t);

let found = 0;
for (const id of boards) {
  const content = JSON.parse(readFileSync(join(contentDir, `${id}.content.json`), "utf8"));
  for (const [i, q] of (content.quiz ?? []).entries()) {
    const why = norm(q.f?.ja ?? "");
    if (!why) continue;
    const options = q.o.map((o) => norm(o.ja));
    const right = options[q.a];
    if (!right || right.length < MIN) continue;
    // **数値の選択肢だけを見る。**文字の選択肢は、解説が誤答に触れるのが正しい
    // 書き方であることが多く、拾っても誤検知にしかならない。
    if (!options.every(hasNumber)) continue;
    // 正解が解説に入っているなら、そもそも疑わない。
    if (why.includes(right)) continue;
    const wrongInWhy = options
      .map((o, k) => ({ o, k }))
      .filter(({ o, k }) => k !== q.a && o.length >= MIN && why.includes(o));
    if (wrongInWhy.length === 0) continue;
    found++;
    console.log(`\n${id} Q${i + 1} (d=${q.difficulty})`);
    console.log(`  問い  ${q.q.ja.slice(0, 80)}`);
    console.log(`  正解  [${q.a}] ${q.o[q.a].ja}   ← 解説に出てこない`);
    for (const { k } of wrongInWhy) console.log(`  解説が指しているのは  [${k}] ${q.o[k].ja}`);
    console.log(`  解説  ${(q.f?.ja ?? "").slice(0, 110)}`);
  }
}

console.log(
  found === 0
    ? `\n${boards.length}枚、解説と正解の食い違いなし。`
    : `\n${found}件。**解説が別の選択肢を説明しています。**添字を確かめてください。`,
);
