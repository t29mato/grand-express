/**
 * legacy/grand-express.html の `itemHandler` は、アイテムキー文字列を直接
 * if/elseで分岐して効果を実行していた。ここでキーごとの効果をデータとして
 * 書き起こす(ADR-0007と同じ理由: ロジックをコードからデータへ)。
 *
 * 対応関係は legacy/grand-express.html の `humanAction`/`cpuItems` を
 * 読んで書き起こしたもの。両国ともキーは異なるが効果の種類は共通。
 */
import { ItemEffect } from "../../domain/item/item";

export const ITEM_EFFECT_BY_LEGACY_KEY: Readonly<Record<string, ItemEffect>> = {
  // Bolivia
  ekeko: { type: "teleport-to-destination" },
  pass: { type: "choose-exact-dice" },
  ferro: { type: "roll-fixed-dice", diceCount: 2 },
  coca: { type: "none" }, // 厄災の神のward item(passive)。発動抑止は別ロジックで自動処理。
  challa: { type: "repel-spirit" },
  pacha: { type: "quiz-save" }, // クイズ不正解時に自動消費され正解扱いになる(人間のみ)
  zebra: { type: "extra-turn" },
  expreso: { type: "roll-fixed-dice", diceCount: 3 },
  singani: { type: "gain-cash", amount: 380 },
  // Japan
  hikouki: { type: "teleport-to-destination" },
  taxi: { type: "choose-exact-dice" },
  shinkansen: { type: "roll-fixed-dice", diceCount: 2 },
  omamori: { type: "none" }, // 厄災の神のward item(passive)
  morishio: { type: "repel-spirit" },
  daruma: { type: "quiz-save" },
  nozomi: { type: "roll-fixed-dice", diceCount: 3 },
  manekineko: { type: "gain-cash", amount: 380 },
  tasuki: { type: "extra-turn" },
  // India(legacy由来ではなく、このリポジトリで書き起こした国)
  garuda: { type: "teleport-to-destination" },
  tatkal: { type: "choose-exact-dice" },
  rajdhani: { type: "roll-fixed-dice", diceCount: 2 },
  vandebharat: { type: "roll-fixed-dice", diceCount: 3 },
  nimbumirchi: { type: "none" }, // 厄災の神のward item(passive)
  neem: { type: "repel-spirit" },
  panchang: { type: "quiz-save" },
  jugaad: { type: "gain-cash", amount: 380 },
  dabbawala: { type: "extra-turn" },
  // France
  montgolfiere: { type: "teleport-to-destination" },
  chaix: { type: "choose-exact-dice" },
  corail: { type: "roll-fixed-dice", diceCount: 2 },
  tgv: { type: "roll-fixed-dice", diceCount: 3 },
  buis: { type: "none" }, // 厄災の神のward item(passive)
  feustjean: { type: "repel-spirit" },
  antiseche: { type: "quiz-save" },
  brocante: { type: "gain-cash", amount: 380 },
  relais: { type: "extra-turn" },
  // World
  zeppelin: { type: "teleport-to-destination" },
  chronometer: { type: "choose-exact-dice" },
  mailsteamer: { type: "roll-fixed-dice", diceCount: 2 },
  blueriband: { type: "roll-fixed-dice", diceCount: 3 },
  christopher: { type: "none" }, // 厄災の神のward item(passive)
  elmo: { type: "repel-spirit" },
  baedeker: { type: "quiz-save" },
  posterestante: { type: "gain-cash", amount: 380 },
  dateline: { type: "extra-turn" },
};
