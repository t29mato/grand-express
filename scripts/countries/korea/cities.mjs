/**
 * 韓国の都市と路線。
 *
 * 地方区分は実際の道にならった6つ(`gg` 京畿(ソウル・仁川を含む) / `gw` 江原 /
 * `cc` 忠清 / `jl` 全羅 / `gs` 慶尚 / `jj` 済州)。
 *
 * 40都市55路線。京畿8 / 江原6 / 忠清7 / 全羅8 / 慶尚9 / 済州2。
 * 済州島・鬱陵島は海路("sea")でのみ結ばれる。
 *
 * 経度・緯度は実際の値。投影の範囲は geography.mjs の KOREA_PROJ を参照。
 *
 * ## `mark`(17種)
 *
 * 盤面では直径19pxにしかならないので、描き分けられる数に絞ってある。
 *
 * | キー | 描くもの | 受け持つ町 |
 * |---|---|---|
 * | `palace`      | 丹青の反り屋根(王宮) | ソウル |
 * | `dmz`         | 監視塔と鉄条網 | 板門店 |
 * | `hanok`       | 韓屋の反り屋根 | 水原・龍仁・全州・安東 |
 * | `fortress`    | 石垣と城門 | 扶余・晋州 |
 * | `tomb`        | 芝の古墳 | 慶州 |
 * | `festival`    | 仮面・祭りの顔 | 保寧・安東(のマスク以外の祭り面) |
 * | `port`        | 起重機と船 | 仁川・木浦・群山・麗水・統営 |
 * | `mountain`    | 二つ並んだ峰 | 束草・三陟・原州・平昌 |
 * | `lake`        | 水面とダム | 春川・加平・忠州 |
 * | `flowerfield` | 丘を覆う花や畝 | 高陽・順天・宝城 |
 * | `craft`       | 窯・機・本 | 利川・淡陽・清州・光州 |
 * | `science`     | ロケットと回路 | 大田・世宗 |
 * | `industry`    | 煙突と高炉 | 大邱・浦項・蔚山 |
 * | `coast`       | 波と浜 | 江陵・釜山・欝陵島・西帰浦 |
 * | `dolharubang` | 石像(トルハルバン) | 済州 |
 * | `monument`    | 聖火の塔 | 天安 |
 *
 * ## `bg`(16種)
 *
 * `capital`(ソウル) / `dmz`(板門店) / `hanok`(水原・龍仁・全州・安東) /
 * `fortress`(扶余・晋州) / `port`(仁川・木浦・群山・麗水・統営) /
 * `seaside`(江陵・釜山・西帰浦・保寧) / `island`(欝陵島) /
 * `valley`(束草・三陟・原州・忠州) / `ski`(平昌) / `lakeside`(春川・加平) /
 * `farmland`(高陽・順天・宝城・利川・淡陽) / `metro`(大田・世宗・大邱・清州・光州) /
 * `industrial`(浦項・蔚山) / `ancienttomb`(慶州) / `volcanic`(済州) / `village`(天安)
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const KOREA_CITIES = {
  // ---------------------------------------------------------------------
  // gg — 京畿(ソウル・仁川を含む)
  // ---------------------------------------------------------------------
  seoul: city(
    "Seoul|Seúl|Séoul|ソウル",
    126.98, 37.57, "gg", "palace", "capital", "r",
    "A capital that keeps its five palaces|Una capital que conserva sus cinco palacios|Une capitale qui garde ses cinq palais|五つの王宮を抱える都",
    "Gyeongbokgung's throne hall was burned twice — once by its own people in 1592 when the king fled north, and again in an 1867 rebuild that outlived the dynasty by only decades. The changing of the royal guard is now re-enacted at its gate on the hour, in armour copied from Joseon-era paintings.|El salón del trono de Gyeongbokgung ardió dos veces: una a manos de su propio pueblo en 1592, cuando el rey huyó al norte, y otra en una reconstrucción de 1867 que sobrevivió a la dinastía solo por décadas. El cambio de guardia real se recrea ahora en su puerta cada hora, con armaduras copiadas de pinturas de la era Joseon.|La salle du trône de Gyeongbokgung brûla deux fois : une première par son propre peuple en 1592, quand le roi fuit vers le nord, une seconde lors d'une reconstruction de 1867 qui ne survécut que quelques décennies à la dynastie. La relève de la garde royale y est aujourd'hui rejouée à l'heure, dans des armures copiées sur des peintures de l'ère Joseon.|景福宮の正殿は二度焼けている。一度目は1592年、王が北へ逃げたときに民衆の手で。二度目の1867年の再建は、王朝の終わりまでわずか数十年しかもたなかった。正門では毎正時、朝鮮時代の絵を写した甲冑姿の守門将交代式が再現される。",
    [prop("Throne Hall Courtyard|Patio del salón del trono|Cour de la salle du trône|正殿の中庭", 2800, 578),
     prop("Bukchon Hanok Lodging|Posada de Bukchon|Auberge de Bukchon|北村の韓屋宿", 1300, 268)],
  ),
  incheon: city(
    "Incheon|Incheon|Incheon|仁川",
    126.70, 37.46, "gg", "port", "port", "l",
    "A tide that once decided a war|Una marea que una vez decidió una guerra|Une marée qui décida jadis d'une guerre|戦の行方を決めた干満差",
    "The tidal range here reaches nearly 9 metres, among the largest on Earth, and the 1950 landing that turned the Korean War was timed to a single narrow window when the mudflats were briefly covered. The old Chinatown by the port still bakes the black-bean noodle dish invented for dock workers who needed something quick between ships.|La marea alcanza aquí casi 9 metros, de las mayores del planeta, y el desembarco de 1950 que cambió el curso de la guerra de Corea se cronometró a una sola ventana estrecha en que el fango quedó cubierto. El viejo barrio chino junto al puerto aún prepara los fideos de judía negra ideados para los estibadores.|La marée y atteint près de 9 mètres, l'une des plus fortes au monde, et le débarquement de 1950 qui renversa le cours de la guerre de Corée fut minuté sur une unique fenêtre étroite où la vase se trouvait recouverte. Le vieux quartier chinois du port prépare encore les nouilles au haricot noir inventées pour les dockers.|ここの干満差は9メートル近くに達し、世界でも屈指の大きさである。朝鮮戦争の流れを変えた1950年の上陸作戦は、干潟がわずかに水をかぶる一瞬の窓に合わせて実行された。港のチャイナタウンでは、船の合間に急いで食べられるよう考案されたジャージャー麺がいまも焼かれている。",
    [prop("Chinatown Noodle House|Fideos del barrio chino|Nouilles du quartier chinois|チャイナタウンの麺屋", 400, 82),
     prop("Tidal Flat Pier|Muelle del fangal|Jetée de la vasière|干潟の桟橋", 340, 70)],
  ),
  suwon: city(
    "Suwon|Suwon|Suwon|水原",
    127.01, 37.26, "gg", "hanok", "hanok", "r",
    "A fortress built to move a father's grave|Una fortaleza construida para trasladar la tumba de un padre|Une forteresse bâtie pour déplacer la tombe d'un père|父の墓を移すために築いた城",
    "King Jeongjo built the 5.7 km wall of Hwaseong in under three years, using pulleys and cranes recorded in such detail in a construction manual that the badly damaged fortress could be rebuilt to the same measurements after the Korean War. He raised it to move nearer his father's tomb, a father he never knew because the boy king who was his grandfather had him sealed inside a rice chest.|El rey Jeongjo levantó la muralla de 5,7 km de Hwaseong en menos de tres años, con poleas y grúas registradas con tal detalle en un manual de obra que la fortaleza, muy dañada, pudo reconstruirse a las mismas medidas tras la guerra de Corea.|Le roi Jeongjo bâtit en moins de trois ans le mur de 5,7 km de Hwaseong, à l'aide de poulies et de grues consignées avec un tel détail dans un manuel de chantier que la forteresse, très endommagée, put être reconstruite aux mêmes mesures après la guerre de Corée.|正祖王は華城の全長5.7kmの城壁を3年足らずで築いた。滑車や起重機の使い方まで記した工事記録があまりに詳細だったため、朝鮮戦争で大きく壊れた城も同じ寸法で復元できた。彼がここに城を築いたのは父の墓に近づくためだった。その父を彼は知らない。祖父である幼い王が父を米びつに閉じ込めて死なせたからである。",
    [prop("Watchtower Gate|Puerta y torre de vigía|Porte et tour de guet|将台のある城門", 700, 144),
     prop("Fortress Wall Walk|Paseo de la muralla|Promenade des remparts|城壁の遊歩道", 480, 100)],
  ),
  panmunjeom: city(
    "Panmunjeom|Panmunjeom|Panmunjeom|板門店",
    126.65, 37.95, "gg", "dmz", "dmz", "r",
    "A village that stopped existing in 1953|Una aldea que dejó de existir en 1953|Un village qui cessa d'exister en 1953|1953年に消えた村",
    "The armistice was signed in a hall built in a single night so neither side would have to enter the other's territory, and the conference row of blue huts now sits exactly astride the line, half in each country. Soldiers on both sides still stand in a modified taekwondo stance, one foot forward, so they can react without turning their back.|El armisticio se firmó en una sala construida en una sola noche para que ningún bando entrara en territorio del otro, y la fila de casetas azules de negociación se asienta hoy justo a caballo de la línea, mitad en cada país.|L'armistice fut signé dans une salle bâtie en une seule nuit pour qu'aucun camp n'ait à entrer sur le territoire de l'autre, et la rangée de baraques bleues de conférence se tient aujourd'hui exactement à cheval sur la ligne.|休戦協定は、どちらの陣営も相手の領土に入らずに済むよう一夜で建てられた建物で調印された。会議用の青い小屋の列はいまも軍事境界線をまたいで立ち、半分ずつ両国に属する。両陣営の兵士は片足を前に出したテコンドー風の姿勢で立ち、背を向けずに構えられるようにしている。",
    [prop("Blue Conference Hut|Caseta azul de conferencias|Baraque bleue de conférence|会議用の青い小屋", 260, 54),
     prop("Freedom Bridge Overlook|Mirador del puente de la libertad|Belvédère du pont de la liberté|自由の橋の展望", 220, 46)],
  ),
  goyang: city(
    "Goyang|Goyang|Goyang|高陽",
    126.83, 37.66, "gg", "flowerfield", "farmland", "l",
    "A lake park built where a landfill used to be|Un parque lacustre sobre un vertedero|Un parc lacustre sur une ancienne décharge|埋立地の上の花の公園",
    "Ilsan's Lake Park was raised over reclaimed marsh and a former dump in the early 1990s, and every spring its beds are replanted for a flower festival that now draws more visitors than the city has residents. Much of Goyang's flat land was rice paddy within living memory, which is why the flower trade slotted in so easily once the fields were sold.|El parque lacustre de Ilsan se alzó sobre marisma recuperada y un antiguo vertedero a principios de los noventa, y cada primavera se replantan sus parterres para un festival floral que hoy atrae más visitantes que habitantes tiene la ciudad.|Le parc lacustre d'Ilsan fut aménagé sur un marais asséché et une ancienne décharge au début des années 1990, et chaque printemps ses massifs sont replantés pour un festival floral qui attire aujourd'hui plus de visiteurs que la ville ne compte d'habitants.|一山湖水公園は1990年代初め、干拓地とかつてのごみ埋立地の上に造られた。毎春、花壇が植え替えられて開かれる花の祭りには、いまや市の人口より多い客が訪れる。高陽の平地の多くは記憶に新しいほど最近まで水田で、畑が売られたあとに花き栽培がすんなり根付いたのはそのためである。",
    [prop("Lake Park Flower Bed|Parterre del parque lacustre|Massif du parc lacustre|湖水公園の花壇", 340, 70),
     prop("Reclaimed Marsh Walk|Paseo del marisma recuperado|Promenade du marais asséché|干拓地の遊歩道", 260, 54)],
  ),
  yongin: city(
    "Yongin|Yongin|Yongin|龍仁",
    127.18, 37.24, "gg", "hanok", "hanok", "r",
    "A village built to hold three centuries at once|Una aldea construida para reunir tres siglos a la vez|Un village bâti pour réunir trois siècles à la fois|三百年をひとつに集めた村",
    "The Korean Folk Village opened in 1974 by moving or copying more than 270 real farmhouses, shrines and government buildings from across the country onto one site, sorted by region rather than era, so a Jeolla thatched cottage stands near a Gyeonggi tiled yangban house. It has served as a filming location so often that some of its market stalls are busier with camera crews than tourists.|El Poblado Folclórico Coreano abrió en 1974 trasladando o copiando más de 270 casas de labranza, santuarios y edificios oficiales reales de todo el país en un solo lugar, ordenados por región y no por época.|Le Village folklorique coréen ouvrit en 1974 en déplaçant ou copiant plus de 270 fermes, sanctuaires et bâtiments officiels réels venus de tout le pays sur un seul site, classés par région plutôt que par époque.|韓国民俗村は1974年、全国から実在の農家・祠堂・官衙270棟余りを移築または復元して一か所に集めて開いた。時代ではなく地方ごとに並べてあるので、全羅道の茅葺きの家が京畿道の瓦葺きの両班の家のすぐそばに立つ。撮影地としてあまりに頻繁に使われ、市場の露店が観光客より撮影隊で賑わうこともある。",
    [prop("Thatched Farmhouse Row|Hilera de casas de paja|Rangée de fermes de chaume|茅葺き農家の並び", 320, 66),
     prop("Yangban House Courtyard|Patio de la casa yangban|Cour de la maison yangban|両班の家の中庭", 380, 78)],
  ),
  icheon: city(
    "Icheon|Icheon|Icheon|利川",
    127.44, 37.27, "gg", "craft", "farmland", "l",
    "Rice fed to the palace, bowls fired for it|Arroz para el palacio, cuencos cocidos para él|Du riz pour le palais, des bols cuits pour lui|王宮へ献じた米と、そのための器",
    "Icheon's rice was sent to the royal court as tribute under Joseon, and its potters have worked the same clay-rich hills long enough that the town now holds a ceramics biennale every other year in kilns still fired the old way. The rice itself is credited to unusually warm groundwater welling up through the paddies even in cold snaps.|El arroz de Icheon se enviaba a la corte real como tributo bajo Joseon, y sus alfareros llevan tanto trabajando las mismas colinas ricas en arcilla que la ciudad celebra una bienal de cerámica cada dos años en hornos aún encendidos a la manera antigua.|Le riz d'Icheon était envoyé à la cour royale en tribut sous les Joseon, et ses potiers travaillent depuis si longtemps les mêmes collines argileuses que la ville tient une biennale de céramique tous les deux ans, dans des fours encore allumés à l'ancienne.|利川の米は朝鮮王朝の時代、貢ぎ物として王宮に送られた。陶工たちは粘土質の丘陵を長く手掛けてきたので、町では二年に一度、いまも昔ながらの方法で焚く窯で陶磁器ビエンナーレが開かれる。米そのものは、寒波のさなかでも田に湧き出す温かい地下水のおかげとされている。",
    [prop("Climbing Kiln Row|Hilera de hornos escalonados|Rangée de fours à flanc de colline|登り窯の並び", 320, 66),
     prop("Royal Tribute Rice Paddy|Arrozal del tributo real|Rizière du tribut royal|貢ぎ米の田", 280, 58)],
  ),
  gapyeong: city(
    "Gapyeong|Gapyeong|Gapyeong|加平",
    127.51, 37.83, "gg", "lake", "lakeside", "r",
    "An island planted from nothing to hide a resort|Una isla plantada de la nada para ocultar un centro turístico|Une île plantée de rien pour dissimuler un complexe touristique|無から作った行楽の島",
    "Nami Island began in the 1960s as bare sandbar reshaped by a river dam, and the metasequoia avenue planted then has since become one of the most photographed roads in the country, mostly because a single television drama filmed there in 2002. The island now runs its own visa-stamp entry ticket as a running joke about being an independent republic.|Nami comenzó en los sesenta como un banco de arena desnudo remodelado por una presa fluvial, y la avenida de metasecuoyas plantada entonces se ha vuelto una de las carreteras más fotografiadas del país, sobre todo por un único dorama filmado allí en 2002.|Nami commença dans les années 1960 comme un banc de sable nu remodelé par un barrage fluvial, et l'allée de métaséquoias plantée alors est devenue l'une des routes les plus photographiées du pays, en grande partie à cause d'un unique feuilleton télévisé tourné là en 2002.|南怡島は1960年代、川のダムで形を変えられたただの砂州として始まった。そのとき植えられたメタセコイア並木は、2002年に撮影された一本のテレビドラマがきっかけで、いまや国内で最も写真に撮られる道の一つになっている。島は独立共和国を名乗る冗談として、いまも独自の「入国スタンプ」付きの入場券を発行している。",
    [prop("Metasequoia Avenue|Avenida de metasecuoyas|Allée de métaséquoias|メタセコイア並木", 300, 62),
     prop("Reservoir Boat Landing|Embarcadero del embalse|Débarcadère du réservoir|貯水池の船着場", 240, 50)],
  ),

  // ---------------------------------------------------------------------
  // gw — 江原
  // ---------------------------------------------------------------------
  chuncheon: city(
    "Chuncheon|Chuncheon|Chuncheon|春川",
    127.73, 37.88, "gw", "lake", "lakeside", "l",
    "A city surrounded by its own reservoirs|Una ciudad rodeada por sus propios embalses|Une ville cernée par ses propres réservoirs|二つのダム湖に囲まれた町",
    "Two dams built in the 1960s left the old town almost encircled by water, and the province capital now markets itself on the strength of a dish invented for exactly this landscape: chicken marinated and grilled over an open flame, cheap enough for students who used to cycle out from Seoul on the new commuter line. Cog railway or not, the ride is still sold as a day trip rather than a commute.|Dos presas construidas en los sesenta dejaron el casco viejo casi rodeado de agua, y la capital provincial se promociona hoy con un plato ideado justo para este paisaje: pollo adobado y asado a la parrilla.|Deux barrages construits dans les années 1960 laissèrent la vieille ville presque cernée d'eau, et la capitale provinciale se vend aujourd'hui sur la force d'un plat inventé justement pour ce paysage : du poulet mariné grillé à flamme vive.|1960年代に築かれた二つのダムのおかげで、旧市街はほとんど水に囲まれることになった。道庁所在地のこの町はいま、まさにこの地形のために生まれた料理――炭火で焼くコチュジャン漬けの鶏肉料理――を売りにしている。ソウルから新しい通勤路線で日帰りに来る学生には手頃な値段である。",
    [prop("Dam Reservoir Terrace|Terraza del embalse|Terrasse du barrage|ダム湖のテラス", 320, 66),
     prop("Grilled Chicken Alley|Callejón del pollo asado|Ruelle du poulet grillé|鶏の炭火焼き横丁", 280, 58)],
  ),
  gangneung: city(
    "Gangneung|Gangneung|Gangneung|江陵",
    128.90, 37.75, "gw", "coast", "seaside", "r",
    "A coastline that decided it liked coffee|Una costa que decidió que le gustaba el café|Un littoral qui a pris goût au café|コーヒーを好きになった海辺",
    "A single roastery opened by the beach in the early 2000s multiplied into more than shops in a city of under 200,000, largely because the same easterly sea wind that once dried fish now gets credited with the humidity roasters say they need. The 2018 Winter Olympics built an ice arena here for a coastal city better known for its pine-lined shore than for winter sport.|Una sola tostaduría abierta junto a la playa a principios de siglo se multiplicó hasta sumar más de cien locales en una ciudad de menos de 200.000 habitantes.|Une seule torréfaction ouverte près de la plage au début des années 2000 s'est multipliée en plus d'une centaine d'échoppes dans une ville de moins de 200 000 habitants.|2000年代初め、浜辺に開いた一軒の焙煎店から広がり、人口20万に満たないこの町にコーヒー店が百軒以上できた。かつて魚を干すのに使われたのと同じ東からの潮風が、いまは焙煎に要る湿度をもたらすとされている。2018年の平昌冬季五輪はこの海辺の町にアイスアリーナを建てた。松林の海岸のほうで知られてきた町である。",
    [prop("Beachfront Roastery|Tostaduría frente al mar|Torréfaction en front de mer|浜辺の焙煎店", 380, 78),
     prop("Ice Arena Concourse|Vestíbulo del estadio de hielo|Hall de la patinoire|アイスアリーナのロビー", 300, 62)],
  ),
  sokcho: city(
    "Sokcho|Sokcho|Sokcho|束草",
    128.59, 38.21, "gw", "mountain", "valley", "r",
    "A city that grew from refugees waiting to go home|Una ciudad nacida de refugiados que esperaban volver a casa|Une ville née de réfugiés attendant de rentrer chez eux|帰る日を待つ人々が築いた町",
    "Sokcho filled with people who fled south from Hamgyong province during the Korean War expecting to return within months, and the harbour-side market called Abai Village still sells the blood-sausage dish they brought with them, made now for grandchildren who have never seen the north. The city sits at the gate to Seoraksan, whose granite peaks rise almost straight from the coastal plain.|Sokcho se llenó de gente que huyó al sur desde la provincia de Hamgyong durante la guerra de Corea esperando volver en meses, y el mercado junto al puerto llamado Aldea Abai aún vende el embutido de sangre que trajeron consigo.|Sokcho se remplit de gens fuyant vers le sud depuis la province du Hamgyong pendant la guerre de Corée, persuadés de rentrer en quelques mois, et le marché portuaire nommé village Abai vend encore le boudin qu'ils apportèrent avec eux.|束草は、朝鮮戦争のとき数か月で戻れると思って咸鏡道から南へ逃げてきた人々でふくれあがった町である。港沿いのアバイ村と呼ばれる市場では、彼らが持ち込んだ豚の血の腸詰めがいまも売られている。作っているのは、北の地を見たことのない孫の世代である。町は雪岳山への入口にあり、その花崗岩の峰々は海沿いの平地からほぼ垂直に立ち上がる。",
    [prop("Abai Village Sausage Stall|Puesto de embutido de Aldea Abai|Étal de boudin du village Abai|アバイ村の腸詰め屋台", 260, 54),
     prop("Seorak Gateway Lodge|Albergue de la puerta de Seorak|Gîte de la porte du Seorak|雪岳山の入口の宿", 340, 70)],
  ),
  pyeongchang: city(
    "Pyeongchang|Pyeongchang|Pyeongchang|平昌",
    128.68, 37.65, "gw", "mountain", "ski", "l",
    "A county that bid three times before it won|Un condado que se presentó tres veces antes de ganar|Un district qui candidata trois fois avant de gagner|三度目の招致でつかんだ冬季五輪",
    "Pyeongchang lost two Olympic bids, in 2003 and 2007, before finally winning the 2018 Winter Games on its third attempt, built mostly on ski grounds already open since the 1970s at an altitude of around 700 metres. The opening ceremony's fireworks were digitally simulated for broadcast on top of the real display, after cold and wind cut the actual show shorter than planned.|Pyeongchang perdió dos candidaturas olímpicas, en 2003 y 2007, antes de ganar por fin los Juegos de Invierno de 2018 en su tercer intento, construidos en su mayoría sobre pistas de esquí abiertas ya desde los setenta.|Pyeongchang perdit deux candidatures olympiques, en 2003 et 2007, avant de remporter enfin les Jeux d'hiver de 2018 à sa troisième tentative, bâtis en grande partie sur des pistes de ski ouvertes dès les années 1970.|平昌は2003年と2007年に二度、五輪招致に敗れたのち、三度目の挑戦でようやく2018年冬季大会を勝ち取った。会場の多くは標高約700mにすでに1970年代から開かれていたスキー場を土台にしている。開会式の花火は、寒さと風で実際の演出が予定より短く終わったため、放送では実演の上にデジタル合成が重ねられた。",
    [prop("Alpine Ski Lodge|Refugio de esquí alpino|Chalet de ski alpin|アルペンスキー小屋", 420, 86),
     prop("Olympic Stadium Gate|Puerta del estadio olímpico|Porte du stade olympique|五輪スタジアムの門", 360, 74)],
  ),
  samcheok: city(
    "Samcheok|Samcheok|Samcheok|三陟",
    129.16, 37.45, "gw", "mountain", "valley", "l",
    "A coast hollow with limestone caves|Una costa hueca de cuevas calizas|Un littoral creux de grottes calcaires|鍾乳洞だらけの海辺",
    "The limestone hills behind Samcheok hold more than 130 recorded caves, one of them, Hwanseon Cave, running over 6 km and open to visitors along little more than a tenth of its length. The city was also a coal-mining centre until the industry collapsed in the 1990s, and some of the shafts have since reopened as museums rather than mines.|Las colinas calizas tras Samcheok esconden más de 130 cuevas registradas; una de ellas, la cueva Hwanseon, se extiende más de 6 km y solo un décimo de su longitud está abierto a los visitantes.|Les collines calcaires derrière Samcheok recèlent plus de 130 grottes répertoriées, dont l'une, la grotte Hwanseon, s'étend sur plus de 6 km, à peine un dixième étant ouvert aux visiteurs.|三陟の背後の石灰岩の丘陵には130以上の洞窟が記録されており、そのうちの一つ幻仙窟は全長6kmを超えるが、公開されているのはその一割程度にすぎない。この町はかつて石炭の町でもあったが、1990年代に産業が衰退し、坑道のいくつかは鉱山ではなく博物館として開き直されている。",
    [prop("Limestone Cave Entrance|Entrada de la cueva caliza|Entrée de la grotte calcaire|鍾乳洞の入口", 300, 62),
     prop("Former Coal Shaft Museum|Museo del antiguo pozo de carbón|Musée de l'ancien puits de charbon|旧炭坑の博物館", 240, 50)],
  ),
  wonju: city(
    "Wonju|Wonju|Wonju|原州",
    127.94, 37.34, "gw", "mountain", "valley", "r",
    "A hospital city grown up around one idea|Una ciudad hospitalaria crecida en torno a una idea|Une ville-hôpital née d'une seule idée|ひとつの発想で育った医療機器の町",
    "Wonju built its economy around medical devices and hospital equipment manufacturing from the 1990s on, an unusual specialism for a mountain-ringed inland city, and it now makes a large share of the country's precision medical tools. Chiaksan's granite ridge above the city was named for a folk tale in which a magpie repaid a man for killing the snake about to eat its chicks.|Wonju construyó su economía en torno a dispositivos médicos y equipo hospitalario desde los noventa, una especialidad inusual para una ciudad de interior rodeada de montañas.|Wonju bâtit son économie autour des dispositifs médicaux et du matériel hospitalier à partir des années 1990, une spécialité inhabituelle pour une ville d'intérieur cernée de montagnes.|原州は1990年代以降、医療機器と病院設備の製造を中心に経済を築いてきた。山に囲まれた内陸都市としては珍しい専門分野で、いまや国内の精密医療機器の大きな割合を作っている。町の背後にそびえる雉岳山の花崗岩の稜線は、雛を食べようとした蛇を殺した男に恩を返したカササギの民話にちなんで名付けられた。",
    [prop("Medical Device Workshop|Taller de dispositivos médicos|Atelier de dispositifs médicaux|医療機器の工房", 340, 70),
     prop("Chiaksan Ridge Trailhead|Inicio de sendero de Chiaksan|Départ de sentier du Chiaksan|雉岳山の登山口", 260, 54)],
  ),

  // ---------------------------------------------------------------------
  // cc — 忠清
  // ---------------------------------------------------------------------
  daejeon: city(
    "Daejeon|Daejeon|Daejeon|大田",
    127.38, 36.35, "cc", "science", "metro", "r",
    "A rail junction that grew into a research city|Un nudo ferroviario que creció hasta ser ciudad de investigación|Un nœud ferroviaire devenu ville de recherche|分岐駅から育った研究都市",
    "Daejeon was a village of a few hundred people before a railway junction placed it on the map in 1905, and it has since become the base for dozens of national research institutes clustered in one science town built from 1973 on open fields. Its train station is still the point where the Gyeongbu and Honam lines to the south and southwest divide.|Daejeon era una aldea de unos pocos cientos de habitantes antes de que un nudo ferroviario la pusiera en el mapa en 1905, y desde entonces se ha convertido en la base de decenas de institutos nacionales de investigación.|Daejeon n'était qu'un village de quelques centaines d'habitants avant qu'un nœud ferroviaire ne la mette sur la carte en 1905, et elle est depuis devenue le siège de dizaines d'instituts nationaux de recherche.|大田は1905年に鉄道の分岐点となるまで数百人ほどの村にすぎなかった。以来、1973年から野原に築かれた一つの科学都市に、国立の研究機関数十が集まる拠点になっている。大田駅は今も、南へ向かう京釜線と南西へ向かう湖南線が分かれる地点である。",
    [prop("Science Town Research Tower|Torre de investigación de la ciudad científica|Tour de recherche de la ville scientifique|科学都市の研究タワー", 750, 154),
     prop("Rail Junction Platform|Andén del nudo ferroviario|Quai du nœud ferroviaire|分岐駅のホーム", 420, 86)],
  ),
  cheongju: city(
    "Cheongju|Cheongju|Cheongju|清州",
    127.49, 36.64, "cc", "craft", "metro", "l",
    "The oldest surviving book printed with metal type|El libro impreso con tipos metálicos más antiguo que se conserva|Le plus ancien livre imprimé en caractères métalliques conservé|現存最古の金属活字本の町",
    "A Buddhist text printed at a temple here in 1377 is the oldest book made with movable metal type known to survive anywhere, seventy-eight years before Gutenberg's Bible, though only its second volume still exists and it sits today in a French national library rather than in Korea. The city has built a whole museum quarter around the claim.|Un texto budista impreso en un templo de aquí en 1377 es el libro más antiguo hecho con tipos metálicos móviles que se conserva, setenta y ocho años antes que la Biblia de Gutenberg, aunque solo sobrevive su segundo volumen y hoy se guarda en una biblioteca nacional francesa.|Un texte bouddhique imprimé dans un temple d'ici en 1377 est le plus ancien livre connu fait de caractères métalliques mobiles, soixante-dix-huit ans avant la Bible de Gutenberg, bien que seul son second volume subsiste, aujourd'hui conservé dans une bibliothèque nationale française.|1377年にこの地の寺で刷られた仏教書は、現存する世界最古の金属活字本とされ、グーテンベルクの聖書より78年早い。ただし現存するのは下巻のみで、いまは韓国ではなくフランスの国立図書館に収められている。町はこの由緒を中心に、まるごと一角を博物館街にしている。",
    [prop("Movable Type Print Shop|Taller de tipos móviles|Atelier de caractères mobiles|活字印刷の工房", 380, 78),
     prop("Early Printing Museum Hall|Sala del museo de la imprenta|Salle du musée de l'imprimerie|印刷博物館の展示室", 300, 62)],
  ),
  cheonan: city(
    "Cheonan|Cheonan|Cheonan|天安",
    127.11, 36.81, "cc", "monument", "village", "r",
    "A hall built by donations from an entire nation|Un salón levantado con donativos de toda una nación|Une salle bâtie grâce aux dons de toute une nation|国じゅうの寄付で建てた記念館",
    "Independence Hall opened in 1987 after being funded almost entirely by public donation, including small sums collected from schoolchildren, following a dispute over how a Japanese textbook described the colonial period. The city's honey-walnut cakes, invented in the 1930s by a baker's wife who mixed walnuts from a roadside stall into her batter, are now sold at nearly every rest stop on the nearby expressway.|El Salón de la Independencia abrió en 1987 tras financiarse casi por entero con donativos públicos, incluidas pequeñas sumas recogidas de escolares.|Le Mémorial de l'indépendance ouvrit en 1987, financé presque entièrement par des dons publics, dont de petites sommes récoltées auprès d'écoliers.|独立記念館は1987年、ほぼ全額が国民からの寄付でまかなわれて開館した。小学生から集めたわずかな募金まで含まれていた。町名物のホドゥグァジャ(くるみ菓子)は1930年代、道端の屋台のくるみを生地に混ぜたパン屋の妻が考案したもので、いまでは近くの高速道路のほとんどの休憩所で売られている。",
    [prop("Independence Hall Plaza|Plaza del Salón de la Independencia|Esplanade du Mémorial de l'indépendance|独立記念館の広場", 480, 100),
     prop("Honey Walnut Bakery|Panadería de nuez con miel|Boulangerie aux noix et miel|くるみ菓子のパン屋", 280, 58)],
  ),
  sejong: city(
    "Sejong|Sejong|Sejong|世宗",
    127.29, 36.48, "cc", "science", "metro", "l",
    "A capital built to empty another one|Una capital construida para vaciar otra|Une capitale bâtie pour en désengorger une autre|もう一つの首都を空けるための街",
    "Sejong was built from 2007 on farmland to move much of the national government out of an overcrowded capital, and its round central government complex has a roof planted with grass so it reads from above as a continuation of the surrounding hills. It is named for the fifteenth-century king who invented Korea's alphabet, not for any place that existed before it.|Sejong se construyó desde 2007 sobre tierras de labranza para trasladar buena parte del gobierno nacional fuera de una capital saturada, y su complejo gubernamental circular tiene un tejado sembrado de hierba.|Sejong fut bâtie à partir de 2007 sur des terres agricoles pour délester une partie du gouvernement national d'une capitale surpeuplée, et son complexe gouvernemental circulaire porte un toit planté d'herbe.|世宗市は2007年から、過密な首都から中央省庁の多くを移すために農地の上に建てられた。円形の政府庁舎の屋根には芝が植えられ、上空から見ると周りの丘の続きのように見える。市の名は、以前からあった土地の名ではなく、朝鮮の文字を作った15世紀の王からとられている。",
    [prop("Grass-Roofed Government Complex|Complejo gubernamental de tejado verde|Complexe gouvernemental au toit végétalisé|芝屋根の政府庁舎", 560, 116),
     prop("Riverside Bicycle Path|Ciclovía junto al río|Piste cyclable au bord du fleuve|川沿いの自転車道", 280, 58)],
  ),
  boryeong: city(
    "Boryeong|Boryeong|Boryeong|保寧",
    126.61, 36.33, "cc", "festival", "seaside", "r",
    "A beach that turned its mud into a festival|Una playa que convirtió su lodo en un festival|Une plage qui a fait de sa vase une fête|泥を祭りに変えた浜",
    "Daecheon Beach's mud, rich in minerals and once sold mainly as a cosmetic ingredient, became the centre of a festival launched in 1998 that now fills the shore each July with visitors wrestling in flats built specifically to hold it. Divers still bring up flat-shelled clams from the same tidal grounds by hand at low tide.|El lodo de la playa Daecheon, rico en minerales y antes vendido sobre todo como ingrediente cosmético, se convirtió en el centro de un festival lanzado en 1998 que hoy llena la costa cada julio.|La vase de la plage de Daecheon, riche en minéraux et jadis vendue surtout comme ingrédient cosmétique, devint le cœur d'un festival lancé en 1998 qui remplit aujourd'hui le rivage chaque juillet.|大川海水浴場の泥は鉱物を多く含み、かつては主に化粧品の材料として売られていたが、1998年に始まった祭りの主役となり、いまや七月になると専用に造られた泥の広場で客がもみ合う浜を埋め尽くす。海女はいまも同じ干潟で、引き潮のたびに手でハマグリを採っている。",
    [prop("Mud Festival Flat|Explanada del festival de lodo|Esplanade du festival de la vase|マッドフェスティバル会場", 320, 66),
     prop("Tidal Clam Flat|Fangal de almejas|Vasière à palourdes|潮干狩りの干潟", 240, 50)],
  ),
  chungju: city(
    "Chungju|Chungju|Chungju|忠州",
    127.93, 36.99, "cc", "lake", "valley", "l",
    "A lake made to end a flood that kept coming back|Un lago hecho para acabar con una crecida que volvía siempre|Un lac fait pour mettre fin à une crue qui revenait sans cesse|繰り返す洪水を止めるための湖",
    "The Chungju Dam, completed in 1985, drowned dozens of villages under a reservoir built specifically to control flooding on the Han River downstream in Seoul, and some residents still hold a yearly rite at the shoreline for the homes that disappeared. The apples grown on the hills above the lake are marketed on the temperature swing between the warm days and the cold air pooling over the water at night.|La presa de Chungju, terminada en 1985, anegó docenas de aldeas bajo un embalse construido específicamente para controlar las crecidas del río Han aguas abajo en Seúl.|Le barrage de Chungju, achevé en 1985, noya des dizaines de villages sous un réservoir bâti spécifiquement pour maîtriser les crues du fleuve Han en aval, à Séoul.|1985年に完成した忠州ダムは、下流のソウルを流れる漢江の洪水を抑えるために造られた貯水池の下に、幾つもの村を沈めた。住民の中には、消えた家々のために毎年湖畔で祭祀を行う人もいる。湖を見下ろす丘で育つりんごは、日中の暖かさと夜に水面にたまる冷気との寒暖差を売りにしている。",
    [prop("Reservoir Ferry Dock|Muelle del ferri del embalse|Débarcadère du ferry du réservoir|ダム湖の渡し場", 300, 62),
     prop("Hillside Apple Orchard|Manzanar de ladera|Verger de pommiers en coteau|山腹のりんご園", 260, 54)],
  ),
  buyeo: city(
    "Buyeo|Buyeo|Buyeo|扶余",
    126.91, 36.28, "cc", "fortress", "fortress", "l",
    "A kingdom's last night, told through a cliff|La última noche de un reino, contada por un acantilado|La dernière nuit d'un royaume, racontée par une falaise|崖が語る王朝最後の夜",
    "Buyeo was the final capital of the Baekje kingdom until it fell to a combined Silla-Tang army in 660, and legend holds that three thousand court women threw themselves from the cliff above the river rather than be taken, giving the rock its name, Falling Flower Rock. Almost nothing of the old palace survives above ground; most of what is known comes from what was buried.|Buyeo fue la última capital del reino de Baekje hasta su caída ante un ejército conjunto de Silla y Tang en 660, y la leyenda cuenta que tres mil damas de la corte se arrojaron desde el acantilado sobre el río antes que ser capturadas.|Buyeo fut la dernière capitale du royaume de Baekje jusqu'à sa chute face à une armée conjointe Silla-Tang en 660, et la légende veut que trois mille dames de cour se soient jetées de la falaise surplombant le fleuve plutôt que d'être capturées.|扶余は百済最後の都で、660年に新羅・唐の連合軍に落とされた。伝説によれば、宮女三千人が捕らわれるよりはと川を見下ろす崖から身を投げ、その岩は落花岩と名付けられたという。旧王宮は地上にほとんど何も残っておらず、分かっていることの多くは地中から出土したものによる。",
    [prop("Falling Flower Rock Overlook|Mirador de la Roca de la Flor Caída|Belvédère du rocher de la Fleur tombée|落花岩の展望台", 420, 86),
     prop("Buried Palace Excavation|Excavación del palacio enterrado|Fouille du palais enfoui|埋もれた王宮の発掘地", 320, 66)],
  ),

  // ---------------------------------------------------------------------
  // jl — 全羅
  // ---------------------------------------------------------------------
  gwangju: city(
    "Gwangju|Gwangju|Gwangju|光州",
    126.85, 35.16, "jl", "craft", "metro", "r",
    "A ten-day uprising that changed how a country is governed|Un alzamiento de diez días que cambió cómo se gobierna un país|Un soulèvement de dix jours qui a changé la façon de gouverner un pays|国のかたちを変えた十日間",
    "Citizens here held the city against the army for ten days in May 1980 after paratroopers fired on student protesters, an uprising crushed with a death toll still disputed decades later but now officially commemorated rather than denied. The biennale the city has run since 1995 is among the oldest contemporary-art biennales in Asia, founded partly to rebuild the city's image around culture.|Los vecinos mantuvieron la ciudad frente al ejército durante diez días en mayo de 1980, tras disparar los paracaidistas contra estudiantes, un alzamiento aplastado con un número de muertos aún disputado.|Les habitants tinrent la ville face à l'armée dix jours durant en mai 1980, après que les parachutistes eurent tiré sur des étudiants manifestants, un soulèvement écrasé dans un bilan de morts encore disputé.|1980年5月、空挺部隊が学生デモ隊に発砲したのち、市民は十日間にわたって軍に対して町を守り抜いた。この蜂起は鎮圧され、死者の数はいまも議論があるが、いまは否定されるのではなく公式に追悼されている。市が1995年から続けるビエンナーレはアジアでも屈指の古さを持つ現代美術展で、文化によって都市の印象を立て直す狙いもあって始められた。",
    [prop("Biennale Exhibition Hall|Sala de la bienal|Halle de la biennale|ビエンナーレの展示館", 620, 128),
     prop("May Uprising Memorial Plaza|Plaza conmemorativa del alzamiento de mayo|Esplanade commémorative du soulèvement de mai|五月民主抗争の広場", 480, 100)],
  ),
  jeonju: city(
    "Jeonju|Jeonju|Jeonju|全州",
    127.15, 35.82, "jl", "hanok", "hanok", "l",
    "A dish invented to use up the last of everything|Un plato ideado para aprovechar los restos de todo|Un plat inventé pour épuiser les restes de tout|残り物を無駄にしないための一皿",
    "Jeonju bibimbap is traditionally credited to the custom of mixing leftover side dishes into rice at the end of a market day or a memorial rite so nothing went to waste, and the city's roughly 800 surviving hanok houses, spared when the rest of Korea's traditional housing was cleared for redevelopment, now form the country's largest such quarter. It was also the ancestral home of the Joseon dynasty's founding family.|Al bibimbap de Jeonju se le atribuye tradicionalmente la costumbre de mezclar las sobras del día de mercado o de un rito conmemorativo con arroz para no desperdiciar nada.|Le bibimbap de Jeonju est traditionnellement attribué à la coutume de mélanger au riz les restes du jour de marché ou d'un rite commémoratif, pour ne rien gaspiller.|全州ビビンバは、市の立つ日や祭祀の終わりに残った惣菜を無駄にしないよう飯に混ぜた習わしに由来するとされる。韓国の伝統家屋の多くが再開発で取り壊されるなか残った約800棟の韓屋が、いまや国内最大のその街区をなしている。朝鮮王朝を開いた一族の本貫地でもあった。",
    [prop("Hanok Village Guesthouse|Casa de huéspedes del pueblo de hanok|Maison d'hôtes du village de hanok|韓屋村のゲストハウス", 460, 96),
     prop("Bibimbap Market Stall|Puesto de bibimbap del mercado|Étal de bibimbap du marché|市場のビビンバ屋台", 320, 66)],
  ),
  mokpo: city(
    "Mokpo|Mokpo|Mokpo|木浦",
    126.39, 34.79, "jl", "port", "port", "r",
    "A port opened at gunpoint and built on the tide's schedule|Un puerto abierto a la fuerza y construido al ritmo de la marea|Un port ouvert de force et bâti au rythme de la marée|砲艦に開かされ、潮に従って築かれた港",
    "Mokpo was forced open as a treaty port by Japan in 1897 and its old colonial-era warehouses still line streets laid out to a Japanese grid rather than a Korean one. The harbour is skirted by more than 1,000 named islands, and the tidal flats around them are worked at low tide for octopus and shellfish in a fishery still done largely on foot.|Mokpo fue abierto por la fuerza como puerto de tratado por Japón en 1897 y sus antiguos almacenes coloniales aún bordean calles trazadas con una cuadrícula japonesa y no coreana.|Mokpo fut ouvert de force comme port de traité par le Japon en 1897, et ses anciens entrepôts coloniaux bordent encore des rues tracées selon une grille japonaise et non coréenne.|木浦は1897年、日本によって条約港として力ずくで開かれ、当時の倉庫街はいまも朝鮮式ではなく日本式の区画に沿った通りに並んでいる。港の周りには1000を超える名のついた島々が散らばり、その干潟では引き潮のたびにタコや貝を歩いて獲る漁がいまも盛んである。",
    [prop("Colonial-Era Warehouse Row|Hilera de almacenes de época colonial|Rangée d'entrepôts de l'ère coloniale|旧時代の倉庫街", 340, 70),
     prop("Thousand-Island Tidal Flat|Fangal de las mil islas|Vasière des mille îles|千の島の干潟", 260, 54)],
  ),
  yeosu: city(
    "Yeosu|Yeosu|Yeosu|麗水",
    127.66, 34.76, "jl", "cablecar", "port", "r",
    "A harbour that hid an admiral's secret weapon|Un puerto que ocultó el arma secreta de un almirante|Un port qui cacha l'arme secrète d'un amiral|将軍の秘密兵器を隠した港",
    "Admiral Yi Sun-sin built and hid his armoured turtle ships in this harbour before using them to hand Japan's invasion fleet a string of defeats in the 1590s, engagements still taught as some of the earliest recorded use of ironclad warships anywhere. A cable car now crosses the same strait, and refineries built from the 1960s spread along the coast the ships once sailed.|El almirante Yi Sun-sin construyó y escondió en este puerto sus acorazados tortuga antes de infligir una serie de derrotas a la flota invasora japonesa en la década de 1590.|L'amiral Yi Sun-sin construisit et cacha dans ce port ses navires-tortues cuirassés avant d'infliger une série de défaites à la flotte d'invasion japonaise dans les années 1590.|李舜臣将軍は1590年代、この港で亀甲船を建造して隠し、日本の侵攻艦隊に連敗を強いた。世界でも最初期の装甲軍艦の実戦例として、いまも教えられている戦いである。同じ海峡にはいまロープウェイが架かり、1960年代から築かれた製油所群が、かつて亀甲船が進んだ海岸沿いに広がっている。",
    [prop("Turtle Ship Harbour Dock|Muelle del barco tortuga|Quai du bateau-tortue|亀甲船の船着場", 400, 82),
     prop("Strait-Crossing Cable Car|Teleférico sobre el estrecho|Téléphérique du détroit|海峡のロープウェイ", 340, 70)],
  ),
  suncheon: city(
    "Suncheon|Suncheon|Suncheon|順天",
    127.49, 34.95, "jl", "flowerfield", "farmland", "l",
    "A city that tore down its own factories for a marsh|Una ciudad que derribó sus propias fábricas por una marisma|Une ville qui a démoli ses propres usines pour un marais|湿地のために工場を壊した町",
    "Suncheon Bay's reed marsh was slated for reclamation and industrial development in the 1990s before the city reversed course and tore down structures already built, betting instead on ecological tourism around the wintering cranes that stop there. The gamble paid off enough that the bay was named a wetland of international importance and now anchors the city's economy more than the factories ever did.|La marisma de la bahía de Suncheon estaba destinada a rellenarse y urbanizarse en los noventa antes de que la ciudad diera marcha atrás y derribara estructuras ya construidas, apostando en cambio por el turismo ecológico.|Le marais de la baie de Suncheon était voué au comblement et à l'industrialisation dans les années 1990 avant que la ville ne fasse volte-face et ne démolisse des structures déjà bâties, misant plutôt sur l'écotourisme.|順天湾の葦原は1990年代、埋め立てて工業開発する計画だったが、市はすでに建てた施設を取り壊してまで方針を転換し、冬を越しに来る鶴を中心にした生態観光に賭けた。その賭けは実を結び、湾は国際的に重要な湿地に登録され、いまでは工場よりも市の経済を支えている。",
    [prop("Reed Marsh Boardwalk|Pasarela de la marisma de cañas|Passerelle du marais à roseaux|葦原の木道", 340, 70),
     prop("Wintering Crane Hide|Escondite de observación de grullas|Cache d'observation des grues|越冬鶴の観察小屋", 260, 54)],
  ),
  gunsan: city(
    "Gunsan|Gunsan|Gunsan|群山",
    126.72, 35.97, "jl", "port", "port", "l",
    "A port built to carry rice away from the people who grew it|Un puerto construido para llevarse el arroz de quienes lo cultivaban|Un port bâti pour emporter le riz loin de ceux qui le cultivaient|作った人から米を運び去るための港",
    "Gunsan was developed by Japan from 1899 largely to ship rice grown on the Honam plain out of the country, and the colonial-era bank buildings and a still-standing wooden warehouse from that period now sit at the centre of a heritage street rather than being torn down. A single bakery founded in 1945 in a former Japanese confectionery shop is often cited as the country's oldest.|Gunsan fue desarrollado por Japón desde 1899 en gran parte para exportar el arroz cultivado en la llanura de Honam, y los edificios bancarios de época colonial se alzan hoy en el centro de una calle patrimonial en vez de haber sido derribados.|Gunsan fut développé par le Japon à partir de 1899, en grande partie pour exporter le riz cultivé dans la plaine de Honam, et les bâtiments bancaires de l'ère coloniale se dressent aujourd'hui au cœur d'une rue patrimoniale plutôt que d'avoir été rasés.|群山は1899年から日本によって開発され、主に湖南平野で取れる米を国外へ運び出すための港だった。当時の銀行の建物やいまも残る木造倉庫は取り壊されず、いまは近代歴史通りの中心に立つ。1945年、かつての日本人菓子店を引き継いで始まった一軒のパン屋は、しばしば国内最古とされる。",
    [prop("Heritage Street Bank Building|Edificio bancario de la calle patrimonial|Bâtiment bancaire de la rue patrimoniale|近代歴史通りの銀行建物", 360, 74),
     prop("Rice Warehouse Pier|Muelle del almacén de arroz|Jetée de l'entrepôt à riz|米倉庫の埠頭", 280, 58)],
  ),
  damyang: city(
    "Damyang|Damyang|Damyang|潭陽",
    126.99, 35.32, "jl", "craft", "farmland", "r",
    "A forest kept alive by a single family for six generations|Un bosque mantenido con vida por una sola familia durante seis generaciones|Une forêt maintenue en vie par une seule famille sur six générations|一族が六代守り続けた竹林",
    "Juknokwon's bamboo forest was planted and tended by one family from the 1920s and only opened to the public in 2003, its groves now walked on packed-earth paths threading stands tall enough to block the sky. Damyang's weavers once supplied bamboo blinds and mats to the royal court, and a handful still work rattan-and-bamboo bed mats designed to stay cool through a humid summer night.|El bosque de bambú de Juknokwon fue plantado y cuidado por una sola familia desde los años veinte y solo abrió al público en 2003, y sus bosquecillos se recorren hoy por senderos de tierra apisonada entre cañas tan altas que tapan el cielo.|La bambouseraie de Juknokwon fut plantée et entretenue par une seule famille depuis les années 1920 et n'ouvrit au public qu'en 2003, ses bosquets se parcourant aujourd'hui sur des sentiers de terre battue entre des tiges assez hautes pour masquer le ciel.|竹緑苑の竹林は1920年代からある一族が植えて手入れをし、2003年になってようやく一般に公開された。踏み固めた土の小径が、空を隠すほど高く茂る竹林の間を抜けている。潭陽の職人はかつて王宮に竹すだれや筵を納めており、いまも数軒が蒸し暑い夏の夜を涼しく過ごすための籐と竹の寝ござを編んでいる。",
    [prop("Bamboo Forest Path|Senda del bosque de bambú|Sentier de la bambouseraie|竹林の小径", 300, 62),
     prop("Bamboo Mat Workshop|Taller de esteras de bambú|Atelier de nattes de bambou|竹ござの工房", 240, 50)],
  ),
  boseong: city(
    "Boseong|Boseong|Boseong|宝城",
    127.08, 34.77, "jl", "flowerfield", "farmland", "l",
    "Tea rows planted to hold a hillside together|Hileras de té plantadas para sujetar una ladera|Des rangées de thé plantées pour retenir un coteau|斜面を留めるために植えた茶畝",
    "Tea has been grown on these hills since the Japanese colonial period established plantations here in the 1930s, and the terraced rows that now draw photographers were laid out partly to stop the slopes from eroding. Boseong still supplies a large share of the country's domestically grown green tea, picked by hand starting with the first flush in early spring.|El té se cultiva en estas colinas desde que el periodo colonial japonés estableció plantaciones aquí en los años treinta, y las hileras en terraza que hoy atraen a los fotógrafos se trazaron en parte para frenar la erosión de las laderas.|Le thé pousse sur ces collines depuis que la période coloniale japonaise y établit des plantations dans les années 1930, et les rangées en terrasses qui attirent aujourd'hui les photographes furent en partie tracées pour freiner l'érosion des pentes.|茶はこの丘陵で、1930年代に日本統治下で茶園が開かれて以来育てられてきた。いま写真家を集める段々畑の畝は、斜面の浸食を防ぐ目的もあって作られたものである。宝城はいまも国産緑茶の大きな割合を供給しており、早春の一番茶から手摘みで収穫される。",
    [prop("Terraced Tea Row|Hilera de té en terraza|Rangée de thé en terrasse|段々畑の茶畝", 280, 58),
     prop("Hand-Picking Tea House|Casa de té de recolección manual|Maison de thé de cueillette manuelle|手摘み茶の茶屋", 240, 50)],
  ),

  // ---------------------------------------------------------------------
  // gs — 慶尚
  // ---------------------------------------------------------------------
  busan: city(
    "Busan|Busan|Busan|釜山",
    129.08, 35.18, "gs", "coast", "seaside", "r",
    "A city that quadrupled overnight and never gave the land back|Una ciudad que se cuadruplicó de la noche a la mañana y nunca devolvió la tierra|Une ville qui a quadruplé en une nuit sans jamais rendre la terre|一夜で四倍にふくれ、土地を返さなかった町",
    "Busan's population roughly quadrupled during the Korean War as refugees poured into the only major city that never fell to the northern advance, and hillside shanty districts built in those years, since painted into rainbow-coloured tourist villages, still house their descendants. The port that absorbed them is now the country's busiest, and its film festival, started in 1996, has become the largest of its kind in Asia.|La población de Busan se cuadruplicó aproximadamente durante la guerra de Corea al llegar refugiados a la única gran ciudad que nunca cayó ante el avance del norte.|La population de Busan quadrupla à peu près pendant la guerre de Corée, les réfugiés affluant vers la seule grande ville jamais tombée face à l'avancée du nord.|釜山の人口は朝鮮戦争のあいだにおよそ四倍にふくれあがった。北からの侵攻に一度も落ちなかった唯一の大都市に、難民が押し寄せたからである。その頃に山の斜面に築かれたバラック街は、いまは虹色に塗られた観光の村になったが、子孫たちがいまも暮らしている。彼らを受け止めた港はいまや国内一の貿易量を誇り、1996年に始まった映画祭はアジア最大級に育った。",
    [prop("Rainbow Hillside Village|Pueblo arcoíris de la ladera|Village arc-en-ciel du coteau|虹色の山腹の村", 900, 186),
     prop("Haeundae Beach Promenade|Paseo de la playa Haeundae|Promenade de la plage de Haeundae|海雲台のビーチ通り", 1100, 228)],
  ),
  daegu: city(
    "Daegu|Daegu|Daegu|大邱",
    128.60, 35.87, "gs", "industry", "metro", "l",
    "A market that has sold the same medicine for three hundred years|Un mercado que ha vendido la misma medicina durante trescientos años|Un marché qui vend le même remède depuis trois cents ans|三百年同じ薬を商う市場",
    "Yangnyeongsi market has traded dried herbs and roots for traditional medicine since the 1650s, when the crown ordered a regional market established here twice a year, and dozens of shops still sort ginseng and deer antler by hand in a district scented block after block with the same dried roots. Daegu also became a national centre of textile milling in the twentieth century, largely on the strength of its hot, dry summer climate.|El mercado de Yangnyeongsi comercia con hierbas y raíces secas para medicina tradicional desde la década de 1650, cuando la corona ordenó establecer aquí un mercado regional dos veces al año.|Le marché de Yangnyeongsi négocie herbes et racines séchées pour la médecine traditionnelle depuis les années 1650, quand la cour ordonna d'y établir un marché régional deux fois l'an.|薬令市は1650年代、朝廷が年に二度ここに地方市を開かせたときから、乾燥した薬草や根を扱ってきた。いまも何十もの店が、何区画にもわたって同じ乾燥根の匂いが漂う一角で、朝鮮人参や鹿の角を手作業で選り分けている。大邱は20世紀、暑く乾いた夏の気候を強みに紡績業の国内有数の中心地にもなった。",
    [prop("Herb Market Sorting Stall|Puesto de clasificación del mercado de hierbas|Étal de tri du marché aux herbes|薬令市の選別台", 700, 144),
     prop("Textile Mill Floor|Nave de la fábrica textil|Atelier de la filature|紡績工場の作業場", 500, 104)],
  ),
  gyeongju: city(
    "Gyeongju|Gyeongju|Gyeongju|慶州",
    129.22, 35.86, "gs", "tomb", "ancienttomb", "r",
    "A capital that ruled for a thousand years without a city wall|Una capital que gobernó mil años sin muralla|Une capitale qui régna mille ans sans muraille|城壁なしに千年続いた都",
    "Gyeongju was the capital of the Silla kingdom for close to a thousand years, and the more than 150 grass-covered burial mounds still scattered through its downtown, some as tall as a five-storey building, were built without any surrounding city wall because Silla trusted mountains and a naval fleet to guard it instead. One mound opened for excavation in 1973 was found never to have been robbed, and its gold crown is now the emblem of the city.|Gyeongju fue la capital del reino de Silla durante cerca de mil años, y las más de 150 tumbas cubiertas de hierba aún esparcidas por su centro se levantaron sin muralla alguna.|Gyeongju fut la capitale du royaume de Silla durant près de mille ans, et les plus de 150 tumulus herbeux encore disséminés dans son centre furent bâtis sans la moindre muraille.|慶州はおよそ千年にわたり新羅の都であった。市街地にいまも150基以上散らばる芝に覆われた古墳は、五階建てのビルほどの高さのものもあるが、城壁は築かれなかった。新羅は山と水軍で守りを頼みとしたからである。1973年に発掘された古墳の一つは盗掘を一度も受けておらず、そこで見つかった金冠はいまや市の象徴となっている。",
    [prop("Royal Burial Mound Park|Parque de los túmulos reales|Parc des tumulus royaux|古墳公園", 780, 160),
     prop("Bulguksa Temple Courtyard|Patio del templo Bulguksa|Cour du temple Bulguksa|仏国寺の境内", 620, 128)],
  ),
  andong: city(
    "Andong|Andong|Andong|安東",
    128.73, 36.57, "gs", "festival", "hanok", "l",
    "A mask made to be burned, kept for six hundred years anyway|Una máscara hecha para ser quemada, conservada de todos modos seiscientos años|Un masque fait pour être brûlé, gardé quand même six cents ans|燃やされるはずが六百年残った面",
    "Hahoe's wooden masks were carved for a village exorcism rite and traditionally burned after their maker's death so no one else could wear them, yet a set from around the twelfth century survived and is now a national treasure, copied for the mask dance performed in the same riverside village every year. Andong also markets a soft, low-proof soju distilled by a method going back to the Mongol occupation of the thirteenth century.|Las máscaras de madera de Hahoe se tallaban para un rito de exorcismo aldeano y por tradición se quemaban tras la muerte de su artesano, para que nadie más las llevara.|Les masques de bois de Hahoe étaient taillés pour un rite d'exorcisme villageois et traditionnellement brûlés à la mort de leur sculpteur, afin que nul autre ne les porte.|河回のお面は村の悪霊払いの儀式のために彫られ、作った職人が死ぬと誰も着けられないよう伝統的に燃やされてきた。ところが12世紀ごろの一揃いが焼かれずに残り、いまは国宝となって、同じ川辺の村で毎年演じられる仮面劇の写しの元になっている。安東はまた、13世紀のモンゴル支配にまでさかのぼる製法で蒸留する、口当たりの柔らかい低アルコールの焼酎でも知られる。",
    [prop("Mask Dance Riverside Stage|Escenario ribereño de la danza de máscaras|Scène riveraine de la danse aux masques|仮面劇の川辺の舞台", 480, 100),
     prop("Traditional Soju Distillery|Destilería tradicional de soju|Distillerie traditionnelle de soju|伝統焼酎の蒸留所", 360, 74)],
  ),
  pohang: city(
    "Pohang|Pohang|Pohang|浦項",
    129.37, 36.02, "gs", "industry", "industrial", "l",
    "A fishing cove turned into a steel mill in three years|Una cala de pescadores convertida en acería en tres años|Une crique de pêcheurs changée en aciérie en trois ans|三年で製鉄所になった漁村",
    "Pohang was a fishing village of a few thousand people before the country's first integrated steel mill was built here between 1970 and 1973 on borrowed money and reparations funds, over the objections of foreign advisers who thought the plan reckless. The mill now covers a site large enough to hold a small town and made Pohang one of the wealthiest cities per capita in the country.|Pohang era una aldea de pescadores de unos pocos miles de habitantes antes de que se construyera aquí la primera acería integrada del país entre 1970 y 1973.|Pohang était un village de pêcheurs de quelques milliers d'habitants avant que la première aciérie intégrée du pays n'y soit bâtie entre 1970 et 1973.|浦項は、1970年から1973年にかけて借入金と請求権資金でこの地に国内初の一貫製鉄所が建てられるまで、数千人ほどの漁村にすぎなかった。無謀な計画だと外国人顧問たちに反対されながらの建設だった。製鉄所はいまや小さな町がまるごと収まるほどの敷地を占め、浦項を国内有数の一人当たり所得の高い都市にしている。",
    [prop("Integrated Steel Mill Gate|Puerta de la acería integrada|Porte de l'aciérie intégrée|一貫製鉄所の正門", 620, 128),
     prop("Homigot Sunrise Point|Punta del amanecer de Homigot|Pointe du lever de soleil de Homigot|虎尾串の日の出", 320, 66)],
  ),
  tongyeong: city(
    "Tongyeong|Tongyeong|Tongyeong|統営",
    128.42, 34.85, "gs", "cablecar", "port", "r",
    "A naval headquarters that became a school for artists|Un cuartel naval que se convirtió en escuela de artistas|Un quartier général naval devenu école d'artistes|水軍の本営から芸術家の町へ",
    "Tongyeong served as the headquarters of Admiral Yi Sun-sin's combined fleet in the 1590s, and the lacquerware and inlay craft workshops the navy kept to supply itself later trained a disproportionate number of the country's modern painters, poets and composers, born within a few streets of one another in the early twentieth century. A cable car now climbs the hill above the same fishing harbour the fleet once sheltered in.|Tongyeong sirvió de cuartel general de la flota combinada del almirante Yi Sun-sin en la década de 1590, y los talleres de laca e incrustaciones que la armada mantenía para abastecerse formaron después a un número desproporcionado de los pintores, poetas y compositores modernos del país.|Tongyeong servit de quartier général à la flotte combinée de l'amiral Yi Sun-sin dans les années 1590, et les ateliers de laque et de marqueterie que la marine entretenait pour son propre usage formèrent ensuite un nombre disproportionné des peintres, poètes et compositeurs modernes du pays.|統営は1590年代、李舜臣の三道水軍統制営が置かれた地である。水軍が自給のために抱えていた螺鈿漆器の工房は、のちに20世紀初頭、互いに数本の通りしか離れていない場所に生まれた近代の画家・詩人・作曲家を、その数の割に多く育てることになった。ロープウェイはいま、かつて艦隊が身を寄せた同じ漁港を見下ろす山に架かる。",
    [prop("Lacquerware Inlay Workshop|Taller de incrustaciones de laca|Atelier de marqueterie laquée|螺鈿漆器の工房", 400, 82),
     prop("Harbour Cable Car Station|Estación del teleférico del puerto|Gare du téléphérique du port|港のロープウェイ駅", 340, 70)],
  ),
  jinju: city(
    "Jinju|Jinju|Jinju|晋州",
    128.09, 35.18, "gs", "fortress", "fortress", "l",
    "A festival of lanterns that began as a wartime signal|Un festival de faroles que empezó como señal de guerra|Une fête de lanternes née d'un signal de guerre|戦の合図が祭りになった灯籠",
    "Lanterns were floated on the river below Jinju Fortress during a 1592 siege to send messages across the water and to keep Japanese troops from wading the shallows at night, a defence that held even though the fortress fell the following year with almost its entire garrison and civilian population killed. The same river now floats thousands of lanterns each autumn in a festival that remembers both the siege and a gisaeng said to have leapt to her death embracing an enemy general.|Se hicieron flotar faroles en el río bajo la fortaleza de Jinju durante un asedio en 1592 para enviar mensajes a través del agua y evitar que las tropas japonesas vadearan los bajíos de noche.|Des lanternes furent mises à flotter sur le fleuve sous la forteresse de Jinju lors d'un siège en 1592, pour transmettre des messages sur l'eau et empêcher les troupes japonaises de traverser les hauts-fonds la nuit.|1592年の籠城戦のとき、晋州城の下を流れる川に灯籠が浮かべられた。川を越えて合図を送り、夜に日本軍が浅瀬を渡るのを防ぐためだった。この防備にもかかわらず城は翌年落ち、守備兵と民のほぼ全員が命を落とした。同じ川にはいま毎秋、数千の灯籠が浮かべられる祭りが開かれ、籠城戦と、敵将を抱いて身を投げたと伝わる妓生の両方を偲んでいる。",
    [prop("Lantern Festival Riverbank|Ribera del festival de faroles|Berge de la fête des lanternes|灯籠祭りの川辺", 400, 82),
     prop("Fortress Wall Command Post|Puesto de mando de la muralla|Poste de commandement du rempart|城壁の将台", 320, 66)],
  ),
  ulsan: city(
    "Ulsan|Ulsan|Ulsan|蔚山",
    129.31, 35.54, "gs", "industry", "industrial", "r",
    "A whaling village that became a car factory|Una aldea ballenera convertida en fábrica de coches|Un village baleinier devenu usine automobile|捕鯨の村から自動車の町へ",
    "Prehistoric rock carvings at Bangudae show whales, boats and hunting scenes thought to be at least 3,500 years old, evidence of one of the world's earliest known whaling cultures, on cliffs upstream from a bay where the country's largest car factory and shipyard now stand. Ulsan builds more automobiles than any other Korean city and launches more ships by tonnage than almost anywhere on Earth.|Grabados rupestres prehistóricos en Bangudae muestran ballenas, barcas y escenas de caza que se cree tienen al menos 3.500 años, indicio de una de las culturas balleneras más antiguas conocidas del mundo.|Des gravures rupestres préhistoriques à Bangudae montrent baleines, barques et scènes de chasse vieilles d'au moins 3 500 ans selon les estimations, témoignage de l'une des plus anciennes cultures baleinières connues au monde.|盤亀台の先史時代の岩刻画には鯨や舟、狩りの様子が描かれ、少なくとも3500年前のものとされる。世界最古級の捕鯨文化の証とされるこの崖の下流には、いま国内最大の自動車工場と造船所が立つ。蔚山は韓国のどの都市よりも多く自動車を作り、トン数では世界でも屈指の量の船を進水させている。",
    [prop("Automobile Assembly Line|Cadena de montaje de automóviles|Chaîne de montage automobile|自動車の組立ライン", 780, 160),
     prop("Prehistoric Petroglyph Cliff|Acantilado de petroglifos prehistóricos|Falaise aux pétroglyphes préhistoriques|先史岩刻画の崖", 340, 70)],
  ),
  ulleungdo: city(
    "Ulleungdo|Ulleungdo|Ulleungdo|欝陵島",
    130.90, 37.48, "gs", "coast", "island", "r",
    "An island volcano too steep to have a flat road|Una isla volcánica demasiado escarpada para tener una carretera llana|Une île volcanique trop escarpée pour la moindre route plate|平らな道が作れないほど急な火山島",
    "Ulleungdo is the exposed peak of a volcano rising more than 2,000 metres from the seabed, so steep-sided that the island's ring road, begun in 1963, was not fully connected until 2018 because of cliffs that kept swallowing the budget. Squid boats anchor offshore at night with rows of bright lamps to draw the catch up, a light visible from the mainland ferry on a clear night.|Ulleungdo es la cumbre expuesta de un volcán que se alza más de 2.000 metros desde el lecho marino, de laderas tan escarpadas que la carretera anular de la isla, iniciada en 1963, no quedó del todo conectada hasta 2018.|Ulleungdo est le sommet émergé d'un volcan s'élevant à plus de 2 000 mètres depuis le fond marin, aux flancs si abrupts que la route circulaire de l'île, entamée en 1963, ne fut pleinement raccordée qu'en 2018.|欝陵島は海底から2000m以上そびえる火山の、海面に出た頂上にあたる。あまりに斜面が急なため、1963年に着工した島を一周する道路は、崖に工費を飲み込まれ続け、2018年になってようやく全通した。イカ釣り船は夜、明るい灯を連ねて沖に錨を下ろし群れを寄せる。晴れた夜には本土行きのフェリーからもその灯が見える。",
    [prop("Squid Boat Night Anchorage|Fondeadero nocturno de barcos calamareros|Mouillage nocturne des bateaux à calmars|イカ釣り船の夜の停泊地", 340, 70),
     prop("Ring Road Cliff Tunnel|Túnel del acantilado de la carretera anular|Tunnel falaise de la route circulaire|一周道路の崖のトンネル", 280, 58)],
  ),

  // ---------------------------------------------------------------------
  // jj — 済州
  // ---------------------------------------------------------------------
  jeju: city(
    "Jeju|Jeju|Jeju|済州",
    126.53, 33.50, "jj", "dolharubang", "volcanic", "r",
    "An island governed for centuries by women who dive|Una isla gobernada durante siglos por mujeres que bucean|Une île gouvernée des siècles durant par des femmes plongeuses|海に潜る女たちが支えてきた島",
    "Jeju's haenyeo dive without oxygen tanks for abalone, sea urchin and octopus in a tradition recorded since at least the seventeenth century, and because the men of many households fished or died at sea, the women's diving income made Jeju one of the few historically matrifocal economies in Korea. The stone dolharubang statues carved from the island's porous volcanic rock once stood as guardians at village and palace gates.|Las haenyeo de Jeju bucean sin bombonas de oxígeno para pescar oreja marina, erizo y pulpo, tradición registrada desde al menos el siglo XVII, y como los hombres de muchas casas pescaban o morían en el mar, el buceo femenino hizo de Jeju una de las pocas economías matrifocales de Corea.|Les haenyeo de Jeju plongent sans bouteille d'oxygène pour l'ormeau, l'oursin et le poulpe, tradition attestée depuis au moins le XVIIe siècle, et les hommes de nombreux foyers pêchant en mer ou y périssant, le revenu de la plongée féminine fit de Jeju l'une des rares économies matrifocales de Corée.|済州の海女は酸素ボンベを使わず、アワビやウニ、タコを素潜りで獲る。この習わしは少なくとも17世紀から記録されている。多くの家で男が漁に出たまま海で命を落としたため、女性の潜水による稼ぎが、済州を朝鮮でも数少ない母系的な経済にした。島の多孔質の火山岩から彫られた石像トルハルバンは、かつて村や王宮の門を守る守護神として立てられた。",
    [prop("Haenyeo Diving Cove|Cala de buceo de las haenyeo|Crique de plongée des haenyeo|海女の潜水漁の入り江", 620, 128),
     prop("Dolharubang Stone Workshop|Taller de piedra de los dolharubang|Atelier de pierre des dolharubang|トルハルバンの石工房", 460, 96)],
  ),
  seogwipo: city(
    "Seogwipo|Seogwipo|Seogwipo|西帰浦",
    126.56, 33.25, "jj", "coast", "seaside", "l",
    "A waterfall that only falls straight into the sea a few places on Earth|Una cascada que solo cae directo al mar en unos pocos lugares del planeta|Une chute d'eau qui ne tombe droit dans la mer qu'en de rares endroits sur Terre|世界でも珍しい、海へ直に落ちる滝",
    "Jeongbang Falls drops about 23 metres directly into the ocean, one of very few waterfalls anywhere recorded doing so, and a rock nearby is carved with a Chinese inscription some read as evidence that a Qin-dynasty expedition sent to find an elixir of immortality passed this way. Tangerines have been grown on the island's volcanic soil since at least the Joseon period, when they were sent north as tribute.|Las cascadas de Jeongbang caen unos 23 metros directamente al mar, una de las pocas registradas en el mundo que lo hacen así, y una roca cercana lleva grabada una inscripción china que algunos leen como prueba de que una expedición de la dinastía Qin en busca del elixir de la inmortalidad pasó por aquí.|Les chutes de Jeongbang tombent sur environ 23 mètres directement dans l'océan, l'une des rares chutes au monde répertoriées comme telles, et un rocher voisin porte une inscription chinoise que certains lisent comme la preuve qu'une expédition de la dynastie Qin en quête de l'élixir d'immortalité passa par ici.|正房瀑布は高さ約23mを海へ直接落ちる、世界でも数少ない滝の一つである。近くの岩には漢字の銘があり、不老不死の霊薬を求めた秦代の遠征隊がここを通った証しだと読む説もある。みかんは少なくとも朝鮮時代から島の火山灰土で育てられ、当時は貢ぎ物として北へ送られていた。",
    [prop("Sea-Falling Waterfall Overlook|Mirador de la cascada al mar|Belvédère de la chute tombant en mer|海に落ちる滝の展望台", 420, 86),
     prop("Volcanic Soil Tangerine Grove|Naranjal en suelo volcánico|Verger d'agrumes en sol volcanique|火山灰土のみかん畑", 320, 66)],
  ),
};

/**
 * 路線(55本)。陸続きの都市どうしは陸路、済州島・欝陵島への路線は
 * 航路(第3要素 "sea")。
 *
 * KTX・在来線の実在の筋を骨にしつつ、盤面としてつながりが保てるよう
 * 一部は幹線道路の相当区間で結んでいる。
 */
export const KOREA_EDGES = [
  // --- gg 京畿(ソウルを中心に) ---
  ["seoul", "incheon"],
  ["seoul", "suwon"],
  ["suwon", "yongin"],
  ["suwon", "icheon"],
  ["seoul", "goyang"],
  ["seoul", "gapyeong"],
  ["seoul", "panmunjeom"],
  ["panmunjeom", "goyang"], // 端の順を入れ替え。海に出ていた20pxが解消(check-sea-routes.mjs)
  // --- gw 江原(京義中央線・京春線・KTX江陵線) ---
  ["gapyeong", "chuncheon"],
  ["chuncheon", "sokcho"],
  ["sokcho", "gangneung"],
  ["gangneung", "pyeongchang"],
  ["gangneung", "samcheok"],
  ["pyeongchang", "wonju"],
  ["icheon", "wonju"],
  // --- gg-cc・cc内部(京釜線・長項線・忠北線) ---
  ["suwon", "cheonan"],
  ["cheonan", "sejong"],
  ["sejong", "daejeon"],
  ["daejeon", "cheongju"],
  ["cheongju", "chungju"],
  ["wonju", "chungju"],
  ["cheonan", "boryeong"],
  ["boryeong", "buyeo"],
  ["buyeo", "daejeon"],
  ["buyeo", "gunsan"],
  // --- jl 全羅(湖南線・全羅線) ---
  ["gunsan", "jeonju"],
  ["jeonju", "gwangju"],
  ["gwangju", "damyang"],
  ["gwangju", "boseong"],
  ["boseong", "suncheon"],
  ["yeosu", "suncheon"], // 端の順を入れ替え。海に出ていた23pxが解消(check-sea-routes.mjs)
  ["gwangju", "mokpo"],
  ["mokpo", "boseong"],
  // --- jl-gs(慶全線)・gs 慶尚(京釜線・中央線) ---
  ["suncheon", "jinju"],
  ["jinju", "tongyeong"],
  ["jinju", "busan"],
  ["busan", "ulsan"],
  ["ulsan", "gyeongju"],
  ["gyeongju", "pohang"],
  ["gyeongju", "daegu"],
  ["daegu", "daejeon"],
  ["daegu", "andong"],
  ["andong", "wonju"],
  ["andong", "gyeongju"],
  ["tongyeong", "busan"],
  // --- 航路(済州島・欝陵島) ---
  // 済州・欝陵島への3本は、端の順を入れ替えると陸に乗る長さが大きく減る
  // (計測: node scripts/check-sea-routes.mjs korea -v)。
  ["jeju", "mokpo", "sea"], // 陸147px→36px
  ["jeju", "yeosu", "sea"],
  ["jeju", "seogwipo"],
  ["ulleungdo", "pohang", "sea"], // 陸121px→40px
  ["sokcho", "ulleungdo", "sea"],
  // --- 少し離れた地方をまたぐ補助線(移動の選択肢を増やす) ---
  ["icheon", "yongin"],
  ["gapyeong", "wonju"],
  ["cheongju", "sejong"],
  ["daegu", "ulsan"],
  ["jeonju", "buyeo"],
];
