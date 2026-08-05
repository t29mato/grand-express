"use client";

import { useEffect, useRef, useState } from "react";
import { NodeId } from "../../domain/shared-kernel/ids";
import { currentPlayer } from "../../domain/game-session/game-session";
import { useGameStore } from "../state/game-store";
import { UiState } from "../state/game-store-types";
import { BoardView } from "./board/board-view";
import { DiceButton } from "./hud/dice-button";
import { DiceStage } from "./hud/dice-stage";
import { DestinationCard, ItemBar, PlayersPanel, TravelLog } from "./hud/side-panel";
import { QuizModal } from "./modals/quiz-modal";
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
  const { t } = useLocale();

  // ダイスロール直後(idle等 → choosing-square への遷移)を検知し、
  // 一度だけ3Dダイス演出を再生する。演出は完全に飾りであり、盤面のクリックは
  // ブロックしない(pointer-events:none)ので、ゲームの進行そのものには影響しない。
  const prevUiKindRef = useRef<UiState["kind"]>(ui.kind);
  const [diceRoll, setDiceRoll] = useState<{ nonce: number; steps: number } | null>(null);
  useEffect(() => {
    if (ui.kind === "choosing-square" && prevUiKindRef.current !== "choosing-square") {
      setDiceRoll((prev) => ({ nonce: (prev?.nonce ?? 0) + 1, steps: ui.steps }));
    }
    prevUiKindRef.current = ui.kind;
  }, [ui]);

  if (!context || !session) return null;

  const player = currentPlayer(session);
  const reachableSet: ReadonlySet<NodeId> | null = ui.kind === "choosing-square" ? new Set(ui.reachable.keys()) : null;

  return (
    <div className="game-screen">
      <header>
        <h1>Grand Express</h1>
        <div className="hdr-right">
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
          {diceRoll && <DiceStage key={diceRoll.nonce} targetValue={diceRoll.steps} onDone={() => setDiceRoll(null)} />}
        </div>
        <aside>
          <DestinationCard context={context} session={session} />
          <DiceButton session={session} disabled={player.isCpu || ui.kind !== "idle"} onRoll={rollForHumanTurn} />
          <ItemBar context={context} session={session} onUseItem={useInventoryItem} />
          <PlayersPanel context={context} session={session} />
          <TravelLog log={log} />
        </aside>
      </main>

      {ui.kind === "quiz" && (
        <QuizModal question={ui.question} tier={ui.tier} optionOrder={ui.optionOrder} onAnswer={answerQuizOption} />
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
      {ui.kind === "game-over" && <GameOverModal outcome={ui.outcome} onPlayAgain={backToSetup} />}
    </div>
  );
}
