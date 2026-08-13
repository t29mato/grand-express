/**
 * ベネズエラの青マス・赤マスで起きる出来事(22件。増14・減8)。
 *
 * 地方コード: cap=首都圏 / zu=スリア / and=アンデス / cen=中西部・ラノス /
 * gua=グアヤナ / ori=オリエンテ
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、6地方それぞれに3件、土地の産業や祭りに結びつけて置いている。
 */
function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

/**
 * 出来事1件。`months` を指定すると、その月にしか起こらない
 * (0=4月。9月=5、10月=6、11月=7、12月=8、1月=9、2月=10、3月=11)。
 * 省略すれば通年。
 */
function ev(id, kind, regs, emoji, amount, title, narrative, months = []) {
  return { id, kind, regs, e: emoji, amount, n: t(title), t: t(narrative), months };
}

export const VENEZUELA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "mandado-mototaxi", "gain", [], "🏍️", 210,
    "Running an errand by mototaxi|Un mandado en mototaxi|Une course en mototaxi|モトタクシーでお使いを頼まれる",
    "A neighbor needed a package across town before a shop closed and paid well for someone who could weave through the worst of the traffic without complaint. Mototaxi riders pick up this kind of odd job constantly, since a bike beats a car on almost every street that matters.|Un vecino necesitaba un paquete al otro lado de la ciudad antes de que cerrara una tienda, y pagó bien a quien pudiera abrirse paso entre el peor tráfico sin quejarse. Los motorizados aceptan este tipo de encargo constantemente, porque una moto le gana a un carro en casi toda calle que importa.|Un voisin avait besoin d'un colis livré de l'autre côté de la ville avant la fermeture d'un magasin, et a bien payé quelqu'un capable de se faufiler dans le pire de la circulation sans se plaindre. Les motards acceptent ce genre de mission sans arrêt, une moto battant une voiture dans presque toutes les rues qui comptent.|近所の人が、店が閉まる前に町の反対側へ荷物を届けてほしいと頼み、ひどい渋滞をものともせず走れる相手に気前よく払ってくれた。モトタクシーの運転手はこの手の頼まれごとをしょっちゅう引き受ける。大事な通りではたいていバイクが車に勝るからである。",
  ),
  ev(
    "cuidador-de-carros", "gain", [], "🅿️", 170,
    "Watching cars on the block for tips|Cuidando carros de la cuadra por propina|Surveiller des voitures du quartier pour un pourboire|通りの車番をして心づけをもらう",
    "Standing on the corner all afternoon waving drivers into a tight parking spot and keeping an eye on their cars earns small tips from almost everyone who comes back to find their mirrors intact. It is unofficial work with its own informal territory, and regulars on the block already know whose corner is whose.|Pasar toda la tarde en la esquina guiando a los conductores hasta un puesto justo y vigilando sus carros gana pequeñas propinas de casi todo el que vuelve y encuentra sus espejos intactos. Es un trabajo no oficial con su propio territorio informal, y los vecinos de la cuadra ya saben de quién es cada esquina.|Passer tout l'après-midi au coin de la rue à guider les conducteurs vers une place étroite et à surveiller leur voiture rapporte de petits pourboires de presque tous ceux qui reviennent trouver leurs rétroviseurs intacts. C'est un travail non officiel avec son propre territoire informel, et les habitués du quartier savent déjà à qui appartient quel coin.|午後じゅう角に立って運転手を狭い駐車枠へ誘導し、車を見張っていると、ミラーが無事なまま戻ってきたほとんどの客から小銭のチップがもらえる。非公式の仕事だが独自のなわばりがあり、その通りの常連はどの角が誰のものかすでに心得ている。",
  ),
  ev(
    "caucho-pinchado", "loss", [], "🛞", 180,
    "A pothole finishes off a tire|Un hueco termina con un caucho|Un nid-de-poule achève un pneu|穴ぼこがタイヤにとどめを刺す",
    "The pothole was exactly the size and shape to catch a tire dead center, and the flat announces itself with a thump loud enough that everyone in the car already knows before the driver says a word. The tire shop on this stretch of road does enough business from this one pothole alone to know it by name.|El hueco tenía justo el tamaño y la forma para atrapar un caucho de lleno, y el pinchazo se anuncia con un golpe tan fuerte que todos en el carro ya lo saben antes de que el conductor diga una palabra. El taller de esta vía hace suficiente negocio solo con este hueco como para llamarlo por su nombre.|Le nid-de-poule avait exactement la taille et la forme pour attraper un pneu en plein centre, et la crevaison s'annonce par un choc si fort que tout le monde dans la voiture le sait déjà avant que le conducteur ne dise un mot. Le garage sur ce tronçon de route fait assez d'affaires avec ce seul nid-de-poule pour le connaître par son nom.|その穴ぼこはタイヤの真ん中を捉えるのにちょうどよい大きさと形をしていて、パンクはあまりに大きな衝撃とともに知らされ、運転手が口を開く前に車内の全員がもう分かっている。この道沿いのタイヤ屋は、この一つの穴ぼこだけでそこそこ商売になるほど、もはや名前で呼んでいる。",
  ),
  ev(
    "multa-de-transito", "loss", [], "🚓", 200,
    "A fine for a sign nobody saw|Una multa por una señal que nadie vio|Une amende pour un panneau que personne n'a vu|誰も見なかった標識のせいの罰金",
    "The no-turn sign was half hidden behind a street vendor's umbrella, and the officer waiting just past it seemed entirely unsurprised to see another car make the same mistake within the hour. Paying on the spot turns out to be faster than the alternative, and nobody argues the point for long.|La señal de no girar estaba medio tapada por la sombrilla de un vendedor callejero, y el agente que esperaba justo después no pareció nada sorprendido de ver otro carro cometer el mismo error en menos de una hora. Pagar ahí mismo resulta más rápido que la alternativa, y nadie discute mucho el punto.|Le panneau d'interdiction de tourner était à moitié caché par le parasol d'un vendeur de rue, et l'agent posté juste après n'a pas semblé le moins du monde surpris de voir une autre voiture commettre la même erreur en moins d'une heure. Payer sur place s'avère plus rapide que l'alternative, et personne ne discute longtemps.|「右折禁止」の標識は露天商の日除け傘に半分隠れていて、そのすぐ先で待っていた警官は、一時間もしないうちに別の車が同じ間違いをしても少しも驚いた様子がなかった。その場で払うほうが結局早く済むので、誰も長くは言い争わない。",
  ),

  // ---- cap 首都圏 ----
  ev(
    "acomodador-sistema", "gain", ["cap"], "🎻", 220,
    "Ushering at an El Sistema concert|Acomodando en un concierto de El Sistema|Placeur à un concert d'El Sistema|エル・システマの演奏会で案内係を務める",
    "The youth orchestra needed extra hands showing families to their seats before a sold-out evening performance, and the pay came with a spot standing at the back to hear the whole program for free. Half the ushers this particular night turned out to be former students of the program itself.|La orquesta juvenil necesitaba manos extra para acomodar a las familias antes de una función con entradas agotadas, y el pago incluyó un lugar de pie al fondo para oír todo el programa gratis. La mitad de los acomodadores esa noche resultaron ser antiguos alumnos del propio programa.|L'orchestre de jeunes avait besoin de bras pour placer les familles avant une représentation à guichets fermés, et la paie incluait une place debout au fond pour entendre tout le programme gratuitement. La moitié des placeurs ce soir-là se sont révélés être d'anciens élèves du programme lui-même.|満席の夜の公演の前、青少年オーケストラは家族連れを席へ案内する人手を求めていた。給金には後方に立ってプログラム全体を無料で聴ける場所が付いてきた。その晩の案内係の半分は、実はこのプログラムの元生徒だった。",
  ),
  ev(
    "cartera-en-el-metro", "loss", ["cap"], "👛", 190,
    "A wallet left on the Metro seat|Una cartera olvidada en el asiento del Metro|Un portefeuille oublié sur un siège du métro|地下鉄の座席に忘れた財布",
    "The train was packed enough at rush hour that squeezing out at the right station took both hands, and only two stops later does the missing weight in a jacket pocket become obvious. Nobody at the lost-and-found window sounds hopeful, and they are usually right not to be.|El vagón iba tan lleno en hora pico que bajarse en la estación correcta requirió las dos manos, y solo dos paradas después se hace evidente el peso que falta en el bolsillo de la chaqueta. En la ventanilla de objetos perdidos nadie suena esperanzado, y suelen tener razón en no estarlo.|La rame était si bondée à l'heure de pointe que descendre à la bonne station a demandé les deux mains, et ce n'est que deux stations plus loin que le poids manquant dans une poche de veste devient évident. Au guichet des objets trouvés, personne ne semble optimiste, et ils ont généralement raison.|ラッシュ時の車両はあまりに混み合っていて、目的の駅で降りるのに両手が要った。二駅も過ぎてから、上着のポケットの軽さにようやく気づく。忘れ物窓口の係員は誰も期待できそうな顔をしないが、たいていその通りである。",
  ),
  ev(
    "cosecha-de-cacao", "gain", ["cap"], "🍫", 230,
    "A day cracking cacao pods|Un día partiendo mazorcas de cacao|Une journée à casser des cabosses de cacao|一日カカオの実を割る仕事",
    "A Barlovento grower needed extra hands splitting pods and scooping the white pulp-covered beans into baskets before the afternoon rain, paying by the basket rather than the hour. The pulp itself is sweet enough to eat straight, which is most of why nobody minds the sticky hands by the end of the day.|Un cultivador de Barlovento necesitaba manos extra para partir mazorcas y sacar los granos cubiertos de pulpa blanca hacia los cestos antes de la lluvia de la tarde, y pagó por cesto y no por hora. La pulpa misma es lo bastante dulce para comerla tal cual, que es en buena parte por qué a nadie le importan las manos pegajosas al final del día.|Un producteur de Barlovento avait besoin de bras pour casser les cabosses et récolter les fèves couvertes de pulpe blanche dans des paniers avant la pluie de l'après-midi, payant au panier plutôt qu'à l'heure. La pulpe elle-même est assez sucrée pour se manger telle quelle, ce qui explique en grande partie pourquoi personne ne se soucie des mains collantes en fin de journée.|バルロベントの農園主が、午後の雨が来る前にカカオの実を割って白い果肉に包まれた豆を籠に集める手を求め、時給ではなく籠の数で払った。果肉そのものはそのまま食べられるほど甘く、一日の終わりにべたつく手を誰も気にしない理由の大半はそこにある。",
    [8, 9],
  ),

  // ---- zu スリア ----
  ev(
    "limpieza-de-taladro", "gain", ["zu"], "🛢️", 250,
    "A day scrubbing rust off a pumpjack|Un día raspando el óxido de una bomba de balancín|Une journée à gratter la rouille d'une pompe|一日ポンプジャッキの錆を落とす仕事",
    "A small operator running an old well needed the housing scraped and repainted before an inspection, work that pays better than it sounds because almost nobody wants to spend a day balanced on rusted metal in the lake-shore heat. The paint job rarely lasts a full year before the salt air starts eating it again.|Un pequeño operador de un pozo viejo necesitaba raspar y repintar la carcasa antes de una inspección, un trabajo que paga mejor de lo que suena porque casi nadie quiere pasar el día en equilibrio sobre metal oxidado bajo el calor de la orilla del lago. La pintura rara vez dura un año entero antes de que el aire salado vuelva a comérsela.|Un petit exploitant d'un vieux puits avait besoin de gratter et repeindre le carter avant une inspection, un travail mieux payé qu'il n'y paraît car presque personne ne veut passer la journée en équilibre sur du métal rouillé dans la chaleur du bord du lac. La peinture tient rarement une année entière avant que l'air salé ne recommence à la ronger.|古い油井を営む小さな業者が、検査の前に外装の錆をこすり落として塗り直す手を求めていた。湖畔の暑さの中、錆びた鉄の上でバランスを取りながら一日を過ごしたがる者はほとんどいないので、見た目より実入りがよい。塗装は潮風にまた食われ始めるまで、まる一年ともたないことが多い。",
  ),
  ev(
    "celular-bajo-la-tormenta", "loss", ["zu"], "📱", 220,
    "A phone doesn't survive the storm|Un celular no sobrevive la tormenta|Un téléphone ne survit pas à l'orage|嵐に電話が耐えられなかった",
    "The Catatumbo lightning show looked worth stepping outside for one more photo, right up until the wind flipped the rain sideways without any warning at all. The repair shop by the market has seen this exact story often enough to quote a fixed price without even opening the case.|El espectáculo del relámpago del Catatumbo parecía merecer salir por una foto más, justo hasta que el viento volteó la lluvia de lado sin ningún aviso. El taller de reparaciones junto al mercado ha visto esta misma historia tantas veces que cotiza un precio fijo sin siquiera abrir la carcasa.|Le spectacle de l'orage du Catatumbo semblait mériter qu'on sorte pour une photo de plus, jusqu'à ce que le vent rabatte la pluie de côté sans le moindre avertissement. L'atelier de réparation près du marché a vu cette même histoire assez souvent pour donner un prix fixe sans même ouvrir le boîtier.|カタトゥンボの雷の光景は、もう一枚写真を撮りに外へ出る価値があると思わせた。だが風が前触れもなく雨を横殴りに変えた瞬間まではの話だった。市場の脇の修理店はまったく同じ話をあまりに何度も見てきたので、中を開けもせずに定額を提示してくる。",
  ),
  ev(
    "guia-de-relampago", "gain", ["zu"], "⚡", 260,
    "Guiding visitors out to watch the lightning|Guiando a visitantes a ver el relámpago|Guider des visiteurs pour observer l'orage|雷見物の客を案内する",
    "A group of photographers paid well to be taken out onto the lake in a small boat at exactly the right distance to watch the storm without getting caught in it, a judgment call that only comes from doing this dozens of nights a year. Getting the distance wrong even once is the kind of mistake a guide doesn't get to make twice.|Un grupo de fotógrafos pagó bien por que los llevaran en un botecito al lago, a la distancia justa para ver la tormenta sin quedar atrapados en ella, un cálculo que solo se aprende haciéndolo decenas de noches al año. Calcular mal la distancia una sola vez es el tipo de error que un guía no llega a cometer dos veces.|Un groupe de photographes a bien payé pour être emmené sur le lac en petit bateau, à la distance exacte pour observer l'orage sans s'y faire prendre, un jugement qui ne s'acquiert qu'à force de le faire des dizaines de nuits par an. Se tromper de distance ne serait-ce qu'une fois est le genre d'erreur qu'un guide ne commet pas deux fois.|写真家の一団が、嵐に巻き込まれずに眺められるちょうどよい距離まで小舟で湖に連れ出してもらう代わりに、たっぷり謝礼を払ってくれた。この勘所は年に何十晩とこなして初めて身につくものである。距離を一度でも見誤れば、案内人が二度と繰り返せない類いの失敗になる。",
    [5, 6],
  ),

  // ---- and アンデス ----
  ev(
    "cosecha-de-cafe", "gain", ["and"], "☕", 240,
    "Picking coffee cherries on the slope|Recogiendo café en la ladera|Cueillir des cerises de café à flanc de coteau|斜面でコーヒーの実を摘む",
    "The steepest rows needed pickers who could work without a ladder, since the terrain here makes a proper harvest machine useless, and a fast pair of hands could fill several baskets before the fog burned off. Pay is by the basket, and the best pickers on the farm are pointed out to newcomers as a standard to aim for rather than beat.|Las hileras más empinadas necesitaban recolectores que pudieran trabajar sin escalera, pues el terreno aquí hace inútil una cosechadora de verdad, y unas manos rápidas podían llenar varios cestos antes de que se disipara la neblina. Se paga por cesto, y a los recién llegados se les señala a los mejores recolectores de la finca como referencia, no como rival a vencer.|Les rangs les plus escarpés avaient besoin de cueilleurs capables de travailler sans échelle, le terrain rendant ici inutile toute vraie moissonneuse, et des mains rapides pouvaient remplir plusieurs paniers avant que le brouillard ne se lève. On paie au panier, et les meilleurs cueilleurs de la ferme sont désignés aux nouveaux venus comme une référence à égaler plutôt qu'à battre.|いちばん急な畝は梯子なしで作業できる摘み手を必要とした。この地形では本格的な収穫機械は役に立たないからである。手の速い者なら霧が晴れる前に籠をいくつも満たせた。籠の数で払われ、農園でいちばん腕のよい摘み手は、新入りに「超えるべき相手」ではなく「目指す基準」として紹介される。",
    [7, 8, 9],
  ),
  ev(
    "soroche-en-merida", "loss", ["and"], "💊", 210,
    "Altitude catches up on the cable car|El soroche alcanza en el teleférico|Le mal des montagnes rattrape au téléphérique|ケーブルカーで高山病に襲われる",
    "Climbing more than 3,000 metres in under an hour turns out to be exactly as hard on the body as the brochure warns, and the pounding headache by the top station is only cured by a pharmacy visit and a slow walk back down instead of the ride. The attendant at the summit station keeps a small stock of the same pills for precisely this reason.|Subir más de 3.000 metros en menos de una hora resulta ser tan duro para el cuerpo como advierte el folleto, y el dolor de cabeza punzante en la estación de arriba solo se cura con una visita a la farmacia y una bajada lenta a pie en vez del teleférico. El encargado de la estación cumbre guarda una pequeña reserva de esas mismas pastillas justo por esto.|Grimper plus de 3 000 mètres en moins d'une heure s'avère aussi dur pour le corps que le prévient la brochure, et le mal de tête lancinant à la station du sommet ne se soigne qu'avec un passage en pharmacie et une lente descente à pied plutôt qu'en téléphérique. Le préposé de la station sommitale garde une petite réserve de ces mêmes cachets, précisément pour cette raison.|1時間足らずで3,000メートル以上登ると、パンフレットが警告するとおり体に堪える。頂上駅でのずきずきする頭痛は、薬局での買い物と、乗り物を使わずゆっくり歩いて下ることでしか治らない。山頂駅の係員はまさにこの理由で、同じ薬を少し常備している。",
  ),
  ev(
    "guia-monumento-virgen", "gain", ["and"], "🗿", 220,
    "Guiding visitors up inside the statue|Guiando a visitantes por dentro de la estatua|Guider des visiteurs à l'intérieur de la statue|像の内部を観光客に案内する",
    "The elevator inside the Monument to the Virgin of Peace only fits a handful of people at a time, so a steady visitor day means someone is needed to organize the queue and explain what each viewing platform in her arms overlooks. Regulars know exactly which platform gives the clearest view of the valley and steer first-timers there without being asked.|El ascensor dentro del Monumento a la Virgen de la Paz solo cabe unas pocas personas a la vez, así que un día concurrido necesita a alguien que organice la cola y explique qué se ve desde cada mirador en sus brazos. Los habituales saben bien qué mirador da la vista más clara del valle y llevan hacia allí a los primerizos sin que se lo pidan.|L'ascenseur à l'intérieur du Monument à la Vierge de la Paix ne tient que quelques personnes à la fois, si bien qu'une journée fréquentée demande quelqu'un pour organiser la file et expliquer ce que surplombe chaque belvédère dans ses bras. Les habitués savent exactement quel belvédère offre la vue la plus dégagée sur la vallée et y guident les nouveaux venus sans qu'on le leur demande.|平和の聖母像の内部のエレベーターは一度に数人しか乗れないので、客の多い日には列を整理し、両腕の展望台からそれぞれ何が見えるか説明する係が要る。常連はどの展望台が谷をいちばんよく見渡せるか心得ていて、頼まれもせずに初めての客をそこへ導く。",
  ),

  // ---- cen 中西部・ラノス ----
  ev(
    "arreo-de-ganado", "gain", ["cen"], "🐄", 230,
    "A day helping with the cattle roundup|Un día ayudando en el arreo de ganado|Une journée à aider au rassemblement du bétail|一日、牛の追い込みを手伝う",
    "The ranch needed extra riders to push a scattered herd toward the pens before the rains made the low ground impassable, and anyone who could stay in the saddle for six hours straight was welcome regardless of experience. The joropo played that night at the ranch house is, by long custom, for the riders first and everyone else second.|El hato necesitaba jinetes extra para llevar una manada dispersa hacia los corrales antes de que las lluvias volvieran intransitable la parte baja, y cualquiera que aguantara seis horas seguidas en la silla era bienvenido sin importar la experiencia. El joropo que se toca esa noche en la casa del hato es, por vieja costumbre, primero para los jinetes y después para los demás.|Le hato avait besoin de cavaliers supplémentaires pour rassembler un troupeau dispersé vers les enclos avant que les pluies ne rendent les terres basses infranchissables, et quiconque tenait six heures d'affilée en selle était bienvenu, expérience ou non. Le joropo joué ce soir-là à la maison du hato revient, par vieille coutume, d'abord aux cavaliers, puis aux autres.|牧場は、雨が低地を通れなくする前に散らばった群れを畜舎へ追い込む余分な乗り手を求めていて、経験を問わず六時間ぶっ通しで鞍にいられる者なら誰でも歓迎された。その夜、牧場の母屋で奏でられるホローポは、古くからの習わしで、まず乗り手のため、それから他の皆のためのものとされる。",
    [6, 7],
  ),
  ev(
    "grua-en-valencia", "loss", ["cen"], "🚛", 230,
    "Towed from outside the factory gate|Remolcado de la puerta de la fábrica|Remorqué devant la grille de l'usine|工場の門前で車をレッカーされる",
    "The loading zone looked empty enough to leave the car for ten minutes, which turned out to be exactly the window a tow truck contracted by the plant needed to clear it for an incoming delivery truck. Getting the car back means a taxi across town and a cash fee that the lot attendant quotes without looking up from his phone.|La zona de carga parecía lo bastante vacía para dejar el carro diez minutos, que resultó ser justo la ventana que necesitó una grúa contratada por la planta para despejarla ante un camión de reparto que llegaba. Recuperar el carro implica un taxi al otro lado de la ciudad y una tarifa en efectivo que el encargado del lote cotiza sin levantar la vista del teléfono.|La zone de chargement semblait assez vide pour y laisser la voiture dix minutes, ce qui s'est avéré être exactement le créneau dont une dépanneuse mandatée par l'usine avait besoin pour la dégager avant l'arrivée d'un camion de livraison. Récupérer la voiture suppose un taxi à travers la ville et des frais en liquide que le gardien du parc annonce sans lever les yeux de son téléphone.|荷積み場は10分ほど車を止めても大丈夫そうに見えたが、それはまさに、到着する配送トラックのために工場が契約したレッカー車がその場所を空けるのに必要とした隙間だった。車を取り戻すには町の反対側までタクシーで行き、駐車場の係員がスマホから顔も上げずに告げる現金の手数料を払わねばならない。",
  ),
  ev(
    "artesania-en-los-medanos", "gain", ["cen"], "🏺", 200,
    "Selling crafts at the edge of the dunes|Vendiendo artesanías al borde de los médanos|Vendre de l'artisanat en bordure des dunes|砂丘のふちで工芸品を売る",
    "Tourists climbing the dunes for photos pass right by a row of stalls selling woven palm hats and small clay pieces, and a slow afternoon can turn brisk the moment one bus of visitors decides the light is right for a purchase. The vendors take turns watching each other's stalls during the hottest hour, when nobody is buying anything anyway.|Los turistas que suben los médanos para las fotos pasan justo junto a una hilera de puestos que venden sombreros de palma tejida y piezas pequeñas de barro, y una tarde tranquila puede animarse en cuanto un autobús de visitantes decide que la luz es buena para comprar. Los vendedores se turnan para cuidarse los puestos entre sí en la hora de más calor, cuando de todos modos nadie compra nada.|Les touristes qui montent les dunes pour des photos passent juste devant une rangée d'étals vendant des chapeaux de palme tressée et de petites pièces d'argile, et un après-midi calme peut s'animer dès qu'un car de visiteurs juge la lumière propice à un achat. Les vendeurs se relaient pour surveiller les étals des uns et des autres pendant l'heure la plus chaude, quand de toute façon personne n'achète rien.|写真を撮りに砂丘を登る観光客は、編んだヤシの帽子や小さな陶器を売る露店の列のすぐそばを通る。静かな午後も、観光バスが一台、光がちょうどいいと判断した途端に活気づく。いちばん暑い時間帯、どのみち誰も何も買わないあいだは、売り子たちが互いの店を交代で見張る。",
  ),

  // ---- gua グアヤナ ----
  ev(
    "porteo-en-los-raudales", "gain", ["gua"], "🛶", 250,
    "Portering cargo around the rapids|Porteando carga alrededor de los raudales|Porter la cargaison autour des rapides|急流を迂回して荷を運ぶ",
    "A trader's canoe couldn't run the Atures rapids loaded, so the cargo had to come out and go overland on someone's back for the worst stretch before being loaded back onto a second boat waiting past the rocks. It is exhausting work paid by the trip rather than the hour, and strong backs are never turned away.|La canoa de un comerciante no podía pasar los raudales de Atures cargada, así que la carga tuvo que sacarse y llevarse por tierra a cuestas de alguien en el peor tramo, antes de subirla de nuevo a un segundo bote que esperaba pasando las rocas. Es trabajo agotador que se paga por viaje y no por hora, y nunca se rechaza a una espalda fuerte.|Le canoë d'un commerçant ne pouvait pas franchir chargé les rapides d'Atures, la cargaison a donc dû être déchargée et portée à dos d'homme sur le pire tronçon, avant d'être rechargée sur un second bateau attendant après les rochers. C'est un travail épuisant payé au trajet plutôt qu'à l'heure, et un dos solide n'est jamais refusé.|商人のカヌーは荷を積んだままアトゥレスの急流を越えられず、いちばん険しい区間だけ荷を降ろして誰かの背で陸路を運び、岩場の先で待つ二艘目の船に積み直さねばならなかった。時給ではなく一往復ごとに払われる過酷な仕事だが、頑丈な背中はいつでも歓迎される。",
  ),
  ev(
    "camara-en-la-angostura", "loss", ["gua"], "📷", 210,
    "A sudden squall on the narrows|Un chubasco repentino en el angostamiento|Une bourrasque soudaine sur l'étranglement|狭まりに突然の激しい雨",
    "The ferry across the narrowest stretch of the Orinoco looked like a safe bet under a clear sky, right up until a squall came out of nowhere halfway across and soaked everything not zipped shut. The crew hands out a tarp without being asked, which says plainly enough how often this happens.|El ferry por el tramo más estrecho del Orinoco parecía una apuesta segura bajo un cielo despejado, justo hasta que un chubasco salió de la nada a mitad de camino y empapó todo lo que no estaba bien cerrado. La tripulación reparte una lona sin que se la pidan, lo cual dice bastante sobre cuán seguido pasa esto.|Le ferry sur le tronçon le plus étroit de l'Orénoque semblait un pari sûr sous un ciel dégagé, jusqu'à ce qu'une bourrasque surgisse de nulle part à mi-parcours et trempe tout ce qui n'était pas bien fermé. L'équipage distribue une bâche sans qu'on la demande, ce qui en dit assez sur la fréquence de la chose.|オリノコ川がいちばん狭まる区間を渡るフェリーは、晴れた空の下では安全な賭けに見えた。ところが半ばまで来たところで、どこからともなく激しい雨が降り出し、しっかり閉じていなかったものすべてを濡らした。乗組員が頼まれもせずに防水シートを配るあたり、これがどれほどよくあることかを物語っている。",
  ),
  ev(
    "guia-carnaval-el-callao", "gain", ["gua"], "🥁", 240,
    "Showing visitors where the parade turns|Mostrando a los visitantes dónde gira el desfile|Montrer aux visiteurs où tourne le défilé|パレードが曲がる場所を観光客に教える",
    "Visitors who don't know the route always ask the same question about where the best corner to watch from is, and a local who grew up dancing in the parade can point them to the turn where the calypso songs slow down just enough to hear the patois clearly. A good spot pointed out at the right moment is worth more than the tip that usually follows it.|Los visitantes que no conocen la ruta siempre preguntan lo mismo, cuál es la mejor esquina para ver, y un local que creció bailando en el desfile puede señalarles el giro donde las canciones de calipso bajan el ritmo justo lo suficiente para oír bien el patois. Un buen sitio señalado en el momento justo vale más que la propina que suele seguirle.|Les visiteurs qui ne connaissent pas le parcours posent toujours la même question, quel est le meilleur coin pour regarder, et un habitant qui a grandi en dansant dans le défilé peut leur indiquer le virage où les chansons calypso ralentissent juste assez pour bien entendre le patois. Un bon emplacement indiqué au bon moment vaut plus que le pourboire qui suit généralement.|パレードの道順を知らない観光客は決まって同じことを尋ねる。どの角がいちばん見物によいかと。パレードで踊って育った地元の人間なら、カリプソの歌がパトワを聞き取れるくらいまで速度を落とす曲がり角を教えられる。ちょうどよい瞬間に教えたよい場所は、そのあとに続くたいていのチップより値打ちがある。",
    [10, 11],
  ),

  // ---- ori オリエンテ ----
  ev(
    "vendedor-zona-franca", "gain", ["ori"], "🛍️", 220,
    "A busy shift at the duty-free counter|Un turno movido en el mostrador libre de impuestos|Un service chargé au comptoir hors taxes|免税カウンターでの忙しい勤務",
    "A cruise ship in port for the day means every shop along the strip needs extra hands for a few frantic hours, and commission on top of the hourly rate makes the shift worth fighting for among the regular staff. By the time the ship's horn sounds for departure, the whole street empties out almost as fast as it filled.|Un crucero en puerto por un día significa que cada tienda de la franja necesita manos extra por unas horas frenéticas, y la comisión sobre la tarifa por hora hace que el turno valga la pena disputarlo entre el personal fijo. Para cuando suena la bocina del barco anunciando la salida, toda la calle se vacía casi tan rápido como se llenó.|Un bateau de croisière au port pour la journée signifie que chaque boutique de la rue a besoin de bras supplémentaires pour quelques heures frénétiques, et la commission ajoutée au tarif horaire rend le service disputé parmi le personnel habituel. Le temps que la sirène du bateau annonce le départ, toute la rue se vide presque aussi vite qu'elle s'est remplie.|一日だけ寄港するクルーズ船が来ると、通り沿いのどの店も数時間の大忙しのために人手を要り用にする。時給に上乗せされる歩合のおかげで、この勤務は常勤スタッフのあいだで奪い合いになるほどの値打ちがある。出航を告げる汽笛が鳴るころには、通りは埋まったときと同じくらいの速さで空になる。",
  ),
  ev(
    "mareo-en-el-ferry", "loss", ["ori"], "🤢", 170,
    "Seasick on the crossing to Margarita|Mareado en la travesía a Margarita|Mal de mer sur la traversée vers Margarita|マルガリータ行きの船で船酔い",
    "The strait between the mainland and the island looks calm enough from the dock, and then turns choppy exactly halfway across, long after turning back is an option. The crew sells ginger candy from a small cooler for this precise situation, at a price that reflects exactly how badly it is needed by that point.|El estrecho entre tierra firme y la isla se ve bastante calmado desde el muelle, y luego se pica justo a mitad de camino, mucho después de que volver sea una opción. La tripulación vende caramelos de jengibre de una nevera pequeña justo para esta situación, a un precio que refleja cuánto se necesitan para ese momento.|Le détroit entre le continent et l'île paraît assez calme depuis le quai, puis devient agité exactement à mi-parcours, bien après que faire demi-tour ne soit plus une option. L'équipage vend des bonbons au gingembre depuis une petite glacière pour exactement cette situation, à un prix qui reflète à quel point on en a besoin à ce moment-là.|本土と島のあいだの海峡は、桟橋から見るとじゅうぶん穏やかに見えるが、ちょうど半ばを過ぎたところで荒れ始める。もう引き返せない頃合いである。乗組員はまさにこの状況のために小さなクーラーボックスから生姜飴を売っており、その値段はその瞬間どれほど必要とされているかをそのまま映している。",
  ),
  ev(
    "construccion-de-carroza", "gain", ["ori"], "🎊", 240,
    "Building a carnival float through the night|Construyendo una carroza de carnaval toda la noche|Construire un char de carnaval toute la nuit|夜通しカーニバルの山車を作る",
    "The comparsa needed extra hands wiring paper flowers onto a chicken-wire frame the night before the parade, working past midnight under a single bare bulb strung from a tree. Whoever stays until the float is finished gets a spot riding on it the next day, which is worth more to most of the crew than the pay itself.|La comparsa necesitaba manos extra para alambrar flores de papel sobre un armazón de malla la noche antes del desfile, trabajando pasada la medianoche bajo un solo bombillo colgado de un árbol. A quien se queda hasta terminar la carroza le toca un lugar montado en ella al día siguiente, que para la mayoría de la cuadrilla vale más que la paga misma.|La comparsa avait besoin de bras pour fixer des fleurs en papier sur une armature en grillage la nuit précédant le défilé, travaillant après minuit sous une seule ampoule nue suspendue à un arbre. Quiconque reste jusqu'à ce que le char soit fini obtient une place dessus le lendemain, ce qui vaut plus pour la plupart de l'équipe que la paie elle-même.|カーニバルの仮装隊は、パレード前夜、鶏小屋の金網の骨組みに紙の花を針金で取り付ける手を求めていた。木からぶら下げた裸電球一つの下、深夜を過ぎても作業は続く。山車が完成するまで残った者には、翌日それに乗る場所が用意される。たいていの仲間にとって、それは報酬そのものより値打ちがある。",
    [9, 10],
  ),
];
