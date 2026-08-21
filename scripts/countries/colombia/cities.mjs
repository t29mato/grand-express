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
