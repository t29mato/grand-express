/**
 * legacy/grand-express.html の `itemHandler` は、アイテムキー文字列を直接
 * if/elseで分岐して効果を実行していた。ここでキーごとの効果をデータとして
 * 書き起こす(ADR-0007と同じ理由: ロジックをコードからデータへ)。
 *
 * 対応関係は legacy/grand-express.html の `humanAction`/`cpuItems` を
 * 読んで書き起こしたもの。両国ともキーは異なるが効果の種類は共通。
 *
 * 各国に1つある移動アイテム(気球・飛行機など)だけは legacy と効果が違う。
 * legacy は目的地への瞬間移動だったが、確実に着けるとサイコロを振る意味が
 * 無くなるため、`carried-far`(8〜12マス進むが向きは選べない)に置き換えた。
 * 8〜12は、サイコロ3個振り(3〜18・平均10.5)と同じくらい大きく動きつつ、
 * 向きが選べないぶん博打になる幅として決めている。
 */
import { ItemEffect } from "../../domain/item/item";

export const ITEM_EFFECT_BY_LEGACY_KEY: Readonly<Record<string, ItemEffect>> = {
  // Bolivia
  ekeko: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  pass: { type: "choose-exact-dice" },
  ferro: { type: "roll-fixed-dice", diceCount: 2 },
  coca: { type: "none" }, // 厄災の神のward item(passive)。発動抑止は別ロジックで自動処理。
  challa: { type: "repel-spirit" },
  pacha: { type: "quiz-save" }, // クイズ不正解時に自動消費され正解扱いになる(人間のみ)
  zebra: { type: "extra-turn" },
  expreso: { type: "roll-fixed-dice", diceCount: 3 },
  singani: { type: "gain-cash", amount: 380 },
  // Japan
  hikouki: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  taxi: { type: "choose-exact-dice" },
  shinkansen: { type: "roll-fixed-dice", diceCount: 2 },
  omamori: { type: "none" }, // 厄災の神のward item(passive)
  morishio: { type: "repel-spirit" },
  daruma: { type: "quiz-save" },
  nozomi: { type: "roll-fixed-dice", diceCount: 3 },
  manekineko: { type: "gain-cash", amount: 380 },
  tasuki: { type: "extra-turn" },
  // India(legacy由来ではなく、このリポジトリで書き起こした国)
  garuda: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  tatkal: { type: "choose-exact-dice" },
  rajdhani: { type: "roll-fixed-dice", diceCount: 2 },
  vandebharat: { type: "roll-fixed-dice", diceCount: 3 },
  nimbumirchi: { type: "none" }, // 厄災の神のward item(passive)
  neem: { type: "repel-spirit" },
  panchang: { type: "quiz-save" },
  jugaad: { type: "gain-cash", amount: 380 },
  dabbawala: { type: "extra-turn" },
  // France
  montgolfiere: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  chaix: { type: "choose-exact-dice" },
  corail: { type: "roll-fixed-dice", diceCount: 2 },
  tgv: { type: "roll-fixed-dice", diceCount: 3 },
  buis: { type: "none" }, // 厄災の神のward item(passive)
  feustjean: { type: "repel-spirit" },
  antiseche: { type: "quiz-save" },
  brocante: { type: "gain-cash", amount: 380 },
  relais: { type: "extra-turn" },
  // World
  zeppelin: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  chronometer: { type: "choose-exact-dice" },
  mailsteamer: { type: "roll-fixed-dice", diceCount: 2 },
  blueriband: { type: "roll-fixed-dice", diceCount: 3 },
  christopher: { type: "none" }, // 厄災の神のward item(passive)
  elmo: { type: "repel-spirit" },
  baedeker: { type: "quiz-save" },
  posterestante: { type: "gain-cash", amount: 380 },
  dateline: { type: "extra-turn" },
  // Ibaraki(県単位の盤面。国と同じ仕組みで動く)
  hobiki: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  jikokuhyo: { type: "choose-exact-dice" },
  tokiwa: { type: "roll-fixed-dice", diceCount: 2 },
  tsukubaex: { type: "roll-fixed-dice", diceCount: 3 },
  ookushigai: { type: "none" }, // 厄災の神(ダイダラボウ)のward item(passive)
  kashimatachi: { type: "repel-spirit" },
  kodokan: { type: "quiz-save" },
  kasamayaki: { type: "gain-cash", amount: 380 },
  gamanoabura: { type: "extra-turn" },
  // Korea
  hak: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  yeot: { type: "choose-exact-dice" },
  mugunghwa: { type: "roll-fixed-dice", diceCount: 2 },
  ktx: { type: "roll-fixed-dice", diceCount: 3 },
  patjuk: { type: "none" }, // 厄災の神(トッケビ)のward item(passive)
  bujeok: { type: "repel-spirit" },
  jokbo: { type: "quiz-save" },
  yeopjeon: { type: "gain-cash", amount: 380 },
  ppalli: { type: "extra-turn" },

  // Turkey
  balon: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  fal: { type: "choose-exact-dice" },
  mavitren: { type: "roll-fixed-dice", diceCount: 2 },
  yht: { type: "roll-fixed-dice", diceCount: 3 },
  nazar: { type: "none" }, // 厄災の神(カラコンジョロス)を退ける護符。持っているだけで効く
  karacevap: { type: "repel-spirit" },
  deneme: { type: "quiz-save" },
  akce: { type: "gain-cash", amount: 380 },
  dolmus: { type: "extra-turn" },

  // Germany
  zeppelinfahrt: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  fahrplan: { type: "choose-exact-dice" },
  intercity: { type: "roll-fixed-dice", diceCount: 2 },
  ice: { type: "roll-fixed-dice", diceCount: 3 },
  kaminkehrer: { type: "none" }, // 厄災の神(リューベツァール)のward item(passive)
  almglocke: { type: "repel-spirit" },
  eselsbruecke: { type: "quiz-save" },
  flohmarkt: { type: "gain-cash", amount: 380 },
  autobahn: { type: "extra-turn" },

  // China
  jindouyun: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  luopan: { type: "choose-exact-dice" },
  lupiheche: { type: "roll-fixed-dice", diceCount: 2 },
  gaotiepiao: { type: "roll-fixed-dice", diceCount: 3 },
  baozhu: { type: "none" }, // 厄災の神(年獣)のward item(passive)
  taomujian: { type: "repel-spirit" },
  jinnang: { type: "quiz-save" },
  yuzhuo: { type: "gain-cash", amount: 380 },
  qianlima: { type: "extra-turn" },

  // UK
  girdle: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  osmap: { type: "choose-exact-dice" },
  nightriviera: { type: "roll-fixed-dice", diceCount: 2 },
  scotsman: { type: "roll-fixed-dice", diceCount: 3 },
  horseshoe: { type: "none" }, // 厄災の神(ボガート)のward item(passive)
  rowan: { type: "repel-spirit" },
  pubquiz: { type: "quiz-save" },
  detectorist: { type: "gain-cash", amount: 380 },
  guardswhistle: { type: "extra-turn" },

  // Italy
  // **`intercity` はドイツと共用。**インターシティはヨーロッパ各国を走る列車の
  // 名前なので、盤面が違っても同じ鍵になった。効果も同じ(サイコロ2個)なので
  // 1つにまとめてある。名前と絵は盤面ごとの内容から引くので、画面上は別物に見える。
  vespa: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  orario: { type: "choose-exact-dice" },
  frecciarossa: { type: "roll-fixed-dice", diceCount: 3 },
  cornicello: { type: "none" }, // 厄災の神(モナチェッロ)のward item(passive)
  malocchio: { type: "repel-spirit" },
  bigino: { type: "quiz-save" },
  lotteria: { type: "gain-cash", amount: 380 },
  raccomandazione: { type: "extra-turn" },
};
