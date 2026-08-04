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
for (const locale of LOCALES) {
  writeFileSync(
    join(messagesDir, `${locale}.json`),
    JSON.stringify(messagesByLocale[locale], null, 2) + "\n",
  );
}

// 国コンテンツ(都市・路線・アイテム・クイズ・季節/厄災の説明文)。
// 翻訳文字列はここではnext-intlへ分離せず、{en,es,fr,ja}のままインラインで持つ
// (ADR-0007の実用的な簡略化。理由は本ファイル冒頭のコメント参照)。
writeFileSync(
  join(contentDir, "bolivia.content.json"),
  JSON.stringify(transform(BOLIVIA), null, 2) + "\n",
);
writeFileSync(
  join(contentDir, "japan.content.json"),
  JSON.stringify(transform(JAPAN), null, 2) + "\n",
);

console.log("Extracted:");
console.log(" - src/i18n/messages/{en,es,fr,ja}.json");
console.log(" - src/infrastructure/content/{bolivia,japan}.content.json");
