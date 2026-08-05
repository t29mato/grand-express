import {
  CityId,
  CountryId,
  ItemKey,
  NodeId,
  PlayerId,
  PropertyIndex,
  PropertyRef,
} from "../../domain/shared-kernel/ids";
import { GameSession } from "../../domain/game-session/game-session";
import { QuizQuestion, QuizTier } from "../../domain/quiz/quiz-question";
import { CpuLevel } from "../../domain/cpu/cpu-level";
import { LocalizedText } from "../../domain/shared-kernel/localized-text";
import { SeasonDefinition } from "../../domain/season/season-effect";
import { GameEngineContext } from "../../application/game-engine-context";
import { PlayerSetup } from "../../application/use-cases/start-game/start-game.use-case";
import { EndGameOutcome } from "../../application/use-cases/end-game/end-game.use-case";

export type UiState =
  | { readonly kind: "setup" }
  | { readonly kind: "intro" }
  | { readonly kind: "idle" }
  /** CPUが手番を進行中(プレイヤー名を表示して待たせる)。 */
  | { readonly kind: "cpu-turn"; readonly playerName: string }
  | { readonly kind: "choosing-square"; readonly steps: number; readonly reachable: ReadonlyMap<NodeId, readonly NodeId[]> }
  | { readonly kind: "quiz"; readonly question: QuizQuestion; readonly tier: QuizTier; readonly optionOrder: readonly number[] }
  | { readonly kind: "city"; readonly cityId: CityId; readonly arrivalPrize: number | null }
  /** 目的地に到着し、次の目的地が抽選された直後の案内(legacyの `arriveDest` 後半のモーダル)。 */
  | {
      readonly kind: "next-leg";
      readonly firstTimeSpiritAppearance: boolean;
      readonly spiritHolderId: PlayerId | null;
    }
  /** セーブ完了を知らせるモーダル。 */
  | { readonly kind: "saved" }
  | { readonly kind: "season"; readonly season: SeasonDefinition }
  | { readonly kind: "game-over"; readonly outcome: EndGameOutcome };

/**
 * ゲームログの1行。表示時に翻訳できるよう、確定した文字列ではなく
 * i18nキーと引数の組で保持する(言語を切り替えると過去のログも切り替わる)。
 * `key` に対応する文言が見つからない場合は `key` がそのまま表示される。
 */
/** ログに埋め込む引数。`LocalizedText` は表示時に現在の言語で解決される。 */
export type LogArg = string | number | LocalizedText;

export interface LogEntry {
  readonly id: number;
  readonly key: string;
  readonly args: readonly LogArg[];
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
  /** 出発ストーリーのモーダル(ui.kind === "intro")を閉じてゲームを開始する。 */
  dismissIntro(): void;
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
  /** CPUの自動進行を止める(画面遷移時など)。 */
  cancelCpuLoop(): void;
  /** 月替わりイベントのモーダル(ui.kind === "season")を閉じて手番の続きに進む。 */
  dismissSeasonModal(): void;
  /** 次の区間の案内(ui.kind === "next-leg")を閉じて手番の続きに進む。 */
  dismissNextLeg(): void;
  save(): void;
  /** セーブ完了モーダルを閉じる。 */
  dismissSavedModal(): void;
}

/** zustandの `create<GameStoreState>()` コールバックが渡す set/get と同じ形。 */
export type SetGameState = (
  partial: Partial<GameStoreState> | ((state: GameStoreState) => Partial<GameStoreState>),
) => void;
export type GetGameState = () => GameStoreState;
