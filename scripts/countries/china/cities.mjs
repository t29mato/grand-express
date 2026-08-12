/**
 * 中国の都市と路線。
 *
 * 地方区分は6つ(`hb` 華北 / `db` 東北 / `hd` 華東(湖北を含む) /
 * `hn` 華南(湖南を含む) / `xn` 西南 / `xb` 西北)。
 *
 * 48都市66路線。華北8 / 東北4 / 華東11 / 華南8 / 西南7 / 西北10。
 * 海南島へは航路("sea")、ラサへは青蔵鉄道にあたる1本の長距離路線で結ぶ。
 *
 * **台湾は含めていない。** 領有権の主張に立ち入らないための判断。
 *
 * 経度・緯度は実際の値。投影の範囲は geography.mjs の CHINA_PROJ を参照。
 *
 * ## `mark`(20種)
 *
 * | キー | 描くもの | 受け持つ町 |
 * |---|---|---|
 * | `palace`    | 丹青の宮殿 | 北京 |
 * | `potala`    | 高台の白亜の宮殿 | ラサ |
 * | `port`      | 起重機と船 | 天津・大連・青島・厦門・福州 |
 * | `grotto`    | 崖に彫られた仏 | 大同・洛陽・敦煌・楽山 |
 * | `craft`     | 窯・水車・市 | 太原・蘭州・西寧・長沙 |
 * | `fortress`  | 城壁と城門 | 平遥・嘉峪関・南京 |
 * | `grassland` | 蒙古包と草原 | フフホト |
 * | `tomb`      | 陵墓 | 西安・銀川 |
 * | `industry`  | 煙突と工場 | 瀋陽・長春 |
 * | `ice`       | 氷の彫刻 | ハルビン |
 * | `skyline`   | 高層ビル群 | 上海・広州・深圳・重慶 |
 * | `garden`    | 太湖石と回廊 | 蘇州・承徳 |
 * | `lake`      | 水面と橋 | 杭州・済南 |
 * | `mountain`  | 切り立った峰 | 黄山・桂林・張家界・貴陽・張掖 |
 * | `temple`    | 廟と楼閣 | 曲阜・武漢 |
 * | `coast`     | 波とヤシ | 海口・三亜 |
 * | `panda`     | パンダ | 成都 |
 * | `flowerfield` | 花畑・段々畑 | 昆明・南寧 |
 * | `oldtown`   | 木造の水郷の町並み | 麗江 |
 * | `bazaar`    | 市場の天幕 | ウルムチ・トルファン・カシュガル |
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const CHINA_CITIES = {
  // ---------------------------------------------------------------------
  // hb — 華北
  // ---------------------------------------------------------------------
  beijing: city(
    "Beijing|Pekín|Pékin|北京",
    116.40, 39.90, "hb", "palace", "capital", "r",
    "A city built around an axis a king would walk|Una ciudad trazada en torno al eje que caminaba un rey|Une ville tracée autour de l'axe que foulait un roi|王が歩く軸線を中心に建てられた都",
    "The Forbidden City was raised in just fourteen years from 1406 using more than a million labourers, and its buildings are arranged along a single north–south line that the emperor alone could walk the length of. Tradition says it holds 9,999.5 rooms, kept half a room short of the 10,000 said to belong to heaven alone.|La Ciudad Prohibida se alzó en solo catorce años desde 1406 con más de un millón de trabajadores, y sus edificios se alinean en un único eje norte-sur que solo el emperador podía recorrer entero. La tradición dice que tiene 9.999,5 habitaciones.|La Cité interdite fut bâtie en quatorze ans à peine à partir de 1406 par plus d'un million d'ouvriers, et ses bâtiments s'alignent sur un unique axe nord-sud que seul l'empereur pouvait parcourir dans toute sa longueur.|紫禁城は1406年から、延べ100万人を超える人手でわずか14年で築かれた。建物群は南北に一本の軸線上に並び、その全長を歩けたのは皇帝ただ一人であった。言い伝えでは部屋数は9999部屋半で、天だけが持つとされる1万部屋にわざと半部屋足りないようにしてある。",
    [prop("Throne Hall Terrace|Terraza del salón del trono|Terrasse de la salle du trône|太和殿の月台", 2900, 598),
     prop("Hutong Courtyard House|Casa de patio del hutong|Maison à cour du hutong|胡同の四合院", 1300, 268)],
  ),
  tianjin: city(
    "Tianjin|Tianjin|Tianjin|天津",
    117.20, 39.13, "hb", "port", "port", "r",
    "Nine foreign concessions, one riverfront|Nueve concesiones extranjeras, un solo malecón|Neuf concessions étrangères, un seul front de fleuve|九つの租界が並んだ川岸",
    "After 1860 the city was carved into concessions run by nine foreign powers at once, each building in its own national style, so a single riverside walk still passes British, French, German, Italian and Austro-Hungarian facades in a few hundred metres. The comic dialogue art xiangsheng is held to have taken its modern form here.|Tras 1860 la ciudad se dividió en concesiones administradas a la vez por nueve potencias extranjeras, cada una construyendo en su propio estilo nacional.|Après 1860, la ville fut découpée en concessions administrées à la fois par neuf puissances étrangères, chacune bâtissant dans son propre style national.|1860年以後、この街は九つの外国勢力が同時に治める租界に分けられ、それぞれが自国の様式で建物を建てた。数百メートルの川沿いを歩くだけで英・仏・独・伊・墺の建物が並ぶ。掛け合い話芸の相声は、この街で今の形になったとされる。",
    [prop("Concession Riverfront Villa|Villa del malecón de la concesión|Villa du front de fleuve de la concession|租界の川岸の洋館", 780, 160),
     prop("Xiangsheng Teahouse|Casa de té de xiangsheng|Maison de thé du xiangsheng|相声の茶館", 420, 86)],
  ),
  chengde: city(
    "Chengde|Chengde|Chengde|承徳",
    117.94, 40.95, "hb", "garden", "garden", "l",
    "A summer capital built to look like everywhere else|Una capital de verano construida para parecerse a cualquier otro sitio|Une capitale d'été bâtie pour ressembler à partout ailleurs|どこにでも似せて建てた夏の都",
    "Qing emperors ruled from this mountain retreat for months at a time from 1703, and around its garden they built eight temples copying famous shrines from Tibet, Xinjiang and Mongolia, so distant subjects could see their own sacred buildings without the emperor ever having to travel to them. It remains the largest classical imperial garden in the country.|Los emperadores Qing gobernaron desde este retiro de montaña meses seguidos a partir de 1703, y en torno a su jardín levantaron ocho templos que copiaban santuarios famosos del Tíbet, Xinjiang y Mongolia.|Les empereurs Qing gouvernèrent depuis cette retraite de montagne des mois durant à partir de 1703, et autour de son jardin ils bâtirent huit temples copiant des sanctuaires célèbres du Tibet, du Xinjiang et de Mongolie.|清朝の皇帝たちは1703年から、この山あいの離宮に数か月も滞在して政務をとった。庭園の周りにはチベット・新疆・モンゴルの有名な寺院を模した八つの廟を建て、遠方の民が自分たちの聖地をわざわざ皇帝の元まで来ずとも拝めるようにした。今も国内最大の古典的な皇室庭園である。",
    [prop("Eight Outer Temples Path|Sendero de los ocho templos exteriores|Chemin des huit temples extérieurs|外八廟の参道", 460, 96),
     prop("Mountain Retreat Pavilion|Pabellón del retiro de montaña|Pavillon de la retraite de montagne|避暑山荘の楼閣", 380, 78)],
  ),
  datong: city(
    "Datong|Datong|Datong|大同",
    113.30, 40.08, "hb", "grotto", "valley", "l",
    "Fifty-one thousand carved faces on one cliff|Cincuenta y un mil rostros tallados en un solo acantilado|Cinquante et un mille visages taillés dans une même falaise|一つの崖に彫られた五万一千の顔",
    "Work began on the Yungang Grottoes around 460, and over decades stonecutters carved 51,000 Buddhist figures into a single sandstone cliff, the largest just under 17 metres tall. The city built its modern economy on coal seams that sit almost directly beneath the grottoes' feet.|El trabajo en las Grutas de Yungang comenzó hacia el año 460, y a lo largo de décadas los canteros tallaron 51.000 figuras budistas en un solo acantilado de arenisca, la mayor de casi 17 metros.|Le chantier des grottes de Yungang débuta vers 460, et au fil des décennies des tailleurs de pierre sculptèrent 51 000 figures bouddhiques dans une seule falaise de grès, la plus grande atteignant près de 17 mètres.|雲崗石窟の造営は460年ごろに始まり、数十年をかけて石工たちが一つの砂岩の崖に51,000体の仏像を彫った。最大のものは高さ17mに迫る。この街の近代の経済は、その石窟のほとんど真下に眠る石炭層の上に築かれた。",
    [prop("Grotto Cliff Walkway|Pasarela del acantilado de las grutas|Passerelle de la falaise aux grottes|石窟の崖の回廊", 640, 132),
     prop("Coal Seam Rail Yard|Patio ferroviario de la veta de carbón|Cour ferroviaire du gisement de charbon|炭層の操車場", 320, 66)],
  ),
  taiyuan: city(
    "Taiyuan|Taiyuan|Taiyuan|太原",
    112.55, 37.87, "hb", "craft", "metro", "r",
    "A vinegar aged as long as a childhood|Un vinagre añejado tanto como una infancia|Un vinaigre vieilli aussi longtemps qu'une enfance|子供時代と同じだけ寝かせる酢",
    "Shanxi's aged vinegar is fermented and turned by hand in open urns for at least a year and sometimes far longer, a process locals say cannot be rushed by machine without losing the sourness that defines it. The province mines roughly a quarter of the country's coal, and Taiyuan grew as the refining city at its centre.|El vinagre añejo de Shanxi se fermenta y se voltea a mano en tinajas abiertas durante al menos un año, a veces mucho más, un proceso que los lugareños dicen que no se puede acelerar con máquinas.|Le vinaigre vieilli du Shanxi fermente et se retourne à la main dans des jarres ouvertes pendant au moins un an, parfois bien plus, un procédé que les habitants disent impossible à accélérer sans perdre son acidité.|山西の熟成酢は、開いた甕の中で少なくとも一年、時にはもっと長く、手で天地返しをしながら発酵させる。機械で急がせるとこの酸味は出ないと地元では言われる。山西省は国内の石炭のおよそ四分の一を産し、太原はその精製の中心として育った町である。",
    [prop("Aged Vinegar Cellar|Bodega de vinagre añejo|Cave à vinaigre vieilli|熟成酢の蔵", 460, 96),
     prop("Coal Refinery Overlook|Mirador de la refinería de carbón|Belvédère de la raffinerie de charbon|製炭所の展望", 380, 78)],
  ),
  pingyao: city(
    "Pingyao|Pingyao|Pingyao|平遥",
    112.17, 37.20, "hb", "fortress", "fortress", "l",
    "Where paper money could be trusted across a continent|Donde se podía confiar en el papel moneda a través de un continente|Où l'on pouvait faire confiance au papier-monnaie à travers un continent|紙の手形が大陸を越えて信じられた町",
    "A merchant house here opened the country's first draft bank in 1823, letting a trader deposit silver in one city and collect it in another without carrying the weight, on a network of branches that eventually reached most of the country. The 6-kilometre Ming city wall that ringed the operation still stands complete.|Una casa comercial abrió aquí el primer banco de letras del país en 1823, permitiendo depositar plata en una ciudad y recogerla en otra sin cargar el peso.|Une maison de commerce y ouvrit en 1823 la première banque de traites du pays, permettant de déposer de l'argent dans une ville et de le retirer dans une autre sans en porter le poids.|1823年、この町の商家が国内初の為替を扱う票号を開いた。ある町で銀を預ければ、重さを運ばずに別の町で引き出せる仕組みで、支店網はやがて国のほとんどに広がった。その商いを囲んだ全長6kmの明代の城壁は、いまも切れ目なく残っている。",
    [prop("Draft Bank Counting House|Casa de cambio del banco de letras|Comptoir de change de la banque de traites|票号の勘定場", 620, 128),
     prop("City Wall Watchtower|Torre de vigía de la muralla|Tour de guet du rempart|城壁の望楼", 460, 96)],
  ),
  hohhot: city(
    "Hohhot|Hohhot|Hohhot|フフホト",
    111.75, 40.84, "hb", "grassland", "farmland", "r",
    "A blue city named for its walls, not its sky|Una ciudad azul llamada así por sus muros, no por su cielo|Une ville bleue nommée pour ses murs, non pour son ciel|空ではなく壁にちなむ「青い街」",
    "The name means \"blue city\" in Mongolian, after the blue-grey brick of a temple wall built here in the 1570s rather than the colour of the steppe sky above it. Herders from the surrounding grassland still bring dairy into the city each morning, and cheese curd dried hard in the sun remains a common travelling snack.|El nombre significa «ciudad azul» en mongol, por el ladrillo gris azulado de un muro de templo del siglo XVI, no por el color del cielo de la estepa.|Le nom signifie « ville bleue » en mongol, d'après la brique gris-bleu d'un mur de temple bâti au XVIe siècle, non la couleur du ciel de la steppe.|「青い街」を意味するこの名は、頭上に広がる草原の空の色ではなく、1570年代に建てられた寺院の青灰色の煉瓦の壁に由来する。周りの草原の牧民はいまも毎朝乳製品を街へ運び、天日で固く干した乳菓子はいまも旅の携行食である。",
    [prop("Steppe Dairy Stall|Puesto lácteo de la estepa|Étal laitier de la steppe|草原の乳製品売り場", 340, 70),
     prop("Blue Temple Wall Quarter|Barrio del muro del templo azul|Quartier du mur du temple bleu|青い寺壁の街区", 420, 86)],
  ),
  luoyang: city(
    "Luoyang|Luoyang|Luoyang|洛陽",
    112.45, 34.62, "hb", "grotto", "ancienttomb", "r",
    "Thirteen dynasties chose this one river bend|Trece dinastías eligieron este mismo recodo del río|Treize dynasties choisirent ce même méandre du fleuve|十三の王朝が選んだ川の湾曲部",
    "Thirteen dynasties across some 1,500 years made this stretch of the Yellow River their capital, longer than any other city in the country claims the title. The Longmen Grottoes just south hold some 110,000 Buddhist carvings cut into limestone cliffs facing the river, and each April the city's peony gardens draw crowds who judge the bloom flower by flower.|Trece dinastías a lo largo de unos 1.500 años hicieron de este tramo del río Amarillo su capital, más tiempo que cualquier otra ciudad del país. Las Grutas de Longmen, justo al sur, guardan unas 110.000 tallas budistas.|Treize dynasties sur quelque 1 500 ans firent de ce tronçon du fleuve Jaune leur capitale, plus longtemps qu'aucune autre ville du pays. Les grottes de Longmen, juste au sud, recèlent quelque 110 000 sculptures bouddhiques.|およそ1500年のあいだに十三の王朝がこの黄河の湾曲部を都と定めた。国内のどの都市よりも長く都であり続けた土地である。南の龍門石窟には川に面した石灰岩の崖に彫られた仏像がおよそ11万体あり、四月には牡丹園に一輪ずつ咲き具合を見比べる客が集まる。",
    [prop("Longmen Cliff Overlook|Mirador del acantilado de Longmen|Belvédère de la falaise de Longmen|龍門石窟の崖の展望", 680, 140),
     prop("Peony Garden Pavilion|Pabellón del jardín de peonías|Pavillon du jardin de pivoines|牡丹園の楼閣", 400, 82)],
  ),

  // ---------------------------------------------------------------------
  // db — 東北
  // ---------------------------------------------------------------------
  shenyang: city(
    "Shenyang|Shenyang|Shenyang|瀋陽",
    123.43, 41.80, "db", "industry", "metro", "r",
    "A smaller palace built before the bigger one|Un palacio menor construido antes que el mayor|Un palais plus modeste bâti avant le plus grand|もっと大きな宮殿より先に建った小さな宮殿",
    "The Manchu rulers built their own palace here in the 1620s, two decades before they took Beijing and moved into the Forbidden City, and its throne hall mixes Manchu, Mongolian and Han styles in a way the later, more formal Beijing palace does not. Shenyang grew through the twentieth century into one of the country's heaviest industrial cities, built on steel and machinery.|Los gobernantes manchúes construyeron aquí su propio palacio en la década de 1620, dos décadas antes de tomar Pekín y mudarse a la Ciudad Prohibida.|Les souverains mandchous bâtirent ici leur propre palais dans les années 1620, deux décennies avant de prendre Pékin et de s'installer dans la Cité interdite.|満州の支配者たちは1620年代、北京を取って紫禁城に移る二十年も前に、この地に自分たちの宮殿を建てた。その正殿は満・蒙・漢の様式を混ぜ合わせており、のちのより形式張った北京の宮殿には見られない特徴である。瀋陽は20世紀を通じて、鉄鋼と機械を軸にした国内屈指の重工業都市に育った。",
    [prop("Mukden Palace Throne Hall|Salón del trono del Palacio de Mukden|Salle du trône du palais de Moukden|瀋陽故宮の正殿", 720, 148),
     prop("Heavy Machinery Works|Fábrica de maquinaria pesada|Usine de machines lourdes|重機械工場", 460, 96)],
  ),
  dalian: city(
    "Dalian|Dalian|Dalian|大連",
    121.62, 38.91, "db", "port", "port", "r",
    "A port two empires built before it was Chinese again|Un puerto que dos imperios construyeron antes de volver a ser chino|Un port bâti par deux empires avant de redevenir chinois|中国に戻る前に二つの帝国が築いた港",
    "Russia leased the tip of this peninsula in 1898 and laid out a European-style city with radial boulevards, then Japan took it after 1905 and expanded it further before it returned to Chinese control after 1945, so the street plan still reads like a European seaside town rather than a typical Chinese port city.|Rusia arrendó la punta de esta península en 1898 y trazó una ciudad de estilo europeo con bulevares radiales; luego Japón la tomó tras 1905 y la amplió aún más.|La Russie loua la pointe de cette péninsule en 1898 et y traça une ville de style européen aux boulevards rayonnants ; le Japon la prit ensuite après 1905 et l'agrandit encore.|ロシアは1898年、この半島の先端を租借し、放射状の大通りを持つヨーロッパ風の街を築いた。1905年以降は日本がこれを引き継いでさらに広げ、1945年以後に中国へ戻った。街路の形はいまも典型的な中国の港町というより、ヨーロッパの海辺の町のように見える。",
    [prop("Radial Boulevard Square|Plaza del bulevar radial|Place du boulevard rayonnant|放射状大通りの広場", 620, 128),
     prop("Naval Dockyard Quay|Muelle del astillero naval|Quai du chantier naval|軍港の埠頭", 480, 100)],
  ),
  changchun: city(
    "Changchun|Changchun|Changchun|長春",
    125.32, 43.88, "db", "industry", "industrial", "l",
    "A puppet capital's boulevards became a car company's streets|Los bulevares de una capital títere se hicieron calles de una automotriz|Les boulevards d'une capitale fantoche devinrent les rues d'un constructeur automobile|傀儡国家の大通りが自動車会社の通りになった",
    "Japan made this city the capital of the puppet state of Manchukuo in 1932 and laid out grand government boulevards that still form the skeleton of downtown streets today. In 1953 the country's first car factory opened here, and Changchun still builds a large share of the nation's vehicles on the same industrial ground.|Japón hizo de esta ciudad la capital del estado títere de Manchukuo en 1932 y trazó grandes bulevares gubernamentales que hoy siguen siendo el esqueleto de las calles del centro.|Le Japon fit de cette ville la capitale de l'État fantoche du Mandchoukouo en 1932 et y traça de grands boulevards gouvernementaux qui forment encore l'ossature des rues du centre.|日本は1932年、この街を満州国の首都とし、堂々とした官庁街の大通りを敷いた。それはいまも中心街の骨格をなしている。1953年には国内初の自動車工場がここに開業し、長春はいまも同じ工業用地の上で国内の車の大きな割合を作り続けている。",
    [prop("Puppet Capital Boulevard|Bulevar de la capital títere|Boulevard de la capitale fantoche|傀儡国家の官庁大通り", 480, 100),
     prop("First Auto Works Gate|Puerta de la primera fábrica de autos|Porte de la première usine automobile|第一汽車製造廠の正門", 560, 116)],
  ),
  harbin: city(
    "Harbin|Harbin|Harbin|ハルビン",
    126.53, 45.80, "db", "ice", "ski", "r",
    "A railway junction that came with a Russian church attached|Un cruce ferroviario que trajo consigo una iglesia rusa|Un nœud ferroviaire venu avec une église russe|ロシア正教の聖堂を伴ってきた鉄道の分岐点",
    "Russian engineers building a rail junction here in the 1890s brought so many workers and settlers that the city grew up speaking Russian before it spoke much Mandarin, and the onion-domed Saint Sophia Cathedral they built in 1907 still stands downtown. Each winter the frozen river supplies ice blocks for a festival whose sculptures can stand several storeys tall.|Los ingenieros rusos que construyeron aquí un nudo ferroviario en la década de 1890 trajeron tantos obreros y colonos que la ciudad creció hablando ruso antes que mandarín.|Les ingénieurs russes qui construisirent ici un nœud ferroviaire dans les années 1890 amenèrent tant d'ouvriers et de colons que la ville grandit en parlant russe avant de parler mandarin.|1890年代にここへ鉄道の分岐点を築いたロシア人技師たちは、多くの労働者と入植者を連れてきたため、この街は標準中国語より先にロシア語を話す街として育った。1907年に彼らが建てたタマネギ屋根の聖ソフィア大聖堂はいまも中心街に立つ。毎冬、凍った川から切り出す氷塊を使う祭りでは、何階分もの高さの彫刻が作られる。",
    [prop("Ice Sculpture Festival Ground|Recinto del festival de esculturas de hielo|Site du festival de sculptures de glace|氷彫刻祭りの会場", 560, 116),
     prop("Onion-Domed Cathedral Square|Plaza de la catedral de cúpulas de cebolla|Place de la cathédrale aux bulbes|玉ねぎ屋根の大聖堂前広場", 420, 86)],
  ),

  // ---------------------------------------------------------------------
  // hd — 華東(湖北を含む)
  // ---------------------------------------------------------------------
  shanghai: city(
    "Shanghai|Shanghái|Shanghai|上海",
    121.47, 31.23, "hd", "skyline", "capital", "r",
    "A fishing town that sank itself building upward|Un pueblo pesquero que se hundió al construir hacia arriba|Un village de pêcheurs qui s'enfonça en construisant vers le haut|高く建てるうちに自ら沈んだ漁村",
    "The city sank roughly 2.6 metres over the twentieth century as its own growth pumped the groundwater beneath it dry, and water is now injected back into the ground each winter to keep its towers level. The riverside Bund still carries the stone facades of 1920s foreign banks, directly across the water from a skyline of towers built after 1990.|La ciudad se hundió unos 2,6 metros a lo largo del siglo XX porque su propio crecimiento vació el agua subterránea, y ahora cada invierno se inyecta agua de vuelta para mantener sus torres a nivel.|La ville s'est enfoncée d'environ 2,6 mètres au XXe siècle, sa propre croissance ayant asséché la nappe phréatique, et l'on réinjecte désormais de l'eau chaque hiver pour maintenir ses tours de niveau.|20世紀のあいだ、自らの成長が地下水を汲み尽くしたことで、この街は約2.6m沈んだ。いまは冬ごとに水を地中へ戻し、林立する塔の水平を保っている。川沿いの外灘には1920年代の外国銀行の石造りの建物がいまも並び、水を挟んだ対岸には1990年以降に建った塔の群れが立つ。",
    [prop("Bund Trading House|Casa de comercio del Bund|Maison de négoce du Bund|外灘の商館", 2600, 538),
     prop("Pudong Tower Observation Deck|Mirador de la torre de Pudong|Belvédère de la tour de Pudong|浦東の塔の展望台", 1400, 288)],
  ),
  nanjing: city(
    "Nanjing|Nanjing|Nanjing|南京",
    118.78, 32.06, "hd", "fortress", "fortress", "l",
    "A wall built with the bricklayer's name stamped on it|Una muralla construida con el nombre del albañil estampado en ella|Un rempart bâti avec le nom du briquetier gravé dessus|煉瓦職人の名を刻んで築いた城壁",
    "The Ming city wall raised from 1366 ran some 35 kilometres, the longest of its kind ever built, and each brick was stamped with the names of the kiln, the supervising official and the maker, so a cracked brick could be traced back and the responsible workshop punished. About 25 kilometres of the wall still stand.|La muralla Ming levantada desde 1366 recorría unos 35 kilómetros, la más larga de su tipo jamás construida, y cada ladrillo llevaba estampado el nombre del horno, el funcionario supervisor y el fabricante.|Le rempart Ming élevé à partir de 1366 courait sur quelque 35 kilomètres, le plus long jamais bâti de ce type, et chaque brique portait gravé le nom du four, du fonctionnaire responsable et de l'artisan.|1366年から築かれた明代の城壁は全長およそ35kmに及び、この種のものとしては史上最長である。煉瓦の一枚一枚に窯・監督官・作った職人の名が刻まれ、割れた煉瓦から責任のある工房をたどって罰することができた。いまも約25kmが残っている。",
    [prop("Brick Kiln Registry House|Casa de registro del horno de ladrillos|Maison de registre du four à briques|煉瓦窯の登記所", 680, 140),
     prop("City Wall Rampart Walk|Paseo de la muralla|Promenade du rempart|城壁の遊歩道", 540, 112)],
  ),
  suzhou: city(
    "Suzhou|Suzhou|Suzhou|蘇州",
    120.62, 31.32, "hd", "garden", "garden", "r",
    "Gardens built small enough to hold a whole world|Jardines hechos lo bastante pequeños para contener un mundo entero|Des jardins assez petits pour contenir un monde entier|世界を丸ごと収めるほど小さく作った庭園",
    "Retired officials built more than two hundred private gardens here from the eleventh century on, each compressing a mountain, a lake, a forest and a village into a courtyard the visitor could cross in minutes, using borrowed views and false perspective to make a small plot feel boundless. Nine of them are listed together as a single World Heritage site.|Funcionarios retirados construyeron aquí más de doscientos jardines privados desde el siglo XI, cada uno comprimiendo una montaña, un lago, un bosque y una aldea en un patio que se cruzaba en minutos.|Des fonctionnaires retirés y bâtirent plus de deux cents jardins privés dès le XIe siècle, chacun comprimant une montagne, un lac, une forêt et un village en une cour que l'on traversait en quelques minutes.|11世紀以降、退官した官吏たちがここに二百を超える個人庭園を築いた。それぞれが山・湖・林・村を、数分で歩き切れる中庭のなかに借景と偽の遠近法で圧縮し、狭い敷地を果てしなく感じさせた。うち九つが一つの世界遺産としてまとめて登録されている。",
    [prop("Borrowed-View Garden Pavilion|Pabellón del jardín de vista prestada|Pavillon du jardin en vue empruntée|借景の庭園の楼閣", 720, 148),
     prop("Silk Embroidery Workshop|Taller de bordado de seda|Atelier de broderie de soie|刺繍の工房", 480, 100)],
  ),
  hangzhou: city(
    "Hangzhou|Hangzhou|Hangzhou|杭州",
    120.16, 30.29, "hd", "lake", "lakeside", "l",
    "A lake kept exactly as poets described it|Un lago mantenido exactamente como lo describieron los poetas|Un lac maintenu exactement tel que les poètes l'ont décrit|詩人が詠んだそのままに保たれた湖",
    "A ninth-century poet-governor dredged silt from West Lake to build a causeway across it, and ever since, officials have periodically re-dredged the lake to keep it from the fate of most old lakes near cities, which silt up and vanish. Ten named views of the lake, fixed by the thirteenth century, are still the ones visitors seek out today.|Un poeta-gobernador del siglo IX dragó el lodo del Lago del Oeste para construir una calzada a través de él, y desde entonces los funcionarios lo han vuelto a dragar periódicamente.|Un poète-gouverneur du IXe siècle dragua la vase du lac de l'Ouest pour y bâtir une chaussée, et depuis lors, les fonctionnaires l'ont périodiquement redragué.|9世紀の詩人でもあった知事は西湖の泥を浚って堤を築き、以来、役人たちは定期的に湖を浚渫し続けてきた。放っておけば泥に埋もれて消える、都市近郊の古い湖の多くがたどった運命を免れるためである。13世紀までに定められた十の景勝は、いまも訪れる人が探し求める眺めである。",
    [prop("West Lake Causeway Teahouse|Casa de té de la calzada del lago|Maison de thé de la chaussée du lac|西湖の堤の茶屋", 640, 132),
     prop("Longjing Tea Terrace|Terraza de té Longjing|Terrasse de thé Longjing|龍井茶の段畑", 460, 96)],
  ),
  huangshan: city(
    "Huangshan|Huangshan|Huangshan|黄山",
    118.17, 30.13, "hd", "mountain", "valley", "r",
    "Granite towers that painters credit with inventing a whole style|Torres de granito a las que los pintores atribuyen la invención de todo un estilo|Des tours de granit auxquelles les peintres attribuent l'invention de tout un style|画家たちが一つの画風を生んだとする花崗岩の峰",
    "Seventy-two granite peaks rise almost sheer from a sea of cloud that fills the valleys most mornings, and painters of the Ming dynasty who came to sketch them are credited with founding an entire school of landscape art built on capturing exactly this scene. Pines rooted in bare rock crevices, kept alive on almost no soil, are named and numbered individually.|Setenta y dos picos de granito se alzan casi verticales sobre un mar de nubes que llena los valles casi cada mañana, y los pintores Ming que vinieron a dibujarlos fundaron toda una escuela paisajística.|Soixante-douze pics de granit s'élèvent presque à pic au-dessus d'une mer de nuages qui emplit les vallées presque chaque matin, et les peintres Ming venus les dessiner y fondèrent toute une école paysagère.|72の花崗岩の峰が、ほとんど毎朝谷を埋める雲海からほぼ垂直に立ち上がる。これを写生に来た明代の画家たちは、まさにこの景色を捉えることを土台にした山水画の一派をまるごと築いたとされる。岩の裂け目に根を張り、ほとんど土のないまま生きる松の木は、一本ずつ名と番号を与えられている。",
    [prop("Sea-of-Cloud Overlook Lodge|Albergue del mirador del mar de nubes|Gîte du belvédère de la mer de nuages|雲海の展望宿", 600, 124),
     prop("Named Pine Trailhead|Inicio del sendero del pino nombrado|Départ du sentier du pin nommé|名を持つ松の登山口", 420, 86)],
  ),
  qingdao: city(
    "Qingdao|Qingdao|Qingdao|青島",
    120.38, 36.07, "hd", "port", "port", "l",
    "A brewery that outlasted the empire that built it|Una cervecería que sobrevivió al imperio que la construyó|Une brasserie qui a survécu à l'empire qui l'a bâtie|それを築いた帝国より長生きした醸造所",
    "Germany leased this port in 1898 and laid red-tiled, half-timbered buildings across its hills along with a brewery founded in 1903 using German equipment and a local mineral spring; the beer outlasted the colonial lease by more than a century and is now sold under the city's own name worldwide. Much of the German-era townscape survives intact.|Alemania arrendó este puerto en 1898 y levantó edificios de tejas rojas y entramado de madera por sus colinas, junto con una cervecería fundada en 1903 con maquinaria alemana y un manantial mineral local.|L'Allemagne loua ce port en 1898 et couvrit ses collines de bâtiments à tuiles rouges et à colombages, avec une brasserie fondée en 1903 grâce à des machines allemandes et une source minérale locale.|ドイツは1898年にこの港を租借し、丘の斜面に赤瓦とハーフティンバーの建物を建て並べた。1903年にはドイツの設備と地元の鉱泉を使った醸造所も開いた。そのビールは租借地としての百年余りの命脈を超えて生き延び、いまは街の名を冠して世界で売られている。ドイツ統治時代の街並みの多くはいまも残っている。",
    [prop("Half-Timbered Brewery Hall|Sala de la cervecería entramada|Salle de la brasserie à colombages|ハーフティンバーの醸造場", 680, 140),
     prop("Hillside Red-Tile Quarter|Barrio de tejas rojas de la ladera|Quartier de tuiles rouges du coteau|丘の赤瓦の街区", 460, 96)],
  ),
  jinan: city(
    "Jinan|Jinan|Jinan|済南",
    117.00, 36.65, "hd", "lake", "lakeside", "r",
    "A city with seventy-two named springs under its streets|Una ciudad con setenta y dos manantiales nombrados bajo sus calles|Une ville aux soixante-douze sources nommées sous ses rues|通りの下に七十二の名泉を持つ街",
    "Underground karst channels push water up through seventy-two named springs scattered across the old city, some strong enough to bubble visibly in the middle of a public square, and residents still fill bottles at the largest of them each morning rather than buying water. The springs run dry only when regional groundwater is pumped too hard, which has happened and been reversed more than once.|Canales cársticos subterráneos empujan agua hacia arriba a través de setenta y dos manantiales nombrados repartidos por la ciudad vieja, algunos lo bastante fuertes como para burbujear visiblemente en medio de una plaza pública.|Des chenaux karstiques souterrains font remonter l'eau à travers soixante-douze sources nommées disséminées dans la vieille ville, certaines assez puissantes pour buller visiblement au milieu d'une place publique.|地下の石灰岩の水路が、旧市街に散らばる七十二の名のついた泉から水を押し上げる。中には公共広場のただ中で目に見えて湧き出るほど勢いの強いものもあり、住民はいまも毎朝、水を買う代わりに最大の泉で瓶を満たす。泉が涸れるのは地下水を汲みすぎたときだけで、それも過去に何度か直されてきた。",
    [prop("Bubbling Spring Square|Plaza del manantial burbujeante|Place de la source bouillonnante|湧き出る泉の広場", 460, 96),
     prop("Karst Channel Teahouse|Casa de té del canal cárstico|Maison de thé du chenal karstique|石灰岩の水路の茶屋", 340, 70)],
  ),
  qufu: city(
    "Qufu|Qufu|Qufu|曲阜",
    116.99, 35.60, "hd", "temple", "temple", "l",
    "A single family kept one address for 2,500 years|Una sola familia mantuvo una misma dirección durante 2.500 años|Une seule famille garda la même adresse durant 2 500 ans|一族が2500年守り続けた一つの住まい",
    "Confucius's descendants have lived on the same mansion grounds next to his temple for roughly 2,500 years, making it one of the longest continuously held family estates anywhere, and the temple itself grew over the centuries into a walled complex nearly the size of the Forbidden City. Cypress trees planted by early followers still stand in its courtyards.|Los descendientes de Confucio han vivido en los mismos terrenos de la mansión junto a su templo durante unos 2.500 años, lo que la convierte en una de las fincas familiares más antiguas del mundo en uso continuo.|Les descendants de Confucius vivent sur le même domaine familial jouxtant son temple depuis quelque 2 500 ans, ce qui en fait l'un des plus anciens domaines familiaux occupés sans interruption au monde.|孔子の子孫は、その廟のすぐ隣の同じ屋敷におよそ2500年住み続けてきた。世界でも指折りの、途切れず受け継がれてきた一族の邸宅である。廟そのものも世紀を重ねるうちに、紫禁城に迫る広さの塀に囲まれた一郭に育った。初期の門弟が植えた糸杉はいまも中庭に立つ。",
    [prop("Ancestral Mansion Courtyard|Patio de la mansión ancestral|Cour du manoir ancestral|孔府の中庭", 560, 116),
     prop("Cypress-Lined Temple Approach|Acceso al templo bordeado de cipreses|Allée du temple bordée de cyprès|糸杉並木の参道", 420, 86)],
  ),
  xiamen: city(
    "Xiamen|Xiamen|Xiamen|厦門",
    118.08, 24.48, "hd", "port", "seaside", "r",
    "An island where cars were never allowed to follow the money|Una isla donde nunca se dejó entrar a los coches, aunque sí al dinero|Une île où l'argent entra, jamais les voitures|金は入っても車は入らせなかった島",
    "Merchants who made fortunes overseas built ornate mansions blending Chinese, Southeast Asian and European styles on the small island of Gulangyu just offshore, and the island has banned motor vehicles since it was settled, so the only traffic on its lanes today is bicycles, handcarts and pedestrians. Xiamen itself became one of the country's first special economic zones in 1980.|Comerciantes que hicieron fortuna en el extranjero construyeron mansiones ornamentadas que mezclan estilos chinos, del sudeste asiático y europeos en la pequeña isla de Gulangyu, frente a la costa.|Des marchands enrichis outre-mer bâtirent des demeures ornées mêlant styles chinois, d'Asie du Sud-Est et européens sur la petite île de Gulangyu, au large.|海外で財をなした商人たちは、沖合の小島・鼓浪嶼に中国・東南アジア・欧州の様式を混ぜた凝った邸宅を建てた。この島は開かれて以来、車両の通行を禁じており、いまも路地を行くのは自転車と手押し車と歩く人だけである。厦門そのものは1980年、国内最初期の経済特区の一つになった。",
    [prop("Gulangyu Mansion Verandah|Galería de la mansión de Gulangyu|Véranda du manoir de Gulangyu|鼓浪嶼の洋館のベランダ", 620, 128),
     prop("Special Economic Zone Pier|Muelle de la zona económica especial|Jetée de la zone économique spéciale|経済特区の埠頭", 480, 100)],
  ),
  fuzhou: city(
    "Fuzhou|Fuzhou|Fuzhou|福州",
    119.30, 26.08, "hd", "port", "port", "l",
    "A soup that had to be sealed shut to keep its name|Una sopa que hubo que sellar para conservar su nombre|Une soupe qu'il fallut sceller pour garder son nom|名を守るために封をしなければならないスープ",
    "The city's signature dish, a jar soup of some thirty ingredients simmered together, is said to have earned its poetic name after a monk smelled it through a sealed clay pot from next door and abandoned his vegetarian vows on the spot; restaurants still serve it with the lid sealed on with dough. Banyan trees planted across the old city over centuries give it a nickname, the Banyan City.|El plato insignia de la ciudad, una sopa en tarro de unos treinta ingredientes cocidos juntos, dicen que ganó su nombre poético cuando un monje la olió a través de una vasija sellada desde la casa de al lado.|Le plat emblématique de la ville, une soupe en jarre à quelque trente ingrédients mijotés ensemble, aurait gagné son nom poétique quand un moine la sentit à travers un pot d'argile scellé chez le voisin.|この街を代表する、三十種ほどの具を甕でともに煮込むスープ料理は、隣家の封をした甕越しに匂いを嗅いだ僧が精進の誓いをその場で破ったという逸話から詩的な名を得たとされる。いまも店では生地で蓋を封じたまま供される。何世紀もかけて旧市街に植えられたガジュマルの木にちなみ、この街は「榕城」とも呼ばれる。",
    [prop("Sealed-Jar Soup Kitchen|Cocina de la sopa en tarro sellado|Cuisine de la soupe en jarre scellée|封坛スープの厨房", 400, 82),
     prop("Banyan-Shaded Old Street|Calle vieja a la sombra del baniano|Vieille rue à l'ombre du banian|ガジュマルの陰の旧街道", 320, 66)],
  ),
  wuhan: city(
    "Wuhan|Wuhan|Wuhan|武漢",
    114.30, 30.60, "hd", "temple", "metro", "r",
    "Three cities that argued for a century before merging|Tres ciudades que discutieron durante un siglo antes de fusionarse|Trois villes qui se disputèrent un siècle avant de fusionner|一世紀言い争ってから合わさった三つの街",
    "Wuhan was formed by merging three separate walled towns facing each other across the Yangtze and Han rivers, joined properly only when the country's first bridge across the Yangtze opened in 1957 after decades of failed plans. A tower on the river bluff, rebuilt many times since a poet praised it in the eighth century, gives the best view of where the three once stood apart.|Wuhan se formó fusionando tres pueblos amurallados que se enfrentaban al otro lado de los ríos Yangtsé y Han, unidos de verdad solo cuando el primer puente sobre el Yangtsé del país abrió en 1957.|Wuhan naquit de la fusion de trois villes fortifiées se faisant face de part et d'autre du Yangtsé et de la rivière Han, réellement reliées seulement à l'ouverture du premier pont sur le Yangtsé du pays en 1957.|武漢は長江と漢江を挟んで向かい合っていた三つの城郭都市が合わさってできた街で、両岸が本当に結ばれたのは、何十年もの失敗の末に1957年、国内初の長江大橋が架かってからである。8世紀の詩人が讃えて以来何度も建て直されてきた川辺の断崖の楼閣からは、かつて三つの町が離れて立っていた様子が最もよく見渡せる。",
    [prop("Yangtze Bridge Overlook|Mirador del puente del Yangtsé|Belvédère du pont du Yangtsé|長江大橋の展望", 720, 148),
     prop("Riverside Crane Tower|Torre de la grulla junto al río|Tour de la grue au bord du fleuve|川辺の黄鶴楼", 560, 116)],
  ),

  // ---------------------------------------------------------------------
  // hn — 華南(湖南を含む)
  // ---------------------------------------------------------------------
  guangzhou: city(
    "Guangzhou|Cantón|Canton|広州",
    113.26, 23.13, "hn", "skyline", "metro", "l",
    "The one port an empire allowed the world to trade through|El único puerto por el que un imperio permitió comerciar al mundo|L'unique port par lequel un empire autorisa le commerce avec le monde|帝国が世界との商いを許した唯一の港",
    "From 1757 to 1842 this was the only port in the country where foreign merchants were legally allowed to trade at all, confined to a strip of riverside warehouses they could not leave without a permit. A trade fair founded in 1957 still runs twice a year and remains one of the largest of its kind on Earth.|De 1757 a 1842 este fue el único puerto del país donde a los comerciantes extranjeros se les permitía legalmente comerciar, confinados a una franja de almacenes junto al río que no podían abandonar sin permiso.|De 1757 à 1842, ce fut le seul port du pays où les marchands étrangers étaient légalement autorisés à commercer, confinés à une bande d'entrepôts au bord du fleuve qu'ils ne pouvaient quitter sans permis.|1757年から1842年まで、この街は外国商人が合法的に商いを許された国内唯一の港だった。彼らは許可なく出られない川沿いの倉庫街に押し込められていた。1957年に始まった見本市はいまも年二回開かれ、世界でも屈指の規模を保っている。",
    [prop("Thirteen Factories Warehouse|Almacén de las trece factorías|Entrepôt des treize comptoirs|十三行の商館", 2600, 538),
     prop("Pearl River Trade Fair Hall|Pabellón de la feria comercial del río Perla|Halle de la foire commerciale de la rivière des Perles|珠江の見本市会館", 1300, 268)],
  ),
  shenzhen: city(
    "Shenzhen|Shenzhen|Shenzhen|深圳",
    114.06, 22.54, "hn", "skyline", "metro", "r",
    "A fishing county turned into a city almost overnight|Un condado pesquero convertido en ciudad casi de la noche a la mañana|Un canton de pêcheurs devenu ville presque du jour au lendemain|ほぼ一夜で街になった漁村の県",
    "In 1980 this was a fishing county of around 30,000 people; it was declared the country's first special economic zone that same year, and within four decades its population passed ten million, a pace of growth without much precedent anywhere. The electronics markets that grew up here now supply components for much of the world's consumer hardware.|En 1980 esto era un condado pesquero de unas 30.000 personas; ese mismo año fue declarado la primera zona económica especial del país, y en cuatro décadas su población superó los diez millones.|En 1980, il s'agissait d'un canton de pêcheurs d'environ 30 000 habitants ; il fut déclaré cette même année première zone économique spéciale du pays, et en quatre décennies sa population dépassa les dix millions.|1980年当時、ここは人口3万人ほどの漁村県にすぎなかった。その同じ年に国内初の経済特区に指定され、四十年足らずで人口は千万を超えた。他に類を見ない速さの成長である。ここに育った電子部品市場は、いまや世界の民生機器の部品の多くを供給している。",
    [prop("Special Economic Zone Marker|Marcador de la zona económica especial|Borne de la zone économique spéciale|経済特区の標識", 2200, 456),
     prop("Electronics Component Market|Mercado de componentes electrónicos|Marché de composants électroniques|電子部品市場", 1100, 228)],
  ),
  guilin: city(
    "Guilin|Guilin|Guilin|桂林",
    110.29, 25.27, "hn", "mountain", "valley", "r",
    "Limestone towers that painters cannot help but exaggerate|Torres calizas que los pintores no pueden evitar exagerar|Des tours calcaires que les peintres ne peuvent s'empêcher d'exagérer|画家がつい誇張してしまう石灰岩の峰",
    "The karst towers along the Li River were shaped over some 300 million years as an ancient seabed dissolved unevenly, leaving isolated limestone peaks rather than a single ridge, and painted scrolls of the scene have been accused for centuries of exaggerating a landscape that, seen in person, turns out to need no exaggeration. A saying holds the river scenery here to be the best under heaven.|Las torres kársticas a lo largo del río Li se formaron a lo largo de unos 300 millones de años cuando un antiguo lecho marino se disolvió de forma desigual, dejando picos calizos aislados en vez de una sola cordillera.|Les tours karstiques le long de la rivière Li se sont formées sur quelque 300 millions d'années, un ancien fond marin se dissolvant de façon inégale et laissant des pics calcaires isolés plutôt qu'une seule chaîne.|漓江沿いのカルスト峰は、およそ3億年をかけて古い海底が不均一に溶けてできたもので、一つながりの山脈ではなく孤立した石灰岩の峰が並ぶ。この景色を描いた絵巻は何世紀も誇張を疑われてきたが、実際に見ると誇張の要らない眺めだと分かる。「桂林の山水は天下一」という言い習わしがある。",
    [prop("Li River Bamboo Raft Dock|Muelle de balsas de bambú del río Li|Quai des radeaux de bambou de la Li|漓江の竹筏の船着場", 620, 128),
     prop("Karst Peak Overlook|Mirador de los picos kársticos|Belvédère des pics karstiques|カルストの峰の展望", 460, 96)],
  ),
  nanning: city(
    "Nanning|Nanning|Nanning|南寧",
    108.37, 22.82, "hn", "flowerfield", "farmland", "l",
    "A city that renamed its avenues after a flower each December|Una ciudad que cada diciembre bautiza sus avenidas con el nombre de una flor|Une ville qui rebaptise ses avenues du nom d'une fleur chaque décembre|十二月ごとに大通りを花の名で染める街",
    "Nanning plants so many golden-flowered osmanthus trees along its avenues that its December flower festival scents entire streets at once, and the city has taken the flower as an informal emblem despite a subtropical climate more often associated with rice and sugarcane than a plant tied elsewhere to cooler autumns. It sits close enough to the Vietnamese border to run direct trade with it by road and rail.|Nanning planta tantos osmanthus de flor dorada en sus avenidas que su festival floral de diciembre perfuma calles enteras a la vez, y la ciudad ha adoptado la flor como emblema informal pese a un clima subtropical.|Nanning plante tant d'osmanthes à fleurs dorées le long de ses avenues que sa fête florale de décembre embaume des rues entières à la fois, et la ville en a fait un emblème informel malgré un climat subtropical.|南寧は大通りに金木犀を植えすぎるほど植えており、十二月の花祭りには通り全体が一度に香る。ふつう涼しい秋に結びつく花だが、米とサトウキビの亜熱帯の街はこれを非公式の象徴にしている。ベトナム国境に近く、道路と鉄道で直に交易できる位置にある。",
    [prop("Osmanthus Avenue Stall|Puesto de la avenida de osmanthus|Étal de l'avenue aux osmanthes|金木犀通りの露店", 340, 70),
     prop("Border Trade Rail Yard|Patio ferroviario del comercio fronterizo|Cour ferroviaire du commerce frontalier|国境貿易の操車場", 420, 86)],
  ),
  haikou: city(
    "Haikou|Haikou|Haikou|海口",
    110.33, 20.03, "hn", "coast", "seaside", "l",
    "A capital built from the stone of its own volcanoes|Una capital construida con la piedra de sus propios volcanes|Une capitale bâtie avec la pierre de ses propres volcans|自らの火山の石で築いた省都",
    "Old arcaded shophouses in the city centre were built from dark, porous basalt quarried from a cluster of extinct volcanoes on the edge of town, giving the historic quarter a colour and texture unlike the pale stone typical of mainland Chinese cities. The strait separating Hainan from the mainland is crossed by train ferries that carry entire rail carriages across the water.|Las viejas casas-tienda con soportales del centro se construyeron con basalto oscuro y poroso extraído de un grupo de volcanes extintos en las afueras.|Les vieilles maisons-boutiques à arcades du centre furent bâties en basalte sombre et poreux extrait d'un groupe de volcans éteints en périphérie.|市の中心にあるアーケード付きの古い店舗兼住宅は、郊外の死火山群から切り出した黒く多孔質の玄武岩で建てられており、中国本土でふつう見られる淡い色の石とは違う色と質感を旧市街に与えている。海南島と本土を隔てる海峡は、列車の車両をまるごと運ぶ鉄道連絡船で渡る。",
    [prop("Basalt Arcade Shophouse|Casa-tienda con soportales de basalto|Maison-boutique à arcades de basalte|玄武岩の騎楼(アーケード商家)", 420, 86),
     prop("Rail Ferry Terminal|Terminal del ferri ferroviario|Terminal du ferry ferroviaire|鉄道連絡船の埠頭", 340, 70)],
  ),
  sanya: city(
    "Sanya|Sanya|Sanya|三亜",
    109.51, 18.25, "hn", "coast", "seaside", "r",
    "The country's only stretch of true tropical coast|El único tramo de costa verdaderamente tropical del país|Le seul tronçon de côte véritablement tropicale du pays|国内で唯一真に熱帯といえる海岸",
    "Sanya sits close enough to the equator that its coast is the country's only stretch of true tropical shoreline, warm enough to draw visitors escaping winter from as far north as Harbin, some 3,000 kilometres away. Coconut palms line beaches that were still fishing hamlets within living memory, before resort development arrived in the 1990s.|Sanya está lo bastante cerca del ecuador para que su costa sea el único tramo de litoral verdaderamente tropical del país, lo bastante cálido como para atraer a quienes huyen del invierno de Harbin, a unos 3.000 km.|Sanya est assez proche de l'équateur pour que sa côte soit le seul tronçon de littoral véritablement tropical du pays, assez chaude pour attirer ceux qui fuient l'hiver de Harbin, à quelque 3 000 km.|三亜は赤道に近く、国内で唯一真に熱帯と呼べる海岸を持つ。3000kmも離れたハルビンから冬を逃れてくる客を集めるほど暖かい。ヤシの並ぶ浜は、1990年代にリゾート開発が来るまでは、記憶に新しいほど最近まで漁村だった。",
    [prop("Tropical Resort Beachfront|Frente de playa del resort tropical|Front de mer du complexe tropical|熱帯リゾートの浜辺", 900, 186),
     prop("Coconut Grove Fishing Hamlet|Aldea pesquera del cocotal|Hameau de pêcheurs de la cocoteraie|ヤシ林の漁村", 380, 78)],
  ),
  changsha: city(
    "Changsha|Changsha|Changsha|長沙",
    112.94, 28.23, "hn", "craft", "metro", "l",
    "A body kept so well it still had flexible skin after two millennia|Un cuerpo tan bien conservado que aún tenía piel flexible tras dos milenios|Un corps si bien conservé qu'il avait encore une peau souple après deux millénaires|二千年後も肌に弾力が残るほど保たれた遺体",
    "A tomb sealed here around 168 BCE and opened in 1972 held a noblewoman's body so well preserved by layers of charcoal, clay and airtight coffins that her joints could still be bent and her skin retained some elasticity, an condition later study attributed to the sealed, oxygen-poor chamber rather than any embalming chemical. The city's food is built on a chili heat distinct from its Sichuan neighbour's numbing spice.|Una tumba sellada aquí hacia el 168 a.C. y abierta en 1972 contenía el cuerpo de una noble tan bien conservado por capas de carbón, arcilla y ataúdes herméticos que sus articulaciones aún podían doblarse.|Une tombe scellée ici vers 168 av. J.-C. et ouverte en 1972 renfermait le corps d'une noble si bien conservé par des couches de charbon, d'argile et de cercueils hermétiques que ses articulations pouvaient encore se plier.|紀元前168年ごろに封じられ1972年に開かれた墓には、木炭と粘土と気密の棺に幾重にも守られて、関節がいまも曲がり肌にいくらか弾力が残るほど保存状態のよい貴婦人の遺体があった。のちの研究では、防腐処理ではなく密閉された無酸素の室内環境がその理由とされている。この街の料理は、隣の四川の痺れる辛さとは違う唐辛子そのものの辛さを軸にしている。",
    [prop("Sealed Tomb Excavation Hall|Sala de excavación de la tumba sellada|Salle de fouille de la tombe scellée|封じられた墓の発掘室", 640, 132),
     prop("Chili Street Food Stall|Puesto de comida callejera picante|Étal de rue épicé|唐辛子料理の屋台", 320, 66)],
  ),
  zhangjiajie: city(
    "Zhangjiajie|Zhangjiajie|Zhangjiajie|張家界",
    110.48, 29.13, "hn", "mountain", "valley", "r",
    "Sandstone pillars that inspired a film's floating mountains|Columnas de arenisca que inspiraron las montañas flotantes de una película|Des piliers de grès qui inspirèrent les montagnes flottantes d'un film|映画の浮遊する山の着想になった砂岩の柱",
    "More than three thousand narrow sandstone pillars, some over 200 metres tall, rise from these valleys after some 380 million years of water and frost splitting the rock along its natural joints, and one pillar was formally renamed in 2010 after the floating mountains its scenery inspired in a 2009 science-fiction film. A glass walkway and one of the world's tallest outdoor lifts now run up alongside them.|Más de tres mil estrechas columnas de arenisca, algunas de más de 200 metros, se alzan en estos valles tras unos 380 millones de años de agua y hielo agrietando la roca.|Plus de trois mille étroits piliers de grès, certains dépassant 200 mètres, s'élèvent dans ces vallées après quelque 380 millions d'années où l'eau et le gel ont fissuré la roche.|3000本を超える細い砂岩の柱が、およそ3億8000万年かけて水と霜が岩の節理に沿って割った結果としてこの谷にそびえ立つ。高さ200mを超えるものもある。ある一本の柱は2010年、その景観が着想を与えたとされる2009年のSF映画の浮遊する山にちなんで正式に改名された。ガラスの遊歩道と、世界屈指の高さの屋外エレベーターがいまその脇を上る。",
    [prop("Glass Skywalk Overlook|Mirador de la pasarela de cristal|Belvédère de la passerelle de verre|ガラスの空中歩道の展望", 680, 140),
     prop("Sandstone Pillar Base Camp|Campamento base de las columnas de arenisca|Camp de base des piliers de grès|砂岩の柱群のベースキャンプ", 460, 96)],
  ),

  // ---------------------------------------------------------------------
  // xn — 西南
  // ---------------------------------------------------------------------
  chengdu: city(
    "Chengdu|Chengdú|Chengdu|成都",
    104.07, 30.67, "xn", "panda", "farmland", "l",
    "A capital that spent two thousand years without changing its name|Una capital que pasó dos mil años sin cambiar de nombre|Une capitale restée deux mille ans sans changer de nom|二千年名を変えなかった都",
    "The city has kept both its name and its location for around 2,300 years, a stability few cities anywhere can claim, and an irrigation system built in 256 BCE still waters the surrounding Sichuan basin without a dam, splitting a river's flow with a plough-shaped stone levee that needs only yearly dredging. Roughly a third of the world's captive giant pandas live in breeding centres just outside the city.|La ciudad ha mantenido tanto su nombre como su ubicación durante unos 2.300 años, una estabilidad que pocas ciudades pueden reclamar, y un sistema de riego construido en 256 a.C. aún riega la cuenca de Sichuan sin presa.|La ville a gardé son nom et son emplacement pendant quelque 2 300 ans, une stabilité que peu de villes peuvent revendiquer, et un système d'irrigation bâti en 256 av. J.-C. arrose encore le bassin du Sichuan sans barrage.|この街は名前も場所もおよそ2300年変えていない。他に類を見ない安定ぶりである。紀元前256年に築かれた灌漑施設は、いまもダムを使わず川の流れを鋤形の石堤で分けるだけで、毎年の浚渫のみで周りの四川盆地を潤し続けている。世界のジャイアントパンダの飼育個体のおよそ三分の一が、市外の繁殖施設で暮らしている。",
    [prop("Panda Breeding Centre Enclosure|Recinto del centro de cría de pandas|Enclos du centre d'élevage de pandas|パンダ繁殖施設の囲い", 780, 160),
     prop("Damless Irrigation Weir|Presa de derivación sin embalse|Digue de dérivation sans barrage|ダムを使わない分水堰", 480, 100)],
  ),
  chongqing: city(
    "Chongqing|Chongqing|Chongqing|重慶",
    106.55, 29.56, "xn", "skyline", "metro", "r",
    "A city built with no flat ground to build on|Una ciudad construida sin un solo terreno llano donde edificar|Une ville bâtie sans le moindre terrain plat où construire|平らな土地が一坪も無いまま建てられた街",
    "The city sits on a hilly peninsula between two rivers with almost no flat ground, so buildings step up cliffsides on outdoor escalators and one apartment block famously has its ground-floor entrance on the twenty-second storey when approached from the other side. Thick fog rolling off the rivers shielded it from bombing raids while it served as wartime capital from 1937.|La ciudad se asienta en una península montañosa entre dos ríos, casi sin terreno llano, así que los edificios trepan los acantilados por escaleras mecánicas al aire libre.|La ville se dresse sur une péninsule accidentée entre deux fleuves, presque sans terrain plat, si bien que les bâtiments grimpent les falaises par des escaliers mécaniques en plein air.|この街は二つの川に挟まれた丘だらけの半島にあり、平らな土地がほとんどない。建物は屋外のエスカレーターで崖を這い上がるように建ち、あるマンションは反対側から入ると一階の玄関が22階に当たることで知られる。川から立ち上る濃い霧は、1937年から戦時の首都として機能していたあいだ、この街を空襲から守った。",
    [prop("Cliffside Escalator Terrace|Terraza de la escalera mecánica del acantilado|Terrasse de l'escalator de falaise|崖のエスカレーターのテラス", 2400, 496),
     prop("Riverside Hotpot House|Casa de hotpot junto al río|Maison de hotpot au bord du fleuve|川辺の火鍋店", 1200, 248)],
  ),
  leshan: city(
    "Leshan|Leshan|Leshan|楽山",
    103.44, 29.55, "xn", "grotto", "valley", "l",
    "A Buddha carved to calm the water beneath it|Un buda tallado para calmar el agua bajo él|Un bouddha sculpté pour apaiser l'eau sous lui|足下の水を鎮めるために彫られた仏",
    "A monk began carving this 71-metre seated Buddha into a cliff in 713 at the meeting point of three rivers, on the belief that the statue's presence would calm currents that regularly capsized boats passing below, and the stone chips cut from the cliff were said to have actually changed the river's flow enough to make the crossing safer. It remains the tallest stone Buddha statue on Earth.|Un monje empezó a tallar este Buda sedente de 71 metros en un acantilado en 713, en la confluencia de tres ríos, creyendo que la presencia de la estatua calmaría las corrientes que volcaban barcas.|Un moine entreprit de sculpter ce bouddha assis de 71 mètres dans une falaise en 713, au confluent de trois rivières, croyant que la présence de la statue calmerait les courants qui chaviraient les barques.|713年、僧侶がこの高さ71mの坐仏を、三つの川が合わさる地点の崖に彫り始めた。像があれば下を通る舟をよく転覆させる急流が鎮まると信じられたからである。崖から切り出した石屑は実際に川の流れを変え、渡しをいくらか安全にしたとも言われる。いまも世界最大の石造座仏である。",
    [prop("Three-River Confluence Overlook|Mirador de la confluencia de tres ríos|Belvédère du confluent des trois rivières|三江合流の展望", 620, 128),
     prop("Cliff-Carving Workshop|Taller de talla en el acantilado|Atelier de sculpture rupestre|崖仏彫刻の工房", 380, 78)],
  ),
  kunming: city(
    "Kunming|Kunming|Kunming|昆明",
    102.71, 25.04, "xn", "flowerfield", "farmland", "r",
    "A city that ships more cut flowers than almost anywhere on Earth|Una ciudad que exporta más flores cortadas que casi cualquier otro lugar del planeta|Une ville qui expédie plus de fleurs coupées que presque partout ailleurs sur Terre|世界でも屈指の切り花を送り出す街",
    "Sitting at nearly 1,900 metres with a climate mild enough that locals call it the City of Eternal Spring, the plain around the city has become one of the world's largest cut-flower production centres, with an auction market moving millions of stems most mornings before they are flown out overnight. A limestone forest of rock pillars taller than a person stands a short drive to the southeast.|A casi 1.900 metros y con un clima tan templado que los lugareños la llaman la Ciudad de la Eterna Primavera, la llanura en torno a la ciudad se ha convertido en uno de los mayores centros de flor cortada del mundo.|À près de 1 900 mètres et au climat si doux que les habitants l'appellent la Ville du printemps éternel, la plaine autour de la ville est devenue l'un des plus grands centres de fleurs coupées au monde.|標高1900m近くにあり、地元では「春城」と呼ばれるほど温暖な気候のこの街の周りの平野は、世界でも屈指の切り花の産地になっている。競り市場では、その夜のうちに空輸される花の茎がほとんど毎朝何百万本と動く。南東へ少し行くと、人の背丈を超える石灰岩の柱が林立する石林が広がる。",
    [prop("Flower Auction Market Floor|Piso del mercado de subastas de flores|Parquet du marché aux enchères florales|花き競り市場の売り場", 460, 96),
     prop("Stone Forest Rock Pillar Trail|Sendero de los pilares del bosque de piedra|Sentier des piliers du forêt de pierre|石林の岩柱の小径", 380, 78)],
  ),
  lijiang: city(
    "Lijiang|Lijiang|Lijiang|麗江",
    100.23, 26.86, "xn", "oldtown", "oldtown", "l",
    "An old town with no city wall and a written language of pictures|Un casco antiguo sin muralla y una escritura de imágenes|Une vieille ville sans rempart et une écriture d'images|城壁を持たず絵の文字を持つ古い町",
    "Unlike almost every other old Chinese town of its size, Lijiang's centre was never walled, reportedly because the ruling Mu family's surname character means \"wood\" and a wall drawn around it would form the character for \"trapped\". The Naxi people here still use Dongba script, one of the few pictographic writing systems still read anywhere, mostly by ritual specialists.|A diferencia de casi cualquier otro casco antiguo chino de su tamaño, el centro de Lijiang nunca tuvo muralla, según se dice porque el carácter del apellido de la familia gobernante Mu significa «madera».|Contrairement à presque toute autre vieille ville chinoise de sa taille, le centre de Lijiang n'a jamais eu de rempart, dit-on parce que le caractère du nom de la famille régnante Mu signifie « bois ».|同じ規模の中国の古い町のほとんどと違い、麗江の中心には城壁が築かれたことがない。支配した木(ムー)氏の姓の字が「木」であり、それを囲む線を引けば「困」の字になってしまうからだと伝わる。ここに暮らすナシ族はいまもトンパ文字を使う。世界でも数少ない、いまも読まれる象形の文字体系の一つで、主に祭祀を司る者が用いる。",
    [prop("Canal-Side Wooden Guesthouse|Posada de madera junto al canal|Auberge en bois au bord du canal|水路端の木造の宿", 480, 100),
     prop("Dongba Script Scriptorium|Escritorio de la escritura dongba|Scriptorium de l'écriture dongba|トンパ文字の写経所", 340, 70)],
  ),
  guiyang: city(
    "Guiyang|Guiyang|Guiyang|貴陽",
    106.71, 26.65, "xn", "mountain", "valley", "l",
    "A province so short on flat land that a saying warns of it|Una provincia tan escasa de tierra llana que un dicho advierte de ello|Une province si dépourvue de terrain plat qu'un dicton la met en garde|平地の乏しさを言い習わしに残す省",
    "An old saying about Guizhou province claims it has no three days without rain, no three li without a hill, and no three coins in anyone's pocket, a summary of a landscape so folded into karst hills that flat farmland has always been scarce. The province's data centres now use the mild, stable mountain climate the terrain once made a liability to keep servers cool instead of relying on air conditioning.|Un viejo dicho sobre la provincia de Guizhou afirma que no hay tres días sin lluvia, ni tres li sin colina, ni tres monedas en el bolsillo de nadie.|Un vieux dicton sur la province du Guizhou affirme qu'il n'y a pas trois jours sans pluie, pas trois li sans colline, ni trois pièces dans la poche de quiconque.|貴州省についての古い言い習わしに、雨の降らない日が三日と続かず、丘のない土地が三里と続かず、懐に三文と残らない、というものがある。カルストの丘に折り畳まれたような地形ゆえ平地の畑がずっと乏しかったことを言い表している。いまはその同じ地形がもたらす穏やかで安定した山の気候を、この省のデータセンターは空調に頼らずサーバーを冷やすのに使っている。",
    [prop("Karst Hill Terrace Farm|Granja en terraza de la colina cárstica|Ferme en terrasse de la colline karstique|カルストの丘の段畑", 400, 82),
     prop("Mountain-Cooled Data Hall|Sala de datos enfriada por la montaña|Salle informatique refroidie par la montagne|山の冷気で冷やすデータセンター", 460, 96)],
  ),
  lhasa: city(
    "Lhasa|Lhasa|Lhassa|ラサ",
    91.11, 29.65, "xn", "potala", "potala", "r",
    "A palace with thirteen storeys and a mountain inside it|Un palacio de trece pisos con una montaña dentro|Un palais de treize étages avec une montagne à l'intérieur|十三階建てで山を内に抱える宮殿",
    "The Potala Palace rises thirteen storeys up the slope of Red Hill, its lower walls built directly into the mountain's own rock so the building and the hill are structurally one, and at roughly 3,700 metres above sea level it and the city around it sit higher than almost any other capital-scale settlement on Earth. Pilgrims still circle the palace's base clockwise on foot, some completing full-body prostrations the entire way.|El Palacio Potala se alza trece pisos por la ladera de la Colina Roja, con sus muros inferiores construidos directamente en la roca de la montaña, de modo que edificio y colina son estructuralmente uno.|Le palais du Potala s'élève sur treize étages à flanc de la Colline rouge, ses murs inférieurs étant bâtis à même la roche de la montagne, si bien que l'édifice et la colline ne font structurellement qu'un.|ポタラ宮は紅山の斜面に十三階建てでそびえ、下層の壁は山そのものの岩に直に築かれているため、建物と丘は構造上一体になっている。標高およそ3700mにあるこの宮殿と街は、世界でも都に匹敵する規模の集落としては指折りの高さにある。巡礼者はいまも宮殿の麓を時計回りに徒歩で巡り、中には五体投地を続けながら回る者もいる。",
    [prop("Red Hill Palace Terrace|Terraza del palacio de la Colina Roja|Terrasse du palais de la Colline rouge|紅山の宮殿のテラス", 900, 186),
     prop("Pilgrim Circuit Prayer Wheel Row|Fila de ruedas de oración del circuito de peregrinos|Rangée de moulins à prières du circuit des pèlerins|巡礼路のマニ車の列", 420, 86)],
  ),

  // ---------------------------------------------------------------------
  // xb — 西北
  // ---------------------------------------------------------------------
  xian: city(
    "Xi'an|Xi'an|Xi'an|西安",
    108.95, 34.27, "xb", "tomb", "ancienttomb", "l",
    "An army of eight thousand, each face carved differently|Un ejército de ocho mil, cada rostro tallado de forma distinta|Une armée de huit mille, chaque visage sculpté différemment|顔がすべて違う八千の軍勢",
    "Farmers digging a well in 1974 struck the head of a clay soldier and uncovered an underground army of some 8,000 life-sized figures buried around 210 BCE to guard the First Emperor's tomb, no two faces alike among them, thought to be individually modelled rather than mass-produced from a single mould. The tomb mound itself, said to hold a scale model of the empire in mercury rivers, has never been opened.|Unos agricultores que cavaban un pozo en 1974 dieron con la cabeza de un soldado de arcilla y descubrieron un ejército subterráneo de unas 8.000 figuras a tamaño real.|Des paysans creusant un puits en 1974 heurtèrent la tête d'un soldat d'argile et mirent au jour une armée souterraine d'environ 8 000 figures grandeur nature.|1974年、井戸を掘っていた農民が粘土の兵士の頭に突き当たり、紀元前210年ごろ始皇帝の陵墓を守るために埋められた、実物大でおよそ8000体からなる地下の軍勢を掘り当てた。どの顔も同じものがなく、型から量産したのではなく一体ずつ作られたと考えられている。水銀の川で帝国の縮図を再現したと伝わる陵墓そのものは、いまも開かれたことがない。",
    [prop("Terracotta Pit Excavation Hall|Sala de excavación del foso de terracota|Salle de fouille de la fosse en terre cuite|兵馬俑坑の発掘館", 2800, 578),
     prop("City Wall Bicycle Circuit|Circuito en bicicleta de la muralla|Circuit à vélo du rempart|城壁の自転車周回路", 700, 144)],
  ),
  lanzhou: city(
    "Lanzhou|Lanzhou|Lanzhou|蘭州",
    103.83, 36.06, "xb", "craft", "valley", "r",
    "The only provincial capital the Yellow River runs straight through|La única capital provincial que el río Amarillo atraviesa de lleno|La seule capitale provinciale que traverse tout droit le fleuve Jaune|黄河が真っ直ぐ貫く唯一の省都",
    "Lanzhou is the only provincial capital the Yellow River flows directly through rather than skirting, and the city's hand-pulled beef noodle soup, said to have been standardised here in the nineteenth century, is judged by five fixed criteria including the clarity of the broth and the exact width of the noodle strand. A bridge built in 1909 with imported German steel was, for decades, the only fixed crossing of the river for hundreds of kilometres.|Lanzhou es la única capital provincial que el río Amarillo atraviesa directamente en vez de bordearla, y su sopa de fideos de ternera estirados a mano se juzga por cinco criterios fijos.|Lanzhou est la seule capitale provinciale que le fleuve Jaune traverse directement plutôt que de la contourner, et sa soupe de nouilles de bœuf étirées à la main se juge selon cinq critères fixes.|蘭州は黄河が迂回せず街の真ん中を貫いて流れる唯一の省都で、19世紀にこの地で型が定まったとされる手延べ牛肉麺は、スープの澄み具合や麺の太さなど五つの決まった基準で判じられる。1909年にドイツ製の鋼材で架けられた橋は、何十年ものあいだ、数百キロにわたって黄河を渡る唯一の固定橋であった。",
    [prop("Hand-Pulled Noodle Counter|Mostrador de fideos estirados a mano|Comptoir de nouilles étirées à la main|手延べ牛肉麺の売り場", 340, 70),
     prop("Iron Bridge River Crossing|Cruce del río del puente de hierro|Traversée du fleuve au pont de fer|鉄橋の渡し", 420, 86)],
  ),
  zhangye: city(
    "Zhangye|Zhangye|Zhangye|張掖",
    100.45, 38.93, "xb", "mountain", "valley", "l",
    "Hills striped like a painting because of iron rusting in place|Colinas rayadas como una pintura por el óxido del hierro en su lugar|Des collines rayées comme un tableau à cause du fer rouillant sur place|鉄がその場で錆びて絵のように縞を作った丘",
    "The banded red, yellow and green hills here formed over some 24 million years as layers of sandstone and mineral sediment, laid down at different times with different mineral content, were folded upward together and then exposed by erosion, with the red bands owing their colour to iron minerals oxidising in place like a slow rust. A reclining Buddha statue in the city carved in 1098 is, at 35 metres, one of the largest indoor statues in the country.|Las colinas rayadas de rojo, amarillo y verde se formaron a lo largo de unos 24 millones de años, con bandas rojas que deben su color a minerales de hierro que se oxidan in situ como un óxido lento.|Les collines striées de rouge, de jaune et de vert se sont formées sur quelque 24 millions d'années, les bandes rouges devant leur couleur à des minéraux ferreux s'oxydant sur place comme une rouille lente.|ここの赤・黄・緑に縞模様をなす丘は、およそ2400万年かけて異なる時期に異なる鉱物を含んで積もった砂岩の層が共に折り曲げられ、侵食で露わになってできたものである。赤い縞は鉄分の鉱物がゆっくり錆びるように酸化した色である。1098年に彫られた市内の涅槃仏は全長35mで、国内でも屈指の大きさの屋内仏像である。",
    [prop("Rainbow Hill Overlook Trail|Sendero del mirador de las colinas arcoíris|Sentier du belvédère des collines arc-en-ciel|七彩丹霞の展望路", 460, 96),
     prop("Reclining Buddha Hall|Sala del buda reclinado|Salle du bouddha couché|涅槃仏の堂", 340, 70)],
  ),
  jiayuguan: city(
    "Jiayuguan|Jiayuguan|Jiayuguan|嘉峪関",
    98.29, 39.77, "xb", "fortress", "fortress", "r",
    "The fort where the empire officially ended|El fuerte donde el imperio terminaba oficialmente|Le fort où l'empire prenait officiellement fin|帝国が公式に終わる関所",
    "This fort, completed in 1372, marked the westernmost gate of the Great Wall and, in the empire's own reckoning, the edge of civilisation itself; officials exiled beyond it were said to throw a stone at the wall, believing that if it bounced back, they would one day return. A single brick left over from the entire construction is still displayed on a gate tower, credited to a builder who calculated the exact number needed in advance.|Este fuerte, terminado en 1372, marcaba la puerta más occidental de la Gran Muralla y, según el propio cómputo del imperio, el borde mismo de la civilización.|Ce fort, achevé en 1372, marquait la porte la plus occidentale de la Grande Muraille et, selon le propre calcul de l'empire, la limite même de la civilisation.|1372年に完成したこの関は、万里の長城の最西端の門であり、帝国自身の見立てでは文明そのものの果てであった。ここより西へ流された役人は城壁に石を投げ、跳ね返れば再び戻れると信じたと伝わる。建設全体で余った煉瓦がただ一つ、いまも門楼に飾られている。必要な数を事前に正確に計算した建築者の逸話にちなむ。",
    [prop("Great Wall Western Gate Tower|Torre de la puerta occidental de la Gran Muralla|Tour de la porte occidentale de la Grande Muraille|長城最西端の門楼", 680, 140),
     prop("Exile Stone-Throwing Wall|Muro de la piedra del exilio|Mur de la pierre de l'exil|流刑者が石を投げた壁", 320, 66)],
  ),
  dunhuang: city(
    "Dunhuang|Dunhuang|Dunhuang|敦煌",
    94.66, 40.14, "xb", "grotto", "desert", "l",
    "A library sealed shut for nine hundred years|Una biblioteca sellada durante novecientos años|Une bibliothèque scellée neuf cents ans durant|九百年封じられていた蔵書",
    "A monk clearing sand from the Mogao Caves in 1900 broke through a hidden wall into a chamber sealed since around 1000 CE, holding some 50,000 manuscripts and paintings left untouched for nine centuries, since scattered among museums on several continents after being bought up by foreign expeditions in the following decades. The caves themselves, cut into a cliff from the fourth century on, hold Buddhist murals across nearly 500 chambers.|Un monje que limpiaba arena de las Cuevas de Mogao en 1900 atravesó un muro oculto hasta una cámara sellada desde el año 1000 aproximadamente, con unos 50.000 manuscritos y pinturas intactos durante nueve siglos.|Un moine dégageant le sable des grottes de Mogao en 1900 perça un mur caché menant à une chambre scellée depuis l'an 1000 environ, renfermant quelque 50 000 manuscrits et peintures intacts depuis neuf siècles.|1900年、莫高窟の砂を払っていた僧が隠れた壁を破り、西暦1000年ごろから封じられていた房を見つけた。九世紀ものあいだ手つかずだった写本と絵画がおよそ5万点あり、その後数十年で外国の探検隊に買い取られて各大陸の博物館に散らばった。4世紀から崖に刻まれ続けたこの石窟群そのものは、およそ500の房に仏教壁画を収める。",
    [prop("Sealed Library Chamber|Cámara de la biblioteca sellada|Chambre de la bibliothèque scellée|封じられた蔵経洞", 620, 128),
     prop("Singing Sand Dune Camel Camp|Campamento de camellos de la duna cantora|Camp de chameaux de la dune chantante|鳴沙山のラクダの宿営地", 380, 78)],
  ),
  xining: city(
    "Xining|Xining|Xining|西寧",
    101.78, 36.62, "xb", "craft", "valley", "l",
    "A gateway city where four peoples' roads have always crossed|Una ciudad puerta donde siempre se cruzaron los caminos de cuatro pueblos|Une ville-porte où se croisent depuis toujours les routes de quatre peuples|四つの民の道がいつも交わってきた玄関口",
    "Sitting at around 2,275 metres where Han, Tibetan, Hui and Mongol trade routes have crossed for centuries, the city's markets still mix all four traditions in one place, and yak butter tea sold alongside Hui-style hand-pulled noodles is an entirely ordinary combination here. It is the last sizeable city before the railway climbs onto the Tibetan Plateau proper.|A unos 2.275 metros, donde durante siglos se cruzaron las rutas comerciales han, tibetana, hui y mongola, los mercados de la ciudad aún mezclan las cuatro tradiciones en un mismo lugar.|À quelque 2 275 mètres, là où se croisent depuis des siècles les routes commerciales han, tibétaine, hui et mongole, les marchés de la ville mêlent encore les quatre traditions en un même lieu.|標高およそ2275mのこの街では、何世紀も漢・チベット・回・モンゴルの交易路が交わってきた。市場ではいまも四つの伝統が同じ場所で混ざり合い、ヤクバターの茶と回族式の手延べ麺が並んで売られるのはごく当たり前の光景である。鉄道が本格的にチベット高原へ登り始める前の、最後のまとまった規模の街でもある。",
    [prop("Four-Faiths Bazaar Row|Hilera del bazar de las cuatro fes|Rangée du bazar des quatre confessions|四つの信仰が並ぶ市場通り", 400, 82),
     prop("Yak Butter Tea House|Casa de té de mantequilla de yak|Maison de thé au beurre de yak|ヤクバター茶の茶館", 280, 58)],
  ),
  yinchuan: city(
    "Yinchuan|Yinchuan|Yinchuan|銀川",
    106.23, 38.47, "xb", "tomb", "desert", "r",
    "An empire's tombs, left unlabelled after its own fall|Las tumbas de un imperio, sin etiquetar tras su propia caída|Les tombeaux d'un empire, restés anonymes après sa propre chute|その帝国自身の滅亡ののち、名を記されないままの陵墓",
    "Nine imperial tombs and some 250 lesser graves of the Western Xia dynasty stand on the plain west of the city, their pyramid-like mounds still largely unidentified by individual ruler because the Mongol conquest of 1227 was thorough enough to destroy most written records naming who lay in which. Canals dug from the Yellow River as early as the Qin dynasty still irrigate the surrounding desert plain, watering rice fields at the edge of the Gobi.|Nueve tumbas imperiales y unas 250 tumbas menores de la dinastía Xia Occidental se alzan en la llanura al oeste de la ciudad, con sus montículos piramidales aún en gran parte sin identificar por gobernante individual.|Neuf tombeaux impériaux et quelque 250 tombes moindres de la dynastie Xia occidentale se dressent dans la plaine à l'ouest de la ville, leurs tertres pyramidaux restant en grande partie non identifiés.|市の西の平原には西夏王朝の九つの帝陵とおよそ250の陪葬墓が立つが、1227年のモンゴルの征服が徹底していたため、どの墳墓が誰のものかを記す記録の多くが失われ、ピラミッド状の墳丘の多くはいまも個々の王に結びつけられていない。秦代にまでさかのぼる黄河からの用水路は、いまも周りの砂漠の平野を潤し、ゴビの縁で水田を養っている。",
    [prop("Unmarked Royal Tomb Field|Campo de tumbas reales sin marcar|Champ des tombeaux royaux anonymes|誰の墓か分からぬ王陵の野", 480, 100),
     prop("Yellow River Canal Rice Paddy|Arrozal del canal del río Amarillo|Rizière du canal du fleuve Jaune|黄河用水路の水田", 320, 66)],
  ),
  urumqi: city(
    "Urumqi|Urumqi|Ürümqi|ウルムチ",
    87.62, 43.83, "xb", "bazaar", "metro", "l",
    "The city farthest from any ocean on the planet|La ciudad más alejada de cualquier océano del planeta|La ville la plus éloignée de tout océan sur la planète|地球上で外洋から最も遠い街",
    "Urumqi is usually cited as the large city farthest from open sea anywhere on Earth, roughly 2,500 kilometres from the nearest coastline in any direction, sitting instead at the edge of the Junggar Basin between two mountain ranges. Its grand bazaar, rebuilt in the 2000s in a style echoing Central Asian architecture, sells dried fruit, carpets and instruments from across the old Silk Road's northern branch.|Urumqi suele citarse como la gran ciudad más alejada del mar abierto en todo el planeta, a unos 2.500 km de la costa más cercana en cualquier dirección.|Ürümqi est souvent citée comme la grande ville la plus éloignée de la mer libre sur toute la planète, à quelque 2 500 km de la côte la plus proche, dans quelque direction que ce soit.|ウルムチは、どの方角に測っても最も近い海岸線までおよそ2500kmという、地球上で外洋から最も遠い大都市としてしばしば挙げられる。二つの山脈に挟まれたジュンガル盆地の縁に位置する。2000年代に中央アジア風の様式で建て直された大バザールでは、シルクロード北路沿いの乾物・絨毯・楽器が売られている。",
    [prop("Grand Bazaar Carpet Stall|Puesto de alfombras del gran bazar|Étal de tapis du grand bazar|大バザールの絨毯商", 480, 100),
     prop("Continental Pole of Inaccessibility Marker|Marcador del polo de inaccesibilidad continental|Borne du pôle d'inaccessibilité continental|大陸の到達難極点の標", 320, 66)],
  ),
  turpan: city(
    "Turpan|Turfán|Turfan|トルファン",
    89.19, 42.95, "xb", "bazaar", "desert", "r",
    "A basin so deep the grapes grow in what should be an ocean|Una cuenca tan honda que las uvas crecen donde debería haber un océano|Un bassin si profond que la vigne y pousse là où devrait être un océan|本来なら海であるはずの深さでブドウが実る盆地",
    "Part of the Turpan Depression sits some 154 metres below sea level, the second-lowest point on Earth's land surface after the Dead Sea shore, and summer temperatures regularly pass 40°C, yet the basin grows sweet seedless grapes on a large scale, kept alive by karez, underground channels first dug more than 2,000 years ago that carry snowmelt from distant mountains without losing it to evaporation.|Parte de la depresión de Turfán está a unos 154 metros bajo el nivel del mar, el segundo punto más bajo de la superficie terrestre tras la orilla del Mar Muerto, y en verano las temperaturas superan con frecuencia los 40 °C.|Une partie de la dépression de Turfan se trouve à quelque 154 mètres sous le niveau de la mer, le deuxième point le plus bas des terres émergées après les rives de la mer Morte, et les températures estivales dépassent souvent 40°C.|トルファン盆地の一部は海抜およそマイナス154mにあり、死海の岸辺に次いで地球の陸地で二番目に低い場所である。夏には気温がしばしば40度を超えるが、この盆地では種なしの甘いブドウが盛んに栽培されている。2000年以上前に掘られたカレーズと呼ばれる地下水路が、遠い山の雪解け水を蒸発させずに運んでいるおかげである。",
    [prop("Karez Underground Channel Tour|Recorrido del canal subterráneo karez|Visite du canal souterrain karez|カレーズ見学路", 400, 82),
     prop("Seedless Grape Trellis Yard|Patio del emparrado de uva sin semilla|Cour de la treille de raisin sans pépins|種なしブドウの棚の庭", 280, 58)],
  ),
  kashgar: city(
    "Kashgar|Kashgar|Kachgar|カシュガル",
    75.99, 39.47, "xb", "bazaar", "desert", "l",
    "A crossroads so far west it is closer to Baghdad than Beijing|Un cruce tan al oeste que está más cerca de Bagdad que de Pekín|Un carrefour si à l'ouest qu'il est plus près de Bagdad que de Pékin|北京よりバグダッドに近いほど西にある十字路",
    "Kashgar sits so far west that it lies closer to Baghdad, Tehran and even Damascus than to Beijing, and for over two thousand years caravans following the Silk Road split here, one branch skirting the Taklamakan desert to the north and the other to the south, before either continued toward Central Asia. The Sunday livestock market still draws traders from across the region on foot, by cart and by truck alike.|Kashgar está tan al oeste que queda más cerca de Bagdad, Teherán e incluso Damasco que de Pekín, y durante más de dos mil años las caravanas de la Ruta de la Seda se dividieron aquí.|Kachgar est si à l'ouest qu'elle est plus proche de Bagdad, Téhéran et même Damas que de Pékin, et pendant plus de deux mille ans les caravanes de la Route de la soie s'y sont scindées.|カシュガルはあまりに西にあるため、北京よりもバグダッド・テヘラン、さらにはダマスカスに近い。二千年以上のあいだ、シルクロードを行く隊商はここで分かれ、一方はタクラマカン砂漠の北を、もう一方は南を回って中央アジアへ向かった。日曜の家畜市には、いまも徒歩や荷車、トラックで地域じゅうから商人が集まる。",
    [prop("Sunday Livestock Market Pen|Corral del mercado dominical de ganado|Enclos du marché du dimanche|日曜家畜市の囲い", 380, 78),
     prop("Silk Road Caravanserai Courtyard|Patio del caravasar de la Ruta de la Seda|Cour du caravansérail de la route de la Soie|シルクロードの隊商宿の中庭", 320, 66)],
  ),
};

/**
 * 路線(65本)。陸続きの都市どうしは陸路、海南島へは航路。
 * ラサへは青蔵鉄道にあたる長距離の1本(陸路)で結ぶ。
 */
export const CHINA_EDGES = [
  // --- hb 華北 ---
  ["beijing", "tianjin"],
  ["beijing", "chengde"],
  ["beijing", "datong"],
  ["datong", "taiyuan"],
  ["taiyuan", "pingyao"],
  ["datong", "hohhot"],
  ["beijing", "hohhot"],
  ["taiyuan", "luoyang"],
  // --- hb-db(北京—瀋陽で接続)・db 東北 ---
  ["beijing", "shenyang"],
  ["shenyang", "dalian"],
  ["shenyang", "changchun"],
  ["changchun", "harbin"],
  // --- hb-hd(北京—済南で接続)・hd 華東 ---
  ["beijing", "jinan"],
  ["jinan", "qingdao"],
  ["jinan", "qufu"],
  ["qufu", "nanjing"],
  ["nanjing", "shanghai"],
  ["nanjing", "suzhou"],
  ["suzhou", "shanghai"],
  ["shanghai", "hangzhou"],
  ["hangzhou", "huangshan"],
  ["hangzhou", "fuzhou"],
  ["fuzhou", "xiamen"],
  ["nanjing", "wuhan"],
  // --- hd-hn(武漢—長沙で接続)・hn 華南(湖南を含む) ---
  ["wuhan", "changsha"],
  ["changsha", "zhangjiajie"],
  ["changsha", "guangzhou"],
  ["guangzhou", "shenzhen"],
  ["guangzhou", "xiamen"],
  ["guangzhou", "guilin"],
  ["guilin", "nanning"],
  ["shenzhen", "haikou", "sea"],
  ["haikou", "sanya"],
  // --- hn-xn(桂林—貴陽で接続)・xn 西南 ---
  ["guilin", "guiyang"],
  ["nanning", "kunming"],
  ["guiyang", "kunming"],
  ["guiyang", "chongqing"],
  ["chongqing", "chengdu"],
  ["chengdu", "leshan"],
  ["kunming", "lijiang"],
  // --- xn-xb(成都—西安で接続)・xb 西北 ---
  ["chengdu", "xian"],
  ["xian", "luoyang"],
  ["xian", "lanzhou"],
  ["lanzhou", "xining"],
  ["lanzhou", "yinchuan"],
  ["yinchuan", "hohhot"],
  ["lanzhou", "zhangye"],
  ["zhangye", "jiayuguan"],
  ["jiayuguan", "dunhuang"],
  ["jiayuguan", "turpan"],
  ["turpan", "urumqi"],
  ["urumqi", "kashgar"],
  // --- 青蔵鉄道(西寧からラサへ、長大な1本) ---
  ["xining", "lhasa"],
  // --- 少し離れた地方をまたぐ補助線(移動の選択肢を増やす) ---
  ["taiyuan", "xian"],
  ["zhangjiajie", "guilin"],
  ["nanjing", "hangzhou"],
  ["chongqing", "wuhan"],
  ["kunming", "guilin"],
  ["harbin", "shenyang"],
  ["qingdao", "shanghai", "sea"],
  ["dalian", "qingdao", "sea"],
  ["xian", "chongqing"],
  ["shenzhen", "guilin"],
  ["luoyang", "wuhan"],
  ["lanzhou", "chengdu"],
  ["guiyang", "nanning"],
];
