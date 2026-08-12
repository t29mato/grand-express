"use client";

import { NodeId } from "../../domain/shared-kernel/ids";
import { currentPlayer } from "../../domain/game-session/game-session";
import { useGameStore } from "../state/game-store";
import { BoardView } from "./board/board-view";
import { DiceButton } from "./hud/dice-button";
import { DiceStage } from "./hud/dice-stage";
import { DestinationCard, ItemBar, PlayersPanel, TravelLog } from "./hud/side-panel";
import { LogToast } from "./hud/log-toast";
import { BoardStatus } from "./hud/board-status";
import { LocaleSwitch } from "./hud/locale-switch";
import { MusicToggle } from "./hud/music-toggle";
import { IntroModal } from "./modals/intro-modal";
import { SavedModal } from "./modals/saved-modal";
import { ExactDiceModal } from "./modals/exact-dice-modal";
import { CpuCityModal } from "./modals/cpu-city-modal";
import { CpuQuizModal } from "./modals/cpu-quiz-modal";
import { MoneyEventModal } from "./modals/money-event-modal";
import { DoomModal } from "./modals/doom-modal";
import { SeasonModal } from "./modals/season-modal";
import { NextLegModal } from "./modals/next-leg-modal";
import { QuizModal } from "./modals/quiz-modal";
import { QuizResultModal } from "./modals/quiz-result-modal";
import { CityModal } from "./modals/city-modal";
import { GameOverModal } from "./modals/game-over-modal";
import { useLocale } from "../i18n/locale-context";

export function GameScreen() {
  const context = useGameStore((s) => s.context);
  const session = useGameStore((s) => s.session);
  const ui = useGameStore((s) => s.ui);
  const log = useGameStore((s) => s.log);
  const rollForHumanTurn = useGameStore((s) => s.rollForHumanTurn);
  const chooseSquare = useGameStore((s) => s.chooseSquare);
  const answerQuizOption = useGameStore((s) => s.answerQuizOption);
  const buyCityProperty = useGameStore((s) => s.buyCityProperty);
  const investCityProperty = useGameStore((s) => s.investCityProperty);
  const sellCityProperty = useGameStore((s) => s.sellCityProperty);
  const buyCityItem = useGameStore((s) => s.buyCityItem);
  const closeCityModal = useGameStore((s) => s.closeCityModal);
  const useInventoryItem = useGameStore((s) => s.useInventoryItem);
  const save = useGameStore((s) => s.save);
  const backToSetup = useGameStore((s) => s.backToSetup);
  const dismissIntro = useGameStore((s) => s.dismissIntro);
  const dismissSeasonModal = useGameStore((s) => s.dismissSeasonModal);
  const dismissNextLeg = useGameStore((s) => s.dismissNextLeg);
  const dismissSavedModal = useGameStore((s) => s.dismissSavedModal);
  const chooseExactDiceValue = useGameStore((s) => s.chooseExactDiceValue);
  const dismissCpuModal = useGameStore((s) => s.dismissCpuModal);
  const dismissMoneyEvent = useGameStore((s) => s.dismissMoneyEvent);
  const dismissDoom = useGameStore((s) => s.dismissDoom);
  const dismissQuizResult = useGameStore((s) => s.dismissQuizResult);
  const diceRoll = useGameStore((s) => s.diceRoll);
  const walk = useGameStore((s) => s.walk);
  const clearDiceRoll = useGameStore((s) => s.clearDiceRoll);
  const revealDiceRoll = useGameStore((s) => s.revealDiceRoll);
  const { t } = useLocale();

  if (!context || !session) return null;

  const player = currentPlayer(session);
  // 選んだあと駒が歩いているあいだは候補を消す。光ったままだと、まだ選び直せるように見える。
  const reachableSet: ReadonlySet<NodeId> | null =
    ui.kind === "choosing-square" && !walk ? new Set(ui.reachable.keys()) : null;

  return (
    <div className="game-screen">
      <header>
        <h1>World Express</h1>
        <div className="hdr-right">
          <LocaleSwitch />
          <MusicToggle />
          <button className="btn ghost" onClick={save}>
            {t("save")}
          </button>
          <button className="btn ghost" onClick={backToSetup}>
            {t("newGame")}
          </button>
        </div>
      </header>
      <main>
        <div className="board-wrap">
          <BoardView
            context={context}
            session={session}
            reachable={reachableSet}
            steps={ui.kind === "choosing-square" ? ui.steps : undefined}
            walk={walk}
            onChooseNode={(id) => chooseSquare(id)}
          />
          {diceRoll && (
            <DiceStage key={diceRoll.nonce} values={diceRoll.rolls} onReveal={revealDiceRoll} onDone={clearDiceRoll} />
          )}
        </div>
        {/* 1画面に収めるためこの列だけスクロールさせている。スクロールできる領域は
            キーボードからも操作できる必要があるため tabIndex を与える
            (中の操作要素が全て無効なとき、ここに辿り着けなくなるのを防ぐ)。 */}
        <aside tabIndex={0} aria-label={t("travelers")}>
          <DestinationCard context={context} session={session} />
          <DiceButton
            session={session}
            /* 運ばれているあいだは `ui` が idle のままなので、`walk` も見て止める。
               止めないと、道のりの途中でサイコロを押せてしまう。 */
            disabled={player.isCpu || ui.kind !== "idle" || walk !== null}
            cpuTurnPlayerName={
              ui.kind === "cpu-turn" || ui.kind === "cpu-city" || ui.kind === "cpu-quiz" ? ui.playerName : undefined
            }
            rolling={ui.kind === "rolling"}
            steps={ui.kind === "choosing-square" ? ui.steps : undefined}
            onRoll={rollForHumanTurn}
          />
          {/* いまどこに居て目的地まで何マスか。盤面を目で読まなくても分かるようにする
              (行き先の候補が出ていないあいだ、盤面には押せるものが1つも無いため)。 */}
          <BoardStatus context={context} session={session} />
          <ItemBar context={context} session={session} onUseItem={useInventoryItem} />
          <PlayersPanel context={context} session={session} />
          <TravelLog log={log} />
        </aside>
      </main>

      {/* 旅の記録の直近1件を画面の上に一瞬出す(記録はサイドバーの下にあって
          遊んでいる最中は目に入らない)。出す行は絞ってある。log-toast.tsx 参照。 */}
      <LogToast log={log} session={session} />

      {/* 「出目を選べる」アイテムは、選ぶ画面を出さないと持ち物が消えるだけになる。 */}
      {ui.kind === "exact-dice" && <ExactDiceModal onChoose={chooseExactDiceValue} />}
      {ui.kind === "saved" && <SavedModal onClose={dismissSavedModal} />}
      {ui.kind === "cpu-city" && (
        <CpuCityModal
          context={context}
          session={session}
          playerName={ui.playerName}
          cityId={ui.cityId}
          visit={ui.visit}
          arrivalPrize={ui.arrivalPrize}
          onClose={dismissCpuModal}
        />
      )}
      {ui.kind === "cpu-quiz" && (
        <CpuQuizModal
          playerName={ui.playerName}
          question={ui.question}
          correct={ui.correct}
          amount={ui.amount}
          onClose={dismissCpuModal}
        />
      )}
      {ui.kind === "doom" && (
        <DoomModal
          playerName={ui.playerName}
          countryId={context.content.id}
          flavor={ui.flavor}
          spiritEmoji={context.content.spirit.emoji}
          wasKing={ui.wasKing}
          onClose={dismissDoom}
        />
      )}
      {ui.kind === "money-event" && (
        <MoneyEventModal
          playerName={ui.playerName}
          event={ui.event}
          amount={ui.amount}
          gained={ui.gained}
          onClose={dismissMoneyEvent}
        />
      )}
      {ui.kind === "intro" && <IntroModal context={context} session={session} onDepart={dismissIntro} />}
      {ui.kind === "season" && <SeasonModal season={ui.season} countryId={context.content.id} onContinue={dismissSeasonModal} />}
      {ui.kind === "next-leg" && (
        <NextLegModal
          context={context}
          session={session}
          firstTimeSpiritAppearance={ui.firstTimeSpiritAppearance}
          spiritHolderId={ui.spiritHolderId}
          onContinue={dismissNextLeg}
        />
      )}
      {ui.kind === "quiz" && (
        <QuizModal
          question={ui.question}
          currency={context.content.currency}
          optionOrder={ui.optionOrder}
          onAnswer={answerQuizOption}
        />
      )}
      {ui.kind === "quiz-result" && (
        <QuizResultModal
          context={context}
          question={ui.question}
          chosenOptionIndex={ui.chosenOptionIndex}
          correct={ui.correct}
          amount={ui.amount}
          savedByCharm={ui.savedByCharm}
          bonusItem={ui.bonusItem}
          onClose={dismissQuizResult}
        />
      )}
      {ui.kind === "city" && (
        <CityModal
          context={context}
          session={session}
          cityId={ui.cityId}
          arrivalPrize={ui.arrivalPrize}
          onBuy={buyCityProperty}
          onInvest={investCityProperty}
          onSell={sellCityProperty}
          onBuyItem={buyCityItem}
          onDone={closeCityModal}
        />
      )}
      {ui.kind === "game-over" && (
        <GameOverModal
          outcome={ui.outcome}
          currency={context.content.currency}
          context={context}
          onPlayAgain={backToSetup}
        />
      )}
    </div>
  );
}
