"use client";

import {
  DESTINATION_PRIZE_PER_MONTH,
  GameSession,
  currentPlayer,
  destinationPrize,
  spotlightPlayer,
} from "../../../domain/game-session/game-session";
import { totalIncome, monopolyCount, propertyCount } from "../../../domain/property/property-income-service";
import { GameEngineContext } from "../../../application/game-engine-context";
import { itemUseBlocker } from "../../../domain/item/item-usability";
import { economyContextFor } from "../../../application/economy-context";
import { useLocale } from "../../i18n/locale-context";
import { CityArt } from "../city/city-art";
import { renderRichText } from "../../i18n/rich-text";
import { formatMoney } from "../../i18n/money-format";
import { MoneyTicker } from "./money-ticker";
import { LogEntry } from "../../state/game-store";

const PLAYER_COLORS = ["#e8447a", "#f5b31c", "#37b3a4", "#7bc86c"];

/**
 * 次の目的地と、いま着けばもらえる賞金。
 *
 * ## 賞金の横に「なぜ増えるのか」を添える
 *
 * 賞金は月が進むごとに一定額ずつ増える(`DESTINATION_PRIZE_PER_MONTH`)。
 * 遊んだ人からは ¥7,000,000 → 7,700,000 → 8,400,000 → 9,100,000 と
 * **手番ごとに増えるのに理由がどこにも出ない**と見えていた
 * (実プレイの記録 2026-09-02)。
 * 増える理由が分かれば、遅れている人にも「取れば大きい」という希望が生まれる。
 */
export function DestinationCard({ context, session }: { context: GameEngineContext; session: GameSession }) {
  const { tx, t } = useLocale();
  const destination = context.getCity(session.destination);
  const bonus = destinationPrize(session).amount;
  const currency = context.content.currency;
  const growth = formatMoney(DESTINATION_PRIZE_PER_MONTH, currency);
  return (
    <div className="card dest-card">
      <h2>{t("nextDest")}</h2>
      <CityArt context={context} cityId={session.destination} bare />
      <div className="dest-city">{tx(destination.name)}</div>
      <div className="dest-tag">{tx(destination.tag)}</div>
      <div className="dest-bonus">+{formatMoney(bonus, currency)}</div>
      {/* 増える理由。金額のすぐ横に短く置く。 */}
      <div className="dest-bonus-growth">{t("bonusGrowth", growth)}</div>
    </div>
  );
}

export function PlayersPanel({ context, session }: { context: GameEngineContext; session: GameSession }) {
  const { tx, t } = useLocale();
  const economyContext = economyContextFor(context, session);
  const currency = context.content.currency;
  return (
    <div className="card players-card">
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
              {/* 派手に出すのは自分の駒だけ。CPUの手番でも毎回コインが弾けると、
                  見ているだけの時間が長くなる。 */}
              <MoneyTicker amount={p.cash.amount} currency={currency} emphatic={!p.isCpu} />
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

/**
 * 持ちものの一覧。
 *
 * もとは絵文字と名前だけを並べ、効果は `title` 属性に入れていた。
 * **`title` は触る画面では出ない**(長押ししても出ないブラウザが多い)ため、
 * スマホで遊ぶ人にとっては説明が無いのと同じだった。マウスでも、
 * 出るまで1秒近く待たされる。
 *
 * 持ちものは最大5個なので、**効果をいつでも読める札**にして全部見せている。
 * 押せるかどうかも、枠の色ではなく言葉(「使う」/「自動で効く」)で書く。
 */
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
  // **サイドバーの主役は、いつも画面の前の人。**
  // CPUの手番のあいだ、この欄がCPUの持ちものに切り替わって
  // 自分の持ちものが見えなくなっていた(実プレイの記録 2026-09-02)。
  // パス&プレイ(人間同士)では手番の人に切り替わる——そちらは正しい挙動なので、
  // `spotlightPlayer` が両方を1つの規則で決める。
  const player = spotlightPlayer(session);
  const acting = currentPlayer(session);
  const guest = acting.id !== player.id ? acting : null;
  return (
    <div className="card items-card">
      <h2>{t("items")}</h2>
      {player.inventory.length === 0 ? (
        <span className="empty">{t("noItems")}</span>
      ) : (
        <div className="items">
          {player.inventory.map((key, i) => {
            const item = context.content.items.find((it) => it.key === key)!;
            const passive = item.kind === "passive";
            // 局面の前提を満たしていなければ押せなくする。**押して何も起きず
            // アイテムだけ消えるのは行き止まり**なので(出目の選択画面で
            // 閉じるボタンを置かなかったのと同じ理由)。
            const blocker = passive ? null : itemUseBlocker(session, player, item.effect);
            const usable = !player.isCpu && !passive && !blocker;
            const body = (
              <>
                <span className="e" aria-hidden="true">
                  {item.emoji}
                </span>
                <span className="info">
                  <span className="nm">{tx(item.name)}</span>
                  <span className="sub">{tx(item.description)}</span>
                </span>
                {/* CPUの持ちものは押せないので「使う」は出さない(押せると誤解させない)。 */}
                {usable && <span className="item-tap">{t("useItem")}</span>}
                {passive && <span className="item-auto">{t("itemAuto")}</span>}
                {/* **理由を出す。**灰色になっているだけだと「壊れている」に見える。 */}
                {blocker && <span className="item-auto">{t(blocker)}</span>}
              </>
            );
            return usable ? (
              <button
                key={`${key}-${i}`}
                type="button"
                className="item usable"
                onClick={() => onUseItem(i)}
              >
                {body}
              </button>
            ) : (
              <div key={`${key}-${i}`} className={`item${passive ? " passive" : ""}`}>
                {body}
              </div>
            );
          })}
        </div>
      )}
      {/* 手番の人(CPU)の持ちものは、**小さく添えるだけ。**
          何を持っているかは盤面の読みに要るが、自分の持ちものを
          押しのけてまで出すものではない。 */}
      {guest && guest.inventory.length > 0 && (
        <div className="items-guest">
          <div className="items-guest-head">{t("cpuHolding", guest.name)}</div>
          <div className="items-guest-list">
            {guest.inventory.map((key, i) => {
              const item = context.content.items.find((it) => it.key === key)!;
              return (
                <span key={`${key}-${i}`} className="items-guest-item">
                  <span aria-hidden="true">{item.emoji}</span> {tx(item.name)}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function TravelLog({ log }: { log: readonly LogEntry[] }) {
  const { t, tx } = useLocale();
  // 新しく足した記録の文言(`spiritSparedLog` など)も引けるようにする。
  // ログの引数に含まれる{en,es,fr,ja}(都市名・物件名など)は表示時に現在の言語で解決する。
  const resolve = (arg: LogEntry["args"][number]) => (typeof arg === "object" ? tx(arg) : arg);
  return (
    <div className="card log-card">
      <h2>{t("travelLog")}</h2>
      <div id="log">
        {log.map((entry) => (
          <p key={entry.id} className={entry.tone}>
            {renderRichText(t(entry.key, ...entry.args.map(resolve)))}
          </p>
        ))}
      </div>
    </div>
  );
}
