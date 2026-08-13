/**
 * 北アメリカ大陸の青マス・赤マスで起きる出来事(18件。増9・減9)。
 *
 * 地方コード: arctic=北極圏・アラスカ・ユーコン / pac=西海岸・ロッキー /
 * plains=大平原・五大湖 / atl=東海岸・大西洋岸 / mex=メキシコ /
 * canorth=中米北部 / casouth=中米南部 / cargr=大アンティル諸島とバハマ
 * (8地方)。
 *
 * 地方も月も指定しない出来事を6件(増3・減3)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * 米加4地方(arctic/pac/plains/atl)は元は`north`1地方だった名残で
 * 2件(handcar-shift・ice-storm-delay)を4地方共通で引けるようにし、
 * mex/canorth/casouth/cargrにはそれぞれ増減が揃うよう2〜4件を
 * 割り当てている(carbsをcargrへ合流させたため、旧`car`4件を
 * すべてcargrにまとめた)。
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

export const NORTHAMERICA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための6件) ----
  ev(
    "unload-freight", "gain", [], "📦", 220,
    "A day unloading freight at the rail yard|Un día descargando fletes en el patio de maniobras|Une journée à décharger le fret à la gare de triage|操車場で貨物の荷下ろしを手伝う",
    "The yardmaster was short two pairs of hands before a delayed train finally rolled in, and paid cash on the spot for anyone willing to stay past dark. Freight moves on no fixed clock at a busy junction, so the offer of extra pay for an extra shift comes up more often than a schedule would suggest.|Al jefe de patio le faltaban dos pares de manos cuando por fin llegó un tren retrasado, y pagó en efectivo al momento a quien quisiera quedarse hasta después del anochecer. En un empalme concurrido, el flete no se mueve con horario fijo, así que la oferta de paga extra por un turno extra surge más a menudo de lo que un horario haría suponer.|Le chef de gare manquait de deux paires de bras quand un train retardé finit par entrer en gare, et il paya comptant sur-le-champ quiconque voulait bien rester après la tombée de la nuit. Le fret ne suit aucune horloge fixe dans un embranchement animé, si bien que l'offre d'une paie supplémentaire pour un service de plus revient plus souvent qu'un horaire ne le laisserait croire.|遅れていた列車がようやく入ってきたとき、操車係長は人手が二人分足りず、日が暮れても残ってくれる者にその場で現金を払った。忙しい乗換駅では貨物が決まった時刻に動くわけではないので、割増賃金で追加の勤務を頼まれることは、時刻表から想像するより頻繁にある。",
  ),
  ev(
    "translator-tip", "gain", [], "🗣️", 180,
    "Helping a lost traveler find the right platform|Ayudando a un viajero perdido a encontrar el andén correcto|Aider un voyageur perdu à trouver le bon quai|迷った旅行者にホームを教える",
    "A traveler clutching a phrase book and the wrong ticket looked ready to miss their connection entirely, and a few minutes spent translating the departure board earned an unexpected tip pressed into hand before the train pulled out. Stations along this route rarely bother with signage in more than one or two languages.|Un viajero aferrado a un libro de frases y el billete equivocado parecía a punto de perder por completo su conexión, y unos minutos traduciendo el panel de salidas le valieron una propina inesperada, puesta en la mano justo antes de que el tren partiera. Las estaciones de esta ruta rara vez se molestan en poner señalización en más de un idioma o dos.|Un voyageur cramponné à un guide de conversation et au mauvais billet semblait sur le point de rater complètement sa correspondance, et quelques minutes passées à traduire le tableau des départs valurent un pourboire inattendu, glissé dans la main juste avant que le train ne parte. Les gares de cette ligne se donnent rarement la peine d'afficher plus d'une ou deux langues.|会話集と間違った切符を握りしめた旅行者が、乗り継ぎを丸ごと逃しかけていた。発車案内板を数分訳してやると、列車が出る直前に思いがけずチップを握らされた。この路線沿いの駅は、一つか二つ以上の言語で案内を出す手間をかけないことが多い。",
  ),
  ev(
    "border-snack-stall", "gain", [], "🥤", 200,
    "Selling cold drinks to a stalled border queue|Vendiendo bebidas frías a una cola parada en la frontera|Vendre des boissons fraîches à une file bloquée à la frontière|止まった国境の列に冷たい飲み物を売る",
    "The line of cars and buses at the checkpoint had not moved in an hour, and a cooler of cold drinks carried down the row sold out twice before the gate finally opened. Nobody haggles over the price of something cold when the sun is directly overhead and the engine has been off for that long.|La cola de coches y autobuses en el puesto fronterizo llevaba una hora sin moverse, y una nevera de bebidas frías, llevada de coche en coche, se vendió dos veces antes de que por fin se abriera la barrera. Nadie regatea el precio de algo frío cuando el sol pega de lleno y el motor lleva tanto tiempo apagado.|La file de voitures et de bus au poste-frontière n'avait pas bougé depuis une heure, et une glacière de boissons fraîches, portée le long de la file, se vida deux fois avant que la barrière ne s'ouvre enfin. Personne ne marchande le prix d'une boisson fraîche quand le soleil tape et que le moteur est coupé depuis si longtemps.|検問所の車とバスの列は一時間も動かず、列に沿って運んだ冷たい飲み物入りのクーラーボックスは、ゲートがようやく開くまでに二度も売り切れた。真上から日が照りつけ、エンジンをそれだけ長く止めていれば、冷たいものの値段に文句を言う者はいない。",
  ),
  ev(
    "overcharged-taxi", "loss", [], "🚕", 220,
    "Talked into an unlicensed taxi's inflated fare|Convencido de pagar la tarifa inflada de un taxi pirata|Convaincu de payer le tarif gonflé d'un taxi pirate|白タクの言い値で乗せられる",
    "A driver waiting just outside the station gate quoted a price that only made sense once the meter, which turned out not to exist, was mentioned too late. Licensed taxis queue further off, past where a tired traveler with luggage usually bothers to look.|Un conductor que esperaba justo a la salida de la estación citó un precio que solo cobró sentido cuando se mencionó, ya demasiado tarde, un taxímetro que resultó no existir. Los taxis con licencia hacen cola más allá, más lejos de donde un viajero cansado con equipaje suele molestarse en mirar.|Un chauffeur qui attendait juste à la sortie de la gare annonça un prix qui ne prit son sens que lorsqu'un compteur, qui se révéla ne pas exister, fut mentionné trop tard. Les taxis agréés font la queue plus loin, au-delà d'où un voyageur fatigué et chargé de bagages se donne d'ordinaire la peine de regarder.|駅の出口のすぐ外で待っていた運転手は、あとになって「メーター」という、実は存在しないものを持ち出してようやく意味の通る値段を告げた。免許を持つタクシーはもっと先に並んでいるが、疲れて荷物を抱えた旅行者はそこまで見に行こうとしないことが多い。",
  ),
  ev(
    "dominoes-loss", "loss", [], "🁣", 190,
    "A bad run at the dominoes table|Una mala racha en la mesa de dominó|Une mauvaise série à la table de dominos|ドミノの勝負で連敗する",
    "The tiles kept coming up wrong all evening at a table set up on the platform to pass the time before a delayed departure, and the small bets that seemed harmless at the start had added up considerably by the last hand. Dominoes gets played everywhere from ferry terminals to family porches, and the scoring rewards patience nobody at that table had left.|Las fichas no dejaron de salir mal en toda la tarde en una mesa montada en el andén para hacer tiempo antes de una salida retrasada, y las pequeñas apuestas que al principio parecían inofensivas sumaron bastante para la última mano. Al dominó se juega en todas partes, de las terminales de transbordadores a los porches familiares.|Les tuiles ne cessèrent de tomber mal toute la soirée à une table montée sur le quai pour tuer le temps avant un départ retardé, et les petites mises qui semblaient inoffensives au début s'étaient sérieusement accumulées à la dernière manche. On joue aux dominos partout, des terminaux de ferry aux vérandas familiales.|遅れた出発を待つあいだホームに出したテーブルで、その晩は牌がずっと悪く、最初は害のなさそうに見えた小さな賭けが最後の手までにかなり積み上がっていた。ドミノはフェリー乗り場から家族の玄関先まで至る所で打たれるが、その頃には誰にも我慢が残っていなかった。",
  ),
  ev(
    "parking-fine-na", "loss", [], "🅿️", 160,
    "A parking ticket in an unfamiliar town|Una multa de aparcamiento en un pueblo desconocido|Une amende de stationnement dans une ville inconnue|知らない町での駐車違反",
    "The sign was posted only in the local language and half hidden behind a market stall, and the fine turned up tucked under the wiper before the visit was even over. Every town along the route enforces parking a little differently, and none of them post the rules for someone just passing through.|El cartel estaba solo en el idioma local y medio escondido tras un puesto del mercado, y la multa apareció bajo el limpiaparabrisas antes de que terminara siquiera la visita. Cada pueblo de la ruta aplica el aparcamiento de forma algo distinta, y ninguno pone las normas pensando en alguien de paso.|Le panneau n'était affiché que dans la langue locale et à moitié caché derrière un étal de marché, et l'amende s'est retrouvée coincée sous l'essuie-glace avant même la fin de la visite. Chaque ville sur la route applique le stationnement un peu différemment, et aucune n'affiche ses règles à l'intention d'un simple passant.|標識は現地の言葉だけで、市場の露店に半分隠れていた。訪問が終わらないうちに、罰金の紙がワイパーに挟まっていた。この路線沿いの町はどこも駐車の決まりが少しずつ違い、通りすがりの者のために規則を掲示してくれる町はない。",
  ),

  // ---- north(北米。米加) ----
  ev(
    "handcar-shift", "gain", ["arctic", "pac", "plains", "atl"], "🛤️", 260,
    "A day filling in on the section crew|Un día supliendo en la cuadrilla de vía|Une journée en renfort dans l'équipe de voie|保線班の欠員を一日埋める",
    "The section foreman was down a man with a storm bearing down and miles of track to check before it hit, and paid a full day's wage for anyone who could swing a spike maul without being asked twice. The work ends the moment the light does, foreman's rules, no exceptions.|Al capataz de vía le faltaba un hombre con una tormenta encima y kilómetros de vía por revisar antes de que llegara, y pagó el jornal completo a quien supiera manejar el mazo de clavar sin que se lo pidieran dos veces. El trabajo termina en cuanto se va la luz, regla del capataz, sin excepciones.|Le contremaître de voie manquait d'un homme avec une tempête qui approchait et des kilomètres de voie à vérifier avant qu'elle n'arrive, et il paya une journée complète à quiconque savait manier la masse à crampons sans se le faire demander deux fois. Le travail s'arrête dès que la lumière baisse, règle du contremaître, sans exception.|保線班の親方は、嵐が迫るなか何kmもの線路を点検し終える前に一人足りず、犬釘打ちのハンマーを二度言わせず振れる者には日当を満額払った。作業は日が落ちた瞬間に終わる。親方の決まりで、例外はない。",
  ),
  ev(
    "ice-storm-delay", "loss", ["arctic", "pac", "plains", "atl"], "🧊", 260,
    "Stranded a night by an ice storm|Varado una noche por una tormenta de hielo|Bloqué une nuit par une tempête de verglas|着氷で一晩足止めされる",
    "The line ahead was closed until crews could clear the ice from the overhead wires, and the only hotel within walking distance charged storm-season rates for the single room left. Breakfast the next morning cost almost as much as the room, since the kitchen had nowhere else to send the food that had already been ordered before the closure.|La vía por delante quedó cerrada hasta que las cuadrillas pudieran quitar el hielo de los cables aéreos, y el único hotel a distancia a pie cobró tarifas de temporada de tormentas por la única habitación que quedaba. El desayuno de la mañana siguiente costó casi tanto como la habitación.|La voie plus loin fut fermée jusqu'à ce que les équipes puissent dégager la glace des câbles aériens, et le seul hôtel à distance de marche facturait des tarifs de saison des tempêtes pour la dernière chambre disponible. Le petit-déjeuner du lendemain matin coûta presque aussi cher que la chambre.|架線の氷を保線班が取り除くまで、この先の線路は閉じられていた。歩いて行ける範囲で唯一のホテルは、残っていたたった一部屋に嵐の季節料金を課した。翌朝の朝食は部屋代とほぼ同じ値段で、厨房には閉鎖前に注文された食材の行き場が他になかった。",
  ),

  // ---- mex(メキシコ) ----
  ev(
    "maquiladora-overtime", "gain", ["mex"], "🏭", 240,
    "Picking up an overtime shift at the assembly plant|Aceptando un turno extra en la planta de ensamblaje|Prendre une heure supplémentaire à l'usine d'assemblage|組立工場の残業を引き受ける",
    "A rush order needed extra hands on the line before the truck to the border left at dawn, and the shift supervisor offered double pay to anyone who could stay past midnight. The plant runs three shifts a day precisely so a delayed part from one side of the border never has to sit idle for long on the other.|Un pedido urgente necesitaba manos extra en la línea antes de que el camión hacia la frontera saliera al amanecer, y el supervisor de turno ofreció paga doble a quien pudiera quedarse hasta después de medianoche. La planta funciona en tres turnos diarios precisamente para que una pieza retrasada de un lado de la frontera nunca espere mucho del otro lado.|Une commande urgente avait besoin de bras supplémentaires sur la chaîne avant que le camion pour la frontière ne parte à l'aube, et le chef d'équipe offrit une paie double à qui pourrait rester après minuit. L'usine tourne en trois équipes par jour précisément pour qu'une pièce retardée d'un côté de la frontière n'attende jamais longtemps de l'autre côté.|急ぎの注文で、国境行きのトラックが夜明けに出る前にライン作業員が足りなくなり、シフト主任は日付が変わっても残れる者に倍の賃金を出した。工場が一日三交代で回るのは、国境の片側で遅れた部品を反対側で長く待たせないためである。",
  ),
  ev(
    "peso-exchange-loss", "loss", ["mex"], "💱", 210,
    "A bad exchange rate at the border kiosk|Un mal tipo de cambio en el quiosco de la frontera|Un mauvais taux de change au kiosque frontalier|国境の両替所で悪いレートをつかまされる",
    "The kiosk right at the checkpoint posted a rate a good deal worse than the bank a few blocks further on, and the small print about a service fee only became clear after the cash had already changed hands. Travelers in a hurry to cross before the queue built up rarely stop to compare.|El quiosco justo en el puesto fronterizo tenía una tasa bastante peor que el banco unas cuadras más allá, y la letra pequeña sobre una comisión de servicio solo quedó clara después de que el efectivo ya había cambiado de manos. Los viajeros con prisa por cruzar antes de que se formara la cola rara vez se detienen a comparar.|Le kiosque juste au poste-frontière affichait un taux bien pire que la banque quelques rues plus loin, et les petits caractères sur des frais de service ne devinrent clairs qu'après que l'argent eut déjà changé de main. Les voyageurs pressés de passer avant que la file ne s'allonge s'arrêtent rarement pour comparer.|検問所のすぐそばの両替所は、数区画先の銀行よりかなり悪いレートを掲示していた。手数料についての小さな注記は、現金がすでに渡ったあとになってようやく気づかれた。列が伸びる前に急いで渡りたい旅行者は、めったに比べてみようとしない。",
  ),

  // ---- canorth(中米北部) ----
  ev(
    "coffee-picking-day", "gain", ["canorth"], "☕", 230,
    "A day picking coffee cherries at harvest|Un día recogiendo cerezas de café en la cosecha|Une journée de cueillette des cerises de café à la récolte|収穫期にコーヒーの実を摘む",
    "A hillside farm needed extra hands during the peak of the harvest, paying by the basket rather than the hour so a fast picker could earn well above the going rate before the afternoon rain made the slope too slick to work. Only the reddest cherries count toward the total; green ones tossed in get the whole basket turned back.|Una finca en la ladera necesitaba manos extra en el pico de la cosecha, pagando por cesto en vez de por hora, así que un recolector rápido podía ganar bastante más del salario habitual antes de que la lluvia de la tarde volviera la ladera demasiado resbaladiza. Solo cuentan las cerezas más rojas.|Une exploitation à flanc de coteau avait besoin de bras supplémentaires au pic de la récolte, payant au panier plutôt qu'à l'heure, si bien qu'un cueilleur rapide pouvait gagner bien au-delà du tarif habituel avant que la pluie de l'après-midi ne rende la pente trop glissante. Seules comptent les cerises les plus rouges.|斜面の農園は収穫の盛りに人手を求め、時給ではなく籠一杯ごとの出来高で払った。手の速い者なら、午後の雨で斜面が滑りやすくなる前に相場よりかなり稼げた。数えられるのはいちばん赤く熟した実だけで、青いのが混じっていると籠ごと突き返される。",
  ),
  ev(
    "bus-breakdown", "loss", ["canorth"], "🚌", 230,
    "A converted school bus breaks down mid-route|Un autobús escolar reconvertido se avería a mitad de ruta|Un ancien bus scolaire tombe en panne en pleine route|改造スクールバスが道中で故障する",
    "The repainted school bus serving as the local route coughed to a stop halfway up a mountain grade, and the only way onward before dark was a shared pickup truck charging by the seat. The original bus, decades retired from hauling children somewhere in North America, had clearly seen better days long before this one.|El autobús escolar repintado que hacía de ruta local se paró tosiendo a mitad de una cuesta de montaña, y la única forma de seguir antes del anochecer fue una camioneta compartida que cobraba por asiento. El autobús original, retirado hace décadas de llevar niños en algún lugar de Norteamérica, ya había visto días mejores mucho antes de este.|Le bus scolaire repeint qui assurait la ligne locale s'arrêta en toussotant à mi-pente d'une côte de montagne, et le seul moyen de continuer avant la nuit fut un pick-up partagé facturant au siège. Le bus d'origine, retiré depuis des décennies du transport d'enfants quelque part en Amérique du Nord, avait connu des jours meilleurs bien avant celui-ci.|地方路線を担う塗り直しのスクールバスは、山道の坂の途中で咳き込むように止まってしまった。日が暮れる前に先へ進む手段は、座席ごとに料金を取る乗り合いピックアップトラックだけだった。北アメリカのどこかで何十年も前に子どもを乗せる仕事を退いたこのバスは、この日よりずっと前から盛りを過ぎていた。",
  ),

  // ---- casouth(中米南部) ----
  ev(
    "canal-pilot-tip", "gain", ["casouth"], "🚢", 250,
    "Handling lines for a yacht through the locks|Ayudando con los cabos de un yate en las esclusas|Manœuvrer les amarres d'un yacht dans les écluses|閘門を通る小型ヨットの綱取りを手伝う",
    "A private yacht too small to afford a full canal transit crew needed four extra pairs of hands to hold it steady in the chamber while the water rose, and paid each of them in cash once the gates opened on the far side. The lines have to stay taut the whole way through, or the boat drifts and scrapes the wall.|Un yate privado demasiado pequeño para pagar una tripulación completa de tránsito por el canal necesitaba cuatro pares de manos extra para mantenerlo firme en la cámara mientras subía el agua, y pagó en efectivo a cada uno en cuanto se abrieron las puertas del otro lado.|Un yacht privé trop petit pour se payer un équipage complet de transit du canal avait besoin de quatre paires de bras supplémentaires pour le maintenir stable dans le sas pendant que l'eau montait, et paya chacun en espèces une fois les portes ouvertes de l'autre côté.|運河を通り抜けるだけの乗組員を雇う余裕のない小さな個人ヨットは、水位が上がるあいだ閘室の中で船体を安定させるため、あと四人の手を必要とした。反対側の扉が開くと、それぞれに現金で払われた。綱はずっとぴんと張っていなければ、船が流されて壁をこすってしまう。",
  ),
  ev(
    "volcanic-ash-cleanup", "loss", ["casouth"], "🌋", 240,
    "Paying to have ash cleared from a rented roof|Pagando para limpiar la ceniza del tejado alquilado|Payer pour faire nettoyer la cendre d'un toit loué|借りた宿の屋根の火山灰を片付ける費用",
    "A dusting of volcanic ash from a rumbling peak nearby settled thick enough on the guesthouse roof to worry about the gutters, and the owner split the cost of clearing it with whoever happened to be staying that week. It happens often enough here that most roofs are built with a steeper pitch than the rain alone would require.|Una capa de ceniza volcánica de un pico cercano en actividad se posó lo bastante espesa en el tejado de la posada como para preocupar por los canalones, y el dueño repartió el coste de limpiarla con quien estuviera hospedado esa semana. Aquí ocurre con tanta frecuencia que la mayoría de los tejados se construyen con más pendiente de la que exigiría solo la lluvia.|Une couche de cendre volcanique venue d'un sommet grondant tout proche s'était déposée assez épaisse sur le toit de la pension pour inquiéter au sujet des gouttières, et le propriétaire partagea le coût du nettoyage avec qui logeait là cette semaine-là. Cela arrive ici assez souvent pour que la plupart des toits soient bâtis avec une pente plus raide que la pluie seule ne l'exigerait.|近くでくすぶる山から出た火山灰が、宿の屋根に樋が心配になるほど厚く積もった。宿の主人は、その週たまたま泊まっていた客と片付け費用を折半した。ここではよくあることで、雨だけなら要らないほど急な勾配で屋根を建てるのが普通になっている。",
  ),

  // ---- cargr(大アンティル諸島とバハマ) ----
  ev(
    "cigar-rolling-demo", "gain", ["cargr"], "🚬", 220,
    "Paid to demonstrate cigar rolling for a tour group|Pagado por hacer una demostración de torcido de puros para un grupo turístico|Payé pour une démonstration de roulage de cigares devant un groupe de touristes|見学ツアーに葉巻巻きの実演を見せる",
    "A tour bus stopped without warning at the workshop, and the roller on duty was paid extra to slow down and narrate each fold of the wrapper leaf for a group holding up their phones. The good tobacco leaves get set aside for paying customers regardless; what the visitors watch get rolled is never the best of the day's stock.|Un autobús turístico paró sin aviso en el taller, y al torcedor de turno le pagaron un extra por ir despacio y explicar cada pliegue de la hoja capa para un grupo con los teléfonos en alto. Las mejores hojas de tabaco se apartan igualmente para los clientes que pagan.|Un bus touristique s'arrêta sans prévenir devant l'atelier, et le rouleur de service fut payé en plus pour ralentir et commenter chaque pli de la feuille de cape devant un groupe brandissant ses téléphones. Les meilleures feuilles de tabac sont de toute façon mises de côté pour les clients payants.|観光バスが予告なく工房の前に止まり、その日の担当の巻き手は、スマホを構える一団のためにゆっくりと、外側の葉の一折り一折りを説明しながら追加の手当をもらった。良い葉はどのみち買い付け客のために取り分けてあり、見物客の前で巻かれるのはその日いちばんの葉ではない。",
  ),
  ev(
    "hurricane-shutters", "loss", ["cargr"], "🪟", 250,
    "Buying plywood and batteries before a storm|Comprando madera contrachapada y pilas antes de una tormenta|Acheter du contreplaqué et des piles avant une tempête|嵐に備えて合板と電池を買い込む",
    "The forecast cone shifted overnight to point straight at the island, and the hardware store's shelves of plywood and batteries emptied within the hour at prices that had crept up since the news broke. Everyone on the street seemed to be carrying the same two things at once.|El cono del pronóstico se desplazó de la noche a la mañana para apuntar directo a la isla, y los estantes de madera contrachapada y pilas de la ferretería se vaciaron en una hora a precios que habían subido desde que saltó la noticia. Todos en la calle parecían llevar las mismas dos cosas a la vez.|Le cône de prévision se déplaça du jour au lendemain pour pointer droit sur l'île, et les rayons de contreplaqué et de piles de la quincaillerie se vidèrent en une heure, à des prix qui avaient grimpé depuis l'annonce. Tout le monde dans la rue semblait porter les deux mêmes choses à la fois.|予報円は一夜のうちに動き、島をまっすぐ指すようになった。金物店の合板と電池の棚は一時間で空になり、値段はニュースが流れてから少しずつ上がっていた。通りの誰もが、同じ二つのものを一度に抱えているように見えた。",
  ),

  // ---- cargr続き(バハマ) ----
  ev(
    "duty-free-tip", "gain", ["cargr"], "🛍️", 210,
    "Minding a duty-free stall for a sick friend|Atendiendo un puesto libre de impuestos por un amigo enfermo|Tenir un étal hors taxes pour un ami malade|体調を崩した友人の代わりに免税店の売場に立つ",
    "A cruise ship in port meant a rush of buyers all at once, and a stall owner too sick to stand paid well for a few hours of someone else minding the register and wrapping bottles for the walk back to the dock. The ship's horn sounding for final boarding is the only clock that matters on a day like this.|Un crucero en puerto significaba una avalancha de compradores de golpe, y una dueña de puesto demasiado enferma para estar de pie pagó bien por unas horas de alguien que atendiera la caja y envolviera botellas para el paseo de vuelta al muelle.|Un paquebot de croisière au port signifiait une ruée d'acheteurs d'un coup, et une tenancière d'étal trop malade pour tenir debout paya bien pour quelques heures où quelqu'un d'autre s'occupa de la caisse et emballa des bouteilles pour le trajet retour jusqu'au quai.|クルーズ船の寄港で客が一気に押し寄せた日、立っていられないほど具合の悪かった売場の主人は、レジと瓶の梱包を代わってくれる人に良い手当を払った。こういう日に意味を持つ時計はただ一つ、最終乗船を告げる船の汽笛だけである。",
  ),
  ev(
    "ferry-missed", "loss", ["cargr"], "⛴️", 200,
    "Missing the last inter-island ferry of the day|Perdiendo el último ferri interinsular del día|Rater le dernier ferry inter-îles de la journée|その日最後の島間フェリーに乗り遅れる",
    "The ferry pulled away from the dock a full five minutes early, apparently at the captain's own discretion, leaving no choice but to charter a much smaller boat for triple the fare to reach the other island before dark. Island schedules, it turns out, are more of a suggestion than a promise.|El ferri zarpó del muelle a los cinco minutos completos de antelación, al parecer por decisión propia del capitán, sin dejar más opción que fletar un barco mucho más pequeño por el triple del pasaje para llegar a la otra isla antes del anochecer.|Le ferry quitta le quai a cinq bonnes minutes d'avance, apparemment à la seule discrétion du capitaine, ne laissant d'autre choix que d'affréter un bateau bien plus petit pour le triple du tarif afin d'atteindre l'autre île avant la nuit.|フェリーは船長の一存らしく、まるまる5分早く岸壁を離れてしまった。日が暮れる前に別の島へ渡るには、三倍の運賃でずっと小さな船をチャーターするほかなかった。島の時刻表は約束というより、目安程度のものだと分かった一日だった。",
  ),
];
