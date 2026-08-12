/**
 * マレーシアの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・フランス・インド・韓国・イタリアと同じく「地方まるごとの好不況」で
 * 差をつける。実際の効果は `src/infrastructure/content/season-and-doom-rules.ts`
 * 側に置く(このファイルは文言のみ)。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const MALAYSIA_META = {
  id: "malaysia",
  name: t("Malaysia|Malasia|Malaisie|マレーシア"),
  blurb: t(
    "A peninsula and two Bornean states split by a wide sea, where Malay kampung, Chinese shophouse and Tamil temple share the same street|Una península y dos estados de Borneo separados por un ancho mar, donde el kampung malayo, la casa-tienda china y el templo tamil comparten la misma calle|Une péninsule et deux États bornéens séparés par une large mer, où kampung malais, maison-boutique chinoise et temple tamoul partagent la même rue|広い海で隔てられた半島とボルネオの二州。マレーの村、中国の町家、タミルの寺院が同じ通りに並ぶ",
  ),
  // 表示専用の倍率。1リンギット≒33円として、日本(×10000で¥12,000,000)と
  // 為替1.8倍以内に収まるよう300とした(1200×300=RM360,000≒¥11,880,000、
  // 日本の0.99倍)。property-economy.mjsのCURRENCY_MULTIPLIERSにも同じ値を
  // 登録してもらう必要がある(REGISTER.md参照)。
  cur: { pre: "RM", post: "", mul: 300 },
  start: "kualalumpur",
  // マレーシアの多民族性を映す4役。
  cpuNames: ["Ah Kau", "Muthu", "Awang", "Lin"],
  // 国旗(Jalur Gemilang)の紺・赤・白・黄に、雨林の緑を添えた5色。
  stripe: ["#00205b", "#cc0001", "#f6efe2", "#ffcc00", "#2f6a30"],
};

/**
 * 州のまとまりで6分割。半島に寄せず、サラワク・サブは合わせて14都市を
 * 抱える(半島28都市)。
 */
export const MALAYSIA_REGIONS = {
  cen: t("Central — Klang Valley: Kuala Lumpur, Putrajaya, Selangor|Central — Valle de Klang: Kuala Lumpur, Putrajaya, Selangor|Centre — Vallée de Klang : Kuala Lumpur, Putrajaya, Selangor|中部(クランバレー:クアラルンプール・プトラジャヤ・スランゴール)"),
  nor: t("North — Perlis, Kedah, Penang, Perak|Norte — Perlis, Kedah, Penang, Perak|Nord — Perlis, Kedah, Penang, Perak|北部(ペルリス・ケダ・ペナン・ペラ)"),
  eco: t("East Coast — Kelantan, Terengganu, Pahang|Costa Este — Kelantan, Terengganu, Pahang|Côte Est — Kelantan, Terengganu, Pahang|東海岸(クランタン・トレンガヌ・パハン)"),
  sou: t("South — Negeri Sembilan, Malacca, Johor|Sur — Negeri Sembilan, Malaca, Johor|Sud — Negeri Sembilan, Malacca, Johor|南部(ヌグリスンビラン・マラッカ・ジョホール)"),
  swk: t("Sarawak|Sarawak|Sarawak|サラワク州"),
  sab: t("Sabah|Sabah|Sabah|サバ州"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 */
export const MALAYSIA_ITEMS = {
  beca: {
    e: "🛺",
    price: 240,
    kind: "move",
    n: t("A Ride on a Trishaw|Un paseo en trisiclo|Un tour en cyclo-pousse|トライショーでひとっ走り"),
    d: t(
      "Carried 8–12 squares. The driver picks the route.|Te lleva de 8 a 12 casillas. El conductor elige la ruta.|Emporté de 8 à 12 cases. Le conducteur choisit l'itinéraire.|8〜12マス運ばれる。道順は漕ぎ手まかせ。",
    ),
    f: t(
      "Malaysia's beca, three-wheeled pedal trishaws with the passenger seat mounted beside rather than behind the rider, once carried most short-distance city traffic before cars took over in the 1970s and 80s, and the survivors in George Town and Malacca now compete for tourists by decorating their canopies with plastic flowers, fairy lights, and speakers blasting pop songs.|El beca de Malasia, un triciclo de pedales con el asiento del pasajero montado al lado, no detrás, del conductor, transportaba antes la mayor parte del tráfico urbano de corta distancia hasta que los coches tomaron el relevo en los setenta y ochenta, y los que sobreviven en George Town y Malaca compiten hoy por los turistas decorando sus toldos con flores de plástico, luces y altavoces a todo volumen.|Le beca malaisien, un cyclo-pousse à trois roues dont le siège passager est monté sur le côté et non derrière le conducteur, transportait autrefois l'essentiel du trafic urbain de courte distance avant que les voitures ne prennent le relais dans les années 1970 et 1980, et les survivants de George Town et Malacca rivalisent aujourd'hui pour les touristes en décorant leur auvent de fleurs en plastique, de guirlandes et de haut-parleurs.|マレーシアの「ベチャ」は、乗客席が運転者の後ろではなく横に取り付けられた三輪の足漕ぎトライショーで、1970〜80年代に自動車が主流になる前は都市部の近距離移動の大半を担っていた。いまジョージタウンやマラッカに残るベチャは、幌をプラスチックの造花やイルミネーション、ポップスを大音量で流すスピーカーで飾り立て、観光客を奪い合っている。",
    ),
  },
  jadual: {
    e: "📋",
    price: 380,
    kind: "pre",
    n: t("The KTM Timetable|El horario de KTM|L'horaire des KTM|KTMの時刻表"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Keretapi Tanah Melayu's first line opened in 1885 in Perak to haul tin ore to the coast, predating the country itself by more than seven decades, and its narrow metre-gauge track still winds through jungle and paddy field rather than running arrow-straight, which for decades made a printed timetable essential reading for anyone hoping to catch a connecting train on time.|La primera línea de Keretapi Tanah Melayu se inauguró en 1885 en Perak para transportar mineral de estaño hasta la costa, más de siete décadas antes de que existiera el propio país, y su estrecha vía de ancho métrico todavía serpentea entre selva y arrozales en vez de ir en línea recta, lo que durante décadas hizo del horario impreso lectura imprescindible.|La première ligne du Keretapi Tanah Melayu ouvrit en 1885 au Perak pour transporter le minerai d'étain jusqu'à la côte, plus de sept décennies avant même l'existence du pays, et sa voie étroite à écartement métrique serpente encore à travers jungle et rizières plutôt que de filer tout droit, ce qui pendant des décennies fit de l'horaire imprimé une lecture indispensable.|クルタピ・タナ・ムラユ(マラヤ鉄道)の最初の路線は1885年、ペラ州で錫鉱石を海岸まで運ぶために開通し、国そのものの成立より70年以上も早い。その狭軌の線路はまっすぐには走らず、いまもジャングルと田んぼの中を縫うように進むため、乗り継ぎ列車に間に合わせたい人にとって印刷された時刻表は何十年ものあいだ必読の書だった。",
    ),
  },
  ets: {
    e: "🚆",
    price: 360,
    kind: "pre",
    n: t("ETS Ticket|Billete ETS|Billet ETS|ETS切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "The Electric Train Service began running in 2010 on the newly electrified, double-tracked West Coast Line, and cut the Kuala Lumpur–Ipoh trip from around three hours on the old diesel service to under two, the first time an intercity line in the country ran on overhead electric power rather than diesel.|El Electric Train Service (ETS) empezó a circular en 2010 por la recién electrificada línea de doble vía de la costa oeste, y redujo el trayecto Kuala Lumpur–Ipoh de unas tres horas con el antiguo servicio diésel a menos de dos, la primera vez que una línea interurbana del país funcionaba con corriente eléctrica aérea.|L'Electric Train Service (ETS) commença à circuler en 2010 sur la ligne de la côte ouest fraîchement électrifiée et à double voie, ramenant le trajet Kuala Lumpur–Ipoh d'environ trois heures avec l'ancien service diesel à moins de deux, la première fois qu'une ligne interurbaine du pays fonctionnait à l'électricité aérienne.|ETS(電化特急)は2010年、新たに電化・複線化された西海岸線で運行を始め、旧来のディーゼル列車で約3時間かかっていたクアラルンプール―イポー間を2時間足らずに短縮した。国内の都市間路線がディーゼルではなく架線からの電力で走った最初の例である。",
    ),
  },
  platinum: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("ETS Platinum Ticket|Billete ETS Platinum|Billet ETS Platinum|ETSプラチナ切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "ETS Platinum trains, introduced in 2015, skip most of the smaller stations and run at up to 140 km/h, the fastest scheduled speed on Malaysia's network, and their elongated front design was chosen specifically to cut wind resistance through the West Coast Line's many short tunnels.|Los trenes ETS Platinum, introducidos en 2015, se saltan la mayoría de las estaciones pequeñas y circulan hasta a 140 km/h, la velocidad programada más alta de la red malasia, y su diseño frontal alargado se eligió para reducir la resistencia del aire en los numerosos túneles cortos de la línea de la costa oeste.|Les trains ETS Platinum, introduits en 2015, sautent la plupart des petites gares et roulent jusqu'à 140 km/h, la vitesse programmée la plus élevée du réseau malaisien, et leur avant allongé fut choisi pour réduire la résistance de l'air dans les nombreux tunnels courts de la ligne de la côte ouest.|2015年に導入されたETSプラチナは小さな駅の大半を通過し、マレーシアの路線網で最速となる時速140kmで走る。先端を長く尖らせた形状は、西海岸線に数多くある短いトンネルでの空気抵抗を減らすために特に選ばれたものである。",
    ),
  },
  azimat: {
    e: "🧿",
    price: 320,
    kind: "passive",
    n: t("A Protective Azimat|Un azimat protector|Un azimat protecteur|護符アジマット"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "An azimat is a general Malay term for a protective charm, traditionally written or blessed by a bomoh, a folk healer whose practice blends pre-Islamic Malay belief with later Hindu-Buddhist and Islamic influences, and worn on a cord, tucked into clothing, or kept near a house's front door for protection.|Azimat es el término malayo general para un amuleto protector, tradicionalmente escrito o bendecido por un bomoh, un curandero popular cuya práctica mezcla creencias malayas preislámicas con influencias hindú-budistas e islámicas posteriores, y se lleva atado a un cordón o se guarda cerca de la puerta principal.|Azimat est le terme malais général pour un porte-bonheur protecteur, traditionnellement écrit ou béni par un bomoh, un guérisseur populaire dont la pratique mêle croyances malaises préislamiques et influences hindou-bouddhistes puis islamiques, porté sur un cordon ou gardé près de la porte d'entrée.|「アジマット」は護符全般を指すマレー語で、伝統的には民間の治療師「ボモ」が書いたり祈祷したりして作る。ボモの実践はイスラム以前のマレーの信仰と、その後のヒンドゥー・仏教、イスラムの影響が入り混じったものである。紐に通して身につけたり、家の玄関先に置いたりして魔除けとする。",
    ),
  },
  jampi: {
    e: "📿",
    price: 440,
    kind: "pre",
    n: t("A Bomoh's Jampi|El jampi de un bomoh|Le jampi d'un bomoh|ボモの呪文ジャンピ"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "A jampi is a spoken charm recited by a bomoh, often mixing old Malay verse with borrowed religious phrases, directed at everything from fevers to bad luck to a rival's ill will, a tradition documented in detail by British colonial officer Walter Skeat in his 1900 study Malay Magic, one of the first outside attempts to record it systematically.|Un jampi es un conjuro hablado que recita un bomoh, mezclando a menudo viejos versos malayos con frases religiosas prestadas, dirigido a todo, desde fiebres hasta mala suerte, tradición documentada por el funcionario colonial británico Walter Skeat en su estudio de 1900 Malay Magic.|Un jampi est une formule parlée récitée par un bomoh, mêlant souvent d'anciens vers malais à des formules religieuses empruntées, dirigée contre tout, des fièvres à la malchance, tradition documentée par le fonctionnaire colonial britannique Walter Skeat dans son étude de 1900 Malay Magic.|「ジャンピ」はボモが唱える呪文で、古いマレーの詩句と借用した宗教的文句を混ぜ合わせることが多く、熱病から不運まであらゆるものに向けて唱えられる。この伝統は1900年、イギリス植民地官吏ウォルター・スキートが著した研究書『マレーの魔術』で詳細に記録された。",
    ),
  },
  bocoran: {
    e: "📝",
    price: 130,
    kind: "passive",
    n: t("Leaked Exam Answers|Respuestas filtradas del examen|Réponses d'examen fuitées|漏れた試験の解答(ボチョラン)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Bocoran, Malay for a 'leak,' is the slang for supposedly real exam questions or answers that circulate on messaging apps the night before major school exams like the SPM, despite years of official warnings that the vast majority turn out to be fake or recycled from old papers, sold to nervous students anyway.|Bocoran, «filtración» en malayo, es el término coloquial para las supuestas preguntas o respuestas reales de examen que circulan por apps de mensajería la noche antes de exámenes escolares importantes como el SPM, pese a años de advertencias de que la mayoría resultan falsas.|Bocoran, « fuite » en malais, est le terme familier pour de prétendues vraies questions ou réponses d'examen qui circulent sur les messageries la veille de grands examens comme le SPM, malgré des années de mises en garde selon lesquelles l'immense majorité s'avère fausse.|「ボチョラン」はマレー語で「漏洩」を意味する俗語で、SPM(前期中等教育修了試験)のような主要な学校試験の前夜にメッセージアプリで出回る、本物とされる試験問題や解答を指す。当局が何年も「大半は偽物か過去問の使い回しだ」と警告してきたにもかかわらず、不安な受験生たちにいまも売られ続けている。",
    ),
  },
  durianruntuh: {
    e: "💰",
    price: 280,
    kind: "pre",
    n: t("A Durian Runtuh Windfall|Un golpe de suerte de durian runtuh|Une aubaine durian runtuh|棚から落ちたドリアン",
    ),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-la et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "The Malay phrase durian runtuh, literally a 'fallen durian,' describes a stroke of unexpected good luck, borrowed from real durian harvesting, where the fruit is never cut from the tree but left to ripen and drop on its own, so that finding an intact, perfectly ripe durian on the ground feels like a small windfall, provided it did not land on your head first.|La expresión malaya durian runtuh, «durian caído», describe un golpe de suerte inesperado, tomada de la cosecha real del durian, donde la fruta nunca se corta del árbol sino que cae por sí sola, así que hallar en el suelo un durian intacto se siente como una pequeña fortuna, siempre que no haya caído antes sobre tu cabeza.|L'expression malaise durian runtuh, « durian tombé », décrit un coup de chance inattendu, empruntée à la vraie récolte du durian, où le fruit n'est jamais coupé de l'arbre mais laissé à tomber de lui-même, si bien que trouver au sol un durian intact ressemble à une aubaine, à condition qu'il ne soit pas d'abord tombé sur la tête.|マレー語の「ドリアン・ルントゥー(落ちたドリアン)」という言い回しは、思いがけない幸運を表す。実際のドリアン収穫では果実を木から切り落とすことはなく、熟して自然に落ちるのを待つため、傷一つない完熟のドリアンを地面で見つけるのはちょっとした幸運だとされる――もっとも、先に頭に落ちてこなければの話だが。",
    ),
  },
  orangdalam: {
    e: "🤝",
    price: 420,
    kind: "pre",
    n: t("An Orang Dalam Connection|Un contacto orang dalam|Une relation orang dalam|コネのある「オランダラム」"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Having an orang dalam, literally an 'inside person,' is the everyday Malaysian phrase for knowing someone working inside a company, government office, or ticket counter who can quietly speed up paperwork or a booking, a shortcut so routinely assumed to exist that job seekers and hopeful customers alike will ask outright whether anyone has one before trying the official channel.|Tener un orang dalam, «persona de dentro», es la expresión cotidiana malasia para conocer a alguien dentro de una empresa, oficina o mostrador que puede agilizar en silencio un trámite, un atajo tan asumido que la gente pregunta sin rodeos si alguien lo tiene antes de probar el canal oficial.|Avoir un orang dalam, « personne de l'intérieur », est l'expression malaisienne courante pour connaître quelqu'un dans une entreprise ou un guichet qui peut accélérer discrètement une démarche, un raccourci si couramment tenu pour acquis qu'on demande carrément si quelqu'un en a un avant la voie officielle.|「オランダラム」とは文字どおり「中の人」を意味し、会社や役所、切符売り場の中で働く知り合いが手続きや予約をひそかに早めてくれる、というマレーシアの日常的な言い回しである。この近道はあまりに当然のものとして扱われているため、求職者も客も、正式な窓口を試す前にまず「誰か中の人はいないか」とはっきり尋ねる。",
    ),
  },
};

/**
 * 厄災の神。マレー民話のトヨル(ボモが死産児の霊などから育てるとされる
 * 小さな子供の姿の精霊。夜な夜な小銭や小物を盗んでくるが、悪意そのものと
 * いうより「しつけの効かない子供」に近い二面性を持つ)にした
 * (韓国のトッケビ・茨城のダイダラボウ・イタリアのモナチェッロと同じ系統)。
 */
export const MALAYSIA_SPIRIT = {
  e: "🧒",
  n: t("The Toyol|El toyol|Le toyol|トヨル"),
  big: t("The Toyol's Grand Mischief|La gran travesura del toyol|La grande espièglerie du toyol|トヨルの大いたずら"),
  ward: "azimat",
  arrive: t(
    "<b>🧒 A toyol has taken a liking to you.</b> Malay folklore describes it as a small child-spirit, said to be raised by a bomoh from a stillborn infant and kept fed on milk or blood in a jar, sent out at night to steal coins and small objects from houses it favors. It now trails behind <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🧒 Un toyol se ha encariñado contigo.</b> El folclore malayo lo describe como un pequeño espíritu infantil, criado por un bomoh a partir de un bebé nacido muerto y alimentado con leche o sangre en un tarro, enviado de noche a robar monedas y objetos pequeños de las casas que prefiere. Ahora sigue a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🧒 Un toyol s'est pris d'affection pour toi.</b> Le folklore malais le décrit comme un petit esprit enfant, élevé par un bomoh à partir d'un enfant mort-né et nourri de lait ou de sang dans un bocal, envoyé la nuit voler pièces et petits objets dans les maisons qu'il apprécie. Il suit désormais <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🧒 トヨルに気に入られてしまった。</b> マレーの民話によれば、これはボモが死産児から育てるとされる小さな子供の姿の精霊で、壺の中で乳や血を与えられて育ち、夜になると気に入った家から小銭や小物を盗みに出かける。いま目的地から最も遠い <b>{0}</b> の後ろをついて回り、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🧒 <b>The toyol</b> loses interest and slips after <b>{0}</b>, farthest from {1}.|🧒 <b>El toyol</b> pierde el interés y se desliza tras <b>{0}</b>, el más lejano de {1}.|🧒 <b>Le toyol</b> se désintéresse et se faufile vers <b>{0}</b>, le plus loin de {1}.|🧒 <b>トヨル</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへすり抜けていった。",
  ),
  wake: t(
    "<b>{0}</b> has carried the toyol for four turns without ever leaving out a coin for it. Sulking, it decides to empty every pocket on the road at once — <b>the Toyol's Grand Mischief</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos con el toyol sin dejarle nunca una moneda. Enfurruñado, decide vaciar de golpe todos los bolsillos del camino: empieza <b>la gran travesura del toyol</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> traîne le toyol depuis quatre tours sans jamais lui laisser une pièce. Boudeur, il décide de vider d'un coup toutes les poches de la route — <b>la grande espièglerie du toyol</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもトヨルを連れ歩きながら、一度も銭を置いてやらなかった。すねたトヨルは道中すべてのポケットを一度に空にしてやろうと決める。<b>トヨルの大いたずら</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> households said to be plagued by a toyol would scatter uncooked rice or ash at the doorstep, since the spirit is believed unable to resist counting every grain before going inside, buying the house time until dawn drives it off.|<b>Tras la historia:</b> las casas que se decía acosadas por un toyol esparcían arroz crudo o ceniza en el umbral, pues se cree que el espíritu no puede resistirse a contar cada grano antes de entrar, ganando tiempo hasta que el alba lo ahuyenta.|<b>Derrière l'histoire :</b> les foyers dits hantés par un toyol répandaient du riz cru ou de la cendre sur le seuil, l'esprit étant censé ne pouvoir résister à compter chaque grain avant d'entrer, gagnant du temps jusqu'à ce que l'aube le chasse.|<b>物語の背景:</b> トヨルに悩まされているとされる家では、玄関先に生米や灰をまいた。この精霊は中に入る前にすべての粒を数えずにはいられないとされ、夜明けが追い払うまでの時間稼ぎになったという。",
  ),
  pleased: t(
    "It pockets a coin quietly and, satisfied, leaves a small trinket behind in exchange. <b>{0}</b> gains <span class='money'>+{1}</span>.|Se guarda una moneda en silencio y, satisfecho, deja a cambio una baratija. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il empoche discrètement une pièce et, satisfait, laisse en échange une babiole. <b>{0}</b> gagne <span class='money'>+{1}</span>.|静かに銭を一枚懐に入れ、満足げに代わりの小さな飾り物を残していった。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "An azimat catches the toyol's attention where the light catches its threads, and — wary of a stronger charm already at work — it slips past <b>{0}</b> without noticing this turn.|Un azimat capta la atención del toyol donde la luz roza sus hilos, y —receloso de un amuleto más fuerte ya en juego— pasa de largo junto a <b>{0}</b> sin percatarse esta vuelta.|Un azimat attire l'attention du toyol là où la lumière accroche ses fils, et — méfiant d'un charme plus fort déjà à l'œuvre — il passe devant <b>{0}</b> sans le remarquer ce tour-ci.|光が糸に反射するアジマットにトヨルは目を留め、すでに働いているより強い護符を警戒してか、このターン <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。トヨルの「悪意ではなく度が過ぎる」いたずら好きな性格に合わせた。 */
export const MALAYSIA_DOOM = [
  {
    id: "denda-aes",
    n: t("An AES speed camera catches you|Una cámara AES te pilla|Une caméra AES te flashe|AES速度違反カメラに捕まる"),
    t: t(
      "The overhead AES camera gantry looked like just another highway sign until a letter arrives weeks later with a time-stamped photo and a fine for a speed nobody remembers hitting, since the system logs it automatically without an officer ever waving anyone down. Malaysia rolled the Automated Enforcement System out from 2012 specifically for stretches with the worst accident records, and drivers still swap tips online about which gantries are actually switched on.|El pórtico de la cámara AES sobre la autopista parecía una señal más hasta que semanas después llega una carta con una foto con hora exacta y una multa por una velocidad que nadie recuerda haber alcanzado, ya que el sistema lo registra automáticamente sin que ningún agente detenga a nadie. Malasia implantó el Sistema de Aplicación Automatizada desde 2012 en los tramos con peor historial de accidentes, y los conductores siguen intercambiando en internet consejos sobre qué pórticos están realmente encendidos.|Le portique de la caméra AES au-dessus de l'autoroute ressemblait à un simple panneau de plus, jusqu'à ce qu'une lettre arrive des semaines plus tard avec une photo horodatée et une amende pour une vitesse que personne ne se souvient avoir atteinte, le système l'enregistrant automatiquement sans qu'aucun agent n'arrête personne. La Malaisie a déployé son système d'application automatisée à partir de 2012 sur les tronçons au pire bilan d'accidents, et les conducteurs continuent d'échanger en ligne des tuyaux sur les portiques réellement allumés.|高速道路の上に立つAES(自動取締システム)のカメラ橋げたは、ただの標識のように見えたが、数週間後に日時入りの写真と、誰も覚えていない速度超過の罰金通知が届いた。システムが自動的に記録するため、警官に呼び止められることもない。マレーシアは2012年から特に事故の多い区間を対象にこの自動取締システムを導入しており、運転者はいまもどのゲートが実際に作動しているか、ネットで情報交換し続けている。",
    ),
  },
  {
    id: "banjir-kilat",
    n: t("A flash flood soaks your goods|Una inundación repentina empapa tu mercancía|Une crue éclair trempe tes marchandises|鉄砲水が荷物を水浸しにする"),
    t: t(
      "An hour of monsoon rain overwhelmed the storm drains faster than anyone expected, and knee-deep water swept through ground-floor shops before the afternoon sun came back out as if nothing had happened. Flash floods like this have become common enough in Malaysian cities that some shopkeepers now keep folding metal flood barriers permanently stacked by the door, ready to slot in within minutes.|Una hora de lluvia monzónica desbordó los desagües más deprisa de lo esperado, y el agua hasta las rodillas arrasó las tiendas de la planta baja antes de que el sol de la tarde volviera a salir como si nada hubiera pasado. Estas inundaciones repentinas se han vuelto tan comunes en las ciudades malasias que algunos comerciantes guardan barreras metálicas plegables junto a la puerta, listas para encajarlas en minutos.|Une heure de pluie de mousson submergea les égouts pluviaux plus vite que prévu, et une eau montant jusqu'aux genoux balaya les boutiques du rez-de-chaussée avant que le soleil de l'après-midi ne revienne comme si de rien n'était. Ces crues éclair sont devenues si courantes dans les villes malaisiennes que certains commerçants gardent des barrières anti-inondation pliantes près de la porte, prêtes en quelques minutes.|1時間のモンスーンの雨が予想を超える速さで排水溝の処理能力を上回り、膝の高さまで水が押し寄せて1階の店を飲み込んだが、午後には何事もなかったかのように太陽が戻ってきた。こうした鉄砲水はマレーシアの都市部でありふれたものとなり、店主の中には折りたたみ式の金属製止水板を常に扉のそばに積んでおき、数分で設置できるようにしている者もいる。",
    ),
    months: [7, 8, 9],
  },
  {
    id: "gangguan-ets",
    n: t("ETS technical trouble halts the line|Una avería técnica del ETS paraliza la línea|Une avarie technique de l'ETS bloque la ligne|ETSの技術的不具合で運行が止まる"),
    t: t(
      "The departure board switched from a clean number to the word 'delayed' and then, twenty minutes later, to nothing at all, while station staff explained only that there was a 'technical disruption' further up the electrified line and that another train would need to be found. ETS services share a single double track for most of the West Coast Line, so a single stalled train can back up services in both directions for hours.|El panel de salidas pasó de mostrar un número claro a la palabra «retrasado» y, veinte minutos después, a no mostrar nada, mientras el personal solo explicaba que había una «avería técnica» más adelante y que habría que buscar otro tren. Los servicios ETS comparten una única vía doble en la mayor parte de la línea de la costa oeste, así que un solo tren averiado puede retrasar los servicios en ambos sentidos durante horas.|Le panneau des départs passa d'un numéro clair au mot « retardé », puis, vingt minutes plus tard, à plus rien du tout, tandis que le personnel expliquait seulement qu'il y avait une « avarie technique » plus loin et qu'il faudrait trouver un autre train. Les services ETS partagent une seule double voie sur la majeure partie de la ligne de la côte ouest, si bien qu'un seul train immobilisé peut retarder le trafic dans les deux sens pendant des heures.|発車案内は明確な番号表示から「遅延」の文字に変わり、20分後にはついに何も表示されなくなった。駅員は電化区間の先で「技術的な不具合」が起きており、別の列車を手配する必要があると説明するだけだった。ETSは西海岸線の大半で単一の複線を共有しているため、たった1本の立ち往生した列車が両方向のダイヤを何時間も乱すことがある。",
    ),
  },
  {
    id: "kebakaran-pasar",
    n: t("A wet market fire spreads through the stalls|Un incendio en el mercado se propaga por los puestos|Un incendie de marché se propage entre les étals|生鮮市場の火事が屋台に燃え広がる"),
    t: t(
      "A short circuit in an overloaded extension cord somewhere among the stalls smouldered for perhaps an hour before anyone noticed the smell, and by the time the fire brigade arrived a whole row of the market's wooden and zinc-roofed stalls, some of them decades old, had gone up together. Wet markets across the country rebuild this way often enough that insurers now specifically price fire cover for stallholders as its own category.|Un cortocircuito en un alargador sobrecargado ardió lentamente quizá durante una hora antes de que alguien notara el olor, y cuando llegaron los bomberos toda una fila de puestos de madera y techo de zinc del mercado, algunos con décadas, había ardido a la vez. Los mercados húmedos del país se reconstruyen así con tanta frecuencia que las aseguradoras venden un seguro contra incendios específico para vendedores.|Un court-circuit dans une rallonge surchargée a couvé peut-être une heure avant que quiconque ne remarque l'odeur, et le temps que les pompiers arrivent, toute une rangée d'étals du marché en bois et toit de zinc, certains vieux de plusieurs décennies, était partie en fumée d'un coup. Les marchés humides du pays se reconstruisent ainsi assez souvent pour que les assureurs vendent une assurance incendie spécifique aux commerçants.|屋台のどこかで過負荷になった延長コードがショートし、誰かが匂いに気づくまで恐らく1時間ほどくすぶり続けた。消防隊が到着した頃には、何十年も前からある木造トタン屋根の屋台が一列丸ごと燃え上がっていた。国内の生鮮市場はあまりに頻繁にこの形で建て直されるため、保険会社はいまや屋台商人向けの火災保険を独立した保険区分として扱っている。",
    ),
  },
  {
    id: "kalah-mahjong",
    n: t("A bad night at the Chinese New Year mahjong table|Una mala noche en la mesa de mahjong del Año Nuevo Chino|Une mauvaise soirée à la table de mahjong du Nouvel An chinois|旧正月の麻雀卓で大負けする"),
    t: t(
      "The tiles kept coming up wrong all night at the Chinese New Year mahjong table, and by the time the last hand was called, everyone at the table owed everyone else a running tally that took longer to settle honestly than the game itself had taken to play. Mahjong marathons over the holiday are treated as a national pastime, complete with folding tables set up specifically for the occasion in living rooms that stay packed away the rest of the year.|Las fichas siguieron saliendo mal toda la noche en la mesa de mahjong del Año Nuevo Chino, y cuando se cantó la última mano, todos en la mesa debían dinero a todos los demás, ajuste que llevó más tiempo saldar que el propio juego. Las maratones de mahjong festivas se tratan como pasatiempo nacional, con mesas plegables montadas para la ocasión en salones que el resto del año permanecen guardadas.|Les tuiles n'ont cessé de tomber du mauvais côté toute la nuit à la table de mahjong du Nouvel An chinois, et à la dernière main, tout le monde devait de l'argent à tout le monde, un décompte plus long à régler que la partie elle-même. Les marathons de mahjong des fêtes sont un passe-temps national, avec des tables pliantes montées pour l'occasion dans des salons rangés le reste de l'année.|旧正月の麻雀卓では一晩中、牌がことごとく悪い方に転がり続け、最後の局が終わる頃には卓を囲んだ全員がお互いに借りを作り、その清算はゲーム自体よりも長くかかった。旧正月の麻雀マラソンは国民的娯楽として扱われ、この時期だけのために折りたたみ式の卓が居間に持ち出され、他の季節はしまい込まれたままになる。",
    ),
    months: [9, 10],
  },
  {
    id: "bas-salah",
    n: t("Boarding the wrong express bus|Subiendo al autocar expreso equivocado|Monter dans le mauvais autocar express|違う長距離バスに乗ってしまう"),
    t: t(
      "Two express coaches bound for towns with almost identical names were parked at neighbouring gates with departure times four minutes apart, and only somewhere past the tollgate did the mismatch between the ticket in hand and the road signs outside the window become impossible to ignore. Terminal Bersepadu Selatan alone dispatches buses to well over a hundred destinations a day, and the departure boards list them by operator rather than by platform, which does not help.|Dos autocares expresos con destino a pueblos de nombres casi idénticos estaban aparcados en puertas vecinas con salidas separadas por cuatro minutos, y solo pasado el peaje se hizo imposible ignorar el desajuste entre el billete en la mano y las señales de la carretera. Solo la Terminal Bersepadu Selatan despacha autobuses a más de cien destinos al día, y los paneles los listan por operador y no por andén.|Deux autocars express à destination de villes aux noms presque identiques étaient garés à des portes voisines avec des départs à quatre minutes d'écart, et ce n'est que passé le péage que le décalage entre le billet en main et les panneaux routiers est devenu impossible à ignorer. Rien que le Terminal Bersepadu Selatan expédie des bus vers plus d'une centaine de destinations par jour, listées par compagnie plutôt que par quai.|ほとんど同じ名前の町へ向かう2台の長距離バスが隣り合うゲートに停まっており、発車時刻はわずか4分違いだった。料金所を過ぎた辺りでようやく、手元の切符と車窓の道路標識が食い違っていることに気づかざるを得なくなった。TBS(南バスターミナル)だけでも1日に100を超える行き先へバスを出しており、発車案内板はホーム番号ではなくバス会社ごとに並んでいるため、なおさら分かりにくい。",
    ),
  },
  {
    id: "ragut",
    n: t("A motorcycle snatch-thief|Un ladrón en moto que arrebata el bolso|Un voleur à moto arrache le sac|バイクの引ったくり(ラグット)"),
    t: t(
      "The motorcycle came up from behind on the narrow five-foot way, close enough that the bag strap gave way before anyone registered the tug, and it was gone through the traffic before a single passer-by had time to react. Ragut, snatch theft usually carried out by a rider and a pillion working together, has pushed enough people in Malaysian cities to switch to cross-body bags worn on the side away from the road that shops now sell them specifically marketed as anti-ragut.|La moto llegó por detrás en la estrecha acera cubierta, tan cerca que la correa cedió antes de que nadie notara el tirón, y desapareció entre el tráfico antes de que un transeúnte tuviera tiempo de reaccionar. El ragut, robo con arrebato cometido por conductor y acompañante, ha llevado a tanta gente a usar bolsos bandolera al lado contrario a la carretera que las tiendas ya los venden como anti-ragut.|La moto est arrivée par-derrière sur l'étroit trottoir couvert, assez près pour que la bandoulière cède avant que quiconque ne sente la traction, et elle avait disparu dans la circulation avant qu'un passant n'ait le temps de réagir. Le ragut, vol à l'arraché commis par un conducteur et un passager, a poussé tant de gens à porter leur sac du côté opposé à la route que les boutiques en vendent estampillés anti-ragut.|狭い五フィート街路(アーケード付き歩道)の後方からバイクが近づき、誰かがその引っぱりに気づくより先にバッグの肩紐が切れ、通行人の誰かが反応する間もなく交通の中へ消えていった。運転者と同乗者が組んで行う「ラグット(引ったくり)」のせいで、マレーシアの都市部では車道と反対側の肩に斜め掛けバッグを掛ける人が増え、いまでは「ラグット対策」と銘打った専用バッグまで店で売られている。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。マレー系・華人系・インド系・ボルネオの
 * 先住民族それぞれの祭りと、南西・北東モンスーンを1年に配した。
 */
export const MALAYSIA_SEASONS = [
  {
    e: "🧹",
    n: t("Qingming and ancestor visits|Qingming y visitas a los antepasados|Qingming et les visites aux ancêtres|清明節と墓参り"),
    t: t(
      "Chinese Malaysian families sweep and repaint family graves for Qingming this month, leaving offerings of food, incense and paper replicas of money and household goods believed to reach ancestors in the afterlife, a custom brought by southern Chinese immigrants generations ago and still observed with equal care in Kuala Lumpur, Penang and Ipoh cemeteries alike.|Las familias chino-malasias limpian y repintan las tumbas familiares para Qingming este mes, dejando ofrendas de comida, incienso y réplicas de papel de dinero y enseres domésticos que se cree llegan a los antepasados en el más allá, costumbre traída por inmigrantes del sur de China generaciones atrás.|Les familles sino-malaisiennes nettoient et repeignent les tombes familiales pour Qingming ce mois-ci, laissant des offrandes de nourriture, d'encens et de répliques en papier d'argent et de biens censés parvenir aux ancêtres dans l'au-delà, coutume apportée par des immigrants du sud de la Chine il y a des générations.|マレーシア華人の家族は今月、清明節のために先祖の墓を掃除し塗り直し、あの世の先祖に届くとされる食べ物・線香・紙製の紙銭や家財の模型を供える。何世代も前に中国南部からの移民が持ち込んだ習わしで、クアラルンプールでもペナンでもイポーでも同じように大切にされている。",
    ),
    f: t(
      "The paper offerings burned at Qingming, joss paper folded to resemble gold or silver ingots, are a category unto themselves, and some families now burn elaborate paper models of smartphones, cars, and even credit cards, updated for whatever the deceased might need in the afterlife.|Las ofrendas de papel quemadas en Qingming, papel joss doblado como lingotes de oro o plata, son una categoría propia, y algunas familias ya queman réplicas de smartphones, coches e incluso tarjetas de crédito, actualizadas para lo que el difunto pueda necesitar en el más allá.|Les offrandes en papier brûlées à Qingming, du papier joss plié en forme de lingots d'or ou d'argent, forment une catégorie à part, et certaines familles brûlent désormais des répliques élaborées de smartphones, de voitures et même de cartes de crédit, adaptées à ce dont le défunt pourrait avoir besoin dans l'au-delà.|清明節で燃やす紙の供物は、金銀の延べ棒に模した「金紙」がその代表だが、いまでは一部の家庭がスマートフォンや自動車、クレジットカードまで精巧な紙細工で作って燃やし、あの世で故人が必要とするかもしれないものを時代に合わせて更新している。",
    ),
  },
  {
    e: "🌾",
    n: t("Kaamatan, Sabah's harvest festival|Kaamatan, la fiesta de la cosecha de Sabah|Kaamatan, la fête des récoltes du Sabah|サバの収穫祭カアマタン"),
    t: t(
      "Kaamatan closes out the rice harvest across Sabah this month with the Kadazan-Dusun ritual of Magavau, performed by a high priestess to give thanks to Bambaazon, the rice spirit, before villages turn to unaano rice wine, buffalo races, and the Unduk Ngadau beauty pageant that crowns the harvest festival's queen.|Kaamatan cierra la cosecha de arroz en todo Sabah este mes con el ritual kadazan-dusun de Magavau, realizado por una sacerdotisa para dar gracias a Bambaazon, el espíritu del arroz, antes de que los pueblos pasen al vino de arroz, carreras de búfalos y el certamen de belleza Unduk Ngadau.|Kaamatan clôt la récolte du riz dans tout le Sabah ce mois-ci avec le rituel kadazan-dusun du Magavau, exécuté par une grande prêtresse pour remercier Bambaazon, l'esprit du riz, avant que les villages ne passent au vin de riz, aux courses de buffles et au concours de beauté Unduk Ngadau qui couronne la reine de la fête des récoltes.|カアマタンは今月、サバ州全体の稲の収穫を締めくくる祭りで、女性の祭司が稲の精霊バンバアゾンに感謝を捧げるカダザンドゥスンの儀礼「マガバウ」が行われたのち、村々は米酒ウナアノや水牛レース、収穫祭の女王を選ぶ美人コンテスト「ウンドゥッ・ンガダウ」へと移っていく。",
    ),
    f: t(
      "Bambaazon is believed to inhabit the rice itself, which is why the Magavau ritual is performed to retrieve the rice spirit's soul after harvest, believed to have scattered during cutting, so that it can be safely stored with the grain for next year's planting.|Se cree que Bambaazon habita en el propio arroz, por lo que el ritual Magavau se realiza para recuperar el alma del espíritu del arroz tras la cosecha, que se cree dispersada durante el corte, para guardarla con el grano para la siembra del próximo año.|On pense que Bambaazon habite le riz lui-même, c'est pourquoi le rituel Magavau est accompli pour récupérer l'âme de l'esprit du riz après la récolte, censée s'être dispersée lors de la coupe, afin de la conserver avec le grain pour les semailles de l'an prochain.|バンバアゾンは米そのものに宿るとされ、そのため収穫の際に切り取られて散らばったとされるこの精霊の魂を呼び戻すために「マガバウ」の儀礼が行われる。呼び戻された魂は来年の田植えのため米と共に大切に保管される。",
    ),
  },
  {
    e: "🛶",
    n: t("Gawai Dayak in Sarawak|Gawai Dayak en Sarawak|Gawai Dayak au Sarawak|サラワクのガワイ祭"),
    t: t(
      "Gawai Dayak marks the end of the rice harvest for Sarawak's Iban and other Dayak communities this month, opened at midnight with the Iban chant Ngalu Petara inviting spirits to bless the coming year, followed by days of open-house visiting, tuak rice wine, and longhouse gatherings that draw urban Dayak workers home from Kuching and beyond.|Gawai Dayak marca el fin de la cosecha de arroz para los iban y otras comunidades dayak de Sarawak este mes, iniciado a medianoche con el canto iban Ngalu Petara que invita a los espíritus a bendecir el año entrante, seguido de días de casas abiertas, vino de arroz tuak y reuniones en las casas largas.|Le Gawai Dayak marque la fin de la récolte du riz pour les Iban et autres communautés dayak du Sarawak ce mois-ci, ouvert à minuit par le chant iban Ngalu Petara invitant les esprits à bénir l'année à venir, suivi de jours de maisons ouvertes, de vin de riz tuak et de rassemblements dans les maisons longues.|ガワイ祭は今月、サラワク州のイバン族をはじめとするダヤク系の人々の稲刈りの終わりを告げる祭りで、真夜中に霊を招いて来る年の祝福を願うイバンの詠唱「ンガル・プタラ」で幕を開け、その後は数日にわたる家々の開放訪問、米酒トゥアッ、そしてクチンなど都市部で働くダヤクの人々を実家のロングハウスへ呼び戻す集いが続く。",
    ),
    f: t(
      "Gawai Dayak was only formally gazetted as a public holiday in 1965, unifying what had been separate harvest celebrations across different Dayak longhouse communities into a single date recognized across the whole state.|Gawai Dayak solo se declaró oficialmente fiesta pública en 1965, unificando lo que habían sido celebraciones de cosecha separadas entre distintas comunidades dayak de casas largas en una sola fecha reconocida en todo el estado.|Le Gawai Dayak ne fut officiellement déclaré jour férié qu'en 1965, unifiant ce qui avait été des célébrations de récolte distinctes entre différentes communautés dayak des maisons longues en une seule date reconnue dans tout l'État.|ガワイ祭が正式に祝日として定められたのは1965年のことで、それまでダヤク系の各ロングハウス共同体でばらばらに行われていた収穫祭を、州全体で認められる一つの日付にまとめたものである。",
    ),
  },
  {
    e: "🥭",
    n: t("Peak durian season and school holidays|Temporada alta del durian y vacaciones escolares|Pleine saison du durian et vacances scolaires|ドリアンの最盛期と学校の長期休暇"),
    t: t(
      "Durian season peaks across the peninsula this month, and roadside stalls stack the spiky fruit in piles sorted by variety and price, from everyday Kampung to prized Musang King, while families use the long school holidays to travel, filling long-distance buses and coastal resorts for the first big getaway window of the year.|La temporada del durian llega a su punto álgido este mes en toda la península, y los puestos de carretera apilan la fruta espinosa por variedad y precio, desde el Kampung corriente hasta el preciado Musang King, mientras las familias aprovechan las largas vacaciones escolares para viajar.|La saison du durian atteint son pic ce mois-ci dans toute la péninsule, et les étals au bord des routes empilent le fruit épineux trié par variété et par prix, du Kampung ordinaire au précieux Musang King, tandis que les familles profitent des longues vacances scolaires pour voyager.|ドリアンの最盛期が今月、半島全体で訪れ、道端の屋台にはこのとげだらけの果実が品種と値段ごとに山積みにされる。普段使いの「カンポン」種から珍重される「ムサンキング」種まで並び、家庭は長い学校の休みを利用して旅行に出かけ、その年最初の大きな行楽シーズンとして長距離バスや海辺のリゾートが賑わう。",
    ),
    f: t(
      "Musang King durian, prized for its bright yellow flesh and bitter-sweet flavor, now commands export prices to China high enough that entire hillsides in Pahang and Johor have been converted from rubber and palm oil to durian orchards over the past decade.|El durian Musang King, apreciado por su pulpa amarilla brillante y sabor agridulce, alcanza precios de exportación a China tan altos que laderas enteras de Pahang y Johor se han convertido de caucho y palma aceitera a huertos de durian en la última década.|Le durian Musang King, prisé pour sa chair jaune vif et sa saveur aigre-douce, atteint des prix d'exportation vers la Chine si élevés que des collines entières du Pahang et du Johor sont passées, en une décennie, du caoutchouc et du palmier à huile aux vergers de durian.|明るい黄色の果肉とほろ苦い甘さで珍重される「ムサンキング」種のドリアンは、いまや中国への輸出価格が高騰し、この10年でパハン州やジョホール州の丘の斜面がまるごとゴムやアブラヤシの農園からドリアン果樹園へと転換された。",
    ),
  },
  {
    e: "🇲🇾",
    n: t("Merdeka, Independence Day|Merdeka, el Día de la Independencia|Merdeka, le jour de l'Indépendance|独立記念日(ムルデカ)"),
    t: t(
      "Merdeka Day on the 31st marks the moment in 1957 when the Union Jack came down over Kuala Lumpur's Selangor Club padang and the Federation of Malaya's flag went up, an event the country now marks with a midnight countdown, a military parade, and streets, cars and shopfronts draped in flags for weeks beforehand.|El Día de Merdeka, el 31, marca el momento de 1957 en que la bandera británica bajó sobre el padang del Selangor Club de Kuala Lumpur y se izó la de la Federación de Malaya, hecho que el país conmemora con una cuenta atrás a medianoche, un desfile militar y banderas por doquier durante semanas antes.|Le jour de Merdeka, le 31, marque le moment de 1957 où l'Union Jack descendit au-dessus du padang du Selangor Club de Kuala Lumpur et où le drapeau de la Fédération de Malaisie fut hissé, événement que le pays marque par un compte à rebours à minuit, un défilé militaire et des rues pavoisées des semaines à l'avance.|31日のムルデカ・デーは、1957年にクアラルンプールのスランゴール・クラブのパダン(広場)でイギリス国旗が降ろされ、マラヤ連邦の旗が掲げられた瞬間を記念する日である。いまでは真夜中のカウントダウンや軍事パレードが行われ、街や車、店先は数週間前から国旗で飾られる。",
    ),
    f: t(
      "The Selangor Club padang where the 1957 flag-raising took place still stands in central Kuala Lumpur, now overlooked by the Sultan Abdul Samad Building's clock tower, and remains the site of the annual Merdeka Day parade.|El padang del Selangor Club donde se izó la bandera en 1957 sigue en pie en el centro de Kuala Lumpur, hoy dominado por la torre del reloj del edificio Sultan Abdul Samad, y sigue siendo el escenario del desfile anual del Día de Merdeka.|Le padang du Selangor Club où le drapeau fut hissé en 1957 se dresse toujours au centre de Kuala Lumpur, aujourd'hui dominé par la tour de l'horloge du bâtiment Sultan Abdul Samad, et reste le lieu du défilé annuel du jour de Merdeka.|1957年に旗が掲げられたスランゴール・クラブのパダンはいまもクアラルンプール中心部に残り、いまはスルタン・アブドゥル・サマド・ビルディングの時計塔を背にして、毎年のムルデカ・デーのパレード会場であり続けている。",
    ),
  },
  {
    e: "🤝",
    n: t("Malaysia Day, when Sabah and Sarawak joined|Día de Malasia, cuando Sabah y Sarawak se unieron|Fête de la Malaisie, l'union du Sabah et du Sarawak|マレーシア・デー、サバとサラワクが加わった日"),
    t: t(
      "Malaysia Day on the 16th marks 1963, when the Federation of Malaya, Singapore, North Borneo, and Sarawak merged into the wider federation of Malaysia, a date that Sabah and Sarawak spent decades campaigning to have recognized as equally important as Merdeka Day, since the country as it exists today did not begin until this later union.|El Día de Malasia, el 16, marca 1963, cuando la Federación de Malaya, Singapur, Borneo del Norte y Sarawak se fusionaron en la federación más amplia de Malasia, fecha que Sabah y Sarawak llevaron décadas reclamando como tan importante como el Día de Merdeka.|La fête de la Malaisie, le 16, marque 1963, quand la Fédération de Malaisie, Singapour, le Bornéo du Nord et le Sarawak fusionnèrent en la fédération plus large de Malaisie, date que le Sabah et le Sarawak ont longtemps réclamé comme aussi importante que le jour de Merdeka.|16日のマレーシア・デーは1963年、マラヤ連邦・シンガポール・北ボルネオ・サラワクが合わさって、より広いマレーシア連邦になった日を記念する。今日のかたちの国が始まったのはこのより後の統合からであるとして、サバとサラワクは何十年もこの日をムルデカ・デーと同じ重みで扱うよう求め続けてきた。",
    ),
    f: t(
      "Singapore left the federation just two years later, in 1965, meaning the Malaysia formed on this day in 1963 briefly included what is now an independent country, before separating into the four-state-plus-territories federation that exists today.|Singapur salió de la federación solo dos años después, en 1965, así que la Malasia formada este día en 1963 incluyó brevemente lo que hoy es un país independiente, antes de separarse en la federación de hoy.|Singapour quitta la fédération à peine deux ans plus tard, en 1965, si bien que la Malaisie formée ce jour-là en 1963 inclut brièvement ce qui est aujourd'hui un pays indépendant, avant de se séparer en la fédération d'aujourd'hui.|シンガポールはわずか2年後の1965年に連邦を離脱したため、1963年のこの日に成立したマレーシアは、短いあいだ今日の独立国を含んでいたことになる。その後、今日のかたちの連邦へと姿を変えた。",
    ),
  },
  {
    e: "🪔",
    n: t("Deepavali, the festival of lights|Deepavali, la fiesta de las luces|Deepavali, la fête des lumières|光の祭りディーパヴァリ"),
    t: t(
      "Deepavali sends Malaysian Indian families into a frenzy of cleaning and decorating this month, drawing intricate kolam patterns of colored rice flour at the doorstep and stringing oil lamps to mark the mythological victory of light over darkness, while Brickfields, Kuala Lumpur's Little India, strings entire streets with lights and sells out of sweets days in advance.|Deepavali lanza a las familias indias malasias a un frenesí de limpieza y decoración este mes, trazando intrincados patrones kolam de harina de arroz de colores en el umbral y colgando lámparas de aceite para marcar la victoria mitológica de la luz sobre la oscuridad.|Deepavali plonge les familles indo-malaisiennes dans une frénésie de nettoyage et de décoration ce mois-ci, traçant d'intrics motifs kolam de farine de riz colorée sur le seuil et suspendant des lampes à huile pour marquer la victoire mythologique de la lumière sur les ténèbres.|ディーパヴァリは今月、マレーシアのインド系家庭を大掃除と飾りつけの熱狂に巻き込み、玄関先には色とりどりの米粉で複雑な模様「コーラム」を描き、光が闇に勝った神話上の出来事を記念して油ランプを吊るす。クアラルンプールのリトルインディア、ブリックフィールズは街路まるごと電飾で飾られ、菓子は数日前から売り切れる。",
    ),
    f: t(
      "Kolam patterns are traditionally redrawn fresh by hand every morning rather than left up permanently, since the ritual of making them, not just the finished design, is considered part of the offering.|Los patrones kolam se vuelven a trazar a mano cada mañana en lugar de dejarlos fijos, ya que el ritual de hacerlos, no solo el diseño terminado, se considera parte de la ofrenda.|Les motifs kolam sont traditionnellement retracés à la main chaque matin plutôt que laissés en place, le rituel de leur confection, et pas seulement le motif fini, étant considéré comme faisant partie de l'offrande.|コーラムの模様は固定して残すのではなく、伝統的に毎朝新しく手で描き直される。完成した図案だけでなく、それを描く行為そのものが供物の一部とされているためである。",
    ),
  },
  {
    e: "🌧️",
    n: t("The northeast monsoon closes the east coast|El monzón del noreste cierra la costa este|La mousson du nord-est ferme la côte est|北東モンスーンで東海岸が閉じる"),
    t: t(
      "The northeast monsoon sets in this month, bringing heavy surf and rain that shut down most island resorts on the east coast, Perhentian and Redang among them, for the season, while fishing boats are pulled ashore and dried in rows, and Kelantan and Terengganu households start stockpiling rice and dried goods before roads risk flooding.|El monzón del noreste se instala este mes, trayendo fuerte oleaje y lluvia que cierran la mayoría de los resorts insulares de la costa este, entre ellos Perhentian y Redang, por temporada, mientras los barcos de pesca se sacan a tierra y se secan en filas.|La mousson du nord-est s'installe ce mois-ci, apportant une forte houle et de la pluie qui ferment la plupart des complexes insulaires de la côte est, dont Perhentian et Redang, pour la saison, tandis que les bateaux de pêche sont tirés à terre et alignés pour sécher.|北東モンスーンが今月訪れ、荒波と雨がプルフンティアンやルダンをはじめ東海岸のほとんどの島リゾートをシーズンオフに追い込む。漁船は陸に引き上げられ列をなして乾かされ、クランタン州とトレンガヌ州の家庭は道路の冠水に備えて米や乾物を蓄え始める。",
    ),
    f: t(
      "Perhentian and Redang islands officially close their resorts to visitors each year during the worst of the monsoon, typically November through February, a rare case of an entire tourist destination shutting down on a predictable seasonal schedule.|Las islas Perhentian y Redang cierran oficialmente sus resorts a los visitantes cada año durante lo peor del monzón, normalmente de noviembre a febrero, un caso poco común de todo un destino turístico cerrando por temporada de forma predecible.|Les îles Perhentian et Redang ferment officiellement leurs complexes aux visiteurs chaque année pendant le plus fort de la mousson, généralement de novembre à février, un cas rare de toute une destination touristique fermant selon un calendrier saisonnier prévisible.|プルフンティアン島とルダン島は毎年、モンスーンの最も荒れる時期(通常11月から2月)にリゾートを公式に閉鎖する。観光地がまるごと予測可能な季節の周期で店じまいする、珍しい例である。",
    ),
  },
  {
    e: "🎄",
    n: t("Christmas and the year-end monsoon peak|Navidad y el pico monzónico de fin de año|Noël et le pic de mousson de fin d'année|クリスマスと年末のモンスーン最盛期"),
    t: t(
      "Shopping malls compete over elaborate Christmas decorations this month even in a Muslim-majority country, a tradition of secular festive display embraced across communities, while the northeast monsoon peaks with its heaviest rainfall, occasionally flooding entire towns in Kelantan and Terengganu badly enough to require mass evacuations to relief centres.|Los centros comerciales compiten en decoraciones navideñas elaboradas este mes incluso en un país de mayoría musulmana, tradición de despliegue festivo secular abrazada por todas las comunidades, mientras el monzón del noreste alcanza su pico de lluvias, a veces inundando pueblos enteros de Kelantan y Terengganu.|Les centres commerciaux rivalisent de décorations de Noël élaborées ce mois-ci même dans un pays à majorité musulmane, tradition d'apparat festif laïque adoptée par toutes les communautés, tandis que la mousson du nord-est atteint son pic de pluies, inondant parfois des villes entières du Kelantan et du Terengganu.|イスラム教徒が多数を占める国でありながら、今月はショッピングモールが凝ったクリスマス装飾を競い合う、宗教を問わず受け入れられた世俗的な祝祭の飾りつけの伝統である。一方で北東モンスーンは雨量の最盛期を迎え、クランタン州やトレンガヌ州では町ごと冠水し、避難所への大規模な避難が必要になることもある。",
    ),
    f: t(
      "Malaysia's mall Christmas decorations are treated as a genuine annual competition among shopping centres, with some spending months and significant budgets on displays despite Christmas being a public holiday observed mainly by the country's Christian minority.|Las decoraciones navideñas de los centros comerciales de Malasia se tratan como una auténtica competencia anual, con algunos dedicando meses y presupuestos considerables a las exhibiciones, pese a que la Navidad es festivo observado sobre todo por la minoría cristiana del país.|Les décorations de Noël des centres commerciaux malaisiens sont traitées comme une véritable compétition annuelle, certains y consacrant des mois et des budgets considérables, bien que Noël soit un jour férié observé surtout par la minorité chrétienne du pays.|マレーシアのショッピングモールのクリスマス装飾は、実質的な年次コンテストとして扱われており、クリスマスが主にキリスト教徒という少数派によって祝われる祝日であるにもかかわらず、何か月もかけ相当な予算を投じて飾り付ける店もある。",
    ),
  },
  {
    e: "🙏",
    n: t("Thaipusam and the climb to Batu Caves|Thaipusam y la subida a las cuevas de Batu|Thaipusam et l'ascension des grottes de Batu|バトゥ洞窟へ登るタイプーサム"),
    t: t(
      "Thaipusam brings well over a million devotees to Batu Caves this month, many carrying kavadi, ornate frameworks pierced through the skin and carried in fulfilment of a vow, up the 272-step limestone staircase to the temple cave, while others simply carry a pot of milk on their head, a lighter form of the same devotion to the god Murugan.|Thaipusam lleva a más de un millón de devotos a las cuevas de Batu este mes, muchos cargando kavadi, estructuras ornamentadas atravesadas por la piel y llevadas en cumplimiento de una promesa, por la escalera de piedra caliza de 272 escalones hasta la cueva-templo.|Thaipusam attire bien plus d'un million de fidèles aux grottes de Batu ce mois-ci, beaucoup portant des kavadi, structures ornées transperçant la peau et portées en accomplissement d'un vœu, jusqu'en haut des 272 marches calcaires menant à la grotte-temple.|タイプーサムは今月、100万人を優に超える信者をバトゥ洞窟に集める。多くは誓いの成就として肌を貫いて担ぐ装飾枠「カヴァディ」を背負い、石灰岩の272段の階段を登って洞窟寺院へ向かうが、頭に乳の壺を載せるだけの、より軽い形の献身をする人々もいる。",
    ),
    f: t(
      "The 42.7-metre golden statue of Lord Murugan at the foot of Batu Caves, unveiled in 2006, is one of the tallest statues of a Hindu deity in the world and was funded largely through public donation over more than a decade of construction.|La estatua dorada de 42,7 metros del dios Murugan al pie de las cuevas de Batu, inaugurada en 2006, es una de las más altas de una deidad hindú en el mundo y se financió en gran parte con donaciones públicas durante más de una década de construcción.|La statue dorée de 42,7 mètres du dieu Murugan au pied des grottes de Batu, dévoilée en 2006, est l'une des plus hautes statues d'une divinité hindoue au monde et fut financée en grande partie par des dons publics sur plus d'une décennie de construction.|バトゥ洞窟の麓に立つ高さ42.7メートルの黄金のムルガン神像は2006年に披露され、ヒンドゥー教の神の像として世界有数の高さを誇る。10年以上に及んだ建設の資金は主に市民の寄付でまかなわれた。",
    ),
  },
  {
    e: "🧧",
    n: t("Chinese New Year and the lion dance|Año Nuevo Chino y la danza del león|Nouvel An chinois et la danse du lion|旧正月と獅子舞"),
    t: t(
      "Chinese New Year fills shopping malls and shophouse streets this month with lion dance troupes leaping between poles to pluck a hanging lettuce, considered a blessing for prosperity, while families exchange ang pow red packets and the reunion dinner dish yee sang, tossed high with chopsticks by everyone at the table for good luck rising with it.|El Año Nuevo Chino llena centros comerciales y calles de casas-tienda este mes de troupes de danza del león saltando entre postes para arrancar una lechuga colgante, considerada bendición de prosperidad, mientras las familias intercambian sobres rojos ang pow y el plato de reunión yee sang, lanzado alto con palillos por todos en la mesa.|Le Nouvel An chinois remplit ce mois-ci centres commerciaux et rues de maisons-boutiques de troupes de danse du lion bondissant entre des poteaux pour cueillir une laitue suspendue, considérée comme une bénédiction de prospérité, tandis que les familles échangent des enveloppes rouges ang pow et le plat de réunion yee sang, lancé haut aux baguettes par toute la tablée.|旧正月は今月、ショッピングモールやショップハウスの通りを獅子舞の一座で埋め尽くす。獅子は柱のあいだを跳び移りながら吊るされたレタスをもぎ取り、繁栄の祝福とされる。家族は赤い封筒アンパオを交わし、団らんの膳の魚の刺身料理「ロヘイ」を食卓の全員で箸高く放り上げ、運気が共に上がるよう願う。",
    ),
    f: t(
      "Yee sang, the raw fish salad tossed communally with chopsticks while shouting auspicious phrases, is a Malaysian and Singaporean invention rather than a mainland Chinese dish, generally credited to restaurateurs in the two countries during the 1960s.|El yee sang, la ensalada de pescado crudo lanzada comunalmente con palillos mientras se gritan frases auspiciosas, es una invención malasia y singapurense, no un plato de la China continental, generalmente atribuida a restauradores de ambos países en los años sesenta.|Le yee sang, cette salade de poisson cru lancée collectivement aux baguettes en criant des formules de bon augure, est une invention malaisienne et singapourienne plutôt qu'un plat de Chine continentale, généralement attribuée à des restaurateurs des deux pays dans les années 1960.|箸で高く放り上げながら縁起の良い言葉を叫ぶ生魚のサラダ「ロヘイ(魚生)」は、中国本土の料理ではなくマレーシアとシンガポールで生まれた料理で、一般に1960年代の両国の飲食店経営者の考案とされている。",
    ),
  },
  {
    e: "🌙",
    n: t("Hari Raya Aidilfitri ends the fasting month|Hari Raya Aidilfitri cierra el mes de ayuno|Hari Raya Aidilfitri clôt le mois de jeûne|断食月を終えるハリラヤ・アイディルフィトリ"),
    t: t(
      "Hari Raya Aidilfitri closes the fasting month of Ramadan this month with the takbir chant rising from mosques the night before, followed by days of rumah terbuka open houses where Malay families welcome neighbours of every background to eat ketupat rice cakes and rendang, while everyone, regardless of religion, asks forgiveness of elders in the ritual greeting maaf zahir dan batin.|Hari Raya Aidilfitri cierra el mes de ayuno del Ramadán este mes con el canto takbir elevándose desde las mezquitas la noche anterior, seguido de días de casas abiertas rumah terbuka donde las familias malayas reciben a vecinos de cualquier origen para comer ketupat y rendang.|Hari Raya Aidilfitri clôt le mois de jeûne du Ramadan ce mois-ci avec le chant takbir s'élevant des mosquées la veille, suivi de jours de maisons ouvertes rumah terbuka où les familles malaises accueillent des voisins de toute origine pour manger ketupat et rendang.|ハリラヤ・アイディルフィトリは今月、断食月ラマダンを締めくくる祭りで、前夜にはモスクからタクビールの詠唱が響き渡り、その後は数日にわたる「開かれた家(ルマ・トゥルブカ)」の訪問が続く。マレー系の家庭はあらゆる背景の隣人を迎えてクトゥパット(米のちまき)やルンダンを振る舞い、宗教を問わず誰もが年長者に許しを請う挨拶「マアフ・ザヒル・ダン・バティン」を交わす。",
    ),
    f: t(
      "The open-house tradition of rumah terbuka has grown well beyond individual families, with government ministries, companies, and even the royal palace hosting their own large-scale open houses during the Hari Raya season, open to the general public regardless of faith.|La tradición de casas abiertas rumah terbuka ha crecido mucho más allá de las familias individuales, con ministerios, empresas e incluso el palacio real celebrando sus propias casas abiertas a gran escala durante la temporada de Hari Raya, abiertas al público general sin importar la fe.|La tradition des maisons ouvertes rumah terbuka a largement dépassé le cadre des familles individuelles, avec des ministères, des entreprises et même le palais royal organisant leurs propres maisons ouvertes à grande échelle pendant la saison du Hari Raya, ouvertes au public sans distinction de confession.|「開かれた家」の伝統は個々の家庭を大きく超えて広がり、政府省庁や企業、さらには王宮までもがハリラヤの時期に独自の大規模な開放行事を催し、信仰を問わず一般の人々に開かれている。",
    ),
  },
];
