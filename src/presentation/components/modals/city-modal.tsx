"use client";

import { CityId, ItemKey, PropertyIndex, PropertyRef } from "../../../domain/shared-kernel/ids";
import { GameSession, currentPlayer } from "../../../domain/game-session/game-session";
import { ownsProperty } from "../../../domain/player/player";
import { incomeAtLevel, sellValueOf, upgradeCost } from "../../../domain/property/property-income-service";
import { GameEngineContext } from "../../../application/game-engine-context";
import { stallPriceOf, stallStockFor } from "../../../application/use-cases/visit-stall/visit-stall.use-case";
import { useLocale } from "../../i18n/locale-context";
import { CityArt } from "../city/city-art";
import { formatMoney } from "../../i18n/money-format";
import { Modal } from "./modal";

export function CityModal({
  context,
  session,
  cityId,
  arrivalPrize,
  onBuy,
  onInvest,
  onSell,
  onBuyItem,
  onDone,
}: {
  context: GameEngineContext;
  session: GameSession;
  cityId: CityId;
  arrivalPrize: number | null;
  onBuy: (index: PropertyIndex) => void;
  onInvest: (ref: PropertyRef) => void;
  onSell: (ref: PropertyRef) => void;
  onBuyItem: (key: ItemKey) => void;
  onDone: () => void;
}) {
  const { tx, t } = useLocale();
  const city = context.getCity(cityId);
  const player = currentPlayer(session);
  const stock = stallStockFor(context, cityId, session.month);
  const currency = context.content.currency;

  return (
    <Modal testId="city-modal">
      <CityArt context={context} cityId={cityId} />
      <div className="eyebrow">{t("townStop")}</div>
      <h3>{tx(city.name)}</h3>
      <p style={{ color: "var(--salt-dim)" }}>{tx(city.tag)}</p>
      {arrivalPrize !== null && (
        <p className="fact">
          🎯 {t("destReached")} — +{formatMoney(arrivalPrize, currency)}
        </p>
      )}
      <div className="plist">
        {city.properties.map((property, i) => {
          const ref = PropertyRef.of(cityId, PropertyIndex(i));
          const owner = session.players.find((p) => ownsProperty(p, ref));
          const level = player.portfolio.get(ref);
          if (owner?.id === player.id && level) {
            const cost = upgradeCost(property.cost, level);
            const canInvest = level < 5 && player.cash.amount >= cost;
            return (
              <div className="prop owned" key={i}>
                <div className="info">
                  <div className="nm">
                    {tx(property.name)}
                    <span className="lv">Lv{level}</span>
                  </div>
                  <div className="sub">+{formatMoney(incomeAtLevel(property.income, level), currency)}/qtr</div>
                </div>
                {level < 5 && (
                  <button className="up" disabled={!canInvest} onClick={() => onInvest(ref)}>
                    {t("invest")}
                  </button>
                )}
                <button className="sell" onClick={() => onSell(ref)}>
                  {t("sellFor", formatMoney(sellValueOf(property.cost, level), currency))}
                </button>
              </div>
            );
          }
          const canBuy = !owner && player.cash.amount >= property.cost;
          return (
            <div className={`prop${owner ? " owned" : ""}`} key={i}>
              <div className="info">
                <div className="nm">{tx(property.name)}</div>
                <div className="sub">
                  {formatMoney(property.cost, currency)} · +{formatMoney(property.income, currency)}/qtr {owner && `· ${owner.name}`}
                </div>
              </div>
              {!owner && (
                <button disabled={!canBuy} onClick={() => onBuy(PropertyIndex(i))}>
                  {canBuy ? t("buy") : t("tooDear")}
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className="eyebrow" style={{ marginTop: 18 }}>
        {t("shopTitle")}
      </div>
      <div className="shoplist">
        {stock.map((key) => {
          const item = context.content.items.find((i) => i.key === key)!;
          // 売値は固定ではない(目的地へ飛ぶアイテムは賞金に連動する)。
          const price = stallPriceOf(context, session, key).amount;
          const canBuy = player.inventory.length < 5 && player.cash.amount >= price;
          return (
            <div className="shop" key={key}>
              <span className="e">{item.emoji}</span>
              <div className="info">
                <div className="nm">{tx(item.name)}</div>
                <div className="sub">
                  {tx(item.description)} · {formatMoney(price, currency)}
                </div>
              </div>
              <button disabled={!canBuy} onClick={() => onBuyItem(key)}>
                {player.inventory.length >= 5 ? t("bagFull") : canBuy ? t("buy") : t("tooDear")}
              </button>
            </div>
          );
        })}
      </div>
      <div className="btnrow">
        <button className="btn" onClick={onDone}>
          {t("backToRails")}
        </button>
      </div>
    </Modal>
  );
}
