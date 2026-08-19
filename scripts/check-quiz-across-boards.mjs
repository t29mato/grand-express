#!/usr/bin/env node
/**
 * **盤面をまたいで同じ問いが出ていないか**を見る。
 *
 *   node scripts/check-quiz-across-boards.mjs                全部の組み合わせ
 *   node scripts/check-quiz-across-boards.mjs southafrica    1枚を全部と突き合わせる
 *   node scripts/check-quiz-across-boards.mjs africa southafrica   2枚だけ
 *
 * ## なぜ要るか
 *
 * `check-quiz.mjs` は**1枚の盤面の中**しか見ない。ところが
 * **大陸の盤面と国の盤面は必ず領域が重なる。**
 *
 * 2026-08-19、南アフリカ盤の担当が難易度9として出してきた問いが、
 * **アフリカ盤のQ78と問いも答えも難易度も同じ**だった。
 *
 * ```
 * africa Q78       南アフリカの国歌は、いくつの言語の歌詞を組み込んでいるか → 5つ
 * southafrica      南アフリカの国歌は何言語で歌われるか                   → 5つ
 * ```
 *
 * 事実はどちらも正しい。**すでに出題されていることが問題**だった。
 * アフリカ盤を遊んだ人が南アフリカ盤で同じ問いに当たる。
 * **「遊べば遊ぶほどクイズが被る」**——この一連の作業が始まったきっかけの苦情そのもの。
 *
 * 手で気づけたのは、たまたま直前にアフリカ盤の相互レビューをしていたから。
 * **次は気づけない。**ペルーとボリビア、エジプトとアフリカ、ノルウェーとヨーロッパ、
 * 重なる組み合わせはこれからも増える。
 *
 * ## 見かた
 *
 * 答えが同じで、問いの語が重なっているものを拾う。**判定ではなく手がかり。**
 * 「首都はどこか」のような易しい問いは**何枚の盤面に出てもよい**ので、
 * 既定では難易度5以上だけを見る(`--all` で全部)。
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, "..", "src", "infrastructure", "content");

const args = process.argv.slice(2);
const includeEasy = args.includes("--all");
const picked = args.filter((a) => !a.startsWith("--"));

const boards = readdirSync(contentDir)
  .filter((f) => f.endsWith(".content.json"))
  .map((f) => f.replace(".content.json", ""));

for (const p of picked) {
  if (!boards.includes(p)) {
    console.error(`知らない盤面です: ${p}`);
    process.exit(2);
  }
}

/**
 * 比べるための正規化。**文字の2字組(bigram)で見る。**
 *
 * 最初は助詞で切って空白で分けていたが、**日本語には空白が無いので
 * 文がまるごと1語になり、何も拾えなかった。**作った当日に、
 * 作るきっかけになった実例(africa Q78 と南アフリカ盤の国歌)で試して気づいた。
 * **検出器は、必ず一度発火させてから信じること。**
 */
const STOP = /[はがをにへとでもやのかなねよっ、。「」『』()()・?？!！\s]/g;
function words(text) {
  const s = text.replace(STOP, "");
  const grams = new Set();
  for (let i = 0; i < s.length - 1; i++) grams.add(s.slice(i, i + 2));
  return grams;
}

/**
 * 2つの集合の重なり。**短いほうを分母にする(包含率)。**
 *
 * Jaccard(和集合を分母)だと**長さの違う2問がまったく拾えない。**
 * 実例では、長い問い(55組)と短い問い(18組)が10組を共有していて、
 * Jaccardでは0.16、包含率では0.56になった。
 * **同じことを訊いていても、片方が丁寧に書かれているだけ**という場合が多い。
 */
function overlap(a, b) {
  let hit = 0;
  for (const w of a) if (b.has(w)) hit++;
  return hit / Math.min(a.size, b.size);
}

/** 答えの文字列を揃える。「5つ」「五つ」「5」は同じものとして扱いたい。 */
function normalizeAnswer(text) {
  return text.replace(/[つ個件年語人本枚]/g, "").replace(/\s/g, "").toLowerCase();
}

const loaded = new Map();
for (const id of boards) {
  const content = JSON.parse(readFileSync(join(contentDir, `${id}.content.json`), "utf8"));
  const quiz = (content.quiz ?? [])
    .map((q, i) => ({
      n: i + 1,
      d: q.difficulty,
      q: q.q.ja,
      a: q.o[q.a].ja,
      words: words(q.q.ja),
      key: normalizeAnswer(q.o[q.a].ja),
    }))
    .filter((q) => includeEasy || q.d >= 5);
  loaded.set(id, quiz);
}

/** どの2枚を突き合わせるか。 */
let pairs = [];
if (picked.length === 2) pairs = [[picked[0], picked[1]]];
else {
  const left = picked.length === 1 ? [picked[0]] : boards;
  for (const a of left) {
    for (const b of boards) {
      if (a === b) continue;
      if (picked.length !== 1 && a >= b) continue;
      pairs.push([a, b]);
    }
  }
}

const THRESHOLD = 0.45;
let found = 0;
for (const [a, b] of pairs) {
  const hits = [];
  for (const qa of loaded.get(a)) {
    for (const qb of loaded.get(b)) {
      // **答えが違えば別の問い。**同じ語を使っていても構わない。
      if (qa.key !== qb.key) continue;
      const score = overlap(qa.words, qb.words);
      if (score < THRESHOLD) continue;
      hits.push({ qa, qb, score });
    }
  }
  if (hits.length === 0) continue;
  found += hits.length;
  console.log(`\n===== ${a} ↔ ${b}: ${hits.length}件`);
  for (const { qa, qb, score } of hits.sort((x, y) => y.score - x.score)) {
    console.log(`\n  重なり ${(score * 100).toFixed(0)}%  答えはどちらも「${qa.a}」`);
    console.log(`    ${a} Q${qa.n} (d=${qa.d})  ${qa.q}`);
    console.log(`    ${b} Q${qb.n} (d=${qb.d})  ${qb.q}`);
  }
}

console.log(
  found === 0
    ? `\n${pairs.length}組、重なりなし。`
    : `\n${found}件。**同じ人が両方を遊びます。**難しいほうから片方を差し替えてください。`,
);
