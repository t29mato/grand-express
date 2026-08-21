/**
 * オセアニア大陸盤面の国情報・地方区分・アイテム・厄災の神・季節。
 *
 * 大陸盤面なので、通貨はドル建て・倍率100(アジア・ヨーロッパ・南北アメリカ・
 * アフリカと同じ)。厄災の神は、特定の一国の民話を「大陸全体の伝承」と偽らない
 * よう、この大陸の事実(補給船が来ると約束された日に来ないことがある)そのものに
 * まつわる幽霊船の噂という形にした(アフリカ盤面の「繋がらなかった線」・
 * アジア盤面の「時刻表に無い列車」と同じ扱い方)。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const OCEANIA_META = {
  id: "oceania",
  name: t("Oceania|Oceanía|Océanie|オセアニア"),
  blurb: t(
    "A continent the railway mostly never reached, and where it did, it carried only one thing to one port|Un continente al que el ferrocarril casi nunca llegó, y donde llegó, solo llevaba una cosa a un puerto|Un continent que le chemin de fer n'a presque jamais atteint, et où, quand il l'a fait, il ne transportait qu'une seule chose vers un seul port|鉄道がほとんど来なかった大陸、来た場合も一つの資源を一つの港へ運ぶだけだった",
  ),
  cur: { pre: "$", post: "", mul: 100 },
  start: "lautoka",
  // 大陸を実際に航海した歴史上・伝承上の航海者たちの名から(植民地行政官は避けた)。
  cpuNames: ["Kupe", "Tupaia", "Mau Piailug", "James Cook"],
  // 深い外洋の青、礁湖のターコイズ、珊瑚の朱、砂浜の砂色、火山の黒。
  stripe: ["#0b3d63", "#2a9d8f", "#e07a5f", "#f4d35e", "#264653"],
};

/** 3地方。太平洋研究で一般的な三分法(文化・地理区分。政治的な国境とは一致しない)。 */
export const OCEANIA_REGIONS = {
  mel: t("Melanesia|Melanesia|La Mélanésie|メラネシア"),
  mic: t("Micronesia|Micronesia|La Micronésie|ミクロネシア"),
  pol: t("Polynesia|Polinesia|La Polynésie|ポリネシア"),
};

/**
 * アイテム9件。効果の種類は他の盤面と同じ(対応表は
 * `src/infrastructure/content/item-effect-rules.ts`)。植民地行政の道具では
 * なく、島から島へ渡ること・交易そのものにまつわる品を選んだ。
 *
 * 価格の規則(team-lead指示): クイズを助けるアイテム(quiz-save)は140以下、
 * 向きの選べない移動アイテム(carried-far)は向きを選べる移動アイテム
 * (choose-exact-dice)より安くすること。
 */
export const OCEANIA_ITEMS = {
  coastwatcherpriority: {
    e: "📻",
    price: 420,
    kind: "pre",
    n: t("A Coastwatcher's Priority Call|Una llamada prioritaria de un vigía costero|Un appel prioritaire de guetteur côtier|コーストウォッチャーの優先無線"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Pacific coastwatcher networks kept a single shared radio frequency clear for urgent sighting reports, and an operator who broke in with the right call sign could bump every other message in the queue, whether it was a weather report or a birthday greeting to a neighbouring island.|Las redes de vigías costeros del Pacífico mantenían una única frecuencia de radio compartida despejada para partes urgentes de avistamientos, y un operador que interrumpía con el indicativo correcto podía desplazar cualquier otro mensaje de la cola, ya fuera un parte meteorológico o una felicitación de cumpleaños a una isla vecina.|Les réseaux de guetteurs côtiers du Pacifique gardaient une unique fréquence radio partagée libre pour les signalements urgents, et un opérateur intervenant avec le bon indicatif d'appel pouvait faire passer son message avant tout autre dans la file, qu'il s'agisse d'un bulletin météo ou d'un message d'anniversaire pour une île voisine.|太平洋のコーストウォッチャー網は、緊急の目撃報告のために一つの共有周波数を空けておいた。正しい呼出符号を使って割り込む通信士は、それが気象報告であれ隣島への誕生日の挨拶であれ、順番待ちの他のすべての通信より先に割り込むことができた。",
    ),
  },
  tradewindpassage: {
    e: "⛵",
    price: 240,
    kind: "move",
    n: t("A Trade Wind Passage|Un pasaje con los vientos alisios|Une traversée par les alizés|貿易風の便"),
    d: t(
      "Carried 8–12 squares. The wind picks where you land.|Te lleva de 8 a 12 casillas. El viento elige dónde llegas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu arrives.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "Pacific voyaging canoes and trading schooners alike timed long ocean crossings to the steady south-east trade winds, sailing hard on one tack for weeks; a captain who set out against the season's prevailing wind could add months to a passage other boats made in days.|Tanto las canoas de navegación del Pacífico como las goletas comerciales cronometraban las largas travesías oceánicas con los constantes vientos alisios del sureste, navegando de bolina durante semanas; un capitán que zarpaba contra el viento predominante de la temporada podía añadir meses a una travesía que otros barcos hacían en días.|Les pirogues de voyage du Pacifique comme les goélettes commerciales calaient leurs longues traversées océaniques sur les alizés de sud-est constants, naviguant au près pendant des semaines ; un capitaine partant contre le vent dominant de la saison pouvait ajouter des mois à une traversée que d'autres bateaux bouclaient en quelques jours.|太平洋の航海カヌーも交易用のスクーナー船も、安定した南東貿易風に合わせて長い外洋横断の時期を選び、何週間も同じ帆走りで進んだ。その季節に卓越する風に逆らって出航した船長は、他の船なら数日で終える航海に、何か月も余計にかかることもあった。",
    ),
  },
  steamerticket: {
    e: "🚢",
    price: 360,
    kind: "pre",
    n: t("An Inter-Island Steamer Ticket|Un billete de vapor interinsular|Un billet de vapeur inter-îles|島間定期船の切符"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "From the 1880s, trading companies ran the Pacific's first fixed inter-island steamer timetables, connecting scattered ports on a published schedule rather than whenever a captain happened to have a full cargo hold, a change that let islanders plan a journey in advance for the first time.|Desde la década de 1880, las compañías comerciales gestionaron los primeros horarios fijos de vapores interinsulares del Pacífico, conectando puertos dispersos según un calendario publicado en vez de cuando un capitán tuviera la bodega llena, un cambio que permitió a los isleños planear un viaje con antelación por primera vez.|Dès les années 1880, des compagnies commerciales exploitèrent les premiers horaires fixes de vapeurs inter-îles du Pacifique, reliant des ports dispersés selon un calendrier publié plutôt qu'au gré du moment où la cale d'un capitaine se trouvait pleine, un changement qui permit pour la première fois aux insulaires de planifier un voyage à l'avance.|1880年代から、交易会社は太平洋で初めて島間定期船の固定時刻表を運航するようになった。船長の貨物室がたまたま満載になったときではなく、公表された予定に沿って点在する港を結ぶこの変化は、島の人々が初めて旅程をあらかじめ計画できるようにした。",
    ),
  },
  pandanuscharm: {
    e: "🍃",
    price: 300,
    kind: "passive",
    n: t("A Woven Storm Charm|Un amuleto tejido contra tormentas|Un talisman tissé contre les tempêtes|編んだ嵐除けの護符"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Woven pandanus-leaf or coconut-frond charms, hung from a canoe's mast or a house's doorway across many Pacific islands, were renewed before each cyclone season by hands practised enough to finish one in minutes, the weaving itself treated as much of the protection as the finished object.|Los amuletos tejidos con hoja de pándano u hoja de coco, colgados del mástil de una canoa o del umbral de una casa en muchas islas del Pacífico, se renovaban antes de cada temporada de ciclones por manos lo bastante expertas para terminar uno en minutos, y el propio tejido se consideraba tan protector como el objeto acabado.|Les talismans tissés en feuille de pandanus ou en palme de coco, suspendus au mât d'une pirogue ou au seuil d'une maison dans de nombreuses îles du Pacifique, étaient renouvelés avant chaque saison cyclonique par des mains assez expertes pour en achever un en quelques minutes, le tissage lui-même étant considéré comme protecteur autant que l'objet fini.|太平洋の多くの島々で、タコノキの葉やヤシの葉で編んだ護符がカヌーのマストや家の戸口に吊るされ、サイクロンの季節が来るたびに、数分で編み上げられるほど熟練した手によって編み直された。編む行為そのものが、出来上がった品と同じくらい魔除けの力を持つとされた。",
    ),
  },
  shellmoneystring: {
    e: "🐚",
    price: 300,
    kind: "pre",
    n: t("A String of Shell Money|Una sarta de dinero de conchas|Un collier de monnaie de coquillages|貝貨の紐"),
    d: t(
      "Sell it on and take the money.|Véndelo y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "In parts of Melanesia, thousands of tiny shell discs ground down by hand and threaded into long strings still function as a recognised store of value for bride price and major customary payments, exchangeable for cash at a rate village elders, not any bank, agree on.|En partes de Melanesia, miles de diminutos discos de concha desgastados a mano y ensartados en largas tiras todavía funcionan como reserva de valor reconocida para el precio de la novia y grandes pagos consuetudinarios, canjeables por dinero a una tasa que acuerdan los ancianos del pueblo, no ningún banco.|Dans certaines parties de la Mélanésie, des milliers de minuscules disques de coquillage polis à la main et enfilés en longues cordelettes servent encore de réserve de valeur reconnue pour le prix de la fiancée et les grands paiements coutumiers, échangeables contre de l'argent à un taux que fixent les anciens du village, non une banque.|メラネシアの一部では、手で磨いた何千もの小さな貝の円盤を長い紐に通したものが、いまも婚資や重要な慣習的支払いのための価値の貯蔵手段として通用しており、銀行ではなく村の長老たちが合意した相場で現金に換えることができる。",
    ),
  },
  starcompasschart: {
    e: "⭐",
    price: 130,
    kind: "passive",
    n: t("A Star Compass Memory-Chart|Una carta mental de la brújula de estrellas|Une carte mémorielle de la boussole d'étoiles|星のコンパスの記憶図"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Master navigators trained apprentices for years to hold an entire star compass, wave pattern and swell direction in memory rather than on paper, since a chart could be lost overboard but nothing written on the mind could wash away mid-ocean.|Los maestros navegantes entrenaban a sus aprendices durante años para retener en la memoria, y no en papel, toda una brújula de estrellas, el patrón de las olas y la dirección de la mar de fondo, ya que una carta podía perderse por la borda, pero nada escrito en la mente podía borrarse en medio del océano.|Les maîtres navigateurs formaient leurs apprentis pendant des années à retenir de mémoire, plutôt que sur le papier, toute une boussole d'étoiles, le motif des vagues et la direction de la houle, une carte pouvant se perdre par-dessus bord, mais rien de ce qui était gravé dans l'esprit ne pouvait s'effacer en pleine mer.|熟練の航海長は何年もかけて弟子たちを鍛え、星のコンパスや波のうねり、swell(うねり)の向き全体を紙にではなく記憶に刻み込ませた。海図は海に落として失うことがあっても、心に刻まれたものは大洋の真ん中で洗い流されることが無いからである。",
    ),
  },
  coprasack: {
    e: "🥥",
    price: 300,
    kind: "pre",
    n: t("A Sack of Copra|Un saco de copra|Un sac de coprah|コプラの袋"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Dried coconut meat, or copra, pressed for oil and once shipped from nearly every inhabited Pacific island, was for a century the one cash crop small enough for a single family's grove to produce and valuable enough for a passing trading schooner to always want to buy.|La pulpa de coco seca, o copra, prensada para obtener aceite y antaño embarcada desde casi todas las islas habitadas del Pacífico, fue durante un siglo el único cultivo comercial lo bastante pequeño como para que lo produjera el cocotal de una sola familia y lo bastante valioso como para que una goleta comercial de paso siempre quisiera comprarlo.|La pulpe de coco séchée, ou coprah, pressée pour son huile et autrefois expédiée depuis presque toutes les îles habitées du Pacifique, fut pendant un siècle l'unique culture de rente assez modeste pour être produite par la cocoteraie d'une seule famille et assez précieuse pour qu'une goélette commerciale de passage veuille toujours l'acheter.|乾燥させたヤシの実の果肉、コプラは、油を搾るために使われ、かつては太平洋のほとんどすべての有人島から積み出されていた。一世紀にわたり、一家族のヤシ林だけで生産できるほど小さな規模でありながら、通りがかりの交易スクーナー船がいつでも買いたがるほどの価値を持つ、唯一の換金作物だった。",
    ),
  },
  phosphatemanifest: {
    e: "🪨",
    price: 640,
    kind: "pre",
    n: t("A Phosphate Freight Manifest|Un manifiesto de carga de fosfato|Un manifeste de fret de phosphate|燐鉱貨物目録"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The bulk carriers that once queued off Nauru and Banaba to load phosphate were, tonne for tonne, some of the largest cargo movements ever mounted for islands that small, each ship hauling away in a single visit more rock than the mine that fed it could ever put back.|Los graneleros que antes hacían cola frente a Nauru y Banaba para cargar fosfato fueron, tonelada por tonelada, algunos de los mayores movimientos de carga jamás organizados para islas tan pequeñas, cada barco se llevaba en una sola visita más roca de la que la mina que lo alimentaba podría devolver jamás.|Les vraquiers qui faisaient jadis la queue au large de Nauru et de Banaba pour charger le phosphate figuraient, tonne pour tonne, parmi les plus grands mouvements de fret jamais organisés pour des îles aussi petites, chaque navire emportant en une seule escale plus de roche que la mine qui l'alimentait ne pourrait jamais en restituer.|かつてナウルとバナバの沖に列をなして燐鉱石を積み込んだ大型ばら積み船は、トン数で見れば、これほど小さな島のために組まれた貨物輸送としては最大級のものだった。一隻の船が一度の寄港で運び去る岩石の量は、それを供給する鉱山が二度と埋め合わせられないほどだった。",
    ),
  },
  reefflare: {
    e: "🏮",
    price: 480,
    kind: "pre",
    n: t("A Reef Passage Flare|Una bengala para el paso del arrecife|Une fusée pour la passe du récif|礁の水路の信号灯"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "The narrow gaps in a fringing reef where a boat can safely cross into a lagoon shift with every storm and every season's coral growth, so island pilots keep a hand flare ready to burn on the bow, signalling a following boat exactly where the safe water still runs.|Los estrechos huecos en un arrecife franjeante por donde un barco puede cruzar con seguridad hasta una laguna cambian con cada tormenta y con el crecimiento del coral de cada temporada, así que los prácticos de la isla mantienen una bengala de mano lista para encenderla en la proa, señalando a un barco que le sigue exactamente por dónde sigue habiendo agua segura.|Les étroites brèches d'un récif frangeant par où un bateau peut franchir sans risque jusqu'à un lagon se déplacent à chaque tempête et avec la croissance corallienne de chaque saison, si bien que les pilotes insulaires gardent une fusée à main prête à brûler à la proue, signalant à un bateau suivant exactement où l'eau sûre passe encore.|裾礁にある、船が安全に礁湖へ渡れる狭い切れ目は、嵐のたびに、また季節ごとの珊瑚の成長のたびに位置を変える。そのため島の水先案内人は、後ろに続く船へ安全な水路がいまどこにあるかを正確に示すため、船首で焚く手持ちの発煙筒を用意している。",
    ),
  },
};

/**
 * 厄災の神。特定の一国の民話を「大陸全体の伝承」として語らないよう、この大陸の
 * 事実(補給船が来ると約束された日に来ないことがある)そのものにまつわる幽霊船の
 * 噂という形にした(アフリカ盤面の「繋がらなかった線」・アジア盤面の
 * 「時刻表に無い列車」と同じ扱い方)。
 */
export const OCEANIA_SPIRIT = {
  e: "🚢",
  n: t("The Boat That Never Comes|El barco que nunca llega|Le bateau qui n'arrive jamais|まだ来ない船"),
  big: t("The Boat That Never Comes' Long Wait|La larga espera del barco que nunca llega|La longue attente du bateau qui n'arrive jamais|まだ来ない船の長い足止め"),
  ward: "pandanuscharm",
  arrive: t(
    "<b>🚢 A light shows on the horizon, exactly where the supply schedule says a boat should be.</b> On a dozen different islands, people swap some version of the same story: a ship running a route some long-defunct trading company once promised and never quite kept, its cargo manifest listing goods for a delivery that was due generations ago. It now keeps pace with <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🚢 Una luz aparece en el horizonte, justo donde el calendario de suministros dice que debería estar un barco.</b> En una docena de islas distintas, la gente se cuenta alguna versión de la misma historia: un barco que recorre una ruta que alguna compañía comercial hace mucho desaparecida prometió una vez y nunca llegó a cumplir del todo, con un manifiesto de carga que enumera mercancías para una entrega que debía llegar generaciones atrás. Ahora marcha a la par de <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🚢 Une lumière apparaît à l'horizon, exactement là où le calendrier de ravitaillement dit qu'un bateau devrait être.</b> Sur une douzaine d'îles différentes, les gens se racontent une version ou une autre de la même histoire : un navire suivant une route qu'une compagnie commerciale depuis longtemps disparue avait un jour promise et n'a jamais tout à fait tenue, son manifeste de cargaison énumérant des marchandises pour une livraison due il y a des générations. Il roule désormais au même rythme que <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|補給の予定表が「いま船が来るはずだ」と告げる場所に、ちょうど灯りが一つ見える。十いくつもの違う島で、人々は似たような話を語り継いでいる。とうに無くなった交易会社がかつて約束し、ついに守られなかった航路を走る船だという。その積荷目録には、何世代も前に届くはずだった品物が並んでいる。いまは目的地から最も遠い <b>{0}</b> と歩調を合わせ、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🚢 <b>The boat that never comes</b> shifts and now runs alongside <b>{0}</b>, farthest from {1}.|🚢 <b>El barco que nunca llega</b> se desplaza y ahora circula junto a <b>{0}</b>, el más lejano de {1}.|🚢 <b>Le bateau qui n'arrive jamais</b> se déplace et longe désormais <b>{0}</b>, le plus loin de {1}.|🚢 <b>まだ来ない船</b> は場所を移し、{1} から最も遠い <b>{0}</b> の隣を進んでいる。",
  ),
  wake: t(
    "<b>{0}</b> has travelled four turns beside the phantom light and it has never once pulled ahead or fallen back. A ship's bell rings from a hull nobody can quite make out, flying a trading company's flag that stopped being issued decades ago — <b>the Boat That Never Comes' Long Wait</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto a la luz fantasma y esta no se ha adelantado ni atrasado ni una vez. Suena la campana de un barco cuyo casco nadie logra distinguir bien, izando la bandera de una compañía comercial que dejó de expedirse hace décadas: empieza <b>la larga espera del barco que nunca llega</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> voyage depuis quatre tours à côté de la lumière fantôme, qui n'a jamais pris ni de l'avance ni du retard. Une cloche de navire résonne depuis une coque que personne ne distingue vraiment, arborant le pavillon d'une compagnie commerciale qui a cessé d'être délivré il y a des décennies — <b>la longue attente du bateau qui n'arrive jamais</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもその幻の灯りと並んで進んでいながら、一度も前に出ることも遅れることもなかった。誰の目にもよく見えない船体から鐘の音が響き、何十年も前に発行が止まった交易会社の旗を掲げている。<b>まだ来ない船の長い足止め</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> 19th- and 20th-century Pacific trading companies published inter-island shipping schedules that were, in practice, often wildly unreliable, and several remote atolls today still depend on a single monthly or quarterly supply vessel whose arrival can slip by weeks.|<b>Tras la historia:</b> las compañías comerciales del Pacífico de los siglos XIX y XX publicaban calendarios de transporte interinsular que, en la práctica, a menudo eran enormemente poco fiables, y varios atolones remotos siguen dependiendo hoy de un único buque de suministro mensual o trimestral cuya llegada puede retrasarse semanas.|<b>Derrière l'histoire :</b> les compagnies commerciales du Pacifique des XIXe et XXe siècles publiaient des horaires de navigation inter-îles qui, en pratique, étaient souvent très peu fiables, et plusieurs atolls isolés dépendent encore aujourd'hui d'un unique navire de ravitaillement mensuel ou trimestriel dont l'arrivée peut accuser des semaines de retard.|<b>物語の背景:</b> 19〜20世紀の太平洋の交易会社は島間の運航予定表を公表していたが、実際にはひどく当てにならないことが多かった。今日でも複数の遠隔の環礁は、月一回か四半期に一回だけの補給船に頼っており、その到着は何週間もずれ込むことがある。",
  ),
  pleased: t(
    "A lamp swings from an unseen hand as the phantom light runs alongside, and something is set down on the deck rail before it fades — a handful of coins, still warm from a pocket. <b>{0}</b> gains <span class='money'>+{1}</span>.|Un farol se balancea desde una mano invisible mientras la luz fantasma corre al lado, y algo se deja en la barandilla de cubierta antes de desvanecerse: un puñado de monedas, todavía calientes de un bolsillo. <b>{0}</b> gana <span class='money'>+{1}</span>.|Une lanterne se balance depuis une main invisible tandis que la lumière fantôme longe le bateau, et quelque chose est déposé sur le bastingage avant de s'estomper — une poignée de pièces, encore chaudes d'une poche. <b>{0}</b> gagne <span class='money'>+{1}</span>.|幻の灯りが並んで進む間、見えない手が提灯を揺らし、消える前に甲板の手すりの上に何かを置いた。まだポケットの温もりが残る硬貨の束だった。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A woven charm swings gently just off the bow, and the phantom light fades instead of nearing, passing <b>{0}</b> by without slowing this turn.|Un amuleto tejido se balancea suavemente junto a la proa, y la luz fantasma se apaga en vez de acercarse, y pasa de largo junto a <b>{0}</b> sin frenar esta vuelta.|Un talisman tissé se balance doucement près de la proue, et la lumière fantôme s'estompe au lieu de se rapprocher, passant devant <b>{0}</b> sans ralentir ce tour-ci.|編んだ護符が船首のそばで静かに揺れると、幻の灯りは近づく代わりに遠ざかり、このターンは速度を落とさぬまま <b>{0}</b> の前を通り過ぎた。",
  ),
};

/** 災難7種。島から島への移動そのものの弱さ・気候・生態系管理につきものの遅れと厄介ごと。 */
export const OCEANIA_DOOM = [
  {
    id: "cyclonehalt",
    n: t("A cyclone closes every harbour at once|Un ciclón cierra todos los puertos a la vez|Un cyclone ferme tous les ports à la fois|サイクロンがすべての港を一斉に閉ざす"),
    t: t(
      "The barometer drops all afternoon and the harbourmaster runs up the storm cone before dusk, ordering every vessel still at sea to make for the nearest safe anchorage; inter-island sailings across the whole region are suspended until the all-clear, sometimes for the better part of a week.|El barómetro baja toda la tarde y el capitán de puerto iza el cono de tormenta antes del anochecer, ordenando a todo barco que aún esté en el mar que se dirija al fondeadero seguro más cercano; las travesías interinsulares de toda la región quedan suspendidas hasta el aviso de fin de alerta, a veces durante buena parte de una semana.|Le baromètre chute tout l'après-midi et le capitaine de port hisse le cône de tempête avant la tombée de la nuit, ordonnant à tout navire encore en mer de gagner le mouillage sûr le plus proche ; les liaisons inter-îles de toute la région sont suspendues jusqu'à la fin d'alerte, parfois pendant une bonne partie d'une semaine.|午後じゅう気圧計が下がり続け、日暮れ前に港長は暴風警戒標識を掲げ、まだ海上にいるすべての船に最寄りの安全な錨地へ向かうよう命じる。地域全体の島間の便は警報解除まで運休となり、ときには一週間近くにも及ぶ。",
    ),
    regions: ["mel", "pol"],
  },
  {
    id: "kingtideflood",
    n: t("A king tide floods the only runway|Una marea viva inunda la única pista|Une grande marée inonde l'unique piste|大潮が唯一の滑走路を水没させる"),
    t: t(
      "The highest tide of the year climbs over the sea wall before dawn and finds the atoll's runway, its only paved surface of any kind, sitting under ankle-deep water; the day's single scheduled flight is cancelled while ground crews wait for the water to recede enough to check for damage.|La marea más alta del año sube por encima del dique marino antes del amanecer y encuentra la pista del atolón, su única superficie pavimentada de cualquier tipo, bajo agua hasta el tobillo; el único vuelo programado del día se cancela mientras el personal de tierra espera a que el agua baje lo suficiente para comprobar los daños.|La marée la plus haute de l'année passe par-dessus la digue avant l'aube et trouve la piste de l'atoll, sa seule surface pavée de quelque nature que ce soit, sous quelques centimètres d'eau ; l'unique vol programmé du jour est annulé pendant que le personnel au sol attend que l'eau se retire assez pour vérifier les dégâts.|その年最大の大潮が夜明け前に護岸を越え、環礁で唯一の舗装面である滑走路がくるぶしの深さの水に浸かっているのが見つかる。地上係員が損傷を確認できるほど水が引くのを待つ間、その日のたった一便の定期便は欠航になる。",
    ),
    regions: ["mic", "pol"],
  },
  {
    id: "ashfallground",
    n: t("Volcanic ash grounds every flight|La ceniza volcánica deja en tierra todos los vuelos|Les cendres volcaniques clouent tous les vols au sol|火山灰がすべての便を欠航させる",
    ),
    t: t(
      "A sudden eruption sends a column of fine grey ash drifting downwind across the shipping lanes and the airstrip alike, and airlines ground every aircraft on the route rather than risk the ash scouring their engines, leaving passengers and freight stacked up at the terminal until the plume finally clears.|Una erupción repentina envía una columna de ceniza gris fina a la deriva a favor del viento a través de las rutas marítimas y la pista por igual, y las aerolíneas dejan en tierra todas las aeronaves de la ruta en vez de arriesgarse a que la ceniza desgaste sus motores, dejando a pasajeros y carga amontonados en la terminal hasta que la columna por fin se disipa.|Une éruption soudaine envoie une colonne de cendres grises fines dériver sous le vent à travers les routes maritimes comme la piste d'atterrissage, et les compagnies aériennes clouent au sol tout appareil de la ligne plutôt que de risquer que les cendres n'érodent leurs moteurs, laissant passagers et fret s'entasser au terminal jusqu'à ce que le panache se dissipe enfin.|突然の噴火が細かい灰色の火山灰の柱を風下へ流し、航路にも滑走路にも降りかかる。航空会社はエンジンが灰で傷むのを避けるため、この路線の便をすべて欠航させ、噴煙がようやく収まるまで乗客と貨物はターミナルに積み上がったままになる。",
    ),
    regions: ["mel"],
  },
  {
    id: "reefstrand",
    n: t("An uncharted coral head holes the hull|Una cabeza de coral no cartografiada perfora el casco|Une tête de corail non cartographiée perce la coque|海図に無い珊瑚の頭が船体に穴を開ける"),
    t: t(
      "A patch of coral grown up since the last survey scrapes the hull in water everyone thought they knew, and the crew spends the night bailing and radioing for a tow rather than making the next port on schedule as planned.|Una mancha de coral crecida desde el último levantamiento raspa el casco en aguas que todos creían conocer, y la tripulación pasa la noche achicando agua y pidiendo remolque por radio en vez de llegar al siguiente puerto según lo previsto.|Une plaque de corail poussée depuis le dernier relevé racle la coque dans des eaux que tout le monde croyait connaître, et l'équipage passe la nuit à écoper et à appeler un remorquage par radio plutôt que de rallier le port suivant comme prévu.|前回の測量以降に育った珊瑚の一角が、誰もが知り尽くしていると思っていた海域で船体をこすり、乗組員は予定どおり次の港に着く代わりに、一晩中排水し無線で曳航を呼び続けることになる。",
    ),
    regions: ["mel", "mic"],
  },
  {
    id: "biosecurityhold",
    n: t("Quarantine holds every crate at the wharf|La cuarentena retiene todas las cajas en el muelle|La quarantaine retient toutes les caisses au quai|検疫がすべての木箱を波止場で足止めする"),
    t: t(
      "An inspector finds an insect nobody can immediately name inside a crate of produce and, rather than risk it establishing itself on an island with no natural predator for it, holds the entire shipment at the wharf until a specialist can be flown in to identify it.|Un inspector encuentra dentro de una caja de productos un insecto que nadie sabe nombrar de inmediato y, en vez de arriesgarse a que se establezca en una isla sin depredador natural para él, retiene todo el cargamento en el muelle hasta que se pueda traer en avión a un especialista para identificarlo.|Un inspecteur trouve dans une caisse de produits un insecte que personne ne sait nommer sur-le-champ et, plutôt que de risquer qu'il s'installe sur une île sans prédateur naturel pour lui, retient toute la cargaison au quai jusqu'à ce qu'un spécialiste puisse être amené par avion pour l'identifier.|検査官が農産物の木箱の中に、誰もすぐには名前を言えない虫を見つける。天敵のいない島でそれが定着する危険を冒すよりはと、専門家が空輸されて同定できるまで、荷物全体が波止場で留め置かれる。",
    ),
    regions: ["mel", "mic", "pol"],
  },
  {
    id: "islandhopperfog",
    n: t("Fog grounds the week's only flight|La niebla deja en tierra el único vuelo de la semana|Le brouillard cloue au sol l'unique vol de la semaine|霧がその週唯一の便を欠航させる"),
    t: t(
      "Low cloud sits over the runway all morning and the week's single scheduled flight, already routed through three other islands before reaching this one, is diverted rather than risk a landing, meaning the next chance to catch it is a full week away.|Una nube baja cubre la pista toda la mañana y el único vuelo programado de la semana, que ya pasaba por otras tres islas antes de llegar a esta, se desvía en vez de arriesgar un aterrizaje, lo que significa que la próxima oportunidad de tomarlo está a una semana entera.|Un nuage bas recouvre la piste toute la matinée et l'unique vol programmé de la semaine, déjà passé par trois autres îles avant d'atteindre celle-ci, est dérouté plutôt que de risquer un atterrissage, ce qui signifie que la prochaine occasion de le prendre est dans une semaine entière.|朝じゅう低い雲が滑走路を覆い、すでに他の三つの島を経由してこの島にたどり着くはずだったその週唯一の定期便は、着陸を試みる代わりに迂回する。次にこの便に乗れる機会は、まる一週間先になる。",
    ),
    regions: ["mic"],
  },
  {
    id: "supplyshipslip",
    n: t("The quarterly supply ship slips its schedule|El barco de suministro trimestral se retrasa|Le navire de ravitaillement trimestriel accuse du retard|四半期に一度の補給船が予定をずらす"),
    t: t(
      "Word comes over the radio that the supply vessel, already running late after a breakdown two ports back, will not make this stop for at least another month, and the general store's shelves, thin since the last visit, will have to stretch further still.|Llega por radio la noticia de que el buque de suministro, ya retrasado tras una avería dos puertos atrás, no hará esta escala hasta dentro de al menos un mes más, y los estantes del almacén general, ya escasos desde la última visita, tendrán que estirarse aún más.|La radio annonce que le navire de ravitaillement, déjà en retard après une panne deux ports plus tôt, ne fera pas cette escale avant au moins un mois de plus, et les rayons du magasin général, déjà clairsemés depuis la dernière visite, devront encore tenir plus longtemps.|無線で、二つ前の港での故障ですでに遅れている補給船が、少なくともあと一か月はこの寄港地に来られないとの知らせが入る。前回の寄港以来すでに乏しくなっていた雑貨店の棚は、さらにもちこたえなければならない。",
    ),
    regions: ["pol", "mic"],
  },
];

/**
 * 季節。4月始まりの12ヶ月。大陸盤面なので、月ごとに違う地方の気候・文化の
 * 出来事を取り上げる形にした(効果の数値は season-and-doom-rules.ts の
 * oceania の項)。
 */
export const OCEANIA_SEASONS = [
  {
    e: "🌋",
    n: t("Vanuatu's land-diving season opens with the yam harvest|La temporada de saltos de tierra de Vanuatu se abre con la cosecha de ñame|La saison du plongeon terrestre du Vanuatu s'ouvre avec la récolte de l'igname|ヤムイモの収穫とともにバヌアツの地上ダイビングの季節が始まる"),
    t: t(
      "On Pentecost Island, the vine-and-tower land-diving ritual known as Naghol begins each year as the yam harvest comes in, tying a subsistence crop's success directly to a ritual precise enough that a badly measured vine has, historically, been fatal.|En la isla Pentecostés, el ritual de salto de tierra con lianas y torres conocido como Naghol comienza cada año cuando llega la cosecha de ñame, vinculando el éxito de un cultivo de subsistencia directamente a un ritual tan preciso que una liana mal medida ha sido, históricamente, mortal.|Sur l'île de Pentecôte, le rituel de plongeon terrestre à la liane et à la tour connu sous le nom de Naghol commence chaque année à l'arrivée de la récolte de l'igname, liant directement la réussite d'une culture vivrière à un rituel assez précis pour qu'une liane mal mesurée ait, historiquement, été fatale.|ペンテコスト島では、つるとやぐらを使う地上ダイビングの儀式ナゴールが、毎年ヤムイモの収穫とともに始まる。自給作物の実りは、つるの長さを誤れば史実として死者も出るほど精密なこの儀式と直接結びついている。",
    ),
    f: t(
      "Footage of Naghol filmed in the 1950s directly inspired the modern sport of bungee jumping, though the vines used on Pentecost stretch far less than a rubber cord and are cut to a precise length for each jumper's height and the tower's own give.|Las imágenes de Naghol filmadas en la década de 1950 inspiraron directamente el deporte moderno del puenting, aunque las lianas usadas en Pentecostés se estiran mucho menos que una cuerda de goma y se cortan a una longitud precisa según la altura de cada saltador y la propia flexión de la torre.|Des images du Naghol filmées dans les années 1950 inspirèrent directement le sport moderne du saut à l'élastique, bien que les lianes utilisées à Pentecôte s'étirent bien moins qu'un cordon en caoutchouc et soient coupées à une longueur précise selon la taille de chaque sauteur et la flexibilité propre de la tour.|1950年代に撮影されたナゴールの映像は、現代のバンジージャンプという競技に直接着想を与えた。ただしペンテコスト島で使われるつるは、ゴム紐よりはるかに伸びが少なく、跳ぶ人の身長とやぐら自体のしなりに合わせて正確な長さに切られる。",
    ),
  },
  {
    e: "🌾",
    n: t("The coffee harvest reaches PNG's highlands|La cosecha de café llega a las tierras altas de PNG|La récolte de café gagne les hauts plateaux de la PNG|コーヒー収穫がパプアニューギニアの高地に及ぶ"),
    t: t(
      "Smallholder gardens across the Eastern and Western Highlands bring in the year's arabica cherries by hand, a crop introduced only in the 1950s that now supports hundreds of thousands of highland households with almost no other reliable cash income.|Los pequeños huertos de las tierras altas orientales y occidentales recogen a mano las cerezas de café arábica del año, un cultivo introducido apenas en la década de 1950 que hoy sostiene a cientos de miles de hogares de las tierras altas con casi ningún otro ingreso en efectivo fiable.|Les petites exploitations des hauts plateaux de l'Est et de l'Ouest rentrent à la main les cerises d'arabica de l'année, une culture introduite seulement dans les années 1950 qui soutient aujourd'hui des centaines de milliers de foyers des hautes terres, presque sans autre revenu monétaire fiable.|東・西ハイランド州の小規模農家は、その年のアラビカ種のコーヒーの実を手摘みで集める。1950年代にようやく導入されたこの作物は、いまや他にほとんど確かな現金収入の無い数十万の高地の世帯を支えている。",
    ),
    f: t(
      "Because most highland gardens sit above 1,500 metres and are reached only by foot track or the Highlands Highway, a single bag of parchment coffee may be carried down a mountainside on someone's back before it ever sees a truck.|Como la mayoría de los huertos de las tierras altas están por encima de los 1.500 metros y solo se llega a ellos por senderos o por la Highlands Highway, un solo saco de café pergamino puede bajarse a espaldas de alguien por la ladera de una montaña antes de ver jamás un camión.|La plupart des jardins des hautes terres se trouvant au-dessus de 1 500 mètres et n'étant accessibles que par sentier ou par la Highlands Highway, un seul sac de café en parche peut être porté à dos d'homme le long d'un versant avant même de voir un camion.|高地の畑の多くは標高1500メートルを超え、徒歩道かハイランズ・ハイウェイでしか行き来できないため、パーチメントコーヒーの袋一つがトラックに載る前に、誰かの背に担がれて山腹を下ってくることもある。",
    ),
  },
  {
    e: "🐋",
    n: t("Humpback whales arrive in Tongan waters to calve|Las ballenas jorobadas llegan a aguas tonganas para parir|Les baleines à bosse arrivent dans les eaux tonganes pour mettre bas|ザトウクジラがトンガの海に出産にやって来る"),
    t: t(
      "Migrating from Antarctic feeding grounds, hundreds of humpback whales reach Vava'u's sheltered channels this month to calve and mate, and Tonga remains one of very few places where swimming alongside them, not just watching from a boat, has long been permitted under licence.|Migrando desde las zonas de alimentación antárticas, cientos de ballenas jorobadas llegan este mes a los canales resguardados de Vava'u para parir y aparearse, y Tonga sigue siendo uno de los pocos lugares donde nadar junto a ellas, y no solo observarlas desde un barco, ha estado permitido bajo licencia durante mucho tiempo.|Migrant depuis leurs zones d'alimentation antarctiques, des centaines de baleines à bosse atteignent ce mois-ci les chenaux abrités de Vava'u pour mettre bas et s'accoupler, et les Tonga restent l'un des très rares endroits où nager à leurs côtés, et pas seulement les observer depuis un bateau, est depuis longtemps autorisé sous licence.|南極の索餌海域から回遊してきた数百頭のザトウクジラが、この月ヴァヴァウの波静かな水路に到達し、出産と交尾を行う。トンガは、船から眺めるだけでなく免許のもとでクジラと一緒に泳ぐことが長らく認められてきた、世界でも数少ない場所の一つであり続けている。",
    ),
    f: t(
      "A mother humpback fasts for most of the months she spends in Tongan waters, living off blubber built up on the Antarctic feeding grounds while she nurses a calf that gains weight fast enough to be ready for the return migration south.|Una ballena jorobada madre ayuna durante la mayor parte de los meses que pasa en aguas tonganas, viviendo de la grasa acumulada en las zonas de alimentación antárticas mientras amamanta a una cría que gana peso lo bastante rápido como para estar lista para la migración de regreso al sur.|Une baleine à bosse mère jeûne pendant la majeure partie des mois passés dans les eaux tonganes, vivant sur la graisse accumulée dans les zones d'alimentation antarctiques tandis qu'elle allaite un baleineau qui prend du poids assez vite pour être prêt pour la migration de retour vers le sud.|母ザトウクジラは、トンガの海で過ごすほとんどの月を絶食して過ごし、南極の索餌海域で蓄えた脂肪だけで、南への回遊に備えられるほど急速に体重を増やす子鯨に授乳し続ける。",
    ),
  },
  {
    e: "🌺",
    n: t("Fiji's Hibiscus Festival fills Suva's streets|El Festival del Hibisco de Fiyi llena las calles de Suva|Le Festival de l'hibiscus des Fidji envahit les rues de Suva|フィジーのハイビスカス祭りがスバの通りを埋める"),
    t: t(
      "One of the South Pacific's oldest running festivals turns Fiji's capital into a week of parades, pageants and food stalls, a tradition dating back to the 1950s that now draws visitors from across the region rather than just the capital's own suburbs.|Uno de los festivales más antiguos y continuos del Pacífico Sur convierte la capital de Fiyi en una semana de desfiles, certámenes y puestos de comida, una tradición que se remonta a la década de 1950 y que hoy atrae a visitantes de toda la región y no solo de los barrios de la propia capital.|L'un des festivals les plus anciens et toujours célébrés du Pacifique Sud transforme la capitale des Fidji en une semaine de défilés, de concours et d'étals de nourriture, une tradition remontant aux années 1950 qui attire aujourd'hui des visiteurs de toute la région et pas seulement des faubourgs de la capitale.|南太平洋でも最も長く続く祭りの一つが、フィジーの首都を一週間にわたるパレードとコンテスト、屋台の祭りに変える。1950年代に始まったこの伝統は、いまや首都の近郊住民だけでなく地域各地から人を集めている。",
    ),
    f: t(
      "The festival's centrepiece pageant crowns a Hibiscus Queen chosen from contestants representing different districts and communities, a role that has doubled for decades as an informal launching point for young women moving into public and civic life.|El certamen central del festival corona a una Reina del Hibisco elegida entre concursantes que representan a distintos distritos y comunidades, un papel que durante décadas ha servido también, de forma informal, como plataforma de lanzamiento para mujeres jóvenes que se incorporan a la vida pública y cívica.|Le concours phare du festival couronne une reine de l'hibiscus choisie parmi des candidates représentant différents districts et communautés, un rôle qui sert depuis des décennies, de façon informelle, de tremplin pour de jeunes femmes s'engageant dans la vie publique et civique.|祭りの中心となるコンテストでは、さまざまな地区や共同体を代表する候補者の中から「ハイビスカス・クイーン」が選ばれる。この役割は何十年も、若い女性が公的・市民的な活動へ踏み出す非公式な足がかりの一つにもなってきた。",
    ),
  },
  {
    e: "⛵",
    n: t("The steady trade-wind season settles over the Pacific|La estación estable de los vientos alisios se instala sobre el Pacífico|La saison stable des alizés s'installe sur le Pacifique|太平洋に安定した貿易風の季節が訪れる"),
    t: t(
      "As the austral winter sets in, the south-east trade winds settle into their most steady and predictable stretch of the year, and traditional voyaging canoes and cruising yachts alike time long open-ocean passages to take advantage of the reliable following wind.|Con la llegada del invierno austral, los vientos alisios del sureste se estabilizan en su tramo más constante y predecible del año, y tanto las canoas de navegación tradicionales como los veleros de crucero cronometran las largas travesías en mar abierto para aprovechar el viento de popa fiable.|Avec l'arrivée de l'hiver austral, les alizés de sud-est entrent dans leur période la plus stable et prévisible de l'année, et pirogues de voyage traditionnelles comme voiliers de croisière calent leurs longues traversées en haute mer pour profiter de ce vent arrière fiable.|南半球の冬が訪れると、南東貿易風は一年でもっとも安定し予測しやすい時期に入る。伝統的な航海カヌーもクルージングヨットも、この頼りになる追い風を活かして長い外洋航海の時期をこれに合わせる。",
    ),
    f: t(
      "Yacht rallies still time their annual crossings from French Polynesia toward Fiji and Vanuatu to this trade-wind window, following, in reverse, much the same seasonal logic that guided voyaging canoes across these waters for well over a thousand years.|Las regatas de veleros aún ajustan sus travesías anuales desde la Polinesia Francesa hacia Fiyi y Vanuatu a esta ventana de vientos alisios, siguiendo, a la inversa, gran parte de la misma lógica estacional que guió a las canoas de navegación por estas aguas durante más de mil años.|Les rallyes de voiliers calent encore leurs traversées annuelles depuis la Polynésie française vers les Fidji et le Vanuatu sur cette fenêtre d'alizés, suivant, à l'inverse, à peu près la même logique saisonnière qui guidait les pirogues de voyage sur ces eaux depuis plus de mille ans.|ヨットのラリーはいまも、仏領ポリネシアからフィジーやバヌアツへの毎年の航海をこの貿易風の時期に合わせている。これは、千年以上にわたってこの海域で航海カヌーを導いてきたのとほぼ同じ季節の論理を、逆方向にたどっているとも言える。",
    ),
  },
  {
    e: "🎭",
    n: t("The Goroka Show brings highland cultures together|El Goroka Show reúne a las culturas de las tierras altas|Le Goroka Show rassemble les cultures des hautes terres|ゴロカ・ショーが高地の文化を一堂に集める"),
    t: t(
      "Started in the 1950s as a small local gathering, the Goroka Show now draws dozens of highland groups, each in elaborate bilas featuring bird-of-paradise plumes and painted faces, performing sing-sing dances that were traditionally used to mark alliances between groups that might otherwise be at odds.|Iniciado en la década de 1950 como una pequeña reunión local, el Goroka Show reúne hoy a decenas de grupos de las tierras altas, cada uno con elaborados bilas con plumas de ave del paraíso y rostros pintados, ejecutando bailes sing-sing que tradicionalmente se usaban para sellar alianzas entre grupos que de otro modo podrían estar enfrentados.|Débuté dans les années 1950 comme un petit rassemblement local, le Goroka Show réunit aujourd'hui des dizaines de groupes des hautes terres, chacun paré d'un bilas élaboré aux plumes d'oiseau de paradis et aux visages peints, exécutant des danses sing-sing traditionnellement utilisées pour sceller des alliances entre groupes qui auraient pu autrement être rivaux.|1950年代に小さな地元の集まりとして始まったゴロカ・ショーには、いまや高地の数十の集団が集まり、それぞれ極楽鳥の羽根と彩色した顔による凝った装束「ビラス」をまとって、本来は対立しかねない集団どうしの同盟を示すために使われていたシングシングの踊りを披露する。",
    ),
    f: t(
      "Many of the feathers worn are strictly regulated today, since several bird-of-paradise species are protected, and dancers increasingly rely on feathers passed down through families or gathered from birds that died of natural causes rather than newly hunted ones.|Muchas de las plumas que se lucen hoy están estrictamente reguladas, ya que varias especies de aves del paraíso están protegidas, y los bailarines dependen cada vez más de plumas heredadas en la familia o recogidas de aves muertas por causas naturales en vez de recién cazadas.|Nombre des plumes portées sont aujourd'hui strictement réglementées, plusieurs espèces d'oiseaux de paradis étant protégées, et les danseurs s'appuient de plus en plus sur des plumes transmises dans les familles ou récupérées sur des oiseaux morts de causes naturelles plutôt que fraîchement chassés.|身につける羽根の多くは今日厳しく規制されている。極楽鳥の複数の種が保護対象になっているためで、踊り手たちは新たに狩った羽根ではなく、家族に代々伝わる羽根や自然死した鳥から集めた羽根にますます頼るようになっている。",
    ),
  },
  {
    e: "🌪️",
    n: t("Typhoon season peaks across the Marianas and Carolines|La temporada de tifones alcanza su punto máximo en las Marianas y las Carolinas|La saison des typhons culmine dans les Mariannes et les Carolines|マリアナ諸島とカロリン諸島で台風の季節が最盛期を迎える"),
    t: t(
      "Warm waters north of the equator spin up the year's most active stretch of typhoons, and airlines serving Guam, Saipan, Yap and Chuuk build extra buffer days into their schedules, since a single storm can ground the region's already thin flight network for days at a time.|Las aguas cálidas al norte del ecuador generan el tramo más activo del año de tifones, y las aerolíneas que sirven a Guam, Saipán, Yap y Chuuk añaden días de margen extra a sus horarios, ya que una sola tormenta puede dejar en tierra durante días la ya escasa red de vuelos de la región.|Les eaux chaudes au nord de l'équateur engendrent la période la plus active de l'année en typhons, et les compagnies aériennes desservant Guam, Saipan, Yap et Chuuk ajoutent des jours de marge supplémentaires à leurs horaires, une seule tempête pouvant clouer au sol pendant des jours le réseau de vols déjà ténu de la région.|赤道より北の暖かい海水が、一年でもっとも台風の活動が盛んな時期を生み出す。グアム・サイパン・ヤップ・チュークを結ぶ航空会社は運航予定に余分な予備日を組み込む。たった一つの嵐で、ただでさえ便数の少ないこの地域の航空網が何日も止まりかねないからである。",
    ),
    f: t(
      "The Western Pacific typhoon season overlaps only partially with the South Pacific's cyclone season on the other side of the equator, since the two hemispheres experience their storm-friendly warm season roughly six months apart.|La temporada de tifones del Pacífico occidental se solapa solo parcialmente con la temporada de ciclones del Pacífico Sur al otro lado del ecuador, ya que los dos hemisferios viven su temporada cálida favorable a las tormentas con unos seis meses de diferencia.|La saison des typhons du Pacifique occidental ne chevauche que partiellement la saison des cyclones du Pacifique Sud de l'autre côté de l'équateur, les deux hémisphères connaissant leur saison chaude propice aux tempêtes à environ six mois d'intervalle.|西太平洋の台風シーズンは、赤道の反対側にある南太平洋のサイクロンシーズンと部分的にしか重ならない。南北両半球では、嵐が起きやすい暖かい季節がおよそ半年ずれているためである。",
    ),
  },
  {
    e: "🐢",
    n: t("Sea turtles come ashore to nest on Pacific beaches|Las tortugas marinas salen a la playa a anidar en las costas del Pacífico|Les tortues marines viennent nidifier sur les plages du Pacifique|ウミガメが太平洋の浜辺に上陸し産卵する"),
    t: t(
      "Green and hawksbill turtles haul themselves up remote beaches after dark this month to dig nest chambers and lay clutches of over a hundred eggs, returning to lay again several times in a season before swimming back to feeding grounds that can be thousands of kilometres away.|Las tortugas verdes y las carey se arrastran de noche este mes hasta playas remotas para excavar cámaras de nido y poner puestas de más de cien huevos, y regresan a poner varias veces más en una temporada antes de nadar de vuelta a zonas de alimentación que pueden estar a miles de kilómetros.|Les tortues vertes et les tortues imbriquées se hissent ce mois-ci sur des plages isolées après la tombée de la nuit pour creuser des chambres de ponte et déposer des couvées de plus de cent œufs, revenant pondre plusieurs fois encore au cours d'une saison avant de regagner à la nage des zones d'alimentation parfois distantes de milliers de kilomètres.|アオウミガメとタイマイは、この月の夜になると人里離れた浜辺へ這い上がり、産卵室を掘って100個を超える卵を産み付ける。同じ季節に何度か産卵を繰り返したのち、時に数千キロも離れた索餌海域へ泳いで戻っていく。",
    ),
    f: t(
      "The temperature of the sand around a clutch of eggs determines the hatchlings' sex, with warmer nests producing more females, a mechanism that makes turtle nesting beaches especially sensitive indicators of long-term warming trends.|La temperatura de la arena alrededor de una puesta de huevos determina el sexo de las crías, y los nidos más cálidos producen más hembras, un mecanismo que convierte a las playas de anidación de tortugas en indicadores especialmente sensibles de las tendencias de calentamiento a largo plazo.|La température du sable autour d'une couvée d'œufs détermine le sexe des tortillons, les nids plus chauds produisant davantage de femelles, un mécanisme qui fait des plages de ponte des tortues des indicateurs particulièrement sensibles des tendances de réchauffement à long terme.|卵塊の周りの砂の温度が孵化する子ガメの性別を左右し、暖かい巣ほどメスが多く生まれる。この仕組みのため、ウミガメの産卵浜は長期的な温暖化の傾向を映す特に敏感な指標になっている。",
    ),
  },
  {
    e: "🥥",
    n: t("The copra harvest fills village drying racks|La cosecha de copra llena los secaderos de las aldeas|La récolte de coprah remplit les claies de séchage des villages|コプラの収穫が村の乾燥棚を埋める"),
    t: t(
      "Families across many low-lying islands split and dry coconut meat over smoky racks this month, still the surest way for a household with no other cash crop to earn money for school fees, fuel and store-bought goods when the trading boat next calls.|Las familias de muchas islas bajas parten y secan la pulpa de coco sobre secaderos humeantes este mes, todavía la forma más segura de que un hogar sin otro cultivo comercial gane dinero para las cuotas escolares, el combustible y los productos comprados en la tienda cuando llegue el próximo barco comercial.|Les familles de nombreuses îles basses fendent et font sécher la pulpe de coco sur des claies fumantes ce mois-ci, toujours le moyen le plus sûr pour un foyer sans autre culture de rente de gagner de l'argent pour les frais de scolarité, le carburant et les produits achetés en magasin lors du prochain passage du bateau commercial.|多くの低平な島々では、この月になると各家庭が煙でいぶす乾燥棚の上でヤシの実の果肉を割って干す。これはいまも、他に換金作物の無い世帯が、次に交易船が来たときの学費・燃料・購入品のための現金を得る最も確かな方法である。",
    ),
    f: t(
      "World copra and coconut-oil prices, set on markets thousands of kilometres away, can double or halve a family's seasonal income year to year with no change at all in how much coconut they actually harvest.|Los precios mundiales de la copra y el aceite de coco, fijados en mercados a miles de kilómetros de distancia, pueden duplicar o reducir a la mitad los ingresos estacionales de una familia de un año a otro sin ningún cambio en la cantidad de coco que realmente cosechan.|Les prix mondiaux du coprah et de l'huile de coco, fixés sur des marchés à des milliers de kilomètres, peuvent doubler ou diviser par deux le revenu saisonnier d'une famille d'une année sur l'autre sans qu'elle ne change en rien la quantité de coco réellement récoltée.|何千キロも離れた市場で決まる世界のコプラ・ヤシ油価格は、実際に収穫するヤシの実の量がまったく変わらなくても、一家の季節ごとの収入を年によって倍にも半分にもしうる。",
    ),
  },
  {
    e: "🐦",
    n: t("Seabirds crowd remote atolls to nest|Las aves marinas colman atolones remotos para anidar|Les oiseaux marins envahissent des atolls isolés pour nidifier|海鳥が人里離れた環礁に群がり営巣する"),
    t: t(
      "Frigatebirds, boobies and terns crowd onto low, predator-free atolls this month in colonies numbering in the tens of thousands, turning uninhabited islets briefly into some of the noisiest, most tightly packed nesting grounds anywhere on Earth.|Fragatas, piqueros y charranes se agolpan este mes en atolones bajos y sin depredadores en colonias que suman decenas de miles, convirtiendo brevemente a islotes deshabitados en algunos de los terrenos de anidación más ruidosos y densamente poblados de la Tierra.|Frégates, fous et sternes s'agglutinent ce mois-ci sur des atolls bas et sans prédateurs en colonies comptant des dizaines de milliers d'individus, transformant brièvement des îlots inhabités en l'un des sites de nidification les plus bruyants et les plus denses de la planète.|グンカンドリやカツオドリ、アジサシがこの月、捕食者のいない低い環礁に数万羽規模の群れをなして集まり、無人の小島を一時的に、地球上でも指折りやかましく密集した営巣地に変える。",
    ),
    f: t(
      "In Nauruan and several other Pacific traditions, capturing and later releasing a frigatebird has long marked a young person's coming of age, a practice distinct from and older than the bird's more recent role as a printed national symbol.|En la tradición nauruana y varias otras del Pacífico, capturar y luego soltar una fragata ha marcado durante mucho tiempo la mayoría de edad de un joven, una práctica distinta y más antigua que el papel más reciente del ave como símbolo nacional impreso.|Dans la tradition nauruane et plusieurs autres traditions du Pacifique, capturer puis relâcher une frégate a longtemps marqué le passage à l'âge adulte d'un jeune, une pratique distincte et plus ancienne que le rôle plus récent de l'oiseau comme symbole national imprimé.|ナウルをはじめ太平洋のいくつかの伝統では、グンカンドリを捕らえて後に放つことが、長らく若者の成人を示す儀礼とされてきた。これは、この鳥がのちに国の印刷物上の象徴となった役割とは別の、より古い習わしである。",
    ),
  },
  {
    e: "🎣",
    n: t("The skipjack tuna season draws distant-water fleets|La temporada del atún listado atrae a flotas de aguas distantes|La saison du thon listao attire les flottes hauturières|カツオの漁期が遠洋漁船団を引き寄せる"),
    t: t(
      "Warm, nutrient-rich waters bring skipjack tuna schools within reach of purse-seine fleets this month, and foreign vessels holding vessel-day licences under the regional Parties to the Nauru Agreement scheme converge on the best fishing grounds before the window closes.|Aguas cálidas y ricas en nutrientes ponen a los bancos de atún listado al alcance de las flotas de cerco este mes, y los buques extranjeros con licencias de días de pesca del régimen regional de las Partes en el Acuerdo de Nauru convergen en los mejores caladeros antes de que se cierre la ventana.|Des eaux chaudes et riches en nutriments mettent les bancs de thon listao à portée des flottes senneuses ce mois-ci, et les navires étrangers détenteurs de licences de jours de pêche dans le cadre régional des Parties à l'Accord de Nauru convergent vers les meilleures zones de pêche avant la fermeture de la fenêtre.|栄養豊富な暖かい海水が、この月カツオの群れを巻き網漁船団の届く範囲に呼び寄せる。ナウル協定当事国(PNA)の地域枠組みのもとで操業日数のライセンスを持つ外国船団は、漁期が終わる前に最良の漁場へと集まってくる。",
    ),
    f: t(
      "The PNA's vessel-day system lets member states set a joint minimum price for fishing days rather than compete to undercut one another, a change credited with sharply raising the revenue small Pacific nations earn from foreign tuna fleets since it began.|El sistema de días de pesca de la PNA permite a los Estados miembros fijar un precio mínimo conjunto por día de pesca en vez de competir a la baja entre sí, un cambio al que se atribuye haber elevado notablemente los ingresos que las pequeñas naciones del Pacífico obtienen de las flotas atuneras extranjeras desde que comenzó.|Le système de jours de pêche de la PNA permet aux États membres de fixer un prix minimum commun par jour de pêche plutôt que de se faire concurrence à la baisse, un changement auquel on attribue une nette hausse des revenus que les petites nations du Pacifique tirent des flottes thonières étrangères depuis sa mise en place.|PNAの操業日数制度は、加盟国が値下げ競争をする代わりに漁の日数の共同最低価格を設定できるようにするもので、この制度が始まって以来、太平洋の小国が外国のマグロ漁船団から得る収入を大きく引き上げたとされている。",
    ),
  },
  {
    e: "🍞",
    n: t("A breadfruit glut forces a rush to preserve the surplus|Una abundancia de fruto del pan obliga a apresurarse a conservar el excedente|Une abondance de fruits de l'arbre à pain force à se hâter de conserver le surplus|パンノキの豊作が余剰の保存を急がせる"),
    t: t(
      "Breadfruit trees across many islands fruit heavily but briefly this month, dropping far more than any household can eat fresh, so families work through the surplus by pit-fermenting it into a sour paste that can be dug up and eaten many months later.|Los árboles del pan de muchas islas fructifican con fuerza pero brevemente este mes, dando mucho más de lo que cualquier hogar puede comer fresco, así que las familias procesan el excedente fermentándolo en fosas hasta convertirlo en una pasta agria que se puede desenterrar y comer muchos meses después.|Les arbres à pain de nombreuses îles fructifient abondamment mais brièvement ce mois-ci, produisant bien plus que ce qu'un foyer peut manger frais, si bien que les familles transforment le surplus en le faisant fermenter en fosse jusqu'à obtenir une pâte acide que l'on peut déterrer et manger bien des mois plus tard.|多くの島々でパンノキがこの月に短期間だけ大量に実をつけ、どの家庭も生では食べきれないほどの量が落ちる。そこで各家庭は余った実を穴の中で発酵させ、何か月も先に掘り出して食べられる酸味のあるペーストにして使い切る。",
    ),
    f: t(
      "This pit-fermented breadfruit, known as masi in Fiji or ma in parts of French Polynesia, was historically a hedge against exactly the kind of crop damage a cyclone could cause, since a pit dug well inland could survive a storm that stripped every tree above ground bare.|Este fruto del pan fermentado en fosa, conocido como masi en Fiyi o ma en partes de la Polinesia Francesa, fue históricamente una salvaguarda contra justo el tipo de daño a los cultivos que un ciclón podía causar, ya que una fosa cavada bien tierra adentro podía sobrevivir a una tormenta que dejara desnudo cada árbol en superficie.|Ce fruit de l'arbre à pain fermenté en fosse, appelé masi aux Fidji ou ma dans certaines parties de la Polynésie française, constituait historiquement une protection contre précisément le type de dégâts qu'un cyclone pouvait causer aux cultures, une fosse creusée loin à l'intérieur des terres pouvant survivre à une tempête ayant dénudé chaque arbre en surface.|フィジーでマシ、仏領ポリネシアの一部でマと呼ばれるこの穴発酵パンノキは、歴史的にはまさにサイクロンが引き起こすような作物被害への備えだった。内陸深くに掘った穴なら、地上のすべての木を丸裸にする嵐が来ても生き残ることができたからである。",
    ),
  },
];
