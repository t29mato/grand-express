/**
 * イギリスの都市と路線。
 *
 * 地方区分は6つ(`se` イングランド南部 / `mi` イングランド中部 /
 * `no` イングランド北部 / `wa` ウェールズ / `sc` スコットランド /
 * `ni` 北アイルランド)。
 *
 * 42都市55路線。se10 / mi6 / no8 / wa6 / sc8 / ni4。
 * ワイト島(カウズ)は海路("sea")でのみ結ばれる。北アイルランドへは
 * ホーリーヘッド⇄ベルファスト・スタランレア⇄ベルファストの2航路で渡る。
 * アングルシー島(ホーリーヘッド)・スカイ島(ポートリー)は、実在する橋
 * (ブリタニア橋1850年・スカイ橋1995年)にならって陸路でつないである
 * (直線がほぼ陸を通ってしまうため、計測のうえで陸路に直した。理由は路線定義の側に書く)。
 *
 * 経度・緯度は実際の値。投影の範囲は geography.mjs の UK_PROJ を参照。
 * 海岸線に近い都市は、投影後に陸の上へ収まることを検証済み
 * (`node scripts/check-sea-routes.mjs` 相当のpoint-in-polygon確認を
 * 自作スクリプトで実施。全42都市が海岸線から4.9px以上の余白を持つ)。
 *
 * 物件の価格は `scripts/content-overrides/property-economy.mjs` の設計
 * (S目玉2,600〜3,000 / A大都市900〜1,400 / B中核350〜650 / C小さな町150〜300、
 * 利回りおよそ20.6%)にならって、韓国と同じ内部単位で直接書いてある
 * (この盤面は`CITY_PROPS`の上書き対象にしない前提。表示倍率だけ
 * `CURRENCY_MULTIPLIERS.uk` に足してもらう)。
 *
 * ## `mark`(21種)
 *
 * 盤面では直径19pxにしかならないので、描き分けられる数に絞ってある。
 *
 * | キー | 描くもの | 受け持つ町 |
 * |---|---|---|
 * | `capital`     | 国会議事堂の時計塔 | ロンドン |
 * | `cathedral`   | 大聖堂の尖塔 | カンタベリー・ダラム・セント・デイヴィッズ・コヴェントリー・レスター |
 * | `cliffs`      | 白い断崖 | ドーヴァー |
 * | `pier`        | 海に突き出た桟橋 | ブライトン |
 * | `university`  | 尖塔とカレッジの中庭 | オックスフォード・ケンブリッジ |
 * | `georgian`    | 弧を描くジョージ王朝様式の街並み | バース・バクストン |
 * | `bridge`      | 川に架かる橋 | ブリストル・ニューカッスル |
 * | `stonehenge`  | 環状に立つ巨石 | ソールズベリー |
 * | `mill`        | 紡績工場の煙突 | バーミンガム・マンチェスター・リーズ |
 * | `tudor`       | 木骨造りの家 | ストラトフォード・アポン・エイヴォン |
 * | `outlaw`      | 弓を構える緑の人影 | ノッティンガム |
 * | `docks`       | 波止場と起重機 | リヴァプール・ベルファスト・グラスゴー |
 * | `minster`     | 双塔の大聖堂 | ヨーク |
 * | `romanwall`   | 城壁の見張り塔 | チェスター・デリー |
 * | `lake`        | 湖面と峰 | ウィンダミア |
 * | `castle`      | 塔と城壁 | カーディフ・カーナーヴォン・コンウィ・エディンバラ |
 * | `coast`       | 波と帆船 | スウォンジー・ポートリー・カウズ・ホーリーヘッド・スタランレア |
 * | `mountain`    | 二つ並んだ峰 | フォート・ウィリアム・マーン・インヴァネス |
 * | `granite`     | 灰色の花崗岩の建物 | アバディーン |
 * | `golf`        | 旗の立つグリーン | セント・アンドリューズ |
 * | `causeway`    | 六角形の石柱 | ブッシュミルズ |
 *
 * ## `bg`(22種)
 *
 * `capital`(ロンドン) / `cathedral`(カンタベリー・ダラム・セント・デイヴィッズ) /
 * `citycentre`(コヴェントリー・レスター) / `cliffs`(ドーヴァー) /
 * `seaside`(ブライトン・カウズ) / `university`(オックスフォード・ケンブリッジ) /
 * `georgian`(バース・バクストン) / `harbour`(ブリストル・リヴァプール・ベルファスト) /
 * `stonehenge`(ソールズベリー) / `millcity`(バーミンガム・マンチェスター・リーズ) /
 * `tudor`(ストラトフォード) / `sherwood`(ノッティンガム) /
 * `walledtown`(ヨーク・チェスター・デリー) / `riverbridges`(ニューカッスル) /
 * `lakedistrict`(ウィンダミア) / `castletown`(カーディフ・カーナーヴォン・コンウィ・エディンバラ) /
 * `coasttown`(スウォンジー・ポートリー・ホーリーヘッド・スタランレア) /
 * `highland`(フォート・ウィリアム・インヴァネス・マーン) / `shipyard`(グラスゴー) /
 * `granitecity`(アバディーン) / `linksgolf`(セント・アンドリューズ) /
 * `causeway`(ブッシュミルズ)
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const UK_CITIES = {
  // ---------------------------------------------------------------------
  // se — イングランド南部
  // ---------------------------------------------------------------------
  london: city(
    "London|Londres|Londres|ロンドン",
    -0.13, 51.51, "se", "capital", "capital", "r",
    "A capital built on a river, not a plan|Una capital construida sobre un río, no sobre un plano|Une capitale bâtie sur un fleuve, pas sur un plan|計画ではなく川の上に築かれた首都",
    "Big Ben's bell cracked within two months of first ringing in 1859 and was never replaced — it still strikes with the same crack, a flaw horologists can identify by ear. The London Underground opened in 1863 as the world's first underground railway, dug so close to the surface that its early steam trains vented smoke through gratings in the street above.|La campana del Big Ben se agrietó a los dos meses de sonar por primera vez en 1859 y nunca se sustituyó: aún suena con esa misma grieta, un defecto que los relojeros reconocen de oído. El metro de Londres abrió en 1863 como el primer ferrocarril subterráneo del mundo, excavado tan cerca de la superficie que sus primeros trenes de vapor expulsaban el humo por rejillas en la calle.|La cloche de Big Ben se fêla deux mois à peine après avoir sonné pour la première fois en 1859, et ne fut jamais remplacée : elle sonne encore avec cette même fêlure, un défaut que les horlogers reconnaissent à l'oreille. Le métro de Londres ouvrit en 1863, premier chemin de fer souterrain au monde, creusé si près de la surface que ses premières rames à vapeur évacuaient leur fumée par des grilles dans la rue.|ビッグベンの鐘は1859年に初めて鳴らされてからわずか2か月でひびが入り、そのまま一度も交換されていない。いまも同じひびの入ったまま鳴り続け、時計職人なら音だけで分かる欠陥だという。ロンドン地下鉄は1863年、世界初の地下鉄道として開業したが、地表のすぐ下を掘っただけだったため、初期の蒸気機関車は道路の格子から煙を吐き出していた。",
    [prop("Westminster Bell Tower Base|Base de la torre del Big Ben|Base de la tour de Big Ben|ウェストミンスターの鐘塔", 3000, 618),
     prop("Underground Steam Vent Platform|Andén de ventilación del metro a vapor|Quai de ventilation du métro à vapeur|地下鉄の蒸気抜き通路", 1500, 310)],
  ),
  canterbury: city(
    "Canterbury|Canterbury|Cantorbéry|カンタベリー",
    1.08, 51.28, "se", "cathedral", "cathedral", "r",
    "A murder that made a road famous|Un asesinato que hizo famoso un camino|Un meurtre qui rendit une route célèbre|殺人事件が有名にした巡礼路",
    "Archbishop Thomas Becket was cut down inside his own cathedral in 1170 by four knights who believed they were carrying out the king's wish, and the shrine built over his tomb became the destination of the pilgrimage that Chaucer's storytellers ride toward in the Canterbury Tales. The cathedral's stained glass still includes panels from the 1180s, among the oldest in England to survive in their original tracery.|El arzobispo Thomas Becket fue asesinado dentro de su propia catedral en 1170 por cuatro caballeros que creían cumplir el deseo del rey, y el santuario alzado sobre su tumba se convirtió en el destino de la peregrinación hacia la que cabalgan los narradores de los Cuentos de Canterbury.|L'archevêque Thomas Becket fut abattu dans sa propre cathédrale en 1170 par quatre chevaliers convaincus d'accomplir la volonté du roi, et le sanctuaire élevé sur sa tombe devint le but du pèlerinage vers lequel chevauchent les conteurs des Contes de Canterbury.|大司教トマス・ベケットは1170年、王の意を汲んだと信じた4人の騎士によって自分の大聖堂の中で斬り殺された。彼の墓の上に築かれた聖堂は、チョーサーの『カンタベリー物語』で語り手たちが目指す巡礼の目的地になった。大聖堂のステンドグラスにはいまも1180年代の板があり、当時のままの鉛枠で残る英国最古級のものである。",
    [prop("Pilgrims' Shrine Nave|Nave del santuario de los peregrinos|Nef du sanctuaire des pèlerins|巡礼者の聖堂身廊", 280, 58),
     prop("Chaucer Tale Inn|Posada de los Cuentos de Chaucer|Auberge des Contes de Chaucer|チョーサー物語の宿屋", 220, 46)],
  ),
  dover: city(
    "Dover|Dover|Douvres|ドーヴァー",
    1.31, 51.13, "se", "cliffs", "cliffs", "r",
    "A coastline close enough to dig a tunnel to|Una costa tan cercana que se pudo excavar un túnel|Un littoral si proche qu'on y creusa un tunnel|トンネルを掘れるほど近い海岸",
    "The white cliffs are chalk laid down over 66 million years ago by the shells of trillions of microscopic sea creatures, and on a clear day they are visible from the French coast 33 kilometres away. The Channel Tunnel, opened in 1994 after more than a century of failed attempts dating back to 1802, surfaces near here after running 38 kilometres under the sea floor.|Los acantilados blancos son de creta depositada hace más de 66 millones de años por las conchas de billones de criaturas marinas microscópicas, y en un día despejado se ven desde la costa francesa, a 33 km. El Túnel del Canal, abierto en 1994 tras más de un siglo de intentos fallidos que se remontan a 1802, emerge cerca de aquí tras recorrer 38 km bajo el lecho marino.|Les falaises blanches sont faites de craie déposée il y a plus de 66 millions d'années par les coquilles de milliards de créatures marines microscopiques, et par temps clair, on les voit depuis la côte française, à 33 km. Le tunnel sous la Manche, ouvert en 1994 après plus d'un siècle de tentatives infructueuses remontant à 1802, ressort près d'ici après 38 km sous le fond marin.|白い断崖は6600万年以上前、無数の微小な海洋生物の殻が積もってできた白亜でできており、晴れた日には33km先のフランス沿岸から見える。1994年に開通したユーロトンネルは、1802年にまでさかのぼる100年以上の失敗した挑戦の末に実現し、海底下38kmを走ってこの近くに顔を出す。",
    [prop("White Cliffs Overlook|Mirador de los acantilados blancos|Belvédère des falaises blanches|白い断崖の展望台", 260, 54),
     prop("Channel Tunnel Portal|Portal del Túnel del Canal|Portail du tunnel sous la Manche|ユーロトンネルの入口", 200, 42)],
  ),
  brighton: city(
    "Brighton|Brighton|Brighton|ブライトン",
    -0.14, 50.82, "se", "pier", "seaside", "b",
    "A fishing town a royal prince turned fashionable|Un pueblo de pescadores que un príncipe hizo elegante|Un village de pêcheurs qu'un prince rendit à la mode|王太子が流行の地に変えた漁村",
    "The Royal Pavilion was built from 1787 for the Prince Regent as a seaside retreat, its onion domes and minarets modelled on Indian and Chinese styles that had nothing to do with the Sussex coast around it, and its kitchen still displays cast-iron palm-tree columns holding up the ceiling. The pebble beach below has no sand at all, just a mile of smooth stones sorted by the tide into rough bands of size.|El Pabellón Real se construyó desde 1787 para el príncipe regente como retiro junto al mar, con cúpulas de cebolla y minaretes inspirados en estilos indios y chinos que nada tenían que ver con la costa de Sussex.|Le Royal Pavilion fut bâti à partir de 1787 pour le prince régent comme retraite balnéaire, ses dômes en oignon et ses minarets inspirés de styles indiens et chinois n'ayant rien à voir avec la côte du Sussex alentour.|ロイヤル・パビリオンは1787年から摂政皇太子の海辺の別荘として建てられた。玉ねぎ型のドームや尖塔はインドや中国の様式を模したもので、周囲のサセックスの海岸とは何の関係もない。眼下の浜は砂浜ではなく、潮がおよそのサイズごとに選り分けた丸い小石が1マイルにわたって続く礫浜である。",
    [prop("Royal Pavilion Kitchen|Cocina del Pabellón Real|Cuisine du Royal Pavilion|ロイヤル・パビリオンの厨房", 300, 62),
     prop("Pebble Beach Pier Arcade|Galería del muelle de la playa de guijarros|Galerie de la jetée de la plage de galets|礫浜の桟橋アーケード", 240, 50)],
  ),
  oxford: city(
    "Oxford|Oxford|Oxford|オックスフォード",
    -1.26, 51.75, "se", "university", "university", "l",
    "A university older than the Aztec empire|Una universidad más antigua que el imperio azteca|Une université plus ancienne que l'empire aztèque|アステカ帝国より古い大学",
    "Teaching at Oxford is recorded as early as 1096, and it grew into a formal university after Henry II banned English students from attending the University of Paris in 1167, making it the oldest university in the English-speaking world. The 38 constituent colleges are legally independent bodies that merely federate under the university's name, which is why some hold more wealth than small nations.|La enseñanza en Oxford está documentada ya en 1096, y se convirtió en universidad formal después de que Enrique II prohibiera a los estudiantes ingleses asistir a la Universidad de París en 1167, lo que la hace la más antigua del mundo anglófono.|L'enseignement à Oxford est attesté dès 1096, et l'université prit forme après qu'Henri II eut interdit aux étudiants anglais de fréquenter l'Université de Paris en 1167, ce qui en fait la plus ancienne du monde anglophone.|オックスフォードでの教育は早くも1096年に記録が残っており、1167年にヘンリー2世がイングランド人学生のパリ大学への留学を禁じたことで正式な大学へと育ち、英語圏最古の大学となった。38あるカレッジは法的には独立した組織で、大学の名のもとに緩やかに連合しているにすぎず、小国より裕福なカレッジもある。",
    [prop("College Quadrangle Library|Biblioteca del patio universitario|Bibliothèque de la cour du collège|カレッジ中庭の図書館", 550, 114),
     prop("Bodleian Reading Room|Sala de lectura Bodleiana|Salle de lecture Bodléienne|ボドリアン図書館の閲覧室", 420, 86)],
  ),
  cambridge: city(
    "Cambridge|Cambridge|Cambridge|ケンブリッジ",
    0.12, 52.20, "se", "university", "university", "r",
    "A rivalry born from a walkout|Una rivalidad nacida de una huida|Une rivalité née d'une fuite|脱走から生まれたライバル関係",
    "Cambridge was founded in 1209 by scholars who fled Oxford after a woman's death sparked a riot in which locals hanged two students, and the two universities have kept up a friendly rivalry — the Boat Race on the Thames — ever since 1829. Punting, poling a flat boat down the River Cam, remains the standard way tourists discover exactly how easy it looks and how hard it is.|Cambridge fue fundada en 1209 por académicos que huyeron de Oxford tras un motín, desatado por la muerte de una mujer, en el que los vecinos ahorcaron a dos estudiantes, y desde 1829 las dos universidades mantienen una rivalidad amistosa: la regata en el Támesis.|Cambridge fut fondée en 1209 par des savants qui fuirent Oxford après une émeute, déclenchée par la mort d'une femme, où des habitants pendirent deux étudiants, et depuis 1829 les deux universités entretiennent une rivalité amicale : la course d'aviron sur la Tamise.|ケンブリッジは1209年、ある女性の死をきっかけに起きた暴動で住民が学生2人を絞首刑にしたのち、オックスフォードから逃れた学者たちによって創設された。1829年以来、両大学はテムズ川でのボートレースという友好的なライバル関係を続けている。平底舟を竿で操る「パンティング」はいまも観光客が定番で挑む遊びで、簡単そうに見えて実はとても難しいことを思い知らされる。",
    [prop("River Cam Punt Landing|Embarcadero de batea del río Cam|Débarcadère de barques du Cam|カム川のパント発着場", 520, 108),
     prop("Boat Race Training Shed|Cobertizo de entrenamiento de la regata|Hangar d'entraînement de la course d'aviron|ボートレースの練習艇庫", 400, 82)],
  ),
  bath: city(
    "Bath|Bath|Bath|バース",
    -2.36, 51.38, "se", "georgian", "georgian", "l",
    "Water hot enough to build a religion around|Agua caliente suficiente para fundar una religión|Une eau assez chaude pour fonder un culte|信仰を築くほど熱い湧き水",
    "The Romans built a temple and bathing complex here around a spring that still rises at 46°C, dedicating it to a goddess they invented by fusing the local Celtic deity Sulis with their own Minerva. Nearly the entire city was rebuilt in matching honey-coloured limestone during the 18th century to create a single, sweeping composition of crescents and terraces, which is why Bath is a UNESCO World Heritage Site as one continuous piece of architecture.|Los romanos construyeron aquí un templo y unos baños en torno a un manantial que aún brota a 46 °C, dedicado a una diosa que inventaron fusionando a la deidad celta local Sulis con su propia Minerva.|Les Romains bâtirent ici un temple et des thermes autour d'une source qui jaillit encore à 46 °C, dédiés à une déesse qu'ils inventèrent en fusionnant la divinité celte locale Sulis avec leur propre Minerve.|ローマ人はいまも46度で湧き続ける温泉の周りに神殿と浴場を築き、地元ケルトの女神スリスと自分たちのミネルウァを融合させて作り上げた女神に捧げた。18世紀にはほぼ町全体が蜂蜜色の石灰岩で統一して建て替えられ、三日月形や階段状の街並みがひと続きの構図を成すようになった。バースが一つの建築作品としてまるごと世界遺産に登録されているのはそのためである。",
    [prop("Roman Bath Steam Hall|Sala de vapor de los baños romanos|Salle de vapeur des thermes romains|ローマ浴場の蒸気の間", 480, 98),
     prop("Royal Crescent Townhouse|Casa del Royal Crescent|Maison du Royal Crescent|ロイヤル・クレセントの邸宅", 360, 74)],
  ),
  bristol: city(
    "Bristol|Bristol|Bristol|ブリストル",
    -2.59, 51.45, "se", "bridge", "harbour", "l",
    "A bridge finished by the men who built it as students|Un puente terminado por quienes lo estudiaron de niños|Un pont achevé par ceux qui, enfants, en étudiaient les plans|かつての生徒たちが完成させた橋",
    "The Clifton Suspension Bridge was designed by Isambard Kingdom Brunel in 1831 but stalled for decades after money ran out, and it was finally completed in 1864, five years after Brunel's death, by fellow engineers who had trained under him as apprentices. The gorge it spans is 75 metres deep, and the bridge has become an unlikely symbol of survival — several people who jumped from it have lived, their fall broken by their skirts or by the water below.|El puente colgante de Clifton fue diseñado por Isambard Kingdom Brunel en 1831 pero quedó parado durante décadas al agotarse el dinero, y se terminó por fin en 1864, cinco años después de la muerte de Brunel, gracias a otros ingenieros que se habían formado como aprendices suyos.|Le pont suspendu de Clifton fut conçu par Isambard Kingdom Brunel en 1831 mais resta bloqué des décennies faute d'argent, et il ne fut achevé qu'en 1864, cinq ans après la mort de Brunel, par des ingénieurs formés comme apprentis sous sa direction.|クリフトン吊り橋は1831年にイザムバード・キングダム・ブルネルが設計したが資金が尽きて数十年止まり、ブルネルの死から5年後の1864年、彼のもとで見習いとして学んだ技師たちの手でようやく完成した。橋がまたぐ渓谷は深さ75mあり、橋はいつしか生存の思いがけない象徴になった。ここから飛び降りて助かった人が何人もおり、スカートや下の水面が衝撃を和らげたのだという。",
    [prop("Clifton Gorge Bridge Tower|Torre del puente del desfiladero de Clifton|Tour du pont de la gorge de Clifton|クリフトン渓谷の橋塔", 950, 196),
     prop("Floating Harbour Quayside|Muelle del puerto flotante|Quai du port flottant|浮き港の埠頭", 620, 128)],
  ),
  salisbury: city(
    "Salisbury|Salisbury|Salisbury|ソールズベリー",
    -1.79, 51.07, "se", "stonehenge", "stonehenge", "b",
    "Stones dragged 240 kilometres before anyone had the wheel|Piedras arrastradas 240 km antes de existir la rueda|Des pierres traînées sur 240 km avant l'invention de la roue|車輪もない時代に240km運ばれた石",
    "Stonehenge's smaller bluestones were quarried in Wales, roughly 240 kilometres away, and transported to the plain around 2500 BC by methods still debated since the wheel had not yet reached Britain — theories range from sledges and rollers to rafts along the coast. The site is aligned so precisely with the sunrise on the summer solstice and sunset on the winter solstice that the alignment is accepted as deliberate rather than coincidence.|Las piedras azules más pequeñas de Stonehenge se extrajeron en Gales, a unos 240 km, y se transportaron a la llanura hacia el 2500 a.C. por métodos aún debatidos, ya que la rueda no había llegado a Gran Bretaña.|Les plus petites pierres bleues de Stonehenge furent extraites au pays de Galles, à environ 240 km, et transportées vers la plaine autour de 2500 av. J.-C. par des méthodes encore débattues, la roue n'ayant pas encore atteint la Grande-Bretagne.|ストーンヘンジの小さいほうの「ブルーストーン」はウェールズの採石場から約240km運ばれ、紀元前2500年頃にこの平原まで運ばれた。当時のブリテン島には車輪がまだ伝わっておらず、そりや丸太、海沿いの筏など運搬方法はいまも議論が続く。遺跡は夏至の日の出と冬至の日没に驚くほど正確に一致しており、偶然ではなく意図的な配置だと考えられている。",
    [prop("Sarsen Stone Circle Path|Sendero del círculo de piedras sarsen|Sentier du cercle de pierres sarsen|巨石環の小径", 300, 62),
     prop("Salisbury Cathedral Spire Close|Recinto de la aguja de la catedral|Enclos de la flèche de la cathédrale|ソールズベリー大聖堂の尖塔", 220, 46)],
  ),
  cowes: city(
    "Cowes|Cowes|Cowes|カウズ",
    -1.30, 50.76, "se", "coast", "seaside", "b",
    "A week of racing that set the clock for the yachting world|Una semana de regatas que marcó el ritmo del mundo náutico|Une semaine de régates qui donna le tempo au monde de la voile|世界のヨット界の暦を決めた一週間",
    "Cowes Week has run almost every summer since 1826, and up to 40 races a day fill the Solent with a thousand boats during the regatta, making it one of the longest-running sailing events on Earth. Queen Victoria kept a seaside home a few kilometres along the coast at Osborne House, close enough that she could watch the racing from her window.|La Semana de Cowes se celebra casi cada verano desde 1826, y hasta 40 regatas al día llenan el Solent con un millar de barcos, lo que la convierte en uno de los eventos de vela más antiguos y continuos del planeta.|La Semaine de Cowes se tient presque chaque été depuis 1826, et jusqu'à 40 régates par jour remplissent le Solent d'un millier de bateaux, ce qui en fait l'un des plus anciens événements de voile ininterrompus au monde.|カウズ・ウィークは1826年以来ほぼ毎年夏に開かれ、レガッタの期間中は一日最大40レースがソレント海峡を千隻のヨットで埋め尽くす、世界でも屈指の長い歴史を持つセーリング大会である。ヴィクトリア女王は海岸沿い数km先のオズボーン・ハウスに別荘を構え、窓からレースを眺められるほどの近さだった。",
    [prop("Solent Regatta Marina|Marina de la regata del Solent|Marina de la régate du Solent|ソレント海峡のヨット桟橋", 220, 46),
     prop("Osborne House Seaside Terrace|Terraza junto al mar de Osborne House|Terrasse côtière d'Osborne House|オズボーン・ハウスの海辺のテラス", 180, 38)],
  ),

  // ---------------------------------------------------------------------
  // mi — イングランド中部
  // ---------------------------------------------------------------------
  birmingham: city(
    "Birmingham|Birmingham|Birmingham|バーミンガム",
    -1.90, 52.48, "mi", "mill", "millcity", "l",
    "More canals than a city built on lagoons|Más canales que una ciudad construida sobre lagunas|Plus de canaux qu'une ville bâtie sur des lagunes|潟の上の都市より運河が多い町",
    "Birmingham has around 100 kilometres of canals, more than Venice, dug from the 1760s to move coal and iron between a thousand small workshops that earned the city its old nickname \"the city of a thousand trades.\" Much of the network fell derelict after the railways took the freight, and it was volunteers restoring towpaths from the 1960s who turned the old industrial waterways into today's canalside walks and bars.|Birmingham tiene unos 100 km de canales, más que Venecia, excavados desde la década de 1760 para mover carbón y hierro entre un millar de pequeños talleres que le dieron su antiguo apodo, «la ciudad de los mil oficios».|Birmingham compte environ 100 km de canaux, plus que Venise, creusés à partir des années 1760 pour acheminer charbon et fer entre un millier de petits ateliers, ce qui valut à la ville son ancien surnom de « cité aux mille métiers ».|バーミンガムにはヴェネツィアより長い、約100kmの運河網がある。1760年代から石炭や鉄を千を超える小さな工房のあいだで運ぶために掘られ、この町に「千の職業の町」という古い異名を与えた。鉄道が貨物を奪うと網の多くは荒れ果てたが、1960年代から曳舟道を修復したボランティアたちが、かつての工業用水路をいまの運河沿いの散歩道やバー街に変えた。",
    [prop("Canalside Workshop Row|Hilera de talleres junto al canal|Rangée d'ateliers au bord du canal|運河沿いの工房通り", 1100, 226),
     prop("Jewellery Quarter Forge|Forja del barrio de la joyería|Forge du quartier de la bijouterie|宝飾地区の鍛冶場", 700, 144)],
  ),
  stratford: city(
    "Stratford-upon-Avon|Stratford-upon-Avon|Stratford-upon-Avon|ストラトフォード・アポン・エイヴォン",
    -1.71, 52.19, "mi", "tudor", "tudor", "l",
    "A glovemaker's son who rewrote the English language|El hijo de un guantero que reescribió el idioma inglés|Le fils d'un gantier qui réinventa l'anglais|英語を書き換えた手袋職人の息子",
    "William Shakespeare was baptised here in 1564, the son of a glove-maker and wool dealer, and scholars credit him with coining or popularising well over a thousand English words and phrases still in daily use, from \"eyeball\" to \"break the ice.\" He retired to the town in his final years and is buried inside Holy Trinity Church under a curse inscribed on his gravestone warning against moving his bones.|William Shakespeare fue bautizado aquí en 1564, hijo de un guantero y comerciante de lana, y se le atribuye haber acuñado o popularizado más de mil palabras y frases inglesas de uso diario, de «eyeball» a «break the ice».|William Shakespeare fut baptisé ici en 1564, fils d'un gantier et marchand de laine, et on lui attribue la création ou la popularisation de plus de mille mots et expressions anglais encore en usage quotidien.|ウィリアム・シェイクスピアは1564年、手袋職人にして羊毛商の息子としてこの町で洗礼を受けた。「eyeball(眼球)」から「break the ice(打ち解ける)」まで、いまも日常的に使われる千を超える英語の語句を生み出したか広めたとされる。晩年はこの町に戻り、ホーリー・トリニティ教会に葬られたが、墓石には遺骨を動かすなという呪いの言葉が刻まれている。",
    [prop("Half-Timbered Birthplace House|Casa natal de entramado de madera|Maison natale à colombages|木骨造りの生家", 320, 66),
     prop("Riverside Theatre Stage|Escenario del teatro junto al río|Scène du théâtre au bord de la rivière|川辺の劇場の舞台", 240, 50)],
  ),
  nottingham: city(
    "Nottingham|Nottingham|Nottingham|ノッティンガム",
    -1.15, 52.95, "mi", "outlaw", "sherwood", "r",
    "An outlaw who may never have existed, in a forest that mostly hasn't|Un forajido que quizá nunca existió, en un bosque que en su mayoría ya no está|Un hors-la-loi qui n'a peut-être jamais existé, dans une forêt qui a presque disparu|存在したかも定かでない義賊と、ほぼ消えた森",
    "No historical record firmly ties a real outlaw to the Robin Hood legend, which was pieced together from ballads first written down in the 15th century, centuries after the events they claim to describe. Sherwood Forest itself has shrunk from a royal hunting ground covering roughly a fifth of Nottinghamshire to about 4 square kilometres of surviving ancient woodland, anchored by the thousand-year-old Major Oak.|Ningún registro histórico vincula con firmeza a un forajido real con la leyenda de Robin Hood, que se armó a partir de baladas escritas por primera vez en el siglo XV, siglos después de los hechos que dicen narrar.|Aucun document historique ne relie fermement un véritable hors-la-loi à la légende de Robin des Bois, assemblée à partir de ballades couchées par écrit pour la première fois au XVe siècle, des siècles après les faits qu'elles prétendent relater.|ロビン・フッド伝説を実在の義賊と確実に結びつける史料はなく、物語は15世紀に初めて書き留められたバラッドから組み立てられたもので、語られる出来事から何百年も後のことである。シャーウッドの森自体も、かつてノッティンガムシャーのおよそ5分の1を占めた王室の狩猟地から、樹齢千年の「メイジャー・オーク」を中心とする約4平方kmの古木林にまで縮んでしまった。",
    [prop("Sherwood Ancient Oak Glade|Claro del roble antiguo de Sherwood|Clairière du vieux chêne de Sherwood|シャーウッドの古樹の空き地", 420, 86),
     prop("Castle Rock Cave Tavern|Taberna en la cueva de Castle Rock|Taverne des grottes de Castle Rock|城の岩の洞窟酒場", 320, 66)],
  ),
  leicester: city(
    "Leicester|Leicester|Leicester|レスター",
    -1.13, 52.64, "mi", "cathedral", "citycentre", "r",
    "A king found under a car park after 527 years|Un rey hallado bajo un aparcamiento tras 527 años|Un roi retrouvé sous un parking après 527 ans|527年後、駐車場の下から見つかった王",
    "Archaeologists digging under a council car park in 2012 found a skeleton with a curved spine and battle wounds that DNA testing confirmed was Richard III, the king killed at Bosworth Field in 1485 and buried without ceremony by the friars who took his body. He was reburied in 2015 in Leicester Cathedral a few hundred metres from where he had lain forgotten for over five centuries.|Unos arqueólogos que excavaban bajo un aparcamiento municipal en 2012 hallaron un esqueleto de columna curvada y heridas de batalla que el ADN confirmó que era Ricardo III, el rey muerto en Bosworth Field en 1485 y enterrado sin ceremonia por los frailes que recogieron su cuerpo. Fue reenterrado en 2015 en la catedral de Leicester, a pocos cientos de metros de donde había yacido olvidado más de cinco siglos.|Des archéologues fouillant sous un parking municipal en 2012 découvrirent un squelette à la colonne courbée et aux blessures de bataille, dont l'ADN confirma qu'il s'agissait de Richard III, le roi tué à Bosworth Field en 1485 et enterré sans cérémonie par les moines qui recueillirent son corps. Il fut réinhumé en 2015 dans la cathédrale de Leicester, à quelques centaines de mètres de l'endroit où il avait reposé oublié durant plus de cinq siècles.|2012年、市営駐車場の地下を掘っていた考古学者たちが、背骨の曲がった、戦傷のある骨格を発見した。DNA鑑定で1485年のボズワースの戦いで討ち死にし、遺体を引き取った修道士たちにより儀式もなく葬られたリチャード3世本人と確認された。彼は2015年、5世紀以上も忘れられていた場所からわずか数百m離れたレスター大聖堂に改めて葬られた。",
    [prop("Rediscovered King's Chapel|Capilla del rey redescubierto|Chapelle du roi redécouvert|再発見された王の礼拝堂", 380, 78),
     prop("Roman Jewry Wall Ruin|Ruina del muro romano de Jewry Wall|Ruine romaine du mur de Jewry Wall|ローマ時代の壁の遺構", 280, 58)],
  ),
  coventry: city(
    "Coventry|Coventry|Coventry|コヴェントリー",
    -1.51, 52.41, "mi", "cathedral", "citycentre", "l",
    "A cathedral left broken on purpose, beside a new one|Una catedral dejada rota a propósito, junto a una nueva|Une cathédrale volontairement laissée en ruine, à côté d'une nouvelle|わざと壊れたまま残された大聖堂",
    "A German bombing raid gutted the medieval cathedral in a single night in November 1940, and rather than rebuild it, the city left the roofless shell standing as a ruin and built an entirely new cathedral beside it, consecrated in 1962 with a giant tapestry of Christ as its centrepiece. Coventry is also the origin of the phrase \"sent to Coventry\", meaning to be deliberately ignored, though nobody agrees on which historical grudge started it.|Un bombardeo alemán arrasó la catedral medieval en una sola noche de noviembre de 1940, y en vez de reconstruirla, la ciudad dejó en pie la cáscara sin techo como ruina y levantó una catedral totalmente nueva al lado, consagrada en 1962.|Un raid allemand éventra la cathédrale médiévale en une seule nuit de novembre 1940, et plutôt que de la reconstruire, la ville laissa debout la carcasse sans toit en ruine et bâtit une cathédrale entièrement neuve à côté, consacrée en 1962.|1940年11月のある一夜、ドイツ軍の空襲が中世の大聖堂を焼き尽くした。町はそれを再建せず、屋根の消えた廃墟をそのまま残し、隣にまったく新しい大聖堂を建てて1962年に献堂した。「コヴェントリーへ送る」という、わざと無視するという意味の英語表現もこの町に由来するが、どの歴史的な恨みが始まりかは諸説あって定まらない。",
    [prop("Ruined Nave Memorial Ground|Terreno conmemorativo de la nave en ruinas|Terrain mémoriel de la nef en ruine|廃墟の身廊の記念地", 360, 74),
     prop("New Cathedral Tapestry Hall|Sala del tapiz de la nueva catedral|Salle de la tapisserie de la nouvelle cathédrale|新大聖堂の綴織の間", 260, 54)],
  ),
  buxton: city(
    "Buxton|Buxton|Buxton|バクストン",
    -1.91, 53.26, "mi", "georgian", "georgian", "l",
    "A spa town built on a bet against Bath|Un balneario construido para rivalizar con Bath|Une ville d'eaux bâtie pour rivaliser avec Bath|バースに対抗して築かれた温泉町",
    "The Duke of Devonshire built Buxton's sweeping Crescent in the 1780s explicitly to rival Bath, betting that the town's naturally warm spring — a steady 27°C, used by the Romans as \"Aquae Arnemetiae\" — could draw the same fashionable crowds to the Peak District. The gamble mostly failed against Bath's head start, but it left behind an opera house and a domed hall with one of the widest unsupported roofs in Britain when it was built in 1881.|El duque de Devonshire construyó el gran Crescent de Buxton en la década de 1780 explícitamente para rivalizar con Bath, apostando a que el manantial de agua templada del pueblo —constante a 27 °C— atraería al mismo público elegante hacia Peak District.|Le duc de Devonshire bâtit le grand Crescent de Buxton dans les années 1780 explicitement pour rivaliser avec Bath, pariant que la source naturellement tiède de la ville — 27 °C constants — attirerait la même clientèle élégante vers le Peak District.|デヴォンシャー公は1780年代、バースに対抗するためはっきりとした狙いを持ってバクストンの弧を描く「クレセント」を建てた。町の常時27度で湧く温泉——ローマ人が「アクアエ・アルネメティアエ」と呼んだ湧水——が同じような上流の客を峰地方(ピーク・ディストリクト)へ呼べると見込んだのである。バースの先行には結局及ばなかったが、1881年に建てられたオペラハウスと、当時イギリスでも屈指の無支柱の広さを誇るドーム屋根の大広間が残った。",
    [prop("Domed Pavilion Concert Hall|Sala de conciertos del pabellón abovedado|Salle de concert du pavillon en dôme|ドーム屋根の音楽堂", 260, 54),
     prop("Warm Spring Pump Room|Sala de bombeo del manantial templado|Salle des pompes de la source tiède|温泉のポンプ室", 200, 42)],
  ),

  // ---------------------------------------------------------------------
  // no — イングランド北部
  // ---------------------------------------------------------------------
  manchester: city(
    "Manchester|Mánchester|Manchester|マンチェスター",
    -2.24, 53.48, "no", "mill", "millcity", "l",
    "The city that turned cotton into a revolution|La ciudad que convirtió el algodón en una revolución|La ville qui fit du coton une révolution|綿花を革命に変えた町",
    "Manchester's cotton mills multiplied so fast after 1780 that the city was nicknamed \"Cottonopolis\", processing raw cotton picked by enslaved people in the American South and spun by machines that made it the world's first industrial city. The Manchester Ship Canal, dug by hand and opened in 1894, let ocean-going ships sail 58 kilometres inland to dock in a city with no coastline at all.|Las fábricas textiles de Manchester se multiplicaron tan rápido después de 1780 que la ciudad fue apodada «Cottonópolis», procesando algodón crudo recogido por esclavizados en el sur de EE. UU. y hilado por máquinas que la hicieron la primera ciudad industrial del mundo.|Les filatures de Manchester se multiplièrent si vite après 1780 que la ville fut surnommée « Cottonopolis », traitant le coton brut cueilli par des esclaves du Sud américain et filé par des machines qui en firent la première ville industrielle du monde.|1780年以降、マンチェスターの紡績工場はあまりに急速に増えたため、この町は「コットノポリス」と呼ばれるようになった。アメリカ南部で奴隷にされた人々が摘んだ原綿を機械で紡ぎ、世界初の工業都市を作り上げた。手掘りで1894年に開通したマンチェスター運河は、海のないこの町まで外洋船が58km内陸を航行してくることを可能にした。",
    [prop("Cotton Mill Weaving Floor|Nave de tejido de la fábrica textil|Atelier de tissage de la filature|紡績工場の織布場", 1300, 268),
     prop("Ship Canal Dock Warehouse|Almacén del muelle del canal de navegación|Entrepôt du quai du canal maritime|運河の埠頭倉庫", 800, 164)],
  ),
  liverpool: city(
    "Liverpool|Liverpool|Liverpool|リヴァプール",
    -2.99, 53.41, "no", "docks", "harbour", "l",
    "A waterfront built on the profits of the slave trade, that later gave the world four musicians|Un frente marítimo construido con las ganancias de la trata de esclavos, que más tarde dio al mundo a cuatro músicos|Un front de mer bâti sur les profits de la traite négrière, qui donna plus tard au monde quatre musiciens|奴隷貿易で栄え、のちに4人の音楽家を世に送った港",
    "Liverpool handled roughly 40 percent of the transatlantic slave trade at its 18th-century peak, and the grand waterfront buildings funded partly by that trade are now a UNESCO World Heritage Site. The Cavern Club, a cellar bar where the Beatles played nearly 300 shows between 1961 and 1963, still runs a few streets from the docks, a short walk from the ferry that crosses the Mersey.|Liverpool gestionó aproximadamente el 40 % del comercio transatlántico de esclavos en su apogeo del siglo XVIII, y los grandiosos edificios del frente marítimo, financiados en parte por ese comercio, son hoy Patrimonio de la Humanidad.|Liverpool traita environ 40 % du commerce transatlantique d'esclaves à son apogée au XVIIIe siècle, et les grands édifices du front de mer, en partie financés par ce commerce, sont aujourd'hui classés au patrimoine mondial.|リヴァプールは18世紀の最盛期、大西洋を渡る奴隷貿易のおよそ4割を扱っていた。その貿易で得た資金の一部で建てられた壮麗な港湾建築群は、いまや世界遺産に登録されている。1961年から1963年にかけてビートルズが約300回も出演した地下のバー、キャバーン・クラブはいまも波止場から数本の通りを行った先で営業を続けており、マージー川を渡るフェリー乗り場までは歩いてすぐである。",
    [prop("Three Graces Waterfront Hall|Sala del frente marítimo de las Tres Gracias|Salle du front de mer des Trois Grâces|三姉妹ビルの波止場ホール", 1200, 248),
     prop("Cavern Club Cellar Stage|Escenario del sótano del Cavern Club|Scène du sous-sol du Cavern Club|キャバーン・クラブの地下ステージ", 750, 154)],
  ),
  york: city(
    "York|York|York|ヨーク",
    -1.08, 53.96, "no", "minster", "walledtown", "r",
    "A wall walked continuously since the Romans laid its first stones|Una muralla recorrida sin interrupción desde que los romanos pusieron sus primeras piedras|Un rempart parcouru sans interruption depuis que les Romains y posèrent les premières pierres|ローマ人が礎石を置いて以来歩かれ続ける城壁",
    "York's city walls, rebuilt in stone through the medieval period on Roman and Viking foundations, form the most complete circuit surviving in England at nearly 5 kilometres, and a public right of way lets anyone walk almost the whole loop today. The city was called Jorvik under Viking rule from 866, and excavations beneath a shopping centre in the 1970s uncovered such well-preserved timber house remains that a museum was built directly around the dig site.|Las murallas de York, reconstruidas en piedra durante la Edad Media sobre cimientos romanos y vikingos, forman el circuito más completo que sobrevive en Inglaterra, con casi 5 km, y hoy un derecho de paso público permite recorrer casi todo el anillo.|Les remparts de York, reconstruits en pierre au Moyen Âge sur des fondations romaines et vikings, forment le circuit le plus complet subsistant en Angleterre, avec près de 5 km, et un droit de passage public permet aujourd'hui d'en parcourir presque toute la boucle.|ヨークの城壁は中世にローマとヴァイキングの土台の上に石で建て直され、全長ほぼ5kmに及ぶイングランドで最も完全な形で残る城壁である。いまも公共の通行権があり、ほぼ一周を歩いて回ることができる。この町は866年からのヴァイキング支配下では「ヨルヴィク」と呼ばれ、1970年代にショッピングセンターの地下を発掘したところ木造家屋の跡があまりに良好な状態で見つかったため、発掘現場を丸ごと囲む形で博物館が建てられた。",
    [prop("Minster Twin Tower Close|Recinto de las torres gemelas del Minster|Enclos des tours jumelles du Minster|ヨーク・ミンスターの双塔の境内", 560, 116),
     prop("Viking Jorvik Excavation Vault|Bóveda de la excavación vikinga de Jorvik|Voûte des fouilles vikings de Jorvik|ヴァイキング時代の発掘地下室", 400, 82)],
  ),
  leeds: city(
    "Leeds|Leeds|Leeds|リーズ",
    -1.55, 53.80, "no", "mill", "millcity", "r",
    "A wool market that rebuilt itself in glass and iron arcades|Un mercado de lana que se reconstruyó en galerías de hierro y cristal|Un marché de laine qui se rebâtit en galeries de fer et de verre|鉄とガラスのアーケードに生まれ変わった羊毛市場",
    "Leeds grew rich on wool cloth traded from a bridge market recorded as early as 1258, and the Victorian fortune it built later paid for a set of covered shopping arcades — including the ornate Victoria Quarter, roofed in stained glass in 1898 — that still function as the city centre rather than as museum pieces. The Royal Armouries moved a large part of the national collection of arms and armour here from the Tower of London in 1996, the first time it had left London in its history.|Leeds se enriqueció con el paño de lana comerciado desde un mercado en un puente registrado ya en 1258, y la fortuna victoriana construida después pagó una serie de galerías comerciales cubiertas.|Leeds s'enrichit grâce au drap de laine négocié depuis un marché sur un pont attesté dès 1258, et la fortune victorienne ainsi bâtie finança ensuite une série de galeries marchandes couvertes.|リーズは、早くも1258年の記録に残る橋の上の市場で取引された毛織物によって富を築いた。そのヴィクトリア朝の富はのちに、1898年にステンドグラスの屋根を架けた華麗なヴィクトリア・クオーターをはじめとする屋根付き商店街の建設に注がれ、いまも博物館ではなく現役の町の中心として使われている。1996年、ロンドン塔から国立の武具コレクションの大部分がこの町へ移された。史上初めてロンドンを離れたことになる。",
    [prop("Stained-Glass Shopping Arcade|Galería comercial de cristal emplomado|Galerie marchande aux vitraux|ステンドグラスの商店街", 620, 128),
     prop("Royal Armouries Weapon Hall|Sala de armas de la Real Armería|Salle d'armes de la Royal Armouries|王立武具博物館の武器の間", 420, 86)],
  ),
  newcastle: city(
    "Newcastle upon Tyne|Newcastle upon Tyne|Newcastle upon Tyne|ニューカッスル・アポン・タイン",
    -1.61, 54.98, "no", "bridge", "riverbridges", "r",
    "A city that took its name from a castle already 800 years old|Una ciudad que tomó su nombre de un castillo ya de 800 años|Une ville nommée d'après un château déjà vieux de 800 ans|建てた時点で「新しくない」新城の町",
    "The \"new castle\" that gave the city its name was built in 1080 on the site of a Roman fort at the eastern end of Hadrian's Wall, itself already ancient by the time the Normans arrived. Seven bridges of wildly different design now cross the Tyne within sight of each other, including a swing bridge from 1876 and the 2001 Millennium Bridge, which tilts open on hinges like a slowly closing eyelid to let ships pass beneath.|El «nuevo castillo» que dio nombre a la ciudad se construyó en 1080 sobre un fuerte romano en el extremo oriental del Muro de Adriano, ya antiguo cuando llegaron los normandos.|Le « nouveau château » qui donna son nom à la ville fut bâti en 1080 sur un fort romain à l'extrémité orientale du mur d'Hadrien, déjà ancien à l'arrivée des Normands.|町の名の由来となった「新しい城」は1080年、ハドリアヌスの長城の東端にあったローマ時代の砦の跡に建てられた。ノルマン人が来た時点ですでに古かった場所である。いまはまったく異なる意匠の橋が7本、互いに見渡せる距離でタイン川を渡っており、1876年の旋回橋や、船を通すためゆっくり閉じるまぶたのように蝶番で開く2001年のミレニアム・ブリッジも含まれる。",
    [prop("Swing Bridge Control Cabin|Cabina de control del puente giratorio|Cabine de contrôle du pont tournant|旋回橋の操作小屋", 500, 104),
     prop("Riverside Quayside Market|Mercado del muelle junto al río|Marché du quai au bord du fleuve|川辺の市場", 380, 78)],
  ),
  durham: city(
    "Durham|Durham|Durham|ダラム",
    -1.58, 54.78, "no", "cathedral", "cathedral", "l",
    "A cathedral built to guard a saint's stolen coffin|Una catedral construida para guardar el ataúd robado de un santo|Une cathédrale bâtie pour garder le cercueil volé d'un saint|盗まれた聖人の棺を守るために建てた大聖堂",
    "Monks carried the coffin of Saint Cuthbert around northern England for over a century, fleeing Viking raids, before settling on a rocky bend of the River Wear in 995 where the coffin reportedly became too heavy to move any further. The cathedral raised over his shrine from 1093 is considered one of the finest examples of Norman architecture anywhere, its stone pillars carved with zigzag patterns that were unusually bold for their time.|Los monjes llevaron el ataúd de san Cuthbert por el norte de Inglaterra durante más de un siglo, huyendo de las incursiones vikingas, antes de asentarse en un recodo rocoso del río Wear en 995, donde el ataúd se volvió, según se dice, demasiado pesado para moverlo más.|Des moines portèrent le cercueil de saint Cuthbert à travers le nord de l'Angleterre pendant plus d'un siècle, fuyant les raids vikings, avant de s'établir sur un méandre rocheux de la Wear en 995, où le cercueil serait devenu trop lourd à déplacer.|修道士たちはヴァイキングの襲撃を逃れながら1世紀以上も聖カスバートの棺を担いでイングランド北部を巡り、995年、ウィア川の岩がちな湾曲部にたどり着いたところで棺がそれ以上動かせないほど重くなったと伝わる。1093年からその聖廟の上に建てられた大聖堂は、随所にジグザグ模様を刻んだ石柱を持つ、ノルマン建築の傑作の一つとされる。",
    [prop("Norman Nave Zigzag Pillar Row|Hilera de pilares en zigzag de la nave normanda|Rangée de piliers en zigzag de la nef normande|ノルマン様式のジグザグ柱列", 320, 66),
     prop("River Wear Peninsula Walk|Paseo de la península del río Wear|Promenade de la péninsule de la Wear|ウィア川半島の遊歩道", 240, 50)],
  ),
  chester: city(
    "Chester|Chester|Chester|チェスター",
    -2.89, 53.19, "no", "romanwall", "walledtown", "l",
    "Shops stacked on shops, inside a legion's fortress wall|Tiendas apiladas sobre tiendas, dentro del muro de una fortaleza legionaria|Des boutiques empilées sur des boutiques, dans le mur d'une forteresse de légion|軍団要塞の壁の中に重なる商店",
    "Chester was founded around 79 AD as the Roman fortress of Deva Victrix, and its city walls, still walkable almost end to end, follow largely the same lines the legion laid out. The Rows, covered walkways of shops built one storey above street level from the 13th century, are unique in Britain and let shoppers browse two separate tiers of storefronts on the same street at once.|Chester se fundó hacia el año 79 d.C. como la fortaleza romana de Deva Victrix, y sus murallas, aún transitables casi de punta a punta, siguen en gran parte el mismo trazado de la legión.|Chester fut fondée vers 79 apr. J.-C. comme forteresse romaine de Deva Victrix, et ses remparts, encore praticables presque de bout en bout, suivent en grande partie le même tracé légionnaire.|チェスターは西暦79年頃、ローマの要塞デーウァ・ウィクトリクスとして築かれ、いまもほぼ端から端まで歩ける城壁は、当時の軍団が定めた線をおおむねそのままなぞっている。13世紀から作られた「ロウズ」と呼ばれる、通りより1階分高い位置に架かる屋根付きの商店街はイギリスでも類がなく、同じ通りで上下2段の店先を一度に見て回れる。",
    [prop("Roman Legion Fortress Wall Walk|Paseo de la muralla de la fortaleza legionaria|Promenade du rempart de la forteresse légionnaire|ローマ軍団要塞の城壁の道", 340, 70),
     prop("Elevated Rows Shopfront|Escaparate elevado de las Rows|Devanture surélevée des Rows|高架のロウズ商店街", 260, 54)],
  ),
  windermere: city(
    "Windermere|Windermere|Windermere|ウィンダミア",
    -2.91, 54.37, "no", "lake", "lakedistrict", "l",
    "A lake that made a publisher's rabbit famous|Un lago que hizo famoso al conejo de una editora|Un lac qui rendit célèbre le lapin d'une éditrice|出版社の兎を有名にした湖",
    "England's largest natural lake stretches nearly 17 kilometres and was formed by a glacier scouring the valley during the last Ice Age, and steamers have carried passengers along it since 1845, among the oldest working passenger boats of their kind. Author Beatrix Potter bought a farm near the lake with royalties from Peter Rabbit and later willed 4,000 acres of the surrounding fells to the National Trust, permanently shaping how the whole district is protected today.|El mayor lago natural de Inglaterra se extiende casi 17 km y lo formó un glaciar que talló el valle durante la última glaciación, y desde 1845 lo recorren vapores con pasajeros, entre los barcos de pasajeros en activo más antiguos de su clase.|Le plus grand lac naturel d'Angleterre s'étend sur près de 17 km, façonné par un glacier qui creusa la vallée lors de la dernière glaciation, et des bateaux à vapeur y transportent des passagers depuis 1845, parmi les plus anciens bateaux de ce type encore en service.|イングランド最大の天然湖は全長17km近くに及び、最終氷期に氷河が谷を削って形作った。1845年から蒸気船が乗客を乗せて航行しており、その種の現役旅客船としては最古級である。作家ビアトリクス・ポターは『ピーターラビット』の印税で湖の近くに農場を買い、のちに周囲の丘陵4000エーカーをナショナル・トラストに遺贈し、いまに至るまでこの一帯の保護のありかたを決定づけた。",
    [prop("Steamer Pier Boathouse|Cobertizo del embarcadero de vapores|Hangar à bateaux de l'embarcadère|蒸気船桟橋の艇庫", 340, 70),
     prop("Fellside Farm Cottage|Casita de granja en la ladera|Chaumière de ferme sur le coteau|丘陵の農家", 260, 54)],
  ),

  // ---------------------------------------------------------------------
  // wa — ウェールズ
  // ---------------------------------------------------------------------
  cardiff: city(
    "Cardiff|Cardiff|Cardiff|カーディフ",
    -3.18, 51.48, "wa", "castle", "castletown", "r",
    "A capital chosen only in 1955, over a castle 2,000 years in the making|Una capital elegida solo en 1955, sobre un castillo de 2.000 años de historia|Une capitale choisie seulement en 1955, au-dessus d'un château vieux de 2 000 ans|1955年になってやっと決まった首都",
    "Cardiff was not formally declared the capital of Wales until 1955, centuries after London had settled the question for England, largely because Wales itself had no single administrative centre until the coal trade made this port the busiest in the world by 1913. Cardiff Castle sits on the site of a Roman fort, its Victorian interiors added by an eccentric coal magnate whose fantasy rooms include a ceiling painted with mirrors to multiply candlelight.|Cardiff no fue declarada oficialmente capital de Gales hasta 1955, siglos después de que Londres zanjara la cuestión en Inglaterra, en gran parte porque Gales no tuvo un único centro administrativo hasta que el comercio del carbón convirtió este puerto en el más activo del mundo hacia 1913.|Cardiff ne fut officiellement déclarée capitale du pays de Galles qu'en 1955, des siècles après que Londres eut tranché la question pour l'Angleterre, en grande partie parce que le pays de Galles n'avait aucun centre administratif unique avant que le commerce du charbon ne fasse de ce port le plus actif du monde vers 1913.|カーディフが正式にウェールズの首都と定められたのは1955年になってからで、ロンドンがイングランドの首都と決まってから何世紀も後のことだった。石炭貿易がこの港を1913年までに世界一の取扱量にするまで、ウェールズ自体にひとつの行政中心地がなかったためである。カーディフ城はローマ時代の砦の跡に立ち、ヴィクトリア朝の内装は奇矯な石炭王が加えたもので、蝋燭の光を鏡で何倍にも増やす天井の部屋まである。",
    [prop("Coal Magnate's Mirrored Hall|Salón de espejos del magnate del carbón|Salle des miroirs du magnat du charbon|石炭王の鏡の間", 950, 196),
     prop("Bay Coal Exchange Floor|Sala de la lonja del carbón de la bahía|Salle de la bourse du charbon de la baie|石炭取引所の立会場", 600, 124)],
  ),
  swansea: city(
    "Swansea|Swansea|Swansea|スウォンジー",
    -3.94, 51.62, "wa", "coast", "coasttown", "l",
    "A poet who called his hometown \"ugly, lovely\"|Un poeta que llamó a su ciudad natal «fea, encantadora»|Un poète qui qualifiait sa ville natale de « laide et adorable »|「醜くて、いとしい」と詩人が呼んだ町",
    "Dylan Thomas, born here in 1914, described Swansea as an \"ugly, lovely town\" in a radio talk, capturing a place that mixed heavy industry with a curving sweep of Swansea Bay that Thomas also called his own. The Gower Peninsula just west of the city became the first place in Britain to be officially designated an Area of Outstanding Natural Beauty, in 1956, for cliffs and beaches that industry never reached.|Dylan Thomas, nacido aquí en 1914, describió Swansea como una «ciudad fea y encantadora» en una charla radiofónica, retratando un lugar que mezclaba industria pesada con la curva de la bahía de Swansea, a la que Thomas también llamó suya.|Dylan Thomas, né ici en 1914, décrivit Swansea comme une « ville laide et adorable » dans une émission de radio, saisissant un lieu mêlant industrie lourde et la courbe de la baie de Swansea, que Thomas disait aussi sienne.|1914年にこの町で生まれたディラン・トマスは、ラジオでの語りの中でスウォンジーを「醜くて、いとしい町」と評した。重工業と、トマス自身も自分のものと呼んだ弧を描くスウォンジー湾とが同居する土地だった。町のすぐ西にあるガワー半島は1956年、産業の手が及ばなかった崖と浜辺を理由に、イギリスで最初に「特別自然美観地域」に正式指定された場所となった。",
    [prop("Ugly Lovely Town Quayside|Muelle de la ciudad fea y encantadora|Quai de la ville laide et adorable|「醜くていとしい町」の埠頭", 420, 86),
     prop("Gower Cliff Path Cottage|Casita del sendero del acantilado de Gower|Chaumière du sentier des falaises de Gower|ガワー半島の崖道の家", 300, 62)],
  ),
  caernarfon: city(
    "Caernarfon|Caernarfon|Caernarfon|カーナーヴォン",
    -4.27, 53.14, "wa", "castle", "castletown", "l",
    "A castle built to announce who was really in charge|Un castillo construido para dejar claro quién mandaba|Un château bâti pour rappeler qui commandait vraiment|誰が本当の支配者かを見せつけた城",
    "Edward I began Caernarfon Castle in 1283 after conquering Wales, deliberately styling its polygonal towers and banded stonework after the walls of Constantinople to cast himself as heir to Roman imperial power, right down to an eagle-topped tower facing the strait. The castle was chosen as the site for the investiture of the Prince of Wales in both 1911 and 1969, broadcasts of the latter watched by an estimated 500 million people worldwide.|Eduardo I inició el castillo de Caernarfon en 1283 tras conquistar Gales, dando deliberadamente a sus torres poligonales y su piedra a bandas el estilo de las murallas de Constantinopla para presentarse como heredero del poder imperial romano.|Édouard Ier entama le château de Caernarfon en 1283 après avoir conquis le pays de Galles, donnant délibérément à ses tours polygonales et sa pierre à bandes le style des murailles de Constantinople pour se présenter en héritier du pouvoir impérial romain.|エドワード1世は1283年、ウェールズを征服した後にカーナーヴォン城の建設を始めた。多角形の塔と縞模様の石積みは、あえてコンスタンティノープルの城壁を模しており、自らをローマ帝権の後継者として演出した。海峡を見据える鷲の像を頂く塔まで用意されている。この城は1911年と1969年の二度、プリンス・オブ・ウェールズの叙任式の場に選ばれ、後者の中継は世界でおよそ5億人が視聴したとされる。",
    [prop("Eagle Tower Strait Overlook|Mirador del estrecho desde la torre del Águila|Belvédère du détroit depuis la tour de l'Aigle|鷲の塔の海峡展望", 320, 66),
     prop("Investiture Ceremony Courtyard|Patio de la ceremonia de investidura|Cour de la cérémonie d'investiture|叙任式の中庭", 240, 50)],
  ),
  conwy: city(
    "Conwy|Conwy|Conwy|コンウィ",
    -3.83, 53.28, "wa", "castle", "castletown", "r",
    "The smallest house in Britain, wedged against a medieval wall|La casa más pequeña de Gran Bretaña, encajada contra una muralla medieval|La plus petite maison de Grande-Bretagne, coincée contre un rempart médiéval|中世の城壁に張り付く英国最小の家",
    "Conwy Castle and its 1.3-kilometre town wall, both raised in just four years from 1283 by the same architect who built Caernarfon, remain so complete that the full circuit of 21 towers can still be walked. Down by the quay, a fisherman's cottage measuring just 3.05 by 1.8 metres is certified as the smallest house in Britain and was lived in until 1900 by a man reportedly 1.9 metres tall.|El castillo de Conwy y su muralla urbana de 1,3 km, ambos alzados en solo cuatro años desde 1283 por el mismo arquitecto que construyó Caernarfon, siguen tan completos que aún puede recorrerse todo el circuito de 21 torres.|Le château de Conwy et son rempart urbain de 1,3 km, tous deux édifiés en seulement quatre ans à partir de 1283 par l'architecte même de Caernarfon, restent si complets qu'on peut encore parcourir l'intégralité du circuit de 21 tours.|コンウィ城と全長1.3kmの町を囲む城壁は、カーナーヴォン城と同じ建築家によって1283年からわずか4年で築かれ、いまも21の塔をひと巡りできるほど完全な姿を保っている。埠頭のそばには、幅わずか3.05m×1.8mの漁師の家があり、英国最小の家として認定されている。1900年まで住んでいたのは身長1.9mもあったと伝わる男性だった。",
    [prop("Town Wall Twenty-One Tower Walk|Paseo de las 21 torres de la muralla|Promenade des 21 tours du rempart|城壁の21塔の遊歩道", 300, 62),
     prop("Smallest House in Britain|La casa más pequeña de Gran Bretaña|La plus petite maison de Grande-Bretagne|英国最小の家", 220, 46)],
  ),
  stdavids: city(
    "St Davids|St Davids|St Davids|セント・デイヴィッズ",
    -5.27, 51.88, "wa", "cathedral", "cathedral", "b",
    "Britain's smallest city, hidden in a fold of land so raiders would miss it|La ciudad más pequeña de Gran Bretaña, escondida en un pliegue del terreno para que los saqueadores no la vieran|La plus petite cité de Grande-Bretagne, cachée dans un pli de terrain pour échapper aux pillards|略奪者の目を逃れるため谷底に隠された英国最小の都市",
    "St Davids holds city status purely because its cathedral seats a bishop, despite a population of under 2,000, making it by far the smallest city in Britain. The cathedral itself was deliberately built low in a river valley rather than on the headland above, tradition holds, so its tower would not be visible to Viking raiders scouting the coast.|St Davids tiene el estatus de ciudad únicamente porque su catedral es sede episcopal, pese a tener menos de 2.000 habitantes, lo que la convierte, con diferencia, en la más pequeña de Gran Bretaña.|St Davids détient le statut de cité uniquement parce que sa cathédrale est le siège d'un évêque, malgré une population de moins de 2 000 habitants, ce qui en fait de loin la plus petite cité de Grande-Bretagne.|セント・デイヴィッズは人口2000人に満たないが、大聖堂に司教座があるという理由だけで都市の地位を持ち、英国で群を抜いて最小の都市になっている。大聖堂そのものは、上の岬ではなくあえて川の谷の低い位置に建てられたと伝わる。塔が沖を伺うヴァイキングの襲撃者から見えないようにするためだったという。",
    [prop("Hidden Valley Cathedral Close|Recinto de la catedral en el valle escondido|Enclos de la cathédrale dans la vallée cachée|隠れ谷の大聖堂の境内", 220, 46),
     prop("Headland Chapel Ruin|Ruina de la capilla del promontorio|Ruine de la chapelle du promontoire|岬の礼拝堂の遺構", 180, 38)],
  ),
  holyhead: city(
    "Holyhead|Holyhead|Holyhead|ホーリーヘッド",
    -4.63, 53.31, "wa", "coast", "coasttown", "r",
    "A port built for a mail coach and still catching boats to Ireland|Un puerto hecho para una diligencia de correo que aún atrapa barcos a Irlanda|Un port bâti pour une diligence postale, toujours au service des bateaux vers l'Irlande|郵便馬車のために築かれ、今もアイルランド行きの船を待つ港",
    "Thomas Telford built the road and harbour at Holyhead in the 1820s mainly to speed the Royal Mail coach from London to Dublin, cutting the journey time so sharply that the route became a model for engineering an entire island's transport network around a single crossing point. The port still runs some of the busiest ferry routes across the Irish Sea, carrying more passengers to Ireland each year than any other Welsh harbour.|Thomas Telford construyó la carretera y el puerto de Holyhead en la década de 1820, sobre todo para acelerar la diligencia del correo real de Londres a Dublín, acortando tanto el viaje que la ruta se convirtió en modelo para diseñar el transporte de toda una isla en torno a un solo cruce.|Thomas Telford bâtit la route et le port de Holyhead dans les années 1820, principalement pour accélérer la diligence postale royale de Londres à Dublin, raccourcissant tant le trajet que cette liaison devint un modèle pour organiser le transport de toute une île autour d'un unique point de traversée.|トマス・テルフォードは1820年代、ロンドンからダブリンへの王室郵便馬車を速めるためにホーリーヘッドの道路と港を築いた。所要時間があまりに短縮されたため、この航路は島全体の交通網をひとつの渡海地点を軸に設計する手本になった。港はいまもアイリッシュ海でも屈指の便数を誇るフェリー航路を運航しており、ウェールズのどの港よりも多くの旅客をアイルランドへ運んでいる。",
    [prop("Royal Mail Coach Harbour Arch|Arco portuario de la diligencia real|Arche portuaire de la diligence royale|王室郵便馬車の港門", 240, 50),
     prop("Irish Sea Ferry Terminal|Terminal del ferri del mar de Irlanda|Terminal du ferry de la mer d'Irlande|アイリッシュ海フェリーターミナル", 190, 40)],
  ),

  // ---------------------------------------------------------------------
  // sc — スコットランド
  // ---------------------------------------------------------------------
  edinburgh: city(
    "Edinburgh|Edimburgo|Édimbourg|エディンバラ",
    -3.19, 55.95, "sc", "castle", "castletown", "r",
    "A capital built on the plug of an extinct volcano|Una capital construida sobre el tapón de un volcán extinto|Une capitale bâtie sur le culot d'un volcan éteint|絶えた火山の芯の上に築かれた首都",
    "Edinburgh Castle sits atop the hardened neck of a volcano extinct for around 350 million years, scoured into a sheer-sided crag by the same glaciers that shaped Arthur's Seat nearby. Every August the Edinburgh Festival Fringe takes over the city with tens of thousands of performances, having grown from eight theatre companies that turned up uninvited to a drama festival in 1947 and were allowed to perform on the fringes of it anyway.|El castillo de Edimburgo se alza sobre el cuello endurecido de un volcán extinto hace unos 350 millones de años, tallado en un peñasco de laderas verticales por los mismos glaciares que dieron forma al cercano Arthur's Seat.|Le château d'Édimbourg se dresse sur le culot durci d'un volcan éteint depuis environ 350 millions d'années, sculpté en un piton aux flancs abrupts par les mêmes glaciers qui façonnèrent l'Arthur's Seat voisin.|エディンバラ城は、約3億5000万年前に活動を終えた火山の硬くなった芯の上に立ち、近くのアーサーズ・シートを形作ったのと同じ氷河によって切り立った岩山に削られた。毎年8月、エディンバラ・フェスティバル・フリンジが町を埋め尽くし数万もの公演が行われるが、そのもとは1947年の演劇祭に招かれずに現れた8つの劇団が、それでも祭りの「外縁(フリンジ)」での上演を許されたことに始まる。",
    [prop("Volcanic Crag Castle Battlement|Almena del castillo sobre el peñasco volcánico|Créneau du château sur le piton volcanique|火山岩山の城の胸壁", 1400, 288),
     prop("Fringe Festival Close Theatre|Teatro del callejón del festival Fringe|Théâtre de la ruelle du festival Fringe|フリンジ・フェスティバルの路地劇場", 850, 176)],
  ),
  glasgow: city(
    "Glasgow|Glasgow|Glasgow|グラスゴー",
    -4.25, 55.86, "sc", "docks", "shipyard", "l",
    "A shipyard that once launched a fifth of the world's ships|Un astillero que llegó a botar una quinta parte de los barcos del mundo|Un chantier naval qui lançait jadis un cinquième des navires du monde|世界の造船の5分の1を進水させた造船所",
    "Shipyards along the River Clyde built roughly a fifth of the world's ships at their peak before the First World War, including the Cunard liners Queen Mary and Queen Elizabeth, launched from Clydebank in the 1930s carrying more steel than had ever gone into a moving object before. Glasgow was also declared European City of Culture in 1990, a turnaround the city used to rebuild its image around Victorian architecture and a Charles Rennie Mackintosh design legacy rather than heavy industry.|Los astilleros del río Clyde construían aproximadamente una quinta parte de los barcos del mundo en su apogeo, antes de la Primera Guerra Mundial, incluidos los transatlánticos Queen Mary y Queen Elizabeth.|Les chantiers navals de la Clyde construisaient environ un cinquième des navires du monde à leur apogée, avant la Première Guerre mondiale, y compris les paquebots Queen Mary et Queen Elizabeth.|クライド川沿いの造船所群は第一次大戦前の最盛期、世界の船のおよそ5分の1を建造していた。1930年代にクライドバンクから進水したキュナード社の客船クイーン・メリー号とクイーン・エリザベス号は、それまでのどの可動構造物より多くの鋼材を使ったとされる。グラスゴーは1990年、欧州文化首都にも選ばれ、重工業ではなくヴィクトリア朝建築とチャールズ・レニー・マッキントッシュの意匠の遺産を軸に町の印象を立て直した。",
    [prop("Clydebank Liner Launch Slipway|Grada de botadura de transatlánticos de Clydebank|Cale de lancement des paquebots de Clydebank|クライドバンクの客船進水台", 1100, 226),
     prop("Mackintosh Tearoom Interior|Interior del salón de té de Mackintosh|Intérieur du salon de thé Mackintosh|マッキントッシュの喫茶室", 700, 144)],
  ),
  inverness: city(
    "Inverness|Inverness|Inverness|インヴァネス",
    -4.22, 57.48, "sc", "mountain", "highland", "r",
    "A capital of the Highlands, guarding a monster's front door|Una capital de las Tierras Altas, custodiando la puerta de un monstruo|Une capitale des Highlands, gardant la porte d'entrée d'un monstre|怪物の玄関口を守る高地の都",
    "Inverness sits where the River Ness drains Loch Ness into the sea, making it the gateway every visitor passes through on the way to the loch's monster-hunting waters, first widely reported by the press after a 1933 newspaper account of a strange disturbance. The town's name means \"mouth of the Ness\" in Gaelic, and it grew as the effective capital of the Highlands after being connected to the rest of Scotland by the Caledonian Canal, engineered by Thomas Telford and completed in 1822.|Inverness se sitúa donde el río Ness desagua el lago Ness hacia el mar, lo que la convierte en la puerta de paso de todo visitante camino a las aguas del monstruo, difundidas ampliamente tras una noticia de prensa de 1933.|Inverness se trouve à l'endroit où la rivière Ness draine le loch Ness vers la mer, en faisant le passage obligé de tout visiteur en route vers les eaux du monstre, popularisées après un article de presse de 1933 relatant un étrange remous.|インヴァネスはネス川がネス湖の水を海へ流し込む場所にあり、怪物伝説で名高い湖の水辺を目指すすべての旅人が通る玄関口になっている。この伝説は1933年の新聞記事で奇妙な波紋が報じられて以来広く知られるようになった。町の名はゲール語で「ネスの河口」を意味し、トマス・テルフォードが手がけ1822年に完成したカレドニア運河でスコットランドの他地域と結ばれてから、事実上の高地の都として発展した。",
    [prop("Loch Ness Monster Watch Point|Punto de observación del monstruo del Lago Ness|Point d'observation du monstre du Loch Ness|ネス湖の怪物観測所", 420, 86),
     prop("Caledonian Canal Lock House|Casa de esclusa del canal Caledonio|Maison d'écluse du canal calédonien|カレドニア運河の水門小屋", 320, 66)],
  ),
  fortwilliam: city(
    "Fort William|Fort William|Fort William|フォート・ウィリアム",
    -5.10, 56.82, "sc", "mountain", "highland", "l",
    "A garrison built to watch clans it had just helped defeat|Una guarnición construida para vigilar a clanes a los que acababa de ayudar a derrotar|Une garnison bâtie pour surveiller des clans qu'elle venait d'aider à vaincre|敗れたばかりの氏族を見張るために築かれた駐屯地",
    "The fort that gave the town its name was built in the 1690s to control the Highland clans after a government massacre at nearby Glen Coe in 1692, when soldiers who had been guests in MacDonald households for two weeks turned on their hosts overnight under orders. The town now sits at the foot of Ben Nevis, the highest mountain in the British Isles at 1,345 metres, and calls itself the \"Outdoor Capital of the UK\" for the climbers who set off from its streets before dawn.|El fuerte que dio nombre al pueblo se construyó en la década de 1690 para controlar a los clanes de las Tierras Altas tras una masacre gubernamental en la cercana Glen Coe en 1692.|Le fort qui donna son nom à la ville fut bâti dans les années 1690 pour contrôler les clans des Highlands après un massacre commandité par le gouvernement à Glen Coe, tout près, en 1692.|町の名の由来となった砦は1690年代、近くのグレンコーで1692年に起きた政府による虐殺のあと、高地の氏族を統制するために築かれた。2週間もマクドナルド家に客として泊まっていた兵士たちが、命令により一夜にして宿主を襲ったという事件である。町はいま、標高1345mでブリテン諸島最高峰のベン・ネヴィスの麓にあり、夜明け前に町の通りから登山者が繰り出すことから「英国のアウトドアの都」を自称している。",
    [prop("Ben Nevis Summit Trail Lodge|Refugio del sendero a la cima del Ben Nevis|Gîte du sentier du sommet du Ben Nevis|ベン・ネヴィス山頂ルートの山小屋", 340, 70),
     prop("West Highland Line Station Café|Café de la estación de la línea West Highland|Café de la gare de la West Highland Line|ウェスト・ハイランド線の駅カフェ", 260, 54)],
  ),
  aberdeen: city(
    "Aberdeen|Aberdeen|Aberdeen|アバディーン",
    -2.09, 57.15, "sc", "granite", "granitecity", "r",
    "A grey stone city that struck black gold in the North Sea|Una ciudad de piedra gris que encontró oro negro en el mar del Norte|Une ville de pierre grise qui trouva l'or noir en mer du Nord|北海で黒い金を掘り当てた灰色石の町",
    "So many of Aberdeen's buildings are faced in local granite, flecked with mica that sparkles under sunlight or streetlamps, that the city is nicknamed the \"Granite City\", and quarrying at nearby Rubislaw left a pit so deep it once ranked among the largest man-made holes in Europe. The discovery of North Sea oil in the 1970s transformed the fishing port into the industry's operational capital, and the harbour still runs supply boats out to platforms far offshore.|Tantos edificios de Aberdeen están revestidos de granito local, moteado de mica que brilla bajo el sol o las farolas, que la ciudad se apoda «la Ciudad de Granito», y la cantera cercana de Rubislaw dejó un foso tan profundo que llegó a figurar entre los mayores agujeros artificiales de Europa.|Tant de bâtiments d'Aberdeen sont parés de granit local, moucheté de mica qui scintille au soleil ou sous les lampadaires, que la ville est surnommée la « Cité de granit », et la carrière voisine de Rubislaw a laissé un puits si profond qu'il compta parmi les plus grands trous artificiels d'Europe.|アバディーンはあまりに多くの建物が地元産の花崗岩で覆われ、日光や街灯の下で雲母がきらめくため「花崗岩の町」と呼ばれる。近郊のルビスロー採石場が残した穴は、かつてヨーロッパ屈指の深さを誇る人工の穴だった。1970年代の北海油田の発見はこの漁港を石油産業の運営拠点に変え、いまも港からは沖合のプラットフォームへ向かう補給船が出ている。",
    [prop("Rubislaw Granite Quarry Pit|Foso de la cantera de granito de Rubislaw|Puits de la carrière de granit de Rubislaw|ルビスロー花崗岩採石場の穴", 620, 128),
     prop("North Sea Platform Supply Dock|Muelle de suministro a las plataformas del mar del Norte|Quai de ravitaillement des plateformes de mer du Nord|北海プラットフォームの補給埠頭", 420, 86)],
  ),
  standrews: city(
    "St Andrews|St Andrews|St Andrews|セント・アンドリューズ",
    -2.79, 56.34, "sc", "golf", "linksgolf", "r",
    "A game invented by shepherds knocking stones into rabbit holes|Un juego inventado por pastores que golpeaban piedras hacia madrigueras de conejo|Un jeu inventé par des bergers qui frappaient des pierres vers des terriers de lapin|羊飼いが石をウサギの穴へ打ち込んだ遊びから始まったゲーム",
    "Golf is recorded on the linksland at St Andrews from at least 1400s, played over dunes where grazing rabbits had already dug the hollows that shepherds are thought to have knocked stones into for sport, and the Old Course's rules have shaped the game worldwide ever since the Royal and Ancient Golf Club standardised eighteen holes as the norm in 1764. Mary, Queen of Scots reportedly played golf here just days after her husband's murder in 1567, a scandal her enemies used against her at trial.|El golf está documentado en el terreno de links de St Andrews desde al menos el siglo XV, jugado sobre dunas donde los conejos ya habían cavado las hondonadas que los pastores, se cree, usaban para golpear piedras por diversión.|Le golf est attesté sur le terrain de links de St Andrews dès le XVe siècle, joué sur des dunes où des lapins avaient déjà creusé les creux dans lesquels des bergers, pense-t-on, frappaient des pierres pour se divertir.|セント・アンドリューズのリンクスでは少なくとも15世紀からゴルフが行われていた記録があり、ウサギが掘った窪みに羊飼いが石を打ち込んで遊んだのが始まりとされる。1764年に王立古典ゴルフクラブが18ホールを標準と定めて以来、オールド・コースのルールは世界中のゴルフを形作ってきた。スコットランド女王メアリーは1567年、夫が殺された数日後にここでゴルフをしていたと伝わり、この醜聞はのちの裁判で彼女を追い詰める材料に使われた。",
    [prop("Old Course Eighteenth Green|Green del hoyo dieciocho del Old Course|Green du dix-huitième trou de l'Old Course|オールドコース18番グリーン", 400, 82),
     prop("Links Dune Caddy Shed|Caseta de caddies en las dunas de links|Cabane des caddies dans les dunes du links|リンクスの砂丘のキャディ小屋", 300, 62)],
  ),
  portree: city(
    "Portree|Portree|Portree|ポートリー",
    -6.19, 57.41, "sc", "coast", "coasttown", "l",
    "A harbour said to take its name from a king's visit that may never have happened|Un puerto que dicen tomó su nombre de la visita de un rey que quizá nunca ocurrió|Un port dont le nom viendrait d'une visite royale peut-être jamais advenue|王の訪問にちなむと伝わるが、実際にあったか定かでない港の名",
    "Portree's name is often explained as Port Righ, \"king's harbour\", supposedly after a royal visit by James V in 1540, though the earlier written form of the name suggests it may simply derive from the Gaelic for a sheltered bay and the royal story was added later. Houses painted in bright pinks, blues and yellows line the harbour front, a colour scheme locals say once helped fishermen pick out their own home from boats still far out at sea.|El nombre de Portree suele explicarse como Port Righ, «puerto del rey», por una supuesta visita real de Jacobo V en 1540, aunque la forma escrita más antigua del nombre sugiere que podría derivar simplemente del gaélico para una bahía resguardada.|Le nom de Portree s'explique souvent par Port Righ, « port du roi », d'après une prétendue visite royale de Jacques V en 1540, bien que la forme écrite la plus ancienne du nom suggère qu'il pourrait simplement dériver du gaélique désignant une baie abritée.|ポートリーの名は、1540年のジェームズ5世の訪問にちなむ「王の港」を意味するとよく説明されるが、より古い表記から見ると、単に「風よけの湾」を意味するゲール語に由来し、王の逸話は後から付け足された可能性もある。港沿いには鮮やかなピンクや青、黄色に塗られた家並みが続き、地元の言い伝えでは沖にいる漁師が自分の家を遠くからでも見分けられるようにと始まった色使いだという。",
    [prop("Painted Harbourfront Cottage Row|Hilera de casas pintadas del puerto|Rangée de maisons peintes du front de mer|港沿いの色とりどりの家並み", 280, 58),
     prop("Sheltered Bay Fishing Pier|Muelle pesquero de la bahía resguardada|Jetée de pêche de la baie abritée|風よけの湾の漁港", 220, 46)],
  ),
  stranraer: city(
    "Stranraer|Stranraer|Stranraer|スタランレア",
    -5.02, 54.90, "sc", "coast", "coasttown", "b",
    "A shortcut to Ireland that a longer road eventually stole|Un atajo a Irlanda que una carretera más larga acabó por robarle|Un raccourci vers l'Irlande finalement volé par une route plus longue|より長い道に奪われた、アイルランドへの近道",
    "Stranraer grew around ferry crossings at the head of Loch Ryan, the shortest sea gap to Northern Ireland at only about 35 kilometres, which for generations made it the fastest way to travel between Britain and Ireland by rail and boat combined. Ferry operators shifted their main terminal a few kilometres north to Cairnryan in 2011 for deeper water access, leaving Stranraer's old railway pier quiet after more than a century as the town's reason for existing.|Stranraer creció en torno a los cruces de ferri en la cabecera del Loch Ryan, el paso marítimo más corto hacia Irlanda del Norte, de solo unos 35 km, lo que durante generaciones la convirtió en la vía más rápida entre Gran Bretaña e Irlanda combinando tren y barco.|Stranraer s'est développée autour des traversées en ferry à la tête du Loch Ryan, le passage maritime le plus court vers l'Irlande du Nord, à seulement environ 35 km, ce qui en fit pendant des générations la voie la plus rapide entre la Grande-Bretagne et l'Irlande en combinant train et bateau.|スタランレアはロッホ・ライアンの奥、北アイルランドまでわずか約35kmという最短の海路を渡るフェリーの発着地として発展し、何世代にもわたって鉄道と船を乗り継ぐ英国・アイルランド間最速の道であり続けた。フェリー会社は2011年、より深い水域を求めて主要ターミナルを数km北のケアンライアンへ移し、100年以上町の存在理由だったスタランレアの古い鉄道桟橋は静けさに包まれた。",
    [prop("Loch Ryan Railway Pier|Muelle ferroviario del Loch Ryan|Jetée ferroviaire du Loch Ryan|ロッホ・ライアンの鉄道桟橋", 220, 46),
     prop("Old Ferry Terminal Waiting Hall|Sala de espera de la vieja terminal de ferris|Hall d'attente de l'ancien terminal de ferry|旧フェリーターミナルの待合所", 180, 38)],
  ),

  // ---------------------------------------------------------------------
  // ni — 北アイルランド
  // ---------------------------------------------------------------------
  belfast: city(
    "Belfast|Belfast|Belfast|ベルファスト",
    -5.93, 54.60, "ni", "docks", "harbour", "r",
    "A shipyard that built an unsinkable ship, ten miles from where it sank|Un astillero que construyó un barco insumergible, a 16 km de donde se hundió|Un chantier naval qui bâtit un navire insubmersible, à 16 km d'où il coula|「沈まない船」を造った港と、その沈んだ海",
    "The Titanic was built at Belfast's Harland and Wolff shipyard and launched in 1911 under two enormous gantry cranes nicknamed Samson and Goliath, which still dominate the harbour skyline today. Belfast is also the birthplace of the writer C. S. Lewis, whose fascination with a wardrobe in his family home is often linked to the one that opens into Narnia, and murals across the city still record decades of the Troubles alongside newer ones celebrating peace.|El Titanic se construyó en el astillero Harland and Wolff de Belfast y se botó en 1911 bajo dos enormes grúas pórtico apodadas Sansón y Goliat, que aún dominan hoy el perfil del puerto.|Le Titanic fut construit au chantier naval Harland and Wolff de Belfast et lancé en 1911 sous deux immenses grues portiques surnommées Samson et Goliath, qui dominent encore aujourd'hui le port.|タイタニック号はベルファストのハーランド・アンド・ウルフ造船所で建造され、サムソンとゴリアテと呼ばれる2基の巨大なガントリークレーンの下、1911年に進水した。このクレーンはいまも港の風景を支配している。ベルファストは作家C・S・ルイスの生まれ故郷でもあり、実家にあった衣装だんすへの興味がナルニア国へ通じるあの衣装だんすと結びつけられることが多い。町の壁画にはいまも数十年に及ぶ「トラブルズ」の記憶が残る一方、平和を祝う新しい壁画も増えている。",
    [prop("Samson and Goliath Crane Gantry|Grúa pórtico Sansón y Goliat|Portique des grues Samson et Goliath|サムソンとゴリアテの起重機", 1000, 206),
     prop("Titanic Slipway Dry Dock|Dique seco de la grada del Titanic|Cale sèche du slipway du Titanic|タイタニックの進水台の乾ドック", 650, 134)],
  ),
  derry: city(
    "Derry/Londonderry|Derry/Londonderry|Derry/Londonderry|デリー/ロンドンデリー",
    -7.32, 55.00, "ni", "romanwall", "walledtown", "l",
    "A wall never breached, around a city that can't agree on its own name|Una muralla nunca vulnerada, alrededor de una ciudad que no se pone de acuerdo en su propio nombre|Un rempart jamais percé, autour d'une ville qui ne s'accorde pas sur son propre nom|一度も破られなかった城壁と、名前すら定まらない町",
    "The 17th-century walls survived sieges intact and remain complete enough to walk the full circuit today, giving the city its nickname \"the Maiden City\" for never having been breached. Even the city's name is contested — Derry to nationalists who trace it to the Irish for \"oak grove\", Londonderry to unionists honouring the London guilds that funded its 1613 walls — and road signs across Northern Ireland are still sometimes edited by hand to favour one name over the other.|Las murallas del siglo XVII resistieron intactas los asedios y hoy siguen lo bastante completas para recorrer todo el circuito, lo que dio a la ciudad el apodo de «la Ciudad Doncella» por no haber sido nunca vulnerada.|Les remparts du XVIIe siècle résistèrent intacts aux sièges et restent aujourd'hui assez complets pour en parcourir tout le circuit, valant à la ville son surnom de « cité vierge », jamais prise d'assaut.|17世紀に築かれた城壁は幾度もの包囲戦を経ても崩れず、いまも一周を歩き通せるほど完全な形で残っており、一度も破られなかったことから「乙女の都市」の異名を持つ。町の名前自体も論争の的で、ナショナリストはアイルランド語の「樫の木立」に由来する「デリー」を使い、ユニオニストは1613年の城壁建設に出資したロンドンの同業組合にちなむ「ロンドンデリー」を使う。北アイルランド各地の道路標識は、いまもどちらかの名を優先させるため手で書き換えられることがある。",
    [prop("Maiden City Wall Rampart Walk|Paseo por la muralla de la Ciudad Doncella|Promenade du rempart de la cité vierge|乙女の都市の城壁の道", 460, 94),
     prop("Guildhall Riverside Clock Tower|Torre del reloj junto al río del Guildhall|Tour de l'horloge du Guildhall au bord du fleuve|ギルドホールの川辺の時計塔", 340, 70)],
  ),
  bushmills: city(
    "Bushmills|Bushmills|Bushmills|ブッシュミルズ",
    -6.51, 55.20, "ni", "causeway", "causeway", "r",
    "Forty thousand stone columns that a giant is said to have laid|Cuarenta mil columnas de piedra que, se dice, colocó un gigante|Quarante mille colonnes de pierre qu'un géant aurait posées|巨人が敷いたと語り継がれる4万本の石柱",
    "The Giant's Causeway formed around 60 million years ago when rapidly cooling lava cracked into roughly 40,000 interlocking hexagonal basalt columns, a geological process folk tradition instead credits to the giant Fionn mac Cumhaill building a crossing to fight a rival in Scotland. The nearby Old Bushmills Distillery holds a licence to distil dating to 1608, making it one of the oldest legally recognised whiskey-making operations in the world.|La Calzada del Gigante se formó hace unos 60 millones de años cuando la lava, al enfriarse rápidamente, se agrietó en unas 40.000 columnas basálticas hexagonales entrelazadas, un proceso geológico que la tradición popular atribuye en cambio al gigante Fionn mac Cumhaill.|La Chaussée des Géants se forma il y a environ 60 millions d'années lorsque la lave, en refroidissant rapidement, se fissura en quelque 40 000 colonnes basaltiques hexagonales imbriquées, un phénomène géologique que la tradition populaire attribue plutôt au géant Fionn mac Cumhaill.|ジャイアンツ・コーズウェイは約6000万年前、急速に冷えた溶岩がひび割れて、およそ4万本の六角形の玄武岩柱が組み合わさってできた。しかし民間伝承では、スコットランドの好敵手と戦うために渡し道を築いた巨人フィン・マックールの仕業とされる。近くのオールド・ブッシュミルズ蒸留所は1608年に遡る蒸留免許を持ち、世界でも屈指の古さを誇る合法的なウイスキー蒸留所である。",
    [prop("Hexagonal Basalt Column Field|Campo de columnas basálticas hexagonales|Champ de colonnes basaltiques hexagonales|六角形玄武岩柱の広場", 300, 62),
     prop("Old Distillery Malting Floor|Sala de malteado de la vieja destilería|Salle de maltage de la vieille distillerie|旧蒸留所の製麦場", 220, 46)],
  ),
  mourne: city(
    "Newcastle, County Down|Newcastle, condado de Down|Newcastle, comté de Down|ニューカッスル(コ・ダウン)",
    -5.89, 54.21, "ni", "mountain", "highland", "b",
    "Mountains that \"sweep down to the sea\", and may have swept a wardrobe into a book|Montañas que «bajan hasta el mar» y quizá arrastraron un armario hasta un libro|Des montagnes qui « descendent jusqu'à la mer », peut-être jusque dans un roman|「海へなだれ落ちる」山と、物語に紛れ込んだ衣装だんす",
    "The Mourne Mountains rise straight from this small resort town to Slieve Donard at 850 metres, the highest peak in Northern Ireland, inspiring the line \"where the Mountains of Mourne sweep down to the Sea\" in a 1896 song that gave the range its enduring image. C. S. Lewis, who spent childhood holidays walking these hills, is widely thought to have drawn on their granite peaks and hidden valleys when imagining the landscape of Narnia.|Los montes Mourne se alzan directamente desde este pequeño pueblo turístico hasta el Slieve Donard, de 850 m, el pico más alto de Irlanda del Norte, e inspiraron el verso «donde los montes Mourne bajan hasta el mar» de una canción de 1896.|Les monts Mourne s'élèvent directement depuis cette petite station balnéaire jusqu'au Slieve Donard, à 850 m, le plus haut sommet d'Irlande du Nord, et inspirèrent le vers « où les monts Mourne descendent jusqu'à la mer » d'une chanson de 1896.|マーン山地はこの小さな行楽地からいきなり立ち上がり、北アイルランド最高峰の標高850mスリーヴ・ドナードへと続く。1896年の歌にある「マーンの山々が海へなだれ落ちるところ」という一節は、この山並みの変わらぬイメージを作った。少年時代の休暇をこの丘で過ごしたC・S・ルイスは、その花崗岩の峰々と隠れた谷をナルニア国の風景の着想源にしたとよく言われる。",
    [prop("Slieve Donard Granite Ridge Path|Sendero de la cresta de granito del Slieve Donard|Sentier de la crête granitique du Slieve Donard|スリーヴ・ドナードの花崗岩稜線の道", 260, 54),
     prop("Seaside Resort Bandstand|Quiosco de música del pueblo costero|Kiosque à musique de la station balnéaire|海辺の行楽地の音楽堂", 200, 42)],
  ),
};

/**
 * 路線(55本)。実在の幹線(East Coast Main Line / West Coast Main Line /
 * Great Western)を骨にしつつ、盤面としてつながりが保てるよう一部は
 * 幹線道路の相当区間で結んでいる。
 *
 * 島への渡りは`node scripts/check-sea-routes.mjs`相当の自作検査
 * (`node`で geography.mjs+cities.mjs を直接読み、陸海の食い違いをpxで測定)
 * で実測して決めた。
 *
 * - **ワイト島(カウズ)・北アイルランド(ベルファスト)は海路("sea")。**
 *   橋が無く、実際に船で渡る。
 * - **アングルシー島(ホーリーヘッド)・スカイ島(ポートリー)は陸路にした。**
 *   直線がほぼ陸の上を通ってしまい(測定でそれぞれ100%・90%が陸)、
 *   実際にもブリタニア橋(1850年、アングルシー)とスカイ橋(1995年、スカイ)という
 *   実在の橋が架かっているため、航路より陸路のほうが地理として正しい。
 * - `holyhead-belfast`は418px中88px(21%)が陸をかすめるが、これ以上の
 *   引きかたでも下がらず、実際のホーリーヘッド発フェリーもアングルシー北端を
 *   かすめて出ていくので、韓国盤面の済州航路と同じ理由で残してある。
 */
export const UK_EDGES = [
  // --- se イングランド南部(ロンドンを中心に) ---
  ["london", "canterbury"],
  ["canterbury", "dover"],
  ["london", "brighton"],
  ["london", "oxford"],
  ["london", "cambridge"],
  ["london", "salisbury"],
  ["salisbury", "bath"],
  ["bath", "bristol"],
  ["bristol", "cardiff"],
  ["brighton", "cowes", "sea"], // 陸に乗る34px(REPORT_PX=60以下)
  // --- se-mi・mi中部(West Coast Main Line・グレート・ウェスタン系統) ---
  ["oxford", "stratford"],
  ["stratford", "birmingham"],
  ["birmingham", "coventry"],
  ["coventry", "leicester"],
  ["leicester", "nottingham"],
  ["birmingham", "buxton"],
  ["bristol", "birmingham"],
  ["cambridge", "leicester"],
  // --- mi-no・no北部(East Coast・West Coast Main Line) ---
  ["nottingham", "leeds"],
  ["leeds", "york"],
  ["york", "newcastle"],
  ["newcastle", "durham"],
  ["birmingham", "chester"],
  ["chester", "manchester"],
  ["manchester", "liverpool"],
  ["manchester", "leeds"],
  ["chester", "windermere"],
  ["windermere", "newcastle"],
  ["durham", "edinburgh"],
  // --- wa ウェールズ ---
  ["cardiff", "swansea"], // 陸に乗る0px
  ["chester", "conwy"],
  ["conwy", "caernarfon"],
  ["caernarfon", "holyhead"], // 陸路。ブリタニア橋(1850年)で本土とつながる実在の鉄路
  ["swansea", "stdavids"], // 陸に乗る0px
  // --- sc スコットランド(East Coast・West Coast Main Line・West Highland Line) ---
  ["edinburgh", "glasgow"],
  ["standrews", "edinburgh"], // 陸に乗る28px(REPORT_PX=60以下)
  ["standrews", "aberdeen"], // 陸に乗る48px(REPORT_PX=60以下)
  ["aberdeen", "inverness"],
  ["edinburgh", "inverness"],
  ["glasgow", "fortwilliam"],
  ["fortwilliam", "inverness"],
  ["fortwilliam", "portree"], // 陸路。スカイ橋(1995年)で本土とつながる道
  ["glasgow", "stranraer"], // 陸に乗る0px
  // --- 航路(アイリッシュ海を渡って北アイルランドへ) ---
  ["belfast", "holyhead", "sea"], // 418px中88px(21%)がアングルシー北端をかすめる。済州航路と同じ理由で許容
  ["stranraer", "belfast", "sea"], // 陸に乗る53px(31%)。スタランレアは湾の奥の港なので、これ以上は縮まらない
  // --- ni 北アイルランド ---
  ["belfast", "derry"],
  ["derry", "bushmills"],
  ["belfast", "mourne"],
  // --- 少し離れた地方をまたぐ補助線(移動の選択肢を増やす) ---
  ["holyhead", "liverpool"], // 陸に乗る31px(REPORT_PX=60以下)
  ["bristol", "stdavids"], // 陸に乗る30px(REPORT_PX=60以下)
  ["nottingham", "york"],
  ["cambridge", "york"],
  ["glasgow", "newcastle"],
  ["cardiff", "birmingham"],
  ["mourne", "derry"],
];
