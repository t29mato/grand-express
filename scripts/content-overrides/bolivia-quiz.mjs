/**
 * ボリビアのクイズの差し替え。
 *
 * ## なぜ要るか
 *
 * ボリビア(と日本)のクイズは `legacy/grand-express.html` に書かれている。
 * legacy は凍結しているので直接は直せない。背景と同じく、ここで上書きする。
 *
 * ## 何を直すか — **39問中9問が、都市カードの一文をそのまま問いにしていた**
 *
 * 2026-08-09 に `node scripts/check-quiz.mjs` で全盤面を突き合わせて分かったもの。
 * カードを読んだ人は、考えずに答えられる。
 *
 * ```
 * Q21 ミ・テレフェリコは世界最長の何?      → 都市型ロープウェイ網
 *     ラパスカード「ミ・テレフェリコは世界最長の都市型ロープウェイ網。」
 * Q35 最高峰サハマ山を取り巻くものは?      → 世界一高所の森
 *     サハマカード「ケニュアの木々=世界一高所の森と…に囲まれている。」
 * Q4  チャコ戦争の相手国は?              → パラグアイ
 *     ビジャモンテスカード「パラグアイとのチャコ戦争(1932〜35)の要衝。」
 * ```
 *
 * ほかに Q10 / Q14 / Q18 / Q22 / Q31 / Q39。
 *
 * **茨城との違い。**茨城のクイズには冒頭に
 * 「都市カードと題材が重ならないようにしてある」という約束が書いてあり、
 * それが4件破られていた。**ボリビアにはその約束がそもそも無い。**
 * legacy にクイズを組み立てる `const Q=(q,o,f)=>({...,a:0,...})` があるだけで、
 * 題材の重なりについて書かれた行は1つも無かった。
 * 9問(23%)が重なっていたのは、事故ではなく**決めていなかったから**である。
 *
 * ## 差し替えるときの約束(茨城と同じ)
 *
 * - **都市カードが扱う題材は出さない。**書き終えたら
 *   `node scripts/check-quiz.mjs bolivia` を回す。
 *   **直したあとにもう一度回すこと。**茨城では2回目で4件目が出た
 * - **「なぜ」を問わない。**「何が」「どこが」「いくつ」にする
 * - **誤答は実在するものにする。**明らかな嘘を並べると消去法で解ける
 * - 難易度は元の問題の枠を保つ(`quiz-difficulty.mjs` が件数を検査するため)
 *
 * ## 使いかた
 *
 * 添字(0始まり)で差し替える。`applyContentOverrides` が `quiz` を見て置き換える。
 */

/** `q()` は legacy の組み立てと同じ形にそろえる(`a` は出題時に混ぜられるので0でよい)。 */
function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

function q(question, options, answerIndex, fact) {
  return { q: t(question), o: options.map(t), a: answerIndex, f: t(fact) };
}

export const BOLIVIA_QUIZ_REPLACEMENTS = {
  /**
   * 元: 「ラパスとエル・アルトを結ぶミ・テレフェリコは世界最長の何?」→ 都市型ロープウェイ網
   * ラパスのカードが答えをそのまま書いていた。
   *
   * 差し替え先は**じゃがいも**。アンデスは栽培種じゃがいもの原産地で、
   * 35枚のカードにも他の38問にも出ていない。
   */
  20: q(
    "Roughly how many varieties of potato are grown in the Andes?|¿Cuántas variedades de papa se cultivan aproximadamente en los Andes?|Combien de variétés de pomme de terre cultive-t-on à peu près dans les Andes ?|アンデスで栽培されているじゃがいもの品種は、およそいくつ?",
    [
      "About three|Unas tres|Environ trois|3種ほど",
      "About thirty|Unas treinta|Environ trente|30種ほど",
      "Several thousand|Varios miles|Plusieurs milliers|数千種",
    ],
    2,
    "The potato was domesticated on the shores of Lake Titicaca some eight thousand years ago, and highland families still plant a dozen kinds in one field so that whatever the weather does, something survives. They are sorted by cooking, not by looks: some for boiling, some for freezing into chuño, some only for feast days. Europe took four varieties home in the sixteenth century, which is why a potato blight could ruin a whole continent's crop.|La papa se domesticó junto al lago Titicaca hace unos ocho mil años, y las familias del altiplano siembran aún una docena de clases en un mismo campo para que algo sobreviva a cualquier clima. Europa se llevó cuatro variedades en el siglo XVI.|La pomme de terre fut domestiquée au bord du lac Titicaca il y a quelque huit mille ans, et les familles des hauts plateaux en plantent encore une douzaine de sortes dans un même champ pour que quelque chose survive. L'Europe n'en rapporta que quatre au XVIe siècle.|じゃがいもは八千年ほど前、チチカカ湖のほとりで栽培化された。高地の家では今も一枚の畑に十数種を混ぜて植える。天候がどう転んでも、どれかは穫れるようにするためである。見た目ではなく用途で分けられ、茹でるもの、凍らせてチュニョにするもの、祭りの日にしか使わないものがある。十六世紀のヨーロッパが持ち帰ったのは四種ほどで、疫病が大陸じゅうの作物を枯らしたのはそのためである。",
  ),

  /**
   * 元: 「チャコ戦争(1932〜35)の相手国は?」→ パラグアイ
   * ビジャモンテスのカードが「パラグアイとのチャコ戦争(1932〜35)の要衝」と書いていた。
   */
  3: q(
    "How much height is there between Bolivia's lowest and highest ground?|¿Cuánto desnivel hay entre el punto más bajo y el más alto de Bolivia?|Quelle dénivellation sépare le point le plus bas du plus haut en Bolivie ?|ボリビアの最も低い土地と最も高い土地の標高差は、およそどれくらい?",
    [
      "About 800 m|Unos 800 m|Environ 800 m|およそ800m",
      "About 6,400 m|Unos 6.400 m|Environ 6 400 m|およそ6,400m",
      "About 12,000 m|Unos 12.000 m|Environ 12 000 m|およそ12,000m",
    ],
    1,
    "The low ground is hot river plain near the Brazilian border, under a hundred metres; the high ground is a snow peak over six and a half thousand. A bus can leave one and reach the other in a day, passing from palms to glaciers, and the country grows both bananas and barley because of it.|Lo bajo es llanura fluvial junto a Brasil, a menos de cien metros; lo alto, un pico nevado de más de seis mil quinientos. Un autobús cubre la distancia en un día, de las palmeras a los glaciares.|Le bas est une plaine fluviale près du Brésil, sous cent mètres ; le haut, un sommet neigeux de plus de six mille cinq cents. Un car fait le trajet en un jour, des palmiers aux glaciers.|低いほうはブラジル国境近くの暑い川沿いの平地で、標高は百メートルに満たない。高いほうは六千五百を超える雪の峰である。バスなら一日でその間を移り、椰子から氷河へ抜ける。この国が バナナも大麦も穫れるのはそのためである。",
  ),

  /** 元: 「チチカカ湖が持つ世界記録は?」→ 世界一高所の大型可航湖(コパカバーナのカードが明記)。 */
  9: q(
    "Which animal is kept in the Andes mainly for its wool?|¿Qué animal se cría en los Andes sobre todo por su lana?|Quel animal élève-t-on dans les Andes surtout pour sa laine ?|アンデスで、おもに毛のために飼われている家畜は?",
    [
      "The alpaca|La alpaca|L'alpaga|アルパカ",
      "The donkey|El burro|L'âne|ロバ",
      "The goat|La cabra|La chèvre|ヤギ",
    ],
    0,
    "It is smaller than the llama and useless as a pack animal, which is the whole point: the llama carries, the alpaca is shorn. A fleece takes a year to grow and comes in more than twenty natural colours, so much of it is never dyed.|Es menor que la llama e inútil como bestia de carga, y ahí está la cuestión: la llama carga, la alpaca se esquila. El vellón tarda un año y viene en más de veinte colores naturales.|Plus petit que le lama et inutile comme bête de somme, c'est justement le principe : le lama porte, l'alpaga se tond. La toison met un an et se décline en plus de vingt teintes naturelles.|リャマより小さく、荷を運ぶ役には立たない。それでよいのであって、運ぶのはリャマ、刈られるのがアルパカである。毛は生えそろうのに一年かかり、自然の色が二十種以上あるため、染めずに使われることが多い。",
  ),

  /** 元: 「1967年にボリビアで処刑された革命家は?」→ チェ・ゲバラ(バジェグランデのカードが明記)。 */
  13: q(
    "What are the three colours of the Bolivian flag?|¿Cuáles son los tres colores de la bandera boliviana?|Quelles sont les trois couleurs du drapeau bolivien ?|ボリビアの国旗の三色は?",
    [
      "Blue, white and blue|Azul, blanco y azul|Bleu, blanc et bleu|青・白・青",
      "Red, yellow and green|Rojo, amarillo y verde|Rouge, jaune et vert|赤・黄・緑",
      "Black, red and gold|Negro, rojo y oro|Noir, rouge et or|黒・赤・金",
    ],
    1,
    "Red is read as the blood of those who fought, yellow as the ore under the ground, green as the forest and field. Since 2009 a second flag flies beside it on public buildings — the square rainbow wiphala of the Andean peoples — and both count as national.|El rojo se lee como la sangre de quienes lucharon; el amarillo, como el mineral del subsuelo; el verde, como el bosque. Desde 2009 ondea junto a ella la wiphala andina, y ambas son nacionales.|Le rouge se lit comme le sang de ceux qui combattirent, le jaune comme le minerai du sous-sol, le vert comme la forêt. Depuis 2009, la wiphala andine flotte à côté, toutes deux nationales.|赤は戦った者の血、黄は地下の鉱石、緑は森と野と読まれる。2009年からは公の建物でその隣にもう一枚が掲げられる。アンデス諸民族の四角い虹色の旗ウィパラで、どちらも国旗である。",
  ),

  /** 元: 「国民的蒸留酒シンガニの原料は?」→ マスカット・オブ・アレキサンドリア(タリハのカードが明記)。 */
  17: q(
    "Which underground resource has long carried most of Bolivia's export earnings?|¿Qué recurso del subsuelo ha sostenido durante años las exportaciones bolivianas?|Quelle ressource du sous-sol a longtemps porté les exportations boliviennes ?|ボリビアの輸出をながく支えてきた、地下から採る資源は?",
    [
      "Coal|El carbón|Le charbon|石炭",
      "Uranium|El uranio|L'uranium|ウラン",
      "Natural gas|El gas natural|Le gaz naturel|天然ガス",
    ],
    2,
    "The fields lie in the south-east, and the pipelines run to Brazil and Argentina rather than to any port, because there is no port. For a country whose wealth was silver and then tin, gas was the third turn of the same wheel: dug up, sent abroad, argued over at home.|Los yacimientos están en el sureste y los gasoductos van a Brasil y Argentina, no a un puerto, porque no hay puerto. Tras la plata y el estaño, el gas fue la tercera vuelta de la misma rueda.|Les gisements sont au sud-est et les gazoducs mènent au Brésil et à l'Argentine, non à un port : il n'y en a pas. Après l'argent puis l'étain, le gaz fut le troisième tour de la même roue.|鉱床は南東部にあり、管は港ではなくブラジルとアルゼンチンへ延びている。港が無いからである。銀、そして錫で富んだ国にとって、ガスは同じ車輪の三度目の回転だった。掘り出し、外へ送り、国内で争いになる。",
  ),

  /** 元: 「エル・アルトの派手な『チョレット』を広めた建築家は?」→ フレディ・ママニ(エル・アルトのカードが明記)。 */
  21: q(
    "Which wild Andean animal gives the finest natural fibre in the world?|¿Qué animal silvestre andino da la fibra natural más fina del mundo?|Quel animal sauvage des Andes donne la fibre naturelle la plus fine du monde ?|世界でいちばん細い獣毛をとる、アンデスの野生の動物は?",
    [
      "The guanaco|El guanaco|Le guanaco|グアナコ",
      "The vicuña|La vicuña|La vigogne|ビクーニャ",
      "The chinchilla|La chinchilla|Le chinchilla|チンチラ",
    ],
    1,
    "The hair is about half the thickness of the finest sheep's wool, and one animal yields a few hundred grams every other year. It was reserved for Inca royalty and nearly wiped out by hunting; now herders round up wild ones, shear them and let them go, which is the only legal way to take it.|El pelo mide la mitad que la mejor lana de oveja y un animal da unos cientos de gramos cada dos años. Reservado a la realeza inca y casi exterminado, hoy se arrea, se esquila y se suelta: la única vía legal.|Le poil fait la moitié de la meilleure laine de mouton, et une bête en donne quelques centaines de grammes tous les deux ans. Réservé aux Incas et presque exterminé, il se récolte aujourd'hui en rabattant, tondant et relâchant.|毛の太さは最上の羊毛の半分ほどで、一頭から二年に一度、数百グラムしか取れない。インカでは王族だけのもので、狩りによって絶滅寸前まで減った。いまは野生のものを追い込んで刈り、また放す。合法に取る道はそれだけである。",
  ),

  /** 元: 「1908年に南ボリビアで最期を迎えた無法者は?」→ ブッチ・キャシディ(トゥピサのカードが明記)。 */
  30: q(
    "Where does Bolivia rank among South American countries by area?|¿Qué puesto ocupa Bolivia por superficie entre los países sudamericanos?|Quel rang la Bolivie occupe-t-elle par la superficie en Amérique du Sud ?|ボリビアの広さは、南アメリカの国のなかで何番目か?",
    [
      "Second|El segundo|Le deuxième|2番目",
      "Fifth|El quinto|Le cinquième|5番目",
      "Eleventh|El undécimo|Le onzième|11番目",
    ],
    1,
    "It covers about 1.1 million square kilometres — larger than France and Spain together — behind Brazil, Argentina, Peru and Colombia. It was once far bigger: over a century it lost the coast to Chile, rubber country to Brazil and the Chaco to Paraguay, giving away roughly half of what it began with.|Abarca unos 1,1 millones de km², más que Francia y España juntas, tras Brasil, Argentina, Perú y Colombia. Fue mucho mayor: perdió la costa, el caucho y el Chaco, cerca de la mitad de lo inicial.|Elle couvre environ 1,1 million de km², plus que la France et l'Espagne réunies, derrière le Brésil, l'Argentine, le Pérou et la Colombie. Elle fut bien plus vaste : elle a cédé près de la moitié de son territoire initial.|面積はおよそ110万平方キロメートルで、フランスとスペインを合わせたより広く、ブラジル・アルゼンチン・ペルー・コロンビアに次ぐ。かつてはもっと大きかった。百年あまりのあいだに海岸を、ゴムの土地を、そしてチャコを手放し、始まりの半分ほどを失っている。",
  ),

  /** 元: 「最高峰サハマ山を取り巻くものは?」→ 世界一高所の森(サハマのカードが明記)。 */
  34: q(
    "Which flower is one of Bolivia's national flowers?|¿Cuál es una de las flores nacionales de Bolivia?|Quelle fleur est l'une des fleurs nationales de la Bolivie ?|ボリビアの国花のひとつは?",
    [
      "The cantuta|La cantuta|La cantuta|カントゥータ",
      "The tulip|El tulipán|La tulipe|チューリップ",
      "The lotus|El loto|Le lotus|ハス",
    ],
    0,
    "It is a hanging bell-shaped flower of the high valleys, and the form that carries red, yellow and green together is the one taken as the emblem — the colours of the flag, growing on one stem. Hummingbirds are its pollinators, and Peru claims it as well.|Es una flor colgante y acampanada de los valles altos; la variedad que junta rojo, amarillo y verde es la tomada como emblema: los colores de la bandera en un solo tallo. La poliniza el colibrí, y Perú también la reclama.|C'est une fleur pendante en clochette des hautes vallées ; la forme qui réunit rouge, jaune et vert est celle prise pour emblème : les couleurs du drapeau sur une seule tige. Le colibri la pollinise, et le Pérou la revendique aussi.|高い谷に咲く、釣鐘の形をした垂れ下がる花である。赤・黄・緑を一つの株に併せ持つ形のものが象徴とされる。国旗の三色が一本の茎に咲いているわけである。花粉を運ぶのはハチドリで、ペルーもこれを国花としている。",
  ),

  /** 元: 「ブラジル・パラグアイと共有するボリビア東部の湿地は?」→ パンタナール(プエルト・スアレスのカードが明記)。 */
  38: q(
    "How many countries in South America have no sea coast?|¿Cuántos países de Sudamérica no tienen costa?|Combien de pays d'Amérique du Sud n'ont aucune côte ?|南アメリカで、海に面していない国はいくつあるか?",
    [
      "None|Ninguno|Aucun|1つもない",
      "Two|Dos|Deux|2つ",
      "Six|Seis|Six|6つ",
    ],
    1,
    "Bolivia and Paraguay. Both reach the sea by river instead, and both keep a navy for it — Bolivia's patrols Lake Titicaca and the Amazon tributaries, and still holds a parade each March for the coast it lost.|Bolivia y Paraguay. Ambos llegan al mar por río y ambos mantienen armada; la boliviana patrulla el Titicaca y los afluentes del Amazonas, y desfila cada marzo por la costa perdida.|La Bolivie et le Paraguay. Tous deux gagnent la mer par le fleuve et gardent une marine ; celle de la Bolivie patrouille le Titicaca et les affluents de l'Amazone, et défile chaque mars pour la côte perdue.|ボリビアとパラグアイである。どちらも川づたいに海へ出るしかなく、そのための海軍を持っている。ボリビアの海軍はチチカカ湖とアマゾンの支流を巡り、失った海岸のために毎年三月に行進する。",
  ),
};
