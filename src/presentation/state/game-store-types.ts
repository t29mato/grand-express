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
import { QuizQuestion } from "../../domain/quiz/quiz-question";
import { MoneyEvent } from "../../domain/board/money-event";
import { DoomFlavor, DoomOutcome } from "../../domain/misfortune/doom-effect";
import { WindowNote } from "../../domain/board/window-note";
import { QuarterlySettlementRow } from "../../application/use-cases/advance-turn/advance-turn.use-case";
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
      // CPUが選んだ選択肢は**保持しない**。画面に出すとカンニングになるため
      // (cpu-quiz-modal.tsx 参照)。
      readonly playerName: string;
      readonly question: QuizQuestion;
      readonly correct: boolean;
      readonly amount: string;
    }
  /**
   * サイコロが転がっている最中。**出目はこの状態には持たせない。**
   * 進むマス数も行けるマスも、演出が着地するまでは画面のどこにも出さない
   * (出してしまうと、転がっている間にもう答えが分かってしまう)。
   * 結果は `revealDiceRoll()` が呼ばれた時点で `choosing-square` に変わる。
   */
  | { readonly kind: "rolling" }
  | { readonly kind: "choosing-square"; readonly steps: number; readonly reachable: ReadonlyMap<NodeId, readonly NodeId[]> }
  | { readonly kind: "quiz"; readonly question: QuizQuestion; readonly optionOrder: readonly number[] }
  /**
   * 回答後の結果表示。正解・自分の選択・増減額・解説を見せる学習の要
   * (docs/40-learning-design/01-quiz-as-learning-device.md 案1)。
   */
  | {
      readonly kind: "quiz-result";
      readonly question: QuizQuestion;
      readonly chosenOptionIndex: number;
      readonly correct: boolean;
      readonly amount: string;
      readonly savedByCharm: boolean;
      readonly bonusItem: ItemKey | null;
    }
  | {
      readonly kind: "city";
      readonly cityId: CityId;
      readonly arrivalPrize: number | null;
      /**
       * **この人がこの町に止まるのが初めてか。**
       *
       * 初めてなら絵と紹介を出し、2回目以降は畳んで買い物だけにする。
       * **開いた時点の値をここに持つ。**セッション側は開くと同時に
       * 「読んだ」印が付くので、あとから引き直すと必ず false になる。
       */
      readonly firstVisit: boolean;
    }
  /** 目的地に到着し、次の目的地が抽選された直後の案内(legacyの `arriveDest` 後半のモーダル)。 */
  | {
      readonly kind: "next-leg";
      readonly firstTimeSpiritAppearance: boolean;
      readonly spiritHolderId: PlayerId | null;
      /**
       * **誰の手番でも出す。**CPUが目的地に着いたときは、これまで
       * この案内が一度も出ず、目的地が入れ替わったことも厄災の神が
       * 自分に憑いたことも画面に出なかった(実プレイの記録 2026-09-02)。
       * CPUの手番では、押さなくても一定時間で自動的に送る。
       */
      readonly onCpuTurn: boolean;
      /** 到着した人の名前(誰の到着で目的地が変わったのか)。 */
      readonly arrivedBy: string;
      /** その到着で受け取った賞金(表示済みの文字列)。 */
      readonly prize: string;
    }
  /** セーブ完了を知らせるモーダル。 */
  | {
      readonly kind: "money-event";
      readonly playerName: string;
      readonly event: MoneyEvent;
      readonly amount: string;
      readonly gained: boolean;
    }
  | {
      readonly kind: "doom";
      readonly playerName: string;
      readonly flavor: DoomFlavor;
      readonly wasKing: boolean;
      /**
       * **実際に何をされたか。**金額・失った物件・取られた持ちものが入っている。
       *
       * 以前は `flavor`(名前と物語)しか運んでいなかったので、カードには
       * 「火事だ」としか書かれず、**いくら失ったのか・何を失ったのかが
       * どこにも出ていなかった。**サイドバーの数字の点滅から推測するしかない、
       * という報告(実プレイの記録 2026-09-02)を受けて型を広げた。
       */
      readonly outcome: DoomOutcome;
      /** CPUの手番の災難か(自動で送るカードにする)。 */
      readonly onCpuTurn: boolean;
    }
  /** 四半期の決算。全員ぶんを1枚で見せる(`advance-turn.use-case.ts`)。 */
  | {
      readonly kind: "settlement";
      readonly rows: readonly QuarterlySettlementRow[];
      /** 0始まりの経過月。 */
      readonly month: number;
    }
  /** 町の物件をすべてそろえた(独占)。誰の手番でも見せる。 */
  | { readonly kind: "monopoly"; readonly playerName: string; readonly cityId: CityId }
  /**
   * 「出目を自分で選べる」アイテム(時刻表・タクシー・周遊券など)を使った直後。
   * 選ぶまでは何も起きないので、必ずこの状態を経由させる。
   */
  | { readonly kind: "exact-dice" }
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

/**
 * セーブデータの中身の要約。「続きから」を押す前に、**何が保存されているのか**が
 * 分かるようにセットアップ画面へ出す(国・進行度・参加者と所持金)。
 * フルのコンテンツを読み込まずに描けるよう、必要な値だけを持つ。
 */
export interface SavedGameSummary {
  readonly countryId: CountryId;
  /** 0始まりの経過月。 */
  readonly month: number;
  readonly maxMonths: number;
  readonly players: readonly { readonly name: string; readonly isCpu: boolean; readonly cash: number }[];
}

export interface GameStoreState {
  context: GameEngineContext | null;
  session: GameSession | null;
  ui: UiState;
  log: readonly LogEntry[];
  /**
   * セーブデータの要約(無ければ null)。
   * サーバー描画時は localStorage を読めないため、初期値は null にして
   * マウント後に `refreshSavedGame()` で埋める(ハイドレーションのずれを避ける)。
   */
  savedGame: SavedGameSummary | null;
  /**
   * 再生中のサイコロ演出。人間・CPUどちらの手番でも同じ経路で表示する
   * (`nonce` は同じ目が続いても演出をやり直すための連番)。
   */
  /**
   * 直近のサイコロ。`rolls` は振ったサイコロ1個ずつの目で、
   * 合計(= 進むマス数)が `value`。アイテムで2〜3個振ると合計が7以上になるため、
   * 1個のサイコロだけを見せると「目より多く進む」ように見えてしまう。
   */
  diceRoll: { readonly nonce: number; readonly value: number; readonly rolls: readonly number[] } | null;
  /**
   * 駒が経路をたどっている最中の、**見た目だけ**の位置。
   *
   * 盤の状態(`session`)は道のりが終わってからまとめて反映する。途中の1マスごとに
   * セッションを書き換えると、すれ違いや通過の判定がドメインと二重になるため
   * (歩く処理そのものは `movePlayerAlongPath` が既に1マスずつ回している)。
   *
   * `emoji` は運んでくれているアイテム(エケコ人形・帆引き船など)。
   * 自分でマスを選んで進むときは null。
   */
  walk: { readonly playerId: PlayerId; readonly nodeId: NodeId; readonly emoji: string | null } | null;
  /**
   * **何も起きないマスに止まったときの返事。**
   *
   * 9手番のうち4回は無印マスで、駒が動いたあとは無音・無反応のまま
   * CPUの手番に切り替わっていた。「息をつげる間」は意図して作ったものだが、
   * **返事が無いと、操作が受理されたのか分からない**という報告があった。
   *
   * 出来事ではないので `ui` は動かさない。汽笛を鳴らし、駒を小さく弾ませ、
   * 車窓の一言を0.8秒だけ出すための合図としてここに置く。
   * `nonce` は同じマスに続けて止まっても演出をやり直すための連番。
   *
   * **駒のバウンドは盤面側が読む。**`playerId` の駒に短いクラスを当てる想定
   * (`.token-bounce`。CSSは `src/app/styles/reveal.css`)。
   */
  arrivalBeat: {
    readonly nonce: number;
    readonly playerId: PlayerId;
    readonly nodeId: NodeId;
    readonly note: WindowNote;
  } | null;

  startNewGame(config: { countryId: CountryId; players: readonly PlayerSetup[]; maxMonths: number; cpuLevel: CpuLevel }): Promise<void>;
  loadSavedGame(): Promise<void>;
  /** セーブデータの要約を読み直す(セットアップ画面のマウント時に呼ぶ)。 */
  refreshSavedGame(): void;
  /** セーブデータを消す。 */
  discardSavedGame(): void;
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
  /**
   * サイコロが着地した合図。伏せておいた出目をここで初めて公開し、
   * `rolling` から `choosing-square` に移す(演出の再生側から呼ぶ)。
   */
  revealDiceRoll(): void;
  /** サイコロ演出を消す。 */
  clearDiceRoll(): void;
  /** CPUの自動進行を止める(画面遷移時など)。 */
  cancelCpuLoop(): void;
  /** CPUの結果モーダルを閉じて演出を飛ばす。 */
  dismissCpuModal(): void;
  /** 青マス・赤マスの出来事のモーダルを閉じる。 */
  dismissMoneyEvent(): void;
  /** 厄災のモーダルを閉じる。 */
  dismissDoom(): void;
  /** 四半期の決算のカードを閉じる。 */
  dismissSettlement(): void;
  /** 独占の知らせを閉じる。 */
  dismissMonopoly(): void;
  /** 車窓の一言を消す(0.8秒後に表示側から呼ぶ)。 */
  clearArrivalBeat(): void;
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
