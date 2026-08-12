/**
 * バリの都市と路線。
 *
 * **バリに鉄道は無いので、ここは道の町として繋ぐ**(乗り合いバス・車道)。
 * ヌサペニダ・ヌサレンボンガンへは実在の船便(サヌール/パダンバイ発着)で結ぶ。
 *
 * 32都市43路線。南部6・中部/ウブド5・山岳/湖5・東部6・北部4・西部/島嶼6。
 * 観光地の一覧にしないため、南部に偏らせず北岸(シガラジャ・ロビナ)と
 * 山あい(キンタマーニ・ムンドゥック)を厚めにしてある。
 *
 * 経度・緯度は実際の値。投影の範囲は geography.mjs の BALI_PROJ を参照。
 *
 * `seg`(geography.mjsで110)は、この43路線を投影後の距離で実測して決めた。
 * 最長はロヴィナ〜ギリマヌッ(903px、8マス)とタナロット〜ヌガラ(853px、8マス)で、
 * どちらも実在する北岸・西岸の一本道の長い区間そのもの。5マス超は
 * この2本とトゥランベン〜クブタンブハン(702px、6マス)の計3本のみで、
 * 「実在するかどうかで決める」の原則で残してある(詳細はREGISTER.md)。
 *
 * ## `mark`(12種)
 *
 * meru(寺院)/ terrace(棚田)/ volcano(火山)/ lake(湖)/ surf(サーフ)/
 * beach(浜)/ dive(潜水)/ boat(舟・港)/ craft(工芸)/ offering(供物)/
 * palace(王宮・行政)/ harvest(農産物・塩)。詳しくは art.mjs 冒頭の表を参照。
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const BALI_CITIES = {
  // ---------------------------------------------------------------------
  // sel — 南部
  // ---------------------------------------------------------------------
  denpasar: city(
    "Denpasar|Denpasar|Denpasar|デンパサール",
    115.2192, -8.6705, "sel", "palace", "royaltown", "r",
    "The market that became a capital|El mercado que se hizo capital|Le marché devenu capitale|市場から州都になった町",
    "On 20 September 1906 several hundred members of the Badung court, dressed in white cremation clothes, walked out of their palace and into Dutch gunfire rather than surrender — a mass ritual suicide called a puputan. The market that grew up north of that palace gave the city its name (denpasar, \"north market\"), and it became Bali's capital only in 1958, when the seat of government moved from Singaraja.|El 20 de septiembre de 1906, varios cientos de miembros de la corte de Badung, vestidos de blanco de cremación, salieron de su palacio hacia los fusiles holandeses antes que rendirse: un suicidio ritual en masa llamado puputan. El mercado que creció al norte de ese palacio dio nombre a la ciudad (denpasar, «mercado del norte»), que solo se convirtió en capital de Bali en 1958, cuando el gobierno se trasladó desde Singaraja.|Le 20 septembre 1906, plusieurs centaines de membres de la cour de Badung, vêtus de blanc de crémation, sortirent de leur palais pour marcher vers les fusils néerlandais plutôt que de se rendre — un suicide rituel collectif appelé puputan. Le marché qui se développa au nord de ce palais donna son nom à la ville (denpasar, « marché du nord »), qui ne devint la capitale de Bali qu'en 1958, quand le siège du gouvernement fut transféré depuis Singaraja.|1906年9月20日、バドゥン王宮の数百人が白い葬儀の装束をまとって宮殿を出、降伏するよりオランダ軍の銃口へ歩み入った。集団による儀礼的な自死で、ププタンと呼ばれる。その宮殿の北に立った市場がこの町の名の由来で(デンパサール=「北の市場」)、州都がシンガラジャからここへ移ったのは1958年のことである。",
    [prop("Puri Pemecutan Gate|Puerta del Puri Pemecutan|Porte du Puri Pemecutan|プリ・プメチュタンの門", 260, 54),
     prop("Bajra Sandhi Monument|Monumento Bajra Sandhi|Monument Bajra Sandhi|バジラ・サンディ記念塔", 300, 62)],
  ),
  kuta: city(
    "Kuta|Kuta|Kuta|クタ",
    115.1729, -8.7183, "sel", "surf", "surfbeach", "l",
    "Where the surfers never quite left|Donde los surfistas nunca se fueron del todo|Là où les surfeurs ne repartirent jamais vraiment|サーファーが居着いた町",
    "The beach break here is where Australian surfers on their way to somewhere else stopped in the 1930s and never entirely left, turning a fishing and trading village into Bali's first resort town. A memorial in the centre of town lists the 202 people killed in the 2002 bombing of two nightclubs a short walk from the sand, a quiet corner most visitors now pass without knowing why it's there.|Aquí, en los años 30, surfistas australianos de paso se detuvieron y ya no se fueron del todo, convirtiendo una aldea de pesca y comercio en el primer centro turístico de Bali. Un monumento en el centro recuerda a las 202 personas muertas en el atentado de 2002 contra dos discotecas a pocos pasos de la arena, un rincón tranquilo que hoy casi nadie sabe por qué está ahí.|C'est ici que des surfeurs australiens de passage s'arrêtèrent dans les années 1930 sans jamais tout à fait repartir, transformant un village de pêche et de commerce en première station balnéaire de Bali. Un mémorial au centre-ville rappelle les 202 personnes tuées lors de l'attentat de 2002 contre deux boîtes de nuit à quelques pas du sable, un coin tranquille que la plupart des visiteurs traversent aujourd'hui sans savoir pourquoi il est là.|1930年代、たまたま立ち寄ったオーストラリア人サーファーたちがそのまま居着き、漁業と交易の村をバリ最初のリゾートの町に変えた。町の中心の慰霊碑には、浜からすぐの二軒のナイトクラブを狙った2002年の爆弾事件で亡くなった202人の名が刻まれている。いまでは、なぜそこにあるのか知らないまま通り過ぎる観光客の方が多い静かな一角である。",
    [prop("Mads Lange Trading Post|Puesto comercial de Mads Lange|Comptoir de Mads Lange|マッツ・ランゲの交易所", 240, 50),
     prop("Bombing Memorial Wall|Muro conmemorativo del atentado|Mur du mémorial de l'attentat|爆弾事件の慰霊壁", 220, 46)],
  ),
  canggu: city(
    "Canggu|Canggu|Canggu|チャングー",
    115.1385, -8.6478, "sel", "surf", "surfbeach", "r",
    "Rice paddies that became co-working cafés|Arrozales convertidos en cafés de coworking|Des rizières devenues cafés de coworking|コワーキングカフェになった田",
    "Rice paddies here were still being harvested by hand when the first surf breaks got English names in the 1990s; twenty years later the same fields sat between co-working cafés advertising fibre-optic internet, sold or leased out by farming families as land prices outran what rice could ever earn. The subak that once managed this water still exists, now irrigating a shrinking patchwork between the developments.|Aquí aún se segaba el arroz a mano cuando las primeras rompientes de surf recibieron nombres en inglés en los años 90; veinte años después, esos mismos campos quedaron entre cafés de coworking que anunciaban fibra óptica, vendidos o alquilados por familias campesinas cuando el precio del suelo superó lo que el arroz podría dar jamás. El subak que gestionaba esta agua sigue existiendo, regando ahora un mosaico cada vez más pequeño entre las urbanizaciones.|On moissonnait encore le riz à la main ici quand les premiers spots de surf reçurent des noms anglais dans les années 1990 ; vingt ans plus tard, ces mêmes champs se retrouvaient coincés entre des cafés de coworking vantant la fibre optique, vendus ou loués par des familles d'agriculteurs quand le prix du terrain dépassa ce que le riz pourrait jamais rapporter. Le subak qui gérait cette eau existe toujours, irriguant un damier de plus en plus réduit entre les constructions.|1990年代、最初のサーフポイントに英語の名が付いた頃、ここではまだ手で稲刈りをしていた。二十年後、その同じ田は光ファイバーを謳うコワーキングカフェに挟まれ、地価が米の稼ぎをはるかに超えたことで農家は土地を売るか貸すかした。この水を差配してきたスバックはいまも存在し、開発地に挟まれて年々小さくなる田をつないでいる。",
    [prop("Batu Bolong Surf Break|Rompiente de Batu Bolong|Spot de surf de Batu Bolong|バトゥ・ボロンのサーフポイント", 260, 54),
     prop("Subak Water Gate|Compuerta del subak|Vanne du subak|スバックの取水口", 230, 48)],
  ),
  jimbaran: city(
    "Jimbaran|Jimbaran|Jimbaran|ジンバラン",
    115.1614, -8.7906, "sel", "beach", "quietbeach", "l",
    "A beach shared with the runway|Una playa compartida con la pista|Une plage partagée avec la piste|滑走路と分け合う浜",
    "The narrow strip of land here is barely wide enough to hold both the fishing beach and the runway of Bali's only international airport, built straight across the isthmus in 1969 rather than around it. Every evening the day's catch goes straight from outrigger boats pulled up on the sand to grills lit along the same beach, seated at tables cleared away again by morning.|La franja de tierra aquí apenas tiene ancho para la playa pesquera y la pista del único aeropuerto internacional de Bali, construida en 1969 justo a través del istmo en vez de rodearlo. Cada noche la pesca del día pasa directo de las barcas varadas en la arena a las parrillas encendidas en la misma playa.|La bande de terre ici est à peine assez large pour contenir à la fois la plage de pêche et la piste de l'unique aéroport international de Bali, construite en 1969 tout droit à travers l'isthme plutôt qu'autour. Chaque soir, la pêche du jour passe directement des pirogues échouées sur le sable aux grils allumés sur cette même plage.|この細い陸地には、漁の浜とバリ唯一の国際空港の滑走路がやっと収まる。1969年、滑走路は地峡を迂回せずまっすぐ横切って造られた。毎晩、その日の漁は砂浜に引き上げたアウトリガー舟から、同じ浜に灯る炭火焼きの網へ直行する。席は朝にはまたすっかり片付けられている。",
    [prop("Sunset Grill Row|Fila de parrillas al atardecer|Rangée de grils au coucher du soleil|夕日の炭火焼き通り", 250, 52),
     prop("Fish Auction Shed|Cobertizo de subasta de pescado|Hangar de la criée|魚のせり小屋", 220, 46)],
  ),
  uluwatu: city(
    "Uluwatu|Uluwatu|Uluwatu|ウルワトゥ",
    115.0857, -8.8291, "sel", "meru", "cliffcove", "l",
    "The cliff where monkeys collect a toll|El acantilado donde los monos cobran peaje|La falaise où les singes prélèvent un péage|猿が通行料を取る断崖",
    "The temple stands on a cliff seventy metres above the surf, one of the sea-facing shrines said to guard Bali's coastline from evil spirits, and its resident macaques are practised enough at stealing sunglasses and phones that a stallholder nearby will trade them back for a bag of peanuts. Below the cliff, a right-hand break considered one of the best in Indonesia was surfed by almost no one before the 1970s, when a first paved road finally reached this end of the peninsula.|El templo se alza en un acantilado setenta metros sobre el oleaje, uno de los santuarios frente al mar que se dice protegen la costa de Bali de espíritus malignos, y sus macacos residentes son tan hábiles robando gafas de sol y móviles que un vendedor cercano los cambia por una bolsa de cacahuetes. Bajo el acantilado, una ola derecha de las mejores de Indonesia casi nadie la surfeaba antes de los años 70.|Le temple se dresse sur une falaise à soixante-dix mètres au-dessus du ressac, l'un des sanctuaires tournés vers la mer censés protéger la côte de Bali des mauvais esprits, et ses macaques résidents sont assez habiles pour voler lunettes de soleil et téléphones qu'un vendeur voisin les échange contre un sachet de cacahuètes. Sous la falaise, une droite parmi les meilleures d'Indonésie n'était surfée par presque personne avant les années 1970.|寺院は波の70メートル上の断崖に立つ。バリの海岸を悪しき霊から守るとされる、海に向いた寺院のひとつである。住み着いたマカクはサングラスや携帯電話を奪う手練れで、近くの売店が落花生の袋と交換に取り返してくれる。崖の下には、インドネシア屈指ともいわれるライトブレイクがあるが、1970年代に舗装道路が届くまで、ほとんど誰も乗っていなかった。",
    [prop("Uluwatu Cliff Shrine|Santuario del acantilado de Uluwatu|Sanctuaire de la falaise d'Uluwatu|ウルワトゥ断崖の祠", 300, 62),
     prop("Right-Hand Reef Break|Ola derecha del arrecife|Droite du récif|右回りのリーフブレイク", 270, 56)],
  ),
  sanur: city(
    "Sanur|Sanur|Sanur|サヌール",
    115.2624, -8.6788, "sel", "boat", "quietbeach", "r",
    "The hotel that capped every building after it|El hotel que limitó todos los edificios después|L'hôtel qui plafonna tous les bâtiments suivants|以後の建物の高さを決めたホテル",
    "Bali's first hotel for foreign tourists opened here in 1966, built with Japanese war-reparations money, and its ten storeys towered so far over anything else on the island that the backlash led directly to a law still in force today limiting new buildings to the height of a coconut palm. Boats to Nusa Penida and Nusa Lembongan still leave from the same stretch of beach each morning.|El primer hotel de Bali para turistas extranjeros abrió aquí en 1966, pagado con fondos de reparaciones de guerra japonesas, y sus diez plantas se alzaban tanto sobre todo lo demás en la isla que la reacción llevó a una ley, aún vigente, que limita los edificios nuevos a la altura de una palmera.|Le premier hôtel de Bali pour touristes étrangers ouvrit ici en 1966, financé par les réparations de guerre japonaises, et ses dix étages dominaient si nettement tout le reste de l'île que la réaction mena à une loi, toujours en vigueur, limitant les nouveaux bâtiments à la hauteur d'un cocotier.|バリで外国人観光客向けの最初のホテルは1966年、日本の戦争賠償金で建てられた。その十階建ては島のほかの何よりも高くそびえ、その反発がそのまま、いまも有効な「新しい建物はヤシの木の高さまで」という法律につながった。ヌサペニダ・ヌサレンボンガンへの船は、いまも毎朝同じ浜から出ている。",
    [prop("Ten-Storey Beach Hotel|Hotel de playa de diez plantas|Hôtel de plage à dix étages|十階建ての海辺のホテル", 290, 60),
     prop("Island Boat Pier|Muelle de las lanchas|Embarcadère des bateaux|島行きの渡し場", 240, 50)],
  ),

  // ---------------------------------------------------------------------
  // ubu — 中部・ウブド
  // ---------------------------------------------------------------------
  ubud: city(
    "Ubud|Ubud|Ubud|ウブド",
    115.2625, -8.5069, "ubu", "craft", "artvillage", "l",
    "The healer's village that painting made famous|El pueblo sanador que la pintura hizo famoso|Le village guérisseur rendu célèbre par la peinture|薬の村が絵で知られるようになるまで",
    "The name comes from ubad, the Balinese word for medicine, after healers who worked the springs here long before painters arrived. In 1936 the Balinese royal family and the German painter Walter Spies founded the Pita Maha artists' collective, and the crowded, everyday-life style it taught is still what most people picture as \"Balinese painting\".|El nombre viene de ubad, la palabra balinesa para medicina, por los sanadores que trabajaban en estos manantiales mucho antes de que llegaran los pintores. En 1936 la familia real balinesa y el pintor alemán Walter Spies fundaron el colectivo de artistas Pita Maha, y el estilo abigarrado y cotidiano que enseñó sigue siendo lo que la mayoría imagina como «pintura balinesa».|Le nom vient d'ubad, le mot balinais pour médecine, d'après les guérisseurs qui travaillaient à ces sources bien avant l'arrivée des peintres. En 1936, la famille royale balinaise et le peintre allemand Walter Spies fondèrent le collectif d'artistes Pita Maha, dont le style foisonnant et proche du quotidien reste ce que l'on imagine aujourd'hui sous le nom de « peinture balinaise ».|この地の名は、バリ語で薬を意味する「ウバッド」に由来する。画家たちが来るよりずっと前から、この泉のほとりで治療師たちが働いていたからである。1936年、バリの王族とドイツ人画家ヴァルター・シュピースが美術家集団「ピタ・マハ」を興し、そこで教えられた、日々の暮らしを細部まで描き込む画風が、いまも多くの人が思い浮かべる「バリ絵画」そのものである。",
    [prop("Puri Saren Royal Court|Puri Saren (corte real)|Cour royale du Puri Saren|プリ・サレンの王宮", 280, 58),
     prop("Neka Art Museum|Museo de Arte Neka|Musée d'art Neka|ネカ美術館", 250, 52)],
  ),
  tegalalang: city(
    "Tegalalang|Tegalalang|Tegalalang|テガララン",
    115.2782, -8.4319, "ubu", "terrace", "riceterrace", "r",
    "Terraces older than the swings above them|Terrazas más viejas que los columpios de arriba|Des terrasses plus vieilles que les balançoires|ブランコより古い棚田",
    "The terraces climbing this valley are irrigated by a subak whose channels and water-sharing rules go back centuries, dividing every farmer's turn at the water down to the hour. In the last decade, young entrepreneurs have built rope swings and bamboo nests on the slopes above the rice for tourists to photograph, an income that in some years now outearns the harvest below it.|Las terrazas que trepan por este valle las riega un subak cuyos canales y turnos de agua se remontan siglos, repartiendo el turno de cada agricultor hasta la hora. En la última década, jóvenes emprendedores han construido columpios de cuerda sobre el arroz, un ingreso que en algunos años supera ya a la cosecha de abajo.|Les terrasses qui grimpent cette vallée sont irriguées par un subak dont les canaux et le partage de l'eau remontent à des siècles, répartissant le tour de chaque paysan à l'heure près. Ces dix dernières années, de jeunes entrepreneurs ont construit des balançoires à corde au-dessus du riz, un revenu qui certaines années dépasse déjà la récolte en contrebas.|この谷を上る棚田は、何世紀も前からの水路と時間単位で決めた水の順番を持つスバックによって灌漑されている。この十年、若い起業家たちが田の上の斜面にロープのブランコや竹の巣を組み、観光客に写真を撮らせる商売を始めた。年によっては、その稼ぎが下の田の収穫を上回る。",
    [prop("Subak Water Schedule Post|Poste del turno de agua del subak|Poteau des tours d'eau du subak|スバックの水番の杭", 240, 50),
     prop("Bamboo Nest Swing|Columpio nido de bambú|Balançoire-nid en bambou|竹の巣のブランコ", 260, 54)],
  ),
  celuk: city(
    "Celuk|Celuk|Celuk|チュルック",
    115.2814, -8.5661, "ubu", "craft", "artvillage", "l",
    "Where the forging and the filigree divide|Donde se separan la forja y la filigrana|Où se séparent forge et filigrane|鍛冶と透かし細工が分かれる村",
    "Silverwork here is split by long custom: men in the workshops hammer and forge the base of a piece, while the fine filigree, coiled from wire thinner than a hair, is done almost entirely by women working at the same low table. A shop with no name on the street can still be a family's fourth generation in the same trade, its silver sold on to bigger stores elsewhere on the island under someone else's brand.|Aquí la platería se reparte por una vieja costumbre: los hombres martillan y forjan la base de la pieza, mientras la filigrana fina, enrollada con alambre más delgado que un cabello, la hacen casi siempre las mujeres en la misma mesa baja. Una tienda sin nombre puede ser la cuarta generación de una familia en el mismo oficio.|Ici, l'orfèvrerie se répartit selon une vieille coutume : les hommes martèlent et forgent la base de la pièce, tandis que la filigrane fine, enroulée à partir d'un fil plus mince qu'un cheveu, est presque toujours l'œuvre des femmes à la même table basse. Une échoppe sans enseigne peut être la quatrième génération d'une famille dans le même métier.|ここの銀細工は昔からの分業で成り立つ。工房の男たちが地金を打ち鍛え、髪の毛より細い針金を巻く繊細な透かし細工は、同じ低い作業台でほとんど女たちが手がける。通りの看板もない店が、実は同じ商売を四代続ける一族だったりする。その銀は、島の別の場所の大きな店で他人の名を付けて売られていくこともある。",
    [prop("Filigree Workbench|Banco de filigrana|Établi de filigrane|透かし細工の作業台", 250, 52),
     prop("Fourth-Generation Workshop|Taller de cuarta generación|Atelier de quatrième génération|四代続く工房", 270, 56)],
  ),
  goagajah: city(
    "Goa Gajah|Goa Gajah|Goa Gajah|ゴアガジャ",
    115.2926, -8.5228, "ubu", "meru", "templegate", "r",
    "A demon's mouth for a door|La boca de un demonio por puerta|La bouche d'un démon en guise de porte|鬼の口が扉になる洞窟",
    "The doorway into the meditation cave is the open mouth of a demon face carved directly into the rock in the 11th century, and the niches inside were cut by hand deep enough for a monk to sit cross-legged out of the weather. Despite the name (\"Elephant Cave\"), no elephant statue or bone has ever been found here — historians think it comes from a mistranslated reference to the nearby Petanu river.|La entrada a la cueva de meditación es la boca abierta de una cara de demonio tallada en la roca en el siglo XI, y los nichos interiores se excavaron a mano lo bastante hondo para un monje. Pese al nombre («cueva del elefante»), nunca se ha hallado aquí estatua ni hueso de elefante.|L'entrée de la grotte de méditation est la bouche ouverte d'un visage de démon sculpté dans la roche au XIe siècle, et les niches intérieures furent creusées à la main assez profondément pour un moine. Malgré son nom (« grotte de l'Éléphant »), aucune statue ni ossement d'éléphant n'y a jamais été trouvé.|瞑想窟の入口は、11世紀に岩肌へ直接刻まれた鬼の顔の開いた口である。内部の壁龕は、僧が結跏趺坐して雨風をしのげるだけの深さに手で掘られた。「象の洞窟」という名にもかかわらず、象の像や骨はここから一つも見つかっていない。歴史家は、近くのプタヌ川の名の誤訳から来た名だろうと考えている。",
    [prop("Demon-Mouth Entrance|Entrada boca de demonio|Entrée bouche de démon|鬼の口の入口", 280, 58),
     prop("Rock-Cut Meditation Niche|Nicho tallado en roca|Niche taillée dans la roche|岩を掘った瞑想の壁龕", 240, 50)],
  ),
  tirtaempul: city(
    "Tirta Empul|Tirta Empul|Tirta Empul|ティルタエンプル",
    115.3144, -8.4131, "ubu", "meru", "templegate", "l",
    "A spring old enough to date, a palace built to watch it|Un manantial fechado, un palacio para contemplarlo|Une source datée, un palais pour la contempler|年代の分かる泉と、それを見る宮殿",
    "An inscription dates the spring to 962 CE, and Balinese Hindus still queue at its row of water spouts to bathe in a purification rite called melukat, each spout washing away a different kind of misfortune. Indonesia's first president, Sukarno, built his own mountain palace directly overlooking the temple in the 1950s, reportedly because he found the view and the water itself restorative.|Una inscripción fecha el manantial en el año 962, y los hindúes balineses aún hacen cola ante su hilera de surtidores para bañarse en un rito de purificación llamado melukat. El primer presidente de Indonesia, Sukarno, construyó su propio palacio de montaña justo sobre el templo en los años 50.|Une inscription date la source de 962, et les hindous balinais font encore la queue devant sa rangée de becs pour se baigner dans un rite de purification appelé melukat. Sukarno, premier président d'Indonésie, fit bâtir son propre palais de montagne juste au-dessus du temple dans les années 1950.|碑文はこの泉を西暦962年のものとする。バリのヒンドゥー教徒はいまも並んだ吹き出し口の前に列を作り、「ムルカット」という浄めの沐浴をする。インドネシア初代大統領スカルノは1950年代、寺院を見下ろす場所に自分の山荘を建てた。景色と水そのものに癒やされたからだと言われている。",
    [prop("Purification Spout Row|Hilera de surtidores de purificación|Rangée de becs de purification|浄めの吹き出し口", 270, 56),
     prop("Sukarno's Mountain Palace|Palacio de montaña de Sukarno|Palais de montagne de Sukarno|スカルノの山荘", 300, 62)],
  ),

  // ---------------------------------------------------------------------
  // gl — 山岳・湖
  // ---------------------------------------------------------------------
  kintamani: city(
    "Kintamani|Kintamani|Kintamani|キンタマーニ",
    115.3667, -8.2667, "gl", "volcano", "cratervolcano", "r",
    "The lake every rice farmer answers to|El lago al que todo arrocero rinde cuentas|Le lac auquel chaque riziculteur doit tout|すべての田が頼る湖",
    "Mount Batur has erupted more than twenty times since records began, most destructively in 1926, when the flow buried the old lakeside temple so completely that survivors rebuilt Pura Ulun Danu Batur higher up the crater rim. Balinese farmers far from here still credit the lake below, not the rain, as the true source of the water carried to their rice terraces by subak, the temple-run irrigation canals.|El monte Batur ha entrado en erupción más de veinte veces desde que hay registros, y la más destructiva, en 1926, sepultó tan por completo el antiguo templo junto al lago que los supervivientes reconstruyeron el Pura Ulun Danu Batur más arriba, en el borde del cráter. Agricultores balineses muy lejos de aquí siguen atribuyendo al lago el verdadero origen del agua de sus terrazas.|Le mont Batur est entré en éruption plus de vingt fois depuis que l'on tient des registres, la plus destructrice en 1926, ensevelissant si complètement l'ancien temple au bord du lac que les survivants rebâtirent le Pura Ulun Danu Batur plus haut, sur le rebord du cratère. Des agriculteurs balinais bien loin d'ici attribuent encore au lac la véritable origine de l'eau de leurs rizières.|バトゥール山は記録に残るだけで二十回以上噴火しており、もっとも被害の大きかった1926年の噴火では、湖畔の古い寺院がすっかり埋もれ、生き残った人々はカルデラの縁のもっと高い場所にウルンダヌ・バトゥール寺院を建て直した。ここから遠く離れた土地の農民たちも、雨ではなくこの湖こそが、寺院が管理する灌漑水路スバックを通じて棚田に届く水の本当の源だと、いまも考えている。",
    [prop("Pura Ulun Danu Batur|Pura Ulun Danu Batur|Pura Ulun Danu Batur|ウルンダヌ・バトゥール寺院", 290, 60),
     prop("Crater Rim Warung|Fonda del borde del cráter|Warung du rebord du cratère|カルデラ縁の食堂", 220, 46)],
  ),
  bedugul: city(
    "Bedugul|Bedugul|Bedugul|ブドゥグル",
    115.1661, -8.2763, "gl", "meru", "lakeside", "r",
    "The temple on the 50,000-rupiah note|El templo del billete de 50.000 rupias|Le temple du billet de 50 000 roupies|5万ルピア紙幣の寺院",
    "Built in 1633 for Dewi Danu, goddess of the lake, the temple's pagodas seem to float when the water is high enough to submerge their stone base, an image familiar to most Indonesians because it appears on the 50,000-rupiah banknote. Farmers from as far as the dry southern plains still consider this lake, and Batur's, the true source of every subak's water.|Construido en 1633 para Dewi Danu, diosa del lago, las pagodas del templo parecen flotar cuando el agua sube lo bastante para cubrir su base de piedra, imagen que la mayoría de indonesios reconoce por el billete de 50.000 rupias. Agricultores de las llanuras secas del sur siguen viendo este lago como la fuente verdadera del agua de todo subak.|Bâti en 1633 pour Dewi Danu, déesse du lac, les pagodes du temple semblent flotter quand l'eau monte assez pour submerger leur base de pierre, image que la plupart des Indonésiens reconnaissent car elle figure sur le billet de 50 000 roupies. Des agriculteurs des plaines sèches du sud considèrent encore ce lac comme la véritable source de l'eau de chaque subak.|1633年、湖の女神デウィ・ダヌのために建てられたこの寺院の塔は、水位が上がって石の土台が沈むと浮かんでいるように見える。5万ルピア紙幣に描かれているため、インドネシア人の多くにおなじみの姿である。乾いた南の平野からも、農民たちはいまもこの湖こそがすべてのスバックの水の本当の源だと考えている。",
    [prop("Floating Pagoda Shrine|Santuario pagoda flotante|Sanctuaire pagode flottant|浮かぶ塔の祠", 300, 62),
     prop("Lakeside Nursery Garden|Jardín vivero junto al lago|Jardin pépinière au bord du lac|湖畔の苗木園", 230, 48)],
  ),
  munduk: city(
    "Munduk|Munduk|Munduk|ムンドゥック",
    115.0866, -8.2721, "gl", "harvest", "hillvillage", "l",
    "The scent visitors mistake for incense|El olor que confunden con incienso|L'odeur prise pour de l'encens|お香と間違われる匂い",
    "Dutch planters laid out clove, coffee and vanilla estates on these slopes in the early 20th century, and the terraced plantation paths they cut are now the same routes trekking guides use between the village's waterfalls. Clove is still dried on tarpaulins along the roadside every year, filling the whole village with a smell most visitors mistake for incense.|Los colonos holandeses trazaron aquí plantaciones de clavo, café y vainilla a principios del siglo XX, y los senderos que abrieron son hoy las mismas rutas de trekking entre las cascadas del pueblo. El clavo todavía se seca cada año sobre lonas junto a la carretera, con un olor que muchos confunden con incienso.|Des colons néerlandais y tracèrent au début du XXe siècle des plantations de clous de girofle, de café et de vanille, et les sentiers qu'ils ouvrirent sont aujourd'hui les mêmes routes de trek entre les cascades du village. Le clou de girofle sèche encore chaque année sur des bâches le long de la route, avec une odeur que beaucoup prennent pour de l'encens.|20世紀初頭、オランダ人入植者がこの斜面にクローブ・コーヒー・バニラの農園を切り開いた。そのとき作られた段々の農道は、いまも村の滝をめぐるトレッキングの道としてそのまま使われている。クローブはいまも毎年道端のシートの上で干され、村じゅうを、多くの観光客がお香と間違えるにおいで満たす。",
    [prop("Clove-Drying Tarpaulin|Lona de secado de clavo|Bâche de séchage du clou de girofle|クローブの干し場のシート", 230, 48),
     prop("Colonial Plantation Path|Senda colonial de la plantación|Sentier colonial de la plantation|入植時代の農園道", 250, 52)],
  ),
  bangli: city(
    "Bangli|Bangli|Bangli|バンリ",
    115.3547, -8.4562, "gl", "palace", "hillvillage", "r",
    "The only kingdom with no coast|El único reino sin costa|Le seul royaume sans côte|海を持たなかった唯一の王国",
    "Of Bali's old royal kingdoms, this was the only one with no coastline at all, landlocked between the territories of its neighbours and dependent on them for any access to the sea. Pura Kehen, its terraced state temple built up a hillside in eleven rising courtyards, is considered second in importance only to Besakih, and a stone inscription found on the site is dated to 1206.|De los antiguos reinos balineses, este fue el único sin costa alguna, encerrado entre los territorios vecinos y dependiente de ellos para llegar al mar. Pura Kehen, su templo estatal en terrazas de once patios, se considera el segundo en importancia tras Besakih, y una inscripción en piedra hallada allí data de 1206.|Parmi les anciens royaumes balinais, celui-ci fut le seul sans aucune façade maritime, enclavé entre les territoires voisins et dépendant d'eux pour tout accès à la mer. Pura Kehen, son temple d'État en terrasses à onze cours étagées, est considéré comme le second en importance après Besakih, et une inscription trouvée sur place est datée de 1206.|バリのかつての王国のうち、海に一切面していなかったのはこの国だけで、周りの領土に囲まれ、海へ出るにも隣国に頼らねばならなかった。丘の斜面に十一段の中庭を重ねて築かれた州寺院プラ・クヘンは、重要度でブサキ寺院に次ぐとされる。境内で見つかった石碑は1206年のものとされる。",
    [prop("Eleven-Courtyard Temple|Templo de once patios|Temple aux onze cours|十一段の中庭を持つ寺院", 280, 58),
     prop("1206 Inscription Stone|Piedra de inscripción de 1206|Pierre d'inscription de 1206|1206年の石碑", 250, 52)],
  ),
  jatiluwih: city(
    "Jatiluwih|Jatiluwih|Jatiluwih|ジャティルウィ",
    115.1258, -8.3717, "gl", "terrace", "riceterrace", "l",
    "Registered for the system, not the view|Registrado por el sistema, no por la vista|Classé pour le système, pas pour la vue|眺めではなく仕組みが登録された棚田",
    "The name means roughly \"truly marvellous\", and in 2012 UNESCO listed the terraces here, together with several other subak sites, as a cultural landscape rather than just scenery, recognising the water-temple system that manages them. Some fields are still planted with tall heirloom rice varieties that take longer to grow and yield less than modern strains, kept on for taste and for temple offerings rather than income.|El nombre significa algo así como «verdaderamente maravilloso», y en 2012 la UNESCO declaró estas terrazas, junto con otros sitios subak, paisaje cultural y no solo vista panorámica. Algunos campos aún se siembran con variedades de arroz altas y tradicionales, mantenidas por el sabor y las ofrendas antes que por el ingreso.|Le nom signifie à peu près « vraiment merveilleux », et en 2012 l'UNESCO a classé ces terrasses, avec plusieurs autres sites subak, comme paysage culturel plutôt que simple panorama. Certains champs sont encore plantés de variétés de riz anciennes et hautes, conservées pour le goût et les offrandes plutôt que pour le revenu.|地名はおおよそ「まことに見事な」を意味する。2012年、ユネスコはこの棚田をほかのスバック遺跡とともに、眺めそのものではなく、それを支える水利寺院の仕組みごと文化的景観として登録した。いまも一部の田では、成長が遅く収量も少ない在来の丈高い米が、稼ぎのためではなく味と供物のために作られている。",
    [prop("Heirloom Rice Field|Campo de arroz tradicional|Champ de riz ancien|在来種の稲田", 260, 54),
     prop("Subak Water Temple|Templo de agua del subak|Temple de l'eau du subak|スバックの水利寺院", 280, 58)],
  ),

  // ---------------------------------------------------------------------
  // tim — 東部
  // ---------------------------------------------------------------------
  besakih: city(
    "Besakih|Besakih|Besakih|ブサキ",
    115.4517, -8.3742, "tim", "meru", "templegate", "r",
    "The lava that stopped at the wall|La lava que se detuvo en el muro|La lave arrêtée au mur|壁の手前で止まった溶岩",
    "Mother Temple to more than eighty villages, it is actually two dozen separate temples climbing the southwestern slope of Gunung Agung, and in 1963 lava from the volcano's worst eruption of the 20th century stopped only metres from its walls while burying villages elsewhere on the mountain. Many Balinese still read the temple's survival that day as more than luck.|Templo madre de más de ochenta aldeas, es en realidad dos docenas de templos que ascienden por la ladera suroeste del Gunung Agung, y en 1963 la lava de la peor erupción del volcán en el siglo XX se detuvo a solo metros de sus muros. Muchos balineses siguen viendo aquel día como algo más que suerte.|Temple mère de plus de quatre-vingts villages, ce sont en réalité deux douzaines de temples qui gravissent le versant sud-ouest du Gunung Agung, et en 1963 la lave de la pire éruption du volcan au XXe siècle s'arrêta à quelques mètres de ses murs. Beaucoup de Balinais voient encore dans cette survie plus qu'un simple hasard.|八十を超す村の母なる寺院とされるが、実際には二十あまりの別々の寺院がグヌン・アグンの南西斜面を這い上るように連なっている。1963年、この火山の20世紀最大の噴火の溶岩は、山の別の斜面の村々を埋めながら、この寺院の壁の数メートル手前で止まった。多くのバリ人は、この日の生存をいまも単なる偶然以上のものと見ている。",
    [prop("Mother Temple Courtyard|Patio del templo madre|Cour du temple mère|母なる寺院の中庭", 320, 66),
     prop("Volcano-Slope Shrine Row|Hilera de santuarios en la ladera|Rangée de sanctuaires sur le versant|山腹に並ぶ祠", 280, 58)],
  ),
  klungkung: city(
    "Klungkung|Klungkung|Klungkung|クルンクン",
    115.4034, -8.5372, "tim", "palace", "royaltown", "l",
    "A ceiling that judged you back|Un techo que también te juzgaba|Un plafond qui vous jugeait aussi|見上げる者を裁く天井画",
    "The kingdom's law court, the Kertha Gosa, has a painted ceiling telling the fate that awaits wrongdoers in the afterlife, arranged panel by panel so a defendant sitting for judgement looked straight up at it. In 1908 the royal family and hundreds of their court walked out of the palace gate in ceremonial white to die facing Dutch rifles rather than surrender, the last of Bali's puputan and the one that ended the island's remaining independent kingdoms.|El tribunal del reino, el Kertha Gosa, tiene un techo pintado que narra el destino de los culpables en el más allá, ordenado panel a panel para que el acusado lo tuviera justo encima. En 1908 la familia real y su corte salieron del palacio en blanco ceremonial para morir ante los fusiles holandeses, el último puputan de Bali.|Le tribunal du royaume, le Kertha Gosa, a un plafond peint racontant le sort des coupables dans l'au-delà, disposé panneau par panneau pour qu'un accusé l'ait droit au-dessus de lui. En 1908, la famille royale et sa cour sortirent du palais en blanc de cérémonie pour mourir face aux fusils néerlandais, le dernier puputan de Bali.|王国の裁判所クルタ・ゴサの天井画は、悪事を働いた者があの世で受ける報いを描いており、判決を待って座る被告の真上に配されている。1908年、王族とその廷臣数百人が儀式用の白い装束で宮殿の門を出、降伏するよりオランダ軍の銃口の前で死ぬことを選んだ。これがバリ最後のププタンであり、島に残っていた独立王国の終わりだった。",
    [prop("Kertha Gosa Painted Ceiling|Techo pintado del Kertha Gosa|Plafond peint du Kertha Gosa|クルタ・ゴサの天井画", 300, 62),
     prop("1908 Puputan Gate|Puerta del puputan de 1908|Porte du puputan de 1908|1908年ププタンの門", 260, 54)],
  ),
  amed: city(
    "Amed|Amed|Amed|アメッド",
    115.6497, -8.3439, "tim", "dive", "fishingvillage", "r",
    "Salt from split coconut trunks|Sal de troncos de coco partidos|Du sel dans des troncs de coco fendus|割った椰子の幹で作る塩",
    "Salt is still raked from black volcanic sand along this shore using a method unchanged for generations, evaporated in halved coconut trunks split lengthwise rather than open pans. Many of the jukung outrigger boats now hired out for snorkelling trips are the same boats, or built to the same design, that these families have fished from for as long as anyone remembers.|Aquí aún se rastrilla sal de la arena volcánica negra con un método sin cambios en generaciones, evaporada en troncos de coco partidos a lo largo en vez de en bandejas abiertas. Muchas de las barcas jukung que hoy se alquilan para esnórquel son las mismas, o del mismo diseño, con las que estas familias han pescado siempre.|On y ratisse encore le sel dans le sable volcanique noir selon une méthode inchangée depuis des générations, évaporé dans des troncs de cocotier fendus en long plutôt que dans des bassins ouverts. Beaucoup des pirogues jukung aujourd'hui louées pour le snorkeling sont les mêmes, ou de même conception, que celles avec lesquelles ces familles pêchent depuis toujours.|この浜では、何世代も変わらぬやり方で黒い火山灰の砂から塩をならい取る。開いた平皿ではなく、縦に割った椰子の幹で水分を飛ばす。いまシュノーケリング客を乗せて貸し出されているジュクン舟の多くは、この家々が誰も覚えていないほど昔から漁に使ってきたのと同じ舟か、同じ設計で作られたものである。",
    [prop("Coconut-Trunk Salt Trough|Artesa de sal en tronco de coco|Auge à sel en tronc de coco|椰子の幹の塩樋", 240, 50),
     prop("Jukung Dive Charter|Jukung para buceo|Jukung pour la plongée|潜水用ジュクン", 270, 56)],
  ),
  tulamben: city(
    "Tulamben|Tulamben|Tulamben|トゥランベン",
    115.5931, -8.2762, "tim", "dive", "cliffcove", "l",
    "A wreck the lava finished pushing in|Un pecio que la lava terminó de empujar|Une épave que la lave a fini de pousser|溶岩が最後に押し出した沈没船",
    "A US Army cargo ship torpedoed in 1942 sat beached on this shore for two decades until the lava flow from Gunung Agung's 1963 eruption — the same eruption whose lava stopped short of Besakih — pushed the wreck fully into the water. It now lies just offshore, encrusted in coral, close enough that divers walk in from the black-sand beach rather than take a boat.|Un carguero del ejército de EE. UU. torpedeado en 1942 quedó varado en esta orilla dos décadas hasta que la lava de la erupción de 1963 del Gunung Agung -la misma cuya lava se detuvo junto a Besakih- empujó el pecio al agua. Hoy yace justo frente a la costa, cubierto de coral.|Un cargo de l'armée américaine torpillé en 1942 resta échoué sur ce rivage pendant deux décennies, jusqu'à ce que la lave de l'éruption de 1963 du Gunung Agung — la même dont la lave s'arrêta juste avant Besakih — pousse l'épave dans l'eau. Elle repose aujourd'hui juste au large, incrustée de corail.|1942年に魚雷を受けたアメリカ陸軍の貨物船は、二十年ものあいだこの浜に乗り上げたままだったが、1963年のグヌン・アグン噴火――ブサキ寺院の手前で止まったのと同じ溶岩――が、その船体をとうとう海の中へ押し出した。いまはすぐ沖に珊瑚に覆われて横たわり、船で行くまでもなく黒砂の浜から歩いて潜れるほど近い。",
    [prop("USAT Liberty Wreck Site|Pecio del USAT Liberty|Épave du USAT Liberty|リバティ号の沈没地点", 310, 64),
     prop("Black-Sand Dive Entry|Entrada de buceo en arena negra|Entrée de plongée sur sable noir|黒砂からの潜水入口", 250, 52)],
  ),
  candidasa: city(
    "Candidasa|Candidasa|Candidasa|チャンディダサ",
    115.5646, -8.5093, "tim", "beach", "quietbeach", "r",
    "The reef that was burned into cement|El arrecife que se quemó para hacer cemento|Le récif brûlé pour faire du ciment|セメントに焼かれた珊瑚礁",
    "In the 1970s and 80s the offshore reef was mined for coral, burned to make the lime used in building cement, and within a decade the beach it had been protecting eroded down to almost nothing. Concrete breakwaters offshore, sunk from the 1990s onward, are still slowly letting new sand collect behind them, though the beach has never fully returned to what it was.|En los años 70 y 80 se extraía coral del arrecife cercano, quemado para hacer la cal del cemento, y en una década la playa que ese arrecife protegía se erosionó casi hasta desaparecer. Rompeolas de hormigón hundidos desde los 90 aún dejan acumular arena nueva, aunque la playa nunca ha vuelto del todo a lo que era.|Dans les années 1970 et 1980, on extrayait le corail du récif au large, brûlé pour faire la chaux du ciment, et en une décennie la plage qu'il protégeait s'érodait presque entièrement. Des brise-lames immergés depuis les années 1990 laissent encore s'accumuler du sable neuf, mais la plage n'a jamais tout à fait retrouvé ce qu'elle était.|1970〜80年代、沖合の珊瑚礁はセメントの石灰を作るために採られ焼かれた。その結果、十年もしないうちに珊瑚が守っていた浜はほとんど消えるまで浸食された。1990年代以降、沖に沈められたコンクリートの消波ブロックがいまも少しずつ新しい砂を溜めているが、浜はかつての姿に完全には戻っていない。",
    [prop("Offshore Breakwater Row|Hilera de rompeolas|Rangée de brise-lames|沖の消波ブロック列", 220, 46),
     prop("Lotus Lagoon Shrine|Santuario de la laguna de lotos|Sanctuaire du lagon de lotus|蓮の潟の祠", 240, 50)],
  ),
  padangbai: city(
    "Padangbai|Padangbai|Padangbai|パダンバイ",
    115.5089, -8.5311, "tim", "boat", "portferry", "l",
    "A port that still runs on the tide|Un puerto que aún sigue la marea|Un port encore réglé sur la marée|いまも潮で動く港",
    "Ferries to Lombok leave from here around the clock, timed to tides rather than a fixed timetable in the older tradition of the port, while fast boats to Nusa Penida and the Gili Islands run a shorter, newer schedule from the same small bay. Two coves reachable only on foot over the headland stay quiet even when the harbour itself is at its busiest.|Los ferris a Lombok salen de aquí a cualquier hora, según la marea más que un horario fijo, mientras que las lanchas rápidas a Nusa Penida y las islas Gili siguen un horario más nuevo desde la misma bahía. Dos calas a las que solo se llega a pie por el cabo siguen tranquilas incluso en las horas de más ajetreo.|Les ferries pour Lombok partent d'ici à toute heure, réglés sur la marée plutôt que sur un horaire fixe, tandis que les bateaux rapides pour Nusa Penida et les îles Gili suivent un horaire plus récent depuis la même petite baie. Deux criques accessibles seulement à pied par le promontoire restent tranquilles même aux heures de pointe.|ロンボク島行きのフェリーはここから一日じゅう出ており、決まった時刻表よりも港の古くからの慣習どおり潮の具合で発着する。ヌサペニダやギリ諸島行きの高速船は、同じ小さな入江からもっと新しく短い時刻表で走る。岬を歩いてしか行けない二つの入り江は、港がいちばん賑わっているときでも静かなままである。",
    [prop("Tide-Timed Ferry Dock|Muelle de ferris según la marea|Quai de ferry réglé sur la marée|潮に合わせる渡船場", 260, 54),
     prop("Headland Cove Path|Sendero a la cala del cabo|Sentier de la crique du cap|岬の入り江への小道", 220, 46)],
  ),

  // ---------------------------------------------------------------------
  // utr — 北部
  // ---------------------------------------------------------------------
  singaraja: city(
    "Singaraja|Singaraja|Singaraja|シガラジャ",
    115.0882, -8.1120, "utr", "boat", "portferry", "l",
    "The port that lost the capital|El puerto que perdió la capital|Le port qui perdit la capitale|州都の座を失った港町",
    "Dutch colonial administrators ran all of Bali from this port town from 1882 until 1958, when the new republic moved the capital south to Denpasar. Its 1928 library, Gedong Kirtya, still holds thousands of lontar — palm-leaf manuscripts inscribed with a knife and rubbed with soot — making it the largest such collection on the island.|Los administradores coloniales holandeses gobernaron toda Bali desde este puerto entre 1882 y 1958, cuando la nueva república trasladó la capital al sur, a Denpasar. Su biblioteca de 1928, el Gedong Kirtya, conserva todavía miles de lontar, la mayor colección de su tipo en la isla.|Les administrateurs coloniaux néerlandais gouvernèrent tout Bali depuis ce port de 1882 à 1958, année où la nouvelle république transféra la capitale au sud, à Denpasar. Sa bibliothèque de 1928, le Gedong Kirtya, conserve encore des milliers de lontar, la plus grande collection de ce genre sur l'île.|オランダの植民地行政は1882年から1958年まで、この港町からバリ全島を治めた。新しい共和国が州都を南のデンパサールへ移したのはその年である。1928年に開かれた図書館ゲドン・キルティヤには、ナイフで文字を刻みすすで黒くした椰子の葉の写本「ロンタル」が今も数千点残り、島内最大のコレクションになっている。",
    [prop("Gedong Kirtya Library|Biblioteca Gedong Kirtya|Bibliothèque Gedong Kirtya|ゲドン・キルティヤ図書館", 240, 50),
     prop("Old Harbour Warehouse|Almacén del viejo puerto|Entrepôt du vieux port|旧港の倉庫", 210, 44)],
  ),
  lovina: city(
    "Lovina|Lovina|Lovina|ロビナ",
    115.0271, -8.1573, "utr", "boat", "quietbeach", "r",
    "A name nobody can quite confirm|Un nombre que nadie confirma del todo|Un nom que personne ne confirme vraiment|誰も確かめられない地名の由来",
    "Local telling credits the last king of Buleleng, a published novelist, with naming this stretch of coast in the 1950s — supposedly blending \"love\" with \"Indonesia\" — though no document from the time has been found to confirm it. Long-tailed skiffs still go out before sunrise to find the pods of spinner dolphins that gather offshore, a livelihood fishing families here took up only once tourists started asking for it.|Se cuenta localmente que el último rey de Buleleng, novelista publicado, dio nombre a este tramo de costa en los años 50, aunque no se ha hallado ningún documento que lo confirme. Botes de cola larga aún salen antes del alba en busca de los delfines que se reúnen mar adentro, un sustento que las familias pescadoras adoptaron al pedirlo los turistas.|La tradition locale attribue au dernier roi de Buleleng, romancier publié, le nom donné à ce littoral dans les années 1950, mais aucun document de l'époque n'a été retrouvé pour le confirmer. Des barques à longue queue sortent encore avant l'aube à la recherche des dauphins qui se rassemblent au large, un gagne-pain adopté une fois les touristes venus le demander.|地元の言い伝えでは、小説も出していたブレレン最後の王が1950年代にこの海岸に名を付けたとされ、「愛」と「インドネシア」を合わせたのだという。だが、それを裏づける当時の文書は見つかっていない。ロングテールの小舟はいまも夜明け前に出て、沖に集まるハシナガイルカの群れを探す。この生業は、観光客が求め始めてから、この地の漁師の家々が新たに始めたものである。",
    [prop("Dawn Dolphin Skiff|Bote del amanecer para delfines|Barque de l'aube pour dauphins|夜明けのイルカ舟", 240, 50),
     prop("Long-Tailed Fishing Boat|Barca de cola larga|Barque à longue queue|ロングテールの漁船", 210, 44)],
  ),
  kubutambahan: city(
    "Kubutambahan|Kubutambahan|Kubutambahan|クブタンブハン",
    115.1667, -8.1108, "utr", "offering", "templegate", "l",
    "A bicycle with a lotus for a wheel|Una bicicleta con un loto por rueda|Un vélo dont la roue est un lotus|蓮の花が車輪になった自転車",
    "A relief carved into the temple's outer wall shows a man riding a bicycle whose rear wheel is a blooming lotus, believed to be a portrait of the Dutch artist W.O.J. Nieuwenkamp, who toured the island by bicycle in 1904 and was the first European to publish detailed drawings of Balinese temple art. Farmers still bring the first rice of a good harvest here as thanks, since the temple is dedicated to the spirit that owns the soil itself.|Un relieve tallado en el muro exterior del templo muestra a un hombre en bicicleta cuya rueda trasera es un loto en flor, retrato del artista holandés W.O.J. Nieuwenkamp, que recorrió la isla en bicicleta en 1904. Los agricultores aún traen aquí el primer arroz de una buena cosecha como agradecimiento.|Un relief sculpté sur le mur extérieur du temple montre un homme à bicyclette dont la roue arrière est un lotus en fleur, portrait présumé de l'artiste néerlandais W.O.J. Nieuwenkamp, qui parcourut l'île à vélo en 1904. Les agriculteurs y apportent encore le premier riz d'une bonne récolte en remerciement.|寺院の外壁に刻まれた浮彫には、後輪が咲いた蓮の花になっている自転車に乗る男が描かれている。1904年に自転車でバリを回ったオランダ人画家W・O・J・ニーウェンカンプの姿だと考えられている。この寺院は土地そのものを司る神に捧げられており、農民はいまも豊作の年、最初の米をここへ感謝として供える。",
    [prop("Bicycle-Rider Relief|Relieve del ciclista|Bas-relief du cycliste|自転車乗りの浮彫", 260, 54),
     prop("First-Rice Offering Hall|Sala de ofrenda del primer arroz|Salle d'offrande du premier riz|初穂を供える堂", 230, 48)],
  ),
  sukasada: city(
    "Sukasada|Sukasada|Sukasada|スカサダ",
    115.1391, -8.1633, "utr", "lake", "hillvillage", "r",
    "A forest spared by its own steepness|Un bosque salvado por su propia pendiente|Une forêt épargnée par sa pente|急すぎて残った森",
    "Indonesia's mountain-flora botanic garden was founded here in 1959, the fourth in a network started under the Bogor garden a century earlier, and it still holds the country's largest collection of high-altitude plants gathered from across the archipelago. A half-hour's walk further into the hills, the Gitgit waterfall drops about 35 metres through forest left uncleared largely because the slope was always too steep to farm.|El jardín botánico de flora de montaña de Indonesia se fundó aquí en 1959, el cuarto de una red iniciada bajo el jardín de Bogor un siglo antes. Media hora más adentro en las colinas, la cascada de Gitgit cae unos 35 metros por un bosque que quedó sin talar por lo empinado de la pendiente.|Le jardin botanique de flore montagnarde d'Indonésie fut fondé ici en 1959, le quatrième d'un réseau lancé sous celui de Bogor un siècle plus tôt. Une demi-heure de marche plus loin, la cascade de Gitgit tombe d'environ 35 mètres à travers une forêt épargnée surtout à cause de la pente trop raide pour être cultivée.|インドネシアの高地植物を集めた植物園は1959年ここに開かれた。一世紀前にボゴール植物園のもとで始まったネットワークの四番目にあたる。丘をさらに三十分歩くと、ギッギッの滝が森の中を約35メートル落ちる。この森が伐り開かれずに残ったのは、斜面がずっと畑にするには急すぎたからにすぎない。",
    [prop("High-Altitude Plant House|Casa de plantas de gran altitud|Serre des plantes d'altitude|高地植物の温室", 240, 50),
     prop("Gitgit Waterfall Path|Sendero a la cascada Gitgit|Sentier de la cascade Gitgit|ギッギッの滝への道", 220, 46)],
  ),

  // ---------------------------------------------------------------------
  // brt — 西部・島嶼
  // ---------------------------------------------------------------------
  nusapenida: city(
    "Nusa Penida|Nusa Penida|Nusa Penida|ヌサペニダ",
    115.556, -8.706, "brt", "dive", "cliffcove", "r",
    "The island where fear was sent|La isla adonde se enviaba el miedo|L'île où l'on envoyait la peur|恐れを流した島",
    "Balinese kings once exiled criminals and the unwell here, and villages across the island still parade a fanged giant puppet named after its guardian spirit, Jero Gede Macaling, each new year. The steep cliff road that finally reached the island's turquoise coves was cut only in 2016 — before that, most of Bali knew this place only by reputation.|Los reyes balineses exiliaban aquí a criminales y enfermos, y aldeas de toda la isla siguen sacando cada año nuevo un títere gigante de colmillos con el nombre de su espíritu guardián, Jero Gede Macaling. La carretera tallada en el acantilado se abrió recién en 2016.|Les rois balinais y exilaient jadis criminels et malades, et des villages de toute l'île font encore défiler chaque nouvel an une marionnette géante aux crocs, nommée d'après son esprit gardien, Jero Gede Macaling. La route taillée dans la falaise ne fut ouverte qu'en 2016.|かつてバリの王たちは罪人や病者をこの島へ追放し、島の守護霊にちなむ牙を持つ巨大な人形は、いまも毎年の新年に島じゅうの村で担ぎ出される。その霊の名はジュロ・グデ・マチャリン。断崖を切り開いた急な道が開通したのは2016年のことで、それまでバリの多くの人にとってこの島は噂でしか知らない場所だった。",
    [prop("Kelingking Cliff Path|Sendero del acantilado Kelingking|Sentier de la falaise de Kelingking|クリンキン断崖の小道", 270, 56),
     prop("Toyapakeh Crossing Pier|Muelle de Toyapakeh|Embarcadère de Toyapakeh|トヤパケの渡し場", 230, 48)],
  ),
  nusalembongan: city(
    "Nusa Lembongan|Nusa Lembongan|Nusa Lembongan|ヌサレンボンガン",
    115.4489, -8.6783, "brt", "dive", "cliffcove", "l",
    "A lagoon planted in checkerboard rows|Una laguna sembrada en tablero de ajedrez|Un lagon planté en damier|市松模様に植えられた潟",
    "Before tourism, the shallow lagoon here was a seaweed farm, and the checkerboard pattern still visible at low tide is lines of eucheuma seaweed tied to stakes, grown for the carrageenan used in food and cosmetics abroad. A bright yellow suspension bridge, narrow enough for scooters only, links the island to neighbouring Nusa Ceningan and sways enough underfoot that most people cross it slowly.|Antes del turismo, la laguna poco profunda de aquí era un campo de algas, patrón aún visible en marea baja: líneas de alga eucheuma atadas a estacas, cultivada para el carragenano usado en alimentos y cosméticos. Un puente colgante amarillo une la isla con la vecina Nusa Ceningan.|Avant le tourisme, le lagon peu profond servait de champ d'algues, motif encore visible à marée basse : des lignes d'algue eucheuma attachées à des piquets, cultivée pour la carraghénane utilisée dans l'alimentation et les cosmétiques. Un pont suspendu jaune relie l'île à la voisine Nusa Ceningan.|観光が来る前、この浅い潟は海藻の養殖場だった。干潮時にいまも見える市松模様は、杭に結んだユーキューマ海藻の列で、海外で食品や化粧品に使われるカラギーナンのために育てられている。鮮やかな黄色い吊り橋が隣のヌサセニガン島とここを結び、足元でよく揺れるので、たいていの人はゆっくり渡る。",
    [prop("Seaweed Drying Rack|Secadero de algas|Séchoir à algues|海藻の干し場", 230, 48),
     prop("Yellow Suspension Bridge|Puente colgante amarillo|Pont suspendu jaune|黄色い吊り橋", 250, 52)],
  ),
  negara: city(
    "Negara|Negara|Negara|ヌガラ",
    114.5983, -8.3583, "brt", "boat", "royaltown", "r",
    "Buffalo races born from ploughing|Carreras de búfalos nacidas del arado|Des courses de buffles nées du labour|田起こしから生まれた水牛レース",
    "Farmers here race pairs of decorated water buffalo hitched to small wooden carts down a dirt track each dry season, a sport called makepung that grew out of ordinary ploughing work rather than any staged competition. The regency's river town of Loloan, built largely on stilts over the water, has been home to a Bugis Muslim trading community from Sulawesi for some three centuries, a minority within Bali's Hindu majority that still speaks its own dialect.|Aquí los agricultores hacen correr parejas de búfalos engalanados, uncidos a carros de madera, cada estación seca: el makepung, nacido del arado cotidiano. El pueblo fluvial de Loloan, sobre pilotes, ha sido hogar de una comunidad comerciante bugis musulmana de Sulawesi durante unos tres siglos.|Chaque saison sèche, des paysans y font courir des paires de buffles d'eau parés, attelés à de petits chariots, sur une piste de terre : le makepung, né du simple labour. La ville fluviale de Loloan, bâtie en grande partie sur pilotis, abrite depuis quelque trois siècles une communauté marchande bugis musulmane venue de Sulawesi.|ここでは乾季になると、飾り立てた水牛の対を木の荷車につないで土の道を走らせる。「マクプン」と呼ばれるこの競技は、しつらえた大会ではなく日々の田起こしの作業から生まれた。水上の杭の上に多くが建つ川沿いの町ロロアンには、スラウェシから来たブギス人イスラム教徒の交易者コミュニティが三百年ほど前から住み、バリのヒンドゥー多数派の中の少数派として、いまも独自の方言を話している。",
    [prop("Makepung Buffalo Track|Pista de búfalos makepung|Piste de buffles makepung|マクプンの水牛競走路", 250, 52),
     prop("Stilt-House River Quarter|Barrio fluvial de casas sobre pilotes|Quartier fluvial sur pilotis|川沿いの高床の町並み", 230, 48)],
  ),
  gilimanuk: city(
    "Gilimanuk|Gilimanuk|Gilimanuk|ギリマヌッ",
    114.4386, -8.1725, "brt", "boat", "portferry", "l",
    "A crossing shorter than it looks on the map|Un cruce más corto de lo que parece en el mapa|Une traversée plus courte qu'il n'y paraît sur la carte|地図で見るより短い海峡",
    "The ferry crossing to Java here is only about 2.5 kilometres at its narrowest, and boats leave roughly every 15 to 30 minutes around the clock, making it one of the busiest short sea crossings in Indonesia. The national park just north of town is the last wild home of the Bali starling, a white bird found nowhere else on earth, whose population fell to as few as a handful of individuals in the wild during the 1990s because of cage-bird poaching.|El cruce en ferri a Java aquí mide solo unos 2,5 km en su punto más estrecho, y los barcos zarpan cada 15 o 30 minutos, día y noche. El parque nacional al norte del pueblo es el último hogar silvestre de la miná de Bali, cuya población cayó a un puñado de individuos en los años 90 por el furtivismo.|La traversée en ferry vers Java ne mesure ici qu'environ 2,5 km à son point le plus étroit, et des bateaux partent toutes les 15 à 30 minutes, jour et nuit. Le parc national juste au nord de la ville est le dernier refuge sauvage du léiothrix de Bali, dont la population sauvage tomba à une poignée d'individus dans les années 1990 à cause du braconnage.|ここからジャワ島へのフェリー航路はいちばん狭い所でわずか2.5キロほどしかなく、船はほぼ15分から30分おきに昼夜を問わず出る。町のすぐ北の国立公園は、地球上どこにもいない白い鳥カンムリシロムクの最後の野生の生息地である。その個体数は1990年代、飼い鳥取引目的の密猟によって、野生では数羽にまで落ち込んだ。",
    [prop("24-Hour Ferry Dock|Muelle de ferris 24 horas|Quai de ferry 24 heures|24時間動くフェリー埠頭", 260, 54),
     prop("Bali Starling Reserve|Reserva de la miná de Bali|Réserve du léiothrix de Bali|カンムリシロムクの保護区", 240, 50)],
  ),
  kusamba: city(
    "Kusamba|Kusamba|Kusamba|クサンバ",
    115.4406, -8.5661, "brt", "harvest", "fishingvillage", "r",
    "Salt that costs more abroad than here|Sal que vale más fuera que aquí|Un sel qui vaut plus cher ailleurs qu'ici|よそのほうが高く売れる塩",
    "Salt farmers here soak black volcanic sand in seawater, dry it in the sun, then filter it through a trough lined with palm-leaf fibre before reducing it in shallow wooden troughs — a process that takes about two weeks from first soaking to finished salt. The same salt now sells abroad as a costly gourmet ingredient, though the family working a stretch of sand here sees only a small fraction of that price.|Los salineros de aquí empapan arena volcánica negra en agua de mar, la secan al sol, y la filtran por una artesa de fibra de palma antes de reducirla, un proceso de unas dos semanas. Esa misma sal se vende hoy en el extranjero como ingrediente gourmet caro, aunque la familia local solo ve una pequeña parte de ese precio.|Les sauniers d'ici trempent du sable volcanique noir dans l'eau de mer, le sèchent au soleil, puis le filtrent dans une auge de fibre de palmier avant de le réduire, un procédé d'environ deux semaines. Ce même sel se vend aujourd'hui à l'étranger comme ingrédient gastronomique coûteux, la famille locale n'en voyant qu'une petite fraction du prix.|ここの塩職人は黒い火山灰の砂を海水に浸し、天日で乾かし、椰子の葉の繊維を敷いた樋で濾して塩分を濃くしてから、浅い木の桶で煮詰める。最初に砂を浸してから塩ができるまでおよそ二週間かかる。同じ塩はいま海外では高級食材として売られているが、ここで一区画の砂を扱う家族の手に入るのは、その値のごくわずかでしかない。",
    [prop("Palm-Fibre Filter Trough|Artesa filtrante de fibra de palma|Auge filtrante en fibre de palmier|椰子繊維の濾し樋", 220, 46),
     prop("Sun-Drying Sand Bed|Lecho de arena de secado solar|Lit de sable de séchage solaire|天日干しの砂床", 200, 42)],
  ),
  tanahlot: city(
    "Tanah Lot|Tanah Lot|Tanah Lot|タナロット",
    115.0868, -8.6212, "brt", "meru", "templegate", "b",
    "A rock said to be moved by a priest|Una roca que un sacerdote habría movido|Un rocher qu'un prêtre aurait déplacé|僧が動かしたと伝わる岩",
    "Tradition holds that the 16th-century priest Dang Hyang Nirartha, travelling the coast founding sea temples, moved this rock offshore himself and left a nest of venomous sea snakes in a cave beneath it to guard the site — a cave that still holds banded sea kraits today, kept calm, guides say, by a resident priest. The temple is reachable on foot only at low tide, and older maps show at least six other sea temples along this coast built to the same plan.|La tradición dice que el sacerdote del siglo XVI Dang Hyang Nirartha trasladó él mismo esta roca mar adentro y dejó un nido de serpientes marinas venenosas en una cueva debajo para vigilar el lugar, cueva que aún hoy alberga serpientes de bandas. El templo solo se alcanza a pie con marea baja.|La tradition veut que le prêtre du XVIe siècle Dang Hyang Nirartha ait lui-même déplacé ce rocher au large et laissé un nid de serpents marins venimeux dans une grotte en dessous pour garder le site, grotte qui abrite encore aujourd'hui des tricots-rayés. Le temple n'est accessible à pied qu'à marée basse.|言い伝えでは、海沿いに寺院を建てながら旅した16世紀の僧ダン・ヒヤン・ニラルタが、この岩を自ら沖へ動かし、その下の洞窟に毒を持つウミヘビの巣を残して守らせたという。その洞窟にはいまもエラブウミヘビがおり、案内人によれば常駐の僧がヘビを落ち着かせているという。この寺院へは干潮のときだけ歩いて渡れる。",
    [prop("Sea-Snake Guardian Cave|Cueva guardiana de serpientes marinas|Grotte gardienne aux serpents marins|ウミヘビの守り洞窟", 290, 60),
     prop("Low-Tide Rock Causeway|Paso de roca en marea baja|Chaussée rocheuse à marée basse|干潮の岩の道", 250, 52)],
  ),
};

/**
 * 路線43本。並び順を入れ替えると `use-board-layout.ts` の
 * `diagonalFirst`(= 並び順の偶奇)が変わり、線の折れ方が変わる。
 * 増減したときは登録側で偶奇を数え直すこと。
 */
export const BALI_EDGES = [
  ["denpasar", "sanur"],
  ["denpasar", "kuta"],
  ["kuta", "jimbaran"],
  ["jimbaran", "uluwatu"],
  ["kuta", "canggu"],
  ["denpasar", "celuk"],
  ["canggu", "tanahlot"],
  ["denpasar", "ubud"],
  ["celuk", "ubud"],
  ["celuk", "goagajah"],
  ["ubud", "goagajah"],
  ["ubud", "tegalalang"],
  ["ubud", "tirtaempul"],
  ["goagajah", "tirtaempul"],
  ["tirtaempul", "kintamani"],
  ["tegalalang", "bangli"],
  ["jatiluwih", "bedugul"],
  ["tegalalang", "jatiluwih"],
  ["kintamani", "bangli"],
  ["bedugul", "munduk"],
  ["munduk", "singaraja"],
  ["kintamani", "singaraja"],
  ["kintamani", "besakih"],
  ["bangli", "besakih"],
  ["besakih", "klungkung"],
  ["klungkung", "padangbai"],
  ["padangbai", "candidasa"],
  ["candidasa", "amed"],
  ["amed", "tulamben"],
  ["tulamben", "kubutambahan"],
  ["kubutambahan", "singaraja"],
  ["singaraja", "lovina"],
  ["singaraja", "sukasada"],
  ["lovina", "munduk"],
  ["lovina", "gilimanuk"],
  ["negara", "gilimanuk"],
  ["klungkung", "kusamba"],
  ["kusamba", "sanur"],
  ["tanahlot", "negara"],
  ["sanur", "nusapenida"],
  ["padangbai", "nusapenida"],
  ["nusapenida", "nusalembongan"],
  ["sanur", "nusalembongan"],
];
