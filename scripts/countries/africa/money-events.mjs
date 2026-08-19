/**
 * アフリカ大陸盤面の青マス・赤マスで起きる出来事(18件。増9・減9)。
 *
 * 地方コード: mag=マグレブ・ナイル・モーリタニア / sah=サヘル・西アフリカ内陸 /
 * gof=ギニア湾岸 / caf=中部アフリカ・コンゴ盆地 / hoa=アフリカの角 /
 * eaf=東アフリカ・大湖地方 / saf=南部アフリカ
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方でも必ず gain と loss が1件は引ける(他の盤面と同じ約束)。
 * そのうえで7地方それぞれに2件(増1・減1)を置いている。
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

export const AFRICA_MONEY_EVENTS = [
  // ---- 全地方共通・通年 ----
  ev(
    "peanut-window-sale", "gain", [], "🥜", 220,
    "Selling roasted peanuts through a slow train's window|Vendiendo cacahuetes tostados por la ventanilla de un tren lento|Vendre des cacahuètes grillées par la fenêtre d'un train lent|徐行する列車の窓越しに炒った落花生を売る",
    "The train slowed to walking pace on a long uphill grade, exactly the moment vendors along this stretch wait for every day, and a paper cone of hot peanuts passed up through an open window came back down with coins folded inside the empty cone. The train never actually stopped.|El tren redujo a paso de persona en una larga cuesta arriba, justo el momento que los vendedores de este tramo esperan cada día, y un cucurucho de cacahuetes calientes pasado por una ventanilla abierta volvió con monedas dobladas dentro del cucurucho vacío. El tren nunca llegó a detenerse.|Le train a ralenti au pas dans une longue montée, exactement le moment que les vendeurs de ce tronçon attendent chaque jour, et un cornet de cacahuètes chaudes passé par une fenêtre ouverte est redescendu avec des pièces pliées dans le cornet vide. Le train ne s'est jamais réellement arrêté.|列車は長い上り坂で人が歩くほどの速さまで落ちた。まさにこの区間の物売りたちが毎日待っている瞬間である。開いた窓越しに渡した炒り立ての落花生の紙筒は、空になった筒の中に硬貨を折りたたんで包んで戻ってきた。列車は結局一度も完全には止まらなかった。",
  ),
  ev(
    "stranger-repays-favour", "gain", [], "🤝", 240,
    "A stranger repays an old favour at the station|Un desconocido devuelve un viejo favor en la estación|Un inconnu rend une vieille faveur à la gare|見知らぬ人が駅で昔の恩を返しに来る",
    "A face at the ticket window looked familiar for a moment before the memory clicked: a small kindness from years ago and a different city, now returned with interest and a story about how much that first help had actually mattered. Neither side had expected to meet again.|Un rostro en la ventanilla de billetes resultó vagamente familiar hasta que encajó el recuerdo: una pequeña amabilidad de hace años y otra ciudad, devuelta ahora con creces y una historia de lo mucho que aquella primera ayuda había importado.|Un visage au guichet a semblé familier un instant avant que le souvenir ne se précise : une petite gentillesse d'il y a des années, dans une autre ville, rendue maintenant avec les intérêts et un récit de l'importance qu'avait eue cette première aide.|切符売り場の顔にどこか見覚えがあると思った次の瞬間、記憶がつながった。何年も前、別の街でのちょっとした親切だった。それがいま利息付きで返ってきた。あの最初の手助けがどれほど助かったかという話とともにである。どちらも再会するとは思っていなかった。",
  ),
  ev(
    "queue-tout-scam", "loss", [], "🎫", 210,
    "A self-appointed 'queue helper' vanishes with your fare|Un 'ayudante de cola' autoproclamado desaparece con el pasaje|Un « aide-file » autoproclamé disparaît avec le prix du billet|自称「行列係」が運賃を持って消える",
    "A helpful stranger offered to hold a place in the ticket line while fetching change for a large note, promising to be back before the window opened. The window opened; the stranger did not.|Un desconocido servicial se ofreció a guardar el turno en la cola mientras iba a buscar cambio para un billete grande, prometiendo volver antes de que abriera la ventanilla. La ventanilla abrió; el desconocido no volvió.|Un inconnu serviable a proposé de garder la place dans la file pendant qu'il allait chercher de la monnaie pour un gros billet, promettant de revenir avant l'ouverture du guichet. Le guichet a ouvert ; l'inconnu, non.|親切そうな見知らぬ人が、大きな紙幣の両替を取りに行く間、切符売り場の列で場所を取っておくと申し出て、窓口が開く前に戻ると約束した。窓口は開いたが、その人は戻ってこなかった。",
  ),
  ev(
    "minibus-change-shortchange", "loss", [], "🚐", 190,
    "Change goes missing in the scrum to board a shared minibus|El cambio se pierde en el empujón por subir a una furgoneta compartida|La monnaie disparaît dans la bousculade pour monter dans un minibus partagé|乗合ミニバスに乗り込む混乱で釣り銭が消える",
    "A dozen elbows and bags converged on the minibus door at once, the conductor's hand passed change back through a gap that closed the instant the vehicle lurched forward, and only after the door slid shut did the coins prove to be short by more than a coincidence should allow.|Una docena de codos y bolsas convergieron a la vez en la puerta de la furgoneta, la mano del cobrador pasó el cambio por un hueco que se cerró en cuanto el vehículo arrancó de golpe, y solo después de cerrarse la puerta las monedas resultaron faltar más de lo que una coincidencia permitiría.|Une douzaine de coudes et de sacs ont convergé d'un coup vers la porte du minibus, la main du receveur a tendu la monnaie par un interstice qui s'est refermé à l'instant même où le véhicule démarrait brusquement, et ce n'est qu'une fois la porte refermée que les pièces se sont révélées manquantes bien au-delà d'une simple coïncidence.|ミニバスの扉に何本もの肘とかばんが一斉に押し寄せ、車掌の手が隙間から釣り銭を渡してきたその隙間は車が急に走り出した瞬間に閉じてしまった。扉が閉まったあとになって、偶然では済まされないほど硬貨が足りないことに気づいた。",
  ),

  // ---- mag: マグレブ・ナイル・モーリタニア ----
  ev(
    "cairo-lost-visitor", "gain", ["mag"], "🧭", 250,
    "Guiding a lost visitor through a crowded interchange|Guiando a un visitante perdido por un intercambiador abarrotado|Guider un visiteur perdu à travers une correspondance bondée|混雑する乗換駅で迷った旅行者を案内する",
    "A visitor stood frozen at the top of the stairs as a wall of commuters flowed around them in both directions at once, clutching a phone with no signal underground, and ten minutes spent walking them to the right platform earned thanks in a currency that, this time, was cash.|Un visitante se quedó paralizado en lo alto de las escaleras mientras un muro de viajeros fluía a su alrededor en ambas direcciones a la vez, aferrado a un teléfono sin señal bajo tierra, y diez minutos acompañándolo hasta el andén correcto ganaron un agradecimiento que, esta vez, fue en efectivo.|Un visiteur restait figé en haut des escaliers tandis qu'un mur de navetteurs s'écoulait autour de lui dans les deux sens à la fois, cramponné à un téléphone sans signal sous terre, et dix minutes passées à l'accompagner jusqu'au bon quai ont valu des remerciements qui, cette fois, prirent la forme d'espèces.|階段の上で旅行者が固まって立ち尽くし、地下で電波の入らない携帯電話を握りしめる間も、周りを通勤客の壁が両方向から流れていった。正しいホームまで十分ほど案内してやると、今回はそのお礼が現金という形でやってきた。",
  ),
  ev(
    "felucca-overcharge", "loss", ["mag"], "⛵", 220,
    "Overpaying a felucca captain for a Nile sunset sail|Pagar de más a un capitán de faluca por un paseo al atardecer por el Nilo|Payer trop cher un capitaine de felouque pour une balade au coucher du soleil sur le Nil|ナイル川の夕暮れの帆船遊覧で払いすぎる",
    "The price quoted on the riverbank sounded reasonable until the boat was already a hundred metres from shore and the captain mentioned, almost as an afterthought, that it had been per person rather than for the whole boat.|El precio que dieron en la orilla sonaba razonable hasta que el barco ya estaba a cien metros de la orilla y el capitán mencionó, casi de pasada, que era por persona y no por todo el barco.|Le prix annoncé sur la berge semblait raisonnable jusqu'à ce que le bateau soit déjà à cent mètres du rivage et que le capitaine mentionne, presque en passant, qu'il s'agissait d'un tarif par personne et non pour tout le bateau.|川岸で告げられた値段はもっともに思えたが、船がすでに岸から百メートル離れたところで、船長はまるでついでのように、それは船一艘の値段ではなく一人あたりの値段だったと切り出した。",
  ),

  // ---- sah: サヘル・西アフリカ内陸 ----
  ev(
    "sand-push-tip", "gain", ["sah"], "🚙", 230,
    "Helping push a truck free of drifted sand|Ayudando a empujar un camión atascado en arena acumulada|Aider à dégager un camion pris dans le sable amoncelé|吹き溜まった砂から立ち往生したトラックを押して助ける",
    "A pickup had sunk to its axles in a sand drift across the track, and a dozen strangers throwing their shoulders behind it at once got it moving again in under a minute, the grateful driver pressing money into every hand that had helped before speeding off.|Una camioneta se había hundido hasta los ejes en una acumulación de arena sobre la pista, y una docena de desconocidos empujando a la vez con el hombro la sacaron en menos de un minuto, con el conductor agradecido metiendo dinero en cada mano que había ayudado antes de arrancar.|Un pick-up s'était enfoncé jusqu'aux essieux dans une congère de sable sur la piste, et une douzaine d'inconnus poussant tous ensemble l'ont dégagé en moins d'une minute, le conducteur reconnaissant glissant de l'argent dans chaque main ayant aidé avant de repartir en trombe.|ピックアップトラックが道を覆う砂の吹き溜まりに車軸まで沈んでいた。十数人の見知らぬ人々が一斉に肩を入れると、一分もかからず動き出した。運転手は礼を言いながら、手伝った一人一人の手にお金を握らせて走り去った。",
  ),
  ev(
    "desert-guide-overcharge", "loss", ["sah"], "🧭", 240,
    "A self-appointed desert guide overcharges for a detour|Un guía autoproclamado del desierto cobra de más por un desvío|Un guide autoproclamé du désert surfacture un détour|自称砂漠ガイドが迂回路の案内に法外な料金を請求する",
    "A track washed out by the last rains needed a local who knew the safe way around, and the man who appeared out of nowhere to offer exactly that turned out to name his price only once the detour was already half finished and turning back was no longer really an option.|Una pista arrasada por las últimas lluvias necesitaba a alguien local que conociera el rodeo seguro, y el hombre que apareció de la nada ofreciendo justo eso resultó fijar su precio solo cuando el desvío ya iba mediado y volver atrás ya no era realmente una opción.|Une piste emportée par les dernières pluies nécessitait un habitant connaissant le détour sûr, et l'homme surgi de nulle part pour offrir exactement cela s'est révélé n'annoncer son prix qu'une fois le détour à moitié fait, quand faire demi-tour n'était plus vraiment envisageable.|直近の雨で流された道には、安全な迂回路を知る地元の人が必要だった。どこからともなく現れてまさにそれを申し出た男は、迂回がすでに半分終わり、もう引き返す選択肢が実質無くなってから値段を切り出してきた。",
  ),

  // ---- gof: ギニア湾岸 ----
  ev(
    "bush-taxi-lastseat", "gain", ["gof"], "🚗", 220,
    "Filling the last seats in a shared bush taxi|Llenando los últimos asientos de un taxi compartido rural|Remplir les dernières places d'un taxi-brousse partagé|乗合ブッシュタクシーの最後の席を埋める",
    "A driver refusing to leave until every seat was sold offered a cut of the fare to anyone who could round up two more passengers from the crowd waiting at the roadside stand, and it took less time than expected to fill the gap.|Un conductor que se negaba a salir hasta vender todos los asientos ofreció una parte del pasaje a quien consiguiera reunir dos pasajeros más entre la gente que esperaba en el puesto de la carretera, y llevó menos tiempo del esperado llenar el hueco.|Un chauffeur refusant de partir tant que toutes les places n'étaient pas vendues a offert une part du tarif à qui rassemblerait deux passagers de plus parmi la foule attendant à l'étal du bord de route, et il a fallu moins de temps que prévu pour combler le vide.|全ての席が埋まるまで出発を拒む運転手は、道端の露店で待つ人々の中からあと二人乗客を集めてくれた者に運賃の一部を渡すと申し出た。空席を埋めるのに思ったより時間はかからなかった。",
  ),
  ev(
    "ferry-tout-vanish", "loss", ["gof"], "⛴️", 230,
    "A ferry tout pockets the fare and disappears into the crowd|Un revendedor del ferry se embolsa el pasaje y desaparece entre la multitud|Un rabatteur de ferry empoche le tarif et disparaît dans la foule|フェリーの客引きが運賃を懐に入れて人混みに消える",
    "A man in an official-looking vest was collecting fares well ahead of the actual ticket booth, waving people onto a boat that turned out to be a different one entirely once the real ferry company staff started asking who had already paid whom.|Un hombre con un chaleco de aspecto oficial cobraba pasajes bien antes de la taquilla real, indicando a la gente que subiera a un barco que resultó ser completamente distinto en cuanto el personal real de la naviera empezó a preguntar quién ya le había pagado a quién.|Un homme en gilet à l'allure officielle collectait les tarifs bien avant le vrai guichet, faisant signe aux gens de monter sur un bateau qui s'est révélé être tout autre une fois que le personnel de la vraie compagnie a commencé à demander qui avait déjà payé qui.|公式らしいベストを着た男が、本物の切符売り場よりずっと手前で運賃を集め、人々を船へ手招きしていた。本物のフェリー会社の職員が「誰が誰に払ったのか」と聞き始めたところで、それがまったく別の船だったと判明した。",
  ),

  // ---- caf: 中部アフリカ・コンゴ盆地 ----
  ev(
    "pirogue-pole-help", "gain", ["caf"], "🛶", 230,
    "Helping pole a pirogue across the river where the bridge is out|Ayudando a impulsar con pértiga una piragua por el río donde el puente está caído|Aider à pousser à la perche une pirogue à travers la rivière où le pont est coupé|橋が流された川をピローグの竿さしで手伝う",
    "The bridge marked on every map had washed out two rainy seasons ago and never been rebuilt, so the only way across was a dugout canoe poled by hand, and an extra pair of arms on the pole earned a share of what the regular passengers paid.|El puente marcado en todos los mapas se había derrumbado hacía dos temporadas de lluvias y nunca se reconstruyó, así que la única forma de cruzar era una piragua impulsada a mano con pértiga, y un par de brazos extra en la pértiga ganó una parte de lo que pagaban los pasajeros habituales.|Le pont indiqué sur toutes les cartes avait été emporté depuis deux saisons des pluies et n'avait jamais été reconstruit, si bien que la seule façon de traverser était une pirogue poussée à la perche à la main, et une paire de bras supplémentaire à la perche a rapporté une part de ce que payaient les passagers habituels.|地図にはどれにも載っている橋は、二回前の雨季に流されて以来一度も再建されていなかった。渡る唯一の方法は手で竿を差す丸木舟だけで、竿差しに加わったぶん、正規の乗客が払う料金の一部を分けてもらえた。",
  ),
  ev(
    "river-crossing-doubled", "loss", ["caf"], "🚤", 240,
    "A river crossing operator doubles the fare once you're aboard|El operador del cruce del río dobla la tarifa una vez a bordo|Un passeur de rivière double le tarif une fois à bord|川渡しの運航者が乗船後に運賃を倍にする",
    "The price quoted from the bank was clear enough, but halfway across the current the boatman cut the engine and mentioned, over the sound of water lapping the hull, that the fare doubled once a boat was already mid-river with nowhere else for its passengers to go.|El precio dado desde la orilla era bastante claro, pero a mitad de la corriente el barquero cortó el motor y mencionó, con el sonido del agua chapoteando contra el casco, que la tarifa se duplicaba una vez el barco ya estaba a mitad de río sin otro sitio adonde ir para sus pasajeros.|Le prix annoncé depuis la berge était pourtant clair, mais à mi-parcours dans le courant, le batelier a coupé le moteur et mentionné, par-dessus le clapotis de l'eau contre la coque, que le tarif doublait une fois le bateau déjà au milieu de la rivière, sans autre endroit où aller pour ses passagers.|岸で告げられた値段ははっきりしていたはずだったが、流れの半ばまで来たところで船頭はエンジンを止め、船体を打つ水音に紛れさせるように、船が川の真ん中まで来て乗客に他の行き場が無くなると運賃は倍になるのだと切り出した。",
  ),

  // ---- hoa: アフリカの角 ----
  ev(
    "coffee-sack-carry", "gain", ["hoa"], "☕", 230,
    "Helping carry coffee sacks at a highland market|Ayudando a cargar sacos de café en un mercado de las tierras altas|Aider à porter des sacs de café sur un marché des hautes terres|高地の市場でコーヒー袋を運ぶ手伝いをする",
    "A truck arriving late to the highland market found its usual porters already gone home for the day, and shifting a morning's worth of green coffee sacks from the tailgate to the weighing scale earned a rate that made the aching shoulders worth it.|Un camión que llegó tarde al mercado de las tierras altas encontró a sus porteadores habituales ya de vuelta en casa por el día, y trasladar toda una mañana de sacos de café verde desde el remolque hasta la báscula ganó una tarifa que hizo que los hombros doloridos valieran la pena.|Un camion arrivé en retard au marché des hautes terres a trouvé ses porteurs habituels déjà rentrés pour la journée, et transporter toute une matinée de sacs de café vert du hayon jusqu'à la balance a rapporté un tarif qui a valu la peine des épaules endolories.|高地の市場に遅れて着いたトラックは、いつもの荷担ぎがもうその日の仕事を終えて帰ってしまっていた。荷台から秤まで午前中ぶんの生豆の袋を運ぶと、肩の痛みに見合うだけの報酬がもらえた。",
  ),
  ev(
    "port-agent-handling-fee", "loss", ["hoa"], "📋", 250,
    "A port agent demands an unofficial handling fee|Un agente portuario exige una tarifa de gestión no oficial|Un agent portuaire exige des frais de manutention officieux|港湾代理人が非公式な取扱手数料を要求する",
    "The paperwork for a small parcel was, according to the agent behind the desk, technically in order but would move a great deal faster with an unlisted 'processing fee' added on top, paid in cash and receipted nowhere at all.|El papeleo de un pequeño paquete estaba, según el agente tras el mostrador, técnicamente en regla, pero se tramitaría mucho más rápido con una 'tarifa de procesamiento' no listada añadida encima, pagada en efectivo y sin recibo alguno.|Les papiers d'un petit colis étaient, selon l'agent derrière le bureau, techniquement en règle, mais avanceraient bien plus vite avec des « frais de traitement » non répertoriés ajoutés par-dessus, payés en espèces et sans reçu d'aucune sorte.|窓口の係員によれば、小包の書類は形式上は問題ないが、一覧に無い「手続き手数料」を上乗せすれば手続きはずっと早く進むという。現金払いで、領収書はどこにも発行されなかった。",
  ),

  // ---- eaf: 東アフリカ・大湖地方 ----
  ev(
    "safari-spotter-tip", "gain", ["eaf"], "🦁", 250,
    "Spotting wildlife first earns a tip from a safari group|Avistar antes que nadie a la fauna gana propina de un grupo de safari|Repérer la faune en premier vaut un pourboire d'un groupe de safari|野生動物を最初に見つけてサファリの一行からチップをもらう",
    "A flash of tawny movement in the long grass turned out to be a lion pride resting in the shade, spotted a full minute before the professional guide's binoculars found it, and the whole vehicle chipped in a tip on the spot for the sharpest eyes of the trip.|Un destello de movimiento leonado entre la hierba alta resultó ser una manada de leones descansando a la sombra, avistada un minuto entero antes de que los prismáticos del guía profesional la encontraran, y todo el vehículo puso una propina en el acto por los ojos más agudos del viaje.|Un éclat de mouvement fauve dans les hautes herbes s'est révélé être une troupe de lions reposant à l'ombre, repérée une bonne minute avant que les jumelles du guide professionnel ne la trouvent, et tout le véhicule a cotisé un pourboire sur-le-champ pour les yeux les plus perçants du voyage.|長い草むらの中で黄褐色の動きがちらりと見えたのは、日陰で休むライオンの群れだった。プロのガイドが双眼鏡で見つけるより丸一分も早く見つけたことで、車に乗る全員がその場でチップを出し合い、この旅で一番鋭い目に報いた。",
  ),
  ev(
    "shortcut-guide-longway", "loss", ["eaf"], "🗺️", 220,
    "A 'shortcut' guide leads you the long way and charges extra|Un guía de 'atajo' te lleva por el camino largo y cobra de más|Un guide de « raccourci » vous fait prendre le chemin le plus long et facture un supplément|「近道」案内が実は遠回りで、しかも追加料金を取られる",
    "The path promised to shave an hour off the walk to the next station instead added one, looping past two curio stalls conveniently run by the guide's own relatives, and the final bill somehow included a charge for the shortcut itself.|El camino que prometía ahorrar una hora en el trayecto a la siguiente estación en realidad añadió una, pasando convenientemente por dos puestos de curiosidades regentados por parientes del guía, y la cuenta final de algún modo incluía un cargo por el propio atajo.|Le chemin promettant de gagner une heure sur la marche jusqu'à la prochaine gare en a plutôt ajouté une, passant commodément devant deux étals de souvenirs tenus par les parents mêmes du guide, et la facture finale incluait, allez savoir comment, des frais pour le raccourci lui-même.|次の駅までの道のりを一時間短縮すると言われた近道は、実際には一時間よけいにかかった。都合よくガイドの親戚が営む土産物店を二軒経由しており、最終的な請求書にはなぜか近道そのものの料金まで含まれていた。",
  ),

  // ---- saf: 南部アフリカ ----
  ev(
    "vineyard-harvest-bonus", "gain", ["saf"], "🍇", 240,
    "A day's harvest work in the Cape winelands pays a bonus|Un día de trabajo en la vendimia de los viñedos del Cabo paga un extra|Une journée de vendanges dans les vignobles du Cap rapporte une prime|ケープ・ワイン産地での一日の収穫作業がボーナスを生む",
    "The harvest crew was short by two pickers and the grapes could not wait for the usual hiring process, so a morning spent filling crates before the day's heat set in came with a bonus on top of the normal wage once the estate manager counted the full bins.|Al equipo de vendimia le faltaban dos recolectores y las uvas no podían esperar al proceso de contratación habitual, así que una mañana llenando cajas antes de que llegara el calor del día vino con un extra sobre el salario normal una vez que el gerente contó los cajones llenos.|L'équipe de vendange manquait de deux cueilleurs et le raisin ne pouvait attendre le processus d'embauche habituel, si bien qu'une matinée passée à remplir des cageots avant l'installation de la chaleur du jour a rapporté une prime en plus du salaire normal une fois que le régisseur a compté les caisses pleines.|収穫班は摘み手が二人足りず、ブドウはいつもの雇用手続きを待てる状態ではなかった。その日の暑さが本格化する前に木箱を積む午前中の作業を終えると、農園の管理人が満杯の木箱を数え終えたあと、通常の賃金にボーナスが上乗せされた。",
  ),
  ev(
    "cabletheft-rebooking", "loss", ["saf"], "🔌", 260,
    "A cancelled connection, after cable thieves strip the line, costs a rebooking fee|Una conexión cancelada, tras robar el cable ladrones, cuesta una tarifa de reprogramación|Une correspondance annulée, après le vol du câble par des voleurs, coûte des frais de réservation|架線の銅線が盗まれ運休した接続便で振替手数料がかかる",
    "The departure board simply blanked out the connecting service without explanation, and only the grumbling in the queue behind the counter revealed why: someone had stripped several hundred metres of copper wire off the overhead line overnight, and the replacement ticket did not come free.|El panel de salidas simplemente dejó en blanco el servicio de conexión sin explicación, y solo las quejas en la cola tras el mostrador revelaron por qué: alguien había arrancado varios cientos de metros de cable de cobre de la catenaria durante la noche, y el billete de sustitución no salió gratis.|Le tableau des départs a simplement effacé le service de correspondance sans explication, et seules les récriminations dans la file derrière le comptoir ont révélé pourquoi : quelqu'un avait arraché plusieurs centaines de mètres de câble de cuivre de la caténaire pendant la nuit, et le billet de remplacement n'était pas gratuit.|発車案内板は説明もなく接続便の表示を消していた。理由が分かったのは窓口の列で交わされる愚痴からだった。誰かが一夜のうちに架線の銅線を数百メートル分も引き剥がしていたのである。振替の切符はただでは発行されなかった。",
  ),
];
