#!/usr/bin/env node
/**
 * 盤面や各モーダルのスクリーンショットを撮る。
 *
 * 見た目の確認のたびに `next build` → `next start` → 使い捨てのPlaywright
 * スクリプト、をやると1回2〜4分かかる。`npm run dev` を立てっぱなしにして
 * このスクリプトだけを叩けば数秒で済む。
 *
 *   npm run dev                       # 別のターミナルで立てておく
 *   npm run shot -- japan             # 手番プレイヤーを追う既定の眺め
 *   npm run shot -- japan overview    # 盤面全体
 *   npm run shot -- india event       # 青/赤マスに止まるまで自動で進める
 *   npm run shot -- bolivia quiz      # クイズマスに止まるまで自動で進める
 *   npm run shot -- japan city        # 都市に止まるまで自動で進める
 *   npm run shot -- setup             # セットアップ画面
 *
 * オプション:
 *   --port 3000       開発サーバのポート(既定 3000)
 *   --out <path>      出力先(既定 screenshots/<国>-<場面>.png)
 *   --width/--height  ビューポート(既定 1600×1000)
 *   --board           盤面だけを切り出す
 *   --motion          サイコロ演出を省略しない(既定は省略して速くする)
 */
import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

/**
 * 盤面のIDと、選ぶ画面での英語表示名。**目録から作る。**
 * 手で書いていたので、盤面を足すたびにここも直す必要があり、
 * 忘れると「知らない国です」で落ちる(何が足りないかは出ない)。
 */
const COUNTRIES = Object.fromEntries(
  JSON.parse(
    readFileSync(new URL("../src/infrastructure/content/country-index.json", import.meta.url), "utf8"),
  ).map((entry) => [entry.id, entry.name.en]),
);
const SCENES = ["follow", "overview", "event", "quiz", "city", "setup"];

function parseArgs(argv) {
  const positional = [];
  const options = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) options[key] = true;
      else {
        options[key] = next;
        i++;
      }
    } else positional.push(arg);
  }
  return { positional, options };
}

const { positional, options } = parseArgs(process.argv.slice(2));
const country = COUNTRIES[positional[0]] ? positional[0] : "japan";
const scene = SCENES.includes(positional[0])
  ? positional[0]
  : SCENES.includes(positional[1])
    ? positional[1]
    : "follow";
const port = Number(options.port ?? 3000);
const baseUrl = `http://localhost:${port}/`;
const width = Number(options.width ?? 1600);
const height = Number(options.height ?? 1000);
const outPath = options.out ?? join("screenshots", `${scene === "setup" ? "setup" : country}-${scene}.png`);

const response = await fetch(baseUrl).catch(() => null);
if (!response?.ok) {
  console.error(
    `開発サーバに繋がりません(${baseUrl})。別のターミナルで \`npm run dev\` を立ててから実行してください。` +
      "\nポートが違う場合は --port を指定します。",
  );
  process.exit(1);
}

mkdirSync(dirname(outPath), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
// サイコロ演出(1回2.3秒)を省くと、目的の場面まで一気に進む。
if (!options.motion) await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(baseUrl);

/** 進行を止めているモーダルを閉じる。閉じたら true。 */
async function dismissModal() {
  // クイズは「続ける」ボタンではなく選択肢を押さないと閉じない。
  const quizOption = page.locator(".btn.opt").first();
  if (await quizOption.isVisible().catch(() => false)) {
    await quizOption.click().catch(() => {});
    return true;
  }
  for (const [name, exact] of [
    ["Back to the rails", false],
    ["Full steam ahead", false],
    ["Continue", true],
  ]) {
    const button = page.getByRole("button", { name, exact });
    if (await button.isVisible().catch(() => false)) {
      await button.click().catch(() => {});
      return true;
    }
  }
  return false;
}

if (scene === "setup") {
  await page.getByText("Choose your journey").waitFor();
} else {
  // **札の名前そのもので選ぶ。**押しボタン全体の読み上げ名には肩の印
  // (「Country」「World」)も入るので、名前を丸ごと突き合わせると外れる。
  await page
    .locator(".ccard")
    .filter({ has: page.getByText(COUNTRIES[country], { exact: true }) })
    .first()
    .click();
  // CPUの手番は演出のぶん待たされるので、全員を人間にして手番を速く回す。
  await page.getByRole("button", { name: "Human" }).nth(1).click();
  await page.getByRole("button", { name: "Human" }).nth(2).click();
  await page.getByRole("button", { name: "Start the journey" }).click();
  await page.getByRole("button", { name: "Depart!" }).click();
  await page.waitForTimeout(500);
}

if (scene === "overview") {
  await page.getByTitle(/Whole map/).click();
  await page.waitForTimeout(1600);
}

/** 目的のマスに止まるまで自動で進める。 */
const TARGETS = {
  event: { modal: "money-event-modal", kinds: ["blue", "red"] },
  quiz: { modal: "quiz-modal", kinds: ["quiz"] },
  city: { modal: "city-modal", kinds: ["city"] },
};

if (TARGETS[scene]) {
  const { modal: wanted, kinds } = TARGETS[scene];
  let reached = false;
  for (let step = 0; step < 200 && !reached; step++) {
    const state = await page.evaluate(() => ({
      modal: document.querySelector(".modal-box")?.getAttribute("data-testid") ?? null,
      choosable: document.querySelectorAll("svg.board-svg g[data-choosable='true']").length,
      rolling: document.querySelectorAll(".dice-stage").length,
      canRoll: !(document.querySelector("#die")?.disabled ?? true),
    }));

    if (options.debug) console.error(step, JSON.stringify(state));
    if (state.modal === wanted) {
      reached = true;
      break;
    }
    if (state.modal) {
      await dismissModal();
      await page.waitForTimeout(100);
      continue;
    }
    if (state.choosable > 0) {
      // 狙いのマスが選べるならそれを選ぶ。無ければどれでもよい。
      const preferred = page.locator(
        kinds.map((k) => `svg.board-svg g[data-choosable='true'][data-node-kind='${k}']`).join(","),
      );
      const targets = (await preferred.count()) > 0 ? preferred : page.locator("svg.board-svg g[data-choosable='true']");
      const count = await targets.count();
      for (let i = 0; i < count; i++) {
        const clicked = await targets.nth(i).click({ timeout: 3000 }).then(() => true, () => false);
        if (clicked) break;
      }
      await page.waitForTimeout(100);
      continue;
    }
    if (state.rolling === 0 && state.canRoll) {
      await page.locator("#die").click().catch(() => {});
      await page.locator(".dice-stage").waitFor({ state: "detached", timeout: 8000 }).catch(() => {});
    }
    await page.waitForTimeout(100);
  }
  if (!reached) {
    console.error(`${scene} の場面に辿り着けませんでした(200手で打ち切り)。`);
    await browser.close();
    process.exit(1);
  }
  await page.waitForTimeout(400);
}

const target = options.board ? page.locator(".board-wrap") : page;
await target.screenshot({ path: outPath });
await browser.close();
console.log(outPath);
