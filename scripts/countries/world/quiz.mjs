/**
 * 世界マップのクイズ(40問)。
 *
 * 難易度は1〜10。世界マップだけは基準が他国と違い、
 * 「世界のどこかに住む一般的な人がどれくらい答えられそうか」で見る。
 *   1〜3 … 知らなくても常識や推測で当たる
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 文化・歴史・自然に踏み込んだ知識が要る
 *   9〜10 … その土地に縁があるか、強い関心のある人でないと難しい
 *
 * 特定の大陸に偏らないよう、六つの地方から満遍なく出している。
 * 選択肢は3つ。正解の位置(`a`)は偏らないよう散らしてある。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

/** 1問を組み立てる。`o` は選択肢の配列、`a` は正解の添字。 */
function q(difficulty, question, options, a, fact) {
  return { difficulty, q: t(question), o: options.map(t), a, f: t(fact) };
}

export const WORLD_QUIZ = [
  q(
    1,
    "Which is the largest ocean?|¿Cuál es el océano más grande?|Quel est le plus grand océan ?|いちばん大きな海洋は?",
    [
      "The Atlantic|El Atlántico|L'Atlantique|大西洋",
      "The Pacific|El Pacífico|Le Pacifique|太平洋",
      "The Indian Ocean|El Índico|L'océan Indien|インド洋",
    ],
    1,
    "The Pacific covers about a third of the planet's surface — more than all the dry land put together.|El Pacífico cubre cerca de un tercio de la superficie del planeta, más que toda la tierra firme junta.|Le Pacifique couvre environ un tiers de la surface du globe, plus que toutes les terres émergées réunies.|太平洋は地球の表面のおよそ3分の1を占め、陸地すべてを合わせたより広いです。",
  ),
  q(
    1,
    "On which continent is the Sahara?|¿En qué continente está el Sahara?|Sur quel continent se trouve le Sahara ?|サハラ砂漠がある大陸は?",
    [
      "Asia|Asia|L'Asie|アジア",
      "South America|América del Sur|L'Amérique du Sud|南アメリカ",
      "Africa|África|L'Afrique|アフリカ",
    ],
    2,
    "The Sahara is roughly the size of the United States, and its southern edge shifts north and south with the rains.|El Sahara tiene aproximadamente el tamaño de Estados Unidos, y su borde sur avanza y retrocede con las lluvias.|Le Sahara fait à peu près la taille des États-Unis, et sa lisière sud avance et recule au rythme des pluies.|サハラ砂漠はおよそアメリカ合衆国と同じ広さで、南の縁は雨の多寡で北へ南へ動きます。",
  ),
  q(
    1,
    "Which mountain rises highest above sea level?|¿Qué montaña se eleva más sobre el nivel del mar?|Quelle montagne s'élève le plus haut au-dessus du niveau de la mer ?|海抜がいちばん高い山は?",
    [
      "Mount Everest|El Everest|L'Everest|エベレスト",
      "Mont Blanc|El Mont Blanc|Le mont Blanc|モンブラン",
      "Mount Fuji|El monte Fuji|Le mont Fuji|富士山",
    ],
    0,
    "Everest stands about 8,849 m and grows a few millimetres a year as the Indian plate pushes into Asia.|El Everest mide unos 8.849 m y crece unos milímetros al año, empujado por la placa india contra Asia.|L'Everest culmine à environ 8 849 m et grandit de quelques millimètres par an, la plaque indienne poussant vers l'Asie.|エベレストは標高約8,849m。インド・プレートがアジアへ押し込むため、今も年に数ミリずつ高くなっています。",
  ),
  q(
    2,
    "Where is the Amazon rainforest?|¿Dónde está la selva amazónica?|Où se trouve la forêt amazonienne ?|アマゾンの熱帯雨林はどこ?",
    [
      "Central Africa|África central|En Afrique centrale|中部アフリカ",
      "South America|América del Sur|En Amérique du Sud|南アメリカ",
      "Southeast Asia|El Sudeste Asiático|En Asie du Sud-Est|東南アジア",
    ],
    1,
    "The forest makes much of its own rain: a drop can fall and be lifted again five or six times before it reaches the sea.|La selva fabrica buena parte de su propia lluvia: una gota puede caer y volver a subir cinco o seis veces antes de llegar al mar.|La forêt fabrique une bonne part de sa propre pluie : une goutte peut tomber et remonter cinq ou six fois avant d'atteindre la mer.|この森は雨の多くを自分で作ります。一粒の水は海に届くまでに5〜6回、降ってはまた蒸発します。",
  ),
  q(
    2,
    "Which animal lives wild only in Australia and New Guinea?|¿Qué animal vive en libertad sólo en Australia y Nueva Guinea?|Quel animal ne vit à l'état sauvage qu'en Australie et en Nouvelle-Guinée ?|野生ではオーストラリアとニューギニアにしかいない動物は?",
    [
      "The llama|La llama|Le lama|リャマ",
      "The reindeer|El reno|Le renne|トナカイ",
      "The kangaroo|El canguro|Le kangourou|カンガルー",
    ],
    2,
    "Australia drifted clear of the other continents about 35 million years ago, which is why almost half its mammals carry their young in a pouch.|Australia se separó de los demás continentes hace unos 35 millones de años, y por eso casi la mitad de sus mamíferos llevan a las crías en una bolsa.|L'Australie s'est détachée des autres continents il y a quelque 35 millions d'années : c'est pourquoi près de la moitié de ses mammifères portent leurs petits dans une poche.|オーストラリアが他の大陸から離れきったのは約3500万年前。哺乳類のほぼ半数が子を袋で育てるのはそのためです。",
  ),
  q(
    2,
    "What is the equator?|¿Qué es el ecuador?|Qu'est-ce que l'équateur ?|赤道とは?",
    [
      "The line halfway between the poles|La línea a medio camino entre los polos|La ligne à mi-chemin entre les pôles|両極のちょうど中間を通る線",
      "The boundary between two oceans|El límite entre dos océanos|La limite entre deux océans|二つの大洋の境目",
      "The path the sun takes in summer|El camino del sol en verano|La course du soleil en été|夏の太陽が通る道",
    ],
    0,
    "It crosses thirteen countries, and a place standing on it is being carried east at about 1,670 km/h.|Cruza trece países, y un punto situado sobre él viaja hacia el este a unos 1.670 km/h.|Il traverse treize pays, et un point posé dessus file vers l'est à quelque 1 670 km/h.|赤道は13か国を通ります。その上に立っている場所は、時速およそ1,670kmで東へ運ばれています。",
  ),
  q(
    2,
    "Which country has the most people?|¿Qué país tiene más habitantes?|Quel pays compte le plus d'habitants ?|人口がいちばん多い国は?",
    [
      "China|China|La Chine|中国",
      "The United States|Estados Unidos|Les États-Unis|アメリカ合衆国",
      "India|La India|L'Inde|インド",
    ],
    2,
    "India passed China in 2023; both are above 1.4 billion, and between them they hold about a third of everyone alive.|La India superó a China en 2023; ambos pasan de 1.400 millones y entre los dos reúnen cerca de un tercio de la humanidad.|L'Inde a dépassé la Chine en 2023 ; tous deux dépassent 1,4 milliard d'habitants et rassemblent à eux seuls près d'un tiers de l'humanité.|2023年にインドが中国を抜きました。どちらも14億人を超え、二国で世界人口のおよそ3分の1にあたります。",
  ),
  q(
    3,
    "Which is the longest river in North America?|¿Cuál es el río más largo de América del Norte?|Quel est le plus long fleuve d'Amérique du Nord ?|北アメリカでいちばん長い川は?",
    [
      "The Mississippi|El Misisipi|Le Mississippi|ミシシッピ川",
      "The Colorado|El Colorado|Le Colorado|コロラド川",
      "The Hudson|El Hudson|L'Hudson|ハドソン川",
    ],
    0,
    "With the Missouri it runs about 6,000 km, and at New Orleans it flows higher than the streets, held up by levees.|Con el Misuri suma unos 6.000 km, y en Nueva Orleans corre más alto que las calles, sostenido por diques.|Avec le Missouri, il fait quelque 6 000 km, et à La Nouvelle-Orléans il coule plus haut que les rues, retenu par des digues.|ミズーリ川と合わせて約6,000km。ニューオーリンズでは堤防に支えられ、街路より高いところを流れています。",
  ),
  q(
    3,
    "In which sea can a swimmer float without effort?|¿En qué mar flota uno sin esfuerzo?|Dans quelle mer flotte-t-on sans effort ?|力を入れなくても浮いていられる海は?",
    [
      "The Baltic Sea|El mar Báltico|La mer Baltique|バルト海",
      "The Dead Sea|El mar Muerto|La mer Morte|死海",
      "The Black Sea|El mar Negro|La mer Noire|黒海",
    ],
    1,
    "It is about ten times as salty as the ocean, and its shore is the lowest dry land on earth, more than 430 m below sea level.|Es unas diez veces más salado que el océano, y su orilla es la tierra firme más baja del planeta, a más de 430 m bajo el nivel del mar.|Elle est environ dix fois plus salée que l'océan, et ses rives sont la terre ferme la plus basse du globe, à plus de 430 m sous le niveau de la mer.|海水のおよそ10倍の塩分があります。岸は海面より430m以上低く、陸地としては地球で最も低い場所です。",
  ),
  q(
    3,
    "Which currency is shared by twenty European countries?|¿Qué moneda comparten veinte países europeos?|Quelle monnaie est partagée par vingt pays européens ?|ヨーロッパの20か国が使っている通貨は?",
    [
      "The franc|El franco|Le franc|フラン",
      "The krona|La corona|La couronne|クローナ",
      "The euro|El euro|L'euro|ユーロ",
    ],
    2,
    "Euro notes and coins replaced twelve national currencies in 2002; the notes show imaginary bridges so that no country could claim them.|Los billetes y monedas del euro sustituyeron a doce monedas nacionales en 2002; los billetes muestran puentes imaginarios para que ningún país pudiera reclamarlos.|Billets et pièces en euros ont remplacé douze monnaies nationales en 2002 ; les billets montrent des ponts imaginaires, qu'aucun pays ne puisse les revendiquer.|2002年、12か国の通貨がユーロ紙幣と硬貨に置き換わりました。紙幣に描かれた橋は、どの国のものでもないよう架空のものです。",
  ),
  q(
    3,
    "Which language has the most first-language speakers?|¿Qué lengua tiene más hablantes nativos?|Quelle langue compte le plus de locuteurs natifs ?|母語として話す人がいちばん多い言語は?",
    [
      "English|El inglés|L'anglais|英語",
      "Mandarin Chinese|El chino mandarín|Le mandarin|中国語(北京語)",
      "Spanish|El español|L'espagnol|スペイン語",
    ],
    1,
    "Mandarin has around 940 million first-language speakers; English comes first only once second languages are counted.|El mandarín ronda los 940 millones de hablantes nativos; el inglés sólo encabeza la lista si se cuentan las segundas lenguas.|Le mandarin compte quelque 940 millions de locuteurs natifs ; l'anglais ne passe en tête que si l'on compte les langues secondes.|中国語(北京語)の母語話者は約9億4000万人。第二言語まで含めるとようやく英語が首位になります。",
  ),
  q(
    4,
    "Which city stands on two continents?|¿Qué ciudad se asienta en dos continentes?|Quelle ville est bâtie sur deux continents ?|二つの大陸にまたがる都市は?",
    [
      "Cairo|El Cairo|Le Caire|カイロ",
      "Athens|Atenas|Athènes|アテネ",
      "Istanbul|Estambul|Istanbul|イスタンブール",
    ],
    2,
    "The Bosphorus is only about 700 m across at its narrowest, and ferries have carried people between Europe and Asia across it for centuries.|El Bósforo mide unos 700 m en su punto más estrecho, y los transbordadores llevan siglos cruzando entre Europa y Asia.|Le Bosphore ne fait qu'environ 700 m à son point le plus étroit, et les bacs y font passer d'Europe en Asie depuis des siècles.|ボスポラス海峡は最も狭いところで約700m。何世紀ものあいだ、渡し船がヨーロッパとアジアのあいだを行き来しています。",
  ),
  q(
    4,
    "What is Machu Picchu?|¿Qué es Machu Picchu?|Qu'est-ce que le Machu Picchu ?|マチュピチュとは?",
    [
      "An Inca settlement high in the mountains|Un asentamiento inca en plena montaña|Un établissement inca en haute montagne|山の上に築かれたインカの集落",
      "A Maya pyramid in the jungle|Una pirámide maya en la selva|Une pyramide maya dans la jungle|密林の中のマヤのピラミッド",
      "A Spanish fort above the coast|Un fuerte español sobre la costa|Un fort espagnol au-dessus de la côte|海を見下ろすスペインの砦",
    ],
    0,
    "It was built around 1450 and left within a century, and the Spanish never found it; terraces cut into the slope keep the whole site from sliding away.|Se construyó hacia 1450 y se abandonó en menos de un siglo, sin que los españoles llegaran a hallarlo; las terrazas talladas en la ladera impiden que todo se deslice.|Bâti vers 1450 et abandonné en moins d'un siècle, il échappa aux Espagnols ; des terrasses taillées dans la pente empêchent le site de glisser.|1450年頃に築かれ、100年経たずに放棄されました。スペイン人には見つかっていません。斜面に刻まれた段々畑が、遺跡全体が崩れ落ちるのを防いでいます。",
  ),
  q(
    4,
    "Which country is made up of more than 17,000 islands?|¿Qué país está formado por más de 17.000 islas?|Quel pays est fait de plus de 17 000 îles ?|1万7千を超える島からなる国は?",
    [
      "The Philippines|Filipinas|Les Philippines|フィリピン",
      "Japan|Japón|Le Japon|日本",
      "Indonesia|Indonesia|L'Indonésie|インドネシア",
    ],
    2,
    "Only about 6,000 of them have anyone living on them, and the country stretches across three time zones.|Sólo unas 6.000 están habitadas, y el país se extiende por tres husos horarios.|Environ 6 000 seulement sont habitées, et le pays s'étend sur trois fuseaux horaires.|人が住んでいるのはおよそ6,000島だけで、国土は三つの時間帯にまたがっています。",
  ),
  q(
    4,
    "What is the Great Barrier Reef?|¿Qué es la Gran Barrera de Coral?|Qu'est-ce que la Grande Barrière de corail ?|グレート・バリア・リーフとは?",
    [
      "An underwater mountain range|Una cordillera submarina|Une chaîne de montagnes sous-marine|海底の山脈",
      "The largest structure built by living creatures|La mayor estructura construida por seres vivos|La plus grande structure bâtie par des êtres vivants|生き物が造った世界最大の構造物",
      "A chain of volcanic islands|Una cadena de islas volcánicas|Un chapelet d'îles volcaniques|火山島の連なり",
    ],
    1,
    "It runs about 2,300 km and is built by coral animals a few millimetres across; it has lost roughly half its coral cover since 1995.|Se extiende unos 2.300 km y la construyen corales de pocos milímetros; ha perdido cerca de la mitad de su cobertura de coral desde 1995.|Elle s'étire sur quelque 2 300 km et est bâtie par des coraux de quelques millimètres ; elle a perdu près de la moitié de sa couverture corallienne depuis 1995.|全長およそ2,300km。数ミリの珊瑚虫が造ったものです。1995年以降、珊瑚の被度はおよそ半分に減りました。",
  ),
  q(
    4,
    "Which African country was never made a European colony?|¿Qué país africano nunca fue colonia europea?|Quel pays africain n'a jamais été une colonie européenne ?|ヨーロッパの植民地にならなかったアフリカの国は?",
    [
      "Kenya|Kenia|Le Kenya|ケニア",
      "Ethiopia|Etiopía|L'Éthiopie|エチオピア",
      "Ghana|Ghana|Le Ghana|ガーナ",
    ],
    1,
    "An Ethiopian army defeated an Italian one at Adwa in 1896, and the country kept its independence apart from five years of occupation from 1936.|Un ejército etíope derrotó a otro italiano en Adua en 1896, y el país conservó su independencia salvo cinco años de ocupación desde 1936.|Une armée éthiopienne battit une armée italienne à Adoua en 1896, et le pays garda son indépendance, hormis cinq ans d'occupation à partir de 1936.|1896年、エチオピア軍はアドワでイタリア軍を破りました。1936年からの5年間の占領を除き、独立を保ち続けています。",
  ),
  q(
    5,
    "What was the Silk Road?|¿Qué era la Ruta de la Seda?|Qu'était la route de la Soie ?|シルクロードとは?",
    [
      "A single paved road from China to Rome|Un único camino empedrado de China a Roma|Une unique route pavée de la Chine à Rome|中国からローマまでの一本の舗装路",
      "A sea route around India|Una ruta marítima alrededor de la India|Une route maritime contournant l'Inde|インドを回る海の道",
      "A network of overland routes across Asia|Una red de rutas terrestres por Asia|Un réseau de routes terrestres à travers l'Asie|アジアを横切る陸路の網",
    ],
    2,
    "Hardly anyone travelled the whole way: goods changed hands many times, and the name itself was invented by a German geographer in 1877.|Casi nadie recorría el trayecto entero: las mercancías cambiaban de manos muchas veces, y el nombre lo inventó un geógrafo alemán en 1877.|Presque personne ne faisait tout le trajet : les marchandises changeaient de mains bien des fois, et le nom fut forgé par un géographe allemand en 1877.|端から端まで旅した人はほとんどいません。荷は何度も持ち主を変えました。「シルクロード」という名は1877年、ドイツの地理学者が付けたものです。",
  ),
  q(
    5,
    "What is the Statue of Liberty made of?|¿De qué está hecha la Estatua de la Libertad?|En quoi est faite la statue de la Liberté ?|自由の女神像は何でできている?",
    [
      "Copper sheet about 2.4 mm thick|Chapa de cobre de unos 2,4 mm|Une tôle de cuivre d'environ 2,4 mm|厚さ約2.4mmの銅板",
      "Solid cast bronze|Bronce macizo|Du bronze massif|中まで詰まった青銅",
      "Painted concrete|Hormigón pintado|Du béton peint|塗装したコンクリート",
    ],
    0,
    "The skin is about as thick as two coins, hung on an iron frame designed by Gustave Eiffel, and it had turned green within thirty years.|La piel tiene el grosor de dos monedas y cuelga de una armadura de hierro diseñada por Gustave Eiffel; en treinta años se había vuelto verde.|La peau a l'épaisseur de deux pièces et est suspendue à une ossature de fer dessinée par Gustave Eiffel ; elle avait verdi en trente ans.|外皮の厚さは硬貨2枚ほど。ギュスターヴ・エッフェルが設計した鉄の骨組みに吊られており、30年のうちに緑色に変わりました。",
  ),
  q(
    5,
    "What is a fjord?|¿Qué es un fiordo?|Qu'est-ce qu'un fjord ?|フィヨルドとは?",
    [
      "A river delta in cold country|Un delta fluvial en tierras frías|Un delta de fleuve en pays froid|寒い土地の三角州",
      "A glacier-cut valley flooded by the sea|Un valle excavado por un glaciar e inundado por el mar|Une vallée creusée par un glacier et envahie par la mer|氷河が削った谷に海が入り込んだ地形",
      "A volcanic crater filled with water|Un cráter volcánico lleno de agua|Un cratère volcanique rempli d'eau|水をたたえた火口",
    ],
    1,
    "Norway's Sognefjord reaches 205 km inland and is over 1,300 m deep in places — deeper than the sea outside it.|El Sognefjord noruego penetra 205 km tierra adentro y supera los 1.300 m de profundidad en algunos tramos, más que el mar de fuera.|Le Sognefjord norvégien pénètre à 205 km dans les terres et dépasse 1 300 m de fond par endroits, plus creux que la mer au-dehors.|ノルウェーのソグネフィヨルドは内陸へ205km入り込み、深いところは1,300mを超えます。外の海より深いのです。",
  ),
  q(
    5,
    "Which desert is the driest place on earth?|¿Qué desierto es el lugar más seco de la Tierra?|Quel désert est l'endroit le plus sec du monde ?|地球でいちばん乾いた砂漠は?",
    [
      "The Gobi|El Gobi|Le Gobi|ゴビ砂漠",
      "The Kalahari|El Kalahari|Le Kalahari|カラハリ砂漠",
      "The Atacama|El Atacama|L'Atacama|アタカマ砂漠",
    ],
    2,
    "Some weather stations there have never recorded rain, and the sky is so clear that many of the world's largest telescopes are built above it.|Algunas estaciones meteorológicas no han registrado nunca lluvia, y el cielo es tan limpio que allí se han levantado muchos de los mayores telescopios del mundo.|Certaines stations météo n'y ont jamais enregistré de pluie, et le ciel est si pur qu'on y a bâti plusieurs des plus grands télescopes du monde.|一度も降雨を記録していない観測所があります。空が澄んでいるため、世界最大級の望遠鏡がいくつもこの上に建てられました。",
  ),
  q(
    5,
    "Which two countries share the world's longest land border?|¿Qué dos países comparten la frontera terrestre más larga del mundo?|Quels deux pays partagent la plus longue frontière terrestre du monde ?|世界でいちばん長い陸の国境を接している二国は?",
    [
      "Russia and China|Rusia y China|La Russie et la Chine|ロシアと中国",
      "Canada and the United States|Canadá y Estados Unidos|Le Canada et les États-Unis|カナダとアメリカ合衆国",
      "Argentina and Chile|Argentina y Chile|L'Argentine et le Chili|アルゼンチンとチリ",
    ],
    1,
    "It runs 8,891 km including Alaska, and for 2,030 km of that it is a straight line drawn along the 49th parallel.|Mide 8.891 km contando Alaska, y en 2.030 km de ese trazado es una línea recta sobre el paralelo 49.|Elle fait 8 891 km en comptant l'Alaska, et sur 2 030 km ce n'est qu'une ligne droite tracée le long du 49e parallèle.|アラスカを含めて8,891km。うち2,030kmは北緯49度線に沿って引かれた一直線です。",
  ),
  q(
    6,
    "Which country spans the most time zones?|¿Qué país abarca más husos horarios?|Quel pays s'étend sur le plus de fuseaux horaires ?|いちばん多くの時間帯にまたがる国は?",
    [
      "Russia|Rusia|La Russie|ロシア",
      "The United States|Estados Unidos|Les États-Unis|アメリカ合衆国",
      "France|Francia|La France|フランス",
    ],
    2,
    "Counting its overseas territories, France covers twelve zones; Russia has eleven, but all of them in one stretch of land.|Contando sus territorios de ultramar, Francia cubre doce husos; Rusia tiene once, pero todos en una sola masa de tierra.|En comptant ses territoires d'outre-mer, la France couvre douze fuseaux ; la Russie en a onze, mais d'un seul tenant.|海外領土を含めるとフランスは12の時間帯にわたります。ロシアは11ですが、こちらは地続きの一枚です。",
  ),
  q(
    6,
    "What is the Sahel?|¿Qué es el Sahel?|Qu'est-ce que le Sahel ?|サヘルとは?",
    [
      "The belt of dry grassland south of the Sahara|La franja de estepa seca al sur del Sahara|La bande de savane sèche au sud du Sahara|サハラの南に横たわる乾いた草原帯",
      "A range of mountains in Morocco|Una cordillera de Marruecos|Une chaîne de montagnes au Maroc|モロッコの山脈",
      "A seasonal wind off the Atlantic|Un viento estacional del Atlántico|Un vent saisonnier venu de l'Atlantique|大西洋から吹く季節風",
    ],
    0,
    "The word comes from the Arabic for shore, as though the desert beyond it were a sea; caravan towns like Timbuktu grew up along that shoreline.|La palabra viene del árabe «orilla», como si el desierto fuese un mar; en esa costa crecieron ciudades caravaneras como Tombuctú.|Le mot vient de l'arabe « rivage », comme si le désert au-delà était une mer ; c'est sur ce littoral que grandirent des villes caravanières comme Tombouctou.|語源はアラビア語の「岸」。その先の砂漠を海に見立てた言い方です。トンブクトゥのような隊商の町は、この岸辺に育ちました。",
  ),
  q(
    6,
    "Why does Reykjavík burn almost no fuel to heat its houses?|¿Por qué Reikiavik casi no quema combustible para calentarse?|Pourquoi Reykjavik ne brûle-t-elle presque rien pour se chauffer ?|レイキャヴィクが暖房にほとんど燃料を使わない理由は?",
    [
      "Its houses are heated by wind turbines|Sus casas se calientan con aerogeneradores|Ses maisons sont chauffées par des éoliennes|風力発電で暖めているから",
      "Hot water is pumped straight out of volcanic ground|Se bombea agua caliente directamente del suelo volcánico|On pompe l'eau brûlante directement dans le sol volcanique|火山の地中から熱い水を汲み上げているから",
      "The winters there are mild enough not to need it|Sus inviernos son lo bastante suaves|Ses hivers sont assez doux pour s'en passer|冬が暖かく暖房が要らないから",
    ],
    1,
    "The first pipe was laid in 1930 to heat a school; within a generation the coal smoke over the city had gone, and some pavements now melt their own snow.|La primera tubería se tendió en 1930 para calentar una escuela; en una generación desapareció el humo de carbón, y hoy algunas aceras derriten su propia nieve.|La première conduite fut posée en 1930 pour chauffer une école ; en une génération, la fumée de charbon avait disparu, et certains trottoirs font fondre leur propre neige.|1930年に学校を暖めるため最初の配管が引かれ、一世代のうちに石炭の煙は消えました。今では歩道の雪がひとりでに融ける場所もあります。",
  ),
  q(
    6,
    "What is the Ring of Fire?|¿Qué es el Cinturón de Fuego?|Qu'est-ce que la ceinture de feu ?|環太平洋火山帯とは?",
    [
      "A chain of hot springs across Iceland|Una cadena de fuentes termales en Islandia|Un chapelet de sources chaudes en Islande|アイスランドを横切る温泉の列",
      "A belt of volcanoes and earthquakes around the Pacific|Un cinturón de volcanes y terremotos en torno al Pacífico|Une ceinture de volcans et de séismes autour du Pacifique|太平洋をぐるりと囲む火山と地震の帯",
      "The line where the trade winds meet|La línea donde se encuentran los alisios|La ligne où se rencontrent les alizés|貿易風がぶつかる線",
    ],
    1,
    "About nine in ten of the world's earthquakes happen along it, and it holds roughly three quarters of the active volcanoes on land.|Cerca de nueve de cada diez terremotos del mundo ocurren en él, y reúne unas tres cuartas partes de los volcanes activos en tierra firme.|Environ neuf séismes sur dix dans le monde s'y produisent, et il réunit près des trois quarts des volcans actifs émergés.|世界の地震のおよそ9割がこの帯で起き、陸上の活火山のおよそ4分の3が集まっています。",
  ),
  q(
    6,
    "Which capital is sinking into the bed of a lake that was drained under it?|¿Qué capital se hunde en el lecho de un lago desecado bajo ella?|Quelle capitale s'enfonce dans le lit d'un lac asséché sous elle ?|干上げられた湖の底に沈んでいく首都は?",
    [
      "Mexico City|Ciudad de México|Mexico|メキシコシティ",
      "Lima|Lima|Lima|リマ",
      "Bogotá|Bogotá|Bogota|ボゴタ",
    ],
    0,
    "The Palace of Fine Arts has sunk so far that its ground floor is now a basement, and the cathedral has dropped several metres unevenly.|El Palacio de Bellas Artes se ha hundido tanto que su planta baja es hoy un sótano, y la catedral ha bajado varios metros de forma desigual.|Le palais des Beaux-Arts s'est tant enfoncé que son rez-de-chaussée est devenu un sous-sol, et la cathédrale a baissé de plusieurs mètres de façon inégale.|ベジャス・アルテス宮殿は一階がそのまま地下になり、大聖堂は不揃いに数メートル下がりました。",
  ),
  q(
    7,
    "Which sea has no coastline at all?|¿Qué mar no tiene costa alguna?|Quelle mer n'a aucune côte ?|海岸線をまったく持たない海は?",
    [
      "The Coral Sea|El mar del Coral|La mer de Corail|珊瑚海",
      "The Sargasso Sea|El mar de los Sargazos|La mer des Sargasses|サルガッソー海",
      "The Tasman Sea|El mar de Tasmania|La mer de Tasman|タスマン海",
    ],
    1,
    "It is bounded by four ocean currents rather than by land, and eels from both Europe and America swim thousands of kilometres to breed in it.|Lo delimitan cuatro corrientes oceánicas en vez de tierra, y las anguilas de Europa y de América nadan miles de kilómetros para desovar allí.|Elle est bornée par quatre courants océaniques et non par des terres, et les anguilles d'Europe comme d'Amérique y nagent des milliers de kilomètres pour se reproduire.|陸ではなく四つの海流に囲まれた海です。ヨーロッパとアメリカのウナギは、産卵のために何千kmも泳いでここへ来ます。",
  ),
  q(
    7,
    "What is a qanat, or khettara?|¿Qué es un qanat o jetara?|Qu'est-ce qu'un qanat, ou khettara ?|カナート(ハッターラ)とは?",
    [
      "A domed store for grain|Un granero abovedado|Un grenier à coupole|ドーム型の穀物倉",
      "A walled garden watered by rain|Un jardín amurallado regado por la lluvia|Un jardin clos arrosé par la pluie|雨水で潤す塀に囲まれた庭",
      "A hand-dug tunnel that brings water down from the hills|Un túnel excavado a mano que trae agua desde los montes|Une galerie creusée à la main qui amène l'eau des collines|山から水を引くために手で掘った地下水路",
    ],
    2,
    "A line of shafts along the surface let the diggers in and out; Marrakesh and Isfahan have been watered this way for eight hundred years and more.|Una hilera de pozos en la superficie permitía entrar y salir a los cavadores; Marrakech e Isfahán se riegan así desde hace más de ochocientos años.|Une file de puits en surface permettait aux creuseurs d'entrer et de sortir ; Marrakech et Ispahan sont arrosées ainsi depuis plus de huit cents ans.|地表に並ぶ竪坑は掘り手の出入り口です。マラケシュもイスファハンも、800年以上この方法で水を得てきました。",
  ),
  q(
    7,
    "What makes Timbuktu important to scholars?|¿Por qué es importante Tombuctú para los estudiosos?|Pourquoi Tombouctou compte-t-elle pour les savants ?|トンブクトゥが学者にとって重要な理由は?",
    [
      "Its families keep libraries of medieval manuscripts|Sus familias conservan bibliotecas de manuscritos medievales|Ses familles conservent des bibliothèques de manuscrits médiévaux|各家に中世の写本の蔵書が伝わっているから",
      "It has the oldest observatory in Africa|Tiene el observatorio más antiguo de África|Elle abrite le plus vieil observatoire d'Afrique|アフリカ最古の天文台があるから",
      "It was the first city in Africa with a printing press|Fue la primera ciudad africana con imprenta|Ce fut la première ville d'Afrique à posséder une imprimerie|アフリカで最初に印刷機が入った街だから",
    ],
    0,
    "In 2012, with armed groups in the city, some 350,000 manuscripts were smuggled downriver to Bamako in rice sacks and metal trunks.|En 2012, con grupos armados en la ciudad, unos 350.000 manuscritos salieron río abajo hacia Bamako en sacos de arroz y baúles de metal.|En 2012, des groupes armés occupant la ville, quelque 350 000 manuscrits furent évacués vers Bamako dans des sacs de riz et des malles de tôle.|2012年、武装勢力が街に入ると、およそ35万点の写本が米袋やブリキの行李に隠され、川を下ってバマコへ運び出されました。",
  ),
  q(
    7,
    "What is remarkable about the Trans-Siberian Railway?|¿Qué tiene de notable el Transiberiano?|Qu'a de remarquable le Transsibérien ?|シベリア鉄道の際立った点は?",
    [
      "It is entirely underground east of the Urals|Va enteramente bajo tierra al este de los Urales|Il est entièrement souterrain à l'est de l'Oural|ウラル以東は全線が地下にある",
      "It was the first railway to cross a desert|Fue el primer ferrocarril que cruzó un desierto|Ce fut le premier chemin de fer à traverser un désert|砂漠を横断した最初の鉄道である",
      "One train takes about a week and crosses eight time zones|Un tren tarda cerca de una semana y cruza ocho husos horarios|Un train met environ une semaine et traverse huit fuseaux horaires|一本の列車が約一週間かけ、八つの時間帯を越える",
    ],
    2,
    "It runs some 9,300 km from Moscow to the Pacific, and every station's clock along it used to be set to Moscow time.|Recorre unos 9.300 km de Moscú al Pacífico, y los relojes de todas sus estaciones marcaban la hora de Moscú.|Il file sur quelque 9 300 km de Moscou au Pacifique, et les horloges de toutes ses gares étaient réglées sur l'heure de Moscou.|モスクワから太平洋まで約9,300km。沿線の駅の時計は、かつてすべてモスクワ時間に合わせられていました。",
  ),
  q(
    8,
    "How long did the shortest war in recorded history last?|¿Cuánto duró la guerra más corta de la historia?|Combien de temps dura la plus courte guerre de l'histoire ?|記録に残る最短の戦争はどれくらい続いた?",
    [
      "About three days|Unos tres días|Environ trois jours|3日ほど",
      "About eight hours|Unas ocho horas|Environ huit heures|8時間ほど",
      "About thirty-eight minutes|Unos treinta y ocho minutos|Environ trente-huit minutes|38分ほど",
    ],
    2,
    "It was fought at Zanzibar on 27 August 1896, between a British squadron in the harbour and the sultan's palace guard.|Se libró en Zanzíbar el 27 de agosto de 1896, entre una escuadra británica fondeada en el puerto y la guardia del sultán.|Elle eut lieu à Zanzibar le 27 août 1896, entre une escadre britannique mouillée dans le port et la garde du sultan.|1896年8月27日、ザンジバルで、港にいた英国艦隊とスルタンの宮廷警備隊とのあいだで戦われました。",
  ),
  q(
    8,
    "Why was the warship Vasa still nearly whole after 333 years under water?|¿Por qué el buque Vasa seguía casi entero tras 333 años bajo el agua?|Pourquoi le vaisseau Vasa était-il presque intact après 333 ans sous l'eau ?|軍艦ヴァーサが333年沈んでいてもほぼ原形だった理由は?",
    [
      "The Baltic is too brackish for the shipworm that eats timber|El Báltico es demasiado dulce para el teredo que devora la madera|La Baltique est trop peu salée pour le taret qui dévore le bois|バルト海は塩分が薄く、木を食う海虫が住めないから",
      "The hull had been coated in tar before launching|El casco se había embreado antes de la botadura|La coque avait été enduite de goudron avant le lancement|進水前に船体を瀝青で覆っていたから",
      "It sank into mud that kept out the water|Se hundió en un fango que impidió el paso del agua|Il s'enfonça dans une vase qui tenait l'eau à l'écart|水を通さない泥に埋もれたから",
    ],
    0,
    "She capsized 1,300 m into her maiden voyage in 1628, was raised in 1961, and is the only nearly complete ship of her century anywhere.|Zozobró a 1.300 m de iniciar su viaje inaugural en 1628, se reflotó en 1961 y es el único barco de su siglo conservado casi entero.|Il chavira 1 300 m après le début de son voyage inaugural en 1628, fut renfloué en 1961, et reste le seul navire de son siècle conservé presque entier.|1628年、処女航海のわずか1,300m先で転覆し、1961年に引き揚げられました。17世紀の船でほぼ完全に残っているのは、世界でこの一隻だけです。",
  ),
  q(
    8,
    "What did Ulugh Beg build at Samarkand in the 1420s?|¿Qué construyó Ulug Beg en Samarcanda en los años 1420?|Que fit bâtir Ulugh Beg à Samarcande dans les années 1420 ?|1420年代、ウルグ・ベクがサマルカンドに造ったものは?",
    [
      "A canal to the Aral Sea|Un canal hasta el mar de Aral|Un canal jusqu'à la mer d'Aral|アラル海まで引いた運河",
      "A sextant about 40 metres in radius, sunk into a trench|Un sextante de unos 40 metros de radio hundido en una zanja|Un sextant d'environ 40 mètres de rayon, enfoui dans une tranchée|溝に据えた半径約40mの六分儀",
      "A library of a hundred thousand books|Una biblioteca de cien mil libros|Une bibliothèque de cent mille livres|十万冊の図書館",
    ],
    1,
    "With it he measured the length of the year to within 25 seconds of the modern value, and catalogued 1,018 stars.|Con él midió la duración del año con un error de 25 segundos respecto al valor actual, y catalogó 1.018 estrellas.|Il en tira la durée de l'année à 25 secondes près de la valeur actuelle, et catalogua 1 018 étoiles.|これで一年の長さを現在の値との差25秒まで測り、1,018個の星を記録しました。",
  ),
  q(
    8,
    "Which country's islands sit on both sides of the date line?|¿Qué país tiene islas a ambos lados de la línea de cambio de fecha?|Quel pays a des îles des deux côtés de la ligne de changement de date ?|日付変更線の両側に島を持つ国は?",
    [
      "Tonga|Tonga|Les Tonga|トンガ",
      "Fiji|Fiyi|Les Fidji|フィジー",
      "Kiribati|Kiribati|Les Kiribati|キリバス",
    ],
    2,
    "In 1995 Kiribati bent the line far to the east so the whole country would share one date, which handed its eastern islands the first sunrise of the year 2000.|En 1995 Kiribati desvió la línea muy al este para que todo el país tuviera la misma fecha, lo que dio a sus islas orientales el primer amanecer del año 2000.|En 1995, les Kiribati ont fait dévier la ligne loin vers l'est pour que tout le pays partage la même date, offrant à leurs îles orientales le premier lever de soleil de l'an 2000.|1995年、キリバスは国全体の日付をそろえるため線を大きく東へ曲げました。おかげで東の島々は2000年の最初の日の出を迎えることになりました。",
  ),
  q(
    9,
    "What do people in Lima call the donkey's belly?|¿A qué llaman panza de burro en Lima?|Qu'appelle-t-on à Lima le ventre d'âne ?|リマの人が「ロバの腹」と呼ぶものは?",
    [
      "The low grey cloud that covers the city for half the year|La nube baja y gris que cubre la ciudad medio año|Le plafond de nuages gris qui couvre la ville six mois par an|一年の半分、街を覆う低く垂れた灰色の雲",
      "A hill above the old town|Un cerro sobre el casco viejo|Une colline au-dessus de la vieille ville|旧市街を見下ろす丘",
      "A kind of bread sold at breakfast|Un pan que se vende al desayuno|Un pain vendu au petit-déjeuner|朝に売られるパンの一種",
    ],
    0,
    "Lima gets about seven millimetres of rain a year, less than almost any capital, and draws its water from three rivers off the Andes.|Lima recibe unos siete milímetros de lluvia al año, menos que casi cualquier capital, y toma su agua de tres ríos que bajan de los Andes.|Lima reçoit environ sept millimètres de pluie par an, moins que presque toutes les capitales, et prend son eau à trois rivières descendues des Andes.|リマの年間降水量は約7mm。世界の首都でも指折りの少なさで、水はアンデスから下る三本の川に頼っています。",
  ),
  q(
    9,
    "Why has the Aral Sea nearly disappeared?|¿Por qué ha desaparecido casi por completo el mar de Aral?|Pourquoi la mer d'Aral a-t-elle presque disparu ?|アラル海がほとんど消えてしまった理由は?",
    [
      "An earthquake opened a fissure in its bed|Un terremoto abrió una grieta en su lecho|Un séisme a ouvert une faille dans son fond|地震で湖底に裂け目ができたから",
      "The two rivers feeding it were diverted to irrigate cotton|Se desviaron los dos ríos que lo alimentaban para regar algodón|Les deux fleuves qui l'alimentaient ont été détournés pour irriguer le coton|注ぐ二本の川を綿花の灌漑に引いたから",
      "The climate there has always dried it out every few centuries|Su clima lo ha secado siempre cada pocos siglos|Son climat l'assèche depuis toujours tous les quelques siècles|数百年ごとに干上がる気候だから",
    ],
    1,
    "It was the fourth-largest lake in the world in 1960; fishing boats now stand on sand more than 100 km from the water.|En 1960 era el cuarto lago más grande del mundo; hoy hay barcos pesqueros varados en la arena a más de 100 km del agua.|C'était en 1960 le quatrième lac du monde ; des bateaux de pêche reposent aujourd'hui sur le sable à plus de 100 km de l'eau.|1960年には世界で4番目に大きな湖でした。いまでは漁船が、水から100km以上離れた砂の上に取り残されています。",
  ),
  q(
    9,
    "What is the Darién Gap?|¿Qué es el Tapón del Darién?|Qu'est-ce que le bouchon du Darién ?|ダリエン地峡(ダリエン・ギャップ)とは?",
    [
      "A strait joining two oceans|Un estrecho que une dos océanos|Un détroit reliant deux océans|二つの大洋をつなぐ海峡",
      "A canal begun and abandoned by the French|Un canal empezado y abandonado por los franceses|Un canal commencé puis abandonné par les Français|フランスが着工して放棄した運河",
      "The roadless jungle that breaks the highway between the Americas|La selva sin carreteras que corta la carretera entre las Américas|La jungle sans routes qui coupe la route entre les deux Amériques|南北アメリカを結ぶ道路が途切れる、道のない密林",
    ],
    2,
    "The Pan-American Highway runs some 30,000 km and simply stops on both sides of it; crossing the hundred kilometres on foot takes about a week.|La Carretera Panamericana recorre unos 30.000 km y sencillamente se detiene a ambos lados; cruzar sus cien kilómetros a pie lleva cerca de una semana.|La route panaméricaine parcourt quelque 30 000 km et s'arrête net de part et d'autre ; franchir ces cent kilomètres à pied demande environ une semaine.|パンアメリカン・ハイウェイは約3万kmに及びますが、この両側でぷつりと途切れます。100kmを歩いて越えるには一週間ほどかかります。",
  ),
  q(
    10,
    "What is the Wallace Line?|¿Qué es la línea de Wallace?|Qu'est-ce que la ligne Wallace ?|ウォレス線とは?",
    [
      "An invisible boundary between Asian and Australian wildlife|Un límite invisible entre la fauna asiática y la australiana|Une frontière invisible entre les faunes asiatique et australienne|アジアの生き物とオーストラリアの生き物を分ける見えない境",
      "The first undersea telegraph cable across the Pacific|El primer cable telegráfico submarino del Pacífico|Le premier câble télégraphique sous-marin du Pacifique|太平洋を渡った最初の海底電信線",
      "The route taken by the first ship to sail round the world|La ruta del primer barco que dio la vuelta al mundo|La route du premier navire à faire le tour du monde|世界を初めて一周した船の航路",
    ],
    0,
    "Wallace noticed in the 1850s that cockatoos and marsupials stop on one side and monkeys and tigers on the other, though the strait between is only about 35 km wide — it stayed open water even when the ice ages lowered the sea.|Wallace observó en 1850 que las cacatúas y los marsupiales se detienen a un lado y los monos y tigres al otro, aunque el estrecho mide sólo unos 35 km: siguió siendo mar abierto incluso cuando las glaciaciones bajaron el nivel.|Wallace remarqua vers 1850 que cacatoès et marsupiaux s'arrêtent d'un côté, singes et tigres de l'autre, alors que le détroit ne fait qu'environ 35 km : il resta en eau libre même quand les glaciations abaissèrent la mer.|1850年代、ウォレスは、オウムや有袋類が片側で止まり、猿や虎がもう片側で止まることに気づきました。あいだの海峡は幅わずか35kmほどですが、氷期に海面が下がっても水没しなかったのです。",
  ),
  q(
    10,
    "When did more than half the world's people first live in towns and cities?|¿Cuándo pasó por primera vez de la mitad la población mundial que vive en ciudades?|Quand plus de la moitié des humains ont-ils vécu pour la première fois en ville ?|世界の人口の半分より多くが町や都市に住むようになったのは、いつ頃か?",
    [
      "Around 1900|Hacia 1900|Vers 1900|1900年頃",
      "Around 2007|Hacia 2007|Vers 2007|2007年頃",
      "It has not happened yet|Todavía no ha ocurrido|Cela n'est pas encore arrivé|まだそうなっていない",
    ],
    1,
    "In 1800 perhaps one person in twenty lived in a town. The line was crossed in the first decade of this century, and almost all of the growth since has been in Asia and Africa — not in the largest cities but in ones of a few hundred thousand, which is where most new city dwellers actually arrive.|En 1800 quizá una de cada veinte personas vivía en una ciudad. El umbral se cruzó en la primera década de este siglo, y casi todo el crecimiento posterior ha sido en Asia y África, en ciudades de unos cientos de miles.|En 1800, une personne sur vingt peut-être vivait en ville. Le seuil fut franchi dans la première décennie de ce siècle, et presque toute la croissance depuis s'est faite en Asie et en Afrique, dans des villes de quelques centaines de milliers.|1800年には、町に住む人は二十人に一人ほどだったとみられる。境目を越えたのは今世紀の最初の十年で、それ以降の伸びはほとんどがアジアとアフリカである。しかも最大の都市ではなく、数十万人規模の町に、新しく都市に来る人の多くが実際には住み着いている。",
  ),
  q(
    10,
    "What limits how many ships can cross Panama in a dry year?|¿Qué limita el número de barcos que cruzan Panamá en un año seco?|Qu'est-ce qui limite le nombre de navires traversant le Panama en année sèche ?|乾いた年に、パナマを通れる船の数を決めるものは?",
    [
      "The number of tugs available|El número de remolcadores disponibles|Le nombre de remorqueurs disponibles|使える曳船の数",
      "The depth of the sea at each end|La profundidad del mar en cada extremo|La profondeur de la mer à chaque extrémité|両端の海の深さ",
      "The fresh water in the lake that lifts them|El agua dulce del lago que los eleva|L'eau douce du lac qui les soulève|船を持ち上げる湖の淡水",
    ],
    2,
    "Ships are raised 26 m above sea level to cross, and every transit lets about 200 million litres of lake water run out to sea, so a drought closes slots.|Los barcos suben 26 m sobre el nivel del mar para cruzar, y cada tránsito vierte unos 200 millones de litros del lago al océano; una sequía recorta los pasos.|Les navires sont élevés à 26 m au-dessus du niveau de la mer, et chaque passage laisse filer à la mer quelque 200 millions de litres du lac : une sécheresse réduit les créneaux.|船は海面から26m持ち上げられて運河を越えます。一隻通るたびに湖の水が約2億リットル海へ出るため、干ばつの年は通航枠が減らされます。",
  ),
];
