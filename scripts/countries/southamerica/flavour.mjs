/**
 * 南アメリカ大陸の国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * アイテム9件の鍵は、既存26盤面(ボリビア・ブラジル・ベネズエラを含む)と
 * 衝突しないことを確認済み(`ekeko` `pacha` `singani` `coca` `figa` `bicho`
 * `arara` `condor` `ruda` などは避けた)。効果の種類・価格帯・kindの並びは
 * 他の盤面と同じ9種の順(carried-far → choose-exact-dice → roll2 → roll3 →
 * passive ward → repel-spirit → quiz-save → gain-cash → extra-turn)。
 *
 * 厄災の神は**エル・トゥンチェ**(ペルー・アマゾンの口笛の霊)にした。
 * ボリビア(エル・ティーオ)・ブラジル(サシ・ペレレ)・ベネズエラ
 * (エル・シルボン)がすでに埋まっているため、まだ自国の盤面を持たない
 * ペルーの民話から採っている。
 *
 * 季節は月インデックス0=4月(他の盤面と共通の規約)。南半球の季節を軸に、
 * アンデス・アマゾン・パンパ・太平洋岸を月ごとに入れ替えて特定の地方に
 * 偏らないようにした(`pla` が15都市と最大なので、実際の倍率は
 * `season-and-doom-rules.ts` 側で効きすぎないよう調整してもらう前提)。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const SOUTHAMERICA_META = {
  id: "southamerica",
  name: t("South America|Sudamérica|Amérique du Sud|南アメリカ"),
  blurb: t(
    "A continent stitched together by breaks in gauge, ferries across rivers with no bridge, and roads that simply stop|Un continente unido por cambios de ancho de vía, ferris sobre ríos sin puente y carreteras que simplemente se detienen|Un continent cousu par des changements d'écartement, des ferries sur des fleuves sans pont et des routes qui s'arrêtent net|軌間の断絶と、橋のない川を渡るフェリーと、ふいに途切れる道でつなぎ合わされた大陸",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS 側にまとめる
  // (team-lead 指定: southamerica ×100、US$120,000スタート)。
  cur: { pre: "US$", post: "", mul: 100 },
  start: "buenosaires",
  cpuNames: ["Cóndor", "Pombero", "Boitatá", "Anchanchu"],
  // アマゾンの緑・アンデスの灰褐・太平洋/大西洋の青・インカの金・氷河の白。
  stripe: ["#2f6b3a", "#8b8f98", "#1f6f96", "#f4c430", "#f6efe2"],
};

/**
 * 46都市を束ねる6地方(暫定。路線を引き終えた段階で偏りが無いことを確認済み)。
 *
 * `riv`(川の国境)は2026-08-14にベレンを加えた際、名称と中身が完全には
 * 一致しなくなっている——ベレンは国境の町ではなくアマゾン水系の出口だが、
 * 他5都市(レティシア・サンカルロス・デ・リオネグロ・コルンバ・タバチンガ・
 * プエルトスアレス)はいずれも国境の町。名称は変えず、この不一致を
 * ここに残しておく(11月の季節文とand地方の倍率の不一致を team-lead 承認の
 * うえ残したのと同じ扱い)。
 */
export const SOUTHAMERICA_REGIONS = {
  car: t("The Caribbean & the Isthmus|El Caribe y el istmo|Les Caraïbes et l'isthme|カリブ海と地峡"),
  gui: t("The Guianas|Las Guayanas|Les Guyanes|ギアナ3国"),
  riv: t("The River Borders|Las fronteras fluviales|Les frontières fluviales|川の国境"),
  and: t("The Andes|Los Andes|Les Andes|アンデス"),
  atc: t("The Pacific Coast|La costa del Pacífico|La côte pacifique|太平洋岸"),
  pla: t("The Río de la Plata & Patagonia|El Río de la Plata y la Patagonia|Le Río de la Plata et la Patagonie|ラプラタ川とパタゴニア"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種(対応表は
 * `src/infrastructure/content/item-effect-rules.ts`)。名前は大陸各地の
 * 実在する物・慣習から採り、都市の豆知識と重なる話は避けている
 * (例: トランスアンディーノ鉄道はバルパライソの豆知識と同じ史実を指すが、
 * アイテムの説明文はチケットという物そのものに焦点を当てて書き分けた)。
 */
export const SOUTHAMERICA_ITEMS = {
  harpia: {
    e: "🦅",
    price: 260,
    kind: "move",
    n: t("A Ride on the Harpy Eagle|Un vuelo en el águila harpía|Une envolée sur l'aigle harpie|オウギワシの背に乗って"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "The harpy eagle, found from southern Mexico down through the Amazon basin, is one of the largest and most powerful eagles alive, strong enough to lift a full-grown sloth or howler monkey clean off a branch. It hunts by sitting motionless in the canopy for hours, then closing the distance in a single silent stoop that leaves almost no warning at all.|El águila harpía, presente desde el sur de México hasta la cuenca amazónica, es una de las águilas más grandes y poderosas que existen, capaz de levantar de una rama a un perezoso adulto o a un mono aullador. Caza quedándose inmóvil en el dosel durante horas y luego cerrando la distancia en un solo picado silencioso que apenas da aviso.|L'aigle harpie, présent du sud du Mexique jusqu'au bassin amazonien, est l'un des plus grands et des plus puissants aigles vivants, assez fort pour arracher d'une branche un paresseux adulte ou un singe hurleur. Il chasse en restant immobile des heures dans la canopée, puis fond en un seul piqué silencieux qui ne laisse presque aucun avertissement.|オウギワシは南メキシコからアマゾン盆地にかけて生息し、現存する鷲の中でも屈指の大きさと力を誇る。成長したナマケモノやホエザルを枝からまるごと持ち上げられるほどだ。何時間も林冠でじっと動かずに待ち、獲物との距離を一度の無音の急降下で詰める。ほとんど前触れを与えない。",
    ),
  },
  salvoconducto: {
    e: "📜",
    price: 400,
    kind: "pre",
    n: t("A Safe-Conduct Pass|Un salvoconducto|Un sauf-conduit|通行許可証"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "A salvoconducto was a document colonial and republican authorities issued to let a specific traveller cross a specific checkpoint without being stopped, the paper answer to the same problem that still slows trucks and buses at crossings like Villazón or Uruguaiana today. Forging one was, and in places still is, a livelihood of its own.|Un salvoconducto era un documento que las autoridades coloniales y republicanas expedían para que un viajero concreto cruzara un puesto concreto sin ser detenido, la respuesta en papel al mismo problema que hoy sigue frenando camiones y autobuses en pasos como Villazón o Uruguaiana. Falsificarlo fue, y en algunos sitios sigue siendo, un oficio en sí mismo.|Un sauf-conduit était un document que les autorités coloniales puis républicaines délivraient pour qu'un voyageur précis franchisse un poste précis sans être arrêté, la réponse sur papier au même problème qui ralentit encore aujourd'hui camions et autocars à des postes comme Villazón ou Uruguaiana. Le falsifier fut, et reste par endroits, un métier à part entière.|通行許可証は、植民地時代とその後の共和国の当局が、特定の旅人を特定の検問所で止めずに通すために発行した文書で、いまもビジャソンやウルグアイアナのような国境でトラックやバスを足止めしているのと同じ問題への、紙の上での答えだった。これを偽造することは、当時もいまも一部の土地では、それ自体が一つの生業である。",
    ),
  },
  trasandino: {
    e: "🚂",
    price: 360,
    kind: "pre",
    n: t("Trasandino Railway Ticket|Billete del Ferrocarril Trasandino|Billet du chemin de fer transandin|トランスアンディーノ鉄道の切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "This ticket is stamped for the line that once carried passengers over the Andes between Valparaíso and Buenos Aires by way of the Uspallata Pass, one of the first railways anywhere to connect the Pacific and Atlantic sides of the continent. Snow and cost closed the passenger service decades ago, so a valid ticket for it is, strictly speaking, something only a museum can issue now.|Este billete lleva el sello de la línea que antes cruzaba los Andes entre Valparaíso y Buenos Aires por el paso de Uspallata, uno de los primeros ferrocarriles en unir el lado pacífico y el atlántico del continente. La nieve y el coste cerraron el servicio de pasajeros hace décadas, así que, en sentido estricto, hoy solo un museo puede expedir un billete válido.|Ce billet porte le tampon de la ligne qui traversait autrefois les Andes entre Valparaíso et Buenos Aires par le col d'Uspallata, l'un des premiers chemins de fer à relier les versants pacifique et atlantique du continent. La neige et le coût ont fermé le service voyageurs il y a des décennies, si bien qu'à proprement parler, seul un musée peut aujourd'hui en délivrer un valable.|この切符には、かつてウスパジャータ峠を通ってバルパライソとブエノスアイレスのあいだでアンデスを越えていた路線の印が押されている。大陸の太平洋側と大西洋側を結んだ最初期の鉄道の一つだった。雪と費用のせいで旅客営業は何十年も前に終わったので、厳密に言えば、いまこの切符を正式に発行できるのは博物館だけである。",
    ),
  },
  alasnubes: {
    e: "🚞",
    price: 640,
    kind: "pre",
    n: t("Train to the Clouds Ticket|Billete del Tren a las Nubes|Billet du train vers les nuages|雲への列車の切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The Train to the Clouds climbs into the Argentine Andes on a track built between 1921 and 1948 specifically to reach mining towns no road could serve, crossing a viaduct so high above the valley floor that early passengers were issued oxygen on request. It never goes fast in absolute terms, but nothing else on this board climbs higher while still calling itself a train.|El Tren a las Nubes sube por los Andes argentinos sobre una vía construida entre 1921 y 1948 justamente para llegar a pueblos mineros a los que ninguna carretera servía, cruzando un viaducto tan alto sobre el valle que a los primeros pasajeros se les ofrecía oxígeno si lo pedían. Nunca es rápido en términos absolutos, pero nada más en este tablero sube más alto llamándose todavía tren.|Le Train vers les nuages grimpe dans les Andes argentines sur une voie construite entre 1921 et 1948 justement pour atteindre des villes minières qu'aucune route ne desservait, franchissant un viaduc si haut au-dessus du fond de la vallée que les premiers passagers se voyaient proposer de l'oxygène sur demande. Il ne va jamais vite dans l'absolu, mais rien d'autre sur ce plateau ne grimpe plus haut tout en se disant encore un train.|「雲への列車」は、1921年から1948年にかけて、道路の通じない鉱山町へ届くためだけに敷かれた線路でアルゼンチンのアンデスを登る。谷底からあまりに高い陸橋を渡るため、初期の乗客は求めれば酸素を渡された。絶対的な速さでは決して速くないが、この盤面で「列車」を名乗りながらこれより高く登るものはほかにない。",
    ),
  },
  ojodevenado: {
    e: "🌰",
    price: 320,
    kind: "passive",
    n: t("A Deer's-Eye Seed|Una semilla de ojo de venado|Une graine œil-de-cerf|鹿の目の種"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Ojo de venado, \"deer's eye\", is the reddish-brown seed of a rainforest vine, worn on a cord or pinned to a baby's clothing across much of Spanish-speaking South America to turn aside the evil eye and the envy of strangers. Herbalists in city markets still sort them by size, since a larger seed is held to watch more closely than a small one.|El ojo de venado es la semilla rojiza de una liana de la selva, que se lleva en un cordón o se prende a la ropa de un bebé en buena parte de la Sudamérica hispanohablante para desviar el mal de ojo y la envidia ajena. Los herbolarios de los mercados aún las clasifican por tamaño, pues se cree que una semilla más grande vigila con más atención.|L'ojo de venado, « œil de cerf », est la graine brun-rouge d'une liane de forêt tropicale, portée sur un cordon ou épinglée aux vêtements d'un bébé dans une bonne partie de l'Amérique du Sud hispanophone pour détourner le mauvais œil et l'envie d'autrui. Les herboristes des marchés les trient encore par taille, une graine plus grosse étant censée veiller de plus près.|「鹿の目」を意味するオホ・デ・ベナードは、熱帯林のつる植物の赤茶色い種で、スペイン語圏の南米の多くで紐に通したり赤ん坊の服に留めたりして、邪視や他人のねたみをそらすために使われる。市場の薬草売りはいまも大きさで選り分ける。大きな種のほうがより注意深く見守るとされているからだ。",
    ),
  },
  palosanto: {
    e: "🪵",
    price: 440,
    kind: "pre",
    n: t("A Stick of Palo Santo|Un palo de palo santo|Un bâton de palo santo|パロサントの木片"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Palo Santo, \"holy wood\", comes from a tree native to the dry forests of coastal Ecuador and Peru, and burning a splinter of it is a common way to clear a room of both mosquitoes and, by older belief, unwanted spirits. The wood is only fragrant once the tree has died and fallen naturally, so a live tree cannot simply be cut for it.|El palo santo, «madera sagrada», procede de un árbol propio de los bosques secos de la costa de Ecuador y Perú, y quemar una astilla es una forma común de despejar una habitación tanto de mosquitos como, según creencias más antiguas, de espíritus no deseados. La madera solo desprende aroma una vez que el árbol ha muerto y caído de forma natural.|Le palo santo, « bois sacré », provient d'un arbre propre aux forêts sèches du littoral équatorien et péruvien, et brûler un éclat de son bois est un moyen courant de chasser d'une pièce aussi bien les moustiques que, selon des croyances plus anciennes, les esprits indésirables. Le bois n'est parfumé qu'une fois l'arbre mort et tombé naturellement.|「聖なる木」を意味するパロサントは、エクアドルとペルーの沿岸の乾いた森に自生する木で、その削り屑を燃やすことは、蚊を追い払うためにも、また古い言い伝えでは望まぬ霊を払うためにも、よく使われる方法である。この木は自然に枯れて倒れたあとにしか香りを持たないので、生きている木を単に伐って手に入れることはできない。",
    ),
  },
  amauta: {
    e: "📖",
    price: 140,
    kind: "passive",
    n: t("An Amauta's Teaching|La enseñanza de un amauta|L'enseignement d'un amauta|アマウタの教え"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "An amauta was a philosopher-teacher in the Inca state, responsible for training the sons of nobility in history, religion, quipu record-keeping and rhetoric, since the empire kept no written script of its own. A borrowed page of an amauta's teaching, real or claimed, has always been worth more than what a student could work out alone overnight.|Un amauta era un maestro-filósofo del Estado inca, encargado de formar a los hijos de la nobleza en historia, religión, el registro con quipus y retórica, ya que el imperio no tenía escritura propia. Una página prestada de la enseñanza de un amauta, real o supuesta, siempre ha valido más de lo que un alumno podría resolver solo de la noche a la mañana.|Un amauta était un maître-philosophe de l'État inca, chargé de former les fils de la noblesse à l'histoire, à la religion, à la tenue des quipus et à la rhétorique, l'empire ne possédant pas d'écriture propre. Une page empruntée à l'enseignement d'un amauta, réel ou prétendu, a toujours valu plus que ce qu'un élève aurait pu trouver seul en une nuit.|アマウタとは、インカ国家における哲学者にして教師であり、独自の文字を持たなかった帝国において、貴族の子弟に歴史・宗教・キープ(結縄)の記録法・弁論術を教える役目を負っていた。本物であれ自称であれ、アマウタの教えを借りた一頁は、生徒が一夜で自力で編み出せるものより、いつの時代も値打ちがあった。",
    ),
  },
  escudo: {
    e: "🪙",
    price: 280,
    kind: "pre",
    n: t("A Colonial Gold Escudo|Un escudo de oro colonial|Un écu d'or colonial|植民地時代の金貨エスクード"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "The escudo was a gold coin struck at mints across Spanish South America from the 1500s onward, including at Potosí, whose silver and gold financed a good part of the Spanish crown's wars in Europe for two centuries. Sell one to a collector today and it is worth far more than the metal in it.|El escudo era una moneda de oro acuñada en cecas de toda la Sudamérica española desde el siglo XVI, incluida la de Potosí, cuya plata y oro financiaron buena parte de las guerras de la corona española en Europa durante dos siglos. Vendida hoy a un coleccionista, vale mucho más que el metal que contiene.|L'écu était une pièce d'or frappée dans des ateliers monétaires de toute l'Amérique du Sud espagnole à partir du XVIe siècle, dont celui de Potosí, dont l'argent et l'or financèrent une bonne part des guerres de la couronne d'Espagne en Europe pendant deux siècles. Vendu aujourd'hui à un collectionneur, il vaut bien plus que le métal qu'il contient.|エスクード金貨は16世紀以降、ポトシを含むスペイン領南米各地の造幣所で鋳造された金貨で、ポトシの銀と金は二世紀にわたりスペイン王室のヨーロッパでの戦費の少なからぬ部分をまかなった。いま収集家に売れば、含まれる金属そのものよりずっと高く売れる。",
    ),
  },
  sacoleiro: {
    e: "🛍️",
    price: 420,
    kind: "pre",
    n: t("A Sacoleiro's Bag|La bolsa de un sacoleiro|Le sac d'un sacoleiro|サコレイロの袋"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Sacoleiro, roughly \"bag person\", is what Brazilians call the day-traders who cross the Friendship Bridge into Ciudad del Este every morning to buy goods cheaper on the Paraguayan side and carry them home by hand before the return crowd builds. The good ones know exactly which queue moves fastest at exactly which hour.|Sacoleiro, algo así como «persona de las bolsas», es como llaman los brasileños a los comerciantes de un día que cruzan el Puente de la Amistad hacia Ciudad del Este cada mañana para comprar más barato del lado paraguayo y llevárselo a mano antes de que se forme la aglomeración del regreso. Los buenos saben exactamente qué fila avanza más rápido a qué hora.|Sacoleiro, à peu près « personne aux sacs », c'est ainsi que les Brésiliens appellent les commerçants d'un jour qui traversent chaque matin le pont de l'Amitié vers Ciudad del Este pour acheter moins cher côté paraguayen et rapporter leurs achats à la main avant que la foule du retour ne s'amasse. Les meilleurs savent exactement quelle file avance le plus vite à quelle heure.|「サコレイロ(袋の人)」とは、毎朝友好橋を渡ってシウダー・デル・エステへ行き、パラグアイ側で安く買った品を、帰りの混雑が始まる前に手で運んで帰る日帰り商人を、ブラジル人がそう呼ぶ呼び名である。手練れは、どの時間にどの列がいちばん早く進むかを正確に知っている。",
    ),
  },
};

/**
 * 厄災の神。ペルー・アマゾンの民話に伝わる口笛の霊「エル・トゥンチェ」に
 * した。ボリビア(エル・ティーオ)・ブラジル(サシ・ペレレ)・ベネズエラ
 * (エル・シルボン)がすでに埋まっているため、まだ自国の盤面を持たない
 * ペルーの民話から採っている。
 */
export const SOUTHAMERICA_SPIRIT = {
  e: "🌫️",
  n: t("El Tunche|El Tunche|El Tunche|エル・トゥンチェ"),
  big: t("El Tunche's Whistling Chase|La cacería silbante de El Tunche|La chasse sifflante d'El Tunche|エル・トゥンチェの口笛の狩り"),
  ward: "ojodevenado",
  arrive: t(
    "<b>🌫️ El Tunche has picked up your trail.</b> Amazonian tales describe a whistling spirit, said by some to be the wandering soul of someone who died alone and unmourned deep in the forest, who lures travelers off the path with a whistle that never seems to come from where it sounds. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🌫️ El Tunche te ha seguido el rastro.</b> Las historias amazónicas hablan de un espíritu silbador, dicho por algunos el alma errante de alguien que murió solo y sin llanto en lo profundo de la selva, que aleja a los viajeros del camino con un silbido que nunca parece venir de donde suena. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🌫️ El Tunche a suivi ta piste.</b> Les récits amazoniens décrivent un esprit siffleur, dit par certains être l'âme errante de quelqu'un mort seul et sans pleurs au cœur de la forêt, qui égare les voyageurs avec un sifflement qui ne semble jamais venir d'où il retentit. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🌫️ エル・トゥンチェに目を付けられた。</b> アマゾンの言い伝えによれば、これは口笛を吹く霊で、森の奥で誰にも看取られず独りで死んだ者のさまよう魂だと語る者もいる。聞こえてくる方向とは違うところから響く口笛で、旅人を道から誘い出す。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🌫️ <b>El Tunche</b> loses interest and drifts after <b>{0}</b>, farthest from {1}.|🌫️ <b>El Tunche</b> pierde el interés y se desliza tras <b>{0}</b>, el más lejano de {1}.|🌫️ <b>El Tunche</b> se désintéresse et glisse vers <b>{0}</b>, le plus loin de {1}.|🌫️ <b>エル・トゥンチェ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ漂っていった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with El Tunche and never once lost the whistle's thread. He stops circling and closes the distance directly — <b>El Tunche's Whistling Chase</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto a El Tunche sin haber perdido nunca el hilo del silbido. Deja de rondar y acorta la distancia sin más rodeos: empieza <b>la cacería silbante de El Tunche</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec El Tunche sans jamais perdre le fil du sifflement. Il cesse de tourner et referme la distance directement : <b>la chasse sifflante d'El Tunche</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもエル・トゥンチェと歩きながら、一度もその口笛の糸を見失わずにいた。彼は回り込むのをやめ、まっすぐ距離を詰めてくる。<b>エル・トゥンチェの口笛の狩り</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> in the old tales a lost traveler could tell El Tunche's whistle from a person's because it never repeats the same note twice and never quite comes from the direction it seems to. Answering it back, tellers warn, only tells him exactly where you are.|<b>Tras la historia:</b> en los viejos relatos, un viajero perdido podía distinguir el silbido de El Tunche del de una persona porque nunca repite la misma nota dos veces ni viene nunca de la dirección de la que parece venir. Responderle, advierten, solo le dice exactamente dónde estás.|<b>Derrière l'histoire :</b> dans les vieux récits, un voyageur perdu pouvait distinguer le sifflement d'El Tunche de celui d'une personne car il ne répète jamais deux fois la même note et ne vient jamais tout à fait de la direction d'où il semble venir. Lui répondre, prévient-on, ne fait que lui indiquer exactement où l'on se trouve.|<b>物語の背景:</b> 昔話では、迷った旅人はエル・トゥンチェの口笛を人のものと聞き分けられたという。同じ音を二度と繰り返さず、聞こえてくる方向から実際には来ないからだ。語り手は、それに口笛で答え返すと、いまどこにいるかを正確に教えてしまうだけだと警告する。",
  ),
  pleased: t(
    "He drifts off through the canopy, and something he was carrying — nobody quite saw what — is left glinting on the path. <b>{0}</b> gains <span class='money'>+{1}</span>.|Se aleja flotando entre el dosel, y algo que llevaba consigo —nadie vio bien qué— queda brillando en el camino. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il s'éloigne en flottant à travers la canopée, et quelque chose qu'il transportait — personne n'a bien vu quoi — reste à briller sur le chemin. <b>{0}</b> gagne <span class='money'>+{1}</span>.|林冠を漂うように去っていったとき、彼が運んでいた何か――誰もはっきりとは見なかった――が道に光って残された。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A deer's-eye seed swings into view on its cord, and El Tunche's whistle breaks off mid-note. He drifts past <b>{0}</b> without noticing this turn.|Una semilla de ojo de venado se balancea a la vista en su cordón, y el silbido de El Tunche se corta a media nota. Pasa de largo junto a <b>{0}</b> sin percatarse esta vuelta.|Une graine œil-de-cerf se balance en vue au bout de son cordon, et le sifflement d'El Tunche s'interrompt en pleine note. Il passe devant <b>{0}</b> sans le remarquer ce tour-ci.|紐に通した鹿の目の種が視界で揺れると、エル・トゥンチェの口笛は音の途中で止まった。彼はこのターン、気づかないまま <b>{0}</b> のそばを通り過ぎた。",
  ),
};

/** 災難7種。大陸規模の自然現象・国境の煩わしさ・トゥンチェのいたずらを混ぜてある。 */
export const SOUTHAMERICA_DOOM = [
  {
    id: "huayco",
    n: t("A huayco comes down the valley|Un huayco baja por el valle|Un huayco dévale la vallée|フアイコが谷を下る"),
    t: t(
      "A huayco — a sudden slurry of mud, rock and floodwater triggered by heavy rain higher up an Andean valley — has come down across the line without warning, the way it does most years in the same stretch of loose slope. Crews know roughly where these happen and still cannot say exactly when.|Un huayco —una repentina masa de barro, piedras y agua de crecida provocada por lluvias intensas más arriba en un valle andino— ha bajado sobre la vía sin previo aviso, tal como ocurre casi todos los años en el mismo tramo de ladera suelta. Las cuadrillas saben más o menos dónde pasa esto y aun así no pueden decir exactamente cuándo.|Un huayco — une coulée soudaine de boue, de roches et d'eau de crue provoquée par de fortes pluies plus haut dans une vallée andine — s'est abattu sur la voie sans prévenir, comme cela arrive presque chaque année sur le même versant instable. Les équipes savent à peu près où cela se produit, mais ne peuvent toujours pas dire exactement quand.|フアイコ――アンデスの谷の上流での豪雨によって突然起こる泥と岩と鉄砲水の奔流――が前触れなく線路を横切って下ってきた。同じ緩んだ斜面の区間で、ほとんど毎年のように起きることだ。作業班はどこで起きるかはおおよそ分かっていても、いつ起きるかはいまだに言い当てられない。",
    ),
  },
  {
    id: "creciente",
    n: t("The Amazon rises over the docks|El Amazonas sube sobre los muelles|L'Amazone monte au-dessus des quais|アマゾン川が桟橋を越えて増水する"),
    t: t(
      "The Amazon and its tributaries have risen high enough this creciente to put river ports and low docks briefly underwater, and boats now tie up at whatever stretch of higher ground is left rather than at the usual landing. Locals read the water line on the same trees every year to guess how bad a season it will be.|El Amazonas y sus afluentes han subido lo bastante en esta creciente como para dejar brevemente bajo el agua a puertos fluviales y muelles bajos, y los barcos amarran ahora donde queda tierra más alta en vez de en el embarcadero de siempre. La gente del lugar lee cada año la marca del agua en los mismos árboles para adivinar cómo será la temporada.|L'Amazone et ses affluents sont montés assez haut lors de cette crue pour submerger brièvement ports fluviaux et quais bas, et les bateaux s'amarrent désormais où il reste un peu de terrain surélevé plutôt qu'à l'embarcadère habituel. Les gens du coin lisent chaque année la marque de l'eau sur les mêmes arbres pour deviner à quel point la saison sera rude.|今年のクレシエンテ(増水期)は、アマゾン川とその支流を、川港や低い桟橋が一時的に水没するほど押し上げ、船はいつもの船着場ではなく、残った高台のどこかにもやわれている。地元の人々は毎年、同じ木々についた水位の跡を読んで、その年がどれほど厳しくなるかを見積もる。",
    ),
  },
  {
    id: "zonda",
    n: t("A zonda wind pours off the Andes|Un viento zonda baja de los Andes|Un vent zonda dévale les Andes|ソンダ風がアンデスから吹き下ろす"),
    t: t(
      "The zonda, a hot dry wind that pours down the eastern slope of the Andes after losing all its moisture on the Chilean side, can raise the temperature by 20 degrees in an hour and is blamed locally for everything from headaches to short tempers. Schools in some Argentine provinces close outright when the wind warning goes up.|El zonda, un viento caliente y seco que baja por la ladera este de los Andes tras perder toda su humedad del lado chileno, puede subir la temperatura 20 grados en una hora y localmente se le culpa de todo, desde dolores de cabeza hasta mal genio. En algunas provincias argentinas las escuelas cierran directamente cuando se emite la alerta.|Le zonda, un vent chaud et sec qui dévale le versant est des Andes après avoir perdu toute son humidité côté chilien, peut faire grimper la température de 20 degrés en une heure, et on lui impute localement tout, des maux de tête à la mauvaise humeur. Dans certaines provinces argentines, les écoles ferment carrément dès que l'alerte au vent est déclenchée.|チリ側で湿気をすべて失ったのち、アンデスの東斜面を吹き下ろす熱く乾いた風「ソンダ」は、1時間で気温を20度も上げることがあり、地元では頭痛から短気まで何かとこの風のせいにされる。アルゼンチンの一部の州では、この風の警報が出るとそのまま学校が休みになる。",
    ),
  },
  {
    id: "camanchaca",
    n: t("A camanchaca fog seals the coast road|Una niebla camanchaca sella la costanera|Un brouillard camanchaca scelle la route côtière|カマンチャカの霧が海岸道路を閉ざす"),
    t: t(
      "The camanchaca, a thick marine fog that rolls in off the cold Humboldt Current most mornings along the Atacama coast, cuts visibility on the coastal road to almost nothing until the sun burns it off by midday. Some towns net-catch drinking water straight out of it, but drivers just have to wait.|La camanchaca, una espesa niebla marina que llega casi cada mañana desde la fría corriente de Humboldt a lo largo de la costa de Atacama, reduce a casi nada la visibilidad en la carretera costera hasta que el sol la disipa hacia mediodía. Algunos pueblos atrapan agua potable directamente de ella con redes, pero los conductores solo pueden esperar.|La camanchaca, un épais brouillard marin qui déferle presque chaque matin depuis le froid courant de Humboldt le long de la côte d'Atacama, réduit à presque rien la visibilité sur la route côtière jusqu'à ce que le soleil le dissipe vers midi. Certaines villes y captent l'eau potable au filet, mais les conducteurs, eux, doivent simplement attendre.|冷たいフンボルト海流から立ち上るこの濃い海霧「カマンチャカ」は、アタカマの海岸沿いでほぼ毎朝発生し、日が高くなって焼き払うまで沿岸道路の視界をほとんど奪う。この霧から網で直接飲み水を得る町もあるが、運転手はただ待つしかない。",
    ),
  },
  {
    id: "aduana-sudamericana",
    n: t("A border form goes missing|Falta un formulario en la frontera|Un formulaire manque à la frontière|国境で書類が足りないと言われる"),
    t: t(
      "The customs officer at the crossing insists a form is missing, though the same form was never asked for on the last three trips through, and only after a long wait — and, more than a few travellers suspect, a little money passed under the counter somewhere else in the line — does the barrier finally lift.|El agente de aduana en el paso insiste en que falta un formulario, aunque nunca se pidió el mismo formulario en los últimos tres cruces, y solo después de una larga espera —y, sospechan más de un viajero, de algo de dinero que pasó por debajo del mostrador en algún otro punto de la fila— se levanta por fin la barrera.|Le douanier du poste-frontière insiste sur un formulaire manquant, alors que ce même formulaire n'avait jamais été demandé lors des trois derniers passages, et ce n'est qu'après une longue attente — et, soupçonnent plus d'un voyageur, un peu d'argent glissé sous le comptoir ailleurs dans la file — que la barrière finit par se lever.|検問所の税関職員は書類が足りないと言い張るが、直近三回の通過では一度も同じ書類を求められたことがない。長い待ち時間のすえ――そして少なくない旅人が疑うように、列のどこか別の場所で係員の手元にいくらか金が渡ったすえ――ようやく遮断機が上がる。",
    ),
  },
  {
    id: "bloqueo-sudamericano",
    n: t("A roadblock goes up overnight|Aparece un bloqueo durante la noche|Un barrage routier surgit dans la nuit|一夜にして道路が封鎖される"),
    t: t(
      "A roadblock went up overnight a few kilometres down the line, tyres burning and a hand-painted sign naming a grievance that has nothing to do with any passing traveller, and the only way through today is to wait it out or find a very long way around. This kind of blockade is common enough across the continent to have its own word in several countries: paro, bloqueo.|Un bloqueo apareció durante la noche a pocos kilómetros más adelante, con neumáticos ardiendo y un cartel pintado a mano que nombra un reclamo que nada tiene que ver con ningún viajero de paso, y hoy la única forma de seguir es esperar a que se levante o buscar un rodeo muy largo. Este tipo de corte es tan común en el continente que en varios países tiene su propia palabra: paro, bloqueo.|Un barrage a surgi pendant la nuit à quelques kilomètres plus loin, pneus en feu et pancarte peinte à la main dénonçant un grief qui n'a rien à voir avec les voyageurs de passage, et le seul moyen de passer aujourd'hui est d'attendre que ça se lève ou de faire un très long détour. Ce genre de blocage est assez courant sur le continent pour avoir son propre mot dans plusieurs pays : paro, bloqueo.|線路の先数キロで一夜のうちに道路封鎖ができていた。タイヤが燃やされ、通りすがりの旅人には何の関わりもない要求を手書きで記した看板が立つ。今日じゅうに通り抜けるには、収まるのを待つか、うんと長い迂回路を探すしかない。この種の封鎖は大陸のあちこちで珍しくなく、いくつもの国で「パロ」「ブロケオ」という固有の呼び名まで持っている。",
    ),
  },
  {
    id: "tunchesilba",
    n: t("Led astray by El Tunche's whistle|El silbido de El Tunche te hace perder el camino|Le sifflement d'El Tunche t'égare|エル・トゥンチェの口笛に化かされる"),
    t: t(
      "A whistle sounded from somewhere in the trees, closer each time and never quite from the direction it seemed to come from last, and by the time the path was lost for good it was too late to say which fork had been the wrong one. Amazonian tradition blames El Tunche for exactly this trick, and warns that answering the whistle only draws him closer.|Un silbido sonó desde algún punto entre los árboles, cada vez más cerca y sin venir nunca del todo de la dirección de la que pareció venir antes, y para cuando el camino se perdió del todo ya era tarde para decir cuál bifurcación había sido la equivocada. La tradición amazónica culpa de esta treta exacta a El Tunche, y advierte que responder al silbido solo lo acerca más.|Un sifflement a retenti quelque part parmi les arbres, toujours plus proche et ne venant jamais tout à fait de la direction d'où il semblait venir la dernière fois, et le temps que le chemin soit perdu pour de bon, il était trop tard pour dire quelle bifurcation avait été la mauvaise. La tradition amazonienne impute exactement ce tour à El Tunche, et prévient que lui répondre ne fait que l'attirer plus près.|木々のあいだのどこからか口笛が響き、鳴るたびに近づきながら、決して前と同じ方向からは聞こえてこなかった。道を完全に見失ったころには、どの分かれ道が間違いだったのかを言うにはもう遅かった。アマゾンの言い伝えはこの仕掛けをまさにエル・トゥンチェのしわざだとし、口笛に応えて答えるとかえって彼を近づけてしまうと警告する。",
    ),
  },
];

/**
 * 季節。月インデックス0=4月(他の盤面と共通の規約)。南半球の季節を軸に、
 * アンデス・アマゾン・太平洋岸・パンパ・パラグアイを月ごとに入れ替えている。
 */
export const SOUTHAMERICA_SEASONS = [
  {
    e: "🍇",
    n: t("The vendimia wraps up in Mendoza as autumn reaches the south|La vendimia termina en Mendoza cuando llega el otoño al sur|La vendange s'achève à Mendoza avec l'arrivée de l'automne austral|南半球に秋が来て、メンドーサのブドウの収穫が終わる"),
    t: t(
      "Mendoza's grape harvest, timed to finish before the first frost, wraps up just as the leaves start to turn across the Argentine pampas, and the region's biggest wine festival crowns a queen the same week the tourist buses start thinning out.|La vendimia de Mendoza, calculada para acabar antes de la primera helada, termina justo cuando las hojas empiezan a cambiar de color en la pampa argentina, y la mayor fiesta vinícola de la región corona a una reina la misma semana en que los autobuses turísticos empiezan a escasear.|Les vendanges de Mendoza, calculées pour s'achever avant la première gelée, se terminent juste quand les feuilles commencent à changer de couleur sur la pampa argentine, et la plus grande fête du vin de la région couronne une reine la même semaine où les cars de touristes commencent à se raréfier.|初霜の前に終わるよう見計らわれたメンドーサのブドウの収穫は、アルゼンチンのパンパで木々の葉が色づき始めるころに締めくくられる。この地方最大のワイン祭りが女王を戴くのは、観光バスの数が減り始めるのと同じ週である。",
    ),
    f: t(
      "Mendoza's winemakers brought Malbec cuttings from Bordeaux in the 1850s after a French agronomist was hired to modernise the province's wine industry, and the grape has since done better in Argentina's dry, high-altitude soil than it ever did back in France.|Los viticultores de Mendoza trajeron esquejes de malbec de Burdeos en la década de 1850, después de contratar a un agrónomo francés para modernizar la industria vitivinícola de la provincia, y la uva ha prosperado desde entonces en el suelo seco y de altura de Argentina más de lo que lo hizo en Francia.|Les viticulteurs de Mendoza rapportèrent des boutures de malbec de Bordeaux dans les années 1850, après avoir engagé un agronome français pour moderniser l'industrie viticole de la province, et le cépage a depuis mieux prospéré dans le sol sec et d'altitude argentin qu'il ne l'a jamais fait en France.|メンドーサのワイン生産者は1850年代、州のワイン産業を近代化するために雇われたフランス人農学者を通じて、ボルドーからマルベックの苗木を持ち込んだ。以来この品種は、本国フランスよりもアルゼンチンの乾いた高地の土でよく育っている。",
    ),
  },
  {
    e: "🏜️",
    n: t("The dry season settles over the Amazon and the high Andes|La estación seca se instala sobre la Amazonía y los Andes altos|La saison sèche s'installe sur l'Amazonie et les hautes Andes|アマゾンと高地アンデスに乾季が訪れる"),
    t: t(
      "River levels along the Amazon and its tributaries start dropping from their wet-season highs, exposing sandbanks that will keep growing through the rest of the year, while high above in the Andes the quinoa and potato harvest comes in before the coldest nights arrive.|El nivel de los ríos a lo largo del Amazonas y sus afluentes empieza a bajar desde sus máximos de temporada de lluvias, dejando al descubierto bancos de arena que seguirán creciendo el resto del año, mientras en lo alto de los Andes entra la cosecha de quinua y papa antes de que lleguen las noches más frías.|Le niveau des cours d'eau le long de l'Amazone et de ses affluents commence à baisser depuis ses hauteurs de saison des pluies, découvrant des bancs de sable qui continueront de grandir le reste de l'année, tandis que là-haut dans les Andes, la récolte de quinoa et de pommes de terre rentre avant l'arrivée des nuits les plus froides.|アマゾン川とその支流の水位は雨季の高さから下がり始め、残りの年を通じて成長を続ける砂州が現れる。一方はるか上のアンデスでは、最も寒い夜が来る前にキヌアとジャガイモの収穫が行われる。",
    ),
    f: t(
      "The potato was first domesticated in the Andes somewhere between 7,000 and 10,000 years ago, and Andean farmers still grow thousands of distinct varieties, far more than the handful found in most supermarkets worldwide.|La papa se domesticó por primera vez en los Andes hace entre 7.000 y 10.000 años, y los agricultores andinos aún cultivan miles de variedades distintas, muchas más que el puñado que se encuentra en la mayoría de los supermercados del mundo.|La pomme de terre fut domestiquée pour la première fois dans les Andes il y a entre 7 000 et 10 000 ans, et les agriculteurs andins cultivent encore des milliers de variétés distinctes, bien plus que la poignée que l'on trouve dans la plupart des supermarchés du monde.|ジャガイモは今からおよそ7,000年から1万年前にアンデスで初めて栽培化され、アンデスの農家はいまも何千という異なる品種を育てている。世界のほとんどのスーパーで並ぶわずかな種類よりはるかに多い。",
    ),
  },
  {
    e: "☀️",
    n: t("Inti Raymi marks the shortest day over Cusco|El Inti Raymi marca el día más corto sobre Cusco|L'Inti Raymi marque le jour le plus court au-dessus de Cusco|インティ・ライミがクスコに最も短い日を告げる"),
    t: t(
      "Cusco marks the winter solstice with Inti Raymi, a festival of Inca origin honouring the sun god, revived and re-staged since the 1940s after Spanish colonial authorities suppressed the original ceremony for centuries. Further south, the first snow of the season starts drawing skiers to resorts above Santiago and Mendoza.|Cusco marca el solsticio de invierno con el Inti Raymi, una fiesta de origen inca en honor al dios sol, revivida y reescenificada desde la década de 1940 después de que las autoridades coloniales españolas suprimieran la ceremonia original durante siglos. Más al sur, la primera nieve de la temporada empieza a atraer esquiadores a los centros sobre Santiago y Mendoza.|Cusco marque le solstice d'hiver avec l'Inti Raymi, une fête d'origine inca honorant le dieu soleil, ranimée et rejouée depuis les années 1940 après que les autorités coloniales espagnoles eurent supprimé la cérémonie originale pendant des siècles. Plus au sud, les premières neiges de la saison commencent à attirer les skieurs vers les stations au-dessus de Santiago et Mendoza.|クスコは太陽神をたたえるインカ起源の祭り、インティ・ライミで冬至を祝う。スペイン植民地当局が何世紀も元の儀式を禁じたのち、1940年代から復活し演じ直されてきた。さらに南では、その年最初の雪がサンティアゴやメンドーサ上方のスキー場へ客を呼び始める。",
    ),
    f: t(
      "The 1944 revival of Inti Raymi was staged in Spanish and Quechua mainly for a local audience rediscovering a suppressed tradition, and only decades later did it grow into the multi-day spectacle now watched by visitors from around the world.|La reactivación del Inti Raymi en 1944 se representó en español y quechua sobre todo para un público local que redescubría una tradición suprimida, y solo décadas después se convirtió en el espectáculo de varios días que hoy ven visitantes de todo el mundo.|La renaissance de l'Inti Raymi en 1944 fut jouée en espagnol et en quechua, surtout pour un public local redécouvrant une tradition supprimée, et ce n'est que des décennies plus tard qu'elle devint le spectacle de plusieurs jours désormais suivi par des visiteurs du monde entier.|1944年に復活したインティ・ライミは、抑圧されてきた伝統を再発見する地元の観客のために、主にスペイン語とケチュア語で演じられた。それが何日もかけた見世物として世界中からの旅行者を集めるようになったのは、何十年もあとのことである。",
    ),
  },
  {
    e: "🥶",
    n: t("A friaje cold snap reaches down into the Amazon lowlands|Una ola de frío, el friaje, baja hasta las tierras bajas amazónicas|Un coup de froid, le friaje, descend jusque dans les basses terres amazoniennes|フリアヘの寒波がアマゾンの低地にまで届く"),
    t: t(
      "A friaje, a cold air mass pushing up from Patagonia, can drop temperatures across the normally warm Amazon lowlands by 10 degrees or more in a single day, catching communities and livestock unused to real cold off guard. Up on the Altiplano, night temperatures already below freezing sink further still.|Un friaje, una masa de aire frío que sube desde la Patagonia, puede bajar las temperaturas en las tierras bajas amazónicas, normalmente cálidas, 10 grados o más en un solo día, y toma desprevenidas a comunidades y ganado no acostumbrados al frío real. En el Altiplano, las temperaturas nocturnas ya bajo cero descienden aún más.|Un friaje, une masse d'air froid remontant de Patagonie, peut faire chuter les températures des basses terres amazoniennes, normalement chaudes, de 10 degrés ou plus en une seule journée, prenant au dépourvu des communautés et du bétail peu habitués au froid réel. Sur l'Altiplano, des températures nocturnes déjà sous zéro plongent encore davantage.|パタゴニアから押し上がってくる寒気「フリアヘ」は、通常温暖なアマゾンの低地の気温を一日で10度以上も下げることがあり、本物の寒さに慣れていない集落や家畜の不意を突く。アルティプラーノでは、すでに氷点下の夜間気温がさらに下がる。",
    ),
    f: t(
      "A friaje is triggered by a mass of cold Antarctic air pushing unusually far north across the continent, and the same pattern occasionally dusts the edge of the Amazon with the only frost some rainforest plants will ever experience.|Un friaje se desencadena por una masa de aire frío antártico que empuja de forma inusual hacia el norte del continente, y el mismo patrón a veces espolvorea el borde de la Amazonía con la única helada que algunas plantas de la selva llegan a conocer.|Un friaje est déclenché par une masse d'air froid antarctique qui remonte anormalement loin vers le nord du continent, et ce même phénomène saupoudre parfois la lisière de l'Amazonie de la seule gelée que certaines plantes de la forêt tropicale connaîtront jamais.|フリアヘは、南極からの冷たい空気の塊が異例なほど大陸の北へ押し上がることで起こる。同じ気象がときにアマゾンの縁にまで及び、熱帯雨林の植物の中には、これが生涯で経験する唯一の霜になるものもある。",
    ),
  },
  {
    e: "🌾",
    n: t("Offerings are buried for Pachamama across the Andes|Se entierran ofrendas para la Pachamama en los Andes|Des offrandes sont enterrées pour la Pachamama dans les Andes|アンデス各地でパチャママへの供物が埋められる"),
    t: t(
      "Across the Andes, August is kept as Pachamama's month, when families bury food, drink and coca leaves in the earth to thank the earth mother before the new planting season, a practice that predates the Spanish conquest and has simply absorbed nearby Catholic saints' days rather than being replaced by them.|En los Andes, agosto se guarda como el mes de la Pachamama, cuando las familias entierran comida, bebida y hojas de coca en la tierra para agradecer a la madre tierra antes de la nueva siembra, una práctica anterior a la conquista española que simplemente ha absorbido las fiestas católicas cercanas en vez de ser sustituida por ellas.|Dans les Andes, août est gardé comme le mois de la Pachamama, quand les familles enterrent nourriture, boisson et feuilles de coca pour remercier la terre mère avant la nouvelle saison des semis, une pratique antérieure à la conquête espagnole qui a simplement absorbé les fêtes catholiques voisines plutôt que d'en être remplacée.|アンデス各地で8月はパチャママ(大地母神)の月とされ、新しい種まきの季節を前に、家々は食べ物と飲み物、コカの葉を土に埋めて大地の母に感謝する。これはスペイン征服より古い慣習で、近くのカトリックの聖人の日に取って代わられるのではなく、それを取り込む形でいまも続いている。",
    ),
    f: t(
      "The offerings, called challas, typically include coca leaves, llama fat, sweets and alcohol, and are burned or buried in a small ritual usually led by a yatiri, an Aymara ritual specialist consulted for everything from harvests to house-building.|Las ofrendas, llamadas challas, suelen incluir hojas de coca, grasa de llama, dulces y alcohol, y se queman o entierran en un pequeño ritual normalmente dirigido por un yatiri, un especialista ritual aimara consultado para todo, desde las cosechas hasta la construcción de casas.|Les offrandes, appelées challas, comprennent généralement des feuilles de coca, de la graisse de lama, des sucreries et de l'alcool, et sont brûlées ou enterrées lors d'un petit rituel généralement mené par un yatiri, un spécialiste rituel aymara consulté pour tout, des récoltes à la construction des maisons.|「チャリャ」と呼ばれるこの供物には、コカの葉やリャマの脂、菓子、酒が用いられることが多く、通常はアイマラの祭祀の専門家ヤティリが導く小さな儀式で焼かれるか埋められる。ヤティリは収穫から家の建築まで、あらゆることについて相談される存在である。",
    ),
  },
  {
    e: "💃",
    n: t("Chile's Dieciocho fills the streets with cueca and asado|El Dieciocho chileno llena las calles de cueca y asado|Le Dieciocho chilien remplit les rues de cueca et d'asado|チリの「十八日」が街を民族舞踊と炭火焼きで満たす"),
    t: t(
      "Chile's independence holiday, universally called simply el Dieciocho, empties offices for most of a week while fondas — temporary dance halls — spring up in parks for the national dance, the cueca, and asado smoke drifts over entire neighbourhoods from breakfast onward.|La fiesta de la independencia de Chile, llamada universalmente simplemente el Dieciocho, vacía las oficinas casi toda una semana mientras brotan fondas —salones de baile temporales— en los parques para la cueca, el baile nacional, y el humo del asado flota sobre barrios enteros desde el desayuno.|La fête de l'indépendance chilienne, appelée universellement simplement el Dieciocho, vide les bureaux presque toute une semaine tandis que des fondas — bals temporaires — surgissent dans les parcs pour la cueca, la danse nationale, et que la fumée de l'asado dérive sur des quartiers entiers dès le petit-déjeuner.|「十八日(ディエシオチョ)」とだけ呼ばれるチリの独立記念日は、ほぼ一週間オフィスを空にし、公園には国民的舞踊クエッカを踊る仮設の踊り場「フォンダ」が立ち並ぶ。朝食どきから炭火焼きアサードの煙が街区じゅうに漂う。",
    ),
    f: t(
      "The cueca, Chile's national dance, mimics a rooster courting a hen: two dancers circle each other waving handkerchiefs, taking quick steps that never quite let them touch, until the routine ends in a sudden, playful stamp of the foot.|La cueca, el baile nacional de Chile, imita el cortejo de un gallo a una gallina: dos bailarines se rodean agitando pañuelos, con pasos rápidos que nunca llegan a tocarse, hasta que el número termina con un pisotón repentino y juguetón.|La cueca, danse nationale du Chili, mime la parade d'un coq courtisant une poule : deux danseurs tournent l'un autour de l'autre en agitant des mouchoirs, avec des pas rapides qui ne les laissent jamais tout à fait se toucher, jusqu'à ce que le numéro s'achève par un coup de talon soudain et espiègle.|チリの国民的舞踊クエッカは、雄鶏が雌鶏に求愛する様子を模している。二人の踊り手はハンカチを振りながら互いの周りを回り、決して触れ合わない素早い足運びを続け、最後は不意の遊び心のある足踏みで締めくくる。",
    ),
  },
  {
    e: "🌼",
    n: t("A rare rain sets the Atacama blooming|Una lluvia rara hace florecer el Atacama|Une pluie rare fait fleurir l'Atacama|まれな雨がアタカマを花で覆う"),
    t: t(
      "In years with just enough rain, dormant seeds across the driest non-polar desert on Earth all germinate at once, and for a few weeks purple and yellow wildflowers cover ground that looked lifeless every other year of the decade. Nobody can predict a desierto florido far in advance, which is exactly what makes it news when it happens.|En los años con la lluvia justa, semillas dormidas en el desierto no polar más seco del planeta germinan todas a la vez, y durante unas semanas flores silvestres moradas y amarillas cubren un suelo que el resto de la década parecía sin vida. Nadie puede predecir un desierto florido con mucha antelación, y eso es justo lo que lo convierte en noticia.|Les années où la pluie tombe juste assez, des graines dormantes du désert non polaire le plus sec au monde germent toutes à la fois, et pendant quelques semaines des fleurs sauvages violettes et jaunes couvrent un sol qui paraissait sans vie le reste de la décennie. Personne ne peut prédire un desierto florido longtemps à l'avance, ce qui en fait justement un événement.|ちょうど十分な雨が降った年には、地球上でも屈指の乾燥した非極域の砂漠に眠っていた種がいっせいに芽吹き、数週間のあいだ、十年のうちのほかの年には命の気配もない大地が紫と黄色の野の花で覆われる。「花咲く砂漠」を先んじて予測できる者はおらず、だからこそそれが起きると話題になる。",
    ),
    f: t(
      "Botanists have catalogued around 200 plant species able to lie dormant as seed in the Atacama for years, sometimes over a decade, waiting for the one rainfall heavy enough to let a desierto florido happen at all.|Los botánicos han catalogado unas 200 especies vegetales capaces de permanecer latentes como semilla en el Atacama durante años, a veces más de una década, a la espera de la única lluvia lo bastante fuerte para que ocurra un desierto florido.|Les botanistes ont recensé environ 200 espèces végétales capables de rester en dormance sous forme de graine dans l'Atacama pendant des années, parfois plus d'une décennie, en attendant la seule pluie assez forte pour qu'un desierto florido se produise.|植物学者は、アタカマで種のまま何年も、時には十年以上も休眠できる植物をおよそ200種類も記録している。「花咲く砂漠」が起こるにはそれだけの雨が必要で、種はその一度の機会をひたすら待ち続ける。",
    ),
  },
  {
    e: "🕯️",
    n: t("Families climb to the cemeteries for the Day of the Dead|Las familias suben a los cementerios por el Día de los Muertos|Les familles montent aux cimetières pour le jour des Morts|死者の日、家族は墓地へ登っていく"),
    t: t(
      "On the first days of November, families across the Andes climb to hillside cemeteries carrying the favourite food and drink of relatives who have died, sharing a meal at the graveside rather than mourning alone, a custom that blends Catholic All Souls' Day with much older Andean beliefs about ancestors staying close by.|En los primeros días de noviembre, familias de toda la región andina suben a cementerios en las laderas llevando la comida y bebida favoritas de los parientes fallecidos, y comparten una comida junto a la tumba en vez de llorar a solas, una costumbre que mezcla el Día de Todos los Santos católico con creencias andinas mucho más antiguas sobre los antepasados que permanecen cerca.|Aux premiers jours de novembre, des familles de toute la région andine montent vers des cimetières à flanc de colline, portant la nourriture et la boisson préférées de parents défunts, et partagent un repas au bord de la tombe plutôt que de pleurer seules, une coutume qui mêle la Toussaint catholique à des croyances andines bien plus anciennes sur des ancêtres restés proches.|11月の初め、アンデス各地の家族は丘の中腹の墓地へ登り、亡くなった親族の好物の食べ物と飲み物を携えていく。独りで喪に服すのではなく、墓のそばで食事を分かち合う。これはカトリックの万霊節と、祖先はすぐそばにとどまっているというずっと古いアンデスの信仰が溶け合った習わしである。",
    ),
    f: t(
      "In some Andean towns, families also bake bread shaped like babies, horses or ladders, called t'anta wawas, believed to help a departed relative's spirit find its way back to the graveside gathering each year.|En algunos pueblos andinos, las familias también hornean panes con forma de bebés, caballos o escaleras, llamados t'anta wawas, que se cree ayudan al espíritu de un pariente fallecido a encontrar el camino de vuelta a la reunión junto a la tumba cada año.|Dans certains villages andins, les familles cuisent aussi des pains en forme de bébés, de chevaux ou d'échelles, appelés t'anta wawas, censés aider l'esprit d'un parent défunt à retrouver chaque année le chemin du rassemblement près de la tombe.|一部のアンデスの町では、家族は赤ん坊や馬、はしごの形をしたパン「タンタ・ワワ」も焼く。亡くなった親族の霊が毎年、墓のそばの集いへの道を見つける助けになると信じられている。",
    ),
  },
  {
    e: "🏖️",
    n: t("Christmas falls in midsummer on this side of the equator|La Navidad cae en pleno verano en este lado del ecuador|Noël tombe en plein été de ce côté de l'équateur|赤道のこちら側では、クリスマスは真夏に来る"),
    t: t(
      "South of the equator, Christmas lands in the middle of summer, and beaches from Rio de Janeiro to Montevideo fill with holiday crowds instead of snow, while further inland the first heavy rains of the wet season are already swelling the rivers that will keep rising into the new year.|Al sur del ecuador, la Navidad cae en pleno verano, y las playas desde Río de Janeiro hasta Montevideo se llenan de multitudes vacacionales en vez de nieve, mientras más al interior las primeras lluvias fuertes de la temporada ya hinchan los ríos que seguirán creciendo hasta el año nuevo.|Au sud de l'équateur, Noël tombe en plein été, et les plages de Rio de Janeiro à Montevideo se remplissent de foules de vacanciers plutôt que de neige, tandis que plus à l'intérieur des terres, les premières fortes pluies de la saison gonflent déjà les fleuves qui continueront de monter jusqu'à la nouvelle année.|赤道の南では、クリスマスは真夏の盛りに来る。リオデジャネイロからモンテビデオまでの浜辺は、雪の代わりに休暇の人出でいっぱいになる。一方、内陸ではすでに雨季の最初の大雨が降り始め、新年にかけて増水を続ける川を膨らませている。",
    ),
    f: t(
      "Fireworks over beaches and riverfronts across the continent have become as much a New Year's tradition as a Christmas one, since many families treat the two holidays, both falling in the middle of summer, as a single extended break.|Los fuegos artificiales sobre playas y riberas de todo el continente se han vuelto una tradición tanto de Año Nuevo como de Navidad, ya que muchas familias tratan ambas fiestas, las dos en pleno verano, como unas vacaciones prolongadas y únicas.|Les feux d'artifice sur les plages et les rives du continent sont devenus une tradition du Nouvel An autant que de Noël, de nombreuses familles traitant ces deux fêtes, toutes deux en plein été, comme une seule et longue pause.|大陸各地の浜辺や川岸で打ち上がる花火は、クリスマスと同じくらい新年の伝統にもなっている。どちらも真夏に重なるこの二つの祝日を、多くの家庭がひと続きの長い休みとして過ごすからである。",
    ),
  },
  {
    e: "🧊",
    n: t("Patagonia gets its short window of summer tourists|Patagonia tiene su breve ventana de turistas de verano|La Patagonie connaît sa courte fenêtre de touristes d'été|パタゴニアに短い夏の観光シーズンが訪れる"),
    t: t(
      "Ushuaia and Punta Arenas see most of their whole year's visitor traffic packed into these few weeks of reliable daylight and relatively mild weather, before the same ports empty out again for the long, dark stretch of the southern winter.|Ushuaia y Punta Arenas concentran la mayor parte del tráfico de visitantes de todo el año en estas pocas semanas de luz diurna fiable y clima relativamente templado, antes de que esos mismos puertos vuelvan a vaciarse para el largo y oscuro tramo del invierno austral.|Ushuaia et Punta Arenas concentrent l'essentiel de leur trafic de visiteurs de toute l'année sur ces quelques semaines de lumière du jour fiable et de temps relativement clément, avant que ces mêmes ports ne se vident à nouveau pour la longue et sombre période de l'hiver austral.|ウスアイアとプンタアレナスは、日照が安定し比較的穏やかなこの数週間に、一年の来訪者のほとんどを集める。同じ港は、その後また南半球の長く暗い冬に向けて空になっていく。",
    ),
    f: t(
      "Because Ushuaia and Punta Arenas sit so far south, midsummer daylight there can last past 10 at night, giving visitors far more hours to move between sights than the short, dark days of winter ever allow.|Como Ushuaia y Punta Arenas están tan al sur, la luz del pleno verano allí puede durar hasta pasadas las 10 de la noche, lo que da a los visitantes muchas más horas para moverse entre lugares de las que permiten los días cortos y oscuros del invierno.|Comme Ushuaia et Punta Arenas se trouvent si loin au sud, la lumière du plein été peut y durer jusqu'après 22 heures, laissant aux visiteurs bien plus d'heures pour se déplacer d'un site à l'autre que ne le permettent les jours courts et sombres de l'hiver.|ウスアイアやプンタアレナスはあまりに南にあるため、真夏の日の光は夜10時を過ぎても残ることがある。冬の短く暗い日にはとても許されないほど多くの時間を、旅行者は名所めぐりに使える。",
    ),
  },
  {
    e: "🎭",
    n: t("Carnival floats roll down Encarnación's costanera|Las carrozas de Carnaval desfilan por la costanera de Encarnación|Les chars de Carnaval défilent sur la costanera d'Encarnación|カーニバルの山車がエンカルナシオンの遊歩道を練り歩く"),
    t: t(
      "Encarnación's own Carnival, held on a purpose-built parade strip along its riverfront, has grown into one of the largest in the Southern Cone outside Brazil, timed like every other Carnival in the hemisphere to the same shifting date before Lent.|El Carnaval propio de Encarnación, celebrado en una franja de desfile construida para ello junto al río, se ha convertido en uno de los mayores del Cono Sur fuera de Brasil, con la misma fecha movible que todos los demás carnavales del hemisferio antes de la Cuaresma.|Le Carnaval propre d'Encarnación, tenu sur une bande de défilé aménagée le long du fleuve, est devenu l'un des plus grands du Cône Sud en dehors du Brésil, calé comme tout autre Carnaval de l'hémisphère sur cette même date mobile avant le Carême.|川辺に専用に建てられたパレード用の一帯で開かれるエンカルナシオン独自のカーニバルは、ブラジルを除く南米南部でも屈指の規模に育っている。四旬節前の移動祝日という点は、半球のほかのすべてのカーニバルと同じである。",
    ),
    f: t(
      "Carnival's date is set by Easter, itself tied to the first full moon after the Northern Hemisphere spring equinox, so the exact week it falls on shifts by nearly a month from one year to the next across every country that celebrates it.|La fecha del Carnaval la marca la Pascua, a su vez ligada a la primera luna llena tras el equinoccio de primavera del hemisferio norte, así que la semana exacta en que cae cambia casi un mes de un año a otro en todos los países que lo celebran.|La date du Carnaval est fixée par Pâques, elle-même liée à la première pleine lune après l'équinoxe de printemps de l'hémisphère Nord, si bien que la semaine exacte où il tombe varie de près d'un mois d'une année à l'autre dans tous les pays qui le célèbrent.|カーニバルの日取りは復活祭によって決まり、復活祭自体は北半球の春分後の最初の満月に結びついている。そのため祝う国のどこでも、実際の週は年によってほぼ一か月もずれる。",
    ),
  },
  {
    e: "🚚",
    n: t("The first Andean snow closes the high passes again|La primera nieve andina vuelve a cerrar los pasos altos|La première neige andine referme les cols d'altitude|アンデスの初雪がふたたび峠を閉ざす"),
    t: t(
      "As days shorten again south of the equator, the first snow dusts the highest Andean passes, and border crossings that trucks used freely all summer start needing chains or a wait for the next clear window, a yearly reminder of how much of this continent's geography still answers to the mountains rather than the calendar.|Cuando los días vuelven a acortarse al sur del ecuador, la primera nieve espolvorea los pasos andinos más altos, y los cruces fronterizos que los camiones usaron libremente todo el verano empiezan a necesitar cadenas o una espera hasta la próxima ventana despejada, un recordatorio anual de cuánto de la geografía de este continente sigue respondiendo a las montañas antes que al calendario.|Alors que les jours raccourcissent à nouveau au sud de l'équateur, la première neige saupoudre les cols andins les plus hauts, et les postes-frontières que les camions ont utilisés librement tout l'été commencent à exiger des chaînes ou une attente jusqu'à la prochaine fenêtre dégagée, un rappel annuel de la mesure dans laquelle la géographie de ce continent obéit encore aux montagnes plutôt qu'au calendrier.|赤道の南でふたたび日が短くなり始めると、アンデスの最も高い峠に初雪が薄く積もる。夏のあいだトラックが自由に使っていた国境の峠は、チェーンか、次の晴れ間を待つことが必要になり始める。この大陸の地理の多くが、いまも暦よりも山に従っていることを、毎年思い出させる。",
    ),
    f: t(
      "Some Andean border crossings sit above 4,000 metres, high enough that a closure for snow can strand trucks for days even after the road lower down the valley has been fully clear for hours.|Algunos pasos fronterizos andinos están por encima de los 4.000 metros, tan altos que un cierre por nieve puede dejar varados a los camiones durante días incluso cuando la carretera más abajo en el valle lleva horas totalmente despejada.|Certains postes-frontières andins se trouvent au-dessus de 4 000 mètres, assez haut pour qu'une fermeture liée à la neige puisse bloquer des camions pendant des jours, même quand la route plus bas dans la vallée est parfaitement dégagée depuis des heures.|アンデスの国境の峠には標高4,000メートルを超える場所もあり、谷の下のほうの道路は何時間も前から完全に通れる状態でも、雪による峠の封鎖だけでトラックが何日も足止めされることがある。",
    ),
  },
];
