"use client";

import { CityId, PropertyIndex, PropertyRef } from "../../../domain/shared-kernel/ids";
import { GameSession } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../../application/game-engine-context";
import { CityVisitSummary } from "../../../application/use-cases/cpu-take-turn/cpu-take-turn.use-case";
import { useLocale } from "../../i18n/locale-context";
import { formatMoney } from "../../i18n/money-format";
import { CityArt } from "../city/city-art";
import { Modal } from "./modal";

/**
 * CPUが町に寄ったときの結果(legacyの `autoModal` によるCPU用の町モーダルの移植)。
 * 人間の手番と同じように「どの町に停まって、何を買ったのか」を見せる。
 * 一定時間で自動的に閉じるが、クリックすれば飛ばせる。
 */
export function CpuCityModal({
  context,
  session,
  playerName,
  cityId,
  visit,
  arrivalPrize,
  onClose,
}: {
  context: GameEngineContext;
  session: GameSession;
  playerName: string;
  cityId: CityId;
  visit: CityVisitSummary;
  arrivalPrize: number | null;
  onClose: () => void;
}) {
  const { t, tx } = useLocale();
  const city = context.getCity(cityId);
  const currency = context.content.currency;
  const boughtItem = visit.boughtItem
    ? context.content.items.find((i) => i.key === visit.boughtItem)
    : undefined;
  // 独占の判定は買い物の差分ではなく、実際の保有状況で行う。
  const owner = session.players.find((p) => p.name === playerName);
  const ownsAll =
    owner !== undefined &&
    city.properties.length > 0 &&
    city.properties.every((_, i) => owner.portfolio.has(PropertyRef.of(cityId, PropertyIndex(i))));

  return (
    <Modal>
      <CityArt context={context} cityId={cityId} />
      {arrivalPrize !== null && (
        <p className="fact">
          🎯 {t("destReached")} — +{formatMoney(arrivalPrize, currency)}
        </p>
      )}
      <div className="eyebrow">{t("townStopCpu", playerName)}</div>
      <h3>{tx(city.name)}</h3>
      <p style={{ color: "var(--salt-dim)" }}>{tx(city.tag)}</p>

      {visit.purchases.length > 0 && (
        <p className="cpu-bought">
          🏪{" "}
          {visit.purchases
            .map((i) => `${tx(city.properties[i].name)} (${formatMoney(city.properties[i].cost, currency)})`)
            .join(", ")}
        </p>
      )}
      {visit.upgrades.length > 0 && (
        <p className="cpu-invested">📈 {visit.upgrades.map((i) => tx(city.properties[i].name)).join(", ")}</p>
      )}
      {boughtItem && (
        <p className="cpu-invested">
          {boughtItem.emoji} {tx(boughtItem.name)}
        </p>
      )}
      {visit.purchases.length === 0 && visit.upgrades.length === 0 && !boughtItem && (
        <p style={{ color: "var(--salt-dim)", marginTop: 10 }}>{t("cpuBoughtNothing", playerName)}</p>
      )}
      {ownsAll && <div className="monopoly">{t("monopolyHave", tx(city.name))}</div>}

      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className="btn ghost" onClick={onClose}>
          {t("continue")}
        </button>
      </div>
    </Modal>
  );
}
