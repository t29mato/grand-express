/**
 * アジア大陸盤面の国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 大陸盤面なので、地方(lev/arb/cas/sib/eas/sas/sea)まるごとの好不況で
 * 差をつける(効果の数値は `src/infrastructure/content/season-and-doom-rules.ts`
 * 側に置く)。厄災の神は、特定の一国の民話を「アジア全体の伝承」と偽らないよう、
 * 大陸を走る鉄道そのものにまつわる幽霊列車の噂という形にした(世界一周盤面の
 * さまよえるオランダ人と同じ扱い方)。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const ASIA_META = {
  id: "asia",
  name: t("Asia|Asia|L'Asie|アジア"),
  blurb: t(
    "A continent where every railway ends at a gauge, a border, or a strait|Un continente donde toda vía férrea acaba en un ancho distinto, una frontera o un estrecho|Un continent où chaque voie ferrée finit sur un écartement, une frontière ou un détroit|どの鉄路も軌間か国境か海峡で終わる大陸",
  ),
  cur: { pre: "$", post: "", mul: 100 },
  start: "istanbul",
  // 大陸を実際に横断した歴史上の旅人たちの名から。
  cpuNames: ["Marco Polo", "Ibn Battuta", "Xuanzang 玄奘", "Zheng He 鄭和"],
  // 隊商路の朱、絹の金、草原の緑、湾岸の青、砂漠の砂色。
  stripe: ["#c8102e", "#f4c430", "#8ea25a", "#1a4a8f", "#d9c17f"],
};

/** 7地方。国境をまたぐ話を中心に据えた大陸盤面のための区分。 */
export const ASIA_REGIONS = {
  lev: t("The Levant & the Caucasus|El Levante y el Cáucaso|Le Levant et le Caucase|レヴァント・コーカサス"),
  arb: t("Arabia & the Gulf|Arabia y el Golfo|L'Arabie et le Golfe|アラビア半島・湾岸"),
  cas: t("Central Asia|Asia Central|L'Asie centrale|中央アジア"),
  sib: t("Siberia, Mongolia & the Far East|Siberia, Mongolia y el Lejano Oriente|La Sibérie, la Mongolie et l'Extrême-Orient|シベリア・モンゴル・極東"),
  eas: t("East Asia|Asia Oriental|L'Asie de l'Est|東アジア"),
  sas: t("South Asia|Asia del Sur|L'Asie du Sud|南アジア"),
  sea: t("Southeast Asia|Sudeste Asiático|L'Asie du Sud-Est|東南アジア"),
};

/**
 * アイテム9件。効果の種類は他の盤面と同じ(対応表は
 * `src/infrastructure/content/item-effect-rules.ts`)。土地の物ではなく、
 * 大陸を横断する旅そのものにまつわる品にした。
 */
export const ASIA_ITEMS = {
  relay: {
    e: "🐎",
    price: 420,
    kind: "pre",
    n: t("A Yam Relay Horse|Un caballo del relevo Yam|Un cheval du relais Yam|站赤(ジャム)の乗継馬"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "The Mongol Empire's yam system strung relay stations roughly a day's ride apart across the whole breadth of Asia, so a rider with the right tablet of authority could change horses at each one and cover in a week what a normal traveller took two months to do. Marco Polo wrote that a courier riding through the night, torch in hand, could make 400km between sunsets.|El sistema yam del Imperio mongol tendía estaciones de relevo separadas por más o menos un día de cabalgada por todo el ancho de Asia, así que un jinete con la tablilla de autoridad correcta podía cambiar de caballo en cada una y cubrir en una semana lo que a un viajero normal le llevaba dos meses. Marco Polo escribió que un correo que cabalgaba de noche, antorcha en mano, podía hacer 400 km entre puestas de sol.|Le système yam de l'Empire mongol disposait des relais espacés d'environ une journée de cheval sur toute la largeur de l'Asie, si bien qu'un cavalier muni de la bonne tablette d'autorité pouvait changer de monture à chacun et couvrir en une semaine ce qu'un voyageur ordinaire mettait deux mois à parcourir. Marco Polo écrivit qu'un courrier chevauchant de nuit, torche en main, pouvait faire 400 km entre deux couchers de soleil.|モンゴル帝国の站赤(ジャム)は、アジアの幅いっぱいに、ほぼ一日の乗り継ぎ距離ごとに中継駅を張り巡らせた。正しい牌符を持つ使者はそのたびに馬を替え、普通の旅人が二か月かける道のりを一週間で駆け抜けられた。マルコ・ポーロは、松明を手に夜通し駆ける急使が日没から日没までに400kmを進んだと書き残している。",
    ),
  },
  magiccarpet: {
    e: "🧞",
    price: 280,
    kind: "move",
    n: t("A Flying Carpet|Una alfombra voladora|Un tapis volant|空飛ぶ絨毯",
    ),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "The flying carpet is a storyteller's device, not a claim about any real rug — it appears in the Thousand and One Nights collected across the Arab world and Persia, and in Central and South Asian tales quite separately, each version making its own case for whose carpet flew first. No two tellings agree on whose it originally was.|La alfombra voladora es un recurso de los cuentacuentos, no una afirmación sobre ninguna alfombra real: aparece en Las mil y una noches recopiladas en el mundo árabe y en Persia, y en cuentos de Asia Central y del Sur por separado, cada versión defendiendo que su alfombra voló primero. Ninguna coincide en de quién era originalmente.|Le tapis volant est un ressort de conteur, non une affirmation sur un tapis réel : il figure dans les Mille et Une Nuits recueillies dans le monde arabe et en Perse, et dans des contes distincts d'Asie centrale et du Sud, chaque version revendiquant que son tapis vola le premier. Aucune ne s'accorde sur son propriétaire d'origine.|空飛ぶ絨毯はあくまで語り手の仕掛けであり、実在の絨毯についての話ではない。アラブ世界やペルシアで編まれた『千夜一夜物語』にも、中央アジアや南アジアの別系統の説話にも登場するが、どの話も「最初に飛んだのは自分の絨毯だ」と言い張る。もともと誰のものだったかは、どの語りも一致しない。",
    ),
  },
  bogie: {
    e: "🛞",
    price: 380,
    kind: "pre",
    n: t("A Bogie-Exchange Chit|Un vale de cambio de bogies|Un bon d'échange de bogies|台車履き替えの引換票"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "At a gauge-break station, a whole train is lifted car by car and set down on a different set of wheels rather than have passengers change trains, a job that can take longer than the ride on either side of it. This chit is the paperwork proving the swap was paid for and logged.|En una estación de cambio de ancho, todo el tren se iza vagón a vagón y se posa sobre otro juego de ruedas en vez de hacer que los pasajeros cambien de tren, una tarea que puede tardar más que el trayecto a cada lado. Este vale es el papeleo que prueba que el cambio se pagó y se registró.|Dans une gare de changement d'écartement, tout le train est soulevé wagon par wagon et reposé sur un autre jeu de roues plutôt que de faire changer les passagers de train, une opération qui peut durer plus longtemps que le trajet de chaque côté. Ce bon est la paperasse prouvant que l'échange fut payé et consigné.|軌間の変わる駅では、乗客を乗り換えさせる代わりに列車をまるごと一両ずつ持ち上げ、別の軌間の車輪に載せ替える。その作業には前後の乗車時間より長くかかることもある。この引換票は、その履き替えの代金が払われ記録済みであることを示す書類である。",
    ),
  },
  caravanserairest: {
    e: "🏺",
    price: 300,
    kind: "passive",
    n: t("A Night at the Caravanserai|Una noche en el caravasar|Une nuit au caravansérail|隊商宿の一夜"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Along the trade routes, caravanserais offered any traveller three free nights of lodging, water and stabling for the animals regardless of who they were or what they carried, on the understanding that the next one down the road would return the favour to somebody else. Many still stand, their courtyards now used for markets rather than camels.|A lo largo de las rutas comerciales, los caravasares ofrecían a cualquier viajero tres noches gratis de alojamiento, agua y establo para los animales sin importar quién fuera, con el entendido de que el siguiente en el camino devolvería el favor a otro. Muchos siguen en pie, sus patios usados hoy para mercados y no para camellos.|Le long des routes commerciales, les caravansérails offraient à tout voyageur trois nuits gratuites de logement, d'eau et d'écurie pour les bêtes, quel qu'il fût, à charge pour le suivant sur la route de rendre la pareille à un autre. Beaucoup sont encore debout, leurs cours servant aujourd'hui de marchés plutôt que d'écuries à chameaux.|交易路沿いの隊商宿は、相手が誰であろうと荷が何であろうと、三晩の宿と水と家畜のための厩を無料で提供した。次に道を通る者が別の誰かに同じ恩を返す、という了解のもとである。いまも多く現存し、中庭はラクダではなく市場として使われている。",
    ),
  },
  silkbolt: {
    e: "🧵",
    price: 260,
    kind: "pre",
    n: t("A Bolt of Raw Silk|Un rollo de seda cruda|Un rouleau de soie brute|生糸の反物"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "For long stretches of the trade routes, bolts of silk were used as currency in their own right, weighed and measured to pay soldiers' wages and settle debts between merchants who did not share a coinage. It moved value across a continent that otherwise had no single money everyone agreed on.|Durante largos tramos de las rutas comerciales, los rollos de seda se usaron como moneda por derecho propio, pesados y medidos para pagar el sueldo de los soldados y saldar deudas entre mercaderes que no compartían moneda. Así se transfería valor por un continente que, si no, no tenía una moneda única aceptada por todos.|Sur de longs tronçons des routes commerciales, les rouleaux de soie servaient de monnaie à part entière, pesés et mesurés pour payer la solde des soldats et régler les dettes entre marchands sans monnaie commune. Ils faisaient circuler la valeur sur un continent qui, sinon, n'avait aucune monnaie unique acceptée de tous.|交易路の長い区間では、生糸の反物そのものが通貨として使われた。重さと長さを量って兵の給金を払い、通貨を共有しない商人どうしの借りを清算した。共通の貨幣を持たない大陸の上で、価値を運ぶ役目を果たしていた。",
    ),
  },
  waybill: {
    e: "📜",
    price: 140,
    kind: "passive",
    n: t("A Merchant's Old Waybill|Una vieja hoja de ruta de mercader|Un vieux bordereau de marchand|商人の古い送り状"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "A waybill listed every stop, toll and change of guide a shipment would need before it left, copied from whoever had made the same crossing the season before rather than worked out fresh each time. Merchants who deviated from a proven waybill without good reason were the ones who lost caravans.|Una hoja de ruta enumeraba cada parada, peaje y cambio de guía que necesitaría un cargamento antes de salir, copiada de quien hubiera hecho el mismo cruce la temporada anterior en vez de calcularse de nuevo cada vez. Los mercaderes que se desviaban de una hoja de ruta probada sin buen motivo eran los que perdían caravanas.|Un bordereau énumérait chaque halte, péage et changement de guide qu'un chargement nécessiterait avant de partir, recopié sur celui qui avait fait la même traversée la saison précédente plutôt que recalculé à chaque fois. Les marchands qui s'écartaient sans bonne raison d'un bordereau éprouvé étaient ceux qui perdaient leurs caravanes.|送り状には、出発前にその荷が通るはずの宿場・関所・案内人の交代がすべて書き記されていた。毎回ゼロから考えるのではなく、前の季節に同じ道を越えた誰かの記録を写したものである。理由もなく実績ある送り状から外れた商人こそ、隊商を失う羽目になった。",
    ),
  },
  teabrick: {
    e: "🧱",
    price: 300,
    kind: "pre",
    n: t("A Brick of Pressed Tea|Un ladrillo de té prensado|Une brique de thé pressé|磚茶(たんちゃ)",
    ),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Tea leaves steamed and pressed into bricks travelled better than loose leaf on the long routes into Tibet and the steppe, and the bricks were sturdy enough to be broken into pieces and used as small change, valued by weight rather than by any stamp on them. A full mule-load could be exchanged directly for a horse.|Las hojas de té cocidas al vapor y prensadas en ladrillos viajaban mejor que el té suelto en las largas rutas hacia el Tíbet y la estepa, y los ladrillos eran lo bastante recios como para partirlos en trozos y usarlos de cambio menudo, valorados por peso y no por ningún sello. Una carga entera de mula podía cambiarse directamente por un caballo.|Les feuilles de thé étuvées et pressées en briques voyageaient mieux que le thé en vrac sur les longues routes vers le Tibet et la steppe, et les briques étaient assez solides pour être brisées en morceaux et servir de petite monnaie, évaluées au poids plutôt que sur un quelconque sceau. Une pleine charge de mulet pouvait s'échanger directement contre un cheval.|蒸して固めた磚茶は、チベットや草原へ向かう長旅では茶葉のままより持ち運びやすく、砕いて小銭代わりに使えるほど頑丈で、刻印ではなく重さで値打ちが決まった。ラバ一頭ぶんの荷は、そのまま馬一頭と交換できたという。",
    ),
  },
  sleeperticket: {
    e: "🛌",
    price: 640,
    kind: "pre",
    n: t("A Six-Night Sleeper Ticket|Un billete de coche cama de seis noches|Un billet de wagon-lit pour six nuits|六泊分の寝台切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The direct Beijing–Moscow service, one of the longest scheduled train journeys anywhere, spends six nights aboard covering roughly 7,600km, and a sleeper ticket for the whole run books a single berth for the entire crossing rather than a seat that changes with the scenery.|El servicio directo Pekín-Moscú, uno de los trayectos en tren programados más largos que existen, pasa seis noches a bordo cubriendo unos 7.600 km, y un billete de coche cama para todo el trayecto reserva una sola litera para el cruce entero, no un asiento que cambia con el paisaje.|Le service direct Pékin-Moscou, l'un des plus longs trajets ferroviaires programmés qui soient, passe six nuits à bord pour couvrir quelque 7 600 km, et un billet de wagon-lit pour tout le parcours réserve une seule couchette pour toute la traversée plutôt qu'un siège qui change avec le paysage.|北京―モスクワ直通列車は、世界でも屈指の長さを誇る定期旅客列車で、およそ7,600kmを6夜かけて走る。この寝台切符は、車窓の風景が変わるたびに座席も変わる普通の切符ではなく、その全区間ぶん一つの寝台をまるごと予約するものである。",
    ),
  },
  firman: {
    e: "📯",
    price: 480,
    kind: "pre",
    n: t("A Khan's Safe-Conduct Firman|Un firmán de salvoconducto del kan|Un firman de sauf-conduit du khan|可汗の通行免状"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "A firman bearing a ruler's seal guaranteed safe passage, fresh horses and toll-free crossing at every checkpoint under that ruler's writ, and merchants who lost theirs sometimes turned back entire caravans rather than risk the road unpapered. A copy this well preserved would draw more from a collector than the goods it once protected.|Un firmán con el sello de un gobernante garantizaba paso seguro, caballos frescos y cruce libre de peaje en cada puesto bajo su autoridad, y los mercaderes que perdían el suyo a veces hacían dar media vuelta a caravanas enteras antes que arriesgarse sin papeles. Una copia tan bien conservada valdría hoy más para un coleccionista que la mercancía que una vez protegió.|Un firman scellé par un souverain garantissait passage sûr, chevaux frais et franchise de péage à chaque poste relevant de son autorité, et les marchands qui perdaient le leur faisaient parfois rebrousser chemin à des caravanes entières plutôt que de risquer la route sans papiers. Un exemplaire aussi bien conservé vaudrait aujourd'hui plus cher à un collectionneur que les marchandises qu'il protégeait jadis.|支配者の印を帯びた通行免状は、その版図のどの関所でも安全な通行と替え馬、関税免除を保証した。これを失った商人は、書類の無いまま道を行く危険を冒すより、隊商をまるごと引き返させることさえあった。これほど良い状態で残った一枚は、かつて守っていた荷そのものより、いまでは収集家にとって値打ちが高い。",
    ),
  },
};

/**
 * 厄災の神。特定の一国の民話を「大陸全体の伝承」として語らないよう、
 * 大陸を走る鉄道そのものにまつわる噂という形にした
 * (世界一周盤面のさまよえるオランダ人と同じ扱い)。
 */
export const ASIA_SPIRIT = {
  e: "🚂",
  n: t("The Unscheduled Train|El tren sin horario|Le train hors horaire|時刻表に無い列車"),
  big: t("The Unscheduled Train's Long Delay|El gran retraso del tren sin horario|Le grand retard du train hors horaire|時刻表に無い列車の大遅延"),
  ward: "caravanserairest",
  arrive: t(
    "<b>🚂 A headlamp shows on the line behind you, though nothing is due.</b> Railway workers along half the continent tell some version of the same story: a locomotive that appears on no timetable, running a route that was cancelled or never finished, always a few minutes behind the last real train. It now keeps pace with <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🚂 Detrás, en la vía, se ve un faro, aunque no hay nada previsto.</b> Los ferroviarios de medio continente cuentan alguna versión de la misma historia: una locomotora que no figura en ningún horario, que recorre una ruta cancelada o nunca terminada, siempre unos minutos por detrás del último tren real. Ahora marcha a la par de <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🚂 Un phare apparaît sur la voie, derrière, alors que rien n'est prévu.</b> Les cheminots de la moitié du continent racontent une version ou une autre de la même histoire : une locomotive qui ne figure sur aucun horaire, parcourant une ligne annulée ou jamais achevée, toujours à quelques minutes derrière le dernier vrai train. Il roule désormais au même rythme que <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🚂 何も来るはずのない線路の背後に、前照灯が見えた。</b> 大陸の半分の鉄道員たちが、似たような話を語り継いでいる。時刻表のどこにも載っていない機関車が、廃止されたか完成しなかった路線を、いつも本物の最終列車の数分後ろを走っているという。いまは目的地から最も遠い <b>{0}</b> と歩調を合わせ、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🚂 <b>The unscheduled train</b> switches track and now runs alongside <b>{0}</b>, farthest from {1}.|🚂 <b>El tren sin horario</b> cambia de vía y ahora circula junto a <b>{0}</b>, el más lejano de {1}.|🚂 <b>Le train hors horaire</b> change de voie et roule désormais aux côtés de <b>{0}</b>, le plus loin de {1}.|🚂 <b>時刻表に無い列車</b> は分岐を切り替え、{1} から最も遠い <b>{0}</b> の隣を走っている。",
  ),
  wake: t(
    "<b>{0}</b> has travelled four turns beside the train and it has never once pulled ahead or fallen back. Its whistle sounds a long, flat note that does not match any signal in the rulebook — <b>the Unscheduled Train's Long Delay</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al tren y este no se ha adelantado ni atrasado ni una vez. Su silbato suena una nota larga y plana que no coincide con ninguna señal del reglamento: empieza <b>el gran retraso del tren sin horario</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> voyage depuis quatre tours à côté du train, qui n'a jamais pris ni de l'avance ni du retard. Son sifflet sonne une longue note plate qui ne correspond à aucun signal du règlement : <b>le grand retard du train hors horaire</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもその列車と並んで走っていながら、一度も前に出ることも遅れることもなかった。汽笛は規則書のどの合図にも当てはまらない、長く平板な音を鳴らす。<b>時刻表に無い列車の大遅延</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> \"phantom train\" reports are a documented type of railway folklore on several continents, usually traced by researchers to real trains diverted onto disused sidings, or to the sound and light of an ordinary train reaching a listener across terrain that bends both in strange ways.|<b>Tras la historia:</b> los avistamientos de «trenes fantasma» son un tipo documentado de folclore ferroviario en varios continentes, que los investigadores suelen rastrear hasta trenes reales desviados a vías muertas en desuso, o al sonido y la luz de un tren normal llegando a un oyente a través de un terreno que dobla ambos de forma extraña.|<b>Derrière l'histoire :</b> les signalements de « trains fantômes » forment un type documenté de folklore ferroviaire sur plusieurs continents, que les chercheurs rattachent le plus souvent à de vrais trains déroutés sur des voies de garage désaffectées, ou au son et à la lumière d'un train ordinaire parvenant à un témoin à travers un terrain qui infléchit étrangement les deux.|<b>物語の背景:</b> 「幽霊列車」の目撃談は、いくつもの大陸で記録されている鉄道民話の一類型である。研究者が調べると、たいていは廃止された側線に迂回させられた実在の列車か、地形のせいで音や光が奇妙に曲げられて届いた普通の列車の音と光だったことが分かるという。",
  ),
  pleased: t(
    "A window slides down as it passes, and something is tossed clear before the train pulls away — a coin, still warm. <b>{0}</b> gains <span class='money'>+{1}</span>.|Una ventanilla baja al pasar y algo se lanza fuera antes de que el tren se aleje: una moneda, todavía caliente. <b>{0}</b> gana <span class='money'>+{1}</span>.|Une vitre s'abaisse à son passage, et quelque chose est jeté avant que le train ne s'éloigne — une pièce, encore chaude. <b>{0}</b> gagne <span class='money'>+{1}</span>.|通り過ぎざま窓が下がり、列車が去る前に何かが放られた。まだ温かい硬貨だった。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A caravanserai's gate stands open just ahead, torches lit though no keeper is in sight. The train's whistle fades instead of nearing, passing <b>{0}</b> by without slowing this turn.|Más adelante hay abierta la puerta de un caravasar, con antorchas encendidas aunque no se ve a ningún guardián. El silbato del tren se apaga en vez de acercarse, y pasa de largo junto a <b>{0}</b> sin frenar esta vuelta.|Plus loin, la porte d'un caravansérail se tient ouverte, torches allumées bien qu'aucun gardien ne soit en vue. Le sifflet du train s'estompe au lieu de se rapprocher, passant devant <b>{0}</b> sans ralentir ce tour-ci.|少し先に隊商宿の門が開いている。番人の姿は無いのに松明だけが灯っている。列車の汽笛は近づく代わりに遠ざかり、このターンは速度を落とさぬまま <b>{0}</b> の前を素通りした。",
  ),
};

/** 災難7種。大陸規模の旅につきものの遅れと厄介ごと。 */
export const ASIA_DOOM = [
  {
    id: "sandstorm",
    n: t("A sandstorm buries the desert line|Una tormenta de arena entierra la línea del desierto|Une tempête de sable ensevelit la ligne du désert|砂嵐が砂漠の線路を埋める"),
    t: t(
      "The sky turns copper-orange an hour before the wall of sand arrives, and by the time it passes, drifts as tall as the rails themselves have to be shovelled clear before anything can move again. Locals judge a storm's size by how many days the line stays shut, not by wind speed.|El cielo se vuelve de un naranja cobrizo una hora antes de que llegue el muro de arena, y para cuando pasa, hay que despejar a pala montones tan altos como los propios raíles antes de que nada pueda volver a moverse. Los lugareños miden el tamaño de una tormenta por los días que la línea sigue cerrada, no por la velocidad del viento.|Le ciel vire à l'orange cuivré une heure avant l'arrivée du mur de sable, et une fois qu'il est passé, il faut pelleter des congères aussi hautes que les rails eux-mêmes avant que rien ne puisse repartir. Les gens du coin jugent la taille d'une tempête au nombre de jours où la ligne reste fermée, pas à la vitesse du vent.|砂の壁が来る一時間前から空が銅色がかった橙に染まり、通り過ぎたあとにはレールと同じ高さの砂の吹きだまりをスコップで取り除かないと何も動かせない。地元の人は嵐の大きさを風速ではなく、線路が何日閉じたかで測る。",
    ),
    regions: ["arb", "cas"],
  },
  {
    id: "monsoonwash",
    n: t("The monsoon washes out the embankment|El monzón se lleva el terraplén|La mousson emporte le remblai|モンスーンが路盤を洗い流す"),
    t: t(
      "A week of monsoon rain turned the usual trickle beside the track into a river that undercut the embankment overnight, and the morning train finds ballast and sleepers hanging in open air where solid ground used to be. Repair crews rebuild the same stretch most years, a little further back each time.|Una semana de lluvias monzónicas convirtió el hilo de agua de siempre junto a la vía en un río que socavó el terraplén de la noche a la mañana, y el tren de la mañana se encuentra con balasto y traviesas colgando en el aire donde antes había tierra firme. Las cuadrillas reconstruyen el mismo tramo casi todos los años, cada vez un poco más atrás.|Une semaine de pluies de mousson a transformé le mince filet d'eau longeant la voie en une rivière qui a sapé le remblai en une nuit, et le train du matin trouve ballast et traverses suspendus dans le vide là où il y avait naguère de la terre ferme. Les équipes reconstruisent le même tronçon presque chaque année, un peu plus en retrait à chaque fois.|一週間続いたモンスーンの雨が、線路脇のいつもの細い流れを一夜で土手をえぐる川に変え、朝の列車は固い地面があったはずの場所でバラストと枕木が宙にぶら下がっているのを見つけた。復旧班はほとんど毎年同じ区間を、そのたびに少し内側へ下げて造り直している。",
    ),
    regions: ["sas", "sea"],
  },
  {
    id: "avalanche",
    n: t("An avalanche closes the pass|Una avalancha cierra el puerto|Une avalanche ferme le col|雪崩で峠が閉ざされる",
    ),
    t: t(
      "A slab of snow the size of a village let go above the line sometime in the night, and by dawn the track is buried under a debris field that will take heavy machinery, not shovels, to clear. Travellers already on the mountain are told to wait it out at the nearest station rather than push on.|Una placa de nieve del tamaño de un pueblo se soltó sobre la vía en algún momento de la noche, y al amanecer la vía está sepultada bajo un campo de escombros que necesitará maquinaria pesada, no palas, para despejarse. A los viajeros que ya están en la montaña se les dice que esperen en la estación más cercana en vez de seguir.|Une plaque de neige de la taille d'un village s'est détachée au-dessus de la ligne dans la nuit, et à l'aube la voie est ensevelie sous un champ de débris qu'il faudra des engins lourds, et non des pelles, pour dégager. Les voyageurs déjà sur la montagne sont priés d'attendre à la gare la plus proche plutôt que de poursuivre.|夜のうちに、村ひとつぶんはあろうかという雪の塊が線路の上で崩れ落ち、夜明けには重機でなければ動かせない瓦礫の原の下に線路が埋まっていた。すでに山中にいた旅人たちは、先へ進まず最寄りの駅で待つよう言われた。",
    ),
    regions: ["cas", "sib"],
    months: [11, 12],
  },
  {
    id: "railbuckle",
    n: t("The heat buckles the rail|El calor deforma el raíl|La chaleur déforme le rail|猛暑で線路が曲がる"),
    t: t(
      "Steel expands enough in extreme heat that a straight rail can bow sideways into a shallow curve strong enough to derail a train running at speed, so crews patrol with paint-can thermometers and impose slow orders the moment the numbers climb too high. The fix, once it happens, is simply to wait for the cool of night and let the metal contract back.|El acero se dilata lo suficiente con el calor extremo como para que un raíl recto se combe en una curva leve, capaz de descarrilar un tren a velocidad, así que las cuadrillas patrullan con termómetros de bote de pintura e imponen órdenes de reducir la velocidad en cuanto las cifras suben demasiado. El arreglo, cuando ocurre, es simplemente esperar el frescor de la noche.|L'acier se dilate assez sous une chaleur extrême pour qu'un rail droit se courbe légèrement, assez pour dérailler un train lancé à vitesse normale, si bien que les équipes patrouillent avec des thermomètres de fortune et imposent des ralentissements dès que les chiffres grimpent trop. La réparation, quand elle a lieu, consiste simplement à attendre la fraîcheur de la nuit.|猛暑になると鋼のレールは、走行中の列車を脱線させかねないほどのゆるい曲線に横へたわむことがある。保線員は簡易温度計を携えて巡回し、数値が上がりすぎると徐行を命じる。直し方は単純で、夜の涼しさを待ち、金属が縮んで戻るのに任せるだけである。",
    ),
    regions: ["arb", "sas"],
    months: [6, 7],
  },
  {
    id: "customsdelay",
    n: t("Every bag comes off for inspection|Bajan todas las maletas para inspeccionarlas|Tous les bagages descendent pour l'inspection|荷物が全部下ろされて検査される"),
    t: t(
      "A new customs officer at the border checkpoint insists on opening every case rather than waving the usual ones through, and the queue backs up along the whole platform before anyone reaches the front. Nobody argues; the last traveller who did is still talked about at this station.|Un nuevo agente de aduanas en el puesto fronterizo insiste en abrir todas las maletas en vez de dejar pasar las de siempre, y la cola se extiende por todo el andén antes de que nadie llegue al principio. Nadie discute; del último viajero que lo hizo todavía se habla en esta estación.|Un nouveau douanier au poste-frontière tient à ouvrir chaque valise plutôt que de laisser passer les habituelles, et la file s'allonge sur tout le quai avant que quiconque n'atteigne le début. Personne ne discute ; on parle encore, dans cette gare, du dernier voyageur qui l'a fait.|国境の検問所に新しく来た係官が、いつもなら素通りする荷物まで全部開けさせると言い張り、行列はホーム全体に伸びて誰も先頭にたどり着けない。誰も口答えはしない。前にそうした旅人のことは、いまもこの駅で語り草になっている。",
    ),
  },
  {
    id: "bazaarpickpocket",
    n: t("A pickpocket works the bazaar crowd|Un carterista trabaja entre el gentío del bazar|Un pickpocket sévit dans la foule du bazar|バザールの人混みですりに遭う"),
    t: t(
      "A shoulder bump between one covered stall and the next was over before it registered as anything, and only two stalls later does the missing weight in a pocket become obvious. The bazaar is loud and packed enough that nobody nearby noticed a thing, and the crowd has already closed back over the gap.|Un roce de hombros entre un puesto cubierto y el siguiente pasó antes de que se notara como algo, y solo dos puestos después se hace evidente el peso que falta en un bolsillo. El bazar está tan bullicioso y abarrotado que nadie cerca notó nada, y la multitud ya ha cerrado el hueco.|Un coup d'épaule entre un étal couvert et le suivant est passé avant même d'être remarqué, et ce n'est que deux étals plus loin que le poids manquant dans une poche devient évident. Le bazar est si bruyant et si dense que personne alentour n'a rien vu, et la foule s'est déjà refermée sur le vide.|屋根付きの露店から次の露店へ移る間の肩がぶつかった程度にしか感じなかったが、二つ先の店に来てようやくポケットの軽さに気づいた。バザールはざわめきと人混みでいっぱいで、近くの誰も何にも気づかず、群衆はもう隙間を埋めて動いている。",
    ),
  },
  {
    id: "powercut",
    n: t("The overhead line loses power|La catenaria se queda sin corriente|La caténaire perd le courant|架線が停電する"),
    t: t(
      "The electrified express coasts to a stop between stations when the overhead wire goes dead, and the driver's announcement gives no estimate because none has been given to the driver either. Passengers who brought food share it around; the ones who did not regret it loudly.|El expreso electrificado se detiene poco a poco entre estaciones cuando la catenaria se queda sin corriente, y el aviso del maquinista no da ninguna estimación porque a él tampoco se la han dado. Los pasajeros que llevaban comida la comparten; los que no, se quejan en voz alta.|L'express électrifié roule sur son erre jusqu'à s'arrêter entre deux gares quand la caténaire tombe en panne, et l'annonce du conducteur ne donne aucune estimation, car lui-même n'en a reçu aucune. Les passagers qui avaient de la nourriture la partagent ; ceux qui n'en avaient pas s'en plaignent bruyamment.|架線の電気が落ち、電化区間を走る特急は駅と駅の間でじわじわ止まってしまう。運転士の車内放送は復旧の見込みを告げない。運転士自身も知らされていないからである。食べ物を持っていた乗客はそれを分け合い、持っていなかった乗客は大声でそれを悔やむ。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。大陸盤面なので、月ごとに違う地方の気候現象を
 * 取り上げる形にした(効果の数値は season-and-doom-rules.ts の asia の項)。
 */
export const ASIA_SEASONS = [
  {
    e: "🌷",
    n: t("Tulips open on the steppe|Los tulipanes se abren en la estepa|Les tulipes s'ouvrent sur la steppe|草原にチューリップが開く"),
    t: t(
      "Wild tulips, the ancestors of every cultivated bulb later bred in the Netherlands, carpet the foothills of the Tien Shan and the steppe of Kazakhstan for a few weeks before the summer heat burns the grass back to straw. Caravan traders once timed river crossings to this bloom because the fords were still low before snowmelt swelled them.|Los tulipanes silvestres, antepasados de todo bulbo cultivado luego criado en los Países Bajos, alfombran las estribaciones del Tian Shan y la estepa de Kazajistán durante unas semanas antes de que el calor del verano queme la hierba hasta dejarla en paja.|Les tulipes sauvages, ancêtres de tous les bulbes cultivés plus tard élevés aux Pays-Bas, tapissent les contreforts du Tian Shan et la steppe du Kazakhstan pendant quelques semaines avant que la chaleur estivale ne brûle l'herbe en paille.|オランダで後に品種改良されるすべての栽培チューリップの祖先にあたる野生種が、天山山脈の裾野とカザフスタンの草原を数週間だけ覆い、そのあと夏の暑さが草を藁色に焼く。隊商はかつて、雪解けで川が増水する前のこの開花期に渡渉の時期を合わせていた。",
    ),
    f: t(
      "Botanists trace the word \"tulip\" itself back to the Persian and Turkish word for turban, a mistranslation that stuck after Ottoman court gardeners described the flower's shape to European visitors.|Los botánicos rastrean la propia palabra «tulipán» hasta el término persa y turco para turbante, una mala traducción que se quedó tras que los jardineros de la corte otomana describieran la forma de la flor a visitantes europeos.|Les botanistes font remonter le mot « tulipe » lui-même au terme persan et turc désignant le turban, une mauvaise traduction restée en usage après que des jardiniers de la cour ottomane eurent décrit la forme de la fleur à des visiteurs européens.|「チューリップ」という語自体、ペルシア語・トルコ語でターバンを指す言葉に由来するとされる。オスマン宮廷の庭師が花の形をヨーロッパからの訪問者に説明した際の誤訳がそのまま定着したものである。",
    ),
  },
  {
    e: "🐫",
    n: t("Caravans move before the heat sets in|Las caravanas se mueven antes de que llegue el calor|Les caravanes se déplacent avant l'installation de la chaleur|暑さが来る前に隊商が動く"),
    t: t(
      "Traders across the Arabian and Central Asian deserts push their heaviest crossings into this month, while night temperatures still fall low enough for camels to travel comfortably after dark. By the time the ground itself starts to shimmer at noon, the loaded caravans are already deep into the next leg.|Los comerciantes de los desiertos de Arabia y Asia Central adelantan sus travesías más pesadas a este mes, mientras las temperaturas nocturnas aún bajan lo suficiente para que los camellos viajen cómodos tras el anochecer.|Les marchands des déserts d'Arabie et d'Asie centrale avancent leurs traversées les plus lourdes à ce mois-ci, tant que les températures nocturnes descendent encore assez pour que les chameaux voyagent confortablement après la tombée du jour.|アラビアと中央アジアの砂漠を行き来する商人たちは、夜の気温がまだラクダの旅に快適なほど下がるうちに、いちばん重い荷を運ぶ横断をこの月に集中させる。正午の地面がゆらめき始めるころには、荷を積んだ隊商はすでに次の行程の奥深くにいる。",
    ),
    f: t(
      "A loaded dromedary can carry roughly 150–200kg and go several days between waterings on desert routes, a margin traders calculated against exactly this month's temperatures when planning how much water each animal needed to carry for itself.|Un dromedario cargado puede llevar unos 150-200 kg y pasar varios días entre abrevaderos en rutas desérticas, un margen que los mercaderes calculaban justo con las temperaturas de este mes al planear cuánta agua necesitaba cada animal para sí.|Un dromadaire chargé peut porter environ 150 à 200 kg et tenir plusieurs jours entre deux abreuvages sur les routes désertiques, une marge que les marchands calculaient précisément sur les températures de ce mois pour prévoir l'eau que chaque bête devait porter pour elle-même.|荷を積んだヒトコブラクダはおよそ150〜200kgを運び、砂漠路では水場と水場の間を数日もたせられる。商人たちはまさにこの月の気温を基準に、各頭がどれだけの水を自分のために運ぶ必要があるかを見積もった。",
    ),
  },
  {
    e: "🌾",
    n: t("The Fergana Valley brings in the first cotton|El valle de Fergana recoge el primer algodón|La vallée de Ferghana rentre le premier coton|フェルガナ盆地が最初の綿を収穫する"),
    t: t(
      "Fed by snowmelt canals dug in Soviet times, the fields of the Fergana Valley across Uzbekistan, Kyrgyzstan and Tajikistan bring in an early cotton crop that funds much of the region's rail freight for the rest of the year. Roads into the valley clog with trucks queuing at the gins before the bolls have even finished opening.|Alimentados por canales de deshielo cavados en tiempos soviéticos, los campos del valle de Fergana, repartidos entre Uzbekistán, Kirguistán y Tayikistán, dan una cosecha temprana de algodón que financia buena parte del transporte ferroviario de carga de la región el resto del año.|Alimentés par des canaux de fonte des neiges creusés à l'époque soviétique, les champs de la vallée de Ferghana, partagée entre l'Ouzbékistan, le Kirghizstan et le Tadjikistan, rentrent une récolte de coton précoce qui finance une bonne part du fret ferroviaire régional pour le reste de l'année.|ソ連時代に掘られた雪解け水の運河に支えられ、ウズベキスタン・キルギス・タジキスタンにまたがるフェルガナ盆地の畑は早場の綿花を収穫する。それが年間を通じてこの地域の鉄道貨物の多くを支える資金になる。綿の実がまだ開ききらないうちから、盆地へ通じる道路は繰綿工場へ並ぶトラックで詰まる。",
    ),
    f: t(
      "The valley is split between three countries in a jagged patchwork of borders left over from Soviet administrative lines drawn in the 1920s, so a single irrigation canal can cross an international border several times along its length.|El valle está repartido entre tres países en un mosaico irregular de fronteras heredado de las líneas administrativas soviéticas trazadas en los años veinte, así que un solo canal de riego puede cruzar una frontera internacional varias veces a lo largo de su curso.|La vallée est partagée entre trois pays selon un patchwork déchiqueté de frontières héritées des lignes administratives soviétiques tracées dans les années 1920, si bien qu'un seul canal d'irrigation peut franchir une frontière internationale plusieurs fois sur son parcours.|この盆地は、1920年代にソ連が引いた行政境界線の名残でぎざぎざに三か国に分かれており、一本の灌漑用水路がその流れの中で国境を何度も越えることさえある。",
    ),
  },
  {
    e: "🌧️",
    n: t("The monsoon breaks over the Bay of Bengal|El monzón rompe sobre el golfo de Bengala|La mousson éclate sur le golfe du Bengale|モンスーンがベンガル湾で始まる"),
    t: t(
      "The south-west monsoon makes landfall on the coasts of India and Bangladesh in a single dramatic week, turning dust to mud almost overnight and filling reservoirs that farmers have been rationing for months. Rail schedules across the region build in slack for exactly this week, knowing at least one embankment somewhere will need attention.|El monzón del suroeste toca tierra en las costas de India y Bangladés en una sola semana dramática, convirtiendo el polvo en barro casi de la noche a la mañana y llenando embalses que los agricultores llevan meses racionando.|La mousson du sud-ouest touche terre sur les côtes de l'Inde et du Bangladesh en une seule semaine spectaculaire, transformant la poussière en boue presque du jour au lendemain et remplissant des réservoirs que les agriculteurs rationnaient depuis des mois.|南西モンスーンは、劇的な一週間のうちにインドとバングラデシュの海岸に上陸し、ほとんど一夜で埃を泥に変え、農家が何か月も出し惜しんできた貯水池を満たす。この地域の鉄道時刻表は、どこかの土手が必ず手当てを要することを見越して、まさにこの週にゆとりを組み込んでいる。",
    ),
    f: t(
      "The monsoon's arrival date is tracked and announced almost like a sporting result, with meteorological departments declaring an official \"onset\" over Kerala that then becomes the reference point news reports use for how early or late the season is running.|La llegada del monzón se sigue y anuncia casi como un resultado deportivo, con los departamentos meteorológicos declarando un «inicio» oficial sobre Kerala que luego se convierte en la referencia de las noticias sobre si la temporada va adelantada o atrasada.|L'arrivée de la mousson est suivie et annoncée presque comme un résultat sportif, les services météorologiques déclarant un « début » officiel au-dessus du Kerala qui devient ensuite la référence utilisée par les journaux pour dire si la saison est en avance ou en retard.|モンスーンの到来日は、まるでスポーツの結果のように追跡され発表される。気象当局はケーララ州上空での公式の「開始」を宣言し、それが以後、季節の早い遅いを報じる際の基準点として使われる。",
    ),
  },
  {
    e: "🕌",
    n: t("Pilgrim traffic peaks toward the Hejaz|El tráfico de peregrinos alcanza su pico hacia el Hiyaz|Le trafic des pèlerins culmine vers le Hedjaz|巡礼者の往来がヒジャーズへ向けて最盛期を迎える"),
    t: t(
      "Airports and land crossings toward the western Arabian peninsula handle their busiest month of the year as pilgrims converge from across the continent, a modern echo of the traffic the old Hejaz Railway was built specifically to carry. Hotels in the region's transit hubs sell out months ahead.|Los aeropuertos y pasos terrestres hacia el oeste de la península arábiga viven su mes más ajetreado del año, con peregrinos convergiendo desde todo el continente, un eco moderno del tráfico que el viejo Ferrocarril del Hiyaz se construyó específicamente para llevar.|Les aéroports et postes-frontières terrestres vers l'ouest de la péninsule arabique connaissent leur mois le plus chargé de l'année, avec des pèlerins convergeant de tout le continent, écho moderne du trafic que l'ancien chemin de fer du Hedjaz fut bâti spécifiquement pour porter.|アラビア半島西部へ向かう空港と陸路の国境は、大陸じゅうから巡礼者が集まる一年でいちばん忙しい月を迎える。かつてのヒジャーズ鉄道がまさに運ぶために造られた往来の、現代における反響である。この地域の乗継拠点のホテルは何か月も前に埋まる。",
    ),
    f: t(
      "The pilgrimage follows the lunar Islamic calendar, so its date shifts roughly eleven days earlier each solar year, meaning the peak transit month named here will not always land in the same season across a person's lifetime.|La peregrinación sigue el calendario islámico lunar, así que su fecha se adelanta unos once días cada año solar, lo que significa que el mes de tránsito máximo aquí nombrado no siempre caerá en la misma estación a lo largo de la vida de una persona.|Le pèlerinage suit le calendrier islamique lunaire, si bien que sa date avance d'environ onze jours chaque année solaire ; le mois de pointe nommé ici ne tombera donc pas toujours à la même saison au cours d'une vie.|巡礼はイスラム暦(太陰暦)に従うため、太陽暦では毎年およそ11日ずつ早まっていく。つまりここで挙げた往来最盛期の月は、一人の生涯のうちで常に同じ季節に来るとは限らない。",
    ),
  },
  {
    e: "🌊",
    n: t("Typhoons begin crossing the Pacific rim|Los tifones empiezan a cruzar el borde del Pacífico|Les typhons commencent à traverser le pourtour du Pacifique|台風が太平洋岸を横切り始める"),
    t: t(
      "The first typhoons of the season track up from the Philippine Sea toward the coasts of China, Korea and Japan, and rail operators along the Pacific rim start issuing the year's first storm-suspension notices. Vietnam and southern China brace at the same time for the season's earliest tropical depressions.|Los primeros tifones de la temporada suben desde el mar de Filipinas hacia las costas de China, Corea y Japón, y los operadores ferroviarios del borde del Pacífico emiten los primeros avisos de suspensión por tormenta del año.|Les premiers typhons de la saison remontent depuis la mer des Philippines vers les côtes de la Chine, de la Corée et du Japon, et les exploitants ferroviaires du pourtour pacifique publient les premiers avis de suspension pour tempête de l'année.|その年最初の台風がフィリピン海から中国・韓国・日本の沿岸へ向けて北上し始め、太平洋岸の鉄道各社はその年最初の運休情報を出し始める。ベトナムと中国南部も、この時期のいちばん早い熱帯低気圧に身構える。",
    ),
    f: t(
      "The same storms are named differently depending on where they are tracked from: a system called a typhoon in East Asia is meteorologically identical to a hurricane in the Americas, the label changing only with the ocean basin it forms in.|Las mismas tormentas se llaman de forma distinta según desde dónde se sigan: un sistema llamado tifón en el este de Asia es meteorológicamente idéntico a un huracán en América, y la etiqueta cambia solo con la cuenca oceánica donde se forma.|Les mêmes tempêtes portent des noms différents selon d'où on les suit : un système appelé typhon en Asie de l'Est est météorologiquement identique à un ouragan en Amérique, l'étiquette ne changeant qu'avec le bassin océanique où il se forme.|同じ嵐でも、どこで追跡されるかによって呼び名が変わる。東アジアで「台風」と呼ばれる現象は、気象学的にはアメリカ大陸の「ハリケーン」と同一で、生まれた海域によって名前が変わるだけである。",
    ),
  },
  {
    e: "🍉",
    n: t("Melon season peaks across the oases|La temporada del melón llega a su pico en los oasis|La saison des melons culmine dans les oasis|オアシス地帯がメロンの盛りを迎える"),
    t: t(
      "The oasis towns of Central Asia and Xinjiang produce their sweetest melons of the year in the last stretch of summer heat, grown in soil that bakes by day and cools sharply at night, a swing said to concentrate the sugar. Roadside stalls along the old caravan routes stack them by the hundred.|Las ciudades oasis de Asia Central y Sinkiang producen sus melones más dulces del año en el último tramo del calor veraniego, cultivados en un suelo que se abrasa de día y se enfría bruscamente de noche, un vaivén que se dice concentra el azúcar.|Les villes-oasis d'Asie centrale et du Xinjiang produisent leurs melons les plus sucrés de l'année dans la dernière période de chaleur estivale, cultivés dans un sol qui cuit le jour et se refroidit brutalement la nuit, un écart censé concentrer le sucre.|中央アジアと新疆のオアシスの町々は、夏の暑さが最後に強まるこの時期にいちばん甘いメロンを実らせる。昼は焼けつき夜は急に冷える土壌で育ち、その寒暖差が糖を凝縮させるとされる。古い隊商路沿いの露店には、それが何百個と積み上げられる。",
    ),
    f: t(
      "Melons from this region travelled remarkably badly for their fame, since the sweetest varieties bruise if handled roughly, which is why so much of the crop historically stayed within a few days' cart ride of where it was grown rather than reaching distant markets whole.|Los melones de esta región viajaban sorprendentemente mal para su fama, ya que las variedades más dulces se magullan si se manipulan con brusquedad, por lo que buena parte de la cosecha se quedaba históricamente a pocos días de carreta de donde se cultivaba.|Les melons de cette région voyageaient étonnamment mal pour leur renommée, les variétés les plus sucrées se meurtrissant au moindre choc, raison pour laquelle une bonne part de la récolte restait historiquement à quelques jours de charrette de son lieu de culture.|この地方のメロンは、その名声のわりに驚くほど輸送に弱く、いちばん甘い品種は乱暴に扱うとすぐ傷んでしまう。だから収穫の多くは歴史的に、遠い市場へ丸のまま届けられることなく、育った土地から荷馬車で数日の範囲にとどまっていた。",
    ),
  },
  {
    e: "🏮",
    n: t("The Mid-Autumn moon rises over East Asia|La luna de mediados de otoño sale sobre el este de Asia|La lune de la mi-automne se lève sur l'Asie de l'Est|東アジアに中秋の名月が昇る"),
    t: t(
      "China, Korea and Vietnam each mark the full moon of the eighth lunar month with their own version of a harvest festival, and railways across the region see one of the year's heaviest travel surges as families head home for it, much like the wave a week either side of the lunar new year.|China, Corea y Vietnam marcan cada una a su manera la luna llena del octavo mes lunar con su propia versión de una fiesta de la cosecha, y los ferrocarriles de la región viven una de las mayores oleadas de viajes del año.|La Chine, la Corée et le Vietnam marquent chacun à leur façon la pleine lune du huitième mois lunaire par leur propre version d'une fête des moissons, et les chemins de fer de la région connaissent l'un des plus forts pics de voyages de l'année.|中国・韓国・ベトナムはそれぞれ、旧暦八月の満月をそれぞれの形の収穫祭として祝い、この地域の鉄道は旧正月の前後と並ぶ、一年でも指折りの帰省ラッシュを迎える。",
    ),
    f: t(
      "The festival's date is fixed by the lunar calendar and so falls on a different day of the solar calendar each year, occasionally landing early enough in the season that some years it overlaps with the last of the region's typhoon activity.|La fecha de la fiesta la fija el calendario lunar y por eso cae en un día distinto del calendario solar cada año, a veces lo bastante pronto en la temporada como para coincidir algunos años con los últimos tifones de la región.|La date de la fête est fixée par le calendrier lunaire et tombe donc un jour différent du calendrier solaire chaque année, parfois assez tôt dans la saison pour chevaucher certaines années la fin de l'activité cyclonique régionale.|この祭りの日取りは旧暦で定まるため、太陽暦では毎年違う日になる。年によっては季節の早い時期に来て、この地域の台風シーズンの終わりと重なることもある。",
    ),
  },
  {
    e: "🍁",
    n: t("Colour comes down the Himalayan foothills|El color baja por las estribaciones del Himalaya|La couleur descend les contreforts himalayens|ヒマラヤの山裾に紅葉が下りる"),
    t: t(
      "Autumn colour moves down from the high passes of Nepal and Bhutan to the lower valleys over about a month, timed closely with the end of the region's main trekking season, when mountain paths are driest and clearest before winter snow returns to close the higher routes.|El color otoñal baja desde los altos puertos de Nepal y Bután hasta los valles bajos a lo largo de un mes, coincidiendo de cerca con el final de la temporada principal de trekking de la región.|La couleur automnale descend des hauts cols du Népal et du Bhoutan vers les basses vallées sur environ un mois, coïncidant de près avec la fin de la principale saison de trek de la région.|秋の色づきは、ネパールとブータンの高い峠からおよそひと月かけて低い谷へと下りてくる。冬の雪が戻って高地の道を閉ざす前、山道がいちばん乾いて見通しの良いこの地域の主なトレッキングシーズンの終わりと、ほぼ時期を同じくする。",
    ),
    f: t(
      "Because altitude here can swing autumn colour by weeks over just a few kilometres of trail, guidebooks for the region describe the season less by date than by elevation band, telling travellers which metre range to aim for in a given week.|Como la altitud aquí puede desplazar el color otoñal por semanas en solo unos pocos kilómetros de sendero, las guías de la región describen la temporada menos por fecha que por banda de altitud.|L'altitude y décalant la couleur automnale de plusieurs semaines sur seulement quelques kilomètres de sentier, les guides de la région décrivent la saison moins par date que par tranche d'altitude, indiquant aux voyageurs quelle fourchette de mètres viser telle semaine.|標高がわずか数キロの登山道の間で紅葉の時期を何週間もずらしてしまうため、この地域のガイドブックは季節を日付ではなく標高帯で説明し、その週にどの標高を狙えばよいかを旅人に伝える。",
    ),
  },
  {
    e: "🎇",
    n: t("New Year lights the Gulf skylines|El Año Nuevo ilumina los perfiles del Golfo|Le nouvel an illumine les silhouettes du Golfe|大晦日が湾岸の街並みを灯す"),
    t: t(
      "The Gulf's modern skylines compete each New Year's Eve for the loudest fireworks display, timed to a Western calendar date most of the region does not otherwise mark, while further north the same week passes as an ordinary working one on the Islamic and Persian calendars both still in daily use.|Los perfiles modernos del Golfo compiten cada Nochevieja por el espectáculo de fuegos artificiales más ruidoso, en una fecha del calendario occidental que la región no suele marcar por lo demás, mientras que más al norte esa misma semana pasa como una semana laboral cualquiera en los calendarios islámico y persa.|Les silhouettes modernes du Golfe rivalisent chaque Saint-Sylvestre pour le feu d'artifice le plus spectaculaire, à une date du calendrier occidental que la région ne marque pas autrement, tandis que plus au nord, la même semaine passe comme une semaine de travail ordinaire selon les calendriers islamique et persan.|湾岸の近代的な街並みは大晦日のたびに、いちばん派手な花火を競い合う。この地域がふだんは特に祝わない西暦の日付に合わせてのことである。一方さらに北では、同じ週も、いまなお日常で使われるイスラム暦・ペルシア暦の上ではごく普通の勤務週として過ぎていく。",
    ),
    f: t(
      "The Gulf skyscraper firework shows are a recent tradition, mostly dating only from the 2000s once buildings tall enough to be worth lighting up from base to tip had actually been finished.|Los espectáculos de fuegos artificiales en los rascacielos del Golfo son una tradición reciente, en su mayoría solo desde los años 2000, una vez que se terminaron edificios lo bastante altos como para merecer ser iluminados de la base a la punta.|Les feux d'artifice sur les gratte-ciel du Golfe sont une tradition récente, ne datant pour l'essentiel que des années 2000, une fois achevés des immeubles assez hauts pour valoir la peine d'être illuminés de la base au sommet.|湾岸の超高層ビルを使った花火の演出は比較的新しい伝統で、根元から先端まで照らす値打ちのある高さのビルが実際に建ち始めた2000年代以降のものがほとんどである。",
    ),
  },
  {
    e: "☃️",
    n: t("The first hard freeze locks the taiga|La primera helada fuerte cierra la taiga|Le premier grand gel verrouille la taïga|最初の厳しい冷え込みがタイガを閉ざす"),
    t: t(
      "Siberia and Mongolia drop below minus twenty within a matter of days, rivers freeze thick enough to bear a loaded truck within the month, and diesel locomotives on the least-maintained branch lines are kept idling around the clock because a cold engine may not restart at all.|Siberia y Mongolia bajan de menos veinte en cuestión de días, los ríos se congelan lo bastante gruesos como para aguantar un camión cargado en el plazo de un mes, y las locomotoras diésel de los ramales peor mantenidos se mantienen al ralentí las veinticuatro horas.|La Sibérie et la Mongolie passent sous les moins vingt en quelques jours, les rivières gèlent assez épais pour porter un camion chargé d'ici la fin du mois, et les locomotives diesel des lignes secondaires les moins entretenues tournent au ralenti jour et nuit.|シベリアとモンゴルは数日のうちに氷点下20度を下回り、月内には川が積み荷を載せたトラックを支えられるほど厚く凍る。整備の行き届かない支線のディーゼル機関車は、冷え切ったエンジンが二度とかからないおそれがあるため、昼夜を問わずアイドリングさせたままにされる。",
    ),
    f: t(
      "Locomotives on some Siberian branch lines have reportedly not been fully shut down in years at a stretch during the coldest stations of the route, kept running in relays specifically so a cold start is never required.|Se dice que algunas locomotoras de ramales siberianos no se han apagado del todo en años, en los tramos más fríos de la ruta, manteniéndose en marcha por relevos precisamente para no tener que arrancar en frío nunca.|Certaines locomotives de lignes secondaires sibériennes n'auraient pas été complètement arrêtées depuis des années durant, aux tronçons les plus froids du parcours, maintenues en marche par relais justement pour ne jamais avoir à démarrer à froid.|シベリアの一部の支線では、路線でいちばん寒い区間を走る機関車が何年も完全には止められたことがないとも言われる。交代で稼働させ続けることで、冷え切った状態からの始動を一度も要さないようにしているという。",
    ),
  },
  {
    e: "🌬️",
    n: t("A cold wind off the plateau reaches the coast|Un viento frío de la meseta llega a la costa|Un vent froid du plateau atteint la côte|高原からの冷たい風が海岸に届く"),
    t: t(
      "Cold, dry air pooling over the Tibetan and Iranian plateaus spills down toward the coasts this month, arriving in Southeast Asia as a brief, welcome cool snap and in the Gulf as the year's most bearable stretch of outdoor weather, before either region's usual heat reasserts itself.|El aire frío y seco acumulado sobre las mesetas del Tíbet e Irán se derrama hacia las costas este mes, llegando al Sudeste Asiático como una breve y bienvenida ola de frío, y al Golfo como el tramo más soportable del año para estar al aire libre.|L'air froid et sec accumulé sur les plateaux tibétain et iranien se déverse vers les côtes ce mois-ci, arrivant en Asie du Sud-Est comme un bref coup de frais bienvenu et dans le Golfe comme la période la plus supportable de l'année pour rester dehors.|チベット高原とイラン高原にたまった冷たく乾いた空気がこの月、沿岸部へと流れ下る。東南アジアには短くも歓迎される涼しさとして、湾岸地域には一年でいちばん外歩きに耐えやすい時期として届く。どちらの地域も、やがてまたいつもの暑さが戻ってくる。",
    ),
    f: t(
      "Southeast Asia's brief \"cool season\" dip rarely drops temperatures below the mid-20s Celsius, mild by most standards, but is treated locally as a genuine seasonal event precisely because the rest of the year offers so little contrast.|El breve descenso de la «temporada fresca» del Sudeste Asiático rara vez baja de mediados de los veinte grados centígrados, templado para casi cualquier estándar, pero se trata localmente como un auténtico episodio estacional precisamente porque el resto del año ofrece tan poco contraste.|Le bref épisode de la « saison fraîche » en Asie du Sud-Est descend rarement sous le milieu des vingt degrés Celsius, doux selon presque tous les critères, mais il est perçu localement comme un véritable événement saisonnier, justement parce que le reste de l'année offre si peu de contraste.|東南アジアの短い「涼季」は摂氏20度台半ばを下回ることはめったになく、たいていの基準からすれば穏やかなものだが、一年の他の時期があまりに変化に乏しいからこそ、現地では本物の季節の節目として扱われる。",
    ),
  },
];
