import {
  CityId,
  CountryId,
  ItemKey,
  NodeId,
  PropertyIndex,
  PropertyRef,
} from "../../domain/shared-kernel/ids";
import { GameSession } from "../../domain/game-session/game-session";
import { QuizQuestion, QuizTier } from "../../domain/quiz/quiz-question";
import { CpuLevel } from "../../domain/cpu/cpu-level";
import { GameEngineContext } from "../../application/game-engine-context";
import { PlayerSetup } from "../../application/use-cases/start-game/start-game.use-case";
import { EndGameOutcome } from "../../application/use-cases/end-game/end-game.use-case";

export type UiState =
  | { readonly kind: "setup" }
  | { readonly kind: "idle" }
  | { readonly kind: "choosing-square"; readonly steps: number; readonly reachable: ReadonlyMap<NodeId, readonly NodeId[]> }
  | { readonly kind: "quiz"; readonly question: QuizQuestion; readonly tier: QuizTier; readonly optionOrder: readonly number[] }
  | { readonly kind: "city"; readonly cityId: CityId; readonly arrivalPrize: number | null }
  | { readonly kind: "game-over"; readonly outcome: EndGameOutcome };

export interface LogEntry {
  readonly id: number;
  readonly text: string;
  readonly tone: "neutral" | "good" | "bad" | "gold";
}

export interface GameStoreState {
  context: GameEngineContext | null;
  session: GameSession | null;
  ui: UiState;
  log: readonly LogEntry[];
  hasSavedGame: boolean;

  startNewGame(config: { countryId: CountryId; players: readonly PlayerSetup[]; maxMonths: number; cpuLevel: CpuLevel }): Promise<void>;
  loadSavedGame(): Promise<void>;
  backToSetup(): void;
  rollForHumanTurn(): void;
  chooseSquare(nodeId: NodeId): void;
  answerQuizOption(optionIndex: number): void;
  closeCityModal(): void;
  buyCityProperty(index: PropertyIndex): void;
  investCityProperty(ref: PropertyRef): void;
  sellCityProperty(ref: PropertyRef): void;
  buyCityItem(key: ItemKey): void;
  useInventoryItem(index: number): void;
  chooseExactDiceValue(value: number): void;
  save(): void;
}

/** zustandの `create<GameStoreState>()` コールバックが渡す set/get と同じ形。 */
export type SetGameState = (
  partial: Partial<GameStoreState> | ((state: GameStoreState) => Partial<GameStoreState>),
) => void;
export type GetGameState = () => GameStoreState;
