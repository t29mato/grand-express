/**
 * オーストラリアの都市(42件)と路線。
 *
 * 地方区分は実際の州・準州にならった7つ(`flavour.mjs` の `AUSTRALIA_REGIONS`
 * を参照): `nsw` ニューサウスウェールズ(ACT含む・9) / `vic` ヴィクトリア(7) /
 * `qld` クイーンズランド(7) / `wa` 西オーストラリア(6) / `sa` 南オーストラリア(5) /
 * `tas` タスマニア(4) / `nt` ノーザンテリトリー(4)。
 *
 * 経度・緯度は実際の値。投影の範囲は geography.mjs の AUSTRALIA_PROJ を参照。
 *
 * ## `mark`(34種。24×24の座標系。詳しくは art.mjs 冒頭のコメントを参照)
 *
 * | キー | 描くもの | 受け持つ町 |
 * |---|---|---|
 * | `bridge`      | 鋼鉄アーチ橋 | シドニー |
 * | `river`       | 川面と黒鳥 | パース・ミルデューラ |
 * | `spire`       | 教会の尖塔 | アデレード |
 * | `ranges`      | 赤い岩の峰 | アリス・スプリングス |
 * | `mine`        | 鉱山のヘッドフレーム | カルグーリー・ブロークンヒル・バララット・ベンディゴ |
 * | `parliament`  | 国会議事堂の旗竿 | キャンベラ |
 * | `port`        | 起重機と船 | ニューカッスル・ダーウィン・ホバート |
 * | `ironore`     | 鉱石の積出設備 | ポート・ヘッドランド |
 * | `pearl`       | 真珠採り舟 | ブルーム |
 * | `mountainpass`| 断崖の急勾配鉄道 | カトゥーンバ |
 * | `racetrack`   | サーキットのコーナー | バサースト |
 * | `dish`        | パラボラアンテナ | パークス |
 * | `guitar`      | 巨大なギター | タムワース |
 * | `steelmill`   | 煙突と高炉 | ウロンゴン |
 * | `tram`        | 路面電車 | メルボルン |
 * | `wool`        | 羊毛の梱 | ジーロング |
 * | `cliffs`      | 海に立つ石灰岩の塔 | ワーナンブール |
 * | `dairy`       | 牛と搾乳小屋 | セール |
 * | `skyline`     | 川沿いの高層ビル | ブリスベン |
 * | `beach`       | サーフビーチと高層ビル | ゴールドコースト |
 * | `reef`        | 珊瑚礁と魚 | ケアンズ・タウンズビル |
 * | `cane`        | サトウキビ列車 | マッカイ |
 * | `cattle`      | 牛の像 | ロックハンプトン |
 * | `aviation`    | 複葉機 | ロングリーチ |
 * | `lighthouse`  | 記念ドームと灯台 | ジェラルトン |
 * | `whale`       | 鯨と解体甲板 | オールバニ |
 * | `crossroads`  | 鉄道の分岐信号 | ポート・オーガスタ |
 * | `underground` | 地下住居の通気筒 | クーバー・ペディ |
 * | `crater`      | 火口湖 | マウント・ガンビア |
 * | `vineyard`    | ブドウ畑の畝 | タヌンダ(バロッサ) |
 * | `gorge`       | 峡谷とチェアリフト | ランセストン・キャサリン |
 * | `convict`     | 石造りの流刑地の廃墟 | ポート・アーサー |
 * | `wilderness`  | 熱帯雨林の川船 | ストラーン |
 * | `monolith`    | 一枚岩 | ユララ(ウルル) |
 *
 * ## `bg`(34種。マークとほぼ1対1で対応。詳しくは art.mjs を参照)
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const AUSTRALIA_CITIES = {
  // ---------------------------------------------------------------------
  // nsw — ニューサウスウェールズ(ACTを含む・9)
  // ---------------------------------------------------------------------
  sydney: city(
    "Sydney|Sídney|Sydney|シドニー",
    151.21, -33.87, "nsw", "bridge", "harbour", "l",
    "A harbour crossed by a steel coathanger|Un puerto cruzado por una percha de acero|Un port traversé par un cintre d'acier|鋼鉄の“洋服掛け”が渡る港",
    "The Harbour Bridge was fastened with six million rivets driven by hand between 1924 and 1932, and locals nicknamed its single steel arch “the Coathanger” before the paint had even dried. Climbers have been allowed to walk its upper arc on a guided route since 1998, roped in 134 metres above the water.|El puente del puerto se remachó a mano con seis millones de roblones entre 1924 y 1932, y los vecinos apodaron su único arco de acero “la percha” antes incluso de que se secara la pintura. Desde 1998 se permite subir a su arco superior en una ruta guiada, atado a 134 metros sobre el agua.|Le pont du port fut rivé à la main avec six millions de rivets entre 1924 et 1932, et les habitants surnommèrent son arche d'acier unique « le cintre » avant même que la peinture ne sèche. Depuis 1998, on peut grimper sur son arc supérieur lors d'une visite guidée encordée, à 134 mètres au-dessus de l'eau.|ハーバーブリッジは1924年から1932年にかけて600万本のリベットを手作業で打ち込んで組み上げられ、地元の人々は塗装が乾く前からその一本アーチを「洋服掛け」と呼んでいた。1998年からはロープを付けたガイド付きツアーで、水面から134mの上部アーチを歩けるようになっている。",
    [prop("Bridge Pylon Lookout|Mirador del pilar del puente|Belvédère du pylône du pont|橋脚の展望台", 2600, 536),
     prop("Circular Quay Ferry Wharf|Muelle de ferris de Circular Quay|Débarcadère des ferries de Circular Quay|サーキュラー・キーのフェリー乗り場", 380, 78)],
  ),
  canberra: city(
    "Canberra|Canberra|Canberra|キャンベラ",
    149.13, -35.28, "nsw", "parliament", "capital", "r",
    "A capital built because two cities couldn't agree|Una capital construida porque dos ciudades no se pusieron de acuerdo|Une capitale bâtie parce que deux villes ne s'entendaient pas|二つの都市が譲らなかったために生まれた首都",
    "Sydney and Melbourne each wanted to be the national capital after federation in 1901, and the compromise was to build an entirely new city roughly halfway between them, on land ceded by New South Wales in 1911. American architect Walter Burley Griffin won the design competition for its lake-centred plan, and the artificial Lake Burley Griffin was not filled until 1964, decades after Parliament first sat nearby.|Sídney y Melbourne querían ser la capital nacional tras la federación de 1901, y el acuerdo fue construir una ciudad totalmente nueva a medio camino entre ambas, en tierras cedidas por Nueva Gales del Sur en 1911. El arquitecto estadounidense Walter Burley Griffin ganó el concurso de diseño con un plano centrado en un lago, y el lago artificial Burley Griffin no se llenó hasta 1964, décadas después de que el Parlamento se reuniera por primera vez cerca de allí.|Sydney et Melbourne voulaient chacune être la capitale nationale après la fédération de 1901, et le compromis fut de bâtir une ville entièrement nouvelle à mi-chemin entre les deux, sur des terres cédées par la Nouvelle-Galles du Sud en 1911. L'architecte américain Walter Burley Griffin remporta le concours avec un plan centré sur un lac, et le lac artificiel Burley Griffin ne fut rempli qu'en 1964, des décennies après la première séance du Parlement tout près de là.|1901年の連邦結成後、シドニーとメルボルンはどちらも首都の座を譲らず、妥協案として両都市のほぼ中間、1911年にニューサウスウェールズ州が譲渡した土地にまったく新しい都市を建設することになった。アメリカ人建築家ウォルター・バーリー・グリフィンが湖を中心に据えた設計案でコンペに勝ったが、人工のバーリー・グリフィン湖が満たされたのは、近くで初めて議会が開かれてから数十年後の1964年だった。",
    [prop("Parliament House Forecourt|Explanada del Parlamento|Esplanade du Parlement|国会議事堂前の広場", 1200, 247),
     prop("Lake Burley Griffin Jetty|Embarcadero del lago Burley Griffin|Ponton du lac Burley Griffin|バーリー・グリフィン湖の桟橋", 420, 87)],
  ),
  newcastle: city(
    "Newcastle|Newcastle|Newcastle|ニューカッスル",
    151.75, -32.93, "nsw", "port", "port", "l",
    "The port that once shipped more coal than any other|El puerto que una vez embarcó más carbón que ningún otro|Le port qui expédiait jadis plus de charbon qu'aucun autre|かつて世界最大の石炭積出港だった港",
    "For decades Newcastle billed itself as the world's largest coal port, loading ships from mines that once ran directly beneath the streets, and the industry that built the city also convinced planners to flatten a hill, Fort Scratchley, to fill in the harbour. A Japanese submarine shelled the city in 1942, one of the few times the Australian mainland came under direct attack, and the fort's guns fired back.|Durante décadas Newcastle se anunció como el mayor puerto carbonero del mundo, cargando barcos desde minas que antes corrían justo bajo las calles, y la misma industria que construyó la ciudad convenció a los planificadores de allanar una colina, Fort Scratchley, para rellenar el puerto. Un submarino japonés bombardeó la ciudad en 1942, una de las pocas veces que el territorio continental australiano sufrió un ataque directo, y los cañones del fuerte respondieron al fuego.|Pendant des décennies, Newcastle s'est vantée d'être le plus grand port charbonnier du monde, chargeant des navires depuis des mines qui couraient jadis juste sous les rues, et l'industrie qui bâtit la ville convainquit aussi les urbanistes d'araser une colline, Fort Scratchley, pour combler le port. Un sous-marin japonais bombarda la ville en 1942, l'une des rares fois où le continent australien subit une attaque directe, et les canons du fort ripostèrent.|何十年ものあいだ、ニューカッスルは世界最大の石炭積出港を自称し、かつて通りの真下まで坑道が走る炭鉱から船に石炭を積み込んでいた。この産業が築いた町は、都市計画者を説得して丘フォート・スクラッチリーを切り崩し、港の埋め立てにも使った。1942年には日本の潜水艦がこの町を砲撃しており、オーストラリア本土が直接攻撃を受けた数少ない例の一つで、砦の砲台も応戦した。",
    [prop("Fort Scratchley Battery|Batería de Fort Scratchley|Batterie de Fort Scratchley|フォート・スクラッチリー砲台", 460, 95),
     prop("Coal Loader Wharf|Muelle cargador de carbón|Quai de chargement du charbon|石炭積出岸壁", 260, 54)],
  ),
  wollongong: city(
    "Wollongong|Wollongong|Wollongong|ウロンゴン",
    150.89, -34.42, "nsw", "steelmill", "steeltown", "r",
    "A steelworks squeezed between an escarpment and the sea|Una acería apretada entre un escarpe y el mar|Une aciérie coincée entre une escarpe et la mer|断崖と海に挟まれた製鉄所",
    "The Port Kembla steelworks was built on a narrow shelf of coastal land because the Illawarra escarpment behind it rises almost straight up, so the city grew as a thin ribbon squeezed between cliff and coastline instead of spreading outward. Its tallest chimney, built in 1965, was for years the tallest structure in the Southern Hemisphere.|La acería de Port Kembla se construyó en una estrecha franja de costa porque el escarpe de Illawarra que la respalda se eleva casi vertical, así que la ciudad creció como una cinta delgada apretada entre el acantilado y la costa en vez de extenderse. Su chimenea más alta, de 1965, fue durante años la estructura más alta del hemisferio sur.|L'aciérie de Port Kembla fut bâtie sur une étroite bande côtière car l'escarpement d'Illawarra qui la domine s'élève presque à la verticale, si bien que la ville s'est développée en un mince ruban coincé entre falaise et littoral plutôt que de s'étendre. Sa plus haute cheminée, construite en 1965, fut pendant des années la plus haute structure de l'hémisphère Sud.|ポート・ケンブラの製鉄所は海沿いの細い土地に建てられた。背後のイラワラ断崖がほぼ垂直に切り立っているため、町は外へ広がる代わりに崖と海岸のあいだの細いリボン状に育った。1965年に建てられた最も高い煙突は、長年南半球でいちばん高い建造物だった。",
    [prop("Illawarra Escarpment Lookout|Mirador del escarpe de Illawarra|Belvédère de l'escarpement d'Illawarra|イラワラ断崖の展望台", 540, 111),
     prop("Port Kembla Chimney Row|Hilera de chimeneas de Port Kembla|Rangée de cheminées de Port Kembla|ポート・ケンブラの煙突列", 380, 78)],
  ),
  katoomba: city(
    "Katoomba|Katoomba|Katoomba|カトゥーンバ",
    150.31, -33.71, "nsw", "mountainpass", "bluemountains", "l",
    "A railway built to haul coal up a cliff face|Un ferrocarril construido para subir carbón por un acantilado|Un chemin de fer bâti pour hisser du charbon le long d'une falaise|崖を石炭のために登った鉄道",
    "The Katoomba Scenic Railway began in the 1880s as a way to haul coal and shale wagons up a near-vertical incline, and its steepest section still runs at a 52-degree angle, among the steepest passenger railways on Earth. Three sandstone pillars nearby, the Three Sisters, are explained in a local Dreamtime story as sisters turned to stone for their own protection.|El ferrocarril panorámico de Katoomba comenzó en la década de 1880 como forma de subir vagones de carbón y esquisto por una pendiente casi vertical, y su tramo más empinado aún corre a 52 grados, uno de los ferrocarriles de pasajeros más inclinados del mundo. Tres pilares de arenisca cercanos, las Tres Hermanas, se explican en un relato local del Tiempo del Sueño como hermanas convertidas en piedra para protegerlas.|Le chemin de fer panoramique de Katoomba débuta dans les années 1880 pour hisser des wagons de charbon et de schiste sur une pente quasi verticale, et sa section la plus raide grimpe encore à 52 degrés, l'un des chemins de fer à voyageurs les plus abrupts au monde. Trois piliers de grès voisins, les Trois Sœurs, sont expliqués dans un récit local du Temps du Rêve comme des sœurs changées en pierre pour leur propre protection.|カトゥーンバのスケニック鉄道は1880年代、石炭や頁岩を積んだ貨車をほぼ垂直の斜面で引き上げるために始まり、最も急な区間はいまも52度の勾配を走る、世界でも指折りの急勾配の旅客鉄道である。近くに立つ砂岩の柱「三姉妹岩」は、地元のドリームタイムの物語では、身を守るために石に変えられた三姉妹だと語られている。",
    [prop("Scenic Railway Incline|Rampa del ferrocarril panorámico|Rampe du chemin de fer panoramique|スケニック鉄道の急勾配区間", 620, 128),
     prop("Three Sisters Lookout|Mirador de las Tres Hermanas|Belvédère des Trois Sœurs|三姉妹岩の展望台", 480, 99)],
  ),
  bathurst: city(
    "Bathurst|Bathurst|Bathurst|バサースト",
    149.58, -33.42, "nsw", "racetrack", "racetrack", "r",
    "Gold rush town turned home of a mountain race|Ciudad de la fiebre del oro convertida en sede de una carrera de montaña|Ville de la ruée vers l'or devenue capitale d'une course de montagne|ゴールドラッシュの町が山岳レースの聖地に",
    "Australia's first gold rush began here in 1851 when Edward Hargraves publicly panned colour from a creek, choosing to announce it rather than keep it secret, and the resulting rush emptied Melbourne's streets of workers within weeks. The public road around Mount Panorama doubles all year as a motor racing circuit, closing to traffic only for the annual endurance race that draws the town's biggest crowd.|La primera fiebre del oro de Australia comenzó aquí en 1851 cuando Edward Hargraves cribó oro visible de un arroyo en público, eligiendo anunciarlo en vez de guardarlo en secreto, y la fiebre resultante vació de trabajadores las calles de Melbourne en semanas. La carretera pública que rodea Mount Panorama sirve todo el año de circuito de carreras, y solo se cierra al tráfico para la carrera de resistencia anual que atrae a la mayor multitud del pueblo.|La première ruée vers l'or d'Australie débuta ici en 1851 quand Edward Hargraves trouva de l'or dans un ruisseau devant témoins, choisissant délibérément de l'annoncer plutôt que de le garder secret, et la ruée qui s'ensuivit vida les rues de Melbourne de leurs ouvriers en quelques semaines. La route publique autour du mont Panorama sert toute l'année de circuit automobile, ne fermant à la circulation que pour la course d'endurance annuelle qui attire la plus grande foule de la ville.|1851年、エドワード・ハーグレイヴスが小川で砂金をすくって見せ、秘密にせずあえて公表したことから、オーストラリア初のゴールドラッシュがここで始まった。その熱狂は数週間でメルボルンの労働者を町から連れ去った。マウント・パノラマを取り巻く公道は一年じゅうレースコースを兼ねており、町でいちばんの人出となる毎年の耐久レースのときだけ一般車両を締め出す。",
    [prop("Mount Panorama Circuit Turn|Curva del circuito de Mount Panorama|Virage du circuit du mont Panorama|マウント・パノラマ・サーキットのコーナー", 700, 144),
     prop("Gold Rush Creek Claim|Concesión aurífera del arroyo|Concession aurifère du ruisseau|ゴールドラッシュの小川の採掘権", 220, 45)],
  ),
  parkes: city(
    "Parkes|Parkes|Parkes|パークス",
    148.18, -33.14, "nsw", "dish", "dish", "l",
    "A radio dish that helped the world watch the Moon|Un radiotelescopio que ayudó al mundo a ver la Luna|Un radiotélescope qui a aidé le monde à voir la Lune|世界に月面を見せた電波望遠鏡",
    "The Parkes radio telescope, completed in 1961 in the middle of sheep-grazing country, picked up and relayed the television signal of the 1969 Moon landing for most of the world's audience after its American counterpart lost the feed, working through gale-force winds that briefly forced the dish near its safety limit. A giant fibreglass sheep, the Big Merino, was later built beside the highway into town as a monument to the district's other main export.|El radiotelescopio de Parkes, terminado en 1961 en plena zona de pastoreo de ovejas, captó y retransmitió la señal de televisión del alunizaje de 1969 para la mayor parte de la audiencia mundial después de que su homólogo estadounidense perdiera la señal, trabajando entre vientos huracanados que llevaron el plato cerca de su límite de seguridad. Más tarde se levantó junto a la autopista de entrada un gigantesco merino de fibra de vidrio, el Big Merino, como monumento a la otra gran exportación de la región.|Le radiotélescope de Parkes, achevé en 1961 en pleine zone d'élevage ovin, capta et retransmit le signal télévisé de l'alunissage de 1969 pour la majeure partie du public mondial après que son homologue américain eut perdu le signal, fonctionnant sous des vents de tempête qui poussèrent brièvement l'antenne près de sa limite de sécurité. Un mouton géant en fibre de verre, le Big Merino, fut plus tard érigé le long de l'autoroute menant à la ville, en hommage à l'autre grande exportation de la région.|1961年、羊の放牧地のただ中に完成したパークス電波望遠鏡は、1969年の月面着陸の映像信号を、アメリカ側の設備が受信を失ったあとも受け続けて世界の大半の視聴者に届けた。作業中は暴風で皿が安全限界近くまで振られたこともあった。町へ入る幹線道路脇には後年、この地方のもう一つの主要輸出品にちなんで、巨大なグラスファイバー製の羊「ビッグ・メリノ」が建てられた。",
    [prop("Radio Telescope Viewing Platform|Plataforma de observación del radiotelescopio|Plateforme d'observation du radiotélescope|電波望遠鏡の見学デッキ", 640, 132),
     prop("Big Merino Gift Shop|Tienda del Big Merino|Boutique du Big Merino|ビッグ・メリノの土産物店", 240, 49)],
  ),
  "broken-hill": city(
    "Broken Hill|Broken Hill|Broken Hill|ブロークンヒル",
    141.47, -31.95, "nsw", "mine", "silvercity", "r",
    "A mining company born from a boundary rider's hunch|Una minera nacida de la corazonada de un jinete de linderos|Une compagnie minière née de l'intuition d'un cavalier de clôture|境界巡回員の勘から生まれた鉱山会社",
    "A boundary rider named Charles Rasp pegged a mineral claim on a hill he thought looked like tin in 1883; it turned out to hold one of the richest silver-lead-zinc deposits ever found, and the syndicate he formed grew into BHP, once the largest company in Australia. The city built its own art movement out of the desert light, and its stark, treeless streetscapes have stood in for the Moon and Mars in several films.|Un jinete de linderos llamado Charles Rasp marcó una concesión minera en una colina que le pareció de estaño en 1883; resultó contener uno de los yacimientos de plata-plomo-zinc más ricos jamás hallados, y el sindicato que formó se convirtió en BHP, en su día la mayor empresa de Australia. La ciudad forjó su propio movimiento artístico a partir de la luz del desierto, y sus calles áridas y sin árboles han hecho de escenario lunar y marciano en varias películas.|Un cavalier de clôture nommé Charles Rasp jalonna une concession minière sur une colline qu'il croyait riche en étain en 1883 ; elle recelait en fait l'un des plus riches gisements d'argent-plomb-zinc jamais trouvés, et le syndicat qu'il forma devint BHP, jadis la plus grande entreprise d'Australie. La ville a forgé son propre mouvement artistique à partir de la lumière du désert, et ses rues arides et sans arbres ont servi de décor lunaire et martien dans plusieurs films.|1883年、境界巡回員チャールズ・ラスプは錫だろうと見当をつけた丘に鉱区を申請したが、実際には史上屈指の銀・鉛・亜鉛の鉱床だった。彼が組んだ組合はのちにBHP、かつてオーストラリア最大の企業に成長した。この町は砂漠の光から独自の絵画運動を育て、木のない乾いた街並みは複数の映画で月や火星の代役を務めてきた。",
    [prop("Line of Lode Miners Memorial|Memorial minero de la Línea del Filón|Mémorial des mineurs de la Line of Lode|ライン・オブ・ロード鉱夫慰霊碑", 460, 95),
     prop("Outback Art Gallery Row|Hilera de galerías de arte del outback|Rangée de galeries d'art de l'outback|アウトバックの画廊通り", 260, 54)],
  ),
  tamworth: city(
    "Tamworth|Tamworth|Tamworth|タムワース",
    150.93, -31.09, "nsw", "guitar", "countrytown", "l",
    "A town that built a 12-metre guitar to prove a point|Un pueblo que construyó una guitarra de 12 metros para demostrar algo|Une ville qui a bâti une guitare de 12 mètres pour prouver un point|主張のために12mのギターを建てた町",
    "Tamworth was the first Australian town to light its streets electrically, in 1888, but it is better known today for a country music festival launched in 1973 that now draws several hundred thousand visitors each January to a town of about sixty thousand. The 12-metre Golden Guitar built at its entrance in 1988 has since been copied, smaller, as a trophy handed out at the festival's own awards night.|Tamworth fue el primer pueblo australiano en iluminar sus calles con electricidad, en 1888, pero hoy es más conocido por un festival de música country lanzado en 1973 que hoy atrae a varios cientos de miles de visitantes cada enero a un pueblo de unos sesenta mil habitantes. La Guitarra Dorada de 12 metros construida en su entrada en 1988 se ha copiado desde entonces, en tamaño reducido, como trofeo entregado en la gala de premios del propio festival.|Tamworth fut la première ville australienne à éclairer ses rues à l'électricité, en 1888, mais elle est aujourd'hui mieux connue pour un festival de musique country lancé en 1973 qui attire désormais plusieurs centaines de milliers de visiteurs chaque janvier dans une ville d'environ soixante mille habitants. La Guitare d'or de 12 mètres érigée à son entrée en 1988 a depuis été reproduite, en plus petit, comme trophée remis lors de la soirée de récompenses du festival.|タムワースは1888年、オーストラリアで最初に街灯を電化した町だが、いまではカントリー音楽祭のほうで知られる。1973年に始まったこの音楽祭には、人口約6万の町に毎年1月には数十万人が訪れる。1988年に町の入口に建てられた高さ12mの黄金のギターは、のちに小型版が同音楽祭自身の授賞式のトロフィーとして作られるようになった。",
    [prop("Golden Guitar Entrance|Entrada de la Guitarra Dorada|Entrée de la Guitare d'or|黄金のギターの入口", 300, 62),
     prop("Festival Awards Stage|Escenario de premios del festival|Scène des récompenses du festival|音楽祭の授賞式ステージ", 420, 86)],
  ),

  // ---------------------------------------------------------------------
  // vic — ヴィクトリア(7)
  // ---------------------------------------------------------------------
  melbourne: city(
    "Melbourne|Melbourne|Melbourne|メルボルン",
    144.96, -37.81, "vic", "tram", "metro", "r",
    "The city with the world's largest tram network|La ciudad con la mayor red de tranvías del mundo|La ville au plus grand réseau de tramways au monde|世界最大の路面電車網を持つ都市",
    "Melbourne's tram network, first electrified in 1906 by converting existing cable-tram routes, has grown into the largest urban tram system in the world by track length, and a free City Circle loop still runs vintage burgundy carriages for visitors. The city held the federal parliament itself for 26 years, from 1901 to 1927, before Canberra was ready to take over as capital.|La red de tranvías de Melbourne, electrificada por primera vez en 1906 al convertir las rutas de tranvía de cable existentes, se ha convertido en el mayor sistema de tranvías urbanos del mundo por longitud de vía, y un circuito gratuito City Circle aún circula en vagones burdeos de época para los visitantes. La ciudad albergó ella misma el parlamento federal durante 26 años, de 1901 a 1927, antes de que Canberra estuviera lista para asumir de capital.|Le réseau de tramways de Melbourne, électrifié pour la première fois en 1906 en convertissant les lignes de tramway à câble existantes, est devenu le plus grand réseau de tramways urbains au monde par la longueur des voies, et une boucle gratuite, le City Circle, roule encore en voitures bordeaux d'époque pour les visiteurs. La ville abrita elle-même le parlement fédéral pendant 26 ans, de 1901 à 1927, avant que Canberra ne soit prête à prendre le relais comme capitale.|メルボルンの路面電車網は1906年、既存のケーブルカー路線を電化して始まり、いまや軌道長で世界最大の都市トラム網に育った。無料巡回線シティ・サークルはいまも観光客向けにワイン色のクラシック車両で走る。この町は1901年から1927年までの26年間、キャンベラが首都として整うまで連邦議会そのものを自ら抱えていた。",
    [prop("City Circle Tram Stop|Parada del tranvía City Circle|Arrêt du tramway City Circle|シティ・サークル・トラムの停留所", 560, 115),
     prop("Federation Square Corner|Esquina de Federation Square|Coin de Federation Square|フェデレーション・スクエアの角", 980, 202)],
  ),
  geelong: city(
    "Geelong|Geelong|Geelong|ジーロング",
    144.36, -38.15, "vic", "wool", "wharf", "l",
    "A wool port that painted its lifeguard chairs as folk art|Un puerto lanero que pintó sus sillas de socorrista como arte popular|Un port lainier qui a peint ses postes de sauveteur en art populaire|監視台を民衆芸術に変えた羊毛の港",
    "Geelong grew rich enough on wool exports in the 1800s to be nicknamed “Pivot City”, and its wool stores still line the waterfront it once shipped from. Since 1995 the beachfront's rebuilt bathing boxes and lifeguard towers have been repainted each year as individually designed sculptures, over a hundred of them now, turning a working shoreline into an open-air gallery.|Geelong se enriqueció tanto con la exportación de lana en el siglo XIX que la apodaron “la Ciudad Pivote”, y sus almacenes laneros aún bordean el muelle desde el que exportaba. Desde 1995, las casetas de baño y torres de socorrista reconstruidas del frente de playa se repintan cada año como esculturas de diseño individual, más de un centenar ya, convirtiendo una costa de trabajo en una galería al aire libre.|Geelong s'enrichit tant grâce à l'exportation de laine au XIXe siècle qu'on la surnomma « la Ville Pivot », et ses entrepôts à laine bordent encore le quai d'où elle expédiait. Depuis 1995, les cabines de bain et tours de surveillance reconstruites du front de mer sont repeintes chaque année en sculptures individuelles, plus d'une centaine désormais, transformant un littoral de travail en galerie à ciel ouvert.|ジーロングは19世紀、羊毛の輸出で「ピボット・シティ」と呼ばれるほど富み、羊毛倉庫はいまも積み出した波止場沿いに並ぶ。1995年からは海岸に建て直された更衣小屋と監視台が毎年、一つひとつ違う意匠の彫刻として塗り直されるようになり、いまでは百基を超え、働く海岸を野外ギャラリーに変えている。",
    [prop("Wool Store Waterfront|Muelle de los almacenes de lana|Front de mer des entrepôts à laine|羊毛倉庫の波止場", 480, 99),
     prop("Painted Bathing Box|Caseta de baño pintada|Cabine de bain peinte|彩色された更衣小屋", 260, 54)],
  ),
  ballarat: city(
    "Ballarat|Ballarat|Ballarat|バララット",
    143.86, -37.56, "vic", "mine", "diggings", "r",
    "A goldfield uprising that shaped a nation's vote|Un levantamiento minero que moldeó el voto de una nación|Un soulèvement minier qui a façonné le vote d'une nation|国の投票権を動かした鉱夫の蜂起",
    "Gold diggers here built a wooden stockade in 1854 and briefly fought colonial troops over mining licence fees and a demand for the vote, a clash now called the Eureka Rebellion; more than 20 diggers and soldiers died, but the movement's demands were largely granted within a year. Ballarat's gold was so plentiful that one nugget found nearby, the Welcome Stranger, remains among the largest ever recorded.|Los mineros de oro construyeron aquí una empalizada de madera en 1854 y combatieron brevemente a las tropas coloniales por las tasas de licencia minera y la exigencia del voto, un choque hoy llamado la Rebelión de Eureka; más de 20 mineros y soldados murieron, pero las demandas del movimiento se concedieron en gran parte al cabo de un año. El oro de Ballarat fue tan abundante que una pepita hallada cerca, la Welcome Stranger, sigue entre las mayores jamás registradas.|Des chercheurs d'or bâtirent ici une palissade de bois en 1854 et affrontèrent brièvement les troupes coloniales à propos des droits de licence minière et d'une revendication du droit de vote, un affrontement aujourd'hui appelé la rébellion d'Eureka ; plus de 20 mineurs et soldats moururent, mais les revendications du mouvement furent largement satisfaites en un an. L'or de Ballarat fut si abondant qu'une pépite trouvée à proximité, la Welcome Stranger, reste parmi les plus grosses jamais recensées.|1854年、金鉱夫たちはここに木の柵を築き、採掘許可料と選挙権を求めて植民地軍と短い衝突を起こした。いまではユリーカの反乱と呼ばれるこの事件で鉱夫と兵士合わせて20人以上が死んだが、運動の要求はほぼ1年以内に認められた。バララットの金はあまりに豊かで、近郊で見つかった「ウェルカム・ストレンジャー」という塊は史上最大級の金塊として記録に残る。",
    [prop("Eureka Stockade Site|Sitio de la empalizada de Eureka|Site de la palissade d'Eureka|ユリーカの柵の跡地", 640, 132),
     prop("Welcome Stranger Nugget Field|Campo de la pepita Welcome Stranger|Champ de la pépite Welcome Stranger|ウェルカム・ストレンジャー発見地", 380, 78)],
  ),
  bendigo: city(
    "Bendigo|Bendigo|Bendigo|ベンディゴ",
    144.28, -36.76, "vic", "mine", "diggings", "l",
    "Gold that built temples as well as tunnels|Oro que construyó templos además de túneles|De l'or qui a bâti des temples autant que des tunnels|坑道だけでなく寺院も築いた金",
    "Bendigo's goldfields drew thousands of Chinese miners from the 1850s, and the Chinese community they built has kept a joss house and temple in continuous use since 1871, among the oldest in the country. A 1.6 km network of narrow-gauge tram track laid in 1972 now carries visitors down into a mine shaft rather than around the streets above it.|Los yacimientos de oro de Bendigo atrajeron a miles de mineros chinos desde la década de 1850, y la comunidad china que formaron ha mantenido en uso continuo desde 1871 una casa de culto y templo, entre los más antiguos del país. Una red de 1,6 km de vía de tranvía de vía estrecha tendida en 1972 lleva hoy a los visitantes hasta el interior de un pozo minero en vez de recorrer las calles de arriba.|Les gisements aurifères de Bendigo attirèrent des milliers de mineurs chinois dès les années 1850, et la communauté chinoise qu'ils bâtirent entretient depuis 1871 un temple en usage continu, parmi les plus anciens du pays. Un réseau de 1,6 km de voie de tramway à voie étroite posé en 1972 conduit aujourd'hui les visiteurs au fond d'un puits de mine plutôt qu'autour des rues au-dessus.|ベンディゴの金鉱には1850年代から中国人鉱夫が数千人押し寄せ、彼らが築いた華人社会は1871年から絶えることなく使われてきた祠堂を今も保っている。国内でも最古級である。1972年に敷かれた1.6kmの狭軌トラム線は、いまは地上の通りではなく、鉱山の坑道の奥へと観光客を運んでいる。",
    [prop("Joss House Temple Ground|Terreno del templo chino|Terrain du temple chinois|祠堂の境内", 340, 70),
     prop("Central Deborah Mine Shaft|Pozo de la mina Central Deborah|Puits de la mine Central Deborah|セントラル・デボラ鉱山の竪坑", 560, 115)],
  ),
  warrnambool: city(
    "Warrnambool|Warrnambool|Warrnambool|ワーナンブール",
    142.48, -38.38, "vic", "cliffs", "greatoceanroad", "r",
    "Limestone stacks that keep falling into the sea|Pilares de caliza que siguen cayendo al mar|Des piliers calcaires qui continuent de tomber à la mer|いまも海へ崩れ続ける石灰岩の塔",
    "The limestone stacks known as the Twelve Apostles were never actually twelve, and one collapsed into the sea in front of watching tourists in 2005, a reminder that the whole formation erodes roughly 2 cm a year under the same surf that carved it. Warrnambool at the road's western end also hosts southern right whales that calve close enough to a clifftop lookout to be watched without a boat, from around June to September.|Los pilares de caliza conocidos como los Doce Apóstoles nunca fueron en realidad doce, y uno se derrumbó al mar ante turistas que miraban en 2005, recordatorio de que toda la formación se erosiona unos 2 cm al año por el mismo oleaje que la esculpió. Warrnambool, en el extremo occidental de la carretera, también recibe ballenas francas australes que paren lo bastante cerca de un mirador en el acantilado como para observarlas sin barco, de junio a septiembre aproximadamente.|Les piliers calcaires connus sous le nom des Douze Apôtres n'ont en réalité jamais été douze, et l'un d'eux s'est effondré dans la mer devant des touristes en 2005, rappel que toute la formation s'érode d'environ 2 cm par an sous l'effet du même ressac qui l'a sculptée. Warrnambool, à l'extrémité ouest de la route, accueille aussi des baleines franches australes qui mettent bas assez près d'un belvédère de falaise pour être observées sans bateau, de juin à septembre environ.|「十二使徒岩」と呼ばれる石灰岩の塔は実際には一度も12本そろったことがなく、2005年には観光客が見守るなか一本が海へ崩れ落ちた。これは、この地形全体がそれを削った同じ荒波によって年に約2cmずつ侵食され続けている証しである。この道の西の終点にあるワーナンブールには、6月から9月ごろにかけて、崖の展望台から船なしで観察できるほど岸に近づいて出産するミナミセミクジラもやってくる。",
    [prop("Twelve Apostles Clifftop Lookout|Mirador de los Doce Apóstoles|Belvédère des Douze Apôtres|十二使徒岩の崖上展望台", 900, 185),
     prop("Whale Nursery Viewing Point|Mirador de la guardería de ballenas|Point de vue de la nurserie à baleines|クジラの子育て海域の観察地点", 420, 87)],
  ),
  sale: city(
    "Sale|Sale|Sale|セール",
    147.06, -38.11, "vic", "dairy", "gippsland", "l",
    "A canal town that stumbled into an offshore oil field|Un pueblo de canales que dio con un yacimiento marino sin buscarlo|Une ville de canaux tombée par hasard sur un gisement en mer|沖合の油田に思いがけずたどり着いた運河の町",
    "Sale sits amid Gippsland's dairy country, but a canal dug in the 1880s to link it to the Gippsland Lakes and the sea also made it, unexpectedly, the onshore base for offshore oil and gas platforms discovered in Bass Strait from the 1960s. The dairy herds nearby graze pasture kept green by some of the highest rainfall in the state, which the same lakes and wetlands then carry back out to sea.|Sale se asienta en la región lechera de Gippsland, pero un canal excavado en la década de 1880 para conectarla con los Lagos Gippsland y el mar la convirtió también, inesperadamente, en la base terrestre de las plataformas de petróleo y gas descubiertas en el estrecho de Bass desde los años sesenta. Los rebaños lecheros cercanos pastan en praderas mantenidas verdes por algunas de las lluvias más altas del estado, que esos mismos lagos y humedales devuelven luego al mar.|Sale se trouve au cœur du pays laitier du Gippsland, mais un canal creusé dans les années 1880 pour la relier aux lacs du Gippsland et à la mer en fit aussi, sans le vouloir, la base terrestre des plateformes pétrolières et gazières découvertes dans le détroit de Bass à partir des années 1960. Les troupeaux laitiers voisins paissent sur des pâturages maintenus verts par certaines des pluies les plus abondantes de l'État, que ces mêmes lacs et zones humides renvoient ensuite à la mer.|セールはギップスランドの酪農地帯にあるが、1880年代にギップスランド湖群と海へつなぐために掘られた運河のおかげで、思いがけず1960年代からバス海峡沖で見つかった油田・ガス田の陸上基地にもなった。近郊の乳牛の群れは、州でも指折りの多雨に支えられた青々とした牧草地で草を食み、その雨水は同じ湖沼と湿地を通っていずれ海へ戻っていく。",
    [prop("Gippsland Lakes Canal Wharf|Muelle del canal de los Lagos Gippsland|Quai du canal des lacs du Gippsland|ギップスランド湖運河の波止場", 340, 70),
     prop("Dairy Pasture Milking Shed|Establo de ordeño en el pastizal|Étable de traite du pâturage|牧草地の搾乳小屋", 220, 45)],
  ),
  mildura: city(
    "Mildura|Mildura|Mildura|ミルドゥラ",
    142.16, -34.19, "vic", "river", "orchard", "r",
    "A desert turned to orchards by two Californian brothers|Un desierto convertido en huertos por dos hermanos californianos|Un désert changé en vergers par deux frères californiens|カリフォルニア兄弟が果樹園に変えた乾いた土地",
    "Mildura was near-desert scrubland until the Chaffey brothers, irrigation engineers brought from California in 1887, built channels pumping Murray River water onto the surrounding plains, turning it into one of the country's main citrus- and grape-growing districts almost from nothing. The same river that made the town possible now carries paddle-steamers built in the 1800s that still run pleasure cruises past the orchards their cargo runs once served.|Mildura era casi matorral desértico hasta que los hermanos Chaffey, ingenieros de riego traídos de California en 1887, construyeron canales que bombeaban agua del río Murray a las llanuras vecinas, convirtiéndola casi de la nada en una de las principales zonas citrícolas y vitícolas del país. El mismo río que hizo posible el pueblo lleva hoy vapores de rueda construidos en el siglo XIX que aún ofrecen cruceros turísticos junto a los huertos a los que antes servían sus cargamentos.|Mildura n'était qu'un maquis quasi désertique jusqu'à ce que les frères Chaffey, ingénieurs en irrigation venus de Californie en 1887, construisent des canaux pompant l'eau du fleuve Murray vers les plaines environnantes, en faisant presque de rien l'une des principales régions d'agrumes et de vigne du pays. Le même fleuve qui rendit la ville possible porte aujourd'hui des bateaux à aubes construits au XIXe siècle qui offrent encore des croisières touristiques devant les vergers que leur cargaison desservait jadis.|ミルドゥラはほとんど砂漠の低木地だったが、1887年にカリフォルニアから招かれた灌漑技師チャフィー兄弟が、周囲の平地へマレー川の水を汲み上げる水路を築き、ほぼ無から国内有数の柑橘とブドウの産地に変えた。町を可能にしたのと同じ川には、19世紀に造られた外輪船がいまも観光クルーズとして走り、かつて自分たちが荷を運んだ果樹園のそばを通り過ぎていく。",
    [prop("Chaffey Irrigation Channel|Canal de riego Chaffey|Canal d'irrigation Chaffey|チャフィー灌漑水路", 300, 62),
     prop("Paddle-Steamer Wharf|Muelle de los vapores de rueda|Quai des bateaux à aubes|外輪船の波止場", 460, 95)],
  ),

  // ---------------------------------------------------------------------
  // qld — クイーンズランド(7)
  // ---------------------------------------------------------------------
  brisbane: city(
    "Brisbane|Brisbane|Brisbane|ブリスベン",
    153.03, -27.47, "qld", "skyline", "subtropical", "l",
    "A river city that turned its floods into a promise|Una ciudad fluvial que convirtió sus inundaciones en promesa|Une ville-fleuve qui a fait de ses crues une promesse|洪水を教訓に変えた川の都",
    "The Brisbane River loops through the city in such tight bends that a ferry crossing can be quicker than a bridge, and after a catastrophic flood in 1974 the city built a string of purpose-made flood-mitigation dams and levees; a further major flood in 2011 still submerged riverside suburbs, showing the limits of the plan. A man-made swimming beach, South Bank's Streets Beach, was built after the 1988 World Expo on land the river itself once occupied.|El río Brisbane serpentea por la ciudad en curvas tan cerradas que un cruce en ferri puede ser más rápido que un puente, y tras una inundación catastrófica en 1974 la ciudad construyó una serie de presas y diques de mitigación; una nueva gran inundación en 2011 volvió a sumergir los suburbios ribereños, mostrando los límites del plan. Una playa artificial, Streets Beach en South Bank, se construyó tras la Expo Mundial de 1988 en tierra que antes ocupaba el propio río.|Le fleuve Brisbane serpente en ville dans des méandres si serrés qu'une traversée en ferry peut être plus rapide qu'un pont, et après une crue catastrophique en 1974, la ville construisit une série de barrages et de digues anti-crue ; une nouvelle crue majeure en 2011 submergea de nouveau les quartiers riverains, montrant les limites du plan. Une plage artificielle, Streets Beach à South Bank, fut construite après l'Expo mondiale de 1988 sur un terrain jadis occupé par le fleuve lui-même.|ブリスベン川は町の中を急カーブで蛇行しており、橋より渡し船のほうが早いこともある。1974年の壊滅的な洪水のあと、市は治水ダムと堤防を整備したが、2011年の大洪水では再び川沿いの郊外が水没し、対策の限界を示した。1988年の万博のあと、川がかつて占めていた土地にサウス・バンクの人工ビーチ「ストリーツ・ビーチ」が造られた。",
    [prop("Streets Beach Lagoon|Laguna de Streets Beach|Lagune de Streets Beach|ストリーツ・ビーチのラグーン", 720, 148),
     prop("Riverside Ferry Terminal|Terminal del ferri ribereño|Terminal du ferry riverain|川沿いのフェリー乗り場", 380, 78)],
  ),
  "gold-coast": city(
    "Gold Coast|Gold Coast|Gold Coast|ゴールドコースト",
    153.43, -28.02, "qld", "beach", "surfcity", "r",
    "A sandbank suburb that outgrew its swamp|Un suburbio de arena que superó su pantano|Une banlieue de sable qui a dépassé son marais|沼地から育った砂浜の街",
    "The Gold Coast was mostly swamp, banana farms and a few beachside shacks until postwar land developers dredged canals through it from the 1950s, creating waterfront housing lots that now make up one of the largest artificial canal systems in the world. Surfers Paradise, its high-rise centre, takes its name from a single 1930s hotel promotion, not from any natural feature.|La Gold Coast era en su mayoría pantano, plataneras y algunas casetas de playa hasta que los promotores de posguerra dragaron canales desde los años cincuenta, creando parcelas frente al agua que hoy forman uno de los mayores sistemas de canales artificiales del mundo. Surfers Paradise, su centro de rascacielos, toma el nombre de una simple campaña publicitaria hotelera de los años treinta, no de ningún accidente natural.|La Gold Coast n'était guère que marais, bananeraies et quelques cabanes de plage jusqu'à ce que des promoteurs d'après-guerre y creusent des canaux à partir des années 1950, créant des lots riverains qui forment aujourd'hui l'un des plus grands réseaux de canaux artificiels au monde. Surfers Paradise, son centre de gratte-ciel, tire son nom d'une simple campagne publicitaire hôtelière des années 1930, et non d'un élément naturel.|ゴールドコーストは戦後の1950年代に開発業者が運河を掘り始めるまで、大半が湿地とバナナ農園、点在するビーチ小屋にすぎなかった。掘られた水路は水辺の宅地を生み、いまや世界有数の人工運河網となっている。高層ビルが並ぶ中心地「サーファーズ・パラダイス」の名は、自然の地形ではなく1930年代のあるホテルの宣伝文句に由来する。",
    [prop("Surfers Paradise Highrise|Rascacielos de Surfers Paradise|Gratte-ciel de Surfers Paradise|サーファーズ・パラダイスの高層ビル", 1600, 330),
     prop("Canal Estate Jetty|Embarcadero de la urbanización de canales|Ponton du lotissement des canaux|運河沿い住宅地の桟橋", 480, 99)],
  ),
  cairns: city(
    "Cairns|Cairns|Cairns|ケアンズ",
    145.77, -16.92, "qld", "reef", "reef", "l",
    "The gateway to a reef visible from space|La puerta a un arrecife visible desde el espacio|La porte d'entrée d'un récif visible depuis l'espace|宇宙からも見える礁の玄関口",
    "Cairns grew from a muddy river port built in 1876 mainly to serve a goldfield inland, and it now serves as the main departure point for the Great Barrier Reef, a structure long enough to be seen from space and built by coral polyps over some 20,000 years. Repeated mass coral bleaching events since 1998, driven by warming ocean temperatures, have killed significant sections of reef closest to shore, and scientists now monitor its health from the same wharves where dive boats depart each morning.|Cairns creció a partir de un puerto fluvial fangoso fundado en 1876 sobre todo para servir a un yacimiento de oro tierra adentro, y hoy es el principal punto de partida hacia la Gran Barrera de Coral, una estructura tan larga que se ve desde el espacio y construida por pólipos de coral a lo largo de unos 20.000 años. Episodios repetidos de blanqueamiento masivo de coral desde 1998, impulsados por el calentamiento del océano, han matado tramos importantes del arrecife más cercano a la costa, y los científicos vigilan hoy su salud desde los mismos muelles de donde zarpan cada mañana los barcos de buceo.|Cairns s'est développée à partir d'un port fluvial boueux fondé en 1876 surtout pour desservir un gisement d'or à l'intérieur des terres, et sert aujourd'hui de principal point de départ vers la Grande Barrière de corail, une structure assez longue pour être vue depuis l'espace et bâtie par des polypes coralliens sur quelque 20 000 ans. Des épisodes répétés de blanchissement corallien massif depuis 1998, dus au réchauffement des océans, ont tué des sections importantes du récif les plus proches de la côte, et les scientifiques surveillent aujourd'hui sa santé depuis les mêmes quais d'où partent chaque matin les bateaux de plongée.|ケアンズは1876年、主に内陸の金鉱に物資を送るための泥深い川港として始まったが、いまではグレートバリアリーフへの主な出発地になっている。この礁は宇宙からも見えるほど長く、およそ2万年かけてサンゴのポリプが築き上げた。1998年以降くり返される大規模な白化現象は海水温の上昇によるもので、岸に近い区域の礁を大きく損なっており、科学者たちはダイビング船が毎朝出発するのと同じ波止場から、いまもその健康状態を見守っている。",
    [prop("Reef Dive Boat Marina|Marina de barcos de buceo del arrecife|Marina des bateaux de plongée du récif|リーフ・ダイブボートの停泊地", 780, 161),
     prop("Esplanade Lagoon Pool|Piscina lagunar de la Esplanade|Piscine-lagon de l'Esplanade|エスプラネードのラグーンプール", 340, 70)],
  ),
  townsville: city(
    "Townsville|Townsville|Townsville|タウンズビル",
    146.82, -19.26, "qld", "reef", "garrison", "r",
    "A garrison city guarded by its own hill|Una ciudad guarnición vigilada por su propia colina|Une ville-garnison veillée par sa propre colline|自らの丘に見守られた守備隊の町",
    "Townsville became the largest base for Allied forces in northern Australia during the Second World War, hosting well over 100,000 troops at its peak, and Castle Hill, the red granite hill at its centre, was reportedly considered for hollowing out into an air-raid shelter before the plan was dropped as too costly. Magnetic Island offshore, named by James Cook after his compass supposedly malfunctioned nearby, is now home to one of the largest wild koala populations in the country.|Townsville se convirtió en la mayor base aliada del norte de Australia durante la Segunda Guerra Mundial, con más de 100.000 soldados en su apogeo, y Castle Hill, la colina de granito rojo en su centro, se estudió al parecer para excavarla como refugio antiaéreo antes de descartar el plan por su coste. La isla Magnética frente a la costa, bautizada por James Cook tras un supuesto fallo de su brújula cerca de allí, alberga hoy una de las mayores poblaciones silvestres de koalas del país.|Townsville devint la plus grande base alliée du nord de l'Australie pendant la Seconde Guerre mondiale, accueillant plus de 100 000 soldats à son apogée, et Castle Hill, la colline de granit rouge en son centre, aurait été envisagée pour être évidée en abri antiaérien avant que le projet ne soit abandonné, jugé trop coûteux. L'île Magnetic au large, nommée par James Cook après une prétendue panne de sa boussole non loin de là, abrite aujourd'hui l'une des plus grandes populations sauvages de koalas du pays.|タウンズビルは第二次世界大戦中、北オーストラリア最大の連合軍基地となり、最盛期には10万人を超える兵が駐留した。町の中心にある赤い花崗岩の丘キャッスルヒルは、防空壕として中をくり抜く案も検討されたが、費用がかかりすぎるとして見送られたと伝えられる。沖合のマグネティック島は、ジェームズ・クックが近くでコンパスが狂ったとされることから名付けたが、いまでは国内でも有数の野生コアラの生息地になっている。",
    [prop("Castle Hill Lookout Road|Carretera al mirador de Castle Hill|Route du belvédère de Castle Hill|キャッスルヒル展望道路", 380, 78),
     prop("Magnetic Island Ferry Dock|Muelle del ferri a la isla Magnética|Quai du ferry pour l'île Magnetic|マグネティック島行きフェリー乗り場", 260, 54)],
  ),
  mackay: city(
    "Mackay|Mackay|Mackay|マッカイ",
    149.19, -21.14, "qld", "cane", "canefields", "l",
    "A river town that grows a third of the nation's sugar|Un pueblo fluvial que cultiva un tercio del azúcar del país|Une ville fluviale qui cultive un tiers du sucre du pays|国産砂糖の3分の1を育てる川の町",
    "Mackay's surrounding district produces around a third of Australia's raw sugar, grown on cane fields planted from the 1860s using indentured labourers brought from Pacific island nations under conditions historians now generally regard as exploitative, a chapter the region has only more recently begun publicly acknowledging. Harvest season each year still fills the roads at night with cane trains hauling to the port, their narrow-gauge tracks crossing public streets at more level crossings than almost anywhere else in the country.|El distrito de Mackay produce alrededor de un tercio del azúcar en bruto de Australia, cultivada en cañaverales plantados desde la década de 1860 con trabajadores contratados traídos de naciones insulares del Pacífico en condiciones que los historiadores hoy consideran en general explotadoras, un capítulo que la región solo ha empezado a reconocer públicamente más recientemente. Cada temporada de cosecha las carreteras se siguen llenando de noche con trenes cañeros que van al puerto, sus vías de trocha estrecha cruzando calles públicas en más pasos a nivel que casi en ningún otro lugar del país.|La région de Mackay produit environ un tiers du sucre brut d'Australie, cultivé sur des champs de canne plantés dès les années 1860 grâce à des travailleurs sous contrat amenés de nations insulaires du Pacifique dans des conditions que les historiens jugent aujourd'hui généralement comme relevant de l'exploitation, un chapitre que la région n'a commencé à reconnaître publiquement que plus récemment. Chaque saison de récolte, les routes se remplissent encore la nuit de trains à canne roulant vers le port, leurs voies à écartement étroit traversant les rues publiques à plus de passages à niveau que presque partout ailleurs dans le pays.|マッカイ地方はオーストラリアの粗糖のおよそ3分の1を生産している。サトウキビ畑は1860年代から、太平洋の島々から連れて来られた年季奉公労働者によって開かれた。その労働条件は今日、歴史家からおおむね搾取的だったとみなされており、この地方が公にそれを認め始めたのはごく最近のことである。収穫期には毎年夜通し、狭軌のサトウキビ列車が港へ向かって走り、その線路は国内でもとりわけ多くの踏切で公道を横切る。",
    [prop("Cane Train Level Crossing|Paso a nivel del tren cañero|Passage à niveau du train à canne|サトウキビ列車の踏切", 280, 58),
     prop("Sugar Terminal Wharf|Muelle de la terminal azucarera|Quai du terminal sucrier|製糖ターミナルの波止場", 460, 95)],
  ),
  rockhampton: city(
    "Rockhampton|Rockhampton|Rockhampton|ロックハンプトン",
    150.51, -23.38, "qld", "cattle", "beefcapital", "r",
    "A city that crowned itself with concrete bulls|Una ciudad que se coronó con toros de hormigón|Une ville qui s'est couronnée de taureaux en béton|コンクリートの牛で街を飾った町",
    "Rockhampton sits almost exactly on the Tropic of Capricorn, marked by a monument travellers can straddle with one foot in the tropics and one out, and it calls itself Australia's “Beef Capital”, a claim backed by eight life-sized bull statues placed at the city's entrances since the 1990s to represent the region's main cattle breeds. The Fitzroy River through town floods often enough that a barrage was later built to keep the upstream water fresh for the herds even at low tide.|Rockhampton se asienta casi exactamente sobre el Trópico de Capricornio, marcado por un monumento donde se puede poner un pie en el trópico y otro fuera, y se autodenomina la “Capital del Vacuno” de Australia, respaldada por ocho estatuas de toros a tamaño real colocadas en las entradas de la ciudad desde los noventa, representando las principales razas ganaderas de la región. El río Fitzroy que la atraviesa se desborda con tanta frecuencia que se construyó después una presa para mantener dulce el agua río arriba para el ganado incluso en marea baja.|Rockhampton se trouve presque exactement sur le tropique du Capricorne, marqué par un monument où l'on peut poser un pied dans les tropiques et l'autre hors, et se surnomme la « capitale du bœuf » d'Australie, un titre appuyé par huit statues de taureaux grandeur nature placées aux entrées de la ville depuis les années 1990, représentant les principales races bovines de la région. La rivière Fitzroy qui la traverse déborde assez souvent pour qu'un barrage ait ensuite été construit afin de garder l'eau en amont douce pour les troupeaux même à marée basse.|ロックハンプトンはほぼ南回帰線の真上に位置し、片足を熱帯側に、もう片方を外に置ける記念碑がその線を示す。この町はオーストラリアの「牛肉の都」を自称し、1990年代から市の入口に置かれた8体の実物大の牛の像がこの地方の主要な牛種を表している。町を流れるフィッツロイ川はたびたび氾濫するため、干潮時にも上流の水を家畜のために真水に保つ堰が後に築かれた。",
    [prop("Tropic of Capricorn Marker|Marcador del Trópico de Capricornio|Repère du tropique du Capricorne|南回帰線の標識", 240, 49),
     prop("Fitzroy River Barrage|Presa del río Fitzroy|Barrage de la Fitzroy|フィッツロイ川の堰", 420, 87)],
  ),
  longreach: city(
    "Longreach|Longreach|Longreach|ロングリーチ",
    144.25, -23.44, "qld", "aviation", "outbackair", "l",
    "A sheep town where an airline learned to fly|Un pueblo lanero donde una aerolínea aprendió a volar|Une ville d'élevage où une compagnie aérienne a appris à voler|航空会社が飛び方を覚えた羊の町",
    "Qantas was founded in western Queensland in 1920 and built its first hangar in Longreach in 1922, the same corrugated-iron shed now preserved as a museum beside the airstrip where the airline once serviced flying-doctor and mail routes across country too vast and empty for reliable roads. The town also anchors the Stockman's Hall of Fame, opened in 1988 to record the outback's droving and station history before it was lost.|Qantas se fundó en el oeste de Queensland en 1920 y construyó su primer hangar en Longreach en 1922, el mismo cobertizo de chapa ondulada hoy conservado como museo junto a la pista donde la aerolínea prestaba servicio a rutas de médico volador y correo por un territorio demasiado vasto y vacío para carreteras fiables. El pueblo también alberga el Stockman's Hall of Fame, inaugurado en 1988 para registrar la historia ganadera y de las estaciones del outback antes de que se perdiera.|Qantas fut fondée dans l'ouest du Queensland en 1920 et bâtit son premier hangar à Longreach en 1922, le même abri en tôle ondulée aujourd'hui conservé comme musée près de la piste où la compagnie desservait jadis les routes du médecin volant et du courrier à travers un territoire trop vaste et vide pour des routes fiables. La ville abrite aussi le Stockman's Hall of Fame, ouvert en 1988 pour consigner l'histoire des convoyeurs de bétail et des stations de l'outback avant qu'elle ne se perde.|カンタス航空は1920年に西部クイーンズランドで創業し、1922年にロングリーチに最初の格納庫を建てた。その波トタン板の小屋はいまも滑走路脇で博物館として保存されており、道路が頼りにならないほど広大で人気のない土地を、この航空会社はかつて飛行医師便や郵便路線で結んでいた。町にはまた、失われる前に内陸部の家畜追いや牧場の歴史を記録するため1988年に開館したストックマンズ・ホール・オブ・フェイムもある。",
    [prop("Qantas Founders Hangar|Hangar de los fundadores de Qantas|Hangar des fondateurs de Qantas|カンタス創業者の格納庫", 640, 132),
     prop("Stockman's Hall of Fame Yard|Patio del Stockman's Hall of Fame|Cour du Stockman's Hall of Fame|ストックマンズ・ホール・オブ・フェイムの中庭", 300, 62)],
  ),

  // ---------------------------------------------------------------------
  // wa — 西オーストラリア(6)
  // ---------------------------------------------------------------------
  perth: city(
    "Perth|Perth|Perth|パース",
    115.86, -31.95, "wa", "river", "riverside", "r",
    "The river that upended Europe's swans|El río que desmintió a los cisnes de Europa|Le fleuve qui a démenti les cygnes d'Europe|白い白鳥という思い込みを覆した川",
    "Dutch captain Willem de Vlamingh sailed up this river in 1697 and found it crowded with black swans, upending centuries of European certainty that swans were always white — the bird still nests along the banks and sits on the state flag today. Perth's nearest state capital, Adelaide, is more than 2,100 km away by road, one of the largest gaps between any two capital cities on Earth.|El capitán holandés Willem de Vlamingh navegó este río en 1697 y lo halló lleno de cisnes negros, desmintiendo siglos de certeza europea de que los cisnes eran siempre blancos; el ave aún anida en sus orillas y figura en la bandera del estado. La capital estatal más cercana a Perth, Adelaida, está a más de 2.100 km por carretera, una de las mayores distancias entre dos capitales del mundo.|Le capitaine hollandais Willem de Vlamingh remonta ce fleuve en 1697 et le trouva grouillant de cygnes noirs, démentant des siècles de certitude européenne selon laquelle les cygnes étaient toujours blancs ; l'oiseau niche encore sur ses rives et figure sur le drapeau de l'État. La capitale d'État la plus proche de Perth, Adélaïde, se trouve à plus de 2 100 km par la route, l'un des plus grands écarts entre deux capitales au monde.|オランダ人船長ウィレム・デ・フラーミングは1697年にこの川をさかのぼり、黒鳥で埋め尽くされているのを見つけた。白鳥は白いものと信じて疑わなかったヨーロッパの常識を覆す発見で、この鳥はいまも川岸に巣を作り、州旗にも描かれている。パースにいちばん近い州都アデレードまでは道路で2,100km以上離れており、世界でも指折りに離れた州都どうしの組み合わせである。",
    [prop("Kings Park Lookout|Mirador de Kings Park|Belvédère de Kings Park|キングスパークの展望台", 620, 128),
     prop("Fremantle Fishing Boat Harbour|Puerto pesquero de Fremantle|Port de pêche de Fremantle|フリーマントルの漁船溜まり", 260, 54)],
  ),
  kalgoorlie: city(
    "Kalgoorlie|Kalgoorlie|Kalgoorlie|カルグーリー",
    121.47, -30.75, "wa", "mine", "goldfields", "l",
    "A statue said to sweat beer, not water|Una estatua que dicen suda cerveza, no agua|Une statue dont on dit qu'elle transpire de la bière, pas de l'eau|水ではなくビールを“汗”にする像、と語り継がれる",
    "Prospector Paddy Hannan's 1893 gold find drew tens of thousands within a year, and the town's water problem was only solved in 1903 by a pipeline that pumped it 530 km uphill from Perth, a scheme so mocked in the press that its engineer did not live to see it hailed a triumph. Hannan's statue holds a water bag that trickles from a tap, and locals are said to have occasionally topped it up with beer instead during dry spells.|El hallazgo de oro del prospector Paddy Hannan en 1893 atrajo a decenas de miles de personas en un año, y el problema del agua del pueblo solo se resolvió en 1903 con una tubería que la bombeaba 530 km cuesta arriba desde Perth, un proyecto tan ridiculizado en la prensa que su ingeniero no vivió para verlo aclamado como un triunfo. La estatua de Hannan sostiene un odre del que gotea agua por un grifo, y se dice que los vecinos a veces lo rellenaban con cerveza en tiempos de sequía.|La découverte d'or du prospecteur Paddy Hannan en 1893 attira des dizaines de milliers de personnes en un an, et le problème de l'eau de la ville ne fut résolu qu'en 1903 par un pipeline qui la pompait sur 530 km en montée depuis Perth, un projet si moqué dans la presse que son ingénieur ne vécut pas assez pour le voir salué comme un triomphe. La statue de Hannan tient une outre d'où l'eau goutte d'un robinet, et l'on dit que les habitants la remplissaient parfois de bière plutôt que d'eau en période de sécheresse.|1893年、探鉱者パディ・ハナンの金鉱発見は一年足らずで数万人を呼び寄せたが、町の水不足は1903年、パースから530kmを上り勾配で汲み上げるパイプラインが完成するまで解決しなかった。この計画は新聞であまりに嘲笑され、担当技師は完成が称賛される日を見ることなく世を去った。ハナンの銅像は蛇口から水の滴る水袋を提げており、干ばつのときは地元の人が水の代わりにビールを注いだこともあると語り継がれている。",
    [prop("Super Pit Lookout|Mirador del Super Pit|Belvédère de la Super Pit|スーパーピットの展望台", 2800, 577),
     prop("Hannan Street Pub|Pub de Hannan Street|Pub de Hannan Street|ハナン・ストリートの酒場", 300, 62)],
  ),
  broome: city(
    "Broome|Broome|Broome|ブルーム",
    122.24, -17.96, "wa", "pearl", "pearlcoast", "r",
    "A pearling port built by divers from half the world|Un puerto perlero construido por buzos de medio mundo|Un port perlier bâti par des plongeurs venus de la moitié du monde|世界各地の潜水夫が築いた真珠採りの港",
    "Broome supplied most of the world's mother-of-pearl shell buttons by the early 1900s, worked by a diving fleet crewed largely by Japanese, Malay, Chinese and Aboriginal divers under conditions that left a Japanese cemetery in town with more than 900 graves, many for men lost to decompression sickness. The industry collapsed once plastic buttons arrived, but a cultured pearl trade later revived it, and the shoreline still turns the colour of the fruit it is named for during “Staircase to the Moon”, when a rising full moon reflects across exposed mudflats at extreme low tide.|Broome suministraba la mayor parte de los botones de nácar del mundo a principios del siglo XX, trabajados por una flota de buceo tripulada en gran parte por buzos japoneses, malayos, chinos y aborígenes bajo condiciones que dejaron en el pueblo un cementerio japonés con más de 900 tumbas, muchas de hombres perdidos por la enfermedad de descompresión. La industria se hundió con la llegada del botón de plástico, pero un comercio de perlas cultivadas la revivió después, y la costa aún toma el color de la fruta que le da nombre durante la “Escalera a la Luna”, cuando una luna llena naciente se refleja en los bancos de fango expuestos con la marea extremadamente baja.|Broome fournissait la majorité des boutons de nacre du monde au début du XXe siècle, travaillés par une flotte de plongée composée en grande partie de plongeurs japonais, malais, chinois et aborigènes dans des conditions qui laissèrent en ville un cimetière japonais de plus de 900 tombes, beaucoup pour des hommes emportés par le mal de décompression. L'industrie s'effondra à l'arrivée du bouton en plastique, mais un commerce de perles de culture la ranima ensuite, et le littoral prend encore la couleur du fruit qui lui donne son nom lors de l'« Escalier vers la Lune », quand une pleine lune montante se reflète sur la vase à nu à marée extrêmement basse.|20世紀初頭、ブルームは世界の真珠貝ボタンの大半を供給しており、日本人・マレー人・中国人・アボリジナルの潜水夫が中心となった採貝船団が働いていた。その厳しい労働環境は、減圧症で命を落とした者を含む900基を超える墓が並ぶ日本人墓地として町に残る。プラスチックボタンの登場で産業は衰えたが、後に養殖真珠の取引が復活させた。海岸はいまも、極端な干潮で現れた干潟に満月が昇って映る「月への階段」の時期になると、町の名の由来である果実の色に染まる。",
    [prop("Pearl Luggers Dock|Muelle de las luggers perleras|Quai des luggers perlières|真珠採り舟の船着場", 480, 99),
     prop("Staircase to the Moon Mudflat|Fangal de la Escalera a la Luna|Vasière de l'Escalier vers la Lune|「月への階段」の干潟", 260, 54)],
  ),
  geraldton: city(
    "Geraldton|Geraldton|Geraldton|ジェラルトン",
    114.61, -28.78, "wa", "lighthouse", "lighthouse", "l",
    "A wind so constant it powers half the town's electricity|Un viento tan constante que aporta la mitad de la electricidad del pueblo|Un vent si constant qu'il fournit la moitié de l'électricité de la ville|町の電力の半分をまかなうほど絶えず吹く風",
    "Geraldton's coastal wind blows so reliably from the south each afternoon that windsurfers rank it among the best conditions on Earth, and a wind farm built from 2011 uses the same gusts to supply a large share of the town's power. A domed memorial on a headland overlooks the water where the warship HMAS Sydney sank in 1941 with all 645 hands after a battle with a disguised German raider, the largest single loss of life the Royal Australian Navy has recorded.|El viento costero de Geraldton sopla desde el sur con tanta fiabilidad cada tarde que los windsurfistas lo consideran entre las mejores condiciones del mundo, y un parque eólico construido desde 2011 usa esas mismas rachas para suministrar buena parte de la energía del pueblo. Un memorial abovedado en un cabo domina las aguas donde el buque de guerra HMAS Sydney se hundió en 1941 con sus 645 tripulantes tras una batalla contra un corsario alemán disfrazado, la mayor pérdida de vidas registrada por la Armada Real Australiana.|Le vent côtier de Geraldton souffle du sud si régulièrement chaque après-midi que les véliplanchistes le classent parmi les meilleures conditions au monde, et un parc éolien construit à partir de 2011 utilise ces mêmes rafales pour fournir une large part de l'électricité de la ville. Un mémorial à coupole sur un promontoire surplombe les eaux où le navire de guerre HMAS Sydney a coulé en 1941 avec ses 645 hommes après un combat contre un raider allemand déguisé, la plus lourde perte humaine jamais enregistrée par la marine royale australienne.|ジェラルトンの海風は毎日午後、南からあまりに規則正しく吹くため、ウィンドサーファーからは世界屈指の好条件と評されている。2011年から稼働する風力発電所は同じ風を使って町の電力の多くをまかなう。岬の上のドーム型記念碑は、1941年に偽装したドイツの仮装巡洋艦との交戦で645人全員とともに沈んだ軍艦シドニー号の海域を見下ろしている。オーストラリア海軍史上最大の人命損失である。",
    [prop("HMAS Sydney Memorial Dome|Cúpula memorial del HMAS Sydney|Coupole mémorielle du HMAS Sydney|シドニー号記念ドーム", 420, 87),
     prop("Windsurfer Beach Point|Punta de playa de windsurf|Pointe de plage pour véliplanchistes|ウィンドサーフィンのビーチポイント", 260, 54)],
  ),
  albany: city(
    "Albany|Albany|Albany|オールバニ",
    117.88, -35.02, "wa", "whale", "whalingstation", "r",
    "The last whaling station in Australia to close|La última estación ballenera de Australia en cerrar|La dernière station baleinière d'Australie à fermer|オーストラリアで最後まで残った捕鯨基地",
    "Albany's Cheynes Beach whaling station kept harpooning sperm whales until 1978, the last such operation in Australia, and its flensing deck and try-pots are now preserved as a museum rather than demolished. Decades earlier, in 1914, the last Australian and New Zealand troopships bound for the First World War gathered in the harbour here before departure, and a clifftop memorial now overlooks the same waters they sailed from.|La estación ballenera de Cheynes Beach en Albany siguió arponeando cachalotes hasta 1978, la última operación así en Australia, y su cubierta de despiece y sus calderas se conservan hoy como museo en vez de demolerse. Décadas antes, en 1914, los últimos buques de tropas australianos y neozelandeses rumbo a la Primera Guerra Mundial se reunieron en este puerto antes de zarpar, y un memorial en el acantilado domina hoy las mismas aguas desde las que partieron.|La station baleinière de Cheynes Beach à Albany continua de harponner des cachalots jusqu'en 1978, la dernière exploitation de ce type en Australie, et son pont de dépeçage et ses chaudrons sont aujourd'hui préservés en musée plutôt que démolis. Des décennies plus tôt, en 1914, les derniers navires de troupes australiens et néo-zélandais en route vers la Première Guerre mondiale se rassemblèrent dans ce port avant leur départ, et un mémorial sur la falaise surplombe aujourd'hui les mêmes eaux d'où ils partirent.|オールバニのシェインズ・ビーチ捕鯨基地は1978年までマッコウクジラの捕鯨を続けた、オーストラリアで最後まで残った操業だった。解体甲板と煮沸釜は取り壊されずいまも博物館として保存されている。それより数十年前の1914年、第一次世界大戦へ向かうオーストラリア・ニュージーランド最後の輸送船団はこの港に集結してから出航した。崖の上の記念碑は、いまもその出港した海を見下ろしている。",
    [prop("Whaling Station Try-Pots|Calderas de la estación ballenera|Chaudrons de la station baleinière|捕鯨基地の煮沸釜", 380, 78),
     prop("Convoy Departure Clifftop|Acantilado de partida del convoy|Falaise du départ du convoi|船団出港の崖", 300, 62)],
  ),
  "port-hedland": city(
    "Port Hedland|Port Hedland|Port Hedland|ポート・ヘッドランド",
    118.60, -20.32, "wa", "ironore", "ironport", "l",
    "The port that loads the world's biggest ore ships|El puerto que carga los mayores buques mineraleros del mundo|Le port qui charge les plus gros minéraliers du monde|世界最大級の鉱石船に積み込む港",
    "Port Hedland ships more iron ore by tonnage than any other port on Earth, loading trains up to 2.5 km long that arrive from Pilbara mines several hundred kilometres inland onto ore carriers waiting in a harbour dredged through mangrove tidal flats. The red dust from the stockpiles settles so thoroughly over the town that houses are repainted more often than in most of the country, and locals half-joke that everything eventually turns the same rust colour.|Port Hedland embarca más mineral de hierro en toneladas que cualquier otro puerto del planeta, cargando trenes de hasta 2,5 km que llegan desde minas de Pilbara a cientos de kilómetros tierra adentro hasta graneleros que esperan en un puerto dragado entre manglares mareales. El polvo rojo de los acopios se asienta tan a fondo sobre el pueblo que las casas se repintan con más frecuencia que en casi todo el resto del país, y los vecinos bromean a medias con que todo acaba tomando el mismo color óxido.|Port Hedland expédie plus de minerai de fer en tonnage que tout autre port au monde, chargeant des trains atteignant 2,5 km de long venus de mines du Pilbara à plusieurs centaines de kilomètres à l'intérieur des terres sur des minéraliers attendant dans un port dragué à travers des mangroves intertidales. La poussière rouge des stocks se dépose si densément sur la ville que les maisons y sont repeintes plus souvent que presque partout ailleurs dans le pays, et les habitants plaisantent à moitié que tout finit par prendre la même couleur rouille.|ポート・ヘッドランドはトン数で世界のどの港よりも多くの鉄鉱石を積み出している。数百km内陸のピルバラの鉱山から最長2.5kmもの貨物列車が到着し、マングローブの干潟を浚渫して造られた港で待つ鉱石船に積み込まれる。集積場の赤い粉塵は町全体にすっかり降り積もるため、家はほかの地域より頻繁に塗り直され、地元の人は「結局すべて同じ錆色になる」と半ば冗談めかして言う。",
    [prop("Ore Stockpile Loader|Cargador del acopio de mineral|Chargeur du stock de minerai|鉱石集積場の積み込み機", 620, 128),
     prop("Mangrove Tidal Harbour|Puerto mareal de manglares|Port intertidal de mangrove|マングローブ干潟の港", 260, 54)],
  ),

  // ---------------------------------------------------------------------
  // sa — 南オーストラリア(5)
  // ---------------------------------------------------------------------
  adelaide: city(
    "Adelaide|Adelaida|Adélaïde|アデレード",
    138.60, -34.93, "sa", "spire", "parklands", "r",
    "A colony planned to have no convicts|Una colonia planeada sin convictos|Une colonie pensée sans bagnards|流刑者を送らないよう計画された植民地",
    "Adelaide was laid out in 1836 by Colonel William Light as South Australia's only free colony, never a penal settlement, ringed by a mile-wide belt of parkland that still separates the city grid from its suburbs. Enough of its original churches survive that the city is nicknamed “the City of Churches”, though today its most crowded address each March is the arts festival that takes over those same parklands.|Adelaida fue trazada en 1836 por el coronel William Light como la única colonia libre de Australia Meridional, nunca un asentamiento penal, rodeada por un cinturón de parque de una milla de ancho que aún separa la cuadrícula urbana de sus suburbios. Sobreviven tantas de sus iglesias originales que la ciudad se apoda “la Ciudad de las Iglesias”, aunque hoy su dirección más concurrida cada marzo es el festival de artes que ocupa esos mismos parques.|Adélaïde fut tracée en 1836 par le colonel William Light comme l'unique colonie libre d'Australie-Méridionale, jamais une colonie pénitentiaire, ceinturée d'une bande de parc d'un mile de large qui sépare encore la grille urbaine de ses banlieues. Assez de ses églises d'origine ont survécu pour que la ville soit surnommée « la Ville aux Églises », bien que son adresse la plus fréquentée chaque mars soit aujourd'hui le festival des arts qui envahit ces mêmes parcs.|アデレードは1836年、ウィリアム・ライト大佐によって、南オーストラリアで唯一の自由移民による植民地として設計された。流刑地になったことは一度もない。幅1マイルの緑地帯が街区と郊外を隔てるように取り囲み、いまも残る。当初の教会の多くがいまも残るため「教会の街」と呼ばれるが、毎年3月にいちばん賑わうのは、その同じ公園を占拠する芸術祭のほうである。",
    [prop("Rundle Mall Church Corner|Esquina de iglesia de Rundle Mall|Coin d'église de Rundle Mall|ランドル・モールの教会角", 480, 99),
     prop("Adelaide Oval Riverbank|Ribera del Adelaide Oval|Berge de l'Adelaide Oval|アデレード・オーバルの川岸", 900, 185)],
  ),
  "port-augusta": city(
    "Port Augusta|Port Augusta|Port Augusta|ポート・オーガスタ",
    137.77, -32.49, "sa", "crossroads", "railjunction", "r",
    "The junction where every transcontinental line meets|El cruce donde se encuentran todas las líneas transcontinentales|Le carrefour où se rejoignent toutes les lignes transcontinentales|大陸横断路線がすべて交わる分岐点",
    "Port Augusta calls itself the “Crossroads of Australia” because the Indian Pacific and the Ghan both pass through it on their way east-west and north-south, the only town on the continent where those two transcontinental routes meet. Its coal-fired power stations, once the backbone of South Australia's electricity, were demolished in 2018 to make way for one of the country's largest solar-thermal plants, built to catch the same relentless outback sun the town otherwise struggles to shelter from.|Port Augusta se autodenomina el “Cruce de Australia” porque tanto el Indian Pacific como el Ghan pasan por ella en sus rutas este-oeste y norte-sur, el único pueblo del continente donde se cruzan esas dos rutas transcontinentales. Sus centrales térmicas de carbón, antaño columna vertebral de la electricidad de Australia Meridional, se demolieron en 2018 para dar paso a una de las mayores plantas termosolares del país, construida para aprovechar el mismo sol implacable del outback del que el pueblo por lo demás apenas puede resguardarse.|Port Augusta se surnomme le « carrefour de l'Australie » car l'Indian Pacific et le Ghan y passent tous deux sur leurs trajets est-ouest et nord-sud, seule ville du continent où ces deux lignes transcontinentales se croisent. Ses centrales à charbon, jadis colonne vertébrale de l'électricité d'Australie-Méridionale, furent démolies en 2018 pour céder la place à l'une des plus grandes centrales solaires thermiques du pays, bâtie pour capter ce même soleil implacable de l'outback dont la ville a par ailleurs bien du mal à se protéger.|ポート・オーガスタは自らを「オーストラリアの十字路」と呼ぶ。インディアン・パシフィック号とザ・ガン号がそれぞれ東西・南北に通るこの町だけが、二つの大陸横断路線が交わる場所だからである。かつて南オーストラリア州の電力を支えた石炭火力発電所は2018年に解体され、跡地には国内有数の太陽熱発電所が建てられた。ふだんは逃げ場のない容赦ないアウトバックの日差しを、今度は逆手に取って利用している。",
    [prop("Transcontinental Junction Signal|Señal del cruce transcontinental|Signal du carrefour transcontinental|大陸横断路線の分岐信号", 400, 82),
     prop("Solar-Thermal Plant Gate|Puerta de la planta termosolar|Portail de la centrale solaire thermique|太陽熱発電所の門", 620, 128)],
  ),
  "coober-pedy": city(
    "Coober Pedy|Coober Pedy|Coober Pedy|クーバー・ペディ",
    134.75, -29.01, "sa", "underground", "dugout", "l",
    "A town that moved underground to escape the heat|Un pueblo que se mudó bajo tierra para escapar del calor|Une ville qui s'est enterrée pour échapper à la chaleur|暑さを逃れて地下に移り住んだ町",
    "Coober Pedy's name is generally traced to an Aboriginal phrase often translated as “white man in a hole”, after opal miners began digging homes into the hillsides from the 1910s to escape surface temperatures that regularly top 40°C, and roughly half the town's residents still live underground today. It produces most of the world's gem-quality opal, and the pale mullock heaps of excavated rock dotting the surrounding desert have doubled as film sets for the Moon and Mars in productions needing a landscape with no vegetation at all.|El nombre de Coober Pedy suele rastrearse a una frase aborigen a menudo traducida como “hombre blanco en un agujero”, desde que los mineros de ópalo empezaron a excavar viviendas en las laderas desde la década de 1910 para escapar de temperaturas en superficie que superan a menudo los 40 °C, y hoy casi la mitad de los residentes del pueblo siguen viviendo bajo tierra. Produce la mayor parte del ópalo de calidad gema del mundo, y las pálidas escombreras de roca excavada que salpican el desierto circundante han servido también de escenario lunar y marciano en producciones que necesitaban un paisaje sin vegetación alguna.|Le nom de Coober Pedy remonte généralement à une expression aborigène souvent traduite par « homme blanc dans un trou », depuis que des mineurs d'opale commencèrent dès les années 1910 à creuser des habitations dans les collines pour échapper à des températures de surface dépassant régulièrement 40 °C, et environ la moitié des habitants de la ville vivent encore aujourd'hui sous terre. Elle produit la majeure partie de l'opale de qualité gemme du monde, et les pâles terrils de roche excavée qui parsèment le désert environnant ont aussi servi de décor lunaire et martien pour des productions ayant besoin d'un paysage totalement dépourvu de végétation.|クーバー・ピディという地名は一般に、あるアボリジナルの言葉に由来するとされ、しばしば「穴の中の白人」と訳される。1910年代、オパール採掘者たちが地表でしばしば40度を超える暑さを逃れるため丘の斜面に住居を掘り始めたことにちなむ。いまも住民のおよそ半分が地下暮らしを続けている。この町は世界の宝石質オパールの大半を産出し、周囲の砂漠に点在する採掘くずの白っぽい山は、植生のまったくない風景を必要とする映画の月面・火星のロケ地としても使われてきた。",
    [prop("Underground Opal Dugout Home|Vivienda subterránea excavada|Maison troglodyte souterraine|地下掘りのオパール採掘住居", 340, 70),
     prop("Mullock Heap Opal Field|Campo de ópalo con escombreras|Champ d'opale aux terrils|採掘くず山のオパール鉱区", 220, 45)],
  ),
  "mount-gambier": city(
    "Mount Gambier|Mount Gambier|Mount Gambier|マウント・ガンビア",
    140.78, -37.83, "sa", "crater", "bluelake", "r",
    "A crater lake that changes colour every November|Un lago de cráter que cambia de color cada noviembre|Un lac de cratère qui change de couleur chaque novembre|毎年11月に色を変える火口湖",
    "The Blue Lake fills a volcanic crater last active only a few thousand years ago, geologically recent enough that the mountain is not considered fully extinct, and every November the water turns from a dull winter grey to a vivid cobalt blue within about two weeks, a shift still not fully explained despite decades of study. The town's cave-riddled limestone also lets residents grow gardens in a sunken sinkhole in the middle of the main street, cooled and sheltered several metres below street level.|El Lago Azul llena un cráter volcánico activo por última vez hace solo unos pocos miles de años, lo bastante reciente en términos geológicos como para que la montaña no se considere del todo extinta, y cada noviembre el agua pasa de un gris invernal apagado a un azul cobalto vivo en apenas dos semanas, un cambio que décadas de estudio aún no explican del todo. La piedra caliza agujereada de cuevas del pueblo también permite a los vecinos cultivar jardines en una dolina hundida en plena calle principal, resguardados varios metros bajo el nivel de la calle.|Le lac Bleu remplit un cratère volcanique actif pour la dernière fois il y a seulement quelques milliers d'années, assez récent géologiquement pour que la montagne ne soit pas considérée comme totalement éteinte, et chaque novembre l'eau passe d'un gris terne hivernal à un bleu cobalt éclatant en environ deux semaines, un changement que des décennies d'étude n'expliquent toujours pas complètement. Le calcaire truffé de grottes de la ville permet aussi aux habitants de cultiver des jardins dans une doline effondrée en plein milieu de la rue principale, abrités plusieurs mètres sous le niveau de la chaussée.|ブルー・レイクは、わずか数千年前まで活動していた火山の火口を満たす湖で、地質学的には山がまだ完全に死火山とは言い切れないほど新しい。毎年11月には水がくすんだ冬の灰色から鮮やかなコバルトブルーへと約2週間で変わるが、何十年研究してもこの仕組みはいまだ完全には解明されていない。町の洞窟だらけの石灰岩は、街路の真ん中に沈んだ陥没穴でも庭を作らせてくれる。地表から数メートル下の、涼しく守られた場所である。",
    [prop("Blue Lake Rim Lookout|Mirador del borde del Lago Azul|Belvédère du bord du lac Bleu|ブルー・レイク縁の展望台", 780, 161),
     prop("Sunken Sinkhole Garden|Jardín de la dolina hundida|Jardin de la doline effondrée|沈んだ陥没穴の庭園", 300, 62)],
  ),
  tanunda: city(
    "Tanunda|Tanunda|Tanunda|タヌンダ",
    138.96, -34.53, "sa", "vineyard", "vineyard", "l",
    "A wine valley planted by refugees fleeing religious persecution|Un valle vinícola plantado por refugiados que huían de la persecución religiosa|Une vallée viticole plantée par des réfugiés fuyant la persécution religieuse|信仰の迫害を逃れた移民が拓いたワインの谷",
    "The Barossa Valley's vines were largely planted from the 1840s by Lutheran settlers who had fled religious persecution in Prussia, and some of the shiraz vineyards around Tanunda descend from cuttings never replanted since, among the oldest continuously producing vines of that variety anywhere in the world, having escaped the phylloxera louse that destroyed most of Europe's old vines. Church spires from those same Lutheran congregations still outnumber wine cellar doors along the valley's main road.|Las viñas del valle de Barossa se plantaron en gran parte desde la década de 1840 por colonos luteranos que habían huido de la persecución religiosa en Prusia, y algunos viñedos de shiraz alrededor de Tanunda descienden de esquejes nunca replantados desde entonces, entre las vides de esa variedad más antiguas en producción continua del mundo, al haber escapado a la filoxera que destruyó la mayoría de las viejas viñas europeas. Los campanarios de esas mismas congregaciones luteranas aún superan en número a las puertas de bodegas a lo largo de la carretera principal del valle.|Les vignes de la vallée de Barossa furent en grande partie plantées à partir des années 1840 par des colons luthériens ayant fui la persécution religieuse en Prusse, et certaines vignes de shiraz autour de Tanunda descendent de boutures jamais replantées depuis, parmi les plus anciennes vignes de ce cépage en production continue au monde, ayant échappé au phylloxéra qui détruisit la plupart des vieilles vignes d'Europe. Les clochers de ces mêmes congrégations luthériennes dépassent encore en nombre les portes de caves le long de la route principale de la vallée.|バロッサ・ヴァレーのブドウ畑は主に1840年代から、プロイセンでの宗教弾圧を逃れたルター派の入植者たちによって拓かれた。タヌンダ周辺のシラーズ畑の一部はそれ以来一度も植え替えられていない挿し木の子孫で、ヨーロッパの古木の大半を滅ぼしたフィロキセラ(ブドウネアブラムシ)の被害を免れたため、世界でも指折りの連続生産を続ける古木として知られる。その同じルター派教会の尖塔は、いまも谷の目抜き通り沿いのワイナリーの扉より数が多い。",
    [prop("Old Vine Shiraz Row|Hilera de shiraz de cepa vieja|Rangée de vieilles vignes de shiraz|古木シラーズの畑", 900, 185),
     prop("Lutheran Church Cellar Door|Puerta de bodega junto a la iglesia luterana|Porte de cave près de l'église luthérienne|ルター派教会そばの試飲蔵", 340, 70)],
  ),

  // ---------------------------------------------------------------------
  // tas — タスマニア(4)
  // ---------------------------------------------------------------------
  hobart: city(
    "Hobart|Hobart|Hobart|ホバート",
    147.33, -42.88, "tas", "port", "hobartharbour", "l",
    "The finish line for a race that outran its own weather|La meta de una regata que superó su propio clima|La ligne d'arrivée d'une course qui a défié sa propre météo|自らの荒天を乗り越えたレースのゴール",
    "Hobart's harbour has hosted the finish of the Sydney to Hobart yacht race every Boxing Day since 1945, a 628-nautical-mile run across Bass Strait infamous for the 1998 race in which a sudden storm killed six sailors and forced the abandonment of more than half the fleet. The dolerite cliffs of Mount Wellington rise directly behind the city and can carry snow in the same week the harbour below sits in summer sunshine.|El puerto de Hobart ha acogido la meta de la regata Sídney-Hobart cada 26 de diciembre desde 1945, un recorrido de 628 millas náuticas por el estrecho de Bass tristemente célebre por la edición de 1998, en que una tormenta repentina mató a seis navegantes y obligó a abandonar a más de la mitad de la flota. Los acantilados de dolerita del monte Wellington se alzan justo detrás de la ciudad y pueden tener nieve en la misma semana en que el puerto de abajo disfruta de sol de verano.|Le port de Hobart accueille l'arrivée de la course à voile Sydney-Hobart chaque 26 décembre depuis 1945, un parcours de 628 milles nautiques à travers le détroit de Bass, tristement célèbre pour l'édition de 1998 où une tempête soudaine tua six marins et força l'abandon de plus de la moitié de la flotte. Les falaises de dolérite du mont Wellington s'élèvent juste derrière la ville et peuvent porter de la neige la même semaine où le port en contrebas baigne dans le soleil d'été.|ホバートの港は1945年以来、毎年ボクシングデー(12月26日)に行われるシドニー・ホバート・ヨットレースのゴール地点になっている。バス海峡を渡る628海里のこのレースは、1998年大会で突然の嵐が船員6人の命を奪い、艦隊の半数以上が棄権に追い込まれたことで悪名高い。町の背後にはウェリントン山の輝緑岩の断崖がそびえ、眼下の港が夏の陽射しに包まれる同じ週に山頂には雪が積もることもある。",
    [prop("Sydney-Hobart Finish Line|Línea de meta Sídney-Hobart|Ligne d'arrivée Sydney-Hobart|シドニー・ホバートレースのゴールライン", 780, 161),
     prop("Mount Wellington Snow Road|Carretera nevada del monte Wellington|Route enneigée du mont Wellington|ウェリントン山の雪道", 380, 78)],
  ),
  launceston: city(
    "Launceston|Launceston|Launceston|ランセストン",
    147.14, -41.44, "tas", "gorge", "cataractgorge", "r",
    "A gorge tamed with the world's longest single-span chairlift|Un cañón domado con la telesilla monocable más larga del mundo|Une gorge apprivoisée par le plus long télésiège à portée unique du monde|世界最長の単径間チェアリフトが渡る峡谷",
    "Cataract Gorge cuts through basalt cliffs within easy walking distance of Launceston's city centre, and a chairlift strung across it in 1972 still holds the record for the longest single span of any chairlift in the world, at 308 metres between towers. The gorge's First Basin pool was Australia's first fully engineered public swimming pool when built in the 1890s, using the same river that otherwise periodically reminds the city of flood risk.|El cañón Cataract atraviesa acantilados de basalto a poca distancia a pie del centro de Launceston, y una telesilla tendida sobre él en 1972 aún ostenta el récord del tramo monocable más largo de cualquier telesilla del mundo, con 308 metros entre torres. La piscina del First Basin del cañón fue la primera piscina pública totalmente diseñada de Australia cuando se construyó en la década de 1890, usando el mismo río que por lo demás recuerda periódicamente a la ciudad el riesgo de inundación.|Les gorges de Cataract entaillent des falaises basaltiques à courte distance à pied du centre de Launceston, et un télésiège tendu au-dessus en 1972 détient toujours le record de la plus longue portée unique de tout télésiège au monde, avec 308 mètres entre les pylônes. Le bassin First Basin des gorges fut la première piscine publique entièrement conçue d'Australie lors de sa construction dans les années 1890, utilisant le même cours d'eau qui rappelle par ailleurs périodiquement à la ville le risque d'inondation.|キャタラクト峡谷はランセストン中心部から歩いてすぐの玄武岩の断崖を切り裂いており、1972年に架けられたチェアリフトは支柱間308mという、いまも世界最長の単径間記録を保持している。峡谷のファースト・ベイスンにあるプールは1890年代に造られたオーストラリア初の本格的な公共プールで、同じ川は町にたびたび洪水の危険を思い出させる存在でもある。",
    [prop("Cataract Gorge Chairlift Tower|Torre de la telesilla del cañón Cataract|Pylône du télésiège des gorges de Cataract|キャタラクト峡谷リフトの支柱", 460, 95),
     prop("First Basin Public Pool|Piscina pública del First Basin|Piscine publique du First Basin|ファースト・ベイスンの公共プール", 260, 54)],
  ),
  "port-arthur": city(
    "Port Arthur|Port Arthur|Port Arthur|ポート・アーサー",
    147.85, -43.15, "tas", "convict", "convictruins", "l",
    "A prison colony now kept as a lesson, not a spectacle|Una colonia penal conservada como lección, no como espectáculo|Une colonie pénitentiaire conservée comme leçon, pas comme spectacle|見世物ではなく教訓として保存された流刑地",
    "Port Arthur held convicts transported from Britain between 1830 and 1877, using a design meant to reform through isolation and routine rather than only punish, including a separate prison wing where inmates were kept largely silent and hooded to limit contact with other convicts. Grand as the surviving sandstone ruins look today, the site was inscribed as a UNESCO World Heritage Australian Convict Site in 2010 specifically to preserve the historical record of forced transportation, not to romanticise it.|Port Arthur retuvo a convictos deportados desde Gran Bretaña entre 1830 y 1877, con un diseño pensado para reformar mediante el aislamiento y la rutina y no solo castigar, incluida un ala penitenciaria separada donde los reclusos permanecían en gran parte en silencio y encapuchados para limitar el contacto con otros convictos. Por imponentes que parezcan hoy las ruinas de arenisca que sobreviven, el sitio fue inscrito como Sitio Convicto Australiano Patrimonio de la Humanidad de la UNESCO en 2010 precisamente para preservar el registro histórico del traslado forzoso, no para romantizarlo.|Port Arthur retint des bagnards déportés de Grande-Bretagne entre 1830 et 1877, selon une conception pensée pour réformer par l'isolement et la routine plutôt que seulement punir, avec notamment une aile pénitentiaire séparée où les détenus restaient largement silencieux et encagoulés afin de limiter le contact avec les autres bagnards. Aussi impressionnantes que paraissent aujourd'hui les ruines de grès conservées, le site fut inscrit au patrimoine mondial de l'UNESCO comme site pénitentiaire australien en 2010 précisément pour préserver la mémoire historique de la déportation forcée, non pour la romancer.|ポート・アーサーは1830年から1877年にかけて、英国から流刑された囚人たちを収容した。単なる懲罰ではなく、孤立と規則正しい生活によって更生させることを狙った設計で、他の囚人との接触を減らすため、頭巾をかぶせほぼ無言で過ごさせる独立した監房棟まであった。現存する砂岩の廃墟はいまも壮観に見えるが、この場所が2010年にユネスコ世界遺産「オーストラリアの流刑地遺跡群」に登録されたのは、強制移送の歴史を美化するためではなく、記録として残すためである。",
    [prop("Separate Prison Silent Wing|Ala silenciosa de la prisión separada|Aile silencieuse de la prison séparée|独居棟の沈黙の監房", 480, 99),
     prop("Sandstone Ruins Heritage Walk|Paseo patrimonial de las ruinas de arenisca|Promenade patrimoniale des ruines de grès|砂岩廃墟の遺産散策路", 300, 62)],
  ),
  strahan: city(
    "Strahan|Strahan|Strahan|ストラーン",
    145.33, -42.15, "tas", "wilderness", "rainforest", "r",
    "A river saved by a human chain across its water|Un río salvado por una cadena humana en sus aguas|Une rivière sauvée par une chaîne humaine sur ses eaux|水の上に築いた人間の鎖に守られた川",
    "Strahan sits on Macquarie Harbour, gateway to the Gordon and Franklin Rivers, where a proposed hydroelectric dam in the early 1980s drew thousands of protesters who blockaded the water in small boats, one of Australia's largest environmental campaigns; the dam was stopped after a 1983 High Court ruling and the rivers remain wild and undammed today. The harbour's entrance is nicknamed Hell's Gates, a name convicts gave it after being rowed through to a now-vanished penal settlement further inside.|Strahan se asienta en el puerto de Macquarie, puerta de entrada a los ríos Gordon y Franklin, donde una represa hidroeléctrica propuesta a principios de los ochenta atrajo a miles de manifestantes que bloquearon el agua en pequeñas embarcaciones, una de las mayores campañas ambientales de Australia; la represa se detuvo tras un fallo del Tribunal Superior de 1983 y los ríos siguen hoy salvajes y sin represar. La entrada del puerto se apoda las Puertas del Infierno, nombre que le dieron los convictos tras ser remados a través de ella hacia un asentamiento penal hoy desaparecido más adentro.|Strahan se trouve sur le port de Macquarie, porte d'entrée des rivières Gordon et Franklin, où un barrage hydroélectrique proposé au début des années 1980 attira des milliers de manifestants qui bloquèrent l'eau en petites embarcations, l'une des plus grandes campagnes environnementales d'Australie ; le barrage fut stoppé après un arrêt de la Haute Cour en 1983 et les rivières restent aujourd'hui sauvages et non endiguées. L'entrée du port est surnommée les Portes de l'Enfer, un nom donné par des bagnards conduits à la rame à travers elle vers une colonie pénitentiaire aujourd'hui disparue plus à l'intérieur.|ストラーンはマッコーリー港に面し、ゴードン川とフランクリン川への入口にあたる。1980年代初め、この川に水力発電ダムの建設計画が持ち上がると、数千人の抗議者が小舟で水面を封鎖した。オーストラリア最大級の環境運動の一つで、1983年の高等裁判所判決でダムは止まり、両川はいまも堰き止められないまま野生のまま残っている。港の入口は「地獄の門」と呼ばれる。かつて囚人たちが、いまは消えた奥地の流刑地へ舟で漕がされたときに付けた名だという。",
    [prop("Gordon River Blockade Point|Punto del bloqueo del río Gordon|Point du blocus de la Gordon|ゴードン川封鎖の地点", 340, 70),
     prop("Hell's Gates Harbour Entrance|Entrada del puerto de las Puertas del Infierno|Entrée du port des Portes de l'Enfer|「地獄の門」港の入口", 220, 45)],
  ),

  // ---------------------------------------------------------------------
  // nt — ノーザンテリトリー(4)
  // ---------------------------------------------------------------------
  "alice-springs": city(
    "Alice Springs|Alice Springs|Alice Springs|アリス・スプリングス",
    133.88, -23.70, "nt", "ranges", "outback", "r",
    "A telegraph station named for a waterhole, not a spring|Una estación de telégrafo bautizada por una charca, no un manantial|Une station télégraphique nommée d'après un trou d'eau, pas une source|泉ではなく水たまりにちなんで名付けられた電信局",
    "The town takes its name from a waterhole on the normally dry Todd River, mistaken for a permanent spring when the Overland Telegraph Line's repeater station was built beside it in 1871 and named after Alice Todd, the postmaster-general's wife. The town sits on Arrernte land, and each October the dry riverbed itself becomes the racecourse for the Henley-on-Todd Regatta, where bottomless “boats” are run on foot.|El pueblo toma su nombre de una charca en el habitualmente seco río Todd, confundida con un manantial permanente cuando en 1871 se construyó junto a ella la estación repetidora de la Línea Telegráfica Transcontinental, bautizada en honor a Alice Todd, esposa del director general de correos. El pueblo se asienta en tierras arrernte, y cada octubre el propio lecho seco del río se convierte en pista de carreras para la Regata de Henley-on-Todd, donde se corren a pie “barcos” sin fondo.|La ville tire son nom d'un trou d'eau du Todd, une rivière habituellement à sec, pris pour une source permanente lorsque la station relais de la ligne télégraphique transcontinentale y fut construite en 1871 et baptisée d'après Alice Todd, l'épouse du directeur des postes. La ville se trouve sur les terres des Arrernte, et chaque octobre, le lit asséché de la rivière devient la piste de la régate de Henley-on-Todd, où des « bateaux » sans fond sont menés à la course à pied.|この町の名は、ふだんは干上がっているトッド川の水たまりに由来する。1871年、大陸横断電信線の中継局がそのそばに建てられた際、恒久的な泉と勘違いされ、郵政長官の妻アリス・トッドにちなんで名付けられた。町はアレンテの人々の土地にあり、毎年10月には干上がった川底そのものが競走路になる。底の抜けた“ボート”を担いで走るヘンリー・オン・トッド・レガッタが催される。",
    [prop("Telegraph Station Waterhole|Charca de la estación de telégrafo|Trou d'eau de la station télégraphique|電信局の水たまり", 340, 70),
     prop("Todd River Regatta Ground|Recinto de la regata del río Todd|Terrain de la régate du Todd|トッド川レガッタの会場", 220, 45)],
  ),
  darwin: city(
    "Darwin|Darwin|Darwin|ダーウィン",
    130.84, -12.46, "nt", "port", "tropicalharbour", "l",
    "A city rebuilt twice, by bombs and by a cyclone|Una ciudad reconstruida dos veces, por bombas y por un ciclón|Une ville reconstruite deux fois, par des bombes et par un cyclone|爆撃と台風、二度の壊滅から再建された町",
    "Darwin was bombed by the same Japanese carrier fleet that had attacked Pearl Harbor ten weeks earlier, on 19 February 1942, the largest single attack ever mounted by a foreign power on Australian soil, and the harbour still holds wrecked ships from that raid as dive sites. The city was rebuilt again after Cyclone Tracy destroyed more than 70 percent of its buildings on Christmas Day 1974, and building codes written afterward now require every new home in the region to withstand a direct cyclone hit.|Darwin fue bombardeada por la misma flota de portaaviones japonesa que había atacado Pearl Harbor diez semanas antes, el 19 de febrero de 1942, el mayor ataque único jamás lanzado por una potencia extranjera sobre suelo australiano, y el puerto aún conserva barcos hundidos de esa incursión como sitios de buceo. La ciudad se reconstruyó de nuevo tras destruir el ciclón Tracy más del 70 por ciento de sus edificios el día de Navidad de 1974, y los códigos de construcción redactados después exigen hoy que toda vivienda nueva de la región resista un impacto directo de ciclón.|Darwin fut bombardée par la même flotte de porte-avions japonaise qui avait attaqué Pearl Harbor dix semaines plus tôt, le 19 février 1942, la plus grande attaque jamais menée par une puissance étrangère sur le sol australien, et le port conserve encore des épaves de ce raid comme sites de plongée. La ville fut reconstruite de nouveau après que le cyclone Tracy eut détruit plus de 70 % de ses bâtiments le jour de Noël 1974, et les normes de construction rédigées ensuite exigent désormais que chaque nouvelle habitation de la région résiste à un impact direct de cyclone.|ダーウィンは1942年2月19日、10週間前に真珠湾を攻撃したのと同じ日本の空母艦隊による爆撃を受けた。外国勢力によるオーストラリア本土への攻撃としては史上最大で、港にはいまもその空襲で沈んだ船がダイビングスポットとして残る。町は1974年のクリスマスにサイクロン・トレイシーが建物の7割以上を破壊したあと、再び建て直された。その後定められた建築基準は、この地域の新築住宅すべてにサイクロンの直撃に耐える強度を求めている。",
    [prop("WWII Wreck Dive Site|Pecio de la Segunda Guerra Mundial|Épave de plongée de la Seconde Guerre mondiale|第二次大戦の沈船ダイブサイト", 480, 99),
     prop("Cyclone-Proof Housing Estate|Urbanización a prueba de ciclones|Lotissement résistant aux cyclones|サイクロン耐性住宅地", 340, 70)],
  ),
  katherine: city(
    "Katherine|Katherine|Katherine|キャサリン",
    132.27, -14.47, "nt", "gorge", "gorgecliffs", "r",
    "A gorge with thirteen names for its thirteen chapters|Un cañón con trece nombres para sus trece tramos|Une gorge aux treize noms pour ses treize sections|13の名を持つ13の峡谷",
    "Nitmiluk Gorge, on Jawoyn land, is cut by the Katherine River into 13 separate gorges divided by rock bars that can be walked across in the dry season but vanish under a single connected waterway once the wet season floods arrive, sometimes raising the river more than 20 metres. Katherine's own township grew around a telegraph repeater station in the 1870s and remains the last major service town for travellers on the long run north to Darwin.|El cañón de Nitmiluk, en tierras jawoyn, ha sido tallado por el río Katherine en 13 cañones separados por barras rocosas que se pueden cruzar a pie en la estación seca pero desaparecen bajo un único cauce continuo cuando llegan las crecidas de la temporada de lluvias, a veces elevando el río más de 20 metros. El propio pueblo de Katherine creció en torno a una estación repetidora de telégrafo en la década de 1870 y sigue siendo el último pueblo de servicios importante para los viajeros en el largo tramo hacia el norte hasta Darwin.|Les gorges de Nitmiluk, sur les terres jawoyn, sont creusées par la rivière Katherine en 13 gorges distinctes séparées par des barres rocheuses que l'on peut traverser à pied en saison sèche mais qui disparaissent sous un unique cours d'eau continu quand arrivent les crues de la saison des pluies, élevant parfois la rivière de plus de 20 mètres. Le bourg de Katherine s'est développé autour d'une station relais télégraphique dans les années 1870 et reste la dernière ville-étape importante pour les voyageurs sur le long trajet vers le nord jusqu'à Darwin.|ジャウォインの人々の土地にあるニトミルク峡谷は、キャサリン川によって13の峡谷に刻まれている。乾季には岩の瀬を歩いて渡れるが、雨季の増水が来ると一続きの水路の下に姿を消し、時には川が20m以上も水位を上げる。キャサリンの町自体は1870年代の電信中継局を中心に育ち、ダーウィンへ向かう長い北への道のりで最後の大きな補給の町であり続けている。",
    [prop("Nitmiluk Gorge Rock Bar|Barra rocosa del cañón de Nitmiluk|Barre rocheuse des gorges de Nitmiluk|ニトミルク峡谷の岩の瀬", 400, 82),
     prop("Telegraph Repeater Station Yard|Patio de la estación repetidora de telégrafo|Cour de la station relais télégraphique|電信中継局の敷地", 240, 49)],
  ),
  yulara: city(
    "Yulara|Yulara|Yulara|ユララ",
    130.99, -25.24, "nt", "monolith", "monolith", "l",
    "A rock that has not been climbed since 2019|Una roca que no se ha escalado desde 2019|Un rocher qu'on ne gravit plus depuis 2019|2019年以来、誰も登っていない岩",
    "Uluru rises 348 metres above the surrounding plain and is sacred to the Anangu, its traditional owners, who had asked visitors for decades not to climb it before a permanent climbing ban finally took effect on 26 October 2019, exactly 34 years after the land was formally handed back to them. The resort town of Yulara was purpose-built in the 1980s several kilometres away, out of sight of the rock, so tourist accommodation would not crowd a site the Anangu have cared for over some 65,000 years of continuous connection to this country.|Uluru se eleva 348 metros sobre la llanura circundante y es sagrado para los anangu, sus propietarios tradicionales, quienes durante décadas pidieron a los visitantes que no lo escalaran, hasta que una prohibición permanente entró en vigor el 26 de octubre de 2019, exactamente 34 años después de que la tierra les fuera devuelta oficialmente. El pueblo turístico de Yulara se construyó expresamente en los ochenta a varios kilómetros de distancia, fuera de la vista de la roca, precisamente para que el alojamiento turístico no invadiera un lugar que los anangu han cuidado a lo largo de unos 65.000 años de conexión continua con esta tierra.|Uluru s'élève à 348 mètres au-dessus de la plaine environnante et est sacré pour les Anangu, ses propriétaires traditionnels, qui avaient demandé pendant des décennies aux visiteurs de ne pas y grimper, avant qu'une interdiction permanente n'entre en vigueur le 26 octobre 2019, exactement 34 ans après que la terre leur eut été officiellement restituée. La ville-hôtel de Yulara fut spécialement bâtie dans les années 1980 à plusieurs kilomètres de là, hors de vue du rocher, précisément pour que l'hébergement touristique n'empiète pas sur un site dont les Anangu prennent soin depuis quelque 65 000 ans de lien continu avec cette terre.|ウルルは周囲の平原から348m突き出しており、伝統的な所有者であるアナング族にとって聖なる場所である。彼らは何十年も訪問者に登らないよう求め続け、2019年10月26日、土地が正式に彼らへ返還されてからちょうど34年後に、恒久的な登山禁止がついに実施された。行楽の町ユララは1980年代、岩から数km離れ、視界に入らない場所にわざわざ建てられた。アナングの人々が約6万5千年にわたり途切れることなくこの土地と結んできたつながりを、観光客の宿泊施設で埋め尽くさないためである。",
    [prop("Uluru Base Walk Trailhead|Inicio del sendero base de Uluru|Départ du sentier du tour d'Uluru|ウルル一周歩道の起点", 1200, 247),
     prop("Yulara Resort Lookout|Mirador del complejo de Yulara|Belvédère du complexe de Yulara|ユララ・リゾートの展望台", 380, 78)],
  ),
};

/**
 * 路線(47本)。実在の路線(インディアン・パシフィック号・ザ・ガン号・
 * オーバーランド号・スピリット・オブ・クイーンズランド号など)を骨にしつつ、
 * それらが通らない区間は幹線道路の相当区間で結んでいる
 * (韓国・トルコと同じ考え方)。
 *
 * カルグーリー(wa)を挟むことで、パース—アデレード間の空白(実距離2100km超)
 * が自然に2区間へ割れている。タスマニアへは唯一 "sea" の航路
 * (メルボルン—ランセストン、バス海峡のフェリーに相当)で渡る。
 */
export const AUSTRALIA_EDGES = [
  // --- nsw 内陸(メイン・ウェスタン線・インディアン・パシフィック号のNSW区間) ---
  ["sydney", "katoomba"],
  ["katoomba", "bathurst"],
  ["bathurst", "parkes"],
  ["parkes", "broken-hill"],
  // --- nsw 沿岸・新イングランド(メイン・ノース線) ---
  ["sydney", "newcastle"],
  ["newcastle", "tamworth"],
  ["sydney", "wollongong"],
  // --- nsw-act ---
  ["sydney", "canberra"],
  // --- act-vic(南部高原経由の相当区間) ---
  ["canberra", "sale"],
  // --- vic ---
  ["sale", "melbourne"],
  ["melbourne", "geelong"],
  ["geelong", "ballarat"],
  ["ballarat", "bendigo"],
  ["bendigo", "mildura"],
  ["geelong", "warrnambool"],
  // --- vic-sa(マレー川沿いの相当区間) ---
  ["mildura", "adelaide"],
  // --- sa(オーバーランド号・ザ・ガン号) ---
  ["broken-hill", "port-augusta"],
  ["port-augusta", "adelaide"],
  ["adelaide", "tanunda"],
  // vic-sa境。ポート・オーガスタ直結は実測で海に出る率が高かったため、
  // 実在するプリンセス・ハイウェイ沿い(ウォーナンブール経由)の接続にした(REGISTER.md参照)。
  ["warrnambool", "mount-gambier"],
  ["port-augusta", "coober-pedy"],
  // --- sa-nt(ザ・ガン号) ---
  ["coober-pedy", "alice-springs"],
  // --- nt ---
  ["alice-springs", "yulara"],
  ["alice-springs", "katherine"],
  ["katherine", "darwin"],
  // --- wa(インディアン・パシフィック号) ---
  ["perth", "kalgoorlie"],
  ["kalgoorlie", "port-augusta"], // ナラボー平原越え。カルグーリーを挟んで空白を2区間に割る
  // --- wa 沿岸(ノース・ウェスト・コースタル・ハイウェイ相当) ---
  ["geraldton", "perth"], // 端の順を入れ替え。海に出ていた181px(90%)が解消(check-sea-routes.mjs)
  ["geraldton", "port-hedland"],
  ["broome", "port-hedland"], // 端の順を入れ替え。海に出ていた220px(94%)が解消(check-sea-routes.mjs)
  // --- wa 南西(グレート・サザン鉄道相当) ---
  ["perth", "albany"],
  // --- nsw-qld(パシフィック・ハイウェイ相当) ---
  ["sydney", "gold-coast"],
  ["gold-coast", "brisbane"],
  // --- qld 沿岸(スピリット・オブ・クイーンズランド号) ---
  ["brisbane", "rockhampton"],
  ["mackay", "rockhampton"], // 端の順を入れ替え。海に出ていた122px(81%)が解消(check-sea-routes.mjs)
  ["mackay", "townsville"],
  ["cairns", "townsville"], // 端の順を入れ替え。海に出ていた134px(89%)が解消(check-sea-routes.mjs)
  // --- qld 内陸(スピリット・オブ・アウトバック号相当) ---
  ["rockhampton", "longreach"],
  // --- tas(唯一の航路。バス海峡フェリー相当) ---
  ["melbourne", "launceston", "sea"],
  ["launceston", "hobart"],
  ["launceston", "strahan"],
  ["hobart", "port-arthur"],

  // --- 少し離れた地方をまたぐ補助線(移動の選択肢を増やす。実在の道にならう) ---
  ["adelaide", "warrnambool"], // デュークス・ハイウェイ相当(直行の内陸道路)
  ["melbourne", "ballarat"], // 直行のウェスタン・ハイウェイ
  ["tamworth", "brisbane"], // ニューイングランド・ハイウェイ
  ["katherine", "broome"], // ビクトリア・ハイウェイ(サバンナ・ウェイ)。端の順を入れ替え。海に出ていた368px(64%)が解消(check-sea-routes.mjs)
  ["mildura", "broken-hill"], // シルバー・シティ・ハイウェイ
  ["newcastle", "katoomba"], // ベルズ・ライン・オブ・ロード相当
];
