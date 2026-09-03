/**
 * 茨城県の都市と路線。
 *
 * 地方区分は県が実際に使う5つ(`hok` 県北 / `cen` 県央 / `rok` 鹿行 /
 * `nan` 県南 / `sei` 県西)。
 *
 * 36都市48路線。県北7 / 県央6 / 鹿行5 / 県南10 / 県西8。
 *
 * **並び順を入れ替えてある所が3か所ある。** 経路が「先に斜めへ折れるか」は
 * `use-board-layout.ts` の `diagonalFirst`(= 並び順の偶奇)で決まるので、
 * 順を変えると線の形が変わる。霞ヶ浦や海の上を通っていた線を、隣とだけ
 * 入れ替えて陸に乗せてある(理由はその場に書いた)。
 * **路線を増減させると後ろ全部の偶奇がずれるので、増減したら必ず数え直すこと。**
 *
 * つくば・大洗・ひたちなかの原稿は、77都市を書いて戻したときのもの
 * (コミット 95b8bc1 の `japan-sights-kanto.mjs`)をそのまま移してある。
 *
 * 経度・緯度は実際の値。投影の範囲は geography.mjs の IBARAKI_PROJ を参照。
 *
 * ## `mark`(36種、1都市1種)
 *
 * 以前は「信仰」「祭り」「実り」のような分類14種を4都市ずつで使い回していたが、
 * それでは大洗も鹿嶋も同じ鳥居になり、**地図を見てもその土地が何で知られているか
 * 分からない**と指摘された。いまは各都市の `tag`(ひとこと)に書いてあるものを
 * そのまま印にしている。迷ったら tag の一文がそのまま答え。絵は art.mjs。
 *
 * | 都市 | キー | 描くもの(根拠にした tag) |
 * |---|---|---|
 * | 水戸 | `plumtree` | 梅の木(皆に開かれた庭——偕楽園の梅) |
 * | 笠間 | `kilnjar` | 漬物甕(窯と稲荷の門前) |
 * | 大洗 | `seatorii` | 海の岩に立つ鳥居と朝日(波間に立つ鳥居) |
 * | ひたちなか | `bluehill` | 青く塗った丘(五月に青くなる丘) |
 * | 東海 | `atom` | 原子と稲妻(最初の電気が起きた村) |
 * | 小美玉 | `runwayjet` | 滑走路と戦闘機(戦闘機と滑走路を分け合う空港) |
 * | 那珂 | `sunflower` | ひまわり(四ヘクタールのひまわり) |
 * | 日立 | `tallchimney` | 工場と大煙突(修理工場から生まれた製作所) |
 * | 北茨城 | `rokkakudo` | 岩の上の朱い堂(岩の上の朱い堂) |
 * | 高萩 | `suspbridge` | 紅葉の上の吊り橋(紅葉の谷に架かる吊り橋) |
 * | 常陸太田 | `hermitage` | 茅葺きの庵(藩主が史書のために退いた庵) |
 * | 常陸大宮 | `stagecurtain` | 定式幕の芝居小屋(村が建てては壊す芝居小屋) |
 * | 大子 | `icefall` | 凍った滝(凍りつく滝) |
 * | 鹿嶋 | `keystone` | 鯰の頭を押さえる要石(大地を押さえる石) |
 * | 潮来 | `brideboat` | 嫁入り舟(舟で嫁ぐ町) |
 * | 神栖 | `pepperwind` | ピーマンと風車(風車の下の胡椒畑) |
 * | 行方 | `sweetpotato` | 二つの湖に挟まれた台地のさつまいも(二つの湖に挟まれた台地) |
 * | 鉾田 | `melon` | メロン(メロンの町) |
 * | つくば | `rocket` | ロケット(科学のために造られた街) |
 * | 土浦 | `fireworks` | 花火(競技として裁かれる花火) |
 * | 石岡 | `lionhead` | 大獅子(常陸国の国府——祭りの獅子頭) |
 * | かすみがうら | `hobikisen` | 帆引き船(風だけで曳く網) |
 * | 牛久 | `daibutsu` | 青銅の立像(中に昇降機のある青銅の像) |
 * | 龍ケ崎 | `polemai` | 柱の上の舞い手(柱の上で舞う男) |
 * | 取手 | `ferrycross` | 大河と渡し舟、手前の宿(大河の手前の宿) |
 * | 阿見 | `trainerplane` | 複葉の練習機(少年が飛行機乗りに育てられた地) |
 * | 稲敷 | `redshrine` | 朱の社殿(叶わぬ願いの社) |
 * | つくばみらい | `templegate` | 木の山門(図面のない山門) |
 * | 古河 | `peach` | 川べりの桃(川べりのもうひとつの幕府——河川敷の桃) |
 * | 結城 | `tsumugi` | 藍の反物(撚りをかけずに織る布) |
 * | 筑西 | `steamloco` | 蒸気機関車(日曜に走る蒸気機関車) |
 * | 桜川 | `hinadolls` | 雛人形(二月に家を開ける町) |
 * | 下妻 | `mirrorpond` | 沼に映る筑波山(田に水を引くために掘った沼) |
 * | 常総 | `keep` | 天守(城のなかった所に建てた天守) |
 * | 坂東 | `kabuto` | 兜(新皇を名乗った男) |
 * | 境 | `cargoboat` | 俵を積んだ川舟(川の荷が折り返した河岸) |
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const IBARAKI_CITIES = {
  // ---------------------------------------------------------------------
  // cen — 県央
  // ---------------------------------------------------------------------
  mito: city(
    "Mito|Mito|Mito|水戸",
    140.47, 36.37, "cen", "plumtree", "castletown", "r",
    "A garden opened to everyone|Un jardín abierto a todos|Un jardin ouvert à tous|皆に開かれた庭",
    "The lord who laid out Kairakuen in 1842 opened it to the townspeople from the start, which was unusual for a daimyo's garden. Three thousand plum trees of a hundred varieties bloom there from February, and the domain's school next door taught the ideas that helped end the shogunate.|El señor que trazó Kairakuen en 1842 lo abrió desde el principio a los vecinos, algo insólito en un jardín de daimio. Tres mil ciruelos de cien variedades florecen allí desde febrero.|Le seigneur qui dessina Kairakuen en 1842 l'ouvrit d'emblée aux habitants, chose rare pour un jardin de daimyo. Trois mille pruniers de cent variétés y fleurissent dès février.|1842年に偕楽園を開いた藩主は、はじめから領民に開放した。大名庭園としては異例である。百品種三千本の梅が二月から咲き、隣の藩校では幕末を動かす考えが講じられた。",
    [prop("Plum Garden Teahouse|Casa de té del ciruelar|Maison de thé du jardin|梅園の茶屋", 300, 62),
     prop("Domain School Hall|Salón de la escuela|Salle de l'école du fief|藩校の講堂", 270, 56)],
  ),
  kasama: city(
    "Kasama|Kasama|Kasama|笠間",
    140.30, 36.35, "cen", "kilnjar", "pottery", "l",
    "Kilns and a fox shrine|Hornos y un santuario del zorro|Fours et un sanctuaire au renard|窯と稲荷の門前",
    "Potters have fired here since the 1770s, and the clay is coarse enough that the town's ware was made for everyday mortars and pickle jars rather than for display. The inari shrine at its centre draws three hundred thousand people in the first three days of the year.|Se cuece cerámica aquí desde 1770; la arcilla es basta y su loza se hizo para morteros y tarros de encurtidos, no para exhibir. Su santuario inari recibe trescientas mil personas en los tres primeros días del año.|On y cuit la poterie depuis 1770 ; l'argile est grossière et la faïence servait aux mortiers et aux jarres à saumure, non à l'apparat. Son sanctuaire inari accueille trois cent mille personnes aux trois premiers jours de l'an.|1770年代から窯が焚かれてきた。土が粗く、飾りものではなくすり鉢や漬物甕といった日用の器を焼いてきた。町の中心の稲荷神社には、正月三が日で三十万人が訪れる。",
    [prop("Climbing Kiln|Horno escalonado|Four à flanc de colline|登り窯", 260, 54),
     prop("Shrine Approach Stalls|Puestos del sendero|Étals de l'allée|門前の露店", 240, 50)],
  ),
  oarai: city(
    "Ōarai|Ōarai|Ōarai|大洗",
    140.57, 36.31, "cen", "seatorii", "seaside", "r",
    "A torii gate standing in the waves|Un torii en pie entre las olas|Un torii dressé dans les vagues|波間に立つ鳥居",
    "The Kamiiso torii stands on a rock in the sea, and on clear mornings the sun rises exactly through it. The town's ferries run overnight to Hokkaidō, and its fish market is known for monkfish stew in winter.|El torii de Kamiiso se alza sobre una roca en el mar y en mañanas claras el sol sale justo a través de él. Sus ferris cruzan de noche a Hokkaidō.|Le torii de Kamiiso se dresse sur un rocher dans la mer et, par temps clair, le soleil s'y lève exactement au centre. Ses ferries rejoignent Hokkaidō de nuit.|神磯の鳥居は海の岩の上に立ち、晴れた朝には日がその真ん中から昇る。港からは北海道へ夜行のフェリーが出て、冬はあんこう鍋で知られる。",
    [prop("Sunrise Torii|Torii del amanecer|Torii de l'aurore|神磯の鳥居", 260, 54),
     prop("Ferry Terminal|Terminal de ferris|Gare maritime|フェリーターミナル", 280, 58)],
  ),

  hitachinaka: city(
    "Hitachinaka|Hitachinaka|Hitachinaka|ひたちなか",
    140.53, 36.40, "cen", "bluehill", "coasttown", "l",
    "A hill that turns blue each May|Una colina que azulea cada mayo|Une colline qui bleuit chaque mai|五月に青くなる丘",
    "Four and a half million baby-blue-eyes flowers open on one hill in late April, turning it the same colour as the sky behind it. The same hill is scarlet with kochia bushes in October.|Cuatro millones y medio de nemophilas cubren una colina a finales de abril, del mismo azul que el cielo. En octubre la misma colina enrojece con arbustos de kochia.|Quatre millions et demi de némophiles fleurissent sur une colline fin avril, du même bleu que le ciel. En octobre, la même colline rougit de kochias.|4月下旬、450万本のネモフィラが丘を覆い、背後の空と同じ色になる。同じ丘は10月にはコキアで真っ赤に染まる。",
    [prop("Flower Hill|Colina florida|Colline fleurie|みはらしの丘", 300, 62),
     prop("Fish Market Quay|Muelle del mercado|Quai du marché aux poissons|おさかな市場の岸", 260, 54)],
  ),
  tokai: city(
    "Tōkai|Tōkai|Tōkai|東海",
    140.57, 36.47, "cen", "atom", "harbourtown", "r",
    "Where the first current was drawn|Donde se sacó la primera corriente|Où l'on tira le premier courant|最初の電気が起きた村",
    "Japan's first nuclear electricity was generated in this village in 1963, and the country's atomic research has been concentrated here ever since. It remains one of the smallest municipalities in the prefecture, a village that never became a town.|La primera electricidad nuclear de Japón se generó en esta aldea en 1963, y allí se concentra desde entonces la investigación atómica del país.|La première électricité nucléaire du Japon fut produite dans ce village en 1963, et la recherche atomique du pays s'y concentre depuis.|1963年、日本で最初の原子力の電気がこの村で起こされ、以来、国の原子力研究はここに集まっている。県内でも最も小さい自治体のひとつで、町にならないまま村であり続けている。",
    [prop("Research Reactor|Reactor de investigación|Réacteur de recherche|研究炉", 300, 62),
     prop("Dried Sweet Potato Yard|Patio de boniato seco|Séchoir à patates douces|干し芋の干し場", 230, 48)],
  ),
  omitama: city(
    "Omitama|Omitama|Omitama|小美玉",
    140.35, 36.24, "cen", "runwayjet", "ricefield", "r",
    "An airport sharing a runway with fighters|Un aeropuerto que comparte pista con cazas|Un aéroport partageant sa piste avec des chasseurs|戦闘機と滑走路を分け合う空港",
    "The prefecture's only airport opened in 2010 on the edge of an air force base, and passengers taxi past fighter jets on the way to the terminal. Dairy farms around it make the town the largest producer of milk in the Kantō plain.|El único aeropuerto de la prefectura abrió en 2010 junto a una base aérea, y los pasajeros pasan junto a cazas camino de la terminal.|Le seul aéroport de la préfecture ouvrit en 2010 au bord d'une base aérienne, et les passagers roulent devant des chasseurs pour gagner l'aérogare.|県で唯一の空港は2010年、航空自衛隊の基地の端に開いた。乗客は戦闘機の脇を通ってターミナルへ向かう。周りの酪農はさかんで、関東平野で最も多く牛乳を出す町である。",
    [prop("Airport Terminal|Terminal del aeropuerto|Aérogare|空港のターミナル", 280, 58),
     prop("Dairy Barn|Establo lechero|Étable laitière|酪農の牛舎", 240, 50)],
  ),

  // ---------------------------------------------------------------------
  // hok — 県北
  // ---------------------------------------------------------------------
  naka: city(
    "Naka|Naka|Naka|那珂",
    140.49, 36.46, "hok", "sunflower", "ricefield", "l",
    "Four hectares of sunflowers|Cuatro hectáreas de girasoles|Quatre hectares de tournesols|四ヘクタールのひまわり",
    "Every August a quarter of a million sunflowers are opened to anyone who wants to walk among them, on fields that are ordinary farmland the rest of the year. The town also holds one of the largest fusion research machines in the country.|Cada agosto un cuarto de millón de girasoles se abre a quien quiera pasear entre ellos, en campos que el resto del año son labranza corriente.|Chaque août, un quart de million de tournesols s'ouvre à qui veut s'y promener, sur des champs qui sont le reste de l'année de simples terres agricoles.|八月ごとに25万本のひまわりが開き、誰でもその中を歩ける。ほかの季節はただの畑である。町には国内でも大きな核融合の実験装置が置かれている。",
    [prop("Sunflower Field|Campo de girasoles|Champ de tournesols|ひまわり畑", 250, 52),
     prop("Fusion Laboratory|Laboratorio de fusión|Laboratoire de fusion|核融合の研究棟", 290, 60)],
  ),
  hitachi: city(
    "Hitachi|Hitachi|Hitachi|日立",
    140.65, 36.60, "hok", "tallchimney", "harbourtown", "r",
    "A repair shop that became a maker|Un taller que se hizo fabricante|Un atelier devenu constructeur|修理工場から生まれた製作所",
    "In 1910 an engineer at the local copper mine built five-horsepower motors in the mine's repair shed, and the company that grew from it took the town's name. The mine's chimney was built 156 m tall — the world's highest at the time — to carry its smoke past the villages.|En 1910 un ingeniero de la mina de cobre construyó motores de cinco caballos en el taller de reparaciones, y la empresa que nació de allí tomó el nombre del pueblo.|En 1910, un ingénieur de la mine de cuivre construisit des moteurs de cinq chevaux dans l'atelier de réparation ; l'entreprise qui en naquit prit le nom de la ville.|1910年、銅山の修理工場で技師が五馬力の電動機を作った。そこから育った会社は町の名を名乗った。銅山の煙突は煙を村々の上へ逃がすため156mに建てられ、当時は世界一の高さだった。",
    [prop("Motor Workshop|Taller de motores|Atelier de moteurs|電動機の工場", 300, 62),
     prop("Mine Chimney Lookout|Mirador de la chimenea|Belvédère de la cheminée|大煙突の展望", 250, 52)],
  ),

  kitaibaraki: city(
    "Kitaibaraki|Kitaibaraki|Kitaibaraki|北茨城",
    140.75, 36.80, "hok", "rokkakudo", "seaside", "r",
    "A red pavilion on the rocks|Un pabellón rojo sobre las rocas|Un pavillon rouge sur les rochers|岩の上の朱い堂",
    "The painter and thinker Okakura Tenshin built a small red hexagonal room on the rocks at Izura in 1905 and sat there watching the waves. The 2011 tsunami carried it away entirely; it was rebuilt from old photographs and measurements four years later.|El pensador Okakura Tenshin levantó en 1905 un pequeño pabellón hexagonal rojo sobre las rocas de Izura. El tsunami de 2011 se lo llevó entero; se reconstruyó con fotos antiguas cuatro años después.|Le penseur Okakura Tenshin bâtit en 1905 un petit pavillon hexagonal rouge sur les rochers d'Izura. Le tsunami de 2011 l'emporta entièrement ; on le rebâtit d'après d'anciennes photographies.|画家であり思想家であった岡倉天心は、1905年、五浦の岩の上に朱い六角形の小さな堂を建て、そこで波を眺めた。2011年の津波は堂を丸ごと攫っていき、四年後、古い写真と実測から建て直された。",
    [prop("Hexagonal Pavilion|Pabellón hexagonal|Pavillon hexagonal|六角堂", 280, 58),
     prop("Anglerfish Quay|Muelle del rape|Quai de la lotte|あんこうの水揚げ岸", 250, 52)],
  ),
  takahagi: city(
    "Takahagi|Takahagi|Takahagi|高萩",
    140.72, 36.71, "hok", "suspbridge", "valley2", "l",
    "A footbridge over a red gorge|Un puente sobre un desfiladero rojo|Une passerelle sur des gorges rouges|紅葉の谷に架かる吊り橋",
    "A 60 m suspension bridge hangs across the Hananuki gorge, and for two weeks each November the maples below it turn so thoroughly that the water looks red. The rest of the year the bridge is quiet enough to hear the river.|Un puente colgante de 60 m cruza el desfiladero de Hananuki; dos semanas de noviembre los arces de abajo enrojecen tanto que el agua parece roja.|Une passerelle de 60 m franchit les gorges de Hananuki ; deux semaines en novembre, les érables rougissent au point que l'eau paraît rouge.|花貫渓谷には長さ60mの吊り橋が架かる。11月の二週間、下の楓が染まりきって、水まで赤く見える。ほかの季節は川音が聞こえるほど静かである。",
    [prop("Gorge Footbridge|Puente del desfiladero|Passerelle des gorges|渓谷の吊り橋", 260, 54),
     prop("Maple Teahouse|Casa de té de los arces|Maison de thé aux érables|紅葉の茶屋", 230, 48)],
  ),
  hitachiota: city(
    "Hitachiōta|Hitachiōta|Hitachiōta|常陸太田",
    140.53, 36.54, "hok", "hermitage", "villagehouse", "l",
    "Where a lord retired to write a history|Donde un señor se retiró a escribir historia|Où un seigneur se retira pour écrire l'histoire|藩主が史書のために退いた庵",
    "Tokugawa Mitsukuni gave up the domain in 1690 and moved to a thatched cottage here to oversee a history of Japan that took 250 years to finish. He kept the house deliberately plain, with rooms no lord would have accepted.|Tokugawa Mitsukuni dejó el feudo en 1690 y se mudó a una casa de paja para dirigir una historia de Japón que tardó 250 años en acabarse.|Tokugawa Mitsukuni quitta le fief en 1690 pour une chaumière d'où il dirigea une histoire du Japon qui mit 250 ans à s'achever.|徳川光圀は1690年に藩主の座を退き、この地の茅葺きの庵に移って、完成までに250年かかる日本の史書の編纂を指揮した。庵はわざと質素に造られ、大名なら住まぬような部屋ばかりであった。",
    [prop("Thatched Retreat|Retiro de paja|Retraite de chaume|西山荘", 270, 56),
     prop("Buckwheat Mill|Molino de trigo sarraceno|Moulin à sarrasin|そばの水車", 230, 48)],
  ),
  hitachiomiya: city(
    "Hitachiōmiya|Hitachiōmiya|Hitachiōmiya|常陸大宮",
    140.41, 36.55, "hok", "stagecurtain", "villagehouse", "r",
    "A theatre the village builds and takes down|Un teatro que el pueblo monta y desmonta|Un théâtre que le village monte et démonte|村が建てては壊す芝居小屋",
    "Every few years the villagers of Nishishioko raise a revolving kabuki stage from stored timber, bamboo and rope, perform on it, and take it apart again. The technique is two centuries old and the frame uses no nails.|Cada pocos años los vecinos de Nishishioko levantan un escenario giratorio de kabuki con madera, bambú y cuerda guardados, actúan y lo desmontan. La armazón no lleva un solo clavo.|Tous les quelques ans, les villageois de Nishishioko dressent une scène tournante de kabuki en bois, bambou et corde remisés, y jouent, puis la démontent. La charpente ne compte aucun clou.|西塩子の村人は数年に一度、仕舞ってある材木と竹と縄で回り舞台を組み上げ、芝居を打ち、また解体する。二百年前からの手順で、骨組みに釘は一本も使わない。",
    [prop("Revolving Stage|Escenario giratorio|Scène tournante|回り舞台", 260, 54),
     prop("Riverside Camp|Campamento del río|Camp au bord de l'eau|川原のキャンプ場", 220, 46)],
  ),
  daigo: city(
    "Daigo|Daigo|Daigo|大子",
    140.35, 36.77, "hok", "icefall", "valley2", "l",
    "A waterfall that freezes solid|Una cascada que se hiela entera|Une cascade qui gèle en entier|凍りつく滝",
    "Fukuroda falls drops 120 m over four ledges, and in the coldest winters the whole sheet freezes white and climbers go up it. A monk who saw it in the 13th century said you had to visit in all four seasons to have seen it at all.|Las cataratas de Fukuroda caen 120 m en cuatro repisas; en los inviernos más fríos toda la lámina se congela y los escaladores suben por ella.|Les chutes de Fukuroda tombent de 120 m en quatre paliers ; les hivers les plus froids, toute la nappe gèle et des grimpeurs l'escaladent.|袋田の滝は四段にわたって120m落ちる。厳しい冬にはその面が白く凍りつき、登攀する者が現れる。13世紀にこれを見た僧は、四季それぞれに訪れねば見たことにならぬと言った。",
    [prop("Frozen Falls Path|Sendero de la cascada|Sentier des chutes|滝の観瀑台", 290, 60),
     prop("Apple Orchard|Manzanar|Verger de pommiers|奥久慈のりんご園", 240, 50)],
  ),

  // ---------------------------------------------------------------------
  // rok — 鹿行
  // ---------------------------------------------------------------------
  kashima: city(
    "Kashima|Kashima|Kashima|鹿嶋",
    140.64, 35.97, "rok", "keystone", "shrineforest", "r",
    "A stone that pins down the earth|Una piedra que sujeta la tierra|Une pierre qui cloue la terre|大地を押さえる石",
    "The shrine's kaname-ishi is a small stone said to pin the head of the catfish whose thrashing causes earthquakes. A lord had it dug at for seven days and nights in 1664 and never reached the bottom of it.|La kaname-ishi del santuario es una piedra que, según se dice, sujeta la cabeza del siluro cuyos coletazos causan terremotos. Un señor la hizo excavar siete días y noches en 1664 sin hallar su fondo.|La kaname-ishi du sanctuaire est une pierre qui cloue, dit-on, la tête du silure dont les soubresauts causent les séismes. Un seigneur la fit creuser sept jours et sept nuits en 1664 sans en trouver le fond.|鹿島神宮の要石は、地震を起こす鯰の頭を押さえていると伝わる小さな石である。1664年、藩主が七日七晩掘らせたが、底には届かなかった。",
    [prop("Shrine Cedar Avenue|Avenida de cedros|Allée de cèdres|神宮の杉並木", 300, 62),
     prop("Stadium Gate|Puerta del estadio|Porte du stade|サッカー場の門", 280, 58)],
  ),
  itako: city(
    "Itako|Itako|Itako|潮来",
    140.58, 35.925, "rok", "brideboat", "wetland", "r",
    "A bride who arrives by boat|Una novia que llega en barca|Une mariée qui arrive en barque|舟で嫁ぐ町",
    "Where the waterways were the roads, brides were rowed to their new houses, and the town still stages the crossing on summer weekends. A million irises open along the canals in June, in a place that used to be a port for boats waiting out the tide.|Donde los canales eran los caminos, las novias iban en barca a su nueva casa, y el pueblo aún escenifica el cruce. Un millón de lirios se abren junto a los canales en junio.|Là où les canaux tenaient lieu de routes, les mariées gagnaient leur nouvelle maison en barque, et la ville rejoue encore la traversée. Un million d'iris s'ouvrent le long des canaux en juin.|水路が道であった土地では、花嫁は舟で嫁ぎ先へ渡った。町はいまも夏の週末にその渡りを再現する。6月には水路沿いに百万本のあやめが開く。かつては潮を待つ舟の泊まる港であった。",
    [prop("Bridal Boat Landing|Embarcadero nupcial|Embarcadère nuptial|嫁入り舟の船着場", 270, 56),
     prop("Iris Garden|Jardín de lirios|Jardin d'iris|あやめ園", 250, 52)],
  ),
  kamisu: city(
    "Kamisu|Kamisu|Kamisu|神栖",
    140.66, 35.89, "rok", "pepperwind", "seaside", "r",
    "Peppers under a row of turbines|Pimientos bajo una fila de turbinas|Poivrons sous une rangée d'éoliennes|風車の下の胡椒畑",
    "More green peppers are grown here than anywhere else in Japan, on sandy soil that suits little else. Along the same shore stands a line of offshore wind turbines, so the fields are worked with blades turning on the horizon.|Aquí se cultivan más pimientos verdes que en ninguna otra parte de Japón, en un suelo arenoso poco apto para otra cosa. En la misma costa se alinean turbinas eólicas marinas.|On y cultive plus de poivrons verts que partout ailleurs au Japon, sur un sol sableux qui ne convient guère à autre chose. Le long du rivage s'aligne une rangée d'éoliennes en mer.|ピーマンの生産量が日本一で、ほかの作物には向かない砂地がこれに合う。同じ浜には洋上の風車が並び、地平で羽根が回るのを見ながら畑仕事をする。",
    [prop("Pepper Greenhouse|Invernadero de pimientos|Serre à poivrons|ピーマンの温室", 260, 54),
     prop("Wind Turbine Row|Fila de turbinas|Rangée d'éoliennes|洋上の風車列", 290, 60)],
  ),
  namegata: city(
    "Namegata|Namegata|Namegata|行方",
    // 麻生(市役所)は北浦と霞ヶ浦に挟まれた細い所で、どちらへ線を引いても湖を渡る。
    // 台地が広くなる玉造側に置く。
    140.45, 36.06, "rok", "sweetpotato", "ricefield", "l",
    "A ridge between two lakes|Una loma entre dos lagos|Une crête entre deux lacs|二つの湖に挟まれた台地",
    "The town sits on the strip of high ground between Kasumigaura and Kitaura, where the sandy soil turns out sweet potatoes by the tonne. Fishermen on the lake still raise square sails to be pushed sideways, dragging their nets by wind alone.|El pueblo ocupa la franja alta entre Kasumigaura y Kitaura, cuyo suelo arenoso da boniatos por toneladas. En el lago aún se izan velas cuadradas para arrastrar las redes solo con el viento.|La ville occupe la bande haute entre Kasumigaura et Kitaura, dont le sol sableux donne des patates douces à la tonne. Sur le lac, on hisse encore des voiles carrées pour traîner les filets au seul vent.|町は霞ヶ浦と北浦に挟まれた台地の上にあり、砂質の土がさつまいもをトン単位で産する。湖では今も四角い帆を張り、風だけで横に押されながら網を曳く漁が行われる。",
    [prop("Sweet Potato Cellar|Bodega de boniatos|Cave à patates douces|さつまいもの貯蔵庫", 250, 52),
     prop("Sail Fishing Boat|Barca de vela|Barque à voile|帆引き船", 270, 56)],
  ),
  hokota: city(
    "Hokota|Hokota|Hokota|鉾田",
    140.52, 36.16, "rok", "melon", "ricefield", "r",
    "The melon capital|La capital del melón|La capitale du melon|メロンの町",
    "No town in Japan grows more melons, and the harvest runs from spring right through autumn because several varieties are staggered. The same sandy coastal plain also makes it the country's largest producer of Chinese cabbage in summer.|Ningún pueblo de Japón cultiva más melones, y la cosecha va de la primavera al otoño porque se escalonan varias variedades.|Aucune ville du Japon ne produit plus de melons, et la récolte court du printemps à l'automne grâce à des variétés échelonnées.|メロンの産出量が日本一で、品種をずらしてあるため収穫は春から秋まで続く。同じ砂質の海岸平野は、夏の白菜の産地としても国内最大である。",
    [prop("Melon Greenhouse|Invernadero de melones|Serre à melons|メロンの温室", 280, 58),
     prop("Roadside Market|Mercado de carretera|Marché de bord de route|道の駅", 240, 50)],
  ),

  // ---------------------------------------------------------------------
  // nan — 県南
  // ---------------------------------------------------------------------
  tsukuba: city(
    "Tsukuba|Tsukuba|Tsukuba|つくば",
    140.11, 36.08, "nan", "rocket", "citygreen", "r",
    "A city built for science|Una ciudad hecha para la ciencia|Une ville bâtie pour la science|科学のために造られた街",
    "The government moved dozens of national laboratories out of Tokyo to this planned city in the 1970s. Japan's astronauts train here, and the rockets are controlled from the same campus.|El gobierno trasladó decenas de laboratorios nacionales desde Tokio a esta ciudad planificada en los años 70. Aquí entrenan los astronautas japoneses y se controlan los cohetes.|L'État a déplacé des dizaines de laboratoires nationaux de Tokyo vers cette ville planifiée dans les années 1970. Les astronautes japonais s'y entraînent et les fusées y sont pilotées.|1970年代、政府は数十の国立研究機関を東京からこの計画都市へ移した。日本の宇宙飛行士はここで訓練し、ロケットの管制も同じ敷地から行われる。",
    [prop("Space Centre|Centro espacial|Centre spatial|宇宙センター", 340, 70),
     prop("Mountain Cable Car|Funicular del monte|Funiculaire du mont|筑波山のケーブルカー", 240, 50)],
  ),
  tsuchiura: city(
    "Tsuchiura|Tsuchiura|Tsuchiura|土浦",
    140.17, 36.09, "nan", "fireworks", "lakeport", "l",
    "Fireworks judged like a competition|Fuegos juzgados como un certamen|Des feux jugés comme un concours|競技として裁かれる花火",
    "Since 1925 the country's firework makers have come here each autumn to be scored by judges, and winning the prize can decide a workshop's year. The lake shallows around the town also grow more lotus root than anywhere in Japan.|Desde 1925 los pirotécnicos del país vienen cada otoño a ser puntuados por jueces, y ganar puede decidir el año de un taller. Los bajíos del lago dan más raíz de loto que ningún otro lugar de Japón.|Depuis 1925, les artificiers du pays viennent chaque automne être notés par un jury, et le prix peut décider de l'année d'un atelier. Les hauts-fonds du lac donnent plus de racine de lotus que partout au Japon.|1925年以来、全国の花火師が秋ごとにここへ集まり、審査員に点を付けられる。優勝はひとつの工房の一年を左右する。町を囲む湖の浅瀬は、れんこんの産出が日本一である。",
    [prop("Firework Workshop|Taller pirotécnico|Atelier d'artifices|花火の工房", 300, 62),
     prop("Lotus Root Field|Campo de loto|Champ de lotus|れんこん田", 250, 52)],
  ),
  ishioka: city(
    "Ishioka|Ishioka|Ishioka|石岡",
    140.29, 36.19, "nan", "lionhead", "castletown", "r",
    "The old provincial capital|La antigua capital provincial|L'ancienne capitale provinciale|常陸国の国府",
    "For centuries this was the seat of government for the whole province, and the grid of its ancient offices can still be traced in the streets. Its autumn festival parades a lion's head so large it takes a wheeled float and dozens of hands to move.|Durante siglos fue la sede del gobierno de toda la provincia, y la retícula de sus oficinas antiguas aún se rastrea en las calles. En otoño desfila una cabeza de león tan grande que necesita una carroza con ruedas.|Des siècles durant, ce fut le siège du gouvernement de toute la province, et le tracé de ses anciens bureaux se lit encore dans les rues. En automne défile une tête de lion si grande qu'il faut un char à roues.|何世紀ものあいだ常陸国の政庁が置かれ、古い官衙の区割りはいまも街路に残る。秋の祭りでは、車の付いた山車と何十人もの手を要するほど大きな獅子頭が練り歩く。",
    [prop("Provincial Office Site|Sitio del gobierno|Site du gouvernement|国府の跡", 260, 54),
     prop("Great Lion Head|Gran cabeza de león|Grande tête de lion|大獅子", 270, 56)],
  ),
  kasumigaura: city(
    "Kasumigaura|Kasumigaura|Kasumigaura|かすみがうら",
    // 高浜入り(霞ヶ浦の北の腕)の東に置くと、土浦への線が腕を横切る。
    // 市域の西半分(千代田側)に置く。
    140.25, 36.13, "nan", "hobikisen", "lakeport", "r",
    "Nets pulled by the wind alone|Redes tiradas solo por el viento|Des filets tirés par le seul vent|風だけで曳く網",
    "Fishermen here invented a boat that hoists a huge square sail and is pushed sideways across the lake, dragging its net without an engine. It was retired in the 1960s and brought back for visitors, because from the shore it is the most striking thing on the water.|Los pescadores idearon una barca que iza una gran vela cuadrada y se desplaza de lado por el lago, arrastrando la red sin motor. Se retiró en los años 60 y volvió para los visitantes.|Les pêcheurs inventèrent une barque qui hisse une grande voile carrée et dérive en travers du lac, traînant son filet sans moteur. Retirée dans les années 1960, elle revint pour les visiteurs.|ここの漁師は、大きな四角い帆を張って湖を横に押されながら進み、機関を使わずに網を曳く舟を編み出した。1960年代に一度退いたが、岸から見て湖上でいちばん目を引くものであるため、見せるために戻された。",
    [prop("Sail Net Boat|Barca de vela y red|Barque à voile et filet|帆引き船", 280, 58),
     prop("Chestnut Grove|Castañar|Châtaigneraie|栗の林", 230, 48)],
  ),
  ushiku: city(
    "Ushiku|Ushiku|Ushiku|牛久",
    140.15, 35.98, "nan", "daibutsu", "citygreen", "l",
    "A bronze figure with a lift inside|Una figura de bronce con ascensor dentro|Une statue de bronze avec un ascenseur|中に昇降機のある青銅の像",
    "The standing bronze buddha here is 120 m tall, three times the height of the Statue of Liberty's figure, and a lift carries visitors up to windows in its chest. A short walk away is the winery that made Japan's first domestic wine from its own grapes in 1903.|El buda de bronce mide 120 m, tres veces la figura de la Estatua de la Libertad, y un ascensor sube hasta ventanas en su pecho. Cerca está la bodega que hizo el primer vino japonés de uva propia en 1903.|Le bouddha de bronze mesure 120 m, trois fois la statue de la Liberté, et un ascenseur mène à des fenêtres dans sa poitrine. Tout près, le chai qui fit en 1903 le premier vin japonais de raisin local.|立像の青銅仏は高さ120mで、自由の女神の像の三倍にあたる。昇降機で胸の窓まで上がれる。歩いてすぐの所には、1903年に自国産の葡萄で日本初の国産ワインを造った醸造所がある。",
    [prop("Chest Observation Deck|Mirador del pecho|Belvédère de la poitrine|胸の展望台", 320, 66),
     prop("Old Winery Cellar|Bodega antigua|Chai ancien|古いワイン蔵", 270, 56)],
  ),
  ryugasaki: city(
    "Ryūgasaki|Ryūgasaki|Ryūgasaki|龍ケ崎",
    140.18, 35.91, "nan", "polemai", "ricefield", "r",
    "A man who dances on a pole|Un hombre que baila en un poste|Un homme qui danse sur un mât|柱の上で舞う男",
    "Every July a masked dancer climbs a 14 m pole and performs on the disc at the top, then shoots arrows to the four directions to ask for rain and a harvest. The rite is over four hundred years old and has no safety line.|Cada julio un danzante enmascarado sube un poste de 14 m y actúa en el disco de la punta, luego dispara flechas a los cuatro puntos pidiendo lluvia y cosecha. El rito no lleva cuerda de seguridad.|Chaque juillet, un danseur masqué grimpe un mât de 14 m et se produit sur le disque du sommet, puis tire des flèches aux quatre points pour demander pluie et récolte. Le rite n'a aucune assurance.|七月ごとに、面をつけた舞い手が高さ14mの柱に登り、頂の円盤の上で舞い、四方へ矢を放って雨と実りを乞う。四百年以上続く神事で、命綱は使わない。",
    [prop("Pole Dance Ground|Explanada del poste|Terrain du mât|撞舞の広場", 260, 54),
     prop("Croquette Stand|Puesto de croquetas|Stand de croquettes|コロッケの店", 220, 46)],
  ),
  toride: city(
    "Toride|Toride|Toride|取手",
    140.05, 35.91, "nan", "ferrycross", "riverport", "l",
    "The last stop before the great river|La última parada antes del gran río|Le dernier relais avant le grand fleuve|大河の手前の宿",
    "Travellers on the road north stopped here because the Tone had to be crossed by ferry and the crossing closed whenever the water rose. The old inn town kept its shape long after the bridges were built.|Los viajeros del camino al norte paraban aquí porque el Tone se cruzaba en barca y el paso se cerraba con las crecidas. El viejo pueblo-posada conservó su forma mucho después de los puentes.|Les voyageurs de la route du nord s'y arrêtaient : le Tone se franchissait en bac, fermé dès la montée des eaux. Le vieux relais garda sa forme longtemps après les ponts.|北へ向かう街道の旅人はここで足を止めた。利根川は渡し舟で越えるほかなく、水が出れば渡しは止まったからである。橋が架かったあとも、宿場町の形は長く残った。",
    [prop("Ferry Landing|Embarcadero|Débarcadère|渡し場", 240, 50),
     prop("Post Town Inn|Posada del camino|Auberge de relais|宿場の旅籠", 250, 52)],
  ),
  ami: city(
    "Ami|Ami|Ami|阿見",
    140.21, 36.03, "nan", "trainerplane", "ricefield", "r",
    "Where boys were trained to fly|Donde se adiestraba a muchachos para volar|Où l'on formait des garçons à voler|少年が飛行機乗りに育てられた地",
    "Boys as young as fourteen were taken here to be trained as naval airmen, and of the 240,000 who passed through, most of those sent to the front did not return. A museum keeps their letters home, written in the plain hand of schoolchildren.|Muchachos de catorce años eran traídos aquí para adiestrarse como aviadores navales; de los 240.000 que pasaron, la mayoría de los enviados al frente no volvió. Un museo guarda sus cartas a casa.|Des garçons de quatorze ans y étaient formés comme aviateurs de la marine ; sur 240 000 passés par là, la plupart des envoyés au front ne revinrent pas. Un musée garde leurs lettres.|十四歳の少年たちがここへ集められ、海軍の飛行機乗りとして育てられた。24万人が通り、前線へ送られた者の多くは帰らなかった。記念館には、学童の字で書かれた家への手紙が残る。",
    [prop("Airmen's Museum|Museo de los aviadores|Musée des aviateurs|予科練の記念館", 260, 54),
     prop("Lakeside Airfield|Aeródromo junto al lago|Terrain d'aviation|湖畔の飛行場跡", 240, 50)],
  ),
  inashiki: city(
    "Inashiki|Inashiki|Inashiki|稲敷",
    140.32, 35.96, "nan", "redshrine", "wetland", "l",
    "The shrine of impossible wishes|El santuario de los deseos imposibles|Le sanctuaire des vœux impossibles|叶わぬ願いの社",
    "The Ōsugi shrine here is asked for the wishes no one else will take on, and its main hall is painted a red so deep that boatmen on the marshes used it to steer by. The wetlands around it were drained into rice fields only in the last century.|Al santuario Ōsugi se le piden los deseos que nadie más acepta, y su nave está pintada de un rojo tan intenso que los barqueros de la marisma se guiaban por él.|On demande au sanctuaire Ōsugi les vœux dont nul ne veut, et sa nef est peinte d'un rouge si profond que les bateliers des marais s'y repéraient.|大杉神社は、ほかで受けてもらえぬ願いを聞くとされる。社殿の朱は深く、沼を行く舟人はこれを目印に舵をとった。周りの湿地が田に変わったのは前世紀のことである。",
    [prop("Vermilion Hall|Nave bermellón|Nef vermillon|朱の社殿", 270, 56),
     prop("Marsh Rice Field|Arrozal de la marisma|Rizière des marais|沼の田", 230, 48)],
  ),
  tsukubamirai: city(
    "Tsukubamirai|Tsukubamirai|Tsukubamirai|つくばみらい",
    140.04, 35.96, "nan", "templegate", "ricefield", "r",
    "A gate carved without a plan|Una puerta tallada sin plano|Une porte sculptée sans plan|図面のない山門",
    "The Fudō temple's gate was raised in the 17th century by carpenters working from memory and habit rather than drawings, and it has stood through the river's worst floods. Farmers still bring children here to be blessed against illness.|La puerta del templo Fudō se alzó en el siglo XVII por carpinteros que trabajaban de memoria, sin planos, y ha resistido las peores crecidas del río.|La porte du temple Fudō fut dressée au XVIIe siècle par des charpentiers travaillant de mémoire, sans plans, et a tenu aux pires crues du fleuve.|板橋不動尊の山門は17世紀、図面ではなく記憶と手癖で仕事をする大工たちの手で建てられ、川の最も酷い出水にも耐えてきた。農家はいまも子を連れ、病から守るよう祈りに来る。",
    [prop("Temple Gate|Puerta del templo|Porte du temple|不動尊の山門", 250, 52),
     prop("Riverside Paddy|Arrozal ribereño|Rizière du bord de l'eau|小貝川の田", 220, 46)],
  ),

  // ---------------------------------------------------------------------
  // sei — 県西
  // ---------------------------------------------------------------------
  koga: city(
    "Koga|Koga|Koga|古河",
    139.75, 36.18, "sei", "peach", "castletown", "l",
    "A rival court on the river|Una corte rival junto al río|Une cour rivale au bord du fleuve|川べりのもうひとつの幕府",
    "For over a century a branch of the shogun's family ruled eastern Japan from here in open opposition to Kyoto, and the town was effectively a second capital. Two thousand peach trees planted on the old riverbank flower every March.|Durante más de un siglo una rama de la familia del shogun gobernó el este de Japón desde aquí, en abierta oposición a Kioto. Dos mil melocotoneros florecen cada marzo en la antigua ribera.|Plus d'un siècle durant, une branche de la famille shogunale gouverna l'est du Japon d'ici, en opposition ouverte à Kyoto. Deux mille pêchers fleurissent chaque mars sur l'ancienne berge.|一世紀以上にわたり、将軍家の一族がここから東国を治め、京都に公然と対抗した。町は事実上のもうひとつの都であった。古い河川敷に植えられた二千本の桃が三月ごとに咲く。",
    [prop("Peach Embankment|Ribera de melocotoneros|Berge des pêchers|桃のまつり", 260, 54),
     prop("Old Court Residence|Residencia de la corte|Résidence de la cour|古河公方の館", 280, 58)],
  ),
  yuki: city(
    "Yūki|Yūki|Yūki|結城",
    139.88, 36.31, "sei", "tsumugi", "villagehouse", "r",
    "Cloth made without a single twist|Tela hecha sin una sola torsión|Un tissu fait sans une seule torsion|撚りをかけずに織る布",
    "The silk thread here is drawn from the cocoon by hand and never twisted, which is why the cloth is warm and takes decades to soften into its best state. Three of the steps are listed by UNESCO, and a single bolt can take a year.|El hilo de seda se saca del capullo a mano y nunca se retuerce; por eso la tela abriga y tarda décadas en alcanzar su mejor estado. Tres de sus pasos figuran en la UNESCO.|Le fil de soie est tiré du cocon à la main et jamais tordu ; d'où une étoffe chaude qui met des décennies à s'assouplir. Trois des étapes sont inscrites à l'UNESCO.|絹糸は繭から手で引き出し、撚りを一切かけない。だから布は暖かく、いちばん良い状態になるまでに何十年もかかる。工程のうち三つがユネスコに載り、一反に一年かかることもある。",
    [prop("Hand-Drawn Silk Shed|Taller de seda|Atelier de soie|真綿かけの小屋", 280, 58),
     prop("Backstrap Loom|Telar de cintura|Métier à sangle|地機の織屋", 260, 54)],
  ),
  chikusei: city(
    "Chikusei|Chikusei|Chikusei|筑西",
    139.98, 36.30, "sei", "steamloco", "castletown", "l",
    "A steam train that still runs on Sundays|Un tren de vapor que aún corre los domingos|Un train à vapeur qui roule encore le dimanche|日曜に走る蒸気機関車",
    "A private line out of the old town of Shimodate keeps steam locomotives in service for weekend trains, running past rice fields with the windows open. The town was a river port for cotton and grain before the railways took the trade.|Una línea privada del viejo Shimodate mantiene locomotoras de vapor para los trenes del fin de semana, que pasan junto a los arrozales con las ventanas abiertas.|Une ligne privée du vieux Shimodate garde des locomotives à vapeur pour les trains du week-end, qui longent les rizières fenêtres ouvertes.|下館の町から出る私鉄は、週末の列車に蒸気機関車を使い続けている。窓を開けたまま田のあいだを走る。鉄道が商いを奪う前は、木綿と穀物の河岸であった。",
    [prop("Locomotive Shed|Cochera de locomotoras|Remise à locomotives|機関庫", 280, 58),
     prop("River Port Warehouse|Almacén del puerto fluvial|Entrepôt du port fluvial|河岸の蔵", 240, 50)],
  ),
  sakuragawa: city(
    "Sakuragawa|Sakuragawa|Sakuragawa|桜川",
    140.09, 36.33, "sei", "hinadolls", "villagehouse", "r",
    "A town that opens its houses in February|Un pueblo que abre sus casas en febrero|Une ville qui ouvre ses maisons en février|二月に家を開ける町",
    "For four weeks each winter the merchants of Makabe put their family dolls in the front rooms and leave the doors open to anyone passing. The same district has quarried a pale granite for a thousand years, and its lanterns stand in shrines all over the country.|Cuatro semanas cada invierno los comerciantes de Makabe ponen sus muñecas familiares en las salas delanteras y dejan las puertas abiertas a cualquiera.|Quatre semaines chaque hiver, les marchands de Makabe exposent leurs poupées de famille et laissent les portes ouvertes aux passants.|冬の四週間、真壁の商家は代々の雛人形を表座敷に飾り、通りがかりの誰にでも戸を開けておく。同じ地区は千年にわたって白い花崗岩を切り出し、その灯籠は全国の社に立っている。",
    [prop("Doll Display Room|Sala de las muñecas|Salle aux poupées|雛の座敷", 250, 52),
     prop("Granite Quarry|Cantera de granito|Carrière de granit|真壁石の丁場", 270, 56)],
  ),
  shimotsuma: city(
    "Shimotsuma|Shimotsuma|Shimotsuma|下妻",
    139.97, 36.18, "sei", "mirrorpond", "ricefield", "l",
    "A pond dug to water the rice|Un estanque cavado para regar el arroz|Un étang creusé pour irriguer le riz|田に水を引くために掘った沼",
    "Sanuma was dug as a reservoir four centuries ago and is now walked round for the view of Mt Tsukuba doubled in its surface. The plain around it grows pears, and the fruit stalls open on the roadside from August.|Sanuma se excavó como embalse hace cuatro siglos y hoy se rodea a pie por la vista del monte Tsukuba duplicada en el agua.|Sanuma fut creusé comme réservoir il y a quatre siècles ; on en fait aujourd'hui le tour pour voir le mont Tsukuba doublé dans l'eau.|砂沼は四百年前に灌漑のため掘られた。いまは、水面に筑波山が二つに映るのを見ながら一周する道になっている。周りの平野は梨を産し、八月から道端に果物の店が並ぶ。",
    [prop("Reservoir Walk|Paseo del embalse|Promenade du réservoir|砂沼の周遊路", 240, 50),
     prop("Pear Orchard|Peral|Verger de poiriers|梨園", 250, 52)],
  ),
  joso: city(
    "Jōsō|Jōsō|Jōsō|常総",
    139.99, 36.02, "sei", "keep", "riverport", "r",
    "A keep built where none had stood|Un torreón donde nunca hubo uno|Un donjon là où il n'y en eut jamais|城のなかった所に建てた天守",
    "The town put up a castle keep in 1992 as a museum, on a site where the medieval lord's fort had no tower at all. It looks out over the Kinu river, which broke its banks in 2015 and flooded a third of the town.|El pueblo levantó en 1992 un torreón como museo, en un sitio donde la fortaleza medieval no tuvo torre alguna. Domina el río Kinu, que se desbordó en 2015 e inundó un tercio del término.|La ville éleva en 1992 un donjon-musée là où la forteresse médiévale n'avait aucune tour. Il domine la Kinu, qui rompit ses digues en 2015 et noya un tiers de la commune.|町は1992年、資料館として天守を建てた。中世の領主の砦には櫓ひとつ無かった場所である。天守は鬼怒川を見下ろす。その川は2015年に堤を破り、町の三分の一を水に沈めた。",
    [prop("Museum Keep|Torreón museo|Donjon-musée|豊田城の資料館", 260, 54),
     prop("Levee Path|Camino del dique|Chemin de la digue|堤防の道", 220, 46)],
  ),
  bando: city(
    "Bandō|Bandō|Bandō|坂東",
    139.89, 36.05, "sei", "kabuto", "ricefield", "l",
    "The man who called himself emperor|El hombre que se llamó emperador|L'homme qui se proclama empereur|新皇を名乗った男",
    "Taira no Masakado seized eight provinces from here in 939 and declared himself the new emperor; he was killed two months later. A thousand years on, people still avoid moving the stone said to mark where his head came to rest.|Taira no Masakado tomó ocho provincias desde aquí en 939 y se declaró nuevo emperador; lo mataron dos meses después.|Taira no Masakado s'empara de huit provinces d'ici en 939 et se proclama nouvel empereur ; il fut tué deux mois plus tard.|平将門は939年、この地から八か国を奪って新皇を名乗り、二か月後に討たれた。千年を経たいまも、首が落ちたと伝わる場所の石は動かされずにいる。",
    [prop("Warrior's Shrine|Santuario del guerrero|Sanctuaire du guerrier|将門の社", 260, 54),
     prop("Pear Stall|Puesto de peras|Étal de poires|梨の直売所", 220, 46)],
  ),
  sakai: city(
    "Sakai|Sakai|Sakai|境",
    139.79, 36.11, "sei", "cargoboat", "riverport", "r",
    "Where the river traffic turned around|Donde el tráfico fluvial daba la vuelta|Où le trafic fluvial faisait demi-tour|川の荷が折り返した河岸",
    "Boats from Edo came up the Tone this far and no further, so everything bound for the north was unloaded here and put on horses. The warehouses along the bank outlived the trade by a century.|Las barcas de Edo remontaban el Tone hasta aquí y no más, así que todo lo destinado al norte se descargaba y pasaba a caballos.|Les barques d'Edo remontaient le Tone jusqu'ici, pas plus loin ; tout ce qui allait vers le nord y était déchargé et chargé sur des chevaux.|江戸から利根川を遡る舟はここまでで、これより先へは行けなかった。北へ向かう荷はすべてここで陸揚げされ、馬に積み替えられた。岸の蔵は、その商いが絶えたあと一世紀のあいだ残った。",
    [prop("River Warehouse|Almacén del río|Entrepôt du fleuve|河岸の蔵", 240, 50),
     prop("Horse Stables|Cuadras|Écuries|継立の厩", 220, 46)],
  ),
};

/**
 * 路線。常磐線・水戸線・水郡線・鹿島線など県内の鉄道をなぞる。
 * 第3要素 `"sea"` は航路(いまは無し)。
 */
export const IBARAKI_EDGES = [
  // 県央
  ["mito", "kasama"],
  ["mito", "oarai"],
  ["mito", "hitachi"],
  // 県北(常磐線と水郡線)
  ["hitachi", "takahagi"],
  ["takahagi", "kitaibaraki"],
  ["hitachi", "hitachiota"],
  ["hitachiota", "daigo"],
  ["hitachiota", "hitachiomiya"],
  ["hitachiomiya", "mito"],
  ["daigo", "hitachiomiya"],
  // 鹿行(鹿島線と大洗鹿島線)
  ["oarai", "hokota"],
  ["hokota", "kashima"],
  ["kashima", "itako"],
  ["kashima", "kamisu"],
  ["namegata", "hokota"],
  // 県南(常磐線・関東鉄道・つくばエクスプレス)
  ["kasama", "ishioka"],
  ["ishioka", "kasumigaura"],
  ["kasumigaura", "tsuchiura"],
  // ↓ 土浦—つくばと並びを入れ替えてある(偶奇で折れ方が変わる)。
  //    この順でないと、土浦—阿見が霞ヶ浦の南端を29px横切る。
  ["tsuchiura", "ami"],
  ["tsuchiura", "tsukuba"],
  ["ami", "ushiku"],
  ["ushiku", "ryugasaki"],
  ["ryugasaki", "toride"],
  ["toride", "tsukubamirai"],
  ["tsukubamirai", "tsukuba"],
  // ↓ 稲敷—潮来と並びを入れ替えてある。この順でないと
  //    稲敷—潮来が北浦の南端を15px横切る。
  ["inashiki", "itako"],
  ["ryugasaki", "inashiki"],
  ["ishioka", "namegata"],
  ["ishioka", "mito"],
  ["ishioka", "omitama"],
  ["omitama", "mito"],
  // 県央・県北の海沿い(常磐線とひたちなか海浜鉄道)
  ["mito", "hitachinaka"],
  ["hitachinaka", "oarai"],
  ["hitachinaka", "tokai"],
  ["tokai", "hitachi"],
  ["mito", "naka"],
  ["naka", "hitachiota"],
  // 県西(水戸線・関東鉄道常総線)
  ["kasama", "sakuragawa"],
  ["sakuragawa", "chikusei"],
  ["chikusei", "yuki"],
  ["yuki", "koga"],
  ["chikusei", "shimotsuma"],
  ["shimotsuma", "joso"],
  ["joso", "bando"],
  ["bando", "sakai"],
  ["sakai", "koga"],
  ["joso", "tsukubamirai"],
  ["shimotsuma", "tsukuba"],
];
