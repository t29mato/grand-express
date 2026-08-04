import { GameSession } from "../domain/game-session/game-session";
import { PropertyEconomyContext } from "../domain/property/property-income-service";
import { GameEngineContext } from "./game-engine-context";

/** `session.regionIncomeModifiers` を反映した `PropertyEconomyContext` を組み立てる。 */
export function economyContextFor(context: GameEngineContext, session: GameSession): PropertyEconomyContext {
  return {
    getCity: (id) => context.getCity(id),
    regionIncomeModifier: (regionId) => session.regionIncomeModifiers.get(regionId) ?? 1,
  };
}
