import { LocalizedText } from "../../domain/shared-kernel/localized-text";

/**
 * プレイヤー向けのリリースノート。
 *
 * 開発上の変更履歴(コミットログ)ではなく、**遊ぶ人から見て何が変わったか**を書く。
 * アプリ本体と同じく4言語で表示するため、文言は `LocalizedText` で持つ。
 * 新しい版は配列の先頭に追加すること(新しい順に表示される)。
 */
export interface ReleaseNote {
  readonly version: string;
  /** 公開日(YYYY-MM-DD)。 */
  readonly date: string;
  readonly title: LocalizedText;
  readonly highlights: readonly LocalizedText[];
}

/** `_t("en|es|fr|ja")` と同じ書き方で4言語を1行にまとめるヘルパー。 */
function t(source: string): LocalizedText {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

export const RELEASE_NOTES: readonly ReleaseNote[] = [
  {
    version: "0.3.0",
    date: "2026-08-06",
    title: t("Learning, properly|Aprender de verdad|Vraiment apprendre|ちゃんと学べるように"),
    highlights: [
      t(
        "Answering a quiz now always shows the correct answer and the explanation — even when you get it right.|Al responder ahora siempre se muestra la respuesta correcta y la explicación, incluso si aciertas.|Après chaque question, la bonne réponse et l'explication s'affichent — même en cas de réussite.|クイズに答えると、正解と解説が必ず表示されるようになりました(正解したときも)。",
      ),
      t(
        "At the end of the journey you get a review of every question the table got wrong.|Al final del viaje verás un repaso de todas las preguntas falladas en la mesa.|En fin de voyage, un récapitulatif de toutes les questions ratées à la table.|旅の終わりに、その卓で間違えた問題をおさらいできるようになりました。",
      ),
      t(
        "Questions no longer repeat until the whole set has been used.|Las preguntas ya no se repiten hasta agotar el conjunto.|Les questions ne se répètent plus avant d'avoir toutes été posées.|同じ問題が続けて出ないようになりました(ひと通り出るまで重複しません)。",
      ),
      t(
        "Each player can now say how well they know the country. Newcomers get two choices instead of three and bigger rewards; locals earn less and risk more.|Cada jugador indica cuánto conoce el país: quien es nuevo elige entre dos opciones y gana más; quien lo conoce bien gana menos y arriesga más.|Chaque joueur indique s'il connaît le pays : les novices ont deux choix et gagnent plus, les connaisseurs gagnent moins et risquent plus.|プレイヤーごとに「この国をどれくらい知っているか」を選べます。はじめての人は3択が2択になり賞金も多め、くわしい人は賞金が控えめで損失は重めになります。",
      ),
      t(
        "Lucky charms now absorb the loss instead of turning a wrong answer into a right one, so you always know when you missed.|Los amuletos ahora absorben la pérdida en vez de convertir un fallo en acierto, así siempre sabes si fallaste.|Les amulettes absorbent désormais la perte au lieu de transformer une erreur en réussite : tu sais toujours quand tu t'es trompé.|お守りは「不正解を正解に変える」のをやめ、損失を肩代わりするだけになりました。自分が間違えたことが分かるようになります。",
      ),
    ],
  },
  {
    version: "0.2.0",
    date: "2026-08-06",
    title: t("A bigger board and livelier rivals|Un tablero mayor y rivales más vivos|Un plateau plus grand, des rivaux plus vivants|広い盤面と、動きの見える対戦相手"),
    highlights: [
      t(
        "Japan now has at least one town in every prefecture (30 → 52), including Mito, Kawagoe, Hikone, Kōyasan and Hagi.|Japón tiene ahora al menos una ciudad por prefectura (30 → 52), incluidas Mito, Kawagoe, Hikone, Kōyasan y Hagi.|Le Japon compte désormais au moins une ville par préfecture (30 → 52), dont Mito, Kawagoe, Hikone, Kōyasan et Hagi.|日本の都市が全47都道府県をカバーしました(30→52都市)。水戸・川越・彦根・高野山・萩などを追加。",
      ),
      t(
        "The maps were redrawn to follow the real coastlines and borders more closely.|Los mapas se han redibujado siguiendo mejor las costas y fronteras reales.|Les cartes ont été redessinées pour suivre de plus près les côtes et frontières réelles.|地図の形を実際の海岸線・国境に近づけました。",
      ),
      t(
        "You can drag the map to look around and zoom with the wheel. Town names no longer overlap.|Puedes arrastrar el mapa y hacer zoom con la rueda. Los nombres ya no se solapan.|Tu peux faire glisser la carte et zoomer à la molette. Les noms ne se chevauchent plus.|地図をドラッグで動かせるようになり、ホイールで拡大縮小もできます。都市名が重ならなくなりました。",
      ),
      t(
        "On the rivals' turns you now see the dice roll, the move, and exactly what they bought.|En los turnos de los rivales verás la tirada, el movimiento y qué compraron exactamente.|Pendant le tour des rivaux, tu vois le lancer, le déplacement et ce qu'ils ont acheté.|CPUの手番でも、サイコロ・移動・何を買ったのかが見えるようになりました。",
      ),
      t(
        "The language can be changed during a game, and the travel log is translated too.|Se puede cambiar el idioma durante la partida, y el registro también se traduce.|La langue peut être changée en cours de partie, et le journal est aussi traduit.|ゲーム中でも言語を切り替えられるようになりました。旅の記録も翻訳されます。",
      ),
      t(
        "Money is shown in each country's currency (Bs 1,200 / ¥120,000).|El dinero se muestra en la moneda de cada país (Bs 1.200 / ¥120 000).|L'argent s'affiche dans la monnaie du pays (Bs 1 200 / ¥120 000).|金額が国ごとの通貨表記になりました(Bs 1,200 / ¥120,000)。",
      ),
    ],
  },
  {
    version: "0.1.0",
    date: "2026-08-05",
    title: t("First journey|Primer viaje|Premier voyage|最初の旅"),
    highlights: [
      t(
        "Two countries to travel — Bolivia and Japan — in four languages.|Dos países para viajar — Bolivia y Japón — en cuatro idiomas.|Deux pays à parcourir — Bolivie et Japon — en quatre langues.|ボリビアと日本の2ヶ国を、4言語で旅できます。",
      ),
      t(
        "Music that changes with the region, sound effects, and a rolling 3D die.|Música que cambia según la región, efectos de sonido y un dado 3D.|Une musique qui change selon la région, des effets sonores et un dé 3D.|地方によって変わる音楽、効果音、3Dのサイコロ。",
      ),
      t(
        "Towns tell their story and sell businesses; buy every business in a town to double its income.|Los pueblos cuentan su historia y venden negocios; cómpralos todos para duplicar la renta.|Les villes racontent leur histoire et vendent des affaires ; achète-les toutes pour doubler le revenu.|町では解説を読み、物件を買えます。町の物件を全部買うと収入が2倍に。",
      ),
      t(
        "Your journey is saved in this browser, so you can continue later.|Tu viaje se guarda en este navegador para continuar más tarde.|Ton voyage est enregistré dans ce navigateur pour reprendre plus tard.|旅はブラウザに保存され、あとから続きから遊べます。",
      ),
    ],
  },
];

/** ビルド時に埋め込まれたバージョン(`next.config.ts` 参照)。 */
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "0.0.0";
/** ビルド時のコミット(Vercel以外では空)。 */
export const APP_COMMIT = process.env.NEXT_PUBLIC_APP_COMMIT ?? "";
