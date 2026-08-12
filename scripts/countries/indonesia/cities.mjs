/**
 * インドネシアの都市と路線。
 *
 * 地方は6分割(スマトラ/ジャワ/小スンダ列島(バリ含む)/カリマンタン/スラウェシ/
 * マルク・パプア)。ジャワ島に偏らないよう、43都市のうちジャワは10都市に
 * とどめてある(スマトラ8・小スンダ列島8・カリマンタン5・スラウェシ6・
 * マルク&パプア6)。
 *
 * 経度・緯度は実際の値。投影は geography.mjs の INDONESIA_PROJ を参照。
 * フェリー港の座標の多くは geography.mjs の海岸線コメントに実測値が
 * すでに書かれているものをそのまま使っている(メラック105.99,-5.93/
 * バカウヘニ105.75,-5.87/バニュワンギ114.37,-8.22/エンデ121.66,-8.84/
 * バリクパパン116.85,-1.24/バンジャルマシン114.59,-3.32/マカッサル
 * 119.43,-5.15/マナド124.84,1.47/ジャヤプラ140.72,-2.53)。
 *
 * ## 路線
 *
 * ジャワ島内(ジャカルタ―バンドン―ジョグジャカルタ―スラバヤなど)と
 * スマトラの一部(メダン近郊・パダン―サワルントのオンビリン炭鉱鉄道・
 * パレンバンLRT)は実在の鉄道網。カリマンタン・スラウェシ内陸・
 * パプアは鉄道が実質無いため、実在する幹線道路をなぞった陸路として描く。
 * 島をまたぐものは航路(第3要素 "sea")。実在のフェリー(メラック⇄
 * バカウヘニ、ギリマヌク⇄クタパン=バニュワンギ)を軸に、Pelni(国営長距離
 * フェリー)の実在航路も使う。
 *
 * **ワメナだけは例外。** バリエム渓谷は現実には空路でしか到達できず、
 * 陸路も航路も実在しない(周囲は山岳地帯で道路が通じていない)。
 * 盤面をワメナだけ孤立させると遊べなくなるため、ジャヤプラ―ワメナは
 * 便宜上「陸路」として描いている。**これは簡略化であり、実際は空路のみ。**
 * この点は REGISTER.md の「迷った点」に記録している。
 *
 * ## `mark`(34種)と `bg`(30種)
 *
 * ### `mark`(24×24、都市ごとの小さな絵)
 *
 * | キー | 描くもの | 受け持つ町 |
 * |---|---|---|
 * | `mosque`        | ドームとミナレット | バンダアチェ・マタラム |
 * | `colonial`       | オランダ統治時代の建物 | メダン・スマラン |
 * | `lake`           | カルデラ湖と船 | トバ湖畔(パラパット) |
 * | `clocktower`     | 時計塔 | ブキッティンギ |
 * | `port`           | 起重機と船 | パダン・アンボン・ジャヤプラ |
 * | `mine`           | 坑口とトロッコ | サワルント |
 * | `bridge`         | 鉄橋 | パレンバン |
 * | `ferry`          | フェリー船 | バカウヘニ・メラック・ギリマヌク |
 * | `monas`          | 炎を戴く塔(モナス) | ジャカルタ |
 * | `artdeco`        | アール・デコの建物正面 | バンドン |
 * | `palace`         | 宮殿の屋根(プンドポ) | ジョグジャカルタ |
 * | `temple`         | 仏塔(ストゥーパ) | ボロブドゥール |
 * | `batik`          | 蝋描きの文様 | ソロ |
 * | `monument`       | 記念塔 | スラバヤ |
 * | `volcano`        | 噴煙を上げる火山 | ブロモ山 |
 * | `bluefire`       | 青い炎の火口 | バニュワンギ(イジェン山) |
 * | `baligate`       | 割れ門(チャンディ・ブンタル) | デンパサール |
 * | `riceterrace`    | 棚田 | ウブド |
 * | `dragon`         | コモドドラゴン | ラブアンバジョ |
 * | `crater`         | 三色の火口湖 | エンデ(クリムトゥ) |
 * | `ikat`           | イカット織の文様と馬 | ワインガプ |
 * | `reef`           | サンゴ礁と魚 | クパン・ブナケン・ワカトビ・ワイサイ |
 * | `equator`        | 赤道記念塔 | ポンティアナック |
 * | `oilrig`         | 沖合の掘削基地 | バリクパパン |
 * | `floatingmarket` | 水上マーケットの舟 | バンジャルマシン |
 * | `riverboat`      | 川船 | サマリンダ |
 * | `orangutan`      | オランウータン | パランカラヤ |
 * | `market`         | 市場の屋台 | マナド |
 * | `stilthouse`     | 高床の水上家屋 | ゴロンタロ |
 * | `phinisi`         | ピニシ帆船 | マカッサル |
 * | `tongkonan`      | 舟形屋根の家(トンコナン) | タナトラジャ |
 * | `clove`          | 丁子(クローブ)の実 | テルナテ |
 * | `birdparadise`   | 極楽鳥 | ソロン |
 * | `highland`       | 山あいの茅葺き家屋 | ワメナ |
 *
 * ### `bg`(400×210、都市カードの背景。30種、使い回し前提)
 *
 * | キー | 受け持つ町 |
 * |---|---|
 * | `mosque` | バンダアチェ・マタラム |
 * | `colonial` | メダン・スマラン |
 * | `port` | パダン・アンボン・ジャヤプラ・スラバヤ |
 * | `ferry` | バカウヘニ・メラック・ギリマヌク |
 * | `reef` | クパン・ブナケン・ワカトビ・ワイサイ |
 * | `volcano` | ブロモ山・テルナテ |
 * | `highland` | ブキッティンギ・ワメナ |
 * | `river` | パレンバン・サマリンダ |
 * | `lake` | トバ湖畔(パラパット) |
 * | `mine` | サワルント |
 * | `capital` | ジャカルタ |
 * | `hillcity` | バンドン |
 * | `palace` | ジョグジャカルタ |
 * | `temple` | ボロブドゥール |
 * | `batik` | ソロ |
 * | `bluefire` | バニュワンギ |
 * | `baligate` | デンパサール |
 * | `riceterrace` | ウブド |
 * | `dragon` | ラブアンバジョ |
 * | `crater` | エンデ |
 * | `ikat` | ワインガプ |
 * | `equator` | ポンティアナック |
 * | `oilrig` | バリクパパン |
 * | `floatingmarket` | バンジャルマシン |
 * | `orangutan` | パランカラヤ |
 * | `market` | マナド |
 * | `stilthouse` | ゴロンタロ |
 * | `phinisi` | マカッサル |
 * | `tongkonan` | タナトラジャ |
 * | `birdparadise` | ソロン |
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const INDONESIA_CITIES = {
  // ---------------------------------------------------------------------
  // sum — スマトラ
  // ---------------------------------------------------------------------
  banda_aceh: city(
    "Banda Aceh|Banda Aceh|Banda Aceh|バンダアチェ",
    95.32, 5.55, "sum", "mosque", "mosque", "r",
    "A mosque the 2004 tsunami could not take down|Una mezquita que el tsunami de 2004 no pudo derribar|Une mosquée que le tsunami de 2004 n'a pas pu abattre|2004年の津波にも倒れなかったモスク",
    "Banda Aceh's Baiturrahman Grand Mosque, its black domes rebuilt by the Dutch in 1881 after colonial troops burned the sultanate's original mosque during the Aceh War, became a symbol of survival when the 2004 tsunami killed roughly 170,000 people in the province yet left the mosque itself almost untouched. Aceh remains Indonesia's only province governed under a formal version of sharia law, granted broad autonomy after decades of separatist conflict ended in a 2005 peace agreement.|La Gran Mezquita Baiturrahman de Banda Aceh, cuyas cúpulas negras reconstruyeron los holandeses en 1881 después de que tropas coloniales quemaran la mezquita original del sultanato durante la Guerra de Aceh, se convirtió en símbolo de supervivencia cuando el tsunami de 2004 mató a unas 170.000 personas en la provincia sin apenas tocar el edificio. Aceh sigue siendo la única provincia de Indonesia gobernada bajo una versión formal de la ley sharia, con amplia autonomía concedida tras el acuerdo de paz de 2005.|La Grande Mosquée Baiturrahman de Banda Aceh, dont les dômes noirs furent reconstruits par les Hollandais en 1881 après que des troupes coloniales eurent incendié la mosquée originelle du sultanat pendant la guerre d'Aceh, devint un symbole de survie quand le tsunami de 2004 tua environ 170 000 personnes dans la province sans presque toucher l'édifice lui-même. Aceh reste la seule province d'Indonésie régie par une version formelle de la charia, dotée d'une large autonomie après l'accord de paix de 2005.|バンダアチェのバイトゥラフマン大モスクは、アチェ戦争でオランダ軍が元の王国のモスクを焼いたのち1881年に黒いドームで再建されたが、2004年の津波でこの州だけで約17万人が亡くなる中、建物自体はほとんど無傷のまま残り、生き延びた象徴となった。アチェはいまもインドネシアで唯一、正式なシャリーア(イスラム法)が施行される州であり、分離独立紛争が2005年の和平合意で終わったのち広い自治権を得ている。",
    [prop("Baiturrahman Mosque Courtyard|Patio de la Mezquita Baiturrahman|Cour de la mosquée Baiturrahman|バイトゥラフマン・モスクの中庭", 420, 88),
     prop("PLTD Apung Tsunami Ship Memorial|Memorial del barco PLTD Apung|Mémorial du navire PLTD Apung|PLTDアプン津波記念船", 260, 54)],
  ),
  medan: city(
    "Medan|Medán|Medan|メダン",
    98.6722, 3.5952, "sum", "colonial", "colonial", "r",
    "A tobacco boomtown built by a Chinese financier|Una ciudad del tabaco construida por un financiero chino|Une ville du tabac bâtie par un financier chinois|中国系実業家が築いた煙草の町",
    "Medan grew from a river-junction village into Sumatra's largest city on the strength of Deli tobacco, a wrapper-leaf variety so prized by European cigar makers that 19th-century planters imported thousands of indentured Chinese and Javanese laborers to work the estates. The Tjong A Fie Mansion downtown remembers the Hakka Chinese plantation financier who bankrolled much of the boomtown while sitting on the councils of the Dutch, Chinese, and sultanate authorities all at once.|Medan pasó de ser una aldea en un cruce fluvial a la mayor ciudad de Sumatra gracias al tabaco de Deli, una variedad de hoja de capa tan apreciada por los cigarreros europeos que los plantadores del siglo XIX importaron a miles de trabajadores chinos y javaneses bajo contrato. La Mansión Tjong A Fie, en el centro, recuerda al financiero chino hakka que costeó buena parte de la ciudad en auge mientras se sentaba a la vez en los consejos holandés, chino y del sultanato.|Medan, simple village à un croisement fluvial, devint la plus grande ville de Sumatra grâce au tabac de Deli, une feuille de cape si prisée des cigariers européens que les planteurs du XIXe siècle firent venir des milliers de travailleurs sous contrat chinois et javanais. La demeure Tjong A Fie, au centre-ville, rappelle ce financier chinois hakka qui finança une bonne part de la ville en plein essor tout en siégeant à la fois dans les conseils hollandais, chinois et du sultanat.|メダンは川の合流点の村から、デリ煙草の力でスマトラ最大の都市へと成長した。この葉巻の巻き葉用品種はヨーロッパの葉巻職人にあまりに珍重されたため、19世紀の農園主は何千人もの中国人・ジャワ人の年季労働者を輸入して農園を働かせた。中心部に残るチョン・アフィー邸は、オランダ・中国系・スルタン庁それぞれの評議会に同時に名を連ねながらこの町の発展資金の多くを支えた客家系中国人の実業家を今に伝える。",
    [prop("Tjong A Fie Mansion|Mansión Tjong A Fie|Demeure Tjong A Fie|チョン・アフィー邸", 520, 108),
     prop("Maimun Palace Throne Room|Sala del trono del Palacio Maimun|Salle du trône du palais Maimun|マイムン宮殿の玉座の間", 380, 79)],
  ),
  toba: city(
    "Lake Toba (Parapat)|Lago Toba (Parapat)|Lac Toba (Parapat)|トバ湖畔(パラパット)",
    98.95, 2.65, "sum", "lake", "lake", "l",
    "A crater lake left by the eruption that nearly ended us|Un lago de cráter dejado por la erupción que casi acaba con nosotros|Un lac de cratère laissé par l'éruption qui faillit nous anéantir|人類を絶滅寸前に追い込んだ噴火が残した湖",
    "Lake Toba fills the crater of a supervolcano that erupted about 74,000 years ago in the largest volcanic event of the past 2.5 million years, an eruption some scientists argue plunged the planet into a volcanic winter severe enough to nearly wipe out the human species. Samosir, the island rising from the lake's center, is itself larger than Singapore and remains home to the Batak Toba people, whose steep-roofed wooden houses and carved stone tombs still stand in villages along its shore.|El lago Toba llena el cráter de un supervolcán que erupcionó hace unos 74.000 años en el mayor evento volcánico de los últimos 2,5 millones de años, una erupción que, según algunos científicos, sumió al planeta en un invierno volcánico casi capaz de acabar con la especie humana. Samosir, la isla que se alza en el centro del lago, es mayor que Singapur y sigue siendo hogar del pueblo batak toba, cuyas casas de madera de tejado empinado y tumbas de piedra talladas aún se alzan en aldeas junto a la orilla.|Le lac Toba remplit le cratère d'un supervolcan entré en éruption il y a environ 74 000 ans, le plus grand événement volcanique des 2,5 derniers millions d'années, une éruption qui, selon certains scientifiques, plongea la planète dans un hiver volcanique ayant failli anéantir l'espèce humaine. Samosir, l'île qui s'élève au centre du lac, est elle-même plus grande que Singapour et reste le foyer du peuple batak toba, dont les maisons de bois au toit pentu et les tombeaux de pierre sculptée se dressent encore dans des villages le long de la rive.|トバ湖は、過去250万年で最大の火山イベントとされる、約7万4千年前の巨大噴火の跡にできたカルデラ湖である。この噴火は火山の冬を引き起こし、人類を絶滅寸前まで追い込んだとする説を唱える科学者もいる。湖の中央に浮かぶサモシール島はシンガポールより広く、切妻の急な屋根を持つ木造家屋と彫刻を施した石棺がいまも湖岸の村々に残るバタック・トバ族の郷里である。",
    [prop("Samosir Ferry Crossing|Cruce en ferri a Samosir|Traversée en ferry vers Samosir|サモシール島行き渡し船", 300, 62),
     prop("Batak Stone Tomb Village|Aldea de tumbas de piedra batak|Village aux tombeaux de pierre batak|バタック族の石棺の村", 220, 46)],
  ),
  bukittinggi: city(
    "Bukittinggi|Bukittinggi|Bukittinggi|ブキッティンギ",
    100.3696, -0.3046, "sum", "clocktower", "highland", "r",
    "A clock tower whose roof changes with every ruler|Una torre reloj cuyo tejado cambia con cada gobernante|Un beffroi dont le toit change à chaque gouvernant|支配者が変わるたび屋根が変わる時計塔",
    "Bukittinggi's clock tower, Jam Gadang, has worn three different roofs since a Dutch colonial secretary had it built in 1926: a Dutch-style dome under colonial rule, a pointed Japanese helmet during the wartime occupation, and since 1950 the upward-curving horns of a Minangkabau roof, each change marking a change of ruler. Local guides like to add that its clockwork is one of only two of its kind ever built, with the other supposedly inside London's Big Ben, though the claim is repeated far more often than it is documented.|La torre reloj de Bukittinggi, Jam Gadang, ha lucido tres tejados distintos desde que un secretario colonial holandés la mandó construir en 1926: una cúpula al estilo holandés bajo el dominio colonial, un casco puntiagudo japonés durante la ocupación bélica y, desde 1950, los cuernos curvados hacia arriba de un tejado minangkabau, cada cambio marcando un cambio de gobernante. Los guías locales suelen añadir que su maquinaria es una de solo dos de su tipo jamás construidas, con la otra supuestamente dentro del Big Ben de Londres, aunque la afirmación se repite mucho más de lo que se documenta.|Le beffroi de Bukittinggi, Jam Gadang, a porté trois toits différents depuis qu'un secrétaire colonial hollandais le fit construire en 1926 : un dôme à la hollandaise sous la domination coloniale, un casque pointu japonais pendant l'occupation, puis depuis 1950 les cornes recourbées vers le haut d'un toit minangkabau, chaque changement marquant un changement de maître. Les guides locaux aiment ajouter que son mécanisme est l'un des deux seuls de ce type jamais construits, l'autre étant censément niché dans le Big Ben de Londres, une affirmation bien plus répétée que documentée.|ブキッティンギの時計塔ジャム・ガダンは、1926年にオランダ植民地の書記官が建てさせて以来、三度屋根を変えてきた。植民地時代のオランダ風ドーム、戦時の日本占領期の尖った兜形、そして1950年からは先端が反り上がるミナンカバウ様式の屋根で、支配者が変わるたびに姿を変えている。現地のガイドは「この時計仕掛けは世界に二つしかない機構の一つで、もう一つはロンドンのビッグベンの中にある」と付け加えるのを好むが、この話は裏付けよりもずっと頻繁に語られている。",
    [prop("Jam Gadang Clock Tower Base|Base de la torre reloj Jam Gadang|Base du beffroi Jam Gadang|ジャム・ガダン時計塔の土台", 340, 71),
     prop("Ngarai Sianok Canyon Viewpoint|Mirador del cañón Ngarai Sianok|Belvédère du canyon Ngarai Sianok|ンガライ・シアノック渓谷の展望台", 240, 50)],
  ),
  padang: city(
    "Padang|Padang|Padang|パダン",
    100.3543, -0.9471, "sum", "port", "port", "l",
    "A meal that made itself the standard everywhere|Una comida que se convirtió en el estándar en todas partes|Un repas devenu la norme partout ailleurs|どこへ行っても標準になった食事",
    "Padang gave its name to nasi Padang, the buffet-style meal served across Indonesia and beyond in which a dozen or more small dishes arrive unordered at the table and diners pay only for what they actually eat, an honor-based accounting system waiters still track by eye. The city sits close enough to the Sunda Megathrust fault that after the deadly 2009 earthquake it built multi-story concrete evacuation towers along the coast, tall enough to outrun a tsunami on foot.|Padang dio nombre al nasi Padang, la comida al estilo bufé servida en toda Indonesia y más allá, en la que una docena o más de platillos llegan a la mesa sin haberse pedido y los comensales solo pagan por lo que realmente comen, un sistema de cuentas basado en la confianza que los camareros aún llevan a ojo. La ciudad está tan cerca de la falla del Megaempuje de la Sonda que, tras el mortífero terremoto de 2009, construyó torres de evacuación de hormigón de varios pisos en la costa, lo bastante altas para escapar de un tsunami a pie.|Padang a donné son nom au nasi Padang, ce repas façon buffet servi dans toute l'Indonésie et au-delà, où une douzaine de petits plats ou plus arrivent à table sans avoir été commandés et où les convives ne paient que ce qu'ils mangent réellement, un système de confiance que les serveurs continuent à suivre à l'œil. La ville est assez proche de la faille de la mégasubduction de la Sonde pour qu'après le meurtrier séisme de 2009, elle ait construit le long de la côte des tours d'évacuation en béton assez hautes pour devancer un tsunami à pied.|パダンはナシ・パダンにその名を与えた。インドネシア中、そしてそれ以外の土地でも供されるこのビュッフェ式の食事は、注文もしていない十数皿もの小皿が卓に並び、客は実際に食べた分だけを払う。この信頼に基づく勘定は、いまも給仕が目で見て記録する。この町はスンダ・メガスラスト断層に近いため、2009年の死者を出した地震ののち、海岸沿いに徒歩で津波から逃げ切れるほどの高さを持つ鉄筋コンクリートの避難タワーを建てた。",
    [prop("Rumah Makan Padang Kitchen|Cocina de un rumah makan Padang|Cuisine d'un rumah makan Padang|パダン料理店の厨房", 360, 75),
     prop("Tsunami Evacuation Tower|Torre de evacuación de tsunamis|Tour d'évacuation anti-tsunami|津波避難タワー", 220, 46)],
  ),
  sawahlunto: city(
    "Sawahlunto|Sawahlunto|Sawahlunto|サワルント",
    100.7667, -0.6833, "sum", "mine", "mine", "r",
    "A coal town rebuilt as a heritage site|Un pueblo minero reconvertido en patrimonio|Une ville minière reconvertie en site patrimonial|世界遺産に生まれ変わった炭鉱町",
    "Sawahlunto grew up around the Ombilin coal mine the Dutch opened in 1892, worked at first largely by chained convict laborers known as orang rantai, and the railway built in 1894 to haul that coal down to the port at Padang was one of the first in Sumatra, its rack-and-pinion section still considered a feat of colonial-era engineering. The mine closed in 2002, and the whole town, including its old locomotive sheds, was inscribed as a UNESCO World Heritage Site in 2019 as the \"Ombilin Coal Mining Heritage.\"|Sawahlunto creció en torno a la mina de carbón de Ombilin que los holandeses abrieron en 1892, trabajada al principio en gran parte por presos encadenados conocidos como orang rantai, y el ferrocarril construido en 1894 para bajar ese carbón hasta el puerto de Padang fue uno de los primeros de Sumatra, con un tramo de cremallera aún considerado una proeza de la ingeniería colonial. La mina cerró en 2002, y toda la ciudad, incluidos sus antiguos cobertizos de locomotoras, fue declarada Patrimonio de la Humanidad por la UNESCO en 2019 como «Patrimonio Minero del Carbón de Ombilin».|Sawahlunto grandit autour de la mine de charbon d'Ombilin ouverte par les Hollandais en 1892, exploitée d'abord en grande partie par des bagnards enchaînés appelés orang rantai, et le chemin de fer construit en 1894 pour descendre ce charbon jusqu'au port de Padang fut l'un des premiers de Sumatra, sa section à crémaillère étant encore considérée comme une prouesse d'ingénierie coloniale. La mine ferma en 2002, et toute la ville, y compris ses anciens dépôts de locomotives, fut inscrite au patrimoine mondial de l'UNESCO en 2019 sous le nom de « patrimoine minier du charbon d'Ombilin ».|サワルントは、オランダが1892年に開いたオンビリン炭鉱を中心に発展した町で、当初は「オラン・ランタイ」と呼ばれる鎖につながれた囚人労働者が主に働かされた。その石炭をパダン港まで運ぶために1894年に敷かれた鉄道はスマトラでも最初期のもので、ラック式の区間はいまも植民地期屈指の土木技術とされる。炭鉱は2002年に閉山し、旧機関庫を含む町全体が2019年に「オンビリン炭鉱遺産」としてユネスコ世界遺産に登録された。",
    [prop("Ombilin Mine Shaft Entrance|Entrada al pozo de la mina de Ombilin|Entrée du puits de la mine d'Ombilin|オンビリン炭鉱の坑口", 300, 62),
     prop("Old Locomotive Roundhouse|Antiguo cobertizo circular de locomotoras|Ancienne rotonde à locomotives|旧機関車の扇形庫", 200, 42)],
  ),
  palembang: city(
    "Palembang|Palembang|Palembang|パレンバン",
    104.7458, -2.9761, "sum", "bridge", "river", "l",
    "A capital whose harbor is still being searched for|Una capital cuyo puerto aún se sigue buscando|Une capitale dont le port se cherche encore|港がいまも探され続ける都",
    "Palembang is thought to have been the capital of Srivijaya, a Buddhist maritime empire that controlled trade through the Strait of Malacca from the 7th to the 13th centuries and drew Chinese monks to study at its monasteries for a decade at a stretch. Archaeologists have pulled gold, inscribed stones, and shipwrecked cargo from in and around the Musi River, yet still cannot agree exactly where the empire's harbor and palace once stood beneath the modern city.|Se cree que Palembang fue la capital de Srivijaya, un imperio marítimo budista que controló el comercio por el estrecho de Malaca del siglo VII al XIII y atrajo a monjes chinos que estudiaban en sus monasterios durante hasta una década seguida. Los arqueólogos han sacado oro, piedras con inscripciones y cargamentos de naufragios del río Musi y sus alrededores, pero aún no logran acordar dónde estuvieron exactamente el puerto y el palacio del imperio bajo la ciudad moderna.|On pense que Palembang fut la capitale de Srivijaya, un empire maritime bouddhiste qui contrôla le commerce dans le détroit de Malacca du VIIe au XIIIe siècle et attirait des moines chinois venus étudier dans ses monastères pendant près d'une décennie d'affilée. Les archéologues ont sorti de l'or, des pierres gravées et des cargaisons d'épaves du fleuve Musi et de ses environs, mais ne s'accordent toujours pas sur l'emplacement exact du port et du palais de l'empire sous la ville moderne.|パレンバンは、7世紀から13世紀にかけてマラッカ海峡の交易を支配した仏教の海洋帝国シュリーヴィジャヤの都だったと考えられている。この国の僧院にはひと続きで十年も学ぶ中国人の僧が集まった。考古学者たちはムシ川とその周辺から金や刻文を刻んだ石、難破船の積み荷を引き上げてきたが、現代の町の下のどこに帝国の港と宮殿があったのかは、いまだに意見が一致していない。",
    [prop("Ampera Bridge Toll Plaza|Plaza de peaje del puente Ampera|Place de péage du pont Ampera|アンペラ橋の料金広場", 460, 96),
     prop("Kuto Besak Fort River Wall|Muralla fluvial del fuerte Kuto Besak|Mur fluvial du fort Kuto Besak|クト・ブサ要塞の川岸城壁", 300, 62)],
  ),
  bakauheni: city(
    "Bakauheni|Bakauheni|Bakauheni|バカウヘニ",
    105.75, -5.87, "sum", "ferry", "ferry", "r",
    "The gate Sumatra squeezes through every Lebaran|La puerta por la que Sumatra se aprieta cada Lebaran|La porte par laquelle Sumatra se presse à chaque Lebaran|レバランのたびスマトラがひしめく関所",
    "Bakauheni marks the southern tip of Sumatra and the ferry crossing to Java that most of the island's road traffic depends on, a roughly two-hour run across the Sunda Strait carrying well over a thousand vehicles a day in ordinary times. During the mass homecoming before Lebaran, when millions of Indonesians working in Java's cities travel back to family villages, the port has recorded backups of tens of thousands of vehicles waiting days for a place on a ferry.|Bakauheni marca la punta sur de Sumatra y el cruce en ferri a Java del que depende la mayor parte del tráfico rodado de la isla, un trayecto de unas dos horas por el estrecho de la Sonda que en tiempos normales lleva bien más de mil vehículos al día. Durante el regreso masivo antes del Lebaran, cuando millones de indonesios que trabajan en las ciudades de Java vuelven a sus pueblos, el puerto ha registrado atascos de decenas de miles de vehículos esperando días por un sitio en un ferri.|Bakauheni marque la pointe sud de Sumatra et la traversée en ferry vers Java dont dépend l'essentiel du trafic routier de l'île, un trajet d'environ deux heures à travers le détroit de la Sonde qui transporte, en temps normal, bien plus de mille véhicules par jour. Lors du grand retour au pays précédant le Lebaran, quand des millions d'Indonésiens travaillant dans les villes de Java rentrent dans leur village natal, le port a enregistré des embouteillages de dizaines de milliers de véhicules attendant plusieurs jours une place sur un ferry.|バカウヘニはスマトラ島南端に位置し、島の道路交通の大半が頼るジャワ行きフェリーの発着地で、スンダ海峡を渡るおよそ2時間の航路は平時でも1日千台をゆうに超える車両を運ぶ。レバラン(断食明け大祭)前の大帰省では、ジャワの都市で働く何百万人ものインドネシア人が故郷の村へ戻るため、この港では数万台もの車が乗船まで何日も待つ渋滞が記録されている。",
    [prop("Ferry Terminal Vehicle Deck|Cubierta de vehículos de la terminal de ferris|Pont véhicules du terminal de ferry|フェリーターミナルの車両甲板", 260, 54),
     prop("Sunda Strait Watchtower|Torre de vigía del estrecho de la Sonda|Tour de guet du détroit de la Sonde|スンダ海峡の監視塔", 180, 38)],
  ),

  // ---------------------------------------------------------------------
  // jav — ジャワ
  // ---------------------------------------------------------------------
  jakarta: city(
    "Jakarta|Yakarta|Jakarta|ジャカルタ",
    106.8456, -6.2088, "jav", "monas", "capital", "r",
    "A capital sinking fast enough to need a replacement|Una capital que se hunde tan rápido que necesita un reemplazo|Une capitale qui s'enfonce assez vite pour devoir être remplacée|身代わりが要るほど速く沈む首都",
    "Jakarta is sinking faster than almost any coastal city on Earth, by as much as 25 centimeters a year in parts of the north as residents and industry pump groundwater out faster than the aquifer can refill, while much of the city already sits below sea level behind an expanding system of sea walls. The crisis is serious enough that in 2019 Indonesia decided to move its capital altogether, to a newly built city called Nusantara more than 1,200 kilometers away on Borneo.|Yakarta se hunde más rápido que casi cualquier ciudad costera del mundo, hasta 25 centímetros al año en partes del norte, a medida que residentes e industria extraen agua subterránea más rápido de lo que el acuífero puede recargarse, mientras buena parte de la ciudad ya está bajo el nivel del mar tras un sistema de diques cada vez mayor. La crisis es tan grave que en 2019 Indonesia decidió trasladar del todo su capital, a una ciudad de nueva construcción llamada Nusantara, a más de 1.200 kilómetros de distancia, en Borneo.|Jakarta s'enfonce plus vite que presque toute autre ville côtière au monde, jusqu'à 25 centimètres par an dans certains quartiers du nord, les habitants et l'industrie pompant l'eau souterraine plus vite que la nappe ne peut se recharger, tandis qu'une bonne partie de la ville se trouve déjà sous le niveau de la mer derrière un système de digues en expansion. La crise est assez grave pour qu'en 2019, l'Indonésie décide de déplacer purement et simplement sa capitale, vers une ville toute nouvelle baptisée Nusantara, à plus de 1 200 kilomètres de là, à Bornéo.|ジャカルタは世界でも屈指の速さで沈んでいる都市で、北部の一部では地下水を帯水層が満たせる速さを超えて住民と産業がくみ上げ続けるため、年に最大25センチも沈む。すでに市街の多くが海面より低く、広がり続ける防潮堤の内側に守られている。この危機はあまりに深刻で、インドネシアは2019年、首都そのものをボルネオ島に新しく建設中の都市ヌサンタラへ、1200キロメートル以上離れた場所へ移すことを決めた。",
    [prop("Monas National Monument Base|Base del Monumento Nacional Monas|Base du monument national Monas|モナス国立記念塔の基部", 2800, 581),
     prop("Kota Tua Batavia Warehouse|Almacén de Kota Tua Batavia|Entrepôt de Kota Tua Batavia|コタトゥア(バタヴィア旧市街)の倉庫", 700, 145)],
  ),
  merak: city(
    "Merak|Merak|Merak|メラック",
    105.99, -5.93, "jav", "ferry", "ferry", "l",
    "The last stop on the line, in view of a rebuilding volcano|La última parada de la línea, frente a un volcán que se reconstruye|Le dernier arrêt de la ligne, face à un volcan qui se reconstruit|再建中の火山を望む路線の終着点",
    "Anak Krakatau, the volcanic island that grew from the sea after Krakatau's catastrophic 1883 eruption killed more than 36,000 people, is visible from the ferry crossing here on a clear day and has kept erupting ever since, most destructively in a December 2018 flank collapse that sent a tsunami toward these shores with almost no warning. Merak's port still runs ferries across the Sunda Strait around the clock, over the same waters the 1883 tsunami crossed to devastate towns on both the Java and Sumatra coasts.|Anak Krakatau, la isla volcánica que surgió del mar tras la catastrófica erupción de Krakatoa en 1883, que mató a más de 36.000 personas, se ve desde el cruce del ferri en días despejados y no ha dejado de entrar en erupción desde entonces, más destructivamente en un colapso de flanco en diciembre de 2018 que envió un tsunami hacia estas costas casi sin aviso. El puerto de Merak sigue haciendo cruzar ferris por el estrecho de la Sonda las 24 horas, sobre las mismas aguas que el tsunami de 1883 cruzó para devastar pueblos en las costas de Java y Sumatra.|Anak Krakatau, l'île volcanique née de la mer après l'éruption catastrophique du Krakatoa en 1883, qui tua plus de 36 000 personnes, est visible depuis cette traversée en ferry par temps clair et n'a cessé d'entrer en éruption depuis, le plus destructeur étant un effondrement de flanc en décembre 2018 qui envoya un tsunami vers ces côtes avec presque aucun avertissement. Le port de Merak fait toujours traverser des ferries dans le détroit de la Sonde jour et nuit, sur les mêmes eaux que le tsunami de 1883 avait traversées pour dévaster des villes sur les côtes de Java et de Sumatra.|1883年のクラカタウの大噴火(死者3万6千人以上)ののち海から生まれた火山島アナク・クラカタウは、晴れた日にはここのフェリー航路から見える。噴火はいまも続いており、最も被害が大きかったのは2018年12月の山体崩壊で、ほとんど前触れのない津波をこの海岸へ送った。メラック港はいまも昼夜を問わずスンダ海峡を渡るフェリーを走らせているが、それは1883年の津波がジャワとスマトラ両岸の町を壊滅させたのと同じ海域である。",
    [prop("Sunda Strait Ferry Terminal|Terminal de ferris del estrecho de la Sonda|Terminal de ferry du détroit de la Sonde|スンダ海峡フェリーターミナル", 280, 58),
     prop("Krakatau Viewing Deck|Mirador del Krakatoa|Belvédère du Krakatoa|クラカタウ展望デッキ", 200, 42)],
  ),
  bandung: city(
    "Bandung|Bandung|Bandung|バンドン",
    107.6191, -6.9175, "jav", "artdeco", "hillcity", "l",
    "A hill town where 29 nations refused to pick a side|Un pueblo de montaña donde 29 naciones se negaron a elegir bando|Une ville de montagne où 29 nations refusèrent de choisir un camp|29か国がどちらにも与しないと決めた高原の町",
    "Bandung hosted the 1955 Asian-African Conference, where leaders from 29 newly independent or soon-to-be-independent nations, including Sukarno, Nehru, Zhou Enlai, and Nasser, met at the Art Deco Gedung Merdeka to lay the groundwork for what became the Non-Aligned Movement, rejecting alignment with either Cold War bloc. The building and much of the surrounding city center still show off the Art Deco architecture the Dutch built here in the 1920s and 30s, when the hill town's cool climate made it a favored retreat nicknamed the \"Paris of Java.\"|Bandung acogió la Conferencia Asiático-Africana de 1955, donde líderes de 29 naciones recién independizadas o a punto de estarlo, entre ellos Sukarno, Nehru, Zhou Enlai y Nasser, se reunieron en el Art Decó Gedung Merdeka para sentar las bases de lo que sería el Movimiento de Países No Alineados, rechazando alinearse con ningún bloque de la Guerra Fría. El edificio y buena parte del centro urbano circundante siguen luciendo la arquitectura Art Decó que los holandeses construyeron aquí en los años veinte y treinta, cuando el clima fresco de esta ciudad de montaña la convirtió en un retiro predilecto apodado el «París de Java».|Bandung accueillit la conférence de Bandoung en 1955, où des dirigeants de 29 nations tout juste indépendantes ou sur le point de l'être, dont Sukarno, Nehru, Zhou Enlai et Nasser, se réunirent au Gedung Merdeka Art déco pour jeter les bases de ce qui deviendrait le Mouvement des non-alignés, refusant de se ranger dans l'un ou l'autre bloc de la Guerre froide. Le bâtiment et une bonne partie du centre-ville environnant arborent encore l'architecture Art déco bâtie ici par les Hollandais dans les années 1920 et 1930, quand le climat frais de cette ville de montagne en fit une villégiature prisée surnommée le « Paris de Java ».|バンドンは1955年、アジア・アフリカ会議の開催地となった。スカルノ、ネルー、周恩来、ナセルら、独立したばかり、あるいは独立を控えた29の国の指導者たちがアール・デコ様式のグドゥン・ムルデカに集まり、冷戦のどちらの陣営にも与しないという、のちの非同盟運動の礎を築いた。この建物と周囲の中心市街の多くには、1920〜30年代にオランダが建てたアール・デコ建築がいまも残っており、涼しい気候ゆえに「ジャワのパリ」と呼ばれる保養地として好まれていた当時の姿を伝えている。",
    [prop("Gedung Merdeka Conference Hall|Sala de conferencias Gedung Merdeka|Salle de conférence du Gedung Merdeka|グドゥン・ムルデカ会議場", 900, 187),
     prop("Art Deco Facade District|Distrito de fachadas Art Decó|Quartier des façades Art déco|アール・デコ建築の街区", 480, 100)],
  ),
  cirebon: city(
    "Cirebon|Cirebon|Cirebon|チルボン",
    108.5573, -6.7063, "jav", "megamendung", "batik", "r",
    "A cloud pattern born from a Chinese wedding gift|Un patrón de nubes nacido de un regalo de boda chino|Un motif de nuages né d'un cadeau de mariage chinois|中国の婚礼の贈り物から生まれた雲の文様",
    "Cirebon's signature batik pattern, Mega Mendung, is built from layered cloud shapes in blue gradients that trace back to Chinese ceramics and embroidery brought to the sultanate's court through a 15th-century marriage alliance, the clouds reworked over generations into a design now recognized as distinctly Cirebonese rather than borrowed. The city's position on the coast road between Jakarta and Semarang made it the natural meeting point for Java's coastal and inland trading routes, and it remains the junction where the island's north-coast and Bandung rail lines physically meet.|El patrón de batik emblemático de Cirebon, Mega Mendung, se compone de nubes superpuestas en degradados de azul que remontan a cerámicas y bordados chinos llevados a la corte del sultanato por una alianza matrimonial del siglo XV, nubes reelaboradas durante generaciones hasta un diseño hoy reconocido como propiamente cirebonés y no prestado.|Le motif emblématique du batik de Cirebon, le Mega Mendung, se compose de nuages superposés en dégradés de bleu remontant à des céramiques et broderies chinoises apportées à la cour du sultanat par une alliance matrimoniale du XVe siècle, des nuages retravaillés au fil des générations en un motif aujourd'hui reconnu comme propre à Cirebon plutôt qu'emprunté.|チルボンを代表するバティック文様「メガ・ムンドゥン」は、青の濃淡が幾重にも重なる雲の形からなり、15世紀の婚姻同盟を通じて王宮にもたらされた中国の陶磁器や刺繡にそのルーツをたどる。その雲は幾世代もかけて作り直され、いまでは借り物ではなくチルボン独自の意匠として認められている。ジャカルタとスマランを結ぶ海岸道路沿いに位置するこの町は、ジャワの沿岸交易路と内陸交易路が自然と出会う場所となり、いまも島の北岸線とバンドン線が実際に交わる鉄道の分岐点であり続けている。",
    [prop("Mega Mendung Batik Workshop|Taller de batik Mega Mendung|Atelier de batik Mega Mendung|メガ・ムンドゥン・バティック工房", 380, 79),
     prop("Kasepuhan Palace Gate|Puerta del palacio Kasepuhan|Porte du palais Kasepuhan|カスプハン宮殿の門", 260, 54)],
  ),
  purwokerto: city(
    "Purwokerto|Purwokerto|Purwokerto|プルウォクルト",
    109.2380, -7.4235, "jav", "bank", "colonial", "l",
    "A bank that started with one clerk's own salary|Un banco que empezó con el propio sueldo de un empleado|Une banque commencée avec le seul salaire d'un employé|一人の役人の給料から始まった銀行",
    "Purwokerto is where a Javanese colonial official named Raden Bei Aria Wirjaatmadja started a small village credit cooperative in 1895, lending out his own salary and a mosque's charitable fund to farmers who had nowhere else to borrow at a fair rate, a modest scheme that grew into Bank Rakyat Indonesia, now one of the country's largest banks and among the oldest in Asia. The city also sits on the southern rail line that lets trains reach Yogyakarta from Jakarta without detouring through Bandung, a junction role that has kept it busy long after the bank's founder moved on.|Purwokerto es donde un funcionario colonial javanés llamado Raden Bei Aria Wirjaatmadja fundó en 1895 una pequeña cooperativa de crédito rural, prestando su propio sueldo y el fondo benéfico de una mezquita a agricultores sin otro lugar donde pedir prestado a un tipo justo, un modesto proyecto que creció hasta convertirse en el Bank Rakyat Indonesia, hoy uno de los mayores bancos del país.|Purwokerto est l'endroit où un fonctionnaire colonial javanais nommé Raden Bei Aria Wirjaatmadja fonda en 1895 une petite coopérative de crédit villageoise, prêtant son propre salaire et le fonds caritatif d'une mosquée à des agriculteurs qui n'avaient nulle part ailleurs où emprunter à un taux juste, un modeste projet devenu la Bank Rakyat Indonesia, aujourd'hui l'une des plus grandes banques du pays.|プルウォクルトは、ジャワ人の植民地官吏ラデン・ベイ・アリア・ウィルジャアトマジャが1895年、自らの給料とモスクの慈善基金を元手に、公正な利率で借りる先の無かった農民たちへ貸し付ける小さな村の信用組合を始めた場所である。この慎ましい試みは、いまではインドネシア最大級かつアジアでも屈指の歴史を持つ銀行「ブリ(BRI)」へと育った。この町はまた、ジャカルタからバンドンを回り道せずヨグヤカルタへ抜けられる南部の鉄道路線上にあり、この分岐点としての役割が、創業者が去ったあともこの町を賑わせ続けている。",
    [prop("Old Village Credit Cooperative Building|Antiguo edificio de la cooperativa de crédito rural|Ancien bâtiment de la coopérative de crédit villageoise|旧村落信用組合の建物", 320, 67),
     prop("Southern Line Junction Platform|Andén de la unión de la línea sur|Quai de la jonction de la ligne sud|南部線分岐駅のホーム", 220, 46)],
  ),
  semarang: city(
    "Semarang|Semarang|Semarang|スマラン",
    110.4203, -6.9932, "jav", "colonial", "colonial", "r",
    "A thousand doors built to beat the heat before fans existed|Mil puertas construidas para vencer el calor antes de que existieran los ventiladores|Mille portes bâties pour vaincre la chaleur avant l'invention du ventilateur|扇風機のない時代に暑さをしのいだ千の扉",
    "Lawang Sewu, Semarang's best-known landmark, was built in 1907 as the headquarters of the Dutch East Indies railway company and gets its Javanese name, \"thousand doors,\" from the hundreds of tall doors and windows that let tropical heat escape long before air conditioning existed. During the Japanese occupation its basement was used as a wartime prison, and the building's mix of grand colonial architecture and grim history has made it one of Indonesia's most persistently rumored haunted sites.|Lawang Sewu, el monumento más conocido de Semarang, se construyó en 1907 como sede de la compañía ferroviaria de las Indias Orientales Holandesas y debe su nombre javanés, «mil puertas», a los cientos de puertas y ventanas altas que dejaban escapar el calor tropical mucho antes de que existiera el aire acondicionado. Durante la ocupación japonesa, su sótano se usó como prisión de guerra, y la mezcla del edificio entre gran arquitectura colonial e historia sombría lo ha convertido en uno de los lugares más persistentemente considerados encantados de Indonesia.|Lawang Sewu, le monument le plus connu de Semarang, fut construit en 1907 comme siège de la compagnie ferroviaire des Indes orientales néerlandaises, et tire son nom javanais, « mille portes », des centaines de hautes portes et fenêtres qui laissaient échapper la chaleur tropicale bien avant l'invention de la climatisation. Pendant l'occupation japonaise, son sous-sol servit de prison de guerre, et ce mélange de grande architecture coloniale et d'histoire sombre en a fait l'un des sites les plus tenaces de la réputation de hantise en Indonésie.|スマランで最もよく知られたランドマーク、ラワン・スウは1907年、オランダ領東インド鉄道会社の本社として建てられ、冷房のなかった時代に熱帯の暑さを逃がすために設けられた何百もの背の高い扉と窓から、ジャワ語で「千の扉」を意味するその名がついた。日本占領期には地下室が捕虜収容所として使われ、壮麗な植民地建築と重い歴史が同居するこの建物は、インドネシアでも屈指の幽霊話が絶えない場所となっている。",
    [prop("Lawang Sewu Grand Staircase|Gran escalinata de Lawang Sewu|Grand escalier de Lawang Sewu|ラワン・スウの大階段", 780, 162),
     prop("Semarang Old Town Warehouse|Almacén del casco antiguo de Semarang|Entrepôt de la vieille ville de Semarang|スマラン旧市街の倉庫", 420, 87)],
  ),
  yogyakarta: city(
    "Yogyakarta|Yogyakarta|Yogyakarta|ジョグジャカルタ",
    110.3695, -7.7956, "jav", "palace", "palace", "l",
    "Indonesia's only province still run by a king|La única provincia de Indonesia todavía gobernada por un rey|La seule province d'Indonésie encore dirigée par un roi|いまも王が治めるインドネシア唯一の州",
    "Yogyakarta is the only Indonesian province still ruled by a hereditary monarch: its sultan automatically becomes the region's governor under a special autonomy law, an arrangement granted in gratitude for the sultanate's support during the 1945-49 independence war. The Kraton palace at the city's center remains the sultan's residence, its inner buildings aligned along an axis running from the sea to the south up to the volcano Merapi in the north, a line Javanese cosmology treats as sacred.|Yogyakarta es la única provincia de Indonesia aún gobernada por un monarca hereditario: su sultán se convierte automáticamente en gobernador de la región según una ley de autonomía especial, un arreglo concedido en agradecimiento por el apoyo del sultanato durante la guerra de independencia de 1945-49. El palacio Kraton, en el centro de la ciudad, sigue siendo residencia del sultán, con sus edificios interiores alineados en un eje que va del mar, al sur, hasta el volcán Merapi, al norte, una línea que la cosmología javanesa considera sagrada.|Yogyakarta est la seule province d'Indonésie encore dirigée par un monarque héréditaire : son sultan devient automatiquement gouverneur de la région en vertu d'une loi d'autonomie spéciale, un arrangement accordé en remerciement du soutien du sultanat pendant la guerre d'indépendance de 1945-1949. Le palais Kraton, au centre-ville, demeure la résidence du sultan, ses bâtiments intérieurs alignés sur un axe allant de la mer au sud jusqu'au volcan Merapi au nord, une ligne que la cosmologie javanaise tient pour sacrée.|ジョグジャカルタはインドネシアで唯一、世襲の君主がいまも治める州である。特別自治法のもと、スルタンは自動的にこの地方の知事を兼ねる仕組みで、1945〜49年の独立戦争でこの王国が示した支援への感謝として与えられたものである。町の中心にあるクラトン(王宮)はいまもスルタンの住まいであり、内部の建物群は南の海から北のムラピ山まで一直線に並ぶよう配置されている。この軸線はジャワの宇宙観で神聖なものとされる。",
    [prop("Kraton Palace Pavilion|Pabellón del palacio Kraton|Pavillon du palais Kraton|クラトン宮殿の楼閣", 900, 187),
     prop("Taman Sari Water Castle|Castillo de agua Taman Sari|Château d'eau de Taman Sari|タマンサリ水の宮殿", 460, 96)],
  ),
  borobudur: city(
    "Borobudur|Borobudur|Borobudur|ボロブドゥール",
    110.2038, -7.6079, "jav", "temple", "temple", "r",
    "The world's largest Buddhist monument, lost and found again|El mayor monumento budista del mundo, perdido y hallado de nuevo|Le plus grand monument bouddhiste au monde, perdu puis retrouvé|失われ、再び見出された世界最大の仏教建造物",
    "Borobudur, built by the Sailendra dynasty in the 8th and 9th centuries, is the largest Buddhist monument on Earth, its nine stacked platforms carved with 2,672 relief panels and ringed by 504 Buddha statues meant to be walked clockwise as a physical pilgrimage through Buddhist cosmology. Abandoned and buried under volcanic ash and jungle growth for centuries, it was not properly rediscovered until 1814, when the British colonial administrator Thomas Stamford Raffles ordered the site cleared.|Borobudur, construido por la dinastía Sailendra en los siglos VIII y IX, es el mayor monumento budista del mundo, con nueve plataformas apiladas talladas con 2.672 relieves y rodeadas de 504 estatuas de Buda pensadas para recorrerse en el sentido de las agujas del reloj como una peregrinación física por la cosmología budista. Abandonado y sepultado bajo ceniza volcánica y selva durante siglos, no se redescubrió como es debido hasta 1814, cuando el administrador colonial británico Thomas Stamford Raffles ordenó despejar el lugar.|Borobudur, bâti par la dynastie Sailendra aux VIIIe et IXe siècles, est le plus grand monument bouddhiste au monde, ses neuf plateformes empilées ornées de 2 672 panneaux en relief et entourées de 504 statues de Bouddha, conçues pour être parcourues dans le sens des aiguilles d'une montre comme un pèlerinage physique à travers la cosmologie bouddhiste. Abandonné et enseveli sous la cendre volcanique et la jungle pendant des siècles, il ne fut vraiment redécouvert qu'en 1814, quand l'administrateur colonial britannique Thomas Stamford Raffles en ordonna le dégagement.|8〜9世紀にサイレーンドラ王朝が築いたボロブドゥールは世界最大の仏教建造物で、9層に積み重なる基壇には2672面の浮彫が刻まれ、504体の仏像に囲まれている。これらは仏教の宇宙観をたどる巡礼として時計回りに歩くよう作られている。何世紀ものあいだ火山灰とジャングルに埋もれて放棄されていたが、1814年、イギリス植民地行政官トマス・スタンフォード・ラッフルズが現地の伐開を命じるまで、本格的に再発見されることはなかった。",
    [prop("Borobudur Stupa Terrace|Terraza de estupas de Borobudur|Terrasse des stupas de Borobudur|ボロブドゥールのストゥーパ壇", 2700, 560),
     prop("Relief Panel Walkway|Pasarela de los relieves|Promenoir des bas-reliefs|浮彫の回廊", 560, 116)],
  ),
  solo: city(
    "Solo (Surakarta)|Solo (Surakarta)|Solo (Surakarta)|ソロ(スラカルタ)",
    110.8167, -7.5667, "jav", "batik", "batik", "l",
    "A kingdom split in two that never quite reunited|Un reino partido en dos que nunca se reunificó del todo|Un royaume scindé en deux qui ne s'est jamais tout à fait réuni|二つに割れたまま一つに戻らなかった王国",
    "Solo has two royal courts facing each other across the city because the Mataram sultanate split in two in 1755, when a decade of succession wars ended with the Dutch East India Company brokering a treaty that divided the kingdom between the Kasunanan court here and a rival court in nearby Yogyakarta. Solo is also considered one of the two heartlands of Javanese batik, and its markets still sell the finer, more muted court patterns that set the local style apart from Yogyakarta's own.|Solo tiene dos cortes reales que se miran de un lado a otro de la ciudad porque el sultanato de Mataram se dividió en dos en 1755, cuando una década de guerras de sucesión terminó con la Compañía Neerlandesa de las Indias Orientales negociando un tratado que repartió el reino entre la corte Kasunanan de aquí y una corte rival en la cercana Yogyakarta. Solo también se considera uno de los dos centros del batik javanés, y sus mercados aún venden los patrones cortesanos más finos y apagados que distinguen el estilo local del de Yogyakarta.|Solo compte deux cours royales qui se font face à travers la ville parce que le sultanat de Mataram se scinda en deux en 1755, quand une décennie de guerres de succession s'acheva par un traité négocié par la Compagnie néerlandaise des Indes orientales, partageant le royaume entre la cour Kasunanan d'ici et une cour rivale dans la proche Yogyakarta. Solo est aussi considérée comme l'un des deux berceaux du batik javanais, et ses marchés vendent encore les motifs de cour plus fins et plus sourds qui distinguent le style local de celui de Yogyakarta.|ソロには町を挟んで向かい合う二つの王宮がある。マタラム王国は1755年に分裂し、十年に及んだ王位継承戦争は、オランダ東インド会社の仲介による条約で、ここのカスナナン王宮と近隣ジョグジャカルタの対抗王宮に王国を分けることで終わった。ソロはまたジャワ更紗(バティック)の二大中心地の一つとされ、市場ではいまも、ジョグジャカルタとは違う、より繊細で落ち着いた宮廷文様の布が売られている。",
    [prop("Kasunanan Palace Courtyard|Patio del palacio Kasunanan|Cour du palais Kasunanan|カスナナン王宮の中庭", 700, 145),
     prop("Batik Workshop Stall|Puesto de un taller de batik|Échoppe d'atelier de batik|バティック工房の露店", 320, 67)],
  ),
  surabaya: city(
    "Surabaya|Surabaya|Surabaya|スラバヤ",
    112.7521, -7.2575, "jav", "monument", "port", "r",
    "The battle that gave the whole country a holiday|La batalla que dio a todo el país un día festivo|La bataille qui donna à tout le pays un jour férié|国じゅうに祝日をもたらした戦い",
    "Surabaya is honored nationwide every November 10th as Hari Pahlawan, Heroes' Day, commemorating the battle fought here in 1945 when Indonesian militia and civilians, many armed with little more than bamboo spears, held off far better-equipped British and Dutch forces for three weeks just months after independence was declared. The Tugu Pahlawan, a 41-meter monument shaped like a curved bolt, stands over an underground museum recounting the battle beneath the city's main square.|Surabaya se conmemora en todo el país cada 10 de noviembre como Hari Pahlawan, el Día de los Héroes, en recuerdo de la batalla librada aquí en 1945, cuando milicias y civiles indonesios, muchos armados apenas con lanzas de bambú, resistieron tres semanas frente a fuerzas británicas y holandesas mucho mejor equipadas, apenas meses después de declararse la independencia. El Tugu Pahlawan, un monumento de 41 metros con forma de perno curvado, se alza sobre un museo subterráneo que narra la batalla bajo la plaza principal de la ciudad.|Surabaya est honorée dans tout le pays chaque 10 novembre lors du Hari Pahlawan, le Jour des héros, commémorant la bataille livrée ici en 1945, quand des miliciens et civils indonésiens, souvent armés de simples lances de bambou, tinrent tête trois semaines à des forces britanniques et néerlandaises bien mieux équipées, à peine quelques mois après la déclaration d'indépendance. Le Tugu Pahlawan, un monument de 41 mètres en forme de boulon incurvé, surplombe un musée souterrain retraçant la bataille sous la place principale de la ville.|スラバヤは毎年11月10日、全国で「英雄の日(ハリ・パフラワン)」として称えられる。1945年、独立宣言からわずか数か月後、竹槍程度の武器しか持たないインドネシアの民兵や市民が、はるかに装備の勝るイギリス・オランダ軍を三週間にわたり食い止めたこの町の戦いを記念するものである。反り返ったボルトの形をした高さ41メートルの記念塔トゥグ・パフラワンは、市の中央広場の地下にある戦いを伝える博物館の上に立つ。",
    [prop("Tugu Pahlawan Monument Base|Base del monumento Tugu Pahlawan|Base du monument Tugu Pahlawan|トゥグ・パフラワンの基部", 800, 166),
     prop("Kalimas River Port Warehouse|Almacén portuario del río Kalimas|Entrepôt portuaire du fleuve Kalimas|カリマス川港の倉庫", 440, 91)],
  ),
  bromo: city(
    "Mount Bromo|Monte Bromo|Mont Bromo|ブロモ山",
    112.9501, -7.9425, "jav", "volcano", "volcano", "l",
    "A crater villagers still feed by hand|Un cráter que los aldeanos siguen alimentando a mano|Un cratère que les villageois nourrissent encore à la main|村人がいまも手で供物を捧げる火口",
    "Mount Bromo's smoking cone rises from the middle of the Tengger massif's vast sand sea, a caldera floor so flat and grey that horseback guides lead visitors across it before dawn to watch sunrise from the crater rim. Each year the Tenggerese, a Hindu minority who trace their ancestry to the old Majapahit kingdom, climb into the crater for Yadnya Kasada, throwing offerings of rice, livestock, and money into the smoking vent to honor a legendary princess who once sacrificed her youngest son to the volcano.|El cono humeante del monte Bromo se alza en medio del vasto mar de arena del macizo de Tengger, un suelo de caldera tan plano y gris que guías a caballo llevan a los visitantes a cruzarlo antes del amanecer para ver salir el sol desde el borde del cráter. Cada año los tengger, una minoría hindú que remonta su linaje al antiguo reino de Majapahit, suben al cráter para el Yadnya Kasada, arrojando ofrendas de arroz, ganado y dinero al respiradero humeante en honor a una princesa legendaria que una vez sacrificó a su hijo menor al volcán.|Le cône fumant du mont Bromo s'élève au milieu de la vaste mer de sable du massif de Tengger, un fond de caldeira si plat et gris que des guides à cheval y mènent les visiteurs avant l'aube pour voir le lever du soleil depuis le bord du cratère. Chaque année, les Tengger, une minorité hindoue qui fait remonter ses origines à l'ancien royaume de Majapahit, grimpent dans le cratère pour le Yadnya Kasada, jetant des offrandes de riz, de bétail et d'argent dans l'évent fumant en l'honneur d'une princesse légendaire qui sacrifia jadis son plus jeune fils au volcan.|噴煙を上げるブロモ山の火口丘は、テンゲル山塊の広大な「砂の海」の中央にそびえ、そのカルデラの底はあまりに平坦で灰色なため、夜明け前に馬に乗った案内人が観光客を連れて渡り、火口縁から日の出を眺めさせる。毎年、古のマジャパヒト王国の血を引くとされるヒンドゥー教徒の少数民族テンゲル人は、この火口に降りてヤドニャ・カサダの祭りを行い、かつて末の息子を火山に捧げた伝説の王女を敬って米や家畜、金銭を煙を上げる火口に投げ入れる。",
    [prop("Sand Sea Horseback Trail|Sendero a caballo por el mar de arena|Sentier à cheval dans la mer de sable|砂の海の乗馬コース", 380, 79),
     prop("Crater Rim Viewpoint|Mirador del borde del cráter|Belvédère du bord du cratère|火口縁の展望台", 260, 54)],
  ),
  banyuwangi: city(
    "Banyuwangi|Banyuwangi|Banyuwangi|バニュワンギ",
    114.37, -8.22, "jav", "bluefire", "bluefire", "r",
    "Flames blue enough to seem unreal, and a nightly climb to reach them|Llamas tan azules que parecen irreales, y una subida nocturna para alcanzarlas|Des flammes si bleues qu'elles semblent irréelles, atteintes chaque nuit par une ascension|現実離れした青い炎と、それを目指す夜ごとの登り",
    "Ijen volcano near Banyuwangi is one of the only places on Earth where electric-blue flames are visible at night, produced when sulfuric gas escaping the crater at over 600°C ignites on contact with air rather than by any lava glow. Miners still descend into the crater by hand each night to hack out chunks of solidified sulfur and carry loads of up to 90 kilograms up the crater wall in bamboo baskets, work paid by weight that has changed little since Dutch colonial times.|El volcán Ijen, cerca de Banyuwangi, es uno de los pocos lugares del mundo donde se ven llamas azul eléctrico de noche, producidas cuando el gas sulfúrico que escapa del cráter a más de 600 °C se enciende al contacto con el aire, no por brillo de lava. Los mineros aún bajan al cráter a mano cada noche para arrancar trozos de azufre solidificado y suben cargas de hasta 90 kilos por la pared del cráter en cestas de bambú, un trabajo pagado por peso que ha cambiado poco desde la época colonial holandesa.|Le volcan Ijen, près de Banyuwangi, est l'un des rares endroits au monde où l'on voit des flammes bleu électrique la nuit, produites quand le gaz sulfurique s'échappant du cratère à plus de 600 °C s'enflamme au contact de l'air, sans lien avec une quelconque lueur de lave. Des mineurs descendent encore chaque nuit à la main dans le cratère pour en extraire des blocs de soufre solidifié et remontent des charges allant jusqu'à 90 kilos le long de la paroi dans des paniers de bambou, un travail payé au poids qui a peu changé depuis l'époque coloniale néerlandaise.|バニュワンギ近くのイジェン火山は、地球上でも数少ない、夜に電光のような青い炎が見える場所の一つである。これは摂氏600度を超える硫黄ガスが火口から噴き出し、空気に触れて燃え上がるもので、溶岩の輝きではない。鉱夫たちはいまも毎晩手作業で火口に降り、固まった硫黄の塊を切り出し、竹籠に最大90キロもの重さを担いで火口壁を登る。重さに応じて支払われるこの仕事のやり方は、オランダ植民地時代からほとんど変わっていない。",
    [prop("Ijen Crater Rim Trail|Sendero del borde del cráter Ijen|Sentier du bord du cratère Ijen|イジェン火口縁の登山道", 400, 83),
     prop("Sulfur Miners' Weighing Station|Estación de pesaje de los mineros de azufre|Poste de pesée des mineurs de soufre|硫黄鉱夫の計量所", 240, 50)],
  ),

  // ---------------------------------------------------------------------
  // nut — 小スンダ列島(バリ含む)
  // ---------------------------------------------------------------------
  gilimanuk: city(
    "Gilimanuk|Gilimanuk|Gilimanuk|ギリマヌク",
    114.44, -8.17, "nut", "ferry", "ferry", "r",
    "A 2.5-kilometer crossing and a bird brought back from the edge|Un cruce de 2,5 kilómetros y un ave rescatada del borde de la extinción|Une traversée de 2,5 kilomètres et un oiseau ramené du bord de l'extinction|2.5キロメートルの航路と、絶滅寸前から連れ戻された鳥",
    "Gilimanuk sits at Bali's western tip, its harbor running ferries to Banyuwangi in Java barely 2.5 kilometers across the strait, a crossing so short that some captains barely finish their paperwork before docking again. It also borders West Bali National Park, the last wild refuge of the Bali starling, a small white bird so close to extinction in the wild by the 1990s that most of the population alive today descends from captive-bred birds released back into the park.|Gilimanuk está en la punta occidental de Bali, y su puerto hace cruzar ferris hasta Banyuwangi, en Java, a apenas 2,5 kilómetros a través del estrecho, un trayecto tan corto que algunos capitanes casi no terminan el papeleo antes de volver a atracar. También linda con el Parque Nacional de Bali Occidental, último refugio salvaje del estornino de Bali, un ave blanca pequeña tan cercana a la extinción en libertad hacia los años noventa que la mayoría de la población actual desciende de aves criadas en cautiverio y liberadas de nuevo en el parque.|Gilimanuk se trouve à la pointe occidentale de Bali, et son port fait traverser des ferries jusqu'à Banyuwangi, sur Java, à peine 2,5 kilomètres plus loin, une traversée si courte que certains capitaines ont à peine le temps de finir leur paperasse avant de raccoster. Elle borde aussi le parc national de Bali occidental, dernier refuge sauvage de l'étourneau de Bali, un petit oiseau blanc si proche de l'extinction à l'état sauvage dans les années 1990 que la plupart des individus vivants aujourd'hui descendent d'oiseaux nés en captivité et relâchés dans le parc.|ギリマヌクはバリ島の西端にあり、その港からはわずか2.5キロメートルの海峡を渡ってジャワのバニュワンギへフェリーが行き来する。あまりに短い航路のため、船長が書類仕事を終える前に再び着岸してしまうこともあるという。この町はまた西バリ国立公園にも接しており、ここは1990年代までに野生下でほぼ絶滅寸前まで数を減らした白い小鳥、カンムリシロムクの最後の野生の避難地で、現在生きている個体の大半は飼育下で繁殖させ公園に放たれた鳥の子孫である。",
    [prop("Gilimanuk Harbor Ferry Ramp|Rampa del ferri del puerto de Gilimanuk|Rampe de ferry du port de Gilimanuk|ギリマヌク港のフェリー乗り場", 260, 54),
     prop("Bali Starling Aviary|Pajarera del estornino de Bali|Volière de l'étourneau de Bali|カンムリシロムクの飼育舎", 180, 38)],
  ),
  denpasar: city(
    "Denpasar|Denpasar|Denpasar|デンパサール",
    115.2192, -8.6705, "nut", "baligate", "baligate", "l",
    "A square named for a court that chose death over surrender|Una plaza que lleva el nombre de una corte que eligió morir antes que rendirse|Une place nommée d'après une cour qui choisit la mort plutôt que la reddition|降伏より死を選んだ王家にちなむ広場",
    "Denpasar's central Puputan Square is named for the 1906 puputan, a ritual mass death in which the Balinese royal court of Badung, dressed in white and armed mostly with ceremonial daggers, marched directly into Dutch colonial gunfire rather than surrender, an event repeated at other Balinese courts over the following two decades as the Netherlands completed its conquest of the island. Modern Denpasar is Bali's largest city and its administrative capital, though most visitors pass through without stopping on their way to the resort towns further south.|La plaza central Puputan de Denpasar debe su nombre al puputan de 1906, una muerte ritual masiva en la que la corte real balinesa de Badung, vestida de blanco y armada sobre todo con dagas ceremoniales, marchó directamente hacia el fuego colonial holandés antes que rendirse, un episodio repetido en otras cortes balinesas en las dos décadas siguientes mientras los Países Bajos completaban la conquista de la isla. La Denpasar moderna es la mayor ciudad de Bali y su capital administrativa, aunque la mayoría de los visitantes solo la atraviesan de camino a las localidades turísticas más al sur.|La place centrale Puputan de Denpasar tire son nom du puputan de 1906, une mort rituelle collective où la cour royale balinaise de Badung, vêtue de blanc et armée surtout de kriss cérémoniels, marcha droit sous le feu colonial hollandais plutôt que de se rendre, un épisode répété dans d'autres cours balinaises au cours des deux décennies suivantes tandis que les Pays-Bas achevaient la conquête de l'île. La Denpasar moderne est la plus grande ville de Bali et sa capitale administrative, bien que la plupart des visiteurs ne fassent qu'y passer en route vers les stations balnéaires plus au sud.|デンパサール中心部のププタン広場は、1906年のププタン(集団自死の儀礼)に由来する。バドゥンのバリ王家は白装束をまとい、儀礼用の短剣をおもな武器として、降伏する代わりにオランダ植民地軍の銃火へまっすぐ進んでいった。同様の出来事はその後20年でオランダがバリ島の征服を完了させるあいだ、他のバリの王家でも繰り返された。現在のデンパサールはバリ最大の都市であり行政上の州都だが、多くの観光客はここで立ち止まらず、さらに南のリゾート地へ通り過ぎていく。",
    [prop("Puputan Square Memorial|Monumento de la plaza Puputan|Mémorial de la place Puputan|ププタン広場の記念碑", 700, 145),
     prop("Badung Traditional Market|Mercado tradicional de Badung|Marché traditionnel de Badung|バドゥン伝統市場", 380, 79)],
  ),
  ubud: city(
    "Ubud|Ubud|Ubud|ウブド",
    115.2624, -8.5069, "nut", "riceterrace", "riceterrace", "r",
    "Rice fields governed by a philosophy older than the plumbing|Arrozales gobernados por una filosofía más antigua que las tuberías|Des rizières régies par une philosophie plus ancienne que la plomberie|配管より古い哲学に治められた田んぼ",
    "The terraced rice fields around Ubud are watered by subak, a cooperative irrigation system managed for at least a thousand years through Hindu water temples that decide planting schedules and divide river water among farmers according to religious as much as agricultural logic. UNESCO recognized the subak system as a cultural landscape in 2012, partly because it works as a living example of Tri Hita Karana, a philosophy holding harmony between people, nature, and the spiritual world as inseparable from good farming.|Los arrozales en terrazas alrededor de Ubud se riegan mediante el subak, un sistema de riego cooperativo gestionado durante al menos mil años a través de templos hindúes del agua que deciden los calendarios de siembra y reparten el agua del río entre los agricultores según una lógica tan religiosa como agrícola. La UNESCO reconoció el sistema subak como paisaje cultural en 2012, en parte porque funciona como ejemplo vivo del Tri Hita Karana, una filosofía que considera inseparables de una buena agricultura la armonía entre las personas, la naturaleza y el mundo espiritual.|Les rizières en terrasses autour d'Ubud sont irriguées par le subak, un système d'irrigation coopératif géré depuis au moins mille ans par des temples hindous de l'eau qui fixent les calendriers de plantation et répartissent l'eau des rivières entre agriculteurs selon une logique autant religieuse qu'agricole. L'UNESCO a reconnu le système subak comme paysage culturel en 2012, en partie parce qu'il illustre concrètement le Tri Hita Karana, une philosophie selon laquelle l'harmonie entre les hommes, la nature et le monde spirituel est indissociable d'une bonne agriculture.|ウブド周辺の棚田は「スバック」と呼ばれる共同灌漑制度で水を得ている。これは少なくとも千年にわたり、ヒンドゥーの水の寺院が田植えの時期を決め、農業だけでなく宗教的な論理に従って川の水を農家に分配することで運営されてきた。ユネスコは2012年、このスバックを文化的景観として認定したが、それは人と自然と精神世界の調和を良い農業と切り離せないものとする哲学「トリ・ヒタ・カラナ」の生きた実例でもあるためである。",
    [prop("Tegalalang Rice Terrace Viewpoint|Mirador de las terrazas de arroz de Tegalalang|Belvédère des rizières en terrasses de Tegalalang|テガラランの棚田展望台", 620, 129),
     prop("Ubud Art Market Stall|Puesto del mercado de arte de Ubud|Échoppe du marché de l'art d'Ubud|ウブド・アートマーケットの露店", 340, 71)],
  ),
  mataram: city(
    "Mataram|Mataram|Mataram|マタラム",
    116.1283, -8.5833, "nut", "mosque", "mosque", "l",
    "A strait that splits a faith and a whole world of wildlife|Un estrecho que divide una fe y todo un mundo de fauna|Un détroit qui sépare une foi et tout un monde de faune|信仰と生き物の世界を分ける海峡",
    "Lombok is nicknamed the Island of a Thousand Mosques, and Mataram's Islamic Center, completed in 2013 with a minaret tall enough to offer a rooftop view over the whole city, is the newest and largest expression of a Muslim majority that sets Lombok apart from Hindu-majority Bali just across a narrow strait. That strait roughly follows the Wallace Line, the biogeographic boundary where Asian and Australian wildlife meet, so the cultural divide between the two islands sits almost exactly on top of a much older natural one.|Lombok tiene el apodo de la Isla de las Mil Mezquitas, y el Centro Islámico de Mataram, terminado en 2013 con un minarete lo bastante alto para ofrecer vistas de toda la ciudad desde su cima, es la expresión más nueva y más grande de una mayoría musulmana que distingue a Lombok de la Bali de mayoría hindú, al otro lado de un estrecho canal. Ese estrecho sigue aproximadamente la Línea de Wallace, la frontera biogeográfica donde se encuentran la fauna asiática y la australiana, así que la división cultural entre las dos islas coincide casi exactamente con otra mucho más antigua, la natural.|Lombok est surnommée l'Île des mille mosquées, et le Centre islamique de Mataram, achevé en 2013 avec un minaret assez haut pour offrir une vue sur toute la ville depuis son sommet, est l'expression la plus récente et la plus imposante d'une majorité musulmane qui distingue Lombok de la Bali à majorité hindoue, juste de l'autre côté d'un étroit détroit. Ce détroit suit à peu près la ligne de Wallace, la frontière biogéographique où se rencontrent les faunes asiatique et australienne, si bien que la fracture culturelle entre les deux îles se superpose presque exactement à une fracture naturelle bien plus ancienne.|ロンボク島は「千のモスクの島」と呼ばれ、2013年に完成したマタラムのイスラミック・センターは、屋上から町全体を見渡せるほど高いミナレットを持ち、狭い海峡を挟んだヒンドゥー教徒多数派のバリ島とロンボク島を分けるムスリム多数派の、もっとも新しく大きな表れである。その海峡はおおむねウォーレス線に沿っており、これはアジアとオーストラリアの動物相が出会う生物地理学上の境界線であるため、二つの島の文化の分かれ目は、はるかに古い自然の分かれ目のほぼ真上に重なっている。",
    [prop("Islamic Center Minaret View|Vista desde el minarete del Centro Islámico|Vue depuis le minaret du Centre islamique|イスラミック・センターのミナレット展望", 560, 116),
     prop("Sasak Traditional Village House|Casa tradicional de un pueblo sasak|Maison traditionnelle d'un village sasak|ササック族の伝統家屋", 300, 62)],
  ),
  labuanbajo: city(
    "Labuan Bajo|Labuan Bajo|Labuan Bajo|ラブアンバジョ",
    119.85, -8.49, "nut", "dragon", "dragon", "r",
    "A lizard that turned out to bite with venom, not just germs|Un lagarto que resultó morder con veneno, no solo con gérmenes|Un lézard qui mord avec du venin, et pas seulement des microbes|細菌だけでなく毒でも噛みつくと分かったトカゲ",
    "Komodo dragons, the largest living lizards at up to 3 meters long, were long thought to kill prey with bacteria-laden saliva until a 2009 study found they actually have venom glands delivering an anticoagulant that keeps a bitten animal bleeding until it weakens enough to be finished off. Labuan Bajo, once a small fishing town, has grown rapidly since the 1980s into the main gateway for boat trips into Komodo National Park, where the dragons survive on only a handful of islands within a roughly 40-kilometer radius.|Los dragones de Komodo, los lagartos vivos más grandes, de hasta 3 metros de largo, se creyó durante mucho tiempo que mataban a sus presas con saliva cargada de bacterias, hasta que un estudio de 2009 descubrió que en realidad tienen glándulas de veneno que liberan un anticoagulante que mantiene sangrando al animal mordido hasta que se debilita lo suficiente para rematarlo. Labuan Bajo, antaño un pequeño pueblo pesquero, ha crecido con rapidez desde los años ochenta hasta convertirse en la principal puerta de entrada para las excursiones en barco al Parque Nacional de Komodo, donde los dragones sobreviven solo en un puñado de islas en un radio de unos 40 kilómetros.|Les dragons de Komodo, les plus grands lézards vivants avec jusqu'à 3 mètres de long, furent longtemps crus tuer leurs proies avec une salive chargée de bactéries, jusqu'à ce qu'une étude de 2009 révèle qu'ils possèdent en réalité des glandes à venin délivrant un anticoagulant qui fait saigner l'animal mordu jusqu'à ce qu'il s'affaiblisse assez pour être achevé. Labuan Bajo, jadis petit village de pêcheurs, s'est rapidement développée depuis les années 1980 pour devenir la principale porte d'entrée des excursions en bateau vers le parc national de Komodo, où les dragons ne survivent que sur une poignée d'îles dans un rayon d'environ 40 kilomètres.|コモドドラゴンは体長最大3メートルにもなる現生最大のトカゲで、長らく獲物を細菌まみれの唾液で仕留めると考えられてきたが、2009年の研究により、実際には抗凝固作用のある毒を出す毒腺を持ち、噛まれた動物が弱って仕留められるまで出血を止まらなくさせていることが分かった。かつて小さな漁村だったラブアンバジョは1980年代以降急速に発展し、半径およそ40キロメートルの一握りの島々にしか生き残っていないドラゴンを目当てにコモド国立公園へ向かう船旅の主要な玄関口となった。",
    [prop("Komodo Dragon Ranger Post|Puesto de guardabosques de dragones de Komodo|Poste de garde des dragons de Komodo|コモドドラゴンのレンジャー詰所", 620, 129),
     prop("Labuan Bajo Harbor Boat Pier|Muelle del puerto de Labuan Bajo|Jetée du port de Labuan Bajo|ラブアンバジョ港の船着き場", 360, 75)],
  ),
  ende: city(
    "Ende|Ende|Ende|エンデ",
    121.66, -8.84, "nut", "crater", "crater", "l",
    "Three lakes, one wall apart, that keep changing color|Tres lagos separados por un solo muro que no dejan de cambiar de color|Trois lacs séparés d'un simple mur, qui n'en finissent pas de changer de couleur|薄い壁一枚で隔てられ、色を変え続ける三つの湖",
    "Kelimutu's three crater lakes, each separated from the others by only a thin wall of rock, are famous for holding different colors at once, from turquoise to deep red to near-black, as volcanic gases dissolve different minerals into each basin, with the exact shades recorded shifting over decades of observation. The Lio people who live around the volcano traditionally believe the lakes are where souls go after death, sorted by age and moral conduct into their own separate basin.|Los tres lagos de cráter de Kelimutu, separados entre sí por un fino muro de roca, son famosos por tener a la vez colores distintos, de turquesa a rojo intenso o casi negro, mientras los gases volcánicos disuelven distintos minerales en cada cuenca, y los tonos exactos se han registrado cambiando a lo largo de décadas de observación. El pueblo lio, que vive en torno al volcán, cree tradicionalmente que los lagos son adonde van las almas tras la muerte, repartidas según edad y conducta moral en su propia cuenca.|Les trois lacs de cratère du Kelimutu, séparés les uns des autres par une simple paroi de roche, sont réputés pour arborer simultanément des couleurs différentes, du turquoise au rouge profond en passant par le presque noir, à mesure que les gaz volcaniques dissolvent des minéraux différents dans chaque bassin, des teintes dont les changements ont été observés sur des décennies. Le peuple lio, qui vit autour du volcan, croit traditionnellement que les lacs sont l'endroit où vont les âmes après la mort, réparties selon l'âge et la conduite morale dans leur propre bassin.|クリムトゥの三つの火口湖は、わずか薄い岩の壁で隔てられているだけなのに、それぞれターコイズ色、深い赤、ほとんど黒に近い色と、同時に異なる色を湛えることで知られる。これは火山ガスがそれぞれの湖盆に異なる鉱物を溶かし込むためで、その正確な色合いは何十年もの観察の中で移り変わってきた記録が残る。火山の周りに暮らすリオ族は伝統的に、この湖は死後に魂が行く場所であり、年齢と生前の行いによって別々の湖盆に振り分けられると信じている。",
    [prop("Kelimutu Crater Rim Trail|Sendero del borde del cráter Kelimutu|Sentier du bord du cratère du Kelimutu|クリムトゥ火口縁の登山道", 460, 96),
     prop("Sukarno Exile House Museum|Museo de la casa del exilio de Sukarno|Musée de la maison d'exil de Sukarno|スカルノ幽閉の家博物館", 260, 54)],
  ),
  waingapu: city(
    "Waingapu|Waingapu|Waingapu|ワインガプ",
    120.2833, -9.6567, "nut", "ikat", "ikat", "r",
    "Cloth that takes months, and a battle fought to bless the harvest|Un paño que tarda meses, y una batalla librada para bendecir la cosecha|Un tissu qui prend des mois, et une bataille livrée pour bénir la récolte|何か月もかかる布と、実りを祈って戦われる戦い",
    "Sumba's hand-woven ikat textiles can take months to finish, since the pattern is dyed into the thread itself before weaving begins, requiring painstaking alignment so the finished cloth's motifs of skulls, horses, and ancestral figures line up correctly, and the finest antique pieces trade among collectors for thousands of dollars. Each February and March, villages hold Pasola, a ritual battle in which horsemen throw blunt wooden spears at each other from a gallop, and traditionally believe that blood spilled in the clash fertilizes the year's rice harvest.|Los tejidos ikat hechos a mano en Sumba pueden tardar meses en terminarse, ya que el patrón se tiñe en el propio hilo antes de tejer, lo que exige un alineamiento meticuloso para que los motivos de calaveras, caballos y figuras ancestrales del paño acabado encajen bien, y las piezas antiguas más finas se venden entre coleccionistas por miles de dólares. Cada febrero y marzo, las aldeas celebran el Pasola, una batalla ritual en la que jinetes se arrojan lanzas de madera roma al galope, y creen tradicionalmente que la sangre derramada en el choque fertiliza la cosecha de arroz del año.|Les tissus ikat tissés à la main de Sumba peuvent prendre des mois à achever, le motif étant teint dans le fil lui-même avant le tissage, ce qui exige un alignement minutieux pour que les motifs de crânes, chevaux et figures ancestrales du tissu fini se correspondent, et les plus belles pièces anciennes se négocient entre collectionneurs pour des milliers de dollars. Chaque février et mars, les villages organisent le Pasola, une bataille rituelle où des cavaliers se lancent au galop des lances de bois émoussées, croyant traditionnellement que le sang versé dans l'affrontement fertilise la récolte de riz de l'année.|スンバ島の手織りイカット布は、模様を織る前の糸そのものに染め込むため、完成した布に骸骨や馬、祖先の姿の文様がきちんと合うよう細心の位置合わせが必要で、仕上がりまで数か月かかることもある。上質な古い一枚はコレクターのあいだで数千ドルで取引される。毎年2月から3月にかけて、村々ではパソラという儀礼の戦いが行われ、馬に乗った男たちが疾走しながら先を丸めた木槍を投げ合う。この衝突で流れる血がその年の稲の実りを肥やすと伝統的に信じられている。",
    [prop("Ikat Weaving Workshop|Taller de tejido ikat|Atelier de tissage ikat|イカット織りの工房", 340, 71),
     prop("Pasola Festival Field|Campo del festival Pasola|Champ du festival Pasola|パソラ祭りの馬場", 220, 46)],
  ),
  kupang: city(
    "Kupang|Kupang|Kupang|クパン",
    123.5931, -10.1772, "nut", "reef", "reef", "l",
    "The unlikely landing point of an open-boat survival voyage|El improbable punto de llegada de un viaje de supervivencia en bote abierto|Le point d'arrivée improbable d'un voyage de survie en canot ouvert|無甲板ボートの生還航海が行き着いた思いがけない地",
    "Kupang was the unlikely endpoint of one of history's most remarkable open-boat voyages: in 1789, Captain William Bligh and 18 loyal crew, set adrift by mutineers from HMS Bounty, navigated a 7-meter launch more than 6,000 kilometers across the Pacific and through the Indonesian archipelago on minimal rations, arriving here after 47 days with all but one man still alive. The city today serves as the main gateway to Indonesian West Timor, its waters marking one edge of the Coral Triangle, the global center of marine biodiversity.|Kupang fue el improbable punto final de uno de los viajes en bote abierto más notables de la historia: en 1789, el capitán William Bligh y 18 tripulantes leales, abandonados a la deriva por los amotinados del HMS Bounty, navegaron una lancha de 7 metros más de 6.000 kilómetros por el Pacífico y a través del archipiélago indonesio con raciones mínimas, llegando aquí tras 47 días con todos menos un hombre aún con vida. La ciudad sirve hoy como principal puerta de entrada al Timor Occidental indonesio, y sus aguas marcan un extremo del Triángulo de Coral, el centro mundial de la biodiversidad marina.|Kupang fut le point d'arrivée improbable de l'un des voyages en canot ouvert les plus remarquables de l'histoire : en 1789, le capitaine William Bligh et 18 hommes d'équipage restés loyaux, abandonnés à la dérive par les mutins du HMS Bounty, naviguèrent sur une chaloupe de 7 mètres sur plus de 6 000 kilomètres à travers le Pacifique et l'archipel indonésien avec des rations minimales, arrivant ici après 47 jours, tous sauf un homme encore en vie. La ville sert aujourd'hui de principale porte d'entrée du Timor occidental indonésien, ses eaux marquant l'une des limites du Triangle de corail, centre mondial de la biodiversité marine.|クパンは歴史上もっとも驚くべき無甲板ボートの航海の、思いがけない到着地となった。1789年、バウンティ号の反乱者たちに海へ置き去りにされたウィリアム・ブライ船長と忠実な18人の乗組員は、わずかな配給だけで全長7メートルの端艇に乗り太平洋からインドネシア諸島を6000キロメートル以上航海し、47日後、一人を除く全員が生きたままここへたどり着いた。この町は現在、インドネシア領西ティモールへの主要な玄関口として機能しており、その海域は海洋生物多様性の世界的中心地であるコーラル・トライアングルの一端をなす。",
    [prop("Bligh's Landing Memorial|Monumento del desembarco de Bligh|Mémorial du débarquement de Bligh|ブライ船長上陸の記念碑", 300, 62),
     prop("Lasiana Beach Reef Point|Punto de arrecife de la playa Lasiana|Point de récif de la plage de Lasiana|ラシアナ・ビーチの礁", 220, 46)],
  ),

  // ---------------------------------------------------------------------
  // kal — カリマンタン
  // ---------------------------------------------------------------------
  pontianak: city(
    "Pontianak|Pontianak|Pontianak|ポンティアナック",
    109.3425, -0.0263, "kal", "equator", "equator", "r",
    "A city on the line where noon sometimes casts no shadow|Una ciudad sobre la línea donde a mediodía a veces no hay sombra|Une ville sur la ligne où midi ne projette parfois aucune ombre|正午に影が消えることもある赤道の町",
    "Pontianak sits almost exactly on the equator, and its Tugu Khatulistiwa monument marks the line so precisely that on the equinoxes, for a brief moment near noon, a vertical pole there casts no shadow at all, an event the city marks each year with a small festival. The name Pontianak also refers to a vengeful female ghost of Malay folklore, and one origin story holds that the city's 18th-century Arab founder fired cannons into the riverbank jungle to drive off such spirits before settling there.|Pontianak está casi exactamente sobre el ecuador, y su monumento Tugu Khatulistiwa marca la línea con tal precisión que en los equinoccios, por un breve instante cerca del mediodía, un poste vertical allí no proyecta sombra alguna, un fenómeno que la ciudad celebra cada año con un pequeño festival. El nombre Pontianak también designa a un fantasma vengativo femenino del folclore malayo, y una historia sobre su origen cuenta que el fundador árabe de la ciudad, en el siglo XVIII, disparó cañonazos contra la selva de la orilla para ahuyentar a esos espíritus antes de asentarse allí.|Pontianak se trouve presque exactement sur l'équateur, et son monument Tugu Khatulistiwa marque la ligne avec une telle précision qu'aux équinoxes, un bref instant vers midi, un poteau vertical n'y projette plus aucune ombre, un événement que la ville célèbre chaque année par un petit festival. Le nom Pontianak désigne aussi un fantôme féminin vengeur du folklore malais, et une histoire raconte que le fondateur arabe de la ville, au XVIIIe siècle, tira des coups de canon dans la jungle des berges pour chasser ces esprits avant de s'y établir.|ポンティアナックはほぼ赤道の真上に位置しており、赤道記念塔トゥグ・カトゥリスティワはその線をあまりに正確に示すため、春分・秋分の日の正午前後の一瞬だけ、そこに立つ垂直の柱がまったく影を落とさなくなる。この現象は毎年町の小さな祭りで祝われる。「ポンティアナック」という名はマレーの民間伝承に伝わる復讐心を持つ女の幽霊の名でもあり、18世紀にこの町を築いたアラブ人の開祖が、そうした霊を追い払うため川岸のジャングルに大砲を撃ち込んでから居を構えたという由来譚もある。",
    [prop("Equator Monument Plaza|Plaza del monumento del ecuador|Esplanade du monument de l'équateur|赤道記念塔広場", 460, 96),
     prop("Kapuas Riverfront Market|Mercado ribereño del río Kapuas|Marché des berges de la rivière Kapuas|カプアス川沿いの市場", 280, 58)],
  ),
  balikpapan: city(
    "Balikpapan|Balikpapan|Balikpapan|バリクパパン",
    116.85, -1.24, "kal", "oilrig", "oilrig", "l",
    "An oil town since 1897, and now the gateway to a brand-new capital|Una ciudad petrolera desde 1897, ahora puerta de entrada a una capital totalmente nueva|Une ville pétrolière depuis 1897, aujourd'hui porte d'entrée d'une toute nouvelle capitale|1897年からの石油の町、いまは新首都への玄関口",
    "Balikpapan has pumped oil since 1897, when the Dutch trading firm that later became Royal Dutch Shell drilled the first well here, and the city remains one of Indonesia's most important energy hubs today, refining a large share of the country's crude. It also sits close enough to Nusantara, the new capital Indonesia began building on Borneo in 2022 to replace sinking Jakarta, that Balikpapan's airport has effectively become the gateway most officials and workers use to reach it.|Balikpapan extrae petróleo desde 1897, cuando la firma comercial holandesa que luego se convertiría en Royal Dutch Shell perforó aquí el primer pozo, y la ciudad sigue siendo hoy uno de los centros energéticos más importantes de Indonesia, refinando buena parte del crudo del país. También está lo bastante cerca de Nusantara, la nueva capital que Indonesia comenzó a construir en Borneo en 2022 para reemplazar a la hundida Yakarta, que el aeropuerto de Balikpapan se ha convertido de hecho en la puerta de entrada que usan la mayoría de funcionarios y trabajadores para llegar a ella.|Balikpapan pompe du pétrole depuis 1897, quand la société commerciale néerlandaise devenue plus tard Royal Dutch Shell y fora le premier puits, et la ville demeure aujourd'hui l'un des principaux pôles énergétiques d'Indonésie, raffinant une large part du brut national. Elle se trouve aussi assez près de Nusantara, la nouvelle capitale qu'Indonésie a commencé à bâtir à Bornéo en 2022 pour remplacer Jakarta en train de s'enfoncer, si bien que l'aéroport de Balikpapan est devenu de fait la porte d'entrée qu'empruntent la plupart des fonctionnaires et travailleurs pour s'y rendre.|バリクパパンは1897年以来石油を汲み上げ続けている。のちにロイヤル・ダッチ・シェルとなるオランダの商会がここで最初の油井を掘ったのが始まりで、この町はいまもインドネシア屈指のエネルギー拠点であり、国内の原油の多くを精製している。また、沈みゆくジャカルタに代わる新首都としてインドネシアが2022年からボルネオ島に建設を始めたヌサンタラにも近く、バリクパパンの空港は事実上、多くの政府関係者や労働者がそこへ向かうための玄関口となっている。",
    [prop("Old Refinery Overlook|Mirador de la antigua refinería|Belvédère de l'ancienne raffinerie|旧製油所の見晴らし台", 680, 141),
     prop("Nusantara Gateway Transit Hub|Centro de tránsito de acceso a Nusantara|Pôle de transit vers Nusantara|ヌサンタラ玄関口の乗継拠点", 420, 87)],
  ),
  banjarmasin: city(
    "Banjarmasin|Banjarmasin|Banjarmasin|バンジャルマシン",
    114.59, -3.32, "kal", "floatingmarket", "floatingmarket", "r",
    "A city trading at dawn from the deck of a canoe|Una ciudad que comercia al amanecer desde la cubierta de una canoa|Une ville qui commerce à l'aube depuis le pont d'une pirogue|舟の上で夜明けに商いをする町",
    "Banjarmasin's floating markets, most famously at Lok Baintan, open before dawn when women paddle narrow jukung canoes loaded with fruit, vegetables, and cooked food out onto the river to trade boat-to-boat, sometimes bartering goods directly rather than using cash. The city itself is built on stilts and canals across a delta so waterlogged that houses, mosques, and even cemeteries commonly stand on wooden pilings above the tide.|Los mercados flotantes de Banjarmasin, sobre todo el de Lok Baintan, abren antes del amanecer, cuando las mujeres reman canoas jukung estrechas cargadas de fruta, verdura y comida cocinada hacia el río para comerciar de barca a barca, a veces trocando bienes directamente en vez de usar dinero. La propia ciudad está construida sobre pilotes y canales en un delta tan anegado que casas, mezquitas e incluso cementerios se alzan comúnmente sobre pilotes de madera por encima de la marea.|Les marchés flottants de Banjarmasin, notamment celui de Lok Baintan, ouvrent avant l'aube, quand des femmes pagaient sur d'étroites pirogues jukung chargées de fruits, légumes et plats cuisinés pour commercer de bateau à bateau sur la rivière, troquant parfois directement les marchandises plutôt que d'utiliser de l'argent. La ville elle-même est bâtie sur pilotis et canaux dans un delta si détrempé que maisons, mosquées et même cimetières reposent souvent sur des pilotis de bois au-dessus de la marée.|バンジャルマシンの水上マーケット、なかでもロック・バインタンが有名だが、夜明け前に開かれ、女たちが果物や野菜、調理済みの食べ物を積んだ細長いジュコン舟を漕いで川へ出て、船同士で商いをする。時には現金を使わず、直接物々交換することもある。町自体、あまりに水浸しなデルタの上に運河と高床の杭で築かれており、家もモスクも、時には墓地さえも潮の上に木の杭を立てて建てられているのが普通である。",
    [prop("Lok Baintan Floating Market|Mercado flotante de Lok Baintan|Marché flottant de Lok Baintan|ロック・バインタン水上マーケット", 420, 87),
     prop("Stilt House Canal Walk|Paseo por el canal de casas sobre pilotes|Promenade du canal des maisons sur pilotis|高床家屋の運河沿いの道", 260, 54)],
  ),
  samarinda: city(
    "Samarinda|Samarinda|Samarinda|サマリンダ",
    117.15, -0.5022, "kal", "riverboat", "river", "r",
    "A river dolphin swimming a thousand kilometers from the sea|Un delfín de río que nada a mil kilómetros del mar|Un dauphin de rivière qui nage à mille kilomètres de la mer|海から千キロメートルも泳ぐ川イルカ",
    "The Mahakam River, which Samarinda straddles, is home to one of the world's few freshwater populations of Irrawaddy dolphins, a small round-headed species that can swim over a thousand kilometers upstream and is now critically endangered here, with only a few dozen individuals thought to remain. Boats still carry passengers and cargo far upriver from Samarinda into Dayak territory, where some communities live in traditional longhouses that can shelter dozens of families end to end.|El río Mahakam, a horcajadas del cual está Samarinda, alberga una de las pocas poblaciones de agua dulce en el mundo del delfín del Irrawaddy, una especie pequeña de cabeza redondeada capaz de nadar más de mil kilómetros río arriba y hoy en peligro crítico aquí, con solo unas pocas decenas de ejemplares que se cree que quedan. Los barcos siguen llevando pasajeros y carga río arriba desde Samarinda hasta territorio dayak, donde algunas comunidades viven en casas comunales tradicionales capaces de albergar a decenas de familias una junto a otra.|Le fleuve Mahakam, à cheval sur lequel se trouve Samarinda, abrite l'une des rares populations d'eau douce au monde de dauphins de l'Irrawaddy, une petite espèce à tête ronde capable de nager plus de mille kilomètres en amont et aujourd'hui gravement menacée ici, avec seulement quelques dizaines d'individus estimés survivre. Des bateaux transportent encore passagers et marchandises loin en amont de Samarinda jusqu'en territoire dayak, où certaines communautés vivent dans des maisons longues traditionnelles pouvant abriter des dizaines de familles bout à bout.|サマリンダをまたぐマハカム川には、世界でも数少ない淡水生のイラワジイルカの個体群がすむ。丸い頭を持つこの小柄な種は千キロメートル以上も上流まで泳ぐことができるが、いまやここでは深刻な絶滅の危機にあり、残っているのはわずか数十頭とみられている。船はいまもサマリンダからはるか川上のダヤク族の領域まで乗客や荷物を運んでおり、一部の集落ではいまも何十世帯もが端から端まで暮らせる伝統的な長屋(ロングハウス)で生活している。",
    [prop("Mahakam Riverboat Dock|Muelle de barcos fluviales del Mahakam|Débarcadère fluvial du Mahakam|マハカム川船着き場", 360, 75),
     prop("Upriver Dayak Longhouse Visit|Visita a una casa comunal dayak río arriba|Visite d'une maison longue dayak en amont|上流のダヤク族ロングハウス見学", 240, 50)],
  ),
  palangkaraya: city(
    "Palangka Raya|Palangka Raya|Palangka Raya|パランカラヤ",
    113.9213, -2.2161, "kal", "orangutan", "orangutan", "l",
    "A research camp watching wild orangutans since 1971|Un campamento de investigación que observa orangutanes salvajes desde 1971|Un camp de recherche qui observe des orangs-outans sauvages depuis 1971|1971年から野生オランウータンを見つめる調査基地",
    "Tanjung Puting National Park, reached by klotok houseboat from near Palangka Raya, has been a center for wild orangutan research since 1971, when the Lithuanian-Canadian primatologist Birutė Galdikas founded Camp Leakey there and began one of the longest continuous studies of any wild primate population on Earth. Sukarno himself once proposed moving Indonesia's capital to Palangka Raya in the 1950s for reasons much like those behind the current move to Nusantara, but the plan went nowhere for lack of funding.|El Parque Nacional de Tanjung Puting, al que se llega en casa flotante klotok desde cerca de Palangka Raya, es un centro de investigación sobre orangutanes salvajes desde 1971, cuando la primatóloga lituano-canadiense Birutė Galdikas fundó allí el Campamento Leakey e inició uno de los estudios continuos más largos de cualquier población de primates salvajes en el mundo. El propio Sukarno propuso una vez, en los años cincuenta, trasladar la capital de Indonesia a Palangka Raya por razones muy parecidas a las que hoy motivan el traslado a Nusantara, pero el plan no prosperó por falta de fondos.|Le parc national de Tanjung Puting, accessible en maison flottante klotok depuis les environs de Palangka Raya, est un centre de recherche sur les orangs-outans sauvages depuis 1971, quand la primatologue lituano-canadienne Birutė Galdikas y fonda le Camp Leakey et entama l'une des études continues les plus longues jamais menées sur une population de primates sauvages. Sukarno lui-même proposa dans les années 1950 de déplacer la capitale de l'Indonésie à Palangka Raya, pour des raisons proches de celles motivant aujourd'hui le déplacement vers Nusantara, mais le projet resta lettre morte faute de financement.|パランカラヤ近郊からクロトック(木造の屋形船)で行けるタンジュンプティン国立公園は、1971年以来野生オランウータン研究の拠点となってきた。リトアニア系カナダ人の霊長類学者ビルーテ・ガルディカスがそこにキャンプ・リーキーを開き、世界の野生霊長類個体群の中でも指折り長く続く継続調査を始めた場所である。スカルノ自身、1950年代にインドネシアの首都をパランカラヤへ移すことを提案しており、その理由は現在のヌサンタラへの遷都と驚くほど似ていたが、資金不足で計画は実現しなかった。",
    [prop("Camp Leakey Feeding Platform|Plataforma de alimentación del Campamento Leakey|Plateforme de nourrissage du Camp Leakey|キャンプ・リーキーの餌付け台", 460, 96),
     prop("Klotok Houseboat Dock|Muelle de casas flotantes klotok|Ponton des maisons flottantes klotok|クロトック屋形船の船着き場", 280, 58)],
  ),

  // ---------------------------------------------------------------------
  // sul — スラウェシ
  // ---------------------------------------------------------------------
  manado: city(
    "Manado|Manado|Manado|マナド",
    124.84, 1.47, "sul", "market", "market", "r",
    "A market that will sell you almost anything that once moved|Un mercado que te vende casi cualquier cosa que alguna vez se movió|Un marché qui vend presque tout ce qui, un jour, a bougé|かつて動いていたものならほぼ何でも売る市場",
    "Manado's Pasar Bersehati market is known nationwide for selling foods rarely eaten elsewhere in Indonesia, including grilled bat, python, forest rat, and dog, reflecting Minahasan cuisine's willingness to cook almost anything that moves, a tradition older than and separate from the region's now Christian-majority religious identity. Manado stands out as one of the most heavily Christian cities in Muslim-majority Indonesia, a legacy of early and thorough Dutch and Portuguese missionary work in the 16th and 17th centuries.|El mercado Pasar Bersehati de Manado es conocido en todo el país por vender alimentos que rara vez se comen en otras partes de Indonesia, como murciélago a la parrilla, pitón, rata de bosque y perro, reflejo de la disposición de la cocina minahasa a cocinar casi cualquier cosa que se mueva, una tradición más antigua y separada de la identidad religiosa hoy mayoritariamente cristiana de la región. Manado destaca como una de las ciudades más marcadamente cristianas de la Indonesia de mayoría musulmana, legado de una temprana y minuciosa labor misionera holandesa y portuguesa en los siglos XVI y XVII.|Le marché Pasar Bersehati de Manado est connu dans tout le pays pour vendre des aliments rarement mangés ailleurs en Indonésie, dont chauve-souris grillée, python, rat des forêts et chien, reflet de la volonté de la cuisine minahasa de cuisiner presque tout ce qui bouge, une tradition plus ancienne que l'identité aujourd'hui majoritairement chrétienne de la région, et distincte d'elle. Manado se distingue comme l'une des villes les plus chrétiennes de l'Indonésie à majorité musulmane, héritage d'un travail missionnaire hollandais et portugais précoce et approfondi aux XVIe et XVIIe siècles.|マナドのパサール・ブルセハティ市場は、インドネシアの他の地域ではあまり食べられない食材、たとえば炙ったコウモリやニシキヘビ、森ネズミ、犬などを売ることで全国的に知られており、これはミナハサ料理が動くものならほぼ何でも料理してきた伝統を映すもので、この地域が現在キリスト教多数派である宗教的な特徴とは別に、それより古くからある習わしである。マナドはムスリム多数派のインドネシアの中でも屈指のキリスト教色が強い都市で、16〜17世紀にオランダとポルトガルの宣教活動が早くから徹底して行われた名残である。",
    [prop("Pasar Bersehati Market Stall|Puesto del mercado Pasar Bersehati|Échoppe du marché Pasar Bersehati|パサール・ブルセハティの露店", 380, 79),
     prop("Manado Bay Waterfront|Paseo marítimo de la bahía de Manado|Front de mer de la baie de Manado|マナド湾の海岸通り", 260, 54)],
  ),
  kendari: city(
    "Kendari|Kendari|Kendari|クンダリ",
    122.5150, -3.9985, "sul", "nickel", "nickel", "l",
    "A port shipping the metal an EV battery needs|Un puerto que embarca el metal que necesita una batería de coche eléctrico|Un port qui expédie le métal dont a besoin une batterie de voiture électrique|電気自動車の電池に要る金属を積み出す港",
    "Southeast Sulawesi's hills hold some of Indonesia's richest nickel deposits, and after the government banned exports of raw, unprocessed ore in 2020 to force miners to build smelters at home rather than ship the ore abroad, the province became one of the engines behind Indonesia's rise to producing roughly half the world's nickel, a metal now central to electric-vehicle batteries. Kendari, the provincial capital built around a long natural harbor, ships much of that ore and processed metal out through a port that barely registered on regional trade maps two decades ago.|Las colinas del sureste de Sulawesi contienen algunos de los depósitos de níquel más ricos de Indonesia, y tras prohibir el gobierno en 2020 la exportación de mineral en bruto para obligar a los mineros a construir fundiciones en el país, la provincia se convirtió en uno de los motores del ascenso de Indonesia hasta producir cerca de la mitad del níquel mundial. Kendari, la capital provincial construida en torno a un largo puerto natural, embarca buena parte de ese mineral y metal procesado por un puerto que apenas figuraba en los mapas comerciales regionales hace dos décadas.|Les collines du sud-est de Sulawesi renferment certains des gisements de nickel les plus riches d'Indonésie, et après que le gouvernement eut interdit en 2020 l'exportation de minerai brut pour forcer les mineurs à bâtir des fonderies sur place, la province devint l'un des moteurs de l'essor de l'Indonésie, qui produit désormais près de la moitié du nickel mondial. Kendari, capitale provinciale bâtie autour d'un long port naturel, expédie une bonne part de ce minerai et de ce métal transformé par un port qui figurait à peine sur les cartes commerciales régionales il y a vingt ans.|南東スラウェシの丘陵地帯にはインドネシア屈指のニッケル鉱床が眠っており、2020年に政府が未加工鉱石の輸出を禁じ、鉱山会社に鉱石を海外へ送る代わり自国内に製錬所を建てさせて以来、この州はインドネシアを世界のニッケル生産のおよそ半分を占める国へと押し上げた原動力の一つとなった。ニッケルはいまや電気自動車の電池に欠かせない金属である。長い天然の良港を囲んで築かれた州都クンダリは、その鉱石と加工された金属の多くを、二十年前には地域の交易地図にほとんど載っていなかった港から積み出している。",
    [prop("Kendari Bay Ore Terminal|Terminal de mineral de la bahía de Kendari|Terminal minéralier de la baie de Kendari|クンダリ湾の鉱石ターミナル", 380, 79),
     prop("Kendari Beach Waterfront|Paseo marítimo de la playa de Kendari|Front de mer de la plage de Kendari|クンダリ・ビーチの海岸通り", 240, 50)],
  ),
  gorontalo: city(
    "Gorontalo|Gorontalo|Gorontalo|ゴロンタロ",
    123.0642, 0.5412, "sul", "stilthouse", "stilthouse", "r",
    "Neighborhoods where the walkways are the only streets|Barrios donde las pasarelas son las únicas calles|Des quartiers où les passerelles sont les seules rues|渡り橋だけが通りである街区",
    "Along Gorontalo's coast, whole neighborhoods of the Bajau people, sometimes called sea nomads, are built entirely on stilts over the water and connected by wooden walkways rather than roads, a way of life that traditionally kept some Bajau families living aboard boats for months without ever setting foot on dry land. Gorontalo's own historic nickname, Serambi Madinah, or \"verandah of Medina,\" reflects centuries as a center of Islamic scholarship in the region, predating the arrival of Dutch colonial administration.|A lo largo de la costa de Gorontalo, barrios enteros del pueblo bajau, a veces llamados nómadas del mar, están construidos por completo sobre pilotes en el agua y unidos por pasarelas de madera en vez de calles, un modo de vida que tradicionalmente mantenía a algunas familias bajau viviendo a bordo de barcos durante meses sin pisar tierra firme. El propio apodo histórico de Gorontalo, Serambi Madinah, o «porche de Medina», refleja siglos como centro de estudios islámicos en la región, anteriores a la llegada de la administración colonial holandesa.|Le long de la côte de Gorontalo, des quartiers entiers du peuple bajau, parfois appelé nomades de la mer, sont bâtis entièrement sur pilotis au-dessus de l'eau et reliés par des passerelles de bois plutôt que par des routes, un mode de vie qui maintenait traditionnellement certaines familles bajau à bord de leurs bateaux pendant des mois sans jamais poser le pied sur la terre ferme. Le surnom historique de Gorontalo elle-même, Serambi Madinah, ou « véranda de Médine », reflète des siècles passés comme centre d'érudition islamique dans la région, antérieurs à l'arrivée de l'administration coloniale néerlandaise.|ゴロンタロの海岸沿いには、「海のノマド」とも呼ばれるバジャウ族の集落全体が水上の杭の上にまるごと建てられ、道路の代わりに木の渡り橋でつながっている街区がある。こうした暮らしの中で一部のバジャウの家族は伝統的に、何か月も陸に一度も足をつけないまま船の上で暮らし続けていた。ゴロンタロ自体の古くからの呼び名「セランビ・マディナ(メディナの縁側)」は、オランダ植民地行政が来る以前から、この地域が何世紀にもわたりイスラム学問の中心地だったことを表している。",
    [prop("Bajau Stilt Village Walkway|Pasarela de un pueblo bajau sobre pilotes|Passerelle d'un village bajau sur pilotis|バジャウ族の水上集落の渡り橋", 320, 67),
     prop("Gorontalo Old Mosque Courtyard|Patio de la mezquita antigua de Gorontalo|Cour de la vieille mosquée de Gorontalo|ゴロンタロ旧モスクの中庭", 220, 46)],
  ),
  makassar: city(
    "Makassar|Makassar|Makassar|マカッサル",
    119.43, -5.15, "sul", "phinisi", "phinisi", "l",
    "Wooden ships still built entirely without a blueprint|Barcos de madera aún construidos sin planos|Des navires de bois toujours construits sans le moindre plan|設計図なしにいまも造られる木造船",
    "Bugis and Konjo shipwrights at Tanjung Bira near Makassar still build phinisi schooners entirely by eye and inherited knowledge, without written blueprints, using wooden pegs rather than nails, a tradition UNESCO recognized as intangible cultural heritage in 2017. Some of these vessels, though now often fitted with engines, still work as inter-island cargo boats and liveaboard dive charters, making phinisi possibly the oldest working ship design still in commercial use anywhere in the world.|Los carpinteros navales bugis y konjo de Tanjung Bira, cerca de Makassar, siguen construyendo goletas phinisi enteramente a ojo y con saber heredado, sin planos escritos, usando clavijas de madera en vez de clavos, una tradición que la UNESCO reconoció como patrimonio cultural inmaterial en 2017. Algunos de estos barcos, aunque hoy suelen llevar motor, siguen funcionando como cargueros interinsulares y cruceros de buceo con alojamiento a bordo, lo que hace del phinisi posiblemente el diseño de barco en uso comercial más antiguo del mundo.|Les charpentiers de marine bugis et konjo de Tanjung Bira, près de Makassar, construisent encore les goélettes phinisi entièrement à l'œil et selon un savoir transmis, sans plans écrits, en utilisant des chevilles de bois plutôt que des clous, une tradition reconnue par l'UNESCO comme patrimoine culturel immatériel en 2017. Certains de ces navires, bien que souvent équipés de moteurs aujourd'hui, servent encore de cargos inter-îles et de bateaux de croisière-plongée, faisant du phinisi peut-être le plus vieux modèle de navire encore en usage commercial dans le monde.|マカッサル近郊のタンジュンビラのブギス族・コンジョ族の船大工たちは、いまも文書化された設計図を使わず、目と受け継いだ知識だけでピニシ帆船を造り、釘ではなく木の栓を用いる。この伝統は2017年、ユネスコの無形文化遺産に登録された。これらの船の一部は今ではエンジンを備えていることも多いが、いまも島々を結ぶ貨物船やダイビング用の宿泊クルーズ船として働いており、ピニシは世界でもおそらく現役で商業利用されている最も古い船の設計といえる。",
    [prop("Fort Rotterdam Bastion Wall|Muralla del bastión del Fuerte Rotterdam|Mur du bastion du fort Rotterdam|ロッテルダム要塞の稜堡", 700, 145),
     prop("Paotere Traditional Harbor|Puerto tradicional de Paotere|Port traditionnel de Paotere|パオテレ伝統港", 380, 79)],
  ),
  tanatoraja: city(
    "Tana Toraja|Tana Toraja|Tana Toraja|タナトラジャ",
    119.8946, -2.9701, "sul", "tongkonan", "tongkonan", "r",
    "A funeral that can wait years while the family saves for a buffalo|Un funeral que puede esperar años mientras la familia ahorra para un búfalo|Des funérailles qui peuvent attendre des années le temps d'économiser pour un buffle|水牛を買う金が貯まるまで何年も待てる葬儀",
    "In Torajan tradition, a person is not considered truly dead until an elaborate funeral ceremony has been held, so families sometimes keep a deceased relative at home, treated as merely sick, for months or even years while they save enough money and buffalo for a proper send-off, since a single sacrificed buffalo can cost more than a car. The soaring, boat-shaped roofs of tongkonan ancestral houses, arranged to face north and clustered around family compounds, are raised without nails using an interlocking wooden frame passed down through generations of builders.|En la tradición torajana, una persona no se considera realmente muerta hasta que se ha celebrado una elaborada ceremonia fúnebre, así que las familias a veces mantienen en casa a un pariente fallecido, tratado como si solo estuviera enfermo, durante meses o incluso años mientras ahorran suficiente dinero y búfalos para una despedida adecuada, ya que un solo búfalo sacrificado puede costar más que un coche. Los tejados en forma de barco de las casas ancestrales tongkonan, orientados hacia el norte y agrupados en torno a los recintos familiares, se levantan sin clavos con un armazón de madera entrelazado transmitido por generaciones de constructores.|Dans la tradition torajane, une personne n'est pas considérée comme véritablement morte tant qu'une cérémonie funéraire élaborée n'a pas eu lieu, si bien que les familles gardent parfois un proche décédé à la maison, traité comme simplement malade, pendant des mois voire des années, le temps d'économiser assez d'argent et de buffles pour des adieux dignes de ce nom, un seul buffle sacrifié pouvant coûter plus cher qu'une voiture. Les toits élancés en forme de bateau des maisons ancestrales tongkonan, orientés vers le nord et regroupés autour des enclos familiaux, sont montés sans clous grâce à une charpente de bois entrelacée transmise de génération en génération de bâtisseurs.|トラジャの伝統では、盛大な葬儀が営まれるまで人は本当に死んだとはみなされない。そのため家族は亡くなった親族を「ただの病人」として家に留め置き、きちんとした見送りに十分な金と水牛を用意できるまで、数か月、時には数年も待つことがある。犠牲に捧げる水牛一頭が車一台より高くつくこともあるためである。北を向くよう配置され、一族の敷地を囲んで並ぶトンコナン(祖先の家)の反り上がった舟形の屋根は、釘を使わず、代々の建て手から受け継がれた組木の枠組みだけで組み上げられる。",
    [prop("Tongkonan Ancestral House Compound|Recinto de casas ancestrales tongkonan|Enclos des maisons ancestrales tongkonan|トンコナン祖先の家の敷地", 500, 104),
     prop("Buffalo Market Trading Ground|Terreno del mercado de búfalos|Terrain du marché aux buffles|水牛市場の取引場", 280, 58)],
  ),
  palopo: city(
    "Palopo|Palopo|Palopo|パロポ",
    120.1958, -2.9925, "sul", "mosque", "mosque", "l",
    "A Bugis kingdom's court that converted to Islam by treaty|Una corte del reino bugis que se convirtió al islam por tratado|Une cour du royaume bugis convertie à l'islam par traité|条約でイスラムに改宗したブギス王国の宮廷",
    "Palopo was the seat of the Luwu sultanate, remembered by Bugis and Torajan tradition alike as the oldest and most senior of South Sulawesi's kingdoms even after younger courts at Gowa and Bone eclipsed it in wealth and power, and it formally adopted Islam in 1603 when its ruler accepted teachers sent from the newly converted court of Gowa. The city sits where the Trans-Sulawesi highway rounds the head of the Gulf of Bone, a junction that still makes it the natural stopover between the island's southern and northern peninsulas.|Palopo fue la sede del sultanato de Luwu, recordado por la tradición bugis y torajana como el más antiguo y prestigioso de los reinos del sur de Sulawesi incluso después de que cortes más jóvenes como Gowa y Bone lo eclipsaran en riqueza y poder, y adoptó formalmente el islam en 1603 cuando su gobernante aceptó a maestros enviados desde la corte recién convertida de Gowa.|Palopo fut le siège du sultanat de Luwu, considéré par la tradition bugis et torajane comme le plus ancien et le plus prestigieux des royaumes du sud de Sulawesi même après que des cours plus jeunes comme Gowa et Bone l'eurent éclipsé en richesse et en puissance, et il adopta formellement l'islam en 1603 quand son souverain accueillit des maîtres envoyés par la cour tout juste convertie de Gowa.|パロポはルウ王国の王都であり、ゴワやボネといった後発の王国が富と力でこれを凌駕したのちも、ブギス族とトラジャ族双方の伝承では南スラウェシで最も古く格の高い王国として記憶されている。1603年、改宗したばかりのゴワ王国から派遣された教師を君主が受け入れたことで、正式にイスラム教を採り入れた。この町はトランス・スラウェシ道路がボネ湾の湾奥を回り込む地点にあり、いまも島の南半島と北半島を結ぶ自然な中継地となっている。",
    [prop("Luwu Sultanate Palace Grounds|Terrenos del palacio del sultanato de Luwu|Terrain du palais du sultanat de Luwu|ルウ王宮跡地", 300, 62),
     prop("Bone Gulf Highway Rest Stop|Área de descanso de la carretera del golfo de Bone|Aire de repos de la route du golfe de Bone|ボネ湾道路の休憩所", 200, 42)],
  ),
  wakatobi: city(
    "Wakatobi|Wakatobi|Wakatobi|ワカトビ",
    123.6, -5.35, "sul", "reef", "reef", "l",
    "One national park holding nearly every coral species alive|Un parque nacional que reúne casi todas las especies de coral vivas|Un parc national réunissant presque toutes les espèces de corail vivantes|現生サンゴのほぼすべてを抱く一つの国立公園",
    "Wakatobi takes its name from the first syllables of its four main islands, Wangi-Wangi, Kaledupa, Tomia, and Binongko, and the marine park surrounding them protects roughly 750 of the estimated 850 coral species found anywhere in the world's oceans, all within a single national park. Its remoteness, far from Sulawesi's mainland and without an international airport until relatively recently, kept the reefs comparatively undisturbed even as diving tourism transformed better-known parts of Indonesia.|Wakatobi toma su nombre de las primeras sílabas de sus cuatro islas principales, Wangi-Wangi, Kaledupa, Tomia y Binongko, y el parque marino que las rodea protege unas 750 de las aproximadamente 850 especies de coral que existen en los océanos del mundo, todas dentro de un único parque nacional. Su lejanía, alejado del continente de Sulawesi y sin aeropuerto internacional hasta hace relativamente poco, mantuvo los arrecifes comparativamente intactos incluso mientras el turismo de buceo transformaba zonas más conocidas de Indonesia.|Wakatobi tire son nom des premières syllabes de ses quatre îles principales, Wangi-Wangi, Kaledupa, Tomia et Binongko, et le parc marin qui les entoure protège environ 750 des quelque 850 espèces de corail recensées dans les océans du monde, toutes réunies au sein d'un seul parc national. Son isolement, loin du continent de Sulawesi et sans aéroport international jusqu'à une date relativement récente, a préservé des récifs relativement intacts alors même que le tourisme de plongée transformait des régions plus connues d'Indonésie.|ワカトビという名は、四つの主要な島ワンギワンギ・カレドゥパ・トミア・ビノンコの頭文字を取ったもので、それらを囲む海洋公園は、世界の海に生息するとされる約850種のサンゴのうちおよそ750種を、たった一つの国立公園の中に保護している。スラウェシ本土から遠く、比較的最近まで国際空港も無かったその辺境ぶりが、ダイビング観光がインドネシアのよく知られた地域を一変させるあいだも、比較的手つかずのサンゴ礁を保ち続けさせた。",
    [prop("House Reef Jetty|Embarcadero del arrecife junto a la costa|Jetée du récif de rivage|ハウスリーフの桟橋", 380, 79),
     prop("Coral Nursery Dive Site|Punto de buceo del vivero de coral|Site de plongée de la pouponnière corallienne|サンゴの育成場ダイブスポット", 240, 50)],
  ),

  // ---------------------------------------------------------------------
  // mlp — マルク・パプア
  // ---------------------------------------------------------------------
  ternate: city(
    "Ternate|Ternate|Ternate|テルナテ",
    127.30, 0.78, "mlp", "clove", "volcano", "l",
    "A spice so valuable it helped draw a line across the globe|Una especia tan valiosa que ayudó a trazar una línea a través del globo|Une épice si précieuse qu'elle contribua à tracer une ligne autour du globe|地球を一周する境界線を引かせたほど貴重な香辛料",
    "Ternate's clove trade made this small volcanic island wealthy and strategically vital enough that European powers fought over it for more than a century: the 1529 Treaty of Zaragoza drew a line across the globe partly to settle Spanish and Portuguese claims to it, and the Dutch later tried to enforce a total monopoly by uprooting clove trees on every other island in the region. Mount Gamalama, the volcano that forms almost the entire island, still erupts periodically and has forced evacuations as recently as the 2010s.|El comercio de clavo de Ternate hizo rica y estratégicamente vital a esta pequeña isla volcánica hasta el punto de que las potencias europeas se disputaron su control durante más de un siglo: el Tratado de Zaragoza de 1529 trazó una línea a través del globo en parte para resolver las reclamaciones españolas y portuguesas sobre ella, y los holandeses después intentaron imponer un monopolio total arrancando árboles de clavo en todas las demás islas de la región. El monte Gamalama, el volcán que forma casi toda la isla, sigue entrando en erupción periódicamente y ha obligado a evacuaciones tan recientes como en la década de 2010.|Le commerce du clou de girofle fit de Ternate, cette petite île volcanique, un lieu si riche et si stratégique que les puissances européennes s'y affrontèrent pendant plus d'un siècle : le traité de Saragosse de 1529 traça une ligne autour du globe en partie pour régler les revendications espagnoles et portugaises sur elle, et les Hollandais tentèrent ensuite d'imposer un monopole total en arrachant les girofliers de toutes les autres îles de la région. Le mont Gamalama, le volcan qui forme presque toute l'île, entre encore périodiquement en éruption et a forcé des évacuations aussi récemment que dans les années 2010.|テルナテの丁子(クローブ)交易は、この小さな火山島を豊かにし、戦略的に極めて重要な地とした結果、ヨーロッパ列強は一世紀以上にわたりこの島をめぐって争った。1529年のサラゴサ条約は、スペインとポルトガルのこの島への領有権争いを決着させるためもあって、地球を一周する境界線を引いたほどである。のちにオランダは、地域の他の島々の丁子の木をすべて引き抜くことで完全な独占を強行しようとした。島のほぼ全体を形づくるガマラマ山は、いまも定期的に噴火を続けており、2010年代にも避難を余儀なくされている。",
    [prop("Sultan's Palace Clove Garden|Jardín de clavo del palacio del sultán|Jardin de girofliers du palais du sultan|スルタン宮殿の丁子庭園", 500, 104),
     prop("Gamalama Crater Trail|Sendero del cráter del Gamalama|Sentier du cratère du Gamalama|ガマラマ山火口の登山道", 280, 58)],
  ),
  ambon: city(
    "Ambon|Ambon|Ambon|アンボン",
    128.15, -3.68, "mlp", "port", "port", "r",
    "A nutmeg island once traded away for Manhattan|Una isla de nuez moscada cambiada una vez por Manhattan|Une île de muscade jadis échangée contre Manhattan|かつてマンハッタンと引き換えにされたナツメグの島",
    "The Dutch and English fought so fiercely over nutmeg from the nearby Banda Islands, then the only place on Earth the tree grew wild, that the 1667 Treaty of Breda finally settled matters by having the Dutch trade the tiny nutmeg island of Run to England in exchange for a much larger English colony: Manhattan. Ambon, the regional capital and largest port in the Moluccas, grew rich administering that spice trade and still shows layers of Portuguese, Dutch, and Islamic sultanate history in its old town.|Los holandeses y los ingleses se disputaron con tanta ferocidad la nuez moscada de las cercanas islas Banda, entonces el único lugar del mundo donde el árbol crecía silvestre, que el Tratado de Breda de 1667 zanjó finalmente el asunto haciendo que los holandeses cedieran a Inglaterra la diminuta isla de la nuez moscada, Run, a cambio de una colonia inglesa mucho mayor: Manhattan. Ambon, capital regional y mayor puerto de las Molucas, se enriqueció administrando ese comercio de especias y su casco antiguo aún muestra capas de historia portuguesa, holandesa e islámica del sultanato.|Hollandais et Anglais se disputèrent si férocement la muscade des proches îles Banda, alors seul endroit au monde où l'arbre poussait à l'état sauvage, que le traité de Bréda de 1667 régla finalement l'affaire en faisant céder par les Hollandais la minuscule île à muscade de Run aux Anglais, en échange d'une colonie anglaise bien plus vaste : Manhattan. Ambon, capitale régionale et plus grand port des Moluques, s'enrichit en administrant ce commerce des épices et son vieux quartier montre encore des strates d'histoire portugaise, hollandaise et du sultanat islamique.|オランダとイギリスは、当時世界でこの木が野生に育つ唯一の場所だった近隣のバンダ諸島産のナツメグをめぐってあまりに激しく争ったため、1667年のブレダ条約は最終的に、オランダが小さなナツメグの島ランをイギリスへ譲り渡す代わりに、はるかに大きなイギリス植民地マンハッタンを手にすることで決着をつけた。マルク諸島の地方都市であり最大の港であるアンボンは、その香辛料交易を差配することで富み、旧市街にはいまもポルトガル・オランダ・イスラム王国それぞれの歴史の層が残っている。",
    [prop("Fort Victoria Ramparts|Murallas del Fuerte Victoria|Remparts du fort Victoria|ヴィクトリア要塞の城壁", 560, 116),
     prop("Ambon Bay Spice Warehouse|Almacén de especias de la bahía de Ambon|Entrepôt à épices de la baie d'Ambon|アンボン湾の香辛料倉庫", 320, 67)],
  ),
  sorong: city(
    "Sorong|Sorong|Sorong|ソロン",
    131.2558, -0.8833, "mlp", "birdparadise", "birdparadise", "l",
    "Birds so strange that early collectors doubted they had feet|Aves tan extrañas que los primeros coleccionistas dudaban que tuvieran patas|Des oiseaux si étranges que les premiers collectionneurs doutaient qu'ils eussent des pattes|脚があることさえ疑われたほど奇妙な鳥",
    "The forests around Sorong, on the tip of the Bird's Head Peninsula, hold some of the greatest concentrations of bird-of-paradise species anywhere, birds whose extravagant plumage and dance displays so puzzled early European naturalists that some 19th-century scientists, working from skins traded with the legs removed, assumed the birds spent their entire lives in flight without ever landing. Sorong itself functions mainly as the gateway city travelers pass through by plane and ferry on their way to the reefs of Raja Ampat rather than a destination in its own right.|Los bosques en torno a Sorong, en la punta de la península de la Cabeza de Pájaro, albergan algunas de las mayores concentraciones de aves del paraíso del mundo, aves cuyo plumaje extravagante y danzas desconcertaron tanto a los primeros naturalistas europeos que algunos científicos del siglo XIX, trabajando con pieles comerciadas sin las patas, supusieron que las aves pasaban toda su vida en vuelo sin posarse jamás. Sorong funciona sobre todo como ciudad de tránsito por la que los viajeros pasan en avión y ferri de camino a los arrecifes de Raja Ampat, más que como destino en sí misma.|Les forêts autour de Sorong, à la pointe de la péninsule de la Tête d'Oiseau, abritent l'une des plus fortes concentrations d'oiseaux de paradis au monde, des oiseaux dont le plumage extravagant et les parades ont tant intrigué les premiers naturalistes européens que certains scientifiques du XIXe siècle, travaillant à partir de peaux commercialisées sans les pattes, supposèrent que ces oiseaux passaient toute leur vie en vol sans jamais se poser. Sorong elle-même sert surtout de ville-porte par laquelle les voyageurs transitent en avion et en ferry en route vers les récifs de Raja Ampat, plutôt que d'être une destination en soi.|鳥の頭半島の先端に位置するソロン周辺の森には、世界でも屈指の密度で極楽鳥の仲間が生息しており、その華麗な羽と求愛の舞は初期のヨーロッパの博物学者を大いに困惑させた。19世紀の一部の科学者は、脚を取り除いて交易された剥製標本だけを頼りに、この鳥は生涯ずっと飛び続け、決して地に降りないのだと考えたほどである。ソロン自体は、それ自体が目的地というよりも、旅行者が飛行機やフェリーでラジャアンパットのサンゴ礁へ向かう途中に通り過ぎる玄関口として機能している。",
    [prop("Bird-of-Paradise Forest Trail|Sendero forestal del ave del paraíso|Sentier forestier de l'oiseau de paradis|極楽鳥の森の遊歩道", 400, 83),
     prop("Sorong Harbor Ferry Terminal|Terminal de ferris del puerto de Sorong|Terminal de ferry du port de Sorong|ソロン港フェリーターミナル", 260, 54)],
  ),
  bandaneira: city(
    "Banda Neira|Banda Neira|Banda Neira|バンダネイラ",
    129.897, -4.525, "mlp", "fort", "volcano", "r",
    "An island worth more, ounce for ounce, than gold, and a massacre to keep it|Una isla que valía, onza por onza, más que el oro, y una masacre para conservarla|Une île qui valait, once pour once, plus que l'or, et un massacre pour la garder|重さあたり金より高値だった島と、それを守るための虐殺",
    "Banda Neira was the administrative seat of the Banda Islands, the only place on Earth nutmeg grew before the 19th century, and in 1621 the Dutch East India Company's governor Jan Pieterszoon Coen enforced a trade monopoly here by killing or deporting nearly the entire Bandanese population, replacing them with enslaved laborers to run the plantations under Dutch control. Two colonial forts, Belgica and Nassau, still stand guard over the harbor, built to defend a spice once traded, weight for weight, above the price of gold.|Banda Neira fue la sede administrativa de las islas Banda, el único lugar del mundo donde crecía la nuez moscada antes del siglo XIX, y en 1621 el gobernador de la Compañía Neerlandesa de las Indias Orientales, Jan Pieterszoon Coen, impuso aquí un monopolio comercial matando o deportando a casi toda la población bandanesa, sustituida por trabajadores esclavizados. Dos fuertes coloniales, Belgica y Nassau, siguen vigilando el puerto, construidos para defender una especia antaño más cara que el oro, onza por onza.|Banda Neira fut le siège administratif des îles Banda, seul endroit au monde où poussait la muscade avant le XIXe siècle, et en 1621 le gouverneur de la Compagnie néerlandaise des Indes orientales, Jan Pieterszoon Coen, y imposa un monopole commercial en tuant ou déportant la quasi-totalité de la population bandanaise, remplacée par une main-d'œuvre réduite en esclavage. Deux forts coloniaux, Belgica et Nassau, gardent encore le port, bâtis pour défendre une épice jadis échangée, once pour once, plus cher que l'or.|バンダネイラはバンダ諸島の行政の中心地で、19世紀以前は世界でこの島々にしか育たなかったナツメグの産地だった。1621年、オランダ東インド会社総督ヤン・ピーテルスゾーン・クーンはここで交易独占を強行するため、バンダの住民をほぼ皆殺しか国外追放にし、代わりに奴隷労働者をオランダの支配下でプランテーションに就かせた。ベルヒカとナッサウという二つの植民地時代の要塞は、重さあたり金より高値で取引されたこの香辛料を守るため築かれ、いまも港を見張り続けている。",
    [prop("Fort Belgica Ramparts|Murallas del Fuerte Belgica|Remparts du fort Belgica|ベルヒカ要塞の城壁", 460, 96),
     prop("Nutmeg Plantation Terrace|Terraza de la plantación de nuez moscada|Terrasse de la plantation de muscade|ナツメグ農園のテラス", 280, 58)],
  ),
  manokwari: city(
    "Manokwari|Manokwari|Manokwari|マノクワリ",
    134.0620, -0.8615, "mlp", "port", "port", "r",
    "Where two missionaries stepped ashore in 1855|Donde dos misioneros desembarcaron en 1855|Où deux missionnaires débarquèrent en 1855|1855年に二人の宣教師が上陸した地",
    "Two German missionaries, Carl Ottow and Johann Geissler, waded ashore near Manokwari on February 5, 1855, in what is now commemorated across Papua as Injil Masuk Tanah Papua, the day the Gospel arrived, a date still marked with a public holiday and church services larger than Christmas in some highland towns. The city sits on the neck of the Bird's Head Peninsula facing the Pacific, and its natural harbor made it a logical Dutch administrative post decades before Jayapura grew into the region's larger city.|Dos misioneros alemanes, Carl Ottow y Johann Geissler, desembarcaron cerca de Manokwari el 5 de febrero de 1855, fecha que hoy se conmemora en toda Papúa como Injil Masuk Tanah Papua, el día en que llegó el Evangelio, y que aún se marca con un día festivo y oficios religiosos más concurridos que la Navidad en algunos pueblos de las tierras altas.|Deux missionnaires allemands, Carl Ottow et Johann Geissler, débarquèrent près de Manokwari le 5 février 1855, une date encore commémorée dans toute la Papouasie sous le nom d'Injil Masuk Tanah Papua, le jour où l'Évangile est arrivé, marquée par un jour férié et des offices religieux plus fréquentés que Noël dans certaines villes des hautes terres.|ドイツ人宣教師カール・オットウとヨハン・ガイスラーの二人は1855年2月5日、マノクワリ近郊に上陸した。この日はいまもパプア全域で「インジル・マスク・タナ・パプア(福音が地に着いた日)」として記念され、祝日となり、高地の町によってはクリスマスより多くの人が集う礼拝が開かれる。この町は太平洋に面した鳥の頭半島の付け根に位置し、その天然の良港ゆえ、ジャヤプラがこの地方の中心都市として育つ何十年も前からオランダの行政拠点として理にかなった選ばれ方をした。",
    [prop("Injil Masuk Papua Monument|Monumento Injil Masuk Papua|Monument Injil Masuk Papua|インジル・マスク・パプア記念碑", 380, 79),
     prop("Manokwari Harbor Pier|Muelle del puerto de Manokwari|Jetée du port de Manokwari|マノクワリ港の桟橋", 240, 50)],
  ),
  jayapura: city(
    "Jayapura|Jayapura|Jayapura|ジャヤプラ",
    140.72, -2.53, "mlp", "port", "port", "l",
    "Four names for one bay-ringed city in under a century|Cuatro nombres para una sola ciudad rodeada de bahía en menos de un siglo|Quatre noms pour une seule ville cernée par une baie, en moins d'un siècle|一世紀足らずで四つの名を持った湾の町",
    "Jayapura has carried at least four names in under a century: founded as the Dutch colonial capital Hollandia in 1910, it briefly became General Douglas MacArthur's Pacific headquarters after Allied forces retook it from Japan in 1944, then was renamed Kotabaru, then Sukarnopura after Indonesia annexed the territory in 1963, before settling on Jayapura in 1968. Built around a deep natural bay ringed by steep hills, the city has grown into Papua's largest, drawing migrants from across Indonesia alongside indigenous Papuan communities.|Jayapura ha llevado al menos cuatro nombres en menos de un siglo: fundada como capital colonial holandesa, Hollandia, en 1910, se convirtió brevemente en el cuartel general del Pacífico del general Douglas MacArthur tras la retoma aliada a Japón en 1944, luego se renombró Kotabaru, después Sukarnopura tras la anexión indonesia del territorio en 1963, antes de fijarse en Jayapura en 1968. Construida en torno a una profunda bahía natural rodeada de colinas escarpadas, la ciudad se ha convertido en la mayor de Papúa, atrayendo a migrantes de toda Indonesia junto a comunidades indígenas papúes.|Jayapura a porté au moins quatre noms en moins d'un siècle : fondée comme capitale coloniale hollandaise, Hollandia, en 1910, elle devint brièvement le quartier général du Pacifique du général Douglas MacArthur après la reprise alliée sur le Japon en 1944, puis fut renommée Kotabaru, puis Sukarnopura après l'annexion indonésienne du territoire en 1963, avant de se fixer sur Jayapura en 1968. Bâtie autour d'une profonde baie naturelle cernée de collines abruptes, la ville est devenue la plus grande de Papouasie, attirant des migrants de toute l'Indonésie aux côtés des communautés papoues autochtones.|ジャヤプラは一世紀足らずのあいだに少なくとも四つの名を持った町である。1910年にオランダ植民地の首都ホランディアとして築かれ、1944年に連合軍が日本からこの地を奪還したのちは、ダグラス・マッカーサー将軍の太平洋方面司令部として短く使われた。その後コタバルと改名され、1963年にインドネシアがこの地を編入するとスカルノプラとなり、1968年にジャヤプラに落ち着いた。険しい丘に囲まれた深い天然の湾を囲んで築かれたこの町は、パプア先住民の共同体とともにインドネシア各地からの移住者を引き寄せ、パプア最大の都市に成長した。",
    [prop("Hollandia Harbor Overlook|Mirador del puerto de Hollandia|Belvédère du port de Hollandia|ホランディア港の見晴らし台", 560, 116),
     prop("Cenderawasih University Campus|Campus de la Universidad Cenderawasih|Campus de l'université Cenderawasih|チェンデラワシ大学キャンパス", 320, 67)],
  ),
  wamena: city(
    "Wamena|Wamena|Wamena|ワメナ",
    138.9386, -4.0925, "mlp", "highland", "highland", "r",
    "A valley of 100,000 farmers unknown to outsiders until 1938|Un valle de 100.000 agricultores desconocido para el exterior hasta 1938|Une vallée de 100 000 agriculteurs inconnue de l'extérieur jusqu'en 1938|1938年まで外部に知られなかった10万人の農耕の谷",
    "The Baliem Valley around Wamena, home to some 100,000 Dani, Yali, and Lani people farming sweet potatoes on steep hillside terraces, was completely unknown to the outside world until 1938, when an American aerial survey led by naturalist Richard Archbold spotted the densely cultivated valley from a flying boat and radioed back reports of a hidden farming society in New Guinea's central highlands. Because Wamena has no road connection to the rest of Papua even today, everything from cement to motorcycles still arrives by air, making its airport one of the busiest cargo airfields in Indonesia relative to the size of the town it serves.|El valle de Baliem, en torno a Wamena, hogar de unas 100.000 personas dani, yali y lani que cultivan boniato en terrazas de ladera empinada, fue totalmente desconocido para el mundo exterior hasta 1938, cuando un estudio aéreo estadounidense dirigido por el naturalista Richard Archbold avistó desde un hidroavión el valle densamente cultivado y transmitió por radio la noticia de una sociedad agrícola oculta en las tierras altas centrales de Nueva Guinea. Como Wamena sigue sin tener hoy conexión por carretera con el resto de Papúa, todo, desde el cemento hasta las motocicletas, sigue llegando por aire, lo que convierte a su aeropuerto en uno de los campos de carga más activos de Indonesia en relación con el tamaño de la localidad a la que sirve.|La vallée de Baliem autour de Wamena, foyer d'environ 100 000 Dani, Yali et Lani cultivant la patate douce sur des terrasses à flanc de colline abrupt, resta totalement inconnue du monde extérieur jusqu'en 1938, quand une expédition aérienne américaine menée par le naturaliste Richard Archbold repéra depuis un hydravion cette vallée densément cultivée et signala par radio une société agricole cachée dans les hautes terres centrales de Nouvelle-Guinée. Wamena n'ayant encore aujourd'hui aucune route la reliant au reste de la Papouasie, tout, du ciment aux motos, continue d'arriver par avion, faisant de son aéroport l'un des terrains de fret les plus actifs d'Indonésie par rapport à la taille de la ville qu'il dessert.|ワメナを囲むバリエム渓谷は、急な斜面の段々畑でサツマイモを育てるダニ族・ヤリ族・ラニ族などおよそ10万人の暮らす土地だが、1938年まで外部世界にはまったく知られていなかった。この年、博物学者リチャード・アーチボルド率いるアメリカの航空調査隊が飛行艇からこの密に耕された渓谷を発見し、ニューギニア中央高地に隠れた農耕社会があると無線で報告した。ワメナはいまも他のパプア地域と道路でつながっておらず、セメントからオートバイまで、あらゆるものがいまも空路で運び込まれるため、その空港は町の規模に対してインドネシアでも屈指の貨物取扱量を誇る空港となっている。",
    [prop("Baliem Valley Terrace Farm|Terraza de cultivo del valle de Baliem|Ferme en terrasse de la vallée de Baliem|バリエム渓谷の段々畑", 340, 71),
     prop("Wamena Cargo Airport Apron|Plataforma de carga del aeropuerto de Wamena|Aire de fret de l'aéroport de Wamena|ワメナ空港の貨物エプロン", 220, 46)],
  ),
};

/**
 * 路線(45本)。ジャワ島内の実在の鉄道網とスマトラの一部(メダン近郊・
 * パダン―サワルントのオンビリン鉄道・パレンバンLRT)は陸路、カリマンタン・
 * スラウェシ内陸・パプアの鉄道が実質無い区間は実在する幹線道路をなぞった
 * 陸路として描く。島をまたぐものは航路(第3要素 "sea")。
 *
 * **ワメナ⇄ジャヤプラだけは簡略化。** 現実にはバリエム渓谷への陸路も航路も
 * 存在せず、空路でしか到達できない。盤面の連結性を保つため便宜上「陸路」
 * として描いている(詳細はファイル冒頭のコメントと REGISTER.md を参照)。
 */
export const INDONESIA_EDGES = [
  // --- sum スマトラ(鎖状+サワルント枝、メダン―ブキッティンギ間に代替路) ---
  ["medan", "banda_aceh"], // 端を入れ替えて解消(check-sea-routes.mjsで実測)
  ["medan", "toba"],
  ["medan", "bukittinggi"],
  ["toba", "bukittinggi"],
  ["bukittinggi", "padang"],
  ["padang", "sawahlunto"],
  ["sawahlunto", "bukittinggi"],
  ["padang", "palembang"],
  ["palembang", "bakauheni"],
  // --- sum-jav 航路(スンダ海峡) ---
  ["bakauheni", "merak", "sea"],
  // --- jav ジャワ(北岸線・南部の高速鉄道網・スラバヤ以東) ---
  ["merak", "jakarta"],
  ["jakarta", "bandung"],
  // ジャカルタ―スマランは直線だと北岸が湾曲する区間で海に出るため、
  // 実在の中継点チルボンを挟む(実測で確認)。
  ["cirebon", "jakarta"], // 端を入れ替えて解消(check-sea-routes.mjsで実測)
  ["cirebon", "semarang"],
  // ジャカルタ―ジョグジャカルタ直線は端の入れ替えでも88pxしか下がらなかった
  // ため(check-sea-routes.mjsで実測)、実在する南部線の分岐駅プルウォクルト
  // を中継する形に直した。
  ["purwokerto", "jakarta"],
  ["purwokerto", "yogyakarta"],
  ["semarang", "surabaya"],
  ["semarang", "yogyakarta"],
  ["bandung", "yogyakarta"],
  ["yogyakarta", "borobudur"],
  ["yogyakarta", "solo"],
  ["solo", "surabaya"],
  ["surabaya", "bromo"],
  ["bromo", "banyuwangi"],
  // --- jav-nut 航路(バリ海峡) ---
  ["banyuwangi", "gilimanuk", "sea"],
  // --- nut 小スンダ列島(バリ―ロンボク―フローレス―スンバ―ティモールの数珠つなぎ) ---
  ["gilimanuk", "denpasar"],
  ["denpasar", "ubud"],
  // バリ⇄ロンボクの実在フェリーはパダンバイ⇄レンバル(ジャワ⇄バリの
  // ギリマヌク⇄クタパンとは別の航路)。デンパサールは港町ではないため、
  // この路線は「デンパサール⇄マタラム」で簡略化しており、線はバリ島東部
  // (ギャニャール・クルンクン方面)の陸を実際にはなぞって描かれる。
  // バリは別盤面が計画されているため、ここでバリの町(パダンバイ)を
  // 増やさずに簡略化のまま残すことを選んだ(判断はREGISTER.md参照)。
  ["denpasar", "mataram", "sea"],
  ["mataram", "labuanbajo", "sea"],
  ["mataram", "kupang", "sea"],
  ["labuanbajo", "ende"],
  ["ende", "waingapu", "sea"],
  ["waingapu", "kupang", "sea"],
  // --- jav-kal 航路(ジャワ海。Pelni長距離フェリーの実在航路) ---
  ["surabaya", "balikpapan", "sea"],
  // --- kal カリマンタン(南岸沿いの幹線道路) ---
  ["pontianak", "palangkaraya"],
  ["palangkaraya", "banjarmasin"],
  ["banjarmasin", "balikpapan"],
  ["banjarmasin", "samarinda"],
  ["balikpapan", "samarinda"],
  // --- kal-sul 航路(マカッサル海峡) ---
  ["makassar", "balikpapan", "sea"],
  // --- sul スラウェシ(本島は道路、離島は航路) ---
  // ブナケン(マナドから船で1時間の海洋公園の島)は町として別に立てるには
  // マナドに近すぎるため外し、南東半島の州都クンダリに差し替えた
  // (取りまとめ側の指摘。ニッケル鉱業という他都市と被らない切り口も持てる)。
  // マナド―ゴロンタロは北スラウェシ半島が湾曲しているため陸路の直線だと
  // 海に大きく出る(実測75%)。半島の北岸・南岸を結ぶ沿岸航路として実在の
  // 定期船もあるため、航路に直して解消した(check-sea-routes.mjsの提案)。
  ["gorontalo", "manado", "sea"],
  // マカッサル―ゴロンタロ直線は端の入れ替えでも174pxと解消しなかったため
  // (check-sea-routes.mjsで実測)、実在するトランス・スラウェシ道路の経路
  // (マカッサル―タナトラジャ―パロポ回りでゴロンタロ・マナド方面)に合わせ、
  // タナトラジャ経由に組み替えた。タナトラジャ―ゴロンタロも直線では
  // 184pxと解消しなかったため、ボネ湾の湾奥を回る実在の中継地パロポを
  // さらに挟んだ(geography.mjsにパロポ沖の頂点も1点追加)。
  ["tanatoraja", "palopo"],
  // ゴロンタロ―クンダリ・パロポ経由いずれも陸路の直線では海に大きく出て
  // しまう(実測)。半島基部を陸路でつなぐより、両州都を結ぶ実在の沿岸
  // 定期船(Pelni)を使う航路として直したほうが安定した(check-sea-routes.mjsで実測)。
  ["gorontalo", "kendari", "sea"],
  ["makassar", "tanatoraja"],
  // マカッサル―クンダリを直線で結ぶとボネ湾を横切ってしまう(実測で確認)。
  // タナトラジャ経由(実在するパロポ回りの幹線道路に近い)にすると陸に収まる。
  ["tanatoraja", "kendari"],
  ["makassar", "wakatobi", "sea"],
  ["makassar", "ambon", "sea"],
  // --- sul-mlp 航路(モルッカ海) ---
  ["manado", "ternate", "sea"],
  // --- mlp マルク・パプア(全域が航路。ワメナ―ジャヤプラのみ簡略化した陸路) ---
  // ワイサイ(ソロンと同じくラジャアンパットの玄関口で近すぎた)をバンダ諸島に
  // 差し替えた(取りまとめ側の指摘。香辛料交易の要衝という、アンボンの豆知識
  // で触れたマンハッタン交換の当事者を町として立てられる)。
  ["ternate", "ambon", "sea"],
  ["ternate", "sorong", "sea"],
  ["ambon", "sorong", "sea"],
  ["ambon", "bandaneira", "sea"],
  // マノクワリを中継。ソロン―ジャヤプラを直航路にすると、パプア北岸が
  // 弓なりに張り出しているため直線が本土内陸を横切ってしまう(実測で確認)。
  // ソロン―マノクワリは鳥の頭半島の付け根を横切る実測でも陸路(トランス・
  // パプア道路の西端区間)。マノクワリ―ジャヤプラは実在するPelniフェリーの
  // 北岸航路で海路。
  ["sorong", "manokwari"],
  // 「陸路にする」は0pxになるが、パプア北岸に鉄道は無いため選ばない。
  // 端の並びは他の路線の追加・変更で最良の向きが変わるため、都度
  // check-sea-routes.mjsで実測して決め直している(直近の実測で此の向きが良好)。
  ["jayapura", "manokwari", "sea"],
  ["jayapura", "wamena"],
];
