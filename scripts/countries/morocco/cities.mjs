/**
 * モロッコの都市と路線。
 *
 * 38都市41路線。北部・リーフ7 / 大西洋岸8 / 中部・内陸5 / アトラス山脈5 /
 * 南部・砂漠9 / 東部4。
 *
 * 地方区分は6つ(team-lead の指示どおり): `rif` 北部・リーフ /
 * `atl` 大西洋岸 / `cen` 中部・内陸 / `atm` アトラス山脈 /
 * `sud` 南部・砂漠 / `est` 東部。
 *
 * 経度・緯度は実際の値。投影の範囲は geography.mjs の MOROCCO_PROJ を参照。
 * 西サハラは含めない(南端はタルファヤ・タンタンの緯度で切ってある)。
 *
 * 物件の `cost`/`inc` は他の盤面と同じ内部尺度(S目玉2,600〜3,000 /
 * A大都市900〜1,400 / B中堅350〜650 / C小さな町150〜300、
 * `scripts/content-overrides/property-economy.mjs` 参照)。目玉はマラケシュ(S)。
 *
 * ## `mark`(32種)と `bg`(22種)
 *
 * `mark` は都市ごとにほぼ1対1(似た性格の小さな町だけ隣同士で使い回す:
 * `andalou`=テトゥアン・アシラ、`bayrock`=アル・ホセイマ・ナドール、
 * `artdeco`=カサブランカ・ケニトラ・モハメディア、`trailhead`=イムリル・
 * セッティ・ファトマ、`orchard`=ミデルト・ベルカン)。`bg` は22種で、
 * 性格が近い町どうしで積極的に使い回す(`medina`=フェズ・メクネス、
 * `chalet`=イフレン・アズルー、`countryside`=ベニ・メラル・ミデルト・ベルカン、
 * `mountains`=イムリル・セッティ・ファトマ、`kasbah`=ワルザザート・
 * アイット・ベン・ハドゥ、`palmoasis`=ザゴラ・エルラシディア・フィギッグ、
 * `coastdesert`=シディイフニ・タンタン・タルファヤ、`borderdesert`=ウジダ・タザ)。
 */
import { city, prop } from "../../content-overrides/city-helpers.mjs";

export const MOROCCO_CITIES = {
  // ---------------------------------------------------------------------
  // rif — 北部・リーフ
  // ---------------------------------------------------------------------
  tanger: city(
    "Tangier|Tánger|Tanger|タンジェ",
    -5.8129, 35.7673, "rif", "strait", "strait", "l",
    "A city so international it answered to no single country|Una ciudad tan internacional que no respondía a un solo país|Une ville si internationale qu'elle ne dépendait d'aucun pays|どの国にも属さないほど国際的だった町",
    "From 1925 until Moroccan independence in 1956, Tangier was governed not by Morocco or any single colonial power but as an International Zone jointly run by a committee of foreign consuls, a status that made it a magnet for currency speculators, smugglers and expatriate writers like Paul Bowles and William Burroughs. Cape Spartel, just west of the city, marks the point where the Atlantic and the Mediterranean visibly meet.|Desde 1925 hasta la independencia de Marruecos en 1956, Tánger no fue gobernada por Marruecos ni por ninguna potencia colonial, sino como una Zona Internacional dirigida por un comité de cónsules extranjeros, un estatus que la convirtió en imán para especuladores de divisas, contrabandistas y escritores expatriados como Paul Bowles y William Burroughs. El cabo Espartel, justo al oeste de la ciudad, marca el punto donde el Atlántico y el Mediterráneo se encuentran visiblemente.|De 1925 à l'indépendance du Maroc en 1956, Tanger ne fut gouvernée ni par le Maroc ni par une puissance coloniale unique, mais comme une Zone internationale dirigée par un comité de consuls étrangers, un statut qui en fit un aimant pour spéculateurs monétaires, contrebandiers et écrivains expatriés comme Paul Bowles et William Burroughs. Le cap Spartel, juste à l'ouest de la ville, marque le point où l'Atlantique et la Méditerranée se rencontrent visiblement.|1925年からモロッコ独立の1956年まで、タンジェはモロッコにも単一の植民地宗主国にも統治されず、外国領事たちの委員会が共同運営する「国際ゾーン」として扱われた。この特殊な地位は通貨投機家や密輸業者、ポール・ボウルズやウィリアム・バロウズといった亡命作家たちを引き寄せる磁石となった。町のすぐ西にあるスパルテル岬は、大西洋と地中海が目に見える形で出会う地点である。",
    [prop("Cape Spartel Lighthouse|Faro del cabo Espartel|Phare du cap Spartel|スパルテル岬の灯台", 1100, 228),
     prop("American Legation Museum|Museo de la Legación Americana|Musée de la Légation américaine|アメリカ公使館博物館", 700, 144)],
  ),
  tetouan: city(
    "Tetouan|Tetuán|Tétouan|テトゥアン",
    -5.3684, 35.5785, "rif", "andalou", "andalou", "l",
    "The Moroccan medina built to remember Granada|La medina marroquí construida para recordar Granada|La médina marocaine bâtie pour se souvenir de Grenade|グラナダを偲んで築かれたモロッコの旧市街",
    "Tetouan's medina was largely rebuilt from the late 15th century by Muslim and Jewish refugees expelled from Granada, who laid it out closely enough to echo the Andalusian city they'd lost that the medina is still nicknamed \"the daughter of Granada.\" Wrought-iron balconies and tiled patios, rare elsewhere in Morocco, survive here as a direct result.|La medina de Tetuán se reconstruyó en gran parte desde finales del siglo XV por refugiados musulmanes y judíos expulsados de Granada, que la trazaron con un parecido tan cercano a la ciudad andaluza perdida que la medina todavía se apoda «la hija de Granada». Los balcones de forja y los patios de azulejos, raros en el resto de Marruecos, sobreviven aquí como resultado directo.|La médina de Tétouan fut largement reconstruite dès la fin du XVe siècle par des réfugiés musulmans et juifs expulsés de Grenade, qui la tracèrent avec une ressemblance si étroite à la ville andalouse perdue que la médina est encore surnommée « la fille de Grenade ». Les balcons en fer forgé et les patios carrelés, rares ailleurs au Maroc, en sont un héritage direct.|テトゥアンの旧市街は15世紀末以降、グラナダを追われたムスリムとユダヤ教徒の難民たちによって大きく作り直され、失われたアンダルシアの町を思わせるほど似せて設計されたため、いまも「グラナダの娘」の異名を持つ。他のモロッコの町ではまれな鍛鉄のバルコニーとタイル張りの中庭は、その直接の名残である。",
    [prop("Feddan Square Fountain|Fuente de la Plaza Feddan|Fontaine de la place Feddane|フェダン広場の噴水", 480, 100),
     prop("Ensanche Quarter Villa|Villa del barrio Ensanche|Villa du quartier Ensanche|エンサンチェ地区の邸宅", 320, 66)],
  ),
  chefchaouen: city(
    "Chefchaouen|Chefchaouen|Chefchaouen|シェフシャウエン",
    -5.2636, 35.1688, "rif", "bluewalls", "bluewalls", "r",
    "A fortress town that ended up painted entirely blue|Una fortaleza que acabó pintada entera de azul|Une forteresse devenue entièrement bleue|丸ごと青に塗られた砦の町",
    "Chefchaouen was founded in 1471 as a fortress from which the sharif Moulay Ali ibn Rashid could strike at Portuguese-held ports along the coast, centuries before a single wall here was painted blue. Local guides usually credit Jewish refugees who settled in the town in the 1930s for starting the blue-wash tradition, though historians note that the color only spread to cover nearly the whole medina within living memory, well after that story is set.|Chefchaouen se fundó en 1471 como fortaleza desde la que el jerife Muley Ali ibn Rashid podía atacar los puertos controlados por los portugueses en la costa, siglos antes de que se pintara de azul un solo muro. Los guías locales suelen atribuir el inicio de la tradición del añil a los refugiados judíos que se asentaron en la ciudad en los años treinta, aunque los historiadores señalan que el color solo llegó a cubrir casi toda la medina dentro de la memoria viva, mucho después de esa historia.|Chefchaouen fut fondée en 1471 comme forteresse d'où le chérif Moulay Ali ibn Rachid pouvait frapper les ports tenus par les Portugais sur la côte, des siècles avant qu'un seul mur n'y soit peint en bleu. Les guides locaux attribuent généralement le début de la tradition du badigeon bleu à des réfugiés juifs installés dans la ville dans les années 1930, bien que les historiens notent que la couleur n'a couvert quasiment toute la médina que de mémoire vivante, bien après cette histoire.|シェフシャウエンは1471年、シャリーフのムーレイ・アリー・イブン・ラシードが沿岸のポルトガル領港を襲うための砦として築かれた。壁が青く塗られるようになるのはそれよりずっとあとのことである。地元のガイドはたいてい、1930年代にこの町に移り住んだユダヤ人難民が青い漆喰の伝統を始めたと語るが、歴史家は、旧市街全体がほぼ青一色になったのはその話が語る時代よりもだいぶ後、生きた記憶の範囲内だったと指摘する。",
    [prop("Kasbah Museum Watchtower|Torre de vigilancia del Museo de la Kasbah|Tour de guet du musée de la Kasbah|カスバ博物館の見張り塔", 420, 86),
     prop("Ras El Maa Spring Mill|Molino del manantial de Ras El Maa|Moulin de la source de Ras El Maa|ラス・エル・マーの水源の水車小屋", 280, 58)],
  ),
  asilah: city(
    "Asilah|Asilah|Asilah|アシラ",
    -6.0339, 35.4650, "rif", "andalou", "andalou", "r",
    "Ramparts repainted with new murals every summer|Murallas repintadas con nuevos murales cada verano|Des remparts repeints de nouvelles fresques chaque été|夏ごとに新しい壁画で塗り直される城壁",
    "Asilah's sea walls, originally Portuguese fortifications from the 15th century, have been repainted with fresh murals every summer since 1978 as part of an international arts festival launched by two local artists to revive a town that had fallen into decline. The murals are considered temporary by design and are routinely painted over the following year to make room for new ones.|Las murallas marinas de Asilah, fortificaciones portuguesas originales del siglo XV, se repintan con murales nuevos cada verano desde 1978 como parte de un festival de arte internacional lanzado por dos artistas locales para revivir un pueblo en declive. Los murales se conciben como temporales y suelen repintarse al año siguiente para dejar sitio a otros nuevos.|Les remparts maritimes d'Asilah, fortifications portugaises originelles du XVe siècle, sont repeints de nouvelles fresques chaque été depuis 1978 dans le cadre d'un festival d'art international lancé par deux artistes locaux pour relancer une ville en déclin. Les fresques sont conçues comme temporaires et sont généralement repeintes l'année suivante pour laisser place à de nouvelles œuvres.|アシラの海壁は元は15世紀のポルトガル要塞だが、1978年以来毎年夏、衰退していた町を再生させようと地元の芸術家二人が立ち上げた国際芸術祭の一環として新しい壁画で塗り直されている。壁画は最初から一時的なものとされており、翌年には新しい絵のために上から塗り直されるのが常である。",
    [prop("Ramparts Mural Gallery|Galería de murales de la muralla|Galerie de fresques des remparts|城壁の壁画ギャラリー", 260, 54),
     prop("Palace of Raisuli Courtyard|Patio del Palacio del Raisuni|Cour du palais du Raisuni|ライスニ宮殿の中庭", 190, 40)],
  ),
  alhoceima: city(
    "Al Hoceima|Alhucemas|Al Hoceima|アル・ホセイマ",
    -3.9310, 35.2517, "rif", "bayrock", "rifbay", "b",
    "A bay that once hosted an independent Rif republic — and its defeat|Una bahía que albergó una república rifeña independiente — y su derrota|Une baie qui abrita une république rifaine indépendante — et sa défaite|独立リーフ共和国とその敗北を見た湾",
    "Al Hoceima Bay was the landing site of a major joint Spanish-French amphibious assault in 1925 aimed at crushing the Republic of the Rif, a short-lived independent state proclaimed four years earlier by resistance leader Abd el-Krim after his forces had already handed Spain one of its worst colonial defeats at Annual. A magnitude-6.4 earthquake killed several hundred people here in 2004, and much of the town's newer architecture dates from the rebuilding that followed.|La bahía de Alhucemas fue el lugar de desembarco de un gran asalto anfibio hispano-francés en 1925 dirigido a aplastar la República del Rif, un estado independiente de corta vida proclamado cuatro años antes por el líder de la resistencia Abd el-Krim, tras infligir a España una de sus peores derrotas coloniales en Annual. Un terremoto de magnitud 6,4 mató a varios cientos de personas aquí en 2004.|La baie d'Al Hoceima fut le site d'un vaste débarquement amphibie hispano-français en 1925 visant à écraser la République du Rif, État indépendant éphémère proclamé quatre ans plus tôt par le chef de la résistance Abd el-Krim, après que ses forces eurent infligé à l'Espagne l'une de ses pires défaites coloniales à Annual. Un séisme de magnitude 6,4 a tué plusieurs centaines de personnes ici en 2004.|アル・ホセイマ湾は1925年、独立国「リーフ共和国」を打倒するためのスペイン・フランス合同の大規模上陸作戦の現場だった。この共和国は、抵抗運動の指導者アブド・エル=クリムがアヌアルの戦いでスペインに植民地戦争屈指の大敗を与えたのち、4年前に樹立を宣言した短命の国家である。2004年にはマグニチュード6.4の地震が数百人の命を奪い、町の新しい建物の多くはその後の再建によるものである。",
    [prop("Bay Lookout Point|Mirador de la bahía|Point de vue sur la baie|湾の見晴らし台", 250, 52),
     prop("Peñón View Terrace|Terraza con vistas al Peñón|Terrasse vue sur le Peñón|沖の岩礁を望むテラス", 190, 40)],
  ),
  nador: city(
    "Nador|Nador|Nador|ナドール",
    -2.9287, 35.1688, "rif", "bayrock", "rifbay", "l",
    "A lagoon city built on what crossed the fence next door|Una ciudad de laguna construida sobre lo que cruzaba la valla vecina|Une ville de lagune bâtie sur ce qui franchissait la clôture voisine|隣の柵を越えてくるものの上に築かれた潟の町",
    "Nador sits on the Marchica, a 115-square-kilometre lagoon sealed off from the Mediterranean by a narrow sandbar, and the city grew explosively in the twentieth century largely on cross-border trade with the Spanish enclave of Melilla just up the coast. For decades, an informal economy of goods carried across the border fence by hand, once involving tens of thousands of people a day, was a bigger source of local income than any factory.|Nador está a orillas de la Marchica, una laguna de 115 kilómetros cuadrados separada del Mediterráneo por una estrecha barra de arena, y la ciudad creció de forma explosiva en el siglo XX en gran parte gracias al comercio transfronterizo con el enclave español de Melilla, algo más al norte. Durante décadas, una economía informal de mercancías cruzadas a mano por la valla fronteriza fue una fuente de ingresos mayor que cualquier fábrica.|Nador se dresse sur la Marchica, une lagune de 115 kilomètres carrés séparée de la Méditerranée par un étroit cordon de sable, et la ville a connu une croissance explosive au XXe siècle, en grande partie grâce au commerce transfrontalier avec l'enclave espagnole de Melilla, un peu plus au nord. Pendant des décennies, une économie informelle de marchandises passées à la main par-dessus la clôture frontalière a été une source de revenus plus importante que n'importe quelle usine.|ナドールは地中海から細い砂州で隔てられた面積115平方キロメートルの潟湖マルチカのほとりにあり、20世紀にはすぐ北のスペイン領飛び地メリリャとの越境交易によって爆発的に成長した。何十年ものあいだ、国境のフェンス越しに手で運ばれる非公式の商いは、多いときで一日数万人が関わり、どの工場よりも地元の収入源として大きかった。",
    [prop("Marchica Lagoon Boardwalk|Paseo entablado de la laguna Marchica|Promenade en bois de la lagune Marchica|マルチカ潟の遊歩道", 240, 50),
     prop("Beni Ansar Border Market|Mercado fronterizo de Beni Ansar|Marché frontalier de Beni Ansar|ベニ・アンサール国境市場", 180, 38)],
  ),
  larache: city(
    "Larache|Larache|Larache|ラルシュ",
    -6.1500, 35.1933, "rif", "storks", "andalou", "r",
    "Spanish plazas next to ruins once mistaken for myth|Plazas españolas junto a ruinas confundidas antaño con un mito|Des places espagnoles à côté de ruines jadis prises pour un mythe|かつて神話と誤られた遺跡のそばのスペイン広場",
    "Larache's central Plaza de España, ringed by Spanish Art Nouveau facades from the colonial protectorate era, sits a few kilometres from the ruins of Lixus, a site occupied from Phoenician times through Rome that some ancient geographers identified — almost certainly wrongly — with the mythical garden of the Hesperides. White storks nest on the ruins' broken columns much as they do on rooftops across the town today.|La Plaza de España de Larache, rodeada de fachadas modernistas españolas de la época del protectorado, está a pocos kilómetros de las ruinas de Lixus, un yacimiento ocupado desde época fenicia hasta Roma que algunos geógrafos antiguos identificaron —casi con toda seguridad de forma errónea— con el mítico jardín de las Hespérides. Las cigüeñas blancas anidan en las columnas rotas de las ruinas igual que en los tejados de la ciudad hoy.|La Plaza de España de Larache, ceinte de façades Art nouveau espagnoles de l'époque du protectorat, se trouve à quelques kilomètres des ruines de Lixus, un site occupé depuis l'époque phénicienne jusqu'à Rome que certains géographes antiques identifièrent — presque certainement à tort — au jardin mythique des Hespérides. Des cigognes blanches nichent sur les colonnes brisées des ruines, tout comme sur les toits de la ville aujourd'hui.|ラルシュの中央広場プラサ・デ・エスパーニャは、スペイン保護領時代のアール・ヌーヴォー様式の建物に囲まれ、フェニキア時代からローマ時代まで人が住んだ遺跡リクススから数キロの場所にある。古代の一部の地理学者はこの遺跡を、ほぼ間違いなく誤ってではあるが、神話のヘスペリデスの園と同一視した。遺跡の崩れた円柱には、いまも町じゅうの屋根と同じようにコウノトリが巣を作る。",
    [prop("Plaza de España Balcony|Balcón de la Plaza de España|Balcon de la Plaza de España|プラサ・デ・エスパーニャのバルコニー", 230, 48),
     prop("Lixus Ruins Overlook|Mirador de las ruinas de Lixus|Belvédère des ruines de Lixus|リクスス遺跡の展望台", 170, 36)],
  ),

  // ---------------------------------------------------------------------
  // atl — 大西洋岸
  // ---------------------------------------------------------------------
  rabat: city(
    "Rabat|Rabat|Rabat|ラバト",
    -6.8498, 34.0209, "atl", "hassantower", "capital", "r",
    "A tower left half-built for eight centuries|Una torre a medio construir durante ocho siglos|Une tour laissée à moitié bâtie depuis huit siècles|八百年間、途中で止まったままの塔",
    "The Hassan Tower, begun in 1195 by the Almohad sultan Yaqub al-Mansur, was meant to crown the largest mosque in the Muslim world at the time, but construction stopped at barely half its planned 86-metre height when the sultan died in 1199, and it has stood unfinished for more than eight centuries. Rabat only replaced Fez as the kingdom's capital in 1912, under the French protectorate.|La Torre Hassan, iniciada en 1195 por el sultán almohade Yaqub al-Mansur, debía coronar la mayor mezquita del mundo musulmán de la época, pero la construcción se detuvo apenas a la mitad de su altura prevista de 86 metros cuando el sultán murió en 1199, y ha permanecido inacabada durante más de ocho siglos. Rabat solo sustituyó a Fez como capital del reino en 1912, bajo el protectorado francés.|La tour Hassan, entamée en 1195 par le sultan almohade Yaqub al-Mansour, devait couronner la plus grande mosquée du monde musulman de l'époque, mais le chantier s'arrêta à peine à la moitié de sa hauteur prévue de 86 mètres à la mort du sultan en 1199, et elle est restée inachevée depuis plus de huit siècles. Rabat n'a remplacé Fès comme capitale du royaume qu'en 1912, sous le protectorat français.|1195年、ムワッヒド朝のスルタン、ヤアクーブ・アル=マンスールが着工したハッサンの塔は、当時イスラム世界最大のモスクを戴くはずだったが、1199年にスルタンが没すると計画の高さ86メートルの半分ほどで工事は止まり、以来八百年以上にわたって未完成のまま立っている。ラバトがフェズに代わって王国の首都となったのは、フランス保護領時代の1912年にすぎない。",
    [prop("Hassan Tower Column Row|Hilera de columnas de la Torre Hassan|Rangée de colonnes de la tour Hassan|ハッサンの塔の柱列", 1300, 270),
     prop("Chellah Necropolis Garden|Jardín de la necrópolis de Chellah|Jardin de la nécropole de Chellah|シェラ墓地遺跡の庭園", 950, 196)],
  ),
  casablanca: city(
    "Casablanca|Casablanca|Casablanca|カサブランカ",
    -7.5898, 33.5731, "atl", "artdeco", "metropolis", "b",
    "A blank slate where two eras built their biggest statements|Un lienzo en blanco donde dos épocas hicieron su mayor declaración|Une page blanche où deux époques ont fait leur plus grande déclaration|二つの時代がそれぞれ最大の主張を刻んだ白紙",
    "Casablanca has one of the largest collections of Art Deco architecture anywhere in the world, laid down almost overnight in the 1920s and 30s as French urban planners used the city as a blank-slate laboratory for modern design. The Hassan II Mosque, completed in 1993, was built with one wall standing directly over the Atlantic and a minaret whose laser once beamed toward Mecca each night, visible from ships far out at sea.|Casablanca alberga una de las mayores colecciones de arquitectura Art Déco del mundo, levantada casi de la noche a la mañana en los años veinte y treinta cuando los urbanistas franceses usaron la ciudad como laboratorio en blanco para el diseño moderno. La mezquita Hassan II, terminada en 1993, se construyó con un muro justo sobre el Atlántico y un minarete cuyo láser apuntaba antaño cada noche hacia La Meca.|Casablanca possède l'une des plus grandes collections d'architecture Art déco au monde, bâtie presque du jour au lendemain dans les années 1920 et 1930 quand les urbanistes français firent de la ville un laboratoire vierge pour le design moderne. La mosquée Hassan II, achevée en 1993, fut construite avec un mur donnant directement sur l'Atlantique et un minaret dont le laser pointait jadis chaque nuit vers La Mecque.|カサブランカは世界でも指折りのアール・デコ建築群を擁し、1920〜30年代にフランス人都市計画家がこの町を近代デザインの白紙の実験場としたことで、ほとんど一夜にして築かれた。1993年に完成したハッサン2世モスクは、壁の一枚が大西洋に直接面するよう建てられ、その尖塔からはかつて毎晩メッカの方角へレーザー光が放たれ、はるか沖の船からも見えた。",
    [prop("Hassan II Mosque Esplanade|Explanada de la mezquita Hassan II|Esplanade de la mosquée Hassan II|ハッサン2世モスクの広場", 1400, 290),
     prop("Art Deco Cinema Rialto|Cine Art Déco Rialto|Cinéma Art déco Rialto|アール・デコの映画館リアルト", 900, 186)],
  ),
  kenitra: city(
    "Kenitra|Kenitra|Kénitra|ケニトラ",
    -6.5802, 34.2610, "atl", "artdeco", "metropolis", "l",
    "A river port planned to be great that never quite was|Un puerto fluvial planeado para ser grande que nunca lo fue del todo|Un port fluvial pensé pour être grand qui ne le devint jamais tout à fait|偉大な川港になるはずが、なりきれなかった町",
    "Kenitra was founded from scratch in 1913 by the French as Port Lyautey, laid out around a planned river harbour on the Sebou that never became the major port its planners intended, since the river silted too easily for large ships. The United States operated a naval air station here from the Second World War until 1978, and the runways it left behind are still used by the Royal Moroccan Air Force today.|Kenitra fue fundada de la nada en 1913 por los franceses como Port Lyautey, trazada en torno a un puerto fluvial planeado en el Sebú que nunca llegó a ser el gran puerto previsto, ya que el río se colmataba con demasiada facilidad para barcos grandes. Estados Unidos operó aquí una base aeronaval desde la Segunda Guerra Mundial hasta 1978.|Kenitra fut fondée de toutes pièces en 1913 par les Français sous le nom de Port-Lyautey, organisée autour d'un port fluvial planifié sur le Sebou qui ne devint jamais le grand port prévu, le fleuve s'envasant trop facilement pour les gros navires. Les États-Unis y exploitèrent une base aéronavale de la Seconde Guerre mondiale jusqu'en 1978.|ケニトラは1913年、フランスによって「ポール・リョーテ」として一から築かれた町で、セブー川に計画港を築く構想だったが、川がすぐに土砂で埋まり大型船には向かず、計画されていた大港にはついになれなかった。第二次世界大戦から1978年まではアメリカ海軍の航空基地がここに置かれ、その名残の滑走路はいまもモロッコ王立空軍に使われている。",
    [prop("Sebou River Marina|Marina del río Sebú|Marina du fleuve Sebou|セブー川のマリーナ", 400, 82),
     prop("Former Air Base Hangar|Hangar de la antigua base aérea|Hangar de l'ancienne base aérienne|旧航空基地の格納庫", 260, 54)],
  ),
  eljadida: city(
    "El Jadida|El Jadida|El Jadida|エルジャディダ",
    -8.5007, 33.2549, "atl", "cistern", "cistern", "r",
    "A Portuguese fortress that outlasted every other Portuguese fortress here|Una fortaleza portuguesa que sobrevivió a todas las demás fortalezas portuguesas de aquí|Une forteresse portugaise qui a survécu à toutes les autres forteresses portugaises d'ici|ここにあった他のどのポルトガル要塞よりも長く残った砦",
    "Mazagan, the fortified Portuguese trading post that is now El Jadida's old town, was built starting in 1514 and held by Portugal until 1769, one of the last Portuguese footholds anywhere on the Moroccan coast. Its underground cistern, built to store water for a long siege, owes its famous mirror-like reflection to a hole accidentally cut into the ceiling during later road works, which lets in the single shaft of light the room is now known for.|Mazagán, el enclave comercial portugués fortificado que hoy es el casco antiguo de El Jadida, se construyó a partir de 1514 y estuvo en manos portuguesas hasta 1769, uno de los últimos bastiones de Portugal en toda la costa marroquí. Su cisterna subterránea debe su famoso reflejo de espejo a un agujero abierto sin querer en el techo durante obras viales posteriores.|Mazagan, le comptoir portugais fortifié qui forme aujourd'hui la vieille ville d'El Jadida, fut bâti à partir de 1514 et resté portugais jusqu'en 1769, l'un des derniers bastions du Portugal sur toute la côte marocaine. Sa citerne souterraine doit son célèbre reflet miroir à un trou percé par accident dans le plafond lors de travaux routiers ultérieurs.|いまエルジャディダの旧市街となっているポルトガルの要塞商館マザガンは1514年から築かれ、1769年までポルトガルの手にあり、モロッコ沿岸に残ったポルトガルの拠点としては最後の一つだった。長期の籠城に備えて水を貯めるために造られた地下貯水槽が有名な鏡のような反射を見せるのは、後年の道路工事で天井にたまたま開けられた穴から一筋の光が差し込むためである。",
    [prop("Portuguese Cistern Reflection Hall|Sala del reflejo de la cisterna portuguesa|Salle du reflet de la citerne portugaise|ポルトガル貯水槽の反射の間", 460, 96),
     prop("Mazagan Ramparts Walk|Paseo por las murallas de Mazagán|Promenade des remparts de Mazagan|マザガン城壁の遊歩道", 300, 62)],
  ),
  safi: city(
    "Safi|Safi|Safi|サフィ",
    -9.2372, 32.2994, "atl", "pottery", "pottery", "l",
    "Blue-green pottery from clay dug up the road|Cerámica azul verdosa con arcilla sacada calle arriba|Poterie bleu-vert d'une argile extraite au bout de la rue|通りの先で掘った粘土で作る青緑の陶器",
    "Safi's potters' quarter has worked the same reddish clay dug from a single hillside on the edge of town for centuries, glazing it in a blue-green color distinctive enough that pieces are recognized across Morocco simply as \"Safi ware.\" The city was also, for much of the twentieth century, one of the world's largest sardine ports, with a fleet that at its peak could land more fish in a season than some countries caught in a year.|El barrio alfarero de Safi lleva siglos trabajando la misma arcilla rojiza extraída de una única colina en las afueras, esmaltada en un azul verdoso tan característico que las piezas se reconocen en todo Marruecos simplemente como «cerámica de Safi». La ciudad fue también, durante buena parte del siglo XX, uno de los mayores puertos sardineros del mundo.|Le quartier des potiers de Safi travaille depuis des siècles la même argile rougeâtre extraite d'une unique colline en périphérie, la glaçant d'un bleu-vert si caractéristique que les pièces sont reconnues dans tout le Maroc simplement comme de la « poterie de Safi ». La ville fut aussi, pendant une bonne partie du XXe siècle, l'un des plus grands ports sardiniers du monde.|サフィの陶工地区は町外れのひとつの丘から掘り出す赤みがかった同じ粘土を何世紀も使い続け、青緑の釉薬をかけたその器はモロッコじゅうで単に「サフィ焼き」として通じるほど特徴的である。この町は20世紀の大半、世界有数のイワシ漁港でもあり、最盛期の船団は一シーズンで、ある国の一年分の漁獲量を上回る魚を水揚げしたこともあった。",
    [prop("Potters' Quarter Kiln|Horno del barrio alfarero|Four du quartier des potiers|陶工地区の窯", 420, 86),
     prop("Sardine Fleet Quay|Muelle de la flota sardinera|Quai de la flottille sardinière|イワシ船団の埠頭", 280, 58)],
  ),
  essaouira: city(
    "Essaouira|Essaouira|Essaouira|エッサウィラ",
    -9.7595, 31.5085, "atl", "skala", "skala", "r",
    "A purple-dye island that became a Vauban-style port|Una isla de tinte púrpura que se volvió puerto amurallado a la Vauban|Une île à pourpre devenue port fortifié à la Vauban|紫の染料の島が、ヴォーバン様式の要塞港になるまで",
    "In the first century BCE, the Mauretanian king Juba II set up a workshop on the small island just offshore to crush murex sea snails into a purple dye nearly as prized as the Phoenicians' own. The walled town seen today was laid out in the 1760s by the French architect Théodore Cornut for Sultan Mohammed III, who wanted a single fortified port to channel Morocco's Atlantic trade — its straight streets and sea-facing bastions echo Saint-Malo because that was the model Cornut had trained on.|En el siglo I a. C., el rey mauritano Juba II instaló un taller en la pequeña isla frente a la costa para triturar caracoles múrice y obtener un tinte púrpura casi tan preciado como el de los fenicios. La ciudad amurallada de hoy la trazó en la década de 1760 el arquitecto francés Théodore Cornut para el sultán Mohamed III, que quería un único puerto fortificado por el que canalizar el comercio atlántico de Marruecos; sus calles rectas y bastiones frente al mar recuerdan a Saint-Malo porque ese fue el modelo con el que se formó Cornut.|Au premier siècle avant J.-C., le roi mauritanien Juba II installa un atelier sur la petite île au large pour broyer des murex et en tirer une teinture pourpre presque aussi prisée que celle des Phéniciens. La ville fortifiée que l'on voit aujourd'hui fut tracée dans les années 1760 par l'architecte français Théodore Cornut pour le sultan Mohammed III, qui voulait un unique port fortifié pour canaliser le commerce atlantique du Maroc ; ses rues droites et ses bastions tournés vers la mer rappellent Saint-Malo, le modèle sur lequel Cornut s'était formé.|紀元前1世紀、マウレタニア王ユバ2世は沖合の小島に工房を築き、アクキガイを砕いてフェニキア人の紫にひけを取らない紫色の染料を作らせた。現在見られる城壁の町は1760年代、フランス人建築家テオドール・コルニュがスルタン・ムハンマド3世のために設計したもので、モロッコの大西洋貿易を一つの要塞港に集約する狙いがあった。まっすぐな通りと海に向いた稜堡がサン・マロを思わせるのは、コルニュがその町で修行した建築家だったからである。",
    [prop("Skala Sea Bastion Cannons|Cañones del bastión marino de la Skala|Canons du bastion maritime de la Skala|スカラ要塞の海に向いた大砲", 620, 128),
     prop("Fish Auction Hall|Lonja de subasta de pescado|Halle de criée aux poissons|魚のセリ場", 380, 78)],
  ),
  agadir: city(
    "Agadir|Agadir|Agadir|アガディール",
    -9.5981, 30.4278, "atl", "resort", "resort", "b",
    "A city moved after fifteen seconds erased it|Una ciudad trasladada después de que quince segundos la borraran|Une ville déplacée après quinze secondes qui l'ont effacée|わずか15秒で消え、場所ごと移された町",
    "A magnitude-5.9 earthquake in February 1960 killed roughly a third of Agadir's population in under fifteen seconds and levelled nearly the entire city; rather than rebuild on the same ground, planners moved the town centre itself and gave modern Agadir Morocco's first seismic building code, while the old kasbah's ruins were left untouched on the hill above as a memorial. Fewer than fifteen years later the rebuilt city had already become the country's leading beach resort.|Un terremoto de magnitud 5,9 en febrero de 1960 mató a cerca de un tercio de la población de Agadir en menos de quince segundos y arrasó casi toda la ciudad; en vez de reconstruir en el mismo terreno, los planificadores trasladaron el propio centro urbano y dotaron a la Agadir moderna del primer código sísmico de Marruecos, mientras las ruinas de la vieja kasbah se dejaron intactas en la colina como memorial.|Un séisme de magnitude 5,9 en février 1960 tua environ un tiers de la population d'Agadir en moins de quinze secondes et rasa presque toute la ville ; plutôt que de reconstruire sur le même sol, les urbanistes déplacèrent le centre-ville lui-même et dotèrent l'Agadir moderne du premier code parasismique du Maroc, tandis que les ruines de l'ancienne kasbah furent laissées intactes sur la colline en mémorial.|1960年2月、マグニチュード5.9の地震はわずか15秒足らずでアガディールの人口のおよそ3分の1を奪い、町のほぼ全域を壊滅させた。都市計画者は同じ土地に建て直すのではなく町の中心そのものを移し、現代のアガディールにモロッコ初の耐震建築基準を与えた。丘の上に残る旧カスバの廃墟は、手を加えられないまま慰霊碑として残されている。",
    [prop("Kasbah Oufella Ruins Overlook|Mirador de las ruinas de la Kasbah Oufella|Belvédère des ruines de la Kasbah Oufella|カスバ・ウフラ廃墟の展望台", 620, 128),
     prop("New Marina Promenade|Paseo de la nueva marina|Promenade de la nouvelle marina|新マリーナの遊歩道", 400, 82)],
  ),
  mohammedia: city(
    "Mohammedia|Mohammedia|Mohammédia|モハメディア",
    -7.3833, 33.6863, "atl", "artdeco", "metropolis", "l",
    "A fishing village that became a WWII invasion beach|Un pueblo de pescadores que se convirtió en playa de invasión de la Segunda Guerra Mundial|Un village de pêcheurs devenu plage de débarquement de la Seconde Guerre mondiale|漁村から第二次大戦の上陸地となった浜",
    "Mohammedia was a small fishing village called Fedala when it became the main landing beach for the American-led invasion of French Morocco on 8 November 1942, one of three simultaneous Operation Torch landings that opened a Second World War front on Vichy French territory. It also now holds Morocco's largest oil refinery, standing within sight of the very same beach.|Mohammedia era un pequeño pueblo pesquero llamado Fedala cuando se convirtió en la principal playa de desembarco de la invasión liderada por Estados Unidos del Marruecos francés el 8 de noviembre de 1942, uno de los tres desembarcos simultáneos de la Operación Torch. Hoy alberga también la mayor refinería de petróleo de Marruecos, a la vista de esa misma playa.|Mohammédia était un petit village de pêcheurs appelé Fedala quand elle devint la principale plage de débarquement de l'invasion américaine du Maroc français le 8 novembre 1942, l'un des trois débarquements simultanés de l'opération Torch. Elle abrite aujourd'hui aussi la plus grande raffinerie de pétrole du Maroc, à portée de vue de cette même plage.|モハメディアはフェダラと呼ばれる小さな漁村だったが、1942年11月8日、フランス領モロッコへのアメリカ主導の侵攻における主要上陸地となった。これは第二次世界大戦でヴィシー・フランス領に戦線を開いた「トーチ作戦」の3か所同時上陸の一つである。いまはその同じ浜を望む場所に、モロッコ最大の石油精製所が建っている。",
    [prop("Refinery Overlook Point|Mirador de la refinería|Point de vue sur la raffinerie|精製所の見晴らし台", 440, 92),
     prop("Fedala Landing Beach Marker|Monumento a la playa de desembarco de Fedala|Stèle de la plage de débarquement de Fedala|フェダラ上陸海岸の記念碑", 290, 60)],
  ),

  // ---------------------------------------------------------------------
  // cen — 中部・内陸
  // ---------------------------------------------------------------------
  fes: city(
    "Fez|Fez|Fès|フェズ",
    -5.0000, 34.0333, "cen", "tannery", "medina", "b",
    "The world's oldest university, still teaching in an unbroken line|La universidad más antigua del mundo, enseñando sin interrupción|La plus vieille université du monde, un enseignement jamais interrompu|途切れず続く、世界最古の大学",
    "The University of al-Qarawiyyin, founded in 859 by a Tunisian merchant's daughter named Fatima al-Fihri, is recognized by UNESCO and Guinness World Records as the oldest continually operating institution of higher learning anywhere. A short walk away, the vats of the Chouara tannery have dyed leather in roughly the same spot for centuries, and workers still chew fresh mint to cut through the smell of the pigeon droppings used to soften the hides.|La Universidad de al-Qarawiyyin, fundada en 859 por Fátima al-Fihri, hija de un comerciante tunecino, está reconocida por la UNESCO y el Libro Guinness de los Récords como la institución de enseñanza superior en funcionamiento continuo más antigua del mundo. A poca distancia, las tinas de la curtiduría de Chouara llevan siglos tiñendo cuero prácticamente en el mismo sitio, y los trabajadores aún mastican menta fresca para aguantar el olor del excremento de paloma que usan para ablandar las pieles.|L'université al-Qarawiyyin, fondée en 859 par Fatima al-Fihri, fille d'un marchand tunisien, est reconnue par l'UNESCO et le Livre Guinness des records comme le plus ancien établissement d'enseignement supérieur en activité continue au monde. Un peu plus loin, les cuves de la tannerie Chouara teignent le cuir presque au même endroit depuis des siècles, et les ouvriers mâchent encore de la menthe fraîche pour tenir face à l'odeur des fientes de pigeon utilisées pour assouplir les peaux.|859年、チュニジア商人の娘ファーティマ・アル=フィフリーが創設したアル=カラウィーイーン大学は、ユネスコとギネス世界記録の両方から、途切れず存続する世界最古の高等教育機関と認められている。少し歩いた先にあるシュアラ革なめし工場の桶は、何世紀もほぼ同じ場所で革を染め続けており、職人はいまも、皮をなめすのに使う鳩の糞の臭いをしのぐため生のミントの葉を噛んでいる。",
    [prop("Chouara Tannery Viewing Terrace|Terraza mirador de la curtiduría Chouara|Terrasse d'observation de la tannerie Chouara|シュアラ革なめし工場の見学テラス", 1300, 270),
     prop("Al-Qarawiyyin Library Reading Room|Sala de lectura de la biblioteca al-Qarawiyyin|Salle de lecture de la bibliothèque al-Qarawiyyin|アル=カラウィーイーン図書館の閲覧室", 900, 186)],
  ),
  meknes: city(
    "Meknes|Mequinez|Meknès|メクネス",
    -5.5473, 33.8935, "cen", "grandgate", "medina", "l",
    "A gate finished only after the sultan who ordered it died|Una puerta terminada solo después de morir el sultán que la encargó|Une porte achevée seulement après la mort du sultan qui l'avait commandée|命じたスルタンの死後にようやく完成した門",
    "Sultan Moulay Ismail, who ruled for 55 years from Meknes and modeled himself partly on his contemporary Louis XIV, built granaries and stables at Heri es-Souani large enough to store feed for 12,000 horses against a siege that never came. Bab Mansour, the monumental gate that still fronts the old imperial city, was finished only after his death by the same architect — a former Christian captive who had converted to Islam.|El sultán Muley Ismail, que gobernó 55 años desde Mequinez y se inspiró en parte en su contemporáneo Luis XIV, construyó graneros y establos en Heri es-Suani lo bastante grandes para almacenar forraje para 12.000 caballos ante un asedio que nunca llegó. Bab Mansur, la puerta monumental que aún preside la vieja ciudad imperial, se terminó solo tras su muerte, por el mismo arquitecto.|Le sultan Moulay Ismaïl, qui régna 55 ans depuis Meknès et s'inspira en partie de son contemporain Louis XIV, fit bâtir à Heri es-Souani des greniers et écuries assez vastes pour stocker le fourrage de 12 000 chevaux en prévision d'un siège qui ne vint jamais. Bab Mansour, la porte monumentale qui domine encore la vieille ville impériale, ne fut achevée qu'après sa mort, par le même architecte.|55年にわたりメクネスから統治し、同時代のルイ14世をどこか手本にしたスルタン、ムーレイ・イスマイルは、ヘリ・エス・スアニに1万2000頭分の馬糧を蓄えられるほど巨大な穀倉と厩舎を築いたが、恐れていた包囲戦はついに来なかった。いまも帝都の正面に立つ壮麗な門バブ・マンスールは、彼の死後になって初めて、同じ建築家(改宗したかつてのキリスト教徒の捕虜)の手で完成した。",
    [prop("Bab Mansour Gate Facade|Fachada de la puerta Bab Mansur|Façade de la porte Bab Mansour|バブ・マンスール門の正面", 1000, 208),
     prop("Heri es-Souani Granary Vault|Bóveda del granero Heri es-Suani|Voûte du grenier Heri es-Souani|ヘリ・エス・スアニ穀倉の丸天井", 650, 134)],
  ),
  marrakech: city(
    "Marrakesh|Marrakech|Marrakech|マラケシュ",
    -7.9811, 31.6295, "cen", "koutoubia", "koutoubia", "b",
    "Three sibling towers, two continents, one dynasty|Tres torres hermanas, dos continentes, una dinastía|Trois tours sœurs, deux continents, une dynastie|三つの姉妹塔、二つの大陸、一つの王朝",
    "The Koutoubia Mosque's minaret, completed in the late 12th century, served as the direct architectural model for both Seville's Giralda and Rabat's Hassan Tower, the Almohad dynasty's three great sibling towers built within a few decades of each other across two continents. The square in front of it, Jemaa el-Fnaa, was named to UNESCO's very first list of intangible cultural heritage in 2001, recognizing that storytelling, music and food in a public square could count as heritage worth protecting in its own right.|El minarete de la mezquita Koutoubia, terminado a finales del siglo XII, sirvió de modelo arquitectónico directo tanto para la Giralda de Sevilla como para la Torre Hassan de Rabat, las tres grandes torres hermanas de la dinastía almohade. La plaza frente a ella, Jemaa el-Fna, entró en 2001 en la primera lista de patrimonio cultural inmaterial de la UNESCO.|Le minaret de la mosquée Koutoubia, achevé à la fin du XIIe siècle, servit de modèle architectural direct à la fois pour la Giralda de Séville et la tour Hassan de Rabat, les trois grandes tours sœurs de la dynastie almohade. La place devant elle, Jemaa el-Fna, fut inscrite en 2001 sur la toute première liste du patrimoine culturel immatériel de l'UNESCO.|12世紀末に完成したクトゥビアモスクの尖塔は、セビリアのヒラルダ塔とラバトのハッサンの塔、両方の直接の建築的手本となった。ムワッヒド朝が二つの大陸にまたがって数十年のうちに建てた三つの姉妹塔である。その前に広がるジャマ・エル・フナ広場は2001年、ユネスコの無形文化遺産の第一号リストに名を連ね、語りや音楽、食といった広場での営みそのものが守るべき遺産たりうると認められた。",
    [prop("Koutoubia Minaret Garden|Jardín del minarete de la Koutoubia|Jardin du minaret de la Koutoubia|クトゥビア尖塔の庭園", 2800, 580),
     prop("Jemaa el-Fnaa Storyteller's Circle|Corro de cuentacuentos de Jemaa el-Fna|Cercle des conteurs de Jemaa el-Fna|ジャマ・エル・フナの語り部の輪", 1200, 248)],
  ),
  volubilis: city(
    "Volubilis|Volubilis|Volubilis|ヴォルビリス",
    -5.5547, 34.0742, "cen", "romanruins", "ruins", "l",
    "Roman mosaics still lying where they were laid|Mosaicos romanos que siguen donde se colocaron|Des mosaïques romaines toujours là où elles furent posées|敷かれた場所にいまも残るローマのモザイク",
    "Volubilis was the administrative capital of the Roman province of Mauretania Tingitana and remained inhabited for centuries after Rome withdrew, with houses whose mosaic floors — scenes of Orpheus, the labours of Hercules, dolphins — still lie largely in place rather than in a museum. The site was still occupied when Moulay Idriss I, founder of Morocco's first Islamic dynasty, arrived nearby in 789, and it lost its remaining population only gradually after the capital moved to Fez.|Volubilis fue la capital administrativa de la provincia romana de Mauritania Tingitana y siguió habitada durante siglos tras la retirada de Roma, con casas cuyos suelos de mosaico —escenas de Orfeo, los trabajos de Hércules, delfines— siguen en gran parte en su sitio y no en un museo. El yacimiento aún estaba ocupado cuando Muley Idriss I llegó cerca en 789.|Volubilis fut la capitale administrative de la province romaine de Maurétanie tingitane et resta habitée des siècles après le retrait de Rome, avec des maisons dont les sols en mosaïque — scènes d'Orphée, travaux d'Hercule, dauphins — restent en grande partie en place plutôt qu'en musée. Le site était encore occupé quand Moulay Idriss Ier arriva à proximité en 789.|ヴォルビリスはローマ属州マウレタニア・ティンギタナの行政首都で、ローマが撤退したのちも何世紀にもわたり人が住み続けた。オルペウスの場面やヘラクレスの功業、イルカを描いたモザイクの床は、いまも博物館ではなく敷かれたその場所に大部分が残っている。モロッコ最初のイスラム王朝の開祖ムーレイ・イドリース1世が789年に近くへやって来たとき、この遺跡にはまだ人が住んでいた。",
    [prop("House of Orpheus Mosaic|Mosaico de la Casa de Orfeo|Mosaïque de la maison d'Orphée|オルペウスの家のモザイク", 280, 58),
     prop("Triumphal Arch of Caracalla|Arco triunfal de Caracalla|Arc de triomphe de Caracalla|カラカラの凱旋門", 200, 42)],
  ),
  benimellal: city(
    "Beni Mellal|Beni Mellal|Beni Mellal|ベニ・メラル",
    -6.3498, 32.3373, "cen", "springs", "countryside", "r",
    "Springs tumbling straight down a cliff into the gardens|Manantiales que caen directamente por un acantilado hasta los jardines|Des sources dévalant droit une falaise jusqu'aux jardins|崖を真っ直ぐ落ちて庭園へ注ぐ湧き水",
    "Beni Mellal sits directly beneath the Atlas escarpment at the edge of the Tadla plain, and the Ain Asserdoun springs that tumble down the cliff behind the town supply water for gardens terraced right into the rock, a cool green pocket above the plain's citrus and olive groves. The plain itself is irrigated largely by a dam-and-canal system completed under the French protectorate in the 1930s, which turned Tadla into one of Morocco's most productive farming regions.|Beni Mellal se asienta justo bajo el escarpe del Atlas, al borde de la llanura de Tadla, y los manantiales de Ain Asserdoun que caen por el acantilado tras el pueblo riegan jardines en terrazas talladas en la roca. La llanura se riega en gran parte gracias a un sistema de presas y canales terminado bajo el protectorado francés en los años treinta.|Beni Mellal se dresse juste sous l'escarpement de l'Atlas, en bordure de la plaine du Tadla, et les sources d'Ain Asserdoun qui dévalent la falaise derrière la ville irriguent des jardins en terrasses taillées dans la roche. La plaine elle-même est irriguée en grande partie par un système de barrages et canaux achevé sous le protectorat français dans les années 1930.|ベニ・メラルはタドラ平野の端、アトラス山脈の断崖のすぐ下に位置し、町の背後の崖を流れ落ちるアイン・アセルドゥーンの湧き水が、岩肌に段々に築かれた庭園を潤す、平野の柑橘とオリーブ畑の上に浮かぶ涼しい緑の一角である。平野そのものは1930年代、フランス保護領時代に完成したダムと運河の体系でおおむね灌漑されており、タドラをモロッコ屈指の農業地帯に変えた。",
    [prop("Ain Asserdoun Terraced Garden|Jardín en terrazas de Ain Asserdoun|Jardin en terrasses d'Ain Asserdoun|アイン・アセルドゥーンの段々庭園", 270, 56),
     prop("Tadla Plain Citrus Grove|Cítricos de la llanura de Tadla|Agrumeraie de la plaine du Tadla|タドラ平野の柑橘畑", 190, 40)],
  ),

  // ---------------------------------------------------------------------
  // atm — アトラス山脈
  // ---------------------------------------------------------------------
  ifrane: city(
    "Ifrane|Ifrane|Ifrane|イフレン",
    -5.1082, 33.5228, "atm", "chalet", "chalet", "b",
    "A ski-chalet town built from nothing in the middle of Morocco|Un pueblo de chalés construido de la nada en pleno Marruecos|Un village de chalets bâti de rien en plein Maroc|モロッコのど真ん中に、何もないところから作られたシャレーの町",
    "French colonial administrators built Ifrane from scratch in 1929 as a hill station, giving it sloped, red-tiled roofs designed to shed snow — a style found almost nowhere else in the country. Ifrane also holds Morocco's official cold record, -23.9°C, set in February 1935, a fact that surprises most people picturing a country of nothing but desert and beaches.|Los administradores coloniales franceses construyeron Ifrane desde cero en 1929 como estación de montaña, con tejados inclinados de tejas rojas pensados para que resbalara la nieve, un estilo que casi no existe en ningún otro lugar del país. Ifrane también ostenta el récord de frío oficial de Marruecos, -23,9 °C, registrado en febrero de 1935, un dato que sorprende a quien imagina el país como puro desierto y playas.|Les administrateurs coloniaux français construisirent Ifrane de toutes pièces en 1929 comme station climatique d'altitude, avec des toits pentus en tuiles rouges conçus pour évacuer la neige, un style que l'on ne trouve presque nulle part ailleurs dans le pays. Ifrane détient aussi le record officiel de froid du Maroc, -23,9 °C, enregistré en février 1935, un fait qui surprend ceux qui imaginent le pays comme rien de plus que désert et plages.|イフレンは1929年、フランスの植民地行政官が高原保養地として何もないところから作り上げた町で、雪を落とすための赤い瓦の傾斜屋根は国内でほとんど他に類を見ない様式である。イフレンはまたモロッコの公式最低気温記録、1935年2月に記録された氷点下23.9度も保持しており、砂漠とビーチしかない国だと思っている人の多くを驚かせる事実である。",
    [prop("Al Akhawayn University Library|Biblioteca de la Universidad Al Akhawayn|Bibliothèque de l'université Al Akhawayn|アル・アカワイン大学図書館", 480, 100),
     prop("Cedar Forest Ski Chalet|Chalet de esquí en el bosque de cedros|Chalet de ski dans la cédraie|杉林のスキーシャレー", 300, 62)],
  ),
  azrou: city(
    "Azrou|Azrou|Azrou|アズルー",
    -5.2236, 33.4342, "atm", "macaques", "chalet", "l",
    "A forest of monkeys found nowhere else outside Asia|Un bosque de monos que no existen fuera de Asia en ningún otro lugar|Une forêt de singes introuvables ailleurs hors d'Asie|アジアの外では他に見られない猿の森",
    "The cedar forest around Azrou is one of the last strongholds of the Barbary macaque, the only monkey species found wild anywhere outside Asia, though decades of tourists hand-feeding them bread and peanuts has measurably changed the animals' diet and health. The forest's most famous tree, a cedar known as Gouraud estimated at 800 years old, stood over the M'dakra clearing until it finally died in the 2010s, weakened by drought and by the ground compacted by visitors around its roots.|El bosque de cedros en torno a Azrou es uno de los últimos refugios del macaco de Berbería, la única especie de mono que vive en libertad fuera de Asia, aunque décadas de turistas dándoles pan y cacahuetes a mano han cambiado de forma medible su dieta y salud. El árbol más famoso del bosque, un cedro llamado Gouraud, de unos 800 años, murió finalmente en la década de 2010.|La cédraie autour d'Azrou est l'un des derniers bastions du magot, seule espèce de singe vivant à l'état sauvage en dehors de l'Asie, bien que des décennies de touristes leur donnant pain et cacahuètes à la main aient mesurablement changé leur régime et leur santé. L'arbre le plus célèbre de la forêt, un cèdre nommé Gouraud estimé à 800 ans, est finalement mort dans les années 2010.|アズルー周辺の杉林は、アジアの外で唯一野生で見られる猿バーバリーマカクの最後の砦の一つだが、何十年にもわたり観光客がパンやピーナッツを手渡しで与え続けたことで、この動物の食性と健康は測定できるほど変化している。森でいちばん有名な木、樹齢およそ800年とされる「グーロー」という名の杉は、干ばつと訪問者に踏み固められた根元の土に弱り、2010年代についに枯れた。",
    [prop("Middle Atlas Woodcarvers' Souk|Zoco de talladores del Atlas Medio|Souk des sculpteurs du Moyen Atlas|中部アトラス木彫り職人の市場", 250, 52),
     prop("M'dakra Clearing Viewpoint|Mirador del claro de M'dakra|Point de vue de la clairière de M'dakra|ムダクラの林間広場の展望台", 190, 40)],
  ),
  imlil: city(
    "Imlil|Imlil|Imlil|イムリル",
    -7.9186, 31.1361, "atm", "trailhead", "mountains", "l",
    "The last village before North Africa's highest peak|El último pueblo antes de la cima más alta del norte de África|Le dernier village avant le plus haut sommet d'Afrique du Nord|北アフリカ最高峰の手前の最後の村",
    "Imlil, at around 1,740 metres, is the last village most climbers pass through before Jbel Toubkal, at 4,167 metres the highest peak in North Africa, and the trailhead economy here still runs largely on mules rather than trucks, since the final stretches of trail were never built wide enough for vehicles. Guides licensed for the Toubkal route must be certified members of Morocco's official mountain guide association, a system meant partly to keep the climb's fairly low technical difficulty from lulling people into skipping preparation for its altitude.|Imlil, a unos 1.740 metros, es el último pueblo por el que pasan la mayoría de los alpinistas antes del Yebel Tubkal, con 4.167 metros el pico más alto del norte de África, y la economía del sendero aquí funciona todavía sobre todo con mulas y no camiones. Los guías con licencia para la ruta del Tubkal deben ser miembros certificados de la asociación oficial de guías de montaña de Marruecos.|Imlil, à environ 1 740 mètres, est le dernier village que traversent la plupart des grimpeurs avant le Jbel Toubkal, point culminant d'Afrique du Nord à 4 167 mètres, et l'économie du sentier y repose encore largement sur les mules plutôt que les camions. Les guides autorisés pour l'itinéraire du Toubkal doivent être membres certifiés de l'association officielle des guides de montagne du Maroc.|標高およそ1740メートルのイムリルは、多くの登山者が標高4167メートルで北アフリカ最高峰のトゥブカル山へ向かう前に通る最後の村で、登山道の経済はいまもトラックではなくラバに頼っている。最後の区間の道が車両の通れる幅に作られたことがないためである。トゥブカルのルートを案内するガイドはモロッコの公式山岳ガイド協会の認定会員でなければならず、技術的な難度がさほど高くないぶん、標高への備えを怠りがちになるのを防ぐ狙いもある。",
    [prop("Toubkal Trailhead Mule Station|Estación de mulas del sendero al Tubkal|Station de mulets du sentier du Toubkal|トゥブカル登山口のラバ乗り場", 290, 60),
     prop("Kasbah du Toubkal Terrace|Terraza de la Kasbah du Toubkal|Terrasse de la Kasbah du Toubkal|カスバ・デュ・トゥブカルのテラス", 210, 44)],
  ),
  midelt: city(
    "Midelt|Midelt|Midelt|ミデルト",
    -4.7419, 32.6852, "atm", "orchard", "countryside", "r",
    "A mountain pass town that grows apples, not olives|Un pueblo de puerto de montaña que cultiva manzanas, no aceitunas|Une ville de col de montagne qui cultive des pommes, pas des olives|オリーブではなくリンゴを育てる峠の町",
    "Midelt sits at over 1,500 metres between the Middle and High Atlas, cold enough in winter that its orchards — unusually for Morocco — grow apples rather than olives or citrus, and the town holds an annual apple festival timed to the October harvest. Lead and zinc mined from the nearby gorges at Aouli once supported a company town whose narrow-gauge mining railway, one of the few ever built purely for ore in this part of the country, has been abandoned for decades.|Midelt está a más de 1.500 metros entre el Atlas Medio y el Alto Atlas, lo bastante frío en invierno como para que sus huertos —algo inusual en Marruecos— cultiven manzanas en vez de aceitunas o cítricos, y el pueblo celebra un festival anual de la manzana en octubre. El plomo y el zinc extraídos en los cercanos desfiladeros de Aouli sostuvieron antaño una ciudad minera cuyo ferrocarril de vía estrecha lleva décadas abandonado.|Midelt se trouve à plus de 1 500 mètres entre le Moyen et le Haut Atlas, assez froide en hiver pour que ses vergers — chose rare au Maroc — cultivent des pommes plutôt que des olives ou des agrumes, et la ville tient une fête annuelle de la pomme calée sur la récolte d'octobre. Le plomb et le zinc extraits des gorges voisines d'Aouli ont jadis fait vivre une ville minière dont le chemin de fer à voie étroite est abandonné depuis des décennies.|標高1500メートルを超えるミデルトは中部アトラスと高アトラスのあいだにあり、冬は寒いため、モロッコには珍しくオリーブや柑橘ではなくリンゴを育てる果樹園があり、町では10月の収穫に合わせて毎年リンゴ祭りが開かれる。近くのアウリ渓谷で採れた鉛と亜鉛はかつて鉱山町を支え、この地方では珍しく鉱石輸送だけのために敷かれた軽便鉄道は、何十年も前に放棄されたまま残っている。",
    [prop("Apple Orchard Terrace|Terraza del huerto de manzanos|Terrasse du verger de pommiers|リンゴ果樹園のテラス", 260, 54),
     prop("Aouli Mining Railway Relic|Vestigio del ferrocarril minero de Aouli|Vestige du chemin de fer minier d'Aouli|アウリ鉱山鉄道の遺構", 190, 40)],
  ),
  settifatma: city(
    "Setti Fatma|Setti Fatma|Setti Fatma|セッティ・ファトマ",
    -7.6667, 31.2833, "atm", "trailhead", "mountains", "r",
    "Seven waterfalls above a valley that remembers a flood|Siete cascadas sobre un valle que recuerda una inundación|Sept cascades au-dessus d'une vallée qui se souvient d'une crue|洪水を忘れない谷の上にかかる七つの滝",
    "Setti Fatma marks the end of the paved road up the Ourika Valley and the start of a footpath to seven consecutive waterfalls that draws day-trippers from Marrakech, just over an hour away, past the walnut and cherry orchards Amazigh families still farm along the valley floor. A flash flood in August 1995, triggered by a sudden storm in the mountains above, killed more than 200 people camped along the riverbed, and warning signs and evacuation routes posted along the water today trace directly back to that disaster.|Setti Fatma marca el fin de la carretera asfaltada que sube el valle de Ourika y el inicio de un sendero a siete cascadas consecutivas que atrae a excursionistas desde Marrakech. Una crecida repentina en agosto de 1995, provocada por una tormenta súbita en las montañas, mató a más de 200 personas acampadas junto al cauce.|Setti Fatma marque la fin de la route goudronnée qui remonte la vallée de l'Ourika et le début d'un sentier vers sept cascades successives qui attire les excursionnistes depuis Marrakech. Une crue soudaine en août 1995, déclenchée par un orage subit dans les montagnes, tua plus de 200 personnes campées le long du lit de la rivière.|セッティ・ファトマはウリカ渓谷を登る舗装路の終点で、七つの滝が連なる小径の起点でもあり、1時間ちょっとのマラケシュから日帰り客を集める。谷底ではいまもアマジグの家族がクルミやサクランボの果樹園を営んでいる。1995年8月、山中の突然の嵐が引き金となった鉄砲水は、川底で野営していた200人以上の命を奪い、いま川沿いに立つ警告標識と避難路の表示は、その災害に直接由来する。",
    [prop("Ourika Seven Waterfalls Path|Sendero de las siete cascadas de Ourika|Sentier des sept cascades de l'Ourika|ウリカ渓谷七つの滝の小径", 240, 50),
     prop("Riverside Walnut Orchard|Nogueral junto al río|Noyeraie au bord de la rivière|川沿いのクルミ果樹園", 170, 36)],
  ),

  // ---------------------------------------------------------------------
  // sud — 南部・砂漠
  // ---------------------------------------------------------------------
  ouarzazate: city(
    "Ouarzazate|Uarzazate|Ouarzazate|ワルザザート",
    -6.8907, 30.9189, "sud", "filmkasbah", "kasbah", "b",
    "A kasbah that once ruled the south, and a workforce behind the cameras|Una kasbah que una vez gobernó el sur, y una mano de obra detrás de las cámaras|Une kasbah qui gouverna jadis le sud, et une main-d'œuvre derrière les caméras|かつて南部を治めたカスバと、カメラの裏で働く人々",
    "Ouarzazate's Taourirt Kasbah was the seat of the Glaoui family, who controlled the southern trade routes and, through a shifting alliance with French colonial authorities, effectively ruled much of southern Morocco in the early twentieth century before falling from power at independence. The town's film studios, among the largest in the world by land area, employ thousands of local extras, drivers, carpenters and caterers year-round on productions that never make the marketing photos of a \"Sahara gateway.\"|La Kasbah Taourirt de Uarzazate fue la sede de la familia Glaoui, que controló las rutas comerciales del sur y, mediante una alianza cambiante con las autoridades coloniales francesas, gobernó de hecho buena parte del sur de Marruecos hasta perder el poder con la independencia. Los estudios de cine de la ciudad, de los más grandes del mundo por superficie, emplean todo el año a miles de extras, conductores, carpinteros y cocineros locales.|La Kasbah Taourirt de Ouarzazate fut le siège de la famille Glaoui, qui contrôla les routes commerciales du sud et, par une alliance mouvante avec les autorités coloniales françaises, gouverna de fait une bonne partie du sud du Maroc avant de perdre le pouvoir à l'indépendance. Les studios de cinéma de la ville, parmi les plus vastes du monde par la superficie, emploient toute l'année des milliers de figurants, chauffeurs, charpentiers et traiteurs locaux.|ワルザザートのタウリルト・カスバは、南部の交易路を支配し、フランス植民地当局との揺れ動く同盟関係を通じて20世紀初頭のモロッコ南部の大半を事実上治めたグラウィ一族の本拠だったが、独立とともに権力を失った。世界でも指折りの敷地面積を誇るこの町の映画スタジオは、「サハラの玄関口」の宣伝写真には決して写らない何千人もの地元エキストラ、運転手、大工、仕出し業者を通年で雇っている。",
    [prop("Taourirt Kasbah Courtyard|Patio de la Kasbah Taourirt|Cour de la Kasbah Taourirt|タウリルト・カスバの中庭", 560, 116),
     prop("Atlas Film Studios Backlot|Plató exterior de los estudios Atlas|Terrain de tournage des studios Atlas|アトラス撮影所の野外セット", 360, 74)],
  ),
  aitbenhaddou: city(
    "Ait Ben Haddou|Ait Ben Haddou|Ait Ben Haddou|アイット・ベン・ハドゥ",
    -7.1319, 31.0472, "sud", "ksar", "kasbah", "l",
    "A fortress kept standing by replastering it every year|Una fortaleza que se mantiene en pie porque la revocan cada año|Une forteresse tenue debout en la replâtrant chaque année|毎年塗り直すことで立ち続ける砦",
    "Fewer than ten families still live inside Ait Ben Haddou's fortified ksar itself; most residents moved decades ago to a newer village built just across the Ounila river, where a house doesn't need replastering with fresh mud and straw after every hard rain the way the historic buildings do. Those who remain, along with the wider community, still carry out that replastering work by hand each year, since it's the only way the thousand-year-old earthen walls survive at all.|Menos de diez familias siguen viviendo dentro del ksar fortificado de Ait Ben Haddou; la mayoría se mudó hace décadas a un pueblo nuevo al otro lado del río Ounila, donde una casa no necesita revocarse con barro y paja fresca tras cada lluvia fuerte. Quienes se quedan, junto con la comunidad más amplia, siguen haciendo ese revoque a mano cada año, porque es la única forma de que sobrevivan los muros de tierra milenarios.|Moins de dix familles vivent encore à l'intérieur du ksar fortifié d'Ait Ben Haddou ; la plupart des habitants ont déménagé il y a des décennies dans un village plus récent bâti juste de l'autre côté de l'oued Ounila. Ceux qui restent, avec la communauté élargie, continuent chaque année ce replâtrage à la main, car c'est le seul moyen pour les murs de terre millénaires de survivre.|アイット・ベン・ハドゥの城塞化された集落(クサル)の内部にいまも住むのは十世帯に満たない。住民の大半は数十年前、ウニラ川を挟んだ向こうの新しい村へ移り住んだ。歴史的建造物のように、激しい雨のたびに泥と藁で塗り直す必要がない家に住むためである。残った人々は、より広い共同体とともに、いまも毎年その塗り直し作業を手で続けている。それが千年を経た土の壁を存続させる唯一の方法だからである。",
    [prop("Ksar Replastering Workshop|Taller de revoque del ksar|Atelier de replâtrage du ksar|クサル塗り直しの作業場", 500, 104),
     prop("Ounila River Footbridge|Puente peatonal del río Ounila|Passerelle de l'oued Ounila|ウニラ川の歩道橋", 320, 66)],
  ),
  merzouga: city(
    "Merzouga|Merzouga|Merzouga|メルズーガ",
    -4.0134, 31.0801, "sud", "dunes", "dunes", "r",
    "Where the desert stops being flat rock and turns to sand|Donde el desierto deja de ser roca plana y se vuelve arena|Là où le désert cesse d'être une roche plate et devient sable|砂漠が平らな岩から砂へと変わる場所",
    "Erg Chebbi's dunes rise to about 150 metres, but sand seas like it actually cover only a small fraction of the Moroccan Sahara — most of the desert here is flat, stony hamada rather than the rolling dunes postcards show. The nearby village of Khamlia is home to families descended from sub-Saharan Africa who still play Gnawa music at night, its call-and-response songs and iron castanets originally tied to trance healing ceremonies rather than the evening shows now put on for visitors.|Las dunas del Erg Chebbi alcanzan unos 150 metros, pero los mares de arena como este cubren en realidad solo una pequeña parte del Sáhara marroquí: la mayor parte del desierto aquí es hamada plana y pedregosa, no las dunas onduladas de las postales. En la cercana aldea de Khamlia viven familias descendientes del África subsahariana que aún tocan música gnaua por la noche, con sus cantos de llamada y respuesta y castañuelas de hierro ligados originalmente a ceremonias de curación en trance, no a los espectáculos nocturnos de hoy para visitantes.|Les dunes de l'Erg Chebbi montent à environ 150 mètres, mais les mers de sable de ce type ne couvrent en réalité qu'une petite part du Sahara marocain : ici, le désert est surtout une hamada plate et caillouteuse, pas les dunes ondulantes des cartes postales. Le village voisin de Khamlia abrite des familles descendant d'Afrique subsaharienne qui jouent encore la nuit de la musique gnaoua, ses chants en appel-réponse et ses castagnettes de fer autrefois liés à des cérémonies de guérison en transe plutôt qu'aux spectacles du soir donnés aujourd'hui aux visiteurs.|エルグ・シェビの砂丘は高さおよそ150メートルに達するが、こうした「砂の海」がモロッコのサハラに占める割合はごくわずかで、この一帯の砂漠の大半は絵はがきに写るような波打つ砂丘ではなく、平らで石だらけのハマダである。近くのカムリア村には、サハラ以南アフリカにルーツを持つ家族が暮らし、いまも夜にグナワ音楽を奏でる。呼びかけと応答の歌と鉄のカスタネットは、もとは観光客向けの夜の演目ではなく、トランス状態に入る治療儀式に結びついたものだった。",
    [prop("Erg Chebbi Dune-Camp Tents|Jaimas del campamento en las dunas de Erg Chebbi|Tentes du campement des dunes de l'Erg Chebbi|エルグ・シェビ砂丘のキャンプテント", 260, 54),
     prop("Khamlia Gnawa Music House|Casa de música gnaua de Khamlia|Maison de musique gnaoua de Khamlia|カムリア村のグナワ音楽の家", 210, 44)],
  ),
  zagora: city(
    "Zagora|Zagora|Zagora|ザゴラ",
    -5.8374, 30.3315, "sud", "camelsign", "palmoasis", "b",
    "A famous camel sign newer than it looks|Un famoso cartel de camellos más nuevo de lo que parece|Un célèbre panneau de chameau plus récent qu'il n'y paraît|見た目より新しい有名なラクダの標識",
    "Zagora's well-known roadside sign reading \"52 days to Timbuktu by camel\" is a modern tourism marker erected in the 1990s rather than a genuine historic waypoint, though the Draa valley below the town was in fact a real corridor for trans-Saharan caravan trade for centuries. The Draa itself is Morocco's longest river at just over 1,100 kilometres, but a string of dams built upstream since the 1970s means its lower reaches near Zagora now run dry most years.|El famoso cartel de carretera de Zagora que dice «52 días a Tombuctú en camello» es una señal turística moderna erigida en los años noventa y no un hito histórico real, aunque el valle del Draa bajo la ciudad fue de hecho un auténtico corredor del comercio caravanero transahariano durante siglos. El Draa es el río más largo de Marruecos, con poco más de 1.100 km.|Le célèbre panneau routier de Zagora affichant « 52 jours pour Tombouctou à dos de chameau » est une signalétique touristique moderne érigée dans les années 1990 et non un vrai repère historique, bien que la vallée du Draa en contrebas ait réellement servi de corridor au commerce caravanier transsaharien pendant des siècles. Le Draa est le plus long fleuve du Maroc, un peu plus de 1 100 km.|ザゴラの有名な道端の看板「ラクダで52日、ティンブクトゥまで」は、実は本物の歴史的な道しるべではなく1990年代に建てられた現代の観光用標識だが、町の下に広がるドラア渓谷は何世紀ものあいだサハラ縦断の隊商交易の実際の通り道だった。ドラア川はモロッコ最長の川で全長1100キロを少し超えるが、1970年代以降上流に相次いで建設されたダムのため、ザゴラ付近の下流はいまではほとんどの年で涸れてしまう。",
    [prop("Draa Valley Palm Grove|Palmeral del valle del Draa|Palmeraie de la vallée du Draa|ドラア渓谷のナツメヤシ園", 230, 48),
     prop("Camel Sign Photo Point|Punto de foto del cartel de camellos|Point photo du panneau au chameau|ラクダ看板の撮影スポット", 170, 36)],
  ),
  tinghir: city(
    "Tinghir|Tinerhir|Tinghir|ティネリール",
    -5.5333, 31.5148, "sud", "gorge", "gorge", "r",
    "A gorge shepherds crossed, and a quarter emigration emptied|Un desfiladero que cruzaban los pastores, y un barrio que vació la emigración|Une gorge que traversaient les bergers, et un quartier vidé par l'émigration|羊飼いが渡った渓谷と、移住で空いた街区",
    "The Todra Gorge's limestone walls rise as much as 300 metres above a riverbed only ten metres wide at its narrowest, a route once used by shepherds moving flocks between valley and plateau and now popular with rock climbers. Tinghir's old mellah, the historic Jewish quarter downriver from the gorge, stood alongside the Muslim medina for centuries before most of its Jewish residents emigrated to Israel and France in the 1950s and 60s, and its abandoned synagogue buildings are still visible today.|Las paredes calizas de la garganta del Todra se alzan hasta 300 metros sobre un lecho fluvial de apenas diez metros de ancho en su punto más estrecho. El antiguo mellah de Tinerhir, el histórico barrio judío río abajo del cañón, se alzó junto a la medina musulmana durante siglos antes de que la mayoría de sus habitantes judíos emigraran a Israel y Francia en los años cincuenta y sesenta.|Les parois calcaires des gorges du Todra s'élèvent jusqu'à 300 mètres au-dessus d'un lit de rivière large de dix mètres seulement à son point le plus étroit. L'ancien mellah de Tinghir, le quartier juif historique en aval des gorges, s'est dressé aux côtés de la médina musulmane pendant des siècles avant que la plupart de ses habitants juifs n'émigrent vers Israël et la France dans les années 1950 et 1960.|トドラ渓谷の石灰岩の壁は、最も狭い場所で幅わずか10メートルの川底から最大300メートルの高さでそそり立ち、かつては羊飼いが谷と高原のあいだで群れを移動させる道として使い、いまはロッククライマーに人気がある。渓谷の下流にあるティネリールの旧メラー(ユダヤ人街)は、1950〜60年代にほとんどの住民がイスラエルやフランスへ移住するまで、何世紀もムスリムの旧市街と隣り合って存在しており、廃墟となったシナゴーグの建物はいまも見ることができる。",
    [prop("Todra Gorge Climbing Wall|Pared de escalada del desfiladero del Todra|Paroi d'escalade des gorges du Todra|トドラ渓谷のクライミングウォール", 260, 54),
     prop("Old Mellah Synagogue|Sinagoga del antiguo mellah|Synagogue de l'ancien mellah|旧メラー地区のシナゴーグ", 190, 40)],
  ),
  errachidia: city(
    "Errachidia|Errachidia|Errachidia|エルラシディア",
    -4.4262, 31.9314, "sud", "dam", "palmoasis", "l",
    "A dam that finally tamed the river below the dynasty's birthplace|Una presa que por fin domó el río bajo la cuna de la dinastía|Un barrage qui a enfin dompté la rivière sous le berceau de la dynastie|王朝発祥の地の下流の川をついに手なずけたダム",
    "Errachidia sits at the head of the Tafilalt, the oasis region the ruling Alaouite dynasty traces its origins to before it took the throne in the 17th century, and the Hassan Addakhil Dam built just outside town in the 1970s finally tamed a Ziz river that used to flood its palm groves downstream every few years. The town itself was founded by the French in 1917 as a garrison post originally named Ksar es-Souk, and only took its current name after independence.|Errachidia se sitúa a la cabecera del Tafilalt, la región de oasis de la que procede la dinastía alauita reinante antes de subir al trono en el siglo XVII, y la presa Hassan Addakhil, construida a las afueras en los años setenta, domó por fin un río Ziz que solía inundar los palmerales cada pocos años. La ciudad la fundaron los franceses en 1917 como puesto de guarnición.|Errachidia se trouve à la tête du Tafilalt, la région d'oasis dont est originaire la dynastie alaouite régnante avant son accession au trône au XVIIe siècle, et le barrage Hassan Addakhil, bâti juste à l'extérieur de la ville dans les années 1970, a enfin dompté un oued Ziz qui inondait jadis les palmeraies en aval tous les quelques ans. La ville fut fondée par les Français en 1917 comme poste de garnison.|エルラシディアはタフィラルト・オアシス地帯の入り口に位置し、この地方こそ17世紀に王位に就く前の現王朝アラウィー朝の発祥の地とされる。1970年代に町の外れに築かれたハッサン・アッダキル・ダムは、数年おきに下流のナツメヤシ園を氾濫させていたジズ川をついに制御した。町自体は1917年、フランスによってクサル・エス・スークという名の駐屯地として築かれ、現在の名になったのは独立後のことである。",
    [prop("Hassan Addakhil Dam Overlook|Mirador de la presa Hassan Addakhil|Point de vue sur le barrage Hassan Addakhil|ハッサン・アッダキル・ダムの展望台", 250, 52),
     prop("Tafilalt Palm Grove|Palmeral del Tafilalt|Palmeraie du Tafilalt|タフィラルトのナツメヤシ園", 180, 38)],
  ),
  sidiifni: city(
    "Sidi Ifni|Sidi Ifni|Sidi Ifni|シディイフニ",
    -10.1734, 29.3794, "sud", "artdecocoast", "coastdesert", "b",
    "A Spanish colony that outlasted Moroccan independence by over a decade|Una colonia española que sobrevivió más de una década a la independencia de Marruecos|Une colonie espagnole qui survécut plus d'une décennie à l'indépendance du Maroc|モロッコ独立から10年以上生き延びたスペインの植民地",
    "Spain held Sidi Ifni as a colonial enclave until 1969, more than a decade after Morocco's independence and one of the last handovers of colonial territory anywhere in Africa, and the town's central plaza and former governor's palace still show the same Spanish Art Deco style built in the 1930s. Its harbour, cut off from the town by a steep cliff, is now reached by a road built down through a tunnel rather than the cargo cableway the Spanish once used to lower goods to the boats below.|España mantuvo Sidi Ifni como enclave colonial hasta 1969, más de una década después de la independencia de Marruecos y una de las últimas cesiones de territorio colonial en toda África, y la plaza central y el antiguo palacio del gobernador siguen mostrando el mismo estilo Art Déco español de los años treinta.|L'Espagne conserva Sidi Ifni comme enclave coloniale jusqu'en 1969, plus d'une décennie après l'indépendance du Maroc et l'une des dernières rétrocessions de territoire colonial en Afrique, et la place centrale ainsi que l'ancien palais du gouverneur affichent toujours le même style Art déco espagnol des années 1930.|スペインは1969年までシディイフニを植民地の飛び地として保持しており、これはモロッコ独立から10年以上あとのことで、アフリカにおける植民地領土の返還としては最後期の一つだった。町の中央広場と旧総督官邸は、1930年代に建てられたのと同じスペイン式アール・デコ様式をいまも留めている。切り立った崖で町から隔てられた港へは、かつてスペイン人が荷を舟へ下ろすのに使った索道ではなく、トンネルを抜ける道でいまは到達できる。",
    [prop("Spanish Governor's Palace|Palacio del gobernador español|Palais du gouverneur espagnol|スペイン総督官邸", 240, 50),
     prop("Cliffside Cargo Tunnel|Túnel de carga del acantilado|Tunnel de fret de la falaise|崖沿いの貨物トンネル", 170, 36)],
  ),
  tantan: city(
    "Tan-Tan|Tan-Tan|Tan-Tan|タンタン",
    -11.1000, 28.4333, "sud", "moussem", "coastdesert", "l",
    "A nomads' gathering that had to be revived from a 20-year pause|Un encuentro nómada que hubo que revivir tras 20 años de pausa|Un rassemblement de nomades qu'il fallut relancer après 20 ans de pause|20年の中断から復活させた遊牧民の祭り",
    "The Tan-Tan Moussem, an annual gathering that once drew dozens of nomadic Sahrawi and Amazigh tribes for camel racing, poetry contests and craft trading, was suspended for over two decades before UNESCO recognized it in 2005 and local organizers revived it the following year. Camel milk and dromedary racing remain central to the event, run by tribes whose main livelihood, herding across the pre-Sahara, has grown harder as more families settle permanently in towns.|El Moussem de Tan-Tan, un encuentro anual que reunía a docenas de tribus nómadas saharauis y amazighs para carreras de camellos, concursos de poesía y comercio artesanal, estuvo suspendido más de dos décadas antes de que la UNESCO lo reconociera en 2005 y los organizadores locales lo revivieran al año siguiente.|Le Moussem de Tan-Tan, rassemblement annuel qui réunissait jadis des dizaines de tribus nomades sahraouies et amazighes pour des courses de chameaux, des joutes poétiques et du commerce artisanal, fut suspendu plus de deux décennies avant que l'UNESCO ne le reconnaisse en 2005 et que les organisateurs locaux ne le relancent l'année suivante.|タンタンのムーセムは、かつて数十のサハラーウィーとアマジグの遊牧部族がラクダレース、詩の競演、手工芸の商いのために集った年に一度の祭りだったが、20年以上中断され、2005年にユネスコに認定されたのを機に翌年地元の主催者が復活させた。ラクダの乳と一こぶラクダのレースはいまも祭りの中心であり、担い手であるサハラ前線を移動して牧畜を営む部族の暮らしは、定住する家族が増えるにつれて厳しさを増している。",
    [prop("Moussem Camel Racing Track|Pista de carreras de camellos del moussem|Piste de course de chameaux du moussem|ムーセムのラクダ競走場", 220, 46),
     prop("Nomad Craft Tent|Jaima de artesanía nómada|Tente d'artisanat nomade|遊牧民の手工芸テント", 160, 34)],
  ),
  tarfaya: city(
    "Tarfaya|Tarfaya|Tarfaya|タルファヤ",
    -12.9291, 27.9382, "sud", "aeropostale", "coastdesert", "r",
    "The desert post where a downed-plane author found his prince|El puesto del desierto donde un autor de aviones caídos encontró a su príncipe|Le poste du désert où un auteur d'avions écrasés trouva son prince|不時着した飛行家が王子と出会った砂漠の郵便中継地",
    "Antoine de Saint-Exupéry ran the Aéropostale airmail stopover station at Tarfaya from 1927 to 1929, refuelling and repairing planes on the long relay route between France and Senegal, and the desert isolation he experienced here fed directly into his book Wind, Sand and Stars and, indirectly, The Little Prince. A small museum near the old airstrip, built to resemble a biplane, now holds his letters and a handful of period photographs.|Antoine de Saint-Exupéry dirigió la escala de correo aéreo de Aéropostale en Tarfaya de 1927 a 1929, repostando y reparando aviones en la larga ruta de relevo entre Francia y Senegal, y el aislamiento del desierto que vivió aquí alimentó directamente su libro Tierra de hombres y, de forma indirecta, El Principito. Un pequeño museo cerca de la vieja pista, construido con forma de biplano, guarda hoy sus cartas.|Antoine de Saint-Exupéry dirigea l'escale postale de l'Aéropostale à Tarfaya de 1927 à 1929, ravitaillant et réparant les avions sur la longue route relais entre la France et le Sénégal, et l'isolement du désert qu'il y vécut a nourri directement son livre Terre des hommes et, indirectement, Le Petit Prince. Un petit musée près de l'ancienne piste, construit en forme de biplan, conserve aujourd'hui ses lettres.|アントワーヌ・ド・サン=テグジュペリは1927年から1929年までタルファヤでアエロポスタル社の航空郵便中継所を運営し、フランスとセネガルを結ぶ長い中継路で飛行機の給油と修理にあたった。ここで味わった砂漠の孤独は著書『人間の土地』に直接反映され、間接的には『星の王子さま』にも通じている。旧滑走路近くの複葉機を模した小さな博物館には、いま彼の手紙と当時の写真が数点収められている。",
    [prop("Saint-Exupéry Biplane Museum|Museo biplano de Saint-Exupéry|Musée biplan de Saint-Exupéry|サン=テグジュペリ複葉機博物館", 230, 48),
     prop("Old Airstrip Windsock|Manga de viento de la vieja pista|Manche à air de l'ancienne piste|旧滑走路の吹き流し", 170, 36)],
  ),

  // ---------------------------------------------------------------------
  // est — 東部
  // ---------------------------------------------------------------------
  oujda: city(
    "Oujda|Uxda|Oujda|ウジダ",
    -1.9075, 34.6814, "est", "bordergate", "borderdesert", "l",
    "A border city whose border has been shut for thirty years|Una ciudad fronteriza cuya frontera lleva treinta años cerrada|Une ville-frontière dont la frontière est fermée depuis trente ans|三十年ものあいだ閉ざされている国境の町",
    "Oujda sits just 15 kilometres from the Algerian border, a border that has been completely closed to road traffic since 1994 following a diplomatic rupture — making Oujda, in practice, a border city whose border has not functioned in three decades. The city's own character still owes a great deal to the older, open era, when it sat on one of the Maghreb's busiest overland trade and migration routes between Morocco, Algeria and beyond.|Uxda está a apenas 15 kilómetros de la frontera argelina, una frontera cerrada por completo al tráfico rodado desde 1994 tras una ruptura diplomática, lo que convierte a Uxda, en la práctica, en una ciudad fronteriza cuya frontera lleva tres décadas sin funcionar. El carácter propio de la ciudad debe mucho a la época anterior, abierta, cuando se encontraba en una de las rutas comerciales y migratorias terrestres más transitadas del Magreb.|Oujda se trouve à seulement 15 kilomètres de la frontière algérienne, fermée à toute circulation routière depuis 1994 après une rupture diplomatique — faisant d'Oujda, dans les faits, une ville-frontière dont la frontière ne fonctionne plus depuis trois décennies. Le caractère propre de la ville doit beaucoup à l'époque antérieure, ouverte, où elle se trouvait sur l'une des routes commerciales et migratoires terrestres les plus fréquentées du Maghreb.|ウジダはアルジェリア国境からわずか15キロの場所にあるが、この国境は1994年の外交断絶以来、車両通行に対して完全に閉ざされたままで、事実上ウジダは30年間機能していない国境を持つ町ということになる。町自体の性格は、モロッコとアルジェリアを結ぶマグレブ屈指の陸路交易・移動路の要衝だった、かつての国境が開いていた時代に多くを負っている。",
    [prop("Sidi Yahya Oasis Garden|Jardín del oasis de Sidi Yahya|Jardin de l'oasis de Sidi Yahya|シディ・ヤヒヤ・オアシスの庭園", 280, 58),
     prop("Closed Border Overlook|Mirador de la frontera cerrada|Point de vue sur la frontière fermée|閉ざされた国境の展望台", 200, 42)],
  ),
  figuig: city(
    "Figuig|Figuig|Figuig|フィギッグ",
    -1.2286, 32.1136, "est", "oasis", "palmoasis", "b",
    "Water rights measured in minutes, unchanged for centuries|Derechos de agua medidos en minutos, sin cambios desde hace siglos|Des droits d'eau mesurés en minutes, inchangés depuis des siècles|何世紀も変わらない、分単位で決められた水利権",
    "Figuig's palm oasis is split across seven historically separate fortified hamlets, or ksour, each with its own water rights drawn from a centuries-old system of wells and channels that still allocates irrigation time down to fractions of an hour, passed down through families rather than written into any modern deed. The oasis holds an estimated 200,000 date palms across barely 500 hectares, one of the densest palm groves anywhere in the country.|El oasis de palmeras de Figuig se reparte entre siete alquerías fortificadas históricamente separadas, o ksour, cada una con sus propios derechos de agua sacados de un sistema de pozos y canales centenario que aún reparte el riego en fracciones de hora. El oasis alberga unas 200.000 palmeras datileras en apenas 500 hectáreas.|L'oasis de palmiers de Figuig se répartit entre sept hameaux fortifiés historiquement séparés, ou ksour, chacun avec ses propres droits d'eau tirés d'un système de puits et de canaux séculaire qui répartit encore l'irrigation à la fraction d'heure près. L'oasis compte environ 200 000 palmiers-dattiers sur à peine 500 hectares.|フィギッグのナツメヤシ・オアシスは、歴史的に別々だった七つの城塞化された集落(クスール)に分かれており、それぞれが井戸と水路からなる何世紀も続く独自の水利権を持ち、灌漑の時間はいまも一時間の何分の一という単位で割り当てられ、近代的な証書ではなく家族間で代々受け継がれている。オアシスにはわずか500ヘクタールの中に推定20万本のナツメヤシがあり、国内でも屈指の密度を誇る。",
    [prop("Ksar Water Channel|Canal de agua del ksar|Canal d'eau du ksar|クサルの用水路", 220, 46),
     prop("Palm Grove Well House|Caseta del pozo del palmeral|Maison du puits de la palmeraie|ナツメヤシ園の井戸小屋", 160, 34)],
  ),
  taza: city(
    "Taza|Taza|Taza|タザ",
    -4.0100, 34.2100, "est", "corkoak", "borderdesert", "l",
    "The only gap in the mountains, and the cave beneath it|El único paso en las montañas, y la cueva bajo él|Le seul passage dans les montagnes, et la grotte en dessous|山地に唯一開いた隙間と、その下の洞窟",
    "Taza sits in the only real lowland gap between the Rif and Middle Atlas ranges, a corridor barely wide enough to be called a plain that every army and caravan moving between Fez and Algeria has had to pass through for centuries, which is why the town's kasbah walls are unusually thick even by Moroccan standards. Just south of town, the Gouffre du Friouato drops over 200 metres into Tazekka National Park's limestone hills, among the deepest caves known in North Africa.|Taza se sitúa en el único paso llano real entre las cordilleras del Rif y el Atlas Medio, un corredor apenas lo bastante ancho para llamarse llanura que todo ejército y caravana entre Fez y Argelia ha tenido que cruzar durante siglos. Justo al sur de la ciudad, el Gouffre du Friouato desciende más de 200 metros en las colinas calizas del parque nacional de Tazekka.|Taza se trouve dans le seul véritable passage bas entre les massifs du Rif et du Moyen Atlas, un corridor à peine assez large pour mériter le nom de plaine que toute armée et caravane entre Fès et l'Algérie a dû emprunter pendant des siècles. Juste au sud de la ville, le Gouffre du Friouato plonge sur plus de 200 mètres dans les collines calcaires du parc national de Tazekka.|タザはリーフ山脈と中部アトラス山脈のあいだにある唯一の本当の低地の隙間にあり、平野と呼ぶにはぎりぎりの幅しかないこの回廊を、フェズとアルジェリアのあいだを行き来するあらゆる軍と隊商が何世紀も通らざるを得なかった。そのため町のカスバの城壁は、モロッコの基準からしても異例に厚い。町のすぐ南では、フリワト洞窟がタゼッカ国立公園の石灰岩の丘に200メートル以上の深さで落ち込んでおり、北アフリカでも屈指の深さを持つ洞窟の一つである。",
    [prop("Gouffre du Friouato Rim|Borde del Gouffre du Friouato|Bord du Gouffre du Friouato|フリワト洞窟の縁", 250, 52),
     prop("Kasbah Thick Wall Rampart|Muralla gruesa de la kasbah|Rempart épais de la kasbah|カスバの分厚い城壁", 180, 38)],
  ),
  berkane: city(
    "Berkane|Berkane|Berkane|ベルカン",
    -2.3167, 34.9167, "est", "orchard", "countryside", "r",
    "A single orange variety bred for exactly this plain|Una variedad de naranja creada justo para esta llanura|Une seule variété d'orange créée exactement pour cette plaine|この平野のためだけに生まれたオレンジの品種",
    "The plain around Berkane produces a large share of Morocco's citrus crop, including a small, intensely sweet late-season orange variety, the Maroc Late, developed specifically for this region's soil and grown almost nowhere else in the country in the same volume. The nearby Zegzel Gorge cuts through the Beni Snassen hills in a series of caves and natural arches barely twenty minutes from the orchards, and one cave along it opens directly into a working olive press.|La llanura de Berkane produce buena parte de los cítricos de Marruecos, incluida una variedad de naranja tardía pequeña e intensamente dulce, la Maroc Late, creada específicamente para el suelo de esta región. El cercano desfiladero de Zegzel atraviesa las colinas de Beni Snassen con una serie de cuevas y arcos naturales a apenas veinte minutos de los huertos.|La plaine autour de Berkane produit une bonne part des agrumes du Maroc, dont une petite variété d'orange tardive intensément sucrée, la Maroc Late, mise au point spécifiquement pour le sol de cette région. Les gorges de Zegzel voisines traversent les collines des Beni Snassen par une série de grottes et d'arches naturelles à peine à vingt minutes des vergers.|ベルカン周辺の平野はモロッコの柑橘類の大きな割合を生産しており、その中には「マロック・レイト」という、小粒で強い甘みを持つ晩生オレンジの品種があり、この地方の土壌のために特別に開発され、同じ規模で栽培されているのは国内でほぼここだけである。近くのゼグゼル渓谷は、果樹園からわずか20分ほどのベニ・スナッセン丘陵を、いくつもの洞窟と自然のアーチで貫いており、その一つの洞窟は稼働中のオリーブ搾油所に直接通じている。",
    [prop("Maroc Late Orange Grove|Naranjal de la variedad Maroc Late|Verger d'orangers Maroc Late|マロック・レイト種のオレンジ果樹園", 240, 50),
     prop("Zegzel Gorge Cave Olive Press|Almazara en la cueva del desfiladero de Zegzel|Pressoir à olives dans la grotte de Zegzel|ゼグゼル渓谷洞窟のオリーブ搾油所", 170, 36)],
  ),
};

/**
 * 路線(41本)。ONCFの実在の筋(タンジェ―ケニトラ―ラバト―カサブランカが
 * アル・ボラーク高速線、カサブランカ―マラケシュ・フェズ―タザ―ウジダが
 * 幹線)を骨にしている。アトラス山脈と南部・砂漠には鉄道が通っていないため、
 * それらの区間は実在の幹線道路(N/R番号の国道)に置き換えている
 * (南部が疎らになるのは地理的に無理のない範囲、との判断)。
 */
export const MOROCCO_EDGES = [
  // --- rif 北部・リーフ ---
  ["tanger", "asilah"],
  ["asilah", "larache"],
  ["tanger", "tetouan"],
  ["tetouan", "chefchaouen"],
  ["tetouan", "alhoceima"], // 道路(N16、リーフ海岸道路。鉄道は無い)
  ["alhoceima", "nador"], // 道路
  ["nador", "oujda"], // 道路(N2)。rif-est を結ぶ
  // --- rif-atl・atl 大西洋岸 ---
  ["larache", "kenitra"],
  ["tanger", "kenitra"], // アル・ボラーク高速線(直行)
  ["kenitra", "rabat"], // アル・ボラーク高速線
  ["rabat", "casablanca"], // アル・ボラーク高速線
  ["casablanca", "mohammedia"],
  ["casablanca", "eljadida"],
  ["eljadida", "safi"], // 道路(鉄道の直通は無い)
  ["safi", "essaouira"], // 道路
  ["essaouira", "agadir"], // 道路
  // --- atl-cen・cen 中部・内陸 ---
  ["casablanca", "marrakech"],
  ["kenitra", "meknes"],
  ["meknes", "fes"],
  ["meknes", "volubilis"], // 道路(30km弱)
  ["marrakech", "benimellal"], // 道路
  // --- cen-atm・atm アトラス山脈 ---
  ["benimellal", "azrou"], // 道路(N8)
  ["fes", "ifrane"], // 道路
  ["ifrane", "azrou"], // 道路
  ["azrou", "midelt"], // 道路(N13)
  ["marrakech", "imlil"], // 道路
  ["marrakech", "settifatma"], // 道路
  // --- atm-sud・sud 南部・砂漠 ---
  ["midelt", "errachidia"], // 道路(N13)
  ["marrakech", "ouarzazate"], // 道路(N9、ティジ・ンティシュカ峠)
  ["ouarzazate", "aitbenhaddou"], // 道路
  ["ouarzazate", "zagora"], // 道路(N9続き)
  ["ouarzazate", "tinghir"], // 道路(N10)
  ["tinghir", "errachidia"], // 道路(N10続き)
  ["errachidia", "merzouga"], // 道路
  ["agadir", "tantan"], // 道路(N1、大西洋岸)。atl-sud を結ぶ
  ["tantan", "tarfaya"], // 道路(N1続き)
  ["tantan", "sidiifni"], // 道路
  // --- cen-est・est 東部 ---
  ["fes", "taza"],
  ["taza", "oujda"],
  ["oujda", "berkane"],
  ["oujda", "figuig"], // 道路(N17)
];
