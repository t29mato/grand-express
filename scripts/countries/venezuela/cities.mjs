/**
 * ベネズエラの都市と路線(28都市)。
 *
 * 地方区分は6つ: `cap` 首都圏(カラカス・バルガス・ミランダ北部) /
 * `zu` スリア(マラカイボ湖) / `and` アンデス(メリダ・タチラ・トルヒージョ) /
 * `cen` 中西部・ラノス(ファルコン・ララ・カラボボ・バリナス) /
 * `gua` グアヤナ(ボリバル・アマソナス・デルタアマクロ) /
 * `ori` オリエンテ(アンソアテギ・スクレ・モナガス・ヌエバエスパルタ)。
 * cap4 / zu3 / and4 / cen5 / gua7 / ori5。
 *
 * 経度・緯度は実際の値。投影の範囲は geography.mjs の VENEZUELA_PROJ を参照。
 *
 * 旅客鉄道はほぼ無い国のため、路線(edges)の大半は道路網に沿った
 * 仮想の移動経路。**実在する鉄道として事実を書いたのはロス・テケス
 * (カラカス地下鉄の実在区間)だけ**で、他の都市の豆知識では鉄道を
 * 事実として語っていない。
 *
 * ## `mark`(19種)
 *
 * | キー | 描くもの | 受け持つ町 |
 * |---|---|---|
 * | `capital`   | 街並みとアビラ山 | カラカス |
 * | `port`      | 起重機と船 | ラグアイラ・プエルトカベージョ・プエルトラクルス・クマナ |
 * | `hilltown`  | 山とトンネル入口 | ロス・テケス |
 * | `cacao`     | カカオの実 | イグエロテ |
 * | `derrick`   | 油井やぐら | マラカイボ・カビマス |
 * | `lightning` | 水面と雷光 | サンタバルバラ・デル・スリア |
 * | `cablecar`  | ロープウェイの搬器 | メリダ |
 * | `coffee`    | コーヒーの枝 | サンクリストバル |
 * | `statue`    | 両腕を広げた聖母像 | トルヒージョ |
 * | `colonial`  | 土壁の家と瓦屋根 | ハヒ・コロ |
 * | `festival`  | 仮面と太鼓 | バルキシメト・エルカジャオ・カルパノ |
 * | `factory`   | 煙突と工場 | ヴァレンシア・シウダーグアヤナ・マトゥリン |
 * | `llanos`    | 牛とハープ | バリナス |
 * | `riverport` | 橋と川船 | シウダー・ボリバル |
 * | `waterfall` | 卓状山から落ちる滝 | カナイマ |
 * | `tepui`     | 卓状山 | サンタエレナ・デ・ウアイレン |
 * | `rapids`    | 岩と急流 | プエルトアヤクーチョ |
 * | `delta`     | 高床式の家 | トゥクピタ |
 * | `beachisland` | ヤシと真珠貝 | ポルラマル |
 *
 * ## `bg`(16種)
 *
 * `capital`(カラカス) / `port`(ラグアイラ・プエルトカベージョ・
 * プエルトラクルス・クマナ) / `hilltown`(ロス・テケス) /
 * `cacaoshore`(イグエロテ) / `oillake`(マラカイボ・カビマス・
 * サンタバルバラ・デル・スリア) / `andes`(メリダ・サンクリストバル・
 * トルヒージョ・ハヒ) / `dunes`(コロ) / `festival`(バルキシメト・
 * エルカジャオ・カルパノ) / `industrial`(ヴァレンシア・
 * シウダーグアヤナ・マトゥリン) / `llanos`(バリナス) / `orinoco`
 * (シウダー・ボリバル) / `waterfall`(カナイマ) / `tepui`
 * (サンタエレナ・デ・ウアイレン) / `rapids`(プエルトアヤクーチョ) /
 * `delta`(トゥクピタ) / `beachisland`(ポルラマル)
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const VENEZUELA_CITIES = {
  // ---------------------------------------------------------------------
  // cap — 首都圏
  // ---------------------------------------------------------------------
  caracas: city(
    "Caracas|Caracas|Caracas|カラカス",
    -66.9036, 10.4806, "cap", "capital", "capital", "r",
    "A capital that raised an orchestra out of a garage|Una capital que crió una orquesta en un garaje|Une capitale qui a fait naître un orchestre dans un garage|ガレージからオーケストラを育てた首都",
    "In 1975 the economist and musician José Antonio Abreu gathered eleven young players in a Caracas garage to start El Sistema, the free music-education program that has since taught several hundred thousand children and produced conductor Gustavo Dudamel. The city itself is squeezed into a narrow valley between the Caribbean and the forested wall of Mount Ávila, reachable from the coast only by cable car or a mountain tunnel.|En 1975 el economista y músico José Antonio Abreu reunió a once jóvenes músicos en un garaje de Caracas para fundar El Sistema, el programa gratuito de educación musical que desde entonces ha formado a varios cientos de miles de niños y dio al mundo al director Gustavo Dudamel. La propia ciudad se aprieta en un valle estrecho entre el Caribe y la muralla boscosa del monte Ávila, a la que solo se llega desde la costa en teleférico o por un túnel de montaña.|En 1975, l'économiste et musicien José Antonio Abreu réunit onze jeunes musiciens dans un garage de Caracas pour fonder El Sistema, le programme gratuit d'éducation musicale qui a depuis formé plusieurs centaines de milliers d'enfants et donné au monde le chef d'orchestre Gustavo Dudamel. La ville elle-même se serre dans une vallée étroite entre les Caraïbes et le mur boisé du mont Ávila, accessible depuis la côte seulement par téléphérique ou par un tunnel de montagne.|1975年、経済学者で音楽家のホセ・アントニオ・アブレウはカラカスのガレージに11人の若い演奏者を集め、無償の音楽教育プログラム「エル・システマ」を始めた。以来数十万人の子どもたちを育て、指揮者グスターボ・ドゥダメルを送り出した。街そのものはカリブ海とアビラ山の森の壁に挟まれた細い谷にあり、海側からはケーブルカーか山を貫くトンネルでしか行き来できない。",
    [prop("Ávila Cable Car Station|Estación del teleférico del Ávila|Station du téléphérique de l'Ávila|アビラ山ケーブルカー駅", 2800, 580),
     prop("El Sistema Rehearsal Hall|Sala de ensayos de El Sistema|Salle de répétition d'El Sistema|エル・システマ練習場", 1450, 300)],
  ),
  laguaira: city(
    "La Guaira|La Guaira|La Guaira|ラグアイラ",
    -66.9317, 10.6013, "cap", "port", "port", "r",
    "A port rebuilt on the only flat ground the coast allows|Un puerto reconstruido en el único terreno llano que permite la costa|Un port rebâti sur le seul terrain plat que permet la côte|海岸に残るわずかな平地に建て直された港",
    "In December 1999, days of rain triggered flash floods and landslides that swept much of this waterfront into the sea, killing an estimated tens of thousands along the coast in one of Venezuela's deadliest disasters. The airport and cruise port serving the capital were rebuilt on the same narrow shelf of land between the mountains and the Caribbean, because there is nowhere else on this coast to put them.|En diciembre de 1999, días de lluvia desencadenaron inundaciones repentinas y deslaves que arrastraron gran parte de este litoral al mar, matando a un estimado de decenas de miles de personas en la costa, uno de los desastres más mortíferos de Venezuela. El aeropuerto y el puerto de cruceros que sirven a la capital se reconstruyeron sobre la misma franja estrecha de tierra entre las montañas y el Caribe, porque en esta costa no hay otro lugar donde ponerlos.|En décembre 1999, des jours de pluie déclenchèrent des crues éclair et des glissements de terrain qui emportèrent une bonne partie de ce front de mer vers la mer, tuant environ des dizaines de milliers de personnes le long de la côte, l'une des catastrophes les plus meurtrières du Venezuela. L'aéroport et le port de croisière qui desservent la capitale furent rebâtis sur cette même étroite bande de terre entre les montagnes et les Caraïbes, faute d'un autre endroit sur cette côte où les mettre.|1999年12月、数日間続いた豪雨が鉄砲水と地滑りを引き起こし、この沿岸の街の多くを海へ押し流した。推定で数万人が命を落とし、ベネズエラ史上最悪級の災害となった。首都の玄関口となる空港とクルーズ港は、山とカリブ海に挟まれたこの細い土地の上に、震災前と同じ場所で再建された。この海岸には、ほかに置ける場所がないからである。",
    [prop("Cruise Terminal Quay|Muelle de la terminal de cruceros|Quai du terminal de croisière|クルーズ埠頭", 640, 132),
     prop("El Litoral Boardwalk House|Casa del paseo de El Litoral|Maison de la promenade d'El Litoral|エル・リトラル遊歩道の家", 340, 70)],
  ),
  losteques: city(
    "Los Teques|Los Teques|Los Teques|ロス・テケス",
    -67.0419, 10.3406, "cap", "hilltown", "hilltown", "l",
    "A subway that tunnels clean through a mountain|Un metro que atraviesa la montaña de un solo túnel|Un métro qui perce la montagne de part en part|山を貫くトンネルの地下鉄",
    "The Caracas Metro's line to this hilltop state capital opened in 2006 after boring nearly 15 kilometres of tunnel through the mountains south of the city, one of the few passenger rail lines that actually reaches somewhere in a country whose train network never grew much past the capital's subway. Coffee haciendas covered these cool highlands long before the tunnel; some still grow the beans they now sell to travelers who arrive straight from underground.|La línea del Metro de Caracas hasta esta capital de estado en lo alto de la sierra se inauguró en 2006 tras perforar casi 15 kilómetros de túnel bajo las montañas al sur de la capital, una de las pocas líneas de tren de pasajeros que realmente llega a alguna parte en un país cuya red ferroviaria nunca creció mucho más allá del metro capitalino. Haciendas cafetaleras cubrían estas tierras altas y frescas mucho antes del túnel; algunas siguen cultivando los granos que ahora venden a viajeros que llegan directamente desde el subsuelo.|La ligne du métro de Caracas menant à cette capitale d'État perchée en altitude ouvrit en 2006 après le percement de près de 15 kilomètres de tunnel sous les montagnes au sud de la capitale, l'une des rares lignes de train de voyageurs à mener réellement quelque part dans un pays dont le réseau ferré n'a jamais dépassé le métro de la capitale. Des haciendas caféières couvraient ces hauts plateaux frais bien avant le tunnel ; certaines cultivent encore les grains qu'elles vendent désormais à des voyageurs sortis tout droit du sous-sol.|カラカス地下鉄がこの山あいの州都まで延びたのは2006年、市の南の山々を貫く全長15キロ近いトンネルを掘り終えてからだった。鉄道網が首都の地下鉄以外ほとんど育たなかったこの国で、実際にどこかへたどり着く数少ない旅客路線である。このトンネルよりずっと前から、涼しい高地にはコーヒー農園が広がっていた。いまも豆を育てる農園があり、地下から直接やってきた旅行者に売っている。",
    [prop("Mountain Tunnel Platform|Andén del túnel de montaña|Quai du tunnel de montagne|山岳トンネルのホーム", 560, 116),
     prop("Highland Coffee Hacienda|Hacienda cafetalera de altura|Hacienda caféière d'altitude|高地のコーヒー農園", 320, 66)],
  ),
  higuerote: city(
    "Higuerote|Higuerote|Higuerote|イグエロテ",
    -66.1006, 10.4823, "cap", "cacao", "cacaoshore", "r",
    "A cacao coast that drums all night for a saint|Una costa de cacao que retumba de tambores toda la noche por un santo|Une côte à cacao qui tambourine toute la nuit pour un saint|聖人のために夜通し太鼓を鳴らすカカオの海岸",
    "The cacao grown along this stretch of the Barlovento coast is a criollo variety chocolate makers prize worldwide, cultivated on plantations first worked by enslaved Africans brought here in colonial times. Their descendants still open the feast of Saint John every June 24 with an all-night drumming tradition that treats the saint less as a solemn figure than as an honoured guest at the party.|El cacao que crece en este tramo de la costa de Barlovento es una variedad criolla apreciada por los chocolateros de todo el mundo, cultivada en plantaciones que en origen trabajaron africanos esclavizados traídos aquí en la época colonial. Sus descendientes aún abren la fiesta de San Juan cada 24 de junio con una tradición de tambores que dura toda la noche y trata al santo menos como figura solemne que como invitado de honor de la fiesta.|Le cacao cultivé sur ce tronçon de la côte de Barlovento est une variété criolla très prisée des chocolatiers du monde entier, cultivée sur des plantations d'abord travaillées par des Africains réduits en esclavage, amenés ici à l'époque coloniale. Leurs descendants ouvrent encore la fête de la Saint-Jean chaque 24 juin par une tradition de tambours qui dure toute la nuit et traite le saint moins comme une figure solennelle que comme un invité d'honneur de la fête.|このバルロベント海岸で育つカカオは、世界のチョコレート職人が珍重するクリオロ種で、植民地時代にここへ連れてこられた奴隷化されたアフリカ人が最初にこのプランテーションを耕した。その子孫たちはいまも毎年6月24日、聖ヨハネの祝日を一晩じゅう太鼓を打ち鳴らして開く。聖人を厳粛な存在としてではなく、祭りの主賓としてもてなす祝い方である。",
    [prop("Criollo Cacao Drying Yard|Patio de secado de cacao criollo|Cour de séchage du cacao criollo|クリオロ・カカオの乾燥場", 420, 86),
     prop("San Juan Drum Circle Plaza|Plaza de tambores de San Juan|Place des tambours de la Saint-Jean|サンフアン太鼓の広場", 240, 50)],
  ),

  // ---------------------------------------------------------------------
  // zu — スリア(マラカイボ湖)
  // ---------------------------------------------------------------------
  maracaibo: city(
    "Maracaibo|Maracaibo|Maracaibo|マラカイボ",
    -71.6406, 10.6666, "zu", "derrick", "oillake", "l",
    "A lake bridge built on the money it pumped out of the ground|Un puente sobre el lago pagado con lo que se bombeó del subsuelo|Un pont sur le lac payé avec ce qu'on a pompé du sous-sol|地下から汲み上げた金で架けた湖の橋",
    "The Barroso 2 well blew out across the lake at Cabimas in 1922, throwing oil more than 50 metres into the air for nine days before it could be capped, and the news made Venezuela the world's second-largest oil exporter almost overnight. The bridge that finally spanned the lake to the oil fields opened in 1962 and held the record for the world's longest concrete span for over a decade.|El pozo Barroso 2 reventó al otro lado del lago, en Cabimas, en 1922, y arrojó petróleo a más de 50 metros de altura durante nueve días antes de poder taponarlo; la noticia convirtió a Venezuela en el segundo mayor exportador de petróleo del mundo casi de la noche a la mañana. El puente que por fin cruzó el lago hasta los campos petroleros se inauguró en 1962 y durante más de una década ostentó el récord del tramo de hormigón más largo del mundo.|Le puits Barroso 2 explosa de l'autre côté du lac, à Cabimas, en 1922, projetant du pétrole à plus de 50 mètres de hauteur pendant neuf jours avant de pouvoir être colmaté ; la nouvelle fit du Venezuela le deuxième exportateur mondial de pétrole presque du jour au lendemain. Le pont qui finit par traverser le lac jusqu'aux champs pétroliers ouvrit en 1962 et détint pendant plus d'une décennie le record de la plus longue travée en béton au monde.|1922年、湖の対岸カビマスで油井バロッソ2号が噴出し、9日間にわたって石油を50メートル以上も噴き上げてから、ようやく抑えられた。この知らせでベネズエラはほぼ一夜にして世界第二位の石油輸出国になった。油田地帯へ湖を渡る橋がついに架かったのは1962年で、その後10年以上、コンクリート橋の最長支間として世界記録を保った。",
    [prop("Lake Bridge Toll House|Caseta de peaje del puente sobre el lago|Poste de péage du pont sur le lac|湖の橋の料金所", 1650, 342),
     prop("Cabimas Derrick Row|Hilera de torres de Cabimas|Rangée de derricks de Cabimas|カビマスの油井やぐら通り", 850, 176)],
  ),
  cabimas: city(
    "Cabimas|Cabimas|Cabimas|カビマス",
    -71.4306, 10.3910, "zu", "derrick", "oillake", "r",
    "A fishing hamlet that oil turned into a boomtown overnight|Una aldea de pescadores que el petróleo volvió boomtown de la noche a la mañana|Un hameau de pêcheurs que le pétrole a changé en ville champignon du jour au lendemain|石油が一夜でブームタウンに変えた漁村",
    "Cabimas grew from a fishing hamlet of a few hundred people into a town of tens of thousands within a decade of the nearby 1922 Barroso oil strike, and hundreds of pumpjacks still stand directly in the shallows of the lake just offshore, some idle for decades but never removed. The smell of crude is often the first thing visitors notice, carried onshore by the same breeze that once cooled fishing boats.|Cabimas pasó de ser una aldea de pescadores de unos cientos de habitantes a un pueblo de decenas de miles en la década posterior al cercano hallazgo petrolero de Barroso en 1922, y cientos de bombas de balancín siguen de pie justo en las aguas someras del lago frente a la costa, algunas paradas desde hace décadas pero nunca retiradas. El olor a crudo suele ser lo primero que notan los visitantes, arrastrado a tierra por la misma brisa que antes refrescaba las barcas de pesca.|Cabimas passa d'un hameau de pêcheurs de quelques centaines d'habitants à une ville de dizaines de milliers en une décennie, après la découverte pétrolière de Barroso toute proche en 1922, et des centaines de pompes à balancier se dressent encore directement dans les hauts-fonds du lac au large, certaines à l'arrêt depuis des décennies mais jamais retirées. L'odeur du brut est souvent la première chose que remarquent les visiteurs, portée jusqu'à terre par la même brise qui rafraîchissait autrefois les barques de pêcheurs.|カビマスは、1922年近郊のバロッソ油田発見からわずか10年で、数百人の漁村から数万人の町へと膨れ上がった。沖合の湖の浅瀬にはいまも何百基ものポンプジャッキが立ち並び、何十年も止まったまま撤去されずにいるものも多い。訪れた人がまず気づくのは原油の匂いで、かつて漁船を冷やしたのと同じ風に乗って岸まで運ばれてくる。",
    [prop("Shallow-Water Pumpjack Row|Hilera de bombas en aguas someras|Rangée de pompes en eaux peu profondes|浅瀬のポンプジャッキ列", 640, 132),
     prop("Boomtown Boarding House|Pensión de la ciudad del boom|Pension de la ville champignon|ブームタウンの下宿", 360, 74)],
  ),
  santabarbaradelzulia: city(
    "Santa Bárbara del Zulia|Santa Bárbara del Zulia|Santa Bárbara del Zulia|サンタバルバラ・デル・スリア",
    -71.9401, 8.9747, "zu", "lightning", "oillake", "b",
    "A town that sailors once steered by, without a lighthouse|Un pueblo por el que los marinos se guiaban sin necesitar un faro|Un village qui guidait jadis les marins sans le moindre phare|灯台なしで水夫が頼りにした町",
    "The Catatumbo lightning storms that gather where the river meets the lake flash almost every night of the year, sometimes dozens of times a minute, generating so much light that sailors once steered by it before radio navigation existed. A 2014 satellite study found this patch of sky produces more lightning per square kilometre than anywhere else on Earth.|Las tormentas del relámpago del Catatumbo, que se forman donde el río se encuentra con el lago, destellan casi todas las noches del año, a veces decenas de veces por minuto, con tanta luz que los marinos se guiaban por ellas antes de existir la radionavegación. Un estudio satelital de 2014 halló que este trozo de cielo produce más rayos por kilómetro cuadrado que ningún otro lugar de la Tierra.|Les orages du Catatumbo, qui se forment là où le fleuve rejoint le lac, éclairent presque chaque nuit de l'année, parfois des dizaines de fois par minute, avec une telle lumière que les marins s'en servaient jadis pour se repérer avant l'existence de la radionavigation. Une étude satellite de 2014 a montré que ce coin de ciel produit plus d'éclairs au kilomètre carré que nul autre endroit sur Terre.|川が湖に注ぐこの場所に発生するカタトゥンボの雷は一年のほぼ毎晩光り、多いときは1分に何十回も閃く。無線航法がなかった時代、水夫たちはこの光を頼りに舵を取った。2014年の衛星観測では、この一帯の空が地球上のどこよりも1平方キロメートルあたりの雷の発生数が多いことが分かった。",
    [prop("Lightning-Watch Pier|Muelle para ver el relámpago|Jetée d'observation de l'orage|雷見物の桟橋", 320, 66),
     prop("Catatumbo River Mouth Cabin|Cabaña de la desembocadura del Catatumbo|Cabane de l'embouchure du Catatumbo|カタトゥンボ川河口の小屋", 210, 44)],
  ),

  // ---------------------------------------------------------------------
  // and — アンデス
  // ---------------------------------------------------------------------
  merida: city(
    "Mérida|Mérida|Mérida|メリダ",
    -71.1447, 8.5933, "and", "cablecar", "andes", "l",
    "A cable car chasing a record it lost to fire|Un teleférico que persiguió un récord que el fuego le arrebató|Un téléphérique en quête d'un record que le feu lui a arraché|火事に奪われた記録を追うケーブルカー",
    "The cable car begun in 1958 climbs 3,452 metres in four stages to the Pico Espejo station, a rise that made it the world's highest and longest system for decades until a 2008 fire shut it down for eleven years of rebuilding. Down in the old town, a single ice cream shop opened in 1930 has kept adding flavours — garlic, trout, black bean — until the list passed 900 and a world record came with it.|El teleférico, iniciado en 1958, sube 3.452 metros en cuatro tramos hasta la estación Pico Espejo, una subida que lo hizo el sistema más alto y largo del mundo durante décadas, hasta que un incendio en 2008 lo cerró durante once años de reconstrucción. Abajo, en el casco antiguo, una heladería abierta en 1930 no ha dejado de sumar sabores —ajo, trucha, caraotas negras— hasta superar los 900 y ganarse un récord mundial.|Le téléphérique, entamé en 1958, grimpe de 3 452 mètres en quatre tronçons jusqu'à la station Pico Espejo, une ascension qui en fit pendant des décennies le système le plus haut et le plus long du monde, jusqu'à ce qu'un incendie en 2008 le ferme pour onze ans de reconstruction. En bas, dans la vieille ville, une glacerie ouverte en 1930 n'a cessé d'ajouter des parfums — ail, truite, haricots noirs — jusqu'à dépasser les 900 et décrocher un record du monde.|1958年に始まったこのケーブルカーは4区間で3,452メートルを登りピコ・エスペホ駅に至り、その高さと長さで数十年にわたり世界一だったが、2008年の火災で運休し、再建に11年を要した。麓の旧市街では、1930年開業のアイスクリーム店が、ニンニクやマス、黒豆味まで加え続け、900種を超えて世界記録を手にした。",
    [prop("Pico Espejo Cable Car Platform|Plataforma del teleférico de Pico Espejo|Plateforme du téléphérique du Pico Espejo|ピコ・エスペホ駅のプラットフォーム", 980, 202),
     prop("900-Flavor Ice Cream Parlor|Heladería de los 900 sabores|Glacier aux 900 parfums|900種のアイスクリーム店", 520, 108)],
  ),
  sancristobal: city(
    "San Cristóbal|San Cristóbal|San Cristóbal|サンクリストバル",
    -72.2250, 7.7669, "and", "coffee", "andes", "l",
    "The last sizeable city before the mountains cross into Colombia|La última ciudad grande antes de que la sierra cruce a Colombia|La dernière grande ville avant que la cordillère ne passe en Colombie|山脈がコロンビアへ越える前の最後の大きな町",
    "Táchira's coffee farms climb steep Andean slopes right up to the edge of the city, and every January the ten-day Feria Internacional de San Sebastián turns San Cristóbal into the country's biggest fairground, with bullfights, concerts and parades. Being the last sizeable city before the Colombian border has long made it a crossing point for trade that official statistics rarely capture in full.|Las fincas cafetaleras del Táchira trepan por laderas andinas empinadas hasta el mismo borde de la ciudad, y cada enero la Feria Internacional de San Sebastián, de diez días, convierte a San Cristóbal en el mayor recinto ferial del país, con corridas, conciertos y desfiles. Ser la última ciudad grande antes de la frontera colombiana la ha hecho, desde hace tiempo, un punto de paso para un comercio que las estadísticas oficiales rara vez capturan por completo.|Les caféières du Táchira grimpent sur des pentes andines abruptes jusqu'aux portes mêmes de la ville, et chaque janvier, la Feria Internacional de San Sebastián, longue de dix jours, fait de San Cristóbal le plus grand champ de foire du pays, avec corridas, concerts et défilés. Être la dernière ville de taille avant la frontière colombienne en a longtemps fait un point de passage pour un commerce que les statistiques officielles saisissent rarement en entier.|タチラ州のコーヒー農園は急なアンデスの斜面を市街のすぐ際まで這い上がっている。毎年1月、10日間続く国際サンセバスティアン祭りは、闘牛やコンサート、パレードでサンクリストバルを国内最大の祭りの町に変える。コロンビア国境の手前で最後にある大きな町であることから、公式統計にはなかなか捉えきれない交易の通り道にも長くなってきた。",
    [prop("San Sebastián Fairgrounds Gate|Portón del recinto ferial de San Sebastián|Porte du champ de foire de San Sebastián|サンセバスティアン祭り会場門", 740, 154),
     prop("Steep-Slope Coffee Farm|Finca cafetalera de ladera empinada|Caféière à flanc de pente raide|急斜面のコーヒー農園", 400, 82)],
  ),
  trujillo: city(
    "Trujillo|Trujillo|Trujillo|トルヒージョ",
    -70.4333, 9.3667, "and", "statue", "andes", "r",
    "A statue you can climb, in a state that once tried to soften a war|Una estatua a la que se puede subir, en un estado que una vez intentó suavizar una guerra|Une statue que l'on peut escalader, dans un État qui tenta jadis d'adoucir une guerre|戦争を和らげようとした州にある、登れる像",
    "The Monument to the Virgin of Peace overlooking the city rises 46.7 metres including its pedestal, and visitors can ride an elevator up through the statue's interior to viewing platforms built into her outstretched arms. It stands in a state that in 1820 hosted the signing of a treaty regulating the conduct of war between Bolívar's and Spain's armies, an early attempt to make war itself less brutal.|El Monumento a la Virgen de la Paz que domina la ciudad se eleva 46,7 metros con su pedestal, y los visitantes pueden subir en ascensor por el interior de la estatua hasta miradores construidos en sus brazos extendidos. Se alza en un estado que en 1820 acogió la firma de un tratado que regulaba la conducta de la guerra entre los ejércitos de Bolívar y de España, un intento temprano de hacer la guerra misma menos brutal.|Le Monument à la Vierge de la Paix qui domine la ville s'élève à 46,7 mètres avec son piédestal, et les visiteurs peuvent emprunter un ascenseur à travers l'intérieur de la statue jusqu'à des belvédères aménagés dans ses bras tendus. Il se dresse dans un État qui accueillit en 1820 la signature d'un traité réglant la conduite de la guerre entre les armées de Bolívar et d'Espagne, une tentative précoce de rendre la guerre elle-même moins brutale.|町を見下ろす「平和の聖母像」は台座を含め高さ46.7メートル。訪れた人は像の内部をエレベーターで上り、差し伸べた両腕に設けられた展望台まで行ける。この州は1820年、ボリバル軍とスペイン軍のあいだで戦争の作法を定める条約が結ばれた地でもある。戦争そのものを少しでも残酷でなくしようとした早い試みだった。",
    [prop("Virgin's Outstretched Arm Deck|Mirador en el brazo de la Virgen|Belvédère du bras de la Vierge|聖母像の腕の展望台", 500, 104),
     prop("Armistice Treaty House|Casa del tratado de armisticio|Maison du traité d'armistice|休戦条約の家", 280, 58)],
  ),
  jaji: city(
    "Jají|Jají|Jají|ハヒ",
    -71.3167, 8.6167, "and", "colonial", "andes", "b",
    "A village that decided, deliberately, to look old|Un pueblo que decidió, a propósito, parecer antiguo|Un village qui a choisi, délibérément, d'avoir l'air ancien|わざと古く見えるように選んだ村",
    "Jají's whitewashed walls and red tile roofs look centuries old but were largely rebuilt in a 1970s restoration project meant to preserve a vanishing style of Andean village architecture rather than any single historic structure. The result reads less like an accident of history than a village that chose to look like one.|Los muros encalados y los tejados rojos de Jají parecen tener siglos, pero en gran parte se reconstruyeron en un proyecto de restauración de los años setenta pensado para preservar un estilo de arquitectura andina en vías de desaparecer, más que ninguna estructura histórica concreta. El resultado se lee menos como un accidente de la historia que como un pueblo que eligió parecerlo.|Les murs blanchis à la chaux et les toits de tuiles rouges de Jají semblent vieux de plusieurs siècles, mais furent en grande partie rebâtis lors d'un projet de restauration des années 1970, destiné à préserver un style d'architecture andine en voie de disparition plutôt qu'une structure historique précise. Le résultat ressemble moins à un accident de l'histoire qu'à un village qui a choisi d'en avoir l'air.|ハヒの白壁と赤瓦の屋根は何百年も前からあるように見えるが、実際の多くは1970年代の修復事業で建て直されたものだ。目的は特定の史跡を守ることではなく、消えゆくアンデスの村の様式そのものを残すことだった。出来上がったのは歴史の偶然というより、あえて古く見えることを選んだ村である。",
    [prop("Whitewashed Village Chapel|Capilla del pueblo encalado|Chapelle du village blanchi à la chaux|白壁の村の礼拝堂", 300, 62),
     prop("Reconstructed Tile-Roof House|Casa de tejado reconstruida|Maison au toit reconstruit|再建された瓦屋根の家", 200, 42)],
  ),

  // ---------------------------------------------------------------------
  // cen — 中西部・ラノス
  // ---------------------------------------------------------------------
  coro: city(
    "Coro|Coro|Coro|コロ",
    -69.6817, 11.4045, "cen", "colonial", "dunes", "b",
    "Adobe walls that outlasted a flood, almost|Muros de barro que casi sobrevivieron a una inundación|Des murs de terre qui ont presque survécu à une inondation|洪水にほぼ耐えた土壁",
    "Founded in 1527, Coro became the first capital of the Province of Venezuela, and its earthen buildings mix Spanish, Dutch and Indigenous building methods closely enough that UNESCO listed the old town in 1993. Torrential rain in 2004 collapsed dozens of those centuries-old walls, and the site spent nine years afterward on the endangered heritage list while restoration caught up.|Fundada en 1527, Coro fue la primera capital de la Provincia de Venezuela, y sus edificios de barro mezclan técnicas españolas, holandesas e indígenas con tal cercanía que la UNESCO declaró el casco antiguo en 1993. Una lluvia torrencial en 2004 derribó decenas de esos muros centenarios, y el sitio pasó los nueve años siguientes en la lista de patrimonio en peligro mientras la restauración avanzaba.|Fondée en 1527, Coro fut la première capitale de la province du Venezuela, et ses bâtiments de terre mêlent des techniques espagnoles, néerlandaises et indigènes d'assez près pour que l'UNESCO classe la vieille ville en 1993. Une pluie torrentielle en 2004 fit s'effondrer des dizaines de ces murs centenaires, et le site passa les neuf années suivantes sur la liste du patrimoine en péril, le temps que la restauration rattrape son retard.|1527年に建てられたコロは、ベネズエラ州最初の州都となった。土壁の建物はスペイン・オランダ・先住民の建築技法を融合させており、その独自さゆえ1993年にユネスコの世界遺産に登録された。2004年の豪雨は数十棟もの数百年物の壁を崩し、その後9年間、修復が追いつくまで危機遺産リストに載り続けた。",
    [prop("Earthen Cathedral Square|Plaza de la catedral de barro|Place de la cathédrale de terre|土壁の大聖堂広場", 450, 94),
     prop("Dune-Edge Colonial House|Casa colonial al borde de las dunas|Maison coloniale en bordure des dunes|砂丘際の植民地時代の家", 260, 54)],
  ),
  barquisimeto: city(
    "Barquisimeto|Barquisimeto|Barquisimeto|バルキシメト",
    -69.3467, 10.0678, "cen", "festival", "festival", "r",
    "A million pilgrims walking to a hillside statue's cathedral|Un millón de peregrinos caminando hacia la catedral de una estatua en la colina|Un million de pèlerins marchant vers la cathédrale d'une statue de la colline|丘の聖像から大聖堂へ歩く百万人の巡礼者",
    "Every January 14, the image of the Divina Pastora is carried roughly 7 kilometres from a hillside sanctuary into the cathedral, and the procession draws over a million pilgrims on foot, more than the city's own population. Local musicians treat the walk as an unofficial audition ground for cuatro and mandolin players hoping to be noticed for the year's paid gigs.|Cada 14 de enero, la imagen de la Divina Pastora se traslada unos 7 kilómetros desde un santuario en la colina hasta la catedral, y la procesión reúne a más de un millón de peregrinos a pie, más que la población de la propia ciudad. Los músicos locales tratan el recorrido como un terreno de audición no oficial para cuatristas y mandolinistas que buscan hacerse notar para las contrataciones del año.|Chaque 14 janvier, l'image de la Divina Pastora est portée sur environ 7 kilomètres depuis un sanctuaire de colline jusqu'à la cathédrale, et la procession rassemble plus d'un million de pèlerins à pied, davantage que la population de la ville elle-même. Les musiciens locaux considèrent la marche comme un terrain d'audition officieux pour les joueurs de cuatro et de mandoline en quête d'être remarqués pour les engagements payés de l'année.|毎年1月14日、丘の聖域から大聖堂まで約7キロを「ディビナ・パストーラ(牧しの聖母)」の像が運ばれ、行列には市の人口を上回る百万人以上の巡礼者が徒歩で加わる。地元の音楽家たちは、この行進を、その年の有償の仕事を得たいクアトロやマンドリン奏者にとって非公式のオーディションの場だと見なしている。",
    [prop("Divina Pastora Procession Route|Ruta de la procesión de la Divina Pastora|Parcours de la procession de la Divina Pastora|ディビナ・パストーラ行進の道", 880, 182),
     prop("Cuatro Maker's Workshop|Taller de lutería de cuatro|Atelier de lutherie de cuatro|クアトロ工房", 470, 98)],
  ),
  valencia: city(
    "Valencia|Valencia|Valencia|ヴァレンシア",
    -68.0077, 10.1621, "cen", "factory", "industrial", "l",
    "A battlefield reenacted every June, a lake with no way out|Un campo de batalla reconstituido cada junio, un lago sin salida|Un champ de bataille rejoué chaque juin, un lac sans issue|毎年6月に再現される戦場、出口のない湖",
    "The Battle of Carabobo, fought on the plain just outside the city on 24 June 1821, effectively sealed Venezuelan independence from Spain and is re-enacted there every year in full uniform. Valencia grew into the country's industrial heart in the twentieth century, though the closed lake it is named for has no river outlet to flush what drains into it, and decades of runoff have left it steadily more polluted.|La Batalla de Carabobo, librada en la llanura a las afueras de la ciudad el 24 de junio de 1821, selló en la práctica la independencia de Venezuela de España, y se reconstituye allí cada año con uniformes de época. Valencia se convirtió en el corazón industrial del país en el siglo XX, aunque el lago cerrado que le da nombre no tiene salida fluvial para evacuar lo que drena hacia él, y décadas de vertidos lo han dejado cada vez más contaminado.|La bataille de Carabobo, livrée dans la plaine juste aux portes de la ville le 24 juin 1821, scella dans les faits l'indépendance du Venezuela vis-à-vis de l'Espagne, et y est rejouée chaque année en uniforme d'époque. Valencia devint au XXe siècle le cœur industriel du pays, bien que le lac fermé dont elle tire son nom n'ait aucun exutoire fluvial pour évacuer ce qui s'y déverse, et des décennies de ruissellement l'ont rendu toujours plus pollué.|1821年6月24日、市のすぐ外の平原で行われたカラボボの戦いは事実上ベネズエラのスペインからの独立を決定づけ、毎年当時の軍装で再現されている。ヴァレンシアは20世紀に国内屈指の工業都市へと成長したが、市の名の由来となった閉鎖湖には流れ出る川がなく、何十年もの排水の蓄積で汚染が着実に進んでいる。",
    [prop("Carabobo Battlefield Monument|Monumento del campo de Carabobo|Monument du champ de Carabobo|カラボボ戦場記念碑", 1450, 300),
     prop("Closed-Basin Lakefront Plant|Planta a orillas del lago cerrado|Usine au bord du lac fermé|閉鎖湖畔の工場", 760, 158)],
  ),
  puertocabello: city(
    "Puerto Cabello|Puerto Cabello|Puerto Cabello|プエルトカベージョ",
    -68.0122, 10.4750, "cen", "port", "port", "r",
    "A harbour deep enough for galleons, a fort built to guard it|Un puerto lo bastante hondo para galeones, un fuerte construido para custodiarlo|Un port assez profond pour des galions, un fort bâti pour le garder|ガレオン船が入れる深さの港と、それを守る要塞",
    "The natural harbour here is deep enough that Spanish galleons once anchored directly against the quay without lightering cargo by smaller boats, which is why the crown built the star-shaped Fort San Felipe across the bay to guard it from pirates and rival navies. The fortress later served as a political prison under several governments, a second career almost as long as its first.|El puerto natural es tan profundo que los galeones españoles llegaban a atracar directamente en el muelle sin trasbordar la carga a embarcaciones menores, por lo que la corona construyó el fuerte estrellado de San Felipe al otro lado de la bahía para protegerlo de piratas y armadas rivales. La fortaleza sirvió más tarde como prisión política bajo varios gobiernos, una segunda vida casi tan larga como la primera.|Le port naturel y est assez profond pour que les galions espagnols aient pu accoster directement au quai sans transborder leur cargaison sur des embarcations plus petites, ce qui poussa la couronne à bâtir le fort en étoile de San Felipe de l'autre côté de la baie pour le protéger des pirates et des flottes rivales. La forteresse servit plus tard de prison politique sous plusieurs gouvernements, une seconde carrière presque aussi longue que la première.|この天然の良港はスペインのガレオン船が小舟に荷を積み替えずに直接埠頭へ横付けできるほど水深があり、そのため王室は湾の対岸に星形要塞サンフェリペを築いて海賊や敵国艦隊から守らせた。この要塞はのちに複数の政権のもとで政治犯収容所としても使われ、その「第二の役目」は最初の役目とほぼ同じ長さ続いた。",
    [prop("Star Fort Sea Wall|Muralla marina del fuerte estrellado|Rempart maritime du fort en étoile|星形要塞の海側城壁", 780, 162),
     prop("Deepwater Quay Warehouse|Almacén del muelle de aguas profundas|Entrepôt du quai en eaux profondes|深水埠頭の倉庫", 420, 86)],
  ),
  barinas: city(
    "Barinas|Barinas|Barinas|バリナス",
    -70.2075, 8.6226, "cen", "llanos", "llanos", "l",
    "Where cattle and pump jacks share the same fence line|Donde el ganado y las bombas de balancín comparten la misma cerca|Là où le bétail et les pompes à balancier partagent la même clôture|牛とポンプジャッキが同じ柵を分け合う土地",
    "Barinas state raises more cattle than any other in Venezuela, and the joropo llanero style born on these plains — built around the harp, the cuatro and a fast-heeled dance called zapateo — is often taught first in schools far from here, as the country's default folk music. Oil drilling later spread across the same ranchland, so pump jacks and grazing cattle now regularly share the same fenced paddock.|El estado de Barinas cría más ganado que ningún otro en Venezuela, y el estilo del joropo llanero nacido en estos llanos —construido en torno al arpa, el cuatro y un baile de taconeo rápido llamado zapateo— suele ser el primero que se enseña en escuelas muy lejos de aquí, como la música folclórica por defecto del país. La perforación petrolera se extendió después por los mismos potreros, de modo que hoy bombas de balancín y ganado pastando suelen compartir el mismo corral.|L'État de Barinas élève plus de bétail qu'aucun autre au Venezuela, et le style du joropo llanero né sur ces plaines — bâti autour de la harpe, du cuatro et d'une danse au talon rapide appelée zapateo — est souvent le premier enseigné dans des écoles bien loin d'ici, comme la musique folklorique par défaut du pays. Le forage pétrolier s'est ensuite étendu sur ces mêmes pâturages, si bien que pompes à balancier et bétail au pré partagent désormais souvent le même enclos.|バリナス州はベネズエラで最も多くの牛を飼育する州で、この平原で生まれたリャネロ風ホローポ――ハープとクアトロ、そして踵を鳴らす速い足踏み「サパテオ」を軸にした音楽――は、この地からずっと離れた学校でも最初に教わる、いわば国の代表的な民族音楽になっている。のちに石油掘削が同じ牧場地帯に広がり、いまではポンプジャッキと放牧の牛が同じ柵の中で肩を並べることも珍しくない。",
    [prop("Llanera Harp Workshop|Taller del arpa llanera|Atelier de la harpe llanera|リャネラ・ハープ工房", 480, 100),
     prop("Cattle Ranch Pump Jack Field|Potrero con bombas de balancín|Pâturage aux pompes à balancier|牛牧場のポンプジャッキ地帯", 260, 54)],
  ),

  // ---------------------------------------------------------------------
  // gua — グアヤナ
  // ---------------------------------------------------------------------
  ciudadbolivar: city(
    "Ciudad Bolívar|Ciudad Bolívar|Ciudad Bolívar|シウダー・ボリバル",
    -63.5497, 8.1222, "gua", "riverport", "orinoco", "r",
    "Where the river narrows enough to found a country|Donde el río se estrecha lo bastante para fundar un país|Là où le fleuve se resserre assez pour fonder un pays|国を建てるほど川が狭まる場所",
    "The city's old name, Angostura, means \"narrows\" — the Orinoco pinches to under a kilometre here, which is why Simón Bolívar called the congress that founded Gran Colombia to this exact spot in 1819. The bitters mixed for river-worn troops in the 1820s still carry the old name on the label, though the company that makes them moved to Trinidad generations ago.|El nombre antiguo de la ciudad, Angostura, significa eso mismo: aquí el Orinoco se estrecha a menos de un kilómetro, y por eso Simón Bolívar convocó en este punto exacto el congreso que fundó la Gran Colombia en 1819. El amargo mezclado para las tropas maltrechas por el río en la década de 1820 aún lleva el nombre antiguo en la etiqueta, aunque la empresa que lo fabrica se mudó a Trinidad hace generaciones.|L'ancien nom de la ville, Angostura, signifie « étroit » — l'Orénoque s'y resserre à moins d'un kilomètre, et c'est pourquoi Simón Bolívar convoqua à cet endroit précis, en 1819, le congrès qui fonda la Grande Colombie. L'amer préparé pour les troupes éreintées par le fleuve dans les années 1820 porte encore ce vieux nom sur l'étiquette, bien que l'entreprise qui le fabrique se soit installée à Trinité depuis des générations.|この町の旧名アンゴストゥーラは「狭まり」を意味する。オリノコ川がここで幅1キロメートルを切るまで狭まるため、シモン・ボリバルは1819年、まさにこの地でグラン・コロンビアを建国する会議を開いた。1820年代に川旅で疲れた兵のために調合された苦味酒は、いまもラベルにこの旧名を掲げているが、製造元は何世代も前にトリニダードへ移った。",
    [prop("Angostura Narrows Overlook|Mirador del angostamiento|Belvédère de l'étranglement|川の狭まりの展望台", 540, 112),
     prop("Bitters Distillery Corner|Rincón de la destilería de amargos|Coin de la distillerie d'amers|苦味酒蒸留所の角", 300, 62)],
  ),
  ciudadguayana: city(
    "Ciudad Guayana|Ciudad Guayana|Ciudad Guayana|シウダー・グアヤナ",
    -62.6417, 8.3533, "gua", "factory", "industrial", "r",
    "A planned city built to run on two rivers of different colours|Una ciudad planificada para funcionar con dos ríos de colores distintos|Une ville planifiée pour fonctionner grâce à deux fleuves de couleurs différentes|色の違う二つの川で動く計画都市",
    "Ciudad Guayana was founded in 1961 by merging the old river town of San Félix with a brand-new planned city, built to run the steel and aluminium plants fed by iron ore from the nearby Sierra de Imataca and hydropower from the Caroní. The Caroní runs almost black with tannins from the forest it drains, so where it meets the sediment-heavy, café-au-lait Orinoco at the edge of the city, the two rivers flow side by side in visibly different colours before finally mixing.|Ciudad Guayana se fundó en 1961 al fusionar el antiguo pueblo ribereño de San Félix con una ciudad planificada enteramente nueva, construida para hacer funcionar las plantas de acero y aluminio alimentadas con mineral de hierro de la cercana Sierra de Imataca y energía hidroeléctrica del Caroní. El Caroní corre casi negro por los taninos del bosque que drena, de modo que donde se encuentra con el Orinoco, cargado de sedimentos y color café con leche, en el borde de la ciudad, ambos ríos fluyen lado a lado en colores visiblemente distintos antes de mezclarse por fin.|Ciudad Guayana fut fondée en 1961 en fusionnant l'ancienne bourgade fluviale de San Félix avec une ville entièrement planifiée, bâtie pour faire tourner les usines d'acier et d'aluminium alimentées en minerai de fer de la Sierra de Imataca voisine et en hydroélectricité du Caroní. Le Caroní coule presque noir, chargé des tanins de la forêt qu'il draine, si bien qu'à sa rencontre avec l'Orénoque couleur café au lait et lourd de sédiments, en bordure de la ville, les deux fleuves coulent côte à côte en couleurs nettement distinctes avant de finalement se mélanger.|シウダー・グアヤナは1961年、川沿いの古い町サン・フェリックスとまったく新しい計画都市を合併して生まれた。近くのイマタカ山地の鉄鉱石とカロニ川の水力発電でまかなう製鉄・アルミ工場を動かすために建てられた町である。カロニ川は流域の森のタンニンでほとんど黒く見え、市の外れで泥色のオリノコ川と合流する場所では、二つの川がしばらく別々の色のまま並んで流れたのち、ようやく混ざり合う。",
    [prop("Iron Ore Rail Terminal|Terminal ferroviaria del mineral de hierro|Terminal ferroviaire du minerai de fer|鉄鉱石の貨物ターミナル", 1520, 314),
     prop("Two-Rivers Confluence Overlook|Mirador de la confluencia de los dos ríos|Belvédère du confluent des deux fleuves|二つの川の合流点展望台", 800, 166)],
  ),
  canaima: city(
    "Canaima|Canaima|Canaima|カナイマ",
    -62.8500, 6.2333, "gua", "waterfall", "waterfall", "l",
    "A waterfall named for a pilot who crashed on top of it|Una catarata que lleva el nombre de un piloto que se estrelló encima de ella|Une chute nommée d'après un pilote qui s'écrasa à son sommet|その頂に不時着した操縦士の名を持つ滝",
    "The waterfall that draws visitors here drops 979 metres from the flat top of Auyantepui, and though other outside pilots had spotted it before, it took the 1937 crash-landing of aviator Jimmie Angel's plane on the tepui's summit — and his week-long trek back down — to fix his name to it internationally. The Pemón, who have always called it Kerepakupai Vená, still guide most of the boat trips upriver to see it, since the falls remain reachable only by canoe and on foot.|La catarata que atrae a los visitantes cae 979 metros desde la cima plana del Auyantepui, y aunque otros pilotos extranjeros ya la habían avistado antes, fue el aterrizaje forzoso del aviador Jimmie Angel sobre la cumbre del tepuy en 1937 —y su descenso a pie de una semana— lo que fijó internacionalmente su nombre a la caída. Los pemón, que siempre la llamaron Kerepakupai Vená, siguen guiando la mayoría de las excursiones en bote río arriba para verla, pues las cataratas solo se alcanzan en canoa y a pie.|La chute qui attire les visiteurs ici tombe de 979 mètres depuis le sommet plat de l'Auyantepui, et bien que d'autres pilotes étrangers l'aient repérée auparavant, c'est l'atterrissage forcé de l'aviateur Jimmie Angel sur le sommet du tepui en 1937 — et sa descente à pied d'une semaine — qui attacha son nom à la chute à l'échelle internationale. Les Pemóns, qui l'ont toujours appelée Kerepakupai Vená, guident encore la plupart des excursions en bateau en amont pour la voir, les chutes ne restant accessibles qu'en canoë et à pied.|訪れる人を引き寄せる滝は、平らな頂を持つアウヤン・テプイから979メートルを落ちる。以前から外部の操縦士に目撃されてはいたが、1937年に飛行家ジミー・エンジェルがその頂上に不時着し、一週間かけて歩いて下山したことで、この滝に彼の名が国際的に定着した。もとからここを「ケレパクパイ・ベナ」と呼んできたペモン族は、いまも大半のボート観光を案内している。この滝はカヌーと徒歩でしかたどり着けないからである。",
    [prop("Tepui-Top Landing Site|Sitio de aterrizaje en la cima del tepuy|Site d'atterrissage au sommet du tepui|テプイ頂上の不時着地", 660, 136),
     prop("Pemón Canoe Launch|Embarcadero de canoas pemón|Embarcadère des canoës pemóns|ペモン族のカヌー乗り場", 360, 74)],
  ),
  santaelenadeuairen: city(
    "Santa Elena de Uairén|Santa Elena de Uairén|Santa Elena de Uairén|サンタエレナ・デ・ウアイレン",
    -61.1167, 4.6000, "gua", "tepui", "tepui", "b",
    "A tabletop mountain that helped inspire a lost world|Una montaña de mesa que ayudó a inspirar un mundo perdido|Une montagne-table qui inspira en partie un monde perdu|失われた世界の着想源になった卓状山",
    "Mount Roraima's sheer cliffs rise so abruptly from the savanna around this border town that early European accounts of a tabletop world sealed off from time helped inspire Arthur Conan Doyle's 1912 novel The Lost World, and the multi-day trek to its summit is one of the few ways in South America to sleep on a mountain made of quartzite laid down before complex life existed. The town itself, founded by Capuchin missionaries in 1931, sits closer to a Brazilian state capital than to any Venezuelan city of comparable size.|Los acantilados verticales del monte Roraima se alzan tan de repente sobre la sabana que rodea a este pueblo fronterizo que los primeros relatos europeos de un mundo de mesa aislado del tiempo ayudaron a inspirar la novela El mundo perdido de Arthur Conan Doyle, de 1912, y la caminata de varios días hasta su cima es una de las pocas formas en Sudamérica de dormir sobre una montaña de cuarcita depositada antes de que existiera la vida compleja. El pueblo, fundado por misioneros capuchinos en 1931, queda más cerca de una capital de estado brasileña que de cualquier ciudad venezolana de tamaño comparable.|Les falaises abruptes du mont Roraima s'élèvent si brutalement au-dessus de la savane qui entoure ce village frontalier que les premiers récits européens d'un monde-table coupé du temps contribuèrent à inspirer le roman Le Monde perdu d'Arthur Conan Doyle en 1912, et la randonnée de plusieurs jours jusqu'à son sommet est l'une des rares façons, en Amérique du Sud, de dormir sur une montagne de quartzite déposée avant l'apparition de la vie complexe. Le village, fondé par des missionnaires capucins en 1931, se trouve plus près d'une capitale d'État brésilienne que d'aucune ville vénézuélienne de taille comparable.|この国境の町を囲むサバンナから、ロライマ山の切り立った崖はあまりに唐突にそそり立つ。時から切り離された卓状の世界という初期のヨーロッパ人の記述は、アーサー・コナン・ドイルの1912年の小説『失われた世界』の着想の一部になったとされる。頂上までの数日がかりの登山は、南米で数少ない、複雑な生命が生まれるより前に堆積した石英岩の山の上で眠る体験である。1931年にカプチン会宣教師が開いたこの町自体、同規模のベネズエラのどの都市よりもブラジルの州都に近い。",
    [prop("Roraima Summit Trailhead|Inicio del sendero a la cumbre del Roraima|Départ du sentier vers le sommet du Roraima|ロライマ登頂口", 540, 112),
     prop("Border Mission Guesthouse|Casa de huéspedes de la misión fronteriza|Maison d'hôtes de la mission frontalière|国境の伝道所の宿", 300, 62)],
  ),
  puertoayacucho: city(
    "Puerto Ayacucho|Puerto Ayacucho|Puerto Ayacucho|プエルトアヤクーチョ",
    -67.6236, 5.6639, "gua", "rapids", "rapids", "l",
    "The last calm water before a river turns violent|El último tramo de agua tranquila antes de que el río se vuelva violento|La dernière eau calme avant que le fleuve ne devienne violent|川が荒れ狂う手前の最後の静水",
    "Just south of the city, the Atures rapids drop the Orinoco through a maze of black rock too violent to navigate, which for centuries forced traders to portage goods overland around them — the reason Puerto Ayacucho exists at all, at the last calm water before the river becomes impassable. A boulder just outside town called Piedra Pintada carries petroglyphs whose carvers left no other written record of themselves.|Justo al sur de la ciudad, los raudales de Atures hacen descender al Orinoco por un laberinto de roca negra demasiado violento para navegar, lo que durante siglos obligó a los comerciantes a portear la carga por tierra para rodearlo —la razón misma de que exista Puerto Ayacucho, en el último tramo de agua tranquila antes de que el río se vuelva infranqueable—. Una roca a las afueras del pueblo llamada Piedra Pintada conserva petroglifos cuyos autores no dejaron ningún otro registro escrito de sí mismos.|Juste au sud de la ville, les rapides d'Atures font dévaler l'Orénoque à travers un labyrinthe de roche noire trop violent pour être navigué, ce qui obligea pendant des siècles les marchands à porter leurs marchandises par voie de terre pour les contourner — la raison même de l'existence de Puerto Ayacucho, à la dernière eau calme avant que le fleuve ne devienne infranchissable. Un rocher juste à la sortie du village, appelé Piedra Pintada, porte des pétroglyphes dont les auteurs n'ont laissé aucune autre trace écrite d'eux-mêmes.|町のすぐ南で、アトゥレスの急流はオリノコ川を黒い岩の迷路へと落とし込み、荒れすぎて航行できない。何世紀ものあいだ商人たちはこの区間を陸路で迂回して荷を運ぶほかなく、それこそがプエルト・アヤクーチョがこの場所――川が越えられなくなる直前の最後の静水――に存在する理由である。町外れの「ピエドラ・ピンタダ」と呼ばれる岩には彫り込んだ人々が他に文字の記録を残さなかった線刻画が刻まれている。",
    [prop("Atures Rapids Portage Trail|Camino de porteo de los raudales de Atures|Sentier de portage des rapides d'Atures|アトゥレス急流の陸路", 360, 74),
     prop("Petroglyph Boulder Overlook|Mirador de la roca de petroglifos|Belvédère du rocher aux pétroglyphes|線刻画の岩の展望所", 220, 46)],
  ),
  tucupita: city(
    "Tucupita|Tucupita|Tucupita|トゥクピタ",
    -62.0500, 9.0667, "gua", "delta", "delta", "r",
    "Houses on stilts, in a country better known for roads|Casas sobre pilotes, en un país más conocido por sus carreteras|Des maisons sur pilotis, dans un pays plutôt connu pour ses routes|道より川で知られる国の、高床式の家々",
    "The Warao, whose name is often translated as \"the boat people,\" have built houses on stilts above the delta's tidal channels for centuries, since the maze of waterways here has always made a canoe more useful than a road that would sink into the mud anyway. Almost every part of the moriche palm growing throughout the delta gets used by them — the pith for flour, the sap for a fermented drink, the fibre for hammocks and rope.|Los warao, cuyo nombre suele traducirse como \"la gente de las canoas\", llevan siglos construyendo casas sobre pilotes encima de los canales de marea del delta, ya que el laberinto de vías de agua siempre ha hecho más útil una canoa que una carretera que de todos modos se hundiría en el barro. Casi todas las partes de la palma moriche que crece por todo el delta las aprovechan: la médula para harina, la savia para una bebida fermentada, la fibra para hamacas y cuerdas.|Les Warao, dont le nom se traduit souvent par « le peuple des canoës », bâtissent depuis des siècles des maisons sur pilotis au-dessus des chenaux de marée du delta, le dédale de voies d'eau y ayant toujours rendu un canoë plus utile qu'une route qui s'enfoncerait de toute façon dans la boue. Presque chaque partie du palmier moriche qui pousse dans tout le delta leur sert — la moelle pour la farine, la sève pour une boisson fermentée, la fibre pour les hamacs et les cordes.|ワラオ族――その名は「カヌーの民」と訳されることが多い――は何世紀ものあいだ、デルタの潮の満ち引く水路の上に高床式の家を建ててきた。この入り組んだ水路網では、どのみち泥に沈む道より、カヌーのほうがずっと役に立ったからである。デルタ一帯に茂るモリチェヤシは、ほぼ余すところなく使われる。髄は粉に、樹液は発酵飲料に、繊維はハンモックや縄になる。",
    [prop("Stilt-House Waterway Landing|Embarcadero junto a las casas de pilotes|Débarcadère du chenal aux maisons sur pilotis|高床式家屋の水路の船着場", 300, 62),
     prop("Moriche Palm Fibre Workshop|Taller de fibra de palma moriche|Atelier de fibre de palmier moriche|モリチェヤシ繊維の工房", 200, 42)],
  ),
  elcallao: city(
    "El Callao|El Callao|El Callao|エルカジャオ",
    -61.8167, 7.4167, "gua", "festival", "festival", "r",
    "A gold-rush carnival sung half in patois, half in Spanish|Un carnaval de fiebre del oro cantado mitad en patois, mitad en español|Un carnaval né de la ruée vers l'or, chanté moitié en patois, moitié en espagnol|パトワとスペイン語を半分ずつ歌う金鉱の祭り",
    "Gold mining brought immigrants from Trinidad, Grenada and other Caribbean islands to this mining town in the nineteenth century, and the calypso music and carnival costumes they brought with them fused with Spanish tradition into a carnival unlike anywhere else in the country. UNESCO added El Callao's carnival to its list of intangible cultural heritage in 2016, citing the way parade songs are still sung half in English-based patois and half in Spanish.|La minería de oro trajo a este pueblo minero inmigrantes de Trinidad, Granada y otras islas caribeñas en el siglo XIX, y la música calipso y los trajes de carnaval que trajeron consigo se fundieron con la tradición española en un carnaval sin igual en el resto del país. La UNESCO añadió el carnaval de El Callao a su lista de patrimonio cultural inmaterial en 2016, citando cómo las canciones del desfile todavía se cantan mitad en un patois de base inglesa y mitad en español.|L'exploitation de l'or attira au XIXe siècle dans cette ville minière des immigrants de Trinité, de Grenade et d'autres îles caribéennes, et la musique calypso et les costumes de carnaval qu'ils apportèrent avec eux se fondirent à la tradition espagnole en un carnaval sans équivalent ailleurs dans le pays. L'UNESCO a inscrit le carnaval d'El Callao sur sa liste du patrimoine culturel immatériel en 2016, soulignant que les chants du défilé se chantent encore moitié en patois à base anglaise, moitié en espagnol.|19世紀、金鉱がトリニダードやグレナダなど各カリブ海の島々から移民をこの鉱山町へ引き寄せた。彼らが持ち込んだカリプソ音楽とカーニバルの衣装はスペインの伝統と混じり合い、国内のどこにもない独自のカーニバルを生んだ。ユネスコは2016年、エル・カジャオのカーニバルを無形文化遺産に加え、パレードの歌がいまも英語系パトワとスペイン語を半分ずつ用いて歌われる点を評価した。",
    [prop("Calypso Carnival Parade Street|Calle del desfile de carnaval calipso|Rue du défilé du carnaval calypso|カリプソ・カーニバルの通り", 340, 70),
     prop("Old Gold Mine Shaft House|Casa del pozo de la vieja mina de oro|Maison du puits de l'ancienne mine d'or|旧金鉱坑の建物", 220, 46)],
  ),

  // ---------------------------------------------------------------------
  // ori — オリエンテ
  // ---------------------------------------------------------------------
  puertolacruz: city(
    "Puerto La Cruz|Puerto La Cruz|Puerto La Cruz|プエルトラクルス",
    -64.6167, 10.2167, "ori", "port", "port", "l",
    "A marina that shares its horizon with oil tankers|Una marina que comparte el horizonte con petroleros|Une marina qui partage son horizon avec des pétroliers|石油タンカーと水平線を分け合うマリーナ",
    "The coast east of the city folds into the fjord-like inlets of Mochima National Park, where forested cliffs drop straight into water clear enough that boat operators anchor over reefs just a few metres offshore. The marina here doubles as a departure point for the ferry to Isla de Margarita and as a support base for the oil terminals further along this stretch of coast, so tankers and sailboats often share the same horizon.|La costa al este de la ciudad se pliega en las ensenadas de aspecto fiordo del Parque Nacional Mochima, donde acantilados boscosos caen directo a un agua tan clara que los patrones de embarcación fondean sobre arrecifes a apenas unos metros de la orilla. El puerto deportivo sirve a la vez de punto de salida del ferri a la Isla de Margarita y de base de apoyo para las terminales petroleras más adelante en este tramo de costa, así que petroleros y veleros suelen compartir el mismo horizonte.|La côte à l'est de la ville se replie en anses aux allures de fjord dans le parc national de Mochima, où des falaises boisées plongent directement dans une eau assez claire pour que les bateliers mouillent au-dessus de récifs à quelques mètres à peine du rivage. La marina sert à la fois de point de départ pour le ferry vers l'île de Margarita et de base d'appui pour les terminaux pétroliers plus loin sur ce tronçon de côte, si bien que pétroliers et voiliers partagent souvent le même horizon.|町の東の海岸はモチマ国立公園のフィヨルドのような入り江へと折れ込み、森に覆われた崖が透明度の高い水へまっすぐ落ち込む。船頭たちは岸からわずか数メートルのサンゴ礁の上に錨を下ろす。この港はマルガリータ島行きフェリーの発着点であると同時に、この海岸沿いに点在する石油ターミナルの支援拠点でもあり、タンカーとヨットがしばしば同じ水平線を分け合う。",
    [prop("Mochima Cliffside Anchorage|Fondeadero al pie de los acantilados de Mochima|Mouillage au pied des falaises de Mochima|モチマ断崖下の停泊地", 920, 190),
     prop("Margarita Ferry Terminal|Terminal del ferri a Margarita|Terminal du ferry pour Margarita|マルガリータ行きフェリーターミナル", 480, 100)],
  ),
  cumana: city(
    "Cumaná|Cumaná|Cumaná|クマナ",
    -64.1786, 10.4633, "ori", "port", "port", "r",
    "A city rebuilt so many times it barely remembers its own age|Una ciudad reconstruida tantas veces que apenas recuerda su propia edad|Une ville reconstruite tant de fois qu'elle se souvient à peine de son âge|何度も建て直され、自らの年齢をほとんど忘れた町",
    "Founded in 1515, Cumaná calls itself the oldest continuously Spanish-founded city on the American mainland, though repeated earthquakes — most recently in 1997 — have levelled it enough times that almost nothing built before the twentieth century still stands. It was also the birthplace in 1795 of Antonio José de Sucre, the general who later won the battle that finally ended Spanish rule in South America and gave his name to Bolivia's constitutional capital.|Fundada en 1515, Cumaná se considera la ciudad de fundación española más antigua del continente americano que se mantiene habitada sin interrupción, aunque terremotos repetidos —el último en 1997— la han arrasado tantas veces que casi nada construido antes del siglo XX sigue en pie. También fue cuna en 1795 de Antonio José de Sucre, el general que después ganó la batalla que puso fin definitivamente al dominio español en Sudamérica y dio su nombre a la capital constitucional de Bolivia.|Fondée en 1515, Cumaná se présente comme la plus ancienne ville d'implantation espagnole continûment habitée sur le continent américain, bien que des séismes répétés — le dernier en 1997 — l'aient rasée assez de fois pour que presque rien construit avant le XXe siècle n'y subsiste. Elle fut aussi, en 1795, la ville natale d'Antonio José de Sucre, le général qui remporta plus tard la bataille mettant définitivement fin à la domination espagnole en Amérique du Sud et donna son nom à la capitale constitutionnelle de la Bolivie.|1515年に建設されたクマナは、南北アメリカ大陸で途切れず続くスペイン起源の都市としては最古を自称するが、直近では1997年にも起きた度重なる地震で何度も壊滅し、20世紀より前に建てられたものはほとんど残っていない。1795年にはアントニオ・ホセ・デ・スクレの生誕地でもあった。彼はのちに南米からスペイン支配を最終的に終わらせる戦いに勝利した将軍で、その名はボリビアの憲法上の首都にも残されている。",
    [prop("Earthquake-Rebuilt Cathedral Square|Plaza de la catedral reconstruida tras el terremoto|Place de la cathédrale reconstruite après séisme|震災復興の大聖堂広場", 720, 150),
     prop("Sucre Birthplace Courtyard|Patio de la casa natal de Sucre|Cour de la maison natale de Sucre|スクレ生家の中庭", 380, 78)],
  ),
  porlamar: city(
    "Porlamar|Porlamar|Porlamar|ポルラマル",
    -63.8508, 10.9575, "ori", "beachisland", "beachisland", "r",
    "An island that Spain fished dry within a few decades|Una isla que España dejó sin pesca en pocas décadas|Une île que l'Espagne a vidée de ses ressources en quelques décennies|スペインが数十年で獲り尽くした島",
    "Spain's first colonial fortune in the Americas came not from gold but from the pearl beds around this island, worked so hard by enslaved and forced Indigenous divers that the oyster population collapsed within a few decades of the 1500s, one of the earliest recorded cases of a natural resource being fished out entirely. Porlamar reinvented itself in the twentieth century as a duty-free port, and the shopping streets that grew from that status now draw more visitors than the pearls ever did.|La primera fortuna colonial de España en América no vino del oro, sino de los criaderos de perlas alrededor de esta isla, explotados con tal intensidad por buceadores indígenas esclavizados y forzados que la población de ostras colapsó en pocas décadas del siglo XVI, uno de los primeros casos registrados de un recurso natural completamente agotado por sobreexplotación. Porlamar se reinventó en el siglo XX como puerto libre de impuestos, y las calles comerciales surgidas de ese estatus atraen hoy a más visitantes de los que jamás atrajeron las perlas.|La première fortune coloniale de l'Espagne en Amérique ne vint pas de l'or mais des gisements de perles autour de cette île, exploités si intensément par des plongeurs indigènes réduits en esclavage ou forcés au travail que la population d'huîtres s'effondra en quelques décennies dès le XVIe siècle, l'un des premiers cas enregistrés d'une ressource naturelle entièrement épuisée par la pêche. Porlamar se réinventa au XXe siècle en port franc, et les rues commerçantes nées de ce statut attirent aujourd'hui plus de visiteurs que les perles n'en attirèrent jamais.|スペインが南北アメリカで最初に得た植民地の富は金ではなく、この島の周りの真珠貝床から得たものだった。奴隷にされ、あるいは強制労働させられた先住民の潜水夫たちがあまりに酷使したため、1500年代のうちの数十年でカキの個体群は崩壊した。天然資源が漁り尽くされた記録に残る最も早い例のひとつである。ポルラマルは20世紀、免税港として自らを作り直し、その地位から生まれた商店街はいまや真珠がかつて集めた以上の客を集めている。",
    [prop("Duty-Free Shopping Arcade|Galería comercial libre de impuestos|Galerie commerçante hors taxes|免税ショッピング街", 1300, 270),
     prop("Historic Pearl Bed Overlook|Mirador del antiguo criadero de perlas|Belvédère de l'ancien gisement de perles|旧真珠貝床の展望台", 680, 140)],
  ),
  carupano: city(
    "Carúpano|Carúpano|Carúpano|カルパノ",
    -63.2578, 10.6678, "ori", "festival", "festival", "r",
    "A carnival older than most of the country's roads|Un carnaval más viejo que la mayoría de las carreteras del país|Un carnaval plus vieux que la plupart des routes du pays|国内のたいていの道路より古いカーニバル",
    "Carúpano's carnival has run almost every year since 1866, making it one of the oldest continuous celebrations of its kind in the country, with comparsas and floats that once travelled the coast road by mule cart long before the road itself was paved. Cacao exported from this port once rivalled the region's better-known plantations, though the crop's fortunes have risen and fallen with world prices more than once.|El carnaval de Carúpano se celebra casi cada año desde 1866, lo que lo convierte en una de las celebraciones continuas más antiguas de su tipo en el país, con comparsas y carrozas que antes recorrían la carretera de la costa en carretas de mulas mucho antes de que la propia vía estuviera pavimentada. El cacao exportado desde este puerto rivalizó en su día con las plantaciones más conocidas de la región, aunque la fortuna del cultivo ha subido y bajado con los precios mundiales más de una vez.|Le carnaval de Carúpano se tient presque chaque année depuis 1866, ce qui en fait l'une des célébrations continues les plus anciennes de son genre dans le pays, avec des comparsas et des chars qui parcouraient jadis la route côtière en charrette à mules bien avant que la route elle-même ne soit goudronnée. Le cacao exporté depuis ce port a jadis rivalisé avec les plantations plus réputées de la région, bien que les fortunes de cette culture aient monté et baissé plus d'une fois avec les cours mondiaux.|カルパノのカーニバルは1866年以来ほぼ毎年続いており、この種の催しとしては国内でも指折りの長寿を誇る。道が舗装されるずっと前から、仮装隊と山車はラバの荷車で海岸道路を練り歩いていた。この港から輸出されたカカオはかつて地域のより有名な産地に匹敵したが、その盛衰は世界相場の上下とともに何度も繰り返されてきた。",
    [prop("Comparsa Parade Boulevard|Bulevar del desfile de comparsas|Boulevard du défilé des comparsas|仮装隊パレード大通り", 440, 92),
     prop("Colonial Cacao Export House|Casa colonial de exportación de cacao|Maison coloniale d'exportation de cacao|植民地時代のカカオ輸出商館", 250, 52)],
  ),
  maturin: city(
    "Maturín|Maturín|Maturín|マトゥリン",
    -63.1833, 9.7500, "ori", "factory", "industrial", "b",
    "A cattle town the gas flares turned into a boomtown|Un pueblo ganadero que los mecheros de gas volvieron ciudad en auge|Une ville d'éleveurs que les torchères à gaz ont changée en ville en plein essor|ガスの炎がブームタウンに変えた牧畜の町",
    "Monagas sits atop some of the country's largest natural gas reserves, and Maturín grew from a colonial cattle-ranching town into a city of refineries and gas plants almost overnight once drilling began in earnest in the mid-twentieth century. Cattle ranches still ring the outskirts on the plains beyond the gas flares, keeping alive a livelihood that predates the wells by two centuries.|Monagas se asienta sobre algunas de las mayores reservas de gas natural del país, y Maturín pasó de ser un pueblo ganadero colonial a una ciudad de refinerías y plantas de gas casi de la noche a la mañana en cuanto la perforación arrancó en serio a mediados del siglo XX. Las haciendas ganaderas todavía rodean las afueras en los llanos más allá de los mecheros de gas, manteniendo vivo un modo de vida anterior a los pozos por dos siglos.|Le Monagas repose sur certaines des plus grandes réserves de gaz naturel du pays, et Maturín passa d'une bourgade coloniale d'éleveurs à une ville de raffineries et d'usines à gaz presque du jour au lendemain, une fois le forage véritablement lancé au milieu du XXe siècle. Des ranchs d'élevage encerclent encore la périphérie dans les plaines au-delà des torchères, faisant vivre une activité antérieure de deux siècles aux puits.|モナガス州は国内屈指の天然ガス埋蔵地帯の上にあり、マトゥリンは20世紀半ばに本格的な掘削が始まると、植民地時代からの牧畜の町からほぼ一夜にして製油所とガスプラントの町へと変わった。ガスの炎の向こうに広がる平原には、いまも牧場が郊外を取り囲み、油井より二世紀も古い生業を守り続けている。",
    [prop("Gas Flare Refinery Row|Hilera de refinerías con mechero de gas|Rangée de raffineries aux torchères|ガスフレアの製油所通り", 700, 144),
     prop("Colonial Cattle Ranch Gate|Portón de la hacienda ganadera colonial|Portail du ranch colonial|植民地時代の牧場の門", 380, 78)],
  ),
};

/**
 * 路線。旅客鉄道がほぼ無い国のため、大半は道路網に沿った移動経路。
 * `"sea"` はカナイマ(道路が無く舟でしか行けない)とポルラマル
 * (マルガリータ島行きの実在するフェリー)の2本のみ。
 */
export const VENEZUELA_EDGES = [
  // --- cap 首都圏 ---
  ["caracas", "laguaira"],
  ["caracas", "losteques"],
  ["caracas", "higuerote"],
  ["caracas", "valencia"],
  ["puertolacruz", "caracas"], // 端の順で折れ点が移る(check-sea-routes の差し戻しで45%→0%)
  // --- zu スリア ---
  ["maracaibo", "cabimas"],
  ["maracaibo", "coro"],
  // maracaibo/cabimas → santabarbaradelzulia の直線は、どちらもマラカイボ湖の
  // 広い湖面を横切ってしまい check-sea-routes.mjs で海に出ると分かった
  // (実際の道もこの湖を短絡しない。南端を回り込む)。zu-and 橋渡しの1本だけで
  // サンタバルバラ・デル・スリアの接続を保つ。
  // --- zu-and 橋渡し ---
  ["santabarbaradelzulia", "merida"],
  // --- and アンデス ---
  ["merida", "sancristobal"],
  ["merida", "trujillo"],
  ["merida", "jaji"],
  ["sancristobal", "barinas"],
  ["trujillo", "barquisimeto"],
  // --- cen 中西部・ラノス ---
  ["coro", "barquisimeto"],
  ["barquisimeto", "valencia"],
  ["barquisimeto", "barinas"],
  ["valencia", "puertocabello"],
  // --- cen-gua 橋渡し(ラノスを横断する幹線) ---
  ["barinas", "ciudadbolivar"],
  // --- gua グアヤナ ---
  ["ciudadbolivar", "ciudadguayana"],
  ["ciudadbolivar", "puertoayacucho"],
  // カナイマは実際には空路(シウダー・ボリバルからの小型機)で入るのが実情で、
  // 舟でも陸路でもない。check-sea-routes.mjsで「航路が陸100%」と出て、
  // team-leadの指摘で発覚(このゲームに空路の仕組みは無いため、いちばん近い
  // 陸路として扱う。「舟」と偽って書くよりは正直な選び方のはず)。
  ["ciudadbolivar", "canaima"],
  ["ciudadguayana", "elcallao"],
  ["elcallao", "santaelenadeuairen"],
  ["ciudadguayana", "tucupita"],
  ["ciudadguayana", "maturin"],
  ["maturin", "tucupita"],
  // --- ori オリエンテ ---
  ["puertolacruz", "cumana"],
  ["cumana", "carupano"],
  ["puertolacruz", "maturin"],
  ["puertolacruz", "porlamar", "sea"], // マルガリータ島行きの実在フェリー
];
