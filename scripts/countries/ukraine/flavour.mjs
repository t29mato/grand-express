/**
 * ウクライナの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・韓国・フランス・インドと同じく「地方まるごとの好不況」で差をつける。
 * 実際の効果(どの地方の収入が何倍になるか)は
 * `src/infrastructure/content/season-and-doom-rules.ts` 側に置く。
 *
 * アイテム9件の鍵はウクライナ語固有の語を選んである(他の盤面と同時に
 * 作業しているため、焼き上がった目録だけでは衝突を防げないとteam-leadに
 * 言われたので)。実際に焼き上がった目録(korea/turkey/italy/china/uk/…)を
 * 確認し、重なりが無いことは確かめたが、**同時進行中のロシア盤面とは
 * 語彙が近くなりうる**ので、`shpargalka`(既に使われていた)は避けて
 * `shpora` にするなど、できるだけ既存語と離す判断をした。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const UKRAINE_META = {
  id: "ukraine",
  name: t("Ukraine|Ucrania|Ukraine|ウクライナ"),
  blurb: t(
    "A steppe nation of golden wheat and black soil, onion domes and painted eggs, cut in two by one great river|Una nación de estepa con trigo dorado y tierra negra, cúpulas bulbosas y huevos pintados, partida en dos por un gran río|Une nation de steppe aux blés dorés et à la terre noire, aux coupoles en bulbe et aux œufs peints, coupée en deux par un grand fleuve|黄金の麦畑と黒い大地、玉ねぎ屋根と彩色の卵を持ち、一本の大河に貫かれた草原の国",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (韓国・インド・フランスと同じ理由。ここは他国と同じ暫定値100のまま)。
  cur: { pre: "₴", post: "", mul: 100 },
  start: "kyiv",
  cpuNames: ["Мавка Mavka", "Русалка Rusalka", "Домовик Domovyk", "Вовкулака Vovkulaka"],
  // 国旗の青と黄、刺繍(ヴィシヴァンカ)の赤、カルパチアの森の緑、亜麻布の白。
  stripe: ["#0057B7", "#FFD700", "#c8102e", "#2f6b3a", "#f6efe2"],
};

/** 実際の地方区分にならった6区分。 */
export const UKRAINE_REGIONS = {
  ky: t("Kyiv and its region|Kýiv y su región|Kyiv et sa région|キーウとその周辺"),
  pl: t("Polissia, the northern forests|Polesia, los bosques del norte|La Polésie, les forêts du nord|ポリッシャ(北部の森)"),
  west: t("The west, at the Carpathian foothills|El oeste, al pie de los Cárpatos|L'ouest, au pied des Carpates|西部・カルパチアの麓"),
  cen: t("The central plains|Las llanuras centrales|Les plaines centrales|中部の平原"),
  south: t("The south, along the Black Sea and Danube|El sur, junto al mar Negro y el Danubio|Le sud, le long de la mer Noire et du Danube|南部・黒海とドナウの沿岸"),
  east: t("The east, along the Dnipro|El este, junto al Dniéper|L'est, le long du Dniepr|東部・ドニプロ川沿い"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`。
 * `REGISTER.md` に貼り付け用の対応を書いてある)。
 */
export const UKRAINE_ITEMS = {
  leleka: {
    e: "🕊️",
    price: 240,
    kind: "move",
    n: t("A Ride on the Stork's Wings|Un vuelo en las alas de la cigüeña|Un vol sur les ailes de la cigogne|コウノトリの翼に乗って"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "A white stork nesting on a roof is taken as a sign the house will know good luck and, by old custom, a child before long, and a family will often build a small platform on a pole specifically to invite one to stay. The same bird is said to return to the very same nest every spring after wintering as far away as southern Africa.|Que una cigüeña blanca anide en un tejado se toma como señal de que la casa tendrá buena suerte y, según la vieja costumbre, un hijo no muy lejos, y una familia suele construir una pequeña plataforma en un poste solo para invitarla a quedarse. Se dice que la misma ave vuelve al mismo nido cada primavera tras invernar tan lejos como el sur de África.|Une cigogne blanche nichant sur un toit est tenue pour signe que la maison connaîtra la chance et, selon la vieille coutume, un enfant avant longtemps, et une famille construit souvent une petite plateforme sur un poteau juste pour l'inviter à rester. Le même oiseau reviendrait, dit-on, au même nid chaque printemps après avoir hiverné aussi loin qu'en Afrique australe.|白いコウノトリが屋根に巣を作ると、その家に幸運が、そして古い言い伝えでは近いうちに子どもが訪れる兆しとされ、家族はわざわざ電柱の上に小さな台を作ってまで巣作りを誘うことがある。同じ鳥は、遠く南アフリカあたりで冬を越したのち、毎春同じ巣に戻ってくると言われている。",
    ),
  },
  vinok: {
    e: "🌼",
    price: 380,
    kind: "pre",
    n: t("A Midsummer Wreath|Una corona del solsticio de verano|Une couronne du solstice d'été|夏至祭の花冠"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "On the night of Ivana Kupala in midsummer, young women traditionally float candle-lit flower wreaths down a river to read their fate from how they drift, while others jump over bonfires or search the forest for a fern said to bloom just once a year. Nobody credibly claims to have found the flower, but the search is the point.|En la noche de Ivana Kupala, a mediados de verano, las jóvenes suelen echar al río coronas de flores con velas para leer su destino según cómo derivan, mientras otros saltan hogueras o buscan en el bosque un helecho que se dice florece una sola vez al año. Nadie afirma con credibilidad haber encontrado la flor, pero la búsqueda es lo que cuenta.|La nuit d'Ivana Koupala, au cœur de l'été, les jeunes femmes lancent traditionnellement sur une rivière des couronnes de fleurs portant une bougie pour y lire leur destin selon leur dérive, tandis que d'autres sautent par-dessus des feux de joie ou cherchent dans la forêt une fougère censée ne fleurir qu'une fois l'an. Personne ne prétend sérieusement avoir trouvé la fleur, mais la quête est ce qui compte.|夏至に近いイヴァナ・クパーラの夜、若い女性たちは伝統的に蝋燭を立てた花冠を川に流し、その流れ方で自分の運命を占う。ほかにも焚き火を飛び越えたり、一年に一度だけ咲くとされるシダの花を森で探したりする者もいる。本当に見つけたと言う者はいないが、探すこと自体に意味がある。",
    ),
  },
  elektrychka: {
    e: "🚃",
    price: 360,
    kind: "pre",
    n: t("Elektrychka Ticket|Billete de elektrichka|Billet d'elektrytchka|エレクトリーチカ切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "The elektrychka is the ordinary electric commuter train that stops at nearly every station along its line, standing-room only at rush hour and cheap enough that students ride it for day trips between towns that the fast trains simply pass by.|La elektrichka es el tren eléctrico de cercanías corriente que para en casi todas las estaciones de su línea, solo de pie en hora punta y lo bastante barata como para que los estudiantes la usen en excursiones de un día entre pueblos que los trenes rápidos simplemente se saltan.|L'elektrytchka est le train de banlieue électrique ordinaire qui s'arrête à presque toutes les gares de sa ligne, bondé aux heures de pointe et assez bon marché pour que les étudiants l'utilisent en excursion d'une journée entre des villes que les trains rapides ne font que traverser.|エレクトリーチカは各駅にほぼすべて停まるふつうの電車で、ラッシュ時は立つ場所を探すのがやっとになるが、値段は安く、学生たちは急行が素通りする町々を日帰りで巡るのに使う。",
    ),
  },
  shvydkisnyi: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("A Shvydkisnyi Fast Train Ticket|Un billete del tren rápido shvydkisnyi|Un billet du train rapide chvydkisny|シュヴィドキースヌィイ特急切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "\"Shvydkisnyi\" simply means \"high-speed\", and these tilting intercity trains cut travel times between the country's largest cities to a fraction of what the old overnight services needed, without laying a single kilometre of dedicated new track.|«Shvydkisnyi» significa simplemente «de alta velocidad», y estos trenes interurbanos basculantes reducen los tiempos de viaje entre las mayores ciudades del país a una fracción de lo que necesitaban los viejos servicios nocturnos, sin tender ni un solo kilómetro de vía nueva dedicada.|« Chvydkisny » signifie simplement « à grande vitesse », et ces trains interurbains pendulaires réduisent les temps de trajet entre les plus grandes villes du pays à une fraction de ce qu'exigeaient les anciens services de nuit, sans poser un seul kilomètre de voie nouvelle dédiée.|「シュヴィドキースヌィイ」は単に「高速の」という意味で、この振り子式の都市間列車は、専用の新線を一キロも敷かないまま、かつての夜行列車が要した時間のごく一部にまで、国内主要都市間の所要時間を縮めた。",
    ),
  },
  rushnyk: {
    e: "🧵",
    price: 320,
    kind: "passive",
    n: t("An Embroidered Ritual Cloth|Un paño ritual bordado|Un tissu rituel brodé|刺繍の儀礼布ルシュヌィク"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "A rushnyk is hung over doorways, icons and the edge of the forest path alike, its woven red-and-black patterns believed to protect whatever they border, and travellers heading into the woods once left one tied to a branch as a quiet offering asking safe passage of whoever watches the trees.|Un rushnyk se cuelga tanto sobre puertas e iconos como en el borde del sendero del bosque, y se cree que sus motivos tejidos en rojo y negro protegen lo que bordean; los viajeros que se adentraban en el bosque antaño ataban uno a una rama como ofrenda silenciosa pidiendo paso seguro a quien vela los árboles.|Un rushnyk se suspend aussi bien au-dessus des portes et des icônes qu'à l'orée du sentier forestier, ses motifs tissés en rouge et noir étant censés protéger ce qu'ils bordent, et les voyageurs s'enfonçant dans les bois en attachaient jadis un à une branche en offrande silencieuse pour demander un passage sûr à qui veille sur les arbres.|ルシュヌィクは戸口やイコンの上にも、森へ入る小道の脇にも掛けられる。赤と黒で織られた文様はそれが縁取るものを守ると信じられており、森へ分け入る旅人はかつて、木々を見張る者に安全な通行を静かに願って、枝に一枚結びつけたという。",
    ),
  },
  sil: {
    e: "🧂",
    price: 440,
    kind: "pre",
    n: t("A Handful of Salt|Un puñado de sal|Une poignée de sel|一握りの塩"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Salt thrown over the shoulder or scattered across a threshold is one of the oldest wards in the region's folklore, considered too pure and too hard-won in past centuries for any mischievous spirit to want to cross.|La sal lanzada por encima del hombro o esparcida por un umbral es una de las protecciones más antiguas del folclore de la región, considerada demasiado pura y demasiado costosa de conseguir en siglos pasados como para que ningún espíritu travieso quisiera cruzarla.|Le sel jeté par-dessus l'épaule ou répandu sur un seuil est l'une des plus anciennes protections du folklore de la région, jugé trop pur et trop coûteux à obtenir jadis pour qu'un esprit espiègle veuille le franchir.|肩越しに投げるか敷居にまく塩は、この地方の民間伝承でも指折り古いまじないで、いたずら好きの霊であっても越えたがらないほど清らかで、かつては手に入れるのも容易ではなかったとされる。",
    ),
  },
  shpora: {
    e: "📝",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("A Tiny Rolled Cheat Sheet|Una minúscula chuleta enrollada|Une minuscule antisèche roulée|丸めた小さなカンニングペーパー"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "A shpora is written in handwriting small enough to hide inside a pen cap or a shirt cuff, a student tradition old enough that professors have developed their own folklore of confiscation tricks in return.|Una shpora se escribe con una letra tan diminuta que cabe dentro de la tapa de un bolígrafo o en el puño de una camisa, una tradición estudiantil tan antigua que los profesores han desarrollado su propio folclore de trucos de confiscación a cambio.|Une chpora s'écrit d'une écriture assez minuscule pour tenir dans le capuchon d'un stylo ou le poignet d'une chemise, une tradition étudiante assez ancienne pour que les professeurs aient développé en retour tout un folklore de ruses de confiscation.|シュポラは、ペンのキャップやシャツの袖口に隠せるほど小さな字で書かれる。学生のあいだのこの伝統はあまりに古く、教授の側にもそれを見つけ出す独自の手口の言い伝えができているほどである。",
    ),
  },
  karbovanets: {
    e: "💵",
    price: 280,
    kind: "pre",
    n: t("A Stack of Old Karbovanets Notes|Un fajo de viejos billetes de karbovanets|Une liasse de vieux billets de karbovanets|旧カルボヴァネツィィ紙幣の束"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-les et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "The karbovanets was the transitional currency printed in the early 1990s, and hyperinflation pushed its largest note to a face value of a million before the hryvnia replaced it in 1996; a crisp uncirculated sheet is worth more to a collector today than it was worth as cash at the time.|El karbovanets fue la moneda transitoria impresa a principios de los años noventa, y la hiperinflación llevó su billete más alto a un valor nominal de un millón antes de que la grivna lo sustituyera en 1996; una lámina impecable sin circular vale hoy más para un coleccionista de lo que valía como efectivo entonces.|Le karbovanets fut la monnaie transitoire imprimée au début des années 1990, et l'hyperinflation poussa son plus gros billet à une valeur faciale d'un million avant que la hryvnia ne le remplace en 1996 ; une feuille non circulée impeccable vaut aujourd'hui plus pour un collectionneur qu'elle ne valait comme argent liquide à l'époque.|カルボヴァネツィィは1990年代初めに発行された過渡的な通貨で、1996年にフリヴニャに置き換えられるまでにハイパーインフレで最高額面は100万にまで達した。未使用のきれいな一枚は、いまでは当時の額面としてよりも収集家にとっての値のほうが高い。",
    ),
  },
  marshrutka: {
    e: "🚐",
    price: 420,
    kind: "pre",
    n: t("A Marshrutka About to Leave|Una marshrutka a punto de partir|Une marchroutka sur le point de partir|いま出発するマルシュルートカ"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "These shared minibuses run without a fixed timetable and simply leave the moment every seat is filled, so the driver's shouted count of empty places is often the only schedule information a passenger ever gets.|Estas furgonetas compartidas circulan sin horario fijo y sencillamente parten en cuanto se llena cada asiento, así que el recuento a gritos de plazas libres del conductor suele ser la única información de horario que recibe un pasajero.|Ces minibus partagés roulent sans horaire fixe et partent simplement dès que chaque place est occupée, si bien que le décompte crié des places libres par le chauffeur est souvent la seule information d'horaire qu'obtient un passager.|この乗合ミニバスには決まった時刻表がなく、席が埋まった瞬間に発車する。運転手が叫ぶ残り席数の声が、乗客にとって時刻表代わりであることも少なくない。",
    ),
  },
};

/**
 * 厄災の神。森の精霊リソヴィク(森番の精。旅人をわざと迷わせて
 * からかうが、命を奪うような悪霊ではないとされる)にした。
 * 韓国のトッケビ・茨城のダイダラボウと同じく「残酷ではなく、
 * ただ度が過ぎるだけ」の性格で描く。
 */
export const UKRAINE_SPIRIT = {
  e: "🌲",
  n: t("The Lisovyk|El Lisovik|Le Lissovyk|リソヴィク"),
  big: t("The Lisovyk's Vanishing Path|El sendero desvanecido del Lisovik|Le sentier évanoui du Lissovyk|リソヴィクの消える小道"),
  ward: "rushnyk",
  arrive: t(
    "<b>🌲 A lisovyk has taken an interest in you.</b> Old tales describe this forest spirit as the woods' own capricious keeper, able to grow taller than the pines or shrink to a blade of grass, fond of leading a traveler in circles for the joke of it rather than any real cruelty. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🌲 Un lisovik se ha fijado en ti.</b> Los viejos cuentos describen a este espíritu del bosque como su propio guardián caprichoso, capaz de crecer más alto que los pinos o encogerse hasta ser una brizna de hierba, aficionado a hacer caminar en círculos a un viajero por la broma más que por verdadera crueldad. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🌲 Un lissovyk s'est intéressé à toi.</b> Les vieux contes décrivent cet esprit de la forêt comme son propre gardien capricieux, capable de grandir plus haut que les pins ou de rapetisser jusqu'à n'être qu'un brin d'herbe, aimant faire tourner en rond un voyageur pour la farce plus que par réelle cruauté. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🌲 リソヴィクに目を付けられた。</b> 昔話によれば、この森の精霊は森そのものの気まぐれな番人で、松の木より高く伸びることも、草の葉ほどに縮むこともできるという。旅人を堂々巡りさせるのは、本当の悪意からではなく、ただの悪ふざけによる。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🌲 <b>The lisovyk</b> loses interest and slips off after <b>{0}</b>, farthest from {1}.|🌲 <b>El lisovik</b> pierde el interés y se escabulle tras <b>{0}</b>, el más lejano de {1}.|🌲 <b>Le lissovyk</b> se désintéresse et se glisse vers <b>{0}</b>, le plus loin de {1}.|🌲 <b>リソヴィク</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへするりと移っていった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the lisovyk and never once broken free of his path. He grins and folds the whole road into a loop of his own making — <b>the Lisovyk's Vanishing Path</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al lisovik sin haber escapado ni una vez de su sendero. Él sonríe y pliega todo el camino en un bucle de su propia hechura: empieza <b>el sendero desvanecido del Lisovik</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec le lissovyk sans jamais s'être libéré de son sentier. Il sourit et replie toute la route en une boucle de sa façon : <b>le sentier évanoui du Lissovyk</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもリソヴィクと歩いていながら、一度もその道から逃れられなかった。彼はにやりと笑い、道全体を自分好みの輪へと折り畳んでしまう。<b>リソヴィクの消える小道</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> old advice for escaping a lisovyk's spell was to turn your coat inside out and put your shoes on the wrong feet, since the spirit was said to recognise a traveler by the ordinary shape of their clothes and lose track of anyone who broke the pattern.|<b>Tras la historia:</b> el viejo consejo para escapar del hechizo de un lisovik era ponerse la chaqueta del revés y los zapatos en el pie contrario, ya que se decía que el espíritu reconocía a un viajero por la forma ordinaria de su ropa y perdía la pista de quien rompiera el patrón.|<b>Derrière l'histoire :</b> le vieux conseil pour échapper au sortilège d'un lissovyk était de retourner sa veste et de mettre ses chaussures au mauvais pied, car l'esprit reconnaissait, disait-on, un voyageur à la forme ordinaire de ses habits et perdait la trace de quiconque rompait le motif.|<b>物語の背景:</b> リソヴィクの呪縛から逃れる昔ながらの知恵は、上着を裏返しに着て靴を左右逆に履くことだったという。この精霊は旅人をいつもの服の形で見分けるとされ、その型を崩した者は見失ってしまうからである。",
  ),
  pleased: t(
    "He swings from a low branch to show off, and a coin worked loose from the bark falls at your feet. <b>{0}</b> gains <span class='money'>+{1}</span>.|Se balancea de una rama baja para presumir, y una moneda que se soltó de la corteza cae a tus pies. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il se balance à une branche basse pour frimer, et une pièce délogée de l'écorce tombe à tes pieds. <b>{0}</b> gagne <span class='money'>+{1}</span>.|得意げに低い枝にぶら下がって見せた拍子に、樹皮に挟まっていた銭が一枚、足元に落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A rushnyk is left tied to a branch where he can see it. Lisovyky are said to respect an offering above everything, and he backs off, slipping past <b>{0}</b> without noticing this turn.|Se deja un rushnyk atado a una rama donde pueda verlo. Se dice que los lisovyky respetan una ofrenda sobre todas las cosas, y retrocede, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|On attache un rushnyk à une branche où il peut le voir. On dit que les lissovyky respectent une offrande par-dessus tout, et il recule, se glissant devant <b>{0}</b> sans le remarquer ce tour-ci.|見えるところに枝へ結んだルシュヌィクを置いた。リソヴィクは何より供え物を重んじるという。彼はひるんで後ずさり、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。リソヴィクのいたずら好きな性格に合わせ、大げさで滑稽な話にしてある。 */
export const UKRAINE_DOOM = [
  {
    id: "hrad",
    n: t("A hailstorm flattens the orchard|Una granizada arrasa el huerto|Une averse de grêle rase le verger|雹嵐が果樹園をなぎ倒す"),
    t: t(
      "The sky went the colour of a bruise in under an hour, and stones the size of walnuts stripped a season's apples off their branches in about ten minutes flat. Steppe storms build fast and hit narrow, so one orchard can lose everything while a field an hour's walk away sees nothing but a light shower.|El cielo se puso del color de un moretón en menos de una hora, y piedras del tamaño de nueces arrancaron de las ramas las manzanas de toda una temporada en unos diez minutos. Las tormentas de la estepa se forman rápido y golpean estrecho, así que un huerto puede perderlo todo mientras un campo a una hora a pie no ve más que un chubasco ligero.|Le ciel a pris la couleur d'un bleu en moins d'une heure, et des grêlons gros comme des noix ont arraché des branches les pommes de toute une saison en une dizaine de minutes. Les orages de steppe se forment vite et frappent étroit, si bien qu'un verger peut tout perdre pendant qu'un champ à une heure de marche ne voit qu'une petite averse.|一時間もしないうちに空はあざのような色に変わり、クルミほどの大きさの雹が、わずか十分ほどで一season分のリンゴを枝からもぎ取っていった。ステップの嵐は急に発達し、狭い範囲を直撃するので、ある果樹園がすべてを失う一方、歩いて一時間の畑ではただの小雨で済むこともある。",
    ),
    months: [1, 2, 3],
  },
  {
    id: "povin",
    n: t("Spring meltwater floods the road|El deshielo de primavera inunda el camino|La fonte des neiges inonde la route|雪解け水で道が水浸しになる"),
    t: t(
      "The snow up in the hills melted faster than the river channels could carry it away, and the low road out of town sat under knee-deep water for the better part of a week. Locals mostly shrug and wait it out; the flood is annual enough that nobody plans a spring trip without a backup route in mind.|La nieve de las colinas se derritió más rápido de lo que los cauces del río podían evacuarla, y el camino bajo a las afueras del pueblo quedó bajo agua hasta la rodilla durante buena parte de una semana. Los lugareños casi se encogen de hombros y esperan; la inundación es tan anual que nadie planea un viaje de primavera sin una ruta alternativa en mente.|La neige des collines a fondu plus vite que les lits de la rivière ne pouvaient l'évacuer, et la route basse à la sortie de la ville est restée sous l'eau jusqu'aux genoux pendant presque une semaine. Les habitants haussent surtout les épaules et attendent ; la crue est si annuelle que personne ne planifie un voyage de printemps sans itinéraire de secours.|山の雪が川筋の流量を超える速さで解け、町外れの低い道は一週間近く膝の深さまで水に浸かった。地元の人はたいてい肩をすくめて待つだけである。この洪水はあまりに毎年のことなので、誰も予備のルートなしに春の旅を計画しない。",
    ),
    months: [0, 1],
  },
  {
    id: "zamitil",
    n: t("A blizzard shuts the line|Una ventisca cierra la línea|Une tempête de neige ferme la ligne|吹雪で線路が止まる"),
    t: t(
      "Wind off the open plain piled the snow into drifts taller than a train door before the ploughs could get out ahead of it, and the timetable simply stopped meaning anything until the track was clear again. Passengers wait it out at the platform buffet, and somebody always has a thermos of tea to share around.|El viento de la llanura abierta amontonó la nieve en ventisqueros más altos que la puerta de un tren antes de que las quitanieves pudieran adelantarse, y el horario simplemente dejó de significar nada hasta que la vía quedó despejada de nuevo. Los pasajeros esperan en la cafetería del andén, y siempre hay alguien con un termo de té para compartir.|Le vent de la plaine ouverte a entassé la neige en congères plus hautes qu'une porte de train avant que les chasse-neige n'aient pu prendre les devants, et l'horaire a simplement cessé de vouloir dire quoi que ce soit jusqu'au dégagement de la voie. Les passagers patientent au buffet du quai, et il y a toujours quelqu'un avec un thermos de thé à partager.|平原を吹き抜ける風が、除雪車が出るより先に列車のドアより高い吹きだまりを作ってしまい、線路が再び通れるようになるまで時刻表は意味を失った。乗客はホームの売店で待つほかなく、いつも誰かが魔法瓶の紅茶を分けてくれる。",
    ),
    months: [8, 9, 10],
  },
  {
    id: "stepova-pozhezha",
    n: t("A reed fire races across the steppe|Un incendio de cañaverales cruza la estepa|Un feu de roseaux traverse la steppe|葦原の火が草原を走る"),
    t: t(
      "A stray spark in the dry reed beds turned into a wall of flame that outran a person on foot before the local brigade could box it in with a ploughed firebreak. Dry summer grassland burns fast enough here that farmers plough bare strips around fields as routine insurance, whether or not a fire ever actually comes.|Una chispa perdida en los cañaverales secos se convirtió en una pared de fuego que superó a una persona a pie antes de que la brigada local pudiera acorralarla con un cortafuegos arado. La hierba seca del verano arde aquí tan rápido que los agricultores aran franjas desnudas alrededor de los campos como seguro rutinario, llegue o no llegue nunca un incendio.|Une étincelle perdue dans les roselières sèches s'est changée en un mur de flammes qui a distancé un homme à pied avant que la brigade locale ne l'encercle d'un pare-feu labouré. L'herbe sèche de l'été brûle ici assez vite pour que les fermiers labourent des bandes nues autour des champs par précaution habituelle, qu'un incendie survienne un jour ou non.|乾いた葦原に飛んだ火の粉が、地元の消防団が耕した防火帯で囲い込むより先に、歩く人間を追い越すほどの炎の壁に変わった。ここの夏の乾いた草地はあまりに燃えやすいため、農家は火事が実際に来るかどうかに関わらず、日頃の備えとして畑の周りに何も生えていない帯を耕しておく。",
    ),
    months: [3, 4, 5],
  },
  {
    id: "tamada-obov-yazok",
    n: t("Made toastmaster at someone else's wedding|Nombrado maestro de brindis en la boda de otro|Nommé maître des toasts au mariage d'un autre|よその結婚式でタマダに任命される",
    ),
    t: t(
      "The best man's voice gave out somewhere around the fifteenth toast, and the whole table turned expectantly to whoever looked most sober. Being tamada means keeping the toasts flowing, the mood high and, by unwritten custom, chipping in extra afterward to thank the band for playing past midnight.|La voz del padrino se agotó hacia el decimoquinto brindis, y toda la mesa se volvió expectante hacia quien parecía más sobrio. Ser tamada significa mantener los brindis fluyendo, el ánimo alto y, por costumbre no escrita, poner algo extra después para agradecer a la banda que tocara pasada la medianoche.|La voix du témoin s'est éteinte vers le quinzième toast, et toute la tablée s'est tournée avec espoir vers qui semblait le plus sobre. Être tamada, c'est faire couler les toasts, maintenir l'ambiance et, par coutume non écrite, remettre un peu plus ensuite pour remercier l'orchestre d'avoir joué après minuit.|新郎の付き添い役の声が15回目あたりの乾杯でかすれてしまい、テーブル中の視線がいちばん素面に見える者へ期待を込めて向いた。タマダを務めるとは、乾杯を絶やさず場を盛り上げ続け、暗黙の習わしとして、深夜を過ぎても演奏を続けたバンドへの心付けまで余分に出すことを意味する。",
    ),
  },
  {
    id: "lisovyk-stezhka",
    n: t("Led in circles by the lisovyk|El lisovik te hace caminar en círculos|Le lissovyk te fait tourner en rond|リソヴィクに輪を描いて歩かされる"),
    t: t(
      "The path out of the woods looked exactly the same at every turn, and only well after dark does it become clear that the same fallen log has been stepped over four times. Old tales blame the lisovyk for this exact trick, walking a traveler in loops all evening for the fun of it and vanishing the moment the path is finally found.|El camino fuera del bosque parecía idéntico en cada recodo, y solo bien entrada la noche queda claro que el mismo tronco caído se ha pisado cuatro veces. Los viejos cuentos culpan de esta treta al lisovik, que hace caminar en bucles a un viajero toda la tarde por diversión y desaparece en cuanto por fin se encuentra el camino.|Le chemin hors du bois semblait identique à chaque tournant, et ce n'est que bien après la nuit tombée qu'il devient clair que le même tronc abattu a été enjambé quatre fois. Les vieux contes en accusent le lissovyk, qui fait tourner en boucle un voyageur toute la soirée pour s'amuser et disparaît dès que le chemin est enfin retrouvé.|森を抜ける道はどの角を曲がっても同じ景色に見え、すっかり日が暮れてからようやく、同じ倒木を四度もまたいでいたと気づいた。昔話はこの仕掛けをリソヴィクのしわざだとする。面白がって旅人を一晩じゅう輪を描くように歩かせ、ようやく道を見つけた瞬間に消えるという。",
    ),
  },
  {
    id: "bazaar-pickpocket",
    n: t("A pickpocket works the bazaar|Un carterista trabaja el bazar|Un pickpocket sévit au bazar|バザールですりに遭う"),
    t: t(
      "A shoulder bump between two crowded stalls was over before it registered as anything, and only at the next stall does the missing weight in a pocket become obvious. The market is loud and packed enough on a Saturday that nobody nearby noticed a thing.|Un roce de hombro entre dos puestos abarrotados pasó antes de que se notara como algo, y solo en el siguiente puesto se hace evidente el peso que falta en un bolsillo. El mercado está tan bullicioso y abarrotado un sábado que nadie cerca notó nada.|Un coup d'épaule entre deux étals bondés est passé avant même d'être remarqué, et ce n'est qu'à l'étal suivant que le poids manquant dans une poche devient évident. Le marché est si bruyant et si dense un samedi que personne aux alentours n'a rien vu.|混み合う露店の合間で肩がぶつかった程度にしか感じなかったが、次の店に着いてはじめてポケットの軽さに気づいた。土曜のバザールはざわめきと人混みでいっぱいで、近くの誰も何にも気づかなかった。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、日本・韓国・フランスと
 * 同じく地方まるごとの好不況で差をつける(効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の ukraine の項)。
 */
export const UKRAINE_SEASONS = [
  {
    e: "🥚",
    n: t("Willow branches and painted eggs before Easter|Ramas de sauce y huevos pintados antes de Pascua|Rameaux de saule et œufs peints avant Pâques|柳の枝と彩色卵、復活祭前の月"),
    t: t(
      "The Sunday before Orthodox Easter, churchgoers carry pussy-willow branches instead of palms, since willow buds out reliably this early while nothing else in the garden has caught up yet. In kitchens across the country, eggs come out of their wax-resist dye baths in patterns that took most of a childhood to learn properly.|El domingo anterior a la Pascua ortodoxa, los feligreses llevan ramas de sauce en vez de palmas, ya que el sauce brota con fiabilidad tan pronto mientras nada más en el jardín se ha puesto al día. En cocinas de todo el país, los huevos salen de sus baños de tinte con reserva de cera en patrones que llevó casi toda una infancia aprender bien.|Le dimanche avant Pâques orthodoxe, les fidèles portent des rameaux de saule plutôt que des palmes, le saule bourgeonnant fiablement dès cette période alors que rien d'autre au jardin n'a encore rattrapé son retard. Dans les cuisines du pays entier, des œufs sortent de leurs bains de teinture à réserve de cire selon des motifs qu'il a fallu presque toute une enfance pour apprendre correctement.|正教会の復活祭の前の日曜、信徒たちはシュロの代わりに柳の枝を手にする。庭の他の木々がまだ追いついていないこの時期でも、柳だけは確実に芽吹くからである。国じゅうの台所では、覚えるのに子ども時代のほとんどを要するような文様で、蝋染めの卵が染料の甕から引き上げられる。",
    ),
    f: t(
      "The blessed willow branches are traditionally kept behind an icon all year and used the following spring to lightly tap family members awake, a custom meant to pass on the branch's health rather than to startle anyone.|Las ramas de sauce bendecidas se guardan tradicionalmente tras un icono todo el año y se usan la primavera siguiente para dar golpecitos suaves a los familiares al despertar, una costumbre pensada para transmitir la salud de la rama y no para asustar a nadie.|Les rameaux de saule bénis sont traditionnellement gardés derrière une icône toute l'année et servent le printemps suivant à tapoter légèrement les membres de la famille au réveil, une coutume censée transmettre la santé du rameau plutôt qu'effrayer qui que ce soit.|祝福された柳の枝は伝統的に一年じゅうイコンの裏に保管され、翌春には家族を軽く叩いて起こすのに使われる。驚かすためではなく、枝の持つ健やかさを分け与えるための習わしである。",
    ),
  },
  {
    e: "🧺",
    n: t("Spring picnics under the first green leaves|Meriendas de primavera bajo las primeras hojas verdes|Pique-niques de printemps sous les premières feuilles vertes|新緑の下でのマイウカ野遊び"),
    t: t(
      "On the first of May, families and whole workplaces once traditionally headed out of town for a maivka, a spring picnic in the woods or a park meant to mark the season turning for good rather than to celebrate any particular date on the calendar. Forsythia and lilac come into bloom around the same weeks, and market stalls fill with the season's first radishes.|El primero de mayo, familias y hasta oficinas enteras solían salir tradicionalmente de la ciudad para una maivka, una merienda de primavera en el bosque o un parque pensada para marcar el cambio de estación más que para celebrar una fecha concreta del calendario. La forsitia y la lila florecen por esas mismas semanas, y los puestos del mercado se llenan de los primeros rábanos de la temporada.|Le premier mai, familles et lieux de travail entiers partaient jadis traditionnellement hors de la ville pour une maïvka, un pique-nique de printemps en forêt ou dans un parc censé marquer le tournant définitif de la saison plutôt que célébrer une date précise du calendrier. Le forsythia et le lilas fleurissent vers ces mêmes semaines, et les étals du marché se remplissent des premiers radis de la saison.|5月1日、かつては家族や職場ぐるみで町の外へ出て、森や公園でマイウカと呼ばれる春の野遊びをするのが習わしだった。特定の暦の日を祝うためというより、季節が本格的に変わったことを示す行事である。同じ頃レンギョウとライラックが咲き、市場の露店には今シーズン最初のラディッシュが並ぶ。",
    ),
    f: t(
      "The maivka tradition is strongest in the west of the country, where it arrived under Habsburg rule as an imported spring outing before taking on its own local shape over the following century.|La tradición de la maivka es más fuerte en el oeste del país, donde llegó bajo el dominio de los Habsburgo como una salida de primavera importada antes de adoptar su propia forma local a lo largo del siglo siguiente.|La tradition de la maïvka est la plus forte à l'ouest du pays, où elle arriva sous la domination des Habsbourg comme une sortie de printemps importée avant de prendre sa propre forme locale au cours du siècle suivant.|マイウカの伝統は国の西部で特に根強い。ハプスブルク統治下に外から持ち込まれた春の遠出として伝わり、その後一世紀ほどかけて土地ごとの独自の形を得た。",
    ),
  },
  {
    e: "🔥",
    n: t("Bonfires and floating wreaths at midsummer|Hogueras y coronas flotantes en el solsticio de verano|Feux de joie et couronnes flottantes au solstice d'été|夏至の焚き火と流れる花冠"),
    t: t(
      "On the night of Ivana Kupala, riverside towns light bonfires that couples jump over hand in hand for luck, while wreaths of wildflowers carrying a lit candle are set adrift downstream to be read for signs about the year ahead. Haymaking is also in full swing this month, cut fields drying in long rows across the plains.|En la noche de Ivana Kupala, los pueblos junto al río encienden hogueras que las parejas saltan de la mano por suerte, mientras coronas de flores silvestres con una vela encendida se dejan a la deriva río abajo para leer señales sobre el año que viene. La siega del heno también está en pleno apogeo este mes, con campos cortados secándose en largas hileras por las llanuras.|La nuit d'Ivana Koupala, les villes au bord de l'eau allument des feux de joie que les couples sautent main dans la main pour la chance, tandis que des couronnes de fleurs sauvages portant une bougie allumée sont lâchées sur le courant pour y lire des signes sur l'année à venir. La fenaison bat aussi son plein ce mois-ci, les champs fauchés séchant en longues andains à travers les plaines.|イヴァナ・クパーラの夜、川沿いの町々は焚き火を焚き、恋人たちは手をつないで幸運を願って飛び越える。灯した蝋燭を立てた野花の花冠は川に流され、来る一年の兆しを読むために見送られる。この月は牧草刈りも最盛期で、刈られた草が平原に長い列をなして干される。",
    ),
    f: t(
      "The holiday predates Christianity and was folded into the calendar alongside the feast of John the Baptist, which is why fire, water and fern-hunting customs still sit comfortably beside an explicitly religious name.|La fiesta es anterior al cristianismo y se plegó al calendario junto a la festividad de san Juan Bautista, razón por la que las costumbres del fuego, el agua y la búsqueda del helecho aún conviven sin problema con un nombre explícitamente religioso.|La fête est antérieure au christianisme et fut intégrée au calendrier aux côtés de la fête de saint Jean-Baptiste, ce qui explique pourquoi les coutumes du feu, de l'eau et de la quête de la fougère cohabitent encore sans mal avec un nom explicitement religieux.|この祝祭はキリスト教以前からのもので、洗礼者ヨハネの祝日とあわせて暦に組み込まれた。火や水、シダ探しの習わしが、いまも明確に宗教的な名前と違和感なく同居しているのはそのためである。",
    ),
  },
  {
    e: "🍒",
    n: t("Cherry orchards ripen across the villages|Los huertos de cerezos maduran por los pueblos|Les vergers de cerisiers mûrissent dans les villages|村々の桜桃畑が熟す"),
    t: t(
      "Sour cherries ripen heavy on the branch this month, dark enough to stain fingers, and households pit buckets of them at a time for jam, dumpling filling and a syrupy home liqueur that will not be ready to drink until well into winter. A small whitewashed house with a cherry orchard beside it is one of the most repeated images in the country's folk songs.|Las guindas maduran pesadas en la rama este mes, tan oscuras que manchan los dedos, y las casas deshuesan cubos enteros a la vez para mermelada, relleno de empanadillas y un licor casero almibarado que no estará listo para beber hasta bien entrado el invierno. Una pequeña casa encalada con un huerto de cerezos al lado es una de las imágenes más repetidas en las canciones populares del país.|Les griottes mûrissent lourdes sur la branche ce mois-ci, assez sombres pour tacher les doigts, et les foyers dénoyautent des seaux entiers pour la confiture, la garniture des raviolis et une liqueur maison sirupeuse qui ne sera prête à boire que bien avant dans l'hiver. Une petite maison blanchie à la chaux avec un verger de cerisiers à côté est l'une des images les plus répétées dans les chansons populaires du pays.|この月、スミミザクラは枝もたわわに熟し、指を染めるほど濃い色になる。各家庭は一度にバケツ何杯分もの種を抜き、ジャムやヴァレーヌィキの具、冬も深まるまで飲み頃にならないシロップ仕立ての自家製リキュールに仕立てる。白壁の小さな家とそのそばの桜桃畑は、この国の民謡でもっとも繰り返し歌われる風景の一つである。",
    ),
    f: t(
      "The folk song \"Nich Yaka Misiachna\" and countless others use the cherry orchard beside a house as shorthand for home itself, which is why the image turns up on everything from postcards to school textbook covers.|La canción popular «Nich Yaka Misiachna» y muchas otras usan el huerto de cerezos junto a una casa como abreviatura del propio hogar, razón por la que la imagen aparece en todo, desde postales hasta portadas de libros de texto escolares.|La chanson populaire « Nitch Iaka Missiatchna » et bien d'autres utilisent le verger de cerisiers près d'une maison comme raccourci du foyer lui-même, ce qui explique que l'image apparaisse sur tout, des cartes postales aux couvertures de manuels scolaires.|民謡「ニチ・ヤカ・ミシャチナ」をはじめ数々の歌が、家のそばの桜桃畑を「家庭」そのものの象徴として使う。この情景が絵葉書から教科書の表紙まであらゆる所に現れるのはそのためである。",
    ),
  },
  {
    e: "🍯",
    n: t("Honey and apples blessed at the Spas feasts|Miel y manzanas bendecidas en las fiestas del Spas|Miel et pommes bénies aux fêtes du Spas|蜂蜜とリンゴを祝福するスパス祭",
    ),
    t: t(
      "Early in the month, churches bless jars of fresh honey at the Feast of the Honey Saviour, and two weeks later baskets of the season's first apples at the Feast of the Apple Saviour, a custom old enough that many households will not eat a single apple before that second blessing. The country's independence, declared in 1991, is also marked this month, on the twenty-fourth.|A principios de mes, las iglesias bendicen tarros de miel fresca en la fiesta del Salvador de la Miel, y dos semanas después cestas de las primeras manzanas de la temporada en la fiesta del Salvador de la Manzana, una costumbre tan antigua que muchas casas no comen ni una manzana antes de esa segunda bendición. La independencia del país, declarada en 1991, también se conmemora este mes, el veinticuatro.|Au début du mois, les églises bénissent des pots de miel frais à la fête du Sauveur au miel, et deux semaines plus tard des paniers des premières pommes de la saison à la fête du Sauveur aux pommes, une coutume assez ancienne pour que bien des foyers ne mangent pas une seule pomme avant cette seconde bénédiction. L'indépendance du pays, déclarée en 1991, est aussi marquée ce mois-ci, le vingt-quatre.|月の初め、教会では蜂蜜祭で採れたての蜂蜜の瓶が祝福され、二週間後にはリンゴ祭で今シーズン最初のリンゴを詰めた籠が祝福される。この習わしはあまりに古く、多くの家庭は二度目の祝福を受けるまでリンゴを一つも口にしない。1991年に宣言された独立記念日も、この月の24日にあたる。",
    ),
    f: t(
      "The two feasts are named for the Saviour rather than the food itself, and the honey and apples are simply what happens to be ready for blessing at that point in the harvest calendar.|Las dos fiestas llevan el nombre del Salvador y no del alimento en sí, y la miel y las manzanas son sencillamente lo que resulta estar listo para bendecir en ese punto del calendario de la cosecha.|Les deux fêtes portent le nom du Sauveur plutôt que celui de l'aliment lui-même, le miel et les pommes étant simplement ce qui se trouve prêt à être béni à ce moment du calendrier des récoltes.|この二つの祝祭は食べ物ではなく「救い主」にちなんで名付けられており、蜂蜜とリンゴは、収穫暦のその時期にちょうど祝福される準備が整っているものにすぎない。",
    ),
  },
  {
    e: "🎒",
    n: t("The First Bell opens a new school year|La Primera Campana abre un nuevo curso escolar|La Première Cloche ouvre une nouvelle année scolaire|新学年を告げる「最初の鐘」"),
    t: t(
      "On the first of September, known as the First Bell, students arrive in their best clothes carrying flowers for their teachers rather than books, and the day is treated as a small festival in its own right before lessons properly begin. In the south and west, vineyards begin their harvest around the same weeks.|El primero de septiembre, conocido como la Primera Campana, los alumnos llegan con su mejor ropa y llevando flores para sus profesores en vez de libros, y el día se trata como un pequeño festival en sí mismo antes de que empiecen de verdad las clases. En el sur y el oeste, los viñedos inician su vendimia por esas mismas semanas.|Le premier septembre, connu comme la Première Cloche, les élèves arrivent dans leurs plus beaux habits en portant des fleurs pour leurs enseignants plutôt que des livres, et la journée est traitée comme une petite fête à part entière avant que les cours ne commencent vraiment. Au sud et à l'ouest, les vignobles entament leurs vendanges vers ces mêmes semaines.|9月1日は「最初の鐘」と呼ばれ、生徒たちは教科書ではなく花を手に、いちばん良い服を着て登校する。本格的な授業が始まる前に、その日自体が小さな祭りとして扱われる。南部や西部では、ちょうど同じ頃からぶどうの収穫が始まる。",
    ),
    f: t(
      "The custom of gifting a teacher flowers rather than the reverse dates to Soviet-era schooling and has stayed almost unchanged since, down to the preference for odd numbers of stems, which superstition reserves for the living.|La costumbre de regalar flores al profesor, en vez de al revés, se remonta a la escolarización de la era soviética y ha permanecido casi sin cambios desde entonces, hasta la preferencia por números impares de tallos, que la superstición reserva a los vivos.|La coutume d'offrir des fleurs à l'enseignant plutôt que l'inverse remonte à la scolarité de l'ère soviétique et est restée presque inchangée depuis, jusqu'à la préférence pour un nombre impair de tiges, que la superstition réserve aux vivants.|教師に花を贈るという、逆ではなくこちら向きの習わしはソ連時代の学校教育に遡り、以来ほとんど変わっていない。本数を奇数にする好みまで残っており、迷信では偶数は弔いのためとされる。",
    ),
  },
  {
    e: "🥔",
    n: t("Pokrova and the last of the potato harvest|Pokrova y la última cosecha de patatas|La Pokrova et les dernières pommes de terre|ポクロヴァと最後のジャガイモ掘り"),
    t: t(
      "The Feast of the Protection of the Mother of God on the fourteenth was traditionally the day by which the potato harvest had to be in and the first frost was expected, and it also marks the old patronal feast of the Zaporozhian Cossacks, still marked with folk costume and horsemanship displays in some towns. The leaves turn fully across the Carpathian foothills by the end of the month.|La fiesta de la Protección de la Madre de Dios, el catorce, era tradicionalmente el día en que debía estar recogida la cosecha de patatas y se esperaba la primera helada, y también marca la antigua fiesta patronal de los cosacos zaporogos, aún celebrada con traje folclórico y exhibiciones ecuestres en algunos pueblos. Las hojas cambian por completo en el piedemonte de los Cárpatos hacia fin de mes.|La fête de la Protection de la Mère de Dieu, le quatorze, marquait traditionnellement le jour où la récolte de pommes de terre devait être rentrée et où l'on attendait le premier gel, et elle marque aussi l'ancienne fête patronale des Cosaques zaporogues, encore célébrée avec costumes folkloriques et démonstrations équestres dans certaines villes. Les feuilles changent complètement au pied des Carpates vers la fin du mois.|10月14日の生神女庇護祭は、伝統的にジャガイモの収穫を終え初霜を迎える目安の日とされてきた。この日はまたザポロージャ・コサックの古くからの守護聖人祭でもあり、いくつかの町ではいまも民族衣装と馬術の披露で祝われる。月末にはカルパチア山麓の紅葉がすっかり進む。",
    ),
    f: t(
      "The Cossacks are said to have chosen this feast as their patronal day because it fell after the harvest and the campaigning season alike, leaving a rare stretch of calendar free for both prayer and celebration.|Se dice que los cosacos eligieron esta fiesta como su día patronal porque caía después de la cosecha y de la temporada de campañas por igual, dejando un tramo poco frecuente del calendario libre tanto para la oración como para la celebración.|On dit que les Cosaques choisirent cette fête comme jour patronal parce qu'elle tombait après la récolte comme après la saison des campagnes, laissant une rare plage du calendrier libre à la fois pour la prière et la fête.|コサックがこの祝祭を守護聖人の日に選んだのは、収穫期と遠征の季節の両方が終わったあとに巡ってくるためだとされる。祈りにも祝いにも充てられる、暦の中でも珍しく余裕のある時期だった。",
    ),
  },
  {
    e: "🪿",
    n: t("Goose feasts mark the start of the winter fast|Las fiestas de la oca marcan el inicio del ayuno de invierno|Les fêtes de l'oie marquent le début du jeûne d'hiver|ガチョウ祭りが冬の斎の始まりを告げる"),
    t: t(
      "In parts of the west, Saint Martin's Day in mid-November is marked with a roast goose dinner, one last rich meal before the forty-day Advent fast that follows leans the table toward simpler food. By the end of the month, most of the wine pressed from the autumn's grapes has finished its first, roughest fermentation.|En partes del oeste, el día de San Martín, a mediados de noviembre, se celebra con una cena de oca asada, una última comida rica antes de que el ayuno de Adviento de cuarenta días que sigue incline la mesa hacia comida más sencilla. Hacia fin de mes, la mayor parte del vino prensado de las uvas de otoño ha terminado su primera y más áspera fermentación.|Dans certaines régions de l'ouest, la Saint-Martin, à la mi-novembre, se fête d'un dîner d'oie rôtie, dernier repas copieux avant que le jeûne de l'Avent de quarante jours qui suit ne penche la table vers une nourriture plus simple. Vers la fin du mois, l'essentiel du vin pressé des raisins de l'automne a terminé sa première fermentation, la plus rude.|西部の一部では、11月半ばの聖マルティヌスの日をローストガチョウの夕食で祝う。これに続く四十日の待降節の斎で食卓が質素なものへと傾く前の、最後のごちそうである。月末までには、秋のぶどうから搾った葡萄酒の大半が、最初の荒々しい発酵を終えている。",
    ),
    f: t(
      "The Advent fast that follows discourages meat, dairy and eggs on most days, which is part of why goose, cheese and rich pastries get one last showing at gatherings just before it begins.|El ayuno de Adviento que sigue desaconseja carne, lácteos y huevos la mayoría de los días, lo que en parte explica por qué la oca, el queso y los pasteles ricos tienen una última aparición en las reuniones justo antes de que empiece.|Le jeûne de l'Avent qui suit déconseille viande, laitages et œufs la plupart des jours, ce qui explique en partie pourquoi l'oie, le fromage et les pâtisseries riches font une dernière apparition dans les réunions juste avant qu'il ne commence.|続く待降節の斎は、たいていの日に肉・乳製品・卵を控えるよう求める。ガチョウやチーズ、こってりした焼き菓子が斎の始まる直前の集まりで最後に顔を見せるのは、そのためでもある。",
    ),
  },
  {
    e: "🌾",
    n: t("A didukh sheaf stands watch over Christmas Eve|Un haz didukh vigila la Nochebuena|Une gerbe didoukh veille sur le réveillon de Noël|クリスマスイブを見守るディドゥフの麦束"),
    t: t(
      "A didukh, a tall sheaf of wheat bound and stood in the corner of the main room, represents ancestors watching over the household through the twelve-dish Christmas Eve meal, which many households now hold on the twenty-fifth of December rather than the seventh of January, following a change formalised in 2023. The straw is kept until the old New Year and only then burned or scattered on the fields for luck.|Un didukh, un alto haz de trigo atado y plantado en el rincón de la sala principal, representa a los antepasados velando por el hogar durante la cena de Nochebuena de doce platos, que muchas familias celebran ya el veinticinco de diciembre en vez del siete de enero, tras un cambio formalizado en 2023. La paja se guarda hasta el viejo Año Nuevo y solo entonces se quema o se esparce por los campos para dar suerte.|Un didoukh, une haute gerbe de blé liée et dressée dans un coin de la pièce principale, représente les ancêtres veillant sur le foyer pendant le repas du réveillon aux douze plats, que beaucoup de familles tiennent désormais le vingt-cinq décembre plutôt que le sept janvier, suivant un changement officialisé en 2023. La paille est gardée jusqu'au vieux Nouvel An puis seulement brûlée ou éparpillée dans les champs pour la chance.|部屋の隅に束ねて立てるディドゥフという背の高い麦束は、十二品のクリスマスイブの食卓を見守る祖先を表す。2023年に正式化された変更を受け、多くの家庭はいまや1月7日ではなく12月25日にこの食事を行うようになった。この麦わらは旧正月まで取っておかれ、そこで初めて燃やされるか、縁起を担いで畑にまかれる。",
    ),
    f: t(
      "The word didukh comes from the same root as \"grandfather\", making the sheaf a fairly literal stand-in for the family's oldest ancestors rather than an abstract harvest symbol.|La palabra didukh viene de la misma raíz que «abuelo», lo que hace del haz un sustituto bastante literal de los antepasados más lejanos de la familia y no un símbolo abstracto de la cosecha.|Le mot didoukh vient de la même racine que « grand-père », faisant de la gerbe un substitut assez littéral des plus anciens ancêtres de la famille plutôt qu'un symbole abstrait de la récolte.|ディドゥフという語は「祖父」と同じ語根を持ち、この麦束は収穫を表す抽象的な象徴というより、一族の最も古い祖先そのものの、かなり文字どおりの代わりだと言える。",
    ),
  },
  {
    e: "🎭",
    n: t("Carollers and the Malanka masquerade|Villancicos y la mascarada de Malanka|Chants de Noël et mascarade de Malanka|キャロル歌いとマランカの仮面行列"),
    t: t(
      "Groups of carollers go door to door through the old New Year on the thirteenth and fourteenth singing shchedrivky, wishing songs that promise a household health and a good harvest in exchange for a small treat, while the Malanka masquerade in some regions sends costumed characters, sometimes a bear, sometimes a goat, dancing through the streets. Deep winter cold usually sets in fully by now.|Grupos de villanceros van de puerta en puerta durante el viejo Año Nuevo, el trece y el catorce, cantando shchedrivky, canciones de deseo que prometen salud y buena cosecha a la casa a cambio de un pequeño regalo, mientras la mascarada de Malanka en algunas regiones envía por las calles a personajes disfrazados, a veces un oso, a veces una cabra. El frío profundo del invierno suele instalarse del todo para entonces.|Des groupes de chanteurs font du porte-à-porte pendant le vieux Nouvel An, les treize et quatorze, chantant des chtchedrivky, chants de vœux promettant santé et bonne récolte au foyer contre une petite friandise, tandis que la mascarade de Malanka envoie dans certaines régions des personnages costumés, parfois un ours, parfois une chèvre, danser dans les rues. Le froid profond de l'hiver s'installe généralement tout à fait à ce moment.|旧暦の大晦日にあたる13日から14日にかけて、キャロル歌いの一団が家々を回り、健康と豊作を約束する願い歌シチェドリウキを歌って、ちょっとしたお返しをもらう。地方によってはマランカの仮面行列もあり、熊や山羊に扮した人物が通りを踊り歩く。このころには本格的な厳寒がすっかり定着している。",
    ),
    f: t(
      "The song \"Shchedryk\", written in 1916 and later reworked abroad into \"Carol of the Bells\", was originally one of exactly this kind of shchedrivka, wishing a swallow's news of a rich household onto whoever answered the door.|La canción «Shchedryk», escrita en 1916 y más tarde readaptada fuera del país como «Carol of the Bells», fue originalmente una de estas mismas shchedrivky, deseando a quien abriera la puerta la noticia de una golondrina anunciando un hogar próspero.|La chanson « Chtchedryk », écrite en 1916 et plus tard retravaillée à l'étranger en « Carol of the Bells », était à l'origine l'une de ces mêmes chtchedrivky, souhaitant à qui ouvrait la porte la nouvelle d'une hirondelle annonçant un foyer prospère.|1916年に書かれ、のちに海外で「キャロル・オブ・ザ・ベルズ」として作り直された「シチェドリク」は、もともとまさにこの種のシチェドリウカの一つで、戸口に出た者へツバメが豊かな家を告げる知らせを願う歌だった。",
    ),
  },
  {
    e: "🥞",
    n: t("Pancake week burns off the last of winter|La semana de los blinís quema el último invierno|La semaine des blinis brûle les derniers jours d'hiver|ブリヌィ週間が冬の名残を焼き払う"),
    t: t(
      "The week before Lent begins is eaten through in thin, round pancakes called mlyntsi, one for every day, their shape and colour meant to stand in for the returning sun. In some villages the week closes with a mock trial and burning of a straw figure representing winter, sent off to make room for spring.|La semana antes de que empiece la Cuaresma se come en finos panqueques redondos llamados mlyntsi, uno para cada día, cuya forma y color representan el sol que regresa. En algunos pueblos la semana termina con un juicio simulado y la quema de una figura de paja que representa el invierno, despedido para dejar sitio a la primavera.|La semaine précédant le Carême se mange en fines crêpes rondes appelées mlyntsi, une par jour, leur forme et leur couleur étant censées représenter le soleil qui revient. Dans certains villages, la semaine se clôt par un procès simulé et la crémation d'une figure de paille représentant l'hiver, congédié pour faire place au printemps.|四旬節が始まる前の週は、丸くて薄いムルィンツィという食べ物で埋め尽くされる。一日一枚、その形と色は戻ってくる太陽を表すとされる。村によっては、この週の締めくくりに冬を表す藁人形の見せかけの裁判と焼却が行われ、春に場所を譲るために送り出される。",
    ),
    f: t(
      "The week keeps its pre-Christian sun symbolism folded into the church calendar as Cheesefare Week, the last stretch before Lent when dairy is still allowed but meat already is not.|La semana conserva su simbolismo solar precristiano integrado en el calendario eclesiástico como la Semana del Queso, el último tramo antes de la Cuaresma en que aún se permiten los lácteos pero la carne ya no.|La semaine garde son symbolisme solaire préchrétien intégré au calendrier de l'Église sous le nom de semaine du fromage, dernière étape avant le Carême où les laitages sont encore permis mais la viande déjà plus.|この週は、教会暦の中では「チーズの週」として、キリスト教以前からの太陽信仰の名残を保ったまま組み込まれている。四旬節前最後のこの期間は、乳製品はまだ許されるが肉はすでに控えられる。",
    ),
  },
  {
    e: "📖",
    n: t("Shevchenko Day honours the national poet|El Día de Shevchenko honra al poeta nacional|Le jour de Chevtchenko honore le poète national|シェウチェンコの日、国民詩人をしのぶ"),
    t: t(
      "On the ninth, schools, libraries and town squares hold public readings of Taras Shevchenko's poetry to mark his birthday, a writer born a serf in 1814 whose work is still learned by heart by most schoolchildren. Crocuses and the first willow catkins are usually the only colour on the steppe this early in the month.|El nueve, escuelas, bibliotecas y plazas celebran lecturas públicas de la poesía de Taras Shevchenko para conmemorar su nacimiento, un escritor nacido siervo en 1814 cuya obra la mayoría de los escolares aún aprenden de memoria. Los azafranes y los primeros amentos de sauce suelen ser el único color en la estepa tan pronto en el mes.|Le neuf, écoles, bibliothèques et places publiques organisent des lectures publiques de la poésie de Taras Chevtchenko pour marquer sa naissance, un écrivain né serf en 1814 dont l'œuvre est encore apprise par cœur par la plupart des écoliers. Les crocus et les premiers chatons de saule sont généralement la seule touche de couleur sur la steppe à cette période du mois.|9日には、農奴として生まれ1814年に世を得た詩人タラス・シェウチェンコの誕生日を記念して、学校や図書館、町の広場で彼の詩の朗読会が開かれる。その作品はいまも多くの生徒が暗誦するほど親しまれている。月のこの時期、草原ではクロッカスと柳の初穂だけがまだ色を添える。",
    ),
    f: t(
      "Shevchenko's collection \"Kobzar\" was so central to the development of a standard literary Ukrainian language that the book's title became a byword for the poet himself in everyday speech.|La colección de Shevchenko, «Kobzar», fue tan central para el desarrollo de una lengua ucraniana literaria estándar que el título del libro se convirtió en sinónimo del propio poeta en el habla cotidiana.|Le recueil de Chevtchenko, « Kobzar », fut si central au développement d'une langue ukrainienne littéraire standard que le titre de l'ouvrage devint, dans le langage courant, un synonyme du poète lui-même.|シェウチェンコの詩集「コブザール」は標準的な文語ウクライナ語の形成にあまりに大きな役割を果たしたため、この書名そのものが日常会話で詩人自身を指す呼び名にもなった。",
    ),
  },
];
