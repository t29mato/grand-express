/**
 * アフリカ大陸盤面の国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 大陸盤面なので、地方(mag/sah/gof/caf/hoa/eaf/saf)まるごとの好不況で
 * 差をつける(効果の数値は `src/infrastructure/content/season-and-doom-rules.ts`
 * 側に置く)。厄災の神は、特定の一国の民話を「アフリカ全体の伝承」と偽らないよう、
 * 大陸を貫くはずだった鉄路(ケープ〜カイロ構想)そのものにまつわる幽霊列車の
 * 噂という形にした(アジア盤面の「時刻表に無い列車」・世界一周盤面の
 * さまよえるオランダ人と同じ扱い方)。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const AFRICA_META = {
  id: "africa",
  name: t("Africa|África|L'Afrique|アフリカ"),
  blurb: t(
    "A continent whose railways were built to reach a port, not a neighbour|Un continente cuyos ferrocarriles se construyeron para llegar a un puerto, no a un vecino|Un continent dont les chemins de fer furent bâtis pour atteindre un port, pas un voisin|鉄道が隣国ではなく港へ届くために敷かれた大陸",
  ),
  cur: { pre: "$", post: "", mul: 100 },
  start: "cairo",
  // 大陸を実際に横断した歴史上の旅人たちの名から(植民地行政官は避けた)。
  cpuNames: ["Ibn Battuta", "Mansa Musa", "René Caillié", "Mary Kingsley"],
  // サハラの砂色、サバンナの草、熱帯雨林の緑、大西洋の青、パンアフリカの赤。
  stripe: ["#d9c17f", "#b5b06b", "#2f7a44", "#173a5c", "#c8102e"],
};

/** 7地方。国をまたぐ話を中心に据えた大陸盤面のための区分。 */
export const AFRICA_REGIONS = {
  mag: t("The Maghreb, the Nile & Mauritania|El Magreb, el Nilo y Mauritania|Le Maghreb, le Nil et la Mauritanie|マグレブ・ナイル・モーリタニア"),
  sah: t("The Sahel & West African Interior|El Sahel y el interior de África Occidental|Le Sahel et l'intérieur de l'Afrique de l'Ouest|サヘル・西アフリカ内陸"),
  gof: t("The Gulf of Guinea Coast|La costa del golfo de Guinea|La côte du golfe de Guinée|ギニア湾岸"),
  caf: t("Central Africa & the Congo Basin|África Central y la cuenca del Congo|L'Afrique centrale et le bassin du Congo|中部アフリカ・コンゴ盆地"),
  hoa: t("The Horn of Africa|El Cuerno de África|La Corne de l'Afrique|アフリカの角"),
  eaf: t("East Africa & the Great Lakes|África Oriental y los Grandes Lagos|L'Afrique de l'Est et les Grands Lacs|東アフリカ・大湖地方"),
  saf: t("Southern Africa|África Austral|L'Afrique australe|南部アフリカ"),
};

/**
 * アイテム9件。効果の種類は他の盤面と同じ(対応表は
 * `src/infrastructure/content/item-effect-rules.ts`)。植民地行政の道具では
 * なく、旅そのもの・交易そのものにまつわる品を選んだ。
 */
export const AFRICA_ITEMS = {
  telegraphslip: {
    e: "📡",
    price: 420,
    kind: "pre",
    n: t("A Telegraph Priority Slip|Un volante de prioridad telegráfica|Un bon de priorité télégraphique|電信優先証"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Colonial-era telegraph lines were usually strung alongside the railway they served, and a dispatch marked priority could clear the single track ahead of a train by ordering every other service into a siding until it passed. Stationmasters who ignored a priority slip risked their job, not just a delay.|Las líneas telegráficas de la época colonial solían tenderse junto al ferrocarril al que servían, y un despacho marcado como prioritario podía despejar la vía única por delante de un tren, ordenando a todos los demás servicios apartarse a una vía muerta hasta que pasara. Los jefes de estación que ignoraban un volante prioritario se jugaban el puesto, no solo un retraso.|Les lignes télégraphiques de l'époque coloniale couraient généralement le long du chemin de fer qu'elles desservaient, et une dépêche marquée prioritaire pouvait libérer la voie unique devant un train en ordonnant à tous les autres convois de se ranger sur une voie de garage jusqu'à son passage. Les chefs de gare qui ignoraient un bon prioritaire risquaient leur poste, pas seulement un retard.|植民地時代の電信線はたいてい、それが仕える鉄道に沿って張られていた。優先の印がついた電文は、他のすべての列車を側線へ退避させることで単線の前方を空けさせることができた。優先証を無視した駅長は、遅延どころか職を失う危険を冒すことになった。",
    ),
  },
  dhowpassage: {
    e: "⛵",
    price: 260,
    kind: "move",
    n: t("A Monsoon Dhow Passage|Un pasaje en dhow monzónico|Une traversée en boutre de mousson|季節風のダウ船の便",
    ),
    d: t(
      "Carried 8–12 squares. The wind picks where you land.|Te lleva de 8 a 12 casillas. El viento elige dónde llegas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu arrives.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "For centuries, Swahili coast traders timed entire voyages to the seasonal monsoon: the kaskazi wind carried lateen-rigged dhows south from Arabia and India between November and March, and the kusi carried them back north from April to September, so a captain who missed the turn of the wind simply waited months for the next one.|Durante siglos, los comerciantes de la costa suajili programaban travesías enteras según el monzón estacional: el viento kaskazi llevaba los dhows de vela latina hacia el sur desde Arabia e India entre noviembre y marzo, y el kusi los devolvía al norte de abril a septiembre, así que un capitán que perdía el cambio de viento simplemente esperaba meses al siguiente.|Pendant des siècles, les marchands de la côte swahilie calaient des voyages entiers sur la mousson saisonnière : le vent kaskazi portait les boutres à voile latine vers le sud depuis l'Arabie et l'Inde entre novembre et mars, et le kusi les ramenait vers le nord d'avril à septembre, si bien qu'un capitaine manquant le tournant du vent attendait simplement des mois le suivant.|スワヒリ海岸の商人たちは何世紀もの間、季節風に合わせて航海全体の計画を立てていた。カスカジ風は11月から3月にかけて三角帆のダウ船をアラビアやインドから南へ運び、クシ風は4月から9月にかけて北へ送り返す。風の変わり目を逃した船長は、次の機会まで何か月も待つほかなかった。",
    ),
  },
  gaugechit: {
    e: "🛞",
    price: 380,
    kind: "pre",
    n: t("A Break-of-Gauge Transfer Chit|Un vale de cambio de ancho de vía|Un bon de changement d'écartement|軌間変更の引換証"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Wherever two of the continent's railways meet at different gauges, freight has to be unloaded from one set of wagons and reloaded onto another rather than rolling straight through, a delay that can cost more time than the journey on either side of the yard. This chit is the paperwork proving a transfer was logged and paid for.|Donde quiera que dos ferrocarriles del continente se encuentran con anchos distintos, la carga debe descargarse de un juego de vagones y recargarse en otro en vez de pasar directamente, un retraso que puede costar más tiempo que el trayecto a cada lado del patio. Este vale es el papeleo que demuestra que el traslado se registró y se pagó.|Partout où deux chemins de fer du continent se rencontrent à des écartements différents, le fret doit être déchargé d'un jeu de wagons et rechargé sur un autre plutôt que de passer directement, un retard qui peut coûter plus de temps que le trajet de chaque côté du triage. Ce bon est la paperasse prouvant que le transfert a été consigné et payé.|大陸のどこかで軌間の違う二つの鉄道が出会うたびに、貨物は素通りできず一方の貨車から降ろされ、もう一方へ積み替えられる。その手間は操車場の前後の乗車時間より長くかかることもある。この引換証は、その積み替えの代金が払われ記録済みであることを示す書類である。",
    ),
  },
  resthousevoucher: {
    e: "🏚️",
    price: 300,
    kind: "passive",
    n: t("A Railway Resthouse Voucher|Un vale de albergue ferroviario|Un bon d'auberge ferroviaire|鉄道休憩所の宿泊券"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Long single-track lines through sparsely populated country kept simple resthouses at intervals for track crews and stranded passengers alike, stocked with a lamp, a kettle and a logbook where every traveller who sheltered there left their name and the date. Some of these buildings are the only structure for a hundred kilometres in any direction.|Las largas líneas de vía única por territorio poco poblado mantenían albergues sencillos a intervalos, tanto para las cuadrillas de vía como para los pasajeros varados, provistos de una lámpara, una tetera y un libro de registro donde cada viajero que se refugiaba allí dejaba su nombre y la fecha. Algunos de estos edificios son la única construcción en cien kilómetros a la redonda.|Les longues lignes à voie unique traversant des régions peu peuplées entretenaient de simples auberges à intervalles réguliers, pour les équipes de voie comme pour les voyageurs bloqués, garnies d'une lampe, d'une bouilloire et d'un registre où chaque voyageur y trouvant refuge inscrivait son nom et la date. Certains de ces bâtiments sont la seule construction sur cent kilomètres à la ronde.|人口の少ない土地を走る単線の長い路線には、保線班と足止めされた旅人の両方のために、一定の間隔で簡素な休憩所が置かれていた。ランプと薬缶、そして避難した旅人が名前と日付を書き残す帳面が備えられている。この建物が周囲百キロで唯一の構造物だという場所もある。",
    ),
  },
  kolanuts: {
    e: "🌰",
    price: 260,
    kind: "pre",
    n: t("A Sack of Kola Nuts|Un saco de nueces de cola|Un sac de noix de cola|コーラの実の袋"),
    d: t(
      "Sell it on and take the money.|Véndelo y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Across the West African savanna and Sahel, kola nuts were traded, gifted and chewed as a mild stimulant long before Europeans arrived, and their bitter caffeine-rich kernels functioned as a store of value along overland routes where coin was scarce, used to seal marriage agreements and welcome guests as much as to buy anything outright.|En la sabana y el Sahel de África Occidental, las nueces de cola se comerciaban, regalaban y masticaban como estimulante suave mucho antes de que llegaran los europeos, y sus semillas amargas y ricas en cafeína funcionaban como reserva de valor en rutas terrestres donde escaseaba la moneda, usadas para sellar acuerdos matrimoniales y dar la bienvenida a invitados tanto como para comprar algo directamente.|Dans la savane et le Sahel d'Afrique de l'Ouest, les noix de cola se troquaient, s'offraient et se mâchaient comme stimulant léger bien avant l'arrivée des Européens, et leurs graines amères riches en caféine servaient de réserve de valeur sur des routes terrestres où la monnaie manquait, utilisées pour sceller des accords de mariage et accueillir des invités autant que pour acheter quoi que ce soit directement.|西アフリカのサバンナとサヘルでは、ヨーロッパ人が到来するずっと前から、コーラの実が軽い興奮剤として交易され、贈られ、噛まれていた。苦く多量のカフェインを含むこの種子は、硬貨が乏しい陸路交易で価値の貯蔵手段として機能し、何かを直接買うためというより、結婚の取り決めを結んだり客をもてなしたりするために使われた。",
    ),
  },
  goldweight: {
    e: "⚖️",
    price: 140,
    kind: "passive",
    n: t("An Akan Gold-Weight|Una pesa de oro akan|Un poids à peser l'or akan|アカンの金分銅"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Akan goldsmiths in what is now Ghana and Côte d'Ivoire cast small brass weights, each shaped like an animal, tool or proverb-symbol, to measure gold dust in trade with a precision two merchants who spoke no common language could still agree on and trust. A trader's set of weights was checked constantly against a neighbour's, since a shaved or fake one lost everyone's confidence at once.|Los orfebres akan de lo que hoy es Ghana y Costa de Marfil fundían pequeñas pesas de latón, cada una con forma de animal, herramienta o símbolo proverbial, para medir el polvo de oro en el comercio con una precisión que dos mercaderes sin lengua común aún podían acordar y confiar. El juego de pesas de un comerciante se cotejaba constantemente con el de un vecino, ya que una recortada o falsa hacía perder la confianza de todos a la vez.|Les orfèvres akans, dans ce qui est aujourd'hui le Ghana et la Côte d'Ivoire, coulaient de petits poids en laiton, chacun en forme d'animal, d'outil ou de symbole proverbial, pour mesurer la poudre d'or dans le commerce avec une précision que deux marchands sans langue commune pouvaient encore s'accorder à faire confiance. Le jeu de poids d'un marchand était constamment vérifié contre celui d'un voisin, un poids limé ou faux faisant perdre la confiance de tous d'un coup.|現在のガーナやコートジボワールにあたる地域のアカン人の金細工師たちは、動物や道具、ことわざを象った小さな真鍮の分銅を鋳造し、共通の言語を持たない商人どうしでも信頼できる精度で金の粉を量った。商人の分銅一式はつねに隣の商人のものと突き合わされた。削られた偽物が一つでもあれば、みなの信用が一気に失われたからである。",
    ),
  },
  coffeesack: {
    e: "☕",
    price: 300,
    kind: "pre",
    n: t("A Sack of Green Coffee|Un saco de café verde|Un sac de café vert|生豆のコーヒー袋",
    ),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Coffee arabica grows wild only in the highland forests of southwestern Ethiopia, where it is thought to have been first brewed, and green (unroasted) beans travel far better than roasted ones, keeping their flavour for a year or more of transport by mule, truck and rail before reaching a roaster on another continent entirely.|El café arábica crece silvestre solo en los bosques de las tierras altas del suroeste de Etiopía, donde se cree que se preparó por primera vez, y los granos verdes (sin tostar) viajan mucho mejor que los tostados, conservando su sabor durante un año o más de transporte en mula, camión y tren antes de llegar a un tostador en otro continente.|Le café arabica pousse à l'état sauvage uniquement dans les forêts d'altitude du sud-ouest de l'Éthiopie, où l'on pense qu'il fut préparé pour la première fois, et les grains verts (non torréfiés) voyagent bien mieux que les grains torréfiés, conservant leur saveur pendant un an ou plus de transport à dos de mulet, en camion puis en train, avant d'atteindre un torréfacteur sur un tout autre continent.|アラビカ種のコーヒーは、エチオピア南西部の高地の森にしか野生で自生せず、最初に淹れられたのもこの地だとされている。生豆(焙煎前)は焙煎豆よりずっと輸送に強く、ラバやトラック、鉄道で1年以上運ばれても風味を保ち、まったく別の大陸の焙煎業者のもとへたどり着く。",
    ),
  },
  orewagonslip: {
    e: "🚃",
    price: 640,
    kind: "pre",
    n: t("A Long-Haul Ore Wagon Slip|Un vale de vagón minero de larga distancia|Un bon de wagon minier longue distance|長距離鉱石貨車の乗車証"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Some of the continent's ore trains run over 2.5km long with 200 or more wagons and no set passenger timetable at all, yet local travellers along a few of these lines still climb onto the empty return wagons for want of any other way across that stretch of country, an unofficial ride railway staff have long tolerated rather than approved.|Algunos trenes mineros del continente miden más de 2,5 km de largo, con 200 vagones o más y sin horario de pasajeros fijo, y aun así viajeros locales en algunas de estas líneas siguen subiendo a los vagones vacíos de vuelta por no tener otra forma de cruzar ese tramo de país, un viaje no oficial que el personal ferroviario lleva tiempo tolerando sin aprobarlo.|Certains trains de minerai du continent dépassent 2,5 km de long avec 200 wagons ou plus et n'ont aucun horaire voyageurs officiel, et pourtant des voyageurs locaux le long de quelques-unes de ces lignes montent encore sur les wagons vides du retour faute d'autre moyen de traverser ce tronçon de pays, un trajet officieux que le personnel ferroviaire tolère depuis longtemps sans l'approuver.|大陸の一部の鉱石列車は2.5kmを超える長さで貨車200両以上にもなり、旅客時刻表がまったく無い。それでも一部の路線沿いの地元の人々は、その区間を渡る他の手段が無いために、空荷で戻る貨車によじ登って乗る。鉄道側が長らく黙認してきた非公式の乗車である。",
    ),
  },
  trackwalkerlantern: {
    e: "🏮",
    price: 480,
    kind: "pre",
    n: t("A Trackwalker's Storm Lantern|El farol de tormenta de un vigilante de vía|La lanterne-tempête d'un garde-voie|保線員の嵐用ランタン"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "On lines too remote for automatic signals, a trackwalker patrolled a fixed stretch on foot or by bicycle every day before the first train, checking for washouts, cracked rail and stray animals, and carried a storm lantern bright enough to flag down a driver at night if the walk turned up trouble. A well-kept lantern from a line long since closed still draws collectors today.|En líneas demasiado remotas para señales automáticas, un vigilante de vía patrullaba a pie o en bicicleta un tramo fijo cada día antes del primer tren, buscando socavones, raíles agrietados y animales sueltos, y llevaba un farol de tormenta lo bastante brillante para hacer parar a un maquinista de noche si la ronda revelaba un problema. Un farol bien conservado de una línea cerrada hace tiempo todavía atrae a coleccionistas hoy.|Sur les lignes trop isolées pour des signaux automatiques, un garde-voie patrouillait à pied ou à bicyclette un tronçon fixe chaque jour avant le premier train, cherchant affouillements, rails fissurés et animaux égarés, et portait une lanterne-tempête assez vive pour arrêter un conducteur de nuit si la ronde révélait un problème. Une lanterne bien conservée d'une ligne fermée depuis longtemps attire encore des collectionneurs aujourd'hui.|自動信号を置けないほど辺鄙な路線では、保線員が始発列車の前に毎日決まった区間を徒歩か自転車で見回り、路盤の流失やレールの亀裂、迷い込んだ動物を確かめた。異常があれば夜でも運転士を止められるほど明るい嵐用ランタンを携えていた。とうに廃止された路線の、よく手入れされたランタンは、いまも収集家の目を引く。",
    ),
  },
};

/**
 * 厄災の神。特定の一国の民話を「大陸全体の伝承」として語らないよう、
 * 大陸を貫くはずだった鉄路(ケープ〜カイロ構想)そのものにまつわる噂という
 * 形にした(アジア盤面・世界一周盤面と同じ扱い)。
 */
export const AFRICA_SPIRIT = {
  e: "🛤️",
  n: t("The Unfinished Line|La línea inacabada|La ligne inachevée|繋がらなかった線"),
  big: t("The Unfinished Line's Long Wait|La larga espera de la línea inacabada|La longue attente de la ligne inachevée|繋がらなかった線の長い足止め"),
  ward: "resthousevoucher",
  arrive: t(
    "<b>🛤️ A single rail glints ahead where the survey markers say the line should have continued.</b> Trackworkers on half a dozen unconnected railways swap some version of the same story: a locomotive that runs a route Cecil Rhodes's 'Cape to Cairo' line never actually completed, appearing wherever two networks were meant to meet and never did. It now keeps pace with <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🛤️ Los marcadores de estudio dicen que la línea debía continuar, y allí, más adelante, brilla un solo raíl.</b> Los trabajadores de vía de media docena de ferrocarriles inconexos se cuentan alguna versión de la misma historia: una locomotora que recorre una ruta que la línea 'de El Cabo a El Cairo' de Cecil Rhodes nunca llegó a completar, apareciendo donde dos redes debían encontrarse y nunca lo hicieron. Ahora marcha a la par de <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🛤️ Un unique rail luit devant, là où les repères d'arpentage disent que la ligne aurait dû continuer.</b> Les cheminots d'une demi-douzaine de réseaux non reliés se racontent une version ou une autre de la même histoire : une locomotive qui parcourt un tracé que la ligne « du Cap au Caire » de Cecil Rhodes n'a jamais achevé, apparaissant partout où deux réseaux devaient se rejoindre et ne l'ont jamais fait. Il roule désormais au même rythme que <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|測量標がこの先も線路が続くはずだと示す場所で、一本のレールだけが光っている。互いにつながっていない半ダースほどの鉄道の保線員たちが、似たような話を語り継いでいる。セシル・ローズの「ケープ〜カイロ」線がついに完成させられなかった経路を走る機関車が、二つの鉄道網が出会うはずでいて一度も出会わなかった場所ならどこにでも現れるという。いまは目的地から最も遠い <b>{0}</b> と歩調を合わせ、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🛤️ <b>The unfinished line</b> shifts and now runs alongside <b>{0}</b>, farthest from {1}.|🛤️ <b>La línea inacabada</b> se desplaza y ahora circula junto a <b>{0}</b>, el más lejano de {1}.|🛤️ <b>La ligne inachevée</b> se déplace et longe désormais <b>{0}</b>, le plus loin de {1}.|🛤️ <b>繋がらなかった線</b> は場所を移し、{1} から最も遠い <b>{0}</b> の隣を走っている。",
  ),
  wake: t(
    "<b>{0}</b> has travelled four turns beside the phantom rail and it has never once pulled ahead or fallen back. A whistle sounds from a locomotive nobody can quite see, on a gauge that matches nothing on either side of it — <b>the Unfinished Line's Long Wait</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al raíl fantasma y este no se ha adelantado ni atrasado ni una vez. Suena el silbato de una locomotora que nadie logra ver bien, con un ancho que no coincide con nada a ambos lados: empieza <b>la larga espera de la línea inacabada</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> voyage depuis quatre tours à côté du rail fantôme, qui n'a jamais pris ni de l'avance ni du retard. Un sifflet retentit depuis une locomotive que personne ne distingue vraiment, sur un écartement qui ne correspond à rien de part et d'autre — <b>la longue attente de la ligne inachevée</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもその幻の線路と並んで走っていながら、一度も前に出ることも遅れることもなかった。誰の目にもよく見えない機関車から汽笛が鳴る。その軌間は前後のどちらとも合っていない。<b>繋がらなかった線の長い足止め</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> Cecil Rhodes's 'Cape to Cairo' railway, meant to link British territory the length of the continent, was never completed — gaps through Sudan, East Africa and the Congo were never closed, and today's separate national networks still don't join into one continuous line.|<b>Tras la historia:</b> el ferrocarril 'de El Cabo a El Cairo' de Cecil Rhodes, pensado para unir el territorio británico a lo largo de todo el continente, nunca se completó; los vacíos en Sudán, África Oriental y el Congo nunca se cerraron, y hoy las redes nacionales por separado todavía no se unen en una sola línea continua.|<b>Derrière l'histoire :</b> le chemin de fer « du Cap au Caire » de Cecil Rhodes, censé relier le territoire britannique sur toute la longueur du continent, ne fut jamais achevé — les vides à travers le Soudan, l'Afrique de l'Est et le Congo ne furent jamais comblés, et les réseaux nationaux séparés d'aujourd'hui ne se rejoignent toujours pas en une seule ligne continue.|<b>物語の背景:</b> 大陸の長さいっぱいにイギリス領を結ぶはずだったセシル・ローズの「ケープ〜カイロ」鉄道は、ついに完成しなかった。スーダン・東アフリカ・コンゴに残った空白は最後まで埋まらず、いまも各国別々の鉄道網は一本の連続した路線にはつながっていない。",
  ),
  pleased: t(
    "A lamp swings from an unseen hand as the phantom rail runs alongside, and something is set down on the ballast before it fades — a handful of coins, still warm from a pocket. <b>{0}</b> gains <span class='money'>+{1}</span>.|Un farol se balancea desde una mano invisible mientras el raíl fantasma corre al lado, y algo se deja en el balasto antes de desvanecerse: un puñado de monedas, todavía calientes de un bolsillo. <b>{0}</b> gana <span class='money'>+{1}</span>.|Une lanterne se balance depuis une main invisible tandis que le rail fantôme longe la voie, et quelque chose est déposé sur le ballast avant de s'estomper — une poignée de pièces, encore chaudes d'une poche. <b>{0}</b> gagne <span class='money'>+{1}</span>.|幻の線路が並んで走る間、見えない手が提灯を揺らし、消える前にバラストの上に何かが置かれた。まだポケットの温もりが残る硬貨の束だった。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A resthouse lamp still burns just off the line ahead, kettle warm though no keeper is in sight. The phantom whistle fades instead of nearing, passing <b>{0}</b> by without slowing this turn.|Un poco más adelante, junto a la vía, todavía arde la lámpara de un albergue, con la tetera caliente aunque no se ve a ningún guardián. El silbido fantasma se apaga en vez de acercarse, y pasa de largo junto a <b>{0}</b> sin frenar esta vuelta.|Un peu plus loin près de la voie, la lampe d'une auberge brûle encore, bouilloire chaude bien qu'aucun gardien ne soit en vue. Le sifflet fantôme s'estompe au lieu de se rapprocher, passant devant <b>{0}</b> sans ralentir ce tour-ci.|少し先、線路のそばで休憩所のランプがまだ灯り、番人の姿は無いのに薬缶だけが温かい。幻の汽笛は近づく代わりに遠ざかり、このターンは速度を落とさぬまま <b>{0}</b> の前を素通りした。",
  ),
};

/** 災難7種。大陸規模の鉄道インフラの弱さ・政治・気候につきものの遅れと厄介ごと。 */
export const AFRICA_DOOM = [
  {
    id: "harmattan",
    n: t("A sandstorm buries the desert line|Una tormenta de arena entierra la línea del desierto|Une tempête de sable ensevelit la ligne du désert|砂嵐が砂漠の線路を埋める"),
    t: t(
      "The sky over the Sahara turns the colour of rust an hour before the wall of sand arrives, and by the time it passes, dunes as tall as the rails themselves have crept across the ballast. On the loneliest stretches, a work gang has to be flown or trucked in specially, since no train can reach them to bring the shovels.|El cielo sobre el Sahara se vuelve del color del óxido una hora antes de que llegue el muro de arena, y para cuando pasa, dunas tan altas como los propios raíles se han deslizado sobre el balasto. En los tramos más solitarios, hay que llevar una cuadrilla en avión o camión especialmente, ya que ningún tren puede llegar para traer las palas.|Le ciel au-dessus du Sahara vire couleur de rouille une heure avant l'arrivée du mur de sable, et une fois qu'il est passé, des dunes aussi hautes que les rails eux-mêmes ont rampé sur le ballast. Sur les tronçons les plus isolés, une équipe doit être amenée spécialement par avion ou par camion, aucun train ne pouvant l'atteindre pour apporter les pelles.|サハラの空は砂の壁が来る一時間前から錆色に染まり、通り過ぎたあとにはレールと同じ高さの砂丘がバラストの上に忍び寄っている。最も人里離れた区間では、シャベルを運ぶ列車すら通えないため、作業班を特別に飛行機かトラックで送り込まねばならない。",
    ),
    regions: ["mag", "sah"],
  },
  {
    id: "washout",
    n: t("The rains wash out the embankment|Las lluvias se llevan el terraplén|Les pluies emportent le remblai|雨季の増水が路盤を洗い流す"),
    t: t(
      "A week of hard rain turns the usual trickle beside the track into a river that undercuts the embankment overnight, and the morning train finds ballast and sleepers hanging over open air where solid ground used to be. Repair crews rebuild the same stretch most years, each time setting the new bed a little further back.|Una semana de lluvias fuertes convierte el hilo de agua de siempre junto a la vía en un río que socava el terraplén de la noche a la mañana, y el tren de la mañana se encuentra con balasto y traviesas colgando sobre el vacío donde antes había tierra firme. Las cuadrillas reconstruyen el mismo tramo casi todos los años, cada vez un poco más atrás.|Une semaine de fortes pluies transforme le mince filet d'eau longeant la voie en une rivière qui sape le remblai en une nuit, et le train du matin trouve ballast et traverses suspendus dans le vide là où il y avait naguère de la terre ferme. Les équipes reconstruisent le même tronçon presque chaque année, un peu plus en retrait à chaque fois.|一週間続いた激しい雨が、線路脇のいつもの細い流れを一夜で土手をえぐる川に変え、朝の列車は固い地面があったはずの場所でバラストと枕木が宙にぶら下がっているのを見つけた。復旧班はほとんど毎年同じ区間を、そのたびに少し内側へ下げて造り直している。",
    ),
    regions: ["eaf", "saf"],
  },
  {
    id: "borderclosed",
    n: t("A border slams shut overnight|Una frontera se cierra de golpe durante la noche|Une frontière se ferme brutalement en pleine nuit|一夜にして国境が閉じる"),
    t: t(
      "A radio announcement in the small hours declares the crossing closed until further notice, and the platform on the near side fills with travellers who were due to be on the other side of the line by morning. Border staff shrug; the order came from further up than they can question.|Un anuncio de radio en la madrugada declara cerrado el paso hasta nuevo aviso, y el andén de este lado se llena de viajeros que debían estar al otro lado de la línea por la mañana. El personal fronterizo se encoge de hombros; la orden viene de más arriba de lo que pueden cuestionar.|Une annonce radio au petit matin déclare le poste-frontière fermé jusqu'à nouvel ordre, et le quai de ce côté se remplit de voyageurs qui devaient être de l'autre côté de la ligne au matin. Le personnel frontalier hausse les épaules ; l'ordre vient de trop haut pour qu'ils le contestent.|未明のラジオ放送が、追って通知があるまで国境を閉鎖すると告げ、朝までに線路の向こう側にいるはずだった旅人たちで手前側のホームが埋まる。国境の係員は肩をすくめるだけである。命令は彼らが異を唱えられるより上から下りてきたものだからだ。",
    ),
    regions: ["hoa", "mag"],
  },
  {
    id: "gaugebreak",
    n: t("The wagons wait at the break of gauge|Los vagones esperan en el cambio de ancho|Les wagons attendent au changement d'écartement|貨車が軌間の壁で足止めされる"),
    t: t(
      "The crane at the transfer yard has been down since yesterday, and a line of wagons on both gauges backs up while a mechanic who has been sent for still has not arrived. Cargo that was due to be reloaded onto the other network by lunchtime is still sitting exactly where it was unloaded.|La grúa del patio de transbordo lleva averiada desde ayer, y una fila de vagones de ambos anchos se acumula mientras un mecánico al que han llamado todavía no llega. La carga que debía recargarse en la otra red para el mediodía sigue exactamente donde se descargó.|La grue du chantier de transbordement est en panne depuis hier, et une file de wagons des deux écartements s'accumule tandis qu'un mécanicien qu'on a fait venir n'est toujours pas arrivé. La cargaison qui devait être rechargée sur l'autre réseau avant midi est encore exactement là où elle a été déchargée.|積み替え操車場のクレーンは昨日から動いておらず、呼ばれた整備士もまだ到着しないまま、両方の軌間の貨車が列をなして詰まっている。昼までにもう一方の鉄道網へ積み替えられるはずだった荷は、降ろされたそのままの場所に置かれている。",
    ),
    regions: ["eaf", "saf"],
  },
  {
    id: "checkpoint",
    n: t("A checkpoint official expects something extra|Un funcionario del control espera algo extra|Un agent du poste de contrôle attend un supplément|検問の係員が袖の下を期待する"),
    t: t(
      "The stamp stays hovering over the paperwork a little too long, and the official's eyes drift meaningfully toward a shirt pocket rather than the documents themselves. Everyone in the queue has seen this particular pause before, and everyone knows exactly what closes it.|El sello se queda suspendido sobre el papeleo un poco más de lo necesario, y la mirada del funcionario se desvía con intención hacia un bolsillo de la camisa en vez de a los documentos. Todos en la cola han visto antes esa pausa concreta, y todos saben exactamente qué la cierra.|Le tampon reste suspendu au-dessus des papiers un peu trop longtemps, et le regard de l'agent glisse avec insistance vers une poche de chemise plutôt que vers les documents eux-mêmes. Tout le monde dans la file a déjà vu cette pause précise, et tout le monde sait exactement ce qui y met fin.|判子が書類の上で少し長く止まったまま動かず、係員の目は書類そのものではなく、意味ありげにシャツの胸ポケットへと向けられる。列に並ぶ誰もがこの間合いを前に見たことがあり、それを終わらせる方法も誰もが正確に知っている。",
    ),
    regions: ["gof", "caf"],
  },
  {
    id: "wildlifedetour",
    n: t("A night service is rerouted around the reserve|Un servicio nocturno se desvía alrededor de la reserva|Un service de nuit est dévié autour de la réserve|夜行便が保護区を迂回させられる",
    ),
    t: t(
      "A ranger's radio call reports elephants grazing across the line inside the reserve boundary, close enough to the track that the usual slow-and-honk approach is judged too risky in the dark. The night service is held at the last station until a longer route around the reserve can be arranged.|Una llamada de radio de un guardabosques informa de elefantes pastando sobre la vía dentro de los límites de la reserva, lo bastante cerca como para que el habitual paso lento y pitando se juzgue demasiado arriesgado de noche. El servicio nocturno se retiene en la última estación hasta que se pueda organizar una ruta más larga alrededor de la reserva.|Un appel radio d'un garde signale des éléphants broutant sur la voie à l'intérieur des limites de la réserve, assez près des rails pour que l'habituelle approche lente en klaxonnant soit jugée trop risquée de nuit. Le service de nuit est retenu à la dernière gare jusqu'à ce qu'un plus long trajet contournant la réserve puisse être organisé.|レンジャーからの無線連絡で、保護区の境界内、線路のすぐ近くでゾウの群れが線路を横切って草を食んでいると知らされる。いつもの徐行と警笛だけでは夜間には危険すぎると判断され、夜行便は保護区を迂回する長い経路が手配できるまで最後の駅で足止めされる。",
    ),
    regions: ["eaf", "saf"],
  },
  {
    id: "coppertheft",
    n: t("Thieves strip the overhead copper wire|Ladrones arrancan el cable de cobre aéreo|Des voleurs arrachent le câble de cuivre aérien|架線の銅線が盗まれる"),
    t: t(
      "A stretch of electrified line goes dead overnight, and the fault crew finds not a break but an absence: several hundred metres of copper contact wire simply gone, cut down and carried off for scrap value that is a fraction of what it costs the railway to replace. The line reverts to diesel haulage until new wire can be strung.|Un tramo de línea electrificada se queda sin corriente durante la noche, y la cuadrilla de avería no encuentra una rotura, sino una ausencia: varios cientos de metros de cable de contacto de cobre simplemente han desaparecido, cortados y llevados por un valor de chatarra que es una fracción de lo que le cuesta al ferrocarril reponerlo. La línea vuelve a la tracción diésel hasta que se pueda tender cable nuevo.|Un tronçon de ligne électrifiée tombe en panne pendant la nuit, et l'équipe de dépannage ne trouve pas une coupure mais une absence : plusieurs centaines de mètres de câble de contact en cuivre ont simplement disparu, coupés et emportés pour une valeur de ferraille qui n'est qu'une fraction de ce qu'il en coûte au chemin de fer pour les remplacer. La ligne repasse à la traction diesel en attendant qu'un nouveau câble soit tendu.|電化区間の一部が一夜にして停電する。修理班が見つけたのは断線ではなく、そもそもの不在だった。数百メートルぶんの銅の架線がそっくり切り取られ持ち去られていた。鉄道側が架け直す費用のごく一部にしかならないくず鉄の値打ちのためである。新しい線を張り直すまで、この区間はディーゼル牽引に戻される。",
    ),
    regions: ["saf"],
  },
];

/**
 * 季節。4月始まりの12ヶ月。大陸盤面なので、月ごとに違う地方の気候・文化の
 * 出来事を取り上げる形にした(効果の数値は season-and-doom-rules.ts の
 * africa の項)。
 */
export const AFRICA_SEASONS = [
  {
    e: "🌧️",
    n: t("The long rains soak the East African highlands|Las lluvias largas empapan las tierras altas de África Oriental|Les longues pluies trempent les hauts plateaux d'Afrique de l'Est|東アフリカ高地に長雨が降る"),
    t: t(
      "The season's main rains, heavier and longer than the short rains later in the year, soak the highlands of Kenya, Uganda and Ethiopia for weeks on end, swelling the rivers that feed Lake Victoria and softening dirt roads into problems for anything without rails under it.|Las lluvias principales de la temporada, más intensas y largas que las cortas que llegan después, empapan las tierras altas de Kenia, Uganda y Etiopía durante semanas, hinchando los ríos que alimentan el lago Victoria y ablandando los caminos de tierra hasta convertirlos en un problema para todo lo que no tenga raíles debajo.|Les pluies principales de la saison, plus fortes et plus longues que les courtes pluies de plus tard dans l'année, trempent les hauts plateaux du Kenya, de l'Ouganda et de l'Éthiopie pendant des semaines, gonflant les rivières qui alimentent le lac Victoria et transformant les pistes en terre en un problème pour tout ce qui ne roule pas sur des rails.|その年の主な雨季にあたるこの長雨は、あとに来る短雨よりも強く長く、ケニア・ウガンダ・エチオピアの高地を何週間も濡らし続け、ヴィクトリア湖へ注ぐ川を増水させ、レールの上を走らないあらゆる乗り物にとって未舗装路をやっかいなものに変える。",
    ),
    f: t(
      "Farmers across the region plan their main planting season around the long rains' arrival, and a late or weak start can mean a shortened growing season and a harder year ahead well before the crop itself is ever assessed.|Los agricultores de la región planean su temporada principal de siembra en torno a la llegada de las lluvias largas, y un inicio tardío o débil puede significar una temporada de cultivo más corta y un año más duro por delante, mucho antes de evaluar la propia cosecha.|Les agriculteurs de la région planifient leur principale saison de semis autour de l'arrivée des longues pluies, et un début tardif ou faible peut signifier une saison de culture raccourcie et une année plus dure à venir, bien avant même que la récolte elle-même ne soit évaluée.|この地域の農家は、長雨の到来に合わせて主な作付け時期を計画する。始まりが遅かったり弱かったりすると、収穫を見るよりずっと前から、生育期間が短くなり厳しい一年になることが分かってしまう。",
    ),
  },
  {
    e: "🌊",
    n: t("The Zambezi crests at Victoria Falls|El Zambeze alcanza su máximo en las cataratas Victoria|Le Zambèze atteint son maximum aux chutes Victoria|ザンベジ川がヴィクトリアフォールズで増水の頂点を迎える"),
    t: t(
      "Fed by rains that fell far upstream months earlier, the Zambezi reaches its highest flow of the year, and the spray thrown up at Victoria Falls turns into a visible column of mist that can be seen from many kilometres away, drenching the rainforest that grows only on the cliffs directly opposite.|Alimentado por lluvias caídas mucho más arriba río arriba meses antes, el Zambeze alcanza su caudal más alto del año, y la espuma que lanzan las cataratas Victoria se convierte en una columna de niebla visible desde muchos kilómetros, empapando la selva que solo crece en los acantilados justo enfrente.|Alimenté par des pluies tombées bien en amont des mois plus tôt, le Zambèze atteint son débit le plus élevé de l'année, et les embruns projetés aux chutes Victoria se transforment en une colonne de brume visible à des kilomètres, trempant la forêt tropicale qui ne pousse que sur les falaises juste en face.|数か月前にはるか上流で降った雨に支えられ、ザンベジ川はこの時期に年間で最も水量が多くなる。ヴィクトリアフォールズが巻き上げるしぶきは、遠くからでも見える霧の柱になり、真向かいの崖にしか育たない雨林を濡らし続ける。",
    ),
    f: t(
      "The falls' local name, Mosi-oa-Tunya, means roughly 'the smoke that thunders,' a description of exactly this season's spray column rather than the drier months later in the year, when the same falls can shrink to a scatter of separate streams.|El nombre local de las cataratas, Mosi-oa-Tunya, significa aproximadamente 'el humo que truena', una descripción de la columna de espuma justo de esta temporada y no de los meses más secos del año, cuando las mismas cataratas pueden reducirse a una dispersión de arroyos separados.|Le nom local des chutes, Mosi-oa-Tunya, signifie à peu près « la fumée qui tonne », une description de cette colonne d'embruns précisément à cette saison, et non des mois plus secs de l'année, où les mêmes chutes peuvent se réduire à un éparpillement de filets d'eau séparés.|この滝の現地名モシ・オア・トゥニャは、おおよそ「雷鳴とどろく煙」を意味し、まさにこの時期のしぶきの柱を言い表したものである。一年のうちより乾いた時期には、同じ滝がいくつもの細い流れに分かれてしまうこともある。",
    ),
  },
  {
    e: "☀️",
    n: t("The Sahel's dry season peaks before the rains break|La estación seca del Sahel llega a su punto máximo antes de que rompan las lluvias|La saison sèche du Sahel culmine avant que les pluies n'éclatent|雨季を前にサヘルの乾季が最も厳しくなる"),
    t: t(
      "Temperatures across the Sahel climb to their highest of the year in the weeks just before the rains finally break, and dust hangs in air too hot and dry for it to settle, turning the sun a dull red disc that farmers watch as closely as any calendar for a sign the wet season is finally near.|Las temperaturas en el Sahel suben a su punto más alto del año en las semanas justo antes de que finalmente rompan las lluvias, y el polvo queda suspendido en un aire demasiado caliente y seco para asentarse, tiñendo el sol de un disco rojo apagado que los agricultores vigilan tan de cerca como cualquier calendario en busca de una señal de que la temporada húmeda por fin se acerca.|Les températures dans tout le Sahel grimpent à leur maximum de l'année dans les semaines précédant enfin la rupture des pluies, et la poussière reste en suspension dans un air trop chaud et sec pour qu'elle se dépose, teintant le soleil d'un disque rouge terne que les agriculteurs surveillent d'aussi près qu'un calendrier, à l'affût d'un signe que la saison humide approche enfin.|サヘル全域の気温は、ついに雨季が始まる直前のこの数週間に年間で最も高くなる。埃は落ち着くには暑く乾きすぎた空気の中に浮かんだままとなり、太陽はくすんだ赤い円盤のように染まる。農家はこれを、雨季がついに近づく兆しとしてどんな暦よりも注意深く見守る。",
    ),
    f: t(
      "This pre-rain heat peak, sometimes called the build-up, is often physically harder on people and livestock than the rains themselves, since humidity stays low even as temperatures climb, offering none of the cooling relief that comes once the clouds actually arrive.|Este pico de calor previo a las lluvias, a veces llamado la acumulación, suele ser físicamente más duro para personas y ganado que las propias lluvias, ya que la humedad se mantiene baja incluso mientras suben las temperaturas, sin ofrecer el alivio refrescante que llega una vez que de verdad aparecen las nubes.|Ce pic de chaleur avant les pluies, parfois appelé la montée, est souvent physiquement plus dur pour les personnes et le bétail que les pluies elles-mêmes, l'humidité restant basse même quand les températures grimpent, sans offrir le soulagement rafraîchissant qui arrive une fois les nuages réellement là.|この雨季前の暑さの頂点は「ビルドアップ」と呼ばれることもあり、湿度が低いまま気温だけが上がるため、雲が実際にやって来て初めて得られる涼しさが無く、人にも家畜にも雨季そのものより体にこたえることが多い。",
    ),
  },
  {
    e: "🦓",
    n: t("Herds reach the Mara River crossings|Los rebaños llegan a los cruces del río Mara|Les troupeaux atteignent les traversées de la rivière Mara|群れがマラ川の渡渉地点に達する"),
    t: t(
      "The Great Migration's wildebeest and zebra herds reach the Mara River this month, and the crossings themselves become the migration's most dramatic and dangerous stretch: crocodiles wait in the shallows, the far bank is a scramble of mud and hooves, and a single crossing can take hours to fully play out.|Los rebaños de ñus y cebras de la Gran Migración llegan este mes al río Mara, y los cruces se convierten en el tramo más dramático y peligroso de la migración: los cocodrilos esperan en las aguas someras, la orilla lejana es un caos de barro y pezuñas, y un solo cruce puede tardar horas en completarse del todo.|Les troupeaux de gnous et de zèbres de la Grande Migration atteignent la rivière Mara ce mois-ci, et les traversées elles-mêmes deviennent le tronçon le plus spectaculaire et dangereux de la migration : des crocodiles attendent dans les hauts-fonds, la rive opposée est un chaos de boue et de sabots, et une seule traversée peut prendre des heures à se dérouler entièrement.|グレート・マイグレーションのヌーとシマウマの群れは、この月にマラ川へたどり着く。渡渉そのものがこの移動のもっとも劇的で危険な区間になる。浅瀬にはワニが待ち構え、対岸は泥とひづめの混乱と化し、一度の渡渉が完全に終わるまで何時間もかかることもある。",
    ),
    f: t(
      "No single crossing point is used every year; the herds' exact route across the river shifts with water levels and where the banks have eroded, so guides who track the migration closely still cannot predict a crossing site more than a day or two in advance.|No se usa el mismo punto de cruce cada año; la ruta exacta de los rebaños a través del río cambia con el nivel del agua y dónde se han erosionado las orillas, así que los guías que siguen de cerca la migración aún no pueden predecir un lugar de cruce con más de uno o dos días de antelación.|Aucun point de traversée unique n'est utilisé chaque année ; l'itinéraire exact des troupeaux à travers la rivière change selon le niveau de l'eau et l'endroit où les berges se sont érodées, si bien que les guides qui suivent la migration de près ne peuvent toujours pas prédire un site de traversée plus d'un jour ou deux à l'avance.|渡渉地点は毎年同じ場所とは限らない。群れが川を渡る正確な経路は水位や岸の浸食具合によって変わるため、この移動を綿密に追うガイドでさえ、一日か二日以上前から渡渉地点を言い当てることはできない。",
    ),
  },
  {
    e: "🌼",
    n: t("Namaqualand's desert turns to flowers|El desierto de Namaqualand se cubre de flores|Le désert du Namaqualand se couvre de fleurs|ナマクアランドの砂漠が花で埋め尽くされる"),
    t: t(
      "After winter rain, the normally bare semi-desert of Namaqualand in South Africa's far northwest bursts into a carpet of orange, purple and white wildflowers stretching to the horizon, a bloom so dense and short-lived that farms and reserves alike see more visitors in these few weeks than the rest of the year combined.|Tras la lluvia invernal, el semidesierto normalmente pelado de Namaqualand, en el extremo noroeste de Sudáfrica, estalla en una alfombra de flores silvestres naranjas, moradas y blancas que se extiende hasta el horizonte, una floración tan densa y breve que granjas y reservas por igual reciben más visitantes en estas pocas semanas que en el resto del año junto.|Après les pluies hivernales, le semi-désert habituellement nu du Namaqualand, à l'extrême nord-ouest de l'Afrique du Sud, éclate en un tapis de fleurs sauvages orange, mauves et blanches s'étendant jusqu'à l'horizon, une floraison si dense et si brève que fermes et réserves reçoivent plus de visiteurs en ces quelques semaines que le reste de l'année réunie.|冬の雨のあと、南アフリカ最北西部にあるふだんは何も無いナマクアランドの半砂漠が、地平線まで広がるオレンジ・紫・白の野草の絨毯へと一変する。この開花はあまりに密で短命なため、農場も保護区もこの数週間だけで残り一年分を合わせたより多くの来訪者を迎える。",
    ),
    f: t(
      "The flowers, mostly daisies, only open fully in direct midday sun and close again by late afternoon, so visitors who arrive early or late in the day on a clear bloom day can find the same field looking almost bare.|Las flores, en su mayoría margaritas, solo se abren del todo bajo el sol directo del mediodía y se cierran de nuevo al final de la tarde, así que los visitantes que llegan temprano o tarde en un día despejado de floración pueden encontrar el mismo campo casi pelado.|Les fleurs, surtout des marguerites, ne s'ouvrent pleinement qu'au soleil direct de midi et se referment en fin d'après-midi, si bien que les visiteurs arrivant tôt ou tard un jour de floraison dégagée peuvent trouver le même champ presque nu.|花の大半はデイジーの仲間で、正午の直射日光のもとでしか完全には開かず、夕方には再び閉じてしまう。よく晴れた開花の日でも、朝早くや夕方遅くに訪れた人には、同じ野原がほとんど何も無いように見えることがある。",
    ),
  },
  {
    e: "🎉",
    n: t("Enkutatash rings in the Ethiopian New Year|Enkutatash celebra el Año Nuevo etíope|Enkutatash célèbre le Nouvel An éthiopien|エンクタタシュがエチオピアの新年を告げる"),
    t: t(
      "Ethiopia and Eritrea mark New Year's Day on their own Julian-derived calendar, several years behind the Gregorian date used almost everywhere else, right as the rains end and the highlands turn briefly golden with Meskel daisies. Children go door to door with bouquets and songs in exchange for small gifts.|Etiopía y Eritrea celebran el Año Nuevo en su propio calendario derivado del juliano, varios años por detrás de la fecha gregoriana usada casi en todas partes, justo cuando terminan las lluvias y las tierras altas se tiñen brevemente de dorado con las margaritas meskel. Los niños van de puerta en puerta con ramos y canciones a cambio de pequeños regalos.|L'Éthiopie et l'Érythrée célèbrent le jour de l'An selon leur propre calendrier dérivé du julien, en retard de plusieurs années sur la date grégorienne utilisée presque partout ailleurs, juste au moment où les pluies cessent et où les hauts plateaux se parent brièvement d'or grâce aux marguerites meskel. Les enfants font du porte-à-porte avec bouquets et chansons contre de petits cadeaux.|エチオピアとエリトリアは、ほぼ世界中で使われているグレゴリオ暦より数年遅れた独自のユリウス暦系の暦で新年を祝う。ちょうど雨季が終わり、高地がメスケルの黄色い花で一時的に金色に染まる頃である。子どもたちは花束と歌を手に家々を回り、小さな贈り物と引き換える。",
    ),
    f: t(
      "Because the Ethiopian calendar runs seven to eight years behind the Gregorian calendar, with a leap-year adjustment that briefly widens the gap each cycle, Ethiopia's New Year does not simply repeat a fixed number of years different from everyone else's — the exact gap depends on which month of the Gregorian year is being compared.|Como el calendario etíope va siete u ocho años por detrás del gregoriano, con un ajuste de año bisiesto que ensancha brevemente la brecha en cada ciclo, el Año Nuevo etíope no repite simplemente un número fijo de años distinto al de los demás: la brecha exacta depende de qué mes del año gregoriano se compare.|Comme le calendrier éthiopien accuse sept à huit ans de retard sur le calendrier grégorien, avec un ajustement d'année bissextile qui élargit brièvement l'écart à chaque cycle, le Nouvel An éthiopien ne répète pas simplement un nombre d'années fixe différent de celui des autres — l'écart exact dépend du mois de l'année grégorienne auquel on le compare.|エチオピア暦はグレゴリオ暦より7〜8年遅れており、閏年の調整でその差が周期ごとに一時的に広がるため、エチオピアの新年は他の国と単純に決まった年数だけずれているわけではない。正確な差は、グレゴリオ暦のどの月と比べるかによって変わる。",
    ),
  },
  {
    e: "🌦️",
    n: t("East Africa's short rains begin|Empiezan las lluvias cortas de África Oriental|Les courtes pluies d'Afrique de l'Est commencent|東アフリカの短雨が始まる"),
    t: t(
      "A second, lighter rainy season arrives across Kenya, Tanzania and the Horn, shorter and less reliable than the long rains earlier in the year but still enough to green the plains again and refill the smaller seasonal waterholes that larger wildlife depend on through the coming dry months.|Una segunda temporada de lluvias, más ligera, llega a Kenia, Tanzania y el Cuerno de África, más corta y menos fiable que las lluvias largas de principios de año, pero aun así suficiente para reverdecer las llanuras y rellenar los abrevaderos estacionales más pequeños de los que depende la fauna mayor durante los meses secos que vienen.|Une seconde saison des pluies, plus légère, arrive au Kenya, en Tanzanie et dans la Corne de l'Afrique, plus courte et moins fiable que les longues pluies du début d'année, mais suffisante pour reverdir les plaines et remplir les petits points d'eau saisonniers dont dépend la grande faune durant les mois secs à venir.|ケニア・タンザニア・アフリカの角に、二度目のより軽い雨季が訪れる。年の前半の長雨より短く当てにならないが、それでも平原を再び緑に変え、これから来る乾季の間、大型野生動物が頼る小さな季節性の水たまりを満たすには十分である。",
    ),
    f: t(
      "The short rains have become noticeably less predictable in recent decades, and some years fail almost entirely, a shift researchers link to changing Indian Ocean sea-surface temperature patterns rather than any single cause on land.|Las lluvias cortas se han vuelto notablemente menos predecibles en las últimas décadas, y algunos años fallan casi por completo, un cambio que los investigadores relacionan con patrones cambiantes de temperatura de la superficie del océano Índico más que con una sola causa en tierra.|Les courtes pluies sont devenues nettement moins prévisibles ces dernières décennies, et certaines années elles font presque entièrement défaut, un changement que les chercheurs relient à l'évolution des températures de surface de l'océan Indien plutôt qu'à une cause unique sur terre.|短雨は近年、目に見えて予測しづらくなっており、ほとんど降らない年もある。研究者たちはこの変化を、陸上の単一の原因ではなく、インド洋の海面水温パターンの変化と結びつけている。",
    ),
  },
  {
    e: "🌫️",
    n: t("The Harmattan carries Saharan dust west|El harmatán lleva polvo del Sahara hacia el oeste|L'harmattan porte la poussière saharienne vers l'ouest|ハルマッタンがサハラの砂塵を運ぶ"),
    t: t(
      "A dry, dusty wind begins blowing south-west out of the Sahara across West Africa, dimming the sun to a pale disc, cracking skin and lips, and grounding flights in some cities when visibility drops low enough. Musicians and market traders alike say they can taste it in the air before they can see it.|Un viento seco y polvoriento empieza a soplar hacia el suroeste desde el Sahara por África Occidental, atenuando el sol hasta un disco pálido, agrietando la piel y los labios, y dejando en tierra vuelos en algunas ciudades cuando la visibilidad baja lo suficiente. Músicos y comerciantes de mercado por igual dicen que lo notan en el aire antes de verlo.|Un vent sec et poussiéreux se met à souffler du sud-ouest depuis le Sahara à travers l'Afrique de l'Ouest, réduisant le soleil à un disque pâle, gerçant la peau et les lèvres, et clouant au sol des vols dans certaines villes quand la visibilité chute assez bas. Musiciens et commerçants de marché disent tous deux pouvoir le goûter dans l'air avant de le voir.|乾いた砂埃混じりの風がサハラから南西へ、西アフリカ全域に吹き始める。太陽は青白い円盤ほどにかすみ、肌と唇はひび割れ、視界が十分に落ちるといくつかの都市では便が欠航する。音楽家も市場の商人も、目に見える前から空気の中にそれを味わえると口をそろえる。",
    ),
    f: t(
      "Saharan dust carried by the Harmattan does not stop at Africa's coastline; satellite tracking shows plumes of it regularly crossing the Atlantic to affect air quality and even sunsets as far away as the Caribbean and the southern United States.|El polvo sahariano que lleva el harmatán no se detiene en la costa de África; el seguimiento por satélite muestra que sus penachos cruzan regularmente el Atlántico y afectan a la calidad del aire e incluso a las puestas de sol tan lejos como el Caribe y el sur de Estados Unidos.|La poussière saharienne portée par l'harmattan ne s'arrête pas à la côte africaine ; le suivi satellite montre que ses panaches traversent régulièrement l'Atlantique pour affecter la qualité de l'air et même les couchers de soleil aussi loin que les Caraïbes et le sud des États-Unis.|ハルマッタンが運ぶサハラの砂塵はアフリカの海岸線で止まらない。衛星による追跡では、その塵の帯が定期的に大西洋を渡り、遠くカリブ海やアメリカ南部の大気の質や夕焼けにまで影響を与えていることが分かっている。",
    ),
  },
  {
    e: "🌀",
    n: t("Cyclone season builds over the Mozambique Channel|La temporada de ciclones crece sobre el canal de Mozambique|La saison cyclonique se renforce sur le canal du Mozambique|モザンビーク海峡でサイクロンの季節が強まる"),
    t: t(
      "Warm Indian Ocean waters begin spinning up tropical cyclones that track toward Madagascar and the Mozambique Channel, and coastal rail and port operators start watching forecasts closely, since a direct hit can shut a harbour and its connecting line for weeks rather than days.|Las cálidas aguas del océano Índico empiezan a generar ciclones tropicales que se dirigen hacia Madagascar y el canal de Mozambique, y los operadores ferroviarios y portuarios costeros comienzan a vigilar de cerca los pronósticos, ya que un impacto directo puede cerrar un puerto y su línea de conexión durante semanas y no solo días.|Les eaux chaudes de l'océan Indien commencent à engendrer des cyclones tropicaux qui se dirigent vers Madagascar et le canal du Mozambique, et les exploitants ferroviaires et portuaires côtiers se mettent à surveiller de près les prévisions, un impact direct pouvant fermer un port et sa ligne de raccordement pendant des semaines plutôt que des jours.|インド洋の暖かい海水が、マダガスカルとモザンビーク海峡へ向かう熱帯サイクロンを生み出し始める。沿岸の鉄道・港湾の運営者は予報を注視し始める。直撃を受ければ、港とそれにつながる路線が数日ではなく数週間閉ざされることもあるからである。",
    ),
    f: t(
      "Madagascar is struck by more tropical cyclones per year on average than almost any other country in the Southern Hemisphere, a consequence of sitting directly in the path of storms forming over the warm western Indian Ocean.|Madagascar recibe en promedio más ciclones tropicales al año que casi cualquier otro país del hemisferio sur, consecuencia de encontrarse justo en la trayectoria de las tormentas que se forman sobre el cálido océano Índico occidental.|Madagascar est frappée en moyenne par plus de cyclones tropicaux par an que presque tout autre pays de l'hémisphère Sud, conséquence de sa position directement sur la trajectoire des tempêtes se formant sur l'ouest chaud de l'océan Indien.|マダガスカルは南半球のほぼどの国よりも年間平均で多くの熱帯サイクロンに見舞われる。これは、インド洋西部の暖かい海域で発生する嵐の進路に直接位置していることの結果である。",
    ),
  },
  {
    e: "🐄",
    n: t("Calving season peaks on the Serengeti's plains|La temporada de partos alcanza su pico en las llanuras del Serengeti|La saison des mises bas culmine dans les plaines du Serengeti|セレンゲティ平原で出産の最盛期を迎える"),
    t: t(
      "Roughly half a million wildebeest calves are born within a few short weeks on the short-grass plains of the southern Serengeti, all timed to arrive together so that predators, however many calves they take, can never take more than a small share of the whole.|Alrededor de medio millón de crías de ñu nacen en unas pocas semanas cortas en las llanuras de hierba corta del sur del Serengeti, todas sincronizadas para llegar juntas, de modo que los depredadores, por muchas crías que se lleven, nunca puedan tomar más que una pequeña parte del total.|Environ un demi-million de faons de gnous naissent en l'espace de quelques semaines à peine dans les plaines à herbe rase du sud du Serengeti, tous programmés pour arriver ensemble, si bien que les prédateurs, quel que soit le nombre de petits qu'ils prennent, ne peuvent jamais en prendre qu'une petite part de l'ensemble.|セレンゲティ南部の短草平原では、わずか数週間のうちにおよそ50万頭のヌーの子が生まれる。捕食者がどれだけ多くの子を捕らえようと、全体のごく一部にしかならないよう、出産の時期が一斉にそろえられているのである。",
    ),
    f: t(
      "Newborn wildebeest calves can stand within minutes of birth and run with the herd within a couple of days, among the fastest such transitions of any large mammal, a trait that evolved specifically to survive this exact predator-rich window.|Las crías de ñu recién nacidas pueden ponerse de pie a los pocos minutos de nacer y correr con el rebaño en un par de días, una de las transiciones más rápidas de cualquier gran mamífero, un rasgo que evolucionó específicamente para sobrevivir a esta ventana concreta, rica en depredadores.|Les faons de gnous nouveau-nés peuvent se tenir debout en quelques minutes après la naissance et courir avec le troupeau en quelques jours, l'une des transitions les plus rapides parmi les grands mammifères, un trait qui a évolué spécifiquement pour survivre à cette fenêtre précise, riche en prédateurs.|生まれたばかりのヌーの子は数分のうちに立ち上がり、数日のうちに群れと一緒に走れるようになる。大型哺乳類の中でも屈指の速さのこの成長は、まさにこの捕食者の多い時期を生き延びるために進化した特性である。",
    ),
  },
  {
    e: "🍇",
    n: t("The Cape winelands begin their harvest|Los viñedos del Cabo empiezan su vendimia|Les vignobles du Cap commencent leurs vendanges|ケープ・ワイン産地が収穫を始める"),
    t: t(
      "In the Southern Hemisphere autumn, pickers move through the vineyards around Stellenbosch and Franschhoek before dawn to bring in grapes while the fruit is still cool, part of an industry whose roots go back to Dutch settlers planting the first vines at the Cape in the 1650s.|En el otoño del hemisferio sur, los recolectores recorren los viñedos alrededor de Stellenbosch y Franschhoek antes del amanecer para recoger la uva mientras la fruta está aún fresca, parte de una industria cuyas raíces se remontan a los colonos neerlandeses que plantaron las primeras vides en el Cabo en la década de 1650.|En automne dans l'hémisphère Sud, les vendangeurs parcourent les vignobles autour de Stellenbosch et de Franschhoek avant l'aube pour rentrer le raisin tant que le fruit est encore frais, dans une industrie dont les racines remontent aux colons néerlandais qui plantèrent les premières vignes au Cap dans les années 1650.|南半球の秋、収穫作業員たちはステレンボッシュやフランシュフックのブドウ畑を夜明け前から歩き、果実がまだ涼しいうちに摘み取る。この産業は、1650年代にオランダ人入植者がケープに最初のブドウの木を植えたところにまで遡る。",
    ),
    f: t(
      "South Africa now ranks among the world's largest wine producers by volume, and its rail network once carried much of the crop to Cape Town's docks, though most of today's harvest travels the final leg to port by road tanker instead.|Sudáfrica se sitúa hoy entre los mayores productores de vino del mundo por volumen, y su red ferroviaria transportaba antes buena parte de la cosecha hasta los muelles de Ciudad del Cabo, aunque la mayor parte de la cosecha actual recorre el tramo final hasta el puerto en camión cisterna.|L'Afrique du Sud figure aujourd'hui parmi les plus grands producteurs de vin au monde en volume, et son réseau ferroviaire acheminait autrefois une grande partie de la récolte jusqu'aux quais du Cap, bien que la majeure partie de la récolte actuelle parcoure le dernier tronçon jusqu'au port en camion-citerne.|南アフリカはいまや生産量で世界有数のワイン産出国になっており、かつてはその鉄道網が収穫の多くをケープタウンの波止場まで運んでいた。もっとも今日の収穫の大半は、港までの最後の区間をタンクローリーで運ばれている。",
    ),
  },
  {
    e: "🌙",
    n: t("Ramadan moves across the Islamic lunar calendar|El Ramadán se desplaza por el calendario lunar islámico|Le ramadan se déplace sur le calendrier lunaire islamique|ラマダーンがイスラム太陰暦の上を移動する"),
    t: t(
      "Across North, West and East Africa's Muslim-majority regions, the fasting month reshapes the rhythm of an ordinary day: markets and offices run on shortened hours, streets empty out just before sunset, and then fill again the moment the call to prayer signals the day's fast is over.|En las regiones de mayoría musulmana del norte, oeste y este de África, el mes de ayuno cambia el ritmo de un día corriente: mercados y oficinas funcionan con horario reducido, las calles se vacían justo antes de la puesta de sol, y luego vuelven a llenarse en cuanto la llamada a la oración señala que ha terminado el ayuno del día.|Dans les régions à majorité musulmane d'Afrique du Nord, de l'Ouest et de l'Est, le mois de jeûne transforme le rythme d'une journée ordinaire : marchés et bureaux fonctionnent à horaires réduits, les rues se vident juste avant le coucher du soleil, puis se remplissent à nouveau dès que l'appel à la prière signale la fin du jeûne quotidien.|北・西・東アフリカのムスリムが多数を占める地域では、この断食月がふだんの一日のリズムを作り変える。市場も役所も短縮された時間で動き、日没直前には通りから人影が消え、その日の断食の終わりを告げる礼拝の呼びかけとともに再びにぎわいが戻る。",
    ),
    f: t(
      "Because the Islamic calendar is purely lunar, with no leap month to keep it aligned to the seasons, Ramadan drifts roughly eleven days earlier each solar year, cycling slowly through every season of the year over about three decades.|Como el calendario islámico es puramente lunar, sin mes bisiesto que lo mantenga alineado con las estaciones, el Ramadán se adelanta unos once días cada año solar, recorriendo lentamente todas las estaciones del año a lo largo de unas tres décadas.|Comme le calendrier islamique est purement lunaire, sans mois intercalaire pour le maintenir aligné sur les saisons, le ramadan avance d'environ onze jours chaque année solaire, parcourant lentement toutes les saisons de l'année sur environ trois décennies.|イスラム暦は純粋な太陰暦で、季節に合わせるための閏月が無いため、ラマダーンは太陽暦では毎年およそ11日ずつ早まっていき、およそ30年かけて一年のすべての季節をゆっくりと巡る。",
    ),
  },
];
