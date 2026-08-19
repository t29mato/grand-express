/**
 * 北海道盤面の県情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 通貨は日本盤・茨城・日本百名山と同じ円、倍率は10000で決め打ち
 * (指示どおり。`property-economy.mjs` は取りまとめ側が当てる)。
 *
 * 厄災の神は**幻の踏切番**にした。アイヌの信仰を模して神秘化するのではなく、
 * この盤面の芯(石炭のために敷かれた鉄道が、いま人口で閉じられていく)を
 * そのまま擬人化した、この盤面だけの創作の幽霊である。ノルウェーの担当が
 * サーミのヨイクを安易に模倣せず「土地の広さと静けさ」を音にしたのと同じ
 * 考え方で、実在の民族宗教を借りていない。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const HOKKAIDO_META = {
  id: "hokkaido",
  name: t("Hokkaidō|Hokkaidō|Hokkaidō|北海道"),
  blurb: t(
    "A frontier island where railways were laid for coal, and are closing for people|Una isla de frontera donde los ferrocarriles se tendieron por el carbón y ahora cierran por la gente|Une île-frontière où les chemins de fer furent posés pour le charbon, et ferment aujourd'hui faute d'habitants|石炭のために敷かれ、人口のために閉じられていく鉄道の島",
  ),
  // 日本・茨城・日本百名山と同じ円。内部の金額は10000倍で持って表示時に割る。
  cur: { pre: "¥", post: "", mul: 10000 },
  start: "chitose",
  cpuNames: ["クマ Kuma", "エゾシカ Ezoshika", "サンマ Sanma", "コンブ Konbu"],
  // 雪の白、石炭・鉄路の黒鉄色、針葉樹の緑、オホーツクの海の青、タンチョウの紅。
  stripe: ["#e8eef2", "#2f3a44", "#3f6b45", "#1e4266", "#c4384f"],
};

/** 地方区分(北海道が実際に使う4区分)。 */
export const HOKKAIDO_REGIONS = {
  chuo: t("The Centre|El centro|Le Centre|道央"),
  nan: t("The South|El sur|Le Sud|道南"),
  hoku: t("The North|El norte|Le Nord|道北"),
  tou: t("The East|El este|L'Est|道東"),
};

/**
 * アイテム9件。効果の種類は他の盤面と同じ9種
 * (`item-effect-rules.ts` の型: carried-far / choose-exact-dice /
 * roll-fixed-dice×2種 / none(厄災の神のward) / repel-spirit / quiz-save /
 * gain-cash / extra-turn)。`bearbells` はカナダ・日本百名山が既に使っている
 * 鍵で、効果も同じ(repel-spirit)。北海道もヒグマ対策の鈴が実在するため、
 * 新規に起こさずそのまま使う(team-lead確認要)。
 */
export const HOKKAIDO_ITEMS = {
  daikoubasu: {
    e: "🚌",
    price: 220,
    kind: "move",
    n: t("Replacement Bus|Autobús sustitutivo|Bus de remplacement|廃線代行バス"),
    d: t(
      "Carried 8–12 squares. The route is fixed by the timetable, not by you.|Te lleva de 8 a 12 casillas. La ruta la fija el horario, no tú.|Emporté de 8 à 12 cases. L'itinéraire est fixé par l'horaire, pas par toi.|8〜12マス運ばれる。行き先は時刻表任せで自分では選べない。",
    ),
    f: t(
      "JR Hokkaidō has run replacement buses on almost every line it has closed since the 1980s. In several places — Rumoi, the Hidaka coast, the northern half of the Sassho Line — the bus has now run for years, following its own road rather than the vanished rails.|JR Hokkaidō ha puesto autobuses sustitutivos en casi todas las líneas que ha cerrado desde los años 80. En varios lugares, el autobús lleva ya años circulando por su propia carretera, no por las vías desaparecidas.|JR Hokkaidō a mis en place des bus de remplacement sur presque toutes les lignes fermées depuis les années 1980. En plusieurs endroits, le bus circule depuis des années, sur sa propre route plutôt que sur les rails disparus.|JR北海道は1980年代以降に廃止したほぼすべての路線で代行バスを走らせてきた。留萌・日高海岸・札沼線北側など複数の区間では、消えた線路ではなく独自の道路をたどる代行バスがもう何年も走り続けている。",
    ),
  },
  supersooya: {
    e: "🚄",
    price: 420,
    kind: "pre",
    n: t("Limited Express Super Sōya|Expreso limitado Super Sōya|Rapide Super Sōya|特急スーパー宗谷"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "The fastest scheduled train on the Sōya Main Line covers the roughly 260 km between Asahikawa and Wakkanai in about three and a half hours. It is one of the last named limited expresses left on a network that has quietly retired many others.|El tren programado más rápido de la línea principal Sōya cubre los cerca de 260 km entre Asahikawa y Wakkanai en unas tres horas y media. Es uno de los últimos expresos limitados con nombre que quedan en una red que ha retirado calladamente muchos otros.|Le train le plus rapide de la ligne principale Sōya couvre les quelque 260 km entre Asahikawa et Wakkanai en environ trois heures et demie. C'est l'un des derniers rapides nommés subsistant sur un réseau qui en a discrètement retiré beaucoup d'autres.|宗谷本線でもっとも速いこの列車は、旭川―稚内間およそ260kmを3時間半ほどで走る。多くの特急がひっそり姿を消してきた路線網の中で、いまも名前を持って残る数少ない特急のひとつである。",
    ),
  },
  hamanasugou: {
    e: "🚆",
    price: 340,
    kind: "pre",
    n: t("Express Hamanasu|Expreso Hamanasu|Express Hamanasu|急行はまなす"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "The overnight express Hamanasu ran between Aomori and Sapporo through the Seikan Tunnel until its final run in 2016, one of the last Japanese trains to carry overnight passengers in ordinary seating rather than paid sleeper berths.|El expreso nocturno Hamanasu circuló entre Aomori y Sapporo por el túnel de Seikan hasta su último viaje en 2016, uno de los últimos trenes japoneses en llevar pasajeros nocturnos en asientos normales en vez de literas de pago.|L'express de nuit Hamanasu relia Aomori à Sapporo via le tunnel de Seikan jusqu'à son dernier trajet en 2016, l'un des derniers trains japonais à transporter des passagers de nuit en places assises ordinaires plutôt qu'en couchettes payantes.|夜行急行はまなすは、2016年に最後の運行を終えるまで青函トンネルを抜けて青森と札幌を結んだ。有料の寝台ではなく普通座席のまま夜を越せる、日本でも最後期の夜行列車のひとつだった。",
    ),
  },
  hokutoseigou: {
    e: "🚋",
    price: 620,
    kind: "pre",
    n: t("Sleeper Train Hokutosei|Tren litera Hokutosei|Train-couchettes Hokutosei|寝台特急北斗星"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The sleeper train Hokutosei linked Sapporo to Ueno in Tokyo, about 16 hours through the Seikan Tunnel, until it was discontinued in 2015. Its priciest cabin class, a private double suite, was for years among the costliest standard fares on Japan's railways.|El tren litera Hokutosei unía Sapporo con Ueno, en Tokio, unas 16 horas por el túnel de Seikan, hasta que se retiró en 2015. Su clase de camarote más cara, una suite doble privada, fue durante años una de las tarifas estándar más costosas de los ferrocarriles japoneses.|Le train-couchettes Hokutosei reliait Sapporo à Ueno, à Tokyo, environ 16 heures via le tunnel de Seikan, jusqu'à son arrêt en 2015. Sa classe de cabine la plus chère, une suite double privée, fut pendant des années l'un des tarifs standards les plus élevés des chemins de fer japonais.|寝台特急北斗星は2015年の廃止まで、青函トンネルを抜けて札幌と東京の上野をおよそ16時間で結んだ。もっとも高額な個室「ロイヤル」は、長年にわたり日本の鉄道の正規運賃の中でも指折りの高さだった。",
    ),
  },
  haisenkinenban: {
    e: "🪧",
    price: 300,
    kind: "passive",
    n: t("Closed-Line Memorial Plaque|Placa conmemorativa de la línea cerrada|Plaque commémorative de la ligne fermée|廃線記念プレート"),
    d: t(
      "Automatically wards off the crossing-keeper once.|Aleja automáticamente al guardabarrera una vez.|Repousse automatiquement le garde-barrière une fois.|踏切番を1回自動でやり過ごす。",
    ),
    f: t(
      "At many of JR Hokkaidō's closed stations, local volunteers rather than the railway itself have put up a small plaque or noticeboard recording the date of the last train. Showing one to the keeper is enough to convince him the line is truly gone.|En muchas estaciones cerradas de JR Hokkaidō, voluntarios locales, más que la propia compañía, han colocado una pequeña placa que registra la fecha del último tren. Mostrarle una al guardabarrera basta para convencerlo de que la línea ya no existe.|Dans de nombreuses gares fermées de JR Hokkaidō, ce sont des bénévoles locaux, plutôt que la compagnie elle-même, qui ont posé une petite plaque indiquant la date du dernier train. En montrer une au garde-barrière suffit à le convaincre que la ligne a bel et bien disparu.|JR北海道の廃駅の多くには、鉄道会社ではなく地元の有志が最終運行日を記した小さな碑や掲示を立てている。それを踏切番に見せれば、線路が本当に無くなったのだと納得してもらえる。",
    ),
  },
  bearbells: {
    e: "🔔",
    price: 380,
    kind: "pre",
    n: t("Bear Bell|Cascabel antiosos|Cloche anti-ours|熊よけ鈴"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Bells or whistles are standard gear for anyone walking Hokkaidō's forests and hiking trails, worn to make enough noise that a brown bear has time to move off before the two of you meet. Convenience stores near trailheads sell them beside the rain ponchos.|Cascabeles o silbatos son equipo habitual para quien camina por los bosques y senderos de Hokkaidō, para hacer ruido suficiente y que un oso pardo tenga tiempo de alejarse antes del encuentro. Las tiendas cerca de los senderos los venden junto a los ponchos de lluvia.|Cloches ou sifflets sont un équipement courant pour qui marche dans les forêts et sentiers d'Hokkaidō, afin de faire assez de bruit pour qu'un ours brun ait le temps de s'éloigner avant la rencontre. Les commerces près des départs de sentiers les vendent à côté des ponchos de pluie.|北海道の森や登山道を歩く人にとって鈴や笛は定番の装備で、ヒグマが二人が出会う前に離れる時間を持てるよう十分な音を立てるためのものである。登山口近くのコンビニでは雨具と並んで売られている。",
    ),
  },
  kyuukokutetsurosen: {
    e: "🗺️",
    price: 150,
    kind: "passive",
    n: t("Old JNR Route Map|Antiguo mapa de rutas de JNR|Vieille carte du réseau JNR|旧国鉄路線図"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Hobbyist reprints of Hokkaidō's Japanese National Railways network, showing every line before the 1980s cuts began, are still sold to railway enthusiasts today. Older residents often use one to show visitors how much smaller the map has become.|Reimpresiones para aficionados de la red de los Ferrocarriles Nacionales de Japón en Hokkaidō, con todas las líneas antes de los recortes de los años 80, todavía se venden hoy a entusiastas del ferrocarril. Los residentes mayores suelen usar una para mostrar a los visitantes cuánto ha encogido el mapa.|Des réimpressions pour amateurs du réseau des Chemins de fer nationaux japonais à Hokkaidō, montrant toutes les lignes avant les coupes des années 1980, se vendent encore aujourd'hui aux passionnés de rail. Les habitants plus âgés s'en servent souvent pour montrer aux visiteurs à quel point la carte a rétréci.|1980年代の路線見直しが始まる前の全路線を描いた旧国鉄北海道の路線図は、愛好家向けの復刻版として今も売られている。年配の住民は、地図がどれほど小さくなったかを訪問者に示すのにこれを使うことがある。",
    ),
  },
  keganibako: {
    e: "🦀",
    price: 260,
    kind: "pre",
    n: t("Boxed Hairy Crab|Cangrejo peludo en caja|Coffret de crabe poilu|毛ガニの贈答箱"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "Live hairy crab is sold in season straight off the boats at ports along the Sea of Okhotsk coast, packed in seaweed and ice for same-day shipment. A gift box like this is a common thing to send home rather than carry, since the crab does not keep well once out of the cold.|El cangrejo peludo vivo se vende en temporada recién bajado de los barcos en los puertos de la costa del mar de Ojotsk, empacado en algas y hielo para envío el mismo día. Una caja de regalo así se suele enviar a casa en vez de llevarla encima, porque el cangrejo no aguanta bien fuera del frío.|Le crabe poilu vivant se vend en saison directement débarqué des bateaux dans les ports de la côte de la mer d'Okhotsk, emballé dans des algues et de la glace pour un envoi le jour même. Un tel coffret-cadeau se poste plutôt qu'il ne se transporte, le crabe se conservant mal une fois sorti du froid.|旬の毛ガニは、オホーツク海沿岸の港で船から下ろされたその日のうちに、昆布と氷に包まれて出荷される。冷たさを離れると傷みやすいため、持ち帰るより郵送で贈ることが多い。",
    ),
  },
  teijiunkou: {
    e: "⏱️",
    price: 400,
    kind: "pre",
    n: t("A Perfectly On-Time Run|Un trayecto perfectamente puntual|Un trajet parfaitement à l'heure|奇跡の定時運行"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Japanese railways are famous nationwide for keeping precisely to the timetable, with even a delay of a minute or two prompting a public apology on some lines. Engineers on Hokkaidō's coldest, snowiest routes say that holding to that standard through a Hokkaidō winter is its own daily achievement.|Los ferrocarriles japoneses son célebres en todo el país por su exactitud de horario, y hasta un retraso de uno o dos minutos provoca una disculpa pública en algunas líneas. Los maquinistas de las rutas más frías y nevadas de Hokkaidō dicen que mantener ese nivel durante un invierno de Hokkaidō es en sí mismo un logro diario.|Les chemins de fer japonais sont réputés dans tout le pays pour leur exactitude, un retard d'une ou deux minutes suscitant parfois des excuses publiques. Les conducteurs des lignes les plus froides et enneigées d'Hokkaidō disent que tenir ce niveau tout un hiver d'Hokkaidō est en soi un exploit quotidien.|日本の鉄道は全国的に定刻運行の正確さで知られ、路線によってはわずか1〜2分の遅れでも公に謝罪することがある。北海道でもっとも寒く雪深い路線の乗務員たちは、その水準を北海道の冬じゅう保つこと自体が日々の達成なのだと語る。",
    ),
  },
};

/**
 * 厄災の神。**幻の踏切番。**廃止された支線の踏切で働いていた番人の幽霊で、
 * 路線が閉じたことを知らないまま、来るはずのない汽車のために今夜も遮断機を
 * 下ろしに出る。特定の民族や信仰を借りず、この盤面の芯(廃線)を
 * そのまま擬人化した創作の存在。
 */
export const HOKKAIDO_SPIRIT = {
  e: "🚧",
  n: t("The Crossing-Keeper|El guardabarrera|Le garde-barrière|踏切番"),
  big: t("The Phantom Crossing|El paso a nivel fantasma|Le passage à niveau fantôme|幻の踏切"),
  ward: "haisenkinenban",
  arrive: t(
    "<b>🚧 The crossing-keeper has noticed you.</b> He worked a level crossing on a branch line that closed decades ago — which line does not matter to him, only that a train is due — and every evening he still walks out to lower the gate for one that will never come again. He now walks beside <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🚧 El guardabarrera te ha visto.</b> Trabajó un paso a nivel de un ramal cerrado hace décadas —qué línea no le importa, solo que un tren está por llegar— y cada noche todavía sale a bajar la barrera para uno que ya no vendrá jamás. Ahora camina junto a <b>{0}</b>, el más lejano del destino, y trae una desgracia cada turno.|<b>🚧 Le garde-barrière t'a remarqué.</b> Il tenait un passage à niveau sur un embranchement fermé il y a des décennies — peu lui importe lequel, seulement qu'un train est attendu — et chaque soir il sort encore abaisser la barrière pour un train qui ne viendra plus jamais. Il marche désormais près de <b>{0}</b>, le plus éloigné du but, et amène un malheur chaque tour.|<b>🚧 踏切番に見つかった。</b> 彼は何十年も前に廃止された支線の踏切で働いていた。どの路線だったかは彼にとって重要ではない。ただ汽車が来るはずだということだけが問題である。いまも毎晩、二度と来ない汽車のために遮断機を下ろしに出る。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🚧 <b>The crossing-keeper</b> turns his head and starts after <b>{0}</b>, farthest from {1}.|🚧 <b>El guardabarrera</b> vuelve la cabeza y va tras <b>{0}</b>, el más lejano de {1}.|🚧 <b>Le garde-barrière</b> tourne la tête et suit <b>{0}</b>, le plus loin de {1}.|🚧 <b>踏切番</b> が首を巡らせ、{1} から最も遠い <b>{0}</b> のほうへ歩き出した。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns beside the keeper and has not got clear of him. He hears, or believes he hears, the whistle of the last train — <b>the Phantom Crossing</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al guardabarrera sin librarse de él. Oye, o cree oír, el silbato del último tren: empieza <b>el paso a nivel fantasma</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours près du garde-barrière sans s'en défaire. Il entend, ou croit entendre, le sifflet du dernier train : <b>le passage à niveau fantôme</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターン歩いても踏切番から離れられなかった。最終列車の汽笛が聞こえた、あるいは聞こえた気がした。<b>幻の踏切</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> JR Hokkaidō has closed roughly a dozen lines and hundreds of kilometres of track since the 1980s, and several of the abandoned crossings still stand with their gates rusted in place. The keeper is invented, but the empty crossings he is imagined to guard are real.|<b>Tras la historia:</b> JR Hokkaidō ha cerrado alrededor de una decena de líneas y cientos de kilómetros de vía desde los años 80, y varios pasos a nivel abandonados siguen en pie con las barreras oxidadas en su sitio. El guardabarrera es inventado, pero los pasos vacíos que se imagina vigilando son reales.|<b>Derrière l'histoire :</b> JR Hokkaidō a fermé une douzaine de lignes et des centaines de kilomètres de voie depuis les années 1980, et plusieurs passages à niveau abandonnés se dressent encore, barrières rouillées en place. Le garde-barrière est inventé, mais les passages vides qu'on l'imagine garder sont réels.|<b>物語の背景:</b> JR北海道は1980年代以降、十数路線・数百kmの線路を廃止してきた。放置された踏切のいくつかは、遮断機が錆びついたまま今も立っている。踏切番は創作だが、彼が見張っていると想像される空の踏切は実在する。",
  ),
  pleased: t(
    "He steps aside to let a freight train through that only he can see, and something falls from his coat pocket. <b>{0}</b> gains <span class='money'>+{1}</span>.|Se aparta para dejar pasar un tren de carga que solo él ve, y algo se le cae del bolsillo del abrigo. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il s'écarte pour laisser passer un train de marchandises que lui seul voit, et quelque chose tombe de sa poche. <b>{0}</b> gagne <span class='money'>+{1}</span>.|彼だけに見える貨物列車を通そうと脇へよけたとき、上着のポケットから何かが落ちた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A plaque marking the line's last day of service is held up where he can see it. He reads it slowly, satisfied at last that the train has already come and gone, and steps past <b>{0}</b> without noticing this turn.|Se le muestra una placa que marca el último día de servicio de la línea. La lee despacio, satisfecho al fin de que el tren ya pasó, y pasa junto a <b>{0}</b> sin verlo este turno.|On lui montre une plaque marquant le dernier jour de service de la ligne. Il la lit lentement, enfin convaincu que le train est déjà passé, et dépasse <b>{0}</b> sans le remarquer ce tour-ci.|路線の最終運行日を記したプレートを、彼に見えるように掲げた。彼はゆっくり読み、汽車はもう来て過ぎたのだと納得し、このターンは <b>{0}</b> に気づかず通り過ぎた。",
  ),
};

/** 災難7種。踏切番とは別に、盤面各地で実際に起こりうることを選んだ。 */
export const HOKKAIDO_DOOM = [
  {
    id: "fubuki",
    n: t("Whiteout on the road|Ventisca en la carretera|Blizzard sur la route|地吹雪でホワイトアウト"),
    t: t(
      "The snow already on the ground lifts into the air the moment the wind picks up, and in a few seconds the road, the ditches and the sky become the same colour. Local drivers pull over and wait it out rather than trust a white line they can no longer see, and so do you.|La nieve del suelo se levanta en el aire en cuanto arrecia el viento, y en segundos la carretera, las cunetas y el cielo se vuelven del mismo color. Los conductores locales se detienen a esperar en vez de fiarse de una línea blanca que ya no ven, y tú también.|La neige déjà au sol se soulève dès que le vent forcit, et en quelques secondes la route, les fossés et le ciel se confondent. Les conducteurs locaux se rangent et attendent plutôt que de se fier à une ligne blanche qu'ils ne voient plus, et toi aussi.|風が強まった瞬間、地面の雪が舞い上がり、数秒で道路も側溝も空もみな同じ色になる。地元の運転手は見えなくなった白線を信じるより、路肩に停めてやり過ごす。あなたもそうするしかない。",
    ),
  },
  {
    id: "ryuuhyou-doom",
    n: t("Drift ice locks the harbour|El hielo a la deriva cierra el puerto|La banquise bloque le port|流氷が港を閉ざす"),
    t: t(
      "Pack ice drifting down from the Amur River has packed the harbour mouth solid overnight, and the icebreaker that usually opens a channel is booked out with sightseers. Nothing moves by water until the wind turns.|El hielo a la deriva bajado del río Amur ha sellado la bocana del puerto durante la noche, y el rompehielos que suele abrir un canal está reservado para turistas. Nada se mueve por agua hasta que cambie el viento.|La banquise descendue du fleuve Amour a scellé l'entrée du port pendant la nuit, et le brise-glace qui ouvre habituellement un chenal est réservé aux touristes. Rien ne bouge par voie d'eau tant que le vent ne tourne pas.|アムール川から流れ着いた流氷が一夜で港口を固く塞ぎ、いつもなら水路を開く砕氷船は観光客で予約が埋まっている。風向きが変わるまで、船は何も動かない。",
    ),
  },
  {
    id: "higuma-doom",
    n: t("A brown bear on the road|Un oso pardo en la carretera|Un ours brun sur la route|道路にヒグマが出た"),
    t: t(
      "A brown bear was seen crossing the highway at dawn, and the police have closed the stretch until they are sure it has moved on. The detour adds hours and a toll you had not budgeted for.|Se vio a un oso pardo cruzando la autovía al amanecer, y la policía ha cerrado el tramo hasta asegurarse de que se ha ido. El desvío añade horas y un peaje que no habías previsto.|Un ours brun a été vu traversant la route à l'aube, et la police a fermé le tronçon en attendant d'être sûre qu'il est parti. Le détour ajoute des heures et un péage non prévu.|夜明けにヒグマが幹線道路を横切るのが目撃され、警察は立ち去ったと確認できるまでその区間を封鎖した。迂回で時間がかかり、予定になかった通行料もかかる。",
    ),
  },
  {
    id: "burakkuauto",
    n: t("The whole grid goes down|Toda la red eléctrica cae|Tout le réseau électrique tombe|全域が停電する"),
    t: t(
      "One power plant going offline is enough to black out the entire island at once, a lesson learned the hard way in 2018, and it has happened again. Trains stop between stations, card readers go dark, and cash is the only thing that still works.|Basta con que una sola central se desconecte para apagar toda la isla a la vez, una lección aprendida por las malas en 2018, y ha vuelto a ocurrir. Los trenes se paran entre estaciones, los lectores de tarjeta se apagan, y solo el efectivo sigue funcionando.|Il suffit qu'une seule centrale tombe hors service pour plonger toute l'île dans le noir, une leçon apprise à la dure en 2018, et c'est arrivé de nouveau. Les trains s'arrêtent entre les gares, les lecteurs de carte s'éteignent, et seul l'argent liquide fonctionne encore.|発電所が一つ止まるだけで島全体が一斉に停電する。2018年に痛い教訓として学んだことが、また起きた。列車は駅と駅のあいだで止まり、カード読み取り機は反応しなくなり、使えるのは現金だけになる。",
    ),
  },
  {
    id: "daikoubasu-manin",
    n: t("The replacement bus is full|El autobús sustitutivo va lleno|Le bus de remplacement est complet|代行バスが満員で乗れない"),
    t: t(
      "The bus that replaced the railway here runs four times a day, and today's is already standing-room only before it reaches your stop. The next one is not for three hours.|El autobús que sustituyó al ferrocarril aquí pasa cuatro veces al día, y el de hoy va ya solo de pie antes de llegar a tu parada. El siguiente no pasa hasta dentro de tres horas.|Le bus qui a remplacé le chemin de fer ici circule quatre fois par jour, et celui d'aujourd'hui est déjà complet, debout, avant même d'atteindre ton arrêt. Le suivant n'est que dans trois heures.|ここで鉄道の代わりを務めるバスは1日4本しかなく、今日の便はあなたの停留所に着く前にすでに満員で立つ場所もない。次の便は3時間後である。",
    ),
  },
  {
    id: "sake-fukyou",
    n: t("A poor year for salmon|Un mal año para el salmón|Une mauvaise année pour le saumon|鮭が不漁の年"),
    t: t(
      "The salmon run has come back thin for the third year running, and the price at the fish market has climbed to match. What you budgeted for a simple meal buys half as much fish as it did last year.|La subida del salmón ha vuelto escasa por tercer año consecutivo, y el precio en el mercado ha subido a la par. Lo que presupuestaste para una comida sencilla compra hoy la mitad de pescado que el año pasado.|La remontée du saumon est maigre pour la troisième année de suite, et le prix au marché a grimpé en conséquence. Ce que tu avais prévu pour un repas simple n'achète plus que la moitié du poisson de l'an dernier.|鮭の遡上は3年続けて細く、市場の値段はそれに合わせて上がった。簡単な食事のために見込んでいた予算では、去年の半分の量の魚しか買えない。",
    ),
  },
  {
    id: "kion-ranteika",
    n: t("A sudden thaw turns the road to mud|Un deshielo repentino convierte el camino en barro|Un dégel soudain transforme la route en boue|急な陽気で道がぬかるむ"),
    t: t(
      "A day of unseasonable warmth softens the packed snow into deep, axle-grabbing slush before it refreezes hard overnight. What was a solid road yesterday swallows a wheel today, and getting free costs more than the delay.|Un día de calor fuera de temporada ablanda la nieve compacta en un lodo profundo que atrapa los ejes, antes de volver a helarse duro por la noche. Lo que ayer era un camino firme hoy traga una rueda.|Une journée de douceur hors saison ramollit la neige tassée en une bouillasse profonde qui happe les essieux, avant de regeler dur pendant la nuit. Ce qui était hier une route ferme avale aujourd'hui une roue.|季節外れの暖かさが一日続くと、固く締まった雪が深いぬかるみに変わり、車軸まで沈み込む。夜にはまた固く凍りつく。昨日まで固い道だった場所が、今日は車輪を飲み込む。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。**その月にその場所で実際に起きることだけを書く。**
 * クイズ・都市カードで扱った題材(旭川−41℃・アイヌ施策・廃線各線の年号など)は
 * ここでは繰り返さない。
 */
export const HOKKAIDO_SEASONS = [
  {
    e: "🌸",
    n: t("Cherry blossoms arrive late|Los cerezos florecen tarde|Les cerisiers fleurissent tard|遅れて咲く桜"),
    t: t(
      "The blossom front that crossed the rest of Japan weeks ago finally reaches Hokkaidō, and parks fill for a week the way they did in Tokyo back in March. The trees are the same species, just running a season behind.|El frente de floración que cruzó el resto de Japón semanas atrás llega por fin a Hokkaidō, y los parques se llenan durante una semana como ya pasó en Tokio en marzo. Son los mismos árboles, solo que van una estación por detrás.|Le front de floraison qui a traversé le reste du Japon des semaines plus tôt atteint enfin Hokkaidō, et les parcs se remplissent une semaine durant, comme à Tokyo en mars. Ce sont les mêmes arbres, avec une saison de retard.|本州を何週間も前に通り過ぎた桜前線が、ようやく北海道に届く。3月の東京と同じように、公園は一週間だけ人で埋まる。木の種類は同じで、季節が丸ごと遅れているだけである。",
    ),
    f: t(
      "Hokkaidō's cherry blossoms typically open in late April to early May, roughly a month behind Tokyo, because the same front has to travel the length of the country first.|Los cerezos de Hokkaidō suelen abrir a finales de abril o principios de mayo, un mes por detrás de Tokio, porque el mismo frente debe recorrer antes todo el país.|Les cerisiers de Hokkaidō s'ouvrent généralement fin avril ou début mai, environ un mois après Tokyo, le même front devant d'abord traverser tout le pays.|北海道の桜は例年4月下旬から5月上旬に開花し、東京よりおよそ1か月遅い。同じ桜前線が先に列島を縦断してくる必要があるためである。",
    ),
  },
  {
    e: "🚜",
    n: t("Sowing begins on the plain|Comienza la siembra en la llanura|Les semis commencent dans la plaine|平野で種まきが始まる"),
    t: t(
      "Tractors move onto the Ishikari plain the moment the last frost risk passes, working long into the evening while the light holds. A late frost here can still cost a field its whole planting.|Los tractores salen a la llanura de Ishikari en cuanto pasa el riesgo de la última helada, trabajando hasta bien entrada la tarde mientras dura la luz. Una helada tardía aún puede arruinar toda la siembra de un campo.|Les tracteurs gagnent la plaine d'Ishikari dès que le risque de dernière gelée est passé, travaillant tard le soir tant que la lumière dure. Une gelée tardive peut encore ruiner tout le semis d'un champ.|最後の霜の心配が去ったとたん、トラクターが石狩平野に出て、日が長く残るあいだ夜遅くまで働く。この時期の遅霜は、いまも畑の作付けをまるごと台無しにしかねない。",
    ),
    f: t(
      "Farmers here watch the frost-risk forecast as closely as the planting calendar, since Hokkaidō's growing season is short enough that losing even a week to a late frost is hard to make up.|Los agricultores aquí vigilan el pronóstico de riesgo de helada tan de cerca como el calendario de siembra, porque la temporada de cultivo de Hokkaidō es tan corta que perder incluso una semana por una helada tardía es difícil de recuperar.|Les agriculteurs y surveillent les prévisions de gel d'aussi près que le calendrier des semis, la saison de culture d'Hokkaidō étant si courte que perdre même une semaine à cause d'un gel tardif est difficile à rattraper.|この土地の農家は、作付け暦と同じくらい霜の予報を注視する。北海道の生育期間は短く、遅霜で一週間を失うだけでも取り戻しにくいからである。",
    ),
  },
  {
    e: "💜",
    n: t("Lilacs open across Sapporo|Las lilas se abren en Sapporo|Les lilas s'ouvrent à Sapporo|札幌にライラックが開く"),
    t: t(
      "Streets planted with lilac a century ago fill the city with scent for about two weeks, and the flower has become close enough to an unofficial symbol that its opening is treated as a small seasonal event in its own right.|Las calles plantadas con lilas hace un siglo llenan la ciudad de aroma durante unas dos semanas, y la flor se ha convertido en un símbolo casi oficial, hasta el punto de que su apertura se trata como un pequeño acontecimiento estacional propio.|Les rues plantées de lilas voici un siècle emplissent la ville de parfum pendant environ deux semaines, et la fleur est devenue un symbole quasi officiel, au point que son ouverture est traitée comme un petit événement saisonnier à part entière.|一世紀前に植えられたライラック並木が、およそ二週間、街を香りで満たす。この花はほとんど市の象徴のような存在になっており、開花そのものが小さな季節の行事として扱われる。",
    ),
    f: t(
      "Sapporo planted lilacs widely from the early twentieth century as a tree suited to its climate, and the flower has since become closely associated with the city in a way few other Japanese cities share with a single imported plant.|Sapporo plantó lilas ampliamente desde principios del siglo XX como árbol apto para su clima, y la flor se ha asociado desde entonces estrechamente con la ciudad, algo que pocas otras ciudades japonesas comparten con una sola planta importada.|Sapporo planta des lilas à grande échelle depuis le début du XXe siècle, arbre adapté à son climat, et la fleur s'est depuis étroitement associée à la ville, comme peu d'autres villes japonaises avec une seule plante importée.|札幌は20世紀初頭から、気候に合う樹木としてライラックを広く植えてきた。以来この花は市と強く結びつくようになり、一つの外来種の植物とここまで結びついた日本の都市は他にあまりない。",
    ),
  },
  {
    e: "🍺",
    n: t("Beer gardens open in the parks|Se abren los jardines de cerveza en los parques|Les jardins à bière ouvrent dans les parcs|公園にビアガーデンが開く"),
    t: t(
      "As soon as the evenings stay light and dry, parks across the island fill with long tables and the smell of grilled mutton, and offices empty out early for it. The season is short, so nobody wastes it.|En cuanto las tardes se mantienen claras y secas, los parques de toda la isla se llenan de mesas largas y olor a cordero a la parrilla, y las oficinas se vacían pronto por ello. La temporada es corta, así que nadie la desperdicia.|Dès que les soirées restent claires et sèches, les parcs de toute l'île se remplissent de longues tables et d'odeurs de mouton grillé, et les bureaux se vident tôt pour l'occasion. La saison est courte, alors personne ne la gaspille.|夕方が明るく乾いた日が続くようになると、島じゅうの公園に長机が並び、羊肉を焼く匂いが漂う。オフィスは早じまいしてこれに繰り出す。短い季節なので誰も無駄にしない。",
    ),
    f: t(
      "Hokkaidō's short, mild summer and its long history of beer brewing and sheep farming combine into a beer-garden season that residents treat as more urgent than a purely social occasion — the good weather will not last.|El verano corto y templado de Hokkaidō, junto a su larga historia de fabricación de cerveza y cría de ovejas, se combinan en una temporada de jardines de cerveza que los residentes tratan con más urgencia que un simple acto social: el buen tiempo no durará.|L'été court et doux d'Hokkaidō, joint à sa longue histoire de brassage et d'élevage ovin, donne une saison de jardins à bière que les habitants prennent plus au sérieux qu'une simple occasion sociale : le beau temps ne durera pas.|北海道の短く穏やかな夏と、ビール醸造・牧羊の長い歴史が結びついて、単なる社交行事以上の切迫感を持つビアガーデンの季節が生まれる。好天は長くは続かない。",
    ),
  },
  {
    e: "🌊",
    n: t("Typhoon season begins|Comienza la temporada de tifones|La saison des typhons commence|台風の季節が始まる",
    ),
    t: t(
      "Storms that have already crossed most of Japan arrive here weakened but still capable of stalling ferries and flooding low fields. Farmers race to bring in what they can before the first one passes.|Las tormentas que ya han cruzado casi todo Japón llegan aquí debilitadas, pero aún capaces de detener ferris e inundar campos bajos. Los agricultores se apresuran a recoger lo que pueden antes de que pase la primera.|Les tempêtes qui ont déjà traversé presque tout le Japon arrivent ici affaiblies, mais encore capables de bloquer les ferries et d'inonder les champs bas. Les agriculteurs se hâtent de rentrer ce qu'ils peuvent avant le passage de la première.|すでに日本の大部分を通過してきた台風は、勢力を弱めながらもここへ届き、フェリーを止め、低い畑を水浸しにする力はまだ残っている。農家は最初の一つが来る前に収穫を急ぐ。",
    ),
    f: t(
      "Typhoons reaching Hokkaidō have usually already made landfall once or twice further south, so they arrive weaker on average than in the rest of Japan, but the late-summer harvest here is timed closely enough that even a weakened storm can do real damage.|Los tifones que llegan a Hokkaidō ya suelen haber tocado tierra una o dos veces más al sur, así que llegan en promedio más débiles que en el resto de Japón, pero la cosecha de finales de verano está tan ajustada que incluso una tormenta debilitada puede causar daño real.|Les typhons atteignant Hokkaidō ont généralement déjà touché terre une ou deux fois plus au sud, arrivant donc en moyenne plus faibles que dans le reste du Japon, mais la récolte de fin d'été y est si serrée qu'une tempête même affaiblie peut causer de vrais dégâts.|北海道に達する台風は、たいてい南でいったん上陸を経ているため、日本の他地域より平均して弱まって届く。それでも晩夏の収穫時期はぎりぎりで進むため、弱まった嵐でも実害が出うる。",
    ),
  },
  {
    e: "🍁",
    n: t("Autumn colour starts in the interior mountains|El color de otoño empieza en las montañas del interior|Les couleurs d'automne débutent dans les montagnes intérieures|内陸の山から紅葉が始まる"),
    t: t(
      "The high peaks of the central mountains turn first, days or weeks ahead of anywhere else in Japan, and the colour front then works its way down toward the coasts over the following month.|Los picos altos de las montañas centrales cambian primero, días o semanas antes que en cualquier otro lugar de Japón, y el frente de color avanza después hacia las costas durante el mes siguiente.|Les hauts sommets des montagnes centrales changent les premiers, des jours ou des semaines avant partout ailleurs au Japon, et le front des couleurs gagne ensuite les côtes durant le mois suivant.|中央の山々の高所がまっさきに色づき、日本の他のどこよりも早い。紅葉前線はそこから翌月にかけて海岸へ向けて下りていく。",
    ),
    f: t(
      "Because the interior mountains are both far north and high in elevation, Hokkaidō usually records Japan's earliest autumn colour each year, typically from mid-September at the highest points.|Como las montañas del interior están tanto muy al norte como a gran altitud, Hokkaidō suele registrar cada año el color de otoño más temprano de Japón, típicamente desde mediados de septiembre en los puntos más altos.|Les montagnes de l'intérieur étant à la fois très au nord et en haute altitude, Hokkaidō enregistre chaque année les couleurs d'automne les plus précoces du Japon, généralement dès la mi-septembre aux points culminants.|内陸の山々は緯度が高いうえ標高もあるため、北海道は例年、日本でもっとも早い紅葉を記録する。標高の高い場所ではおよそ9月半ばから色づき始める。",
    ),
  },
  {
    e: "🦀",
    n: t("Crab season opens on the coast|Se abre la temporada de cangrejo en la costa|La saison du crabe s'ouvre sur la côte|沿岸でカニ漁が解禁になる"),
    t: t(
      "Boats go out for the autumn crab catch the moment the season opens, and market prices swing hard on the first few days' hauls before settling for the rest of the run.|Los barcos salen a la captura otoñal de cangrejo en cuanto se abre la temporada, y los precios de mercado oscilan mucho en las primeras capturas antes de estabilizarse para el resto de la temporada.|Les bateaux sortent pour la pêche automnale au crabe dès l'ouverture de la saison, et les prix du marché varient fortement selon les premières prises avant de se stabiliser pour le reste de la campagne.|解禁とともに秋のカニ漁へ船が繰り出す。最初の数日の水揚げで市場の値は大きく揺れ、その後の漁期のあいだに落ち着いていく。",
    ),
    f: t(
      "Crab quotas and season dates are set separately for different species and coastlines, which is why the opening date residents watch for depends on which port and which crab they mean.|Las cuotas y fechas de temporada del cangrejo se fijan por separado según la especie y el tramo de costa, por lo que la fecha de apertura que vigilan los residentes depende de qué puerto y qué cangrejo se trate.|Les quotas et dates de saison du crabe sont fixés séparément selon l'espèce et le littoral, si bien que la date d'ouverture guettée par les habitants dépend du port et du crabe concernés.|カニの漁獲枠と解禁日は種類と海域ごとに別々に定められており、住民が待つ解禁日は、どの港のどのカニを指すかによって変わる。",
    ),
  },
  {
    e: "🛞",
    n: t("Tyres are swapped for winter|Se cambian los neumáticos de invierno|On change les pneus pour l'hiver|冬タイヤに履き替える"),
    t: t(
      "Garages book out weeks in advance as everyone switches to studless winter tyres before the first real snow, and driving on summer tyres past this point is treated less as a choice than as a small act of recklessness.|Los talleres se llenan de reservas semanas antes, ya que todos cambian a neumáticos de invierno sin clavos antes de la primera nevada real, y conducir con neumáticos de verano después de esto se ve menos como una elección que como una pequeña imprudencia.|Les garages sont réservés des semaines à l'avance, tout le monde passant aux pneus hiver cloutés-libres avant la première vraie neige, et rouler en pneus été passé ce cap est vu moins comme un choix que comme une petite imprudence.|本格的な雪が降る前にみながスタッドレスタイヤへ交換するため、整備工場は何週間も前から予約で埋まる。この時期を過ぎて夏タイヤで走るのは、選択というより小さな無謀と見なされる。",
    ),
    f: t(
      "Studded winter tyres were banned nationwide in the early 1990s over the metal dust they left on bare pavement, so studless tyres, which rely on tread pattern and softer rubber instead of metal spikes, are now standard.|Los neumáticos de invierno con clavos fueron prohibidos en todo el país a principios de los 90 por el polvo metálico que dejaban en el pavimento, así que hoy los neumáticos sin clavos, que dependen del dibujo y la goma más blanda, son el estándar.|Les pneus cloutés furent interdits nationalement au début des années 1990 à cause de la poussière métallique laissée sur le bitume, si bien que les pneus hiver non cloutés, misant sur le dessin de la bande et un caoutchouc plus souple, sont désormais la norme.|スパイクタイヤは、舗装に残す金属粉が問題視されて1990年代初めに全国で禁止された。金属の鋲ではなくトレッドパターンと柔らかいゴムに頼るスタッドレスタイヤが、いまの標準になっている。",
    ),
  },
  {
    e: "✨",
    n: t("Sapporo lights up for winter|Sapporo se ilumina para el invierno|Sapporo s'illumine pour l'hiver|札幌が冬のイルミネーションに灯る"),
    t: t(
      "Rows of trees along the city's main avenues are strung with lights for the season, a tradition that predates most of Japan's winter illumination displays. Shoppers linger later into the evening than any other month.|Filas de árboles a lo largo de las avenidas principales de la ciudad se iluminan para la temporada, una tradición anterior a la mayoría de los alumbrados de invierno de Japón. Los compradores se quedan hasta más tarde que en cualquier otro mes.|Des rangées d'arbres le long des grandes avenues de la ville sont parées de lumières pour la saison, une tradition antérieure à la plupart des illuminations hivernales du Japon. Les passants s'attardent plus tard que tout autre mois.|市の目抜き通りの並木がこの季節、灯りで飾られる。日本の多くの冬のイルミネーションより古くから続く慣わしである。買い物客はどの月よりも遅くまで街に残る。",
    ),
    f: t(
      "Sapporo's White Illumination began in 1981, making it one of the earliest large-scale winter light displays in Japan, well before the practice became common in cities nationwide.|La Iluminación Blanca de Sapporo comenzó en 1981, siendo una de las primeras grandes iluminaciones invernales de Japón, mucho antes de que la práctica se generalizara en ciudades de todo el país.|La White Illumination de Sapporo débuta en 1981, l'une des premières grandes illuminations hivernales du Japon, bien avant que la pratique ne se généralise dans les villes du pays.|札幌の「ホワイトイルミネーション」は1981年に始まった。この種の大規模な冬のイルミネーションとしては日本でも早い部類で、各地の都市に広まるよりずっと前のことである。",
    ),
  },
  {
    e: "🥶",
    n: t("Deep winter sets in|Llega el invierno profundo|Le cœur de l'hiver s'installe|本格的な冬が来る"),
    t: t(
      "The coldest stretch of the year settles over the island around the New Year, and inland basins away from the coast's moderating effect regularly fall below −20°C at dawn. Life does not stop, but it moves indoors and slows down.|El tramo más frío del año se instala sobre la isla en torno al Año Nuevo, y las cuencas interiores, lejos del efecto moderador de la costa, bajan con regularidad de los −20 °C al amanecer. La vida no se detiene, pero se traslada adentro y se ralentiza.|La période la plus froide de l'année s'installe sur l'île autour du Nouvel An, et les bassins intérieurs, loin de l'effet modérateur de la côte, descendent régulièrement sous les −20 °C à l'aube. La vie ne s'arrête pas, mais elle rentre et ralentit.|一年でもっとも寒い時期が正月前後の島を覆う。海の緩和効果が届かない内陸の盆地では、明け方に氷点下20度を下回ることが普通にある。暮らしは止まらないが、屋内にこもり、動きは鈍くなる。",
    ),
    f: t(
      "Hokkaidō's inland basins are colder than its coasts for the same reason mountain valleys elsewhere trap cold air: still, dense cold air pools at night with no sea breeze to stir it.|Las cuencas interiores de Hokkaidō son más frías que sus costas por la misma razón que los valles de montaña atrapan aire frío en otros lugares: el aire frío, denso y quieto se estanca de noche sin brisa marina que lo remueva.|Les bassins intérieurs d'Hokkaidō sont plus froids que ses côtes pour la même raison que les vallées de montagne piègent l'air froid ailleurs : l'air froid, dense et immobile, s'accumule la nuit sans brise marine pour le brasser.|北海道の内陸の盆地が沿岸部より寒いのは、他の土地の山あいの谷が冷気を溜め込むのと同じ理由による。海風に かき混ぜられない静かで重い冷気が、夜のうちに底へ溜まるのである。",
    ),
  },
  {
    e: "⛄",
    n: t("Sapporo's snow festival fills the city|El festival de la nieve de Sapporo llena la ciudad|Le festival de la neige de Sapporo emplit la ville|札幌の雪まつりが街を埋める"),
    t: t(
      "For one week, hotels across the city book out and even side-street restaurants see queues, as visitors come from across Japan and abroad for the carved snow and ice statues filling Ōdōri Park.|Durante una semana, los hoteles de toda la ciudad se llenan e incluso los restaurantes de callejuelas tienen cola, mientras llegan visitantes de todo Japón y del extranjero por las estatuas de nieve y hielo del parque Ōdōri.|Pendant une semaine, les hôtels de toute la ville affichent complet et même les restaurants de petites rues voient des files d'attente, les visiteurs venant de tout le Japon et de l'étranger pour les statues de neige et de glace du parc Ōdōri.|一週間、市内のホテルは満室になり、裏通りの食堂にも行列ができる。大通公園を埋める雪と氷の像を目当てに、日本各地と海外から人が集まる。",
    ),
    f: t(
      "The festival is now one of the single biggest tourism-revenue weeks of the year for Sapporo, drawing more visitor spending in seven days than many smaller Hokkaidō towns see across an entire season.|El festival es hoy una de las semanas de mayores ingresos turísticos del año para Sapporo, generando en siete días más gasto de visitantes del que muchos pueblos pequeños de Hokkaidō ven en toda una temporada.|Le festival est aujourd'hui l'une des plus grosses semaines de recettes touristiques de l'année pour Sapporo, générant en sept jours plus de dépenses de visiteurs que bien des petites villes d'Hokkaidō sur toute une saison.|この祭りは今や札幌にとって年間でも指折りの観光収入をもたらす一週間になっており、7日間の来訪者消費は、北海道の小さな町のワンシーズン分を上回ることもある。",
    ),
  },
  {
    e: "🧊",
    n: t("The drift ice pulls back|El hielo a la deriva se retira|La banquise se retire|流氷が退いていく"),
    t: t(
      "The pack ice that has held the Okhotsk coast all winter finally breaks up and drifts back north, and the icebreaker cruises that ran all season switch to watching seabirds instead of ice.|El hielo a la deriva que ha ocupado toda la costa de Ojotsk durante el invierno por fin se rompe y se retira hacia el norte, y los cruceros rompehielos que operaron toda la temporada pasan a observar aves marinas en vez de hielo.|La banquise qui a occupé toute la côte d'Okhotsk durant l'hiver se disloque enfin et repart vers le nord, et les croisières brise-glace qui ont fonctionné toute la saison passent de l'observation de la glace à celle des oiseaux marins.|冬じゅうオホーツク海岸を覆っていた流氷がついに崩れて北へ退き、シーズン中ずっと氷を見せていた砕氷船クルーズは、氷の代わりに海鳥観察へと役目を変える。",
    ),
    f: t(
      "The same melting ice releases nutrients that feed a bloom of plankton each spring, which is part of why the Sea of Okhotsk supports such rich fisheries despite freezing over every winter.|El mismo hielo al fundirse libera nutrientes que alimentan una floración de plancton cada primavera, lo que explica en parte por qué el mar de Ojotsk sostiene pesquerías tan ricas pese a helarse cada invierno.|Cette même glace fondante libère des nutriments qui nourrissent une prolifération de plancton chaque printemps, ce qui explique en partie pourquoi la mer d'Okhotsk soutient des pêcheries si riches malgré son gel chaque hiver.|溶けていく氷は栄養分を放出し、それが春ごとのプランクトンの大発生を養う。オホーツク海が毎冬凍りつくにもかかわらず豊かな漁場であり続ける理由の一つである。",
    ),
  },
];
