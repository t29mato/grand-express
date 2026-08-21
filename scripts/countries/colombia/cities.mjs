/**
 * コロンビアの都市(フェーズ1・5都市の下書き)。
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
  bogota: city(
    "Bogotá|Bogotá|Bogotá|ボゴタ",
    -74.0721, 4.7110, "and", "cordillerabasin", "capitalcity", "r",
    "A capital the river never quite reached|Una capital a la que el río nunca terminó de llegar|Une capitale que le fleuve n'a jamais vraiment atteinte|川がついに届かなかった首都",
    "Before commercial flights began in the 1920s, getting down from the capital's high plain to the Caribbean coast meant days by mule track or rail over the cordillera to a Magdalena River port, then a boat journey that could stretch to weeks whenever the river ran low. SCADTA, the airline that grew into Avianca, started flying that same route within months of its founding in 1919, cutting a multi-week trip to a matter of hours and giving Bogotá its first link to the sea that did not depend on how much rain had fallen upstream.|Antes de que empezaran los vuelos comerciales en la década de 1920, bajar desde la sabana de la capital hasta la costa Caribe significaba días por camino de herradura o en tren sobre la cordillera hasta un puerto del río Magdalena, y luego un viaje en barco que podía alargarse semanas cuando el río bajaba de nivel. La SCADTA, la aerolínea que se convertiría en Avianca, empezó a volar esa misma ruta a los pocos meses de fundarse en 1919, reduciendo un viaje de varias semanas a cuestión de horas y dándole a Bogotá su primer enlace con el mar que no dependía de cuánto hubiera llovido río arriba.|Avant le début des vols commerciaux dans les années 1920, descendre du haut plateau de la capitale jusqu'à la côte Caraïbe signifiait des jours de piste muletière ou de train à travers la cordillère jusqu'à un port du Magdalena, puis un voyage en bateau pouvant s'étirer sur des semaines quand le fleuve était bas. La SCADTA, la compagnie aérienne devenue plus tard Avianca, s'est mise à desservir cette même route quelques mois à peine après sa fondation en 1919, ramenant un trajet de plusieurs semaines à quelques heures et donnant à Bogotá son premier lien avec la mer qui ne dépendait plus des pluies survenues en amont.|1920年代に定期航空便が始まる前、首都の高原からカリブ海岸へ下るには、山脈を騾馬道や鉄道で越えてマグダレナ川の港に至り、そこから川の水位が低いときには数週間にも及びかねない船旅を重ねる必要があった。のちにアビアンカへと成長する航空会社SCADTAは、1919年の設立からわずか数か月でこの同じ経路を飛び始め、数週間かかった旅を数時間に縮め、上流の雨量に左右されないボゴタ初の海への足を与えた。",
    [prop("Sabana Rail Terminal Café|Café de la terminal de la Sabana|Café du terminal de la Sabane|サバナ線ターミナルのカフェ", 520, 108),
     prop("Highland Boarding House|Pensión de la sabana|Pension du haut plateau|高原の下宿", 420, 88)],
  ),
  // ---------------------------------------------------------------------
  // car — カリブ海岸
  // ---------------------------------------------------------------------
  puertocolombia: city(
    "Puerto Colombia|Puerto Colombia|Puerto Colombia|プエルト・コロンビア",
    -74.9547, 11.0083, "car", "longpier", "caribbeancoast", "b",
    "A pier built because the river's mouth was too shallow to cross|Un muelle construido porque la boca del río era demasiado baja para cruzarla|Une jetée construite parce que l'embouchure du fleuve était trop peu profonde à franchir|川口が浅すぎて渡れなかったために築かれた桟橋",
    "A sandbar at the mouth of the Magdalena kept ocean-going ships from reaching Barranquilla directly, so from 1871 a short railway carried passengers and cargo the last stretch here to a long pier built out past the surf. The pier fell quiet once engineers finished cutting a channel through that same sandbar in the 1930s, letting ships sail straight up the river and erasing the reason the branch line had existed.|Un banco de arena en la boca del Magdalena impedía que los buques de altura llegaran directamente a Barranquilla, así que desde 1871 un breve ferrocarril llevaba pasajeros y carga el último tramo hasta un largo muelle construido más allá del oleaje. El muelle quedó en silencio una vez que los ingenieros terminaron de abrir un canal a través de ese mismo banco de arena en la década de 1930, lo que permitió a los barcos subir directo por el río y borró la razón de ser del ramal.|Un banc de sable à l'embouchure du Magdalena empêchait les navires de haute mer d'atteindre Barranquilla directement, si bien que dès 1871 un court chemin de fer transportait passagers et marchandises sur le dernier tronçon jusqu'à une longue jetée construite au-delà du ressac. La jetée s'est tue une fois que les ingénieurs eurent achevé de creuser un chenal à travers ce même banc de sable dans les années 1930, permettant aux navires de remonter le fleuve directement et effaçant la raison d'être de cette ligne secondaire.|マグダレナ川の河口を塞ぐ砂州のせいで外洋船はバランキージャへ直接入れず、1871年からは短い鉄道が最後の区間を担い、寄せる波の先まで築かれた長い桟橋へ客と荷を運んだ。1930年代、技術者たちが同じ砂州に水路を切り開き終えると、船は川をまっすぐ遡れるようになり、この支線が存在した理由は消え、桟橋は静まりかえった。",
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
