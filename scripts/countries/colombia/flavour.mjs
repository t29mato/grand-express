/**
 * コロンビアの国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月(0=4月〜11=3月、暦は共通)。
 * コロンビアは赤道に近く気温の年較差はほとんど無いが、地方ごとに雨季・
 * 乾季の周期が異なる(アンデスは二峰性、太平洋岸・アマゾンはほぼ通年多雨、
 * カリブ海岸は単峰性)うえ、実在の祭り・収穫期に紐づけて多様さを出した。
 *
 * 厄災の神は「エル・モアン」——マグダレナ川をはじめコロンビアの河川に
 * 伝わる、長い髪をした川の精霊。カヌーを転覆させ、網から魚を隠し、
 * 笑い声で旅人を惑わすとされ、タバコの供え物で鎮まるという伝承に基づく。
 * この盤面の芯(川がまず道だった)と直接重ねている。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const COLOMBIA_META = {
  id: "colombia",
  name: t("Colombia|Colombia|Colombie|コロンビア"),
  blurb: t(
    "A country split into three mountain ranges, where the river had to be the road the railway never became|Un país partido en tres cordilleras, donde el río tuvo que ser el camino que el ferrocarril nunca llegó a ser|Un pays fendu en trois cordillères, où le fleuve dut être la route que le chemin de fer ne devint jamais|3本の山脈に分かれた国で、鉄道になれなかった道を、川が担い続けた",
  ),
  cur: { pre: "$", post: "", mul: 265000 },
  start: "bogota",
  cpuNames: ["Mohán", "Cóndor", "Guacamaya", "Chiva"],
  // 国旗の黄・青・赤、コーヒー地方の緑、エメラルドの深い緑。
  stripe: ["#fcd116", "#003893", "#ce1126", "#2f6b3a", "#0d5c3b"],
};

/** 5地方(cities.mjs と同じコード)。 */
export const COLOMBIA_REGIONS = {
  car: t("Caribe (the Caribbean coast)|Caribe|Caraïbe (la côte caribéenne)|カリベ(カリブ海岸)"),
  and: t("Andina (the Andes)|Andina|Andine (les Andes)|アンディナ(アンデス)"),
  pac: t("Pacífico (the Pacific coast)|Pacífico|Pacifique (la côte pacifique)|パシフィコ(太平洋岸)"),
  lla: t("Los Llanos (the eastern plains)|Los Llanos|Los Llanos (les plaines orientales)|ロス・ジャノス(東部平原)"),
  ama: t("Amazonía (the southern rainforest)|Amazonía|Amazonie (la forêt australe)|アマソニア(南部熱帯林)"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ8種(roll-fixed-diceのみdiceCount違いで
 * 2件、計9件。対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 * 鍵は既存盤面(約380件)と衝突しないことを確認済み。
 *
 * 「向きの選べない移動アイテムは、操縦できるものより安い」の原則どおり、
 * hidroavion(水上機まかせ・260)は chiva(自分で選ぶ・380)より安い。
 */
export const COLOMBIA_ITEMS = {
  hidroavion: {
    e: "🛩️",
    price: 260,
    kind: "move",
    n: t("A Seat on the River Seaplane|Un asiento en el hidroavión del río|Une place dans l'hydravion du fleuve|川の水上機の座席"),
    d: t(
      "Carried 8–12 squares. Where you land is up to the pilot, not you.|Te lleva de 8 a 12 casillas. Dónde aterrizas lo decide el piloto, no tú.|Emporté de 8 à 12 cases. Où tu atterris, c'est le pilote qui décide, pas toi.|8〜12マス運ばれる。どこに降りるかは操縦士が決め、乗客には選べない。",
    ),
    f: t(
      "Colombia's first airline, SCADTA, had no runways to work with when it started flying the Magdalena in 1920, so its aircraft simply landed on the river itself — treating the water that was already the country's road as a runway too.|La primera aerolínea de Colombia, la SCADTA, no tenía pistas cuando empezó a volar sobre el Magdalena en 1920, así que sus aviones simplemente amerizaban en el propio río, convirtiendo en pista también el agua que ya era el camino del país.|La première compagnie aérienne de Colombie, la SCADTA, n'avait aucune piste quand elle commença à voler au-dessus du Magdalena en 1920, si bien que ses appareils amerrissaient tout simplement sur le fleuve lui-même, faisant de l'eau qui était déjà la route du pays une piste elle aussi.|コロンビア初の航空会社SCADTAは、1920年にマグダレナ川上空を飛び始めた時点で滑走路を持たず、機体はただ川そのものに着水した。すでに国の道であった水を、そのまま滑走路にも変えてしまったのである。",
    ),
  },
  chiva: {
    e: "🚌",
    price: 380,
    kind: "pre",
    n: t("A Seat on the Chiva|Un puesto en la chiva|Une place dans la chiva|チバの座席"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Painted in loud colours with wooden benches bolted along open sides, the chiva was for decades the only bus built to survive Colombia's unpaved mountain roads, carrying passengers, sacks of produce and the occasional live chicken all in the same trip.|Pintada de colores vivos y con bancas de madera atornilladas a los lados abiertos, la chiva fue durante décadas el único bus hecho para aguantar las carreteras de montaña sin pavimentar de Colombia, llevando pasajeros, sacos de cosecha y alguna gallina viva, todo en el mismo viaje.|Peinte de couleurs vives, avec des bancs de bois boulonnés le long de ses flancs ouverts, la chiva fut pendant des décennies le seul bus conçu pour survivre aux routes de montagne non pavées de Colombie, transportant passagers, sacs de récolte et parfois une poule vivante, tout cela dans le même trajet.|派手な色に塗られ、開いた側面に木のベンチをボルト留めしたチバは、何十年ものあいだコロンビアの未舗装の山道に耐えられる唯一のバスだった。乗客も収穫物の袋も、ときには生きた鶏まで、同じ一便で運んだ。",
    ),
  },
  trensabana: {
    e: "🚂",
    price: 340,
    kind: "pre",
    n: t("A Ticket on the Tren de la Sabana|Un boleto en el Tren de la Sabana|Un billet pour le Tren de la Sabana|サバナ線の切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "The short line linking Bogotá to Zipaquirá once carried commuters and salt alike, and its steam locomotive still makes the run today as a weekend tourist train, one of the few stretches of passenger rail left running anywhere in the country.|La breve línea que une Bogotá con Zipaquirá antes llevaba por igual a viajeros diarios y a la sal, y su locomotora de vapor todavía hace el recorrido hoy como tren turístico de fin de semana, uno de los pocos tramos de tren de pasajeros que siguen funcionando en el país.|La courte ligne reliant Bogotá à Zipaquirá transportait autrefois aussi bien des navetteurs que du sel, et sa locomotive à vapeur effectue encore aujourd'hui le trajet comme train touristique du week-end, l'un des rares tronçons de chemin de fer voyageurs encore en service dans le pays.|ボゴタとシパキラを結ぶ短い路線は、かつて通勤客も塩も同じように運んでいた。その蒸気機関車はいまも週末の観光列車としてこの区間を走り続けており、国内でいまも旅客輸送が残るわずかな鉄道区間の一つである。",
    ),
  },
  expresodelsol: {
    e: "🚄",
    price: 620,
    kind: "pre",
    n: t("A Ticket on the Expreso del Sol|Un boleto en el Expreso del Sol|Un billet pour l'Expreso del Sol|エクスプレソ・デル・ソルの切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Named for the long run it once made between the highlands and the Caribbean coast, the Expreso del Sol was among the last of Colombia's long-distance passenger trains before most of the network was handed over entirely to freight in the late twentieth century.|Llamado así por el largo trayecto que antes hacía entre la sierra y la costa Caribe, el Expreso del Sol fue uno de los últimos trenes colombianos de pasajeros de larga distancia antes de que casi toda la red pasara por completo a la carga a finales del siglo XX.|Ainsi nommé pour le long trajet qu'il effectuait jadis entre les hauts plateaux et la côte Caraïbe, l'Expreso del Sol fut l'un des derniers trains de voyageurs longue distance de Colombie avant que l'essentiel du réseau ne soit entièrement cédé au fret à la fin du XXe siècle.|かつて高地とカリブ海岸のあいだの長い区間を走っていたことにちなんで名付けられたエクスプレソ・デル・ソルは、20世紀後半に鉄道網の大半がほぼ完全に貨物輸送へ譲られる前の、コロンビア最後の長距離旅客列車の一つだった。",
    ),
  },
  tabacoatado: {
    e: "🌿",
    price: 300,
    kind: "passive",
    n: t("A Tied Bundle of Tobacco|Un atado de tabaco|Un fagot de tabac noué|束ねたタバコの葉"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Boatmen on the Magdalena have long left small offerings of tobacco or aguardiente on the riverbank before a difficult crossing, meant for El Mohán, the river's spirit, so that he lets the canoe pass undisturbed.|Los boteros del Magdalena llevan mucho tiempo dejando pequeñas ofrendas de tabaco o aguardiente en la orilla antes de un paso difícil, destinadas a El Mohán, el espíritu del río, para que deje pasar la canoa sin molestarla.|Les bateliers du Magdalena laissent depuis longtemps de petites offrandes de tabac ou d'aguardiente sur la berge avant un passage difficile, destinées à El Mohán, l'esprit du fleuve, pour qu'il laisse passer la pirogue sans encombre.|マグダレナ川の船頭たちは、難所を渡る前に岸辺へタバコやアグアルディエンテの小さな供え物を置く習わしを長く続けてきた。川の精霊エル・モアンに捧げるためのもので、これによってカヌーが妨げられずに通れるとされる。",
    ),
  },
  cruzguayacan: {
    e: "✝️",
    price: 420,
    kind: "pre",
    n: t("A Guayacán-Wood Cross|Una cruz de guayacán|Une croix en bois de gaïac|グアヤカン材の十字架"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Guayacán, one of the hardest and densest woods found in Colombia's dry forests, is said in riverside folklore to be one of the few materials El Mohán cannot stand to be near, and small crosses carved from it are still kept by some fishing families.|El guayacán, una de las maderas más duras y densas de los bosques secos de Colombia, se dice en la tradición ribereña que es uno de los pocos materiales que El Mohán no soporta tener cerca, y algunas familias de pescadores todavía guardan pequeñas cruces talladas en él.|Le gaïac, l'un des bois les plus durs et les plus denses des forêts sèches de Colombie, est dit dans le folklore riverain être l'un des rares matériaux qu'El Mohán ne supporte pas d'avoir à proximité, et de petites croix taillées dedans sont encore conservées par certaines familles de pêcheurs.|コロンビアの乾燥林に生えるグアヤカンは、最も硬く緻密な木材のひとつで、川辺の言い伝えでは、エル・モアンが近くにあるのを嫌う数少ない素材とされる。この木で彫った小さな十字架は、いまも一部の漁師の家に伝わっている。",
    ),
  },
  torpedo: {
    e: "📝",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 140,
    kind: "passive",
    n: t("A Torpedo (Cheat Sheet)|Un torpedo (chuleta)|Un torpedo (antisèche)|トルペード(カンニングペーパー)"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "'Torpedo' is Colombian student slang for a hidden cheat sheet, small enough to slip past a watchful teacher and named, like the weapon, for how quickly it is meant to do its job once launched.|'Torpedo' es la jerga estudiantil colombiana para una chuleta escondida, lo bastante pequeña para pasar inadvertida ante un profesor atento, llamada así, como el arma, por lo rápido que se supone que cumple su función una vez lanzada.|« Torpedo » est l'argot étudiant colombien pour une antisèche cachée, assez petite pour passer inaperçue d'un professeur attentif, ainsi nommée, comme l'arme, pour la rapidité avec laquelle elle est censée faire son office une fois lancée.|「トルペード」は、油断ならない教師の目をすり抜けられるほど小さな、隠し持つカンニングペーパーを指すコロンビアの学生の隠語である。魚雷と同じ名で呼ばれるのは、放たれた瞬間にすばやく役目を果たすとされることにちなむ。",
    ),
  },
  esmeralda: {
    e: "💎",
    price: 320,
    kind: "pre",
    n: t("A Rough-Cut Emerald|Una esmeralda en bruto|Une émeraude brute|原石のエメラルド"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-la et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Colombia has long supplied a large share of the world's fine emeralds, mined chiefly around Boyacá and Cundinamarca, and buyers in Bogotá's emerald district still judge a stone's worth largely by eye, weighing colour and clarity against a loupe.|Colombia lleva mucho tiempo suministrando buena parte de las esmeraldas finas del mundo, extraídas sobre todo en Boyacá y Cundinamarca, y los compradores del sector esmeraldero de Bogotá todavía juzgan el valor de una piedra sobre todo a ojo, sopesando color y pureza con una lupa.|La Colombie fournit depuis longtemps une large part des émeraudes fines du monde, extraites surtout autour de Boyacá et de Cundinamarca, et les acheteurs du quartier des émeraudes de Bogotá jugent encore la valeur d'une pierre surtout à l'œil, en pesant couleur et pureté à la loupe.|コロンビアは長らく世界の上質なエメラルドの多くを産出してきた。おもにボヤカ県とクンディナマルカ県で採れ、ボゴタのエメラルド商店街の買い手はいまも、ルーペで色と透明度を見比べながら、おもに目利きで石の価値を判断している。",
    ),
  },
  correoaereo: {
    e: "✉️",
    price: 400,
    kind: "pre",
    n: t("An Airmail Connection|Una conexión de correo aéreo|Une correspondance de courrier aérien|航空郵便の乗り継ぎ"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "The Colombian government signed its first domestic airmail contract in 1922, only two years after commercial flights began, betting on the air before most of the country had ever seen a paved road.|El gobierno colombiano firmó su primer contrato de correo aéreo doméstico en 1922, solo dos años después de que empezaran los vuelos comerciales, apostando por el aire antes de que la mayor parte del país hubiera visto siquiera una carretera pavimentada.|Le gouvernement colombien signa son premier contrat de courrier aérien intérieur en 1922, seulement deux ans après le début des vols commerciaux, misant sur les airs avant que la majeure partie du pays n'ait jamais vu une route goudronnée.|コロンビア政府は、商業飛行が始まってわずか2年後の1922年に、国内初の航空郵便契約を結んだ。国土の大半がまだ舗装道路を見たことも無いうちから、空に賭けたのである。",
    ),
  },
};

/**
 * 厄災の神。「エル・モアン」——マグダレナ川ほか各地の川に伝わる、長い髪の
 * 川の精霊。カヌーを転覆させ、網から魚を隠し、笑い声で旅人を惑わすが、
 * タバコの供え物1つで機嫌が直るという、残酷というより気まぐれな性格に
 * してある(他盤面の厄災神と同じ調子)。
 */
export const COLOMBIA_SPIRIT = {
  e: "🌊",
  n: t("El Mohán|El Mohán|El Mohán|エル・モアン"),
  big: t("El Mohán's Flash Flood|La creciente de El Mohán|La crue soudaine d'El Mohán|エル・モアンの鉄砲水"),
  ward: "tabacoatado",
  arrive: t(
    "<b>🌊 El Mohán has taken an interest in you.</b> Along the Magdalena and other rivers, boatmen still tell of a long-haired river spirit who capsizes canoes, hides fish from nets, and lures travelers with laughter echoing off the water — appeased only by a tobacco offering left on the bank. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🌊 El Mohán se ha fijado en ti.</b> A lo largo del Magdalena y otros ríos, los boteros todavía cuentan que un espíritu de río de pelo largo vuelca canoas, esconde el pescado de las redes y atrae a los viajeros con una risa que resuena sobre el agua, aplacado solo con una ofrenda de tabaco dejada en la orilla. Ahora camina junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🌊 El Mohán s'est intéressé à toi.</b> Le long du Magdalena et d'autres fleuves, les bateliers racontent encore qu'un esprit du fleuve aux longs cheveux fait chavirer les pirogues, cache le poisson des filets et attire les voyageurs par un rire résonnant sur l'eau, apaisé seulement par une offrande de tabac laissée sur la berge. Il marche désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🌊 エル・モアンに目をつけられた。</b> マグダレナ川をはじめとする川々では、いまも船頭たちが語り継ぐ。長い髪をした川の精霊がカヌーをひっくり返し、網から魚を隠し、水面に響く笑い声で旅人を誘い込む。岸に置いたタバコの供え物でだけ、その怒りは鎮まるという。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🌊 <b>El Mohán</b> loses interest and settles over <b>{0}</b>, farthest from {1}.|🌊 <b>El Mohán</b> pierde el interés y se posa sobre <b>{0}</b>, el más lejano de {1}.|🌊 <b>El Mohán</b> se désintéresse et se pose sur <b>{0}</b>, le plus loin de {1}.|🌊 <b>エル・モアン</b> は興味を失い、{1} から最も遠い <b>{0}</b> の上に留まった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns beside the river spirit without ever leaving him an offering. The current turns all at once — <b>El Mohán's Flash Flood</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al espíritu del río sin dejarle nunca una ofrenda. La corriente se revuelve de golpe: empieza <b>la creciente de El Mohán</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours aux côtés de l'esprit du fleuve sans jamais lui laisser d'offrande. Le courant se déchaîne d'un coup : <b>la crue soudaine d'El Mohán</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンも川の精霊のそばを歩きながら、一度も供え物を残さなかった。流れが一気に荒れ狂う。<b>エル・モアンの鉄砲水</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> El Mohán appears across oral tradition in river communities of Colombia's Andean and Caribbean lowlands under slightly different names and details, generally as a guardian spirit of fish and gold who punishes greed and carelessness on the water.|<b>Tras la historia:</b> El Mohán aparece en la tradición oral de comunidades ribereñas de los Andes y el Caribe colombianos bajo nombres y detalles algo distintos, generalmente como espíritu guardián de los peces y el oro que castiga la codicia y el descuido en el agua.|<b>Derrière l'histoire :</b> El Mohán apparaît dans la tradition orale des communautés riveraines des Andes et des Caraïbes colombiennes sous des noms et des détails quelque peu différents, généralement comme esprit gardien des poissons et de l'or qui punit la cupidité et l'imprudence sur l'eau.|<b>物語の背景:</b> エル・モアンは、コロンビアのアンデスとカリブ海の低地の川辺の共同体の口承伝承の中に、少しずつ異なる名前や細部を伴って登場する。おおむね魚と金の守護精霊とされ、水の上での欲深さや不注意を懲らしめる存在である。",
  ),
  pleased: t(
    "The current calms for a moment, and a shoal of fish rises glittering to the surface. <b>{0}</b> gains <span class='money'>+{1}</span>.|La corriente se calma un instante, y un cardumen de peces sube brillando a la superficie. <b>{0}</b> gana <span class='money'>+{1}</span>.|Le courant se calme un instant, et un banc de poissons remonte en scintillant à la surface. <b>{0}</b> gagne <span class='money'>+{1}</span>.|流れが一瞬静まり、魚の群れがきらめきながら水面に浮かび上がった。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A tied bundle of tobacco is set on a stone at the water's edge where El Mohán can see it. The offering is enough — he sinks back beneath the current, passing <b>{0}</b> without incident this turn.|Se pone un atado de tabaco sobre una piedra a la orilla del agua, donde El Mohán pueda verlo. La ofrenda basta: se hunde de nuevo bajo la corriente, pasando junto a <b>{0}</b> sin incidentes esta vuelta.|Un fagot de tabac noué est posé sur une pierre au bord de l'eau, bien en vue d'El Mohán. L'offrande suffit : il se replonge sous le courant, passant devant <b>{0}</b> sans incident ce tour-ci.|水際の石の上に、エル・モアンに見えるようタバコの束を置いた。それだけで十分だった。エル・モアンはふたたび流れの下に沈み、このターンは何事もなく <b>{0}</b> の傍らを通り過ぎた。",
  ),
};

/**
 * 災難7種。「残酷ではなく、ただ度が過ぎるだけ」という他盤面の厄災神と同じ調子で。
 *
 * **並び順が仕組みと対応している。** `season-and-doom-rules.ts` 側は
 * 全盤面共通で7件を fine / percentLoss / skipTurn / loseProperties /
 * payOthers / teleport / steal の順に対応づけている。**この配列もその順に
 * 合わせてある。**登録時に順序を変えないこと。
 */
export const COLOMBIA_DOOM = [
  // 1) fine — 直接の出費
  {
    id: "chiva-varada",
    n: t("The chiva breaks down on a mountain curve|La chiva se vara en una curva de montaña|La chiva tombe en panne dans un virage de montagne|山道のカーブでチバが立ち往生する"),
    t: t(
      "The old engine coughed, sputtered, and finally gave out halfway up a switchback, and the driver's toolbox held nothing that would fix what was actually wrong. A mechanic eventually arrived from the next town over, charging for the trip as much as for the repair.|El motor viejo tosió, resopló y finalmente se apagó a mitad de una curva en zigzag, y la caja de herramientas del conductor no tenía nada que arreglara lo que en realidad estaba mal. Un mecánico llegó por fin del pueblo siguiente, cobrando tanto por el viaje como por la reparación.|Le vieux moteur toussa, hoqueta, puis rendit l'âme à mi-chemin d'un virage en épingle, et la boîte à outils du chauffeur ne contenait rien qui puisse réparer ce qui n'allait vraiment pas. Un mécanicien finit par arriver du village voisin, facturant le trajet autant que la réparation.|古いエンジンは咳き込み、あえぎ、つづら折りの道の途中でついに止まってしまった。運転手の道具箱には、本当の故障を直せるものは何も入っていなかった。ようやく隣町から整備士がやってきたが、修理代と同じくらい出張料を請求した。",
    ),
  },
  // 2) percentLoss — 割合で失う
  {
    id: "roya-cafetera",
    n: t("Coffee rust cuts into the harvest|La roya del café reduce la cosecha|La rouille du caféier réduit la récolte|コーヒーさび病が収穫を減らす"),
    t: t(
      "A reddish-orange fungus spread across the coffee leaves faster than anyone could spray for it this season, and the beans that did ripen were fewer and smaller than usual. Farmers across the coffee axis watch for the same rust every wet year, since no resistant variety has ever stamped it out for good.|Un hongo anaranjado rojizo se extendió por las hojas del cafeto más rápido de lo que nadie pudo fumigar esta temporada, y los granos que sí maduraron fueron menos y más pequeños de lo normal. Los caficultores del eje cafetero vigilan la misma roya cada año lluvioso, porque ninguna variedad resistente la ha eliminado del todo.|Un champignon orange rougeâtre s'est répandu sur les feuilles de caféier plus vite que quiconque n'a pu le traiter cette saison, et les grains qui ont mûri furent moins nombreux et plus petits qu'à l'accoutumée. Les caféiculteurs de tout l'axe caféier guettent la même rouille chaque année pluvieuse, car aucune variété résistante ne l'a jamais éliminée pour de bon.|赤みがかったオレンジ色の菌がコーヒーの葉に、今シーズンは誰も薬をまききれないほど早く広がり、実った豆はいつもより数も少なく小粒だった。コーヒー地帯の農家は、雨の多い年になるたびに同じさび病を警戒している。これを完全に防ぐ耐性品種はいまだに無い。",
    ),
  },
  // 3) skipTurn — 足止め
  {
    id: "creciente-cierra-paso",
    n: t("A flash flood closes the only crossing|Una creciente cierra el único paso|Une crue soudaine ferme l'unique passage|鉄砲水が唯一の渡し場を閉ざす"),
    t: t(
      "Rain fell hard somewhere upstream overnight, and the ford that was ankle-deep yesterday is now a churning brown torrent nobody in their right mind would cross. There is nothing to do but wait on the bank until the water drops back down, however long that takes.|Llovió fuerte río arriba durante la noche, y el vado que ayer apenas mojaba los tobillos hoy es un torrente marrón y revuelto que nadie en su sano juicio cruzaría. No queda más que esperar en la orilla a que baje el agua, por mucho que tarde.|Il a plu fort quelque part en amont pendant la nuit, et le gué qui n'arrivait hier qu'à la cheville est aujourd'hui un torrent brunâtre et tumultueux que personne de sensé ne traverserait. Il ne reste qu'à attendre sur la berge que l'eau redescende, aussi longtemps que cela prenne.|夜のうちに上流のどこかで激しい雨が降り、昨日はくるぶしまでしかなかった浅瀬が、今日はまともな人なら誰も渡ろうとしない、渦巻く茶色の急流に変わっていた。水が引くまで、どれほど時間がかかろうと、岸で待つほかない。",
    ),
  },
  // 4) loseProperties — 持ち物件を失う
  {
    id: "via-nueva-expropia",
    n: t("A new highway is routed straight through it|Una nueva carretera pasa justo por en medio|Une nouvelle route est tracée en plein dedans|新しい幹線道路が真ん中を通る"),
    t: t(
      "The survey stakes went in without much warning, and the engineers' final route for the new highway ran straight through what had been standing there for years. Compensation was offered, eventually, but at a government rate nobody involved considered fair.|Las estacas del levantamiento se clavaron sin mucho aviso, y el trazado final de la nueva carretera pasó justo por donde llevaba años lo que había allí. Al final se ofreció una indemnización, pero a una tarifa oficial que nadie de los implicados consideró justa.|Les piquets d'arpentage furent plantés sans grand préavis, et le tracé final de la nouvelle route passa en plein milieu de ce qui se trouvait là depuis des années. Une indemnisation fut finalement proposée, mais à un tarif officiel que personne d'impliqué ne jugea équitable.|測量の杭は大した予告もなく打ち込まれ、新しい幹線道路の最終ルートは、何年もそこに建っていたものの真ん中を通った。補償はのちに出されたが、関係者の誰もが公正だとは思わない役所の算定額だった。",
    ),
  },
  // 5) payOthers — 皆に払う
  {
    id: "tejo-apuesta-perdida",
    n: t("A bad night at the tejo court|Una mala noche en la cancha de tejo|Une mauvaise soirée sur le terrain de tejo|テホ場での散々な夜"),
    t: t(
      "The mecha kept going off for everyone else's throw but never quite for one's own, and by the last round the bet had grown well past what seemed reasonable when the beer started flowing. Tejo, thrown at a clay target packed with small gunpowder charges, rewards a steady arm more than most are willing to admit after a few rounds.|La mecha estallaba para todos los demás tiros menos para el propio, y para la última ronda la apuesta había crecido mucho más de lo razonable cuando empezó a correr la cerveza. El tejo, lanzado a un blanco de arcilla cargado con pequeñas mechas de pólvora, premia un brazo firme más de lo que casi nadie admite después de unas rondas.|La mèche explosait à chaque lancer des autres mais jamais tout à fait au sien, et à la dernière manche, le pari avait grimpé bien au-delà du raisonnable une fois la bière commencée à couler. Le tejo, lancé sur une cible d'argile chargée de petites mèches de poudre, récompense un bras assez sûr, plus que la plupart ne veulent l'admettre après quelques tournées.|導火薬は他の誰の投擲でも弾けるのに、自分の番だけは鳴らない。ビールが回り始めた最後のラウンドには、賭け金は始めたときには妥当に思えた額をずいぶん超えていた。粘土の的に仕込んだ小さな火薬を狙うテホは、何杯か飲んだあとに誰もが認めたがる以上に、安定した腕を求めてくる。",
    ),
  },
  // 6) teleport — 気付けば違う場所に
  {
    id: "vuelo-desviado",
    n: t("The flight is diverted by bad weather|El vuelo es desviado por mal tiempo|Le vol est dévié à cause du mauvais temps|悪天候で便が目的地を変える"),
    t: t(
      "Cloud closed in over the mountains just as the plane was due to descend, and the pilot circled twice before diverting to the nearest open airfield instead, wherever that happened to be. Ground transport from there back to the intended destination is entirely the passenger's problem.|Las nubes cerraron sobre las montañas justo cuando el avión debía descender, y el piloto dio dos vueltas antes de desviarse al aeródromo abierto más cercano, fuera cual fuera. El transporte terrestre desde allí hasta el destino previsto corre por cuenta del pasajero.|Les nuages se sont refermés sur les montagnes juste au moment où l'avion devait descendre, et le pilote a tourné deux fois avant de se dérouter vers l'aérodrome ouvert le plus proche, quel qu'il soit. Le transport terrestre de là jusqu'à la destination prévue est entièrement l'affaire du passager.|飛行機が降下するはずだった、まさにそのとき山々に雲が立ち込め、操縦士は二度旋回したのち、たまたま開いていた最寄りの飛行場へと便を振り向けた。そこから本来の目的地までの陸路は、まったくもって乗客自身の問題である。",
    ),
  },
  // 7) steal — すられる
  {
    id: "raponazo-callejero",
    n: t("A raponazo in the crowded street|Un raponazo en la calle atestada|Un raponazo dans la rue bondée|混雑した通りでのラポナソ"),
    t: t(
      "A hand closed around the phone before its owner even registered movement, and the runner was three shopfronts away and gone before anyone thought to shout. A raponazo works on speed and surprise alone, over almost as soon as it starts.|Una mano se cerró sobre el teléfono antes de que su dueño notara siquiera el movimiento, y el que corrió ya estaba tres locales más allá y perdido antes de que a nadie se le ocurriera gritar. Un raponazo funciona solo con velocidad y sorpresa, y termina casi apenas empieza.|Une main s'est refermée sur le téléphone avant même que son propriétaire ne perçoive le mouvement, et le voleur était déjà trois devantures plus loin, disparu avant que quiconque ne songe à crier. Un raponazo ne repose que sur la vitesse et la surprise, terminé presque aussitôt commencé.|持ち主が動きに気づく前に、手が電話をひったくっていた。走り去った相手は、誰かが叫ぼうと思う間もなく、三軒先の店先まで行って姿を消していた。ラポナソはただ速さと不意打ちだけで成り立ち、始まるとほとんど同時に終わる。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月(0=4月〜11=3月、暦は共通)。実在の祭り・
 * 収穫期を5地方(car/and/pac/lla/ama)へなるべく散らして選んでいる。
 * バランキージャのカーニバル(southamerica盤で既出)は避けた。
 */
export const COLOMBIA_SEASONS = [
  {
    e: "🪗",
    n: t("Festival de la Leyenda Vallenata fills Valledupar|El Festival de la Leyenda Vallenata llena Valledupar|Le Festival de la Leyenda Vallenata envahit Valledupar|バジェナート伝説祭がバジェドゥパルを満たす"),
    t: t(
      "For a week each April, accordion players from across the Caribbean lowlands compete in Valledupar for the title of Rey Vallenato, judged on technique, composition and the improvised verse duels called piquería.|Durante una semana cada abril, acordeoneros de todo el Caribe compiten en Valledupar por el título de Rey Vallenato, juzgados por técnica, composición y los duelos de versos improvisados llamados piquería.|Pendant une semaine chaque avril, des accordéonistes de toutes les Caraïbes colombiennes concourent à Valledupar pour le titre de Rey Vallenato, jugés sur la technique, la composition et les joutes de vers improvisés appelées piquería.|毎年4月の一週間、カリブ海低地各地のアコーディオン奏者たちがバジェドゥパルに集まり、技巧・作曲・即興の詩の掛け合いピケリアで審査される「バジェナートの王」の座を競う。",
    ),
    f: t(
      "The festival has run since 1968 and its winners are considered the music's living canon, much as Nashville's award shows function for country music.|El festival se celebra desde 1968 y sus ganadores se consideran el canon viviente del género, algo parecido a lo que las premiaciones de Nashville representan para la música country.|Le festival se tient depuis 1968 et ses lauréats sont considérés comme le canon vivant du genre, un peu à l'image de ce que représentent les cérémonies de Nashville pour la musique country.|この祭りは1968年から続き、優勝者はこのジャンルの生きた規範とみなされている。ナッシュビルの授賞式がカントリー音楽にとって果たす役割に近い。",
    ),
  },
  {
    e: "☕",
    n: t("The coffee axis picks its second, smaller harvest|El eje cafetero recoge su segunda cosecha, más pequeña|L'axe caféier récolte sa seconde récolte, plus petite|コーヒー地帯が二度目の小さな収穫を迎える"),
    t: t(
      "Colombia's coffee belt harvests twice a year, and this smaller round, called the mitaca, keeps pickers working through a month that would otherwise fall between the two main pushes.|El eje cafetero de Colombia cosecha dos veces al año, y esta ronda más pequeña, llamada la mitaca o traviesa, mantiene ocupados a los recolectores en un mes que de otro modo quedaría entre las dos cosechas principales.|La ceinture caféière colombienne récolte deux fois par an, et ce cycle plus modeste, appelé la mitaca, occupe les cueilleurs durant un mois qui resterait sinon entre les deux grandes récoltes.|コロンビアのコーヒー地帯は年に二度収穫期を迎える。「ミタカ」と呼ばれるこの小さいほうの収穫は、二つの大きな収穫期のあいだに空く月を摘み手の仕事で埋めている。",
    ),
    f: t(
      "Which slope faces which way changes the ripening calendar so much that some farms straddle both harvests within sight of each other.|La orientación de la ladera cambia tanto el calendario de maduración que algunas fincas viven ambas cosechas casi a la vista una de la otra.|L'orientation du versant modifie tellement le calendrier de maturation que certaines fermes vivent les deux récoltes presque à portée de vue l'une de l'autre.|斜面の向きだけで熟す時期の暦が大きく変わるため、農園によっては互いに見える距離で両方の収穫期を経験することもある。",
    ),
  },
  {
    e: "🎶",
    n: t("Neiva crowns its Bambuco queen|Neiva corona a su reina del bambuco|Neiva couronne sa reine du bambuco|ネイバがバンブーコの女王を戴冠する"),
    t: t(
      "The Festival Folclórico y Reinado Nacional del Bambuco fills Neiva with dance troupes performing the bambuco, a couple's dance from the upper Magdalena valley built on a shifting three-beat rhythm.|El Festival Folclórico y Reinado Nacional del Bambuco llena Neiva de comparsas que bailan el bambuco, un baile de pareja del alto valle del Magdalena construido sobre un ritmo cambiante de tres tiempos.|Le Festival Folclórico y Reinado Nacional del Bambuco emplit Neiva de troupes dansant le bambuco, une danse de couple du haut Magdalena bâtie sur un rythme changeant à trois temps.|フェスティバル・フォルクロリコ・イ・レイナド・ナシオナル・デル・バンブーコが、上流マグダレナ渓谷生まれの男女ペアの踊りバンブーコを踊る一団でネイバを埋め尽くす。三拍子の揺れるリズムが特徴である。",
    ),
    f: t(
      "Further south and east, the Amazon's rivers are typically near their yearly high water this month, letting cargo boats reach landings that stay dry the rest of the year.|Más al sur y al este, los ríos amazónicos suelen estar cerca de su nivel más alto del año este mes, lo que permite a los barcos de carga llegar a embarcaderos que el resto del año quedan secos.|Plus au sud et à l'est, les fleuves amazoniens sont généralement proches de leur plus haut niveau annuel ce mois-ci, permettant aux bateaux de fret d'atteindre des débarcadères qui restent à sec le reste de l'année.|さらに南東のアマゾンでは、この月におおむね年間最高の水位に近づき、貨物船はほかの季節には干上がっている船着き場にまで届くようになる。",
    ),
  },
  {
    e: "🇨🇴",
    n: t("Independence Day, and a rest for the spirits|Día de la Independencia, y un descanso para los espíritus|Fête de l'Indépendance, et un répit pour les esprits|独立記念日と、精霊たちの休息"),
    t: t(
      "The anniversary of the 1810 uprising against Spanish rule fills plazas nationwide with parades and yellow, blue and red flags, a public holiday marked from the Caribbean coast to the Amazon alike.|El aniversario del levantamiento de 1810 contra el dominio español llena las plazas de todo el país con desfiles y banderas amarillas, azules y rojas, un feriado que se celebra igual desde la costa Caribe hasta la Amazonía.|L'anniversaire du soulèvement de 1810 contre la domination espagnole emplit les places de tout le pays de défilés et de drapeaux jaunes, bleus et rouges, un jour férié célébré aussi bien depuis la côte Caraïbe que jusqu'en Amazonie.|1810年のスペイン支配への蜂起を記念するこの日、全国の広場は行列と黄・青・赤の旗で埋まる。カリブ海岸からアマゾンまで等しく祝われる祝日である。",
    ),
    f: t(
      "The uprising itself was triggered by a supposedly borrowed flower vase in Bogotá, a minor insult that a group of Creole conspirators used as the spark for a rebellion they had already been planning.|El levantamiento mismo se desencadenó por un florero supuestamente pedido prestado en Bogotá, un insulto menor que un grupo de conspiradores criollos usó como chispa de una rebelión que ya venían planeando.|Le soulèvement lui-même fut déclenché par un vase à fleurs prétendument emprunté à Bogotá, une insulte mineure qu'un groupe de conspirateurs créoles utilisa comme étincelle d'une rébellion qu'ils préparaient déjà.|この蜂起そのものは、ボゴタで起きた花瓶の貸し借りをめぐるちょっとした侮辱がきっかけとされる。すでに反乱を計画していたクリオージョの一団が、それを口実に使った。",
    ),
  },
  {
    e: "💐",
    n: t("Silleteros carry Medellín's flower parade|Los silleteros cargan el desfile de flores de Medellín|Les silleteros portent le défilé de fleurs de Medellín|シジェテロスがメデジンの花のパレードを担う"),
    t: t(
      "The Feria de las Flores fills the first week of August with the desfile de silleteros, in which growers from the hills above Medellín carry wooden frames stacked with hundreds of flowers on their backs down into the city.|La Feria de las Flores llena la primera semana de agosto con el desfile de silleteros, en el que agricultores de las laderas sobre Medellín bajan a la ciudad cargando en la espalda armazones de madera cubiertos de cientos de flores.|La Feria de las Flores emplit la première semaine d'août du défilé des silleteros, où des cultivateurs des collines dominant Medellín descendent en ville en portant sur le dos des cadres de bois chargés de centaines de fleurs.|花祭りは8月最初の週を「シジェテロスの行列」で満たす。メデジンを見下ろす丘の栽培農家が、何百もの花を積んだ木枠を背負って町へ下りてくる。",
    ),
    f: t(
      "The silleta frame descends from a colonial-era wooden chair once used to carry people up the same steep slopes, repurposed by flower growers once that kind of portage work faded.|El armazón de la silleta desciende de una silla de madera de época colonial que antes se usaba para cargar personas por esas mismas laderas empinadas, reutilizada por los floricultores cuando ese tipo de trabajo de carga fue desapareciendo.|Le cadre de la silleta descend d'une chaise en bois d'époque coloniale autrefois utilisée pour porter des personnes sur ces mêmes pentes raides, réemployée par les floriculteurs une fois ce type de portage tombé en désuétude.|シジェタと呼ばれるこの木枠は、かつて同じ急斜面で人を担いで運ぶのに使われた植民地時代の木の椅子に由来する。そうした担ぎ運びの仕事が廃れたのち、花の栽培農家がこれを転用した。",
    ),
  },
  {
    e: "🎉",
    n: t("Quibdó opens the Fiestas de San Pacho|Quibdó abre las Fiestas de San Pacho|Quibdó ouvre les Fiestas de San Pacho|キブドがサン・パチョ祭を開く"),
    t: t(
      "From late September into October, Quibdó's neighbourhoods each build their own float and dance troupe for the feast of Saint Francis of Assisi, one of Colombia's oldest continuously held popular festivals.|De finales de septiembre a octubre, cada barrio de Quibdó arma su propia carroza y comparsa para la fiesta de San Francisco de Asís, una de las festividades populares más antiguas de Colombia que se celebran sin interrupción.|De fin septembre à octobre, chaque quartier de Quibdó monte son propre char et sa troupe de danse pour la fête de saint François d'Assise, l'une des fêtes populaires les plus anciennes de Colombie célébrées sans interruption.|9月末から10月にかけて、キブドの各地区はそれぞれ独自の山車と踊りの一団を仕立て、アッシジの聖フランチェスコの祝日を祝う。コロンビアで途切れず続く民衆の祭りとしては最古級の一つである。",
    ),
    f: t(
      "Franciscan missionaries introduced the feast in the eighteenth century, but its music, dance and neighbourhood rivalry today draw far more on Chocó's Afro-Colombian traditions than on anything Spanish.|Los misioneros franciscanos introdujeron la fiesta en el siglo XVIII, pero su música, baile y rivalidad entre barrios hoy deben mucho más a las tradiciones afrocolombianas del Chocó que a nada español.|Des missionnaires franciscains introduisirent la fête au XVIIIe siècle, mais sa musique, sa danse et sa rivalité entre quartiers doivent aujourd'hui bien davantage aux traditions afro-colombiennes du Chocó qu'à quoi que ce soit d'espagnol.|フランシスコ会の宣教師がこの祝祭を18世紀に持ち込んだが、その音楽や踊り、地区どうしの競い合いは、いまではスペイン由来のものよりずっと多くをチョコのアフロコロンビアの伝統に負っている。",
    ),
  },
  {
    e: "☕",
    n: t("The coffee axis brings in its main harvest|El eje cafetero recoge su cosecha principal|L'axe caféier rentre sa récolte principale|コーヒー地帯が本収穫を迎える"),
    t: t(
      "The larger of the coffee belt's two annual harvests runs roughly from October into December, and picking crews move from farm to farm as the ripest cherries reach the valleys first and the highest slopes last.|La mayor de las dos cosechas anuales del eje cafetero se extiende aproximadamente de octubre a diciembre, y las cuadrillas de recolección se mueven de finca en finca a medida que los granos más maduros llegan primero a los valles y por último a las laderas más altas.|La plus grande des deux récoltes annuelles de l'axe caféier s'étend environ d'octobre à décembre, et les équipes de cueillette se déplacent de ferme en ferme, les cerises les plus mûres arrivant d'abord dans les vallées et en dernier sur les pentes les plus hautes.|コーヒー地帯の年二回の収穫のうち大きいほうは、おおむね10月から12月にかけて続く。摘み手の一団は農園から農園へと移り、熟した実はまず谷から、最後に最も高い斜面から届く。",
    ),
    f: t(
      "Colombia's mild, washed arabica depends on hand-picking only the ripe red cherries one at a time, a labour cost that mechanised harvesting on flatter ground elsewhere in the world simply avoids.|El suave arábica lavado de Colombia depende de recoger a mano solo las cerezas rojas maduras, una por una, un costo laboral que la cosecha mecanizada en terrenos más planos, en otras partes del mundo, simplemente evita.|L'arabica lavé et doux de Colombie dépend de la cueillette à la main des seules cerises rouges mûres, une par une, un coût de main-d'œuvre que la récolte mécanisée sur des terrains plus plats ailleurs dans le monde évite tout simplement.|コロンビアのまろやかなウォッシュト・アラビカ種は、熟した赤い実だけを一つずつ手摘みすることに支えられている。世界の他の平坦な産地での機械収穫なら要らない人手の費用である。",
    ),
  },
  {
    e: "👑",
    n: t("Cartagena marks its own independence day|Cartagena celebra su propio día de la independencia|Cartagena célèbre son propre jour de l'indépendance|カルタヘナが自らの独立記念日を祝う"),
    t: t(
      "Cartagena declared independence from Spain separately on 11 November 1811, nearly a year after Bogotá's own uprising, and the city marks the date with its own week of parades distinct from the national July holiday.|Cartagena declaró su independencia de España por separado el 11 de noviembre de 1811, casi un año después del levantamiento de Bogotá, y la ciudad conmemora la fecha con su propia semana de desfiles, distinta del feriado nacional de julio.|Cartagena déclara son indépendance de l'Espagne séparément le 11 novembre 1811, près d'un an après le soulèvement de Bogotá, et la ville marque la date par sa propre semaine de défilés, distincte du jour férié national de juillet.|カルタヘナは1811年11月11日、ボゴタの蜂起からほぼ1年後に、独自にスペインからの独立を宣言した。この町は7月の全国的な祝日とは別に、独自の一週間のパレードでこの日を祝う。",
    ),
    f: t(
      "The same week traditionally hosts the national beauty pageant, the Reinado Nacional de Belleza, which has crowned a queen in Cartagena nearly every November since 1934.|La misma semana acoge tradicionalmente el Reinado Nacional de Belleza, que ha coronado a una reina en Cartagena casi cada noviembre desde 1934.|La même semaine accueille traditionnellement le Reinado Nacional de Belleza, qui couronne une reine à Cartagena presque chaque mois de novembre depuis 1934.|同じ週にはこの国の全国美人コンテスト、レイナド・ナシオナル・デ・ベジェサが伝統的に開かれ、1934年以来ほぼ毎年11月、カルタヘナで新しい女王を戴冠させてきた。",
    ),
  },
  {
    e: "🎄",
    n: t("Novenas and lights carry the country to Christmas|Novenas y luces llevan al país hacia la Navidad|Neuvaines et illuminations mènent le pays vers Noël|ノベナと灯りがクリスマスへ国を運ぶ"),
    t: t(
      "From 16 December, families gather nightly for the novena, nine evenings of prayer, carols and sweets leading up to Christmas Eve, while Medellín strings its riverside parks with what has grown into one of Latin America's largest public light displays.|Desde el 16 de diciembre, las familias se reúnen cada noche para la novena, nueve veladas de oraciones, villancicos y dulces que llevan hasta la Nochebuena, mientras Medellín ilumina sus parques junto al río con lo que se ha convertido en uno de los mayores alumbrados públicos de Latinoamérica.|Dès le 16 décembre, les familles se réunissent chaque soir pour la novena, neuf veillées de prières, de chants et de douceurs menant à la veille de Noël, tandis que Medellín pare ses parcs au bord de la rivière de ce qui est devenu l'un des plus grands alumbrados publics d'Amérique latine.|12月16日から、家族は毎晩集まって「ノベナ」を行う。クリスマスイブまで続く9夜にわたる祈りと聖歌、菓子の集いである。一方メデジンは川沿いの公園を、ラテンアメリカ最大級に成長した公共のイルミネーション「アルンブラード」で彩る。",
    ),
    f: t(
      "Medellín's display began modestly in the 1950s with a handful of lightbulbs strung along the Medellín River and now draws visitors from across the country each December.|El alumbrado de Medellín empezó modestamente en los años cincuenta con unas cuantas bombillas junto al río Medellín y hoy atrae visitantes de todo el país cada diciembre.|L'alumbrado de Medellín débuta modestement dans les années 1950 avec quelques ampoules le long de la rivière Medellín et attire aujourd'hui des visiteurs de tout le pays chaque décembre.|メデジンのイルミネーションは1950年代、メデジン川沿いに数個の電球を吊るす程度のささやかな始まりだったが、いまでは毎年12月、全国から訪れる客を集めている。",
    ),
  },
  {
    e: "🎨",
    n: t("Pasto paints itself for the Blacks and Whites Carnival|Pasto se pinta para el Carnaval de Negros y Blancos|Pasto se peint pour le Carnaval de Negros y Blancos|パストが黒人と白人の祭りに染まる"),
    t: t(
      "From 2 to 7 January, Pasto's Carnaval de Negros y Blancos moves through a set sequence of days — painting faces black, then dusting them white with talcum — a tradition recognised by UNESCO as intangible cultural heritage in 2009.|Del 2 al 7 de enero, el Carnaval de Negros y Blancos de Pasto avanza por una secuencia fija de días —pintando la cara de negro y luego empolvándola de blanco con talco—, una tradición reconocida por la UNESCO como patrimonio cultural inmaterial en 2009.|Du 2 au 7 janvier, le Carnaval de Negros y Blancos de Pasto suit une séquence de jours bien établie — peindre le visage en noir, puis le poudrer de blanc au talc —, une tradition reconnue par l'UNESCO comme patrimoine culturel immatériel en 2009.|1月2日から7日にかけて、パストのカルナバル・デ・ネグロス・イ・ブランコスは決まった日程で進む。顔を黒く塗る日、続いて白いタルカムパウダーをまぶす日がある。この伝統は2009年にユネスコの無形文化遺産に認定された。",
    ),
    f: t(
      "The festival is thought to trace back to a colonial-era day off granted to enslaved people, though its meaning has shifted over two centuries into a citywide celebration open to everyone.|Se cree que la fiesta se remonta a un día libre de época colonial concedido a personas esclavizadas, aunque su significado ha cambiado a lo largo de dos siglos hasta convertirse en una celebración de toda la ciudad abierta a todos.|On pense que la fête remonte à un jour de congé d'époque coloniale accordé aux personnes réduites en esclavage, bien que son sens ait évolué sur deux siècles pour devenir une célébration ouverte à toute la ville.|この祭りは、植民地時代に奴隷とされた人々に与えられた休日に由来すると考えられているが、2世紀のあいだにその意味合いは移り変わり、いまでは誰もが参加できる街全体の祝祭になっている。",
    ),
  },
  {
    e: "🐄",
    n: t("The dry season lets llaneros round up the herds|La temporada seca deja a los llaneros reunir el ganado|La saison sèche permet aux llaneros de rassembler les troupeaux|乾季がジャネロに牛の集めを許す"),
    t: t(
      "With the rains gone and the ground firm underfoot, cattle ranches across the Llanos hold their annual round-up and branding, moving herds on horseback across open grassland that floods too deeply to cross for much of the rest of the year.|Con las lluvias idas y el suelo firme bajo los pies, las haciendas ganaderas de los Llanos celebran su reunión y marcaje anual, moviendo el ganado a caballo por una llanura abierta que se inunda demasiado el resto del año como para cruzarla.|Les pluies parties et le sol ferme sous les pieds, les élevages des Llanos organisent leur rassemblement et leur marquage annuels, déplaçant les troupeaux à cheval sur une plaine ouverte que les crues rendent trop profonde à traverser le reste de l'année.|雨が去り、地面が固く締まったこの時期、リャノス各地の牧場は年に一度の牛の集めと焼き印付けを行う。一年の他の季節にはとても渡れないほど水につかる開けた草原を、騎馬で牛の群れを追って移動する。",
    ),
    f: t(
      "The coleo, in which a rider on horseback grabs a running steer by the tail and flips it, grew directly out of this working round-up and is now also a competitive sport in its own right.|El coleo, en el que un jinete agarra por la cola a un toro en carrera y lo voltea, nació directamente de esta faena de reunión de ganado y hoy es también un deporte competitivo por derecho propio.|Le coleo, où un cavalier attrape par la queue un bœuf en pleine course pour le faire chuter, est né directement de ce travail de rassemblement et constitue aujourd'hui aussi un sport à part entière.|走る牛の尾をつかんで転がす「コレオ」は、この牛集めの作業仕事からそのまま生まれたもので、いまでは独立した競技スポーツにもなっている。",
    ),
  },
  {
    e: "🌦️",
    n: t("The Andes' dry months give way to the first rains|Los meses secos de los Andes ceden a las primeras lluvias|Les mois secs des Andes cèdent aux premières pluies|アンデスの乾いた月が最初の雨に道を譲る"),
    t: t(
      "Clear skies over the highlands begin breaking up as the wet season returns, and Catholic parishes across the Andes start preparing the processions and painted floats that will fill Holy Week a few weeks later.|Los cielos despejados sobre la sierra empiezan a resquebrajarse con el regreso de la temporada de lluvias, y las parroquias católicas de los Andes empiezan a preparar las procesiones y andas que llenarán la Semana Santa unas semanas después.|Le ciel dégagé sur les hauts plateaux commence à se voiler avec le retour de la saison des pluies, et les paroisses catholiques des Andes entament la préparation des processions et des chars qui empliront la Semaine sainte quelques semaines plus tard.|高地に広がっていた晴天は雨季の戻りとともに崩れ始め、アンデス各地のカトリック教区は、数週間後の聖週間を満たすことになる行列と飾り台座の準備を始める。",
    ),
    f: t(
      "River levels on the Magdalena, at their lowest around this time of year, made this historically the hardest month for steamboats to keep to any kind of schedule.|Los niveles del río Magdalena, en su punto más bajo por esta época del año, hicieron de este históricamente el mes más difícil para que los vapores mantuvieran algún tipo de horario.|Les niveaux du Magdalena, au plus bas à cette période de l'année, faisaient historiquement de ce mois le plus difficile pour les bateaux à vapeur qui tentaient de tenir le moindre horaire.|マグダレナ川の水位がこの時期にいちばん下がることから、この月は歴史的に、蒸気船がどんな時刻表であれ守るのが最も難しい月だった。",
    ),
  },
];
