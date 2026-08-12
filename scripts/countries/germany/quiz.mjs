/**
 * ドイツのクイズ(40問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その国の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * ## 都市カードとの重なりについて
 *
 * 都市カード(45件)が扱う具体的な事実(ベルリンの壁28年・ケルン大聖堂の
 * 632年・ローテンブルクの1945年3月の空襲・ハイデルベルクの大樽など)は
 * ここでは問わない。**正解を都市名そのものにもしていない**(どの都市が
 * 何をしたかを問うと、その都市のカードと必ずどこかで重なるため)。
 * 代わりに、言語・食・科学・スポーツ・国のかたちなど、都市カードが
 * 触れていない主題を選んである。
 *
 * 選択肢は3つ。正解の位置(`a`)は 0/1/2 がほぼ同数になるよう散らしてある。
 */
function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

/** 1問を組み立てる。`o` は選択肢の配列、`a` は正解の添字。 */
function q(difficulty, question, options, a, fact) {
  return { difficulty, q: t(question), o: options.map(t), a, f: t(fact) };
}

export const GERMANY_QUIZ = [
  q(
    1,
    "What is the capital of Germany?|¿Cuál es la capital de Alemania?|Quelle est la capitale de l'Allemagne ?|ドイツの首都はどこか?",
    [
      "Munich|Múnich|Munich|ミュンヘン",
      "Hamburg|Hamburgo|Hambourg|ハンブルク",
      "Berlin|Berlín|Berlin|ベルリン",
    ],
    2,
    "Berlin has been the seat of the federal government since reunification, though Bonn kept a handful of ministries as a compromise when the capital moved back in the 1990s.|Berlín es sede del gobierno federal desde la reunificación, aunque Bonn conservó un puñado de ministerios como compromiso cuando la capital volvió a trasladarse en los noventa.|Berlin est le siège du gouvernement fédéral depuis la réunification, bien que Bonn ait conservé une poignée de ministères en guise de compromis lors du retour de la capitale dans les années 1990.|ベルリンは再統一以来、連邦政府の所在地であり続けている。ただし1990年代に首都が戻る際の妥協として、いくつかの省庁はいまもボンに残っている。",
  ),
  q(
    1,
    "What is the official currency of Germany?|¿Cuál es la moneda oficial de Alemania?|Quelle est la monnaie officielle de l'Allemagne ?|ドイツの公式通貨は?",
    [
      "The Deutsche Mark|El marco alemán|Le mark allemand|ドイツマルク",
      "The Swiss Franc|El franco suizo|Le franc suisse|スイス・フラン",
      "The Euro|El euro|L'euro|ユーロ",
    ],
    2,
    "The Deutsche Mark was replaced by the euro in cash transactions in 2002, though Germans could still exchange old Mark banknotes at the central bank for many years afterward.|El marco alemán fue sustituido por el euro en efectivo en 2002, aunque los alemanes pudieron cambiar billetes antiguos de marco en el banco central durante muchos años después.|Le mark allemand fut remplacé par l'euro dans les transactions en espèces en 2002, bien que les Allemands aient pu échanger de vieux billets en mark à la banque centrale pendant de nombreuses années encore.|ドイツマルクは2002年、現金の取引でユーロに置き換えられた。それでもドイツ人はその後何年もの間、中央銀行で古いマルク紙幣を両替できた。",
  ),
  q(
    1,
    "What language is spoken as the primary official language in Germany?|¿Qué idioma se habla como lengua oficial principal en Alemania?|Quelle langue est parlée comme principale langue officielle en Allemagne ?|ドイツで主に公用語として話されている言語は?",
    [
      "Dutch|Neerlandés|Néerlandais|オランダ語",
      "German|Alemán|Allemand|ドイツ語",
      "Swedish|Sueco|Suédois|スウェーデン語",
    ],
    1,
    "German is spoken by more native speakers than any other language in the European Union, and several regional dialects can sound nearly unintelligible to speakers of standard German from elsewhere in the country.|El alemán lo hablan más hablantes nativos que ningún otro idioma de la Unión Europea, y varios dialectos regionales pueden sonar casi ininteligibles para quienes hablan alemán estándar de otras zonas del país.|L'allemand est parlé par plus de locuteurs natifs qu'aucune autre langue de l'Union européenne, et plusieurs dialectes régionaux peuvent sembler presque incompréhensibles aux locuteurs de l'allemand standard venus d'ailleurs dans le pays.|ドイツ語はEU域内で母語話者数が最も多い言語である。地方によっては方言があまりに強く、国内の他の地域の標準ドイツ語話者にもほとんど通じないことがある。",
  ),
  q(
    2,
    "Which continent is Germany part of?|¿A qué continente pertenece Alemania?|De quel continent l'Allemagne fait-elle partie ?|ドイツが属する大陸は?",
    [
      "Asia|Asia|Asie|アジア",
      "South America|América del Sur|Amérique du Sud|南アメリカ",
      "Europe|Europa|Europe|ヨーロッパ",
    ],
    2,
    "Germany sits at the centre of the European continent, sharing a land border with nine other countries — more neighbours than any other country in the European Union.|Alemania se sitúa en el centro del continente europeo y comparte frontera terrestre con otros nueve países, más vecinos que ningún otro país de la Unión Europea.|L'Allemagne se trouve au centre du continent européen et partage une frontière terrestre avec neuf autres pays — plus de voisins qu'aucun autre pays de l'Union européenne.|ドイツはヨーロッパ大陸の中央に位置し、9か国と陸続きの国境を接している。EU加盟国の中で最も多くの隣国を持つ国である。",
  ),
  q(
    2,
    "Reading the German flag from top to bottom, what is the correct order of its three colours?|Leyendo la bandera alemana de arriba abajo, ¿cuál es el orden correcto de sus tres colores?|En lisant le drapeau allemand de haut en bas, quel est l'ordre correct de ses trois couleurs ?|ドイツ国旗を上から順に見たとき、正しい3色の並びは?",
    [
      "Black, red, gold|Negro, rojo, oro|Noir, rouge, or|黒・赤・金",
      "Red, black, gold|Rojo, negro, oro|Rouge, noir, or|赤・黒・金",
      "Gold, red, black|Oro, rojo, negro|Or, rouge, noir|金・赤・黒",
    ],
    0,
    "The black-red-gold combination dates back to volunteer units of the early 19th century and was adopted as the national flag when the modern republic was founded after the First World War.|La combinación negro-rojo-oro se remonta a unidades de voluntarios de principios del siglo XIX, y se adoptó como bandera nacional al fundarse la república moderna tras la Primera Guerra Mundial.|La combinaison noir-rouge-or remonte à des unités de volontaires du début du XIXe siècle, et fut adoptée comme drapeau national à la fondation de la république moderne après la Première Guerre mondiale.|黒・赤・金の組み合わせは19世紀初めの義勇軍にまでさかのぼり、第一次世界大戦後に近代の共和国が成立したときに国旗として採用された。",
  ),
  q(
    2,
    "Which twisted, salted bread is closely associated with German and especially Bavarian bakeries?|¿Qué pan retorcido y salado se asocia estrechamente con las panaderías alemanas, sobre todo bávaras?|Quel pain torsadé et salé est étroitement associé aux boulangeries allemandes, notamment bavaroises ?|ドイツ、とりわけバイエルンのパン屋と強く結びつく、ねじった形の塩味のパンは?",
    [
      "Baguette|Baguette|Baguette|バゲット",
      "Croissant|Cruasán|Croissant|クロワッサン",
      "Pretzel|Pretzel|Bretzel|プレッツェル",
    ],
    2,
    "The pretzel's knotted shape is said in one popular legend to represent a monk's arms crossed in prayer, though the true origin is undocumented and much older than the story itself.|Una leyenda popular sobre la forma anudada del pretzel dice que representa los brazos cruzados de un monje en oración, aunque el verdadero origen no está documentado y es mucho más antiguo que la propia historia.|Une légende populaire veut que la forme nouée du bretzel représente les bras d'un moine croisés en prière, bien que l'origine véritable ne soit pas documentée et soit bien plus ancienne que cette histoire.|プレッツェルの結び目のような形は、祈る修道士の腕組みを表すという言い伝えがある。ただし本当の由来は記録に残っておらず、この言い伝えよりずっと古いとされる。",
  ),
  q(
    3,
    "What is Sauerkraut, a common side dish across Germany, made from?|¿De qué está hecho el Sauerkraut, un acompañamiento común en toda Alemania?|De quoi est fait le Sauerkraut, un accompagnement courant dans toute l'Allemagne ?|ドイツ各地でよく食べられる付け合わせ、ザワークラウトの材料は?",
    [
      "Fermented cabbage|Col fermentada|Chou fermenté|発酵させたキャベツ",
      "Pickled radish|Rábano encurtido|Radis mariné|漬けた大根",
      "Boiled potato|Patata hervida|Pomme de terre bouillie|茹でたじゃがいも",
    ],
    0,
    "Shredded cabbage is packed with salt and left to ferment for weeks, a preservation method old enough that similar fermented cabbages appear in cuisines from Korea to Eastern Europe.|La col rallada se prensa con sal y se deja fermentar durante semanas, un método de conservación tan antiguo que aparecen coles fermentadas parecidas en cocinas desde Corea hasta Europa del Este.|Le chou râpé est tassé avec du sel et laissé à fermenter pendant des semaines, une méthode de conservation si ancienne que des choux fermentés similaires apparaissent dans des cuisines allant de la Corée à l'Europe de l'Est.|千切りにしたキャベツを塩で漬け込み、数週間発酵させる。この保存法は非常に古く、似たような発酵キャベツは韓国から東ヨーロッパまで各地の料理に見られる。",
  ),
  q(
    3,
    "About how many countries share a land border with Germany?|¿Con cuántos países comparte Alemania frontera terrestre, aproximadamente?|Avec combien de pays l'Allemagne partage-t-elle une frontière terrestre, environ ?|ドイツと陸続きの国境を接する国はおよそいくつか?",
    [
      "Five|Cinco|Cinq|5か国",
      "Thirteen|Trece|Treize|13か国",
      "Nine|Nueve|Neuf|9か国",
    ],
    2,
    "Denmark, the Netherlands, Belgium, Luxembourg, France, Switzerland, Austria, the Czech Republic and Poland all touch German soil, more neighbours than any other country in the European Union.|Dinamarca, los Países Bajos, Bélgica, Luxemburgo, Francia, Suiza, Austria, Chequia y Polonia lindan con suelo alemán, más vecinos que ningún otro país de la Unión Europea.|Le Danemark, les Pays-Bas, la Belgique, le Luxembourg, la France, la Suisse, l'Autriche, la République tchèque et la Pologne touchent tous le sol allemand, plus de voisins qu'aucun autre pays de l'Union européenne.|デンマーク・オランダ・ベルギー・ルクセンブルク・フランス・スイス・オーストリア・チェコ・ポーランドの9か国がドイツと国境を接している。EU加盟国の中で最も多い隣国の数である。",
  ),
  q(
    4,
    "Which sea does the Rhine river eventually flow into?|¿En qué mar desemboca finalmente el río Rin?|Dans quelle mer le Rhin se jette-t-il finalement ?|ライン川は最終的にどの海に注ぐか?",
    [
      "The Baltic Sea|El mar Báltico|La mer Baltique|バルト海",
      "The Mediterranean Sea|El mar Mediterráneo|La mer Méditerranée|地中海",
      "The North Sea|El mar del Norte|La mer du Nord|北海",
    ],
    2,
    "The Rhine crosses into the Netherlands before splitting into several distributaries and reaching the North Sea, which is why so much river cargo bound for German industry passes through the Dutch port of Rotterdam first.|El Rin cruza a los Países Bajos antes de dividirse en varios brazos y llegar al mar del Norte, razón por la que tanta carga fluvial destinada a la industria alemana pasa antes por el puerto neerlandés de Róterdam.|Le Rhin passe aux Pays-Bas avant de se diviser en plusieurs bras et d'atteindre la mer du Nord, ce qui explique pourquoi tant de fret fluvial destiné à l'industrie allemande transite d'abord par le port néerlandais de Rotterdam.|ライン川はオランダに入っていくつもの分流に分かれたのち北海へ注ぐ。ドイツの産業向けの多くの川荷が、まずオランダのロッテルダム港を経由するのはそのためである。",
  ),
  q(
    4,
    "Unlike most major German rivers, the Danube flows south and east. Which sea does it eventually reach?|A diferencia de la mayoría de los grandes ríos alemanes, el Danubio fluye hacia el sur y el este. ¿A qué mar llega finalmente?|Contrairement à la plupart des grands fleuves allemands, le Danube coule vers le sud et l'est. Quelle mer atteint-il finalement ?|ドイツの主な川の多くと違い、ドナウ川は南東へ流れる。最終的にどの海に達するか?",
    [
      "The Black Sea|El mar Negro|La mer Noire|黒海",
      "The Adriatic Sea|El mar Adriático|La mer Adriatique|アドリア海",
      "The North Sea|El mar del Norte|La mer du Nord|北海",
    ],
    0,
    "The Danube crosses ten countries on its way from a spring in the Black Forest to a wide delta in Romania, making it the only major European river to flow into the Black Sea rather than an ocean-connected sea.|El Danubio atraviesa diez países en su camino desde un manantial en la Selva Negra hasta un amplio delta en Rumanía, lo que lo convierte en el único gran río europeo que desemboca en el mar Negro.|Le Danube traverse dix pays sur son parcours depuis une source dans la Forêt-Noire jusqu'à un large delta en Roumanie, ce qui en fait le seul grand fleuve européen à se jeter dans la mer Noire plutôt que dans une mer reliée à l'océan.|ドナウ川はシュヴァルツヴァルトの水源からルーマニアの広大な三角州まで、10か国を横切って流れる。外洋に直接つながる海ではなく黒海に注ぐ、ヨーロッパの主要河川としては唯一の例である。",
  ),
  q(
    5,
    "Compared with the Rhine and the Danube, which both cross several countries, which German river runs entirely within Germany, from source to mouth?|En comparación con el Rin y el Danubio, que cruzan varios países, ¿qué río alemán discurre enteramente dentro de Alemania, de la fuente a la desembocadura?|Contrairement au Rhin et au Danube, qui traversent plusieurs pays, quel fleuve allemand coule entièrement à l'intérieur de l'Allemagne, de la source à l'embouchure ?|複数の国を横切るライン川やドナウ川と違い、水源から河口までドイツ国内だけを流れる川は?",
    [
      "The Weser|El Weser|La Weser|ヴェーザー川",
      "The Rhine|El Rin|Le Rhin|ライン川",
      "The Danube|El Danubio|Le Danube|ドナウ川",
    ],
    0,
    "The Weser is formed by the meeting of two smaller rivers in central Germany and flows entirely through German territory before reaching the North Sea, unlike the Rhine and Danube which both begin or cross into neighbouring countries.|El Weser se forma con la unión de dos ríos menores en el centro de Alemania y discurre enteramente por territorio alemán antes de llegar al mar del Norte, a diferencia del Rin y el Danubio.|La Weser se forme par la rencontre de deux rivières plus petites au centre de l'Allemagne et coule entièrement en territoire allemand avant d'atteindre la mer du Nord, contrairement au Rhin et au Danube.|ヴェーザー川はドイツ中部で二つの小さな川が合流して生まれ、北海に達するまでドイツ領内だけを流れる。国境をまたぐライン川やドナウ川とは対照的である。",
  ),
  q(
    3,
    "How many times has the German men's national football team won the FIFA World Cup?|¿Cuántas veces ha ganado la selección masculina de fútbol de Alemania la Copa Mundial de la FIFA?|Combien de fois l'équipe masculine d'Allemagne a-t-elle remporté la Coupe du monde de la FIFA ?|ドイツ男子サッカー代表はFIFAワールドカップで何回優勝しているか?",
    [
      "Twice|Dos veces|Deux fois|2回",
      "Four times|Cuatro veces|Quatre fois|4回",
      "Six times|Seis veces|Six fois|6回",
    ],
    1,
    "West Germany won in 1954 and 1974, and a reunified Germany added titles in 1990 and 2014, putting the team among the small handful of nations to have lifted the trophy more than three times.|Alemania Occidental ganó en 1954 y 1974, y una Alemania reunificada sumó títulos en 1990 y 2014, lo que sitúa al equipo entre el puñado de naciones que han alzado el trofeo más de tres veces.|L'Allemagne de l'Ouest gagna en 1954 et 1974, et une Allemagne réunifiée ajouta des titres en 1990 et 2014, plaçant l'équipe parmi la poignée de nations à avoir soulevé le trophée plus de trois fois.|西ドイツは1954年と1974年に優勝し、再統一後のドイツも1990年と2014年にタイトルを加えた。トロフィーを三回以上掲げた数少ない国のひとつである。",
  ),
  q(
    2,
    "The modern custom of bringing a decorated evergreen tree indoors for Christmas is widely traced back to which country?|La costumbre moderna de llevar un árbol de hoja perenne decorado a casa por Navidad se remonta ampliamente a qué país?|La coutume moderne d'installer un sapin décoré à l'intérieur pour Noël remonte largement à quel pays ?|クリスマスに飾りつけた常緑樹を室内に置く習わしは、主にどの国に由来するとされるか?",
    [
      "Italy|Italia|Italie|イタリア",
      "England|Inglaterra|Angleterre|イングランド",
      "Germany|Alemania|Allemagne|ドイツ",
    ],
    2,
    "German-speaking regions get the credit for popularising the decorated indoor tree from at least the 17th century onward, and German immigrants and royal family connections helped spread the custom to Britain and North America in the 19th century.|Las regiones de habla alemana se llevan el mérito de popularizar el árbol decorado en interiores desde al menos el siglo XVII, y los inmigrantes alemanes y los lazos con la familia real ayudaron a difundir la costumbre por Gran Bretaña y Norteamérica en el XIX.|Les régions germanophones sont créditées d'avoir popularisé l'arbre décoré en intérieur dès le XVIIe siècle au moins, et les immigrants allemands et les liens avec la famille royale aidèrent à répandre la coutume en Grande-Bretagne et en Amérique du Nord au XIXe siècle.|飾りつけた木を室内に置く習わしを広めたのは、少なくとも17世紀以降のドイツ語圏とされる。ドイツからの移民や王室のつながりが、19世紀にこの習わしを英国や北米へ広めるのを後押しした。",
  ),
  q(
    5,
    "The German word 'Kindergarten', now used in English too, literally translates to what?|La palabra alemana «Kindergarten», usada también en inglés, ¿qué significa literalmente?|Le mot allemand « Kindergarten », aussi utilisé en anglais, se traduit littéralement par quoi ?|英語でもそのまま使われるドイツ語「キンダーガルテン」は、直訳すると何を意味するか?",
    [
      "Small school|Escuela pequeña|Petite école|小さな学校",
      "Playful house|Casa lúdica|Maison ludique|遊びの家",
      "Children's garden|Jardín de niños|Jardin d'enfants|子どもの庭",
    ],
    2,
    "The educator Friedrich Fröbel opened the first kindergarten in 1837, choosing the name because he saw young children as plants that needed careful, patient cultivation rather than strict instruction.|El pedagogo Friedrich Fröbel abrió el primer «Kindergarten» en 1837, y eligió ese nombre porque veía a los niños pequeños como plantas que necesitaban un cultivo paciente en vez de una instrucción estricta.|Le pédagogue Friedrich Fröbel ouvrit le premier Kindergarten en 1837, choisissant ce nom car il voyait les jeunes enfants comme des plantes ayant besoin d'une culture patiente plutôt que d'un enseignement strict.|教育者フリードリヒ・フレーベルは1837年に最初の幼稚園を開いた。この名を選んだのは、幼い子どもを、厳しく教え込むのではなく辛抱強く育てるべき植物のように見ていたからである。",
  ),
  q(
    5,
    "In which year did Otto von Bismarck unify a collection of separate German states into a single empire?|¿En qué año unificó Otto von Bismarck una colección de estados alemanes separados en un solo imperio?|En quelle année Otto von Bismarck unifia-t-il un ensemble d'États allemands séparés en un seul empire ?|オットー・フォン・ビスマルクが別々のドイツ諸邦をひとつの帝国へまとめたのは何年か?",
    [
      "1848|1848|1848|1848年",
      "1918|1918|1918|1918年",
      "1871|1871|1871|1871年",
    ],
    2,
    "The unification was proclaimed at the Palace of Versailles, in newly defeated France, after Prussia's victory in the Franco-Prussian War brought the remaining independent German states into the new empire.|La unificación se proclamó en el palacio de Versalles, en la Francia recién derrotada, tras la victoria prusiana en la guerra franco-prusiana, que sumó al nuevo imperio los estados alemanes que aún quedaban independientes.|L'unification fut proclamée au palais de Versailles, dans la France tout juste vaincue, après que la victoire prussienne dans la guerre franco-prussienne eut rallié au nouvel empire les derniers États allemands indépendants.|統一は、プロイセンが普仏戦争に勝利し、残っていた独立諸邦を新しい帝国にまとめ上げたのち、敗れたばかりのフランスのヴェルサイユ宮殿で宣言された。",
  ),
  q(
    7,
    "Germany's 16 federal states are officially known by which German term?|¿Con qué término alemán se conoce oficialmente a los 16 estados federados de Alemania?|Comment appelle-t-on officiellement, en allemand, les 16 États fédérés d'Allemagne ?|ドイツの16の州を公式に指すドイツ語の呼び名は?",
    [
      "Kantone|Cantones|Cantons|カントーネ",
      "Provinzen|Provincias|Provinces|プロヴィンツェン",
      "Länder|Länder|Länder|レンダー",
    ],
    2,
    "Each of the sixteen Länder has its own constitution, parliament and government, and several, such as Bavaria, still call themselves a 'Freistaat', or free state, a title with no real difference in legal power but a lot of local pride attached.|Cada uno de los dieciséis Länder tiene su propia constitución, parlamento y gobierno, y varios, como Baviera, aún se llaman a sí mismos «Freistaat», o estado libre, un título sin diferencia legal real pero con mucho orgullo local.|Chacun des seize Länder possède sa propre constitution, son parlement et son gouvernement, et plusieurs, comme la Bavière, se disent encore « Freistaat », ou État libre, un titre sans réelle différence de pouvoir légal mais chargé de fierté locale.|16の州(レンダー)はそれぞれ独自の憲法・議会・政府を持つ。バイエルンなど一部の州はいまも自らを「フライシュタート(自由国)」と称するが、法的な権限に実質的な違いはなく、地元の誇りの表れである。",
  ),
  q(
    6,
    "Which German scientist discovered X-rays in 1895 and received the first-ever Nobel Prize in Physics?|¿Qué científico alemán descubrió los rayos X en 1895 y recibió el primer Premio Nobel de Física de la historia?|Quel scientifique allemand découvrit les rayons X en 1895 et reçut le tout premier prix Nobel de physique ?|1895年にX線を発見し、史上初のノーベル物理学賞を受けたドイツの科学者は?",
    [
      "Max Planck|Max Planck|Max Planck|マックス・プランク",
      "Albert Einstein|Albert Einstein|Albert Einstein|アルベルト・アインシュタイン",
      "Wilhelm Röntgen|Wilhelm Röntgen|Wilhelm Röntgen|ヴィルヘルム・レントゲン",
    ],
    2,
    "Röntgen noticed a strange glow coming from a covered screen while experimenting with cathode rays and, unsure what he had found, simply called the new radiation 'X-rays' — a name that stuck worldwide.|Röntgen notó un extraño resplandor procedente de una pantalla cubierta mientras experimentaba con rayos catódicos y, sin saber qué había encontrado, llamó simplemente «rayos X» a la nueva radiación, nombre que se quedó en todo el mundo.|Röntgen remarqua une étrange lueur provenant d'un écran recouvert alors qu'il expérimentait avec des rayons cathodiques et, ne sachant pas ce qu'il avait découvert, appela simplement la nouvelle radiation « rayons X » — un nom resté dans le monde entier.|レントゲンは陰極線の実験中、覆いをかけたスクリーンから奇妙な光が漏れているのに気づいた。何を見つけたのか自分でも分からないまま、その新しい放射線を単に「X線」と呼んだ。この名前はそのまま世界に定着した。",
  ),
  q(
    6,
    "The Bayer company first trademarked which now-common painkiller in 1899?|¿Qué analgésico hoy común registró por primera vez la compañía Bayer en 1899?|Quel analgésique aujourd'hui courant l'entreprise Bayer a-t-elle déposé pour la première fois en 1899 ?|バイエル社が1899年に商標登録した、いまでは一般的な鎮痛剤は?",
    [
      "Ibuprofen|Ibuprofeno|Ibuprofène|イブプロフェン",
      "Paracetamol|Paracetamol|Paracétamol|パラセタモール",
      "Aspirin|Aspirina|Aspirine|アスピリン",
    ],
    2,
    "The active compound, acetylsalicylic acid, had been synthesised in a stable form by a Bayer chemist two years earlier, and the trademarked name Aspirin became so widely used that it turned into a generic term in several countries.|El compuesto activo, ácido acetilsalicílico, había sido sintetizado en forma estable por un químico de Bayer dos años antes, y el nombre registrado Aspirina se usó tan ampliamente que se convirtió en término genérico en varios países.|Le composé actif, l'acide acétylsalicylique, avait été synthétisé sous forme stable par un chimiste de Bayer deux ans plus tôt, et le nom déposé Aspirine devint si largement utilisé qu'il se transforma en terme générique dans plusieurs pays.|有効成分であるアセチルサリチル酸は、その二年前にバイエルの化学者が安定した形で合成していた。「アスピリン」という商標名はあまりに広く使われ、いくつかの国では一般名詞になってしまった。",
  ),
  q(
    6,
    "The MP3 audio format, which shrank music files enough to make digital downloading practical, was developed largely by which German research organisation?|El formato de audio MP3, que redujo el tamaño de los archivos de música lo suficiente para hacer viable la descarga digital, fue desarrollado en gran parte por qué organización alemana de investigación?|Le format audio MP3, qui réduisit assez les fichiers musicaux pour rendre le téléchargement numérique pratique, fut développé en grande partie par quel organisme de recherche allemand ?|音楽ファイルを縮小してデジタルダウンロードを実用的にしたMP3形式は、主にどのドイツの研究機関が開発したか?",
    [
      "The Fraunhofer Institute|El Instituto Fraunhofer|L'Institut Fraunhofer|フラウンホーファー研究機構",
      "The Max Planck Institute|El Instituto Max Planck|L'Institut Max Planck|マックス・プランク研究所",
      "Siemens Research|Investigación de Siemens|Siemens Recherche|シーメンス研究所",
    ],
    0,
    "A team at the Fraunhofer Institute in Erlangen spent years perfecting the compression technique before the format caught on commercially in the late 1990s, changing how music was bought and shared worldwide.|Un equipo del Instituto Fraunhofer en Erlangen pasó años perfeccionando la técnica de compresión antes de que el formato se popularizara comercialmente a finales de los noventa, cambiando cómo se compraba y compartía música en todo el mundo.|Une équipe de l'Institut Fraunhofer à Erlangen passa des années à perfectionner la technique de compression avant que le format ne se popularise commercialement à la fin des années 1990, changeant la façon dont la musique était achetée et partagée dans le monde.|エアランゲンのフラウンホーファー研究機構のチームは、この形式が1990年代末に商業的に広まる前、何年もかけて圧縮技術を磨き上げた。世界じゅうの音楽の買い方・共有のしかたを変えることになった。",
  ),
  q(
    7,
    "Rudolf Diesel, whose name is given to the diesel engine, was actually born in which country rather than Germany?|Rudolf Diesel, cuyo nombre da nombre al motor diésel, en realidad nació en qué país en vez de Alemania?|Rudolf Diesel, dont le nom a donné son nom au moteur diesel, est en réalité né dans quel pays plutôt qu'en Allemagne ?|ディーゼルエンジンにその名を残すルドルフ・ディーゼルは、実はドイツではなくどの国で生まれたか?",
    [
      "France|Francia|France|フランス",
      "Austria|Austria|Autriche|オーストリア",
      "Russia|Rusia|Russie|ロシア",
    ],
    0,
    "Diesel was born in Paris in 1858 to Bavarian immigrant parents and only moved to Germany as a child after the outbreak of the Franco-Prussian War forced the family to flee.|Diesel nació en París en 1858, hijo de padres bávaros inmigrantes, y solo se trasladó a Alemania de niño cuando el estallido de la guerra franco-prusiana obligó a la familia a huir.|Diesel naquit à Paris en 1858, de parents bavarois immigrés, et ne s'installa en Allemagne qu'enfant, lorsque l'éclatement de la guerre franco-prussienne contraignit sa famille à fuir.|ディーゼルは1858年、バイエルンからの移民の両親のもとパリで生まれた。ドイツへ移り住んだのは子どものころ、普仏戦争の勃発で一家が逃れざるを得なくなってからのことである。",
  ),
  q(
    7,
    "The German word 'Rucksack', also used in English, literally combines 'Rücken' (back) with which word?|La palabra alemana «Rucksack», también usada en inglés, ¿combina literalmente «Rücken» (espalda) con qué palabra?|Le mot allemand « Rucksack », aussi utilisé en anglais, combine littéralement « Rücken » (dos) avec quel mot ?|英語でもそのまま使われるドイツ語「リュックサック」は、「Rücken(背中)」と何という語を組み合わせたものか?",
    [
      "Cloth|Tela|Tissu|布",
      "Sack (bag)|Saco (bolsa)|Sac|サック(袋)",
      "Strap|Correa|Sangle|ひも",
    ],
    1,
    "'Rücken' means back and 'Sack' means sack or bag, so a Rucksack is literally just a 'back-bag' — a plain, functional name for the item English speakers sometimes call a 'backpack' instead, unaware they have reinvented the very same word.|«Rücken» significa espalda y «Sack» significa saco o bolsa, así que un Rucksack es literalmente solo una «bolsa de espalda»: un nombre sencillo y funcional para lo que los angloparlantes a veces llaman «backpack», sin saber que han reinventado la misma palabra.|« Rücken » signifie dos et « Sack » signifie sac, si bien qu'un Rucksack est littéralement juste un « sac à dos » — un nom simple et fonctionnel pour ce que les anglophones appellent parfois « backpack », sans savoir qu'ils ont réinventé le même mot.|「Rücken」は背中、「Sack」は袋や嚢を意味するので、リュックサックとは文字通り「背中の袋」にすぎない。英語話者が同じ発想で「バックパック」と呼び直していることに気づかないまま使うことも多い、実用一点張りの名前である。",
  ),
  q(
    4,
    "What is the official name of Germany's top professional football league?|¿Cuál es el nombre oficial de la máxima liga profesional de fútbol de Alemania?|Quel est le nom officiel de la première division professionnelle de football en Allemagne ?|ドイツのプロサッカー最上位リーグの公式名称は?",
    [
      "The Bundesliga|La Bundesliga|La Bundesliga|ブンデスリーガ",
      "Serie A|Serie A|Serie A|セリエA",
      "La Liga|La Liga|La Liga|ラ・リーガ",
    ],
    0,
    "Founded in 1963 to bring together the country's best regional leagues into one national competition, the Bundesliga is now known internationally for consistently high attendance figures at matches.|Fundada en 1963 para reunir en una sola competición nacional las mejores ligas regionales del país, la Bundesliga es hoy conocida internacionalmente por sus altas cifras de asistencia a los partidos.|Fondée en 1963 pour réunir les meilleures ligues régionales du pays en une seule compétition nationale, la Bundesliga est aujourd'hui connue internationalement pour ses chiffres d'affluence constamment élevés.|1963年、国内各地の有力なリーグをひとつの全国大会にまとめるために創設されたブンデスリーガは、いまや観客動員数の高さで国際的に知られている。",
  ),
  q(
    7,
    "Which philosopher, closely associated with German thought, wrote the enormously influential 'Critique of Pure Reason'?|¿Qué filósofo, estrechamente asociado al pensamiento alemán, escribió la enormemente influyente «Crítica de la razón pura»?|Quel philosophe, étroitement associé à la pensée allemande, écrivit l'immensément influente « Critique de la raison pure » ?|ドイツ思想と深く結びつく哲学者で、大きな影響を与えた『純粋理性批判』を著したのは?",
    [
      "Friedrich Nietzsche|Friedrich Nietzsche|Friedrich Nietzsche|フリードリヒ・ニーチェ",
      "Immanuel Kant|Immanuel Kant|Emmanuel Kant|イマヌエル・カント",
      "Georg Hegel|Georg Hegel|Georg Hegel|ゲオルク・ヘーゲル",
    ],
    1,
    "Kant is said to have kept such a strict daily walking schedule that neighbours could reportedly set their clocks by him, and he never once left the region around his home city in his entire life.|Se dice que Kant mantenía un horario de paseo diario tan estricto que, según se cuenta, los vecinos podían poner en hora sus relojes con él, y jamás salió de la región de su ciudad natal en toda su vida.|On dit que Kant suivait un horaire de promenade quotidien si strict que les voisins pouvaient, dit-on, régler leur horloge sur son passage, et il ne quitta jamais de toute sa vie la région de sa ville natale.|カントは毎日の散歩の時間があまりに規則正しく、近所の人々はそれで時計を合わせられたと言われるほどだった。彼は生涯、故郷の町の周辺地域から一歩も出なかった。",
  ),
  q(
    8,
    "Otto von Bismarck introduced the world's first nationwide compulsory system of what, in the 1880s?|¿Qué sistema obligatorio de alcance nacional introdujo Otto von Bismarck por primera vez en el mundo, en la década de 1880?|Otto von Bismarck introduisit dans les années 1880 le tout premier système obligatoire à l'échelle nationale de quoi, une première mondiale ?|オットー・フォン・ビスマルクが1880年代、世界で初めて全国規模の義務制度として導入したのは?",
    [
      "Public health insurance|Un seguro médico público|Une assurance maladie publique|公的医療保険",
      "Free public transport|El transporte público gratuito|Les transports publics gratuits|公共交通の無料化",
      "Universal suffrage|El sufragio universal|Le suffrage universel|普通選挙",
    ],
    0,
    "Bismarck was no social reformer at heart — he introduced sickness, accident and old-age insurance partly to undercut the growing appeal of socialist parties among industrial workers.|Bismarck no era un reformador social de corazón: introdujo el seguro de enfermedad, accidentes y vejez en parte para restar atractivo a los partidos socialistas entre los obreros industriales.|Bismarck n'était pas un réformateur social dans l'âme : il introduisit l'assurance maladie, accident et vieillesse en partie pour saper l'attrait grandissant des partis socialistes auprès des ouvriers.|ビスマルクは本心から社会改革を志した人物ではなかった。疾病・災害・老齢の保険を導入したのは、社会主義政党が工場労働者の間で人気を高めていたのを切り崩す狙いも一部にはあった。",
  ),
  q(
    8,
    "Germany's well-known vocational training system, the 'duale Ausbildung', combines part-time school with what?|El conocido sistema de formación profesional alemán, la «duale Ausbildung», combina la escuela a tiempo parcial con qué?|Le système bien connu de formation professionnelle allemand, la « duale Ausbildung », combine l'école à temps partiel avec quoi ?|ドイツでよく知られる職業訓練制度「デュアル・アウスビルドゥング」は、パートタイムの授業と何を組み合わせているか?",
    [
      "An unpaid internship|Unas prácticas no remuneradas|Un stage non rémunéré|無給のインターンシップ",
      "A paid apprenticeship at a company|Un aprendizaje remunerado en una empresa|Un apprentissage rémunéré en entreprise|企業での有給の実地研修",
      "Online-only coursework|Cursos exclusivamente en línea|Des cours uniquement en ligne|オンライン限定の講座",
    ],
    1,
    "Trainees split their week between a classroom and a real workplace, earning a wage the whole time, and the system is often credited with keeping the country's youth unemployment rate comparatively low.|Los aprendices dividen su semana entre el aula y un lugar de trabajo real, cobrando un salario todo el tiempo, y a menudo se atribuye a este sistema mantener comparativamente baja la tasa de desempleo juvenil del país.|Les apprentis partagent leur semaine entre une salle de classe et un vrai lieu de travail, touchant un salaire tout du long, et ce système est souvent crédité de maintenir comparativement bas le taux de chômage des jeunes du pays.|研修生は一週間を教室と実際の職場に分けて過ごし、その間ずっと給料を受け取る。この制度のおかげで若年層の失業率が他国に比べ低く抑えられているとよく言われる。",
  ),
  q(
    5,
    "The English word 'Wanderlust' comes directly from German. What does the German verb 'wandern' mean on its own?|La palabra inglesa «Wanderlust» viene directamente del alemán. ¿Qué significa por sí solo el verbo alemán «wandern»?|Le mot anglais « Wanderlust » vient directement de l'allemand. Que signifie à lui seul le verbe allemand « wandern » ?|英語の「Wanderlust」はドイツ語からそのまま来た言葉である。ドイツ語の動詞「wandern」単体の意味は?",
    [
      "To want|Querer|Vouloir|欲しがる",
      "To hike|Caminar, hacer senderismo|Randonner|歩いて旅する・ハイキングする",
      "To wonder|Preguntarse|Se demander|不思議に思う",
    ],
    1,
    "'Wandern' describes travelling on foot, especially through countryside, and organised hiking clubs remain a genuinely popular pastime across Germany rather than a niche hobby.|«Wandern» describe viajar a pie, sobre todo por el campo, y los clubes de senderismo organizados siguen siendo un pasatiempo realmente popular en toda Alemania, no un pasatiempo minoritario.|« Wandern » désigne le fait de voyager à pied, surtout à la campagne, et les clubs de randonnée organisés restent un passe-temps réellement populaire dans toute l'Allemagne, plutôt qu'un loisir de niche.|「wandern」は徒歩で、とりわけ田園地帯を旅することを指す。組織だったハイキングクラブはドイツ全土で、一部の人のための趣味ではなく本当に人気のある娯楽であり続けている。",
  ),
  q(
    5,
    "The English word 'Doppelgänger', borrowed from German, describes what?|La palabra inglesa «Doppelgänger», tomada del alemán, ¿qué describe?|Le mot anglais « Doppelgänger », emprunté à l'allemand, décrit quoi ?|ドイツ語から借りた英語「Doppelgänger」が表すのは?",
    [
      "A type of pastry|Un tipo de repostería|Une sorte de pâtisserie|菓子の一種",
      "A look-alike double of a person|Un doble idéntico de una persona|Un double identique d'une personne|ある人物にそっくりな分身",
      "A folk dance in pairs|Un baile folclórico en parejas|Une danse folklorique en couple|二人で踊る民族舞踊",
    ],
    1,
    "The word literally combines 'doppel' (double) and 'Gänger' (goer, walker), and originally carried an eerie folklore meaning — seeing your own double was traditionally taken as a bad omen.|La palabra combina literalmente «doppel» (doble) y «Gänger» (el que anda), y originalmente tenía un sentido inquietante en el folclore: ver a tu propio doble se consideraba tradicionalmente un mal presagio.|Le mot combine littéralement « doppel » (double) et « Gänger » (marcheur), et portait à l'origine un sens inquiétant dans le folklore : voir son propre double était traditionnellement considéré comme un mauvais présage.|この語は「doppel(二重の)」と「Gänger(歩く者)」を組み合わせたもので、もとは薄気味悪い民間伝承の意味を持っていた。自分自身の分身を見ることは、伝統的に不吉な前兆とされた。",
  ),
  q(
    9,
    "The German word 'Zeitgeist', now used in English, literally combines 'time' with which other word?|La palabra alemana «Zeitgeist», hoy usada en inglés, combina literalmente «tiempo» con qué otra palabra?|Le mot allemand « Zeitgeist », désormais utilisé en anglais, combine littéralement « temps » avec quel autre mot ?|いまでは英語でも使われるドイツ語「ツァイトガイスト」は、「時」と何を組み合わせた語か?",
    [
      "Spirit|Espíritu|Esprit|精神・霊",
      "Space|Espacio|Espace|空間",
      "Mind|Mente|Esprit (raison)|理性",
    ],
    0,
    "'Geist' can mean spirit, mind or ghost depending on context, and the philosopher Georg Hegel helped popularise 'Zeitgeist' as a term for the defining mood or outlook of a particular historical period.|«Geist» puede significar espíritu, mente o fantasma según el contexto, y el filósofo Georg Hegel ayudó a popularizar «Zeitgeist» como término para el ánimo o la visión definitoria de un periodo histórico concreto.|« Geist » peut signifier esprit, raison ou fantôme selon le contexte, et le philosophe Georg Hegel contribua à populariser « Zeitgeist » comme terme désignant l'état d'esprit définissant une période historique donnée.|「Geist」は文脈によって精神・理性・幽霊のいずれの意味にもなる語である。哲学者ゲオルク・ヘーゲルは、ある時代を特徴づける気分や見方を表す語として「ツァイトガイスト」を広めた。",
  ),
  q(
    9,
    "Germany's constitution, adopted in 1949, refers to the country by which official name?|La constitución alemana, adoptada en 1949, ¿con qué nombre oficial designa al país?|La constitution allemande, adoptée en 1949, désigne le pays sous quel nom officiel ?|1949年に採択されたドイツの憲法は、この国を公式に何と呼んでいるか?",
    [
      "The Federal Republic of Germany|La República Federal de Alemania|La République fédérale d'Allemagne|ドイツ連邦共和国",
      "The German Reich|El Reich alemán|Le Reich allemand|ドイツ国(ライヒ)",
      "The German Union|La Unión Alemana|L'Union allemande|ドイツ連合",
    ],
    0,
    "The Basic Law, drafted for West Germany in 1949 and extended to the whole country at reunification in 1990, deliberately avoided older imperial language in favour of a name emphasising the federal structure of the new state.|La Ley Fundamental, redactada para Alemania Occidental en 1949 y extendida a todo el país en la reunificación de 1990, evitó deliberadamente el lenguaje imperial más antiguo, a favor de un nombre que subraya la estructura federal del nuevo estado.|La Loi fondamentale, rédigée pour l'Allemagne de l'Ouest en 1949 et étendue à tout le pays lors de la réunification de 1990, évita délibérément le langage impérial plus ancien au profit d'un nom soulignant la structure fédérale du nouvel État.|1949年に西ドイツのために起草され、1990年の再統一で国全体に適用された基本法は、古い帝政ふうの語をあえて避け、新しい国家の連邦制という構造を強調する名を選んだ。",
  ),
  q(
    3,
    "Which of these is not actually a German car manufacturer?|¿Cuál de estos no es en realidad un fabricante de coches alemán?|Lequel de ceux-ci n'est en réalité pas un constructeur automobile allemand ?|次のうち、実際にはドイツの自動車メーカーではないのは?",
    [
      "Volkswagen|Volkswagen|Volkswagen|フォルクスワーゲン",
      "Ferrari|Ferrari|Ferrari|フェラーリ",
      "BMW|BMW|BMW|BMW",
    ],
    1,
    "Ferrari is an Italian marque founded in Modena in 1939, while Volkswagen and BMW are both headquartered in Germany, in Wolfsburg and Munich respectively.|Ferrari es una marca italiana fundada en Módena en 1939, mientras que Volkswagen y BMW tienen su sede en Alemania, en Wolfsburgo y Múnich respectivamente.|Ferrari est une marque italienne fondée à Modène en 1939, tandis que Volkswagen et BMW ont toutes deux leur siège en Allemagne, à Wolfsburg et à Munich respectivement.|フェラーリは1939年にモデナで創業したイタリアのブランドである。一方フォルクスワーゲンとBMWは、それぞれヴォルフスブルクとミュンヘンにドイツの本社を置く。",
  ),
  q(
    2,
    "What does the name 'Volkswagen' literally translate to?|¿Qué significa literalmente el nombre «Volkswagen»?|Que signifie littéralement le nom « Volkswagen » ?|「フォルクスワーゲン」という名前を直訳すると何になるか?",
    [
      "Fast car|Coche rápido|Voiture rapide|速い車",
      "People's car|Coche del pueblo|Voiture du peuple|国民の車",
      "Small car|Coche pequeño|Petite voiture|小さな車",
    ],
    1,
    "The name reflects the company's founding goal in the 1930s of producing an affordable car that an ordinary family could realistically buy, an idea that eventually became the Beetle.|El nombre refleja el objetivo fundacional de la empresa en los años treinta: producir un coche asequible que una familia corriente pudiera comprar de verdad, idea que acabó dando lugar al Escarabajo.|Le nom reflète l'objectif fondateur de l'entreprise dans les années 1930 : produire une voiture abordable qu'une famille ordinaire pourrait réellement s'offrir, une idée qui donna finalement naissance à la Coccinelle.|この名前は1930年代、平凡な家庭でも現実に買える手頃な車を作るという会社創業時の目標を映している。この発想がのちにビートルへと結実した。",
  ),
  q(
    7,
    "Beyond fairy tales, the Brothers Grimm also spent decades working on an enormous unfinished project cataloguing the entire history of which language?|Además de los cuentos de hadas, los hermanos Grimm también pasaron décadas trabajando en un enorme proyecto inacabado que catalogaba toda la historia de qué idioma?|Au-delà des contes de fées, les frères Grimm passèrent aussi des décennies sur un immense projet inachevé recensant toute l'histoire de quelle langue ?|グリム兄弟はおとぎ話だけでなく、何十年もかけてある言語の歴史全体を網羅する未完の大事業にも取り組んでいた。その言語は?",
    [
      "Latin|Latín|Latin|ラテン語",
      "German|Alemán|Allemand|ドイツ語",
      "French|Francés|Français|フランス語",
    ],
    1,
    "Their 'Deutsches Wörterbuch', begun in 1838, was so vast in scope that it was not finally completed until 1961, long after both brothers and even the next generation of scholars working on it had died.|Su «Deutsches Wörterbuch», iniciado en 1838, tenía un alcance tan enorme que no se terminó hasta 1961, mucho después de que murieran ambos hermanos e incluso la siguiente generación de estudiosos que trabajaba en él.|Leur « Deutsches Wörterbuch », commencé en 1838, avait une ampleur telle qu'il ne fut achevé qu'en 1961, longtemps après la mort des deux frères et même de la génération suivante d'érudits qui y travaillait.|1838年に始まった彼らの『ドイツ語辞典』はあまりに壮大な企てで、完成したのは1961年になってからだった。二人の兄弟はおろか、後を継いだ次の世代の学者たちさえ世を去ったあとのことである。",
  ),
  q(
    1,
    "What does the common German greeting 'Guten Tag' mean?|¿Qué significa el saludo alemán habitual «Guten Tag»?|Que signifie la salutation allemande courante « Guten Tag » ?|よく使われるドイツ語のあいさつ「グーテン・ターク」の意味は?",
    [
      "Good day|Buen día|Bonjour|こんにちは(良い日を)",
      "Good night|Buenas noches|Bonne nuit|おやすみなさい",
      "See you soon|Hasta pronto|À bientôt|またすぐに",
    ],
    0,
    "'Guten Tag' is used as a general greeting through most of the day, while 'Guten Abend' takes over once evening arrives and 'Gute Nacht' is reserved specifically for parting at bedtime.|«Guten Tag» se usa como saludo general durante casi todo el día, mientras que «Guten Abend» lo sustituye al llegar la noche y «Gute Nacht» se reserva para despedirse a la hora de dormir.|« Guten Tag » s'emploie comme salutation générale presque toute la journée, tandis que « Guten Abend » prend le relais le soir venu et « Gute Nacht » est réservé aux adieux au moment du coucher.|「グーテン・ターク」は一日のほとんどの時間帯で使える一般的なあいさつである。夜になると「グーテン・アーベント」に替わり、「グーテ・ナハト」は就寝時の別れの言葉として使われる。",
  ),
  q(
    9,
    "The melody of Germany's national anthem, the 'Deutschlandlied', was originally composed for a completely different purpose. Who wrote it?|La melodía del himno nacional alemán, el «Deutschlandlied», se compuso originalmente para un fin totalmente distinto. ¿Quién la escribió?|La mélodie de l'hymne national allemand, le « Deutschlandlied », fut à l'origine composée dans un tout autre but. Qui l'a écrite ?|ドイツ国歌「ドイチュラントリート」の旋律は、もともとまったく別の目的で作られたものだった。作曲したのは?",
    [
      "Ludwig van Beethoven|Ludwig van Beethoven|Ludwig van Beethoven|ルートヴィヒ・ヴァン・ベートーヴェン",
      "Joseph Haydn|Joseph Haydn|Joseph Haydn|ヨーゼフ・ハイドン",
      "Richard Wagner|Richard Wagner|Richard Wagner|リヒャルト・ワーグナー",
    ],
    1,
    "Joseph Haydn wrote the tune in 1797 as an anthem honouring the Austrian emperor; entirely different German lyrics were set to the same melody decades later by a poet named Hoffmann von Fallersleben.|Joseph Haydn escribió la melodía en 1797 como himno en honor al emperador austríaco; décadas después, un poeta llamado Hoffmann von Fallersleben puso una letra alemana totalmente distinta a esa misma melodía.|Joseph Haydn écrivit la mélodie en 1797 comme hymne en l'honneur de l'empereur autrichien ; des décennies plus tard, un poète nommé Hoffmann von Fallersleben posa des paroles allemandes entièrement différentes sur cette même mélodie.|ヨーゼフ・ハイドンは1797年、オーストリア皇帝をたたえる賛歌としてこの旋律を作った。何十年もあとになって、ホフマン・フォン・ファラースレーベンという詩人がまったく異なるドイツ語の歌詞を同じ旋律に付けた。",
  ),
  q(
    4,
    "Germany was one of the founding members in 1957 of which organisation, an early forerunner of today's European Union?|Alemania fue uno de los miembros fundadores en 1957 de qué organización, precursora temprana de la actual Unión Europea?|L'Allemagne fut l'un des membres fondateurs en 1957 de quelle organisation, un précurseur précoce de l'actuelle Union européenne ?|ドイツが1957年に創設に参加した、今日のEUの前身にあたる組織は?",
    [
      "NATO|La OTAN|L'OTAN|NATO(北大西洋条約機構)",
      "The European Economic Community|La Comunidad Económica Europea|La Communauté économique européenne|欧州経済共同体(EEC)",
      "The United Nations|Las Naciones Unidas|Les Nations unies|国際連合",
    ],
    1,
    "The Treaty of Rome created the EEC with six founding members — West Germany, France, Italy, Belgium, the Netherlands and Luxembourg — aiming first at closer economic ties rather than full political union.|El Tratado de Roma creó la CEE con seis miembros fundadores —Alemania Occidental, Francia, Italia, Bélgica, los Países Bajos y Luxemburgo—, con el objetivo inicial de lazos económicos más estrechos antes que una unión política plena.|Le traité de Rome créa la CEE avec six membres fondateurs — l'Allemagne de l'Ouest, la France, l'Italie, la Belgique, les Pays-Bas et le Luxembourg — visant d'abord des liens économiques plus étroits plutôt qu'une pleine union politique.|ローマ条約により、西ドイツ・フランス・イタリア・ベルギー・オランダ・ルクセンブルクの6か国を創設国としてEECが発足した。当初目指したのは完全な政治統合ではなく、より緊密な経済的結びつきだった。",
  ),
  q(
    3,
    "Which mountain range forms much of Germany's southern border, shared with Austria and Switzerland?|¿Qué cordillera forma buena parte de la frontera sur de Alemania, compartida con Austria y Suiza?|Quelle chaîne de montagnes forme une grande partie de la frontière sud de l'Allemagne, partagée avec l'Autriche et la Suisse ?|オーストリアやスイスと共有する、ドイツ南部の国境の多くを形づくる山脈は?",
    [
      "The Pyrenees|Los Pirineos|Les Pyrénées|ピレネー山脈",
      "The Alps|Los Alpes|Les Alpes|アルプス山脈",
      "The Carpathians|Los Cárpatos|Les Carpates|カルパティア山脈",
    ],
    1,
    "Only a relatively small slice of the Alps lies within Germany, mostly in the southern tip of Bavaria, but it holds the country's highest peaks and its main winter sports region.|Solo una porción relativamente pequeña de los Alpes queda dentro de Alemania, sobre todo en el extremo sur de Baviera, pero ahí están los picos más altos del país y su principal región de deportes de invierno.|Seule une tranche relativement petite des Alpes se trouve en Allemagne, surtout à la pointe sud de la Bavière, mais elle abrite les plus hauts sommets du pays et sa principale région de sports d'hiver.|アルプス山脈のうちドイツ国内にあるのは比較的小さな一角で、主にバイエルン最南端にすぎないが、そこに国内最高峰と主要なウィンタースポーツ地域が集まっている。",
  ),
  q(
    2,
    "Alongside the Baltic Sea, which other sea forms part of Germany's northern coastline?|Además del mar Báltico, ¿qué otro mar forma parte de la costa norte de Alemania?|Aux côtés de la mer Baltique, quelle autre mer forme une partie du littoral nord de l'Allemagne ?|バルト海とともに、ドイツ北部の海岸線の一部をなすもう一つの海は?",
    [
      "The Mediterranean Sea|El mar Mediterráneo|La mer Méditerranée|地中海",
      "The Adriatic Sea|El mar Adriático|La mer Adriatique|アドリア海",
      "The North Sea|El mar del Norte|La mer du Nord|北海",
    ],
    2,
    "Germany has two separate northern coastlines, split by the narrow neck of Denmark, with the North Sea to the west and the Baltic Sea to the east — a geography that shaped centuries of separate maritime trade.|Alemania tiene dos costas norteñas separadas, divididas por el estrecho cuello de Dinamarca, con el mar del Norte al oeste y el Báltico al este, una geografía que marcó siglos de comercio marítimo distinto.|L'Allemagne possède deux littoraux nord distincts, séparés par l'étroit goulot du Danemark, avec la mer du Nord à l'ouest et la Baltique à l'est — une géographie qui a façonné des siècles de commerce maritime séparé.|ドイツには北の海岸線が二つあり、デンマークの細い首の部分によって西の北海と東のバルト海に分かれている。この地形が何世紀にもわたる別々の海上交易のあり方を形づくってきた。",
  ),
  q(
    9,
    "Which of Germany's 16 federal states is the smallest by land area?|¿Cuál de los 16 estados federados de Alemania es el más pequeño por superficie?|Lequel des 16 Länder allemands est le plus petit par sa superficie ?|ドイツの16州のうち、面積が最も小さいのは?",
    [
      "Saarland|El Sarre|La Sarre|ザールラント州",
      "Bremen|Bremen|Brême|ブレーメン州",
      "Hamburg|Hamburgo|Hambourg|ハンブルク州",
    ],
    1,
    "Bremen is a city-state covering barely over 400 square kilometres, smaller even than the other two city-states, Hamburg and Berlin, and far smaller than Saarland, which people often assume is the smallest.|Bremen es una ciudad-estado que apenas supera los 400 kilómetros cuadrados, más pequeña incluso que las otras dos ciudades-estado, Hamburgo y Berlín, y mucho más pequeña que el Sarre, que mucha gente cree erróneamente el más pequeño.|Brême est une ville-État couvrant à peine plus de 400 kilomètres carrés, plus petite encore que les deux autres villes-États, Hambourg et Berlin, et bien plus petite que la Sarre, que l'on croit souvent à tort être la plus petite.|ブレーメン州は面積わずか400平方キロメートル強の都市州で、同じ都市州であるハンブルクやベルリンよりも小さく、しばしば最小と思われがちなザールラント州よりもはるかに小さい。",
  ),
  q(
    3,
    "What colour is the eagle on Germany's national coat of arms?|¿De qué color es el águila del escudo nacional de Alemania?|De quelle couleur est l'aigle des armoiries nationales de l'Allemagne ?|ドイツの国章に描かれた鷲は何色か?",
    [
      "Black|Negro|Noir|黒",
      "Gold|Oro|Or|金",
      "Red|Rojo|Rouge|赤",
    ],
    0,
    "The single-headed black eagle, known as the Bundesadler, stands on a gold background and has represented German states in one form or another since the days of the Holy Roman Empire.|El águila negra de una sola cabeza, conocida como Bundesadler, se alza sobre un fondo dorado y representa a los estados alemanes de una forma u otra desde los tiempos del Sacro Imperio Romano.|L'aigle noir à une seule tête, appelé Bundesadler, se dresse sur un fond doré et représente les États allemands sous une forme ou une autre depuis l'époque du Saint-Empire romain germanique.|一つ頭の黒い鷲は「ブンデスアドラー」と呼ばれ、金地の上に描かれる。神聖ローマ帝国の時代から、形を変えながらもドイツの諸邦を象徴し続けてきた。",
  ),
  q(
    6,
    "A canal completed in 1992 finally linked the Rhine and Danube river systems, allowing boats to cross the entire continent. What is it commonly called?|Un canal terminado en 1992 unió por fin las cuencas del Rin y el Danubio, permitiendo a los barcos cruzar todo el continente. ¿Cómo se le suele llamar?|Un canal achevé en 1992 relia enfin les bassins du Rhin et du Danube, permettant aux bateaux de traverser tout le continent. Comment l'appelle-t-on couramment ?|1992年に完成し、ライン川とドナウ川の水系をついに結んで船が大陸を横断できるようにした運河の通称は?",
    [
      "The Main-Danube Canal|El canal Meno-Danubio|Le canal Main-Danube|マイン=ドナウ運河",
      "The Kiel Canal|El canal de Kiel|Le canal de Kiel|キール運河",
      "The Elbe Canal|El canal del Elba|Le canal de l'Elbe|エルベ運河",
    ],
    0,
    "By linking the Main, a tributary of the Rhine, to the Danube, the canal makes it possible in theory to sail a boat from the North Sea all the way to the Black Sea without ever leaving inland waterways.|Al unir el Meno, afluente del Rin, con el Danubio, el canal permite en teoría navegar un barco desde el mar del Norte hasta el mar Negro sin salir nunca de las vías navegables interiores.|En reliant le Main, affluent du Rhin, au Danube, le canal permet en théorie de naviguer du bec de la mer du Nord jusqu'à la mer Noire sans jamais quitter les voies navigables intérieures.|ライン川の支流であるマイン川とドナウ川を結ぶこの運河のおかげで、理論上は北海から黒海まで、内陸の水路だけを通って船で行けるようになった。",
  ),
];
