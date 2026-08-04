import { ItemKey } from "../shared-kernel/ids";
import { LocalizedText } from "../shared-kernel/localized-text";

/**
 * アイテムの効果。現行コードは `itemHandler` 内でアイテムキー文字列を直接
 * if/elseで分岐していたが(`key==="ferro"||key==="shinkansen"` 等)、
 * それをデータ駆動の判別共用体に置き換える。どのアイテムがどの効果を持つかは
 * コンテンツデータ側(infrastructure/content)で指定する。
 */
export type ItemEffect =
  /** 目的地まで一気に移動する(kind: move。ekeko/hikouki)。 */
  | { readonly type: "teleport-to-destination" }
  /** 1〜6の中から移動距離を選べる(pass/taxi)。 */
  | { readonly type: "choose-exact-dice" }
  /** 複数個のサイコロを振り合計値だけ移動する(ferro/shinkansen=2個、expreso/nozomi=3個)。 */
  | { readonly type: "roll-fixed-dice"; readonly diceCount: 2 | 3 }
  /** 即座に現金を得る(singani/manekineko)。 */
  | { readonly type: "gain-cash"; readonly amount: number }
  /** もう一度手番を行える(zebra/tasuki)。 */
  | { readonly type: "extra-turn" }
  /** 厄災の神を、目的地までの距離が最も近い他プレイヤーへ押し付ける(challa/morishio)。 */
  | { readonly type: "repel-spirit" }
  /** 効果なし。所持しているだけの雰囲気アイテム(現行コードのpacha/darumaと同じ挙動)。 */
  | { readonly type: "none" };

export type ItemKind = "move" | "pre" | "passive";

export interface ItemDefinition {
  readonly key: ItemKey;
  readonly kind: ItemKind;
  readonly price: number;
  readonly effect: ItemEffect;
  readonly emoji: string;
  readonly name: LocalizedText;
  readonly description: LocalizedText;
  readonly fact: LocalizedText;
}

/** passiveなアイテムは一覧に表示されるだけで、プレイヤーが能動的に使うことはできない。 */
export function isActivelyUsable(item: ItemDefinition): boolean {
  return item.kind !== "passive";
}
