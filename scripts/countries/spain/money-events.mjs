/**
 * スペインの青マス・赤マスで起きる出来事(20件。増10・減10)。
 *
 * 地方コード: ctr=中央 / ext=エストレマドゥーラ / cat=カタルーニャ /
 * eus=バスク+ナバラ / nor=カンタブリア海岸 / gal=ガリシア / and=アンダルシア /
 * est=アラゴン+レバンテ+ムルシア
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、8地方それぞれに2件(増1・減1)ずつ置いている。
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

export const SPAIN_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "terraza-verano", "gain", [], "🍹", 220,
    "Pouring drinks on a packed summer terraza|Sirviendo copas en una terraza abarrotada de verano|Servir des verres sur une terrasse bondée l'été|夏の混み合うテラス席で飲み物を注ぐ",
    "A bar short-staffed for the evening rush needed an extra pair of hands running drinks between crowded outdoor tables, and the tips alone from one long shift covered a full day's expenses. Terrazas fill every street corner as soon as the heat lets up in the evening, and bar owners across Spain complain every summer about how hard reliable seasonal staff are to find.|Un bar con poco personal para la hora punta de la tarde necesitaba manos extra para llevar bebidas entre mesas abarrotadas al aire libre, y solo las propinas de un turno largo cubrieron los gastos de todo un día. Las terrazas llenan cada esquina en cuanto baja el calor por la tarde.|Un bar en sous-effectif pour le coup de feu du soir avait besoin de bras supplémentaires pour porter les boissons entre des tables extérieures bondées, et les seuls pourboires d'un long service ont couvert les dépenses d'une journée entière. Les terrasses envahissent chaque coin de rue dès que la chaleur retombe le soir.|夕方の書き入れ時に人手が足りないバルが、混み合う屋外の席のあいだを飲み物を運ぶ手を求めていた。長い一勤務のチップだけで丸一日分の出費が賄えた。夕方に暑さが和らぐとすぐ、どの街角もテラス席で埋まる。",
  ),
  ev(
    "rodaje-extra", "gain", [], "🎬", 200,
    "An extra in a period film shoot|Extra en un rodaje de época|Figurant sur un tournage en costume d'époque|時代劇の撮影でエキストラをする",
    "A production company filming in a well-preserved old quarter needed extras to fill a market scene, paying a flat day rate for standing around in borrowed period clothes and doing the same walk past camera a dozen times. Spain's mix of Roman, Islamic and medieval townscapes makes it a frequent stand-in location for stories set almost anywhere in the Mediterranean world.|Una productora que rodaba en un casco antiguo bien conservado necesitaba extras para llenar una escena de mercado, con una paga fija por jornada por estar de pie con ropa de época prestada y repetir el mismo paso ante la cámara una docena de veces. La mezcla española de trazados romanos, islámicos y medievales la convierte en escenario habitual.|Une production tournant dans une vieille ville bien conservée avait besoin de figurants pour remplir une scène de marché, payant un forfait journalier pour se tenir en costume d'époque emprunté et refaire le même passage devant la caméra une douzaine de fois. Le mélange espagnol de tissus urbains romains, islamiques et médiévaux en fait un décor de substitution fréquent.|よく保存された旧市街で撮影していた制作会社が、市場の場面を埋めるエキストラを求めていた。借り物の時代衣装のまま立ちっぱなしで、同じ歩みをカメラの前で十数回繰り返すだけで、一日分の定額が支払われた。ローマ・イスラム・中世が入り混じるスペインの街並みは、地中海世界のほぼどこにでも見える代役の舞台としてよく使われる。",
  ),
  ev(
    "multa-zbe", "loss", [], "🚫", 180,
    "A fine for driving into the low-emission zone|Una multa por entrar en la zona de bajas emisiones|Une amende pour être entré en zone à faibles émissions|低排出ガス規制区域に入って罰金",
    "A rented car without the right environmental sticker crossed into a city-centre low-emission zone without anyone noticing the small blue-and-white sign, and the fine arrived by post weeks later with the rental company's processing fee added on top. Most large Spanish cities now restrict older, more polluting vehicles from their centres year-round.|Un coche de alquiler sin la pegatina ambiental correcta entró en una zona de bajas emisiones del centro sin que nadie notara el pequeño cartel azul y blanco, y la multa llegó por correo semanas después con el recargo de gestión de la empresa de alquiler. La mayoría de las grandes ciudades españolas ya restringen los vehículos más antiguos y contaminantes de sus centros todo el año.|Une voiture de location sans le bon macaron environnemental est entrée dans une zone à faibles émissions du centre-ville sans que personne ne remarque le petit panneau bleu et blanc, et l'amende est arrivée par courrier des semaines plus tard, avec les frais de dossier du loueur en plus. La plupart des grandes villes espagnoles restreignent désormais les véhicules plus anciens et polluants de leur centre toute l'année.|正しい環境ステッカーを貼っていないレンタカーが、小さな青と白の標識に誰も気づかないまま都心の低排出ガス規制区域に入ってしまい、数週間後、レンタル会社の手数料まで上乗せされた罰金通知が郵便で届いた。スペインの主要都市の多くは、いまや古く汚染度の高い車を年間を通じて中心部から締め出している。",
  ),
  ev(
    "perder-mus", "loss", [], "🃏", 160,
    "Losing badly at mus|Perdiendo feo al mus|Une lourde défaite au mus|ムス(トランプ)の勝負に負ける",
    "Mus is played in pairs with a system of winks, eyebrow raises and other signals partners are supposed to memorise in advance, and sitting down without knowing the local signal set meant misreading a partner's hand all evening. The stakes in a bar game are usually a round of drinks, but this one had crept up to something that stung more.|El mus se juega en parejas con un sistema de guiños, cejas y otras señas que los compañeros deben tener memorizadas de antemano, y sentarse sin conocer el juego de señas local significó leer mal la mano del compañero toda la noche. Las apuestas en una partida de bar suelen ser una ronda de bebidas, pero esta había subido a algo que dolió más.|Le mus se joue en équipes avec un système de clins d'œil, de sourcils levés et d'autres signes que les partenaires sont censés avoir mémorisés à l'avance, et s'asseoir sans connaître le jeu de signes local a fait mal lire le jeu du partenaire toute la soirée. Les mises d'une partie de bar sont d'ordinaire une tournée, mais celle-ci avait grimpé vers quelque chose de plus douloureux.|ムスは二人一組で、あらかじめ覚えておくはずのウインクや眉の動きなどの合図を使って進める。その土地の合図を知らずに座ったせいで、一晩中相棒の手を読み違えた。バルでの賭けはたいてい一杯おごる程度だが、この夜はそれよりずっと痛い額まで膨らんでいた。",
  ),

  // ---- ctr 中央(メセタ) ----
  ev(
    "retiro-castanas", "gain", ["ctr"], "🌰", 230,
    "Roasting chestnuts by the park gate|Asando castañas junto a la puerta del parque|Griller des châtaignes à la porte du parc|公園の門で栗を焼く",
    "A street vendor near the Retiro needed a second pair of hands turning chestnuts over a charcoal brazier through the cold snap, wrapping paper cones for a line that stretched past the gate on the coldest evenings. The smell alone is often credited with pulling in customers who had not planned on buying anything.|Un vendedor callejero cerca del Retiro necesitaba manos extra para dar vueltas a las castañas sobre un brasero de carbón durante la ola de frío, envolviendo cucuruchos de papel para una cola que en las noches más frías llegaba más allá de la puerta. Solo el olor atrae a menudo a clientes que no pensaban comprar nada.|Un vendeur de rue près du Retiro avait besoin de bras supplémentaires pour retourner les châtaignes sur un brasero à charbon pendant la vague de froid, emballant des cornets de papier pour une file qui, les soirs les plus froids, dépassait la porte. L'odeur seule attire souvent des clients qui ne comptaient rien acheter.|レティーロ公園の門近くの露天商が、寒波のあいだ炭火の上で栗をひっくり返す手を求めていた。いちばん寒い晩には列が門の外まで延び、紙の円錐を包み続けた。何も買うつもりのなかった客まで呼び込むのは、たいていその匂いのおかげだとされる。",
    [7, 8],
  ),
  ev(
    "derbi-apuesta", "loss", ["ctr"], "⚽", 190,
    "A losing bet on the Madrid derby|Una apuesta perdida en el derbi madrileño|Un pari perdu sur le derby madrilène|マドリード・ダービーで賭けに負ける",
    "A confident bet placed before kickoff looked safe until a stoppage-time goal flipped the result, and the betting-shop receipt went straight in the bin along with the money. Local derbies between the city's two biggest clubs are notoriously hard to call, which is exactly why the odds tempt so many people into betting on them anyway.|Una apuesta segura hecha antes del pitido inicial parecía ganada hasta que un gol en el descuento cambió el resultado, y el resguardo de la casa de apuestas fue directo a la basura junto con el dinero. Los derbis entre los dos grandes clubes de la ciudad son notoriamente difíciles de predecir.|Un pari sûr placé avant le coup d'envoi semblait gagné jusqu'à un but au temps additionnel qui a renversé le résultat, et le ticket du bureau de paris est parti droit à la poubelle avec l'argent. Les derbys entre les deux grands clubs de la ville sont notoirement difficiles à prévoir.|キックオフ前は堅いと思われた賭けも、アディショナルタイムのゴールで結果がひっくり返り、賭け屋の控えはお金もろともゴミ箱行きになった。市内二大クラブの対戦はもとより予想が難しいことで知られ、だからこそオッズがこれほど多くの人を賭けへ誘い込む。",
  ),

  // ---- ext エストレマドゥーラ ----
  ev(
    "bodega-jamon", "gain", ["ext"], "🍖", 210,
    "Helping out in a ham-curing cellar|Ayudando en una bodega de curado de jamón|Aider dans une cave d'affinage de jambon|生ハムの熟成蔵を手伝う",
    "A family bodega needed an extra pair of hands turning and checking hundreds of hanging hams during the coolest hours of the day, work paid partly in cash and partly in a cut of the trimmings nobody minds taking home. Extremadura's dehesa pastureland, dotted with holm and cork oaks, produces the acorn-fed pigs the region's best hams are named for.|Una bodega familiar necesitaba manos extra para voltear y revisar cientos de jamones colgados en las horas más frescas del día, un trabajo pagado en parte en efectivo y en parte con recortes que nadie se negaba a llevarse a casa. Las dehesas de Extremadura, salpicadas de encinas y alcornoques, crían los cerdos de bellota que dan nombre a los mejores jamones.|Une bodega familiale avait besoin de bras pour retourner et vérifier des centaines de jambons suspendus durant les heures les plus fraîches de la journée, un travail payé en partie en espèces et en partie en parures que personne ne refusait de rapporter chez soi. Les pâturages de dehesa d'Estrémadure, parsemés de chênes verts et de chênes-lièges, élèvent les porcs nourris de glands.|家族経営の熟成蔵が、一日でいちばん涼しい時間帯に何百本もの吊るした生ハムを裏返して点検する手を求めていた。現金と、誰も持ち帰るのを断らない切り落としの両方で支払われた。エストレマドゥーラのデエサ牧草地は、樫の木が点在し、その地方いちばんの生ハムの名の由来となるどんぐり育ちの豚を育てている。",
  ),
  ev(
    "dehesa-pinchazo", "loss", ["ext"], "🛞", 170,
    "A flat tyre on an unpaved dehesa track|Un pinchazo en una pista de dehesa sin asfaltar|Une crevaison sur une piste de dehesa non goudronnée|舗装されていないデエサの道でパンク",
    "A shortcut across open pastureland looked faster on the map than the paved road, until a hidden rock split a tyre with nobody around for kilometres in any direction. Spare parts and a tow both cost more once the mechanic realises how far out the car actually is.|Un atajo por dehesa abierta parecía más rápido en el mapa que la carretera asfaltada, hasta que una piedra oculta reventó un neumático sin nadie alrededor en kilómetros a la redonda. Las piezas de repuesto y la grúa cuestan más en cuanto el mecánico se da cuenta de lo lejos que está el coche.|Un raccourci à travers la dehesa ouverte semblait plus rapide sur la carte que la route goudronnée, jusqu'à ce qu'une pierre cachée crève un pneu sans personne alentour sur des kilomètres. Les pièces de rechange et le remorquage coûtent plus cher une fois que le mécanicien réalise à quel point la voiture est isolée.|開けたデエサを突っ切る近道は、地図の上では舗装路より速く見えたが、隠れた石でタイヤが裂けたときには何kmも周りに誰もいなかった。整備士がその車がどれほど辺鄙な場所にいるか気づくと、部品代もレッカー代もその分高くつく。",
  ),

  // ---- cat カタルーニャ ----
  ev(
    "cava-vendimia", "gain", ["cat"], "🍾", 240,
    "An extra hand at a cava harvest|Una mano extra en la vendimia del cava|Un coup de main pour les vendanges du cava|カバの収穫を手伝う",
    "A Penedès winery needed extra pickers for a single intense day before a forecast storm, paying a flat rate on top of a lunch of bread, cheese and, inevitably, a bottle of the house's own sparkling wine. Cava has to be made by the same traditional second-fermentation method as Champagne to legally carry the name.|Una bodega del Penedès necesitaba vendimiadores extra para una jornada intensa antes de una tormenta prevista, con una paga fija además de un almuerzo de pan, queso y, inevitablemente, una botella del espumoso de la propia casa. El cava debe elaborarse con el mismo método tradicional de segunda fermentación que el champán para llevar legalmente ese nombre.|Une cave du Penedès avait besoin de vendangeurs supplémentaires pour une journée intense avant un orage annoncé, payant un forfait en plus d'un déjeuner de pain, de fromage et, inévitablement, d'une bouteille du mousseux maison. Le cava doit être élaboré selon la même méthode traditionnelle de seconde fermentation que le champagne pour porter légalement ce nom.|ペネデスのワイナリーが、予報された嵐の前の一日だけ集中的に働く摘み手を求めていた。定額の日当に加え、パンとチーズ、そして必ずと言っていいほど自家製のスパークリングワインが昼食に付いた。カバは法律上その名を名乗るために、シャンパンと同じ伝統的な瓶内二次発酵の製法で造らなければならない。",
    [5],
  ),
  ev(
    "eixample-multa", "loss", ["cat"], "🅿️", 200,
    "A fine for parking across a chamfered corner|Una multa por aparcar en una esquina achaflanada|Une amende pour s'être garé sur un coin chanfreiné|角切り街区の角にまたがって駐車し罰金",
    "The extra-wide chamfered corners of the Eixample grid look like generous parking space until a fine arrives for blocking the sightline they were actually built to protect. City inspectors patrol the district's corners specifically because the temptation to park there is apparently constant.|Las amplias esquinas achaflanadas de la cuadrícula del Eixample parecen espacio de sobra para aparcar, hasta que llega una multa por bloquear la visibilidad que en realidad estaban pensadas para proteger. Los inspectores municipales patrullan las esquinas del barrio precisamente porque la tentación de aparcar ahí es, al parecer, constante.|Les larges coins chanfreinés de la grille de l'Eixample semblent offrir un espace de stationnement généreux, jusqu'à ce qu'une amende arrive pour avoir bloqué la visibilité qu'ils étaient en réalité censés protéger. Les inspecteurs municipaux patrouillent les coins du quartier précisément parce que la tentation de s'y garer est, semble-t-il, constante.|エイシャンプレの碁盤の目の、幅広く角を切った街区の角は駐車にちょうどよく見えるが、本来その角が守るはずだった視界を塞いだとして罰金が届く。地区の角をわざわざ市の監視員が巡回しているのは、そこに停めたくなる誘惑がよほど絶えないからだという。",
  ),

  // ---- eus バスク+ナバラ ----
  ev(
    "pintxo-viernes", "gain", ["eus"], "🍢", 220,
    "Working a pintxo bar's Friday rush|Trabajando el ajetreo del viernes en un bar de pintxos|Travailler le coup de feu du vendredi dans un bar à pintxos|金曜の混雑するピンチョス・バーで働く",
    "A bar along the old town's pintxo route needed an extra pair of hands restocking skewered snacks along the counter as fast as regulars could grab them, and the tip jar alone from one Friday evening covered a week's groceries. Pintxos are traditionally counted by the toothpick left on the plate rather than by an order taken in advance.|Un bar de la ruta de pintxos del casco viejo necesitaba manos extra para reponer los pinchos en la barra tan rápido como los parroquianos los cogían, y solo el bote de propinas de un viernes por la tarde cubrió la compra de una semana. Los pintxos se cuentan tradicionalmente por el palillo que queda en el plato.|Un bar de la route des pintxos de la vieille ville avait besoin de bras pour réapprovisionner le comptoir en brochettes aussi vite que les habitués les prenaient, et le seul pot à pourboires d'un vendredi soir a couvert les courses d'une semaine. Les pintxos se comptent traditionnellement au cure-dent resté sur l'assiette.|旧市街のピンチョス街道沿いのバルが、常連が取っていく端から串刺しのつまみをカウンターに補充する手を求めていた。ある金曜の夜だけのチップ入れで、一週間分の食料品代が賄えた。ピンチョスは事前の注文ではなく、皿に残った楊枝の数で数えるのが伝統である。",
  ),
  ev(
    "chupinazo-zapato", "loss", ["eus"], "👟", 180,
    "A shoe lost in the chupinazo crush|Un zapato perdido en el gentío del chupinazo|Une chaussure perdue dans la cohue du chupinazo|チュピナソの人混みで靴をなくす",
    "The crowd packed into the square for the opening rocket of San Fermín surged forward the moment it went off, and a shoe came clean off in the crush, never to be found again amid thousands of stamping feet. Buying a replacement pair on the spot, at festival prices, cost several times what the original pair was worth.|La multitud apretada en la plaza para el cohete de apertura de San Fermín avanzó de golpe en cuanto sonó, y un zapato se soltó del todo en el gentío, sin volver a aparecer entre miles de pies pisoteando. Comprar un par de repuesto allí mismo, a precio de fiesta, costó varias veces lo que valía el original.|La foule tassée sur la place pour la fusée d'ouverture de San Fermín s'est ruée en avant dès qu'elle a claqué, et une chaussure s'est complètement détachée dans la cohue, introuvable ensuite parmi des milliers de pieds piétinant. Racheter une paire sur place, à prix de fête, a coûté plusieurs fois la valeur de l'originale.|サン・フェルミンの開幕を告げるロケット花火が鳴った瞬間、広場に詰めかけた群衆が前へなだれ込み、靴が片方完全に脱げてしまった。何千もの踏みつける足の中で二度と見つかることはなかった。その場で祭り値段の替えを買う羽目になり、元の靴の何倍もの出費になった。",
    [3],
  ),

  // ---- nor カンタブリア海岸 ----
  ev(
    "lagar-sidra", "gain", ["nor"], "🍏", 210,
    "Turning the press at a cider mill|Dando vueltas al lagar de una sidrería|Tourner le pressoir d'une cidrerie|シードル搾り小屋で圧搾機を回す",
    "An Asturian lagar needed extra hands loading apples into the press during the short window when the whole harvest has to be crushed before it spoils, work that paid by the day and ended with everyone soaked to the elbow in must. The job runs on the orchard's schedule rather than the calendar, since a late frost or an early one can shift the whole harvest by weeks.|Un lagar asturiano necesitaba manos extra para cargar manzanas en la prensa durante la breve ventana en que hay que estrujar toda la cosecha antes de que se eche a perder, un trabajo pagado por día que terminó con todos empapados de mosto hasta el codo. El trabajo sigue el calendario del manzanal y no el del año.|Un lagar asturien avait besoin de bras pour charger les pommes dans le pressoir durant la courte fenêtre où toute la récolte doit être pressée avant de s'abîmer, un travail payé à la journée qui s'est terminé avec tout le monde trempé de moût jusqu'au coude. Le travail suit le calendrier du verger plutôt que celui de l'année.|アストゥリアスのシードル搾り小屋が、収穫全体が傷む前に搾りきらねばならない短い期間、圧搾機にリンゴを入れる手を求めていた。日払いの仕事で、終わる頃には誰もが肘まで果汁まみれになっていた。この仕事は暦ではなく果樹園の都合で動く。遅霜や早霜が収穫全体を何週間もずらすことがあるからである。",
    [5, 6],
  ),
  ev(
    "ola-movil", "loss", ["nor"], "📱", 190,
    "A phone soaked by an unnoticed wave|Un móvil empapado por una ola inadvertida|Un téléphone trempé par une vague passée inaperçue|気づかぬ波でスマホが水浸しに",
    "A photo taken too close to the tideline on a rocky Cantabrian beach ended with a wave nobody was watching for, and the phone never turned on again despite a hopeful few days in a bag of rice. The Bay of Biscay's tidal range here is large enough that a safe-looking rock can be underwater again within the hour.|Una foto hecha demasiado cerca de la orilla en una playa rocosa cántabra terminó con una ola que nadie vigilaba, y el móvil no volvió a encenderse pese a unos días de esperanza en una bolsa de arroz. La marea del golfo de Vizcaya aquí tiene tanto rango que una roca que parece segura puede volver a quedar bajo el agua en una hora.|Une photo prise trop près de la ligne de marée sur une plage rocheuse cantabrique s'est terminée par une vague que personne ne surveillait, et le téléphone n'a plus jamais rallumé malgré quelques jours d'espoir dans un sac de riz. Le marnage du golfe de Gascogne y est assez grand pour qu'un rocher d'apparence sûre soit de nouveau sous l'eau en une heure.|カンタブリアの岩場の浜で波打ち際に近づきすぎて写真を撮ったところ、誰も見ていなかった波にさらわれ、米びつに数日入れて期待をかけたが電話は二度とつかなかった。ここのビスケー湾の干満差は大きく、安全に見えた岩も一時間もすれば再び水の下に沈む。",
  ),

  // ---- gal ガリシア ----
  ev(
    "batea-cuerdas", "gain", ["gal"], "🦪", 200,
    "A day hauling ropes on a mussel raft|Un día tirando de cuerdas en una batea|Une journée à tirer les cordes sur une batea|ムール貝の筏でロープを引く一日",
    "A batea crew short one pair of hands for the day paid cash to help haul dripping ropes thick with mussels up out of the ría and sort them by size on deck, work that starts before sunrise so the boats are back in before the day's heat sets in. Galicia's rías produce a large share of the world's farmed mussels this way.|Una cuadrilla de batea con una mano menos pagó en efectivo por ayudar a subir a bordo cuerdas chorreantes cargadas de mejillones desde la ría y clasificarlos por tamaño en cubierta, un trabajo que empieza antes del amanecer para que las barcas vuelvan antes de que apriete el calor. Las rías gallegas producen así buena parte del mejillón cultivado del mundo.|Un équipage de batea à court d'un bras pour la journée a payé en espèces pour aider à hisser hors de la ría des cordes dégoulinantes chargées de moules et les trier par taille sur le pont, un travail qui commence avant le lever du soleil pour que les bateaux rentrent avant la chaleur du jour. Les rías galiciennes produisent ainsi une large part des moules d'élevage mondiales.|人手が一人足りないバテア(養殖筏)の乗組員が、リアからムール貝のびっしり付いたロープを引き上げ、甲板でサイズ別に選り分ける手伝いに現金を払った。日中の暑さが強まる前に船を戻せるよう、日の出前から始まる仕事である。ガリシアのリアはこうして世界の養殖ムール貝の大きな割合を生産している。",
  ),
  ev(
    "camino-ampolla", "loss", ["gal"], "🩹", 170,
    "A blister that forces a taxi shortcut|Una ampolla que obliga a un atajo en taxi|Une ampoule qui impose un raccourci en taxi|マメが原因でタクシーの近道を使う羽目に",
    "A blister ignored for one stage too many on the Camino turned into something that made every step to the next albergue unbearable, and a taxi to skip the last several kilometres cost more than several nights of lodging combined. Pilgrims are warned about exactly this on the first day and almost universally ignore the warning until it is too late.|Una ampolla ignorada una etapa de más en el Camino se convirtió en algo que hizo insoportable cada paso hasta el siguiente albergue, y un taxi para saltarse los últimos kilómetros costó más que varias noches de alojamiento juntas. A los peregrinos se les avisa de esto exactamente el primer día, y casi todos ignoran el aviso hasta que es tarde.|Une ampoule ignorée une étape de trop sur le Camino est devenue quelque chose qui rendait insupportable chaque pas jusqu'au prochain gîte, et un taxi pour sauter les derniers kilomètres a coûté plus que plusieurs nuits d'hébergement réunies. On prévient les pèlerins de cela dès le premier jour, et presque tous ignorent l'avertissement jusqu'à ce qu'il soit trop tard.|巡礼路で一区間我慢しすぎたマメが、次の宿までの一歩一歩を耐えがたいものに変えてしまい、最後の数kmを飛ばすタクシー代は宿泊数泊分を合わせたより高くついた。巡礼者は初日にまさにこの警告を受けるが、手遅れになるまでほぼ誰もが聞き流す。",
  ),

  // ---- and アンダルシア ----
  ev(
    "aceituna-cosecha", "gain", ["and"], "🫒", 230,
    "A day picking olives before the rain|Un día recogiendo aceitunas antes de la lluvia|Une journée à cueillir des olives avant la pluie|雨の前にオリーブを摘む一日",
    "A grove owner needed extra pickers to strip the trees before forecast rain could bruise the fruit on the ground, paying by the kilo collected with nets spread beneath each tree. Andalusia produces a large share of the world's olive oil, and the harvest season pulls in day labourers from well beyond the region for exactly this kind of short, intense work.|Un dueño de olivar necesitaba recolectores extra para varear los árboles antes de que la lluvia prevista dañara el fruto en el suelo, pagando por kilo recogido con redes extendidas bajo cada árbol. Andalucía produce buena parte del aceite de oliva del mundo, y la temporada de recolección atrae a jornaleros de bien fuera de la región.|Un propriétaire d'oliveraie avait besoin de cueilleurs supplémentaires pour dépouiller les arbres avant que la pluie annoncée n'abîme les fruits au sol, payant au kilo récolté avec des filets tendus sous chaque arbre. L'Andalousie produit une large part de l'huile d'olive mondiale, et la saison de récolte attire des journaliers venus de bien au-delà de la région.|オリーブ園の主が、予報された雨が地面の実を傷める前に木を摘み終えようと、余分の摘み手を求めていた。各木の下に広げた網に落とした重さで日当が決まる。アンダルシアは世界のオリーブ油の大きな割合を生産し、収穫期にはこの短く集中する仕事のために地方の外からも日雇い労働者が集まる。",
    [7, 8, 9],
  ),
  ev(
    "caseta-cartas", "loss", ["and"], "🎴", 200,
    "Losing at cards in a feria caseta|Perdiendo a las cartas en una caseta de feria|Perdre aux cartes dans une caseta de feria|フェリアの仮設小屋でカードに負ける",
    "A friendly-looking card game inside a rented feria caseta turned out to have house rules nobody explained until the betting was already underway, and the rebujito kept coming faster than the losses could be tracked. Booths like these are rented by families and clubs for the week and mostly host private parties, which is exactly why an outsider rarely knows what they have walked into.|Un juego de cartas de aspecto amistoso dentro de una caseta de feria alquilada resultó tener reglas de la casa que nadie explicó hasta que ya se estaba apostando, y el rebujito seguía llegando más rápido de lo que se podían llevar las cuentas de lo perdido. Estas casetas las alquilan familias y peñas para la semana y suelen ser fiestas privadas.|Une partie de cartes d'apparence amicale dans une caseta de feria louée s'est révélée avoir des règles maison que personne n'a expliquées avant que les mises ne soient déjà lancées, et le rebujito arrivait plus vite que les pertes ne pouvaient être comptées. Ces stands sont loués par des familles et des clubs pour la semaine et accueillent surtout des fêtes privées.|借り上げたフェリアの仮設小屋の中の、一見気さくなカード遊びには、賭けが始まってから初めて明かされる「家のルール」があった。レブヒートは負けを数え切れないほど次々運ばれてきた。こうした小屋は一家や仲間内のクラブが一週間借りて開く、ほぼ内輪の集まりで、だからこそ部外者には自分が何に足を踏み入れたのか分かりにくい。",
    [0, 1],
  ),

  // ---- est アラゴン+レバンテ+ムルシア ----
  ev(
    "tribunal-turnos", "gain", ["est"], "💧", 210,
    "Handing out numbers at the water tribunal|Repartiendo turnos en el tribunal del agua|Distribuer les numéros au tribunal de l'eau|水法廷で順番札を配る",
    "The clerk running the weekly water tribunal hearing needed an extra hand keeping the queue of farmers in order and calling names as each irrigation dispute came up, a short paid job that ended with a better understanding of the huerta's canal map than most residents ever bother to learn. The tribunal has met on the same schedule for so long that its exact age is disputed even by historians.|El funcionario que llevaba la vista semanal del tribunal del agua necesitaba una mano extra para mantener en orden la cola de agricultores y llamar a cada uno según llegaba su disputa de riego, un trabajo breve y pagado que terminó con un conocimiento del mapa de acequias de la huerta mejor que el de la mayoría de vecinos. El tribunal lleva reuniéndose con el mismo calendario tanto tiempo que hasta los historiadores discuten su antigüedad exacta.|Le greffier tenant l'audience hebdomadaire du tribunal de l'eau avait besoin d'un coup de main pour tenir en ordre la file d'agriculteurs et appeler chacun selon son litige d'irrigation, un petit travail payé qui s'est terminé avec une meilleure connaissance du réseau de canaux de la huerta que la plupart des habitants n'en acquièrent jamais. Le tribunal siège selon le même calendrier depuis si longtemps que même les historiens discutent son âge exact.|毎週開かれる水法廷の書記が、農家の列を整理し、灌漑をめぐる紛争が来るたびに名を呼ぶ手を求めていた。短い有給の仕事だったが、終わる頃には多くの住民より灌漑水路の地図に詳しくなっていた。この法廷はあまりに長く同じ周期で開かれ続けているため、正確な創設年は歴史家のあいだでも意見が分かれる。",
  ),
  ev(
    "mascleta-movil", "loss", ["est"], "🧨", 180,
    "A firecracker mishap during the mascletà|Un percance con petardos durante la mascletà|Un incident de pétards pendant la mascletà|マスクレタで爆竹の事故に遭う",
    "Filming the daytime fireworks display a little too close meant a stray spark landed square on a phone screen, cracking it before the final volley even went off. Locals watch the mascletà with their mouths slightly open and their phones tucked well away, a habit visitors tend to learn only after the first cracked screen.|Grabar la mascletà un poco demasiado cerca hizo que una chispa perdida cayera justo en la pantalla del móvil, agrietándola antes de que sonara siquiera la traca final. Los locales ven la mascletà con la boca entreabierta y el móvil bien guardado, una costumbre que los visitantes suelen aprender solo tras la primera pantalla rota.|Filmer le spectacle pyrotechnique diurne d'un peu trop près a fait qu'une étincelle perdue est tombée en plein sur l'écran d'un téléphone, le fissurant avant même que la salve finale ne parte. Les habitants regardent la mascletà bouche entrouverte et téléphone bien rangé, une habitude que les visiteurs n'apprennent souvent qu'après leur premier écran fissuré.|昼間のマスクレタをあまりに近くで撮影していたせいで、はぐれた火の粉がちょうどスマホの画面に落ち、最後の一斉射撃が鳴る前にひびが入ってしまった。地元の人はマスクレタを口を軽く開けたまま、スマホはしっかりしまって見物する。訪れた人の多くは、最初の画面のひびを経験してからようやくその習慣を身につける。",
    [11],
  ),
];
