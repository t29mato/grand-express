/**
 * トルコの都市と路線。
 *
 * 地方区分は実際の地理区分にならった6つ(`mar` マルマラ / `ege` エーゲ /
 * `akd` 地中海 / `ica` 中央アナトリア / `kar` 黒海 / `dogu` 東部・南東部)。
 * トルコの公式7地方(マルマラ・エーゲ・地中海・中央アナトリア・黒海・
 * 東アナトリア・南東アナトリア)のうち、東と南東を1つにまとめた6つ。
 *
 * 43都市。マルマラ7 / エーゲ7 / 地中海7 / 中央アナトリア7 / 黒海6 / 東部9。
 * 東部を厚くしてあるのは、西部(イスタンブール・エーゲ・地中海)だけに
 * 寄せないため(ヴァン・カルスを含む)。
 *
 * 経度・緯度は実際の値。投影の範囲は geography.mjs の TURKEY_PROJ を参照。
 * イスタンブールはボスポラス海峡ヨーロッパ側(旧市街)に置く。
 *
 * mark(33種)・bg(15種)の一覧は art.mjs の冒頭コメントを参照。
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const TURKEY_CITIES = {
  // ---------------------------------------------------------------------
  // mar — マルマラ
  // ---------------------------------------------------------------------
  istanbul: city(
    "Istanbul|Estambul|Istanbul|イスタンブール",
    28.98, 41.01, "mar", "hagiasophia", "capital", "r",
    "A capital that outlived two empires under two names|Una capital que sobrevivió a dos imperios bajo dos nombres|Une capitale qui a survécu à deux empires sous deux noms|二つの帝国の都であり続けた街",
    "Constantinople served as the seat of the Roman/Byzantine Empire for over a thousand years before the Ottomans took it in 1453 and kept it as their own capital for another 470; the Hagia Sophia was built as a cathedral, converted to a mosque, then a museum, then a mosque again in 2020. The city still straddles two continents, and a commuter ferry across the Bosphorus counts as crossing from Europe to Asia.|Constantinopla fue sede del Imperio romano/bizantino durante más de mil años antes de que los otomanos la tomaran en 1453 y la conservaran como su propia capital 470 años más; Santa Sofía se construyó como catedral, se convirtió en mezquita, luego en museo y de nuevo en mezquita en 2020.|Constantinople fut le siège de l'Empire romain puis byzantin pendant plus de mille ans avant que les Ottomans ne s'en emparent en 1453 et n'en fassent leur propre capitale 470 ans durant ; Sainte-Sophie fut bâtie comme cathédrale, transformée en mosquée, puis en musée, puis de nouveau en mosquée en 2020.|コンスタンティノープルは千年以上にわたりローマ・ビザンツ帝国の都であり続け、1453年にオスマン帝国が奪ってからも470年間その都であり続けた。アヤソフィアは大聖堂として建てられ、モスクに、次いで博物館に、そして2020年に再びモスクに姿を変えている。この街はいまも二つの大陸にまたがり、ボスポラス海峡を渡る通勤フェリーはヨーロッパとアジアを渡る通勤路になる。",
    [prop("Hagia Sophia Courtyard|Patio de Santa Sofía|Cour de Sainte-Sophie|アヤソフィアの中庭", 3200, 662),
     prop("Grand Bazaar Alley|Callejón del Gran Bazar|Ruelle du Grand Bazar|グランドバザールの小路", 2600, 538)],
  ),
  bursa: city(
    "Bursa|Bursa|Bursa|ブルサ",
    29.06, 40.18, "mar", "mosque", "mosque", "l",
    "The first capital, kept green on purpose|La primera capital, verde a propósito|La première capitale, verte à dessein|緑を守り続けた最初の首都",
    "Bursa was the Ottoman Empire's capital before Istanbul, and its Green Mosque and Green Tomb, tiled in turquoise faience, still draw the name that colours the whole city. Silk brought along the trade routes made Bursa's fortune early, and cable cars now carry visitors up Uludağ, the mountain that supplies both the ski season and the sect of shade trees the city is known for.|Bursa fue la capital del Imperio otomano antes que Estambul, y su Mezquita Verde y su Tumba Verde, revestidas de loza turquesa, siguen dando nombre a toda la ciudad. La seda traída por las rutas comerciales hizo pronto la fortuna de Bursa.|Bursa fut la capitale de l'Empire ottoman avant Istanbul, et sa Mosquée verte et son Tombeau vert, carrelés de faïence turquoise, donnent encore son nom à toute la ville. La soie acheminée par les routes commerciales fit tôt la fortune de Bursa.|ブルサはイスタンブールより前のオスマン帝国の都で、トルコ石色の陶板で覆われたイェシル・ジャーミィ(緑のモスク)とイェシル・テュルベ(緑の廟)が、いまも街全体の呼び名の由来になっている。交易路で運ばれた絹が早くからブルサに富をもたらし、いまはロープウェイがウルダー山へ客を運ぶ。冬はスキー場、それ以外の季節は街の名物の木陰を供する山である。",
    [prop("Green Mosque Courtyard|Patio de la Mezquita Verde|Cour de la Mosquée verte|緑のモスクの中庭", 1400, 290),
     prop("Uludağ Cable Car Station|Estación del teleférico de Uludağ|Gare du téléphérique de l'Uludağ|ウルダー山ロープウェイ駅", 900, 186)],
  ),
  edirne: city(
    "Edirne|Edirne|Edirne|エディルネ",
    26.56, 41.68, "mar", "mosque", "mosque", "l",
    "A dome built to beat a rival's by one span|Una cúpula construida para superar la de un rival por poco|Une coupole bâtie pour dépasser d'un rien celle d'un rival|一回り上回るために設計された円蓋",
    "The architect Sinan called the Selimiye Mosque's dome his masterwork, built at 84 in 1575 to finally surpass the diameter of Hagia Sophia's after decades of trying. The city also hosts an annual oil-wrestling festival going back to the fourteenth century, held on a field along the river where competitors coat themselves in olive oil before grappling.|El arquitecto Sinan llamó a la cúpula de la Mezquita Selimiye su obra maestra, construida a los 84 años en 1575 para superar por fin el diámetro de la de Santa Sofía tras décadas intentándolo.|L'architecte Sinan qualifia la coupole de la mosquée Selimiye de chef-d'œuvre, bâtie à 84 ans en 1575 pour enfin dépasser le diamètre de celle de Sainte-Sophie après des décennies d'efforts.|建築家スィナンはセリミエ・ジャーミィの円蓋を自らの最高傑作と呼んだ。84歳だった1575年、何十年もの挑戦の末についにアヤソフィアの円蓋の直径を上回る設計を成し遂げた。街では14世紀にさかのぼるオイルレスリングの祭りが毎年開かれ、川沿いの野原で選手たちがオリーブ油を体に塗ってから組み合う。",
    [prop("Selimiye Mosque Courtyard|Patio de la Mezquita Selimiye|Cour de la mosquée Selimiye|セリミエ・ジャーミィの中庭", 1300, 268),
     prop("Oil-Wrestling Meadow|Prado de la lucha con aceite|Pré de la lutte à l'huile|オイルレスリングの野原", 620, 128)],
  ),
  canakkale: city(
    "Çanakkale|Çanakkale|Çanakkale|チャナッカレ",
    26.41, 40.15, "mar", "memorial", "strait", "r",
    "A strait that Troy's walls and a world war both watched over|Un estrecho vigilado por las murallas de Troya y por una guerra mundial|Un détroit veillé par les murs de Troie et par une guerre mondiale|トロイの城壁と世界大戦、二つが見守った海峡",
    "The Dardanelles run barely 1.2 km wide at their narrowest, close enough that Leander is said to have swum it nightly for a lover's sake, and Homer's Troy stood guard over the same strait from a mound now excavated in nine layered cities. In 1915 the strait's minefields helped turn back an Allied fleet, opening the Gallipoli campaign whose cemeteries still line the peninsula's beaches.|Los Dardanelos apenas alcanzan 1,2 km de ancho en su punto más angosto, y la Troya de Homero vigiló ese mismo estrecho desde un montículo hoy excavado en nueve ciudades superpuestas.|Les Dardanelles ne font qu'environ 1,2 km de large à leur point le plus étroit, et la Troie d'Homère veillait sur ce même détroit depuis un tertre aujourd'hui fouillé en nuf villes superposées.|ダーダネルス海峡はいちばん狭い所で幅わずか1.2kmしかなく、恋人のもとへ毎夜泳いで渡ったという伝説のレアンドロスの逸話も残る。ホメロスの詠んだトロイもこの海峡を見守っており、いまは9層の都市が積み重なった丘として発掘されている。1915年にはこの海峡の機雷原が連合軍艦隊を退け、ガリポリの戦いの幕開けとなった。半島の浜にはいまも墓地が連なる。",
    [prop("Trojan Horse Replica Plaza|Plaza del caballo de Troya|Esplanade du cheval de Troie|トロイの木馬レプリカ広場", 720, 148),
     prop("Gallipoli Cemetery Overlook|Mirador del cementerio de Galípoli|Belvédère du cimetière de Gallipoli|ガリポリ墓地の展望台", 560, 116)],
  ),
  izmit: city(
    "İzmit|Esmirna del Golfo (İzmit)|İzmit|イズミット",
    29.92, 40.77, "mar", "port", "port", "l",
    "A gulf town that keeps rebuilding after the ground moves|Un pueblo del golfo que sigue reconstruyendo tras cada temblor|Une ville du golfe qui se reconstruit sans cesse après chaque secousse|地面が動くたびに建て直してきた湾の町",
    "İzmit sits on the North Anatolian Fault, and the 1999 earthquake centred nearby killed over 17,000 people and rewrote the country's building codes. The gulf's sheltered water made it a naval arsenal under the Ottomans and still anchors a heavy petrochemical and shipbuilding industry that supplies much of the country's refined fuel.|İzmit se asienta sobre la falla de Anatolia del Norte, y el terremoto de 1999, con epicentro cercano, mató a más de 17.000 personas y reescribió el código de construcción del país.|İzmit repose sur la faille nord-anatolienne, et le séisme de 1999, dont l'épicentre était proche, tua plus de 17 000 personnes et réécrivit le code du bâtiment du pays.|イズミットは北アナトリア断層の上に位置し、1999年に近郊を震源とした地震では1万7000人以上が犠牲になり、国の建築基準法を書き換えることになった。湾の穏やかな水面はオスマン帝国時代には海軍工廠として使われ、いまも石油化学と造船の重工業が集まり、国内の精製燃料の多くを供給している。",
    [prop("Naval Arsenal Dry Dock|Dique seco del arsenal naval|Cale sèche de l'arsenal naval|海軍工廠の乾ドック", 680, 140),
     prop("Gulf Refinery Pier|Muelle de la refinería del golfo|Jetée de la raffinerie du golfe|湾の製油所の桟橋", 560, 116)],
  ),
  iznik: city(
    "İznik|Nicea (İznik)|İznik|イズニク",
    29.72, 40.43, "mar", "tile", "lakeside", "r",
    "A council settled a creed here, then a kiln settled a colour|Un concilio fijó aquí un credo, y un horno fijó después un color|Un concile y fixa un credo, puis un four y fixa une couleur|信条を定めた公会議、その後は色を定めた窯",
    "Under its old name Nicaea, the town hosted the first ecumenical council in 325, where bishops hammered out the creed still recited in churches worldwide. More than a thousand years later its kilns perfected a cobalt-and-coral tile glaze so vivid that İznik ware still supplies replacement tiles for restorations of Istanbul's imperial mosques.|Bajo su antiguo nombre de Nicea, la localidad acogió el primer concilio ecuménico en 325, donde los obispos forjaron el credo que aún se recita en iglesias de todo el mundo.|Sous son ancien nom de Nicée, la ville accueillit le premier concile œcuménique en 325, où les évêques forgèrent le credo encore récité dans les églises du monde entier.|かつてニカイアと呼ばれたこの町では325年、第一回全地公会議が開かれ、いまも世界中の教会で唱えられる信条がここで作られた。千年以上後には、この地の窯がコバルトと珊瑚色を使った鮮やかな陶板の釉薬を完成させ、イズニク陶器はいまもイスタンブールの帝室モスクの修復に使う代替タイルを供給している。",
    [prop("Tile Kiln Workshop|Taller del horno de azulejos|Atelier du four à céramique|陶板窯の工房", 520, 108),
     prop("Lakeside Council Basilica|Basílica del concilio junto al lago|Basilique du concile au bord du lac|湖畔の公会議聖堂跡", 460, 96)],
  ),
  tekirdag: city(
    "Tekirdağ|Tekirdağ|Tekirdağ|テキルダー",
    27.51, 40.98, "mar", "vineyard", "seaside", "l",
    "A coastline of vines that never stopped after the Byzantines|Un litoral de viñas que nunca dejó de cultivarse desde los bizantinos|Un littoral de vignes jamais délaissé depuis les Byzantins|ビザンツ以来絶えなかった葡萄の海岸",
    "Thrace's rolling hills around Tekirdağ have grown wine grapes since Byzantine times, and the region now accounts for a large share of the country's wine production despite operating in a Muslim-majority nation with tight alcohol taxes. The town's other trademark, a garlicky grilled meatball sold under its own name nationwide, is said to have been developed by Balkan immigrant butchers in the nineteenth century.|Las colinas onduladas de Tracia en torno a Tekirdağ cultivan uvas de vino desde tiempos bizantinos, y la región aporta hoy buena parte de la producción vinícola del país.|Les collines vallonnées de Thrace autour de Tekirdağ cultivent la vigne depuis l'époque byzantine, et la région fournit aujourd'hui une bonne part de la production viticole du pays.|テキルダー周辺のトラキアのなだらかな丘陵は、ビザンツ時代からワイン用の葡萄を育ててきた。イスラム教徒が多数を占め酒税も重いこの国にあって、この地方はいまも国内ワイン生産の大きな割合を占めている。もう一つの名物、にんにくの効いた焼きミートボールは全国でこの町の名で売られており、19世紀にバルカン移民の肉屋が考案したと言われる。",
    [prop("Hillside Vineyard Terrace|Terraza del viñedo de ladera|Terrasse du vignoble en coteau|丘の葡萄畑のテラス", 460, 96),
     prop("Grilled Meatball Harbourfront|Paseo marítimo de las albóndigas asadas|Front de mer aux boulettes grillées|焼きミートボールの海岸通り", 380, 78)],
  ),

  // ---------------------------------------------------------------------
  // ege — エーゲ
  // ---------------------------------------------------------------------
  izmir: city(
    "İzmir|Esmirna|Smyrne|イズミル",
    27.14, 38.42, "ege", "port", "port", "r", // 左向きだとチェシメのラベルとぶつかるため右向きにする
    "A fire that cleared the ground for a republic's second city|Un incendio que despejó el terreno para la segunda ciudad de una república|Un incendie qui dégagea le terrain pour la seconde ville d'une république|共和国第二の都市を築いた大火",
    "A fire in September 1922, at the close of the war that ended Ottoman rule over the city, burned much of the old harbour quarter to the ground and displaced tens of thousands in a single week. The wide seafront boulevard built afterward, the Kordon, is now where the city takes its evening walk, past the clock tower that survived the blaze.|Un incendio en septiembre de 1922, al final de la guerra que puso fin al dominio otomano de la ciudad, arrasó buena parte del viejo barrio portuario y desplazó a decenas de miles en una sola semana.|Un incendie en septembre 1922, à la fin de la guerre qui mit fin à la domination ottomane sur la ville, ravagea une bonne partie du vieux quartier portuaire et déplaça des dizaines de milliers de personnes en une seule semaine.|1922年9月、この街へのオスマン帝国の支配が終わる戦争の末に起きた大火は、旧港湾地区の大半を焼き尽くし、わずか一週間で数万人を住まいから追いやった。焼け跡に築かれた海沿いの広い並木道コルドンは、大火を生き延びた時計塔のそばを通り、いまも街の人が夕方の散歩に集う場所になっている。",
    [prop("Kordon Seafront Promenade|Paseo marítimo del Kordon|Promenade du Kordon|コルドン海岸通り", 1600, 330),
     prop("Clock Tower Square|Plaza de la torre del reloj|Place de la tour de l'horloge|時計塔広場", 1100, 228)],
  ),
  selcuk: city(
    "Selçuk|Selçuk|Selçuk|セルチュク",
    27.37, 37.95, "ege", "amphitheater", "ruins", "r",
    "A library facade that outlasted the books behind it|Una fachada de biblioteca que sobrevivió a los libros que guardaba|Une façade de bibliothèque qui a survécu aux livres qu'elle abritait|中身より長く残った図書館の正面",
    "Ephesus's Library of Celsus was built around 117 AD to also serve as a tomb for the Roman senator it honoured, its two-storey facade of columns and niches re-erected from fallen fragments in the 1970s though the scrolls it once held are long gone. The nearby Temple of Artemis, once counted among the Seven Wonders of the Ancient World, survives today as a single reconstructed column in a field.|La Biblioteca de Celso en Éfeso se construyó hacia el año 117 d.C. para servir también de tumba al senador romano que honraba, y su fachada de dos plantas se volvió a levantar con fragmentos caídos en los años setenta.|La bibliothèque de Celsus, à Éphèse, fut bâtie vers 117 apr. J.-C. pour servir aussi de tombeau au sénateur romain qu'elle honorait, et sa façade à deux étages fut relevée à partir de fragments écroulés dans les années 1970.|エフェソスのケルスス図書館は西暦117年ごろ、称えたローマの元老院議員の墓を兼ねて建てられた。二層の柱とニッチが並ぶ正面は1970年代に崩れた破片から組み直されたもので、かつて収めていた巻物はとうに失われている。近くのアルテミス神殿は古代世界の七不思議の一つに数えられたが、いまは野原に立つ復元された柱一本だけが残る。",
    [prop("Library of Celsus Steps|Escalinata de la Biblioteca de Celso|Escalier de la bibliothèque de Celsus|ケルスス図書館の階段", 1200, 248),
     prop("Temple of Artemis Field|Explanada del Templo de Artemisa|Esplanade du temple d'Artémis|アルテミス神殿跡", 780, 160)],
  ),
  pamukkale: city(
    "Pamukkale|Pamukkale|Pamukkale|パムッカレ",
    29.12, 37.92, "ege", "travertine", "travertine", "l",
    "A hillside of cotton that is actually mineral, not cloth|Una ladera de algodón que en realidad no es tela, sino mineral|Un coteau de coton qui n'est en réalité pas du tissu, mais du minéral|布ではなく鉱物でできた「綿の城」",
    "Pamukkale means \"cotton castle\", named for the white calcium-carbonate terraces built up over millennia as mineral-rich hot springs cool and deposit travertine on the slope. The Roman spa city of Hierapolis was founded right above the terraces to make use of the same water, and its ruins include a theatre still nearly intact on the ridge overlooking the white pools.|Pamukkale significa «castillo de algodón», nombre dado por las terrazas blancas de carbonato cálcico formadas a lo largo de milenios cuando aguas termales ricas en minerales se enfrían y depositan travertino en la ladera.|Pamukkale signifie « château de coton », nommé d'après les terrasses blanches de carbonate de calcium formées au fil des millénaires par le refroidissement d'eaux thermales riches en minéraux qui déposent du travertin sur la pente.|パムッカレは「綿の城」を意味し、鉱物を多く含む温泉が冷えて斜面に石灰華を積もらせ、幾千年もかけて築いた白い段丘にちなんで名付けられた。ローマ時代の温泉都市ヒエラポリスはこの同じ湧き水を利用するため段丘のすぐ上に築かれ、白い段丘を見下ろす尾根にはいまもほぼ無傷の劇場が残る。",
    [prop("White Travertine Terrace|Terraza blanca de travertino|Terrasse de travertin blanc|白い石灰華段丘", 1000, 206),
     prop("Hierapolis Theatre Steps|Gradas del teatro de Hierápolis|Gradins du théâtre de Hiérapolis|ヒエラポリス劇場の階段席", 720, 148)],
  ),
  bodrum: city(
    "Bodrum|Bodrum|Bodrum|ボドルム",
    27.43, 37.03, "ege", "castle", "seaside", "r",
    "A wonder's stones went into a castle built to keep its heirs out|Las piedras de una maravilla acabaron en un castillo hecho para excluir a sus herederos|Les pierres d'une merveille finirent dans un château bâti pour en exclure les héritiers|七不思議の石材で築いた、後継者を締め出す城",
    "The Mausoleum of Halicarnassus, one of the Seven Wonders of the Ancient World, stood here until earthquakes toppled it, and Knights Hospitaller later quarried its carved stone to build the Castle of St Peter, visible reliefs and all, right on the harbour. The knights held the castle until 1523, when Suleiman the Magnificent's forces finally took it, ending two centuries of crusader presence on the Aegean coast.|El Mausoleo de Halicarnaso, una de las Siete Maravillas del Mundo Antiguo, se alzó aquí hasta que unos terremotos lo derribaron, y los caballeros hospitalarios extrajeron después su piedra tallada para construir el Castillo de San Pedro.|Le mausolée d'Halicarnasse, l'une des sept merveilles du monde antique, se dressa ici jusqu'à ce que des séismes le renversent, et les chevaliers hospitaliers en extrayèrent ensuite la pierre taillée pour bâtir le château Saint-Pierre.|古代世界の七不思議の一つ、ハリカルナッソスの霊廟はここに立っていたが地震で倒れ、聖ヨハネ騎士団はその彫刻を施した石材を切り出し、浮彫のままサン・ピエール城(ボドルム城)を港のすぐそばに築いた。騎士団は1523年、スレイマン大帝の軍がついに攻め落とすまでこの城を保持し、エーゲ海沿岸における二世紀にわたる十字軍勢力の終焉となった。",
    [prop("Castle of St Peter Bastion|Baluarte del Castillo de San Pedro|Bastion du château Saint-Pierre|サン・ピエール城の稜堡", 1400, 290),
     prop("Windmill Ridge Overlook|Mirador de la loma de los molinos|Belvédère de la crête aux moulins|風車の丘の展望台", 780, 160)],
  ),
  cesme: city(
    "Çeşme|Çeşme|Çeşme|チェシメ",
    26.31, 38.32, "ege", "coast", "seaside", "r", // 盤面の左端に近いため右向き(İzmirも右向きにして衝突を避ける)
    "A naval defeat that pushed an empire to modernise its fleet|Una derrota naval que empujó a un imperio a modernizar su flota|Une défaite navale qui poussa un empire à moderniser sa flotte|艦隊近代化を促した海戦の敗北",
    "In 1770 a Russian fleet trapped and burned the Ottoman navy in Çeşme's bay in a single night, a defeat so total it pushed the empire into decades of naval reform. The peninsula's fierce, reliable summer wind that once complicated that battle now draws windsurfers instead, and its stone windmills, once used for grinding grain, dot the ridgelines above the town.|En 1770 una flota rusa atrapó e incendió la armada otomana en la bahía de Çeşme en una sola noche, una derrota tan total que empujó al imperio a décadas de reforma naval.|En 1770, une flotte russe piégea et incendia la marine ottomane dans la baie de Çeşme en une seule nuit, une défaite si totale qu'elle poussa l'empire vers des décennies de réforme navale.|1770年、ロシア艦隊はチェシメ湾でオスマン海軍をひと晩のうちに閉じ込めて焼き払った。あまりに徹底した敗北で、帝国は以後数十年にわたる海軍改革へと進むことになった。その海戦をかき乱した半島特有の強く安定した夏の風は、いまはウィンドサーファーを呼び寄せ、かつて穀物を挽くのに使われた石造りの風車が町を見下ろす尾根に点在している。",
    [prop("Windmill Ridge Terrace|Terraza de la loma de los molinos|Terrasse de la crête aux moulins|風車の尾根のテラス", 620, 128),
     prop("Windsurf Bay Landing|Embarcadero de la bahía del windsurf|Débarcadère de la baie du windsurf|ウィンドサーフの入り江", 460, 96)],
  ),
  manisa: city(
    "Manisa|Manisa|Manisa|マニサ",
    27.43, 38.61, "ege", "mosque", "mosque", "r",
    "A remedy stirred once a year, and thrown to a crowd from a roof|Un remedio removido una vez al año, y lanzado a la multitud desde un tejado|Un remède préparé une fois l'an, et lancé à la foule depuis un toit|屋根の上から群衆へ撒かれる、年に一度練る万能薬",
    "Manisa's Sultan Mosque complex has handed out mesir macunu, a spiced paste once compounded from dozens of ingredients as a cure-all, from its minarets to crowds below every spring since the sixteenth century, a custom now run as a city-wide festival. The mountain above the city, ancient Sipylus, is named in Greek myth as the place where a grieving Niobe turned to stone.|El complejo de la Mezquita del Sultán de Manisa reparte desde el siglo XVI, cada primavera, la mesir macunu, una pasta especiada antaño compuesta de docenas de ingredientes como remedio universal, lanzada desde sus minaretes a la multitud.|Le complexe de la mosquée du Sultan de Manisa distribue depuis le XVIe siècle, chaque printemps, la mesir macunu, une pâte épicée jadis composée de dizaines d'ingrédients en remède universel, lancée depuis ses minarets à la foule.|マニサのスルタン・モスク複合施設では16世紀以来毎春、かつて何十もの材料を調合した万能薬とされたメスィル・マジュヌ(香辛料入りの練り薬)がミナレットから下の群衆へ撒かれてきた。いまは街をあげての祭りとして続いている。街を見下ろす山、古代名スィピュロスはギリシャ神話で、嘆き悲しんだニオベが石に変わった場所とされる。",
    [prop("Sultan Mosque Minaret Plaza|Plaza del minarete de la Mezquita del Sultán|Esplanade du minaret de la mosquée du Sultan|スルタン・モスクのミナレット広場", 780, 160),
     prop("Spice Paste Festival Street|Calle del festival de la pasta de especias|Rue du festival de la pâte épicée|メスィル祭りの通り", 520, 108)],
  ),
  ayvalik: city(
    "Ayvalık|Ayvalık|Ayvalık|アイワルック",
    26.69, 39.33, "ege", "olive", "seaside", "l",
    "A town of soap and oil left behind by a population exchange|Un pueblo de jabón y aceite que dejó atrás un intercambio de población|Une ville de savon et d'huile laissée par un échange de populations|人口交換が残した石鹸と油の町",
    "Ayvalık's stone townhouses were built by an Orthodox Greek community that pressed olive oil and boiled it into soap for generations, until the 1923 population exchange between Greece and Turkey moved almost everyone out within months and brought Muslim refugees from Greece in almost as fast. The soap works and oil presses kept running under new hands, and the surrounding hillsides still hold some of the country's oldest olive groves.|Las casas de piedra de Ayvalık las construyó una comunidad ortodoxa griega que prensaba aceite de oliva y lo convertía en jabón durante generaciones, hasta que el intercambio de población de 1923 entre Grecia y Turquía desplazó a casi todos en meses.|Les maisons de pierre d'Ayvalık furent bâties par une communauté grecque orthodoxe qui pressait l'huile d'olive et la transformait en savon depuis des générations, jusqu'à ce que l'échange de population de 1923 entre la Grèce et la Turquie ne déplace presque tout le monde en quelques mois.|アイワルックの石造りの町家は、代々オリーブ油を搾って石鹸に仕立ててきたギリシャ正教徒の共同体が築いたものだが、1923年のギリシャ・トルコ人口交換で数か月のうちにほぼ全員が入れ替わり、ギリシャからのムスリム移民が大勢入ってきた。石鹸工房と搾油所は新しい担い手のもとで動き続け、周りの丘には国内でも指折り古いオリーブ林がいまも残る。",
    [prop("Olive Soap Workshop|Taller del jabón de oliva|Atelier du savon d'olive|オリーブ石鹸の工房", 480, 100),
     prop("Old Greek Quarter Lane|Callejón del antiguo barrio griego|Ruelle du vieux quartier grec|旧ギリシャ人街の路地", 360, 74)],
  ),

  // ---------------------------------------------------------------------
  // akd — 地中海
  // ---------------------------------------------------------------------
  antalya: city(
    "Antalya|Antalya|Antalya|アンタルヤ",
    30.71, 36.90, "akd", "waterfall", "seaside", "r",
    "A river that drops straight off a cliff into the sea|Un río que cae en vertical desde un acantilado al mar|Une rivière qui tombe droit d'une falaise dans la mer|崖から海へ直接落ちる川",
    "Düden Falls splits into two: an upper cascade inland and a lower one where the river runs off a limestone cliff and drops roughly 40 metres straight into the Mediterranean, visible best from boats that pass close enough to catch the spray. The old harbour below the cliffs, Kaleiçi, still follows the street plan the Romans and later the Seljuks laid out around it.|Las cataratas de Düden se dividen en dos: una cascada superior tierra adentro y una inferior donde el río cae desde un acantilado calizo unos 40 metros directo al Mediterráneo.|Les chutes de Düden se scindent en deux : une cascade supérieure à l'intérieur des terres et une inférieure où la rivière tombe d'une falaise calcaire sur environ 40 mètres, droit dans la Méditerranée.|デュデン滝は上下二段に分かれ、下段は石灰岩の崖から地中海へおよそ40m落下する。しぶきを浴びられるほど近づく船から眺めるのが一番よいとされる。崖の下に広がる旧港カレイチは、ローマ人、のちにセルジューク朝が敷いた街路の区画をいまも保っている。",
    [prop("Cliffside Waterfall Overlook|Mirador de la cascada del acantilado|Belvédère de la chute de la falaise|崖の滝の展望台", 1000, 206),
     prop("Kaleiçi Old Harbour Lane|Callejón del viejo puerto de Kaleiçi|Ruelle du vieux port de Kaleiçi|カレイチ旧港の路地", 780, 160)],
  ),
  fethiye: city(
    "Fethiye|Fethiye|Fethiye|フェティエ",
    29.13, 36.62, "akd", "paraglide", "seaside", "l",
    "A lagoon so calm it launched a sport off the mountain above it|Una laguna tan tranquila que lanzó un deporte desde la montaña que la domina|Une lagune si calme qu'elle a lancé un sport depuis la montagne qui la domine|穏やかすぎる入り江から始まった空のスポーツ",
    "Ölüdeniz, meaning \"dead sea\" for its unusually still, turquoise lagoon sheltered by a sandbar, sits directly beneath Babadağ, a peak whose steady thermals and reliable view of the coast turned the area into one of the world's most popular paragliding launch sites from the 1980s on. Nearby, rock-cut Lycian tombs carved directly into cliff faces face the same water from a civilisation that predates the sport by over two thousand years.|Ölüdeniz, «mar muerto» por su laguna turquesa inusualmente quieta, resguardada por un banco de arena, se halla justo bajo el Babadağ, un pico cuyas térmicas constantes convirtieron la zona en uno de los lugares de parapente más populares del mundo.|Ölüdeniz, « mer morte » en raison de son lagon turquoise étonnamment calme abrité par un banc de sable, se trouve juste sous le Babadağ, un sommet dont les thermiques constants ont fait de la région l'un des hauts lieux mondiaux du parapente.|「死の海」を意味するウルデニズは、砂州に守られた異様に静かなトルコ石色の入り江で、その真上にバババー山がそびえる。安定した上昇気流と海岸の見晴らしのよさから、1980年代以降世界屈指のパラグライダー発進地の一つになった。近くの崖には二千年以上前のリキア文明が岩壁に直接彫った墳墓が、同じ海を見下ろしている。",
    [prop("Paraglide Launch Ridge|Cresta de lanzamiento de parapente|Crête de décollage du parapente|パラグライダー発進地の尾根", 900, 186),
     prop("Rock-Cut Lycian Tomb Cliff|Acantilado de tumbas licias rupestres|Falaise aux tombeaux lyciens rupestres|リキア岩窟墓の崖", 620, 128)],
  ),
  alanya: city(
    "Alanya|Alanya|Alanya|アランヤ",
    32.00, 36.54, "akd", "castle", "seaside", "r",
    "A sultan bought a peninsula just to build a shipyard on it|Un sultán compró una península solo para construir en ella un astillero|Un sultan acheta une péninsule pour y bâtir un chantier naval|造船所のために半島ごと買い取った君主",
    "The Seljuk sultan Alaeddin Keykubad purchased this rocky peninsula in 1221 specifically to build a fortified naval base, and the Red Tower he raised to guard its shipyard still stands an octagonal five storeys by the harbour. The castle walls running along the peninsula's ridge stretch nearly 7 km, enclosing enough space that a small village once lived entirely within them.|El sultán selyúcida Aleddín Keykubad compró esta península rocosa en 1221 justo para construir una base naval fortificada, y la Torre Roja que alzó para proteger su astillero sigue en pie, octogonal y de cinco plantas, junto al puerto.|Le sultan seldjoukide Alaeddin Keykubad acheta cette péninsule rocheuse en 1221 tout spécialement pour y bâtir une base navale fortifiée, et la Tour rouge qu'il éleva pour protéger son chantier naval se dresse toujours, octogonale et haute de cinq étages, près du port.|セルジューク朝のスルタン、アラーウッディーン・カイクバードは1221年、要塞化された海軍基地を築くためだけにこの岩だらけの半島を買い取った。造船所を守るために建てた八角形五階建ての赤い塔は、いまも港のそばに立つ。半島の尾根沿いに走る城壁は全長7kmに迫り、かつてはその中だけで小さな村が丸ごと暮らせるほどの広さを囲っていた。",
    [prop("Red Tower Shipyard Dock|Muelle del astillero de la Torre Roja|Quai du chantier naval de la Tour rouge|赤い塔の造船所の桟橋", 900, 186),
     prop("Peninsula Castle Wall Walk|Paseo de la muralla del castillo de la península|Promenade des remparts du château de la péninsule|半島城壁の遊歩道", 620, 128)],
  ),
  mersin: city(
    "Mersin|Mersin|Mersin|メルスィン",
    34.64, 36.80, "akd", "port", "port", "l",
    "A fishing hamlet that became the country's busiest container port|Una aldea de pescadores que se convirtió en el puerto de contenedores más activo del país|Un hameau de pêcheurs devenu le port à conteneurs le plus actif du pays|国内最大のコンテナ港になった漁村",
    "Mersin was a small fishing settlement until the late Ottoman period, when a rail line to inland Adana and a new harbour turned it almost overnight into the region's main outlet for cotton and grain. Its free trade zone and container terminal now handle more cargo by volume than any other Turkish port, and a large Arabic-speaking population, refugees and long-settled traders both, gives the covered market a bilingual hum most days.|Mersin era un pequeño asentamiento de pescadores hasta finales del período otomano, cuando una línea de ferrocarril hasta la interior Adana y un nuevo puerto la convirtieron casi de la noche a la mañana en la principal salida de algodón y grano de la región.|Mersin n'était qu'un petit village de pêcheurs jusqu'à la fin de la période ottomane, quand une ligne de chemin de fer vers Adana, à l'intérieur des terres, et un nouveau port en firent presque du jour au lendemain le principal débouché régional du coton et des céréales.|メルスィンはオスマン帝国末期まで小さな漁村にすぎなかったが、内陸のアダナへ延びる鉄道と新しい港ができると、ほとんど一夜にして地方随一の綿花と穀物の積出港に変わった。自由貿易区とコンテナ埠頭はいまや国内のどの港よりも取扱貨物量が多く、難民と旧来の商人の双方からなる多くのアラビア語話者が、市場に日々二言語の賑わいを添えている。",
    [prop("Container Terminal Crane Row|Hilera de grúas de la terminal de contenedores|Rangée de grues du terminal à conteneurs|コンテナ埠頭のクレーン列", 780, 160),
     prop("Covered Market Spice Row|Hilera de especias del mercado cubierto|Rangée d'épices du marché couvert|屋根付き市場の香辛料通り", 460, 96)],
  ),
  adana: city(
    "Adana|Adana|Adana|アダナ",
    35.33, 37.00, "akd", "bridge", "port", "r",
    "A Roman bridge that has carried traffic for nineteen centuries|Un puente romano que lleva diecinueve siglos soportando tráfico|Un pont romain qui porte la circulation depuis dix-neuf siècles|十九世紀にわたり交通を支えてきたローマ橋",
    "The Taşköprü stone bridge across the Seyhan River was built under Emperor Hadrian around 2nd century AD and, after repairs across Byzantine, Seljuk and Ottoman rule, still carried vehicle traffic until 2007, making it one of the longest continuously used Roman bridges anywhere. The city's spiced, hand-minced kebab, named for it and grilled over charcoal, is defended by locals as distinct from every other kebab in the country.|El puente de piedra Taşköprü sobre el río Seyhan se construyó bajo el emperador Adriano hacia el siglo II d.C. y, tras reparaciones bizantinas, selyúcidas y otomanas, siguió soportando tráfico rodado hasta 2007.|Le pont de pierre Taşköprü sur le Seyhan fut bâti sous l'empereur Hadrien vers le IIe siècle apr. J.-C. et, après des réparations byzantines, seldjoukides puis ottomanes, continua de porter la circulation automobile jusqu'en 2007.|セイハン川に架かる石橋タシュキョプリュはハドリアヌス帝の治世、西暦2世紀ごろに建てられ、ビザンツ・セルジューク・オスマンの各時代に補修を受けながら2007年まで車両を通し続けた、現役だったローマ橋としては世界でも指折りの長寿を誇る。この街の名を冠した香辛料入りの手挽き肉のケバブは炭火で焼かれ、地元の人は国内の他のどのケバブとも違うと言い張る。",
    [prop("Roman Stone Bridge Crossing|Cruce del puente de piedra romano|Traversée du pont de pierre romain|ローマ石橋の渡り口", 720, 148),
     prop("Charcoal Kebab Grill Row|Hilera de parrillas de kebab al carbón|Rangée de grils à kebab au charbon|炭火ケバブの屋台通り", 420, 86)],
  ),
  kas: city(
    "Kaş|Kaş|Kaş|カシュ",
    29.64, 36.20, "akd", "diving", "seaside", "l",
    "A sunken city that a whole harbour town keeps watch over|Una ciudad hundida que todo un puerto vigila|Une ville engloutie que tout un port de pêche surveille|港町がまるごと見守る沈んだ都市",
    "Off the coast near Kaş, the ruins of ancient Kekova sank beneath the sea after earthquakes in the second century AD, leaving building foundations, staircases and jar fragments visible through clear water shallow enough to paddle over without diving gear. The small harbour town above, once a Greek-majority sponge-diving port called Antiphellos, still has rock-cut Lycian tombs looming directly over its rooftops.|Frente a la costa de Kaş, las ruinas de la antigua Kekova se hundieron bajo el mar tras terremotos del siglo II d.C., dejando cimientos, escaleras y fragmentos de tinajas visibles a través de aguas claras y poco profundas.|Au large de Kaş, les ruines de l'antique Kekova s'enfoncèrent sous la mer après des séismes du IIe siècle apr. J.-C., laissant fondations, escaliers et fragments de jarres visibles à travers des eaux claires et peu profondes.|カシュ沖では、西暦2世紀の地震で古代都市ケコヴァが海に沈み、建物の基礎や階段、壺の破片が澄んだ浅瀬に透けて見え、潜らずカヤックで漕ぎ渡るだけでも眺められる。かつてアンティフェロスと呼ばれたギリシャ系住民主体の海綿採り港だった小さな港町の屋根の真上には、いまもリキアの岩窟墓がそびえている。",
    [prop("Sunken City Boat Landing|Embarcadero de la ciudad hundida|Débarcadère de la cité engloutie|沈んだ都市への船着場", 680, 140),
     prop("Rock Tomb Rooftop View|Vista de los tejados y las tumbas rupestres|Vue sur les toits et les tombeaux rupestres|岩窟墓と屋根の眺め", 460, 96)],
  ),
  antakya: city(
    "Antakya|Antioquía (Antakya)|Antakya|アンタキヤ",
    36.16, 36.20, "akd", "ruins", "ruins", "r",
    "A city that gave an apostle's followers their name, then took a quake's mark for itself|Una ciudad que dio nombre a los seguidores de un apóstol, y luego un terremoto la marcó a ella|Une ville qui donna son nom aux disciples d'un apôtre, avant qu'un séisme ne la marque à son tour|使徒の弟子たちに呼び名を与え、のちに地震の爪痕を負った街",
    "Ancient Antioch was, by the Book of Acts' account, the city where the followers of Jesus were first called Christians, and its Roman and Byzantine mosaic floors, some depicting the evil eye or a skeleton urging revellers to enjoy life, now fill one of the world's largest mosaic museums. The February 2023 earthquake flattened much of the old city and killed tens of thousands regionally, and reconstruction of Antakya's historic quarter is still under way.|La antigua Antioquía fue, según los Hechos de los Apóstoles, la ciudad donde los seguidores de Jesús recibieron por primera vez el nombre de cristianos, y sus suelos de mosaico romano y bizantino llenan hoy uno de los mayores museos de mosaicos del mundo.|L'antique Antioche fut, selon les Actes des Apôtres, la ville où les disciples de Jésus furent pour la première fois appelés chrétiens, et ses sols en mosaïque romains et byzantins remplissent aujourd'hui l'un des plus grands musées de mosaïques au monde.|使徒言行録によれば、古代アンティオキアはイエスの弟子たちが初めて「キリスト教徒」と呼ばれた街とされ、悪目除けや「人生を楽しめ」と促す骸骨を描いたローマ・ビザンツ時代のモザイク床は、いま世界屈指の規模を誇るモザイク博物館を埋めている。2023年2月の地震は旧市街の多くを押しつぶし、周辺一帯で数万人が犠牲になった。アンタキヤの歴史地区の再建はいまも続いている。",
    [prop("Mosaic Museum Gallery|Galería del museo de mosaicos|Galerie du musée de la mosaïque|モザイク博物館の展示室", 780, 160),
     prop("St Peter's Grotto Church|Iglesia-gruta de San Pedro|Église-grotte de Saint-Pierre|聖ペテロ洞窟教会", 380, 78)],
  ),

  // ---------------------------------------------------------------------
  // ica — 中央アナトリア
  // ---------------------------------------------------------------------
  ankara: city(
    "Ankara|Ankara|Ankara|アンカラ",
    32.85, 39.93, "ica", "castle", "steppe", "l",
    "A goat-hair capital that outranked a city of Byzantine emperors|Una capital de pelo de cabra que superó en rango a una ciudad de emperadores bizantinos|Une capitale au poil de chèvre qui surpassa en rang une ville d'empereurs byzantins|皇帝の都を差し置いた「モヘアの都」",
    "Ankara was a modest Anatolian trading town, famous mainly for the soft mohair fleece of its Angora goats, before the new republic's founders picked it over occupied, war-weary Istanbul as capital in 1923, betting on distance from the coast for safety. The Hittite sun-disc standards found nearby, more than 3,000 years old, are now the city's official symbol, reaching back further than either Rome or Byzantium.|Ankara era una modesta ciudad comercial de Anatolia, famosa sobre todo por el suave pelo mohair de sus cabras angora, antes de que los fundadores de la nueva república la eligieran como capital en 1923 en vez de la ocupada y exhausta Estambul.|Ankara était une modeste ville marchande d'Anatolie, surtout réputée pour le doux mohair de ses chèvres angora, avant que les fondateurs de la nouvelle république ne la préfèrent en 1923 à Istanbul, occupée et épuisée par la guerre.|アンカラはアンゴラ山羊の柔らかいモヘア毛で知られる程度の、アナトリアのささやかな商業都市にすぎなかったが、新共和国の建国者たちは1923年、占領され疲弊したイスタンブールに代えてこの街を首都に選んだ。海岸から離れていることを安全と見込んでの選択だった。近郊で見つかった3000年以上前のヒッタイトの太陽円盤の標章は、いまや市の公式紋章となり、ローマともビザンツとも比べものにならないほど古い由緒を街に与えている。",
    [prop("Hittite Sun-Disc Museum Hall|Sala del museo del disco solar hitita|Salle du musée du disque solaire hittite|ヒッタイト太陽円盤博物館", 1200, 248),
     prop("Citadel Hilltop Quarter|Barrio de la ciudadela en la colina|Quartier de la citadelle sur la colline|城砦の丘の旧市街", 900, 186)],
  ),
  konya: city(
    "Konya|Konya|Konya|コンヤ",
    32.48, 37.87, "ica", "dervish", "mosque", "r",
    "A poet's death anniversary is celebrated as a wedding night|El aniversario de la muerte de un poeta se celebra como noche de bodas|L'anniversaire de la mort d'un poète y est célébré comme une nuit de noces|詩人の命日を婚礼の夜として祝う街",
    "The mystic poet Rumi lived and taught in Konya until his death in 1273, an event his followers still mark every December not as a funeral but as his Şeb-i Arus, or \"wedding night\" with the divine, with dervishes turning in the whirling sema ceremony he inspired. His shrine, capped by a fluted turquoise-tiled cone visible across the city, draws pilgrims regardless of the season.|El poeta místico Rumi vivió y enseñó en Konya hasta su muerte en 1273, un hecho que sus seguidores siguen conmemorando cada diciembre no como un funeral, sino como su Şeb-i Arus, o «noche de bodas» con lo divino.|Le poète mystique Rûmî vécut et enseigna à Konya jusqu'à sa mort en 1273, un événement que ses disciples commémorent encore chaque décembre non comme des funérailles, mais comme son Şeb-i Arus, sa « nuit de noces » avec le divin.|神秘主義詩人ルーミーは1273年に没するまでコンヤで教えを説いた。その死を弟子たちはいまも毎年12月、葬儀としてではなく神との「婚礼の夜」シェブ・アルースとして祝い、彼が生んだ旋回舞踊セマーの中でデルヴィーシュたちが回り続ける。街のどこからも見えるトルコ石色の畝入り円錐屋根を戴く彼の廟には、季節を問わず巡礼者が訪れる。",
    [prop("Whirling Sema Hall|Sala de la ceremonia sema|Salle de la cérémonie sema|旋回舞踊セマーの広間", 900, 186),
     prop("Turquoise Shrine Dome Court|Patio de la cúpula turquesa del santuario|Cour du dôme turquoise du mausolée|トルコ石の廟の中庭", 680, 140)],
  ),
  goreme: city(
    "Göreme|Capadocia (Göreme)|Cappadoce (Göreme)|ギョレメ",
    34.83, 38.64, "ica", "balloon", "cappadocia", "l",
    "Whole neighbourhoods once lived entirely underground|Barrios enteros vivían por entero bajo tierra|Des quartiers entiers vivaient jadis sous terre|地下だけで暮らした街区もあった",
    "Cappadocia's soft volcanic rock, tuff, erodes into the cone-shaped \"fairy chimneys\" that dot the valleys and was soft enough for early Christians to carve entire multi-storey cave churches and, further underground, cities like Derinkuyu that sheltered thousands of people and their livestock at once, complete with ventilation shafts and stone doors that rolled shut from inside. Each dawn now brings dozens of hot-air balloons over the same valleys for a view the cave-dwellers never had.|La roca volcánica blanda de Capadocia, la toba, se erosiona en las «chimeneas de hadas» cónicas que salpican los valles, y era lo bastante blanda para que los primeros cristianos excavaran iglesias rupestres de varios pisos y, más abajo, ciudades como Derinkuyu.|La roche volcanique tendre de Cappadoce, le tuf, s'érode en « cheminées de fées » coniques qui parsèment les vallées, et fut assez tendre pour que les premiers chrétiens y creusent des églises troglodytes à plusieurs étages et, plus bas, des villes comme Derinkuyu.|カッパドキアの柔らかい火山性凝灰岩は谷を埋める円錐形の「妖精の煙突」を作るほど浸食されやすく、初期キリスト教徒はこれを掘って何階建てもの洞窟教会を、さらに地下にはデリンクユのような都市を刻んだ。何千人もの人と家畜を一度に匿える換気坑と内側から回して閉める石の扉まで備えていた。いま毎朝この谷の上を無数の熱気球が飛び、かつての洞窟の住人が見なかった景色を見せる。",
    [prop("Fairy Chimney Cave House|Casa cueva de chimenea de hadas|Maison troglodyte à cheminée de fées|妖精の煙突の洞窟住居", 1000, 206),
     prop("Underground City Ventilation Shaft|Pozo de ventilación de la ciudad subterránea|Puits d'aération de la cité souterraine|地下都市の換気坑", 620, 128)],
  ),
  kayseri: city(
    "Kayseri|Kayseri|Kayseri|カイセリ",
    35.49, 38.73, "ica", "volcano", "highland", "r",
    "A dormant volcano that supplied both the black stone and the myth|Un volcán dormido que dio a la vez la piedra negra y el mito|Un volcan endormi qui a fourni à la fois la pierre noire et le mythe|黒い石と伝説の両方を与えた休火山",
    "Mount Erciyes, a dormant volcano over 3,900 metres tall, looms directly over Kayseri and supplied the black basalt used in the city's Seljuk-era citadel and caravanserais; some geographers argue it may be the same peak ancient sources called the birthplace of a mythical Anatolian mother goddess. The city's merchants have a reputation for shrewd trading old enough that \"Kayseri merchant\" is still used nationwide as a byword for someone who never loses a deal.|El monte Erciyes, un volcán dormido de más de 3.900 metros, se alza justo sobre Kayseri y suministró el basalto negro usado en la ciudadela y las caravanserallas selyúcidas de la ciudad.|Le mont Erciyes, volcan endormi de plus de 3 900 mètres, domine directement Kayseri et a fourni le basalte noir utilisé dans la citadelle et les caravansérails seldjoukides de la ville.|標高3900mを超える休火山エルジェス山はカイセリの真上にそびえ、この街のセルジューク朝時代の城塞やキャラバンサライに使われた黒い玄武岩を供給した。古代の文献が伝えるアナトリアの母神信仰発祥の山と同じ山ではないかと見る地理学者もいる。この街の商人は抜け目のなさで知られ、「カイセリの商人」はいまも全国で「取引に決して負けない人」を指す言い回しとして使われる。",
    [prop("Black Basalt Caravanserai Court|Patio de la caravasar de basalto negro|Cour du caravansérail en basalte noir|黒玄武岩のキャラバンサライの中庭", 900, 186),
     prop("Snow-Capped Volcano Overlook|Mirador del volcán nevado|Belvédère du volcan enneigé|雪化粧の火山の展望台", 620, 128)],
  ),
  eskisehir: city(
    "Eskişehir|Eskişehir|Eskişehir|エスキシェヒル",
    30.52, 39.78, "ica", "canal", "steppe", "l",
    "A student city that turned a flood-prone river into a canal of gondolas|Una ciudad universitaria que convirtió un río propenso a inundarse en un canal de góndolas|Une ville étudiante qui a fait d'une rivière sujette aux crues un canal à gondoles|洪水川をゴンドラの運河に変えた学生の街",
    "The Porsuk River used to flood Eskişehir regularly until a long civic project channelled and landscaped it into an Amsterdam-styled canal lined with cafés, complete with flat-bottomed gondola boats for hire. With two large public universities enrolling well over a hundred thousand students in a mid-sized city, Eskişehir has one of the youngest average ages of any Turkish city, and the nightlife runs accordingly late.|El río Porsuk solía inundar Eskişehir con regularidad hasta que un largo proyecto municipal lo canalizó y ajardinó al estilo de Ámsterdam, con cafés a la orilla y góndolas de fondo plano para alquilar.|La rivière Porsuk inondait régulièrement Eskişehir jusqu'à ce qu'un long projet municipal la canalise et l'aménage à la façon d'Amsterdam, bordée de cafés, avec des gondoles à fond plat à louer.|ポルスク川はかつてエスキシェヒルをたびたび洪水に見舞っていたが、長年の都市整備事業でアムステルダム風に水路化・整備され、カフェが立ち並び平底のゴンドラを借りられるようになった。中規模の街に二つの大規模国立大学が十万人を超える学生を抱え、エスキシェヒルはトルコの都市の中でも平均年齢が特に若く、夜の街はそれに応じて遅くまで賑わう。",
    [prop("Canal Gondola Landing|Embarcadero de góndolas del canal|Débarcadère des gondoles du canal|運河ゴンドラの船着場", 680, 140),
     prop("University Quarter Café Row|Hilera de cafés del barrio universitario|Rangée de cafés du quartier universitaire|大学街のカフェ通り", 420, 86)],
  ),
  sivas: city(
    "Sivas|Sivas|Sivas|シワス",
    37.02, 39.75, "ica", "medrese", "steppe", "r",
    "Twin minarets that survived a congress deciding a nation's future|Alminares gemelos que sobrevivieron a un congreso que decidió el futuro de una nación|Des minarets jumeaux qui ont survécu à un congrès décidant de l'avenir d'une nation|一国の行方を決めた大会を見守った双子の尖塔",
    "The Çifte Minareli Medrese, a Seljuk theological school from 1271, is known for its ornately carved stone portal flanked by two brick minarets, one of the finest surviving examples of Seljuk architecture in Anatolia. In September 1919, delegates met in Sivas's high school building for a congress that laid out the political framework for the independence movement, a meeting now marked as a founding moment of the republic.|La Medrese de los Dos Minaretes, escuela teológica selyúcida de 1271, es célebre por su portal de piedra tallada flanqueado por dos minaretes de ladrillo, uno de los mejores ejemplos de arquitectura selyúcida de Anatolia.|La Çifte Minareli Medrese, école théologique seldjoukide de 1271, est réputée pour son portail de pierre finement sculpté flanqué de deux minarets de brique, l'un des plus beaux exemples d'architecture seldjoukide d'Anatolie.|1271年建立のセルジューク朝の神学校チフテ・ミナーレリ・メドレセは、精緻な彫刻を施した石の門を煉瓦造りの双子の尖塔が挟む姿で知られ、アナトリアに残るセルジューク建築の最高峰の一つとされる。1919年9月、この街の高校の建物にはデレゲートたちが集まり、独立運動の政治的な枠組みを定めた会議が開かれた。いまは共和国建国の礎の一つとして記念されている。",
    [prop("Twin Minaret Portal Court|Patio del portal de los minaretes gemelos|Cour du portail aux minarets jumeaux|双子の尖塔の門の中庭", 780, 160),
     prop("Congress Hall Assembly Room|Sala de asambleas del congreso|Salle d'assemblée du congrès|大会議事堂の会議室", 560, 116)],
  ),
  aksaray: city(
    "Aksaray|Aksaray|Aksaray|アクサライ",
    34.03, 38.37, "ica", "balloon", "cappadocia", "l",
    "A canyon of churches carved below the ground people walked on|Un cañón de iglesias excavado bajo el suelo que la gente pisaba|Un canyon d'églises creusées sous le sol que les gens foulaient|人が歩く地面の下に彫られた教会の峡谷",
    "The Ihlara Valley is a roughly 14 km volcanic gorge cut by a stream running below the plateau's surface, its cliff walls honeycombed with more than a hundred Byzantine-era rock churches whose frescoes survived centuries partly because the entrances were too narrow or hidden for casual looters to bother with. Salt Lake, Turkey's second largest, spreads across the flat land nearby and turns pale pink some summers as it dries into a crust thick enough to drive trucks across.|El valle de Ihlara es un cañón volcánico de unos 14 km excavado por un arroyo que corre bajo la superficie de la meseta, con paredes horadadas por más de cien iglesias rupestres bizantinas.|La vallée d'Ihlara est un canyon volcanique d'environ 14 km creusé par un cours d'eau coulant sous la surface du plateau, aux parois truffées de plus de cent églises rupestres byzantines.|イフララ渓谷は高原の地表の下を流れる小川が刻んだ全長約14kmの火山峡谷で、崖には百を超えるビザンツ時代の岩窟教会が蜂の巣状に穿たれている。入口が狭く見つけにくかったこともあって、フレスコ画は何世紀も盗掘を免れて残った。近くに広がるトゥズ湖はトルコで二番目に大きい湖で、夏には乾いて薄紅色の分厚い塩の殻となり、トラックが上を走れるほどになる。",
    [prop("Rock Church Fresco Nave|Nave de frescos de la iglesia rupestre|Nef aux fresques de l'église rupestre|岩窟教会のフレスコ画の身廊", 620, 128),
     prop("Salt Lake Crust Overlook|Mirador de la costra del lago salado|Belvédère de la croûte du lac salé|塩湖の塩殻の展望台", 420, 86)],
  ),

  // ---------------------------------------------------------------------
  // kar — 黒海
  // ---------------------------------------------------------------------
  trabzon: city(
    "Trabzon|Trebisonda (Trabzon)|Trébizonde (Trabzon)|トラブゾン",
    39.72, 41.00, "kar", "port", "port", "l",
    "An empire's last splinter held on here for eight more years|La última esquirla de un imperio resistió aquí ocho años más|Le dernier éclat d'un empire y tint bon huit années de plus|帝国最後のかけらが8年長く持ちこたえた地",
    "After Constantinople fell to the Fourth Crusade in 1204, a branch of the Byzantine imperial family set up the independent Empire of Trebizond here, and it outlasted a restored Constantinople itself, only falling to the Ottomans in 1461, eight years after the capital. A steep mountain road above the city climbs to the Sümela Monastery, built directly into a cliff face some 300 metres above the valley floor.|Tras la caída de Constantinopla ante la Cuarta Cruzada en 1204, una rama de la familia imperial bizantina fundó aquí el Imperio independiente de Trebisonda, que sobrevivió incluso a una Constantinopla restaurada.|Après la chute de Constantinople lors de la quatrième croisade en 1204, une branche de la famille impériale byzantine y fonda l'Empire indépendant de Trébizonde, qui survécut même à une Constantinople restaurée.|1204年の第四回十字軍でコンスタンティノープルが陥落したのち、ビザンツ皇族の一派はここに独立したトレビゾンド帝国を築き、再興されたコンスタンティノープルよりも長く持ちこたえて、都の陥落から8年遅れの1461年にようやくオスマン帝国に屈した。街を見下ろす険しい山道を登ると、谷底からおよそ300m上の崖に直接建てられたスュメラ修道院にたどり着く。",
    [prop("Cliffside Monastery Stair|Escalera del monasterio del acantilado|Escalier du monastère de la falaise|崖の修道院の階段", 900, 186),
     prop("Harbourfront Tea House|Casa de té del puerto|Maison de thé du front de mer|港のお茶屋", 460, 96)],
  ),
  rize: city(
    "Rize|Rize|Rize|リゼ",
    40.52, 41.02, "kar", "tea", "teahills", "r",
    "A crop the empire once forbade became a hillside covered in it|Un cultivo antes prohibido por el imperio acabó cubriendo toda la ladera|Une culture jadis interdite par l'empire a fini par couvrir tout le coteau|帝国がかつて禁じた作物が、いまは山肌を埋め尽くす",
    "Tea only took hold in Rize in the 1940s after decades of failed attempts with other cash crops on the region's steep, rain-soaked slopes, and cultivation spread so fast that the country now grows nearly all the tea it drinks itself, almost none imported. Pickers, still mostly working by hand on terraces too steep for machinery, can be paid by the kilo during the spring and summer flush.|El té solo arraigó en Rize en los años cuarenta, tras décadas de intentos fallidos con otros cultivos comerciales en las laderas empinadas y lluviosas de la región, y su cultivo se extendió tan rápido que el país hoy cultiva casi todo el té que consume.|Le thé ne prit racine à Rize que dans les années 1940, après des décennies d'essais infructueux avec d'autres cultures commerciales sur les pentes abruptes et pluvieuses de la région, et sa culture se répandit si vite que le pays produit aujourd'hui presque tout le thé qu'il consomme.|茶がリゼに根付いたのは1940年代になってからで、雨に濡れた急斜面でそれまで何十年も他の換金作物が失敗し続けた末のことだった。栽培はまたたく間に広がり、いまではこの国が飲む茶のほとんどを自給できるまでになった。機械の入らない急な段々畑では、いまも大半が手摘みで、春から夏の最盛期には摘んだ重さで賃金が払われる。",
    [prop("Terraced Tea Bush Row|Hilera de arbustos de té en terraza|Rangée de théiers en terrasse|段々畑の茶の木の列", 480, 100),
     prop("Hillside Tea House Balcony|Balcón de la casa de té en la ladera|Balcon de la maison de thé du coteau|山腹の茶屋のバルコニー", 340, 70)],
  ),
  amasya: city(
    "Amasya|Amasya|Amasya|アマスィヤ",
    35.83, 40.65, "kar", "rocktomb", "oldtown", "l",
    "Kings carved their tombs into the cliff above their own city|Los reyes tallaron sus tumbas en el acantilado sobre su propia ciudad|Des rois taillèrent leurs tombeaux dans la falaise dominant leur propre cité|王たちが自らの都を見下ろす崖に彫った墓",
    "The kings of ancient Pontus carved monumental rock tombs directly into the cliff face towering over Amasya, lit up at night so they watch over the Ottoman-era timber houses lining the river below them. One of those wooden houses raised a young prince named Suleiman, later called the Magnificent, who governed the province here before inheriting the empire.|Los reyes del antiguo Ponto tallaron monumentales tumbas rupestres directamente en el acantilado que domina Amasya, iluminadas de noche para que velen sobre las casas de madera otomanas junto al río.|Les rois de l'antique Pont taillèrent de monumentales tombes rupestres à même la falaise dominant Amasya, éclairées la nuit pour qu'elles veillent sur les maisons de bois ottomanes bordant la rivière en contrebas.|古代ポントス王国の王たちは、アマスィヤを見下ろす崖に直接、壮大な岩窟墓を彫らせた。夜にはライトアップされ、下を流れる川沿いに並ぶオスマン時代の木造家屋を見守るように立つ。その木造家屋の一軒では、のちに壮麗王と呼ばれることになる若き王子スレイマンが育ち、帝国を継ぐ前にこの地の州総督を務めた。",
    [prop("Cliffside Royal Tomb Terrace|Terraza de las tumbas reales del acantilado|Terrasse des tombeaux royaux de la falaise|崖の王墓のテラス", 680, 140),
     prop("Riverside Timber House Row|Hilera de casas de madera junto al río|Rangée de maisons de bois au bord de la rivière|川沿いの木造家屋の並び", 460, 96)],
  ),
  safranbolu: city(
    "Safranbolu|Safranbolu|Safranbolu|サフランボル",
    32.69, 41.25, "kar", "timberhouse", "oldtown", "r",
    "A caravan-route town preserved because trade simply moved elsewhere|Una ciudad de la ruta de caravanas conservada porque el comercio se mudó a otra parte|Une ville sur la route des caravanes préservée parce que le commerce s'est déplacé ailleurs|交易がよそへ移ったおかげで残った隊商町",
    "Safranbolu grew wealthy as a caravan stop on the trade route linking the Black Sea coast to the interior, and its merchants built timber-framed houses with jutting upper floors, indoor plumbing and built-in cupboards centuries ahead of most of the region. A new highway route bypassed the town in the twentieth century, and the resulting stagnation is exactly what left over a thousand of these houses standing largely untouched, now a UNESCO World Heritage town.|Safranbolu se enriqueció como parada de caravanas en la ruta comercial entre la costa del mar Negro y el interior, y sus mercaderes construyeron casas de entramado de madera con pisos superiores volados.|Safranbolu s'enrichit comme halte de caravanes sur la route commerciale reliant la côte de la mer Noire à l'intérieur des terres, et ses marchands bâtirent des maisons à pans de bois aux étages en encorbellement.|サフランボルは黒海沿岸と内陸を結ぶ交易路の隊商宿場町として栄え、商人たちは上階が張り出した木骨造りの家に、周辺地域よりも何世紀も先んじて屋内配管や作り付けの戸棚まで備えた。20世紀に新しい幹線道路が街を迂回したことで交易は途絶えたが、その停滞のおかげで千棟を超えるこうした家屋がほぼ手つかずのまま残り、いまはユネスコ世界遺産の町になっている。",
    [prop("Timber-Framed Merchant House|Casa de mercader de entramado de madera|Maison de marchand à pans de bois|木骨造りの商家", 620, 128),
     prop("Caravan Stop Courtyard Inn|Posada del patio de la parada de caravanas|Auberge de la cour de l'étape des caravanes|隊商宿の中庭", 420, 86)],
  ),
  sinop: city(
    "Sinop|Sinope (Sinop)|Sinope (Sinop)|シノプ",
    35.15, 42.02, "kar", "lighthouse", "port", "l",
    "A philosopher who lived in a barrel called this peninsula home|Un filósofo que vivía en un tonel llamaba hogar a esta península|Un philosophe vivant dans une jarre appelait cette péninsule sa terre natale|甕暮らしの哲学者が故郷と呼んだ半島",
    "Sinop sits on a peninsula that is the northernmost point of the Anatolian mainland, and it was the birthplace of Diogenes, the philosopher who is said to have lived in a large ceramic jar and carried a lamp in daylight looking for an honest man. The rocky isthmus made the town a natural fortress and harbour for over two thousand years, and its lighthouse still marks the point where the coastline turns south on both sides.|Sinop se asienta en una península que es el punto más septentrional de la Anatolia continental, y fue la cuna de Diógenes, el filósofo que se dice vivía en una gran tinaja de cerámica.|Sinop se dresse sur une péninsule qui est le point le plus septentrional de l'Anatolie continentale, et fut le berceau de Diogène, le philosophe qui, dit-on, vivait dans une grande jarre de céramique.|シノプはアナトリア本土最北端にあたる半島の上にあり、大きな素焼きの甕に住み、真昼にランプを灯して正直者を探し歩いたと伝わる哲学者ディオゲネスの生まれ故郷である。岩がちな地峡はこの街を二千年以上にわたり天然の要塞と港にしてきた。灯台はいまも、両側で海岸線が南へ折れ曲がる地点に立ち続けている。",
    [prop("Peninsula Lighthouse Point|Punta del faro de la península|Pointe du phare de la péninsule|半島の灯台の岬", 460, 96),
     prop("Old Fortress Harbour Wall|Muralla del puerto de la vieja fortaleza|Mur du port de l'ancienne forteresse|旧要塞の港壁", 340, 70)],
  ),
  samsun: city(
    "Samsun|Samsun|Samsun|サムスン",
    36.33, 41.29, "kar", "monument", "port", "r",
    "A single boat landing is now marked as a nation's starting point|Un solo desembarco se marca hoy como el punto de partida de una nación|Un seul débarquement y marque aujourd'hui le point de départ d'une nation|一度の上陸がいま、国の出発点として刻まれている",
    "Mustafa Kemal, later Atatürk, landed at Samsun on 19 May 1919 to organise resistance after the empire's defeat in the First World War, a date now marked nationwide as a youth and sports holiday and treated as the symbolic start of the independence movement. The city's flat Black Sea coastline made it a major tobacco-exporting port under the last Ottoman decades, before the crop's decline shifted the economy toward general shipping.|Mustafa Kemal, luego Atatürk, desembarcó en Samsun el 19 de mayo de 1919 para organizar la resistencia tras la derrota del imperio en la Primera Guerra Mundial, fecha hoy marcada en todo el país como fiesta de la juventud y el deporte.|Mustafa Kemal, plus tard Atatürk, débarqua à Samsun le 19 mai 1919 pour organiser la résistance après la défaite de l'empire lors de la Première Guerre mondiale, date aujourd'hui marquée dans tout le pays comme fête de la jeunesse et du sport.|ムスタファ・ケマル、のちのアタテュルクは1919年5月19日、第一次世界大戦での帝国の敗北ののち抵抗運動を組織するためサムスンに上陸した。この日付はいま全国で「若者とスポーツの日」として祝われ、独立運動の象徴的な出発点とされている。黒海沿いの平坦な地形は、オスマン帝国末期この街を一大タバコ輸出港にしたが、のちに作物の衰退とともに経済は一般貨物輸送へと移っていった。",
    [prop("Landing Monument Waterfront|Paseo marítimo del monumento al desembarco|Front de mer du monument au débarquement|上陸記念碑の海岸通り", 780, 160),
     prop("Tobacco Warehouse Quay|Muelle del almacén de tabaco|Quai de l'entrepôt à tabac|タバコ倉庫の埠頭", 420, 86)],
  ),

  // ---------------------------------------------------------------------
  // dogu — 東部・南東部
  // ---------------------------------------------------------------------
  van: city(
    "Van|Van|Van|ヴァン",
    43.38, 38.49, "dogu", "lake", "lakeside", "r",
    "A soda lake too alkaline for fish, but not for one swimming cat|Un lago sódico demasiado alcalino para peces, pero no para un gato nadador|Un lac sodique trop alcalin pour les poissons, mais pas pour un chat nageur|魚には強すぎる塩湖、でも泳ぐ猫には平気",
    "Lake Van, the country's largest, is so alkaline that almost no fish survive in it except one small species adapted to the water, yet locals still swim in it for the mineral-rich softness the lake water is said to leave on skin. The white-furred Van cat, prized for eyes of two different colours and a rare willingness among cats to swim, is bred and protected at a research centre in the city that shares its name.|El lago Van, el mayor del país, es tan alcalino que casi ningún pez sobrevive en él salvo una pequeña especie adaptada al agua, y aun así la gente del lugar se baña en él por la suavidad rica en minerales.|Le lac Van, le plus grand du pays, est si alcalin que presque aucun poisson n'y survit, hormis une petite espèce adaptée à cette eau, et pourtant les habitants s'y baignent encore pour la douceur minérale qu'elle laisserait sur la peau.|国内最大のヴァン湖はアルカリ性が強すぎて、この水に適応した一種の小魚を除きほとんど魚が棲めないが、地元の人はミネラル分の豊かさが肌をなめらかにすると言っていまも泳ぎに入る。左右で色の違う瞳と、猫には珍しい泳ぎ好きで知られる白い毛のヴァン猫は、街と同じ名を持つ研究センターで大切に育てられ保護されている。",
    [prop("Lakeshore Swimming Cove|Cala de baño junto al lago|Crique de baignade du lac|湖畔の遊泳の入り江", 620, 128),
     prop("Van Cat Research Centre|Centro de investigación del gato de Van|Centre de recherche du chat de Van|ヴァン猫研究センター", 460, 96)],
  ),
  kars: city(
    "Kars|Kars|Kars|カルス",
    43.10, 40.60, "dogu", "ruins", "ruins", "l",
    "A city of a thousand and one churches, now mostly wind and stone|Una ciudad de mil y una iglesias, hoy sobre todo viento y piedra|Une ville aux mille et une églises, aujourd'hui surtout du vent et de la pierre|千一の教会の街、いまは風と石ばかり",
    "Ani, a ruined medieval Armenian capital on a plateau just outside Kars, was once famed as \"the city of a thousand and one churches\" with a population rivalling Constantinople's before Mongol raids and a shifting trade route emptied it by the 1300s. Kars itself sits high and cold enough that its cheese-making and honey traditions lean on a short, intense growing season, and the city gave its name to the Russian roulette-style card game invented by bored soldiers stationed at its border garrison.|Ani, una capital armenia medieval en ruinas en una meseta a las afueras de Kars, fue en su día célebre como «la ciudad de las mil y una iglesias», con una población que rivalizaba con la de Constantinopla.|Ani, capitale arménienne médiévale en ruines sur un plateau aux portes de Kars, fut jadis célèbre comme « la ville aux mille et une églises », avec une population rivalisant celle de Constantinople.|カルス郊外の高原に広がる中世アルメニアの都アニの廃墟は、かつて「千一の教会の街」として知られ、コンスタンティノープルに匹敵する人口を誇ったが、モンゴルの侵攻と交易路の変化で1300年代までに人が絶えた。カルス自体も標高が高く寒さの厳しい土地で、チーズ作りと養蜂は短く濃密な生育期に頼っている。街の名は、国境の駐屯地で退屈した兵士たちが考案したトランプゲーム「カルス」の由来にもなった。",
    [prop("Ani Ruins Church Overlook|Mirador de las iglesias en ruinas de Ani|Belvédère des églises en ruine d'Ani|アニ遺跡の教会の展望台", 560, 116),
     prop("Border Garrison Cheese Cellar|Bodega de queso de la guarnición fronteriza|Cave à fromage de la garnison frontalière|国境駐屯地のチーズ貯蔵庫", 380, 78)],
  ),
  dogubayazit: city(
    "Doğubayazıt|Doğubayazıt|Doğubayazıt|ドゥバヤズット",
    44.09, 39.55, "dogu", "volcano", "highland", "l", // 盤面の右端に近いため左向き(右向きだと末尾が切れる)
    "A palace built in the shadow of the country's tallest peak|Un palacio construido a la sombra del pico más alto del país|Un palais bâti à l'ombre du plus haut sommet du pays|国内最高峰の影に建つ宮殿",
    "Mount Ararat, at 5,137 metres the country's highest peak and traditionally identified as the resting place of Noah's Ark, rises directly behind the town, snow-capped even in summer. The İshak Paşa Palace, an 18th-century fortress-palace blending Ottoman, Persian, Armenian and Georgian styles on a ridge above the town, took three generations of one family roughly a century to finish.|El monte Ararat, con 5.137 metros el pico más alto del país y tradicionalmente identificado como el lugar de descanso del arca de Noé, se alza justo detrás del pueblo, nevado incluso en verano.|Le mont Ararat, avec ses 5 137 mètres le plus haut sommet du pays et traditionnellement identifié comme le lieu de repos de l'arche de Noé, s'élève juste derrière la ville, enneigé même en été.|標高5137m、国内最高峰であり伝統的にノアの箱舟が漂着した地とされるアララト山が、夏でも雪を戴いたまま町のすぐ背後にそびえる。町を見下ろす尾根に立つイシャク・パシャ宮殿は18世紀築の要塞兼宮殿で、オスマン・ペルシャ・アルメニア・グルジアの様式を混ぜ合わせ、一族三代がおよそ百年かけて完成させた。",
    [prop("İshak Paşa Palace Courtyard|Patio del Palacio de İshak Paşa|Cour du palais d'İshak Paşa|イシャク・パシャ宮殿の中庭", 680, 140),
     prop("Ararat Base Camp Trailhead|Inicio de sendero del campo base del Ararat|Départ de sentier du camp de base de l'Ararat|アララト山ベースキャンプの登山口", 420, 86)],
  ),
  gaziantep: city(
    "Gaziantep|Gaziantep|Gaziantep|ガズィアンテプ",
    37.38, 37.07, "dogu", "bazaar", "bazaar", "l",
    "A city that measures its honour in syrup and pistachio, not gold|Una ciudad que mide su honor en almíbar y pistacho, no en oro|Une ville qui mesure son honneur en sirop et en pistache, pas en or|誇りを金ではなくシロップとピスタチオで測る街",
    "Gaziantep's baklava makers still judge a batch partly by whether the syrup, poured cold over a hot pastry, produces the right crackling sound, a craft protected as a geographical indication tied to the region's pistachio groves. The city earned the honorific \"Gazi\" (veteran) added to its name after residents held off French-led forces during a 1920–21 siege in the war of independence, a resistance still marked every December.|Los reposteros de baklava de Gaziantep aún juzgan una tanda en parte por si el almíbar, vertido frío sobre la masa caliente, produce el crujido correcto, un oficio protegido como indicación geográfica ligada a los pistachos de la región.|Les pâtissiers de baklava de Gaziantep jugent encore une fournée en partie au crépitement que doit produire le sirop froid versé sur la pâte chaude, un savoir-faire protégé comme indication géographique liée aux pistacheraies de la région.|ガズィアンテプのバクラヴァ職人は、熱い生地に冷たいシロップをかけたときに正しいパチパチという音がするかで出来を判じる。この技法は地域のピスタチオ園と結びついた地理的表示として保護されている。街の名に付く「ガズィ(勇士)」の称号は、独立戦争中の1920〜21年の包囲戦でフランス主導の軍を市民が退けたことに由来し、その抵抗はいまも毎年12月に記念される。",
    [prop("Baklava Syrup Kitchen|Cocina del almíbar de baklava|Cuisine du sirop à baklava|バクラヴァのシロップ厨房", 560, 116),
     prop("Covered Bazaar Copper Row|Hilera del cobre del bazar cubierto|Rangée de cuivre du bazar couvert|屋根付き市場の銅細工通り", 380, 78)],
  ),
  sanliurfa: city(
    "Şanlıurfa|Şanlıurfa|Şanlıurfa|シャンルウルファ",
    38.80, 37.16, "dogu", "beehive", "bazaar", "r",
    "Sacred carp that no one has fished in living memory|Carpas sagradas que nadie ha pescado en la memoria viva|Des carpes sacrées que nul n'a péchées de mémoire d'homme|誰も釣ったことのない聖なる鯉",
    "A pool at the centre of the old city, Balıklıgöl, holds hundreds of carp considered sacred, tied to a legend that Abraham was thrown onto a pyre by a hostile king and God turned the flames to water and the coals to fish; catching one is said to bring blindness. On the desert plain outside town, Göbekli Tepe's carved stone pillars, raised roughly 11,000 years ago by hunter-gatherers with no known writing or agriculture yet, are among the oldest monumental structures found anywhere.|Un estanque en el centro del casco antiguo, Balıklıgöl, alberga cientos de carpas consideradas sagradas, ligadas a una leyenda según la cual Abraham fue arrojado a una pira por un rey hostil y Dios convirtió las llamas en agua y las brasas en peces.|Un bassin au centre de la vieille ville, Balıklıgöl, abrite des centaines de carpes tenues pour sacrées, liées à une légende selon laquelle Abraham fut jeté sur un bûcher par un roi hostile et Dieu changea les flammes en eau et les braises en poissons.|旧市街の中心にあるバルクルギョル(魚の池)には数百匹の聖なる鯉が飼われている。敵対する王に火刑に処されそうになったアブラハムを、神が炎を水に、炭を魚に変えて救ったという伝説にちなむもので、この魚を捕ると失明すると言われる。町外れの荒野に立つギョベクリ・テペの彫刻を施した石柱群は、文字も農耕もまだ知らなかった狩猟採集民がおよそ1万1000年前に築いたもので、世界でも最古級の巨石建造物とされる。",
    [prop("Sacred Carp Pool Terrace|Terraza del estanque de las carpas sagradas|Terrasse du bassin aux carpes sacrées|聖なる鯉の池のテラス", 620, 128),
     prop("Carved Stone Pillar Field|Campo de pilares de piedra tallada|Champ des piliers de pierre taillée|彫刻石柱の遺跡", 480, 100)],
  ),
  mardin: city(
    "Mardin|Mardin|Mardin|マルディン",
    40.72, 37.31, "dogu", "stonecity", "oldtown", "l",
    "A honey-stone city built in tiers so every roof is someone's street|Una ciudad de piedra color miel escalonada, donde cada tejado es la calle de otro|Une ville de pierre couleur miel étagée, où chaque toit est la rue d'un voisin|屋根がそのまま誰かの通りになる、蜂蜜色の石の段々町",
    "Mardin's old town climbs a steep hillside in stacked terraces carved from a local honey-coloured limestone, built so densely that the flat roof of one house often serves as the street or courtyard of the house above it. Its position overlooking the Mesopotamian plain made it a meeting point of Arabic, Kurdish, Syriac and Turkish speech and, further down, of monasteries some of which have practised Syriac Christian liturgy continuously since the fourth century.|El casco antiguo de Mardin trepa por una ladera empinada en terrazas apiladas, talladas en una caliza local color miel, construidas con tanta densidad que el tejado plano de una casa suele servir de calle o patio de la de arriba.|La vieille ville de Mardin grimpe sur un coteau abrupt en terrasses superposées, taillées dans un calcaire local couleur miel, bâties si densément que le toit plat d'une maison sert souvent de rue ou de cour à celle du dessus.|マルディンの旧市街は、地元産の蜂蜜色の石灰岩を刻んだ階段状のテラスとなって急な丘を登っていく。ある家の平らな屋根がそのまま上の家の通りや中庭になるほど密に建て込んでいる。メソポタミア平原を見下ろすこの立地は、アラビア語・クルド語・シリア語・トルコ語が交わる場所にし、さらに山を下った先にはシリア正教の典礼を4世紀から絶やさず続ける修道院もある。",
    [prop("Terraced Rooftop Passage|Pasaje de tejados en terraza|Passage des toits en terrasse|段々屋根の通り道", 620, 128),
     prop("Honey-Stone Courtyard House|Casa de patio de piedra color miel|Maison à cour en pierre couleur miel|蜂蜜色の石の中庭の家", 460, 96)],
  ),
  diyarbakir: city(
    "Diyarbakır|Diyarbakır|Diyarbakır|ディヤルバクル",
    40.22, 37.91, "dogu", "walls", "oldtown", "r",
    "Black basalt walls long enough to circle the old city twice over|Murallas de basalto negro tan largas que rodearían el casco antiguo dos veces|Des murailles de basalte noir assez longues pour ceindre deux fois la vieille ville|旧市街を二周できるほど長い黒玄武岩の城壁",
    "Diyarbakır's city walls, built of dark volcanic basalt and running nearly 6 km around the old town, are among the longest fortified walls anywhere still standing, second in length only to the Great Wall of China by some counts. The Tigris River curls below the walls through a wide green floodplain known as the Ten-Eyed Bridge district, named for the arches of a Seljuk-era stone bridge that still spans it.|Las murallas de Diyarbakır, hechas de basalto volcánico oscuro y de casi 6 km de perímetro alrededor del casco antiguo, están entre las fortificaciones más largas aún en pie de cualquier lugar.|Les remparts de Diyarbakır, faits de basalte volcanique sombre et longs de près de 6 km autour de la vieille ville, comptent parmi les plus longues fortifications encore debout au monde.|ディヤルバクルの城壁は黒い火山性玄武岩でできており、旧市街をほぼ6kmにわたって取り囲む。現存する要塞壁としては世界でも指折りの長さで、数え方によっては万里の長城に次ぐ長さとされる。城壁の下ではティグリス川が広い緑の氾濫原を蛇行し、いまも架かるセルジューク朝時代の石橋のアーチにちなんで「十の目の橋」地区と呼ばれている。",
    [prop("Basalt Rampart Walk|Paseo de la muralla de basalto|Promenade du rempart de basalte|玄武岩城壁の遊歩道", 680, 140),
     prop("Ten-Eyed Bridge Riverbank|Ribera del Puente de los Diez Ojos|Berge du pont aux Dix Yeux|十の目の橋の川岸", 420, 86)],
  ),
  nemrut: city(
    "Mount Nemrut|Monte Nemrut|Mont Nemrud|ネムルト山",
    38.74, 37.98, "dogu", "statueheads", "nemrut", "l",
    "A king built himself a tomb topped with giant stone company|Un rey se construyó una tumba coronada por gigantescos compañeros de piedra|Un roi se bâtit un tombeau couronné de géants compagnons de pierre|王が自らに築いた、巨石の連れを戴く墓",
    "King Antiochus I of Commagene raised a 50-metre burial mound on this 2,150-metre summit around 62 BC, flanked by colossal stone heads, once attached to full seated statues, of himself alongside Greek and Persian gods he claimed as ancestors, a claim to divine descent carved rather than merely spoken. Earthquakes toppled the statues' heads from their bodies centuries ago, and visitors now climb before dawn to watch sunrise light cross the row of faces on the eastern terrace.|El rey Antíoco I de Comagene levantó un túmulo funerario de 50 metros en esta cima de 2.150 metros hacia el año 62 a.C., flanqueado por colosales cabezas de piedra, antaño unidas a estatuas sedentes completas.|Le roi Antiochos Ier de Commagène éleva un tumulus funéraire de 50 mètres sur ce sommet de 2 150 mètres vers 62 av. J.-C., flanqué de colossales têtes de pierre, jadis fixées à des statues assises complètes.|コンマゲネ王アンティオコス1世は紀元前62年ごろ、標高2150mのこの山頂に高さ50mの墳丘を築き、かつては完全な座像の一部だった巨大な石の頭部を左右に並べた。自身と、祖先だと称したギリシャ・ペルシャの神々を刻み、神の血統を言葉ではなく石に刻んで示した。像の頭部は何世紀も前の地震で胴体から落ちており、いまは夜明け前に登った旅行者が、東のテラスに並ぶ顔に朝日が渡っていくのを眺める。",
    [prop("Colossal Head Terrace|Terraza de las cabezas colosales|Terrasse des têtes colossales|巨石頭部のテラス", 720, 148),
     prop("Sunrise Summit Trail|Sendero de la cumbre al amanecer|Sentier du sommet à l'aube|山頂への日の出の登山道", 420, 86)],
  ),
  erzurum: city(
    "Erzurum|Erzurum|Erzurum|エルズルム",
    41.28, 39.90, "dogu", "ski", "highland", "r",
    "A citadel city so cold it built its trade around waiting out winter|Una ciudad-ciudadela tan fría que organizó su comercio en torno a esperar el invierno|Une ville-citadelle si froide qu'elle a bâti son commerce autour de l'attente de l'hiver|冬をやり過ごすことを中心に商いを築いた、寒さ厳しい城塞都市",
    "At around 1,900 metres, Erzurum has some of the coldest recorded winter temperatures of any Turkish city, and its Seljuk-era twin-minaret theological school, the Çifte Minareli Medrese, still stands work of the same era that produced its citadel and caravanserais built to shelter Silk Road traders through the snow. Palandöken, the mountain just south of the city, has become one of the country's largest ski resorts, drawing on exactly the deep, reliable snowpack that once slowed the caravans.|A unos 1.900 metros, Erzurum tiene algunas de las temperaturas invernales más bajas registradas en cualquier ciudad turca, y su escuela teológica selyúcida de minaretes gemelos, la Çifte Minareli Medrese, sigue en pie.|À environ 1 900 mètres, Erzurum affiche certaines des températures hivernales les plus basses jamais enregistrées parmi les villes turques, et son école théologique seldjoukide à minarets jumeaux, la Çifte Minareli Medrese, se dresse toujours.|標高およそ1900mのエルズルムは、トルコの都市の中でも記録的な厳寒を誇り、セルジューク朝時代の双子尖塔の神学校チフテ・ミナーレリ・メドレセは、雪の中をシルクロードの商人が身を寄せた城塞やキャラバンサライと同じ時代の遺構としていまも立つ。街のすぐ南にそびえるパランドケン山は、かつて隊商の足を止めたのと同じ豊富で確かな積雪を活かし、国内屈指のスキーリゾートに育っている。",
    [prop("Twin Minaret Theological School|Escuela teológica de los minaretes gemelos|École théologique aux minarets jumeaux|双子尖塔の神学校", 620, 128),
     prop("Palandöken Ski Lift Base|Base del telesilla de Palandöken|Base du télésiège de Palandöken|パランドケン・スキーリフト乗り場", 480, 100)],
  ),
};

/**
 * 路線(55本)。YHT(高速鉄道)の実在の筋 — アンカラ〜エスキシェヒル〜
 * イスタンブール、アンカラ〜コンヤ、アンカラ〜シワス(2023年開業) — と、
 * 東方急行(ドウ・エクスプレス)の実在の経路 — シワス〜エルズィンジャン〜
 * エルズルム〜カルス — を骨にする。それ以外は幹線道路の相当区間で結び、
 * 地方をまたぐ移動の選択肢を増やしている。
 * イスタンブール〜ブルサはマルマラ海を回る陸路の代わりによく使われる
 * 実在の高速船便なので航路("sea")にしてある。
 *
 * `node scripts/check-sea-routes.mjs turkey -v` で計測し、60px超だった9本は
 * 端の入れ替え・陸路/航路の変更で直した(値は各行のコメントに実測を残す)。
 * イスタンブール〜イズミットは海に7px出るが直さない。マルマライが実際に
 * ボスポラス海峡の海底を通る区間なので、地図のほうが正しい
 * (青函トンネルと同じ扱いとして check-sea-routes.mjs の KEPT に登録済み)。
 */
export const TURKEY_EDGES = [
  // --- mar マルマラ ---
  ["istanbul", "izmit"],
  ["izmit", "iznik"],
  ["iznik", "bursa"],
  ["bursa", "canakkale"],
  ["tekirdag", "istanbul", "sea"], // 陸路→航路・端を入れ替え。海に出ていた陸102px→陸0px
  ["tekirdag", "edirne"],
  ["edirne", "istanbul"], // 端を入れ替え。海に出ていた104px→7px。実在の鉄道(ハルカル〜カプクレ線)なので航路にはしない
  ["istanbul", "bursa", "sea"],
  // --- ege エーゲ ---
  ["izmir", "manisa"],
  ["cesme", "izmir", "sea"], // 陸路→航路・端を入れ替え。海に出ていた陸75px→陸54px
  ["izmir", "selcuk"],
  ["selcuk", "bodrum"],
  ["selcuk", "pamukkale"],
  ["ayvalik", "manisa"], // 端を入れ替え。海に出ていた51px→0px
  // --- mar-ege をまたぐ ---
  ["ayvalik", "canakkale"], // 端を入れ替え。海に出ていた26px→17px
  // --- akd 地中海 ---
  ["antalya", "fethiye"],
  ["fethiye", "kas"],
  ["alanya", "antalya"], // 端を入れ替え。海に出ていた189px→0px
  ["alanya", "mersin"],
  ["mersin", "adana"],
  ["antakya", "adana"], // 端を入れ替え。海に出ていた88px→48px
  // --- ege-akd をまたぐ ---
  ["pamukkale", "fethiye"],
  ["bodrum", "fethiye"], // 航路→陸路に変更。航路だと陸265px、陸路なら海38px
  // --- ica 中央アナトリア(YHT: アンカラ〜エスキシェヒル・アンカラ〜コンヤ・アンカラ〜シワス) ---
  ["ankara", "eskisehir"],
  ["ankara", "konya"],
  ["konya", "aksaray"],
  ["aksaray", "goreme"],
  ["goreme", "kayseri"],
  ["kayseri", "sivas"],
  ["sivas", "ankara"],
  // --- mar-ica をまたぐ(YHT: エスキシェヒル〜イスタンブール) ---
  // イズミット湾を横切って海96pxに出るため、既存のistanbul-izmit経由にする
  // (直結には check-sea-routes.mjs 上で60px未満の候補が無かった)
  ["eskisehir", "izmit"],
  // --- ica-akd をまたぐ ---
  ["konya", "antalya"],
  ["aksaray", "adana"],
  // --- kar 黒海 ---
  ["trabzon", "rize"],
  ["samsun", "trabzon", "sea"], // 陸路→航路・端を入れ替え。海に出ていた陸186px→陸47px
  ["samsun", "sinop", "sea"], // 陸路→航路に変更。海に出ていた陸223px→陸25px
  ["samsun", "amasya"],
  ["sinop", "safranbolu"],
  // --- kar-ica をまたぐ ---
  ["safranbolu", "ankara"],
  ["amasya", "sivas"],
  // --- kar-dogu をまたぐ ---
  ["trabzon", "erzurum"],
  // --- dogu 東部・南東部(東方急行: シワス〜エルズルム〜カルス) ---
  ["erzurum", "kars"],
  ["erzurum", "dogubayazit"],
  ["dogubayazit", "van"],
  ["van", "diyarbakir"],
  ["diyarbakir", "mardin"],
  ["mardin", "sanliurfa"],
  ["sanliurfa", "gaziantep"],
  ["gaziantep", "nemrut"],
  ["nemrut", "diyarbakir"],
  // --- dogu-akd をまたぐ ---
  ["gaziantep", "adana"],
  // --- ica-dogu をまたぐ(東方急行: シワス〜エルズルム) ---
  ["sivas", "erzurum"],
  // --- 少し離れた地方をまたぐ補助線(移動の選択肢を増やす) ---
  ["kayseri", "nemrut"],
  ["konya", "mersin"],
  ["ankara", "amasya"],
];
