/**
 * クイズの中で**裏取りを間違えやすい問い**だけを抜き出す。
 *
 * ## なぜ要るか
 *
 * クイズを3倍にする作業(2026-08-14)で、**難易度9〜10に事実の誤りが紛れ込んだ。**
 * あの層は「その土地をよく知っている」を選んだ人にしか出ないので、
 * **間違いに気づく人がほとんどいない。**実際に出たもの:
 *
 * ```
 * セドナを「準惑星」としていた        IAUが認めているのは5天体だけ。セドナは候補
 * 富士山の最大瞬間風速 91.0m/s を1942年 正しくは1966年9月25日
 * 万葉集を「日本最古の書物」          正しくは現存最古の和歌集(最古の書物は古事記)
 * ```
 *
 * 3件とも**年号・数値・「最初の/最大の」**を含んでいた。全問を目で読むのは高くつくので、
 * その形をした問いだけを機械で拾う。
 *
 * ## 使い方
 *
 * ```
 * node scripts/check-quiz-risky.mjs <国>        焼き上がりから拾う
 * node scripts/check-quiz-risky.mjs <国> --all  難易度7未満も含める
 * ```
 *
 * **これが黙っても「誤りが無い」ことにはならない。**拾えるのは形だけである
 * (memory: detector-absence-not-evidence)。難易度9〜10は結局1問ずつ当たること。
 */
import { readFileSync } from "node:fs";

const [, , countryId, ...flags] = process.argv;
if (!countryId) {
  console.error("使い方: node scripts/check-quiz-risky.mjs <国> [--all]");
  process.exit(1);
}
const includeEasy = flags.includes("--all");

const path = `src/infrastructure/content/${countryId}.content.json`;
let content;
try {
  content = JSON.parse(readFileSync(path, "utf8"));
} catch {
  console.error(`${path} が読めません。焼いてから回してください。`);
  process.exit(1);
}

/** 拾う形。ここに無いものは拾えない。 */
const PATTERNS = [
  { name: "年号", re: /\b(1[0-9]{3}|20[0-9]{2})\s*年|\b(1[0-9]{3}|20[0-9]{2})\b/ },
  { name: "最上級", re: /最古|最初|最大|最長|最高|最も|唯一|初めて|世界一|屈指/ },
  { name: "数値", re: /[0-9]+(\.[0-9]+)?\s*(m|km|mm|メートル|キロ|人|件|種|文字|語|州|県|個|つ|%|パーセント)/ },
  { name: "分類・定義", re: /とされ|に分類|の定義|正式に|公式に|認定|登録/ },
  // **公的な分類の名前。**セドナを「準惑星」と呼んでいた誤りは、上の4つでは拾えなかった
  // (年号も数値も最上級も入っていなかった)。**穴を埋めるために足した。**
  // この種の語は「正式にそう分類されているか」を確かめないまま書かれやすい。
  {
    name: "公的な分類",
    re: /準惑星|惑星|衛星|世界遺産|文化遺産|自然遺産|国立公園|国定公園|語族|公用語|絶滅危惧|天然記念物|重要文化財|国宝|原産地呼称/,
  },
];

const quiz = content.quiz ?? [];
const target = quiz
  .map((q, i) => ({ q, i }))
  .filter(({ q }) => includeEasy || q.difficulty >= 7);

let shown = 0;
console.log(`===== ${countryId}(全${quiz.length}問 / 見る対象 ${target.length}問)`);
for (const { q, i } of target) {
  const ja = `${q.q.ja} ${q.o.map((o) => o.ja).join(" ")}`;
  const hits = PATTERNS.filter((p) => p.re.test(ja)).map((p) => p.name);
  if (hits.length === 0) continue;
  shown++;
  console.log(`\n  Q${i + 1} d=${q.difficulty} [${hits.join("・")}]`);
  console.log(`    ${q.q.ja}`);
  console.log(`    → ${q.o[q.a].ja}`);
}

console.log(
  `\n${shown}問。**この形をしたものは1問ずつ裏を取ること。**` +
    `\n拾えるのは形だけで、これが黙っても誤りが無いことにはならない。`,
);
