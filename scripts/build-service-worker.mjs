/**
 * `next build` のあとに走り、`out/sw.js` を書き出す(`package.json` の postbuild)。
 *
 * ## なぜ生成するのか
 *
 * `output: "export"` の Next は Service Worker を面倒みてくれない。
 * かといって `public/sw.js` に手書きで置くと、**プリキャッシュの一覧を
 * 人間が保守することになる。**資産の名前は中身のハッシュ付きで毎回変わるので、
 * 手で書けば必ずずれる。**焼き上がった `out/` を見て一覧を起こす**のが唯一
 * ずれない方法なので、ビルドの後ろにつないでいる。
 *
 * ## 版(VERSION)の作り方 ― ここが肝
 *
 * `0.59.0+ab12cd34` の形。後半は **`out/` の中身すべてのハッシュ**。
 *
 * - 中身が1バイトでも変われば別の版になる → 古いキャッシュが確実に捨てられる
 * - 中身が同じなら同じ版 → 何も変わっていないのに「更新があります」と
 *   嘘をつかない
 *
 * `package.json` の版だけでは足りない。**版を上げ忘れた修正**が出たときに
 * 古いキャッシュを使い続けてしまう。逆にハッシュだけでも足りない。
 * 画面のフッターに出る版と揃わないと、遊ぶ人に説明できない。だから両方を繋ぐ。
 *
 * ## 効くのは GitHub Pages 側だけ(2026-08-26 実測)
 *
 * **Vercel の鏡(grand-express.vercel.app)には sw.js が乗らない。**
 * manifest もアイコンも200で返るのに、これだけ404になる。
 *
 * `vercel.json` で `buildCommand: "npm run build"` を指定して postbuild を
 * 通そうとしたが、**直らなかった。**鏡のフッターがその修正のコミット
 * (d2b55cd)を出していたので再デプロイ自体はされており、原因は
 * 「postbuild が走っていないこと」ではない。Vercel の Next ビルダーは
 * **`next build` のあとに `out/` へ足したファイルを配信物に含めない。**
 * manifest は Next が作るもの、アイコンは `public/` のもので、
 * どちらも Next が知っているから乗る ― sw.js だけがどちらでもない。
 *
 * 直すなら「1回焼いて sw.js を `public/` に置き、もう1回焼く」の2度焼きに
 * なる。**正規のURLは github.io 側なので、そこまではしていない。**
 * 鏡では Service Worker が入らないぶん、オフラインにも更新の報せにもならず、
 * 登録の失敗は `service-worker-update.tsx` が黙って飲み込む。
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, basename, extname } from "node:path";
import { createHash } from "node:crypto";

const OUT = "out";
const BASE = process.env.BASE_PATH ?? "";
const { version } = JSON.parse(readFileSync("package.json", "utf8"));

function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...walk(p));
    else found.push(p);
  }
  return found;
}

const files = walk(OUT).sort();
if (files.length === 0) throw new Error("out/ が空。先に next build を走らせること");

/**
 * ファイルの置き場所から、ブラウザが実際に投げるURLへ直す。
 * `trailingSlash: true` で焼いているので `foo/index.html` は `/foo/` として
 * 要求される。**ここを間違えるとキャッシュに入れても当たらない。**
 */
function urlFor(file) {
  const rel = relative(OUT, file).split("\\").join("/");
  if (basename(rel) === "index.html") {
    const dir = rel.slice(0, -"index.html".length);
    return `${BASE}/${dir}`;
  }
  return `${BASE}/${rel}`;
}

/** HTMLが読み込む資産を拾う。起動に要るものは、これで漏れなく集まる。 */
const bootAssets = new Set();
for (const file of files.filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/\/_next\/[A-Za-z0-9._/-]+?\.(?:js|css)/g)) bootAssets.add(BASE + m[0]);
}

/**
 * プリキャッシュに入れるもの。
 *
 * **盤面47枚ぶんの塊(1枚0.5〜0.7MB、合わせて24MB)は入れない。**
 * 全部入れると初回に29MBを落とすことになり、携帯の回線では
 * 「入れた直後に固まるアプリ」になる。起動に要るぶんだけを先に取り、
 * 盤面は**開いたものから貯める**(下の runtime キャッシュ)。
 */
const precache = new Set([`${BASE}/`]);
for (const file of files) {
  const ext = extname(file);
  const url = urlFor(file);
  if (ext === ".html" || ext === ".txt" || ext === ".ico" || ext === ".webmanifest") precache.add(url);
  if (url.startsWith(`${BASE}/icons/`)) precache.add(url);
}
for (const a of bootAssets) precache.add(a);

const precacheList = [...precache].sort();

/** 版の後半。**out/ の中身そのもの**から取る。名前だけでは不足(HTMLは名前が変わらない)。 */
const digest = createHash("sha256");
for (const file of files) {
  digest.update(relative(OUT, file));
  digest.update(readFileSync(file));
}
const VERSION = `${version}+${digest.digest("hex").slice(0, 8)}`;

const precacheBytes = precacheList.reduce((sum, url) => {
  const rel = url.slice(BASE.length);
  const file = join(OUT, rel.endsWith("/") ? `${rel}index.html` : rel);
  try {
    return sum + statSync(file).size;
  } catch {
    return sum;
  }
}, 0);

const sw = `/*
 * World Express の Service Worker。
 * **これは生成物。** scripts/build-service-worker.mjs が焼く。直接いじらないこと。
 */
const VERSION = ${JSON.stringify(VERSION)};
const BASE = ${JSON.stringify(BASE)};
const PRECACHE = ${JSON.stringify(precacheList, null, 2)};

const PRECACHE_NAME = "we-precache-" + VERSION;
const RUNTIME_NAME = "we-runtime-" + VERSION;

/**
 * 入れる。**ここで skipWaiting は呼ばない。**
 * 呼ぶと、遊んでいる最中に裏で中身が入れ替わり、古い画面と新しい資産が
 * 混ざって壊れる。新しい版は「待機」のまま置いておき、
 * 画面が出す「更新」を押してもらってから入れ替える。
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PRECACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
});

/** 古い版のキャッシュを捨てる。版が違えば中身が混ざらないよう丸ごと捨てる。 */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((n) => n.startsWith("we-") && n !== PRECACHE_NAME && n !== RUNTIME_NAME)
          .map((n) => caches.delete(n))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  const data = event.data || {};
  // 画面の「更新」が押された。ここで初めて入れ替わる。
  if (data.type === "SKIP_WAITING") self.skipWaiting();
  // 画面が「待機している版は何番か」を訊いてくる。表示を揃えるため。
  if (data.type === "GET_VERSION" && event.ports && event.ports[0]) {
    event.ports[0].postMessage(VERSION);
  }
});

const inScope = (url) =>
  url.origin === self.location.origin && url.pathname.startsWith(BASE + "/");

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (!inScope(url)) return;

  // 画面そのものの要求。キャッシュにあれば即返す(これでオフラインでも起動する)。
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(PRECACHE_NAME);
        const hit = await cache.match(url.pathname);
        if (hit) return hit;
        try {
          return await fetch(request);
        } catch (err) {
          // 圏外で、行ったことのない画面。入口を返しておけば遊びは続けられる。
          const home = await cache.match(BASE + "/");
          if (home) return home;
          throw err;
        }
      })()
    );
    return;
  }

  /**
   * 資産。**\`_next/static/\` の下は名前に中身のハッシュが入っている**ので、
   * 名前が同じなら中身も同じ。取りに行かずキャッシュから返してよい。
   * 無ければ取ってきて貯める ― 盤面はこれで、一度開けば圏外でも遊べる。
   */
  event.respondWith(
    (async () => {
      const precached = await caches.match(request, { cacheName: PRECACHE_NAME });
      if (precached) return precached;

      const runtime = await caches.open(RUNTIME_NAME);
      const hit = await runtime.match(request);
      if (hit) return hit;

      const response = await fetch(request);
      // 失敗や他所からの応答は貯めない(壊れた中身を焼き付けないため)
      if (response.ok && response.type === "basic") {
        runtime.put(request, response.clone());
      }
      return response;
    })()
  );
});
`;

writeFileSync(join(OUT, "sw.js"), sw);

const mb = (n) => (n / 1048576).toFixed(2);
console.log(`sw.js を書いた`);
console.log(`  版          ${VERSION}`);
console.log(`  基準パス    ${BASE || "(直下)"}`);
console.log(`  先取り      ${precacheList.length}件 ${mb(precacheBytes)} MB`);
console.log(`  あとで貯める ${files.length - precacheList.length}件 ${mb(files.reduce((s, f) => s + statSync(f).size, 0) - precacheBytes)} MB`);
