/**
 * ガーナの都市と路線(38都市)。
 *
 * 地方コード: `gar` 大アクラ / `cen` 中部・海岸 / `asa` アシャンティ /
 * `vol` ヴォルタ / `nor` 北部 / `wes` 西部。
 *
 * - `gar`(6) アクラ・テマ・アダ・ドドワ・コフォリドゥア・ンカウカウ
 * - `cen`(6) ケープコースト・エルミナ・ウィネバ・ソルトポンド・アノマブ・アパム
 * - `asa`(5) クマシ・ボンウィレ・ンソンソ・エジス・オブアシ
 * - `vol`(7) ホー・ホホエ・ケタ・アコソンボ・クパンド・ケテ・クラチ・アフラウ
 * - `nor`(8) タマレ・イェンディ・ボルガタンガ・ワ・パガ・ララバンガ・サラガ・イェジ
 * - `wes`(6) タコラディ(セコンディと合併済みの一つの都市として)・アシム・エルボ・
 *   プレステア・タルクワ・ベイン(ンズレズ水上集落への玄関口)
 *
 * 「アバンダ」「ンクルンバ」「アクスンボ」という地名は実在の町として特定できず、
 * team-lead確認の結果、依頼時の書き間違いだったため、実在が確認できる町
 * (ンカウカウ・コフォリドゥアなど)に置き換えている。
 *
 * ## 路線(42本)
 *
 * 実在の鉄道は南部に限られる。西部線(クマシ―オブアシ―プレステア―タルクワ―
 * タコラディ)と東部線(アクラ―コフォリドゥア―クマシ)の2本が歴史的な幹線で、
 * この2本だけを歴史的な鉄道としてコメントに明記してある(路線種別は現状
 * 陸路/航路の2つしか無いため、鉄道か道路かは主にコメントで示す)。
 * 北部には鉄道が通っていないので、道路で疎に結んである。
 * ボルタ湖の渡し(実在の船便)は `sea` 2本、アコソンボ⇄ケテ・クラチ⇄イェジに
 * 分けてある。当初アコソンボ⇄イェジの直線1本だったが、湖が「く」の字に
 * 折れる形をしているため98%が陸を横切ると指摘され、実在の中継港ケテ・クラチ
 * (ダムの湛水で旧市街が水没し、住民ごと高台へ移された町)を挟んで
 * 湖の形に沿わせた(投影後の距離を実測し、湖の楕円チェーンとの距離が
 * 直線1本のときの15〜97pxから、ほぼ0px前後まで縮まることを確認済み)。
 *
 * ## 価格の階段(実測: 最安150〜最高2800、18.7倍)
 *
 * S目玉はケープコースト城(2800)。A格はアクラ・エルミナ・クマシ・
 * アコソンボ・タコラディ・タマレ・オブアシ(900〜1500)。残りはB(350〜650)・
 * C(150〜300)に散らしてある。利回りは他都市と同じ約20.7%で揃えた。
 *
 * 経度・緯度は実際の値。投影の範囲は geography.mjs の GHANA_PROJ を参照。
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const GHANA_CITIES = {
  // ---------------------------------------------------------------------
  // gar — 大アクラ
  // ---------------------------------------------------------------------
  accra: city(
    "Accra|Acra|Accra|アクラ",
    -0.1870, 5.6037, "gar", "capital", "capital", "l",
    "Where independence was declared at midnight|Donde se declaró la independencia a medianoche|Où l'indépendance fut proclamée à minuit|真夜中に独立が宣言された場所",
    "At midnight on 6 March 1957, Kwame Nkrumah told a crowd gathered at Accra's Old Polo Grounds that Ghana was free, making it the first sub-Saharan colony to win independence from European rule. Black Star Square, built nearby for the tenth anniversary of that night, still opens onto the Atlantic through a triple arch topped with the same five-pointed black star that flies on the national flag.|A medianoche del 6 de marzo de 1957, Kwame Nkrumah anunció ante una multitud reunida en el Old Polo Grounds de Accra que Ghana era libre, convirtiéndola en la primera colonia subsahariana en independizarse del dominio europeo. La Plaza de la Estrella Negra, construida cerca para el décimo aniversario de esa noche, sigue abriéndose al Atlántico bajo un arco triple coronado por la misma estrella negra de cinco puntas que ondea en la bandera nacional.|À minuit le 6 mars 1957, Kwame Nkrumah annonça à la foule réunie sur l'Old Polo Ground d'Accra que le Ghana était libre, faisant de lui la première colonie subsaharienne à obtenir son indépendance du pouvoir européen. La place de l'Étoile Noire, bâtie non loin pour le dixième anniversaire de cette nuit-là, s'ouvre toujours sur l'Atlantique sous un arc à trois portes coiffé de la même étoile noire à cinq branches que porte le drapeau national.|1957年3月6日の真夜中、クワメ・ンクルマはアクラの旧ポロ競技場に集まった群衆に向けてガーナの独立を告げ、サハラ以南のアフリカで最初にヨーロッパの支配から独立した植民地となった。その10周年に合わせて近くに建てられたブラックスター・スクエアはいまも、国旗と同じ五芒星の黒い星を頂く三連アーチ越しに大西洋へと開いている。",
    [prop("Black Star Square Grandstand|Tribuna de la Plaza de la Estrella Negra|Tribune de la place de l'Étoile Noire|ブラックスター広場の観覧席", 1200, 248),
     prop("Jamestown Lighthouse View|Vista del faro de Jamestown|Vue du phare de Jamestown|ジェームスタウン灯台の眺め", 250, 52)],
  ),
  tema: city(
    "Tema|Tema|Tema|テマ",
    -0.0166, 5.6698, "gar", "port", "port", "r",
    "Ghana's planned port built from nothing|El puerto planificado que Ghana construyó de la nada|Le port planifié que le Ghana a bâti de rien|無から築かれたガーナの計画港湾都市",
    "Tema grew from a fishing hamlet of a few hundred people into a fully planned industrial port city starting in 1952, when engineers began carving an artificial deep-water harbour out of open coastline to give the newly independent country a gateway that did not depend on canoes rowing goods out to ships anchored offshore. It is still West Africa's largest artificial harbour and handles the majority of the country's seaborne trade.|Tema pasó de ser una aldea de pescadores de unos pocos cientos de personas a una ciudad portuaria industrial totalmente planificada a partir de 1952, cuando los ingenieros empezaron a excavar un puerto artificial de aguas profundas en una costa abierta para dar al país recién independizado una puerta de entrada que no dependiera de canoas remando mercancía hasta barcos fondeados mar adentro. Sigue siendo el mayor puerto artificial de África Occidental y gestiona la mayor parte del comercio marítimo del país.|Tema, simple hameau de pêcheurs de quelques centaines d'habitants, est devenue à partir de 1952 une ville portuaire industrielle entièrement planifiée, lorsque des ingénieurs entreprirent de creuser un port artificiel en eau profonde dans une côte ouverte pour donner au pays tout juste indépendant une porte d'entrée qui ne dépende plus de pirogues acheminant les marchandises à la rame vers des navires ancrés au large. Il reste le plus grand port artificiel d'Afrique de l'Ouest et achemine l'essentiel du commerce maritime du pays.|テマは1952年、技術者たちが開けた海岸線に人工の深海港を掘り込み始めたことをきっかけに、数百人の漁村から完全に計画された工業港湾都市へと育った。独立したばかりの国に、沖に停泊した船へカヌーで荷を漕ぎ出す方式に頼らない玄関口を与えるためだった。いまも西アフリカ最大の人工港であり、この国の海上貿易の大半を扱っている。",
    [prop("Harbour Crane Row|Fila de grúas del puerto|Rangée de grues portuaires|港のクレーン通り", 500, 104),
     prop("Community One Market|Mercado de Community One|Marché de Community One|コミュニティ・ワン市場", 260, 54)],
  ),
  ada: city(
    "Ada Foah|Ada Foah|Ada Foah|アダ・フォア",
    0.6337, 5.7875, "gar", "lagoonfort", "lagoonfort", "b",
    "Where the Volta finally reaches the sea|Donde el Volta llega por fin al mar|Là où la Volta atteint enfin la mer|ボルタ川がついに海へ出る場所",
    "Ada Foah sits where the Volta River, after collecting rain from as far away as Burkina Faso and Mali, finally reaches the Atlantic, and the sandbar separating the river's calm estuary from the open ocean surf is narrow enough to walk across with waves on one side and still water on the other. The Songor lagoon just west of town is one of the country's biggest sources of solar-evaporated salt, harvested from shallow pans the way it has been for generations.|Ada Foah se alza donde el río Volta, tras recoger lluvia de lugares tan lejanos como Burkina Faso y Malí, llega por fin al Atlántico, y el banco de arena que separa el tranquilo estuario del río del oleaje abierto es lo bastante estrecho como para cruzarlo a pie, con olas a un lado y agua quieta al otro. La laguna Songor, justo al oeste del pueblo, es una de las mayores fuentes de sal evaporada al sol del país, extraída de salinas poco profundas como se hace desde hace generaciones.|Ada Foah se trouve à l'endroit où le fleuve Volta, après avoir recueilli les pluies venues d'aussi loin que le Burkina Faso et le Mali, atteint enfin l'Atlantique, et le cordon de sable séparant l'estuaire calme du fleuve du ressac du large est assez étroit pour le traverser à pied, avec des vagues d'un côté et une eau immobile de l'autre. La lagune Songor, juste à l'ouest de la ville, est l'une des plus grandes sources de sel évaporé au soleil du pays, récoltée dans des bassins peu profonds comme on le fait depuis des générations.|アダ・フォアは、はるかブルキナファソやマリの雨まで集めてきたボルタ川がついに大西洋へ出る場所にあり、川の穏やかな河口と外海の波を隔てる砂州は、片側に波、もう片側に静かな水面を見ながら歩いて渡れるほど細い。町のすぐ西にあるソンゴル潟湖は国内有数の天日塩の産地で、何世代も前と同じように浅い塩田で採られている。",
    [prop("Songor Salt Pans|Salinas de Songor|Salines de Songor|ソンゴル塩田", 280, 58),
     prop("Estuary Sandbar Walk|Paseo por el banco de arena del estuario|Promenade sur le cordon de sable de l'estuaire|河口の砂州の遊歩道", 190, 40)],
  ),
  dodowa: city(
    "Dodowa|Dodowa|Dodowa|ドドワ",
    -0.0937, 5.8823, "gar", "market", "market", "l",
    "A forest grove that once held a battle|Un bosque sagrado que una vez vio una batalla|Un bosquet sacré qui vit jadis une bataille|かつて戦があった森の聖域",
    "Dodowa's forest grove was the site of an 1826 battle in which Akan and British-allied forces defeated an invading Ashanti army, a fight still marked every year with a durbar of chiefs held under the same trees, now protected as the Dodowa Forest Reserve. The town's Thursday market pulls traders from across the Greater Accra region for foodstuffs grown in the hills just behind it.|El bosque sagrado de Dodowa fue el escenario de una batalla de 1826 en la que fuerzas akan aliadas con los británicos derrotaron a un ejército invasor ashanti, un combate que aún se conmemora cada año con un durbar de jefes celebrado bajo los mismos árboles, hoy protegidos como la Reserva Forestal de Dodowa. El mercado de los jueves del pueblo atrae a comerciantes de toda la región del Gran Acra por los productos cultivados en las colinas justo detrás.|Le bosquet sacré de Dodowa fut le théâtre d'une bataille en 1826 où des forces akan alliées aux Britanniques défirent une armée ashanti envahissante, un combat encore commémoré chaque année par un durbar de chefs tenu sous les mêmes arbres, aujourd'hui protégés en tant que réserve forestière de Dodowa. Le marché du jeudi de la ville attire des commerçants de tout le Grand Accra pour des denrées cultivées dans les collines juste derrière.|ドドワの森の聖域は1826年、アカンとイギリスの連合軍が侵攻してきたアシャンティ軍を破った戦の舞台であり、いまもその同じ木々の下で毎年首長たちの集い「ダーバー」が催される。この森はいまドドワ森林保護区として守られている。町の木曜市はアクラ大都市圏各地から商人を集め、すぐ裏手の丘で採れる農産物を扱う。",
    [prop("Dodowa Forest Durbar Ground|Terreno del durbar del bosque de Dodowa|Terrain du durbar de la forêt de Dodowa|ドドワの森のダーバー広場", 220, 46),
     prop("Thursday Foodstuff Market|Mercado de alimentos de los jueves|Marché alimentaire du jeudi|木曜の食料品市場", 170, 36)],
  ),
  koforidua: city(
    "Koforidua|Koforidua|Koforidua|コフォリドゥア",
    -0.2569, 6.0940, "gar", "market", "market", "r",
    "The town beads built|El pueblo que construyeron las cuentas|La ville que les perles ont bâtie|ビーズが築いた町",
    "Koforidua grew rich enough on cocoa in the early twentieth century to be nicknamed the 'Garden City,' but it is glass beadmaking, especially by nearby Krobo communities recycling crushed bottles into powder-glass beads, that fills its Wednesday bead market with strands sold by the metre rather than the piece. The town also anchors the road up to the Kwahu plateau, the last flat stretch before the climb.|Koforidua se enriqueció tanto con el cacao a principios del siglo XX que se ganó el apodo de 'Ciudad Jardín', pero es la fabricación de cuentas de vidrio, sobre todo por comunidades krobo cercanas que reciclan botellas trituradas en cuentas de vidrio en polvo, lo que llena su mercado de cuentas de los miércoles con hilos vendidos por metro y no por pieza. El pueblo también sostiene la vía que sube a la meseta de Kwahu, el último tramo llano antes de la subida.|Koforidua s'est suffisamment enrichie grâce au cacao au début du XXe siècle pour être surnommée la « ville-jardin », mais c'est la fabrication de perles de verre, notamment par les communautés krobo voisines qui recyclent des bouteilles broyées en perles de verre en poudre, qui remplit son marché de perles du mercredi de fils vendus au mètre plutôt qu'à la pièce. La ville tient aussi le carrefour de la route montant vers le plateau de Kwahu, dernier tronçon plat avant l'ascension.|コフォリドゥアは20世紀初頭にカカオで富み、「庭園都市」と呼ばれるほどだったが、いま水曜市を埋め尽くすのはガラスビーズ作りである。特に近郊のクロボ人の集落が砕いた瓶をガラス粉に変えて焼くビーズで、一粒ずつではなく1メートル単位の紐で売られる。この町はクワフェ高原へ登る道の起点でもあり、登坂の前の最後の平坦な区間にあたる。",
    [prop("Krobo Bead Market|Mercado de cuentas krobo|Marché de perles krobo|クロボ・ビーズ市場", 450, 94),
     prop("Kwahu Road Junction Inn|Posada del cruce hacia Kwahu|Auberge du carrefour de Kwahu|クワフェ街道の分岐宿", 240, 50)],
  ),
  nkawkaw: city(
    "Nkawkaw|Nkawkaw|Nkawkaw|ンカウカウ",
    -0.7667, 6.5500, "gar", "hills", "hills", "l",
    "The market town under the Kwahu escarpment|El pueblo mercado bajo la escarpa de Kwahu|La ville-marché au pied de l'escarpement de Kwahu|クワフェ断崖の下の市場町",
    "Nkawkaw sits directly below the Kwahu escarpment that its Easter paragliders launch from, a road and rail junction town that grew up where the route north to Kumasi splits from the switchbacks climbing the plateau above it. Its Wednesday market is one of the busiest in the Eastern Region, feeding both the plateau towns above and the valley towns below.|Nkawkaw se encuentra justo debajo de la escarpa de Kwahu desde la que despegan los parapentistas de Pascua, un pueblo cruce de carretera y ferrocarril que creció donde la ruta hacia el norte a Kumasi se separa de las curvas que suben a la meseta. Su mercado de los miércoles es uno de los más concurridos de la Región Oriental, y abastece tanto a los pueblos de la meseta como a los del valle.|Nkawkaw se trouve juste au pied de l'escarpement de Kwahu d'où décollent les parapentistes de Pâques, ville-carrefour routier et ferroviaire née là où la route vers le nord et Kumasi se sépare des lacets grimpant vers le plateau. Son marché du mercredi est l'un des plus animés de la région orientale, ravitaillant à la fois les villes du plateau et celles de la vallée.|ンカウカウはイースターのパラグライダーが飛び立つクワフェ断崖のすぐ下に位置する、道路と鉄道の分岐点として育った町で、クマシへ向かう北のルートが高原へ登るつづら折りの道と分かれる場所にある。水曜市は東部州で最も賑わう市場の一つで、高原側の町と谷側の町の両方に物を送り出している。",
    [prop("Wednesday Market Sheds|Cobertizos del mercado de los miércoles|Halles du marché du mercredi|水曜市の屋根付き市場", 380, 78),
     prop("Escarpment Trailhead Lodge|Albergue al pie de la escarpa|Gîte au départ du sentier de l'escarpement|断崖登山口の山小屋", 210, 44)],
  ),

  // ---------------------------------------------------------------------
  // cen — 中部・海岸
  // ---------------------------------------------------------------------
  elmina: city(
    "Elmina|Elmina|Elmina|エルミナ",
    -1.3492, 5.0851, "cen", "castle", "castle", "r",
    "The oldest European building south of the Sahara|El edificio europeo más antiguo al sur del Sahara|Le plus ancien bâtiment européen au sud du Sahara|サハラ以南で最古のヨーロッパ人の建物",
    "Portugal built Elmina Castle in 1482 as a trading post for gold, and it still stands as the oldest European building anywhere south of the Sahara; under later Dutch control its dungeons held captives bound for the Americas, who left the fort for the last time through a single doorway on the sea wall known as the Door of No Return. Ghana marked 2019 as the Year of Return, inviting descendants of the enslaved back through that same door, this time walking from the ocean toward the fort.|Portugal construyó el castillo de Elmina en 1482 como puesto comercial para el oro, y sigue siendo el edificio europeo más antiguo al sur del Sahara; bajo el control holandés posterior, sus mazmorras retuvieron a cautivos destinados a América, que abandonaban el fuerte por última vez a través de una sola puerta en el muro frente al mar, conocida como la Puerta sin Retorno. Ghana declaró 2019 el Año del Retorno, invitando a los descendientes de los esclavizados a regresar por esa misma puerta, esta vez caminando desde el océano hacia el fuerte.|Le Portugal construisit le château d'Elmina en 1482 comme comptoir pour l'or, et il reste le plus ancien bâtiment européen au sud du Sahara ; sous le contrôle néerlandais qui suivit, ses cachots retinrent des captifs destinés aux Amériques, qui quittaient le fort pour la dernière fois par une seule porte donnant sur la mer, connue comme la Porte du Non-Retour. Le Ghana a fait de 2019 l'Année du Retour, invitant les descendants des personnes réduites en esclavage à revenir par cette même porte, cette fois en marchant de l'océan vers le fort.|ポルトガルは1482年、金の交易拠点としてエルミナ城を築いた。これはサハラ以南で現存する最古のヨーロッパ人の建物である。のちにオランダの支配下では、地下牢にアメリカ大陸へ送られる捕われた人々が押し込められ、彼らは海壁にある「帰らざる扉」と呼ばれるただ一つの戸口から、最後にこの砦を出た。ガーナは2019年を「帰還の年」と定め、奴隷にされた人々の子孫を同じ扉から、今度は海から砦へ向かって歩く形で迎え入れた。",
    [prop("Elmina Castle Ramparts|Murallas del castillo de Elmina|Remparts du château d'Elmina|エルミナ城の胸壁", 1300, 270),
     prop("Fishing Canoe Harbour|Puerto de canoas pesqueras|Port des pirogues de pêche|漁師のカヌー港", 380, 78)],
  ),
  capecoast: city(
    "Cape Coast|Cape Coast|Cape Coast|ケープコースト",
    -1.2466, 5.1053, "cen", "castle", "castle", "b",
    "A governor's rooms built directly over a dungeon|Las habitaciones de un gobernador construidas justo sobre una mazmorra|Les appartements d'un gouverneur bâtis juste au-dessus d'un cachot|地下牢の真上に建てられた総督の部屋",
    "Cape Coast Castle served as the seat of British colonial government on the Gold Coast from 1664 until the capital moved to Accra in 1877, and the governor's own apartments and a chapel stood directly above vaulted dungeons that had held thousands of captives awaiting the crossing to the Americas through the castle's Door of No Return. In 2009, Barack Obama became the first sitting US president to visit Cape Coast Castle, touring those dungeons with his family and walking back out through a courtyard doorway now marked, for returning visitors, the Door of Return.|El castillo de Cape Coast fue la sede del gobierno colonial británico en la Costa de Oro desde 1664 hasta que la capital se trasladó a Accra en 1877, y los propios aposentos del gobernador y una capilla se alzaban justo sobre mazmorras abovedadas que habían retenido a miles de cautivos a la espera de la travesía hacia América por la Puerta sin Retorno del castillo. En 2009, Barack Obama se convirtió en el primer presidente estadounidense en ejercicio en visitar el castillo de Cape Coast, recorriendo esas mazmorras con su familia y saliendo por una puerta del patio hoy señalada, para los visitantes que regresan, como la Puerta del Retorno.|Le château de Cape Coast fut le siège du gouvernement colonial britannique sur la Côte-de-l'Or de 1664 jusqu'au transfert de la capitale à Accra en 1877, et les appartements mêmes du gouverneur ainsi qu'une chapelle se dressaient juste au-dessus de cachots voûtés qui avaient retenu des milliers de captifs attendant la traversée vers les Amériques par la Porte du Non-Retour du château. En 2009, Barack Obama devint le premier président américain en exercice à visiter le château de Cape Coast, parcourant ces cachots avec sa famille et ressortant par une porte de la cour aujourd'hui appelée, pour les visiteurs qui reviennent, la Porte du Retour.|ケープコースト城は1664年から、1877年に首都がアクラへ移るまでイギリスによるゴールドコースト植民地統治の拠点だった。総督自身の居室と礼拝堂は、アメリカ大陸への「帰らざる扉」を通る渡航を待つ何千人もの捕われた人々を収めた、丸天井の地下牢のすぐ真上に建っていた。2009年、バラク・オバマはケープコースト城を訪れた初の現職アメリカ大統領となり、家族とともに地下牢を見て回り、中庭の戸口——いまでは帰還者のために「帰還の扉」と呼ばれている——から外へ出た。",
    [prop("Cape Coast Castle Museum|Museo del castillo de Cape Coast|Musée du château de Cape Coast|ケープコースト城博物館", 2800, 580),
     prop("Kakum Canopy Walkway|Pasarela de dosel de Kakum|Passerelle de la canopée de Kakum|カクム国立公園の吊り橋", 480, 100)],
  ),
  winneba: city(
    "Winneba|Winneba|Winneba|ウィネバ",
    -0.6231, 5.3510, "cen", "lagoonfort", "lagoonfort", "l",
    "A festival where hunters run down a live deer|Un festival donde los cazadores atrapan un ciervo vivo|Un festival où des chasseurs capturent un cerf vivant|生きた鹿を追い詰める祭り",
    "Winneba's Aboakyer festival sends young men of two rival asafo companies out before dawn each May to catch a live antelope bare-handed, racing to be first to bring one back to the chief as an offering, a hunt that oral history says once targeted a lion before the animal proved impossible to catch alive. The town's long, exposed Atlantic beach also makes it one of the roughest stretches of coast in the country for swimming.|El festival Aboakyer de Winneba envía cada mayo, antes del amanecer, a jóvenes de dos compañías asafo rivales a atrapar un antílope vivo a mano limpia, compitiendo por ser los primeros en llevárselo al jefe como ofrenda, una cacería que la tradición oral dice que antes tenía como objetivo a un león, hasta que resultó imposible capturarlo vivo. La larga y expuesta playa atlántica del pueblo también la convierte en uno de los tramos de costa más bravos del país para nadar.|Le festival Aboakyer de Winneba envoie chaque mai, avant l'aube, de jeunes hommes de deux compagnies asafo rivales capturer une antilope vivante à mains nues, chacun cherchant à être le premier à la ramener au chef en offrande, une chasse dont la tradition orale dit qu'elle visait autrefois un lion, avant qu'il ne se révèle impossible à capturer vivant. La longue plage atlantique exposée de la ville en fait aussi l'un des tronçons de côte les plus dangereux du pays pour la baignade.|ウィネバのアボアキェル祭では毎年5月、夜明け前に二つの敵対するアサフォ(戦士団)の若者たちが素手で生きたレイヨウを捕らえに出て、首長への捧げ物として最初に持ち帰ろうと競い合う。口伝によれば、かつては獅子を狙っていたが生け捕りにできないと分かってレイヨウに変わったという。町の長く開けた大西洋のビーチは、この国で泳ぐには最も荒い海岸の一つでもある。",
    [prop("Aboakyer Durbar Ground|Terreno del durbar de Aboakyer|Terrain du durbar de l'Aboakyer|アボアキェル祭の広場", 400, 82),
     prop("Winneba Beach Surf Point|Punto de surf de la playa de Winneba|Spot de surf de la plage de Winneba|ウィネバ・ビーチのサーフポイント", 220, 46)],
  ),
  saltpond: city(
    "Saltpond|Saltpond|Saltpond|ソルトポンド",
    -1.0667, 5.2000, "cen", "lagoonfort", "lagoonfort", "r",
    "The salt pans that named a town|Las salinas que dieron nombre a un pueblo|Les salines qui ont donné son nom à une ville|町の名になった塩田",
    "Saltpond takes its English name from the natural salt pans along its shore, worked by evaporation long before any fort stood nearby, and the discovery of Ghana's first offshore oil field in the 1970s was made just off this same coast, decades before the much larger Jubilee field further west made international headlines. The old town centre still keeps the layout of a nineteenth-century Fante trading port.|Saltpond toma su nombre en inglés de las salinas naturales de su orilla, trabajadas por evaporación mucho antes de que hubiera un fuerte cerca, y el primer yacimiento petrolífero marino de Ghana se descubrió en la década de 1970 justo frente a esta misma costa, décadas antes de que el yacimiento Jubilee, mucho mayor y más al oeste, saltara a los titulares internacionales. El viejo centro del pueblo aún conserva el trazado de un puerto comercial fante del siglo XIX.|Saltpond tire son nom anglais des salines naturelles de son rivage, exploitées par évaporation bien avant qu'un fort ne s'y dresse, et le premier gisement pétrolier offshore du Ghana fut découvert dans les années 1970 juste au large de cette même côte, des décennies avant que le gisement Jubilee, bien plus vaste, plus à l'ouest, ne fasse la une internationale. Le vieux centre-ville garde encore le tracé d'un port de commerce fante du XIXe siècle.|ソルトポンドという英語名は、近くに砦が建つよりずっと前から天日蒸発で塩を作ってきた海辺の塩田に由来する。1970年代、ガーナ最初の洋上油田がこの同じ海岸の沖合で発見された。もっと西にあるはるかに大きなジュビリー油田が国際的なニュースになるずっと前のことである。町の旧中心部はいまも19世紀のファンテ人の交易港としての区割りを保っている。",
    [prop("Old Salt Pans|Antiguas salinas|Anciennes salines|旧塩田", 380, 78),
     prop("Fante Trading Quay|Muelle comercial fante|Quai commercial fante|ファンテ交易埠頭", 210, 44)],
  ),
  anomabo: city(
    "Anomabo|Anomabo|Anomabo|アノマブ",
    -1.1256, 5.1661, "cen", "castle", "castle", "b",
    "The fort that outsold its bigger neighbours|El fuerte que superó en comercio a sus vecinos mayores|Le fort qui surpassa en commerce ses voisins plus grands|近隣の大きな砦を商いで上回った砦",
    "Fort William at Anomabo, rebuilt by the British in the 1750s specifically to compete with Cape Coast and Elmina, ended up handling more captives passing through the Atlantic trade at its peak than either larger castle, because the surrounding Fante state controlled the inland trade routes feeding it. The fort's squat, thick-walled design was built to withstand a siege, and one came in 1806, when an Ashanti army attacked and was held off.|El Fort William de Anomabo, reconstruido por los británicos en la década de 1750 específicamente para competir con Cape Coast y Elmina, acabó gestionando en su apogeo más cautivos del comercio atlántico que cualquiera de los dos castillos mayores, porque el estado fante circundante controlaba las rutas comerciales del interior que lo alimentaban. Su diseño achaparrado y de muros gruesos se construyó para resistir un asedio, y uno llegó en 1806, cuando un ejército ashanti atacó y fue rechazado.|Fort William, à Anomabo, reconstruit par les Britanniques dans les années 1750 précisément pour concurrencer Cape Coast et Elmina, finit par faire transiter à son apogée plus de captifs du commerce atlantique que l'un ou l'autre des deux plus grands châteaux, parce que l'État fante environnant contrôlait les routes commerciales de l'intérieur qui l'alimentaient. Sa conception trapue aux murs épais fut bâtie pour résister à un siège, et un siège survint en 1806, quand une armée ashanti attaqua avant d'être repoussée.|アノマブのフォート・ウィリアムは1750年代、ケープコーストやエルミナに対抗するためだけにイギリスによって再建されたが、周囲のファンテ人の国家が内陸の交易路を握っていたため、最盛期にはこの二つの大きな城よりも多くの人がこの砦を通って大西洋交易に送られた。ずんぐりと厚い壁の造りは包囲に耐えるためのもので、実際1806年にアシャンティ軍の攻撃を受けたが持ちこたえた。",
    [prop("Fort William Ramparts|Murallas de Fort William|Remparts de Fort William|フォート・ウィリアムの胸壁", 420, 86),
     prop("Asafo Company Shrine|Santuario de la compañía asafo|Sanctuaire de la compagnie asafo|アサフォ戦士団の祠", 220, 46)],
  ),
  apam: city(
    "Apam|Apam|Apam|アパム",
    -0.7333, 5.2833, "cen", "lagoonfort", "lagoonfort", "l",
    "Fort Patience, aptly named|Fort Patience, un nombre bien puesto|Fort Patience, bien nommé|その名にふさわしい「忍耐の砦」",
    "Fort Patience at Apam took the Dutch so many stalled attempts and years of negotiation with local rulers before it was finally completed in 1697 that they named it for the very trait the whole process demanded of them. The fishing harbour below it still launches some of the most brightly decorated canoes on this stretch of coast, each hull painted with its owner's chosen proverb.|El Fort Patience de Apam costó a los holandeses tantos intentos fallidos y años de negociación con los gobernantes locales antes de completarse por fin en 1697, que lo nombraron por la misma cualidad que todo el proceso les exigió. El puerto pesquero a sus pies aún bota algunas de las canoas más coloridas de este tramo de costa, cada casco pintado con el proverbio elegido por su dueño.|Fort Patience, à Apam, coûta aux Hollandais tant de tentatives avortées et d'années de négociation avec les chefs locaux avant d'être enfin achevé en 1697, qu'ils le nommèrent d'après la qualité même que tout ce processus exigeait d'eux. Le port de pêche à ses pieds met encore à l'eau certaines des pirogues les plus richement peintes de ce tronçon de côte, chaque coque arborant le proverbe choisi par son propriétaire.|アパムのフォート・パーシェンス(忍耐の砦)は、1697年についに完成するまでにオランダ人が何度も頓挫し、現地の支配者との交渉に何年もかけたため、その過程全体が彼らに求めたまさにその資質にちなんで名付けられた。その足元の漁港はいまもこの海岸沿いで指折りに色鮮やかなカヌーを送り出しており、船体にはそれぞれの持ち主が選んだ諺が描かれている。",
    [prop("Fort Patience Courtyard|Patio de Fort Patience|Cour de Fort Patience|フォート・パーシェンスの中庭", 380, 78),
     prop("Painted Canoe Landing|Embarcadero de canoas pintadas|Débarcadère des pirogues peintes|彩色カヌーの船着き場", 200, 42)],
  ),

  // ---------------------------------------------------------------------
  // asa — アシャンティ
  // ---------------------------------------------------------------------
  kumasi: city(
    "Kumasi|Kumasi|Kumasi|クマシ",
    -1.6244, 6.6885, "asa", "asante", "asante", "l",
    "A golden stool no one is allowed to sit on|Un taburete dorado en el que nadie puede sentarse|Un tabouret d'or sur lequel personne n'a le droit de s'asseoir|誰も座ることを許されない黄金の腰掛け",
    "Kumasi has been the seat of the Asantehene, the Asante king, since the priest Okomfo Anokye is said to have summoned a golden stool down from the sky in the late 1600s to unite the Asante clans, a stool so sacred that by tradition no one, not even the king himself, may ever sit on it. The Manhyia Palace Museum nearby now displays royal regalia and draws Asante subjects from across Ghana and its diaspora during the six-week cycle of Adae festivals.|Kumasi ha sido la sede del Asantehene, el rey asante, desde que el sacerdote Okomfo Anokye, según se cuenta, hizo descender del cielo un taburete de oro a finales del siglo XVII para unir a los clanes asante, un taburete tan sagrado que, por tradición, nadie, ni siquiera el propio rey, puede sentarse jamás en él. El cercano Museo del Palacio de Manhyia exhibe hoy insignias reales y atrae a súbditos asante de toda Ghana y su diáspora durante el ciclo de seis semanas de los festivales Adae.|Kumasi est le siège de l'Asantehene, le roi asante, depuis que le prêtre Okomfo Anokye aurait fait descendre du ciel un tabouret d'or à la fin du XVIIe siècle pour unir les clans asante, un tabouret si sacré que, selon la tradition, personne, pas même le roi, n'a jamais le droit de s'y asseoir. Le musée du palais de Manhyia, tout proche, expose aujourd'hui les insignes royaux et attire des sujets asante venus de tout le Ghana et de sa diaspora lors du cycle de six semaines des festivals Adae.|クマシは、祭司オコンフォ・アノキェが1600年代末にアシャンティの氏族をまとめるため天から黄金の腰掛けを呼び降ろしたと伝えられて以来、アサンテヘネ(アシャンティ王)の座所となっている。この腰掛けはあまりに神聖なため、しきたりでは王自身を含め誰も座ってはならないとされる。近くのマニヒア宮殿博物館は現在、王家の宝器を展示し、6週間周期のアデー祭のたびにガーナ内外の離散したアシャンティの人々を集めている。",
    [prop("Kejetia Market Stalls|Puestos del mercado de Kejetia|Étals du marché de Kejetia|ケジェティア市場の露店", 1300, 270),
     prop("Manhyia Palace Museum|Museo del Palacio de Manhyia|Musée du palais de Manhyia|マニヒア宮殿博物館", 700, 144)],
  ),
  bonwire: city(
    "Bonwire|Bonwire|Bonwire|ボンウィレ",
    -1.4939, 6.7431, "asa", "kente", "kente", "r",
    "The village where kente is said to have begun|El pueblo donde se dice que nació el kente|Le village où le kente serait né|ケンテ織りが始まったと伝わる村",
    "Bonwire's weavers trace their craft to a story of two friends who are said to have copied a spider's web pattern into cloth on narrow looms, a legend the village still tells to explain why kente is woven in strips about ten centimetres wide and later sewn together into the finished cloth. Each pattern and colour combination in a genuine kente strip is understood locally to carry its own name and proverb rather than being purely decorative.|Los tejedores de Bonwire remontan su oficio a la historia de dos amigos que, según se cuenta, copiaron el dibujo de una telaraña en tela con telares estrechos, leyenda que el pueblo sigue contando para explicar por qué el kente se teje en tiras de unos diez centímetros de ancho que luego se cosen entre sí. Cada patrón y combinación de colores de una tira de kente auténtica se entiende localmente como portadora de su propio nombre y proverbio, y no como mera decoración.|Les tisserands de Bonwire font remonter leur art à l'histoire de deux amis qui auraient copié le motif d'une toile d'araignée sur un tissu tissé sur des métiers étroits, légende que le village raconte encore pour expliquer pourquoi le kente se tisse en bandes d'une dizaine de centimètres de large, cousues ensemble par la suite. Chaque motif et combinaison de couleurs d'une véritable bande de kente porte, dit-on localement, son propre nom et son propre proverbe, plutôt que d'être purement décoratif.|ボンウィレの織り手たちは、自分たちの技を、クモの巣の模様を細い織機で布に写し取ったという二人の友人の物語にさかのぼる。この伝説は、ケンテがなぜ幅10センチほどの細い帯に織られ、あとで縫い合わされるのかを説明するために村でいまも語られている。本物のケンテの帯にある一つ一つの模様と配色は、単なる装飾ではなく、それぞれ固有の名前と諺を持つと地元では理解されている。",
    [prop("Kente Weaving Sheds|Cobertizos de tejido de kente|Ateliers de tissage du kente|ケンテ織りの作業小屋", 500, 104),
     prop("Strip-Loom Workshop|Taller de telares estrechos|Atelier des métiers étroits|細幅織機の工房", 260, 54)],
  ),
  ntonso: city(
    "Ntonso|Ntonso|Ntonso|ントンソ",
    -1.6667, 6.8072, "asa", "adinkra", "adinkra", "l",
    "Where bark dye stamps proverbs onto cloth|Donde un tinte de corteza estampa proverbios en la tela|Où une teinture d'écorce imprime des proverbes sur le tissu|樹皮の染料が布に諺を刻む村",
    "Ntonso's cloth stampers boil the bark of the badie tree down into a thick black dye and press it onto cotton using hand-carved calabash stamps, one stamp per Adinkra symbol, to make the funeral and ceremonial cloth the whole craft is named for. The stamps themselves are cut from broken calabash gourds rather than wood, since the hardened shell holds a finer edge for the fine lines each symbol needs.|Los estampadores de tela de Ntonso hierven la corteza del árbol badie hasta obtener un tinte negro espeso y lo aplican sobre algodón con sellos de calabaza tallados a mano, uno por cada símbolo adinkra, para elaborar la tela funeraria y ceremonial que da nombre a todo el oficio. Los propios sellos se tallan en calabazas rotas y no en madera, ya que la cáscara endurecida mantiene un filo más fino para las líneas delicadas que exige cada símbolo.|Les imprimeurs d'étoffe de Ntonso font bouillir l'écorce de l'arbre badie jusqu'à obtenir une teinture noire épaisse, qu'ils appliquent sur du coton à l'aide de tampons en calebasse sculptés à la main, un tampon par symbole Adinkra, pour fabriquer le tissu funéraire et cérémoniel qui donne son nom à tout cet artisanat. Les tampons eux-mêmes sont taillés dans des calebasses brisées plutôt que dans du bois, la coque durcie conservant un tranchant plus fin pour les lignes délicates qu'exige chaque symbole.|ントンソの布染め職人はバディの木の樹皮を煮詰めて濃い黒の染料を作り、アディンクラの図柄一つにつき一つ、手彫りのひょうたんのスタンプを綿布に押し付けて、この技全体の名の由来となった葬儀・儀礼用の布を作る。スタンプ自体は木ではなく割れたひょうたんの実から彫られる。硬くなった殻のほうが、それぞれの図柄に必要な細い線に鋭い刃先を保てるからである。",
    [prop("Adinkra Stamping Yard|Patio de estampado adinkra|Cour d'impression adinkra|アディンクラ捺染の作業場", 380, 78),
     prop("Calabash Stamp Workshop|Taller de sellos de calabaza|Atelier des tampons en calebasse|ひょうたんスタンプ工房", 200, 42)],
  ),
  ejisu: city(
    "Ejisu|Ejisu|Ejisu|エジス",
    -1.4667, 6.7167, "asa", "asante", "asante", "b",
    "A queen mother who led an army against the British|Una reina madre que dirigió un ejército contra los británicos|Une reine mère qui mena une armée contre les Britanniques|イギリスに軍を率いて立ち向かった王母",
    "Ejisu was the seat of Yaa Asantewaa, the Asante queen mother who in 1900, when the male chiefs hesitated over whether to fight for the golden stool against a British demand to sit on it, reportedly declared she would lead the army herself if the men would not, and did. The war that followed, the last of the Anglo-Ashanti wars, ended in defeat, but Yaa Asantewaa is remembered in Ghana as one of its clearest symbols of resistance.|Ejisu fue la sede de Yaa Asantewaa, la reina madre asante que en 1900, cuando los jefes varones dudaban si luchar por el taburete dorado ante la exigencia británica de sentarse en él, según se cuenta declaró que ella misma dirigiría el ejército si los hombres no lo hacían, y así lo hizo. La guerra que siguió, la última de las guerras anglo-ashanti, terminó en derrota, pero Yaa Asantewaa se recuerda en Ghana como uno de sus símbolos de resistencia más claros.|Ejisu fut le siège de Yaa Asantewaa, la reine mère asante qui, en 1900, alors que les chefs hésitaient à se battre pour le tabouret d'or face à l'exigence britannique de s'y asseoir, aurait déclaré qu'elle mènerait elle-même l'armée si les hommes ne le faisaient pas — et le fit. La guerre qui suivit, la dernière des guerres anglo-ashanti, se solda par une défaite, mais Yaa Asantewaa demeure au Ghana l'un des symboles les plus clairs de la résistance.|エジスは、アシャンティの王母ヤア・アサンテワアの座所だった。1900年、黄金の腰掛けに座るというイギリスの要求に対して男の首長たちが戦うべきか迷っていたとき、彼女は男たちがやらないなら自分が軍を率いると告げ、実際にそうしたと伝えられる。その後の戦争は英・アシャンティ戦争の最後のものとなり敗北に終わったが、ヤア・アサンテワアはガーナで抵抗の最も明確な象徴の一人として記憶されている。",
    [prop("Yaa Asantewaa Museum|Museo de Yaa Asantewaa|Musée Yaa Asantewaa|ヤア・アサンテワア博物館", 420, 86),
     prop("Besease Shrine House|Casa santuario de Besease|Maison-sanctuaire de Besease|ベセアセの祠堂", 220, 46)],
  ),
  obuasi: city(
    "Obuasi|Obuasi|Obuasi|オブアシ",
    -1.6600, 6.2025, "asa", "goldmine", "goldmine", "r",
    "A gold seam mined for over a century|Una veta de oro explotada durante más de un siglo|Un filon d'or exploité depuis plus d'un siècle|一世紀以上掘り続けられた金脈",
    "Obuasi's underground gold mine, worked continuously in some form since 1897, reaches more than two kilometres below the surface, among the deepest mining operations anywhere in Africa, and has produced enough gold over its history to rank among the richest single deposits ever found on the continent. The company town built up around the mine still organises much of daily life around its shift schedules.|La mina subterránea de oro de Obuasi, explotada de forma continua en alguna medida desde 1897, alcanza más de dos kilómetros bajo la superficie, entre las operaciones mineras más profundas de toda África, y ha producido a lo largo de su historia oro suficiente para figurar entre los yacimientos individuales más ricos jamás hallados en el continente. La ciudad empresarial que creció alrededor de la mina sigue organizando buena parte de la vida diaria en torno a sus turnos.|La mine d'or souterraine d'Obuasi, exploitée sans interruption sous une forme ou une autre depuis 1897, descend à plus de deux kilomètres sous la surface, parmi les exploitations minières les plus profondes de tout le continent africain, et a produit au fil de son histoire assez d'or pour figurer parmi les gisements individuels les plus riches jamais découverts en Afrique. La ville-usine bâtie autour de la mine organise encore une grande partie de la vie quotidienne autour de ses roulements d'équipes.|オブアシの地下金鉱は1897年から何らかの形で採掘が続けられ、地表から2キロメートルを超える深さに達する、アフリカでも屈指の深い鉱山である。その歴史を通じて産出した金の量は、この大陸で見つかった単独の鉱床としては最も豊かな部類に入る。鉱山を中心に築かれた企業城下町は、いまも日々の暮らしの多くを交代勤務の時間割に合わせて回している。",
    [prop("Underground Gold Shaft Tour|Recorrido por el pozo de oro subterráneo|Visite du puits d'or souterrain|地下金鉱竪坑の見学ツアー", 1000, 208),
     prop("Mine Company Town Hall|Ayuntamiento de la ciudad minera|Hôtel de ville de la cité minière|鉱山会社の町役場", 380, 78)],
  ),

  // ---------------------------------------------------------------------
  // vol — ヴォルタ
  // ---------------------------------------------------------------------
  ho: city(
    "Ho|Ho|Ho|ホー",
    0.4713, 6.6113, "vol", "hills", "hills", "l",
    "A hill town that became a regional capital|Un pueblo de colina que se volvió capital regional|Une ville de collines devenue capitale régionale|地方の州都になった丘の町",
    "Ho grew from a cluster of Ewe farming settlements into the Volta Region's administrative capital, helped by its position at the base of the Avatime and Adaklu hills, cool enough that it briefly hosted a German colonial sanatorium before the First World War transferred the whole territory to British and French control. Its central market still draws traders down from hill villages that grow some of the country's best pineapples.|Ho pasó de ser un grupo de asentamientos agrícolas ewe a convertirse en la capital administrativa de la región del Volta, favorecida por su posición al pie de las colinas de Avatime y Adaklu, lo bastante frescas como para acoger brevemente un sanatorio colonial alemán antes de que la Primera Guerra Mundial transfiriera todo el territorio al control británico y francés. Su mercado central sigue atrayendo a comerciantes de los pueblos de colina que cultivan algunas de las mejores piñas del país.|Ho, née d'un groupe de peuplements agricoles ewe, est devenue la capitale administrative de la région de la Volta, aidée par sa position au pied des collines d'Avatime et d'Adaklu, assez fraîches pour avoir brièvement accueilli un sanatorium colonial allemand avant que la Première Guerre mondiale ne transfère tout le territoire sous contrôle britannique et français. Son marché central attire encore des commerçants venus des villages de collines qui cultivent certains des meilleurs ananas du pays.|ホーはエウェ人の農村の集まりから、アヴァティメとアダクルの丘のふもとという立地に助けられてヴォルタ州の行政州都へと育った。この地は涼しく、第一次世界大戦で全域がイギリスとフランスの統治に移る前には、ドイツ植民地時代の療養所が一時置かれていたほどである。中央市場はいまも、国内屈指の質のパイナップルを育てる丘の村々から商人を集めている。",
    [prop("Avatime Hills Market|Mercado de las colinas de Avatime|Marché des collines d'Avatime|アヴァティメ丘陵市場", 400, 82),
     prop("Pineapple Growers' Row|Callejón de los cultivadores de piña|Ruelle des producteurs d'ananas|パイナップル農家通り", 220, 46)],
  ),
  hohoe: city(
    "Hohoe|Hohoe|Hohoe|ホホエ",
    0.4708, 7.1519, "vol", "hills", "hills", "r",
    "The gateway to Ghana's tallest waterfall|La puerta a la catarata más alta de Ghana|La porte d'entrée de la plus haute chute d'eau du Ghana|ガーナ最高の滝への入り口",
    "Hohoe sits at the base of the road up to Wli, Ghana's tallest waterfall, where water drops more than 60 metres into a pool shared, at dusk, with thousands of straw-coloured fruit bats that roost on the surrounding cliff face. The town itself grew as a trading post on the old route linking the Volta hills to the coast, long before the waterfall became a destination in its own right.|Hohoe se asienta al pie de la vía que sube a Wli, la catarata más alta de Ghana, donde el agua cae más de 60 metros en una poza que al atardecer comparte con miles de murciélagos frugívoros de color pajizo que se posan en el acantilado circundante. El propio pueblo creció como puesto comercial en la antigua ruta que unía las colinas del Volta con la costa, mucho antes de que la catarata se convirtiera en un destino por derecho propio.|Hohoe se trouve au pied de la route menant à Wli, la plus haute chute d'eau du Ghana, où l'eau tombe de plus de 60 mètres dans un bassin partagé, au crépuscule, avec des milliers de roussettes paille nichant sur la falaise environnante. La ville elle-même s'est développée comme comptoir commercial sur l'ancienne route reliant les collines de la Volta à la côte, bien avant que la chute d'eau ne devienne une destination à part entière.|ホホエは、ガーナ最高の滝ウリの滝へ登る道の起点にある。水は60メートル以上を落下して滝壺に注ぎ、夕暮れにはその周りの崖に棲む何千羽もの藁色のオオコウモリと滝壺を分け合う。この町自体は、滝がそれ自体の目的地になるずっと前から、ヴォルタの丘と海岸を結ぶ古い交易路の中継地として育った。",
    [prop("Wli Waterfall Trailhead|Cabecera del sendero a la catarata Wli|Départ du sentier de la chute Wli|ウリの滝の登山口", 380, 78),
     prop("Fruit Bat Cliff Overlook|Mirador del acantilado de los murciélagos|Belvédère de la falaise aux roussettes|オオコウモリの崖の展望台", 200, 42)],
  ),
  keta: city(
    "Keta|Keta|Keta|ケタ",
    0.9917, 5.9167, "vol", "lagoonfort", "lagoonfort", "b",
    "A town the sea has been taking back for a century|Un pueblo que el mar lleva un siglo recuperando|Une ville que la mer reprend depuis un siècle|一世紀にわたり海に取り戻され続けた町",
    "Keta once prospered as a major Danish and later British trading post on a sandbar barely wider than the town itself, squeezed between the Atlantic and the Keta lagoon, and coastal erosion swallowed so much of its old centre across the twentieth century that a sea wall and dyke finally completed in the 2000s was built specifically to stop the town losing any more of itself. Older residents can point to open water where entire streets used to stand.|Keta prosperó en su día como un importante puesto comercial danés y luego británico, en un banco de arena apenas más ancho que el propio pueblo, apretado entre el Atlántico y la laguna Keta, y la erosión costera engulló tanto de su antiguo centro a lo largo del siglo XX que un muro marino y un dique por fin terminados en la década de 2000 se construyeron específicamente para que el pueblo no perdiera más terreno. Los residentes más ancianos aún señalan mar abierto donde antes había calles enteras.|Keta prospéra jadis comme important comptoir commercial danois puis britannique, sur un cordon de sable à peine plus large que la ville elle-même, coincé entre l'Atlantique et la lagune de Keta, et l'érosion côtière engloutit une telle part de son ancien centre au cours du XXe siècle qu'une digue et un mur de mer enfin achevés dans les années 2000 furent bâtis spécifiquement pour que la ville cesse de perdre du terrain. Les habitants les plus âgés savent encore montrer une eau libre là où se dressaient jadis des rues entières.|ケタはかつてデンマーク、のちにイギリスの主要な交易拠点として栄えた、大西洋とケタ潟湖に挟まれた町そのものとほとんど変わらない幅しかない砂州の上の町である。20世紀を通じて海岸浸食が旧市街の多くを飲み込んだため、2000年代についに完成した護岸と堤防は、これ以上町が失われるのを止めるためだけに建設された。年配の住民はいまも、かつて通り一本がまるごとあった場所を指して、そこがいまは開けた海であることを語る。",
    [prop("Sea Wall Promenade|Paseo del malecón|Promenade de la digue|護岸の遊歩道", 420, 86),
     prop("Fort Prinzenstein Ruins|Ruinas de Fort Prinzenstein|Ruines de Fort Prinzenstein|フォート・プリンツェンシュタイン遺跡", 230, 48)],
  ),
  akosombo: city(
    "Akosombo|Akosombo|Akosombo|アコソンボ",
    0.0563, 6.2986, "vol", "dam", "dam", "l",
    "The dam that made the world's largest reservoir|La presa que creó el embalse más grande del mundo|Le barrage qui créa la plus vaste retenue du monde|世界最大の貯水池を生んだダム",
    "The Akosombo Dam, completed in 1966 as the centrepiece of Kwame Nkrumah's plan to industrialise the country on cheap hydroelectric power, backed up the Volta River into a reservoir with more surface area than any other lake made by people anywhere on Earth. The lake it created displaced roughly 80,000 people from the valley it flooded, most resettled into purpose-built new towns still visible along its shore today.|La presa de Akosombo, terminada en 1966 como pieza central del plan de Kwame Nkrumah para industrializar el país con hidroelectricidad barata, embalsó el río Volta en un depósito con más superficie que cualquier otro lago artificial del planeta. El lago que creó desplazó a unas 80.000 personas del valle que inundó, la mayoría reasentadas en nuevos pueblos construidos a propósito, aún visibles hoy a lo largo de su orilla.|Le barrage d'Akosombo, achevé en 1966 comme pièce maîtresse du plan de Kwame Nkrumah pour industrialiser le pays grâce à une hydroélectricité bon marché, retint les eaux du fleuve Volta en un réservoir dont la superficie dépasse celle de tout autre lac artificiel sur Terre. Le lac ainsi créé déplaça environ 80 000 personnes de la vallée engloutie, la plupart réinstallées dans de nouvelles villes bâties à cet effet, encore visibles aujourd'hui le long de ses rives.|1966年に完成したアコソンボ・ダムは、安価な水力発電で国を工業化するというクワメ・ンクルマの計画の中心事業であり、ボルタ川をせき止めて、地球上のどの人造湖よりも広い水面を持つ貯水池を作った。この湖の誕生によって、水没した谷からおよそ8万人が移住を強いられ、その多くはいまも湖岸に見られる、目的のために新たに建設された町へ移り住んだ。",
    [prop("Akosombo Dam Observation Deck|Mirador de la presa de Akosombo|Belvédère du barrage d'Akosombo|アコソンボ・ダム展望デッキ", 1500, 310),
     prop("Volta Lake Marina|Marina del lago Volta|Marina du lac Volta|ボルタ湖マリーナ", 380, 78)],
  ),
  kpando: city(
    "Kpando|Kpando|Kpando|クパンド",
    0.2833, 6.9833, "vol", "hills", "hills", "r",
    "A lakeside town that used to be a hilltop one|Un pueblo lacustre que antes era de colina|Une ville lacustre qui perchait autrefois sur une colline|かつて丘の上にあった湖畔の町",
    "Kpando sat well inland on high ground until the Akosombo dam's reservoir rose in the 1960s and turned it into a lakeside port, its harbour now handling cargo and passenger canoes heading up the lake toward Yeji and the north. Its cathedral, one of the largest in the Volta Region, was built by German missionaries decades before the lake ever reached the town's edge.|Kpando se hallaba bien tierra adentro, en terreno elevado, hasta que el embalse de la presa de Akosombo subió en los años sesenta y lo convirtió en un puerto lacustre, cuyo muelle gestiona hoy canoas de carga y pasajeros que suben por el lago hacia Yeji y el norte. Su catedral, una de las mayores de la región del Volta, la construyeron misioneros alemanes décadas antes de que el lago llegara siquiera a la orilla del pueblo.|Kpando se trouvait bien à l'intérieur des terres, en hauteur, jusqu'à ce que la retenue du barrage d'Akosombo monte dans les années 1960 et en fasse un port lacustre, son quai gérant aujourd'hui pirogues de fret et de passagers remontant le lac vers Yeji et le nord. Sa cathédrale, l'une des plus grandes de la région de la Volta, fut bâtie par des missionnaires allemands des décennies avant que le lac n'atteigne jamais la lisière de la ville.|クパンドはアコソンボ・ダムの貯水池が1960年代に水位を上げるまでは、かなり内陸の高台にあったが、それによって湖畔の港町に変わり、いまでは荷物船や旅客カヌーが湖を北上してイェジや北部へ向かう拠点となっている。ヴォルタ州でも最大級のその大聖堂は、湖が町のふちに達するよりも何十年も前にドイツ人宣教師によって建てられた。",
    [prop("Lake Ferry Jetty|Embarcadero del ferri del lago|Jetée du ferry du lac|湖のフェリー桟橋", 350, 72),
     prop("Cathedral Bell Tower|Campanario de la catedral|Clocher de la cathédrale|大聖堂の鐘楼", 190, 40)],
  ),
  ketekrachi: city(
    "Kete Krachi|Kete Krachi|Kete Krachi|ケテ・クラチ",
    -0.0500, 7.7667, "vol", "hills", "hills", "l",
    "A colonial outpost the lake moved to higher ground|Un puesto colonial que el lago trasladó a tierras más altas|Un poste colonial que le lac a déplacé sur les hauteurs|湖が高台へ移した植民地の拠点",
    "Kete Krachi served as an administrative post under German colonial rule in Togoland before the First World War transferred the territory to British control, and when Lake Volta's reservoir rose in the 1960s, much of that old town went under water along with it. The population relocated to a new Kete Krachi built on higher ground nearby, and the town today serves as the main midpoint stop for the lake ferry connecting Akosombo to Yeji, a journey that can take the better part of two days end to end.|Kete Krachi sirvió como puesto administrativo bajo el dominio colonial alemán en Togolandia antes de que la Primera Guerra Mundial transfiriera el territorio al control británico, y cuando el embalse del lago Volta subió en los años sesenta, buena parte de aquel viejo pueblo quedó sumergida con él. La población se trasladó a un nuevo Kete Krachi construido en terreno más alto cercano, y el pueblo sirve hoy como la principal parada intermedia del ferri del lago que conecta Akosombo con Yeji, un trayecto que puede llevar buena parte de dos días de punta a punta.|Kete Krachi servit de poste administratif sous la domination coloniale allemande au Togoland avant que la Première Guerre mondiale ne transfère le territoire sous contrôle britannique, et quand la retenue du lac Volta monta dans les années 1960, une bonne part de cette vieille ville fut engloutie avec elle. La population se réinstalla dans un nouveau Kete Krachi bâti sur des hauteurs voisines, et la ville sert aujourd'hui de principale étape intermédiaire pour le ferry du lac reliant Akosombo à Yeji, une traversée pouvant prendre la meilleure partie de deux jours d'un bout à l'autre.|ケテ・クラチは第一次世界大戦で領土がイギリスの統治に移るまで、ドイツ領トーゴランドの植民地行政拠点だった。1960年代にボルタ湖の貯水池が水位を上げると、その旧市街の多くもろとも水没した。住民は近くの高台に築かれた新しいケテ・クラチへ移り住み、この町はいまアコソンボからイェジへ向かう湖の渡し船の主要な中継地となっており、その航路は端から端まで丸2日近くかかることもある。",
    [prop("Old Town Flood Marker|Marcador del pueblo viejo inundado|Repère de l'ancienne ville engloutie|旧市街の水没を示す標", 280, 58),
     prop("Ferry Midpoint Jetty|Embarcadero intermedio del ferri|Jetée intermédiaire du ferry|渡しの中継桟橋", 180, 38)],
  ),
  aflao: city(
    "Aflao|Aflao|Aflao|アフラウ",
    1.1978, 6.1167, "vol", "border", "border", "b",
    "One border, two countries either side of a street|Una frontera, dos países a cada lado de una calle|Une frontière, deux pays de part et d'autre d'une rue|一本の通りの両側に二つの国がある国境",
    "Aflao sits directly on the Togo border, close enough that the frontier line runs straight through what was once a single Ewe community, splitting it into Aflao on the Ghanaian side and Kodzoviakope on the Togolese one, with relatives and market stalls on both sides of a checkpoint that thousands cross on foot every day. It is one of the busiest land borders in West Africa for both passenger and goods traffic.|Aflao se asienta justo en la frontera con Togo, tan cerca que la línea fronteriza atraviesa directamente lo que fue una sola comunidad ewe, dividiéndola en Aflao, del lado ghanés, y Kodzoviakope, del lado togolés, con parientes y puestos de mercado a ambos lados de un control por el que cruzan a pie miles de personas cada día. Es uno de los pasos fronterizos terrestres más transitados de África Occidental, tanto de pasajeros como de mercancías.|Aflao se trouve directement sur la frontière togolaise, si près que la ligne frontalière traverse tout droit ce qui fut jadis une seule communauté ewe, la scindant en Aflao côté ghanéen et Kodzoviakope côté togolais, avec des parents et des étals de marché des deux côtés d'un poste-frontière que des milliers de personnes traversent à pied chaque jour. C'est l'un des postes-frontières terrestres les plus fréquentés d'Afrique de l'Ouest, tant pour les voyageurs que pour les marchandises.|アフラウはトーゴ国境のすぐ上にあり、国境線はかつて一つだったエウェ人の共同体をまっすぐ貫いて、ガーナ側のアフラウとトーゴ側のコゾヴィアコペに分けてしまうほど近い。毎日何千人もが徒歩で越える検問所の両側には、親族も市場の露店も広がっている。ここは西アフリカでも旅客・貨物ともに最も往来の多い陸路国境の一つである。",
    [prop("Border Market Stalls|Puestos del mercado fronterizo|Étals du marché frontalier|国境市場の露店", 420, 86),
     prop("Cross-Border Taxi Rank|Parada de taxis transfronterizos|Station de taxis transfrontaliers|越境タクシー乗り場", 230, 48)],
  ),

  // ---------------------------------------------------------------------
  // nor — 北部
  // ---------------------------------------------------------------------
  tamale: city(
    "Tamale|Tamale|Tamale|タマレ",
    -0.8393, 9.4008, "nor", "savanna", "savanna", "r",
    "The north's fastest-growing crossroads|El cruce de caminos de más rápido crecimiento del norte|Le carrefour du nord à la croissance la plus rapide|北部で最も速く育つ交差点",
    "Tamale grew from a minor Dagomba trading settlement into the largest city in northern Ghana over the twentieth century, even though the traditional seat of the Dagbon kingdom, the Ya-Na's palace, remains 40 kilometres east in Yendi rather than here. Its central market trades heavily in shea butter, pressed by hand from nuts gathered off trees left standing in the surrounding savanna for that single crop while virtually everything else is grown in the fields around them.|Tamale pasó de ser un pequeño asentamiento comercial dagomba a convertirse en la ciudad más grande del norte de Ghana a lo largo del siglo XX, aunque la sede tradicional del reino de Dagbon, el palacio del Ya-Na, sigue estando a 40 kilómetros al este, en Yendi, y no aquí. Su mercado central comercia sobre todo con manteca de karité, prensada a mano con nueces recogidas de árboles dejados en pie en la sabana circundante solo para ese cultivo, mientras casi todo lo demás se siembra en los campos que los rodean.|Tamale, d'un modeste comptoir commercial dagomba, est devenue au cours du XXe siècle la plus grande ville du nord du Ghana, bien que le siège traditionnel du royaume du Dagbon, le palais du Ya-Na, se trouve toujours à 40 kilomètres à l'est, à Yendi, et non ici. Son marché central fait surtout commerce de beurre de karité, pressé à la main à partir de noix récoltées sur des arbres laissés debout dans la savane environnante pour cette seule culture, tandis que presque tout le reste pousse dans les champs qui les entourent.|タマレは20世紀を通じて、ダゴンバ人の小さな交易集落から北部ガーナ最大の都市へと育ったが、ダゴンボン王国の伝統的な王座であるヤーナ(王)の宮殿は、ここではなく東へ40キロ離れたイェンディにいまも残る。中央市場ではシアバターの取引が盛んで、周囲のサバンナにこの一作物のためだけに残された木から集めた実を手で搾って作られる。ほかの作物はほとんどその木々の周りの畑で育てられている。",
    [prop("Shea Butter Cooperative|Cooperativa de manteca de karité|Coopérative de beurre de karité|シアバター協同組合", 900, 186),
     prop("Dagbon Smock Weavers' Row|Callejón de los tejedores de fugu dagbon|Ruelle des tisserands de smocks dagbon|ダゴンボンの民族衣装織り工房通り", 420, 86)],
  ),
  yendi: city(
    "Yendi|Yendi|Yendi|イェンディ",
    -0.0093, 9.4427, "nor", "savanna", "savanna", "l",
    "The traditional seat of the Dagbon kingdom|La sede tradicional del reino de Dagbon|Le siège traditionnel du royaume du Dagbon|ダゴンボン王国の伝統的な王座",
    "Yendi has been the seat of the Ya-Na, paramount chief of the Dagbon kingdom, since the eighteenth century, and the palace grounds still host the annual Damba festival, marking the birth of the Prophet Muhammad with drumming, horse displays and praise-singing that traces the ruling family's line back through generations of Ya-Nas by name. Tamale grew larger and became the region's modern administrative capital, but Yendi kept the older, ceremonial one.|Yendi ha sido la sede del Ya-Na, jefe supremo del reino de Dagbon, desde el siglo XVIII, y los terrenos del palacio siguen acogiendo el festival anual Damba, que conmemora el nacimiento del profeta Mahoma con tambores, exhibiciones ecuestres y cantos de alabanza que recorren por nombre generaciones de Ya-Nas de la familia gobernante. Tamale creció más y se convirtió en la moderna capital administrativa de la región, pero Yendi conservó la más antigua, la ceremonial.|Yendi est le siège du Ya-Na, chef suprême du royaume du Dagbon, depuis le XVIIIe siècle, et le domaine du palais accueille encore le festival annuel Damba, marquant la naissance du prophète Mahomet par des tambours, des démonstrations équestres et des chants de louange retraçant nommément des générations de Ya-Na de la famille régnante. Tamale, devenue plus grande, est devenue la capitale administrative moderne de la région, mais Yendi a gardé l'ancienne, la capitale cérémonielle.|イェンディは18世紀以来、ダゴンボン王国の最高首長ヤーナの座所であり、宮殿の敷地ではいまも毎年ダンバ祭が催される。預言者ムハンマドの誕生を祝うこの祭りでは、太鼓と馬術の披露、そして統治一族の歴代のヤーナの名を辿る賛歌が歌われる。タマレはより大きく育って州の現代的な行政州都になったが、イェンディはより古い、儀礼上の首都であり続けた。",
    [prop("Ya-Na's Palace Grounds|Terrenos del palacio del Ya-Na|Domaine du palais du Ya-Na|ヤーナ宮殿の敷地", 420, 86),
     prop("Damba Festival Square|Plaza del festival Damba|Place du festival Damba|ダンバ祭の広場", 220, 46)],
  ),
  bolgatanga: city(
    "Bolgatanga|Bolgatanga|Bolgatanga|ボルガタンガ",
    -0.8514, 10.7856, "nor", "savanna", "savanna", "r",
    "A market famous for baskets that travel the world|Un mercado famoso por cestas que viajan por el mundo|Un marché réputé pour des paniers qui voyagent dans le monde entier|世界を旅するかごで知られる市場",
    "Bolgatanga's market is the country's main outlet for Bolga baskets, woven from elephant grass by artisans across the Upper East Region and dyed with patterns that vary from workshop to workshop, a craft that grew into a major export item after aid organisations helped connect weavers to buyers abroad in the 1960s. The town also sits close enough to the Burkina Faso border to draw traders across it on market days.|El mercado de Bolgatanga es la principal salida del país para las cestas Bolga, tejidas con hierba elefante por artesanos de toda la Región Alto Oriental y teñidas con patrones que varían de un taller a otro, un oficio que se convirtió en un importante artículo de exportación después de que organizaciones de ayuda conectaran a los tejedores con compradores extranjeros en los años sesenta. El pueblo también está lo bastante cerca de la frontera con Burkina Faso como para atraer comerciantes de allí en los días de mercado.|Le marché de Bolgatanga est le principal débouché du pays pour les paniers Bolga, tissés en herbe à éléphant par des artisans de toute la région du Haut-Est et teints selon des motifs variant d'un atelier à l'autre, un artisanat devenu un article d'exportation majeur après que des organisations d'aide eurent mis en relation tisserands et acheteurs étrangers dans les années 1960. La ville se trouve aussi assez près de la frontière du Burkina Faso pour attirer des commerçants venus la franchir les jours de marché.|ボルガタンガの市場は、アッパー・イースト州各地の職人がエレファントグラスで編み、工房ごとに異なる模様に染める「ボルガ・バスケット」の国内最大の集散地であり、1960年代に援助団体が織り手と海外の買い手を結びつけたのを機に主要な輸出品へと育った。この町はブルキナファソ国境にも近く、市の立つ日には国境を越えて商人が集まる。",
    [prop("Bolga Basket Market|Mercado de cestas Bolga|Marché des paniers Bolga|ボルガ・バスケット市場", 450, 94),
     prop("Elephant Grass Dye Yard|Patio de teñido de hierba elefante|Cour de teinture de l'herbe à éléphant|エレファントグラスの染め場", 240, 50)],
  ),
  wa: city(
    "Wa|Wa|Wa|ワ",
    -2.5099, 10.0601, "nor", "savanna", "savanna", "l",
    "A royal palace built from mud, still lived in|Un palacio real de barro, aún habitado|Un palais royal en terre, toujours habité|いまも人が住む土造りの王宮",
    "Wa's chief still resides in a traditional mud-built palace in the distinctive Sahelian style shared with mosques across the region, its rounded buttresses and flat roof requiring a fresh coat of mud plaster after every rainy season to keep the walls from washing away. The town is the historic seat of the Wa Naa, paramount chief of the Wala people, and one of the largest urban centres in Ghana's far northwest.|El jefe de Wa sigue residiendo en un palacio tradicional de barro con el estilo saheliano distintivo que comparte con las mezquitas de la región, cuyos contrafuertes redondeados y techo plano necesitan una nueva capa de enlucido de barro tras cada temporada de lluvias para que los muros no se desmoronen. El pueblo es la sede histórica del Wa Naa, jefe supremo del pueblo wala, y uno de los mayores centros urbanos del extremo noroeste de Ghana.|Le chef de Wa réside encore dans un palais traditionnel en terre, dans le style sahélien caractéristique partagé avec les mosquées de la région, ses contreforts arrondis et son toit plat exigeant une nouvelle couche d'enduit de terre après chaque saison des pluies pour empêcher les murs de se déliter. La ville est le siège historique du Wa Naa, chef suprême du peuple wala, et l'un des plus grands centres urbains de l'extrême nord-ouest du Ghana.|ワの首長はいまも、この地方のモスクにも共通するサヘル様式の伝統的な土造りの宮殿に住んでいる。丸みを帯びた控え壁と平らな屋根は、雨季のたびに壁が流されないよう新しく泥漆喰を塗り直さねばならない。この町はワラ人の最高首長ワ・ナーの歴史的な座所であり、ガーナ北西の果てで最大級の都市の一つである。",
    [prop("Wa Naa's Mud Palace|Palacio de barro del Wa Naa|Palais de terre du Wa Naa|ワ・ナーの土造りの宮殿", 450, 94),
     prop("Central Mosque Courtyard|Patio de la mezquita central|Cour de la mosquée centrale|中央モスクの中庭", 240, 50)],
  ),
  paga: city(
    "Paga|Paga|Paga|パガ",
    -1.1187, 10.9880, "nor", "savanna", "savanna", "b",
    "Sacred ponds where crocodiles are fed by hand|Estanques sagrados donde se alimenta a mano a los cocodrilos|Des bassins sacrés où l'on nourrit les crocodiles à la main|手ずからワニに餌をやる聖なる池",
    "Paga's sacred crocodile ponds, right on the Burkina Faso border, are considered home to the spirits of the town's ancestors, and the crocodiles there are calm enough around people that a local guide can coax one out of the water to be touched, in a tradition that treats them as protectors rather than as dangerous wildlife. The Pikworo slave camp just outside town, where captives were once held and rationed before being marched further south, is a quieter, less-visited counterpart to the coast's larger forts.|Los estanques sagrados de cocodrilos de Paga, justo en la frontera con Burkina Faso, se consideran hogar de los espíritus de los ancestros del pueblo, y los cocodrilos allí son lo bastante tranquilos con la gente como para que un guía local logre sacar uno del agua para que lo toquen, en una tradición que los trata como protectores y no como fauna peligrosa. El campamento de esclavos de Pikworo, a las afueras del pueblo, donde antaño se retenía y racionaba a los cautivos antes de hacerlos marchar más al sur, es una contraparte más discreta y menos visitada de los grandes fuertes de la costa.|Les bassins sacrés à crocodiles de Paga, tout contre la frontière du Burkina Faso, passent pour abriter les esprits des ancêtres de la ville, et les crocodiles y sont assez calmes avec les gens pour qu'un guide local puisse en faire sortir un de l'eau pour qu'on le touche, tradition qui les traite en protecteurs plutôt qu'en animaux dangereux. Le camp d'esclaves de Pikworo, juste à l'extérieur de la ville, où des captifs étaient jadis retenus et rationnés avant d'être menés plus au sud, en est le pendant plus discret et moins visité des grands forts de la côte.|ブルキナファソ国境のすぐそばにあるパガの聖なるワニ池は、町の祖先の霊が宿る場所とされ、そこのワニは人に対してあまりに穏やかなため、地元のガイドが水から呼び出して触らせることもできる。ワニを危険な野生動物ではなく守護者として扱う伝統である。町のすぐ外にあるピクウォロの奴隷収容所は、かつて捕われた人々がさらに南へ歩かされる前に留め置かれ配給を受けた場所で、海岸の大きな砦に対する、静かで訪れる人の少ないもう一つの記憶の場である。",
    [prop("Sacred Crocodile Pond|Estanque sagrado de cocodrilos|Bassin sacré aux crocodiles|聖なるワニ池", 220, 46),
     prop("Pikworo Slave Camp Ruins|Ruinas del campamento de esclavos de Pikworo|Ruines du camp d'esclaves de Pikworo|ピクウォロ奴隷収容所跡", 160, 34)],
  ),
  larabanga: city(
    "Larabanga|Larabanga|Larabanga|ララバンガ",
    -1.8667, 9.2167, "nor", "mosque", "mosque", "l",
    "A mud mosque said to be Ghana's oldest|Una mezquita de barro que se dice la más antigua de Ghana|Une mosquée de terre dite la plus ancienne du Ghana|ガーナ最古と伝わる土造りのモスク",
    "Larabanga's mosque, built in the distinctive Sudano-Sahelian mud style with wooden struts jutting from its walls, is widely said to date to around 1421, which would make it the oldest surviving mosque in Ghana, though the exact date rests on oral tradition rather than surviving written records. The village also serves as the usual gateway to Mole National Park, Ghana's largest wildlife reserve, a short drive further on.|La mezquita de Larabanga, construida en el característico estilo sudanés-saheliano de barro con maderos que sobresalen de sus muros, se dice ampliamente que data de alrededor de 1421, lo que la convertiría en la mezquita más antigua conservada de Ghana, aunque la fecha exacta descansa en la tradición oral y no en registros escritos que hayan sobrevivido. El pueblo también sirve de puerta habitual al Parque Nacional Mole, la mayor reserva de fauna de Ghana, un corto trayecto más adelante.|La mosquée de Larabanga, bâtie dans le style soudano-sahélien caractéristique en terre, avec des poutres de bois saillant de ses murs, daterait selon la tradition d'environ 1421, ce qui en ferait la plus ancienne mosquée encore debout au Ghana, bien que la date exacte repose sur la tradition orale plutôt que sur des archives écrites conservées. Le village sert aussi de porte d'entrée habituelle vers le parc national de Mole, la plus grande réserve faunique du Ghana, à peu de distance de là.|壁から木の支柱が突き出す独特のスーダン=サヘル様式で建てられたララバンガのモスクは、およそ1421年に遡るとされ、それが正しければガーナ最古の現存モスクとなるが、その正確な年代は現存する文書ではなく口伝に基づいている。この村は、少し先にあるガーナ最大の野生動物保護区モレ国立公園への通常の玄関口としても機能している。",
    [prop("Ancient Mud Mosque|Antigua mezquita de barro|Ancienne mosquée de terre|古の土造りモスク", 420, 86),
     prop("Mole Park Gateway Lodge|Albergue de entrada al parque Mole|Gîte d'entrée du parc de Mole|モレ国立公園入口の山小屋", 230, 48)],
  ),
  salaga: city(
    "Salaga|Salaga|Salaga|サラガ",
    -0.5167, 8.5500, "nor", "savanna", "savanna", "r",
    "A trans-Saharan slave market, a different route from the coast's|Un mercado de esclavos transahariano, una ruta distinta a la de la costa|Un marché d'esclaves transsaharien, une route différente de celle de la côte|海岸とは別の経路をたどったサハラ交易の奴隷市場",
    "Salaga was, before Ghana's coastal forts existed in their final form, one of West Africa's largest inland slave markets, a hub where captives brought south from the Sahel were traded and marched onward, in some cases north across the Sahara rather than south to the Atlantic. A well and market square linked to that trade still stand in the town, now the subject of a slow effort to mark the site the way the coastal castles already are.|Salaga fue, antes de que los fuertes costeros de Ghana existieran en su forma final, uno de los mayores mercados de esclavos del interior de África Occidental, un centro donde se comerciaba con cautivos traídos del sur del Sahel y se les hacía marchar más allá, en algunos casos al norte, cruzando el Sahara, en lugar de al sur, hacia el Atlántico. Un pozo y una plaza de mercado ligados a ese comercio siguen en pie en el pueblo, hoy objeto de un lento esfuerzo por señalizar el lugar como ya se hace con los castillos costeros.|Salaga fut, avant que les forts côtiers du Ghana n'existent sous leur forme définitive, l'un des plus grands marchés d'esclaves de l'intérieur de l'Afrique de l'Ouest, un carrefour où des captifs amenés du sud du Sahel étaient échangés puis menés plus loin, parfois vers le nord à travers le Sahara plutôt que vers le sud, vers l'Atlantique. Un puits et une place de marché liés à ce commerce se dressent encore dans la ville, aujourd'hui l'objet d'un lent effort pour signaler le site comme le sont déjà les châteaux côtiers.|サラガは、ガーナの海岸の砦が最終的な形をとる前から、西アフリカ内陸部で最大級の奴隷市場の一つだった。サヘル地方から南へ連れてこられた捕われた人々が取引され、さらに先へ――時には大西洋へ向かう南ではなく、サハラを越えて北へ――歩かされていく拠点だった。その交易に結びついた井戸と市場広場はいまも町に残っており、海岸の城がすでにそうされているように、この地を記す取り組みがゆっくりと進められている。",
    [prop("Old Slave Market Well|Antiguo pozo del mercado de esclavos|Puits de l'ancien marché aux esclaves|旧奴隷市場の井戸", 420, 86),
     prop("Salaga Market Square|Plaza del mercado de Salaga|Place du marché de Salaga|サラガ市場広場", 220, 46)],
  ),
  yeji: city(
    "Yeji|Yeji|Yeji|イェジ",
    -0.7500, 7.8500, "nor", "savanna", "savanna", "b",
    "The lake crossing that replaced a road|El cruce del lago que sustituyó a una carretera|La traversée du lac qui a remplacé une route|道路の代わりになった湖の渡し",
    "Yeji sits on the western shore of Lake Volta, where a car ferry run by the Volta Lake Transport Company has crossed to Makongo on the far bank since the lake first rose in the 1960s and cut the old north-south road in two. The crossing can take hours depending on how many trucks queue for the ferry, and boarding early rather than late is the only reliable way to shorten the wait.|Yeji se alza en la orilla occidental del lago Volta, donde un ferri para coches operado por la Volta Lake Transport Company cruza hasta Makongo, en la orilla opuesta, desde que el lago subió por primera vez en los años sesenta y partió en dos la antigua carretera norte-sur. La travesía puede durar horas según cuántos camiones hagan cola para el ferri, y embarcar pronto, y no tarde, es la única forma fiable de acortar la espera.|Yeji se trouve sur la rive occidentale du lac Volta, où un ferry pour véhicules exploité par la Volta Lake Transport Company traverse vers Makongo, sur la rive opposée, depuis que le lac est monté pour la première fois dans les années 1960 et a coupé en deux l'ancienne route nord-sud. La traversée peut prendre des heures selon le nombre de camions faisant la queue pour le ferry, et embarquer tôt plutôt que tard reste le seul moyen fiable d'écourter l'attente.|イェジはボルタ湖の西岸にあり、1960年代に湖が初めて水位を上げて古い南北の道路を二つに分断して以来、ボルタ湖運輸会社が運航する自動車渡し船が対岸のマコンゴまで渡している。渡航には、渡し船待ちのトラックの数次第で何時間もかかることがあり、早めに乗り込むことだけが待ち時間を確実に短くする方法である。",
    [prop("Lake Ferry Terminal|Terminal del ferri del lago|Terminal du ferry du lac|湖のフェリーターミナル", 200, 42),
     prop("Makongo Crossing Landing|Embarcadero del cruce de Makongo|Débarcadère de la traversée de Makongo|マコンゴ渡しの船着き場", 150, 32)],
  ),

  // ---------------------------------------------------------------------
  // wes — 西部
  // ---------------------------------------------------------------------
  takoradi: city(
    "Takoradi|Takoradi|Takoradi|タコラディ",
    -1.7554, 4.8845, "wes", "port", "port", "l",
    "The port a rebuilt railway raced to reach|El puerto al que corrió un ferrocarril reconstruido|Le port qu'un chemin de fer reconstruit se hâta d'atteindre|鉄道を急がせた港",
    "Takoradi's deep-water harbour, completed in 1928 as the colony's first artificial port, was built to give the Western Region's gold, timber and manganese a faster route to export than the open-roadstead landings used before it, and the twin city of Sekondi next door supplied much of the railway workforce that got the cargo there. Offshore oil discovered further along this coast in 2007 has since turned Takoradi into the base for Ghana's petroleum industry too.|El puerto de aguas profundas de Takoradi, terminado en 1928 como el primer puerto artificial de la colonia, se construyó para dar al oro, la madera y el manganeso de la región occidental una ruta de exportación más rápida que los embarcaderos de rada abierta usados antes, y la ciudad gemela de Sekondi, al lado, aportó buena parte de la mano de obra ferroviaria que llevaba la carga hasta allí. El petróleo mar adentro descubierto más al oeste de esta costa en 2007 ha convertido desde entonces a Takoradi también en la base de la industria petrolera de Ghana.|Le port en eau profonde de Takoradi, achevé en 1928 comme premier port artificiel de la colonie, fut bâti pour donner à l'or, au bois et au manganèse de la région occidentale une voie d'exportation plus rapide que les mouillages en rade ouverte utilisés auparavant, et la ville jumelle de Sekondi, juste à côté, fournit une bonne part de la main-d'œuvre ferroviaire acheminant la cargaison jusque-là. Le pétrole offshore découvert plus loin sur cette côte en 2007 a depuis fait de Takoradi aussi la base de l'industrie pétrolière du Ghana.|1928年に完成したタコラディの深海港は、この植民地で最初の人工港であり、それ以前に使われていた無防備な沖合の積み出し場よりも速く西部州の金・木材・マンガンを輸出する経路を作るために建設された。隣接する双子都市セコンディは、その荷を運ぶ鉄道労働力の多くを供給した。2007年にこの海岸のさらに沖合で発見された海底油田は、以来タコラディをガーナの石油産業の拠点にもしている。",
    [prop("Deep-Water Harbour Terminal|Terminal del puerto de aguas profundas|Terminal du port en eau profonde|深海港ターミナル", 1200, 248),
     prop("Offshore Oil Company Row|Callejón de las petroleras marinas|Rangée des compagnies pétrolières offshore|洋上石油会社通り", 420, 86)],
  ),
  axim: city(
    "Axim|Axim|Axim|アシム",
    -2.2405, 4.8676, "wes", "castle", "castle", "r",
    "An older fort than Elmina's, on a smaller stage|Un fuerte más antiguo que el de Elmina, en un escenario más pequeño|Un fort plus ancien que celui d'Elmina, sur une scène plus modeste|エルミナより古い砦、より小さな舞台で",
    "Fort San Antonio at Axim, built by Portugal in 1515, predates Elmina Castle's final form and stands as one of the oldest European buildings on this stretch of coast, though it never grew into as large a trading hub as its neighbours further east. The town's beaches and the nearby Nzulezu stilt village have since made it a stop on the coast's tourist route rather than a trading one.|Fort San Antonio de Axim, construido por Portugal en 1515, es anterior a la forma final del castillo de Elmina y se alza como uno de los edificios europeos más antiguos de este tramo de costa, aunque nunca llegó a ser un centro comercial tan grande como sus vecinos más al este. Las playas del pueblo y el cercano poblado sobre pilotes de Nzulezu lo han convertido desde entonces en una parada de la ruta turística de la costa, más que comercial.|Fort San Antonio, à Axim, bâti par le Portugal en 1515, précède la forme définitive du château d'Elmina et compte parmi les plus anciens bâtiments européens de ce tronçon de côte, bien qu'il ne soit jamais devenu un centre commercial aussi vaste que ses voisins plus à l'est. Les plages de la ville et le village voisin sur pilotis de Nzulezu en ont depuis fait une étape de la route touristique du littoral plutôt que commerciale.|アシムのフォート・サン・アントニオは1515年にポルトガルが建てたもので、エルミナ城の最終的な姿より古く、この海岸沿いで最も古いヨーロッパ人の建物の一つだが、東側の隣接地ほど大きな交易拠点には育たなかった。町のビーチと近くの水上集落ンズレズは、いまではこの地を交易の拠点ではなく海岸観光ルートの一つの立ち寄り先にしている。",
    [prop("Fort San Antonio Ramparts|Murallas de Fort San Antonio|Remparts de Fort San Antonio|フォート・サン・アントニオの胸壁", 420, 86),
     prop("Nzulezu Canoe Launch|Embarcadero de canoas hacia Nzulezu|Embarcadère des pirogues vers Nzulezu|ンズレズ行きカヌー乗り場", 230, 48)],
  ),
  elubo: city(
    "Elubo|Elubo|Elubo|エルボ",
    -2.8333, 5.0333, "wes", "border", "border", "l",
    "The last town before the Ivorian border|El último pueblo antes de la frontera con Costa de Marfil|La dernière ville avant la frontière ivoirienne|コートジボワール国境前の最後の町",
    "Elubo sits on the Ghana side of the Ivory Coast border, crossed by a river bridge that carries most road freight moving between the two countries' coastal cities, and the town's market runs largely on the currency and language of whichever side has more traders on a given day. It remains a far quieter crossing than Aflao on the opposite end of the country.|Elubo se alza en el lado ghanés de la frontera con Costa de Marfil, cruzada por un puente sobre el río que transporta la mayor parte del transporte terrestre de mercancías entre las ciudades costeras de ambos países, y el mercado del pueblo funciona en gran medida con la moneda y la lengua del lado que tenga más comerciantes ese día. Sigue siendo un paso mucho más tranquilo que el de Aflao, en el extremo opuesto del país.|Elubo se trouve du côté ghanéen de la frontière ivoirienne, traversée par un pont sur la rivière qui achemine l'essentiel du fret routier entre les villes côtières des deux pays, et le marché de la ville fonctionne en grande partie dans la monnaie et la langue du côté ayant le plus de commerçants ce jour-là. Il reste un poste bien plus calme qu'Aflao, à l'autre bout du pays.|エルボはコートジボワール国境のガーナ側にあり、両国の沿岸都市間を行き来する道路貨物の大半が渡る川の橋で結ばれている。町の市場は、その日どちら側の商人が多いかによって、通貨も言語もおおむねそちらに合わせて動く。国の反対側にあるアフラウに比べると、ここははるかに静かな国境である。",
    [prop("Border Bridge Market|Mercado del puente fronterizo|Marché du pont-frontière|国境橋の市場", 200, 42),
     prop("Freight Truck Yard|Patio de camiones de carga|Cour des camions de fret|貨物トラック置き場", 150, 32)],
  ),
  prestea: city(
    "Prestea|Prestea|Prestea|プレステア",
    -2.1500, 5.4333, "wes", "goldmine", "goldmine", "r",
    "A mining town built on top of its own mine|Un pueblo minero construido sobre su propia mina|Une ville minière bâtie sur sa propre mine|自らの鉱山の真上に建つ町",
    "Prestea grew directly on top of one of Ghana's richest gold seams, mined continuously since the late nineteenth century by a series of companies, and stretches of the town itself have had to be relocated over the decades as underground workings expanded beneath streets and houses. Small-scale artisanal miners still work reclaimed ground around the edges of the larger concessions.|Prestea creció directamente sobre una de las vetas de oro más ricas de Ghana, explotada de forma continua desde finales del siglo XIX por una sucesión de compañías, y tramos del propio pueblo han tenido que reubicarse a lo largo de las décadas a medida que las labores subterráneas se extendían bajo calles y casas. Pequeños mineros artesanales siguen trabajando terrenos recuperados en los bordes de las grandes concesiones.|Prestea a grandi directement au-dessus de l'un des filons d'or les plus riches du Ghana, exploité sans interruption depuis la fin du XIXe siècle par une succession de compagnies, et des pans de la ville elle-même ont dû être déplacés au fil des décennies à mesure que les galeries souterraines s'étendaient sous les rues et les maisons. De petits mineurs artisanaux travaillent encore des terrains récupérés en bordure des grandes concessions.|プレステアはガーナ屈指の豊かな金脈の真上に育った町で、19世紀末から次々と会社が代わりながら採掘が続けられてきた。地下の坑道が通りや家々の下へ広がるにつれ、町自体の一部を何十年にもわたって移転させなければならなかった。大手の採掘権区域の縁では、いまも小規模な個人採掘者たちが掘り返された土地で作業を続けている。",
    [prop("Underground Mine Gallery|Galería de la mina subterránea|Galerie de la mine souterraine|地下鉱山の坑道", 400, 82),
     prop("Relocated Town Quarter|Barrio del pueblo reubicado|Quartier de la ville déplacée|移転した町区画", 220, 46)],
  ),
  tarkwa: city(
    "Tarkwa|Tarkwa|Tarkwa|タルクワ",
    -1.9945, 5.3011, "wes", "goldmine", "goldmine", "b",
    "A university built to teach the gold trade itself|Una universidad creada para enseñar el propio oficio del oro|Une université bâtie pour enseigner le métier de l'or lui-même|金鉱業そのものを教えるために建てられた大学",
    "Tarkwa's gold deposits have been worked long enough, first by hand and later by large open-pit operations, that the town is home to the University of Mines and Technology, training generations of Ghanaian engineers for an industry that dominates the local economy more completely than in almost any other town in the country. Large-scale surface mining here has also made it one of the more visibly transformed landscapes in the Western Region.|Los yacimientos de oro de Tarkwa se han explotado el tiempo suficiente, primero a mano y luego con grandes operaciones a cielo abierto, como para que el pueblo albergue la Universidad de Minas y Tecnología, que forma a generaciones de ingenieros ghaneses para una industria que domina la economía local de forma más completa que en casi cualquier otro pueblo del país. La minería a gran escala a cielo abierto también ha convertido este lugar en uno de los paisajes más visiblemente transformados de la región occidental.|Les gisements d'or de Tarkwa sont exploités depuis assez longtemps, d'abord à la main puis par de vastes exploitations à ciel ouvert, pour que la ville abrite l'Université des mines et de la technologie, formant des générations d'ingénieurs ghanéens pour une industrie qui domine l'économie locale plus complètement que dans presque toute autre ville du pays. L'exploitation minière de surface à grande échelle en a aussi fait l'un des paysages les plus visiblement transformés de la région occidentale.|タルクワの金鉱床は、最初は手掘りで、のちには大規模な露天掘りで長く採掘され続けてきたため、この町には鉱山工科大学があり、国内のほとんどどの町よりも徹底して地域経済を支配する産業のために何世代ものガーナ人技術者を育てている。ここでの大規模な露天掘りは、西部州でも際立って景観が変わってしまった土地の一つにもしている。",
    [prop("University of Mines Campus|Campus de la Universidad de Minas|Campus de l'université des Mines|鉱山工科大学キャンパス", 450, 94),
     prop("Open-Pit Mine Overlook|Mirador de la mina a cielo abierto|Belvédère de la mine à ciel ouvert|露天掘り鉱山の展望台", 240, 50)],
  ),
  beyin: city(
    "Beyin|Beyin|Beyin|ベイン",
    -2.5900, 5.0500, "wes", "stiltvillage", "stiltvillage", "l",
    "A village built entirely on stilts over a lagoon|Un pueblo construido enteramente sobre pilotes en una laguna|Un village entièrement bâti sur pilotis au-dessus d'une lagune|潟湖の上にすべて杭で建てられた村",
    "Nzulezu, reached from Beyin by an hour's canoe trip across Amanzule wetlands and Lake Tadane, is built entirely on stilts over the water, with no dry land under any of its houses, a settlement local tradition says was founded by ancestors who followed a snail to the site. Beyin itself was once home to Fort Apollonia, built by the British in 1770 to compete for trade with Dutch-held forts further along the coast.|Nzulezu, a la que se llega desde Beyin tras una hora en canoa por los humedales de Amanzule y el lago Tadane, está construida enteramente sobre pilotes en el agua, sin tierra firme bajo ninguna de sus casas, un asentamiento que la tradición local dice que fundaron unos ancestros que siguieron a un caracol hasta el lugar. La propia Beyin albergó en su día el Fort Apollonia, construido por los británicos en 1770 para competir por el comercio con los fuertes holandeses más adelante en la costa.|Nzulezu, accessible depuis Beyin après une heure de pirogue à travers les zones humides d'Amanzule et le lac Tadane, est entièrement bâti sur pilotis au-dessus de l'eau, sans la moindre terre ferme sous aucune de ses maisons, un établissement que la tradition locale dit fondé par des ancêtres ayant suivi un escargot jusqu'au site. Beyin elle-même abrita jadis Fort Apollonia, bâti par les Britanniques en 1770 pour rivaliser commercialement avec les forts hollandais plus loin sur la côte.|ベインからアマンズレの湿地とタダネ湖を1時間カヌーで渡った先にあるンズレズは、すべての家の下に乾いた地面が一切なく、水の上にまるごと杭で建てられた集落である。地元の言い伝えでは、一匹のカタツムリを追ってこの地にたどり着いた祖先たちが築いたとされる。ベイン自体はかつて、海岸沿いのオランダ支配下の砦と交易を競うため1770年にイギリスが築いたフォート・アポロニアがあった場所でもある。",
    [prop("Nzulezu Stilt Walkway|Pasarela sobre pilotes de Nzulezu|Passerelle sur pilotis de Nzulezu|ンズレズの高床の遊歩道", 420, 86),
     prop("Fort Apollonia Ruins|Ruinas de Fort Apollonia|Ruines de Fort Apollonia|フォート・アポロニア遺跡", 220, 46)],
  ),
};

export const GHANA_EDGES = [
  // --- cen 中部・海岸の沿岸幹線(実在のN1号線、鉄道は無い) ---
  ["takoradi", "elmina"],
  ["elmina", "capecoast"],
  ["capecoast", "anomabo"],
  ["anomabo", "saltpond"],
  ["saltpond", "apam"],
  ["apam", "winneba"],
  ["winneba", "accra"],
  // --- gar 大アクラ ---
  ["accra", "tema"],
  ["tema", "ada"],
  ["accra", "dodowa"],
  // --- vol ヴォルタ・海岸東側 ---
  ["ada", "keta"],
  ["keta", "aflao"],
  ["aflao", "ho"], // 実在の道路(ソガコペ経由)。ヴォルタ地方を海岸側からも結ぶ
  // --- wes 西部の沿岸(道路のみ、コートジボワール国境まで) ---
  ["takoradi", "axim"],
  ["axim", "beyin"],
  ["beyin", "elubo"],
  // --- asa/wes 西部線(歴史的な鉄道。クマシ―オブアシ―プレステア―タルクワ―タコラディ) ---
  ["kumasi", "obuasi"],
  ["obuasi", "prestea"],
  ["prestea", "tarkwa"],
  ["tarkwa", "takoradi"],
  // --- asa アシャンティの近郊道路 ---
  ["kumasi", "bonwire"],
  ["kumasi", "ntonso"],
  ["kumasi", "ejisu"],
  // --- gar/asa 東部線(歴史的な鉄道。アクラ―コフォリドゥア―クマシ) ---
  ["accra", "koforidua"],
  ["koforidua", "kumasi"],
  ["koforidua", "nkawkaw"], // クワフェ高原へ登る道(実在のN6号線)
  // --- vol ヴォルタの内陸(道路のみ) ---
  ["accra", "akosombo"],
  ["akosombo", "ho"],
  ["ho", "hohoe"],
  ["ho", "kpando"],
  ["kpando", "akosombo"],
  // --- ボルタ湖の渡し(実在の船便。ボルタ湖運輸会社がアコソンボ⇄イェジを運航) ---
  ["akosombo", "ketekrachi", "sea"],
  ["ketekrachi", "yeji", "sea"],
  // --- nor 北部(道路のみ。鉄道は通っていない) ---
  ["kumasi", "tamale"],
  ["tamale", "yendi"],
  ["tamale", "bolgatanga"],
  ["bolgatanga", "paga"],
  ["bolgatanga", "wa"],
  ["tamale", "larabanga"],
  ["larabanga", "wa"],
  ["tamale", "salaga"],
  ["tamale", "yeji"],
];
