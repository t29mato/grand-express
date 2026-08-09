/**
 * legacy から抽出したアイテム説明の差し替え(ボリビア・日本)。
 *
 * インド・フランス・世界一周は `scripts/countries/*\/flavour.mjs` に文言があるが、
 * ボリビアと日本は `legacy/grand-express.html` から抽出している。
 * legacy は凍結しているため、変えたい文言はここに置く。
 *
 * 差し替えているのは、**legacy から効果を変えたのに説明が残っているもの**。
 *
 * - 移動アイテム(エケコ人形・飛行機のチケット): 目的地への瞬間移動をやめ、
 *   「大きく進むが向きは選べない」効果に変えた。
 * - お守り(パチャママの祝福・だるま): legacy は不正解を**正解に変えて賞金も満額**
 *   与えていた(`legacy/grand-express.html` 2566行 `ok=true`)。本作は学習が目的なので、
 *   **正誤は変えず損失だけを肩代わりする**挙動にしてある
 *   (`answer-quiz.use-case.ts` の意図的な仕様変更。値段も340→130に調整済み)。
 *   説明だけが legacy のまま「次の不正解を正解にする」と言っており、
 *   実際には正解にならないので、遊ぶ人には嘘になっていた。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

export const ITEM_TEXT = {
  bolivia: {
    pacha: {
      d: t(
        "Your next wrong answer costs you nothing — but it is still wrong.|Tu próximo fallo no te cuesta nada, pero sigue siendo un fallo.|Ta prochaine erreur ne te coûte rien — mais elle reste une erreur.|次の不正解の損失を肩代わりする。不正解であることは変わらない。",
      ),
    },
    ekeko: {
      d: t(
        "Carried 8–12 squares. Ekeko picks the road, not you.|Te lleva de 8 a 12 casillas. El camino lo elige Ekeko, no tú.|Emporté de 8 à 12 cases. C'est Ekeko qui choisit la route, pas toi.|8〜12マス運ばれる。道を決めるのはエケコ。",
      ),
    },
  },
  japan: {
    daruma: {
      d: t(
        "Your next wrong answer costs you nothing — but it is still wrong.|Tu próximo fallo no te cuesta nada, pero sigue siendo un fallo.|Ta prochaine erreur ne te coûte rien — mais elle reste une erreur.|次の不正解の損失を肩代わりする。不正解であることは変わらない。",
      ),
    },
    hikouki: {
      d: t(
        "Flown 8–12 squares, on whatever seat is free.|Vuelas de 8 a 12 casillas, en el asiento que quede libre.|Un vol de 8 à 12 cases, sur le siège encore libre.|8〜12マス飛ぶ。乗れるのは空席のある便だけ。",
      ),
    },
  },
};
