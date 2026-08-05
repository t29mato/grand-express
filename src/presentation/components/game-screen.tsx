"use client";

import { NodeId } from "../../domain/shared-kernel/ids";
import { currentPlayer } from "../../domain/game-session/game-session";
import { useGameStore } from "../state/game-store";
import { BoardView } from "./board/board-view";
import { DiceButton } from "./hud/dice-button";
import { DiceStage } from "./hud/dice-stage";
import { DestinationCard, ItemBar, PlayersPanel, TravelLog } from "./hud/side-panel";
import { LocaleSwitch } from "./hud/locale-switch";
import { IntroModal } from "./modals/intro-modal";
import { SavedModal } from "./modals/saved-modal";
import { CpuCityModal } from "./modals/cpu-city-modal";
import { CpuQuizModal } from "./modals/cpu-quiz-modal";
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
  const dismissCpuModal = useGameStore((s) => s.dismissCpuModal);
  const dismissQuizResult = useGameStore((s) => s.dismissQuizResult);
  const diceRoll = useGameStore((s) => s.diceRoll);
  const clearDiceRoll = useGameStore((s) => s.clearDiceRoll);
  const { t } = useLocale();

  if (!context || !session) return null;

  const player = currentPlayer(session);
  const reachableSet: ReadonlySet<NodeId> | null = ui.kind === "choosing-square" ? new Set(ui.reachable.keys()) : null;

  return (
    <div className="game-screen">
      <header>
        <h1>Grand Express</h1>
        <div className="hdr-right">
          <LocaleSwitch />
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
            onChooseNode={(id) => chooseSquare(id)}
          />
          {diceRoll && <DiceStage key={diceRoll.nonce} targetValue={diceRoll.value} onDone={clearDiceRoll} />}
        </div>
        <aside>
          <DestinationCard context={context} session={session} />
          <DiceButton
            session={session}
            disabled={player.isCpu || ui.kind !== "idle"}
            cpuTurnPlayerName={
              ui.kind === "cpu-turn" || ui.kind === "cpu-city" || ui.kind === "cpu-quiz" ? ui.playerName : undefined
            }
            onRoll={rollForHumanTurn}
          />
          <ItemBar context={context} session={session} onUseItem={useInventoryItem} />
          <PlayersPanel context={context} session={session} />
          <TravelLog log={log} />
        </aside>
      </main>

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
          tier={ui.tier}
          chosenOptionIndex={ui.chosenOptionIndex}
          correct={ui.correct}
          amount={ui.amount}
          onClose={dismissCpuModal}
        />
      )}
      {ui.kind === "intro" && <IntroModal context={context} session={session} onDepart={dismissIntro} />}
      {ui.kind === "season" && <SeasonModal season={ui.season} onContinue={dismissSeasonModal} />}
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
        <QuizModal question={ui.question} tier={ui.tier} optionOrder={ui.optionOrder} onAnswer={answerQuizOption} />
      )}
      {ui.kind === "quiz-result" && (
        <QuizResultModal
          context={context}
          question={ui.question}
          tier={ui.tier}
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
