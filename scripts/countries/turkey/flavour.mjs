/**
 * トルコの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・フランス・インド・韓国と同じく「地方まるごとの好不況」で差をつける。
 * 実際の効果(どの地方の収入が何倍になるか)は
 * `src/infrastructure/content/season-and-doom-rules.ts` 側に置く。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const TURKEY_META = {
  id: "turkey",
  name: t("Turkey|Turquía|Turquie|トルコ"),
  blurb: t(
    "A bridge of two continents, strung with bazaars, dervishes and a coastline that never runs out of ruins|Un puente entre dos continentes, engarzado de bazares, derviches y un litoral que nunca se queda sin ruinas|Un pont entre deux continents, égrené de bazars, de derviches et d'un littoral qui ne manque jamais de ruines|バザールと旋回舞踊、遺跡の尽きない海岸線でつながる二つの大陸の橋",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (韓国・インド・フランス・世界一周・茨城と同じ理由。ここは暫定値100のまま)。
  // 実際の倍率2500の根拠: 1ドル=150円/37.5リラ(2025年半ば頃の相場)→1リラ≒4円。
  // 日本(×10000・開始¥12,000,000)÷4 ≒ ₺3,000,000 スタートとなる倍率。
  // リラは変動が激しい通貨なので、この相場と時期をここに残しておく。
  cur: { pre: "₺", post: "", mul: 100 },
  start: "istanbul",
  cpuNames: ["Nasreddin Hoca", "Keloğlan", "Karagöz", "Hacivat"],
  // 国旗の赤と三日月の白、イズニク陶器のトルコ石、銅細工の金、オリーブの緑。
  stripe: ["#E30A17", "#f6efe2", "#1a7a8f", "#c9a227", "#2f6b3a"],
};

/** 実際の地理区分にならった6区分(東・南東アナトリアはまとめて1つ)。 */
export const TURKEY_REGIONS = {
  mar: t("Marmara|Mármara|Marmara|マルマラ"),
  ege: t("Aegean|Egeo|Égée|エーゲ"),
  akd: t("Mediterranean|Mediterráneo|Méditerranée|地中海"),
  ica: t("Central Anatolia|Anatolia Central|Anatolie centrale|中央アナトリア"),
  kar: t("Black Sea|Mar Negro|Mer Noire|黒海"),
  dogu: t("East & Southeast|Este y Sureste|Est et Sud-Est|東部・南東部"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 */
export const TURKEY_ITEMS = {
  balon: {
    e: "🎈",
    price: 240,
    kind: "move",
    n: t("A Cappadocia Balloon Ride|Un paseo en globo de Capadocia|Une balade en montgolfière en Cappadoce|カッパドキアの熱気球"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "Balloon pilots over Göreme choose their altitude, not their direction, riding whichever layer of wind blows the way they want and hoping the ground crew can follow by truck to wherever the basket happens to land. No two mornings float exactly the same route over the valley of fairy chimneys.|Los pilotos de globo sobre Göreme eligen su altitud, no su dirección, y navegan la capa de viento que sopla hacia donde quieren, confiando en que el equipo de tierra los siga en camioneta hasta donde aterrice la cesta.|Les pilotes de montgolfière au-dessus de Göreme choisissent leur altitude, non leur direction, empruntant la couche de vent qui souffle dans le sens voulu, en espérant que l'équipe au sol pourra suivre en camion jusqu'à l'atterrissage de la nacelle.|ギョレメ上空の気球乗りが選べるのは高度だけで、方向は選べない。望む向きに吹く風の層を探して乗り、地上の追跡班がバスケットの着地点までトラックで追いつけることを願う。妖精の煙突の谷を飛ぶ朝はどれ一つとして同じ航路をたどらない。",
    ),
  },
  fal: {
    e: "☕",
    price: 380,
    kind: "pre",
    n: t("A Turkish Coffee Fortune|Una lectura del poso de café turco|Une lecture dans le marc de café turc|トルココーヒー占い"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "After the thick, unfiltered coffee is drunk, the cup is flipped onto its saucer to cool and the grounds that trickle down its sides are read for shapes said to spell out the road ahead. Friends do this for each other constantly, and a fortune-teller who reads professionally is expected never to charge close family.|Tras beber el café espeso y sin filtrar, se voltea la taza sobre el platillo para que se enfríe, y se leen en las formas que dejan los posos el camino por venir. Los amigos se lo hacen constantemente unos a otros.|Une fois le café épais et non filtré bu, on retourne la tasse sur sa soucoupe pour la laisser refroidir, et l'on y lit dans les formes laissées par le marc la route à venir. Les amis se font sans cesse cette lecture entre eux.|濃く濾していないコーヒーを飲み干すと、カップを受け皿にひっくり返して冷まし、内側を伝い落ちるコーヒーかすの形に、これから歩む道を読み取る。友人どうしで絶えず占い合う習わしで、職業の占い師は近しい身内からは決してお代を取らないものとされる。",
    ),
  },
  mavitren: {
    e: "🚂",
    price: 360,
    kind: "pre",
    n: t("Mavi Tren Sleeper Ticket|Billete del Mavi Tren|Billet du Mavi Tren|マヴィ・トレン夜行列車の切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Named simply \"Blue Train\" for the colour its carriages were painted, this overnight sleeper once linked the capital to the country's far corners at a gentler pace than any express, rocking passengers to sleep across a night of tea sold from a cart at every stop. Slower lines like it lost most of their passengers once the high-speed network opened, but a loyal few still prefer the ride to the destination.|Llamado simplemente «Tren Azul» por el color de sus vagones, este coche cama nocturno unía antaño la capital con los rincones más lejanos del país a un ritmo más pausado que cualquier expreso.|Nommé simplement « train bleu » d'après la couleur de ses wagons, ce train de nuit reliait jadis la capitale aux confins du pays à un rythme plus doux que n'importe quel express.|車体の色にちなんで単に「青い列車」と呼ばれたこの夜行寝台は、かつて首都と国の果てを、どの特急よりもゆったりした足取りで結んでいた。各駅で台車から売られる茶を飲みながら、乗客は一夜かけて揺られて眠った。高速鉄道網が開通すると、こうした鈍行の多くは乗客の大半を失ったが、いまも目的地より道中を好む少数の愛好者が乗り続けている。",
    ),
  },
  yht: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("YHT High-Speed Ticket|Billete del YHT de alta velocidad|Billet du YHT à grande vitesse|YHT高速鉄道の切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The Yüksek Hızlı Tren opened its first line between Ankara and Eskişehir in 2009, cutting a journey that once took hours on aging track to well under two, and the Ankara–Sivas line completed in 2023 pushed the network deep into central Anatolia for the first time. Engineers had to reroute around several valleys that older surveys had judged impossible to bridge affordably.|El Yüksek Hızlı Tren abrió su primera línea entre Ankara y Eskişehir en 2009, recortando un trayecto que antes llevaba horas por vías envejecidas a bastante menos de dos.|Le Yüksek Hızlı Tren ouvrit sa première ligne entre Ankara et Eskişehir en 2009, ramenant à bien moins de deux heures un trajet qui prenait auparavant des heures sur une voie vieillissante.|ユクセク・ヒズル・トレン(YHT)は2009年、アンカラ〜エスキシェヒル間で最初の路線を開業し、老朽化した線路で何時間もかかっていた行程を2時間足らずに縮めた。2023年に完成したアンカラ〜シワス線は、初めて高速鉄道網を中央アナトリアの奥深くまで届かせた。技師たちは、以前の測量では手頃な費用では橋を架けられないとされていたいくつもの谷を迂回する必要に迫られた。",
    ),
  },
  nazar: {
    e: "🧿",
    price: 320,
    kind: "passive",
    n: t("A Nazar Bead|Un abalorio de nazar|Une perle de nazar|ナザル・ボンジュウ(魔除けの目玉)"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "The blue-and-white glass eye is hung over doorways, pinned to newborns' clothes and dangled from rear-view mirrors on the belief that it draws an envious glance to itself, cracking or shattering to absorb harm meant for its owner. Glassblowers still make them by the thousands in workshops that have passed the technique down for generations.|El ojo de vidrio azul y blanco se cuelga sobre las puertas, se prende a la ropa de los recién nacidos y pende de los retrovisores, en la creencia de que atrae hacia sí la mirada envidiosa y se agrieta para absorber el daño destinado a su dueño.|L'œil de verre bleu et blanc se suspend au-dessus des portes, s'épingle aux vêtements des nouveau-nés et pend aux rétroviseurs, dans la croyance qu'il attire à lui le regard envieux et se fissure pour absorber le mal destiné à son propriétaire.|青と白のガラスの目玉は戸口に吊るされ、生まれたばかりの子の服にも留められ、車のバックミラーにもぶら下げられる。妬みの視線を自分に引き寄せ、ひびが入ったり割れたりすることで持ち主に向かうはずだった災いを吸い取ると信じられているからである。何世代も技法を受け継いできた工房では、いまも吹きガラス職人がこれを何千個も作り続けている。",
    ),
  },
  karacevap: {
    e: "🖤",
    price: 440,
    kind: "pre",
    n: t("Shouting \"Kara!\"|Gritar «¡Kara!»|Crier « Kara ! »|「カラ(黒)!」と叫ぶ"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Old winter tales say a traveler stopped at a bridge by the demon Karakoncolos must answer his riddling question correctly or be thrown into the ravine below, and the one answer that always works, whatever he asks, is a single flat word: kara, \"black\". Told wrong, he supposedly laughs and lets you pass anyway, so nobody is entirely sure the trick is real.|Los viejos cuentos de invierno dicen que un viajero detenido en un puente por el demonio Karakoncolos debe responder correctamente a su adivinanza o será arrojado al barranco, y la única respuesta que siempre funciona es una sola palabra llana: kara, «negro».|Les vieux contes d'hiver disent qu'un voyageur arrêté sur un pont par le démon Karakoncolos doit répondre juste à sa devinette sous peine d'être jeté dans le ravin, et la seule réponse qui marche à tous les coups est un mot tout simple : kara, « noir ».|昔の冬の言い伝えによれば、橋の上で悪鬼カラコンジョロスに呼び止められた旅人は、なぞなぞに正しく答えなければ谷底へ投げ込まれるという。何を問われようと必ず効く答えはただ一言、「カラ(黒)」。間違えても笑って通してくれるとも言われ、本当に効くのか誰も確かめきれていない。",
    ),
  },
  deneme: {
    e: "📝",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("A Cram-School Practice Exam|Un examen de simulacro de academia|Un examen blanc de cours préparatoire|デネメ(模擬試験問題集)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "With university placement decided almost entirely by a single national exam, students spend years working through deneme booklets, timed practice tests sold by the thousands from private cram schools called dershane, until the real questions start to feel like the hundredth rerun of a familiar show. Some families budget for dershane fees the way others budget for rent.|Con el ingreso a la universidad decidido casi por completo por un único examen nacional, los estudiantes pasan años resolviendo cuadernillos deneme, exámenes de práctica cronometrados vendidos por miles en academias privadas llamadas dershane.|L'admission à l'université se jouant presque entièrement sur un examen national unique, les étudiants passent des années à enchaîner les cahiers deneme, ces examens blancs chronométrés vendus par milliers dans les cours préparatoires privés appelés dershane.|大学進学がほぼ一発の全国試験で決まるこの国では、学生は何年もかけてデネメと呼ばれる時間制限つきの模擬試験問題集を解き続ける。デルシャネと呼ばれる予備校が何千冊も売っており、本番の問題がやがて見飽きた再放送のように感じられるほどになる。家賃と同じ感覚でデルシャネの月謝を家計に組み込む家庭もある。",
    ),
  },
  akce: {
    e: "🪙",
    price: 280,
    kind: "pre",
    n: t("A Handful of Old Ottoman Coins|Un puñado de monedas otomanas antiguas|Une poignée de vieilles pièces ottomanes|古いオスマン銀貨",
    ),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-les et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Silver akçe coins were the empire's everyday currency for centuries until repeated debasement made them so thin and low in silver content that merchants weighed handfuls rather than counting them one by one. Metal detectorists still turn up scattered hoards buried by owners who never made it back to dig them up.|Las monedas de plata akçe fueron la moneda corriente del imperio durante siglos, hasta que las sucesivas devaluaciones las hicieron tan finas y pobres en plata que los mercaderes pesaban puñados en vez de contarlas una a una.|Les pièces d'argent akçe furent la monnaie courante de l'empire durant des siècles, jusqu'à ce que des dévaluations répétées les rendent si fines et pauvres en argent que les marchands en pesaient des poignées plutôt que de les compter une à une.|銀貨アクチェは何世紀にもわたり帝国の日常通貨だったが、たび重なる改鋳で薄く銀の含有量も落ち、商人は一枚ずつ数えるのではなく一握りの重さで取引するようになった。金属探知機を使う愛好家はいまも、掘り返しに戻れなかった持ち主が埋めたままの銭の山を時おり掘り当てる。",
    ),
  },
  dolmus: {
    e: "🚐",
    price: 420,
    kind: "pre",
    n: t("A Dolmuş Already Pulling Out|Un dolmuş que ya está saliendo|Un dolmuş déjà en train de partir|発車寸前のドルムシュ"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "The word dolmuş means \"filled\", because these shared minibuses and taxis traditionally leave the moment every seat is taken rather than on any fixed schedule, so catching one at the exact right second saves a wait that could otherwise run to twenty minutes. Regulars know to have exact change ready and to shout their stop over the driver's radio.|La palabra dolmuş significa «lleno», porque estos minibuses y taxis compartidos tradicionalmente salen en cuanto se ocupa el último asiento y no según ningún horario fijo, así que subirse en el segundo exacto ahorra una espera que si no podría llegar a veinte minutos.|Le mot dolmuş signifie « rempli », car ces minibus et taxis partagés partent traditionnellement dès que la dernière place est prise, sans horaire fixe, si bien que monter au bon moment évite une attente pouvant sinon durer vingt minutes.|「ドルムシュ」は「満員」を意味する語で、この乗り合いミニバスやタクシーは決まった時刻表ではなく、伝統的に最後の席が埋まった瞬間に発車する。ちょうどよい一瞬に乗り込めれば、下手をすれば20分にもなる待ち時間が丸ごと省ける。常連は小銭を用意しておき、運転手のラジオ越しに降りる場所を叫ぶ心得を持っている。",
    ),
  },
};

/**
 * 厄災の神。トルコ・バルカンの民話に伝わるカラコンジョロス(冬いちばん寒い
 * 「暗い日々」に現れるとされる、大きく毛深い妖怪)にした。答えを間違えると
 * 谷へ突き落とすと言われるが、正しく「黒(カラ)」と答えれば笑って見逃す
 * ――残酷というより、悪ふざけの過ぎるいたずら者として描く
 * (韓国のトッケビ・茨城のダイダラボウと同じ性格づけ)。
 */
export const TURKEY_SPIRIT = {
  e: "👹",
  n: t("Karakoncolos|Karakoncolos|Karakoncolos|カラコンジョロス"),
  big: t("Karakoncolos's Riddle Night|La noche del acertijo de Karakoncolos|La nuit des devinettes de Karakoncolos|カラコンジョロスのなぞなぞの夜"),
  ward: "nazar",
  arrive: t(
    "<b>👹 Karakoncolos has taken an interest in you.</b> Old winter tales describe a huge, black-furred creature who waits at bridges and crossroads during the coldest days of the year, stopping travelers with riddles rather than violence — mischievous more than cruel, so long as you answer him well. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>👹 Karakoncolos se ha fijado en ti.</b> Los viejos cuentos de invierno describen a una criatura enorme de pelaje negro que espera en puentes y cruces durante los días más fríos del año, deteniendo a los viajeros con acertijos y no con violencia. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>👹 Karakoncolos s'est intéressé à toi.</b> Les vieux contes d'hiver décrivent une énorme créature au pelage noir qui attend aux ponts et aux carrefours durant les jours les plus froids de l'année, arrêtant les voyageurs avec des devinettes plutôt qu'avec la violence. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>👹 カラコンジョロスに目を付けられた。</b> 昔の冬の言い伝えによれば、この黒い毛むくじゃらの巨大な怪物は一年でいちばん寒い日々、橋や辻に潜んで旅人を待ち、暴力ではなくなぞなぞで足止めするという。うまく答えさえすれば残酷というよりただの悪ふざけである。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "👹 <b>Karakoncolos</b> loses interest and stalks off after <b>{0}</b>, farthest from {1}.|👹 <b>Karakoncolos</b> pierde el interés y va tras <b>{0}</b>, el más lejano de {1}.|👹 <b>Karakoncolos</b> se désintéresse et part traquer <b>{0}</b>, le plus loin de {1}.|👹 <b>カラコンジョロス</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ歩き去った。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with Karakoncolos and never once answered him wrong. Impressed and a little bored, he blocks the whole road at once with a single riddle for everyone — <b>Karakoncolos's Riddle Night</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto a Karakoncolos sin haberle respondido mal ni una vez. Impresionado y algo aburrido, bloquea todo el camino a la vez con un único acertijo para todos: empieza <b>la noche del acertijo de Karakoncolos</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec Karakoncolos sans jamais s'être trompé de réponse. Impressionné et un peu las, il bloque toute la route d'un coup avec une devinette pour tout le monde : <b>la nuit des devinettes de Karakoncolos</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもカラコンジョロスと歩いていながら、一度も答えを外さなかった。感心と少しの退屈から、彼は道行く者すべてに一つのなぞなぞを突きつけて道をふさぐ。<b>カラコンジョロスのなぞなぞの夜</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> Karakoncolos supposedly always asks the same question in the end — \"is it kara or is it güç?\" (black, or strength) — and the only safe answer is the flat word kara, no matter how the question is phrased. Nobody playing this game has worked out exactly when he asks it.|<b>Tras la historia:</b> se dice que Karakoncolos siempre acaba haciendo la misma pregunta —«¿es kara o es güç?» (negro, o fuerza)— y la única respuesta segura es la simple palabra kara, se formule como se formule la pregunta. Nadie en esta partida ha averiguado aún exactamente cuándo la hace.|<b>Derrière l'histoire :</b> Karakoncolos poserait toujours la même question au fond — « est-ce kara ou est-ce güç ? » (noir, ou force) — et la seule réponse sûre est le simple mot kara, quelle que soit la tournure de la question. Personne dans cette partie n'a encore découvert exactement quand il la pose.|<b>物語の背景:</b> カラコンジョロスは結局いつも同じ問いを発するという――「カラか、それともギュチュ(黒か、それとも力か)?」――どう問われても安全な答えはただ一言「カラ」だけである。このゲームでは、まだ誰も彼が正確にいつそれを尋ねるのか見極めていない。",
  ),
  pleased: t(
    "He lets out a booming, satisfied laugh at your answer, and a coin tumbles loose from his shaggy coat. <b>{0}</b> gains <span class='money'>+{1}</span>.|Suelta una carcajada estruendosa y satisfecha ante tu respuesta, y una moneda se le cae del abrigo peludo. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il lâche un rire tonitruant et satisfait à ta réponse, et une pièce tombe de son manteau hirsute. <b>{0}</b> gagne <span class='money'>+{1}</span>.|答えに満足したのか、腹の底から響く笑い声をあげ、そのはずみで毛むくじゃらの外套から銭が一枚こぼれ落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A blue-glass nazar bead is held up where he can see it. Karakoncolos is said to hate the sight of the watching eye, and he backs off, shuffling past <b>{0}</b> without noticing this turn.|Se alza un abalorio de nazar de vidrio azul donde pueda verlo. Se dice que Karakoncolos odia la vista del ojo vigilante, y retrocede, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|On brandit une perle de nazar en verre bleu bien en vue. On dit que Karakoncolos déteste la vue de cet œil qui veille, et il recule, passant devant <b>{0}</b> sans le remarquer ce tour-ci.|青いガラスのナザル・ボンジュウを彼の見えるところに掲げた。カラコンジョロスはこの見張る目を何より嫌うという。彼はひるんで後ずさり、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。カラコンジョロスの悪ふざけ好きな性格に合わせ、大げさで滑稽な話にしてある。 */
export const TURKEY_DOOM = [
  {
    id: "ayakkabi",
    n: t("A shoe-shine brush drops in front of you|Un cepillo de limpiabotas cae delante de ti|Une brosse de cireur tombe devant toi|靴磨きのブラシが目の前に落ちる"),
    t: t(
      "The brush skitters across the pavement just ahead, and picking it up to return it is apparently an unbreakable contract to have your shoes shined whether they needed it or not. The price agreed on afterward always turns out to be several times what was implied, and arguing seems to take longer than just paying.|El cepillo se desliza por la acera justo delante, y recogerlo para devolverlo resulta ser, al parecer, un contrato irrompible para que te limpien los zapatos, los necesiten o no. El precio acordado después siempre resulta ser varias veces lo insinuado.|La brosse glisse sur le trottoir juste devant, et la ramasser pour la rendre s'avère être, semble-t-il, un contrat en béton pour se faire cirer les chaussures, qu'elles en aient besoin ou non. Le prix convenu ensuite se révèle toujours plusieurs fois supérieur à ce qui était sous-entendu.|靴磨きのブラシが目の前の歩道を滑っていき、拾って返してやると、それだけで靴を磨いてもらう暗黙の契約が成立してしまうらしい。磨く必要があってもなくても関係ない。後で決まる値段はいつも、ほのめかされていた額の何倍にもなっていて、言い争うより払うほうが早く済む。",
    ),
  },
  {
    id: "lodos",
    n: t("A lodos storm shuts the Bosphorus|Una tormenta de lodos cierra el Bósforo|Une tempête de lodos ferme le Bosphore|ロドス風がボスポラスを閉じる"),
    t: t(
      "The warm, wet southwesterly known as lodos whips the strait into whitecaps strong enough that ferries are cancelled and the bridges close to high-sided vehicles, stranding half the city on the wrong side of the water. Locals claim the wind also makes tempers shorter and traffic accidents more common, a folk belief the newspapers report every single time it blows.|El viento cálido y húmedo del suroeste conocido como lodos agita el estrecho hasta crear olas lo bastante fuertes como para cancelar los ferris y cerrar los puentes a vehículos altos, dejando a medio Bósforo varado en el lado equivocado.|Le vent chaud et humide du sud-ouest appelé lodos agite le détroit de vagues assez fortes pour faire annuler les ferrys et fermer les ponts aux véhicules hauts, laissant la moitié de la ville coincée du mauvais côté de l'eau.|ロドスと呼ばれる暖かく湿った南西風が海峡を白波立て、フェリーは欠航し、橋は背の高い車両に通行止めとなって、街の半分が水の向こう岸に取り残される。この風が吹くと気が短くなり交通事故も増えると地元では言われ、新聞はロドスが吹くたびにこの俗信を律儀に書き立てる。",
    ),
    months: [10, 11],
  },
  {
    id: "trafik",
    n: t("Stuck in Istanbul traffic|Atrapado en el tráfico de Estambul|Coincé dans les embouteillages d'Istanbul|イスタンブールの渋滞にはまる"),
    t: t(
      "Three lanes become one for no visible reason somewhere past the bridge, and the dolmuş radio cycles through the same traffic report every ten minutes without the numbers ever improving. Everyone in the shared taxi has given up looking at the time and settled into the specific patience the city's traffic demands almost daily.|Tres carriles se reducen a uno sin motivo aparente en algún punto tras el puente, y la radio del dolmuş repite el mismo parte de tráfico cada diez minutos sin que las cifras mejoren nunca. Todos en el taxi compartido han dejado de mirar la hora.|Trois voies se réduisent à une sans raison apparente quelque part après le pont, et la radio du dolmuş repasse le même bulletin de circulation toutes les dix minutes sans que les chiffres ne s'améliorent jamais. Tout le monde dans le taxi partagé a renoncé à regarder l'heure.|橋を過ぎたあたりで理由もなく車線が三本から一本に減り、ドルムシュのラジオは同じ渋滞情報を十分おきに繰り返すばかりで数字は一向によくならない。乗り合いタクシーの誰もが時計を見るのをあきらめ、この街がほぼ毎日求めてくる独特の忍耐に身を委ねている。",
    ),
  },
  {
    id: "camyangini",
    n: t("A pine forest fire breaks out along the coast|Un incendio forestal de pinos estalla en la costa|Un incendie de pins se déclare sur la côte|海岸の松林で山火事が起きる"),
    t: t(
      "A dry summer wind off the Aegean turns a roadside spark into a wall of flame that races through resin-rich pine faster than the water-bombing planes can circle back to reload. Whole hillsides of holiday villas are evacuated as a precaution, and the smell of smoke hangs over the coast for days after the flames themselves are out.|Un viento seco del verano egeo convierte una chispa junto a la carretera en una pared de fuego que corre por pinos ricos en resina más rápido de lo que los aviones cisterna pueden dar la vuelta para recargar. Se evacúan por precaución laderas enteras de villas de vacaciones.|Un vent sec de l'été égéen transforme une étincelle au bord de la route en un mur de flammes qui court dans les pins riches en résine plus vite que les avions-citernes ne peuvent faire l'aller-retour pour se recharger. Des coteaux entiers de villas de vacances sont évacués par précaution.|エーゲ海から吹く夏の乾いた風が、道端の火の粉を消火機が給水に戻る間もなく樹脂の多い松林を走り抜ける炎の壁に変える。別荘の建ち並ぶ丘陵地帯が予防のため丸ごと避難させられ、火が消えたあとも何日も海岸沿いに煙の匂いが漂う。",
    ),
    months: [3, 4],
  },
  {
    id: "meyhane",
    n: t("The meyhane bill lands on you|La cuenta de la meyhane cae sobre ti|L'addition de la meyhane retombe sur toi|メイハーネの勘定が回ってくる"),
    t: t(
      "The table has gone through more small plates of meze and rounds of rakı than anyone was quietly counting, each round toasted with a clink and the word şerefe, and when the bill finally lands in the middle of the table not one of the group meets your eye fast enough to claim it first.|La mesa ha pasado por más platitos de meze y rondas de rakı de las que nadie contaba en voz baja, brindando cada ronda con un choque de vasos y la palabra şerefe, y cuando la cuenta cae al fin en el centro de la mesa, nadie del grupo te mira lo bastante rápido como para reclamarla antes.|La tablée a enchaîné plus de petites assiettes de meze et de tournées de rakı que quiconque ne comptait en silence, chaque tournée trinquée d'un cliquetis et du mot şerefe, et quand l'addition atterrit enfin au milieu de la table, personne du groupe ne croise ton regard assez vite pour la réclamer en premier.|誰も密かに数えていなかったほど多くのメゼの小皿とラクの杯が食卓を巡り、乾杯のたびグラスを合わせて「シェレフェ(乾杯)」と唱えた。ようやく勘定書がテーブルの真ん中に置かれると、誰も先に手を伸ばそうと目を合わせようとしない。",
    ),
  },
  {
    id: "karakoncolos-yolu",
    n: t("Led astray by Karakoncolos|Karakoncolos te hace perder el camino|Karakoncolos t'égare|カラコンジョロスに化かされる"),
    t: t(
      "The road home looked exactly the same at every turn on the coldest night of the year, and only near dawn does it become clear the same stone bridge was crossed three times over. Old tales blame Karakoncolos for this exact trick, walking a traveler in circles for the fun of the riddle rather than any real harm, vanishing the moment the sky greys toward morning.|El camino de vuelta parecía idéntico en cada recodo en la noche más fría del año, y solo cerca del amanecer queda claro que se cruzó tres veces el mismo puente de piedra. Los viejos cuentos culpan de esta treta a Karakoncolos.|Le chemin du retour semblait identique à chaque tournant, par la nuit la plus froide de l'année, et ce n'est que près de l'aube qu'on comprend avoir traversé trois fois le même pont de pierre. Les vieux contes en accusent Karakoncolos.|一年でいちばん寒い夜、帰り道はどの角を曲がっても同じ景色に見え、明け方近くになってようやく同じ石橋を三度も渡っていたと分かった。昔話はこの仕掛けをカラコンジョロスのしわざだとする。本当に害をなすためではなく、なぞなぞの面白さで旅人を堂々巡りさせ、空が白み始めた瞬間に消えるという。",
    ),
    months: [9, 10],
  },
  {
    id: "yankesici",
    n: t("A pickpocket works the Grand Bazaar|Un carterista trabaja en el Gran Bazar|Un pickpocket sévit au Grand Bazar|グランドバザールですりに遭う",
    ),
    t: t(
      "A shoulder bump in one of the covered alleys, thick with carpet sellers calling out prices, is over before it registers as anything at all, and only two turnings later does the missing weight in a pocket become obvious. With more than 4,000 shops packed under one roof, there is no shortage of places it could have happened.|Un roce de hombro en uno de los pasillos cubiertos, atestado de vendedores de alfombras voceando precios, pasa antes de notarse como algo, y solo dos vueltas después se hace evidente el peso que falta en un bolsillo. Con más de 4.000 tiendas bajo un mismo techo, no faltan sitios donde pudo pasar.|Un coup d'épaule dans l'une des allées couvertes, encombrée de marchands de tapis criant leurs prix, est passé avant même d'être remarqué, et ce n'est que deux détours plus loin que le poids manquant dans une poche devient évident. Avec plus de 4 000 échoppes sous un même toit, les occasions ne manquent pas.|絨毯売りが値段を叫び合う屋根付きの通路で肩がぶつかった程度にしか感じなかったが、二つ角を曲がってからようやくポケットの軽さに気づいた。一つ屋根の下に4000軒を超える店がひしめくこの市場では、起こりうる場所には事欠かない。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、日本・フランス・インド・
 * 韓国と同じく地方まるごとの好不況で差をつける(効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の turkey の項)。
 */
export const TURKEY_SEASONS = [
  {
    e: "🌷",
    n: t("Tulips take over Istanbul's parks|Los tulipanes toman los parques de Estambul|Les tulipes envahissent les parcs d'Istanbul|イスタンブールの公園がチューリップに染まる"),
    t: t(
      "Millions of bulbs planted each autumn burst open at once each April, a flower the Ottomans prized so highly that a whole era of the empire's history is nicknamed for it, long before the bulb ever reached the Netherlands. Cappadocia's balloon pilots report some of the calmest, clearest mornings of the year for flying this month too.|Millones de bulbos plantados cada otoño estallan a la vez cada abril, una flor tan apreciada por los otomanos que toda una era de la historia del imperio lleva su apodo, mucho antes de que el bulbo llegara a los Países Bajos.|Des millions de bulbes plantés chaque automne éclosent d'un coup chaque avril, une fleur si prisée des Ottomans qu'une époque entière de l'histoire de l'empire en porte le surnom, bien avant que le bulbe n'atteigne les Pays-Bas.|毎秋植えられる数百万球の球根が四月にいっせいに開く。チューリップはオスマン帝国がこよなく愛した花で、この球根がオランダに渡るよりずっと前、帝国史のある時代がまるごとこの花にちなんで名付けられたほどである。カッパドキアの気球乗りも、この月は一年でも指折り穏やかで澄んだ飛行日和が続くと言う。",
    ),
    f: t(
      "The tulip is thought to have been first cultivated in Central Asia and Anatolia, and its Turkish name lale shares an old root with the word for the turban shape the flower's petals were once compared to.|Se cree que el tulipán se cultivó por primera vez en Asia Central y Anatolia, y su nombre turco, lale, comparte raíz antigua con la palabra para el turbante al que antaño se comparaban sus pétalos.|On pense que la tulipe fut d'abord cultivée en Asie centrale et en Anatolie, et son nom turc, lale, partage une vieille racine avec le mot désignant le turban auquel ses pétales furent jadis comparés.|チューリップは中央アジアとアナトリアで最初に栽培されたと考えられており、トルコ語名ラーレは、かつて花びらの形が例えられたターバンを指す語と古い語根を共有している。",
    ),
  },
  {
    e: "🔥",
    n: t("Hıdırellez welcomes the spring|Hıdırellez da la bienvenida a la primavera|Hıdırellez accueille le printemps|ヒドゥレルレズが春を迎える"),
    t: t(
      "On the night of 5 May, people write wishes on slips of paper and tuck them under rose bushes, then jump over bonfires for good luck as the holiday marking the meeting of the prophets Khidr and Elijah blends into a plain celebration of spring finally arriving for good. Fortune-tellers do brisk business reading the coffee grounds of anyone who asks that night.|En la noche del 5 de mayo, la gente escribe deseos en papelitos y los esconde bajo rosales, y luego salta sobre hogueras para la buena suerte, mientras la fiesta que marca el encuentro de los profetas Jidr e Ilías se funde con una sencilla celebración de la llegada definitiva de la primavera.|Dans la nuit du 5 mai, on écrit des vœux sur des bouts de papier glissés sous des rosiers, puis on saute par-dessus des feux de joie pour la bonne fortune, tandis que la fête marquant la rencontre des prophètes Khidr et Élie se mêle à une simple célébration du printemps enfin arrivé pour de bon.|5月5日の夜、人々は願い事を紙に書いてバラの茂みの下に忍ばせ、幸運を願って焚き火を飛び越える。預言者ヒズルとイリヤスの出会いを祝うこの祭りは、いまではただ春がようやく本当にやって来たことを祝う行事とも重なり合っている。占い師はこの夜、頼まれるままにコーヒー占いで大忙しになる。",
    ),
    f: t(
      "The holiday's name fuses two figures, Hızır and İlyas, said in folk belief to meet once a year on earth on this date, and versions of the same spring festival are marked under similar names across much of the Balkans and Central Asia.|El nombre de la fiesta fusiona dos figuras, Hızır e İlyas, que según la creencia popular se encuentran una vez al año en la tierra en esta fecha, y versiones del mismo festival de primavera se celebran con nombres similares en buena parte de los Balcanes y Asia Central.|Le nom de la fête fusionne deux figures, Hızır et İlyas, censées selon la croyance populaire se rencontrer une fois l'an sur terre à cette date, et des versions de la même fête de printemps se célèbrent sous des noms proches dans une bonne partie des Balkans et d'Asie centrale.|この祝日の名は、民間信仰でこの日に一年に一度地上で出会うとされる二人の人物、ヒズルとイリヤスを合わせたものである。同じ春の祭りは、似た名前でバルカン半島や中央アジアの広い地域でも祝われている。",
    ),
  },
  {
    e: "🍒",
    n: t("The cherry harvest reddens the north|La cosecha de cerezas enrojece el norte|La récolte des cerises rougit le nord|さくらんぼの収穫で北が赤く染まる"),
    t: t(
      "The country picks more cherries than anywhere else on Earth, and the Black Sea port that gave the fruit its name in most European languages, ancient Cerasus, still ships crates of them out each June alongside orchards further inland doing the same. Roadside stalls sell them by the kilo straight off the truck.|El país cosecha más cerezas que ningún otro lugar del planeta, y el puerto del mar Negro que dio nombre a la fruta en la mayoría de lenguas europeas, la antigua Cerasus, sigue enviando cajas de ellas cada junio.|Le pays récolte plus de cerises que tout autre endroit sur Terre, et le port de la mer Noire qui donna son nom au fruit dans la plupart des langues européennes, l'antique Cerasus, en expédie encore des caisses chaque juin.|この国はさくらんぼの収穫量で世界一を誇り、ほとんどのヨーロッパ言語でこの果物の名の由来となった黒海の港、古代のケラスス(現ギレスン)は、いまも毎年六月にはさくらんぼの木箱を積み出している。内陸の果樹園も同じ時期に収穫を迎える。道端の屋台ではトラックから降ろしたばかりのさくらんぼがキロ売りされる。",
    ),
    f: t(
      "The English word \"cherry\" and its equivalents across Europe trace back through Latin cerasum to the Black Sea port of Cerasus, today's Giresun, from where Roman general Lucullus is said to have brought the fruit west after a campaign in the first century BC.|La palabra inglesa «cherry» y sus equivalentes en toda Europa se remontan, a través del latín cerasum, al puerto del mar Negro de Cerasus, la actual Giresun, de donde se dice que el general romano Lúculo llevó la fruta hacia occidente tras una campaña en el siglo I a.C.|Le mot anglais « cherry » et ses équivalents à travers l'Europe remontent, via le latin cerasum, au port de la mer Noire de Cerasus, l'actuelle Giresun, d'où le général romain Lucullus aurait rapporté le fruit vers l'ouest après une campagne au Ier siècle av. J.-C.|英語のcherryをはじめヨーロッパ各語の同系語は、ラテン語cerasumを経て黒海の港ケラスス、現在のギレスンにさかのぼる。紀元前1世紀の遠征の帰りに、ローマの将軍ルクッルスがこの果実を西へ持ち帰ったと伝えられている。",
    ),
  },
  {
    e: "🏖️",
    n: t("The coast fills for peak season|La costa se llena en temporada alta|La côte se remplit en pleine saison|海岸が最盛期の人出で埋まる"),
    t: t(
      "Sunbeds along the Aegean and Mediterranean fill to capacity as domestic and foreign travelers both converge on the same few weeks, and hotel prices that were reasonable in May roughly double by the time the summer holidays properly begin. Inland cities empty out just as fast, their residents joining the same coastal crush.|Las tumbonas del Egeo y el Mediterráneo se llenan a plena capacidad cuando viajeros nacionales y extranjeros convergen en las mismas semanas, y los precios de hotel razonables en mayo se duplican para cuando empiezan de verdad las vacaciones de verano.|Les transats de l'Égée et de la Méditerranée se remplissent à pleine capacité tandis que voyageurs locaux et étrangers convergent sur les mêmes semaines, et les prix d'hôtel raisonnables de mai doublent à peu près une fois les vacances d'été bien lancées.|エーゲ海と地中海のビーチベッドは、国内外の旅行者が同じ数週間に集中して満杯になり、5月には手頃だったホテル代は本格的な夏休みが始まる頃にはおよそ倍になる。内陸の都市も同じ速さで人が減り、住民たちも同じ海岸の混雑に加わっていく。",
    ),
    f: t(
      "Domestic tourism now makes up more than half of all overnight stays along the Aegean coast in peak summer, a reversal from decades past when the beach towns depended almost entirely on travelers arriving from abroad.|El turismo nacional supone hoy más de la mitad de todas las pernoctaciones en la costa egea en pleno verano, una inversión respecto a décadas pasadas, cuando los pueblos de playa dependían casi por entero de viajeros llegados del extranjero.|Le tourisme national représente aujourd'hui plus de la moitié de toutes les nuitées sur la côte égéenne en plein été, un renversement par rapport aux décennies passées, où les stations balnéaires dépendaient presque entièrement des voyageurs venus de l'étranger.|エーゲ海沿岸の真夏の宿泊数は、いまや国内旅行者だけで半分を超えるまでになった。かつて海辺の町がほぼ外国からの旅行者だけに頼っていた時代からの逆転である。",
    ),
  },
  {
    e: "🎉",
    n: t("Victory Day and the height of summer|El Día de la Victoria y el pico del verano|La fête de la Victoire et le pic de l'été|戦勝記念日と夏の頂点"),
    t: t(
      "The thirtieth of August marks the decisive 1922 battle that ended the war of independence, celebrated nationwide with parades and fireworks at the very peak of the summer heat, when even the usual evening breeze off the water barely takes the edge off. Karakoncolos, like everyone else, takes the month off.|El treinta de agosto marca la batalla decisiva de 1922 que puso fin a la guerra de independencia, celebrada en todo el país con desfiles y fuegos artificiales justo en el pico del calor veraniego.|Le trente août marque la bataille décisive de 1922 qui mit fin à la guerre d'indépendance, célébrée dans tout le pays par des défilés et des feux d'artifice au tout point culminant de la chaleur estivale.|8月30日はトルコ独立戦争を終わらせた1922年の決定的な戦いを記念する日で、全国でパレードと花火が催される。夏の暑さがちょうど頂点を迎え、水辺からのいつもの夕風もほとんど涼を運んでくれない時期である。カラコンジョロスも、誰もと同じくこの月は休む。",
    ),
    f: t(
      "The battle it commemorates, at Dumlupınar, is still studied in military academies for the speed of the follow-up offensive that drove opposing forces to the coast within weeks, a campaign Atatürk himself led from the front.|La batalla que conmemora, en Dumlupınar, se sigue estudiando en academias militares por la rapidez de la ofensiva de seguimiento que empujó a las fuerzas contrarias hasta la costa en semanas, una campaña que el propio Atatürk dirigió desde el frente.|La bataille qu'elle commémore, à Dumlupınar, est encore étudiée dans les académies militaires pour la rapidité de l'offensive qui suivit, repoussant les forces adverses jusqu'à la côte en quelques semaines, une campagne qu'Atatürk mena lui-même en première ligne.|この日が記念するドゥムルプナルの戦いは、その後の追撃が数週間のうちに敵対勢力を海岸まで押し戻した速さでいまも軍の学校で研究されている。アタテュルク自身が前線に立って指揮した戦役である。",
    ),
  },
  {
    e: "🍇",
    n: t("The grape harvest begins|Comienza la vendimia|Les vendanges commencent|ブドウの収穫が始まる"),
    t: t(
      "Thrace's vineyards and the Aegean's hillsides both bring in the grape harvest through September, some of it pressed for wine, much more of it dried on rooftops and open ground into raisins or boiled down slowly into pekmez, a thick grape molasses used the way honey is used elsewhere.|Los viñedos de Tracia y las laderas del Egeo recogen ambos la vendimia a lo largo de septiembre; parte se prensa para vino, y mucha más se seca en tejados y al aire libre para pasas o se cuece lentamente hasta convertirse en pekmez.|Les vignobles de Thrace et les coteaux égéens rentrent tous deux les vendanges en septembre ; une partie est pressée pour le vin, mais bien plus est séchée sur les toits et en plein air pour faire des raisins secs ou cuite lentement en pekmez.|トラキアの葡萄畑とエーゲ海沿いの丘陵は、どちらも9月を通してブドウの収穫を迎える。一部はワインに搾られるが、それよりずっと多くが屋根や野外で干されて干しブドウになるか、ゆっくり煮詰められてペクメズと呼ばれる濃い葡萄糖蜜になり、他の土地で蜂蜜が使われるように使われる。",
    ),
    f: t(
      "Pekmez making traditionally doubled as a neighbourhood event, with families taking turns stirring enormous cauldrons of grape juice over an open fire for hours until it thickened, a task considered too important to leave to just one household.|Hacer pekmez era tradicionalmente también un evento de vecindario, con familias turnándose para remover enormes calderos de mosto sobre fuego abierto durante horas hasta que espesaba, una tarea considerada demasiado importante para dejarla a un solo hogar.|La fabrication du pekmez était traditionnellement aussi un événement de voisinage, les familles se relayant pour remuer d'énormes chaudrons de jus de raisin sur feu ouvert pendant des heures jusqu'à épaississement, une tâche jugée trop importante pour une seule famille.|ペクメズ作りは伝統的に近所総出の行事でもあり、各家庭が順番に、屋外の火にかけた巨大な鍋の葡萄汁を何時間もかき混ぜて煮詰めた。一軒だけに任せるには重要すぎる仕事とされていたためである。",
    ),
  },
  {
    e: "🇹🇷",
    n: t("Republic Day fills the squares|El Día de la República llena las plazas|La fête de la République remplit les places|共和国記念日が広場を埋める"),
    t: t(
      "The twenty-ninth of October marks the 1923 proclamation of the republic, the single most widely marked date on the calendar, with flags strung across entire streets and marching bands filling town squares from the capital down to the smallest coastal resort. Even shops that stay open on most holidays tend to close for at least the afternoon.|El veintinueve de octubre marca la proclamación de la república en 1923, la fecha más celebrada de todo el calendario, con banderas tendidas por calles enteras y bandas de música llenando las plazas desde la capital hasta el balneario costero más pequeño.|Le vingt-neuf octobre marque la proclamation de la République en 1923, la date la plus largement célébrée de tout le calendrier, avec des drapeaux tendus sur des rues entières et des fanfares emplissant les places, de la capitale jusqu'à la plus petite station balnéaire.|10月29日は1923年の共和国宣言を記念する日で、暦の中でも国じゅうで最も広く祝われる日である。街路いっぱいに国旗が張り渡され、首都から小さな海辺のリゾートまで、広場は楽隊で埋め尽くされる。ふだんは祝日でも開いている店でさえ、少なくとも午後は閉めることが多い。",
    ),
    f: t(
      "The republic was proclaimed by a vote in the Grand National Assembly that took just a few minutes once the groundwork had been laid, and Ankara, chosen as capital that same month, had been a town of well under 100,000 people barely more than a decade earlier.|La república se proclamó por una votación en la Gran Asamblea Nacional que llevó solo unos minutos una vez sentadas las bases, y Ankara, elegida capital ese mismo mes, había sido una localidad de bastante menos de 100.000 habitantes apenas una década antes.|La République fut proclamée par un vote de la Grande Assemblée nationale qui ne prit que quelques minutes une fois le terrain préparé, et Ankara, choisie comme capitale ce même mois, n'était guère plus qu'une bourgade de bien moins de 100 000 habitants à peine une décennie plus tôt.|共和国は大国民議会での採決によって宣言され、下準備さえ整っていれば採決自体はわずか数分で済んだ。同じ月に首都に選ばれたアンカラは、その十年ほど前まで人口10万人にも満たない町にすぎなかった。",
    ),
  },
  {
    e: "🫒",
    n: t("The olive harvest lines the Aegean groves|La cosecha de aceituna alinea los olivares del Egeo|La récolte des olives aligne les oliveraies égéennes|オリーブの収穫がエーゲの林を彩る"),
    t: t(
      "Nets are spread beneath centuries-old trees across the Aegean hillsides each November, and whole families turn out to comb or beat the branches by hand, racing to press the fruit within hours since olives left sitting too long make bitter oil. Some of the trees being harvested are reliably older than the republic itself, still bearing fruit after a thousand years or more.|Cada noviembre se extienden redes bajo árboles centenarios por las laderas egeas, y familias enteras salen a peinar o varear las ramas a mano, corriendo para prensar el fruto en pocas horas, pues las aceitunas dejadas demasiado tiempo dan un aceite amargo.|Chaque novembre, des filets sont étendus sous des arbres centenaires sur les coteaux égéens, et des familles entières sortent peigner ou gauler les branches à la main, se hâtant de presser le fruit en quelques heures, car des olives laissées trop longtemps donnent une huile amère.|11月になるとエーゲ海沿いの丘陵の何百年もの古木の下に網が広げられ、一家総出で手で枝をしごいたり叩いたりする。放置しすぎた実は苦い油になるため、数時間以内に搾油しようと急ぐ。収穫される木の中には確かに共和国そのものより古く、千年以上経ってもなお実をつけ続けているものもある。",
    ),
    f: t(
      "Ayvalık's soap-making tradition, kept alive by artisans who inherited the trade after the 1923 population exchange, still uses only olive oil, water and a caustic solution boiled for days in copper cauldrons rather than the synthetic additives most modern soap relies on.|La tradición jabonera de Ayvalık, mantenida viva por artesanos que heredaron el oficio tras el intercambio de población de 1923, sigue usando solo aceite de oliva, agua y una solución cáustica hervida durante días en calderos de cobre.|La tradition savonnière d'Ayvalık, maintenue en vie par des artisans ayant hérité du métier après l'échange de population de 1923, n'utilise encore que de l'huile d'olive, de l'eau et une solution caustique bouillie des jours durant dans des chaudrons de cuivre.|1923年の人口交換のあとにこの技を受け継いだ職人たちが守り続けるアイワルックの石鹸作りは、いまもオリーブ油と水、そして銅の大鍋で何日もかけて煮る苛性溶液だけを使い、現代の石鹸の多くが頼る合成添加物を使わない。",
    ),
  },
  {
    e: "🍊",
    n: t("Citrus groves turn orange along the coast|Los naranjales tiñen de naranja la costa|Les vergers d'agrumes dorent la côte|海岸の柑橘畑が橙色に色づく"),
    t: t(
      "The Mediterranean coast's mandarin and orange groves ripen through December, timed so that the sweetest fruit of the year lands right as the weather elsewhere turns cold enough that citrus feels like a small act of defiance against winter. Roadside stands along the highway sell net bags of them to drivers heading in every direction.|Los naranjales y mandarinales de la costa mediterránea maduran a lo largo de diciembre, justo cuando el clima en otras partes se vuelve lo bastante frío como para que el cítrico se sienta como un pequeño acto de desafío al invierno.|Les vergers de mandariniers et d'orangers de la côte méditerranéenne mûrissent tout au long de décembre, juste au moment où le climat ailleurs devient assez froid pour que l'agrume ait l'air d'un petit acte de défi contre l'hiver.|地中海沿岸のみかんとオレンジの果樹園は12月を通して実り、ちょうど他の土地の寒さが増す頃に一年でいちばん甘い実りを迎える。柑橘は冬への小さな抵抗のように感じられる。幹線道路沿いの露店では、あらゆる方向へ向かう車の運転手にネット袋入りの柑橘が売られる。",
    ),
    f: t(
      "Turkey ranks among the world's largest citrus exporters, and much of the Mediterranean coast's mandarin crop is picked slightly underripe on purpose so it survives the journey to colder export markets without spoiling.|Turquía figura entre los mayores exportadores de cítricos del mundo, y buena parte de la cosecha de mandarina de la costa mediterránea se recoge algo verde a propósito, para que sobreviva el viaje a mercados de exportación más fríos sin estropearse.|La Turquie compte parmi les plus grands exportateurs d'agrumes au monde, et une bonne part de la récolte de mandarines de la côte méditerranéenne est cueillie volontairement un peu verte, pour qu'elle survive au trajet vers des marchés d'exportation plus froids sans s'abîmer.|トルコは世界有数の柑橘輸出国で、地中海沿岸のみかんの収穫の多くは、寒い輸出先まで傷まずに届くよう、あえてわずかに熟しきる前に摘み取られる。",
    ),
  },
  {
    e: "🍬",
    n: t("Şeker Bayramı sweetens the whole country|Şeker Bayramı endulza todo el país|Şeker Bayramı adoucit tout le pays|シェケル・バイラムが国じゅうを甘くする"),
    t: t(
      "At the close of the fasting month, children go door to door in their best clothes kissing the hands of elders and pressing them to their foreheads in respect, collecting sweets and small coins in return, which is why the holiday's common name simply means \"sugar holiday\". Its date follows the lunar calendar and drifts against the seasons year to year, but this game keeps it fixed here for convenience.|Al final del mes de ayuno, los niños van de puerta en puerta con sus mejores ropas besando las manos de los mayores y llevándoselas a la frente en señal de respeto, y reciben a cambio dulces y monedas.|À la fin du mois de jeûne, les enfants font du porte-à-porte dans leurs plus beaux habits, baisant la main des aînés et la portant à leur front en signe de respect, recevant en retour bonbons et petites pièces.|断食月の終わりに、子どもたちは一張羅を着て家々を回り、目上の人の手に口づけして額に押しいただき敬意を表す。その代わりに菓子や小銭をもらう。この祝日が「砂糖の祭り」という通称で呼ばれるのはそのためである。日付は旧暦に従うため年ごとに季節をずれていくが、このゲームでは便宜上ここに固定してある。",
    ),
    f: t(
      "The holiday's formal name, Ramazan Bayramı, marks the end of a month of dawn-to-dusk fasting, and bakeries traditionally sell out of the syrup-soaked pastries and Turkish delight that give the popular nickname its sweetness.|El nombre formal de la fiesta, Ramazan Bayramı, marca el fin de un mes de ayuno de sol a sol, y las panaderías tradicionalmente agotan los dulces bañados en almíbar y el lokum que dan dulzura a su apodo popular.|Le nom officiel de la fête, Ramazan Bayramı, marque la fin d'un mois de jeûne de l'aube au crépuscule, et les pâtisseries épuisent traditionnellement leurs viennoiseries au sirop et leurs loukoums, qui donnent sa douceur au surnom populaire.|この祝日の正式名称ラマザン・バイラムは、夜明けから日没までの断食月の終わりを告げる。菓子屋では伝統的に、シロップ漬けの菓子やロクム(トルコ風グミ菓子)が売り切れる。この祝日の通称の甘さの由来である。",
    ),
  },
  {
    e: "🌑",
    n: t("Karakoncolos günleri, the darkest days|Karakoncolos günleri, los días más oscuros|Karakoncolos günleri, les jours les plus sombres|カラコンジョロス・ギュンレリ、いちばん暗い日々"),
    t: t(
      "Folk calendars mark early February as karakoncolos günleri, the handful of the year's coldest, darkest days when the demon is said to roam bridges and crossroads most freely, and older relatives still half-jokingly warn children not to walk home alone after dark this week. Heating bills across the country peak at exactly the same time.|Los calendarios populares marcan principios de febrero como karakoncolos günleri, el puñado de días más fríos y oscuros del año, cuando se dice que el demonio ronda con más libertad puentes y cruces, y los familiares mayores aún advierten medio en broma a los niños.|Les calendriers populaires désignent le début février comme karakoncolos günleri, la poignée de jours les plus froids et les plus sombres de l'année, où le démon rôderait le plus librement aux ponts et carrefours, et les aînés mettent encore les enfants en garde à moitié en plaisantant.|民間の暦では2月初めをカラコンジョロス・ギュンレリ、一年でいちばん寒く暗い数日と呼び、この悪鬼が橋や辻をいちばん自由に歩き回るとされる。年配の親族はいまも半分冗談めかして、この週は暗くなってから一人で帰らないよう子どもに言い聞かせる。国じゅうの暖房費もちょうど同じ時期にピークを迎える。",
    ),
    f: t(
      "The same cold-snap folk belief exists across much of the Balkans and the Caucasus under similar names, suggesting the tale travelled along trade and migration routes rather than staying confined to any one region.|La misma creencia popular sobre la ola de frío existe en buena parte de los Balcanes y el Cáucaso bajo nombres parecidos, lo que sugiere que el relato viajó por rutas comerciales y migratorias en vez de quedar confinado a una sola región.|La même croyance populaire liée à ce coup de froid existe dans une bonne partie des Balkans et du Caucase sous des noms proches, ce qui suggère que le récit a voyagé par les routes commerciales et migratoires plutôt que de rester confiné à une seule région.|同じ寒波にまつわる俗信は、似た名前でバルカン半島やコーカサス地方の広い範囲にも見られる。この話が一つの地域にとどまらず、交易や移住の道筋に沿って広まったことをうかがわせる。",
    ),
  },
  {
    e: "🔥",
    n: t("Nevruz bonfires greet the spring equinox|Las hogueras de Nevruz saludan el equinoccio de primavera|Les feux de Nevruz saluent l'équinoxe de printemps|ネヴルズの焚き火が春分を迎える"),
    t: t(
      "On the twenty-first of March, bonfires are lit on hillsides across the country to mark the new year of the old Turkic and Persian calendars, a celebration observed with particular scale and colour in the east and southeast, where crowds in traditional dress leap over the flames for luck before dawn. Snow is often still on the ground in the highlands even as the fires burn.|El veintiuno de marzo se encienden hogueras en las laderas de todo el país para marcar el año nuevo de los antiguos calendarios turco y persa, una celebración observada con especial magnitud y colorido en el este y el sureste.|Le vingt et un mars, des feux de joie sont allumés sur les coteaux à travers tout le pays pour marquer le nouvel an des anciens calendriers turcs et persans, une fête observée avec une ampleur et des couleurs particulières dans l'est et le sud-est.|3月21日、旧トルコ暦・ペルシャ暦の新年を祝って国じゅうの丘に焚き火が灯される。とりわけ東部・南東部では、伝統衣装をまとった群衆が夜明け前に幸運を願って炎を飛び越える、ひときわ規模と彩りのある祝いとなる。高地では、火が燃えているそばからまだ雪が残っていることも多い。",
    ),
    f: t(
      "Nevruz was for years a politically sensitive date in parts of the southeast, restricted or heavily policed at times, before being formally recognised as a national holiday in 1995, and it is now celebrated across a wide swath of Turkic, Persian and Kurdish-speaking regions from the Balkans to Central Asia.|Nevruz fue durante años una fecha políticamente sensible en partes del sureste, restringida o muy vigilada en ciertos momentos, antes de ser reconocida formalmente como fiesta nacional en 1995.|Nevruz fut pendant des années une date politiquement sensible dans certaines parties du sud-est, restreinte ou étroitement surveillée par moments, avant d'être officiellement reconnue comme fête nationale en 1995.|ネヴルズは長年、南東部の一部で政治的に微妙な日とされ、時には制限や厳重な警備の対象にもなっていたが、1995年に正式に国民の祝日として認められた。いまはバルカン半島から中央アジアまで、トルコ系・ペルシャ系・クルド語圏の広い範囲で祝われている。",
    ),
  },
];
