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
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { applyContentOverrides } from "./content-overrides/index.mjs";
import { buildIndiaContent } from "./countries/india/index.mjs";
import { buildFranceContent } from "./countries/france/index.mjs";
import { buildWorldContent } from "./countries/world/index.mjs";
import { buildIbarakiContent } from "./countries/ibaraki/index.mjs";
import { buildKoreaContent } from "./countries/korea/index.mjs";
import { buildTurkeyContent } from "./countries/turkey/index.mjs";
import { buildGermanyContent } from "./countries/germany/index.mjs";
import { buildUkContent } from "./countries/uk/index.mjs";
import { buildItalyContent } from "./countries/italy/index.mjs";
import { buildRussiaContent } from "./countries/russia/index.mjs";
import { buildChinaContent } from "./countries/china/index.mjs";
import { renderJapanDecor } from "./content-overrides/japan-decor.mjs";
import { renderBoliviaDecor } from "./content-overrides/bolivia-decor.mjs";

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
  // クイズの難易度ラベル(legacy: TIER.*.lbl。UIカタログではなくTIER定義内にある)。
  quizLow: "Short question|Pregunta corta|Question courte|かんたんな問題",
  quizMid: "Standard question|Pregunta normal|Question normale|ふつうの問題",
  quizHigh: "High-stakes question|Pregunta de alto riesgo|Question à gros enjeu|高額の問題",
  cpuBoughtNothing: "{0} looked around but bought nothing.|{0} miró pero no compró nada.|{0} a regardé mais n'a rien acheté.|{0} は見て回ったが何も買わなかった。",
  // リリースノート・フッター。legacyには無い新規の文言。
  // セーブデータの概要(セットアップ画面)。
  savedJourney: "Saved journey|Viaje guardado|Voyage enregistré|保存された旅",
  monthProgress: "Month {0} of {1}|Mes {0} de {1}|Mois {0} sur {1}|{1}ヶ月中 {0}ヶ月目",
  discardSave: "Discard|Descartar|Supprimer|削除",

  releaseNotes: "What's new|Novedades|Nouveautés|更新情報",
  releaseNotesLead: "What has changed for players, newest first.|Lo que ha cambiado para quienes juegan, de lo más reciente a lo más antiguo.|Ce qui a changé pour les joueurs, du plus récent au plus ancien.|遊ぶ人から見て何が変わったかを、新しい順に載せています。",
  backToGame: "Back to the game|Volver al juego|Retour au jeu|ゲームに戻る",
  versionLabel: "Version|Versión|Version|バージョン",

  // CPUのクイズ結果。問題文・選択肢・解説は伏せる(同じ問題が自分に回ってきたときの
  // 答え合わせになってしまい、学習にならないため)。
  cpuQuizCorrect: "<b>{0}</b> answered correctly.|<b>{0}</b> ha respondido bien.|<b>{0}</b> a bien répondu.|<b>{0}</b> は正解した。",
  cpuQuizWrong: "<b>{0}</b> answered incorrectly.|<b>{0}</b> ha respondido mal.|<b>{0}</b> a mal répondu.|<b>{0}</b> は不正解だった。",
  cpuQuizHidden: "The question is hidden — it may come round to you.|La pregunta queda oculta: puede tocarte a ti.|La question reste masquée — elle peut vous revenir.|問題の中身は伏せてあります。同じ問題があなたに回ってくるかもしれません。",

  // 青マス・赤マスの出来事。クイズの「正解!」を流用すると文脈が合わないので別に持つ。
  eventGain: "You come out ahead.|Sales ganando.|Tu t'en sors gagnant.|得をした。",
  eventLoss: "It costs you.|Te cuesta dinero.|Cela te coûte.|出費になった。",

  // 行き先を選んでいる最中の案内。何マス進むのかを出し続ける。
  chooseSquareHint: "You rolled {0} — choose where to stop.|Has sacado {0}: elige dónde parar.|Tu as fait {0} — choisis où t'arrêter.|出目は{0}。止まる場所を選んでください。",

  // ゲーム終了時の表彰。総資産の順位だけだと一目で勝負がついてしまうので、
  // いろいろな観点の賞を1つずつめくって見せる。
  awardsTitle: "The prize-giving|Entrega de premios|La remise des prix|表彰式",
  awardsLead: "Before the final standings — a few awards from this journey.|Antes de la clasificación final, algunos premios de este viaje.|Avant le classement final, quelques prix de ce voyage.|最終順位の前に、この旅の表彰をいくつか。",
  awardsNext: "Next award|Siguiente premio|Prix suivant|次の賞",
  awardsToResults: "And the winner is…|Y el ganador es…|Et le gagnant est…|そして優勝は…",
  awardQuizMaster: "Quiz Master|Maestro del saber|Maître du quiz|クイズ王",
  awardQuizMasterDetail: "{0} correct answers|{0} respuestas correctas|{0} bonnes réponses|{0}問正解",
  awardPropertyBaron: "Property Baron|Barón de los negocios|Baron des affaires|物件王",
  awardPropertyBaronDetail: "{0} businesses owned|{0} negocios en propiedad|{0} affaires possédées|物件{0}件",
  awardRegionLord: "Lord of the Region|Señor de la región|Seigneur de la région|地方王",
  awardRegionLordDetail: "{0} businesses in one region|{0} negocios en una sola región|{0} affaires dans une seule région|ひとつの地方に{0}件",
  awardTraveller: "Great Traveller|Gran viajero|Grand voyageur|旅の達人",
  awardTravellerDetail: "reached the destination {0} times|llegó al destino {0} veces|a atteint le but {0} fois|目的地に{0}回到着",
  awardWalker: "Longest Journey|El más andado|Le plus long trajet|いちばん歩いた人",
  awardWalkerDetail: "{0} squares travelled|{0} casillas recorridas|{0} cases parcourues|{0}マス進んだ",
  awardUnlucky: "Bravest Under Misfortune|El más sufrido|Le plus éprouvé|厄災に耐えた人",
  awardUnluckyDetail: "carried the spirit for {0} turns|cargó al espíritu {0} turnos|a porté l'esprit {0} tours|{0}ターン背負った",

  // クイズの難易度表示。
  difficulty: "Difficulty|Dificultad|Difficulté|難易度",
  optionsReduced: "One wrong answer is hidden because you are new to this country.|Se oculta una respuesta incorrecta porque el país es nuevo para ti.|Une mauvaise réponse est masquée car ce pays t'est nouveau.|この国がはじめてなので、誤答をひとつ伏せています。",

  // 学習まわり(docs/40-learning-design/)。legacyには無い新規の文言。
  correctAnswerWas: "The answer was <b>{0}</b>.|La respuesta era <b>{0}</b>.|La réponse était <b>{0}</b>.|正解は <b>{0}</b> でした。",
  yourAnswer: "You answered: <b>{0}</b>|Respondiste: <b>{0}</b>|Ta réponse : <b>{0}</b>|あなたの回答: <b>{0}</b>",
  charmSaved: "🧿 Your charm absorbed the loss — but the answer was still wrong.|🧿 Tu amuleto absorbió la pérdida, pero la respuesta era incorrecta.|🧿 Ton amulette a absorbé la perte — mais la réponse était fausse.|🧿 お守りが損失を肩代わりしました。ただし答えは間違いです。",
  reviewTitle: "Today's review|Repaso de hoy|Révision du jour|今回のおさらい",
  reviewEmpty: "Nobody missed a question. Well travelled!|Nadie falló ninguna pregunta. ¡Buen viaje!|Personne n'a manqué une question. Beau voyage !|全員ノーミスでした。お見事!",
  knowledgeLevel: "How well do you know this country?|¿Cuánto conoces este país?|Connais-tu bien ce pays ?|この国をどれくらい知っていますか?",
  knowledgeNewcomer: "New here|Es nuevo|Découverte|はじめて",
  knowledgeFamiliar: "A little|Un poco|Un peu|すこし",
  knowledgeLocal: "Very well|Muy bien|Très bien|くわしい",
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
 *
 * **投影は上書き後のものを渡すこと。** `decor` は経緯度を受け取って盤面座標の
 * SVGを吐くので、どの投影で評価したかがそのまま焼き込まれる。上書き前の投影で
 * 評価すると、飾りだけが別の座標系に取り残される。実際そうなっていて、
 * 日本は61個すべて、ボリビアは104個中26個が陸の外に落ち、陸でクリップされて
 * **1つも描かれていなかった**(日本の盤面には山も木も鳥居も出ていなかった)。
 * 日本は範囲(西端127→123.4度)と倍率(1.75倍)の両方が、
 * ボリビアは倍率(1.35倍)が上書きで変わる。
 */
function evaluateDecor(country, proj) {
  if (typeof country.decor !== "function") return "";
  const p = proj ?? country.proj;
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

// ── 装飾の外接矩形(`decorBoxes`) ────────────────────────────
//
// 中間マスの配置(`src/presentation/hooks/use-board-layout.ts`)が、山・木・鳥居の
// 上にマスを置かないようにするために要る。`decor` はSVG文字列に評価済みで
// 「どこに何があるか」が落ちているので、ここで文字列を読み直して座標を復元する。
//
// 位置の計算をもう一度書くのではなく出力を読むのは、国ごとに `decor()` の書き方が
// 違う(legacy2国は `el()` 呼び出し、書き起こし3国は文字列組み立て)ためで、
// 出力を見るぶんには5国とも同じ1本の経路で済む。

const SVG_NUMBER = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;
const svgNumbers = (text) => (text.match(SVG_NUMBER) ?? []).map(Number);

function svgAttr(text, name) {
  const found = new RegExp(`\\s${name}="([^"]*)"`).exec(text);
  return found ? found[1] : null;
}

/**
 * パスの `d` が通る点。曲線は制御点も点として数える
 * (外接矩形が実際よりわずかに広く出るが、避ける側としては安全側)。
 */
function pathPoints(d) {
  const points = [];
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  for (const [, command, argText] of d.matchAll(/([MmLlHhVvCcSsQqTtAaZz])([^MmLlHhVvCcSsQqTtAaZz]*)/g)) {
    const a = svgNumbers(argText);
    const relative = command === command.toLowerCase();
    switch (command.toUpperCase()) {
      case "M":
      case "L":
      case "T":
        for (let i = 0; i + 1 < a.length; i += 2) {
          x = relative ? x + a[i] : a[i];
          y = relative ? y + a[i + 1] : a[i + 1];
          if (command.toUpperCase() === "M" && i === 0) {
            startX = x;
            startY = y;
          }
          points.push([x, y]);
        }
        break;
      case "H":
        for (const v of a) {
          x = relative ? x + v : v;
          points.push([x, y]);
        }
        break;
      case "V":
        for (const v of a) {
          y = relative ? y + v : v;
          points.push([x, y]);
        }
        break;
      case "C":
        for (let i = 0; i + 5 < a.length; i += 6) {
          const bx = relative ? x : 0;
          const by = relative ? y : 0;
          points.push([bx + a[i], by + a[i + 1]], [bx + a[i + 2], by + a[i + 3]]);
          x = bx + a[i + 4];
          y = by + a[i + 5];
          points.push([x, y]);
        }
        break;
      case "S":
      case "Q":
        for (let i = 0; i + 3 < a.length; i += 4) {
          const bx = relative ? x : 0;
          const by = relative ? y : 0;
          points.push([bx + a[i], by + a[i + 1]]);
          x = bx + a[i + 2];
          y = by + a[i + 3];
          points.push([x, y]);
        }
        break;
      case "A":
        for (let i = 0; i + 6 < a.length; i += 7) {
          x = relative ? x + a[i + 5] : a[i + 5];
          y = relative ? y + a[i + 6] : a[i + 6];
          points.push([x, y]);
        }
        break;
      case "Z":
        x = startX;
        y = startY;
        break;
    }
  }
  return points;
}

function boxOfPoints(points) {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const [x, y] of points) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    x0 = Math.min(x0, x);
    y0 = Math.min(y0, y);
    x1 = Math.max(x1, x);
    y1 = Math.max(y1, y);
  }
  return Number.isFinite(x0) ? [x0, y0, x1 - x0, y1 - y0] : null;
}

function boxOfShape(tag, text) {
  const n = (name) => Number(svgAttr(text, name));
  if (tag === "polygon" || tag === "polyline") {
    const a = svgNumbers(svgAttr(text, "points") ?? "");
    const points = [];
    for (let i = 0; i + 1 < a.length; i += 2) points.push([a[i], a[i + 1]]);
    return boxOfPoints(points);
  }
  if (tag === "circle") return [n("cx") - n("r"), n("cy") - n("r"), 2 * n("r"), 2 * n("r")];
  if (tag === "ellipse") return [n("cx") - n("rx"), n("cy") - n("ry"), 2 * n("rx"), 2 * n("ry")];
  if (tag === "rect") return [n("x"), n("y"), n("width"), n("height")];
  if (tag === "path") return boxOfPoints(pathPoints(svgAttr(text, "d") ?? ""));
  if (tag === "line") return boxOfPoints([[n("x1"), n("y1")], [n("x2"), n("y2")]]);
  return null;
}

const boxesTouch = (a, b, gap) =>
  a[0] - gap < b[0] + b[2] && b[0] - gap < a[0] + a[2] && a[1] - gap < b[1] + b[3] && b[1] - gap < a[1] + a[3];

function unionBox(a, b) {
  const x0 = Math.min(a[0], b[0]);
  const y0 = Math.min(a[1], b[1]);
  const x1 = Math.max(a[0] + a[2], b[0] + b[2]);
  const y1 = Math.max(a[1] + a[3], b[1] + b[3]);
  return [x0, y0, x1 - x0, y1 - y0];
}

/**
 * 装飾SVGから、飾りひとつぶんの外接矩形 `[x, y, 幅, 高さ]`(盤面座標)を取り出す。
 * 山の本体と雪のように重なる図形はひとまとまりに束ねる。
 */
function evaluateDecorBoxes(svg, gap = 2) {
  const shapes = [];
  let groupStroke = 0;
  for (const [, closing, tag, rest] of svg.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>/g)) {
    const text = rest.replace(/\/$/, "");
    if (tag === "g") {
      // `<g>` に線の太さがまとめて指定されることがある(フランスの葡萄畑)。
      groupStroke = closing ? 0 : Number(svgAttr(text, "stroke-width") ?? 0) || 0;
      continue;
    }
    const box = boxOfShape(tag, text);
    if (!box) continue;
    // 線は中心から太さの半分ぶん外へはみ出す。線端が丸ければ端にも回り込む。
    const strokeWidth = Number(svgAttr(text, "stroke-width") ?? 0) || groupStroke;
    const pad = svgAttr(text, "stroke") || groupStroke ? strokeWidth / 2 : 0;
    shapes.push([box[0] - pad, box[1] - pad, box[2] + 2 * pad, box[3] + 2 * pad]);
  }

  const merged = [];
  for (const shape of shapes) {
    let current = shape;
    for (let again = true; again; ) {
      again = false;
      for (let i = merged.length - 1; i >= 0; i--) {
        if (!boxesTouch(current, merged[i], gap)) continue;
        current = unionBox(current, merged[i]);
        merged.splice(i, 1);
        again = true;
      }
    }
    merged.push(current);
  }
  return merged.map((box) => box.map((v) => Math.round(v * 10) / 10));
}

/**
 * legacy の装飾を置き換える国。legacy のものは陸の外へ撒いてクリップ任せの作りで、
 * 実際に見えていたのは日本で山0本、ボリビアでサボテン8本だった(理由は各ファイルの冒頭)。
 */
const DECOR_OVERRIDES = { japan: renderJapanDecor, bolivia: renderBoliviaDecor };

// 国コンテンツ(都市・路線・アイテム・クイズ・季節/厄災の説明文)。
// 翻訳文字列はここではnext-intlへ分離せず、{en,es,fr,ja}のままインラインで持つ
// (ADR-0007の実用的な簡略化。理由は本ファイル冒頭のコメント参照)。
for (const country of [BOLIVIA, JAPAN]) {
  const content = transform(country);
  content.bg = evaluateBackgrounds(country);
  // 移行後にこのリポジトリで追加・改善したコンテンツを反映する。
  applyContentOverrides(country.id, content);
  // 装飾は**上書きで確定した投影**で評価する(順序が逆だと陸の外へ落ちる。
  // 理由は `evaluateDecor` のコメント)。矩形もそのあとで取る。
  const renderDecor = DECOR_OVERRIDES[country.id];
  const p = content.proj;
  content.decor = renderDecor
    ? renderDecor(
        (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW,
        (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH,
      )
    : evaluateDecor(country, p);
  content.decorBoxes = evaluateDecorBoxes(content.decor);
  writeFileSync(
    join(contentDir, `${country.id}.content.json`),
    JSON.stringify(content, null, 2) + "\n",
  );
}

/**
 * legacy に無い、このリポジトリで新規に書き起こした国。
 * 抽出後のJSONと同じ形で組み立てているため、`transform` も
 * `evaluateBackgrounds` も通す必要がない(最初から文字列・4言語オブジェクト)。
 *
 * **ここは手で並べる。**`scripts/countries/` を走査して自動で拾う形も作ってみたが、
 * **作りかけの盤面まで焼き込んでしまった。**この環境のデプロイは作業ツリーを
 * そのまま上げるので、書きかけが本番に出る。盤面を並行して書いているあいだは、
 * 「出来たと人が判断したものだけを焼く」ほうが安全だった。
 *
 * 代わりに、**登録し忘れた盤面は下で警告する。**焼かれない盤面は目録に載らず、
 * テストも見に行かないので、黙って消える(それがいちばん怖い)。
 */
const AUTHORED_COUNTRIES = [
  buildIndiaContent(),
  buildFranceContent(),
  buildWorldContent(),
  buildIbarakiContent(),
  buildKoreaContent(),
  buildTurkeyContent(),
  buildGermanyContent(),
  buildChinaContent(),
  buildUkContent(),
  buildItalyContent(),
  buildRussiaContent(),
];

/** `scripts/countries/` にあるのに、上の一覧に無い盤面。焼かれずに消える。 */
const unregistered = readdirSync(join(__dirname, "countries"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !AUTHORED_COUNTRIES.some((content) => content.id === name))
  .sort();

for (const content of AUTHORED_COUNTRIES) {
  // 上書き層はもともと legacy 由来の国だけのものだったが、**お金の尺度は
  // 6盤面を並べて決めないと釣り合わない**ため、この4国も通す。
  // 上書きが書かれていない国は `applyContentOverrides` が素通りする。
  applyContentOverrides(content.id, content);
  content.decorBoxes = evaluateDecorBoxes(content.decor);
  writeFileSync(
    join(contentDir, `${content.id}.content.json`),
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
/** 国選択カードでサムネイルが表示される一辺(px)。`setup-screen.tsx` のカードに合わせる。 */
const THUMB_DISPLAY_PX = 146;

/** 青が他の成分よりどれだけ強いか。水面の色を地形の色から見分けるのに使う。 */
function blueDominance(color) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16));
  return b - Math.max(r, g);
}

function renderCountryThumb(country) {
  const p = country.proj;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  const pts = (poly) => poly.map(([lo, la]) => `${px(lo).toFixed(0)},${py(la).toFixed(0)}`).join(" ");

  // **線の太さと点の大きさは「カード上で何pxに見えるか」で決める。**
  // 以前は盤面座標の固定値(線幅6・半径14)だったが、盤面の最大辺は1680〜3300pxと
  // 幅があり、カードでは146pxまで縮む。実測すると海岸線は0.27〜0.46px、
  // 都市の点は0.62〜1.08pxにしかならず、**6枚とも輪郭が消えて緑の塊に見えていた**。
  // 盤面の縮尺で割り戻して、どの盤面でも同じ太さに見えるようにする。
  const scale = Math.max(p.BW, p.BH) / THUMB_DISPLAY_PX;
  const w = (displayPx) => (displayPx * scale).toFixed(1);

  const land = country.land
    .map(
      (poly) =>
        `<polygon points="${pts(poly)}" fill="${country.landBase}" stroke="${country.coast}"` +
        ` stroke-width="${w(1.4)}" stroke-linejoin="round"/>`,
    )
    .join("");
  // 地形は塗りと同じ色で縁取る。さらに**細長いものほど太く縁取る**。
  // 霞ヶ浦のような細い水面は、縮めると塗りだけでは糸になって消えてしまい、
  // 茨城はその湖が県の見分けになっているため。
  //
  // 「細さ」は色ではなく形から測る。長方形なら 2×面積÷周長 が短いほうの辺に等しく、
  // 細長い多角形ならおよその幅になる。色で水を見分ける手もあるが、
  // 盤面ごとに水の色が違うので形で測るほうが確か。
  const terrain = country.terrain
    .map(([color, poly]) => {
      const board = poly.map(([lo, la]) => [px(lo), py(la)]);
      let twiceArea = 0;
      let perimeter = 0;
      for (let i = 0, j = board.length - 1; i < board.length; j = i++) {
        twiceArea += board[j][0] * board[i][1] - board[i][0] * board[j][1];
        perimeter += Math.hypot(board[i][0] - board[j][0], board[i][1] - board[j][1]);
      }
      const width = perimeter > 0 ? (2 * Math.abs(twiceArea / 2)) / perimeter : 0;
      // カード上で最低これだけの太さに見せる。縁取りは両側に付くので、足りないぶんを足す。
      // **水面だけは厚めに取る。** 陸の中の水はその土地の見分けになることが多く
      // (茨城は霞ヶ浦がそれ)、地形の色分けより先に目に入ってほしいため。
      // 水かどうかは「青が他の成分より明確に強い」で見る。実測すると、水以外の地形色は
      // 6盤面とも青の差が8以下、霞ヶ浦は53で、あいだが十分に空いている。
      const isWater = /^#[0-9a-f]{6}$/i.test(color) && blueDominance(color) > 30;
      const MIN_FEATURE_PX = isWater ? 8 : 3.2;
      const shown = width / scale;
      const stroke = 0.9 + Math.max(0, MIN_FEATURE_PX - shown);
      return (
        `<polygon points="${pts(poly)}" fill="${color}" stroke="${color}"` +
        ` stroke-width="${w(stroke)}" stroke-linejoin="round"/>`
      );
    })
    .join("");
  const dots = Object.values(country.cities)
    .map(
      (city) =>
        `<circle cx="${px(city.lo).toFixed(0)}" cy="${py(city.la).toFixed(0)}" r="${w(1.4)}"` +
        ` fill="#f6efe2" stroke="#241a10" stroke-width="${w(0.45)}"/>`,
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
  // **`cur` も渡すこと。** 渡さないと表示倍率の上書きがここだけ効かず、
  // セットアップ画面のセーブ一覧だけが古い桁(日本なら¥120,000)のまま残る。
  const overridden = applyContentOverrides(country.id, {
    land: country.land,
    cities: { ...country.cities },
    edges: [...country.edges],
    cur: { ...country.cur },
  });
  return {
    id: country.id,
    name: toLocaleObject(country.name),
    blurb: toLocaleObject(country.blurb),
    // セーブデータの所持金を通貨表記で出すために必要(フルコンテンツを読まずに済ませる)。
    currency: {
      prefix: overridden.cur.pre,
      suffix: overridden.cur.post,
      multiplier: overridden.cur.mul,
    },
    thumbViewBox: `0 0 ${country.proj.BW} ${country.proj.BH}`,
    thumbSvg: renderCountryThumb({ ...country, land: overridden.land, cities: overridden.cities }),
  };
});

// 新規に書き起こした国も同じ形でインデックスに載せる(名前は既に4言語オブジェクト)。
for (const content of AUTHORED_COUNTRIES) {
  countryIndex.push({
    id: content.id,
    name: content.name,
    blurb: content.blurb,
    currency: { prefix: content.cur.pre, suffix: content.cur.post, multiplier: content.cur.mul },
    thumbViewBox: `0 0 ${content.proj.BW} ${content.proj.BH}`,
    thumbSvg: renderCountryThumb(content),
  });
}
writeFileSync(join(contentDir, "country-index.json"), JSON.stringify(countryIndex, null, 2) + "\n");

console.log("Extracted:");
console.log(" - src/i18n/messages/{en,es,fr,ja}.json");
console.log(" - src/infrastructure/content/{bolivia,japan,india,france,world,ibaraki}.content.json");
console.log(" - src/infrastructure/content/country-index.json");
if (unregistered.length > 0) {
  console.log("");
  console.log(`⚠ 焼かれていない盤面が ${unregistered.length} 件あります: ${unregistered.join(", ")}`);
  console.log("  出来ているなら AUTHORED_COUNTRIES に足してください。");
  console.log("  足すまでは目録に載らず、テストも見に行きません(黙って消えます)。");
}
