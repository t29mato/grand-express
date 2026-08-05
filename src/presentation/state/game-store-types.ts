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
import { CityVisitSummary } from "../../application/use-cases/cpu-take-turn/cpu-take-turn.use-case";

export type UiState =
  | { readonly kind: "setup" }
  | { readonly kind: "intro" }
  | { readonly kind: "idle" }
  /** CPUが手番を進行中(プレイヤー名を表示して待たせる)。 */
  | { readonly kind: "cpu-turn"; readonly playerName: string }
  /** CPUが町に寄って買い物をした結果(人間の町モーダルに相当。自動で閉じる)。 */
  | {
      readonly kind: "cpu-city";
      readonly playerName: string;
      readonly cityId: CityId;
      readonly visit: CityVisitSummary;
      readonly arrivalPrize: number | null;
    }
  /** CPUが答えたクイズ(人間のクイズモーダルに相当。自動で閉じる)。 */
  | {
      readonly kind: "cpu-quiz";
      readonly playerName: string;
      readonly question: QuizQuestion;
      readonly tier: QuizTier;
      readonly chosenOptionIndex: number;
      readonly correct: boolean;
      readonly amount: string;
    }
  | { readonly kind: "choosing-square"; readonly steps: number; readonly reachable: ReadonlyMap<NodeId, readonly NodeId[]> }
  | { readonly kind: "quiz"; readonly question: QuizQuestion; readonly tier: QuizTier; readonly optionOrder: readonly number[] }
  /**
   * 回答後の結果表示。正解・自分の選択・増減額・解説を見せる学習の要
   * (docs/40-learning-design/01-quiz-as-learning-device.md 案1)。
   */
  | {
      readonly kind: "quiz-result";
      readonly question: QuizQuestion;
      readonly tier: QuizTier;
      readonly chosenOptionIndex: number;
      readonly correct: boolean;
      readonly amount: string;
      readonly savedByCharm: boolean;
      readonly bonusItem: ItemKey | null;
    }
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
  /**
   * 再生中のサイコロ演出。人間・CPUどちらの手番でも同じ経路で表示する
   * (`nonce` は同じ目が続いても演出をやり直すための連番)。
   */
  diceRoll: { readonly nonce: number; readonly value: number } | null;

  startNewGame(config: { countryId: CountryId; players: readonly PlayerSetup[]; maxMonths: number; cpuLevel: CpuLevel }): Promise<void>;
  loadSavedGame(): Promise<void>;
  /** 出発ストーリーのモーダル(ui.kind === "intro")を閉じてゲームを開始する。 */
  dismissIntro(): void;
  backToSetup(): void;
  rollForHumanTurn(): void;
  chooseSquare(nodeId: NodeId): void;
  answerQuizOption(optionIndex: number): void;
  /** クイズ結果モーダルを閉じて手番の続きに進む。 */
  dismissQuizResult(): void;
  closeCityModal(): void;
  buyCityProperty(index: PropertyIndex): void;
  investCityProperty(ref: PropertyRef): void;
  sellCityProperty(ref: PropertyRef): void;
  buyCityItem(key: ItemKey): void;
  useInventoryItem(index: number): void;
  chooseExactDiceValue(value: number): void;
  /** サイコロ演出を消す。 */
  clearDiceRoll(): void;
  /** CPUの自動進行を止める(画面遷移時など)。 */
  cancelCpuLoop(): void;
  /** CPUの結果モーダルを閉じて演出を飛ばす。 */
  dismissCpuModal(): void;
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
