/**
 * バリの青マス・赤マスで起きる出来事(20件。増12・減8)。
 *
 * 地方コード: sel=南部 / ubu=中部・ウブド / gl=山岳・湖 / tim=東部 / utr=北部 / brt=西部・島嶼
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、都市数の多い南部・中部・山岳・東部の4地方には各3件(増2・減1)、
 * 北部・西部の2地方には各2件(増1・減1)を、暮らしに結びつけて置いている。
 * **地方ごとの `gains`/`losses` は、その地方の出来事だけで増・減の両方が
 * 引けることを個別に確認済み**(全国共通の4件に頼らなくても成り立つ)。
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

export const BALI_MONEY_EVENTS = [
  // ---- 島じゅうどこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "canang-order-besar", "gain", [], "🌺", 220,
    "A big order of offering baskets|Un pedido grande de cestas de ofrenda|Une grosse commande de paniers d'offrande|供物籠の大口注文",
    "A neighbour with a family ceremony coming up needed two hundred canang sari by morning and could not weave that many alone, so an evening spent folding palm leaf and setting petals paid better than expected. Every household needs a steady supply, and a fast weaver's hands are always in demand before a big day.|Un vecino con una ceremonia familiar próxima necesitaba doscientos canang sari para la mañana y no podía tejer tantos solo, así que una tarde plegando hoja de palma y colocando pétalos pagó mejor de lo esperado. Toda casa necesita un suministro constante.|Un voisin ayant une cérémonie familiale à venir avait besoin de deux cents canang sari pour le matin et ne pouvait en tresser autant seul, si bien qu'une soirée à plier des feuilles de palmier et disposer des pétales a rapporté plus que prévu. Chaque foyer en a besoin en continu.|近く家の祭事を控えた隣人が、朝までにチャナン・サリを二百個必要としていたが、一人では編み切れなかった。椰子の葉を折り花びらを乗せる夕方の仕事は、思ったより実入りが良かった。どの家も絶えず供物を必要とし、大きな日の前は手の早い織り手がいつも重宝される。",
  ),
  ev(
    "ojek-tip-tersasar", "gain", [], "🛵", 200,
    "A generous tip from a lost tourist|Una propina generosa de un turista perdido|Un généreux pourboire d'un touriste perdu|道に迷った観光客からの心づけ",
    "A rider who had circled the same three streets twice finally admitted he had no idea where the address was, and the passenger, more relieved than annoyed, paid double rather than argue over the extra minutes. Bali's back lanes are not built on any grid, and even locals sometimes have to stop and ask.|Un conductor que había dado dos vueltas por las mismas tres calles admitió por fin que no sabía dónde estaba la dirección, y el pasajero, más aliviado que molesto, pagó el doble sin discutir por los minutos de más. Los callejones de Bali no siguen ninguna cuadrícula.|Un chauffeur ayant tourné deux fois dans les trois mêmes rues finit par avouer qu'il ne trouvait pas l'adresse, et le passager, plus soulagé qu'agacé, paya le double sans discuter des minutes en trop. Les ruelles de Bali ne suivent aucun plan en grille.|同じ三本の道を二度も回った運転手は、とうとう行き先が分からないと認めた。客は腹を立てるよりほっとした様子で、余分にかかった時間を咎めるどころか倍の運賃を払った。バリの裏道は格子状に作られておらず、地元の人でさえ時に足を止めて道を尋ねる。",
  ),
  ev(
    "ban-bocor-jalan", "loss", [], "🔧", 180,
    "A flat tyre on a back road|Un pinchazo en un camino secundario|Une crevaison sur une route secondaire|裏道でのパンク",
    "A stray nail from a construction site did its work quietly, and the nearest tyre stall was a good walk away pushing a scooter that suddenly weighed twice as much. Small roadside repair stalls, usually just a hand pump and a bucket of water to find the leak, are common enough that nobody worries much until it happens to them.|Un clavo perdido de una obra hizo su trabajo en silencio, y el taller de neumáticos más cercano quedaba a un buen paseo empujando una moto que de pronto pesaba el doble. Los pequeños puestos de reparación junto a la carretera son bastante comunes.|Un clou perdu d'un chantier fit discrètement son œuvre, et l'échoppe de pneus la plus proche se trouvait à une bonne marche en poussant un scooter qui pesait soudain le double. Les petites échoppes de réparation au bord de la route, souvent une simple pompe à main et un seau d'eau, sont assez courantes.|工事現場から落ちた釘が静かに仕事を果たし、いちばん近いタイヤ修理屋まで、急に倍の重さになった原付を押して歩く羽目になった。手押しポンプと水を張ったバケツで穴を探すだけの簡素な道端の修理屋は、めったに困らないほどあちこちにある。",
  ),
  ev(
    "hujan-mendadak-jemuran", "loss", [], "🌧️", 190,
    "A sudden downpour ruins the drying goods|Un aguacero repentino arruina lo puesto a secar|Une averse soudaine gâche ce qui séchait|突然の雨が干し物を台無しにする",
    "Crackers, coffee beans or laundry laid out under a clear morning sky were still out when the afternoon cloud built without warning, and running to gather everything in only saved half of it. The dry season is dry mostly on average, not on any single day, and a good year still has its ambush showers.|Galletas, granos de café o ropa tendida bajo un cielo despejado seguían fuera cuando la nube de la tarde se formó sin aviso, y correr a recogerlo todo solo salvó la mitad. La estación seca lo es sobre todo de media.|Crackers, grains de café ou linge étalés sous un ciel matinal dégagé étaient encore dehors quand le nuage de l'après-midi se forma sans prévenir, et courir tout rentrer n'en sauva que la moitié. La saison sèche ne l'est en moyenne que sur l'ensemble.|朝の晴れた空の下に干していたクラッカーやコーヒー豆、洗濯物は、前触れもなく午後の雲が育つまでそのままだった。慌てて取り込んでも半分しか間に合わなかった。乾季が乾いているのはあくまで平均の話で、良い年でも不意打ちの雨は降る。",
  ),

  // ---- sel(南部) ----
  ev(
    "villa-cleaning-tip", "gain", ["sel"], "🧹", 260,
    "A departing guest leaves the whole tip jar|Un huésped que se va deja todo el bote de propinas|Un client partant laisse tout le bocal à pourboires|帰る客が心づけをまるごと残す",
    "A family checking out of a rented villa after two weeks left the cleaning fee, the leftover pantry food and every note in the tip jar rather than carry small change home. Short-term villa rentals now outnumber hotel rooms in parts of the south, and cleaning crews rotate through several properties a day.|Una familia que dejaba una villa alquilada tras dos semanas dejó la tarifa de limpieza, la comida sobrante de la despensa y todos los billetes del bote de propinas en vez de llevarse cambio a casa. En partes del sur, los alquileres de villa ya superan en número a las habitaciones de hotel.|Une famille quittant une villa louée après deux semaines laissa les frais de ménage, les restes du garde-manger et tous les billets du bocal à pourboires plutôt que de rapporter de la petite monnaie chez elle. Dans certaines parties du sud, les villas louées dépassent désormais en nombre les chambres d'hôtel.|二週間借りていたヴィラを引き払う家族が、小銭を持ち帰るくらいならと、掃除代も戸棚に残った食材もチップ入れの札もまるごと置いていった。南部の一部では、短期貸しのヴィラの数がホテルの部屋数をもう上回っている。清掃係は一日に何軒も掛け持ちで回る。",
  ),
  ev(
    "kaki-lima-festival", "gain", ["sel"], "🎨", 240,
    "A busy night at the festival food cart|Una noche ajetreada en el carrito de comida del festival|Une soirée animée au chariot du festival|芸術祭の夜、屋台が賑わう",
    "The month-long arts festival in the capital pulls crowds who stay out late after the evening performances, and a food cart that usually closes by nine sold out of everything by ten and kept counting cash after that. Extra staff get called in from family and neighbours for the festival's whole run.|El festival de las artes de un mes en la capital atrae multitudes que se quedan hasta tarde tras las funciones nocturnas, y un carrito de comida que suele cerrar a las nueve se quedó sin nada a las diez. Se llama a familiares y vecinos para todo el festival.|Le festival des arts d'un mois dans la capitale attire des foules qui restent tard après les spectacles du soir, et un chariot de nourriture qui ferme d'habitude à neuf heures était en rupture de tout à dix heures. On appelle famille et voisins en renfort pour toute la durée du festival.|州都で一か月続く芸術祭は、夜の公演のあと遅くまで居座る人出を呼ぶ。ふだんは九時に閉める屋台が十時には売り切れ、その後も勘定を数え続けた。芸術祭の間じゅう、家族や近所の手が総動員される。",
    [2],
  ),
  ev(
    "beach-club-parkir", "loss", ["sel"], "🚗", 210,
    "Parking and cover charge at the packed beach club|Aparcamiento y entrada en el club de playa abarrotado|Parking et droit d'entrée au beach club bondé|満員のビーチクラブの駐車料金と入場料",
    "The valet line stretched past the gate before the sun had even set, and by the time the bill for parking, the cover charge and one overpriced drink arrived, the evening had cost more than the flight in. Weekend beach clubs along the south coast now charge a door price on top of everything ordered inside.|La cola del aparcacoches llegaba más allá de la puerta antes de que se pusiera el sol, y cuando llegó la cuenta de aparcamiento, entrada y una bebida cara, la noche había costado más que el vuelo de venida. Los beach clubs del fin de semana ya cobran entrada aparte de lo consumido dentro.|La file du voiturier dépassait déjà le portail avant même le coucher du soleil, et quand arriva l'addition du parking, du droit d'entrée et d'une boisson hors de prix, la soirée avait coûté plus cher que le vol aller. Les beach clubs du week-end facturent désormais une entrée en plus de tout ce qui est commandé sur place.|日が沈む前から係員に車を預ける列は門の外まで延びていた。駐車代、入場料、割高な一杯の勘定が来たときには、その夜だけで来るときの航空券より高くついていた。週末のビーチクラブは、店内で頼んだもの以外に入場料まで取るようになっている。",
  ),

  // ---- ubu(中部・ウブド) ----
  ev(
    "lukisan-terjual", "gain", ["ubu"], "🖼️", 280,
    "A painting finally sells to a gallery|Un cuadro por fin se vende a una galería|Un tableau se vend enfin à une galerie|絵がとうとう画廊に売れる",
    "The canvas had sat propped against the workshop wall for months, half-finished more than once, until a gallery buyer passing through asked for it outright and paid on the spot rather than the usual slow consignment. Most painters here sell through a handful of galleries that take a large cut, so a direct sale is worth far more than the price alone.|El lienzo llevaba meses apoyado en la pared del taller, medio terminado más de una vez, hasta que un comprador de galería de paso lo pidió directamente y pagó al momento en vez del lento sistema de consignación habitual. La mayoría de pintores venden a través de unas pocas galerías.|La toile était restée appuyée contre le mur de l'atelier pendant des mois, inachevée plus d'une fois, jusqu'à ce qu'un acheteur de galerie de passage la demande sur-le-champ et paie immédiatement plutôt que par le lent système de dépôt-vente habituel. La plupart des peintres vendent via quelques galeries.|工房の壁に立てかけられたまま、何度も未完成の状態で数か月過ぎていた絵を、たまたま通りかかった画廊の買い手がその場で欲しいと言い、いつもの遅い委託販売ではなく即金で払った。ここの画家の多くは取り分の大きい数軒の画廊を通して売るので、直売はその値段以上の価値がある。",
  ),
  ev(
    "yoga-kelas-dadakan", "gain", ["ubu"], "🧘", 230,
    "Filling in to teach a retreat's morning class|Suplir la clase matutina de un retiro|Remplacer pour animer le cours du matin d'une retraite|リトリートの朝のクラスを急遽代講",
    "The visiting instructor had food poisoning and the retreat's twenty guests were already on their mats, so an hour improvising a class paid the same as a full week teaching locals. Ubud's wellness industry runs on foreign teachers flying in for short stays, and a local substitute is worth calling at any hour.|La instructora visitante tenía una intoxicación alimentaria y los veinte huéspedes del retiro ya estaban en sus esterillas, así que una hora improvisando una clase pagó lo mismo que una semana entera enseñando a locales. La industria del bienestar de Ubud vive de profesores extranjeros de paso corto.|L'instructrice de passage avait une intoxication alimentaire et les vingt hôtes de la retraite étaient déjà sur leur tapis, si bien qu'une heure à improviser un cours a payé autant qu'une semaine entière à enseigner aux gens du coin. L'industrie du bien-être d'Ubud vit d'enseignants étrangers de passage.|来訪していた講師が食あたりで倒れ、リトリートの客二十人はもうマットの上で待っていた。即興で教えた一時間は、地元の人相手に丸一週間教えるのと同じだけの実入りになった。ウブドのウェルネス産業は短期滞在の外国人講師で回っており、地元の代講はどんな時間でも呼ばれる値打ちがある。",
  ),
  ev(
    "cat-impor-mahal", "loss", ["ubu"], "🎨", 200,
    "Imported paint costs more than the frame|La pintura importada cuesta más que el marco|La peinture importée coûte plus cher que le cadre|輸入絵の具が額より高くつく",
    "The particular blue a commission called for only comes in an imported tube, and between the price and the customs markup it cost more than the wood, canvas and frame put together. Good pigment has always been the expensive part of painting here, long before tourists started buying the finished work.|El azul concreto que pedía un encargo solo viene en tubo importado, y entre el precio y el recargo de aduanas costó más que la madera, el lienzo y el marco juntos. El buen pigmento siempre ha sido la parte cara de pintar aquí.|Le bleu précis demandé par une commande n'existe qu'en tube importé, et entre le prix et la majoration douanière, il a coûté plus cher que le bois, la toile et le cadre réunis. Le bon pigment a toujours été la partie coûteuse de la peinture ici.|注文で指定された特定の青は輸入品のチューブでしか手に入らず、値段に関税が上乗せされると、木枠・キャンバス・額を合わせたより高くついた。良い顔料は、観光客が完成した絵を買うようになるずっと前から、ここでの絵画のいちばん高くつく部分だった。",
  ),

  // ---- gl(山岳・湖) ----
  ev(
    "kopi-panen-bagus", "gain", ["gl"], "☕", 250,
    "A buyer pays a premium for the first cherries|Un comprador paga un extra por las primeras cerezas|Un acheteur paie un supplément pour les premières cerises|買い手が初摘みの実に色を付ける",
    "An exporter's agent came up the mountain looking for the very first ripe cherries of the season and paid well above the going rate to be first in line before the price settled. Coffee here is still mostly picked by hand over several passes rather than stripped all at once.|El agente de un exportador subió la montaña buscando las primerísimas cerezas maduras de la temporada y pagó bien por encima del precio corriente por ser el primero en la fila. Aquí el café aún se recoge sobre todo a mano en varias pasadas.|L'agent d'un exportateur monta la montagne à la recherche des toutes premières cerises mûres de la saison et paya bien au-dessus du cours pour être le premier servi. Ici, le café est encore surtout cueilli à la main en plusieurs passages.|輸出業者の仲買人がその年最初に熟した実を求めて山を登ってきて、相場が落ち着く前に一番乗りしようと相場よりずっと高く払った。ここのコーヒーはいまも一度に摘み切らず、何度も手で摘む。",
    [1, 4],
  ),
  ev(
    "study-tour-pemandu", "gain", ["gl"], "🧑‍🌾", 240,
    "Guiding a research group through the terraces|Guiar a un grupo de investigación por las terrazas|Guider un groupe de recherche à travers les terrasses|研究グループを棚田に案内する",
    "A university team studying irrigation needed someone who could explain the water schedule from memory rather than a guidebook, and a full day walking the channels paid better than a week of field work. Farmers who can speak to outsiders about the system are asked more often than they expect.|Un equipo universitario que estudiaba el riego necesitaba a alguien capaz de explicar el turno de agua de memoria y no de una guía, y un día entero recorriendo los canales pagó mejor que una semana de trabajo de campo. A los agricultores que saben explicar el sistema a forasteros se les pide más de lo que esperan.|Une équipe universitaire étudiant l'irrigation avait besoin de quelqu'un capable d'expliquer le calendrier de l'eau de mémoire plutôt que d'un guide, et une journée entière à parcourir les canaux a payé mieux qu'une semaine de travail aux champs. On sollicite plus souvent qu'attendu les paysans capables d'expliquer le système aux étrangers.|灌漑を調べる大学の調査団は、案内書ではなく暗記した水の順番を説明できる人を求めていた。水路を一日じゅう歩いて案内する仕事は、一週間の畑仕事より稼ぎになった。よそから来た人にこの仕組みを説明できる農民は、思う以上に頼りにされる。",
  ),
  ev(
    "kabut-tebal-truk", "loss", ["gl"], "🌫️", 210,
    "Thick fog holds up the produce truck|La niebla espesa retrasa el camión de productos|Un épais brouillard retarde le camion de produits|濃霧が農産物のトラックを止める",
    "Visibility on the mountain road dropped to a few metres before dawn, and the truck that should have carried the morning's vegetables down to market sat idling at the pass until the sun burned the cloud off, by which point half the buyers had already found someone else.|La visibilidad en la carretera de montaña bajó a pocos metros antes del alba, y el camión que debía bajar las verduras de la mañana al mercado quedó parado en el puerto hasta que el sol quemó la nube.|La visibilité sur la route de montagne tomba à quelques mètres avant l'aube, et le camion censé descendre les légumes du matin au marché resta immobilisé au col jusqu'à ce que le soleil dissipe le nuage.|夜明け前、山道の視界は数メートルまで落ち、朝の野菜を市場へ運ぶはずのトラックは、太陽が雲を焼き払うまで峠でエンジンをかけたまま動けなかった。そのころには買い手の半分はもう別の当てを見つけていた。",
  ),

  // ---- tim(東部) ----
  ev(
    "turis-selam-tip", "gain", ["tim"], "🤿", 260,
    "A big tip from an amazed dive group|Una buena propina de un grupo de buceo maravillado|Un généreux pourboire d'un groupe de plongeurs émerveillés|感激したダイバー一行からの心づけ",
    "A group who had never seen a wreck or a reef this close pooled their cash at the end of the trip rather than tip individually, and it came to more than the boat's fee for the day. Word of a good dive spot travels fast among divers, and repeat groups tip better than first-timers.|Un grupo que nunca había visto un pecio o un arrecife tan de cerca juntó su dinero al final de la salida en vez de dar propina por separado, y sumó más que la tarifa del barco por el día. La voz de un buen punto de buceo corre rápido entre buceadores.|Un groupe n'ayant jamais vu d'épave ou de récif d'aussi près a réuni son argent à la fin de la sortie plutôt que de laisser un pourboire individuel, pour un total supérieur au tarif du bateau pour la journée. La nouvelle d'un bon site de plongée circule vite parmi les plongeurs.|これほど近くで沈没船や珊瑚礁を見たのは初めてだという一行が、個別にではなくまとめてその日の終わりに寄せ集めた心づけは、その日のボート代を上回った。良い潜水地の噂はダイバーの間ですぐ広まり、常連ほど心づけがはずむ。",
  ),
  ev(
    "warung-ramai-odalan", "gain", ["tim"], "🍜", 230,
    "A temple anniversary fills every table|Un aniversario de templo llena todas las mesas|Un anniversaire de temple remplit toutes les tables|寺院の記念祭でどの席も埋まる",
    "The temple's own 210-day anniversary brought pilgrims from villages an hour away, and the warung across the road ran out of rice twice before the ceremony even finished. Odalan dates differ temple by temple, so a warung near a large one can count on a handful of very good days each year.|El aniversario de 210 días del templo trajo peregrinos de pueblos a una hora, y el warung de enfrente se quedó sin arroz dos veces antes de que acabara la ceremonia. Las fechas de odalan varían de templo a templo.|L'anniversaire de 210 jours du temple attira des pèlerins de villages à une heure de route, et le warung d'en face manqua de riz deux fois avant même la fin de la cérémonie. Les dates d'odalan varient d'un temple à l'autre.|寺院の210日ごとの創建記念祭「オダラン」には一時間離れた村々からも参詣者が集まり、道向かいのワルンは儀式が終わる前に米を二度も切らした。オダランの日取りは寺院ごとに違うので、大きな寺院の近くのワルンは年に何度かこうした稼ぎ時を当てにできる。",
  ),
  ev(
    "ombak-tinggi-batal", "loss", ["tim"], "🌊", 220,
    "Rough seas cancel the day's dive boats|El mar agitado cancela las barcas de buceo del día|Une mer agitée annule les bateaux de plongée du jour|荒れた海で潜水船が欠航",
    "The swell coming through the strait was judged too rough for the small boats before the first group had even suited up, and every booking for the day had to be refunded in cash rather than rescheduled to a week already full. The narrow channel here can turn from flat to dangerous within a single tide.|El oleaje del estrecho se juzgó demasiado fuerte para las barcas pequeñas antes de que el primer grupo se hubiera equipado, y hubo que devolver en efectivo todas las reservas del día. El canal estrecho aquí puede pasar de calma a peligroso en una sola marea.|La houle traversant le détroit fut jugée trop forte pour les petits bateaux avant même que le premier groupe ait enfilé sa combinaison, et toutes les réservations du jour durent être remboursées en liquide. Le chenal étroit ici peut passer du calme au danger en une seule marée.|最初の一団がまだ器材も着けないうちに、海峡を抜ける波は小型ボートには荒すぎると判断され、その日の予約はすべて現金で払い戻す羽目になった。この狭い海峡はひと潮のうちに凪から危険な状態へ変わることがある。",
  ),

  // ---- utr(北部) ----
  ev(
    "lumba-lumba-banyak", "gain", ["utr"], "🐬", 240,
    "An unusually large pod draws extra boats|Un grupo de delfines inusualmente grande atrae más barcas|Un groupe de dauphins inhabituellement grand attire d'autres bateaux|珍しく大きな群れが舟を呼ぶ",
    "Word spread along the beach before sunrise that dozens of dolphins had been spotted offshore instead of the usual handful, and boats that normally carry two passengers filled up twice over before the sun was properly up. Sightings are never guaranteed, which is exactly why a big morning gets talked about for days.|La voz corrió por la playa antes del amanecer de que se habían visto decenas de delfines en vez del puñado habitual, y las barcas que normalmente llevan dos pasajeros se llenaron dos veces antes de que saliera bien el sol. Los avistamientos nunca están garantizados.|La nouvelle se répandit sur la plage avant l'aube que des dizaines de dauphins avaient été repérés au large au lieu de la poignée habituelle, et les bateaux qui portent normalement deux passagers se remplirent deux fois avant que le soleil ne soit bien levé. Les observations ne sont jamais garanties.|夜明け前、いつもの数頭ではなく何十頭ものイルカが沖に見えたという話が浜じゅうに広まり、ふだんは客二人を乗せるだけの舟が、日が高く昇る前に二回転した。目撃はいつも保証されているわけではないからこそ、当たった朝は何日も語り草になる。",
  ),
  ev(
    "jaring-robek-puing", "loss", ["utr"], "🕸️", 210,
    "Debris tears the night's fishing net|Los restos rasgan la red de pesca de la noche|Des débris déchirent le filet de pêche de la nuit|流木が夜の漁網を裂く",
    "Something unseen in the dark current caught the net and tore a long gash through it before it could be hauled in, and mending it by hand took longer than the whole night's catch would have paid for. A torn net stays out of the water until it is fixed, which means lost nights as well as lost thread.|Algo invisible en la corriente nocturna enganchó la red y le rasgó un tajo largo antes de poder recogerla, y remendarla a mano llevó más tiempo del que hubiera pagado toda la pesca de la noche. Una red rota se queda fuera del agua hasta que se arregla.|Quelque chose d'invisible dans le courant nocturne a accroché le filet et l'a longuement déchiré avant qu'on ne puisse le remonter, et le raccommoder à la main a pris plus de temps que toute la pêche de la nuit n'aurait rapporté. Un filet déchiré reste hors de l'eau tant qu'il n'est pas réparé.|暗い流れの中で何かに引っかかった網は、引き上げる前に長く裂けてしまい、手で繕うのにその夜の漁の稼ぎ以上の時間がかかった。破れた網は直るまで海に出せず、糸だけでなく漁に出られない夜も失うことになる。",
  ),

  // ---- brt(西部・島嶼) ----
  ev(
    "garam-harga-naik", "gain", ["brt"], "🧂", 250,
    "A buyer pays extra for hand-made salt|Un comprador paga más por sal hecha a mano|Un acheteur paie un supplément pour du sel fait main|買い手が手作りの塩に色を付ける",
    "A restaurant supplier came looking specifically for salt made the old way rather than the factory kind, and paid nearly double once it was clear the whole batch had been raked and dried by hand over two weeks. Interest from outside has slowly pushed up what this salt is worth, though the work has not changed at all.|Un proveedor de restaurantes buscaba específicamente sal hecha a la manera antigua y no la industrial, y pagó casi el doble al comprobar que todo el lote se había rastrillado y secado a mano en dos semanas. El interés de fuera ha ido subiendo poco a poco el precio de esta sal.|Un fournisseur de restaurants cherchait spécifiquement du sel fait à l'ancienne plutôt qu'industriel, et paya presque le double une fois clair que tout le lot avait été ratissé et séché à la main en deux semaines. L'intérêt venu de l'extérieur a lentement fait grimper la valeur de ce sel.|レストラン向けの仕入れ業者が、工場製ではなく昔ながらの製法の塩を探しに来て、その一区画すべてが二週間かけて手でならされ干されたものだと分かると、ほぼ倍の値を払った。よそからの関心が、この塩の値打ちをじわじわ押し上げている。仕事のやり方自体は何も変わっていないのに。",
    [5, 6],
  ),
  ev(
    "kapal-tertunda-cuaca", "loss", ["brt"], "⛴️", 220,
    "The ferry is delayed by weather, and the day's wages with it|El ferri se retrasa por el tiempo, y con él el jornal del día|Le ferry est retardé par le temps, et le salaire du jour avec lui|天候でフェリーが遅れ、その日の稼ぎも遅れる",
    "A crossing that should have taken forty minutes sat at anchor for three hours waiting out a squall, and everyone aboard who was due at work on the other side lost the better part of a day's pay standing at the rail. The strait between here and the mainland looks calm right up until it suddenly isn't.|Una travesía que debía durar cuarenta minutos quedó fondeada tres horas esperando a que pasara un chubasco, y todos los que debían trabajar al otro lado perdieron buena parte del jornal del día. El estrecho entre aquí y tierra firme parece calmo hasta que de pronto deja de estarlo.|Une traversée censée durer quarante minutes resta à l'ancre trois heures à attendre la fin d'un grain, et tous ceux qui devaient travailler de l'autre côté perdirent une bonne part du salaire de la journée. Le détroit entre ici et l'île principale semble calme jusqu'à ce qu'il ne le soit soudain plus.|本来なら四十分の航路が、スコールをやり過ごすため三時間も錨を下ろしたままになり、対岸で仕事を待つ乗客はみな、手すりにつかまって過ごすうちにその日の稼ぎの大半を失った。ここと本島のあいだの海峡は、穏やかに見えていて不意に豹変する。",
  ),
];
