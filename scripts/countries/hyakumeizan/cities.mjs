/**
 * 日本百名山の都市(=山)と路線。
 *
 * **この盤面は「町」ではなく深田久弥『日本百名山』の100座を都市として置く。**
 * 名前は山名(利尻岳・槍ヶ岳・富士山・…・宮之浦岳)。物件は山小屋・ロープ
 * ウェイ・登山口の茶屋・温泉・山岳博物館・キャンプ場など、山にまつわる
 * ものにしている。
 *
 * 地方区分(8つ、山域で切る)。当初 `joshinetsu` が29座・`fujihakone` が
 * 2座という偏りがあり、季節の地方収入倍率が効かない/効きすぎるとの
 * 指摘を受けて、`joshinetsu` を関東側(`kanto`)と上信越側
 * (`joshinetsu` のまま)に分割し、`fujihakone` の富士山・天城山を
 * `kanto` に吸収した。
 *
 * - `hokkaido`(9) 北海道
 * - `tohoku`(12) 東北
 * - `kanto`(14) 関東・日光・奥秩父・丹沢・富士・伊豆
 * - `joshinetsu`(17) 上信越(谷川・苗場・巻機・妙高・火打など)
 * - `kitaalps`(16) 北アルプス
 * - `chuo_minami_alps`(18) 中央・南アルプスと中部の高原・御嶽・八ヶ岳
 * - `kinkihokuriku`(5) 白山・伊吹・大峰・大台ヶ原(近畿・北陸をまとめる)
 * - `nishinihon`(9) 中国・四国・九州・屋久島をまとめる
 *
 * 合計100座。経度・緯度は実際の値。投影の範囲は geography.mjs の
 * HYAKUMEIZAN_PROJ を参照。並び順は地方ごとにまとめてあるが、
 * オブジェクトの記述順そのものに意味はない(`kanto` に移した山は
 * 元の `joshinetsu`/`fujihakone` のブロック内に残っている)。
 *
 * **路線(`HYAKUMEIZAN_EDGES`)は別途 route-planning で追加する。**
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const HYAKUMEIZAN_CITIES = {
  rishiri: city(
    "Mt. Rishiri|Monte Rishiri|Mont Rishiri|利尻岳",
    141.2419, 45.1783, "hokkaido", "cone_volcano", "islandvolcano", "r",
    "A near-perfect volcanic cone rising straight out of the Sea of Japan" +
      "|Un cono volcánico casi perfecto que se alza directamente del mar de Japón" +
      "|Un cône volcanique presque parfait surgissant de la mer du Japon" +
      "|日本海にそびえる、ほぼ完全な円錐形の火山",
    "Rishiri's symmetrical cone earned it the nickname 'Rishiri-Fuji,' though the whole mountain is in fact a single dormant volcano that forms an entire island. Its name is thought to derive from the Ainu ri-shir, 'tall island,' though other readings of the word have also been proposed." +
      "|El cono simétrico de Rishiri le valió el apodo de 'Rishiri-Fuji', aunque en realidad toda la montaña es un único volcán inactivo que forma una isla entera. Se cree que su nombre proviene del ainu ri-shir, 'isla alta', aunque también se han propuesto otras lecturas de la palabra." +
      "|Le cône symétrique du Rishiri lui a valu le surnom de « Rishiri-Fuji », bien que toute la montagne soit en réalité un unique volcan endormi formant une île entière. Son nom viendrait de l'aïnou ri-shir, « haute île », bien que d'autres lectures du mot aient aussi été proposées." +
      "|整った円錐形から「利尻富士」の愛称で呼ばれるが、実際には島全体が一つの休火山でできている。名前はアイヌ語の「リ・シリ(高い島)」に由来するとされるが、他の解釈も唱えられている。",
    [
      prop(
        "Rishiri Hokuroku Campsite|Camping Hokuroku de Rishiri|Camping de Hokuroku (Rishiri)|利尻北麓野営場",
        180, 15,
      ),
      prop(
        "Rishiri-Fuji Hot Spring Inn|Posada de aguas termales Rishiri-Fuji|Auberge thermale du Rishiri-Fuji|利尻富士温泉旅館",
        1200, 95,
      ),
    ],
  ),

  yarigatake: city(
    "Mt. Yari|Monte Yari|Mont Yari|槍ヶ岳",
    137.6474, 36.3406, "kitaalps", "spire", "alpineridge", "r",
    "A Matterhorn-like spire that is the spiritual summit of Japanese mountaineering" +
      "|Una aguja similar al Cervino, cumbre espiritual del alpinismo japonés" +
      "|Une aiguille façon Cervin, sommet spirituel de l'alpinisme japonais" +
      "|マッターホルンにも例えられる鋭峰で、日本の登山史の象徴",
    "The final approach to the summit climbs a near-vertical rock face on chains and ladders bolted into the stone, a route first opened as a pilgrimage climb by the priest Banryu in 1828. The Yarigatake Lodge, built in 1917, still stands at the junction where ridges from three directions of the Northern Alps converge." +
      "|El tramo final hacia la cumbre asciende por una pared casi vertical con cadenas y escaleras fijadas a la roca, ruta abierta por primera vez como ascensión de peregrinaje por el monje Banryu en 1828. El refugio Yarigatake, construido en 1917, sigue en pie en el punto donde convergen crestas procedentes de tres direcciones de los Alpes Septentrionales." +
      "|La dernière partie vers le sommet grimpe une paroi presque verticale à l'aide de chaînes et d'échelles fixées dans la roche, itinéraire ouvert pour la première fois comme ascension de pèlerinage par le moine Banryu en 1828. Le refuge Yarigatake, construit en 1917, se dresse toujours au carrefour où se rejoignent des crêtes venues de trois directions des Alpes du Nord." +
      "|山頂直下は鎖と梯子が架けられたほぼ垂直の岩場で、1828年に播隆上人が信仰登山の道として初めて開いたとされる。1917年に建てられた槍ヶ岳山荘は、いまも北アルプス3方向からの尾根が集まる合流点に立つ。",
    [
      prop(
        "Yarigatake Lodge|Refugio Yarigatake|Refuge Yarigatake|槍ヶ岳山荘",
        1600, 130,
      ),
      prop(
        "Sesshō Hut|Refugio Sesshō|Refuge Sesshō|殺生ヒュッテ",
        950, 75,
      ),
    ],
  ),

  fujisan: city(
    "Mt. Fuji|Monte Fuji|Mont Fuji|富士山",
    138.7274, 35.3606, "kanto", "fuji", "fujilake", "l",
    "Japan's highest peak, an active volcano that last erupted in 1707" +
      "|El pico más alto de Japón, un volcán activo cuya última erupción fue en 1707" +
      "|Le plus haut sommet du Japon, un volcan actif dont la dernière éruption remonte à 1707" +
      "|日本最高峰にして、1707年を最後に噴火していない活火山",
    "Its symmetrical cone has been painted and printed for centuries, most famously in Hokusai's series of 36 views, though the mountain looks different from almost every angle it was drawn from. The 1707 Hoei eruption blanketed Edo, now Tokyo, in volcanic ash, and today the four trails to the summit are officially open only for about two months each summer, with slightly different dates set on the Yamanashi and Shizuoka sides." +
      "|Su cono simétrico ha sido pintado y grabado durante siglos, sobre todo en la serie de las 36 vistas de Hokusai, aunque la montaña luce distinta desde casi cada ángulo representado. La erupción Hoei de 1707 cubrió de ceniza volcánica Edo, la actual Tokio, y hoy los cuatro senderos hacia la cima solo están oficialmente abiertos unos dos meses cada verano, con fechas ligeramente distintas en las vertientes de Yamanashi y Shizuoka." +
      "|Son cône symétrique a été peint et gravé pendant des siècles, notamment dans la série des 36 vues d'Hokusai, bien que la montagne paraisse différente selon presque chaque angle représenté. L'éruption Hoei de 1707 a recouvert Edo, l'actuelle Tokyo, de cendres volcaniques, et aujourd'hui les quatre sentiers menant au sommet ne sont officiellement ouverts qu'environ deux mois chaque été, avec des dates légèrement différentes côté Yamanashi et côté Shizuoka." +
      "|その左右対称の稜線は葛飾北斎の『富嶽三十六景』をはじめ、幾世紀にもわたり絵に描かれてきたが、実際には見る角度でかなり印象が変わる。1707年の宝永噴火では江戸(現在の東京)にも火山灰が降り積もり、現在、山頂へ向かう4本の登山道が公式に開かれるのは夏のおよそ2か月間だけで、開山期間は山梨側と静岡側で若干異なる。",
    [
      prop(
        "Fuji Subaru Line 5th Station Lodge|Albergue de la 5.ª estación (Fuji Subaru Line)|Auberge du 5e poste (Fuji Subaru Line)|富士スバルライン五合目レストハウス",
        2400, 190,
      ),
      prop(
        "Fuji Summit Hut|Refugio de la cima del Fuji|Refuge du sommet du Fuji|富士山頂山口屋",
        1400, 110,
      ),
    ],
  ),

  sanjogatake: city(
    "Mt. Sanjō (Ōmine)|Monte Sanjō (Ōmine)|Mont Sanjō (Ōmine)|山上ヶ岳(大峰)",
    135.9195, 34.3103, "kinkihokuriku", "torii_peak", "shugendoforest", "l",
    "Ōmine's traditional pilgrimage peak of Shugendō asceticism, still closed to women today" +
      "|La cumbre de peregrinaje tradicional del ascetismo shugendō de Ōmine, aún cerrada a las mujeres" +
      "|Le sommet de pèlerinage traditionnel de l'ascèse shugendō de l'Ōmine, encore interdit aux femmes" +
      "|大峰修験の伝統的な参詣の頂で、今も女人禁制が続く",
    "Sanjogatake, where the Ominesan-ji temple stands, is Omine's traditional pilgrimage peak and remains one of the last summits in Japan closed to women, a Shugendo rule older than the modern era that continues despite debate, though the range's actual high point, nearby Hakkyogatake, carries no such restriction. Pilgrims still practice nozoki-gyo at Nishi-no-Nozoki, where they are held by rope and lowered head-first over a cliff edge to confront their fears." +
      "|Sanjōgatake, donde se alza el templo Ōminesan-ji, es la cumbre de peregrinaje tradicional de Ōmine y sigue siendo una de las últimas cimas de Japón cerradas a las mujeres, una norma shugendō anterior a la era moderna que persiste pese al debate, aunque el punto más alto real de la cordillera, el cercano Hakkyōgatake, no tiene esa restricción. Los peregrinos aún practican el nozoki-gyo en Nishi-no-Nozoki, donde se les sujeta con una cuerda y se les baja de cabeza por el borde de un acantilado para enfrentar sus miedos." +
      "|Le Sanjōgatake, où se dresse le temple Ōminesan-ji, est le sommet de pèlerinage traditionnel de l'Ōmine et reste l'un des derniers sommets du Japon interdits aux femmes, une règle shugendō antérieure à l'époque moderne qui perdure malgré le débat, bien que le point culminant réel de la chaîne, le Hakkyōgatake tout proche, n'ait pas cette restriction. Les pèlerins pratiquent encore le nozoki-gyo à Nishi-no-Nozoki, où on les retient par une corde pour les faire descendre tête la première au bord d'une falaise afin d'affronter leurs peurs." +
      "|大峯山寺が建つ山上ヶ岳は大峰修験の伝統的な参詣の頂で、近代以前からの掟により今も女人禁制が続く、日本でも数少ない山の一つである(すぐそばにある大峰山系の最高峰・八経ヶ岳にはこの禁制はない)。参詣者は今も「西の覗き」でロープに支えられ、断崖から頭を突き出して己の恐れと向き合う「覗き行」を行う。",
    [
      prop(
        "Ōminesan-ji Pilgrim Lodge|Alojamiento de peregrinos Ōminesan-ji|Gîte de pèlerins Ōminesan-ji|大峯山寺宿坊",
        620, 48,
      ),
      prop(
        "Dorogawa Hot Spring Inn|Posada termal de Dorogawa|Auberge thermale de Dorogawa|洞川温泉旅館",
        880, 68,
      ),
    ],
  ),

  miyanouradake: city(
    "Mt. Miyanoura|Monte Miyanoura|Mont Miyanoura|宮之浦岳",
    130.5025, 30.3378, "nishinihon", "domepeak", "cedarrainforest", "b",
    "Kyushu's highest point, a granite dome rising from a subtropical rainforest island" +
      "|El punto más alto de Kyushu, una cúpula de granito que emerge de una isla de selva subtropical" +
      "|Le point culminant de Kyushu, un dôme de granit surgissant d'une île de forêt tropicale humide" +
      "|九州最高峰。亜熱帯の照葉樹林に覆われた島から立ち上がる花崗岩の山",
    "Yakushima is so wet that locals say 'it rains thirty-five days a month,' and hikers climbing Miyanoura cross from subtropical coastal forest to a near-alpine, wind-battered summit in a single day. The island's ancient cedars, some estimated at well over a thousand years old, grow slowly in the mist and mineral-poor granite soil, which is part of why they have survived so long." +
      "|Yakushima es tan lluviosa que los lugareños dicen que 'llueve treinta y cinco días al mes', y quienes ascienden al Miyanoura pasan del bosque costero subtropical a una cumbre casi alpina y azotada por el viento en un solo día. Los antiguos cedros de la isla, algunos con edades estimadas muy por encima de los mil años, crecen lentamente en la niebla y el suelo granítico pobre en minerales, lo que en parte explica por qué han sobrevivido tanto tiempo." +
      "|Yakushima est si pluvieuse que les habitants disent qu'« il pleut trente-cinq jours par mois », et ceux qui gravissent le Miyanoura passent en une seule journée de la forêt côtière subtropicale à un sommet presque alpin battu par les vents. Les cèdres anciens de l'île, dont certains sont estimés à bien plus de mille ans, poussent lentement dans la brume et le sol granitique pauvre en minéraux, ce qui explique en partie leur longévité." +
      "|屋久島は「一月に三十五日雨が降る」と地元で言われるほど雨が多く、宮之浦岳に登ると亜熱帯の海岸林から一日で風の強い高山帯の山頂まで登り詰める。島の古い杉は千年をゆうに超えると推定される木もあり、霧に包まれ養分の乏しい花崗岩の土壌でゆっくり育つことが、長く生き延びてきた理由の一つとされる。",
    [
      prop(
        "Yodogawa Hut|Refugio Yodogawa|Refuge Yodogawa|淀川小屋",
        210, 17,
      ),
      prop(
        "Yakusugi Land Forest Park|Parque forestal Yakusugi Land|Parc forestier Yakusugi Land|ヤクスギランド",
        1050, 82,
      ),
    ],
  ),

  // ===================================================================
  // hokkaido (9) — rishiri は既存
  // ===================================================================

  rausudake: city(
    "Mt. Rausu|Monte Rausu|Mont Rausu|羅臼岳",
    145.0000, 44.0000, "hokkaido", "cone_volcano", "daisetsu_tundra", "r",
    "The highest peak of the Shiretoko Peninsula, a UNESCO World Heritage coastline" +
      "|El pico más alto de la península de Shiretoko, litoral Patrimonio Mundial" +
      "|Le plus haut sommet de la péninsule de Shiretoko, littoral classé à l'UNESCO" +
      "|世界遺産・知床半島の最高峰",
    "Shiretoko was inscribed as a World Heritage site in 2005 for a food chain that still runs unbroken from mountain forest to salmon-bearing river to sea, with Rausu-dake's slopes at its core. The peninsula also holds one of Japan's densest brown bear populations, and hikers here are asked to carry bear spray and follow strict food-storage rules." +
      "|Shiretoko fue inscrita como Patrimonio Mundial en 2005 por una cadena alimentaria que aún conecta sin interrupción el bosque de montaña, los ríos con salmón y el mar, con las laderas del Rausu-dake en su centro. La península alberga además una de las mayores densidades de osos pardos de Japón, y se pide a los excursionistas llevar spray antiosos y seguir normas estrictas de almacenamiento de alimentos." +
      "|Shiretoko a été inscrite au patrimoine mondial en 2005 pour une chaîne alimentaire qui relie encore sans rupture la forêt de montagne, les rivières à saumons et la mer, avec les pentes du Rausu-dake en son cœur. La péninsule abrite aussi l'une des plus fortes densités d'ours bruns du Japon, et les randonneurs y sont invités à emporter une bombe anti-ours et à suivre des règles strictes de stockage de la nourriture." +
      "|知床は、山の森・鮭の遡る川・海が途切れずつながる食物連鎖が評価され、羅臼岳を中心域として2005年に世界遺産に登録された。半島は日本でも屈指のヒグマの密度が高い土地でもあり、登山者には熊撃退スプレーの携行と厳格な食料管理が求められている。",
    [
      prop(
        "Iwaobetsu Trailhead Lodge|Albergue del sendero de Iwaobetsu|Auberge du départ d'Iwaobetsu|岩尾別登山口の山小屋",
        480, 38,
      ),
      prop(
        "Kuma-no-yu Wild Hot Spring|Aguas termales silvestres Kuma-no-yu|Source thermale sauvage Kuma-no-yu|熊の湯野天風呂",
        950, 74,
      ),
    ],
  ),

  sharidake: city(
    "Mt. Shari|Monte Shari|Mont Shari|斜里岳",
    144.9917, 43.8508, "hokkaido", "spire", "daisetsu_tundra", "r",
    "A solitary pyramid rising from the Shari plain, unobstructed by any neighbouring peak" +
      "|Una pirámide solitaria que se alza en la llanura de Shari, sin picos vecinos" +
      "|Une pyramide solitaire qui domine la plaine de Shari, sans sommet voisin" +
      "|斜里の平野に単独でそびえる、遮るもののない三角錐",
    "Because no other major peak stands nearby, Shari-dake's summit gives an unbroken view from the Sea of Okhotsk to the Shiretoko range, unusual in Hokkaido's more clustered ranges. Its Ainu-derived name is thought to relate to 'sar,' the reed marshes of the plain below, though scholars disagree on the exact origin." +
      "|Al no tener picos cercanos, la cima del Shari-dake ofrece una vista ininterrumpida desde el mar de Ojotsk hasta la cadena de Shiretoko, algo inusual en las cadenas más agrupadas de Hokkaido. Se cree que su nombre, de origen ainu, se relaciona con 'sar', los juncales de la llanura de abajo, aunque los estudiosos no coinciden en el origen exacto." +
      "|Sans autre grand sommet à proximité, le Shari-dake offre depuis son faîte une vue ininterrompue de la mer d'Okhotsk jusqu'à la chaîne de Shiretoko, chose rare dans les massifs plus resserrés de Hokkaido. Son nom, d'origine aïnoue, serait lié à « sar », les roselières de la plaine en contrebas, mais les spécialistes ne s'accordent pas sur son origine exacte." +
      "|近くに並び立つ山が無いため、斜里岳の山頂からはオホーツク海から知床連山まで遮るもののない眺めが得られる。北海道の他の山群では珍しい。アイヌ語由来とされる名は麓の湿地を指す「サル」に関わるという説があるが、語源には異説もある。",
    [
      prop(
        "Shari-dake Shrine Lodge|Albergue del santuario Shari-dake|Auberge du sanctuaire Shari-dake|斜里岳神社の宿舎",
        320, 26,
      ),
      prop(
        "Seven Falls Rest House|Casa de descanso de las Siete Cascadas|Maison de repos des Sept Cascades|七つ滝休憩所",
        260, 21,
      ),
    ],
  ),

  meakandake: city(
    "Mt. Meakan|Monte Meakan|Mont Meakan|雌阿寒岳",
    144.0136, 43.3839, "hokkaido", "caldera", "daisetsu_tundra", "l",
    "One of Japan's most active volcanoes, paired with its dormant 'male' twin" +
      "|Uno de los volcanes más activos de Japón, junto a su gemelo 'masculino' dormido" +
      "|L'un des volcans les plus actifs du Japon, jumelé à son double « masculin » endormi" +
      "|今も活発な火山で、休火山の「雄」阿寒岳と対をなす",
    "Meakan-dake still vents steam and sulfur from its crater and last erupted in 2008, while its extinct twin O-akan-dake stands quietly across Lake Akan; the paired names simply mean 'female' and 'male' Akan. At its foot, Lake Onneto is known for shifting between blue and emerald depending on the light and its dissolved minerals." +
      "|El Meakan-dake aún exhala vapor y azufre de su cráter y entró en erupción por última vez en 2008, mientras su gemelo extinto, el O-akan-dake, se alza en silencio al otro lado del lago Akan; los nombres emparejados significan simplemente Akan 'hembra' y 'macho'. A sus pies, el lago Onneto es célebre por virar entre el azul y el verde esmeralda según la luz y sus minerales disueltos." +
      "|Le Meakan-dake exhale encore vapeur et soufre de son cratère et est entré en éruption pour la dernière fois en 2008, tandis que son jumeau éteint, l'O-akan-dake, se dresse tranquillement de l'autre côté du lac Akan ; les noms jumelés signifient simplement Akan « femelle » et « mâle ». À son pied, le lac Onneto est réputé pour ses teintes changeantes, du bleu à l'émeraude, selon la lumière et ses minéraux dissous." +
      "|雌阿寒岳は今も火口から噴気と硫黄の匂いを上げ、最後の噴火は2008年である。対をなす休火山の雄阿寒岳は阿寒湖を挟んで静かに立ち、「雌」「雄」の名はそのまま対の呼び方にすぎない。麓のオンネトー湖は光の当たり方と溶け込む鉱物によって青やエメラルド色に変わることで知られる。",
    [
      prop(
        "Onneto Lakeside Lodge|Albergue junto al lago Onneto|Auberge au bord du lac Onneto|オンネトー湖畔の宿",
        780, 60,
      ),
      prop(
        "Crater Rim Rest House|Casa de descanso del borde del cráter|Maison de repos du bord du cratère|火口縁休憩所",
        340, 27,
      ),
    ],
  ),

  asahidake: city(
    "Mt. Asahi (Daisetsuzan)|Monte Asahi (Daisetsuzan)|Mont Asahi (Daisetsuzan)|旭岳(大雪山)",
    142.8506, 43.6631, "hokkaido", "caldera", "daisetsu_tundra", "l",
    "Hokkaido's highest peak, where Japan's autumn colours arrive first each year" +
      "|El pico más alto de Hokkaido, donde llegan primero los colores de otoño de Japón" +
      "|Le plus haut sommet de Hokkaido, où les couleurs d'automne du Japon arrivent en premier" +
      "|北海道最高峰。日本でいちばん早く紅葉が訪れる山",
    "At 2,291 metres, Asahi-dake is the tallest point in Hokkaido, and the dwarf pine and blueberry scrub on its upper slopes usually turn Japan's first autumn colours in early September. A ropeway shortens the climb, but the Jigokudani ('hell valley') vents just below the peak still hiss with volcanic steam." +
      "|Con 2.291 metros, el Asahi-dake es el punto más alto de Hokkaido, y el pino enano y los arbustos de arándano de sus laderas altas suelen teñirse con los primeros colores otoñales de Japón a principios de septiembre. Un teleférico acorta el ascenso, pero las fumarolas del Jigokudani ('valle del infierno'), justo bajo la cima, siguen silbando vapor volcánico." +
      "|Avec 2 291 mètres, l'Asahi-dake est le point culminant de Hokkaido, et le pin nain et les buissons de myrtille de ses pentes supérieures affichent d'ordinaire les toutes premières couleurs d'automne du Japon début septembre. Un téléphérique raccourcit l'ascension, mais les fumerolles du Jigokudani (« vallée de l'enfer »), juste sous le sommet, sifflent toujours de vapeur volcanique." +
      "|標高2291m、北海道最高峰の旭岳では、山肌を覆うハイマツやブルーベリー類の低木が9月上旬には日本で最も早い紅葉を迎える。ロープウェイで登りは短縮できるが、山頂直下の「地獄谷」では今も噴気が音を立てて上がっている。",
    [
      prop(
        "Asahidake Ropeway Station House|Estación del teleférico de Asahidake|Gare du téléphérique d'Asahidake|旭岳ロープウェイ駅舎",
        1900, 150,
      ),
      prop(
        "Sugatami Pond Rest House|Casa de descanso del estanque Sugatami|Maison de repos de l'étang Sugatami|姿見の池休憩所",
        620, 48,
      ),
    ],
  ),

  tomuraushi: city(
    "Mt. Tomuraushi|Monte Tomuraushi|Mont Tomuraushi|トムラウシ山",
    142.8497, 43.4211, "hokkaido", "grasspeak", "daisetsu_tundra", "b",
    "Hokkaido's 'flower garden,' a remote plateau of alpine meadows" +
      "|El 'jardín de flores' de Hokkaido, una meseta remota de praderas alpinas" +
      "|Le « jardin de fleurs » de Hokkaido, un haut plateau isolé de prairies alpines" +
      "|「花の百名山」と呼ばれる、高山植物の広がる遠い台地",
    "Tomuraushi's broad summit plateau is ringed with alpine flower meadows so extensive that climbers call it Hokkaido's flower garden, in bloom through most of the short subarctic summer. Its Ainu-derived name has been read several different ways by different scholars, and no single origin is agreed on today." +
      "|La amplia meseta cumbre del Tomuraushi está rodeada de praderas alpinas tan extensas que los alpinistas la llaman el jardín de flores de Hokkaido, en flor durante casi todo el breve verano subártico. Su nombre, de origen ainu, ha sido interpretado de varias formas distintas por los estudiosos, sin que exista hoy un origen único aceptado." +
      "|Le vaste plateau sommital du Tomuraushi est ceint de prairies alpines si étendues que les alpinistes l'appellent le jardin de fleurs de Hokkaido, en fleurs presque tout au long du court été subarctique. Son nom d'origine aïnoue a été lu de plusieurs façons différentes par les spécialistes, sans qu'aucune origine unique fasse consensus aujourd'hui." +
      "|トムラウシ山の広い山頂台地は高山植物のお花畑に囲まれ、短い亜寒帯の夏のあいだほぼ咲き続けることから「花の百名山」とも呼ばれる。アイヌ語由来とされる名は研究者によって読みが分かれ、今も定説がない。",
    [
      prop(
        "Tomuraushi Onsen Lodge|Albergue de aguas termales de Tomuraushi|Auberge thermale de Tomuraushi|トムラウシ温泉の宿",
        890, 68,
      ),
      prop(
        "Hisago-numa Shelter|Refugio de Hisago-numa|Refuge de Hisago-numa|ヒサゴ沼避難小屋",
        240, 19,
      ),
    ],
  ),

  tokachidake: city(
    "Mt. Tokachi|Monte Tokachi|Mont Tokachi|十勝岳",
    142.6847, 43.4183, "hokkaido", "cone_volcano", "daisetsu_tundra", "r",
    "An active volcano whose 1926 eruption caused one of Japan's deadliest lahars" +
      "|Un volcán activo cuya erupción de 1926 provocó uno de los lahares más mortíferos de Japón" +
      "|Un volcan actif dont l'éruption de 1926 provoqua l'un des lahars les plus meurtriers du Japon" +
      "|1926年の噴火で日本有数の泥流災害を起こした活火山",
    "The 1926 eruption melted snow on Tokachi-dake's slopes and sent a lahar down the mountain that destroyed two villages and killed 144 people, a disaster that shaped Japan's modern volcanic-hazard monitoring. A ski resort now operates on its lower slopes, and the summit crater still steams year-round." +
      "|La erupción de 1926 fundió la nieve de las laderas del Tokachi-dake y provocó un lahar que arrasó dos aldeas y mató a 144 personas, un desastre que marcó la vigilancia volcánica moderna de Japón. Hoy funciona una estación de esquí en sus laderas bajas, y el cráter de la cima sigue humeando todo el año." +
      "|L'éruption de 1926 fit fondre la neige sur les pentes du Tokachi-dake et provoqua un lahar qui détruisit deux villages et tua 144 personnes, une catastrophe qui a façonné la surveillance volcanique moderne du Japon. Une station de ski fonctionne aujourd'hui sur ses pentes basses, et le cratère sommital fume encore toute l'année." +
      "|1926年の噴火は十勝岳の斜面の雪を融かし、泥流が村を二つ呑み込んで144人の命を奪った。この災害は日本の火山防災のあり方を変えた。今も山麓にはスキー場があり、山頂の火口は一年を通じて噴気を上げている。",
    [
      prop(
        "Tokachidake Onsen Lodge|Albergue de aguas termales de Tokachidake|Auberge thermale de Tokachidake|十勝岳温泉の宿",
        1050, 82,
      ),
      prop(
        "Boubōdai Rest Shelter|Refugio de descanso Boubōdai|Abri de repos de Boubōdai|望岳台休憩舎",
        260, 20,
      ),
    ],
  ),

  poroshiridake: city(
    "Mt. Poroshiri|Monte Poroshiri|Mont Poroshiri|幌尻岳",
    142.6842, 42.5028, "hokkaido", "ridge_snow", "daisetsu_tundra", "l",
    "The Hidaka range's highest peak, reachable only by wading a river" +
      "|El pico más alto de la cordillera de Hidaka, accesible solo vadeando un río" +
      "|Le plus haut sommet de la chaîne de Hidaka, accessible seulement en traversant une rivière à gué" +
      "|日高山脈の最高峰。川を渡らないと登山口にすら着けない",
    "There is no road to the trailhead of Poroshiri-dake; climbers must wade across the Poroshiri River more than a dozen times before the trail even begins to climb, making it one of the physically hardest ascents among the hundred. The Hidaka range it crowns was thrust up by the collision of two tectonic plates, a process still measurable today." +
      "|No hay carretera hasta el inicio del sendero del Poroshiri-dake; los alpinistas deben vadear el río Poroshiri más de una decena de veces antes de que el sendero empiece siquiera a subir, lo que lo convierte en una de las ascensiones físicamente más duras de las cien. La cordillera de Hidaka que corona se levantó por la colisión de dos placas tectónicas, un proceso aún medible hoy." +
      "|Aucune route ne mène au départ du sentier du Poroshiri-dake ; les alpinistes doivent traverser la rivière Poroshiri à gué plus d'une douzaine de fois avant même que le sentier ne commence à grimper, ce qui en fait l'une des ascensions les plus dures physiquement parmi les cent. La chaîne de Hidaka qu'il couronne fut soulevée par la collision de deux plaques tectoniques, un processus encore mesurable aujourd'hui." +
      "|幌尻岳の登山口には車道が無く、道が登り始める前に幌尻川を十数回渡渉しなければならない。百名山のなかでも体力的に最も厳しい部類に入る。頂く日高山脈は二つのプレートの衝突で押し上げられた山地で、その動きは今も測定できる。",
    [
      prop(
        "Poroshiri Sanso Lodge|Refugio Poroshiri Sanso|Refuge Poroshiri Sanso|幌尻山荘",
        380, 30,
      ),
      prop(
        "Nanatsunuma Cirque Hut|Refugio del circo de Nanatsunuma|Refuge du cirque de Nanatsunuma|七ツ沼カール小屋",
        300, 24,
      ),
    ],
  ),

  yoteizan: city(
    "Mt. Yōtei|Monte Yōtei|Mont Yōtei|羊蹄山",
    140.8125, 42.8272, "hokkaido", "cone_volcano", "highland_meadow", "r",
    "A near-perfect volcanic cone nicknamed 'Ezo Fuji,' ringed by farmland" +
      "|Un cono volcánico casi perfecto apodado 'Fuji de Ezo', rodeado de campos" +
      "|Un cône volcanique presque parfait surnommé le « Fuji d'Ezo », ceint de terres agricoles" +
      "|「蝦夷富士」と呼ばれる整った円錐形。裾野は農地に囲まれる",
    "Yōtei-zan's crater rim holds nine small ponds fed by snowmelt, and its lower slopes are surrounded by the dairy pastures and potato fields of the Niseko basin. The mountain has erupted only rarely in recorded history, and its symmetrical shape has made it a landmark for the region's increasingly international ski resorts." +
      "|El borde del cráter del Yōtei-zan alberga nueve pequeños estanques alimentados por el deshielo, y sus laderas bajas están rodeadas de pastos lecheros y campos de patatas de la cuenca de Niseko. La montaña ha entrado en erupción solo raramente en la historia registrada, y su forma simétrica la ha convertido en el emblema de las estaciones de esquí cada vez más internacionales de la región." +
      "|Le rebord du cratère du Yōtei-zan abrite neuf petits étangs alimentés par la fonte des neiges, et ses pentes basses sont entourées des pâturages laitiers et des champs de pommes de terre du bassin de Niseko. La montagne n'est entrée en éruption que rarement dans l'histoire connue, et sa forme symétrique en a fait le repère des stations de ski de la région, de plus en plus internationales." +
      "|羊蹄山の火口縁には雪解け水がたまった九つの小さな池があり、山麓はニセコ盆地の酪農地とじゃがいも畑に囲まれている。記録に残る噴火はごくわずかで、その整った姿は近年ますます国際色を増すこの地域のスキーリゾートの目印になっている。",
    [
      prop(
        "Kimobetsu Trailhead Lodge|Albergue del sendero de Kimobetsu|Auberge du départ de Kimobetsu|喜茂別登山口の宿",
        520, 40,
      ),
      prop(
        "Niseko Dairy Rest House|Casa de descanso lechera de Niseko|Maison de repos laitière de Niseko|ニセコ酪農休憩所",
        640, 50,
      ),
    ],
  ),

  // ===================================================================
  // tohoku (12)
  // ===================================================================

  iwakisan: city(
    "Mt. Iwaki|Monte Iwaki|Mont Iwaki|岩木山",
    140.3033, 40.6558, "tohoku", "cone_volcano", "beech_ridge", "l",
    "Tsugaru's sacred volcano, climbed each August in a white pilgrim's robe" +
      "|El volcán sagrado de Tsugaru, escalado cada agosto con túnica blanca de peregrino" +
      "|Le volcan sacré de Tsugaru, gravi chaque août en robe blanche de pèlerin" +
      "|津軽の霊峰。8月には白装束の登拝が今も行われる",
    "Every August, pilgrims in white climbing dress still walk the Oyama-sankei route up Iwaki-san, a Shinto rite older than written record that ends at the shrine on the summit. Because it stands apart from any other range, the mountain is visible from nearly all of the Tsugaru plain and has long served local farmers as a natural calendar for planting." +
      "|Cada agosto, peregrinos con túnica blanca de ascensión aún recorren la ruta Oyama-sankei hasta el Iwaki-san, un rito sintoísta anterior a todo registro escrito que termina en el santuario de la cima. Al estar aislada de cualquier otra cadena, la montaña se ve desde casi toda la llanura de Tsugaru y ha servido durante mucho tiempo a los agricultores como un calendario natural de siembra." +
      "|Chaque mois d'août, des pèlerins en robe blanche d'ascension parcourent encore l'itinéraire Oyama-sankei jusqu'au Iwaki-san, un rite shinto antérieur à tout document écrit qui s'achève au sanctuaire du sommet. Isolée de toute autre chaîne, la montagne se voit depuis presque toute la plaine de Tsugaru et sert depuis longtemps aux agriculteurs de calendrier naturel des semailles." +
      "|毎年8月、白装束の登拝者が文字に残る記録より古いとされる「お山参詣」の道をたどり、山頂の岩木山神社奥宮まで登る。他の山地から離れて単独でそびえるため津軽平野のほぼどこからも見え、農家にとっては種まきの目安となる自然の暦でもあった。",
    [
      prop(
        "Iwakiyama Shrine Lodge|Albergue del santuario Iwakiyama|Auberge du sanctuaire Iwakiyama|岩木山神社の宿坊",
        420, 34,
      ),
      prop(
        "Hyakuzawa Onsen Inn|Posada termal de Hyakuzawa|Auberge thermale de Hyakuzawa|百沢温泉旅館",
        860, 68,
      ),
    ],
  ),

  hakkodasan: city(
    "Mt. Hakkoda|Monte Hakkoda|Mont Hakkoda|八甲田山",
    140.8775, 40.6597, "tohoku", "ridge_snow", "beech_ridge", "r",
    "A cluster of 18 volcanic peaks famous for frost-armoured 'snow monsters'" +
      "|Un conjunto de 18 picos volcánicos famoso por sus 'monstruos de nieve' escarchados" +
      "|Un ensemble de 18 sommets volcaniques réputé pour ses « monstres de neige » givrés" +
      "|18の峰からなる火山群。樹氷の「スノーモンスター」で知られる",
    "In winter, wind-driven ice coats the peak's Aomori fir trees into the rounded white shapes known as juhyo, or 'snow monsters,' now lit at night for visitors riding the ropeway. The range is also remembered for an 1902 Imperial Army training march in which 199 of 210 soldiers died in a blizzard, a disaster that reshaped Japanese cold-weather safety training." +
      "|En invierno, el hielo empujado por el viento cubre los abetos de Aomori de la cima con las formas blancas y redondeadas llamadas juhyo, o 'monstruos de nieve', hoy iluminados de noche para quienes suben en teleférico. La cordillera también se recuerda por una marcha de instrucción del ejército imperial en 1902 en la que 199 de 210 soldados murieron en una ventisca, un desastre que transformó la formación japonesa para el frío." +
      "|En hiver, la glace poussée par le vent recouvre les sapins d'Aomori du sommet de formes blanches et arrondies appelées juhyo, ou « monstres de neige », aujourd'hui illuminés la nuit pour les visiteurs du téléphérique. La chaîne reste aussi associée à une marche d'entraînement de l'armée impériale en 1902, où 199 des 210 soldats moururent dans un blizzard, un désastre qui transforma l'entraînement japonais au froid." +
      "|冬、風に運ばれた氷がアオモリトドマツを覆い、丸みを帯びた白い姿の「樹氷」(スノーモンスター)をつくる。ロープウェイで訪れる観光客のため夜には照明も当てられる。1902年には陸軍の雪中行軍訓練で210名中199名が吹雪の中で命を落とす遭難が起き、日本の寒冷地訓練のあり方を変える出来事となった。",
    [
      prop(
        "Sukayu Onsen Lodge|Albergue termal de Sukayu|Auberge thermale de Sukayu|酸ヶ湯温泉の宿",
        920, 72,
      ),
      prop(
        "Hakkoda Ropeway Station House|Estación del teleférico de Hakkoda|Gare du téléphérique de Hakkoda|八甲田ロープウェー駅舎",
        1400, 110,
      ),
    ],
  ),

  iwatesan: city(
    "Mt. Iwate|Monte Iwate|Mont Iwate|岩手山",
    141.0011, 39.8508, "tohoku", "cone_volcano", "beech_ridge", "l",
    "The 'Nanbu Fuji,' a volcano celebrated by the poet Kenji Miyazawa" +
      "|El 'Fuji de Nanbu', un volcán cantado por el poeta Kenji Miyazawa" +
      "|Le « Fuji de Nanbu », un volcan célébré par le poète Kenji Miyazawa" +
      "|「南部富士」。宮沢賢治が繰り返し詩に詠んだ火山",
    "Poet and schoolteacher Kenji Miyazawa, who grew up in its shadow, referred to Iwate-san repeatedly in his poems and stories, describing it under thin fictional names as a fixture of the landscape he loved. At its foot, Koiwai Farm, founded in 1891, is one of Japan's oldest working dairy farms and still grazes cattle on the volcano's lower pastures." +
      "|El poeta y maestro Kenji Miyazawa, que creció a su sombra, mencionó el Iwate-san una y otra vez en sus poemas y relatos, describiéndolo bajo nombres apenas velados como un rasgo fijo del paisaje que amaba. A sus pies, la granja Koiwai, fundada en 1891, es una de las explotaciones lecheras más antiguas de Japón y aún pace ganado en los pastos bajos del volcán." +
      "|Le poète et instituteur Kenji Miyazawa, qui grandit à son ombre, évoqua sans cesse l'Iwate-san dans ses poèmes et récits, le décrivant sous des noms à peine voilés comme un repère du paysage qu'il aimait. À son pied, la ferme Koiwai, fondée en 1891, est l'une des plus anciennes exploitations laitières du Japon en activité et fait encore paître son bétail sur les pâturages bas du volcan." +
      "|その麓で育った詩人・宮沢賢治は岩手山を作品に繰り返し登場させ、少し形を変えた名で愛した風景の要として描いた。山麓の小岩井農場は1891年創業、今も操業する日本最古級の牧場の一つで、火山の裾野で牛が放牧されている。",
    [
      prop(
        "Koiwai Farm Guesthouse|Casa de huéspedes de la granja Koiwai|Gîte de la ferme Koiwai|小岩井農場のゲストハウス",
        740, 58,
      ),
      prop(
        "Hachimantai Rest Lodge|Albergue de descanso de Hachimantai|Auberge de repos de Hachimantai|八幡平休憩の宿",
        380, 30,
      ),
    ],
  ),

  hayachinesan: city(
    "Mt. Hayachine|Monte Hayachine|Mont Hayachine|早池峰山",
    141.4783, 39.5511, "tohoku", "grasspeak", "beech_ridge", "r",
    "A serpentine peak whose rare soil grows flowers found nowhere else" +
      "|Un pico de serpentinita cuyo raro suelo cría flores que no crecen en ningún otro lugar" +
      "|Un sommet de serpentinite dont le sol rare fait pousser des fleurs introuvables ailleurs" +
      "|蛇紋岩の山。ここにしか咲かない花を育てる特殊な土壌",
    "Hayachine-san's summit is built of serpentine rock, whose mineral-poor, heavy-metal soil supports alpine flowers found almost nowhere else on Earth, including the edelweiss relative Hayachine-usuyukisou. The shrine at its base hosts Hayachine Kagura, a masked ritual dance recognised by UNESCO, performed by villagers for centuries to bless the harvest." +
      "|La cima del Hayachine-san está formada por roca serpentinita, cuyo suelo pobre en nutrientes y rico en metales pesados sostiene flores alpinas que casi no existen en ningún otro lugar del planeta, entre ellas la Hayachine-usuyukisou, pariente del edelweiss. El santuario de su base acoge el Hayachine Kagura, una danza ritual enmascarada reconocida por la UNESCO, que los aldeanos ejecutan desde hace siglos para bendecir la cosecha." +
      "|Le sommet du Hayachine-san est fait de roche serpentinite, dont le sol pauvre en nutriments et riche en métaux lourds abrite des fleurs alpines que l'on ne trouve presque nulle part ailleurs sur Terre, dont la Hayachine-usuyukisou, apparentée à l'edelweiss. Le sanctuaire à son pied accueille le Hayachine Kagura, une danse rituelle masquée reconnue par l'UNESCO, exécutée par les villageois depuis des siècles pour bénir la récolte." +
      "|早池峰山の山頂部は蛇紋岩でできており、養分に乏しく重金属を含むその土壌が、地球上でほぼここにしか育たない高山植物(ウスユキソウの仲間ハヤチネウスユキソウなど)を支えている。麓の神社ではユネスコ無形文化遺産の早池峰神楽が伝わり、村人たちが何世紀も豊作を祈って舞ってきた。",
    [
      prop(
        "Kawaramono Trailhead Inn|Posada del sendero de Kawaramono|Auberge du départ de Kawaramono|河原の坊登山口の宿",
        360, 28,
      ),
      prop(
        "Hayachine Kagura Hall|Sala del Hayachine Kagura|Salle du Hayachine Kagura|早池峰神楽伝承館",
        480, 38,
      ),
    ],
  ),

  chokaisan: city(
    "Mt. Chokai|Monte Chokai|Mont Chokai|鳥海山",
    139.9908, 39.0967, "tohoku", "cone_volcano", "beech_ridge", "l",
    "The 'Dewa Fuji,' a coastal volcano long used as a landmark by sailors" +
      "|El 'Fuji de Dewa', un volcán costero usado durante siglos como referencia por los marinos" +
      "|Le « Fuji de Dewa », un volcan côtier longtemps utilisé comme repère par les marins" +
      "|「出羽富士」。船乗りが古くから目印にした海辺の火山",
    "Chokai-san rises almost directly from the Sea of Japan coastline, and its snow-streaked cone was used for centuries by sailors as a navigation landmark visible far out to sea. Snow lingers so long on its upper slopes that a small ski area near the summit stays open into early summer, long after lowland snow has melted." +
      "|El Chokai-san se alza casi directamente desde la costa del mar de Japón, y su cono veteado de nieve fue usado durante siglos por los marinos como referencia de navegación visible mar adentro. La nieve persiste tanto en sus laderas altas que una pequeña pista de esquí cerca de la cima sigue abierta hasta principios de verano, mucho después de fundirse la nieve de las tierras bajas." +
      "|Le Chokai-san s'élève presque directement depuis le littoral de la mer du Japon, et son cône strié de neige servit pendant des siècles de repère de navigation visible au large pour les marins. La neige persiste si longtemps sur ses pentes hautes qu'un petit domaine skiable près du sommet reste ouvert jusqu'au début de l'été, bien après la fonte des neiges en plaine." +
      "|鳥海山は日本海の海岸線からほぼ直接そびえ立ち、雪の筋が残るその姿は古くから船乗りたちの航海の目印とされてきた。山頂付近は雪解けが遅く、平地の雪がとうに消えたあとの初夏まで小さなスキー場が営業を続ける。",
    [
      prop(
        "Chokai Blue Line Lodge|Albergue de la Chokai Blue Line|Auberge de la Chokai Blue Line|鳥海ブルーラインの宿",
        680, 54,
      ),
      prop(
        "Fugenko Crater Lake Hut|Refugio del lago de cráter Fugenko|Refuge du lac de cratère Fugenko|鳥海湖畔の小屋",
        290, 23,
      ),
    ],
  ),

  gassan: city(
    "Mt. Gassan|Monte Gassan|Mont Gassan|月山",
    140.0281, 38.5486, "tohoku", "grasspeak", "beech_ridge", "r",
    "One of the Three Mountains of Dewa, sacred to death and rebirth" +
      "|Una de las Tres Montañas de Dewa, sagrada para la muerte y el renacimiento" +
      "|L'une des Trois Montagnes de Dewa, sacrée pour la mort et la renaissance" +
      "|出羽三山の一つ。死と再生を司る霊山",
    "In the Shugendo pilgrimage of the Three Mountains of Dewa, Gassan represents death and the afterlife, the middle stage between Haguro-san's present world and Yudono-san's rebirth. Snow lingers so deep on its slopes that a ski area near the eighth station stays open into July, one of the latest-closing runs in Japan." +
      "|En la peregrinación shugendo de las Tres Montañas de Dewa, el Gassan representa la muerte y el más allá, la etapa intermedia entre el mundo presente del Haguro-san y el renacimiento del Yudono-san. La nieve se acumula tan profunda en sus laderas que una pista de esquí cerca de la octava estación permanece abierta hasta julio, una de las que cierran más tarde en Japón." +
      "|Dans le pèlerinage shugendo des Trois Montagnes de Dewa, le Gassan représente la mort et l'au-delà, l'étape intermédiaire entre le monde présent du Haguro-san et la renaissance du Yudono-san. La neige s'accumule si profondément sur ses pentes qu'un domaine skiable près de la huitième station reste ouvert jusqu'en juillet, l'un des derniers à fermer au Japon." +
      "|出羽三山の修験道の巡礼において、月山は現世を表す羽黒山と再生を表す湯殿山のあいだに位置し、死とその先の世界を司るとされる。斜面には雪が深く残り、八合目付近のスキー場は7月まで営業する、日本でも屈指の遅くまで滑れる場所である。",
    [
      prop(
        "Gassan Eighth Station Lodge|Albergue del octavo hito del Gassan|Auberge du huitième repère du Gassan|月山八合目の山小屋",
        560, 44,
      ),
      prop(
        "Shizu Onsen Inn|Posada termal de Shizu|Auberge thermale de Shizu|志津温泉旅館",
        780, 62,
      ),
    ],
  ),

  oasahidake: city(
    "Mt. Ō-asahi|Monte Ō-asahi|Mont Ō-asahi|大朝日岳",
    139.9647, 38.2836, "tohoku", "ridge_snow", "beech_ridge", "l",
    "The highest peak of a wilderness range that still feeds the rice paddies below" +
      "|El pico más alto de una cordillera salvaje que aún riega los arrozales de abajo" +
      "|Le plus haut sommet d'une chaîne sauvage qui irrigue encore les rizières en contrebas" +
      "|山麓の稲作を支え続ける、手つかずの山域の最高峰",
    "The Asahi range remains one of Tohoku's least developed wildernesses, with no roads crossing it, and Ō-asahi-dake at its centre is reached only by long ridge walks of two days or more. Snowmelt from its slopes feeds the rice-growing basins of the Okitama and Shonai regions, long prized for the clarity of their irrigation water." +
      "|La cordillera Asahi sigue siendo una de las zonas salvajes menos desarrolladas de Tohoku, sin carreteras que la crucen, y el Ō-asahi-dake, en su centro, solo se alcanza tras largas caminatas de cresta de dos días o más. El agua de deshielo de sus laderas alimenta las cuencas arroceras de Okitama y Shonai, apreciadas desde hace tiempo por la claridad de su agua de riego." +
      "|La chaîne Asahi reste l'une des zones sauvages les moins aménagées du Tohoku, sans route la traversant, et l'Ō-asahi-dake, en son centre, ne s'atteint qu'après de longues marches de crête de deux jours ou plus. La fonte des neiges de ses pentes alimente les bassins rizicoles d'Okitama et de Shonai, appréciés de longue date pour la limpidité de leur eau d'irrigation." +
      "|朝日連峰は道路が一本も通らない、東北でも屈指の手つかずの山域で、その中心にある大朝日岳へは2日以上かかる長い尾根歩きでしか到達できない。斜面の雪解け水は置賜・庄内の稲作地帯を潤し、その水の清らかさは古くから重んじられてきた。",
    [
      prop(
        "Ō-asahidake Sanso Lodge|Refugio Ō-asahidake Sanso|Refuge Ō-asahidake Sanso|大朝日岳避難小屋",
        260, 21,
      ),
      prop(
        "Kotsunagi Onsen Inn|Posada termal de Kotsunagi|Auberge thermale de Kotsunagi|古寺鉱泉旅館",
        620, 48,
      ),
    ],
  ),

  zaosan: city(
    "Mt. Zao|Monte Zao|Mont Zao|蔵王山",
    140.4406, 38.1461, "tohoku", "caldera", "beech_ridge", "r",
    "Home to the 'snow monsters' and a crater lake that changes colour" +
      "|Hogar de los 'monstruos de nieve' y un lago de cráter que cambia de color" +
      "|Domaine des « monstres de neige » et d'un lac de cratère aux couleurs changeantes" +
      "|樹氷と、色を変える火口湖「お釜」で知られる",
    "Zao's Okama crater lake shifts between shades of green and blue depending on the season and the acidity of its water, and has no outflow, filled only by rain and snowmelt. On the mountain's western slopes, the same wind-driven frost that builds Hakkoda's snow monsters coats the fir forest into the shapes Zao is best known for among winter visitors." +
      "|El lago de cráter Okama del Zao cambia entre tonos de verde y azul según la estación y la acidez de su agua, y no tiene desagüe, alimentado solo por la lluvia y el deshielo. En las laderas occidentales de la montaña, la misma escarcha empujada por el viento que forma los monstruos de nieve del Hakkoda cubre el bosque de abetos con las formas por las que Zao es más conocido entre los visitantes de invierno." +
      "|Le lac de cratère Okama du Zao passe du vert au bleu selon la saison et l'acidité de son eau, et n'a pas d'exutoire, alimenté seulement par la pluie et la fonte des neiges. Sur les pentes ouest de la montagne, le même givre poussé par le vent qui façonne les monstres de neige du Hakkoda recouvre la sapinière des formes pour lesquelles le Zao est le plus connu des visiteurs d'hiver." +
      "|蔵王のお釜は季節や水の酸性度によって緑や青に色を変える火口湖で、流れ出す川を持たず雨と雪解け水だけで満たされている。西側の斜面では、八甲田と同じ風による着氷がモミの樹林を覆い、冬の観光客に最もよく知られる蔵王の樹氷をつくる。",
    [
      prop(
        "Zao Onsen Grand Inn|Gran posada termal de Zao|Grande auberge thermale de Zao|蔵王温泉の大旅館",
        1300, 102,
      ),
      prop(
        "Okama Overlook Rest House|Casa de descanso del mirador de Okama|Maison de repos du belvédère d'Okama|お釜展望休憩所",
        340, 27,
      ),
    ],
  ),

  iidesan: city(
    "Mt. Iide|Monte Iide|Mont Iide|飯豊山",
    139.7025, 37.8256, "tohoku", "ridge_snow", "beech_ridge", "l",
    "A summit shrine that made a thin strip of land a Fukushima exclave" +
      "|Un santuario cumbre que convirtió una franja de tierra en enclave de Fukushima" +
      "|Un sanctuaire sommital qui fit d'une bande de terre une enclave de Fukushima" +
      "|山頂の神社が、福島県の細長い飛び地を生んだ",
    "A 19th-century land dispute over the pilgrimage trail to Iide-san's summit shrine left a narrow strip of the ridge, mostly in Yamagata and Niigata territory, registered as part of Fukushima prefecture, an administrative quirk that still shows on maps today. The long ridge-line traverse required to reach it has given the mountain a reputation as one of the hundred's more serious undertakings." +
      "|Una disputa territorial del siglo XIX por la senda de peregrinación al santuario cumbre del Iide-san dejó una franja estrecha de la cresta, en su mayoría en territorio de Yamagata y Niigata, registrada como parte de la prefectura de Fukushima, una rareza administrativa que aún aparece en los mapas actuales. La larga travesía de cresta necesaria para llegar le ha dado fama de ser una de las empresas más serias entre las cien." +
      "|Un différend territorial du XIXe siècle sur le sentier de pèlerinage menant au sanctuaire sommital de l'Iide-san a laissé une étroite bande de crête, essentiellement en territoire de Yamagata et de Niigata, enregistrée comme faisant partie de la préfecture de Fukushima, une bizarrerie administrative encore visible sur les cartes actuelles. La longue traversée de crête nécessaire pour l'atteindre lui a valu la réputation d'être l'une des entreprises les plus sérieuses parmi les cent." +
      "|19世紀に山頂の神社への参詣道をめぐって起きた領地争いの結果、尾根の細い一部が山形・新潟県域にありながら福島県に属する形で残り、今も地図に表れる行政上の珍事となっている。そこへ至るには長い縦走が必要で、百名山のなかでも本格的な部類とされる。",
    [
      prop(
        "Iide Honzan Shrine Lodge|Albergue del santuario Iide Honzan|Auberge du sanctuaire Iide Honzan|飯豊山本山小屋",
        280, 22,
      ),
      prop(
        "Kawanishi Onsen Inn|Posada termal de Kawanishi|Auberge thermale de Kawanishi|川西温泉旅館",
        640, 50,
      ),
    ],
  ),

  azumasan: city(
    "Mt. Nishi-Azuma|Monte Nishi-Azuma|Mont Nishi-Azuma|西吾妻山",
    140.1719, 37.7256, "tohoku", "marsh", "beech_ridge", "r",
    "A gentle volcanic summit with a boardwalked marsh plateau" +
      "|Una cumbre volcánica suave con una meseta pantanosa de pasarelas de madera" +
      "|Un sommet volcanique doux doté d'un plateau marécageux à passerelles" +
      "|木道の敷かれた湿原台地を持つ、なだらかな火山の頂",
    "Unlike the sharper cones nearby, Nishi-Azuma's summit is a broad, rounded plateau, its Jododaira marshland crossed by boardwalks through cotton-grass and alpine bog plants. The Bandai-Azuma Skyline road below was one of Japan's first mountain scenic drives, opened in 1959 to bring sightseers to a range once reached only on foot." +
      "|A diferencia de los conos más afilados cercanos, la cima del Nishi-Azuma es una meseta amplia y redondeada, con su pantano de Jododaira cruzado por pasarelas entre algodón de las nieves y plantas de turbera alpina. La carretera panorámica Bandai-Azuma Skyline, más abajo, fue una de las primeras rutas escénicas de montaña de Japón, abierta en 1959 para llevar visitantes a una cordillera antes accesible solo a pie." +
      "|Contrairement aux cônes plus acérés voisins, le sommet du Nishi-Azuma est un plateau large et arrondi, sa tourbière de Jododaira traversée par des passerelles au milieu de linaigrettes et de plantes de tourbière alpine. La route panoramique Bandai-Azuma Skyline, en contrebas, fut l'une des premières routes de montagne touristiques du Japon, ouverte en 1959 pour amener des visiteurs dans une chaîne autrefois accessible seulement à pied." +
      "|近隣の鋭い峰々と違い、西吾妻山の山頂は広くなだらかな台地で、浄土平の湿原には木道が敷かれ、ワタスゲなど高層湿原の植物のあいだを歩ける。麓を走る磐梯吾妻スカイラインは1959年開通の日本初期の山岳観光道路の一つで、かつては徒歩でしか入れなかった山域に観光客を運ぶようになった。",
    [
      prop(
        "Jododaira Rest House|Casa de descanso de Jododaira|Maison de repos de Jododaira|浄土平休憩所",
        320, 25,
      ),
      prop(
        "Takayu Onsen Inn|Posada termal de Takayu|Auberge thermale de Takayu|高湯温泉旅館",
        980, 76,
      ),
    ],
  ),

  adatarayama: city(
    "Mt. Adatara|Monte Adatara|Mont Adatara|安達太良山",
    140.2828, 37.6256, "tohoku", "cone_volcano", "beech_ridge", "l",
    "The mountain whose sky a famous poem called 'the real sky'" +
      "|La montaña cuyo cielo un poema célebre llamó 'el cielo de verdad'" +
      "|La montagne dont le ciel, selon un poème célèbre, est « le vrai ciel »" +
      "|「ほんとの空」と詩に詠まれた山",
    "Sculptor and poet Takamura Kotaro wrote of his wife Chieko, who grew up at the mountain's foot, that 'the sky over Adatara is the real sky,' a line from his 1941 collection Chieko-sho still memorised by Japanese schoolchildren today. The volcano's active crater, Numanotaira, continues to vent steam on its northern flank above the hot-spring town of Dake." +
      "|El escultor y poeta Takamura Kotaro escribió sobre su esposa Chieko, criada al pie de la montaña, que 'el cielo sobre el Adatara es el cielo de verdad', un verso de su colección de 1941 Chieko-sho que los escolares japoneses aún memorizan hoy. El cráter activo del volcán, Numanotaira, sigue exhalando vapor en su ladera norte, sobre el pueblo termal de Dake." +
      "|Le sculpteur et poète Takamura Kotaro écrivit de son épouse Chieko, qui grandit au pied de la montagne, que « le ciel au-dessus de l'Adatara est le vrai ciel », un vers de son recueil de 1941 Chieko-sho que les écoliers japonais apprennent encore par cœur aujourd'hui. Le cratère actif du volcan, Numanotaira, continue de dégager de la vapeur sur son flanc nord, au-dessus de la ville thermale de Dake." +
      "|彫刻家で詩人の高村光太郎は、山麓で育った妻・智恵子について「あれが阿多多羅山、あの光るのが阿武隈川」という詩集『智恵子抄』(1941年)の一節で「ほんとの空が見える」と詠み、この一節は今も学校で親しまれている。活火口の沼ノ平は今も北側斜面で噴気を上げ、その麓には岳温泉がある。",
    [
      prop(
        "Dake Onsen Inn|Posada termal de Dake|Auberge thermale de Dake|岳温泉旅館",
        860, 68,
      ),
      prop(
        "Kurogane Lodge|Refugio Kurogane|Refuge Kurogane|くろがね小屋",
        270, 21,
      ),
    ],
  ),

  bandaisan: city(
    "Mt. Bandai|Monte Bandai|Mont Bandai|磐梯山",
    140.0733, 37.6008, "tohoku", "caldera", "beech_ridge", "r",
    "A collapsed volcano whose 1888 eruption created a district of 300 lakes" +
      "|Un volcán colapsado cuya erupción de 1888 creó una comarca de 300 lagos" +
      "|Un volcan effondré dont l'éruption de 1888 créa une région de 300 lacs" +
      "|1888年の噴火で崩れ、300もの湖沼を生んだ火山",
    "The 1888 eruption blew out Bandai-san's entire north face in a lateral collapse, and the resulting debris dammed valleys into the more than 300 lakes and ponds of today's Urabandai district, including the Goshiki-numa 'five-coloured ponds.' Seen from the south the mountain still looks like a symmetrical 'Aizu Fuji,' its collapsed side hidden from that angle." +
      "|La erupción de 1888 arrancó por completo la cara norte del Bandai-san en un colapso lateral, y los escombros resultantes represaron valles hasta formar los más de 300 lagos y estanques de la actual comarca de Urabandai, entre ellos el Goshiki-numa, los 'estanques de cinco colores'. Vista desde el sur, la montaña aún parece un simétrico 'Fuji de Aizu', con su cara colapsada oculta desde ese ángulo." +
      "|L'éruption de 1888 a arraché tout le versant nord du Bandai-san lors d'un effondrement latéral, et les débris qui en résultèrent endiguèrent des vallées pour former les plus de 300 lacs et étangs de l'actuel district d'Urabandai, dont le Goshiki-numa, les « étangs aux cinq couleurs ». Vue du sud, la montagne ressemble encore à un « Fuji d'Aizu » symétrique, son flanc effondré étant caché sous cet angle." +
      "|1888年の噴火は磐梯山の北面をまるごと吹き飛ばす山体崩壊を起こし、流れ出た岩屑が谷をせき止めて、五色沼をはじめ今日の裏磐梯に300以上の湖沼を生んだ。南側から見るといまも左右対称の「会津富士」の姿を保っており、崩れた北面はその角度からは見えない。",
    [
      prop(
        "Goshikinuma Lakeside Lodge|Albergue junto a Goshikinuma|Auberge au bord de Goshikinuma|五色沼畔の宿",
        980, 76,
      ),
      prop(
        "Bandai Hachiman Rest House|Casa de descanso de Bandai Hachiman|Maison de repos de Bandai Hachiman|磐梯八幡休憩所",
        320, 25,
      ),
    ],
  ),

  // ===================================================================
  // joshinetsu / kanto — もとは1ブロックだった29座を、下の指定行で
  // joshinetsu(17・上信越)と kanto(14・関東+富士・伊豆の2座を吸収)に
  // 分割している。ブロックの並び順そのものは変えていない。
  // ===================================================================

  nasudake: city(
    "Mt. Nasu|Monte Nasu|Mont Nasu|那須岳",
    139.9628, 37.1219, "kanto", "cone_volcano", "beech_ridge", "r",
    "An active volcano above one of Japan's oldest hot spring towns" +
      "|Un volcán activo sobre uno de los pueblos termales más antiguos de Japón" +
      "|Un volcan actif au-dessus de l'une des plus anciennes villes thermales du Japon" +
      "|日本有数の古湯を見下ろす活火山",
    "Chausu-dake, Nasu's active cone, still vents steam near its ropeway station, and the hot springs at its foot are traditionally said to have been found in the 7th century. Below the trail sits the Sesshoseki, a boulder from local legend said to kill anyone who touches it; the stone itself split apart in 2022, an event widely reported at the time." +
      "|El Chausu-dake, el cono activo de Nasu, aún exhala vapor cerca de su estación de teleférico, y se dice tradicionalmente que las aguas termales de su base se descubrieron en el siglo VII. Bajo el sendero se halla la Sesshoseki, una roca de la leyenda local que se dice mata a quien la toca; la piedra misma se partió en 2022, un suceso muy divulgado en su momento." +
      "|Le Chausu-dake, le cône actif de Nasu, dégage encore de la vapeur près de sa gare de téléphérique, et les sources chaudes à son pied auraient été découvertes, selon la tradition, au VIIe siècle. Sous le sentier se trouve la Sesshoseki, un rocher de légende locale censé tuer quiconque le touche ; la pierre elle-même s'est fendue en 2022, un événement largement rapporté à l'époque." +
      "|那須の活火口・茶臼岳は今もロープウェイ駅の近くで噴気を上げ、麓の温泉は伝承では7世紀に発見されたとされる。登山道の下には、触れると命を落とすと語り継がれる殺生石があるが、その石自体が2022年に割れ、当時大きく報じられた。",
    [
      prop(
        "Nasu Onsen Grand Inn|Gran posada termal de Nasu|Grande auberge thermale de Nasu|那須温泉の大旅館",
        1200, 94,
      ),
      prop(
        "Chausudake Ropeway Station House|Estación del teleférico de Chausudake|Gare du téléphérique de Chausudake|茶臼岳ロープウェー駅舎",
        1650, 128,
      ),
    ],
  ),

  aizukomagatake: city(
    "Mt. Aizu-Koma|Monte Aizu-Koma|Mont Aizu-Koma|会津駒ヶ岳",
    139.2967, 37.0900, "joshinetsu", "marsh", "oze_marsh", "l",
    "A gentle summit whose pond-studded plateau rivals nearby Oze" +
      "|Una cumbre suave cuya meseta salpicada de estanques rivaliza con la cercana Oze" +
      "|Un sommet doux dont le plateau parsemé d'étangs rivalise avec l'Oze voisin" +
      "|尾瀬にも劣らぬ池塘の広がる、なだらかな頂",
    "The summit plateau of Aizu-Koma-ga-take is dotted with small ponds and cotton-grass much like the more famous Oze marshland to the south, but draws far fewer visitors despite the view. Snow lingers into early summer on its gentle upper slopes, feeding the ponds that reflect the sky through the short blooming season." +
      "|La meseta cumbre del Aizu-Koma-ga-take está salpicada de pequeños estanques y algodón de las nieves, muy parecida al más célebre pantano de Oze al sur, pero recibe muchos menos visitantes pese a sus vistas. La nieve persiste hasta principios de verano en sus laderas altas y suaves, alimentando los estanques que reflejan el cielo durante la breve temporada de floración." +
      "|Le plateau sommital de l'Aizu-Koma-ga-take est parsemé de petits étangs et de linaigrettes, un peu comme la tourbière plus célèbre de l'Oze au sud, mais attire bien moins de visiteurs malgré la vue. La neige persiste jusqu'au début de l'été sur ses pentes hautes et douces, alimentant les étangs qui reflètent le ciel durant la courte saison de floraison." +
      "|会津駒ヶ岳の山頂台地には、南にある尾瀬にも劣らぬ池塘とワタスゲが点在するが、その眺めのわりに訪れる人は少ない。なだらかな上部斜面には初夏まで雪が残り、短い開花期のあいだ空を映す池を潤している。",
    [
      prop(
        "Komagatake Sanso Lodge|Refugio Komagatake Sanso|Refuge Komagatake Sanso|駒の小屋",
        260, 20,
      ),
      prop(
        "Hinoemata Onsen Inn|Posada termal de Hinoemata|Auberge thermale de Hinoemata|檜枝岐温泉旅館",
        720, 56,
      ),
    ],
  ),

  echigokomagatake: city(
    "Mt. Echigo-Koma|Monte Echigo-Koma|Mont Echigo-Koma|越後駒ヶ岳",
    139.1128, 37.1719, "joshinetsu", "ridge_snow", "beech_ridge", "r",
    "One of the Three Mountains of Echigo, feeding a famous rice-growing valley" +
      "|Una de las Tres Montañas de Echigo, que riega un célebre valle arrocero" +
      "|L'une des Trois Montagnes d'Echigo, qui irrigue une célèbre vallée rizicole" +
      "|越後三山の一つ。名高い米どころを潤す",
    "Echigo-Koma-ga-take is one of the Three Mountains of Echigo, a trio of neighbouring peaks whose heavy snowfall feeds the Uonuma valley below, home to Koshihikari rice grown in some of the coldest irrigation water in Japan. Winters here can bury the trailhead villages under several metres of snow, among the deepest anywhere in the world at this latitude." +
      "|El Echigo-Koma-ga-take es una de las Tres Montañas de Echigo, un trío de picos vecinos cuya intensa nevada riega el valle de Uonuma, cuna del arroz Koshihikari cultivado con una de las aguas de riego más frías de Japón. Los inviernos aquí pueden sepultar los pueblos del sendero bajo varios metros de nieve, de las más profundas del mundo a esta latitud." +
      "|L'Echigo-Koma-ga-take est l'une des Trois Montagnes d'Echigo, un trio de sommets voisins dont les fortes chutes de neige irriguent la vallée d'Uonuma, berceau du riz Koshihikari cultivé avec l'une des eaux d'irrigation les plus froides du Japon. Les hivers y ensevelissent parfois les villages de départ sous plusieurs mètres de neige, parmi les plus profondes au monde à cette latitude." +
      "|越後駒ヶ岳は越後三山の一つで、その豪雪が麓の魚沼盆地を潤し、日本でも屈指の冷たい用水で育つコシヒカリの産地となっている。登山口の集落は冬になると数メートルの雪に埋もれ、この緯度としては世界でも有数の豪雪地帯である。",
    [
      prop(
        "Komagatake Sanso Hut|Refugio Komagatake Sanso|Refuge Komagatake Sanso|駒ヶ岳山頂避難小屋",
        250, 20,
      ),
      prop(
        "Uonuma Rice Country Inn|Posada del país arrocero de Uonuma|Auberge du pays du riz d'Uonuma|魚沼米どころの宿",
        680, 53,
      ),
    ],
  ),

  hiragatake: city(
    "Mt. Hira|Monte Hira|Mont Hira|平ヶ岳",
    139.2481, 36.9536, "joshinetsu", "plateau", "oze_marsh", "l",
    "A famously flat summit, one of the longest single-day climbs in the hundred" +
      "|Una cumbre célebremente plana, una de las ascensiones de un día más largas de las cien" +
      "|Un sommet réputé plat, l'une des plus longues ascensions en une journée parmi les cent" +
      "|驚くほど平らな頂。百名山でも屈指の長い日帰り登山",
    "True to its name, meaning 'flat peak,' Hira-ga-take's summit is a broad, level plateau holding a small pond, Tamagawa-no-Ike, rather than any dramatic high point. Most routes have no mountain hut along the way, making the roughly 20-kilometre round trip one of the longest single-day climbs among the hundred." +
      "|Fiel a su nombre, que significa 'pico plano', la cima del Hira-ga-take es una meseta amplia y llana con un pequeño estanque, el Tamagawa-no-Ike, en lugar de un punto culminante dramático. La mayoría de las rutas no tienen refugio en el camino, lo que convierte el recorrido de ida y vuelta de unos 20 kilómetros en una de las ascensiones de un día más largas entre las cien." +
      "|Fidèle à son nom, qui signifie « pic plat », le sommet du Hira-ga-take est un plateau large et uni abritant un petit étang, le Tamagawa-no-Ike, plutôt qu'un point culminant spectaculaire. La plupart des itinéraires ne comptent aucun refuge en chemin, ce qui fait de l'aller-retour d'environ 20 kilomètres l'une des ascensions en une journée les plus longues parmi les cent." +
      "|その名のとおり、平ヶ岳の頂上は劇的な最高点を持たず、玉子石やたまごの池のある広く平らな台地になっている。ほとんどの道中に山小屋が無く、往復約20kmはこの百座のなかでも屈指の長い日帰り登山となる。",
    [
      prop(
        "Nakanomata Trailhead Lodge|Albergue del sendero de Nakanomata|Auberge du départ de Nakanomata|中ノ俣登山口の宿",
        260, 21,
      ),
      prop(
        "Oshirakawa Rest House|Casa de descanso de Oshirakawa|Maison de repos d'Oshirakawa|尾白川休憩所",
        220, 18,
      ),
    ],
  ),

  makihatayama: city(
    "Mt. Makihata|Monte Makihata|Mont Makihata|巻機山",
    138.9967, 36.9269, "joshinetsu", "grasspeak", "highland_meadow", "r",
    "A grass-covered ridge famous among backcountry skiers for its spring cornices" +
      "|Una cresta cubierta de hierba, célebre entre esquiadores de travesía por sus cornisas primaverales" +
      "|Une crête herbeuse réputée chez les skieurs de randonnée pour ses corniches printanières" +
      "|春の雪庇で知られる、草に覆われた稜線",
    "Makihata-yama has no single sharp summit; its broad grassy ridge rolls gently between several near-equal high points, which is part of why hikers prize it for the openness of the view. In spring, the cornices that build up along its ridge during winter draw backcountry skiers and snowboarders from across the region before the snow finally melts away." +
      "|El Makihata-yama no tiene una cima afilada única; su amplia cresta cubierta de hierba ondula suavemente entre varios puntos altos casi iguales, lo que en parte explica por qué los excursionistas la valoran por la amplitud de sus vistas. En primavera, las cornisas que se forman a lo largo de su cresta durante el invierno atraen a esquiadores y practicantes de snowboard de travesía de toda la región antes de que la nieve por fin se derrita." +
      "|Le Makihata-yama n'a pas de sommet unique et acéré ; sa large crête herbeuse ondule doucement entre plusieurs points hauts presque égaux, ce qui explique en partie pourquoi les randonneurs apprécient l'ampleur de la vue. Au printemps, les corniches qui se forment le long de sa crête pendant l'hiver attirent skieurs et snowboardeurs de randonnée de toute la région avant que la neige ne finisse par fondre." +
      "|巻機山には一つの尖った頂点が無く、ほぼ同じ高さのいくつもの高みを草原の広い稜線が緩やかに結んでいる。開けた眺めゆえに登山者に好まれる理由の一つでもある。春には冬のあいだに稜線に張り出した雪庇が、雪が消えるまで地域各地からバックカントリースキーヤーを呼び寄せる。",
    [
      prop(
        "Inatani Trailhead Inn|Posada del sendero de Inatani|Auberge du départ d'Inatani|稲荷登山口の宿",
        340, 27,
      ),
      prop(
        "Makihata Sanso Hut|Refugio Makihata Sanso|Refuge Makihata Sanso|巻機山避難小屋",
        230, 18,
      ),
    ],
  ),

  tanigawadake: city(
    "Mt. Tanigawa|Monte Tanigawa|Mont Tanigawa|谷川岳",
    138.9331, 36.8047, "joshinetsu", "spire", "minamialps_rock", "l",
    "A twin-peaked mountain whose sheer face has recorded the most climbing deaths on Earth" +
      "|Una montaña de doble cima cuya pared vertical registra más muertes de alpinistas que ninguna otra en el mundo" +
      "|Une montagne à double sommet dont la paroi abrupte a enregistré le plus grand nombre de décès d'alpinistes au monde" +
      "|双耳峰。切り立った岩壁は世界で最も遭難死者数が多い山として記録される",
    "The sheer rock face of Ichinokura-sawa on Tanigawa-dake's flank has been the site of more recorded mountaineering deaths than any other rock wall in the world, over 800 since climbing there began in the early 20th century, largely on routes far more technical than the main trail. A ropeway on the mountain's gentler side carries far more visitors to a viewing platform than ever reach the twin summit on foot." +
      "|La pared rocosa de Ichinokura-sawa, en el flanco del Tanigawa-dake, ha sido escenario de más muertes de alpinistas registradas que ninguna otra pared del mundo, más de 800 desde que empezó a escalarse a principios del siglo XX, en su mayoría en rutas mucho más técnicas que el sendero principal. Un teleférico en la vertiente más suave de la montaña lleva a muchos más visitantes a una plataforma mirador de los que llegan a pie a la doble cima." +
      "|La paroi rocheuse d'Ichinokura-sawa, sur le flanc du Tanigawa-dake, a enregistré plus de décès d'alpinistes que n'importe quelle autre paroi au monde, plus de 800 depuis le début de son escalade au début du XXe siècle, surtout sur des itinéraires bien plus techniques que le sentier principal. Un téléphérique sur le versant plus doux de la montagne conduit bien plus de visiteurs à une plateforme d'observation que n'en atteint le double sommet à pied." +
      "|谷川岳の一ノ倉沢の岩壁は、20世紀初めに登られ始めて以来800人を超える遭難死者を記録し、世界のどの岩壁よりも多いとされる。その大半は主稜線の登山道よりはるかに技術を要するルートでの事故である。傾斜の緩い側にはロープウェイがあり、双耳峰の頂に徒歩で立つ人よりずっと多くの観光客を展望台まで運んでいる。",
    [
      prop(
        "Tanigawadake Ropeway Station House|Estación del teleférico de Tanigawadake|Gare du téléphérique de Tanigawadake|谷川岳ロープウェー駅舎",
        1750, 136,
      ),
      prop(
        "Doai Onsen Inn|Posada termal de Doai|Auberge thermale de Doai|土合温泉旅館",
        620, 48,
      ),
    ],
  ),

  naebasan: city(
    "Mt. Naeba|Monte Naeba|Mont Naeba|苗場山",
    138.6997, 36.8386, "joshinetsu", "plateau", "highland_meadow", "r",
    "A vast summit marsh said to resemble a giant rice paddy from above" +
      "|Un vasto pantano cumbre que, desde arriba, recuerda a un gigantesco arrozal" +
      "|Un vaste marécage sommital qui, vu d'en haut, évoque une gigantesque rizière" +
      "|上空から見ると巨大な田んぼのような、広大な山頂湿原",
    "Naeba-san's name means 'seedling field,' a reference to the huge summit marsh whose grid of small ponds was said by early farmers to resemble rice paddies seen from below. Today the mountain's lower slopes host one of Japan's best-known ski resorts, which drew world leaders when it hosted the 2008 G8 summit." +
      "|El nombre Naeba-san significa 'campo de plántulas', en referencia al vasto pantano cumbre cuya cuadrícula de pequeños estanques los primeros campesinos decían que parecía un arrozal visto desde abajo. Hoy, las laderas bajas de la montaña albergan una de las estaciones de esquí más conocidas de Japón, que reunió a líderes mundiales al acoger la cumbre del G8 de 2008." +
      "|Le nom Naeba-san signifie « champ de jeunes pousses », en référence au vaste marécage sommital dont la grille de petits étangs évoquait, disait-on, une rizière vue d'en bas pour les premiers paysans. Aujourd'hui, les pentes basses de la montagne accueillent l'une des stations de ski les plus connues du Japon, qui reçut des dirigeants du monde entier lors du sommet du G8 de 2008." +
      "|苗場山の名は「苗場」、すなわち山頂の広大な湿原に並ぶ小さな池塘の連なりが、下から見た田んぼのように見えたことに由来するという。今日、山麓には日本でも有数のスキーリゾートがあり、2008年には主要国首脳会議(G8サミット)の開催地にもなった。",
    [
      prop(
        "Naeba Ski Resort Lodge|Albergue de la estación de esquí de Naeba|Auberge du domaine skiable de Naeba|苗場スキー場の宿",
        1500, 118,
      ),
      prop(
        "Naebasan Sanso Hut|Refugio Naebasan Sanso|Refuge Naebasan Sanso|苗場山頂ヒュッテ",
        260, 20,
      ),
    ],
  ),

  myokosan: city(
    "Mt. Myoko|Monte Myoko|Mont Myoko|妙高山",
    138.1153, 36.8886, "joshinetsu", "cone_volcano", "minamialps_rock", "l",
    "A volcano named for a mythic mountain at the centre of the Buddhist universe" +
      "|Un volcán que toma el nombre de una montaña mítica en el centro del universo budista" +
      "|Un volcan nommé d'après une montagne mythique au centre de l'univers bouddhiste" +
      "|仏教の世界観の中心にある須弥山にちなんで名付けられた火山",
    "Myoko-san's name is a Japanese reading of Mount Sumeru, the mythical peak believed in Buddhist cosmology to stand at the centre of the universe, reflecting how the volcano has long been treated as sacred. Its lower slopes now hold Myoko Kogen, one of the snowiest and oldest developed ski areas in Japan, drawing skiers since the 1930s." +
      "|El nombre Myoko-san es una lectura japonesa del monte Sumeru, el pico mítico que la cosmología budista sitúa en el centro del universo, reflejo de cómo el volcán se ha tratado como sagrado desde antiguo. Sus laderas bajas albergan hoy Myoko Kogen, una de las estaciones de esquí más nevadas y antiguas de Japón, que atrae esquiadores desde los años treinta." +
      "|Le nom Myoko-san est une lecture japonaise du mont Sumeru, le pic mythique que la cosmologie bouddhiste place au centre de l'univers, reflet de la façon dont le volcan est depuis longtemps traité comme sacré. Ses pentes basses accueillent aujourd'hui Myoko Kogen, l'une des stations de ski les plus enneigées et les plus anciennes du Japon, qui attire des skieurs depuis les années 1930." +
      "|妙高山の名は、仏教の宇宙観で世界の中心にそびえるとされる須弥山の日本語読みで、この火山が古くから聖なる山として扱われてきたことを表している。山麓には日本でも屈指の豪雪地帯にある古参スキー場・妙高高原があり、1930年代からスキーヤーを集めてきた。",
    [
      prop(
        "Myoko Kogen Ski Lodge|Albergue de esquí de Myoko Kogen|Auberge de ski de Myoko Kogen|妙高高原スキーの宿",
        1350, 106,
      ),
      prop(
        "Tsuginohira Rest House|Casa de descanso de Tsuginohira|Maison de repos de Tsuginohira|燕温泉休憩所",
        480, 38,
      ),
    ],
  ),

  hiuchiyama: city(
    "Mt. Hiuchi (Niigata)|Monte Hiuchi (Niigata)|Mont Hiuchi (Niigata)|火打山",
    138.0511, 36.9106, "joshinetsu", "ridge_snow", "minamialps_rock", "r",
    "Niigata's highest point, ringed by flower meadows and a mirror-still pond" +
      "|El punto más alto de Niigata, rodeado de praderas floridas y un estanque de aguas quietas" +
      "|Le point culminant de Niigata, ceint de prairies fleuries et d'un étang aux eaux immobiles" +
      "|新潟県最高峰。花畑と鏡のような池に囲まれる",
    "At 2,462 metres, Hiuchi-yama is the highest peak in Niigata prefecture, taller than its more famous volcanic neighbour Myoko-san. Its approach crosses the Takane-no-oike pond, whose still water on calm mornings mirrors the peak so precisely that the reflection has become one of the most photographed scenes among the hundred." +
      "|Con 2.462 metros, el Hiuchi-yama es el pico más alto de la prefectura de Niigata, más alto que su vecino volcánico más famoso, el Myoko-san. Su ruta de acceso cruza el estanque Takane-no-oike, cuya agua quieta en las mañanas tranquilas refleja la cima con tal precisión que esa imagen se ha convertido en una de las más fotografiadas entre las cien." +
      "|Avec 2 462 mètres, le Hiuchi-yama est le plus haut sommet de la préfecture de Niigata, plus élevé que son voisin volcanique plus célèbre, le Myoko-san. Son accès traverse l'étang de Takane-no-oike, dont l'eau immobile par temps calme reflète le sommet avec une telle précision que cette image est devenue l'une des plus photographiées parmi les cent." +
      "|標高2462mの火打山は新潟県最高峰で、より名の知れた火山の隣人・妙高山よりも高い。登山道は高谷池のほとりを通り、風の凪いだ朝には水面が山影を鏡のように映し、この百座のなかでも屈指の撮影スポットとなっている。",
    [
      prop(
        "Takane-no-oike Hut|Refugio de Takane-no-oike|Refuge de Takane-no-oike|高谷池ヒュッテ",
        280, 22,
      ),
      prop(
        "Kurohime Onsen Inn|Posada termal de Kurohime|Auberge thermale de Kurohime|黒姫温泉旅館",
        640, 50,
      ),
    ],
  ),

  amakazariyama: city(
    "Mt. Amakazari|Monte Amakazari|Mont Amakazari|雨飾山",
    137.8919, 36.7386, "joshinetsu", "spire", "minamialps_rock", "l",
    "A small, steep peak named for clouds said to 'decorate' it with rain" +
      "|Un pico pequeño y empinado, cuyo nombre alude a las nubes que lo 'adornan' de lluvia" +
      "|Un petit sommet escarpé, dont le nom évoque les nuages censés le « parer » de pluie" +
      "|雨雲が飾るように取り巻くことに由来するという、小さく急峻な峰",
    "Amakazari-yama's name, roughly 'rain-decorated mountain,' is traditionally explained by the way clouds gather and cling ornament-like around its summit before storms move in from the Sea of Japan side. Though one of the shorter peaks in the hundred at under 2,000 metres, its final ridge involves enough exposed rock and fixed rope to feel far more demanding than its height suggests." +
      "|El nombre Amakazari-yama, aproximadamente 'montaña adornada de lluvia', se explica tradicionalmente por cómo las nubes se acumulan y se aferran como un adorno a su cima antes de que lleguen las tormentas desde el lado del mar de Japón. Aunque es uno de los picos más bajos de las cien, con menos de 2.000 metros, su cresta final tiene roca expuesta y cuerdas fijas suficientes para sentirse mucho más exigente de lo que sugiere su altura." +
      "|Le nom Amakazari-yama, à peu près « montagne parée de pluie », s'explique traditionnellement par la façon dont les nuages s'amassent et s'accrochent en ornement autour de son sommet avant l'arrivée des tempêtes venues du côté de la mer du Japon. Bien qu'il s'agisse de l'un des sommets les plus bas des cent, à moins de 2 000 mètres, sa crête finale comporte assez de rocher exposé et de cordes fixes pour paraître bien plus exigeante que son altitude ne le laisse penser." +
      "|雨飾山という名は、日本海側から嵐が来る前に雲が山頂にまとわりつくように集まる様子から来ているという。標高2000mに満たない、百名山のなかでは低い部類だが、頂上直下の岩場は固定ロープを要するほどで、標高以上に手ごわく感じられる。",
    [
      prop(
        "Amakazari Sanso Lodge|Refugio Amakazari Sanso|Refuge Amakazari Sanso|雨飾山荘",
        320, 25,
      ),
      prop(
        "Renge Onsen Inn|Posada termal de Renge|Auberge thermale de Renge|蓮華温泉旅館",
        760, 60,
      ),
    ],
  ),

  takatsumayama: city(
    "Mt. Takatsuma|Monte Takatsuma|Mont Takatsuma|高妻山",
    138.2360, 36.7930, "joshinetsu", "spire", "minamialps_rock", "r",
    "The highest of the Togakushi range, above a shrine linked to legendary ninja" +
      "|El más alto de la cordillera de Togakushi, sobre un santuario ligado a legendarios ninjas" +
      "|Le plus haut de la chaîne de Togakushi, au-dessus d'un sanctuaire lié à de légendaires ninjas" +
      "|戸隠連峰の最高峰。伝説の忍者にゆかりある神社を見下ろす",
    "Takatsuma-yama is the highest point of the jagged Togakushi range, and though lower than many neighbouring peaks in the hundred, its route includes enough chained rock scrambling to be considered one of the more demanding day climbs in Nagano. Below it, Togakushi Shrine is traditionally linked to the legendary origins of Togakure-ryu ninjutsu, and the surrounding villages are still known for their hand-cut soba noodles." +
      "|El Takatsuma-yama es el punto más alto de la escarpada cordillera de Togakushi, y aunque más bajo que muchos picos vecinos de las cien, su ruta incluye suficiente trepa con cadenas por roca como para considerarse una de las ascensiones de un día más exigentes de Nagano. A sus pies, el santuario de Togakushi está tradicionalmente ligado a los legendarios orígenes del ninjutsu Togakure-ryu, y los pueblos cercanos aún son conocidos por sus fideos soba cortados a mano." +
      "|Le Takatsuma-yama est le point culminant de la chaîne escarpée de Togakushi, et bien que plus bas que beaucoup de sommets voisins parmi les cent, son itinéraire comporte assez d'escalade encordée sur rocher pour être considéré comme l'une des ascensions d'une journée les plus exigeantes de Nagano. À son pied, le sanctuaire de Togakushi est traditionnellement lié aux origines légendaires du ninjutsu Togakure-ryu, et les villages alentour restent réputés pour leurs nouilles soba coupées à la main." +
      "|高妻山は険しい戸隠連峰の最高峰で、百名山の中では標高こそ控えめだが、鎖場を含む道のりは長野県内でも屈指の手応えある日帰り登山とされる。麓の戸隠神社は忍者・戸隠流の伝説的な起源に結びつけられ、周辺の集落は今も手打ちそばの産地として知られる。",
    [
      prop(
        "Togakushi Shrine Lodge|Albergue del santuario Togakushi|Auberge du sanctuaire Togakushi|戸隠神社の宿坊",
        440, 35,
      ),
      prop(
        "Togakushi Soba House|Casa de soba de Togakushi|Maison de soba de Togakushi|戸隠そばの家",
        360, 28,
      ),
    ],
  ),

  nantaisan: city(
    "Mt. Nantai|Monte Nantai|Mont Nantai|男体山",
    139.4894, 36.7686, "kanto", "torii_peak", "kamikochi_valley", "l",
    "The sacred volcano whose lava dammed a river into Lake Chuzenji" +
      "|El volcán sagrado cuya lava represó un río hasta formar el lago Chuzenji" +
      "|Le volcan sacré dont la lave endigua une rivière pour former le lac Chuzenji" +
      "|溶岩が川をせき止め中禅寺湖を生んだ、日光の霊峰",
    "Nantai-san's ancient lava flows dammed the Daiya River to create Lake Chuzenji and, where the water spills back out, the 97-metre Kegon Falls. The priest Shodo Shonin is traditionally credited with the mountain's first ascent in 782 CE, founding the mountain-worship tradition that later grew into the Nikko shrine and temple complex at its foot." +
      "|Antiguas coladas de lava del Nantai-san represaron el río Daiya y formaron el lago Chuzenji y, donde el agua vuelve a salir, la cascada Kegon, de 97 metros. Se atribuye tradicionalmente al monje Shodo Shonin la primera ascensión de la montaña en el año 782, fundando la tradición de culto a la montaña que más tarde daría lugar al conjunto de santuarios y templos de Nikko a sus pies." +
      "|D'anciennes coulées de lave du Nantai-san ont endigué la rivière Daiya pour former le lac Chuzenji et, là où l'eau ressort, la chute de Kegon, haute de 97 mètres. Le moine Shodo Shonin est traditionnellement crédité de la première ascension de la montagne en 782, fondant la tradition du culte de la montagne qui donna plus tard naissance à l'ensemble de sanctuaires et de temples de Nikko à son pied." +
      "|男体山の古い溶岩流が大谷川をせき止めて中禅寺湖を生み、その水があふれ出る先には落差97mの華厳の滝がある。782年、勝道上人がこの山に初めて登ったとされ、それが後に麓の日光の社寺群へと発展する山岳信仰の始まりとなった。",
    [
      prop(
        "Chuzenjiko Lakeside Inn|Posada junto al lago Chuzenji|Auberge au bord du lac Chuzenji|中禅寺湖畔の宿",
        1400, 110,
      ),
      prop(
        "Futarasan Shrine Lodge|Albergue del santuario Futarasan|Auberge du sanctuaire Futarasan|二荒山神社の宿",
        480, 38,
      ),
    ],
  ),

  nikkoshiranesan: city(
    "Mt. Nikko-Shirane|Monte Nikko-Shirane|Mont Nikko-Shirane|日光白根山",
    139.3781, 36.7986, "kanto", "cone_volcano", "kamikochi_valley", "r",
    "The highest peak in the Kanto region, reached by Japan's highest ropeway" +
      "|El pico más alto de la región de Kanto, al que se llega con el teleférico más alto de Japón" +
      "|Le plus haut sommet de la région du Kanto, desservi par le téléphérique le plus élevé du Japon" +
      "|関東地方の最高峰。日本一標高の高いロープウェイが通う",
    "At 2,578 metres, Nikko-Shirane-san is the tallest peak in the wider Kanto region, and the ropeway on its Marunuma side climbs higher than any other in Japan, reaching close to 2,000 metres. A small crater lake near the summit and the surrounding marshland of Marunuma Kogen are known for a burst of alpine flowers in the short window after the snow melts." +
      "|Con 2.578 metros, el Nikko-Shirane-san es el pico más alto de toda la región de Kanto, y el teleférico de su vertiente de Marunuma sube más alto que cualquier otro de Japón, llegando cerca de los 2.000 metros. Un pequeño lago de cráter cerca de la cima y el pantano circundante de Marunuma Kogen son conocidos por un estallido de flores alpinas en la breve ventana tras el deshielo." +
      "|Avec 2 578 mètres, le Nikko-Shirane-san est le plus haut sommet de toute la région du Kanto, et le téléphérique de son versant de Marunuma grimpe plus haut que tout autre au Japon, atteignant près de 2 000 mètres. Un petit lac de cratère près du sommet et la tourbière environnante de Marunuma Kogen sont réputés pour une explosion de fleurs alpines durant la courte fenêtre suivant la fonte des neiges." +
      "|標高2578mの日光白根山は関東地方の最高峰で、丸沼側のロープウェイは標高2000m近くまで達し、日本で最も高所まで運行するロープウェイとされる。山頂近くの小さな火口湖と、周囲の丸沼高原の湿原は、雪解け後の短い期間に高山植物が一斉に咲くことで知られる。",
    [
      prop(
        "Marunuma Ropeway Station House|Estación del teleférico de Marunuma|Gare du téléphérique de Marunuma|丸沼ロープウェー駅舎",
        1600, 126,
      ),
      prop(
        "Konsei Pass Rest House|Casa de descanso del paso Konsei|Maison de repos du col de Konsei|金精峠休憩所",
        300, 24,
      ),
    ],
  ),

  sukaisan: city(
    "Mt. Sukai|Monte Sukai|Mont Sukai|皇海山",
    139.3500, 36.6800, "kanto", "domepeak", "beech_ridge", "l",
    "One of Kanto's most obscure peaks, reached by a very long forest road" +
      "|Uno de los picos más recónditos de Kanto, al que se llega por una larguísima pista forestal" +
      "|L'un des sommets les plus reculés du Kanto, accessible par une très longue piste forestière" +
      "|関東でも屈指の到達しづらい峰。長い林道の先にある",
    "Sukai-san sits deep in forest with no direct trailhead access; climbers must first drive a long, rough forest road and then hike for hours before the real ascent even starts, which has given it a reputation as one of Kanto's most tiring peaks relative to its height. Its summit offers little in the way of a view, hemmed in by trees, which only adds to its low profile among the hundred." +
      "|El Sukai-san se halla en lo profundo del bosque, sin acceso directo al sendero; los alpinistas deben primero conducir por una larga y accidentada pista forestal y luego caminar horas antes de que empiece la verdadera ascensión, lo que le ha dado fama de ser uno de los picos más agotadores de Kanto en relación con su altura. Su cima ofrece pocas vistas, rodeada de árboles, lo que solo aumenta su bajo perfil entre las cien." +
      "|Le Sukai-san se trouve au cœur de la forêt, sans accès direct au sentier ; il faut d'abord rouler longuement sur une piste forestière accidentée puis marcher des heures avant même que l'ascension véritable ne commence, ce qui lui a valu la réputation d'être l'un des sommets les plus éprouvants du Kanto par rapport à son altitude. Son sommet, cerné d'arbres, n'offre guère de vue, ce qui accentue encore sa discrétion parmi les cent." +
      "|皇海山は深い森の奥にあり、登山口へ直接続く道が無い。まず長く荒れた林道を車で進み、そこから本格的な登りが始まる前に何時間も歩かねばならず、標高のわりに関東でも屈指の疲れる山とされる。山頂は木々に囲まれ眺めに乏しく、百名山の中でも地味な存在に輪をかけている。",
    [
      prop(
        "Ginreiso Forest Road Lodge|Albergue de la pista forestal de Ginreiso|Auberge de la piste forestière de Ginreiso|銀嶺荘林道の宿",
        280, 22,
      ),
      prop(
        "Kesamaru Pass Shelter|Refugio del paso Kesamaru|Abri du col de Kesamaru|鋸山避難小屋",
        200, 16,
      ),
    ],
  ),

  hotakayama: city(
    "Mt. Hotaka (Kanto)|Monte Hotaka (Kanto)|Mont Hotaka (Kanto)|武尊山",
    139.1300, 36.8000, "joshinetsu", "ridge_snow", "highland_meadow", "r",
    "A mountain named for a legendary prince, ringed by backcountry ski resorts" +
      "|Una montaña que lleva el nombre de un príncipe legendario, rodeada de estaciones de esquí de travesía" +
      "|Une montagne nommée d'après un prince légendaire, ceinte de stations de ski de randonnée" +
      "|伝説の皇子にちなむ名を持ち、周囲をスキー場に囲まれた山",
    "Hotaka-yama's name and characters differ from the more famous Hotaka peaks of the Northern Alps, and local tradition ties it to the legendary prince Yamato Takeru, said to have prayed here on a campaign into eastern Japan. Several ski resorts now ring its lower slopes, and its bowls have become a well-known destination for backcountry skiing once the lifts close for the season." +
      "|El nombre y los caracteres del Hotaka-yama difieren de los más famosos picos Hotaka de los Alpes Septentrionales, y la tradición local lo vincula con el legendario príncipe Yamato Takeru, quien según se dice oró aquí durante una campaña hacia el este de Japón. Varias estaciones de esquí rodean hoy sus laderas bajas, y sus circos se han convertido en un destino conocido para el esquí de travesía una vez cerrados los remontes." +
      "|Le nom et les caractères du Hotaka-yama diffèrent des sommets Hotaka plus célèbres des Alpes du Nord, et la tradition locale le rattache au légendaire prince Yamato Takeru, qui aurait prié ici lors d'une campagne vers l'est du Japon. Plusieurs stations de ski entourent aujourd'hui ses pentes basses, et ses cirques sont devenus une destination réputée pour le ski de randonnée une fois les remontées fermées." +
      "|武尊山は北アルプスのより名高い穂高岳とは字も由来も異なり、東国遠征の際にここで祈ったと伝わる伝説の皇子・日本武尊にちなむとされる。山麓には複数のスキー場が並び、リフトが閉まったあとのカール地形はバックカントリースキーの名所として知られる。",
    [
      prop(
        "Kawaba Ski Resort Lodge|Albergue de la estación de esquí de Kawaba|Auberge du domaine skiable de Kawaba|川場スキー場の宿",
        1250, 98,
      ),
      prop(
        "Fujiwara Onsen Inn|Posada termal de Fujiwara|Auberge thermale de Fujiwara|藤原温泉旅館",
        700, 55,
      ),
    ],
  ),

  shibutsusan: city(
    "Mt. Shibutsu|Monte Shibutsu|Mont Shibutsu|至仏山",
    139.1892, 36.9219, "joshinetsu", "grasspeak", "oze_marsh", "l",
    "A serpentine peak overlooking Oze, closed some seasons to protect its rare flora" +
      "|Un pico de serpentinita que domina Oze, cerrado algunas temporadas para proteger su rara flora" +
      "|Un sommet de serpentinite dominant l'Oze, fermé certaines saisons pour protéger sa flore rare" +
      "|尾瀬を見下ろす蛇紋岩の山。希少な植物を守るため季節閉山することもある",
    "Like Hayachine-san far to the north, Shibutsu-san is built of serpentine rock whose unusual soil supports alpine flowers found almost nowhere else, and its trails are sometimes closed in early season, or restricted to one-way traffic, to keep foot erosion from stripping the fragile plant cover. From its summit, the marshland of Oze spreads out below in one of the most photographed panoramas among the hundred." +
      "|Al igual que el lejano Hayachine-san hacia el norte, el Shibutsu-san está formado por roca serpentinita, cuyo suelo inusual sostiene flores alpinas que casi no crecen en ningún otro lugar, y sus senderos a veces se cierran a principios de temporada, o se restringen a un solo sentido, para evitar que la erosión del paso destruya la frágil cubierta vegetal. Desde su cima, el pantano de Oze se extiende abajo en uno de los panoramas más fotografiados entre las cien." +
      "|Comme le Hayachine-san bien plus au nord, le Shibutsu-san est fait de roche serpentinite, dont le sol inhabituel abrite des fleurs alpines que l'on ne trouve presque nulle part ailleurs, et ses sentiers sont parfois fermés en début de saison, ou limités à un sens unique, pour empêcher l'érosion des pas de détruire le fragile couvert végétal. Depuis son sommet, la tourbière de l'Oze s'étend en contrebas dans l'un des panoramas les plus photographiés parmi les cent." +
      "|北のはるか早池峰山と同じく、至仏山も蛇紋岩でできており、その特殊な土壌がほかにほとんど見られない高山植物を育てている。登山道はシーズン初めに閉鎖されたり一方通行に制限されたりして、踏圧による脆い植生の消失を防いでいる。山頂からは尾瀬の湿原が広がり、百名山でも屈指の撮影スポットとなっている。",
    [
      prop(
        "Oshimizu Trailhead Lodge|Albergue del sendero de Oshimizu|Auberge du départ d'Oshimizu|鳩待峠登山口の宿",
        620, 48,
      ),
      prop(
        "Yamanohana Hut|Refugio Yamanohana|Refuge Yamanohana|山の鼻小屋",
        340, 27,
      ),
    ],
  ),

  hiuchigatake: city(
    "Mt. Hiuchi (Oze)|Monte Hiuchi (Oze)|Mont Hiuchi (Oze)|燧ヶ岳",
    139.2803, 36.9611, "joshinetsu", "cone_volcano", "oze_marsh", "r",
    "The highest peak in the Tohoku region, its crater overlooking Oze marsh" +
      "|El pico más alto de la región de Tohoku, con su cráter dominando el pantano de Oze" +
      "|Le plus haut sommet de la région du Tohoku, son cratère dominant le marais de l'Oze" +
      "|東北地方最高峰。火口が尾瀬の湿原を見下ろす",
    "At 2,356 metres, Hiuchi-ga-take is the highest point in any of Japan's six Tohoku prefectures, a volcanic massif of several summits rising on the north side of the Oze marshland it helped create by damming the valley long ago. From the crater rim, the boardwalks and ponds of Oze-numa spread out below, one of Japan's most protected and carefully managed wetlands." +
      "|Con 2.356 metros, el Hiuchi-ga-take es el punto más alto de las seis prefecturas de la región de Tohoku, un macizo volcánico de varias cimas que se alza en el lado norte del pantano de Oze, al que ayudó a formar represando el valle hace mucho tiempo. Desde el borde del cráter se extienden abajo las pasarelas y estanques del Oze-numa, uno de los humedales más protegidos y cuidadosamente gestionados de Japón." +
      "|Avec 2 356 mètres, le Hiuchi-ga-take est le point culminant des six préfectures de la région du Tohoku, un massif volcanique à plusieurs sommets qui s'élève au nord de la tourbière de l'Oze qu'il contribua jadis à former en endiguant la vallée. Depuis le rebord du cratère, les passerelles et étangs de l'Oze-numa s'étendent en contrebas, l'une des zones humides les plus protégées et minutieusement gérées du Japon." +
      "|標高2356mの燧ヶ岳は東北6県の最高峰で、いくつもの頂を持つ火山体は、かつて谷をせき止めて自らも形成に加わった尾瀬の湿原の北側にそびえる。火口縁からは、日本でも屈指の厳重に保護・管理された湿地である尾瀬沼の木道と池が見下ろせる。",
    [
      prop(
        "Ozenuma Lakeside Lodge|Albergue junto al lago Ozenuma|Auberge au bord du lac Ozenuma|尾瀬沼畔の宿",
        780, 61,
      ),
      prop(
        "Minakami Onsen Inn|Posada termal de Minakami|Auberge thermale de Minakami|水上温泉旅館",
        920, 72,
      ),
    ],
  ),

  akagiyama: city(
    "Mt. Akagi|Monte Akagi|Mont Akagi|赤城山",
    139.1900, 36.5400, "joshinetsu", "caldera", "highland_meadow", "l",
    "A caldera crowned by a crater lake, setting of a legendary battle with Nikko" +
      "|Una caldera coronada por un lago de cráter, escenario de una legendaria batalla con Nikko" +
      "|Une caldeira couronnée d'un lac de cratère, théâtre d'une légendaire bataille avec Nikko" +
      "|火口湖を戴くカルデラ。日光との伝説の合戦の舞台",
    "Lake Onuma fills the caldera at Akagi-yama's centre, and folklore tells of a war between Akagi's giant centipede god and a serpent or dragon god from Nikko's Lake Chuzenji, fought over rights to the surrounding lakes. The mountain's silhouette appears on Gunma prefecture's emblem, and its name is attached to countless local schools, sports teams and products across the region." +
      "|El lago Onuma llena la caldera en el centro del Akagi-yama, y la tradición cuenta una guerra entre el dios ciempiés gigante del Akagi y un dios serpiente o dragón del lago Chuzenji de Nikko, librada por los derechos sobre los lagos circundantes. La silueta de la montaña aparece en el emblema de la prefectura de Gunma, y su nombre da título a innumerables escuelas, equipos deportivos y productos locales de la región." +
      "|Le lac Onuma remplit la caldeira au centre de l'Akagi-yama, et la tradition raconte une guerre entre le dieu mille-pattes géant de l'Akagi et un dieu serpent ou dragon du lac Chuzenji de Nikko, menée pour les droits sur les lacs environnants. La silhouette de la montagne figure sur l'emblème de la préfecture de Gunma, et son nom orne d'innombrables écoles, équipes sportives et produits locaux de la région." +
      "|赤城山の中心を占めるカルデラには大沼が満ち、伝承では赤城の大百足の神と日光・中禅寺湖の大蛇(あるいは龍)の神が周囲の湖の領有をめぐって戦ったと語られる。その山影は群馬県章にも描かれ、地域の学校やスポーツチーム、product名にもその名は数え切れないほど使われている。",
    [
      prop(
        "Onuma Lakeside Lodge|Albergue junto al lago Onuma|Auberge au bord du lac Onuma|大沼湖畔の宿",
        680, 53,
      ),
      prop(
        "Akagi Shrine Rest House|Casa de descanso del santuario Akagi|Maison de repos du sanctuaire Akagi|赤城神社休憩所",
        280, 22,
      ),
    ],
  ),

  kusatsushiranesan: city(
    "Mt. Kusatsu-Shirane|Monte Kusatsu-Shirane|Mont Kusatsu-Shirane|草津白根山",
    138.5300, 36.6200, "joshinetsu", "caldera", "hakusan_snowfield", "r",
    "An active crater lake of vivid green, above one of Japan's most storied hot springs" +
      "|Un lago de cráter activo de un verde intenso, sobre uno de los balnearios más legendarios de Japón" +
      "|Un lac de cratère actif d'un vert éclatant, au-dessus de l'une des sources chaudes les plus légendaires du Japon" +
      "|鮮やかな緑の火口湖を持つ活火山。名だたる名湯を見下ろす",
    "Yugama, the crater lake near Kusatsu-Shirane's summit, glows a vivid acidic green fed by volcanic gases, though eruptions at a neighbouring vent as recently as 2018 have periodically closed the trail for safety. At its foot, Kusatsu Onsen has topped Japan's hot-spring popularity rankings for years and channels its sulfurous water through wooden paddles in a centuries-old cooling ritual called yumomi." +
      "|El Yugama, el lago de cráter cerca de la cima del Kusatsu-Shirane, brilla en un intenso verde ácido alimentado por gases volcánicos, aunque erupciones en un respiradero vecino tan recientes como 2018 han cerrado periódicamente el sendero por seguridad. A sus pies, Kusatsu Onsen ha encabezado durante años los rankings de popularidad de aguas termales de Japón y canaliza su agua sulfurosa con palas de madera en un ritual de enfriamiento centenario llamado yumomi." +
      "|Le Yugama, le lac de cratère près du sommet du Kusatsu-Shirane, brille d'un vert acide intense alimenté par les gaz volcaniques, bien que des éruptions sur un évent voisin, dès 2018, aient périodiquement fermé le sentier par sécurité. À son pied, Kusatsu Onsen occupe depuis des années le sommet des classements de popularité des sources chaudes du Japon et fait circuler son eau sulfureuse à l'aide de pagaies de bois lors d'un rituel de refroidissement séculaire appelé yumomi." +
      "|草津白根山の山頂近くにある湯釜は火山ガスに満ちた鮮やかな酸性の緑色の火口湖だが、2018年にも隣接する火口で噴火が起き、安全のため登山道がたびたび閉鎖されてきた。麓の草津温泉は日本の温泉人気ランキングで長年首位を占め、硫黄泉を木の板でかき混ぜて冷ます「湯もみ」という伝統儀礼が今も行われている。",
    [
      prop(
        "Kusatsu Onsen Grand Inn|Gran posada termal de Kusatsu|Grande auberge thermale de Kusatsu|草津温泉の大旅館",
        1550, 122,
      ),
      prop(
        "Yugama Overlook Rest House|Casa de descanso del mirador de Yugama|Maison de repos du belvédère de Yugama|湯釜展望休憩所",
        320, 25,
      ),
    ],
  ),

  azumayasan: city(
    "Mt. Azumaya|Monte Azumaya|Mont Azumaya|四阿山",
    138.3500, 36.5400, "joshinetsu", "grasspeak", "highland_meadow", "l",
    "A broad-roofed peak above a plateau used to train national ski teams" +
      "|Un pico de amplio perfil sobre una meseta usada para entrenar equipos nacionales de esquí" +
      "|Un sommet au large profil dominant un plateau utilisé pour entraîner les équipes nationales de ski" +
      "|国のスキー・陸上代表も鍛える高原を見下ろす、四阿型の山",
    "Azumaya-san's name means roughly 'four-eaved hut,' describing how its broad, gently sloped roofline shelters the land below the way a traditional open-sided hut shelters a garden. At its foot, the Sugadaira highland has hosted altitude training camps for Japanese cross-country skiers and distance runners for decades, prized for its elevation and mild summer air." +
      "|El nombre Azumaya-san significa aproximadamente 'cabaña de cuatro aleros', que describe cómo su perfil amplio y de suave pendiente cobija la tierra de abajo como una cabaña tradicional abierta cobija un jardín. A sus pies, el altiplano de Sugadaira ha acogido durante décadas campamentos de entrenamiento en altitud para esquiadores de fondo y corredores de larga distancia japoneses, apreciado por su altitud y su templado aire estival." +
      "|Le nom Azumaya-san signifie à peu près « pavillon à quatre avant-toits », décrivant comment son profil large et en pente douce abrite la terre en contrebas comme un pavillon traditionnel ouvert abrite un jardin. À son pied, le haut plateau de Sugadaira accueille depuis des décennies des stages d'entraînement en altitude pour les skieurs de fond et coureurs de fond japonais, apprécié pour son altitude et son air estival doux." +
      "|四阿山という名は「四阿」、すなわち四方に軒を伸ばした東屋のような形が、庭を覆う東屋のように山麓を包むことに由来するという。麓の菅平高原は何十年ものあいだ日本のクロスカントリースキーや長距離陸上選手の高地合宿地として使われ、その標高と夏の涼しい空気が重宝されてきた。",
    [
      prop(
        "Sugadaira Training Lodge|Albergue de entrenamiento de Sugadaira|Auberge d'entraînement de Sugadaira|菅平高原合宿の宿",
        580, 45,
      ),
      prop(
        "Azumaya Onsen Inn|Posada termal de Azumaya|Auberge thermale d'Azumaya|四阿温泉旅館",
        640, 50,
      ),
    ],
  ),

  asamayama: city(
    "Mt. Asama|Monte Asama|Mont Asama|浅間山",
    138.5289, 36.4056, "joshinetsu", "cone_volcano", "hakusan_snowfield", "r",
    "One of Japan's most active volcanoes, whose 1783 eruption reached the capital" +
      "|Uno de los volcanes más activos de Japón, cuya erupción de 1783 alcanzó la capital" +
      "|L'un des volcans les plus actifs du Japon, dont l'éruption de 1783 atteignit la capitale" +
      "|1783年の噴火の灰が江戸にまで達した、日本有数の活火山",
    "The 1783 Tenmei eruption of Asama-yama killed well over a thousand people in nearby villages and sent ash as far as Edo, over 140 kilometres away, while lava flows created the jagged Onioshidashi rock field still open to visitors today. The volcano remains under continuous monitoring, and its alert level periodically restricts or closes access to the crater rim." +
      "|La erupción Tenmei de 1783 del Asama-yama mató a bien más de mil personas en las aldeas cercanas y envió ceniza hasta Edo, a más de 140 kilómetros, mientras que las coladas de lava crearon el escarpado campo de rocas de Onioshidashi, hoy abierto a los visitantes. El volcán sigue bajo vigilancia continua, y su nivel de alerta restringe o cierra periódicamente el acceso al borde del cráter." +
      "|L'éruption Tenmei de 1783 de l'Asama-yama tua bien plus d'un millier de personnes dans les villages voisins et envoya des cendres jusqu'à Edo, à plus de 140 kilomètres, tandis que les coulées de lave créèrent le champ de roches déchiquetées d'Onioshidashi, encore ouvert aux visiteurs aujourd'hui. Le volcan reste sous surveillance continue, et son niveau d'alerte restreint ou ferme périodiquement l'accès au rebord du cratère." +
      "|1783年の天明の大噴火は近隣の村々で千人をはるかに超える死者を出し、140km以上離れた江戸にまで灰を降らせた。流れ出た溶岩は今も見学できる鬼押出しの荒々しい岩塊をつくった。火山は今も常時観測されており、警戒レベルによって火口縁への立ち入りがたびたび制限・禁止される。",
    [
      prop(
        "Onioshidashi Rest House|Casa de descanso de Onioshidashi|Maison de repos d'Onioshidashi|鬼押出し休憩所",
        420, 33,
      ),
      prop(
        "Karuizawa Highland Inn|Posada de las tierras altas de Karuizawa|Auberge des hauteurs de Karuizawa|軽井沢高原の宿",
        1150, 90,
      ),
    ],
  ),

  ryokamisan: city(
    "Mt. Ryokami|Monte Ryokami|Mont Ryokami|両神山",
    138.9300, 36.0100, "kanto", "spire", "chichibu_forest", "l",
    "A rugged limestone ridge named for two creator deities" +
      "|Una escarpada cresta caliza que lleva el nombre de dos deidades creadoras" +
      "|Une crête calcaire escarpée nommée d'après deux divinités créatrices" +
      "|二柱の創造神にちなんで名付けられた、険しい石灰岩の稜線",
    "Ryokami-san's name refers to Izanagi and Izanami, the two creator deities of Japanese mythology said to be enshrined on its ridge, and its limestone ridgeline is narrow and exposed enough to require chains on several pitches despite its modest height. In late winter, the wild plum groves at its base draw visitors well before the peak's own climbing season begins." +
      "|El nombre Ryokami-san alude a Izanagi e Izanami, las dos deidades creadoras de la mitología japonesa que se dice están consagradas en su cresta, y su cresta caliza es lo bastante estrecha y expuesta como para requerir cadenas en varios tramos pese a su modesta altura. A finales de invierno, los ciruelos silvestres de su base atraen visitantes mucho antes de que empiece la temporada de ascensión del propio pico." +
      "|Le nom Ryokami-san renvoie à Izanagi et Izanami, les deux divinités créatrices de la mythologie japonaise censées être vénérées sur sa crête, et sa crête calcaire est assez étroite et exposée pour nécessiter des chaînes sur plusieurs passages malgré sa modeste altitude. À la fin de l'hiver, les pruniers sauvages à son pied attirent des visiteurs bien avant le début de la saison d'ascension du sommet lui-même." +
      "|両神山の名は、その稜線に祀られるとされる日本神話の創造神イザナギ・イザナミの二柱に由来する。石灰岩の稜線は標高のわりに狭く切り立ち、いくつもの区間で鎖が必要となる。冬の終わりには麓の野生の梅林が、登山シーズンが始まるずっと前から訪れる人を集める。",
    [
      prop(
        "Ryokami Sanso Lodge|Refugio Ryokami Sanso|Refuge Ryokami Sanso|両神山荘",
        340, 27,
      ),
      prop(
        "Plum Grove Rest House|Casa de descanso del ciruelo silvestre|Maison de repos du prunier sauvage|梅林休憩所",
        240, 19,
      ),
    ],
  ),

  kumotoriyama: city(
    "Mt. Kumotori|Monte Kumotori|Mont Kumotori|雲取山",
    138.9400, 35.8500, "kanto", "domepeak", "chichibu_forest", "r",
    "Tokyo's only peak above 2,000 metres" +
      "|El único pico de Tokio por encima de los 2.000 metros" +
      "|Le seul sommet de Tokyo au-dessus de 2 000 mètres" +
      "|標高2000mを超える、東京都唯一の山",
    "Although most of Tokyo is famously flat, the metropolis's western edge reaches into the mountains far enough to include the summit of Kumotori-yama, its only point above 2,000 metres, making the peak a popular target for Tokyo residents who want to say they have climbed a 2,000-metre mountain without leaving their own prefecture. The surrounding Chichibu-Tama-Kai National Park protects one of the largest stretches of old-growth forest left within reach of the capital." +
      "|Aunque la mayor parte de Tokio es célebremente llana, el borde occidental de la metrópoli se adentra lo suficiente en las montañas como para incluir la cima del Kumotori-yama, su único punto por encima de los 2.000 metros, lo que convierte al pico en un objetivo popular para los habitantes de Tokio que quieren decir que han subido una montaña de 2.000 metros sin salir de su propia prefectura. El parque nacional circundante de Chichibu-Tama-Kai protege una de las mayores extensiones de bosque primario al alcance de la capital." +
      "|Bien que Tokyo soit réputée pour sa platitude, la bordure occidentale de la métropole s'avance assez loin dans les montagnes pour englober le sommet du Kumotori-yama, son seul point au-dessus de 2 000 mètres, faisant de ce sommet une cible prisée des habitants de Tokyo désireux de dire avoir gravi une montagne de 2 000 mètres sans quitter leur propre préfecture. Le parc national environnant de Chichibu-Tama-Kai protège l'une des plus grandes étendues de forêt ancienne encore accessibles depuis la capitale." +
      "|東京といえば平地の印象が強いが、都の西端は山地に食い込み、都内唯一の標高2000m超峰である雲取山の山頂を含んでいる。そのため「自分の県から出ずに2000m峰に登った」と言いたい都民に人気の目標になっている。周囲の秩父多摩甲斐国立公園は、首都圏から行ける範囲では最大級の原生林の一つを守っている。",
    [
      prop(
        "Kumotori Sanso Lodge|Refugio Kumotori Sanso|Refuge Kumotori Sanso|雲取山荘",
        380, 30,
      ),
      prop(
        "Okutama Trailhead Inn|Posada del sendero de Okutama|Auberge du départ d'Okutama|奥多摩登山口の宿",
        520, 40,
      ),
    ],
  ),

  kobushigatake: city(
    "Mt. Kobushi|Monte Kobushi|Mont Kobushi|甲武信岳",
    138.7300, 35.8600, "kanto", "spire", "chichibu_forest", "l",
    "A summit named for the three old provinces meeting at its top, and three rivers' source" +
      "|Una cima que lleva el nombre de las tres antiguas provincias que confluyen en ella, y origen de tres ríos" +
      "|Un sommet nommé d'après les trois anciennes provinces qui s'y rejoignent, et source de trois rivières" +
      "|三つの旧国境が交わる山頂に由来する名を持ち、三つの川の水源でもある",
    "Kobushi-ga-take's name is built from one character each of the three old provinces that met at its summit, Kai, Musashi and Shinano, a naming convention shared by only a handful of Japanese peaks. Rain falling on its slopes eventually reaches three separate major rivers, the Chikuma, the Tone and the Arakawa, making it one of very few single points in Japan that feeds three distinct watersheds." +
      "|El nombre Kobushi-ga-take se forma con un carácter de cada una de las tres antiguas provincias que confluían en su cima, Kai, Musashi y Shinano, una convención de nomenclatura que comparten solo un puñado de picos japoneses. La lluvia que cae en sus laderas acaba en tres grandes ríos distintos, el Chikuma, el Tone y el Arakawa, lo que la convierte en uno de los pocos puntos únicos de Japón que alimenta tres cuencas hidrográficas diferentes." +
      "|Le nom Kobushi-ga-take se compose d'un caractère de chacune des trois anciennes provinces qui se rejoignaient à son sommet, Kai, Musashi et Shinano, une convention de nommage que ne partagent qu'une poignée de sommets japonais. La pluie tombant sur ses pentes finit par rejoindre trois grands fleuves distincts, la Chikuma, la Tone et l'Arakawa, en faisant l'un des très rares points uniques du Japon qui alimente trois bassins versants différents." +
      "|甲武信岳の名は、山頂で境を接していた甲斐・武蔵・信濃の三国それぞれの頭文字を一字ずつ組み合わせたもので、こうした命名は日本の山でもごくわずかしかない。斜面に降った雨はやがて千曲川・利根川・荒川という三つの異なる大河に注ぎ、一つの山が三つの水系を分ける、これも日本では稀な例である。",
    [
      prop(
        "Kobushi Sanso Lodge|Refugio Kobushi Sanso|Refuge Kobushi Sanso|甲武信小屋",
        290, 23,
      ),
      prop(
        "Chikuma River Source Rest House|Casa de descanso del nacimiento del río Chikuma|Maison de repos de la source de la Chikuma|千曲川源流休憩所",
        220, 17,
      ),
    ],
  ),

  kinpusan: city(
    "Mt. Kinpu|Monte Kinpu|Mont Kinpu|金峰山",
    138.6500, 35.8700, "kanto", "granite_tower", "chichibu_forest", "r",
    "A Shugendo peak marked by a huge balanced boulder at its summit" +
      "|Un pico shugendo señalado por una enorme roca en equilibrio en su cima" +
      "|Un sommet shugendo signalé par un immense rocher en équilibre à son faîte" +
      "|山頂の巨岩「五丈石」が目印の修験の山",
    "The summit of Kinpu-san is marked by Gojo-iwa, a massive granite boulder formation balanced at its highest point, visible from a great distance and long treated as the mountain's own shrine. The name, meaning roughly 'gold peak,' is tied to old legends of gold deposits in the surrounding Chichibu mountains, though the peak's real wealth was always its role as a Shugendo training ground." +
      "|La cima del Kinpu-san está marcada por el Gojo-iwa, una enorme formación de roca granítica en equilibrio en su punto más alto, visible desde gran distancia y tratada desde antiguo como el propio santuario de la montaña. El nombre, que significa aproximadamente 'pico de oro', se vincula a viejas leyendas sobre yacimientos de oro en las montañas de Chichibu que la rodean, aunque la verdadera riqueza del pico fue siempre su papel como terreno de entrenamiento shugendo." +
      "|Le sommet du Kinpu-san est marqué par le Gojo-iwa, une immense formation rocheuse de granit en équilibre à son point culminant, visible de loin et traitée de longue date comme le sanctuaire propre de la montagne. Le nom, signifiant à peu près « pic d'or », est lié à d'anciennes légendes de gisements d'or dans les montagnes de Chichibu alentour, bien que la vraie richesse du sommet ait toujours été son rôle de terrain d'entraînement shugendo." +
      "|金峰山の山頂には巨大な花崗岩の塊が積み重なった五丈石があり、遠くからも見え、古くから山そのものの社として扱われてきた。「金の峰」を意味するこの名は周辺の秩父山地に金が眠るという伝説に由来するとされるが、この山の本当の価値は昔から修験の行場としての役割にあった。",
    [
      prop(
        "Kinpu Sanso Lodge|Refugio Kinpu Sanso|Refuge Kinpu Sanso|金峰山小屋",
        280, 22,
      ),
      prop(
        "Masutomi Onsen Inn|Posada termal de Masutomi|Auberge thermale de Masutomi|増富温泉旅館",
        660, 52,
      ),
    ],
  ),

  mizugakiyama: city(
    "Mt. Mizugaki|Monte Mizugaki|Mont Mizugaki|瑞牆山",
    138.6000, 35.8500, "kanto", "granite_tower", "chichibu_forest", "l",
    "A forest of granite spires that made it one of Japan's top climbing destinations" +
      "|Un bosque de agujas de granito que lo convirtió en uno de los mejores destinos de escalada de Japón" +
      "|Une forêt d'aiguilles de granit qui en a fait l'une des grandes destinations d'escalade du Japon" +
      "|花崗岩の岩塔群が林立し、日本有数のクライミングの聖地となった山",
    "Mizugaki-yama's slopes bristle with granite towers and spires that have made it one of Japan's best-known destinations for both traditional and bouldering-style rock climbing, drawing climbers from across the country since the sport took hold in the 1960s. Its name, evoking a sacred fence of rock, reflects how the formations were once seen as a natural barrier marking holy ground." +
      "|Las laderas del Mizugaki-yama se erizan de torres y agujas de granito que lo han convertido en uno de los destinos más conocidos de Japón tanto para la escalada tradicional como para el boulder, atrayendo a escaladores de todo el país desde que el deporte arraigó en los años sesenta. Su nombre, que evoca una valla sagrada de roca, refleja cómo las formaciones se veían antiguamente como una barrera natural que señalaba tierra sagrada." +
      "|Les pentes du Mizugaki-yama hérissent de tours et d'aiguilles de granit qui en ont fait l'une des destinations les plus connues du Japon pour l'escalade traditionnelle comme pour le bloc, attirant des grimpeurs de tout le pays depuis que ce sport s'est implanté dans les années 1960. Son nom, qui évoque une clôture sacrée de roche, reflète la façon dont ces formations furent jadis vues comme une barrière naturelle marquant une terre sainte." +
      "|瑞牆山の斜面には花崗岩の塔や岩峰が林立し、1960年代にクライミングが広まって以来、伝統的なルートクライミングとボルダリングの両方で全国から登攀者を集める日本有数の岩場となっている。「瑞垣」を思わせるその名は、こうした岩の連なりがかつて聖域を示す自然の垣根と見なされていたことを表す。",
    [
      prop(
        "Mizugaki Sanso Lodge|Refugio Mizugaki Sanso|Refuge Mizugaki Sanso|瑞牆山荘",
        320, 25,
      ),
      prop(
        "Climbers' Base Inn|Posada base de escaladores|Auberge base des grimpeurs|クライマーズベースの宿",
        460, 36,
      ),
    ],
  ),

  daibosatsurei: city(
    "Mt. Daibosatsu|Monte Daibosatsu|Mont Daibosatsu|大菩薩嶺",
    138.8500, 35.7200, "kanto", "grasspeak", "chichibu_forest", "r",
    "A gentle ridge made famous by one of Japan's longest unfinished novels" +
      "|Una cresta suave que hizo célebre una de las novelas por entregas más largas e inacabadas de Japón" +
      "|Une crête douce rendue célèbre par l'un des plus longs romans-feuilletons inachevés du Japon" +
      "|日本屈指の長大な未完の小説で有名になった、なだらかな稜線",
    "The pass just below the summit, Daibosatsu-toge, lent its name to Nakazato Kaizan's newspaper serial 'Daibosatsu Pass,' begun in 1913 and left unfinished after decades and dozens of volumes at the author's death, one of the longest works of fiction in Japanese literary history. The mountain's broad, easy ridge and its open view toward Mount Fuji have made it one of the most accessible peaks in the hundred for a day trip from Tokyo." +
      "|El paso justo bajo la cima, Daibosatsu-toge, dio nombre al folletín de Nakazato Kaizan 'El paso de Daibosatsu', iniciado en 1913 y dejado inacabado tras décadas y decenas de tomos a la muerte del autor, una de las obras de ficción más largas de la historia literaria japonesa. La cresta amplia y fácil de la montaña, y su vista abierta hacia el monte Fuji, la han convertido en uno de los picos más accesibles de las cien para una excursión de un día desde Tokio." +
      "|Le col juste sous le sommet, le Daibosatsu-toge, a donné son nom au feuilleton de Nakazato Kaizan « Le col de Daibosatsu », commencé en 1913 et laissé inachevé après des décennies et des dizaines de volumes à la mort de l'auteur, l'une des plus longues œuvres de fiction de l'histoire littéraire japonaise. La crête large et facile de la montagne, et sa vue dégagée vers le mont Fuji, en ont fait l'un des sommets les plus accessibles parmi les cent pour une excursion d'une journée depuis Tokyo." +
      "|山頂直下の峠・大菩薩峠は、中里介山が1913年に新聞連載を始め、何十年・何十巻を経て作者の死とともに未完のまま残された小説『大菩薩峠』の題名にその名を残した。日本の文学史でも屈指の長大な作品である。なだらかで歩きやすい稜線と富士山への開けた眺めから、東京から日帰りできる百名山のなかでも屈指の手頃な一座になっている。",
    [
      prop(
        "Daibosatsu Pass Rest House|Casa de descanso del paso Daibosatsu|Maison de repos du col de Daibosatsu|大菩薩峠介山荘",
        360, 28,
      ),
      prop(
        "Fukuchan Sanso Lodge|Refugio Fukuchan Sanso|Refuge Fukuchan Sanso|福ちゃん荘",
        280, 22,
      ),
    ],
  ),

  tanzawasan: city(
    "Mt. Tanzawa|Monte Tanzawa|Mont Tanzawa|丹沢山",
    139.1500, 35.4500, "kanto", "domepeak", "chichibu_forest", "l",
    "A weekend range near Tokyo now managing a deer population it once nearly lost" +
      "|Una cordillera de fin de semana cerca de Tokio que hoy gestiona una población de ciervos que casi perdió" +
      "|Un massif de week-end près de Tokyo qui gère aujourd'hui une population de cerfs qu'il a failli perdre" +
      "|東京近郊の週末登山地。かつて激減したシカの個体数管理が今の課題",
    "Tanzawa-Oyama Quasi-National Park draws heavy weekend crowds from Tokyo and Yokohama for its network of ridge trails, easily reached by train and bus. Sika deer here were hunted to near local extinction in the early 20th century; protections brought the population back so successfully that the park now manages deer numbers to prevent overgrazing of the forest understory." +
      "|El parque cuasi nacional de Tanzawa-Oyama atrae densas multitudes de fin de semana desde Tokio y Yokohama por su red de senderos de cresta, de fácil acceso en tren y autobús. Los ciervos sika de la zona fueron cazados hasta casi desaparecer localmente a principios del siglo XX; la protección devolvió la población con tanto éxito que el parque ahora gestiona su número para evitar el sobrepastoreo del sotobosque." +
      "|Le parc quasi national de Tanzawa-Oyama attire une foule nombreuse le week-end depuis Tokyo et Yokohama pour son réseau de sentiers de crête, facilement accessible en train et en bus. Les cerfs sika y furent chassés jusqu'à quasi disparition locale au début du XXe siècle ; les mesures de protection ont si bien restauré la population que le parc gère aujourd'hui leur nombre pour éviter le surpâturage du sous-bois." +
      "|丹沢大山国定公園は東京・横浜から電車とバスで気軽に行けることもあり、週末には尾根道のネットワークに大勢の登山者が押し寄せる。ニホンジカはかつて20世紀初頭に乱獲でほぼ地域から姿を消したが、保護によって数は回復しすぎるほどになり、公園は今、林床の食害を防ぐため頭数の管理に取り組んでいる。",
    [
      prop(
        "Tanzawa Sanso Lodge|Refugio Tanzawa Sanso|Refuge Tanzawa Sanso|丹沢山みやま山荘",
        300, 24,
      ),
      prop(
        "Oyama Cable Car Inn|Posada del funicular de Oyama|Auberge du funiculaire d'Oyama|大山ケーブルの宿",
        560, 44,
      ),
    ],
  ),

  tsukubasan: city(
    "Mt. Tsukuba|Monte Tsukuba|Mont Tsukuba|筑波山",
    140.1000, 36.2300, "kanto", "torii_peak", "chichibu_forest", "r",
    "A low twin peak named in Japan's oldest poetry, included for its age, not its height" +
      "|Un bajo pico gemelo citado en la poesía más antigua de Japón, incluido por su antigüedad, no por su altura" +
      "|Un bas sommet jumeau cité dans la plus ancienne poésie du Japon, retenu pour son ancienneté, non sa hauteur" +
      "|『万葉集』にも詠まれた双耳峰。標高でなく古さゆえに選ばれた",
    "At just 877 metres, Tsukuba-san is by far the lowest of the hundred, included by Fukada for its age and cultural weight rather than elevation: it appears in the 8th-century Manyoshu poetry anthology and the Hitachi Fudoki, among the oldest named mountains in Japanese writing. Its two peaks, Nyotai-san and Nantai-san, meaning 'female body' and 'male body,' were once the site of utagaki, ritual gatherings where young men and women sang and courted in public." +
      "|Con solo 877 metros, el Tsukuba-san es con diferencia el más bajo de las cien, incluido por Fukada por su antigüedad y peso cultural más que por su altitud: aparece en la antología poética Manyoshu del siglo VIII y en el Hitachi Fudoki, entre las montañas nombradas más antiguas de la escritura japonesa. Sus dos cimas, Nyotai-san y Nantai-san, 'cuerpo femenino' y 'cuerpo masculino', fueron antaño escenario de utagaki, reuniones rituales donde jóvenes cantaban y cortejaban en público." +
      "|Avec seulement 877 mètres, le Tsukuba-san est de loin le plus bas des cent, retenu par Fukada pour son ancienneté et son poids culturel plutôt que pour son altitude : il figure dans l'anthologie poétique du Manyoshu au VIIIe siècle et dans le Hitachi Fudoki, parmi les plus anciennes montagnes nommées de l'écrit japonais. Ses deux sommets, Nyotai-san et Nantai-san, « corps féminin » et « corps masculin », furent autrefois le théâtre d'utagaki, des rassemblements rituels où jeunes gens chantaient et se courtisaient en public." +
      "|標高わずか877mの筑波山は百名山中もっとも低いが、深田久弥はその標高ではなく古さと文化的重みゆえに選んだ。8世紀の『万葉集』や『常陸国風土記』にも登場し、日本の文献に名の残る山として最も古い部類に入る。「女体山」「男体山」と呼ばれる二つの峰は、かつて男女が歌を交わし求愛した歌垣の舞台でもあった。",
    [
      prop(
        "Tsukubasan Shrine Lodge|Albergue del santuario Tsukubasan|Auberge du sanctuaire Tsukubasan|筑波山神社の宿坊",
        440, 35,
      ),
      prop(
        "Tsukuba Ropeway Station House|Estación del teleférico de Tsukuba|Gare du téléphérique de Tsukuba|筑波山ロープウェー駅舎",
        980, 76,
      ),
    ],
  ),

  // ===================================================================
  // kitaalps (16) — yarigatake は既存
  // ===================================================================

  shiroumadake: city(
    "Mt. Shirouma|Monte Shirouma|Mont Shirouma|白馬岳",
    137.7597, 36.7583, "kitaalps", "ridge_snow", "kamikochi_valley", "l",
    "Home to one of Japan's three largest permanent snowfields" +
      "|Sede de uno de los tres mayores neveros permanentes de Japón" +
      "|Abrite l'un des trois plus grands névés permanents du Japon" +
      "|日本三大雪渓の一つを抱く峰",
    "The Daisekkei, a permanent snow gully on Shirouma-dake's flank, is counted among Japan's three largest snowfields and lets climbers ascend on snow well into summer, ice axe in hand, even as wildflowers bloom at its edges. Unlike most of the granite Northern Alps, patches of limestone here support an unusually rich alpine flora, and the mountain's name, 'white horse,' comes from a horse-shaped snow pattern once used by farmers below to time rice planting." +
      "|El Daisekkei, un barranco de nieve permanente en el flanco del Shirouma-dake, se cuenta entre los tres mayores neveros de Japón y permite a los alpinistas ascender sobre nieve hasta bien entrado el verano, piolet en mano, mientras florecen flores silvestres en sus bordes. A diferencia de la mayoría de los Alpes Septentrionales graníticos, aquí hay parches de caliza que sostienen una flora alpina inusualmente rica, y el nombre de la montaña, 'caballo blanco', viene de un patrón de nieve con forma de caballo que los agricultores de abajo usaban para calcular la siembra del arroz." +
      "|Le Daisekkei, un couloir de neige permanent sur le flanc du Shirouma-dake, compte parmi les trois plus grands névés du Japon et permet aux alpinistes de grimper sur la neige jusqu'en plein été, piolet en main, tandis que des fleurs sauvages éclosent à ses abords. Contrairement à la plupart des Alpes du Nord granitiques, des poches de calcaire y abritent une flore alpine étonnamment riche, et le nom de la montagne, « cheval blanc », vient d'un motif de neige en forme de cheval que les paysans en contrebas utilisaient jadis pour calculer les semis de riz." +
      "|白馬岳の斜面にある大雪渓は日本三大雪渓の一つに数えられ、真夏でもピッケルを手に雪の上を登ることができ、その縁では高山植物が花開く。花崗岩質の北アルプスでは珍しく石灰岩の露出があり、めずらしく豊かな高山植物相を育てている。「白馬」の名は、山肌に現れる馬形の雪形にちなみ、麓の農家はかつてこれを稲作の時期の目安にしていた。",
    [
      prop(
        "Hakuba Sanso Grand Lodge|Gran refugio Hakuba Sanso|Grand refuge Hakuba Sanso|白馬山荘",
        1700, 132,
      ),
      prop(
        "Hakuba Village Ski Inn|Posada de esquí de Hakuba|Auberge de ski de Hakuba|白馬村のスキー宿",
        1400, 110,
      ),
    ],
  ),

  goryudake: city(
    "Mt. Goryū|Monte Goryū|Mont Goryū|五竜岳",
    137.7670, 36.7170, "kitaalps", "spire", "kamikochi_valley", "r",
    "Named for a dragon-shaped snow pattern that appears each spring" +
      "|Nombrado por un patrón de nieve con forma de dragón que aparece cada primavera" +
      "|Nommé d'après un motif de neige en forme de dragon qui apparaît chaque printemps" +
      "|春に現れる龍の形の雪形にちなんで名付けられた",
    "Each spring, melting snow on Goryu-dake's face leaves a pattern said to resemble a coiled dragon, which gave the mountain its name, 'five dragons,' long before satellite maps could confirm the resemblance from any single angle. Its neighbouring rock spire, Goryu-yari, adds a sharp secondary summit to a ridge already considered one of the more technical connecting routes in the Northern Alps." +
      "|Cada primavera, la nieve al derretirse en la cara del Goryu-dake deja un dibujo que se dice recuerda a un dragón enroscado, lo que dio a la montaña su nombre, 'cinco dragones', mucho antes de que los mapas satelitales pudieran confirmar el parecido desde ningún ángulo. Su aguja rocosa vecina, el Goryu-yari, añade una cima secundaria afilada a una cresta ya considerada una de las rutas de enlace más técnicas de los Alpes Septentrionales." +
      "|Chaque printemps, la neige fondante sur la face du Goryu-dake laisse un motif censé évoquer un dragon lové, ce qui valut à la montagne son nom, « cinq dragons », bien avant que les cartes satellite ne puissent confirmer la ressemblance sous un angle quelconque. Son aiguille rocheuse voisine, le Goryu-yari, ajoute un sommet secondaire acéré à une crête déjà considérée comme l'un des itinéraires de liaison les plus techniques des Alpes du Nord." +
      "|春になると五竜岳の山肌に現れる雪解けの模様がとぐろを巻く龍に見えることから「五龍」の名が付いたとされ、衛星写真でその姿を確かめられるようになるはるか以前からそう呼ばれてきた。隣り合う岩峰・五竜槍は、ただでさえ北アルプスでも技術を要する縦走路に、もう一つ鋭い頂を加えている。",
    [
      prop(
        "Goryu Sanso Lodge|Refugio Goryu Sanso|Refuge Goryu Sanso|五竜山荘",
        1550, 122,
      ),
      prop(
        "Hakuba47 Ski Base Inn|Posada base de esquí Hakuba47|Auberge base de ski Hakuba47|白馬47スキー場の宿",
        1250, 98,
      ),
    ],
  ),

  kashimayarigatake: city(
    "Mt. Kashima-Yari|Monte Kashima-Yari|Mont Kashima-Yari|鹿島槍ヶ岳",
    137.7860, 36.6850, "kitaalps", "spire", "kamikochi_valley", "l",
    "A twin-peaked mountain whose cirque holds one of Japan's few confirmed glaciers" +
      "|Una montaña de doble cima cuyo circo alberga uno de los pocos glaciares confirmados de Japón" +
      "|Une montagne à double sommet dont le cirque abrite l'un des rares glaciers confirmés du Japon" +
      "|カールに日本でも数少ない現存氷河を抱く双耳峰",
    "Kashima-Yari's north and south peaks form one of the most photographed silhouettes in the Northern Alps, and the Kakuneri cirque below its ridge is one of a handful of sites in Japan where researchers confirmed, in 2012, the presence of a small surviving glacier, decades after most assumed none remained in the country. The mountain is usually approached along the long Goryu-Kashima ridge, a route considered a serious multi-day undertaking." +
      "|Los picos norte y sur del Kashima-Yari forman una de las siluetas más fotografiadas de los Alpes Septentrionales, y el circo de Kakuneri, bajo su cresta, es uno de los pocos lugares de Japón donde los investigadores confirmaron, en 2012, la presencia de un pequeño glaciar superviviente, décadas después de que la mayoría asumiera que no quedaba ninguno en el país. La montaña suele abordarse por la larga cresta Goryu-Kashima, una ruta considerada una empresa seria de varios días." +
      "|Les pics nord et sud du Kashima-Yari forment l'une des silhouettes les plus photographiées des Alpes du Nord, et le cirque de Kakuneri, sous sa crête, est l'un des rares sites du Japon où des chercheurs ont confirmé, en 2012, la présence d'un petit glacier survivant, des décennies après que la plupart pensaient qu'il n'en restait plus dans le pays. La montagne s'aborde généralement par la longue crête Goryu-Kashima, un itinéraire considéré comme une entreprise sérieuse de plusieurs jours." +
      "|鹿島槍ヶ岳の北峰と南峰は北アルプスでも屈指の写真映えするシルエットをつくり、稜線の下にあるカクネ里カールは、国内にはもう氷河は残っていないと長らく思われていたなかで、2012年に小規模な現存氷河の存在が確認された数少ない場所の一つである。通常は五竜からの長い稜線をたどってこの山に入り、本格的な複数日の縦走とされる。",
    [
      prop(
        "Reisen Sanso Lodge|Refugio Reisen Sanso|Refuge Reisen Sanso|冷池山荘",
        1450, 114,
      ),
      prop(
        "Kakuneri Cirque Overlook|Mirador del circo de Kakuneri|Belvédère du cirque de Kakuneri|カクネ里展望地",
        260, 20,
      ),
    ],
  ),

  tsurugidake: city(
    "Mt. Tsurugi|Monte Tsurugi|Mont Tsurugi|剱岳",
    137.6180, 36.6280, "kitaalps", "spire", "alpineridge", "r",
    "The most technical of the hundred, once thought unclimbable and cursed" +
      "|La más técnica de las cien, antaño considerada inescalable y maldita" +
      "|La plus technique des cent, jadis jugée inescaladable et maudite" +
      "|百名山でも屈指の難路。かつては登れぬ呪われた山とされた",
    "Government surveyors did not reach Tsurugi-dake's summit until 1907, among the last major peaks in Japan to be officially climbed, because Shugendo tradition long held the mountain cursed and unclimbable; the survey team was startled to find a centuries-old bronze spearhead and staff already at the top, left by ascetics whose ascent had gone unrecorded. Today's standard route crosses the chained traverses known as the crab's vertical and horizontal walks, considered the most exposed non-technical climbing among the hundred." +
      "|Los topógrafos del gobierno no alcanzaron la cima del Tsurugi-dake hasta 1907, entre los últimos grandes picos de Japón en ser escalados oficialmente, porque la tradición shugendo consideraba la montaña maldita e inescalable desde hacía mucho; el equipo de reconocimiento se sorprendió al hallar ya en la cima una punta de lanza de bronce y un bastón de siglos de antigüedad, dejados por ascetas cuya ascensión nunca quedó registrada. La ruta estándar actual cruza los pasos encadenados conocidos como el paso vertical y horizontal del cangrejo, considerados la escalada no técnica más expuesta entre las cien." +
      "|Les géomètres du gouvernement n'atteignirent le sommet du Tsurugi-dake qu'en 1907, l'un des derniers grands sommets du Japon officiellement gravis, car la tradition shugendo tenait depuis longtemps la montagne pour maudite et inescaladable ; l'équipe de relevé fut stupéfaite d'y trouver déjà une pointe de lance en bronze et un bâton vieux de plusieurs siècles, laissés par des ascètes dont l'ascension n'avait jamais été consignée. L'itinéraire standard actuel traverse les passages encordés appelés la marche verticale et horizontale du crabe, considérés comme l'escalade non technique la plus exposée parmi les cent." +
      "|剱岳の山頂に政府の測量隊が到達したのは1907年、日本の主要な山としては最後期の一つだった。修験の伝統では長らく呪われた登れぬ山とされていたためである。測量隊は山頂に、記録に残らない誰かの登拝によって残された数百年前の錫杖と剣が既に置かれているのを見つけて驚いた。現在の一般ルートは「カニのタテバイ・ヨコバイ」と呼ばれる鎖場を通り、百名山のなかでも屈指の高度感ある非技術的登攀とされる。",
    [
      prop(
        "Tsurugisawa Sanso Lodge|Refugio Tsurugisawa Sanso|Refuge Tsurugisawa Sanso|剱沢小屋",
        1650, 128,
      ),
      prop(
        "Maedaira Rest Hut|Refugio de descanso de Maedaira|Refuge de repos de Maedaira|前剱の休憩小屋",
        340, 27,
      ),
    ],
  ),

  tateyama: city(
    "Mt. Tate|Monte Tate|Mont Tate|立山",
    137.6290, 36.5750, "kitaalps", "torii_peak", "alpineridge", "l",
    "One of Japan's three holiest mountains, crossed by its highest public road" +
      "|Una de las tres montañas más sagradas de Japón, cruzada por su carretera pública más alta" +
      "|L'une des trois montagnes les plus sacrées du Japon, traversée par sa plus haute route publique" +
      "|日本三霊山の一つ。公共交通で行ける日本最高所を通す",
    "Tate-yama is counted with Fuji-san and Haku-san among Japan's three holiest mountains, and pilgrims have climbed to its Oyama shrine for over a thousand years. The Tateyama Kurobe Alpine Route now carries visitors by bus and cable car to Murodo, the highest point reachable by public transport in Japan, where snow walls along the road can still tower up to 20 metres in spring." +
      "|El Tate-yama se cuenta junto al Fuji-san y el Haku-san entre las tres montañas más sagradas de Japón, y los peregrinos han subido a su santuario Oyama durante más de mil años. La ruta alpina Tateyama Kurobe lleva hoy a los visitantes en autobús y funicular hasta Murodo, el punto más alto de Japón accesible en transporte público, donde los muros de nieve junto a la carretera aún pueden alcanzar 20 metros en primavera." +
      "|Le Tate-yama compte, avec le Fuji-san et le Haku-san, parmi les trois montagnes les plus sacrées du Japon, et des pèlerins gravissent son sanctuaire Oyama depuis plus de mille ans. La route alpine Tateyama Kurobe conduit aujourd'hui les visiteurs en bus et en funiculaire jusqu'à Murodo, le point le plus élevé du Japon accessible en transport public, où les murs de neige bordant la route peuvent encore culminer à 20 mètres au printemps." +
      "|立山は富士山・白山と並ぶ日本三霊山の一つで、参詣者は千年以上にわたり山頂の雄山神社を目指して登ってきた。今日では立山黒部アルペンルートがバスとケーブルカーで観光客を室堂まで運び、そこは公共交通で行ける日本最高所である。道沿いの雪の壁は春には高さ20mに達することもある。",
    [
      prop(
        "Murodo Terminal Lodge|Albergue de la terminal de Murodo|Auberge du terminus de Murodo|室堂ターミナルの宿",
        2200, 172,
      ),
      prop(
        "Ichinoetsu Sanso Lodge|Refugio Ichinoetsu Sanso|Refuge Ichinoetsu Sanso|一ノ越山荘",
        980, 76,
      ),
    ],
  ),

  yakushidake: city(
    "Mt. Yakushi|Monte Yakushi|Mont Yakushi|薬師岳",
    137.5490, 36.4540, "kitaalps", "ridge_snow", "alpineridge", "r",
    "A broad Buddha-named massif that changed Japan's mountain weather forecasting" +
      "|Un amplio macizo con nombre de Buda que cambió la previsión meteorológica de montaña de Japón" +
      "|Un vaste massif au nom de Bouddha qui a transformé la météorologie de montagne du Japon" +
      "|日本の山岳気象予報のあり方を変えた、仏の名を持つ広大な山塊",
    "Yakushi-dake takes its name from Yakushi Nyorai, the Buddha of healing, and its broad, gentle massif is ringed by several deep glacial-era cirques on its eastern face. In 1963, a sudden blizzard killed 13 university hikers on its ridge in a widely studied disaster that led directly to improvements in Japanese mountain weather forecasting still used today." +
      "|El Yakushi-dake toma su nombre de Yakushi Nyorai, el Buda de la curación, y su amplio y suave macizo está rodeado de varios circos glaciares profundos en su cara este. En 1963, una ventisca repentina mató a 13 excursionistas universitarios en su cresta, un desastre ampliamente estudiado que llevó directamente a mejoras en la previsión meteorológica de montaña japonesa aún vigentes hoy." +
      "|Le Yakushi-dake tire son nom de Yakushi Nyorai, le Bouddha de la guérison, et son vaste massif aux pentes douces est cerné de plusieurs cirques glaciaires profonds sur sa face est. En 1963, un blizzard soudain tua 13 randonneurs universitaires sur sa crête, une catastrophe largement étudiée qui mena directement à des améliorations de la prévision météorologique de montagne japonaise encore utilisées aujourd'hui." +
      "|薬師岳の名は医薬の仏・薬師如来にちなみ、東側の斜面にはいくつもの深い氷河期由来のカールが並ぶなだらかな山塊である。1963年、稜線で突然の吹雪により大学山岳部の13人が命を落とす遭難が起き、この事故は広く研究され、今も使われる日本の山岳気象予報の改善に直接つながった。",
    [
      prop(
        "Yakushidake Sanso Lodge|Refugio Yakushidake Sanso|Refuge Yakushidake Sanso|薬師岳山荘",
        1350, 106,
      ),
      prop(
        "Taro Sanso Lodge|Refugio Taro Sanso|Refuge Taro Sanso|太郎平小屋",
        980, 76,
      ),
    ],
  ),

  kurobegorodake: city(
    "Mt. Kurobe-Gorō|Monte Kurobe-Gorō|Mont Kurobe-Gorō|黒部五郎岳",
    137.5170, 36.3980, "kitaalps", "ridge_snow", "alpineridge", "l",
    "One of the Northern Alps' most dramatic glacial cirques" +
      "|Uno de los circos glaciares más espectaculares de los Alpes Septentrionales" +
      "|L'un des cirques glaciaires les plus spectaculaires des Alpes du Nord" +
      "|北アルプスでも屈指の劇的なカール地形を持つ",
    "The huge bowl-shaped cirque carved into Kurobe-Goro-dake's flank is among the most dramatic glacial-era formations in the Northern Alps, its steep inner walls ringing a flat floor far below the ridge. Reaching it requires a long approach deep into the range, which keeps visitor numbers far lower than at peaks closer to the Kurobe Alpine Route." +
      "|El enorme circo en forma de cuenco tallado en el flanco del Kurobe-Goro-dake se cuenta entre las formaciones glaciares más espectaculares de los Alpes Septentrionales, con sus paredes internas empinadas rodeando un fondo llano muy por debajo de la cresta. Llegar hasta él exige una larga aproximación al corazón de la cordillera, lo que mantiene el número de visitantes muy por debajo del de los picos más cercanos a la ruta alpina de Kurobe." +
      "|L'immense cirque en forme de cuvette creusé dans le flanc du Kurobe-Goro-dake compte parmi les formations glaciaires les plus spectaculaires des Alpes du Nord, ses parois internes abruptes entourant un fond plat bien en contrebas de la crête. Y accéder exige une longue marche d'approche au cœur du massif, ce qui maintient le nombre de visiteurs bien plus bas que pour les sommets proches de la route alpine de Kurobe." +
      "|黒部五郎岳の斜面に刻まれたお椀型の巨大なカールは北アルプスでも屈指の劇的な氷河地形で、切り立った内壁が稜線のはるか下に平らな底を囲んでいる。そこへ至るには山域の奥深くまで長いアプローチが必要で、黒部アルペンルートに近い山々に比べ訪れる人ははるかに少ない。",
    [
      prop(
        "Kurobegoro Sanso Lodge|Refugio Kurobegoro Sanso|Refuge Kurobegoro Sanso|黒部五郎小舎",
        1150, 90,
      ),
      prop(
        "Kumo-no-Daira Camp Lodge|Albergue de campamento Kumo-no-Daira|Auberge du camp de Kumo-no-Daira|雲ノ平のキャンプ地の宿",
        1600, 126,
      ),
    ],
  ),

  suishodake: city(
    "Mt. Suishō|Monte Suishō|Mont Suishō|水晶岳",
    137.6170, 36.4080, "kitaalps", "ridge_snow", "alpineridge", "r",
    "The 'crystal peak,' among the most remote summits in the Alps, once mined for quartz" +
      "|El 'pico de cristal', entre las cimas más remotas de los Alpes, antaño explotado por su cuarzo" +
      "|Le « pic de cristal », l'un des sommets les plus isolés des Alpes, jadis exploité pour son quartz" +
      "|「水晶」の名を持つ、かつて実際に水晶が採れた北アルプス最奥の一峰",
    "Suisho-dake, also known as Kuro-dake, takes its name from actual rock crystal once gathered from its slopes by mountain ascetics and prospectors, some of it later used in temple ornaments. Sitting near the geographic centre of the Northern Alps, it is often called the range's most remote major summit, reachable only after days of approach from any direction." +
      "|El Suisho-dake, también conocido como Kuro-dake, toma su nombre del cristal de roca que antaño se recogía en sus laderas por ascetas y buscadores, parte del cual se usó luego en ornamentos de templos. Situado cerca del centro geográfico de los Alpes Septentrionales, se le suele llamar la cima principal más remota de la cordillera, alcanzable solo tras días de aproximación desde cualquier dirección." +
      "|Le Suisho-dake, aussi appelé Kuro-dake, tire son nom du cristal de roche jadis récolté sur ses pentes par des ascètes et des chercheurs, dont une partie servit ensuite à orner des temples. Situé près du centre géographique des Alpes du Nord, il est souvent qualifié de sommet majeur le plus reculé du massif, accessible seulement après plusieurs jours d'approche, quelle que soit la direction." +
      "|水晶岳(黒岳とも呼ばれる)の名は、かつて山伏や採掘者がその斜面で実際に水晶を採取し、一部は寺院の荘厳具にも使われたことに由来する。北アルプスのほぼ中心に位置し、どの方角からもたどり着くのに数日を要する、山域最奥の主要峰とされることが多い。",
    [
      prop(
        "Wari-daira Sanso Lodge|Refugio Wari-daira Sanso|Refuge Wari-daira Sanso|ワリモ平の小屋",
        1050, 82,
      ),
      prop(
        "Sugoroku Sanso Lodge|Refugio Sugoroku Sanso|Refuge Sugoroku Sanso|双六小屋",
        1200, 94,
      ),
    ],
  ),

  washibadake: city(
    "Mt. Washiba|Monte Washiba|Mont Washiba|鷲羽岳",
    137.6330, 36.3980, "kitaalps", "caldera", "alpineridge", "l",
    "A granite peak with an unusual explosion crater and a major river's source" +
      "|Un pico de granito con un inusual cráter de explosión y el nacimiento de un gran río" +
      "|Un sommet de granit à l'inhabituel cratère d'explosion, source d'un grand fleuve" +
      "|珍しい爆裂火口を持つ花崗岩の峰。大河の源流でもある",
    "Unlike most of the granite Northern Alps, Washiba-dake carries a genuine explosion crater near its summit, a geological rarity for this part of the range. Streams from its slopes gather into the Takase River, one of the sources that eventually feeds the Shinano, Japan's longest river, on its long path to the Sea of Japan." +
      "|A diferencia de la mayoría de los graníticos Alpes Septentrionales, el Washiba-dake presenta un auténtico cráter de explosión cerca de su cima, una rareza geológica en esta parte de la cordillera. Los arroyos de sus laderas se reúnen en el río Takase, una de las fuentes que finalmente alimenta el Shinano, el río más largo de Japón, en su largo camino hacia el mar de Japón." +
      "|Contrairement à la plupart des Alpes du Nord granitiques, le Washiba-dake présente un authentique cratère d'explosion près de son sommet, une rareté géologique pour cette partie du massif. Les ruisseaux de ses pentes se rassemblent dans la rivière Takase, l'une des sources qui alimente finalement la Shinano, le plus long fleuve du Japon, sur son long parcours vers la mer du Japon." +
      "|花崗岩質の北アルプスでは珍しく、鷲羽岳の山頂近くには本物の爆裂火口があり、この山域では地質学的に稀な存在である。斜面から流れ出す沢は高瀬川に集まり、それはやがて日本一長い信濃川へと合流し、日本海へと長い旅を続ける源流の一つとなる。",
    [
      prop(
        "Washiba Sanso Lodge|Refugio Washiba Sanso|Refuge Washiba Sanso|鷲羽岳の小屋",
        980, 76,
      ),
      prop(
        "Takase River Source Hut|Refugio del nacimiento del río Takase|Refuge de la source de la Takase|高瀬川源流の小屋",
        720, 56,
      ),
    ],
  ),

  hotakadake: city(
    "Mt. Hotaka|Monte Hotaka|Mont Hotaka|穂高岳",
    137.6470, 36.2890, "kitaalps", "spire", "kamikochi_valley", "r",
    "Japan's third-highest mountain, ringed by a cirque famous for autumn colour" +
      "|La tercera montaña más alta de Japón, rodeada de un circo célebre por sus colores otoñales" +
      "|La troisième plus haute montagne du Japon, ceinte d'un cirque réputé pour ses couleurs d'automne" +
      "|日本第3位の高峰。紅葉で名高いカールに囲まれる",
    "Oku-hotaka-dake, the highest of the Hotaka massif's several summits, is Japan's third-tallest mountain after Fuji-san and Kita-dake. On its eastern side, the Karasawa cirque turns a vivid red and gold every autumn as its slopes of dwarf pine and alpine shrubs change colour together, drawing hikers who camp there specifically to see it." +
      "|El Oku-hotaka-dake, la más alta de las varias cimas del macizo Hotaka, es la tercera montaña más alta de Japón tras el Fuji-san y el Kita-dake. En su cara este, el circo de Karasawa se tiñe cada otoño de un rojo y dorado intensos cuando sus laderas de pino enano y arbustos alpinos cambian de color a la vez, atrayendo a excursionistas que acampan allí solo para verlo." +
      "|L'Oku-hotaka-dake, le plus haut des multiples sommets du massif Hotaka, est la troisième montagne la plus élevée du Japon après le Fuji-san et le Kita-dake. Sur sa face est, le cirque de Karasawa se pare chaque automne d'un rouge et d'un or éclatants lorsque ses pentes de pins nains et d'arbustes alpins changent de couleur ensemble, attirant des randonneurs qui y campent tout exprès pour le voir." +
      "|穂高岳のいくつかの峰のうち最高点である奥穂高岳は、富士山・北岳に次ぐ日本第3位の高峰である。東側の涸沢カールは毎秋、ハイマツと高山性の低木がいっせいに色づき、鮮やかな赤と金に染まる。その景色だけを目当てにテントを張る登山者も多い。",
    [
      prop(
        "Hotaka Sanso Lodge|Refugio Hotaka Sanso|Refuge Hotaka Sanso|穂高岳山荘",
        1900, 148,
      ),
      prop(
        "Karasawa Hutte Lodge|Refugio Karasawa Hutte|Refuge Karasawa Hutte|涸沢ヒュッテ",
        1650, 128,
      ),
    ],
  ),

  jonendake: city(
    "Mt. Jōnen|Monte Jōnen|Mont Jōnen|常念岳",
    137.7320, 36.3270, "kitaalps", "spire", "kamikochi_valley", "l",
    "A pyramid visible from the plain below, once read by farmers as a planting calendar" +
      "|Una pirámide visible desde la llanura, que los agricultores leían como calendario de siembra" +
      "|Une pyramide visible depuis la plaine, jadis lue par les paysans comme un calendrier des semis" +
      "|平野から望める三角錐。農家はその雪形を田植えの目安にした",
    "Jonen-dake's steep pyramid is the dominant peak seen from the Matsumoto and Azumino plain below, and like several other Alps peaks, the pattern of melting snow on its face was traditionally read by farmers as a signal for when to begin planting rice. Its clean triangular profile has made it one of the most recognisable summits of the Northern Alps skyline from the valley floor." +
      "|La empinada pirámide del Jonen-dake es el pico dominante visto desde la llanura de Matsumoto y Azumino, y como en otros picos de los Alpes, el dibujo de la nieve al derretirse en su cara se leía tradicionalmente por los agricultores como señal de cuándo empezar a plantar el arroz. Su perfil triangular limpio lo ha convertido en una de las cimas más reconocibles del horizonte de los Alpes Septentrionales desde el fondo del valle." +
      "|La pyramide escarpée du Jonen-dake est le sommet dominant vu depuis la plaine de Matsumoto et d'Azumino en contrebas, et comme pour plusieurs autres sommets des Alpes, le motif de la neige fondante sur sa face était traditionnellement lu par les paysans comme un signal du moment de commencer les semis de riz. Son profil triangulaire épuré en a fait l'un des sommets les plus reconnaissables de la ligne de crête des Alpes du Nord depuis le fond de la vallée." +
      "|常念岳の急峻な三角錐は麓の松本・安曇野平野からひときわ目立つ峰で、他のいくつかのアルプスの山と同じく、山肌に現れる雪形は農家にとって田植えを始める時期の伝統的な目安だった。その整った三角形の姿は、谷底から見上げる北アルプスの稜線のなかでも際立って見分けやすい。",
    [
      prop(
        "Jonen Sanso Lodge|Refugio Jonen Sanso|Refuge Jonen Sanso|常念小屋",
        1300, 102,
      ),
      prop(
        "Azumino Farmhouse Inn|Posada agrícola de Azumino|Auberge de ferme d'Azumino|安曇野の農家民宿",
        620, 48,
      ),
    ],
  ),

  tsubakurodake: city(
    "Mt. Tsubakuro|Monte Tsubakuro|Mont Tsubakuro|燕岳",
    137.7400, 36.3870, "kitaalps", "granite_tower", "kamikochi_valley", "r",
    "White granite towers weathered into strange shapes, a gentle introduction to the Alps" +
      "|Torres de granito blanco erosionadas en formas extrañas, una suave puerta de entrada a los Alpes" +
      "|Des tours de granit blanc érodées en formes étranges, une douce porte d'entrée dans les Alpes" +
      "|奇岩に風化した白い花崗岩の塔。北アルプス入門にふさわしい山",
    "Wind and rain have weathered Tsubakuro-dake's pale granite into knob-like towers and pillars nicknamed for the animal and object shapes hikers see in them, a landscape unlike anywhere else in the range. Its relatively gentle main trail and well-appointed lodge have made it a favourite first '3,000-metre-class' Northern Alps climb for beginners." +
      "|El viento y la lluvia han erosionado el pálido granito del Tsubakuro-dake en torres y pilares nudosos apodados según las formas de animales y objetos que los excursionistas ven en ellos, un paisaje distinto a cualquier otro de la cordillera. Su sendero principal, relativamente suave, y su bien equipado refugio lo han convertido en la primera ascensión favorita de 'clase 3.000 metros' de los Alpes Septentrionales para principiantes." +
      "|Le vent et la pluie ont érodé le granit pâle du Tsubakuro-dake en tours et piliers noueux, surnommés d'après les formes d'animaux et d'objets que les randonneurs y voient, un paysage sans équivalent ailleurs dans le massif. Son sentier principal relativement doux et son refuge bien équipé en ont fait l'ascension « classe 3 000 mètres » préférée des débutants dans les Alpes du Nord." +
      "|風雨に削られた燕岳の白い花崗岩は、こぶ状の塔や柱となり、登山者がそこに見出す動物や物の形にちなんだ愛称が付けられている。山域のどこにも似たものが無い独特の景観である。比較的緩やかな主要ルートと設備の整った山小屋のおかげで、初心者が最初に挑む「3000m級」北アルプスの山として人気が高い。",
    [
      prop(
        "Tsubakuro Sanso Lodge|Refugio Tsubakuro Sanso|Refuge Tsubakuro Sanso|燕山荘",
        1750, 136,
      ),
      prop(
        "Nakabusa Onsen Inn|Posada termal de Nakabusa|Auberge thermale de Nakabusa|中房温泉旅館",
        980, 76,
      ),
    ],
  ),

  norikuradake: city(
    "Mt. Norikura|Monte Norikura|Mont Norikura|乗鞍岳",
    137.5528, 36.1067, "kitaalps", "cone_volcano", "kamikochi_valley", "l",
    "A 23-peak volcanic complex reachable by bus almost to its highest point" +
      "|Un complejo volcánico de 23 picos accesible en autobús casi hasta su punto más alto" +
      "|Un complexe volcanique de 23 sommets accessible en bus presque jusqu'à son point culminant" +
      "|バスでほぼ山頂近くまで行ける、23の峰からなる火山群",
    "What looks from a distance like a single mountain is in fact a complex of 23 named peaks, and a shuttle bus carries visitors up to Tatami-daira, leaving only a short walk to the highest summit, Ken-ga-mine. The open volcanic terrain and steady updrafts near the top have also made Norikura-dake a well-known launch site for hang gliders and paragliders." +
      "|Lo que a distancia parece una sola montaña es en realidad un complejo de 23 picos con nombre propio, y un autobús lanzadera lleva a los visitantes hasta Tatami-daira, dejando solo una corta caminata hasta la cima más alta, el Ken-ga-mine. El terreno volcánico abierto y las corrientes ascendentes constantes cerca de la cumbre han hecho también del Norikura-dake un conocido punto de despegue para ala delta y parapente." +
      "|Ce qui ressemble de loin à une seule montagne est en fait un complexe de 23 sommets nommés, et une navette conduit les visiteurs jusqu'à Tatami-daira, ne laissant qu'une courte marche jusqu'au plus haut sommet, le Ken-ga-mine. Le terrain volcanique dégagé et les courants ascendants réguliers près du faîte ont aussi fait du Norikura-dake un site de décollage réputé pour le deltaplane et le parapente." +
      "|遠くからは一つの山に見えるが、乗鞍岳は実際には23の峰からなる火山群である。シャトルバスが観光客を畳平まで運び、最高点の剣ヶ峰へはそこから短い歩きで到達できる。開けた火山地形と山頂付近の安定した上昇気流から、ハンググライダーやパラグライダーの発進地としても知られている。",
    [
      prop(
        "Tatamidaira Bus Terminal Lodge|Albergue de la terminal de autobuses de Tatamidaira|Auberge du terminus de bus de Tatamidaira|畳平バスターミナルの宿",
        1500, 118,
      ),
      prop(
        "Norikura Kogen Onsen Inn|Posada termal de Norikura Kogen|Auberge thermale de Norikura Kogen|乗鞍高原温泉旅館",
        820, 64,
      ),
    ],
  ),

  yakedake: city(
    "Mt. Yake|Monte Yake|Mont Yake|焼岳",
    137.5830, 36.2270, "kitaalps", "cone_volcano", "kamikochi_valley", "r",
    "The active volcano whose 1915 eruption created Kamikochi's famous pond" +
      "|El volcán activo cuya erupción de 1915 creó el célebre estanque de Kamikochi" +
      "|Le volcan actif dont l'éruption de 1915 créa le célèbre étang de Kamikochi" +
      "|1915年の噴火で上高地の名所・大正池を生んだ活火山",
    "Yake-dake is one of the few genuinely active volcanoes in the Northern Alps, still venting steam from vents near its summit. Its 1915 eruption sent debris into the Azusa River and dammed it overnight, creating Taisho Pond, the reflecting pool that has since become one of the most photographed views in Kamikochi." +
      "|El Yake-dake es uno de los pocos volcanes genuinamente activos de los Alpes Septentrionales, y aún exhala vapor de las fumarolas cerca de su cima. Su erupción de 1915 arrojó escombros al río Azusa y lo represó de la noche a la mañana, creando el estanque Taisho, el espejo de agua que desde entonces se ha convertido en una de las vistas más fotografiadas de Kamikochi." +
      "|Le Yake-dake est l'un des rares volcans véritablement actifs des Alpes du Nord, dégageant encore de la vapeur par des évents près de son sommet. Son éruption de 1915 projeta des débris dans la rivière Azusa et l'endigua en une nuit, créant l'étang Taisho, ce miroir d'eau devenu depuis l'une des vues les plus photographiées de Kamikochi." +
      "|焼岳は北アルプスのなかでも数少ない、今なお活発な火山の一つで、山頂近くの噴気孔からは今も煙が上がる。1915年の噴火では土砂が梓川に流れ込み一夜にして川をせき止め、上高地でもっとも撮影される景観の一つとなった大正池を生んだ。",
    [
      prop(
        "Taisho Pond Lakeside Inn|Posada junto al estanque Taisho|Auberge au bord de l'étang Taisho|大正池畔の宿",
        1450, 114,
      ),
      prop(
        "Nakao Onsen Inn|Posada termal de Nakao|Auberge thermale de Nakao|中の湯温泉旅館",
        1050, 82,
      ),
    ],
  ),

  kasagatake: city(
    "Mt. Kasa|Monte Kasa|Mont Kasa|笠ヶ岳",
    137.5590, 36.2880, "kitaalps", "cone_volcano", "kamikochi_valley", "l",
    "A hat-shaped peak first climbed by the same monk who later opened Yarigatake" +
      "|Un pico con forma de sombrero, escalado por primera vez por el mismo monje que luego abrió el Yarigatake" +
      "|Un sommet en forme de chapeau, gravi pour la première fois par le même moine qui ouvrit ensuite le Yarigatake" +
      "|笠を伏せたような山容。のちに槍ヶ岳を開山した僧が最初に登った山",
    "Seen from Kamikochi, Kasa-ga-take's broad conical shape resembles an inverted sedge hat, or kasa, which gives the mountain its name. The priest Banryu, who is remembered for opening Yari-ga-take to climbers in 1828, made his first recorded ascent here on Kasa-ga-take five years earlier, in 1823." +
      "|Visto desde Kamikochi, el amplio perfil cónico del Kasa-ga-take recuerda a un sombrero de juncos invertido, o kasa, lo que da nombre a la montaña. El monje Banryu, recordado por abrir el Yari-ga-take a los alpinistas en 1828, realizó su primera ascensión registrada aquí, en el Kasa-ga-take, cinco años antes, en 1823." +
      "|Vu depuis Kamikochi, le large profil conique du Kasa-ga-take évoque un chapeau de jonc renversé, ou kasa, d'où le nom de la montagne. Le moine Banryu, dont on se souvient pour avoir ouvert le Yari-ga-take aux alpinistes en 1828, fit ici, sur le Kasa-ga-take, sa première ascension connue cinq ans plus tôt, en 1823." +
      "|上高地から見ると、笠ヶ岳のなだらかな円錐形は伏せた笠のように見え、それがそのまま山の名になった。1828年に槍ヶ岳を開山したことで知られる播隆上人は、その5年前の1823年、まずこの笠ヶ岳に記録に残る初登頂を果たしている。",
    [
      prop(
        "Kasagatake Sanso Lodge|Refugio Kasagatake Sanso|Refuge Kasagatake Sanso|笠ヶ岳山荘",
        1250, 98,
      ),
      prop(
        "Shin-Hotaka Ropeway Station House|Estación del teleférico de Shin-Hotaka|Gare du téléphérique de Shin-Hotaka|新穂高ロープウェー駅舎",
        1850, 144,
      ),
    ],
  ),

  // ===================================================================
  // chuo_minami_alps (18) — 中央・南アルプスと中部の高原
  // ===================================================================

  kisokomagatake: city(
    "Mt. Kiso-Koma|Monte Kiso-Koma|Mont Kiso-Koma|木曽駒ヶ岳",
    137.8060, 35.7890, "chuo_minami_alps", "ridge_snow", "minamialps_rock", "l",
    "Reached by Japan's highest ropeway, into a glacial cirque" +
      "|Se llega con el teleférico más alto de Japón, hasta un circo glaciar" +
      "|Accessible par le téléphérique le plus élevé du Japon, jusqu'à un cirque glaciaire" +
      "|日本一標高の高いロープウェイで、氷河期のカールへ",
    "The Komagatake Ropeway climbs to Senjojiki Cirque at nearly 2,600 metres, the highest station of any ropeway in Japan, turning what was once a multi-day approach into a short walk from the cable car to the summit ridge. The cirque's bowl shape, scooped from the mountain by glacial ice during the last ice age, is now one of the most visited high-altitude viewpoints in the country." +
      "|El teleférico de Komagatake sube hasta el circo de Senjojiki, a casi 2.600 metros, la estación más alta de cualquier teleférico de Japón, convirtiendo lo que antes era una aproximación de varios días en un corto paseo desde el teleférico hasta la cresta cumbre. La forma de cuenco del circo, excavada en la montaña por el hielo glaciar durante la última edad de hielo, es hoy uno de los miradores de alta montaña más visitados del país." +
      "|Le téléphérique de Komagatake grimpe jusqu'au cirque de Senjojiki, à près de 2 600 mètres, la gare la plus élevée de tous les téléphériques du Japon, transformant ce qui fut jadis une approche de plusieurs jours en une courte marche depuis le téléphérique jusqu'à la crête sommitale. La forme en cuvette du cirque, creusée dans la montagne par la glace glaciaire lors de la dernière période glaciaire, est aujourd'hui l'un des points de vue de haute montagne les plus visités du pays." +
      "|駒ヶ岳ロープウェイは標高2600m近い千畳敷カールまで登り、日本のロープウェイとしては最高所の駅を持つ。かつて複数日を要した行程が、山頂稜線までの短い歩きで済むようになった。最終氷期に氷河がえぐったお椀型のカール地形は、今では国内でも屈指の人気を誇る高所の展望地となっている。",
    [
      prop(
        "Senjojiki Ropeway Station House|Estación del teleférico de Senjojiki|Gare du téléphérique de Senjojiki|千畳敷ロープウェー駅舎",
        1900, 148,
      ),
      prop(
        "Komagatake Chojo Sanso Lodge|Refugio de la cima Komagatake Chojo|Refuge du sommet Komagatake Chojo|駒ヶ岳頂上山荘",
        1200, 94,
      ),
    ],
  ),

  utsugidake: city(
    "Mt. Utsugi|Monte Utsugi|Mont Utsugi|空木岳",
    137.8150, 35.7160, "chuo_minami_alps", "granite_tower", "minamialps_rock", "r",
    "Named for a white-flowered shrub, with a summit of pale weathered sand" +
      "|Con nombre de un arbusto de flor blanca, y una cima de arena pálida y erosionada" +
      "|Nommé d'après un arbuste à fleurs blanches, avec un sommet de sable pâle érodé" +
      "|白い花を咲かせる低木にちなむ名を持ち、頂上は風化した白砂に覆われる",
    "Utsugi-dake takes its name from utsugi, or deutzia, a shrub whose white blossoms cover its lower slopes in early summer. Near the summit, decomposed granite has weathered into a fine pale sand that gives the final approach a bright, almost snow-like appearance even in the height of summer." +
      "|El Utsugi-dake toma su nombre del utsugi, o deutzia, un arbusto cuyas flores blancas cubren sus laderas bajas a principios de verano. Cerca de la cima, el granito descompuesto se ha erosionado en una fina arena pálida que da a la aproximación final un aspecto luminoso, casi nevado, incluso en pleno verano." +
      "|L'Utsugi-dake tire son nom de l'utsugi, ou deutzia, un arbuste dont les fleurs blanches couvrent ses pentes basses au début de l'été. Près du sommet, le granit décomposé s'est érodé en un sable pâle et fin qui donne à l'approche finale un aspect lumineux, presque enneigé, même au cœur de l'été." +
      "|空木岳の名は、初夏に山麓を白い花で覆うウツギ(空木)という低木にちなむ。山頂近くでは風化した花崗岩が細かく白い砂状になっており、真夏でも最後の登りはまるで雪が積もっているかのような明るい眺めになる。",
    [
      prop(
        "Utsugidake Sanso Lodge|Refugio Utsugidake Sanso|Refuge Utsugidake Sanso|木曽殿山荘",
        1050, 82,
      ),
      prop(
        "Komagane Trailhead Inn|Posada del sendero de Komagane|Auberge du départ de Komagane|駒ヶ根登山口の宿",
        560, 44,
      ),
    ],
  ),

  enasan: city(
    "Mt. Ena|Monte Ena|Mont Ena|恵那山",
    137.6000, 35.4480, "chuo_minami_alps", "domepeak", "chichibu_forest", "l",
    "A heavily forested summit with almost no view, tied to a legend of imperial birth" +
      "|Una cima densamente boscosa con apenas vistas, ligada a una leyenda de nacimiento imperial" +
      "|Un sommet densément boisé offrant presque aucune vue, lié à une légende de naissance impériale" +
      "|眺望に乏しいほど深い森に覆われ、皇統の誕生伝説にゆかりある山",
    "Unlike most peaks in the hundred, Ena-san's broad summit is so thickly forested that the view from the top is limited, a trait that surprises hikers expecting the open panoramas typical of the nearby Southern Alps. Local legend links its name to 'ena,' the afterbirth, said to have been buried here following the birth of the semi-legendary Empress Jingu, though the story is passed down as legend rather than confirmed history." +
      "|A diferencia de la mayoría de los picos de las cien, la amplia cima del Ena-san está tan densamente arbolada que la vista desde arriba es limitada, un rasgo que sorprende a quienes esperan los panoramas abiertos típicos de los cercanos Alpes Meridionales. La leyenda local vincula su nombre a 'ena', la placenta, que se dice enterrada aquí tras el nacimiento de la semilegendaria emperatriz Jingu, aunque la historia se transmite como leyenda y no como hecho confirmado." +
      "|Contrairement à la plupart des sommets des cent, le vaste faîte de l'Ena-san est si densément boisé que la vue depuis le sommet est limitée, un trait qui surprend les randonneurs s'attendant aux panoramas dégagés typiques des Alpes du Sud voisines. La légende locale relie son nom à « ena », le placenta, dit enterré ici après la naissance de la semi-légendaire impératrice Jingu, bien que l'histoire se transmette comme légende plutôt que comme fait avéré." +
      "|百名山の多くと違い、恵那山の広い山頂は深い森に覆われ、頂上からの眺めは限られている。近隣の南アルプスに見られるような開けた展望を期待する登山者には意外に映る。「胞衣(えな)」、すなわち半ば伝説上の神功皇后の出産の後産がここに埋められたという言い伝えが名の由来とされるが、史実としてではなく伝承として伝わっている。",
    [
      prop(
        "Enasan Sanso Lodge|Refugio Enasan Sanso|Refuge Enasan Sanso|恵那山避難小屋",
        260, 20,
      ),
      prop(
        "Nakatsugawa Trailhead Inn|Posada del sendero de Nakatsugawa|Auberge du départ de Nakatsugawa|中津川登山口の宿",
        480, 38,
      ),
    ],
  ),

  kaikomagatake: city(
    "Mt. Kai-Koma|Monte Kai-Koma|Mont Kai-Koma|甲斐駒ヶ岳",
    138.2330, 35.7560, "chuo_minami_alps", "spire", "minamialps_rock", "r",
    "A white granite peak that looks snow-capped even in midsummer" +
      "|Un pico de granito blanco que parece nevado incluso en pleno verano" +
      "|Un sommet de granit blanc qui semble enneigé même au cœur de l'été" +
      "|真夏でも雪をかぶって見える、白い花崗岩の峰",
    "Kai-Koma-ga-take's pale, almost white granite catches the light so strongly that the peak appears snow-capped from a distance even in the height of summer, a striking sight above the forested valleys below. Shugendo ascetics have climbed it as a training peak since the Edo period, and the deep gorge of Kurokawa on its flank remains a serious technical route reserved for experienced climbers." +
      "|El granito pálido, casi blanco, del Kai-Koma-ga-take capta tanto la luz que el pico parece nevado desde lejos incluso en pleno verano, una vista llamativa sobre los valles boscosos de abajo. Los ascetas shugendo lo han escalado como montaña de entrenamiento desde el periodo Edo, y el profundo desfiladero de Kurokawa en su flanco sigue siendo una ruta técnica seria reservada a alpinistas experimentados." +
      "|Le granit pâle, presque blanc, du Kai-Koma-ga-take capte si fortement la lumière que le sommet paraît enneigé de loin même au cœur de l'été, un spectacle saisissant au-dessus des vallées boisées en contrebas. Des ascètes shugendo le gravissent comme montagne d'entraînement depuis l'époque d'Edo, et la gorge profonde de Kurokawa sur son flanc reste un itinéraire technique sérieux réservé aux alpinistes expérimentés." +
      "|甲斐駒ヶ岳の淡く白に近い花崗岩は光を強く反射し、真夏でも遠目には雪をかぶっているように見える、麓の森の谷から仰ぐと印象的な姿である。江戸時代から修験者が修行の山として登り、山腹の黒戸沢の深い谷は今も経験者向けの本格的な岩登りルートとして残る。",
    [
      prop(
        "Kurokawa Sanso Lodge|Refugio Kurokawa Sanso|Refuge Kurokawa Sanso|駒津峰の小屋",
        1150, 90,
      ),
      prop(
        "Hayakawa Onsen Inn|Posada termal de Hayakawa|Auberge thermale de Hayakawa|早川尾根温泉旅館",
        780, 61,
      ),
    ],
  ),

  senjogatake: city(
    "Mt. Senjō|Monte Senjō|Mont Senjō|仙丈ヶ岳",
    138.1920, 35.7120, "chuo_minami_alps", "ridge_snow", "minamialps_rock", "l",
    "The 'Queen of the Southern Alps,' ringed by three broad cirques" +
      "|La 'Reina de los Alpes Meridionales', rodeada de tres amplios circos" +
      "|La « Reine des Alpes du Sud », ceinte de trois vastes cirques" +
      "|「南アルプスの女王」。三つの大きなカールに囲まれる",
    "Where nearby Kai-Koma-ga-take is nicknamed the 'King of the Southern Alps' for its sharp white granite, Senjo-ga-take earns the title 'Queen' for its gentler, rounded profile, ringed by three large glacial cirques on its northern and eastern faces. The broad summit offers one of the widest panoramic views in the range, taking in Kai-Koma, Kita-dake and Fuji-san from a single point." +
      "|Mientras el cercano Kai-Koma-ga-take es apodado 'Rey de los Alpes Meridionales' por su afilado granito blanco, el Senjo-ga-take gana el título de 'Reina' por su perfil más suave y redondeado, rodeado de tres grandes circos glaciares en sus caras norte y este. La amplia cima ofrece una de las vistas panorámicas más extensas de la cordillera, abarcando el Kai-Koma, el Kita-dake y el Fuji-san desde un solo punto." +
      "|Alors que le proche Kai-Koma-ga-take est surnommé le « Roi des Alpes du Sud » pour son granit blanc acéré, le Senjo-ga-take mérite le titre de « Reine » pour son profil plus doux et arrondi, ceint de trois grands cirques glaciaires sur ses faces nord et est. Le vaste sommet offre l'une des vues panoramiques les plus étendues du massif, embrassant le Kai-Koma, le Kita-dake et le Fuji-san depuis un seul point." +
      "|近くの甲斐駒ヶ岳が鋭い白い花崗岩から「南アルプスの王」と呼ばれるのに対し、仙丈ヶ岳はなだらかで丸みを帯びた姿から「女王」の名を持つ。北面・東面には三つの大きな氷河期のカールが並ぶ。広い山頂からは甲斐駒・北岳・富士山までを一望でき、山域でも屈指の眺望とされる。",
    [
      prop(
        "Senjogatake Sanso Lodge|Refugio Senjogatake Sanso|Refuge Senjogatake Sanso|仙丈小屋",
        1150, 90,
      ),
      prop(
        "Kitazawa Toge Lodge|Refugio del paso Kitazawa|Auberge du col de Kitazawa|北沢峠の小屋",
        980, 76,
      ),
    ],
  ),

  hoozan: city(
    "Mt. Hōō|Monte Hōō|Mont Hōō|鳳凰山",
    138.3390, 35.7000, "chuo_minami_alps", "granite_tower", "minamialps_rock", "r",
    "A phoenix-named ridge marked by a needle-thin granite spire" +
      "|Una cresta con nombre de fénix señalada por una fina aguja de granito" +
      "|Une crête nommée d'après le phénix, marquée par une fine aiguille de granit" +
      "|フェニックスの名を持つ稜線に、針のような花崗岩の岩塔が立つ",
    "The ridge of Ho-o-zan, meaning 'phoenix mountain,' is capped at its Jizo-dake summit by Oberisuku, a granite spire that rises like a stone needle above the surrounding rock, visible for kilometres as a landmark of the range. The pale sand eroded from its granite pairs with dark pine forest below to give the mountain a striking two-tone appearance from a distance." +
      "|La cresta del Ho-o-zan, 'montaña fénix', culmina en su cima Jizo-dake con el Oberisuku, una aguja de granito que se alza como una fina lanza de piedra sobre la roca circundante, visible a kilómetros como hito de la cordillera. La arena pálida erosionada de su granito contrasta con el oscuro bosque de pinos de abajo, dando a la montaña un llamativo aspecto bicolor desde lejos." +
      "|La crête du Ho-o-zan, « montagne du phénix », se termine à son sommet Jizo-dake par l'Oberisuku, une aiguille de granit qui s'élève comme une fine lance de pierre au-dessus du rocher environnant, visible à des kilomètres comme repère du massif. Le sable pâle érodé de son granit contraste avec la sombre forêt de pins en contrebas, donnant à la montagne un saisissant aspect bicolore vu de loin." +
      "|「鳳凰山」と呼ばれるこの稜線は、地蔵岳の山頂にオベリスクと呼ばれる針のような花崗岩の塔を戴き、周囲の岩から突き出たその姿は数キロ先からも山域の目印として見える。花崗岩が風化した白い砂と、その下に広がる暗い針葉樹林の対比が、遠目にも鮮やかな二色の姿をつくる。",
    [
      prop(
        "Ryokamitoge Sanso Lodge|Refugio del paso Ryokamitoge|Refuge du col de Ryokamitoge|燕頭山の小屋",
        980, 76,
      ),
      prop(
        "Aoki Kosen Lodge|Refugio Aoki Kosen|Refuge Aoki Kosen|青木鉱泉旅館",
        680, 53,
      ),
    ],
  ),

  kitadake: city(
    "Mt. Kita|Monte Kita|Mont Kita|北岳",
    138.2380, 35.6730, "chuo_minami_alps", "ridge_snow", "minamialps_rock", "l",
    "Japan's second-highest peak, home to a flower found nowhere else" +
      "|El segundo pico más alto de Japón, hogar de una flor que no crece en ningún otro lugar" +
      "|Le deuxième plus haut sommet du Japon, refuge d'une fleur introuvable ailleurs" +
      "|日本第2位の高峰。ここにしか咲かない花が自生する",
    "At 3,193 metres, Kita-dake is Japan's second-highest mountain after Fuji-san, and its upper slopes are the only place on Earth where the alpine flower Kitadake-so grows wild. The lodge near its summit, Kitadake Sanso, sits at one of the highest elevations of any staffed mountain hut in the country." +
      "|Con 3.193 metros, el Kita-dake es la segunda montaña más alta de Japón tras el Fuji-san, y sus laderas altas son el único lugar del planeta donde crece silvestre la flor alpina Kitadake-so. El refugio cercano a su cima, Kitadake Sanso, se halla a una de las mayores altitudes de cualquier refugio de montaña con personal del país." +
      "|Avec 3 193 mètres, le Kita-dake est la deuxième plus haute montagne du Japon après le Fuji-san, et ses pentes hautes sont le seul endroit au monde où pousse à l'état sauvage la fleur alpine Kitadake-so. Le refuge près de son sommet, le Kitadake Sanso, se trouve à l'une des plus hautes altitudes parmi les refuges de montagne gardés du pays." +
      "|標高3193m、北岳は富士山に次ぐ日本第2位の高峰で、その上部斜面は高山植物キタダケソウが野生で育つ地球上唯一の場所である。山頂近くの北岳山荘は、国内で人が常駐する山小屋としては最高所級に位置する。",
    [
      prop(
        "Kitadake Sanso Lodge|Refugio Kitadake Sanso|Refuge Kitadake Sanso|北岳山荘",
        1850, 144,
      ),
      prop(
        "Hirogawara Trailhead Inn|Posada del sendero de Hirogawara|Auberge du départ de Hirogawara|広河原登山口の宿",
        980, 76,
      ),
    ],
  ),

  ainodake: city(
    "Mt. Ai-no|Monte Ai-no|Mont Ai-no|間ノ岳",
    138.2260, 35.6450, "chuo_minami_alps", "ridge_snow", "minamialps_rock", "r",
    "The 'mountain in between,' tied for Japan's third-highest summit" +
      "|La 'montaña de en medio', empatada como tercera cima más alta de Japón" +
      "|La « montagne intermédiaire », à égalité pour le troisième sommet le plus haut du Japon" +
      "|「間の山」の意。日本第3位タイの高峰",
    "Ai-no-dake's name simply means 'the mountain in between,' describing its position on the ridge between Kita-dake and Shiomi-dake rather than any feature of its own. At 3,190 metres it ties with Oku-hotaka-dake for Japan's third-highest peak, though its broad, gentle summit draws far less attention than its dramatic neighbours." +
      "|El nombre Ai-no-dake significa simplemente 'la montaña de en medio', y describe su posición en la cresta entre el Kita-dake y el Shiomi-dake, más que ningún rasgo propio. Con 3.190 metros, empata con el Oku-hotaka-dake como tercer pico más alto de Japón, aunque su amplia y suave cima atrae mucha menos atención que sus espectaculares vecinos." +
      "|Le nom Ai-no-dake signifie simplement « la montagne du milieu », décrivant sa position sur la crête entre le Kita-dake et le Shiomi-dake plutôt qu'une caractéristique propre. Avec 3 190 mètres, il est à égalité avec l'Oku-hotaka-dake pour le troisième sommet le plus élevé du Japon, bien que son large sommet doux attire bien moins l'attention que ses spectaculaires voisins." +
      "|間ノ岳という名は、それ自体の特徴ではなく、北岳と塩見岳のあいだの稜線に位置することをそのまま表す。標高3190mは奥穂高岳と並び日本第3位タイだが、その広くなだらかな山頂は、劇的な姿の隣人たちに比べて注目されることは少ない。",
    [
      prop(
        "Nōtori Sanso Lodge|Refugio Nōtori Sanso|Refuge Nōtori Sanso|農鳥小屋",
        980, 76,
      ),
      prop(
        "Ai-no-dake Ridge Rest Hut|Refugio de descanso de la cresta Ai-no-dake|Refuge de repos de la crête Ai-no-dake|間ノ岳稜線の避難小屋",
        260, 20,
      ),
    ],
  ),

  shiomidake: city(
    "Mt. Shiomi|Monte Shiomi|Mont Shiomi|塩見岳",
    138.1980, 35.5790, "chuo_minami_alps", "spire", "minamialps_rock", "l",
    "The 'salt-viewing peak,' once a landmark for inland salt traders" +
      "|El 'pico que ve la sal', antaño hito para los comerciantes de sal del interior" +
      "|Le « pic qui voit le sel », jadis un repère pour les marchands de sel de l'intérieur" +
      "|内陸の塩の道を導いた目印とされる、「塩見」の名を持つ峰",
    "Shiomi-dake's name is traditionally explained by its role as a landmark for inland salt traders, who are said to have used its distinctive twin-humped silhouette to orient themselves while carrying salt from the coast into the mountains along old trade routes. Its double summit, Higashi-Shiomi and Nishi-Shiomi, gives the peak a recognisable outline from across much of the Southern Alps." +
      "|El nombre Shiomi-dake se explica tradicionalmente por su papel como hito para los comerciantes de sal del interior, que se dice usaban su silueta característica de doble joroba para orientarse mientras transportaban sal desde la costa hacia las montañas por antiguas rutas comerciales. Su doble cima, Higashi-Shiomi y Nishi-Shiomi, da al pico un contorno reconocible desde buena parte de los Alpes Meridionales." +
      "|Le nom Shiomi-dake s'explique traditionnellement par son rôle de repère pour les marchands de sel de l'intérieur, censés avoir utilisé sa silhouette caractéristique à double bosse pour s'orienter en transportant le sel depuis la côte vers les montagnes le long d'anciennes routes commerciales. Son double sommet, Higashi-Shiomi et Nishi-Shiomi, donne au pic un contour reconnaissable depuis une grande partie des Alpes du Sud." +
      "|塩見岳の名は、内陸へ塩を運んだ商人たちがその特徴的な双耳峰のシルエットを目印にしたという伝承で説明されることが多い。東塩見岳・西塩見岳からなる二つの頂は、南アルプスの広い範囲から見分けられる特徴的な輪郭をつくっている。",
    [
      prop(
        "Shiomidake Sanso Lodge|Refugio Shiomidake Sanso|Refuge Shiomidake Sanso|塩見小屋",
        980, 76,
      ),
      prop(
        "Sanpuku Toge Trail Inn|Posada del sendero del paso Sanpuku|Auberge du sentier du col de Sanpuku|三伏峠の宿",
        720, 56,
      ),
    ],
  ),

  warusawadake: city(
    "Mt. Warusawa (Arakawa)|Monte Warusawa (Arakawa)|Mont Warusawa (Arakawa)|悪沢岳(荒川岳)",
    138.1350, 35.5070, "chuo_minami_alps", "ridge_snow", "minamialps_rock", "r",
    "Shizuoka prefecture's highest point, named for a difficult ravine" +
      "|El punto más alto de la prefectura de Shizuoka, con nombre de barranco difícil" +
      "|Le point culminant de la préfecture de Shizuoka, nommé d'après un ravin difficile" +
      "|静岡県最高峰。険しい沢の名を持つ",
    "At 3,141 metres, Warusawa-dake, also known as Arakawa-dake, is the highest point in Shizuoka prefecture, part of a three-summit massif along the main Southern Alps ridge. Its name, meaning roughly 'bad ravine,' reflects the difficulty of the approach that early climbers faced from the valley below before the current ridge trail was established." +
      "|Con 3.141 metros, el Warusawa-dake, también conocido como Arakawa-dake, es el punto más alto de la prefectura de Shizuoka, parte de un macizo de tres cimas a lo largo de la cresta principal de los Alpes Meridionales. Su nombre, que significa aproximadamente 'barranco malo', refleja la dificultad del acceso que enfrentaban los primeros alpinistas desde el valle antes de establecerse el actual sendero de cresta." +
      "|Avec 3 141 mètres, le Warusawa-dake, aussi appelé Arakawa-dake, est le point culminant de la préfecture de Shizuoka, faisant partie d'un massif à trois sommets le long de la crête principale des Alpes du Sud. Son nom, signifiant à peu près « mauvais ravin », reflète la difficulté de l'accès qu'affrontaient les premiers alpinistes depuis la vallée avant l'établissement de l'actuel sentier de crête." +
      "|標高3141mの悪沢岳(荒川岳とも)は静岡県最高峰で、南アルプスの主稜線上に連なる三つの頂からなる山塊の一部である。「悪い沢」を意味するその名は、現在の稜線の登山道が整備される前、麓の谷から挑んだ初期の登山者たちが直面した困難さを表している。",
    [
      prop(
        "Arakawa Sanso Lodge|Refugio Arakawa Sanso|Refuge Arakawa Sanso|荒川小屋",
        980, 76,
      ),
      prop(
        "Sengen Toge Camp Lodge|Albergue de campamento del paso Sengen|Auberge du camp du col de Sengen|千枚峠のキャンプ地の宿",
        620, 48,
      ),
    ],
  ),

  akaishidake: city(
    "Mt. Akaishi|Monte Akaishi|Mont Akaishi|赤石岳",
    138.1520, 35.4700, "chuo_minami_alps", "ridge_snow", "minamialps_rock", "l",
    "The reddish rock that gave its name to the entire Southern Alps range" +
      "|La roca rojiza que dio nombre a toda la cordillera de los Alpes Meridionales" +
      "|La roche rougeâtre qui a donné son nom à toute la chaîne des Alpes du Sud" +
      "|南アルプス全体の別名「赤石山脈」の由来となった赤みを帯びた岩",
    "Akaishi-dake takes its name from the reddish chert rock exposed on its slopes, coloured by ancient marine microorganisms compressed over millions of years, and that name was extended to the whole range, still officially called the Akaishi Mountains. Its summit lodge, one of the highest-altitude staffed huts in the Southern Alps, has operated for climbers on the long main ridge traverse for decades." +
      "|El Akaishi-dake toma su nombre de la roca de chert rojiza expuesta en sus laderas, coloreada por antiguos microorganismos marinos comprimidos durante millones de años, y ese nombre se extendió a toda la cordillera, aún llamada oficialmente Montañas Akaishi. Su refugio cumbre, uno de los más altos con personal de los Alpes Meridionales, lleva décadas atendiendo a los alpinistas de la larga travesía de la cresta principal." +
      "|L'Akaishi-dake tire son nom de la roche de chert rougeâtre exposée sur ses pentes, colorée par d'anciens micro-organismes marins comprimés sur des millions d'années, et ce nom fut étendu à toute la chaîne, encore officiellement appelée monts Akaishi. Son refuge sommital, l'un des plus hauts avec personnel des Alpes du Sud, accueille depuis des décennies les alpinistes de la longue traversée de la crête principale." +
      "|赤石岳の名は、太古の海洋微生物が数百万年かけて圧縮されてできた、斜面に露出する赤みを帯びたチャートの岩に由来し、その名は山脈全体にも広がって今も公式に「赤石山脈」と呼ばれている。山頂の小屋は南アルプスでも屈指の高所にある常駐小屋で、何十年も主稜線を縦走する登山者を受け入れてきた。",
    [
      prop(
        "Akaishidake Chojo Sanso Lodge|Refugio de la cima Akaishidake Chojo|Refuge du sommet Akaishidake Chojo|赤石岳頂上小屋",
        1050, 82,
      ),
      prop(
        "Hyakkendaira Sanso Lodge|Refugio Hyakkendaira Sanso|Refuge Hyakkendaira Sanso|百閒洞山の家",
        780, 61,
      ),
    ],
  ),

  hijiridake: city(
    "Mt. Hijiri|Monte Hijiri|Mont Hijiri|聖岳",
    138.1080, 35.4280, "chuo_minami_alps", "spire", "minamialps_rock", "r",
    "The southernmost 3,000-metre peak in Japan's main alpine ranges" +
      "|El pico de 3.000 metros más meridional de las principales cordilleras alpinas de Japón" +
      "|Le sommet de 3 000 mètres le plus méridional des principales chaînes alpines du Japon" +
      "|日本の主要な三千メートル峰群のうち最も南に位置する峰",
    "Hijiri-dake, whose name means 'sacred peak,' marks the southern end of the main Southern Alps ridge above 3,000 metres, the southernmost point in Japan's three great alpine ranges to reach that height. Beyond it to the south, the mountains drop away more gradually toward the coast, making Hijiri-dake a natural closing point for the long ridge traverses that begin far to the north." +
      "|El Hijiri-dake, cuyo nombre significa 'pico sagrado', marca el extremo sur de la cresta principal de los Alpes Meridionales por encima de los 3.000 metros, el punto más meridional de las tres grandes cordilleras alpinas de Japón en alcanzar esa altura. Más al sur, las montañas descienden más gradualmente hacia la costa, lo que convierte al Hijiri-dake en un cierre natural de las largas travesías de cresta que comienzan muy al norte." +
      "|Le Hijiri-dake, dont le nom signifie « pic sacré », marque l'extrémité sud de la crête principale des Alpes du Sud au-dessus de 3 000 mètres, le point le plus méridional des trois grandes chaînes alpines du Japon à atteindre cette altitude. Au-delà, vers le sud, les montagnes redescendent plus graduellement vers la côte, faisant du Hijiri-dake un point de clôture naturel pour les longues traversées de crête qui débutent bien plus au nord." +
      "|「聖岳」の名を持つこの山は、標高3000mを超える南アルプス主稜線の南端にあたり、日本の三大山岳地帯のうちこの高さに達する最南の地点である。そこから南は山並みがより緩やかに海へと下っていくため、聖岳は遥か北から続く長い縦走路の自然な締めくくりとなっている。",
    [
      prop(
        "Hijiri Hut|Refugio Hijiri|Refuge Hijiri|聖平小屋",
        860, 67,
      ),
      prop(
        "Ikawa Onsen Inn|Posada termal de Ikawa|Auberge thermale d'Ikawa|井川温泉旅館",
        640, 50,
      ),
    ],
  ),

  tekaridake: city(
    "Mt. Tekari|Monte Tekari|Mont Tekari|光岳",
    137.9650, 35.3630, "chuo_minami_alps", "domepeak", "chichibu_forest", "l",
    "A shining rock outcrop that also marks a boundary of subalpine forest" +
      "|Un afloramiento rocoso resplandeciente que también marca un límite del bosque subalpino" +
      "|Un affleurement rocheux étincelant qui marque aussi une limite de la forêt subalpine" +
      "|光る岩「テカリ石」を持ち、亜高山性針葉樹林の分布限界ともされる",
    "Tekari-dake's name comes from Tekari-ishi, a pale limestone outcrop near the summit that catches sunlight and can be seen shining from valleys far below. Botanists also mark it as roughly the southern limit of Japan's subalpine Maries' fir forest, making the mountain a real ecological boundary as well as the southernmost of the hundred in the main Southern Alps chain." +
      "|El nombre Tekari-dake viene de Tekari-ishi, un afloramiento calcáreo pálido cerca de la cima que capta la luz solar y puede verse brillar desde valles muy alejados. Los botánicos también lo señalan como el límite meridional aproximado del bosque subalpino de abeto de Maries de Japón, lo que convierte a la montaña en una auténtica frontera ecológica además de la más meridional de las cien en la cadena principal de los Alpes del Sur." +
      "|Le nom Tekari-dake vient du Tekari-ishi, un affleurement calcaire pâle près du sommet qui capte la lumière du soleil et peut être vu briller depuis des vallées bien plus bas. Les botanistes le désignent aussi comme la limite méridionale approximative de la forêt subalpine de sapin de Maries du Japon, faisant de la montagne une véritable frontière écologique en plus d'être la plus méridionale des cent dans la chaîne principale des Alpes du Sud." +
      "|光岳の名は、山頂近くにあるテカリ石という淡色の石灰岩の露頭が日差しを受けて輝き、遥か下の谷からも光って見えることに由来する。植物学者はこの山を日本の亜高山帯オオシラビソ林のおおよその南限とも位置づけており、南アルプス主脈における百名山最南の峰であると同時に、実際の生態学的な境界でもある。",
    [
      prop(
        "Tekaridake Hut|Refugio Tekaridake|Refuge Tekaridake|光岳小屋",
        780, 61,
      ),
      prop(
        "Yanase Trailhead Inn|Posada del sendero de Yanase|Auberge du départ de Yanase|易老渡登山口の宿",
        480, 38,
      ),
    ],
  ),

  ontakesan: city(
    "Mt. Ontake|Monte Ontake|Mont Ontake|御嶽山",
    137.4805, 35.8931, "chuo_minami_alps", "torii_peak", "minamialps_rock", "r",
    "A major pilgrimage volcano climbed by white-robed devotees since the 18th century" +
      "|Un gran volcán de peregrinación, escalado por devotos vestidos de blanco desde el siglo XVIII" +
      "|Un grand volcan de pèlerinage gravi par des fidèles en robe blanche depuis le XVIIIe siècle" +
      "|18世紀以来、白装束の信徒が登り続ける、修験の一大霊山",
    "Ontake-san has been climbed as a pilgrimage mountain since the practice opened to ordinary worshippers in the late 18th century, and Ontake-ko confraternities of white-robed pilgrims from across Japan still make the ascent, chanting as they go. As an active volcano, it remains under continuous monitoring, and access to the summit area is periodically restricted or closed depending on the alert level in effect." +
      "|El Ontake-san se escala como montaña de peregrinación desde que la práctica se abrió a los devotos comunes a finales del siglo XVIII, y las cofradías Ontake-ko de peregrinos vestidos de blanco de todo Japón aún hacen la ascensión, cantando mientras suben. Como volcán activo, permanece bajo vigilancia continua, y el acceso a la zona de la cima se restringe o cierra periódicamente según el nivel de alerta vigente." +
      "|L'Ontake-san est gravi comme montagne de pèlerinage depuis que la pratique s'est ouverte aux fidèles ordinaires à la fin du XVIIIe siècle, et des confréries Ontake-ko de pèlerins en robe blanche venus de tout le Japon font encore l'ascension en psalmodiant. Volcan actif, il reste sous surveillance continue, et l'accès à la zone sommitale est périodiquement restreint ou fermé selon le niveau d'alerte en vigueur." +
      "|御嶽山は18世紀後半に一般の信者にも登拝が開かれて以来、修行の山として登られ続けてきた。白装束の御嶽講の一行は今も各地から訪れ、唱えごとをしながら登る。活火山であるため常時観測が続けられており、その時々の警戒レベルに応じて山頂付近への立ち入りが制限・禁止されることがある。",
    [
      prop(
        "Ontake Shrine Lodge|Albergue del santuario Ontake|Auberge du sanctuaire Ontake|御嶽神社の宿坊",
        620, 48,
      ),
      prop(
        "Tanohara Trailhead Inn|Posada del sendero de Tanohara|Auberge du départ de Tanohara|田の原登山口の宿",
        480, 38,
      ),
    ],
  ),

  utsukushigahara: city(
    "Utsukushigahara Plateau|Meseta de Utsukushigahara|Plateau d'Utsukushigahara|美ヶ原",
    138.1000, 36.2330, "chuo_minami_alps", "grasspeak", "highland_meadow", "l",
    "A grazing plateau that doubles as an open-air sculpture museum" +
      "|Una meseta de pastoreo que funciona a la vez como museo de escultura al aire libre" +
      "|Un plateau de pâturage qui fait aussi office de musée de sculpture en plein air" +
      "|放牧地でありながら野外彫刻美術館でもある高原",
    "Utsukushigahara, meaning 'beautiful meadow,' is a broad grassy plateau where cattle have grazed for generations, its open horizon unusual among the hundred's more dramatic peaks. Since 1981 it has doubled as the Utsukushi-ga-hara Open-Air Museum, with contemporary sculpture placed directly among the pastures for visitors to walk between as they cross the highland." +
      "|Utsukushigahara, 'pradera hermosa', es una amplia meseta cubierta de hierba donde el ganado ha pastado durante generaciones, con un horizonte abierto poco común entre los picos más espectaculares de las cien. Desde 1981 funciona también como el Museo al Aire Libre de Utsukushi-ga-hara, con esculturas contemporáneas colocadas directamente entre los pastos para que los visitantes paseen entre ellas al cruzar el altiplano." +
      "|Utsukushigahara, « belle prairie », est un vaste plateau herbeux où le bétail paît depuis des générations, son horizon dégagé étant inhabituel parmi les sommets plus spectaculaires des cent. Depuis 1981, il fait aussi office de musée en plein air d'Utsukushi-ga-hara, des sculptures contemporaines étant disposées directement parmi les pâturages pour que les visiteurs s'y promènent en traversant le haut plateau." +
      "|「美しい原」を意味する美ヶ原は、何世代にもわたり牛が放牧されてきた広い草原の高原で、百名山のより劇的な峰々とは違う開けた地平線を持つ。1981年からは美ヶ原高原美術館としても機能し、現代彫刻が牧草地のただ中に置かれ、訪れる人は高原を横切りながらその間を歩くことができる。",
    [
      prop(
        "Utsukushigahara Highland Lodge|Albergue de las tierras altas de Utsukushigahara|Auberge des hauteurs d'Utsukushigahara|美ヶ原高原の宿",
        920, 72,
      ),
      prop(
        "Open-Air Sculpture Museum Cafe|Café del museo de escultura al aire libre|Café du musée de sculpture en plein air|野外彫刻美術館のカフェ",
        380, 30,
      ),
    ],
  ),

  kirigamine: city(
    "Kirigamine Plateau|Meseta de Kirigamine|Plateau de Kirigamine|霧ヶ峰",
    138.1830, 36.1000, "chuo_minami_alps", "grasspeak", "highland_meadow", "r",
    "A birthplace of Japanese gliding, once an imperial horse pasture" +
      "|Cuna del vuelo sin motor japonés, antaño dehesa imperial de caballos" +
      "|Un berceau du vol à voile japonais, jadis pâturage impérial de chevaux" +
      "|かつて朝廷の御料牧場、のちに日本のグライダー発祥の地となった高原",
    "Court records describe Kirigamine as an imperial horse pasture as far back as the Heian period, one of several highland grazing grounds that supplied mounts to the capital. In the 1930s its open grassy slopes and reliable updrafts made it a birthplace of Japanese gliding, and each July its fields of orange Nikko-kisuge daylilies draw crowds for a bloom that lasts only a few weeks." +
      "|Los registros de la corte describen Kirigamine como dehesa imperial de caballos ya desde el periodo Heian, una de varias zonas de pasto en altura que suministraban monturas a la capital. En los años treinta, sus abiertas laderas de hierba y sus corrientes ascendentes constantes la convirtieron en cuna del vuelo sin motor japonés, y cada julio sus campos de hemerocallis naranjas Nikko-kisuge atraen multitudes por una floración que dura solo unas semanas." +
      "|Les archives de la cour décrivent Kirigamine comme pâturage impérial de chevaux dès l'époque Heian, l'un des plusieurs terrains de pâture en altitude qui fournissaient des montures à la capitale. Dans les années 1930, ses pentes herbeuses dégagées et ses courants ascendants fiables en firent un berceau du vol à voile japonais, et chaque juillet ses champs d'hémérocalles orange Nikko-kisuge attirent les foules pour une floraison qui ne dure que quelques semaines." +
      "|朝廷の記録には、霧ヶ峰が平安時代にはすでに御料牧場として都に馬を供給していたと記されている。1930年代には開けた草原の斜面と安定した上昇気流から日本のグライダー発祥の地となり、毎年7月にはニッコウキスゲのオレンジ色の花畑がわずか数週間の見頃を目当てに大勢の人を集める。",
    [
      prop(
        "Kirigamine Highland Lodge|Albergue de las tierras altas de Kirigamine|Auberge des hauteurs de Kirigamine|霧ヶ峰高原の宿",
        780, 61,
      ),
      prop(
        "Gliding Club Guesthouse|Casa de huéspedes del club de vuelo sin motor|Gîte du club de vol à voile|滑空クラブのゲストハウス",
        420, 33,
      ),
    ],
  ),

  tateshinayama: city(
    "Mt. Tateshina|Monte Tateshina|Mont Tateshina|蓼科山",
    138.3030, 36.0980, "chuo_minami_alps", "cone_volcano", "highland_meadow", "l",
    "The 'Suwa Fuji,' its summit a broad field of boulders" +
      "|El 'Fuji de Suwa', su cima un amplio campo de rocas" +
      "|Le « Fuji de Suwa », son sommet un vaste champ de blocs rocheux" +
      "|「諏訪富士」。頂上は岩がごろごろと広がる特異な地形",
    "Seen from Lake Suwa, Tateshina-yama's symmetrical cone has earned it the nickname 'Suwa Fuji,' though unlike the real Fuji-san, its flat summit is covered not in a crater but in a wide field of loose boulders, a surprise to first-time climbers expecting a pointed top. It sits at the northern end of the Yatsugatake volcanic group, separated from the main chain by a low pass." +
      "|Visto desde el lago Suwa, el cono simétrico del Tateshina-yama le ha valido el apodo de 'Fuji de Suwa', aunque a diferencia del verdadero Fuji-san, su cima plana no está cubierta por un cráter sino por un amplio campo de rocas sueltas, una sorpresa para quienes lo escalan por primera vez esperando una cumbre puntiaguda. Se sitúa en el extremo norte del grupo volcánico de Yatsugatake, separado de la cadena principal por un paso bajo." +
      "|Vu depuis le lac Suwa, le cône symétrique du Tateshina-yama lui a valu le surnom de « Fuji de Suwa », bien qu'à la différence du véritable Fuji-san, son sommet plat ne soit pas couvert d'un cratère mais d'un vaste champ de blocs rocheux épars, une surprise pour les grimpeurs novices s'attendant à un faîte pointu. Il se situe à l'extrémité nord du groupe volcanique du Yatsugatake, séparé de la chaîne principale par un col bas." +
      "|諏訪湖から見る蓼科山の整った円錐形は「諏訪富士」の愛称で呼ばれるが、本家の富士山と違い、その平らな頂上は火口ではなく岩がごろごろと広がる特異な地形になっており、尖った頂を期待して初めて登る人を驚かせる。八ヶ岳火山群の北端に位置し、低い峠を挟んで主稜線からは切り離されている。",
    [
      prop(
        "Tateshina Sanso Lodge|Refugio Tateshina Sanso|Refuge Tateshina Sanso|蓼科山荘",
        720, 56,
      ),
      prop(
        "Tateshina Kogen Onsen Inn|Posada termal de Tateshina Kogen|Auberge thermale de Tateshina Kogen|蓼科高原温泉旅館",
        1050, 82,
      ),
    ],
  ),

  yatsugatake: city(
    "Mt. Yatsugatake|Monte Yatsugatake|Mont Yatsugatake|八ヶ岳",
    138.3700, 35.9720, "chuo_minami_alps", "spire", "minamialps_rock", "r",
    "Literally the 'eight peaks,' a climbing school above one of Japan's richest Jomon sites" +
      "|Literalmente los 'ocho picos', una escuela de escalada sobre uno de los yacimientos Jomon más ricos de Japón" +
      "|Littéralement les « huit sommets », une école d'escalade au-dessus d'un site Jomon parmi les plus riches du Japon" +
      "|文字どおり「八つの峰」。日本屈指の縄文遺跡群を見下ろす岩と氷の練習場",
    "Yatsugatake is not one peak but a chain of eight, its highest point Aka-dake reached along ridges that have served for generations as a training ground for rock and ice climbing within easy reach of Tokyo. The gentler foothills below have yielded some of Japan's richest Jomon-period archaeological finds, including the clay figurine known as the 'Jomon Venus,' unearthed nearby and later designated a National Treasure." +
      "|El Yatsugatake no es un solo pico sino una cadena de ocho, cuyo punto más alto, el Aka-dake, se alcanza por crestas que han servido durante generaciones como campo de entrenamiento de escalada en roca y hielo a poca distancia de Tokio. Las suaves estribaciones de abajo han dado algunos de los hallazgos arqueológicos del periodo Jomon más ricos de Japón, incluida la figurilla de arcilla conocida como la 'Venus Jomon', desenterrada cerca y más tarde declarada Tesoro Nacional." +
      "|Le Yatsugatake n'est pas un seul sommet mais une chaîne de huit, son point culminant, l'Aka-dake, s'atteignant par des crêtes qui servent depuis des générations de terrain d'entraînement à l'escalade rocheuse et glaciaire non loin de Tokyo. Les contreforts plus doux en contrebas ont livré certaines des découvertes archéologiques Jomon les plus riches du Japon, dont la figurine d'argile dite « Vénus Jomon », mise au jour à proximité et plus tard classée Trésor national." +
      "|八ヶ岳は一つの峰ではなく八つの峰の連なりで、最高点の赤岳へ至る稜線は、東京から気軽に通える岩と氷の登攀練習場として何世代にもわたり使われてきた。麓のなだらかな裾野からは日本屈指の縄文時代の遺物が出土しており、近くで発掘され後に国宝に指定された土偶「縄文のビーナス」もその一つである。",
    [
      prop(
        "Akadake Kosen Lodge|Refugio Akadake Kosen|Refuge Akadake Kosen|赤岳鉱泉",
        1350, 106,
      ),
      prop(
        "Yatsugatake Climbers' Inn|Posada de escaladores de Yatsugatake|Auberge des grimpeurs de Yatsugatake|八ヶ岳クライマーズインの宿",
        780, 61,
      ),
    ],
  ),

  // ===================================================================
  // 富士山・天城山 — 地方は両方とも kanto(旧 fujihakone は廃止・吸収した)
  // ===================================================================

  amagisan: city(
    "Mt. Amagi|Monte Amagi|Mont Amagi|天城山",
    138.9200, 34.9000, "kanto", "domepeak", "izu_coast", "r",
    "A forested peninsula peak long farmed for wasabi under waterfall-fed streams" +
      "|Un pico peninsular boscoso, cultivado desde antiguo con wasabi bajo arroyos alimentados por cascadas" +
      "|Un sommet péninsulaire boisé, cultivé de longue date en wasabi sous des ruisseaux nourris de cascades" +
      "|滝からの清流でわさびを育ててきた、伊豆半島の森の山",
    "Amagi-san's forested slopes catch heavy rain off the Pacific, and the clear, cold streams that result have supported wasabi cultivation in terraced beds since the Edo period, a crop that still defines the local economy. The mountain also gave its name to Kawabata Yasunari's 1926 story 'The Dancing Girl of Izu,' whose young narrator crosses the Amagi pass on foot, a route still walked by hikers today." +
      "|Las laderas boscosas del Amagi-san reciben fuertes lluvias del Pacífico, y los arroyos claros y fríos resultantes han sostenido el cultivo de wasabi en bancales desde el periodo Edo, un cultivo que aún define la economía local. La montaña también dio nombre al relato de 1926 de Kawabata Yasunari 'La bailarina de Izu', cuyo joven narrador cruza el paso de Amagi a pie, una ruta que los excursionistas aún recorren hoy." +
      "|Les pentes boisées de l'Amagi-san reçoivent de fortes pluies venues du Pacifique, et les ruisseaux clairs et froids qui en résultent soutiennent depuis l'époque d'Edo la culture du wasabi en terrasses, une culture qui définit encore l'économie locale. La montagne a aussi donné son nom au récit de 1926 de Kawabata Yasunari, « La danseuse d'Izu », dont le jeune narrateur franchit à pied le col d'Amagi, un itinéraire encore parcouru par les randonneurs aujourd'hui." +
      "|天城山の森に覆われた斜面は太平洋からの雨を大量に受け止め、そこから流れ出る冷たく澄んだ水は江戸時代から棚田状のわさび田を支え、今も地域の経済を特徴づける作物となっている。この山はまた、若い語り手が天城峠を歩いて越える川端康成の1926年の小説『伊豆の踊子』にもその名を残し、その道は今もハイカーに歩かれている。",
    [
      prop(
        "Amagi Pass Trailhead Inn|Posada del sendero del paso Amagi|Auberge du départ du col d'Amagi|天城峠登山口の宿",
        620, 48,
      ),
      prop(
        "Joren Falls Wasabi Farm Rest House|Casa de descanso del cultivo de wasabi de las cascadas Joren|Maison de repos de la ferme de wasabi des chutes de Joren|浄蓮の滝わさび農園休憩所",
        460, 36,
      ),
    ],
  ),

  // ===================================================================
  // kinkihokuriku (5) — sanjogatake は既存
  // ===================================================================

  hakusan: city(
    "Mt. Haku|Monte Haku|Mont Haku|白山",
    136.7719, 36.1544, "kinkihokuriku", "torii_peak", "hakusan_snowfield", "l",
    "One of Japan's three holiest mountains, blanketed in deep snow and alpine flowers" +
      "|Una de las tres montañas más sagradas de Japón, cubierta de nieve profunda y flores alpinas" +
      "|L'une des trois montagnes les plus sacrées du Japon, couverte de neige profonde et de fleurs alpines" +
      "|深い雪と高山植物に覆われる、日本三霊山の一つ",
    "Haku-san is counted with Fuji-san and Tate-yama among Japan's three holiest mountains, and the Buddhist monk Taicho is credited with opening it to religious climbers in 717 CE. Snow lingers so deep into summer on its slopes that the flowering season is compressed into a few intense weeks, and the peak has lent its name, meaning 'white mountain,' to Hakusan National Park and dozens of shrines across the country." +
      "|El Haku-san se cuenta junto al Fuji-san y el Tate-yama entre las tres montañas más sagradas de Japón, y se atribuye al monje budista Taicho la apertura de la montaña a los peregrinos religiosos en el año 717. La nieve persiste tan profunda hasta bien entrado el verano en sus laderas que la temporada de floración se comprime en unas pocas semanas intensas, y el pico ha dado su nombre, que significa 'montaña blanca', al Parque Nacional de Hakusan y a decenas de santuarios por todo el país." +
      "|Le Haku-san compte, avec le Fuji-san et le Tate-yama, parmi les trois montagnes les plus sacrées du Japon, et le moine bouddhiste Taicho est crédité de son ouverture aux pèlerins religieux en 717. La neige persiste si profondément jusqu'en été sur ses pentes que la saison de floraison se comprime en quelques semaines intenses, et le sommet a donné son nom, signifiant « montagne blanche », au parc national de Hakusan et à des dizaines de sanctuaires à travers le pays." +
      "|白山は富士山・立山と並ぶ日本三霊山の一つで、717年に僧・泰澄がこの山を修行の対象として開いたと伝わる。斜面には夏まで深い雪が残るため開花期はわずか数週間に凝縮され、その「白い山」を意味する名は白山国立公園や全国各地の白山神社にも受け継がれている。",
    [
      prop(
        "Murodo Hakusan Lodge|Albergue Murodo del Hakusan|Auberge Murodo du Hakusan|白山室堂",
        1150, 90,
      ),
      prop(
        "Bettodeai Trailhead Inn|Posada del sendero de Bettodeai|Auberge du départ de Bettodeai|別当出合登山口の宿",
        640, 50,
      ),
    ],
  ),

  arashimadake: city(
    "Mt. Arashima|Monte Arashima|Mont Arashima|荒島岳",
    136.4190, 35.8690, "kinkihokuriku", "grasspeak", "beech_ridge", "r",
    "Fukui prefecture's lone entry, said to be the author's tribute to his home mountain" +
      "|La única entrada de la prefectura de Fukui, tributo del autor a la montaña de su tierra" +
      "|La seule entrée de la préfecture de Fukui, hommage de l'auteur à la montagne de son pays natal" +
      "|福井県から唯一選ばれた山。著者が郷里の山への思いを込めたとされる",
    "Arashima-dake is the only one of the hundred located in Fukui prefecture, and it is often said, though Fukada himself never stated it outright, that he included this comparatively modest peak partly out of attachment to a mountain visible from his own hometown. Its beech forest is one of the more intact stands remaining in the region, having escaped much of the postwar logging that thinned nearby ranges." +
      "|El Arashima-dake es la única de las cien situada en la prefectura de Fukui, y a menudo se dice, aunque el propio Fukada nunca lo afirmó abiertamente, que incluyó este pico comparativamente modesto en parte por apego a una montaña visible desde su propia ciudad natal. Su bosque de hayas es uno de los rodales más intactos que quedan en la región, al haber escapado a buena parte de la tala de posguerra que diezmó las cadenas cercanas." +
      "|L'Arashima-dake est la seule des cent situées dans la préfecture de Fukui, et l'on dit souvent, bien que Fukada lui-même ne l'ait jamais affirmé ouvertement, qu'il inclut ce sommet relativement modeste en partie par attachement à une montagne visible depuis sa propre ville natale. Sa hêtraie est l'un des peuplements les plus intacts restant dans la région, ayant échappé à une grande partie de l'abattage d'après-guerre qui a éclairci les chaînes voisines." +
      "|荒島岳は百名山のうち福井県から選ばれた唯一の山で、深田久弥自身が明言したことはないものの、郷里から見えるこの控えめな山への愛着から選んだのではないかとしばしば語られる。そのブナ林は、戦後の伐採で近隣の山地の多くが失われるなかで比較的よく残った林の一つである。",
    [
      prop(
        "Katsuyama Trailhead Inn|Posada del sendero de Katsuyama|Auberge du départ de Katsuyama|勝山登山口の宿",
        420, 33,
      ),
      prop(
        "Arashima Beech Forest Rest House|Casa de descanso del hayedo de Arashima|Maison de repos de la hêtraie d'Arashima|荒島ブナ林休憩所",
        260, 20,
      ),
    ],
  ),

  odaigaharasan: city(
    "Mt. Odaigahara|Monte Odaigahara|Mont Odaigahara|大台ヶ原山",
    136.1080, 34.1830, "kinkihokuriku", "plateau", "shugendoforest", "l",
    "One of Japan's wettest places, a moss-draped plateau of standing dead trees" +
      "|Uno de los lugares más lluviosos de Japón, una meseta de musgo con árboles muertos en pie" +
      "|L'un des endroits les plus pluvieux du Japon, un plateau moussu aux arbres morts debout" +
      "|日本有数の多雨地帯。苔むした台地に立ち枯れの木々が並ぶ",
    "Odaigahara receives some of the heaviest rainfall recorded anywhere in Japan, and its broad summit plateau is carpeted in deep moss beneath stands of dead, silvered fir trunks, killed in the 20th century by a combination of typhoon damage and overgrazing by sika deer. Boardwalks now guide visitors across the fragile moorland to protect the moss layer that gives the plateau its otherworldly appearance." +
      "|Odaigahara recibe algunas de las lluvias más intensas registradas en Japón, y su amplia meseta cumbre está alfombrada de musgo profundo bajo troncos plateados de abetos muertos, víctimas en el siglo XX de una combinación de daños por tifones y sobrepastoreo de ciervos sika. Hoy, pasarelas guían a los visitantes por el frágil páramo para proteger la capa de musgo que da a la meseta su aspecto de otro mundo." +
      "|Odaigahara reçoit certaines des pluies les plus abondantes jamais enregistrées au Japon, et son vaste plateau sommital est tapissé d'une mousse épaisse sous des troncs de sapins morts et argentés, tués au XXe siècle par une combinaison de dégâts de typhons et de surpâturage par les cerfs sika. Des passerelles guident aujourd'hui les visiteurs à travers cette lande fragile afin de protéger la couche de mousse qui donne au plateau son aspect irréel." +
      "|大台ヶ原は日本でも記録的な多雨地帯で、広い山頂台地は深い苔に覆われ、その上には20世紀に台風被害とニホンジカの食害が重なって立ち枯れた銀色の樹幹が並ぶ。今は木道が敷かれ、この台地に幻想的な姿を与えている苔の層を守りながら訪問者を導いている。",
    [
      prop(
        "Odaigahara Visitor Lodge|Albergue de visitantes de Odaigahara|Auberge des visiteurs d'Odaigahara|大台ヶ原ビジターロッジ",
        680, 53,
      ),
      prop(
        "Higashi-Odai Trail Rest House|Casa de descanso del sendero de Higashi-Odai|Maison de repos du sentier d'Higashi-Odai|東大台休憩所",
        280, 22,
      ),
    ],
  ),

  ibukiyama: city(
    "Mt. Ibuki|Monte Ibuki|Mont Ibuki|伊吹山",
    136.4240, 35.4170, "kinkihokuriku", "grasspeak", "hakusan_snowfield", "r",
    "A herb-covered peak that once recorded Japan's deepest snowfall" +
      "|Un pico cubierto de hierbas medicinales que registró la mayor nevada jamás medida en Japón" +
      "|Un sommet couvert d'herbes médicinales qui a enregistré la plus forte chute de neige jamais mesurée au Japon" +
      "|薬草に覆われた山。日本一の積雪記録を持つ",
    "In February 1927, a weather station on Ibuki-yama recorded 11.82 metres of snow depth, still the official Japanese and world record for a single measurement decades later. In summer the mountain's limestone slopes turn green with wild medicinal herbs long gathered by local farmers, a tradition said to date back to legendary encounters between the herb-goddess of the mountain and the hero Yamato Takeru." +
      "|En febrero de 1927, una estación meteorológica del Ibuki-yama registró 11,82 metros de espesor de nieve, aún el récord oficial japonés y mundial para una sola medición décadas después. En verano, las laderas calizas de la montaña se cubren de verde con hierbas medicinales silvestres recolectadas desde antiguo por los agricultores locales, una tradición que se dice se remonta a legendarios encuentros entre la diosa de las hierbas de la montaña y el héroe Yamato Takeru." +
      "|En février 1927, une station météorologique de l'Ibuki-yama enregistra 11,82 mètres d'épaisseur de neige, toujours le record officiel japonais et mondial pour une seule mesure des décennies plus tard. En été, les pentes calcaires de la montagne se couvrent de vert grâce aux herbes médicinales sauvages récoltées de longue date par les paysans locaux, une tradition qui remonterait à de légendaires rencontres entre la déesse des herbes de la montagne et le héros Yamato Takeru." +
      "|1927年2月、伊吹山の観測所は積雪11.82mを記録し、これは数十年を経た今も日本および世界の観測記録として公式に残っている。夏には石灰岩質の斜面が野生の薬草で緑に覆われ、地元の農家が古くから採取してきた。この伝統は、山の薬草の女神と英雄・日本武尊の伝説的な出会いにまで遡るとされる。",
    [
      prop(
        "Ibukiyama Ninth Station Lodge|Albergue del noveno hito del Ibukiyama|Auberge du neuvième repère de l'Ibukiyama|伊吹山九合目の宿",
        480, 38,
      ),
      prop(
        "Herb Garden Rest House|Casa de descanso del jardín de hierbas|Maison de repos du jardin d'herbes|薬草園休憩所",
        340, 27,
      ),
    ],
  ),

  // ===================================================================
  // nishinihon (9) — miyanouradake は既存
  // ===================================================================

  daisen: city(
    "Mt. Daisen|Monte Daisen|Mont Daisen|大山",
    133.5490, 35.3000, "nishinihon", "cone_volcano", "caldera_grass", "l",
    "The 'Hoki Fuji,' Chugoku's highest peak, its north face a crumbling knife-edge" +
      "|El 'Fuji de Hoki', el pico más alto de Chugoku, con una cara norte de filo cuchillo desmoronándose" +
      "|Le « Fuji de Hoki », le plus haut sommet du Chugoku, dont la face nord est une arête de couteau qui s'effrite" +
      "|「伯耆富士」。中国地方最高峰で、北面は崩れやすい痩せ尾根",
    "Seen from the west, Daisen's symmetrical volcanic cone has earned it the nickname 'Hoki Fuji,' but the mountain's true summit ridge on its eastern side is a crumbling, unstable arete now closed to hikers, and the marked trail instead ends at a lower viewing point. As Chugoku's highest peak and the only one from that region among the hundred, it carries an outsized cultural weight for a range otherwise absent from Fukada's list." +
      "|Visto desde el oeste, el simétrico cono volcánico del Daisen le ha valido el apodo de 'Fuji de Hoki', pero la verdadera cresta cumbre de la montaña, en su lado este, es una arista inestable y desmoronándose, hoy cerrada a los excursionistas, y el sendero señalizado termina en un mirador más bajo. Como pico más alto del Chugoku y el único de esa región entre las cien, carga con un peso cultural desproporcionado para una cadena por lo demás ausente de la lista de Fukada." +
      "|Vu de l'ouest, le cône volcanique symétrique du Daisen lui a valu le surnom de « Fuji de Hoki », mais la véritable crête sommitale de la montagne, sur son flanc est, est une arête instable qui s'effrite, aujourd'hui fermée aux randonneurs, et le sentier balisé s'arrête à un point de vue plus bas. Plus haut sommet du Chugoku et seul représentant de cette région parmi les cent, il porte un poids culturel disproportionné pour une chaîne autrement absente de la liste de Fukada." +
      "|西から見た大山の左右対称の火山の姿は「伯耆富士」の愛称で呼ばれるが、東側の本当の山頂稜線は崩れやすく不安定な痩せ尾根で今は立ち入りが禁止されており、整備された登山道はより低い展望地で終わる。中国地方最高峰であり、深田久弥のリストで同地方から選ばれた唯一の山として、この山地全体を代表する大きな文化的重みを負っている。",
    [
      prop(
        "Daisenji Temple Lodge|Albergue del templo Daisenji|Auberge du temple Daisenji|大山寺の宿坊",
        620, 48,
      ),
      prop(
        "Kagamigaike Rest House|Casa de descanso de Kagamigaike|Maison de repos de Kagamigaike|鏡ヶ成休憩所",
        320, 25,
      ),
    ],
  ),

  tsurugisan: city(
    "Mt. Tsurugi (Shikoku)|Monte Tsurugi (Shikoku)|Mont Tsurugi (Shikoku)|剣山",
    134.1130, 33.8480, "nishinihon", "grasspeak", "caldera_grass", "r",
    "Shikoku's second-highest peak, said by some to hide the lost treasure of the Ark" +
      "|El segundo pico más alto de Shikoku, del que algunos dicen que oculta el tesoro perdido del Arca" +
      "|Le deuxième plus haut sommet de Shikoku, où certains disent que se cache le trésor perdu de l'Arche" +
      "|失われたアークの秘宝を隠すという説もある、四国第2位の高峰",
    "A chairlift carries most visitors to within a short walk of Tsurugi-san's grassy, rounded summit, making it one of the more accessible peaks in the hundred despite its 1,955-metre height. A persistent, unverified legend claims the mountain hides treasure connected to the Ark of the Covenant, a story with no historical support that nonetheless still draws curious visitors to its slopes." +
      "|Un telesilla lleva a la mayoría de los visitantes hasta un corto paseo de la cima herbosa y redondeada del Tsurugi-san, lo que lo convierte en uno de los picos más accesibles de las cien pese a sus 1.955 metros. Una leyenda persistente y sin verificar afirma que la montaña oculta un tesoro ligado al Arca de la Alianza, una historia sin respaldo histórico que aun así sigue atrayendo a visitantes curiosos a sus laderas." +
      "|Un télésiège conduit la plupart des visiteurs à une courte marche du sommet herbeux et arrondi du Tsurugi-san, en faisant l'un des sommets les plus accessibles parmi les cent malgré ses 1 955 mètres. Une légende persistante et non vérifiée affirme que la montagne cache un trésor lié à l'Arche d'alliance, une histoire sans fondement historique qui continue pourtant d'attirer des visiteurs curieux sur ses pentes." +
      "|剣山ではリフトが大半の観光客を、草に覆われた丸みのある山頂までわずかな徒歩圏に運んでくれるため、標高1955mながら百名山のなかでも比較的行きやすい部類に入る。この山には契約の箱(アーク)にまつわる秘宝が眠るという根強い、しかし史実の裏付けのない伝説があり、それでも好奇心を持つ人々を斜面へと引き寄せている。",
    [
      prop(
        "Tsurugisan Chairlift Station House|Estación del telesilla de Tsurugisan|Gare du télésiège de Tsurugisan|剣山リフト駅舎",
        720, 56,
      ),
      prop(
        "Minokoshi Sanso Lodge|Refugio Minokoshi Sanso|Refuge Minokoshi Sanso|見ノ越の宿",
        460, 36,
      ),
    ],
  ),

  ishizuchisan: city(
    "Mt. Ishizuchi|Monte Ishizuchi|Mont Ishizuchi|石鎚山",
    133.1140, 33.7660, "nishinihon", "spire", "caldera_grass", "l",
    "Western Japan's highest peak, its final pitch climbed hand over hand on iron chains" +
      "|El pico más alto de Japón occidental, cuyo tramo final se escala a pulso por cadenas de hierro" +
      "|Le plus haut sommet de l'ouest du Japon, dont le dernier passage se gravit à la force des bras sur des chaînes de fer" +
      "|西日本最高峰。山頂直下は鉄の鎖を頼りに登る",
    "At 1,982 metres, Ishizuchi-san is the highest peak in western Japan, and its traditional pilgrim route includes three sets of iron chains bolted to bare rock faces, which climbers still haul themselves up hand over hand as an act of religious discipline, though safer bypass trails exist for those who prefer them. The mountain has been a Shugendo training ground since at least the Nara period, and pilgrims in white climbing dress remain a common sight on its slopes each summer." +
      "|Con 1.982 metros, el Ishizuchi-san es el pico más alto de Japón occidental, y su ruta de peregrinación tradicional incluye tres tramos de cadenas de hierro fijadas a paredes de roca desnuda, que los alpinistas aún ascienden a pulso como acto de disciplina religiosa, aunque existen senderos alternativos más seguros para quienes los prefieren. La montaña ha sido terreno de entrenamiento shugendo desde al menos el periodo Nara, y los peregrinos con túnica blanca de ascensión siguen siendo habituales en sus laderas cada verano." +
      "|Avec 1 982 mètres, l'Ishizuchi-san est le plus haut sommet de l'ouest du Japon, et son itinéraire de pèlerinage traditionnel comprend trois séries de chaînes de fer fixées à la roche nue, que les grimpeurs hissent encore à la force des bras comme acte de discipline religieuse, bien que des sentiers de contournement plus sûrs existent pour qui les préfère. La montagne est un terrain d'entraînement shugendo depuis au moins l'époque de Nara, et des pèlerins en robe blanche d'ascension restent un spectacle courant sur ses pentes chaque été." +
      "|標高1982mの石鎚山は西日本最高峰で、伝統的な参詣路には裸の岩壁に打たれた三か所の鉄鎖があり、登山者は今も宗教的な修行としてそれを腕の力で登る。安全な迂回路も用意されているが、選ぶかどうかは登る人次第である。少なくとも奈良時代から修験の行場とされ、白装束の登拝者は今も毎夏その斜面でよく見かける姿である。",
    [
      prop(
        "Ishizuchi Ropeway Station House|Estación del teleférico de Ishizuchi|Gare du téléphérique d'Ishizuchi|石鎚ロープウェー駅舎",
        980, 76,
      ),
      prop(
        "Doja-toge Shrine Lodge|Albergue del santuario del paso Doja|Auberge du sanctuaire du col de Doja|土小屋の宿坊",
        560, 44,
      ),
    ],
  ),

  kujusan: city(
    "Mt. Kuju|Monte Kuju|Mont Kuju|九重山",
    131.2510, 33.0880, "nishinihon", "caldera", "caldera_grass", "r",
    "Kyushu's highest point, a volcanic group ringed by hot springs and grassland" +
      "|El punto más alto de Kyushu, un grupo volcánico rodeado de aguas termales y pastizales" +
      "|Le point culminant de Kyushu, un groupe volcanique ceint de sources chaudes et de prairies" +
      "|九州最高地点。周囲を温泉と草原に囲まれた火山群",
    "Nakadake, the highest point of the Kuju volcanic group at 1,791 metres, makes it the tallest peak on the island of Kyushu, rising above a landscape scattered with hot spring towns, including Bappu and Yufuin nearby, that draw on the same underlying volcanic heat. Grassland covers much of the group's lower slopes, kept open for centuries by grazing and seasonal controlled burns rather than forest." +
      "|El Nakadake, el punto más alto del grupo volcánico de Kuju con 1.791 metros, lo convierte en el pico más alto de la isla de Kyushu, alzándose sobre un paisaje salpicado de pueblos termales, entre ellos Beppu y Yufuin cerca de allí, que aprovechan el mismo calor volcánico subyacente. Los pastizales cubren buena parte de las laderas bajas del grupo, mantenidos abiertos durante siglos por el pastoreo y las quemas controladas estacionales en lugar del bosque." +
      "|Le Nakadake, point culminant du groupe volcanique du Kuju à 1 791 mètres, en fait le plus haut sommet de l'île de Kyushu, s'élevant au-dessus d'un paysage parsemé de villes thermales, dont Beppu et Yufuin non loin, qui puisent dans la même chaleur volcanique souterraine. Les prairies couvrent une grande partie des pentes basses du groupe, maintenues ouvertes depuis des siècles par le pâturage et les brûlis saisonniers contrôlés plutôt que par la forêt." +
      "|九重山系の最高点・中岳は標高1791mで、九州本島の最高峰でもある。周囲には別府や由布院をはじめ、同じ地下の火山熱を利用する温泉町が点在する景観が広がる。山系の下部斜面の多くは草原に覆われ、これは森林ではなく何世紀にもわたる放牧と季節ごとの野焼きによって保たれてきたものである。",
    [
      prop(
        "Hokkein-toge Sanso Lodge|Refugio Hokkein-toge Sanso|Refuge Hokkein-toge Sanso|法華院温泉山荘",
        980, 76,
      ),
      prop(
        "Chojabaru Rest House|Casa de descanso de Chojabaru|Maison de repos de Chojabaru|長者原休憩所",
        360, 28,
      ),
    ],
  ),

  asosan: city(
    "Mt. Aso|Monte Aso|Mont Aso|阿蘇山",
    131.1060, 32.8840, "nishinihon", "caldera", "caldera_grass", "l",
    "One of the world's largest calderas, still farmed and grazed by the people inside it" +
      "|Una de las mayores calderas del mundo, aún cultivada y pastoreada por la gente que vive dentro" +
      "|L'une des plus grandes caldeiras du monde, encore cultivée et pâturée par ceux qui y vivent" +
      "|世界有数の巨大カルデラ。今も内部に人が暮らし、農業と牧畜が営まれる",
    "Aso's caldera, formed by eruptions roughly 90,000 years ago, is among the largest in the world, roughly 25 kilometres across, and unlike many calderas it is not a wilderness but home to tens of thousands of people who farm and raise cattle on its floor and outer slopes. Nakadake's active crater, one of several cones rising from the caldera floor, still vents visible gas and occasionally restricts visitor access, while the surrounding grassland is maintained by an annual controlled burn, or noyaki, that has continued for centuries." +
      "|La caldera de Aso, formada por erupciones hace unos 90.000 años, se cuenta entre las mayores del mundo, con unos 25 kilómetros de diámetro, y a diferencia de muchas calderas no es una zona salvaje, sino hogar de decenas de miles de personas que cultivan y crían ganado en su fondo y laderas externas. El cráter activo del Nakadake, uno de varios conos que se alzan del fondo de la caldera, aún emite gases visibles y a veces restringe el acceso de visitantes, mientras que el pastizal circundante se mantiene con una quema controlada anual, o noyaki, que continúa desde hace siglos." +
      "|La caldeira de l'Aso, formée par des éruptions il y a environ 90 000 ans, compte parmi les plus grandes au monde, avec près de 25 kilomètres de diamètre, et contrairement à beaucoup de caldeiras, ce n'est pas un désert mais le foyer de dizaines de milliers de personnes qui cultivent et élèvent du bétail sur son fond et ses pentes extérieures. Le cratère actif du Nakadake, l'un des plusieurs cônes s'élevant du fond de la caldeira, dégage encore un gaz visible et restreint parfois l'accès des visiteurs, tandis que la prairie environnante est entretenue par un brûlis contrôlé annuel, le noyaki, qui se perpétue depuis des siècles." +
      "|約9万年前の噴火で形成された阿蘇のカルデラは世界でも最大級で、直径はおよそ25kmに及ぶ。多くのカルデラと違い、ここは荒野ではなく数万人が暮らし、その底や外側の斜面で農業や牧畜を営む生活の場である。カルデラ底からそびえるいくつもの火口の一つである中岳の活火口は今も目に見える噴煙を上げ、時に立ち入りが制限される。周囲の草原は何世紀も続く毎年恒例の野焼きによって維持されている。",
    [
      prop(
        "Asosan Crater Rim Rest House|Casa de descanso del borde del cráter del Asosan|Maison de repos du rebord du cratère de l'Asosan|阿蘇山火口縁休憩所",
        420, 33,
      ),
      prop(
        "Kusasenri Grassland Inn|Posada del pastizal de Kusasenri|Auberge de la prairie de Kusasenri|草千里の宿",
        680, 53,
      ),
    ],
  ),

  sobosan: city(
    "Mt. Sobo|Monte Sobo|Mont Sobo|祖母山",
    131.3540, 32.8280, "nishinihon", "domepeak", "caldera_grass", "r",
    "A grandmother-named peak straddling three prefectures' old-growth forest" +
      "|Un pico con nombre de abuela, a caballo entre el bosque primario de tres prefecturas" +
      "|Un sommet au nom de grand-mère, à cheval sur la forêt ancienne de trois préfectures" +
      "|「祖母」の名を持ち、三県にまたがる原生林を抱く山",
    "Sobo-san's name, meaning 'grandmother mountain,' is traditionally linked to a legend that Empress Jingu's grandmother, or an ancestral goddess, is enshrined on its summit, protecting the peak that sits at the meeting point of Oita, Miyazaki and Kumamoto prefectures. Its slopes hold some of Kyushu's most extensive old-growth forest, largely spared from logging by the mountain's steep, remote terrain." +
      "|El nombre Sobo-san, 'montaña abuela', se vincula tradicionalmente a una leyenda según la cual la abuela de la emperatriz Jingu, o una diosa ancestral, está consagrada en su cima, protegiendo el pico que se halla en el punto de encuentro de las prefecturas de Oita, Miyazaki y Kumamoto. Sus laderas albergan uno de los bosques primarios más extensos de Kyushu, en gran parte a salvo de la tala gracias al terreno escarpado y remoto de la montaña." +
      "|Le nom Sobo-san, « montagne grand-mère », est traditionnellement lié à une légende selon laquelle la grand-mère de l'impératrice Jingu, ou une déesse ancestrale, serait vénérée à son sommet, protégeant le pic situé au point de rencontre des préfectures d'Oita, Miyazaki et Kumamoto. Ses pentes abritent l'une des forêts anciennes les plus étendues de Kyushu, largement épargnée par l'abattage grâce au terrain escarpé et reculé de la montagne." +
      "|「祖母山」という名は、神功皇后の祖母、あるいは祖神がその山頂に祀られ、大分・宮崎・熊本の三県が接するこの峰を守っているという伝承に由来するとされる。その斜面は九州でも屈指の広大な原生林を抱え、険しく人を寄せ付けにくい地形のおかげで伐採を大きく免れてきた。",
    [
      prop(
        "Sobosan Sanso Lodge|Refugio Sobosan Sanso|Refuge Sobosan Sanso|祖母山九合目小屋",
        320, 25,
      ),
      prop(
        "Takachiho Gorge Inn|Posada del desfiladero de Takachiho|Auberge des gorges de Takachiho|高千穂峡の宿",
        780, 61,
      ),
    ],
  ),

  kirishimayama: city(
    "Mt. Kirishima|Monte Kirishima|Mont Kirishima|霧島山",
    130.8640, 31.9340, "nishinihon", "caldera", "kirishima_volcanic", "l",
    "A cluster of volcanic cones and crater lakes tied to Japan's creation myth" +
      "|Un conjunto de conos volcánicos y lagos de cráter ligado al mito de la creación de Japón" +
      "|Un ensemble de cônes volcaniques et de lacs de cratère lié au mythe de la création du Japon" +
      "|日本神話の天孫降臨伝説にゆかりある、火山群と火口湖の連なり",
    "Kirishima is not one peak but a chain of volcanic cones and crater lakes, and the summit of Takachiho-no-mine holds a bronze halberd, the Sakasa-hoko, said in Japanese mythology to mark where the god Ninigi-no-Mikoto descended from heaven to found the imperial line. Karakuni-dake, the group's highest point, and the still-active crater of Shinmoe-dake nearby show the range remains volcanically restless." +
      "|Kirishima no es un solo pico, sino una cadena de conos volcánicos y lagos de cráter, y la cima del Takachiho-no-mine sostiene una alabarda de bronce, el Sakasa-hoko, que según la mitología japonesa marca el lugar donde el dios Ninigi-no-Mikoto descendió del cielo para fundar la línea imperial. El Karakuni-dake, el punto más alto del grupo, y el cráter aún activo del cercano Shinmoe-dake muestran que la cordillera sigue volcánicamente inquieta." +
      "|Le Kirishima n'est pas un seul sommet mais une chaîne de cônes volcaniques et de lacs de cratère, et le sommet du Takachiho-no-mine porte une hallebarde de bronze, le Sakasa-hoko, censée marquer, selon la mythologie japonaise, l'endroit où le dieu Ninigi-no-Mikoto descendit du ciel pour fonder la lignée impériale. Le Karakuni-dake, point culminant du groupe, et le cratère toujours actif du Shinmoe-dake voisin montrent que la chaîne reste volcaniquement agitée." +
      "|霧島は一つの峰ではなく火山の連なりと火口湖群で、高千穂峰の山頂には日本神話でニニギノミコトが天から降り立ち皇統の起源となったとされる場所を示す青銅の「天逆鉾」が立つ。山系最高点の韓国岳と、今も活動を続ける新燃岳の火口は、この山域が今も火山活動の続く土地であることを物語っている。",
    [
      prop(
        "Ebino Kogen Lodge|Albergue de Ebino Kogen|Auberge d'Ebino Kogen|えびの高原の宿",
        720, 56,
      ),
      prop(
        "Kirishima Jingu Shrine Inn|Posada del santuario Kirishima Jingu|Auberge du sanctuaire Kirishima Jingu|霧島神宮の宿",
        860, 68,
      ),
    ],
  ),

  kaimondake: city(
    "Mt. Kaimon|Monte Kaimon|Mont Kaimon|開聞岳",
    130.5300, 31.2000, "nishinihon", "cone_volcano", "kirishima_volcanic", "r",
    "A near-perfect cone at Kyushu's southern tip, included for beauty rather than height" +
      "|Un cono casi perfecto en la punta sur de Kyushu, incluido por su belleza y no por su altura" +
      "|Un cône presque parfait à la pointe sud de Kyushu, retenu pour sa beauté plutôt que sa hauteur" +
      "|標高でなく美しさゆえに選ばれた、九州最南端の整った円錐",
    "At just 924 metres, Kaimon-dake is one of the shortest peaks in the hundred, rising directly from the sea at the southern tip of the Satsuma Peninsula in a symmetrical cone so clean it is nicknamed 'Satsuma Fuji.' Fukada included it not for elevation but for the purity of its shape, visible from ships passing along the coast and long used as a landmark for sailors heading toward Kagoshima." +
      "|Con apenas 924 metros, el Kaimon-dake es uno de los picos más bajos de las cien, alzándose directamente del mar en la punta sur de la península de Satsuma con un cono simétrico tan puro que se le apoda 'Fuji de Satsuma'. Fukada lo incluyó no por su altitud sino por la pureza de su forma, visible desde los barcos que pasan por la costa y usado desde antiguo como hito por los marinos rumbo a Kagoshima." +
      "|Avec seulement 924 mètres, le Kaimon-dake est l'un des plus bas sommets des cent, s'élevant directement de la mer à la pointe sud de la péninsule de Satsuma en un cône symétrique si pur qu'on le surnomme le « Fuji de Satsuma ». Fukada l'inclut non pour son altitude mais pour la pureté de sa forme, visible depuis les navires longeant la côte et longtemps utilisée comme repère par les marins en route vers Kagoshima." +
      "|標高わずか924mの開聞岳は百名山でも屈指の低山だが、薩摩半島の南端から海に直接そびえるその整った円錐は「薩摩富士」と呼ばれるほど美しい。深田久弥はその標高ではなく形の美しさゆえにこの山を選び、海岸を行く船からも見え、鹿児島へ向かう船乗りたちの古くからの目印にもなってきた。",
    [
      prop(
        "Kaimon Trailhead Inn|Posada del sendero de Kaimon|Auberge du départ de Kaimon|開聞岳登山口の宿",
        380, 30,
      ),
      prop(
        "Ibusuki Sand Bath Inn|Posada de baños de arena de Ibusuki|Auberge des bains de sable d'Ibusuki|指宿砂むし温泉の宿",
        1150, 90,
      ),
    ],
  ),
};

/**
 * 路線。山域内は縦走路(隣り合う山どうし)、山域のあいだは鉄道・バスの
 * 長距離移動を1本の路線として簡略化してある。北海道・屋久島をまたぐ2本は
 * 指示どおり航路("sea")にしてある。全体は99本の木構造(閉路なし)で、
 * 100座すべてを1つに連結している。seg は実測して geography.mjs 側で調整する。
 */
export const HYAKUMEIZAN_EDGES = [
  // --- hokkaido (8本の路線 + 屋久島側は九州の項) ---
  // 利尻—羅臼は実測で航路の19%が陸(745pxの長い航路)。利尻島と知床を
  // 直接結ぶ船は実在しないが、盤面としてこの2座を結ぶ必要があり、
  // 北海道の陸をかすめているだけと見て KEPT の候補としている
  // (team-lead から再測定してもらう)。
  ["rishiri", "rausudake", "sea"], // 利尻島からのフェリー(KEPT候補)
  ["rausudake", "sharidake"],
  ["sharidake", "meakandake"],
  ["meakandake", "asahidake"],
  ["asahidake", "tomuraushi"],
  ["tomuraushi", "tokachidake"],
  ["tokachidake", "poroshiridake"],
  ["poroshiridake", "yoteizan"],

  // --- hokkaido → tohoku ---
  // 実測で航路の68%が陸(羊蹄山が内陸にあり、線が北海道南西部の陸地を
  // 大きく削っていたため)。青函トンネルは実在する鉄道(japanの
  // aomori-hakodateと同じ実在インフラ)なので陸路に変え、team-leadの
  // 見立てどおり端も入れ替えた。焼き直し後の再測定が必要
  // (それでも陸路として海に出るようなら KEPT で残す)。
  ["iwakisan", "yoteizan"],

  // --- tohoku ---
  ["iwakisan", "hakkodasan"],
  ["hakkodasan", "iwatesan"],
  ["iwatesan", "hayachinesan"],
  ["iwatesan", "chokaisan"],
  ["chokaisan", "gassan"],
  ["gassan", "oasahidake"],
  ["oasahidake", "zaosan"],
  ["zaosan", "iidesan"],
  ["iidesan", "azumasan"],
  ["azumasan", "adatarayama"],
  ["adatarayama", "bandaisan"],

  // --- tohoku → joshinetsu ---
  ["bandaisan", "nasudake"],

  // --- joshinetsu: クラスタA(会津・上越国境) ---
  ["nasudake", "aizukomagatake"],
  ["aizukomagatake", "echigokomagatake"],
  ["echigokomagatake", "hiragatake"],
  ["hiragatake", "makihatayama"],
  ["makihatayama", "tanigawadake"],
  ["tanigawadake", "naebasan"],
  ["naebasan", "myokosan"],
  ["myokosan", "hiuchiyama"],
  ["hiuchiyama", "amakazariyama"],
  ["amakazariyama", "takatsumayama"],

  // --- joshinetsu: クラスタB(日光・尾瀬・上州) ---
  ["nantaisan", "nikkoshiranesan"],
  ["nikkoshiranesan", "sukaisan"],
  ["sukaisan", "hotakayama"],
  ["hotakayama", "shibutsusan"],
  ["shibutsusan", "hiuchigatake"],
  ["hiuchigatake", "akagiyama"],
  ["akagiyama", "kusatsushiranesan"],
  ["kusatsushiranesan", "azumayasan"],
  ["azumayasan", "asamayama"],

  // --- クラスタA・B・Dの連結 ---
  ["asamayama", "takatsumayama"],
  ["azumayasan", "ryokamisan"],

  // --- joshinetsu: クラスタD(奥秩父・丹沢・筑波) ---
  ["ryokamisan", "kumotoriyama"],
  ["kumotoriyama", "kobushigatake"],
  ["kobushigatake", "kinpusan"],
  ["kinpusan", "mizugakiyama"],
  ["mizugakiyama", "daibosatsurei"],
  ["daibosatsurei", "tanzawasan"],
  ["tanzawasan", "tsukubasan"],

  // --- クラスタBを全体に連結(日光の起点) ---
  ["nasudake", "nantaisan"],

  // --- joshinetsu → kitaalps ---
  ["naebasan", "shiroumadake"],

  // --- kitaalps ---
  ["shiroumadake", "goryudake"],
  ["goryudake", "kashimayarigatake"],
  ["kashimayarigatake", "tsurugidake"],
  ["tsurugidake", "tateyama"],
  ["tateyama", "yakushidake"],
  ["yakushidake", "kurobegorodake"],
  ["kurobegorodake", "suishodake"],
  ["suishodake", "washibadake"],
  ["washibadake", "yarigatake"],
  ["yarigatake", "hotakadake"],
  ["hotakadake", "kasagatake"],
  ["kasagatake", "yakedake"],
  ["yakedake", "norikuradake"],
  ["yarigatake", "tsubakurodake"],
  ["tsubakurodake", "jonendake"],

  // --- kitaalps → chuo_minami_alps ---
  ["norikuradake", "kisokomagatake"],

  // --- chuo_minami_alps: 木曽・中央アルプスと高原群 ---
  ["kisokomagatake", "utsugidake"],
  ["utsugidake", "enasan"],
  ["kisokomagatake", "ontakesan"],
  ["kisokomagatake", "utsukushigahara"],
  ["utsukushigahara", "kirigamine"],
  ["kirigamine", "tateshinayama"],
  ["tateshinayama", "yatsugatake"],

  // --- chuo_minami_alps: 南アルプス ---
  ["kisokomagatake", "kaikomagatake"],
  ["kaikomagatake", "hoozan"],
  ["kaikomagatake", "senjogatake"],
  ["senjogatake", "kitadake"],
  ["kitadake", "ainodake"],
  ["ainodake", "shiomidake"],
  ["shiomidake", "warusawadake"],
  ["warusawadake", "akaishidake"],
  ["akaishidake", "hijiridake"],
  ["hijiridake", "tekaridake"],

  // --- chuo_minami_alps → fujihakone ---
  ["tekaridake", "fujisan"],

  // --- 富士山・天城山(地方は kanto) ---
  ["fujisan", "amagisan"],

  // --- kanto(富士山)→ kinkihokuriku ---
  ["fujisan", "ibukiyama"],

  // --- kinkihokuriku ---
  ["hakusan", "arashimadake"],
  ["arashimadake", "ibukiyama"],
  ["ibukiyama", "sanjogatake"],
  ["sanjogatake", "odaigaharasan"],

  // --- kinkihokuriku → nishinihon ---
  ["ibukiyama", "daisen"],

  // --- nishinihon ---
  // 大山—剣山(瀬戸内海越え)は端の入れ替えでも22%が海のまま残った。
  // 大山と剣山を直接結ぶ道路は実在しない(瀬戸大橋・明石海峡大橋は
  // 岡山・香川/兵庫・淡路島側で、この2座とは位置が離れている)ため、
  // **大山は中国地方を西へ抜け関門海峡(実在する橋・トンネル)を渡って
  // 九州へ入る経路に変更した**(大山—九重)。剣山は石鎚山経由のまま
  // 変わらず山域内でつながる。
  ["kujusan", "daisen"],
  ["tsurugisan", "ishizuchisan"],
  // 九重—石鎚(豊予海峡越え、実在する宇和島—別府フェリーに近い経路)は
  // 実測で航路の54%が陸だった。team-lead の見立てどおり端を入れ替えて
  // 137pxまで下げた(まだ閾値を超えるようならKEPTを相談する)。
  ["ishizuchisan", "kujusan", "sea"], // 宇和島—別府のフェリー航路(端入替後、要再測定)
  ["kujusan", "asosan"],
  ["asosan", "sobosan"],
  ["sobosan", "kirishimayama"],
  ["kirishimayama", "kaimondake"],

  // --- nishinihon → 屋久島(指示により航路) ---
  ["kaimondake", "miyanouradake", "sea"],
];
