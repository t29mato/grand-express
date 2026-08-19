/**
 * 九州地方の都市と路線。
 *
 * ## この盤面の芯
 *
 * **鎖国の二百年、日本で外へ開いていた窓は、ここだけだった。**
 * 平戸→出島→浦上と、窓の位置が移り、何が通り、何が咎められたかを軸にする。
 * 石炭(大牟田・端島・飯塚・田川)・火口の隣の暮らし(桜島・阿蘇)・
 * 元寇と朝鮮出兵という逆向きの「窓」(博多・唐津)は、芯ではなく題材として
 * 扱う。観光案内の「温泉・ラーメン・火山」では埋めない。
 *
 * 九州最初の鉄道(1889年、博多―千歳川)は久留米・熊本方面への幹線で、
 * 仮停車場止まりだったのは筑後川の氾濫で橋梁工事が遅れたため。筑豊の
 * 石炭を運ぶ鉄道(筑豊興業鉄道)は2年後・別会社の1891年開通。
 * 「九州最初の鉄道=石炭のため」という誤りは芯から外した経緯がある
 * (team-lead の裏取りで判明。quiz.mjs 側は理由づけを直して残してある)。
 *
 * ## 日本盤との重なりを避ける
 *
 * 日本盤(`scripts/content-overrides/japan-cities.mjs` / legacy)には
 * すでに福岡(屋台とラーメン)・長崎(出島)・熊本(城と阿蘇)・別府(温泉)・
 * 鹿児島(桜島・1914年の陸続き化)・宮崎(記紀神話)・佐賀(有田焼)がある。
 * 九州盤で同じ都市を再び出す場合は、**必ず別の切り口**にした
 * (長崎→出島ではなく浦上と原爆、熊本→阿蘇ではなく2016年の震災、
 * 鹿児島市→桜島の市街ではなく薩摩藩英国留学生、佐賀県→有田焼ではなく
 * 反射炉、宮崎→記紀神話ではない延岡・都城・飫肥、など)。
 *
 * ## 40都市の内訳(6地方)
 *
 * 地方区分は基本的に県だが、**大分・宮崎はそれぞれ3都市ずつと薄いため
 * 「東九州」(`toe`)としてまとめた。**日豊本線で結ばれた九州東側の
 * 海岸線という地理的なまとまりがあり、7地方(3都市が2つ)より
 * 6地方(6都市が1つ)のほうが音楽・季節の1式あたりの厚みが出ると判断した
 * (team-lead との相談を経た決定。詳しい理由は REGISTER.md)。
 *
 * `fuk` 福岡(10)/ `sag` 佐賀(5)/ `nag` 長崎(8)/ `kum` 熊本(6)/
 * `toe` 東九州=大分+宮崎(6)/ `kag` 鹿児島(5)。
 *
 * `hashima`(端島)は現在無人島で鉄道も通っていないが、実在し係争の無い
 * 史跡で定期の観光船があるため、長崎からの航路(sea)で止まりマスにする
 * (team-lead 確認済み。強制労働の事実はカードにそのまま書いてある)。
 * `goto`・`tanegashima`・`sakurajima` も同じ理由で航路接続にした都市がある
 * (桜島は陸続きだが、実際の行き来は鹿児島市からのフェリーが主。
 * `KYUSHU_EDGES` を参照)。
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const KYUSHU_CITIES = {
  // ---------------------------------------------------------------------
  // fuk — 福岡県(10)
  // ---------------------------------------------------------------------
  omuta: city(
    "Ōmuta|Ōmuta|Ōmuta|大牟田",
    130.45, 33.03, "fuk", "pithead", "coalmine", "l",
    "Coal that built a nation, then left|Carbón que forjó una nación, y se fue|Le charbon qui bâtit une nation, puis partit|国を作り、そして去った炭鉱",
    "Coal from the Miike mine here fuelled Japan's industrialisation for over a century, dug partly under the sea by conscripted Korean and Chinese labourers and Allied prisoners of war during the Second World War. The mine closed in 1997, ending large-scale coal mining in Kyūshū, and the city's population has roughly halved since its 1959 peak.|El carbón de la mina Miike alimentó la industrialización de Japón durante más de un siglo, extraído en parte bajo el mar por trabajadores coreanos y chinos reclutados por la fuerza y prisioneros de guerra aliados durante la Segunda Guerra Mundial. La mina cerró en 1997, poniendo fin a la minería a gran escala en Kyūshū, y la población de la ciudad se ha reducido casi a la mitad desde su máximo de 1959.|Le charbon de la mine de Miike alimente l'industrialisation du Japon pendant plus d'un siècle, extrait en partie sous la mer par des travailleurs coréens et chinois réquisitionnés de force et des prisonniers de guerre alliés pendant la Seconde Guerre mondiale. La mine ferma en 1997, mettant fin à l'exploitation charbonnière à grande échelle à Kyūshū, et la population de la ville a presque diminué de moitié depuis son sommet de 1959.|三池炭鉱の石炭は一世紀以上にわたって日本の工業化を支え、坑道の一部は海の下まで伸びていた。第二次大戦中はそこで、強制的に連れてこられた朝鮮人・中国人労働者や連合軍捕虜が働かされた。1997年の閉山で九州の大規模な石炭採掘は終わり、市の人口は1959年のピークからほぼ半分にまで減っている。",
    [prop("Miike Coal Mine Pit-Head|Torre del pozo de Miike|Chevalement de la mine de Miike|三池炭鉱の竪坑櫓", 1320, 108),
     prop("Miike Port Coal Wharf|Muelle carbonero de Miike|Quai charbonnier de Miike|三池港の石炭岸壁", 1170, 96)],
  ),
  fukuoka: city(
    "Fukuoka|Fukuoka|Fukuoka|福岡",
    130.42, 33.59, "fuk", "rampart", "invasionwall", "r",
    "A stone wall built against the Mongols|Una muralla de piedra alzada contra los mongoles|Un mur de pierre bâti contre les Mongols|元寇に備えた石塁",
    "After the Mongol fleet's first invasion in 1274, the shogunate ordered a stone wall built the length of Hakata Bay, and when a second invasion fleet came in 1281 the wall held long enough for a storm to scatter it. Sections of the wall still stand along the bay today, a reminder that this city's closeness to the continent was once a danger as much as an opening.|Tras la primera invasión de la flota mongola en 1274, el shogunato ordenó levantar una muralla de piedra a lo largo de la bahía de Hakata, y cuando llegó una segunda flota en 1281, el muro resistió lo suficiente para que una tormenta la dispersara. Tramos del muro siguen en pie junto a la bahía, recordatorio de que la cercanía de esta ciudad al continente fue tanto un peligro como una apertura.|Après la première invasion de la flotte mongole en 1274, le shogunat ordonna la construction d'un mur de pierre tout le long de la baie de Hakata, et lorsqu'une seconde flotte arriva en 1281, le mur tint bon assez longtemps pour qu'une tempête la disperse. Des tronçons du mur se dressent encore le long de la baie, rappel que la proximité de cette ville avec le continent fut autant un danger qu'une ouverture.|1274年の元寇(文永の役)の後、幕府は博多湾沿いに石塁を築かせた。1281年の二度目の襲来(弘安の役)では、この石塁が持ちこたえるあいだに暴風が船団を吹き散らした。石塁の一部は今も湾沿いに残り、大陸に近いこの町にとってそれがかつて開放であると同時に脅威でもあったことを伝えている。",
    [prop("Hakata Bay Stone Wall|Muralla de piedra de la bahía de Hakata|Mur de pierre de la baie de Hakata|元寇防塁", 2280, 186),
     prop("Excavated Wall Segment|Tramo excavado del muro|Tronçon de mur exhumé|発掘された石塁の一区画", 1910, 156)],
  ),
  kokura: city(
    "Kokura|Kokura|Kokura|小倉",
    130.88, 33.89, "fuk", "arsenal", "cloudshelter", "l",
    "The city the second bomb missed|La ciudad que la segunda bomba no alcanzó|La ville que la seconde bombe manqua|二発目が逸れた街",
    "Kokura Arsenal, one of Japan's largest munitions plants, was the primary target for the second atomic bomb on 9 August 1945, but smoke from a conventional firebombing raid on a neighbouring city drifted over and hid it from the bomber's sight three times. The crew turned to their secondary target, Nagasaki, instead, and Kokura has called it luck ever since.|El Arsenal de Kokura, una de las mayores fábricas de municiones de Japón, era el objetivo principal de la segunda bomba atómica el 9 de agosto de 1945, pero el humo de un bombardeo convencional sobre una ciudad vecina lo cubrió y lo ocultó de la vista del bombardero tres veces. La tripulación viró hacia su objetivo secundario, Nagasaki, y desde entonces en Kokura se habla de la suerte de aquel día.|L'arsenal de Kokura, l'une des plus grandes usines de munitions du Japon, était la cible principale de la seconde bombe atomique le 9 août 1945, mais la fumée d'un bombardement conventionnel sur une ville voisine le recouvrit et le déroba trois fois à la vue du bombardier. L'équipage se rabattit sur sa cible secondaire, Nagasaki, et l'on parle depuis à Kokura de la chance de ce jour-là.|九州最大級の軍需工場だった小倉造兵廠は、1945年8月9日の二発目の原爆の第一目標だった。だが隣接する都市への通常爆撃の煙が流れ込み、爆撃機からの視界を三度にわたって塞いだ。乗員は第二目標の長崎へ向かい、以来、小倉ではあの日の運を語り継いでいる。",
    [prop("Kokura Arsenal Ruins|Ruinas del arsenal de Kokura|Ruines de l'arsenal de Kokura|小倉造兵廠跡", 1790, 146),
     prop("Kokura Castle|Castillo de Kokura|Château de Kokura|小倉城", 1900, 156)],
  ),
  yahata: city(
    "Yahata|Yahata|Yahata|八幡",
    130.75, 33.87, "fuk", "furnace", "steeltown", "r",
    "Where Japan first smelted its own steel|Donde Japón fundió por primera vez su propio acero|Où le Japon fondit pour la première fois son propre acier|日本が初めて自前で鉄を溶かした地",
    "The government built Japan's first integrated steelworks here in 1901, using coke shipped from the Chikuhō coalfield and blueprints bought from Germany, to free the country's military industry from imported steel. Decades of unfiltered smoke later gave the city some of the worst air in Japan, until a citizens' campaign in the 1960s and 70s forced the mills to clean up, a turnaround still studied by other industrial cities today.|El gobierno construyó aquí en 1901 la primera siderurgia integrada de Japón, usando coque traído de la cuenca carbonífera de Chikuhō y planos comprados a Alemania, para liberar a la industria militar del acero importado. Décadas de humo sin filtrar dieron después a la ciudad uno de los aires más contaminados de Japón, hasta que una campaña ciudadana de los años 60 y 70 obligó a limpiar las fábricas, un giro que aún se estudia en otras ciudades industriales.|Le gouvernement y bâtit en 1901 la première aciérie intégrée du Japon, utilisant du coke expédié du bassin houiller de Chikuhō et des plans achetés à l'Allemagne, afin d'affranchir l'industrie militaire de l'acier importé. Des décennies de fumées non filtrées donnèrent ensuite à la ville l'un des airs les plus pollués du Japon, jusqu'à ce qu'une campagne citoyenne des années 1960-1970 force les usines à s'assainir, un revirement encore étudié par d'autres villes industrielles.|政府は1901年、筑豊炭田から運んだコークスとドイツから買った設計図をもとに、日本初の官営一貫製鉄所をここに建てた。軍需産業を輸入鋼材から解き放つためだった。以後何十年もの無濾過の煙で、この街は日本有数の悪い空気を抱えることになったが、1960〜70年代の市民運動が工場に対策を迫り、その転換はいまも他の工業都市で参考にされている。",
    [prop("Yahata Blast Furnace|Alto horno de Yahata|Haut fourneau de Yahata|八幡の溶鉱炉", 1410, 116),
     prop("Clean-Air Campaign Hall|Sala de la campaña por el aire limpio|Salle de la campagne pour l'air pur|青空を取り戻す運動の資料館", 1110, 92)],
  ),
  moji: city(
    "Moji|Moji|Moji|門司",
    130.95, 33.94, "fuk", "strait", "straitport", "r",
    "Where the mainland is a five-minute walk away|Donde el continente está a cinco minutos a pie|Où le continent est à cinq minutes à pied|本州まで歩いて五分の岬",
    "At its narrowest the Kanmon Strait is barely 700 m wide, and since 1958 a pedestrian tunnel under the seabed has let people walk to Honshū in about ten minutes, crossing the prefectural border underwater on foot. The Meiji-era red-brick customs house on the waterfront recalls the port's earlier role clearing coal and goods bound for the rest of Japan and overseas.|En su punto más estrecho, el estrecho de Kanmon apenas mide 700 m, y desde 1958 un túnel peatonal bajo el lecho marino permite cruzar a Honshū en unos diez minutos, a pie y bajo el agua. La aduana de ladrillo rojo de la era Meiji, junto al muelle, recuerda el papel anterior del puerto despachando carbón y mercancías hacia el resto de Japón y el extranjero.|À son point le plus étroit, le détroit de Kanmon ne mesure guère plus de 700 m, et depuis 1958 un tunnel piétonnier sous le fond marin permet de rallier Honshū à pied en une dizaine de minutes, en traversant la frontière préfectorale sous l'eau. La douane de brique rouge de l'ère Meiji, sur le quai, rappelle le rôle antérieur du port dans le dédouanement du charbon et des marchandises vers le reste du Japon et l'étranger.|関門海峡は最も狭い所で幅700mに満たない。1958年からは海底の人道トンネルがあり、歩いてわずか十分ほどで本州へ渡れる、県境を海の底で徒歩越えする珍しい場所である。埠頭に残る明治期の赤煉瓦の税関は、かつてこの港が石炭や物資を全国・海外へ通関させていた頃を伝える。",
    [prop("Kanmon Pedestrian Tunnel Entrance|Entrada del túnel peatonal de Kanmon|Entrée du tunnel piétonnier de Kanmon|関門トンネル人道入口", 920, 76),
     prop("Meiji Customs House|Aduana de la era Meiji|Douane de l'ère Meiji|旧門司税関", 980, 80)],
  ),
  iizuka: city(
    "Iizuka|Iizuka|Iizuka|飯塚",
    130.69, 33.65, "fuk", "slagheap", "coalmine", "l",
    "A coalfield left standing in black hills|Una cuenca carbonífera reducida a colinas negras|Un bassin houiller réduit à des collines noires|黒い丘だけが残った炭田",
    "The Chikuhō coalfield around Iizuka once produced roughly half of Japan's domestic coal, worked by hundreds of small and mid-sized mines rather than one giant company. Most closed within a few years of each other in the 1960s as oil replaced coal, and the slag heaps called botayama that pile up over the flat farmland are what is left of them.|La cuenca carbonífera de Chikuhō, en torno a Iizuka, llegó a producir aproximadamente la mitad del carbón nacional de Japón, extraído por cientos de minas pequeñas y medianas en vez de una sola gran empresa. La mayoría cerró en pocos años, en la década de 1960, cuando el petróleo sustituyó al carbón, y las escombreras llamadas botayama que se alzan sobre las tierras llanas son lo que queda de ellas.|Le bassin houiller de Chikuhō, autour d'Iizuka, produisit jusqu'à environ la moitié du charbon national du Japon, extrait par des centaines de mines petites et moyennes plutôt que par une seule grande compagnie. La plupart fermèrent en l'espace de quelques années dans les années 1960, l'huile remplaçant le charbon, et les terrils appelés botayama qui dominent les terres plates sont ce qu'il en reste.|飯塚を含む筑豊炭田は、かつて日本の国内石炭のおよそ半分を産していた。一つの大企業ではなく、大小数百の炭鉱がそれを支えていた。1960年代、石油への転換でそのほとんどが数年のうちに相次いで閉山し、平野に積み上がるボタ山と呼ばれる捨て石の丘だけが今も残っている。",
    [prop("Botayama Slag Hill|Colina de escombros botayama|Terril botayama|ボタ山", 240, 20),
     prop("Coal Museum Shaft Model|Maqueta del pozo del museo del carbón|Maquette du puits du musée du charbon|石炭記念館の模擬坑道", 220, 18)],
  ),
  tagawa: city(
    "Tagawa|Tagawa|Tagawa|田川",
    130.80, 33.65, "fuk", "slagheap", "coalmine", "r",
    "The song that carried coal baskets on its beat|La canción que marcó el ritmo de las cestas de carbón|Le chant qui cadençait les paniers de charbon|石炭かごを担ぐ拍子になった唄",
    "Miners here set the rhythm of loading coal baskets to a work song, Tankō Bushi, that spread nationwide during the mining boom and is now danced every summer at bon festivals across Japan, most of the dancers unaware it began as mining labour, not folklore. The city's coal museum stands on the site of a former mine's winding tower, one of the few left upright in the Chikuhō field.|Aquí los mineros marcaban el ritmo de cargar cestas de carbón con una canción de trabajo, el Tankō Bushi, que se difundió por todo el país durante el auge minero y hoy se baila cada verano en los festivales bon de todo Japón, sin que la mayoría de quienes bailan sepan que nació como trabajo minero y no como folclore. El museo del carbón de la ciudad se alza sobre el emplazamiento de una antigua torre de extracción, una de las pocas que siguen en pie en la cuenca de Chikuhō.|Les mineurs y cadençaient le chargement des paniers de charbon sur un chant de travail, le Tankō Bushi, qui se répandit dans tout le pays pendant l'essor minier et se danse aujourd'hui chaque été aux fêtes bon dans tout le Japon, la plupart des danseurs ignorant qu'il naquit du travail minier et non du folklore. Le musée du charbon de la ville se dresse sur le site d'un ancien chevalement, l'un des rares encore debout dans le bassin de Chikuhō.|ここの炭鉱夫たちは石炭かごを担ぐ拍子に炭坑節を刻んだ。歌は採炭の最盛期に全国へ広まり、今も夏になれば日本中の盆踊りで踊られているが、それが元は民謡ではなく採炭労働の歌だったと知る踊り手は少ない。市の石炭記念館は旧炭鉱の竪坑櫓の跡に立ち、筑豊に今も残る数少ない櫓のひとつである。",
    [prop("Tankō Bushi Practice Yard|Patio de ensayo del Tankō Bushi|Cour de répétition du Tankō Bushi|炭坑節の稽古場", 225, 18),
     prop("Preserved Winding Tower|Torre de extracción conservada|Chevalement conservé|保存された竪坑櫓", 250, 20)],
  ),
  kurume: city(
    "Kurume|Kurume|Kurume|久留米",
    130.52, 33.32, "fuk", "tire", "factorytown", "l",
    "Where rubber shoes led to radial tires|Donde el calzado de goma llevó a los neumáticos|Où les chaussures en caoutchouc menèrent aux pneus|ゴム靴からタイヤへ",
    "A local sock maker began coating cloth soles in rubber here in 1919 to make cheaper work shoes, and the company built from that idea grew into Bridgestone, now one of the world's largest tyre makers, still headquartered a short walk from its first small workshop. The city was also the temporary southern end of Kyūshū's very first railway line, before floodwater on the Chikugo River delayed the bridge that would carry it onward.|Un fabricante local de calcetines comenzó en 1919 a recubrir de goma suelas de tela para hacer calzado de trabajo más barato, y la empresa nacida de esa idea se convirtió en Bridgestone, hoy uno de los mayores fabricantes de neumáticos del mundo, con sede aún a pocos pasos de su primer taller. La ciudad fue también el extremo sur provisional de la primerísima línea ferroviaria de Kyūshū, antes de que una crecida del río Chikugo retrasara el puente que la prolongaría.|Un fabricant local de chaussettes commença en 1919 à enduire de caoutchouc des semelles de tissu pour fabriquer des chaussures de travail moins chères, et l'entreprise née de cette idée devint Bridgestone, aujourd'hui l'un des plus grands fabricants de pneus au monde, toujours installé à quelques pas de son premier petit atelier. La ville fut aussi le terminus sud provisoire de la toute première ligne ferroviaire de Kyūshū, avant qu'une crue de la rivière Chikugo ne retarde le pont qui devait la prolonger.|1919年、地元の足袋屋が布底にゴムを貼って安価な作業靴を作り始めた。その発想から育った会社がブリヂストンで、いまや世界有数のタイヤメーカーとなった今も本社は最初の小さな工房からほど近い。この町はまた、九州で最初の鉄道路線の暫定的な南の終点でもあった。先の橋の工事が筑後川の氾濫で遅れていたためである。",
    [prop("Rubber Shoe Workshop|Taller de calzado de goma|Atelier de chaussures en caoutchouc|ゴム靴の工房", 760, 62),
     prop("Tire Factory Gate|Portón de la fábrica de neumáticos|Portail de l'usine de pneus|タイヤ工場の正門", 810, 66)],
  ),
  dazaifu: city(
    "Dazaifu|Dazaifu|Dazaifu|太宰府",
    130.52, 33.52, "fuk", "scholar", "ancientcapital", "r",
    "The office that ran Japan's front door for 500 years|La oficina que gestionó la puerta de Japón durante 500 años|Le bureau qui gérait la porte du Japon pendant 500 ans|五百年、国の玄関を差配した役所",
    "From the 7th century the Dazaifu government office managed diplomacy, trade and defence with the Asian mainland on behalf of the distant capital, making this small town Japan's actual point of contact with the outside world centuries before Nagasaki existed. Its most famous official arrived against his will: the scholar-statesman Sugawara no Michizane was exiled here in 901 on false charges, and after his death was worshipped as the god of learning at the shrine still built over his grave.|Desde el siglo VII, la sede de gobierno de Dazaifu gestionó la diplomacia, el comercio y la defensa con el continente asiático en nombre de la lejana capital, convirtiendo a esta pequeña localidad en el verdadero punto de contacto de Japón con el exterior, siglos antes de que existiera Nagasaki. Su funcionario más célebre llegó contra su voluntad: el erudito y estadista Sugawara no Michizane fue desterrado aquí en 901 por acusaciones falsas, y tras su muerte fue venerado como dios del saber en el santuario que aún se alza sobre su tumba.|Dès le VIIe siècle, le bureau gouvernemental de Dazaifu gérait la diplomatie, le commerce et la défense face au continent asiatique au nom de la lointaine capitale, faisant de cette petite ville le véritable point de contact du Japon avec l'extérieur, des siècles avant l'existence de Nagasaki. Son fonctionnaire le plus célèbre y arriva contre son gré : l'érudit et homme d'État Sugawara no Michizane y fut exilé en 901 sur de fausses accusations, et fut vénéré après sa mort comme le dieu du savoir dans le sanctuaire toujours bâti sur sa tombe.|7世紀以来、大宰府はここから遠い都に代わって大陸との外交・貿易・防衛を取り仕切った。長崎が生まれる何百年も前、日本が実際に外の世界と接する窓口はこの小さな町だったのである。最も有名な赴任者は、望んでここへ来たわけではない。学者政治家・菅原道真は901年、無実の罪でここへ左遷され、没後は墓の上に建つ社で学問の神として祀られている。",
    [prop("Dazaifu Government Ruins|Ruinas del gobierno de Dazaifu|Ruines du gouvernement de Dazaifu|大宰府政庁跡", 810, 66),
     prop("Plum Tree by the Shrine|Ciruelo junto al santuario|Prunier près du sanctuaire|天満宮の飛梅", 710, 58)],
  ),
  munakata: city(
    "Munakata|Munakata|Munakata|宗像",
    130.55, 33.80, "fuk", "sacredisland", "shrinecoast", "l",
    "An island where nothing may be taken away|Una isla de la que nada puede sacarse|Une île d'où rien ne peut être emporté|何も持ち出せない島",
    "The shrine here is dedicated to three goddesses of safe sea passage, and its outer sanctuary sits on Okinoshima, an island 60 km offshore where over 80,000 ritual objects left by sailors praying for safe crossings to Korea have been found, every one of which by rule must stay on the island. Only a single Shinto priest is allowed to live there at a time, and visitors are barred entirely, making the shrine's own worshippers among the few people alive who cannot see its holiest site.|El santuario está dedicado a tres diosas de la travesía marítima segura, y su recinto exterior se encuentra en Okinoshima, una isla a 60 km de la costa donde se han hallado más de 80.000 objetos rituales dejados por marineros que rezaban por cruzar a salvo hacia Corea, todos los cuales, por norma, deben permanecer en la isla. Solo un sacerdote sintoísta puede vivir allí a la vez, y las visitas están completamente prohibidas, de modo que los propios fieles del santuario están entre las pocas personas que no pueden ver su lugar más sagrado.|Le sanctuaire est dédié à trois déesses de la traversée maritime sûre, et son enceinte extérieure se trouve sur Okinoshima, une île à 60 km au large où plus de 80 000 objets rituels laissés par des marins priant pour une traversée sûre vers la Corée ont été retrouvés, tous devant, par règle, rester sur l'île. Un seul prêtre shinto peut y vivre à la fois, et les visites y sont totalement interdites, si bien que les fidèles du sanctuaire comptent parmi les rares personnes vivantes qui ne peuvent voir son site le plus sacré.|この神社は航海の安全を司る三柱の女神を祀り、沖合60kmのおきのしまに沖津宮を置く。島では朝鮮半島への渡海の無事を祈った8万点を超す奉献品が見つかっており、決まりによってそのすべてが島から持ち出せない。島に常駐できるのは神職一人だけで、一般の立ち入りは一切許されない。宗像大社の氏子でさえ、その最も神聖な場所を目にできない人々のひとりである。",
    [prop("Hetsu-miya Coastal Shrine|Santuario costero Hetsu-miya|Sanctuaire côtier de Hetsu-miya|辺津宮", 440, 36),
     prop("Ritual Offering Museum|Museo de ofrendas rituales|Musée des offrandes rituelles|神宝館", 410, 34)],
  ),

  // ---------------------------------------------------------------------
  // sag — 佐賀県(5)
  // ---------------------------------------------------------------------
  saga: city(
    "Saga|Saga|Saga|佐賀",
    130.30, 33.25, "sag", "furnace", "domainworks", "r",
    "A domain that cast cannons before the Restoration|Un dominio que fundió cañones antes de la Restauración|Un domaine qui coula des canons avant la Restauration|維新前に大砲を鋳た藩",
    "In 1850, more than a decade before the Meiji Restoration, Saga domain built Japan's first working reverberatory furnace from a Dutch technical manual, and cast Western-style cannon here to defend the coast even though no one in the domain had seen the design in person. Saga engineers went on to build the country's first domestically made steam locomotive model and warship, work usually credited to Satsuma and Chōshū in the standard telling of the Restoration.|En 1850, más de una década antes de la Restauración Meiji, el dominio de Saga construyó el primer horno de reverbero funcional de Japón siguiendo un manual técnico holandés, y fundió allí cañones de estilo occidental para defender la costa, aunque nadie en el dominio había visto el diseño en persona. Los ingenieros de Saga siguieron construyendo el primer modelo de locomotora de vapor y el primer buque de guerra hechos en el país, un mérito que el relato habitual de la Restauración suele atribuir a Satsuma y Chōshū.|En 1850, plus d'une décennie avant la restauration Meiji, le domaine de Saga construisit le premier haut fourneau à réverbère opérationnel du Japon d'après un manuel technique néerlandais, et y coula des canons de style occidental pour défendre la côte, bien que personne dans le domaine n'ait vu le plan de près. Les ingénieurs de Saga construisirent ensuite le premier modèle de locomotive à vapeur et le premier navire de guerre fabriqués dans le pays, un mérite que le récit habituel de la Restauration attribue d'ordinaire à Satsuma et Chōshū.|明治維新の十年以上前、1850年に佐賀藩はオランダの技術書だけを頼りに日本初の実働する反射炉を築き、実物を誰も見たことがないまま西洋式の大砲を鋳造して沿岸防備にあてた。佐賀の技術者たちはさらに国産初の蒸気機関車の模型や軍艦の建造へと進んだが、この功績は維新の定番の語りでは薩摩や長州の手柄として語られがちである。",
    [prop("Reverberatory Furnace Site|Yacimiento del horno de reverbero|Site du haut fourneau à réverbère|築地反射炉跡", 1590, 130),
     prop("Steam Locomotive Model Workshop|Taller del modelo de locomotora|Atelier de la maquette de locomotive|蒸気車雛形の工房", 1320, 108)],
  ),
  arita: city(
    "Arita|Arita|Arita|有田",
    129.87, 33.19, "sag", "porcelain", "kilnvillage", "l",
    "The potter Japan later made a shrine for|El alfarero al que Japón erigió luego un santuario|Le potier à qui le Japon bâtit plus tard un sanctuaire|後に神社が建てられた陶工",
    "The kaolin clay that made Japanese porcelain possible was found here around 1616 by Yi Sam-pyeong, a Korean potter brought to Japan by force during Toyotomi Hideyoshi's invasions of Korea in the 1590s. Arita built a shrine to him in 1959 honouring him as the craft's founder, a memorial that sits uneasily alongside the fact that he never chose to come.|El caolín que hizo posible la porcelana japonesa se halló aquí hacia 1616 gracias a Yi Sam-pyeong, un alfarero coreano traído a Japón por la fuerza durante las invasiones de Corea de Toyotomi Hideyoshi en la década de 1590. Arita le erigió un santuario en 1959 como fundador del oficio, un homenaje que convive incómodamente con el hecho de que él nunca eligió venir.|Le kaolin qui rendit possible la porcelaine japonaise fut découvert ici vers 1616 par Yi Sam-pyeong, un potier coréen amené de force au Japon lors des invasions de la Corée par Toyotomi Hideyoshi dans les années 1590. Arita lui bâtit un sanctuaire en 1959 pour l'honorer comme fondateur de l'art, un hommage qui cohabite mal avec le fait qu'il n'a jamais choisi de venir.|日本の磁器を可能にした磁石(陶石)は1616年頃、李参平という陶工がここで見つけた。彼は1590年代、豊臣秀吉の朝鮮出兵の際に強制的に日本へ連れて来られた朝鮮人だった。有田は1959年、彼を陶祖として祀る神社を建てたが、その顕彰は彼が自ら望んで来たわけではないという事実と、居心地悪く同居している。",
    [prop("Izumiyama Kaolin Quarry|Cantera de caolín de Izumiyama|Carrière de kaolin d'Izumiyama|泉山磁石場", 410, 34),
     prop("Climbing Kiln Row|Fila de hornos escalonados|Rangée de fours à flanc de colline|登り窯の連なり", 440, 36)],
  ),
  imari: city(
    "Imari|Imari|Imari|伊万里",
    129.89, 33.27, "sag", "exportcrate", "exportport", "r",
    "The port that shipped porcelain to Dutch dining rooms|El puerto que embarcó porcelana a los comedores holandeses|Le port qui expédiait la porcelaine vers les salles à manger hollandaises|オランダの食卓へ磁器を送った港",
    "Arita's porcelain could not be shipped from Arita itself, so it was carried overland to this port and loaded aboard Dutch East India Company ships bound for Dejima and, from there, Europe. Blue-and-white Imari ware, as it came to be called abroad regardless of which town actually fired it, ended up decorating dining rooms and palaces from Amsterdam to Versailles.|La porcelana de Arita no podía embarcarse desde la propia Arita, así que se transportaba por tierra hasta este puerto y se cargaba en barcos de la Compañía Neerlandesa de las Indias Orientales rumbo a Dejima y, desde allí, a Europa. La loza azul y blanca llamada Imari en el extranjero, sin importar en qué localidad se hubiera cocido en realidad, acabó decorando comedores y palacios de Ámsterdam a Versalles.|La porcelaine d'Arita ne pouvait être expédiée depuis Arita même ; elle était donc transportée par voie terrestre jusqu'à ce port et chargée à bord de navires de la Compagnie néerlandaise des Indes orientales à destination de Dejima puis, de là, de l'Europe. La faïence bleu et blanc appelée Imari à l'étranger, quelle que soit la ville où elle avait réellement été cuite, finit par orner des salles à manger et des palais d'Amsterdam à Versailles.|有田の磁器は有田自体からは積み出せず、陸路でこの港まで運ばれ、オランダ東インド会社の船に積まれて出島へ、そこからさらに欧州へと送られた。実際にどの町で焼かれたかにかかわらず海外で「伊万里」と呼ばれた染付の器は、アムステルダムからヴェルサイユまでの食卓や宮殿を飾ることになった。",
    [prop("Porcelain Loading Wharf|Muelle de carga de porcelana|Quai de chargement de la porcelaine|磁器積出岸壁", 390, 32),
     prop("Old Imari Merchant Row|Antigua fila de comerciantes de Imari|Ancienne rangée de marchands d'Imari|大川内山の商家通り", 350, 28)],
  ),
  karatsu: city(
    "Karatsu|Karatsu|Karatsu|唐津",
    129.97, 33.45, "sag", "ruinedcastle", "invasionbase", "l",
    "A city built for an invasion, then abandoned|Una ciudad construida para una invasión, y luego abandonada|Une ville bâtie pour une invasion, puis abandonnée|出兵のために築かれ、捨てられた城",
    "Toyotomi Hideyoshi built Nagoya Castle here in 1591 as the staging base for his invasions of Korea, and for a few years the surrounding camp town briefly held well over a hundred thousand people, larger than most Japanese cities of the era. When the invasions ended in failure and Hideyoshi died in 1598, the castle was deliberately dismantled and the site left to fields; only foundation stones and camp markers remain today.|Toyotomi Hideyoshi construyó aquí el castillo de Nagoya en 1591 como base de operaciones para sus invasiones de Corea, y durante unos años la ciudad-campamento circundante llegó a albergar bastante más de cien mil personas, más que la mayoría de las ciudades japonesas de la época. Cuando las invasiones acabaron en fracaso y Hideyoshi murió en 1598, el castillo fue desmantelado deliberadamente y el lugar quedó reducido a campos; hoy solo quedan los cimientos y las marcas de los campamentos.|Toyotomi Hideyoshi bâtit ici le château de Nagoya en 1591 comme base de départ pour ses invasions de la Corée, et pendant quelques années la ville-campement environnante compta bien plus de cent mille habitants, davantage que la plupart des villes japonaises de l'époque. Lorsque les invasions se soldèrent par un échec et que Hideyoshi mourut en 1598, le château fut délibérément démantelé et le site rendu aux champs ; il n'en reste aujourd'hui que des fondations et des bornes de campement.|豊臣秀吉は1591年、朝鮮出兵の前線基地としてここに名護屋城を築いた。数年のあいだ、周囲の陣屋町は当時の日本の多くの都市を上回る十万人を超す人口を抱えたという。出兵が失敗に終わり1598年に秀吉が没すると、城は意図的に取り壊されて跡地は畑に戻された。今に残るのは礎石と諸大名の陣跡だけである。",
    [prop("Nagoya Castle Foundation Stones|Cimientos del castillo de Nagoya|Fondations du château de Nagoya|名護屋城跡の石垣", 1240, 102),
     prop("Daimyo Camp Marker Field|Campo de marcas de los campamentos|Champ des bornes de campement|諸大名陣跡", 950, 78)],
  ),
  yoshinogari: city(
    "Yoshinogari|Yoshinogari|Yoshinogari|吉野ヶ里",
    130.40, 33.32, "sag", "moat", "ancientsettlement", "b",
    "A walled town that predates the samurai by a thousand years|Un poblado amurallado mil años anterior a los samuráis|Une ville fortifiée antérieure aux samouraïs de mille ans|武士より千年早い環濠集落",
    "Excavated from 1986, the moated settlement here was inhabited from roughly the 3rd century BC to the 3rd century AD, its ditches, watchtowers and grain stores showing a fortified society already organised enough to fight over land and stored rice. Chinese chronicles from the period describe a country of this shape and era called Wa, and some historians think Yoshinogari may be a candidate for the semi-legendary kingdom of Yamatai.|Excavado desde 1986, el poblado amurallado por fosos aquí estuvo habitado desde aproximadamente el siglo III a. C. hasta el siglo III d. C., y sus fosos, atalayas y graneros muestran una sociedad fortificada ya organizada para disputarse tierra y arroz almacenado. Crónicas chinas de la época describen un país de esta forma y época llamado Wa, y algunos historiadores consideran a Yoshinogari un candidato al semilegendario reino de Yamatai.|Fouillé depuis 1986, l'établissement entouré de fossés ici fut habité d'environ le IIIe siècle av. J.-C. au IIIe siècle apr. J.-C. ; ses fossés, tours de guet et greniers montrent une société fortifiée déjà organisée pour se disputer terres et riz stocké. Des chroniques chinoises de l'époque décrivent un pays de cette forme et de cette époque appelé Wa, et certains historiens considèrent Yoshinogari comme un candidat possible pour le royaume semi-légendaire de Yamatai.|1986年から発掘が進んだこの環濠集落は、紀元前3世紀頃から紀元後3世紀頃まで営まれた。濠・物見櫓・高床の倉庫は、土地や貯えた米をめぐって争うだけの組織を既に持つ社会があったことを示す。同時代の中国の史書はこの規模と時代の「倭」の国を記しており、一部の研究者は吉野ヶ里を半ば伝説的な邪馬台国の候補地の一つに数える。",
    [prop("Moated Watchtower|Atalaya del foso|Tour de guet du fossé|物見櫓", 270, 22),
     prop("Raised-Floor Granary|Granero elevado|Grenier surélevé|高床倉庫", 250, 20)],
  ),

  // ---------------------------------------------------------------------
  // nag — 長崎県(8)
  // ---------------------------------------------------------------------
  hashima: city(
    "Hashima|Hashima|Hashima|端島",
    129.7385, 32.6275, "nag", "concreteruins", "ghosttown", "b",
    "A concrete island, emptied in months|Una isla de hormigón, vaciada en meses|Une île de béton, vidée en quelques mois|数か月で無人になった軍艦島",
    "At its peak in 1959, over five thousand people were packed onto this six-hectare artificial coal island, giving it what was reported to be the highest population density in the world. Korean and Chinese labourers were forced to work its undersea tunnels during the war; the mine closed in 1974, and within months the island stood completely empty, its concrete blocks now crumbling toward the sea.|En su apogeo, en 1959, más de cinco mil personas se apiñaban en esta isla artificial de carbón de seis hectáreas, lo que le dio, según se dijo, la mayor densidad de población del mundo. Trabajadores coreanos y chinos fueron obligados a trabajar en sus túneles submarinos durante la guerra; la mina cerró en 1974 y en pocos meses la isla quedó completamente vacía, con sus bloques de hormigón desmoronándose hacia el mar.|À son apogée, en 1959, plus de cinq mille personnes s'entassaient sur cette île artificielle de charbon de six hectares, lui donnant ce qui fut rapporté comme la plus forte densité de population au monde. Des travailleurs coréens et chinois furent contraints de travailler dans ses galeries sous-marines pendant la guerre ; la mine ferma en 1974 et, en quelques mois, l'île se retrouva entièrement vide, ses blocs de béton s'effritant vers la mer.|1959年のピーク時、6ヘクタールの人工の石炭の島に5千人以上がひしめき、当時世界一と言われた人口密度になった。戦時中は朝鮮人・中国人労働者が海底の坑道で強制的に働かされた。1974年の閉山からわずか数か月で島は完全に無人となり、コンクリートの建物は今も海へ向かって崩れ続けている。",
    [prop("Undersea Mine Shaft|Pozo minero submarino|Puits minier sous-marin|海底坑道の竪坑", 1900, 156),
     prop("Crumbling Apartment Block|Bloque de apartamentos en ruinas|Immeuble en ruine|崩れゆく高層アパート", 1680, 138)],
  ),
  hirado: city(
    "Hirado|Hirado|Hirado|平戸",
    129.55, 33.36, "nag", "tradepost", "foreignquay", "l",
    "Where Europe's window opened first|Donde se abrió primero la ventana de Europa|Où s'ouvrit d'abord la fenêtre de l'Europe|出島より早く開いた窓",
    "Portuguese ships anchored here in 1550, and the Dutch and English both built trading posts on this small island decades before Nagasaki's Dejima existed. In 1641 the shogunate ordered the newly built Dutch warehouse torn down and its traders relocated to Dejima, after an inspector noticed the year of its construction had been carved in the Christian calendar.|Barcos portugueses fondearon aquí en 1550, y tanto holandeses como ingleses construyeron factorías en esta pequeña isla décadas antes de que existiera Dejima en Nagasaki. En 1641 el shogunato ordenó derribar el almacén holandés recién construido y trasladar a sus comerciantes a Dejima, después de que un inspector notara que el año de construcción estaba tallado según el calendario cristiano.|Des navires portugais y mouillèrent en 1550, et Hollandais comme Anglais y bâtirent des comptoirs sur cette petite île, des décennies avant que Dejima n'existe à Nagasaki. En 1641, le shogunat ordonna la démolition du nouvel entrepôt hollandais et le transfert de ses marchands à Dejima, après qu'un inspecteur eut remarqué que l'année de construction y était gravée selon le calendrier chrétien.|1550年にポルトガル船が入港して以来、オランダもイギリスも、長崎の出島ができるより数十年早くこの小さな島に商館を構えた。1641年、幕府は新築のオランダの倉庫を取り壊させ、商館を出島へ移させた。棟に刻まれた竣工年がキリスト教暦で書かれていたのを役人が見咎めたためである。",
    [prop("Dutch Trading House Ruins|Ruinas de la factoría holandesa|Ruines du comptoir hollandais|オランダ商館跡", 1170, 96),
     prop("Matsura Clan Castle|Castillo del clan Matsura|Château du clan Matsura|松浦氏の平戸城", 1030, 84)],
  ),
  nagasaki: city(
    "Nagasaki|Nagasaki|Nagasaki|長崎",
    129.864, 32.774, "nag", "cathedral", "memorialchurch", "r",
    "A cathedral, hidden then bombed|Una catedral, oculta y luego bombardeada|Une cathédrale, cachée puis bombardée|潜伏の果てに被爆した教会",
    "Urakami's Catholics had practised in secret for over two centuries after Christianity was outlawed, and were finally allowed to worship openly only in 1873; the cathedral they completed there in 1925 was, for a time, the largest in East Asia. The second atomic bomb detonated almost directly above it on 9 August 1945, and although part of the ruin could have been kept standing as a memorial, the city demolished most of it in 1958 and rebuilt on the same ground — a decision that is still debated.|Los católicos de Urakami habían practicado en secreto durante más de dos siglos tras la prohibición del cristianismo, y solo se les permitió el culto abierto en 1873; la catedral que terminaron allí en 1925 fue, por un tiempo, la mayor de Asia oriental. La segunda bomba atómica detonó casi directamente sobre ella el 9 de agosto de 1945, y aunque parte de la ruina podría haberse conservado en pie como memorial, la ciudad demolió la mayor parte en 1958 y reconstruyó en el mismo terreno — una decisión aún debatida.|Les catholiques d'Urakami avaient pratiqué leur foi en secret pendant plus de deux siècles après l'interdiction du christianisme, et ne furent autorisés à un culte ouvert qu'en 1873 ; la cathédrale qu'ils y achevèrent en 1925 fut, un temps, la plus grande d'Asie de l'Est. La seconde bombe atomique explosa presque directement au-dessus d'elle le 9 août 1945, et bien qu'une partie des ruines aurait pu rester debout en mémorial, la ville en démolit l'essentiel en 1958 pour rebâtir sur le même terrain — une décision encore débattue.|浦上のキリシタンは禁教下の二百年余りを潜伏して信仰を守り、公に礼拝できるようになったのは1873年になってからだった。1925年に完成した浦上天主堂は、一時は東アジア最大の教会だった。1945年8月9日、二発目の原爆はほぼ真上で炸裂した。廃墟の一部は記念として残せたはずだが、市は1958年にその多くを取り壊して同じ場所に建て直した。この判断は今も議論が続いている。",
    [prop("Bombed Bell Tower Relic|Reliquia de la torre bombardeada|Relique du clocher bombardé|被爆した鐘楼の遺構", 2430, 200),
     prop("Rebuilt Cathedral|Catedral reconstruida|Cathédrale reconstruite|再建された天主堂", 2720, 224)],
  ),
  sasebo: city(
    "Sasebo|Sasebo|Sasebo|佐世保",
    129.72, 33.16, "nag", "drydock", "navalport", "l",
    "A fishing village the navy turned into a shipyard|Un pueblo de pescadores que la armada convirtió en astillero|Un village de pêcheurs que la marine transforma en chantier naval|海軍が造船の町に変えた漁村",
    "Meiji Japan chose this quiet fishing inlet in 1889 to build one of its four Imperial Navy bases, valuing the deep, sheltered bay over the village's dozen or so households, and the shipyard has kept building and repairing warships continuously through empire, wartime destruction and postwar occupation. Since 1946 it has hosted a United States Navy base as well as Japan's own fleet, the two flags flying over the same harbour that once launched Meiji-era ironclads.|El Japón Meiji eligió esta tranquila ensenada pesquera en 1889 para construir una de sus cuatro bases de la Armada Imperial, valorando la bahía profunda y resguardada por encima de la docena de hogares del pueblo, y el astillero ha seguido construyendo y reparando buques de guerra sin interrupción a través del imperio, la destrucción bélica y la ocupación de posguerra. Desde 1946 alberga también una base de la Armada de Estados Unidos junto a la flota japonesa, dos banderas ondeando sobre el mismo puerto que antaño botó los acorazados de la era Meiji.|Le Japon Meiji choisit cette anse de pêche tranquille en 1889 pour y construire l'une de ses quatre bases de la Marine impériale, privilégiant la baie profonde et abritée à la douzaine de foyers du village, et le chantier n'a cessé depuis de construire et réparer des navires de guerre à travers l'empire, les destructions de la guerre et l'occupation d'après-guerre. Depuis 1946, il abrite aussi une base de la marine américaine aux côtés de la flotte japonaise, deux drapeaux flottant sur le même port qui lança jadis les cuirassés de l'ère Meiji.|明治政府は1889年、この静かな漁村の入江に帝国海軍四鎮守府の一つを置くことを決めた。わずか十数戸の集落より、深く守られた湾を選んだのである。以来この造船所は、帝国の時代・戦災・戦後の占領を通じて絶えず軍艦を建造・修理し続けてきた。1946年からはアメリカ海軍の基地も置かれ、明治の鉄甲艦を送り出したのと同じ港に、今は二つの国の旗が並んで揚がっている。",
    [prop("Naval Shipyard Dry Dock|Dique seco del astillero naval|Cale sèche du chantier naval|海軍工廠のドック", 1690, 138),
     prop("Base Town Burger Row|Fila de hamburgueserías del pueblo base|Rangée de burgers de la ville-base|基地の街のバーガー通り", 1330, 110)],
  ),
  shimabara: city(
    "Shimabara|Shimabara|Shimabara|島原",
    130.365, 32.783, "nag", "banner", "rebellionfield", "r",
    "Where thirty-seven thousand made a final stand|Donde treinta y siete mil resistieron un último asedio|Où trente-sept mille firent un dernier baroud d'honneur|三万七千が立てこもった最後の砦",
    "In 1637, crushing taxation and religious persecution drove local peasants, many of them Christian, into rebellion under the teenage leader Amakusa Shirō, and roughly 37,000 men, women and children held out through a winter siege at nearby Hara Castle. The shogunate's army finally broke through in April 1638 and killed almost everyone inside, an event that helped push Japan toward two centuries of near-total isolation.|En 1637, los impuestos aplastantes y la persecución religiosa llevaron a los campesinos locales, muchos de ellos cristianos, a la rebelión bajo el joven líder adolescente Amakusa Shirō, y unas 37.000 personas, entre hombres, mujeres y niños, resistieron durante un asedio invernal en el cercano castillo de Hara. El ejército del shogunato acabó irrumpiendo en abril de 1638 y mató a casi todos los que estaban dentro, un episodio que empujó a Japón hacia dos siglos de aislamiento casi total.|En 1637, des impôts écrasants et la persécution religieuse poussèrent les paysans locaux, dont beaucoup étaient chrétiens, à la rébellion sous la conduite du jeune chef adolescent Amakusa Shirō, et environ 37 000 hommes, femmes et enfants tinrent bon durant un siège hivernal au château de Hara tout proche. L'armée du shogunat finit par percer en avril 1638 et tua presque tous ceux qui s'y trouvaient, un épisode qui poussa le Japon vers deux siècles d'isolement quasi total.|1637年、過酷な年貢とキリシタン弾圧に追い詰められた地元の百姓たちは、少年天草四郎を頭に反乱を起こした。多くはキリシタンだった。およそ3万7千の男女子供が、近くの原城で冬の籠城戦を戦い抜いた。1638年4月、幕府軍はついに城を落とし、籠城していたほぼ全員を殺した。この事件は日本を二百年におよぶほぼ完全な鎖国へと押しやる一因になった。",
    [prop("Hara Castle Siege Ruins|Ruinas del asedio del castillo de Hara|Ruines du siège du château de Hara|原城跡", 1030, 84),
     prop("Rebellion Memorial Hall|Sala conmemorativa de la rebelión|Salle commémorative de la rébellion|島原の乱の資料館", 870, 72)],
  ),
  unzen: city(
    "Unzen|Unzen|Unzen|雲仙",
    130.27, 32.75, "nag", "hellpool", "volcanicpark", "l",
    "Hot springs once used to torture, now a national park|Aguas termales antes usadas para torturar, hoy parque nacional|Des sources chaudes jadis torture, aujourd'hui parc national|拷問の湯が、いまは国立公園",
    "During the Edo-period persecution of Christians, officials at these boiling sulphur pools forced believers who refused to renounce their faith into the scalding water, and some died there; the site is still called Unzen Jigoku, hell. In 1934 the area became Japan's first-ever national park, and in 1991 a pyroclastic flow from Mount Unzen killed 43 people including volcanologists and journalists who had gathered too close, a reminder that the mountain's hazard never really ended.|Durante la persecución de cristianos de la era Edo, los funcionarios arrojaban a estas pozas hirvientes de azufre a los creyentes que se negaban a renunciar a su fe, y algunos murieron allí; el lugar aún se llama Unzen Jigoku, «infierno». En 1934 la zona se convirtió en el primer parque nacional de Japón, y en 1991 una colada piroclástica del monte Unzen mató a 43 personas, entre ellas vulcanólogos y periodistas que se habían acercado demasiado, un recordatorio de que el peligro de la montaña nunca terminó realmente.|Pendant la persécution des chrétiens de l'époque d'Edo, les autorités jetaient dans ces bassins de soufre bouillants les croyants qui refusaient de renier leur foi, et certains y moururent ; le site s'appelle encore Unzen Jigoku, « l'enfer ». En 1934, la région devint le tout premier parc national du Japon, et en 1991 une coulée pyroclastique du mont Unzen tua 43 personnes, dont des volcanologues et des journalistes venus trop près, rappel que le danger de la montagne n'a jamais vraiment cessé.|江戸期のキリシタン弾圧では、信仰を捨てない者をこの煮え立つ硫黄泉に役人が投げ込み、命を落とす者もいた。今もこの場所は「雲仙地獄」と呼ばれる。1934年、この一帯は日本で最初の国立公園に指定された。1991年には雲仙普賢岳の火砕流が43人の命を奪い、その中には近づきすぎた火山学者や報道関係者も含まれていた。山の危険が今も終わっていないことを伝える出来事である。",
    [prop("Unzen Jigoku Boiling Pools|Pozas hirvientes de Unzen Jigoku|Bassins bouillants d'Unzen Jigoku|雲仙地獄の噴気地帯", 530, 44),
     prop("1991 Eruption Memorial|Monumento a la erupción de 1991|Mémorial de l'éruption de 1991|平成噴火の碑", 460, 38)],
  ),
  goto: city(
    "Gotō|Gotō|Gotō|五島",
    128.84, 32.69, "nag", "hiddenchurch", "hiddenvillage", "b",
    "Islands settled for the sake of hiding|Islas pobladas para poder esconderse|Des îles peuplées pour pouvoir se cacher|隠れるために移り住んだ島",
    "When persecution eased in the early Meiji years, many hidden Christian families from the mainland deliberately resettled on these remote islands, clearing marginal hillside land no one else wanted, precisely because the isolation let them worship with less scrutiny. Dozens of small churches, several now part of a UNESCO World Heritage listing, still stand in villages that were founded for concealment rather than farmland.|Cuando la persecución se suavizó a comienzos de la era Meiji, muchas familias cristianas ocultas del continente se reasentaron deliberadamente en estas islas remotas, roturando tierras marginales de ladera que nadie más quería, precisamente porque el aislamiento les permitía practicar su culto con menos vigilancia. Decenas de pequeñas iglesias, varias incluidas hoy en una lista de Patrimonio Mundial de la UNESCO, siguen en pie en pueblos fundados para ocultarse, no para cultivar la tierra.|Lorsque la persécution s'atténua au début de l'ère Meiji, de nombreuses familles chrétiennes cachées du continent se réinstallèrent délibérément sur ces îles reculées, défrichant des terres de coteau marginales que personne d'autre ne voulait, précisément parce que l'isolement leur permettait de pratiquer leur culte avec moins de surveillance. Des dizaines de petites églises, dont plusieurs font aujourd'hui partie d'un site du patrimoine mondial de l'UNESCO, se dressent encore dans des villages fondés pour se cacher, non pour cultiver la terre.|明治初期に弾圧が緩むと、本土の潜伏キリシタンの家族の多くが、あえてこの離島へ移り住んだ。誰も欲しがらない斜面の痩せ地を切り開いたのは、その隔絶が信仰を人目から遠ざけてくれたからにほかならない。いくつかがユネスコ世界遺産にも含まれる数十の小さな教会が、農地としてではなく身を隠すために興された集落に今も立っている。",
    [prop("Cliffside Village Church|Iglesia del pueblo en el acantilado|Église du village à flanc de falaise|断崖の集落教会", 255, 20),
     prop("Hillside Terraced Field|Bancal en la ladera|Terrasse à flanc de coteau|開墾された段々畑", 195, 16)],
  ),
  isahaya: city(
    "Isahaya|Isahaya|Isahaya|諫早",
    130.05, 32.84, "nag", "floodgate", "reclaimedflats", "r",
    "A gate that turned sea into farmland, and a lawsuit that never closed|Una compuerta que convirtió el mar en tierra de cultivo, y un litigio sin cerrar|Une digue qui changea la mer en terres agricoles, et un procès sans fin|海を農地に変えた水門と、閉じない裁判",
    "In 1997 the government sealed off Isahaya Bay with a 7 km floodgate to reclaim its tidal mudflats for farmland, and 47 steel plates dropped in a single televised operation earned the moment the nickname 'the guillotine'. Fishermen who said the closed bay killed their catch and farmers who depend on the drained land it created have been suing each other, and the government, over whether to reopen the gate for more than two decades since.|En 1997 el gobierno cerró la bahía de Isahaya con un dique de 7 km para ganar sus marismas al mar y convertirlas en tierras de cultivo, y las 47 planchas de acero que cayeron en una sola operación televisada dieron al momento el apodo de «la guillotina». Los pescadores que dicen que la bahía cerrada acabó con su pesca y los agricultores que dependen de la tierra drenada que creó llevan más de dos décadas demandándose entre sí, y al gobierno, sobre si reabrir la compuerta.|En 1997, le gouvernement ferma la baie d'Isahaya par une digue de 7 km pour gagner ses vasières sur la mer et en faire des terres agricoles, et les 47 plaques d'acier abaissées lors d'une seule opération télévisée valurent à l'instant le surnom de « la guillotine ». Les pêcheurs qui affirment que la baie fermée a tué leur pêche et les agriculteurs qui dépendent des terres asséchées ainsi créées se poursuivent en justice, ainsi que l'État, sur la réouverture de la digue depuis plus de deux décennies.|1997年、政府は諫早湾を全長7kmの潮受け堤防で閉め切り、干潟を農地として干拓した。47枚の鋼板を一斉に落とすテレビ中継された作業は「ギロチン」と呼ばれた。閉め切りで漁が獲れなくなったと訴える漁業者と、そうして生まれた干拓地に頼る農業者は、水門を開けるかどうかを巡って政府ともども二十年余り互いに訴訟を重ねている。",
    [prop("Tidal Floodgate Wall|Muro del dique de mareas|Digue à vannes|潮受け堤防", 630, 52),
     prop("Reclaimed Farmland Plot|Parcela de tierra ganada al mar|Parcelle de terre gagnée sur la mer|干拓農地", 560, 46)],
  ),

  // ---------------------------------------------------------------------
  // kum — 熊本県(6)
  // ---------------------------------------------------------------------
  kumamoto: city(
    "Kumamoto|Kumamoto|Kumamoto|熊本",
    130.708, 32.805, "kum", "quakecrack", "rebuildingcastle", "b",
    "A castle still being rebuilt stone by stone|Un castillo que aún se reconstruye piedra a piedra|Un château toujours reconstruit pierre par pierre|石垣を一つずつ積み直す城",
    "A magnitude-7.3 earthquake in April 2016 collapsed stone walls, roof tiles and a corner turret of Kumamoto Castle, and toppled roughly a third of its famous curved ramparts, built centuries earlier to be unclimbable. Restoration crews are numbering, cataloguing and refitting each fallen stone into its original position rather than pouring new walls, work expected to take until the 2050s to finish.|Un terremoto de magnitud 7,3 en abril de 2016 derrumbó muros de piedra, tejas y una torreta esquinera del castillo de Kumamoto, y derribó aproximadamente un tercio de sus célebres murallas curvas, construidas siglos atrás para ser inescalables. Los equipos de restauración numeran, catalogan y encajan cada piedra caída en su posición original en lugar de levantar muros nuevos, un trabajo que se prevé terminar hacia la década de 2050.|Un séisme de magnitude 7,3 en avril 2016 fit s'effondrer des murs de pierre, des tuiles et une tourelle d'angle du château de Kumamoto, abattant environ un tiers de ses célèbres remparts incurvés, bâtis des siècles plus tôt pour être inescaladables. Les équipes de restauration numérotent, cataloguent et remettent chaque pierre tombée à sa position d'origine plutôt que de couler de nouveaux murs, un chantier dont l'achèvement n'est pas attendu avant les années 2050.|2016年4月のマグニチュード7.3の地震は熊本城の石垣・瓦・隅櫓を崩し、登れないよう何世紀も前に築かれた名高い反り返る石垣のおよそ三分の一を倒壊させた。復旧作業では新しい石を積むのではなく、崩れた石の一つひとつに番号を振って記録し、元の位置へ積み直している。完了は2050年代までかかると見込まれている。",
    [prop("Numbered Fallen Stones Yard|Patio de piedras caídas numeradas|Cour des pierres numérotées|石垣の被災石置き場", 2020, 166),
     prop("Restored Corner Turret|Torreta esquinera restaurada|Tourelle d'angle restaurée|復旧した隅櫓", 2270, 186)],
  ),
  minamata: city(
    "Minamata|Minamata|Minamata|水俣",
    130.40, 32.22, "kum", "chemicalplant", "chemicaltown", "l",
    "The disease named after this bay|La enfermedad que lleva el nombre de esta bahía|La maladie qui porte le nom de cette baie|この湾の名を負った病",
    "From the 1930s a chemical company here discharged wastewater containing methylmercury into the bay, and by the time the poisoning was officially recognised in 1956, thousands of residents who had eaten the local fish were suffering neurological damage, some born with it from mothers who ate contaminated seafood while pregnant. The company and government resisted responsibility for decades, and certification of victims and compensation lawsuits over Minamata disease remain unresolved for some claimants today.|Desde la década de 1930, una empresa química de aquí vertió al mar aguas residuales con metilmercurio, y para cuando el envenenamiento se reconoció oficialmente en 1956, miles de vecinos que habían comido el pescado local sufrían daños neurológicos, algunos nacidos ya con ellos por madres que habían comido marisco contaminado durante el embarazo. La empresa y el gobierno se resistieron a asumir su responsabilidad durante décadas, y la certificación de víctimas y las demandas de indemnización por la enfermedad de Minamata siguen sin resolverse para algunos demandantes.|Dès les années 1930, une entreprise chimique ici déversait dans la baie des eaux usées chargées de méthylmercure, et lorsque l'empoisonnement fut officiellement reconnu en 1956, des milliers d'habitants ayant mangé le poisson local souffraient déjà de lésions neurologiques, certains nés ainsi de mères ayant consommé des fruits de mer contaminés pendant leur grossesse. L'entreprise et l'État ont résisté à toute responsabilité pendant des décennies, et la certification des victimes et les procès en indemnisation liés à la maladie de Minamata restent aujourd'hui non résolus pour certains plaignants.|1930年代からこの町の化学工場はメチル水銀を含む排水を湾に流し続け、1956年に公式に病気として認められた時には、地元の魚を食べていた住民数千人が神経障害に苦しんでいた。中には妊娠中に汚染された魚介を食べた母親から、既に症状を持って生まれた子もいた。会社と行政は何十年も責任を認めず、水俣病の被害認定と補償を巡る訴訟は今も一部の原告について決着していない。",
    [prop("Chisso Factory Outfall|Desagüe de la fábrica Chisso|Rejet de l'usine Chisso|工場排水口の跡", 680, 56),
     prop("Minamata Disease Museum|Museo de la enfermedad de Minamata|Musée de la maladie de Minamata|水俣病資料館", 720, 60)],
  ),
  yatsushiro: city(
    "Yatsushiro|Yatsushiro|Yatsushiro|八代",
    130.60, 32.51, "kum", "igusa", "farmtown", "r",
    "Japan's tatami mats, grown in one river delta|Los tatamis de Japón, cultivados en un solo delta|Les tatamis du Japon, cultivés dans un seul delta|この川の三角州が育てる畳表",
    "The soft green rush called igusa that is woven into tatami mat coverings nationwide is grown almost entirely in the silty delta fields around this city, cut by hand or machine in the summer heat and dried before weaving. The trade dates to the Edo period, when the local lord protected the rush fields as a domain monopoly, and the city still supplies the overwhelming majority of Japan's tatami-facing rush today.|El junco verde y blando llamado igusa, tejido en las cubiertas de las esterillas tatami de todo el país, se cultiva casi por completo en los campos deltaicos de limo alrededor de esta ciudad, cortado a mano o a máquina bajo el calor del verano y secado antes de tejerlo. El oficio se remonta al período Edo, cuando el señor local protegió los campos de junco como monopolio del dominio, y la ciudad sigue suministrando hoy la inmensa mayoría del junco para tatami de Japón.|Le jonc vert et tendre appelé igusa, tissé dans les revêtements de tatamis dans tout le pays, pousse presque exclusivement dans les champs limoneux du delta autour de cette ville, coupé à la main ou à la machine sous la chaleur de l'été puis séché avant le tissage. Le commerce remonte à l'époque d'Edo, quand le seigneur local protégeait les champs de jonc comme monopole du domaine, et la ville fournit encore aujourd'hui l'écrasante majorité du jonc à tatami du Japon.|全国の畳表に織り込まれる青々としたい草は、この市を囲む泥深い三角州の田でほぼすべて栽培されている。夏の暑さの中、手や機械で刈り取られ、織る前に乾燥させる。この産業は江戸時代、藩がい草田を専売として保護したことに始まり、市は今も日本の畳表い草の圧倒的多数を供給し続けている。",
    [prop("Igusa Drying Yard|Patio de secado de igusa|Aire de séchage de l'igusa|い草の乾燥場", 330, 28),
     prop("Tatami Weaving Workshop|Taller de tejido de tatami|Atelier de tissage de tatamis|畳表の織り工場", 350, 28)],
  ),
  hitoyoshi: city(
    "Hitoyoshi|Hitoyoshi|Hitoyoshi|人吉",
    130.76, 32.21, "kum", "watermark", "valleytown", "l",
    "Spared by distance, flooded by the same river|Salvada por la distancia, inundada por el mismo río|Épargnée par l'éloignement, inondée par la même rivière|距離に救われ、同じ川に沈んだ",
    "Tucked in a mountain basin far from any strategic target, this castle town was one of the few in Kyūshū never hit by wartime bombing, and its Edo-period streets and shrines survive largely intact as a result. That same setting failed to protect it from the Kuma River, which in July 2020 rose faster than warnings could reach some residents and killed dozens in one of Japan's deadliest floods in decades.|Enclavada en una cuenca montañosa lejos de cualquier objetivo estratégico, esta ciudad-castillo fue una de las pocas de Kyūshū que nunca sufrió bombardeos durante la guerra, y sus calles y santuarios de la era Edo sobreviven en gran parte intactos gracias a ello. Ese mismo emplazamiento no la protegió del río Kuma, que en julio de 2020 creció más deprisa de lo que las alertas pudieron alcanzar a algunos vecinos y mató a decenas de personas en una de las inundaciones más mortíferas de Japón en décadas.|Nichée dans un bassin montagneux loin de toute cible stratégique, cette ville-château fut l'une des rares du Kyūshū jamais touchée par les bombardements de la guerre, et ses rues et sanctuaires de l'époque d'Edo ont survécu en grande partie intacts de ce fait. Ce même cadre ne l'a pas protégée de la rivière Kuma, qui en juillet 2020 monta plus vite que les alertes ne purent atteindre certains habitants et tua des dizaines de personnes lors de l'une des inondations les plus meurtrières du Japon depuis des décennies.|戦略目標から遠い山あいの盆地にあったこのお城の町は、九州で戦災を免れた数少ない町の一つで、そのおかげで江戸期の町並みと社寺の多くが残っている。だが同じ地形は2020年7月の球磨川の水害からこの町を守らなかった。川は避難情報が届く前に住民の一部を襲うほどの速さで増水し、この数十年で最悪級の水害の一つとなって数十人の命を奪った。",
    [prop("Preserved Edo Merchant Street|Calle mercantil de la era Edo conservada|Rue marchande préservée de l'ère Edo|保存された江戸期の商家町", 500, 42),
     prop("Flood Height Marker Wall|Muro con marca de la altura de la crecida|Mur marquant la hauteur de la crue|浸水位を記した壁", 410, 34)],
  ),
  aso: city(
    "Aso|Aso|Aso|阿蘇",
    131.05, 32.95, "kum", "grassburn", "calderafarm", "r",
    "A town that lives inside the crater|Un pueblo que vive dentro del cráter|Une ville qui vit à l'intérieur du cratère|噴火口の内側に広がる町",
    "Roughly 50,000 people farm and raise cattle inside the Aso caldera, one of the largest in the world, on grassland kept open for well over a thousand years by a controlled burn called noyaki, set every spring before the new grass grows. Without the annual fire the grassland would revert to forest within a generation, so the caldera's landscape is not wilderness but the result of a chore repeated every year without a gap since at least the 9th century.|Unas 50.000 personas cultivan y crían ganado dentro de la caldera de Aso, una de las más grandes del mundo, en pastizales mantenidos abiertos durante más de mil años mediante una quema controlada llamada noyaki, encendida cada primavera antes de que brote la hierba nueva. Sin el fuego anual, el pastizal volvería a ser bosque en una generación, así que el paisaje de la caldera no es naturaleza salvaje, sino el resultado de una faena repetida cada año sin interrupción desde al menos el siglo IX.|Environ 50 000 personnes cultivent et élèvent du bétail à l'intérieur de la caldeira d'Aso, l'une des plus vastes au monde, sur des prairies maintenues ouvertes depuis plus de mille ans par un brûlis contrôlé appelé noyaki, allumé chaque printemps avant que ne pousse l'herbe nouvelle. Sans ce feu annuel, la prairie redeviendrait forêt en une génération ; le paysage de la caldeira n'est donc pas une nature sauvage, mais le résultat d'une corvée répétée chaque année sans interruption depuis au moins le IXe siècle.|世界有数の規模を持つ阿蘇カルデラの内側では、およそ5万人が農業と牧畜を営んでいる。その草原は千年以上、毎春新しい草が芽吹く前に行う野焼きという計画的な火入れによって維持されてきた。この年に一度の火入れが無ければ、草原は一世代のうちに森へ戻ってしまう。つまりカルデラの景観は手つかずの自然ではなく、少なくとも9世紀から絶えず繰り返されてきた作業の結果なのである。",
    [prop("Noyaki Grassland Burn|Quema de pastizal noyaki|Brûlis de prairie noyaki|野焼きの草原", 560, 46),
     prop("Caldera Cattle Pasture|Pasto de ganado en la caldera|Pâturage de la caldeira|カルデラの放牧地", 520, 42)],
  ),
  amakusa: city(
    "Amakusa|Amakusa|Amakusa|天草",
    130.19, 32.46, "kum", "strait", "fishingvillage", "l",
    "A fishing village where the church stands where believers once had to trample the cross|Un pueblo pesquero donde la iglesia se alza donde antaño se pisaba la cruz|Un village de pêcheurs où l'église se dresse là où l'on foulait jadis la croix|踏み絵の場に教会が立つ漁村",
    "At Sakitsu, a small fishing hamlet here, Edo-period officials forced suspected Christians to step on a bronze image of Christ, a test called fumi-e, to prove they had abandoned their faith; those who refused were killed. A church built in 1934 now stands directly on the site of that trampling stone, its floor deliberately placed over the exact spot where the test once took place, and the village is one of the components of the 2018 UNESCO listing of hidden Christian sites.|En Sakitsu, una pequeña aldea de pescadores de aquí, los funcionarios del período Edo obligaban a los sospechosos de ser cristianos a pisar una imagen de bronce de Cristo, una prueba llamada fumi-e, para demostrar que habían abandonado su fe; quienes se negaban eran ejecutados. Una iglesia construida en 1934 se alza hoy justo sobre el lugar de aquella piedra de pisar, con su suelo colocado deliberadamente sobre el punto exacto donde se realizaba la prueba, y el pueblo es uno de los componentes de la declaración de la UNESCO de 2018 sobre los sitios cristianos ocultos.|À Sakitsu, un petit hameau de pêcheurs d'ici, les autorités de l'époque d'Edo forçaient les suspects chrétiens à fouler une image de bronze du Christ, une épreuve appelée fumi-e, pour prouver qu'ils avaient abandonné leur foi ; ceux qui refusaient étaient exécutés. Une église bâtie en 1934 se dresse aujourd'hui juste sur le site de cette pierre à fouler, son sol placé délibérément sur l'endroit exact où se déroulait l'épreuve, et le village fait partie des composantes du site classé par l'UNESCO en 2018 pour les sites chrétiens cachés.|この地の小さな漁村・崎津では、江戸期の役人がキリシタンの疑いをかけた者に、信仰を捨てた証として踏み絵と呼ばれるキリストの銅像を踏ませた。拒んだ者は殺された。1934年に建てられた教会は、まさにその踏み絵が行われた場所の真上に、床がその跡地に重なるよう意図して建てられている。この村は2018年のユネスコ「潜伏キリシタン関連遺産」の構成資産の一つである。",
    [prop("Sakitsu Church on the Trampling Site|Iglesia de Sakitsu sobre el lugar del fumi-e|Église de Sakitsu sur le site du fumi-e|踏み絵跡に建つ崎津教会", 1100, 90),
     prop("Amakusa Five Bridges Overlook|Mirador de los cinco puentes de Amakusa|Belvédère des cinq ponts d'Amakusa|天草五橋の展望所", 920, 76)],
  ),

  // ---------------------------------------------------------------------
  // oit — 大分県(3)
  // ---------------------------------------------------------------------
  oita: city(
    "Ōita|Ōita|Ōita|大分",
    131.61, 33.24, "toe", "hospital", "domaincapital", "r",
    "A Christian lord's hospital, four centuries before universal care|El hospital de un señor cristiano, cuatro siglos antes de la sanidad universal|L'hôpital d'un seigneur chrétien, quatre siècles avant les soins universels|四百年前、キリシタン大名が建てた病院",
    "Ōtomo Sōrin, the daimyō who ruled this domain and converted to Christianity, invited the Portuguese physician Luís de Almeida to build Japan's first Western-style hospital here in 1557, treating patients regardless of status and performing surgery unlike anything practised in Japan at the time. The hospital closed after Sōrin's death and Christianity's later suppression, and it would be centuries before Japan had another public hospital open to all comers.|Ōtomo Sōrin, el daimyō que gobernaba este dominio y se convirtió al cristianismo, invitó al médico portugués Luís de Almeida a construir aquí en 1557 el primer hospital de estilo occidental de Japón, que atendía a pacientes sin importar su condición y practicaba cirugías sin parangón en el Japón de la época. El hospital cerró tras la muerte de Sōrin y la posterior supresión del cristianismo, y pasarían siglos antes de que Japón tuviera otro hospital público abierto a todos.|Ōtomo Sōrin, le daimyō qui gouvernait ce domaine et se convertit au christianisme, invita le médecin portugais Luís de Almeida à bâtir ici en 1557 le premier hôpital de style occidental du Japon, soignant les patients sans distinction de rang et pratiquant des opérations chirurgicales sans équivalent dans le Japon de l'époque. L'hôpital ferma après la mort de Sōrin et la répression ultérieure du christianisme, et il fallut des siècles avant que le Japon n'ait un autre hôpital public ouvert à tous.|この地を治め、自らキリシタンとなった大名・大友宗麟は、1557年、ポルトガル人医師ルイス・デ・アルメイダを招いて日本初の西洋式病院をここに建てさせた。身分を問わず患者を診て、当時の日本には類のない外科手術も行われた。病院は宗麟の死とその後のキリシタン弾圧で閉じられ、身分を問わず開かれた公的な病院が日本に再び現れるまでには、その後何世紀もかかった。",
    [prop("Funai Western-Style Hospital Site|Yacimiento del hospital occidental de Funai|Site de l'hôpital occidental de Funai|府内の西洋医学発祥地", 1490, 122),
     prop("Ōtomo Sōrin Memorial|Monumento a Ōtomo Sōrin|Mémorial d'Ōtomo Sōrin|大友宗麟の記念碑", 1230, 100)],
  ),
  hita: city(
    "Hita|Hita|Hita|日田",
    130.94, 33.32, "toe", "academy", "merchanttown", "l",
    "A school with no rule for rank|Una escuela sin reglas de rango|Une école sans règle de rang|身分の決まりを持たない私塾",
    "Because Hita was governed directly by the shogunate rather than by a local lord, its Confucian academy, Kangien, could enrol students without regard to samurai rank or domain of origin, unusual in an era when status normally decided who could study what. Founded in 1817, it taught over 4,000 pupils by the time it closed and ranked students purely by test results in a system its founder Hirose Tansō designed himself.|Como Hita estaba gobernada directamente por el shogunato y no por un señor local, su academia confuciana, Kangien, podía admitir alumnos sin distinción de rango samurái ni de dominio de origen, algo inusual en una época en que el estatus solía decidir quién podía estudiar qué. Fundada en 1817, llegó a formar a más de 4.000 alumnos hasta su cierre y los clasificaba únicamente por resultados de examen, en un sistema diseñado por su propio fundador, Hirose Tansō.|Hita étant administrée directement par le shogunat plutôt que par un seigneur local, son académie confucéenne, le Kangien, pouvait accueillir des élèves sans distinction de rang de samouraï ni de domaine d'origine, chose rare à une époque où le statut décidait d'ordinaire qui pouvait étudier quoi. Fondée en 1817, elle forma plus de 4 000 élèves avant sa fermeture et les classait uniquement selon les résultats aux examens, dans un système conçu par son propre fondateur, Hirose Tansō.|日田は大名領ではなく幕府の直轄地(天領)だったため、私塾・咸宜園は武士の身分や出身藩を問わず生徒を受け入れることができた。身分によって学べることが決まる時代にあって、これは異例だった。1817年の創設以来、閉塾までに4千人を超す門下生を教え、創設者・広瀬淡窓自身が考案した試験の成績だけで序列を決める仕組みを取っていた。",
    [prop("Kangien Academy Hall|Salón de la academia Kangien|Salle de l'académie Kangien|咸宜園の講堂", 370, 30),
     prop("Timber Merchant Warehouse Row|Fila de almacenes de madereros|Rangée d'entrepôts de bois|日田杉の材木商蔵", 350, 28)],
  ),
  nakatsu: city(
    "Nakatsu|Nakatsu|Nakatsu|中津",
    131.19, 33.60, "toe", "scholar", "castletown", "r",
    "The town that sent Japan its most stubborn Westernizer|El pueblo que envió a Japón a su occidentalista más tenaz|La ville qui envoya au Japon son occidentaliste le plus tenace|最も頑固な洋学者を送り出した町",
    "Fukuzawa Yukichi was born here to a low-ranking samurai family in 1835, and after studying Dutch and then English learning went on to help negotiate Japan's first treaty missions abroad, found what became Keiō University, and write Gakumon no Susume, an essay collection urging Japanese to judge people by ability rather than birth that sold in the millions. He never held government office, arguing to his death that an independent press and independent scholars mattered more to a modern nation than officials did.|Fukuzawa Yukichi nació aquí en el seno de una familia samurái de bajo rango en 1835, y tras estudiar primero holandés y luego el saber occidental en inglés, ayudó a negociar las primeras misiones diplomáticas de Japón en el extranjero, fundó lo que sería la Universidad de Keiō y escribió Gakumon no Susume, una colección de ensayos que instaba a los japoneses a juzgar a las personas por su capacidad y no por su nacimiento, y que vendió millones de ejemplares. Nunca ocupó cargo público, sosteniendo hasta su muerte que una prensa y unos eruditos independientes importaban más a una nación moderna que los funcionarios.|Fukuzawa Yukichi naquit ici dans une famille de samouraïs de rang modeste en 1835, et après avoir étudié le hollandais puis le savoir occidental en anglais, contribua à négocier les premières missions diplomatiques du Japon à l'étranger, fonda ce qui deviendrait l'université Keiō et écrivit Gakumon no Susume, un recueil d'essais exhortant les Japonais à juger les gens sur leurs capacités plutôt que sur leur naissance, vendu à des millions d'exemplaires. Il n'occupa jamais de charge officielle, soutenant jusqu'à sa mort qu'une presse et des érudits indépendants comptaient plus pour une nation moderne que des fonctionnaires.|福澤諭吉は1835年、下級武士の家にここで生まれた。蘭学、続いて英学を修めた後、日本初の海外使節団の交渉に加わり、後の慶應義塾となる私塾を開き、人を生まれではなく能力で判断せよと説いた『学問のすゝめ』は数百万部を売った。彼は生涯官職に就かず、独立した新聞と独立した学者こそが近代国家には官吏以上に大切だと死ぬまで主張し続けた。",
    [prop("Fukuzawa Yukichi Birthplace|Casa natal de Fukuzawa Yukichi|Maison natale de Fukuzawa Yukichi|福澤諭吉の旧居", 720, 60),
     prop("Nakatsu Castle Moat|Foso del castillo de Nakatsu|Douves du château de Nakatsu|中津城の堀", 630, 52)],
  ),

  // ---------------------------------------------------------------------
  // miy — 宮崎県(3)
  // ---------------------------------------------------------------------
  nobeoka: city(
    "Nobeoka|Nobeoka|Nobeoka|延岡",
    131.66, 32.58, "toe", "chemicalplant", "companytown", "r",
    "A company town built on hydroelectric rayon|Una ciudad de empresa levantada sobre el rayón hidroeléctrico|Une ville d'entreprise bâtie sur la rayonne hydroélectrique|水力で紡がれたレーヨンの企業城下町",
    "A young engineer built a hydroelectric dam on the local river in 1922 specifically to power Japan's first large-scale rayon (artificial silk) plant, and the company that grew from it, Asahi Kasei, still dominates the city's economy and skyline a century later. The plant let Japan compete in a fibre market previously controlled by European and American producers, and much of the city's housing, schools and hospitals were originally built by the company itself for its workers.|Un joven ingeniero construyó en 1922 una presa hidroeléctrica en el río local específicamente para dar energía a la primera planta de rayón (seda artificial) a gran escala de Japón, y la empresa que nació de ella, Asahi Kasei, sigue dominando la economía y el perfil de la ciudad un siglo después. La planta permitió a Japón competir en un mercado de fibras hasta entonces dominado por fabricantes europeos y estadounidenses, y buena parte de las viviendas, escuelas y hospitales de la ciudad fueron construidos originalmente por la propia empresa para sus trabajadores.|Un jeune ingénieur construisit en 1922 un barrage hydroélectrique sur la rivière locale spécifiquement pour alimenter la première usine de rayonne (soie artificielle) à grande échelle du Japon, et l'entreprise qui en naquit, Asahi Kasei, domine encore l'économie et le paysage de la ville un siècle plus tard. L'usine permit au Japon de concurrencer un marché des fibres jusque-là dominé par les fabricants européens et américains, et une grande partie des logements, écoles et hôpitaux de la ville furent à l'origine bâtis par l'entreprise elle-même pour ses ouvriers.|1922年、若い技師が地元の川に水力発電のダムを築いたのは、ひとえに日本初の大規模なレーヨン(人絹)工場に電力を送るためだった。そこから育った旭化成は、一世紀を経た今もこの市の経済と街並みを支配している。この工場は、それまで欧米メーカーが握っていた繊維市場に日本が食い込む足がかりとなり、市内の住宅・学校・病院の多くは、もともと会社自身が従業員のために建てたものだった。",
    [prop("Hydroelectric Dam Station|Central hidroeléctrica|Barrage hydroélectrique|水力発電所", 980, 80),
     prop("Company Housing Row|Fila de viviendas de la empresa|Rangée de logements ouvriers|社宅通り", 850, 70)],
  ),
  miyakonojo: city(
    "Miyakonojō|Miyakonojō|Miyakonojō|都城",
    131.06, 31.72, "toe", "distillery", "farmtown", "l",
    "More shōchū leaves here than any other city in Japan|De aquí sale más shōchū que de ninguna otra ciudad de Japón|Plus de shōchū part d'ici que de toute autre ville du Japon|日本一の焼酎を送り出す町",
    "Sweet potatoes grow easily in the region's volcanic ash soil, too acidic and dry for reliable rice paddies, so farmers here turned to distilling them into shōchū instead, and the city now ships more of the spirit by volume than anywhere else in the country. The same volcanic ash plateau, called Shirasu, was once considered nearly worthless farmland, which is part of why the distilling habit took hold here rather than in the rice-growing lowlands elsewhere in Kyūshū.|El boniato crece con facilidad en el suelo de ceniza volcánica de la región, demasiado ácido y seco para arrozales fiables, así que los agricultores de aquí optaron por destilarlo en shōchū, y la ciudad envía hoy más volumen de este licor que ningún otro lugar del país. La misma meseta de ceniza volcánica, llamada Shirasu, se consideraba antaño tierra de cultivo casi inútil, lo que explica en parte por qué la destilación arraigó aquí y no en las tierras bajas arroceras de otras partes de Kyūshū.|La patate douce pousse facilement dans le sol de cendres volcaniques de la région, trop acide et sec pour des rizières fiables, si bien que les agriculteurs d'ici se sont tournés vers sa distillation en shōchū, et la ville expédie aujourd'hui plus de ce spiritueux en volume que tout autre endroit du pays. Le même plateau de cendres volcaniques, appelé Shirasu, était autrefois jugé presque sans valeur agricole, ce qui explique en partie pourquoi la distillation s'y est enracinée plutôt que dans les basses terres rizicoles ailleurs à Kyūshū.|この地方の火山灰土壌はさつまいもがよく育つ一方、稲作には酸性すぎ乾きすぎている。そこで農家は芋を焼酎に蒸留する道を選び、市は今や国内のどこよりも多くの量の焼酎を出荷している。この火山灰台地は「シラス」と呼ばれ、かつてはほとんど価値の無い農地とみなされていた。それが、九州の他の稲作地帯ではなくこの地で蒸留が根付いた理由の一つでもある。",
    [prop("Sweet Potato Shōchū Distillery|Destilería de shōchū de boniato|Distillerie de shōchū de patate douce|芋焼酎の蒸留所", 860, 70),
     prop("Shirasu Plateau Sweet Potato Field|Campo de boniatos de la meseta Shirasu|Champ de patates douces du plateau Shirasu|シラス台地のさつまいも畑", 660, 54)],
  ),
  obi: city(
    "Obi|Obi|Obi|飫肥",
    131.36, 31.61, "toe", "samurairow", "castletown", "r",
    "Kyūshū's smallest domain, still walled off from its neighbour|El dominio más pequeño de Kyūshū, aún tapiado frente a su vecino|Le plus petit domaine du Kyūshū, encore muré face à son voisin|隣領と塀一枚で隔てた九州最小の藩",
    "The Itō clan that ruled this small domain for over 280 years spent much of that time in a running border dispute with the far larger Shimazu domain of Satsuma next door, and the town's preserved samurai quarter still runs along a stone-walled lane that once marked how close outsiders were allowed to approach the castle. Its rice output was modest enough that the domain relied on timber and paper from the surrounding hills to stay solvent, unusual for a castle town of its size.|El clan Itō, que gobernó este pequeño dominio durante más de 280 años, pasó buena parte de ese tiempo en una disputa fronteriza constante con el dominio, mucho mayor, de Satsuma-Shimazu, su vecino, y el barrio samurái conservado de la ciudad sigue discurriendo por una calleja de muros de piedra que antaño marcaba hasta dónde podían acercarse los forasteros al castillo. Su producción de arroz era lo bastante modesta como para que el dominio dependiera de la madera y el papel de las colinas cercanas para mantenerse solvente, algo inusual en una ciudad-castillo de su tamaño.|Le clan Itō, qui gouverna ce petit domaine pendant plus de 280 ans, passa une bonne partie de cette période dans un différend frontalier permanent avec le domaine bien plus vaste de Satsuma-Shimazu voisin, et le quartier samouraï préservé de la ville longe encore une ruelle aux murs de pierre qui marquait jadis la limite d'approche autorisée aux étrangers vers le château. Sa production de riz était assez modeste pour que le domaine dépende du bois et du papier des collines environnantes pour rester solvable, chose inhabituelle pour une ville-château de cette taille.|280年以上この小藩を治めた伊東氏は、その多くの年月を隣接するはるかに大きな薩摩・島津藩との境界争いに費やした。町に残る武家屋敷通りは、よそ者が城にどこまで近づけるかを定めていた石垣の小道に今も沿っている。石高は控えめで、藩はこの規模の城下町としては珍しく、周囲の山からの木材と紙で財政を支えていた。",
    [prop("Stone-Walled Samurai Lane|Calleja de muros de piedra del barrio samurái|Ruelle aux murs de pierre du quartier samouraï|武家屋敷通り", 310, 26),
     prop("Domain Paper Workshop|Taller de papel del dominio|Atelier de papier du domaine|藩の紙漉き工房", 245, 20)],
  ),

  // ---------------------------------------------------------------------
  // kag — 鹿児島県(5)
  // ---------------------------------------------------------------------
  sakurajima: city(
    "Sakurajima|Sakurajima|Sakurajima|桜島",
    130.66, 31.59, "kag", "ashvillage", "livingvolcano", "r",
    "A town that lives beside its volcano's mouth|Un pueblo que vive junto a la boca de su volcán|Une ville qui vit au bord de la bouche de son volcan|噴火口の隣で暮らす町",
    "Sakurajima erupts explosively on most days of the year, and children at its schools wear padded helmets on the walk to class and keep them at their desks. Households leave city-issued yellow bags of volcanic ash out for collection like ordinary rubbish, on a route that runs as regularly as the school bus.|El Sakurajima entra en erupción de forma explosiva la mayoría de los días del año, y los niños de sus escuelas llevan cascos acolchados de camino a clase y los guardan junto a su pupitre. Las familias dejan fuera, para su recogida, bolsas amarillas de ceniza volcánica que reparte el ayuntamiento, como si fuera basura corriente, en una ruta tan regular como la del autobús escolar.|Le Sakurajima entre en éruption explosive la plupart des jours de l'année, et les enfants de ses écoles portent un casque rembourré pour se rendre en classe et le gardent près de leur pupitre. Les foyers sortent pour la collecte des sacs jaunes de cendre volcanique fournis par la ville, comme de simples ordures, sur une tournée aussi régulière que celle du bus scolaire.|桜島はほとんどの日が爆発的噴火を起こし、島の学校の児童・生徒は登校のあいだクッション入りのヘルメットをかぶり、机の脇にも置いている。各家庭は市が配る黄色い「克灰袋」に火山灰を詰め、スクールバスと同じくらい規則正しく回る収集ルートに出す。",
    [prop("Ash Collection Route|Ruta de recogida de ceniza|Tournée de collecte des cendres|克灰袋の収集ルート", 600, 50),
     prop("Helmet-Ready Schoolyard|Patio escolar con cascos|Cour d'école aux casques prêts|ヘルメット常備の校庭", 550, 46)],
  ),
  kagoshima: city(
    "Kagoshima|Kagoshima|Kagoshima|鹿児島",
    130.556, 31.617, "kag", "students", "ironworks", "l",
    "Nineteen young men smuggled out to break the law|Diecinueve jóvenes que se fugaron desafiando la ley|Dix-neuf jeunes hommes exfiltrés en violation de la loi|掟を破って密航した十九人の若者",
    "In 1865, four years before overseas travel was legalised, Satsuma domain secretly sent nineteen young samurai to study in Britain, a crime punishable by death if the shogunate had caught them, sailing under false names from a cove near here. Several of the Satsuma Students went on to shape modern Japan directly, and the domain's own ironworks nearby was already casting cannon and spinning cotton with Western machinery years before the Meiji Restoration made such things official policy.|En 1865, cuatro años antes de que viajar al extranjero fuera legal, el dominio de Satsuma envió en secreto a diecinueve jóvenes samuráis a estudiar a Gran Bretaña, un delito castigado con la muerte si el shogunato los hubiera atrapado, zarpando bajo nombres falsos desde una cala cercana. Varios de los Estudiantes de Satsuma llegaron a dar forma directamente al Japón moderno, y la propia fundición del dominio, cerca de aquí, ya fundía cañones e hilaba algodón con maquinaria occidental años antes de que la Restauración Meiji convirtiera todo eso en política oficial.|En 1865, quatre ans avant que voyager à l'étranger ne devienne légal, le domaine de Satsuma envoya secrètement dix-neuf jeunes samouraïs étudier en Grande-Bretagne, un crime passible de mort si le shogunat les avait attrapés, embarquant sous de faux noms depuis une crique voisine. Plusieurs des étudiants de Satsuma allèrent façonner directement le Japon moderne, et la propre fonderie du domaine, tout près d'ici, coulait déjà des canons et filait du coton avec des machines occidentales des années avant que la restauration Meiji n'en fasse une politique officielle.|1865年、海外渡航がまだ違法だった時代、薩摩藩は十九人の若い藩士をひそかに英国留学へ送り出した。幕府に見つかれば死罪もありうる企てで、彼らは近くの入江から偽名で船出した。薩摩藩英国留学生の何人かは後に近代日本を直接形作ることになり、すぐ近くにあった藩営の集成館は、明治維新がそれを国の方針とするより何年も前から、既に西洋式の機械で大砲を鋳造し綿を紡いでいた。",
    [prop("Shuseikan Ironworks|Fundición Shuseikan|Fonderie de Shuseikan|集成館", 2150, 176),
     prop("Smuggled Students' Departure Cove|Cala de partida de los estudiantes clandestinos|Crique de départ des étudiants clandestins|留学生密航の浜", 1700, 140)],
  ),
  chiran: city(
    "Chiran|Chiran|Chiran|知覧",
    130.42, 31.38, "kag", "cherryblossom", "airfieldmemorial", "b",
    "Where pilots barely out of school flew their last mission|Donde pilotos recién salidos de la escuela volaron su última misión|Où des pilotes à peine sortis de l'école volèrent leur dernière mission|学校を出たばかりの若者が最後の任務に発った基地",
    "Over 400 kamikaze pilots departed on their final, one-way missions from the airfield here between March and June 1945, many of them still in their late teens or early twenties, having volunteered or been assigned under pressure that made refusal difficult. The peace museum built on the site displays their farewell letters to families alongside the aircraft they flew, presenting the base neither as heroism nor simple tragedy but as a record of what the state asked of very young people in the war's final months.|Más de 400 pilotos kamikaze partieron en sus misiones finales, sin retorno, desde el aeródromo de aquí entre marzo y junio de 1945, muchos de ellos aún adolescentes o veinteañeros, tras haberse ofrecido voluntarios o haber sido asignados bajo una presión que hacía difícil negarse. El museo de la paz construido en el lugar exhibe sus cartas de despedida a sus familias junto a los aviones que pilotaron, presentando la base ni como heroísmo ni como simple tragedia, sino como un registro de lo que el Estado pidió a gente muy joven en los últimos meses de la guerra.|Plus de 400 pilotes kamikazes partirent pour leur dernière mission, sans retour, depuis l'aérodrome d'ici entre mars et juin 1945, beaucoup encore adolescents ou tout juste vingtenaires, s'étant portés volontaires ou ayant été désignés sous une pression rendant le refus difficile. Le musée de la paix bâti sur le site expose leurs lettres d'adieu à leurs familles aux côtés des avions qu'ils pilotaient, présentant la base ni comme un acte héroïque ni comme une simple tragédie, mais comme la trace de ce que l'État a demandé à des gens très jeunes dans les derniers mois de la guerre.|1945年3月から6月にかけて、400人を超す特攻隊員がここの飛行場から二度と戻らない任務に発った。多くは十代後半か二十代前半で、志願とはいえ断りにくい空気の中で選ばれた者も多かった。跡地に建つ知覧特攻平和会館は、彼らが搭乗した機体とともに家族への遺書を展示し、この基地を英雄譚としてでも単純な悲劇としてでもなく、戦争末期の国家が非常に若い人々に何を求めたかの記録として提示している。",
    [prop("Kamikaze Peace Museum|Museo de la paz kamikaze|Musée de la paix kamikaze|知覧特攻平和会館", 350, 28),
     prop("Pilots' Farewell Letter Archive|Archivo de cartas de despedida|Archive des lettres d'adieu|特攻隊員の遺書資料", 260, 22)],
  ),
  izumi: city(
    "Izumi|Izumi|Izumi|出水",
    130.36, 32.09, "kag", "cranes", "farmtown", "l",
    "Where a tenth of the world's hooded cranes spend winter|Donde inverna una décima parte de las grullas de cuello blanco del mundo|Où hiverne un dixième des grues à cou blanc du monde|世界のナベヅルの1割が越冬する町",
    "Every winter roughly 10,000 hooded cranes and several thousand white-naped cranes fly in from Siberia, China and the Korean peninsula to feed in the rice-stubble fields around this city, a concentration that at times accounts for close to the entire world population of hooded cranes in one place. The gathering makes conservationists nervous rather than reassured, since a single outbreak of avian flu or one bad season here could threaten a meaningful share of the species worldwide.|Cada invierno, unas 10.000 grullas de cuello blanco y varios miles de grullas de collar llegan desde Siberia, China y la península de Corea para alimentarse en los campos de rastrojo de arroz alrededor de esta ciudad, una concentración que en ocasiones reúne en un solo lugar una parte cercana a la población mundial entera de la grulla de cuello blanco. La concentración inquieta a los conservacionistas más de lo que los tranquiliza, ya que un solo brote de gripe aviar o una mala temporada aquí podría amenazar a una parte considerable de la especie en todo el mundo.|Chaque hiver, environ 10 000 grues à cou blanc et plusieurs milliers de grues à cou noir arrivent de Sibérie, de Chine et de la péninsule coréenne pour se nourrir dans les champs de chaume de riz autour de cette ville, une concentration qui rassemble parfois en un seul lieu la quasi-totalité de la population mondiale de la grue à cou blanc. Ce rassemblement inquiète les défenseurs de la nature plutôt qu'il ne les rassure, car une seule épidémie de grippe aviaire ou une mauvaise saison ici pourrait menacer une part importante de l'espèce dans le monde entier.|毎冬、シベリア・中国・朝鮮半島からおよそ1万羽のナベヅルと数千羽のマナヅルがこの市周辺の刈田へ飛来する。その集中ぶりは、時にナベヅルの世界個体数のほぼ全てが一か所に集まる規模になる。この集中は保護関係者を安心させるどころか不安にさせる。ここで一度の鳥インフルエンザや不作の年があれば、種全体のかなりの割合が脅かされかねないからである。",
    [prop("Crane Observation Centre|Centro de observación de grullas|Centre d'observation des grues|ツル観察センター", 285, 24),
     prop("Rice-Stubble Feeding Field|Campo de alimentación en rastrojo|Champ d'alimentation en chaume de riz|刈田の餌場", 250, 20)],
  ),
  tanegashima: city(
    "Tanegashima|Tanegashima|Tanegashima|種子島",
    130.98, 30.73, "kag", "matchlock", "spaceisland", "r",
    "Where guns first landed, and rockets now leave|Donde llegaron primero las armas, y hoy parten los cohetes|Où les armes débarquèrent, et d'où décollent aujourd'hui les fusées|鉄砲が初めて着き、いまロケットが発つ島",
    "In 1543 a Chinese junk carrying Portuguese castaways was blown ashore here, and the local lord bought two matchlock guns from them, weapons Japanese smiths reverse-engineered so quickly that within a decade domestic gunmakers were producing thousands, permanently changing Japanese warfare. Nearly 450 years later Japan built its main satellite launch site on the island's southern tip, chosen for being closer to the equator than anywhere else in the country, and rockets now lift off from roughly the same coastline the Portuguese first stumbled onto.|En 1543, una junco chino con náufragos portugueses a bordo encalló aquí, y el señor local les compró dos arcabuces, armas que los herreros japoneses lograron copiar tan rápido que en una década los fabricantes locales ya producían miles, cambiando para siempre la guerra en Japón. Casi 450 años después, Japón construyó su principal centro de lanzamiento de satélites en el extremo sur de la isla, elegido por estar más cerca del ecuador que cualquier otro lugar del país, y hoy los cohetes despegan de casi la misma costa donde los portugueses naufragaron por primera vez.|En 1543, une jonque chinoise transportant des naufragés portugais s'échoua ici, et le seigneur local leur acheta deux arquebuses, des armes que les forgerons japonais réussirent à reproduire si vite qu'en une décennie les fabricants locaux en produisaient des milliers, changeant durablement la guerre au Japon. Près de 450 ans plus tard, le Japon bâtit son principal site de lancement de satellites à la pointe sud de l'île, choisie pour être plus proche de l'équateur que tout autre endroit du pays, et des fusées décollent aujourd'hui de presque le même littoral où les Portugais échouèrent jadis.|1543年、ポルトガル人漂流者を乗せた中国船がここに漂着し、地元の領主は彼らから火縄銃を二挺買い求めた。日本の鍛冶職人はわずか十年ほどでその複製に成功し、以後、日本の戦のあり方を根本から変えた。それから450年近く後、日本は国内で最も赤道に近いという理由からこの島の南端に主力の衛星打上げ施設を建てた。今もロケットは、かつてポルトガル人が流れ着いたのとほぼ同じ海岸から打ち上げられている。",
    [prop("Tanegashima Matchlock Museum|Museo del arcabuz de Tanegashima|Musée de l'arquebuse de Tanegashima|種子島開発総合センター(鉄砲館)", 470, 38),
     prop("Rocket Launch Viewing Point|Mirador del lanzamiento de cohetes|Point de vue sur les lancements|ロケット発射見学場", 500, 42)],
  ),
};

/**
 * 40都市43路線。実在する路線網(鹿児島本線・長崎本線・日豊本線・
 * 久大本線・肥薩線・豊肥本線など)に沿わせつつ、天草・端島・五島・
 * 桜島・種子島は橋(陸路)または実際のフェリー航路(海路)で結んだ。
 *
 * `sea` の4本: `nagasaki-hashima`(定期観光船)/ `nagasaki-goto`(定期船)/
 * `kagoshima-sakurajima`(桜島は陸続きだが、実際の行き来は15分のフェリーが主)/
 * `kagoshima-tanegashima`(高速船・フェリー)。
 *
 * ## `check-sea-routes.mjs`(焼く前の使い捨てcontent.jsonで実行・削除済み)で
 * 60px超のまま残した4本。端の入れ替え・航路化など4通りを試したが改善しない、
 * 実在する経路(地図の側が正しく、この盤面の海岸線の粗さの側が誤っている)。
 *
 * - `omuta-kumamoto` 71px(38%・186px): 実在の鹿児島本線。有明海沿いの
 *   海岸線を単純化しすぎたための誤検知。ジオメトリを2通り調整したが
 *   いずれも悪化した(165px→95%)ため、簡略化した海岸線の限界として残す
 * - `nakatsu-oita` 62px(21%・299px): 実在の日豊本線。別府湾の奥を
 *   単純化した海岸線が湾を大きく描きすぎている
 * - `kagoshima-tanegashima` 80px(13%・611px): 実在のフェリー・高速船。
 *   両岸の陸地をかすめるだけ
 * - `nagasaki-goto` 68px(13%・533px): 実在の定期船。長崎港側の陸地を
 *   かすめるだけ
 *
 * いずれも取りまとめ側での再検討・海岸線の精緻化に委ねる。
 */
export const KYUSHU_EDGES = [
  // --- 北九州・玄界灘 ---
  ["moji", "kokura"],
  ["kokura", "yahata"],
  ["munakata", "yahata"],
  ["munakata", "fukuoka"],
  ["kokura", "nakatsu"],
  ["nakatsu", "oita"],
  ["oita", "hita"],
  ["hita", "kurume"],
  ["fukuoka", "dazaifu"],
  ["fukuoka", "iizuka"],
  ["iizuka", "tagawa"],
  ["fukuoka", "kurume"],
  ["kurume", "omuta"],
  ["omuta", "kumamoto"],
  // --- 佐賀・唐津・有田 ---
  ["kurume", "yoshinogari"],
  ["yoshinogari", "saga"],
  ["saga", "arita"],
  ["arita", "imari"],
  ["imari", "karatsu"],
  ["fukuoka", "karatsu"],
  // --- 長崎 ---
  ["isahaya", "saga"],
  ["isahaya", "nagasaki"],
  ["isahaya", "shimabara"],
  ["shimabara", "unzen"],
  ["nagasaki", "hirado"],
  ["hirado", "sasebo"],
  ["nagasaki", "hashima", "sea"],
  ["nagasaki", "goto", "sea"],
  // --- 熊本 ---
  ["kumamoto", "yatsushiro"],
  ["amakusa", "yatsushiro"],
  ["yatsushiro", "hitoyoshi"],
  ["minamata", "yatsushiro"],
  ["minamata", "izumi"],
  ["kumamoto", "aso"],
  ["aso", "oita"],
  // --- 宮崎 ---
  ["oita", "nobeoka"],
  ["obi", "nobeoka"],
  ["obi", "miyakonojo"],
  ["miyakonojo", "kagoshima"],
  // --- 鹿児島 ---
  ["kagoshima", "sakurajima", "sea"],
  ["kagoshima", "chiran"],
  ["kagoshima", "izumi"],
  ["kagoshima", "tanegashima", "sea"],
];
