#!/usr/bin/env node
/**
 * Phase 3 (docs/90-migration/02-wbs.md): legacy/grand-express.html に埋め込まれた
 * コンテンツデータ(都市・路線・アイテム・クイズ・UI文言・月名)を、コードを一切
 * 書き換えずに機械的に抽出するワンショット移行スクリプト。
 *
 * 手法: legacy側のデータ定義部分(BOLIVIA/JAPAN/UI/MONTHS)はDOM/ブラウザAPIに
 * 依存しない純粋なJavaScriptのオブジェクトリテラルなので、その部分だけを切り出して
 * Node上でそのままrequireし、実際のJSオブジェクトとして取り出す。手動転記による
 * ヒューマンエラーを避けるため(ADR-0007)。
 *
 * 各国データ中の `_t("en|es|fr|ja")` は読み込み時点で既に {e,s,f,j} という
 * 4言語オブジェクトに展開されているため、それを再帰的に見つけて {en,es,fr,ja}
 * に変換し、そのままcontent JSONに埋め込む(このプロジェクトではコンテンツの
 * 翻訳文字列はnext-intlへは分離せず、コンテンツJSON内にインラインで持たせる
 * 実用的な簡略化を採用している。UIチロム文言のみnext-intl化する)。
 *
 * `run:()=>{...}` のような関数値(季節イベント・厄災の効果ロジック)は
 * JSON化の対象外(意図的に落とす)。それらの意味(どの地方に何%の補正がかかるか等)は
 * `src/infrastructure/content/country-content-mapper.ts` に人手で移植している
 * (legacyソースを読んで書き起こしたもの。原文は docs/90-migration 配下を参照)。
 *
 * 実行: node scripts/extract-legacy-content.mjs
 * 出力: src/infrastructure/content/raw/{bolivia,japan,ui,months}.raw.json
 */
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { applyContentOverrides } from "./content-overrides/index.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const legacyPath = join(__dirname, "..", "legacy", "grand-express.html");
const contentDir = join(__dirname, "..", "src", "infrastructure", "content");
const messagesDir = join(__dirname, "..", "src", "i18n", "messages");
mkdirSync(contentDir, { recursive: true });
mkdirSync(messagesDir, { recursive: true });

const html = readFileSync(legacyPath, "utf8");

const startMarker = '"use strict";';
const endMarker = "const COUNTRIES={bolivia:BOLIVIA,japan:JAPAN};";
const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);
if (startIdx === -1 || endIdx === -1) {
  throw new Error(
    "legacy/grand-express.html の構造が変わっています。抽出範囲のマーカーを見直してください。",
  );
}
const dataSection = html.slice(startIdx + startMarker.length, endIdx);

const sandboxSource = `${dataSection}\nmodule.exports = { UI, MONTHS, BOLIVIA, JAPAN };\n`;

const tmpDir = mkdtempSync(join(tmpdir(), "grand-express-extract-"));
const tmpFile = join(tmpDir, "legacy-data.cjs");
writeFileSync(tmpFile, sandboxSource, "utf8");

const require = createRequire(import.meta.url);
const { UI, MONTHS, BOLIVIA, JAPAN } = require(tmpFile);

/** `{e,s,f,j}` (すべて文字列) の形をした `_t()` の結果かどうかを判定する。 */
function isTranslationLeaf(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const keys = Object.keys(value).sort().join(",");
  return (
    keys === "e,f,j,s" &&
    ["e", "s", "f", "j"].every((k) => typeof value[k] === "string")
  );
}

function toLocaleObject(value) {
  return { en: value.e, es: value.s, fr: value.f, ja: value.j };
}

/** 関数値を除去しつつ、翻訳リーフを {en,es,fr,ja} に変換する再帰変換。 */
function transform(value) {
  if (typeof value === "function") return undefined;
  if (Array.isArray(value)) {
    return value.map(transform).filter((v) => v !== undefined);
  }
  if (isTranslationLeaf(value)) {
    return toLocaleObject(value);
  }
  if (typeof value === "object" && value !== null) {
    const out = {};
    for (const [key, v] of Object.entries(value)) {
      const t = transform(v);
      if (t !== undefined) out[key] = t;
    }
    return out;
  }
  return value;
}

const LOCALES = ["en", "es", "fr", "ja"];

// UI文言(next-intlのロケールJSON)。 ADR-0006参照。
const messagesByLocale = Object.fromEntries(LOCALES.map((l) => [l, {}]));
for (const [key, value] of Object.entries(UI)) {
  const localized = toLocaleObject(value);
  for (const locale of LOCALES) messagesByLocale[locale][key] = localized[locale];
}
for (const locale of LOCALES) {
  messagesByLocale[locale].months = MONTHS.map((m) => toLocaleObject(m)[locale]);
}

/**
 * legacy側で `UI` に登録されず、使用箇所に `_t(...)` としてインラインで書かれている文言。
 * `UI` を走査するだけでは拾えないため、ここで明示的に追加する
 * (再抽出しても同じ結果になるよう、原文はlegacyからそのまま転記している)。
 */
const INLINE_UI_STRINGS = {
  // 盤面右下の凡例の「町」の行(legacy: drawBoard() の rows 最終要素)。
  townSq: "Town · story, business, items|Pueblo · historia, negocios, objetos|Ville · histoire, affaires, objets|町・解説・物件・アイテム",

  // ゲームログ用。legacyはログ文字列を都度組み立てていた(UIカタログに無い)ため、
  // このアプリでログを多言語化するにあたり新たに用意したもの。
  newJourneyLog: "🚂 A new journey begins!|🚂 ¡Comienza un nuevo viaje!|🚂 Un nouveau voyage commence !|🚂 新しい旅がはじまりました!",
  spiritRests: "The spirit rests this turn.|El espíritu descansa este turno.|L'esprit se repose ce tour-ci.|厄災の神はこのターン休んでいる。",
  spiritBlockedLog: "🧿 <b>{0}</b> wards off the misfortune!|🧿 ¡<b>{0}</b> ahuyenta la desgracia!|🧿 <b>{0}</b> conjure le malheur !|🧿 <b>{0}</b> は厄災を跳ね返した!",
  spiritStruckLog: "👹 <b>{0}</b> is struck by misfortune.|👹 <b>{0}</b> sufre una desgracia.|👹 <b>{0}</b> subit un malheur.|👹 <b>{0}</b> は厄災に見舞われた。",
  cardEmptyLog: "🟡 <b>{0}</b> finds nothing.|🟡 <b>{0}</b> no encuentra nada.|🟡 <b>{0}</b> ne trouve rien.|🟡 <b>{0}</b> は何も見つけられなかった。",
  arriveDestLog: "🎯 <b>{0}</b> reaches the destination! <span style='color:var(--gold)'>+{1}</span>|🎯 ¡<b>{0}</b> llega al destino! <span style='color:var(--gold)'>+{1}</span>|🎯 <b>{0}</b> atteint la destination ! <span style='color:var(--gold)'>+{1}</span>|🎯 <b>{0}</b> が目的地に到着! <span style='color:var(--gold)'>+{1}</span>",
  investCpuLog: "📈 <b>{0}</b> invests in <b>{1}</b>.|📈 <b>{0}</b> invierte en <b>{1}</b>.|📈 <b>{0}</b> investit dans <b>{1}</b>.|📈 <b>{0}</b> は <b>{1}</b> に投資した。",
  cpuPassesTown: "<b>{0}</b> passes through the town without buying.|<b>{0}</b> pasa por el pueblo sin comprar.|<b>{0}</b> traverse la ville sans rien acheter.|<b>{0}</b> は何も買わずに町を通り過ぎた。",
  boughtItemLog: "🛍 <b>{0}</b> buys {1} <b>{2}</b>.|🛍 <b>{0}</b> compra {1} <b>{2}</b>.|🛍 <b>{0}</b> achète {1} <b>{2}</b>.|🛍 <b>{0}</b> は {1} <b>{2}</b> を買った。",
  usedItemLog: "✨ <b>{0}</b> uses {1} <b>{2}</b>.|✨ <b>{0}</b> usa {1} <b>{2}</b>.|✨ <b>{0}</b> utilise {1} <b>{2}</b>.|✨ <b>{0}</b> は {1} <b>{2}</b> を使った。",
  seasonLog: "{0} <b>{1}</b>|{0} <b>{1}</b>|{0} <b>{1}</b>|{0} <b>{1}</b>",
  gameOverLog: "🏁 The journey is over!|🏁 ¡El viaje ha terminado!|🏁 Le voyage est terminé !|🏁 旅が終わりました!",
  cpuTurnBadge: "{0} is playing…|{0} está jugando…|{0} joue…|{0} が手番を進めています…",
  saveDone: "Your journey has been saved to this browser. You can close the tab and continue later.|Tu viaje se ha guardado en este navegador. Puedes cerrar la pestaña y continuar más tarde.|Ton voyage est enregistré dans ce navigateur. Tu peux fermer l'onglet et reprendre plus tard.|この旅をブラウザに保存しました。タブを閉じても、あとから続きから遊べます。",
};
for (const [key, source] of Object.entries(INLINE_UI_STRINGS)) {
  const [en, es, fr, ja] = source.split("|");
  const byLocale = { en, es, fr, ja };
  for (const locale of LOCALES) messagesByLocale[locale][key] = byLocale[locale];
}
for (const locale of LOCALES) {
  writeFileSync(
    join(messagesDir, `${locale}.json`),
    JSON.stringify(messagesByLocale[locale], null, 2) + "\n",
  );
}

/**
 * 都市イラストの背景シーン(`G.bg`)を評価してSVG文字列として取り出す。
 *
 * legacy側の `bg` は `()=>band(...)+dotc(...)+...` という**引数なし・乱数なしの
 * 純粋関数**で、呼ぶたびに必ず同じSVG断片を返す(組み立てに使う band/dotc/clouds/
 * treeRow もすべて決定的)。したがって、ここで一度だけ実行して結果の文字列を
 * 保存すれば、描画結果を1ピクセルも変えずにデータとして持ち運べる。
 * 関数のままではJSON化できないため、この「評価して固定化する」処理だけを特別扱いする。
 */
function evaluateBackgrounds(country) {
  const out = {};
  for (const [key, makeScene] of Object.entries(country.bg ?? {})) {
    if (typeof makeScene !== "function") continue;
    const svg = makeScene();
    if (typeof svg !== "string") {
      throw new Error(`${country.id}.bg.${key} が文字列を返しませんでした`);
    }
    // 決定性の確認(2回呼んで同じ結果になること)。将来legacy側に乱数が
    // 混ざった場合に、静かに壊れるのではなく抽出時点で気づけるようにする。
    if (makeScene() !== svg) {
      throw new Error(`${country.id}.bg.${key} の出力が呼び出しごとに変化します`);
    }
    out[key] = svg;
  }
  return out;
}

/**
 * 盤面の装飾(`G.decor`)を評価してSVG文字列として取り出す。
 *
 * legacy側の `decor` は `(el, g, PX, PY) => {...}` という形で、DOM生成関数 `el` を
 * 使って山・木・サボテンを描き足す。中身は投影関数と固定の算術だけで乱数を使わないため、
 * `el` の代わりに「同じ引数でSVG文字列を組み立てるだけの関数」を渡して呼べば、
 * 描画結果を変えずに静的なSVG断片として取り出せる(`bg` と同じ考え方)。
 */
function evaluateDecor(country) {
  if (typeof country.decor !== "function") return "";
  const p = country.proj;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;

  const parts = [];
  const fakeEl = (tag, attrs) => {
    const rendered = Object.entries(attrs ?? {})
      .map(([key, value]) => ` ${key}="${String(value)}"`)
      .join("");
    parts.push(`<${tag}${rendered}/>`);
    return {};
  };

  country.decor(fakeEl, {}, px, py);
  const first = parts.join("");

  // `bg` と同様に決定性を確認する。
  parts.length = 0;
  country.decor(fakeEl, {}, px, py);
  if (parts.join("") !== first) {
    throw new Error(`${country.id}.decor の出力が呼び出しごとに変化します`);
  }
  return first;
}

// 国コンテンツ(都市・路線・アイテム・クイズ・季節/厄災の説明文)。
// 翻訳文字列はここではnext-intlへ分離せず、{en,es,fr,ja}のままインラインで持つ
// (ADR-0007の実用的な簡略化。理由は本ファイル冒頭のコメント参照)。
for (const country of [BOLIVIA, JAPAN]) {
  const content = transform(country);
  content.bg = evaluateBackgrounds(country);
  content.decor = evaluateDecor(country);
  // 移行後にこのリポジトリで追加・改善したコンテンツを反映する。
  applyContentOverrides(country.id, content);
  writeFileSync(
    join(contentDir, `${country.id}.content.json`),
    JSON.stringify(content, null, 2) + "\n",
  );
}

/**
 * 国選択カードの地図サムネイル(legacyの `countryThumb()` と同じ描画)。
 *
 * legacyの関数本体は抽出範囲(`COUNTRIES` の定義まで)より後ろにあるため直接は呼べないが、
 * 中身は投影・多角形・都市の点を並べるだけの決定的な処理なので、ここで同じ計算を行う。
 * 生成結果のSVG文字列だけを軽量インデックスに載せることで、セットアップ画面は
 * 地形データ(land/terrain、数十KB)を読み込まずにサムネイルを表示できる。
 */
function renderCountryThumb(country) {
  const p = country.proj;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  const pts = (poly) => poly.map(([lo, la]) => `${px(lo).toFixed(0)},${py(la).toFixed(0)}`).join(" ");
  const land = country.land
    .map(
      (poly) =>
        `<polygon points="${pts(poly)}" fill="${country.landBase}" stroke="${country.coast}" stroke-width="6"/>`,
    )
    .join("");
  const terrain = country.terrain.map(([color, poly]) => `<polygon points="${pts(poly)}" fill="${color}"/>`).join("");
  const dots = Object.values(country.cities)
    .map(
      (city) =>
        `<circle cx="${px(city.lo).toFixed(0)}" cy="${py(city.la).toFixed(0)}" r="14" fill="#f6efe2" stroke="#241a10" stroke-width="4"/>`,
    )
    .join("");
  return (
    `<rect width="${p.BW}" height="${p.BH}" fill="${country.sea}"/>` +
    `<g>${land}</g><g opacity=".9">${terrain}</g>${dots}`
  );
}

// セットアップ画面の国選択カード用の軽量インデックス(id/name/blurb + 地図サムネイル)。
// フルコンテンツ(各約215KB)を読み込まずに一覧表示できるようにする(Phase8のバンドルサイズ対策)。
const countryIndex = [BOLIVIA, JAPAN].map((country) => {
  // サムネイルもオーバーライド後の海岸線・都市で描く。
  const overridden = applyContentOverrides(country.id, {
    land: country.land,
    cities: { ...country.cities },
    edges: [...country.edges],
  });
  return {
    id: country.id,
    name: toLocaleObject(country.name),
    blurb: toLocaleObject(country.blurb),
    thumbViewBox: `0 0 ${country.proj.BW} ${country.proj.BH}`,
    thumbSvg: renderCountryThumb({ ...country, land: overridden.land, cities: overridden.cities }),
  };
});
writeFileSync(join(contentDir, "country-index.json"), JSON.stringify(countryIndex, null, 2) + "\n");

console.log("Extracted:");
console.log(" - src/i18n/messages/{en,es,fr,ja}.json");
console.log(" - src/infrastructure/content/{bolivia,japan}.content.json");
console.log(" - src/infrastructure/content/country-index.json");
