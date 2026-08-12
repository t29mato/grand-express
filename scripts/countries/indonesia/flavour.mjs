/**
 * インドネシアの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・フランス・インド・韓国・イタリアと同じく「地方まるごとの好不況」で
 * 差をつける。実際の効果は `src/infrastructure/content/season-and-doom-rules.ts`
 * 側に置く。
 *
 * ## 通貨倍率について
 *
 * `cur.mul` は表示専用で、`property-economy.mjs` の `CURRENCY_MULTIPLIERS`
 * と同じ値を渡す(そちらは team-lead が登録する)。1円≒100ルピアなので、
 * 日本(×10000)と同じ実質的な買い物感覚に揃えるには
 * 10000 × 100 = 1,000,000 とすればよい。都市の物件価格の桁(200〜1600)は
 * イタリア・日本と同じ範囲に合わせてあるので、この倍率で為替1.8倍以内に
 * 収まる(1600×1,000,000 ÷ 100 ≒ ¥16,000,000。日本の¥12,000,000の1.33倍)。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const INDONESIA_META = {
  id: "indonesia",
  name: t("Indonesia|Indonesia|Indonésie|インドネシア"),
  blurb: t(
    "An archipelago of 17,000 islands strung across the equator, crossed by ferries, volcanoes, and a single Wallace Line|Un archipiélago de 17.000 islas repartidas a lo largo del ecuador, cruzado por ferris, volcanes y una sola Línea de Wallace|Un archipel de 17 000 îles égrenées le long de l'équateur, traversé de ferries, de volcans et d'une seule ligne de Wallace|赤道にまたがる1万7千の島々からなる列島。フェリーと火山、一本のウォーレス線が横切る",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (理由は上のファイル冒頭コメント参照)。
  cur: { pre: "Rp", post: "", mul: 1000000 },
  start: "jakarta",
  // ワヤン・クリ(影絵人形芝居)の四人組道化役、プナカワン。
  cpuNames: ["Semar", "Petruk", "Gareng", "Bagong"],
  // 国旗の赤・白に、寺院とバティックの金、熱帯の緑、海の青緑を添えた5色。
  stripe: ["#e8443f", "#f4f5f0", "#f5b31c", "#3f7a3f", "#1c6f7a"],
};

/** 6地方。 */
export const INDONESIA_REGIONS = {
  sum: t("Sumatra|Sumatra|Sumatra|スマトラ"),
  jav: t("Java|Java|Java|ジャワ"),
  nut: t("Bali and the Lesser Sunda Islands|Bali y las islas menores de la Sonda|Bali et les petites îles de la Sonde|バリと小スンダ列島"),
  kal: t("Kalimantan (Indonesian Borneo)|Kalimantan (Borneo indonesio)|Kalimantan (Bornéo indonésien)|カリマンタン(インドネシア領ボルネオ)"),
  sul: t("Sulawesi|Sulawesi|Célèbes|スラウェシ"),
  mlp: t("Maluku and Papua|Maluku y Papúa|Moluques et Papouasie|マルクとパプア"),
};

/**
 * アイテム9件。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 */
export const INDONESIA_ITEMS = {
  ojek: {
    e: "🏍️",
    price: 240,
    kind: "move",
    n: t("An Ojek Ride|Un viaje en ojek|Une course en ojek|オジェック(バイクタクシー)"),
    d: t(
      "Carried 8–12 squares. The driver knows a shortcut.|Te lleva de 8 a 12 casillas. El conductor conoce un atajo.|Emporté de 8 à 12 cases. Le chauffeur connaît un raccourci.|8〜12マス運ばれる。運転手は近道を知っている。",
    ),
    f: t(
      "Motorcycle taxis have filled the gap Indonesia's traffic leaves behind since long before ride-hailing apps existed, weaving between stalled cars down alleys too narrow for anything with four wheels. Drivers routinely memorize thousands of dead-end lanes that never made it onto any official map.|Los mototaxis llevan llenando el hueco que deja el tráfico de Indonesia desde mucho antes de que existieran las apps de transporte, colándose entre coches parados por callejones demasiado estrechos para cualquier cosa con cuatro ruedas. Los conductores suelen memorizar miles de callejones sin salida que nunca llegaron a ningún mapa oficial.|Les mototaxis comblent le vide laissé par les embouteillages indonésiens bien avant l'existence des applications de VTC, se faufilant entre les voitures à l'arrêt dans des ruelles trop étroites pour quatre roues. Les chauffeurs mémorisent souvent des milliers d'impasses qui ne figurent sur aucune carte officielle.|バイクタクシー(オジェック)は、配車アプリが登場するはるか前から、インドネシアの渋滞が残す隙間を埋めてきた。止まった車のあいだを縫い、四輪では通れないほど狭い路地を抜けていく。運転手はどんな公式地図にも載っていない何千もの袋小路を頭に入れているのが普通である。",
    ),
  },
  jadwalkereta: {
    e: "📋",
    price: 380,
    kind: "pre",
    n: t("The Official Train Schedule|El horario oficial de trenes|L'horaire officiel des trains|公式列車時刻表(ジャドワル・クレタ)"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Java's rail network runs on a schedule printed and re-printed every few months as new routes open, and state railway staff still hand-adjust station clocks to the second before each departure, a holdover from an era when a late train could throw the whole single-track network into gridlock.|La red ferroviaria de Java funciona con un horario que se reimprime cada pocos meses según se abren nuevas rutas, y el personal ferroviario estatal aún ajusta a mano los relojes de las estaciones al segundo antes de cada salida.|Le réseau ferroviaire de Java suit un horaire réimprimé tous les quelques mois à mesure que de nouvelles lignes ouvrent, et le personnel des chemins de fer publics règle encore les horloges de gare à la seconde près avant chaque départ.|ジャワの鉄道網は、新しい路線が開通するたび数か月おきに刷り直される時刻表で動いており、国鉄の職員はいまも発車前に駅の時計を秒単位で手で合わせる。これは単線網では一本の遅れが全体の渋滞につながった時代の名残である。",
    ),
  },
  eksekutif: {
    e: "🎫",
    price: 360,
    kind: "pre",
    n: t("An Executive Class Ticket|Un billete de clase ejecutiva|Un billet classe exécutive|エクゼクティフ(1等)切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Indonesian trains sort passengers into economy, business, and executive classes on the same route, with executive seats reclining further and guaranteeing a numbered seat back when economy tickets were still first-come, first-seated. The price gap between the three can be several times over for barely an hour's difference in travel time.|Los trenes indonesios reparten a los pasajeros en clase económica, ejecutiva y de negocios en la misma ruta, con asientos ejecutivos que reclinan más y garantizan un número fijo, en una época en la que los billetes de económica aún eran de \"quien llega primero, se sienta\".|Les trains indonésiens répartissent les passagers en classes économique, affaires et exécutive sur un même trajet, les sièges exécutifs s'inclinant davantage et garantissant un numéro fixe, à une époque où les billets économiques restaient au premier arrivé, premier assis.|インドネシアの鉄道は同じ路線でもエコノミー・ビジネス・エクゼクティフの車両を分けており、エクゼクティフ席はより深く倒れ、エコノミー切符がまだ早い者勝ちの座席だった時代から指定席番号を保証していた。この三クラスの値段の差は、所要時間がわずか1時間ほどしか変わらなくても数倍に達することがある。",
    ),
  },
  argobromo: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("An Argo Express Ticket|Un billete Argo Express|Un billet Argo Express|アルゴ急行切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The Argo family of premium expresses, named Argo Bromo, Argo Parahyangan, and the like after volcanoes and old kingdoms, cut Jakarta–Surabaya travel from a full day of connections down to under nine hours when the fastest of them launched in the 1990s, and they remain the trains business travelers book first.|La familia de expresos Argo, con nombres como Argo Bromo o Argo Parahyangan por volcanes y antiguos reinos, redujo el viaje Yakarta-Surabaya de un día entero de conexiones a menos de nueve horas cuando el más rápido se estrenó en los años noventa.|La famille des express Argo, baptisés Argo Bromo, Argo Parahyangan et autres d'après des volcans et d'anciens royaumes, a réduit le trajet Jakarta-Surabaya d'une journée entière de correspondances à moins de neuf heures lors du lancement du plus rapide dans les années 1990.|火山や古い王国の名を冠したアルゴ・ブロモ、アルゴ・パラヒャンガンなどの「アルゴ」系優等列車は、1990年代に最速のものが登場した際、ジャカルタ―スラバヤ間を乗り継ぎ丸一日がかりだった旅を9時間足らずに縮めた。いまもビジネス客がまず予約する列車である。",
    ),
  },
  jimat: {
    e: "🪬",
    price: 320,
    kind: "passive",
    n: t("A Blessed Charm|Un amuleto bendecido|Un porte-bonheur béni|お守り(ジマット)"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "A jimat can be almost anything set aside for protection: a scrap of calligraphy, a stone, a keris dagger passed down for generations, blessed by a spiritual teacher and carried without ever being shown off, since a charm too openly displayed is widely believed to lose its quiet power.|Un jimat puede ser casi cualquier objeto apartado para dar protección: un trozo de caligrafía, una piedra, un kris heredado durante generaciones, bendecido por un maestro espiritual y llevado sin exhibirlo nunca, ya que se cree que un amuleto muy mostrado pierde su poder discreto.|Un jimat peut être presque n'importe quel objet mis de côté pour protéger : un bout de calligraphie, une pierre, un kriss transmis depuis des générations, béni par un maître spirituel et porté sans jamais l'exhiber, car un porte-bonheur trop montré est réputé perdre son pouvoir discret.|ジマットとは、身を守るために取っておかれるほぼどんな品でもよい。書の切れ端、石、代々受け継がれてきたクリス(短剣)などで、霊的な師に祝福してもらい、決してひけらかさずに身につける。あまり見せびらかすとお守りの静かな力が失われると広く信じられているためである。",
    ),
  },
  kemenyan: {
    e: "🌫️",
    price: 440,
    kind: "pre",
    n: t("Burning Benzoin Incense|Quemar incienso de benjuí|Brûler de l'encens benjoin|安息香の香(クメニャン)",
    ),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Kemenyan resin, tapped from benzoin trees grown mostly in the highlands of Sumatra, has been burned at doorways and gatherings across the archipelago for centuries to clear a space of restless spirits, and its heavy sweet smoke still opens most traditional ceremonies long before the event itself begins.|La resina de kemenyan, extraída de árboles de benjuí cultivados sobre todo en las tierras altas de Sumatra, se ha quemado durante siglos en puertas y reuniones de todo el archipiélago para despejar un lugar de espíritus inquietos, y su humo denso y dulce sigue abriendo la mayoría de las ceremonias tradicionales.|La résine de kemenyan, extraite d'arbres à benjoin cultivés surtout dans les hautes terres de Sumatra, est brûlée depuis des siècles aux portes et lors des rassemblements dans tout l'archipel pour chasser les esprits inquiets, et sa fumée lourde et sucrée ouvre encore la plupart des cérémonies traditionnelles.|主にスマトラの高地で育つ安息香の木から採れる樹脂クメニャンは、何世紀にもわたり列島各地の戸口や集まりで焚かれ、落ち着かない霊を場から追い払ってきた。その重く甘い煙は、いまも本番が始まるずっと前から多くの伝統儀礼の幕開けを飾る。",
    ),
  },
  contekan: {
    e: "📝",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("A Crib Note|Una chuleta|Une antisèche|カンニングペーパー(チョンテカン)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommée.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Contekan, notes smuggled into an exam folded small enough to hide in a pencil case or sleeve, are common enough across Indonesian schools that some teachers now write exam questions specifically designed to be useless against whatever crib sheet is already circulating that semester.|Las chuletas, o contekan, notas coladas en un examen dobladas lo bastante pequeñas para esconderlas en un estuche o una manga, son tan comunes en las escuelas indonesias que algunos profesores ya redactan preguntas de examen pensadas para inutilizar la chuleta que ya circula ese semestre.|Les contekan, ces notes glissées en examen, pliées assez petit pour se cacher dans une trousse ou une manche, sont assez répandues dans les écoles indonésiennes pour que certains professeurs rédigent désormais des questions conçues pour déjouer l'antisèche déjà en circulation ce semestre-là.|カンニングペーパー(チョンテカン)は、筆箱や袖に隠せるほど小さく折りたたんで試験に持ち込むもので、インドネシアの学校ではあまりに広く見られるため、教師の中にはその学期にすでに出回っているカンニングペーパーを見越して、それが役に立たないよう問題を作る者もいる。",
    ),
  },
  rejeki: {
    e: "🧧",
    price: 280,
    kind: "pre",
    n: t("An Unexpected Windfall|Un golpe de suerte inesperado|Un coup de chance inattendu|思いがけない授かりもの(レジェキ)"),
    d: t(
      "Sell it on and take the money.|Véndelo y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Rezeki broadly means any fortune that arrives without being earned through direct effort, from a found bill in an old jacket to an unexpected gift, and the word carries enough of a grateful, almost spiritual weight that Indonesians will often say it aloud on finding one, rather than simply pocketing it in silence.|Rezeki designa, en general, cualquier fortuna que llega sin haberse ganado con esfuerzo directo, desde un billete olvidado en una chaqueta vieja hasta un regalo inesperado, y la palabra tiene tanto peso de gratitud, casi espiritual, que muchos indonesios la dicen en voz alta al encontrarla.|Le rezeki désigne largement toute fortune qui arrive sans avoir été gagnée par un effort direct, d'un billet oublié dans une vieille veste à un cadeau inattendu, et le mot porte assez de poids reconnaissant, presque spirituel, pour que beaucoup d'Indonésiens le prononcent à voix haute en le trouvant.|「レジェキ」とは広く、直接の労働なしに舞い込むあらゆる幸運を指す言葉で、古い上着から出てきたお札から思いがけない贈り物まで含む。この言葉には感謝の念、ほとんど信仰に近い重みがあり、インドネシア人は見つけたとき黙って懐に入れるのではなく、しばしば口に出してその言葉を唱える。",
    ),
  },
  kenalan: {
    e: "🤝",
    price: 420,
    kind: "pre",
    n: t("A Word from Someone You Know|Una palabra de un conocido|Un mot de quelqu'un que tu connais|知り合いの一声(クナラン)"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Having kenalan, a personal connection, in the right office is treated across Indonesia as an entirely ordinary way to get paperwork moving faster, and small talk before any real business begins is less politeness than a genuine search for a shared acquaintance, hometown, or old classmate to build the connection on.|Tener kenalan, un contacto personal, en la oficina adecuada se trata en toda Indonesia como una forma del todo normal de agilizar trámites, y la charla previa a cualquier gestión es menos cortesía que una búsqueda real de un conocido, un pueblo o un excompañero de clase en común.|Avoir un kenalan, une relation personnelle, au bon bureau est traité dans toute l'Indonésie comme une façon parfaitement banale d'accélérer les démarches, et la conversation avant toute affaire sérieuse relève moins de la politesse que d'une vraie recherche de connaissance, de ville natale ou d'ancien camarade de classe communs.|しかるべき役所に「クナラン」(個人的なつながり)を持つことは、インドネシアではごく当たり前の手続き促進の手段とされている。本題に入る前の世間話は礼儀というより、共通の知人や出身地、昔の同級生を探り当てて縁を結ぶための本気の探索である。",
    ),
  },
};

/**
 * 厄災の神。インドネシアの民話に伝わるトゥユル(禿げ頭の幼児の姿をした
 * 小さな精霊。持ち主に小銭を盗んでくるいたずら好き)にした。悪霊ではなく、
 * 気に入られれば富をもたらし、からかわれれば悪さをするという二面性を持つ
 * (韓国のトッケビ・イタリアのモナチェッロと同じく「残酷ではなく、ただ度が
 * 過ぎる」性格)。
 */
export const INDONESIA_SPIRIT = {
  e: "👶",
  n: t("The Tuyul|El Tuyul|Le Tuyul|トゥユル"),
  big: t("The Tuyul's Great Mischief|La gran travesura del Tuyul|La grande espièglerie du Tuyul|トゥユルの大いたずら"),
  ward: "jimat",
  arrive: t(
    "<b>👶 A tuyul has taken an interest in you.</b> Folk tales describe a small bald child-spirit, mischievous rather than cruel, who slips into pockets and cash drawers to pinch loose coins and carry them off to whoever it has decided to favor. It now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>👶 Un tuyul se ha fijado en ti.</b> Los cuentos populares describen a un pequeño espíritu infantil calvo, travieso más que cruel, que se cuela en bolsillos y cajas de dinero para robar monedas sueltas y llevárselas a quien haya decidido favorecer. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>👶 Un tuyul s'est intéressé à toi.</b> Les contes populaires décrivent un petit esprit-enfant chauve, espiègle plutôt que cruel, qui se glisse dans les poches et les tiroirs-caisses pour y piquer des pièces et les porter à celui qu'il a choisi de favoriser. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>👶 トゥユルに目を付けられた。</b> 民話によれば、これは禿げ頭の幼児の姿をした小さな精霊で、残酷というよりいたずら好きとされる。ポケットや金庫にそっと忍び込んでは小銭をつまみ出し、自分が気に入った相手のもとへ運んでいく。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "👶 <b>The tuyul</b> loses interest and slips after <b>{0}</b>, farthest from {1}.|👶 <b>El tuyul</b> pierde el interés y se desliza tras <b>{0}</b>, el más lejano de {1}.|👶 <b>Le tuyul</b> se désintéresse et se faufile vers <b>{0}</b>, le plus loin de {1}.|👶 <b>トゥユル</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへすり抜けていった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the tuyul and never once shared so much as a snack. It decides the whole road needs teaching a lesson and its small bare feet break into a run — <b>the Tuyul's Great Mischief</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al tuyul sin haber compartido siquiera un tentempié. Decide que todo el camino necesita una lección y sus piececitos descalzos echan a correr: empieza <b>la gran travesura del Tuyul</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le tuyul sans jamais avoir partagé ne serait-ce qu'une friandise. Il décide que toute la route mérite une leçon et ses petits pieds nus se mettent à courir — <b>la grande espièglerie du Tuyul</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもトゥユルと歩いていながら、おやつのひとつも分けてやらなかった。彼は道中すべてに思い知らせてやろうと、裸足の小さな足で駆け出す。<b>トゥユルの大いたずら</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> some tellings say a tuyul must be kept fed and entertained like an actual child, or it turns spiteful toward its own keeper — the same small spirit that fills a purse can just as easily start emptying it.|<b>Tras la historia:</b> algunas versiones dicen que a un tuyul hay que alimentarlo y entretenerlo como a un niño de verdad, o se vuelve rencoroso hasta con su propio dueño; el mismo espíritu pequeño que llena un monedero puede empezar a vaciarlo con la misma facilidad.|<b>Derrière l'histoire :</b> certaines versions disent qu'un tuyul doit être nourri et diverti comme un véritable enfant, sous peine de se retourner contre son propre gardien — le même petit esprit qui remplit une bourse peut tout aussi bien se mettre à la vider.|<b>物語の背景:</b> 一部の言い伝えでは、トゥユルは本物の子どものように食事を与え遊んでやらなければ、飼い主自身に対しても意地悪になるとされる。財布を満たしていた同じ小さな精霊が、同じくらい簡単にそれを空にし始めることもある。",
  ),
  pleased: t(
    "It grins and presses a small coin into your palm before scampering off between your feet. <b>{0}</b> gains <span class='money'>+{1}</span>.|Sonríe y te pone una monedita en la palma antes de escabullirse entre tus pies. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il sourit et te glisse une petite pièce dans la main avant de filer entre tes pieds. <b>{0}</b> gagne <span class='money'>+{1}</span>.|にやりと笑って手のひらに小銭を一枚押し付けると、足のあいだをすり抜けて走り去った。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A blessed charm hangs quietly out of sight, and the tuyul — well trained never to cross a charm it can sense but not find — passes by <b>{0}</b> without noticing this turn.|Un amuleto bendecido cuelga tranquilamente fuera de la vista, y el tuyul —bien enseñado a no cruzar un amuleto que percibe pero no encuentra— pasa de largo junto a <b>{0}</b> sin percatarse esta vuelta.|Un porte-bonheur béni pend tranquillement hors de vue, et le tuyul — bien dressé à ne jamais franchir un porte-bonheur qu'il sent sans le trouver — passe devant <b>{0}</b> sans le remarquer ce tour-ci.|お守りが人目につかない場所で静かに下がっており、感じ取れても見つけられない御守りには決して逆らわないよう躾けられているトゥユルは、このターン <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。トゥユルのいたずら好きな性格に合わせ、日々の小さな不運として書いてある。 */
export const INDONESIA_DOOM = [
  {
    id: "tilang",
    n: t("Flagged down for a traffic ticket|Te paran para una multa de tráfico|Arrêté pour une amende de circulation|交通取締りで切符を切られる"),
    t: t(
      "The officer's whistle blew for a lane change that seemed perfectly ordinary a second earlier, and the roadside negotiation over the fine took longer than the violation itself ever could have. Traffic police checkpoints appear and vanish with no fixed schedule, and drivers who commute the same route daily still cannot predict where the next one will be.|El silbato del agente sonó por un cambio de carril que un segundo antes parecía de lo más normal, y la negociación al borde de la carretera sobre la multa duró más que la propia infracción. Los controles de la policía de tráfico aparecen y desaparecen sin horario fijo.|Le sifflet de l'agent a retenti pour un changement de voie qui semblait pourtant tout à fait normal une seconde plus tôt, et la négociation au bord de la route sur l'amende a duré plus longtemps que l'infraction elle-même n'aurait jamais pu. Les contrôles de police routière apparaissent et disparaissent sans horaire fixe.|一秒前まではごく普通に見えた車線変更に、警官の笛が鳴った。道端での罰金交渉は、違反そのものよりもずっと長くかかった。交通警察の検問はいつ現れいつ消えるか決まっておらず、毎日同じ道を通る運転手でさえ次にどこに現れるか読めない。",
    ),
  },
  {
    id: "banjir",
    n: t("A seasonal flood soaks the cargo|Una inundación de temporada empapa la carga|Une crue saisonnière trempe la cargaison|季節の洪水で荷物が水浸しになる"),
    t: t(
      "The drain that usually handled the afternoon downpour backed up within minutes, and water crept ankle-deep across the platform before anyone thought to move the boxes stacked near the tracks. Low-lying stretches of the country flood on a schedule regular enough that some households keep a second floor built specifically for the wet season.|El desagüe que normalmente aguantaba el chaparrón de la tarde se atascó en minutos, y el agua subió hasta el tobillo por el andén antes de que a nadie se le ocurriera mover las cajas apiladas cerca de las vías. Los tramos bajos del país se inundan con una regularidad tal que algunas casas tienen un segundo piso pensado justo para la temporada de lluvias.|Le caniveau qui absorbait d'habitude l'averse de l'après-midi a débordé en quelques minutes, et l'eau est montée jusqu'à la cheville sur le quai avant que quiconque ne pense à déplacer les cartons empilés près des voies. Les zones basses du pays sont inondées à intervalles assez réguliers pour que certains foyers gardent un étage bâti spécialement pour la saison des pluies.|いつもなら午後の土砂降りをさばいていた排水溝が数分で詰まり、線路際に積んであった箱を誰かが動かそうと思う前に、ホームには足首まで水が這い上がっていた。この国の低地はあまりに規則的に浸水するため、雨季のためだけに二階を作っている家もある。",
    ),
    months: [7, 8, 9],
  },
  {
    id: "macet",
    n: t("Gridlock swallows the whole afternoon|Un atasco se traga toda la tarde|Un embouteillage engloutit tout l'après-midi|渋滞に午後まるごと飲み込まれる"),
    t: t(
      "The intersection ahead had been clear five minutes earlier, and then it simply was not, three lanes of motorbikes and cars folding into a single knot that no traffic officer's whistle seemed able to loosen. Macet is common enough in the big cities that commuters build an extra hour into any plan almost automatically, then still sometimes need two.|El cruce de delante estaba despejado cinco minutos antes, y luego, sencillamente, dejó de estarlo: tres carriles de motos y coches se enredaron en un solo nudo que ningún silbato de agente parecía capaz de deshacer. El atasco (macet) es tan común en las grandes ciudades que los que se desplazan a diario añaden una hora extra a cualquier plan casi automáticamente.|Le carrefour, dégagé cinq minutes plus tôt, a soudain cessé de l'être : trois voies de motos et de voitures se sont nouées en un seul embouteillage qu'aucun coup de sifflet policier ne semblait pouvoir dénouer. Le macet est assez courant dans les grandes villes pour que les habitués y ajoutent presque automatiquement une heure de marge, et qu'il en faille parfois deux.|5分前までは空いていた交差点が、気づけばそうではなくなっていた。三車線を埋めるバイクと車がひとつの結び目になり、警官の笛ではほどけそうになかった。渋滞(マチェット)は大都市ではあまりに日常的なため、通勤する人はほぼ反射的に予定に1時間の余裕を見込むが、それでも足りず2時間かかることもある。",
    ),
  },
  {
    id: "kebakaran",
    n: t("A market stall fire spreads fast|Un incendio en el mercado se propaga rápido|Un incendie dans un stand de marché se propage vite|市場の火事があっという間に燃え広がる"),
    t: t(
      "A cooking-gas canister hissed, then caught, and within minutes the fire had jumped from one tightly packed stall to the next along a row of wooden frames and tarpaulin roofs never designed with much space between them. Traditional markets across the country rebuild after fires often enough that some vendors keep their most valuable stock at home overnight rather than in the stall.|Una bombona de gas de cocina silbó, prendió, y en minutos el fuego había saltado de un puesto a otro por una fila de estructuras de madera y toldos nunca pensados para tener mucho espacio entre sí. Los mercados tradicionales del país se reconstruyen tras incendios con la frecuencia suficiente como para que algunos vendedores guarden en casa su mercancía más valiosa por la noche.|Une bonbonne de gaz de cuisine a sifflé, puis pris feu, et en quelques minutes l'incendie avait sauté d'un stand serré à l'autre le long d'une rangée de structures en bois et de bâches jamais pensées pour laisser beaucoup d'espace entre elles. Les marchés traditionnels du pays se reconstruisent après des incendies assez souvent pour que certains vendeurs gardent leur marchandise la plus précieuse chez eux la nuit.|調理用ガスボンベがシューという音を立てたかと思うと火がつき、数分のうちに火は、あまり間隔を空けずに建てられた木枠とビニール屋根の露店が並ぶ列を、一軒また一軒と飛び移っていった。この国の伝統市場は火事のあと建て直すことがあまりに多いため、いちばん値打ちのある商品は店ではなく夜間は自宅に置いておく商人もいる。",
    ),
  },
  {
    id: "kalahdomino",
    n: t("Losing badly at dominoes on the porch|Perdiendo feo al dominó en el porche|Une lourde défaite au domino sous la véranda|軒先のドミノで大負けする"),
    t: t(
      "The tiles kept coming up wrong for four rounds straight while the rest of the table's luck seemed to run the opposite way entirely, and the agreed forfeit — coffee and fried snacks for everyone still sitting — added up faster than the game itself. Warung coffee stalls host these games most evenings, and the stakes rarely rise above the price of a round of kopi.|Las fichas seguían saliendo mal cuatro rondas seguidas mientras la suerte del resto de la mesa parecía ir justo al revés, y la penitencia acordada —café y fritos para todos los que seguían sentados— se acumuló más rápido que la propia partida. Los puestos de café warung acogen estas partidas casi todas las noches.|Les dominos sortaient mal quatre manches d'affilée pendant que la chance du reste de la table semblait tourner exactement à l'inverse, et le gage convenu — café et fritures pour tous ceux encore assis — s'est accumulé plus vite que la partie elle-même. Les échoppes à café warung accueillent ces parties presque tous les soirs.|4回続けて牌が悪く出る一方、卓の他の面々にはまったく逆の運が回っているようだった。取り決めた罰(まだ座っている全員分のコーヒーと揚げ菓子)は、勝負そのものよりも早く積み上がっていった。ワルン(屋台の食堂)のコーヒー台ではほぼ毎晩こうした勝負が行われており、賭け金がコーヒー一杯分を超えることはめったにない。",
    ),
  },
  {
    id: "salahnaik",
    n: t("Boarding the wrong bus entirely|Subiendo al autobús equivocado por completo|Monter carrément dans le mauvais bus|まったく違うバスに乗ってしまう"),
    t: t(
      "Two buses with nearly identical destination boards, one bound for the terminal and one for a town two hours past it, idled side by side at the same stop, and only well down the road did the driver's answer to a casual question reveal the mistake. Route numbers help in the big cities, but rural terminals still rely mostly on a conductor shouting the destination out the open door.|Dos autobuses con carteles de destino casi idénticos, uno rumbo a la terminal y otro a un pueblo dos horas más allá, esperaban uno junto a otro en la misma parada, y solo bien avanzado el trayecto la respuesta del conductor a una pregunta casual reveló el error. Los números de ruta ayudan en las grandes ciudades, pero las terminales rurales aún dependen sobre todo de un cobrador gritando el destino por la puerta abierta.|Deux bus aux panneaux de destination presque identiques, l'un pour le terminal et l'autre pour une ville deux heures plus loin, patientaient côte à côte au même arrêt, et ce n'est que bien après le départ qu'une question anodine posée au chauffeur a révélé l'erreur. Les numéros de ligne aident dans les grandes villes, mais les gares routières rurales comptent encore surtout sur un contrôleur criant la destination par la porte ouverte.|ほとんど同じ行き先表示を掲げた二台のバスが同じ停留所に並んで停まっていた。一台はターミナル行き、もう一台はそこからさらに2時間先の町行きだった。だいぶ走ってから、何気ない質問への運転手の答えで初めて間違いに気づいた。大都市では路線番号が頼りになるが、地方のターミナルではいまも、開けたドアから車掌が行き先を叫ぶのが主な案内である。",
    ),
  },
  {
    id: "dicopet",
    n: t("Pickpocketed on a crowded angkot|Te roban la cartera en un angkot lleno|Détroussé dans un angkot bondé|満員のアンコットで財布をすられる"),
    t: t(
      "The angkot minibus was packed tight enough that nobody thought twice about the press of bodies at the last stop, and only when it came time to pay the fare did the missing wallet become obvious, the thief long since stepped off into the crowd. Riders who use these routes daily learn to keep valuables in a front pocket, buttoned, out of habit rather than any single bad experience.|La furgoneta angkot iba tan abarrotada que nadie se extrañó del apretujón de cuerpos en la última parada, y solo al llegar el momento de pagar el pasaje se hizo evidente la cartera desaparecida, con el ladrón ya bajado entre la multitud hacía rato. Los que usan estas rutas a diario aprenden, por costumbre, a llevar los objetos de valor en un bolsillo delantero abotonado.|Le minibus angkot était si bondé que personne n'a prêté attention à la cohue des corps au dernier arrêt, et ce n'est qu'au moment de payer le trajet que le portefeuille disparu est devenu évident, le voleur déjà descendu depuis longtemps dans la foule. Les usagers quotidiens de ces lignes apprennent, par habitude plus que par une mauvaise expérience précise, à garder leurs objets de valeur dans une poche avant boutonnée.|アンコット(乗合ミニバス)はぎゅう詰めで、最後の停留所での人の押し合いを誰も気に留めなかった。運賃を払おうとして初めて財布が無いことに気づいたが、盗んだ者はとうに人混みへ降りていた。この路線を毎日使う乗客は、これといった痛い経験がなくても習慣として、貴重品を前ポケットのボタンを留めてしまい込むようになる。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、日本・フランス・インド・
 * 韓国・イタリアと同じく地方まるごとの好不況で差をつける(効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の indonesia の項)。
 *
 * ラマダン/レバランは太陰暦なので年によって10〜11日ずつ早まる。ここでは
 * 「近年おおむね重なる4月」に置いているが、その旨を文中で断っている
 * (固定の祝日であるかのように書かない)。
 */
export const INDONESIA_SEASONS = [
  {
    e: "🌙",
    n: t("Ramadan and the great homecoming|El Ramadán y el gran regreso a casa|Le Ramadan et le grand retour au pays|ラマダンと大帰省"),
    t: t(
      "The Islamic calendar is lunar, so Ramadan drifts about ten days earlier each year and only currently falls in this stretch of the calendar; whenever it lands, the month of fasting from dawn to dusk ends with Lebaran, when tens of millions travel back to their home village at once, in what is likely the largest annual human migration on Earth. Ferries, trains, and toll roads run at capacity for days, and Bakauheni's crossing to Java has recorded waits stretching well past a full day.|El calendario islámico es lunar, así que el Ramadán se adelanta unos diez días cada año y ahora mismo cae en este tramo del calendario; cuando llega, el mes de ayuno de sol a sol termina con el Lebaran, cuando decenas de millones de personas vuelven de golpe a su pueblo natal, en lo que probablemente sea la mayor migración humana anual del planeta.|Le calendrier islamique étant lunaire, le Ramadan avance d'environ dix jours chaque année et tombe actuellement dans cette période ; quand il arrive, le mois de jeûne du lever au coucher du soleil s'achève par le Lebaran, où des dizaines de millions de personnes rentrent d'un coup dans leur village natal, dans ce qui est sans doute la plus grande migration humaine annuelle au monde.|イスラム暦は太陰暦のため、ラマダンは毎年およそ10日ずつ早まり、いまはこの時期に重なっている。いつ訪れるにせよ、夜明けから日没までの断食月はレバランで終わり、何千万もの人が一斉に故郷の村へ帰る、おそらく地球上最大の年次民族大移動が起こる。フェリーも鉄道も有料道路も何日も満杯で走り、バカウヘニのジャワ行き航路では丸一日を超える待ち時間が記録されたこともある。",
    ),
    f: t(
      "This mass homecoming is called mudik, and companies, banks, and government offices across the country close for the better part of a week to let it happen, one of the very few times of year when the whole nation effectively pauses at once.|Este regreso masivo se llama mudik, y empresas, bancos y oficinas del gobierno de todo el país cierran durante buena parte de una semana para permitirlo, una de las pocas veces al año en que toda la nación se detiene efectivamente a la vez.|Ce grand retour au pays s'appelle mudik, et entreprises, banques et administrations ferment dans tout le pays pendant presque une semaine pour le permettre, l'une des rares périodes de l'année où toute la nation s'arrête effectivement d'un coup.|この大移動は「ムディック」と呼ばれ、これを可能にするため国じゅうの企業も銀行も役所も一週間近く休みになる。一年のうちでも、国全体がほぼ一斉に止まる数少ない時期の一つである。",
    ),
  },
  {
    e: "🏮",
    n: t("Waisak lanterns rise over Borobudur|Los faroles de Waisak se alzan sobre Borobudur|Les lanternes du Waisak s'élèvent au-dessus de Borobudur|ボロブドゥールに舞い上がるワイサックの灯籠"),
    t: t(
      "Waisak marks the Buddha's birth, enlightenment, and death all on the same night, and thousands of pilgrims walk from Mendut temple to Borobudur before releasing paper lanterns into the dark sky above the ancient stupas. Dry-season heat is building fast across the archipelago this month, and farmers race to finish the last irrigation work before the ground hardens.|El Waisak conmemora en una misma noche el nacimiento, la iluminación y la muerte de Buda, y miles de peregrinos caminan desde el templo de Mendut hasta Borobudur antes de soltar faroles de papel al cielo oscuro sobre las antiguas estupas. El calor de la temporada seca aumenta rápido este mes en todo el archipiélago.|Le Waisak commémore en une seule nuit la naissance, l'illumination et la mort du Bouddha, et des milliers de pèlerins marchent du temple de Mendut jusqu'à Borobudur avant de lâcher des lanternes de papier dans le ciel sombre au-dessus des anciens stupas. La chaleur de la saison sèche s'installe vite ce mois-ci dans tout l'archipel.|ワイサックは仏陀の誕生・悟り・入滅のすべてを同じ一晩で記念する祝日で、何千人もの巡礼者がムンドゥット寺院からボロブドゥールまで歩き、古いストゥーパの上の暗い空へ紙の灯籠を放つ。今月は列島全体で乾季の暑さが急速に強まり、農家は地面が固まる前に最後の灌漑作業を終えようと急ぐ。",
    ),
    f: t(
      "Only a small fraction of Indonesians are Buddhist today, concentrated partly among ethnic Chinese communities, yet Waisak at Borobudur draws visitors of every faith, since the monument itself belongs to the whole country's heritage rather than to any single religion still practiced there.|Solo una pequeña parte de los indonesios son budistas hoy, concentrados en parte entre las comunidades de origen chino, y aun así el Waisak en Borobudur atrae a visitantes de todas las creencias, ya que el monumento pertenece al patrimonio de todo el país y no a una sola religión practicada allí.|Seule une petite part des Indonésiens sont bouddhistes aujourd'hui, en partie concentrés parmi les communautés d'origine chinoise, et pourtant le Waisak à Borobudur attire des visiteurs de toutes confessions, le monument appartenant au patrimoine de tout le pays plutôt qu'à une seule religion encore pratiquée là.|現在インドネシアで仏教徒はごく一部で、その多くは華人系のコミュニティに集中しているが、ボロブドゥールのワイサックはあらゆる信仰の人を引き寄せる。この遺跡自体が、いまも実践される特定の宗教だけのものではなく、国全体の遺産に属しているためである。",
    ),
  },
  {
    e: "🐢",
    n: t("Calm seas and nesting turtles|Mares en calma y tortugas anidando|Mers calmes et tortues qui nidifient|凪の海とウミガメの産卵"),
    t: t(
      "The dry season settles in properly this month, flattening the seas enough that phinisi schooners and dive boats push further out than winter swells usually allow, while green and hawksbill turtles haul themselves onto quiet beaches like Sukamade at night to dig nests and lay clutches of a hundred eggs or more. Rangers now patrol many of these beaches to keep the nests from being raided before they hatch.|Este mes se asienta de verdad la temporada seca, aplanando el mar lo bastante para que las goletas phinisi y los barcos de buceo naveguen más lejos de lo que suele permitir el oleaje invernal, mientras tortugas verdes y carey se arrastran de noche hasta playas tranquilas como Sukamade para cavar nidos y poner más de cien huevos.|La saison sèche s'installe vraiment ce mois-ci, aplatissant la mer assez pour que les goélettes phinisi et les bateaux de plongée s'aventurent plus loin que la houle hivernale ne le permet d'habitude, tandis que tortues vertes et tortues imbriquées se hissent la nuit sur des plages tranquilles comme Sukamade pour creuser des nids et pondre une centaine d'œufs ou plus.|今月、乾季が本格的に定まり、海は冬のうねりが許すよりも遠くまでピニシ帆船やダイブボートが出られるほど穏やかになる。一方、アオウミガメやタイマイは夜、スカマデのような静かな浜に這い上がり、巣穴を掘って百個を超える卵を産みつける。多くの浜では現在、孵化する前に巣が荒らされないよう、レンジャーが巡回している。",
    ),
    f: t(
      "A single female turtle may return to the same stretch of beach where she herself hatched decades earlier to lay her own eggs, a homing instinct researchers still cannot fully explain, guided by some combination of the beach's magnetic signature and its exact angle to the open sea.|Una sola hembra de tortuga puede volver al mismo tramo de playa donde ella misma nació décadas antes para poner sus propios huevos, un instinto de regreso que los investigadores todavía no logran explicar del todo.|Une seule tortue femelle peut revenir sur le même tronçon de plage où elle est elle-même née des décennies plus tôt pour y pondre ses propres œufs, un instinct de retour que les chercheurs ne parviennent toujours pas à expliquer complètement.|一頭のメスガメは、自分自身が何十年も前に孵った同じ浜に戻って卵を産むことがある。この帰巣本能は、浜の磁気的な特徴と外洋に対する正確な角度の組み合わせによるとみられるが、研究者もいまだ完全には説明できていない。",
    ),
  },
  {
    e: "🍈",
    n: t("Durian, mango, and the new school year|Durián, mango y el nuevo curso escolar|Durian, mangue et la rentrée scolaire|ドリアン、マンゴー、新学期"),
    t: t(
      "Roadside stalls piled with spiky durian and boxes of ripe mango appear almost overnight this month, and the smell of durian alone is strong enough that many hotels and airlines ban it outright from their premises. Indonesian schools also begin their academic year in mid-July, so uniformed children crowd bus stops and train platforms on weekday mornings for the first time in weeks.|Los puestos callejeros llenos de duriones espinosos y cajas de mango maduro aparecen casi de la noche a la mañana este mes, y el olor del durián por sí solo es tan fuerte que muchos hoteles y aerolíneas lo prohíben directamente. Los colegios indonesios también empiezan el curso a mediados de julio.|Les étals de rue croulant sous les durians épineux et les caisses de mangues mûres apparaissent presque du jour au lendemain ce mois-ci, et la seule odeur du durian est assez forte pour que de nombreux hôtels et compagnies aériennes l'interdisent purement et simplement. Les écoles indonésiennes commencent aussi l'année scolaire à la mi-juillet.|とげだらけのドリアンと熟したマンゴーの箱を積んだ露店が、今月ほぼ一晩で現れる。ドリアンの匂いだけであまりに強烈なため、多くのホテルや航空会社が持ち込みを丸ごと禁じている。インドネシアの学校もまた7月半ばから新学期が始まり、平日の朝、久しぶりに制服姿の子どもたちがバス停や駅のホームにあふれる。",
    ),
    f: t(
      "Durian is legally banned from being carried onto many forms of Indonesian public transport, not because of any health concern but purely because its odor, which fans compare to custard and detractors to gym socks, is judged too overpowering to share in an enclosed space.|El durián está legalmente prohibido en muchos medios de transporte público indonesios, no por ningún problema de salud, sino solo porque su olor, que sus fans comparan con natillas y sus detractores con calcetines de gimnasio, se considera demasiado fuerte para compartir en un espacio cerrado.|Le durian est légalement interdit dans de nombreux transports publics indonésiens, non pour un quelconque risque sanitaire, mais uniquement parce que son odeur, que ses adeptes comparent à de la crème pâtissière et ses détracteurs à des chaussettes de sport, est jugée trop envahissante pour un espace clos.|ドリアンはインドネシアの多くの公共交通機関に法律で持ち込みが禁じられているが、それは健康上の理由ではなく、ただその匂いが密閉された空間で分かち合うにはあまりに強すぎると判断されているためである。好きな人はカスタードに、苦手な人は運動用の靴下にたとえる匂いである。",
    ),
  },
  {
    e: "🎇",
    n: t("Merdeka! Independence Day|¡Merdeka! Día de la Independencia|Merdeka ! Le jour de l'Indépendance|「ムルデカ!」独立記念日"),
    t: t(
      "August 17th fills every street with red-and-white bunting ahead of Indonesia's independence anniversary, and neighborhoods hold lomba games in place of formal ceremony: sack races, marble-and-spoon relays, and panjat pinang, where teams scramble up a greased areca-palm pole to grab prizes tied at the top. Even the tuyul takes the day off from mischief.|El 17 de agosto llena cada calle de banderines rojos y blancos antes del aniversario de la independencia de Indonesia, y los barrios organizan juegos lomba en vez de ceremonias formales: carreras de sacos, relevos de canica y cuchara, y el panjat pinang, en el que los equipos trepan por un poste de palma engrasado para agarrar premios atados arriba.|Le 17 août couvre chaque rue de fanions rouge et blanc à l'approche de l'anniversaire de l'indépendance indonésienne, et les quartiers organisent des jeux lomba plutôt que des cérémonies formelles : courses en sac, relais à la cuillère et à la bille, et le panjat pinang, où des équipes grimpent à un mât de palmier graissé pour attraper les prix attachés en haut.|8月17日を控え、あらゆる通りが赤白の飾り付けで埋まる。インドネシア独立記念日を祝い、各地区では堅苦しい式典の代わりに「ロンバ」と呼ばれる遊びが行われる。麻袋競走、スプーンとビー玉のリレー、そして油を塗ったビンロウジュの柱をよじ登り頂上に結わえた賞品を奪い合う「パンジャット・ピナン」などである。この日ばかりはトゥユルもいたずらを休む。",
    ),
    f: t(
      "Panjat pinang traces back to Dutch colonial-era festivals where locals were made to climb a greased pole for entertainment while colonists watched from below, and modern Independence Day celebrations deliberately reclaimed the game as one played by and for the community itself rather than as a spectacle for outsiders.|El panjat pinang se remonta a festividades de la época colonial holandesa, donde se hacía trepar a los lugareños por un poste engrasado como entretenimiento mientras los colonos miraban desde abajo, y las celebraciones modernas del Día de la Independencia reclamaron deliberadamente el juego como algo jugado por y para la propia comunidad.|Le panjat pinang remonte aux festivités de l'époque coloniale hollandaise, où les habitants étaient forcés de grimper à un mât graissé pour divertir les colons qui regardaient d'en bas, et les célébrations modernes de l'Indépendance ont délibérément réapproprié ce jeu comme une activité par et pour la communauté elle-même.|パンジャット・ピナンはオランダ植民地時代の祭りに起源をたどることができ、当時は地元の人々が下から見物する植民者を楽しませるため油を塗った柱を登らされていた。現代の独立記念日の祝いでは、この遊びを外の者への見世物としてではなく、地域社会自身のための、自身による遊びとしてあえて取り戻している。",
    ),
  },
  {
    e: "🌾",
    n: t("Harvest under a clear dry-season sky|Cosecha bajo un cielo despejado de temporada seca|Récolte sous un ciel dégagé de saison sèche|乾季の澄んだ空の下の稲刈り"),
    t: t(
      "Rice paddies planted back in the wet season turn gold and get cut by hand across much of the country this month, threshed on the spot and laid out on tarpaulins along roadsides to dry in sun strong enough that clouds rarely interrupt it for more than an hour. Phinisi crews also favor this month for longer inter-island runs, since the seas stay reliably calm from now through the next several weeks.|Los arrozales sembrados en la temporada de lluvias se vuelven dorados y se cosechan a mano en gran parte del país este mes, se trillan en el sitio y se extienden sobre lonas junto a las carreteras para secar bajo un sol tan fuerte que las nubes rara vez lo interrumpen más de una hora.|Les rizières plantées pendant la saison des pluies jaunissent et sont coupées à la main dans une bonne partie du pays ce mois-ci, battues sur place et étalées sur des bâches le long des routes pour sécher sous un soleil assez fort pour que les nuages l'interrompent rarement plus d'une heure.|雨季に植えられた田んぼは今月、国の多くの地域で黄金色になり手で刈り取られる。その場で脱穀され、道端のビニールシートの上に広げられて乾かされるが、日差しはあまりに強く、雲が1時間以上それを遮ることはめったにない。ピニシ帆船の乗組員もこの月を長距離の島間航海に好む。海が今後数週間、頼りになるほど穏やかに保たれるためである。",
    ),
    f: t(
      "Indonesia grows enough rice most years to feed itself, yet still imports some in lean years, since rice is treated as too politically sensitive a staple to risk a shortfall, and the government keeps a national reserve stockpile specifically to smooth over any bad harvest before prices spike.|Indonesia cultiva suficiente arroz la mayoría de los años para autoabastecerse, aunque aún importa algo en años flojos, ya que el arroz se trata como un producto básico demasiado sensible políticamente para arriesgarse a un déficit.|L'Indonésie cultive la plupart des années assez de riz pour se suffire à elle-même, mais en importe encore certaines années maigres, le riz étant traité comme une denrée de base trop sensible politiquement pour risquer une pénurie.|インドネシアはほとんどの年、自給できるだけの米を育てているが、不作の年にはいまも一部を輸入する。米は不足のリスクを冒せないほど政治的に敏感な主食とされており、政府は価格が跳ね上がる前に不作を穴埋めするための国家備蓄を専用に維持している。",
    ),
  },
  {
    e: "🖌️",
    n: t("Batik Day dresses the whole country|El Día del Batik viste a todo el país|Le jour du Batik habille tout le pays|バティックの日、国じゅうが着飾る"),
    t: t(
      "October 2nd marks National Batik Day, when offices, schools, and government buildings across the country ask everyone to wear batik rather than a uniform or suit, commemorating UNESCO's 2009 recognition of the wax-resist cloth as intangible cultural heritage. The first scattered rains of the transition toward wet season also begin to fall this month, though the ground still dries fast between them.|El 2 de octubre marca el Día Nacional del Batik, cuando oficinas, colegios y edificios del gobierno de todo el país piden a todos vestir batik en vez de uniforme o traje, en conmemoración del reconocimiento de la UNESCO en 2009 de esta tela de reserva de cera como patrimonio cultural inmaterial.|Le 2 octobre marque la Journée nationale du batik, où bureaux, écoles et bâtiments publics dans tout le pays demandent à chacun de porter du batik plutôt qu'un uniforme ou un costume, en commémoration de la reconnaissance par l'UNESCO en 2009 de ce tissu à réserve de cire comme patrimoine culturel immatériel.|10月2日はナショナル・バティック・デーで、国じゅうの職場や学校、役所がこの日は制服やスーツの代わりにバティックを着るよう呼びかける。2009年にユネスコが、この蝋染めの布を無形文化遺産として認めたことを記念するものである。乾季から雨季への移り変わりを告げるまばらな最初の雨もこの月から降り始めるが、地面はまだそのあいだにすぐ乾く。",
    ),
    f: t(
      "Batik patterns traditionally carried specific meanings and were once restricted by region and rank, with certain motifs reserved for royal courts, and the modern free mixing of styles from Java, Madura, and beyond on any given work shirt would have been unthinkable only a century or two ago.|Los patrones del batik llevaban tradicionalmente significados concretos y antes estaban restringidos por región y rango, con ciertos motivos reservados a las cortes reales, y la mezcla libre moderna de estilos de Java, Madura y más allá en una misma camisa de trabajo habría sido impensable hace uno o dos siglos.|Les motifs de batik portaient traditionnellement des significations précises et étaient autrefois réservés selon la région et le rang, certains motifs étant réservés aux cours royales, et le mélange libre moderne des styles de Java, Madura et d'ailleurs sur une même chemise de travail aurait été impensable il y a un ou deux siècles à peine.|バティックの文様は伝統的に特定の意味を持ち、かつては地方や身分によって制限され、ある種の文様は宮廷専用とされていた。現代のように、ジャワやマドゥラなど各地の様式を一枚の仕事着の上で自由に組み合わせることは、一世紀か二世紀前にはまったく考えられないことだった。",
    ),
  },
  {
    e: "🌱",
    n: t("Rice planting begins as the rains return|Empieza la siembra del arroz al volver las lluvias|La plantation du riz commence au retour des pluies|雨の戻りとともに始まる田植え",
    ),
    t: t(
      "Wet season sets in for most of the archipelago this month, and farmers wade into flooded paddies to transplant rice seedlings by hand in careful, evenly spaced rows, work still done in many villages as a communal effort called gotong royong rather than hired out individually. The tuyul, like everyone else, finds the muddy fields excellent hiding ground for its usual mischief.|La temporada de lluvias se instala en la mayor parte del archipiélago este mes, y los agricultores vadean los arrozales inundados para trasplantar a mano las plántulas de arroz en hileras cuidadas y equidistantes, trabajo que en muchos pueblos aún se hace como esfuerzo comunitario llamado gotong royong.|La saison des pluies s'installe ce mois-ci sur la majeure partie de l'archipel, et les agriculteurs pataugent dans les rizières inondées pour repiquer les plants de riz à la main en rangées soigneuses et régulières, un travail encore accompli dans de nombreux villages comme effort collectif appelé gotong royong.|今月、列島の大部分で雨季が定着し、農家は水を張った田んぼに入り、丁寧に等間隔の列を作りながら手で苗を植えていく。この作業はいまも多くの村で、個々に雇われるのではなく「ゴトン・ロヨン」と呼ばれる共同作業として行われている。トゥユルもまた、他の誰もと同じく、ぬかるんだ田んぼをいつものいたずらの絶好の隠れ場所と見なしている。",
    ),
    f: t(
      "Gotong royong, broadly meaning mutual, voluntary cooperation for shared community work, extends well beyond farming into everything from neighborhood cleaning days to funeral preparations, and is often cited as a founding value of Indonesian civic life written into early independence-era political thought.|Gotong royong, que significa en general cooperación mutua y voluntaria por el trabajo comunitario compartido, se extiende mucho más allá de la agricultura hasta jornadas de limpieza del barrio o preparativos funerarios, y a menudo se cita como valor fundacional de la vida cívica indonesia.|Le gotong royong, qui désigne largement une coopération mutuelle et volontaire pour un travail communautaire partagé, s'étend bien au-delà de l'agriculture jusqu'aux journées de nettoyage de quartier ou aux préparatifs funéraires, et est souvent cité comme une valeur fondatrice de la vie civique indonésienne.|「ゴトン・ロヨン」とは広く、共同体の仕事のための相互の自発的な協力を意味し、農業にとどまらず、近隣の清掃日から葬儀の準備まであらゆる場面に及ぶ。独立初期の政治思想に書き込まれた、インドネシアの市民生活の礎となる価値観としてしばしば引き合いに出される。",
    ),
  },
  {
    e: "🎄",
    n: t("Christmas in the Christian-majority east|Navidad en el este de mayoría cristiana|Noël dans l'est à majorité chrétienne|キリスト教多数派の東部のクリスマス"),
    t: t(
      "Christmas is celebrated warmly across the whole country as a public holiday, but it takes on particular local weight in Christian-majority regions like Manado, Toraja, Ambon, and much of Papua, where church services spill out into street processions and reunions pull extended families back from wherever work has scattered them. School holidays for the year-end break begin this month nationwide.|La Navidad se celebra con calidez en todo el país como fiesta nacional, pero cobra un peso especialmente local en regiones de mayoría cristiana como Manado, Toraja, Ambon y buena parte de Papúa, donde los oficios religiosos se derraman en procesiones callejeras y las reuniones traen de vuelta a familias extensas.|Noël est fêté chaleureusement dans tout le pays comme jour férié national, mais prend un poids particulièrement local dans les régions à majorité chrétienne comme Manado, Toraja, Ambon et une bonne partie de la Papouasie, où les offices débordent en processions de rue et les retrouvailles ramènent les familles élargies.|クリスマスは国じゅうで祝日として温かく祝われるが、マナドやタナトラジャ、アンボン、パプアの多くの地域などキリスト教多数派の地方では、とりわけ地元色の強い重みを持つ。教会の礼拝は通りの行列へとあふれ出し、仕事でばらばらになっていた大家族が呼び戻される。全国で年末休みの学校の長期休暇も今月から始まる。",
    ),
    f: t(
      "Indonesia recognizes six official religions, and public holidays are drawn from all of them by law, meaning the December calendar carries Christmas alongside whichever Islamic, Hindu, Buddhist, and Confucian observances fall nearby that year, a rotation few other countries attempt on a national scale.|Indonesia reconoce seis religiones oficiales, y por ley las fiestas públicas se toman de todas ellas, así que el calendario de diciembre lleva la Navidad junto a las festividades islámicas, hindúes, budistas y confucianas que caigan cerca ese año.|L'Indonésie reconnaît six religions officielles, et les jours fériés sont tirés par la loi de chacune d'elles, si bien que le calendrier de décembre porte Noël aux côtés des fêtes islamiques, hindoues, bouddhistes et confucéennes tombant à proximité cette année-là.|インドネシアは六つの宗教を公式に認めており、法律により祝日はそのすべてから選ばれる。そのため12月の暦には、クリスマスとともにその年たまたま近くに来るイスラム教・ヒンドゥー教・仏教・儒教それぞれの祭日が並ぶことになる。これほどの規模でこうした巡り合わせを国全体で行う国は、ほとんど他に例がない。",
    ),
  },
  {
    e: "🌧️",
    n: t("New Year at the height of the rains|Año Nuevo en pleno apogeo de las lluvias|Nouvel An au plus fort des pluies|雨季の真っただ中の新年"),
    t: t(
      "Wet-season rainfall peaks nationwide this month, and rivers that stayed comfortably within their banks all through the dry months now run high enough that low-lying neighborhoods in Jakarta and other coastal cities brace for flooding almost as a matter of routine. New Year's Eve fireworks still light up city skylines regardless, rain or clear.|La lluvia de temporada llega a su punto máximo en todo el país este mes, y los ríos que se mantuvieron cómodamente dentro de su cauce durante los meses secos ahora corren tan altos que los barrios bajos de Yakarta y otras ciudades costeras se preparan para inundaciones casi como rutina.|Les précipitations de la saison des pluies atteignent leur pic dans tout le pays ce mois-ci, et les rivières restées bien dans leur lit pendant les mois secs montent maintenant assez pour que les quartiers bas de Jakarta et d'autres villes côtières se préparent aux inondations presque en routine.|今月、国じゅうで雨季の降水量がピークを迎え、乾季のあいだは川岸に収まっていた川も、ジャカルタや他の沿岸都市の低地の街区がほぼ日常的な備えとして浸水に構えるほど水位を上げる。それでも大晦日の花火は、雨であろうと晴れであろうと街の空を彩る。",
    ),
    f: t(
      "Jakarta's flood-control system now includes giant pumps, retention basins, and a partly built sea wall meant to hold back both river flooding from inland and tidal flooding from the bay at once, an engineering problem made harder every year by the city's own ongoing subsidence.|El sistema de control de inundaciones de Yakarta incluye ahora bombas gigantes, embalses de retención y un muro marino parcialmente construido, pensado para contener a la vez las inundaciones fluviales del interior y las mareales de la bahía.|Le système de gestion des inondations de Jakarta comprend désormais des pompes géantes, des bassins de rétention et une digue marine partiellement construite, censée retenir à la fois les crues fluviales venues de l'intérieur et les inondations dues aux marées de la baie.|ジャカルタの治水システムには現在、巨大なポンプや遊水池、内陸からの河川氾濫と湾からの高潮氾濫を同時に食い止めるための、部分的に完成した防潮堤が含まれている。この土木上の課題は、街自体がいまも沈み続けているせいで年々難しくなっている。",
    ),
  },
  {
    e: "🧧",
    n: t("Imlek and red envelopes|El Imlek y los sobres rojos|L'Imlek et les enveloppes rouges|イムレックと紅包"),
    t: t(
      "Imlek, Chinese New Year, brings lion dances, lantern-lit temples, and red envelopes of money passed from elders to children across Indonesia's ethnic Chinese communities, a public holiday only formally recognized nationwide since 2003 after decades in which such celebrations were legally restricted. Everyone on the road today receives a small envelope of good fortune to carry with them.|El Imlek, el Año Nuevo chino, trae danzas del león, templos iluminados con faroles y sobres rojos con dinero que los mayores entregan a los niños en las comunidades chinas de Indonesia, festivo público reconocido formalmente en todo el país solo desde 2003, tras décadas en las que estas celebraciones estuvieron restringidas por ley.|L'Imlek, le Nouvel An chinois, apporte danses du lion, temples illuminés de lanternes et enveloppes rouges d'argent transmises des aînés aux enfants dans les communautés chinoises d'Indonésie, jour férié national reconnu formellement seulement depuis 2003, après des décennies où ces célébrations furent restreintes par la loi.|イムレック(旧正月)は、獅子舞や灯籠に照らされた寺院、年長者から子どもへ手渡される紅包(お年玉の赤い封筒)を、インドネシアの華人コミュニティにもたらす。こうした祝いが法律で制限されていた数十年ののち、全国的な祝日として正式に認められたのは2003年からにすぎない。この日、旅の道中にある誰もが、幸運を運ぶ小さな封筒を受け取る。",
    ),
    f: t(
      "Public celebration of Chinese culture, including Imlek, was banned under the Suharto government from 1967 until reforms began in the late 1990s, and the holiday's full return to national recognition is still within living memory for most of the community that celebrates it.|La celebración pública de la cultura china, incluido el Imlek, estuvo prohibida bajo el gobierno de Suharto desde 1967 hasta que empezaron las reformas a finales de los noventa, y el pleno regreso de la fiesta al reconocimiento nacional sigue dentro de la memoria viva de gran parte de la comunidad que la celebra.|La célébration publique de la culture chinoise, y compris l'Imlek, fut interdite sous le gouvernement Suharto de 1967 jusqu'au début des réformes à la fin des années 1990, et le retour complet de la fête à la reconnaissance nationale reste dans la mémoire vivante de la plupart de la communauté qui la célèbre.|中国文化の公然たる祝賀は、イムレックも含め1967年から1990年代末の改革が始まるまでスハルト政権下で禁じられており、この祝日が国として全面的に認められるまでの道のりは、いまも祝う当人たちの多くの記憶に生々しく残っている。",
    ),
  },
  {
    e: "🤫",
    n: t("Nyepi silences the whole island of Bali|El Nyepi hace callar toda la isla de Bali|Le Nyepi fait taire toute l'île de Bali|ニュピ、バリ島全体が静まりかえる日"),
    t: t(
      "On Nyepi, the Balinese Hindu Day of Silence, the entire island goes dark and quiet for 24 hours: no lights, no work, no travel, and no noise, with even the airport closing and hotel guests asked to stay indoors, since the tradition holds that a silent, seemingly empty island will convince wandering evil spirits there is nothing here worth bothering.|En el Nyepi, el Día del Silencio hindú-balinés, toda la isla se apaga y enmudece durante 24 horas: sin luces, sin trabajo, sin viajes y sin ruido, con el aeropuerto cerrado y los huéspedes de hotel invitados a quedarse dentro, ya que la tradición sostiene que una isla silenciosa y aparentemente vacía convencerá a los espíritus malignos errantes de que aquí no hay nada que perturbar.|Lors du Nyepi, le Jour du silence hindou-balinais, toute l'île s'éteint et se tait pendant 24 heures : ni lumière, ni travail, ni déplacement, ni bruit, l'aéroport fermant même et les clients d'hôtel étant priés de rester à l'intérieur, la tradition voulant qu'une île silencieuse et apparemment vide convainque les esprits malfaisants errants qu'il n'y a rien ici qui vaille la peine.|ヒンドゥー教のバリ島で行われるニュピ(静寂の日)には、島全体が24時間、灯りも仕事も移動も物音もない暗く静かな時間に入る。空港すら閉鎖され、宿泊客も屋内にとどまるよう求められる。静まり返って人気のないように見える島は、さまよう悪霊に「ここには構う値打ちのあるものが何もない」と思わせるという言い伝えによる。",
    ),
    f: t(
      "The day before Nyepi, villages parade enormous papier-mâché ogoh-ogoh effigies representing evil spirits through the streets and then burn them, a loud, colorful release meant to draw out and destroy any malevolent presence before the island falls completely silent the following dawn.|El día antes del Nyepi, los pueblos desfilan por las calles enormes figuras de papel maché llamadas ogoh-ogoh, que representan espíritus malignos, y luego las queman, una liberación ruidosa y colorida pensada para atraer y destruir cualquier presencia maligna antes de que la isla quede en completo silencio al amanecer siguiente.|La veille du Nyepi, les villages font défiler dans les rues d'énormes effigies en papier mâché, les ogoh-ogoh, représentant les esprits malins, avant de les brûler, un défoulement bruyant et coloré censé attirer puis détruire toute présence malveillante avant que l'île ne sombre dans le silence complet à l'aube suivante.|ニュピの前日、村々は悪霊を表す張り子の巨大な人形「オゴオゴ」を通りで練り歩かせたのち焼き払う。これは、翌朝島が完全な静寂に包まれる前に、あらゆる邪悪な存在をおびき出して滅ぼすための、騒々しく色鮮やかな解き放ちの儀式である。",
    ),
  },
];
