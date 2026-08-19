/**
 * ペルーの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月(0=4月〜11=3月、暦は共通)。
 * ペルーは南半球なので、暦の並びは他国と同じでも中身の季節は逆になる
 * (4月は雨季明けの収穫期、7月は乾季で独立記念日、1月が真夏)。
 *
 * 厄災の神は鉱山の守護霊(ボリビア盤面のエル・ティーオ)とは重ならないよう、
 * 山そのものを人格化した「アプ」(生きたアンデス信仰の対象)にしてある。
 * 峠を無礼に急いで越える旅人を懲らしめる、という設定で盤面の芯
 * (鉄道が山を急いで越えようとする)と重ねた。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const PERU_META = {
  id: "peru",
  name: t("Peru|Perú|Le Pérou|ペルー"),
  blurb: t(
    "A spine of mountains where the railway climbs higher than the body wants to go|Una espina de montañas donde el ferrocarril sube más de lo que el cuerpo quiere|Une épine de montagnes où le chemin de fer grimpe plus haut que le corps ne le voudrait|体が拒む高さまで鉄道が登る、山脈の背骨を持つ国",
  ),
  cur: { pre: "S/ ", post: "", mul: 240 },
  start: "lima",
  cpuNames: ["Cóndor", "Puma", "Amaru", "Chasqui"],
  // 国旗の紅・白、鉱石の銅色、アマゾンの緑、アンデスの土の色。
  stripe: ["#d91023", "#f5f0e6", "#b8860b", "#2f6b3a", "#8b6a3f"],
};

/** 4地方(cities.mjs と同じコード)。 */
export const PERU_REGIONS = {
  co: t("Costa (the coast)|Costa|Côte (la costa)|コスタ(海岸)"),
  si: t("Sierra (the highlands)|Sierra|Sierra (les hauts plateaux)|シエラ(山地)"),
  se: t("Selva (the Amazon)|Selva|Selva (l'Amazonie)|セルバ(熱帯林)"),
  al: t("Altiplano (the southern highlands)|Altiplano|Altiplano (les hauts plateaux du sud)|アルティプラーノ(高原南部)"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種(対応表は
 * `src/infrastructure/content/item-effect-rules.ts`)。
 * 鍵は既存盤面(約300件)と衝突しないことを確認済み。
 *
 * 「向きの選べない移動アイテムは、操縦できるものより安い」の原則どおり、
 * avioneta(飛行機まかせ・260)は combi(自分で選ぶ・380)より安い。
 */
export const PERU_ITEMS = {
  avioneta: {
    e: "🛩️",
    price: 260,
    kind: "move",
    n: t("A Seat on the Bush Plane|Un asiento en la avioneta|Une place dans l'avionnette|奥地便の座席"),
    d: t(
      "Carried 8–12 squares. The pilot decides where you land, not you.|Te lleva de 8 a 12 casillas. Dónde aterrizas lo decide el piloto, no tú.|Emporté de 8 à 12 cases. C'est le pilote qui décide où tu atterris, pas toi.|8〜12マス運ばれる。どこに降りるかは操縦士が決め、乗客には選べない。",
    ),
    f: t(
      "In parts of the Amazon and the high Andes a light aircraft is the only way in or out, and pilots reroute constantly around weather, fuel and whichever cargo was booked first — a passenger is often the last thing decided.|En partes de la Amazonía y los altos Andes, una avioneta es la única manera de entrar o salir, y los pilotos cambian de ruta constantemente por el clima, el combustible y la carga que se reservó primero: un pasajero suele ser lo último que se decide.|Dans certaines parties de l'Amazonie et des hautes Andes, un petit avion est le seul moyen d'entrer ou de sortir, et les pilotes changent constamment de route selon la météo, le carburant et le fret réservé en premier — un passager est souvent la dernière chose décidée.|アマゾンの一部やアンデスの高地では、小型機が出入りする唯一の手段のこともある。操縦士は天候や燃料、先に予約された貨物に合わせて絶えず経路を変える。乗客の扱いは、たいてい最後に決まる。",
    ),
  },
  combi: {
    e: "🚐",
    price: 380,
    kind: "pre",
    n: t("A Combi Going Your Way|Un combi que va hacia allá|Un combi qui va par là|行き先の合う乗合バン"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Combis run fixed routes marked by hand-lettered signs taped inside the windshield, and a conductor hangs half out of the sliding door shouting the destination over traffic to wave down riders headed the same way.|Los combis siguen rutas fijas marcadas con carteles escritos a mano pegados al parabrisas, y un cobrador se asoma medio cuerpo por la puerta corrediza gritando el destino sobre el tráfico para hacer señas a quien va en esa dirección.|Les combis suivent des trajets fixes indiqués par des pancartes manuscrites collées au pare-brise, et un receveur, penché à moitié hors de la portière coulissante, crie la destination par-dessus la circulation pour héler les passagers allant dans la même direction.|コンビ(乗合バン)は、フロントガラスの内側に貼られた手書きの案内板どおりの決まった路線を走る。車掌は引き戸から半身を乗り出し、渋滞の音に負けじと行き先を叫んで、同じ方向へ行きたい客を呼び止める。",
    ),
  },
  trenmacho: {
    e: "🚂",
    price: 340,
    kind: "pre",
    n: t("A Ticket on the Tren Macho|Un boleto en el Tren Macho|Un billet pour le Train Macho|マチョ列車の切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Only a handful of passenger trains still run in Peru at all — most of the network exists to carry ore and concentrate down from the mines — and the railbus that grew into the Tren Macho is one of the few still scheduled specifically for people.|En Perú apenas circulan ya unos pocos trenes de pasajeros —la mayor parte de la red existe para bajar mineral y concentrado de las minas—, y el automotor que dio origen al Tren Macho es uno de los pocos que aún se programa pensando en las personas.|Il ne circule plus au Pérou qu'une poignée de trains de voyageurs — l'essentiel du réseau existe pour descendre le minerai des mines — et l'autorail devenu le Tren Macho est l'un des rares encore programmés spécifiquement pour les gens.|ペルーで残っている旅客列車はごくわずかで、鉄道網の大半は鉱山から鉱石や精鉱を下ろすために存在する。マチョ列車のもとになった気動車は、いまも人を運ぶために時刻表が組まれている数少ない例のひとつである。",
    ),
  },
  expresoandino: {
    e: "🚄",
    price: 620,
    kind: "pre",
    n: t("A Ticket on the Andean Express|Un boleto en el Expreso Andino|Un billet pour l'Express des Andes|アンデス急行の切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Built to reach the mines long before it ever carried a paying passenger, the line still climbs through a summit tunnel above 4,700 metres — for over a century the highest point any standard-gauge railway reached anywhere on Earth.|Construida para llegar a las minas mucho antes de llevar a un solo pasajero de pago, la línea aún sube por un túnel de cumbre a más de 4.700 metros, durante más de un siglo el punto más alto alcanzado por cualquier ferrocarril de trocha estándar en el planeta.|Construite pour atteindre les mines bien avant de transporter le moindre passager payant, la ligne grimpe encore par un tunnel de faîte à plus de 4 700 mètres — pendant plus d'un siècle, le point le plus haut jamais atteint par un chemin de fer à écartement standard sur Terre.|一人の乗客も乗せないうちから鉱山に届くために敷かれたこの路線は、いまも標高4700メートルを超える頂上トンネルを登る。1世紀以上のあいだ、これは世界のどの標準軌鉄道よりも高い地点だった。",
    ),
  },
  chuspa: {
    e: "👝",
    price: 300,
    kind: "passive",
    n: t("A Chuspa of Coca Leaves|Una chuspa de hojas de coca|Une chuspa de feuilles de coca|コカの葉を入れたチュスパ"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Woven chuspa pouches carry coca leaves for chewing against hunger and altitude, or for scattering as a small offering to the mountain spirits called apus before a long climb; the leaf is legal and everyday across the Andes, chewed rather than processed.|Las bolsas tejidas llamadas chuspa llevan hojas de coca para masticar contra el hambre y la altura, o para esparcirlas como pequeña ofrenda a los apus antes de una subida larga; la hoja es legal y cotidiana en los Andes, y se mastica en vez de procesarse.|Les bourses tissées appelées chuspa portent des feuilles de coca à mâcher contre la faim et l'altitude, ou à disperser en petite offrande aux apus avant une longue montée ; la feuille est légale et quotidienne dans les Andes, mâchée plutôt que transformée.|織物の小袋チュスパにはコカの葉が入っている。空腹と高地に備えて噛んだり、長い登りの前にアプ(山の霊)への小さな捧げ物として撒いたりする。この葉はアンデス全域で合法かつ日常のもので、加工されるのではなく噛んで用いられる。",
    ),
  },
  illa: {
    e: "🦙",
    price: 420,
    kind: "pre",
    n: t("A Stone Illa Figure|Una illa de piedra|Une illa de pierre|石のイジャの小像"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Small stone or metal figures called illas, often shaped like a llama or a pair of joined animals, are kept by Andean herding families as a charm for the health of their flocks, handed down rather than bought new for the purpose.|Pequeñas figuras de piedra o metal llamadas illas, a menudo con forma de llama o de un par de animales unidos, las guardan las familias pastoras andinas como amuleto para la salud de su ganado, heredadas antes que compradas para el fin.|De petites figurines de pierre ou de métal appelées illas, souvent en forme de lama ou de deux animaux joints, sont conservées par les familles d'éleveurs andins comme charme pour la santé de leur troupeau, transmises plutôt qu'achetées à cet effet.|イジャと呼ばれる石や金属の小像は、リャマや寄り添う二頭の動物の形をしていることが多く、アンデスの牧畜の家族が家畜の無事を願うお守りとして持つ。新たに買うものというより、代々受け継がれるものである。",
    ),
  },
  machete: {
    e: "📝",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 140,
    kind: "passive",
    n: t("A Machete (Cheat Sheet)|Un machete (chuleta)|Une machete (antisèche)|マチェテ(カンニングペーパー)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "'Machete' is student slang across much of Spanish-speaking Latin America for a hidden cheat sheet, named half-jokingly for how bluntly it is meant to cut through an exam nobody studied for.|'Machete' es jerga estudiantil en buena parte de Latinoamérica hispanohablante para una chuleta escondida, llamada así medio en broma por lo tajante con que se supone que resuelve un examen para el que nadie estudió.|« Machete » est un argot étudiant dans une bonne partie de l'Amérique latine hispanophone pour une antisèche cachée, ainsi nommée à moitié en plaisanterie pour la façon abrupte dont elle est censée trancher un examen que personne n'a préparé.|「マチェテ」は、スペイン語圏ラテンアメリカの多くで使われる、隠し持つカンニングペーパーを指す学生の隠語である。誰も勉強していない試験をばっさり切り抜けるという意味を込め、半ば冗談でそう呼ばれる。",
    ),
  },
  propina: {
    e: "🪙",
    price: 280,
    kind: "pre",
    n: t("A Generous Propina|Una propina generosa|Un généreux pourboire|気前のよいプロピナ(チップ)"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-la et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "A service charge is rarely built into a bill in Peru, so a propina left in cash, however small, is often the only tip a waiter, porter or taxi driver actually sees.|En Perú, el servicio rara vez viene incluido en la cuenta, así que una propina dejada en efectivo, por pequeña que sea, suele ser la única que ve realmente un mesero, un maletero o un taxista.|Au Pérou, le service est rarement inclus dans l'addition, si bien qu'un pourboire laissé en espèces, même modeste, est souvent le seul que voit vraiment un serveur, un porteur ou un chauffeur de taxi.|ペルーでは勘定にサービス料が含まれていることはめったにない。だから現金で置かれるプロピナは、どんなに少額でも、給仕やポーター、タクシー運転手が実際に受け取る唯一のチップであることが多い。",
    ),
  },
  chasqui: {
    e: "🏃",
    price: 400,
    kind: "pre",
    n: t("A Chasqui's Turn of Speed|La rapidez de un chasqui|La vitesse d'un chasqui|チャスキの速さ"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Each chasqui sprinted only a short relay leg — a few kilometres at most — blowing a shell trumpet called a pututu to warn the next runner to be ready, so the message passed at a dead run without the whole relay ever really stopping.|Cada chasqui corría solo un breve tramo de relevo, unos pocos kilómetros como mucho, soplando una trompeta de caracola llamada pututu para avisar al siguiente corredor que se preparara, de modo que el mensaje pasaba a toda carrera sin que el relevo entero llegara a detenerse.|Chaque chasqui ne courait qu'un court relais — quelques kilomètres tout au plus — en soufflant dans une trompette en coquillage appelée pututu pour avertir le coureur suivant de se tenir prêt, si bien que le message passait à toute allure sans que le relais entier ne s'arrête vraiment.|チャスキはそれぞれ、せいぜい数キロほどの短い区間だけを全力で走った。法螺貝の笛プトゥトゥを吹いて次の走者に備えるよう知らせ、こうして伝令は駆けどおしのまま渡され、中継全体としては止まることがなかった。",
    ),
  },
};

/**
 * 厄災の神。鉱山の守護霊(ボリビア盤面のエル・ティーオ)とは題材が重ならない
 * よう、山そのものを人格化した「アプ」にした。峠を無礼に急いで越えようと
 * する旅人を懲らしめる、残酷というより気位の高い性格にしてある。
 */
export const PERU_SPIRIT = {
  e: "🏔️",
  n: t("The Apu|El Apu|L'Apu|アプ"),
  big: t("The Apu's Rockslide|El derrumbe del Apu|L'éboulement de l'Apu|アプの落石"),
  ward: "chuspa",
  arrive: t(
    "<b>🏔️ An apu has taken offence at you.</b> In living Andean belief, every great peak is inhabited by a spirit called an apu, owed a small offering — a coca leaf, a sip poured on the ground — by anyone who crosses its pass. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🏔️ Un apu se ha ofendido contigo.</b> En la creencia andina viva, cada gran cumbre está habitada por un espíritu llamado apu, al que se le debe una pequeña ofrenda —una hoja de coca, un sorbo derramado en el suelo— quien cruce su paso. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🏔️ Un apu s'est offensé de toi.</b> Dans la croyance andine vivante, chaque grand sommet est habité par un esprit appelé apu, à qui l'on doit une petite offrande — une feuille de coca, une gorgée versée au sol — quiconque franchit son col. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🏔️ アプの不興を買った。</b> いまも生きるアンデスの信仰では、どの大きな峰にもアプと呼ばれる霊が宿るとされ、その峠を越える者は誰でも、コカの葉一枚や地面に注ぐひと口といったささやかな捧げ物を欠かせない。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🏔️ <b>The apu</b> loses interest and settles over <b>{0}</b>, farthest from {1}.|🏔️ <b>El apu</b> pierde el interés y se posa sobre <b>{0}</b>, el más lejano de {1}.|🏔️ <b>L'apu</b> se désintéresse et se pose sur <b>{0}</b>, le plus loin de {1}.|🏔️ <b>アプ</b> は興味を失い、{1} から最も遠い <b>{0}</b> の上に留まった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns beneath the apu without ever leaving it an offering. The peak's silence breaks all at once — <b>the Apu's Rockslide</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos bajo el apu sin dejarle nunca una ofrenda. El silencio de la cumbre se rompe de golpe: empieza <b>el derrumbe del Apu</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours sous l'apu sans jamais lui laisser d'offrande. Le silence du sommet se brise d'un coup : <b>l'éboulement de l'Apu</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもアプの下を歩きながら、一度も捧げ物を残さなかった。峰の静けさが一気に破れる。<b>アプの落石</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> offerings to the apus, often a small burnt bundle called a despacho, are still prepared by ritual specialists across the Andes before journeys, harvests or building work, and are treated as a matter of everyday respect rather than folklore.|<b>Tras la historia:</b> las ofrendas a los apus, a menudo un pequeño fardo quemado llamado despacho, todavía las preparan especialistas rituales en los Andes antes de viajes, cosechas u obras, y se tratan como un asunto de respeto cotidiano y no de folclore.|<b>Derrière l'histoire :</b> les offrandes aux apus, souvent un petit paquet brûlé appelé despacho, sont encore préparées par des spécialistes rituels à travers les Andes avant un voyage, une récolte ou des travaux, et traitées comme une question de respect quotidien plutôt que de folklore.|<b>物語の背景:</b> アプへの捧げ物は、デスパチョと呼ばれる小さな焼き捧げ物であることが多く、アンデス各地でいまも、旅や収穫、建築の前に儀礼の専門家によって用意される。これは民話というより、日々の敬意の作法として扱われている。",
  ),
  pleased: t(
    "The mist over the pass clears for a moment, and a vein of ore glints in the rock at your feet. <b>{0}</b> gains <span class='money'>+{1}</span>.|La niebla del paso se despeja un instante, y una veta de mineral brilla en la roca a tus pies. <b>{0}</b> gana <span class='money'>+{1}</span>.|La brume sur le col se dissipe un instant, et un filon de minerai brille dans la roche à tes pieds. <b>{0}</b> gagne <span class='money'>+{1}</span>.|峠に立ち込めた霧が一瞬晴れ、足元の岩に鉱脈がきらりと光った。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A coca leaf is set on a stone where the apu can see it. The offering is enough — he settles back into the peak, passing <b>{0}</b> without incident this turn.|Se pone una hoja de coca sobre una piedra donde el apu pueda verla. La ofrenda basta: se repliega en la cumbre y pasa junto a <b>{0}</b> sin incidentes esta vuelta.|Une feuille de coca est posée sur une pierre, bien en vue de l'apu. L'offrande suffit : il se retire dans le sommet et passe devant <b>{0}</b> sans incident ce tour-ci.|石の上にコカの葉を一枚、アプに見えるように置いた。それだけで十分だった。アプは峰の中へと退き、このターンは何事もなく <b>{0}</b> の傍らを通り過ぎた。",
  ),
};

/** 災難7種。「残酷ではなく、ただ度が過ぎるだけ」という他盤面の厄災神と同じ調子で。 */
export const PERU_DOOM = [
  {
    id: "sorochazo",
    n: t("Altitude sickness hits without warning|El soroche golpea sin avisar|Le mal des montagnes frappe sans prévenir|前触れなく高山病に襲われる"),
    t: t(
      "The headache arrives first, then the nausea, somewhere past 4,000 metres where the air holds barely half the oxygen it does at sea level. Slowing down and drinking coca-leaf tea is the only remedy anyone here bothers to argue about.|El dolor de cabeza llega primero, luego las náuseas, en algún punto pasados los 4.000 metros donde el aire apenas retiene la mitad del oxígeno que al nivel del mar. Bajar el ritmo y tomar mate de coca es el único remedio que aquí alguien se molesta en discutir.|Le mal de tête arrive d'abord, puis les nausées, quelque part au-delà de 4 000 mètres où l'air ne retient plus que la moitié de l'oxygène qu'au niveau de la mer. Ralentir et boire du maté de coca est le seul remède que l'on discute encore ici.|標高4000メートルを超えたあたりで、まず頭痛が来て、それから吐き気が来る。この高さでは空気に含まれる酸素は海抜近くの半分ほどしかない。歩みを緩め、コカ茶を飲むこと以外に、ここで真剣に語られる対処法はない。",
    ),
  },
  {
    id: "friaje",
    n: t("A friaje cold snap chills the jungle|Un friaje enfría la selva|Un friaje refroidit la jungle|フリアヘがジャングルを冷やす"),
    t: t(
      "A mass of cold air slides up from the far south and drops the Amazon lowlands ten degrees or more overnight, catching households with no heating and only hammocks for the cold. Locals call the front a friaje and simply wait it out under extra blankets.|Una masa de aire frío sube desde el extremo sur y hace bajar diez grados o más la temperatura de la Amazonía baja durante la noche, sorprendiendo a hogares sin calefacción y solo hamacas contra el frío. Aquí llaman friaje a ese frente y simplemente esperan bajo mantas extra.|Une masse d'air froid remonte depuis l'extrême sud et fait chuter la température de la basse Amazonie de dix degrés ou plus en une nuit, surprenant des foyers sans chauffage, seulement des hamacs contre le froid. On appelle ici ce front un friaje, et on attend simplement sous des couvertures en plus.|遥か南から冷たい空気の塊が上がってきて、一夜のうちにアマゾン低地の気温を10度以上下げる。暖房も無く、寒さをしのぐのはハンモックだけの家々は不意を突かれる。地元ではこの寒波を「フリアヘ」と呼び、余分な毛布にくるまってやり過ごすほかない。",
    ),
    months: [2, 3, 4],
  },
  {
    id: "llama-terca",
    n: t("A stubborn llama sits down mid-trail|Una llama terca se sienta en medio del camino|Un lama têtu s'assoit en plein sentier|頑固なリャマが道の真ん中で座り込む"),
    t: t(
      "The pack llama decided it was carrying enough, folded its legs under itself in the middle of the switchback, and would not be moved by pulling, pushing or pleading. Overloading a llama past its own judgement never ends well for the schedule.|La llama de carga decidió que ya llevaba suficiente, dobló las patas en medio de la zigzagueante subida y no hubo tirón, empujón ni ruego que la moviera. Sobrecargar a una llama más allá de su propio juicio nunca sale bien para el horario.|Le lama de bât a décidé qu'il en portait assez, a plié les pattes en plein virage en épingle, et ni tirer, ni pousser, ni supplier ne l'a fait bouger. Surcharger un lama au-delà de son propre jugement ne finit jamais bien pour l'horaire.|荷を背負ったリャマは、もう十分運んだと決めたらしく、つづら折りの道の真ん中で脚を折って座り込み、引いても押しても頼んでも動かなかった。リャマ自身の判断を超えて荷を積みすぎると、予定はろくなことにならない。",
    ),
  },
  {
    id: "neblina-puna",
    n: t("Fog on the puna hides the trail|La neblina de la puna esconde el camino|Le brouillard de la puna cache le sentier|プナの霧が道を隠す",
    ),
    t: t(
      "A cloud settles over the high plain with no warning, and the same three landmarks seem to pass by twice before the mist finally lifts. Locals who cross the puna often enough stop trying to hurry through weather like this.|Una nube se posa sobre la meseta alta sin previo aviso, y los mismos tres puntos de referencia parecen repetirse dos veces antes de que la niebla por fin se levante. Quienes cruzan la puna a menudo dejan de intentar apurar un clima así.|Un nuage se pose sur le haut plateau sans prévenir, et les trois mêmes repères semblent défiler deux fois avant que la brume ne se lève enfin. Ceux qui traversent souvent la puna cessent d'essayer de se presser par un temps pareil.|前触れもなく雲が高原を覆い、同じ三つの目印を二度通り過ぎたように思えたころ、ようやく霧が晴れた。プナをよく渡る地元の人は、こういう天気のときに急ごうとするのをやめている。",
    ),
  },
  {
    id: "cacho-perdido",
    n: t("A bad run at cacho|Una mala racha en el cacho|Une mauvaise série au cacho|カチョで負け続ける"),
    t: t(
      "The dice cup passed around the table kept landing badly, and by the last round the wager had crept up well past what seemed reasonable when the game began. Cacho gets played everywhere from bus stops to long waits at the station, and the scoring rewards nerve as much as luck.|El cubilete pasaba de mano en mano y seguía cayendo mal, y para la última ronda la apuesta había subido mucho más de lo razonable al empezar. Al cacho se juega en todas partes, de las paradas de bus a las largas esperas en la estación, y el puntaje premia el aplomo tanto como la suerte.|Le cornet de dés passait de main en main et tombait toujours mal, et à la dernière manche, la mise avait grimpé bien au-delà du raisonnable au départ. On joue au cacho partout, des arrêts de bus aux longues attentes en gare, et le calcul des points récompense autant le sang-froid que la chance.|回ってきたサイコロのカップはことごとく悪い目を出し、最後の勝負のころには賭け金は始めたときには妥当に思えた額をずいぶん超えていた。カチョはバス停から駅の長い待ち時間まで至る所で打たれ、その得点は運と同じくらい度胸がものを言う。",
    ),
  },
  {
    id: "viento-apu",
    n: t("A gust off the pass takes your hat|Una ráfaga del paso se lleva el sombrero|Une rafale du col emporte le chapeau|峠からの突風が帽子をさらう"),
    t: t(
      "The wind off the high pass came from nowhere and took the hat clean off, tumbling it down a slope too steep to chase. Locals tie theirs on with a cord under the chin for exactly this reason.|El viento del paso alto llegó de la nada y se llevó el sombrero de un tirón, haciéndolo rodar por una ladera demasiado empinada para perseguirlo. Los de aquí atan el suyo con un cordón bajo la barbilla justo por esto.|Le vent du col est venu de nulle part et a emporté le chapeau d'un coup, le faisant rouler sur une pente trop raide pour le poursuivre. Les gens d'ici attachent le leur avec un cordon sous le menton, justement pour cette raison.|高い峠から吹き下ろす風はどこからともなく現れ、帽子をきれいにさらっていった。追いかけるには急すぎる斜面を転がり落ちていく。地元の人がまさにこの理由で顎紐を付けているのだ。",
    ),
  },
  {
    id: "carga-volcada",
    n: t("Cargo spills on a switchback|La carga se vuelca en una curva cerrada|Le chargement se renverse dans un lacet|つづら折りで荷が崩れる"),
    t: t(
      "A rope worked loose on the tightest bend of the descent, and half a load of produce scattered down the slope before anyone could grab it. Picking the good fruit out of the dust takes longer than the fall itself did.|Una soga se aflojó en la curva más cerrada del descenso, y media carga de productos se desparramó ladera abajo antes de que nadie pudiera agarrarla. Recoger la fruta buena del polvo lleva más tiempo del que tomó la propia caída.|Une corde s'est desserrée dans le virage le plus serré de la descente, et la moitié du chargement de produits s'est éparpillée sur la pente avant que quiconque ne puisse la retenir. Trier les bons fruits dans la poussière prend plus de temps que la chute elle-même.|下りのいちばんきついつづら折りで縄が緩み、誰も掴む間もなく荷の半分が斜面に散らばった。土埃の中からまともな果物を拾い集めるのは、荷崩れそのものより時間がかかる。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月(暦の並びは他国と共通)。南半球なので中身は
 * 逆になる(4月は雨季明け、7月は乾季の独立記念日、1月が真夏)。
 */
export const PERU_SEASONS = [
  {
    e: "🥔",
    n: t("The rains ease and the potato harvest begins|Las lluvias amainan y empieza la cosecha de papa|Les pluies s'apaisent et la récolte de pommes de terre commence|雨が緩み、じゃがいもの収穫が始まる"),
    t: t(
      "The wettest months of the Andean calendar are ending, and highland families turn out together to dig the first of the season's potatoes from softened, still-damp soil. Markets fill almost overnight with more shapes and colours than the rest of the year sees at once.|Terminan los meses más lluviosos del calendario andino, y las familias de la sierra salen juntas a cavar las primeras papas de la temporada en tierra blanda y aún húmeda. Los mercados se llenan casi de la noche a la mañana con más formas y colores.|Les mois les plus pluvieux du calendrier andin s'achèvent, et les familles des hauts plateaux sortent ensemble déterrer les premières pommes de terre de la saison dans une terre ramollie encore humide. Les marchés se remplissent presque du jour au lendemain de formes et couleurs inédites.|アンデスの暦でいちばん雨の多い月々が終わり、高地の家族はそろって畑に出て、まだ湿った柔らかい土からその季節最初のじゃがいもを掘り出す。市場はほとんど一夜にして、一年の他の時期には見ない形と色であふれる。",
    ),
    f: t(
      "Highland households still sort the harvest into piles by hand: some for eating fresh, some set aside to freeze-dry into chuño over the coming cold nights, and the best kept back whole as seed for next year.|Los hogares de la sierra todavía separan la cosecha a mano en montones: unas papas para comer frescas, otras apartadas para liofilizarse en chuño durante las próximas noches frías, y las mejores guardadas enteras como semilla.|Les foyers des hauts plateaux trient encore la récolte à la main en tas : certaines pommes de terre pour manger fraîches, d'autres mises de côté pour être lyophilisées en chuño durant les nuits froides à venir, et les meilleures gardées entières comme semence.|高地の家々はいまも収穫を手で仕分ける。生のまま食べる分、これから来る寒い夜にチューニョへと凍結乾燥させる分、そして種芋として丸のまま取っておく上等な分とに分ける。",
    ),
  },
  {
    e: "☁️",
    n: t("The coast settles under grey skies|La costa se instala bajo cielos grises|La côte s'installe sous un ciel gris|海岸に曇り空が居座る始める"),
    t: t(
      "The garúa cloud layer begins its months-long hold over the coast just as the Andean dry season gets under way inland, so a traveler can leave a sunless Lima morning and reach a bright, cloudless highland afternoon on the same trip.|La capa de garúa empieza su asentamiento de meses sobre la costa justo cuando arranca la temporada seca andina tierra adentro, así que un viajero puede salir de una mañana limeña sin sol y llegar a una tarde andina despejada y luminosa en el mismo viaje.|La couche de garúa entame son emprise de plusieurs mois sur la côte juste au moment où débute la saison sèche andine à l'intérieur des terres, si bien qu'un voyageur peut quitter une matinée limeña sans soleil et atteindre un après-midi andin lumineux et sans nuages au cours du même trajet.|海岸をガルーアの雲がおおよそ数か月にわたって覆い始めるのは、ちょうど内陸のアンデスで乾季が始まる頃である。旅人は、太陽の出ないリマの朝を発って、同じ旅程の中で明るく雲ひとつない高地の午後にたどり着くこともできる。",
    ),
    f: t(
      "Fog-catching nets strung on the hillsides above some coastal shantytowns comb enough moisture out of the garúa to water small gardens where almost no rain ever actually falls.|Redes atrapanieblas tendidas en las laderas sobre algunos asentamientos costeros peinan suficiente humedad de la garúa como para regar pequeños huertos donde casi nunca cae lluvia de verdad.|Des filets à brouillard tendus sur les collines au-dessus de certains bidonvilles côtiers peignent assez d'humidité dans la garúa pour arroser de petits jardins là où il ne pleut presque jamais vraiment.|一部の海岸沿いの居住地の丘の斜面には霧を捕らえる網が張られており、ガルーアから十分な水分を集めて、実際にはほとんど雨の降らない土地の小さな菜園を潤している。",
    ),
  },
  {
    e: "☀️",
    n: t("Inti Raymi honours the sun at its coldest|El Inti Raymi honra al sol en su momento más frío|L'Inti Raymi honore le soleil à son plus froid|インティ・ライミが、いちばん寒い頃の太陽を祝う"),
    t: t(
      "Cusco re-enacts the Inca festival of the sun around the winter solstice, when Andean nights drop hardest below freezing and the dry season is at its clearest — the same clear cold skies that once made this month reliable for astronomical observation.|Cuzco recrea la fiesta inca del sol en torno al solsticio de invierno, cuando las noches andinas bajan más duro de cero y la temporada seca está en su punto más despejado, los mismos cielos fríos y claros que antaño hacían de este mes uno fiable para la observación astronómica.|Cuzco reconstitue la fête inca du soleil autour du solstice d'hiver, quand les nuits andines descendent le plus fort sous zéro et que la saison sèche est à son plus clair — les mêmes ciels froids et dégagés qui rendaient jadis ce mois fiable pour l'observation astronomique.|クスコは冬至の頃、インカの太陽の祭りインティ・ライミを再現する。アンデスの夜がいちばん厳しく氷点下に下がり、乾季もいちばん澄み渡る時期である。この澄んだ寒空は、かつてこの月を天体観測に頼れる時期にもしていた。",
    ),
    f: t(
      "The modern re-enactment, staged since 1944 at the Sacsayhuamán fortress above Cusco, is a twentieth-century revival rather than an unbroken tradition — Spanish colonial authorities had banned the original festival centuries earlier.|La recreación moderna, escenificada desde 1944 en la fortaleza de Sacsayhuamán sobre Cuzco, es un renacer del siglo XX y no una tradición ininterrumpida: las autoridades coloniales españolas habían prohibido la fiesta original siglos antes.|La reconstitution moderne, mise en scène depuis 1944 à la forteresse de Sacsayhuamán au-dessus de Cuzco, est une renaissance du XXe siècle plutôt qu'une tradition ininterrompue — les autorités coloniales espagnoles avaient banni la fête originale des siècles plus tôt.|クスコの上にあるサクサイワマン要塞で1944年から演じられてきたこの現代の再現は、途切れず続く伝統ではなく20世紀の復興である。スペイン植民地当局は何世紀も前に本来の祭りを禁じていた。",
    ),
  },
  {
    e: "🇵🇪",
    n: t("Fiestas Patrias fills the dry-season peak|Fiestas Patrias llena el pico de la temporada seca|Les Fiestas Patrias emplissent le pic de la saison sèche|フィエスタス・パトリアスが乾季の頂点を満たす"),
    t: t(
      "The two-day independence holiday lands squarely in the clearest, driest weeks of the Andean year, when mountain roads are at their most reliable and flags go up from balconies on the coast to trekking camps above the tree line alike.|La fiesta de la independencia de dos días cae justo en las semanas más despejadas y secas del año andino, cuando las carreteras de montaña son más fiables, y las banderas suben tanto en balcones de la costa como en campamentos de trekking sobre el límite del bosque.|La fête de l'indépendance de deux jours tombe en plein dans les semaines les plus claires et les plus sèches de l'année andine, quand les routes de montagne sont les plus fiables, et les drapeaux montent aussi bien aux balcons de la côte que dans les camps de trek au-dessus de la limite des arbres.|2日間の独立記念日は、ちょうどアンデスの一年でいちばん晴れて乾いた週にあたり、山道がいちばん頼れる時期でもある。海岸のバルコニーから森林限界を越えたトレッキングの野営地まで、等しく旗が掲げられる。",
    ),
    f: t(
      "Because the dry season also makes this the peak month for mountain tourism, hotel and trek prices in the Andes often climb alongside the flags.|Como la temporada seca también convierte a este en el mes pico del turismo de montaña, los precios de hoteles y trekkings en los Andes suelen subir junto con las banderas.|La saison sèche faisant aussi de ce mois le pic du tourisme de montagne, les prix des hôtels et des treks dans les Andes grimpent souvent en même temps que les drapeaux.|乾季でもあるこの月は山岳観光の最盛期にもなるため、アンデスのホテルやトレッキングの値段も、旗と一緒に上がっていくことが多い。",
    ),
  },
  {
    e: "🌎",
    n: t("Offerings to Pachamama, while the earth is 'thirsty'|Ofrendas a la Pachamama, cuando la tierra está 'sedienta'|Offrandes à la Pachamama, quand la terre est « assoiffée »|大地が「渇いている」あいだ、パチャママへの捧げ物"),
    t: t(
      "Andean tradition holds that the earth, Pachamama, is especially open and thirsty this month, so households across the highlands bury small offerings of food, drink and coca in the ground before the rains return and close it again.|La tradición andina sostiene que la tierra, la Pachamama, está especialmente abierta y sedienta este mes, así que los hogares de la sierra entierran pequeñas ofrendas de comida, bebida y coca antes de que vuelvan las lluvias y la cierren de nuevo.|La tradition andine veut que la terre, la Pachamama, soit particulièrement ouverte et assoiffée ce mois-ci, aussi les foyers des hauts plateaux enterrent-ils de petites offrandes de nourriture, de boisson et de coca avant que les pluies ne reviennent et ne la referment.|アンデスの伝統では、この月は大地パチャママが特別に開き、渇いているとされる。高地の家々は、雨が戻ってふたたび大地を閉ざす前に、食べ物や飲み物、コカの小さな捧げ物を土に埋める。",
    ),
    f: t(
      "The windy, dry conditions typical of this month across the highlands are themselves sometimes cited as the practical origin of the belief that the ground is cracked open and in need of tending.|Las condiciones ventosas y secas típicas de este mes en la sierra a veces se citan como el origen práctico de la creencia de que la tierra está agrietada y necesita cuidado.|Les conditions venteuses et sèches typiques de ce mois dans les hauts plateaux sont elles-mêmes parfois citées comme l'origine pratique de la croyance selon laquelle le sol, fendillé, a besoin qu'on en prenne soin.|高地でこの月に特徴的な、風が強く乾いた気候そのものが、大地がひび割れて手入れを必要としているという信仰の実際的な起こりだとされることもある。",
    ),
  },
  {
    e: "🌷",
    n: t("Trujillo opens its spring festival|Trujillo abre su festival de primavera|Trujillo ouvre son festival du printemps|トルヒージョが春祭りを開く"),
    t: t(
      "As the Andean dry season winds down and the highlands edge toward spring, Trujillo fills its avenues with flower-covered floats and dance troupes for an international spring festival that has run since the 1950s.|Mientras la temporada seca andina va menguando y la sierra se acerca a la primavera, Trujillo llena sus avenidas con carrozas cubiertas de flores y comparsas de baile para un festival internacional de primavera que se celebra desde los años cincuenta.|Alors que la saison sèche andine décline et que les hauts plateaux s'approchent du printemps, Trujillo remplit ses avenues de chars fleuris et de troupes de danse pour un festival international du printemps organisé depuis les années 1950.|アンデスの乾季が終わりに近づき、高地が春へ向かうこの頃、トルヒージョは花で飾った山車と踊りの一団で大通りを埋め尽くす。1950年代から続く国際春祭りである。",
    ),
    f: t(
      "School parades and flower-float competitions dominate the programme, distinct from the city's other big date on the calendar each January, when its national marinera dance contest is held instead.|Los desfiles escolares y los concursos de carrozas florales dominan el programa, distinto de la otra gran fecha de la ciudad cada enero, cuando se celebra en cambio su concurso nacional de marinera.|Défilés scolaires et concours de chars fleuris dominent le programme, distinct de l'autre grande date de la ville chaque janvier, où se tient plutôt son concours national de marinera.|学校のパレードと花山車のコンテストが中心の催しで、毎年1月に開かれる全国マリネラ大会という、この町の別の大きな行事とは別物である。",
    ),
  },
  {
    e: "🟣",
    n: t("Purple robes fill Lima's streets|Túnicas moradas llenan las calles de Lima|Des robes violettes emplissent les rues de Lima|紫の衣がリマの通りを埋める"),
    t: t(
      "The procession of the Lord of Miracles, one of the largest Catholic processions anywhere, carries a colonial-era painted image through Lima on a platform so heavy it takes dozens of purple-robed bearers in relay to move it at all.|La procesión del Señor de los Milagros, una de las mayores procesiones católicas del mundo, lleva por Lima una imagen pintada de época colonial sobre unas andas tan pesadas que hacen falta decenas de cargadores de túnica morada, en relevos, para moverla.|La procession du Seigneur des Miracles, l'une des plus grandes processions catholiques au monde, porte à travers Lima une image peinte d'époque coloniale sur un brancard si lourd qu'il faut des dizaines de porteurs en robe violette, en relais, pour seulement le déplacer.|「奇跡の主」の行列は、世界でも屈指の規模のカトリックの行列で、植民地時代に描かれた聖画をリマの街に担ぎ出す。台座があまりに重いため、紫の衣をまとった何十人もの担ぎ手が交代しながら運ぶ。",
    ),
    f: t(
      "The image is said to have survived the collapse of the wall it was painted on during a 1655 earthquake, and devotion to it since has made purple the unmistakable colour of Lima's October.|Se dice que la imagen sobrevivió al derrumbe del muro en que estaba pintada durante un terremoto en 1655, y la devoción hacia ella desde entonces ha hecho del morado el color inconfundible del octubre limeño.|On raconte que l'image survécut à l'effondrement du mur sur lequel elle était peinte lors d'un séisme en 1655, et la dévotion qui lui est vouée depuis a fait du violet la couleur incontournable de l'octobre limeño.|この聖画は1655年の地震でそれが描かれていた壁が崩れた際にも残ったと伝えられ、以来の信仰の篤さが、紫をリマの10月を象徴する色にしてきた。",
    ),
  },
  {
    e: "💧",
    n: t("The first rains reach the highlands again|Las primeras lluvias vuelven a la sierra|Les premières pluies reviennent sur les hauts plateaux|雨が再び高地に届き始める"),
    t: t(
      "Cloud builds over the Andes most afternoons now, and the first storms of the new wet season send farmers back out to plant while rivers in the Amazon lowlands begin the long rise toward their high-water months.|Ahora se acumulan nubes sobre los Andes casi todas las tardes, y las primeras tormentas de la nueva temporada de lluvias hacen que los agricultores vuelvan a sembrar, mientras los ríos de la Amazonía baja empiezan su larga subida hacia los meses de aguas altas.|Des nuages s'amoncellent sur les Andes presque tous les après-midi désormais, et les premiers orages de la nouvelle saison des pluies renvoient les paysans planter, tandis que les rivières de la basse Amazonie entament leur longue montée vers leurs mois de hautes eaux.|いまやほとんど毎日午後になるとアンデスに雲が立ち込め、新しい雨季の最初の嵐が農家をふたたび畑に呼び戻す。アマゾン低地の川は、水位が高くなる季節へ向けて長い上昇を始める。",
    ),
    f: t(
      "River villages along the Amazon time much of the year's work around this rise and fall of a metres-high flood pulse, planting the exposed riverbank the moment the water retreats each dry season.|Los pueblos ribereños del Amazonas organizan buena parte del trabajo del año en torno a esta subida y bajada de la crecida, de varios metros, sembrando la orilla expuesta en cuanto el agua se retira cada temporada seca.|Les villages riverains de l'Amazone organisent une bonne part du travail de l'année autour de cette montée et descente de la crue, de plusieurs mètres, plantant la berge exposée dès que l'eau se retire chaque saison sèche.|アマゾン沿いの村々は、一年の仕事の多くをこの数メートルにおよぶ増減水のリズムに合わせて営む。乾季ごとに水が引くとすぐ、現れた岸辺に種を蒔く。",
    ),
  },
  {
    e: "🎄",
    n: t("The rains deepen as the year turns|Las lluvias se intensifican al cambiar el año|Les pluies s'intensifient au tournant de l'année|年の変わり目に雨が深まる"),
    t: t(
      "The wet season is well under way across the Andes and Amazon by now, and Christmas Eve dinner in Lima runs late into a warm summer night on the coast even as highland roads start washing out for the season.|La temporada de lluvias ya avanza en los Andes y la Amazonía, y la cena de Nochebuena en Lima se alarga hasta bien entrada una cálida noche de verano en la costa, justo cuando las carreteras de la sierra empiezan a anegarse por la temporada.|La saison des pluies bat déjà son plein dans les Andes et en Amazonie, et le dîner de la veille de Noël à Lima s'étire tard dans une chaude nuit d'été côtière, tandis que les routes des hauts plateaux commencent à s'affaisser pour la saison.|この頃にはアンデスとアマゾンで雨季がしっかり進んでおり、リマのクリスマスイブの夕食は海岸の暖かい夏の夜更けまで続く一方、高地の道路はこの季節の洗い流しが始まっている。",
    ),
    f: t(
      "Export farms on the desert coast time much of their asparagus and blueberry harvest to this same stretch of the calendar, shipping fruit north to markets in the middle of their own winter.|Las fincas exportadoras de la costa desértica calzan buena parte de su cosecha de espárrago y arándano con este mismo tramo del calendario, enviando fruta al norte a mercados en pleno invierno de allá.|Les fermes d'exportation de la côte désertique calent une bonne part de leur récolte d'asperges et de myrtilles sur cette même période du calendrier, expédiant les fruits vers des marchés du nord en plein hiver là-bas.|砂漠海岸の輸出向け農園の多くは、アスパラガスやブルーベリーの収穫時期をちょうどこの頃に合わせ、向こうがまさに冬の盛りにある北の市場へ果物を送り出す。",
    ),
  },
  {
    e: "🏖️",
    n: t("Coastal summer peaks as the highlands flood|El verano costero llega a su pico mientras la sierra se inunda|L'été côtier culmine tandis que les hauts plateaux inondent|海岸の夏が盛りを迎え、高地は増水する"),
    t: t(
      "Lima's beaches fill for the hottest weeks of the year at the exact moment Andean rivers run highest and muddiest, so a trek that is easy in July can be genuinely dangerous now, and some highland trails close outright.|Las playas de Lima se llenan en las semanas más calurosas del año justo cuando los ríos andinos bajan más altos y turbios, así que una caminata fácil en julio puede ser realmente peligrosa ahora, y algunos senderos de la sierra cierran directamente.|Les plages de Lima se remplissent durant les semaines les plus chaudes de l'année, au moment précis où les rivières andines sont au plus haut et au plus boueux, si bien qu'une randonnée facile en juillet peut devenir réellement dangereuse maintenant, et certains sentiers ferment carrément.|リマの浜辺が一年でいちばん暑い週に賑わうのは、ちょうどアンデスの川がいちばん高く濁る時期と重なる。7月なら簡単なトレッキングも、いまは本当に危険なことがあり、一部の高地の道は完全に閉鎖される。",
    ),
    f: t(
      "Some sections of the Inca Trail toward Machu Picchu shut for maintenance and erosion control in this same stretch of the calendar, regardless of demand.|Algunos tramos del Camino Inca hacia Machu Picchu cierran por mantenimiento y control de erosión en este mismo tramo del calendario, sin importar la demanda.|Certains tronçons du chemin de l'Inca vers Machu Picchu ferment pour entretien et lutte contre l'érosion à cette même période du calendrier, indépendamment de la demande.|マチュピチュへ向かうインカ道の一部区間は、需要にかかわらず、ちょうどこの時期に維持管理と浸食対策のために閉じられる。",
    ),
  },
  {
    e: "💃",
    n: t("Puno fills for the Virgin of Candelaria|Puno se llena por la Virgen de la Candelaria|Puno se remplit pour la Vierge de la Candelaria|プーノがカンデラリアの聖母で埋まる"),
    t: t(
      "Tens of thousands of costumed dancers converge on Puno for roughly two weeks around the first of the month, timed to the tail end of the wet season when Titicaca's shoreline pastures are at their greenest.|Decenas de miles de bailarines disfrazados convergen en Puno durante unas dos semanas en torno al primero del mes, coincidiendo con el final de la temporada de lluvias, cuando los pastos de la orilla del Titicaca están en su punto más verde.|Des dizaines de milliers de danseurs costumés convergent vers Puno pendant environ deux semaines autour du premier du mois, à la toute fin de la saison des pluies, quand les pâturages du rivage du Titicaca sont les plus verts.|何万人もの仮装した踊り手が、月の初めごろのおよそ2週間、プーノに集まる。ちょうど雨季の終わりにあたり、チチカカ湖畔の牧草地がいちばん青々とする時期である。",
    ),
    f: t(
      "The same weeks bring Carnival celebrations to cities across the highlands, most famously to Cajamarca in the north, where water fights and coloured powder fill the streets alongside the dancing.|Las mismas semanas traen celebraciones de Carnaval a ciudades de toda la sierra, sobre todo a Cajamarca en el norte, donde guerras de agua y polvos de colores llenan las calles junto al baile.|Ces mêmes semaines apportent des célébrations de Carnaval dans des villes de tous les hauts plateaux, plus célèbres à Cajamarca dans le nord, où batailles d'eau et poudres colorées emplissent les rues aux côtés de la danse.|同じ数週間、高地各地の町でカーニバルが催される。もっともよく知られるのは北部のカハマルカで、水かけ合戦や色粉が踊りとともに通りを埋め尽くす。",
    ),
  },
  {
    e: "🌾",
    n: t("The wet season eases toward another harvest|La temporada de lluvias amaina hacia otra cosecha|La saison des pluies faiblit vers une nouvelle récolte|雨季が緩み、また実りの季節へ"),
    t: t(
      "Rain still falls most afternoons in the highlands, but it is tapering, and fields planted back in the springtime rains are close enough to ready that families start watching the sky for a dry enough week to bring the crop in.|Todavía llueve casi todas las tardes en la sierra, pero va menguando, y los campos sembrados en las lluvias de primavera están ya lo bastante cerca de estar listos como para que las familias vigilen el cielo en busca de una semana lo bastante seca.|Il pleut encore presque tous les après-midi dans les hauts plateaux, mais cela s'atténue, et les champs semés lors des pluies printanières sont assez près d'être prêts pour que les familles guettent le ciel en quête d'une semaine assez sèche.|高地ではまだほとんど毎日午後に雨が降るが、勢いは弱まりつつある。春の雨のうちに植えた畑はもう十分実りに近づき、家々は収穫できるだけ乾いた週を求めて空模様をうかがい始める。",
    ),
    f: t(
      "On the coast, the garúa cloud bank that has sat over Lima for months is also beginning to break up, weeks before it will fully lift for the brief run of clear coastal summer.|En la costa, el banco de niebla garúa que ha cubierto Lima durante meses también empieza a desintegrarse, semanas antes de que se despeje del todo para el breve tramo de verano costero despejado.|Sur la côte, la nappe de garúa qui recouvre Lima depuis des mois commence elle aussi à se disloquer, des semaines avant de se lever tout à fait pour la brève période d'été côtier dégagé.|海岸では、何か月もリマを覆っていたガルーアの雲もまた崩れ始めている。海岸部の短い晴れた夏が訪れて完全に雲が晴れるまでには、まだ数週間ある。",
    ),
  },
];
