import { Money } from "../shared-kernel/money";
import { ItemDefinition } from "./item";

/**
 * 屋台での売値と、そもそも売り物にするかどうか。
 *
 * legacy はすべてのアイテムに固定価格を付けていたが、それだと
 * **買うだけで確実に得をするアイテム**が生まれてしまう。
 *
 *   - 飛行機(目的地へ瞬間移動)は560。目的地の賞金は `700 + 70×月` で
 *     増えていくので、初月でも+140、2年目には+1820の確定利益になる。
 *   - 招き猫(現金380)は280。常に+100。
 *
 * どちらも「買わない理由がない」ため、選択が選択でなくなる。
 * ここで価格と品揃えを決め直す。
 */

/** 目的地へ飛ぶアイテムの、賞金に対する上乗せ率。 */
const TELEPORT_PRICE_RATIO = 1.2;

/**
 * 屋台に並ぶかどうか。
 *
 * 現金がそのまま手に入るアイテムは屋台では売らない。売値より多い現金が
 * 返ってくるなら必ず買うのが正解になり、売値より少ないなら誰も買わない。
 * どちらに転んでも選択にならないので、**カードマスの当たりとしてだけ**残す。
 */
export function isSoldAtStall(item: ItemDefinition): boolean {
  return item.effect.type !== "gain-cash";
}

/**
 * いまの売値。
 *
 * 目的地へ飛ぶアイテムは、その時点の賞金に連動させる。固定価格だと、
 * 賞金が育つ終盤ほど「買えば確実に儲かる」度合いが大きくなってしまう。
 * 賞金より2割高くしておけば、賞金目当てに買うと損になり、
 * **早く着きたい・他の人に先を越されたくないときに買う**アイテムになる。
 */
export function itemPrice(item: ItemDefinition, destinationPrize: Money): Money {
  if (item.effect.type === "teleport-to-destination") {
    return Money.of(Math.ceil(destinationPrize.amount * TELEPORT_PRICE_RATIO));
  }
  return Money.of(item.price);
}
