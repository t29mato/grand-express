/**
 * コロンビアの都市(承認済み。全都市の記述を進行中)。
 *
 * 2026-08-21、team-leadより芯・扱い・地方5区分を承認。ただし2件、
 * 年号と芯の因果を修正した(下記2都市のコメント参照)。
 * また「音楽は3地方」という当初案内は誤りで、**音楽の数は地方の数と
 * 揃える**のが既存5盤面(ペルー4/4・日本4/4・USA6/6・アフリカ7/7・
 * オセアニア3/3)の実例。5地方=5スタイルで進める。
 *
 * ## この盤面の芯
 *
 * 「川がまず道だった国」。アンデスがコロンビア国内で3本の山脈(コルディジェラ・
 * オクシデンタル/セントラル/オリエンタル)に分かれて並走するため、鉄道は
 * どれも1つの川谷や1つの港を結ぶだけの短い路線としてバラバラに敷かれ、
 * 国全体を1本につなぐ幹線には最後までならなかった。19世紀から20世紀なかば
 * まで、内陸へ入る唯一の実用的な道はマグダレナ川の蒸気船で、鉄道はしばしば
 * 「川の続き」——川の航行を阻む急流や砂州を短く迂回するための枝——として
 * 敷かれた(オンダの急流、プエルト・コロンビアの砂州迂回線)。この構造ゆえに、
 * 首都ボゴタでさえ海までの道のりは川の水位に振り回され続け、それを解消した
 * のが1919年創業のSCADTA(のちのアビアンカ、西半球最古級の航空会社の1つ)
 * だった。国内移動の主役がいまも飛行機であることまで、この芯を通して選んでいる。
 *
 * ## 想定する投影(未確定・団子確認前)
 *
 * 経度-79.1〜-66.9度(西→東、太平洋岸〜東部国境)、緯度12.6〜-4.3度
 * (北→南、プンタ・ガジーナス〜レティシア方面)。サン・アンドレス島・
 * プロビデンシア島(カリブ海、西経81.7度付近)はこの範囲の外にあるため、
 * アメリカ盤のハワイ・アラスカと同じ扱いで**盤面地図には描かず、クイズの
 * 題材としてのみ**扱う予定(要・取りまとめ確認)。
 *
 * 経度幅12.2度・緯度幅16.9度、平均緯度4.15度の cos(≒0.9974)を掛けると
 * 横/縦 ≒ 0.722×0.9974 ≒ 0.720。都市44件・1件あたり約90,000px²の密度に
 * 合わせると BH≒2350 / BW≒1690(ペルーBH=2450とほぼ同スケール)。
 * seg はペルー(BH=2450→seg=70)を仮の目安にしている。**geography.mjs
 * 作成後、実測して確定させる。**
 *
 * ## 地方コード(5区分・仮)
 *
 * `car` カリブ海岸 / `and` アンデス(3山系と間の谷) / `pac` 太平洋岸(チョコ) /
 * `lla` 東部平原(リャノス、オリノコ水系) / `ama` 南部アマゾニア。
 *
 * ## 他盤面との重複について(確認済み)
 *
 * `src/infrastructure/content/{southamerica,venezuela,peru,world}.content.json`
 * のクイズを確認し、次の題材は**既に他盤面の答えとして使われている**ため、
 * この盤面のクイズの答えにはしない(都市カードでの言及は可):
 * - バランキージャのカーニバル(southamerica難6)
 * - チョコの黄金の毒ガエル(southamerica難7)
 * - シモン・ボリバルが死去したコロンビアの港町=サンタ・マルタ(southamerica難8)
 * - ワユー族とグアヒラ半島(southamerica難8・venezuela難5)
 * - グラン・コロンビアの成立(1819)〜分裂年(southamerica難8)
 * - コカ渓谷のワックスヤシと樹高(southamerica難8)
 * また「コーヒー」はブラジル盤・南アメリカ盤と重なりやすいため、この盤面は
 * 川・山脈・空路に寄せている。
 *
 * ## 扱いに気をつけた題材
 *
 * サン・ビセンテ・デル・カグアン(1998〜2002年の非武装地帯)は、和平交渉の
 * 現場という「構造」を描き、戦闘や遺体は描いていない(オセアニア盤の
 * 核実験・海面上昇の扱いにならった)。
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const COLOMBIA_CITIES = {
  // ---------------------------------------------------------------------
  // and — アンデス(3山系と間の谷)
  // ---------------------------------------------------------------------
  honda: city(
    "Honda|Honda|Honda|オンダ",
    -74.7297, 5.2144, "and", "rapidsdock", "riverport", "l",
    "Where the river's rapids handed cargo to mules|Donde los raudales del río entregaban la carga a las mulas|Où les rapides du fleuve remettaient la cargaison aux mules|川の急流が荷を騾馬に引き継いだ町",
    "For much of the nineteenth and early twentieth centuries the rapids just below town, the Salto de Honda, blocked steamboats from going any further up the Magdalena, so cargo bound for Bogotá came ashore here and continued over the cordillera by mule track and, later, rail. The colonial stone bridges that still cross the Gualí River gave Honda its nickname, the City of Bridges, but many of its old riverside warehouses have sat empty since the transfer point moved elsewhere in the twentieth century.|Durante buena parte del siglo XIX y principios del XX, los raudales justo debajo de la ciudad, el Salto de Honda, impedían que los vapores siguieran subiendo por el Magdalena, así que la carga rumbo a Bogotá desembarcaba aquí y continuaba por la cordillera en recuas de mulas y, más tarde, en tren. Los puentes coloniales de piedra que aún cruzan el río Gualí le dieron a Honda su apodo, la Ciudad de los Puentes, pero muchas de sus antiguas bodegas ribereñas llevan vacías desde que el punto de trasbordo se trasladó a otro lugar en el siglo XX.|Pendant une bonne partie du XIXe siècle et du début du XXe, les rapides juste en aval de la ville, le Salto de Honda, empêchaient les bateaux à vapeur de remonter plus loin sur le Magdalena, si bien que les marchandises destinées à Bogotá débarquaient ici et poursuivaient par la cordillère à dos de mule puis, plus tard, par le rail. Les ponts de pierre coloniaux qui enjambent encore le Gualí ont valu à Honda son surnom de Ville des Ponts, mais nombre de ses anciens entrepôts au bord du fleuve sont restés vides depuis que le point de transbordement s'est déplacé ailleurs au XXe siècle.|19世紀から20世紀初頭にかけて、町のすぐ下流にある急流サルト・デ・オンダが蒸気船のマグダレナ川遡上をそこで阻んでいたため、ボゴタ行きの荷はここで陸に上げられ、山脈を騾馬の道で、のちには鉄道で越えていった。いまもグアリ川に架かる植民地時代の石橋が、オンダに「橋の街」という異名を与えているが、荷継ぎの拠点が20世紀のうちに別の場所へ移ってからは、川岸の古い倉庫の多くは空いたままになっている。",
    [prop("Steamboat Warehouse|Bodega del vapor|Entrepôt du bateau à vapeur|蒸気船の倉庫", 220, 46),
     prop("Bridge-Town Guesthouse|Posada de la ciudad de los puentes|Auberge de la ville aux ponts|橋の街の宿", 180, 38)],
  ),
  // 2026-08-21修正: 当初「SCADTAが数か月で就航し数週間の旅を数時間に
  // 短縮した」としていたが、team-leadの指摘で誤りが判明。ボゴタは標高
  // 2600m で、川の便がボゴタまで直接届いたことはない。SCADTAの飛行機は
  // 川港ジラルドットまで飛び(滑走路が無く水上機でマグダレナ川に着水)、
  // そこから先は従来どおり鉄道だった。1922年の政府との郵便契約という
  // 裏付けの確かな年号に差し替え、「川が道であり続けたまま、それが
  // 滑走路にもなった」という、芯によりまっすぐ効く事実にした。
  bogota: city(
    "Bogotá|Bogotá|Bogotá|ボゴタ",
    -74.0721, 4.7110, "and", "cordillerabasin", "capitalcity", "r",
    "A capital the river never quite reached|Una capital a la que el río nunca terminó de llegar|Une capitale que le fleuve n'a jamais vraiment atteinte|川がついに届かなかった首都",
    "SCADTA, the airline that grew into Avianca, had no runways to work with when it began flying in 1920, so its Junkers seaplanes simply landed on the Magdalena River itself, all the way up to the inland port of Girardot — the same port where cargo bound for Bogotá had always been transferred onto rail for the last climb into the mountains. The government signed the airline to carry the country's mail along those same river routes in 1922, turning the water that had always been Colombia's road into a runway too, years before a paved highway linked the capital to the coast.|La SCADTA, la aerolínea que se convertiría en Avianca, no contaba con ninguna pista cuando empezó a volar en 1920, así que sus hidroaviones Junkers simplemente amerizaban en el propio río Magdalena, hasta el puerto fluvial de Girardot, el mismo puerto donde la carga rumbo a Bogotá siempre se había trasladado al tren para la última subida a la cordillera. El gobierno contrató a la aerolínea para llevar el correo del país por esas mismas rutas fluviales en 1922, convirtiendo en pista también el agua que siempre había sido el camino de Colombia, años antes de que una carretera pavimentada uniera la capital con la costa.|La SCADTA, la compagnie aérienne devenue plus tard Avianca, ne disposait d'aucune piste lorsqu'elle commença à voler en 1920, si bien que ses hydravions Junkers amerrissaient tout simplement sur le Magdalena lui-même, jusqu'au port fluvial de Girardot — le même port où les marchandises destinées à Bogotá avaient toujours été transbordées sur le rail pour la dernière montée dans la cordillère. Le gouvernement chargea la compagnie de transporter le courrier du pays sur ces mêmes routes fluviales en 1922, faisant de l'eau qui avait toujours été la route de la Colombie une piste elle aussi, des années avant qu'une route goudronnée ne relie la capitale à la côte.|のちにアビアンカへと成長する航空会社SCADTAは、1920年に飛行を始めた時点で滑走路を一本も持たず、ユンカース製の水上機はマグダレナ川そのものに着水しながら、内陸の川港ジラルドットまで飛んだ。ジラルドットは、ボゴタ行きの荷がずっと鉄道に積み替えられて山脈への最後の登りへ向かっていた、まさにその港だった。1922年、政府はこの同じ川の経路で郵便を運ぶ契約をこの航空会社と結び、舗装道路が首都と海岸を結ぶ何年も前に、コロンビアの道であり続けた水を滑走路にも変えた。",
    [prop("Sabana Rail Terminal Café|Café de la terminal de la Sabana|Café du terminal de la Sabane|サバナ線ターミナルのカフェ", 520, 108),
     prop("Highland Boarding House|Pensión de la sabana|Pension du haut plateau|高原の下宿", 420, 88)],
  ),
  medellin: city(
    "Medellín|Medellín|Medellín|メデジン",
    -75.5636, 6.2442, "and", "metrocable", "andeanmetropolis", "l",
    "Cable cars built as everyday transit, not a tourist ride|Teleféricos construidos como transporte cotidiano, no como paseo turístico|Des téléphériques conçus comme transport du quotidien, pas comme attraction touristique|観光用ではなく、日常の足として作られたケーブルカー",
    "Medellín's Aburrá valley is so narrow, and some of its hillside barrios so steep, that in 2004 the city opened the Metrocable, ordinary cable-car stations built directly into the metro line rather than run as a tourist ride, turning a commute that could take the better part of an hour on foot into a ten-minute ride. The first line was built to serve one of the city's poorest and hardest-to-reach neighbourhoods, a choice credited with reshaping how other hillside cities have since designed public transit.|El valle de Aburrá donde se asienta Medellín es tan estrecho, y algunos de sus barrios de ladera tan empinados, que en 2004 la ciudad abrió el Metrocable: estaciones de teleférico normales integradas a la línea del metro y no un paseo turístico, que convirtieron un trayecto a pie de casi una hora en un viaje de diez minutos. La primera línea se construyó primero para uno de los barrios más pobres y de más difícil acceso de la ciudad, una decisión que desde entonces se cita al diseñar transporte público en otras ciudades de ladera.|La vallée d'Aburrá où se trouve Medellín est si étroite, et certains de ses quartiers de coteau si pentus, qu'en 2004 la ville a ouvert le Metrocable : des stations de téléphérique ordinaires intégrées à la ligne de métro, et non une attraction touristique, transformant un trajet à pied pouvant prendre près d'une heure en dix minutes de trajet. La première ligne fut construite en priorité pour l'un des quartiers les plus pauvres et les plus difficiles d'accès de la ville, un choix depuis cité en exemple pour concevoir les transports publics d'autres villes de coteau.|メデジンが位置するアブラ谷はとても狭く、丘の斜面に立つ一部の地区は急峻すぎるため、2004年に市はメトロケーブルを開いた。これは観光用の乗り物ではなく、地下鉄路線に組み込まれた普通の駅で、徒歩なら1時間近くかかりかねない通勤を10分ほどの乗車に変えた。最初の路線は市内でも特に貧しく行きにくい地区を優先して建設され、この選び方はその後、他の丘陵都市が公共交通を設計する際の手本として語られている。",
    [prop("Metrocable Trailside Kiosk|Quiosco junto al Metrocable|Kiosque au bord du Metrocable|メトロケーブル沿いの売店", 380, 79),
     prop("Aburrá Valley Workshop Loft|Taller-vivienda del valle de Aburrá|Atelier-loft de la vallée d'Aburrá|アブラ谷の工房兼住居", 460, 96)],
  ),
  cali: city(
    "Cali|Cali|Cali|カリ",
    -76.5320, 3.4516, "and", "railtoport", "caucavalley", "r",
    "The rare railway that actually reached salt water|El raro ferrocarril que sí llegó al agua salada|Le rare chemin de fer qui a vraiment atteint l'eau salée|実際に海水まで届いた、数少ない鉄道",
    "Cali sits in the flattest, widest stretch of the upper Cauca valley, which let the 1915 Pacific Railway reach it directly from the port of Buenaventura — one of the few Colombian lines that actually connected an interior city straight to salt water. Migration from the Pacific coast filled the city with Afro-Colombian musical traditions that, mixed with Cuban and Puerto Rican salsa records arriving through that same port, made Cali one of the genre's biggest dancing cities outside the Caribbean itself.|Cali se asienta en el tramo más plano y ancho del alto valle del Cauca, lo que permitió que el Ferrocarril del Pacífico de 1915 llegara hasta aquí directamente desde el puerto de Buenaventura, una de las pocas líneas colombianas que de verdad conectó una ciudad del interior con el mar. La migración desde la costa pacífica llenó la ciudad de tradiciones musicales afrocolombianas que, mezcladas con los discos de salsa cubana y puertorriqueña que llegaban por ese mismo puerto, hicieron de Cali una de las mayores ciudades bailadoras del género fuera del propio Caribe.|Cali se trouve sur le tronçon le plus plat et le plus large de la haute vallée du Cauca, ce qui permit au chemin de fer du Pacifique de 1915 de l'atteindre directement depuis le port de Buenaventura — l'une des rares lignes colombiennes à avoir vraiment relié une ville de l'intérieur à l'eau salée. La migration depuis la côte pacifique a rempli la ville de traditions musicales afro-colombiennes qui, mêlées aux disques de salsa cubaine et portoricaine arrivant par ce même port, ont fait de Cali l'une des plus grandes villes dansantes du genre hors des Caraïbes elles-mêmes.|カリは上カウカ渓谷でもとりわけ平坦で広い区間にあり、そのおかげで1915年開通の太平洋鉄道はブエナベントゥーラ港からここまで直接届いた。内陸の都市を実際に海水とつないだ、コロンビアでは数少ない路線の一つである。太平洋岸からの移住はこの町をアフロコロンビアの音楽の伝統で満たし、それが同じ港から届いたキューバやプエルトリコのサルサのレコードと混ざり合って、カリはカリブ海そのものの外では屈指のサルサの踊りの街になった。",
    [prop("Salsa Dance-Hall Balcony|Balcón de salsateca|Balcon de salsathèque|サルサホールのバルコニー", 340, 71),
     prop("Cauca Valley Sugar Warehouse|Bodega de azúcar del valle del Cauca|Entrepôt de sucre de la vallée du Cauca|カウカ渓谷の砂糖倉庫", 300, 62)],
  ),
  manizales: city(
    "Manizales|Manizales|Manizales|マニサレス",
    -75.5138, 5.0689, "and", "aerialcable", "coffeeridge", "l",
    "A cableway built where a railway couldn't go|Un cable aéreo construido donde no pudo ir un ferrocarril|Un câble aérien construit là où un chemin de fer ne pouvait pas passer|鉄道が通せなかった場所に架けた索道",
    "When surveyors decided the terrain between the coffee highlands and the Magdalena River was too broken for a railway, Manizales got an aerial cableway instead: opened in the early 1920s, the Cable Manizales–Mariquita ran for more than 70 kilometres and was, for a time, billed as the longest in the world. Coffee sacks rode the cable down to the river port of Mariquita to continue by boat, a route that stayed in use for decades until roads finally closed the gap the cable had been built to cross.|Cuando los ingenieros decidieron que el terreno entre las tierras altas cafeteras y el río Magdalena era demasiado quebrado para un ferrocarril, Manizales recibió en su lugar un cable aéreo: inaugurado a principios de la década de 1920, el Cable Manizales–Mariquita corría por más de 70 kilómetros y por un tiempo se anunció como el más largo del mundo. Los sacos de café bajaban por el cable hasta el puerto fluvial de Mariquita para continuar en barco, una ruta que siguió en uso durante décadas hasta que las carreteras por fin cerraron la brecha que el cable había sido construido para cruzar.|Quand les ingénieurs jugèrent le terrain entre les hautes terres caféières et le fleuve Magdalena trop accidenté pour un chemin de fer, Manizales reçut à la place un câble aérien : ouvert au début des années 1920, le Cable Manizales–Mariquita courait sur plus de 70 kilomètres et fut un temps présenté comme le plus long au monde. Les sacs de café descendaient par le câble jusqu'au port fluvial de Mariquita pour continuer en bateau, un trajet resté en usage pendant des décennies jusqu'à ce que les routes referment enfin l'écart que le câble avait été construit pour franchir.|コーヒーの高地とマグダレナ川のあいだの地形は鉄道を通すには険しすぎると技師たちが判断すると、マニサレスにはその代わりに索道が架けられた。1920年代初頭に開通したマニサレス=マリキータ索道は70キロメートルを超え、一時は世界一長いと謳われた。コーヒー袋はこの索道で川港マリキータまで下り、そこから船で運ばれ続けた。この経路は何十年も使われ続け、ようやく道路が索道の越えていた隙間を埋めるまで続いた。",
    [prop("Cableway Coffee Depot|Depósito de café del cable aéreo|Dépôt de café du câble aérien|索道のコーヒー集積所", 260, 54),
     prop("Cloud-Ridge Guesthouse|Posada de la cordillera nublada|Auberge de la crête embrumée|雲の尾根の宿", 220, 46)],
  ),
  pereira: city(
    "Pereira|Pereira|Pereira|ペレイラ",
    -75.6961, 4.8087, "and", "refoundedcity", "coffeeridge", "r",
    "A city refounded on a town that had fled|Una ciudad refundada sobre un pueblo que había huido|Une ville refondée sur une bourgade qui avait fui|逃げ去った町の跡に建て直された都市",
    "Pereira sits on the site of the original colonial town of Cartago, abandoned in 1691 after repeated raids by Indigenous Pijao forces and left empty for well over a century before settlers refounded it here in 1863. The relocated Cartago itself resettled kilometres away in the Cauca valley, so the region ended up with two cities carrying pieces of the same founding story instead of one.|Pereira se levanta sobre el sitio del pueblo colonial original de Cartago, abandonado en 1691 tras repetidos ataques de fuerzas indígenas pijao y dejado vacío durante más de un siglo antes de que colonos lo refundaran aquí en 1863. El propio Cartago trasladado se reasentó a varios kilómetros, en el valle del Cauca, así que la región terminó con dos ciudades que comparten fragmentos de la misma historia fundacional en lugar de una sola.|Pereira se dresse sur le site de l'ancienne bourgade coloniale de Cartago, abandonnée en 1691 après des raids répétés de forces indigènes pijao et laissée vide pendant plus d'un siècle avant que des colons ne la refondent ici en 1863. Cartago elle-même, relocalisée, se réinstalla à plusieurs kilomètres de là, dans la vallée du Cauca, si bien que la région se retrouva avec deux villes portant chacune un fragment de la même histoire fondatrice au lieu d'une seule.|ペレイラは、1691年にピハオ族の度重なる襲撃を受けて放棄され、1世紀以上も無人のまま残されていた植民地時代の町カルタゴの跡地に、1863年に入植者たちが建て直した町である。移転した側のカルタゴ自体は数キロ離れたカウカ渓谷に再定住したため、この地方には同じ建設の物語の断片を分け合う2つの町が残ることになった。",
    [prop("Otún Riverside Café|Café a orillas del Otún|Café au bord de l'Otún|オトゥン川沿いのカフェ", 250, 52),
     prop("Resettled-Town Plaza Stall|Puesto de la plaza reasentada|Étal de la place réinstallée|再興された町広場の屋台", 210, 44)],
  ),
  armenia: city(
    "Armenia|Armenia|Armenia|アルメニア",
    -75.6811, 4.5389, "and", "bamboorebuild", "coffeeridge", "l",
    "Rebuilt in bamboo after the ground gave way|Reconstruida en guadua después de que el suelo cediera|Reconstruite en bambou après que le sol eut cédé|地面が崩れたあと、竹で建て直された町",
    "A magnitude 6.2 earthquake struck the coffee-growing Quindío region on 25 January 1999, killing more than a thousand people and destroying much of Armenia's centre. Reconstruction leaned heavily on guadua, a giant local bamboo already used in traditional coffee-region building, promoted afterward as an earthquake-resistant material light enough to survive a shake that toppled heavier concrete structures nearby.|Un terremoto de magnitud 6,2 sacudió la región cafetera del Quindío el 25 de enero de 1999, matando a más de mil personas y destruyendo buena parte del centro de Armenia. La reconstrucción se apoyó fuertemente en la guadua, un bambú gigante local ya usado en la construcción tradicional cafetera, promovido después como material sismorresistente lo bastante ligero para sobrevivir a un temblor que derribó estructuras de concreto mucho más pesadas.|Un séisme de magnitude 6,2 frappa la région caféière du Quindío le 25 janvier 1999, tuant plus d'un millier de personnes et détruisant une grande partie du centre d'Armenia. La reconstruction s'appuya largement sur la guadua, un bambou géant local déjà utilisé dans la construction traditionnelle caféière, promu ensuite comme matériau parasismique assez léger pour survivre à une secousse qui avait abattu des structures en béton bien plus lourdes.|1999年1月25日、マグニチュード6.2の地震がコーヒー産地キンディオを襲い、1000人を超える人が死亡し、アルメニアの中心部の多くが壊れた。復興には、コーヒー地方の伝統的な建築ですでに使われていた現地産の巨大な竹「グアドゥア」が大きく取り入れられ、より重いコンクリート構造物を倒した揺れにも耐えられる、軽くて耐震性のある材料として以後推奨されるようになった。",
    [prop("Guadua-Bamboo Rebuild Yard|Taller de reconstrucción en guadua|Chantier de reconstruction en guadua|グアドゥア竹の再建工房", 230, 48),
     prop("Quindío Coffee Cooperative|Cooperativa cafetera del Quindío|Coopérative caféière du Quindío|キンディオのコーヒー協同組合", 260, 54)],
  ),
  bucaramanga: city(
    "Bucaramanga|Bucaramanga|Bucaramanga|ブカラマンガ",
    -73.1198, 7.1193, "and", "deepquakenest", "canyonledge", "r",
    "A city that sits above a nest of deep earthquakes|Una ciudad asentada sobre un nido de terremotos profundos|Une ville posée sur un nid de séismes profonds|深発地震の巣の上にある都市",
    "Bucaramanga sits above what seismologists call the Bucaramanga Nest, one of the most concentrated clusters of deep earthquakes on Earth, generating so many small tremors from roughly 150 kilometres down that residents mostly stop noticing them. The nest has puzzled researchers for decades because deep earthquakes this frequent and this tightly clustered are rare anywhere else in the world.|Bucaramanga se asienta sobre lo que los sismólogos llaman el Nido de Bucaramanga, uno de los cúmulos de terremotos profundos más concentrados de la Tierra, que genera tantos temblores pequeños desde unos 150 kilómetros bajo tierra que la mayoría de los habitantes ya ni los nota. El nido lleva décadas desconcertando a los investigadores, porque terremotos tan profundos, tan frecuentes y tan agrupados son raros en cualquier otro lugar del mundo.|Bucaramanga se trouve au-dessus de ce que les sismologues appellent le Nid de Bucaramanga, l'un des amas de séismes profonds les plus concentrés sur Terre, générant tant de petites secousses depuis environ 150 kilomètres de profondeur que la plupart des habitants ne les remarquent plus. Ce nid déconcerte les chercheurs depuis des décennies, car des séismes aussi profonds, aussi fréquents et aussi resserrés sont rares partout ailleurs dans le monde.|ブカラマンガは、地震学者が「ブカラマンガの巣」と呼ぶ、地球でも屈指の密集した深発地震の集中地帯の真上にある。地下およそ150キロメートルから小さな揺れが絶えず生じるため、住民の多くはもうほとんど気にも留めない。これほど深く、これほど頻繁で、これほど密集した地震の巣は世界の他の場所ではまれで、研究者たちを何十年も悩ませ続けている。",
    [prop("Cliffside Terrace Café|Café en la terraza del acantilado|Café sur la terrasse du à-pic|崖上のテラスカフェ", 300, 62),
     prop("Seismograph Station House|Casa de la estación sismográfica|Maison de la station sismographique|地震観測所の家", 240, 50)],
  ),
  tunja: city(
    "Tunja|Tunja|Tunja|トゥンハ",
    -73.3673, 5.5353, "and", "paintedceiling", "andeancolonial", "l",
    "Built directly on the seat of a Muisca ruler|Construida directamente sobre la sede de un gobernante muisca|Bâtie directement sur le siège d'un souverain muisca|ムイスカの支配者の座の真上に築かれた町",
    "Tunja was founded in 1539 directly on Hunza, the seat of the zaque, one of the two paramount rulers who divided the Muisca confederation before the Spanish conquest. Little remains of the Muisca city itself, but several of Tunja's oldest houses still keep elaborately painted colonial ceilings and murals, often cited among the best-preserved examples of their kind in the Americas.|Tunja se fundó en 1539 directamente sobre Hunza, la sede del zaque, uno de los dos gobernantes supremos que se repartían la confederación muisca antes de la conquista española. Poco queda de la ciudad muisca en sí, pero varias de las casas más antiguas de Tunja conservan techos y murales coloniales primorosamente pintados, citados a menudo entre los mejor conservados de su tipo en América.|Tunja fut fondée en 1539 directement sur Hunza, le siège du zaque, l'un des deux souverains suprêmes qui se partageaient la confédération muisca avant la conquête espagnole. Il ne reste presque rien de la ville muisca elle-même, mais plusieurs des plus anciennes maisons de Tunja conservent des plafonds et des peintures murales coloniaux minutieusement peints, souvent cités parmi les mieux conservés de leur genre en Amérique.|トゥンハは1539年、スペイン征服以前にムイスカ連合を分割統治していた二人の最高権力者の一人、サケの座であったフンサの真上に築かれた。ムイスカの都市そのものはほとんど残っていないが、トゥンハで最も古い住宅のいくつかには精緻に彩色された植民地時代の天井と壁画がいまも残り、アメリカ大陸でもこの種のものとしては保存状態が最良の部類にしばしば挙げられる。",
    [prop("Painted-Ceiling Colonial House|Casa colonial de techos pintados|Maison coloniale aux plafonds peints|彩色天井の植民地住宅", 260, 54),
     prop("Zaque's Plaza Bakery|Panadería de la plaza del zaque|Boulangerie de la place du zaque|サケ広場のパン屋", 190, 40)],
  ),
  popayan: city(
    "Popayán|Popayán|Popayán|ポパヤン",
    -76.6100, 2.4448, "and", "whitecityquake", "whitecity", "r",
    "A white city that keeps rebuilding through Holy Week|Una ciudad blanca que se reconstruye una y otra vez en Semana Santa|Une ville blanche qui n'en finit pas de se reconstruire à travers la Semaine sainte|聖週間のたびに建て直されてきた白い町",
    "Popayán's Holy Week processions, first recorded in 1556, are among the oldest continuously held in the Americas and were recognised by UNESCO as intangible heritage in 2009. A magnitude 5.5 earthquake struck on Maundy Thursday in 1983, in the middle of that year's processions, killing more than 250 people and levelling much of the whitewashed colonial centre that has since been carefully rebuilt to its old appearance.|Las procesiones de Semana Santa de Popayán, registradas por primera vez en 1556, están entre las más antiguas celebradas sin interrupción en América y fueron reconocidas por la UNESCO como patrimonio inmaterial en 2009. Un terremoto de magnitud 5,5 sacudió la ciudad el Jueves Santo de 1983, en plena procesión de ese año, matando a más de 250 personas y arrasando buena parte del centro colonial encalado, que desde entonces se ha reconstruido cuidando su apariencia original.|Les processions de la Semaine sainte de Popayán, attestées pour la première fois en 1556, comptent parmi les plus anciennes célébrées sans interruption en Amérique et furent reconnues par l'UNESCO comme patrimoine immatériel en 2009. Un séisme de magnitude 5,5 frappa la ville le Jeudi saint de 1983, en pleine procession de cette année-là, tuant plus de 250 personnes et rasant une grande partie du centre colonial blanchi à la chaux, reconstruit depuis avec soin dans son apparence d'origine.|1556年に最初の記録が残るポパヤンの聖週間の行列は、アメリカ大陸で途切れず続く行事としては最古級の一つで、2009年にユネスコの無形文化遺産に認定された。1983年の聖木曜日、その年の行列のさなかにマグニチュード5.5の地震が町を襲い、250人を超える人が亡くなり、白壁の植民地時代の中心部の多くが崩れたが、以後もとの姿を保つよう丁寧に建て直されてきた。",
    [prop("Whitewashed Colonial Storefront|Local colonial encalado|Devanture coloniale blanchie à la chaux|白壁の植民地商店", 280, 58),
     prop("Holy Week Procession Workshop|Taller de la Semana Santa|Atelier de la Semaine sainte|聖週間の行列の工房", 230, 48)],
  ),
  ibague: city(
    "Ibagué|Ibagué|Ibagué|イバゲ",
    -75.2322, 4.4389, "and", "mountaintunnel", "cordillerapass", "l",
    "The musical capital at the foot of a feared pass|La capital musical al pie de un paso temido|La capitale musicale au pied d'un col redouté|恐れられた峠のふもとの音楽の都",
    "Ibagué sits at the eastern foot of the pass called La Línea, long one of the most feared roads in Colombia for its fog, landslides and hairpin bends carrying trucks over the central cordillera toward Cali. A tunnel meant to bypass the worst of it broke ground in the 1990s and took decades to finish, becoming, at over eight kilometres, one of the longest road tunnels anywhere in the Americas by the time it fully opened.|Ibagué se asienta en el pie oriental de La Línea, durante mucho tiempo una de las carreteras más temidas de Colombia por su niebla, sus deslizamientos y sus curvas cerradas que llevan a los camiones sobre la cordillera central rumbo a Cali. Un túnel pensado para evitar lo peor de esa vía se empezó a construir en la década de 1990 y tardó décadas en terminarse, hasta convertirse, con más de ocho kilómetros, en uno de los túneles carreteros más largos de toda América cuando por fin abrió por completo.|Ibagué se trouve au pied oriental de La Línea, longtemps l'une des routes les plus redoutées de Colombie pour son brouillard, ses glissements de terrain et ses virages en épingle qui font passer les camions par-dessus la cordillère centrale en direction de Cali. Un tunnel destiné à éviter le pire de cette route fut entamé dans les années 1990 et mit des décennies à s'achever, devenant, avec plus de huit kilomètres, l'un des plus longs tunnels routiers de toutes les Amériques lors de son ouverture complète.|イバゲはラ・リネアと呼ばれる峠道の東の麓にある。この道は霧と地滑り、そしてトラックを中央山系越えでカリ方面へ運ぶつづら折りのカーブのせいで、コロンビアでも長く恐れられてきた。最悪の区間を避けるためのトンネルは1990年代に着工され、完成までに数十年を要したが、全面開通した時点で全長8キロメートルを超え、アメリカ大陸でも指折り長い道路トンネルの一つとなった。",
    [prop("Conservatory Practice Rooms|Salones de ensayo del conservatorio|Salles de répétition du conservatoire|音楽院の練習室", 210, 44),
     prop("Tunnel-Approach Truck Stop|Parador de camiones junto al túnel|Relais routier près du tunnel|トンネル手前のトラック休憩所", 240, 50)],
  ),
  neiva: city(
    "Neiva|Neiva|Neiva|ネイバ",
    -75.2819, 2.9273, "and", "desertbadlands", "dryvalley", "r",
    "Badlands turned into an open-air observatory|Un desierto de cárcavas convertido en observatorio a cielo abierto|Des badlands devenus observatoire à ciel ouvert|浸食地が野外天文台になった土地",
    "Just north of Neiva, the Tatacoa Desert is not a true desert but a dry tropical forest reduced by erosion to reddish-grey badlands, cut through by gullies deep enough that walking its trails can feel like descending into a canyon. Clear, unpolluted night skies over the same terrain later made it one of Colombia's main sites for public astronomical observatories, drawing visitors after dark as much as it does by day.|Al norte de Neiva, el Desierto de la Tatacoa no es en realidad un desierto sino un bosque seco tropical reducido por la erosión a cárcavas rojizas y grisáceas, atravesadas por barrancos tan profundos que recorrer sus senderos puede sentirse como descender a un cañón. Los cielos nocturnos despejados y sin contaminación lumínica sobre ese mismo terreno hicieron después de él uno de los principales sitios de Colombia para observatorios astronómicos abiertos al público, que atraen visitantes de noche tanto como de día.|Au nord de Neiva, le désert de la Tatacoa n'est pas un véritable désert mais une forêt sèche tropicale réduite par l'érosion à des badlands rougeâtres et grisâtres, entaillés de ravins assez profonds pour que parcourir ses sentiers donne l'impression de descendre dans un canyon. Les ciels nocturnes dégagés et sans pollution lumineuse au-dessus de ce même terrain en ont ensuite fait l'un des principaux sites colombiens pour des observatoires astronomiques ouverts au public, attirant les visiteurs la nuit autant que le jour.|ネイバの北にあるタタコア砂漠は、実際には砂漠ではなく、浸食によって赤灰色の荒れ地へと姿を変えた熱帯乾燥林である。深い谷が刻まれ、その小道を歩くとまるで峡谷を下っているように感じられる。同じ土地に広がる、光害の無い澄んだ夜空は、のちにここをコロンビア屈指の一般公開天文台の地とし、夜も昼に劣らず訪れる人を集めている。",
    [prop("Badlands Observatory Deck|Mirador astronómico del desierto|Plateforme d'observation du désert|砂漠の天文台デッキ", 220, 46),
     prop("Bambuco Festival Grandstand|Tribuna del festival del bambuco|Tribune du festival du bambuco|バンブーコ祭りの観覧席", 200, 42)],
  ),
  girardot: city(
    "Girardot|Girardot|Girardot|ジラルドット",
    -74.8020, 4.3033, "and", "riverresort", "hotlowlandtown", "l",
    "The river's last stop before the climb to Bogotá|La última parada del río antes de la subida a Bogotá|Le dernier arrêt du fleuve avant la montée vers Bogotá|ボゴタへの登りの手前、川の最後の港",
    "Long before it served briefly as a water-landing strip for SCADTA's seaplanes, Girardot was the river terminus of one of Colombia's earliest railways, a line begun in 1881 that took decades of interruptions to finally reach Bogotá's own Sabana railway around the first decade of the twentieth century. The same warm, low-lying setting — some 2,300 metres below the capital — later made Girardot the favourite weekend escape for Bogotanos, its riverside pools filling every holiday weekend.|Mucho antes de servir brevemente como pista de amaraje para los hidroaviones de la SCADTA, Girardot fue la terminal fluvial de uno de los ferrocarriles más antiguos de Colombia, una línea iniciada en 1881 que tardó décadas de interrupciones en enlazar por fin con el propio Ferrocarril de la Sabana de Bogotá, hacia la primera década del siglo XX. Ese mismo entorno cálido y bajo —unos 2.300 metros por debajo de la capital— convirtió después a Girardot en la escapada de fin de semana favorita de los bogotanos, con sus piscinas junto al río llenas cada puente festivo.|Bien avant de servir brièvement de piste d'amerrissage aux hydravions de la SCADTA, Girardot fut le terminus fluvial de l'un des plus anciens chemins de fer de Colombie, une ligne entamée en 1881 qui mit des décennies, ponctuées d'interruptions, à enfin rejoindre le chemin de fer de la Sabana de Bogotá, vers la première décennie du XXe siècle. Ce même cadre chaud et bas — quelque 2 300 mètres sous la capitale — fit ensuite de Girardot l'escapade de fin de semaine favorite des Bogotanos, ses piscines au bord du fleuve se remplissant à chaque long week-end.|SCADTAの水上機の着水地として短く使われるよりずっと前、ジラルドットは1881年に始まったコロンビア最古級の鉄道の川側の終点だった。この路線は何度も中断を挟みながら数十年をかけ、20世紀最初の10年ごろにようやくボゴタ自身のサバナ線とつながった。首都より標高が2300メートルほど低いこの暖かな土地は、のちにボゴタ市民お気に入りの週末の行楽地となり、川辺のプールは連休のたびに賑わっている。",
    [prop("Seaplane Landing Warehouse|Bodega del amaraje de hidroaviones|Entrepôt de l'amerrissage des hydravions|水上機発着の倉庫", 260, 54),
     prop("Riverside Holiday Pool Club|Club de piscinas ribereñas|Club de piscines au bord du fleuve|川辺のプール保養クラブ", 300, 62)],
  ),
  zipaquira: city(
    "Zipaquirá|Zipaquirá|Zipaquirá|シパキラ",
    -74.0028, 5.0219, "and", "saltcathedral", "saltmountain", "r",
    "A cathedral carved out of a working salt mine|Una catedral tallada en una mina de sal en actividad|Une cathédrale taillée dans une mine de sel en activité|稼働する岩塩鉱山に彫られた大聖堂",
    "Salt has been mined at Zipaquirá since long before the Spanish arrived, worked for centuries by the Muisca, and the mountain's old tunnels now hold a cathedral carved directly into the rock salt. The current cathedral, opened in 1995, replaced an earlier one built in 1954 that had to be closed for safety reasons, its naves and stations of the cross all cut from the same walls that once made this one of the region's most valuable resources.|En Zipaquirá se extrae sal desde mucho antes de la llegada de los españoles, trabajada durante siglos por los muiscas, y los antiguos túneles de la montaña albergan hoy una catedral tallada directamente en la roca salina. La catedral actual, abierta en 1995, sustituyó a una anterior construida en 1954 que hubo que cerrar por seguridad, con naves y estaciones del viacrucis talladas todas en los mismos muros que antaño hicieron de este lugar uno de los recursos más valiosos de la región.|Le sel est extrait à Zipaquirá depuis bien avant l'arrivée des Espagnols, exploité pendant des siècles par les Muiscas, et les anciens tunnels de la montagne abritent aujourd'hui une cathédrale taillée directement dans la roche saline. La cathédrale actuelle, ouverte en 1995, a remplacé une précédente construite en 1954 qu'il fallut fermer pour raisons de sécurité, ses nefs et ses stations du chemin de croix toutes taillées dans les mêmes parois qui firent jadis de ce lieu l'une des ressources les plus précieuses de la région.|シパキラでは、スペイン人が来るずっと前から塩が採られ、ムイスカの人々が何世紀にもわたって採掘してきた。山に穿たれた古い坑道はいま、岩塩そのものを彫り抜いた大聖堂になっている。1995年に開いた現在の大聖堂は、安全上の理由で閉鎖された1954年建造の先代に代わるもので、その身廊も十字架の道行きの各留も、かつてこの地をこの地方屈指の貴重な資源にした同じ壁から彫り出されている。",
    [prop("Underground Salt Nave Tour|Visita a la nave subterránea de sal|Visite de la nef souterraine de sel|地下の塩の身廊見学", 320, 67),
     prop("Muisca Saltworks Plot|Parcela de las salinas muiscas|Parcelle des salines muiscas|ムイスカの製塩地", 240, 50)],
  ),
  villadeleyva: city(
    "Villa de Leyva|Villa de Leyva|Villa de Leyva|ビジャ・デ・レイバ",
    -73.5259, 5.6333, "and", "fossilplaza", "stoneplaza", "l",
    "A stone plaza sitting on an ancient seabed|Una plaza de piedra asentada sobre un antiguo lecho marino|Une place de pierre posée sur un ancien fond marin|太古の海底の上に敷かれた石畳の広場",
    "Villa de Leyva's central plaza, paved entirely in irregular cobblestones and kept free of the trees or fountains found in most Colombian town squares, is among the largest of its kind in South America. The dry valley around the town sits on Cretaceous seabed rock so rich in marine fossils that a complete pliosaur skeleton, unearthed nearby, is now displayed exactly where it was found rather than moved to a museum case.|La plaza central de Villa de Leyva, empedrada por completo con piedras irregulares y sin los árboles ni fuentes que tienen la mayoría de las plazas colombianas, está entre las más grandes de su tipo en Sudamérica. El valle seco que rodea el pueblo se asienta sobre roca de fondo marino del Cretácico tan rica en fósiles marinos que un esqueleto completo de pliosaurio, hallado cerca, se exhibe hoy exactamente donde fue encontrado en lugar de trasladarse a una vitrina de museo.|La place centrale de Villa de Leyva, entièrement pavée de pierres irrégulières et dépourvue des arbres ou des fontaines que possèdent la plupart des places colombiennes, compte parmi les plus grandes de son genre en Amérique du Sud. La vallée sèche qui entoure le village repose sur une roche de fond marin datant du Crétacé, si riche en fossiles marins qu'un squelette complet de pliosaure, mis au jour à proximité, est aujourd'hui exposé exactement là où il fut trouvé plutôt que déplacé dans une vitrine de musée.|ビジャ・デ・レイバの中央広場は、不揃いな石で全面に敷き詰められ、コロンビアのほとんどの広場にある木や噴水も無く、南アメリカでもこの種のものとしては最大級とされる。町を囲む乾いた谷は白亜紀の海底の岩の上にあり、海の生物の化石がとても豊富なため、近くで見つかった首長竜の全身骨格は、博物館のケースに移されることなく、発見されたそのままの場所に展示されている。",
    [prop("Cobblestone Plaza Inn|Posada de la plaza empedrada|Auberge de la place pavée|石畳広場の宿", 300, 62),
     prop("Fossil-Bed Excavation Plot|Parcela de excavación fosilífera|Parcelle de fouille fossilifère|化石床の発掘地", 260, 54)],
  ),
  salento: city(
    "Salento|Salento|Salento|サレント",
    -75.5703, 4.6378, "and", "willysjeep", "coffeeridge", "r",
    "Where a war-surplus jeep became the only way through|Donde un yipe sobrante de guerra se volvió la única forma de pasar|Où une jeep de surplus militaire devint le seul moyen de passer|余剰軍用ジープが唯一の足になった町",
    "Salento's steep, unpaved farm roads were, for decades, passable mainly by Willys Jeeps left over from the Second World War, bought secondhand and pressed into hauling coffee pickers, sacks and furniture alike. The jeep became such a fixture of daily life across the coffee region that towns nearby now hold Yipao parades, competitions to see how much a single overloaded Jeep can carry without stalling.|Los caminos rurales de Salento, empinados y sin pavimentar, solo eran transitables durante décadas gracias a los yipes Willys sobrantes de la Segunda Guerra Mundial, comprados de segunda mano y puestos a cargar por igual recolectores de café, sacos y hasta muebles. El yipe se volvió tan parte de la vida cotidiana en toda la región cafetera que los pueblos cercanos celebran hoy los yipao, concursos para ver cuánto puede cargar un solo yipe sobrecargado sin calarse.|Les chemins de terre escarpés de Salento ne furent longtemps praticables que grâce aux jeeps Willys, surplus de la Seconde Guerre mondiale, achetées d'occasion et mises à transporter aussi bien cueilleurs de café, sacs que meubles. La jeep fit à tel point partie du quotidien dans toute la région caféière que les villages voisins organisent aujourd'hui des yipao, des concours pour voir combien peut porter une seule jeep surchargée sans caler.|サレントの急で未舗装の田舎道は、何十年ものあいだ、第二次世界大戦の余剰品として中古で買われたウィリス・ジープのおかげでかろうじて通れる道だった。ジープはコーヒー摘みの人も、袋も、家具まで積んで運んだ。コーヒー地方の日常にすっかり溶け込んだジープは、いまも近隣の町で「ジパオ」と呼ばれる祭りの題材となり、一台の過積載のジープがエンストせずにどれだけ積めるかを競っている。",
    [prop("Willys Jeep Repair Yard|Taller de yipes Willys|Garage de jeeps Willys|ウィリス・ジープの修理場", 230, 48),
     prop("Balconied Coffee-Town House|Casa cafetera de balcones|Maison caféière à balcons|バルコニー付きコーヒー町の家", 260, 54)],
  ),
  barrancabermeja: city(
    "Barrancabermeja|Barrancabermeja|Barrancabermeja|バランカベルメハ",
    -73.8547, 7.0653, "and", "oilrefinery", "riverport", "l",
    "The river town an oil strike turned industrial|El pueblo fluvial que un pozo de petróleo volvió industrial|La ville fluviale qu'un forage pétrolier rendit industrielle|油田が工業の町に変えた川港",
    "Barrancabermeja grew around Colombia's first major oil strike, drilled by the Tropical Oil Company under the De Mares concession from 1918, and the refinery built here processes a large share of the country's crude to this day. The Magdalena River carried the earliest pipelines' output onward by barge before a proper pipeline network existed, making an oil town out of a place that had been, until then, just another stop on the steamboat route.|Barrancabermeja creció en torno al primer gran hallazgo petrolero de Colombia, perforado por la Tropical Oil Company bajo la concesión de Mares desde 1918, y la refinería construida aquí sigue procesando hoy una gran parte del crudo del país. El río Magdalena transportaba en barcazas la producción de los primeros oleoductos antes de que existiera una red de tuberías propiamente dicha, convirtiendo en pueblo petrolero a un lugar que hasta entonces había sido solo una parada más en la ruta de los vapores.|Barrancabermeja grandit autour de la première grande découverte pétrolière de Colombie, forée par la Tropical Oil Company sous la concession de Mares à partir de 1918, et la raffinerie construite ici traite encore aujourd'hui une large part du brut du pays. Le fleuve Magdalena transportait par barges la production des premiers oléoducs avant qu'un véritable réseau de pipelines n'existe, faisant une ville pétrolière d'un lieu qui n'avait été jusque-là qu'une escale de plus sur la route des bateaux à vapeur.|バランカベルメハは、1918年からデ・マレス鉱区でトロピカル・オイル社が掘り当てたコロンビア初の大規模な油田を中心に発展した町で、ここに建てられた製油所はいまも国内原油の多くを処理している。本格的なパイプライン網ができる前、初期の輸送分はマグダレナ川を艀で運ばれており、それまでは蒸気船航路のただの一寄港地にすぎなかった土地を、石油の町へと変えた。",
    [prop("Refinery Gatehouse|Caseta de entrada a la refinería|Guérite de la raffinerie|製油所の門衛所", 280, 58),
     prop("Barge Loading Dock|Muelle de carga de barcazas|Quai de chargement des barges|艀の積込み桟橋", 240, 50)],
  ),
  // ---------------------------------------------------------------------
  // car — カリブ海岸
  // ---------------------------------------------------------------------
  // 2026-08-21修正: 当初「1871年から鉄道が桟橋へ客と荷を運んだ」として
  // いたが、1871年開業時点ではまだ桟橋は無かった(サバニージャまでの
  // 28km線)。team-leadの指摘どおり、桟橋開業は1893年(クピノ湾まで延伸)。
  // 「世界最長と謳われた桟橋」という裏付けの確かな事実に差し替えた。
  puertocolombia: city(
    "Puerto Colombia|Puerto Colombia|Puerto Colombia|プエルト・コロンビア",
    -74.9547, 11.0083, "car", "longpier", "caribbeancoast", "b",
    "A pier built because the river's mouth was too shallow to cross|Un muelle construido porque la boca del río era demasiado baja para cruzarla|Une jetée construite parce que l'embouchure du fleuve était trop peu profonde à franchir|川口が浅すぎて渡れなかったために築かれた桟橋",
    "A short rail line opened between Barranquilla and the coast in 1871, and by 1893 the line had been extended out to a pier here — once billed as the longest in the world — built to let ocean-going ships load and unload past a sandbar blocking the Magdalena's own mouth. Once engineers finally cut a channel through that sandbar in 1936, ships could sail straight up the river to Barranquilla instead, and within a few years the pier and its railway were shut down and dismantled.|Un breve ferrocarril se inauguró entre Barranquilla y la costa en 1871, y en 1893 la línea ya se había prolongado hasta un muelle en este lugar —promocionado en su día como el más largo del mundo— construido para que los buques de altura cargaran y descargaran más allá de un banco de arena que bloqueaba la propia boca del Magdalena. Cuando los ingenieros terminaron por fin de abrir un canal a través de ese banco de arena en 1936, los barcos pudieron subir directo por el río hasta Barranquilla, y en pocos años el muelle y su ferrocarril quedaron cerrados y desmantelados.|Un court chemin de fer fut inauguré entre Barranquilla et la côte en 1871, et dès 1893 la ligne avait été prolongée jusqu'à une jetée bâtie ici — présentée en son temps comme la plus longue du monde — pour permettre aux navires de haute mer de charger et décharger au-delà d'un banc de sable bloquant l'embouchure même du Magdalena. Une fois les ingénieurs parvenus à creuser un chenal à travers ce même banc de sable en 1936, les navires purent remonter directement le fleuve jusqu'à Barranquilla, et en quelques années la jetée et son chemin de fer furent fermés puis démantelés.|バランキージャと海岸を結ぶ短い鉄道が1871年に開業し、1893年までにはこの地の桟橋まで延伸された。当時、世界一長い桟橋と謳われたこの桟橋は、マグダレナ川自体の河口を塞ぐ砂州の先で外洋船に荷を積み下ろしさせるために築かれた。1936年、技術者たちがついにその砂州に水路を切り開くと、船はバランキージャまで川をまっすぐ遡れるようになり、数年のうちに桟橋も鉄道も閉鎖され撤去された。",
    [prop("Pier Warehouse|Bodega del muelle|Entrepôt de la jetée|桟橋の倉庫", 260, 54),
     prop("Branch-Line Ticket Office|Boletería del ramal|Guichet de la ligne secondaire|支線の切符売り場", 200, 42)],
  ),
  // ---------------------------------------------------------------------
  // pac — 太平洋岸(チョコ)
  // ---------------------------------------------------------------------
  quibdo: city(
    "Quibdó|Quibdó|Quibdó|キブド",
    -76.6413, 5.6947, "pac", "rainforestriver", "pacificrainforest", "l",
    "A capital reachable mainly by river and by air|Una capital a la que se llega sobre todo por río y por aire|Une capitale accessible surtout par le fleuve et par les airs|おもに川と空でしか行けない州都",
    "Chocó's capital sits on the Atrato River in a region where a nearby town, Lloró, turns up in some rainfall records among the wettest inhabited places on Earth. With no paved road reaching the Pacific lowlands from the interior for most of the twentieth century, the river and small aircraft were effectively the only way in or out, a dependence that has only begun to ease in recent decades.|La capital del Chocó se asienta sobre el río Atrato, en una región donde un pueblo cercano, Lloró, aparece en algunos registros pluviométricos entre los lugares habitados más lluviosos de la Tierra. Como ninguna carretera pavimentada llegaba a las tierras bajas del Pacífico desde el interior durante casi todo el siglo XX, el río y las avionetas eran en la práctica la única manera de entrar o salir, una dependencia que solo ha empezado a aliviarse en las últimas décadas.|La capitale du Chocó se dresse sur le fleuve Atrato, dans une région où une localité voisine, Lloró, figure dans certains relevés pluviométriques parmi les lieux habités les plus arrosés de la Terre. Aucune route goudronnée ne reliant les basses terres du Pacifique à l'intérieur pendant presque tout le XXe siècle, le fleuve et les petits avions constituaient dans les faits le seul moyen d'entrer ou de sortir, une dépendance qui ne commence à s'atténuer que depuis quelques décennies.|チョコ県の県都はアトラト川のほとりにあり、近郊の町ロヨロは、いくつかの降水量の記録では地球上でも指折りの多雨地として挙げられる。20世紀のほとんどのあいだ、内陸から太平洋側の低地へ届く舗装道路が無かったため、川と小型機が実質的に唯一の出入りの手段だった。この依存が緩み始めたのは、ここ数十年のことにすぎない。",
    [prop("Atrato Riverfront Store|Tienda a orillas del Atrato|Boutique au bord de l'Atrato|アトラト川岸の店", 210, 44),
     prop("Bush-Plane Charter Office|Oficina de chárter de avioneta|Bureau d'affrètement d'avionnette|チャーター機の事務所", 240, 50)],
  ),
  // ---------------------------------------------------------------------
  // ama — 南部アマゾニア(アンデス・アマゾンの移行地帯を含む)
  // ---------------------------------------------------------------------
  sanvicentedelcaguan: city(
    "San Vicente del Caguán|San Vicente del Caguán|San Vicente del Caguán|サン・ビセンテ・デル・カグアン",
    -74.7638, 2.1145, "ama", "emptyzone", "amazonpiedmont", "r",
    "A town that briefly hosted peace talks without a state|Un pueblo que por un tiempo albergó diálogos de paz sin Estado|Une ville qui accueillit brièvement des pourparlers de paix sans État|国家の権限なき和平交渉を、一時期担った町",
    "From 1998 to 2002 the Colombian government withdrew its armed forces from a demilitarised zone roughly the size of Switzerland centred on this town, ceding the area to FARC guerrillas as the venue for peace talks with President Andrés Pastrana's administration. The negotiations collapsed in February 2002 and the army moved back in within days, and San Vicente remains one of the country's more isolated municipal seats even now, its unpaved approach roads leaving small aircraft one of the more reliable ways in during the rainy season.|Entre 1998 y 2002 el gobierno colombiano retiró sus fuerzas armadas de una zona desmilitarizada del tamaño aproximado de Suiza, centrada en este pueblo, y cedió el área a las guerrillas de las FARC como sede de las conversaciones de paz con el gobierno del presidente Andrés Pastrana. Las negociaciones se rompieron en febrero de 2002 y el ejército regresó en cuestión de días, y San Vicente sigue siendo hoy una de las cabeceras municipales más aisladas del país, con accesos sin pavimentar que dejan a las avionetas como una de las formas más fiables de llegar en temporada de lluvias.|De 1998 à 2002, le gouvernement colombien retira ses forces armées d'une zone démilitarisée grande à peu près comme la Suisse, centrée sur cette ville, cédant le territoire aux guérilleros des FARC comme lieu des pourparlers de paix avec l'administration du président Andrés Pastrana. Les négociations échouèrent en février 2002 et l'armée reprit position en quelques jours ; aujourd'hui encore, San Vicente reste l'un des chefs-lieux municipaux les plus isolés du pays, ses routes d'accès non revêtues faisant du petit avion l'un des moyens les plus sûrs d'y parvenir pendant la saison des pluies.|1998年から2002年にかけて、コロンビア政府はこの町を中心とするスイスとほぼ同じ広さの非武装地帯から軍を撤退させ、アンドレス・パストラナ大統領政権とFARCゲリラとの和平交渉の場として、その地域をFARCに委ねた。交渉は2002年2月に決裂し、軍は数日のうちに再進駐した。それでもいまなおサン・ビセンテは国内でも指折り孤立した自治体庁所在地の一つで、未舗装の進入路のため、雨季には小型機がもっとも頼れる行き方の一つであり続けている。",
    [prop("Former Talks Pavilion Grounds|Terrenos del antiguo pabellón de diálogo|Terrain de l'ancien pavillon de dialogue|かつての対話館の敷地", 200, 42),
     prop("Airstrip Supply Depot|Depósito junto a la pista aérea|Dépôt près de la piste d'atterrissage|滑走路そばの補給倉庫", 230, 48)],
  ),
};

/** フェーズ1では路線は割愛(方向確認後、地理と合わせて設計する)。 */
export const COLOMBIA_EDGES = [];
