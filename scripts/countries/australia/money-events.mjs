/**
 * オーストラリアの青マス・赤マスで起きる出来事(25件。増15・減10)。
 *
 * 地方コード: nsw / vic / qld / sa / wa / tas / nt(flavour.mjs の
 * AUSTRALIA_REGIONS と同じ)。
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、7地方それぞれに3件、その土地らしい仕事や失敗に結びつけて置いている。
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

export const AUSTRALIA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "op-shop-bargain", "gain", [], "👕", 220,
    "A bargain at the op shop|Una ganga en la tienda benéfica|Une bonne affaire à la friperie|チャリティショップの掘り出し物",
    "A jacket with a designer label had been mispriced at a few dollars, spotted only because the racks were sorted by colour rather than size that week. Op shops rotate stock so fast that regulars swear the trick is simply showing up often.|Una chaqueta con etiqueta de diseñador tenía un precio erróneo de apenas unos dólares, algo que solo se notó porque esa semana los percheros estaban ordenados por color y no por talla. Las tiendas benéficas rotan el género tan rápido que los habituales juran que el truco es simplemente pasar a menudo.|Une veste de marque avait été étiquetée par erreur à quelques dollars, repérée seulement parce que les portants étaient triés par couleur plutôt que par taille cette semaine-là. Les friperies renouvellent leur stock si vite que les habitués jurent que l'astuce est simplement d'y passer souvent.|デザイナーズブランドのジャケットが数ドルの値付けミスで並んでいた。その週たまたまサイズ別ではなく色別に陳列されていたおかげで見つけられた。チャリティショップは商品の入れ替わりが速く、常連は「とにかく頻繁に通うのがコツ」だと言う。",
  ),
  ev(
    "couch-cash", "gain", [], "🛋️", 150,
    "Loose change in a share-house couch|Calderilla en el sofá de la casa compartida|De la petite monnaie dans le canapé de la colocation|シェアハウスのソファの隙間に落ちていた小銭",
    "A previous tenant's coins had worked their way down between the cushions over what must have been years, and a Sunday spring clean turned them up all at once. Nobody in the house could agree on whose couch it technically was, so the finder kept the lot.|Las monedas de un inquilino anterior se habían colado entre los cojines durante lo que debieron de ser años, y una limpieza de primavera un domingo las sacó todas de golpe. En la casa nadie se ponía de acuerdo sobre de quién era técnicamente el sofá, así que quien las encontró se las quedó.|Les pièces d'un ancien locataire s'étaient glissées entre les coussins pendant ce qui devait être des années, et un grand ménage de printemps un dimanche les a toutes fait ressortir d'un coup. Dans la maison, personne ne s'accordait sur à qui appartenait vraiment le canapé.|前の住人が落とした小銭が、何年もかけてクッションの隙間に沈んでいったらしく、日曜の大掃除で一気に見つかった。このソファが厳密に誰のものかは家の誰も言い切れなかったので、見つけた人がそのまま懐にした。",
  ),
  ev(
    "cbd-parking-fine", "loss", [], "🅿️", 180,
    "A parking fine in the CBD|Una multa de aparcamiento en el centro|Une amende de stationnement dans le centre-ville|中心街での駐車違反",
    "The metered spot looked free for another twenty minutes, but a council parking officer's handheld scanner reads number plates faster than most people can read the fine print on the sign. The fine arrived by text before the errand it was for was even finished.|La plaza con parquímetro parecía libre otros veinte minutos, pero el escáner portátil del agente municipal lee las matrículas más rápido de lo que la mayoría lee la letra pequeña del cartel. La multa llegó por mensaje antes de terminar el recado.|La place avec parcmètre semblait libre encore vingt minutes, mais le scanner portable de l'agent municipal lit les plaques d'immatriculation plus vite que la plupart des gens ne lisent les petits caractères du panneau. L'amende est arrivée par texto avant même la fin de la course.|パーキングメーターの区画はあと20分は大丈夫に見えたが、市の駐車監視員が持つ携帯スキャナーは、標識の小さな文字を読むよりずっと速くナンバープレートを読み取る。用事が終わる前に罰金の通知がメッセージで届いた。",
  ),
  ev(
    "tip-run", "loss", [], "🗑️", 140,
    "A trip to the tip|Un viaje al vertedero|Un aller à la déchetterie|「ザ・ティップ」への持ち込み",
    "An old mattress and a broken bookshelf needed to go somewhere, and the local tip charges by the trailer-load regardless of how much actually fills it. The queue of utes waiting to weigh in on a Saturday morning was longer than expected.|Un colchón viejo y una estantería rota tenían que ir a alguna parte, y el vertedero local cobra por remolque cargado, sin importar cuánto se llene en realidad. La cola de camionetas esperando para pesar un sábado por la mañana era más larga de lo previsto.|Un vieux matelas et une bibliothèque cassée devaient bien aller quelque part, et la déchetterie locale facture à la remorque, peu importe combien elle est réellement remplie. La file de utilitaires attendant de peser un samedi matin était plus longue que prévu.|古いマットレスと壊れた本棚をどこかへ持ち込む必要があり、地元のゴミ処理場はトレーラー一杯分でいくら、という料金体系だった。土曜の朝、計量を待つピックアップトラックの列は思ったより長かった。",
  ),

  // ---- nsw ニューサウスウェールズ ----
  ev(
    "bondi-lifeguard-shift", "gain", ["nsw"], "🏊", 260,
    "Covering a lifeguard shift at Bondi|Cubriendo un turno de socorrista en Bondi|Assurer un service de sauveteur à Bondi|ボンダイ・ビーチで監視員の代わりを務める",
    "A rostered lifeguard called in sick on a day the surf report promised a strong rip, and covering the shift paid a loading on top of the usual rate for exactly that reason. Watching a beach this crowded for six hours straight is more tiring than it looks from the sand.|Un socorrista de turno avisó de que estaba enfermo un día en que el parte de surf anunciaba una fuerte resaca, y cubrir el turno pagó un plus justo por eso. Vigilar una playa tan concurrida durante seis horas seguidas cansa más de lo que parece desde la arena.|Un sauveteur de service s'est déclaré malade un jour où le bulletin de surf annonçait un fort courant de baïne, et assurer le service a payé une prime justement pour cette raison. Surveiller une plage aussi bondée pendant six heures d'affilée fatigue plus qu'il n'y paraît depuis le sable.|当番の監視員が、離岸流が強いと予報の出ていた日に病欠の連絡をしてきて、代わりに入るとまさにその理由で割増手当がついた。これほど混み合う浜辺を6時間見張り続けるのは、砂浜から見るより疲れる仕事である。",
  ),
  ev(
    "opera-house-usher", "gain", ["nsw"], "🎭", 200,
    "Ushering at the Opera House|Acomodando en la Ópera de Sídney|Placeur à l'Opéra de Sydney|オペラハウスの案内係を手伝う",
    "A casual usher was needed at short notice for a sold-out show, and the pay came with a spot to actually watch the second half once the doors were closed and latecomers turned away. The building's acoustics are apparently just as striking from the back row.|Se necesitaba un acomodador eventual con poca antelación para una función con entradas agotadas, y el pago incluyó un sitio para ver la segunda mitad una vez cerradas las puertas. Al parecer la acústica del edificio impresiona igual desde la última fila.|Un placeur occasionnel était nécessaire au dernier moment pour un spectacle complet, et la paie incluait une place pour voir la seconde partie une fois les portes fermées. L'acoustique du bâtiment est semble-t-il tout aussi impressionnante depuis la dernière rangée.|完売公演で急に案内係の人手が必要になり、給金には、扉が閉まって遅刻客を断ったあと後半を実際に観られる席がついてきた。あの建物の音響は最後列からでも変わらず見事らしい。",
  ),
  ev(
    "toll-road-surprise", "loss", ["nsw"], "🛣️", 210,
    "A surprise toll road bill|Una factura sorpresa de peajes|Une facture surprise d'autoroute à péage|知らずに通っていた有料道路の請求",
    "The GPS route avoided traffic but not the tolls, and Sydney's network of electronic toll roads bills the registered owner by post weeks later with an administration fee added for not having an account set up in advance. The fastest way across the harbour is rarely the cheapest.|La ruta del GPS evitó el tráfico pero no los peajes, y la red de peajes electrónicos de Sídney factura por correo semanas después al titular registrado, con un recargo administrativo por no tener cuenta previa. La vía más rápida para cruzar el puerto rara vez es la más barata.|L'itinéraire du GPS évitait les embouteillages mais pas les péages, et le réseau de péages électroniques de Sydney facture par courrier des semaines plus tard au titulaire immatriculé, avec des frais administratifs pour ne pas avoir de compte préalable. Le chemin le plus rapide pour traverser le port est rarement le moins cher.|カーナビは渋滞を避けてくれたが有料道路までは避けてくれなかった。シドニーの電子式有料道路網は、事前に口座を作っていないと手数料を上乗せして、何週間もあとに登録名義人へ郵送で請求してくる。港を渡るいちばん速い道が、いちばん安いとは限らない。",
  ),

  // ---- vic ヴィクトリア ----
  ev(
    "laneway-cafe-shift", "gain", ["vic"], "☕", 210,
    "A shift at a hidden laneway café|Un turno en un café escondido en un callejón|Un service dans un café caché d'une ruelle|路地裏の隠れ家カフェで働く",
    "The café down an unmarked Melbourne laneway had no sign at all, just a queue that regulars knew to look for, and the barista short a pair of hands on a Saturday paid cash for the morning rush. Finding the place again afterward proved harder than the shift itself.|El café al fondo de un callejón de Melbourne sin ningún cartel solo tenía una cola que los habituales sabían buscar, y el barista, corto de manos un sábado, pagó en efectivo por la hora punta de la mañana. Volver a encontrar el sitio después resultó más difícil que el propio turno.|Le café au fond d'une ruelle de Melbourne n'avait aucune enseigne, juste une file que les habitués savaient repérer, et le barista, à court de bras un samedi, a payé en espèces pour le coup de feu du matin. Retrouver l'endroit ensuite s'est révélé plus difficile que le service lui-même.|看板もないメルボルンの路地裏のカフェは、常連だけが知る行列が目印だった。土曜の朝の混雑で人手が足りないバリスタが現金払いで助けを求めてきた。あとでもう一度その店を見つけるほうが、働くことより難しかった。",
  ),
  ev(
    "grand-final-scalper", "loss", ["vic"], "🎟️", 260,
    "Paying a scalper for a Grand Final ticket|Pagando a un revendedor por una entrada de la final|Payer un revendeur pour un billet de la finale|グランドファイナルのチケットを転売屋から買う",
    "Official tickets sold out within minutes, and a stranger outside the ground was suddenly willing to help for several times face value. The seat turned out to be real, high in the stands, with a view good enough to make the markup sting a little less by full time.|Las entradas oficiales se agotaron en minutos, y un desconocido junto al estadio de repente se ofreció a ayudar por varias veces el precio original. El asiento resultó real, en lo alto de la grada, con una vista lo bastante buena como para que el sobreprecio doliera algo menos al final del partido.|Les billets officiels se sont écoulés en quelques minutes, et un inconnu près du stade a soudain proposé son aide pour plusieurs fois le prix normal. La place s'est révélée réelle, tout en haut des gradins, avec une vue assez bonne pour que la majoration pique un peu moins à la fin du match.|公式チケットは数分で完売し、スタジアムの外にいた見知らぬ人物が、正規価格の何倍もの値段で急に力になってくれた。席は本物で、スタンドの高い位置ではあったが、終了までには割高感が少し和らぐくらいの眺めではあった。",
  ),
  ev(
    "myki-fine", "loss", ["vic"], "🚊", 190,
    "Caught without a valid tram fare|Pillado sin billete válido de tranvía|Pris sans titre de transport valide dans le tram|トラムの運賃未払いで見つかる",
    "The card reader was out of order at the stop, and boarding anyway without tapping on seemed reasonable until an inspector got on two stops later asking to see everyone's fare. \"The machine was broken\" is apparently the single most common excuse they hear.|El lector de tarjetas estaba averiado en la parada, y subir igualmente sin marcar pareció razonable hasta que un inspector se subió dos paradas después pidiendo ver el billete de todos. «La máquina estaba rota» es, al parecer, la excusa más común que oyen.|Le lecteur de carte était en panne à l'arrêt, et monter quand même sans valider a semblé raisonnable jusqu'à ce qu'un contrôleur monte deux arrêts plus loin pour vérifier les titres de transport. « La machine était en panne » est semble-t-il l'excuse la plus entendue.|停留所のカードリーダーが故障していたので、タッチせずに乗るのは仕方ないと思っていたが、2つ先の停留所で検札員が乗り込んできて全員の運賃を確認された。「機械が壊れていた」は検札員がいちばんよく聞く言い訳だという。",
  ),

  // ---- qld クイーンズランド ----
  ev(
    "reef-boat-deckhand", "gain", ["qld"], "⛵", 240,
    "A day as deckhand on a reef tour boat|Un día de marinero en un barco turístico del arrecife|Une journée comme matelot sur un bateau d'excursion au récif|リーフ観光船の甲板員を1日手伝う",
    "The regular deckhand missed the early boat, and hosing down snorkel gear between trips paid a flat day rate plus whatever tips the tourists left on the way off. Being out past the boats moored closer to shore made the water noticeably clearer.|El marinero habitual perdió el barco de la mañana, y lavar el equipo de esnórquel entre viajes pagó una tarifa fija por día más las propinas que dejaban los turistas al bajar. Estar más allá de los barcos amarrados cerca de la costa hacía el agua notablemente más clara.|Le matelot habituel a raté le bateau du matin, et rincer le matériel de snorkeling entre les sorties a payé un forfait journalier plus les pourboires laissés par les touristes en descendant. Être au-delà des bateaux amarrés près du rivage rendait l'eau nettement plus claire.|いつもの甲板員が朝一番の便に乗り遅れ、便と便の合間にシュノーケル用具を洗う仕事で日当プラス観光客が下船時に置いていくチップが入った。岸近くに停泊する船より沖に出ると、水の透明度がはっきり違った。",
  ),
  ev(
    "cane-harvest-casual", "gain", ["qld"], "🌾", 230,
    "Casual work during the cane harvest|Trabajo eventual en la zafra de caña|Travail saisonnier pendant la récolte de canne|サトウキビの収穫期に日雇いで働く",
    "Harvest season needed extra hands checking the cane trains and clearing debris from crossings, work that only exists for a few intense weeks each year. The pay reflected the odd hours as much as the work itself, with some shifts starting well before dawn.|La temporada de zafra necesitaba manos extra revisando los trenes cañeros y despejando escombros de los cruces, un trabajo que solo existe unas semanas intensas al año. La paga reflejaba los horarios raros tanto como el trabajo en sí, con turnos que a veces empezaban bien antes del amanecer.|La saison de récolte avait besoin de bras supplémentaires pour surveiller les trains à canne et dégager les débris aux passages, un travail qui n'existe que quelques semaines intenses chaque année. La paie reflétait les horaires étranges autant que le travail lui-même.|収穫期には、サトウキビ列車の点検や踏切のがれき除去に人手が要り、それは一年のうちほんの数週間だけ存在する仕事だった。給金は仕事の内容以上に、夜明け前から始まる変則的な時間帯を反映していた。",
    [7, 8],
  ),
  ev(
    "cyclone-shutters", "loss", ["qld"], "🌀", 220,
    "Paying to have cyclone shutters put up|Pagando por instalar postigos anticiclónicos|Payer pour faire installer des volets anticycloniques|サイクロンに備えて雨戸を取り付ける",
    "The forecast track shifted close enough overnight that every handyman in town suddenly had a two-day waiting list, and getting the shutters up before the wind arrived meant paying whatever the going rate was that week. Better that than boarding up windows in the dark with the power already out.|La trayectoria prevista se acercó lo bastante de la noche a la mañana como para que todos los manitas del pueblo tuvieran de golpe dos días de espera, y colocar los postigos antes de que llegara el viento significó pagar la tarifa que hubiera esa semana.|La trajectoire prévue s'est rapprochée assez du jour au lendemain pour que tous les bricoleurs de la ville aient soudain deux jours d'attente, et poser les volets avant l'arrivée du vent a signifié payer le tarif en vigueur cette semaine-là.|予報の進路が一夜で近づき、町じゅうの何でも屋がいっせいに2日待ちになった。風が来る前に雨戸を取り付けるには、その週の言い値を払うしかなかった。停電した暗闇の中で板を打ち付けるよりはましである。",
    [8, 9],
  ),

  // ---- wa 西オーストラリア ----
  ev(
    "fifo-extra-shift", "gain", ["wa"], "⛏️", 300,
    "An extra shift at the mine|Un turno extra en la mina|Un service supplémentaire à la mine|鉱山で余分なシフトに入る",
    "A fly-in-fly-out roster had a gap when a co-worker's flight was cancelled, and picking up the extra shift meant another day in the Pilbara heat but a rate that made the swap worth it. The mess hall food is apparently the one thing nobody on site complains about.|Un turno de trabajadores FIFO (que vuelan para trabajar) tenía un hueco cuando se canceló el vuelo de un compañero, y cubrir el turno extra significó otro día de calor en Pilbara pero a una tarifa que hizo que mereciera la pena.|Un roster FIFO (vol aller-retour pour le travail) avait un trou quand le vol d'un collègue fut annulé, et prendre le service supplémentaire a signifié une journée de plus dans la chaleur du Pilbara, mais à un tarif qui valait l'échange.|同僚の便が欠航して空いたFIFO(飛行機通勤)勤務のシフトに入ると、ピルバラの暑さにもう一日耐える羽目になったが、その分の手当は割に合うものだった。現場の食堂の食事だけは、誰も文句を言わないという。",
  ),
  ev(
    "pearl-sorting-shift", "gain", ["wa"], "🦪", 190,
    "Sorting pearls for a Broome dealer|Clasificando perlas para un comerciante de Broome|Trier des perles pour un négociant de Broome|ブルームの真珠商のもとで真珠を選別する",
    "A pearl dealer needed careful hands to sort a fresh harvest by size, shape and lustre under bright lamps, work that pays by the hour but demands total concentration for every one of them. Telling a good pearl from a merely decent one turned out to take longer to learn than expected.|Un comerciante de perlas necesitaba manos cuidadosas para clasificar una cosecha reciente por tamaño, forma y brillo bajo lámparas potentes, un trabajo que se paga por hora pero exige concentración total en cada una.|Un négociant en perles avait besoin de mains soigneuses pour trier une récolte fraîche par taille, forme et lustre sous des lampes puissantes, un travail payé à l'heure mais exigeant une concentration totale sur chacune d'elles.|真珠商が、明るいランプの下で採れたての真珠を大きさ・形・光沢ごとに選り分ける丁寧な手を求めていた。時給制だが一粒ごとに全神経を集中させる必要がある仕事で、良い真珠とまずまずの真珠を見分けられるようになるには思ったより時間がかかった。",
  ),
  ev(
    "outback-fuel-shock", "loss", ["wa"], "⛽", 200,
    "A fuel price shock in the outback|Un susto en el precio del combustible en el outback|Un choc du prix du carburant dans l'outback|奥地でのガソリン価格に驚く",
    "The last servo was hours back and the next one was hours ahead, and the one roadhouse in between knew exactly how little choice that left its customers. Filling the tank cost noticeably more than it would have anywhere near a city, and there was nothing to do but pay it.|La última gasolinera quedaba horas atrás y la siguiente horas por delante, y el único área de servicio intermedia sabía exactamente cuán poca elección eso dejaba a sus clientes. Llenar el depósito costó notablemente más que cerca de cualquier ciudad.|Le dernier servo était à des heures derrière et le prochain à des heures devant, et l'unique relais routier entre les deux savait exactement combien peu de choix cela laissait à ses clients. Faire le plein a coûté nettement plus que près d'une ville.|最後のサーヴォから何時間も走り、次のサーヴォまでもまだ何時間もある。その中間にただ一軒あるロードハウスは、客にほとんど選択肢がないことを承知していた。給油の値段は都市部よりはっきり高く、払う以外に手はなかった。",
  ),

  // ---- sa 南オーストラリア ----
  ev(
    "vintage-grape-picking", "gain", ["sa"], "🍇", 220,
    "Grape picking during the Barossa vintage|Vendimiando durante la cosecha de Barossa|Vendanges pendant le vintage de Barossa|バロッサのブドウ収穫期に摘み取りを手伝う",
    "The vintage — as the wine harvest is known here — needed extra pickers for a rush before an approaching heatwave, and a full day bent over the vines paid a rate that reflected exactly how little anyone wanted the job in the midday sun.|La vendimia —como se conoce aquí la cosecha de la uva— necesitaba recolectores extra antes de una ola de calor, y un día entero agachado entre las vides pagó una tarifa que reflejaba exactamente lo poco que nadie quería ese trabajo al sol de mediodía.|Le vintage — comme on appelle ici la vendange — avait besoin de cueilleurs supplémentaires avant une vague de chaleur, et une journée entière penché sur les vignes a payé un tarif reflétant exactement à quel point personne ne voulait ce travail en plein soleil de midi.|ここで「ヴィンテージ」と呼ばれるブドウの収穫期は、迫る熱波の前に人手を急募していた。一日じゅうブドウの木にかがみ込む仕事の手当は、真昼の日差しの下でこの仕事を誰もやりたがらないことをそのまま表す額だった。",
    [5, 6],
  ),
  ev(
    "fringe-busking", "gain", ["sa"], "🎷", 180,
    "Busking during the Adelaide Fringe|Tocando en la calle durante el Adelaide Fringe|Faire la manche pendant l'Adelaide Fringe|アデレード・フリンジで大道芸をする",
    "The footpaths were thick with festival crowds moving between venues, and a decent pitch outside a popular late-night bar earned more in coins over two hours than a normal shift elsewhere in town. Timing a set to catch the interval crowds spilling out took some trial and error.|Las aceras estaban repletas de público del festival moviéndose entre locales, y un buen sitio frente a un bar nocturno popular ganó más en monedas en dos horas que un turno normal en cualquier otra parte de la ciudad.|Les trottoirs grouillaient de festivaliers passant d'un lieu à l'autre, et un bon emplacement devant un bar nocturne populaire a rapporté plus en pièces en deux heures qu'un service normal ailleurs en ville.|歩道は会場から会場へ移動する観客でいっぱいで、人気の深夜バーの前の良い場所を確保できると、2時間で町の他のふつうの仕事の一勤務分より多くの小銭が集まった。休憩時間に外へあふれ出す客に合わせて演奏を組むには、多少の試行錯誤が要った。",
    [10],
  ),
  ev(
    "fossicking-permit-bust", "loss", ["sa"], "⛏️", 170,
    "An opal fossicking permit that didn't pay off|Un permiso de búsqueda de ópalo que no compensó|Un permis de recherche d'opale qui n'a rien rapporté|オパール採掘の許可証代が回収できない",
    "A day permit to fossick on the noodling dumps outside Coober Pedy cost a flat fee regardless of what came out of the ground, and a full afternoon of sifting through mullock turned up nothing worth keeping. Most days end exactly like this one did.|Un permiso diurno para buscar en las escombreras de Coober Pedy costaba una tarifa fija sin importar lo que saliera de la tierra, y una tarde entera cribando escombros no dio nada que mereciera la pena guardar. La mayoría de los días terminan justo así.|Un permis journalier pour fouiller les terrils de Coober Pedy coûtait un tarif fixe, peu importe ce qui sortait du sol, et un après-midi entier à tamiser des gravats n'a rien donné qui vaille la peine d'être gardé. La plupart des journées se terminent exactement ainsi.|クーバー・ペディ郊外の採掘くず山を探せる一日許可証は、何が出ようと出まいと定額料金だった。丸一日ずるずると土をふるいにかけても、残しておく価値のあるものは何も出てこなかった。たいていの日はまさにこうして終わる。",
  ),

  // ---- tas タスマニア ----
  ev(
    "apple-isle-harvest", "gain", ["tas"], "🍎", 210,
    "Apple picking on the old Apple Isle|Recogiendo manzanas en la vieja Isla de la Manzana|Cueillette de pommes sur la vieille île aux pommes|昔ながらの「リンゴの島」でリンゴ狩りを手伝う",
    "Tasmania once exported so much fruit to Britain that it earned the nickname \"the Apple Isle\", and a small surviving orchard still needed extra hands for a few weeks each autumn to keep up with a harvest that does not wait for anyone.|Tasmania exportó en su día tanta fruta a Gran Bretaña que ganó el apodo de «la Isla de la Manzana», y un pequeño huerto que aún sobrevive necesitó manos extra unas semanas cada otoño para no quedarse atrás con una cosecha que no espera a nadie.|La Tasmanie exportait jadis tant de fruits vers la Grande-Bretagne qu'elle gagna le surnom d'« île aux pommes », et un petit verger encore en activité avait besoin de bras supplémentaires quelques semaines chaque automne pour suivre une récolte qui n'attend personne.|タスマニアはかつて英国へ大量の果物を輸出し、「リンゴの島」と呼ばれた。いまも残る小さな果樹園は、誰も待ってくれない収穫に追いつくため、毎年秋の数週間だけ余分な人手を必要とする。",
    [7, 8],
  ),
  ev(
    "salmon-farm-shift", "gain", ["tas"], "🐟", 230,
    "A shift on a salmon farm pontoon|Un turno en el pontón de una piscifactoría de salmón|Un service sur le ponton d'une ferme salmonicole|サーモン養殖場の浮桟橋で働く",
    "The pens moored in a sheltered channel needed an extra pair of hands checking nets before a forecast swell arrived, work that paid well precisely because most people would rather not be on cold, moving water before sunrise.|Las jaulas fondeadas en un canal resguardado necesitaban un par de manos extra revisando redes antes de que llegara un oleaje previsto, un trabajo bien pagado justamente porque la mayoría prefiere no estar sobre agua fría y en movimiento antes del amanecer.|Les cages amarrées dans un chenal abrité avaient besoin d'une paire de mains de plus pour vérifier les filets avant l'arrivée d'une houle annoncée, un travail bien payé justement parce que peu de gens aiment être sur une eau froide et mouvante avant le lever du soleil.|入り江の生簀は、予報された高波が来る前に網を点検する追加の人手を求めていた。日の出前の冷たく揺れる水の上に立ちたがる人は少ないからこそ、実入りの良い仕事だった。",
  ),
  ev(
    "dark-mofo-ticket", "loss", ["tas"], "🔥", 200,
    "A last-minute Dark Mofo ticket|Una entrada de última hora para Dark Mofo|Un billet de dernière minute pour Dark Mofo|直前に買ったダーク・モフォのチケット",
    "The winter festival's most talked-about installation sold out weeks in advance, and a last-minute release of a handful of tickets went at a price that assumed exactly how desperate late buyers would be. It was, by most accounts, worth every cent.|La instalación más comentada del festival de invierno se agotó con semanas de antelación, y una liberación de última hora de un puñado de entradas se vendió a un precio que asumía justo lo desesperados que estarían los compradores tardíos.|L'installation la plus commentée du festival d'hiver s'est vendue des semaines à l'avance, et une poignée de billets libérés au dernier moment est partie à un prix qui présumait exactement à quel point les acheteurs tardifs seraient désespérés.|冬祭りでいちばん話題になった展示は何週間も前に売り切れており、直前に少数だけ放出されたチケットは、遅れて買う客がどれほど必死かを見越した値段だった。それでも大方の評判どおり、払っただけの値打ちはあった。",
    [8, 9],
  ),

  // ---- nt ノーザンテリトリー ----
  ev(
    "barra-charter-tip", "gain", ["nt"], "🎣", 240,
    "A big tip on a barramundi charter|Una gran propina en un chárter de pesca de barramundi|Un gros pourboire sur une sortie de pêche au barramundi|バラマンディ釣りチャーター船で大きなチップをもらう",
    "A visiting angler landed the barramundi of a lifetime on the last cast of the day, and the deckhand who netted it and steadied the boat for the photo came away with a tip well beyond the usual. Barra season draws people back year after year chasing exactly that moment.|Un pescador visitante logró el barramundi de su vida en el último lance del día, y el marinero que lo sacó con la red y sostuvo el barco para la foto se llevó una propina muy por encima de lo habitual.|Un pêcheur de passage a attrapé le barramundi de sa vie au dernier lancer de la journée, et le matelot qui l'a épuisé au filet et stabilisé le bateau pour la photo est reparti avec un pourboire bien au-delà de l'habituel.|訪れた釣り客がその日最後の一投でバラマンディの大物を釣り上げ、それを網で取り込んで写真のために船を安定させた甲板員は、いつもよりずっと多いチップをもらった。バラ(バラマンディ)シーズンは、まさにその瞬間を追って毎年人を呼び戻す。",
    [4, 5, 6],
  ),
  ev(
    "croc-spotting-guide", "gain", ["nt"], "🐊", 250,
    "Guiding a crocodile-spotting river cruise|Guiando un crucero fluvial de avistamiento de cocodrilos|Guider une croisière fluviale d'observation des crocodiles|川でのワニ観察クルーズを案内する",
    "A regular guide was down with the flu, and pointing out a wild saltwater crocodile sunning on the bank for a boatload of visitors turned out to pay well for what amounted to knowing exactly where to look. The crocodile, unbothered, barely moved the entire trip.|Un guía habitual estaba con gripe, y señalar un cocodrilo de agua salada salvaje tomando el sol en la orilla para un barco lleno de visitantes resultó pagar bien por saber exactamente dónde mirar. El cocodrilo, impertérrito, apenas se movió en todo el trayecto.|Un guide habituel était grippé, et montrer un crocodile marin sauvage se prélassant sur la berge à un bateau plein de visiteurs a fini par bien payer pour ce qui revenait juste à savoir où regarder. Le crocodile, imperturbable, a à peine bougé de tout le trajet.|いつもの案内係がインフルエンザで倒れ、船いっぱいの観光客に岸で日向ぼっこする野生のイリエワニを指し示す仕事は、結局のところ「どこを見ればいいか知っているだけ」で存外な稼ぎになった。ワニのほうは意に介さず、道中ほとんど動かなかった。",
  ),
  ev(
    "wet-season-flight-delay", "loss", ["nt"], "🌧️", 210,
    "A wet-season flight cancellation|Un vuelo cancelado en la temporada de lluvias|Une annulation de vol en saison des pluies|雨季のフライトが欠航する",
    "A monsoon cell parked itself directly over the airport for most of the afternoon, and the rebooked flight the next day came with an unplanned night in a hotel that filled up fast with everyone else in the same situation. Wet season travel plans here always come with a backup plan.|Una célula monzónica se plantó justo sobre el aeropuerto casi toda la tarde, y el vuelo reprogramado al día siguiente vino con una noche de hotel no planeada que se llenó rápido con todos los demás en la misma situación.|Une cellule de mousson s'est plantée juste au-dessus de l'aéroport presque tout l'après-midi, et le vol reprogrammé le lendemain s'est accompagné d'une nuit d'hôtel imprévue, vite complet avec tous les autres dans la même situation.|モンスーンの雨雲が午後じゅう空港の真上に居座り、翌日に振り替えられた便には、同じ境遇の人たちですぐ満室になったホテルでの予定外の一泊がついてきた。この土地の雨季の旅程には、いつも予備の計画が要る。",
    [9, 10, 11],
  ),
];
