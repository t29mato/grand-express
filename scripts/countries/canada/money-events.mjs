/**
 * カナダの青マス・赤マスで起きる出来事(25件。増13・減12)。
 *
 * 地方コード: bc=ブリティッシュコロンビア / ab=アルバータ / pr=プレーリー /
 * on=オンタリオ / qc=ケベック / atl=大西洋岸 / north=準州
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、7地方それぞれに3件、季節や暮らしに結びつけて置いている。
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

export const CANADA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "bottle-drive", "gain", [], "🍾", 210,
    "A minor hockey bottle drive|Una colecta de botellas para el hockey infantil|Une collecte de bouteilles pour le hockey mineur|少年ホッケーチームの空き瓶集め",
    "Every driveway on the block had a bag of empties waiting by the time the team finished its route, and the deposit refund at the depot covered a chunk of one player's season fees. Bottle drives fund everything from tournament travel to new jerseys across the country's tens of thousands of minor hockey teams.|Cada entrada de garaje de la manzana tenía una bolsa de envases vacíos lista cuando el equipo terminó su ronda, y el reembolso del depósito en el centro de canje cubrió buena parte de la cuota de temporada de un jugador. Las colectas de botellas financian de todo, desde viajes a torneos hasta camisetas nuevas.|Chaque entrée de garage du pâté de maisons avait un sac de contenants vides prêt quand l'équipe eut fini sa tournée, et le remboursement de la consigne au dépôt a couvert une bonne part des frais de saison d'un joueur. Les collectes de bouteilles financent tout, des déplacements en tournoi aux nouveaux chandails.|チームが一周する頃には、通りのどの家の玄関先にも空き瓶の袋が用意されていた。回収センターでのデポジット払い戻しは、選手一人分のシーズン会費のかなりの部分をまかなった。空き瓶集めは、遠征費から新しいユニフォームまで、国内何万もの少年ホッケーチームの資金源になっている。",
  ),
  ev(
    "storm-shovel", "gain", [], "🌨️", 180,
    "Shovelling driveways after a big snowfall|Palear entradas tras una gran nevada|Pelleter des entrées après une grosse chute de neige|大雪のあと、近所の除雪を手伝う",
    "The street was buried by morning, and going door to door with a shovel before anyone left for work earned more in two hours than the same time spent at a part-time job. A car battery pack for the snowblower would have paid for itself years ago at this rate.|La calle amaneció sepultada, y recorrer las puertas con una pala antes de que alguien saliera al trabajo rindió más en dos horas que el mismo tiempo en un empleo de medio turno. Una batería para la sopladora de nieve se habría pagado sola hace años a este ritmo.|La rue était ensevelie au petit matin, et faire du porte-à-porte avec une pelle avant que quiconque ne parte au travail a rapporté plus en deux heures qu'autant de temps dans un emploi à temps partiel. Une batterie pour la souffleuse à neige se serait payée toute seule depuis des années à ce rythme.|朝には通り全体が雪に埋もれていた。誰かが出勤する前にシャベルを持って一軒一軒回ると、二時間でアルバイト以上の稼ぎになった。この調子なら除雪機用のバッテリーはとうに元が取れていただろう。",
  ),
  ev(
    "winter-tire-bill", "loss", [], "🛞", 190,
    "The seasonal tire changeover bill|La factura del cambio de neumáticos de temporada|La facture du changement de pneus saisonnier|冬タイヤへの交換費用",
    "The shop was booked solid the week the first real snow was forecast, and getting a slot at all meant paying the rush surcharge on top of the changeover itself. Winter tires are effectively mandatory by law in some provinces and by common sense everywhere else.|El taller estaba completamente reservado la semana en que se pronosticaba la primera nevada real, y conseguir un turno significó pagar el recargo por urgencia además del cambio en sí. Los neumáticos de invierno son prácticamente obligatorios por ley en algunas provincias y por sentido común en el resto.|L'atelier était complet la semaine où la première vraie neige était annoncée, et obtenir un rendez-vous a exigé de payer le supplément d'urgence en plus du changement lui-même. Les pneus d'hiver sont pratiquement obligatoires par la loi dans certaines provinces et par bon sens partout ailleurs.|最初の本格的な雪が予報された週、整備工場はどこも予約でいっぱいだった。順番を確保できただけでも、交換代に加えて特急料金を払う羽目になった。冬タイヤは一部の州では法律上ほぼ義務であり、それ以外の州でも常識として欠かせない。",
  ),
  ev(
    "dead-battery", "loss", [], "🔋", 160,
    "A car that won't start in a cold snap|Un auto que no arranca en una ola de frío|Une voiture qui ne démarre pas en pleine vague de froid|寒波で車のバッテリーが上がる",
    "The engine turned over once, weakly, and then nothing, and the tow truck dispatcher said every line in the city was backed up for hours in weather like this. A set of jumper cables and a more patient neighbour would have saved most of the bill.|El motor giró una vez, débilmente, y luego nada, y el despachador de la grúa dijo que todas las líneas de la ciudad estaban saturadas por horas con un clima así. Un juego de cables de arranque y un vecino más paciente habrían ahorrado casi toda la factura.|Le moteur a tourné une fois, faiblement, puis plus rien, et le répartiteur de la dépanneuse a dit que toutes les lignes de la ville étaient débordées pendant des heures par un temps pareil. Un jeu de câbles de démarrage et un voisin plus patient auraient épargné l'essentiel de la facture.|エンジンは一度弱くうなっただけで、そのあとは何も起きなかった。レッカー会社の受付は、こんな寒さの日は市内どこも数時間待ちだと言った。ブースターケーブル一式と気の長い隣人がいれば、費用の大半は浮いただろう。",
  ),

  // ---- bc ブリティッシュコロンビア ----
  ev(
    "tree-planting", "gain", ["bc"], "🌲", 260,
    "A piece-rate tree-planting contract|Un contrato de plantación de árboles a destajo|Un contrat de plantation d'arbres à la pièce|出来高払いの植林契約",
    "The crew boss paid by the tree, not the hour, and a fast day on a gentle slope cleared far more than a fast day on the steep, rocky block from the week before. Reforestation crews replant hundreds of millions of seedlings across BC's logged hillsides every spring and summer.|El capataz pagaba por árbol, no por hora, y un día veloz en una ladera suave rindió mucho más que un día veloz en el terreno rocoso y empinado de la semana anterior. Las cuadrillas de reforestación replantan cientos de millones de plántulas cada primavera y verano.|Le chef d'équipe payait à l'arbre, pas à l'heure, et une journée rapide sur une pente douce a rapporté bien plus qu'une journée rapide sur le bloc rocheux et escarpé de la semaine précédente. Les équipes de reboisement replantent des centaines de millions de semis chaque printemps et été.|作業班長は時給ではなく本数払いだった。なだらかな斜面での速い一日は、先週の急で岩だらけの区画での速い一日よりずっと稼げた。植林作業員たちは毎春毎夏、BC州の伐採跡地に何億本もの苗木を植え続けている。",
    [1, 2, 3],
  ),
  ev(
    "ferry-missed", "loss", ["bc"], "⛴️", 170,
    "Missing the ferry sailing by two minutes|Perder el ferry por dos minutos|Rater le traversier de deux minutes|フェリーにわずか二分の差で乗り遅れる",
    "The gate closed just as the car reached the ramp, and the wait for the next sailing came with an extra fee for the walk-on lineup that had formed behind. Sailings between the mainland and the islands can run hours apart outside peak season, so two minutes can cost most of an afternoon.|La compuerta se cerró justo cuando el auto llegó a la rampa, y la espera del siguiente ferry vino con un cargo extra por la fila de pasajeros a pie que se había formado detrás. Fuera de temporada alta, los ferris pueden salir con horas de diferencia, así que dos minutos pueden costar casi toda una tarde.|La barrière s'est fermée juste comme la voiture atteignait la rampe, et l'attente du traversier suivant est venue avec des frais supplémentaires pour la file de piétons formée derrière. Hors haute saison, les traversées peuvent être espacées de plusieurs heures, si bien que deux minutes peuvent coûter presque tout un après-midi.|車がスロープに着いたちょうどそのとき、ゲートが閉まった。次の便を待つあいだ、後ろにできた徒歩乗船の列の分の追加料金までかかった。繁忙期を外れると本土と島を結ぶ便は数時間おきしかなく、たった二分の遅れが午後をまるごと奪うこともある。",
  ),
  ev(
    "bear-bin-fine", "loss", ["bc"], "🐻", 140,
    "A fine for a bear-proof bin left unlocked|Una multa por dejar sin cerrar el contenedor a prueba de osos|Une amende pour un bac anti-ours laissé déverrouillé|クマ対策ゴミ箱の施錠忘れで罰金",
    "The lid was left just slightly ajar overnight, and by morning the whole street's bins had been tipped and gone through, black bear tracks pressed into the flowerbed as evidence. Several BC municipalities now fine households for improperly secured bins, on the theory that a fed bear rarely stays a wild one for long.|La tapa quedó apenas entreabierta durante la noche, y por la mañana todos los contenedores de la calle habían sido volcados y hurgados, con huellas de oso negro marcadas en el parterre como prueba. Varios municipios de BC ahora multan a los hogares por contenedores mal asegurados.|Le couvercle est resté légèrement entrouvert pendant la nuit, et au matin, tous les bacs de la rue avaient été renversés et fouillés, des empreintes d'ours noir marquées dans le parterre comme preuve. Plusieurs municipalités de la C.-B. amendent désormais les foyers pour des bacs mal verrouillés.|夜のあいだ蓋がほんの少し閉まりきっていなかっただけで、朝には通りじゅうのゴミ箱がひっくり返され漁られていた。花壇にはクマの足跡が証拠のように残っていた。BC州のいくつかの自治体は、いまではきちんと施錠されていないゴミ箱に罰金を科す。餌付いたクマは野生のままではいられなくなることが多いという理屈である。",
    [2, 3, 4, 5],
  ),

  // ---- ab アルバータ ----
  ev(
    "chinook-carwash", "gain", ["ab"], "💨", 230,
    "A car wash rush when a chinook blows in|Prisa en el lavado de autos cuando llega un chinook|Une ruée au lave-auto quand souffle un chinook|シヌーク現象で洗車場が急に混み合う",
    "The temperature climbed twenty degrees in an hour as the warm wind rolled off the Rockies, and every car in the city that had spent the winter caked in road salt suddenly needed washing at once. Picking up an extra shift at the car wash on a chinook day pays better than a normal weekend.|La temperatura subió veinte grados en una hora cuando el viento cálido bajó de las Rocosas, y de golpe todos los autos de la ciudad, cubiertos de sal de carretera tras el invierno, necesitaron un lavado a la vez. Tomar un turno extra en el lavadero en un día de chinook paga mejor que un fin de semana normal.|La température a grimpé de vingt degrés en une heure quand le vent chaud est descendu des Rocheuses, et d'un coup toutes les voitures de la ville, couvertes de sel de déneigement depuis l'hiver, ont eu besoin d'un lavage en même temps. Prendre un quart supplémentaire au lave-auto un jour de chinook paie mieux qu'une fin de semaine normale.|ロッキー山脈から吹き下ろす暖かい風で、気温が一時間で20度も上がった。冬のあいだ融雪剤にまみれていた街じゅうの車が、いっせいに洗車を必要とした。シヌークの日に洗車場の追加シフトに入ると、ふつうの週末より稼げる。",
    [8, 9, 10],
  ),
  ev(
    "hail-dent", "loss", ["ab"], "🧊", 220,
    "A summer hailstorm dents the car roof|Una granizada de verano abolla el techo del auto|Une grêle d'été cabosse le toit de la voiture|夏のひょうで車の屋根がへこむ",
    "The sky turned green and the storm lasted barely ten minutes, but the golf-ball-sized hail left the roof and hood looking like a golf ball themselves. Southern Alberta sits inside what insurers call hail alley, and a single severe storm here can generate more vehicle damage claims than a whole year elsewhere.|El cielo se puso verde y la tormenta duró apenas diez minutos, pero el granizo del tamaño de una pelota de golf dejó el techo y el capó con el mismo aspecto de una pelota de golf. El sur de Alberta está en lo que las aseguradoras llaman el callejón del granizo.|Le ciel a viré au vert et l'orage a duré à peine dix minutes, mais la grêle de la taille d'une balle de golf a laissé le toit et le capot avec l'allure d'une balle de golf. Le sud de l'Alberta se trouve dans ce que les assureurs appellent l'allée de la grêle.|空が緑色に変わり、嵐はわずか10分ほどで去ったが、ゴルフボール大のひょうは屋根とボンネットをまるでゴルフボールの表面のように凹ませた。南部アルバータは保険会社が「雹の回廊」と呼ぶ地帯にあり、ここでの一度の激しい嵐が、他の地域の一年分を超える車両損害請求を生むこともある。",
    [2, 3, 4],
  ),
  ev(
    "camp-cook", "gain", ["ab"], "🍳", 300,
    "Filling in as a cook at a work camp|Cubriendo como cocinero en un campamento de trabajo|Remplacer comme cuisinier dans un camp de travailleurs|作業員宿舎の炊事係を臨時で務める",
    "A camp kitchen out past the last paved road needed a cook for a two-week rotation on almost no notice, and the isolation pay on top of the wage made the math work out well despite the long hours. Camps like this feed crews working the province's oil and gas sites around the clock.|Una cocina de campamento más allá del último camino pavimentado necesitaba un cocinero para una rotación de dos semanas casi sin aviso, y el pago por aislamiento sumado al salario compensó las largas jornadas. Campamentos como este alimentan a cuadrillas que trabajan sin parar en los yacimientos de petróleo y gas de la provincia.|Une cuisine de camp au-delà de la dernière route pavée avait besoin d'un cuisinier pour une rotation de deux semaines, presque sans préavis, et la prime d'éloignement en plus du salaire a compensé les longues heures. Des camps comme celui-ci nourrissent des équipes qui travaillent sans relâche sur les sites pétroliers et gaziers de la province.|舗装道路の途切れた先にある作業員宿舎の炊事場が、ほとんど間際の通告で二週間交代の炊事係を求めていた。長時間労働ではあったが、給料に上乗せされる僻地手当のおかげで割に合った。こうした宿舎は、州の石油・ガス採掘現場で昼夜働く作業員たちを支えている。",
  ),

  // ---- pr プレーリー ----
  ev(
    "custom-combine", "gain", ["pr"], "🌾", 280,
    "Hiring on with a custom combine crew|Contratado con una cuadrilla de cosecha itinerante|Embauché avec une équipe de moissonneuses itinérante|移動収穫クルーに日雇いで雇われる",
    "The crew works its way north as the grain ripens, farm to farm, and a driver willing to run a combine past midnight during a short weather window earns overtime that a regular harvest job never offers. Custom crews like this cut a meaningful share of the Prairie grain harvest every year.|La cuadrilla avanza hacia el norte a medida que madura el grano, granja por granja, y un conductor dispuesto a manejar la cosechadora hasta pasada la medianoche en una breve ventana de buen tiempo gana horas extra que un trabajo de cosecha normal nunca ofrece.|L'équipe remonte vers le nord au fil de la maturation du grain, ferme après ferme, et un conducteur prêt à faire tourner la moissonneuse-batteuse après minuit pendant une courte fenêtre météo gagne des heures supplémentaires qu'un emploi de récolte ordinaire n'offre jamais.|穀物が実るにつれ、クルーは農場から農場へと北上していく。短い好天の間隙を突いて真夜中過ぎまでコンバインを走らせる運転手には、ふつうの収穫仕事では望めない残業代が支払われる。こうした移動クルーは毎年、プレーリーの穀物収穫のかなりの割合を刈り取っている。",
    [4, 5],
  ),
  ev(
    "blizzard-motel", "loss", ["pr"], "🌬️", 200,
    "A whiteout closes the highway|Una tormenta de nieve cierra la carretera|Un blizzard ferme l'autoroute|吹雪で幹線道路が閉鎖される",
    "Visibility dropped to nothing somewhere between two towns with a lot of open prairie and not much else between them, and the highway patrol closed the road until the wind died down. The only motel for eighty kilometres filled up within the hour.|La visibilidad cayó a cero en algún punto entre dos pueblos con mucha pradera abierta y poco más entre ellos, y la patrulla de caminos cerró la vía hasta que amainara el viento. El único motel en ochenta kilómetros se llenó en una hora.|La visibilité est tombée à zéro quelque part entre deux villes séparées par beaucoup de prairie ouverte et pas grand-chose d'autre, et la patrouille routière a fermé la route jusqu'à ce que le vent tombe. Le seul motel à quatre-vingts kilomètres à la ronde a fait le plein en une heure.|開けたプレーリーがどこまでも続くだけの二つの町のあいだで、視界がまったく利かなくなった。ハイウェイパトロールは風がおさまるまで道路を閉鎖した。80キロ圏内で唯一のモーテルは一時間で満室になった。",
    [8, 9, 10],
  ),
  ev(
    "bonspiel-prize", "gain", ["pr"], "🥌", 210,
    "A small prize at the local curling bonspiel|Un pequeño premio en el bonspiel de curling local|Un petit prix au bonspiel de curling local|地元カーリング大会の小さな賞金",
    "The rink's weekend bonspiel drew rinks from three neighbouring towns, and a last-end steal in the consolation bracket was enough to take home a modest cash prize and a case of the sponsor's beer. Small-town curling clubs like this one anchor the winter social calendar across the prairies.|El bonspiel de fin de semana del club atrajo equipos de tres pueblos vecinos, y un robo en la última mano del cuadro de consolación bastó para llevarse a casa un modesto premio en efectivo y una caja de la cerveza del patrocinador. Clubes de curling de pueblo como este sostienen el calendario social del invierno en las praderas.|Le bonspiel du week-end au club a attiré des équipes de trois villes voisines, et un vol à la dernière manche du tableau de consolation a suffi pour rapporter un modeste prix en argent et une caisse de la bière du commanditaire. Des clubs de curling de petite ville comme celui-ci soutiennent le calendrier social de l'hiver dans les Prairies.|週末の大会には近隣三つの町からチームが集まった。敗者復活戦の最終エンドでの逆転が、わずかな賞金とスポンサー提供のビール一箱を持ち帰るのに十分だった。こうした小さな町のカーリングクラブが、プレーリーの冬の社交暦を支えている。",
    [8, 9, 10],
  ),

  // ---- on オンタリオ ----
  ev(
    "cottage-caretaker", "gain", ["on"], "🏡", 250,
    "Caretaking a cottage for the weekend|Cuidando una cabaña el fin de semana|Garder un chalet pour le week-end|週末、他人の別荘の留守番を頼まれる",
    "The owners were away and asked only that the pipes be checked and the dock be pulled in before the weather turned, a light job that paid better than the two days of work it displaced. Cottage country north of the big cities empties out all winter and fills the same way every long weekend in summer.|Los dueños estaban fuera y solo pidieron revisar las tuberías y retirar el muelle antes de que cambiara el clima, un trabajo ligero que pagó mejor que los dos días de trabajo que reemplazó. La región de las cabañas al norte de las grandes ciudades se vacía todo el invierno y se llena igual cada fin de semana largo de verano.|Les propriétaires étaient absents et n'ont demandé que de vérifier les tuyaux et de rentrer le quai avant que le temps ne change, un travail léger qui a mieux payé que les deux jours de travail remplacés. Le pays des chalets au nord des grandes villes se vide tout l'hiver et se remplit de la même façon chaque long week-end d'été.|所有者は留守で、天候が崩れる前に配管を確認し桟橋を上げておいてほしいと頼まれただけだった。その軽い仕事は、代わりに休んだ二日分の仕事より実入りがよかった。大都市の北にある別荘地は冬の間はほとんど空になり、夏の連休のたびに同じように賑わう。",
  ),
  ev(
    "toll-highway-bill", "loss", ["on"], "🛣️", 180,
    "An unexpectedly large toll highway bill|Una factura inesperadamente alta de la autopista de peaje|Une facture inattendue de l'autoroute à péage|想定外に高額だった有料道路の請求書",
    "Taking the toll route around the worst of rush hour seemed like the faster option every single day that month, and the invoice that arrived weeks later added it all up at once. The per-kilometre rate on the region's electronic toll highway climbs with the time of day, and nobody checks it in the moment.|Tomar la ruta de peaje para evitar lo peor de la hora pico parecía la opción más rápida cada día de ese mes, y la factura que llegó semanas después lo sumó todo de golpe. La tarifa por kilómetro en la autopista de peaje electrónico de la región sube según la hora del día.|Prendre la voie à péage pour éviter le pire de l'heure de pointe semblait la meilleure option chaque jour de ce mois-là, et la facture arrivée des semaines plus tard a tout additionné d'un coup. Le tarif au kilomètre sur l'autoroute à péage électronique de la région grimpe selon l'heure de la journée.|その月、ラッシュの最悪の時間帯を避けるため有料道路を使うのが毎日いちばん速い選択に思えたが、数週間後に届いた請求書はそれをまとめて突き付けてきた。この地域の電子式有料道路のキロ単価は時間帯によって上がり、利用しているその場では誰も気にしない。",
  ),
  ev(
    "leaf-raking", "gain", ["on"], "🍁", 170,
    "Raking leaves before a windstorm|Rastrillando hojas antes de una tormenta de viento|Ramasser les feuilles avant une tempête de vent|嵐の前に落ち葉をかき集める",
    "The forecast called for wind strong enough to scatter every leaf on the block into the neighbour's yard, and getting the bags out to the curb before the storm hit was worth a good tip from more than one household. Municipal leaf pickup schedules across southern Ontario turn this into a short but busy season every autumn.|El pronóstico anunciaba viento lo bastante fuerte como para esparcir todas las hojas de la manzana en el jardín del vecino, y sacar las bolsas a la acera antes de que llegara la tormenta valió una buena propina de más de un hogar. Los calendarios municipales de recolección de hojas en el sur de Ontario convierten esto en una temporada corta pero intensa cada otoño.|Les prévisions annonçaient un vent assez fort pour disperser toutes les feuilles du pâté de maisons dans la cour du voisin, et sortir les sacs au trottoir avant l'arrivée de la tempête a valu un bon pourboire de plus d'un foyer. Les calendriers municipaux de ramassage des feuilles dans le sud de l'Ontario en font une saison courte mais chargée chaque automne.|予報では、通りの落ち葉をすべて隣の庭まで吹き飛ばしかねないほどの強風が伝えられていた。嵐の前に袋を歩道際まで運び出すと、何軒もの家から気前のよいチップがもらえた。オンタリオ州南部の自治体の落ち葉回収スケジュールは、毎秋この時期を短いが忙しい書き入れ時に変える。",
    [6, 7],
  ),

  // ---- qc ケベック ----
  ev(
    "sugar-shack-help", "gain", ["qc"], "🍁", 230,
    "Boiling sap at a sugar shack during the run|Hirviendo savia en una cabaña de azúcar durante la temporada|Faire bouillir la sève dans une cabane à sucre pendant la coulée|メープルシロップの季節、シュガーシャックで樹液を煮詰める手伝い",
    "The sap only runs during the few weeks each spring when nights still freeze and days thaw, so the shack needed extra hands round the clock to keep the evaporator fed while the run lasted. Families who own a sugar bush often hire on neighbours for exactly this short, unpredictable window.|La savia solo corre durante las pocas semanas de cada primavera en que las noches aún hielan y los días deshielan, así que la cabaña necesitó manos extra las veinticuatro horas para alimentar el evaporador mientras duró la temporada. Las familias dueñas de una arboleda de arces suelen contratar vecinos justo para esta breve e impredecible ventana.|La sève ne coule que pendant les quelques semaines de chaque printemps où les nuits gèlent encore et les jours dégèlent, si bien que la cabane a eu besoin de bras supplémentaires jour et nuit pour alimenter l'évaporateur tant que durait la coulée. Les familles propriétaires d'une érablière embauchent souvent des voisins pour cette fenêtre courte et imprévisible.|樹液が採れるのは、夜はまだ凍り昼には溶けるという春先のわずか数週間だけである。その間、蒸発釜に樹液を絶やさず注ぎ続けるため、シュガーシャックは昼夜を問わず人手を求めていた。楓林を持つ家族は、まさにこの短く予測のつかない時期のために近所の人を雇うことが多い。",
    [11, 0],
  ),
  ev(
    "sidewalk-snow-fine", "loss", ["qc"], "🚧", 160,
    "A fine for not clearing the sidewalk in time|Una multa por no despejar la acera a tiempo|Une amende pour ne pas avoir déblayé le trottoir à temps|規定時間内に歩道の雪をかかなかった罰金",
    "The bylaw gives residents a set number of hours after snow stops falling to clear their stretch of sidewalk, and an inspector's ticket arrived before the shovel ever left the porch. Winter parking bans and snow-clearing rules are strict enough in Quebec's cities that ignorance is rarely accepted as an excuse.|El reglamento da a los residentes un número fijo de horas tras dejar de nevar para despejar su tramo de acera, y llegó la multa del inspector antes de que la pala saliera siquiera del porche. Las prohibiciones de estacionamiento invernal y las normas de limpieza de nieve son lo bastante estrictas en las ciudades de Quebec.|Le règlement accorde aux résidents un nombre d'heures fixe après la fin de la neige pour déblayer leur tronçon de trottoir, et l'amende de l'inspecteur est arrivée avant même que la pelle ne quitte le perron. Les interdictions de stationnement hivernal et les règles de déneigement sont assez strictes dans les villes du Québec pour que l'ignorance soit rarement acceptée comme excuse.|条例では、雪がやんでから決められた時間以内に自分の家の前の歩道を除雪することになっているが、シャベルがポーチを出るより先に検査員の切符が届いてしまった。ケベックの都市では冬季の駐車禁止や除雪規則が厳しく、知らなかったでは済まされないことが多い。",
    [8, 9, 10],
  ),
  ev(
    "carnaval-ice-sculpture", "gain", ["qc"], "❄️", 240,
    "Helping carve ice sculptures for Winter Carnival|Ayudando a tallar esculturas de hielo para el Carnaval de Invierno|Aider à sculpter des sculptures de glace pour le Carnaval d'hiver|冬祭りの氷像彫刻を手伝う",
    "The carving crew needed an extra chainsaw hand to rough out blocks before the detail artists took over, cold work that paid a flat day rate regardless of how the piece turned out. Quebec City's Winter Carnival has staged its ice palace and sculpture competition most years since 1955.|La cuadrilla de talla necesitó una mano extra con la motosierra para desbastar bloques antes de que los artistas de detalle tomaran el relevo, un trabajo frío que pagaba una tarifa fija por día sin importar cómo saliera la pieza. El Carnaval de Invierno de la Ciudad de Quebec ha montado su palacio de hielo y su concurso de esculturas casi todos los años desde 1955.|L'équipe de sculpture avait besoin d'une main supplémentaire à la tronçonneuse pour dégrossir les blocs avant que les artistes de détail ne prennent le relais, un travail glacé payé à un tarif journalier fixe quel que soit le résultat. Le Carnaval d'hiver de Québec monte son palais de glace et son concours de sculptures presque chaque année depuis 1955.|彫刻班は、細部を仕上げる職人が取りかかる前にブロックを大まかに削るチェーンソー要員を求めていた。仕上がりに関係なく日当が支払われる、寒さの厳しい仕事だった。ケベックシティの冬祭りは1955年からほぼ毎年、氷の宮殿と彫刻コンテストを開いている。",
    [9, 10],
  ),

  // ---- atl 大西洋岸 ----
  ev(
    "lobster-deckhand", "gain", ["atl"], "🦞", 270,
    "A day as a lobster boat deckhand|Un día como marinero en un barco langostero|Une journée comme matelot sur un bateau de pêche au homard|一日、ロブスター漁の甲板員を手伝う",
    "The regular hand had a doctor's appointment on the first good-weather day of the week, and hauling traps from before dawn until the tide turned paid in cash straight off the wharf. Lobster season opening day here can decide a fishing family's whole year.|El marinero habitual tenía cita con el médico el primer día de buen tiempo de la semana, y izar trampas desde antes del alba hasta que cambió la marea se pagó en efectivo directo en el muelle. El día de apertura de la temporada de langosta aquí puede decidir el año entero de una familia pescadora.|Le matelot habituel avait un rendez-vous chez le médecin le premier jour de beau temps de la semaine, et hisser des casiers de l'aube jusqu'au changement de marée a été payé comptant, directement sur le quai. Le jour d'ouverture de la saison du homard ici peut décider de toute l'année d'une famille de pêcheurs.|いつもの甲板員がその週初めての好天の日に病院の予約を入れていたため、夜明け前から潮が変わるまで籠を引き上げる仕事を任された。報酬は波止場でその場で現金払いだった。ここではロブスター漁の解禁日が、漁師の一家の一年を左右することもある。",
    [1, 2, 3],
  ),
  ev(
    "fog-ferry-delay", "loss", ["atl"], "🌫️", 190,
    "Thick fog cancels the ferry crossing|La niebla espesa cancela el cruce en ferry|Un épais brouillard annule la traversée en traversier|濃霧でフェリーが欠航する",
    "The crossing was cancelled with almost no warning once the fog rolled in off the water thick enough to hide the dock from the parking lot, and the only option left was an unplanned night in town. Fog like this off the Atlantic coast can sit for days without lifting.|La travesía se canceló casi sin aviso en cuanto la niebla llegó del mar, tan espesa que ocultaba el muelle desde el estacionamiento, y la única opción que quedó fue una noche imprevista en el pueblo. Una niebla así frente a la costa atlántica puede quedarse días sin levantarse.|La traversée a été annulée presque sans préavis dès que le brouillard est arrivé de la mer, assez épais pour cacher le quai depuis le stationnement, et la seule option restante fut une nuit imprévue en ville. Un brouillard pareil au large de la côte atlantique peut stagner des jours sans se lever.|海から流れ込んできた霧は駐車場から桟橋が見えなくなるほど濃く、ほとんど前触れもなく便が欠航になった。残された選択肢は、予定になかった町での一泊だけだった。大西洋岸ではこうした霧が何日も晴れないまま居座ることがある。",
  ),
  ev(
    "screech-in-tips", "gain", ["atl"], "🥃", 220,
    "Tips for hosting a 'Screech-in' ceremony|Propinas por dirigir una ceremonia de 'Screech-in'|Pourboires pour animer une cérémonie du « Screech-in »|「スクリーチイン」の儀式で得たチップ",
    "A busload of visitors wanted the full ceremony — the rum, the kissing of a cod, the mock oath — before they could be declared honorary locals, and a good performance earned tips on top of the cover charge. The tradition began as a joke among sailors and fishermen and has since become one of Newfoundland's best-known pieces of tourist theatre.|Un autobús lleno de visitantes quería la ceremonia completa —el ron, el beso al bacalao, el juramento burlón— antes de poder ser declarados lugareños honorarios, y una buena actuación ganó propinas además de la entrada. La tradición empezó como una broma entre marineros y pescadores y se ha vuelto uno de los espectáculos turísticos más conocidos de Terranova.|Un autocar de visiteurs voulait la cérémonie complète — le rhum, le baiser à la morue, le faux serment — avant de pouvoir être déclarés résidents honoraires, et une bonne prestation a rapporté des pourboires en plus du prix d'entrée. La tradition a commencé comme une blague entre marins et pêcheurs et est devenue l'un des spectacles touristiques les plus connus de Terre-Neuve.|バス一台分の観光客が、名誉住民と認められる前にラム酒とタラへの口づけ、おどけた宣誓という一連の儀式をひととおり求めてきた。うまく演じるとチップは入場料に上乗せされた。この習わしは船乗りや漁師の間の冗談として始まり、いまではニューファンドランドを代表する観光の出し物の一つになっている。",
    [2, 3, 4],
  ),

  // ---- north 準州 ----
  ev(
    "aurora-guide-tip", "gain", ["north"], "🌌", 260,
    "Guiding a night of aurora photography|Guiando una noche de fotografía de auroras|Guider une nuit de photographie d'aurores|オーロラ撮影ツアーのガイドを務める",
    "A clear, cold night with a strong solar forecast brought out visitors willing to stand in the dark for hours for the right shot, and helping them set tripods and time exposures earned a generous tip pool by the end. Guiding work like this fills a season that runs opposite the usual summer tourist calendar.|Una noche despejada y fría con un buen pronóstico solar atrajo a visitantes dispuestos a pasar horas en la oscuridad por la foto perfecta, y ayudarlos a montar trípodes y calcular exposiciones dejó un generoso fondo de propinas al final. Este tipo de guía llena una temporada opuesta al calendario turístico veraniego habitual.|Une nuit claire et froide avec de bonnes prévisions solaires a attiré des visiteurs prêts à rester des heures dans le noir pour la bonne photo, et les aider à installer trépieds et temps de pose a rapporté une généreuse cagnotte de pourboires à la fin. Ce genre de guidage remplit une saison à l'opposé du calendrier touristique estival habituel.|よく晴れた寒い夜、太陽風の予報が好調だったこともあり、良い一枚を求めて何時間も暗闇に立つ観光客が集まった。三脚の設置と露出時間の調整を手伝うと、最後には気前のよいチップがまとまった。こうしたガイドの仕事は、ふつうの夏の観光シーズンとは正反対の季節を埋めてくれる。",
    [6, 7, 8, 9, 10, 11],
  ),
  ev(
    "block-heater-snap", "loss", ["north"], "🥶", 210,
    "A block heater cord snaps in extreme cold|El cable del calentador de bloque se rompe con frío extremo|Le cordon du chauffe-moteur casse par grand froid|極寒でブロックヒーターのコードが折れる",
    "The plastic cord had gone brittle enough overnight that it snapped off at the plug the moment it was touched, and without the engine block staying warm the car had no chance of starting by morning. Block heaters are standard equipment this far north, plugged into a post outside almost every home and office.|El cable de plástico se había vuelto tan frágil durante la noche que se partió justo en el enchufe al tocarlo, y sin el bloque del motor manteniéndose caliente, el auto no tenía ninguna posibilidad de arrancar por la mañana. Los calentadores de bloque son equipo estándar tan al norte.|Le cordon en plastique était devenu si cassant pendant la nuit qu'il s'est brisé net à la prise dès qu'on l'a touché, et sans le bloc-moteur maintenu au chaud, la voiture n'avait aucune chance de démarrer au matin. Les chauffe-moteurs sont un équipement standard aussi loin au nord.|プラスチック製のコードは一晩ですっかり脆くなっており、触れた瞬間にプラグの根元でぽきりと折れた。エンジンブロックを温め続けられなければ、朝には車はまず動かない。これほど北になると、ブロックヒーターはほぼすべての家やオフィスの外壁に備え付けられた標準装備である。",
    [8, 9, 10],
  ),
  ev(
    "ice-road-day-rate", "gain", ["north"], "🚛", 320,
    "A day rate driving an ice road|Una tarifa diaria conduciendo por un camino de hielo|Un tarif journalier pour conduire une route de glace|氷上道路のトラック運転の日給",
    "The lake ice had finally thickened enough to certify the winter road, and a driver willing to run supply loads out to a remote community before the short window closed earned a premium day rate for the risk. Ice roads like this are often the only land route in or out until they melt again each spring.|El hielo del lago por fin se espesó lo suficiente para certificar el camino de invierno, y un conductor dispuesto a llevar cargas de suministro a una comunidad remota antes de que se cerrara la breve ventana ganó una tarifa diaria superior por el riesgo. Caminos de hielo como este suelen ser la única ruta terrestre de entrada o salida.|La glace du lac a enfin épaissi assez pour homologuer la route d'hiver, et un conducteur prêt à livrer des charges de ravitaillement à une communauté isolée avant la fermeture de la courte fenêtre a gagné un tarif journalier majoré pour le risque. Des routes de glace comme celle-ci sont souvent la seule voie terrestre d'accès jusqu'à leur fonte au printemps suivant.|湖の氷がついに冬季道路として認可されるだけの厚さになった。短い開通期間が終わる前に遠隔地の集落へ物資を運ぶ運転手には、その危険に見合った割増の日給が支払われた。こうした氷上道路は、翌春再び溶けるまでのあいだ、しばしば唯一の陸路になる。",
    [9, 10, 11],
  ),
];
