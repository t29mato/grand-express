/**
 * 日本百名山の国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 「国」ではなく山を都市とする盤面だが、他の国単位の盤面と同じ仕組みで
 * 動く(通貨倍率は日本・茨城と同じ10000)。季節は4月始まりの12ヶ月。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const HYAKUMEIZAN_META = {
  id: "hyakumeizan",
  name: t("The Hundred Mountains|Los Cien Montes|Les Cent Montagnes|日本百名山"),
  blurb: t(
    "A private list turned national obsession: one hundred peaks a lone climber judged worth a lifetime|Una lista privada convertida en obsesión nacional: cien picos que un alpinista solitario juzgó dignos de una vida|Une liste privée devenue obsession nationale : cent sommets qu'un alpiniste solitaire jugea dignes d'une vie|一人の登山家が選んだ私選の百座が、いつしか国民的な目標になった",
  ),
  cur: { pre: "¥", post: "", mul: 10000 },
  start: "fujisan",
  cpuNames: ["強力 Gōriki", "雷鳥 Raichō", "播隆 Banryū", "小屋番 Koyaban"],
  // 岩肌の灰、雪の白、針葉樹の濃緑、鳥居の朱、高山の空の青。
  stripe: ["#8b8f98", "#f2f6f8", "#1a4a2a", "#b8382a", "#8fc4e8"],
};

/**
 * 地方区分8つ。山域で切った(cities.mjsの内訳と対応)。当初は
 * `joshinetsu` が関東・上信越をまとめて29座、`fujihakone` が富士・
 * 天城の2座だけという偏りがあり、季節の地方収入倍率が効かない/効き
 * すぎるとの指摘を受けて、`kanto`(関東・日光・奥秩父・丹沢・富士・
 * 伊豆14座)と `joshinetsu`(上信越17座)に分け直した。
 */
export const HYAKUMEIZAN_REGIONS = {
  hokkaido: t("Hokkaido|Hokkaido|Hokkaido|北海道"),
  tohoku: t("Tohoku|Tohoku|Tohoku|東北"),
  kanto: t("Kanto, Nikko and Izu|Kanto, Nikko e Izu|Kanto, Nikko et Izu|関東・日光・伊豆"),
  joshinetsu: t("Jōshin'etsu|Jōshin'etsu|Jōshin'etsu|上信越"),
  kitaalps: t("The Northern Alps|Los Alpes Septentrionales|Les Alpes du Nord|北アルプス"),
  chuo_minami_alps: t(
    "The Central and Southern Alps|Los Alpes Centrales y Meridionales|Les Alpes centrales et du Sud|中央・南アルプス",
  ),
  kinkihokuriku: t("Kinki and Hokuriku|Kinki y Hokuriku|Kinki et Hokuriku|近畿・北陸"),
  nishinihon: t("Western Japan|Japón occidental|L'ouest du Japon|西日本"),
};

/**
 * アイテム9種。効果の種類は他の盤面と同じ9種(対応表は
 * `src/infrastructure/content/item-effect-rules.ts`)。`bearbells`/`bearspray`は
 * カナダが既に使っている鍵で、効果(none=ward / repel-spirit)が同じなので
 * そのまま使い回した(名前・絵はこの盤面独自の内容)。残り7つは新規の鍵。
 */
export const HYAKUMEIZAN_ITEMS = {
  kyuujoheri: {
    e: "🚁",
    price: 220,
    kind: "move",
    n: t(
      "Airlifted by Rescue Helicopter|Trasladado por helicóptero de rescate|Transporté par hélicoptère de secours|山岳救助ヘリで空輸される",
    ),
    d: t(
      "Carried 8–12 squares. The pilot picks where you land.|Te lleva de 8 a 12 casillas. El piloto elige dónde aterrizas.|Emporté de 8 à 12 cases. Le pilote choisit où tu atterris.|8〜12マス運ばれる。どこに降ろされるかは操縦士まかせ。",
    ),
    f: t(
      "Nagano, Toyama and Gifu each keep a dedicated mountain rescue helicopter on call through the climbing season, but the same low cloud and high wind that put a climber in trouble are often exactly the conditions that ground it, so a crew may have to wait out a storm before they can even take off.|Nagano, Toyama y Gifu mantienen cada una un helicóptero de rescate de montaña dedicado durante la temporada de ascensión, pero las mismas nubes bajas y el viento fuerte que ponen en apuros a un alpinista suelen ser justo las condiciones que lo dejan en tierra.|Nagano, Toyama et Gifu maintiennent chacune un hélicoptère de secours en montagne dédié durant la saison d'ascension, mais les mêmes nuages bas et le même vent fort qui mettent un alpiniste en danger sont souvent exactement les conditions qui le clouent au sol.|長野・富山・岐阜はそれぞれ登山シーズン中、専用の山岳救助ヘリを待機させている。しかし登山者を危機に陥れるのと同じ低い雲や強風が、そのままヘリを飛ばせない条件になることが多く、乗員は離陸すらできずに嵐が去るのを待つこともある。",
    ),
  },
  chikeizu: {
    e: "🗺️",
    price: 260,
    kind: "pre",
    n: t(
      "The 1:25,000 Topographic Map|El mapa topográfico 1:25.000|La carte topographique au 1/25 000|二万五千分の一地形図",
    ),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "The Geospatial Information Authority of Japan has surveyed the country at this exact scale since 1910, and its maps remain the standard climbers use to judge a slope before they reach it: contour lines drawn at 10-metre intervals close enough together to warn of a cliff long before the trail does.|El Instituto Geoespacial de Japón cartografía el país a esta escala exacta desde 1910, y sus mapas siguen siendo el estándar que usan los alpinistas para juzgar una pendiente antes de llegar a ella: curvas de nivel cada 10 metros, lo bastante juntas para avisar de un precipicio.|L'Institut géospatial du Japon cartographie le pays à cette échelle exacte depuis 1910, et ses cartes restent la référence des alpinistes pour juger une pente avant même de l'atteindre : des courbes de niveau tous les 10 mètres, assez rapprochées pour signaler une falaise.|国土地理院はこの縮尺で1910年から全国を測量しており、いまも登山者が斜面にたどり着く前にその険しさを読み取る標準の地図であり続けている。等高線は10m間隔で引かれ、その詰まり具合が登山道自体より先に崖の存在を告げる。",
    ),
  },
  tozanbus: {
    e: "🚌",
    price: 340,
    kind: "pre",
    n: t("The Trailhead Bus|El autobús al inicio del sendero|Le bus du départ de sentier|登山口行きのバス"),
    d: t("Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。"),
    f: t(
      "Many trailhead bus lines run only during the climbing season, a few months a year, and sit idle the rest of the time; at the busiest starting points, like Kamikochi or the trail into Yakushima's cedar forest, a reservation system now caps how many buses go up in a single morning.|Muchas líneas de autobús al inicio del sendero circulan solo durante la temporada de ascensión, unos pocos meses al año, y el resto del tiempo permanecen en cochera; en los puntos más concurridos, como Kamikochi, un sistema de reservas limita ahora cuántos autobuses suben en una sola mañana.|Beaucoup de lignes de bus vers les départs de sentiers ne circulent que pendant la saison d'ascension, quelques mois par an, et restent au dépôt le reste du temps ; aux points de départ les plus fréquentés, comme Kamikochi, un système de réservation limite désormais le nombre de bus montant en une seule matinée.|登山口行きのバス路線の多くは登山シーズンの数か月しか走らず、それ以外は車庫で眠っている。上高地や屋久島の杉林への道など特に混み合う起点では、一つの朝に何台まで登らせるかを定める予約制がいまでは導入されている。",
    ),
  },
  yakoubus: {
    e: "🚍",
    price: 580,
    kind: "pre",
    n: t("The Overnight Express Bus|El autobús nocturno expreso|Le bus express de nuit|夜行急行バス"),
    d: t("Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。"),
    f: t(
      "Before flights and bullet trains reached every region, climbers from Tokyo or Osaka would board an overnight bus after work on Friday and step off at a trailhead before dawn on Saturday, trading a night's sleep for a full extra day on the mountain, a trade many still make on purpose.|Antes de que los vuelos y los trenes bala llegaran a cada región, los alpinistas de Tokio u Osaka tomaban un autobús nocturno al salir del trabajo el viernes y bajaban en un inicio de sendero antes del amanecer del sábado, cambiando una noche de sueño por un día entero más en la montaña.|Avant que les vols et les trains à grande vitesse ne desservent chaque région, les alpinistes de Tokyo ou d'Osaka montaient dans un bus de nuit en sortant du travail le vendredi et descendaient à un départ de sentier avant l'aube le samedi, échangeant une nuit de sommeil contre une journée entière de plus en montagne.|直行便や新幹線がどの地域にも届く前は、東京や大阪の登山者は金曜の仕事終わりに夜行バスに乗り込み、土曜の夜明け前には登山口に降り立った。一晩の眠りと引き換えに、山でのまる一日を手に入れる。今もあえてそうする人は多い。",
    ),
  },
  bearbells: {
    e: "🔔",
    price: 300,
    kind: "passive",
    n: t("A String of Bear Bells|Un cordón de cascabeles antiosos|Un chapelet de clochettes anti-ours|熊よけの鈴"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "The idea is simple: a bear that hears a person coming from a distance will usually move off before there is any encounter at all, so trailhead shops in bear country from Shiretoko to the Northern Alps sell the bells by the register. Rangers note the jingling can be drowned out by a rushing stream or a strong wind.|La idea es simple: un oso que oye acercarse a una persona desde lejos suele apartarse antes de que haya ningún encuentro, así que las tiendas de los inicios de sendero en zona de osos venden estos cascabeles junto a la caja. Los guardas señalan que el tintineo puede ahogarse con un torrente o un viento fuerte.|L'idée est simple : un ours qui entend approcher une personne de loin s'écarte généralement avant toute rencontre, si bien que les boutiques de départ de sentier en territoire d'ours vendent ces clochettes près de la caisse. Les gardes notent que le tintement peut être noyé par un torrent ou un vent fort.|考え方は単純である。人が近づく音を遠くから聞いた熊は、たいてい出くわす前に離れていく。知床から北アルプスまで、熊の生息地の登山口の売店ではこの鈴がレジ脇に並ぶ。ただし鈴の音は急流や強風にかき消されることもあるという。",
    ),
  },
  bearspray: {
    e: "🧴",
    price: 420,
    kind: "pre",
    n: t("A Can of Bear Spray|Un bote de espray antiosos|Une bombe de poivre à ours|熊撃退スプレーの缶"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Rangers in Shiretoko National Park run practice demonstrations because the capsaicin spray only works aimed with, not against, the wind; more than one visitor has learned the hard way that spraying into a headwind sends the deterrent straight back at the person holding the can.|Los guardas del Parque Nacional de Shiretoko hacen demostraciones prácticas porque el espray de capsaicina solo funciona a favor del viento, no en contra; más de un visitante ha aprendido por las malas que rociar contra el viento devuelve el disuasivo directo a quien sostiene el bote.|Les gardes du parc national de Shiretoko font des démonstrations pratiques, car le spray à la capsaïcine ne fonctionne que dans le sens du vent, jamais contre lui ; plus d'un visiteur a appris à ses dépens qu'en pulvériser contre le vent renvoie le produit droit sur lui.|知床国立公園の監視員が実演講習を行うのは、このスプレーが風下に向けてでなければ効かないためである。向かい風に噴射して自分に吹き返される経験をした来訪者は一人や二人ではない。",
    ),
  },
  yamachizu: {
    e: "📖",
    price: 130,
    kind: "passive",
    n: t(
      "The Yama-to-Kōgen-Chizu Guide Map|El mapa-guía Yama-to-Kōgen-Chizu|Le guide-carte Yama-to-Kōgen-Chizu|『山と高原地図』",
    ),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Shobunsha has published a Yama-to-Kogen-Chizu map for nearly every range in the hundred since 1965, the same decade Fukada's book appeared, and for decades revised its printed hiking-time estimates using postcards mailed in by readers who timed their own climbs.|Shobunsha publica un mapa Yama-to-Kōgen-Chizu de casi todas las cordilleras de las cien desde 1965, la misma década en que apareció el libro de Fukada, y durante décadas revisó sus tiempos de marcha impresos con postales que enviaban lectores que cronometraban sus propias ascensiones.|Shobunsha publie une carte Yama-to-Kōgen-Chizu de presque toutes les chaînes des cent depuis 1965, la même décennie que la parution du livre de Fukada, et a longtemps révisé ses temps de marche imprimés grâce à des cartes postales envoyées par des lecteurs.|昭文社は深田久弥の本が出たのと同じ1965年から、百名山のほぼすべての山域で『山と高原地図』を刊行してきた。何十年ものあいだ、印刷されたコースタイムは自ら計測した読者から届くはがきをもとに改訂されてきた。",
    ),
  },
  matsutake: {
    e: "🍄",
    price: 200,
    kind: "pre",
    n: t(
      "A Lucky Matsutake Find|Un hallazgo de suerte de matsutake|Une trouvaille chanceuse de matsutake|松茸の当たり",
    ),
    d: t("Sell it on and take the money.|Véndela y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。"),
    f: t(
      "Matsutake cannot be farmed; the fungus lives in a partnership with living pine roots that has never been reproduced artificially, so every mushroom sold is one somebody actually found in a forest. Domestic Japanese harvests have fallen so far that most matsutake sold in Japan today is imported.|El matsutake no se puede cultivar; el hongo vive en una simbiosis con raíces de pino vivas que nunca se ha logrado reproducir de forma artificial, así que cada seta vendida es una que alguien encontró de verdad en el bosque. Las cosechas japonesas han caído tanto que hoy la mayoría del matsutake vendido en Japón es importado.|Le matsutake ne se cultive pas ; le champignon vit en symbiose avec des racines de pin vivantes, un lien qu'on n'a jamais réussi à reproduire artificiellement, si bien que chaque champignon vendu a réellement été trouvé en forêt. Les récoltes japonaises ont tant chuté que la plupart du matsutake vendu au Japon aujourd'hui est importé.|松茸は栽培できない。生きた松の根と共生する菌で、人工的な再現にはいまだ成功していない。売られている一本一本は実際に誰かが森で見つけたものである。国内の収穫量は大きく落ち込み、今日日本で売られる松茸の大半は輸入品になっている。",
    ),
  },
  raicho: {
    e: "🐦",
    price: 460,
    kind: "pre",
    n: t(
      "A Ptarmigan Crosses Your Path|Un lagópodo cruza tu camino|Un lagopède croise ton chemin|雷鳥との遭遇",
    ),
    d: t("Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。"),
    f: t(
      "The Japanese rock ptarmigan is a relict of the last ice age, stranded above the treeline when the climate warmed and the alpine tundra it needs retreated to the highest ridges of the Alps; its population here is the southernmost in the world, and old climbers still treat a sighting as a blessing from the mountain.|El lagópodo alpino japonés es un vestigio de la última glaciación, varado por encima del límite del bosque cuando el clima se calentó y la tundra alpina que necesita se retiró a las crestas más altas de los Alpes; su población aquí es la más meridional del mundo.|Le lagopède alpin japonais est un vestige de la dernière glaciation, resté isolé au-dessus de la limite forestière quand le climat s'est réchauffé et que la toundra alpine dont il a besoin s'est retirée sur les plus hautes crêtes des Alpes ; sa population ici est la plus méridionale au monde.|ニホンライチョウは最終氷期の生き残りで、気候が温暖化して必要な高山ツンドラがアルプスの最高所の稜線へと後退したあとも、そこに取り残された。この個体群は世界最南限のライチョウとされ、古参の登山者はいまも姿を見ることを山からの恵みとして扱う。",
    ),
  },
};

/**
 * 厄災の神。日本の山岳信仰に伝わる天狗にした。人を苦しめる悪霊ではなく、
 * 悪意より悪戯心で旅人を試す気まぐれな山の主として描く(トッケビ・
 * ダイダラボウと同じく「残酷ではなく、ただ度が過ぎるだけ」の性格)。
 */
export const HYAKUMEIZAN_SPIRIT = {
  e: "👺",
  n: t("The Tengu|El Tengu|Le Tengu|天狗"),
  big: t("The Tengu's Kamikakushi|El kamikakushi del Tengu|Le kamikakushi du Tengu|天狗の神隠し"),
  ward: "bearbells",
  arrive: t(
    "<b>👺 A tengu has taken an interest in you.</b> Old tales place these long-nosed mountain spirits on peaks steep enough that only they and the crows reach the top with ease, testing travelers less out of malice than out of a taste for mischief and a grudge against anyone who climbs carelessly. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>👺 Un tengu se ha fijado en ti.</b> Los viejos cuentos sitúan a estos espíritus de montaña de larga nariz en picos tan escarpados que solo ellos y los cuervos llegan cómodamente a la cima, y ponen a prueba a los viajeros menos por malicia que por gusto de travesura. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>👺 Un tengu s'est intéressé à toi.</b> Les vieux contes placent ces esprits de montagne au long nez sur des sommets si escarpés que seuls eux et les corbeaux en atteignent le faîte aisément, et ils mettent les voyageurs à l'épreuve moins par malice que par goût de l'espièglerie. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>👺 天狗に目を付けられた。</b> 昔話では、この鼻の高い山の精はカラスと自分たちしか楽に登れないほどの険しい峰に棲み、悪意というより悪戯心と、雑な登り方をする者への腹立たしさから旅人を試すとされる。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "👺 <b>The tengu</b> loses interest and leaps after <b>{0}</b>, farthest from {1}.|👺 <b>El tengu</b> pierde el interés y salta tras <b>{0}</b>, el más lejano de {1}.|👺 <b>Le tengu</b> se désintéresse et bondit vers <b>{0}</b>, le plus loin de {1}.|👺 <b>天狗</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ跳んでいった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the tengu and never once startled him off the path. He spreads his great feather fan and stirs up a sudden mountain wind — <b>the Tengu's Kamikakushi</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al tengu sin haberlo apartado del camino ni una vez. Él despliega su gran abanico de plumas y levanta un viento repentino de montaña: empieza <b>el kamikakushi del Tengu</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le tengu sans jamais l'avoir écarté du chemin. Il déploie son grand éventail de plumes et soulève un vent de montagne soudain : <b>le kamikakushi du Tengu</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンも天狗と歩いていながら、一度もその道を外させられなかった。天狗は大きな羽団扇を広げ、突然の山風を巻き起こす。<b>天狗の神隠し</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> for centuries, a person who vanished in the mountains without explanation was said to have been taken by tengu-kakushi, and search parties would ring bells and beat drums through the night on the belief that the sound could make a tengu lose his grip and let the missing person go.|<b>Tras la historia:</b> durante siglos, quien desaparecía en la montaña sin explicación se decía que había sido llevado por el tengu-kakushi, y las partidas de búsqueda hacían sonar campanas y tambores toda la noche, creyendo que el sonido podía hacer que el tengu perdiera su agarre.|<b>Derrière l'histoire :</b> pendant des siècles, quiconque disparaissait en montagne sans explication était dit emporté par le tengu-kakushi, et les équipes de recherche faisaient sonner cloches et tambours toute la nuit, croyant que le son pouvait faire lâcher prise au tengu.|<b>物語の背景:</b> 何世紀ものあいだ、山で理由もなく姿を消した者は天狗にさらわれたとされ、捜索隊は一晩じゅう鈴や太鼓を鳴らした。その音が天狗の力を緩め、行方知れずの者を手放させると信じられていたからである。",
  ),
  pleased: t(
    "He flicks his great feather fan for the fun of it, and a coin spins loose from the gust. <b>{0}</b> gains <span class='money'>+{1}</span>.|Blande su gran abanico de plumas por diversión, y una moneda sale volando con la ráfaga. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il agite son grand éventail de plumes pour s'amuser, et une pièce s'envole dans la rafale. <b>{0}</b> gagne <span class='money'>+{1}</span>.|面白がって大きな羽団扇を振ったはずみで、突風とともに銭が一枚飛び出した。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A string of bells rings out sharp and sudden. Tengu are said to hate the sound above almost everything, and he flinches back, passing <b>{0}</b> by without noticing this turn.|Un cordón de cascabeles suena de golpe. Se dice que los tengu odian ese sonido por encima de casi todo, y retrocede, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|Un chapelet de clochettes résonne d'un coup. On dit que les tengu détestent ce son par-dessus presque tout, et il recule, passant devant <b>{0}</b> sans le remarquer ce tour-ci.|鈴の音が鋭く鳴り響いた。天狗はほとんど何よりもこの音を嫌うとされる。彼はひるんで後ずさり、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。天狗の悪戯好きな性格に合わせつつ、遭難を娯楽にしない範囲で。 */
export const HYAKUMEIZAN_DOOM = [
  {
    id: "kirimayoi",
    n: t(
      "Dense fog swallows the trail|La niebla espesa engulle el sendero|Un brouillard épais avale le sentier|濃霧が登山道を呑み込む",
    ),
    t: t(
      "The ridge that was clear at the last rest stop vanishes into a wall of white within minutes, and the painted trail markers on the rocks become the only thing to trust. Seasoned hikers stop and wait it out rather than push on by guesswork, since mountain fog here can close in and lift again within the hour.|La cresta que estaba despejada en la última parada desaparece en una pared blanca en minutos, y las marcas pintadas en las rocas se vuelven lo único de fiar. Los excursionistas con experiencia se detienen a esperar en vez de avanzar a ciegas, porque la niebla de montaña aquí puede cerrarse y levantarse de nuevo en una hora.|La crête, dégagée à la dernière halte, disparaît en quelques minutes derrière un mur blanc, et les marques peintes sur les rochers deviennent la seule chose fiable. Les randonneurs expérimentés s'arrêtent et attendent plutôt que d'avancer au jugé, car le brouillard de montagne ici peut se refermer et se lever de nouveau en une heure.|直前の休憩地点では晴れていた稜線が、数分のうちに真っ白な壁の向こうへ消える。頼れるのは岩に描かれたペンキ印だけになる。経験を積んだ登山者は当てずっぽうで進まず足を止めて待つ。この霧は1時間もすれば晴れることもあるからである。",
    ),
    months: [2, 3],
  },
  {
    id: "rakurai",
    n: t(
      "Caught by a thunderhead on the ridge|Sorprendido por un nubarrón en la cresta|Surpris par un nuage d'orage sur la crête|稜線で雷雲に捕まる",
    ),
    t: t(
      "An afternoon thundercloud builds fast enough to go from a distant rumble to directly overhead in under half an hour, and the open ridge is the worst possible place to be caught with a metal-tipped trekking pole in hand. Everyone crouches low in a hollow below the ridgeline until the worst of it passes, soaked through and short on daylight.|Un nubarrón de tarde crece tan rápido que pasa de un trueno lejano a estar justo encima en menos de media hora, y la cresta abierta es el peor lugar posible para que te sorprenda con un bastón de puntera metálica en la mano. Todos se agachan en una hondonada bajo la cresta hasta que pasa lo peor, empapados y con poca luz de día.|Un nuage d'orage de l'après-midi grossit assez vite pour passer d'un grondement lointain à la verticale en moins d'une demi-heure, et la crête dégagée est le pire endroit où se faire surprendre avec un bâton de marche à embout métallique en main. Tout le monde s'accroupit dans un creux sous la crête jusqu'à ce que le plus fort passe, trempé et à court de jour.|午後の積乱雲は、遠くの雷鳴から真上に来るまで30分もかからないほど速く育つ。開けた稜線は、金属の石突きの付いたトレッキングポールを手にしたまま雷雲に捕まる最悪の場所である。全員が稜線の下のくぼみに身を低くして最悪の時間をやり過ごす。ずぶ濡れになり、日はもう傾いている。",
    ),
    months: [3, 4],
  },
  {
    id: "kumadeai",
    n: t(
      "A bear crosses the trail ahead|Un oso cruza el sendero más adelante|Un ours traverse le sentier plus loin|クマと鉢合わせして退却",
    ),
    t: t(
      "A dark shape ambling through the undergrowth thirty metres up the trail is enough to end the day's plan right there; the party backs away slowly, talking loudly, and turns around rather than test whether the bear noticed them first. Nobody is hurt, but the summit waits for another day.|Una forma oscura que deambula entre la maleza treinta metros más adelante en el sendero basta para acabar ahí mismo con el plan del día; el grupo retrocede despacio, hablando alto, y da media vuelta en vez de comprobar si el oso los vio primero. Nadie sale herido, pero la cima espera para otro día.|Une forme sombre déambulant dans les broussailles trente mètres plus haut sur le sentier suffit à mettre fin sur-le-champ au plan du jour ; le groupe recule lentement en parlant fort et rebrousse chemin plutôt que de vérifier si l'ours les a vus le premier. Personne n'est blessé, mais le sommet attendra un autre jour.|30メートルほど先の茂みをのっそり歩く黒い影を見た瞬間、その日の計画はそこで終わる。一行はゆっくり後ずさりしながら大声で話し、クマが先に気づいたかどうかを確かめるより引き返すことを選ぶ。誰も怪我はしないが、山頂はまた別の日に持ち越しになる。",
    ),
    months: [5, 6],
  },
  {
    id: "hachisasare",
    n: t(
      "A giant hornet gives chase|Una avispa gigante persigue|Un frelon géant donne la chasse|オオスズメバチに追われる",
    ),
    t: t(
      "A single scout hornet circling too close to the trail is the signal to freeze rather than swat, since a swipe reads as an attack on the nest and the whole colony can follow; someone in the group gets stung anyway backing away too fast, and the rest of the afternoon is spent nursing the swelling rather than gaining elevation.|Una sola avispa exploradora que da vueltas demasiado cerca del sendero es la señal para quedarse quieto y no manotear, pues un golpe se interpreta como un ataque al nido y puede seguir toda la colonia; alguien del grupo acaba picado igualmente al retroceder demasiado rápido.|Un unique frelon éclaireur tournant trop près du sentier est le signal qu'il faut se figer plutôt que de l'écarter d'un geste, un tel geste étant perçu comme une attaque du nid, ce qui peut faire suivre toute la colonie ; quelqu'un du groupe se fait quand même piquer en reculant trop vite.|一匹の偵察バチが登山道の近くを旋回し始めたら、払いのけず動きを止めるのが合図である。払う動きは巣への攻撃と受け取られ、群れ全体が追ってくることもある。それでも後ずさりが速すぎた誰かが刺され、残りの午後は標高を稼ぐ代わりに腫れの手当てに費やされる。",
    ),
    months: [4, 5],
  },
  {
    id: "manshitsu",
    n: t(
      "The reserved hut turns out fully booked|El refugio reservado resulta estar lleno|Le refuge réservé se révèle complet|予約したはずの山小屋が満室",
    ),
    t: t(
      "The paper reservation slip and the hut's own logbook do not agree, and by the time the mistake is sorted out every futon in the room is already claimed by someone who arrived earlier. A spot opens up on the floor of the dining hall for a fee, which is not quite the night's rest anyone had in mind.|El resguardo de reserva en papel y el propio registro del refugio no coinciden, y para cuando se aclara el error ya hay alguien que llegó antes ocupando cada futón de la sala. Se abre un hueco en el suelo del comedor mediante pago, que no es del todo el descanso nocturno que nadie tenía en mente.|Le coupon de réservation papier et le registre du refuge ne concordent pas, et le temps de démêler l'erreur, chaque futon de la salle est déjà réclamé par quelqu'un arrivé plus tôt. Une place se libère sur le sol de la salle à manger moyennant un supplément, ce qui n'est pas tout à fait le repos nocturne espéré.|紙の予約票と山小屋自身の宿泊台帳が食い違っており、行き違いが解けたころには部屋の布団はすべて先に着いた誰かのものになっている。追加料金で食堂の床に場所が空くが、思い描いていた夜の休息とはいささか違う。",
    ),
  },
  {
    id: "korogashi",
    n: t(
      "A rockfall blocks the ridge path|Un desprendimiento bloquea el sendero de cresta|Un éboulement bloque le sentier de crête|落石で登山道が塞がれる",
    ),
    t: t(
      "A rock loosened by the last hard freeze-thaw cycle lets go somewhere up the slope and comes to rest squarely across the marked trail, too large to move by hand. The party backtracks to the last junction and takes the longer detour route, arriving at the hut well after the kitchen has stopped serving.|Una roca aflojada por el último ciclo intenso de hielo y deshielo se desprende en algún punto de la ladera y queda justo atravesada en el sendero señalizado, demasiado grande para moverla a mano. El grupo retrocede hasta el último cruce y toma el desvío más largo, llegando al refugio bien después de que la cocina haya cerrado.|Un rocher desserré par le dernier cycle de gel-dégel intense lâche quelque part sur la pente et vient se ficher en travers du sentier balisé, trop gros pour être déplacé à la main. Le groupe rebrousse chemin jusqu'au dernier embranchement et prend le détour plus long, arrivant au refuge bien après la fermeture de la cuisine.|直前の厳しい凍結と融解の繰り返しで緩んでいた岩が斜面のどこかで外れ、標識のある登山道をちょうど塞ぐ形で止まる。手では動かせない大きさである。一行は最後の分岐点まで戻って遠回りの道を選び、山小屋には食堂の営業がとうに終わったころに着く。",
    ),
  },
  {
    id: "tengukakushi",
    n: t(
      "Led astray by a tengu|Un tengu te hace perder el camino|Un tengu t'égare|天狗に化かされる",
    ),
    t: t(
      "The trail markers seem to repeat themselves, and a full hour of walking somehow returns the party to the same lichen-covered boulder they passed already. Old-timers blame a tengu for this exact trick, walking a traveler in a slow circle through the trees purely for the sport of watching them work it out.|Las marcas del sendero parecen repetirse, y una hora entera caminando devuelve de algún modo al grupo a la misma roca cubierta de líquenes por la que ya pasaron. Los veteranos culpan de esta treta exacta a un tengu, que hace caminar en círculo lento a un viajero entre los árboles solo por el gusto de verlo darse cuenta.|Les marques du sentier semblent se répéter, et une heure entière de marche ramène étrangement le groupe au même rocher couvert de lichen déjà croisé. Les anciens en accusent un tengu, qui fait tourner lentement un voyageur en rond parmi les arbres, uniquement pour le plaisir de le voir s'en apercevoir.|同じ道標が何度も現れるように思え、一時間まるまる歩いたはずが、なぜか先ほど通った地衣類に覆われた同じ岩に戻ってしまう。古参の登山者はこの仕掛けを天狗のしわざだとする。旅人が自分で気づくのを面白がって、木々のあいだをゆっくり堂々巡りさせるという。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、日本・韓国と同じく
 * 地方まるごとの好不況で差をつける(効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の hyakumeizan の項)。
 */
export const HYAKUMEIZAN_SEASONS = [
  {
    e: "🌸",
    n: t(
      "Cherry blossoms bloom below while snow still grips the peaks|Los cerezos florecen abajo mientras la nieve aún aferra las cumbres|Les cerisiers fleurissent en bas tandis que la neige tient encore les sommets|山麓は桜、山頂はまだ雪に閉ざされる",
    ),
    t: t(
      "Lowland towns fill with cherry blossoms while the high peaks stay locked under winter snowpack, and this gap between the seasons at sea level and at altitude is exactly what makes the wet, heavy snow of early spring the most avalanche-prone of the year on steep upper slopes. Climbers switch from winter crampons to lighter spring gear only gradually, watching the freeze-thaw cycle rather than the calendar.|Los pueblos de las tierras bajas se llenan de flores de cerezo mientras las cumbres altas siguen bajo el manto de nieve invernal, y esta brecha entre las estaciones al nivel del mar y en altitud es justo lo que hace que la nieve húmeda y pesada de principios de primavera sea la más propensa a aludes del año en las laderas altas empinadas.|Les villes de plaine se couvrent de fleurs de cerisier tandis que les hauts sommets restent sous le manteau neigeux hivernal, et cet écart entre les saisons au niveau de la mer et en altitude est justement ce qui rend la neige humide et lourde du début du printemps la plus propice aux avalanches de l'année sur les pentes hautes et raides.|山麓の町が桜で埋まる一方、高峰は冬の積雪にまだ閉ざされたままで、海抜0mと山頂とのこの季節のずれこそが、急な上部斜面にとって一年でいちばん雪崩の危険が高い、早春の重く湿った雪を生む。登山者は暦ではなく凍結と融解の繰り返しを見ながら、少しずつ冬用アイゼンから軽い春山装備へと切り替えていく。",
    ),
    f: t(
      "Japan's meteorological agency and mountain forecasters track the freeze-thaw cycle separately from the general spring forecast, because a slope that is safely frozen solid at dawn can turn to unstable slush by early afternoon on the same day.|La agencia meteorológica de Japón y los pronosticadores de montaña siguen el ciclo de hielo y deshielo por separado del pronóstico general de primavera, porque una ladera helada de forma segura al amanecer puede volverse aguanieve inestable a primera hora de la tarde ese mismo día.|L'agence météorologique japonaise et les prévisionnistes de montagne suivent le cycle de gel-dégel séparément des prévisions générales de printemps, car une pente solidement gelée à l'aube peut devenir une neige fondante instable dès le début d'après-midi le même jour.|気象庁や山岳予報は、春の一般的な予報とは別に凍結・融解の周期を追っている。夜明けにはしっかり凍っていた斜面が、同じ日の午後早くには不安定なざらめ雪に変わることもあるからである。",
    ),
  },
  {
    e: "🎌",
    n: t(
      "Golden Week crowds the trailheads|La Semana Dorada llena los senderos|La Semaine dorée envahit les départs de sentiers|ゴールデンウィークで登山口が混み合う",
    ),
    t: t(
      "A cluster of national holidays late in the month creates the single busiest week on the trails all year, with huts fully booked months in advance, yet many high peaks still carry the dangerous residual snow of early spring, catching underprepared holiday crowds off guard even as the lowlands feel fully like spring.|Un grupo de festivos nacionales a finales de mes crea la semana más concurrida del año en los senderos, con los refugios reservados con meses de antelación, pero muchas cumbres altas aún conservan la peligrosa nieve residual de principios de primavera.|Une série de jours fériés nationaux en fin de mois crée la semaine la plus fréquentée de l'année sur les sentiers, les refuges étant complets des mois à l'avance, mais de nombreux hauts sommets portent encore la dangereuse neige résiduelle du début du printemps.|月末に固まる国民の祝日が、一年でいちばん登山道が混み合う一週間を生む。山小屋は何か月も前から予約で埋まるが、多くの高峰にはまだ早春の危険な残雪が残っており、麓ではすっかり春らしい陽気でも、備えの足りない行楽客が思わぬ雪に足を取られることもある。",
    ),
    f: t(
      "The week takes its name from a 1950s film-industry marketing term for the period, not from any single holiday, and it now anchors the release schedule of major Japanese films the same way it anchors mountain hut bookings.|La semana toma su nombre de un término de marketing de la industria cinematográfica de los años cincuenta para ese periodo, no de un festivo concreto, y hoy marca el calendario de estrenos de las grandes películas japonesas igual que marca las reservas de los refugios de montaña.|La semaine tire son nom d'un terme marketing de l'industrie cinématographique des années 1950 désignant cette période, et non d'un jour férié précis, et elle rythme aujourd'hui la sortie des grands films japonais comme elle rythme les réservations des refuges.|この週の呼び名は特定の祝日ではなく、1950年代に映画業界がこの時期を指して使った宣伝用語に由来する。今では山小屋の予約と同じように、日本の話題作の公開時期もこの週を軸に組まれる。",
    ),
  },
  {
    e: "💧",
    n: t(
      "The rainy season reaches the mountains|La temporada de lluvias llega a las montañas|La saison des pluies atteint les montagnes|梅雨が山にも及ぶ",
    ),
    t: t(
      "Low hills turn thick with hydrangea while the rainy front settles in for weeks, and on the highest peaks the retreating snowline uncovers alpine flowers just as the front's damp air keeps trails soft and slick underfoot. Trail erosion is worst this month, and volunteer groups often close short stretches to let the ground recover.|Las colinas bajas se cubren de hortensias mientras el frente lluvioso se instala durante semanas, y en las cumbres más altas la línea de nieve que se retira descubre flores alpinas justo cuando el aire húmedo del frente mantiene los senderos blandos y resbaladizos.|Les collines basses se couvrent d'hortensias tandis que le front pluvieux s'installe pour des semaines, et sur les plus hauts sommets, la limite des neiges en retrait découvre des fleurs alpines juste au moment où l'air humide du front garde les sentiers mous et glissants.|低い丘は紫陽花で厚く覆われ、雨の前線は何週間も居座る。最高峰では後退する雪線が高山植物を現すのと同時に、前線の湿った空気が登山道をぬかるませ滑りやすくする。この月は登山道の浸食が最も進み、ボランティア団体が短い区間を閉鎖して地面を休ませることも多い。",
    ),
    f: t(
      "Japan's meteorological agency announces the rainy season's start and end for each region separately rather than on a single national date, tracking it as a moving front the way it tracks a typhoon's path.|La agencia meteorológica de Japón anuncia el inicio y el fin de la temporada de lluvias por separado para cada región, en vez de en una única fecha nacional, siguiéndola como un frente en movimiento.|L'agence météorologique japonaise annonce le début et la fin de la saison des pluies séparément pour chaque région plutôt qu'à une date nationale unique, la suivant comme un front mobile.|気象庁は梅雨入り・梅雨明けを全国一律の日付ではなく地方ごとに発表し、台風の進路を追うのと同じように移動する前線として扱う。",
    ),
  },
  {
    e: "⛩️",
    n: t(
      "Yamabiraki opens the summer climbing season|El yamabiraki abre la temporada de ascenso veraniega|Le yamabiraki ouvre la saison d'ascension estivale|山開きの神事で夏山シーズンが始まる",
    ),
    t: t(
      "Around the first of the month, many peaks hold a yamabiraki, a mountain-opening rite performed by priests at the trailhead shrine to bless the coming season's climbers, and from that day the staffed huts open in full and even the largest snowfields become safely passable underfoot. It marks, more than any date on a calendar, the true start of summer in the high mountains.|A principios de mes, muchas cumbres celebran un yamabiraki, un rito de apertura de montaña que los sacerdotes realizan en el santuario del inicio del sendero para bendecir a los alpinistas de la temporada que llega, y desde ese día los refugios con personal abren por completo.|Vers le début du mois, de nombreux sommets célèbrent un yamabiraki, un rite d'ouverture de la montagne accompli par des prêtres au sanctuaire du départ de sentier pour bénir les alpinistes de la saison à venir, et dès ce jour les refuges gardés ouvrent pleinement.|月の初めごろ、多くの山で「山開き」の神事が登山口の神社で執り行われ、これから訪れる登山者の無事を祈る。この日を境に有人の山小屋は本格的に開き、最大級の雪渓さえも足元が安全に歩けるようになる。暦のどの日付よりも、これこそが高山の本当の夏の始まりである。",
    ),
    f: t(
      "Mount Fuji's own yamabiraki has been recorded since the Edo period, when the mountain was closed to ordinary climbers outside a strict summer window and pilgrim confraternities timed their entire year's ascent around the opening date.|El propio yamabiraki del monte Fuji se registra desde el periodo Edo, cuando la montaña estaba cerrada a los alpinistas comunes fuera de una estricta ventana veraniega, y las cofradías de peregrinos programaban la ascensión de todo su año en torno a la fecha de apertura.|Le yamabiraki du mont Fuji lui-même est attesté depuis l'époque d'Edo, quand la montagne était fermée aux alpinistes ordinaires en dehors d'une stricte fenêtre estivale, et les confréries de pèlerins calaient toute leur ascension annuelle sur cette date d'ouverture.|富士山自体の山開きは江戸時代から記録があり、当時この山は厳格な夏の期間を除いて一般の登山者には閉ざされていた。参詣講は一年の登拝の予定すべてを、この開山の日を軸に組んでいた。",
    ),
  },
  {
    e: "🌩️",
    n: t(
      "Obon brings the year's biggest crowds and its fiercest storms|El Obon trae las mayores multitudes del año y sus tormentas más fieras|L'Obon apporte les plus grandes foules de l'année et ses orages les plus violents|お盆で人出も雷雲も一年の頂点に",
    ),
    t: t(
      "The mid-month Obon holiday sends the year's largest crowds up popular peaks like Fuji-san at the same time as the summer's fiercest afternoon thunderstorms build, which is why experienced parties start climbing hours before dawn specifically to reach exposed ridges and summit before the clouds tower up after midday.|El festivo de Obon a mediados de mes lleva a las mayores multitudes del año a picos populares como el Fuji-san justo cuando se forman las tormentas vespertinas más fieras del verano, por lo que los grupos experimentados empiezan a subir horas antes del amanecer.|Le jour férié de l'Obon, à la mi-mois, amène les plus grandes foules de l'année sur des sommets prisés comme le Fuji-san au moment même où se forment les orages d'après-midi les plus violents de l'été, ce qui explique pourquoi les groupes expérimentés commencent l'ascension des heures avant l'aube.|月半ばのお盆連休は、富士山のような人気の峰に一年でいちばんの人出をもたらすのと同時に、夏でも最も激しい午後の雷雲が育つ時期と重なる。経験を積んだパーティーが夜明けの何時間も前から登り始めるのは、まさに正午過ぎに雲が立ち上る前に稜線と山頂を済ませておくためである。",
    ),
    f: t(
      "The pattern is regular enough that guidebooks simply advise summiting by mid-morning wherever possible in this month, treating the afternoon thunderstorm less as a risk to forecast than as a near-daily certainty to plan around.|El patrón es tan regular que las guías simplemente aconsejan alcanzar la cima a media mañana siempre que sea posible este mes, tratando la tormenta vespertina no tanto como un riesgo que pronosticar sino como una certeza casi diaria en torno a la cual planificar.|Le schéma est assez régulier pour que les guides conseillent simplement d'atteindre le sommet en milieu de matinée autant que possible ce mois-ci, traitant l'orage de l'après-midi non comme un risque à prévoir mais comme une quasi-certitude quotidienne autour de laquelle s'organiser.|この時期の雷雲はあまりに規則的なので、ガイドブックはこの月はできる限り午前中のうちに登頂を済ませるよう単純に勧める。午後の雷雲は予報すべき危険というより、それを前提に計画を組むべきほぼ毎日の既定事項として扱われている。",
    ),
  },
  {
    e: "🌀",
    n: t(
      "Typhoons test the peaks as the first snow dusts the summits|Los tifones ponen a prueba las cumbres mientras la primera nieve espolvorea las cimas|Les typhons éprouvent les sommets tandis que la première neige poudre les pics|台風が山を試し、最高峰には初冠雪も",
    ),
    t: t(
      "Typhoon season forces trailhead buses and mountain huts to cancel and close on short notice through the month, while at the very top of the range Mount Fuji's first dusting of snow, its hatsukanmuriyuki, is tracked and announced each year by the meteorological agency as an official seasonal marker.|La temporada de tifones obliga a cancelar y cerrar con poca antelación autobuses de inicio de sendero y refugios de montaña durante el mes, mientras que en lo más alto de la cordillera, la primera capa de nieve del monte Fuji, su hatsukanmuriyuki, es rastreada y anunciada cada año por la agencia meteorológica.|La saison des typhons contraint bus de départ de sentier et refuges à des annulations et fermetures à court préavis tout au long du mois, tandis qu'au sommet même de la chaîne, le premier saupoudrage de neige du mont Fuji, son hatsukanmuriyuki, est suivi et annoncé chaque année par l'agence météorologique.|台風シーズンはこの月を通じ、登山口行きのバスや山小屋の急な運休・閉鎖を強いる。一方で山域の最高点では、富士山の「初冠雪」が気象庁によって毎年観測され、公式な季節の節目として発表される。",
    ),
    f: t(
      "The agency's rule for declaring first snow cap is strict enough to be occasionally controversial: it must be visible from the Kofu weather station on a clear day, so a real snowfall obscured by cloud on the announcement day can go officially unrecorded until later.|La norma de la agencia para declarar el primer casquete de nieve es lo bastante estricta como para resultar a veces polémica: debe ser visible desde la estación meteorológica de Kofu en un día despejado, así que una nevada real oculta por nubes ese día puede quedar sin registrar oficialmente hasta más tarde.|La règle de l'agence pour déclarer la première neige au sommet est assez stricte pour être parfois contestée : elle doit être visible depuis la station météo de Kofu par temps clair, si bien qu'une vraie chute de neige masquée par les nuages ce jour-là peut rester officiellement non consignée.|気象庁の初冠雪の認定基準は厳格で、時に物議を醸すこともある。晴れた日に甲府地方気象台から目視できることが条件で、実際に雪が降っていても発表当日が曇っていれば、公式な記録はそのぶん遅れることになる。",
    ),
  },
  {
    e: "🍁",
    n: t(
      "The autumn colour front descends the ranges|El frente de color otoñal desciende por las cordilleras|Le front des couleurs d'automne descend les massifs|紅葉前線が山を下っていく",
    ),
    t: t(
      "Colour breaks first on the highest ridges and works down toward the trailheads over the following weeks, and most staffed huts above 2,500 metres close for the season by the middle of the month, leaving only unstaffed emergency shelters for climbers who continue past the last-chance window.|El color estalla primero en las crestas más altas y baja hacia los inicios de sendero en las semanas siguientes, y la mayoría de los refugios con personal por encima de los 2.500 metros cierran la temporada a mediados de mes.|La couleur éclate d'abord sur les plus hautes crêtes et descend vers les départs de sentiers au fil des semaines suivantes, et la plupart des refuges gardés au-dessus de 2 500 mètres ferment la saison vers la mi-mois.|色づきはまず最高所の稜線で始まり、その後数週間かけて登山口へと下っていく。標高2500mを超える有人小屋の大半は月半ばまでに営業を終え、その先も登り続ける登山者には無人の避難小屋しか残らない。",
    ),
    f: t(
      "The colour front is tracked at roughly a hundred metres of elevation a day, close enough to a fixed rate that some hiking clubs plan two trips to the same mountain three weeks apart specifically to see the same slope twice, in two different colours.|El frente del color se sigue a un ritmo de unos cien metros de altitud al día, lo bastante fijo como para que algunos clubes de senderismo planeen dos viajes a la misma montaña con tres semanas de diferencia, para ver la misma ladera dos veces en dos colores distintos.|Le front des couleurs est suivi à raison d'environ cent mètres d'altitude par jour, un rythme assez régulier pour que certains clubs de randonnée planifient deux sorties sur la même montagne à trois semaines d'écart, pour voir la même pente deux fois, sous deux couleurs différentes.|紅葉前線はおよそ一日100mの標高を下る速さで追跡され、その規則性ゆえに、あえて三週間あけて同じ山に二度出かけ、同じ斜面を二つの色で見比べる山岳会もある。",
    ),
  },
  {
    e: "❄️",
    n: t(
      "Huts close for winter as the first snow falls|Los refugios cierran para el invierno con la primera nevada|Les refuges ferment pour l'hiver à la première neige|初雪とともに山小屋が冬支度で閉まる",
    ),
    t: t(
      "The last of the staffed huts lock up for the season this month, their owners hauling down anything that could be damaged by snow load before the first real storm, and from here on only climbers equipped and experienced for true winter conditions continue past the trailhead.|Los últimos refugios con personal cierran la temporada este mes, con sus dueños bajando todo lo que la carga de nieve podría dañar antes de la primera tormenta de verdad, y de aquí en adelante solo los alpinistas equipados y con experiencia en condiciones invernales de verdad continúan más allá del inicio del sendero.|Les derniers refuges gardés ferment la saison ce mois-ci, leurs gardiens redescendant tout ce que le poids de la neige pourrait endommager avant la première vraie tempête, et désormais seuls les alpinistes équipés et expérimentés pour de véritables conditions hivernales poursuivent au-delà du départ de sentier.|最後まで残っていた有人小屋もこの月には閉じ、小屋番は本格的な嵐が来る前に積雪で傷むおそれのあるものを下ろす。これより先、登山口の先へ進むのは本格的な冬山装備と経験を備えた登山者だけになる。",
    ),
    f: t(
      "A hut that closes does not simply lock its door; staff drain the water lines, board the windows against the weight of drifting snow, and sometimes remove the roof's ridge beam entirely to keep the whole structure from being crushed over winter.|Un refugio que cierra no se limita a cerrar la puerta; el personal purga las tuberías de agua, tapia las ventanas contra el peso de la nieve acumulada y a veces retira por completo la viga cumbrera del tejado para evitar que toda la estructura quede aplastada en invierno.|Un refuge qui ferme ne se contente pas de verrouiller sa porte ; le personnel purge les canalisations d'eau, condamne les fenêtres contre le poids de la neige amoncelée et retire parfois entièrement la panne faîtière du toit pour éviter que toute la structure ne s'effondre l'hiver.|閉じる山小屋はただ扉に鍵をかけるだけではない。小屋番は水道管の水を抜き、吹き溜まりの重みに備えて窓を板で塞ぎ、時には屋根の棟木ごと外して、冬のあいだ建物全体が押し潰されるのを防ぐ。",
    ),
  },
  {
    e: "🌨️",
    n: t(
      "Deep snow and frost-armoured trees settle over the ranges|La nieve profunda y los árboles escarchados cubren las cordilleras|Neige profonde et arbres givrés couvrent les massifs|深い雪と樹氷が山を覆う",
    ),
    t: t(
      "Wind-driven ice begins coating the fir forests of Zao and Hakkoda into the rounded white shapes known as juhyo, and across the ranges avalanche danger becomes the single most important daily judgment for anyone still moving through the backcountry, assessed slope by slope rather than trusted to a single regional forecast.|El hielo empujado por el viento empieza a cubrir los bosques de abetos de Zao y Hakkoda con las formas blancas y redondeadas conocidas como juhyo, y en toda la cordillera el riesgo de aludes se convierte en el juicio diario más importante para quien aún se mueve por el interior de la montaña.|La glace poussée par le vent commence à recouvrir les sapinières de Zao et de Hakkoda des formes blanches et arrondies appelées juhyo, et à travers les massifs, le risque d'avalanche devient le jugement quotidien le plus important pour quiconque circule encore en pleine montagne.|風に運ばれた氷が蔵王や八甲田のモミ林を覆い、丸みを帯びた白い樹氷の姿をつくり始める。山域全体で、奥山をなお動く者にとって雪崩の危険度は一つの地方予報に頼るものではなく、斜面ごとに見極めるべき、その日いちばん重要な判断になる。",
    ),
    f: t(
      "Juhyo form only under a specific combination of supercooled fog and strong prevailing wind, which is why the phenomenon is reliably seen at just a handful of named ranges in Japan rather than everywhere winter cloud meets a forest.|El juhyo se forma solo bajo una combinación específica de niebla sobreenfriada y viento fuerte constante, por lo que el fenómeno se ve de forma fiable solo en un puñado de cordilleras concretas de Japón, y no en cualquier sitio donde la nube invernal encuentre un bosque.|Le juhyo ne se forme que sous une combinaison précise de brouillard surfondu et de vent dominant fort, ce qui explique que le phénomène ne s'observe de façon fiable que dans une poignée de massifs nommés au Japon, et non partout où un nuage hivernal rencontre une forêt.|樹氷は過冷却霧と強い卓越風という特定の組み合わせの下でしか形成されないため、この現象は冬雲が森に触れればどこでも見られるわけではなく、日本国内でも名の知れたごく一部の山域でしか安定して見られない。",
    ),
  },
  {
    e: "⛷️",
    n: t(
      "The coldest month fills the ski resorts at the mountains' feet|El mes más frío llena las estaciones de esquí al pie de las montañas|Le mois le plus froid remplit les stations de ski au pied des montagnes|厳冬の月、山麓のスキー場が最盛期を迎える",
    ),
    t: t(
      "While the coldest month of the year keeps all but the most serious winter alpinists off the high ridges of the Alps, the resorts at their base fill instead, drawing skiers from across the world to a snow prized specifically for being drier and lighter than the wet snow common at similar latitudes elsewhere.|Mientras el mes más frío del año mantiene alejadas de las crestas altas de los Alpes a todos menos a los alpinistas invernales más serios, los complejos de su base se llenan en cambio, atrayendo esquiadores de todo el mundo por una nieve apreciada precisamente por ser más seca y ligera que la nieve húmeda común en latitudes similares en otros lugares.|Tandis que le mois le plus froid de l'année tient éloignés des hautes crêtes des Alpes tous les alpinistes hivernaux sauf les plus chevronnés, les stations à leur pied se remplissent au contraire, attirant des skieurs du monde entier pour une neige prisée précisément parce qu'elle est plus sèche et plus légère que la neige humide courante à des latitudes comparables ailleurs.|一年でいちばん寒いこの月、アルプスの高い稜線に近づくのは本格的な冬山登山者だけになる一方、その山麓のリゾートはむしろ賑わい、他の同緯度地域にありがちな湿った雪とは違う、乾いた軽い雪を目当てに世界各地からスキーヤーを集める。",
    ),
    f: t(
      "The dry, powdery quality prized at resorts like Niseko and Hakuba comes from cold Siberian air picking up moisture over the Sea of Japan and dropping it as fine crystals on the west-facing slopes, the same weather pattern that buries the snow country's valleys under some of the deepest snowfall anywhere in the world.|La calidad seca y en polvo apreciada en estaciones como Niseko y Hakuba proviene del aire siberiano frío que recoge humedad sobre el mar de Japón y la deja caer en forma de cristales finos en las laderas orientadas al oeste, el mismo patrón meteorológico que sepulta los valles del país de la nieve.|La qualité sèche et poudreuse prisée dans des stations comme Niseko et Hakuba vient de l'air sibérien froid qui capte l'humidité au-dessus de la mer du Japon et la dépose en fins cristaux sur les versants exposés à l'ouest, le même schéma météorologique qui ensevelit les vallées du pays de la neige sous certaines des chutes les plus abondantes au monde.|ニセコや白馬のリゾートで珍重される乾いた粉雪は、冷たいシベリアの空気が日本海の上で水分を含み、西向きの斜面に細かい結晶となって降ることで生まれる。同じ気象のしくみが、豪雪地帯の谷を世界でも屈指の深さの雪で埋めてもいる。",
    ),
  },
  {
    e: "🥶",
    n: t(
      "Heavy snow closes roads to many trailheads|La nieve intensa cierra las carreteras a muchos inicios de sendero|De fortes chutes de neige ferment les routes vers de nombreux départs|豪雪で登山口への道が閉ざされる",
    ),
    t: t(
      "This is typically the heaviest snowfall month in Japan's snow country along the Sea of Japan side, where some valley towns have recorded snow depths of several metres in a single winter, and many of the roads leading to Joshin'etsu trailheads stay closed to traffic until spring clearing crews can reach them.|Este suele ser el mes de mayor nevada en el país de la nieve de Japón, en el lado del mar de Japón, donde algunos pueblos de valle han registrado profundidades de nieve de varios metros en un solo invierno, y muchas carreteras que llevan a los inicios de sendero de Jōshin'etsu permanecen cerradas al tráfico hasta la primavera.|C'est généralement le mois aux plus fortes chutes de neige dans le pays de la neige du Japon, côté mer du Japon, où certaines villes de vallée ont enregistré des hauteurs de neige de plusieurs mètres en un seul hiver, et de nombreuses routes menant aux départs de sentiers du Jōshin'etsu restent fermées jusqu'au printemps.|この月は日本海側の豪雪地帯でふつう最も雪の多い月にあたり、一冬で数メートルの積雪を記録する谷あいの町もある。上信越の登山口へ向かう道の多くは、春の除雪隊が到達できるまで通行止めのままになる。",
    ),
    f: t(
      "Some snow-country towns rely on tunnel-like covered arcades running the length of the main street specifically so daily life can continue at ground level even when the snow outside piles higher than a person's head.|Algunos pueblos del país de la nieve dependen de arcadas cubiertas en forma de túnel a lo largo de la calle principal precisamente para que la vida diaria pueda seguir a ras de suelo aunque la nieve de fuera se acumule más alta que una persona.|Certaines villes du pays de la neige dépendent d'arcades couvertes en forme de tunnel courant le long de la rue principale, précisément pour que la vie quotidienne puisse continuer au niveau du sol même quand la neige extérieure s'entasse plus haut qu'une personne.|豪雪地帯の町の中には、外の雪が人の背丈より高く積もっても地上での暮らしが続けられるよう、目抜き通りに沿ってトンネルのような雁木(がんぎ)のアーケードを頼りにしているところもある。",
    ),
  },
  {
    e: "🌱",
    n: t(
      "The thaw begins and the residual-snow season opens|Empieza el deshielo y se abre la temporada de nieve residual|Le dégel commence et s'ouvre la saison de neige résiduelle|雪解けが始まり、残雪期が幕を開ける",
    ),
    t: t(
      "Lower trails start to clear as the thaw sets in, but the upper mountains hold onto their residual snowpack long enough that early climbers switch to crampons and ice axes even as the lowland calendar insists spring has already begun, closing the year's cycle where it started.|Los senderos bajos empiezan a despejarse con el deshielo, pero las montañas altas conservan su manto de nieve residual lo bastante como para que los primeros alpinistas cambien a crampones y piolet, aunque el calendario de las tierras bajas insista en que la primavera ya ha empezado.|Les sentiers du bas commencent à se dégager avec le dégel, mais les hautes montagnes conservent leur manteau neigeux résiduel assez longtemps pour que les premiers alpinistes passent aux crampons et au piolet, alors même que le calendrier des plaines affirme déjà le printemps.|雪解けが進み下部の登山道は開き始めるが、上部の山にはまだ残雪期と呼ぶにふさわしい雪が居座り、麓の暦がすでに春だと告げていても、早い時期の登山者はアイゼンとピッケルに持ち替える。こうして一年の巡りは、また元の場所へ戻る。",
    ),
    f: t(
      "Climbers distinguish this residual-snow season from true winter mountaineering mainly by daylight and stability: the snowpack is old and more predictable than midwinter powder, but the days are also long enough to attempt routes that would be far too short on daylight two months earlier.|Los alpinistas distinguen esta temporada de nieve residual del alpinismo invernal propiamente dicho sobre todo por la luz del día y la estabilidad: el manto de nieve es antiguo y más predecible que la nieve polvo de pleno invierno, pero los días también son ya lo bastante largos.|Les alpinistes distinguent cette saison de neige résiduelle du véritable alpinisme hivernal surtout par la lumière du jour et la stabilité : le manteau neigeux est ancien et plus prévisible que la poudreuse de plein hiver, mais les jours sont aussi assez longs désormais.|登山者はこの残雪期を本格的な冬山登山とは主に日照時間と雪の安定性で区別する。積雪は古く真冬の粉雪より予測しやすい一方、二か月前ならとても日照が足りなかったルートに挑めるだけの日の長さも、もう戻ってきている。",
    ),
  },
];
