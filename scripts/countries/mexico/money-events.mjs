/**
 * メキシコの青マス・赤マスで起きる出来事(25件。増16・減9)。
 *
 * 地方コード: norte / bajio / occidente / centro / golfo / sur / yucatan
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、7地方それぞれに3件(増2・減1)、土地の産業や祭りに
 * 結びつけて置いている(地方ごとに増4・減3を必ず引ける計算)。
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

export const MEXICO_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "tianguis-unload", "gain", [], "📦", 210,
    "Unloading crates for the weekly tianguis|Descargando cajas para el tianguis semanal|Décharger des caisses pour le tianguis hebdomadaire|週一の青空市の荷下ろし",
    "A vendor's truck needed extra hands before dawn to get the stalls up before the first customers arrived, paid in cash the moment the last crate was stacked. Tianguis rotate through a different street each day of the week, so the same helper rarely sees the same crew twice.|El camión de un vendedor necesitaba manos extra antes del alba para montar los puestos antes de que llegaran los primeros clientes, y se pagó en efectivo en cuanto se apiló la última caja. Los tianguis rotan por una calle distinta cada día de la semana, así que el mismo ayudante rara vez ve dos veces al mismo grupo.|Le camion d'un vendeur avait besoin de bras avant l'aube pour monter les étals avant les premiers clients, payés en espèces dès la dernière caisse empilée. Les tianguis tournent sur une rue différente chaque jour de la semaine, si bien qu'un même aide-magasinier revoit rarement la même équipe.|ある露天商のトラックが、最初の客が来る前に屋台を組み立てる人手を夜明け前に求めていた。最後の木箱を積み終えた瞬間に現金で払われた。ティアンギスは曜日ごとに立つ通りが変わるので、同じ手伝いが同じ一団と二度会うことはめったにない。",
  ),
  ev(
    "moto-delivery-gig", "gain", [], "🛵", 230,
    "A rush-hour app delivery run|Un reparto de app en hora punta|Une course de livraison en heure de pointe|配達アプリの繁忙時間帯の仕事",
    "The app's map lit up with surge pricing during a sudden downpour, and three deliveries in under an hour paid more than a slow afternoon usually would. Motorbike couriers now cover distances on these apps that would have needed a whole different job a decade ago.|El mapa de la app se iluminó con recargo por demanda durante un aguacero repentino, y tres repartos en menos de una hora pagaron más de lo que suele dar una tarde tranquila. Los repartidores en moto ahora cubren con estas apps distancias que hace una década habrían necesitado otro tipo de empleo.|La carte de l'appli s'est illuminée de tarifs majorés pendant une averse soudaine, et trois livraisons en moins d'une heure ont rapporté plus qu'un après-midi tranquille habituellement. Les coursiers à moto couvrent désormais avec ces applis des distances qui, il y a dix ans, auraient réclamé un tout autre métier.|突然の豪雨で配達アプリの地図が割増料金の表示で赤く染まり、一時間足らずで三件こなすと、ふだんの静かな午後よりずっと稼げた。バイク配達員はいまやこうしたアプリで、十年前なら全く別の仕事が要っただろう距離を走っている。",
  ),
  ev(
    "tope-flat-tire", "loss", [], "🚗", 190,
    "A tire gives out on an unmarked speed bump|Se revienta una llanta en un tope sin señalizar|Un pneu lâche sur un dos-d'âne non signalé|標識の無いトペで穴があく",
    "The road had no warning paint and no sign, just a sudden concrete ridge exactly the height to catch a tire at speed, and the shop that patched it afterward said it saw three more cars with the same story that same week. Topes multiply faster than any map can keep track of.|La carretera no tenía pintura de aviso ni señal, solo un lomo de concreto repentino de la altura justa para atrapar una llanta a velocidad, y el taller que la reparó después dijo que vio tres coches más con la misma historia esa misma semana. Los topes se multiplican más rápido de lo que cualquier mapa puede registrar.|La route n'avait ni peinture d'avertissement ni panneau, juste une arête de béton soudaine, à la hauteur exacte pour surprendre un pneu à vitesse, et le garage qui l'a réparé ensuite a dit avoir vu trois autres voitures avec la même histoire cette semaine-là. Les dos-d'âne se multiplient plus vite qu'aucune carte ne peut en tenir le compte.|その道には警告塗装も標識も無く、ちょうどタイヤを速度のまま捕らえる高さのコンクリートの段があるだけだった。あとで修理した工場は、その週だけで同じ話の車をあと三台見たと言っていた。トペ(減速用の段差)は、どんな地図も追いつけない速さで増えていく。",
  ),
  ev(
    "peaje-line-missed-bus", "loss", [], "🚌", 170,
    "A toll booth line runs long, missing the connecting bus|La fila del peaje se alarga, se pierde el autobús de conexión|La file au péage s'éternise, le bus de correspondance est raté|料金所の渋滞で乗り継ぎのバスに乗り遅れる",
    "A single malfunctioning lane at the toll plaza backed up traffic far enough that the bus at the next station pulled out five minutes early, on schedule and indifferent to who was still stuck in line. The next one was a two-hour wait.|Un solo carril averiado en la caseta de peaje represó el tráfico lo suficiente para que el autobús de la siguiente estación saliera cinco minutos antes, puntual e indiferente a quién seguía atascado en la fila. El siguiente tardaba dos horas.|Une seule voie en panne à la barrière de péage a ralenti le trafic au point que le bus de la gare suivante est parti cinq minutes en avance, à l'heure et indifférent à qui restait coincé dans la file. Le suivant attendait deux heures.|料金所の一車線が故障していたせいで渋滞が延び、次の停留所のバスは定刻どおり五分早く出てしまい、まだ列に詰まっている誰のことも気にかけなかった。次のバスまでは二時間待たされた。",
  ),

  // ---- norte ----
  ev(
    "saltillo-sarape-workshop", "gain", ["norte"], "🧶", 240,
    "A day carding wool at a sarape workshop|Un día cardando lana en un taller de sarapes|Une journée à carder la laine dans un atelier de sarapes|サラペ工房で羊毛を梳く一日",
    "A weaver's family needed an extra pair of hands carding raw wool before it could be spun and dyed for the loom, tedious work paid by the basket rather than the hour. A single sarape can take a skilled weaver weeks to finish, so nobody minds outsourcing the least interesting part.|Una familia de tejedores necesitaba manos extra para cardar lana cruda antes de hilarla y teñirla para el telar, un trabajo tedioso pagado por cesto y no por hora. Un solo sarape puede llevarle semanas a un tejedor experto, así que a nadie le importa delegar la parte menos interesante.|Une famille de tisserands avait besoin de bras pour carder la laine brute avant de la filer et de la teindre pour le métier, un travail fastidieux payé au panier plutôt qu'à l'heure. Un seul sarape peut demander des semaines à un tisserand expérimenté, alors personne ne s'oppose à déléguer la partie la moins intéressante.|織り手の一家が、機にかける前の生の羊毛を梳く手を求めていた。地味な作業で、時給ではなく籠の数で払われた。一枚のサラペを仕上げるには熟練の織り手でも何週間もかかるので、いちばん退屈な工程を人に任せることに誰も文句を言わない。",
  ),
  ev(
    "monterrey-charreada-crew", "gain", ["norte"], "🐎", 250,
    "Working the gate at a charreada|Trabajando la puerta en una charreada|Tenir la porte lors d'une charreada|チャレアーダの入場係",
    "A ranch outside the city needed help managing the crowd and the cattle chutes for a weekend charreada, the country's formal rodeo tradition, and the pay came with a plate of cabrito at the end. The events run on a strict order of ten timed events, and nobody outside the family crew is allowed near the chutes once the first rider is up.|Un rancho a las afueras de la ciudad necesitaba ayuda para manejar al público y las mangas de ganado en una charreada de fin de semana, la tradición formal de rodeo del país, y la paga incluyó un plato de cabrito al final. Los eventos siguen un orden estricto de diez suertes cronometradas.|Un ranch en périphérie de la ville avait besoin d'aide pour gérer la foule et les couloirs à bétail lors d'une charreada de week-end, la tradition de rodéo formelle du pays, et la paie s'est accompagnée d'une assiette de cabrito à la fin. Les épreuves suivent un ordre strict de dix suertes chronométrées.|町外れの牧場が、週末のチャレアーダ(この国の正式なロデオの伝統)で観客と牛の通路を捌く手を求めていた。給金の最後には仔山羊の一皿が付いてきた。この競技は十種目の決まった順序で進み、最初の騎手が上がったあとは一家の関係者以外、通路には近づけない。",
  ),
  ev(
    "mesquite-thorn-flat", "loss", ["norte"], "🌵", 200,
    "A mesquite thorn punctures a tire on a desert backroad|Una espina de mezquite pincha una llanta en un camino desértico|Une épine de mesquite crève un pneu sur une piste désertique|砂漠の裏道でメスキートの棘がタイヤを刺す",
    "Pulling off the highway to look at the desert scenery meant driving over ground littered with fallen mesquite branches, and a thorn nearly as long as a finger went straight through the sidewall. The nearest tire shop was an hour back the way that had already been driven.|Salirse de la carretera para ver el paisaje desértico significó pasar sobre suelo cubierto de ramas caídas de mezquite, y una espina casi tan larga como un dedo atravesó el costado de la llanta. El taller de llantas más cercano estaba a una hora, de vuelta por donde ya se había recorrido.|Quitter l'autoroute pour admirer le paysage désertique a signifié rouler sur un sol jonché de branches de mesquite tombées, et une épine presque aussi longue qu'un doigt a transpercé le flanc du pneu. Le garagiste le plus proche était à une heure, en arrière sur la route déjà parcourue.|砂漠の景色を見ようとハイウェイを外れると、そこはメスキートの落ち枝だらけの地面で、指ほどの長さの棘がタイヤの側面をまっすぐ貫いた。いちばん近いタイヤ屋は、すでに走ってきた道を一時間戻った先にあった。",
  ),

  // ---- bajio ----
  ev(
    "guanajuato-silver-polish", "gain", ["bajio"], "✨", 230,
    "Polishing silverwork at a workshop stall|Puliendo piezas de plata en un puesto de taller|Polir des pièces d'argent à un étal d'atelier|工房の露店で銀細工を磨く",
    "A silversmith's stall in the ravine-bottom streets needed a steady pair of hands buffing finished rings and bracelets before the evening crowd came through, paid by the tray rather than the hour. A single tarnished piece can take twenty minutes to bring back to a shine worth selling.|Un puesto de platero en las calles del fondo de la barranca necesitaba manos firmes para pulir anillos y pulseras terminados antes de que llegara el público de la tarde, pagado por bandeja y no por hora. Una sola pieza deslustrada puede tardar veinte minutos en recuperar un brillo vendible.|Un étal d'orfèvre dans les rues du fond du ravin avait besoin de mains sûres pour polir bagues et bracelets finis avant l'arrivée du public du soir, payé au plateau plutôt qu'à l'heure. Une seule pièce ternie peut demander vingt minutes pour retrouver un éclat vendable.|渓谷の底の通りにある銀細工の露店が、夕方の客が来る前に仕上がった指輪やブレスレットを磨く安定した手を求めていた。時給ではなく盆の数で払われた。曇った一点を売り物になる輝きに戻すには、20分かかることもある。",
  ),
  ev(
    "zacatecas-mine-tour-tip", "gain", ["bajio"], "⛏️", 250,
    "Guiding a group through the old mine tunnels|Guiando a un grupo por los antiguos túneles de la mina|Guider un groupe dans les anciens tunnels de mine|旧鉱山坑道の案内で謝礼を得る",
    "A tour operator short a guide for the afternoon paid well for someone who already knew the mine train's route and could explain the old timber supports without reading off a card. Visitors tip more generously underground, perhaps grateful simply to see daylight again at the end.|Un operador turístico sin guía para la tarde pagó bien a alguien que ya conocía la ruta del tren de la mina y podía explicar los antiguos soportes de madera sin leer una tarjeta. Los visitantes dan mejores propinas bajo tierra, quizá agradecidos de solo volver a ver la luz del día al final.|Un tour-opérateur à court de guide pour l'après-midi a bien payé quelqu'un qui connaissait déjà le trajet du petit train de la mine et pouvait expliquer les vieux étais de bois sans lire une fiche. Les visiteurs laissent de meilleurs pourboires sous terre, peut-être simplement reconnaissants de revoir la lumière du jour à la fin.|午後のガイドが足りなかった旅行会社は、鉱山トロッコの経路をすでに知り、カードを読まずに古い木の支保工を説明できる人に良い報酬を払った。訪問客は地下ではより気前よくチップをはずむ。最後にもう一度日の光を見られることに、どこか感謝しているのかもしれない。",
  ),
  ev(
    "dolores-pottery-cracked", "loss", ["bajio"], "🏺", 190,
    "A piece of hand-painted pottery cracks in transit|Una pieza de cerámica pintada a mano se raja en el traslado|Une pièce de céramique peinte à la main se fissure en route|手描き陶器が輸送中に割れる",
    "A hand-painted bowl bought at a roadside stall between Bajío towns rode wrapped only in a newspaper on the back seat, and a hard stop at a tope was all it took to hear the crack. The stallholder had warned, half-joking, that the road home was the real test of the glaze.|Un cuenco pintado a mano comprado en un puesto de carretera entre pueblos del Bajío viajó envuelto solo en papel de periódico en el asiento trasero, y bastó un frenazo en un tope para oír la rajadura. El vendedor había avisado, medio en broma, que el camino de vuelta era la verdadera prueba del esmalte.|Un bol peint à la main acheté à un étal en bordure de route entre des villes du Bajío a voyagé enveloppé dans du simple papier journal sur la banquette arrière, et un freinage brusque sur un dos-d'âne a suffi pour entendre la fissure. Le vendeur avait prévenu, mi-sérieux, que la route du retour était le vrai test de l'émail.|バヒオの町のあいだの道端の露店で買った手描きの碗は、新聞紙に包んだだけで後部座席に乗せられていた。トペでの急ブレーキ一つで、ひびの入る音がした。露店の主人は半分冗談で、家までの道のりこそが釉薬の本当の試練だと言っていた。",
  ),

  // ---- occidente ----
  ev(
    "tequila-agave-harvest-day", "gain", ["occidente"], "🌾", 260,
    "A day cutting agave alongside the jimadores|Un día cortando agave junto a los jimadores|Une journée à couper l'agave aux côtés des jimadores|ヒマドールと共にアガベを刈る一日",
    "A distillery short-handed for the harvest paid a day rate to haul cut piñas to the truck while the trained jimadores handled the coa blade itself, work that leaves forearms sore in a way office hours never do. A single skilled jimador can still clear a field faster than most machinery built to replace him.|Una destilería falta de brazos para la cosecha pagó un jornal por acarrear las piñas cortadas hasta el camión mientras los jimadores expertos manejaban la coa, un trabajo que deja los antebrazos doloridos de un modo que la oficina nunca produce. Un jimador hábil aún puede limpiar un campo más rápido que la maquinaria hecha para reemplazarlo.|Une distillerie à court de bras pour la récolte a payé un tarif journalier pour porter les piñas coupées jusqu'au camion pendant que les jimadores expérimentés maniaient eux-mêmes la coa, un travail qui laisse les avant-bras endoloris comme jamais un bureau ne le ferait. Un jimador habile peut encore vider un champ plus vite que les machines censées le remplacer.|収穫で人手が足りなかった蒸留所は、熟練のヒマドールが専用の刃(コア)を使う一方で、刈ったピニャをトラックまで運ぶ日雇いを雇った。オフィス仕事では決して味わえないほど前腕が痛む仕事である。腕のいいヒマドール一人は、いまも彼に取って代わるはずの機械より速く畑を刈り尽くせる。",
  ),
  ev(
    "guadalajara-mariachi-wedding-tip", "gain", ["occidente"], "🎻", 250,
    "Filling in on violin for a wedding mariachi|Suplir con el violín a un mariachi de boda|Remplacer au violon dans un mariachi de mariage|結婚式のマリアッチでバイオリンを代役する",
    "A mariachi band short one violinist for a Saturday wedding needed someone who already knew the standard repertoire by ear, and the tip jar at the reception afterward outpaced the booking fee itself. Weddings here can run through a band's entire songbook twice before the night is done.|Un mariachi al que le faltaba un violinista para una boda de sábado necesitaba a alguien que ya conociera de oído el repertorio estándar, y la propina del convivio después superó la propia tarifa de la contratación. Las bodas aquí pueden agotar dos veces el repertorio de una banda antes de que acabe la noche.|Un mariachi à qui il manquait un violoniste pour un mariage du samedi avait besoin de quelqu'un connaissant déjà le répertoire standard à l'oreille, et le pot à pourboires de la réception a dépassé le cachet lui-même. Les mariages ici peuvent épuiser deux fois le répertoire d'un groupe avant la fin de la nuit.|土曜の結婚式でバイオリン奏者が一人足りなかったマリアッチ楽団は、標準の演目を耳で知っている人を必要としていた。披露宴のあとのチップ入れは、出演料そのものより多くなった。この国の結婚式は、夜が終わるまでに楽団の持ち歌を二周させることもある。",
  ),
  ev(
    "chapala-sunburn-medicine", "loss", ["occidente"], "🥵", 180,
    "A day on the lake ends in a pharmacy run for sunburn|Un día en el lago termina en la farmacia por quemaduras de sol|Une journée sur le lac se termine chez le pharmacien pour un coup de soleil|湖での一日が日焼け止め薬局行きで終わる",
    "The lake's high-altitude sun burned through an afternoon of fishing before anyone noticed, and by evening the only cure was a pharmacy visit for aloe gel and something for the headache that came with it. Locals fish the same water in long sleeves for exactly this reason.|El sol de altitud del lago quemó durante una tarde de pesca antes de que nadie se diera cuenta, y para la noche la única cura fue una visita a la farmacia por gel de aloe y algo para el dolor de cabeza que vino con él. Los lugareños pescan la misma agua en mangas largas justo por esto.|Le soleil d'altitude du lac a brûlé toute une après-midi de pêche avant que personne ne s'en aperçoive, et le soir venu, le seul remède fut une visite à la pharmacie pour du gel d'aloès et de quoi calmer le mal de tête qui l'accompagnait. Les habitants pêchent ces mêmes eaux en manches longues précisément pour cette raison.|湖の高地の陽射しは、釣りをする午後のあいだ誰も気づかないうちに肌を焼いていた。夕方には、アロエジェルとそれに伴う頭痛の薬を買いに薬局へ行くしかなかった。地元の人がまさにこの理由で長袖のまま同じ湖で釣りをしている。",
  ),

  // ---- centro ----
  ev(
    "cuernavaca-language-school-tutor", "gain", ["centro"], "🗣️", 220,
    "An extra conversation session for language-school visitors|Una sesión extra de conversación para visitantes de la escuela de idiomas|Une session de conversation en plus pour des visiteurs d'une école de langue|語学学校の会話練習の追加謝礼",
    "A language school short a conversation partner paid well for an afternoon of unstructured chat with foreign students eager to practice outside the classroom, no lesson plan required beyond patience. The city's mild climate keeps enrollment steady almost year round, so the work rarely dries up for long.|Una escuela de idiomas a la que le faltaba un compañero de conversación pagó bien por una tarde de charla libre con estudiantes extranjeros ansiosos por practicar fuera del aula, sin más plan de clase que la paciencia. El clima suave de la ciudad mantiene la matrícula estable casi todo el año.|Une école de langues à court de partenaire de conversation a bien payé pour un après-midi de discussion libre avec des étudiants étrangers avides de pratiquer hors de la salle de classe, sans autre plan de cours que la patience. Le climat doux de la ville maintient les inscriptions stables presque toute l'année.|語学学校が会話の相手を探しており、教室の外で練習したい外国人学生と午後を過ごすだけで良い報酬が出た。忍耐以外に授業計画は要らなかった。この町の穏やかな気候のおかげで、生徒数はほぼ一年を通じて安定しており、この手の仕事はめったに絶えない。",
  ),
  ev(
    "puebla-talavera-workshop-help", "gain", ["centro"], "🎨", 230,
    "Sanding greenware at a Talavera workshop|Lijando piezas en verde en un taller de Talavera|Poncer des pièces crues dans un atelier de Talavera|タラベラ工房で素焼き前の器を磨く",
    "A certified Talavera workshop needed extra hands smoothing unfired pieces before the hand-painting stage, work that has to be done just right or the glaze pools unevenly later. Only a handful of workshops in the region are allowed to use the protected name at all, so a day inside one is rarer than it sounds.|Un taller certificado de Talavera necesitaba manos extra para alisar piezas sin cocer antes de la etapa de pintado a mano, un trabajo que debe hacerse con precisión o el esmalte se acumula después de forma dispareja. Solo un puñado de talleres de la región puede usar el nombre protegido.|Un atelier certifié de Talavera avait besoin de bras pour lisser des pièces crues avant l'étape de peinture à la main, un travail qui doit être fait avec précision sous peine d'un émail qui s'accumule ensuite de façon inégale. Seule une poignée d'ateliers de la région est autorisée à utiliser le nom protégé.|認証を受けたタラベラ工房が、手描き段階の前に素焼き前の器を滑らかにする手を求めていた。きちんとやらないと、あとで釉薬がむらになってしまう繊細な作業である。この地方でこの保護された名を名乗れる工房はほんの一握りしかなく、そこで一日過ごせるのは思う以上に貴重である。",
  ),
  ev(
    "puebla-festival-parking-fine", "loss", ["centro"], "🅿️", 200,
    "A parking fine near a crowded festival plaza|Una multa de aparcamiento cerca de una plaza abarrotada por un festival|Une amende de stationnement près d'une place bondée par un festival|祭りで混み合う広場付近の駐車違反",
    "Every legal spot near the plaza had filled an hour before the parade even started, and the curb that looked open enough turned out to be a loading zone the whole time. The ticket arrived tucked under the wiper before the first float had even passed.|Todos los sitios legales cerca de la plaza se llenaron una hora antes de que empezara siquiera el desfile, y el bordillo que parecía suficientemente libre resultó ser zona de carga todo el tiempo. La multa llegó bajo el limpiaparabrisas antes de que pasara la primera carroza.|Toutes les places légales près de la place s'étaient remplies une heure avant même le début du défilé, et le trottoir qui semblait assez dégagé s'est révélé être une zone de livraison depuis le début. La contravention est arrivée sous l'essuie-glace avant même le passage du premier char.|広場近くの合法な駐車枠は、パレードが始まる一時間も前にすべて埋まっており、空いているように見えた縁石は実はずっと荷下ろし専用区画だった。最初の山車が通る前に、切符はもうワイパーに挟まれていた。",
  ),

  // ---- golfo ----
  ev(
    "xalapa-coffee-sack-loading", "gain", ["golfo"], "☕", 220,
    "Loading roasted coffee sacks before dawn|Cargando sacos de café tostado antes del alba|Charger des sacs de café torréfié avant l'aube|夜明け前にコーヒー豆の袋を積む",
    "A roastery needed extra hands moving sacks from the drying racks to the delivery van before the morning fog lifted off the hills, paid by the sack in cash. The misty highland air that makes the coffee good also means the loading dock stays slick underfoot most mornings.|Una tostaduría necesitaba manos extra para mover sacos de las rejillas de secado a la camioneta de reparto antes de que se despejara la niebla matinal en las colinas, pagado por saco en efectivo. El aire neblinoso de altura que hace bueno al café también deja resbaladizo el andén de carga casi todas las mañanas.|Une torréfaction avait besoin de bras pour déplacer des sacs des claies de séchage jusqu'à la camionnette de livraison avant que le brouillard matinal ne se lève sur les collines, payé au sac en espèces. L'air brumeux d'altitude qui rend le café bon laisse aussi le quai de chargement glissant presque tous les matins.|焙煎所は、朝霧が丘から晴れる前に乾燥棚から配達バンへ袋を運ぶ人手を求めていた。袋の数だけ現金で払われた。コーヒーを美味しくする霧深い高原の空気は、ほとんど毎朝、荷積み場の足元を滑りやすくもする。",
  ),
  ev(
    "tlacotalpan-fandango-tip-jar", "gain", ["golfo"], "🎸", 240,
    "Playing jarana at a riverside fandango|Tocando jarana en un fandango junto al río|Jouer de la jarana à un fandango au bord du fleuve|川辺のファンダンゴでハラナを弾く",
    "A neighborhood son jarocho gathering needed one more jarana player to keep the verses going late into the night, and the hat passed around after the last song held more than the evening's bus fare. Nobody plays from written music here; a verse either fits the call-and-response or it gets laughed off the porch.|Una reunión vecinal de son jarocho necesitaba un jaranero más para mantener las coplas hasta bien entrada la noche, y el sombrero que pasó después de la última canción llevaba más que el pasaje de autobús de esa noche. Aquí nadie toca con partitura escrita.|Un rassemblement de voisinage de son jarocho avait besoin d'un jaranero de plus pour maintenir les couplets tard dans la nuit, et le chapeau passé après la dernière chanson contenait plus que le prix du bus de la soirée. Ici, personne ne joue sur partition écrite.|近所で開かれたソン・ハローチョの集まりは、夜更けまで歌詞を続けるためにもう一人ハラナ奏者を必要としていた。最後の曲のあとに回された帽子には、その晩のバス代以上のものが入っていた。ここでは誰も楽譜を見て弾かない。掛け合いの歌詞に合うかどうかがすべてで、合わなければ縁側で笑い飛ばされる。",
  ),
  ev(
    "gulf-downpour-electronics-ruined", "loss", ["golfo"], "🌧️", 210,
    "A sudden tropical downpour ruins a phone|Un chubasco tropical repentino arruina el teléfono|Une averse tropicale soudaine ruine un téléphone|突然の熱帯性豪雨で携帯電話が壊れる",
    "The sky had been clear enough to leave an umbrella behind, and within ten minutes the street was ankle-deep and a phone left in an open bag never turned on again. Locals check the horizon rather than any forecast, since a Gulf downpour here can build and break before an app updates.|El cielo estaba lo bastante despejado como para dejar el paraguas en casa, y en diez minutos la calle estaba a la altura del tobillo y un teléfono en una bolsa abierta no volvió a encender. Los lugareños miran el horizonte más que cualquier pronóstico.|Le ciel était assez dégagé pour laisser le parapluie à la maison, et en dix minutes la rue était submergée jusqu'à la cheville, et un téléphone laissé dans un sac ouvert ne s'est plus jamais rallumé. Les habitants surveillent l'horizon plus que n'importe quelle météo.|傘を置いてきても大丈夫なほど晴れていた空だったが、十分もすると通りは足首まで水に浸かり、開いた鞄に入れていた携帯電話は二度と電源が入らなくなった。地元の人は予報よりも水平線を見て判断する。ここの湾岸の豪雨は、アプリが更新されるより早く発達して過ぎ去ることがあるからである。",
  ),

  // ---- sur ----
  ev(
    "puertoescondido-turtle-release-guide", "gain", ["sur"], "🐢", 250,
    "Guiding visitors to a hatchling turtle release|Guiando a visitantes a una liberación de crías de tortuga|Guider des visiteurs vers une libération de tortues nouveau-nées|ウミガメの子放流ツアーの案内",
    "A conservation group short a hand for the evening needed someone to walk visitors down to the sand at exactly the right tide window, timed so the hatchlings' scramble to the water draws the smallest possible crowd of gulls. The tip jar after even a modest group can outpace a full day's ordinary wage.|Un grupo conservacionista sin manos para la tarde necesitaba a alguien que llevara a los visitantes hasta la arena en la ventana de marea justa, calculada para que la carrera de las crías hacia el agua atraiga a la menor cantidad posible de gaviotas. El bote de propinas tras un grupo modesto puede superar el jornal de un día entero.|Un groupe de conservation à court de bras pour la soirée avait besoin de quelqu'un pour mener les visiteurs jusqu'au sable dans la bonne fenêtre de marée, calculée pour que la course des tortillons vers l'eau attire le moins de mouettes possible. Le pot à pourboires après un groupe même modeste peut dépasser le salaire d'une journée entière.|保護団体は、稚ガメが海へ急ぐ様子をできるだけ少ないカモメの目から守れる、ちょうどよい潮のタイミングに合わせて訪問客を砂浜まで案内する人手を、その晩だけ求めていた。控えめな一団のあとでもチップ入れは丸一日分の日当を超えることがある。",
    [7, 8],
  ),
  ev(
    "oaxaca-mole-day-help", "gain", ["sur"], "🌶️", 240,
    "Grinding chiles for a family's mole all day|Moliendo chiles todo el día para el mole de una familia|Moudre des piments toute la journée pour le mole d'une famille|一日がかりで一家のモーレ用チリを挽く",
    "A household preparing mole for a family celebration needed an extra pair of hands at the metate grinding stone, since a proper batch calls for toasting and grinding a dozen or more ingredients separately before they are ever combined. Whoever grinds well enough to be invited back is quietly considered part of the kitchen from then on.|Una familia que preparaba mole para una celebración necesitaba manos extra en el metate, pues una tanda como es debido exige tostar y moler por separado una docena o más de ingredientes antes de combinarlos. A quien muele lo bastante bien como para que lo vuelvan a llamar se le considera, en silencio, parte de la cocina desde entonces.|Une famille préparant du mole pour une fête avait besoin de bras supplémentaires au metate, car une tournée digne de ce nom exige de griller et moudre séparément une douzaine d'ingrédients ou plus avant de les combiner. Quiconque mout assez bien pour être rappelé est tacitement considéré comme faisant désormais partie de la cuisine.|家族の祝いのためにモーレを用意する家が、石臼(メタテ)で挽く手を求めていた。本格的な一鍋には、十種類を超える材料を別々に炒って挽いてから合わせる必要がある。腕がよくて次も呼ばれるようになった者は、それ以降、暗黙のうちに台所の一員として扱われる。",
  ),
  ev(
    "sumidero-boat-splash-bag", "loss", ["sur"], "💧", 190,
    "A canyon boat wake soaks an unzipped bag|Una estela del bote del cañón empapa una bolsa abierta|Le sillage d'un bateau du canyon trempe un sac ouvert|峡谷ボートの波飛沫で開いた鞄が水浸しになる",
    "The boat cut close to a crocodile basking on the bank for a better photo, and the wake that followed came up over the gunwale before anyone had zipped their bag shut. The guide's laugh made clear this happens on nearly every run when the water is high.|El bote se acercó a un cocodrilo tomando el sol en la orilla para una mejor foto, y la estela que siguió pasó por encima de la borda antes de que nadie cerrara su bolsa. La risa del guía dejó claro que esto pasa en casi cada recorrido cuando el agua está alta.|Le bateau s'est rapproché d'un crocodile se prélassant sur la berge pour une meilleure photo, et le sillage qui a suivi est passé par-dessus le plat-bord avant que quiconque n'ait refermé son sac. Le rire du guide a laissé entendre que cela arrive presque à chaque sortie quand l'eau est haute.|よりよい写真を撮ろうとボートが岸で日を浴びるワニに接近すると、続いた波が誰も鞄のジッパーを閉め終える前に船縁を越えてきた。案内人の笑い声は、水位が高いときはほとんど毎回これが起こることを物語っていた。",
  ),

  // ---- yucatan ----
  ev(
    "cenote-dive-guide-tip", "gain", ["yucatan"], "🤿", 260,
    "Guiding divers through a cenote's first chamber|Guiando a buzos por la primera cámara de un cenote|Guider des plongeurs dans la première salle d'un cenote|セノーテの最初の洞に潜水客を案内する",
    "A dive shop short a local guide for the day paid well for someone who already knew which cavern chamber was safe for open-water divers and which required the cave-certification the shop's foreign clients did not have. Visibility can run over 30 meters on a good day, clear enough that a flashlight feels almost unnecessary.|Una tienda de buceo sin guía local para el día pagó bien a alguien que ya sabía qué cámara de la caverna era segura para buzos de aguas abiertas y cuál exigía la certificación de cuevas que los clientes extranjeros no tenían. La visibilidad puede superar los 30 metros en un buen día.|Un club de plongée à court de guide local pour la journée a bien payé quelqu'un qui savait déjà quelle salle de la grotte était sûre pour les plongeurs en eau libre et laquelle exigeait la certification spéléo que les clients étrangers n'avaient pas. La visibilité peut dépasser 30 mètres un bon jour.|その日ガイドが足りなかったダイビングショップは、オープンウォーターの潜水客でも安全な洞のどこまでか、外国人客が持っていない洞窟潜水の資格が要る先はどこかをすでに知っている人に、良い報酬を払った。よい日には視界が30mを超え、懐中電灯がほとんど要らないほど澄んでいる。",
  ),
  ev(
    "valladolid-hammock-stall-cover", "gain", ["yucatan"], "🛏️", 230,
    "Minding a friend's hammock stall for the day|Atendiendo por un día el puesto de hamacas de una amiga|Tenir pour la journée l'étal de hamacs d'une amie|一日、友人のハンモック屋台を任される",
    "A weaver called away for a family matter left the market stall in trusted hands for the day, payment agreed as a flat cut of whatever sold, no haggling training required beyond knowing which weave held up to years of daily use. A tightly woven cotton hammock can last a generation if it is never left out in the rain.|Una tejedora que tuvo que ausentarse por un asunto familiar dejó el puesto del mercado en manos de confianza por un día, con un pago acordado como un porcentaje fijo de lo vendido. Una hamaca de algodón bien tejida puede durar una generación si nunca se deja bajo la lluvia.|Une tisserande appelée pour une affaire de famille a confié l'étal du marché à quelqu'un de confiance pour la journée, contre un pourcentage fixe convenu sur les ventes. Un hamac de coton bien tissé peut durer une génération s'il n'est jamais laissé sous la pluie.|家族の用事で出かけることになった織り手が、その日一日、信頼できる相手に市場の屋台を任せた。報酬は売上の決まった歩合で合意した。目の詰まった綿のハンモックは、雨に濡らさなければ一世代はもつ。",
  ),
  ev(
    "tulum-snorkel-gear-lost", "loss", ["yucatan"], "🥽", 200,
    "Rented snorkel gear goes missing at the beach|El equipo de esnórquel alquilado desaparece en la playa|Le matériel de snorkeling loué disparaît sur la plage|レンタルのシュノーケル用品がビーチで無くなる",
    "A rented mask and fins left on a towel while swimming out past the reef were gone by the time the swim was over, and the shop's deposit policy meant the loss came out of the wallet rather than the shop's own pocket. The stretch of beach below the ruins is crowded enough by midday that nobody can say for certain what happened.|Una máscara y aletas alquiladas, dejadas sobre una toalla mientras se nadaba más allá del arrecife, ya no estaban al terminar el baño, y la política de depósito de la tienda hizo que la pérdida saliera de la propia cartera. El tramo de playa bajo las ruinas está tan lleno a mediodía que nadie puede decir con certeza qué pasó.|Un masque et des palmes loués, laissés sur une serviette pendant une baignade au-delà du récif, avaient disparu à la fin de la baignade, et la politique de caution de la boutique a fait que la perte est sortie du portefeuille. Le tronçon de plage sous les ruines est si bondé à midi que personne ne peut dire avec certitude ce qui s'est passé.|礁の向こうまで泳ぐあいだタオルの上に置いていたレンタルのマスクとフィンは、泳ぎ終える頃には無くなっていた。店の保証金の仕組みのせいで、その損失は自分の財布から出ることになった。遺跡の下のこの浜辺は正午にはあまりに混み合っており、何が起きたのか誰にもはっきりとは分からない。",
  ),
];
