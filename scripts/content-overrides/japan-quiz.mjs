/**
 * 日本のクイズの差し替え。
 *
 * ## なぜ要るか
 *
 * 日本(とボリビア)のクイズは `legacy/grand-express.html` に書かれている。
 * legacy は凍結しているので直接は直せない。背景と同じく、ここで上書きする。
 *
 * ## 直したもの — **都市カードが答えをそのまま書いていた2問**
 *
 * 2026-08-09 に `node scripts/check-quiz.mjs` で全40問 × 全74カードを
 * 突き合わせて見つけたもの。カードを読んだ人は考えずに答えられる。
 *
 * ```
 * Q17 東大寺大仏殿は?      → 世界最大級の木造建築
 *     奈良カード「東大寺の大仏は高さ15m、世界最大級の木造建築に収まる。」
 * Q19 沖縄はかつて何という独立国? → 琉球王国
 *     那覇カード(tag)「琉球王国の都」
 * ```
 *
 * ## 差し替えるときの約束
 *
 * legacy にはこの約束が書かれていない(クイズを組み立てる
 * `const Q=(q,o,f)=>({...,a:0,...})` があるだけ)。**ここが唯一の置き場所である。**
 *
 * - **都市カードが扱う題材は出さない。**74枚あるので、目で見ても確かめきれない。
 *   `node scripts/check-quiz.mjs japan` を回す。
 *   **直したあとにもう一度回すこと。**茨城では2回目で4件目が出た
 * - **「なぜ」を問わない。**「何が」「どこが」「いくつ」にする
 * - **誤答は実在するものにする。**明らかな嘘を並べると消去法で解ける
 * - 難易度は元の問題の枠を保つ(`quiz-difficulty.mjs` が件数を検査するため)
 *
 * > `a`(正解の位置)は 0 のままでよい。出題時に `visibleOptionOrder()` が混ぜ直す。
 * > legacy の `Q()` が `a:0` を固定しているのはそのためで、不具合ではない。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

function q(question, options, answerIndex, fact) {
  return { q: t(question), o: options.map(t), a: answerIndex, f: t(fact) };
}

export const JAPAN_QUIZ_REPLACEMENTS = {
  /**
   * 元: 「奈良の大仏を収める東大寺大仏殿は?」→ 世界最大級の木造建築
   * 奈良のカードが答えをそのまま書いていた。
   *
   * 差し替え先は**国土に占める森林の割合**。74枚のカードにも他の31問にも無い。
   */
  16: q(
    "Roughly what share of Japan's land is forest?|¿Qué parte del suelo japonés es bosque, aproximadamente?|Quelle part du sol japonais est couverte de forêt, à peu près ?|日本の国土のうち、森林はおよそどれくらいを占めるか?",
    [
      "About a tenth|Alrededor de una décima parte|Environ un dixième|およそ10分の1",
      "About a third|Alrededor de un tercio|Environ un tiers|およそ3分の1",
      "About two thirds|Alrededor de dos tercios|Environ deux tiers|およそ3分の2",
    ],
    2,
    "It is one of the highest shares among wealthy countries, and it is not left-over wilderness: about four tenths of it was planted, much of it cedar and cypress put in after the war. The mountains are too steep to farm or build on, so the people are packed into the plains — which is why a country that is mostly trees also has some of the most crowded cities on earth.|Es de las proporciones más altas entre los países ricos, y no es bosque sobrante: cuatro décimas partes fueron plantadas, sobre todo cedro y ciprés de posguerra. Las montañas son demasiado empinadas para cultivar, así que la gente se apiña en las llanuras.|C'est l'une des plus fortes proportions parmi les pays riches, et ce n'est pas une friche : quatre dixièmes ont été plantés, surtout du cèdre et du cyprès d'après-guerre. Les montagnes étant trop raides, les gens s'entassent dans les plaines.|豊かな国のなかでも高いほうで、しかも手つかずの原野が残っているのではない。四割ほどは植えられたもので、その多くは戦後に入れた杉と檜である。山は急すぎて耕すことも建てることもできないため、人は平野に詰め込まれる。国土のほとんどが木なのに、世界でも指折りに混み合った都市を持つのはそのためである。",
  ),

  /**
   * 元: 「沖縄はかつて何という独立国だった?」→ 琉球王国
   * 那覇のカードが tag にそのまま書いていた。
   *
   * 差し替え先は**島の数**。カードにも他の問いにも無い。
   */
  18: q(
    "About how many islands make up Japan?|¿De cuántas islas se compone Japón, más o menos?|De combien d'îles le Japon est-il fait, à peu près ?|日本はおよそいくつの島からできているか?",
    [
      "About 40|Unas 40|Environ 40|およそ40",
      "About 400|Unas 400|Environ 400|およそ400",
      "About 14,000|Unas 14.000|Environ 14 000|およそ14,000",
    ],
    2,
    "The count was 6,852 for decades, then a survey with better maps in 2023 more than doubled it — the coastline had not changed, only how finely it could be traced. Fewer than one in twenty of the islands has anyone living on it, and four of them hold almost everybody.|Durante décadas se contaban 6.852; un nuevo levantamiento en 2023 más que duplicó la cifra: no cambió la costa, sino la finura del trazado. Menos de una de cada veinte islas está habitada, y cuatro reúnen a casi todos.|On en comptait 6 852 pendant des décennies ; un relevé plus fin en 2023 a plus que doublé le chiffre : ce n'est pas la côte qui a changé, mais la précision du tracé. Moins d'une île sur vingt est habitée, et quatre rassemblent presque tout le monde.|長らく6,852とされていたが、2023年に精度の高い地図で数え直したところ倍以上になった。海岸線が変わったのではなく、どれだけ細かく辿れるかが変わったのである。人が住んでいる島は二十に一つもなく、そのうち四つにほとんどの人が住んでいる。",
  ),
};
