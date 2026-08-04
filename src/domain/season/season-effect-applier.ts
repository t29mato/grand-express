import { RegionId } from "../shared-kernel/ids";
import { Money } from "../shared-kernel/money";
import { Player, payUpTo, receiveCash } from "../player/player";
import { SeasonEffectOp } from "./season-effect";

export interface SeasonApplicationResult {
  readonly players: readonly Player[];
  /** このイベントで明示的に指定された地方の収入倍率(未指定の地方は1のまま)。 */
  readonly regionModifiers: ReadonlyMap<RegionId, number>;
  readonly spiritShouldRest: boolean;
}

/**
 * 季節イベントの効果を適用する(現行コードの各季節の `run()` を移植)。
 * アイテム付与だけは乱数を伴うため、呼び出し側(Application層)から
 * `giveItemToPlayer` として注入してもらう。
 */
export function applySeasonEffects(
  players: readonly Player[],
  effects: readonly SeasonEffectOp[],
  giveItemToPlayer: (player: Player) => Player,
): SeasonApplicationResult {
  let currentPlayers = [...players];
  const regionModifiers = new Map<RegionId, number>();
  let spiritShouldRest = false;

  for (const effect of effects) {
    switch (effect.op) {
      case "region-income-multiplier":
        regionModifiers.set(effect.regionId, effect.multiplier);
        break;
      case "all-players-gain-cash":
        currentPlayers = currentPlayers.map((p) => receiveCash(p, Money.of(effect.amount)));
        break;
      case "all-players-pay-cash":
        currentPlayers = currentPlayers.map((p) => payUpTo(p, Money.of(effect.amount)).player);
        break;
      case "give-item-to-all":
        currentPlayers = currentPlayers.map((p) => giveItemToPlayer(p));
        break;
      case "rest-spirit":
        spiritShouldRest = true;
        break;
    }
  }

  return { players: currentPlayers, regionModifiers, spiritShouldRest };
}
