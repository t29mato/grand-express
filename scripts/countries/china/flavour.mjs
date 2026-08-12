/**
 * 中国の国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・フランス・インド・韓国と同じく地方まるごとの好不況で差をつける。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const CHINA_META = {
  id: "china",
  name: t("China|China|Chine|中国"),
  blurb: t(
    "A country so wide the sun rises on desert dunes while it sets on rice terraces|Un país tan ancho que el sol nace sobre dunas y se pone sobre arrozales|Un pays si vaste que le soleil se lève sur des dunes quand il se couche sur des rizières en terrasse|砂丘に日が昇るとき棚田に日が沈む、東西に果てしなく広い国",
  ),
  // 表示専用の倍率は property-economy.mjs 相当の一元管理に合わせ、
  // このファイルでは暫定値100のまま(取りまとめ側の登録で ×500 程度に引き上げる想定。
  // 詳しくは REGISTER.md の「通貨倍率」を参照)。
  cur: { pre: "¥", post: "", mul: 100 },
  start: "beijing",
  cpuNames: ["龙 Lóng", "梅 Méi", "燕 Yàn", "鹤 Hè"],
  // 故宮の朱と金、玉の緑、青花磁器の藍、宣紙の白。
  stripe: ["#c8102e", "#f4c430", "#3f8f6f", "#1a4a8f", "#f6efe2"],
};

/** 実際の地方区分にならった6区分(湖北は華東、湖南は華南に含める)。 */
export const CHINA_REGIONS = {
  hb: t("North China|Norte de China|Chine du Nord|華北"),
  db: t("Northeast China|Noreste de China|Chine du Nord-Est|東北"),
  hd: t("East China|Este de China|Chine de l'Est|華東"),
  hn: t("South China|Sur de China|Chine du Sud|華南"),
  xn: t("Southwest China|Suroeste de China|Chine du Sud-Ouest|西南"),
  xb: t("Northwest China|Noroeste de China|Chine du Nord-Ouest|西北"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は REGISTER.md 経由で src/infrastructure/content/item-effect-rules.ts に登録)。
 */
export const CHINA_ITEMS = {
  jindouyun: {
    e: "☁️",
    price: 240,
    kind: "move",
    n: t("Somersault Cloud|Nube voltereta|Nuage de la culbute|筋斗雲"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "In the sixteenth-century novel Journey to the West, the Monkey King's cloud carries him 108,000 li in a single somersault, yet he still cannot leap clear of the Buddha's open palm — a joke about speed without direction that the novel returns to more than once.|En la novela del siglo XVI Viaje al Oeste, la nube del Rey Mono lo lleva 108.000 li de un solo salto, y aun así no logra escapar de la palma abierta de Buda.|Dans le roman du XVIe siècle La Pérégrination vers l'Ouest, le nuage du Roi Singe le porte sur 108 000 li d'une seule culbute, et pourtant il ne peut s'échapper de la paume ouverte du Bouddha.|16世紀の小説『西遊記』では、孫悟空の雲はひと跳びで十万八千里を運ぶが、それでも仏の掌からは飛び出せない。速さはあっても向きは選べない、という冗談が小説の中で何度も繰り返される。",
    ),
  },
  luopan: {
    e: "🧭",
    price: 380,
    kind: "pre",
    n: t("Feng Shui Compass|Brújula de feng shui|Boussole de feng shui|羅盤"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "A traditional luopan carries as many as forty concentric rings of markings, each ring answering a different question about direction, and a professional reader can spend an hour turning it over a single doorway before deciding which way it should face.|Un luopan tradicional lleva hasta cuarenta anillos concéntricos de marcas, y un lector profesional puede pasar una hora girándolo sobre un solo umbral.|Un luopan traditionnel comporte jusqu'à quarante anneaux concentriques de repères, et un lecteur professionnel peut passer une heure à le faire tourner au-dessus d'un seul seuil.|伝統的な羅盤には多いもので四十もの同心円の目盛りがあり、それぞれが方位についての別の問いに答える。専門の風水師は、たった一つの戸口の向きを決めるのに一時間も羅盤をひねり続けることがある。",
    ),
  },
  lupiheche: {
    e: "🚆",
    price: 360,
    kind: "pre",
    n: t("Green-Skin Train|Tren de piel verde|Train à la peau verte|緑皮車"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Painted the same shade of green since the 1950s, these slow trains stop at nearly every station and still run on some rural lines even as bullet trains cut the same journeys to a fraction of the time; tickets are sold at a fraction of the price to match.|Pintados del mismo verde desde los años cincuenta, estos trenes lentos paran en casi todas las estaciones y aún circulan por algunas líneas rurales.|Peints de la même teinte de vert depuis les années 1950, ces trains lents s'arrêtent dans presque toutes les gares et circulent encore sur certaines lignes rurales.|1950年代から変わらぬ緑に塗られたこの鈍行列車は、ほぼすべての駅に停まる。高速鉄道が同じ道のりをその何分の一かの時間で結ぶいまも、いくつかの地方路線では走り続けている。値段もそれに見合って何分の一かである。",
    ),
  },
  gaotiepiao: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("Bullet Train Ticket|Billete de tren bala|Billet de train à grande vitesse|高鉄票"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The network grew from a single line in 2008 to over 40,000 kilometres within about fifteen years, more track than the rest of the world's high-speed lines combined, and the fastest scheduled services now cover the distance between two major cities in less time than the security queue at either station.|La red pasó de una sola línea en 2008 a más de 40.000 km en unos quince años, más vías que el resto de líneas de alta velocidad del mundo juntas.|Le réseau est passé d'une seule ligne en 2008 à plus de 40 000 km en une quinzaine d'années, davantage que toutes les autres lignes à grande vitesse du monde réunies.|2008年にたった一本の路線から始まった高速鉄道網は、およそ十五年で4万kmを超えた。世界の他のすべての高速鉄道を合わせた総延長より長い。最速の便は、二つの大都市を結ぶのに、どちらかの駅の保安検査の待ち時間より短い時間で走り切る。",
    ),
  },
  baozhu: {
    e: "🧨",
    price: 320,
    kind: "passive",
    n: t("String of Firecrackers|Ristra de petardos|Chapelet de pétards|爆竹"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Legend holds that the Nian beast fled a village after being startled by burning bamboo, whose trapped air popped loudly as it burned, and firecrackers wrapped in red paper have replaced the bamboo ever since — the colour and the noise are both said to matter, not just one or the other.|La leyenda dice que la bestia Nian huyó de una aldea asustada por el bambú ardiendo, cuyo aire atrapado estallaba con fuerza al quemarse, y desde entonces los petardos envueltos en papel rojo sustituyen al bambú.|La légende veut que la bête Nian ait fui un village effrayée par du bambou en feu, dont l'air emprisonné éclatait bruyamment en brûlant, et des pétards enveloppés de papier rouge ont depuis remplacé le bambou.|年獣は、燃える竹の中の空気が弾けて立てる大きな音に驚いて村から逃げ去ったと伝わる。以来、赤い紙で包んだ爆竹が竹の代わりを務めている。色と音のどちらか一方ではなく、両方が効くのだとされる。",
    ),
  },
  taomujian: {
    e: "🗡️",
    price: 440,
    kind: "pre",
    n: t("Peachwood Sword|Espada de madera de melocotonero|Épée en bois de pêcher|桃木剣"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Peach wood has been carved into small ritual blades since at least the Han dynasty on the belief that the tree that survives a hard winter to flower first each spring carries strength evil spirits cannot stand near, and a peachwood sword is still hung over doorways rather than kept in a drawer.|La madera de melocotonero se talla en pequeñas hojas rituales desde al menos la dinastía Han, por la creencia de que el árbol que sobrevive al invierno para florecer primero cada primavera porta una fuerza que los malos espíritus no soportan.|Le bois de pêcher est taillé en petites lames rituelles depuis au moins la dynastie Han, la croyance voulant que l'arbre qui survit à l'hiver pour fleurir le premier chaque printemps porte une force que les mauvais esprits ne peuvent approcher.|桃の木は少なくとも漢代から小さな儀礼用の剣に彫られてきた。厳しい冬を越えて毎春いちばん先に花を咲かせるこの木には、悪霊が近寄れないほどの力が宿るとされたからである。桃木剣はいまも引き出しにしまわず、戸口の上に掛けておく。",
    ),
  },
  jinnang: {
    e: "🎒",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("Brocade Bag of Schemes|Bolsa de brocado de estratagemas|Sac de brocart aux stratagèmes|錦囊"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "In the classic novel Romance of the Three Kingdoms, the strategist Zhuge Liang hands his generals sealed brocade bags before a campaign, each containing a plan to be opened only at a moment of real crisis, never a day before — a general who peeked early is treated in the story as having wasted the gift.|En la novela clásica Romance de los Tres Reinos, el estratega Zhuge Liang entrega a sus generales bolsas de brocado selladas antes de una campaña, cada una con un plan que solo debía abrirse en un momento de verdadera crisis.|Dans le roman classique Le Roman des Trois Royaumes, le stratège Zhuge Liang remet à ses généraux des sacs de brocart scellés avant une campagne, chacun renfermant un plan à n'ouvrir qu'au moment d'une crise réelle.|古典小説『三国志演義』では、軍師の諸葛亮が出陣前に将軍たちへ封をした錦の袋を渡す。中には本当の危機が来たときにだけ開けるべき策が入っており、それより早く開けた将軍は贈り物を無駄にしたと物語では扱われる。",
    ),
  },
  yuzhuo: {
    e: "💚",
    price: 280,
    kind: "pre",
    n: t("A Jade Bracelet|Un brazalete de jade|Un bracelet de jade|玉鐲"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Jade has outranked gold in this country's own hierarchy of precious materials for thousands of years, valued less for rarity than for a set of virtues — hardness, warmth, a sound like a bell when struck — that a piece of gold was never thought to carry.|El jade ha superado al oro en la jerarquía propia de materiales preciosos de este país durante miles de años, valorado no tanto por su rareza como por un conjunto de virtudes.|Le jade surpasse l'or dans la hiérarchie propre de ce pays en matière de matières précieuses depuis des millénaires, prisé non tant pour sa rareté que pour un ensemble de vertus.|玉は何千年ものあいだ、この国独自の宝物の序列で金より上に置かれてきた。稀少さのためというより、硬さ・温かみ・打てば鐘のように鳴る音といった、金には無いとされる徳のためである。",
    ),
  },
  qianlima: {
    e: "🐎",
    price: 420,
    kind: "pre",
    n: t("A Thousand-Li Horse|Un caballo de mil li|Un cheval de mille li|千里馬"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "An old essay complains that thousand-li horses, capable of galloping vast distances without tiring, are common enough, but that those who can recognise one are not — and so most such horses, the essay says, grow old and die harnessed to an ordinary cart, their gift never noticed.|Un viejo ensayo se queja de que los caballos de mil li, capaces de galopar enormes distancias sin cansarse, son bastante comunes, pero quienes saben reconocer uno no lo son.|Un vieil essai se plaint que les chevaux de mille li, capables de galoper d'immenses distances sans se fatiguer, sont assez communs, mais que ceux capables de les reconnaître ne le sont pas.|ある古い文章は、疲れを知らず千里を駆ける千里馬はさして珍しくないが、それを見抜ける人こそが珍しいと嘆く。だからほとんどの千里馬は、その才を誰にも気づかれぬまま、ただの荷車に繋がれて老い、死んでいくのだという。",
    ),
  },
};

/**
 * 厄災の神。旧正月の由来となる怪物「年獣」にした。人を苦しめる悪霊としてではなく、
 * 大きな音と赤い色を何より嫌う臆病な獣として描く。
 */
export const CHINA_SPIRIT = {
  e: "🦁",
  n: t("The Nian Beast|La bestia Nian|La bête Nian|年獣"),
  big: t("The Nian's Long Night|La larga noche del Nian|La longue nuit du Nian|年獣を見張る大晦日"),
  ward: "baozhu",
  arrive: t(
    "<b>🦁 The Nian beast has caught your scent.</b> Old tales say it slept in the mountains or under the sea for most of the year and came down only once to raid villages for grain and livestock, easily startled by loud noise and the colour red but otherwise not easily driven off. It now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🦁 La bestia Nian ha captado tu olor.</b> Los viejos cuentos dicen que dormía en las montañas o bajo el mar casi todo el año y bajaba una sola vez a saquear aldeas.|<b>🦁 La bête Nian a flairé ta trace.</b> Les vieux contes disent qu'elle dormait dans les montagnes ou sous la mer presque toute l'année et ne descendait qu'une fois piller les villages.|<b>🦁 年獣ににおいを嗅ぎつけられた。</b> 昔話によれば、この獣は一年のほとんどを山か海の底で眠って過ごし、年に一度だけ里へ下りて穀物や家畜を奪ったという。大きな音と赤い色にはひどく驚くが、それ以外ではなかなか追い払えない。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🦁 <b>The Nian beast</b> loses your scent and turns toward <b>{0}</b>, farthest from {1}.|🦁 <b>La bestia Nian</b> pierde tu rastro y se vuelve hacia <b>{0}</b>, el más lejano de {1}.|🦁 <b>La bête Nian</b> perd ta trace et se tourne vers <b>{0}</b>, le plus loin de {1}.|🦁 <b>年獣</b> はにおいを見失い、{1} から最も遠い <b>{0}</b> のほうへ向き直った。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns with the beast at their heels and never once startled it off. It settles in for the night to watch the whole village — <b>the Nian's Long Night</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos con la bestia pisándole los talones sin haber logrado espantarla. Se instala a pasar la noche vigilando toda la aldea: empieza <b>la larga noche del Nian</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours avec la bête sur ses talons sans jamais l'avoir effrayée. Elle s'installe pour la nuit à surveiller tout le village : <b>la longue nuit du Nian</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンも獣を後ろに従えて歩きながら、一度も驚かせて追い払えなかった。獣は村じゅうを見張るつもりで居座る。<b>年獣を見張る大晦日</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> the custom of staying up all night on New Year's Eve is called shousui, literally \"guarding the year\", and the old explanation is that a family who stayed awake and lit could keep the beast from the door until dawn drove it back to the mountains for another year.|<b>Tras la historia:</b> la costumbre de quedarse despierto toda la noche de fin de año se llama shousui, «guardar el año», y la vieja explicación es que una familia despierta y con luz podía mantener a la bestia lejos de la puerta hasta el alba.|<b>Derrière l'histoire :</b> la coutume de veiller toute la nuit du nouvel an s'appelle shousui, littéralement « garder l'année », et l'ancienne explication veut qu'une famille éveillée et éclairée pouvait tenir la bête loin de la porte jusqu'à l'aube.|<b>物語の背景:</b> 大晦日の夜を寝ずに過ごす習わしは「守歳」、文字どおり「年を守る」と呼ばれる。昔ながらの説明では、灯りを絶やさず起きている家には獣も戸口に近寄れず、夜明けとともにまた山へ帰っていったという。",
  ),
  pleased: t(
    "It paws at a market stall in passing and knocks a string of coins loose without meaning to. <b>{0}</b> gains <span class='money'>+{1}</span>.|Al pasar araña un puesto del mercado y sin querer tira una ristra de monedas. <b>{0}</b> gana <span class='money'>+{1}</span>.|En passant, elle griffe un étal du marché et fait tomber sans le vouloir un chapelet de pièces. <b>{0}</b> gagne <span class='money'>+{1}</span>.|通りすがりに市場の露店に爪を引っかけ、意図せず銭差しを一連落としていった。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A string of firecrackers goes off with a crack loud enough to echo. The Nian beast flinches at the noise and the flash of red paper, and slinks past <b>{0}</b> without noticing this turn.|Una ristra de petardos estalla con un chasquido lo bastante fuerte para hacer eco. La bestia Nian se sobresalta con el ruido y el destello de papel rojo, y pasa junto a <b>{0}</b> sin notarlo esta vuelta.|Un chapelet de pétards explose avec un claquement assez fort pour résonner en écho. La bête Nian sursaute au bruit et à l'éclat du papier rouge, et passe devant <b>{0}</b> sans le remarquer ce tour-ci.|爆竹が一連、こだまするほど大きな音を立てて弾けた。年獣はその音と赤い紙の閃きにひるみ、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。年獣の怖がりな性格に合わせつつ、現代の暮らしに実際に起きる話も混ぜてある。 */
export const CHINA_DOOM = [
  {
    id: "shachenbao",
    n: t("A sandstorm rolls in|Llega una tormenta de arena|Une tempête de sable arrive|沙塵暴が来る"),
    t: t(
      "The sky turns the colour of weak tea by midday and visibility drops to a few hundred metres as dust blown off the Gobi and the Mongolian steppe rolls south, settling in a fine grey layer on every windowsill and car by evening. Northern cities see several such storms most springs, fewer than a generation ago when tree-planting campaigns began pushing the sand back.|El cielo se vuelve del color de un té flojo hacia el mediodía y la visibilidad cae a unos pocos cientos de metros mientras el polvo del Gobi y la estepa mongola avanza hacia el sur.|Le ciel prend la couleur d'un thé léger vers midi et la visibilité tombe à quelques centaines de mètres tandis que la poussière soufflée du Gobi et de la steppe mongole dévale vers le sud.|昼どきには空が薄い茶の色になり、視界は数百メートルまで落ちる。ゴビ砂漠とモンゴル高原から吹き付ける砂ぼこりが南下し、夕方には窓枠にも車にも細かい灰色の層が積もる。北方の都市は毎春こうした嵐に何度か見舞われるが、植林事業が砂を押し戻し始める前の世代よりは少なくなっている。",
    ),
    months: [11, 0],
  },
  {
    id: "taifeng",
    n: t("A typhoon crosses the coast|Un tifón cruza la costa|Un typhon traverse la côte|台風が海岸を渡る"),
    t: t(
      "The storm was tracked for a week before landfall and still tears awnings from shopfronts and strips leaves from every tree along the coast road. Provinces from Guangdong to Zhejiang each expect several direct hits most years, and evacuation drills before the season begins are routine enough that most households know their assigned shelter without checking.|La tormenta se siguió durante una semana antes de tocar tierra y aun así arranca toldos de las tiendas y deja los árboles de la carretera costera sin hojas.|La tempête fut suivie une semaine durant avant de toucher terre, et pourtant elle arrache les auvents des boutiques et dépouille de leurs feuilles les arbres de la route côtière.|嵐は上陸の一週間も前から進路を追われていたが、それでも店先の日よけをちぎり取り、海沿いの道の木々から葉をむしっていく。広東から浙江までの省は、たいていの年に何度か直撃を受ける。シーズン前の避難訓練は当たり前すぎて、たいていの世帯は確認もせず自分の避難先を言える。",
    ),
    months: [3, 4],
  },
  {
    id: "chunyun",
    n: t("Caught in the Spring Festival rush|Atrapado en la avalancha del Festival de Primavera|Pris dans la ruée du Nouvel An chinois|春運に巻き込まれる"),
    t: t(
      "Every seat on every train toward home sold out weeks ago, and the only tickets left are standing-room for a journey measured in days rather than hours. The world's largest annual human migration moves an estimated two billion trips over about forty days, and missing the booking window once usually means missing it again.|Todos los asientos de todos los trenes hacia casa se agotaron hace semanas, y los únicos billetes que quedan son de pie para un viaje que se mide en días, no en horas.|Toutes les places de tous les trains vers la maison sont vendues depuis des semaines, et il ne reste que des billets debout pour un trajet qui se compte en jours, non en heures.|帰省する列車の座席はどれも何週間も前に売り切れ、残っているのは何時間どころか何日もかかる旅程の立ち席だけだった。世界最大のこの年に一度の民族大移動は、およそ四十日のあいだにのべ二十億人分もの移動を生む。一度予約の窓を逃せば、たいてい次も逃す。",
    ),
    months: [9, 10],
  },
  {
    id: "chaiqian",
    n: t("The demolition notice arrives|Llega el aviso de demolición|L'avis de démolition arrive|立ち退きの通知が来る"),
    t: t(
      "A red character meaning \"demolish\" appears painted on the wall overnight, circled, and within weeks the block is fenced off for redevelopment whether every resident has finished moving out or not. Compensation is negotiated case by case, and a holdout who settles late almost always ends up with less than a neighbour who agreed early.|Un carácter rojo que significa «demoler» aparece pintado en la pared de la noche a la mañana, rodeado con un círculo, y en semanas la manzana queda vallada para reurbanización.|Un caractère rouge signifiant « démolir » apparaît peint sur le mur du jour au lendemain, entouré d'un cercle, et en quelques semaines le pâtiment est clôturé pour réaménagement.|「拆」の一字が赤く丸で囲まれて、一夜のうちに壁に描かれていた。数週間のうちに、住民の引っ越しが済んでいようといまいと、その一角は再開発のために囲われる。補償は一件ずつ交渉され、遅くまで粘った者はたいてい早く応じた隣人より受け取りが少なくなる。",
    ),
  },
  {
    id: "suifenzi",
    n: t("Everyone at the wedding table chips in, including you|Todos en la mesa de la boda ponen dinero, tú también|Toute la tablée du mariage participe, toi aussi|結婚式の祝儀を包まされる",
    ),
    t: t(
      "The red envelope has to match what everyone else at the table is giving, and a discreet glance around confirms the going rate has crept up again since the last wedding invitation. Guests keep a private mental ledger of who gave what at their own celebrations, since a gift given now is really a debt expected to be repaid in kind later.|El sobre rojo tiene que igualar lo que dan los demás en la mesa, y una mirada discreta confirma que la tarifa habitual ha subido otra vez desde la última boda.|L'enveloppe rouge doit correspondre à ce que donnent les autres convives, et un coup d'œil discret confirme que le tarif en vigueur a encore grimpé depuis le dernier mariage.|紅包の額は同じ席の他の客に合わせなければならない。それとなく周りをうかがうと、前回の結婚式からまた相場が上がっていると分かった。客はそれぞれ、自分の祝いの席で誰がいくら包んだかを密かに覚えている。いま渡す祝儀は、いずれ同じ形で返ってくることを見込んだ貸しでもあるからだ。",
    ),
  },
  {
    id: "wuru-taohuayuan",
    n: t("Lost on a path that leads somewhere else entirely|Perdido en un sendero que lleva a otro sitio muy distinto|Égaré sur un sentier menant tout autre part|道に迷って別世界に入り込む",
    ),
    t: t(
      "The mountain path looked the same as always until it suddenly didn't, opening onto unfamiliar terraced fields and a village that appears on no map anyone can find. A fourth-century tale tells of a fisherman who wandered into exactly such a hidden valley, spent what felt like days there, and could never find the way back in again no matter how carefully he marked the trail.|El sendero de montaña parecía el de siempre hasta que dejó de serlo, abriéndose a campos en terraza desconocidos y una aldea que no aparece en ningún mapa.|Le sentier de montagne semblait le même que d'habitude jusqu'à ce qu'il ne le soit plus, débouchant sur des champs en terrasses inconnus et un village qui ne figure sur aucune carte.|山道はいつもと同じに見えていたのに、いつの間にか様子が変わり、見覚えのない棚田と、どの地図にも載っていない村が開けていた。四世紀の物語は、まさにこうした隠れ里に迷い込んだ漁師を伝える。そこで幾日か過ごした気がしたが、どれほど丁寧に道しるべを付けても二度とたどり着けなかったという。",
    ),
  },
  {
    id: "miaohui-paishou",
    n: t("A pickpocket works the temple fair crowd|Un carterista trabaja entre la multitud de la feria del templo|Un pickpocket sévit dans la foule de la fête du temple|廟会の人混みですりに遭う"),
    t: t(
      "The crowd around the incense burner was packed shoulder to shoulder, and a light bump felt like nothing more than the crush of the festival until the next stall revealed a jacket pocket sitting empty. Temple fairs draw exactly this kind of dense, distracted crowd by design, everyone looking at the stalls and the smoke rather than at each other.|La multitud alrededor del incensario estaba apretada hombro con hombro, y un roce leve pareció solo el bullicio de la fiesta hasta que el siguiente puesto reveló un bolsillo vacío.|La foule autour du brûle-encens était compacte, épaule contre épaule, et un léger heurt ne parut que la cohue de la fête jusqu'à ce que l'étal suivant révèle une poche de veste vide.|香炉の周りは肩がぶつかるほどの人混みで、軽く押された感覚も祭りの雑踏としか思えなかった。次の露店に着いてはじめて、上着のポケットが空になっているのに気づいた。廟会はまさにこうした、誰もが屋台と煙にばかり目をやり互いを見ない、密で気の逸れた人混みを生む場である。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。清明(4月)・労働節(5月)・端午節(6月)・
 * 避暑(7〜8月)・中秋節(9月)・国慶節(10月)・冬至(12月)・春節(1月・給アイテム)・
 * 元宵節(2月)・沙塵暴の始まり(3月)、という流れ。
 */
export const CHINA_SEASONS = [
  {
    e: "🌸",
    n: t("Qingming and the Luoyang peonies|Qingming y las peonías de Luoyang|Qingming et les pivoines de Luoyang|清明と洛陽の牡丹"),
    t: t(
      "Families sweep ancestral graves and share a meal beside them in the first half of the month, a rite old enough that a Tang-dynasty poem already complains about the spring rain that seems to fall on this day without fail. In Luoyang the peony gardens open the same weeks, and growers who have tended a single prized variety for decades bring cuttings to be judged.|Las familias barren las tumbas ancestrales y comparten una comida junto a ellas en la primera quincena del mes, un rito tan antiguo que un poema de la dinastía Tang ya se queja de la lluvia primaveral.|Les familles balaient les tombes ancestrales et y partagent un repas dans la première quinzaine du mois, un rite si ancien qu'un poème de la dynastie Tang se plaint déjà de la pluie printanière.|月の前半、人々は祖先の墓を掃除し、そのそばで食事を分け合う。唐代の詩がすでに、この日に限って降るような春の雨を嘆いているほど古い習わしである。洛陽では同じ数週間に牡丹園が開き、何十年も一つの品種を守ってきた栽培家が挿し木を持ち寄って優劣を競う。",
    ),
    f: t(
      "The Qingming rain the Tang poet complained of is real enough to have a name of its own in weather reports, a spell of drizzle that meteorologists say tends to arrive with enough regularity to plan around, if rarely on the exact day.|La lluvia de Qingming que lamentaba el poeta Tang es lo bastante real como para tener nombre propio en los partes meteorológicos.|La pluie de Qingming que déplorait le poète Tang est assez réelle pour porter son propre nom dans les bulletins météo.|唐の詩人が嘆いた清明の雨は、天気予報でも独自の呼び名を持つほど実在する現象で、めったに当日ぴったりではないにせよ、計画が立てられる程度には規則正しく訪れるという。",
    ),
  },
  {
    e: "🎏",
    n: t("Labour Day and the first travel rush of summer|El Día del Trabajo y la primera avalancha de viajes del verano|La fête du Travail et la première ruée estivale|労働節と初夏の旅ラッシュ",
    ),
    t: t(
      "A short national holiday around the first of May sends a large share of the country travelling at once, and highways and high-speed rail alike see a smaller preview of the crowding that Spring Festival brings later in the cycle. Factories that run through the rest of the year often schedule their one extended shutdown around this same week.|Un breve festivo nacional en torno al primero de mayo pone a viajar a buena parte del país a la vez, y autopistas y trenes de alta velocidad ven un anticipo, más pequeño, de la aglomeración que trae después el Festival de Primavera.|Un court jour férié national autour du premier mai fait voyager une grande partie du pays d'un coup, et autoroutes comme trains à grande vitesse connaissent un avant-goût, plus modeste, de l'affluence de la fête du Printemps.|五月一日前後の短い連休で、国じゅうの多くの人が一斉に旅に出る。高速道路も高速鉄道も、のちの春節ほどではないにせよ、その混雑の前触れのような賑わいを見せる。年間通して稼働する工場の多くが、この同じ週にまとまった休業日を組む。",
    ),
    f: t(
      "The holiday's length has been adjusted by the government several times since it was first extended into a longer break in 1999, shortened and lengthened again as officials weighed the economic boost of travel spending against the strain on transport networks.|La duración del festivo la ha ajustado el gobierno varias veces desde que se alargó por primera vez en 1999.|La durée du jour férié a été ajustée plusieurs fois par le gouvernement depuis son premier allongement en 1999.|この連休の長さは、1999年に初めて延長されて以来、政府によって何度か調整されてきた。旅行支出が生む経済効果と交通網への負担を天秤にかけての、短縮と再延長の繰り返しである。",
    ),
  },
  {
    e: "🚣",
    n: t("Dragon boats race on the southern rivers|Barcos dragón compiten en los ríos del sur|Des bateaux-dragons s'affrontent sur les fleuves du sud|南の川で竜舟が競う"),
    t: t(
      "Teams of twenty paddlers or more race narrow boats carved with dragon heads to the beat of a drum set in the bow, a sport tied to the legend of a poet-official who drowned himself in protest and whose body villagers raced out in boats to try to recover. Sticky rice dumplings wrapped in bamboo leaves are eaten nationwide the same week regardless of whether a river is anywhere nearby.|Equipos de veinte remeros o más compiten en barcas estrechas talladas con cabezas de dragón al ritmo de un tambor en la proa, un deporte ligado a la leyenda de un poeta funcionario que se ahogó en protesta.|Des équipes de vingt pagayeurs ou plus font courser d'étroites embarcations à tête de dragon sculptée, au rythme d'un tambour placé à la proue, un sport lié à la légende d'un poète-fonctionnaire qui se noya en signe de protestation.|二十人を超える漕ぎ手が、舳先に据えた太鼓の音に合わせ、竜の頭を彫った細長い舟を競わせる。抗議のために入水した詩人官吏の伝説にちなむ競技で、村人たちが亡骸を捜そうと舟を漕ぎ出したという話に由来する。竹の葉で包んだもち米の粽は、川が近くになくても同じ週に国じゅうで食べられる。",
    ),
    f: t(
      "The dragon boat sport is concentrated on the Yangtze and Pearl River systems where the legend is set, and southern cities along those rivers hold the largest races, drawing crews that train through the preceding months on the same water.|El deporte del barco dragón se concentra en las cuencas del Yangtsé y el río Perla, donde se ambienta la leyenda, y las ciudades del sur celebran allí las mayores carreras.|Le sport du bateau-dragon se concentre sur les bassins du Yangtsé et de la rivière des Perles, où se situe la légende, et les villes du sud y organisent les plus grandes courses.|竜舟競技は、その伝説の舞台である長江と珠江の流域に集中しており、その川沿いの南の街々が最大の競技会を開く。乗り手たちは前の数か月、同じ川で練習を積む。",
    ),
  },
  {
    e: "🏖️",
    n: t("The heat sends the north south and the south indoors|El calor manda al norte hacia el sur y al sur adentro|La chaleur envoie le nord vers le sud et le sud à l'intérieur|暑さが北を南へ、南を屋内へ追いやる"),
    t: t(
      "Cities in the northeast advertise themselves as summer retreats to visitors escaping heat farther south, while in the humid south air conditioning runs almost continuously and the desert basins of the northwest paradoxically draw tourists curious to feel the country's most extreme recorded temperatures firsthand.|Las ciudades del noreste se anuncian como refugios de verano para quienes huyen del calor más al sur, mientras que en el sur húmedo el aire acondicionado funciona casi sin parar.|Les villes du nord-est se présentent comme des refuges d'été pour les visiteurs fuyant la chaleur plus au sud, tandis que dans le sud humide la climatisation tourne presque sans relâche.|東北の街々は、もっと南の暑さから逃れてくる客に向けて、自らを避暑地として売り込む。湿った南ではエアコンがほぼ休みなく回り、西北の砂漠の盆地には皮肉にも、国内屈指の記録的な高温を自ら体感したいという客が集まる。",
    ),
    f: t(
      "Turpan's basin regularly posts the country's highest recorded temperatures each summer, hot enough that eggs are sometimes demonstrated cooking directly on the sand for visitors, a stunt guides repeat every season because it never fails to draw a crowd.|La cuenca de Turfán registra cada verano las temperaturas más altas del país, tan calurosas que a veces se hacen demostraciones de huevos cocinándose directamente en la arena para los visitantes.|Le bassin de Turfan enregistre chaque été les températures les plus élevées du pays, assez chaudes pour qu'on y fasse parfois cuire des œufs à même le sable devant les visiteurs.|トルファン盆地は毎夏、国内最高の記録的な気温を出す。観光客の前で実際に卵を砂の上で焼いてみせる余興が毎シーズン繰り返されるほどの暑さで、これが外れたことはない。",
    ),
  },
  {
    e: "🏮",
    n: t("The whole country is officially on holiday|Todo el país está oficialmente de vacaciones|Tout le pays est officiellement en vacances|国じゅうが公式に休暇へ入る"),
    t: t(
      "A national holiday clears offices and schools for a stretch that many extend into a full family trip, and beach towns from Xiamen to Sanya post their fullest bookings of the year in the same weeks. Even the Nian beast of old tales is said to rest this month, tired out by a summer too hot for chasing anyone.|Un festivo nacional vacía oficinas y escuelas durante un tramo que muchos alargan en un viaje familiar completo, y los pueblos de playa de Xiamen a Sanya registran sus reservas más altas del año en esas mismas semanas.|Un jour férié national vide bureaux et écoles pour une période que beaucoup prolongent en un vrai voyage en famille, et les villes balnéaires de Xiamen à Sanya affichent leurs réservations les plus pleines de l'année ces mêmes semaines.|国の祝日で会社も学校も休みになり、多くはそれを家族旅行にまで延ばす。厦門から三亜までの海辺の町は、同じ数週間で一年でいちばん予約が埋まる。昔話の年獣でさえ、誰かを追いかけるには暑すぎる夏に疲れて、この月は休むと言われる。",
    ),
    f: t(
      "Domestic tourism figures for this single week regularly run into the hundreds of millions of trips nationwide, a scale that has made the holiday one of the clearest annual snapshots of how much disposable income and leisure time have grown.|Las cifras de turismo interno de esta sola semana rondan regularmente los cientos de millones de viajes en todo el país.|Les chiffres du tourisme intérieur pour cette seule semaine avoisinent régulièrement des centaines de millions de déplacements à l'échelle nationale.|この一週間だけの国内旅行者数は、全国で毎年数億人分の移動に達する。可処分所得と余暇時間がどれほど伸びたかを映す、年に一度のはっきりした指標の一つになっている。",
    ),
  },
  {
    e: "🌕",
    n: t("The moon is watched from every rooftop|La luna se observa desde cada azotea|La lune s'observe depuis chaque toit|どの屋上からも月を見上げる"),
    t: t(
      "Round mooncakes stuffed with lotus paste or salted egg yolk are exchanged between families and colleagues for weeks beforehand, and on the night itself people gather outdoors specifically to look at the full moon together, a rite tied to a legend of a woman who drifted to the moon after swallowing an elixir meant to be shared.|Pasteles de luna rellenos de pasta de loto o yema de huevo salada se intercambian entre familias y colegas durante semanas, y la noche misma la gente se reúne al aire libre para mirar juntos la luna llena.|Des gâteaux de lune fourrés à la pâte de lotus ou au jaune d'œuf salé s'échangent entre familles et collègues des semaines à l'avance, et le soir même, on se rassemble dehors pour regarder ensemble la pleine lune.|蓮の餡や塩漬け卵黄を詰めた丸い月餅が、何週間も前から家族や同僚のあいだで贈り合われる。当夜は人々がわざわざ外に集まり、連れ立って満月を見上げる。分かち合うはずだった霊薬をひとりで飲んで月へ漂っていった女の伝説にちなむ。",
    ),
    f: t(
      "The festival falls on the fifteenth day of the eighth lunar month specifically because a full moon is guaranteed on that date under the lunar calendar's own reckoning, making the date's link to the moon a matter of calendar design rather than coincidence.|La fiesta cae el día quince del octavo mes lunar precisamente porque esa fecha garantiza luna llena según el propio cómputo del calendario lunar.|La fête tombe le quinzième jour du huitième mois lunaire précisément parce que cette date garantit une pleine lune selon le calcul propre du calendrier lunaire.|この祭りが旧暦八月十五日と定められているのは、旧暦そのものの数え方では、その日に必ず満月が来るからである。月との結びつきは偶然ではなく、暦の仕組みそのものによるものである。",
    ),
  },
  {
    e: "🎇",
    n: t("A whole week off for the country's birthday|Toda una semana libre por el cumpleaños del país|Toute une semaine de congé pour l'anniversaire du pays|建国の祝いで丸一週間休む"),
    t: t(
      "The first of October marks the founding of the country in 1949, and the week-long holiday built around it is one of two \"golden weeks\" that together move a large share of a year's domestic tourism; Beijing's parks and the mountain resorts fill fastest, since the holiday now coincides with the peak of autumn colour in the hills above the capital.|El primero de octubre marca la fundación del país en 1949, y la semana libre en torno a esa fecha es una de las dos «semanas doradas» que juntas mueven buena parte del turismo interno del año.|Le premier octobre marque la fondation du pays en 1949, et la semaine de congé qui l'entoure est l'une des deux « semaines dorées » qui, ensemble, déplacent une grande part du tourisme intérieur annuel.|十月一日は1949年の建国を記念する日で、それを囲む一週間の休みは、年間の国内観光の大きな割合を動かす二つの「黄金週間」の一つである。北京の公園や近郊の山間の避暑地が真っ先に埋まる。ちょうど首都を望む山々の紅葉の盛りと重なるからである。",
    ),
    f: t(
      "Fireworks over Tiananmen Square on the eve of the holiday are broadcast nationwide, and the display's scale has grown enough over the decades that some recent years replaced part of it with coordinated drone light shows instead.|Los fuegos artificiales sobre la plaza de Tiananmen la víspera del festivo se retransmiten a todo el país, y la escala del espectáculo ha crecido tanto en las últimas décadas que en algunos años recientes se sustituyó en parte por espectáculos de drones coordinados.|Le feu d'artifice sur la place Tiananmen la veille du jour férié est retransmis dans tout le pays, et l'ampleur du spectacle a tant grandi ces dernières décennies que certaines années récentes en ont remplacé une partie par des spectacles de drones coordonnés.|祝日前夜、天安門広場で打ち上げられる花火は全国に中継される。その規模はここ数十年で大きくなりすぎて、近年は一部が編隊を組んだドローンの光の演出に置き換えられた年もある。",
    ),
  },
  {
    e: "🍂",
    n: t("Chrysanthemums and the last warm days|Crisantemos y los últimos días cálidos|Chrysanthèmes et les derniers jours doux|菊の花と最後の暖かい日々"),
    t: t(
      "Chrysanthemum shows fill city parks with potted blooms trained into towers, cascades and even human-shaped frames, a display tradition old enough to have its own classical poetry, while harvest markets sell the year's persimmons hung in long strings to dry on balconies across the north.|Las exposiciones de crisantemos llenan los parques urbanos de macetas entrenadas en torres, cascadas e incluso formas humanas, una tradición ornamental lo bastante antigua como para tener su propia poesía clásica.|Les expositions de chrysanthèmes emplissent les parcs urbains de pots dressés en tours, en cascades et même en silhouettes humaines, une tradition ornementale assez ancienne pour avoir sa propre poésie classique.|菊花展は、塔やしだれ、人の形にまで仕立てられた鉢植えで公園を埋め尽くす。古典詩にまで詠まれるほど古い飾りの伝統である。収穫市では、その年の柿が長い紐に連なって北方各地のベランダに吊るされ、干し柿になっていく。",
    ),
    f: t(
      "The ninth day of the ninth lunar month, usually falling in this month, is traditionally spent climbing a hill or mountain while wearing a sprig of dogwood, a custom said to have begun as protection against a seasonal plague blamed on the number nine repeating itself.|El noveno día del noveno mes lunar, que suele caer en este mes, se pasa tradicionalmente subiendo una colina o montaña con una ramita de cornejo, costumbre que se dice comenzó como protección contra una plaga estacional.|Le neuvième jour du neuvième mois lunaire, tombant généralement ce mois-ci, se passe traditionnellement à gravir une colline en portant un brin de cornouiller, coutume censée avoir débuté en protection contre un fléau saisonnier.|旧暦九月九日は、たいていこの月に当たり、伝統的に茱萸の枝を身につけて丘や山に登って過ごす。九が重なることに結びつけられた季節の疫病除けとして始まったと伝わる習わしである。",
    ),
  },
  {
    e: "🥟",
    n: t("Dumplings mark the shortest day|Las empanadillas marcan el día más corto|Des raviolis marquent le jour le plus court|冬至に餃子を食べる"),
    t: t(
      "Northern households eat dumplings on the winter solstice specifically to keep their ears from freezing through the season, following a folk tale about a doctor who filled dough with mutton and warming herbs to treat frostbitten ears among the poor, while the south more often marks the day with glutinous rice balls in sweet broth instead.|Los hogares del norte comen empanadillas en el solsticio de invierno concretamente para que no se les congelen las orejas durante la estación, siguiendo un cuento popular sobre un médico que rellenó masa con cordero y hierbas.|Les foyers du nord mangent des raviolis au solstice d'hiver précisément pour éviter que leurs oreilles ne gèlent durant la saison, selon un conte populaire sur un médecin qui fourra de la pâte de mouton et d'herbes chauffantes.|北方の家庭は、冬至にまさに耳が凍えないようにと餃子を食べる。貧しい人々の凍傷になった耳を治そうと、羊肉と体を温める薬草を皮で包んだ医者の民話に由来する。南方ではこの日、代わりに甘いスープに浮かべたもち米団子を食べることのほうが多い。",
    ),
    f: t(
      "Harbin's ice festival preparations begin around this time each year, with blocks cut from the frozen Songhua River while it is thick enough to bear the weight, stored ahead of the carving that turns them into illuminated sculptures for the new year.|Los preparativos del festival de hielo de Harbin comienzan hacia estas fechas cada año, con bloques cortados del río Songhua congelado mientras es lo bastante grueso para soportar el peso.|Les préparatifs du festival de glace de Harbin débutent vers cette période chaque année, avec des blocs découpés dans le fleuve Songhua gelé tant qu'il est assez épais pour supporter le poids.|ハルビンの氷祭りの準備は毎年この時期に始まる。凍った松花江が重みに耐えるだけの厚さになったところで氷塊を切り出し、新年に向けて光る彫刻へと彫り上げるまでのあいだ蓄えておく。",
    ),
  },
  {
    e: "🧧",
    n: t("The Spring Festival, and a year that starts over|El Festival de Primavera, y un año que empieza de nuevo|La fête du Printemps, une année qui repart à zéro|春節、年がまた始まる"),
    t: t(
      "Red paper covers doorways, unmarried relations hand out cash in red envelopes, and a family reunion dinner on New Year's Eve is treated as close to mandatory as any meal in the calendar, with migrant workers and students alike making the journey home from wherever the year's work took them, whatever the ticket cost.|El papel rojo cubre las puertas, los familiares sin pareja reparten dinero en sobres rojos, y la cena de reunión familiar en Nochevieja se trata como casi obligatoria.|Le papier rouge recouvre les portes, les proches non mariés distribuent de l'argent dans des enveloppes rouges, et le dîner de réunion familiale du réveillon est traité comme quasi obligatoire.|戸口という戸口が赤い紙で覆われ、未婚の親戚は紅包に現金を入れて配る。大晦日の家族団欒の夕食は、暦の中でも他に類のないほど欠かせないものとして扱われ、出稼ぎ労働者も学生も、切符がいくらしようと、その年働いていたどこからでも家路をたどる。",
    ),
    f: t(
      "The date shifts each year because it is set by the lunar calendar, falling anywhere between late January and late February, which is why some years feel like an early new year and others a late one even though the customs themselves never change.|La fecha cambia cada año porque la fija el calendario lunar, cayendo entre finales de enero y finales de febrero.|La date change chaque année car elle est fixée par le calendrier lunaire, tombant entre fin janvier et fin février.|日付は旧暦で決まるため毎年変わり、一月末から二月末のどこかに来る。習わし自体は変わらないのに、年によって早い正月にも遅い正月にも感じられるのはそのためである。",
    ),
  },
  {
    e: "🏮",
    n: t("Lanterns close out the new year celebrations|Los faroles cierran las celebraciones de año nuevo|Des lanternes closent les célébrations du nouvel an|提灯で新年の祝いを締めくくる"),
    t: t(
      "Fifteen days after the new year, the festival that closes the holiday fills streets with paper lanterns and riddles written on slips tucked inside them, and glutinous rice balls filled with sweet paste are eaten while the last of the season's fireworks go up. Only after this night do decorations traditionally come down and ordinary work resume in full.|Quince días después del año nuevo, la fiesta que cierra el festivo llena las calles de faroles de papel con acertijos escritos en tiras metidas dentro.|Quinze jours après le nouvel an, la fête qui clôt les célébrations emplit les rues de lanternes de papier renfermant des devinettes inscrites sur des bandelettes.|新年から十五日、祝いを締めくくるこの祭りは、街路を紙の提灯と、その中に忍ばせた謎かけの紙片で埋める。甘い餡を詰めたもち米団子が食べられ、そのシーズン最後の花火が上がる。この夜を過ぎてはじめて、飾りは伝統的に取り外され、仕事は本来のかたちに戻る。",
    ),
    f: t(
      "Riddles tucked into lanterns have been part of the festival since at least the Song dynasty, and solving one correctly traditionally earned a small prize from the lantern's owner, a custom some shopping districts still keep alive with printed slips rather than handwritten ones.|Los acertijos metidos en los faroles forman parte de la fiesta desde al menos la dinastía Song, y resolver uno correctamente daba tradicionalmente un pequeño premio.|Les devinettes glissées dans les lanternes font partie de la fête depuis au moins la dynastie Song, et en résoudre une donnait traditionnellement un petit prix de la part du propriétaire de la lanterne.|提灯に忍ばせた謎かけは、少なくとも宋代からこの祭りの一部であり、正しく解けば灯りの持ち主から小さな褒美をもらえるのが習わしだった。手書きではなく印刷した紙片にして、いまもこの習わしを続けている商店街もある。",
    ),
  },
  {
    e: "🌬️",
    n: t("The dust season begins again|La temporada de polvo empieza otra vez|La saison des poussières recommence|黄砂の季節がまた始まる"),
    t: t(
      "Dry, warm winds off the interior deserts start picking up dust in earnest this month, and northern cities post daily air-quality readings the way other places post a weather forecast. Decades of tree-planting along the desert edge have measurably slowed the sand's advance, though a bad storm can still turn midday into dusk.|Los vientos secos y cálidos de los desiertos del interior empiezan a levantar polvo en serio este mes, y las ciudades del norte publican lecturas diarias de calidad del aire.|Les vents secs et chauds venus des déserts de l'intérieur commencent à soulever sérieusement la poussière ce mois-ci, et les villes du nord publient des relevés quotidiens de qualité de l'air.|内陸の砂漠から吹く乾いた暖かい風が、この月から本格的に砂を巻き上げ始める。北方の街々は、よそが天気予報を出すのと同じように毎日の大気質を発表する。砂漠の縁に沿った何十年もの植林で砂の進出は確かに遅くなったが、ひどい嵐が来れば昼が夕方のようになることはいまもある。",
    ),
    f: t(
      "The \"Three-North Shelterbelt\" tree-planting programme, begun in 1978 and still running, is planned to continue until 2050 and is often described as the largest ecological engineering project ever attempted by a single country.|El programa de plantación de árboles «Cortavientos de las Tres Norte», iniciado en 1978 y aún en marcha, está previsto que continúe hasta 2050.|Le programme de plantation d'arbres « Brise-vent des Trois-Nord », lancé en 1978 et toujours en cours, doit se poursuivre jusqu'en 2050.|1978年に始まりいまも続く「三北防護林」の植林事業は、2050年まで続く計画で、一国が手がけた生態工学の事業としては史上最大級としばしば評される。",
    ),
  },
];
