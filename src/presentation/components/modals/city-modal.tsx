"use client";

import { useState } from "react";
import { CityId, ItemKey, PropertyIndex, PropertyRef } from "../../../domain/shared-kernel/ids";
import { GameSession, currentPlayer } from "../../../domain/game-session/game-session";
import { ownsProperty } from "../../../domain/player/player";
import { incomeAtLevel, sellValueOf, upgradeCost } from "../../../domain/property/property-income-service";
import { GameEngineContext } from "../../../application/game-engine-context";
import { stallPriceOf, stallStockFor } from "../../../application/use-cases/visit-stall/visit-stall.use-case";
import { useLocale } from "../../i18n/locale-context";
import { CityArt } from "../city/city-art";
import { ArrivalCelebration } from "../events/arrival-celebration";
import { MoneyTicker } from "../hud/money-ticker";
import { formatMoney } from "../../i18n/money-format";
import { Modal } from "./modal";

export function CityModal({
  context,
  session,
  cityId,
  arrivalPrize,
  firstVisit,
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
  /** この人がこの町に止まるのが初めてか。2回目以降は絵と紹介を畳む。 */
  firstVisit: boolean;
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

  /*
   * この町で自分が持っている数。**独占(全部そろえると収入が倍)は、
   * 数を出さないと伝わらない。** 文言(`monopolyPart` / `monopolyHave`)は
   * 4言語そろっていたのに、どこからも呼ばれていなかった。
   */
  const ownedHere = city.properties.filter((_, i) =>
    player.portfolio.has(PropertyRef.of(cityId, PropertyIndex(i))),
  ).length;
  const ownsAllHere = city.properties.length > 0 && ownedHere === city.properties.length;

  /*
   * **2回目以降は、絵と紹介を畳む。**
   *
   * 同じ町の同じ絵と同じ一言を、1回の対局で何度も最後まで見せられるのが
   * テンポを重くしていた(「停止マスが多すぎる」という報せの一因)。
   * ただし**捨てはしない。**畳んだ町でも押せば開く。1回目に読み飛ばした人が
   * あとから読めなくなるほうが困る。
   *
   * **目的地に着いたときだけは、2回目でも畳まない。**あれはこの遊びの
   * いちばん大きな見せ場で、短くするところではない。
   */
  const arrived = arrivalPrize !== null;
  const [opened, setOpened] = useState(false);
  const showArt = firstVisit || arrived || opened;

  return (
    <Modal testId="city-modal">
      {/* 目的地に着いたときは、町の絵の代わりに到着のお祝いを見せる。
          ここがこのゲームでいちばん大きな見せ場なので、金額の文字だけでは寂しい。 */}
      {arrived ? (
        <div className="event-anim">
          <ArrivalCelebration />
        </div>
      ) : (
        showArt && <CityArt context={context} cityId={cityId} />
      )}
      <div className="eyebrow">{t("townStop")}</div>
      <h3>{tx(city.name)}</h3>
      {showArt ? (
        <p style={{ color: "var(--salt-dim)" }}>{tx(city.tag)}</p>
      ) : (
        /* 畳んでいるときは、町の名前の下に「もう一度見る」だけを置く。
           一言も隠すのは、それを読むために止まっているわけではないため。 */
        <button type="button" className="city-again" onClick={() => setOpened(true)}>
          {t("seeTownAgain")}
        </button>
      )}
      {arrivalPrize !== null && (
        <p className="fact">
          🎯 {t("destReached")} — +{formatMoney(arrivalPrize, currency)}
        </p>
      )}
      {/*
        手持ち。**買う画面に出ていなかった。**
        「30万の物件」と言われても、手元が20万なのか100万なのかが分からないと決められない。
        右のパネルには出ているが、幅834pxではモーダルを開くと画面の外へ出てしまう(実測)。
        `MoneyTicker` を使うので、買った瞬間に数字が転がって減る。
      */}
      <div
        className="fact"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}
      >
        <span style={{ color: "var(--salt-dim)" }}>{t("yourCash")}</span>
        <MoneyTicker amount={player.cash.amount} currency={currency} emphatic />
      </div>
      {/*
        独占まであと何件か。全部そろうと収入が倍になるが、それがどこにも書かれていなかった。
      */}
      {city.properties.length > 1 && (
        <div className="monopoly">
          {ownsAllHere
            ? t("monopolyHave", tx(city.name))
            : t("monopolyPart", String(ownedHere), String(city.properties.length))}
        </div>
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
          const shortfall = property.cost - player.cash.amount;
          return (
            <div className={`prop${owner ? " owned" : ""}`} key={i}>
              <div className="info">
                <div className="nm">{tx(property.name)}</div>
                <div className="sub">
                  {formatMoney(property.cost, currency)} · +{formatMoney(property.income, currency)}/qtr {owner && `· ${owner.name}`}
                  {/* 買えるなら買ったあとの残り、買えないなら足りない額。
                      「買えません」だけでは、いくら足りないのか分からない。 */}
                  {!owner &&
                    (canBuy ? (
                      <span style={{ color: "var(--green)" }}>
                        {" "}
                        · {t("afterBuying", formatMoney(player.cash.amount - property.cost, currency))}
                      </span>
                    ) : (
                      <span style={{ color: "var(--red)" }}> · {t("shortBy", formatMoney(shortfall, currency))}</span>
                    ))}
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
          const price = stallPriceOf(context, key).amount;
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
