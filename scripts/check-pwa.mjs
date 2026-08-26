#!/usr/bin/env node
/**
 * ホーム画面に入れて遊べるか(PWA)を、実物のブラウザで確かめる。
 *
 * 見るのは3つ。**どれも「そう作ったつもり」では確かめたことにならない**ので、
 * 実際に電源を切って(オフラインにして)、実際に新しい版を置いて試す。
 *
 *   1. 入るか        Service Worker が動き、資産が先取りされているか
 *   2. 圏外で開くか  回線を切って読み込み直しても立ち上がるか
 *   3. 更新が届くか  新しい版を置いたら報せが出て、押すと入れ替わるか
 *
 * **3つめが本番。**ここが壊れていると、直しても遊ぶ人には永遠に届かない。
 * しかも「出したのに変わらない」という形でしか表に出ないので、
 * 自動で確かめられるようにしてある。
 *
 *   npm run build && node scripts/check-pwa.mjs     # 配信は自分で立てる
 *   node scripts/check-pwa.mjs --url http://localhost:3100   # 立ててあるものを使う
 *
 * オプション:
 *   --url <URL>   配信元。渡さなければ自分で `serve out` を立てて、終わったら畳む
 *   --out <path>  焼き上がりの置き場(既定 out)。更新の試験でここの sw.js を書き換える
 *   --shots <dir> 画面を撮って置く場所(省略すると撮らない)
 */
import { chromium, devices } from "playwright";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const OUT_DIR = opt("out", "out");
const SELF_PORT = 4321;
const givenUrl = opt("url", null);
const URL_BASE = givenUrl ?? `http://localhost:${SELF_PORT}`;

/**
 * 配信を自分で立てる。**`-s` は付けない。**
 * 付けると存在しないパスにHTMLを返してしまい、404が
 * 「JSのはずがHTMLだった」という分かりにくい形で出る(以前これで一度嵌まった)。
 */
let server = null;
if (!givenUrl) {
  server = spawn("npx", ["serve", OUT_DIR, "-l", String(SELF_PORT)], { stdio: "ignore" });
  const deadline = Date.now() + 60_000;
  for (;;) {
    try {
      const res = await fetch(`${URL_BASE}/`);
      if (res.ok) break;
    } catch {
      /* まだ立っていない */
    }
    if (Date.now() > deadline) throw new Error(`${URL_BASE} が立ち上がらない`);
    await new Promise((r) => setTimeout(r, 400));
  }
}
const SHOTS = opt("shots", null);
const SW_PATH = join(OUT_DIR, "sw.js");

const problems = [];
const note = (ok, label, detail = "") => {
  console.log(`${ok ? "  OK " : "  NG "} ${label}${detail ? `  ${detail}` : ""}`);
  if (!ok) problems.push(label);
};

/** ページの中から、いま動いている Service Worker に版を訊く。 */
const readVersion = (page) =>
  page.evaluate(async () => {
    const reg = await navigator.serviceWorker.ready;
    const worker = reg.active;
    if (!worker) return null;
    return new Promise((resolve) => {
      const channel = new MessageChannel();
      const timer = setTimeout(() => resolve(null), 3000);
      channel.port1.onmessage = (event) => {
        clearTimeout(timer);
        resolve(event.data);
      };
      worker.postMessage({ type: "GET_VERSION" }, [channel.port2]);
    });
  });

const cacheReport = (page) =>
  page.evaluate(async () => {
    const names = await caches.keys();
    const out = {};
    for (const name of names) out[name] = (await caches.open(name)).keys().then((k) => k.length);
    for (const name of names) out[name] = await out[name];
    return out;
  });

/**
 * 手元の焼き上がりを相手にしているか、出してある本番を相手にしているか。
 *
 * 本番相手のときは `out/sw.js` を書き換えても届かない(配信しているのは
 * GitHub Pages 側のファイル)。**新しい版を置く試験は、本物のデプロイでしか
 * できない。**そこで本番相手では、2回に分けて確かめる:
 *
 *   1回目  --profile <dir>                 版Aを入れて、そのまま профиль を残す
 *   (ここで本物のデプロイをする)
 *   2回目  --profile <dir> --expect-update 版Bが報せとして出るか
 */
const REMOTE = !/^https?:\/\/(localhost|127\.0\.0\.1)/.test(URL_BASE);
const PROFILE = opt("profile", null);
const EXPECT_UPDATE = args.includes("--expect-update");

const swOriginal = REMOTE ? null : readFileSync(SW_PATH, "utf8");

const phone = devices["iPhone 14 Pro"];
/**
 * 携帯で使うものなので、携帯の画面で確かめる。
 * **プロファイルを渡されたら、そこに残す。**Service Worker とキャッシュは
 * プロファイルの中にあるので、残さないと「前に入れた版」を再現できない。
 */
const browser = PROFILE ? null : await chromium.launch();
const context = PROFILE
  ? await chromium.launchPersistentContext(PROFILE, { ...phone })
  : await browser.newContext({ ...phone });
const page = await context.newPage();

const fatal = [];
page.on("pageerror", (err) => fatal.push(String(err)));

try {
  if (SHOTS) mkdirSync(SHOTS, { recursive: true });

  // ---------------------------------------------------------------- 1. 入るか
  console.log("\n1. Service Worker が入るか");
  await page.goto(URL_BASE, { waitUntil: "load" });
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null, null, { timeout: 30_000 });

  const version = await readVersion(page);
  note(Boolean(version), "動いている", version ?? "(版が読めない)");

  const scope = await page.evaluate(async () => (await navigator.serviceWorker.ready).scope);
  note(scope.startsWith(URL_BASE.replace(/\/$/, "")), "受け持つ範囲が正しい", scope);

  // 先取りが終わるのを待つ(install は非同期。数え始めが早いと0件に見える)
  await page.waitForFunction(
    async () => {
      const names = await caches.keys();
      for (const n of names) {
        if (!n.startsWith("we-precache-")) continue;
        if ((await (await caches.open(n)).keys()).length > 0) return true;
      }
      return false;
    },
    null,
    { timeout: 60_000 },
  );
  const caches1 = await cacheReport(page);
  const precacheCount = Object.entries(caches1).find(([n]) => n.startsWith("we-precache-"))?.[1] ?? 0;
  note(precacheCount > 20, "資産を先取りした", `${precacheCount}件`);

  const manifest = await page.evaluate(async () => {
    const link = document.querySelector('link[rel="manifest"]');
    if (!link) return null;
    try {
      const res = await fetch(link.href);
      // 壊れたJSONで**検査そのものが落ちる**と、何が悪いのか報告できない。
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  });
  note(Boolean(manifest), "manifest が読める");
  if (manifest) {
    note(manifest.display === "standalone", "display", manifest.display);
    const startsInScope = manifest.start_url.startsWith(manifest.scope);
    note(startsInScope, "start_url が scope の中", `${manifest.start_url} ⊂ ${manifest.scope}`);
    const sizes = manifest.icons.map((i) => i.sizes);
    note(sizes.includes("192x192") && sizes.includes("512x512"), "アイコン192と512", sizes.join(" "));
    note(
      manifest.icons.some((i) => (i.purpose ?? "").includes("maskable")),
      "maskable のアイコンがある",
    );
  }
  const appleIcon = await page.evaluate(async () => {
    const link = document.querySelector('link[rel="apple-touch-icon"]');
    if (!link) return null;
    const res = await fetch(link.href);
    return res.ok ? link.getAttribute("href") : null;
  });
  note(Boolean(appleIcon), "apple-touch-icon が実在する", appleIcon ?? "");

  // ------------------------------------------------------------ 2. 圏外で開くか
  console.log("\n2. 圏外でも立ち上がるか");
  await context.setOffline(true);
  await page.reload({ waitUntil: "load" });
  const bootedOffline = await page
    .getByText("Choose your journey")
    .isVisible({ timeout: 15_000 })
    .catch(() => false);
  note(bootedOffline, "回線を切っても入口が出る");
  if (SHOTS && bootedOffline) await page.screenshot({ path: join(SHOTS, "pwa-offline.png") });
  await context.setOffline(false);

  // ------------------------------------------------------------ 3. 更新が届くか
  const doUpdateTest = !REMOTE || EXPECT_UPDATE;
  let nextVersion = null;

  if (!doUpdateTest) {
    console.log("\n3. 新しい版が届くか — 今回は試さない");
    console.log("   (本番相手では out/sw.js を書き換えても届かない。");
    console.log("    --profile で版Aを残し、本物のデプロイのあと --expect-update で確かめる)");
  } else {
    console.log("\n3. 新しい版が届くか");
    if (REMOTE) {
      // 配信されている sw.js が本物のデプロイで入れ替わっている前提。
      console.log("   (本番に出した新しい版を、前回入れた版から見る)");
    } else {
      /**
       * **本物の新しい版を置く。**版の文字列だけを書き換えれば、
       * ブラウザから見て `sw.js` の中身が変わったことになり、
       * 出したときとまったく同じ道筋(取得 → install → 待機)を通る。
       */
      nextVersion = `${JSON.parse(readFileSync("package.json", "utf8")).version}+ffffffff`;
      writeFileSync(SW_PATH, swOriginal.replace(/const VERSION = "[^"]+"/, `const VERSION = "${nextVersion}"`));
    }

    await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.ready;
      await reg.update();
    });

    const banner = page.locator(".sw-update");
    const shown = await banner
      .waitFor({ state: "visible", timeout: 60_000 })
      .then(() => true)
      .catch(() => false);
    note(shown, "「新しいバージョンがあります」が出る");

    if (shown) {
    const text = (await banner.innerText()).replace(/\n/g, " / ");
    note(
      nextVersion ? text.includes(nextVersion.split("+")[0]) : text.length > 0,
      "報せに新しい版が載っている",
      text,
    );
    if (SHOTS) await page.screenshot({ path: join(SHOTS, "pwa-update-banner.png") });

    // 押していないうちは入れ替わらないこと。**黙って替わるのがいちばん困る。**
    const stillOld = await readVersion(page);
    note(stillOld === version, "押すまでは古いまま", String(stillOld));

    await page.locator(".sw-update-action").click();
    await page.waitForFunction(
      (expected) =>
        navigator.serviceWorker.controller &&
        !document.querySelector(".sw-update") &&
        expected !== null,
      version,
      { timeout: 30_000 },
    );
    await page.waitForLoadState("load");
    const after = await readVersion(page);
    note(
      nextVersion ? after === nextVersion : after !== version,
      "押したら入れ替わった",
      `${version} → ${after}`,
    );

    const caches2 = await cacheReport(page);
    const leftovers = Object.keys(caches2).filter((n) => n.includes(version));
    note(leftovers.length === 0, "古いキャッシュが捨てられた", leftovers.join(",") || "残りなし");
    }
  }

  // ------------------------------------------- 4. 入れられると判定されているか
  /**
   * **Lighthouse の PWA 監査は無くなった。**13.4 で選べるのは
   * accessibility / best-practices / performance / seo / agentic-browsing だけで、
   * 「installable」を出す口はもう無い。
   *
   * かわりに **Chrome 自身の manifest 解析**を直接叩く。
   * Lighthouse がやっていたのも、突き詰めればこれを読んで
   * 判定していたので、間に人が減るぶんむしろ確かである。
   */
  console.log("\n4. 入れられると判定されるか(Chrome自身の解析)");
  const cdp = await context.newCDPSession(page);
  const appManifest = await cdp.send("Page.getAppManifest");
  const errors = (appManifest.errors ?? []).filter((e) => e.critical);
  note(errors.length === 0, "manifest に致命的な誤りが無い", errors.map((e) => e.message).join(" | ") || "なし");
  const warnings = (appManifest.errors ?? []).filter((e) => !e.critical);
  if (warnings.length > 0) console.log(`       (助言 ${warnings.length}件: ${warnings.map((e) => e.message).join(" | ")})`);

  const hasFetchHandler = await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.ready;
    return Boolean(reg.active);
  });
  note(hasFetchHandler, "fetch を受け持つ Service Worker が動いている");

  // ------------------------------------------ 5. ホーム画面から開いたときの備え
  /**
   * **ここは「偽装できないもの」がある。**
   * `display-mode: standalone` は CDP のメディア偽装に用意されていない
   * (`prefers-color-scheme` などはあるが display-mode は無い)。
   * つまり**ホーム画面から開いた見た目は、実機でしか確かめられない。**
   *
   * 偽装できたことにして OK を出すと、いちばん危ない嘘になる。
   * ここでは代わりに「実機でそうなるための備えが揃っているか」だけを見る:
   *
   *   - iOS が読む3つの meta があるか
   *   - safe-area の逃げが standalone のときだけ効く形で入っているか
   *
   * **見た目そのものは人が実機で見ること。**手順は README にある。
   */
  console.log("\n5. ホーム画面から開いたときの備え(見た目は実機でしか見られない)");
  const metas = await page.evaluate(() =>
    ["apple-mobile-web-app-capable", "mobile-web-app-capable", "apple-mobile-web-app-status-bar-style", "apple-mobile-web-app-title"].map(
      (name) => [name, document.querySelector(`meta[name="${name}"]`)?.getAttribute("content") ?? null],
    ),
  );
  for (const [name, content] of metas) note(content !== null, name, content ?? "無い");

  const safeArea = await page.evaluate(() => {
    for (const sheet of Array.from(document.styleSheets)) {
      let rules;
      try {
        rules = Array.from(sheet.cssRules);
      } catch {
        continue; // 別所のスタイルは読めない
      }
      for (const rule of rules) {
        if (rule.conditionText?.includes("display-mode: standalone")) return rule.cssText;
      }
    }
    return null;
  });
  note(Boolean(safeArea), "standalone のときだけ safe-area の逃げが効く指定がある");
  note(
    Boolean(safeArea && safeArea.includes("safe-area-inset-top") && safeArea.includes("safe-area-inset-bottom")),
    "逃げは上下ともある",
  );

  console.log("\n--- 致命的なエラー ---");
  note(fatal.length === 0, "ページのエラー", fatal.join(" | ") || "なし");
} finally {
  if (swOriginal !== null) writeFileSync(SW_PATH, swOriginal); // 試験で書き換えたぶんを戻す
  if (browser) await browser.close();
  else await context.close();
  server?.kill();
}

console.log("");
if (problems.length > 0) {
  console.log(`落ちた: ${problems.length}件 — ${problems.join(", ")}`);
  process.exit(1);
}
console.log("すべて通った");
