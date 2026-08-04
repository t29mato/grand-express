import { RegionId } from "../shared-kernel/ids";
import { LocalizedText } from "../shared-kernel/localized-text";

/**
 * 季節イベントの効果。現行コードは月ごとに `run:()=>{...}` という手続き
 * (`mod.xxx=1.2` のような地方収入補正の代入、`players.forEach` での現金増減、
 * `spiritRest=true`、`giveItem` 呼び出し)を直接実行していた。
 * それらを宣言的なデータ(操作の配列)に置き換える
 * (legacyの内容は docs/90-migration 配下の分析・legacy/grand-express.html 参照)。
 */
export type SeasonEffectOp =
  | { readonly op: "region-income-multiplier"; readonly regionId: RegionId; readonly multiplier: number }
  | { readonly op: "all-players-gain-cash"; readonly amount: number }
  | { readonly op: "all-players-pay-cash"; readonly amount: number }
  | { readonly op: "rest-spirit" }
  | { readonly op: "give-item-to-all" };

export interface SeasonDefinition {
  /** 0=4月 … 11=3月(現行コードの `month%12` に対応)。 */
  readonly monthIndex: number;
  readonly emoji: string;
  readonly name: LocalizedText;
  readonly narrative: LocalizedText;
  readonly fact: LocalizedText;
  readonly effects: readonly SeasonEffectOp[];
}
