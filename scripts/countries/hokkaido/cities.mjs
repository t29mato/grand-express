/**
 * 北海道盤面の都市(40件)。
 *
 * この盤面は「日本」の中の地方盤(茨城・日本百名山と同じ扱い)。通貨は円、
 * 倍率は10000で決め打ち(`property-economy.mjs` は取りまとめ側が当てる)。
 *
 * 既に `scripts/content-overrides/japan-hokkaido.mjs` が日本盤の中に
 * 札幌・函館・旭川・釧路・小樽・ニセコ・室蘭・帯広・富良野・北見・網走・
 * 知床・稚内・登別の14都市を持っている。この盤面はそれと同じ町を
 * 重複させず、**観光案内にならない別の角度**(炭鉱と鉄道の廃止、
 * アイヌの人々への同化政策、開拓期以前からあった土地)を選んで書く。
 *
 * この盤面の芯: **鉄道は石炭のために敷かれ、いま人口で閉じられている。**
 * 開拓期は石炭を運ぶために鉄道網が張られ、閉山後も人を運び続けたが、
 * 人口が減った今、同じ路線が一本また一本と閉じられていっている
 * (夕張支線2019年廃止・留萌本線2023年全線廃止・瀬棚線1987年廃止・
 * 天北線と名寄本線1989年廃止・歌志内線1988年廃止・ふるさと銀河線
 * 2006年廃止・標津線1989年廃止・松前線1988年廃止・江差線(木古内―江差)
 * 2014年廃止など、すべて実際に起きたこと)。
 *
 * 一方で道南(木古内―松前―江差―上ノ国)は**開拓期より前から人が住み、
 * 松前藩がアイヌの人々との交易を独占していた土地**であり、盤面の芯の
 * 外側に立つ。石炭とは別の理由でこの盤面に要る場所として置いている。
 *
 * ## 地方区分(4つ。北海道が実際に使う4区分)
 *
 * `chuo`(道央10)/ `nan`(道南10)/ `hoku`(道北10)/ `tou`(道東10)。
 * 内訳と、この区分にした理由は `REGISTER.md` を参照。
 *
 * ## `mark`(32種)/ `bg`(23種)。合計55枚(上限70枚以内)
 *
 * 石炭の町(夕張・美唄・歌志内)は `coalmine` を共有している
 * (同じ理由で同じ姿になった町なので、意図して揃えている。
 * 夕張と歌志内は `bg` も `minetown` で揃い、絵として同一になる
 * 唯一の組。40都市中1組なので1割の枠内)。
 * 空港の町(千歳・中標津)は `airport` を共有、風力の町(せたな・遠別)は
 * `windturbine` を共有、酪農の町(八雲・標茶・別海)は `dairycow` を
 * 共有、東の漁港(根室・標津・羅臼)は `capecoast` を共有——いずれも
 * `bg` か `mark` の一方を違えて組み合わせは別にしてある。
 *
 * 人物・顔は記号にしない(白老はチセという建築で表す)。
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const HOKKAIDO_CITIES = {
  // ---------------------------------------------------------------------
  // chuo — 道央(10)
  // ---------------------------------------------------------------------
  yubari: city(
    "Yūbari|Yūbari|Yūbari|夕張",
    141.97, 43.03, "chuo", "coalmine", "minetown", "r",
    "A coal city that outlived its mines and its own railway|Una ciudad del carbón que sobrevivió a sus minas y a su propio ferrocarril|Une ville du charbon qui a survécu à ses mines et à son propre chemin de fer|炭鉱にも自分の鉄道にも先立たれた炭都",
    "At its peak in the 1960s the mines here supported a population of over 100,000, but the last pit closed in 1990 and mounting debt forced the city into Japan's harshest municipal fiscal collapse in 2007. Its last railway, the 16 km Yūbari branch line, closed in 2019, so the town the coal built can no longer be reached by train at all.|En su apogeo, en la década de 1960, las minas de esta ciudad sostenían una población de más de 100.000 personas, pero el último pozo cerró en 1990 y las deudas la llevaron al colapso fiscal municipal más duro de Japón en 2007. Su último ferrocarril, el ramal de Yūbari de 16 km, cerró en 2019, así que ya no llega ningún tren a la ciudad que construyó el carbón.|À son apogée, dans les années 1960, les mines de cette ville faisaient vivre plus de 100 000 habitants, mais le dernier puits ferma en 1990 et l'endettement la mena à la faillite financière municipale la plus dure du Japon en 2007. Sa dernière ligne, l'embranchement de Yūbari (16 km), ferma en 2019 : aucun train ne dessert plus la ville que le charbon a bâtie.|1960年代の最盛期には炭鉱の町として人口10万人を超えていたが、1990年に最後の炭鉱が閉山し、膨らんだ借金で2007年には日本でもっとも厳しい財政破綻(財政再建団体指定)に追い込まれた。最後まで残っていた石勝線夕張支線(16.1km)も2019年に廃止され、石炭が築いたこの町にはもう鉄道がまったく通っていない。",
    [
      prop("Coal Mine Memorial Park|Parque conmemorativo de la mina|Parc commémoratif de la mine|石炭の記念館", 220, 46),
      prop("Yūbari King Melon Greenhouse|Invernadero de melón Yūbari King|Serre du melon Yūbari King|夕張メロンの温室", 260, 54),
    ],
  ),
  iwamizawa: city(
    "Iwamizawa|Iwamizawa|Iwamizawa|岩見沢",
    141.77, 43.20, "chuo", "railyard", "junction", "l",
    "The junction town coal built before anything else|El pueblo de empalme que el carbón construyó antes que nada|La ville de correspondance que le charbon bâtit avant tout le reste|石炭が真っ先に築いた分岐の町",
    "The station opened in 1882 on the Horonai Railway, built to haul coal from Mikasa's mines to the port of Otaru, and grew into Hokkaidō's first great railway junction as branch lines fanned out toward the coalfields. Its marshalling yard once ranked among the largest in Japan; today only the Hakodate Main Line and a commuter branch to Sapporo remain.|La estación abrió en 1882 en el ferrocarril de Horonai, construido para llevar el carbón de las minas de Mikasa al puerto de Otaru, y se convirtió en el primer gran nudo ferroviario de Hokkaidō, con ramales que se abrían hacia los yacimientos. Su patio de maniobras llegó a ser de los mayores de Japón; hoy solo quedan la línea principal de Hakodate y un ramal de cercanías a Sapporo.|La gare ouvrit en 1882 sur la ligne de Horonai, construite pour acheminer le charbon des mines de Mikasa jusqu'au port d'Otaru, et devint le premier grand nœud ferroviaire de Hokkaidō, d'où rayonnaient les embranchements vers les bassins houillers. Sa gare de triage compta parmi les plus grandes du Japon ; il ne reste aujourd'hui que la ligne principale de Hakodate et un tronçon de banlieue vers Sapporo.|この駅は1882年、三笠の炭鉱の石炭を小樽港へ運ぶために敷かれた幌内鉄道の一駅として開業し、炭田へ向かう支線が四方に伸びる北海道最初の大分岐点に育った。かつて操車場は日本有数の規模を誇ったが、いま残るのは函館本線と札幌への通勤路線だけである。",
    [
      prop("Roundhouse Ruins|Ruinas del cobertizo circular|Vestiges de la rotonde|扇形機関庫の跡", 200, 42),
      prop("Marshalling Yard Lookout|Mirador del patio de maniobras|Belvédère du triage|操車場の見晴らし台", 240, 50),
    ],
  ),
  shiraoi: city(
    "Shiraoi|Shiraoi|Shiraoi|白老",
    141.36, 42.55, "chuo", "chise", "lakeshore", "l",
    "Where a national museum answers an 1899 law|Donde un museo nacional responde a una ley de 1899|Où un musée national répond à une loi de 1899|1899年の法への答えとして建つ国立館",
    "The 1899 Hokkaido Former Aborigines Protection Act pushed Ainu families off communal land and into individual farm plots, and it stayed on the books until 1997. Upopoy, Japan's first national Ainu museum, opened on the shore of Lake Poroto here in 2020, built to hold what that policy tried to erase.|La Ley de Protección de los Antiguos Aborígenes de Hokkaidō de 1899 empujó a las familias ainu de sus tierras comunales hacia parcelas agrícolas individuales, y siguió vigente hasta 1997. Upopoy, el primer museo nacional ainu de Japón, abrió en 2020 a orillas del lago Poroto, construido para conservar lo que aquella política intentó borrar.|La loi de 1899 sur la protection des « anciens aborigènes » de Hokkaidō poussa les familles aïnoues hors de leurs terres communes vers des parcelles agricoles individuelles, et resta en vigueur jusqu'en 1997. Upopoy, premier musée national aïnou du Japon, ouvrit en 2020 au bord du lac Poroto, bâti pour conserver ce que cette politique avait cherché à effacer.|1899年の北海道旧土人保護法はアイヌの人々を共有の土地から個々の農地へ押し込み、この法律は1997年まで効力を持ち続けた。2020年、日本初の国立アイヌ民族博物館を含む「ウポポイ」がポロト湖畔に開館し、その政策が消そうとしたものを収める場所となった。",
    [
      prop("Upopoy National Museum Wing|Ala del Museo Nacional Upopoy|Aile du musée national Upopoy|ウポポイ国立博物館棟", 250, 52),
      prop("Lake Poroto Chise Village|Poblado chise del lago Poroto|Village de chise du lac Poroto|ポロト湖畔のチセ集落", 220, 46),
    ],
  ),
  chitose: city(
    "Chitose|Chitose|Chitose|千歳",
    141.65, 42.82, "chuo", "airport", "airporttown", "r",
    "A runway shared by airliners and fighter jets|Una pista compartida por aviones civiles y militares|Une piste partagée par avions de ligne et chasseurs|旅客機と戦闘機が並ぶ滑走路",
    "New Chitose Airport, opened alongside the older military field in 1988, is one of Japan's busiest airports and the main gateway to all of Hokkaidō. The runway it shares with the Air Self-Defense Force dates to an Imperial Japanese Navy airbase built here in the 1930s.|El Nuevo Aeropuerto de Chitose, inaugurado junto al antiguo campo militar en 1988, es uno de los más transitados de Japón y la puerta principal a todo Hokkaidō. La pista que comparte con la Fuerza de Autodefensa Aérea data de una base aeronaval imperial construida aquí en los años 1930.|Le nouvel aéroport de Chitose, ouvert en 1988 à côté de l'ancien terrain militaire, est l'un des plus fréquentés du Japon et la principale porte d'entrée de tout Hokkaidō. La piste qu'il partage avec les Forces d'autodéfense aérienne remonte à une base aéronavale impériale construite ici dans les années 1930.|1988年、隣接する古い軍用飛行場と並んで開港した新千歳空港は、日本有数の利用者数を誇り北海道全体への玄関口である。航空自衛隊と分け合う滑走路は、1930年代にここへ築かれた旧日本海軍の飛行場に由来する。",
    [
      prop("Runway Observation Deck|Mirador de pista|Terrasse d'observation des pistes|滑走路の展望デッキ", 260, 54),
      prop("Air Cargo Terminal|Terminal de carga aérea|Terminal de fret aérien|航空貨物ターミナル", 2200, 460),
    ],
  ),
  tomakomai: city(
    "Tomakomai|Tomakomai|Tomakomai|苫小牧",
    141.60, 42.63, "chuo", "papermill", "industrialport", "r",
    "The port that turned Hokkaidō's forests into paper|El puerto que convirtió los bosques de Hokkaidō en papel|Le port qui transforma les forêts de Hokkaidō en papier|北海道の森を紙に変えた港",
    "A pulp mill founded here in 1910 grew into one of Japan's largest paper-manufacturing operations, feeding on timber floated down from the interior. Tomakomai's artificial harbour, dug out of open coast rather than a natural bay, now ranks among Japan's busiest ports by cargo volume.|Una fábrica de pasta de papel fundada aquí en 1910 se convirtió en una de las mayores operaciones papeleras de Japón, alimentada por madera transportada desde el interior. El puerto artificial de Tomakomai, excavado en costa abierta y no en una bahía natural, figura hoy entre los más activos de Japón por volumen de carga.|Une usine de pâte à papier fondée ici en 1910 devint l'une des plus grandes exploitations papetières du Japon, alimentée par le bois flotté depuis l'intérieur. Le port artificiel de Tomakomai, creusé en côte ouverte plutôt que dans une baie naturelle, figure aujourd'hui parmi les plus actifs du Japon en volume de fret.|1910年に興った製紙工場は、内陸から流送される木材を原料に日本有数の製紙拠点へ育った。天然の湾ではなく開けた海岸を掘り込んで造られた苫小牧港は、いまや貨物取扱量で日本有数の港となっている。",
    [
      prop("Pulp Mill Wharf|Muelle de la fábrica de pasta|Quai de l'usine de pâte à papier|製紙工場の埠頭", 280, 58),
      prop("Artificial Harbour Crane|Grúa del puerto artificial|Grue du port artificiel|掘り込み港のクレーン", 2600, 540),
    ],
  ),
  ebetsu: city(
    "Ebetsu|Ebetsu|Ebetsu|江別",
    141.53, 43.10, "chuo", "brick", "rivertown", "l",
    "A river town that built Sapporo out of its own clay|Un pueblo del río que construyó Sapporo con su propia arcilla|Une ville du fleuve qui bâtit Sapporo avec sa propre argile|自分の粘土で札幌を建てた川の町",
    "Clay dug from the banks of the Ishikari River here proved ideal for brickmaking, and from the Meiji era on Ebetsu's kilns supplied the material for many of Sapporo's landmark red-brick buildings. Brick chimneys from the old kilns still stand among the fields.|La arcilla de las orillas del río Ishikari resultó ideal para fabricar ladrillos, y desde la era Meiji los hornos de Ebetsu suministraron el material de muchos edificios emblemáticos de ladrillo rojo de Sapporo. Las chimeneas de ladrillo de los antiguos hornos aún se alzan entre los campos.|L'argile tirée des rives de la rivière Ishikari s'est révélée idéale pour la brique, et depuis l'ère Meiji les fours d'Ebetsu ont fourni le matériau de nombreux bâtiments emblématiques en brique rouge de Sapporo. Des cheminées de brique des anciens fours se dressent encore parmi les champs.|石狩川の川岸で採れる粘土が煉瓦づくりに適しており、明治期以降、江別の窯は札幌の赤煉瓦の名建築の多くに材料を供給した。かつての窯の煉瓦煙突は、いまも畑の中に点々と残っている。",
    [
      prop("Brick Kiln Chimney|Chimenea del horno de ladrillos|Cheminée du four à briques|煉瓦窯の煙突", 210, 44),
      prop("Riverside Grain Elevator|Elevador de grano ribereño|Silo à grains riverain|川辺の穀物サイロ", 240, 50),
    ],
  ),
  bibai: city(
    "Bibai|Bibai|Bibai|美唄",
    141.86, 43.34, "chuo", "coalmine", "artpark", "r",
    "A closed school turned into a field of sculpture|Una escuela cerrada convertida en un campo de esculturas|Une école fermée devenue un champ de sculptures|廃校が彫刻の野になった町",
    "Coal mined here fed one of Hokkaidō's biggest collieries until it closed in 1972, and the miners' children's school closed with the town's population. Since the 1990s a sculptor has filled that former elementary school and its snowy grounds with abstract works, turning decline itself into the exhibit.|El carbón extraído aquí alimentó una de las mayores minas de Hokkaidō hasta su cierre en 1972, y la escuela de los hijos de los mineros cerró junto con la población del pueblo. Desde los años 90 un escultor ha llenado esa antigua escuela primaria y sus terrenos nevados de obras abstractas, convirtiendo el propio declive en la exposición.|Le charbon extrait ici alimenta l'une des plus grandes mines de Hokkaidō jusqu'à sa fermeture en 1972, et l'école des enfants de mineurs ferma avec la population de la ville. Depuis les années 1990, un sculpteur a rempli cette ancienne école primaire et ses terrains enneigés d'œuvres abstraites, faisant du déclin lui-même l'exposition.|ここで掘られた石炭は北海道有数の炭鉱を支えたが1972年に閉山し、炭鉱の子らが通った小学校も町の人口とともに閉校した。1990年代以降、一人の彫刻家がその廃校と雪の敷地を抽象作品で埋め、衰退そのものを展示に変えている。",
    [
      prop("Former Elementary School Gallery|Galería de la antigua escuela|Galerie de l'ancienne école|廃校ギャラリー", 230, 48),
      prop("Snow Sculpture Field|Campo de esculturas de nieve|Champ de sculptures de neige|雪原の彫刻広場", 250, 52),
    ],
  ),
  utashinai: city(
    "Utashinai|Utashinai|Utashinai|歌志内",
    141.98, 43.45, "chuo", "coalmine", "minetown", "l",
    "Japan's smallest city by population|La ciudad más pequeña de Japón por población|La plus petite ville du Japon par sa population|人口で日本最小の市",
    "Coal from the same seam that fed Yūbari and Bibai was dug here too, until the last mine closed in the 1970s. What remains carries the smallest population of any officially designated city in Japan, a few thousand people where tens of thousands once lived.|El carbón de la misma veta que alimentaba Yūbari y Bibai también se extraía aquí, hasta que la última mina cerró en los años 70. Lo que queda tiene la población más pequeña de cualquier ciudad designada oficialmente en Japón, unos pocos miles de personas donde antes vivían decenas de miles.|Le charbon de la même veine qui alimentait Yūbari et Bibai était aussi extrait ici, jusqu'à la fermeture de la dernière mine dans les années 1970. Ce qui reste compte la plus petite population de toute ville officiellement désignée au Japon, quelques milliers d'habitants là où des dizaines de milliers vivaient autrefois.|夕張や美唄と同じ炭層の石炭がここでも掘られていたが、1970年代に最後の炭鉱が閉山した。いま残るのは、日本で正式に「市」とされる自治体としては最小の人口で、かつて数万人が暮らした場所に今は数千人しかいない。",
    [
      prop("Coal Seam Monument|Monumento a la veta de carbón|Monument de la veine de charbon|炭層の記念碑", 180, 38),
      prop("Empty Miners' Row House|Hilera vacía de casas de mineros|Rangée vide de maisons de mineurs|空き長屋", 150, 32),
    ],
  ),
  kutchan: city(
    "Kutchan|Kutchan|Kutchan|倶知安",
    140.76, 42.90, "chuo", "shinkansen", "mountainbase", "b",
    "The station town behind a foreign resort's name|El pueblo de la estación detrás del nombre de un resort extranjero|La ville-gare derrière le nom d'un lieu de villégiature étranger|外国語で呼ばれる保養地を支える駅の町",
    "The ski slopes marketed abroad under the name Niseko sit mostly in Kutchan, whose own station is the real administrative and rail centre of the area. A Hokkaidō Shinkansen station is under construction here, though the line's opening date has already been pushed back more than once.|Las pistas de esquí comercializadas en el extranjero bajo el nombre de Niseko están en su mayoría en Kutchan, cuya propia estación es el verdadero centro administrativo y ferroviario de la zona. Aquí se construye una estación del Shinkansen de Hokkaidō, aunque la fecha de apertura de la línea ya se ha retrasado más de una vez.|Les pistes de ski commercialisées à l'étranger sous le nom de Niseko se trouvent en majorité à Kutchan, dont la gare est le véritable centre administratif et ferroviaire de la région. Une gare du Shinkansen de Hokkaidō y est en construction, bien que la date d'ouverture de la ligne ait déjà été repoussée plus d'une fois.|海外で「ニセコ」の名で売られるスキー場の大半は、実は倶知安町の中にある。倶知安駅こそがこの地域の実質的な行政・鉄道の中心である。ここには北海道新幹線の駅が建設中だが、開業予定はすでに一度ならず先送りされている。",
    [
      prop("Shinkansen Construction Yard|Obra del Shinkansen|Chantier du Shinkansen|新幹線の建設現場", 280, 58),
      prop("Foreign Resort Rental Office|Oficina de alquiler para resorts extranjeros|Agence de location du lieu de villégiature étranger|外資系リゾートの貸別荘窓口", 320, 66),
    ],
  ),
  ishikari: city(
    "Ishikari|Ishikari|Ishikari|石狩",
    141.35, 43.22, "chuo", "windturbine", "rivertown", "l",
    "An old trading post turned into a wind-power coast|Un antiguo puesto de comercio convertido en costa eólica|Un ancien comptoir devenu une côte de l'énergie éolienne|交易の湊が風力の海岸になった町",
    "Salmon and herring trading posts stood at this river mouth under Matsumae-domain control centuries before Hokkaidō's Meiji-era settlement began. Today the same coastline carries one of Japan's larger offshore wind farms, built in the 2020s at Ishikari Bay's new port.|En la desembocadura de este río hubo puestos de comercio de salmón y arenque bajo control del dominio de Matsumae siglos antes de que empezara la colonización de la era Meiji en Hokkaidō. Hoy la misma costa alberga uno de los mayores parques eólicos marinos de Japón, construido en los años 2020 en el nuevo puerto de la bahía de Ishikari.|Des comptoirs de traite du saumon et du hareng se tenaient à l'embouchure de cette rivière sous le contrôle du domaine de Matsumae, des siècles avant le début de la colonisation de Hokkaidō à l'ère Meiji. Aujourd'hui la même côte porte l'un des plus grands parcs éoliens en mer du Japon, construit dans les années 2020 au nouveau port de la baie d'Ishikari.|この川の河口には、北海道の明治期の開拓が始まるずっと前から、松前藩が管理する鮭や鰊の交易場が置かれていた。同じ海岸線には今、2020年代に石狩湾新港へ建設された日本有数の洋上風力発電所が並んでいる。",
    [
      prop("Offshore Wind Substation|Subestación eólica marina|Sous-station éolienne offshore|洋上風力の変電施設", 1800, 380),
      prop("Old Trading Post Marker|Marcador del antiguo puesto de comercio|Marqueur de l'ancien comptoir|運上屋の跡碑", 200, 42),
    ],
  ),

  // ---------------------------------------------------------------------
  // nan — 道南(10)
  // ---------------------------------------------------------------------
  esashi: city(
    "Esashi|Esashi|Esashi|江差",
    140.13, 41.87, "nan", "herringmansion", "fishport", "l",
    "A Wajin trading port older than Hokkaidō's colonisation|Un puerto de comercio wajin anterior a la colonización de Hokkaidō|Un comptoir wajin antérieur à la colonisation de Hokkaidō|開拓より前からある和人の交易港",
    "This herring port grew rich enough under Matsumae-domain trade that a local saying claimed even Edo could not match it every May, centuries before Hokkaidō's Meiji-era settlement began further north. The Tokugawa shogunate's warship Kaiyō Maru sank in its harbour in 1868 during the Boshin War, and a full-size replica now stands where it went down.|Este puerto arenquero se enriqueció tanto bajo el comercio del dominio de Matsumae que un dicho local afirmaba que ni Edo lo igualaba cada mayo, siglos antes de que la colonización de la era Meiji empezara más al norte. El buque de guerra del shogunato Tokugawa, el Kaiyō Maru, se hundió en su bahía en 1868 durante la guerra Boshin, y hoy una réplica a tamaño real se alza donde se hundió.|Ce port de hareng s'enrichit tant sous le commerce du domaine de Matsumae qu'un dicton local prétendait qu'Edo elle-même ne l'égalait pas chaque mois de mai, des siècles avant que la colonisation de l'ère Meiji ne commence plus au nord. Le navire de guerre du shogunat Tokugawa, le Kaiyō Maru, y coula en 1868 pendant la guerre de Boshin, et une réplique grandeur nature se dresse aujourd'hui à l'endroit où il sombra.|松前藩の交易で栄えたこの鰊の港は、北海道本島の明治開拓が始まるよりずっと前、「江差の五月は江戸にもない」と言われるほど繁盛した。1868年の戊辰戦争では幕府の軍艦・開陽丸がこの港で沈み、いまは沈没地点に実物大の復元船が建っている。",
    [
      prop("Herring Merchant Mansion|Mansión del comerciante de arenque|Demeure du marchand de hareng|鰊御殿", 260, 54),
      prop("Kaiyō Maru Replica Ship|Réplica del Kaiyō Maru|Réplique du Kaiyō Maru|開陽丸の復元船", 1400, 290),
    ],
  ),
  matsumae: city(
    "Matsumae|Matsumae|Matsumae|松前",
    140.11, 41.43, "nan", "castle", "castletown", "b",
    "The one domain allowed to trade with the Ainu|El único dominio autorizado a comerciar con los ainu|Le seul domaine autorisé à commercer avec les Aïnous|アイヌとの交易を独占した藩",
    "Under Edo-period seclusion, the Matsumae domain held the only licence in Japan to trade with the Ainu, controlling that trade rather than farming rice like every other domain. Its castle, completed in 1854, is often described as the last Japanese castle built under the old shogunate system.|Bajo el aislamiento del periodo Edo, el dominio de Matsumae poseía la única licencia de Japón para comerciar con los ainu, controlando ese comercio en vez de cultivar arroz como los demás dominios. Su castillo, terminado en 1854, suele describirse como el último castillo japonés construido bajo el antiguo sistema del sogunato.|Sous l'isolement de la période Edo, le domaine de Matsumae détenait la seule licence du Japon pour commercer avec les Aïnous, contrôlant ce commerce plutôt que de cultiver le riz comme tous les autres domaines. Son château, achevé en 1854, est souvent décrit comme le dernier château japonais construit sous l'ancien système shogunal.|江戸期の鎖国のもとで、松前藩は日本で唯一アイヌとの交易を許された藩だった。米を作る代わりにその交易を統制することで成り立っていた。1854年に完成した松前城は、旧幕藩体制下で築かれた最後の日本の城とされることが多い。",
    [
      prop("Matsumae Castle Keep|Torre del castillo de Matsumae|Donjon du château de Matsumae|松前城の天守", 300, 62),
      prop("Trading-Monopoly Archive House|Casa de archivos del monopolio comercial|Maison d'archives du monopole commercial|場所請負の記録蔵", 220, 46),
    ],
  ),
  kikonai: city(
    "Kikonai|Kikonai|Kikonai|木古内",
    140.43, 41.68, "nan", "shinkansen", "junction", "r",
    "A Shinkansen stop where two closed lines used to split|新幹線の駅、かつて二本の廃線が分かれた場所|Une gare Shinkansen où deux lignes fermées se séparaient jadis|Estación Shinkansen donde antes se separaban dos líneas cerradas",
    "This was once the junction where the line to Matsumae split from the line to Esashi; both closed, in 1988 and 2014. Kikonai is now the Hokkaidō Shinkansen's southernmost stop, sharing its track through the Seikan Tunnel with the conventional trains that replaced them.|Aquí se dividía antes la línea hacia Matsumae de la línea hacia Esashi; ambas cerraron, en 1988 y 2014. Kikonai es hoy la parada más al sur del Shinkansen de Hokkaidō, y comparte su vía a través del túnel de Seikan con los trenes convencionales que las sustituyeron.|C'est ici que la ligne vers Matsumae se séparait jadis de la ligne vers Esashi ; les deux ont fermé, en 1988 et 2014. Kikonai est aujourd'hui l'arrêt le plus au sud du Shinkansen de Hokkaidō, partageant sa voie à travers le tunnel de Seikan avec les trains classiques qui les ont remplacées.|かつてここは松前へ向かう線と江差へ向かう線が分かれる分岐点だった。両方とも1988年と2014年に廃止されている。木古内は今や北海道新幹線最南端の駅で、それらに代わる在来線と青函トンネルの線路を分け合っている。",
    [
      prop("Seikan Tunnel Portal View|Vista de la boca del túnel de Seikan|Vue de l'entrée du tunnel de Seikan|青函トンネルの坑口を望む展望地", 260, 54),
      prop("Former Junction Signal House|Antigua casilla de señales del empalme|Ancienne guérite de signalisation du nœud|旧分岐点の信号所", 200, 42),
    ],
  ),
  kaminokuni: city(
    "Kaminokuni|Kaminokuni|Kaminokuni|上ノ国",
    140.07, 41.78, "nan", "fort_medieval", "oldsettlement", "l",
    "A fifteenth-century Wajin fort, a century before Sapporo existed|Un fuerte wajin del siglo XV, un siglo antes de que existiera Sapporo|Un fort wajin du XVe siècle, un siècle avant l'existence de Sapporo|札幌より一世紀早い、15世紀の和人の砦",
    "The Kakizaki clan, ancestors of the Matsumae domain, built one of the twelve fortified settlements known collectively as Donan Jūni-tate here in the fifteenth century, long before organised Wajin settlement reached the rest of Hokkaidō. Excavations at the Hanazawa-date fort site are protected today as a national historic site.|El clan Kakizaki, antepasado del dominio de Matsumae, construyó aquí en el siglo XV uno de los doce asentamientos fortificados conocidos en conjunto como Donan Jūni-tate, mucho antes de que la colonización wajin organizada llegara al resto de Hokkaidō. Las excavaciones del fuerte de Hanazawa-date están hoy protegidas como sitio histórico nacional.|Le clan Kakizaki, ancêtre du domaine de Matsumae, bâtit ici au XVe siècle l'un des douze établissements fortifiés connus collectivement sous le nom de Donan Jūni-tate, bien avant que la colonisation wajin organisée n'atteigne le reste de Hokkaidō. Les fouilles du fort de Hanazawa-date sont aujourd'hui protégées comme site historique national.|松前藩の祖にあたる蠣崎氏は、15世紀にこの地に「道南十二館」と総称される砦の一つを築いた。組織立った和人の入植が北海道の他の地域に及ぶよりずっと前のことである。花沢館跡の発掘地は今、国の史跡として保護されている。",
    [
      prop("Hanazawa-date Fort Excavation|Excavación del fuerte Hanazawa-date|Fouilles du fort de Hanazawa-date|花沢館跡の発掘地", 240, 50),
      prop("Coastal Terrace Farmstead|Granja de la terraza costera|Ferme de la terrasse côtière|海岸段丘の農家", 200, 42),
    ],
  ),
  yakumo: city(
    "Yakumo|Yakumo|Yakumo|八雲",
    140.25, 42.25, "nan", "dairycow", "dairyfarm", "r",
    "Former samurai who traded the sword for the milking pail|Antiguos samuráis que cambiaron la espada por el cubo de ordeñar|D'anciens samouraïs qui échangèrent le sabre pour le seau à traire|刀を搾乳桶に持ち替えた元武士の入植地",
    "In 1878 former retainers of the Owari domain, one branch of the Tokugawa house left without income after the shogunate's fall, settled here and turned to dairy farming on advice that rice would not ripen this far north. Their herds made Yakumo one of the birthplaces of Hokkaidō's dairy industry.|En 1878, antiguos vasallos del dominio de Owari, una rama de la casa Tokugawa que se quedó sin ingresos tras la caída del sogunato, se asentaron aquí y se dedicaron a la ganadería lechera siguiendo el consejo de que el arroz no maduraría tan al norte. Sus rebaños convirtieron a Yakumo en una de las cunas de la industria láctea de Hokkaidō.|En 1878, d'anciens vassaux du domaine d'Owari, une branche de la maison Tokugawa privée de revenus après la chute du shogunat, s'installèrent ici et se tournèrent vers l'élevage laitier, sur avis que le riz ne mûrirait pas si loin au nord. Leurs troupeaux firent de Yakumo l'un des berceaux de l'industrie laitière de Hokkaidō.|1878年、幕府崩壊で収入を失った尾張徳川家の旧家臣たちがここに入植し、「これほど北では米は実らない」との助言に従って酪農を始めた。彼らの牛群は八雲を北海道酪農発祥の地のひとつにした。",
    [
      prop("Former Samurai Dairy Barn|Establo lechero de antiguos samuráis|Étable laitière d'anciens samouraïs|旧士族の牛舎", 220, 46),
      prop("Owari Retainers' Settlement House|Casa de colonos de los vasallos de Owari|Maison des colons vassaux d'Owari|尾張藩士入植の家", 190, 40),
    ],
  ),
  oshamambe: city(
    "Oshamambe|Oshamambe|Oshamambe|長万部",
    140.39, 42.51, "nan", "ekiben", "junction", "l",
    "Where the mountain line and the coast line split|Donde se separan la línea de montaña y la línea costera|Où se séparent la ligne de montagne et la ligne côtière|山線と海線が分かれる駅",
    "Since the Hakodate Main Line's completion this station has been the point where the inland mountain route toward Otaru and Sapporo splits from the coastal route around Uchiura Bay. Its crab-rice ekiben, sold on the platform since the 1950s, is one of Japan's best-known station lunches.|Desde la finalización de la línea principal de Hakodate, esta estación ha sido el punto donde la ruta interior de montaña hacia Otaru y Sapporo se separa de la ruta costera alrededor de la bahía de Uchiura. Su bento de arroz con cangrejo, vendido en el andén desde los años 50, es una de las comidas de estación más conocidas de Japón.|Depuis l'achèvement de la ligne principale de Hakodate, cette gare est le point où la route intérieure de montagne vers Otaru et Sapporo se sépare de la route côtière autour de la baie d'Uchiura. Son ekiben au riz et au crabe, vendu sur le quai depuis les années 1950, est l'un des repas de gare les plus connus du Japon.|函館本線の全通以来、この駅は小樽・札幌へ向かう内陸の山線と、噴火湾沿いの海線が分かれる場所であり続けている。1950年代からホームで売られるかにめし駅弁は、日本でもっとも知られた駅弁のひとつである。",
    [
      prop("Kanimeshi Ekiben Stand|Puesto del bento de cangrejo|Stand d'ekiben au crabe|かにめし駅弁の売店", 210, 44),
      prop("Route-Split Signal Tower|Torre de señales del empalme|Tour de signalisation de la bifurcation|山線・海線分岐の信号塔", 240, 50),
    ],
  ),
  mori: city(
    "Mori|Mori|Mori|森",
    140.58, 42.10, "nan", "squid", "baycoast", "l",
    "A wartime rice shortage that became a famous lunch|Una escasez de arroz en tiempos de guerra que se hizo un almuerzo famoso|Une pénurie de riz en temps de guerre devenue un déjeuner célèbre|戦時の米不足が名物駅弁になった町",
    "In 1941, with rice scarce, a station shop here began stuffing squid with rice instead of the other way around, and the result, ikameshi, is still sold on the same platform today. The bay it overlooks, Uchiura, is a nearly closed circle of coastline formed by an ancient volcanic collapse.|En 1941, con el arroz escaso, una tienda de la estación empezó a rellenar calamares con arroz en vez de al revés, y el resultado, el ikameshi, todavía se vende en el mismo andén hoy. La bahía que domina, Uchiura, es un círculo casi cerrado de costa formado por un antiguo colapso volcánico.|En 1941, le riz se faisant rare, une boutique de gare se mit à farcir des calmars de riz plutôt que l'inverse, et le résultat, l'ikameshi, se vend encore aujourd'hui sur le même quai. La baie qu'elle surplombe, Uchiura, forme un cercle presque fermé de côte né d'un effondrement volcanique ancien.|1941年、米が乏しくなったこの駅の売店は、米にイカを詰める代わりにイカに米を詰めることを思いつき、「いかめし」として今も同じホームで売られている。町が面する噴火湾は、太古の火山の陥没でできたほぼ円形の海岸線である。",
    [
      prop("Ikameshi Station Shop|Tienda de ikameshi de la estación|Boutique d'ikameshi de la gare|いかめしの駅売店", 200, 42),
      prop("Uchiura Bay Fishing Pier|Muelle pesquero de la bahía de Uchiura|Jetée de pêche de la baie d'Uchiura|噴火湾の漁港桟橋", 220, 46),
    ],
  ),
  fukushima: city(
    "Fukushima|Fukushima|Fukushima|福島",
    140.25, 41.49, "nan", "sumo", "baycoast", "r",
    "A fishing town that produced two grand sumo champions|Un pueblo pesquero que dio dos grandes campeones de sumo|Une ville de pêcheurs qui produisit deux grands champions de sumo|横綱を二人輩出した漁師町",
    "This small fishing town on the Tsugaru Strait produced two yokozuna, sumo's highest rank, in the twentieth century: Chiyonoyama and Chiyonofuji. A small museum here keeps their ceremonial aprons and match records.|Este pequeño pueblo pesquero del estrecho de Tsugaru produjo dos yokozuna, el rango más alto del sumo, en el siglo XX: Chiyonoyama y Chiyonofuji. Un pequeño museo aquí conserva sus delantales ceremoniales y sus registros de combates.|Cette petite ville de pêcheurs du détroit de Tsugaru produisit deux yokozuna, le rang le plus élevé du sumo, au XXe siècle : Chiyonoyama et Chiyonofuji. Un petit musée y conserve leurs tabliers cérémoniels et leurs registres de combats.|津軽海峡に面したこの小さな漁師町は、20世紀に大相撲最高位の横綱を二人(千代の山・千代の富士)輩出した。小さな資料館には、二人の化粧まわしや取組の記録が残されている。",
    [
      prop("Yokozuna Memorial Hall|Sala conmemorativa de los yokozuna|Salle commémorative des yokozuna|横綱記念館", 230, 48),
      prop("Tsugaru Strait Fishing Boat Dock|Muelle de pesca del estrecho de Tsugaru|Quai de pêche du détroit de Tsugaru|津軽海峡の漁船だまり", 190, 40),
    ],
  ),
  setana: city(
    "Setana|Setana|Setana|せたな",
    139.85, 42.86, "nan", "windturbine", "ruggedcoast", "b",
    "A closed branch line replaced by a row of turbines|Un ramal cerrado sustituido por una fila de turbinas|Une ligne fermée remplacée par une rangée d'éoliennes|廃線に代わって並んだ風車",
    "The Setana Line, a branch off the Hakodate Main Line, carried passengers here until 1987, and no railway has served this stretch of Sea of Japan coast since. The same open, windswept coastline now carries rows of wind turbines, among Hokkaidō's earlier sites for the technology.|El ramal de Setana, un desvío de la línea principal de Hakodate, transportó pasajeros hasta 1987, y desde entonces ningún ferrocarril ha servido este tramo de la costa del mar del Japón. La misma costa abierta y azotada por el viento porta hoy filas de turbinas eólicas, uno de los primeros emplazamientos de Hokkaidō para esta tecnología.|La ligne de Setana, un embranchement de la ligne principale de Hakodate, transporta des passagers jusqu'en 1987, et aucun chemin de fer n'a depuis desservi ce tronçon de la côte de la mer du Japon. La même côte ouverte et balayée par le vent porte aujourd'hui des rangées d'éoliennes, l'un des premiers sites de Hokkaidō pour cette technologie.|函館本線から分かれる瀬棚線は1987年まで旅客を運んだが、以来この日本海沿いの区間に鉄道は通っていない。同じ吹きさらしの海岸には今、北海道でも早くから風力発電に取り組んだ風車の列が並んでいる。",
    [
      prop("Former Setana Line Trackbed|Antiguo trazado del ramal de Setana|Ancien tracé de la ligne de Setana|瀬棚線の廃線跡", 170, 36),
      prop("Coastal Wind Turbine Row|Fila de turbinas eólicas costeras|Rangée d'éoliennes côtières|海岸の風車列", 260, 54),
    ],
  ),
  okushiri: city(
    "Okushiri|Okushiri|Okushiri|奥尻",
    139.86, 41.89, "nan", "seawall", "islandcoast", "l", // 座標は地理側の島の描画に合わせて調整(海陸判定・航路の都合)
    "An island rebuilt behind eleven-metre sea walls|Una isla reconstruida tras muros marinos de once metros|Une île reconstruite derrière des digues de onze mètres|11mの防潮堤の内側に建て直された島",
    "A magnitude-7.8 earthquake in July 1993 sent a tsunami ashore within minutes, killing roughly 200 people on this small island, most of them in the town of Aonae. The island was rebuilt with some of Japan's tallest sea walls, reaching over eleven metres in places.|Un terremoto de magnitud 7,8 en julio de 1993 envió un tsunami a la costa en cuestión de minutos, matando a unas 200 personas en esta pequeña isla, la mayoría en la localidad de Aonae. La isla fue reconstruida con algunos de los muros marinos más altos de Japón, que superan los once metros en algunos tramos.|Un séisme de magnitude 7,8 en juillet 1993 provoqua un tsunami en quelques minutes, tuant environ 200 personnes sur cette petite île, la plupart dans la localité d'Aonae. L'île fut reconstruite avec certaines des digues les plus hautes du Japon, dépassant onze mètres par endroits.|1993年7月の北海道南西沖地震ではわずか数分で津波が押し寄せ、この小さな島でおよそ200人が犠牲になった。多くは青苗地区に集中していた。島は建て直され、高いところでは11mを超える日本有数の防潮堤が築かれた。",
    [
      prop("Eleven-Metre Sea Wall|Muro marino de once metros|Digue de onze mètres|11mの防潮堤", 250, 52),
      prop("Aonae Rebuilt Fishing Quarter|Barrio pesquero reconstruido de Aonae|Quartier de pêcheurs reconstruit d'Aonae|再建された青苗の漁師町", 200, 42),
    ],
  ),

  // ---------------------------------------------------------------------
  // hoku — 道北(10)
  // ---------------------------------------------------------------------
  rumoi: city(
    "Rumoi|Rumoi|Rumoi|留萌",
    141.65, 43.94, "hoku", "raildisused", "fishport", "r",
    "A herring port whose last train left in 2023|Un puerto arenquero cuyo último tren partió en 2023|Un port du hareng dont le dernier train est parti en 2023|最後の汽車が2023年に出た鰊の港",
    "Herring money built this port the same way it built Otaru, and the town still processes a large share of Japan's kazunoko herring roe. The line that reached it, opened in 1910, lost its last remaining stretch in April 2023, making Rumoi one of the largest Japanese towns with no railway at all.|La riqueza del arenque construyó este puerto igual que construyó Otaru, y la ciudad procesa aún buena parte del kazunoko (hueva de arenque) de Japón. La línea que llegaba hasta aquí, abierta en 1910, perdió su último tramo en abril de 2023, y Rumoi pasó a ser una de las mayores ciudades japonesas sin ferrocarril.|La richesse du hareng bâtit ce port comme elle bâtit Otaru, et la ville transforme encore une grande part du kazunoko (œufs de hareng) du Japon. La ligne qui l'atteignait, ouverte en 1910, perdit son dernier tronçon en avril 2023 : Rumoi est devenue l'une des plus grandes villes japonaises sans aucun chemin de fer.|鰊で栄えたのは小樽と同じで、いまも日本の数の子の少なくない割合をこの港で加工している。1910年に開通した留萌本線は2023年4月に最後の区間も廃止され、留萌は鉄道を持たない日本の町としてはかなり大きな部類に入った。",
    [
      prop("Kazunoko Processing Hall|Nave de procesado de kazunoko|Atelier de kazunoko|数の子の加工場", 230, 48),
      prop("Disused Station Platform|Andén de la estación cerrada|Quai de la gare fermée|廃駅のホーム", 180, 38),
    ],
  ),
  horonobe: city(
    "Horonobe|Horonobe|Horonobe|幌延",
    141.80, 45.00, "hoku", "borehole", "northplain", "l",
    "A laboratory that studies burying nuclear waste, but does not|Un laboratorio que estudia el entierro de residuos nucleares, pero no lo hace|Un laboratoire qui étudie l'enfouissement des déchets nucléaires, sans le faire|核のごみを埋める研究はしても、埋めてはいない施設",
    "The Horonobe Underground Research Laboratory drills hundreds of metres into the rock here to study how deep geological layers might one day hold Japan's high-level nuclear waste. By agreement with the town, no actual waste is stored at the site; it exists to answer the question, not to act on it yet.|El Laboratorio de Investigación Subterránea de Horonobe perfora cientos de metros en la roca para estudiar cómo podrían las capas geológicas profundas albergar algún día los residuos nucleares de alto nivel de Japón. Por acuerdo con el municipio, no se almacenan residuos reales en el lugar; existe para responder la pregunta, no para actuar sobre ella todavía.|Le Laboratoire de recherche souterraine de Horonobe fore des centaines de mètres dans la roche pour étudier comment des couches géologiques profondes pourraient un jour accueillir les déchets nucléaires de haute activité du Japon. Par accord avec la commune, aucun déchet réel n'y est stocké ; il existe pour répondre à la question, pas encore pour agir dessus.|幌延深地層研究センターは地下数百mまで掘り進め、日本の高レベル放射性廃棄物をいつか地層の奥深くに埋められるかを研究している。町との協定により、ここに実際の廃棄物が持ち込まれることはない。答えを探すための施設であり、まだ実行のための施設ではない。",
    [
      prop("Deep Borehole Research Tower|Torre de investigación de perforación profunda|Tour de recherche du forage profond|深地層試錐孔の研究塔", 240, 50),
      prop("Subarctic Grazing Pasture|Pastizal subártico|Pâturage subarctique|亜寒帯の放牧地", 190, 40),
    ],
  ),
  toyotomi: city(
    "Toyotomi|Toyotomi|Toyotomi|豊富",
    141.76, 45.12, "hoku", "onsen_oil", "northplain", "r",
    "A hot spring found by accident while drilling for oil|Un manantial termal hallado por accidente al perforar en busca de petróleo|Une source chaude découverte par accident lors d'un forage pétrolier|石油を掘り当てようとして湧いた温泉",
    "Drillers searching for oil and natural gas here in 1926 struck hot water instead, carrying dissolved petroleum and natural gas rather than the usual volcanic minerals. It remains one of only a handful of oil-field-type hot springs in Japan.|Los perforadores que buscaban petróleo y gas natural aquí en 1926 encontraron en cambio agua caliente, que arrastraba petróleo y gas natural disueltos en lugar de los minerales volcánicos habituales. Sigue siendo uno de los pocos manantiales termales de tipo yacimiento petrolífero de Japón.|Des foreurs cherchant du pétrole et du gaz naturel ici en 1926 tombèrent à la place sur de l'eau chaude, chargée de pétrole et de gaz naturel dissous plutôt que des minéraux volcaniques habituels. Elle reste l'une des rares sources thermales de type gisement pétrolier du Japon.|1926年、石油と天然ガスを求めて掘削していた技師たちは、代わりに石油分と天然ガスを溶かし込んだ温泉を掘り当てた。通常の火山性の温泉とは異なる、日本でも数少ない油田型温泉のひとつである。",
    [
      prop("Oil-Field Hot Spring Bathhouse|Casa de baños del manantial petrolífero|Bains de la source thermale pétrolière|油田温泉の湯治場", 220, 46),
      prop("1926 Drilling Rig Marker|Marcador de la torre de perforación de 1926|Marqueur du derrick de 1926|1926年掘削やぐらの記念碑", 180, 38),
    ],
  ),
  otoineppu: city(
    "Otoineppu|Otoineppu|Otoineppu|音威子府",
    142.13, 44.75, "hoku", "soba", "junction", "l",
    "Black noodles from a junction two lines have already left|Fideos negros de un empalme del que ya partieron dos líneas|Nouilles noires d'un nœud que deux lignes ont déjà quitté|二本の廃線が分かれていた駅の黒い蕎麦",
    "A local mill here grinds buckwheat husk and all into a distinctive black-flecked soba noodle, sold at a station stand for decades. Otoineppu was also the junction where the Tenpoku Line branched off toward Wakkanai's interior route until its closure in 1989.|Un molino local muele aquí el trigo sarraceno con cáscara y todo, dando un fideo soba de vetas negras característico, vendido en un puesto de la estación durante décadas. Otoineppu fue también el empalme donde la línea Tenpoku se desviaba hacia la ruta interior de Wakkanai hasta su cierre en 1989.|Un moulin local y broie le sarrasin avec son enveloppe, donnant des nouilles soba tachetées de noir vendues depuis des décennies à un stand de gare. Otoineppu fut aussi le nœud où la ligne Tenpoku bifurquait vers la route intérieure de Wakkanai jusqu'à sa fermeture en 1989.|地元の製粉所は蕎麦の実を殻ごと挽き、黒い斑点の残る独特の蕎麦を作り、駅の売店で何十年も売られてきた。音威子府はかつて天北線がワッカナイへの内陸ルートへ分かれる分岐点でもあったが、その路線は1989年に廃止された。",
    [
      prop("Whole-Husk Soba Mill|Molino de soba con cáscara|Moulin à soba avec enveloppe|殻ごと挽く蕎麦の製粉所", 210, 44),
      prop("Former Tenpoku Line Junction Marker|Marcador del antiguo empalme de la línea Tenpoku|Marqueur de l'ancien nœud de la ligne Tenpoku|旧天北線分岐の跡碑", 170, 36),
    ],
  ),
  nayoro: city(
    "Nayoro|Nayoro|Nayoro|名寄",
    142.46, 44.36, "hoku", "snowflake_cold", "coldbasin", "r",
    "A basin cold enough to freeze a line off the map|Una cuenca lo bastante fría para borrar una línea del mapa|Un bassin assez froid pour effacer une ligne de la carte|路線を地図から消すほど冷え込む盆地",
    "Ringed by hills that trap cold air, this inland basin regularly drops below −30°C in deep winter, among the coldest inhabited places in Japan. Nayoro was the junction where the Nayoro Main Line once branched east toward the Okhotsk coast, one of many rural lines cut in Japan's nationwide rationalisation of 1989.|Rodeada de colinas que atrapan el aire frío, esta cuenca interior baja regularmente de los −30 °C en pleno invierno, entre los lugares habitados más fríos de Japón. Nayoro era el empalme donde la línea principal de Nayoro se desviaba antes hacia la costa de Okhotsk, una de tantas líneas rurales suprimidas en la racionalización nacional japonesa de 1989.|Entourée de collines qui piègent l'air froid, cette cuvette intérieure descend régulièrement sous les −30 °C en plein hiver, parmi les lieux habités les plus froids du Japon. Nayoro était le nœud où la ligne principale de Nayoro bifurquait jadis vers la côte d'Okhotsk, l'une des nombreuses lignes rurales supprimées lors de la rationalisation nationale japonaise de 1989.|冷気がたまりやすい盆地地形のため、真冬にはしばしば氷点下30度を下回る、日本でも指折りの寒さの町である。名寄はかつて名寄本線がオホーツク海側へ分岐していた駅で、その路線は1989年の全国的な地方線見直しで廃止された多くの路線のひとつだった。",
    [
      prop("Deep-Winter Cold Record Hut|Cabaña del récord de frío invernal|Cabane du record de froid hivernal|厳冬の最低気温観測小屋", 200, 42),
      prop("Former Nayoro Main Line Yard|Antiguo patio de la línea principal de Nayoro|Ancienne gare de triage de la ligne de Nayoro|旧名寄本線の跡地", 220, 46),
    ],
  ),
  mashike: city(
    "Mashike|Mashike|Mashike|増毛",
    141.51, 43.88, "hoku", "sakebrewery", "fishport", "l",
    "Japan's northernmost sake brewery, at a line's dead end|La destilería de sake más septentrional de Japón, en el final de una línea|La brasserie de saké la plus septentrionale du Japon, au bout d'une ligne|廃線の果てにある日本最北の酒蔵",
    "Kunimare, a brewery founded here in 1882, is generally reckoned Japan's northernmost maker of sake. The Rumoi Main Line's final stretch to this town closed in December 2016, seven years before the rest of the line followed it into closure.|Kunimare, una destilería fundada aquí en 1882, se considera en general la más septentrional de sake en Japón. El último tramo de la línea principal de Rumoi hasta este pueblo cerró en diciembre de 2016, siete años antes de que el resto de la línea le siguiera al cierre.|Kunimare, une brasserie fondée ici en 1882, est généralement considérée comme la plus septentrionale du Japon pour le saké. Le dernier tronçon de la ligne principale de Rumoi jusqu'à cette ville ferma en décembre 2016, sept ans avant que le reste de la ligne ne suive dans la fermeture.|1882年創業の国稀酒造は、日本最北の酒蔵とされることが多い。この町までの留萌本線の最終区間は2016年12月に廃止され、路線の残り全区間が後を追うように廃止されるまで7年を要した。",
    [
      prop("Northernmost Sake Brewery|La destilería de sake más septentrional|Brasserie de saké la plus septentrionale|日本最北の酒蔵", 260, 54),
      prop("Final-Stretch Station Ruins|Ruinas de la estación del tramo final|Vestiges de la gare du dernier tronçon|最終区間の廃駅跡", 170, 36),
    ],
  ),
  haboro: city(
    "Haboro|Haboro|Haboro|羽幌",
    141.70, 44.36, "hoku", "seabird", "coalport", "b",
    "A coal railway and a seabird colony's ferry gate|Un ferrocarril de carbón y la puerta del ferry a una colonia de aves marinas|Un chemin de fer à charbon et la porte du ferry vers une colonie d'oiseaux marins|石炭鉄道と、海鳥の島へのフェリー乗り場",
    "A private colliery railway once ran inland from here to Haboro's coal mines until the early 1970s, while the coastal Haboro Line carried passengers along the shore until 1987. Today the port instead sends ferries out to Teuri Island, once home to one of the world's largest colonies of a seabird called the rhinoceros auklet.|Un ferrocarril privado de la mina corría antes tierra adentro desde aquí hasta las minas de carbón de Haboro hasta principios de los años 70, mientras la línea costera de Haboro transportaba pasajeros por la orilla hasta 1987. Hoy el puerto envía en cambio ferris a la isla de Teuri, antes hogar de una de las mayores colonias del mundo de un ave marina llamada mérgulo cornudo.|Un chemin de fer minier privé courait autrefois vers l'intérieur depuis ici jusqu'aux mines de charbon de Haboro jusqu'au début des années 1970, tandis que la ligne côtière de Haboro transportait des passagers le long du rivage jusqu'en 1987. Aujourd'hui, le port envoie plutôt des ferries vers l'île de Teuri, jadis abritant l'une des plus grandes colonies au monde d'un oiseau marin appelé macareux rhinocéros.|かつて私鉄の羽幌炭砿鉄道が内陸の炭鉱へ石炭を運び、1970年代初頭まで走っていた。海沿いを走った国鉄羽幌線も1987年まで旅客を運んだ。いま港から出るフェリーは天売島へ向かう。天売島はかつて世界有数のウトウの繁殖地だった島である。",
    [
      prop("Colliery Railway Trackbed|Trazado del ferrocarril minero|Tracé du chemin de fer minier|炭砿鉄道の廃線跡", 190, 40),
      prop("Teuri Island Ferry Terminal|Terminal del ferry a la isla Teuri|Terminal du ferry vers l'île de Teuri|天売島フェリーターミナル", 230, 48),
    ],
  ),
  shimokawa: city(
    "Shimokawa|Shimokawa|Shimokawa|下川",
    142.65, 44.28, "hoku", "forestry", "foresttown", "l",
    "A logging town that chose to run on its own wood|Un pueblo maderero que eligió funcionar con su propia madera|Une ville forestière qui choisit de fonctionner avec son propre bois|自分の木で自分を賄うことを選んだ林業の町",
    "Shimokawa was a station on the Nayoro Main Line, cut in the same 1989 closure that severed Nayoro from the Okhotsk coast. Rather than shrink quietly, the town rebuilt its economy around its own forests, burning wood waste for heat and power, and in 2018 it was named one of Japan's first government-designated SDGs Future Cities.|Shimokawa era una estación de la línea principal de Nayoro, cortada en el mismo cierre de 1989 que separó Nayoro de la costa de Okhotsk. En lugar de reducirse en silencio, el pueblo reconstruyó su economía en torno a sus propios bosques, quemando residuos de madera para calor y energía, y en 2018 fue nombrado una de las primeras Ciudades del Futuro ODS designadas por el gobierno japonés.|Shimokawa était une gare de la ligne principale de Nayoro, coupée lors de la même fermeture de 1989 qui sépara Nayoro de la côte d'Okhotsk. Plutôt que de décliner en silence, la ville reconstruisit son économie autour de ses propres forêts, brûlant les déchets de bois pour la chaleur et l'énergie, et fut nommée en 2018 l'une des premières « villes d'avenir ODD » désignées par le gouvernement japonais.|下川は名寄本線の一駅で、名寄とオホーツク海岸を結んでいた同じ1989年の廃止でこの路線を失った。静かに縮むのではなく、町は自らの森林を軸に経済を組み直し、木くずを燃やして熱と電力をまかない、2018年には日本政府が指定する最初期の「SDGs未来都市」の一つに選ばれた。",
    [
      prop("Wood-Biomass Power Plant|Central de biomasa de madera|Centrale à biomasse bois|木質バイオマス発電所", 250, 52),
      prop("Forestry Cooperative Yard|Patio de la cooperativa forestal|Cour de la coopérative forestière|森林組合の土場", 200, 42),
    ],
  ),
  enbetsu: city(
    "Enbetsu|Enbetsu|Enbetsu|遠別",
    141.71, 44.65, "hoku", "windturbine", "northplain", "r",
    "A coastal wind corridor along a coal railway's route|Un corredor eólico costero sobre la ruta de un ferrocarril de carbón|Un corridor éolien côtier sur le tracé d'un ancien chemin de fer à charbon|石炭鉄道の跡をなぞる海沿いの風の回廊",
    "The Haboro Line's coastal track once ran through here on its way north, closed along with the rest of the line in 1987. Like much of this stretch of Sea of Japan coast, the town has since become part of one of Hokkaidō's most active corridors for wind-turbine development.|La vía costera de la línea Haboro pasaba antes por aquí en su recorrido hacia el norte, cerrada junto con el resto de la línea en 1987. Como buena parte de este tramo de la costa del mar del Japón, el pueblo se ha convertido desde entonces en parte de uno de los corredores más activos de Hokkaidō para el desarrollo de la energía eólica.|La voie côtière de la ligne Haboro passait autrefois par ici en direction du nord, fermée avec le reste de la ligne en 1987. Comme une grande partie de ce tronçon de la côte de la mer du Japon, la ville fait depuis partie de l'un des corridors les plus actifs de Hokkaidō pour le développement de l'éolien.|羽幌線の海沿いの線路はかつてここを通って北へ向かっていたが、1987年に路線の残り全体とともに廃止された。この日本海沿いの区間の多くと同じく、いまこの町も北海道でもっとも風力発電の開発が盛んな回廊の一部になっている。",
    [
      prop("Former Haboro Line Trackbed|Antiguo trazado de la línea Haboro|Ancien tracé de la ligne Haboro|旧羽幌線の廃線跡", 180, 38),
      prop("Coastal Wind Farm Access Road|Camino de acceso al parque eólico costero|Route d'accès au parc éolien côtier|海岸風力発電所へのアクセス道", 220, 46),
    ],
  ),
  nakatonbetsu: city(
    "Nakatonbetsu|Nakatonbetsu|Nakatonbetsu|中頓別",
    142.28, 44.98, "hoku", "cave", "foresttown", "b",
    "A gold-rush inland town with limestone caves underneath|Un pueblo interior de fiebre del oro con cuevas de piedra caliza debajo|Une ville intérieure de ruée vers l'or aux grottes calcaires souterraines|地下に鍾乳洞を抱える、かつての砂金の内陸町",
    "Gold panning is said to have drawn prospectors to the rivers around this inland town in the early twentieth century, part of a smaller Hokkaidō gold rush much less remembered than the coal boom. Beneath the surrounding hills, the Nakatonbetsu limestone caves are protected as a natural monument.|Se dice que la búsqueda de oro atrajo a buscadores a los ríos de este pueblo interior a principios del siglo XX, parte de una fiebre del oro de Hokkaidō menor y mucho menos recordada que el auge del carbón. Bajo las colinas circundantes, las cuevas de piedra caliza de Nakatonbetsu están protegidas como monumento natural.|La recherche d'or aurait attiré des prospecteurs vers les rivières de cette ville intérieure au début du XXe siècle, dans le cadre d'une ruée vers l'or de Hokkaidō plus modeste et bien moins connue que le boom du charbon. Sous les collines environnantes, les grottes calcaires de Nakatonbetsu sont protégées comme monument naturel.|20世紀初頭、この内陸の町を流れる川には砂金を求める人々が集まったと伝わる。石炭ブームに比べればほとんど語られない、北海道の小さなゴールドラッシュの一つだった。周囲の丘の下には、天然記念物に指定された中頓別鍾乳洞が広がる。",
    [
      prop("Limestone Cave Entrance|Entrada de la cueva de piedra caliza|Entrée de la grotte calcaire|鍾乳洞の入口", 210, 44),
      prop("Gold-Panning River Camp|Campamento ribereño de bateo de oro|Campement fluvial d'orpaillage|砂金採りの川辺の跡", 180, 38),
    ],
  ),

  // ---------------------------------------------------------------------
  // tou — 道東(10)
  // ---------------------------------------------------------------------
  nemuro: city(
    "Nemuro|Nemuro|Nemuro|根室",
    145.58, 43.33, "tou", "crab", "capecoast", "l",
    "Japan's last stop east — almost|El último apeadero del este de Japón, casi|Le dernier arrêt à l'est du Japon, presque|日本最東の終着駅、あと一歩",
    "Crab boats here land the hanasaki crab, named for this town's own port and caught nowhere else in such numbers. Nemuro is the line's easternmost terminus, but the true easternmost train station in Japan is Higashi-Nemuro, one stop back down the same track.|Los barcos cangrejeros desembarcan aquí el cangrejo hanasaki, llamado así por el propio puerto de esta ciudad y que no se pesca en tal cantidad en ningún otro sitio. Nemuro es la terminal más oriental de la línea, pero la estación realmente más oriental de Japón es Higashi-Nemuro, una parada atrás en la misma vía.|Les bateaux débarquent ici le crabe hanasaki, nommé d'après le port même de cette ville et introuvable ailleurs en telles quantités. Nemuro est le terminus le plus oriental de la ligne, mais la gare vraiment la plus orientale du Japon est Higashi-Nemuro, un arrêt plus tôt sur la même voie.|花咲がにはこの町の港の名を冠したカニで、これほどまとまって獲れる場所は他にない。根室は路線の最東の終着駅だが、日本で本当に最も東にある駅は一つ手前の東根室である。",
    [
      prop("Hanasaki Crab Wharf|Muelle del cangrejo hanasaki|Quai du crabe hanasaki|花咲がにの岸壁", 260, 54),
      prop("Cape Nosappu Lookout|Mirador del cabo Nosappu|Belvédère du cap Nosappu|納沙布岬の展望台", 210, 44),
    ],
  ),
  teshikaga: city(
    "Teshikaga|Teshikaga|Teshikaga|弟子屈",
    144.44, 43.48, "tou", "calderalake", "volcanicplain", "r",
    "A lake once measured as one of the clearest on Earth|Un lago medido en su día como uno de los más transparentes de la Tierra|Un lac autrefois mesuré parmi les plus limpides de la Terre|かつて世界屈指の透明度を記録した湖",
    "In 1931 the water of Lake Mashu, a caldera lake with no visible inflow or outflow, was measured at 41.6 metres of clarity, among the highest ever recorded anywhere in the world. The town also sits beside Mount Iō, a volcano that still vents visible sulphurous steam from bare orange rock.|En 1931, el agua del lago Mashu, un lago de caldera sin entrada ni salida visible, se midió con una transparencia de 41,6 metros, entre las más altas jamás registradas en el mundo. El pueblo también está junto al monte Iō, un volcán que aún emite visible vapor sulfuroso desde roca naranja desnuda.|En 1931, l'eau du lac Mashu, un lac de caldeira sans afflux ni écoulement visible, fut mesurée à 41,6 mètres de transparence, parmi les plus hautes jamais enregistrées au monde. La ville se trouve aussi à côté du mont Iō, un volcan qui dégage encore une vapeur sulfureuse visible depuis une roche orange nue.|1931年、流入も流出も見えないカルデラ湖・摩周湖の水は透明度41.6mを記録し、当時世界でも屈指の値だった。町のそばにある硫黄山は、いまも裸の橙色の岩肌から目に見える硫黄の噴気を上げ続けている。",
    [
      prop("Caldera Lake Observation Deck|Mirador del lago de caldera|Belvédère du lac de caldeira|カルデラ湖の展望台", 240, 50),
      prop("Sulphur Vent Trail Hut|Cabaña del sendero de fumarolas|Cabane du sentier des fumerolles|硫黄の噴気孔の遊歩道小屋", 200, 42),
    ],
  ),
  shibecha: city(
    "Shibecha|Shibecha|Shibecha|標茶",
    144.68, 43.35, "tou", "dairycow", "wetlandedge", "l",
    "A line that survived, at the edge of a marsh that stayed wild|Una línea que sobrevivió, al borde de un pantano que siguió salvaje|Une ligne qui a survécu, à la lisière d'un marais resté sauvage|生き残った路線と、野生のままの湿原の縁",
    "The Senmō Main Line still runs its full length through here between Kushiro and Abashiri, one of the region's rail routes that never made the closure lists. The town sits at the edge of the Kushiro wetlands and the dairy pastures of the Konsen Plateau, where cattle now far outnumber people.|La línea principal Senmō todavía recorre toda su longitud por aquí entre Kushiro y Abashiri, una de las rutas ferroviarias de la región que nunca entró en las listas de cierre. El pueblo está en el borde de los humedales de Kushiro y los pastos lecheros de la meseta de Konsen, donde el ganado hoy supera con creces a las personas.|La ligne principale Senmō traverse encore ici toute sa longueur entre Kushiro et Abashiri, l'une des lignes ferroviaires de la région qui n'a jamais figuré sur les listes de fermeture. La ville se trouve à la lisière des zones humides de Kushiro et des pâturages laitiers du plateau de Konsen, où le bétail dépasse aujourd'hui largement les habitants en nombre.|釧網本線は今もここを通って釧路と網走の間を全線走り続けており、この地域では廃止対象に挙がらなかった路線の一つである。町は釧路湿原の縁と根釧台地の酪農地帯の境にあり、牛の数は人の数をはるかに上回る。",
    [
      prop("Konsen Plateau Dairy Barn|Establo lechero de la meseta de Konsen|Étable laitière du plateau de Konsen|根釧台地の牛舎", 220, 46),
      prop("Wetland-Edge Viewing Deck|Mirador del borde del humedal|Belvédère de la lisière du marais|湿原縁の展望デッキ", 200, 42),
    ],
  ),
  akkeshi: city(
    "Akkeshi|Akkeshi|Akkeshi|厚岸",
    144.85, 43.05, "tou", "oyster", "baycoast", "r",
    "A bay praised by Edo-era travellers for its oysters|Una bahía elogiada por los viajeros de la era Edo por sus ostras|Une baie louée par les voyageurs de l'ère Edo pour ses huîtres|江戸期の紀行文が牡蠣を讃えた湾",
    "Edo-period travel writers already praised the oysters of this bay centuries ago, and Akkeshi remains one of Japan's leading oyster-growing areas today. Since the 1990s growers here have used single-seed suspension methods adapted from French oyster farms to raise a year-round harvest.|Los escritores de viajes del periodo Edo ya elogiaban las ostras de esta bahía hace siglos, y Akkeshi sigue siendo hoy una de las principales zonas ostrícolas de Japón. Desde los años 90, los productores usan aquí métodos de cultivo en suspensión de semilla única adaptados de las ostrerías francesas para obtener una cosecha durante todo el año.|Les écrivains de voyage de l'ère Edo louaient déjà les huîtres de cette baie il y a des siècles, et Akkeshi reste aujourd'hui l'une des principales zones ostréicoles du Japon. Depuis les années 1990, les producteurs y utilisent des méthodes de culture en suspension à graine unique adaptées des huîtrières françaises pour une récolte toute l'année.|江戸時代の紀行文にもすでにこの湾の牡蠣が讃えられており、厚岸は今も日本有数の牡蠣の産地である。1990年代以降、生産者はフランスの牡蠣養殖にならったシングルシード方式を取り入れ、一年を通じた収穫を実現している。",
    [
      prop("Single-Seed Oyster Raft|Balsa de ostras de semilla única|Radeau d'huîtres à graine unique|シングルシード牡蠣の養殖筏", 260, 54),
      prop("Edo-Era Oyster Trade Marker|Marcador del comercio de ostras de la era Edo|Marqueur du commerce d'huîtres de l'ère Edo|江戸期の牡蠣交易の跡碑", 190, 40),
    ],
  ),
  betsukai: city(
    "Betsukai|Betsukai|Betsukai|別海",
    145.10, 43.35, "tou", "dairycow", "grassland", "l",
    "More dairy cattle than any other town in Japan|Más vacas lecheras que ningún otro pueblo de Japón|Plus de vaches laitières que toute autre ville du Japon|日本のどの町よりも多い酪農牛",
    "This grassland town is reported to hold more dairy cattle than any other municipality in Japan, with herds that far outnumber its roughly 14,000 human residents. The old Shibetsu Line once split here on its way to two separate coastal termini before its closure in 1989.|Se dice que este pueblo de pastizales tiene más vacas lecheras que cualquier otro municipio de Japón, con rebaños que superan con creces a sus aproximadamente 14.000 habitantes. La antigua línea Shibetsu se dividía aquí antes de camino a dos terminales costeras distintas, hasta su cierre en 1989.|Cette ville de prairies compterait plus de vaches laitières qu'aucune autre municipalité du Japon, avec des troupeaux dépassant largement ses quelque 14 000 habitants. L'ancienne ligne Shibetsu s'y séparait autrefois en route vers deux terminus côtiers distincts, avant sa fermeture en 1989.|この草原の町は、日本のどの自治体よりも多い酪農牛を抱えるとされ、その数はおよそ1万4千人の住民をはるかに上回る。かつての標津線はここで二つの海側の終着駅へ分かれており、1989年に廃止された。",
    [
      prop("Konsen Grassland Dairy Ranch|Rancho lechero de la pradera de Konsen|Ranch laitier de la prairie de Konsen|根釧原野の酪農牧場", 250, 52),
      prop("Former Line-Split Marker|Marcador del antiguo empalme de la línea|Marqueur de l'ancienne bifurcation de la ligne|旧線分岐の跡碑", 180, 38),
    ],
  ),
  nakashibetsu: city(
    "Nakashibetsu|Nakashibetsu|Nakashibetsu|中標津",
    144.97, 43.55, "tou", "airport", "grassland", "b",
    "A runway that replaced a closed railway|Una pista que sustituyó a un ferrocarril cerrado|Une piste qui a remplacé un chemin de fer fermé|廃線に代わった滑走路",
    "This grassland town has had its own airport since 1962, and when the Shibetsu Line that once served it closed in 1989, that small regional airport became eastern Hokkaidō's main link to the rest of Japan instead of a train. It now handles scheduled flights to Tokyo, over 900 km away.|Este pueblo de pastizales tiene su propio aeropuerto desde 1962, y cuando la línea Shibetsu que antes lo servía cerró en 1989, ese pequeño aeropuerto regional se convirtió en el principal enlace del este de Hokkaidō con el resto de Japón en lugar de un tren. Hoy gestiona vuelos regulares a Tokio, a más de 900 km.|Cette ville de prairies possède son propre aéroport depuis 1962, et quand la ligne Shibetsu qui la desservait ferma en 1989, ce petit aéroport régional devint le principal lien de l'est de Hokkaidō avec le reste du Japon, à la place d'un train. Il assure aujourd'hui des vols réguliers vers Tokyo, à plus de 900 km.|この草原の町は1962年から自前の空港を持ち、1989年にかつて通っていた標津線が廃止されると、鉄道に代わってこの小さな地方空港が道東と本州を結ぶ主要な足になった。いまも900km以上離れた東京への定期便が就航している。",
    [
      prop("Regional Airport Terminal|Terminal del aeropuerto regional|Terminal de l'aéroport régional|地方空港のターミナル", 280, 58),
      prop("Former Shibetsu Line Marker|Marcador de la antigua línea Shibetsu|Marqueur de l'ancienne ligne Shibetsu|旧標津線の跡碑", 170, 36),
    ],
  ),
  shibetsu: city(
    "Shibetsu|Shibetsu|Shibetsu|標津",
    145.13, 43.68, "tou", "salmon", "capecoast", "r",
    "A salmon river that outlasted the line built beside it|Un río de salmón que sobrevivió a la línea construida junto a él|Une rivière à saumon qui a survécu à la ligne construite à ses côtés|そばに敷かれた鉄道より長く残った鮭の川",
    "The salmon run up the Shibetsu River was central to Ainu subsistence here long before Japanese settlement, and fixed-net fisheries still land one of Hokkaidō's larger salmon catches each autumn. Its railway, the Shibetsu Line, closed completely in 1989.|La subida del salmón por el río Shibetsu fue central para la subsistencia ainu aquí mucho antes de la colonización japonesa, y las pesquerías de red fija todavía capturan una de las mayores cosechas de salmón de Hokkaidō cada otoño. Su ferrocarril, la línea Shibetsu, cerró por completo en 1989.|La remontée du saumon dans la rivière Shibetsu fut essentielle à la subsistance aïnoue ici bien avant la colonisation japonaise, et les pêcheries à filets fixes débarquent encore l'une des plus grandes prises de saumon de Hokkaidō chaque automne. Son chemin de fer, la ligne Shibetsu, ferma complètement en 1989.|標津川を遡る鮭は、日本人の入植よりずっと前からこの地のアイヌの人々の暮らしを支えていた。定置網漁は今も秋ごとに北海道有数の鮭の水揚げを続けている。この町の鉄道だった標津線は1989年に全線廃止された。",
    [
      prop("Fixed-Net Salmon Fishery|Pesquería de salmón de red fija|Pêcherie de saumon à filet fixe|鮭の定置網漁場", 240, 50),
      prop("Former Shibetsu Line Terminus|Antigua terminal de la línea Shibetsu|Ancien terminus de la ligne Shibetsu|旧標津線の終着駅跡", 180, 38),
    ],
  ),
  rausu: city(
    "Rausu|Rausu|Rausu|羅臼",
    145.13, 44.04, "tou", "kelp", "capecoast", "l",
    "Kelp sold by the sheet, not the bundle|Alga kombu vendida por hoja, no por manojo|Du kombu vendu à la feuille, pas au paquet|束ではなく一枚で売られる昆布",
    "On the strait side of the Shiretoko peninsula, opposite the side most visitors reach, this port harvests rausu kombu, a kelp graded among the most prized in Japanese cooking and often sold sheet by sheet rather than in bulk. Fishing boats here work within sight of the Nemuro Strait's Russian-administered far shore.|En el lado del estrecho de la península de Shiretoko, opuesto al que alcanzan la mayoría de los visitantes, este puerto recoge kombu rausu, un alga clasificada entre las más apreciadas de la cocina japonesa y a menudo vendida hoja por hoja en vez de a granel. Los barcos de pesca faenan aquí a la vista de la orilla lejana administrada por Rusia del estrecho de Nemuro.|Sur le côté détroit de la péninsule de Shiretoko, opposé à celui que la plupart des visiteurs atteignent, ce port récolte le kombu de Rausu, une algue classée parmi les plus prisées de la cuisine japonaise et souvent vendue feuille par feuille plutôt qu'en vrac. Les bateaux de pêche y travaillent à vue de la rive lointaine du détroit de Nemuro, sous administration russe.|多くの旅行者が訪れる側とは反対の、知床半島の海峡側にあるこの港は羅臼昆布を産する。日本料理でも屈指の等級とされ、束ではなく一枚単位で売られることも多い。この町の漁船は、根室海峡の対岸に見えるロシア施政下の陸地を望みながら操業している。",
    [
      prop("Sheet-Graded Kombu Drying Rack|Secadero de kombu clasificado por hojas|Séchoir de kombu classé à la feuille|一枚売り昆布の乾燥棚", 250, 52),
      prop("Strait-Facing Fishing Harbour|Puerto pesquero frente al estrecho|Port de pêche face au détroit|海峡に面した漁港", 210, 44),
    ],
  ),
  ashoro: city(
    "Ashoro|Ashoro|Ashoro|足寄",
    143.52, 43.24, "tou", "guitar", "foresttown", "b",
    "A folk singer's hometown, on a line privatised and then closed anyway|El pueblo natal de un cantante folk, en una línea privatizada y cerrada de todos modos|Ville natale d'un chanteur folk, sur une ligne privatisée puis fermée quand même|民営化されても結局廃止された路線と、フォーク歌手の故郷",
    "Singer-songwriter Matsuyama Chiharu, one of Japan's best-known folk musicians, was born in this forested inland town. Its railway, the former JNR Chihoku Line, was handed to a third-sector company in 1989 to save it from closure, but the company itself shut the line down completely in 2006.|El cantautor Matsuyama Chiharu, uno de los músicos folk más conocidos de Japón, nació en este pueblo interior boscoso. Su ferrocarril, la antigua línea Chihoku de JNR, se traspasó a una empresa de tercer sector en 1989 para salvarlo del cierre, pero la propia empresa cerró la línea por completo en 2006.|L'auteur-compositeur-interprète Matsuyama Chiharu, l'un des musiciens folk les plus connus du Japon, est né dans cette ville forestière intérieure. Son chemin de fer, l'ancienne ligne Chihoku de la JNR, fut confié en 1989 à une société du tiers secteur pour lui éviter la fermeture, mais cette société ferma elle-même complètement la ligne en 2006.|日本を代表するフォーク歌手の一人、松山千春はこの森に囲まれた内陸の町の出身である。かつての国鉄池北線は、廃止を免れるため1989年に第三セクターへ引き継がれたが、その会社自身が2006年に路線を全面廃止した。",
    [
      prop("Folk Singer's Childhood House|Casa de la infancia del cantante folk|Maison d'enfance du chanteur folk|フォーク歌手の生家", 220, 46),
      prop("Third-Sector Railway Museum Car|Vagón museo del ferrocarril de tercer sector|Wagon-musée du chemin de fer du tiers secteur|第三セクター鉄道の保存車両", 200, 42),
    ],
  ),
  tsurui: city(
    "Tsurui|Tsurui|Tsurui|鶴居",
    144.24, 43.20, "tou", "crane", "wetlandedge", "r",
    "A bird brought back from a couple of dozen survivors|Un ave recuperada a partir de apenas dos docenas de supervivientes|Un oiseau ramené d'à peine deux douzaines de survivants|二十数羽の生き残りから復活した鳥",
    "The red-crowned crane was believed extinct in Japan until a small surviving population, thought to number only a couple of dozen birds, was found in the Kushiro marshes near here around 1924. Decades of protection have since grown that population to well over a thousand.|La grulla de corona roja se creía extinta en Japón hasta que se halló una pequeña población superviviente, con apenas dos docenas de aves, en los pantanos de Kushiro cerca de aquí hacia 1924. Décadas de protección han hecho crecer desde entonces esa población a más de mil ejemplares.|La grue à couronne rouge était crue éteinte au Japon jusqu'à ce qu'une petite population survivante, estimée à seulement deux douzaines d'oiseaux, soit découverte dans les marais de Kushiro non loin d'ici vers 1924. Des décennies de protection ont depuis fait croître cette population à bien plus d'un millier.|タンチョウは一時、日本では絶滅したと考えられていたが、1924年ごろ、この近くの釧路湿原でわずか二十数羽とされる生き残りの群れが見つかった。以来、数十年にわたる保護によってその数は千羽を大きく超えるまでに回復した。",
    [
      prop("Crane Winter Feeding Ground|Zona de alimentación invernal de grullas|Aire d'alimentation hivernale des grues|タンチョウの越冬給餌場", 240, 50),
      prop("Wetland Conservation Office|Oficina de conservación del humedal|Bureau de conservation de la zone humide|湿原保護のセンター", 200, 42),
    ],
  ),
};

/**
 * 路線(40都市・全接続)。
 *
 * 実在の鉄道網に基づいて組んである。廃止済みの路線もあえて含めており
 * (瀬棚線・天北線・名寄本線・歌志内線・松前線・江差線木古内―江差間・
 * 標津線・ふるさと銀河線=旧池北線・留萌本線)、盤面としては都市間の
 * 移動経路として機能させつつ、該当する都市カード側で「廃止された」
 * 事実を書いている。函館・札幌・旭川・釧路・帯広など日本盤側だけに
 * 載っている大都市はこの盤面に無いため、それらを経由する現実の経路は
 * 1本の橋渡し路線に圧縮してある(該当箇所にコメントで明記)。
 */
export const HOKKAIDO_EDGES = [
  // --- 道南 ---
  ["kikonai", "fukushima"],
  ["fukushima", "matsumae"], // 旧松前線(1988年廃止)
  ["kikonai", "esashi"], // 旧江差線 木古内―江差間(2014年廃止)
  ["esashi", "kaminokuni"],
  ["esashi", "okushiri", "sea"], // フェリー航路
  ["oshamambe", "setana"], // 旧瀬棚線(1987年廃止)
  ["esashi", "setana"], // check-sea-routes.mjs: 端を入れ替えて陸の上158px→0pxに
  ["mori", "kikonai"], // check-sea-routes.mjs: 端を入れ替えて陸の上16px→0pxに
  ["mori", "yakumo"],
  ["yakumo", "oshamambe"],
  // --- 道南→道央(長万部で山線・海線が分かれる現実の分岐点) ---
  ["oshamambe", "kutchan"],
  // --- 道央 ---
  ["kutchan", "chitose"],
  ["chitose", "tomakomai"],
  ["tomakomai", "shiraoi"],
  ["chitose", "ebetsu"], // 札幌(この盤面に無い)を挟む区間を1本に圧縮
  ["ebetsu", "iwamizawa"],
  ["ebetsu", "ishikari"],
  ["iwamizawa", "yubari"],
  ["iwamizawa", "shiraoi"],
  ["iwamizawa", "bibai"],
  ["bibai", "utashinai"], // 旧歌志内線(1988年廃止)
  // --- 道央→道北(留萌本線・宗谷本線とも、深川・旭川を挟む区間を圧縮) ---
  ["ebetsu", "rumoi"],
  ["bibai", "nayoro"],
  // --- 道央→道東(石勝線。夕張支線の分岐点そのものが道東への幹線でもある) ---
  ["yubari", "ashoro"],
  // --- 道北 ---
  ["rumoi", "mashike"], // 旧留萌本線 増毛延伸区間(2016年廃止)
  ["rumoi", "haboro"], // 旧羽幌線(1987年廃止)
  ["haboro", "enbetsu"],
  ["enbetsu", "toyotomi"],
  ["nayoro", "otoineppu"],
  ["otoineppu", "toyotomi"],
  ["otoineppu", "nakatonbetsu"], // 旧天北線(1989年廃止)
  ["toyotomi", "horonobe"],
  ["nayoro", "shimokawa"], // 旧名寄本線(1989年廃止)
  // --- 道東 ---
  ["akkeshi", "nemuro"], // check-sea-routes.mjs: 端を入れ替えて陸の上22px→0pxに
  ["akkeshi", "shibecha"],
  ["shibecha", "teshikaga"],
  ["shibecha", "nakashibetsu"], // 旧標津線(1989年廃止)
  ["nakashibetsu", "shibetsu"],
  ["shibetsu", "rausu"],
  ["nakashibetsu", "betsukai"],
  ["betsukai", "nemuro"],
  ["shibecha", "tsurui"],
  ["tsurui", "ashoro"],
];
