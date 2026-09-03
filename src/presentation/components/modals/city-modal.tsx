"use client";

import { useEffect, useState } from "react";
import { CityId, ItemKey, PropertyIndex, PropertyRef } from "../../../domain/shared-kernel/ids";
import { GameSession, currentPlayer } from "../../../domain/game-session/game-session";
import { ownsProperty } from "../../../domain/player/player";
import { incomeAtLevel, sellValueOf, upgradeCost } from "../../../domain/property/property-income-service";
import { GameEngineContext } from "../../../application/game-engine-context";
import { stallPriceOf, stallStockFor } from "../../../application/use-cases/visit-stall/visit-stall.use-case";
import { useLocale } from "../../i18n/locale-context";
import { prefersReducedMotion } from "../../state/motion-preference";
import { CityArt } from "../city/city-art";
import { ArrivalCelebration } from "../events/arrival-celebration";
import { MoneyTicker } from "../hud/money-ticker";
import { formatMoney } from "../../i18n/money-format";
import { Modal } from "./modal";
import { BoughtBanner } from "./bought-banner";

/**
 * 買った直後に、モーダルを薄くして地図を見せる時間(ミリ秒)。
 *
 * - `PEEK_DELAY_MS`: 「買う」を押してから薄くなり始めるまで。
 *   先にのぼりが立つのを見せてから、地図へ目を移してもらう。
 * - `PEEK_HOLD_MS`: 薄くしている長さ。輪の色が変わるのを見るには 1 秒あれば足りる。
 *   長くすると「モーダルが消えた」と思って押してしまう。
 */
export const PEEK_DELAY_MS = 650;
export const PEEK_HOLD_MS = 1300;

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
   * 地図の輪が自分の色になっているか。盤面(`board-view.tsx`)は
   * **いちばん多く持っている人**の色を町に付け、同数なら付けない。
   * 同じ判定をここでもして、色が変わらないときは地図を見せに行かない
   * (見せても何も変わっていない)。
   */
  const mostHere = Math.max(
    0,
    ...session.players
      .filter((p) => p.id !== player.id)
      .map((p) => city.properties.filter((_, i) => p.portfolio.has(PropertyRef.of(cityId, PropertyIndex(i)))).length),
  );
  const townIsMine = ownedHere > mostHere;

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

  /*
   * ## 買った直後(F-08)
   *
   * 「買う」を押した瞬間に金が引かれ、同じ行に「増資」「売却」が並ぶだけだった。
   * 買ったことが静かすぎるうえ、隣の「売却」を誤タップすると即 35% の損になる。
   *
   * - `boughtHere`: **このモーダルを開いているあいだに**買った物件。
   *   その行にはのぼりを立て、売却ボタンを出さない。閉じれば忘れる
   *   (次に来たときは普通の持ち物件として売れる)。
   * - `peekRequest` → `peeking`: 買ったあと、モーダルを一瞬薄くして
   *   地図の町が自分の色に染まるのを見せる(v0.13.1 の輪の演出は
   *   モーダルの裏で起きていて、誰にも見えていなかった)。
   */
  const [boughtHere, setBoughtHere] = useState<ReadonlySet<PropertyRef>>(() => new Set());
  const [peekRequest, setPeekRequest] = useState(0);
  const [peeking, setPeeking] = useState(false);

  function handleBuy(index: PropertyIndex) {
    onBuy(index);
    setBoughtHere((prev) => new Set(prev).add(PropertyRef.of(cityId, index)));
    setPeekRequest((n) => n + 1);
  }

  useEffect(() => {
    /*
     * 動きを減らす設定では地図を見せに行かない。CSS の遷移は
     * `prefers-reduced-motion` で止まるので、残るのは「1.3秒間モーダルが
     * 薄いだけ」の待ち時間になってしまう。
     */
    if (peekRequest === 0 || !townIsMine || prefersReducedMotion()) return;
    const start = setTimeout(() => setPeeking(true), PEEK_DELAY_MS);
    const end = setTimeout(() => setPeeking(false), PEEK_DELAY_MS + PEEK_HOLD_MS);
    return () => {
      clearTimeout(start);
      clearTimeout(end);
      setPeeking(false);
    };
    /*
     * `townIsMine` も見る。「買う」の結果(セッションの更新)は同じ描画で届くのが
     * 普通だが、届くのが1拍遅れても、色が変わった時点で見せに行けるようにしておく。
     */
  }, [peekRequest, townIsMine]);

  /*
   * ## 売却の2段階(F-08)
   *
   * 売却は買値の 65% しか戻らない。1回押しただけで成立させない。
   * `confirmingSell` の行だけ「本当に売る?」に切り替わる。
   */
  const [confirmingSell, setConfirmingSell] = useState<PropertyRef | null>(null);

  return (
    <Modal testId="city-modal">
      <div className={`city-modal-body${peeking ? " peeking" : ""}`} data-testid="city-modal-body">
        {peeking && (
          <div className="peek-caption" role="status">
            {t("peekCaption")}
          </div>
        )}
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
              const justBought = boughtHere.has(ref);
              const confirming = confirmingSell === ref;
              const sellValue = sellValueOf(property.cost, level);
              return (
                <div
                  className={`prop owned${justBought ? " just-bought" : ""}${confirming ? " confirming" : ""}`}
                  key={i}
                  data-testid={`prop-${i}`}
                >
                  <div className="info">
                    <div className="nm">
                      {tx(property.name)}
                      <span className="lv">Lv{level}</span>
                      {justBought && <BoughtBanner label={t("justBought")} />}
                    </div>
                    <PropertyFigures income={formatMoney(incomeAtLevel(property.income, level), currency)} />
                  </div>
                  {confirming ? (
                    /* 「本当に売る?」——戻る額を、払った額より少ないことと一緒にもう一度出す。 */
                    <div className="sell-confirm" role="group" aria-label={t("sellConfirmAsk")}>
                      <div className="ask">
                        <b>{t("sellConfirmAsk")}</b> {t("sellConfirmNote", formatMoney(sellValue, currency))}
                      </div>
                      <div className="acts">
                        <button
                          type="button"
                          className="sell-yes"
                          onClick={() => {
                            setConfirmingSell(null);
                            onSell(ref);
                          }}
                        >
                          {t("sellYes")}
                        </button>
                        <button type="button" className="sell-no" onClick={() => setConfirmingSell(null)}>
                          {t("sellNo")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {level < 5 && (
                        <button className="up" disabled={!canInvest} onClick={() => onInvest(ref)}>
                          {t("invest")}
                        </button>
                      )}
                      {/* 買った直後の行には売却を出さない。隣にあると誤タップで即損になる。 */}
                      {!justBought && (
                        <button className="sell" onClick={() => setConfirmingSell(ref)}>
                          {t("sellFor", formatMoney(sellValue, currency))}
                        </button>
                      )}
                    </>
                  )}
                </div>
              );
            }
            const canBuy = !owner && player.cash.amount >= property.cost;
            const shortfall = property.cost - player.cash.amount;
            return (
              <div className={`prop${owner ? " owned" : ""}`} key={i} data-testid={`prop-${i}`}>
                <div className="info">
                  <div className="nm">{tx(property.name)}</div>
                  <PropertyFigures
                    price={formatMoney(property.cost, currency)}
                    income={formatMoney(property.income, currency)}
                  />
                  {/* 買えるなら買ったあとの残り、買えないなら足りない額。
                      「買えません」だけでは、いくら足りないのか分からない。 */}
                  {owner ? (
                    <div className="note who">{t("ownerLabel", owner.name)}</div>
                  ) : canBuy ? (
                    <div className="note ok">{t("afterBuying", formatMoney(player.cash.amount - property.cost, currency))}</div>
                  ) : (
                    <div className="note ng">{t("shortBy", formatMoney(shortfall, currency))}</div>
                  )}
                </div>
                {!owner && (
                  <button disabled={!canBuy} onClick={() => handleBuy(PropertyIndex(i))}>
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
      </div>
    </Modal>
  );
}

/**
 * 物件の数字を「価格」「収入」の2段にラベル付きで出す(F-16)。
 *
 * 「¥12,000,000 ・ +¥2,480,000/qtr ・ 残り ¥3,400,000」と数字が1行に3つ並ぶと、
 * 初見でどれが何か分からない。**数字だけを並べない。**
 * 自分の物件は価格を出さない(もう払ったあとなので、収入だけでよい)。
 */
function PropertyFigures({ price, income }: { price?: string; income: string }) {
  const { t } = useLocale();
  return (
    <dl className="figs">
      {price !== undefined && (
        <div className="fig">
          <dt>{t("priceLabel")}</dt>
          <dd>{price}</dd>
        </div>
      )}
      <div className="fig">
        <dt>{t("incomeLabel")}</dt>
        <dd className="plus">+{income}</dd>
      </div>
    </dl>
  );
}
