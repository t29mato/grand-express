/**
 * インドの都市と路線。
 *
 * 地方区分は6つ(`him` ヒマラヤ・北部 / `gan` ガンジス平原 / `des` 西部・砂漠 /
 * `dec` デカン・中部 / `sou` 南インド / `eas` 東部・北東部)。
 * 季節イベントはこの区分ごとに収入補正をかけるので、
 * モンスーンや酷暑の効き方が地方によって違うようになっている。
 *
 * 座標は [経度, 緯度] ではなく `lo`/`la` の組で持つ(他国の抽出データと同じ形)。
 */

function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

function prop(name, cost, income) {
  return { n: t(name), cost, inc: income };
}

/** 都市1件を組み立てる短縮関数。 */
function city(n, lo, la, reg, mark, bg, lp, tag, fact, props) {
  return { n: t(n), lo, la, reg, mark, bg, lp, tag: t(tag), fact: t(fact), props };
}

export const INDIA_CITIES = {
  // ---------------------------------------------------------------------
  // him — ヒマラヤ・北部
  // ---------------------------------------------------------------------
  srinagar: city(
    "Srinagar|Srinagar|Srinagar|シュリーナガル",
    74.8, 34.08, "him", "domewhite", "lakepalace", "l",
    "Houseboats on a mountain lake|Casas flotantes en un lago de montaña|Péniches sur un lac de montagne|山上の湖に浮かぶ家船",
    "British visitors were barred from owning land in Kashmir, so they built houseboats on Dal Lake instead — and the boats are still let out today. The valley's saffron and walnut wood have been traded for a thousand years.|A los británicos se les prohibió comprar tierra en Cachemira, así que construyeron casas flotantes en el lago Dal, que aún se alquilan. El azafrán y el nogal del valle se comercian desde hace mil años.|Interdits d'acheter des terres au Cachemire, les Britanniques construisirent des péniches sur le lac Dal ; on les loue encore. Le safran et le noyer de la vallée se négocient depuis mille ans.|英国人はカシミールで土地を持つことを禁じられたため、ダル湖に家船を造った。その船は今も宿として貸し出されている。谷のサフランと胡桃材は千年前から交易品である。",
    [prop("Dal Lake Houseboat|Casa flotante del lago Dal|Péniche du lac Dal|ダル湖のハウスボート", 320, 66),
     prop("Saffron Field|Campo de azafrán|Champ de safran|サフラン畑", 280, 58)],
  ),
  leh: city(
    "Leh|Leh|Leh|レー",
    77.58, 34.15, "him", "stupa", "himalaya", "r",
    "A desert above the clouds|Un desierto sobre las nubes|Un désert au-dessus des nuages|雲の上の砂漠",
    "At 3,500 m Ladakh gets less rain than the Sahara, yet meltwater channels turn its valleys green each summer. Buddhist monasteries here preserve Tibetan texts lost elsewhere.|A 3.500 m, Ladakh recibe menos lluvia que el Sáhara, pero el deshielo verdea sus valles cada verano. Sus monasterios budistas conservan textos tibetanos perdidos en otros lugares.|À 3 500 m, le Ladakh reçoit moins de pluie que le Sahara, mais l'eau de fonte verdit ses vallées chaque été. Ses monastères bouddhistes conservent des textes tibétains perdus ailleurs.|標高3500mのラダックはサハラより雨が少ないが、雪解け水の水路が夏ごとに谷を緑にする。仏教僧院には他所で失われたチベット語の経典が残る。",
    [prop("Cliffside Monastery|Monasterio del acantilado|Monastère à flanc de falaise|断崖の僧院", 300, 62),
     prop("Apricot Orchard|Huerto de albaricoques|Verger d'abricots|杏の果樹園", 230, 48)],
  ),
  dharamshala: city(
    "Dharamshala|Dharamsala|Dharamsala|ダラムサラ",
    76.32, 32.22, "him", "stupa", "himalaya", "l",
    "Tibet in exile|El Tíbet en el exilio|Le Tibet en exil|亡命チベットの町",
    "The Dalai Lama and the Tibetan government-in-exile have been based in this hill town since 1960. Its cricket ground, backed by snow peaks, is the highest international stadium in the world.|El Dalái Lama y el gobierno tibetano en el exilio residen en esta ciudad de montaña desde 1960. Su campo de críquet, ante picos nevados, es el estadio internacional más alto del mundo.|Le dalaï-lama et le gouvernement tibétain en exil y résident depuis 1960. Son terrain de cricket, adossé aux sommets enneigés, est le stade international le plus haut du monde.|1960年以来、ダライ・ラマとチベット亡命政府がこの山の町に拠点を置く。雪嶺を背にしたクリケット場は世界で最も標高の高い国際競技場である。",
    [prop("Thangka Studio|Taller de thangkas|Atelier de thangkas|タンカの工房", 260, 54),
     prop("Mountain Cricket Ground|Campo de críquet|Terrain de cricket|山のクリケット場", 300, 62)],
  ),
  shimla: city(
    "Shimla|Shimla|Shimla|シムラー",
    77.17, 31.1, "him", "domewhite", "himalaya", "r",
    "The empire's summer capital|La capital de verano del imperio|La capitale d'été de l'empire|夏の帝都",
    "For half of each year the British ran India from this ridge, moving the entire government 1,800 km uphill to escape the heat. The toy train that climbs to it passes through 102 tunnels.|Durante medio año los británicos gobernaban la India desde esta cresta, subiendo todo el gobierno 1.800 km para huir del calor. El tren de juguete que asciende cruza 102 túneles.|Six mois par an, les Britanniques gouvernaient l'Inde depuis cette crête, déplaçant tout le gouvernement sur 1 800 km pour fuir la chaleur. Le petit train qui y monte franchit 102 tunnels.|英国は毎年半年をこの尾根から統治し、暑さを避けるため政府ごと1800km上らせた。ここへ登る小さな鉄道は102のトンネルを抜ける。",
    [prop("Ridge Bandstand|Quiosco del paseo|Kiosque de la crête|リッジの野外音楽堂", 250, 52),
     prop("Toy Train Depot|Cochera del tren de juguete|Dépôt du petit train|登山鉄道の車庫", 290, 60)],
  ),
  rishikesh: city(
    "Rishikesh|Rishikesh|Rishikesh|リシケシュ",
    78.27, 30.1, "him", "shikhara", "ghat", "r",
    "Where the Ganges leaves the mountains|Donde el Ganges deja las montañas|Où le Gange quitte les montagnes|ガンジスが山を出るところ",
    "The Ganges runs clear and cold here before reaching the plains, which is why ashrams have lined the banks for centuries. The Beatles spent weeks at one in 1968 and wrote much of the White Album.|Aquí el Ganges baja claro y frío antes de llegar a la llanura, por eso los ashrams jalonan sus orillas. Los Beatles pasaron semanas en uno en 1968 y escribieron gran parte del Álbum Blanco.|Ici le Gange coule clair et froid avant la plaine, d'où les ashrams qui bordent ses rives. Les Beatles y séjournèrent en 1968 et y écrivirent une grande part de l'Album blanc.|ガンジスは平原に出る前のここでは澄んで冷たく、そのため何世紀もアシュラムが岸に並ぶ。1968年にビートルズが滞在し、ホワイト・アルバムの多くを書いた。",
    [prop("Riverside Ashram|Ashram junto al río|Ashram au bord du fleuve|川辺のアシュラム", 270, 56),
     prop("Rapids Raft Launch|Base de rafting|Base de rafting|急流下りの発着場", 230, 48)],
  ),
  darjeeling: city(
    "Darjeeling|Darjeeling|Darjeeling|ダージリン",
    88.26, 27.04, "him", "tealeaf", "teagarden", "l",
    "Tea with a view of Kanchenjunga|Té con vistas al Kanchenjunga|Thé avec vue sur le Kanchenjunga|カンチェンジュンガを望む茶園",
    "A Scottish surgeon smuggled Chinese tea seed here in the 1840s, and the thin mountain air gave the leaf its muscatel flavour. On clear mornings the world's third-highest peak fills the northern sky.|Un cirujano escocés trajo semillas chinas de té en los años 1840, y el aire delgado dio a la hoja su sabor moscatel. En mañanas claras, la tercera cumbre del mundo llena el cielo norte.|Un chirurgien écossais y introduisit des graines de thé chinoises vers 1840 ; l'air raréfié donna à la feuille son goût muscat. Par temps clair, le troisième sommet du monde emplit le ciel.|1840年代にスコットランド人医師が中国の茶の種を持ち込み、薄い山の空気が葉にマスカテルの香りを与えた。晴れた朝には世界第3位の高峰が北の空を埋める。",
    [prop("Hillside Tea Estate|Finca de té|Domaine de thé|山腹の茶園", 300, 62),
     prop("Himalayan Railway|Ferrocarril himalayo|Chemin de fer himalayen|ヒマラヤ鉄道", 320, 66)],
  ),
  gangtok: city(
    "Gangtok|Gangtok|Gangtok|ガントク",
    88.61, 27.33, "him", "stupa", "himalaya", "r",
    "A kingdom that joined in 1975|Un reino que se unió en 1975|Un royaume rallié en 1975|1975年に加わった王国",
    "Sikkim was an independent Buddhist kingdom until a referendum made it India's 22nd state. It is now the world's first fully organic state — chemical farming is banned outright.|Sikkim fue un reino budista independiente hasta que un referéndum lo hizo el estado 22 de la India. Hoy es el primer estado totalmente ecológico del mundo: la agricultura química está prohibida.|Le Sikkim fut un royaume bouddhiste indépendant jusqu'à un référendum qui en fit le 22e État indien. C'est aujourd'hui le premier État entièrement bio au monde.|シッキムは独立した仏教王国だったが、住民投票を経てインド22番目の州となった。今は世界初の完全有機農業州で、化学肥料・農薬は全面禁止である。",
    [prop("Cardamom Terrace|Terraza de cardamomo|Terrasse de cardamome|カルダモンの段畑", 260, 54),
     prop("Rumtek Prayer Hall|Sala de oración|Salle de prière|ルムテク僧院の堂", 280, 58)],
  ),
  tawang: city(
    "Tawang|Tawang|Tawang|タワン",
    91.87, 27.59, "him", "stupa", "himalaya", "r",
    "The largest monastery in India|El mayor monasterio de la India|Le plus grand monastère d'Inde|インド最大の僧院",
    "Perched at 3,000 m near the Tibetan border, its 17th-century monastery is the biggest in India and second only to Lhasa's. The sixth Dalai Lama was born in the town below.|A 3.000 m junto a la frontera tibetana, su monasterio del siglo XVII es el mayor de la India, sólo superado por el de Lhasa. El sexto Dalái Lama nació en el pueblo de abajo.|Perché à 3 000 m près de la frontière tibétaine, son monastère du XVIIe siècle est le plus grand d'Inde, second après celui de Lhassa. Le sixième dalaï-lama y est né.|標高3000m、チベット国境近くに建つ17世紀の僧院はインド最大で、ラサに次ぐ規模を持つ。第6代ダライ・ラマは麓の町で生まれた。",
    [prop("Golden Monastery|Monasterio dorado|Monastère doré|黄金の僧院", 300, 62),
     prop("High Pass Waystation|Posta del alto puerto|Relais du col|峠の宿駅", 240, 50)],
  ),

  // ---------------------------------------------------------------------
  // gan — ガンジス平原
  // ---------------------------------------------------------------------
  delhi: city(
    "Delhi|Delhi|Delhi|デリー",
    77.21, 28.61, "gan", "gateway", "capital", "r",
    "Seven cities on one plain|Siete ciudades en una llanura|Sept villes sur une plaine|ひとつの平原に七つの都",
    "At least seven capitals have been built and abandoned on this stretch of the Yamuna over a thousand years, and their ruins stand among the traffic. An iron pillar raised here around 400 CE has still not rusted.|Al menos siete capitales se han construido y abandonado en este tramo del Yamuna en mil años, y sus ruinas siguen entre el tráfico. Un pilar de hierro del año 400 aún no se ha oxidado.|Au moins sept capitales ont été bâties puis abandonnées sur cette rive de la Yamuna en mille ans ; leurs ruines côtoient la circulation. Un pilier de fer dressé vers 400 n'a toujours pas rouillé.|ヤムナー河畔のこの一帯には千年で少なくとも七つの都が築かれては捨てられ、その廃墟が車の流れの間に残る。西暦400年頃に立てられた鉄柱は今も錆びていない。",
    [prop("Red Sandstone Fort|Fuerte de arenisca roja|Fort de grès rouge|赤砂岩の城", 340, 70),
     prop("Spice Market Lane|Callejón de especias|Ruelle des épices|香辛料市場の路地", 300, 62)],
  ),
  amritsar: city(
    "Amritsar|Amritsar|Amritsar|アムリトサル",
    74.87, 31.63, "gan", "goldendome", "lakepalace", "l",
    "A kitchen that never closes|Una cocina que nunca cierra|Une cuisine qui ne ferme jamais|閉じることのない台所",
    "The Golden Temple serves free meals to anyone who comes — around 100,000 people a day, cooked and washed up by volunteers. Its four doors face four directions to say that all are welcome.|El Templo Dorado da comida gratis a quien llegue: unas 100.000 personas al día, con voluntarios cocinando y fregando. Sus cuatro puertas miran a los cuatro puntos: todos son bienvenidos.|Le Temple d'or nourrit gratuitement quiconque se présente — environ 100 000 personnes par jour, cuisinées et lavées par des bénévoles. Ses quatre portes disent que tous sont accueillis.|黄金寺院は訪れる誰にでも無料の食事を出す。1日およそ10万人分を、志願者が調理し洗い物までする。四方に開いた四つの門は「誰でも来てよい」という意味である。",
    [prop("Community Kitchen|Cocina comunitaria|Cuisine communautaire|共同食堂", 300, 62),
     prop("Marble Causeway|Calzada de mármol|Chaussée de marbre|大理石の参道", 280, 58)],
  ),
  chandigarh: city(
    "Chandigarh|Chandigarh|Chandigarh|チャンディーガル",
    76.78, 30.73, "gan", "gateway", "citypark", "r",
    "A capital drawn from nothing|Una capital dibujada de la nada|Une capitale dessinée ex nihilo|白紙から描かれた州都",
    "When Partition left Punjab without a capital, Le Corbusier laid out a whole city on a grid of numbered sectors. A road inspector spent decades secretly building a garden here out of construction rubble.|Cuando la Partición dejó al Panyab sin capital, Le Corbusier trazó una ciudad entera en sectores numerados. Un inspector de carreteras pasó décadas construyendo en secreto un jardín con escombros.|La Partition ayant privé le Pendjab de capitale, Le Corbusier traça une ville entière en secteurs numérotés. Un inspecteur des routes y bâtit en secret, des décennies durant, un jardin fait de gravats.|分離独立でパンジャーブが州都を失うと、ル・コルビュジエが番号付き区画の都市を丸ごと設計した。ある道路監督官は数十年かけて建設廃材から庭園を密かに造り上げた。",
    [prop("Rock Garden|Jardín de rocas|Jardin de rocaille|ロックガーデン", 280, 58),
     prop("Open Hand Plaza|Plaza de la Mano Abierta|Place de la Main ouverte|開いた手の広場", 260, 54)],
  ),
  haridwar: city(
    "Haridwar|Haridwar|Haridwar|ハリドワール",
    78.16, 29.95, "gan", "shikhara", "ghat", "l",
    "Lamps set adrift at dusk|Lámparas a la deriva al anochecer|Lampes lâchées au crépuscule|夕暮れに流す灯明",
    "Every evening thousands of leaf-boats holding oil lamps are floated down the Ganges here. Once every twelve years the Kumbh Mela brings millions of pilgrims to the same few steps.|Cada tarde se sueltan aquí miles de barquitas de hojas con lámparas de aceite. Cada doce años, el Kumbh Mela reúne a millones de peregrinos en estos mismos escalones.|Chaque soir, des milliers de barquettes de feuilles portant des lampes à huile descendent le Gange. Tous les douze ans, la Kumbh Mela y amène des millions de pèlerins.|毎夕、油の灯明をのせた葉の小舟が何千とガンジスに流される。12年に一度のクンブ・メーラには、この数段の石段に何百万もの巡礼が集まる。",
    [prop("Evening Aarti Ghat|Ghat del aarti|Ghât de l'aarti|夕べのアールティの階段", 270, 56),
     prop("Pilgrim Rest House|Casa de peregrinos|Maison de pèlerins|巡礼宿", 240, 50)],
  ),
  agra: city(
    "Agra|Agra|Agra|アーグラ",
    78.01, 27.18, "gan", "domewhite", "lakepalace", "r",
    "Marble raised for one grave|Mármol alzado por una tumba|Du marbre pour une seule tombe|ひとつの墓のための大理石",
    "Shah Jahan spent over twenty years and the wealth of an empire on a tomb for his wife Mumtaz Mahal. Its marble is inlaid with 28 kinds of stone and changes colour with the light.|Shah Jahan gastó más de veinte años y la riqueza de un imperio en la tumba de su esposa Mumtaz Mahal. Su mármol lleva 28 tipos de piedra incrustada y cambia de color con la luz.|Shah Jahan consacra plus de vingt ans et la fortune d'un empire au tombeau de son épouse Mumtaz Mahal. Son marbre, incrusté de 28 pierres, change de couleur selon la lumière.|シャー・ジャハーンは妃ムムターズ・マハルの墓に20年以上と帝国の富を注いだ。大理石には28種の石が象嵌され、光によって色を変える。",
    [prop("Marble Inlay Workshop|Taller de taracea|Atelier de marqueterie|大理石象嵌の工房", 320, 66),
     prop("Riverside Garden|Jardín ribereño|Jardin de la rive|川辺の庭園", 280, 58)],
  ),
  gwalior: city(
    "Gwalior|Gwalior|Gwalior|グワリオル",
    78.18, 26.22, "gan", "sundial", "desertfort", "r",
    "A fort called the pearl of forts|Un fuerte llamado perla de fuertes|Un fort dit la perle des forts|城砦の真珠",
    "Babur called this cliff-top fort the pearl among the fortresses of India. Some of the world's oldest written zeroes, carved into a temple wall here, date from the 9th century.|Babur llamó a este fuerte en lo alto del acantilado la perla de las fortalezas de la India. Aquí se conservan ceros escritos del siglo IX, de los más antiguos del mundo.|Babur appelait ce fort perché la perle des forteresses de l'Inde. On y trouve, gravés au mur d'un temple, des zéros écrits du IXe siècle parmi les plus anciens au monde.|バーブルはこの断崖の城砦を「インドの城の真珠」と呼んだ。寺院の壁に刻まれた9世紀のゼロは、世界最古級の「書かれた零」である。",
    [prop("Cliff Fortress|Fortaleza del acantilado|Forteresse de la falaise|断崖の城砦", 300, 62),
     prop("Court Music School|Escuela de música cortesana|École de musique de cour|宮廷音楽の学校", 260, 54)],
  ),
  lucknow: city(
    "Lucknow|Lucknow|Lucknow|ラクナウ",
    80.95, 26.85, "gan", "masjid", "bazaar", "r",
    "Courtly manners and slow-cooked meat|Modales cortesanos y carne al fuego lento|Manières de cour et viandes mijotées|宮廷の作法と煮込みの味",
    "The Nawabs of Awadh made politeness itself into an art, and their kitchens invented dishes cooked sealed in pots for hours. A labyrinth built above one of their halls has no supporting beams at all.|Los nawabs de Awadh convirtieron la cortesía en arte y sus cocinas crearon platos sellados en ollas durante horas. Un laberinto sobre uno de sus salones no tiene vigas de soporte.|Les nababs d'Awadh firent de la politesse un art et leurs cuisines inventèrent des plats mijotés des heures en marmite scellée. Un labyrinthe bâti au-dessus d'une de leurs salles ne compte aucune poutre.|アワド太守は礼儀そのものを芸に高め、その厨房は壺を密封して何時間も煮る料理を生んだ。彼らの広間の上に築かれた迷宮には支える梁が一本も無い。",
    [prop("Chikan Embroidery House|Casa de bordado chikan|Maison de broderie chikan|チカン刺繍の家", 270, 56),
     prop("Labyrinth Palace|Palacio laberinto|Palais labyrinthe|迷宮の宮殿", 300, 62)],
  ),
  prayagraj: city(
    "Prayagraj|Prayagraj|Prayagraj|プラヤーグラージ",
    81.85, 25.44, "gan", "lotus", "ghat", "r",
    "Where two rivers meet|Donde se juntan dos ríos|Où deux fleuves se rejoignent|二つの川が出会う場所",
    "The Ganges and Yamuna join here, one brown and one green, and you can see the line between them. The Kumbh Mela held at this confluence is the largest gathering of people on earth.|El Ganges y el Yamuna se unen aquí, uno pardo y otro verde, y se ve la línea entre ambos. El Kumbh Mela de esta confluencia es la mayor reunión humana del planeta.|Le Gange et la Yamuna se rejoignent ici, l'un brun, l'autre vert, et la ligne entre eux se voit. La Kumbh Mela de ce confluent est le plus grand rassemblement humain au monde.|茶色いガンジスと緑のヤムナーがここで合流し、その境目が目に見える。この合流点で開かれるクンブ・メーラは地球上で最大の人の集まりである。",
    [prop("Confluence Boat Stand|Embarcadero de la confluencia|Embarcadère du confluent|合流点の渡し場", 260, 54),
     prop("Pilgrim Tent City|Ciudad de tiendas|Ville de tentes|巡礼のテント都市", 290, 60)],
  ),
  varanasi: city(
    "Varanasi|Varanasi|Varanasi|ワーラーナシー",
    83.01, 25.32, "gan", "shikhara", "ghat", "r",
    "Continuously lived in for 3,000 years|Habitada sin interrupción 3.000 años|Habitée sans interruption depuis 3 000 ans|三千年住み継がれた町",
    "Among the oldest cities anywhere that has never been abandoned, its stone steps run for six kilometres along the Ganges. Hindus believe that dying here releases the soul from rebirth.|Entre las ciudades más antiguas jamás abandonadas, sus escalinatas recorren seis kilómetros junto al Ganges. Los hindúes creen que morir aquí libera el alma del renacimiento.|Parmi les plus vieilles villes jamais abandonnées, ses marches de pierre longent le Gange sur six kilomètres. Les hindous croient qu'y mourir libère l'âme du cycle des renaissances.|一度も放棄されたことのない世界最古級の都市で、石段はガンジス沿いに6kmも続く。ヒンドゥー教徒はここで死ぬと魂が輪廻から解かれると信じている。",
    [prop("Silk Weaving House|Casa de tejido de seda|Maison de tissage de soie|絹織りの家", 300, 62),
     prop("Riverfront Steps|Escalinata del río|Marches du fleuve|川辺のガート", 320, 66)],
  ),
  patna: city(
    "Patna|Patna|Patna|パトナ",
    85.14, 25.59, "gan", "goldendome", "ghat", "r",
    "Capital of an ancient empire|Capital de un imperio antiguo|Capitale d'un empire antique|古代帝国の都",
    "As Pataliputra this was the capital of the Maurya empire, and a Greek ambassador described its wooden walls with 570 towers. The tenth Sikh Guru was born here in 1666.|Como Pataliputra fue capital del imperio Maurya; un embajador griego describió sus murallas de madera con 570 torres. El décimo gurú sij nació aquí en 1666.|Sous le nom de Pataliputra, elle fut la capitale de l'empire Maurya ; un ambassadeur grec décrivit ses murs de bois à 570 tours. Le dixième gourou sikh y naquit en 1666.|パータリプトラとしてマウリヤ朝の都であり、ギリシャの使節は570の塔を持つ木の城壁を書き残した。第10代シク教グルは1666年にここで生まれた。",
    [prop("Granary Dome|Cúpula del granero|Dôme du grenier|円形穀倉", 260, 54),
     prop("River Ferry Wharf|Muelle del transbordador|Quai du bac|渡し船の桟橋", 240, 50)],
  ),
  bodhgaya: city(
    "Bodh Gaya|Bodh Gaya|Bodh Gaya|ブッダガヤ",
    84.99, 24.7, "gan", "stupa", "cavetemple", "l",
    "The tree under which he woke|El árbol bajo el que despertó|L'arbre sous lequel il s'éveilla|悟りの木の下",
    "Siddhartha Gautama is said to have attained enlightenment beneath a fig tree here around 500 BCE. The tree standing today is grown from a cutting of a cutting of the original.|Se dice que Siddhartha Gautama alcanzó la iluminación bajo una higuera aquí hacia el 500 a.C. El árbol actual creció de un esqueje de un esqueje del original.|Siddhartha Gautama y aurait atteint l'éveil sous un figuier vers 500 av. J.-C. L'arbre d'aujourd'hui provient d'une bouture d'une bouture de l'original.|紀元前500年頃、シッダールタ・ガウタマはここの菩提樹の下で悟りを開いたとされる。今立つ木は、原木の挿し木のそのまた挿し木から育ったものである。",
    [prop("Bodhi Tree Precinct|Recinto del árbol Bodhi|Enceinte de l'arbre de la Bodhi|菩提樹の境内", 310, 64),
     prop("Pilgrim Monastery Row|Fila de monasterios|Rangée de monastères|各国寺院の並び", 270, 56)],
  ),

  // ---------------------------------------------------------------------
  // des — 西部・砂漠
  // ---------------------------------------------------------------------
  jaipur: city(
    "Jaipur|Jaipur|Jaipur|ジャイプル",
    75.79, 26.91, "des", "sundial", "desertfort", "r",
    "The pink city and its sky charts|La ciudad rosa y sus cartas del cielo|La ville rose et ses cartes du ciel|ピンクの街と空の観測儀",
    "Painted pink in 1876 to welcome a visiting prince, the old city has kept the colour by law ever since. Its 18th-century observatory holds the world's largest stone sundial, accurate to two seconds.|Pintada de rosa en 1876 para recibir a un príncipe, la ciudad vieja conserva el color por ley. Su observatorio del siglo XVIII tiene el mayor reloj de sol de piedra, con precisión de dos segundos.|Peinte en rose en 1876 pour accueillir un prince, la vieille ville garde cette couleur par la loi. Son observatoire du XVIIIe siècle abrite le plus grand cadran solaire de pierre, précis à deux secondes.|1876年に来訪する王子を迎えるためピンクに塗られ、旧市街は今も条例でその色を保つ。18世紀の天文台には世界最大の石の日時計があり、2秒の精度を持つ。",
    [prop("Palace of Winds|Palacio de los Vientos|Palais des Vents|風の宮殿", 300, 62),
     prop("Stone Observatory|Observatorio de piedra|Observatoire de pierre|石の天文台", 280, 58)],
  ),
  jodhpur: city(
    "Jodhpur|Jodhpur|Jodhpur|ジョードプル",
    73.02, 26.29, "des", "gateway", "desertfort", "l",
    "A blue city under a cliff fort|Ciudad azul bajo un fuerte|Ville bleue sous un fort|城砦の下の青い街",
    "Whole neighbourhoods are washed in indigo, which locals say keeps houses cool and insects away. The fort above them has walls 36 metres high and has never been taken by siege.|Barrios enteros están encalados de índigo, que según los vecinos refresca las casas y ahuyenta insectos. El fuerte sobre ellos tiene muros de 36 m y nunca cayó por asedio.|Des quartiers entiers sont badigeonnés d'indigo, ce qui, dit-on, garde les maisons fraîches et éloigne les insectes. Le fort au-dessus, aux murs de 36 m, n'a jamais été pris par un siège.|街区ごと藍色に塗られており、住民は家が涼しくなり虫も寄らないと言う。見下ろす城砦の城壁は高さ36m、包囲で落ちたことがない。",
    [prop("Indigo Quarter|Barrio índigo|Quartier indigo|藍の街区", 280, 58),
     prop("Clifftop Fort Gate|Puerta del fuerte|Porte du fort|城砦の門", 300, 62)],
  ),
  jaisalmer: city(
    "Jaisalmer|Jaisalmer|Jaisalmer|ジャイサルメール",
    70.91, 26.92, "des", "gateway", "desertfort", "l",
    "A fort where people still live|Un fuerte aún habitado|Un fort toujours habité|今も人が住む城砦",
    "One of very few forts in the world still inhabited — around 3,000 people live inside its walls. Built of yellow sandstone, it seems to grow out of the Thar desert and glows gold at sunset.|Uno de los poquísimos fuertes del mundo aún habitados: unas 3.000 personas viven dentro. De arenisca amarilla, parece brotar del desierto de Thar y brilla dorado al atardecer.|L'un des très rares forts au monde encore habités : quelque 3 000 personnes vivent dans ses murs. En grès jaune, il semble sortir du désert du Thar et brille d'or au couchant.|世界でも数少ない「今も人が住む城砦」で、城壁の内側におよそ3000人が暮らす。黄色い砂岩造りで、タール砂漠から生えたように見え、夕日に金色に輝く。",
    [prop("Living Fort Haveli|Haveli del fuerte|Haveli du fort|城内のハヴェーリー", 290, 60),
     prop("Camel Caravan Camp|Campamento de camellos|Camp de caravane|らくだ隊商の宿営", 250, 52)],
  ),
  bikaner: city(
    "Bikaner|Bikaner|Bikaner|ビーカーネール",
    73.32, 28.02, "des", "spice", "desertfort", "r",
    "Camel country and fried snacks|País de camellos y frituras|Pays des chameaux et des fritures|らくだと揚げ菓子の町",
    "India's only camel research farm is here, and camel milk ice cream is sold at its gate. The town's spiced fried snack, bhujia, is now eaten across the country by the tonne.|Aquí está la única granja de investigación camellera de la India, con helado de leche de camella en la puerta. Su fritura especiada, el bhujia, se come hoy por toneladas en todo el país.|La seule ferme de recherche caméline d'Inde s'y trouve, avec sa glace au lait de chamelle. Sa friture épicée, le bhujia, se mange aujourd'hui par tonnes dans tout le pays.|インド唯一のらくだ研究農場があり、門前ではらくだ乳のアイスが売られる。この町の香辛料を効かせた揚げ菓子ブジヤは、今や全国でトン単位で食べられている。",
    [prop("Camel Research Farm|Granja de camellos|Ferme camelines|らくだ研究農場", 250, 52),
     prop("Bhujia Fryers' Row|Freidurías de bhujia|Friteries de bhujia|ブジヤ揚げの並び", 270, 56)],
  ),
  udaipur: city(
    "Udaipur|Udaipur|Udaipur|ウダイプル",
    73.71, 24.58, "des", "domewhite", "lakepalace", "l",
    "Palaces floating on man-made lakes|Palacios sobre lagos artificiales|Palais flottant sur des lacs artificiels|人工湖に浮かぶ宮殿",
    "Its lakes were dug centuries ago to hold monsoon water in a dry land, and palaces were then built on islands in them. The ruling house here claims the longest unbroken dynasty in the world.|Sus lagos se excavaron hace siglos para retener el agua del monzón, y luego se alzaron palacios en sus islas. Su casa reinante reclama la dinastía ininterrumpida más larga del mundo.|Ses lacs furent creusés il y a des siècles pour retenir l'eau de la mousson, puis on bâtit des palais sur leurs îles. Sa maison régnante revendique la plus longue dynastie ininterrompue au monde.|湖は乾いた土地にモンスーンの水を溜めるため何世紀も前に掘られ、その中の島に宮殿が建てられた。この地の王家は世界最長の断絶なき王朝を称する。",
    [prop("Island Palace Hotel|Hotel del palacio isla|Hôtel du palais insulaire|湖上宮殿のホテル", 340, 70),
     prop("Miniature Painting Studio|Taller de miniaturas|Atelier de miniatures|細密画の工房", 270, 56)],
  ),
  ahmedabad: city(
    "Ahmedabad|Ahmedabad|Ahmedabad|アフマダーバード",
    72.57, 23.02, "des", "masjid", "bazaar", "r",
    "Stepwells and a salt march|Pozos escalonados y una marcha de la sal|Puits à degrés et marche du sel|階段井戸と塩の行進",
    "Gandhi's ashram on the river here is where the 1930 Salt March began. The region's stepwells descend seven storeys underground, carved like temples to reach the water table.|El ashram de Gandhi junto al río fue el punto de partida de la Marcha de la Sal de 1930. Los pozos escalonados de la región bajan siete pisos, tallados como templos hasta el agua.|L'ashram de Gandhi au bord du fleuve vit partir la Marche du sel de 1930. Les puits à degrés de la région descendent sur sept étages, sculptés comme des temples jusqu'à la nappe.|川辺のガンディーのアシュラムは1930年の「塩の行進」の出発点である。この地方の階段井戸は寺院のように彫られ、地下水面まで7層も下る。",
    [prop("Seven-Storey Stepwell|Pozo de siete pisos|Puits à sept étages|七層の階段井戸", 300, 62),
     prop("Riverside Ashram|Ashram ribereño|Ashram de la rive|川辺のアシュラム", 280, 58)],
  ),
  surat: city(
    "Surat|Surat|Surat|スーラト",
    72.83, 21.17, "des", "cotton", "bazaar", "r",
    "Nine of every ten diamonds|Nueve de cada diez diamantes|Neuf diamants sur dix|世界の十のうち九のダイヤ",
    "Around 90% of the world's diamonds are cut and polished in this one city. Three hundred years earlier it was the Mughal empire's main port, where the East India Company first set up shop.|Cerca del 90% de los diamantes del mundo se tallan y pulen en esta sola ciudad. Trescientos años antes era el puerto principal mogol, donde la Compañía de las Indias abrió su primera factoría.|Environ 90 % des diamants du monde sont taillés et polis dans cette seule ville. Trois siècles plus tôt, c'était le grand port moghol, où la Compagnie des Indes s'installa d'abord.|世界のダイヤモンドのおよそ9割がこの一都市で研磨される。300年前はムガル帝国最大の港で、東インド会社が最初の商館を置いた場所でもある。",
    [prop("Diamond Polishing Hall|Taller de pulido|Atelier de polissage|ダイヤ研磨工場", 340, 70),
     prop("Power Loom Shed|Nave de telares|Halle des métiers|力織機の工場", 290, 60)],
  ),
  dwarka: city(
    "Dwarka|Dwarka|Dwarka|ドワールカー",
    68.97, 22.24, "des", "shikhara", "arabianport", "l",
    "A city said to lie beneath the sea|Una ciudad que dicen bajo el mar|Une cité dite engloutie|海に沈んだと伝わる都",
    "Tradition holds that Krishna's city stood here and was swallowed by the sea; divers have found stone structures offshore. It is one of the four holiest pilgrimage sites for Hindus.|La tradición dice que la ciudad de Krishna estuvo aquí y la tragó el mar; los buzos han hallado estructuras de piedra. Es uno de los cuatro lugares más sagrados del hinduismo.|La tradition veut que la cité de Krishna s'y dressait avant d'être engloutie ; des plongeurs y ont trouvé des structures de pierre. C'est l'un des quatre lieux les plus saints de l'hindouisme.|クリシュナの都がここにあり海に呑まれたと伝わり、沖では潜水調査で石造の遺構が見つかっている。ヒンドゥー教四大聖地のひとつ。",
    [prop("Sea Temple Spire|Torre del templo marino|Flèche du temple marin|海辺の寺の塔", 300, 62),
     prop("Pilgrim Boat Jetty|Embarcadero de peregrinos|Jetée des pèlerins|巡礼船の桟橋", 250, 52)],
  ),
  bhuj: city(
    "Bhuj|Bhuj|Bhuj|ブジ",
    69.67, 23.24, "des", "cotton", "desertfort", "l",
    "Embroidery on a salt desert|Bordado sobre un desierto de sal|Broderie sur un désert de sel|塩の砂漠の刺繍",
    "Beyond the town lies the Rann of Kutch, a salt flat that floods each monsoon and dries white each winter. Its villages hold dozens of distinct embroidery traditions, each identifying a community.|Tras la ciudad se extiende el Rann de Kutch, un salar que se inunda con el monzón y blanquea en invierno. Sus aldeas guardan decenas de bordados distintos, cada uno de una comunidad.|Au-delà s'étend le Rann de Kutch, un marais salant inondé à la mousson et blanc l'hiver. Ses villages conservent des dizaines de broderies distinctes, chacune propre à une communauté.|町の先にはカッチ大湿地が広がり、モンスーンごとに冠水し冬には白く乾く。その村々には共同体ごとに異なる刺繍が数十種も受け継がれている。",
    [prop("Mirror Embroidery Hut|Taller de bordado|Atelier de broderie|鏡刺繍の工房", 260, 54),
     prop("Salt Flat Camp|Campamento del salar|Camp du salar|塩原のキャンプ", 240, 50)],
  ),

  // ---------------------------------------------------------------------
  // dec — デカン・中部
  // ---------------------------------------------------------------------
  mumbai: city(
    "Mumbai|Bombay|Bombay|ムンバイ",
    72.88, 19.08, "dec", "gateway", "megacity", "r",
    "Seven islands joined into one|Siete islas unidas en una|Sept îles n'en faisant qu'une|七つの島がひとつになった街",
    "The city was built by filling in the water between seven islands given to England as a dowry in 1661. Every day a network of couriers delivers 200,000 home-cooked lunches with almost no errors.|La ciudad se formó rellenando el mar entre siete islas cedidas a Inglaterra como dote en 1661. Cada día una red de repartidores lleva 200.000 comidas caseras casi sin errores.|La ville naquit du comblement des eaux entre sept îles cédées à l'Angleterre en dot en 1661. Chaque jour, un réseau de coursiers livre 200 000 repas maison presque sans erreur.|1661年に持参金としてイングランドへ渡った七つの島の間を埋め立てて出来た街。毎日20万食の家庭弁当が、ほとんど間違いなく配達網で届けられる。",
    [prop("Harbour Arch|Arco del puerto|Arche du port|海の門", 340, 70),
     prop("Film Studio Lot|Estudio de cine|Studio de cinéma|映画撮影所", 360, 74)],
  ),
  pune: city(
    "Pune|Pune|Pune|プネー",
    73.86, 18.52, "dec", "gateway", "citypark", "r",
    "The Maratha capital turned campus town|Capital marata vuelta ciudad universitaria|Capitale marathe devenue ville étudiante|マラーター王国の都から学都へ",
    "This was the seat of the Maratha empire that checked Mughal power across the Deccan. Today it holds so many colleges that it is called the Oxford of the East.|Fue la sede del imperio marata que frenó el poder mogol en el Decán. Hoy tiene tantas universidades que la llaman la Oxford de Oriente.|Ce fut le siège de l'empire marathe qui contint le pouvoir moghol dans le Deccan. Elle compte aujourd'hui tant d'universités qu'on la dit l'Oxford de l'Orient.|デカンでムガルの勢いを止めたマラーター王国の本拠地。今は大学が多く「東洋のオックスフォード」と呼ばれる。",
    [prop("Peshwa Palace Gate|Puerta del palacio|Porte du palais|宰相府の門", 280, 58),
     prop("University Quarter|Barrio universitario|Quartier universitaire|学生街", 300, 62)],
  ),
  nashik: city(
    "Nashik|Nashik|Nashik|ナーシク",
    73.79, 20.0, "dec", "shikhara", "ghat", "l",
    "Vineyards beside a sacred river|Viñedos junto a un río sagrado|Vignobles au bord d'un fleuve sacré|聖なる川のほとりの葡萄畑",
    "The Godavari rises nearby and the town is one of four that host the Kumbh Mela in rotation. Its volcanic soil and dry winters have also made it the centre of Indian winemaking.|El Godavari nace cerca y la ciudad es una de las cuatro que acogen el Kumbh Mela por turnos. Su suelo volcánico y sus inviernos secos la han hecho centro del vino indio.|La Godavari y prend sa source et la ville est l'une des quatre qui accueillent tour à tour la Kumbh Mela. Son sol volcanique en a fait le centre du vin indien.|ゴーダーヴァリ川の源に近く、クンブ・メーラを順に開く四都市のひとつ。火山性の土と乾いた冬から、インドのワイン造りの中心にもなった。",
    [prop("Hillside Vineyard|Viñedo en ladera|Vignoble en coteau|丘の葡萄畑", 280, 58),
     prop("River Bathing Ghat|Ghat de baño|Ghât de bain|沐浴のガート", 250, 52)],
  ),
  aurangabad: city(
    "Aurangabad|Aurangabad|Aurangabad|アウランガーバード",
    75.34, 19.88, "dec", "gopuramark", "cavetemple", "r",
    "Temples cut down into rock|Templos excavados en la roca|Temples taillés dans le roc|岩を掘り下げた寺院",
    "At nearby Ellora a whole temple was carved downward out of one cliff, removing 200,000 tonnes of rock with no scaffolding. The Ajanta caves next door hold paintings 2,000 years old.|En la cercana Ellora se talló un templo entero hacia abajo desde un acantilado, retirando 200.000 toneladas de roca sin andamios. Las cuevas de Ajanta guardan pinturas de 2.000 años.|À Ellora, tout un temple fut taillé de haut en bas dans une falaise, 200 000 tonnes de roche ôtées sans échafaudage. Les grottes d'Ajanta voisines abritent des peintures vieilles de 2 000 ans.|近郊のエローラでは、一枚の岩山を上から掘り下げて寺院を丸ごと彫り出した。足場なしで20万トンの岩を取り除いている。隣のアジャンタには2000年前の壁画が残る。",
    [prop("Rock-Cut Temple|Templo excavado|Temple rupestre|石彫の寺院", 320, 66),
     prop("Cave Painting Hall|Sala de pinturas|Salle des peintures|壁画の窟", 290, 60)],
  ),
  indore: city(
    "Indore|Indore|Indore|インドール",
    75.86, 22.72, "dec", "spice", "bazaar", "r",
    "A night street that never sleeps|Una calle nocturna que no duerme|Une rue nocturne qui ne dort jamais|眠らない夜の食べ物街",
    "Its night food street has been trading until dawn for generations and gives the city a reputation for eating well. Indore has topped India's cleanliness rankings every year since 2017.|Su calle de comida nocturna comercia hasta el alba desde hace generaciones. Indore encabeza el ranking de limpieza de la India todos los años desde 2017.|Sa rue gastronomique nocturne commerce jusqu'à l'aube depuis des générations. Indore est en tête du classement de propreté de l'Inde chaque année depuis 2017.|夜の食べ物街は何世代も明け方まで商いを続け、食の町として知られる。インドールは2017年以来、毎年インドの清潔度ランキング1位である。",
    [prop("Night Food Street|Calle de comida nocturna|Rue des mets nocturnes|夜の食べ物街", 290, 60),
     prop("Cotton Exchange|Bolsa del algodón|Bourse du coton|綿取引所", 270, 56)],
  ),
  bhopal: city(
    "Bhopal|Bhopal|Bhopal|ボーパール",
    77.41, 23.26, "dec", "masjid", "lakepalace", "r",
    "Ruled by women for a century|Gobernada por mujeres un siglo|Gouvernée par des femmes un siècle|一世紀を女性が治めた町",
    "Four Begums ruled this princely state in succession from 1819 to 1926, building schools, waterworks and a vast mosque. Rock shelters an hour away carry paintings made 10,000 years ago.|Cuatro begums gobernaron este estado de 1819 a 1926, construyendo escuelas, agua corriente y una gran mezquita. A una hora hay abrigos rocosos con pinturas de hace 10.000 años.|Quatre bégums gouvernèrent cet État de 1819 à 1926, bâtissant écoles, adduction d'eau et une vaste mosquée. À une heure de là, des abris rocheux portent des peintures vieilles de 10 000 ans.|1819年から1926年まで四代のベーグム(女性藩王)が続けて統治し、学校・水道・大モスクを築いた。1時間ほどの岩陰には1万年前の絵が残る。",
    [prop("Great Mosque|Gran mezquita|Grande mosquée|大モスク", 300, 62),
     prop("Lakeside Promenade|Paseo del lago|Promenade du lac|湖畔の遊歩道", 260, 54)],
  ),
  khajuraho: city(
    "Khajuraho|Khajuraho|Khajuraho|カジュラーホー",
    79.92, 24.85, "dec", "shikhara", "cavetemple", "l",
    "Temples lost to the forest for 600 years|Templos perdidos 600 años|Temples perdus 600 ans dans la forêt|六百年森に埋もれた寺院",
    "Eighty-five temples were built here in a single century, then abandoned and swallowed by jungle until a British surveyor stumbled on them in 1838. Only about twenty-five still stand.|Se levantaron 85 templos en un solo siglo, luego abandonados y devorados por la jungla hasta que un topógrafo británico dio con ellos en 1838. Sólo quedan unos veinticinco.|Quatre-vingt-cinq temples furent bâtis en un siècle, puis abandonnés à la jungle jusqu'à ce qu'un géomètre britannique les retrouve en 1838. Il n'en reste qu'environ vingt-cinq.|わずか一世紀の間に85の寺院が建てられ、その後は放棄されて密林に埋もれ、1838年に英国の測量士が偶然見つけるまで忘れられていた。現存するのは約25。",
    [prop("Sandstone Temple|Templo de arenisca|Temple de grès|砂岩の寺院", 310, 64),
     prop("Sculpture Workshop|Taller de escultura|Atelier de sculpture|石彫の工房", 260, 54)],
  ),
  nagpur: city(
    "Nagpur|Nagpur|Nagpur|ナーグプル",
    79.09, 21.15, "dec", "spice", "bazaar", "r",
    "The orange city at the country's centre|La ciudad naranja en el centro del país|La ville orange au centre du pays|国の中心にある橙の街",
    "A stone here marks the geographical centre of India, and the city grew as the crossroads of the rail network. Its oranges are grown on the volcanic soil of the surrounding plateau.|Una piedra marca aquí el centro geográfico de la India, y la ciudad creció como cruce ferroviario. Sus naranjas crecen en el suelo volcánico de la meseta.|Une borne y marque le centre géographique de l'Inde, et la ville grandit comme carrefour ferroviaire. Ses oranges poussent sur le sol volcanique du plateau.|ここにはインドの地理的中心を示す石があり、鉄道網の十字路として街は育った。周囲の高原の火山性土壌が名産の蜜柑を育てる。",
    [prop("Orange Market|Mercado de naranjas|Marché aux oranges|蜜柑市場", 270, 56),
     prop("Zero Mile Stone|Piedra del kilómetro cero|Borne du point zéro|ゼロ・マイル標石", 240, 50)],
  ),
  hyderabad: city(
    "Hyderabad|Hyderabad|Hyderabad|ハイダラーバード",
    78.47, 17.39, "dec", "masjid", "megacity", "r",
    "Pearls, biryani and diamonds|Perlas, biryani y diamantes|Perles, biryani et diamants|真珠とビリヤニとダイヤ",
    "For centuries every famous Indian diamond, including the Koh-i-Noor, passed through its mines and markets. Its last Nizam was once reckoned the richest man in the world.|Durante siglos todos los diamantes indios famosos, incluido el Koh-i-Noor, pasaron por sus minas y mercados. Su último nizam fue considerado el hombre más rico del mundo.|Des siècles durant, tous les diamants indiens célèbres, dont le Koh-i-Noor, passèrent par ses mines et ses marchés. Son dernier nizam fut réputé l'homme le plus riche du monde.|コ・イ・ヌールを含む名だたるインドのダイヤは、何世紀もこの地の鉱山と市場を通った。最後のニザーム(藩王)はかつて世界一の富豪と目された。",
    [prop("Pearl Bazaar|Bazar de perlas|Bazar aux perles|真珠のバザール", 310, 64),
     prop("Four Minaret Arch|Arco de los cuatro minaretes|Arc aux quatre minarets|四塔の門", 300, 62)],
  ),
  goa: city(
    "Goa|Goa|Goa|ゴア",
    73.83, 15.5, "dec", "dhow", "arabianport", "l",
    "Portuguese for 450 years|Portuguesa durante 450 años|Portugaise pendant 450 ans|450年のポルトガル領",
    "Goa was Portuguese from 1510 until 1961, fourteen years after the rest of India became independent. Its churches, bread and vinegar-based cooking all date from that long separation.|Goa fue portuguesa de 1510 a 1961, catorce años después de la independencia del resto de la India. Sus iglesias, su pan y su cocina al vinagre vienen de esa larga separación.|Goa fut portugaise de 1510 à 1961, quatorze ans après l'indépendance du reste de l'Inde. Ses églises, son pain et sa cuisine au vinaigre datent de cette longue séparation.|ゴアは1510年から1961年までポルトガル領で、インドの他地域の独立から14年遅れて統合された。教会もパンも酢を使う料理も、その長い分離の産物である。",
    [prop("Whitewashed Basilica|Basílica encalada|Basilique blanchie|白亜のバシリカ", 300, 62),
     prop("Beach Shack Row|Chiringuitos de playa|Paillotes de plage|浜の食堂の並び", 280, 58)],
  ),

  // ---------------------------------------------------------------------
  // sou — 南インド
  // ---------------------------------------------------------------------
  bengaluru: city(
    "Bengaluru|Bengaluru|Bengaluru|ベンガルール",
    77.59, 12.97, "sou", "rocket", "citypark", "r",
    "Gardens, then satellites|Jardines, luego satélites|Des jardins, puis des satellites|庭園の街から宇宙の街へ",
    "Its mild highland climate made it a city of gardens and retirees, then of India's space and software industries. A mission designed here reached Mars in 2014 on its first attempt.|Su clima templado de altiplano la hizo ciudad de jardines y jubilados, y luego del espacio y el software indios. Una misión diseñada aquí llegó a Marte en 2014 al primer intento.|Son climat doux d'altitude en fit une ville de jardins et de retraités, puis du spatial et du logiciel indiens. Une mission conçue ici atteignit Mars en 2014 du premier coup.|高原の穏やかな気候から庭園と隠居の街となり、やがてインドの宇宙開発とソフトウェアの街になった。ここで設計された探査機は2014年、一度目の挑戦で火星に到達した。",
    [prop("Botanical Glasshouse|Invernadero botánico|Serre botanique|植物園の温室", 290, 60),
     prop("Satellite Campus|Campus de satélites|Campus satellitaire|人工衛星の研究所", 340, 70)],
  ),
  mysuru: city(
    "Mysuru|Mysore|Mysore|マイソール",
    76.64, 12.3, "sou", "elephant", "lakepalace", "l",
    "A palace lit by 100,000 bulbs|Un palacio con 100.000 bombillas|Un palais aux 100 000 ampoules|十万の電球で灯る宮殿",
    "Every Sunday evening and through the Dasara festival the palace is outlined by around 100,000 lamps. The city's sandalwood soap and silk have been made under royal patronage since 1916.|Cada domingo por la tarde y durante el Dasara, el palacio se perfila con unas 100.000 luces. Su jabón de sándalo y su seda se fabrican con patrocinio real desde 1916.|Chaque dimanche soir et pendant Dasara, le palais est souligné par quelque 100 000 lampes. Son savon de santal et sa soie sont produits sous patronage royal depuis 1916.|毎週日曜の夕べとダサラ祭の間、宮殿は約10万個の電球で輪郭を描かれる。白檀石鹸と絹は1916年以来、王家の後援のもとで作られている。",
    [prop("Illuminated Palace|Palacio iluminado|Palais illuminé|灯りの宮殿", 330, 68),
     prop("Sandalwood Works|Fábrica de sándalo|Fabrique de santal|白檀工場", 280, 58)],
  ),
  hampi: city(
    "Hampi|Hampi|Hampi|ハンピ",
    76.46, 15.34, "sou", "gopuramark", "cavetemple", "r",
    "A ruined capital among boulders|Una capital en ruinas entre rocas|Une capitale en ruine parmi les rochers|巨岩の間の廃都",
    "Vijayanagara was among the largest cities in the world in 1500, with markets where diamonds were sold by the measure. It was sacked in 1565 and never rebuilt; its stone ruins run for 25 km².|Vijayanagara fue de las mayores ciudades del mundo en 1500, con mercados donde los diamantes se vendían a medida. Saqueada en 1565, nunca se reconstruyó; sus ruinas cubren 25 km².|Vijayanagara comptait parmi les plus grandes villes du monde en 1500, avec des marchés où les diamants se vendaient à la mesure. Pillée en 1565, jamais rebâtie, ses ruines couvrent 25 km².|ヴィジャヤナガルは1500年頃、世界有数の大都市で、市場ではダイヤが升で売られたという。1565年に略奪され再建されず、石の廃墟が25km²にわたって残る。",
    [prop("Stone Chariot Court|Patio del carro de piedra|Cour du char de pierre|石の山車の広場", 300, 62),
     prop("Boulder Bazaar Street|Calle bazar entre rocas|Rue-bazar des rochers|岩間のバザール通り", 260, 54)],
  ),
  mangaluru: city(
    "Mangaluru|Mangalore|Mangalore|マンガロール",
    74.86, 12.91, "sou", "dhow", "arabianport", "l",
    "Roof tiles that reached Rangoon|Tejas que llegaron a Rangún|Des tuiles jusqu'à Rangoon|ラングーンまで届いた瓦",
    "Its red clay roof tiles, first made by German missionaries in the 1860s, once covered buildings across South and Southeast Asia. Cashews, coffee and pepper still leave through its port.|Sus tejas de arcilla roja, hechas por misioneros alemanes desde 1860, cubrieron edificios en todo el sur y sureste de Asia. Anacardos, café y pimienta aún salen por su puerto.|Ses tuiles d'argile rouge, produites par des missionnaires allemands dès 1860, couvrirent des bâtiments dans toute l'Asie du Sud et du Sud-Est. Noix de cajou, café et poivre partent encore de son port.|1860年代にドイツ人宣教師が始めた赤い粘土瓦は、かつて南アジア・東南アジア一帯の建物を覆った。カシューナッツ・珈琲・胡椒は今もこの港から出てゆく。",
    [prop("Tile Kiln|Tejar|Tuilerie|瓦の窯", 270, 56),
     prop("Cashew Godown|Almacén de anacardos|Entrepôt de cajou|カシューの倉庫", 250, 52)],
  ),
  kochi: city(
    "Kochi|Cochín|Cochin|コチ",
    76.27, 9.93, "sou", "dhow", "arabianport", "l",
    "Where the spice trade began|Donde empezó el comercio de especias|Où naquit le commerce des épices|香辛料交易の始まった港",
    "Roman, Arab, Chinese, Portuguese, Dutch and British traders all came for the pepper of this coast. A synagogue here has been in use since 1568, and the fishing nets are Chinese in design.|Romanos, árabes, chinos, portugueses, holandeses y británicos vinieron por la pimienta de esta costa. Una sinagoga funciona desde 1568 y las redes de pesca son de diseño chino.|Romains, Arabes, Chinois, Portugais, Néerlandais et Britanniques vinrent pour le poivre de cette côte. Une synagogue y sert depuis 1568 et les filets de pêche sont d'origine chinoise.|ローマ・アラブ・中国・ポルトガル・オランダ・英国の商人が、この海岸の胡椒を求めて来た。1568年から使われ続けるシナゴーグがあり、漁網は中国伝来の形をしている。",
    [prop("Chinese Fishing Net|Red de pesca china|Filet de pêche chinois|中華漁網", 280, 58),
     prop("Pepper Warehouse|Almacén de pimienta|Entrepôt de poivre|胡椒の倉庫", 300, 62)],
  ),
  munnar: city(
    "Munnar|Munnar|Munnar|ムンナール",
    77.06, 10.09, "sou", "tealeaf", "teagarden", "r",
    "Hills that flower once in twelve years|Colinas que florecen cada doce años|Des collines fleurissant tous les douze ans|十二年に一度咲く丘",
    "Tea covers these slopes at 1,600 m, planted by the British in the 1880s. Every twelfth year the neelakurinji shrub blooms and turns whole hillsides blue — last seen in 2018.|El té cubre estas laderas a 1.600 m, plantado por los británicos en 1880. Cada doce años florece el neelakurinji y azulea laderas enteras: la última vez en 2018.|Le thé couvre ces pentes à 1 600 m, planté par les Britanniques vers 1880. Tous les douze ans, le neelakurinji fleurit et bleuit des versants entiers — la dernière fois en 2018.|標高1600mの斜面を、1880年代に英国人が植えた茶が覆う。12年に一度ニーラクリンジが咲き、丘全体が青く染まる。前回は2018年だった。",
    [prop("High Range Tea Estate|Finca de té de altura|Domaine de thé d'altitude|高地の茶園", 300, 62),
     prop("Cardamom Hill Store|Almacén de cardamomo|Dépôt de cardamome|カルダモンの丘の倉", 260, 54)],
  ),
  madurai: city(
    "Madurai|Madurai|Madurai|マドゥライ",
    78.12, 9.93, "sou", "gopuramark", "gopuram", "r",
    "A temple with 33,000 sculptures|Un templo con 33.000 esculturas|Un temple aux 33 000 sculptures|三万三千の彫像の寺",
    "The Meenakshi temple's fourteen towers are covered in painted figures repainted every twelve years. The city has been continuously inhabited for at least 2,500 years and lays out its streets in squares around the temple.|Las catorce torres del templo Meenakshi se cubren de figuras repintadas cada doce años. La ciudad lleva al menos 2.500 años habitada y traza sus calles en cuadrados en torno al templo.|Les quatorze tours du temple de Meenakshi sont couvertes de figures repeintes tous les douze ans. La ville est habitée depuis au moins 2 500 ans et dispose ses rues en carrés autour du temple.|ミーナークシ寺院の14の塔門は彩色像で覆われ、12年ごとに塗り直される。少なくとも2500年住み継がれ、街路は寺を中心に同心の四角形に走る。",
    [prop("Painted Tower Gate|Puerta de la torre pintada|Porte de la tour peinte|彩色の塔門", 320, 66),
     prop("Flower Market|Mercado de flores|Marché aux fleurs|花市場", 270, 56)],
  ),
  rameswaram: city(
    "Rameswaram|Rameswaram|Rameswaram|ラーメーシュワラム",
    79.31, 9.29, "sou", "gopuramark", "arabianport", "r",
    "A corridor 200 metres long|Un corredor de 200 metros|Un couloir de 200 mètres|二百メートルの回廊",
    "Its temple has the longest pillared corridor of any in India, and pilgrims bathe at 22 wells inside. Beyond the island a chain of sandbanks runs towards Sri Lanka, only 30 km away.|Su templo tiene el corredor con columnas más largo de la India y los peregrinos se bañan en 22 pozos. Tras la isla, bancos de arena se alinean hacia Sri Lanka, a sólo 30 km.|Son temple possède le plus long couloir à colonnes d'Inde et les pèlerins s'y baignent à 22 puits. Au-delà de l'île, des bancs de sable filent vers le Sri Lanka, à 30 km.|寺院はインドで最も長い列柱回廊を持ち、巡礼は境内の22の井戸で沐浴する。島の先には砂州の連なりが、わずか30km先のスリランカへ向かって伸びる。",
    [prop("Pillared Corridor|Corredor de columnas|Couloir à colonnes|列柱の回廊", 300, 62),
     prop("Fishing Harbour|Puerto pesquero|Port de pêche|漁港", 240, 50)],
  ),
  kanyakumari: city(
    "Kanyakumari|Kanyakumari|Kanyakumari|カニヤークマリ",
    77.54, 8.09, "sou", "lotus", "arabianport", "l",
    "Three seas at the land's end|Tres mares en el fin de la tierra|Trois mers au bout des terres|三つの海が出会う南端",
    "At India's southern tip the Arabian Sea, Bay of Bengal and Indian Ocean meet, and on a full-moon night in April you can watch the sun set and the moon rise together.|En la punta sur de la India se juntan el mar Arábigo, el golfo de Bengala y el océano Índico; en luna llena de abril se ve ponerse el sol y salir la luna a la vez.|À la pointe sud de l'Inde se rencontrent la mer d'Arabie, le golfe du Bengale et l'océan Indien ; à la pleine lune d'avril, on voit le soleil se coucher et la lune se lever ensemble.|インド最南端でアラビア海・ベンガル湾・インド洋が出会う。4月の満月の夜には、日の入りと月の出を同時に見ることができる。",
    [prop("Sunrise Viewpoint|Mirador del amanecer|Belvédère de l'aurore|日の出の展望台", 260, 54),
     prop("Rock Memorial Ferry|Ferry al monumento|Bac du mémorial|岩上の記念堂への渡し", 280, 58)],
  ),
  thanjavur: city(
    "Thanjavur|Tanjore|Tanjore|タンジャーヴール",
    79.14, 10.79, "sou", "gopuramark", "gopuram", "l",
    "A tower whose shadow never falls|Una torre cuya sombra no cae|Une tour dont l'ombre ne tombe jamais|影の落ちない塔",
    "The Brihadisvara temple was finished in 1010 with a 66 m tower capped by an 80-tonne stone. Local lore says its shadow never falls on the ground at noon.|El templo Brihadisvara se terminó en 1010, con una torre de 66 m coronada por una piedra de 80 toneladas. Se dice que su sombra nunca toca el suelo al mediodía.|Le temple de Brihadisvara fut achevé en 1010, sa tour de 66 m coiffée d'une pierre de 80 tonnes. On dit que son ombre ne touche jamais le sol à midi.|ブリハディーシュヴァラ寺院は1010年に完成し、66mの塔の頂に80トンの石を載せる。正午にその影が地に落ちることは無いと言い伝えられる。",
    [prop("Great Temple Tower|Torre del gran templo|Tour du grand temple|大寺院の塔", 320, 66),
     prop("Bronze Casting Yard|Taller de bronces|Fonderie de bronze|青銅鋳造の工房", 270, 56)],
  ),
  pondicherry: city(
    "Puducherry|Pondicherry|Pondichéry|プドゥチェリー",
    79.83, 11.93, "sou", "gateway", "arabianport", "r",
    "French street names by the Bay of Bengal|Calles francesas junto al golfo de Bengala|Des rues françaises au bord du golfe|ベンガル湾のフランス語の街路",
    "French from 1674 to 1954, the old town still has rue names, yellow walls and a police kepi. An experimental township north of the city was founded in 1968 for people of all nations to live without money.|Francesa de 1674 a 1954, su casco viejo conserva nombres de rue, muros amarillos y quepis policiales. Al norte, una ciudad experimental de 1968 acoge a gentes de todas las naciones sin dinero.|Française de 1674 à 1954, la vieille ville garde ses noms de rue, ses murs jaunes et le képi des policiers. Au nord, une cité expérimentale fondée en 1968 accueille toutes les nations, sans argent.|1674年から1954年までフランス領で、旧市街には今も rue の街路名・黄色い壁・警官の制帽が残る。北には1968年に創られた、貨幣を使わず万国の人が暮らす実験都市がある。",
    [prop("Yellow Colonial Villa|Villa colonial amarilla|Villa coloniale jaune|黄色い植民地時代の館", 290, 60),
     prop("Seafront Promenade|Paseo marítimo|Promenade du front de mer|海辺の遊歩道", 260, 54)],
  ),
  mahabalipuram: city(
    "Mahabalipuram|Mahabalipuram|Mahabalipuram|マハーバリプラム",
    80.19, 12.62, "sou", "gopuramark", "cavetemple", "r",
    "Temples carved from the beach itself|Templos tallados en la propia playa|Des temples taillés dans la plage|浜の岩を彫った寺",
    "Seventh-century Pallava sculptors carved whole shrines out of single granite outcrops on the shore. A relief here, 30 m wide, is among the largest open-air rock carvings in the world.|Escultores pallava del siglo VII tallaron santuarios enteros en afloramientos de granito junto al mar. Un relieve de 30 m es de los mayores grabados rupestres al aire libre del mundo.|Des sculpteurs pallava du VIIe siècle taillèrent des sanctuaires entiers dans des blocs de granit du rivage. Un relief de 30 m compte parmi les plus vastes gravures rupestres à ciel ouvert.|7世紀パッラヴァ朝の石工は、海辺の花崗岩の露頭ひとつから祠を丸ごと彫り出した。幅30mの浮彫は、世界最大級の野外岩面彫刻である。",
    [prop("Shore Temple|Templo de la orilla|Temple du rivage|海岸寺院", 300, 62),
     prop("Granite Carvers' Yard|Taller de canteros|Atelier des tailleurs|石工の作業場", 250, 52)],
  ),
  chennai: city(
    "Chennai|Chennai|Chennai|チェンナイ",
    // 岸ちょうどに置くと、マーカーの押し離しで海側へ出てしまう。少し内陸に寄せる。
    80.18, 13.08, "sou", "gopuramark", "megacity", "r",
    "The first English foothold in India|El primer asentamiento inglés en la India|Le premier comptoir anglais en Inde|英国最初の拠点",
    "The East India Company bought a strip of sand here in 1639 and built Fort St George, the first English settlement in India. The city's beach is one of the longest urban beaches in the world.|La Compañía de las Indias compró aquí una franja de arena en 1639 y alzó Fort St George, el primer asentamiento inglés en la India. Su playa urbana es de las más largas del mundo.|La Compagnie des Indes acheta ici une bande de sable en 1639 et bâtit Fort St George, premier établissement anglais en Inde. Sa plage urbaine est l'une des plus longues du monde.|東インド会社は1639年にここの砂州を買い、インド最初の英国人居留地セント・ジョージ砦を築いた。市の浜は世界有数の長さを持つ都市の砂浜である。",
    [prop("Fort Trading House|Casa de comercio|Comptoir du fort|砦の商館", 310, 64),
     prop("Marina Beach Front|Frente de playa|Front de plage|マリーナ・ビーチ", 290, 60)],
  ),
  visakhapatnam: city(
    "Visakhapatnam|Visakhapatnam|Visakhapatnam|ヴィシャーカパトナム",
    83.3, 17.69, "sou", "loco", "arabianport", "r",
    "A natural harbour among hills|Un puerto natural entre colinas|Un port naturel entre les collines|丘に囲まれた天然の良港",
    "Hills shelter one of India's few deep natural harbours, which made it the navy's eastern base. A million-year-old limestone cave system lies an hour inland.|Las colinas resguardan uno de los pocos puertos naturales profundos de la India, base naval del este. A una hora tierra adentro hay cuevas calizas de un millón de años.|Des collines abritent l'un des rares ports naturels profonds d'Inde, base navale de l'Est. À une heure dans les terres s'ouvrent des grottes calcaires d'un million d'années.|丘に守られたインド有数の天然の深水港で、海軍東方の基地となった。内陸へ1時間のところに百万年前の石灰洞窟群がある。",
    [prop("Naval Dockyard|Astillero naval|Arsenal naval|海軍工廠", 300, 62),
     prop("Limestone Caves|Cuevas de caliza|Grottes calcaires|石灰洞窟", 250, 52)],
  ),
  kavaratti: city(
    "Kavaratti|Kavaratti|Kavaratti|カヴァラッティ",
    72.64, 10.57, "sou", "dhow", "arabianport", "l",
    "Thirty-six atolls, ten inhabited|Treinta y seis atolones, diez habitados|Trente-six atolls, dix habités|三十六の環礁、住むのは十",
    "India's smallest territory is a scatter of coral atolls 400 km off the Kerala coast. Only ten are inhabited, and visitors need a permit to land on any of them.|El territorio más pequeño de la India es un rosario de atolones a 400 km de Kerala. Sólo diez están habitados y hace falta permiso para desembarcar.|Le plus petit territoire indien est un chapelet d'atolls à 400 km du Kerala. Dix seulement sont habités et un permis est requis pour y débarquer.|インド最小の連邦直轄領で、ケーララ沖400kmに散らばる珊瑚環礁群。人が住むのは10島だけで、上陸には許可が要る。",
    [prop("Lagoon Diving Base|Base de buceo|Base de plongée|礁湖のダイビング拠点", 280, 58),
     prop("Coir Rope Works|Fábrica de cuerda de coco|Corderie de coco|ヤシ繊維のロープ工場", 230, 48)],
  ),

  // ---------------------------------------------------------------------
  // eas — 東部・北東部
  // ---------------------------------------------------------------------
  kolkata: city(
    "Kolkata|Calcuta|Calcutta|コルカタ",
    88.36, 22.57, "eas", "domewhite", "megacity", "l",
    "The empire's capital until 1911|Capital del imperio hasta 1911|Capitale de l'empire jusqu'en 1911|1911年までの帝都",
    "British India was run from here for 138 years before the capital moved to Delhi. The city still runs Asia's oldest operating tram network and prints more books in Bengali than anywhere.|La India británica se gobernó desde aquí 138 años antes de trasladar la capital a Delhi. Conserva la red de tranvías más antigua de Asia en servicio.|L'Inde britannique fut gouvernée d'ici 138 ans avant le transfert de la capitale à Delhi. La ville exploite encore le plus ancien réseau de tramways d'Asie.|英領インドは138年にわたりここから統治され、その後デリーへ遷都した。アジア最古の現役路面電車網が今も走り、ベンガル語の書物を世界で最も多く刷る。",
    [prop("Marble Memorial Hall|Salón conmemorativo|Mémorial de marbre|大理石の記念堂", 320, 66),
     prop("Tram Depot|Cochera de tranvías|Dépôt de tramways|市電の車庫", 270, 56)],
  ),
  bhubaneswar: city(
    "Bhubaneswar|Bhubaneswar|Bhubaneswar|ブバネーシュワル",
    85.82, 20.3, "eas", "shikhara", "cavetemple", "r",
    "Once a thousand temples|Antaño mil templos|Jadis mille temples|かつて千の寺があった",
    "The city is said to have had over a thousand temples, of which several hundred survive in a single district. A nearby rock edict of Ashoka records his remorse after the Kalinga war of 261 BCE.|Se dice que tuvo más de mil templos, de los que quedan varios cientos en un solo barrio. Un edicto de Ashoka cercano recoge su arrepentimiento tras la guerra de Kalinga del 261 a.C.|On dit qu'elle compta plus de mille temples, dont plusieurs centaines subsistent dans un seul quartier. Un édit d'Ashoka voisin consigne son remords après la guerre du Kalinga en 261 av. J.-C.|かつて千を超える寺院があったと伝わり、その数百がひとつの地区に今も残る。近くのアショーカ王の磨崖碑には、紀元前261年カリンガ戦争後の悔恨が刻まれている。",
    [prop("Temple Precinct|Recinto de templos|Enceinte des temples|寺院の境内", 290, 60),
     prop("Rock Edict Site|Sitio del edicto|Site de l'édit|磨崖碑", 250, 52)],
  ),
  puri: city(
    "Puri|Puri|Puri|プリー",
    85.83, 19.81, "eas", "shikhara", "arabianport", "r",
    "Chariots that give us a word|Carros que nos dieron una palabra|Des chars qui ont donné un mot|「ジャガーノート」の語源",
    "Each year three enormous chariots are hauled through the streets by thousands of pilgrims; the English word juggernaut comes from the deity's name. Nearby stands a 13th-century temple built as a stone sun-chariot.|Cada año miles de peregrinos arrastran tres carros enormes; la palabra inglesa juggernaut viene del nombre de la deidad. Cerca se alza un templo del siglo XIII con forma de carro solar.|Chaque année, des milliers de pèlerins tirent trois chars immenses ; le mot anglais juggernaut vient du nom de la divinité. Non loin s'élève un temple du XIIIe siècle en forme de char solaire.|毎年、巨大な三台の山車を何千もの巡礼が引く。英語の juggernaut はこの神の名に由来する。近くには13世紀の、石の太陽の車として建てられた寺院がある。",
    [prop("Chariot Workshop|Taller de carros|Atelier des chars|山車の工房", 290, 60),
     prop("Sun Temple Wheel|Rueda del templo del Sol|Roue du temple du Soleil|太陽寺院の車輪", 300, 62)],
  ),
  guwahati: city(
    "Guwahati|Guwahati|Guwahati|グワハーティ",
    91.75, 26.14, "eas", "shikhara", "wetland", "l",
    "The gate to the seven sisters|La puerta de las siete hermanas|La porte des sept sœurs|七姉妹州の門",
    "Everything bound for India's north-east passes through here, on a Brahmaputra so wide that ferries take an hour. The river holds Umananda, said to be the smallest inhabited river island in the world.|Todo lo que va al noreste indio pasa por aquí, sobre un Brahmaputra tan ancho que el ferry tarda una hora. En él está Umananda, la isla fluvial habitada más pequeña del mundo.|Tout ce qui va vers le nord-est indien passe ici, sur un Brahmapoutre si large que le bac met une heure. Il abrite Umananda, dite la plus petite île fluviale habitée du monde.|インド北東部へ向かうものはすべてここを通る。ブラマプトラ川は渡し船で1時間かかるほど広い。川中のウマナンダ島は世界最小の有人河中島とされる。",
    [prop("River Island Shrine|Santuario de la isla|Sanctuaire de l'île|川中島の祠", 270, 56),
     prop("Silk Weaving Village|Aldea de la seda|Village de la soie|絹織りの村", 260, 54)],
  ),
  kaziranga: city(
    "Kaziranga|Kaziranga|Kaziranga|カジランガ",
    93.37, 26.58, "eas", "rhino", "wetland", "r",
    "Two thirds of the world's rhinos|Dos tercios de los rinocerontes del mundo|Deux tiers des rhinocéros du monde|世界の犀の三分の二",
    "This grassland holds about two thirds of all one-horned rhinoceroses alive, brought back from under 20 animals a century ago. The park floods every monsoon and the animals swim to higher ground.|Esta pradera alberga unos dos tercios de los rinocerontes de un cuerno vivos, recuperados desde menos de 20 hace un siglo. El parque se inunda cada monzón y los animales nadan a tierras altas.|Cette prairie abrite environ deux tiers des rhinocéros unicornes vivants, remontés de moins de 20 individus il y a un siècle. Le parc s'inonde à chaque mousson et les bêtes gagnent les hauteurs à la nage.|この草原には現存する一角犀のおよそ3分の2が棲む。一世紀前には20頭を切っていた。モンスーンごとに冠水し、動物たちは泳いで高台へ移る。",
    [prop("Grassland Watchtower|Torre de observación|Mirador de la prairie|草原の監視塔", 280, 58),
     prop("Elephant Safari Camp|Campamento de safari|Camp de safari|象のサファリ拠点", 300, 62)],
  ),
  shillong: city(
    "Shillong|Shillong|Shillong|シロン",
    91.88, 25.58, "eas", "tealeaf", "teagarden", "l",
    "Bridges grown from living roots|Puentes de raíces vivas|Des ponts de racines vivantes|生きた根で編んだ橋",
    "Villagers here train fig tree roots across streams for decades until they form bridges strong enough to walk on. The wettest places on earth by annual rainfall are a short drive away.|Los aldeanos guían durante décadas raíces de higuera sobre los arroyos hasta formar puentes transitables. Los lugares más lluviosos del planeta están a poca distancia.|Les villageois guident des racines de figuier au-dessus des ruisseaux pendant des décennies jusqu'à former des ponts praticables. Les lieux les plus pluvieux du globe sont tout près.|村人は数十年かけてイチジクの根を谷にわたらせ、人が渡れる橋に育てる。年間降水量で世界一雨の多い場所が近くにある。",
    [prop("Living Root Bridge|Puente de raíces|Pont de racines|生きた根の橋", 300, 62),
     prop("Cherry Blossom Ridge|Cresta de los cerezos|Crête des cerisiers|桜の尾根", 260, 54)],
  ),
  portblair: city(
    "Port Blair|Port Blair|Port Blair|ポートブレア",
    92.74, 11.62, "eas", "dhow", "arabianport", "r",
    "A prison at the end of the sea|Una prisión al final del mar|Un bagne au bout de la mer|海の果ての監獄",
    "The British built a cellular jail here to hold independence campaigners 1,200 km from the mainland. Some of the islands beyond are home to peoples who have refused all contact with the outside world.|Los británicos alzaron aquí una cárcel celular para independentistas, a 1.200 km del continente. En islas más allá viven pueblos que rechazan todo contacto exterior.|Les Britanniques y bâtirent une prison cellulaire pour les indépendantistes, à 1 200 km du continent. Au-delà vivent des peuples qui refusent tout contact avec l'extérieur.|英国は本土から1200km離れたこの地に、独立運動家を収容する独房監獄を築いた。さらに先の島々には、外界との接触を一切拒む人々が暮らしている。",
    [prop("Cellular Jail|Cárcel celular|Prison cellulaire|独房監獄", 280, 58),
     prop("Coral Reef Boat|Barco del arrecife|Bateau du récif|珊瑚礁の船", 260, 54)],
  ),
};

/**
 * 路線。インド国鉄の幹線をなぞりつつ、盤面として一周できるようにつないでいる。
 * 第3要素 `"sea"` は航路(島や沿岸の連絡船)。
 */
export const INDIA_EDGES = [
  // 北部の山へ
  ["delhi", "amritsar"],
  ["delhi", "chandigarh"],
  ["chandigarh", "shimla"],
  ["chandigarh", "dharamshala"],
  ["dharamshala", "srinagar"],
  ["srinagar", "leh"],
  ["delhi", "haridwar"],
  ["haridwar", "rishikesh"],
  // ガンジス平原を東へ
  ["delhi", "agra"],
  ["agra", "gwalior"],
  ["gwalior", "khajuraho"],
  ["khajuraho", "varanasi"],
  ["gwalior", "bhopal"],
  ["delhi", "lucknow"],
  ["lucknow", "prayagraj"],
  ["prayagraj", "varanasi"],
  ["varanasi", "patna"],
  ["patna", "bodhgaya"],
  ["patna", "kolkata"],
  ["bodhgaya", "kolkata"],
  // 砂漠・西部
  ["delhi", "jaipur"],
  ["jaipur", "bikaner"],
  ["jaipur", "jodhpur"],
  ["jodhpur", "jaisalmer"],
  ["jodhpur", "bikaner"],
  ["jodhpur", "udaipur"],
  ["udaipur", "ahmedabad"],
  // ドワールカー行きは、この並び順だと経路がカッチ湾を斜めに横切る。
  // 順を入れ替えて、サウラーシュトラ半島を横に抜ける引き方にする。
  ["ahmedabad", "dwarka"],
  ["ahmedabad", "bhuj"],
  ["ahmedabad", "surat"],
  ["ahmedabad", "indore"],
  ["surat", "mumbai"],
  // デカン
  ["mumbai", "pune"],
  ["mumbai", "nashik"],
  ["nashik", "aurangabad"],
  ["aurangabad", "hyderabad"],
  ["indore", "bhopal"],
  ["bhopal", "nagpur"],
  ["nagpur", "hyderabad"],
  ["nagpur", "bhubaneswar"],
  ["pune", "goa"],
  // 南インド
  ["goa", "mangaluru"],
  ["goa", "hampi"],
  ["hampi", "bengaluru"],
  ["hyderabad", "bengaluru"],
  ["bengaluru", "mysuru"],
  ["mysuru", "kochi"],
  ["mangaluru", "kochi"],
  ["kochi", "munnar"],
  ["munnar", "madurai"],
  ["kochi", "kanyakumari"],
  ["kanyakumari", "madurai"],
  ["madurai", "rameswaram"],
  ["madurai", "thanjavur"],
  ["thanjavur", "pondicherry"],
  ["pondicherry", "mahabalipuram"],
  ["mahabalipuram", "chennai"],
  ["chennai", "bengaluru"],
  // チェンナイ〜ヴィシャーカパトナムは、実際の東海岸本線が内陸のヴィジャヤワーダを
  // 大きく迂回する。縦・横・45度で引くと必ずベンガル湾を横切ってしまうので、
  // ここは沿岸航路として扱う(どちらも大きな港町)。
  ["chennai", "visakhapatnam", "sea"],
  ["visakhapatnam", "puri"],
  ["puri", "bhubaneswar"],
  ["bhubaneswar", "kolkata"],
  // 東部・北東部
  ["kolkata", "darjeeling"],
  ["darjeeling", "gangtok"],
  ["kolkata", "guwahati"],
  ["guwahati", "shillong"],
  ["guwahati", "kaziranga"],
  ["kaziranga", "tawang"],
  // 航路
  ["mumbai", "goa", "sea"],
  ["mumbai", "dwarka", "sea"],
  ["kochi", "kavaratti", "sea"],
  ["chennai", "portblair", "sea"],
];
