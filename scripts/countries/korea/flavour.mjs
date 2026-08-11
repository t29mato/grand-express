/**
 * 韓国の国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・フランス・インドと同じく「地方まるごとの好不況」で差をつける
 * (茨城のような県単位の盤面とは違い、地方どうしの経済差が大きいため)。
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

export const KOREA_META = {
  id: "korea",
  name: t("Korea|Corea|Corée|韓国"),
  blurb: t(
    "A ridged peninsula of palace roofs, port cities and a border that never became a wall|Una península escarpada de tejados de palacio, ciudades portuarias y una frontera que nunca fue muro|Une péninsule de crêtes, de toits de palais, de villes portuaires et d'une frontière qui n'est jamais devenue un mur|王宮の甍と港町が連なり、壁にならなかった国境を持つ半島の国",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (インド・フランス・世界一周・茨城と同じ理由。ここは他の3国と同じ暫定値100のまま)。
  cur: { pre: "₩", post: "", mul: 100 },
  start: "seoul",
  cpuNames: ["호랑이 Horangi", "까치 Kkachi", "해태 Haetae", "두꺼비 Dukkeobi"],
  // 太極旗の紅と藍、五方色の黄と青緑、韓紙の白。
  stripe: ["#c8102e", "#003478", "#f4c430", "#1a7a4c", "#f6efe2"],
};

/** 実際の道にならった6区分。 */
export const KOREA_REGIONS = {
  gg: t("Gyeonggi, around Seoul|Gyeonggi, en torno a Seúl|Gyeonggi, autour de Séoul|京畿(ソウルの周り)"),
  gw: t("Gangwon|Gangwon|Gangwon|江原"),
  cc: t("Chungcheong|Chungcheong|Chungcheong|忠清"),
  jl: t("Jeolla|Jeolla|Jeolla|全羅"),
  gs: t("Gyeongsang|Gyeongsang|Gyeongsang|慶尚"),
  jj: t("Jeju|Jeju|Jeju|済州"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 */
export const KOREA_ITEMS = {
  hak: {
    e: "🦢",
    price: 240,
    kind: "move",
    n: t("A Ride on the Crane|Un vuelo en la grulla|Une envolée sur la grue|鶴の背に乗って"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "In old paintings, immortals travel the mountains on the backs of cranes rather than walking them, and the bird was chosen for its height, its long life and its habit of appearing to arrive from nowhere. Nobody in the pictures ever seems to be steering.|En las pinturas antiguas, los inmortales recorren las montañas a lomos de grullas en vez de caminarlas; se eligió el ave por su altura, su longevidad y su costumbre de aparecer de la nada. En los cuadros nadie parece llevar las riendas.|Dans les vieilles peintures, les immortels traversent les montagnes sur le dos de grues plutôt qu'à pied ; l'oiseau fut choisi pour sa taille, sa longévité et sa manière de surgir de nulle part. Sur aucune image, personne ne semble tenir les rênes.|昔の絵の中で、仙人は山を歩かず鶴の背に乗って渡る。鶴が選ばれたのは、その丈の高さと長寿、そしてどこからともなく現れる姿ゆえである。どの絵を見ても、手綱を握っている者はいない。",
    ),
  },
  yeot: {
    e: "🍬",
    price: 380,
    kind: "pre",
    n: t("Exam-Day Taffy|Caramelo del día de examen|Confiserie du jour d'examen|受験のエヤッ"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "The same word, yeot, means both this sticky taffy and \"to stick\", so families press it onto the school gates on exam day hoping the result will stick the way the candy does. It is boiled down slowly enough that a batch can take most of a day.|La misma palabra, yeot, significa tanto este caramelo pegajoso como «pegarse», así que las familias lo colocan en las puertas del colegio el día del examen esperando que el resultado se pegue igual. Se cuece a fuego lento y una tanda puede llevar casi un día entero.|Le même mot, yeot, désigne à la fois cette confiserie collante et « coller », si bien que les familles la posent sur le portail de l'école le jour de l'examen en espérant que le résultat colle de la même façon. Elle mijote si lentement qu'une fournée peut prendre presque une journée entière.|엿という語は、この粘り気のある飴そのものと「くっつく」の両方を意味する。だから家族は試験の日、結果がくっつくようにと校門にこれを貼りつける。ゆっくり煮詰めるので、一回分に丸一日近くかかることもある。",
    ),
  },
  mugunghwa: {
    e: "🚆",
    price: 360,
    kind: "pre",
    n: t("Mugunghwa-ho Train|Tren Mugunghwa-ho|Train Mugunghwa-ho|無窮花号"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Named for the rose of Sharon, the national flower said to bloom without ever fully stopping, this is the slower of the two named train grades and stops at towns the high-speed line runs straight past. It has carried that name since 1955, longer than most of its passengers have been alive.|Llamado así por la rosa de Siria, la flor nacional que se dice florece sin detenerse nunca del todo, es el más lento de los dos rangos de tren con nombre y para en pueblos que la línea de alta velocidad se salta. Lleva ese nombre desde 1955.|Nommé d'après la rose de Sharon, la fleur nationale censée fleurir sans jamais tout à fait s'arrêter, c'est le plus lent des deux rangs de trains nommés, et il dessert des villes que la ligne à grande vitesse ne fait que traverser. Il porte ce nom depuis 1955.|絶えず咲き続けるとされる国花、むくげにちなんで名付けられた、名前付きの列車二種のうち遅いほうで、高速線が素通りする町にも停まる。1955年からこの名を名乗っており、多くの乗客より年上である。",
    ),
  },
  ktx: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("KTX Ticket|Billete de KTX|Billet KTX|KTX切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Opened in 2004 on tracks built partly straight through mountains rather than around them, the KTX cut the Seoul–Busan run from about six hours to under three. Engineers shortened it further in 2010 by boring one of the country's longest rail tunnels beneath a range the old line had spent an hour skirting.|Inaugurado en 2004 sobre vías que a veces atraviesan montañas en línea recta en vez de rodearlas, el KTX redujo el trayecto Seúl-Busan de unas seis horas a menos de tres. En 2010 se acortó aún más al perforar uno de los túneles ferroviarios más largos del país.|Ouvert en 2004 sur des voies parfois percées tout droit dans la montagne plutôt que contournées, le KTX a ramené le trajet Séoul-Busan d'environ six heures à moins de trois. En 2010, les ingénieurs l'ont encore raccourci en creusant l'un des plus longs tunnels ferroviaires du pays.|2004年に開業したKTXは、山を迂回せずまっすぐ貫く区間もある線路で、ソウル—釜山間をおよそ6時間から3時間足らずに縮めた。2010年にはさらに、旧線が迂回に1時間かけていた山地の下に国内屈指の長さのトンネルを掘って短縮した。",
    ),
  },
  patjuk: {
    e: "🥣",
    price: 320,
    kind: "passive",
    n: t("Winter Solstice Red Bean Porridge|Gachas de judía roja del solsticio|Bouillie de haricots rouges du solstice|冬至の小豆粥"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "On the shortest day of the year, households simmer a porridge of red beans and rice-flour balls and fling a spoonful at the gate and the doorposts before anyone eats, because red is held to repel bad spirits. Only after the throwing is done does the family sit down to its own bowl.|En el día más corto del año, las casas cuecen unas gachas de judía roja con bolitas de arroz y lanzan una cucharada a la puerta y los postes antes de que nadie coma, porque se cree que el rojo repele a los malos espíritus.|Le jour le plus court de l'année, les foyers font mijoter une bouillie de haricots rouges et de boulettes de riz, et en jettent une cuillerée sur le portail et les montants avant que quiconque ne mange, le rouge étant censé repousser les mauvais esprits.|一年でいちばん昼の短い日、家々は小豆と白玉を煮た粥を作り、誰も口をつける前に門や柱にひとさじ撒く。赤い色が悪い気を払うと信じられているからである。撒き終えてはじめて、家族は自分たちの椀に手をつける。",
    ),
  },
  bujeok: {
    e: "🧧",
    price: 440,
    kind: "pre",
    n: t("A Talisman in Red Ink|Un talismán de tinta roja|Un talisman à l'encre rouge|赤い墨の御札"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Shamans brush these charms in cinnabar-red ink on yellow paper, in characters meant to be read by spirits rather than people, and paste them over a door or carry them folded in a pocket. The colour and the paper are as much the point as anything written on them.|Los chamanes trazan estos talismanes con tinta bermellón sobre papel amarillo, en caracteres pensados para que los lean los espíritus y no las personas, y los pegan sobre una puerta o los llevan doblados en el bolsillo.|Les chamanes tracent ces talismans à l'encre vermillon sur papier jaune, en caractères destinés à être lus par les esprits plutôt que par les hommes, et les collent sur une porte ou les portent pliés en poche.|巫堂はこの御札を黄色い紙に朱の墨で書く。人ではなく霊に読ませるための文字とされる。戸口に貼るか、畳んで懐に入れて持ち歩く。書かれた文字そのものと同じくらい、色と紙が意味を持つ。",
    ),
  },
  jokbo: {
    e: "📚",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("The Old Exam Compilation|La recopilación de exámenes antiguos|Le recueil d'anciens examens|족보(過去問集)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Jokbo properly means a family's genealogy record, but students borrowed the word for a different kind of inheritance: a class's hoarded stack of a professor's old exam questions, handed down year after year. Having one is treated as half of studying.|Jokbo significa propiamente el registro genealógico de una familia, pero los estudiantes tomaron prestada la palabra para otra clase de herencia: la pila acumulada de exámenes antiguos de un profesor, transmitida año tras año. Tenerla se considera media tarea de estudio hecha.|Jokbo désigne à l'origine le registre généalogique d'une famille, mais les étudiants ont emprunté le mot pour un autre genre d'héritage : la pile amassée des anciens sujets d'examen d'un professeur, transmise d'année en année. En posséder un, c'est déjà la moitié du travail de révision.|族譜とは本来、一族の系図の記録を指す語だが、学生たちはこの語を別の遺産に借用した。教授の過去問を代々ため込んだ、学年から学年へ受け継がれる束のことである。それを持っているだけで、勉強の半分は済んだも同然とされる。",
    ),
  },
  yeopjeon: {
    e: "🪙",
    price: 280,
    kind: "pre",
    n: t("A Handful of Old Brass Coins|Un puñado de monedas antiguas de latón|Une poignée de vieilles pièces de laiton|古い葉銭"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-les et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "These round coins with a square hole in the centre were minted for ordinary use until the early twentieth century, strung together in the hundreds on a cord for carrying. Farmers still turn a few up while ploughing, and collectors pay more for a rusted one that can be dated than a clean one that cannot.|Estas monedas redondas con un agujero cuadrado en el centro se acuñaron para uso corriente hasta principios del siglo XX, y se ensartaban por centenares en una cuerda para llevarlas. Los agricultores aún desentierran alguna al arar.|Ces pièces rondes percées d'un trou carré au centre furent frappées pour l'usage courant jusqu'au début du XXe siècle, enfilées par centaines sur une corde pour le transport. Les paysans en déterrent encore parfois en labourant.|中央に四角い穴のあいたこの丸い銭は、20世紀初頭まで日常の通貨として鋳造され、何百枚も紐に通して持ち運ばれた。畑を耕せばいまも農家がふと掘り当てることがある。年代の分かる錆びた一枚のほうが、きれいだが由来の分からない一枚より高く売れる。",
    ),
  },
  ppalli: {
    e: "🛵",
    price: 420,
    kind: "pre",
    n: t("A Lightning-Delivery Coupon|Un cupón de reparto relámpago|Un bon de livraison éclair|번개배달クーポン"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "\"Ppalli-ppalli\", quickly-quickly, is said so often it has become a byword for the national impatience, and courier apps now promise groceries at the door within an hour of ordering. The coupon guarantees nothing about quality — only that it will arrive absurdly fast.|«Ppalli-ppalli», rápido-rápido, se dice tan a menudo que se ha vuelto sinónimo de la impaciencia nacional, y las apps de reparto ya prometen la compra en la puerta en menos de una hora. El cupón no garantiza nada sobre la calidad, solo que llegará absurdamente rápido.|« Ppalli-ppalli », vite-vite, se dit si souvent que c'est devenu le symbole de l'impatience nationale, et les applis de livraison promettent désormais les courses à la porte en moins d'une heure. Le bon ne garantit rien sur la qualité, seulement une arrivée absurdement rapide.|「パルリパルリ(早く早く)」はあまりに頻繁に言われるので、この国のせっかちさそのものの代名詞になっている。配達アプリはいまや注文から一時間以内に品物を届けると謳う。このクーポンは品質を何も保証しない。ただ、ばかげて速く届くというだけである。",
    ),
  },
};

/**
 * 厄災の神。朝鮮の民話に伝わるトッケビ(道具の化身とされる、いたずら好きの
 * 妖怪)にした。人を苦しめる悪霊ではなく、大きすぎる相撲好きとして描く
 * (茨城のダイダラボウと同じく「残酷ではなく、ただ度が過ぎるだけ」の性格)。
 */
export const KOREA_SPIRIT = {
  e: "🧌",
  n: t("The Dokkaebi|El Dokkaebi|Le Dokkaebi|トッケビ"),
  big: t("The Dokkaebi's Wrestling Match|El pulso de piernas del Dokkaebi|Le combat de lutte du Dokkaebi|トッケビの脚相撲"),
  ward: "patjuk",
  arrive: t(
    "<b>🧌 A dokkaebi has taken an interest in you.</b> Old tales say these goblins are born when a worn-out tool — a broom, a pestle stained with blood — wakes up on its own one night, mischievous rather than cruel, and forever looking for someone to wager with. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🧌 Un dokkaebi se ha fijado en ti.</b> Los cuentos dicen que estos duendes nacen cuando una herramienta gastada —una escoba, una maja manchada de sangre— despierta sola una noche, traviesa más que cruel, siempre buscando con quién apostar. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🧌 Un dokkaebi s'est intéressé à toi.</b> Les vieux contes disent que ces gobelins naissent quand un outil usé — un balai, un pilon taché de sang — s'éveille seul une nuit, espiègle plus que cruel, toujours en quête d'un pari. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🧌 トッケビに目を付けられた。</b> 昔話によれば、この妖怪は古びた道具――箒や血の付いた杵――がある夜ひとりでに目覚めて生まれるという。残酷なのではなく、ただのいたずら好きで、いつも賭け相手を探している。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🧌 <b>The dokkaebi</b> loses interest and hops after <b>{0}</b>, farthest from {1}.|🧌 <b>El dokkaebi</b> pierde el interés y salta tras <b>{0}</b>, el más lejano de {1}.|🧌 <b>Le dokkaebi</b> se désintéresse et bondit vers <b>{0}</b>, le plus loin de {1}.|🧌 <b>トッケビ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ跳んでいった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the dokkaebi and never once thrown him off balance. He grins and challenges the whole road to a wrestling match — <b>the Dokkaebi's Wrestling Match</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al dokkaebi sin haberlo derribado ni una vez. Él sonríe y reta a todo el camino a un pulso de piernas: empieza <b>el pulso de piernas del Dokkaebi</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le dokkaebi sans jamais l'avoir déséquilibré. Il sourit et défie toute la route à la lutte des jambes : <b>le combat de lutte du Dokkaebi</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもトッケビと歩いていながら、一度もその体勢を崩せなかった。彼はにやりと笑い、道行く者すべてに脚相撲を挑む。<b>トッケビの脚相撲</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> in the old tales a traveler could beat a dokkaebi at leg-wrestling because the goblin always pushes with the same leg — trip that one leg and he goes down for good and cannot get up until morning. Nobody playing this game has worked out which leg it is yet.|<b>Tras la historia:</b> en los viejos cuentos un viajero podía vencer a un dokkaebi en el pulso de piernas porque el duende siempre empuja con la misma pierna: si se la hace tropezar, cae y no puede levantarse hasta el alba. Nadie en esta partida ha averiguado aún cuál es esa pierna.|<b>Derrière l'histoire :</b> dans les vieux contes, un voyageur pouvait vaincre un dokkaebi à la lutte des jambes car le gobelin pousse toujours avec la même jambe : la lui faire trébucher et il reste au sol jusqu'à l'aube. Personne dans cette partie n'a encore découvert laquelle.|<b>物語の背景:</b> 昔話では、トッケビはいつも同じ脚で押してくるので、その脚さえ引っかければ倒れたまま朝まで起き上がれないという。旅人はそこを見極めれば脚相撲に勝てた。このゲームでは、まだ誰もどちらの脚か見極めていない。",
  ),
  pleased: t(
    "He swings his goblin's cudgel around to show off, and a coin bounces loose from it. <b>{0}</b> gains <span class='money'>+{1}</span>.|Blande su porra de duende para presumir y una moneda se le escapa. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il brandit son gourdin de gobelin pour frimer et une pièce s'en échappe. <b>{0}</b> gagne <span class='money'>+{1}</span>.|得意げに鬼の棍棒を振り回したはずみで、銭が一枚跳ねて落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A bowl of red bean porridge is set out where he can see it. Dokkaebi are said to hate red beans above everything, and he backs off, stepping past <b>{0}</b> without noticing this turn.|Se le pone delante un cuenco de gachas de judía roja. Dicen que los dokkaebi odian las judías rojas sobre todas las cosas, y retrocede, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|On dépose devant lui un bol de bouillie de haricots rouges. On dit que les dokkaebi détestent les haricots rouges par-dessus tout ; il recule et passe devant <b>{0}</b> sans le remarquer ce tour-ci.|見えるところに小豆粥の椀を置いた。トッケビは何より小豆を嫌うという。彼はひるんで後ずさり、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。トッケビのいたずら好きな性格に合わせ、大げさで滑稽な話にしてある。 */
export const KOREA_DOOM = [
  {
    id: "hwangsa",
    n: t("Yellow dust rolls in|Llega el polvo amarillo|La poussière jaune arrive|黄砂が降る"),
    t: t(
      "The sky turns the colour of weak tea by mid-morning, and everything left outside gets a fine grey coat by evening. The dust blows in most years from the deserts and drylands to the west, and masks, air filters and a windshield wash all come out of pocket at once.|El cielo se vuelve del color de un té flojo a media mañana, y todo lo que quedó fuera se cubre de un fino manto gris al atardecer. El polvo llega casi todos los años desde los desiertos del oeste, y hay que pagar mascarillas, filtros de aire y un lavado de parabrisas a la vez.|Le ciel prend la couleur d'un thé léger en milieu de matinée, et tout ce qui traînait dehors se couvre d'un fin manteau gris le soir venu. La poussière souffle presque chaque année depuis les déserts de l'ouest, et masques, filtres à air et lave-glace se paient tous d'un coup.|朝のうちに空が薄い茶の色になり、夕方には外に出しておいたものすべてに細かい灰色の膜が張る。この砂ぼこりはほとんど毎年、西の砂漠地帯から飛んでくる。マスクと空気清浄機のフィルターとフロントガラスの洗浄が、いっぺんに物入りになった。",
    ),
  },
  {
    id: "taepung",
    n: t("A typhoon crosses the coast|Un tifón cruza la costa|Un typhon traverse la côte|台風が海岸を通る"),
    t: t(
      "The storm was tracked for days before it arrived, and still it flattens whatever was not tied down. A season without at least one direct hit is unusual, so people here read a typhoon's path the way others read a weather forecast — as a matter of routine rather than alarm, right up until it is not.|La tormenta se siguió durante días antes de llegar, y aun así arrasa con lo que no estaba bien atado. Una temporada sin al menos un impacto directo es poco común, así que aquí se sigue la trayectoria de un tifón como quien lee un parte del tiempo, con rutina, hasta que deja de serlo.|La tempête fut suivie des jours durant avant d'arriver, et pourtant elle rase tout ce qui n'était pas arrimé. Une saison sans au moins un passage direct est rare, si bien qu'on y suit la trajectoire d'un typhon comme un bulletin météo ordinaire — jusqu'au jour où ça ne l'est plus.|嵐は上陸の何日も前から進路が追われていたが、それでも縛っていなかったものは何もかもなぎ倒す。一つも直撃のない年のほうが珍しいので、この土地の人は台風の進路をふつうの天気予報のように読む。それがただ事でなくなる、その日までは。",
    ),
    months: [3, 4],
  },
  {
    id: "poksol",
    n: t("Heavy snow shuts the line|La nevada cierra la línea|Une forte neige ferme la ligne|大雪で足止め"),
    t: t(
      "A metre of snow fell overnight on the wrong side of the mountains, and the road and the only train through are both closed until it is cleared. Passengers wait it out in the station buffet, buying instant noodles at three times the usual price and not complaining much, because there is nowhere else to go.|Cayó un metro de nieve durante la noche en el lado equivocado de las montañas, y tanto la carretera como el único tren quedan cerrados hasta que la despejen. Los pasajeros esperan en la cafetería de la estación, comprando fideos instantáneos al triple del precio de siempre.|Un mètre de neige est tombé pendant la nuit du mauvais côté des montagnes, et la route comme l'unique train sont fermés jusqu'au déblaiement. Les passagers patientent au buffet de la gare, achetant des nouilles instantanées au triple du prix habituel.|一夜で山の反対側に一メートルの雪が積もり、道路も唯一の鉄道も除雪が終わるまで閉ざされた。乗客は駅の売店でふだんの三倍の値段のカップ麺を買いながら待つほかない。ほかに行き場がないので、さして文句も出ない。",
    ),
    months: [9, 10],
  },
  {
    id: "sanbul",
    n: t("A wildfire takes the ridge|Un incendio forestal se lleva la cresta|Un incendie de forêt emporte la crête|山火事が尾根を焼く"),
    t: t(
      "A dry wind off the mountains turned a spark into a wall of flame that ran the length of a ridge before the night crews could box it in. The pines here burn fast because of the resin in them, and a slope that took forty years to grow can be bare in an afternoon.|Un viento seco de la montaña convirtió una chispa en una pared de fuego que recorrió toda la cresta antes de que los equipos nocturnos pudieran acorralarla. Los pinos de aquí arden deprisa por la resina, y una ladera que tardó cuarenta años en crecer puede quedar pelada en una tarde.|Un vent sec descendu des monts a transformé une étincelle en un mur de flammes qui a couru toute la crête avant que les équipes de nuit ne l'encerclent. Les pins d'ici brûlent vite à cause de leur résine, et un versant qui a mis quarante ans à pousser peut se retrouver nu en un après-midi.|山から吹く乾いた風が、火の粉を尾根一本を走り抜ける炎の壁に変え、夜通しの消火隊が押さえ込むまで止まらなかった。ここの松は樹脂のせいで燃えが速く、四十年かけて育った斜面が午後ひとつではげ山になることもある。",
    ),
    months: [10, 11],
  },
  {
    id: "hoesikgap",
    n: t("The company dinner bill comes|Llega la cuenta de la cena de empresa|L'addition du dîner d'entreprise arrive|会食代を持たされる",
    ),
    t: t(
      "Everyone at the long table has been drinking on the boss's word that tonight is a treat, and then the boss steps out to take a call and does not come back before the bill arrives. Being the oldest at the table left after that is an honour nobody actually wants.|Todos en la mesa larga han estado bebiendo con la palabra del jefe de que esta noche invita, y entonces el jefe sale a atender una llamada y no vuelve antes de que llegue la cuenta. Ser el mayor que queda en la mesa después de eso es un honor que nadie quiere en realidad.|Toute la tablée a bu sur la promesse du patron que ce soir, c'est lui qui régale, et voilà que le patron sort répondre à un appel et ne revient pas avant l'addition. Être le plus âgé encore assis à ce moment-là est un honneur dont personne ne veut vraiment.|長い食卓を囲んだ一同は、今夜は上司のおごりだという言葉を頼りに飲んでいたが、上司は電話を受けに席を立ったまま、勘定が来るまで戻らなかった。その場に残った中でいちばん年上であることは、誰も本当は望まない名誉である。",
    ),
  },
  {
    id: "dokkaebi-gil",
    n: t("Led astray by a dokkaebi|Un dokkaebi te hace perder el camino|Un dokkaebi t'égare|トッケビに化かされる"),
    t: t(
      "The path home looked exactly the same at every turn, and only at dawn does it become clear that the same field was crossed four times over. Old tales blame a dokkaebi for this exact trick, walking a traveler in circles all night for the fun of it and vanishing the moment the sun clears the ridge.|El camino de vuelta parecía idéntico en cada recodo, y solo al amanecer queda claro que el mismo campo se cruzó cuatro veces. Los viejos cuentos culpan de esta treta a un dokkaebi, que hace caminar en círculos a un viajero toda la noche por diversión.|Le chemin du retour semblait identique à chaque tournant, et ce n'est qu'à l'aube qu'on comprend avoir traversé quatre fois le même champ. Les vieux contes en accusent un dokkaebi, qui fait tourner un voyageur en rond toute la nuit pour s'amuser.|帰り道はどの角を曲がっても同じ景色に見え、夜明けになってようやく同じ畑を四度も横切っていたと分かった。昔話はこの仕掛けをトッケビのしわざだとする。面白がって旅人を一晩じゅう堂々巡りさせ、日が尾根から差した瞬間に消えるという。",
    ),
  },
  {
    id: "somaechigi",
    n: t("A pickpocket works the market|Un carterista trabaja el mercado|Un pickpocket sévit au marché|市場ですりに遭う"),
    t: t(
      "A shoulder bump in the thick of the crowded stalls was over before it registered as anything, and only at the next stall does the missing weight in a pocket become obvious. The market is loud enough and packed enough that nobody nearby noticed a thing.|Un roce de hombro en medio del gentío de los puestos pasó antes de que se notara como algo, y solo en el siguiente puesto se hace evidente el peso que falta en un bolsillo. El mercado está tan bullicioso y abarrotado que nadie cerca notó nada.|Un coup d'épaule au cœur de la foule des étals est passé avant même d'être remarqué, et ce n'est qu'à l'étal suivant que le poids manquant dans une poche devient évident. Le marché est si bruyant et si dense que personne aux alentours n'a rien vu.|混み合う露店の合間で肩がぶつかった程度にしか感じなかったが、次の店に着いてはじめてポケットの軽さに気づいた。市場はざわめきと人混みでいっぱいで、近くの誰も何にも気づかなかった。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、日本・フランス・インドと
 * 同じく地方まるごとの好不況で差をつける(効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の korea の項)。
 */
export const KOREA_SEASONS = [
  {
    e: "🌸",
    n: t("Cherry blossoms move north|Los cerezos florecen hacia el norte|Les cerisiers fleurissent vers le nord|桜前線が北上する"),
    t: t(
      "The blossom opens first in the south and climbs the peninsula a little over a week at a time, and the naval port at Jinhae turns so thoroughly pink for ten days each spring that its storm drains are said to run with petals. Jeju's canola fields are already past their yellow peak by the time the cherry trees further north catch up.|La flor se abre primero en el sur y sube por la península a poco más de una semana por tramo, y el puerto naval de Jinhae se tiñe de un rosa tan intenso durante diez días cada primavera que se dice que sus desagües corren con pétalos.|La floraison s'ouvre d'abord au sud et remonte la péninsule à un peu plus d'une semaine par étape, et le port naval de Jinhae se pare d'un rose si dense dix jours chaque printemps que ses caniveaux, dit-on, charrient des pétales.|花はまず南で開き、一週間強ずつ間を置きながら半島を北へ上っていく。鎮海の軍港は毎春十日ほど桃色に染まりきり、側溝が花びらで流れると言われるほどになる。済州の菜の花畑は、北の桜が追いつくころにはもう黄色の盛りを過ぎている。",
    ),
    f: t(
      "The naval base at Jinhae plants around 350,000 cherry trees across the town, most descended from stock brought over during the Japanese colonial period and later replanted with the argument that the tree is not exclusively anyone's to claim.|La base naval de Jinhae planta unos 350.000 cerezos por todo el municipio, la mayoría descendientes de ejemplares traídos en la era colonial japonesa y replantados después.|La base navale de Jinhae compte environ 350 000 cerisiers plantés dans toute la ville, pour la plupart issus de sujets importés durant l'ère coloniale japonaise puis replantés.|鎮海の軍港には町じゅうに約35万本の桜が植えられている。その多くは日本統治時代に持ち込まれた木の子孫で、のちに植え直された。桜はどこか一国だけのものではない、という考えのもとである。",
    ),
  },
  {
    e: "🎏",
    n: t("Children's Day and the Buddha's birthday|El Día del Niño y el cumpleaños de Buda|La fête des enfants et l'anniversaire de Bouddha|こどもの日と釈迦誕生日"),
    t: t(
      "Two of the year's biggest holidays land within days of each other, and lantern-hung temple courtyards fill with the same families crowding the amusement parks a morning later. Fresh green covers the mountains almost overnight, and hikers call this the one month the peaks ask for nothing in return.|Dos de las mayores fiestas del año caen con pocos días de diferencia, y los patios de los templos, colgados de faroles, se llenan de las mismas familias que abarrotan los parques de atracciones al día siguiente.|Deux des plus grandes fêtes de l'année tombent à quelques jours d'intervalle, et les cours de temples pavoisées de lanternes se remplissent des mêmes familles qui envahiront les parcs d'attractions le lendemain.|一年でも指折りの二つの祝日が数日を置かず重なり、提灯を吊るした寺の境内は、翌朝には遊園地に押し寄せるのと同じ家族連れで埋まる。山々はほとんど一夜で新緑に覆われ、登山者はこの月だけは山が何も要求してこないと言う。",
    ),
    f: t(
      "Buddha's birthday is dated by the lunar calendar and so falls on a different day each year, but the paper lanterns strung over temple approach roads are put up on the same fixed schedule regardless, weeks ahead of the date itself.|El cumpleaños de Buda se fija por el calendario lunar y cae en un día distinto cada año, pero los faroles de papel tendidos sobre los accesos a los templos se cuelgan siempre con semanas de antelación.|L'anniversaire de Bouddha suit le calendrier lunaire et tombe donc un jour différent chaque année, mais les lanternes de papier tendues sur les allées des temples sont installées des semaines à l'avance, quelle que soit la date.|釈迦の誕生日は旧暦で決まるため毎年日付が変わるが、寺の参道に吊るす提灯は、実際の日取りに関わらず何週間も前から決まった段取りで用意される。",
    ),
  },
  {
    e: "🌾",
    n: t("Barley comes in as the rain edges north|La cebada se recoge mientras la lluvia sube al norte|L'orge rentre tandis que la pluie remonte vers le nord|大麦を刈り取り、梅雨が北へ来る"),
    t: t(
      "Jeju and the southern coast bring in the barley crop in the same week the first rain band of the wet season crosses the strait from the south, so a field can be stubble and glistening within a single afternoon. The timing is close enough each year that farmers plan the harvest around the forecast rather than the calendar.|Jeju y la costa sur recogen la cebada la misma semana en que la primera banda de lluvias del monzón cruza el estrecho desde el sur, así que un campo puede pasar de rastrojo a reluciente en una sola tarde.|Jeju et la côte sud rentrent l'orge la semaine même où la première bande de pluie de la mousson franchit le détroit depuis le sud, si bien qu'un champ peut passer du chaume au ruisselant en une seule après-midi.|済州と南岸では、モンスーンの最初の雨雲が海峡を渡ってくるのと同じ週に大麦を刈り取る。畑は午後のうちに刈り株から水を光らせる姿へと変わる。毎年その時期が近いので、農家は暦ではなく天気予報で収穫を決める。",
    ),
    f: t(
      "The rainy season is tracked here as a moving front rather than a fixed date, announced to have \"started\" in the south first and then, days or weeks later, in the capital — the same storm system given two separate opening days.|La temporada de lluvias se sigue aquí como un frente en movimiento y no como fecha fija: se anuncia que «ha empezado» primero en el sur y, días o semanas después, en la capital.|La saison des pluies y est suivie comme un front mobile plutôt qu'une date fixe : on annonce qu'elle a « commencé » d'abord au sud, puis, des jours ou des semaines plus tard, dans la capitale.|梅雨は決まった日付ではなく動く前線として伝えられる。まず南で「梅雨入り」が発表され、数日から数週間遅れて首都でも発表される。同じ雨雲に二つの「入り」の日があるということである。",
    ),
  },
  {
    e: "🏖️",
    n: t("The rains peak and the beaches open|Las lluvias llegan a su punto álgido y abren las playas|Les pluies culminent et les plages ouvrent|梅雨が極まり、海が開く"),
    t: t(
      "The wet season reaches its heaviest stretch nationwide just as the beach towns open for the year, so a single week can hold both the wettest and the most crowded days of the whole season depending which coast a traveler is on. Offices empty out for the traditional week of summer leave taken almost in unison.|La temporada de lluvias llega a su tramo más intenso justo cuando los pueblos de playa abren la temporada, así que una misma semana puede tener los días más lluviosos y los más concurridos, según la costa.|La saison des pluies atteint son pic national juste au moment où les stations balnéaires ouvrent la saison, si bien qu'une même semaine peut réunir les jours les plus pluvieux et les plus bondés, selon le littoral.|梅雨が全国でいちばん激しくなるのと同じ時期に、海辺の町はその年の海開きを迎える。どちらの海岸にいるかによって、同じ一週間が一年でいちばん雨の多い週にも、いちばん混み合う週にもなる。夏休みの一週間はほぼ足並みをそろえて取られ、オフィスは空になる。",
    ),
    f: t(
      "Because most workers take the same week or two of summer leave rather than staggering it through the season, the coastal expressways see some of their worst jams of the year on the Friday evening this month begins and ends.|Como la mayoría de trabajadores toma la misma semana o dos de vacaciones en vez de escalonarlas, las autopistas de la costa sufren algunos de los peores atascos del año esos viernes.|La plupart des salariés prenant la même semaine ou deux de congé plutôt que de les étaler, les autoroutes côtières connaissent certains des pires embouteillages de l'année ces vendredis soir-là.|多くの働き手が夏休みを季節に散らさず同じ一、二週間に取るため、海沿いの高速道路はこの月の始まりと終わりの金曜夕方、一年でも指折りの渋滞に見舞われる。",
    ),
  },
  {
    e: "🎆",
    n: t("Liberation Day and the height of vacation|El Día de la Liberación y el pico de las vacaciones|La fête de la Libération et le pic des vacances|光復節と休暇の頂点"),
    t: t(
      "Liberation Day on the fifteenth marks the end of colonial rule in 1945, and the long holiday around it lands at the very peak of the summer break, so flags go up on apartment balconies at the same time beach umbrellas crowd the sand three deep. The dokkaebi, like everyone else, takes the month off.|El Día de la Liberación, el quince, marca el fin del dominio colonial en 1945, y el puente que lo rodea cae justo en el pico de las vacaciones de verano, así que las banderas salen a los balcones a la vez que las sombrillas se apiñan en la arena.|La fête de la Libération, le quinze, marque la fin de la domination coloniale en 1945, et le long week-end qui l'entoure tombe au tout point culminant des vacances d'été, si bien que les drapeaux montent aux balcons en même temps que les parasols s'entassent sur le sable.|15日の光復節は1945年の植民地支配の終わりを記念する日で、その連休は夏休みのちょうど頂点に重なる。マンションのベランダに旗が掲げられるのと同じ頃、浜辺には日除けが三重に立ち並ぶ。トッケビも、誰もと同じくこの月は休む。",
    ),
    f: t(
      "The name itself, gwangbok, means \"restoration of light\", chosen over a plainer word for independence because the day marks getting something back rather than gaining something new.|El propio nombre, gwangbok, significa «restauración de la luz», elegido en vez de una palabra más llana para independencia, porque el día marca recuperar algo, no ganar algo nuevo.|Le nom lui-même, gwangbok, signifie « restauration de la lumière », préféré à un mot plus simple pour indépendance, car ce jour marque le fait de récupérer quelque chose plutôt que d'en gagner une nouvelle.|光復という語そのものが「光を取り戻す」という意味で、独立を表すもっと平たい語ではなくこちらが選ばれた。この日が祝うのは新しく得たものではなく、取り戻したものだからである。",
    ),
  },
  {
    e: "🌕",
    n: t("Chuseok, the harvest home|Chuseok, la vuelta a casa por la cosecha|Chuseok, le retour au pays des moissons|秋夕、収穫を祝う帰省"),
    t: t(
      "The country's roads fill in both directions at once as almost everyone travels to an ancestral hometown for a rite of thanks laid out with the first of the new rice and fruit, timed to the full moon of the eighth lunar month. Half-moon rice cakes are shaped by hand around the table the night before.|Las carreteras del país se llenan en ambos sentidos a la vez, pues casi todos viajan al pueblo natal familiar para un rito de gracias con el primer arroz y la fruta nuevos, fijado en la luna llena del octavo mes lunar.|Les routes du pays se remplissent dans les deux sens à la fois, presque tout le monde partant vers le village natal ancestral pour un rite d'action de grâce dressé avec le riz et les fruits nouveaux, calé sur la pleine lune du huitième mois lunaire.|国じゅうの道路が行きも帰りも同時に埋まる。ほとんど誰もが、新米と新しい果物を供える感謝の祭祀のために祖先の故郷へ帰るからである。旧暦八月の満月に合わせて行われる。半月形の松餅は前の晩、家族で手分けして形作る。",
    ),
    f: t(
      "The half-moon shape of the songpyeon rice cake is explained by a saying that a moon still waxing toward full holds more promise than one already at its peak, so the cake is left short of round on purpose.|La forma de media luna del pastel de arroz songpyeon se explica por un dicho: una luna aún creciente promete más que una ya llena, así que el pastel se deja adrede sin ser redondo.|La forme de demi-lune du gâteau de riz songpyeon s'explique par un dicton : une lune encore croissante promet plus qu'une lune déjà pleine, aussi le gâteau est-il volontairement laissé non rond.|松餅が半月の形をしているのには言い伝えがある。満ちきった月より、これから満ちていく月のほうが多くを約束するという。だからこの餅はわざと丸くは作らない。",
    ),
  },
  {
    e: "🍁",
    n: t("Maple colour comes down the ridges|El color del arce baja por las crestas|La couleur des érables descend les crêtes|紅葉が尾根を下る"),
    t: t(
      "Colour starts on the high eastern ridges and works down to the coast over about three weeks, and the mountain parks post daily colour-front updates the way the spring cherry bloom gets tracked in reverse. Riverside villages hold folk-mask performances timed to the same weekends the leaves peak.|El color empieza en las crestas altas del este y baja hasta la costa en unas tres semanas, y los parques de montaña publican avisos diarios del frente del color, igual que se sigue la floración del cerezo, pero al revés.|La couleur débute sur les hautes crêtes de l'est et descend vers la côte en trois semaines environ, et les parcs de montagne publient des bulletins quotidiens du front des couleurs, à l'image du suivi de la floraison des cerisiers, mais inversé.|色は東の高い尾根から始まり、およそ三週間かけて海岸まで下ってくる。山の国立公園は、春の桜前線を逆にたどるように、日々の紅葉前線を発表する。川辺の村では、葉が盛りを迎える週末に合わせて仮面劇が催される。",
    ),
    f: t(
      "Because the colour front descends roughly a hundred metres of elevation a day, the same mountain can be worth two separate visits three weeks apart without the leaves ever repeating themselves.|Como el frente del color baja unos cien metros de altitud al día, la misma montaña puede merecer dos visitas separadas con tres semanas de diferencia sin que las hojas se repitan.|Le front des couleurs descendant d'environ cent mètres d'altitude par jour, la même montagne peut mériter deux visites séparées de trois semaines sans jamais montrer le même feuillage.|色の前線は一日におよそ標高100mずつ下るので、同じ山でも三週間あけて二度訪れる値打ちがある。葉の表情が一度として同じにならないからである。",
    ),
  },
  {
    e: "🥬",
    n: t("Whole neighbourhoods make kimchi together|Barrios enteros hacen el kimchi juntos|Des quartiers entiers font le kimchi ensemble|近所総出でキムチを漬ける"),
    t: t(
      "Kimjang season sees households buy cabbage by the hundred-head lot and salt it in courtyards and stairwells, trading labour with neighbours on the understanding that everyone's turn will come. What is made in one long weekend is meant to last a family through to the first thaw.|La temporada de kimjang trae hogares que compran col por centenares y la salan en patios y escaleras, intercambiando mano de obra con los vecinos con el entendido de que a todos les llegará el turno.|La saison du kimjang voit les foyers acheter le chou par centaines de têtes et le saler dans les cours et les cages d'escalier, échangeant les bras avec les voisins, chacun sachant que son tour viendra.|キムジャンの季節、各家庭は白菜を百玉単位で買い、中庭や階段の踊り場で塩漬けにする。順番はいずれ自分にも回ってくるという了解のもとで、近所どうし労力を貸し借りする。一つの長い週末で漬けたものが、雪解けまで一家の食卓を支えることになる。",
    ),
    f: t(
      "The custom of communal kimjang was added to UNESCO's list of intangible cultural heritage in 2013, recognised less for the recipe than for the neighbourly labour-sharing built into making enough to last a winter.|La costumbre del kimjang comunitario se sumó a la lista de patrimonio inmaterial de la UNESCO en 2013, reconocida menos por la receta que por el trabajo compartido entre vecinos.|La coutume du kimjang collectif fut inscrite en 2013 au patrimoine culturel immatériel de l'UNESCO, reconnue moins pour la recette que pour l'entraide de voisinage qu'exige la préparation des provisions d'hiver.|共同でキムジャンをする習わしは2013年、ユネスコの無形文化遺産に登録された。評価されたのはレシピそのものより、冬を越すだけの量を作るために組み込まれた近所どうしの助け合いのほうである。",
    ),
  },
  {
    e: "⛷️",
    n: t("Ski slopes open as the city lights up|Las pistas de esquí abren y la ciudad se ilumina|Les pistes de ski ouvrent et la ville s'illumine|スキー場が開き、街に灯がともる"),
    t: t(
      "The mountain resorts start snowmaking the moment the temperature allows it, weeks before natural snowfall can be relied on, while department store windows in the capital compete over Christmas displays borrowed from a holiday most of the country does not otherwise mark. Both are treated as the true opening of winter.|Los complejos de montaña empiezan a fabricar nieve en cuanto la temperatura lo permite, semanas antes de poder confiar en la nevada natural, mientras los escaparates de los grandes almacenes compiten con adornos navideños tomados de una fiesta que el resto del país apenas celebra.|Les stations de montagne fabriquent de la neige dès que la température le permet, des semaines avant de pouvoir compter sur la neige naturelle, tandis que les vitrines des grands magasins de la capitale rivalisent de décors de Noël empruntés à une fête que le pays ne marque guère par ailleurs.|山のリゾートは気温が許すしだい、自然の雪が期待できるより何週間も早く人工降雪を始める。首都のデパートのショーウィンドウは、ふだんはさして祝われない祝日から借りたクリスマスの飾り付けを競い合う。どちらも本当の冬の始まりとして扱われる。",
    ),
    f: t(
      "Christmas is a public holiday here but a largely secular and commercial one for most households, closer in spirit to a second Valentine's Day for couples than to the family gathering Chuseok already covers.|Aquí la Navidad es festivo oficial pero, para la mayoría de los hogares, es en gran medida laica y comercial, más cercana en espíritu a un segundo Día de San Valentín para parejas que a la reunión familiar que ya cubre Chuseok.|Noël y est un jour férié, mais pour la plupart des foyers, une fête largement laïque et commerciale, plus proche dans l'esprit d'une seconde Saint-Valentin pour les couples que du rassemblement familial déjà assuré par Chuseok.|クリスマスはこの国でも祝日だが、多くの家庭にとっては宗教色の薄い商業的な日で、家族が集う秋夕というより、恋人どうしの「もう一つのバレンタインデー」に近い性格を持つ。",
    ),
  },
  {
    e: "🧧",
    n: t("Seollal, the lunar new year|Seollal, el año nuevo lunar|Seollal, le nouvel an lunaire|旧正月ソルラル"),
    t: t(
      "Families bow formally to their elders on the new year morning, and children collect folded envelopes of cash in return for the bow, spending money that is technically theirs to keep but is, by long tradition, mostly saved on their behalf by a parent. Rice cake soup is eaten by everyone to mark a year added to their age.|Las familias hacen una reverencia formal a los mayores en la mañana de año nuevo, y los niños reciben sobres de dinero doblados a cambio de la reverencia, dinero que en teoría es suyo pero que, por tradición, casi siempre guarda un padre.|Les familles s'inclinent formellement devant leurs aînés au matin du nouvel an, et les enfants reçoivent en retour des enveloppes d'argent pliées, un argent qui leur appartient en théorie mais qu'un parent met le plus souvent de côté en leur nom, par tradition.|正月の朝、家族は目上の者に正式なお辞儀をし、子どもはそのお辞儀と引き換えに折りたたんだお年玉袋を受け取る。名目上は子どものものだが、長い習わしでその大半は親が代わりに貯めておく。誰もが歳の数え直しの節目としてトック(お雑煮)を食べる。",
    ),
    f: t(
      "Age here was traditionally counted from one at birth with a year added at each new year rather than each birthday, so on Seollal morning an infant born the previous December is spoken of as turning two.|La edad se contaba tradicionalmente aquí desde uno al nacer, sumando un año en cada nuevo año en vez de en cada cumpleaños, así que en la mañana de Seollal un bebé nacido en diciembre pasa a decirse que cumple dos.|L'âge s'y comptait traditionnellement à partir d'un an dès la naissance, avec une année ajoutée à chaque nouvel an plutôt qu'à chaque anniversaire, si bien qu'au matin de Seollal, un nourrisson né en décembre est dit atteindre deux ans.|この国ではかつて、生まれた時点で一歳とし、誕生日ではなく正月のたびに歳を重ねる数え方をした。だからソルラルの朝には、前の12月に生まれた赤子も「二歳になった」と言われる。",
    ),
  },
  {
    e: "🍊",
    n: t("The coldest snap sends people south to Jeju|El frío más crudo manda a la gente al sur, a Jeju|Le froid le plus vif envoie tout le monde vers Jeju au sud|寒波が人を済州へ南下させる"),
    t: t(
      "A three-day cold snap followed by four milder ones repeats often enough this month to have its own name, and each freeze sends another wave of travelers south to a Jeju that rarely drops below freezing at all. Its tangerine groves are picked through the same weeks, sweetest right when the mainland wants them most.|Una ola de frío de tres días seguida de cuatro más suaves se repite este mes con tanta frecuencia que tiene nombre propio, y cada helada manda otra oleada de viajeros al sur, a un Jeju que apenas baja de cero.|Une vague de froid de trois jours suivie de quatre plus douces se répète ce mois-ci assez souvent pour porter un nom, et chaque gel envoie une nouvelle vague de voyageurs vers le sud, vers un Jeju qui descend rarement sous zéro.|三日の厳寒とそれに続く四日の緩みが繰り返されるこの月の寒暖のリズムには専用の呼び名がある。寒波が来るたびに、氷点下になることのめったにない済州へ、また一波の旅行者が南下する。みかん畑はちょうど同じ週に収穫の盛りを迎え、本土がいちばんそれを欲しがる時期にいちばん甘くなる。",
    ),
    f: t(
      "The three-cold-four-warm pattern is real enough to be named samhan-saon in weather reports, though meteorologists note it holds only loosely most winters rather than on a strict seven-day clock.|El patrón de tres fríos y cuatro templados es lo bastante real como para tener nombre propio, samhan-saon, en los partes meteorológicos, aunque los meteorólogos señalan que rara vez se cumple con un reloj estricto de siete días.|Le cycle de trois jours froids et quatre doux est assez réel pour porter un nom, samhan-saon, dans les bulletins météo, bien que les météorologues notent qu'il ne suit que rarement une horloge stricte de sept jours.|三寒四温という言葉は天気予報でも使われるほど実感を伴うが、気象学者によれば、たいていの冬は七日周期どおりにきっちり現れるわけではないという。",
    ),
  },
  {
    e: "🎒",
    n: t("A new school year begins|Empieza un nuevo curso escolar|Une nouvelle année scolaire commence|新学期が始まる"),
    t: t(
      "Unlike most of the world, the academic year opens here in spring rather than autumn, so this month brings a fresh grade, a new classroom and often a new uniform all at once, timed to arrive just as the first blossoms do. Jeju's canola fields are already turning yellow while the rest of the country still waits for its own thaw.|A diferencia de la mayor parte del mundo, el curso escolar empieza aquí en primavera y no en otoño, así que este mes trae a la vez un nuevo grado, una nueva aula y a menudo un uniforme nuevo, justo cuando llegan las primeras flores.|Contrairement à la majeure partie du monde, l'année scolaire y débute au printemps plutôt qu'en automne, si bien que ce mois apporte à la fois une nouvelle classe, une nouvelle salle et souvent un nouvel uniforme, juste au moment des premières fleurs.|世界の多くの国と違い、この国の学年度は秋ではなく春に始まる。この月には進級と新しい教室、たいてい新しい制服までもが、最初の花が開くのとちょうど同じ頃に一度にやってくる。済州の菜の花畑はすでに黄色くなり始めているが、国の他の場所はまだそれぞれの雪解けを待っている。",
    ),
    f: t(
      "The March school start was fixed under a 1949 education law and has stayed fixed since, meaning a graduating class always finishes in February, a few awkward weeks before the country's job-hunting season is fully under way.|El inicio del curso en marzo se fijó en una ley educativa de 1949 y se ha mantenido desde entonces, lo que significa que una promoción siempre termina en febrero, unas semanas incómodas antes de que arranque de lleno la temporada de búsqueda de empleo.|Le début de l'année scolaire en mars fut fixé par une loi de 1949 et l'est resté depuis, ce qui fait qu'une promotion termine toujours en février, quelques semaines gênantes avant que la saison de recherche d'emploi ne batte vraiment son plein.|三月始まりの学年度は1949年の教育法で定められ、以来変わっていない。そのため卒業はいつも二月に終わり、本格的な就職活動の季節が始まるまでの数週間、間の悪い空白が生まれる。",
    ),
  },
];
