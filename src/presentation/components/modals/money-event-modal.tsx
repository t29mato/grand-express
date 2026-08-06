"use client";

import { MoneyEvent } from "../../../domain/board/money-event";
import { useLocale } from "../../i18n/locale-context";
import { EventAnimation } from "../events/event-animation";
import { Modal } from "./modal";

/**
 * 青マス・赤マスに止まったときの出来事。
 *
 * 金額だけを見せても「なぜ増えたのか」が分からないので、何が起きたのかを
 * 短い動く絵と2文の説明で見せる。話はその地方で起こりそうなものが選ばれる。
 */
export function MoneyEventModal({
  playerName,
  event,
  amount,
  gained,
  onClose,
}: {
  playerName: string;
  event: MoneyEvent;
  /** 表示用に整形済みの金額。 */
  amount: string;
  gained: boolean;
  onClose: () => void;
}) {
  const { t, tx } = useLocale();

  return (
    <Modal testId="money-event-modal">
      <EventAnimation eventId={event.id} gained={gained} />
      <div className="quiz-head" style={{ marginTop: 12 }}>
        <span className="quiz-stake">
          {event.emoji} {playerName}
        </span>
      </div>
      <h3>{tx(event.title)}</h3>
      <p>{tx(event.narrative)}</p>
      <p>
        <span className={gained ? "money" : "money neg"}>
          {gained ? `${t("eventGain")} +${amount}` : `${t("eventLoss")} −${amount}`}
        </span>
      </p>
      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className="btn ghost" onClick={onClose}>
          {t("continue")}
        </button>
      </div>
    </Modal>
  );
}
