/**
 * ヨーロッパの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 大陸の盤面なので、地方(reg)は実在の国境ではなく大まかな7区分
 * (北欧・ブリテン諸島・イベリア半島・西欧・中欧・バルカン半島・東欧)。
 * `cities.mjs` の各都市の `reg` と対応する。
 *
 * 厄災の神は**クランプス**にした。聖ニコラウスに連れ添ってアルプス一帯
 * (オーストリア・南ドイツ・スロベニア・クロアチア・ハンガリーなど、
 * この盤面の中欧・バルカンの都市が多く属する地域)を歩くとされる、
 * 鎖と樺の枝を持った角の生えた姿の精霊。**いたずら好きで度が過ぎるだけ**
 * という扱いは韓国のトッケビ・茨城のダイダラボウと同じ考え方。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const EUROPE_META = {
  id: "europe",
  name: t("Europe|Europa|Europe|ヨーロッパ"),
  blurb: t(
    "A continent stitched together by rail — where the gauge changes at some borders and the wheels barely notice at others|Un continente cosido por el ferrocarril, donde el ancho de vía cambia en algunas fronteras y las ruedas apenas lo notan en otras|Un continent cousu par le rail, où l'écartement change à certaines frontières et où les roues le remarquent à peine à d'autres|鉄道で縫い合わされた大陸。国境によっては軌間が変わり、また別の国境では車輪がそれにほとんど気づかない",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (他の国の盤面と同じ理由)。team-lead指示どおり100。
  cur: { pre: "€", post: "", mul: 100 },
  start: "paris",
  cpuNames: ["Ingrid", "Klara", "Dimitra", "Fionn"],
  // 信号の朱・線路の鋼灰・真鍮の金・空の青・紙の白。国旗の色ではなく、
  // 鉄道そのものを表す色でそろえた(大陸の盤面が特定の国旗に寄って
  // 見えないようにするため)。
  stripe: ["#e8443f", "#5c6a72", "#f4c430", "#5b8fe8", "#f6efe2"],
};

/** 大まかな7区分。実在の国境ではなく地理的なまとまり。 */
export const EUROPE_REGIONS = {
  nord: t("Nordic Europe|Europa nórdica|Europe nordique|北欧"),
  brit: t("The British Isles|Las islas Británicas|Les îles Britanniques|ブリテン諸島"),
  ibe: t("The Iberian Peninsula|La península ibérica|La péninsule Ibérique|イベリア半島"),
  west: t("Western Europe|Europa occidental|Europe de l'Ouest|西欧"),
  cent: t("Central Europe|Europa central|Europe centrale|中欧"),
  balk: t("The Balkans|Los Balcanes|Les Balkans|バルカン半島"),
  east: t("Eastern Europe|Europa oriental|Europe de l'Est|東欧"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種(対応表は
 * `src/infrastructure/content/item-effect-rules.ts`)。既存26盤面の鍵と
 * 衝突していないことを確認済み(REGISTER.md に記載)。
 */
export const EUROPE_ITEMS = {
  interrail: {
    e: "🎫",
    price: 240,
    kind: "move",
    n: t("An InterRail Pass|Un pase InterRail|Un pass InterRail|インターレイル・パス"),
    d: t(
      "Carried 8–12 squares, onto whichever train leaves next.|Te lleva de 8 a 12 casillas, al primer tren que salga.|Emporté de 8 à 12 cases, sur le premier train qui part.|8〜12マス運ばれる。次に出る列車に乗るだけ。",
    ),
    f: t(
      "A single pass first sold in 1972 let a whole generation of young Europeans board almost any train on the continent without booking ahead, turning a summer into one long improvisation. It still works that way: a pass buys the right to travel, not a seat, so a full carriage means standing in the corridor until someone gets off.|Un único pase, vendido por primera vez en 1972, permitió a toda una generación de jóvenes europeos subir a casi cualquier tren del continente sin reservar, convirtiendo un verano en una larga improvisación. Sigue funcionando así: el pase compra el derecho a viajar, no un asiento, así que un vagón lleno significa ir de pie en el pasillo hasta que alguien se baje.|Un pass unique, vendu pour la première fois en 1972, permit à toute une génération de jeunes Européens de monter dans presque n'importe quel train du continent sans réserver, transformant un été en une longue improvisation. Il fonctionne toujours ainsi : le pass achète le droit de voyager, pas une place assise, si bien qu'une voiture pleine veut dire rester debout dans le couloir jusqu'à ce que quelqu'un descende.|1972年に初めて発売されたこの一枚の切符は、ヨーロッパじゅうの若者たちに、事前予約無しで大陸のほぼどの列車にも乗れる自由を与え、ひと夏を長い即興の旅に変えた。いまも仕組みは変わらない。買えるのは乗る権利であって座席ではないので、満席の車両ではドアの前に立って誰かが降りるのを待つことになる。",
    ),
  },
  bradshaw: {
    e: "📖",
    price: 380,
    kind: "pre",
    n: t("Bradshaw's Continental Guide|La Guía Continental de Bradshaw|Le Guide continental de Bradshaw|ブラッドショーの大陸案内"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "First printed in 1847, Bradshaw's listed the departure time of nearly every train running on the continent in one pocket-sized volume, dense enough with tables that a novelist once joked it should be read as a cure for insomnia. A traveler who could actually parse it was rare enough to be worth boasting about.|Impresa por primera vez en 1847, la guía Bradshaw recogía la hora de salida de casi todos los trenes del continente en un volumen de bolsillo, tan cargado de tablas que un novelista bromeó diciendo que debía leerse como remedio para el insomnio. Saber interpretarla de verdad era raro y digno de presumir.|Imprimé pour la première fois en 1847, le guide Bradshaw recensait l'heure de départ de presque tous les trains du continent en un seul volume de poche, si dense en tableaux qu'un romancier plaisanta qu'il fallait le lire comme remède à l'insomnie. Savoir vraiment le déchiffrer était assez rare pour s'en vanter.|1847年に初めて印刷されたブラッドショーの案内書は、大陸のほぼすべての列車の発車時刻を一冊のポケット判にまとめており、表があまりに細かいため、ある小説家は「不眠の薬として読め」と皮肉った。それを本当に読み解ける旅人は、自慢できるほど珍しかった。",
    ),
  },
  eurocity: {
    e: "🚆",
    price: 360,
    kind: "pre",
    n: t("EuroCity Ticket|Billete EuroCity|Billet EuroCity|ユーロシティ切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Launched in 1987 to replace a patchwork of separate international expresses, EuroCity trains agreed to a single shared standard for speed, comfort and dining across borders, so a passenger could tell what to expect without knowing which country's railway was actually pulling the train. Dozens of routes still carry the name today, most of them crossing at least one border before their first stop.|Lanzado en 1987 para sustituir un mosaico de expresos internacionales independientes, los trenes EuroCity adoptaron un mismo estándar de velocidad, confort y restauración a través de las fronteras, así que un pasajero sabía qué esperar sin saber qué ferrocarril nacional tiraba realmente del tren. Docenas de rutas conservan hoy el nombre.|Lancés en 1987 pour remplacer une mosaïque d'express internationaux séparés, les trains EuroCity adoptèrent une norme commune de vitesse, de confort et de restauration à travers les frontières, si bien qu'un voyageur savait à quoi s'attendre sans savoir quel réseau national tirait réellement le train. Des dizaines de lignes portent encore ce nom aujourd'hui.|1987年、ばらばらだった国際急行の寄せ集めに代わって導入されたユーロシティは、速度・快適さ・食堂車の水準を国境を越えて一つの基準にそろえた。乗客はどの国の鉄道が実際に牽引しているかを知らなくても、何を期待できるか分かるようになった。いまも何十もの路線がこの名を名乗り、その多くは最初の停車駅より前に少なくとも一つの国境を越える。",
    ),
  },
  eurostar: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("Eurostar Ticket|Billete Eurostar|Billet Eurostar|ユーロスター切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The service has run beneath the Channel since 1994 at up to 300 kilometres an hour, fast enough that the crossing itself, 50 kilometres of tunnel, takes about twenty minutes — often less time than the queue for passport control on either end.|El servicio circula bajo el Canal desde 1994 a hasta 300 kilómetros por hora, lo bastante rápido para que el cruce en sí, 50 kilómetros de túnel, tome unos veinte minutos, a menudo menos que la cola del control de pasaportes en cualquiera de los extremos.|Le service circule sous la Manche depuis 1994 à jusqu'à 300 kilomètres à l'heure, assez vite pour que la traversée elle-même, 50 kilomètres de tunnel, prenne environ vingt minutes — souvent moins de temps que la file au contrôle des passeports à l'une ou l'autre extrémité.|この列車は1994年から時速最大300kmでドーバー海峡の下を走っており、トンネル区間50kmの通過自体はわずか20分ほど。しばしばどちらかの端でパスポート審査の列に並ぶ時間のほうが長い。",
    ),
  },
  rauhnachtskreide: {
    e: "🕯️",
    price: 320,
    kind: "passive",
    n: t("Rauhnacht Chalk|La tiza de las noches ásperas|La craie des nuits rudes|ラウナハトの白墨"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "In the twelve 'rough nights' between Christmas and Epiphany, Alpine households mark a cross in chalk above the door — the initials of the three magi worked into the same stroke — and burn incense through every room, on the belief that this is the one stretch of the year when the old spirits of the mountains walk closest to the houses.|En las doce 'noches ásperas' entre Navidad y Epifanía, las casas alpinas marcan una cruz de tiza sobre la puerta —las iniciales de los tres reyes magos trazadas en el mismo gesto— y queman incienso por cada habitación, en la creencia de que este es el único tramo del año en que los viejos espíritus de la montaña caminan más cerca de las casas.|Pendant les douze « nuits rudes » entre Noël et l'Épiphanie, les foyers alpins tracent une croix à la craie au-dessus de la porte — les initiales des trois rois mages inscrites dans le même geste — et font brûler de l'encens dans chaque pièce, croyance selon laquelle c'est la seule période de l'année où les vieux esprits de la montagne s'approchent le plus des maisons.|クリスマスから公現祭までの十二の「荒々しい夜」のあいだ、アルプスの家々は戸口の上に白墨で十字を描く。同じ一筆に三博士の頭文字を織り込んだものだ。どの部屋にも香を焚いてまわる。この期間だけ、山の古い霊たちが家にいちばん近づくと信じられているからである。",
    ),
  },
  schnapsflasche: {
    e: "🥃",
    price: 440,
    kind: "pre",
    n: t("A Bottle Left Out for Him|Una botella dejada para él|Une bouteille laissée pour lui|彼のために置かれた酒瓶"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Villages along the Krampuslauf route set out a glass of schnapps on the doorstep before the procession passes, less an offering than a bribe, in the hope that a spirit who stops to drink one house's share will have no chains left to rattle at the next.|Los pueblos por donde pasa el Krampuslauf dejan un vaso de aguardiente en el umbral antes de que pase la procesión, más un soborno que una ofrenda, con la esperanza de que un espíritu que se detiene a beber la ración de una casa no tenga ya cadenas que hacer sonar en la siguiente.|Sur le passage du Krampuslauf, les villages posent un verre de schnaps sur le seuil avant que la procession n'arrive, moins une offrande qu'un pot-de-vin, dans l'espoir qu'un esprit qui s'arrête boire la part d'une maison n'aura plus de chaînes à faire sonner devant la suivante.|クランプスラウフの通り道にある村では、行列が来る前に戸口にシュナップスの杯を一つ置いておく。供物というより賄賂に近い。一軒の分を飲んで足を止めた霊は、次の家では鎖を鳴らす元気が残っていないだろう、という望みである。",
    ),
  },
  phrasebook: {
    e: "📓",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値(他盤面のjokbo等と同じ考え方)。
    price: 130,
    kind: "passive",
    n: t("A Well-Thumbed Phrasebook|Un manual de frases muy usado|Un guide de conversation bien feuilleté|使い込まれた会話帳"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Crossing four borders in a single day of travel once meant four different languages before lunch, and a phrasebook thin enough for a coat pocket has saved more conversations than anyone using one would care to admit. The most worn pages are never the greetings, but the ones for asking where the platform is.|Cruzar cuatro fronteras en un solo día de viaje significaba antes cuatro idiomas distintos antes de comer, y un manual de frases lo bastante fino para el bolsillo de un abrigo ha salvado más conversaciones de las que nadie que lo use admitiría. Las páginas más gastadas nunca son los saludos, sino las de preguntar dónde está el andén.|Traverser quatre frontières en une seule journée de voyage signifiait autrefois quatre langues différentes avant le déjeuner, et un guide de conversation assez fin pour une poche de manteau a sauvé plus de conversations que quiconque l'utilisant ne voudrait l'admettre. Les pages les plus usées ne sont jamais les salutations, mais celles pour demander où se trouve le quai.|一日の旅で国境を四つ越えるということは、かつては昼食までに四つの言語を渡り歩くことを意味した。コートのポケットに入るほど薄い会話帳は、使った本人が認めたがらないほど多くの会話を救ってきた。いちばんすり切れているのは挨拶のページではなく、「ホームはどこですか」のページである。",
    ),
  },
  wechselstube: {
    e: "💱",
    price: 280,
    kind: "pre",
    n: t("A Lucky Exchange Rate|Un tipo de cambio con suerte|Un taux de change chanceux|運の良い両替レート"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-les et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Before the euro, a traveler crossing Europe by rail carried a wallet of half a dozen different currencies at once, and a bureau de change at a border station could quietly favour whichever coins it wanted to be rid of. Getting the better end of the deal was less about arithmetic than about knowing which window not to use.|Antes del euro, quien cruzaba Europa en tren llevaba una cartera con media docena de monedas distintas a la vez, y una casa de cambio en una estación fronteriza podía favorecer discretamente las que quisiera quitarse de encima. Salir ganando dependía menos de la aritmética que de saber qué ventanilla evitar.|Avant l'euro, qui traversait l'Europe en train transportait un portefeuille garni d'une demi-douzaine de devises à la fois, et un bureau de change en gare frontière pouvait discrètement favoriser celles dont il voulait se débarrasser. Sortir gagnant tenait moins au calcul qu'à savoir quel guichet éviter.|ユーロ以前、鉄道でヨーロッパを渡る旅人は、財布の中に一度に半ダースもの異なる通貨を抱えていた。国境駅の両替所は、手放したい硬貨をひそかに優遇することもあった。得をするかどうかは計算よりも、どの窓口を避けるべきかを知っているかどうかだった。",
    ),
  },
  laissezpasser: {
    e: "📜",
    price: 420,
    kind: "pre",
    n: t("A Laissez-Passer|Un salvoconducto|Un laissez-passer|通行許可証"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "A document that asks a border guard to let the bearer through without the usual questions, first used for diplomats and stateless travelers, and later prized by anyone who needed to cross a closed frontier faster than the checkpoint's queue would normally allow.|Un documento que pide al guardia fronterizo dejar pasar al portador sin las preguntas habituales, usado primero para diplomáticos y viajeros apátridas, y después codiciado por cualquiera que necesitara cruzar una frontera cerrada más deprisa de lo que la cola del control permitía.|Un document qui demande au garde-frontière de laisser passer son porteur sans les questions habituelles, utilisé d'abord pour les diplomates et les voyageurs apatrides, puis convoité par quiconque devait franchir une frontière fermée plus vite que la file du poste ne le permettait d'ordinaire.|国境警備員に対し、通常の尋問無しに持参人を通すよう求める文書。もとは外交官や無国籍の旅人のために使われたが、のちには、閉ざされた国境を検問の行列よりも速く越えたい者たちに重宝されるようになった。",
    ),
  },
};

/**
 * 厄災の神。クランプスにした(冒頭のコメント参照)。
 */
export const EUROPE_SPIRIT = {
  e: "🐐",
  n: t("Krampus|Krampus|Krampus|クランプス"),
  big: t(
    "Krampus's Midwinter Procession|La procesión de pleno invierno de Krampus|La procession de la mi-hiver de Krampus|クランプスの真冬の行列",
  ),
  ward: "rauhnachtskreide",
  arrive: t(
    "<b>🐐 A Krampus has taken an interest in you.</b> Every December the Alpine valleys send out young men in carved wooden masks and rattling chains to play him for one night, but the older story says a real one still walks between Saint Nicholas's visits, birch switch in hand, looking for someone careless enough to follow. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🐐 Un Krampus se ha fijado en ti.</b> Cada diciembre los valles alpinos envían a jóvenes con máscaras de madera tallada y cadenas ruidosas a representarlo por una noche, pero la historia más antigua dice que uno de verdad todavía camina entre las visitas de San Nicolás, vara de abedul en mano, buscando a alguien lo bastante descuidado para seguirlo. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🐐 Un Krampus s'est intéressé à toi.</b> Chaque décembre, les vallées alpines envoient des jeunes gens masqués de bois sculpté et chargés de chaînes bruyantes pour le jouer le temps d'une nuit, mais la vieille histoire dit qu'un vrai marche encore entre les visites de saint Nicolas, verge de bouleau à la main, cherchant quelqu'un d'assez imprudent pour le suivre. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🐐 クランプスに目を付けられた。</b> 毎年12月、アルプスの谷では若者たちが彫った木の仮面と音の鳴る鎖を身に着け、一晩だけ彼の役を演じる。だが古い言い伝えによれば、本物はいまも聖ニコラウスの訪れの合間を、樺の枝を手に、うっかりついてくる者を探して歩いているという。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🐐 <b>Krampus</b> loses interest and lopes after <b>{0}</b>, farthest from {1}.|🐐 <b>Krampus</b> pierde el interés y trota tras <b>{0}</b>, el más lejano de {1}.|🐐 <b>Krampus</b> se désintéresse et trotte vers <b>{0}</b>, le plus loin de {1}.|🐐 <b>クランプス</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ跳ねていった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with Krampus and never once made him laugh. He shakes his chains and calls the whole road out for his midwinter procession — <b>Krampus's Midwinter Procession</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto a Krampus sin haberlo hecho reír ni una vez. Él sacude sus cadenas y convoca a todo el camino a su procesión de pleno invierno: empieza <b>la procesión de pleno invierno de Krampus</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec Krampus sans jamais l'avoir fait rire. Il secoue ses chaînes et convie toute la route à sa procession de la mi-hiver : <b>la procession de la mi-hiver de Krampus</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもクランプスと歩いていながら、一度も彼を笑わせられなかった。彼は鎖を打ち鳴らし、道行く者すべてを真冬の行列に呼び出す。<b>クランプスの真冬の行列</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> in Alpine villages the young men who dress as Krampus for the Krampuslauf are said to become unrecognisable even to their own families once the mask is on, and by old custom nobody is allowed to name them aloud until the chains stop ringing.|<b>Tras la historia:</b> en los pueblos alpinos, los jóvenes que se visten de Krampus para el Krampuslauf se vuelven, dicen, irreconocibles incluso para su propia familia en cuanto se ponen la máscara, y por vieja costumbre nadie puede nombrarlos en voz alta hasta que las cadenas dejan de sonar.|<b>Derrière l'histoire :</b> dans les villages alpins, les jeunes gens qui se déguisent en Krampus pour le Krampuslauf deviendraient, dit-on, méconnaissables même pour leur propre famille une fois le masque enfilé, et la vieille coutume interdit de les nommer à voix haute tant que les chaînes résonnent.|<b>物語の背景:</b> アルプスの村では、クランプスラウフでクランプスに扮する若者は、仮面をつけた瞬間から自分の家族にさえ誰だか分からなくなるとされ、古い習わしでは鎖の音が鳴り止むまで、その名を声に出して呼んではいけないという。",
  ),
  pleased: t(
    "He swings his chain around to show off, and a coin slips loose from the tangle. <b>{0}</b> gains <span class='money'>+{1}</span>.|Blande su cadena para presumir y una moneda se le escapa del enredo. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il brandit sa chaîne pour frimer et une pièce s'échappe de l'enchevêtrement. <b>{0}</b> gagne <span class='money'>+{1}</span>.|得意げに鎖を振り回したはずみで、絡まりから銭が一枚こぼれ落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A cross is chalked over the door in white, marked out during the Rauhnächte the way it has been for generations. Krampus is said to respect the old mark above all else, and he backs off, stepping past <b>{0}</b> without noticing this turn.|Se traza una cruz de tiza blanca sobre la puerta, marcada durante las noches ásperas como se ha hecho por generaciones. Se dice que Krampus respeta esa vieja marca por encima de todo, y retrocede, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|Une croix est tracée à la craie blanche au-dessus de la porte, marquée durant les nuits rudes comme depuis des générations. Krampus, dit-on, respecte cette vieille marque par-dessus tout ; il recule et passe devant <b>{0}</b> sans le remarquer ce tour-ci.|戸口の上に白墨で十字が描かれる。ラウナハトのあいだ、何世代も前から続くやり方で記されたものだ。クランプスは何よりこの古い印を敬うとされ、ひるんで後ずさり、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。大陸の鉄道網ならではの障害を選んだ(一国の盤面には書けない話)。 */
export const EUROPE_DOOM = [
  {
    id: "lawine",
    n: t("An avalanche closes the pass|Un alud cierra el paso|Une avalanche ferme le col|雪崩が峠を塞ぐ"),
    t: t(
      "A slope that looked stable through the whole storm lets go the moment the sun comes back out, and the line through the pass stays buried under metres of snow and broken pine until a rotary plough can be brought up from the valley. Every train booked to cross today waits instead at the last station before the mountains, engines idling to keep the carriages warm.|Una ladera que parecía estable durante toda la tormenta se desprende justo cuando vuelve a salir el sol, y la línea que cruza el puerto queda sepultada bajo metros de nieve y pinos rotos hasta que se pueda subir una quitanieves rotativa desde el valle. Todo tren previsto para cruzar hoy espera en la última estación antes de las montañas, con los motores encendidos para mantener los vagones calientes.|Un versant qui semblait stable pendant toute la tempête se détache au moment même où le soleil revient, et la ligne qui traverse le col reste ensevelie sous des mètres de neige et de pins brisés jusqu'à ce qu'un chasse-neige rotatif puisse être monté depuis la vallée. Tout train prévu pour traverser aujourd'hui attend à la dernière gare avant les montagnes, moteurs au ralenti pour garder les voitures chauffées.|嵐のあいだじゅう持ちこたえていた斜面が、日が差した瞬間に崩れ落ち、峠を越える線路は谷から回転式除雪車が上がってくるまで、何mもの雪と折れた松の下に埋もれたままになる。今日この峠を越える予定だった列車はすべて、山の手前の最後の駅で足止めされ、車両を暖めたまま機関車をアイドリングさせて待つ。",
    ),
  },
  {
    id: "hitzewelle",
    n: t("A heatwave buckles the rails|Una ola de calor pandea los raíles|Une canicule fait gondoler les rails|熱波でレールが曲がる"),
    t: t(
      "Steel expands enough in a long heatwave that a stretch of track can bow sideways by several centimetres, and speed limits drop across whole regions rather than risk a derailment on a curve nobody trusted an hour ago. Engineers spray the worst-affected rails white through the following week, on the theory that a paler surface absorbs less heat next time.|El acero se dilata lo suficiente en una ola de calor prolongada como para que un tramo de vía se combe varios centímetros hacia un lado, y los límites de velocidad bajan en regiones enteras antes que arriesgarse a un descarrilamiento en una curva de la que nadie se fiaba una hora antes. Los ingenieros pintan de blanco los raíles más afectados durante la semana siguiente.|L'acier se dilate assez lors d'une longue canicule pour qu'un tronçon de voie se courbe de plusieurs centimètres sur le côté, et les limitations de vitesse chutent dans des régions entières plutôt que de risquer un déraillement sur une courbe à laquelle personne ne faisait confiance une heure plus tôt. Les ingénieurs peignent en blanc les rails les plus touchés la semaine suivante.|長い熱波で鋼のレールは何cmも横に膨らんで曲がることがあり、一時間前まで信用されていたカーブでの脱線を避けるため、地域まるごと速度制限がかかる。技術者は翌週にかけて、被害の大きいレールを白く塗る。淡い色のほうが次の熱を吸いにくいという理屈である。",
    ),
    months: [7, 8],
  },
  {
    id: "greve-continentale",
    n: t("A transport strike is called|Se convoca una huelga de transportes|Une grève des transports est déclarée|交通ストライキが呼びかけられる"),
    t: t(
      "The union gives the legally required notice, and for one day the departure boards fill with cancellations instead of platform numbers, while a skeleton timetable runs just often enough to keep the story from becoming an emergency. Commuters who lived through the last one already know which replacement bus leaves from which side street.|El sindicato da el preaviso legal, y durante un día los paneles de salidas se llenan de cancelaciones en vez de números de andén, mientras un horario mínimo circula lo justo para que la cosa no se convierta en emergencia. Los que ya vivieron la última huelga saben de qué calle lateral sale el autobús sustitutivo.|Le syndicat donne le préavis légal, et pour une journée les panneaux de départ se remplissent d'annulations plutôt que de numéros de quai, tandis qu'un service minimum circule juste assez pour que l'affaire ne devienne pas une urgence. Les habitués de la dernière grève savent déjà de quelle rue adjacente part le bus de remplacement.|組合が法定の予告を出し、一日じゅう発車案内板はホーム番号の代わりに運休の表示で埋まる。それでも最低限の便は、事態が非常事態と呼ばれない程度には走り続ける。前回のストを経験した通勤客は、代行バスがどの裏通りから出るかをもう知っている。",
    ),
  },
  {
    id: "nebel",
    n: t("Fog closes the crossing|La niebla cierra el cruce|Le brouillard ferme la traversée|霧で航路が閉じる"),
    t: t(
      "A bank of fog rolls in off the water thick enough to swallow a ship's own bow lights, and the harbourmaster holds every departure at the quay until visibility clears rather than trust the radar alone in a shipping lane this crowded. Passengers already checked in wait it out in the terminal café, watching the same grey nothing through the window for hours.|Un banco de niebla llega desde el mar tan espeso que engulle las propias luces de proa del barco, y el capitán de puerto retiene todas las salidas en el muelle hasta que mejore la visibilidad, antes que fiarse solo del radar en un canal tan concurrido. Los pasajeros ya facturados esperan en la cafetería de la terminal, mirando la misma nada gris por la ventana durante horas.|Un banc de brouillard monte de l'eau, assez épais pour avaler les propres feux de proue du navire, et le capitaine du port retient tous les départs au quai jusqu'à ce que la visibilité s'améliore, plutôt que de se fier au seul radar dans un chenal aussi fréquenté. Les passagers déjà enregistrés attendent au café du terminal, regardant le même néant gris par la fenêtre pendant des heures.|海から立ちこめた霧は船首の灯りさえ呑み込むほど濃く、これほど船の行き交う水路ではレーダーだけを頼りにできないと、港長はすべての出航を視界が晴れるまで岸壁で止める。すでに搭乗手続きを終えた乗客はターミナルの喫茶室で何時間も、窓の外の同じ灰色の何もない景色を眺めて待つ。",
    ),
    months: [11, 12],
  },
  {
    id: "herbstlaub",
    n: t("Leaves on the line slow the trains|Las hojas en la vía frenan los trenes|Des feuilles sur la voie ralentissent les trains|落ち葉で列車が遅れる"),
    t: t(
      "Millions of fallen leaves get crushed by passing wheels into a slick, black paste that coats the rail and cuts a train's grip on the steel by more than half, so drivers brake earlier and accelerate more cautiously all along the line. The excuse sounds too small to be real, which is exactly why passengers refuse to believe it every single autumn.|Millones de hojas caídas quedan aplastadas por el paso de las ruedas en una pasta negra y resbaladiza que cubre el raíl y reduce el agarre del tren al acero en más de la mitad, así que los maquinistas frenan antes y aceleran con más cautela en toda la línea. La excusa suena demasiado pequeña para ser real, y por eso mismo los pasajeros se niegan a creerla cada otoño.|Des millions de feuilles tombées sont écrasées par le passage des roues en une pâte noire et glissante qui enrobe le rail et réduit de plus de moitié l'adhérence du train sur l'acier, si bien que les conducteurs freinent plus tôt et accélèrent plus prudemment sur toute la ligne. L'excuse paraît trop dérisoire pour être vraie, et c'est justement pour cela que les voyageurs refusent d'y croire chaque automne.|何百万もの落ち葉が通過する車輪に押しつぶされて黒く滑るペースト状になり、レールを覆って車輪の食いつきを半分以下にする。だから運転士は路線じゅうで早めに減速し、慎重に加速する。この言い訳はあまりに些細に聞こえるせいで、乗客は毎年秋になるたび、それを信じようとしない。",
    ),
    months: [10, 11],
  },
  {
    id: "waldbrand",
    n: t("A wildfire reaches the tracks|Un incendio forestal llega a las vías|Un incendie de forêt atteint les voies|山火事が線路まで達する"),
    t: t(
      "A dry wind off the hills carries embers across a firebreak that had held for twenty years, and the overhead power line is switched off along the whole section as a precaution before the flames get anywhere near it. Passengers are walked back along the ballast to the last safe station, the smoke thick enough to taste.|Un viento seco de las colinas lleva ascuas más allá de un cortafuegos que había aguantado veinte años, y la catenaria se apaga en toda la sección como precaución antes de que las llamas se acerquen. Los pasajeros son conducidos a pie por el balasto hasta la última estación segura, con un humo tan espeso que se puede saborear.|Un vent sec venu des collines porte des braises par-delà un pare-feu qui tenait depuis vingt ans, et la caténaire est coupée sur toute la section par précaution avant que les flammes n'en approchent. Les passagers sont ramenés à pied le long du ballast jusqu'à la dernière gare sûre, dans une fumée assez épaisse pour se goûter.|丘から吹く乾いた風が、二十年もつと思われていた防火帯を越えて火の粉を運び、炎が近づく前に念のため、その区間全体の架線が止められる。乗客は砕石の上を歩いて最後の安全な駅まで戻される。煙は味を感じるほど濃い。",
    ),
    months: [7, 8],
  },
  {
    id: "grenzstau",
    n: t("A border checkpoint backs up|Se atasca un control fronterizo|Un poste-frontière est engorgé|国境検問が詰まる"),
    t: t(
      "A new spot check on paperwork turns a routine stop into an hour-long queue of idling carriages, and the platform fills with passengers comparing which document each guard is asking for this time. Nobody on board can quite agree whether the delay is about security, customs, or simply one official having a slow morning.|Un control sorpresa de documentación convierte una parada rutinaria en una cola de una hora de vagones parados, y el andén se llena de pasajeros comparando qué documento pide cada guardia esta vez. Nadie a bordo se pone de acuerdo sobre si el retraso es por seguridad, por aduana, o simplemente porque a un funcionario se le hace larga la mañana.|Un contrôle surprise des papiers transforme un arrêt de routine en une file d'une heure de voitures à l'arrêt, et le quai se remplit de passagers comparant quel document chaque garde réclame cette fois. Personne à bord ne s'accorde vraiment sur la question de savoir si le retard tient à la sécurité, à la douane, ou simplement à la matinée d'un fonctionnaire qui traîne.|書類の抜き打ち検査が、いつもは形だけの停車を、車両が並んでアイドリングしたまま1時間待つ行列に変える。ホームは、今回はどの係官がどの書類を求めているかを比べ合う乗客でいっぱいになる。車内の誰も、この遅れが治安のためか、税関のためか、それとも係官の朝がただ長引いているだけなのか、意見が一致しない。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。大陸の盤面なので、国単位の好不況ではなく
 * 大陸ぜんぶの鉄道網に起きることを選んだ。
 */
export const EUROPE_SEASONS = [
  {
    e: "🏔️",
    n: t("The high passes reopen|Los puertos de montaña reabren|Les cols de montagne rouvrent|高い峠が春に開く"),
    t: t(
      "Snow ploughs work through the last drifts on the Alpine lines closed all winter, and the first trains back over routes like the Bernina reopen to views that were buried under white a month earlier. Farther north, the ice on the Baltic breaks up unevenly, port by port, so a ferry timetable that held all winter starts shifting a day at a time.|Las quitanieves trabajan en los últimos ventisqueros de las líneas alpinas cerradas todo el invierno, y los primeros trenes que vuelven a rutas como la de Bernina reabren a vistas que un mes antes estaban sepultadas bajo la nieve. Más al norte, el hielo del Báltico se rompe de forma desigual, puerto a puerto, así que un horario de ferris que aguantó todo el invierno empieza a moverse un día cada vez.|Les chasse-neige achèvent les dernières congères sur les lignes alpines fermées tout l'hiver, et les premiers trains de retour sur des lignes comme celle de la Bernina rouvrent sur des vues encore ensevelies sous le blanc un mois plus tôt. Plus au nord, la glace de la Baltique se rompt de façon inégale, port par port, si bien qu'un horaire de ferry tenu tout l'hiver se met à glisser d'un jour à la fois.|冬じゅう閉ざされていたアルプスの路線では除雪車が最後の吹きだまりを片づけ、ベルニナ線のような路線に戻る最初の列車は、一ヶ月前まで白一色に埋もれていた景色に再び出会う。北ではバルト海の氷が港ごとにばらばらに割れ始め、冬のあいだ守られてきたフェリーの時刻表が一日また一日とずれていく。",
    ),
    f: t(
      "The Bernina line crosses the Alps without a single tunnel at its summit, climbing instead on open spirals and viaducts to 2,253 metres, the highest point any train reaches in Europe on ordinary adhesion track.|La línea de Bernina cruza los Alpes sin un solo túnel en su punto más alto, subiendo en cambio por espirales y viaductos al aire libre hasta 2.253 metros, el punto más alto al que llega cualquier tren de Europa sobre vía de adherencia ordinaria.|La ligne de la Bernina traverse les Alpes sans un seul tunnel à son sommet, grimpant plutôt par des spirales et des viaducs à l'air libre jusqu'à 2 253 mètres, le point le plus haut atteint par un train en Europe sur voie à adhérence ordinaire.|ベルニナ線は頂上に一本もトンネルを持たずアルプスを越え、代わりに露天のらせんと高架橋で標高2253mまで登る。ヨーロッパの列車が普通の粘着式線路で到達する最高地点である。",
    ),
  },
  {
    e: "🌷",
    n: t("Trains run past the bulb fields|Los trenes pasan junto a los campos de bulbos|Les trains longent les champs de bulbes|球根畑の脇を列車が走る"),
    t: t(
      "Rail lines through the Netherlands run for whole minutes alongside fields striped red, yellow and white with tulips grown for the bulb, not the flower, so growers slice the heads off the moment the colour has been photographed enough. From the window it looks like the fields were painted overnight.|Las líneas ferroviarias que cruzan los Países Bajos discurren minutos enteros junto a campos rayados de rojo, amarillo y blanco con tulipanes cultivados por el bulbo, no por la flor, así que los productores cortan las cabezas en cuanto el color se ha fotografiado lo suficiente. Desde la ventanilla parece que los campos se pintaron durante la noche.|Les lignes ferroviaires qui traversent les Pays-Bas longent pendant plusieurs minutes des champs rayés de rouge, de jaune et de blanc de tulipes cultivées pour le bulbe, non pour la fleur, si bien que les producteurs coupent les têtes dès que la couleur a été suffisamment photographiée. Vue de la fenêtre, on dirait que les champs ont été peints pendant la nuit.|オランダを通る鉄道路線は、球根――花ではなく――のために育てられた赤・黄・白のチューリップが縞模様に広がる畑の脇を何分も走る。栽培者は色が十分に写真に撮られたと見るや、すぐに花の頭を切り落とす。車窓からは、畑が一晩で塗り替えられたように見える。",
    ),
    f: t(
      "Most of a tulip field's flowers are never meant to be sold at all: the plant is decapitated on purpose so that all its energy goes back down into the bulb, which is the part that actually gets exported.|La mayoría de las flores de un campo de tulipanes no están destinadas a venderse: la planta se decapita a propósito para que toda su energía vuelva al bulbo, que es la parte que realmente se exporta.|La plupart des fleurs d'un champ de tulipes ne sont jamais destinées à la vente : la plante est décapitée exprès pour que toute son énergie redescende dans le bulbe, seule partie réellement exportée.|チューリップ畑の花のほとんどは、そもそも売るためのものではない。株はわざと頭を落とされ、そのエネルギーをすべて球根へ戻す。実際に輸出されるのはその球根のほうである。",
    ),
  },
  {
    e: "☀️",
    n: t("The white nights begin in the north|Empiezan las noches blancas en el norte|Les nuits blanches commencent au nord|北で白夜が始まる"),
    t: t(
      "Above the Arctic Circle the sun stops setting at all, and the midnight trains up to Narvik and Kiruna run their whole timetable in daylight now, conductors keeping time by the clock rather than the sky. Farther south, Midsummer bonfires are lit the same week from Sweden down through the Baltic states.|Por encima del Círculo Polar Ártico el sol deja de ponerse del todo, y los trenes de medianoche hasta Narvik y Kiruna cumplen ahora todo su horario en pleno día, con los revisores llevando la hora por el reloj y no por el cielo. Más al sur, las hogueras de San Juan se encienden esa misma semana desde Suecia hasta los países bálticos.|Au-dessus du cercle polaire arctique, le soleil ne se couche plus du tout, et les trains de minuit vers Narvik et Kiruna assurent désormais tout leur horaire en pleine lumière, les contrôleurs se repérant à l'horloge plutôt qu'au ciel. Plus au sud, les feux de la Saint-Jean s'allument la même semaine, de la Suède jusqu'aux pays baltes.|北極圏より北では太陽がまったく沈まなくなり、ナルヴィクやキルナへ向かう深夜列車も、いまや全行程を明るいままの空の下で走る。車掌は空ではなく時計だけを頼りに時刻を守る。もっと南では、スウェーデンからバルト三国まで、同じ週に夏至の焚き火が灯される。",
    ),
    f: t(
      "Kiruna's mine sits far enough north that the midnight sun is visible for about a month straight, one more reason the relocated town keeps its clocks running on the same schedule regardless of what the sky is doing.|La mina de Kiruna está tan al norte que el sol de medianoche se ve durante casi un mes seguido, una razón más para que el pueblo trasladado siga sus relojes con el mismo horario pase lo que pase en el cielo.|La mine de Kiruna se trouve assez au nord pour que le soleil de minuit soit visible près d'un mois d'affilée, une raison de plus pour que la ville déplacée fasse tourner ses horloges sur le même rythme, quoi qu'il en soit du ciel.|キルナの鉱山はこれほど北にあるため、白夜はほぼひと月続けて見られる。移設された町がどんな空模様でも同じ時刻表どおりに時計を進め続ける、もう一つの理由である。",
    ),
  },
  {
    e: "🎒",
    n: t("The InterRail season opens|Empieza la temporada InterRail|La saison InterRail s'ouvre|インターレイルの季節が始まる",
    ),
    t: t(
      "University terms end across the continent within a few weeks of each other, and the platforms fill with backpacks as a whole generation sets off with a pass that buys the right to travel rather than a booked seat. Station benches become improvised beds for anyone whose connecting train leaves before dawn.|Los cursos universitarios terminan por todo el continente con pocas semanas de diferencia entre sí, y los andenes se llenan de mochilas cuando toda una generación se lanza a viajar con un pase que compra el derecho a viajar, no un asiento reservado. Los bancos de las estaciones se convierten en camas improvisadas para quien tenga el enlace antes del amanecer.|Les trimestres universitaires se terminent à travers le continent à quelques semaines d'intervalle, et les quais se remplissent de sacs à dos tandis que toute une génération se lance avec un pass qui achète le droit de voyager plutôt qu'une place réservée. Les bancs de gare deviennent des lits improvisés pour qui a une correspondance avant l'aube.|大学の学期が大陸じゅうで数週間の差を置きながら終わり、乗る権利だけを買って座席は予約しないという一枚の切符を手に、ひと世代まるごとがホームをリュックで埋め尽くす。夜明け前に乗り継ぎがある者にとって、駅のベンチは即席の寝床になる。",
    ),
    f: t(
      "The pass was created in 1972 partly to mark the 50th anniversary of the International Union of Railways, and it was originally sold only to travelers under 21 — the age limit was lifted only decades later.|El pase se creó en 1972, en parte para celebrar el 50 aniversario de la Unión Internacional de Ferrocarriles, y al principio solo se vendía a viajeros menores de 21 años; el límite de edad no se eliminó hasta décadas después.|Le pass fut créé en 1972, en partie pour marquer le 50e anniversaire de l'Union internationale des chemins de fer, et il ne fut d'abord vendu qu'aux voyageurs de moins de 21 ans — la limite d'âge ne fut levée que des décennies plus tard.|この切符は1972年、国際鉄道連合の創立50周年を記念する意味もあって作られた。当初は21歳未満にしか売られておらず、年齢制限が外れたのは何十年も後のことである。",
    ),
  },
  {
    e: "🏖️",
    n: t("Whole countries shut down for August|Países enteros cierran en agosto|Des pays entiers ferment en août|8月に国じゅうが休業する"),
    t: t(
      "Southern Europe empties its cities into its coastal trains around the fifteenth of the month, shutters coming down on shops that will not reopen until September, while the same week's departure boards read like a single long queue for the sea. Northbound trains run half-empty in the opposite direction.|El sur de Europa vacía sus ciudades hacia los trenes de la costa en torno al día quince del mes, con persianas que no volverán a subir hasta septiembre, mientras los paneles de salida de esa misma semana parecen una única cola larga hacia el mar. Los trenes que van hacia el norte circulan medio vacíos en sentido contrario.|L'Europe du Sud vide ses villes vers les trains côtiers autour du quinze du mois, rideaux baissés sur des boutiques qui ne rouvriront qu'en septembre, tandis que les tableaux de départ de cette même semaine ressemblent à une seule longue file vers la mer. Les trains vers le nord roulent à moitié vides en sens inverse.|南ヨーロッパは月半ば頃、都市の中身をそっくり海辺行きの列車へ移す。店のシャッターは9月まで開かず、その週の発車案内板はまるで海へ向かう一本の長い行列のように見える。逆方向の北行きの列車はがらがらのまま走る。",
    ),
    f: t(
      "In Italy the custom has a name, Ferragosto, that traces back to a holiday declared by the emperor Augustus, though the modern habit of an entire nation travelling in the same fortnight is a much newer, industrial-age invention.|En Italia la costumbre tiene nombre, Ferragosto, que se remonta a una festividad declarada por el emperador Augusto, aunque el hábito moderno de que toda una nación viaje en la misma quincena es una invención mucho más reciente, de la era industrial.|En Italie, la coutume porte un nom, Ferragosto, qui remonte à une fête déclarée par l'empereur Auguste, bien que l'habitude moderne de voir toute une nation voyager la même quinzaine soit une invention bien plus récente, de l'ère industrielle.|イタリアではこの習わしに「フェラゴスト」という名がある。皇帝アウグストゥスが定めた祝日に由来するが、国じゅうが同じ二週間に旅をする現代の習慣そのものは、産業化以降のずっと新しい発明である。",
    ),
  },
  {
    e: "🍇",
    n: t("The grape harvest moves up the valleys|La vendimia sube por los valles|Les vendanges remontent les vallées|ぶどうの収穫が谷を遡る"),
    t: t(
      "Picking starts in the warmest southern vineyards and climbs north over about six weeks, and short branch lines that carry little else all year run extra wagons loaded with grapes instead of passengers. Wine trains still make the run along the Rhine and Douro valleys, timed for visitors rather than the harvest itself.|La vendimia empieza en los viñedos más cálidos del sur y sube hacia el norte a lo largo de unas seis semanas, y pequeños ramales que apenas llevan otra cosa el resto del año circulan con vagones extra cargados de uva en vez de pasajeros. Los trenes del vino todavía recorren los valles del Rin y del Duero, programados para visitantes más que para la vendimia misma.|Les vendanges commencent dans les vignobles méridionaux les plus chauds et remontent vers le nord sur environ six semaines, et de courtes lignes secondaires qui ne transportent guère autre chose le reste de l'année font rouler des wagons supplémentaires chargés de raisin plutôt que de voyageurs. Des trains du vin circulent encore le long du Rhin et du Douro, calés sur les visiteurs plutôt que sur la vendange elle-même.|収穫はいちばん暖かい南のぶどう畑から始まり、およそ6週間かけて北へ上っていく。一年の他の時期はほとんど何も運ばない小さな支線が、乗客の代わりにぶどうを積んだ臨時の貨車を走らせる。ライン川やドウロ川の谷では、収穫そのものというより観光客に合わせた「ワイン列車」がいまも走る。",
    ),
    f: t(
      "The exact start date of picking is set region by region, often by law, based on sugar readings taken from test grapes in the days beforehand rather than by the calendar.|La fecha exacta de inicio de la vendimia se fija región por región, a menudo por ley, según las mediciones de azúcar tomadas de uvas de prueba los días previos, y no por el calendario.|La date exacte du début des vendanges est fixée région par région, souvent par arrêté, sur la base de mesures de sucre prises sur des raisins témoins les jours précédents, plutôt que par le calendrier.|収穫の開始日は地方ごとに、しばしば法令によって定められる。暦ではなく、数日前に試し摘みしたぶどうの糖度を測って決める。",
    ),
  },
  {
    e: "🍂",
    n: t("Colour moves down the Rhine gorge|El color baja por el desfiladero del Rin|La couleur descend les gorges du Rhin|色づきがライン渓谷を下る"),
    t: t(
      "The steep vineyard terraces above the river turn gold and rust within days of each other, and slow trains along the gorge fill with people who booked the window seat months in advance for exactly this fortnight. Fog sits in the valley most mornings until the sun has had time to burn it off the water.|Las empinadas terrazas de viñedo sobre el río se vuelven doradas y herrumbrosas con apenas días de diferencia, y los trenes lentos que recorren el desfiladero se llenan de gente que reservó el asiento de ventanilla con meses de antelación para esta quincena exacta. La niebla se posa en el valle casi todas las mañanas hasta que el sol tiene tiempo de quemarla sobre el agua.|Les terrasses de vignes escarpées au-dessus du fleuve virent à l'or et à la rouille à quelques jours d'intervalle, et les trains lents qui longent les gorges se remplissent de gens ayant réservé la place côté fenêtre des mois à l'avance pour cette quinzaine précise. Le brouillard stagne dans la vallée presque chaque matin jusqu'à ce que le soleil ait eu le temps de le dissiper sur l'eau.|川を見下ろす急なぶどう畑の段々畑は、数日のうちに金と錆の色に変わる。渓谷沿いのゆっくりした列車は、まさにこの二週間のために何か月も前から窓際の席を予約した人々で埋まる。霧は太陽が水面から焼き払うまで、たいてい朝じゅう谷にとどまっている。",
    ),
    f: t(
      "The gorge's terraced vineyards are so steep in places that some are still worked using a monorail winch system built for the slope, since no tractor can climb it safely.|Las terrazas de viñedo del desfiladero son en algunos tramos tan empinadas que aún se trabajan con un sistema de monorraíl y torno construido para la pendiente, porque ningún tractor puede subirla con seguridad.|Les terrasses viticoles des gorges sont par endroits si abruptes que certaines se travaillent encore à l'aide d'un système de monorail à treuil conçu pour la pente, aucun tracteur ne pouvant y grimper en sécurité.|渓谷の段々畑は場所によってあまりに急で、トラクターが安全に登れないため、いまも斜面用に造られたモノレール式のウインチで作業する畑が残っている。",
    ),
  },
  {
    e: "🌫️",
    n: t("The nights close in early|Las noches se cierran temprano|Les nuits tombent tôt|日暮れが早くなる",
    ),
    t: t(
      "North of about the latitude of Berlin, daylight is down to eight hours or less by the end of the month, and stations along the northern lines switch on their platform lighting before the afternoon trains have even left. Fog settles over low ground most mornings and does not always clear by noon.|Al norte, aproximadamente a la latitud de Berlín, la luz del día baja a ocho horas o menos a finales de mes, y las estaciones de las líneas del norte encienden el alumbrado del andén antes de que salgan siquiera los trenes de la tarde. La niebla se asienta sobre las tierras bajas casi todas las mañanas y no siempre se disipa antes del mediodía.|Au nord, environ à la latitude de Berlin, la lumière du jour tombe à huit heures ou moins à la fin du mois, et les gares des lignes nordiques allument l'éclairage des quais avant même le départ des trains de l'après-midi. Le brouillard s'installe sur les terrains bas presque chaque matin et ne se dissipe pas toujours avant midi.|ベルリンあたりの緯度より北では、月末までに日照時間が8時間かそれ以下に落ち込み、北方路線の駅は午後の列車がまだ出ないうちからホームの照明をつける。低地にはほとんど毎朝霧が居座り、正午までに晴れるとは限らない。",
    ),
    f: t(
      "Railways this far north run heated points and switch heaters through the coldest months, because a frozen set of points that fails to move can close a whole line as surely as a fallen tree.|Los ferrocarriles de latitudes tan al norte usan agujas y calentadores de desvío durante los meses más fríos, porque un cambio de vía congelado que no se mueve puede cerrar toda una línea tan efectivamente como un árbol caído.|Les chemins de fer de ces latitudes font fonctionner des aiguillages chauffants durant les mois les plus froids, car un aiguillage gelé qui ne bouge plus peut fermer toute une ligne aussi sûrement qu'un arbre tombé.|これほど北の鉄道は、もっとも寒い季節にポイント(転轍機)の融雪ヒーターを稼働させる。凍って動かなくなったポイント一つが、倒木と同じくらい確実に路線まるごとを止めてしまうからである。",
    ),
  },
  {
    e: "🎄",
    n: t("Christmas markets fill the squares|Los mercadillos de Navidad llenan las plazas|Les marchés de Noël envahissent les places|クリスマス市が広場を埋める"),
    t: t(
      "Wooden stalls selling mulled wine and roasted chestnuts go up in station squares across Central Europe within the same week, and the timetable adds late-evening trains home for shoppers who stayed for one more cup. In the Alpine valleys, the last days of the month belong to Krampus and his chains rather than to the markets.|Puestos de madera con vino caliente y castañas asadas se instalan en las plazas de las estaciones por toda Europa central en la misma semana, y el horario añade trenes nocturnos para quien se quedó a por una copa más. En los valles alpinos, los últimos días del mes pertenecen a Krampus y sus cadenas más que a los mercadillos.|Des échoppes de bois vendant vin chaud et marrons grillés s'installent sur les places de gare à travers l'Europe centrale la même semaine, et l'horaire ajoute des trains tardifs pour ceux qui sont restés pour un dernier verre. Dans les vallées alpines, les derniers jours du mois appartiennent à Krampus et à ses chaînes plutôt qu'aux marchés.|中欧じゅうの駅前広場に、ホットワインと焼き栗を売る木の露店が同じ週のうちに立ち並び、時刻表にはもう一杯だけ残った買い物客のための深夜の帰宅列車が追加される。アルプスの谷では、月末の数日はクリスマス市よりもクランプスとその鎖のものになる。",
    ),
    f: t(
      "Krampusnacht falls on the fifth of December, the eve of Saint Nicholas's own day, so the frightening half of the pair traditionally comes first and the reward only afterward.|La Krampusnacht cae el cinco de diciembre, víspera del día de San Nicolás, así que la mitad temible del dúo llega tradicionalmente primero, y la recompensa solo después.|La Krampusnacht tombe le cinq décembre, veille du jour de saint Nicolas lui-même, si bien que la moitié effrayante du duo arrive traditionnellement en premier, et la récompense seulement après.|クランプスナハトは12月5日、聖ニコラウスの祝日の前夜にあたる。この対の中で恐ろしいほうが先に来て、褒美はそのあとにようやくやってくる、という伝統的な順番である。",
    ),
  },
  {
    e: "🗓️",
    n: t("The winter timetable takes effect|Entra en vigor el horario de invierno|L'horaire d'hiver entre en vigueur|冬ダイヤに切り替わる"),
    t: t(
      "European railways change their entire continent-wide timetable on the same weekend every year, new departure times printed months in advance and posted at every station at once, so a route that ran at ten past the hour all autumn can shift without warning to the top of the hour. Regular travelers learn to check before assuming.|Los ferrocarriles europeos cambian todo su horario continental el mismo fin de semana cada año, con las nuevas horas de salida impresas con meses de antelación y expuestas a la vez en cada estación, así que una ruta que salía a los diez minutos toda la temporada puede pasar sin aviso a la hora en punto. Los viajeros habituales aprenden a comprobarlo antes de dar nada por sentado.|Les chemins de fer européens changent tout leur horaire continental le même week-end chaque année, les nouveaux départs étant imprimés des mois à l'avance et affichés dans toutes les gares à la fois, si bien qu'une ligne partant à dix après l'heure tout l'automne peut basculer sans préavis à l'heure pile. Les voyageurs habitués apprennent à vérifier avant de tenir quoi que ce soit pour acquis.|ヨーロッパの鉄道は毎年同じ週末に、大陸全体のダイヤを一斉に切り替える。新しい発車時刻は何か月も前から印刷され、すべての駅に同時に掲示される。秋のあいだずっと毎時10分発だった路線が、前触れも無く毎時ちょうどの発車に変わることもある。よく利用する客は、思い込まずに確かめる習慣を身につけている。",
    ),
    f: t(
      "The change is timed to the second Sunday of the month, chosen decades ago so that the shift lines up with the end of European summer time rather than falling on an arbitrary date.|El cambio se fija el segundo domingo del mes, elegido hace décadas para que coincida con el fin del horario de verano europeo en vez de caer en una fecha arbitraria.|Le changement est calé sur le deuxième dimanche du mois, choisi il y a des décennies pour coïncider avec la fin de l'heure d'été européenne plutôt que de tomber à une date arbitraire.|この切り替えは毎月第2日曜に合わせてあり、何十年も前、恣意的な日付ではなくヨーロッパ夏時間の終わりに揃えるという理由で決められた。",
    ),
  },
  {
    e: "🎭",
    n: t("Carnival crowds fill the night trains|Los trenes nocturnos se llenan de gente de carnaval|Les trains de nuit se remplissent de fêtards du carnaval|カーニバルの人波が夜行列車を埋める"),
    t: t(
      "Masked crowds pack extra trains into Venice and Cologne alike in the weeks before Lent, timetables padded with late services that would never run the rest of the year, and half the carriage steps off in costume before the platform sign has even come into view. Nobody checks tickets quite as closely this week.|Multitudes enmascaradas llenan trenes extra hacia Venecia y Colonia por igual en las semanas antes de Cuaresma, con horarios reforzados con servicios tardíos que nunca circularían el resto del año, y media vagoneta se baja disfrazada antes de que aparezca siquiera el cartel del andén. Esta semana nadie revisa los billetes con tanto celo.|Des foules masquées remplissent des trains supplémentaires vers Venise comme vers Cologne dans les semaines précédant le Carême, des horaires étoffés de services tardifs qui ne circuleraient jamais le reste de l'année, et la moitié de la voiture descend déjà costumée avant même que le panneau du quai n'apparaisse. Personne ne vérifie les billets de trop près cette semaine-là.|四旬節前の数週間、仮装した人々がヴェネツィアにもケルンにも臨時列車を満載にする。時刻表には他の季節には決して走らない深夜便が組み込まれ、ホームの表示が見える前から車両の半分はもう仮装のまま降りていく。この週だけは、誰も切符をそこまで厳しく確かめない。",
    ),
    f: t(
      "Cologne's carnival season officially opens at eleven minutes past eleven on the eleventh of November, months before the main celebrations, purely because the organisers liked how the number eleven looked repeated that many times.|La temporada de carnaval de Colonia se abre oficialmente a las once y once del once de noviembre, meses antes de las celebraciones principales, sencillamente porque a los organizadores les gustó cómo quedaba el número once repetido tantas veces.|La saison du carnaval de Cologne s'ouvre officiellement à onze heures onze le onze novembre, des mois avant les célébrations principales, simplement parce que les organisateurs aimaient l'allure du chiffre onze répété autant de fois.|ケルンのカーニバルは、本番の何か月も前、11月11日11時11分に正式に開幕する。理由はただ、11という数字がそれだけ並ぶ見た目を主催者が気に入ったからである。",
    ),
  },
  {
    e: "🕰️",
    n: t("The clocks spring forward|Los relojes se adelantan|Les horloges avancent|時計が進む"),
    t: t(
      "Almost the whole continent moves its clocks forward by an hour on the same night at the end of the month, and every timetable printed for the following morning already assumes the change, so a train that seems to leave an hour early has not actually moved at all. The high Alpine lines closed since autumn start testing their tracks again before the last snow has gone.|Casi todo el continente adelanta sus relojes una hora la misma noche, a finales de mes, y todo horario impreso para la mañana siguiente ya asume el cambio, así que un tren que parece salir una hora antes en realidad no se ha movido nada. Las líneas alpinas de altura, cerradas desde otoño, empiezan a probar sus vías otra vez antes de que se haya ido la última nieve.|Presque tout le continent avance ses horloges d'une heure la même nuit, en fin de mois, et tout horaire imprimé pour le lendemain matin tient déjà compte du changement, si bien qu'un train qui semble partir une heure plus tôt n'a en réalité pas bougé du tout. Les lignes alpines d'altitude fermées depuis l'automne recommencent à tester leurs voies avant que la dernière neige n'ait fondu.|大陸のほぼ全域が月末の同じ夜に時計を1時間進め、翌朝のために印刷された時刻表はすでにその変更を織り込んでいる。だから1時間早く出るように見える列車も、実際には何も変わっていない。秋から閉ざされていたアルプスの高地路線は、最後の雪が消えきる前から、再び線路の試運転を始める。",
    ),
    f: t(
      "European Summer Time has been coordinated across almost all of the continent's countries since 1996 so that the change happens on the same day everywhere, after decades in which different countries switched clocks on different dates and confused every international timetable in between.|El horario de verano europeo se coordina en casi todos los países del continente desde 1996, para que el cambio ocurra el mismo día en todas partes, después de décadas en las que distintos países cambiaban de hora en fechas distintas y confundían cualquier horario internacional entre medias.|L'heure d'été européenne est coordonnée dans presque tous les pays du continent depuis 1996, afin que le changement ait lieu le même jour partout, après des décennies durant lesquelles différents pays changeaient d'heure à des dates différentes, brouillant tout horaire international entre-temps.|ヨーロッパ夏時間は1996年以来、大陸のほぼすべての国で足並みをそろえ、どこでも同じ日に切り替わるようになっている。それ以前は国ごとに切り替えの日付がばらばらで、そのあいだの国際時刻表はどれも混乱していた。",
    ),
  },
];
