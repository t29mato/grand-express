/**
 * フランスの都市と路線(50都市)。
 *
 * 地方区分は6つ(`idf` イル・ド・フランス / `nor` 北部とノルマンディ /
 * `oue` 西部とブルターニュ / `est` 東部とアルプス / `sud` 南西とピレネー /
 * `med` 地中海とコルシカ)。
 *
 * `mark` / `bg` は当面インド・日本の既存キーを流用している(フランス専用の絵は別途)。
 * 経度・緯度は実際の値。投影の範囲は geography.mjs の FRANCE_PROJ を参照。
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const FRANCE_CITIES = {
  // ---------------------------------------------------------------------
  // idf — イル・ド・フランス
  // ---------------------------------------------------------------------
  paris: city(
    "Paris|París|Paris|パリ",
    2.35, 48.86, "idf", "eiffel", "capital", "r",
    "A city rebuilt on straight lines|Una ciudad rehecha en líneas rectas|Une ville refaite au cordeau|直線で作り直された都",
    "In the 1850s Haussmann drove wide boulevards through the medieval lanes, partly so troops could move and barricades could not hold. The result is why so much of Paris looks the same height and colour.|En 1850 Haussmann abrió bulevares anchos entre las callejas medievales, en parte para que las tropas pasaran y las barricadas no aguantaran.|Vers 1850, Haussmann perça de larges boulevards dans les ruelles médiévales, en partie pour que la troupe circule et que les barricades ne tiennent pas.|1850年代、オスマンは中世の路地に幅広の大通りを貫いた。軍隊が動けてバリケードが築けないようにする狙いもあった。街並みの高さと色が揃っているのはそのためである。",
    [prop("Boulevard Café|Café del bulevar|Café de boulevard|大通りのカフェ", 340, 70),
     prop("Iron Tower Lift|Ascensor de la torre|Ascenseur de la tour|鉄塔の昇降機", 360, 74)],
  ),
  versailles: city(
    "Versailles|Versalles|Versailles|ヴェルサイユ",
    2.13, 48.80, "idf", "lavender_sprig", "chateau", "l",
    "A court kept where the king could see it|Una corte donde el rey podía verla|Une cour tenue sous le regard du roi|王の目の届くところに置かれた宮廷",
    "The 357 mirrors of the great gallery were made in France on purpose, to break Venice's hold on the mirror trade. The garden fountains could never all run at once, so the fountain men whistled to one another to open them just ahead of the king's walk.|Los 357 espejos de la gran galería se fabricaron en Francia a propósito, para romper el dominio veneciano del vidrio. Las fuentes del jardín nunca podían manar a la vez, así que los fontaneros se silbaban entre sí para abrirlas justo delante del rey.|Les 357 glaces de la grande galerie furent fabriquées en France exprès, pour briser le monopole vénitien du miroir. Les fontaines du parc ne pouvaient jamais jouer toutes ensemble : les fontainiers se sifflaient pour les ouvrir juste devant le roi.|鏡の間の357枚の鏡は、ヴェネツィアの独占を破るためにわざわざ国内で作らせたものである。庭の噴水は全部を同時には出せず、噴水番は口笛で合図し、王の歩みの直前だけ水を上げた。",
    [prop("Orangery|Invernadero de naranjos|Orangerie|オランジュリー", 310, 64),
     prop("Mirror Manufactory|Manufactura de espejos|Manufacture des glaces|鏡の工場", 290, 60)],
  ),
  fontainebleau: city(
    "Fontainebleau|Fontainebleau|Fontainebleau|フォンテーヌブロー",
    2.70, 48.40, "idf", "chateau_tour", "chateau", "r",
    "Seven centuries of kings, and a forest of boulders|Siete siglos de reyes y un bosque de rocas|Sept siècles de rois et une forêt de rochers|七世紀の王たちと、岩の森",
    "Thirty-four sovereigns lived in this château over seven hundred years, and Napoleon said goodbye to his guard on its horseshoe stair in 1814 before leaving for Elba. The sandstone blocks in the forest around it are where climbing was first practised as a sport in its own right.|Treinta y cuatro soberanos habitaron este castillo a lo largo de setecientos años, y Napoleón se despidió de su guardia en su escalera de herradura en 1814, antes de partir a Elba. En las rocas de arenisca del bosque vecino se practicó por primera vez la escalada como deporte propio.|Trente-quatre souverains ont habité ce château en sept cents ans, et Napoléon y fit ses adieux à sa garde sur l'escalier en fer à cheval en 1814, avant de partir pour l'île d'Elbe. C'est sur les blocs de grès de la forêt voisine que l'escalade est devenue un sport à part entière.|この城には七百年で34人の君主が住み、1814年、ナポレオンはエルバ島へ発つ前、馬蹄形の階段で近衛兵に別れを告げた。周りの森に転がる砂岩の巨石は、登攀がひとつの競技として始まった場所である。",
    [prop("Horseshoe Stair|Escalera de herradura|Escalier en fer à cheval|馬蹄形の階段", 300, 62),
     prop("Boulder Forest Camp|Campamento del bosque|Camp de la forêt de blocs|岩の森の宿営", 250, 52)],
  ),
  chartres: city(
    "Chartres|Chartres|Chartres|シャルトル",
    1.49, 48.44, "idf", "cathedral_rose", "cathedral", "l",
    "A blue nobody has matched|Un azul que nadie ha igualado|Un bleu que personne n'a retrouvé|誰も再現できない青",
    "Most of its 172 windows still hold their original 12th- and 13th-century glass, and the recipe for that blue has never been reproduced. A labyrinth 261 metres long is set into the nave floor, a pilgrimage in miniature for those who could not travel.|La mayoría de sus 172 vidrieras conservan el vidrio original de los siglos XII y XIII, y aquel azul nunca se ha vuelto a lograr. En el suelo de la nave hay un laberinto de 261 metros, una peregrinación en miniatura para quien no podía viajar.|La plupart de ses 172 verrières gardent leur verre d'origine des XIIe et XIIIe siècles, et la recette de ce bleu n'a jamais été retrouvée. Un labyrinthe de 261 mètres est tracé au sol de la nef : un pèlerinage en réduction pour qui ne pouvait pas partir.|172ある窓の多くは12〜13世紀の硝子のままで、その青の作り方は今も再現できていない。身廊の床には全長261mの迷路が敷かれ、遠くへ行けない者の巡礼の代わりとされた。",
    [prop("Glass Workshop|Taller de vidrieras|Atelier de vitrail|硝子絵の工房", 290, 60),
     prop("Wheat Market|Mercado de trigo|Marché au blé|麦の市場", 260, 54)],
  ),

  // ---------------------------------------------------------------------
  // nor — 北部とノルマンディ
  // ---------------------------------------------------------------------
  lille: city(
    "Lille|Lille|Lille|リール",
    3.06, 50.63, "nor", "baguette", "canal", "r",
    "A whole city turned second-hand|Una ciudad entera de segunda mano|Une ville entière en brocante|街ごと蚤の市になる日",
    "On the first weekend of September the streets become one enormous flea market, and the restaurants pile their empty mussel shells on the pavement to see whose heap ends up highest. Lille was Flemish long before it was French, which is why its old square would not look out of place in Antwerp.|El primer fin de semana de septiembre las calles se convierten en un rastro inmenso, y los restaurantes amontonan las conchas de mejillón en la acera para ver quién levanta el montón más alto. Lille fue flamenca mucho antes que francesa, y su plaza vieja no desentonaría en Amberes.|Le premier week-end de septembre, les rues deviennent une immense brocante, et les restaurants empilent les coquilles de moules sur le trottoir pour voir qui aura le plus gros tas. Lille fut flamande bien avant d'être française, et sa Grand-Place ne détonnerait pas à Anvers.|9月最初の週末、街路がまるごと巨大な蚤の市になり、店はムール貝の殻を歩道に積み上げて山の高さを競う。リールはフランスになるずっと前はフランドルで、旧市街の広場はアントワープにあってもおかしくない。",
    [prop("Mussel Brasserie|Cervecería de mejillones|Brasserie à moules|ムール貝の店", 280, 58),
     prop("Textile Mill|Fábrica textil|Filature|紡績工場", 300, 62)],
  ),
  amiens: city(
    "Amiens|Amiens|Amiens|アミアン",
    2.30, 49.89, "nor", "cathedral_rose", "canal", "r",
    "Vegetable plots you reach by boat|Huertos a los que se llega en barca|Des jardins où l'on va en barque|舟で通う畑",
    "Its cathedral holds twice the interior volume of Notre-Dame in Paris and could swallow it whole. Behind the town, market gardens divided by 65 kilometres of canals are still worked from flat-bottomed boats, as they have been since the Middle Ages.|Su catedral encierra el doble de volumen que Notre-Dame de París y podría contenerla entera. Detrás de la ciudad, huertos repartidos entre 65 kilómetros de canales se siguen cultivando desde barcas de fondo plano, como en la Edad Media.|Sa cathédrale contient deux fois le volume de Notre-Dame de Paris et pourrait l'engloutir tout entière. Derrière la ville, des jardins maraîchers découpés par 65 kilomètres de canaux se cultivent encore en barque à fond plat, comme au Moyen Âge.|大聖堂の内部はパリのノートルダムの2倍の容積があり、そのまま丸ごと呑み込める。街の裏手では、65kmの水路に区切られた菜園が中世と同じく平底舟で耕され続けている。",
    [prop("Floating Garden Plot|Huerto flotante|Hortillonnage|水上の菜園", 270, 56),
     prop("Cathedral Stoneyard|Taller de cantería|Chantier de la cathédrale|大聖堂の石工場", 300, 62)],
  ),
  rouen: city(
    "Rouen|Ruán|Rouen|ルーアン",
    1.10, 49.44, "nor", "cathedral_rose", "cathedral", "r",
    "The same stone painted thirty times|La misma piedra pintada treinta veces|La même pierre peinte trente fois|同じ石を三十回描く",
    "Joan of Arc was burned in the market square here in 1431, at nineteen. Monet rented a room opposite the cathedral and painted its front more than thirty times, to record what an hour of light did to the same stone.|Juana de Arco fue quemada en su plaza del mercado en 1431, con diecinueve años. Monet alquiló un cuarto frente a la catedral y pintó su fachada más de treinta veces, para registrar lo que una hora de luz hacía con la misma piedra.|Jeanne d'Arc fut brûlée sur la place du Vieux-Marché en 1431, à dix-neuf ans. Monet loua une chambre en face de la cathédrale et en peignit la façade plus de trente fois, pour noter ce qu'une heure de lumière faisait de la même pierre.|1431年、19歳のジャンヌ・ダルクはこの市場の広場で焼かれた。モネは大聖堂の向かいに部屋を借り、正面を30回以上描いて、同じ石が一時間の光でどう変わるかを記録した。",
    [prop("One-Handed Clock|Reloj de una aguja|Horloge à une aiguille|一本針の大時計", 280, 58),
     prop("Timbered Merchant House|Casa de entramado|Maison à colombages|木組みの商家", 260, 54)],
  ),
  lehavre: city(
    "Le Havre|El Havre|Le Havre|ル・アーヴル",
    0.11, 49.49, "nor", "lighthouse_fr", "atlantic", "l",
    "A city cast in concrete|Una ciudad fundida en hormigón|Une ville coulée en béton|コンクリートで鋳直した街",
    "Bombing in September 1944 left the centre flattened, and Auguste Perret rebuilt the whole of it in reinforced concrete on a strict grid — one of the very few 20th-century city centres on the World Heritage list. The port itself was dug on royal orders in 1517, because the older harbour upstream had silted up.|Los bombardeos de septiembre de 1944 arrasaron el centro, y Auguste Perret lo reconstruyó entero en hormigón armado sobre una cuadrícula estricta: uno de los poquísimos centros del siglo XX en la lista del Patrimonio Mundial. El puerto se excavó por orden real en 1517, porque el antiguo, río arriba, se había cegado.|Les bombardements de septembre 1944 rasèrent le centre, et Auguste Perret le rebâtit tout entier en béton armé sur une trame régulière — l'un des très rares centres-villes du XXe siècle inscrits au patrimoine mondial. Le port lui-même fut creusé sur ordre royal en 1517, l'ancien, en amont, s'étant envasé.|1944年9月の爆撃で中心部は消え、オーギュスト・ペレは全体を鉄筋コンクリートの格子状に建て直した。20世紀の市街地で世界遺産になった数少ない例である。港そのものは、上流の旧港が砂で埋まったため1517年に王命で掘られた。",
    [prop("Container Quay|Muelle de contenedores|Quai à conteneurs|コンテナ埠頭", 320, 66),
     prop("Concrete Apartment Block|Bloque de hormigón|Immeuble de béton|コンクリートの集合住宅", 270, 56)],
  ),
  etretat: city(
    "Étretat|Étretat|Étretat|エトルタ",
    0.21, 49.71, "nor", "lighthouse_fr", "atlantic", "r",
    "An elephant drinking from the sea|Un elefante bebiendo del mar|Un éléphant qui boit la mer|海に鼻を差し入れる象",
    "Maupassant wrote that the great chalk arch looked like an elephant dipping its trunk into the sea, and Monet painted it in every light he could catch. The last people to see the aviators Nungesser and Coli alive, in May 1927, watched them pass over these cliffs on their way to New York.|Maupassant escribió que el gran arco de creta parecía un elefante metiendo la trompa en el mar, y Monet lo pintó con todas las luces que pudo. Los últimos que vieron con vida a los aviadores Nungesser y Coli, en mayo de 1927, los vieron cruzar estos acantilados rumbo a Nueva York.|Maupassant écrivit que la grande arche de craie ressemblait à un éléphant plongeant sa trompe dans la mer, et Monet la peignit sous toutes les lumières. Les derniers à voir vivants les aviateurs Nungesser et Coli, en mai 1927, les regardèrent passer au-dessus de ces falaises, cap sur New York.|モーパッサンは、白亜の大アーチを「海に鼻を差し入れる象」と書き、モネはあらゆる光のもとでそれを描いた。1927年5月、飛行士ナンジェセールとコリを生きて見た最後の人々は、ニューヨークへ向かう二人がこの断崖の上を過ぎるのを見送った。",
    [prop("Cliff-Top Chapel|Capilla del acantilado|Chapelle de la falaise|断崖の礼拝堂", 250, 52),
     prop("Pebble Beach Cabins|Casetas de la playa|Cabines de galets|礫浜の海の家", 240, 50)],
  ),
  caen: city(
    "Caen|Caen|Caen|カーン",
    -0.37, 49.18, "nor", "chateau_tour", "bocage", "l",
    "The Conqueror's town, twice ruined|La ciudad del Conquistador, dos veces arrasada|La ville du Conquérant, deux fois ruinée|征服王の町、二度の焼亡",
    "William the Conqueror built the castle and lies in the abbey he founded, though of his grave only a thigh bone survived the centuries of looting. In July 1944 thousands of citizens sheltered inside that same abbey while three quarters of the city burned around them.|Guillermo el Conquistador levantó el castillo y yace en la abadía que fundó, aunque de su tumba sólo queda un fémur tras siglos de saqueos. En julio de 1944 miles de vecinos se refugiaron en esa misma abadía mientras ardían tres cuartas partes de la ciudad.|Guillaume le Conquérant fit bâtir le château et repose dans l'abbaye qu'il fonda, mais de sa tombe il ne reste qu'un fémur après des siècles de pillages. En juillet 1944, des milliers d'habitants s'abritèrent dans cette même abbaye tandis que les trois quarts de la ville brûlaient.|征服王ウィリアムが城を築き、自ら建てた修道院に葬られたが、度重なる略奪で墓に残るのは大腿骨一本だけである。1944年7月、市の四分の三が燃えるあいだ、数千の市民はその同じ修道院に身を寄せた。",
    [prop("Abbey Refuge|Refugio de la abadía|Refuge de l'abbaye|修道院の避難所", 290, 60),
     prop("Caen Stone Quarry|Cantera de piedra de Caen|Carrière de pierre de Caen|カーン石の石切場", 270, 56)],
  ),
  bayeux: city(
    "Bayeux|Bayeux|Bayeux|バイユー",
    -0.70, 49.28, "nor", "cathedral_rose", "bocage", "l",
    "The conquest told in wool|La conquista contada en lana|La conquête racontée en laine|羊毛で語られた征服",
    "A strip of embroidery seventy metres long tells the Norman conquest of England from the winners' side, and shows a hairy star now taken to be Halley's Comet. Bayeux was the first town freed after the 1944 landings and, almost alone in Normandy, came through undamaged.|Una tira bordada de setenta metros cuenta la conquista normanda de Inglaterra desde el lado vencedor, y muestra una estrella con cabellera que hoy se identifica con el cometa Halley. Bayeux fue la primera ciudad liberada tras los desembarcos de 1944 y, casi la única de Normandía, salió intacta.|Une bande brodée de soixante-dix mètres raconte la conquête de l'Angleterre du côté des vainqueurs, et montre une étoile chevelue qu'on reconnaît aujourd'hui comme la comète de Halley. Bayeux fut la première ville libérée après le débarquement de 1944 et, presque seule en Normandie, en sortit indemne.|全長70mの刺繍の帯が、ノルマン人によるイングランド征服を勝者の側から語る。そこに描かれた「毛の生えた星」は、今日ハレー彗星とされている。バイユーは1944年の上陸後に最初に解放された町で、ノルマンディでほとんど唯一、無傷で残った。",
    [prop("Embroidery Hall|Sala del tapiz|Salle de la tapisserie|刺繍の展示館", 310, 64),
     prop("Lace Workshop|Taller de encaje|Atelier de dentelle|レース編みの工房", 250, 52)],
  ),
  giverny: city(
    "Giverny|Giverny|Giverny|ジヴェルニー",
    1.53, 49.08, "nor", "lavender_sprig", "bocage", "r",
    "A pond dug in order to be painted|Un estanque cavado para ser pintado|Un bassin creusé pour être peint|描くために掘られた池",
    "Monet had to petition the council to divert a stream into his garden; the neighbours were afraid his foreign water plants would poison the cattle. He painted the pond about 250 times, and towards the end cataracts had turned its greens to red.|Monet tuvo que pedir permiso al ayuntamiento para desviar un arroyo hacia su jardín; los vecinos temían que sus plantas acuáticas extranjeras envenenaran al ganado. Pintó el estanque unas 250 veces, y al final las cataratas le volvían rojos aquellos verdes.|Monet dut demander au conseil municipal de détourner un bras de l'Epte vers son jardin ; les voisins craignaient que ses plantes d'eau étrangères n'empoisonnent le bétail. Il peignit le bassin environ 250 fois et, sur la fin, la cataracte lui faisait voir ces verts en rouge.|モネは庭へ小川を引くのに村議会へ願い出なければならなかった。近隣は、異国の水草が家畜を毒すると恐れたのである。彼は池を約250回描き、晩年は白内障のため、その緑が赤く見えていた。",
    [prop("Water Lily Pond|Estanque de nenúfares|Bassin aux nymphéas|睡蓮の池", 300, 62),
     prop("Japanese Bridge|Puente japonés|Pont japonais|日本風の橋", 260, 54)],
  ),

  // ---------------------------------------------------------------------
  // oue — 西部とブルターニュ
  // ---------------------------------------------------------------------
  montsaintmichel: city(
    "Mont-Saint-Michel|Mont-Saint-Michel|Mont-Saint-Michel|モンサンミッシェル",
    -1.51, 48.64, "oue", "cathedral_rose", "atlantic", "l",
    "An island twice a day|Una isla dos veces al día|Une île deux fois par jour|一日に二度だけ島になる",
    "The tide here runs out fourteen kilometres and comes back fast enough that people have drowned crossing the sand. The abbey on top has been building upward on the same rock since 708.|La marea se retira catorce kilómetros y vuelve tan rápido que ha ahogado a quienes cruzaban la arena. La abadía crece sobre la misma roca desde 708.|La marée se retire de quatorze kilomètres et revient assez vite pour avoir noyé des marcheurs. L'abbaye s'élève sur le même rocher depuis 708.|潮は14km引き、人が砂を渡っていて溺れるほどの速さで戻る。頂の修道院は708年から同じ岩の上に積み上げられてきた。",
    [prop("Abbey Cloister|Claustro de la abadía|Cloître de l'abbaye|修道院の回廊", 330, 68),
     prop("Tidal Causeway Inn|Posada del paso|Auberge de la digue|参道の宿", 280, 58)],
  ),
  saintmalo: city(
    "Saint-Malo|Saint-Malo|Saint-Malo|サンマロ",
    -2.03, 48.65, "oue", "menhir", "atlantic", "r",
    "Pirates with a licence from the king|Piratas con licencia del rey|Des pirates avec un brevet du roi|王の許しを得た海賊",
    "Its corsairs carried royal papers allowing them to rob enemy shipping, and they brought back enough that the town could lend money to the crown. Jacques Cartier sailed out of this harbour in 1534 and came home having put the name Canada on a map.|Sus corsarios llevaban patente real para asaltar barcos enemigos, y trajeron tanto que la ciudad llegó a prestar dinero a la corona. Jacques Cartier zarpó de este puerto en 1534 y volvió habiendo puesto el nombre de Canadá en un mapa.|Ses corsaires portaient une lettre de marque du roi pour piller les navires ennemis, et rapportèrent assez pour que la ville prête de l'argent à la couronne. Jacques Cartier partit de ce port en 1534 et revint après avoir porté le nom de Canada sur une carte.|この街の私掠船は敵船を襲う王の許可状を持ち、稼ぎは町が王室に金を貸せるほどだった。1534年、ジャック・カルティエはこの港を出て、「カナダ」の名を地図に載せて帰ってきた。",
    [prop("Corsair's House|Casa de corsario|Malouinière|私掠船主の館", 300, 62),
     prop("Rampart Walk|Paseo de murallas|Chemin de ronde|城壁の巡り道", 270, 56)],
  ),
  rennes: city(
    "Rennes|Rennes|Rennes|レンヌ",
    -1.68, 48.11, "oue", "chateau_tour", "oldtown", "r",
    "Two towns out of one fire|Dos ciudades de un solo incendio|Deux villes nées d'un incendie|一度の火事で二つになった町",
    "A fire in 1720 burned for six days and took nine hundred timber houses; the king ordered the centre rebuilt in stone, so two kinds of town now stand side by side. Rennes held the parliament of Brittany, and the province kept laws of its own until the Revolution.|Un incendio de 1720 ardió seis días y se llevó novecientas casas de madera; el rey mandó reconstruir el centro en piedra, y hoy conviven dos ciudades distintas. Rennes albergó el parlamento de Bretaña, y la provincia conservó leyes propias hasta la Revolución.|Un incendie de 1720 brûla six jours et emporta neuf cents maisons de bois ; le roi ordonna de rebâtir le centre en pierre, si bien que deux villes se côtoient aujourd'hui. Rennes abritait le parlement de Bretagne, et la province garda ses lois propres jusqu'à la Révolution.|1720年の火事は六日燃え続け、木組みの家900軒を焼いた。王は中心部を石で建て直せと命じ、いまは二種類の町並みが隣り合っている。レンヌにはブルターニュ高等法院が置かれ、この州は革命まで独自の法を保った。",
    [prop("Parliament Chamber|Sala del parlamento|Salle du parlement|高等法院の議場", 300, 62),
     prop("Covered Market|Mercado cubierto|Halles couvertes|屋根付きの市場", 270, 56)],
  ),
  brest: city(
    "Brest|Brest|Brest|ブレスト",
    -4.49, 48.39, "oue", "lighthouse_fr", "atlantic", "r",
    "A navy town rebuilt from nothing|Una ciudad naval rehecha desde cero|Une ville de marine rebâtie de zéro|ゼロから建て直した軍港",
    "Richelieu turned this deep natural roadstead into the navy's Atlantic arsenal in 1631, and the town has lived off the service ever since. A siege in 1944 left barely a house standing, so the streets you walk today were drawn on a clean sheet.|Richelieu convirtió esta profunda rada natural en el arsenal atlántico de la marina en 1631, y desde entonces la ciudad vive del servicio. El asedio de 1944 apenas dejó una casa en pie, así que sus calles se trazaron sobre papel en blanco.|Richelieu fit de cette rade profonde l'arsenal atlantique de la marine en 1631, et la ville vit du service depuis. Le siège de 1944 ne laissa presque pas une maison debout : les rues d'aujourd'hui ont été tracées sur une feuille blanche.|1631年、リシュリューはこの深い天然の泊地を海軍の大西洋工廠にし、以来ずっと軍の町である。1944年の攻囲でほとんど一軒も残らず、いまの街路は白紙の上に引き直されたものだ。",
    [prop("Naval Rope Works|Cordelería naval|Corderie de l'arsenal|海軍の製綱所", 290, 60),
     prop("Roadstead Ferry|Transbordador de la rada|Bac de la rade|泊地の渡し船", 250, 52)],
  ),
  quimper: city(
    "Quimper|Quimper|Quimper|カンペール",
    -4.10, 48.00, "oue", "menhir", "atlantic", "l",
    "A cathedral with a bend in it|Una catedral que hace un quiebro|Une cathédrale qui fait un coude|折れ曲がった大聖堂",
    "Its cathedral is visibly crooked: the nave meets the sanctuary at an angle of several degrees, most likely to avoid soft ground beside the river. The town has hand-painted tin-glazed pottery since 1690, and Breton is still taught in its schools.|Su catedral está visiblemente torcida: la nave forma un ángulo de varios grados con el presbiterio, seguramente para esquivar el terreno blando junto al río. La ciudad pinta a mano su loza esmaltada desde 1690, y el bretón se sigue enseñando en sus escuelas.|Sa cathédrale est visiblement de travers : la nef fait un angle de plusieurs degrés avec le sanctuaire, sans doute pour éviter un sol mou au bord de la rivière. La ville peint sa faïence à la main depuis 1690, et le breton s'enseigne toujours dans ses écoles.|この大聖堂は目に見えて曲がっており、身廊は内陣に対して数度ずれている。川辺の軟らかい地盤を避けたためらしい。町は1690年から手描きの錫釉陶器を焼き、学校では今もブルトン語が教えられている。",
    [prop("Faience Kiln|Horno de loza|Four à faïence|陶器の窯", 270, 56),
     prop("Crêperie Row|Calle de creperías|Rue des crêperies|クレープ屋の並び", 240, 50)],
  ),
  nantes: city(
    "Nantes|Nantes|Nantes|ナント",
    -1.55, 47.22, "oue", "arch", "atlantic", "l",
    "An edict, and what came afterwards|Un edicto, y lo que vino después|Un édit, et ce qui suivit|勅令と、その後のこと",
    "The Edict of Nantes was signed here in 1598, allowing Protestants to worship inside a Catholic kingdom. The same port later fitted out some 1,700 slaving voyages, and in 2012 the city set a memorial along the quay that says so in plain words.|Aquí se firmó en 1598 el Edicto de Nantes, que permitió el culto protestante en un reino católico. El mismo puerto armó después unos 1.700 viajes negreros, y en 2012 la ciudad levantó en el muelle un memorial que lo dice sin rodeos.|L'édit de Nantes y fut signé en 1598, autorisant le culte protestant dans un royaume catholique. Le même port arma ensuite quelque 1 700 expéditions négrières, et la ville a posé en 2012 sur le quai un mémorial qui le dit sans détour.|1598年、カトリックの王国でプロテスタントの礼拝を認めるナントの勅令がここで署名された。その同じ港は後におよそ1700回の奴隷貿易航海を仕立て、2012年、市は岸壁にそれをはっきり記した記念碑を据えた。",
    [prop("Mechanical Elephant|Elefante mecánico|Éléphant mécanique|機械仕掛けの象", 320, 66),
     prop("Quayside Warehouse|Almacén del muelle|Entrepôt du quai|岸壁の倉庫", 280, 58)],
  ),
  angers: city(
    "Angers|Angers|Angers|アンジェ",
    -0.55, 47.47, "oue", "chateau_tour", "chateau", "r",
    "A hundred metres of apocalypse|Cien metros de apocalipsis|Cent mètres d'apocalypse|百メートルの黙示録",
    "Its castle keeps a woven Apocalypse a hundred metres long, made in the 1370s and the oldest large set of tapestries to survive anywhere. In the 1800s it was cut up for horse blankets and for wrapping orange trees, until a bishop bought the pieces back one by one.|Su castillo guarda un Apocalipsis tejido de cien metros, hecho en los años 1370 y el conjunto de tapices grandes más antiguo que se conserva. En el siglo XIX se cortó para mantas de caballo y para envolver naranjos, hasta que un obispo fue recomprando los trozos.|Son château conserve une Apocalypse tissée de cent mètres, réalisée dans les années 1370 et la plus ancienne grande tenture conservée au monde. Au XIXe siècle, on la découpa en couvertures de chevaux et en housses pour les orangers, jusqu'à ce qu'un évêque en rachète les morceaux un à un.|城には1370年代に織られた全長100mの「黙示録」が残る。まとまった大型綴織としては世界最古のものである。19世紀には切り刻まれて馬の毛布や橙の木の覆いにされ、司教が一片ずつ買い戻した。",
    [prop("Tapestry Gallery|Galería del tapiz|Galerie de la tenture|綴織の展示廊", 310, 64),
     prop("Orange Liqueur Distillery|Destilería de licor de naranja|Distillerie de liqueur d'orange|橙のリキュール工場", 280, 58)],
  ),
  tours: city(
    "Tours|Tours|Tours|トゥール",
    0.69, 47.39, "oue", "chateau_tour", "chateau", "r",
    "Half a cloak, and a word|Media capa y una palabra|Un demi-manteau, et un mot|半分の外套と、ひとつの言葉",
    "Saint Martin cut his cloak in half for a beggar, and the piece kept as a relic, his cappa, is where the word chapel comes from. His tomb made this one of the great pilgrimages of the Middle Ages, and because the court later sat in the Loire châteaux nearby, people still say the plainest French is spoken here.|San Martín partió su capa en dos para un mendigo, y el trozo guardado como reliquia, su cappa, es el origen de la palabra capilla. Su tumba hizo de esta una de las grandes peregrinaciones medievales, y como la corte se instaló después en los castillos del Loira, aún se dice que aquí se habla el francés más claro.|Saint Martin partagea son manteau pour un mendiant, et le morceau gardé comme relique, sa cappa, a donné le mot chapelle. Son tombeau fit de la ville l'un des grands pèlerinages du Moyen Âge, et comme la cour siégea ensuite dans les châteaux de la Loire, on dit encore qu'on y parle le français le plus pur.|聖マルタンが乞食に外套を半分与え、聖遺物として残された片割れ「カッパ」が、礼拝堂(chapelle)という語の元になった。その墓は中世ヨーロッパ屈指の巡礼地となり、のちに宮廷が近くのロワールの城館に移ったことから、今も「最も澄んだフランス語はここで話される」と言われる。",
    [prop("Loire Château|Castillo del Loira|Château de la Loire|ロワールの城館", 330, 68),
     prop("Rillettes Charcuterie|Charcutería de rillettes|Charcuterie de rillettes|リエットの惣菜店", 260, 54)],
  ),
  orleans: city(
    "Orléans|Orleans|Orléans|オルレアン",
    1.90, 47.90, "oue", "cathedral_rose", "chateau", "r",
    "A siege broken in nine days|Un asedio roto en nueve días|Un siège levé en neuf jours|九日で解かれた包囲",
    "Joan of Arc broke the English siege here in nine days in May 1429, and the city has marked it every 8 May since 1430 — one of the longest-running festivals in Europe. Orléans also gave its name to a slow way of making vinegar, in oak barrels deliberately left half empty.|Juana de Arco rompió aquí el asedio inglés en nueve días, en mayo de 1429, y la ciudad lo celebra cada 8 de mayo desde 1430: una de las fiestas vivas más antiguas de Europa. Orleans dio además nombre a un método lento de hacer vinagre, en barricas de roble dejadas a medio llenar.|Jeanne d'Arc y leva le siège anglais en neuf jours, en mai 1429, et la ville le fête chaque 8 mai depuis 1430 : l'une des plus anciennes fêtes d'Europe encore célébrées. Orléans a aussi donné son nom à une façon lente de faire le vinaigre, en fûts de chêne laissés à moitié vides.|1429年5月、ジャンヌ・ダルクはわずか九日でイングランド軍の包囲を破った。市は1430年から毎年5月8日にそれを祝っており、ヨーロッパで最も長く続く祭りのひとつである。オルレアンの名は、樫の樽をわざと半分空けて仕込む酢の製法にも残っている。",
    [prop("Vinegar Cellar|Bodega de vinagre|Vinaigrerie|酢の蔵", 270, 56),
     prop("Loire Bridge Toll|Peaje del puente|Péage du pont|ロワール橋の通行料", 250, 52)],
  ),

  // ---------------------------------------------------------------------
  // est — 東部とアルプス
  // ---------------------------------------------------------------------
  reims: city(
    "Reims|Reims|Reims|ランス",
    4.03, 49.26, "est", "vine", "cathedral", "r",
    "Kings crowned above Roman quarries|Reyes coronados sobre canteras romanas|Des rois sacrés au-dessus de carrières romaines|ローマの採石場の上で戴冠する王",
    "Thirty-three kings were crowned in its cathedral, because Clovis had been baptised on this spot around 496 and the anointing had to be repeated where it began. The champagne houses age their bottles in the chalk pits the Romans dug for building stone, kilometres of them, at a steady ten degrees.|Treinta y tres reyes fueron coronados en su catedral, porque Clodoveo fue bautizado aquí hacia el año 496 y la unción debía repetirse donde había empezado. Las casas de champán envejecen sus botellas en canteras de creta abiertas por los romanos, kilómetros de galerías a diez grados constantes.|Trente-trois rois furent sacrés dans sa cathédrale, parce que Clovis y avait été baptisé vers 496 et que l'onction devait se refaire là où elle avait commencé. Les maisons de champagne font vieillir leurs bouteilles dans des crayères creusées par les Romains, des kilomètres de galeries à dix degrés constants.|この大聖堂で33人の王が戴冠した。496年頃クロヴィスがここで洗礼を受け、塗油は始まった場所で繰り返すものとされたためである。シャンパーニュの醸造家は、ローマ人が建材を切り出した白亜の坑を貯蔵庫に使う。何kmも続き、年中10度に保たれている。",
    [prop("Chalk Cellar|Bodega de creta|Crayère|白亜の地下蔵", 320, 66),
     prop("Coronation Nave|Nave de la coronación|Nef du sacre|戴冠の身廊", 300, 62)],
  ),
  metz: city(
    "Metz|Metz|Metz|メス",
    6.18, 49.12, "est", "cathedral_rose", "oldtown", "r",
    "The Good Lord's lantern|La linterna del Buen Dios|La lanterne du Bon Dieu|神さまの提灯",
    "Its cathedral carries 6,500 square metres of stained glass, more than any other church in the world, with windows by Chagall set among the medieval ones. The railway station is deliberately vast and German: it was built while Metz was in the Reich, to move 20,000 soldiers to the border in a day.|Su catedral lleva 6.500 metros cuadrados de vidrieras, más que ninguna otra iglesia del mundo, con ventanas de Chagall junto a las medievales. La estación es enorme y alemana a propósito: se construyó cuando Metz pertenecía al Reich, para llevar 20.000 soldados a la frontera en un día.|Sa cathédrale porte 6 500 mètres carrés de vitraux, plus qu'aucune autre église au monde, avec des verrières de Chagall parmi les médiévales. La gare est volontairement immense et allemande : bâtie quand Metz était dans le Reich, pour porter 20 000 soldats à la frontière en une journée.|大聖堂は6500m²の色硝子を張り、世界のどの教会より広い。中世の窓に混じってシャガールの作もある。駅がやたらに大きくドイツ風なのは、メスが帝政ドイツ領だった頃、一日で2万の兵を国境へ送るために建てられたからである。",
    [prop("Lantern Nave|Nave linterna|Nef lanterne|光の身廊", 300, 62),
     prop("Imperial Station|Estación imperial|Gare impériale|帝国時代の駅", 280, 58)],
  ),
  nancy: city(
    "Nancy|Nancy|Nancy|ナンシー",
    6.18, 48.69, "est", "arch", "oldtown", "l",
    "A square built by a king with no kingdom|Una plaza de un rey sin reino|Une place bâtie par un roi sans royaume|国を失った王が造らせた広場",
    "Its great square was laid out in the 1750s by a deposed king of Poland who had been handed Lorraine as a consolation, and he filled every corner of it with gilded ironwork. A century and a half later the glassmakers Gallé and Daum made the same town a capital of Art Nouveau.|Su gran plaza la trazó en los años 1750 un rey destronado de Polonia al que habían dado Lorena como consuelo, y la llenó de hierro forjado dorado. Siglo y medio después, los vidrieros Gallé y Daum hicieron de la misma ciudad una capital del Art Nouveau.|Sa grande place fut tracée dans les années 1750 par un roi de Pologne détrôné à qui l'on avait donné la Lorraine en consolation, et il en garnit chaque angle de ferronnerie dorée. Un siècle et demi plus tard, les verriers Gallé et Daum firent de la même ville une capitale de l'Art nouveau.|この大広場は1750年代、王位を失ったポーランド王が慰めにロレーヌを与えられて造らせたもので、四隅まで金箔の錬鉄で飾られている。それから一世紀半後、硝子工ガレとドームが同じ町をアール・ヌーヴォーの都にした。",
    [prop("Gilded Gate|Verja dorada|Grille dorée|金の門扉", 290, 60),
     prop("Glass Studio|Taller de vidrio|Atelier de verrier|硝子工房", 270, 56)],
  ),
  strasbourg: city(
    "Strasbourg|Estrasburgo|Strasbourg|ストラスブール",
    7.75, 48.58, "est", "cathedral_rose", "cathedral", "r",
    "Four countries in three generations|Cuatro países en tres generaciones|Quatre pays en trois générations|三世代で四つの国",
    "Its cathedral spire was the tallest building on earth for 227 years, and the astronomical clock inside still parades its apostles every day at half past twelve. The city changed country four times between 1870 and 1945, which is a large part of why the European Parliament sits here.|Su aguja fue el edificio más alto del mundo durante 227 años, y el reloj astronómico del interior aún hace desfilar a sus apóstoles cada día a las doce y media. La ciudad cambió de país cuatro veces entre 1870 y 1945, y en buena medida por eso el Parlamento Europeo se reúne aquí.|Sa flèche fut le plus haut édifice du monde pendant 227 ans, et l'horloge astronomique fait toujours défiler ses apôtres chaque jour à midi et demi. La ville a changé de pays quatre fois entre 1870 et 1945, ce qui explique en grande partie que le Parlement européen y siège.|この尖塔は227年間、世界一高い建造物だった。中の天文時計は今も毎日12時半に使徒の行列を動かす。1870年から1945年までに街は四度も国籍が変わっており、欧州議会がここに置かれた理由の大半はそこにある。",
    [prop("Astronomical Clock|Reloj astronómico|Horloge astronomique|天文時計", 320, 66),
     prop("Winstub Tavern|Taberna alsaciana|Winstub|アルザスの酒場", 280, 58)],
  ),
  colmar: city(
    "Colmar|Colmar|Colmar|コルマール",
    7.36, 48.08, "est", "vine", "oldtown", "l",
    "The man who made Liberty|El hombre que hizo la Libertad|L'homme qui fit la Liberté|自由の女神を造った男の町",
    "Bartholdi, who designed the Statue of Liberty, was born on one of these streets, and a twelve-metre copy of her stands at the northern entrance to the town. Colmar came through both world wars almost untouched, which is why whole streets of 15th-century timber houses are still standing.|Bartholdi, autor de la Estatua de la Libertad, nació en una de estas calles, y una copia de doce metros se alza a la entrada norte del pueblo. Colmar salió casi indemne de las dos guerras mundiales, y por eso quedan calles enteras de casas de madera del siglo XV.|Bartholdi, qui conçut la statue de la Liberté, est né dans une de ces rues, et une copie de douze mètres se dresse à l'entrée nord de la ville. Colmar a traversé les deux guerres mondiales presque intacte, d'où ces rues entières de maisons à colombages du XVe siècle.|自由の女神を設計したバルトルディはこの町の通りで生まれ、北の入口には高さ12mの複製が立つ。コルマールは二度の大戦をほぼ無傷で抜けたため、15世紀の木組みの家が街路ごと残っている。",
    [prop("Riesling Cellar|Bodega de riesling|Cave de riesling|リースリングの酒蔵", 290, 60),
     prop("Timbered Merchant House|Casa de mercader|Maison de marchand|木組みの商家", 260, 54)],
  ),
  dijon: city(
    "Dijon|Dijon|Dijon|ディジョン",
    5.04, 47.32, "est", "vine", "vineyard", "l",
    "A mustard that is a method, not a place|Una mostaza que es un método, no un lugar|Une moutarde qui est un procédé, pas un lieu|土地ではなく作り方の名",
    "Dijon mustard is a recipe rather than an origin: in 1752 a local maker swapped the vinegar for verjuice, the name was never protected, and most of the seed now comes from Canada. The dukes who ruled Burgundy from here were, for a stretch of the 15th century, richer than the kings of France.|La mostaza de Dijon es una receta, no un origen: en 1752 un fabricante cambió el vinagre por agraz, el nombre nunca se protegió y hoy casi toda la semilla llega de Canadá. Los duques que gobernaban Borgoña desde aquí fueron, durante parte del siglo XV, más ricos que los reyes de Francia.|La moutarde de Dijon est une recette, pas une origine : en 1752 un fabricant remplaça le vinaigre par du verjus, le nom ne fut jamais protégé, et la graine vient aujourd'hui surtout du Canada. Les ducs qui gouvernaient la Bourgogne d'ici furent, une partie du XVe siècle, plus riches que les rois de France.|ディジョンのマスタードは土地ではなく作り方の名である。1752年に地元の職人が酢を未熟葡萄の絞り汁に替えたのが始まりで、名前は保護されなかったため、今では種の多くがカナダ産である。ここからブルゴーニュを治めた公は、15世紀の一時期、フランス王より富んでいた。",
    [prop("Mustard Mill|Molino de mostaza|Moutarderie|マスタードの臼", 280, 58),
     prop("Ducal Kitchen|Cocina ducal|Cuisines ducales|公爵家の厨房", 300, 62)],
  ),
  besancon: city(
    "Besançon|Besanzón|Besançon|ブザンソン",
    6.02, 47.24, "est", "alpine_peak", "alps", "r",
    "An island but for two hundred metres|Una isla salvo por doscientos metros|Une île à deux cents mètres près|あと二百メートルで島",
    "The river Doubs loops so tightly that the old town would be an island but for a neck of land two hundred metres wide, which Vauban closed with a citadel. By 1900 the city was making nine of every ten French watches, and it still holds the national laboratory that measures time.|El río Doubs traza un lazo tan cerrado que el casco antiguo sería una isla de no ser por un istmo de doscientos metros, que Vauban cerró con una ciudadela. Hacia 1900 la ciudad fabricaba nueve de cada diez relojes franceses, y aún alberga el laboratorio nacional que mide el tiempo.|Le Doubs fait une boucle si serrée que la vieille ville serait une île sans un col de deux cents mètres, que Vauban a fermé par une citadelle. Vers 1900, la ville produisait neuf montres françaises sur dix, et elle abrite encore le laboratoire national qui mesure le temps.|ドゥー川の蛇行があまりに深く、旧市街は幅200mの首を残して島も同然である。ヴォーバンはその首を城塞で塞いだ。1900年頃、フランスの時計の十のうち九はこの街で作られており、今も国の時間標準を測る研究所がある。",
    [prop("Watchmaker's Bench|Banco de relojero|Établi d'horloger|時計師の作業台", 300, 62),
     prop("Citadel Rampart|Muralla de la ciudadela|Rempart de la citadelle|城塞の壁", 280, 58)],
  ),
  lyon: city(
    "Lyon|Lyon|Lyon|リヨン",
    4.84, 45.76, "est", "chateau_tour", "oldtown", "r",
    "Secret passages between two rivers|Pasajes secretos entre dos ríos|Traboules entre deux fleuves|二つの川のあいだの抜け道",
    "Silk workers cut covered passages called traboules straight through the buildings so bolts of cloth could cross the hill without getting wet. The city is also where cinema was first shown to a paying audience.|Los sederos abrieron pasajes cubiertos, las traboules, para cruzar la colina sin mojar la tela. Aquí se proyectó el cine por primera vez ante público de pago.|Les canuts percèrent des passages couverts, les traboules, pour traverser la colline sans mouiller la soie. C'est ici que le cinéma fut projeté pour la première fois devant un public payant.|絹織工は建物を貫く「トラブール」という抜け道を作り、反物を濡らさずに丘を越えた。有料の観客に映画が初めて上映された街でもある。",
    [prop("Silk Weaver's Loft|Taller de seda|Atelier de canut|絹織工の仕事場", 300, 62),
     prop("Bouchon Restaurant|Bouchon|Bouchon|ブション(食堂)", 290, 60)],
  ),
  annecy: city(
    "Annecy|Annecy|Annecy|アヌシー",
    6.13, 45.90, "est", "alpine_peak", "alps", "r",
    "The lake they agreed to save|El lago que acordaron salvar|Le lac qu'ils ont décidé de sauver|皆で守ると決めた湖",
    "The lake is among the cleanest in Europe because in 1957 the towns around it agreed to pipe every drop of their sewage out of the basin, an unusual thing to manage at the time. A 12th-century prison stands in the middle of the canal in the old town, splitting the current like the bow of a ship.|El lago es de los más limpios de Europa porque en 1957 los municipios de su cuenca acordaron sacar de ella hasta la última gota de aguas residuales, algo insólito para la época. Una prisión del siglo XII se alza en medio del canal del casco viejo, partiendo la corriente como la proa de un barco.|Le lac compte parmi les plus propres d'Europe parce qu'en 1957 les communes du pourtour ont accepté d'évacuer hors du bassin la moindre goutte d'eaux usées, ce qui était rare à l'époque. Une prison du XIIe siècle occupe le milieu du canal, fendant le courant comme une étrave.|1957年、湖畔の自治体が下水を一滴残らず流域の外へ出すと取り決めたため、この湖はヨーロッパでも指折りの清らかさを保っている。当時としては珍しい合意だった。旧市街では12世紀の牢獄が運河の真ん中に建ち、舳先のように流れを二つに割っている。",
    [prop("Canal Arcade|Soportales del canal|Arcades du canal|運河沿いの回廊", 280, 58),
     prop("Lake Steamer Pier|Embarcadero del lago|Embarcadère du lac|湖の汽船桟橋", 260, 54)],
  ),
  chamonix: city(
    "Chamonix|Chamonix|Chamonix|シャモニー",
    6.87, 45.92, "est", "alpine_peak", "alps", "r",
    "The first Winter Games, under the highest peak|Los primeros Juegos de invierno, bajo la cumbre más alta|Les premiers Jeux d'hiver, sous le plus haut sommet|最も高い峰の下、最初の冬季大会",
    "The first Winter Olympics were held here in 1924, and the first ascent of Mont Blanc, in 1786, was made for a cash prize a Geneva scientist had left standing for twenty-six years. The glacier above the town has thinned by more than a hundred metres since 1900, so the staircase down to it is lengthened every few years.|Los primeros Juegos Olímpicos de invierno se celebraron aquí en 1924, y la primera ascensión al Mont Blanc, en 1786, se hizo por un premio que un sabio ginebrino había dejado en pie veintiséis años. El glaciar sobre el pueblo ha perdido más de cien metros de espesor desde 1900, y la escalera que baja hasta él se alarga cada pocos años.|Les premiers Jeux olympiques d'hiver s'y tinrent en 1924, et la première ascension du mont Blanc, en 1786, fut faite pour une prime qu'un savant genevois avait laissée ouverte vingt-six ans. Le glacier au-dessus du bourg a perdu plus de cent mètres d'épaisseur depuis 1900 : on rallonge tous les quelques années l'escalier qui y descend.|1924年、最初の冬季オリンピックがここで開かれた。1786年のモンブラン初登頂は、ジュネーヴの学者が26年間出しっぱなしにしていた懸賞金を目当てのものだった。町の上の氷河は1900年以来100m以上薄くなり、そこへ下りる階段は数年ごとに継ぎ足されている。",
    [prop("Cable Car Station|Estación del teleférico|Gare du téléphérique|ロープウェイの駅", 330, 68),
     prop("Guides' Bureau|Oficina de guías|Compagnie des guides|ガイド組合の事務所", 280, 58)],
  ),
  grenoble: city(
    "Grenoble|Grenoble|Grenoble|グルノーブル",
    5.72, 45.19, "est", "alpine_peak", "alps", "l",
    "White coal and glass bubbles|Carbón blanco y burbujas de vidrio|La houille blanche et des bulles de verre|白い石炭と、硝子の泡",
    "In 1869 an engineer here ran a paper mill off a pipe dropping two hundred metres down the mountain and called the result white coal, which is where French hydroelectricity begins. Its egg-shaped cable cars, strung over the river since 1934, were among the first anywhere built to carry people across a city rather than up a mountain.|En 1869 un ingeniero movió aquí una fábrica de papel con una tubería que caía doscientos metros desde la montaña y llamó a aquello carbón blanco: allí empieza la hidroelectricidad francesa. Sus cabinas esféricas, tendidas sobre el río desde 1934, fueron de las primeras pensadas para cruzar una ciudad y no para subir a una cima.|En 1869, un ingénieur y fit tourner une papeterie avec une conduite tombant de deux cents mètres et appela cela la houille blanche : c'est là que commence l'hydroélectricité française. Ses bulles de verre, tendues au-dessus de l'Isère depuis 1934, furent parmi les premières cabines conçues pour traverser une ville plutôt que gravir une montagne.|1869年、ある技師が標高差200mの導水管で製紙工場を回し、これを「白い石炭」と呼んだ。フランスの水力発電はここから始まる。1934年から川の上に架かる卵形のゴンドラは、山へ登るためでなく街を横切るために造られた最初期のものである。",
    [prop("Bubble Cable Car|Teleférico de burbujas|Téléphérique des bulles|泡形のゴンドラ", 300, 62),
     prop("Walnut Orchard|Nogal en producción|Noyeraie|胡桃の果樹園", 260, 54)],
  ),

  // ---------------------------------------------------------------------
  // sud — 南西とピレネー
  // ---------------------------------------------------------------------
  larochelle: city(
    "La Rochelle|La Rochela|La Rochelle|ラ・ロシェル",
    -1.15, 46.16, "sud", "chateau_tour", "atlantic", "l",
    "Starved out behind a stone dyke|Rendida por hambre tras un dique|Affamée derrière une digue de pierre|石の堤で干し上げられた町",
    "When the Protestant city refused the king in 1627, Richelieu closed the harbour mouth with a stone dyke more than a kilometre long; of 28,000 people shut inside, about 5,000 were alive at the surrender fourteen months later. A chain is still slung between the two harbour towers at night, as it has been since the 14th century.|Cuando la ciudad protestante desafió al rey en 1627, Richelieu cerró la bocana con un dique de piedra de más de un kilómetro; de las 28.000 personas encerradas, unas 5.000 seguían vivas en la rendición, catorce meses después. Entre las dos torres del puerto aún se tiende una cadena por la noche, como desde el siglo XIV.|Quand la ville protestante refusa le roi en 1627, Richelieu ferma la baie par une digue de pierre de plus d'un kilomètre ; des 28 000 habitants enfermés, environ 5 000 étaient vivants à la reddition, quatorze mois plus tard. Une chaîne est toujours tendue la nuit entre les deux tours du port, comme depuis le XIVe siècle.|1627年、プロテスタントの町が王に背くと、リシュリューは湾口に1kmを超える石の堤を築いて封じた。籠城した2万8千のうち、14か月後の降伏時に生きていたのは約5千である。港の二つの塔のあいだには、14世紀から変わらず夜ごと鎖が張られる。",
    [prop("Harbour Chain Tower|Torre de la cadena|Tour de la chaîne|鎖の塔", 300, 62),
     prop("Fish Auction Hall|Lonja de pescado|Criée aux poissons|魚の競り場", 270, 56)],
  ),
  cognac: city(
    "Cognac|Cognac|Cognac|コニャック",
    -0.33, 45.70, "sud", "vine", "vineyard", "r",
    "The share the angels take|La parte que se llevan los ángeles|La part des anges|天使の取り分",
    "About two per cent of every barrel evaporates each year — the angels' share, some twenty million bottles' worth. The alcohol in the air feeds a black fungus that darkens the walls of the whole town, and it was that stain which used to give away the stills nobody had declared.|Cerca del dos por ciento de cada barrica se evapora al año: la parte de los ángeles, unos veinte millones de botellas. El alcohol en el aire alimenta un hongo negro que ennegrece las paredes de todo el pueblo, y era esa mancha la que delataba los alambiques no declarados.|Environ deux pour cent de chaque fût s'évapore par an : la part des anges, quelque vingt millions de bouteilles. L'alcool dans l'air nourrit un champignon noir qui noircit les murs de toute la ville, et c'était cette tache qui trahissait autrefois les alambics non déclarés.|樽の中身は毎年2%ほど蒸発する。「天使の取り分」と呼ばれ、量にすれば二千万本にあたる。空気中のアルコールを養分に黒い菌が育ち、町中の壁を黒く染める。かつては、その染みが申告していない蒸留器の在処を教えた。",
    [prop("Copper Still|Alambique de cobre|Alambic de cuivre|銅の蒸留器", 300, 62),
     prop("Ageing Cellar|Bodega de crianza|Chai de vieillissement|熟成の蔵", 320, 66)],
  ),
  bordeaux: city(
    "Bordeaux|Burdeos|Bordeaux|ボルドー",
    -0.58, 44.84, "sud", "vine", "vineyard", "r",
    "Wine measured by the château|Vino medido por château|Le vin classé par château|シャトー単位で計る葡萄酒",
    "The 1855 classification ranked the estates for a world fair and has barely changed since, which is why a label still decides the price. English rule for three centuries is why so much of it went to Britain.|La clasificación de 1855 ordenó las fincas para una exposición y apenas ha cambiado. Tres siglos de dominio inglés explican cuánto se exportaba a Gran Bretaña.|Le classement de 1855, établi pour une exposition, n'a presque pas bougé. Trois siècles de domination anglaise expliquent l'ampleur des exportations vers la Grande-Bretagne.|1855年の格付けは万博のために作られ、以来ほとんど変わっていない。ラベルが値段を決めるのはそのためである。三世紀にわたる英国支配が、英国向け輸出の多さの理由である。",
    [prop("Left Bank Château|Château de la orilla izquierda|Château de la rive gauche|左岸のシャトー", 340, 70),
     prop("Stone Quay Cellars|Bodegas del muelle|Chais des quais|河岸の酒蔵", 300, 62)],
  ),
  lascaux: city(
    "Lascaux|Lascaux|Lascaux|ラスコー",
    1.17, 45.05, "sud", "menhir", "bocage", "r",
    "Closed in order to save what was found|Cerrada para salvar lo que se halló|Fermée pour sauver ce qu'on y avait trouvé|見つけたものを守るために閉じた",
    "Four teenagers and a dog found the cave in 1940, and within fifteen years the breath of visitors had grown algae over paintings that had lasted 17,000 years. It was shut in 1963, and what people walk through today is the fourth full-size copy built beside it.|Cuatro adolescentes y un perro dieron con la cueva en 1940, y en quince años el aliento de los visitantes hizo crecer algas sobre pinturas que habían durado 17.000 años. Se cerró en 1963, y lo que hoy se recorre es la cuarta copia a tamaño real levantada al lado.|Quatre adolescents et un chien trouvèrent la grotte en 1940, et en quinze ans le souffle des visiteurs fit pousser des algues sur des peintures qui avaient tenu 17 000 ans. Elle fut fermée en 1963, et ce que l'on visite aujourd'hui est le quatrième fac-similé grandeur nature bâti à côté.|1940年、四人の少年と一匹の犬が洞窟を見つけた。だが15年で、来訪者の呼気が1万7千年もった壁画に藻を生やした。1963年に閉鎖され、今歩けるのは隣に建てられた四代目の実物大の複製である。",
    [prop("Replica Cave|Cueva réplica|Fac-similé de la grotte|複製の洞窟", 310, 64),
     prop("Prehistory Museum|Museo de prehistoria|Musée de la préhistoire|先史の博物館", 270, 56)],
  ),
  biarritz: city(
    "Biarritz|Biarritz|Biarritz|ビアリッツ",
    -1.56, 43.48, "sud", "lighthouse_fr", "atlantic", "l",
    "Whalers, then an empress, then surfers|Balleneros, luego una emperatriz, luego surfistas|Des baleiniers, une impératrice, puis des surfeurs|捕鯨の村、皇后、そして波乗り",
    "A Spanish-born empress turned a whaling village into a royal resort in 1854 by building her summer house on the sand. Surfing reached Europe on this beach in 1957, when a Hollywood screenwriter had his board shipped over while a film was being made nearby.|Una emperatriz nacida en España convirtió un pueblo ballenero en balneario real al construir en 1854 su casa de verano sobre la arena. El surf llegó a Europa por esta playa en 1957, cuando un guionista de Hollywood se hizo enviar su tabla durante un rodaje cercano.|Une impératrice née en Espagne fit d'un village de baleiniers une station royale en bâtissant en 1854 sa maison d'été sur le sable. Le surf est arrivé en Europe sur cette plage en 1957, quand un scénariste d'Hollywood s'est fait expédier sa planche pendant un tournage voisin.|スペイン生まれの皇后が1854年、砂浜に夏の館を建て、捕鯨の村を王室の保養地に変えた。ヨーロッパの波乗りはこの浜から始まる。1957年、近くで映画を撮っていたハリウッドの脚本家が、自分の板を取り寄せたのが最初だった。",
    [prop("Beach Villa|Villa de la playa|Villa de la plage|浜辺の別荘", 320, 66),
     prop("Surfboard Shaper|Taller de tablas|Atelier de planches|サーフボードの工房", 250, 52)],
  ),
  lourdes: city(
    "Lourdes|Lourdes|Lourdes|ルルド",
    -0.05, 43.10, "sud", "cathedral_rose", "pyrenees", "l",
    "More hotel beds than anywhere but Paris|Más camas de hotel que ninguna ciudad salvo París|Plus de lits d'hôtel que partout sauf Paris|パリに次ぐ宿の町",
    "A fourteen-year-old girl reported eighteen visions at a grotto here in 1858, and the town now has more hotel beds than any French city except Paris. Of roughly seven thousand claimed cures, a standing medical bureau has let seventy stand.|Una niña de catorce años dijo haber tenido dieciocho visiones en una gruta en 1858, y hoy el pueblo tiene más camas de hotel que ninguna ciudad francesa salvo París. De unas siete mil curaciones alegadas, una oficina médica permanente ha dado por buenas setenta.|Une fille de quatorze ans dit avoir eu dix-huit apparitions dans une grotte en 1858, et la ville compte aujourd'hui plus de lits d'hôtel que toute ville française hormis Paris. Sur quelque sept mille guérisons revendiquées, un bureau médical permanent en a retenu soixante-dix.|1858年、14歳の少女がこの洞窟で18回の出現を見たと語った。町のホテルのベッド数は今、パリを除けばフランスで最も多い。申し立てられた約7千件の治癒のうち、常設の医務局が認めたのは70件である。",
    [prop("Pilgrim Hostel|Albergue de peregrinos|Hôtellerie de pèlerins|巡礼の宿", 290, 60),
     prop("Candle Workshop|Taller de cirios|Cirerie|蝋燭の工房", 250, 52)],
  ),
  toulouse: city(
    "Toulouse|Tolosa|Toulouse|トゥールーズ",
    1.44, 43.60, "sud", "arch", "capital", "r",
    "Pink brick, blue dye, aircraft|Ladrillo rosa, tinte azul, aviones|Brique rose, pastel bleu, avions|桃色の煉瓦、青い染料、飛行機",
    "The city is pink because the Garonne plain gives clay and almost no building stone, so everything is brick. Its 16th-century fortune came from woad, a blue dye grown in the fields around it, and its 20th-century one from aircraft: Concorde first left the ground here in 1969.|La ciudad es rosa porque la llanura del Garona da arcilla y casi ninguna piedra de construcción: todo se levanta en ladrillo. Su riqueza del siglo XVI vino del pastel, un tinte azul cultivado en los campos vecinos, y la del XX de los aviones: el Concorde despegó por primera vez desde aquí en 1969.|La ville est rose parce que la plaine de la Garonne donne de l'argile et presque pas de pierre à bâtir : tout est en brique. Sa fortune du XVIe siècle vint du pastel, une teinture bleue cultivée alentour, et celle du XXe des avions : le Concorde décolla d'ici pour la première fois en 1969.|ガロンヌの平野は粘土は出るが建築用の石をほとんど出さない。だから街は丸ごと煉瓦で、全体が桃色をしている。16世紀の富は周囲の畑で採れた青い染料パステルから、20世紀の富は飛行機から来た。コンコルドが初めて浮いたのもここである。",
    [prop("Aircraft Assembly Hall|Nave de montaje de aviones|Halle d'assemblage|航空機の組立工場", 350, 72),
     prop("Brick Mansion|Casa de mercader de pastel|Hôtel particulier en brique|煉瓦の豪邸", 290, 60)],
  ),
  albi: city(
    "Albi|Albi|Albi|アルビ",
    2.15, 43.93, "sud", "chateau_tour", "oldtown", "r",
    "A cathedral built to loom|Una catedral hecha para imponerse|Une cathédrale bâtie pour dominer|睨みをきかせるための大聖堂",
    "Its cathedral is the largest brick building in the world and was raised deliberately like a fortress, to stand over a region the Church had just crushed for heresy. Toulouse-Lautrec was born a few streets away, and the town holds the largest collection of his paintings anywhere.|Su catedral es el mayor edificio de ladrillo del mundo y se alzó a propósito como una fortaleza, para dominar una comarca que la Iglesia acababa de aplastar por herejía. Toulouse-Lautrec nació a unas calles de allí, y la ciudad guarda la mayor colección de sus cuadros.|Sa cathédrale est le plus grand édifice de brique au monde et fut dressée exprès comme une forteresse, pour dominer un pays que l'Église venait d'écraser pour hérésie. Toulouse-Lautrec est né à quelques rues de là, et la ville conserve la plus grande collection de ses tableaux.|この大聖堂は世界最大の煉瓦造建築で、教会が異端として叩き潰したばかりの地方を見下ろすため、わざと城塞のように建てられた。トゥールーズ=ロートレックは数本先の通りで生まれ、町には彼の絵の世界最大の集まりがある。",
    [prop("Brick Cathedral|Catedral de ladrillo|Cathédrale de brique|煉瓦の大聖堂", 310, 64),
     prop("Woad Merchant's House|Casa del pastelero|Maison de pastelier|パステル商人の館", 270, 56)],
  ),
  carcassonne: city(
    "Carcassonne|Carcasona|Carcassonne|カルカソンヌ",
    2.35, 43.21, "sud", "chateau_tour", "chateau", "l",
    "Saved by an argument about roofs|Salvada por una discusión sobre tejados|Sauvée par une querelle de toitures|屋根をめぐる論争に救われた城",
    "The walled town was falling down and marked for demolition in 1850, until Viollet-le-Duc rebuilt it. He roofed its 52 towers in pointed slate, a northern shape that historians still say has no business this far south.|La ciudadela se caía a pedazos y estaba condenada al derribo en 1850, hasta que Viollet-le-Duc la reconstruyó. Cubrió sus 52 torres con pizarra puntiaguda, una forma del norte que los historiadores siguen diciendo que no pinta nada tan al sur.|La cité tombait en ruine et devait être démolie en 1850, avant que Viollet-le-Duc ne la relève. Il coiffa ses 52 tours d'ardoises en pointe, une forme du Nord dont les historiens répètent qu'elle n'a rien à faire aussi loin au sud.|城塞都市は崩れかけ、1850年には取り壊しが決まっていたが、ヴィオレ・ル・デュクが建て直した。彼は52の塔にとがったスレート屋根をかけた。北国の形で、これほど南に似合うはずがないと歴史家は今も言う。",
    [prop("Double Rampart|Doble muralla|Double enceinte|二重の城壁", 320, 66),
     prop("Cassoulet Kitchen|Cocina de cassoulet|Cuisine à cassoulet|カスレの厨房", 260, 54)],
  ),

  // ---------------------------------------------------------------------
  // med — 地中海とコルシカ
  // ---------------------------------------------------------------------
  nimes: city(
    "Nîmes|Nimes|Nîmes|ニーム",
    4.36, 43.84, "med", "arch", "lavender", "l",
    "A crocodile, and a cloth|Un cocodrilo y una tela|Un crocodile, et une toile|鰐と、布地",
    "The crocodile chained to a palm on the city's arms comes from a Roman coin struck for soldiers settled here after the conquest of Egypt. The hard twill woven in the town went to America as serge de Nîmes and came back with the name worn down to denim.|El cocodrilo encadenado a una palmera del escudo viene de una moneda romana acuñada para los soldados asentados aquí tras la conquista de Egipto. La sarga recia que se tejía en la ciudad viajó a América como serge de Nîmes y volvió con el nombre gastado hasta quedar en denim.|Le crocodile enchaîné au palmier des armes de la ville vient d'une monnaie romaine frappée pour les soldats installés ici après la conquête de l'Égypte. La serge solide qu'on y tissait partit en Amérique sous le nom de serge de Nîmes et revint, le mot usé, en denim.|市の紋章にある、椰子に鎖でつながれた鰐は、エジプト征服後にここへ入植した兵に配られたローマの貨幣に由来する。町で織られていた丈夫な綾織はserge de Nîmesとしてアメリカへ渡り、名を擦り減らしてデニムになって戻ってきた。",
    [prop("Roman Arena|Anfiteatro romano|Arènes romaines|ローマの闘技場", 320, 66),
     prop("Serge Weaving Shed|Nave de tejido de sarga|Atelier de serge|綾織の工場", 270, 56)],
  ),
  arles: city(
    "Arles|Arlés|Arles|アルル",
    4.63, 43.68, "med", "lavender_sprig", "lavender", "r",
    "Two hundred canvases, none of them here|Doscientos lienzos, ninguno aquí|Deux cents toiles, aucune sur place|二百枚描いて、一枚も残らず",
    "Van Gogh painted about two hundred canvases here in fifteen months, and not one of them stayed in the town. South of it the Camargue, a delta of salt marsh, white horses and flamingos, grows most of the rice eaten in France.|Van Gogh pintó aquí unos doscientos lienzos en quince meses, y ninguno se quedó en la ciudad. Al sur se abre la Camarga, un delta de marismas saladas, caballos blancos y flamencos, donde se cultiva casi todo el arroz que se come en Francia.|Van Gogh y peignit environ deux cents toiles en quinze mois, et pas une n'est restée dans la ville. Au sud s'ouvre la Camargue, delta de marais salants, de chevaux blancs et de flamants, où pousse l'essentiel du riz mangé en France.|ゴッホは15か月でここに約200枚を描いたが、そのうち一枚も町には残らなかった。南に広がるカマルグは塩沼と白い馬とフラミンゴの三角州で、フランスで食べられる米の大半がここで穫れる。",
    [prop("Rice Paddy Farm|Arrozal|Rizière de Camargue|カマルグの水田", 280, 58),
     prop("Roman Theatre|Teatro romano|Théâtre antique|ローマの劇場", 300, 62)],
  ),
  avignon: city(
    "Avignon|Aviñón|Avignon|アヴィニョン",
    4.81, 43.95, "med", "chateau_tour", "lavender", "r",
    "The song has the bridge wrong|La canción se equivoca de puente|La chanson se trompe de pont|歌は橋を間違えている",
    "Seven popes ruled the Church from here between 1309 and 1377, out of what is still the largest Gothic palace anywhere. The famous bridge lost most of its 22 arches to the Rhône, and the song has it wrong: people danced under the bridge, on the island beneath.|Siete papas gobernaron la Iglesia desde aquí entre 1309 y 1377, en el que sigue siendo el mayor palacio gótico del mundo. El puente famoso perdió casi todos sus 22 arcos por el Ródano, y la canción lo cuenta mal: se bailaba debajo del puente, en la isla.|Sept papes ont gouverné l'Église d'ici entre 1309 et 1377, depuis ce qui reste le plus grand palais gothique du monde. Le pont célèbre a perdu la plupart de ses 22 arches dans le Rhône, et la chanson se trompe : on dansait sous le pont, sur l'île.|1309年から1377年まで、七人の教皇がここから教会を治めた。その宮殿は今も世界最大のゴシック建築である。名高い橋は22あった橋脚の大半をローヌに奪われた。そして歌は間違っている。人が踊ったのは橋の上ではなく、下の中州である。",
    [prop("Papal Palace Hall|Sala del palacio papal|Grande salle du palais|教皇宮の大広間", 330, 68),
     prop("Broken Bridge Toll|Peaje del puente roto|Péage du pont rompu|途切れた橋の通行料", 260, 54)],
  ),
  montpellier: city(
    "Montpellier|Montpellier|Montpellier|モンペリエ",
    3.88, 43.61, "med", "cathedral_rose", "riviera", "l",
    "Teaching medicine since before the printing press|Enseñando medicina desde antes de la imprenta|On y enseigne la médecine depuis avant l'imprimerie|活版印刷より古い医学校",
    "Its medical faculty has been teaching since at least 1220 and has never closed, which makes it the oldest still running in the western world. The physic garden planted in 1593 to grow specimens for those lectures is the oldest botanical garden in France.|Su facultad de medicina enseña desde al menos 1220 y nunca ha cerrado, lo que la hace la más antigua del mundo occidental aún en activo. El jardín de plantas medicinales sembrado en 1593 para aquellas clases es el jardín botánico más antiguo de Francia.|Sa faculté de médecine enseigne depuis 1220 au moins et n'a jamais fermé, ce qui en fait la plus ancienne encore en activité dans le monde occidental. Le jardin des plantes semé en 1593 pour fournir ces cours est le plus vieux jardin botanique de France.|この医学部は遅くとも1220年から教え続け、一度も閉じていない。西欧で今も動いている医学校としては最古である。その講義用の標本を育てるため1593年に作られた薬草園は、フランス最古の植物園である。",
    [prop("Anatomy Theatre|Teatro anatómico|Théâtre anatomique|解剖の階段教室", 290, 60),
     prop("Physic Garden|Jardín de plantas medicinales|Jardin des plantes|薬草園", 270, 56)],
  ),
  aix: city(
    "Aix-en-Provence|Aix-en-Provence|Aix-en-Provence|エクス・アン・プロヴァンス",
    5.45, 43.53, "med", "lavender_sprig", "lavender", "r",
    "Warm water and one mountain|Agua templada y una montaña|De l'eau tiède et une montagne|温い水と、ひとつの山",
    "The Romans founded it in 122 BC around hot springs, which makes it the oldest Roman town in France, and some forty fountains still run in its streets, one of them warm to the touch. Cézanne painted the mountain east of the city more than eighty times, working out how to build a solid shape out of flat patches of colour.|Los romanos la fundaron en 122 a.C. junto a unas fuentes termales, lo que la hace la ciudad romana más antigua de Francia, y todavía manan unas cuarenta fuentes en sus calles, una de ellas tibia al tacto. Cézanne pintó la montaña del este más de ochenta veces, buscando cómo levantar un volumen con manchas planas de color.|Les Romains la fondèrent en 122 av. J.-C. autour de sources chaudes, ce qui en fait la plus ancienne ville romaine de France, et une quarantaine de fontaines coulent encore dans ses rues, dont une tiède. Cézanne peignit plus de quatre-vingts fois la montagne à l'est, cherchant comment bâtir un volume avec des taches plates de couleur.|ローマ人が紀元前122年、温泉のそばに開いた町で、フランス最古のローマ都市である。街路には今も40ほどの泉が湧き、そのうちのひとつは手にぬるい。セザンヌは東の山を80回以上描き、平らな色の斑から立体を組み立てる方法を探り続けた。",
    [prop("Warm Fountain|Fuente templada|Fontaine d'eau chaude|温い水の泉", 270, 56),
     prop("Calisson Confectioner|Confitería de calissons|Confiserie de calissons|カリソンの菓子店", 260, 54)],
  ),
  marseille: city(
    "Marseille|Marsella|Marseille|マルセイユ",
    5.37, 43.3, "med", "sailboat_fr", "riviera", "l",
    "France's oldest city|La ciudad más antigua de Francia|La plus vieille ville de France|フランス最古の街",
    "Greek sailors from Asia Minor founded it around 600 BC, six centuries before Paris existed. Its fish soup, bouillabaisse, began as what the fishermen could not sell.|Marinos griegos la fundaron hacia el 600 a.C., seis siglos antes que París. Su bullabesa nació de lo que los pescadores no lograban vender.|Des marins grecs la fondèrent vers 600 av. J.-C., six siècles avant Paris. La bouillabaisse est née de ce que les pêcheurs ne vendaient pas.|紀元前600年頃、小アジアから来たギリシャ人の船乗りが築いた。パリより6世紀古い。ブイヤベースは漁師が売れ残った魚から始まった。",
    [prop("Old Port Quay|Muelle del puerto viejo|Quai du Vieux-Port|旧港の岸壁", 310, 64),
     prop("Soap Works|Fábrica de jabón|Savonnerie|石鹸工場", 270, 56)],
  ),
  cannes: city(
    "Cannes|Cannes|Cannes|カンヌ",
    7.02, 43.55, "med", "arch", "riviera", "r",
    "A festival that opened and closed the same day|Un festival que abrió y cerró el mismo día|Un festival ouvert et fermé le même jour|開いたその日に閉じた映画祭",
    "The film festival was invented in 1939 as a way out of Venice, where the prizes had begun going wherever Mussolini's government wanted them to go. It opened on 1 September that year and was called off the same day, because Germany had invaded Poland; it started again in 1946.|El festival de cine se inventó en 1939 como salida a Venecia, donde los premios habían empezado a caer donde quería el gobierno de Mussolini. Abrió el 1 de septiembre de aquel año y se suspendió ese mismo día, porque Alemania había invadido Polonia; volvió a empezar en 1946.|Le festival fut inventé en 1939 pour sortir de Venise, où les prix commençaient à tomber là où le gouvernement de Mussolini le voulait. Il ouvrit le 1er septembre de cette année-là et fut annulé le jour même, l'Allemagne ayant envahi la Pologne ; il reprit en 1946.|この映画祭は1939年、ムッソリーニ政権の意向どおりに賞が動きはじめたヴェネツィアから抜け出すために作られた。同年9月1日に開幕し、ドイツがポーランドに侵攻したその日のうちに中止された。再開は1946年である。",
    [prop("Festival Palace|Palacio del festival|Palais du festival|映画祭の会館", 330, 68),
     prop("Yacht Mooring|Amarre de yates|Poste d'amarrage|ヨットの係留地", 300, 62)],
  ),
  nice: city(
    "Nice|Niza|Nice|ニース",
    7.27, 43.70, "med", "arch", "riviera", "r",
    "French since a vote in 1860|Francesa desde una votación de 1860|Française depuis un vote de 1860|1860年の投票からフランス",
    "Nice belonged to the House of Savoy until 1860, when a vote handed it to France as payment for help in unifying Italy; Garibaldi, born in the old town, never accepted it. The seafront promenade was paid for by English winter residents in 1820, to give work to labourers ruined by a failed orange crop.|Niza perteneció a la casa de Saboya hasta 1860, cuando una votación la entregó a Francia como pago por su ayuda en la unificación de Italia; Garibaldi, nacido en el casco viejo, nunca lo aceptó. El paseo marítimo lo costearon en 1820 los residentes ingleses de invierno, para dar trabajo a jornaleros arruinados por una cosecha de naranja perdida.|Nice appartint à la maison de Savoie jusqu'en 1860, quand un vote la donna à la France en paiement de son aide à l'unité italienne ; Garibaldi, né dans la vieille ville, ne l'admit jamais. La promenade du bord de mer fut payée en 1820 par les hivernants anglais, pour employer des journaliers ruinés par une récolte d'oranges perdue.|ニースは1860年までサヴォイア家の領で、イタリア統一を助けた代償として住民投票を経てフランスに渡った。旧市街生まれのガリバルディは最後まで納得しなかった。海沿いの遊歩道は1820年、冬を過ごす英国人たちが、橙の不作で食えなくなった日雇いに仕事を作るために出資したものである。",
    [prop("Seafront Promenade|Paseo marítimo|Promenade du bord de mer|海沿いの遊歩道", 310, 64),
     prop("Flower Market|Mercado de flores|Marché aux fleurs|花市場", 280, 58)],
  ),
  ajaccio: city(
    "Ajaccio|Ayaccio|Ajaccio|アジャクシオ",
    8.74, 41.93, "med", "chateau_tour", "riviera", "l",
    "French by one year|Francés por un año|Français à un an près|一年違いでフランス人",
    "Genoa sold Corsica to France in 1768, and Napoleon was born in this town the following year — French by a single year's margin. Before that the island had governed itself for fourteen years under a constitution that let women vote, one of the first anywhere to do so.|Génova vendió Córcega a Francia en 1768, y Napoleón nació en esta ciudad al año siguiente: francés por un solo año de margen. Antes la isla se gobernó sola catorce años bajo una constitución que daba voto a las mujeres, de las primeras del mundo en hacerlo.|Gênes vendit la Corse à la France en 1768, et Napoléon naquit dans cette ville l'année suivante : français à un an près. L'île s'était auparavant gouvernée seule pendant quatorze ans, sous une constitution qui donnait le vote aux femmes, l'une des toutes premières à le faire.|ジェノヴァが1768年にコルシカをフランスへ売り、その翌年、ナポレオンはこの町で生まれた。わずか一年の差でフランス人だったわけである。それ以前の14年間、島は女性に投票権を与える憲法のもとで自らを治めていた。世界でも最初期の例である。",
    [prop("Citadel Harbour|Puerto de la ciudadela|Port de la citadelle|城塞の港", 290, 60),
     prop("Chestnut Grove|Castañar|Châtaigneraie|栗の林", 250, 52)],
  ),
};

/**
 * 路線。実際の鉄道網に沿わせ、パリから放射状に伸びる形にしてある。
 * 第3要素 "sea" は航路(コルシカへの連絡船)。
 */
export const FRANCE_EDGES = [
  // 北へ・ノルマンディへ
  ["paris", "lille"],
  ["paris", "giverny"],
  ["giverny", "rouen"],
  ["rouen", "lehavre"],
  ["lehavre", "etretat"],
  ["rouen", "amiens"],
  ["amiens", "lille"],
  ["rouen", "caen"],
  ["paris", "caen"],
  ["caen", "bayeux"],
  // ブルターニュへ
  ["bayeux", "montsaintmichel"],
  ["montsaintmichel", "saintmalo"],
  ["saintmalo", "rennes"],
  ["paris", "rennes"],
  ["rennes", "brest"],
  ["brest", "quimper"],
  ["quimper", "nantes"],
  ["rennes", "nantes"],
  // ロワール
  ["nantes", "angers"],
  ["angers", "tours"],
  ["tours", "orleans"],
  ["orleans", "paris"],
  ["paris", "versailles"],
  ["versailles", "chartres"],
  ["chartres", "orleans"],
  // 東へ
  ["paris", "fontainebleau"],
  ["fontainebleau", "dijon"],
  ["paris", "reims"],
  ["reims", "metz"],
  ["metz", "nancy"],
  ["nancy", "strasbourg"],
  ["strasbourg", "colmar"],
  ["colmar", "besancon"],
  ["besancon", "dijon"],
  ["dijon", "lyon"],
  // アルプス
  ["lyon", "annecy"],
  ["annecy", "chamonix"],
  ["annecy", "grenoble"],
  ["grenoble", "lyon"],
  // ローヌを下って地中海へ
  ["lyon", "avignon"],
  ["avignon", "arles"],
  ["arles", "nimes"],
  ["nimes", "montpellier"],
  ["avignon", "aix"],
  ["aix", "marseille"],
  ["marseille", "cannes"],
  ["cannes", "nice"],
  // 南西へ
  ["montpellier", "carcassonne"],
  ["carcassonne", "toulouse"],
  ["carcassonne", "albi"],
  ["toulouse", "albi"],
  ["toulouse", "lourdes"],
  ["lourdes", "biarritz"],
  ["biarritz", "bordeaux"],
  ["bordeaux", "toulouse"],
  ["bordeaux", "lascaux"],
  ["lascaux", "toulouse"],
  // 大西洋岸
  ["tours", "cognac"],
  ["cognac", "bordeaux"],
  ["cognac", "larochelle"],
  ["larochelle", "nantes"],
  // 航路
  ["marseille", "ajaccio", "sea"],
  ["nice", "ajaccio", "sea"],
];
