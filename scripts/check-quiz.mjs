#!/usr/bin/env node
/**
 * クイズを機械的に点検する。
 *
 *   node scripts/check-quiz.mjs            全部見る
 *   node scripts/check-quiz.mjs ibaraki    1国だけ
 *
 * ## なぜこれが要るか
 *
 * 茨城のクイズ40問には、冒頭に
 * **「都市カードと題材が重ならないようにしてある」**という約束が書いてあった。
 * ところが2026-08-09 に総当たりで確かめたところ、**4問で破られていた。**
 *
 * | | 問い | 都市カードの記述 |
 * |---|---|---|
 * | Q6 | 全国一の産出量をもつのは? → **れんこん** | 土浦「**れんこんの産出が日本一**である」 |
 * | Q18 | 茨城空港が滑走路を共用する相手は? → **航空自衛隊の基地** | 小美玉「**航空自衛隊の基地**の端に開いた」 |
 * | Q19 | 大洗のフェリーが渡る島は? → **北海道** | 大洗「**北海道へ夜行のフェリー**が出て」 |
 * | Q21 | 牛久のワイン醸造場が開かれたのは? → **1900年代** | 牛久「**1903年に**……日本初の国産ワイン」 |
 *
 * **1問ずつ読んでも出ない。**気づけたのは1件だけで、残り3件は総当たりで出た。
 * 約束が「書いてある」ことと「守られている」ことは別なので、機械で確かめる。
 *
 * ## 見ているもの
 *
 * 1. **答えの漏れ** — 正解の文字列が、その国の都市カード(tag / fact)に載っていないか
 * 2. **言語の混入** — 日本語に英字、英・西・仏に日本語が混ざっていないか
 * 3. **欠け** — 4言語のどれかが空、選択肢が3つでない、正解の添字が範囲外
 * 4. **正解の位置の偏り** — 0/1/2 が散っているか
 * 5. **題材の偏り** — 同じ語を含む問いが何問あるか
 *
 * 1 は**短い答えだと誤検知する**(「湖」「城」など一般名詞)。
 * 出たものは人が見て判断すること。**これは判定ではなく手がかり。**
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, "..", "src", "infrastructure", "content");
const ALL = ["bolivia", "japan", "india", "france", "world", "ibaraki"];

const only = process.argv[2];
const countries = only ? [only] : ALL;
for (const c of countries) {
  if (!existsSync(join(contentDir, `${c}.content.json`))) {
    console.error(`知らない国です: ${c}(${ALL.join(" / ")})`);
    process.exit(2);
  }
}

const LANGS = ["en", "es", "fr", "ja"];
const CJK = /[぀-ヿ一-鿿]/;
const LATIN = /[A-Za-z]{3,}/g;
/** 日本語に出てもよい英字(単位・固有の略号)。 */
const ALLOWED = new Set(["km", "kg", "jr", "gps"]);
/** 答えが短すぎると一般名詞に当たるので、この長さ未満は漏れ判定から外す。 */
const MIN_ANSWER = 3;
/** どのカードにも出るので、突き合わせの手がかりにならない語。 */
const GENERIC = new Set([
  "世界", "日本", "国内", "地方", "都市", "有名", "最大", "最長", "最初", "理由", "特徴",
  "以来", "現在", "以上", "以下", "場所", "名前", "呼ば", "知ら", "使わ", "作ら", "建て",
]);

let problems = 0;
for (const country of countries) {
  const content = JSON.parse(readFileSync(join(contentDir, `${country}.content.json`), "utf8"));
  const quiz = content.quiz ?? [];
  const cities = Object.values(content.cities ?? {});
  const cards = cities.map((c) => [c.n.ja, `${c.tag?.ja ?? ""}${c.fact?.ja ?? ""}`]);

  console.log(`\n===== ${country}(${quiz.length}問 / 都市${cities.length}）`);

  // 1. 答えの漏れ。
  //
  // **正解がカードに載っているだけでは足りない。**「アフリカ」「インド」のような語は
  // 都市カードに出て当たり前で、それを全部挙げると雑音になる(初版は6件が誤検知だった)。
  // そこで**問いの側の語も同じカードに載っているか**を見る。
  // 「1961年まで属していた国は? → ポルトガル」がゴアのカードに当たるのは、
  // カードに「ポルトガル」と「1961年」の両方があるからで、これは本物の漏れである。
  let leaks = 0;
  for (const [i, x] of quiz.entries()) {
    const ans = x.o?.[x.a]?.ja ?? "";
    if (ans.length < MIN_ANSWER) continue;
    // 問いから、特徴のある語(漢字・カタカナの連なり、年号)を取る
    // その盤面のカードに広く出る語は手がかりにならない(世界一周の「アフリカ」、
    // フランスの「フランス」など)。**カードの2割を超えて出る語は捨てる。**
    // 固定の除外表だと盤面ごとに書き足すことになるので、数えて決める。
    const spread = Math.max(2, Math.floor(cards.length * 0.2));
    const qWords = [
      ...new Set([
        ...(x.q.ja.match(/[一-鿿]{2,}|[ァ-ヴー]{3,}|[0-9]{3,4}年/g) ?? []),
      ]),
    ].filter((w) => !GENERIC.has(w) && cards.filter(([, t]) => t.includes(w)).length <= spread);
    const hit = cards
      .filter(([, text]) => text.includes(ans) && qWords.some((w) => text.includes(w)))
      .map(([name]) => name);
    if (hit.length) {
      leaks++;
      problems++;
      const shared = qWords.filter((w) => cards.some(([n, t]) => hit.includes(n) && t.includes(w)));
      console.log(`  漏れ? Q${i + 1} 正解「${ans}」が ${hit.join("/")} のカードに(問いとも「${shared.join("・")}」で一致)`);
    }
  }
  if (!leaks) console.log("  答えの漏れ: なし");

  // 2〜3. 言語の混入と欠け
  let lang = 0;
  for (const [i, x] of quiz.entries()) {
    const fields = [["q", x.q], ["f", x.f], ...x.o.map((o, j) => [`o${j}`, o])];
    for (const [tag, tr] of fields) {
      for (const m of String(tr.ja ?? "").match(LATIN) ?? []) {
        if (ALLOWED.has(m.toLowerCase())) continue;
        lang++;
        problems++;
        console.log(`  混入 Q${i + 1} ${tag} 日本語に英字「${m}」: ${tr.ja}`);
      }
      for (const l of ["en", "es", "fr"]) {
        if (CJK.test(String(tr[l] ?? ""))) {
          lang++;
          problems++;
          console.log(`  混入 Q${i + 1} ${tag} ${l} に日本語: ${tr[l]}`);
        }
      }
      for (const l of LANGS) {
        if (!String(tr[l] ?? "").trim()) {
          lang++;
          problems++;
          console.log(`  欠け Q${i + 1} ${tag} ${l} が空`);
        }
      }
    }
    if (x.o.length !== 3) {
      lang++;
      problems++;
      console.log(`  欠け Q${i + 1} 選択肢が${x.o.length}個`);
    }
    if (!(x.a >= 0 && x.a < x.o.length)) {
      lang++;
      problems++;
      console.log(`  欠け Q${i + 1} 正解の添字が範囲外`);
    }
  }
  if (!lang) console.log("  言語の混入・欠け: なし");

  // 4. 正解の位置。
  //
  // **偏っていても不具合ではない。**出題時に `visibleOptionOrder()` が選択肢を混ぜ直す
  // (`game-store-formatters.ts`「正解が先頭に固定されないよう、最後にもう一度並びを混ぜる」)。
  // ボリビアと日本は全問が添字0だが、遊ぶ人には毎回ちがう順で出る。
  // 数字は参考として出すだけで、問題としては数えない。
  const pos = [0, 0, 0];
  for (const x of quiz) pos[x.a]++;
  console.log(`  正解の位置(参考。出題時に混ぜられる): 0=${pos[0]} 1=${pos[1]} 2=${pos[2]}`);

  // 5. 題材の偏り。問いと選択肢に出る語を数える
  const counts = new Map();
  for (const x of quiz) {
    const text = x.q.ja + x.o.map((o) => o.ja).join("");
    for (const w of new Set(text.match(/[一-鿿]{2,}/g) ?? [])) {
      if (w.length < 2 || ["茨城", "日本", "全国", "県内", "地方"].includes(w)) continue;
      counts.set(w, (counts.get(w) ?? 0) + 1);
    }
  }
  const top = [...counts].filter(([, n]) => n >= 3).sort((a, b) => b[1] - a[1]);
  if (top.length) console.log(`  3問以上に出る語: ${top.map(([w, n]) => `${w}×${n}`).join(" ")}`);
}

console.log(problems === 0 ? "\n見つかった問題はありません。" : `\n${problems}件、見てください(短い答えは誤検知します)。`);
process.exit(problems === 0 ? 0 : 1);
