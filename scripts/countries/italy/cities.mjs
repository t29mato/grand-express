/**
 * イタリアの都市と路線。
 *
 * 地方区分はISTAT(イタリア国家統計局)の6分割にならい、シチリア・サルデーニャを
 * 分けてある(`nov` 北西(ピエモンテ・ヴァッレダオスタ・リグーリア・ロンバルディア) /
 * `nes` 北東(ヴェネト・トレンティーノ・フリウリ・エミリア=ロマーニャ) /
 * `cen` 中部(トスカーナ・ウンブリア・マルケ・ラツィオ) /
 * `sud` 南部(カンパーニア・プーリア・バジリカータ・カラブリア・アブルッツォ) /
 * `sic` シチリア / `sar` サルデーニャ)。
 *
 * 45都市59路線。北西7 / 北東8 / 中部8 / 南部11 / シチリア6 / サルデーニャ5。
 * シチリア島・サルデーニャ島は海路("sea")でも結ばれる(本土⇄シチリア2本、
 * 本土⇄サルデーニャ2本)。島の内部は他の都市と同じく陸路。
 *
 * 経度・緯度は実際の値。投影の範囲は geography.mjs の ITALY_PROJ を参照。
 *
 * ## `mark`(27種)と `bg`(19種)
 *
 * 盤面では直径19pxにしかならないので、`mark`(24×24)は描き分けられる数の
 * まま27種残している。一方 `bg`(400×210、都市カードの背景)は45都市ぶんの
 * 文章と並行して仕上げるには27種では重すぎたため、19種に統合し直した
 * (韓国は40都市で16種)。そのため **`mark` と `bg` は必ずしも同じキー名を
 * 指さない**(例: サンジミニャーノは `mark: "towers"` のまま `bg: "hilltown"`
 * を指す)。増やすときは `mark` は都市ごとに、`bg` は使い回しを前提に考えること。
 *
 * ### `mark`(24×24、都市ごとの小さな絵)
 *
 * | キー | 描くもの | 受け持つ町 |
 * |---|---|---|
 * | `colosseum`  | 円形闘技場のアーチ | ローマ |
 * | `canal`      | 運河とゴンドラ | ヴェネツィア |
 * | `duomo`      | ゴシックの尖塔(白大理石) | ミラノ |
 * | `dome`       | ルネサンスの赤い丸屋根 | フィレンツェ |
 * | `leaningtower` | 傾いた塔 | ピサ |
 * | `towers`     | 中世の石塔が並ぶ稜線 | サンジミニャーノ |
 * | `hilltown`   | 丘の上の城壁都市 | シエナ・アッシジ・ペルージャ・オルヴィエート |
 * | `arena`      | ローマ円形闘技場(小型) | ヴェローナ |
 * | `portico`    | アーケードの柱廊 | ボローニャ・パドヴァ |
 * | `mosaic`     | ビザンチンのドームとモザイク | ラヴェンナ |
 * | `dairy`      | チーズの塊と熟成庫 | パルマ |
 * | `mountain`   | アルプス・アペニンの峰 | アオスタ・ボルツァーノ・ラクイラ |
 * | `lake`       | 湖と渡し船 | コモ |
 * | `vineyard`   | 丘のぶどう畑(トリュフの犬つき) | アルバ |
 * | `factory`    | 煙突と組立ライン | トリノ |
 * | `port`       | 起重機と船 | ジェノヴァ・トリエステ・バーリ・レッジョカラブリア・パレルモ・カリアリ・アルゲーロ・オルビア |
 * | `bay`        | 三日月形の湾とヴェスヴィオ山 | ナポリ |
 * | `ruins`      | 発掘された古代の遺構 | ポンペイ |
 * | `citrus`     | レモンの木立 | ソレント |
 * | `cliffhouses` | 崖に張り付く色とりどりの家並み | ポジターノ・チンクエテッレ・トロペア・チェファル |
 * | `trulli`     | 円錐屋根の家(トゥルッリ) | アルベロベッロ |
 * | `baroque`    | 彫刻を纏った石の正面 | レッチェ |
 * | `sassi`      | 崖に穿たれた洞窟住居 | マテーラ |
 * | `temple`     | ギリシャ様式の列柱 | アグリジェント・シラクーサ・タオルミーナ |
 * | `volcano`    | 噴煙を上げる火山 | カターニア |
 * | `nuraghe`    | 石積みの円塔(ヌラーゲ) | バルーミニ |
 * | `shepherd`   | 羊飼いと羊、山の斜面 | ヌオーロ |
 *
 * ### `bg`(400×210、都市カードの背景。19種、使い回し前提)
 *
 * | キー | 描くもの | 受け持つ町 |
 * |---|---|---|
 * | `capital`    | コロッセオと松、遺構の石畳 | ローマ |
 * | `canal`      | 運河とゴンドラ、橋 | ヴェネツィア |
 * | `duomo`      | ゴシックの尖塔とガレリア | ミラノ |
 * | `renaissance` | 赤いドームとアルノ川 | フィレンツェ |
 * | `leaningtower` | 傾いた塔と大聖堂・洗礼堂 | ピサ |
 * | `hilltown`   | 丘上の城壁都市(サンジミニャーノの塔も添える) | シエナ・サンジミニャーノ・アッシジ・ペルージャ・オルヴィエート |
 * | `temple`     | 古代の列柱・円形闘技場・発掘街路 | アグリジェント・シラクーサ・タオルミーナ・ヴェローナ・ポンペイ |
 * | `portico`    | アーケードの柱廊と大学の塔 | ボローニャ・パドヴァ |
 * | `mountain`   | アルプス・アペニンの峰(放牧の気配も添える) | アオスタ・ボルツァーノ・ラクイラ・ヌオーロ |
 * | `countryside` | 北イタリアの田園(川・ぶどう畑・チーズ・生ハム) | コモ・アルバ・ラヴェンナ・パルマ |
 * | `factory`    | 煙突と組立ライン | トリノ |
 * | `port`       | 起重機と船 | ジェノヴァ・トリエステ・バーリ・レッジョカラブリア・パレルモ・カリアリ・アルゲーロ・オルビア |
 * | `bay`        | 三日月形の湾とヴェスヴィオ山 | ナポリ |
 * | `cliffhouses` | 崖の家並み(ソレントのレモン畑も添える) | ポジターノ・チンクエテッレ・トロペア・チェファル・ソレント |
 * | `trulli`     | 円錐屋根の家(トゥルッリ) | アルベロベッロ |
 * | `baroque`    | 彫刻を纏った石の正面 | レッチェ |
 * | `sassi`      | 崖に穿たれた洞窟住居 | マテーラ |
 * | `volcano`    | 噴煙を上げる火山 | カターニア |
 * | `nuraghe`    | 石積みの円塔(ヌラーゲ) | バルーミニ |
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const ITALY_CITIES = {
  // ---------------------------------------------------------------------
  // nov — 北西(ピエモンテ・ヴァッレダオスタ・リグーリア・ロンバルディア)
  // ---------------------------------------------------------------------
  torino: city(
    "Turin|Turín|Turin|トリノ",
    7.6869, 45.0703, "nov", "factory", "factory", "r",
    "A one-year capital that became a century-long car town|Una capital de un año que se volvió una ciudad automotriz de un siglo|Une capitale d'un an devenue ville automobile centenaire|一年の都から百年の自動車の町へ",
    "Turin was the newly unified Kingdom of Italy's first capital, for barely four years before the government moved on to Florence in 1865, and the city reinvented itself around a car company founded in 1899 by a group of noblemen and cavalry officers. FIAT's old Lingotto factory topped its five floors with a rooftop test track shaped like an oval, banked at both ends so a finished car could be driven straight up from the assembly line and tested under the open sky.|Turín fue la primera capital del recién unificado Reino de Italia, durante apenas cuatro años antes de que el gobierno pasara a Florencia en 1865, y la ciudad se reinventó en torno a una empresa automovilística fundada en 1899 por un grupo de nobles y oficiales de caballería. La vieja fábrica Lingotto de FIAT remató sus cinco plantas con una pista de pruebas ovalada en la azotea.|Turin fut la première capitale du royaume d'Italie tout juste unifié, à peine quatre ans avant que le gouvernement ne parte pour Florence en 1865, et la ville se réinventa autour d'un constructeur automobile fondé en 1899 par des nobles et des officiers de cavalerie. L'ancienne usine Lingotto de FIAT couronnait ses cinq étages d'une piste d'essai ovale sur le toit.|トリノは統一されたばかりのイタリア王国の初代首都だったが、1865年に政府がフィレンツェへ移るまでわずか4年しか続かず、町は1899年に貴族と騎兵将校の一団が興した自動車会社を中心に生まれ変わった。フィアットの旧リンゴット工場は5階建ての屋上に楕円形の試験走路を設け、両端を傾斜させることで完成したばかりの車を組立ラインから屋上へそのまま走らせ、青空の下で試験できるようにした。",
    [prop("Mole Antonelliana Cinema Museum|Museo del Cine de la Mole Antonelliana|Musée du cinéma de la Mole Antonelliana|モーレ・アントネッリアーナ映画博物館", 800, 166),
     prop("Lingotto Rooftop Test Track|Pista de pruebas en la azotea del Lingotto|Piste d'essai sur le toit du Lingotto|リンゴット屋上の試験走路", 420, 86)],
  ),
  milano: city(
    "Milan|Milán|Milan|ミラノ",
    9.1900, 45.4642, "nov", "duomo", "duomo", "l",
    "A cathedral that took six centuries to finish|Una catedral que tardó seis siglos en terminarse|Une cathédrale qui a mis six siècles à s'achever|完成までに六百年かかった大聖堂",
    "Milan Cathedral, begun in 1386, took workers so long to finish that Napoleon ordered its facade completed in a hurry in 1805 for his coronation as King of Italy, and the very last of its roughly 3,400 statues was not bolted into place until 1965. It remains the largest church anywhere in Italy outside Vatican City, forested with 135 marble spires that took the better part of six centuries, in total, to finish.|La catedral de Milán, iniciada en 1386, tardó tanto en terminarse que Napoleón ordenó completar su fachada a toda prisa en 1805 para su coronación como rey de Italia, y la última de sus casi 3.400 estatuas no se fijó hasta 1965. Sigue siendo la mayor iglesia de toda Italia fuera de la Ciudad del Vaticano, erizada de 135 agujas de mármol que tardaron, en total, buena parte de seis siglos en completarse.|La cathédrale de Milan, commencée en 1386, mit si longtemps à s'achever que Napoléon fit terminer sa façade à la hâte en 1805 pour son couronnement comme roi d'Italie, et la toute dernière de ses quelque 3 400 statues ne fut boulonnée en place qu'en 1965. Elle reste la plus grande église de toute l'Italie en dehors de la Cité du Vatican, hérissée de 135 flèches de marbre qui mirent, au total, près de six siècles à s'achever.|1386年に着工したミラノ大聖堂はあまりに完成が長引いたため、ナポレオンは1805年、自らのイタリア王戴冠式に間に合わせようと正面ファサードを急ぎ仕上げさせた。約3400体ある彫像の最後の一体が取り付けられたのは1965年のことである。バチカン市国を除けばイタリアで最大の教会であり続けており、135本の大理石の尖塔が林立するその姿は、全体として完成までにほぼ六百年を要した。",
    [prop("Duomo Rooftop Terrace|Terraza de la azotea del Duomo|Terrasse sur le toit du Duomo|大聖堂の屋上テラス", 1400, 290),
     prop("Galleria Vittorio Emanuele Arcade|Galería Vittorio Emanuele|Galerie Vittorio Emanuele|ガレリア・ヴィットーリオ・エマヌエーレ", 700, 144)],
  ),
  genova: city(
    "Genoa|Génova|Gênes|ジェノヴァ",
    8.9463, 44.4056, "nov", "port", "port", "r",
    "A republic that once out-traded Venice|Una república que llegó a superar a Venecia en comercio|Une république qui surpassa jadis Venise en commerce|かつてヴェネツィアを凌いだ共和国",
    "Genoa's medieval merchant fleet and banking houses financed kings across Europe, and the golden age it paid for is still visible in more than 100 Renaissance and Baroque palaces lining a single street, Via Garibaldi, now a UNESCO World Heritage site under the name Rolli di Genova. The name comes from the rolli, official lists that once ranked the finest houses in the city and assigned them by rotation to host visiting foreign dignitaries at the family's own expense.|La flota mercante medieval de Génova y sus casas bancarias financiaron a reyes de toda Europa, y la edad de oro que pagaron aún se ve en más de 100 palacios renacentistas y barrocos que bordean una sola calle, Via Garibaldi, hoy Patrimonio de la Humanidad bajo el nombre de Rolli di Genova. El nombre viene de los rolli, listas oficiales que antaño clasificaban las mejores casas de la ciudad y las asignaban por turno para alojar a dignatarios extranjeros de visita, a costa de la propia familia.|La flotte marchande médiévale de Gênes et ses maisons bancaires financèrent des rois dans toute l'Europe, et l'âge d'or qu'elles payèrent se voit encore dans plus de 100 palais Renaissance et baroques bordant une seule rue, la Via Garibaldi, aujourd'hui classée à l'UNESCO sous le nom de Rolli di Genova. Le nom vient des rolli, listes officielles qui classaient jadis les plus belles demeures de la ville et les désignaient à tour de rôle pour loger les dignitaires étrangers de passage, aux frais de la famille elle-même.|ジェノヴァの中世の商船隊と銀行家たちはヨーロッパ中の王に金を貸し付け、その黄金時代の富はいまも、一本のヴィア・ガリバルディ通り沿いに並ぶ100を超えるルネサンス・バロック様式の館に残っており、「ジェノヴァのロッリ」の名で世界遺産に登録されている。この名は、かつて市内で最も優れた館を格付けし、外国からの賓客を順番に、しかも受け入れる一族自身の費用で迎えさせた公式名簿「ロッリ」に由来する。",
    [prop("Via Garibaldi Palazzo|Palazzo de Via Garibaldi|Palazzo de la Via Garibaldi|ヴィア・ガリバルディの館", 900, 186),
     prop("Old Port Aquarium Pier|Muelle del acuario del puerto viejo|Jetée de l'aquarium du vieux port|旧港の水族館の桟橋", 480, 100)],
  ),
  aosta: city(
    "Aosta|Aosta|Aoste|アオスタ",
    7.3151, 45.7372, "nov", "mountain", "mountain", "l",
    "A Roman town that never lost its walls|Una ciudad romana que nunca perdió sus murallas|Une ville romaine qui n'a jamais perdu ses remparts|城壁を失わなかったローマの町",
    "Aosta's Roman gate, theatre and city walls survive well enough that the town is nicknamed the \"Rome of the Alps,\" founded in 25 BC to guard the passes over Mont Blanc and the Great St Bernard. The 20-metre-high theatre facade still stands almost to its full original height, and its stepped seating is used for concerts and plays again each summer, over two thousand years after it was first cut into the rock.|La puerta romana, el teatro y las murallas de Aosta se conservan tan bien que la llaman la «Roma de los Alpes», fundada en el año 25 a. C. para vigilar los pasos del Mont Blanc y del Gran San Bernardo. La fachada del teatro, de 20 metros de altura, se mantiene casi a su altura original completa, y sus gradas escalonadas vuelven a usarse cada verano para conciertos y obras, más de dos mil años después de tallarse en la roca.|La porte, le théâtre et les remparts romains d'Aoste ont si bien survécu que la ville est surnommée la « Rome des Alpes », fondée en 25 av. J.-C. pour garder les cols du Mont-Blanc et du Grand-Saint-Bernard. La façade du théâtre, haute de 20 mètres, tient encore presque toute sa hauteur d'origine, et ses gradins accueillent de nouveau chaque été concerts et pièces, plus de deux mille ans après avoir été taillés dans la roche.|アオスタはローマ時代の門・劇場・城壁が良好に残っており、「アルプスのローマ」の異名を持つ。紀元前25年、モンブランと大サンベルナール峠を見張るために築かれた町である。高さ20メートルの劇場正面はほぼ当時のままの高さで残っており、岩を刻んでからニ千年以上を経たいまも、毎夏そこでコンサートや演劇が催されている。",
    [prop("Roman Theatre Steps|Gradas del teatro romano|Gradins du théâtre romain|ローマ劇場の階段席", 380, 78),
     prop("Fenis Castle Courtyard|Patio del castillo de Fénis|Cour du château de Fénis|フェニス城の中庭", 220, 46)],
  ),
  cinqueterre: city(
    "Cinque Terre|Cinque Terre|Cinque Terre|チンクエテッレ",
    9.6833, 44.1358, "nov", "cliffhouses", "cliffhouses", "r",
    "Five villages a road was never allowed to reach|Cinco pueblos a los que jamás se dejó llegar una carretera|Cinq villages qu'une route n'a jamais eu le droit d'atteindre|道路が届くことを許されなかった五つの村",
    "The five villages of the Cinque Terre were linked for centuries only by footpaths cut into the cliffs and by a single coastal railway tunnelled through the rock in 1874, and a car road still does not reach three of them today. The dry-stone terraces built up above the villages to grow grapes on land too vertical to farm any other way are estimated to hold about 6,700 kilometres of wall if laid end to end.|Los cinco pueblos de las Cinque Terre estuvieron unidos durante siglos solo por senderos tallados en los acantilados y por una única vía férrea costera horadada en la roca en 1874, y hoy una carretera aún no llega a tres de ellos. Las terrazas de piedra seca construidas sobre los pueblos para cultivar uva en una tierra demasiado vertical se calcula que suman unos 6.700 km de muro si se pusieran en fila.|Les cinq villages des Cinque Terre ne furent longtemps reliés que par des sentiers taillés dans la falaise et par une unique voie ferrée côtière percée dans le roc en 1874, et une route automobile n'atteint toujours pas trois d'entre eux aujourd'hui. Les terrasses en pierre sèche bâties au-dessus des villages pour cultiver la vigne sur une terre trop verticale totaliseraient environ 6 700 km de murets mis bout à bout.|チンクエテッレの五つの村は何世紀ものあいだ、崖に刻まれた小径と、1874年に岩を貫いて敷かれた一本の海岸鉄道だけで結ばれており、いまも三つの村には車道が通じていない。垂直すぎてほかの方法では耕せない土地にぶどうを育てるため村の上に築かれた石積みの段々畑は、すべてつなげるとおよそ6700kmの石垣に相当すると見積もられている。",
    [prop("Cliffside Terrace Vineyard|Viñedo en terraza del acantilado|Vignoble en terrasse à flanc de falaise|崖の段々畑のぶどう園", 340, 70),
     prop("Footpath Trattoria|Trattoria del sendero|Trattoria du sentier|小径沿いの食堂", 200, 42)],
  ),
  como: city(
    "Como|Como|Côme|コモ",
    9.0852, 45.8080, "nov", "lake", "countryside", "l",
    "A lake that taught the world to weave silk|Un lago que enseñó al mundo a tejer seda|Un lac qui apprit au monde à tisser la soie|世界に絹織りを教えた湖",
    "Como's silk mills were importing raw thread from China and Japan by the nineteenth century, and the trade grew so large that the town still produces a large share of Europe's silk, including scarves and ties for French luxury houses that will not put their own name on the label. A whole museum in town is devoted to the trade, displaying the hand looms and hundreds of carved wooden printing blocks once used to stamp patterns onto fabric one colour at a time.|Las hilanderías de seda de Como ya importaban hilo crudo de China y Japón en el siglo XIX, y el comercio creció tanto que la ciudad todavía produce buena parte de la seda de Europa, incluidos pañuelos y corbatas para casas de lujo francesas. Un museo entero de la ciudad está dedicado a este oficio, con telares manuales y cientos de bloques de madera tallada que antes se usaban para estampar los dibujos en la tela color a color.|Les filatures de soie de Côme importaient déjà du fil brut de Chine et du Japon au XIXe siècle, et le commerce grandit tant que la ville produit encore une large part de la soie européenne, dont des foulards et cravates pour des maisons de luxe françaises. Tout un musée de la ville est consacré à cet artisanat, avec des métiers à tisser manuels et des centaines de blocs de bois gravés jadis utilisés pour imprimer les motifs sur le tissu couleur par couleur.|コモの絹織物工場は19世紀にはすでに中国や日本から生糸を輸入しており、その商いはあまりに大きく育ったため、いまもこの町はヨーロッパの絹の大きな割合を生産しており、自社の名を表示させないフランスの高級ブランドのスカーフやネクタイも作っている。町にはこの産業をまるごと扱う博物館があり、手織り機や、かつて布に一色ずつ模様を刷り込むのに使われた彫刻入りの木版が何百点も展示されている。",
    [prop("Silk Mill Showroom|Sala de exposición de la seda|Salle d'exposition de la soierie|絹織物工場の展示室", 340, 70),
     prop("Lakeside Ferry Landing|Embarcadero del ferri del lago|Débarcadère du ferry du lac|湖畔の渡し場", 210, 44)],
  ),
  alba: city(
    "Alba|Alba|Alba|アルバ",
    8.0334, 44.7009, "nov", "vineyard", "countryside", "r",
    "A hill town that hunts its dinner with a dog|Un pueblo en la colina que caza su cena con un perro|Une ville de coteau qui chasse son dîner avec un chien|犬と一緒に晩ごはんを探す丘の町",
    "The white truffles of Alba are still found the way they always have been, by a trained dog sniffing them out under oak and hazel trees at night, since hunting them by torchlight in daylight hours was banned as unfair to the fungus. A single truffle from these hills once sold at charity auction for over 100,000 euros, bought sight-unseen by a bidder on the telephone.|Las trufas blancas de Alba se siguen buscando como siempre, con un perro adiestrado que las olfatea de noche bajo robles y avellanos, ya que cazarlas de día se prohibió por considerarse injusto para el hongo. Una sola trufa de estas colinas se vendió una vez en subasta benéfica por más de 100.000 euros, comprada sin verla por un pujador por teléfono.|Les truffes blanches d'Alba se cherchent encore comme toujours, avec un chien dressé qui les flaire la nuit sous les chênes et les noisetiers, la chasse de jour ayant été jugée déloyale envers le champignon. Une seule truffe de ces collines s'est vendue une fois aux enchères caritatives pour plus de 100 000 euros, achetée sans l'avoir vue par un enchérisseur au téléphone.|アルバの白トリュフはいまも昔ながらのやり方で探される。夜、訓練された犬がオークやハシバミの木の下で嗅ぎ当てるのである。日中に松明で探すことは菌にとって不公平だとして禁じられている。この丘で採れた一つのトリュフが慈善オークションで10万ユーロを超える値で落札されたこともあり、買い手は電話越しに現物を見ないまま競り落とした。",
    [prop("White Truffle Auction House|Casa de subastas de la trufa blanca|Salle des enchères de la truffe blanche|白トリュフの競売場", 460, 96),
     prop("Hazelnut Chocolate Workshop|Taller de chocolate de avellana|Atelier de chocolat aux noisettes|ヘーゼルナッツチョコレートの工房", 240, 50)],
  ),

  // ---------------------------------------------------------------------
  // nes — 北東(ヴェネト・トレンティーノ・フリウリ・エミリア=ロマーニャ)
  // ---------------------------------------------------------------------
  venezia: city(
    "Venice|Venecia|Venise|ヴェネツィア",
    12.3155, 45.4408, "nes", "canal", "canal", "r",
    "A city built on a forest driven into the mud|Una ciudad construida sobre un bosque hincado en el barro|Une ville bâtie sur une forêt enfoncée dans la vase|泥の中に打ち込まれた森の上に建つ町",
    "The basilica of Santa Maria della Salute alone stands on more than a million wooden piles, driven into the lagoon mud until they hit a hard layer of clay, and the alder and oak wood has only grown harder over the centuries in the oxygen-starved silt. Nobody has had to replace a single one of the piles under the city's oldest buildings, since wood that stays permanently waterlogged and cut off from oxygen simply does not rot the way it would in open air.|Solo la basílica de Santa Maria della Salute se alza sobre más de un millón de pilotes de madera, hincados en el barro de la laguna hasta topar con una capa dura de arcilla, y la madera de aliso y roble no ha hecho sino endurecerse con los siglos en el limo sin oxígeno. Nadie ha tenido que reemplazar un solo pilote bajo los edificios más antiguos de la ciudad, ya que la madera permanentemente empapada y privada de oxígeno sencillamente no se pudre como lo haría al aire libre.|La seule basilique Santa Maria della Salute repose sur plus d'un million de pieux de bois, enfoncés dans la vase de la lagune jusqu'à une couche dure d'argile, et le bois d'aulne et de chêne n'a fait que durcir au fil des siècles dans cette vase privée d'oxygène. Personne n'a jamais dû remplacer le moindre pieu sous les plus vieux édifices de la ville, car un bois resté en permanence gorgé d'eau et privé d'oxygène ne pourrit tout simplement pas comme à l'air libre.|サンタ・マリア・デッラ・サルーテ聖堂だけでも、干潟の泥に打ち込まれ硬い粘土層に達した100万本を超える木の杭の上に立っており、ハンノキとオークの木材は酸素の乏しい泥の中で何世紀も経つほどにかえって硬くなっている。町最古の建物の下にある杭は、いまだ一本も取り替える必要がない。常に水に浸かり酸素を断たれたままの木材は、外気にさらされたときのようには腐らないからである。",
    [prop("Grand Canal Palazzo|Palazzo del Gran Canal|Palazzo du Grand Canal|大運河の館", 2400, 496),
     prop("Rialto Bridge Stall|Puesto del puente de Rialto|Étal du pont du Rialto|リアルト橋の露店", 900, 186)],
  ),
  verona: city(
    "Verona|Verona|Vérone|ヴェローナ",
    10.9916, 45.4384, "nes", "arena", "temple", "l",
    "A balcony built for tourists, not for Shakespeare|Un balcón construido para los turistas, no para Shakespeare|Un balcon bâti pour les touristes, pas pour Shakespeare|シェイクスピアのためではなく観光客のためのバルコニー",
    "The \"balcony of Juliet\" visitors queue to photograph was added to a 13th-century house only in the 1930s, assembled partly from an old sarcophagus lid, decades after Shakespeare had already set his fictional lovers in a city he probably never visited. The house never had any real connection to a Capulet family; the name was borrowed from a coat of arms with a hat-like emblem, mistaken over the centuries for \"cappello\" and then linked to \"Capuleti.\"|El «balcón de Julieta» que los visitantes hacen cola para fotografiar se añadió a una casa del siglo XIII recién en los años treinta, montado en parte con la tapa de un antiguo sarcófago, décadas después de que Shakespeare ya hubiera situado a sus amantes ficticios en una ciudad que probablemente nunca visitó. La casa nunca tuvo relación real con ninguna familia Capuleto; el nombre vino de un escudo con un emblema en forma de sombrero, confundido con los siglos con «cappello» y luego asociado a «Capuleti».|Le « balcon de Juliette » que les visiteurs font la queue pour photographier ne fut ajouté à une maison du XIIIe siècle que dans les années 1930, assemblé en partie à partir du couvercle d'un vieux sarcophage, des décennies après que Shakespeare eut déjà situé ses amants fictifs dans une ville qu'il ne visita probablement jamais. La maison n'eut jamais de lien réel avec une famille Capulet ; le nom vient d'un blason à l'emblème en forme de chapeau, confondu au fil des siècles avec « cappello » puis rattaché aux « Capuleti ».|観光客が列をなして写真を撮る「ジュリエットのバルコニー」は、13世紀の家に1930年代になってようやく取り付けられたもので、古い石棺の蓋を一部転用して組まれた。シェイクスピアがこの町を(おそらく訪れたことのないまま)架空の恋人たちの舞台に選んでから、実に何十年も後のことである。この家は実際にはキャピュレット家とは何のゆかりもなく、名前は帽子のような紋章のある家紋が何世紀もの間に「カッペロ(帽子)」と誤解され、それが「カプレーティ」と結び付けられたことに由来する。",
    [prop("Roman Arena Opera Tier|Grada de ópera de la Arena Romana|Gradin d'opéra des arènes romaines|ローマ円形闘技場のオペラ席", 900, 186),
     prop("Juliet's Balcony Courtyard|Patio del balcón de Julieta|Cour du balcon de Juliette|ジュリエットのバルコニーの中庭", 460, 96)],
  ),
  padova: city(
    "Padua|Padua|Padoue|パドヴァ",
    11.8768, 45.4064, "nes", "portico", "portico", "r",
    "A chapel bought with guilty money and painted by a genius|Una capilla comprada con dinero culpable y pintada por un genio|Une chapelle payée par un argent coupable et peinte par un génie|後ろめたい金で贖った礼拝堂に、天才が絵を描いた",
    "The Scrovegni Chapel was commissioned by a banker's son to atone for his father's sin of usury, a trade the church still considered sinful enough to keep the elder Scrovegni out of consecrated ground, and Giotto covered its walls between 1303 and 1305 with frescoes now credited with breaking from flat medieval painting toward real depth and emotion. Visitors today are shuttled through a sealed decompression chamber built to stabilise the humidity around the frescoes, and only 25 people are allowed inside at a time, for a strictly timed 15 minutes each.|La capilla Scrovegni fue encargada por el hijo de un banquero para expiar el pecado de usura de su padre, un oficio que la Iglesia aún consideraba tan pecaminoso como para negarle tierra consagrada, y Giotto cubrió sus muros entre 1303 y 1305 con frescos a los que hoy se atribuye la ruptura con la pintura medieval plana hacia una profundidad y emoción reales. Hoy los visitantes pasan por una cámara sellada de descompresión construida para estabilizar la humedad en torno a los frescos, y solo se permite la entrada a 25 personas a la vez, durante 15 minutos estrictamente cronometrados.|La chapelle Scrovegni fut commandée par le fils d'un banquier pour expier le péché d'usure de son père, un métier que l'Église jugeait encore assez coupable pour lui refuser une terre consacrée, et Giotto en couvrit les murs entre 1303 et 1305 de fresques auxquelles on attribue aujourd'hui la rupture avec la peinture médiévale plate vers une vraie profondeur et une vraie émotion. Les visiteurs traversent aujourd'hui un sas scellé construit pour stabiliser l'humidité autour des fresques, et seules 25 personnes à la fois sont admises, pour un quart d'heure strictement chronométré.|スクロヴェーニ礼拝堂は、銀行家の息子が父の高利貸しの罪を償うために建てさせたものである。高利貸しは教会がいまだ罪深いとみなし、父スクロヴェーニを聖別された墓地に葬らせないほどだった。ジョットは1303年から1305年にかけてその壁を覆うフレスコ画を描き、中世の平板な絵画から本当の奥行きと感情表現へ踏み出した最初期の例として評価されている。いま訪問者は、フレスコ画周辺の湿度を安定させるために作られた密閉式の減圧室を通らされ、一度に入れるのは25人まで、滞在時間も15分と厳密に区切られている。",
    [prop("Scrovegni Chapel Fresco Hall|Sala de frescos de la capilla Scrovegni|Salle des fresques de la chapelle Scrovegni|スクロヴェーニ礼拝堂のフレスコ画", 520, 108),
     prop("Anatomy Theatre Balcony|Balcón del teatro anatómico|Balcon du théâtre anatomique|解剖学講堂のバルコニー", 280, 58)],
  ),
  bologna: city(
    "Bologna|Bolonia|Bologne|ボローニャ",
    11.3426, 44.4949, "nes", "portico", "portico", "l",
    "A university a thousand years old, roofed the whole way|Una universidad de mil años, cubierta de punta a punta|Une université millénaire, couverte de bout en bout|千年の大学と、その分だけ続く屋根",
    "The University of Bologna, founded in 1088, is generally reckoned the oldest continuously operating university in the world, and over the centuries the city built more than 60 kilometres of covered arcades so that students and traders could cross town without an umbrella. A single arcade climbing the hill to the Sanctuary of San Luca alone runs for nearly 4 kilometres under 666 arches, letting pilgrims and pedestrians walk the whole way up under cover, in rain or in the summer sun.|La Universidad de Bolonia, fundada en 1088, se considera en general la más antigua del mundo en funcionamiento continuo, y a lo largo de los siglos la ciudad construyó más de 60 km de soportales cubiertos para que estudiantes y comerciantes cruzaran la ciudad sin paraguas. Solo el soportal que sube la colina hasta el Santuario de San Luca se extiende casi 4 km bajo 666 arcos, permitiendo a peregrinos y peatones subir todo el trayecto cubiertos, con lluvia o bajo el sol del verano.|L'université de Bologne, fondée en 1088, est généralement considérée comme la plus ancienne université au monde en activité continue, et au fil des siècles la ville a bâti plus de 60 km d'arcades couvertes pour que étudiants et marchands traversent la ville sans parapluie. La seule arcade qui grimpe la colline jusqu'au sanctuaire de San Luca s'étend sur près de 4 km sous 666 arches, permettant aux pèlerins et aux piétons de monter tout le trajet à l'abri, sous la pluie comme sous le soleil d'été.|1088年創立のボローニャ大学は、世界で最も古くから途切れず存続する大学とされる。町は何世紀もかけて60kmを超える屋根付きの柱廊を築き、学生や商人が傘なしで町を渡れるようにした。中でもサン・ルーカ聖堂まで丘を登る柱廊だけで4km近くに及び、666のアーチが続く。巡礼者や歩行者は雨の日も夏の日差しの下も、屋根の下を歩いたまま丘を登りきることができる。",
    [prop("Arcaded University Quarter|Barrio universitario porticado|Quartier universitaire à arcades|柱廊の大学街", 900, 186),
     prop("Ragù Trattoria Kitchen|Cocina de trattoria de ragù|Cuisine de trattoria au ragù|ラグーの食堂の厨房", 400, 82)],
  ),
  ravenna: city(
    "Ravenna|Rávena|Ravenne|ラヴェンナ",
    12.1955, 44.4184, "nes", "mosaic", "countryside", "r",
    "A capital's ceiling, still telling its story in glass|El techo de una capital, que aún cuenta su historia en vidrio|Le plafond d'une capitale, qui raconte encore son histoire en verre|いまもガラスで語り続ける、都の天井",
    "Ravenna was capital first of the Western Roman Empire, then of Ostrogothic Italy, then of Byzantine Italy in turn, and the mosaics its rulers left behind — millions of hand-cut glass and gold tesserae across eight buildings — have survived more than 1,500 years largely undamaged, because the city slid into a marshy backwater soon after and nobody found it worth conquering again. Tilting the tiny glass tiles at slightly different angles was deliberate, so that candlelight and daylight alike would scatter across the gold surfaces instead of lying flat, which is why the same wall can look different colours depending on where a visitor stands.|Rávena fue capital primero del Imperio romano de Occidente, luego de la Italia ostrogoda y después de la Italia bizantina, y los mosaicos que dejaron sus gobernantes —millones de teselas de vidrio y oro talladas a mano en ocho edificios— han sobrevivido más de 1.500 años casi intactos, porque la ciudad quedó pronto relegada a un rincón pantanoso que nadie consideró ya digno de conquistar. Inclinar las diminutas teselas de vidrio en ángulos ligeramente distintos fue deliberado, para que la luz de las velas y la del día se dispersaran sobre las superficies doradas en vez de caer plana, por lo que un mismo muro puede parecer de colores distintos según dónde se sitúe quien lo mira.|Ravenne fut d'abord capitale de l'Empire romain d'Occident, puis de l'Italie ostrogothique, puis de l'Italie byzantine, et les mosaïques laissées par ses souverains — des millions de tesselles de verre et d'or taillées à la main dans huit édifices — ont survécu plus de 1 500 ans presque intactes, la ville ayant vite sombré dans un arrière-pays marécageux que plus personne ne jugea digne d'être conquis. Incliner les minuscules tesselles de verre selon des angles légèrement différents était volontaire, afin que la lumière des bougies comme celle du jour se disperse sur les surfaces dorées au lieu de rester plate, si bien qu'un même mur peut sembler de couleurs différentes selon l'endroit d'où on le regarde.|ラヴェンナは西ローマ帝国、次いで東ゴート王国のイタリア、さらにビザンチンのイタリアと、次々に都となった土地である。歴代の支配者が残したモザイク――8つの建物にわたる手切りのガラスと金のテッセラ数百万枚――は1500年以上ほぼ無傷で残っている。この町がまもなく湿地の辺境に沈み、誰も攻め取る値打ちを見出さなくなったからである。小さなガラス片をわずかずつ違う角度に傾けて貼り付けたのは意図的な工夫で、蝋燭の炎や日の光が金地の上で平らに反射せず散らばるようにするためだった。そのため同じ壁でも見る位置によって色合いが違って見える。",
    [prop("Basilica Mosaic Gallery|Galería de mosaicos de la basílica|Galerie des mosaïques de la basilique|聖堂のモザイク回廊", 620, 128),
     prop("Dante's Tomb Garden|Jardín de la tumba de Dante|Jardin du tombeau de Dante|ダンテの墓の庭", 300, 62)],
  ),
  trieste: city(
    "Trieste|Trieste|Trieste|トリエステ",
    13.7768, 45.6495, "nes", "port", "port", "l",
    "A Habsburg port Italy joined only in the 20th century|Un puerto de los Habsburgo al que Italia solo se sumó en el siglo XX|Un port habsbourgeois qu'Italie ne rejoignit qu'au XXe siècle|20世紀になってようやくイタリアに加わったハプスブルクの港",
    "Trieste was the Austro-Hungarian Empire's main seaport for more than a century, built up with grand coffee houses where Habsburg officials, spies and writers like James Joyce all drank the same espresso, and it did not become Italian until after the First World War, then again only after a decade under joint UN administration ending in 1954. Several of those same grand cafés, with their original mirrors and marble tables still in place, are serving espresso today, protected as historic landmarks the city will not let modernise.|Trieste fue el principal puerto marítimo del Imperio austrohúngaro durante más de un siglo, con grandes cafés donde funcionarios, espías y escritores de los Habsburgo como James Joyce tomaban el mismo espresso, y no pasó a ser italiana hasta después de la Primera Guerra Mundial, y de nuevo solo tras una década de administración conjunta de la ONU que acabó en 1954. Varios de esos mismos grandes cafés, con sus espejos y mesas de mármol originales, siguen sirviendo espresso hoy, protegidos como monumentos históricos que la ciudad no deja modernizar.|Trieste fut le principal port de mer de l'Empire austro-hongrois durant plus d'un siècle, bâti de grands cafés où fonctionnaires habsbourgeois, espions et écrivains comme James Joyce buvaient le même espresso, et elle ne devint italienne qu'après la Première Guerre mondiale, puis de nouveau seulement après une décennie sous administration conjointe de l'ONU s'achevant en 1954. Plusieurs de ces mêmes grands cafés, miroirs et tables de marbre d'origine toujours en place, servent encore de l'espresso aujourd'hui, protégés comme monuments historiques que la ville refuse de moderniser.|トリエステは1世紀以上にわたりオーストリア＝ハンガリー帝国の主要な海港であり、ハプスブルク家の官吏やスパイ、ジェイムズ・ジョイスのような作家がみな同じエスプレッソを飲んだ壮麗なカフェが立ち並んだ。イタリアに帰属したのは第一次世界大戦後になってからで、その後さらに国連の共同統治下に10年置かれ、1954年にようやく確定した。当時と同じ鏡や大理石のテーブルを残すカフェの何軒かはいまもエスプレッソを出し続けており、町が近代化を許さない史跡として守られている。",
    [prop("Habsburg Coffee House|Café de la época de los Habsburgo|Café de l'époque habsbourgeoise|ハプスブルク家時代のカフェ", 460, 96),
     prop("Bora Wind Handrail Street|Calle con cuerdas contra la bora|Rue à cordes contre la bora|ボーラ風の手すり通り", 240, 50)],
  ),
  parma: city(
    "Parma|Parma|Parme|パルマ",
    10.3279, 44.8015, "nes", "dairy", "countryside", "r",
    "A cheese aged so precisely it has its own bank vault|Un queso curado con tal precisión que tiene su propia cámara acorazada|Un fromage affiné avec une telle précision qu'il a sa propre chambre forte|独自の銀行金庫を持つほど厳密に熟成させるチーズ",
    "Wheels of Parmigiano Reggiano are aged for a minimum of twelve months and inspected one by one with a small hammer, tapped and listened to for hollow spots before they earn the stamped rind, and Italian banks have accepted whole warehouses of ageing wheels as loan collateral since the 1950s, storing them in climate-controlled vaults like gold bars. Parma ham gets part of its sweetness from pigs fed on the whey left over from making that very same cheese.|Las ruedas de Parmigiano Reggiano se curan un mínimo de doce meses y se inspeccionan una a una con un pequeño martillo, golpeándolas para detectar huecos antes de recibir el sello en la corteza, y los bancos italianos aceptan desde los años cincuenta almacenes enteros de ruedas en curación como garantía de préstamos, guardándolas en cámaras climatizadas como lingotes de oro. El jamón de Parma debe parte de su dulzor a cerdos alimentados con el suero que sobra de hacer ese mismo queso.|Les meules de Parmigiano Reggiano sont affinées douze mois au minimum et inspectées une à une au petit marteau, tapotées pour détecter les creux avant de recevoir le tampon sur la croûte, et les banques italiennes acceptent depuis les années 1950 des entrepôts entiers de meules en affinage comme garantie de prêt, les conservant dans des chambres climatisées comme des lingots d'or. Le jambon de Parme doit une part de sa douceur à des porcs nourris du petit-lait issu de ce même fromage.|パルミジャーノ・レッジャーノの塊は最低12か月熟成され、刻印を得る前に一つ一つ小さな槌で叩かれ、空洞がないか音で確かめられる。イタリアの銀行は1950年代から熟成中のチーズを丸ごと倉庫単位で融資の担保として受け入れており、金の延べ棒さながらに空調管理された金庫に保管している。パルマ産の生ハムの甘みの一部は、まさにこのチーズを作った際に残る乳清を飼料にした豚に由来する。",
    [prop("Cheese Ageing Vault|Cámara de curación del queso|Chambre d'affinage du fromage|チーズの熟成庫", 460, 96),
     prop("Prosciutto Curing Cellar|Bodega de curación del jamón|Cave d'affinage du jambon|生ハムの熟成蔵", 260, 54)],
  ),
  bolzano: city(
    "Bolzano|Bolzano|Bolzano|ボルツァーノ",
    11.3548, 46.4983, "nes", "mountain", "mountain", "l",
    "A 5,300-year-old man, found perfectly preserved in the ice|Un hombre de 5.300 años, hallado perfectamente conservado en el hielo|Un homme de 5 300 ans, retrouvé parfaitement conservé dans la glace|氷の中で完璧に保存されていた5300年前の男",
    "A frozen body found in a glacier above the city in 1991, nicknamed Ötzi, turned out to be about 5,300 years old and still carrying his own copper axe, a longbow and a repair kit, making him the most complete prehistoric human body ever recovered anywhere on Earth. He is kept in a specially chilled museum room, viewable only through a small window, held at the exact temperature and humidity of the ice that preserved him for five thousand years.|Un cuerpo congelado hallado en un glaciar sobre la ciudad en 1991, apodado Ötzi, resultó tener unos 5.300 años y aún portaba su propia hacha de cobre, un arco largo y un kit de reparación, lo que lo convierte en el cuerpo humano prehistórico más completo jamás recuperado en el mundo. Se conserva en una sala de museo refrigerada, visible solo por una pequeña ventana, mantenida a la temperatura y humedad exactas del hielo que lo preservó durante cinco mil años.|Un corps gelé découvert dans un glacier au-dessus de la ville en 1991, surnommé Ötzi, s'est révélé vieux d'environ 5 300 ans et portait encore sa propre hache de cuivre, un arc long et une trousse de réparation, ce qui en fait le corps humain préhistorique le plus complet jamais retrouvé au monde. Il est conservé dans une salle de musée réfrigérée, visible seulement par une petite fenêtre, maintenue à la température et à l'humidité exactes de la glace qui l'a préservé pendant cinq mille ans.|1991年、町の上空の氷河で見つかった凍った遺体「エッツィ」はおよそ5300年前のものと判明し、自前の銅の斧や長弓、補修道具一式まで身につけたままだった。世界で発見された先史時代の人体としては最も保存状態が良い例とされる。いまは彼を保存してきた氷とまったく同じ温度・湿度に保たれた特別冷却の展示室に置かれ、小さな窓からしか見ることができない。",
    [prop("Ötzi Ice Mummy Museum|Museo de la momia de hielo Ötzi|Musée de la momie des glaces Ötzi|アイスマン・エッツィ博物館", 560, 116),
     prop("Alpine Cable Car Station|Estación del teleférico alpino|Gare du téléphérique alpin|アルプスのロープウェイ駅", 300, 62)],
  ),

  // ---------------------------------------------------------------------
  // cen — 中部(トスカーナ・ウンブリア・マルケ・ラツィオ)
  // ---------------------------------------------------------------------
  roma: city(
    "Rome|Roma|Rome|ローマ",
    12.4964, 41.9028, "cen", "colosseum", "capital", "r",
    "A dome that has never once needed reinforcing|Una cúpula que nunca ha necesitado refuerzo|Une coupole qui n'a jamais eu besoin d'être renforcée|一度も補強を要らなかったドーム",
    "The Pantheon's dome, poured in the second century without a single bar of steel, is still the largest unreinforced concrete dome on Earth, and its 8.8-metre oculus is the building's only source of light — and, when it rains, its only drain. The building has stayed in continuous use for close to 1,900 years, longer than almost any other structure its size, because a 7th-century conversion into a Christian church spared it from being quarried for stone the way so much of ancient Rome was.|La cúpula del Panteón, vertida en el siglo II sin una sola barra de acero, sigue siendo la mayor cúpula de hormigón sin armar del mundo, y su óculo de 8,8 metros es la única fuente de luz del edificio —y, cuando llueve, su único desagüe—. El edificio ha permanecido en uso continuo durante casi 1.900 años, más que casi cualquier otra estructura de su tamaño, porque su conversión en iglesia cristiana en el siglo VII lo libró de acabar como cantera, el destino de buena parte de la Roma antigua.|Le dôme du Panthéon, coulé au IIe siècle sans la moindre barre d'acier, reste la plus grande coupole de béton non armé au monde, et son oculus de 8,8 mètres est l'unique source de lumière du bâtiment — et, quand il pleut, son unique évacuation. L'édifice est resté en usage continu pendant près de 1 900 ans, plus longtemps que presque toute autre structure de cette taille, car sa conversion en église chrétienne au VIIe siècle lui évita de servir de carrière de pierre, le sort de tant d'édifices de la Rome antique.|パンテオンのドームは2世紀に鉄筋を一本も使わず打たれたが、いまも無筋コンクリートとしては世界最大のドームであり、直径8.8mの天窓(オクルス)は建物唯一の採光口であると同時に、雨が降れば唯一の排水口にもなる。この建物はほぼ1900年ものあいだ絶えず使われ続けており、同じ規模の建造物としては異例の長さである。7世紀にキリスト教会へ転用されたおかげで、古代ローマの他の多くの建物のように石材として切り出されずに済んだからである。",
    [prop("Colosseum Arcade|Arcada del Coliseo|Arcade du Colisée|コロッセオのアーケード", 2800, 580),
     prop("Trevi Fountain Corner|Rincón de la Fontana de Trevi|Coin de la fontaine de Trevi|トレビの泉のほとり", 1300, 270)],
  ),
  firenze: city(
    "Florence|Florencia|Florence|フィレンツェ",
    11.2558, 43.7696, "cen", "dome", "renaissance", "l",
    "A dome built without a wooden frame to hold it up|Una cúpula construida sin armazón de madera que la sostuviera|Une coupole bâtie sans charpente de bois pour la soutenir|木の骨組みなしに架けられたドーム",
    "When Filippo Brunelleschi won the contract to cap Florence's cathedral in 1420, nobody, including him, had ever built a dome that size without scaffolding rising from the ground, so he invented a herringbone brick pattern and a fleet of custom hoists that let masons build the dome upward on itself, self-supporting the whole way. At over 44 metres across, it remains the largest brick dome ever built, and engineers still study it today to work out exactly how Brunelleschi calculated a design he left almost no written records to explain.|Cuando Filippo Brunelleschi ganó el contrato para rematar la catedral de Florencia en 1420, nadie, ni siquiera él, había construido nunca una cúpula de ese tamaño sin andamiaje desde el suelo, así que inventó un aparejo de ladrillo en espiga y una flota de grúas a medida que permitieron a los canteros levantar la cúpula sobre sí misma, autoportante en todo momento. Con más de 44 metros de diámetro, sigue siendo la mayor cúpula de ladrillo jamás construida, y los ingenieros aún la estudian hoy para averiguar cómo calculó Brunelleschi un diseño del que apenas dejó constancia escrita.|Quand Filippo Brunelleschi remporta en 1420 le contrat pour coiffer la cathédrale de Florence, personne, pas même lui, n'avait jamais bâti une coupole de cette taille sans échafaudage montant du sol, si bien qu'il inventa un appareillage de briques en épi et toute une flotte de grues sur mesure permettant aux maçons de bâtir la coupole sur elle-même, autoportante de bout en bout. Avec plus de 44 mètres de diamètre, elle demeure la plus grande coupole en brique jamais bâtie, et les ingénieurs l'étudient encore aujourd'hui pour comprendre comment Brunelleschi calcula un plan dont il ne laissa presque aucune trace écrite.|1420年、フィレンツェ大聖堂の丸屋根を架ける契約をフィリッポ・ブルネレスキが勝ち取ったとき、彼自身を含め誰も、地面から足場を組まずにこの大きさのドームを建てた経験がなかった。そこで彼は魚の骨のようなレンガの積み方と特注の巻き上げ機の一団を考案し、石工がドームをそれ自体の上に自立させながら積み上げられるようにした。直径44mを超えるこのドームはいまもレンガ造りとしては世界最大で、ブルネレスキがほとんど文書を残さなかったその設計をどう計算したのか、技術者たちはいまも研究を続けている。",
    [prop("Duomo Dome Climb|Ascenso a la cúpula del Duomo|Ascension du dôme du Duomo|大聖堂ドームの登頂路", 1200, 248),
     prop("Ponte Vecchio Goldsmith Shop|Joyería del Ponte Vecchio|Bijouterie du Ponte Vecchio|ヴェッキオ橋の宝飾店", 620, 128)],
  ),
  siena: city(
    "Siena|Siena|Sienne|シエナ",
    11.3305, 43.3188, "cen", "hilltown", "hilltown", "r",
    "A horse race run twice a summer around a shell-shaped square|Una carrera de caballos disputada dos veces cada verano en una plaza con forma de concha|Une course de chevaux disputée deux fois l'été autour d'une place en forme de coquille|貝殻形の広場を夏に二度駆ける競馬",
    "The Palio horse race has been run around Siena's sloped, shell-shaped main square since at least the 17th century, bareback and lasting barely 90 seconds, between ten of the city's seventeen historic neighbourhoods drawn by lot each time. A losing neighbourhood's grief is taken seriously enough that its banner is sometimes hung upside down in mourning until the next race two months later.|La carrera del Palio se disputa en la plaza mayor de Siena, inclinada y en forma de concha, desde al menos el siglo XVII, a pelo y con una duración de apenas 90 segundos, entre diez de los diecisiete barrios históricos de la ciudad, sorteados cada vez. El duelo de un barrio perdedor se toma tan en serio que a veces su estandarte se cuelga boca abajo en señal de luto hasta la siguiente carrera, dos meses después.|La course du Palio se dispute sur la place principale en pente et en forme de coquille de Sienne depuis au moins le XVIIe siècle, à cru et en à peine 90 secondes, entre dix des dix-sept quartiers historiques de la ville, tirés au sort à chaque fois. Le deuil d'un quartier perdant est pris si au sérieux que sa bannière est parfois pendue à l'envers en signe de deuil jusqu'à la course suivante, deux mois plus tard.|パリオと呼ばれる競馬は、少なくとも17世紀からシエナの傾斜した貝殻形の中央広場で行われている。裸馬に乗りわずか90秒ほどで決着し、毎回くじで選ばれる市内17の歴史的地区のうち10地区が競う。負けた地区の悲嘆は本気で、二か月後の次のレースまで喪に服すように旗を逆さに掲げることさえある。",
    [prop("Piazza del Campo Grandstand|Tribuna de la Piazza del Campo|Tribune de la Piazza del Campo|カンポ広場の観覧席", 620, 128),
     prop("Contrada Banner Workshop|Taller de estandartes de contrada|Atelier des bannières de contrada|地区旗の工房", 300, 62)],
  ),
  pisa: city(
    "Pisa|Pisa|Pise|ピサ",
    10.4017, 43.7228, "cen", "leaningtower", "leaningtower", "l",
    "A mistake that became the town's fortune|Un error que se convirtió en la fortuna del pueblo|Une erreur devenue la fortune de la ville|失敗が町の財産になった",
    "The bell tower began sinking into soft subsoil before its third storey was even finished in 1178, and rather than tear it down the builders kept going for another two centuries, angling the upper floors slightly the other way to compensate, which is why the tower curves along its height like a banana. Engineers spent the 1990s quietly removing soil from the north side to correct the lean by about 40 centimetres — just enough to keep it standing for centuries more without making it boringly straight.|El campanario empezó a hundirse en un subsuelo blando antes de que se terminara siquiera su tercera planta en 1178, y en lugar de derribarlo los constructores siguieron adelante otros dos siglos, inclinando los pisos superiores algo hacia el otro lado para compensar, por lo que la torre se curva a lo largo de su altura como un plátano. Los ingenieros pasaron los años noventa retirando discretamente tierra del lado norte para corregir la inclinación unos 40 centímetros, justo lo necesario para que aguante siglos más sin quedar aburridamente recta.|Le campanile commença à s'enfoncer dans un sous-sol meuble avant même que son troisième étage ne soit achevé en 1178, et plutôt que de le démolir, les bâtisseurs poursuivirent deux siècles durant, inclinant légèrement les étages supérieurs dans l'autre sens pour compenser, ce qui donne à la tour sa courbe en banane sur toute sa hauteur. Dans les années 1990, des ingénieurs retirèrent discrètement de la terre du côté nord pour corriger l'inclinaison d'environ 40 centimètres — juste assez pour qu'elle tienne encore des siècles sans devenir ennuyeusement droite.|この鐘楼は、1178年に三階部分が仕上がる前からすでに軟弱な地盤に沈み始めていた。取り壊す代わりに建設者たちはその後二世紀にわたり工事を続け、上層階をわずかに逆方向へ傾けて釣り合いを取った。そのため塔は高さ方向にバナナのように弧を描いている。1990年代、技術者たちは北側の地面をひそかに取り除く工事を行い、傾きをおよそ40cm是正した。これから何世紀も倒れずに済み、なおかつ退屈にまっすぐにはならない絶妙な加減である。",
    [prop("Leaning Tower Staircase|Escalera de la Torre Inclinada|Escalier de la tour penchée|斜塔の螺旋階段", 700, 144),
     prop("Field of Miracles Baptistery|Baptisterio del Campo de los Milagros|Baptistère du Champ des Miracles|奇跡の広場の洗礼堂", 360, 74)],
  ),
  sangimignano: city(
    "San Gimignano|San Gimignano|San Gimignano|サンジミニャーノ",
    11.0432, 43.4675, "cen", "towers", "hilltown", "r",
    "A skyline built by families trying to out-tower each other|Un perfil urbano construido por familias que intentaban superarse en torres|Une silhouette bâtie par des familles rivalisant de tours|一族どうしが塔の高さを競い合ってできた稜線",
    "San Gimignano's noble families once competed by building stone towers taller than their neighbours', purely as a show of wealth and a refuge during feuds, until the town reportedly had around 72 of them; only 14 survive today, but they still make the skyline look like a medieval Manhattan from the surrounding hills. A 14th-century law eventually capped new towers at the height of the town hall's, in an early attempt at zoning.|Las familias nobles de San Gimignano competían antaño por construir torres de piedra más altas que las de sus vecinos, puro alarde de riqueza y refugio durante las disputas, hasta que el pueblo llegó a tener, según se dice, unas 72; hoy solo sobreviven 14, pero aún hacen que el perfil parezca un Manhattan medieval visto desde las colinas cercanas. Una ley del siglo XIV acabó limitando las torres nuevas a la altura del ayuntamiento, en un temprano intento de ordenación urbana.|Les familles nobles de San Gimignano rivalisaient jadis en bâtissant des tours de pierre plus hautes que celles du voisin, pure démonstration de richesse et refuge lors des querelles, au point que la ville en compta, dit-on, environ 72 ; seules 14 subsistent aujourd'hui, mais elles donnent encore, vue des collines alentour, l'allure d'un Manhattan médiéval. Une loi du XIVe siècle finit par plafonner les nouvelles tours à la hauteur de celle de l'hôtel de ville, tentative précoce d'urbanisme.|サンジミニャーノの名家はかつて、隣家より高い石塔を建てることを競った。純粋な富の誇示であり、抗争の際の逃げ場でもあった。最盛期にはおよそ72基もあったと伝えられるが、いま残るのは14基のみで、それでも周囲の丘から見ると中世のマンハッタンのような稜線を描く。14世紀の法令はやがて新しい塔の高さを市庁舎の塔と同じ高さに制限した。早い時代の都市計画規制の一例である。",
    [prop("Medieval Tower Climb|Ascenso a la torre medieval|Ascension de la tour médiévale|中世の塔の登頂路", 340, 70),
     prop("Vernaccia Wine Cellar|Bodega de vino Vernaccia|Cave de vin Vernaccia|ヴェルナッチャワインの酒蔵", 190, 40)],
  ),
  assisi: city(
    "Assisi|Asís|Assise|アッシジ",
    12.6194, 43.0707, "cen", "hilltown", "hilltown", "l",
    "A basilica built two storeys deep for one saint|Una basílica construida de dos plantas para un solo santo|Une basilique bâtie sur deux niveaux pour un seul saint|一人の聖人のために二層に建てた聖堂",
    "The Basilica of San Francesco was built as two churches stacked one on top of the other, finished within two years of Francis's death in 1226, with the lower church's crypt holding his tomb and the upper church's walls carrying a fresco cycle of his life long credited to Giotto's workshop. A 1997 earthquake collapsed part of the upper church's vaulted ceiling on camera during a live broadcast, killing four people inside, and restorers spent years piecing the frescoes back together from thousands of fragments.|La basílica de San Francisco se construyó como dos iglesias apiladas una sobre otra, terminada a los dos años de la muerte de Francisco en 1226, con la cripta de la iglesia inferior guardando su tumba y los muros de la superior con un ciclo de frescos de su vida atribuido durante mucho tiempo al taller de Giotto. Un terremoto de 1997 derrumbó parte de la bóveda de la iglesia superior en directo durante una retransmisión, matando a cuatro personas dentro, y los restauradores pasaron años recomponiendo los frescos a partir de miles de fragmentos.|La basilique Saint-François fut bâtie comme deux églises superposées, achevée deux ans à peine après la mort de François en 1226, la crypte de l'église basse abritant sa tombe et les murs de l'église haute portant un cycle de fresques de sa vie longtemps attribué à l'atelier de Giotto. Un séisme de 1997 fit s'effondrer en direct, en pleine retransmission télévisée, une partie de la voûte de l'église haute, tuant quatre personnes à l'intérieur, et les restaurateurs passèrent des années à recomposer les fresques à partir de milliers de fragments.|サン・フランチェスコ聖堂は上下二層の教会を重ねた構造で、1226年のフランチェスコの死からわずか2年で完成した。下堂の地下納骨堂に彼の墓があり、上堂の壁には長らくジョット工房の作とされる生涯を描いたフレスコ画がある。1997年の地震では上堂の丸天井の一部がテレビ生中継のさなかに崩落し、中にいた4人が亡くなった。修復者たちは数千の破片からフレスコ画を何年もかけて元通りに組み直した。",
    [prop("Basilica Fresco Cycle|Ciclo de frescos de la basílica|Cycle de fresques de la basilique|聖堂のフレスコ画連作", 480, 100),
     prop("Hilltop Hermitage Trail|Senda del eremitorio de la colina|Sentier de l'ermitage du coteau|丘上の隠修庵への小径", 240, 50)],
  ),
  perugia: city(
    "Perugia|Perugia|Pérouse|ペルージャ",
    12.3888, 43.1122, "cen", "hilltown", "hilltown", "r",
    "A hilltop where a chocolate kiss hid a secret love note|Una colina donde un beso de chocolate escondía una nota de amor secreta|Un coteau où un baiser de chocolat cachait un mot d'amour secret|恋文を忍ばせたチョコレートの生まれた丘",
    "The hazelnut chocolate \"kiss,\" Baci, was invented here in 1922 by a company co-founder who reportedly wrapped love notes inside the foil for a man she was secretly seeing, a practice the brand still keeps up today with printed quotes instead. The factory just outside town now wraps well over a million of them a day, each little note printed in one of more than twenty languages.|El bombón de chocolate y avellana Baci se inventó aquí en 1922, obra de una cofundadora de la empresa que, según se cuenta, envolvía notas de amor dentro del papel de aluminio para un hombre con quien mantenía una relación secreta, práctica que la marca conserva hoy con citas impresas en su lugar. La fábrica a las afueras de la ciudad envuelve hoy más de un millón al día, cada notita impresa en una de más de veinte lenguas.|Le bonbon au chocolat et à la noisette Baci fut inventé ici en 1922 par une cofondatrice de l'entreprise qui, dit-on, glissait des mots d'amour dans le papier doré pour un homme qu'elle fréquentait en secret, une pratique que la marque perpétue aujourd'hui avec des citations imprimées. L'usine juste à la sortie de la ville en emballe aujourd'hui plus d'un million par jour, chaque petit mot étant imprimé dans l'une des plus de vingt langues utilisées.|ヘーゼルナッツチョコレート「バーチ」は1922年、この地で会社の共同創業者の一人によって生み出された。彼女は密かに付き合っていた男性のために銀紙の中に恋文を忍ばせていたと伝えられ、いまもブランドは印刷された名言に形を変えてその習わしを続けている。町の外れの工場ではいまも一日100万個以上が包装されており、それぞれの小さな紙片は20を超える言語のいずれかで印刷されている。",
    [prop("Chocolate Kiss Factory Shop|Tienda de fábrica del Baci|Boutique d'usine des Baci|バーチ工場直売店", 420, 86),
     prop("Medieval Aqueduct Walkway|Paseo del acueducto medieval|Promenade de l'aqueduc médiéval|中世の水道橋の遊歩道", 220, 46)],
  ),
  orvieto: city(
    "Orvieto|Orvieto|Orvieto|オルヴィエート",
    12.1133, 42.7186, "cen", "hilltown", "hilltown", "l",
    "A cathedral built to make a doubting priest believe|Una catedral construida para hacer creer a un sacerdote incrédulo|Une cathédrale bâtie pour convaincre un prêtre incrédule|疑う司祭を信じさせるために建てた大聖堂",
    "Orvieto's cathedral was commissioned after a travelling priest, unsure whether the bread of communion truly became the body of Christ, reportedly saw it bleed onto a linen cloth during Mass in 1263, and the relic is still processed through town every year on the feast of Corpus Domini. The facade alone took well over a century to finish and layers Gothic mosaics over sculpture from several later eras, giving it a far busier, more ornamented look than the plain striped stone of the nave behind it.|La catedral de Orvieto se encargó después de que un sacerdote itinerante, inseguro de si el pan de la comunión se convertía realmente en el cuerpo de Cristo, viera supuestamente que sangraba sobre un lienzo durante la misa de 1263, y la reliquia aún se procesiona cada año por la ciudad en la fiesta del Corpus Domini. Solo la fachada tardó más de un siglo en terminarse y superpone mosaicos góticos a esculturas de varias épocas posteriores, dándole un aspecto mucho más recargado que la piedra a rayas lisas de la nave.|La cathédrale d'Orvieto fut commandée après qu'un prêtre itinérant, doutant que le pain de communion devienne vraiment le corps du Christ, l'aurait vu saigner sur un linge pendant la messe de 1263, et la relique est encore processionnée chaque année dans la ville pour la fête du Corpus Domini. La seule façade mit plus d'un siècle à s'achever et superpose des mosaïques gothiques à des sculptures de plusieurs époques ultérieures, lui donnant un aspect bien plus chargé que la pierre à rayures unies de la nef.|オルヴィエートの大聖堂は、聖体のパンが本当にキリストの体になるのか疑っていた巡歴の司祭が、1263年のミサの最中にそれが亜麻布に血を滲ませるのを見たとの言い伝えをもとに建てられた。その聖遺物はいまも毎年、聖体の祝日に町を練り歩く行列で運ばれる。正面ファサードだけでも完成に一世紀以上かかっており、ゴシックのモザイクの上にさらに後の時代の彫刻が幾重にも重ねられ、背後の身廊の縞模様の石壁よりもずっと装飾過多な表情を見せる。",
    [prop("Cathedral Facade Overlook|Mirador de la fachada de la catedral|Belvédère de la façade de la cathédrale|大聖堂正面の展望台", 420, 86),
     prop("Underground Tuff Cave Tour|Visita a las cuevas de toba subterráneas|Visite des grottes de tuf souterraines|地下の凝灰岩洞窟めぐり", 220, 46)],
  ),

  // ---------------------------------------------------------------------
  // sud — 南部(カンパーニア・プーリア・バジリカータ・カラブリア・アブルッツォ)
  // ---------------------------------------------------------------------
  napoli: city(
    "Naples|Nápoles|Naples|ナポリ",
    14.2681, 40.8518, "sud", "bay", "bay", "r",
    "A pizza with rules strict enough to be a protected craft|Una pizza con reglas tan estrictas que es un oficio protegido|Une pizza aux règles si strictes qu'elle est un artisanat protégé|保護された技として厳格な決まりを持つピッツァ",
    "Naples' pizza-making tradition was added to UNESCO's list of intangible cultural heritage in 2017, and a certified Neapolitan pizzaiolo must still hand-stretch the dough without a rolling pin and bake it under 90 seconds in a wood oven above 430°C for a pie to legally carry the name margherita. The certification itself is granted in person by an examining board that visits pizzerias worldwide, and only a few thousand pizzaiolos globally hold it despite the style's fame.|La tradición pizzera de Nápoles se sumó en 2017 a la lista de patrimonio inmaterial de la UNESCO, y un pizzaiolo napolitano certificado aún debe estirar la masa a mano sin rodillo y hornearla menos de 90 segundos en un horno de leña a más de 430 °C para que una pizza lleve legalmente el nombre de margherita. La propia certificación la concede en persona un tribunal examinador que visita pizzerías de todo el mundo, y solo unos pocos miles de pizzaioli la poseen pese a la fama del estilo.|La tradition pizzaïolo napolitaine fut inscrite en 2017 au patrimoine culturel immatériel de l'UNESCO, et un pizzaiolo napolitain certifié doit encore étirer la pâte à la main sans rouleau et la cuire en moins de 90 secondes dans un four à bois à plus de 430°C pour qu'une pizza porte légalement le nom de margherita. La certification elle-même est délivrée en personne par un jury qui se déplace dans les pizzerias du monde entier, et seuls quelques milliers de pizzaiolos la détiennent malgré la renommée du style.|ナポリのピッツァ職人の技は2017年にユネスコの無形文化遺産に登録された。認定されたナポリのピッツァイオーロはいまも麺棒を使わず手だけで生地を伸ばし、430度を超える薪窯で90秒未満で焼き上げなければ、その一枚を法的に「マルゲリータ」と名乗れない。この認定は審査団が世界中の店に直接足を運んで対面で行うもので、名声のわりに認定を持つ職人は世界でも数千人にとどまる。",
    [prop("Wood-Fired Pizzeria|Pizzería de horno de leña|Pizzeria au four à bois|薪窯のピッツェリア", 800, 166),
     prop("Underground Cistern Tour|Visita a las cisternas subterráneas|Visite des citernes souterraines|地下貯水槽めぐり", 400, 82)],
  ),
  pompei: city(
    "Pompeii|Pompeya|Pompéi|ポンペイ",
    14.4989, 40.7461, "sud", "ruins", "temple", "l",
    "A city sealed mid-sentence by its own volcano|Una ciudad sellada a media frase por su propio volcán|Une ville scellée en pleine phrase par son propre volcan|文の途中で自らの火山に封じられた町",
    "When Vesuvius buried Pompeii under several metres of ash and pumice in 79 AD, it preserved not just buildings but the exact shapes of the people caught inside, since 19th-century excavators learned to pour plaster into the hollow cavities their decomposed bodies left in the hardened ash. Graffiti scratched into the walls by ordinary residents — election slogans, insults, a boast about a gladiator's love life — still survive in a way few other Roman cities can match, because nothing was ever built on top to scrape it away.|Cuando el Vesubio sepultó Pompeya bajo varios metros de ceniza y piedra pómez en el año 79 d. C., conservó no solo los edificios sino la forma exacta de las personas atrapadas dentro, ya que los excavadores del siglo XIX aprendieron a verter yeso en las cavidades huecas que sus cuerpos descompuestos dejaron en la ceniza endurecida. Los grafitis que residentes comunes rayaron en los muros —eslóganes electorales, insultos, una fanfarronada sobre la vida amorosa de un gladiador— sobreviven como en pocas otras ciudades romanas, porque nunca se construyó nada encima que los borrara.|Quand le Vésuve ensevelit Pompéi sous plusieurs mètres de cendre et de ponce en 79 apr. J.-C., il préserva non seulement les bâtiments mais les formes exactes des habitants surpris à l'intérieur, les fouilleurs du XIXe siècle ayant appris à couler du plâtre dans les cavités creuses laissées par leurs corps décomposés dans la cendre durcie. Les graffitis griffonnés sur les murs par des habitants ordinaires — slogans électoraux, insultes, vantardise sur la vie amoureuse d'un gladiateur — survivent comme dans peu d'autres villes romaines, car rien ne fut jamais rebâti par-dessus pour les effacer.|79年、ヴェスヴィオ山が数メートルの火山灰と軽石でポンペイを埋めたとき、建物だけでなく、閉じ込められた人々の姿かたちまでもがそのまま保存された。19世紀の発掘者たちは、腐敗した遺体が硬化した灰の中に残した空洞に石膏を流し込むことを覚えたのである。壁に一般の住民が刻んだ落書き――選挙のスローガン、悪口、剣闘士の恋愛自慢――も、他のローマ都市にはほとんど例のない形でいまも残っている。上に何も建て直されず、削られることがなかったからである。",
    [prop("Plaster Cast Victim Hall|Sala de los moldes de yeso|Salle des moulages en plâtre|石膏像の展示室", 460, 96),
     prop("Forum Excavation Walk|Paseo por el foro excavado|Promenade dans le forum fouillé|発掘されたフォルムの散策路", 260, 54)],
  ),
  sorrento: city(
    "Sorrento|Sorrento|Sorrente|ソレント",
    14.3757, 40.6263, "sud", "citrus", "cliffhouses", "r",
    "A lemon so big it needs both hands|Un limón tan grande que necesita las dos manos|Un citron si gros qu'il faut les deux mains|両手で抱えるほど大きなレモン",
    "The lemons grown on terraces around Sorrento can weigh half a kilogram each, sheltered under straw matting in winter and watered through channels some families have maintained for generations, and their thick, fragrant peel is what actually flavours limoncello rather than the fruit's juice. The local variety, Limone di Sorrento, carries a protected European designation, meaning a bottle can only be labelled true Sorrento limoncello if the peel came from these same terraced groves.|Los limones cultivados en las terrazas de Sorrento pueden pesar medio kilo cada uno, resguardados bajo esteras de paja en invierno y regados por canales que algunas familias mantienen desde hace generaciones, y su cáscara gruesa y aromática es lo que en realidad da sabor al limoncello, más que el zumo. La variedad local, Limone di Sorrento, tiene una denominación europea protegida, por lo que una botella solo puede etiquetarse como limoncello de Sorrento auténtico si la cáscara proviene de estos mismos huertos en terrazas.|Les citrons cultivés sur les terrasses autour de Sorrente peuvent peser un demi-kilo chacun, abrités sous des nattes de paille l'hiver et irrigués par des canaux que certaines familles entretiennent depuis des générations, et c'est leur peau épaisse et parfumée, plus que le jus du fruit, qui donne son goût au limoncello. La variété locale, Limone di Sorrento, bénéficie d'une appellation européenne protégée : une bouteille ne peut être étiquetée vrai limoncello de Sorrente que si l'écorce provient de ces mêmes vergers en terrasses.|ソレント周辺の段々畑で育つレモンは一つ半キログラムにもなり、冬は藁のむしろで覆われ、何世代にもわたって家族が守ってきた水路で灌漑される。リモンチェッロに風味を与えているのは果汁ではなく、この厚く香り高い皮のほうである。地元品種「ソレントレモン(リモーネ・ディ・ソレント)」はヨーロッパの保護原産地呼称を得ており、この段々畑で採れた皮を使ったものでなければ、本物の「ソレントのリモンチェッロ」を名乗ることはできない。",
    [prop("Lemon Terrace Grove|Huerto de limoneros en terraza|Verger de citronniers en terrasse|段々畑のレモン園", 380, 78),
     prop("Limoncello Distillery|Destilería de limoncello|Distillerie de limoncello|リモンチェッロの蒸留所", 220, 46)],
  ),
  positano: city(
    "Positano|Positano|Positano|ポジターノ",
    14.4849, 40.6280, "sud", "cliffhouses", "cliffhouses", "l",
    "A fishing village that couldn't afford its own postcards|Un pueblo de pescadores que no podía costearse sus propias postales|Un village de pêcheurs qui ne pouvait même pas s'offrir ses propres cartes postales|自分の絵はがきさえ買えなかった漁村",
    "Positano was poor enough after the Second World War that much of its young population emigrated to find work, until a 1953 essay by John Steinbeck describing its impossibly stacked, pastel-coloured houses drew the first wave of tourists who turned fishing into the town's second industry. Nearly every building still clings to the same cliff face, connected by staircases rather than streets, so deliveries and even furniture are often moved by handcart or boat rather than by van.|Positano era tan pobre tras la Segunda Guerra Mundial que buena parte de su población joven emigró en busca de trabajo, hasta que un ensayo de John Steinbeck de 1953 que describía sus imposibles casas apiladas de colores pastel atrajo la primera ola de turistas, que convirtieron la pesca en la segunda industria del pueblo. Casi todos los edificios se aferran aún a la misma ladera, unidos por escaleras y no por calles, así que los repartos e incluso los muebles a menudo se mueven en carretilla o en barca en vez de en furgoneta.|Positano était assez pauvre après la Seconde Guerre mondiale pour qu'une bonne part de sa jeunesse émigre chercher du travail, jusqu'à ce qu'un essai de John Steinbeck en 1953, décrivant ses maisons pastel empilées de façon impossible, attire la première vague de touristes qui firent de la pêche la seconde industrie du village. Presque chaque bâtiment s'accroche encore à la même falaise, relié par des escaliers plutôt que des rues, si bien que livraisons et même meubles se déplacent souvent en brouette ou en barque plutôt qu'en camionnette.|ポジターノは第二次世界大戦後、若い世代の多くが仕事を求めて出ていくほど貧しい村だった。1953年、ジョン・スタインベックがありえないほど積み重なったパステルカラーの家並みを描いたエッセイを発表すると、最初の観光客の波が訪れ、漁業に次ぐ第二の産業が生まれた。いまもほとんどの建物が同じ崖にへばりつくように建ち、通りではなく階段でつながっているため、荷物や家具の運搬さえバンではなく手押し車や船で行われることが多い。",
    [prop("Cliffside Staircase Villa|Villa de escaleras en el acantilado|Villa des escaliers à flanc de falaise|崖の階段沿いの別荘", 480, 100),
     prop("Beach Boat Rental Stand|Puesto de alquiler de barcas de playa|Stand de location de barques|浜辺のボート貸し出し所", 260, 54)],
  ),
  bari: city(
    "Bari|Bari|Bari|バーリ",
    16.8719, 41.1171, "sud", "port", "port", "r",
    "A saint's bones, stolen twice, that never stopped travelling|Los huesos de un santo, robados dos veces, que nunca dejaron de viajar|Les ossements d'un saint, volés deux fois, qui n'ont jamais cessé de voyager|盗まれても旅を続けた聖人の骨",
    "Bari's basilica holds the bones of Saint Nicholas, seized by Italian sailors from Myra in 1087 and carried home by ship, and a small vial of clear liquid said to seep from the relics is drained every year in a ceremony watched by pilgrims from as far as Russia, where the saint is also venerated. Every May the arrival is re-enacted with a wooden boat carried from the harbour to the basilica by torchlight, followed by fireworks over the sea.|La basílica de Bari guarda los huesos de San Nicolás, robados por marineros italianos de Mira en 1087 y llevados a casa por mar, y cada año se extrae en una ceremonia un pequeño frasco de líquido claro que se dice mana de las reliquias, seguida por peregrinos venidos desde tan lejos como Rusia, donde el santo también se venera. Cada mes de mayo se reconstruye la llegada con una barca de madera llevada desde el puerto hasta la basílica a la luz de antorchas, seguida de fuegos artificiales sobre el mar.|La basilique de Bari conserve les ossements de saint Nicolas, saisis par des marins italiens à Myre en 1087 et ramenés par bateau, et une petite fiole de liquide clair censé suinter des reliques est prélevée chaque année lors d'une cérémonie suivie par des pèlerins venus de Russie, où le saint est également vénéré. Chaque mois de mai, l'arrivée est rejouée avec une barque de bois portée du port jusqu'à la basilique aux flambeaux, suivie d'un feu d'artifice sur la mer.|バーリの聖堂には、1087年にイタリアの船乗りたちがミラから奪って船で持ち帰った聖ニコラウスの遺骨が納められている。遺骨から滲み出るとされる透明な液体を小瓶に汲み出す儀式が毎年行われ、この聖人を崇敬するロシアからも巡礼者が見物に訪れる。毎年5月にはこの上陸の様子が再現され、木造船が松明の明かりとともに港から聖堂まで運ばれたあと、海上で花火が打ち上げられる。",
    [prop("Basilica Relic Chapel|Capilla de las reliquias de la basílica|Chapelle des reliques de la basilique|聖堂の聖遺物礼拝堂", 520, 108),
     prop("Orecchiette Pasta Lane|Callejón de la pasta orecchiette|Ruelle des orecchiette|オレッキエッテの路地", 280, 58)],
  ),
  alberobello: city(
    "Alberobello|Alberobello|Alberobello|アルベロベッロ",
    17.2394, 40.7826, "sud", "trulli", "trulli", "l",
    "Roofs light enough to vanish before the tax man — so the story goes|Tejados lo bastante ligeros para desvanecerse antes del recaudador, según se cuenta|Des toits assez légers pour s'effacer avant le fisc, dit-on|税吏の前に消えられる屋根――と言い伝えられている",
    "Trulli are built dry, without a trace of mortar, stacking flat local limestone into a cone that needs no timber frame at all, a technique distinctive enough that the whole town is a UNESCO World Heritage site. Local guides still repeat an old explanation for why: that a roof left unmortared could be pulled down within a day whenever a royal tax inspector was said to be approaching, leaving no permanent house behind to tax — a tidy story no surviving record actually confirms, but one Alberobello tells anyway.|Los trulli se construyen en seco, sin rastro de argamasa, apilando piedra caliza local plana en un cono que no necesita armazón de madera, una técnica tan singular que todo el pueblo es Patrimonio de la Humanidad. Los guías locales aún repiten una vieja explicación: que un tejado sin argamasa podía derribarse en un día en cuanto se anunciaba la llegada de un inspector real de impuestos, sin dejar casa permanente que gravar; una historia ordenada que ningún documento conservado confirma, pero que Alberobello sigue contando.|Les trulli sont bâtis à sec, sans la moindre trace de mortier, empilant une pierre calcaire locale plate en un cône qui ne nécessite aucune charpente de bois, une technique si singulière que la ville entière est classée au patrimoine mondial de l'UNESCO. Les guides locaux répètent encore une vieille explication : un toit sans mortier pouvait être abattu en une journée dès qu'on annonçait l'arrivée d'un inspecteur royal des impôts, ne laissant aucune maison permanente à taxer — une histoire bien commode qu'aucun document conservé ne confirme, mais qu'Alberobello raconte quand même.|トゥルッリはモルタルを一切使わず、地元産の平たい石灰岩を積み上げるだけで木の骨組みもなしに円錐を組み上げる、独特すぎる技法で知られ、それゆえ町ごと世界遺産に登録されている。地元のガイドはいまも、その理由についてこんな昔話を繰り返す――王の徴税官が来ると知らせが入れば、モルタルを使わない屋根は一日で崩せて、課税対象になる恒久的な家を残さずに済んだのだと。都合の良い話だが、それを裏付ける記録は何一つ残っておらず、それでもアルベロベッロはこの話を語り継いでいる。",
    [prop("Whitewashed Trullo Stay|Alojamiento en trullo encalado|Séjour dans un trullo blanchi|白壁のトゥルッロの宿", 420, 86),
     prop("Painted Roof-Symbol Workshop|Taller de símbolos de tejado|Atelier des symboles de toiture|屋根絵の工房", 240, 50)],
  ),
  lecce: city(
    "Lecce|Lecce|Lecce|レッチェ",
    18.1720, 40.3515, "sud", "baroque", "baroque", "r",
    "A city carved from stone soft enough to sculpt like wax|Una ciudad tallada en una piedra blanda como cera|Une ville sculptée dans une pierre tendre comme de la cire|蝋のように彫れる石から生まれた町",
    "Lecce's builders quarried a local limestone soft enough to cut with a saw and carve almost like wax when freshly dug, then found it hardened on exposure to air, which let 17th-century sculptors cover church facades with gargoyles, fruit and swirling scrollwork so dense the style earned its own name, Baroque leccese. That same stone, pietra leccese, is soft enough that local artisans still hand-carve it into miniature nativity figures today, a craft sold from workshops around the old town all year round.|Los constructores de Lecce extraían una piedra caliza local tan blanda que se cortaba con sierra y se tallaba casi como cera recién extraída, para endurecerse luego al contacto con el aire, lo que permitió a los escultores del siglo XVII cubrir las fachadas de las iglesias con gárgolas, frutas y volutas tan densas que el estilo recibió nombre propio, el barroco leccese. Esa misma piedra, la pietra leccese, sigue siendo bastante blanda para que los artesanos locales tallen a mano pequeñas figuras de belén, un oficio que se vende en talleres del casco antiguo durante todo el año.|Les bâtisseurs de Lecce extrayaient un calcaire local assez tendre pour se couper à la scie et se sculpter presque comme de la cire fraîchement tirée du sol, avant de durcir au contact de l'air, ce qui permit aux sculpteurs du XVIIe siècle de couvrir les façades d'églises de gargouilles, de fruits et de volutes si denses que le style reçut son propre nom, le baroque leccese. Cette même pierre, la pietra leccese, reste assez tendre pour que les artisans locaux la sculptent encore à la main en petites figurines de crèche, un artisanat vendu toute l'année dans les ateliers de la vieille ville.|レッチェの建築家たちは、掘り出したばかりのときはまるで蝋のように鋸で切って彫れるほど柔らかい地元の石灰岩を採掘したが、空気に触れると硬くなることが分かった。これにより17世紀の彫刻家たちは教会の正面をガーゴイルや果物、渦巻き模様で埋め尽くすほど密に飾り立て、その様式は「レッチェ様式バロック」という固有の名で呼ばれるようになった。この同じ石「ピエトラ・レッチェーゼ」はいまも柔らかく、地元の職人たちがこれを手彫りして小さなキリスト降誕の人形に仕立てており、旧市街の工房で一年を通して売られている。",
    [prop("Baroque Facade Workshop|Taller de fachadas barrocas|Atelier des façades baroques|バロック様式の正面の工房", 460, 96),
     prop("Buried Roman Amphitheatre|Anfiteatro romano enterrado|Amphithéâtre romain enseveli|埋もれたローマ円形闘技場", 240, 50)],
  ),
  matera: city(
    "Matera|Matera|Matera|マテーラ",
    16.6110, 40.6664, "sud", "sassi", "sassi", "l",
    "A slum turned into a World Heritage stage set|Un barrio marginal convertido en escenario patrimonio mundial|Un bidonville devenu décor du patrimoine mondial|貧民街から世界遺産の舞台へ",
    "Until the 1950s the cave-dwellings of the Sassi housed thousands of families, sometimes sharing a single room with the family donkey, in conditions bad enough that the government forcibly relocated the entire population and called the site a national disgrace. Only decades later did Matera rebrand the same caves as heritage, and film crews now use their bare stone alleys to stand in for ancient Jerusalem.|Hasta los años cincuenta, las viviendas rupestres de los Sassi albergaban a miles de familias, a veces compartiendo una sola habitación con el burro familiar, en condiciones tan malas que el gobierno reubicó a la fuerza a toda la población y llamó al lugar una vergüenza nacional. Solo décadas después Matera transformó esas mismas cuevas en patrimonio, y los equipos de cine usan hoy sus callejones de piedra desnuda para representar la antigua Jerusalén.|Jusque dans les années 1950, les habitations troglodytes des Sassi logeaient des milliers de familles, parfois dans une seule pièce partagée avec l'âne du foyer, dans des conditions si mauvaises que le gouvernement reloge de force toute la population et qualifie le site de honte nationale. Ce n'est que des décennies plus tard que Matera a transformé ces mêmes grottes en patrimoine, et des équipes de tournage utilisent aujourd'hui leurs ruelles de pierre nue pour représenter l'antique Jérusalem.|1950年代まで、サッシと呼ばれる洞窟住居には数千家族が暮らし、家族のロバと同じ一部屋で寝起きすることも珍しくないほどの劣悪な環境だったため、政府は住民全員を強制的に移住させ、この土地を「国の恥」と呼んだ。それから数十年を経てようやくマテーラは同じ洞窟を遺産として売り出すようになり、いまでは撮影隊がむき出しの石畳の路地を古代エルサレムの代役として使っている。",
    [prop("Cave Dwelling Guesthouse|Casa de huéspedes rupestre|Maison d'hôtes troglodyte|洞窟住居の宿", 480, 100),
     prop("Rock Church Overlook|Mirador de la iglesia rupestre|Belvédère de l'église rupestre|岩窟教会の展望台", 260, 54)],
  ),
  tropea: city(
    "Tropea|Tropea|Tropea|トロペア",
    15.8974, 38.6774, "sud", "cliffhouses", "cliffhouses", "r",
    "A cathedral that survived two bombs and kept one as a souvenir|Una catedral que sobrevivió a dos bombas y se quedó una de recuerdo|Une cathédrale qui survécut à deux bombes et en garda une en souvenir|二発の爆弾を生き延び、一発を記念に残した大聖堂",
    "Tropea's cathedral is perched right at the cliff edge and survived two 20th-century bombing raids, with a single unexploded shell still lodged in its wall as a relic today. Its position high above the sea makes it one of Calabria's most-photographed sights, best seen from the long staircase cut into the rock that leads down to the beach below.|La catedral de Tropea está encaramada justo al borde del acantilado y sobrevivió a dos bombardeos del siglo XX, con un obús sin estallar aún alojado en su muro como reliquia. Su posición en lo alto, sobre el mar, la convierte en una de las vistas más fotografiadas de Calabria, mejor apreciada desde la larga escalera tallada en la roca que baja hasta la playa.|La cathédrale de Tropea est perchée au bord même de la falaise et a survécu à deux bombardements du XXe siècle, un obus non explosé restant logé dans son mur en guise de relique. Sa position en hauteur au-dessus de la mer en fait l'un des sites les plus photographiés de Calabre, vu au mieux depuis le long escalier taillé dans la roche qui descend vers la plage.|トロペアの大聖堂は崖の縁ぎりぎりに立ち、20世紀に二度の爆撃を受けながらも残った。不発弾一発がいまも聖遺物のように壁に埋まったままである。海を見下ろす高い場所にあるため、カラブリア州でも指折りの撮影スポットとなっており、下の浜へと続く岩を刻んだ長い階段から眺めるのが一番よい。",
    [prop("Cliffside Cathedral Terrace|Terraza de la catedral del acantilado|Terrasse de la cathédrale sur la falaise|崖の大聖堂のテラス", 380, 78),
     prop("Red Onion Market Stall|Puesto de cebolla roja del mercado|Étal d'oignons rouges du marché|赤玉ねぎの市場の露店", 210, 44)],
  ),
  laquila: city(
    "L'Aquila|L'Aquila|L'Aquila|ラクイラ",
    13.3995, 42.3498, "sud", "mountain", "mountain", "l",
    "A town built by 99 villages, refusing to be one|Un pueblo construido por 99 aldeas, negándose a ser una sola|Une ville bâtie par 99 villages, refusant d'être un seul|九十九の村が作り、一つにはなりきらない町",
    "L'Aquila was founded in the 13th century by uniting 99 surrounding villages into a single fortified town, and legend still credits each village with building one of the 99 spouts on the town's Fountain of 99 Spouts, and one of the 99 strikes rung on a bell each evening. The fountain's 99 carved stone masks, set into a trapezoidal wall at the edge of the old town, are said to be no two exactly alike, one for each founding village, still spouting water drawn from two separate mountain streams.|L'Aquila se fundó en el siglo XIII uniendo 99 aldeas cercanas en un solo pueblo fortificado, y la leyenda aún atribuye a cada aldea la construcción de uno de los 99 caños de la Fuente de las 99 Bocas, y una de las 99 campanadas que suenan cada noche. Las 99 máscaras de piedra talladas de la fuente, incrustadas en un muro trapezoidal al borde del casco antiguo, dicen que no hay dos iguales, una por cada aldea fundadora, y siguen manando agua de dos arroyos de montaña distintos.|L'Aquila fut fondée au XIIIe siècle en unissant 99 villages voisins en une seule ville fortifiée, et la légende attribue encore à chaque village la construction de l'un des 99 becs de la Fontaine aux 99 canons, et l'un des 99 coups sonnés chaque soir à la cloche. Les 99 masques de pierre sculptés de la fontaine, encastrés dans un mur trapézoïdal en bordure de la vieille ville, n'en auraient pas deux identiques, un par village fondateur, et laissent encore couler l'eau de deux torrents de montagne distincts.|ラクイラは13世紀、周辺の99の村を一つの城塞都市にまとめて建てられた。伝説ではいまも、町の「99の水口の噴水」の水口一つひとつを、そして毎晩鐘が鳴らす99打の一打ずつを、それぞれの村が受け持ったとされる。旧市街の端にある台形の壁に埋め込まれたこの噴水の99の彫刻仮面は、一つとして同じものがなく、それぞれが建設に加わった村を表すとされ、いまも二本の別々の山の水流から水を注ぎ続けている。",
    [prop("Fountain of Ninety-Nine Spouts|Fuente de las Noventa y Nueve Bocas|Fontaine aux Quatre-Vingt-Dix-Neuf Becs|九十九の水口の噴水", 280, 58),
     prop("Rebuilt Basilica Bell Tower|Campanario reconstruido de la basílica|Clocher reconstruit de la basilique|再建された聖堂の鐘楼", 170, 36)],
  ),
  reggiocalabria: city(
    "Reggio Calabria|Reggio Calabria|Reggio de Calabre|レッジョ・カラブリア",
    15.6500, 38.1113, "sud", "port", "port", "r",
    "Two ancient warriors, fished out of the sea by accident|Dos antiguos guerreros, pescados del mar por accidente|Deux guerriers antiques, repêchés en mer par hasard|海底から偶然引き上げられた古代の戦士二体",
    "A scuba diver spotted what turned out to be two full-size Greek bronze statues, now called the Riace Bronzes, lying on the seabed just offshore in 1972, cast around the 5th century BC and so well preserved that restorers spent years just removing centuries of marine calcium before they could stand in the city's museum. How the statues came to rest on the seabed is still unresolved; the leading theory is a shipwreck that lost its cargo of looted bronzes somewhere on the way to Rome.|En 1972, un buceador vio lo que resultaron ser dos estatuas griegas de bronce de tamaño natural, hoy llamadas los Bronces de Riace, tumbadas en el fondo marino justo frente a la costa, fundidas hacia el siglo V a. C. y tan bien conservadas que los restauradores pasaron años solo retirando siglos de calcio marino antes de poder exponerlas en el museo de la ciudad. Cómo llegaron las estatuas al fondo marino sigue sin resolverse; la teoría más aceptada es un naufragio que perdió su cargamento de bronces saqueados camino de Roma.|En 1972, un plongeur repéra ce qui s'avéra être deux statues grecques en bronze grandeur nature, aujourd'hui appelées les bronzes de Riace, gisant sur le fond marin juste au large, coulées vers le Ve siècle av. J.-C. et si bien conservées que les restaurateurs passèrent des années à seulement retirer des siècles de calcaire marin avant de pouvoir les dresser dans le musée de la ville. La manière dont les statues ont fini sur le fond marin reste non résolue ; la théorie dominante est un naufrage ayant perdu sa cargaison de bronzes pillés en route vers Rome.|1972年、あるダイバーが沖合の海底に横たわる等身大のギリシャ青銅像二体を見つけた。いまはリアーチェの青銅像と呼ばれるこの像は紀元前5世紀ごろの鋳造で、あまりに保存状態が良かったため、修復者たちは市の博物館に立たせる前に何世紀分もの海中石灰分を取り除くだけで何年も費やした。像がなぜ海底に沈んでいたのかはいまも解明されておらず、略奪した青銅像を積んだ船がローマへ向かう途中で難破したとする説が最も有力とされる。",
    [prop("Riace Bronzes Museum Hall|Sala del museo de los Bronces de Riace|Salle du musée des bronzes de Riace|リアーチェの青銅像の展示室", 480, 100),
     prop("Strait-View Waterfront Promenade|Paseo marítimo con vistas al estrecho|Promenade du front de mer sur le détroit|海峡を望む海岸遊歩道", 260, 54)],
  ),

  // ---------------------------------------------------------------------
  // sic — シチリア
  // ---------------------------------------------------------------------
  palermo: city(
    "Palermo|Palermo|Palerme|パレルモ",
    13.3614, 38.1157, "sic", "port", "port", "r",
    "A capital ruled in turn by Arabs, Normans and Spaniards|Una capital gobernada, por turnos, por árabes, normandos y españoles|Une capitale gouvernée tour à tour par Arabes, Normands et Espagnols|アラブ・ノルマン・スペインが代わる代わる治めた都",
    "Palermo's cathedral was a mosque before it was a church and still keeps a verse of the Quran carved into a column by its south door, left in place through the eight centuries of Norman, Spanish and Italian rule that followed. The Capo and Ballarò street markets still call out prices in a singsong chant, abbanniata, that vendors say goes back to the Arab souks the markets grew from over a thousand years ago.|La catedral de Palermo fue mezquita antes que iglesia y aún conserva un versículo del Corán tallado en una columna junto a su puerta sur, dejado allí a través de los ocho siglos de dominio normando, español e italiano que siguieron. Los mercados callejeros de Capo y Ballarò todavía pregonan los precios con un canturreo, la abbanniata, que los vendedores dicen que se remonta a los zocos árabes de los que nacieron los mercados hace más de mil años.|La cathédrale de Palerme fut une mosquée avant d'être une église et conserve encore un verset du Coran gravé sur une colonne près de sa porte sud, laissé en place à travers les huit siècles de domination normande, espagnole puis italienne qui suivirent. Les marchés de rue du Capo et de Ballarò crient encore les prix sur un chant scandé, l'abbanniata, que les marchands disent hérité des souks arabes dont les marchés sont nés il y a plus de mille ans.|パレルモ大聖堂はもともとモスクで、のちに教会になったが、南側の扉近くの柱にはいまもコーランの一節が刻まれたまま残っている。その後ノルマン・スペイン・イタリアと支配者が代わった800年のあいだも、それは削られずに残った。カーポ市場やバッラロ市場では、いまも「アッバンニアータ」と呼ばれる節をつけた売り声で値段を呼ばわる。商人たちは、この市場が生まれたもとになった千年以上前のアラブの市場(スーク)にまでさかのぼる習わしだと言う。",
    [prop("Norman Cathedral Cloister|Claustro de la catedral normanda|Cloître de la cathédrale normande|ノルマン大聖堂の回廊", 620, 128),
     prop("Ballarò Market Stall|Puesto del mercado Ballarò|Étal du marché Ballarò|バッラロ市場の露店", 340, 70)],
  ),
  catania: city(
    "Catania|Catania|Catane|カターニア",
    15.0873, 37.5079, "sic", "volcano", "volcano", "l",
    "A city that keeps rebuilding on top of what buried it|Una ciudad que sigue reconstruyendo sobre lo que la sepultó|Une ville qui ne cesse de rebâtir sur ce qui l'a ensevelie|自らを埋めたものの上に、また建て直す町",
    "Catania has been leveled by Etna's lava and by earthquakes so many times that its current Baroque centre, rebuilt after a 1693 quake killed an estimated two-thirds of the population, sits on top of at least two earlier cities, with a Roman theatre still being excavated out from underneath someone's actual living room. The black volcanic stone used to pave and build the whole rebuilt centre came from the very lava flows that had just destroyed it.|Catania ha sido arrasada tantas veces por la lava del Etna y por terremotos que su actual centro barroco, reconstruido tras un terremoto de 1693 que mató a un estimado de dos tercios de la población, se asienta sobre al menos dos ciudades anteriores, con un teatro romano que todavía se excava bajo el salón de la casa de alguien. La piedra volcánica negra usada para pavimentar y construir todo el centro reconstruido procedía de las mismas coladas de lava que acababan de destruirlo.|Catane a été rasée tant de fois par la lave de l'Etna et par des séismes que son actuel centre baroque, rebâti après un séisme de 1693 qui tua environ les deux tiers de la population, repose sur au moins deux villes antérieures, un théâtre romain étant encore fouillé sous le salon bien réel de quelqu'un. La pierre volcanique noire utilisée pour paver et bâtir tout le centre reconstruit provenait des coulées de lave mêmes qui venaient de le détruire.|カターニアはエトナ山の溶岩や地震で何度も更地にされてきた。1693年の地震は人口のおよそ3分の2を奪ったとされ、そのあと再建された現在のバロック様式の中心街は、少なくとも二つの前身の町の上に建っており、いまも誰かの居間の床下からローマ時代の劇場が発掘され続けている。再建された中心街を舗装し建てるのに使われた黒い火山岩は、まさにその町を壊したばかりの溶岩流そのものから採られたものだった。",
    [prop("Buried Roman Theatre House|Casa sobre el teatro romano enterrado|Maison sur le théâtre romain enseveli|埋もれたローマ劇場の上の家", 480, 100),
     prop("Lava Stone Fish Market|Mercado de pescado de piedra lávica|Marché aux poissons en pierre de lave|溶岩石造りの魚市場", 260, 54)],
  ),
  taormina: city(
    "Taormina|Taormina|Taormine|タオルミーナ",
    15.2879, 37.8526, "sic", "temple", "temple", "r",
    "A Greek theatre with the best view of a live volcano|Un teatro griego con la mejor vista de un volcán activo|Un théâtre grec avec la meilleure vue sur un volcan actif|活火山を最も美しく望む古代劇場",
    "Taormina's Greek theatre, carved into a hillside around the 3rd century BC and later enlarged by the Romans, frames Mount Etna directly behind its stage so precisely that ancient architects are thought to have chosen the site for the view on purpose, and it still hosts concerts today with the volcano occasionally smoking on cue. At around 100 metres across, it is the second-largest surviving Greek theatre in Sicily, and the Roman-era changes that widened its stage floor for gladiator contests are still visible in the brickwork behind the original stone tiers.|El teatro griego de Taormina, tallado en una ladera hacia el siglo III a. C. y ampliado después por los romanos, enmarca el monte Etna justo detrás de su escenario con tal precisión que se cree que los arquitectos antiguos eligieron el lugar a propósito por la vista, y todavía hoy acoge conciertos con el volcán humeando a veces como si fuera parte del espectáculo. Con unos 100 metros de diámetro, es el segundo teatro griego mejor conservado de Sicilia, y las modificaciones romanas que ampliaron el escenario para combates de gladiadores aún se ven en la mampostería tras las gradas de piedra originales.|Le théâtre grec de Taormine, taillé dans un coteau vers le IIIe siècle av. J.-C. puis agrandi par les Romains, cadre le mont Etna juste derrière sa scène avec une telle précision qu'on pense que les architectes antiques choisirent le site exprès pour la vue, et il accueille encore aujourd'hui des concerts, le volcan fumant parfois comme sur commande. Avec une centaine de mètres de diamètre, c'est le deuxième théâtre grec le mieux conservé de Sicile, et les aménagements romains qui élargirent la scène pour des combats de gladiateurs restent visibles dans la maçonnerie derrière les gradins de pierre d'origine.|紀元前3世紀ごろ丘の斜面に彫られ、のちにローマ人が拡張したタオルミーナのギリシャ劇場は、舞台のすぐ背後にエトナ山をあまりに見事な構図で収めており、古代の設計者がわざとその眺めのために場所を選んだと考えられている。いまもコンサートが開かれ、火山がまるで演出のように噴煙を上げることさえある。直径およそ100メートルのこの劇場はシチリアで2番目に保存状態のよいギリシャ劇場で、剣闘士競技のために舞台を広げたローマ時代の改修跡が、元の石段席の裏のレンガ積みにいまも見て取れる。",
    [prop("Greek Theatre Etna View|Vista del Etna desde el teatro griego|Vue sur l'Etna depuis le théâtre grec|ギリシャ劇場からのエトナ山の眺め", 620, 128),
     prop("Clifftop Garden Villa|Villa con jardín en el acantilado|Villa au jardin sur la falaise|崖の上の庭園付き別荘", 320, 66)],
  ),
  siracusa: city(
    "Syracuse|Siracusa|Syracuse|シラクーサ",
    15.2866, 37.0755, "sic", "temple", "temple", "l",
    "A spring the Greeks believed was a river in disguise|Un manantial que los griegos creían un río disfrazado|Une source que les Grecs croyaient être un fleuve déguisé|ギリシャ人が川の化身と信じた泉",
    "The freshwater spring of Arethusa still bubbles up on the small island of Ortigia just metres from the sea, and Greek myth held it was really a nymph who fled her river god pursuer under the ocean floor all the way from Greece, surfacing here still fresh despite the swim. The spring's pool is planted today with papyrus, otherwise found growing wild in Europe only in Egypt, said to have taken root here from cuttings the Greek settlers carried with them.|El manantial de agua dulce de Aretusa aún brota en la pequeña isla de Ortigia, a pocos metros del mar, y el mito griego sostenía que en realidad era una ninfa que huyó bajo el lecho oceánico desde Grecia de un dios-río que la perseguía, y que emergió aquí todavía dulce pese al trayecto. El estanque del manantial está hoy plantado de papiro, que en estado silvestre solo crece en Europa en Egipto, y que se dice que arraigó aquí a partir de esquejes que trajeron los colonos griegos.|La source d'eau douce d'Aréthuse jaillit encore sur la petite île d'Ortigie, à quelques mètres de la mer, et le mythe grec voulait qu'il s'agisse en réalité d'une nymphe ayant fui sous le fond marin depuis la Grèce un dieu-fleuve qui la poursuivait, resurgissant ici encore douce malgré la traversée. Le bassin de la source est aujourd'hui planté de papyrus, qu'on ne trouve autrement à l'état sauvage en Europe qu'en Égypte, et qui s'y serait enraciné à partir de boutures apportées par les colons grecs.|オルティージャ島には、海からわずか数メートルの場所にいまも湧き続けるアレトゥーサの泉がある。ギリシャ神話では、これは追いかけてくる川の神から逃れてギリシャから海底を潜り抜けてきた妖精の姿だとされ、その道のりを経てもなお真水のままここに湧き出るという。この泉の池にはいまパピルスが植えられている。ヨーロッパで野生のパピルスが見られるのはエジプトを除けばここだけとされ、ギリシャからの入植者が持ち込んだ苗が根付いたのだと伝えられる。",
    [prop("Arethusa Spring Courtyard|Patio del manantial de Aretusa|Cour de la source d'Aréthuse|アレトゥーサの泉の中庭", 380, 78),
     prop("Greek Theatre Quarry Path|Senda de la cantera del teatro griego|Sentier de la carrière du théâtre grec|ギリシャ劇場の採石場の小径", 220, 46)],
  ),
  agrigento: city(
    "Agrigento|Agrigento|Agrigente|アグリジェント",
    13.5765, 37.3111, "sic", "temple", "temple", "r",
    "Temples that have outlasted the city that built them|Templos que han sobrevivido a la ciudad que los construyó|Des temples qui ont survécu à la ville qui les bâtit|建てた町より長く残った神殿",
    "The Valley of the Temples holds the best-preserved row of Greek Doric temples anywhere outside Greece itself, including the Temple of Concordia, which owes its near-perfect condition to being converted into a Christian church in the 6th century rather than left to be quarried for its stone like its neighbours. Ancient Akragas, as the Greeks called it, was once so wealthy that a historian of the time said its people ate as if they would die tomorrow and built as if they would live forever.|El Valle de los Templos alberga la mejor hilera conservada de templos dóricos griegos fuera de la propia Grecia, incluido el Templo de la Concordia, que debe su estado casi perfecto a haberse convertido en iglesia cristiana en el siglo VI en vez de acabar como cantera, como sus vecinos. La antigua Akragas, como la llamaban los griegos, fue en su día tan rica que un historiador de la época dijo que su gente comía como si fuera a morir mañana y construía como si fuera a vivir para siempre.|La vallée des Temples abrite la rangée de temples doriques grecs la mieux conservée en dehors de la Grèce elle-même, dont le temple de la Concorde, qui doit son état quasi parfait à sa conversion en église chrétienne au VIe siècle plutôt qu'à un usage de carrière comme ses voisins. L'antique Akragas, comme l'appelaient les Grecs, fut jadis si riche qu'un historien de l'époque disait que ses habitants mangeaient comme s'ils devaient mourir demain et bâtissaient comme s'ils devaient vivre toujours.|神殿の谷には、ギリシャ本土以外で最も保存状態の良いドリス式神殿の列が残っており、その中のコンコルディア神殿は、隣の神殿のように石材として切り出されることなく、6世紀にキリスト教会へ転用されたおかげでほぼ完璧な姿を保っている。ギリシャ人がアクラガスと呼んだこの古代都市はかつて非常に富み、当時のある歴史家は「住民は明日死ぬかのように食べ、永遠に生きるかのように建てる」と評した。",
    [prop("Temple of Concordia Overlook|Mirador del Templo de la Concordia|Belvédère du temple de la Concorde|コンコルディア神殿の展望地", 460, 96),
     prop("Almond Orchard Trail|Senda del almendral|Sentier de l'amanderaie|アーモンド果樹園の小径", 240, 50)],
  ),
  cefalu: city(
    "Cefalù|Cefalù|Cefalù|チェファル",
    14.0231, 38.0392, "sic", "cliffhouses", "cliffhouses", "l",
    "A cathedral a king built to keep a promise, or a threat|Una catedral que un rey construyó para cumplir una promesa, o una amenaza|Une cathédrale qu'un roi bâtit pour tenir une promesse, ou une menace|王が誓いのため、あるいは脅しのために建てた大聖堂",
    "King Roger II ordered Cefalù's cathedral built in the 1130s after reportedly surviving a shipwreck in the bay, and its interior mosaics of Christ, added later by Byzantine craftsmen, are considered among the finest in Sicily even though the cathedral itself was never finished as grandly as planned. Its twin towers still show that unfinished plan today: one was capped with a spire, the other left bare, and historians have never fully settled why the builders stopped there.|El rey Roger II mandó construir la catedral de Cefalù en la década de 1130 tras sobrevivir, según se cuenta, a un naufragio en la bahía, y sus mosaicos interiores de Cristo, añadidos después por artesanos bizantinos, se consideran de los mejores de Sicilia, aunque la catedral nunca se terminó tan grandiosa como se planeó. Sus dos torres gemelas aún muestran ese plan inconcluso: una se remató con una aguja y la otra quedó desnuda, y los historiadores nunca han aclarado del todo por qué los constructores se detuvieron ahí.|Le roi Roger II fit bâtir la cathédrale de Cefalù dans les années 1130 après avoir, dit-on, survécu à un naufrage dans la baie, et ses mosaïques intérieures du Christ, ajoutées plus tard par des artisans byzantins, comptent parmi les plus belles de Sicile, bien que la cathédrale n'ait jamais été achevée aussi grandiosement que prévu. Ses deux tours jumelles montrent encore ce plan inachevé : l'une fut coiffée d'une flèche, l'autre laissée nue, et les historiens n'ont jamais vraiment établi pourquoi les bâtisseurs s'arrêtèrent là.|ルッジェーロ2世は1130年代、湾での難破を生き延びたとの言い伝えとともにチェファルの大聖堂を建てさせた。後にビザンチンの職人が加えたキリストの内陣モザイクはシチリアでも屈指の出来映えとされるが、大聖堂自体は当初の壮大な計画どおりには完成しなかった。左右対称の二本の塔にもその未完成さが残っており、一方には尖塔が載るが、もう一方はいまも剥き出しのままで、なぜ建設がそこで止まったのか歴史家の間でも定説がない。",
    [prop("Norman Cathedral Mosaic|Mosaico de la catedral normanda|Mosaïque de la cathédrale normande|ノルマン大聖堂のモザイク", 420, 86),
     prop("La Rocca Cliff Trail|Senda del acantilado de La Rocca|Sentier de la falaise de La Rocca|ラ・ロッカの崖の小径", 220, 46)],
  ),

  // ---------------------------------------------------------------------
  // sar — サルデーニャ
  // ---------------------------------------------------------------------
  cagliari: city(
    "Cagliari|Cagliari|Cagliari|カリアリ",
    9.1096, 39.2238, "sar", "port", "port", "r",
    "A city with its own miniature flamingo migration|Una ciudad con su propia migración en miniatura de flamencos|Une ville avec sa propre migration miniature de flamants roses|町だけのミニチュアなフラミンゴの渡り",
    "The salt marshes just outside Cagliari fill every year with thousands of wild pink flamingos, close enough to the airport runway that pilots occasionally report them from the cockpit, feeding on the same brine shrimp that once fed the salt-pan industry the city ran for centuries. The birds get their colour from that same shrimp, and a handful born here now stay year-round instead of migrating on, having decided the marshes suit them fine in every season.|Las marismas saladas justo a las afueras de Cagliari se llenan cada año de miles de flamencos rosados salvajes, tan cerca de la pista del aeropuerto que los pilotos a veces los informan desde la cabina, alimentándose de la misma artemia salina que antaño alimentaba la industria salinera que la ciudad explotó durante siglos. Las aves obtienen su color de esa misma artemia, y algunas nacidas aquí ya no migran y se quedan todo el año, al parecer conformes con las marismas en cualquier estación.|Les marais salants juste aux portes de Cagliari se remplissent chaque année de milliers de flamants roses sauvages, assez proches de la piste de l'aéroport pour que les pilotes les signalent parfois depuis le cockpit, se nourrissant des mêmes artémies qui alimentaient jadis l'industrie salinière que la ville exploita des siècles durant. Les oiseaux tiennent leur couleur de ces mêmes artémies, et quelques-uns nés ici restent désormais toute l'année au lieu de migrer, les marais leur convenant apparemment en toute saison.|カリアリのすぐ郊外にある塩湖には毎年何千羽もの野生のフラミンゴが集まり、空港の滑走路にも近いためパイロットが操縦席から見つけて報告することもある。彼らが餌にするのは、かつてこの町が何世紀も営んだ塩田業を支えたのと同じアルテミア(ブラインシュリンプ)である。フラミンゴのピンク色もこのアルテミアに由来しており、ここで生まれた一部の個体は渡りをせず一年中住み着くようになった。どうやらこの塩湖はどの季節でも彼らの気に入っているらしい。",
    [prop("Castello Ramparts Cliff Lift|Ascensor del acantilado de las murallas de Castello|Ascenseur de la falaise des remparts de Castello|カステッロ城壁の崖のエレベーター", 480, 100),
     prop("Flamingo Salt Marsh Path|Senda de la marisma de flamencos|Sentier du marais salant aux flamants|フラミンゴの塩湖の小径", 260, 54)],
  ),
  alghero: city(
    "Alghero|Alguer|Alghero|アルゲーロ",
    8.3182, 40.5590, "sar", "port", "port", "l",
    "A Sardinian town that still speaks medieval Catalan|Un pueblo sardo que aún habla catalán medieval|Une ville sarde qui parle encore le catalan médiéval|いまも中世カタルーニャ語を話すサルデーニャの町",
    "Alghero was resettled by Catalan colonists after a 14th-century conquest replaced its population almost entirely, and a dialect called Alguerès, close to Catalan, is still spoken and taught in local schools today, closer to what was spoken in Barcelona 600 years ago than modern Catalan itself. The old town's sea walls, built by its Catalan-Aragonese rulers, are now lined with restaurants serving lobster caught by boats that still leave from the same harbour each morning.|Alghero fue repoblada por colonos catalanes tras una conquista del siglo XIV que sustituyó a casi toda su población, y un dialecto llamado alguerés, próximo al catalán, se sigue hablando y enseñando hoy en las escuelas locales, más cercano a lo que se hablaba en Barcelona hace 600 años que al catalán moderno. Las murallas marítimas del casco antiguo, construidas por sus gobernantes catalano-aragoneses, están hoy bordeadas de restaurantes que sirven langosta capturada por barcas que aún zarpan cada mañana del mismo puerto.|Alghero fut repeuplée par des colons catalans après une conquête du XIVe siècle qui remplaça presque toute sa population, et un dialecte appelé alguérois, proche du catalan, s'y parle et s'y enseigne encore aujourd'hui, plus proche de ce qu'on parlait à Barcelone il y a 600 ans que du catalan moderne lui-même. Les remparts maritimes de la vieille ville, bâtis par ses maîtres catalano-aragonais, sont aujourd'hui bordés de restaurants servant du homard pêché par des barques qui quittent encore le même port chaque matin.|アルゲーロは14世紀の征服でほぼ全住民が入れ替わり、カタルーニャからの入植者によって再び人が住むようになった町である。カタルーニャ語に近い「アルゲレース」という方言はいまも地元の学校で話され教えられており、現代のカタルーニャ語よりも600年前のバルセロナで話されていた言葉に近いとされる。カタルーニャ・アラゴン王家の支配者が築いた旧市街の海壁沿いにはいま、毎朝同じ港から出る船が獲ってくる伊勢海老を出すレストランが並ぶ。",
    [prop("Catalan Old Town Rampart|Muralla catalana del casco antiguo|Rempart catalan de la vieille ville|カタルーニャ様式の旧市街の城壁", 360, 74),
     prop("Harbour Lobster Restaurant|Restaurante de langosta del puerto|Restaurant de homard du port|港の伊勢海老レストラン", 210, 44)],
  ),
  olbia: city(
    "Olbia|Olbia|Olbia|オルビア",
    9.5019, 40.9236, "sar", "port", "port", "r",
    "A fishing port that built a coast of billionaires next door|Un puerto pesquero que creó al lado una costa de multimillonarios|Un port de pêche qui a bâti à sa porte une côte de milliardaires|隣に億万長者の海岸を生んだ漁港",
    "Olbia's harbour was a modest fishing and ferry port until the Aga Khan bought up a stretch of empty coastline just north of it in 1962 and developed the Costa Smeralda, a strip of resorts now among the most expensive coastline in Europe, turning Olbia's small airport into one of Sardinia's busiest. The Aga Khan's development company wrote its own strict building code, capping heights and colours across the whole resort so tightly that it is still enforced today, decades after his death.|El puerto de Olbia era una modesta escala pesquera y de ferris hasta que el Agha Khan compró en 1962 un tramo de costa vacía justo al norte y desarrolló la Costa Esmeralda, una franja de complejos turísticos hoy entre las costas más caras de Europa, que convirtió el pequeño aeropuerto de Olbia en uno de los más concurridos de Cerdeña. La empresa promotora del Agha Khan redactó su propio código de construcción estricto, limitando alturas y colores en todo el complejo con tal rigor que todavía se aplica hoy, décadas después de su muerte.|Le port d'Olbia n'était qu'une modeste escale de pêche et de ferries jusqu'à ce que l'Aga Khan rachète en 1962 un tronçon de côte déserte juste au nord et y aménage la Costa Smeralda, une bande de complexes aujourd'hui parmi les côtes les plus chères d'Europe, faisant du petit aéroport d'Olbia l'un des plus fréquentés de Sardaigne. La société d'aménagement de l'Aga Khan rédigea son propre code de construction strict, plafonnant hauteurs et couleurs dans tout le complexe avec une rigueur encore appliquée aujourd'hui, des décennies après sa mort.|オルビアの港は、1962年にアガ・カーンがすぐ北の何もない海岸を買い上げてコスタ・ズメラルダを開発するまでは、つつましい漁港とフェリー港にすぎなかった。アガ・カーンの開発会社は独自の厳格な建築規定を定め、リゾート全域の建物の高さと色を細かく制限した。この規定は彼の死から数十年たったいまも守られ続けている。",
    [prop("Ferry Terminal Harbourfront|Frente portuario de la terminal de ferris|Front de mer du terminal des ferries|フェリーターミナルの港湾地区", 340, 70),
     prop("Roman Shipwreck Dive Site|Punto de buceo del naufragio romano|Site de plongée de l'épave romaine|ローマ難破船のダイビングスポット", 190, 40)],
  ),
  nuoro: city(
    "Nuoro|Nuoro|Nuoro|ヌオーロ",
    9.3277, 40.3210, "sar", "shepherd", "mountain", "l",
    "Masked figures who parade in secretly carved wooden faces|Figuras enmascaradas que desfilan con rostros de madera tallados en secreto|Des figures masquées défilant avec des visages de bois sculptés en secret|秘伝の木彫りの面をつけて練り歩く仮面の一団",
    "Masked festival figures called Mamuthones still walk the streets of Nuoro each January wearing carved wooden masks and up to 30 kilograms of cowbells strapped to their backs, in a ritual older than anyone can date. The blackened masks are carved from pear wood by only a handful of local families, who keep the exact pattern of each face secret and pass the craft down within the family alone.|Figuras enmascaradas de la fiesta llamadas Mamuthones aún recorren las calles de Nuoro cada enero con máscaras de madera talladas y hasta 30 kg de cencerros a la espalda, en un ritual más antiguo de lo que nadie puede datar. Las máscaras ennegrecidas se tallan en madera de peral, y solo un puñado de familias locales conocen el diseño exacto de cada rostro, guardado en secreto y transmitido únicamente dentro de la familia.|Des personnages masqués de fête appelés Mamuthones parcourent encore les rues de Nuoro chaque janvier, masques de bois sculptés et jusqu'à 30 kg de clochettes sanglées dans le dos, rituel dont personne ne sait dater l'origine. Les masques noircis sont taillés dans du bois de poirier par une poignée seulement de familles locales, qui gardent secret le tracé exact de chaque visage et ne transmettent l'art qu'en leur sein.|毎年1月には、彫刻を施した木の面をかぶり最大30kgもの牛の鈴を背負ったマムトーネスと呼ばれる仮面の一団がいまもヌオーロの通りを練り歩く。いつ始まったのか誰にも分からないほど古い儀式である。黒く塗られたこの面は洋梨の木から彫り出されるが、作れるのはごく一握りの地元の家系だけで、それぞれの顔の正確な形は一子相伝のまま門外不出とされている。",
    [prop("Mamuthones Mask Workshop|Taller de máscaras de los Mamuthones|Atelier des masques de Mamuthones|マムトーネスの仮面工房", 280, 58),
     prop("Shepherd's Pecorino Dairy|Quesería pecorino del pastor|Fromagerie de pecorino du berger|羊飼いのペコリーノ乳製品所", 170, 36)],
  ),
  barumini: city(
    "Barumini|Barumini|Barumini|バルーミニ",
    8.9967, 39.7092, "sar", "nuraghe", "nuraghe", "r",
    "A Bronze Age tower fortress hidden by a hill|Una fortaleza-torre de la Edad del Bronce oculta bajo una colina|Une forteresse-tour de l'âge du bronze cachée sous une colline|丘に隠された青銅器時代の塔の砦",
    "The nuraghe of Su Nuraxi, a massive dry-stone tower complex begun around 1500 BC, was completely buried under an artificial hill and forgotten for centuries until excavations begun in 1949 uncovered a fortress with walls still standing over 18 metres — one of roughly 7,000 such structures scattered across Sardinia, though this is the only one on UNESCO's World Heritage list. Nobody has fully explained why the Nuragic civilization built so many, or why almost none of it was ever written down.|El nuraghe de Su Nuraxi, un enorme complejo de torres de piedra en seco iniciado hacia el 1500 a. C., quedó totalmente enterrado bajo una colina artificial y olvidado durante siglos, hasta que las excavaciones iniciadas en 1949 sacaron a la luz una fortaleza con muros que aún se alzan más de 18 metros, una de las cerca de 7.000 estructuras de este tipo repartidas por Cerdeña, aunque esta es la única en la lista de Patrimonio Mundial de la UNESCO. Nadie ha explicado del todo por qué la civilización nurágica construyó tantas, ni por qué casi nada de ella quedó escrito.|Le nuraghe de Su Nuraxi, un immense complexe de tours en pierre sèche entamé vers 1500 av. J.-C., fut entièrement enseveli sous une colline artificielle et oublié des siècles durant, jusqu'à ce que des fouilles débutées en 1949 mettent au jour une forteresse aux murs culminant encore à plus de 18 mètres — l'une des quelque 7 000 structures de ce type disséminées en Sardaigne, bien que ce soit la seule inscrite au patrimoine mondial de l'UNESCO. Personne n'a pleinement expliqué pourquoi la civilisation nuragique en bâtit tant, ni pourquoi presque rien n'en fut jamais écrit.|紀元前1500年ごろに築かれ始めた巨大な乾式石積みの塔群、スー・ヌラーシのヌラーゲは、人工の丘の下にすっかり埋もれて何世紀も忘れられていたが、1949年に始まった発掘によって、いまも18mを超える高さで残る壁を持つ城塞が姿を現した。サルデーニャ全土に散らばるおよそ7000のこうした構造物の一つだが、ユネスコの世界遺産に登録されているのはこれだけである。ヌラーゲ文明がなぜこれほど多く建てたのか、そしてなぜほとんど何も文字に残さなかったのか、いまだに十分には解明されていない。",
    [prop("Nuraghe Tower Chamber|Cámara de la torre nurágica|Chambre de la tour nuragique|ヌラーゲの塔の内室", 300, 62),
     prop("Bronze Age Village Ruins|Ruinas del poblado de la Edad del Bronce|Ruines du village de l'âge du bronze|青銅器時代の集落跡", 180, 38)],
  ),
};

/**
 * 路線(59本)。フレッチャロッサの実在の筋(トリノ―ミラノ―ボローニャ―
 * フィレンツェ―ローマ―ナポリ―バーリ)を骨に、一部は幹線道路の相当区間で
 * 結んでいる(アマルフィ海岸など、実際に鉄道が無い区間)。
 * シチリア島・サルデーニャ島は航路("sea")でのみ本土と結ぶ
 * (メッシーナ海峡は歴史的に貨車ごと渡す連絡船だった)。
 */
export const ITALY_EDGES = [
  // --- nov 北西 ---
  ["torino", "milano"],
  ["torino", "genova"],
  ["milano", "genova"],
  ["milano", "como"],
  ["torino", "aosta"],
  ["genova", "cinqueterre"],
  ["torino", "alba"],
  ["alba", "genova"],
  // --- nov-nes・nes 北東(ミラノ―ヴェローナ―パドヴァ―ヴェネツィアが幹線) ---
  ["milano", "verona"],
  ["verona", "padova"],
  ["padova", "venezia"],
  ["verona", "bologna"],
  ["verona", "bolzano"],
  ["milano", "bologna"],
  ["milano", "parma"],
  ["parma", "bologna"],
  ["venezia", "trieste"],
  ["venezia", "ravenna"],
  ["bologna", "ravenna"],
  // --- nes-cen・cen 中部(フレッチャロッサの背骨、ボローニャ―フィレンツェ―ローマ) ---
  ["bologna", "firenze"],
  ["cinqueterre", "pisa"],
  ["firenze", "pisa"],
  ["pisa", "sangimignano"],
  ["firenze", "siena"],
  ["siena", "sangimignano"],
  ["firenze", "perugia"],
  ["perugia", "assisi"],
  ["perugia", "orvieto"],
  ["firenze", "roma"],
  ["orvieto", "roma"],
  ["roma", "perugia"],
  // --- cen-sud・sud 南部 ---
  ["roma", "napoli"],
  ["roma", "laquila"],
  ["napoli", "pompei"],
  ["pompei", "sorrento"],
  ["sorrento", "positano"],
  ["napoli", "bari"],
  ["bari", "alberobello"],
  ["bari", "lecce"],
  ["alberobello", "lecce"],
  ["bari", "matera"],
  ["matera", "alberobello"],
  ["napoli", "tropea"],
  ["tropea", "reggiocalabria"],
  // --- sic シチリア ---
  ["palermo", "cefalu"],
  ["cefalu", "taormina"],
  ["taormina", "catania"],
  ["catania", "siracusa"],
  ["catania", "agrigento"],
  ["agrigento", "palermo"],
  // --- sar サルデーニャ ---
  ["cagliari", "olbia"],
  ["olbia", "nuoro"],
  ["cagliari", "barumini"],
  ["cagliari", "alghero"],
  ["alghero", "olbia"],
  // --- 航路(本土⇄シチリア2本、本土⇄サルデーニャ2本) ---
  ["napoli", "palermo", "sea"],
  ["reggiocalabria", "taormina", "sea"],
  ["genova", "olbia", "sea"],
  ["napoli", "cagliari", "sea"],
];
