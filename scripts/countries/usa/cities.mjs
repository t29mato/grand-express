/**
 * アメリカ合衆国(本土48州)の都市と路線。
 *
 * 47都市・6地方(ne北東部8 / south南部10 / mw中西部7 / plains大平原・山岳部7 /
 * sw南西部8 / pacific太平洋岸7)。ポートランドは `portlandmaine`(メイン州)と
 * `portlandoregon`(オレゴン州)で区別してある。
 *
 * 経度・緯度は実際の値。投影の範囲は geography.mjs の USA_PROJ を参照。
 * 全都市の座標は自作の点-in-多角形チェックで本土ポリゴンの内側に収まる
 * ことを確認済み(境界まで最低8.8px、多くは15px以上)。フロリダキーズと
 * サンディエゴは海岸線の単純化に合わせて実際のキーウェスト/ダウンタウンから
 * 少しだけ動かしてある(下記コメント参照)。
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const USA_CITIES = {
  // ---------------------------------------------------------------------
  // ne — 北東部(8)
  // ---------------------------------------------------------------------
  newyork: city(
    "New York|Nueva York|New York|ニューヨーク",
    -74.01, 40.71, "ne", "skyline", "skyline", "l",
    "A trade whose meaning the two sides probably didn't share|Un trato cuyo significado ambos lados probablemente no compartían|Un accord dont le sens n'était sans doute pas partagé par les deux parties|双方が同じ意味で受け取っていなかったであろう取引",
    "Dutch colonists recorded trading goods worth about 60 guilders in 1626 — later flattened into the story of '$24 of beads' — for land the Lenape people living there may never have understood as a permanent sale in the European sense of owning ground outright. The island changed hands again in 1664 when England seized it from the Dutch without a shot fired and renamed it after the Duke of York, and the subway that opened in 1904 now carries more than five million riders on an ordinary weekday.|Los colonos neerlandeses registraron en 1626 el intercambio de bienes por valor de unos 60 florines —reducido después a la historia de «24 dólares en abalorios»— por tierras que el pueblo lenape que vivía allí quizá nunca entendió como una venta permanente al estilo europeo. La isla cambió de manos otra vez en 1664, cuando Inglaterra se la arrebató a los neerlandeses sin disparar un tiro y la rebautizó en honor al duque de York.|Des colons néerlandais consignèrent en 1626 l'échange de biens d'une valeur d'environ 60 florins — réduit plus tard à l'histoire des « 24 dollars de perles » — contre une terre que le peuple lenape qui y vivait n'a peut-être jamais comprise comme une vente permanente au sens européen. L'île changea encore de mains en 1664, quand l'Angleterre la prit aux Néerlandais sans tirer un coup de feu et la rebaptisa du nom du duc d'York.|オランダ人入植者は1626年、およそ60ギルダー相当の品と引き換えに土地を得たと記録している。のちに「ビーズ24ドル」という話に単純化されたこの取引だが、そこに暮らしていたレナペの人々は、ヨーロッパ式の「土地を完全に譲り渡す売買」として受け取っていなかった可能性が高い。この島は1664年、イングランドが一発の銃声もなくオランダから奪い取って再び持ち主を変え、ヨーク公にちなんで改名された。1904年に開業した地下鉄は、いまや平日一日に500万人を超える利用者を運んでいる。",
    [prop("Empire State Observation Deck|Mirador del Empire State|Belvédère de l'Empire State|エンパイア・ステートの展望台", 2900, 600),
     prop("Central Park Carriage Stand|Parada de carruajes de Central Park|Station de calèches de Central Park|セントラルパークの馬車乗り場", 900, 186)],
  ),

  boston: city(
    "Boston|Boston|Boston|ボストン",
    -71.06, 42.36, "ne", "harbor", "harbor", "r",
    "A tea party that only got its name decades later|Una fiesta del té que solo recibió su nombre décadas después|Une « tea party » qui n'a reçu son nom que des décennies plus tard|何十年も経ってから名付けられた「お茶会」",
    "On the night of December 16, 1773, colonists boarded three ships in the harbor and dumped 342 chests of British tea into the water to protest a tax they had no vote on; the phrase \"Boston Tea Party\" was only coined decades afterward. The 4-kilometre Freedom Trail, laid into the sidewalk in brick and paint since 1951, still links the sixteen sites its organizers judged essential to that story.|En la noche del 16 de diciembre de 1773, colonos subieron a tres barcos en el puerto y arrojaron al agua 342 cajones de té británico para protestar por un impuesto que no habían votado; la frase «Boston Tea Party» se acuñó recién décadas después. El Freedom Trail de 4 kilómetros, trazado en ladrillo y pintura desde 1951, sigue uniendo los dieciséis lugares que sus organizadores juzgaron esenciales para esa historia.|Dans la nuit du 16 décembre 1773, des colons montèrent à bord de trois navires dans le port et jetèrent à l'eau 342 caisses de thé britannique pour protester contre une taxe qu'ils n'avaient jamais votée ; l'expression « Boston Tea Party » ne fut forgée que des décennies plus tard. Le Freedom Trail, tracé en briques et en peinture sur le trottoir depuis 1951, relie toujours les seize lieux que ses organisateurs jugèrent essentiels à cette histoire.|1773年12月16日の夜、入植者たちは港に停泊した3隻の船に乗り込み、自分たちが投票権を持たないまま課された税に抗議して342個の茶箱を海に投げ捨てた。「ボストン茶会事件」という呼び名が付けられたのは、それから何十年も後のことである。1951年から歩道にレンガと塗装で描かれている4キロメートルのフリーダム・トレイルは、いまも主催者たちがこの物語に欠かせないと判断した16か所を結んでいる。",
    [prop("Old State House Balcony|Balcón de la Casa Vieja del Estado|Balcon de l'Old State House|オールド・ステートハウスのバルコニー", 950, 197),
     prop("Fenway Park Green Monster Seat|Asiento del Green Monster en Fenway Park|Siège du Green Monster à Fenway Park|フェンウェイ・パークのグリーンモンスター席", 420, 87)],
  ),

  philadelphia: city(
    "Philadelphia|Filadelfia|Philadelphie|フィラデルフィア",
    -75.16, 39.95, "ne", "libertybell", "colonial", "l",
    "One room where two documents that never agreed on much were signed|Una sala donde se firmaron dos documentos que casi nunca coincidieron|Une seule salle où furent signés deux textes qui ne s'accordaient guère|ほとんど意見の合わなかった二つの文書が、同じ一部屋で署名された",
    "The Declaration of Independence was adopted in the Pennsylvania State House's Assembly Room in 1776, and the Constitution was hammered out in the very same room eleven years later, in 1787. The Liberty Bell hanging nearby cracked so badly while being rung for Washington's birthday in 1846 that it has not been rung since, only tapped once a year on the Fourth of July.|La Declaración de Independencia se adoptó en la Sala de la Asamblea de la Casa del Estado de Pensilvania en 1776, y la Constitución se redactó en esa misma sala once años después, en 1787. La Campana de la Libertad, colgada cerca, se agrietó tan gravemente al tocarla por el cumpleaños de Washington en 1846 que no ha vuelto a repicar desde entonces, y solo se golpea una vez al año el Cuatro de Julio.|La déclaration d'Indépendance fut adoptée dans la salle d'Assemblée de la State House de Pennsylvanie en 1776, et la Constitution y fut rédigée dans cette même salle onze ans plus tard, en 1787. La cloche de la Liberté suspendue à proximité se fissura si gravement lorsqu'on la sonna pour l'anniversaire de Washington en 1846 qu'elle n'a plus jamais sonné depuis, seulement effleurée une fois l'an, le 4 juillet.|独立宣言は1776年、ペンシルベニア州会議事堂の議事堂の間で採択され、その11年後の1787年、合衆国憲法もまさに同じ部屋で練り上げられた。すぐ近くに吊るされた自由の鐘は、1846年にワシントンの誕生日を祝って鳴らされた際にひどく割れてしまい、それ以来一度も本格的には鳴らされておらず、独立記念日の7月4日に年一度そっと叩かれるだけである。",
    [prop("Independence Hall Assembly Room|Sala de la Asamblea de Independence Hall|Salle d'Assemblée d'Independence Hall|インディペンデンス・ホール議事堂の間", 1000, 207),
     prop("Reading Terminal Market Stall|Puesto del Reading Terminal Market|Étal du Reading Terminal Market|リーディング・ターミナル・マーケットの屋台", 480, 99)],
  ),

  washingtondc: city(
    "Washington, D.C.|Washington, D.C.|Washington, D.C.|ワシントンD.C.",
    -77.04, 38.91, "ne", "dome", "mall", "l",
    "A capital built on land no state would miss|Una capital construida en tierra que ningún estado echaría de menos|Une capitale bâtie sur une terre qu'aucun État ne regretterait|どの州も惜しまない土地に建てられた首都",
    "Neither Maryland nor Virginia wanted another state to host the new federal capital, so in 1790 both ceded a diamond of swampy land along the Potomac to form a neutral district answerable to no state government at all. By long-standing custom no building in the city rises taller than the Capitol dome, so its skyline stays flat while the rest of urban America builds upward.|Ni Maryland ni Virginia querían que otro estado albergara la nueva capital federal, así que en 1790 ambos cedieron un rombo de tierra pantanosa junto al Potomac para formar un distrito neutral que no respondiera a ningún gobierno estatal. Por una vieja costumbre, ningún edificio de la ciudad supera en altura la cúpula del Capitolio, así que su perfil urbano se mantiene plano mientras el resto de las ciudades estadounidenses crece hacia arriba.|Ni le Maryland ni la Virginie ne voulaient qu'un autre État accueille la nouvelle capitale fédérale, si bien qu'en 1790 les deux cédèrent un losange de terres marécageuses le long du Potomac pour former un district neutre ne répondant à aucun gouvernement d'État. Par une coutume bien ancrée, aucun bâtiment de la ville ne dépasse en hauteur le dôme du Capitole, de sorte que sa silhouette reste plate tandis que le reste des villes américaines pousse vers le ciel.|メリーランドもバージニアも、新しい連邦首都を他州に置かせたくなかったため、1790年に両州はポトマック川沿いの湿地をひし形に切り出し、どの州政府にも属さない中立の特別区を作った。長年の慣習により、市内のどの建物も連邦議事堂のドームより高くしてはならないとされ、他のアメリカの都市が上へ伸びていく中、ここのスカイラインだけは低く平らなままである。",
    [prop("Capitol Dome Visitor Steps|Escalinata de visitantes de la cúpula del Capitolio|Marches des visiteurs du dôme du Capitole|連邦議事堂ドームの見学者用階段", 1400, 290),
     prop("Tidal Basin Cherry Blossom Path|Sendero de cerezos del Tidal Basin|Allée des cerisiers du Tidal Basin|タイダル・ベイスンの桜並木の小道", 600, 124)],
  ),

  portlandmaine: city(
    "Portland, Maine|Portland (Maine)|Portland (Maine)|ポートランド(メイン州)",
    -70.26, 43.66, "ne", "lighthouse", "harbor", "r",
    "A lighthouse ordered by the country's first president|Un faro que mandó construir el primer presidente del país|Un phare commandé par le tout premier président du pays|建国間もない初代大統領が発注した灯台",
    "George Washington personally ordered the construction of Portland Head Light in 1791, and it still stands today as Maine's oldest lighthouse, its keeper's cottage now a small museum. The town itself was named by an early proprietor after the English Isle of Portland his family had come from, long before lobster boats made this one of the busiest lobster ports in the country.|George Washington ordenó personalmente la construcción del faro de Portland Head en 1791, y hoy sigue en pie como el faro más antiguo de Maine, con la casa del farero convertida en un pequeño museo. La propia ciudad fue bautizada por uno de sus primeros propietarios en honor a la Isla de Portland inglesa, de donde procedía su familia, mucho antes de que los barcos langosteros la convirtieran en uno de los puertos langosteros más activos del país.|George Washington ordonna personnellement la construction du phare de Portland Head en 1791, et il demeure aujourd'hui le plus ancien phare du Maine, la maison du gardien étant devenue un petit musée. La ville elle-même fut baptisée par un de ses premiers propriétaires terriens d'après l'île anglaise de Portland dont sa famille était originaire, bien avant que les bateaux de pêche au homard n'en fassent l'un des ports langoustiers les plus actifs du pays.|ジョージ・ワシントン大統領は1791年、自ら命じてポートランド・ヘッド灯台を建てさせた。これはいまもメイン州最古の灯台として立ち続けており、灯台守の家は小さな博物館になっている。この町自体の名は、初期の地主の一人が先祖の出身地であるイギリスのポートランド島にちなんで名付けたもので、のちにロブスター漁船がここを全米有数の水揚げ港にするよりずっと前のことである。",
    [prop("Portland Head Light Keeper's Cottage|Casa del farero de Portland Head Light|Maison du gardien du phare de Portland Head|ポートランド・ヘッド灯台の灯台守の家", 320, 66),
     prop("Old Port Lobster Pier|Muelle langostero del Old Port|Quai à homards de l'Old Port|オールドポートのロブスター桟橋", 220, 46)],
  ),

  pittsburgh: city(
    "Pittsburgh|Pittsburgh|Pittsburgh|ピッツバーグ",
    -79.99, 40.44, "ne", "bridge", "rivers", "l",
    "A city often said to have more bridges than Venice|Una ciudad de la que se dice que tiene más puentes que Venecia|Une ville qu'on dit souvent posséder plus de ponts que Venise|ヴェネツィアより橋が多いとよく言われる町",
    "Pittsburgh sits where the Allegheny and Monongahela rivers meet to form the Ohio, a confluence called the Point, and the three rivers together are why the city is commonly said to hold about 446 bridges, more than any other city on Earth including Venice. Its skies were once so thick with steel-mill smoke that streetlights sometimes had to stay on at noon, until a 1941 smoke-control ordinance began forcing the change that eventually cleared them.|Pittsburgh se asienta donde los ríos Allegheny y Monongahela se unen para formar el Ohio, una confluencia llamada the Point, y esos tres ríos son la razón por la que se dice que la ciudad tiene unos 446 puentes, más que ninguna otra ciudad del mundo, incluida Venecia. Sus cielos llegaron a estar tan cargados de humo de las acerías que a veces había que dejar encendidas las farolas al mediodía, hasta que una ordenanza de 1941 contra el humo empezó a forzar el cambio que acabó despejándolos.|Pittsburgh se trouve à l'endroit où les rivières Allegheny et Monongahela se rejoignent pour former l'Ohio, un confluent appelé the Point, et ce sont ces trois rivières qui expliquent qu'on dise couramment que la ville compte environ 446 ponts, plus que toute autre ville au monde, Venise comprise. Son ciel fut jadis si chargé de fumée d'aciéries qu'il fallait parfois laisser les lampadaires allumés à midi, jusqu'à ce qu'une ordonnance anti-fumée de 1941 impose peu à peu le changement qui finit par les dissiper.|ピッツバーグはアレゲニー川とモノンガヒーラ川が合流してオハイオ川になる地点(「ザ・ポイント」と呼ばれる)にあり、この三本の川のおかげで、この町にはおよそ446もの橋があり、ヴェネツィアを含む世界のどの都市よりも多いとよく言われる。かつて製鉄所の煙で空が真っ黒になり、真昼でも街灯を点けたままにしなければならないほどだったが、1941年の煙害規制条例をきっかけに少しずつ空が晴れていった。",
    [prop("Duquesne Incline Car|Vagón del funicular Duquesne|Wagon du funiculaire Duquesne|デュケーン・インクラインの車両", 650, 135),
     prop("Point State Park Fountain Overlook|Mirador de la fuente del Point State Park|Belvédère de la fontaine du Point State Park|ポイント州立公園の噴水展望台", 320, 66)],
  ),

  buffalo: city(
    "Buffalo|Búfalo|Buffalo|バッファロー",
    -78.87, 42.89, "ne", "grainelevator", "greatlakes", "r",
    "The wings a bar invented almost by accident|Las alitas que un bar inventó casi por accidente|Les ailes de poulet qu'un bar a inventées presque par accident|バーがほとんど偶然生み出したチキンウィング",
    "In 1964, the Anchor Bar's owners fried up a batch of chicken wings meant for stock and tossed them in hot sauce and butter as a late-night snack for their son and his friends, and the dish never left the menu. Buffalo also once anchored the western end of the Erie Canal, and its 1842 steam-powered grain elevator, built by Joseph Dart, was the first of its kind anywhere.|En 1964, los dueños del Anchor Bar frieron un lote de alitas de pollo destinadas al caldo y las bañaron en salsa picante y mantequilla como aperitivo nocturno para su hijo y sus amigos, y el plato nunca salió del menú. Buffalo también fue en su día el extremo occidental del canal Erie, y su elevador de grano a vapor de 1842, construido por Joseph Dart, fue el primero de su tipo en el mundo.|En 1964, les propriétaires de l'Anchor Bar firent frire un lot d'ailes de poulet destinées au bouillon et les nappèrent de sauce piquante et de beurre comme en-cas nocturne pour leur fils et ses amis, et le plat ne quitta plus jamais la carte. Buffalo marqua aussi jadis l'extrémité ouest du canal Érié, et son élévateur à grain à vapeur de 1842, construit par Joseph Dart, fut le premier du genre au monde.|1964年、アンカー・バーの店主はスープ用に取っておいたチキンウィングを揚げ、深夜に息子とその友人たちへのおつまみとして辛いソースとバターに絡めて出したところ、この料理はそのままメニューに居座り続けた。バッファローはかつてエリー運河の西の終点でもあり、1842年にジョセフ・ダートが建てた蒸気式穀物エレベーターは、世界で初めてのその種の設備だった。",
    [prop("Anchor Bar Wing Booth|Reservado del Anchor Bar|Box de l'Anchor Bar|アンカー・バーのウィング席", 480, 99),
     prop("Erie Canal Terminus Warehouse|Almacén de la terminal del canal Erie|Entrepôt du terminus du canal Érié|エリー運河終点の倉庫", 260, 54)],
  ),

  baltimore: city(
    "Baltimore|Baltimore|Baltimore|ボルチモア",
    -76.61, 39.29, "ne", "fort", "harbor", "r",
    "A flag that survived a night of bombardment and became a song|Una bandera que sobrevivió a una noche de bombardeo y se hizo canción|Un drapeau qui survécut à une nuit de bombardement et devint une chanson|一晩の砲撃を生き延び、歌になった旗",
    "During a 25-hour British bombardment of Fort McHenry in September 1814, a lawyer named Francis Scott Key watched from a ship in the harbor and, seeing the oversized American flag still flying at dawn, wrote the poem that later became \"The Star-Spangled Banner\". Rowhouse blocks across the city are still fronted with white marble steps that generations of residents have scrubbed by hand every week, a chore once so tied to local pride that neglecting it drew comment from neighbors.|Durante un bombardeo británico de 25 horas sobre Fort McHenry en septiembre de 1814, el abogado Francis Scott Key observó desde un barco en el puerto y, al ver al amanecer que la enorme bandera estadounidense seguía ondeando, escribió el poema que más tarde se convertiría en «The Star-Spangled Banner». Las hileras de casas adosadas de la ciudad aún lucen escalones de mármol blanco que generaciones de vecinos han fregado a mano cada semana.|Pendant un bombardement britannique de 25 heures sur Fort McHenry en septembre 1814, l'avocat Francis Scott Key observa depuis un navire dans le port et, voyant à l'aube l'immense drapeau américain toujours flotter, écrivit le poème qui deviendrait plus tard « The Star-Spangled Banner ». Les rangées de maisons mitoyennes de la ville arborent encore des marches en marbre blanc que des générations d'habitants ont récurées à la main chaque semaine.|1814年9月、イギリス軍によるフォート・マクヘンリーへの25時間に及ぶ砲撃のさなか、弁護士フランシス・スコット・キーは港に停泊した船からその様子を見守り、夜明けになっても巨大な星条旗がまだはためいているのを目にして、のちに国歌「星条旗」となる詩を書いた。市内に並ぶ連棟住宅の玄関先にはいまも白い大理石の階段があり、代々の住民たちが毎週手でこすり洗いしてきた。かつてはこれを怠ると近所から陰口を叩かれるほど、地元の誇りと結びついた家事だった。",
    [prop("Fort McHenry Flagpole|Asta de la bandera de Fort McHenry|Mât du drapeau de Fort McHenry|フォート・マクヘンリーの旗竿", 700, 145),
     prop("Inner Harbor Pratt Street Pavilion|Pabellón de Pratt Street en el Inner Harbor|Pavillon de Pratt Street à l'Inner Harbor|インナーハーバーのプラット・ストリート・パビリオン", 340, 70)],
  ),

  // ---------------------------------------------------------------------
  // south — 南部(10)
  // ---------------------------------------------------------------------
  neworleans: city(
    "New Orleans|Nueva Orleans|La Nouvelle-Orléans|ニューオーリンズ",
    -90.07, 29.95, "south", "music", "frenchquarter", "r",
    "A city three empires claimed without it moving an inch|Una ciudad reclamada por tres imperios sin moverse ni un centímetro|Une ville revendiquée par trois empires sans jamais bouger|三つの帝国に所有されながら一歩も動かなかった町",
    "The city was founded by France in 1718, ceded to Spain in 1763, handed back to France in 1800, and sold to the United States in 1803 as part of the Louisiana Purchase, all before its street grid was even a century old. At Congo Square, enslaved people were permitted under Spanish and later American rule to gather, drum, and dance on Sunday afternoons, and historians point to those gatherings as one of the places where rhythms that fed into jazz survived and mixed.|La ciudad fue fundada por Francia en 1718, cedida a España en 1763, devuelta a Francia en 1800 y vendida a Estados Unidos en 1803 como parte de la Compra de Luisiana, todo ello antes de que su trazado urbano cumpliera un siglo. En la plaza Congo Square, bajo el dominio español y luego estadounidense, se permitía a los esclavizados reunirse, tocar el tambor y bailar los domingos por la tarde.|La ville fut fondée par la France en 1718, cédée à l'Espagne en 1763, rendue à la France en 1800, puis vendue aux États-Unis en 1803 dans le cadre de l'achat de la Louisiane, tout cela avant que son plan de rues n'ait même un siècle. À Congo Square, sous la domination espagnole puis américaine, les personnes réduites en esclavage étaient autorisées à se rassembler, jouer du tambour et danser le dimanche après-midi.|この町は1718年にフランスが建設し、1763年にスペインへ割譲され、1800年にフランスへ戻り、1803年にはルイジアナ購入の一部としてアメリカに売却された。これらすべてが、街路網ができてからまだ百年も経たないうちに起きている。コンゴ・スクエアでは、スペイン統治下、のちにアメリカ統治下でも、奴隷にされた人々が日曜の午後に集まり太鼓を叩き踊ることを許されていた。歴史家はこの集まりを、ジャズへとつながるリズムが生き延び混ざり合った場所のひとつに数える。",
    [prop("French Quarter Jazz Club|Club de jazz del Barrio Francés|Club de jazz du Vieux Carré|フレンチクォーターのジャズクラブ", 950, 197),
     prop("Mardi Gras Float Den|Cochera de carrozas de Mardi Gras|Atelier de chars du Mardi Gras|マルディグラの山車小屋", 500, 104)],
  ),

  nashville: city(
    "Nashville|Nashville|Nashville|ナッシュビル",
    -86.78, 36.16, "south", "guitar", "musicrow", "r",
    "A radio show older than nearly every country song it plays|Un programa de radio más viejo que casi todas las canciones country que emite|Une émission de radio plus vieille que presque toutes les chansons country qu'elle diffuse|そこで流れるカントリーソングのほとんどより古いラジオ番組",
    "The Grand Ole Opry began broadcasting in 1925 and has run nearly every week since, making it the longest-running radio program in American history and the reason record labels crowded onto nearby Music Row. A full-scale replica of the Parthenon, built of wood and plaster for an 1897 exposition and later recast in concrete, still stands in Centennial Park a world away from its Athens original.|El Grand Ole Opry empezó a emitir en 1925 y lo ha hecho casi todas las semanas desde entonces, lo que lo convierte en el programa de radio más longevo de la historia estadounidense y la razón por la que las discográficas se agolparon en la cercana Music Row. Una réplica a tamaño real del Partenón, construida en madera y yeso para una exposición de 1897 y más tarde reconstruida en hormigón, sigue en pie en Centennial Park.|Le Grand Ole Opry a commencé à émettre en 1925 et diffuse depuis presque chaque semaine, ce qui en fait l'émission de radio la plus ancienne de l'histoire américaine et la raison pour laquelle les maisons de disques se sont agglutinées sur la proche Music Row. Une réplique grandeur nature du Parthénon, bâtie en bois et en plâtre pour une exposition de 1897 puis reconstruite en béton, se dresse toujours à Centennial Park.|グランド・オール・オプリは1925年に放送を開始し、それ以来ほぼ毎週休まず続けており、アメリカ史上最も長く続くラジオ番組であるとともに、近くのミュージック・ロウにレコード会社が集まった理由でもある。1897年の博覧会のために木材と漆喰で建てられ、のちにコンクリートで作り直された実物大のパルテノン神殿の複製は、本家アテネからは遠く離れたセンテニアル公園にいまも立っている。",
    [prop("Ryman Auditorium Balcony Seat|Asiento de balcón del Ryman Auditorium|Siège de balcon du Ryman Auditorium|ライマン公会堂のバルコニー席", 850, 176),
     prop("Parthenon Replica Portico|Pórtico de la réplica del Partenón|Portique de la réplique du Parthénon|パルテノン神殿レプリカの柱廊", 400, 83)],
  ),

  memphis: city(
    "Memphis|Memphis|Memphis|メンフィス",
    -90.05, 35.15, "south", "guitar", "musicrow", "l",
    "A single afternoon in a storefront studio that changed what a song could sound like|Una sola tarde en un estudio de esquina que cambió cómo podía sonar una canción|Un seul après-midi dans un studio de quartier qui changea le son d'une chanson|曲の音を変えてしまった、路面店スタジオでのある午後",
    "Sun Studio, opened in a small storefront in 1950, recorded Elvis Presley's first single in July 1954 as well as early work by B.B. King, Howlin' Wolf, and Johnny Cash, all before the room was much bigger than a living room. Blues musicians filled Beale Street's clubs from the early 1900s onward, and W.C. Handy, who worked the street as a bandleader, is remembered as one of the people who first wrote the genre down on paper.|El Sun Studio, abierto en un pequeño local en 1950, grabó el primer sencillo de Elvis Presley en julio de 1954, así como trabajos tempranos de B.B. King, Howlin' Wolf y Johnny Cash, todo ello en una sala apenas más grande que un salón. Los músicos de blues llenaron los clubes de Beale Street desde principios del siglo XX, y W.C. Handy, que trabajó en la calle como director de banda, es recordado como uno de los primeros en poner ese género por escrito.|Le Sun Studio, ouvert dans une petite boutique en 1950, enregistra le premier single d'Elvis Presley en juillet 1954 ainsi que les débuts de B.B. King, Howlin' Wolf et Johnny Cash, le tout dans une pièce guère plus grande qu'un salon. Les musiciens de blues remplirent les clubs de Beale Street dès le début du XXe siècle, et W.C. Handy, qui y travailla comme chef d'orchestre, reste connu pour avoir été l'un des premiers à coucher ce genre sur le papier.|1950年に小さな店舗を改装して開業したサン・スタジオは、1954年7月にエルヴィス・プレスリーの最初のシングルを録音したほか、B.B.キング、ハウリン・ウルフ、ジョニー・キャッシュらの初期の録音も手がけた。部屋は居間よりわずかに広い程度だった。ビール・ストリートのクラブには20世紀初頭からブルース奏者が集まり、バンドリーダーとしてこの通りで働いていたW.C.ハンディは、この音楽形式を初めて楽譜に書き起こした人物の一人として記憶されている。",
    [prop("Sun Studio Recording Booth|Cabina de grabación del Sun Studio|Cabine d'enregistrement du Sun Studio|サン・スタジオの録音ブース", 700, 145),
     prop("Beale Street Blues Club Stage|Escenario de un club de blues de Beale Street|Scène d'un club de blues de Beale Street|ビール・ストリートのブルースクラブの舞台", 350, 72)],
  ),

  atlanta: city(
    "Atlanta|Atlanta|Atlanta|アトランタ",
    -84.39, 33.75, "south", "skyline", "sunbeltskyline", "r",
    "A city that took a phoenix as its symbol after Sherman burned it|Una ciudad que adoptó al fénix como símbolo tras el incendio de Sherman|Une ville qui adopta le phénix pour emblème après l'incendie de Sherman|シャーマンに焼かれたあと、不死鳥を紋章に選んだ町",
    "Union General William Sherman ordered much of Atlanta burned in November 1864 before his March to the Sea, and the rebuilt city later adopted a phoenix rising from ashes as its official seal, above the single Latin word \"Resurgens\". Its airport has ranked among the world's busiest by passenger traffic for most of the last three decades, in part because Delta Air Lines still runs its largest hub from here.|El general de la Unión William Sherman ordenó incendiar buena parte de Atlanta en noviembre de 1864 antes de su Marcha hacia el Mar, y la ciudad reconstruida adoptó después un fénix resurgiendo de las cenizas como sello oficial, sobre la única palabra latina «Resurgens». Su aeropuerto ha figurado entre los más transitados del mundo durante la mayor parte de las últimas tres décadas.|Le général nordiste William Sherman ordonna d'incendier une grande partie d'Atlanta en novembre 1864 avant sa Marche vers la mer, et la ville reconstruite adopta ensuite un phénix renaissant de ses cendres comme sceau officiel, surmontant le seul mot latin « Resurgens ». Son aéroport a figuré parmi les plus fréquentés au monde pendant la majeure partie des trois dernières décennies.|北軍のウィリアム・シャーマン将軍は1864年11月、「海への進軍」の前にアトランタの大半を焼き払うよう命じた。再建された町はのちに、灰の中からよみがえる不死鳥を公式の紋章に採用し、その下にラテン語で「レスルゲンス(再び立ち上がる)」の一語だけを添えた。この町の空港は過去30年のほとんどの期間、旅客数で世界有数の混雑ぶりを保っており、その一因はデルタ航空がいまも最大のハブをここに置いていることにある。",
    [prop("World of Coca-Cola Tasting Room|Sala de degustación de World of Coca-Cola|Salle de dégustation du World of Coca-Cola|ワールド・オブ・コカ・コーラの試飲室", 1200, 248),
     prop("Sweet Auburn Historic Storefront|Fachada histórica de Sweet Auburn|Devanture historique de Sweet Auburn|スイート・オーバーンの歴史的な店構え", 550, 114)],
  ),

  charleston: city(
    "Charleston|Charleston|Charleston|チャールストン",
    -79.93, 32.78, "south", "rowhouse", "spanishmoss", "r",
    "The harbor where the Civil War's first shots were fired at a fort, not a person|El puerto donde los primeros disparos de la Guerra Civil apuntaron a un fuerte, no a una persona|Le port où les premiers coups de feu de la guerre de Sécession visèrent un fort, pas une personne|南北戦争最初の砲弾が人ではなく要塞に向けて撃たれた港",
    "Confederate batteries opened fire on the federal garrison at Fort Sumter, an island fortification in Charleston harbor, before dawn on April 12, 1861, starting the Civil War without a single fatality on either side that day. The pastel houses lining Rainbow Row survived largely because the city was too poor after the war to tear them down and rebuild.|Las baterías confederadas abrieron fuego contra la guarnición federal de Fort Sumter, una fortificación insular en el puerto de Charleston, antes del amanecer del 12 de abril de 1861, dando inicio a la Guerra Civil sin que hubiera un solo muerto ese día. Las casas pastel de Rainbow Row sobrevivieron en gran parte porque la ciudad, tras la guerra, era demasiado pobre para derribarlas y reconstruir.|Les batteries confédérées ouvrirent le feu sur la garnison fédérale de Fort Sumter, une fortification insulaire dans le port de Charleston, avant l'aube du 12 avril 1861, déclenchant la guerre de Sécession sans qu'aucun mort ne soit à déplorer ce jour-là. Les maisons pastel de Rainbow Row ont largement survécu parce que la ville, trop pauvre après la guerre, ne put les démolir pour reconstruire.|1861年4月12日未明、南軍の砲台がチャールストン港内の島にある要塞、フォート・サムターに立てこもる連邦軍守備隊に向けて砲撃を開始し、南北戦争が始まった。その日、双方に一人の死者も出なかった。レインボー・ロウに並ぶパステルカラーの家々は、戦後この町があまりに貧しく取り壊して建て直す余裕がなかったおかげで、多くがそのまま残った。",
    [prop("Rainbow Row Piazza|Galería de Rainbow Row|Véranda de Rainbow Row|レインボー・ロウのピアッツァ(側面ベランダ)", 620, 128),
     prop("Fort Sumter Ferry Dock|Muelle del ferri a Fort Sumter|Ponton du ferry de Fort Sumter|フォート・サムター行きフェリー乗り場", 320, 66)],
  ),

  savannah: city(
    "Savannah|Savannah|Savannah|サバンナ",
    -81.10, 32.08, "south", "oaktree", "spanishmoss", "r",
    "A city planned around 24 public squares before the country existed|Una ciudad planificada en torno a 24 plazas públicas antes de que existiera el país|Une ville organisée autour de 24 places publiques avant même l'existence du pays|国が生まれる前から24の公共広場を軸に計画された町",
    "James Oglethorpe laid out Savannah in 1733 on a grid of 24 planned public squares, one of the first cities in North America designed before it was settled rather than the other way around, and 22 of those squares survive today, each one different. Live oaks draped in Spanish moss line many of them, and the historic district they anchor is now the largest National Historic Landmark District in the United States.|James Oglethorpe trazó Savannah en 1733 sobre una cuadrícula de 24 plazas públicas planificadas, una de las primeras ciudades de Norteamérica diseñada antes de ser poblada; 22 de esas plazas sobreviven hoy, cada una distinta. Robles vivos cubiertos de musgo español bordean muchas de ellas, y el distrito histórico que articulan es hoy el mayor Distrito Histórico Nacional de Estados Unidos.|James Oglethorpe traça Savannah en 1733 selon une grille de 24 places publiques planifiées, l'une des premières villes d'Amérique du Nord conçue avant d'être peuplée ; 22 de ces places subsistent aujourd'hui, chacune différente. Des chênes verts drapés de mousse espagnole bordent nombre d'entre elles, et le quartier historique qu'elles structurent est aujourd'hui le plus vaste district historique national des États-Unis.|ジェームズ・オグルソープは1733年、24の広場を格子状に配した計画にもとづきサバンナの町割りを行った。北米で最初期の「先に設計してから人が住む」都市の一つであり、そのうち22の広場が今日まで残り、それぞれ異なる表情を持つ。多くの広場にはスパニッシュモスをまとったオークの木々が立ち並び、それらを軸とする歴史地区は、いまやアメリカ合衆国最大の国家歴史登録地区となっている。",
    [prop("Forsyth Park Fountain Overlook|Mirador de la fuente de Forsyth Park|Belvédère de la fontaine de Forsyth Park|フォーサイス公園の噴水展望所", 560, 116),
     prop("Bonaventure Cemetery Oak Walk|Paseo de robles del cementerio Bonaventure|Allée de chênes du cimetière Bonaventure|ボナベンチャー墓地のオーク並木道", 280, 58)],
  ),

  miami: city(
    "Miami|Miami|Miami|マイアミ",
    -80.19, 25.76, "south", "artdeco", "tropicdeco", "r",
    "More than 800 buildings from a single decade, all painted to match|Más de 800 edificios de una sola década, todos pintados a juego|Plus de 800 bâtiments d'une seule décennie, tous peints en harmonie|同じ十数年間に建てられ、色まで揃えられた800を超える建物",
    "More than 800 buildings from the 1920s to the 1940s survive in the Art Deco Historic District along South Beach, restored and repainted in the pastel palette that gives Ocean Drive its postcard look today. After Fidel Castro's revolution in 1959, waves of Cuban exiles settled around Southwest 8th Street, turning it into Little Havana and filling Domino Park with the same card and domino games their grandparents had played in Cuba.|Más de 800 edificios de las décadas de 1920 a 1940 sobreviven en el distrito histórico Art Déco de South Beach, restaurados y repintados en la paleta pastel que hoy da a Ocean Drive su aire de postal. Tras la revolución de Fidel Castro en 1959, oleadas de exiliados cubanos se asentaron en torno a la calle Southwest 8th, convirtiéndola en la Pequeña Habana.|Plus de 800 bâtiments des années 1920 à 1940 subsistent dans le quartier historique Art déco de South Beach, restaurés et repeints dans la palette pastel qui donne aujourd'hui à Ocean Drive son allure de carte postale. Après la révolution de Fidel Castro en 1959, des vagues d'exilés cubains s'installèrent autour de la 8e rue sud-ouest, la transformant en Little Havana.|1920年代から40年代にかけて建てられた800を超える建物が、サウスビーチのアール・デコ歴史地区にいまも残り、修復のうえパステルカラーに塗り直されて、今日のオーシャン・ドライブの絵葉書のような景観をつくっている。1959年のフィデル・カストロによる革命後、キューバからの亡命者が波のように押し寄せてサウスウエスト8丁目周辺に住み着き、この一帯を「リトル・ハバナ」に変え、ドミノ公園を祖父母たちがキューバで遊んでいたのと同じカードやドミノのゲームで満たした。",
    [prop("Ocean Drive Art Deco Facade|Fachada art déco de Ocean Drive|Façade art déco d'Ocean Drive|オーシャン・ドライブのアール・デコ様式の外観", 1300, 269),
     prop("Little Havana Domino Park Table|Mesa del Domino Park de la Pequeña Habana|Table du Domino Park de Little Havana|リトル・ハバナのドミノ公園のテーブル", 580, 120)],
  ),

  tampa: city(
    "Tampa|Tampa|Tampa|タンパ",
    -82.4572, 27.9506, "south", "cigar", "tropicdeco", "l",
    "A cigar capital named after a man who never lived to see it thrive|Una capital del cigarro llamada así por un hombre que nunca vio su auge|Une capitale du cigare qui doit son nom à un homme qui n'en vit jamais l'essor|その繁栄を見届けられなかった男の名を冠した葉巻の都",
    "Cigar manufacturer Vicente Martínez Ybor moved his factories here from Key West in 1885, and the district that grew up around them, Ybor City, hand-rolled so many cigars that it was known worldwide as the \"Cigar Capital of the World\" for decades, employing waves of Cuban, Spanish, and Italian immigrants. Every February since 1904, the city has staged the Gasparilla pirate invasion, named for José Gaspar, a pirate historians now generally believe never actually existed.|El fabricante de cigarros Vicente Martínez Ybor trasladó aquí sus fábricas desde Cayo Hueso en 1885, y el barrio que creció a su alrededor, Ybor City, fue conocido en todo el mundo como la «Capital Mundial del Cigarro» durante décadas. Cada febrero desde 1904, la ciudad escenifica la invasión pirata de Gasparilla, que lleva el nombre de José Gaspar, un pirata que los historiadores hoy creen que nunca existió.|Le fabricant de cigares Vicente Martínez Ybor y transféra ses usines depuis Key West en 1885, et le quartier qui s'est développé autour, Ybor City, fut connu dans le monde entier comme la « capitale mondiale du cigare » pendant des décennies. Chaque février depuis 1904, la ville met en scène l'invasion pirate de Gasparilla, nommée d'après José Gaspar, un pirate dont on pense aujourd'hui qu'il n'a jamais existé.|葉巻製造業者ビセンテ・マルティネス・イボールは1885年、工場をキーウェストからこの地へ移した。その周りに生まれたイボール・シティ地区は、手巻き葉巻をあまりに多く生産したため何十年も「世界の葉巻の都」として知られ、キューバ・スペイン・イタリアからの移民を波のように雇用した。1904年以来毎年2月、この町は「ガスパリヤ」という海賊による町の乗っ取りを模した祭りを開いている。名の由来であるホセ・ガスパルという海賊は、いまでは歴史家の大半が実在しなかったと考えている人物である。",
    [prop("Ybor City Cigar Factory Floor|Planta de la fábrica de cigarros de Ybor City|Atelier de la fabrique de cigares d'Ybor City|イボール・シティの葉巻工場フロア", 620, 128),
     prop("Gasparilla Pirate Ship Deck|Cubierta del barco pirata de Gasparilla|Pont du navire pirate de Gasparilla|ガスパリヤの海賊船デッキ", 300, 62)],
  ),

  houston: city(
    "Houston|Houston|Houston|ヒューストン",
    -95.37, 29.76, "south", "rocket", "spacecenter", "l",
    "The word spoken from the moon|La palabra pronunciada desde la Luna|Le mot prononcé depuis la Lune|月から発せられた言葉",
    "When Apollo 11's lunar module touched down in July 1969, the first words radioed back began \"Houston, Tranquility Base here\", addressed to the Mission Control room at what is now the Johnson Space Center. The city itself was founded in 1836 and named for Sam Houston barely weeks after his army had won Texan independence at the Battle of San Jacinto nearby.|Cuando el módulo lunar del Apolo 11 aterrizó en julio de 1969, las primeras palabras transmitidas por radio comenzaron con «Houston, aquí Base Tranquilidad», dirigidas a la sala de Control de Misión de lo que hoy es el Centro Espacial Johnson. La propia ciudad se fundó en 1836 y se llamó así en honor a Sam Houston.|Lorsque le module lunaire d'Apollo 11 se posa en juillet 1969, les premiers mots radiodiffusés commencèrent par « Houston, ici Tranquility Base », adressés à la salle de contrôle de mission de ce qui est aujourd'hui le Johnson Space Center. La ville elle-même fut fondée en 1836 et nommée d'après Sam Houston.|1969年7月、アポロ11号の月着陸船が月面に降り立ったとき、地球へ無線で送られた最初の言葉は「ヒューストン、こちらトランクィリティ基地」で始まった。宛先は、現在のジョンソン宇宙センターにあるミッションコントロール室だった。この町自体は1836年に建設され、その名は、すぐ近くのサンハシント川の戦いでテキサスの独立を勝ち取った軍の指揮官サム・ヒューストンにちなんで、わずか数週間後に付けられた。",
    [prop("Mission Control Viewing Gallery|Galería de observación del Control de Misión|Galerie d'observation du contrôle de mission|ミッションコントロール見学ギャラリー", 1350, 279),
     prop("Houston Ship Channel Pilot Dock|Muelle de pilotos del canal de navegación de Houston|Ponton des pilotes du chenal de navigation de Houston|ヒューストン水路の水先案内人桟橋", 600, 124)],
  ),

  sanantonio: city(
    "San Antonio|San Antonio|San Antonio|サンアントニオ",
    -98.49, 29.42, "south", "mission", "riverwalk", "l",
    "A mission that became a battle cry, and a river that became a stroll|Una misión que se volvió grito de guerra, y un río que se volvió paseo|Une mission devenue cri de ralliement, et une rivière devenue promenade|戦いの合言葉になった伝道所と、散歩道になった川",
    "Spanish missionaries founded Misión San Antonio de Valero in 1718; by 1836 the former mission, by then known as the Alamo, was where a small garrison held out for thirteen days against Mexican forces before falling, and \"Remember the Alamo\" became the rallying cry that helped win Texan independence weeks later. After a catastrophic flood in 1921, the city lowered part of downtown around the San Antonio River into a landscaped walkway now known as the River Walk, lined with cafés a full level below street traffic.|Misioneros españoles fundaron la Misión de San Antonio de Valero en 1718; hacia 1836, la antigua misión, ya conocida como el Álamo, fue donde una pequeña guarnición resistió trece días frente a las fuerzas mexicanas antes de caer. Tras una inundación catastrófica en 1921, la ciudad rebajó parte del centro en torno al río San Antonio hasta convertirlo en un paseo hoy conocido como el River Walk.|Des missionnaires espagnols fondèrent la Mission San Antonio de Valero en 1718 ; vers 1836, l'ancienne mission, alors connue sous le nom d'Alamo, fut le lieu où une petite garnison résista treize jours face aux forces mexicaines avant de tomber. Après une inondation catastrophique en 1921, la ville abaissa une partie du centre-ville autour de la rivière San Antonio en une promenade aujourd'hui connue sous le nom de River Walk.|スペインの宣教師たちは1718年、サン・アントニオ・デ・バレロ伝道所を築いた。1836年、当時「アラモ」と呼ばれるようになっていたこの旧伝道所では、少数の守備隊がメキシコ軍相手に13日間持ちこたえたのち陥落し、「アラモを忘れるな」という合言葉が、数週間後のテキサス独立を後押しする掛け声になった。1921年の壊滅的な洪水のあと、この町はサン・アントニオ川沿いの中心街の一部を掘り下げて庭園風の遊歩道に造り替えた。それが今日のリバー・ウォークである。",
    [prop("The Alamo Courtyard|Patio del Álamo|Cour de l'Alamo|アラモの中庭", 780, 161),
     prop("River Walk Barge Dock|Muelle de barcazas del River Walk|Ponton des barges du River Walk|リバー・ウォークの遊覧船乗り場", 380, 79)],
  ),

  // ---------------------------------------------------------------------
  // mw — 中西部(7)
  // ---------------------------------------------------------------------
  chicago: city(
    "Chicago|Chicago|Chicago|シカゴ",
    -87.63, 41.88, "mw", "skyline", "lakefront", "l",
    "A fire blamed on a cow that a reporter invented|Un incendio culpado a una vaca que un periodista inventó|Un incendie imputé à une vache inventée par un journaliste|記者が作り話した牛のせいにされた大火事",
    "The Great Fire of October 1871 killed around 300 people and burned more than three square miles of the city, and although it was blamed for over a century on Mrs. O'Leary's cow kicking over a lantern, the city council formally cleared her name by resolution in 1997, decades after a reporter admitted he had invented the detail for a better story. Rebuilding with a new fire-conscious code led to the Home Insurance Building of 1885, a ten-storey structure held up by an internal steel frame rather than load-bearing walls, commonly credited as the world's first skyscraper.|El Gran Incendio de octubre de 1871 mató a unas 300 personas y arrasó más de tres millas cuadradas de la ciudad, y aunque se culpó durante más de un siglo a la vaca de la señora O'Leary por tirar un farol, el ayuntamiento la exculpó formalmente mediante una resolución en 1997.|Le Grand Incendie d'octobre 1871 tua environ 300 personnes et détruisit plus de trois miles carrés de la ville, et bien qu'on en ait rejeté la faute pendant plus d'un siècle sur la vache de Mrs O'Leary qui aurait renversé une lanterne, le conseil municipal l'innocenta formellement par une résolution en 1997.|1871年10月の大火は約300人の命を奪い、3平方マイルを超える市街を焼いた。百年以上にわたってオリアリー夫人の牛がランタンを蹴倒したせいだとされてきたが、記者が話をおもしろくするために作り話をしたと認めてから数十年後の1997年、市議会は正式な決議で夫人の疑いを晴らした。火災を教訓にした新しい建築基準のもとで再建が進み、1885年には荷重壁ではなく内部の鉄骨構造で支える10階建てのホーム保険会社ビルが建った。世界初の摩天楼とされることが多い建物である。",
    [prop("Skyscraper Observation Deck|Mirador del rascacielos|Belvédère du gratte-ciel|摩天楼の展望台", 1300, 269),
     prop("Millennium Park Bean Plaza|Plaza del Bean en Millennium Park|Esplanade du Bean à Millennium Park|ミレニアムパークの「ザ・ビーン」広場", 700, 145)],
  ),

  detroit: city(
    "Detroit|Detroit|Détroit|デトロイト",
    -83.05, 42.33, "mw", "gear", "motorcity", "r",
    "The line that cut a car's build time from half a day to 93 minutes|La línea que redujo el tiempo de montaje de un coche de medio día a 93 minutos|La chaîne qui réduisit le temps de montage d'une voiture d'une demi-journée à 93 minutes|車の組立時間を半日から93分に縮めた生産ライン",
    "Henry Ford's moving assembly line, introduced at the Highland Park plant in 1913, cut the time needed to build a Model T from about twelve and a half hours to roughly 93 minutes, and the price of the car fell as production sped up. In a small house nearby that Berry Gordy named Hitsville U.S.A., Motown Records was founded in 1959 and went on to record dozens of acts, including the Supremes and the Temptations, often in a single basement studio.|La línea de montaje móvil de Henry Ford, introducida en la planta de Highland Park en 1913, redujo el tiempo necesario para fabricar un Ford T de unas doce horas y media a apenas 93 minutos. En una pequeña casa cercana que Berry Gordy llamó Hitsville U.S.A., se fundó Motown Records en 1959, que llegó a grabar a decenas de artistas, entre ellos las Supremes y las Temptations.|La chaîne de montage mobile de Henry Ford, introduite à l'usine de Highland Park en 1913, réduisit le temps nécessaire pour construire une Ford T d'environ douze heures et demie à près de 93 minutes. Dans une petite maison voisine que Berry Gordy baptisa Hitsville U.S.A., la Motown fut fondée en 1959 et enregistra des dizaines d'artistes, dont les Supremes et les Temptations.|ヘンリー・フォードが1913年にハイランドパーク工場で導入した移動式組立ラインは、T型フォード1台の組立にかかる時間をおよそ12時間半から93分ほどにまで縮め、生産が速まるにつれて車の価格も下がっていった。近くの小さな家をベリー・ゴーディが「ヒッツヴィルU.S.A.」と名付け、1959年にモータウン・レコードを創業すると、シュープリームスやテンプテーションズをはじめ何十組ものアーティストを、多くの場合たった一つの地下スタジオで録音していった。",
    [prop("Hitsville U.S.A. Studio A|Estudio A de Hitsville U.S.A.|Studio A de Hitsville U.S.A.|ヒッツヴィルU.S.A.のスタジオA", 750, 155),
     prop("Rouge Factory Assembly Line Deck|Pasarela de la línea de montaje de la fábrica Rouge|Passerelle de la chaîne de montage de l'usine Rouge|ルージュ工場の組立ライン見学デッキ", 380, 79)],
  ),

  cleveland: city(
    "Cleveland|Cleveland|Cleveland|クリーブランド",
    -81.69, 41.50, "mw", "guitar", "greatlakes", "r",
    "The city where a DJ coined the phrase for a whole genre|La ciudad donde un locutor acuñó el nombre de todo un género|La ville où un animateur radio inventa le nom de tout un genre|あるDJがジャンルまるごとの呼び名を作った町",
    "Disc jockey Alan Freed, broadcasting from Cleveland in the early 1950s, popularized the term \"rock and roll\" for the rhythm-and-blues records he played to a mixed-race audience, and the city's claim on that history helped it win the Rock and Roll Hall of Fame in 1995, its glass pyramid now standing on the shore of Lake Erie. The Cuyahoga River running through the city's industrial flats caught fire at least a dozen times between the 1860s and 1969, and the last, most publicized blaze helped push Congress toward passing the Clean Water Act in 1972.|El pinchadiscos Alan Freed, que emitía desde Cleveland a principios de los años cincuenta, popularizó el término «rock and roll» para los discos de rhythm and blues que ponía a un público racialmente mixto. El río Cuyahoga, que atraviesa las zonas industriales de la ciudad, se incendió al menos una docena de veces entre la década de 1860 y 1969.|L'animateur radio Alan Freed, diffusant depuis Cleveland au début des années 1950, popularisa le terme « rock and roll » pour les disques de rhythm and blues qu'il passait devant un public mixte. La rivière Cuyahoga, qui traverse les zones industrielles de la ville, prit feu au moins une douzaine de fois entre les années 1860 et 1969.|1950年代初頭、クリーブランドから放送していたディスクジョッキーのアラン・フリードは、人種混合の聴衆に向けてかけていたリズム・アンド・ブルースのレコードに「ロックンロール」という呼び名を広め、その歴史が縁となって1995年、この町にロックの殿堂が置かれた。町の工業地帯を流れるカイヤホガ川は1860年代から1969年までの間に少なくとも十数回火災を起こしており、最後の火災は1972年の水質浄化法制定を後押しする一因となった。",
    [prop("Rock and Roll Hall of Fame Atrium|Atrio del Salón de la Fama del Rock|Atrium du Rock and Roll Hall of Fame|ロックの殿堂のアトリウム", 620, 128),
     prop("West Side Market Stall|Puesto del West Side Market|Étal du West Side Market|ウエストサイド・マーケットの屋台", 300, 62)],
  ),

  minneapolis: city(
    "Minneapolis|Minneapolis|Minneapolis|ミネアポリス",
    -93.27, 44.98, "mw", "mill", "millcity", "l",
    "A waterfall that ground the wheat for a young country's bread|Una catarata que molía el trigo para el pan de un país joven|Une chute d'eau qui moulait le blé pour le pain d'un jeune pays|若い国のパンの小麦を挽いた滝",
    "Saint Anthony Falls, the only major waterfall on the entire Mississippi River, powered so many flour mills through the late 1800s that Minneapolis was for a time known as the flour-milling capital of the world, home to companies that became Pillsbury and General Mills. Because winters here are brutally cold, the city built an enclosed pedestrian skyway system starting in 1962 that has grown to about 15 kilometres of climate-controlled bridges linking downtown buildings two storeys above the street.|Las cataratas de San Antonio, la única gran caída de agua en todo el río Misisipi, dieron energía a tantos molinos harineros a finales del siglo XIX que Minneapolis fue conocida como la capital mundial de la molienda de harina. Como los inviernos aquí son brutalmente fríos, la ciudad construyó desde 1962 un sistema cerrado de pasarelas peatonales elevadas.|Les chutes Saint Anthony, la seule chute d'eau majeure de tout le fleuve Mississippi, alimentaient tant de moulins à farine à la fin du XIXe siècle que Minneapolis fut connue comme la capitale mondiale de la mouture de farine. Les hivers y étant brutalement froids, la ville construisit à partir de 1962 un réseau de passerelles piétonnes couvertes.|ミシシッピ川全体で唯一の大きな滝であるセントアンソニー滝は、19世紀後半に非常に多くの製粉所を動かしており、ミネアポリスは一時「世界の製粉の都」として知られ、のちのピルズベリー社やゼネラルミルズ社の礎となる企業がここに拠点を構えた。冬の寒さが非常に厳しいこの町は、1962年から屋根付きの歩行者用「スカイウェイ」の整備を始め、いまでは通りより2階分高い場所を結ぶ空調完備の橋がおよそ15キロメートルにも及んでいる。",
    [prop("Saint Anthony Falls Mill Ruins Overlook|Mirador de las ruinas de los molinos de Saint Anthony Falls|Belvédère des ruines des moulins de Saint Anthony Falls|セントアンソニー滝の製粉所跡展望台", 820, 170),
     prop("Skyway System Walkway Pass|Pase de paso del sistema de pasarelas Skyway|Laissez-passer du réseau de passerelles Skyway|スカイウェイ歩行者通行証", 400, 83)],
  ),

  stlouis: city(
    "St. Louis|San Luis|Saint-Louis|セントルイス",
    -90.20, 38.63, "mw", "arch", "archriver", "l",
    "An arch built to a millimetre of the height it was designed for|Un arco construido al milímetro de la altura para la que fue diseñado|Une arche bâtie au millimètre près de la hauteur prévue|設計どおりの高さに1ミリの狂いもなく建てられたアーチ",
    "The Gateway Arch, completed in 1965 to commemorate the city's role in westward expansion, stands 192 metres tall and is the tallest arch and the tallest man-made monument in the Western Hemisphere, its two legs meeting at the top within about a centimetre of the design tolerance. St. Louis hosted the 1904 World's Fair the same year as the Olympics, and although the ice cream cone's popularization is often credited to a vendor there running out of dishes, historians have since found earlier claims to the invention elsewhere.|El Gateway Arch, terminado en 1965 para conmemorar el papel de la ciudad en la expansión hacia el oeste, mide 192 metros de altura y es el arco más alto del hemisferio occidental. St. Louis acogió la Exposición Universal de 1904 el mismo año que los Juegos Olímpicos.|Le Gateway Arch, achevé en 1965 pour commémorer le rôle de la ville dans l'expansion vers l'ouest, s'élève à 192 mètres et constitue l'arche la plus haute de l'hémisphère occidental. St. Louis accueillit l'Exposition universelle de 1904 la même année que les Jeux olympiques.|1965年、この町が西部開拓で果たした役割を記念して完成したゲートウェイ・アーチは高さ192メートルで、西半球で最も高いアーチであり最も高い人工の記念碑でもある。二本の脚が頂上で出会う位置は、設計の許容誤差からわずか1センチほどしかずれていない。セントルイスはオリンピックと同じ1904年に万国博覧会を開いており、アイスクリームコーンの普及はそこで皿を切らした売り子の機転によるとよく語られるが、その後の歴史研究では他の場所での発明の主張のほうが早いことが分かっている。",
    [prop("Gateway Arch Tram Car|Vagón del tranvía del Gateway Arch|Cabine du tramway du Gateway Arch|ゲートウェイ・アーチのトラム車両", 700, 145),
     prop("Union Station Grand Hall|Gran Salón de Union Station|Grand Hall de l'Union Station|ユニオン駅のグランドホール", 340, 70)],
  ),

  milwaukee: city(
    "Milwaukee|Milwaukee|Milwaukee|ミルウォーキー",
    -87.91, 43.04, "mw", "brewery", "greatlakes", "l",
    "A shed where two brothers and a friend started building motorcycles|Un cobertizo donde dos hermanos y un amigo empezaron a construir motocicletas|Un hangar où deux frères et un ami commencèrent à construire des motos|二人の兄弟と友人がバイク作りを始めた小屋",
    "William Harley and the Davidson brothers built their first motorized bicycle in a 3-by-4.5-metre wooden shed in 1903, a building small enough that the modern Harley-Davidson Museum still displays a replica of it whole. German immigrants brought brewing traditions that turned Milwaukee into a beer capital by the late 1800s, and Schlitz, once advertised as \"the beer that made Milwaukee famous\", was for a time the best-selling beer in the country.|William Harley y los hermanos Davidson construyeron su primera bicicleta motorizada en un cobertizo de madera de 3 por 4,5 metros en 1903. Los inmigrantes alemanes trajeron tradiciones cerveceras que convirtieron a Milwaukee en una capital cervecera hacia finales del siglo XIX.|William Harley et les frères Davidson construisirent leur première bicyclette à moteur dans un hangar en bois de 3 mètres sur 4,5 en 1903. Des immigrants allemands apportèrent des traditions brassicoles qui firent de Milwaukee une capitale de la bière à la fin du XIXe siècle.|ウィリアム・ハーレーとデイビッドソン兄弟は1903年、わずか3メートル×4.5メートルの木造小屋で最初の動力付き自転車を組み立てた。あまりに小さな建物だったため、現在のハーレーダビッドソン博物館はその小屋をまるごと再現した複製をいまも展示している。ドイツ系移民が持ち込んだ醸造の伝統は19世紀後半までにミルウォーキーをビールの都に変え、かつて「ミルウォーキーを有名にしたビール」と宣伝されたシュリッツは、一時期全米で最も売れるビールだった。",
    [prop("Harley-Davidson Motorcycle Bay|Nave de motocicletas de Harley-Davidson|Hall des motos Harley-Davidson|ハーレーダビッドソンのバイク展示ベイ", 600, 124),
     prop("Historic Brewery Cellar Tour|Visita a la bodega histórica de la cervecería|Visite de la cave historique de la brasserie|歴史あるビール醸造所の地下貯蔵庫見学", 300, 62)],
  ),

  indianapolis: city(
    "Indianapolis|Indianápolis|Indianapolis|インディアナポリス",
    -86.16, 39.77, "mw", "racetrack", "speedway", "r",
    "A racetrack surfaced with 3.2 million bricks, one lap of which still remains|Un óvalo pavimentado con 3,2 millones de ladrillos, del que aún queda una vuelta|Un circuit pavé de 3,2 millions de briques, dont un tour subsiste encore|320万個のレンガで舗装され、いまも一部が残るレース場",
    "The Indianapolis Motor Speedway was repaved with 3.2 million bricks in 1909 after the original crushed-stone surface proved deadly, earning the track its nickname \"the Brickyard\"; nearly all of it has since been paved over with asphalt except for a single yard-wide strip of the original bricks left exposed at the start-finish line. The city itself was laid out in 1821 as a planned state capital on a mile-square grid centred on a traffic circle, Monument Circle, in a design deliberately similar to Washington, D.C.'s.|El Indianapolis Motor Speedway se repavimentó con 3,2 millones de ladrillos en 1909, lo que le dio al circuito su apodo «the Brickyard». La propia ciudad se trazó en 1821 como capital estatal planificada, con un diseño deliberadamente similar al de Washington D.C.|L'Indianapolis Motor Speedway fut repavé de 3,2 millions de briques en 1909, ce qui valut au circuit son surnom de « Brickyard ». La ville elle-même fut tracée en 1821 comme capitale d'État planifiée, selon un plan délibérément proche de celui de Washington.|インディアナポリス・モーター・スピードウェイは1909年、当初の砕石舗装があまりに危険だったため320万個のレンガで舗装し直され、「ブリックヤード」の愛称を得た。その後ほぼ全面がアスファルトで覆われたが、スタート・フィニッシュラインには元のレンガがおよそ1ヤード幅で今も剥き出しのまま残されている。この町自体は1821年、モニュメント・サークルというロータリーを中心にした1平方マイルの格子状区画に、意図的にワシントンD.C.に似せた計画州都として設計された。",
    [prop("Yard of Bricks Photo Line|Línea fotográfica de Yard of Bricks|Ligne photo du Yard of Bricks|ヤード・オブ・ブリックスの記念撮影ライン", 680, 141),
     prop("Monument Circle Steps|Escalinata de Monument Circle|Marches de Monument Circle|モニュメント・サークルの階段", 320, 66)],
  ),

  // ---------------------------------------------------------------------
  // plains — 大平原・山岳部(7)
  // ---------------------------------------------------------------------
  rapidcity: city(
    "Rapid City|Rapid City|Rapid City|ラピッドシティ",
    -103.23, 44.08, "plains", "monument", "blackhills", "r",
    "A billion-dollar payment nobody will accept|Un pago de mil millones que nadie acepta|Un paiement d'un milliard que personne n'accepte|誰も受け取らない十億ドルの補償金",
    "An 1868 treaty guaranteed the Black Hills to the Lakota Sioux 'in perpetuity', but when an army expedition found gold there six years later the United States took the land back anyway; in 1980 the Supreme Court ruled the seizure illegal and ordered compensation that has since grown to well over a billion dollars sitting untouched, because the Sioux Nation has always refused the money and asked for the land itself instead. Mount Rushmore, carved into the same hills between 1927 and 1941, was sculpted by an artist who had previously designed a memorial to the Confederacy on Stone Mountain, Georgia.|Un tratado de 1868 garantizó las Black Hills a los sioux lakota «a perpetuidad», pero cuando una expedición del ejército halló oro allí seis años después, Estados Unidos recuperó la tierra de todos modos; en 1980 el Tribunal Supremo declaró ilegal la confiscación y ordenó una compensación que hoy supera con creces los mil millones de dólares, intacta, porque la Nación Sioux siempre ha rechazado el dinero y pedido en su lugar la tierra misma.|Un traité de 1868 garantit les Black Hills aux Sioux lakotas « à perpétuité », mais quand une expédition militaire y trouva de l'or six ans plus tard, les États-Unis reprirent la terre malgré tout ; en 1980, la Cour suprême jugea la saisie illégale et ordonna une compensation qui dépasse aujourd'hui largement le milliard de dollars, intouchée, car la Nation sioux a toujours refusé l'argent et réclamé la terre elle-même.|1868年の条約は、ブラックヒルズを「永久に」ラコタ・スー族のものと保障していたが、その6年後に軍の探検隊が金を見つけると、アメリカ合衆国はそれでも土地を取り戻した。1980年、連邦最高裁はこの接収を違法と認め補償を命じたが、その額はいまや十億ドルをゆうに超えながら手つかずのまま残っている。スー・ネイションは常に金銭を拒み、代わりに土地そのものの返還を求め続けているからである。同じ丘に1927年から1941年にかけて彫られたラシュモア山は、かつてジョージア州ストーンマウンテンの南軍記念碑を手がけた彫刻家の作品である。",
    [prop("Black Hills Overlook Lodge|Albergue mirador de las Black Hills|Gîte panoramique des Black Hills|ブラックヒルズ展望ロッジ", 380, 79),
     prop("Main Street City of Presidents|Estatuas de presidentes de Main Street|Statues de présidents de Main Street|メインストリートの大統領像通り", 260, 54)],
  ),

  denver: city(
    "Denver|Denver|Denver|デンバー",
    -104.99, 39.74, "plains", "mountain", "milehigh", "r",
    "A capital exactly one mile above sea level, marked on its own front steps|Una capital exactamente a una milla sobre el nivel del mar, marcada en su propia escalinata|Une capitale à exactement un mille au-dessus du niveau de la mer, marquée sur son propre perron|海抜ちょうど1マイルの地点が、州議事堂の階段そのものに刻まれた州都",
    "The Colorado State Capitol's fifteenth step is engraved to mark exactly one mile, 5,280 feet, above sea level, though later surveys found the true elevation a few steps off, so a second, more precisely measured mark was added nearby. The city began in 1858 as a rough camp of gold prospectors along the South Platte River during Colorado's own gold rush, decades before it became a state capital at all.|El decimoquinto escalón del Capitolio del Estado de Colorado está grabado para marcar exactamente una milla, 5.280 pies, sobre el nivel del mar. La ciudad comenzó en 1858 como un campamento improvisado de buscadores de oro junto al río South Platte, décadas antes de convertirse siquiera en capital de estado.|La quinzième marche du Capitole du Colorado est gravée pour indiquer exactement un mille, soit 5 280 pieds, au-dessus du niveau de la mer. La ville débuta en 1858 comme un campement rudimentaire de chercheurs d'or le long de la rivière South Platte, des décennies avant même de devenir capitale d'État.|コロラド州議事堂の15段目の階段には、海抜ちょうど1マイル(5,280フィート)を示す刻印がある。ただしのちの測量で正確な標高は数段ずれていることが分かり、近くにより精密に測った印が別に加えられた。この町は1858年、コロラド独自のゴールドラッシュのさなか、サウスプラット川沿いの荒っぽい採金キャンプとして始まった。州都になるのはそれから何十年も後のことである。",
    [prop("Mile High Capitol Step|Escalón de la milla del Capitolio|Marche du mille du Capitole|マイルハイの州議事堂の階段", 950, 197),
     prop("Union Station Great Hall Bench|Banco del Gran Salón de Union Station|Banc du Grand Hall de l'Union Station|ユニオン駅グレートホールのベンチ", 450, 93)],
  ),

  cody: city(
    "Cody|Cody|Cody|コディ",
    -109.06, 44.53, "plains", "cowboyhat", "westernranch", "l",
    "A town a showman founded to be the gateway to somewhere else|Un pueblo que un hombre de espectáculos fundó como puerta a otro lugar|Une ville qu'un homme de spectacle fonda pour servir de porte vers ailleurs|興行師が「別の場所への入口」として築いた町",
    "William \"Buffalo Bill\" Cody helped found this town in 1896 specifically as the eastern gateway to Yellowstone, years after his Wild West show, which toured with real cowboys, sharpshooters, and Native performers, had already made him one of the most famous Americans in Europe. The town has staged the Cody Nite Rodeo every summer night since 1938, making it, by its own count, the longest continuously running rodeo of its kind.|William «Buffalo Bill» Cody ayudó a fundar este pueblo en 1896 específicamente como puerta oriental de Yellowstone, años después de que su espectáculo del Salvaje Oeste ya lo hubiera convertido en uno de los estadounidenses más famosos de Europa. El pueblo ha escenificado el Cody Nite Rodeo cada noche de verano desde 1938.|William « Buffalo Bill » Cody contribua à fonder cette ville en 1896 spécifiquement comme porte est de Yellowstone, des années après que son spectacle du Wild West avait déjà fait de lui l'un des Américains les plus célèbres d'Europe. La ville organise le Cody Nite Rodeo chaque soir d'été depuis 1938.|ウィリアム「バッファロー・ビル」コディは1896年、イエローストーンの東の玄関口として意図的にこの町の設立に関わった。それより前、本物のカウボーイや射撃の名手、先住民の演者を連れて巡業した彼の「ワイルドウエストショー」は、すでに彼をヨーロッパで最も有名なアメリカ人の一人にしていた。この町では1938年以来、毎年夏の間毎晩「コディ・ナイト・ロデオ」を開催しており、この町いわく、この種のロデオとしては途切れず続く最長のものだという。",
    [prop("Buffalo Bill Historical Center Gallery|Galería del Centro Histórico Buffalo Bill|Galerie du centre historique Buffalo Bill|バッファロー・ビル歴史センターのギャラリー", 300, 62),
     prop("Cody Nite Rodeo Chute|Compuerta de salida del Cody Nite Rodeo|Stalle de départ du Cody Nite Rodeo|コディ・ナイト・ロデオの出走ゲート", 190, 39)],
  ),

  bozeman: city(
    "Bozeman|Bozeman|Bozeman|ボーズマン",
    -111.04, 45.68, "plains", "fossil", "westernranch", "l",
    "A trail named for a man, now overshadowed by the dinosaurs down the road|Un sendero que llevó el nombre de un hombre, hoy eclipsado por los dinosaurios de al lado|Une piste nommée d'après un homme, aujourd'hui éclipsée par les dinosaures du coin|人の名を冠した道が、いまや近所の恐竜の陰に隠れる町",
    "John Bozeman blazed the Bozeman Trail in 1863 to cut miles off the journey to Montana's goldfields, cutting straight through land the Lakota, Cheyenne, and Arapaho had been guaranteed by treaty, which touched off years of conflict before the trail was abandoned. Today the town is better known for the Museum of the Rockies, whose collection of Tyrannosaurus and Triceratops fossils, many excavated by paleontologist Jack Horner's teams, ranks among the largest dinosaur collections in the country.|John Bozeman abrió la Senda Bozeman en 1863 para acortar el trayecto hacia los yacimientos de oro de Montana, atravesando tierras garantizadas por tratado a los lakota, cheyenes y arapajó. Hoy el pueblo es más conocido por el Museo de las Rocosas, cuya colección de fósiles de dinosaurios figura entre las mayores del país.|John Bozeman traça la piste Bozeman en 1863 pour raccourcir le trajet vers les gisements d'or du Montana, coupant à travers des terres garanties par traité aux Lakotas, aux Cheyennes et aux Arapahos. Aujourd'hui, la ville est plus connue pour le Museum of the Rockies, dont la collection de fossiles de dinosaures compte parmi les plus vastes du pays.|ジョン・ボーズマンは1863年、モンタナの金鉱地帯への道のりを短縮するためボーズマン・トレイルを切り開いたが、それは条約でラコタ・シャイアン・アラパホの人々に保障されていた土地をまっすぐ突っ切るものであり、何年にもわたる紛争を引き起こしたのちに廃道となった。今日この町は、化石コレクションで知られるロッキーズ博物館のほうでよく知られており、その規模は全米有数である。",
    [prop("Museum of the Rockies Fossil Hall|Sala de fósiles del Museo de las Rocosas|Salle des fossiles du Museum of the Rockies|ロッキーズ博物館の化石展示室", 380, 79),
     prop("Gallatin Valley Grain Elevator|Elevador de grano del valle de Gallatin|Silo à grains de la vallée de Gallatin|ギャラティン・バレーの穀物エレベーター", 220, 46)],
  ),

  omaha: city(
    "Omaha|Omaha|Omaha|オマハ",
    -95.94, 41.26, "plains", "railroad", "prairie", "r",
    "The town Lincoln picked to start a railroad toward the Pacific|El pueblo que Lincoln eligió para iniciar un ferrocarril hacia el Pacífico|La ville que Lincoln choisit pour lancer un chemin de fer vers le Pacifique|リンカーンが太平洋へ向かう鉄道の起点に選んだ町",
    "President Abraham Lincoln designated Omaha the eastern terminus of the transcontinental railroad in 1863, and the Union Pacific Railroad, headquartered here ever since, still keeps its corporate offices in the city. The stockyards that grew up alongside the rail lines became the second-largest in the country by the mid-1900s, and meatpacking gave Omaha its early reputation, one it carries today in a very different form as the headquarters of Omaha Steaks.|El presidente Abraham Lincoln designó a Omaha como la terminal oriental del ferrocarril transcontinental en 1863, y el Union Pacific Railroad sigue manteniendo sus oficinas en la ciudad. Los corrales de ganado se convirtieron en los segundos más grandes del país a mediados del siglo XX.|Le président Abraham Lincoln désigna Omaha comme terminus est du chemin de fer transcontinental en 1863, et l'Union Pacific Railroad y conserve toujours ses bureaux. Les parcs à bestiaux devinrent les deuxièmes plus grands du pays au milieu du XXe siècle.|エイブラハム・リンカーン大統領は1863年、オマハを大陸横断鉄道の東の起点に指定し、以来ここに本社を置くユニオン・パシフィック鉄道はいまも本社機能をこの町に構えている。鉄路とともに発展した家畜市場は20世紀半ばまでに全米第2位の規模となり、食肉加工業がオマハの初期の評判をつくった。その評判はいまも「オマハ・ステーキ」の本拠地として、まったく違う形で受け継がれている。",
    [prop("Union Pacific Railroad Museum Platform|Andén del Museo del Ferrocarril Union Pacific|Quai du musée du chemin de fer Union Pacific|ユニオン・パシフィック鉄道博物館のホーム", 480, 99),
     prop("Historic Stockyards Exchange Building|Edificio histórico de la lonja de ganado|Bâtiment historique de la bourse aux bestiaux|歴史ある家畜市場取引所ビル", 260, 54)],
  ),

  wichita: city(
    "Wichita|Wichita|Wichita|ウィチタ",
    -97.34, 37.69, "plains", "biplane", "prairie", "r",
    "A cowtown that grew wings|Un pueblo vaquero al que le crecieron alas|Une ville de cow-boys à qui poussèrent des ailes|翼を生やしたカウタウン",
    "Wichita sat at the end of the Chisholm Trail in the 1870s, where cowboys drove Texas longhorn cattle north to the railhead, and the boardwalk storefronts of that cowtown era are recreated today at Old Cowtown Museum. In the twentieth century the city became the birthplace of Cessna, Beechcraft, and Learjet, and it has built enough aircraft over the decades to earn the nickname \"Air Capital of the World\".|Wichita se hallaba al final del Sendero Chisholm en la década de 1870, y las fachadas de madera de aquella época se recrean hoy en el Old Cowtown Museum. En el siglo XX la ciudad se convirtió en cuna de Cessna, Beechcraft y Learjet, ganándose el apodo de «Capital Mundial del Aire».|Wichita se trouvait à l'extrémité de la piste Chisholm dans les années 1870, et les devantures de cette époque sont aujourd'hui recréées à l'Old Cowtown Museum. Au XXe siècle, la ville devint le berceau de Cessna, Beechcraft et Learjet, méritant le surnom de « capitale mondiale de l'aviation ».|ウィチタは1870年代、テキサスのロングホーン牛を鉄道の終点まで追い立てるカウボーイたちが辿り着くチザム・トレイルの終着点にあり、当時のカウタウンの木製の店構えは今日オールド・カウタウン博物館で再現されている。20世紀に入るとこの町はセスナ、ビーチクラフト、リアジェットといった航空機メーカーの発祥地となり、「世界の航空首都」と呼ばれるようになった。",
    [prop("Cessna Aircraft Factory Hangar|Hangar de la fábrica de aviones Cessna|Hangar de l'usine d'avions Cessna|セスナ航空機工場の格納庫", 460, 95),
     prop("Old Cowtown Boardwalk|Paseo de madera del Old Cowtown Museum|Trottoir en planches de l'Old Cowtown Museum|オールド・カウタウンの木道", 250, 52)],
  ),

  bismarck: city(
    "Bismarck|Bismarck|Bismarck|ビスマーク",
    -100.78, 46.81, "plains", "capitoltower", "prairie", "r",
    "A capital named to flatter German investors, thousands of kilometres from Germany|Una capital bautizada para halagar a inversores alemanes, a miles de kilómetros de Alemania|Une capitale nommée pour flatter des investisseurs allemands, à des milliers de kilomètres de l'Allemagne|ドイツから何千キロも離れているのに、ドイツ人投資家を喜ばせるために名付けられた州都",
    "Northern Pacific Railway executives renamed this Missouri River crossing \"Bismarck\" in 1873, honouring the German chancellor Otto von Bismarck in the hope of attracting German capital to buy the railroad's bonds. The state capitol that rose here in 1934, a plain Art Deco tower on the open prairie, looked so out of place among the surrounding farmland that locals nicknamed it \"the Skyscraper on the Prairie\", a name that has stuck ever since.|Los directivos del Northern Pacific Railway rebautizaron este cruce del río Misuri como «Bismarck» en 1873, en honor al canciller alemán Otto von Bismarck. El capitolio estatal que se alzó aquí en 1934 desentonaba tanto entre los campos que los lugareños lo apodaron «el rascacielos de la pradera».|Les dirigeants du Northern Pacific Railway rebaptisèrent ce passage sur la rivière Missouri « Bismarck » en 1873, en hommage au chancelier allemand Otto von Bismarck. Le capitole d'État qui s'y éleva en 1934 détonnait tant parmi les terres agricoles que les habitants le surnommèrent « le gratte-ciel de la prairie ».|ノーザン・パシフィック鉄道の経営陣は1873年、このミズーリ川の渡河地点を「ビスマルク」と改名した。ドイツの宰相オットー・フォン・ビスマルクにちなんだこの名は、ドイツ資本を呼び込みたいという思惑からだった。1934年にここに建てられた州議事堂は、開けた大草原にそびえる飾り気のないアール・デコ様式の塔で、周囲の農地とあまりに不釣り合いだったため、地元では「大草原の摩天楼」と呼ばれるようになった。",
    [prop("State Capitol Observation Floor|Piso de observación del Capitolio estatal|Étage panoramique du Capitole d'État|州議事堂の展望階", 320, 66),
     prop("Missouri River Steamboat Dock|Muelle de vapores del río Misuri|Ponton des bateaux à vapeur du Missouri|ミズーリ川の外輪船桟橋", 200, 41)],
  ),

  // ---------------------------------------------------------------------
  // sw — 南西部(8)
  // ---------------------------------------------------------------------
  monumentvalley: city(
    "Monument Valley|Monument Valley|Monument Valley|モニュメントバレー",
    -110.10, 36.98, "sw", "butte", "desert", "l",
    "Land the Navajo Nation runs itself|Una tierra que la Nación Navajo administra ella misma|Une terre que la nation navajo gère elle-même|ナバホ・ネイションが自ら治める土地",
    "The valley lies entirely within the Navajo Nation and is run as a Navajo Tribal Park rather than a US National Park, one of the first such tribal parks when it was set up in 1958 specifically so the Navajo people would control tourism on their own land instead of the federal government. Director John Ford began filming here with Stagecoach in 1939, and the buttes became Hollywood's default backdrop for the Old West even though almost none of the historical events dramatised in those films actually happened anywhere near here.|El valle se encuentra enteramente dentro de la Nación Navajo y se administra como Parque Tribal Navajo, y no como Parque Nacional de Estados Unidos, uno de los primeros parques tribales de este tipo cuando se creó en 1958 justamente para que el pueblo navajo controlara el turismo en sus propias tierras.|La vallée se trouve entièrement dans la nation navajo et est gérée comme un parc tribal navajo plutôt que comme un parc national américain, l'un des premiers parcs tribaux de ce genre lors de sa création en 1958, précisément pour que le peuple navajo contrôle le tourisme sur ses propres terres.|この渓谷はすべてナバホ・ネイションの領内にあり、アメリカの国立公園ではなくナバホ族立公園として運営されている。1958年に設立されたこの種の族立公園としては最初期のもので、観光の管理を連邦政府ではなくナバホの人々自身の手に置くことを目的としていた。映画監督ジョン・フォードは1939年の『駅馬車』でここでの撮影を始め、この岩山群はハリウッドにとって「西部劇の定番の背景」になったが、そうした映画で描かれた史実の大半は実際にはこの近くで起きていない。",
    [prop("Navajo Tribal Park Visitor Center|Centro de visitantes del Parque Tribal Navajo|Centre d'accueil du parc tribal navajo|ナバホ族立公園ビジターセンター", 320, 66),
     prop("Forrest Gump Point Overlook|Mirador de Forrest Gump Point|Point de vue de Forrest Gump Point|フォレスト・ガンプ・ポイントの展望台", 240, 50)],
  ),

  grandcanyon: city(
    "Grand Canyon Village|Grand Canyon Village|Grand Canyon Village|グランドキャニオン・ビレッジ",
    -112.14, 36.06, "sw", "canyon", "canyon", "l",
    "A river that has been cutting down for about six million years|Un río que lleva unos seis millones de años excavando hacia abajo|Une rivière qui creuse vers le bas depuis environ six millions d'années|およそ600万年かけて掘り下げてきた川",
    "The Colorado River has been carving the canyon for roughly five to six million years, exposing rock layers at the bottom that are nearly two billion years old, almost half the age of the planet itself. Eleven Native American tribes hold historical or present-day ties to the canyon, and the Havasupai still live year-round in Supai village at its base, reachable only by a 13-kilometre trail, mule, or helicopter.|El río Colorado lleva excavando el cañón unos cinco o seis millones de años, dejando expuestas en el fondo capas de roca de casi dos mil millones de años. Once tribus nativas americanas mantienen vínculos con el cañón, y los havasupai aún viven todo el año en el poblado de Supai, en su fondo.|Le fleuve Colorado creuse le canyon depuis environ cinq à six millions d'années, exposant au fond des couches rocheuses vieilles de près de deux milliards d'années. Onze tribus amérindiennes entretiennent des liens avec le canyon, et les Havasupai vivent encore toute l'année au village de Supai, au fond.|コロラド川はおよそ500万年から600万年かけてこの峡谷を刻み続けており、谷底にはほぼ20億年前、地球の年齢のほぼ半分に達する岩層が露出している。11の先住民族がこの峡谷と結びつきを持ち、ハバスパイ族はいまも谷底のスパイ集落に一年を通して暮らしている。そこへ行くには13キロメートルの徒歩道か、ラバ、またはヘリコプターしか手段がない。",
    [prop("Rim Trail Overlook Bench|Banco mirador del sendero del borde|Banc du belvédère du sentier de la crête|リムトレイルの展望ベンチ", 420, 87),
     prop("Bright Angel Trailhead Mule Corral|Corral de mulas del sendero Bright Angel|Corral à mules du départ du sentier Bright Angel|ブライトエンジェル・トレイル入口のラバ小屋", 260, 54)],
  ),

  phoenix: city(
    "Phoenix|Phoenix|Phoenix|フェニックス",
    -112.07, 33.45, "sw", "cactus", "canalcity", "r",
    "A city that named itself for rising from a civilization's ruins|Una ciudad que se autonombró por resurgir de las ruinas de una civilización|Une ville qui se nomma elle-même pour renaître des ruines d'une civilisation|ある文明の廃墟から立ち上がったことにちなんで自ら名付けた町",
    "The Hohokam people dug hundreds of kilometres of irrigation canals through this desert valley starting around 1,000 years ago, and when settlers arrived in the 1860s and found the dried-up channels still traceable in the earth, they reused several of the same routes for their own canals, some of which carry water to this day. One of the founders proposed the name \"Phoenix\" in 1868 for a city rising, like the mythical bird, from an earlier civilization's ruins.|El pueblo hohokam excavó cientos de kilómetros de canales de riego por este valle desértico a partir de hace unos 1.000 años. Uno de los fundadores propuso el nombre «Phoenix» en 1868 para una ciudad que resurgía, como el ave mítica, de las ruinas de una civilización anterior.|Le peuple hohokam creusa des centaines de kilomètres de canaux d'irrigation dans cette vallée désertique à partir d'il y a environ 1 000 ans. L'un des fondateurs proposa le nom « Phoenix » en 1868 pour une ville renaissant, comme l'oiseau mythique, des ruines d'une civilisation antérieure.|ホホカム族はおよそ1000年前からこの砂漠の谷に何百キロメートルもの灌漑用水路を掘っていた。1860年代に入植者たちがやって来て水路の跡が地面にまだ辿れることに気づくと、その経路のいくつかを自分たちの水路にそのまま再利用し、その一部は今日も水を運んでいる。創設者の一人は1868年、神話の鳥のように前の文明の廃墟からよみがえる町として「フィーニックス(不死鳥)」の名を提案した。",
    [prop("Hohokam Canal Heritage Walk|Paseo patrimonial del canal hohokam|Promenade patrimoniale du canal hohokam|ホホカム水路遺産の遊歩道", 900, 186),
     prop("Downtown Rooftop Pool Deck|Terraza con piscina en azotea del centro|Terrasse-piscine sur le toit du centre-ville|ダウンタウンの屋上プールデッキ", 420, 87)],
  ),

  tucson: city(
    "Tucson|Tucson|Tucson|ツーソン",
    -110.97, 32.22, "sw", "mission", "saguaro", "r",
    "Fields worked for longer than almost anywhere else on the continent|Campos cultivados durante más tiempo que casi cualquier otro lugar del continente|Des champs cultivés plus longtemps que presque partout ailleurs sur le continent|大陸のほとんどどこよりも長く耕され続けてきた畑",
    "Archaeologists have found evidence of farming along the Santa Cruz River here dating back roughly 4,000 years, making the Tucson area one of the longest continuously cultivated places in North America. Mission San Xavier del Bac, a gleaming white church nicknamed the \"White Dove of the Desert\" and completed by Spanish missionaries in 1797, still holds an active Tohono O'odham parish today.|Los arqueólogos han hallado indicios de agricultura junto al río Santa Cruz que se remontan unos 4.000 años. La misión de San Xavier del Bac, apodada la «Paloma Blanca del Desierto» y terminada en 1797, sigue albergando hoy una parroquia activa tohono o'odham.|Les archéologues ont trouvé des traces d'agriculture le long de la rivière Santa Cruz remontant à environ 4 000 ans. La mission San Xavier del Bac, surnommée la « Colombe blanche du désert » et achevée en 1797, abrite encore aujourd'hui une paroisse active tohono o'odham.|考古学者たちはサンタクルス川沿いでおよそ4000年前まで遡る農耕の痕跡を発見しており、トゥーソン一帯は北米で最も長く絶えず耕作され続けてきた土地の一つとされる。1797年にスペインの宣教師たちが完成させた、白く輝く「砂漠の白い鳩」の愛称を持つサン・ザビエル・デル・バック伝道所は、いまもトホノ・オオダム族の現役の教区教会である。",
    [prop("Mission San Xavier del Bac Courtyard|Patio de la misión San Xavier del Bac|Cour de la mission San Xavier del Bac|サン・ザビエル・デル・バック伝道所の中庭", 560, 116),
     prop("Saguaro Desert Trail Overlook|Mirador del sendero del desierto de saguaros|Belvédère du sentier du désert des saguaros|サグアロ砂漠トレイルの展望地点", 300, 62)],
  ),

  santafe: city(
    "Santa Fe|Santa Fe|Santa Fe|サンタフェ",
    -105.94, 35.69, "sw", "adobe", "adobe", "r",
    "A capital older than the country it belongs to|Una capital más antigua que el país al que pertenece|Une capitale plus ancienne que le pays auquel elle appartient|自らが属する国よりも古い州都",
    "Spanish colonists founded Santa Fe in 1610, a decade before the Pilgrims landed at Plymouth, making it the oldest state capital city in the United States by a wide margin. A 1957 zoning ordinance still requires new buildings in much of the city to follow Pueblo Revival style, with rounded adobe-look walls and exposed roof beams, which is why the skyline still looks much as it did generations ago.|Colonos españoles fundaron Santa Fe en 1610, una década antes de que los peregrinos desembarcaran en Plymouth, lo que la convierte en la ciudad capital de estado más antigua de Estados Unidos. Una ordenanza de 1957 sigue exigiendo el estilo de reavivamiento pueblo en las nuevas construcciones.|Des colons espagnols fondèrent Santa Fe en 1610, une décennie avant que les pèlerins ne débarquent à Plymouth, ce qui en fait de loin la plus ancienne ville capitale d'État des États-Unis. Une ordonnance de 1957 exige encore le style Pueblo Revival pour les nouveaux bâtiments.|スペインの入植者たちは1610年にサンタフェを築いた。これはピルグリムがプリマスに上陸するより10年早く、アメリカ合衆国の州都の中でも群を抜いて古い町である。1957年に定められたゾーニング条例は、いまも市内の大半の新築建物に、丸みを帯びたアドベ風の壁と剥き出しの屋根梁を持つ「プエブロ・リバイバル様式」を義務づけており、そのため町並みは何世代も前とほとんど変わらない姿を保っている。",
    [prop("Palace of the Governors Portal Market|Mercado del pórtico del Palacio de los Gobernadores|Marché du portail du Palace of the Governors|総督邸の柱廊市場", 620, 128),
     prop("Canyon Road Gallery Courtyard|Patio de galería de Canyon Road|Cour de galerie de Canyon Road|キャニオン・ロードのギャラリー中庭", 320, 66)],
  ),

  albuquerque: city(
    "Albuquerque|Albuquerque|Albuquerque|アルバカーキ",
    -106.65, 35.08, "sw", "balloon", "adobe", "l",
    "A sky filled with 500 balloons that only meet once a year|Un cielo lleno de 500 globos que solo se encuentran una vez al año|Un ciel rempli de 500 montgolfières qui ne se retrouvent qu'une fois par an|年に一度だけ集う500基の気球で埋まる空",
    "The Albuquerque International Balloon Fiesta, held every October since 1972, now draws more than 500 hot-air balloons into the sky at once, making it the largest ballooning event in the world, helped by a local wind pattern pilots call \"the Albuquerque Box\" that lets balloons drift out and circle back with the current. The city itself began in 1706 as a Spanish colonial villa, and its Old Town plaza, laid out that same year, still anchors the historic centre.|La Fiesta Internacional del Globo de Albuquerque, celebrada cada octubre desde 1972, reúne ahora en el cielo a más de 500 globos aerostáticos a la vez. La propia ciudad se fundó en 1706 como villa colonial española.|La Fiesta internationale des montgolfières d'Albuquerque, organisée chaque octobre depuis 1972, réunit désormais plus de 500 montgolfières dans le ciel en même temps. La ville elle-même naquit en 1706 comme villa coloniale espagnole.|1972年から毎年10月に開かれるアルバカーキ国際気球祭は、いまや一度に500基を超える熱気球を空に浮かべ、世界最大の気球イベントとなっている。この町自体は1706年、スペイン植民地の村として始まり、同じ年に区画されたオールドタウンの広場は、いまも歴史地区の中心であり続けている。",
    [prop("Balloon Fiesta Launch Field|Campo de lanzamiento de la Fiesta del Globo|Champ de lancement de la Fiesta des montgolfières|気球祭の打ち上げ会場", 600, 124),
     prop("Old Town Plaza Portal Stall|Puesto del pórtico de la plaza del casco antiguo|Étal du portail de la place du vieux quartier|オールドタウン広場の柱廊の露店", 300, 62)],
  ),

  lasvegas: city(
    "Las Vegas|Las Vegas|Las Vegas|ラスベガス",
    -115.14, 36.17, "sw", "neon", "neon", "l",
    "A desert town named for meadows that no longer exist|Un pueblo del desierto llamado por unos prados que ya no existen|Une ville du désert nommée pour des prairies qui n'existent plus|もう存在しない草地にちなんで名付けられた砂漠の町",
    "Spanish traders passing through in the 1820s named the area \"Las Vegas\", Spanish for \"the meadows\", after natural artesian springs that supported grasslands early travelers relied on for water; the springs were pumped dry decades ago and the meadows are long gone. Nevada legalized gambling in 1931 in the middle of the Depression to raise tax revenue, and construction jobs on the nearby Hoover Dam, begun the same year, helped fuel the small city's early growth.|Comerciantes españoles que pasaban por allí en la década de 1820 llamaron a la zona «Las Vegas» por unos manantiales que sostenían praderas de las que dependían los primeros viajeros. Nevada legalizó el juego en 1931, en plena Depresión, para recaudar impuestos.|Des commerçants espagnols de passage dans les années 1820 baptisèrent la zone « Las Vegas », qui signifie « les prairies », du nom de sources qui entretenaient des prairies dont dépendaient les premiers voyageurs. Le Nevada légalisa les jeux d'argent en 1931, en pleine Dépression, pour lever des recettes fiscales.|1820年代にこの地を通りかかったスペイン人商人たちは、自然の湧水がつくる草地(スペイン語で「草原」を意味する「ラスベガス」)にちなんでこの土地を名付けた。湧水は何十年も前にくみ上げられて涸れ、草地はとうに失われている。ネバダ州は大恐慌のさなかの1931年に税収を得るため賭博を合法化し、同じ年に始まったフーバーダムの建設工事の雇用が、この小さな町の初期の成長を後押しした。",
    [prop("Fremont Street Experience Canopy Booth|Caseta bajo el techo de Fremont Street Experience|Kiosque sous la voûte du Fremont Street Experience|フリーモント・ストリート・エクスペリエンスのキャノピー下の売店", 1100, 228),
     prop("Neon Museum Boneyard|Cementerio de letreros del Museo del Neón|Cimetière d'enseignes du Neon Museum|ネオン博物館の看板墓場", 500, 104)],
  ),

  saltlakecity: city(
    "Salt Lake City|Salt Lake City|Salt Lake City|ソルトレイクシティ",
    -111.89, 40.76, "sw", "temple", "saltflat", "r",
    "Streets wide enough for a wagon team to turn around in|Calles lo bastante anchas para que un tiro de carreta diera la vuelta|Des rues assez larges pour qu'un attelage puisse y faire demi-tour|馬車が方向転換できるほど広く作られた通り",
    "Brigham Young led Mormon pioneers into this valley in 1847 after fleeing persecution further east, and the city they laid out has streets a full 132 feet, about 40 metres, wide, said to be sized so a wagon team of oxen could turn around without unhitching. The Great Salt Lake nearby has no outlet to the sea and is up to eight times saltier than the ocean, a shrinking remnant of a much larger ancient lake that once covered most of the region.|Brigham Young condujo a los pioneros mormones a este valle en 1847, y la ciudad que trazaron tiene calles de nada menos que 132 pies, unos 40 metros, de ancho. El cercano Gran Lago Salado no tiene salida al mar y es hasta ocho veces más salado que el océano.|Brigham Young mena les pionniers mormons dans cette vallée en 1847, et la ville qu'ils tracèrent possède des rues larges de pas moins de 132 pieds, environ 40 mètres. Le Grand Lac Salé voisin n'a aucun débouché vers la mer et est jusqu'à huit fois plus salé que l'océan.|ブリガム・ヤングは1847年、東方での迫害から逃れてきたモルモン教徒の開拓者たちをこの谷へ導いた。彼らが区画したこの町の通りは幅132フィート(約40メートル)もあり、牛車が軛を外さずに方向転換できるようにこの広さにしたと言われている。近くのグレートソルト湖は海への出口を持たず、海水の最大8倍もの塩分濃度がある。",
    [prop("Temple Square Assembly Hall Steps|Escalinata del Assembly Hall de Temple Square|Marches de l'Assembly Hall de Temple Square|テンプル・スクエアのアセンブリー・ホールの階段", 720, 149),
     prop("Great Salt Lake Marina Dock|Muelle de la marina del Gran Lago Salado|Ponton de la marina du Grand Lac Salé|グレートソルト湖マリーナの桟橋", 360, 75)],
  ),

  // ---------------------------------------------------------------------
  // pacific — 太平洋岸(7)
  // ---------------------------------------------------------------------
  seattle: city(
    "Seattle|Seattle|Seattle|シアトル",
    -122.33, 47.61, "pacific", "needle", "pikeplace", "r",
    "A market where the fish fly before they're wrapped|Un mercado donde el pescado vuela antes de que lo envuelvan|Un marché où le poisson vole avant d'être emballé|包む前に魚が宙を飛ぶ市場",
    "Pike Place Market opened in 1907 so farmers could sell directly to shoppers and cut out middlemen, and its fishmongers later turned the simple act of filling an order into a show, tossing whole salmon across the stall to be caught and wrapped. The Space Needle, built in less than a year for the 1962 World's Fair, was meant to be temporary but has stayed a fixture of the skyline ever since, its revolving restaurant a novelty at the time.|El Pike Place Market abrió en 1907 para que los agricultores pudieran vender directamente a los compradores, y sus pescaderos convirtieron el simple acto de despachar un pedido en un espectáculo. La Space Needle, construida en menos de un año para la Exposición Universal de 1962, iba a ser temporal, pero se ha quedado como un elemento fijo del perfil urbano.|Le Pike Place Market ouvrit en 1907 pour permettre aux agriculteurs de vendre directement aux clients, et ses poissonniers transformèrent le simple fait d'exécuter une commande en spectacle. La Space Needle, construite en moins d'un an pour l'Exposition universelle de 1962, devait être temporaire mais est restée un élément fixe de la silhouette de la ville.|パイク・プレイス・マーケットは1907年、農家が仲買人を通さず買い物客に直接売れるようにと開かれ、そこの魚屋たちはやがて注文をさばくだけの作業をひとつの見世物に変え、丸ごとのサケを売り場の上を投げ渡して受け止め、包んでみせるようになった。1962年の万国博覧会のために1年足らずで建てられたスペース・ニードルは本来一時的な建物のはずだったが、それ以来ずっとスカイラインの定番であり続けている。",
    [prop("Pike Place Fish Stall|Puesto de pescado de Pike Place|Étal de poisson de Pike Place|パイク・プレイスの鮮魚店", 1150, 238),
     prop("Space Needle Observation Deck|Mirador de la Space Needle|Belvédère de la Space Needle|スペース・ニードルの展望デッキ", 520, 108)],
  ),

  portlandoregon: city(
    "Portland, Oregon|Portland (Oregón)|Portland (Oregon)|ポートランド(オレゴン州)",
    -122.68, 45.52, "pacific", "rose", "bridgetown", "r",
    "A city named on a coin toss its founders barely remembered later|Una ciudad bautizada a cara o cruz que sus fundadores apenas recordaban después|Une ville nommée à pile ou face, dont les fondateurs se souvenaient à peine ensuite|コイントスで名付けられた町",
    "The two founders of this Willamette River settlement disagreed on a name in the 1840s, one wanting \"Boston\" after his hometown and the other \"Portland\" after his; they settled it with a coin toss in 1845, and Portland won two tosses out of three. Powell's City of Books, opened decades later, has grown to occupy a full city block and is often described as the largest independent new-and-used bookstore in the world.|Los dos fundadores de este asentamiento sobre el río Willamette no se pusieron de acuerdo en un nombre en la década de 1840; lo resolvieron a cara o cruz en 1845, y Portland ganó dos de tres lanzamientos. Powell's City of Books ha crecido hasta ocupar toda una manzana y se describe a menudo como la librería independiente más grande del mundo.|Les deux fondateurs de cette bourgade sur la rivière Willamette ne s'accordaient pas sur un nom dans les années 1840 ; ils tranchèrent à pile ou face en 1845, et Portland l'emporta deux fois sur trois. Powell's City of Books a fini par occuper tout un pâté de maisons et passe souvent pour la plus grande librairie indépendante au monde.|ウィラメット川沿いのこの町の創設者二人は1840年代、名前をめぐって意見が割れ、1845年のコイントスで決着をつけたところ、ポートランドが3回中2回勝った。何十年も後に開業したパウエルズ・シティ・オブ・ブックスは、いまや街区丸ごとを占めるまでに成長し、世界最大級の新古書独立系書店とよく評される。",
    [prop("Powell's City of Books Reading Room|Sala de lectura de Powell's City of Books|Salle de lecture de Powell's City of Books|パウエルズ・シティ・オブ・ブックスの閲覧室", 680, 141),
     prop("Rose Garden Overlook|Mirador del jardín de rosas|Belvédère de la roseraie|ローズガーデンの展望台", 340, 70)],
  ),

  sanfrancisco: city(
    "San Francisco|San Francisco|San Francisco|サンフランシスコ",
    -122.35, 37.78, "pacific", "cablecar", "goldengate", "l",
    "The only moving thing named a National Historic Landmark|La única cosa en movimiento declarada Monumento Histórico Nacional|Le seul objet en mouvement classé monument historique national|国家歴史登録財として動くことを認められた唯一のもの",
    "San Francisco's cable cars, running since 1873 and pulled along by a cable moving continuously beneath the street, are the only mobile National Historic Landmark in the country, kept in service by grip operators who still work the brake and grip levers entirely by hand. The great earthquake and fire of 1906 destroyed roughly 80 percent of the city, and the rebuilding that followed happened fast enough that much of what tourists photograph today was finished within a decade.|Los tranvías de cable de San Francisco, en marcha desde 1873, son el único Monumento Histórico Nacional móvil del país. El gran terremoto e incendio de 1906 destruyó aproximadamente el 80 % de la ciudad, y la reconstrucción avanzó tan rápido que buena parte de lo que hoy fotografían los turistas quedó terminado en menos de una década.|Les cable cars de San Francisco, en service depuis 1873, sont le seul monument historique national mobile du pays. Le grand séisme et l'incendie de 1906 détruisirent environ 80 % de la ville, et la reconstruction avança assez vite pour qu'une grande partie de ce que les touristes photographient aujourd'hui fût achevée en moins d'une décennie.|1873年から走り続けるサンフランシスコのケーブルカーは、通りの下を絶えず動くケーブルに引かれて動く仕組みで、全米で唯一「動くもの」として国家歴史登録財に指定されている。運転士はいまもブレーキと把持レバーをすべて手で操作している。1906年の大地震と大火はこの町のおよそ8割を焼失させたが、その後の復興は非常に速く進み、今日観光客が写真に撮る景観の多くは10年足らずで仕上がったものである。",
    [prop("Cable Car Turnaround Platform|Plataforma giratoria del tranvía de cable|Plateforme de retournement du cable car|ケーブルカーの方向転換台", 1600, 331),
     prop("Pier 39 Sea Lion Dock|Muelle de los leones marinos en el Pier 39|Ponton des otaries du Pier 39|ピア39のアシカ桟橋", 700, 145)],
  ),

  sacramento: city(
    "Sacramento|Sacramento|Sacramento|サクラメント",
    -121.49, 38.58, "pacific", "fort", "goldrush", "r",
    "The fort near where a sawmill find changed the entire state|El fuerte cerca de donde un hallazgo en un aserradero cambió todo el estado|Le fort près duquel une trouvaille dans une scierie changea tout l'État|近くの製材所での発見が州全体を変えた砦のそば",
    "John Sutter built Sutter's Fort in 1839 as a trading post, and it was at his sawmill in nearby Coloma that a foreman found flecks of gold in the American River in January 1848, setting off the California Gold Rush that transformed the sleepy settlement into the state capital by 1854. Old Sacramento today preserves the wooden boardwalks and false-front buildings of that boom era along the riverfront, next to the California State Railroad Museum.|John Sutter construyó Sutter's Fort en 1839 como puesto de comercio, y fue en su aserradero de la cercana Coloma donde un capataz encontró oro en el río American en enero de 1848, desatando la fiebre del oro de California. El Old Sacramento de hoy conserva las aceras de madera de aquella época de auge.|John Sutter construisit Sutter's Fort en 1839 comme comptoir commercial, et c'est dans sa scierie de Coloma, non loin de là, qu'un contremaître trouva de l'or dans la rivière American en janvier 1848, déclenchant la ruée vers l'or californienne. Old Sacramento conserve aujourd'hui les trottoirs en bois de cette époque de boom.|ジョン・サッターは1839年、交易拠点としてサッター砦を築いた。その近くのコロマにあった彼の製材所で1848年1月、現場監督がアメリカン川できらめく金の粒を見つけ、カリフォルニア・ゴールドラッシュが始まった。この静かな入植地は1854年までに州都へと姿を変えることになる。今日のオールド・サクラメントは、そのブーム時代の木製の歩道を川辺に保存しており、隣にはカリフォルニア州鉄道博物館がある。",
    [prop("Sutter's Fort Trading Post|Puesto de comercio de Sutter's Fort|Comptoir commercial de Sutter's Fort|サッター砦の交易所", 560, 116),
     prop("Old Sacramento Boardwalk Storefront|Fachada del paseo de madera de Old Sacramento|Devanture du trottoir de bois d'Old Sacramento|オールド・サクラメントの木道沿いの店構え", 280, 58)],
  ),

  losangeles: city(
    "Los Angeles|Los Ángeles|Los Angeles|ロサンゼルス",
    -118.24, 34.05, "pacific", "hollywoodsign", "hollywood", "r",
    "A sign built to sell real estate that outlived the company selling it|Un cartel construido para vender terrenos que sobrevivió a la empresa que los vendía|Une enseigne bâtie pour vendre des terrains, qui a survécu à la société qui les vendait|土地を売るために建てられ、その会社より長生きした看板",
    "The Hollywood sign originally read \"HOLLYWOODLAND\" when it was erected in 1923 as an advertisement for a hillside real estate development, and it was only in 1949, after years of neglect and one collapsed letter, that the last four letters were removed to leave the sign as it reads today. The city itself was founded in 1781 by Spanish settlers under a much longer name, more than a century and a half before the film industry gave it its modern identity.|El cartel de Hollywood decía originalmente «HOLLYWOODLAND» cuando se erigió en 1923, y solo en 1949 se retiraron las últimas cuatro letras. La propia ciudad fue fundada en 1781 por colonos españoles bajo un nombre mucho más largo, más de siglo y medio antes de que la industria del cine le diera su identidad moderna.|L'enseigne Hollywood affichait à l'origine « HOLLYWOODLAND » lors de son érection en 1923, et ce n'est qu'en 1949 que les quatre dernières lettres furent retirées. La ville elle-même fut fondée en 1781 par des colons espagnols sous un nom bien plus long, plus d'un siècle et demi avant que l'industrie du cinéma ne lui donne son identité moderne.|ハリウッドの看板は1923年に丘の宅地開発の広告として建てられた当初「HOLLYWOODLAND」と書かれていたが、長年放置されて文字が一つ倒れたのち、1949年になってようやく最後の4文字が取り除かれ、今日の姿になった。この町自体は1781年、スペインの入植者たちによってずっと長い名で創設されており、映画産業が今日の姿を与えるより1世紀半以上も前のことである。",
    [prop("Hollywood Walk of Fame Star Plaza|Plaza de estrellas del Paseo de la Fama de Hollywood|Esplanade des étoiles du Walk of Fame|ハリウッド・ウォーク・オブ・フェイムの星広場", 1500, 311),
     prop("Griffith Observatory Terrace|Terraza del Observatorio Griffith|Terrasse de l'observatoire Griffith|グリフィス天文台のテラス", 680, 141)],
  ),

  sandiego: city(
    "San Diego|San Diego|San Diego|サンディエゴ",
    -117.05, 32.80, "pacific", "mission", "harborcruiser", "r",
    "Where a European first stepped onto what is now the West Coast|Donde un europeo pisó por primera vez lo que hoy es la costa oeste|Là où un Européen posa le pied pour la première fois sur ce qui est aujourd'hui la côte ouest|ヨーロッパ人が現在の西海岸に初めて上陸した場所",
    "Portuguese-born explorer Juan Rodríguez Cabrillo, sailing for Spain, landed in this bay in September 1542, becoming the first European to set foot on what is now the U.S. West Coast, more than sixty years before Jamestown was settled. Mission San Diego de Alcalá, founded in 1769, was the first of the 21 missions Spain eventually built along the California coast, earning San Diego its occasional nickname \"the birthplace of California\".|El explorador de origen portugués Juan Rodríguez Cabrillo, navegando para España, desembarcó en esta bahía en septiembre de 1542. La misión de San Diego de Alcalá, fundada en 1769, fue la primera de las 21 misiones que España construyó a lo largo de la costa californiana.|L'explorateur d'origine portugaise Juan Rodríguez Cabrillo, naviguant pour l'Espagne, débarqua dans cette baie en septembre 1542. La mission San Diego de Alcalá, fondée en 1769, fut la première des 21 missions que l'Espagne bâtit le long de la côte californienne.|ポルトガル生まれでスペインに仕えた探検家フアン・ロドリゲス・カブリリョは1542年9月、この湾に上陸し、現在のアメリカ西海岸に足を踏み入れた最初のヨーロッパ人となった。1769年に建てられたサン・ディエゴ・デ・アルカラ伝道所は、スペインがのちにカリフォルニア沿岸に築くことになる21の伝道所の最初のものであり、サン・ディエゴが時に「カリフォルニア誕生の地」と呼ばれる所以である。",
    [prop("Cabrillo National Monument Overlook|Mirador del Monumento Nacional Cabrillo|Belvédère du monument national Cabrillo|カブリリョ国定記念物の展望台", 900, 186),
     prop("Old Town Mission Courtyard|Patio de la misión del casco antiguo|Cour de la mission de la vieille ville|オールドタウンの伝道所中庭", 420, 87)],
  ),

  napa: city(
    "Napa|Napa|Napa|ナパ",
    -122.29, 38.30, "pacific", "vineyard", "vineyard", "l",
    "The tasting that made French judges doubt their own wine|La cata que hizo dudar a los jueces franceses de su propio vino|La dégustation qui fit douter les juges français de leur propre vin|フランス人審査員が自分たちのワインを疑うことになった試飲会",
    "At a blind tasting in Paris in 1976 now remembered as the \"Judgment of Paris\", French judges who expected to crown a French wine instead ranked a Napa Valley Chardonnay and a Napa Valley Cabernet Sauvignon above top Bordeaux and Burgundy labels, a result that stunned the wine world and put California on the map overnight. The valley had nearly been wiped out twice before that, first by the phylloxera louse in the late 1800s and then by Prohibition from 1920 to 1933, and today it is home to more than 400 wineries.|En una cata a ciegas en París en 1976, hoy recordada como el «Juicio de París», jueces franceses situaron un chardonnay y un cabernet sauvignon del valle de Napa por encima de grandes etiquetas de Burdeos y Borgoña. El valle casi había desaparecido dos veces antes, primero por la filoxera y luego por la Ley Seca de 1920 a 1933.|Lors d'une dégustation à l'aveugle à Paris en 1976, connue comme le « Jugement de Paris », des juges français placèrent un chardonnay et un cabernet-sauvignon de la vallée de Napa au-dessus de grands crus de Bordeaux et de Bourgogne. La vallée avait failli être anéantie deux fois auparavant, par le phylloxéra puis par la Prohibition de 1920 à 1933.|1976年にパリで行われ、のちに「パリスの審判」として知られるようになる目隠し試飲会で、フランス人審査員たちは意に反してナパ・バレーのシャルドネとカベルネ・ソーヴィニヨンをボルドーやブルゴーニュの名だたる銘柄より上位に選んでしまい、一夜にしてカリフォルニアを世界地図に載せることになった。この谷はそれ以前に二度、壊滅寸前に追い込まれていた。19世紀末のフィロキセラの被害と、1920年から1933年の禁酒法である。",
    [prop("Judgment of Paris Tasting Room|Sala de cata del Juicio de París|Salle de dégustation du Jugement de Paris|パリスの審判テイスティングルーム", 480, 99),
     prop("Napa Valley Wine Train Platform|Andén del tren del vino del valle de Napa|Quai du train du vin de la vallée de Napa|ナパ・バレー・ワイン・トレインのホーム", 260, 54)],
  ),
};

/**
 * 路線。全55路線の投影後距離を実測し、seg=130(geography.mjs)で
 * 最長5マス・9マス超0本を確認済み(check-usa-edges.mjsで検証)。
 * アムトラックの実在の系統(北東回廊・シティ・オブ・ニューオーリンズ・
 * カリフォルニア ゼファー・サンセット・リミテッド・エンパイア ビルダー等)を
 * 下敷きにしつつ、47都市が1つの連結成分になるよう補助線を足している。
 *
 * savannah–miami は当初の直線だと海に321px以上はみ出すため外し、
 * savannah–atlanta–tampa–miami の経路で迂回させた
 * (check-sea-routesの簡易版で0本まで詰めた)。
 */
export const USA_EDGES = [
  ["newyork", "boston"],
  ["boston", "portlandmaine"],
  ["newyork", "philadelphia"],
  ["philadelphia", "washingtondc"],
  ["washingtondc", "baltimore"],
  ["baltimore", "philadelphia"],
  ["newyork", "buffalo"],
  ["philadelphia", "pittsburgh"],
  ["washingtondc", "charleston"],
  ["charleston", "savannah"],
  ["savannah", "atlanta"],
  ["atlanta", "nashville"],
  ["nashville", "memphis"],
  ["memphis", "neworleans"],
  ["neworleans", "houston"],
  ["houston", "sanantonio"],
  ["atlanta", "charleston"],
  ["miami", "tampa"],
  ["tampa", "atlanta"],
  ["chicago", "detroit"],
  ["chicago", "cleveland"],
  ["cleveland", "buffalo"],
  ["chicago", "minneapolis"],
  ["chicago", "stlouis"],
  ["chicago", "milwaukee"],
  ["chicago", "indianapolis"],
  ["milwaukee", "minneapolis"],
  ["stlouis", "memphis"],
  ["minneapolis", "bismarck"],
  ["bismarck", "rapidcity"],
  ["rapidcity", "denver"],
  ["rapidcity", "cody"],
  ["cody", "bozeman"],
  ["chicago", "omaha"],
  ["omaha", "denver"],
  ["denver", "saltlakecity"],
  ["wichita", "omaha"],
  ["stlouis", "wichita"],
  ["saltlakecity", "lasvegas"],
  ["bozeman", "saltlakecity"],
  ["albuquerque", "santafe"],
  ["albuquerque", "monumentvalley"],
  ["monumentvalley", "grandcanyon"],
  ["grandcanyon", "phoenix"],
  ["phoenix", "tucson"],
  ["phoenix", "lasvegas"],
  ["tucson", "sanantonio"],
  ["wichita", "santafe"],
  ["seattle", "portlandoregon"],
  ["portlandoregon", "sacramento"],
  ["sacramento", "sanfrancisco"],
  ["sacramento", "napa"],
  ["sanfrancisco", "losangeles"],
  ["losangeles", "sandiego"],
  ["losangeles", "lasvegas"],
  ["losangeles", "phoenix"],
  ["saltlakecity", "sacramento"],
  ["bozeman", "seattle"],
];
