"use client";

import { GameSession, currentPlayer } from "../../../domain/game-session/game-session";
import { totalIncome, monopolyCount, propertyCount } from "../../../domain/property/property-income-service";
import { GameEngineContext } from "../../../application/game-engine-context";
import { economyContextFor } from "../../../application/economy-context";
import { useLocale } from "../../i18n/locale-context";
import { CityArt } from "../city/city-art";
import { formatMoney } from "../../i18n/money-format";
import { LogEntry } from "../../state/game-store";

const PLAYER_COLORS = ["#e8447a", "#f5b31c", "#37b3a4", "#7bc86c"];

export function DestinationCard({ context, session }: { context: GameEngineContext; session: GameSession }) {
  const { tx, t } = useLocale();
  const destination = context.getCity(session.destination);
  const bonus = 700 + 70 * session.month;
  const currency = context.content.currency;
  return (
    <div className="card dest-card">
      <h2>{t("nextDest")}</h2>
      <CityArt context={context} cityId={session.destination} bare />
      <div className="dest-city">{tx(destination.name)}</div>
      <div className="dest-tag">{tx(destination.tag)}</div>
      <div className="dest-bonus">+{formatMoney(bonus, currency)}</div>
    </div>
  );
}

export function PlayersPanel({ context, session }: { context: GameEngineContext; session: GameSession }) {
  const { tx, t } = useLocale();
  const economyContext = economyContextFor(context, session);
  const currency = context.content.currency;
  return (
    <div className="card">
      <h2>{t("travelers")}</h2>
      <div className="players">
        {session.players.map((p, i) => {
          const active = session.players[session.activePlayerIndex]?.id === p.id;
          const mono = monopolyCount(p, economyContext);
          return (
            <div key={p.id} className={`prow${active ? " active" : ""}`}>
              <span className="pdot" style={{ background: PLAYER_COLORS[i % PLAYER_COLORS.length] }} />
              <span className="pname">
                {p.name}
                {p.isCpu && <span className="cpu-tag">CPU</span>}
                {session.misfortune.holderId === p.id && session.misfortune.level > 0 && " 👹"}
                <div className="pprops">
                  {propertyCount(p)} {t("biz")} · +{formatMoney(totalIncome(p, economyContext).amount, currency)}
                  {mono > 0 && ` · 👑${mono}`}
                </div>
              </span>
              <span className="pcash">{formatMoney(p.cash.amount, currency)}</span>
            </div>
          );
        })}
      </div>
      <div className="date-chip" style={{ marginTop: 10 }}>
        {t("year")} {Math.floor(session.month / 12) + 1} · {tx(context.content.name)}
      </div>
    </div>
  );
}

export function ItemBar({
  context,
  session,
  onUseItem,
}: {
  context: GameEngineContext;
  session: GameSession;
  onUseItem: (index: number) => void;
}) {
  const { tx, t } = useLocale();
  const player = currentPlayer(session);
  return (
    <div className="card">
      <h2>{t("items")}</h2>
      {player.inventory.length === 0 ? (
        <span className="empty">{t("noItems")}</span>
      ) : (
        <div className="items">
          {player.inventory.map((key, i) => {
            const item = context.content.items.find((it) => it.key === key)!;
            const usable = !player.isCpu && item.kind !== "passive";
            return (
              <div
                key={`${key}-${i}`}
                className={`item${usable ? " usable" : ""}${item.kind === "passive" ? " passive" : ""}`}
                onClick={usable ? () => onUseItem(i) : undefined}
                title={tx(item.description)}
              >
                <span className="e">{item.emoji}</span>
                <span>{tx(item.name)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function TravelLog({ log }: { log: readonly LogEntry[] }) {
  const { t } = useLocale();
  return (
    <div className="card">
      <h2>{t("travelLog")}</h2>
      <div id="log">
        {log.map((entry) => (
          <p key={entry.id} className={entry.tone}>
            {entry.text}
          </p>
        ))}
      </div>
    </div>
  );
}
