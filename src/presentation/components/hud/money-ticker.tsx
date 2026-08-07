"use client";

import type { CSSProperties } from "react";
import { CurrencyFormat } from "../../../domain/country/country-content-pack";
import { useCountUp } from "../../hooks/use-count-up";
import { formatMoney } from "../../i18n/money-format";

/**
 * 「見せ場」とみなす増減の境目。
 *
 * 金額を数えてから決めた値。日常の増減(クイズ 30〜220、青赤マス 120〜320)と、
 * 目的地の到着賞金(700〜3150)のあいだが空いているので、その谷に置いてある。
 * ここを下回る増減では、コインは弾けない。
 */
export const BIG_CHANGE = 500;

/** 弾けるコインの数と向き。**乱数を使わない**(撮って見比べるとき、毎回同じ絵にするため)。 */
const COINS = Array.from({ length: 7 }, (_, i) => {
  const angleDeg = -160 + i * (140 / 6);
  const angle = (angleDeg * Math.PI) / 180;
  const distance = 26 + (i % 3) * 8;
  return {
    dx: Math.cos(angle) * distance,
    dy: Math.sin(angle) * distance,
    delay: (i % 4) * 26,
  };
});

export interface MoneyTickerProps {
  /** 内部の金額(表示のときに通貨の倍率が掛かる)。 */
  amount: number;
  currency: CurrencyFormat;
  /**
   * 派手に出すか。**自分の駒だけ true にする。**
   * CPUの手番でも毎回コインが弾けると、見ているだけの時間が長くなるため。
   */
  emphatic?: boolean;
}

/**
 * 所持金の表示。値が変わると数字が転がり、増減が色と動きで分かる。
 *
 * 数字が切り替わるだけだと、+3,150 の到着も -30 のクイズ外しも同じ重みに見える。
 * 動く時間を増減の大きさに比例させ、大きいものにだけコイン(増)と揺れ(減)を足して、
 * 見せ場とふだんの上下を見分けられるようにしている。
 *
 * 音(`playCoin` / `playWrong` / `playArrival`)は所持金が変わるのと同じ瞬間に
 * ストア側で鳴る。**コインと揺れも同じ瞬間から始める**(数字が転がり終わってから
 * 出すと音から遅れて安っぽくなる)。
 */
export function MoneyTicker({ amount, currency, emphatic = false }: MoneyTickerProps) {
  const { display, delta, nonce, running } = useCountUp(amount);

  const tone = delta > 0 ? "up" : delta < 0 ? "down" : "";
  const big = Math.abs(delta) >= BIG_CHANGE;
  const burst = emphatic && big && delta > 0;
  const shake = emphatic && big && delta < 0;

  return (
    <span className={`pcash money-ticker${running && tone ? ` ${tone}` : ""}${shake && running ? " shake" : ""}`}>
      {/* 転がっている途中の数字は読み上げに出さない。読み上げは確定した金額だけでよい。 */}
      <span aria-hidden="true">{formatMoney(display, currency)}</span>
      <span className="sr-only">{formatMoney(amount, currency)}</span>

      {delta !== 0 && (
        // key を付け替えることで、増減のたびに要素が作り直されて演出が最初から流れる。
        <span key={nonce} className={`money-delta ${tone}${big ? " big" : ""}`} aria-hidden="true">
          {delta > 0 ? "+" : "−"}
          {formatMoney(Math.abs(delta), currency)}
        </span>
      )}

      {burst && (
        <span key={`burst-${nonce}`} className="coin-burst" aria-hidden="true">
          {COINS.map((coin, i) => (
            <span
              key={i}
              className="coin"
              style={
                {
                  "--dx": `${coin.dx.toFixed(1)}px`,
                  "--dy": `${coin.dy.toFixed(1)}px`,
                  "--delay": `${coin.delay}ms`,
                } as CSSProperties
              }
            />
          ))}
        </span>
      )}
    </span>
  );
}
