/**
 * 世界マップの都市と路線(60都市)。
 *
 * 地方区分は6つ(`eur` ヨーロッパ / `asi` アジア / `afr` アフリカと中東 /
 * `nam` 北アメリカ / `sam` 南アメリカ / `oce` オセアニアと太平洋)。
 *
 * 都市は「その国を代表する1〜3都市」に絞ってある(docs/50-authoring/06-world-map-spec.md)。
 * 経度・緯度は実際の値。投影は WORLD_PROJ(経度 -170〜190、緯度 75〜-56)なので、
 * 太平洋は盤面の左端(ホノルル・パペーテ)と右端(オークランド・スバ)に分かれる。
 *
 * `mark` / `bg` は世界マップ用の新しいキー名を使っている(絵は別途)。
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const WORLD_CITIES = {
  // ---------------------------------------------------------------------
  // eur — ヨーロッパ
  // ---------------------------------------------------------------------
  london: city(
    "London|Londres|Londres|ロンドン",
    -0.13, 51.51, "eur", "bridge_w", "metropolis", "l",
    "The railway that had to run under the street|El ferrocarril que tuvo que ir bajo la calle|Le chemin de fer qui a dû passer sous la rue|通りの下を走らされた鉄道",
    "The Metropolitan opened in 1863 as the world's first underground railway, hauled by steam engines that let their smoke out through gratings in the pavement. The clay around the deep tubes has been soaking up waste heat ever since and can take no more, which is why those lines now run so hot in summer.|El Metropolitan abrió en 1863 como el primer ferrocarril subterráneo del mundo, tirado por locomotoras de vapor que soltaban el humo por rejillas abiertas en la acera. La arcilla que rodea los túneles profundos lleva un siglo absorbiendo calor y ya no admite más: por eso esas líneas van tan calurosas en verano.|Le Metropolitan ouvrit en 1863, premier chemin de fer souterrain au monde, tracté par des locomotives à vapeur dont la fumée s'échappait par des grilles percées dans le trottoir. L'argile autour des tunnels profonds absorbe cette chaleur depuis un siècle et n'en peut plus : ces lignes-là sont devenues les plus chaudes en été.|1863年に開業したメトロポリタン鉄道は世界初の地下鉄で、蒸気機関車の煙は歩道の格子から抜けていた。深い坑道を囲むロンドン粘土は百年ぶんの排熱を吸って飽和しており、夏にその路線がひどく暑いのはそのためである。",
    [prop("Thames Wharf|Muelle del Támesis|Quai de la Tamise|テムズの波止場", 340, 70),
     prop("West End Theatre|Teatro del West End|Théâtre du West End|ウエストエンドの劇場", 360, 74)],
  ),
  paris: city(
    "Paris|París|Paris|パリ",
    2.35, 48.86, "eur", "cathedral_w", "oldworld", "r",
    "Sixteen marble metres set into the walls|Dieciséis metros de mármol en las paredes|Seize mètres de marbre scellés dans les murs|壁に埋められた十六本の一メートル",
    "In 1796 sixteen marble bars were cemented into walls around the city so that anyone could check the length of the new metre for themselves; two are still in place. The metre had been defined as a ten-millionth of the distance from the pole to the equator, surveyed along a meridian running through Paris.|En 1796 se empotraron dieciséis barras de mármol en muros de la ciudad para que cualquiera pudiera comprobar por sí mismo el nuevo metro; dos siguen en su sitio. El metro se había definido como la diezmillonésima parte de la distancia del polo al ecuador, medida sobre un meridiano que pasa por París.|En 1796, seize mètres étalons de marbre furent scellés dans des murs de la ville pour que chacun puisse vérifier lui-même la nouvelle mesure ; deux sont encore en place. Le mètre avait été défini comme la dix-millionième partie de la distance du pôle à l'équateur, relevée sur un méridien passant par Paris.|1796年、市内の壁十六か所に大理石の物差しが埋め込まれ、誰でも新しい「メートル」を自分で確かめられるようにした。今も二本が残る。メートルは、パリを通る子午線に沿って測った北極から赤道までの距離の一千万分の一と定められていた。",
    [prop("Left Bank Bookstall|Puesto de libros del Sena|Boîte de bouquiniste|セーヌ河岸の古本箱", 300, 62),
     prop("Covered Arcade|Pasaje cubierto|Passage couvert|屋根付きの商店街", 330, 68)],
  ),
  amsterdam: city(
    "Amsterdam|Ámsterdam|Amsterdam|アムステルダム",
    4.90, 52.37, "eur", "bridge_w", "harbour", "r",
    "Houses that lean out on purpose|Casas inclinadas a propósito|Des maisons penchées exprès|わざと前へ傾いた家",
    "The canal houses tilt forward and carry a hoisting beam at the gable, because the stairs are far too steep to take furniture up — everything goes in through the windows on a rope. The whole city stands on timber piles driven through the peat; the royal palace alone rests on 13,659 of them.|Las casas de los canales se inclinan hacia delante y llevan una viga con gancho en el remate, porque las escaleras son demasiado empinadas para subir muebles: todo entra por las ventanas con una cuerda. La ciudad entera se apoya en pilotes de madera hincados en la turba; sólo el palacio real descansa sobre 13.659.|Les maisons des canaux penchent vers l'avant et portent une poutre à poulie au pignon, car les escaliers sont trop raides pour y monter des meubles : tout passe par les fenêtres, au bout d'une corde. La ville entière repose sur des pieux de bois enfoncés dans la tourbe ; le palais royal à lui seul en compte 13 659.|運河沿いの家は前へ傾き、破風から滑車用の梁が突き出ている。階段が急すぎて家具を運べず、荷は縄で窓から入れるためである。街全体が泥炭に打ち込んだ木杭の上にあり、王宮だけで13,659本が使われている。",
    [prop("Canal Warehouse|Almacén del canal|Entrepôt du canal|運河の倉庫", 300, 62),
     prop("Bicycle Ferry|Transbordador de bicicletas|Bac à vélos|自転車の渡し船", 260, 54)],
  ),
  reykjavik: city(
    "Reykjavík|Reikiavik|Reykjavik|レイキャヴィク",
    -21.94, 64.15, "eur", "peak_w", "tundra", "r",
    "A city plumbed straight into the ground|Una ciudad enchufada al subsuelo|Une ville branchée sur le sous-sol|地面に直結した街",
    "Nearly every radiator and tap in the city is fed by water pumped hot out of volcanic ground, so the air smells faintly of sulphur and some pavements melt their own snow. The first pipe was laid in 1930 to heat a school, and within a generation the coal smoke over the town had gone.|Casi todos los radiadores y grifos reciben agua bombeada caliente del suelo volcánico: por eso el aire huele levemente a azufre y algunas aceras derriten su propia nieve. La primera tubería se tendió en 1930 para calentar una escuela, y en una generación desapareció el humo de carbón.|Presque tous les radiateurs et robinets de la ville sont alimentés par une eau pompée brûlante dans le sol volcanique : l'air sent légèrement le soufre et certains trottoirs font fondre leur propre neige. La première conduite fut posée en 1930 pour chauffer une école, et en une génération la fumée de charbon avait disparu.|街の蛇口も暖房も、ほとんどが火山地帯から汲み上げた熱い水で賄われる。だから空気はかすかに硫黄の匂いがし、歩道の雪はひとりでに融ける。最初の配管は1930年に学校を暖めるために引かれ、一世代のうちに石炭の煙は消えた。",
    [prop("Geothermal Bathing Pool|Piscina geotérmica|Bassin géothermique|地熱の湯", 280, 58),
     prop("Fishing Quay|Muelle pesquero|Quai de pêche|漁港の岸壁", 260, 54)],
  ),
  stockholm: city(
    "Stockholm|Estocolmo|Stockholm|ストックホルム",
    18.07, 59.33, "eur", "ship_w", "harbour", "r",
    "A warship saved by a sea too fresh|Un buque salvado por un mar poco salado|Un navire sauvé par une mer trop douce|塩の薄い海に守られた軍艦",
    "The warship Vasa capsized 1,300 metres into her maiden voyage in 1628, too narrow and too tall for the guns she carried. She came up almost whole in 1961, because the Baltic is too brackish for the shipworm that eats timber in every other sea.|El buque de guerra Vasa zozobró a 1.300 metros de iniciar su viaje inaugural en 1628: demasiado estrecho y demasiado alto para los cañones que llevaba. Salió del agua casi entero en 1961 porque el Báltico es demasiado dulce para el teredo que devora la madera en los demás mares.|Le vaisseau Vasa chavira 1 300 mètres après le début de son voyage inaugural, en 1628 : trop étroit et trop haut pour les canons qu'il portait. On le remonta presque intact en 1961, la Baltique étant trop peu salée pour le taret qui dévore le bois partout ailleurs.|軍艦ヴァーサは1628年、処女航海のわずか1300m先で横倒しになった。積んだ砲に対し船体が細く、上が重すぎたのである。1961年にほぼ原形のまま引き揚げられたのは、バルト海の塩分が薄く、木を食う海虫が住めないからだ。",
    [prop("Archipelago Steamer|Vapor del archipiélago|Vapeur de l'archipel|群島めぐりの汽船", 300, 62),
     prop("Old Town Cellar Inn|Posada en sótano del casco viejo|Auberge en cave de la vieille ville|旧市街の地下宿", 270, 56)],
  ),
  prague: city(
    "Prague|Praga|Prague|プラハ",
    14.42, 50.09, "eur", "bridge_w", "oldworld", "l",
    "A clock that keeps four kinds of time|Un reloj con cuatro horas distintas|Une horloge à quatre temps|四つの時刻を刻む時計",
    "The astronomical clock has run since 1410 and shows four things at once: ordinary hours, Old Bohemian time counted from sunset, Babylonian hours that stretch and shrink with the season, and the sun and moon moving through the zodiac. It burned out in May 1945, and the twelve apostles that parade past the window were carved again from photographs.|El reloj astronómico funciona desde 1410 y muestra cuatro cosas a la vez: la hora corriente, la hora bohemia contada desde la puesta de sol, las horas babilónicas que se alargan y acortan con la estación, y el sol y la luna recorriendo el zodíaco. Ardió en mayo de 1945, y los doce apóstoles que desfilan por la ventana se tallaron de nuevo a partir de fotografías.|L'horloge astronomique tourne depuis 1410 et indique quatre choses à la fois : l'heure ordinaire, l'heure bohémienne comptée depuis le coucher du soleil, les heures babyloniennes qui s'allongent ou se raccourcissent selon la saison, et la course du soleil et de la lune dans le zodiaque. Elle brûla en mai 1945, et les douze apôtres qui défilent à la fenêtre furent resculptés d'après des photographies.|1410年から動く天文時計は、四つの時刻を同時に示す。ふつうの時、日没から数えるボヘミア時、季節で長さの伸び縮みするバビロニア時、そして黄道を巡る日と月である。1945年5月に焼け落ち、窓を通る十二使徒は写真をもとに彫り直された。",
    [prop("Bridge Toll House|Casa del peaje del puente|Maison du péage du pont|橋の料金所", 290, 60),
     prop("Beer Cellar|Cervecería subterránea|Cave à bière|地下のビヤホール", 280, 58)],
  ),
  vienna: city(
    "Vienna|Viena|Vienne|ウィーン",
    16.37, 48.21, "eur", "dome", "plaza", "r",
    "One coffee buys the whole afternoon|Un café compra toda la tarde|Un café vous paie l'après-midi|珈琲一杯で午後ぜんぶ",
    "A Viennese waiter brings a glass of water with the coffee and quietly refills it, the sign that you may stay as long as you like on one order, with the newspapers clamped to wooden rods. Austria's register of intangible heritage entered the coffee house in 2011 as a place where time and space are consumed but only the coffee appears on the bill.|El camarero vienés sirve un vaso de agua junto al café y lo va rellenando: es la señal de que puedes quedarte cuanto quieras con una sola consumición, con los periódicos sujetos a varillas de madera. El registro austriaco de patrimonio inmaterial lo inscribió en 2011 como un lugar donde se consumen tiempo y espacio, pero sólo el café aparece en la cuenta.|Le garçon viennois apporte un verre d'eau avec le café et le remplit sans qu'on demande : c'est le signe qu'on peut rester aussi longtemps qu'on veut pour une seule consommation, les journaux tendus sur des baguettes de bois. L'inventaire autrichien du patrimoine immatériel l'a inscrit en 2011 comme un lieu où l'on consomme le temps et l'espace, mais où seul le café figure sur l'addition.|ウィーンの給仕は珈琲に水を添え、空けば黙って注ぎ足す。一杯で何時間でも居てよいという合図で、新聞は木の棒に挟んで貸される。2011年、オーストリアの無形文化遺産目録はこの珈琲店を「時間と空間を消費するが、勘定に載るのは珈琲だけの場所」と記して登録した。",
    [prop("Coffee House Booth|Reservado de café|Banquette de café|珈琲店の座席", 300, 62),
     prop("Opera Box|Palco de la ópera|Loge d'opéra|歌劇場の桟敷", 340, 70)],
  ),
  moscow: city(
    "Moscow|Moscú|Moscou|モスクワ",
    37.62, 55.76, "eur", "dome", "oldworld", "r",
    "Palaces dug for the people|Palacios excavados para el pueblo|Des palais creusés pour le peuple|人民のために掘られた宮殿",
    "The metro was built from 1935 with chandeliers, mosaics and marble, on the argument that ordinary people should have palaces of their own. On 6 November 1941, with German guns within range, the government held its anniversary meeting on the platform at Mayakovskaya, 33 metres down.|El metro se construyó desde 1935 con lámparas de araña, mosaicos y mármol, con el argumento de que la gente corriente debía tener sus propios palacios. El 6 de noviembre de 1941, con la artillería alemana a tiro, el gobierno celebró su sesión de aniversario en el andén de Mayakóvskaya, a 33 metros de profundidad.|Le métro fut bâti à partir de 1935 avec lustres, mosaïques et marbre, au motif que les gens ordinaires devaient avoir leurs palais. Le 6 novembre 1941, les canons allemands étant à portée, le gouvernement tint sa séance anniversaire sur le quai de Maïakovskaïa, à 33 mètres sous terre.|1935年から造られた地下鉄には、庶民にも宮殿を、という理屈でシャンデリアとモザイクと大理石が入れられた。1941年11月6日、ドイツ軍の砲が届く距離まで迫るなか、政府は地下33mのマヤコフスカヤ駅のホームで革命記念日の会議を開いた。",
    [prop("Metro Palace Vestibule|Vestíbulo palaciego del metro|Vestibule-palais du métro|地下鉄の宮殿口", 320, 66),
     prop("Riverside Bathhouse|Casa de baños del río|Bains au bord du fleuve|川辺の浴場", 280, 58)],
  ),
  lisbon: city(
    "Lisbon|Lisboa|Lisbonne|リスボン",
    -9.14, 38.72, "eur", "ship_w", "harbour", "l",
    "Rebuilt to be shaken|Reconstruida para temblar|Rebâtie pour trembler|揺れる前提で建て直した街",
    "On All Saints' Day 1755 an earthquake, a wave and a fire destroyed the centre within hours. Pombal rebuilt it on a grid with timber cages inside the walls to absorb the shaking — a model was tested by marching troops around it — which makes these among the first buildings in Europe designed against earthquakes.|El día de Todos los Santos de 1755, un terremoto, una ola y un incendio destruyeron el centro en unas horas. Pombal lo rehízo en cuadrícula, con jaulas de madera dentro de los muros para encajar el temblor —se probó un modelo haciendo marchar tropas a su alrededor—, de los primeros edificios antisísmicos de Europa.|Le jour de la Toussaint 1755, un séisme, une vague et un incendie détruisirent le centre en quelques heures. Pombal le rebâtit en damier, avec des cages de bois dans les murs pour encaisser les secousses — on testa une maquette en faisant marcher la troupe autour —, parmi les premiers bâtiments parasismiques d'Europe.|1755年の万聖節、地震と津波と火災が数時間で中心部を消した。ポンバルは街を格子状に建て直し、壁の中に木の籠を組んで揺れを受け止めさせた。模型のまわりを兵に行進させて試したという。ヨーロッパで最初期の耐震建築である。",
    [prop("Tram Line Franchise|Concesión del tranvía|Concession du tramway|市電の営業権", 300, 62),
     prop("Fado House|Casa de fado|Maison de fado|ファドの店", 270, 56)],
  ),
  barcelona: city(
    "Barcelona|Barcelona|Barcelone|バルセロナ",
    2.17, 41.39, "eur", "cathedral_w", "plaza", "l",
    "A church that waited 137 years for its permit|Una iglesia que esperó 137 años el permiso|Une église qui attendit 137 ans son permis|百三十七年待って許可が下りた教会",
    "The Sagrada Família has been going up since 1882 and only received a building permit in 2019, from the same city hall that had mislaid the first application. Gaudí worked out its arches by hanging strings and small weights upside down and reading the shape in a mirror.|La Sagrada Família se levanta desde 1882 y sólo obtuvo licencia de obras en 2019, del mismo ayuntamiento que había traspapelado la primera solicitud. Gaudí calculaba sus arcos colgando cuerdas y pesas del revés y leyendo la forma en un espejo.|La Sagrada Família s'élève depuis 1882 et n'a obtenu son permis de construire qu'en 2019, de la même mairie qui avait égaré la première demande. Gaudí calculait ses arcs en suspendant des ficelles et de petits poids à l'envers, et en lisant la forme dans un miroir.|サグラダ・ファミリアは1882年から建て続けられ、建築許可が下りたのは2019年である。最初の申請書を紛れさせたのと同じ市役所が出した。ガウディは紐と錘を逆さに吊るし、鏡に映して迫り上がりの形を割り出した。",
    [prop("Modernista Apartment|Piso modernista|Appartement moderniste|モデルニスモの集合住宅", 320, 66),
     prop("Boqueria Market Stall|Puesto de la Boquería|Étal de la Boqueria|ボケリア市場の店", 290, 60)],
  ),
  rome: city(
    "Rome|Roma|Rome|ローマ",
    12.50, 41.90, "eur", "dome", "ruins", "r",
    "A dome cast in one piece, never beaten|Una cúpula de una pieza, jamás superada|Une coupole d'un seul tenant, jamais dépassée|一枚に打った丸屋根、いまだ破られず",
    "The Pantheon's concrete dome, poured around AD 126, is still the largest unreinforced concrete dome in the world; the builders lightened the mix as they rose and finished the crown in pumice. Rain falls straight through the nine-metre opening at the top, and twenty-two holes in the floor take it away.|La cúpula de hormigón del Panteón, vertida hacia el año 126, sigue siendo la mayor sin armar del mundo: los constructores aligeraron la mezcla a medida que subían y remataron con piedra pómez. La lluvia entra por el óculo de nueve metros y se va por veintidós desagües abiertos en el suelo.|La coupole de béton du Panthéon, coulée vers 126, reste la plus grande coupole non armée au monde : les bâtisseurs allégeaient le mélange en montant et achevèrent le sommet en pierre ponce. La pluie tombe par l'oculus de neuf mètres et s'évacue par vingt-deux trous percés dans le sol.|126年頃に打たれたパンテオンのコンクリートの丸屋根は、今も鉄筋を使わない丸屋根として世界最大である。上へ行くほど軽い骨材に替え、頂は軽石で仕上げてある。直径9mの穴から雨がそのまま落ち、床に開いた22の穴が水を抜く。",
    [prop("Trattoria in Trastevere|Trattoria del Trastevere|Trattoria du Trastevere|トラステヴェレの食堂", 300, 62),
     prop("Fountain Square Kiosk|Quiosco de la fuente|Kiosque de la fontaine|噴水広場の売店", 280, 58)],
  ),
  athens: city(
    "Athens|Atenas|Athènes|アテネ",
    23.73, 37.98, "eur", "statue", "ruins", "r",
    "Straight lines that are not straight|Líneas rectas que no lo son|Des lignes droites qui ne le sont pas|まっすぐでない直線",
    "The Parthenon has almost no straight line in it: the columns swell at the middle and lean inward, and the platform rises about eleven centimetres at the centre, all so the building looks straight from below. It survived as a church and then a mosque until 1687, when a Venetian shell found the gunpowder stored inside.|El Partenón casi no tiene una línea recta: las columnas se ensanchan por el medio y se inclinan hacia dentro, y la plataforma sube unos once centímetros en el centro, todo para que el edificio parezca recto desde abajo. Fue iglesia y luego mezquita hasta 1687, cuando una bomba veneciana alcanzó la pólvora guardada dentro.|Le Parthénon n'a presque aucune ligne droite : les colonnes se renflent au milieu et penchent vers l'intérieur, et le socle se bombe d'environ onze centimètres au centre, pour que l'édifice paraisse droit vu d'en bas. Il fut église puis mosquée jusqu'en 1687, quand un obus vénitien atteignit la poudre entreposée à l'intérieur.|パルテノンには直線がほとんど無い。柱は中ほどが膨らんで内へ傾き、基壇は中央が11cmほど盛り上がる。下から見て真っ直ぐに見えるようにするためである。教会となりモスクとなって残ったが、1687年、内部に置かれた火薬にヴェネツィアの砲弾が当たった。",
    [prop("Plaka Taverna|Taberna de Plaka|Taverne de Plaka|プラカの居酒屋", 290, 60),
     prop("Marble Quarry Share|Parte en la cantera de mármol|Part de carrière de marbre|大理石の石切場の株", 300, 62)],
  ),
  istanbul: city(
    "Istanbul|Estambul|Istanbul|イスタンブール",
    28.98, 41.01, "eur", "mosque", "oldworld", "b",
    "Two currents in one strait|Dos corrientes en un estrecho|Deux courants dans un seul détroit|ひとつの海峡に二つの流れ",
    "Two currents run through the Bosphorus at the same time: fresher water sliding south out of the Black Sea, and a colder, saltier one pushing north beneath it. Boatmen are said to have lowered weighted baskets into the lower current so that it would tow them upstream while the surface carried everyone else the other way.|Por el Bósforo corren dos corrientes a la vez: agua menos salada que baja del mar Negro y otra más fría y salada que sube por debajo. Se cuenta que los barqueros dejaban caer cestas lastradas hasta la corriente inferior para que los remolcara aguas arriba mientras la superficie llevaba a los demás en sentido contrario.|Deux courants traversent le Bosphore en même temps : une eau moins salée qui descend de la mer Noire, et une autre, plus froide et plus salée, qui remonte en dessous. Les bateliers, dit-on, laissaient filer des paniers lestés jusqu'au courant inférieur pour se faire haler vers l'amont pendant que la surface emportait les autres en sens inverse.|ボスポラス海峡には二つの流れが同時にある。黒海から下る塩の薄い表層流と、その下を北へ押し上げる冷たく塩の濃い底層流である。舟人は重しをつけた籠を底層まで下ろし、表層が皆を逆へ運ぶあいだ、自分だけ上流へ曳かせたという。",
    [prop("Spice Bazaar Stall|Puesto del bazar de las especias|Étal du bazar aux épices|香辛料市場の店", 320, 66),
     prop("Bosphorus Ferry Berth|Atracadero del Bósforo|Embarcadère du Bosphore|海峡の連絡船着場", 300, 62)],
  ),

  // ---------------------------------------------------------------------
  // asi — アジア
  // ---------------------------------------------------------------------
  isfahan: city(
    "Isfahan|Isfahán|Ispahan|イスファハン",
    51.68, 32.65, "asi", "mosque", "desert", "l",
    "A square laid out for polo|Una plaza trazada para el polo|Une place tracée pour le polo|ポロのために取られた広場",
    "The great square of 1602 measures 160 metres by 510, set out so that the shah could watch polo from his balcony; the stone goalposts still stand at either end. A saying of the time called the city half the world, when it held perhaps half a million people and 160 mosques.|La gran plaza de 1602 mide 160 por 510 metros, trazada para que el sah viera el polo desde su balcón; las porterías de piedra siguen en pie en ambos extremos. Un dicho de la época llamaba a la ciudad «la mitad del mundo», cuando reunía quizá medio millón de habitantes y 160 mezquitas.|La grande place de 1602 mesure 160 mètres sur 510, tracée pour que le chah suive le polo depuis son balcon ; les poteaux de pierre sont toujours en place aux deux bouts. Un dicton de l'époque appelait la ville « la moitié du monde », quand elle comptait peut-être un demi-million d'habitants et 160 mosquées.|1602年に開かれた大広場は160m×510m、王が露台からポロを眺められるように取られたもので、石のゴール柱は今も両端に立っている。「イスファハンは世界の半分」という当時の言い回しは、人口およそ50万、モスク160を数えた頃のものである。",
    [prop("Bridge of Thirty-Three Arches|Puente de las Treinta y Tres Arcadas|Pont aux trente-trois arches|三十三橋", 310, 64),
     prop("Coppersmith's Bazaar|Bazar de los caldereros|Bazar des chaudronniers|銅細工の市場", 280, 58)],
  ),
  dubai: city(
    "Dubai|Dubái|Dubaï|ドバイ",
    55.27, 25.20, "asi", "skyline", "desert", "r",
    "A skyline built on trade, not oil|Un perfil levantado por el comercio, no por el petróleo|Une skyline bâtie sur le négoce, pas sur le pétrole|石油ではなく商いが建てた摩天楼",
    "In 1960 the town had not one paved road and its harbour was a creek silting up; the emirate borrowed more than it could comfortably repay to dredge it, and used the spoil to make new land. Oil now accounts for only about one per cent of Dubai's income — the money comes from moving other people's goods.|En 1960 la ciudad no tenía una sola calle asfaltada y su puerto era un brazo de mar cegado por la arena; el emirato pidió prestado más de lo que podía devolver con holgura para dragarlo, y con el fango ganó terreno. Hoy el petróleo aporta apenas un uno por ciento de los ingresos de Dubái: el dinero viene de mover mercancías ajenas.|En 1960, la ville n'avait pas une rue goudronnée et son port n'était qu'une crique qui s'envasait ; l'émirat emprunta plus qu'il ne pouvait aisément rembourser pour la draguer, et se servit des déblais pour gagner de la terre. Le pétrole ne représente plus qu'environ un pour cent des revenus de Dubaï : l'argent vient du transit des marchandises des autres.|1960年のドバイに舗装道路は一本もなく、港は砂で埋まりかけた入り江だった。首長国は楽には返せない額を借りて水路を浚い、浚渫土で土地を広げた。いま石油が収入に占める割合はおよそ1%で、稼ぎは他人の荷を動かすことから出ている。",
    [prop("Creek Dhow Wharf|Muelle de dhows del creek|Quai à boutres du creek|入り江のダウ船着場", 300, 62),
     prop("Gold Souk Counter|Puesto del zoco del oro|Comptoir du souk de l'or|金市場の店", 340, 70)],
  ),
  samarkand: city(
    "Samarkand|Samarcanda|Samarcande|サマルカンド",
    66.98, 39.65, "asi", "mosque", "desert", "r",
    "A ruler who measured the year|Un soberano que midió el año|Un souverain qui mesura l'année|一年の長さを測った王",
    "Ulugh Beg, a prince who preferred astronomy to governing, sank a sextant of about 40 metres' radius into a trench here in the 1420s and measured the length of the year to within 25 seconds of the modern figure. His catalogue of 1,018 stars remained the most accurate in the world until Tycho Brahe, a century and a half later.|Ulug Beg, un príncipe que prefería la astronomía al gobierno, hundió aquí en los años 1420 un sextante de unos 40 metros de radio en una zanja y midió la duración del año con un error de 25 segundos respecto al valor actual. Su catálogo de 1.018 estrellas fue el más exacto del mundo hasta Tycho Brahe, siglo y medio después.|Ulugh Beg, un prince qui préférait l'astronomie au gouvernement, fit creuser ici dans les années 1420 une tranchée pour un sextant de quelque 40 mètres de rayon, et mesura la durée de l'année à 25 secondes près de la valeur actuelle. Son catalogue de 1 018 étoiles resta le plus exact du monde jusqu'à Tycho Brahe, un siècle et demi plus tard.|統治より天文を好んだ王ウルグ・ベクは1420年代、半径約40mの六分儀を溝に据えて一年の長さを測った。現在の値との差は25秒に収まる。彼の1018星の星表は、一世紀半後のティコ・ブラーエまで世界で最も正確なものであり続けた。",
    [prop("Silk Caravanserai|Caravasar de la seda|Caravansérail de la soie|絹の隊商宿", 300, 62),
     prop("Tilework Kiln|Horno de azulejos|Four à carreaux de faïence|タイルの窯", 270, 56)],
  ),
  delhi: city(
    "Delhi|Delhi|Delhi|デリー",
    77.21, 28.61, "asi", "dome", "oldworld", "r",
    "An iron pillar that will not rust|Un pilar de hierro que no se oxida|Un pilier de fer qui ne rouille pas|錆びない鉄の柱",
    "A wrought-iron pillar 7.2 metres tall has stood in the open since about AD 400 with hardly a trace of rust, because the iron holds enough phosphorus to grow a thin protective skin in Delhi's dry air. The city is really at least seven cities, each built beside the last rather than on top of it.|Un pilar de hierro forjado de 7,2 metros lleva a la intemperie desde hacia el año 400 casi sin herrumbre, porque su hierro contiene fósforo suficiente para formar una fina película protectora en el aire seco de Delhi. La ciudad son en realidad al menos siete ciudades, cada una construida junto a la anterior y no encima.|Un pilier de fer forgé de 7,2 mètres se dresse en plein air depuis l'an 400 environ sans presque rouiller : son fer contient assez de phosphore pour former une mince pellicule protectrice dans l'air sec de Delhi. La ville est en réalité au moins sept villes, chacune bâtie à côté de la précédente et non par-dessus.|高さ7.2mの錬鉄の柱が西暦400年頃から野ざらしのまま、ほとんど錆びずに立っている。鉄に含まれるリンが、デリーの乾いた空気の中で薄い保護膜を作るためである。デリーは実のところ少なくとも七つの都市で、どれも前の都の上ではなく隣に築かれた。",
    [prop("Chandni Chowk Shopfront|Local en Chandni Chowk|Boutique de Chandni Chowk|チャンドニー・チョウクの店", 300, 62),
     prop("Stepwell Courtyard|Patio del pozo escalonado|Cour du puits à degrés|階段井戸の庭", 280, 58)],
  ),
  veracruz: city(
    "Veracruz|Veracruz|Veracruz|ベラクルス",
    -96.13, 19.17, "nam", "ship_w", "harbour", "l",
    "The one gate Spain allowed to the Americas|La única puerta que España abrió a América|La seule porte que l'Espagne ouvrit aux Amériques|スペインが新大陸に許した唯一の門",
    "For most of three centuries this was the only harbour through which Spain permitted trade with its American colonies, so every shipment of silver and every imported book passed across this quay. Couples still dance the danzón in the main square on ordinary weekday evenings.|Durante casi tres siglos fue el único puerto por el que España permitió comerciar con sus colonias americanas: toda la plata y todo libro importado pasaron por este muelle. Aún se baila danzón en la plaza entre semana.|Trois siècles durant ou presque, ce fut le seul port par lequel l'Espagne autorisa le commerce avec ses colonies : tout l'argent et tout livre importé passèrent par ce quai. On y danse encore le danzón sur la grand-place en semaine.|三世紀近くのあいだ、スペインが新大陸の植民地との交易を許した港はここだけだった。銀の積荷も輸入された書物も、すべてこの岸壁を通った。いまも平日の夕方、広場では男女がダンソンを踊っている。",
    [prop("Silver Customs House|Aduana de la plata|Douane de l'argent|銀の税関", 300, 62),
     prop("Danzón Bandstand|Quiosco del danzón|Kiosque du danzón|ダンソンの野外舞台", 260, 54)],
  ),
  bandarabbas: city(
    "Bandar Abbas|Bandar Abbás|Bandar Abbas|バンダレ・アッバース",
    56.31, 27.23, "asi", "ship_w", "harbour", "r",
    "A port a shah took back and named after himself|Un puerto que un sah recuperó y bautizó con su nombre|Un port qu'un chah reprit et nomma de son nom|王が奪い返し、自らの名を付けた港",
    "Shah Abbas drove the Portuguese out of this harbour in 1622, with English ships helping, and gave the place his own name. The strait outside is barely 40 km across at its narrowest, and roughly a fifth of the world's seaborne oil still passes through it.|El sah Abbás expulsó a los portugueses de este puerto en 1622, con ayuda de naves inglesas, y le dio su propio nombre. El estrecho de enfrente apenas mide 40 km en su punto más angosto.|Le chah Abbas chassa les Portugais de ce port en 1622, avec l'aide de navires anglais, et lui donna son propre nom. Le détroit au large fait à peine 40 km au plus étroit.|1622年、シャー・アッバースは英国船の助けを借りてポルトガル人をこの港から追い出し、自らの名を土地に与えた。沖の海峡は最も狭いところで40kmしかなく、いまも世界の海上輸送される石油のおよそ五分の一がここを通る。",
    [prop("Wind-Tower House|Casa de torre de viento|Maison à tour à vent|バードギールの家", 280, 58),
     prop("Strait Pilot Boat|Barca del práctico|Vedette du pilote|海峡の水先船", 300, 62)],
  ),
  mombasa: city(
    "Mombasa|Mombasa|Mombasa|モンバサ",
    39.67, -4.05, "afr", "ship_w", "harbour", "r",
    "A fort that changed hands nine times|Un fuerte que cambió de manos nueve veces|Un fort qui changea neuf fois de mains|九度も主が変わった砦",
    "Fort Jesus was built by the Portuguese in 1593 and then taken and retaken nine times in two centuries by Omani, Portuguese and British forces. The old harbour below it still fills with dhows that ride the monsoon down from Arabia and wait months for the wind to turn.|El fuerte Jesús lo alzaron los portugueses en 1593 y cambió de manos nueve veces en dos siglos entre omaníes, portugueses y británicos. En el puerto viejo aún fondean dhows que bajan con el monzón desde Arabia.|Le fort Jésus fut bâti par les Portugais en 1593 puis pris et repris neuf fois en deux siècles par Omanais, Portugais et Britanniques. Le vieux port accueille encore les boutres qui descendent d'Arabie avec la mousson.|フォート・ジーザスは1593年にポルトガル人が築き、二世紀のあいだにオマーン・ポルトガル・英国のあいだで九度も主が変わった。下の旧港にはいまも、季節風に乗ってアラビアから下ってくるダウ船が入り、風の向きが変わるまで何か月も待つ。",
    [prop("Old Harbour Dhow|Dhow del puerto viejo|Boutre du vieux port|旧港のダウ船", 300, 62),
     prop("Coral Stone Fort|Fuerte de piedra coralina|Fort en pierre de corail|珊瑚石の砦", 280, 58)],
  ),
  belem: city(
    "Belém|Belém|Belém|ベレン",
    -48.50, -1.46, "sam", "palm_w", "tropics", "l",
    "A city roofed by mango trees|Una ciudad techada de mangos|Une ville couverte de manguiers|マンゴーの木が屋根になる街",
    "Thousands of mango trees were planted along the streets a century ago and now meet overhead, shading the pavements through the equatorial heat. The river mouth beside the city holds Marajó, an island larger than Switzerland, where water buffalo outnumber people.|Hace un siglo se plantaron miles de mangos en las calles y hoy se juntan arriba, dando sombra bajo el calor ecuatorial. En la boca del río está Marajó, isla mayor que Suiza, con más búfalos que personas.|On planta il y a un siècle des milliers de manguiers dans les rues ; leurs cimes se rejoignent aujourd'hui et ombragent les trottoirs sous la chaleur équatoriale. À l'embouchure s'étend Marajó, île plus grande que la Suisse.|一世紀前に街路へ植えられた何千本ものマンゴーの木は、いまでは頭上で枝を交わし、赤道の暑さの中で歩道に日陰を作る。街の脇の河口には、スイスより大きいマラジョー島があり、人より水牛のほうが多い。",
    [prop("Ver-o-Peso Market|Mercado Ver-o-Peso|Marché Ver-o-Peso|ヴェル・オ・ペーゾ市場", 300, 62),
     prop("River Boat Quay|Muelle fluvial|Quai fluvial|川舟の桟橋", 260, 54)],
  ),
  kolkata: city(
    "Kolkata|Calcuta|Calcutta|コルカタ",
    88.36, 22.57, "asi", "bridge_w", "megacity_asia", "r",
    "A bridge put together without bolts|Un puente armado sin pernos|Un pont assemblé sans boulons|ボルトを使わずに組んだ橋",
    "The Howrah bridge was riveted together in 1943 without a single nut or bolt, and it still carries more people on foot than any bridge in the world. Because the river below it is tidal, the whole span rises and falls a few centimetres twice a day.|El puente de Howrah se remachó en 1943 sin una sola tuerca ni perno, y aún cruza a pie más gente que ningún otro puente del mundo. Como el río es de marea, todo el tramo sube y baja unos centímetros dos veces al día.|Le pont de Howrah fut riveté en 1943 sans un seul écrou ni boulon, et il porte encore plus de piétons que tout autre pont au monde. Le fleuve étant soumis aux marées, l'ouvrage entier monte et descend de quelques centimètres deux fois par jour.|ハウラー橋は1943年、ナットもボルトも一本使わずリベットだけで組み上げられた。いまも徒歩で渡る人の数が世界のどの橋より多い。下を流れる川は潮の差す川なので、橋全体が日に二度、数センチ上下する。",
    [prop("Riveted Bridge Toll|Peaje del puente|Péage du pont|橋のたもとの店", 320, 66),
     prop("Tram Depot|Cochera de tranvías|Dépôt de tramways|路面電車の車庫", 280, 58)],
  ),
  mumbai: city(
    "Mumbai|Bombay|Bombay|ムンバイ",
    72.88, 19.08, "asi", "skyline", "megacity_asia", "l",
    "Seven islands sewn into one|Siete islas cosidas en una|Sept îles cousues en une seule|七つの島を縫い合わせた土地",
    "The city began as seven islands with tidal marsh between them; filling the gaps took from 1782 to about 1845, and the whole southern district stands on that made ground. The islands had reached England in 1661 as part of a Portuguese princess's dowry, and were leased on to the East India Company for ten pounds a year.|La ciudad empezó como siete islas separadas por marismas; rellenar los huecos llevó de 1782 a 1845, y todo el distrito sur se levanta sobre ese terreno ganado. Las islas habían llegado a Inglaterra en 1661 como parte de la dote de una princesa portuguesa, y se arrendaron a la Compañía de las Indias por diez libras al año.|La ville naquit de sept îles séparées par des marais de marée ; combler les intervalles prit de 1782 à 1845 environ, et tout le sud repose sur ce terrain gagné. Les îles étaient passées à l'Angleterre en 1661 dans la dot d'une princesse portugaise, puis relouées à la Compagnie des Indes pour dix livres par an.|この街は潮の湿地を挟んだ七つの島から始まった。埋め立ては1782年から1845年頃まで続き、南部の市街はまるごとその造成地の上にある。島々は1661年、ポルトガル王女の持参金としてイングランドへ渡り、年10ポンドで東インド会社に又貸しされた。",
    [prop("Dhobi Ghat Washing Line|Tendedero del Dhobi Ghat|Étendage du Dhobi Ghat|洗濯場の物干し", 270, 56),
     prop("Victorian Railway Terminus|Estación victoriana|Gare victorienne|ヴィクトリア様式の終着駅", 340, 70)],
  ),
  ulaanbaatar: city(
    "Ulaanbaatar|Ulán Bator|Oulan-Bator|ウランバートル",
    106.92, 47.92, "asi", "totem", "tundra", "l",
    "A capital that moved twenty-eight times|Una capital que se mudó veintiocho veces|Une capitale qui déménagea vingt-huit fois|二十八回引っ越した首都",
    "The city began as a monastery of felt tents that was packed up and moved twenty-eight times before it settled on this bend of the river in 1778. It is the coldest capital on earth, averaging about minus one degree over the year, and the coal burned in ger stoves gives it some of the worst winter air anywhere.|La ciudad nació como un monasterio de tiendas de fieltro que se desmontó y trasladó veintiocho veces antes de asentarse en este meandro en 1778. Es la capital más fría del planeta, con una media anual de un grado bajo cero, y el carbón quemado en las estufas de las gers le da en invierno uno de los peores aires del mundo.|La ville naquit comme un monastère de tentes de feutre, démonté et déplacé vingt-huit fois avant de se fixer sur ce coude de rivière en 1778. C'est la capitale la plus froide du monde, avec une moyenne annuelle d'environ moins un degré, et le charbon brûlé dans les poêles des gers lui vaut en hiver l'un des airs les plus mauvais qui soient.|この街はフェルトの天幕でできた僧院として始まり、1778年にこの川の湾曲部へ落ち着くまで二十八回たたんでは移った。年平均気温はおよそマイナス1度、世界でいちばん寒い首都であり、ゲルの炉で焚かれる石炭のせいで冬の空気は世界最悪の部類に入る。",
    [prop("Ger District Coal Yard|Carbonera del barrio de gers|Dépôt de charbon du quartier des gers|ゲル地区の炭置き場", 250, 52),
     prop("Cashmere Workshop|Taller de cachemira|Atelier de cachemire|カシミヤの工房", 290, 60)],
  ),
  bangkok: city(
    "Bangkok|Bangkok|Bangkok|バンコク",
    100.50, 13.75, "asi", "pagoda", "tropics", "l",
    "The longest name of any city|El nombre de ciudad más largo|Le plus long nom de ville|世界でいちばん長い都市名",
    "Its full ceremonial name runs to 168 letters and is recognised as the longest place name in the world; the people who live there use the first two words, Krung Thep. The city was built on canals and moved by boat until the 1900s, when most of them were filled in for roads, and the ground still settles about a centimetre a year.|Su nombre ceremonial completo tiene 168 letras y está reconocido como el topónimo más largo del mundo; quienes viven allí usan sus dos primeras palabras, Krung Thep. La ciudad se construyó sobre canales y se movía en barca hasta que hacia 1900 se rellenaron casi todos para hacer calles; el suelo sigue hundiéndose alrededor de un centímetro al año.|Son nom cérémoniel complet compte 168 lettres et passe pour le plus long toponyme du monde ; ses habitants n'en disent que les deux premiers mots, Krung Thep. La ville fut bâtie sur des canaux et se déplaçait en barque jusqu'aux années 1900, quand on les combla pour faire des rues ; le sol continue de s'affaisser d'environ un centimètre par an.|正式な儀礼名は168文字あり、世界一長い地名とされる。住む人は最初の二語をとってクルンテープと呼ぶ。街は運河の上に築かれ、1900年代まで舟で動いていたが、その多くが道路のために埋められた。地盤は今も年に1cmほど沈み続けている。",
    [prop("Floating Market Boat|Barca del mercado flotante|Barque du marché flottant|水上市場の舟", 280, 58),
     prop("Riverside Temple Landing|Embarcadero del templo|Débarcadère du temple|寺の船着場", 300, 62)],
  ),
  hanoi: city(
    "Hanoi|Hanói|Hanoï|ハノイ",
    105.83, 21.03, "asi", "pagoda", "tropics", "r",
    "Thirty-six streets, one trade each|Treinta y seis calles, un oficio cada una|Trente-six rues, un métier chacune|三十六の通り、それぞれの商い",
    "The old quarter is laid out as thirty-six streets, each named for the craft once worked there — Hàng Bạc for silver, Hàng Mã for paper offerings — and a good many still sell the same thing. The houses are two or three metres wide and run thirty metres back, because tax was charged on the width of the shopfront.|El casco viejo se ordena en treinta y seis calles, cada una con el nombre del oficio que allí se ejercía —Hàng Bạc, la plata; Hàng Mã, las ofrendas de papel— y bastantes siguen vendiendo lo mismo. Las casas miden dos o tres metros de ancho y treinta de fondo, porque el impuesto se cobraba por la anchura de la fachada.|Le vieux quartier compte trente-six rues, chacune portant le nom du métier qu'on y exerçait — Hàng Bạc pour l'argent, Hàng Mã pour les offrandes de papier — et bon nombre vendent encore la même chose. Les maisons ont deux ou trois mètres de large pour trente de profondeur, l'impôt étant assis sur la largeur de la devanture.|旧市街は三十六の通りに分かれ、それぞれかつての商いの名がついている。ハンバックは銀、ハンマーは紙の供物といった具合で、今も同じ物を売る通りが少なくない。家は間口2〜3m、奥行き30mと細長い。税が間口の幅で決まったからである。",
    [prop("Silver Street Workshop|Taller de la calle de la plata|Atelier de la rue de l'argent|銀の通りの工房", 280, 58),
     prop("Lakeside Tea Stall|Puesto de té junto al lago|Échoppe de thé au bord du lac|湖畔の茶店", 250, 52)],
  ),
  singapore: city(
    "Singapore|Singapur|Singapour|シンガポール",
    103.82, 1.35, "asi", "palm_w", "tropics", "r",
    "A country that collects its own rain|Un país que recoge su propia lluvia|Un pays qui recueille sa propre pluie|自国の雨をすべてためる国",
    "Two-thirds of the island is catchment: rain runs off roofs and roads straight into reservoirs, and the shortfall is recycled or taken from the sea, the recycled water being sold under the name NEWater. About a quarter of the country is reclaimed land, and the sand for it came from neighbours who in the end stopped selling.|Dos tercios de la isla son cuenca de captación: la lluvia corre de tejados y calzadas a los embalses, y lo que falta se recicla o se saca del mar; el agua reciclada se vende con el nombre de NEWater. Cerca de un cuarto del país es terreno ganado, y la arena vino de vecinos que acabaron por dejar de vendérsela.|Deux tiers de l'île servent de bassin versant : la pluie ruisselle des toits et des chaussées vers les réservoirs, et le reste est recyclé ou pris à la mer, l'eau recyclée étant vendue sous le nom de NEWater. Environ un quart du pays est gagné sur l'eau, avec du sable acheté à des voisins qui ont fini par cesser d'en vendre.|島の三分の二が集水域で、屋根と路面を流れた雨がそのまま貯水池へ入る。足りない分は再生水と海水で賄い、再生水はNEWaterの名で売られる。国土のおよそ四分の一は埋立地で、その砂を売っていた近隣国は、やがて売るのをやめた。",
    [prop("Container Terminal Berth|Atracadero de contenedores|Poste à conteneurs|コンテナ埠頭", 360, 74),
     prop("Hawker Centre Stall|Puesto del hawker centre|Étal de hawker centre|屋台街の一軒", 280, 58)],
  ),
  jakarta: city(
    "Jakarta|Yakarta|Jakarta|ジャカルタ",
    106.85, -6.21, "asi", "mosque", "megacity_asia", "r",
    "A capital moving out from under the water|Una capital que se muda del agua|Une capitale qui déménage hors de l'eau|水の下から引っ越す首都",
    "North Jakarta is going down by as much as 25 centimetres a year, faster than anywhere else in the world, because households pump their own groundwater where the mains do not reach. In 2019 the government decided to build a new capital on Borneo and begin moving the ministries there.|El norte de Yakarta se hunde hasta 25 centímetros al año, más deprisa que ningún otro lugar del mundo, porque los vecinos bombean agua del subsuelo donde no llega la red. En 2019 el gobierno decidió construir una capital nueva en Borneo y empezar a trasladar allí los ministerios.|Le nord de Jakarta s'enfonce jusqu'à 25 centimètres par an, plus vite que partout ailleurs dans le monde, parce que les habitants pompent eux-mêmes la nappe là où le réseau n'arrive pas. En 2019, le gouvernement a décidé de bâtir une capitale neuve à Bornéo et d'y transférer peu à peu les ministères.|ジャカルタ北部は年に最大25cm沈んでおり、その速さは世界一である。水道の来ない地区で各戸が地下水を汲み上げるためだ。2019年、政府はボルネオ島に新首都を建て、省庁を移していくことを決めた。",
    [prop("Kota Warehouse|Almacén de Kota|Entrepôt de Kota|コタ地区の倉庫", 280, 58),
     prop("Becak Stand|Parada de becaks|Station de becak|輪タクの待機所", 250, 52)],
  ),
  hongkong: city(
    "Hong Kong|Hong Kong|Hong Kong|香港",
    114.17, 22.32, "asi", "skyline", "harbour", "r",
    "Towers on a quarter of the land|Torres en un cuarto del territorio|Des tours sur un quart du territoire|土地の四分の一に立つ塔",
    "Hong Kong has more buildings over 150 metres than anywhere else on earth, and yet three quarters of its land is country park and hillside that cannot be built on. The open-air escalator up the Mid-Levels climbs 800 metres and reverses at ten in the morning: downhill for the commute, uphill for the rest of the day.|Hong Kong tiene más edificios de más de 150 metros que ninguna otra ciudad del mundo y, aun así, tres cuartas partes de su suelo son parques rurales y laderas donde no se puede construir. La escalera mecánica al aire libre de Mid-Levels sube 800 metros y cambia de sentido a las diez de la mañana: baja para ir al trabajo, sube el resto del día.|Hong Kong compte plus d'immeubles de plus de 150 mètres que n'importe où au monde, et pourtant les trois quarts de son territoire sont des parcs et des versants inconstructibles. L'escalator à ciel ouvert des Mid-Levels grimpe 800 mètres et s'inverse à dix heures du matin : il descend pour aller travailler, il monte le reste de la journée.|高さ150mを超える建物の数は世界のどの都市より多い。それでいて土地の四分の三は郊野公園と斜面で、建てることができない。ミッドレベルズの屋外エスカレーターは全長800m、朝十時に向きが変わる。通勤の時間は下り、あとは一日じゅう上りである。",
    [prop("Harbourfront Godown|Almacén del puerto|Entrepôt du front de mer|埠頭の倉庫", 340, 70),
     prop("Tram Deck Advertisement|Anuncio en el tranvía|Réclame sur le tramway|二階電車の広告枠", 290, 60)],
  ),
  beijing: city(
    "Beijing|Pekín|Pékin|北京",
    116.41, 39.90, "asi", "pagoda", "oldworld", "l",
    "A line drawn through the whole city|Una línea trazada por toda la ciudad|Une ligne tirée à travers toute la ville|街をまっすぐ貫く一本の線",
    "The old city is arranged along a single north-south axis 7.8 kilometres long, with every important gate and hall set upon it; the 2008 Olympic park was placed on the same line, extended northward. Its great halls are floored with \"golden bricks\", fired for more than a hundred days and then soaked in oil, which ring like metal underfoot.|La ciudad vieja se ordena sobre un único eje norte-sur de 7,8 kilómetros, con todas las puertas y salas importantes alineadas en él; el parque olímpico de 2008 se situó sobre esa misma línea, prolongada hacia el norte. Sus grandes salas están enlosadas con «ladrillos dorados», cocidos más de cien días y luego empapados en aceite, que suenan a metal bajo los pies.|La vieille ville s'ordonne sur un unique axe nord-sud de 7,8 kilomètres, où sont alignées toutes les portes et toutes les salles importantes ; le parc olympique de 2008 fut posé sur cette même ligne, prolongée vers le nord. Ses grandes salles sont dallées de « briques d'or », cuites plus de cent jours puis imbibées d'huile, qui sonnent comme du métal sous le pas.|旧市街は南北7.8kmの一本の軸の上に組み立てられ、主要な門と殿はすべてその線に載っている。2008年の五輪公園も、北へ延ばした同じ線の上に置かれた。正殿の床に敷かれた「金磚」は百日以上焼いてから油に漬けたもので、踏むと金属のように鳴る。",
    [prop("Hutong Courtyard House|Casa de patio en un hutong|Maison à cour d'un hutong|胡同の四合院", 300, 62),
     prop("Tea House on the Axis|Casa de té en el eje|Maison de thé sur l'axe|中軸線の茶館", 280, 58)],
  ),
  shanghai: city(
    "Shanghai|Shanghái|Shanghai|上海",
    121.47, 31.23, "asi", "skyline", "metropolis", "r",
    "A city that pumps water back into itself|Una ciudad que se devuelve el agua|Une ville qui se réinjecte son eau|水を地面へ返す街",
    "Shanghai sank about 2.6 metres over the 20th century as it pumped up its own groundwater, and water is now injected back into the ground each winter to hold the buildings level. The maglev to the airport covers its 30 kilometres in roughly seven minutes and touches 431 km/h on the way.|Shanghái se hundió unos 2,6 metros en el siglo XX a fuerza de bombear su agua subterránea, y ahora cada invierno se inyecta agua de vuelta al terreno para mantener los edificios a nivel. El maglev del aeropuerto recorre sus 30 kilómetros en unos siete minutos y llega a 431 km/h por el camino.|Shanghai s'est enfoncée d'environ 2,6 mètres au XXe siècle à force de pomper sa nappe, et l'on réinjecte désormais de l'eau chaque hiver pour maintenir les immeubles de niveau. Le maglev de l'aéroport parcourt ses 30 kilomètres en sept minutes environ et atteint 431 km/h en route.|20世紀のあいだ地下水を汲み上げ続けた上海は、約2.6m沈んだ。今は冬ごとに水を地中へ戻し、建物の水平を保っている。空港へのリニアは30kmを7分ほどで走り、途中で時速431kmに達する。",
    [prop("Bund Trading House|Casa de comercio del Bund|Maison de négoce du Bund|外灘の商館", 350, 72),
     prop("Longtang Lane House|Casa de callejón longtang|Maison de ruelle longtang|路地の長屋", 280, 58)],
  ),
  seoul: city(
    "Seoul|Seúl|Séoul|ソウル",
    126.98, 37.57, "asi", "pagoda", "megacity_asia", "r",
    "A motorway torn up to let a stream out|Una autopista levantada para soltar un arroyo|Une autoroute arrachée pour libérer un ruisseau|川を出すために剥がした高架道路",
    "In 2003 the city pulled down an elevated motorway and uncovered the Cheonggyecheon stream buried beneath it, eleven kilometres of water through the middle of the centre. Its own flow was not enough, so water is pumped up from the Han river; in summer the air along the banks runs a few degrees cooler than the streets on either side.|En 2003 la ciudad derribó una autopista elevada y destapó el arroyo Cheonggyecheon que corría enterrado debajo: once kilómetros de agua por el centro. Su caudal no bastaba, así que se bombea agua del río Han; en verano el aire junto a las orillas está unos grados más fresco que en las calles vecinas.|En 2003, la ville a démoli une autoroute sur pilotis et rouvert le ruisseau Cheonggyecheon enfoui dessous : onze kilomètres d'eau en plein centre. Son débit ne suffisait pas, on y pompe donc l'eau du fleuve Han ; l'été, l'air le long des berges est de quelques degrés plus frais que dans les rues voisines.|2003年、市は高架の都市高速を撤去し、その下に埋められていた清渓川を掘り出した。都心を貫く11kmの流れである。自前の水量では足りず、漢江から汲み上げている。夏、岸辺の気温は隣の通りより数度低い。",
    [prop("Namdaemun Market Stall|Puesto del mercado de Namdaemun|Étal du marché de Namdaemun|南大門市場の店", 300, 62),
     prop("Stream-side Café|Café junto al arroyo|Café au bord du ruisseau|川沿いの喫茶店", 280, 58)],
  ),
  tokyo: city(
    "Tokyo|Tokio|Tokyo|東京",
    139.69, 35.69, "asi", "skyline", "megacity_asia", "r",
    "Seven seconds of music for every platform|Siete segundos de música por andén|Sept secondes de musique par quai|ホームごとに七秒の曲",
    "Every station on the Yamanote loop has its own departure melody, written to last about seven seconds and to finish just as the doors close; the composers were asked for something calming rather than urgent. Shinjuku, on the same line, handles roughly 3.5 million passengers a day and is the busiest station in the world.|Cada estación de la línea circular Yamanote tiene su propia melodía de salida, compuesta para durar unos siete segundos y acabar justo al cerrarse las puertas; se pidió a los autores algo que calmara, no que metiera prisa. Shinjuku, en esa misma línea, mueve unos 3,5 millones de viajeros al día y es la estación más transitada del mundo.|Chaque station de la ligne circulaire Yamanote a sa propre mélodie de départ, écrite pour durer sept secondes environ et s'achever à la fermeture des portes ; on a demandé aux compositeurs quelque chose d'apaisant plutôt que pressant. Shinjuku, sur la même ligne, voit passer quelque 3,5 millions de voyageurs par jour, record mondial.|山手線の駅にはそれぞれ発車メロディがあり、七秒ほどで鳴り終わって扉の閉まる瞬間に合うよう作られている。急かすのではなく落ち着かせる曲を、という注文だった。同じ線の新宿駅は一日およそ350万人が乗り降りし、世界で最も利用者の多い駅である。",
    [prop("Yokocho Alley Bar|Bar del callejón yokocho|Bar de ruelle yokocho|横丁の一杯飲み屋", 300, 62),
     prop("Fish Market Auction Lot|Lote de la subasta de pescado|Lot de la criée aux poissons|魚市場の競り枠", 350, 72)],
  ),

  // ---------------------------------------------------------------------
  // afr — アフリカと中東
  // ---------------------------------------------------------------------
  marrakesh: city(
    "Marrakesh|Marrakech|Marrakech|マラケシュ",
    -7.98, 31.63, "afr", "mosque", "desert", "l",
    "Water brought underground from the mountains|Agua traída bajo tierra desde la montaña|L'eau amenée sous terre depuis la montagne|山から地下を通して引いた水",
    "The city lives on khettaras, tunnels dug by hand from the foot of the Atlas with a line of shafts along the surface to bring the diggers up; they have watered its gardens since the 12th century. The walls are red because they are rammed earth taken from the ground the city stands on.|La ciudad vive de las jetaras, galerías excavadas a mano desde el pie del Atlas con una hilera de pozos en la superficie para sacar a los cavadores; riegan sus jardines desde el siglo XII. Las murallas son rojas porque son tierra apisonada sacada del propio suelo en que se asienta.|La ville vit de khettaras, galeries creusées à la main depuis le piémont de l'Atlas, jalonnées de puits en surface pour faire remonter les creuseurs ; elles arrosent ses jardins depuis le XIIe siècle. Les remparts sont rouges parce qu'ils sont en terre damée tirée du sol même où la ville est posée.|この街を養うのはハッターラ、アトラス山麓から手で掘り抜いた地下水路である。掘り手が上がれるよう地表には竪坑が一列に並び、12世紀から庭を潤してきた。城壁が赤いのは、街の足元の土をそのまま突き固めて積んだからだ。",
    [prop("Jemaa el-Fna Food Stall|Puesto de Yamaa el Fna|Échoppe de Jemaa el-Fna|ジャマ・エル・フナの屋台", 280, 58),
     prop("Tannery Vat|Tina de curtiduría|Cuve de tannerie|なめし革の桶", 260, 54)],
  ),
  dakar: city(
    "Dakar|Dakar|Dakar|ダカール",
    -17.44, 14.72, "afr", "ship_w", "savanna", "l",
    "The last land before the crossing|La última tierra antes de la travesía|La dernière terre avant la traversée|海を渡る前の最後の陸",
    "The Cape Verde peninsula is the westernmost point of mainland Africa, which for four centuries made it the last land before the Atlantic crossing. The island of Gorée lies two kilometres offshore; historians still argue over how many people passed through it, but it has become the memorial for the whole trade.|La península de Cabo Verde es el punto más occidental del África continental, y durante cuatro siglos fue la última tierra antes de la travesía del Atlántico. La isla de Gorea queda a dos kilómetros de la costa; los historiadores siguen discutiendo cuánta gente pasó por ella, pero se ha convertido en el memorial de toda la trata.|La presqu'île du Cap-Vert est le point le plus occidental de l'Afrique continentale, et fut quatre siècles durant la dernière terre avant la traversée de l'Atlantique. L'île de Gorée est à deux kilomètres du rivage ; les historiens discutent encore du nombre de captifs qui y transitèrent, mais elle est devenue le mémorial de toute la traite.|ヴェルデ岬半島はアフリカ大陸の最西端で、四百年のあいだ、大西洋を渡る前の最後の陸だった。沖合2kmのゴレ島を実際に何人が通ったかは歴史家の議論が続いているが、この島は奴隷貿易そのものを記憶する場所になっている。",
    [prop("Dakar–Niger Rail Yard|Depósito del Dakar-Níger|Dépôt du Dakar-Niger|ダカール・ニジェール鉄道の車庫", 280, 58),
     prop("Pirogue Beach Market|Mercado de la playa de piraguas|Marché des pirogues|浜の魚市", 260, 54)],
  ),
  timbuktu: city(
    "Timbuktu|Tombuctú|Tombouctou|トンブクトゥ",
    -3.01, 16.77, "afr", "mosque", "desert", "r",
    "Libraries kept in private houses|Bibliotecas guardadas en casas particulares|Des bibliothèques gardées dans les maisons|民家に守られてきた蔵書",
    "Families here have kept manuscripts on astronomy, law and medicine in their own houses since the 13th century, copied when the town's scholars were the reason caravans came at all. In 2012, with armed groups in the city, some 350,000 of them were smuggled out to Bamako in rice sacks and metal trunks, a few at a time.|Las familias guardan en sus propias casas manuscritos de astronomía, derecho y medicina desde el siglo XIII, copiados cuando los sabios del lugar eran la razón misma de que llegaran las caravanas. En 2012, con grupos armados en la ciudad, unos 350.000 salieron de contrabando hacia Bamako en sacos de arroz y baúles de metal, de pocos en pocos.|Des familles conservent chez elles, depuis le XIIIe siècle, des manuscrits d'astronomie, de droit et de médecine, copiés au temps où les savants de la ville étaient la raison même de la venue des caravanes. En 2012, des groupes armés occupant la cité, quelque 350 000 d'entre eux furent évacués clandestinement vers Bamako dans des sacs de riz et des malles de tôle, par petits paquets.|13世紀以来、この町の家々には天文・法学・医学の写本が私蔵されてきた。隊商がここを目指したのは、そもそも町の学者たちがいたからである。2012年、武装勢力が街に入ると、およそ35万点が米袋やブリキの行李に少しずつ隠され、バマコへ運び出された。",
    [prop("Manuscript Copyist's Room|Sala del copista|Atelier du copiste|写本師の部屋", 270, 56),
     prop("Salt Caravan Depot|Depósito de la caravana de sal|Dépôt de la caravane de sel|塩の隊商の荷置き場", 250, 52)],
  ),
  lagos: city(
    "Lagos|Lagos|Lagos|ラゴス",
    3.38, 6.52, "afr", "skyline", "tropics", "r",
    "A thousand films a year, shot in a fortnight|Mil películas al año, rodadas en quince días|Mille films par an, tournés en quinze jours|二週間で撮る、年に千本の映画",
    "Studios here put out well over a thousand films a year, most of them shot in two or three weeks and sold first on disc and now by streaming, which places Nigeria second only to India by number of titles. It all grew out of a 1992 video, Living in Bondage, made with borrowed equipment and sold copy by copy in a market.|Los estudios estrenan aquí bastante más de mil películas al año, rodadas casi todas en dos o tres semanas y vendidas primero en disco y ahora en streaming, lo que sitúa a Nigeria sólo por detrás de la India en número de títulos. Todo nació de un vídeo de 1992, Living in Bondage, hecho con equipo prestado y vendido copia a copia en un mercado.|Les studios y sortent bien plus de mille films par an, tournés pour la plupart en deux ou trois semaines et vendus d'abord en disque, aujourd'hui en streaming, ce qui place le Nigeria juste derrière l'Inde par le nombre de titres. Tout est parti d'une vidéo de 1992, Living in Bondage, tournée avec du matériel emprunté et vendue à l'unité sur un marché.|ここの制作会社は年に千本をはるかに超える映画を出す。多くは二、三週間で撮られ、初めはディスク、いまは配信で売られる。本数ではインドに次ぐ世界二位である。始まりは1992年、借り物の機材で撮り、市場で一枚ずつ売った『Living in Bondage』という一本だった。",
    [prop("Lagoon Stilt House|Casa sobre pilotes de la laguna|Maison sur pilotis de la lagune|潟の高床の家", 250, 52),
     prop("Film Lot in Surulere|Plató en Surulere|Plateau de tournage à Surulere|スルレレの撮影所", 300, 62)],
  ),
  cairo: city(
    "Cairo|El Cairo|Le Caire|カイロ",
    31.24, 30.04, "afr", "pyramid", "desert", "r",
    "Set to true north without a compass|Orientada al norte sin brújula|Orientée au nord vrai sans boussole|磁石なしで真北に据えた",
    "The sides of the Great Pyramid face true north to within a twentieth of a degree, aligned by watching stars rather than by any instrument that has survived, and it stayed the tallest building on earth for about 3,800 years. It kept a smooth white limestone casing until a 14th-century earthquake shook it loose and the stone was carted off to build the city below.|Los lados de la Gran Pirámide apuntan al norte verdadero con un error de una vigésima de grado, orientados observando estrellas y no con instrumento alguno que se conserve, y fue el edificio más alto del mundo unos 3.800 años. Mantuvo un revestimiento liso de caliza blanca hasta que un terremoto del siglo XIV lo soltó y la piedra se llevó para construir la ciudad de abajo.|Les faces de la grande pyramide visent le nord vrai à un vingtième de degré près, orientées par l'observation des étoiles et non par quelque instrument qui nous soit parvenu ; elle resta le plus haut édifice du monde environ 3 800 ans. Elle garda son parement lisse de calcaire blanc jusqu'à ce qu'un séisme du XIVe siècle le descelle : la pierre partit bâtir la ville en contrebas.|大ピラミッドの各辺は真北から二十分の一度以内に収まっている。残された道具ではなく、星を見て据えたものである。以後およそ3800年、地上で最も高い建造物だった。表面は白い石灰岩で滑らかに覆われていたが、14世紀の地震で剥がれ、その石は麓の街を建てるために運び去られた。",
    [prop("Khan el-Khalili Shop|Tienda de Jan el-Jalili|Boutique de Khan el-Khalili|ハン・ハリーリの店", 290, 60),
     prop("Nile Felucca Berth|Amarre de faluchos del Nilo|Mouillage des felouques du Nil|ナイルの帆船の係留地", 270, 56)],
  ),
  jerusalem: city(
    "Jerusalem|Jerusalén|Jérusalem|エルサレム",
    35.22, 31.78, "afr", "dome", "oldworld", "r",
    "A ladder nobody may move|Una escalera que nadie puede mover|Une échelle que nul ne peut déplacer|誰にも動かせない梯子",
    "A wooden ladder has stood on a ledge of the Church of the Holy Sepulchre since at least 1757, because six denominations share the building and nothing may be changed unless all of them agree. For the same reason the keys have been held since the 12th century by two Muslim families, one to keep them and one to open the door.|Una escalera de madera lleva en una cornisa de la iglesia del Santo Sepulcro desde al menos 1757, porque seis confesiones comparten el edificio y nada puede cambiarse sin que todas lo acepten. Por lo mismo, las llaves las custodian desde el siglo XII dos familias musulmanas: una las guarda y la otra abre la puerta.|Une échelle de bois est posée sur une corniche du Saint-Sépulcre depuis 1757 au moins, parce que six confessions se partagent l'édifice et que rien n'y peut changer sans l'accord de toutes. Pour la même raison, les clés sont depuis le XIIe siècle entre les mains de deux familles musulmanes : l'une les garde, l'autre ouvre la porte.|聖墳墓教会の軒に、遅くとも1757年から一本の木の梯子が置かれたままである。六つの教派が建物を分け合っており、全員の合意なしには何ひとつ動かせないからだ。同じ理由で、鍵は12世紀以来ふたつのムスリムの家が預かっている。一方が鍵を保管し、もう一方が扉を開ける。",
    [prop("Old City Souq Arch|Arco del zoco de la ciudad vieja|Arcade du souk de la vieille ville|旧市街の市場の門", 300, 62),
     prop("Olive Terrace|Bancal de olivos|Terrasse d'oliviers|オリーブの段畑", 270, 56)],
  ),
  addisababa: city(
    "Addis Ababa|Adís Abeba|Addis-Abeba|アディスアベバ",
    38.75, 9.01, "afr", "dome", "mountains", "l",
    "A calendar and a clock of its own|Un calendario y un reloj propios|Un calendrier et une horloge à soi|独自の暦と時計",
    "The Ethiopian calendar has thirteen months and runs seven to eight years behind the Gregorian one, and the day is counted from dawn, so seven in the morning is one o'clock. The city was founded in 1886 at 2,355 metres, the highest capital in Africa, after the empress asked to settle beside the hot springs.|El calendario etíope tiene trece meses y va siete u ocho años por detrás del gregoriano, y el día se cuenta desde el amanecer, de modo que las siete de la mañana son la una. La ciudad se fundó en 1886 a 2.355 metros, la capital más alta de África, después de que la emperatriz pidiera instalarse junto a las aguas termales.|Le calendrier éthiopien compte treize mois et retarde de sept à huit ans sur le grégorien, et la journée se compte depuis l'aube : sept heures du matin, c'est une heure. La ville fut fondée en 1886 à 2 355 mètres, la plus haute capitale d'Afrique, après que l'impératrice eut demandé à s'établir près des sources chaudes.|エチオピア暦は13か月あり、グレゴリオ暦より7〜8年遅れている。時刻は夜明けから数えるので、朝7時が「1時」である。街は1886年、標高2355mに開かれた。皇后が温泉のそばに居を構えたいと望んだためで、アフリカでいちばん高い首都になった。",
    [prop("Merkato Spice Stall|Puesto de especias del Merkato|Étal d'épices du Merkato|メルカートの香辛料店", 270, 56),
     prop("Coffee Roasting House|Tostadero de café|Maison de torréfaction|珈琲の焙煎所", 290, 60)],
  ),
  nairobi: city(
    "Nairobi|Nairobi|Nairobi|ナイロビ",
    36.82, -1.29, "afr", "totem", "savanna", "r",
    "Lions within sight of the office towers|Leones a la vista de las torres|Des lions en vue des tours de bureaux|オフィス街から見える獅子",
    "It is the only capital with a national park inside the city boundary: 117 square kilometres fenced on three sides and left open to the south so that wildebeest and zebra can still come and go. The city exists because the railway from the coast needed one last flat, watered place to gather its material before climbing the escarpment, in 1899.|Es la única capital con un parque nacional dentro del término municipal: 117 kilómetros cuadrados vallados por tres lados y abiertos al sur para que ñus y cebras sigan entrando y saliendo. La ciudad existe porque el ferrocarril de la costa necesitaba un último llano con agua donde reunir material antes de subir la escarpadura, en 1899.|C'est la seule capitale à posséder un parc national dans ses limites : 117 kilomètres carrés clôturés sur trois côtés et laissés ouverts au sud pour que gnous et zèbres puissent aller et venir. La ville existe parce que le chemin de fer venu de la côte avait besoin d'un dernier replat pourvu d'eau pour rassembler son matériel avant de gravir l'escarpement, en 1899.|市域の中に国立公園を持つ首都はここだけである。117km²が三方を柵で囲まれ、南だけ開けてあり、ヌーやシマウマが今も出入りする。街ができたのは1899年、海岸から来た鉄道が断崖を登る前に資材を集める、水のある最後の平地が必要だったからだ。",
    [prop("Railway Goods Shed|Cobertizo de mercancías|Halle à marchandises|鉄道の貨物庫", 280, 58),
     prop("Tea Auction Floor|Sala de subasta de té|Salle des ventes de thé|茶の競り場", 300, 62)],
  ),
  zanzibar: city(
    "Zanzibar|Zanzíbar|Zanzibar|ザンジバル",
    39.20, -6.16, "afr", "palm_w", "island", "r",
    "The shortest war ever fought|La guerra más corta jamás librada|La guerre la plus courte de l'histoire|史上いちばん短い戦争",
    "The war of 27 August 1896 lasted about thirty-eight minutes, from the first British shell to the sultan's flag coming down. The island's wealth had come from cloves, planted by Omani rulers early in the same century and worked by enslaved people; for a time it grew most of the world's supply.|La guerra del 27 de agosto de 1896 duró unos treinta y ocho minutos, desde la primera granada británica hasta que arrió la bandera del sultán. La riqueza de la isla venía del clavo, plantado por los gobernantes omaníes a principios de ese mismo siglo y trabajado por esclavos; durante un tiempo produjo la mayor parte del clavo del mundo.|La guerre du 27 août 1896 dura environ trente-huit minutes, du premier obus britannique à l'amenée du pavillon du sultan. La richesse de l'île venait du girofle, planté par les souverains omanais au début du même siècle et travaillé par des esclaves ; elle en fournit un temps l'essentiel de la production mondiale.|1896年8月27日の戦争は、英艦の最初の一発からスルタンの旗が降りるまで、およそ38分で終わった。島の富は丁字から来ていた。同じ世紀の初めにオマーンの支配者が植えさせ、奴隷に摘ませたもので、一時は世界の丁字の大半をここが産した。",
    [prop("Clove Drying Yard|Secadero de clavo|Séchoir à girofle|丁字の乾し場", 260, 54),
     prop("Dhow Repair Slip|Varadero de dhows|Cale de radoub à boutres|ダウ船の修理場", 250, 52)],
  ),
  capetown: city(
    "Cape Town|Ciudad del Cabo|Le Cap|ケープタウン",
    18.42, -33.92, "afr", "peak_w", "mountains", "l",
    "More plants on one mountain than in a country|Más plantas en un monte que en un país|Plus de plantes sur une montagne que dans un pays|一つの山に、一国より多い植物",
    "Table Mountain carries around 2,200 plant species, more than the whole of the British Isles, and much of that fynbos will not set seed unless a fire has been through it. In 2018 the city came within weeks of Day Zero, the date the taps were to be shut, and cut its water use by more than half instead.|La Montaña de la Mesa alberga unas 2.200 especies vegetales, más que todas las islas británicas, y buena parte de ese fynbos no da semilla si antes no ha pasado un incendio. En 2018 la ciudad estuvo a semanas del Día Cero, la fecha en que iban a cerrarse los grifos, y en su lugar redujo su consumo de agua a menos de la mitad.|La montagne de la Table porte quelque 2 200 espèces végétales, plus que l'ensemble des îles Britanniques, et une grande part de ce fynbos ne grène qu'après le passage d'un incendie. En 2018, la ville fut à quelques semaines du Jour zéro, date prévue de la fermeture des robinets ; elle a préféré réduire de plus de moitié sa consommation d'eau.|テーブルマウンテンには約2200種の植物があり、英国諸島全体より多い。その多くを占めるフィンボスは、火を通らないと種を落とさないものが少なくない。2018年、市は蛇口を閉める「デイ・ゼロ」の数週間手前まで行き、代わりに水の使用量を半分以下に落とした。",
    [prop("Bo-Kaap Terrace House|Casa del Bo-Kaap|Maison en terrasse du Bo-Kaap|ボカープの家並み", 290, 60),
     prop("Harbour Dry Dock|Dique seco del puerto|Cale sèche du port|港の乾ドック", 320, 66)],
  ),

  // ---------------------------------------------------------------------
  // nam — 北アメリカ
  // ---------------------------------------------------------------------
  honolulu: city(
    "Honolulu|Honolulu|Honolulu|ホノルル",
    -157.86, 21.31, "nam", "palm_w", "island", "l",
    "The most isolated islands on earth|Las islas más aisladas del planeta|Les îles les plus isolées du monde|地上で最も孤立した島々",
    "The nearest continent is some 3,800 kilometres away, so before people came a new species is reckoned to have established itself about once every 35,000 years, and then split into dozens. Hawaiian was pushed out of the schools after 1896 and was down to a few hundred native speakers by 1980; immersion schools brought it back, and it is now an official language of the state.|El continente más cercano está a unos 3.800 kilómetros, así que antes de la llegada humana se calcula que una especie nueva se establecía cada 35.000 años y luego se dividía en decenas. El hawaiano fue expulsado de las escuelas después de 1896 y hacia 1980 quedaban unos pocos cientos de hablantes nativos; las escuelas de inmersión lo recuperaron y hoy es lengua oficial del estado.|Le continent le plus proche est à quelque 3 800 kilomètres : avant l'arrivée des hommes, on estime qu'une espèce nouvelle s'y installait tous les 35 000 ans environ, puis se divisait en dizaines d'autres. La langue hawaïenne fut chassée des écoles après 1896 et ne comptait plus que quelques centaines de locuteurs natifs vers 1980 ; les écoles d'immersion l'ont ramenée, et elle est aujourd'hui langue officielle de l'État.|いちばん近い大陸まで約3800km。人が来る前、新しい種がこの島に根づくのは3万5千年に一度ほどで、そこから何十種にも分かれたと見積もられている。ハワイ語は1896年以降学校から締め出され、1980年頃には母語話者が数百人まで減った。イマージョン学校がこれを引き戻し、いまは州の公用語である。",
    [prop("Outrigger Canoe Club|Club de canoas con balancín|Club de pirogue à balancier|アウトリガーカヌーの艇庫", 270, 56),
     prop("Pineapple Cannery|Conservera de piña|Conserverie d'ananas|パイナップルの缶詰工場", 290, 60)],
  ),
  vancouver: city(
    "Vancouver|Vancouver|Vancouver|バンクーバー",
    -123.12, 49.28, "nam", "peak_w", "mountains", "l",
    "Views written into the law|Vistas protegidas por ley|Des vues inscrites dans la loi|法律で守られた眺め",
    "Twenty-seven \"view cones\" are protected by statute — corridors of air through which the mountains must stay visible from certain streets — so the towers are built slim and stepped rather than broad. Stanley Park was logged before it was a park, and the old stumps still show the notches where fallers wedged in their springboards.|Veintisiete «conos de vista» están protegidos por ley: corredores de aire por los que las montañas deben seguir viéndose desde ciertas calles, de modo que las torres se construyen esbeltas y escalonadas en vez de anchas. El parque Stanley se taló antes de ser parque, y en los tocones viejos aún se ven las muescas donde los leñadores encajaban sus tablas.|Vingt-sept « cônes de vue » sont protégés par la loi : des couloirs d'air par lesquels les montagnes doivent rester visibles depuis certaines rues, si bien que les tours sont minces et en gradins plutôt que larges. Le parc Stanley fut exploité avant d'être un parc, et les vieilles souches montrent encore les encoches où les bûcherons calaient leurs planchettes.|27本の「ビューコーン」が条例で守られている。決められた通りから山が見え続けるように空けておく空間で、そのため高層は太らせず、細く段状に建てる。スタンレー公園は公園になる前に伐り出された森で、古い切株には木こりが足場板を差した刻み目が残っている。",
    [prop("Timber Log Boom|Barrera de troncos|Estacade de grumes|筏に組んだ丸太", 280, 58),
     prop("Seaplane Dock|Muelle de hidroaviones|Quai d'hydravions|水上機の桟橋", 300, 62)],
  ),
  sanfrancisco: city(
    "San Francisco|San Francisco|San Francisco|サンフランシスコ",
    -122.42, 37.77, "nam", "bridge_w", "harbour", "l",
    "Gold rush ships under the downtown|Barcos de la fiebre del oro bajo el centro|Des navires de la ruée sous le centre-ville|オフィス街の下に眠る帆船",
    "About 300 ships were abandoned in the bay in 1849 when their crews walked off to the goldfields, and dozens ended up buried as the shoreline was filled in; builders still strike them digging foundations downtown. The bridge is painted international orange because that was the colour that held up best in the fog, and the painting has never once stopped since.|Cerca de 300 barcos quedaron abandonados en la bahía en 1849, cuando sus tripulaciones se marcharon a los placeres de oro, y decenas acabaron enterrados al rellenarse la orilla; todavía aparecen al excavar cimientos en el centro. El puente es naranja internacional porque fue el color que mejor resistía la niebla, y desde entonces no se ha dejado de pintar ni un año.|Près de 300 navires furent abandonnés dans la baie en 1849, leurs équipages partis aux placers, et des dizaines ont été enfouis quand on a remblayé le rivage ; on les heurte encore en creusant des fondations au centre-ville. Le pont est peint en orange international parce que cette teinte tenait le mieux dans la brume, et depuis on n'a jamais cessé de le repeindre.|1849年、乗組員が金鉱へ歩き去って湾に300隻ほどの船が捨てられ、その多くは埋め立てとともに地中に残った。今も都心で基礎を掘ると船体に当たる。橋がインターナショナル・オレンジなのは、霧の中でいちばん保つ色だったからで、塗り替えはそれ以来一度も途切れていない。",
    [prop("Cable Car Turntable|Plataforma giratoria del cable car|Plaque tournante du cable car|ケーブルカーの転車台", 300, 62),
     prop("Fisherman's Wharf Stall|Puesto del muelle de pescadores|Étal du quai des pêcheurs|漁師町の屋台", 290, 60)],
  ),
  mexicocity: city(
    "Mexico City|Ciudad de México|Mexico|メキシコシティ",
    -99.13, 19.43, "nam", "pyramid", "plaza", "l",
    "A capital sinking into a drained lake|Una capital que se hunde en un lago desecado|Une capitale qui s'enfonce dans un lac asséché|干した湖に沈んでいく首都",
    "The city stands on the bed of Lake Texcoco, drained by the Spanish, and it is still going down: the cathedral has dropped several metres unevenly, and the Palace of Fine Arts sank so far that its ground floor is now a basement. Tenochtitlan had fed itself from chinampas, plots built up out of lake mud, which are still farmed at Xochimilco.|La ciudad se asienta sobre el lecho del lago de Texcoco, desecado por los españoles, y sigue bajando: la catedral se ha hundido varios metros de forma desigual y el Palacio de Bellas Artes bajó tanto que su planta baja es hoy un sótano. Tenochtitlan se alimentaba de chinampas, parcelas levantadas con el lodo del lago, que aún se cultivan en Xochimilco.|La ville repose sur le lit du lac de Texcoco, asséché par les Espagnols, et elle continue de descendre : la cathédrale s'est enfoncée de plusieurs mètres de façon inégale, et le palais des Beaux-Arts a tant baissé que son rez-de-chaussée est devenu un sous-sol. Tenochtitlan se nourrissait de chinampas, des parcelles montées avec la vase du lac, encore cultivées à Xochimilco.|この街はスペイン人が干したテスココ湖の底の上にあり、今も沈み続けている。大聖堂は不揃いに数m下がり、ベジャス・アルテス宮殿は一階がそのまま地下になった。テノチティトランを養ったのは、湖の泥を積み上げて作る畑チナンパで、ソチミルコでは今もそれで耕している。",
    [prop("Zócalo Arcade Shop|Local en los portales del Zócalo|Boutique des arcades du Zócalo|ソカロ広場の回廊の店", 300, 62),
     prop("Chinampa Garden Plot|Parcela de chinampa|Parcelle de chinampa|チナンパの畑", 260, 54)],
  ),
  neworleans: city(
    "New Orleans|Nueva Orleans|La Nouvelle-Orléans|ニューオーリンズ",
    -90.07, 29.95, "nam", "ship_w", "tropics", "l",
    "A river running higher than the streets|Un río que corre más alto que las calles|Un fleuve qui coule plus haut que les rues|通りより高いところを流れる川",
    "Much of the city lies below sea level with the Mississippi held above it behind levees, which is why the dead are laid in tombs standing on the ground rather than in it. Jazz came in part out of Congo Square, the one place where enslaved people were allowed to gather and drum on Sunday afternoons.|Buena parte de la ciudad está bajo el nivel del mar, con el Misisipi sostenido por encima tras los diques; por eso los muertos se depositan en tumbas sobre el suelo y no dentro de él. El jazz salió en parte de Congo Square, el único sitio donde los esclavos podían reunirse y tocar el tambor los domingos por la tarde.|Une bonne part de la ville est sous le niveau de la mer, le Mississippi étant retenu au-dessus par des digues ; c'est pourquoi l'on dépose les morts dans des tombeaux posés sur le sol et non dedans. Le jazz est né en partie de Congo Square, le seul endroit où les esclaves avaient le droit de se réunir et de jouer du tambour le dimanche après-midi.|市街の多くは海面より低く、ミシシッピ川は堤防に支えられてその上を流れる。死者を地中ではなく地上の墓室に納めるのはそのためである。ジャズの源のひとつはコンゴ広場だった。日曜の午後、奴隷たちが集まって太鼓を叩くことを許された唯一の場所である。",
    [prop("French Quarter Balcony|Balcón del Barrio Francés|Balcon du Vieux Carré|フレンチ・クオーターの露台", 290, 60),
     prop("Paddle Steamer Landing|Embarcadero del vapor de ruedas|Débarcadère du vapeur à roues|外輪船の桟橋", 280, 58)],
  ),
  havana: city(
    "Havana|La Habana|La Havane|ハバナ",
    -82.38, 23.13, "nam", "ship_w", "oldworld", "r",
    "Cars kept alive for sixty years|Coches mantenidos vivos sesenta años|Des voitures maintenues en vie soixante ans|六十年生かし続けた車",
    "Something like 60,000 American cars built before 1960 are still running here, kept going with parts turned on home lathes and, often enough, a Soviet diesel engine under the bonnet. The harbour was where the Spanish treasure fleet gathered each year before crossing in company, which is why forts guard both sides of its narrow entrance.|Aún ruedan aquí unos 60.000 coches estadounidenses anteriores a 1960, mantenidos con piezas torneadas en casa y, muchas veces, con un motor diésel soviético bajo el capó. En este puerto se reunía cada año la flota de Indias antes de cruzar en convoy, y por eso hay fortalezas a ambos lados de su bocana estrecha.|Quelque 60 000 voitures américaines d'avant 1960 roulent encore ici, entretenues avec des pièces tournées à la maison et, bien souvent, un moteur diesel soviétique sous le capot. C'est dans ce port que la flotte des Indes se rassemblait chaque année avant de traverser en convoi, d'où les forts qui gardent les deux rives de l'étroite passe.|1960年以前のアメリカ車がおよそ6万台、いまも走っている。部品は町の旋盤で削り出し、ボンネットの下はソ連製のディーゼルということも珍しくない。この港はスペインの宝船団が毎年集結し、まとまって大西洋を渡った場所で、狭い湾口の両側に要塞が構えているのはそのためだ。",
    [prop("Malecón Sea Wall Café|Café del Malecón|Café du Malecón|マレコン海岸の喫茶店", 270, 56),
     prop("Cigar Rolling Floor|Taller de torcido de puros|Atelier de roulage de cigares|葉巻の巻き場", 300, 62)],
  ),
  chicago: city(
    "Chicago|Chicago|Chicago|シカゴ",
    -87.63, 41.88, "nam", "skyline", "metropolis", "r",
    "A city lifted out of the mud|Una ciudad levantada del barro|Une ville soulevée hors de la boue|泥から持ち上げた街",
    "In the 1850s whole streets of buildings were jacked up out of the mud on screws so that sewers could be laid beneath them; one six-storey hotel rose more than a metre without the guests being asked to leave. When the sewage still ran into the lake they drank from, the city reversed the Chicago River in 1900 so that it flowed the other way.|En los años 1850 se levantaron calles enteras de edificios sobre gatos de rosca para poder tender las alcantarillas debajo; un hotel de seis pisos subió más de un metro sin que se pidiera a los huéspedes que salieran. Como las aguas seguían yendo al lago del que bebían, en 1900 la ciudad invirtió el curso del río Chicago para que corriera al revés.|Dans les années 1850, on souleva des rues entières d'immeubles sur des vérins à vis pour poser les égouts dessous ; un hôtel de six étages monta de plus d'un mètre sans qu'on prie les clients de sortir. Comme les eaux usées finissaient toujours dans le lac où l'on puisait à boire, la ville inversa en 1900 le cours de la rivière Chicago.|1850年代、下水を通すために建物を街路ごとねじジャッキで泥の上へ持ち上げた。六階建てのホテルは客を出さないまま1m以上上がったという。それでも汚水は飲み水の湖へ流れ込んだので、市は1900年、シカゴ川の流れを逆向きに変えた。",
    [prop("Grain Elevator|Silo de grano|Silo à grain|穀物のサイロ", 300, 62),
     prop("Loop Office Floor|Planta de oficinas del Loop|Étage de bureaux du Loop|ループ地区の貸事務所", 330, 68)],
  ),
  toronto: city(
    "Toronto|Toronto|Toronto|トロント",
    -79.38, 43.65, "nam", "skyline", "metropolis", "r",
    "Half the city was born somewhere else|La mitad de la ciudad nació en otra parte|La moitié de la ville est née ailleurs|市民の半分は外で生まれた",
    "More than half the people living here were born outside Canada, and something like 180 languages and dialects are spoken across the metropolitan area. Beneath the office towers runs the PATH, thirty kilometres of walkway built so that people can cross the centre in February without going outside.|Más de la mitad de sus habitantes nacieron fuera de Canadá, y en el área metropolitana se hablan alrededor de 180 lenguas y dialectos. Bajo las torres de oficinas corre el PATH, treinta kilómetros de galerías construidas para cruzar el centro en febrero sin salir a la calle.|Plus de la moitié des habitants sont nés hors du Canada, et l'on parle quelque 180 langues et dialectes dans l'agglomération. Sous les tours de bureaux court le PATH, trente kilomètres de galeries aménagées pour traverser le centre en février sans mettre le nez dehors.|ここに住む人の半数以上はカナダの外で生まれている。都市圏で話される言語と方言はおよそ180にのぼる。オフィス街の下にはPATHと呼ばれる全長30kmの地下道が走り、2月でも外へ出ずに中心部を横切れる。",
    [prop("Underground Concourse Unit|Local del pasaje subterráneo|Local de la galerie souterraine|地下街の一区画", 310, 64),
     prop("Lakefront Grain Silo|Silo del puerto lacustre|Silo du port lacustre|湖岸の穀物庫", 280, 58)],
  ),
  newyork: city(
    "New York|Nueva York|New York|ニューヨーク",
    -74.01, 40.71, "nam", "statue", "metropolis", "r",
    "A statue that arrived in crates|Una estatua que llegó en cajas|Une statue arrivée en caisses|木箱で届いた女神",
    "The Statue of Liberty came over in 214 crates in 1885 and lay unassembled for months because nobody had paid for a pedestal; a newspaper ran a campaign and more than 120,000 people, most of them giving under a dollar, found the money. Her copper skin is 2.4 millimetres thick, about two coins, and it had turned green within thirty years.|La Estatua de la Libertad llegó en 214 cajas en 1885 y pasó meses sin montar porque nadie había pagado el pedestal; un periódico lanzó una colecta y más de 120.000 personas, casi todas con menos de un dólar, reunieron el dinero. Su piel de cobre tiene 2,4 milímetros, el grosor de dos monedas, y en treinta años se había vuelto verde.|La statue de la Liberté arriva en 214 caisses en 1885 et resta des mois démontée, faute d'un socle payé ; un journal lança une souscription et plus de 120 000 personnes, presque toutes pour moins d'un dollar, réunirent la somme. Sa peau de cuivre fait 2,4 millimètres — l'épaisseur de deux pièces — et elle avait verdi en trente ans.|自由の女神は1885年、214個の木箱で届いたが、台座の金が集まらず何か月も組み立てられずにいた。新聞が募金を呼びかけ、12万を超える人々が――その多くは1ドル未満を出して――費用を賄った。銅の外皮は厚さ2.4mm、硬貨二枚ぶんで、三十年のうちに緑に変わった。",
    [prop("Harbour Ferry Slip|Atracadero del ferry|Embarcadère du ferry|フェリーの発着場", 320, 66),
     prop("Brownstone Row House|Casa de arenisca|Maison de grès brun|褐色砂岩の長屋", 350, 72)],
  ),

  // ---------------------------------------------------------------------
  // sam — 南アメリカ
  // ---------------------------------------------------------------------
  cartagena: city(
    "Cartagena|Cartagena|Carthagène|カルタヘナ",
    -75.51, 10.42, "sam", "cathedral_w", "harbour", "r",
    "Walls that took nearly two centuries|Murallas que costaron casi dos siglos|Des remparts de près de deux siècles|二百年近くかけた城壁",
    "The walls were built from 1586 into the 1790s and cost so much that the king in Madrid is said to have gone to his window to look for them. In 1741 a British fleet of some 186 ships and 27,000 men besieged the town for two months and left beaten, more by fever than by gunfire.|Las murallas se levantaron entre 1586 y la década de 1790 y costaron tanto que se cuenta que el rey, en Madrid, se asomó a la ventana para ver si las divisaba. En 1741 una flota británica de unos 186 barcos y 27.000 hombres sitió la plaza dos meses y se retiró vencida, más por las fiebres que por los cañones.|Les remparts furent élevés de 1586 aux années 1790 et coûtèrent si cher que le roi, à Madrid, se serait mis à sa fenêtre pour tenter de les apercevoir. En 1741, une flotte britannique de quelque 186 navires et 27 000 hommes assiégea la ville deux mois et repartit battue, davantage par les fièvres que par les canons.|城壁は1586年から1790年代まで築き続けられ、費用がかさみすぎて、マドリードの王が「見えるはずだ」と窓辺に立ったという話が残る。1741年、186隻・2万7千人の英艦隊が二か月包囲したが、砲火よりも熱病に敗れて引き揚げた。",
    [prop("Walled City Merchant House|Casa de mercader intramuros|Maison de marchand intra-muros|城壁内の商家", 300, 62),
     prop("Emerald Dealer's Room|Sala del tratante de esmeraldas|Comptoir d'émeraudes|エメラルド商の部屋", 320, 66)],
  ),
  manaus: city(
    "Manaus|Manaos|Manaus|マナウス",
    -60.02, -3.10, "sam", "palm_w", "tropics", "r",
    "An opera house 1,500 km up the river|Una ópera a 1.500 km río arriba|Un opéra à 1 500 km en amont|川を1500km遡った先の歌劇場",
    "The opera house was finished in 1896 out of Italian marble, Alsatian tiles and French glass, all shipped 1,500 kilometres up the Amazon on rubber money, and the road outside was surfaced in rubber so that carriage wheels would not disturb the singing. The boom ended when seeds smuggled to London in 1876 grew into plantations in Malaya.|El teatro de la ópera se terminó en 1896 con mármol italiano, tejas alsacianas y vidrio francés, todo remontado 1.500 kilómetros por el Amazonas con dinero del caucho, y la calle de delante se pavimentó con caucho para que las ruedas no molestaran al canto. El auge acabó cuando unas semillas sacadas a escondidas hacia Londres en 1876 se convirtieron en plantaciones en Malasia.|L'opéra fut achevé en 1896 avec du marbre d'Italie, des tuiles d'Alsace et du verre de France, le tout remonté sur 1 500 kilomètres d'Amazone grâce au caoutchouc, et la rue devant fut revêtue de caoutchouc pour que les roues ne gênent pas le chant. Le boom s'acheva quand des graines emportées clandestinement à Londres en 1876 devinrent des plantations en Malaisie.|1896年に完成した歌劇場は、イタリアの大理石、アルザスの瓦、フランスの硝子でできている。すべてゴムの金でアマゾンを1500km遡らせた。表の通りにはゴムが敷かれ、馬車の音が歌を邪魔しないようにした。好景気は、1876年にロンドンへ持ち出された種がマラヤで農園になったときに終わった。",
    [prop("Rubber Tapper's Camp|Campamento de sangradores|Campement de saigneurs d'hévéa|ゴム採りの宿営", 250, 52),
     prop("Floating Fuel Dock|Muelle flotante de combustible|Ponton à carburant|川の給油浮桟橋", 280, 58)],
  ),
  lima: city(
    "Lima|Lima|Lima|リマ",
    -77.04, -12.05, "sam", "dome", "desert", "l",
    "A capital where it does not rain|Una capital donde no llueve|Une capitale où il ne pleut pas|雨の降らない首都",
    "Lima gets about seven millimetres of rain a year, less than almost any capital on earth, and yet spends half the year under a low grey ceiling of cloud the locals call the donkey's belly. Its water comes off the Andes down three rivers, and hillside districts beyond the pipes still buy theirs by the tankful.|Lima recibe unos siete milímetros de lluvia al año, menos que casi ninguna capital del mundo, y aun así pasa medio año bajo un techo bajo y gris que allí llaman panza de burro. Su agua baja de los Andes por tres ríos, y los barrios de ladera a los que no llega la tubería todavía la compran por cisternas.|Lima reçoit environ sept millimètres de pluie par an, moins que presque toutes les capitales du monde, et passe pourtant la moitié de l'année sous un plafond gris que l'on y appelle le ventre d'âne. Son eau descend des Andes par trois rivières, et les quartiers de coteau hors réseau l'achètent encore à la citerne.|リマの年間降水量は約7mm、世界の首都でも指折りの少なさである。それでいて一年の半分は「ロバの腹」と呼ばれる低く垂れた灰色の雲に覆われる。水はアンデスから三本の川で下ってくるが、水道の届かない斜面の地区では今もタンク車から買っている。",
    [prop("Barranco Cliff Villa|Villa del acantilado de Barranco|Villa de la falaise de Barranco|バランコの崖の別荘", 300, 62),
     prop("Ceviche Counter|Barra de cebiche|Comptoir à ceviche|セビーチェの店", 280, 58)],
  ),
  cusco: city(
    "Cusco|Cuzco|Cuzco|クスコ",
    -71.98, -13.53, "sam", "peak_w", "mountains", "l",
    "Stones that ride out the earthquakes|Piedras que aguantan los terremotos|Des pierres qui encaissent les séismes|地震をやり過ごす石積み",
    "The blocks are cut so closely that a knife blade will not go between them, and they are laid without mortar, so in an earthquake they shift, settle and return instead of cracking. Spanish buildings raised on top of those walls have come down twice while the Inca courses beneath them stood.|Los bloques encajan tan justos que no entra una hoja de cuchillo entre ellos, y se asientan sin argamasa: en un terremoto se mueven, se acomodan y vuelven a su sitio en vez de partirse. Los edificios españoles levantados sobre esos muros se han caído dos veces mientras las hiladas incas de debajo seguían en pie.|Les blocs sont taillés si juste qu'une lame de couteau ne passe pas entre eux, et posés sans mortier : lors d'un séisme, ils bougent, se tassent et reprennent leur place au lieu de se fendre. Les bâtiments espagnols élevés sur ces murs sont tombés deux fois, tandis que les assises incas du dessous tenaient bon.|石は刃物一枚通らぬほど密に切り合わされ、しかも漆喰を使わずに積まれている。だから地震では割れる代わりに、ずれて落ち着き、また戻る。この壁の上に建てられたスペイン風の建物は二度崩れたが、下のインカの石積みは立ったままだった。",
    [prop("San Blas Workshop|Taller de San Blas|Atelier de San Blas|サン・ブラス地区の工房", 270, 56),
     prop("Alpaca Weaving Shed|Nave de tejido de alpaca|Atelier de tissage d'alpaga|アルパカの織り小屋", 260, 54)],
  ),
  salvador: city(
    "Salvador|Salvador de Bahía|Salvador de Bahia|サルヴァドール",
    -38.51, -12.97, "sam", "cathedral_w", "tropics", "r",
    "The capital before Rio, and the doorway|La capital antes de Río, y la puerta|La capitale avant Rio, et la porte|リオの前の首都であり、入口",
    "Salvador was the capital of Brazil for 214 years and the main door of the slave trade; more Africans were landed in Brazil than in the whole of North America. Capoeira, candomblé and the berimbau came out of that history, and capoeira itself was against the law until 1940.|Salvador fue capital de Brasil durante 214 años y la puerta principal de la trata; a Brasil llegaron más africanos que a toda Norteamérica. De esa historia salieron la capoeira, el candomblé y el berimbau, y la capoeira misma estuvo prohibida hasta 1940.|Salvador fut la capitale du Brésil pendant 214 ans et la principale porte de la traite ; le Brésil a reçu plus d'Africains que toute l'Amérique du Nord. De cette histoire sont nés la capoeira, le candomblé et le berimbau — et la capoeira resta interdite jusqu'en 1940.|サルヴァドールは214年にわたりブラジルの首都であり、奴隷貿易の正面の入口でもあった。ブラジルに運ばれたアフリカの人々は、北アメリカ全体より多い。その歴史からカポエイラ、カンドンブレ、ビリンバウが生まれた。カポエイラ自体は1940年まで法で禁じられていた。",
    [prop("Pelourinho Corner House|Casa de esquina del Pelourinho|Maison d'angle du Pelourinho|ペロウリーニョの角の家", 290, 60),
     prop("Berimbau Maker's Shop|Taller de berimbaus|Atelier de berimbau|ビリンバウの工房", 250, 52)],
  ),
  rio: city(
    "Rio de Janeiro|Río de Janeiro|Rio de Janeiro|リオデジャネイロ",
    -43.20, -22.91, "sam", "statue", "harbour", "r",
    "A bay mistaken for a river|Una bahía tomada por un río|Une baie prise pour un fleuve|川と見誤られた湾",
    "The name means river of January: the sailors who came into the bay in January 1502 took its narrow mouth for the estuary of a great river. The statue on the peak is faced in soapstone, soft enough to shape by hand and hard-wearing in the weather, and its pieces went up by rack railway between 1926 and 1931.|El nombre significa río de enero: los marinos que entraron en la bahía en enero de 1502 tomaron su boca estrecha por la desembocadura de un gran río. La estatua de la cima está revestida de esteatita, blanda para labrarla a mano y resistente a la intemperie, y sus piezas subieron en tren cremallera entre 1926 y 1931.|Le nom signifie fleuve de janvier : les marins entrés dans la baie en janvier 1502 prirent son goulet pour l'estuaire d'un grand fleuve. La statue du sommet est revêtue de stéatite, assez tendre pour être travaillée à la main et résistante aux intempéries, et ses morceaux montèrent par train à crémaillère entre 1926 et 1931.|リオデジャネイロは「一月の川」の意である。1502年1月にこの湾へ入った船乗りが、狭い湾口を大河の河口と取り違えた。頂のキリスト像は滑石で覆われている。手で削れるほど柔らかく風雨に強い石で、部材は1926年から1931年にかけて登山鉄道で運び上げられた。",
    [prop("Copacabana Beach Kiosk|Quiosco de Copacabana|Kiosque de Copacabana|コパカバーナの浜の売店", 300, 62),
     prop("Samba School Yard|Patio de escuela de samba|Cour d'école de samba|サンバ学校の稽古場", 280, 58)],
  ),
  buenosaires: city(
    "Buenos Aires|Buenos Aires|Buenos Aires|ブエノスアイレス",
    -58.38, -34.60, "sam", "dome", "plaza", "l",
    "A theatre that became a bookshop|Un teatro convertido en librería|Un théâtre devenu librairie|劇場のままの本屋",
    "A theatre of 1919 in the centre now sells books from its stalls and its boxes, with the painted ceiling and the red curtain left exactly where they were; the city has more bookshops for its size than any other. Tango grew up in the port districts among immigrants and was danced by men with men for years, while it was still thought disreputable.|Un teatro de 1919 vende hoy libros desde su platea y sus palcos, con el techo pintado y el telón rojo donde siempre estuvieron; la ciudad tiene más librerías por habitante que ninguna otra. El tango creció en los barrios del puerto entre inmigrantes y se bailó durante años entre hombres, cuando todavía se lo tenía por cosa de mala fama.|Un théâtre de 1919 vend aujourd'hui des livres depuis son parterre et ses loges, plafond peint et rideau rouge restés en place ; la ville compte plus de librairies par habitant que n'importe quelle autre. Le tango grandit dans les quartiers du port parmi les immigrés et se dansa des années entre hommes, du temps où on le tenait encore pour mal famé.|1919年の劇場が、平土間と桟敷をそのまま棚にして本を売っている。天井画も赤い緞帳も昔のままだ。人口あたりの書店の数はこの街が世界一である。タンゴは港の界隈で移民たちのあいだから育ち、後ろ暗いものと見られていた頃は長く男同士で踊られていた。",
    [prop("Café Notable Table|Mesa de café notable|Table d'un café notable|老舗カフェの席", 290, 60),
     prop("Cattle Market Pen|Corral del mercado de ganado|Enclos du marché aux bestiaux|家畜市場の囲い", 300, 62)],
  ),
  ushuaia: city(
    "Ushuaia|Ushuaia|Ushuaïa|ウシュアイア",
    -68.30, -54.80, "sam", "ship_w", "tundra", "l",
    "The last port before the ice|El último puerto antes del hielo|Le dernier port avant les glaces|氷の手前の最後の港",
    "Ushuaia is the southernmost city in the world and the port where most Antarctic voyages begin — around nine in ten expedition passengers sail from here. The town was built by a prison colony whose inmates felled the forest for fuel and laid a railway to carry it, and that line now carries tourists instead.|Ushuaia es la ciudad más austral del mundo y el puerto donde empieza la mayoría de los viajes a la Antártida: unos nueve de cada diez pasajeros de expedición zarpan de aquí. El pueblo lo levantó una colonia penal cuyos presos talaban el bosque para leña y tendieron un ferrocarril para acarrearla; esa línea lleva hoy turistas.|Ushuaïa est la ville la plus australe du monde et le port d'où part la plupart des voyages vers l'Antarctique : environ neuf passagers d'expédition sur dix embarquent ici. Le bourg fut bâti par une colonie pénitentiaire dont les détenus coupaient la forêt pour le chauffage et posèrent une voie ferrée pour la transporter ; cette ligne promène aujourd'hui des touristes.|ウシュアイアは世界最南の街であり、南極へ向かう航海のほとんどがここから出る。探検航海の乗客のおよそ十人に九人がこの港で乗り込む。町を作ったのは流刑地で、囚人が薪のために森を伐り、それを運ぶ鉄道を敷いた。その線路はいま観光客を乗せている。",
    [prop("Beagle Channel Jetty|Muelle del canal Beagle|Jetée du canal Beagle|ビーグル水道の桟橋", 280, 58),
     prop("King Crab Cannery|Conservera de centolla|Conserverie de crabe royal|タラバガニの加工場", 260, 54)],
  ),

  // ---------------------------------------------------------------------
  // oce — オセアニアと太平洋
  // ---------------------------------------------------------------------
  perth: city(
    "Perth|Perth|Perth|パース",
    115.86, -31.95, "oce", "skyline", "harbour", "l",
    "The city that left its lights on|La ciudad que dejó las luces encendidas|La ville qui laissa ses lumières allumées|明かりを消さなかった街",
    "Perth is one of the most isolated cities on earth: the nearest town of comparable size, Adelaide, is 2,100 kilometres away across the desert. In February 1962 it left its street lamps and porch lights burning as John Glenn passed overhead in orbit; he saw the glow, and it has been the City of Light ever since.|Perth es de las ciudades más aisladas del mundo: la población de tamaño comparable más próxima, Adelaida, está a 2.100 kilómetros de desierto. En febrero de 1962 dejó encendidas farolas y luces de porche mientras John Glenn pasaba en órbita; él vio el resplandor, y desde entonces se la llama la Ciudad de la Luz.|Perth est l'une des villes les plus isolées du monde : la localité de taille comparable la plus proche, Adélaïde, est à 2 100 kilomètres de désert. En février 1962, elle laissa allumés ses réverbères et ses lampes de perron au passage de John Glenn en orbite ; il vit la lueur, et on l'appelle depuis la Cité de la lumière.|パースは地上でも指折りに孤立した街で、同じくらいの規模で最も近いアデレードまで、砂漠を越えて2100kmある。1962年2月、軌道を回るジョン・グレンが上空を通るあいだ、街は街灯も玄関灯も点けたままにした。彼にはその光が見え、以来ここは「光の街」と呼ばれている。",
    [prop("Fremantle Wool Store|Almacén de lana de Fremantle|Entrepôt à laine de Fremantle|フリーマントルの羊毛倉庫", 290, 60),
     prop("Swan River Jetty|Muelle del río Swan|Jetée de la Swan|スワン川の桟橋", 270, 56)],
  ),
  sydney: city(
    "Sydney|Sídney|Sydney|シドニー",
    151.21, -33.87, "oce", "bridge_w", "harbour", "r",
    "Shells cut from a single sphere|Cáscaras cortadas de una misma esfera|Des voiles taillées dans une même sphère|ひとつの球から切り出した殻",
    "The Opera House could not be built as drawn until Utzon saw that every shell could be cut from the surface of one sphere of 75 metres' radius, which meant the ribs could be cast from a handful of moulds. It was budgeted at seven million Australian dollars and cost 102 million, paid off by a state lottery rather than by taxes.|La Ópera no podía construirse como estaba dibujada hasta que Utzon vio que cada cáscara podía recortarse de la superficie de una misma esfera de 75 metros de radio, lo que permitió fundir las costillas con unos pocos moldes. Se presupuestó en siete millones de dólares australianos y costó 102, pagados con una lotería estatal y no con impuestos.|L'Opéra était irréalisable tel que dessiné jusqu'à ce qu'Utzon voie que chaque voile pouvait être découpée dans la surface d'une même sphère de 75 mètres de rayon, ce qui permit de couler les nervures avec quelques moules. Devisé à sept millions de dollars australiens, il en coûta 102, réglés par une loterie d'État plutôt que par l'impôt.|オペラハウスは図面のままでは建てられなかった。ウツソンが、あの殻はどれも半径75mのひとつの球面から切り出せると気づいてはじめて、わずかな型でリブを打てるようになった。予算は700万豪ドル、実際は1億200万かかり、税ではなく州の宝くじで賄われた。",
    [prop("Circular Quay Berth|Atracadero de Circular Quay|Poste d'accostage de Circular Quay|サーキュラー・キーの発着場", 320, 66),
     prop("Harbour Bridge Toll|Peaje del puente|Péage du pont|ハーバーブリッジの通行料", 300, 62)],
  ),
  auckland: city(
    "Auckland|Auckland|Auckland|オークランド",
    174.76, -36.85, "oce", "peak_w", "island", "r",
    "A city built on fifty volcanoes|Una ciudad sobre cincuenta volcanes|Une ville bâtie sur cinquante volcans|五十の火山の上の街",
    "The city sits on a field of about 53 separate volcanoes, each of which erupted once and then went quiet; the youngest, Rangitoto, rose out of the sea around 1400 and was watched from the shore by Māori living there. Aucklanders own more boats per head than any other city, which is where the name City of Sails comes from.|La ciudad se asienta sobre un campo de unos 53 volcanes distintos, cada uno de los cuales entró en erupción una sola vez y se apagó; el más joven, Rangitoto, emergió del mar hacia 1400 y fue visto desde la orilla por los maoríes que allí vivían. Sus habitantes tienen más barcos por persona que los de ninguna otra ciudad: de ahí lo de Ciudad de las Velas.|La ville repose sur un champ d'environ 53 volcans distincts, chacun ayant fait éruption une seule fois avant de s'éteindre ; le plus jeune, Rangitoto, sortit de la mer vers 1400 sous les yeux des Māori qui vivaient là. Ses habitants possèdent plus de bateaux par tête que ceux de toute autre ville, d'où le nom de Cité des voiles.|この街はおよそ53の別々の火山が並ぶ土地の上にある。どれも一度だけ噴いて静まったもので、いちばん若いランギトトは1400年頃に海から現れ、そこに住んでいたマオリが岸から見ていた。住民一人あたりの船の数は世界のどの都市より多く、「帆の街」の名はそこから来ている。",
    [prop("Viaduct Marina Berth|Amarre de la marina|Anneau de la marina|マリーナの係留権", 300, 62),
     prop("Volcano Cone Farm|Granja en el cono volcánico|Ferme sur le cône volcanique|火山丘の牧場", 260, 54)],
  ),
  suva: city(
    "Suva|Suva|Suva|スバ",
    178.44, -18.14, "oce", "ship_w", "tropics", "r",
    "Canoes faster than the ships that came|Canoas más veloces que los barcos que llegaron|Des pirogues plus rapides que les navires venus|訪れた船より速かった舟",
    "Fijian drua, double-hulled sailing canoes up to thirty metres long, were among the fastest craft in the world before engines and could leave the European trading ships behind. Between 1879 and 1916 some 60,000 indentured labourers were brought from India to cut sugar cane, and their descendants are now more than a third of the country.|Las drua fiyianas, canoas de doble casco de hasta treinta metros, estaban entre las embarcaciones más rápidas del mundo antes de los motores y dejaban atrás a los barcos europeos que venían a comerciar. Entre 1879 y 1916 se trajeron unos 60.000 trabajadores contratados desde la India para cortar caña, y sus descendientes son hoy más de un tercio del país.|Les drua fidjiennes, pirogues à deux coques longues jusqu'à trente mètres, comptaient parmi les embarcations les plus rapides du monde avant les moteurs et distançaient les navires marchands européens. Entre 1879 et 1916, quelque 60 000 travailleurs sous contrat furent amenés d'Inde pour couper la canne, et leurs descendants forment aujourd'hui plus du tiers du pays.|フィジーのドルアは全長30mに達する双胴の帆走カヌーで、機関が現れる前は世界最速級の船だった。交易に来たヨーロッパ船を置き去りにしたという。1879年から1916年にかけて、サトウキビを刈るためインドから約6万人の年季労働者が連れて来られ、その子孫はいま国民の三分の一を超える。",
    [prop("Municipal Market Stall|Puesto del mercado municipal|Étal du marché municipal|市営市場の店", 260, 54),
     prop("Copra Shed Wharf|Muelle del cobertizo de copra|Quai du hangar à coprah|コプラ倉庫の岸壁", 280, 58)],
  ),
  papeete: city(
    "Papeete|Papeete|Papeete|パペーテ",
    -149.57, -17.54, "oce", "palm_w", "island", "r",
    "Navigation without instruments|Navegar sin instrumentos|Naviguer sans instruments|器具を持たない航海術",
    "Polynesian navigators crossed thousands of kilometres by reading swells, stars and the flight of birds, and in 1976 the canoe Hōkūleʻa sailed from Hawaii to Tahiti with no instruments at all to prove it could still be done. Almost nobody in Polynesia still held the whole system by then, so the crew was guided by Mau Piailug, a navigator from a small island in Micronesia.|Los navegantes polinesios cruzaban miles de kilómetros leyendo el oleaje, las estrellas y el vuelo de las aves, y en 1976 la canoa Hōkūleʻa navegó de Hawái a Tahití sin instrumento alguno para demostrar que aún podía hacerse. Para entonces casi nadie en la Polinesia conservaba el sistema entero, y la guio Mau Piailug, un navegante de una islita de Micronesia.|Les navigateurs polynésiens franchissaient des milliers de kilomètres en lisant la houle, les étoiles et le vol des oiseaux, et en 1976 la pirogue Hōkūleʻa rallia Hawaï à Tahiti sans le moindre instrument pour montrer que c'était encore possible. Presque plus personne en Polynésie ne détenait alors le système complet : c'est Mau Piailug, navigateur d'une petite île de Micronésie, qui la guida.|ポリネシアの航海者はうねりと星と鳥の飛び方を読んで何千kmも渡った。1976年、カヌー「ホクレア」はハワイからタヒチまで、器具をひとつも使わずに航海してそれが今も可能だと示した。当時その体系をまるごと保つ者はポリネシアにほとんど残っておらず、導いたのはミクロネシアの小島の航海者マウ・ピアイルグだった。",
    [prop("Black Pearl Farm|Granja de perlas negras|Ferme de perles noires|黒真珠の養殖場", 300, 62),
     prop("Copra Trading Store|Tienda de copra|Comptoir de coprah|コプラの取引所", 260, 54)],
  ),
};

/**
 * 路線(90本)。陸続きの都市どうしは陸路、海をまたぐものは航路(第3要素 "sea")。
 *
 * ユーラシアとアフリカは陸でつながっているので、その中は鉄道で結んである
 * (オリエント急行・シベリア鉄道・シナイ半島など)。
 * アメリカ・オセアニア・島の都市へは、行き来はすべて船になる。
 *
 * 日付変更線は投影上またげないため、太平洋は盤面の左端(ホノルル・パペーテ)と
 * 右端(オークランド・スバ)に分かれる。両者を直接結ぶ辺は張らない。
 */
export const WORLD_EDGES = [
  // ヨーロッパ
  ["reykjavik", "london", "sea"],
  ["london", "amsterdam", "sea"],
  ["london", "paris", "sea"],
  ["london", "lisbon", "sea"],
  ["paris", "amsterdam"],
  ["paris", "barcelona"],
  ["amsterdam", "prague"],
  ["prague", "vienna"],
  ["prague", "stockholm"],
  // ↓ このあと何本か並びを入れ替えてある。経路が先に斜めへ折れるかは
  //    **並び順の偶奇**で決まるので、順番を変えると線の形が変わる。
  //    海の上を通っていた線を、隣とだけ入れ替えて陸に乗せている。
  ["stockholm", "moscow"],
  ["vienna", "rome"],
  ["vienna", "istanbul"],
  ["rome", "athens", "sea"],
  ["athens", "istanbul"],
  ["barcelona", "lisbon"], // 入れ替え済み(31px → 0px)
  ["istanbul", "moscow"],

  // ヨーロッパから陸続きの東へ(オリエント急行・シベリア鉄道)
  ["moscow", "samarkand"],
  ["istanbul", "jerusalem"], // 入れ替え済み(59px → 0px)
  ["moscow", "ulaanbaatar"],

  // ヨーロッパ ↔ アフリカ
  ["barcelona", "marrakesh", "sea"],
  ["rome", "cairo", "sea"],
  ["lisbon", "dakar", "sea"],

  // 大西洋を渡る
  ["london", "newyork", "sea"],
  ["reykjavik", "toronto", "sea"],
  ["lisbon", "havana", "sea"],
  ["dakar", "salvador", "sea"],
  ["capetown", "rio", "sea"],

  // アフリカと中東
  ["marrakesh", "timbuktu"],
  ["marrakesh", "cairo"],
  ["dakar", "timbuktu"],
  ["timbuktu", "lagos"],
  ["lagos", "capetown", "sea"],
  ["cairo", "addisababa"], // 入れ替え済み(27px → 0px)
  ["cairo", "jerusalem"],
  ["addisababa", "nairobi"],
  // ナイロビは64px内陸で、ザンジバル行きの航路が全長87pxまるごと陸を通っていた。
  // 実在のウガンダ鉄道どおりモンバサまで陸路で出て、そこから船にする。
  ["nairobi", "mombasa"],
  ["nairobi", "capetown"],

  // 中東 ↔ アジア
  ["jerusalem", "isfahan"],
  // イスファハンは53px内陸。実在の鉄道どおりバンダレ・アッバースまで陸路で出て、
  // ホルムズ海峡だけを船で渡る。
  ["isfahan", "bandarabbas"],
  ["zanzibar", "dubai", "sea"],

  // アジア
  ["isfahan", "samarkand"],
  ["samarkand", "delhi"],
  ["delhi", "mumbai"],
  // デリー—バンコクは直接つながない。**陸路でも航路でも誤りになる**ためで、
  // 陸路だとベンガル湾を130px横切り、航路にするとデリーが99px内陸なので
  // 今度は陸を77px通る。実在の鉄道どおりコルカタで区切り、
  // そこから先(ベンガル湾)を航路にする。航路は末尾に足してある。
  ["delhi", "kolkata"],
  ["dubai", "mumbai", "sea"],
  ["mumbai", "singapore", "sea"],
  ["bangkok", "singapore"],
  ["bangkok", "hanoi"],
  ["hanoi", "hongkong"],
  ["hongkong", "singapore", "sea"],
  ["hongkong", "shanghai"],
  ["shanghai", "beijing"],
  ["shanghai", "seoul", "sea"],
  ["beijing", "seoul", "sea"],
  ["beijing", "ulaanbaatar"],
  ["seoul", "tokyo", "sea"],
  ["singapore", "jakarta", "sea"],

  // オセアニアへ
  ["jakarta", "perth", "sea"],
  ["tokyo", "sydney", "sea"],
  ["capetown", "perth", "sea"],

  // オセアニアと太平洋
  ["perth", "sydney"],
  ["sydney", "auckland", "sea"],
  ["sydney", "suva", "sea"],
  ["auckland", "suva", "sea"],
  ["papeete", "honolulu", "sea"],
  ["papeete", "lima", "sea"],

  // 北アメリカ
  ["honolulu", "sanfrancisco", "sea"],
  ["honolulu", "vancouver", "sea"],
  ["vancouver", "chicago"],
  ["vancouver", "sanfrancisco"], // 入れ替え済み(17px → 0px)
  ["sanfrancisco", "mexicocity"], // 入れ替え済み(118px → 0px)
  ["sanfrancisco", "chicago"],
  ["chicago", "toronto"],
  ["chicago", "neworleans"],
  ["newyork", "neworleans"], // 入れ替え済み(42px → 0px)
  ["toronto", "newyork"],
  ["neworleans", "havana", "sea"],
  // メキシコシティは24px内陸(実際の港はベラクルス)。船はベラクルスに着け、
  // そこから内陸へは陸路にする。
  ["havana", "veracruz", "sea"],

  // 北アメリカ ↔ 南アメリカ
  // ダリエン地峡で道が途切れており鉄道は無いので航路。ただしメキシコシティは
  // 内陸なので、港のベラクルスから出す。
  ["veracruz", "cartagena", "sea"],
  ["havana", "cartagena", "sea"],

  // 南アメリカ
  ["cartagena", "lima"],
  ["cartagena", "manaus"],
  ["manaus", "lima"],
  // マナウス—ベレンはアマゾン川そのものだが、**盤面に川は描かれていない**ので
  // 一面の陸に見える。そこへ破線の航路を引くと壊れて見えるだけなので、
  // 陸路として引く(全長120pxが100%陸の上)。アマゾン河口のベレンで区切ってある。
  ["manaus", "belem"],
  ["lima", "cusco"],
  ["salvador", "rio"], // 入れ替え済み(52px → 0px)
  ["rio", "buenosaires"], // 入れ替え済み(177px → 8px)
  ["cusco", "buenosaires"],
  ["buenosaires", "ushuaia", "sea"],
  ["ushuaia", "lima", "sea"],

  // ここから下は**末尾に足すこと。** 途中に挿すと、それより後ろの路線の
  // 添字がずれて偶奇が変わり、無関係な路線の折れ方まで変わる
  // (`use-board-layout.ts` の `diagonalFirst` が `edgeIndex % 2` で決まるため)。
  ["kolkata", "bangkok", "sea"], // デリー—バンコクの後半。ベンガル湾を渡る
  ["mombasa", "zanzibar", "sea"], // ナイロビ—ザンジバルの後半。短い海峡を渡る
  ["belem", "salvador"], // マナウス—サルバドールの後半。沿岸だが盤面では陸なので陸路
  ["bandarabbas", "dubai", "sea"], // イスファハン—ドバイの後半。ホルムズ海峡を渡る
  ["veracruz", "mexicocity"], // 港から首都へ。実在の鉄道
];
