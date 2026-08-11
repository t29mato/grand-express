/**
 * 韓国の青マス・赤マスで起きる出来事(19件。増10・減9)。
 *
 * 地方コード: gg=京畿 / gw=江原 / cc=忠清 / jl=全羅 / gs=慶尚 / jj=済州
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、6地方それぞれに2〜3件、季節や祭りに結びつけて置いている。
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

export const KOREA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "taebae-sanghacha", "gain", [], "📦", 220,
    "A day loading delivery trucks|Un día cargando camiones de reparto|Une journée à charger des camions de livraison|宅配の積み下ろしのアルバイト",
    "The dispatch centre needed extra hands before dawn and paid in cash at the end of the shift, no questions asked about a weekday free. Next-day delivery from the big online retailers depends on exactly this kind of one-day hire at sorting centres across the country.|El centro de despacho necesitaba manos extra antes del alba y pagó en efectivo al final del turno, sin preguntas sobre por qué estabas libre un día laborable. La entrega al día siguiente de las grandes tiendas en línea depende de este tipo de contratación diaria en los centros de clasificación de todo el país.|Le centre de tri avait besoin de bras avant l'aube et paya en espèces à la fin du service, sans question sur cette journée de semaine libre. La livraison le lendemain chez les grands sites marchands repose justement sur ce genre d'embauche à la journée dans les centres de tri du pays entier.|配送センターが夜明け前に人手を求めていて、勤務明けに現金で払われた。平日なのになぜ暇なのかは聞かれなかった。大手通販の翌日配達は、まさにこうした全国の仕分けセンターでの日雇いに支えられている。",
  ),
  ev(
    "yagan-alba", "gain", [], "🌙", 200,
    "Covering an overnight convenience store shift|Cubriendo un turno nocturno en una tienda de conveniencia|Assurer un service de nuit en supérette|コンビニの夜勤を代わる",
    "The regular clerk called in sick an hour before opening, and covering until sunrise paid a night premium on top of the usual hourly rate. With one convenience store for roughly every few hundred people, someone is always short a pair of hands for the graveyard shift.|El empleado habitual avisó de que estaba enfermo una hora antes de abrir, y cubrir hasta el amanecer pagó un plus nocturno sobre la tarifa habitual. Con una tienda de conveniencia por cada pocos cientos de personas, siempre falta alguien para el turno de noche.|L'employé habituel s'est déclaré malade une heure avant l'ouverture, et assurer jusqu'à l'aube a valu une prime de nuit en plus du tarif horaire habituel. Avec une supérette pour quelques centaines d'habitants, il manque toujours des bras pour le service de nuit.|いつもの店員が開店の一時間前に急病だと連絡してきた。夜明けまで代わると、通常の時給に夜間手当が上乗せされた。数百人に一軒はあるコンビニでは、いつも深夜の人手が足りない。",
  ),
  ev(
    "gostop-loss", "loss", [], "🎴", 190,
    "Losing badly at go-stop|Perdiendo feo al go-stop|Une lourde défaite au go-stop|花札の勝負に負ける",
    "The flower cards kept going to everyone else, and by the last round the stakes had crept up well past what seemed reasonable when the game started. Go-stop gets played everywhere from holiday gatherings to long train rides, and the scoring is complicated enough that newcomers rarely walk away ahead.|Las cartas de flores no dejaban de ir a parar a los demás, y para la última ronda la apuesta había subido mucho más de lo razonable al empezar. Al go-stop se juega en todas partes, de las reuniones festivas a los trayectos largos en tren, y la puntuación es tan complicada que los novatos rara vez salen ganando.|Les cartes aux fleurs allaient sans cesse aux autres, et à la dernière manche, la mise avait grimpé bien au-delà du raisonnable. On joue au go-stop partout, des réunions de fête aux longs trajets en train, et le calcul des points est assez compliqué pour que les débutants en ressortent rarement gagnants.|花札はどうしても他の皆に流れていき、最後の局には最初は妥当に思えた賭け金がずいぶん膨らんでいた。花札(ゴーストップ)は祝いの席から長距離列車の中まで至る所で打たれるが、点の数え方が込み入っていて、初心者が勝ち逃げすることはまずない。",
  ),
  ev(
    "juchawi-ticket", "loss", [], "🅿️", 150,
    "A parking fine in an unfamiliar town|Una multa de aparcamiento en un pueblo desconocido|Une amende de stationnement dans une ville inconnue|知らない町での駐車違反",
    "The sign at the kerb was easy to miss without knowing the street, and the fine arrived by text message before the visit was even over. Enforcement is mostly done by camera now, so there is no attendant left to argue with.|La señal del bordillo era fácil de pasar por alto sin conocer la calle, y la multa llegó por mensaje de texto antes de que terminara la visita. Ahora el control se hace sobre todo por cámara, así que ya no hay con quién discutir.|Le panneau au bord du trottoir était facile à manquer sans connaître la rue, et l'amende est arrivée par texto avant même la fin de la visite. Le contrôle se fait surtout par caméra désormais, il n'y a plus personne avec qui discuter.|その通りに不案内だと見落としやすい標識で、訪問が終わらないうちに罰金の通知がメッセージで届いた。取り締まりはいまや大半がカメラによるもので、文句を言う相手の係員さえいない。",
  ),

  // ---- gg 京畿 ----
  ev(
    "goyang-flower-expo", "gain", ["gg"], "🌷", 240,
    "Working the flower expo gate|Trabajando en la entrada de la expo floral|Travailler à l'entrée de l'expo florale|花博の受付を手伝う",
    "Ilsan's Lake Park needed extra hands checking tickets and handing out programmes for the spring flower festival, and the pay came with a free pass back on a day off. The beds are replanted from scratch every year, so the smell of fresh soil clings to the uniform by evening.|El parque lacustre de Ilsan necesitaba manos extra para revisar entradas y repartir programas en el festival floral de primavera, y el pago incluyó un pase gratis para volver en un día libre. Los parterres se replantan desde cero cada año.|Le parc lacustre d'Ilsan avait besoin de bras pour vérifier les billets et distribuer les programmes du festival floral de printemps, et la paie incluait un laissez-passer pour revenir un jour de congé. Les massifs sont replantés à neuf chaque année.|一山湖水公園が春の花祭りで、入場券の確認とプログラム配りの人手を求めていた。給金には休みの日にまた入れる無料パスが付いてきた。花壇は毎年一から植え替えられるので、夕方には制服に土の匂いが染みついていた。",
    [1],
  ),
  ev(
    "panmunjeom-bus", "loss", ["gg"], "🚌", 230,
    "Missing the bus back from the DMZ|Perdiendo el autobús de vuelta de la DMZ|Rater le bus du retour de la DMZ|板門店見学のバスに乗り遅れる",
    "Tour groups to the truce village leave on a strict schedule set by the military escort, and wandering off for one more photograph meant a taxi back to Seoul at a price that had nothing to do with the metre. Nobody argues with the schedule twice.|Los grupos turísticos a la aldea de la tregua salen con un horario estricto fijado por la escolta militar, y quedarse rezagado por una foto más significó un taxi de vuelta a Seúl a un precio que nada tenía que ver con el taxímetro.|Les groupes en visite au village de la trêve partent selon un horaire strict fixé par l'escorte militaire, et s'attarder pour une photo de plus a valu un taxi retour vers Séoul à un prix n'ayant plus rien à voir avec le compteur.|休戦村への見学団は軍の護衛が定めた厳格な時刻表どおりに出発する。もう一枚写真をと足を止めたばかりに、メーターとは関係のない値段のタクシーでソウルへ戻る羽目になった。この時刻表に二度逆らう者はいない。",
  ),
  ev(
    "icheon-ceramics-fair", "gain", ["gg"], "🏺", 220,
    "Minding a stall at the ceramics fair|Atendiendo un puesto en la feria de cerámica|Tenir un étal à la foire de céramique|陶磁器まつりの露店を手伝う",
    "A potter's family needed an extra pair of hands wrapping bowls in newspaper while they threw more on the wheel for the crowd, and the day ended with a cracked second the family let go for nothing. Icheon holds its biennale every other autumn, but a smaller fair fills the years between.|Una familia de alfareros necesitaba manos extra envolviendo cuencos en papel de periódico mientras seguían tornando más para la multitud, y el día terminó con una pieza agrietada que la familia regaló. Icheon celebra su bienal cada dos otoños, pero una feria menor llena los años intermedios.|Une famille de potiers avait besoin de bras pour emballer des bols dans du papier journal pendant qu'elle en tournait d'autres pour la foule, et la journée s'est achevée avec une pièce fêlée offerte par la famille. Icheon tient sa biennale un automne sur deux, mais une foire plus modeste comble les années creuses.|陶工の一家が、轆轤で器を挽き続けるあいだ、椀を新聞紙で包む手を求めていた。一日の終わりには、ひびの入った二級品を只でもらった。利川のビエンナーレは隔年の秋だが、その合間の年は小さな陶器市が埋めている。",
    [6, 7],
  ),

  // ---- gw 江原 ----
  ev(
    "pyeongchang-lift-job", "gain", ["gw"], "⛷️", 260,
    "Running the lift on the beginner slope|Manejando el telesilla de la pista de principiantes|Faire fonctionner le télésiège de la piste débutants|初心者コースのリフト係",
    "The resort hires by the season for lift operators, and a scarf-wrapped shift in the cold pays better than the same hours would indoors. The grounds were used for skiing well before the Olympics ever came here, so nobody treats snow season as anything new.|El complejo contrata por temporada a operadores de telesilla, y un turno abrigado en el frío paga mejor que las mismas horas bajo techo. Las pistas se usaban para esquiar mucho antes de que llegaran aquí los Juegos Olímpicos.|La station embauche des opérateurs de télésiège à la saison, et un service emmitouflé dans le froid paie mieux que les mêmes heures à l'intérieur. Les pistes servaient au ski bien avant que les Jeux olympiques n'arrivent ici.|リゾートはリフト係を季節雇いで募集しており、マフラーを巻いての寒い勤務は屋内の同じ時間より実入りがよい。この一帯は五輪が来るよりずっと前からスキー場として使われていたので、誰も雪の季節を目新しいものとは思わない。",
    [8, 9],
  ),
  ev(
    "gangneung-cafe-wallet", "loss", ["gw"], "☕", 180,
    "A wallet left on a coffee shop counter|Una billetera olvidada en el mostrador de una cafetería|Un portefeuille oublié au comptoir d'un café|海辺のカフェに財布を忘れる",
    "The queue for a window seat overlooking the beach was long enough to be distracting, and the wallet sat on the counter through two more customers before anyone noticed. With more roasteries here than seems possible for a city this size, there was no shortage of places it could have happened.|La cola por un sitio junto a la ventana con vista a la playa era lo bastante larga como para distraer, y la billetera quedó en el mostrador dos clientes más antes de que alguien se diera cuenta. Con más tostadurías de las que parecen posibles para una ciudad así, no faltaban sitios donde pudo pasar.|La file pour une place en vitrine avec vue sur la plage était assez longue pour distraire, et le portefeuille est resté au comptoir le temps de deux clients de plus avant que quiconque ne s'en aperçoive. Avec plus de torréfactions qu'il ne semble possible pour une ville de cette taille, les occasions ne manquaient pas.|海の見える窓際の席を待つ列に気を取られているうちに、財布はカウンターに置いたまま客が二人分過ぎても誰も気づかなかった。この町の大きさにしては信じがたいほど焙煎店が多く、起こりうる場所には事欠かなかった。",
  ),

  // ---- cc 忠清 ----
  ev(
    "daejeon-science-trial", "gain", ["cc"], "🔬", 230,
    "Paid to sit through a lab experiment|Pagado por aguantar un experimento de laboratorio|Payé pour se prêter à une expérience de labo|実験に付き合って謝礼をもらう",
    "A noticeboard outside a research institute offered a fee for two hours of answering questions in a testing booth, with no real explanation of what was being measured. Daejeon's science town has enough laboratories that this kind of odd, well-paid errand turns up often enough to count on.|Un tablón junto a un instituto de investigación ofrecía una paga por dos horas respondiendo preguntas en una cabina de pruebas, sin explicar bien qué se medía. La ciudad científica de Daejeon tiene laboratorios de sobra para que este tipo de encargo raro y bien pagado aparezca a menudo.|Un panneau devant un institut de recherche offrait une rémunération pour deux heures à répondre à des questions dans une cabine d'essai, sans grande explication sur ce qui était mesuré. La ville scientifique de Daejeon compte assez de laboratoires pour que ce genre de mission étrange et bien payée revienne souvent.|研究所の掲示板に、検査ブースで二時間質問に答えるだけの謝礼付き募集が貼ってあった。何を測っているのかはっきりした説明はなかった。大田の科学都市には研究機関が多く、こうした奇妙だが実入りのよい仕事は頼りにできるほどよくある。",
  ),
  ev(
    "boryeong-mud-camera", "loss", ["cc"], "📷", 200,
    "A camera goes into the mud|Una cámara termina en el lodo|Un appareil photo finit dans la vase|マッド祭りでカメラが泥をかぶる",
    "One handshake from a stranger covered in Daecheon Beach's mineral mud was enough to end a phone's working life for the day, and the festival warns about exactly this every year without anyone quite believing it until it happens to them. A dry bag would have cost far less than the replacement did.|Un apretón de manos de un desconocido cubierto del lodo mineral de la playa Daecheon bastó para acabar con el funcionamiento del teléfono por ese día, y el festival avisa de esto mismo cada año sin que nadie se lo crea del todo hasta que le pasa.|Une poignée de main d'un inconnu couvert de la vase minérale de la plage de Daecheon a suffi à mettre un téléphone hors service pour la journée, et le festival prévient de cela chaque année sans que personne n'y croie vraiment avant que ça n'arrive.|大川海水浴場の鉱物泥にまみれた見知らぬ人と握手しただけで、その日の電話はもう使い物にならなくなった。祭りは毎年まさにこれを警告しているのに、自分の身に起きるまで誰も本気にしない。防水ケース代のほうがよほど安かった。",
    [3, 4],
  ),
  ev(
    "sejong-loop-lost", "loss", ["cc"], "🔄", 170,
    "Lost inside Sejong's ring-shaped complex|Perdido en el complejo circular de Sejong|Perdu dans le complexe circulaire de Sejong|世宗の円形庁舎で道に迷う",
    "The government complex was built as one continuous circular building with a grass roof, and every entrance looks enough like the last one that a wrong turn cost most of an afternoon and a rebooked appointment. Even residents admit the layout takes about a year to learn.|El complejo gubernamental se construyó como un solo edificio circular continuo de tejado verde, y cada entrada se parece tanto a la anterior que un giro equivocado costó casi toda una tarde y una cita reprogramada. Hasta los vecinos admiten que aprender el trazado lleva casi un año.|Le complexe gouvernemental fut bâti comme un seul bâtiment circulaire continu au toit végétalisé, et chaque entrée ressemble tant à la précédente qu'un mauvais tournant a coûté presque tout un après-midi et un rendez-vous à reprogrammer. Même les habitants admettent qu'il faut presque un an pour s'y retrouver.|政府庁舎は芝屋根の一続きの円形の建物一棟として建てられており、どの入口も直前の入口とよく似ていて、道を間違えただけで午後がほぼ潰れ、予約も取り直しになった。住民ですら、この配置を覚えるのに一年はかかると認める。",
  ),

  // ---- jl 全羅 ----
  ev(
    "boseong-first-flush", "gain", ["jl"], "🍵", 250,
    "Picking the first flush by hand|Recogiendo a mano la primera brotación|Cueillir à la main la première récolte|一番茶を手摘みする",
    "The terraced rows needed pickers before the morning dew burned off, since the earliest leaves of spring bring the best price, and a quick pair of hands could fill a basket before the sun got high. Boseong pays by the basket rather than the hour through the first weeks of the season.|Las hileras en terraza necesitaban recolectores antes de que se secara el rocío de la mañana, pues las primeras hojas de primavera dan el mejor precio, y unas manos rápidas podían llenar un cesto antes de que el sol subiera. Boseong paga por cesto y no por hora en las primeras semanas.|Les rangées en terrasse avaient besoin de cueilleurs avant que la rosée du matin ne s'évapore, les toutes premières feuilles du printemps valant le meilleur prix, et des mains rapides pouvaient remplir un panier avant que le soleil ne monte. Boseong paie au panier plutôt qu'à l'heure les premières semaines.|段々畑は朝露が乾く前に摘み手を求めていた。春いちばん早い葉がいちばん高値になるからで、手の速い者なら日が高くなる前に籠を満たせた。宝城は最初の数週間、時給ではなく籠の数で払う。",
    [11, 0],
  ),
  ev(
    "gwangju-art-market-impulse", "loss", ["jl"], "🖼️", 210,
    "Talked into buying at the art market|Convencido de comprar en el mercado de arte|Convaincu d'acheter au marché de l'art|芸術市場でつい買ってしまう",
    "A young painter's stall near the biennale grounds had exactly the kind of small, strange canvas that looks essential in the moment and questionable once it's home. Gwangju's art scene runs on precisely this sort of impulse sale between the big official exhibitions.|El puesto de un joven pintor cerca del recinto de la bienal tenía justo ese tipo de lienzo pequeño y raro que parece imprescindible en el momento y cuestionable ya en casa. La escena artística de Gwangju vive de este tipo de venta impulsiva entre las grandes exposiciones oficiales.|L'étal d'un jeune peintre près du site de la biennale avait exactement ce genre de petite toile étrange qui semble indispensable sur le moment et douteuse une fois rentré chez soi. La scène artistique de Gwangju vit de ce genre de vente impulsive entre les grandes expositions officielles.|ビエンナーレ会場近くの若い画家の露店に、その場では欠かせないと思えて、家に帰るとやや微妙な小さな奇妙な絵があった。光州の美術シーンは、大きな公式展のあいだをこうした衝動買いで回っている。",
  ),
  ev(
    "suncheon-crane-guide-tip", "gain", ["jl"], "🦩", 240,
    "Guiding photographers to the cranes|Guiando a fotógrafos hasta las grullas|Guider des photographes vers les grues|鶴の撮影ガイドで謝礼をもらう",
    "A group of visitors paid well to be shown the reed-marsh paths that lead closest to the wintering cranes without disturbing them, a route that only comes from walking the bay for years. The birds return to the same reed beds closely enough each year that the guiding is almost routine.|Un grupo de visitantes pagó bien por que les mostraran los senderos del marjal que llevan más cerca de las grullas invernantes sin molestarlas, una ruta que solo se conoce tras años caminando la bahía. Las aves vuelven cada año a los mismos cañaverales.|Un groupe de visiteurs a bien payé pour se voir montrer les sentiers du marais menant au plus près des grues hivernantes sans les déranger, un itinéraire qui ne s'apprend qu'à force d'arpenter la baie des années durant. Les oiseaux reviennent chaque année dans les mêmes roselières.|一団の観光客が、鶴を驚かせずに越冬地へいちばん近づける葦原の道を案内してもらう代わりに、たっぷり謝礼を払ってくれた。この道は何年も湾を歩き回って初めて分かるものである。鶴は毎年ほぼ同じ葦原に戻ってくるので、案内はほとんど決まりごとになっている。",
    [6, 7],
  ),

  // ---- gs 慶尚 ----
  ev(
    "busan-film-fest-staff", "gain", ["gs"], "🎬", 260,
    "A day badge for the film festival|Un pase de un día para el festival de cine|Un badge d'un jour pour le festival du film|映画祭のスタッフ証をもらう",
    "The festival needed extra hands directing ticket-holders between the beachfront theatres, and the pay came with a badge that got the wearer into a late screening for free. Busan's festival has grown large enough that even the volunteer roster keeps a waiting list.|El festival necesitaba manos extra para dirigir a los espectadores entre los cines frente a la playa, y el pago incluyó un pase que dio entrada gratis a una función nocturna. El festival de Busan ha crecido tanto que hasta la lista de voluntarios tiene lista de espera.|Le festival avait besoin de bras pour orienter les spectateurs entre les salles du front de mer, et la paie incluait un badge donnant une entrée gratuite pour une séance tardive. Le festival de Busan a grandi au point que même la liste des bénévoles a une liste d'attente.|映画祭が、海辺の各会場のあいだでチケット客を誘導する人手を求めていた。給金には夜の上映にただで入れる証が付いてきた。釜山の映画祭はいまや、ボランティアの名簿にすら順番待ちができるほど大きくなっている。",
    [5, 6],
  ),
  ev(
    "jinju-lantern-crowd-wallet", "loss", ["gs"], "🏮", 220,
    "A wallet lost in the lantern-festival crowd|Una billetera perdida entre la multitud del festival de faroles|Un portefeuille perdu dans la foule de la fête des lanternes|灯籠祭りの人混みで財布をなくす",
    "The riverbank was shoulder to shoulder for the lantern festival, and somewhere between the fortress gate and the floating lights a jacket pocket came up empty. Nobody blames the festival itself; a crowd this size draws its own kind of trouble every year.|La ribera estaba abarrotada hombro con hombro por el festival de faroles, y en algún punto entre la puerta de la fortaleza y las luces flotantes un bolsillo de la chaqueta quedó vacío. Nadie culpa al festival en sí; una multitud así atrae sus propios problemas cada año.|La berge était bondée épaule contre épaule pour la fête des lanternes, et quelque part entre la porte de la forteresse et les lumières flottantes, une poche de veste s'est retrouvée vide. Personne n'en veut au festival lui-même ; une telle foule attire son lot d'ennuis chaque année.|灯籠祭りの川辺は肩がぶつかるほどの人出で、城門から浮かぶ灯りのあいだのどこかで上着のポケットが空になっていた。祭り自体を責める者はいない。これほどの人出はどの年も相応の面倒を呼び込む。",
    [5],
  ),

  // ---- jj 済州 ----
  ev(
    "haenyeo-helper-pay", "gain", ["jj"], "🌊", 260,
    "Sorting the catch for a haenyeo crew|Clasificando la pesca de un grupo de haenyeo|Trier la pêche d'une équipe de haenyeo|海女の水揚げを仕分ける",
    "A diving collective needed a hand sorting urchin and abalone on the rocks as the divers surfaced, paid by the bucket rather than the hour. The women decide among themselves how long a stretch of coast rests between dives, and a helper on land has no say in it.|Un colectivo de buceadoras necesitaba una mano para clasificar erizos y oreja marina en las rocas mientras las buceadoras salían a la superficie, pagado por cubo y no por hora. Las mujeres deciden entre ellas cuánto descansa un tramo de costa entre inmersiones.|Un collectif de plongeuses avait besoin d'un coup de main pour trier oursins et ormeaux sur les rochers à mesure qu'elles remontaient, payé au seau plutôt qu'à l'heure. Les femmes décident entre elles du temps de repos d'un tronçon de côte entre les plongées.|海女の組合が、潜り手が浮かんでくるたびに岩の上でウニやアワビを仕分ける手を求めていた。支払いは時間ではなくバケツの数によった。どれだけ海岸を休ませるかは海女たちだけで決めることで、陸の手伝いに口を出す余地はない。",
  ),
  ev(
    "jeju-rental-fender-bender", "loss", ["jj"], "🚗", 240,
    "A fender-bender in a rental car|Un choque leve con un coche de alquiler|Une accrochage avec une voiture de location|レンタカーで石垣にこする",
    "The narrow coast road had less room than it looked like on the map, and a stone wall bordering someone's tangerine grove came off better than the rental's bumper did. The insurance excess for a first-time visitor here is not small.|La estrecha carretera costera tenía menos espacio del que parecía en el mapa, y un muro de piedra que bordeaba un naranjal ajeno salió mejor parado que el parachoques del coche de alquiler. El excedente del seguro para un visitante primerizo no es pequeño.|L'étroite route côtière offrait moins de place qu'il n'y paraissait sur la carte, et un muret de pierre bordant un verger d'agrumes s'en est mieux sorti que le pare-chocs de la location. La franchise d'assurance pour un visiteur de passage n'est pas mince.|海沿いの細い道は地図で見るより余裕がなく、誰かのみかん畑を囲む石垣のほうがレンタカーのバンパーより無傷で済んだ。初めての観光客にとって、保険の自己負担額は決して小さくない。",
  ),
];
