/**
 * ペルーの都市と路線(フェーズ1・5都市の下書き)。
 *
 * ## この盤面の芯
 *
 * 「鉄道は、人の体より先に山を登ってしまった」。
 * 中央鉄道(Ferrocarril Central Andino, 1870年着工)は標高4,700〜4,800m台の
 * ガレラ・トンネルを通り、2000年代に青蔵鉄道(チベット)へ記録を譲るまで、
 * 世界でいちばん高い所を走る標準軌の鉄道だった。人を運ぶためではなく、
 * セロ・デ・パスコやラ・オロヤの鉱石を港(カヤオ)まで下ろすために敷かれ、
 * いまも観光列車は高山病に備えて酸素を積む。ボリビアの盤面(アルティプラーノ・
 * 銀鉱山・コカ・チチカカ湖の巡礼)と題材が重ならないよう、この盤面は
 * 「標高そのものを克服するための技術と犠牲」を軸に選んでいる
 * (製錬・露天掘り・道の無いアマゾン・アンデスを越えて運ばれた鉄船)。
 *
 * ## 投影(提案・未確定)
 *
 * 経度-81.4〜-68.6度(西→東)、緯度-0.0〜-18.4度(北→南)。
 * 経度幅12.8度・緯度幅18.4度、平均緯度-9.2度の cos(≒0.987)を掛けると
 * 横/縦 ≒ 0.694×0.987 ≒ 0.688。都市46件・1件あたり約90,000px²の密度に
 * 合わせると BH≒2450 / BW≒1690(`geography.mjs` はまだ書いていない)。
 *
 * ## 地方コード(4区分・提案)
 *
 * `co` 海岸(コスタ) / `si` 山地(シエラ、中央・北部アンデス) /
 * `se` 熱帯林(セルバ、アマゾン) / `al` 高原南部(アルティプラーノ、プーノ側)。
 *
 * ## この5都市で使う `mark` / `bg`(下書き。絵は別担当)
 *
 * | 都市 | mark | bg | 理由 |
 * |---|---|---|---|
 * | ラ・オロヤ | `smelter` | `smeltertown` | 製錬所の煙突と分岐駅 |
 * | セロ・デ・パスコ | `openpit` | `minepit` | 町を削る露天掘り |
 * | イキトス | `rivermansion` | `amazonport` | ゴム御殿とタイル、川港 |
 * | プーノ | `ironship` | `titicaca` | ラバで運ばれた鉄船、湖畔 |
 * | カハマルカ | `ransomroom` | `andeanplaza` | 身代金の間、植民地広場 |
 *
 * まだ5都市ぶんしか無いので同じ絵の組み合わせは0組(5組み合わせすべて別)。
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const PERU_CITIES = {
  // ---------------------------------------------------------------------
  // si — 山地(中央アンデス、中央鉄道沿い)
  // ---------------------------------------------------------------------
  laoroya: city(
    "La Oroya|La Oroya|La Oroya|ラ・オロヤ",
    -75.90, -11.53, "si", "smelter", "smeltertown", "r",
    "A smelter town where the railway forks|Una ciudad de fundición donde se bifurca el ferrocarril|Une ville de fonderie où bifurque le chemin de fer|鉄道が分かれる製錬の町",
    "The Ferrocarril Central's line splits here — one branch climbs on to Cerro de Pasco, the other drops into the Mantaro valley — and since 1922 a smelter has processed the ore that comes down both of them. Studies of local children's blood-lead levels were bad enough that an environmental group listed La Oroya among the world's most polluted places in the 2000s, and the plant has stopped and restarted several times since as owners went bankrupt and workers pushed to reopen it for lack of other jobs.|Aquí se bifurca la línea del Ferrocarril Central —un ramal sube hacia Cerro de Pasco, el otro baja al valle del Mantaro— y desde 1922 una fundición procesa el mineral que baja por ambos. Los estudios sobre el plomo en la sangre de los niños fueron tan alarmantes que un grupo ambientalista incluyó a La Oroya entre los lugares más contaminados del mundo en la década de 2000, y la planta se ha detenido y reabierto varias veces desde entonces, entre quiebras de sus dueños y trabajadores que exigían reabrirla por falta de otro empleo.|La ligne du Ferrocarril Central se divise ici — une branche grimpe vers Cerro de Pasco, l'autre descend dans la vallée du Mantaro — et depuis 1922 une fonderie traite le minerai qui en descend des deux côtés. Les études sur le plomb dans le sang des enfants du lieu furent si alarmantes qu'une ONG environnementale classa La Oroya parmi les lieux les plus pollués au monde dans les années 2000, et l'usine s'est arrêtée puis relancée à plusieurs reprises depuis, entre faillites de ses propriétaires et ouvriers réclamant sa réouverture faute d'autre emploi.|中央鉄道の線路はここで分かれ、一方はセロ・デ・パスコへ登り、もう一方はマンタロ渓谷へ下る。1922年から製錬所が両方の線から届く鉱石を処理してきた。子供たちの血中鉛濃度を調べた結果があまりに深刻だったため、環境団体は2000年代にラ・オロヤを世界でも特に汚染された土地の一つに数え、工場は所有者の破産や、他に仕事が無い労働者による再開要求のあいだで、これまで何度も止まっては動いてきた。",
    [prop("Smelter Furnace Block|Nave de fundición|Halle de fonderie|製錬炉の建屋", 260, 54),
     prop("Junction Yard Housing|Barrio del apeadero|Cité cheminote de la bifurcation|分岐駅の社宅", 190, 40)],
  ),
  cerrodepasco: city(
    "Cerro de Pasco|Cerro de Pasco|Cerro de Pasco|セロ・デ・パスコ",
    -76.26, -10.68, "si", "openpit", "minepit", "l",
    "A city the mine is still eating|Una ciudad que la mina sigue devorando|Une ville que la mine continue de dévorer|鉱山がいまも食い進める町",
    "The open pit that has been eating the old town began in 1956, when the mining company dug up the cemetery to reach the silver and zinc beneath it, and the excavation is now close enough to downtown that cracked streets and relocated blocks are routine. At just over 4,300 metres, Cerro de Pasco is among the highest cities of its size anywhere, and mining here predates the pit by three centuries — Spanish colonists were already working silver seams on this same ground in the 1630s.|El tajo abierto que ha ido devorando el pueblo viejo comenzó en 1956, cuando la minera desenterró el cementerio para llegar a la plata y el zinc de debajo, y hoy la excavación está tan cerca del centro que las calles agrietadas y las manzanas reubicadas son cosa de rutina. A poco más de 4.300 metros, Cerro de Pasco está entre las ciudades de su tamaño más altas del mundo, y la minería aquí es anterior al tajo en tres siglos: los colonos españoles ya trabajaban vetas de plata en este mismo suelo en la década de 1630.|La fosse à ciel ouvert qui dévore peu à peu la vieille ville a commencé en 1956, quand la compagnie minière a déterré le cimetière pour atteindre l'argent et le zinc en dessous, et l'excavation est aujourd'hui si proche du centre que rues fissurées et pâtés de maisons déplacés sont chose courante. À un peu plus de 4 300 mètres, Cerro de Pasco est parmi les villes de sa taille les plus hautes au monde, et l'exploitation minière y précède la fosse de trois siècles — les colons espagnols travaillaient déjà des veines d'argent sur ce même sol dans les années 1630.|旧市街を少しずつ飲み込んできた露天掘りの穴は1956年、鉱山会社が地下の銀と亜鉛に届くために墓地を掘り返したところから始まった。いまでは採掘は中心街のすぐそばまで迫り、ひび割れた通りや移転させられた街区は珍しくない。標高4300メートルあまりのセロ・デ・パスコは、この規模の都市としては世界でも屈指の高さにある。採掘そのものは露天掘りより300年古く、スペイン人植民者はすでに1630年代、この同じ地面で銀の鉱脈を掘っていた。",
    [prop("Open-Pit Overlook|Mirador del tajo abierto|Belvédère de la fosse|露天掘りの展望台", 300, 62),
     prop("Relocated Block Housing|Vivienda del barrio reubicado|Logements du quartier déplacé|移転街区の住宅", 210, 44)],
  ),
  cajamarca: city(
    "Cajamarca|Cajamarca|Cajamarca|カハマルカ",
    -78.50, -7.16, "si", "ransomroom", "andeanplaza", "l",
    "The room filled with gold that didn't save him|El cuarto que se llenó de oro y no lo salvó|La pièce remplie d'or qui ne le sauva pas|金で満たしても救われなかった部屋",
    "In 1532 Francisco Pizarro's small force ambushed and captured the Inca emperor Atahualpa in this plaza; to buy his freedom, Atahualpa promised to fill a room once with gold and twice with silver up to a line still marked on the wall, and the ransom was delivered over the following months. The Spanish executed him anyway in July 1533, and the stone-walled chamber said to be that room is the only Inca-era building still standing in the city.|En 1532, la pequeña fuerza de Francisco Pizarro emboscó y capturó al inca Atahualpa en esta plaza; para comprar su libertad, Atahualpa prometió llenar una habitación una vez de oro y dos de plata hasta una línea que aún se marca en el muro, y el rescate se entregó en los meses siguientes. Los españoles lo ejecutaron de todos modos en julio de 1533, y el recinto de piedra que se dice fue esa habitación es la única construcción de época inca que sigue en pie en la ciudad.|En 1532, la petite troupe de Francisco Pizarro tendit une embuscade à l'empereur inca Atahualpa et le captura sur cette place ; pour racheter sa liberté, Atahualpa promit de remplir une pièce une fois d'or et deux fois d'argent jusqu'à une ligne encore marquée sur le mur, et la rançon fut livrée dans les mois qui suivirent. Les Espagnols l'exécutèrent tout de même en juillet 1533, et la salle de pierre que l'on dit être cette pièce est le seul bâtiment d'époque inca encore debout dans la ville.|1532年、フランシスコ・ピサロのわずかな手勢がこの広場でインカ皇帝アタワルパを急襲し捕らえた。命と引き換えに、アタワルパは部屋を金で一杯、銀で二杯、いまも壁に残る線の高さまで満たすと約束し、身代金はその後数か月かけて運び込まれた。それでもスペイン側は1533年7月に彼を処刑した。その部屋とされる石壁の一室は、いまも市内に残る唯一のインカ時代の建物である。",
    [prop("Ransom Chamber Tour|Visita al Cuarto del Rescate|Visite de la salle de la rançon|身代金の間の見学", 380, 78),
     prop("Colonial Plaza Inn|Posada de la plaza colonial|Auberge de la place coloniale|植民地広場の宿", 240, 50)],
  ),

  // ---------------------------------------------------------------------
  // al — 高原南部(プーノ、チチカカ湖畔)
  // ---------------------------------------------------------------------
  puno: city(
    "Puno|Puno|Puno|プーノ",
    -70.02, -15.84, "al", "ironship", "titicaca", "r",
    "A steamship carried over the Andes by mule|Un vapor cruzado por los Andes a lomo de mula|Un vapeur porté à travers les Andes à dos de mule|ラバの背でアンデスを越えた蒸気船",
    "In 1862 a British-built iron steamship was broken into more than 2,700 pieces, shipped around Cape Horn to the Pacific coast, and then hauled over the Andes by mule to be riveted back together on the shore of Lake Titicaca — the only way to reach a port more than 3,800 metres above sea level. Coal never made it up the mountains either, so the Yavarí originally ran on dried llama dung; restored, it is now one of the oldest working iron ships anywhere.|En 1862, un vapor de hierro construido en Gran Bretaña se desarmó en más de 2.700 piezas, se transportó bordeando el cabo de Hornos hasta la costa del Pacífico y luego se llevó a lomo de mula sobre los Andes para remacharlo de nuevo en la orilla del lago Titicaca —única manera de llegar a un puerto a más de 3.800 metros sobre el nivel del mar—. El carbón tampoco subía la montaña, así que el Yavarí funcionó al principio con estiércol seco de llama; restaurado, es hoy uno de los barcos de hierro en funcionamiento más antiguos del mundo.|En 1862, un vapeur en fer construit en Grande-Bretagne fut démonté en plus de 2 700 pièces, transporté par le cap Horn jusqu'à la côte Pacifique, puis hissé à dos de mule à travers les Andes pour être riveté de nouveau sur la rive du lac Titicaca — seul moyen d'atteindre un port situé à plus de 3 800 mètres d'altitude. Le charbon ne montait pas non plus jusque-là, si bien que le Yavarí fonctionna d'abord à la bouse de lama séchée ; restauré, c'est aujourd'hui l'un des plus anciens navires en fer encore en état de marche au monde.|1862年、英国で造られた鉄製の蒸気船は2700個以上の部品に解体され、ホーン岬を回って太平洋岸まで船で運ばれたあと、アンデス山脈をラバの背で越えてチチカカ湖畔まで運ばれ、そこで再び鋲打ちで組み立てられた。標高3800メートルを超える港に届ける方法はそれしかなかった。石炭もこの高さまでは運べなかったため、ヤバリ号は当初、乾かしたリャマの糞を燃料に走った。修復されたいま、世界でも指折りの現役の鉄船として残っている。",
    [prop("Riveted Iron Hull Berth|Atracadero del casco remachado|Mouillage de la coque rivetée|鋲打ち鉄船の係留", 300, 62),
     prop("Lakeside Wool Market|Mercado lanero del lago|Marché de laine du bord du lac|湖畔の毛織物市", 220, 46)],
  ),

  // ---------------------------------------------------------------------
  // se — 熱帯林(アマゾン、イキトス)
  // ---------------------------------------------------------------------
  iquitos: city(
    "Iquitos|Iquitos|Iquitos|イキトス",
    -73.25, -3.74, "se", "rivermansion", "amazonport", "b",
    "The largest city you cannot drive to|La mayor ciudad a la que no se puede llegar en auto|La plus grande ville où l'on ne peut se rendre en voiture|車で行けない最大の都市",
    "No road reaches Iquitos — river boats and planes are the only way in or out — which makes it, by some counts, the largest city on Earth you cannot drive to. Its grandest houses date from the rubber boom around 1900, faced in Portuguese tiles shipped up the Amazon by barons whose fortunes were built on forced indigenous labour so brutal in the nearby Putumayo basin that a British consular investigation called it slavery in 1912.|A Iquitos no llega ninguna carretera —solo se entra o se sale en barco fluvial o avión—, lo que la convierte, según algunos cálculos, en la mayor ciudad del mundo a la que no se puede llegar en auto. Sus casas más suntuosas datan del auge del caucho hacia 1900, revestidas de azulejos portugueses traídos río arriba por barones cuyas fortunas se levantaron sobre un trabajo indígena forzado tan brutal en la cercana cuenca del Putumayo que una investigación consular británica lo llamó esclavitud en 1912.|Aucune route ne mène à Iquitos — on n'y entre et n'en sort que par bateau fluvial ou par avion —, ce qui en fait, selon certains décomptes, la plus grande ville du monde inaccessible en voiture. Ses plus belles demeures datent du boom du caoutchouc, vers 1900, revêtues de carreaux portugais remontés l'Amazone par des barons dont les fortunes reposaient sur un travail indigène forcé si brutal dans le bassin voisin du Putumayo qu'une enquête consulaire britannique le qualifia d'esclavage en 1912.|イキトスには道路が通じていない。出入りは川船か飛行機しかなく、これは「車で行けない世界最大の都市」に数えられることがある。いちばん立派な邸宅群は1900年前後のゴムブーム期のもので、ポルトガル製タイルをアマゾン川づたいに運ばせたゴム成金たちが建てた。その富は近隣プトゥマヨ流域での過酷な先住民強制労働の上に築かれ、1912年に英国領事の調査はそれを奴隷制と呼んだ。",
    [prop("Azulejo-Tiled Rubber Mansion|Mansión cauchera de azulejos|Manoir du caoutchouc aux azulejos|タイル張りのゴム御殿", 340, 70),
     prop("River Port Market Stall|Puesto del puerto fluvial|Étal du port fluvial|川港の市場の屋台", 200, 42)],
  ),
};

/**
 * 路線(下書き)。5都市のうち地理的に隣接し、現に道か線路のある区間だけを
 * いま結んである。残りは全都市が出そろってから、実在する幹線に沿って足す。
 */
export const PERU_EDGES = [
  // 中央鉄道の鉱石支線。実在(ラ・オロヤ—セロ・デ・パスコ)
  ["laoroya", "cerrodepasco"],
];
