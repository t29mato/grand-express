/**
 * legacy から抽出したアイテム説明の差し替え(ボリビア・日本)。
 *
 * インド・フランス・世界一周は `scripts/countries/*\/flavour.mjs` に文言があるが、
 * ボリビアと日本は `legacy/grand-express.html` から抽出している。
 * legacy は凍結しているため、変えたい文言はここに置く。
 *
 * いま差し替えているのは移動アイテム(エケコ人形・飛行機のチケット)だけ。
 * 目的地への瞬間移動をやめ、「大きく進むが向きは選べない」効果に変えたため、
 * 「目的地へ一気に」という説明が実態と合わなくなった。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

export const ITEM_TEXT = {
  bolivia: {
    ekeko: {
      d: t(
        "Carried 8–12 squares. Ekeko picks the road, not you.|Te lleva de 8 a 12 casillas. El camino lo elige Ekeko, no tú.|Emporté de 8 à 12 cases. C'est Ekeko qui choisit la route, pas toi.|8〜12マス運ばれる。道を決めるのはエケコ。",
      ),
    },
  },
  japan: {
    hikouki: {
      d: t(
        "Flown 8–12 squares, on whatever seat is free.|Vuelas de 8 a 12 casillas, en el asiento que quede libre.|Un vol de 8 à 12 cases, sur le siège encore libre.|8〜12マス飛ぶ。乗れるのは空席のある便だけ。",
      ),
    },
  },
};
