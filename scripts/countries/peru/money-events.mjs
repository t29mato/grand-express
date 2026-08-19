/**
 * ペルーの青マス・赤マスで起きる出来事(20件。増10・減10)。
 *
 * 地方コード: co=海岸(コスタ) / si=山地(シエラ) / se=熱帯林(セルバ) / al=高原南部(アルティプラーノ)
 *
 * 地方を指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、4地方それぞれに4件(増2・減2)、土地の産業や気候に結びつけて置いている。
 * 高山病・地滑り(ワイコ)・道路封鎖(パロ)など、標高と土地の厳しさに
 * 関わる出来事を意図的に多めにしている(この盤面の芯に合わせて)。
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
 * (0=4月〜11=3月、他国と同じ並び)。省略すれば通年。
 */
function ev(id, kind, regs, emoji, amount, title, narrative, months = []) {
  return { id, kind, regs, e: emoji, amount, n: t(title), t: t(narrative), months };
}

export const PERU_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(4件) ----
  ev(
    "asparagus-harvest-day", "gain", [], "🌱", 210,
    "A day cutting export asparagus|Un día cortando espárragos de exportación|Une journée à couper des asperges d'exportation|輸出用アスパラガスを刈る一日",
    "A coastal farm was short-handed before a container had to be packed for the next ship out, and cutting spears at dawn paid by the crate rather than the hour. Peru ships asparagus to supermarkets on the other side of the world within days of it being cut.|Una finca costera andaba corta de manos antes de que hubiera que llenar un contenedor para el próximo barco, y cortar espárragos al alba se pagaba por cajón y no por hora. Perú envía espárragos a supermercados al otro lado del mundo en cuestión de días desde el corte.|Une ferme côtière manquait de bras avant de devoir remplir un conteneur pour le prochain navire, et couper les asperges à l'aube se payait à la caisse plutôt qu'à l'heure. Le Pérou expédie ses asperges vers des supermarchés à l'autre bout du monde en quelques jours à peine.|次の船に積むコンテナを満たす前で、海岸の農園は人手を欲しがっていた。夜明けにアスパラガスを刈る仕事は時給ではなく箱の数で払われた。ペルーのアスパラガスは、刈られてから数日のうちに地球の反対側のスーパーに並ぶ。",
  ),
  ev(
    "colectivo-push-tip", "gain", [], "🚐", 180,
    "Pushing an overloaded colectivo out of the mud|Empujando un colectivo sobrecargado fuera del barro|Pousser un colectivo surchargé hors de la boue|泥にはまった乗合バンを押す",
    "The shared minibus had one passenger too many and a rear wheel spinning uselessly, and a shoulder against the bumper for two minutes was worth more than the fare itself. Colectivos fill in for a train network that never reached most of the country.|La camioneta compartida llevaba un pasajero de más y una rueda trasera girando en vano, y poner el hombro en el parachoques dos minutos valió más que el propio pasaje. Los colectivos suplen a una red ferroviaria que nunca llegó a la mayor parte del país.|Le minibus partagé avait un passager de trop et une roue arrière tournant dans le vide, et pousser deux minutes contre le pare-chocs valait plus que le prix du trajet lui-même. Les colectivos suppléent un réseau ferroviaire qui n'a jamais atteint la majeure partie du pays.|乗合バンは乗客が一人多く、後輪が空回りしていた。バンパーを二分間押しただけで、運賃そのものより多くの謝礼をもらった。コレクティーボは、国土の大半に届かなかった鉄道網の代わりを務めている。",
  ),
  ev(
    "market-pickpocket", "loss", [], "👛", 200,
    "A pickpocket works the crowded market|Un carterista trabaja el mercado abarrotado|Un pickpocket sévit au marché bondé|混み合う市場ですりに遭う",
    "A shove between two stalls was over before it registered as anything, and only at the next stall does the missing weight in a pocket become obvious. Nobody nearby noticed a thing over the noise of vendors calling out prices.|Un empujón entre dos puestos pasó antes de que se notara como algo, y solo en el siguiente puesto se hace evidente el peso que falta en un bolsillo. Nadie cerca notó nada entre el ruido de los vendedores pregonando precios.|Une bousculade entre deux étals est passée avant même d'être remarquée, et ce n'est qu'à l'étal suivant que le poids manquant dans une poche devient évident. Personne aux alentours n'a rien remarqué dans le vacarme des vendeurs criant leurs prix.|露店の合間でぶつかられた程度にしか感じなかったが、次の店に着いてはじめてポケットの軽さに気づいた。値段を呼び込む売り子たちの声にまぎれて、近くの誰も気づかなかった。",
  ),
  ev(
    "blanquirroja-bet-loss", "loss", [], "⚽", 170,
    "Losing a bet on the national football team|Perdiendo una apuesta por la selección nacional de fútbol|Perdre un pari sur l'équipe nationale de football|サッカー代表戦の賭けに負ける",
    "The bar had been loud with confidence until the final whistle, and settling up with the neighbour who bet the other way cost more than the round of drinks had. La Blanquirroja breaks hearts often enough that everyone at the table should have known better.|El bar estaba lleno de confianza hasta el pitido final, y saldar cuentas con el vecino que apostó lo contrario costó más que la ronda de bebidas. La Blanquirroja rompe corazones con la frecuencia suficiente para que todos en la mesa debieran saberlo.|Le bar débordait de confiance jusqu'au coup de sifflet final, et régler ses comptes avec le voisin qui avait parié l'inverse a coûté plus cher que la tournée elle-même. La Blanquirroja brise les cœurs assez souvent pour que toute la tablée aurait dû s'en douter.|試合終了の笛が鳴るまでバルは自信に満ちていたが、逆に賭けていた隣人への支払いは、みんなで飲んだ分より高くついた。ブランキロハはしょっちゅう期待を裏切るのだから、その場の誰もが分かっていたはずだった。",
  ),

  // ---- co 海岸(コスタ) ----
  ev(
    "fishing-boat-unload", "gain", ["co"], "🐟", 220,
    "Unloading the catch at dawn|Descargando la pesca al alba|Décharger la prise à l'aube|夜明けの水揚げを手伝う",
    "A boat came in heavier than the crew expected, and extra hands to sort the catch into crates before the ice ran out were paid on the spot. The whole port smells of the sea for an hour afterward no matter how well the deck is hosed down.|Un barco llegó más cargado de lo que esperaba la tripulación, y las manos extra para clasificar la pesca en cajones antes de que se acabara el hielo se pagaron en el acto. Todo el puerto huele a mar durante una hora después, por más que se friegue la cubierta.|Un bateau est arrivé plus chargé que l'équipage ne l'attendait, et les bras supplémentaires pour trier la prise en caisses avant que la glace ne manque furent payés sur-le-champ. Tout le port sent la mer pendant une heure après, quel que soit le nettoyage du pont au jet.|想定より多い水揚げがあった船で、氷が尽きる前に魚を箱に仕分ける手が求められ、その場で払われた。甲板をどれだけ洗い流しても、港全体が小一時間は海の匂いに包まれる。",
  ),
  ev(
    "beach-icecream-vendor", "gain", ["co"], "🍦", 190,
    "Selling ice cream on a packed summer beach|Vendiendo helados en una playa veraniega abarrotada|Vendre des glaces sur une plage bondée en été|夏の混み合う浜辺でアイスを売る",
    "A vendor short on hands for the holiday crowd lent out a second cooler cart on commission, and every scoop sold in the heat put a little more in the pocket. By late afternoon the cart is nearly as light as the crowd is loud.|Un vendedor corto de manos por el gentío festivo prestó un segundo carrito con nevera a comisión, y cada bola vendida bajo el calor dejaba algo más en el bolsillo. Al final de la tarde, el carrito pesa casi tan poco como ruidosa es la multitud.|Un vendeur en manque de bras face à la foule des vacances a prêté une seconde glacière à la commission, et chaque boule vendue sous la chaleur laissait un peu plus dans la poche. En fin d'après-midi, le chariot est presque aussi léger que la foule est bruyante.|休暇客でにぎわう浜辺で人手が足りなかった売り子が、歩合制で二台目の保冷カートを貸してくれた。暑さの中で一つ売れるたびに、少しずつ懐が温かくなった。夕方には人混みの騒がしさに劣らぬほど、カートは軽くなっていた。",
    [4, 5],
  ),
  ev(
    "garua-flight-delay", "loss", ["co"], "🌫️", 210,
    "Fog grounds the flight for hours|La neblina retiene el vuelo por horas|Le brouillard cloue le vol au sol pendant des heures|霧で便が何時間も足止め",
    "The garúa sat too thick over the coast for the runway to open on schedule, and the extra hotel night and rebooking fee were not part of the plan. Locals barely notice the grey sky, but it still grounds planes several mornings a year.|La garúa se posó demasiado espesa sobre la costa para que la pista abriera a tiempo, y la noche extra de hotel y el cambio de reserva no estaban en el plan. Los locales apenas notan el cielo gris, pero igual retiene aviones varias mañanas al año.|La garúa était trop épaisse sur la côte pour que la piste ouvre à l'heure, et la nuit d'hôtel supplémentaire ainsi que les frais de changement n'étaient pas prévus. Les habitants remarquent à peine le ciel gris, mais il cloue tout de même des avions au sol plusieurs matins par an.|海岸を覆うガルーアがあまりに濃く、滑走路は予定どおり開かなかった。予定外のホテル一泊分と便の変更手数料がかさんだ。地元の人は曇り空にほとんど気づかないが、それでも年に何度かは飛行機を足止めする。",
  ),
  ev(
    "counterfeit-sol-note", "loss", ["co"], "💵", 180,
    "A counterfeit bill turns up in the change|Un billete falso aparece entre el vuelto|Un faux billet apparaît dans la monnaie|釣り銭に偽札が混ざっていた",
    "The note looked fine under the market's fluorescent lights, and only a shopkeeper's practised rub of the watermark later gave it away as fake. Counterfeit soles circulate often enough in busy coastal markets that vendors check bills almost without thinking.|El billete parecía correcto bajo las luces fluorescentes del mercado, y solo el frotar experto de un tendero sobre la marca de agua lo delató después como falso. Los soles falsos circulan lo bastante en los mercados costeros concurridos como para que los vendedores revisen los billetes casi sin pensarlo.|Le billet semblait correct sous les néons du marché, et seul le frottement expérimenté d'un commerçant sur le filigrane l'a trahi plus tard comme faux. De faux soles circulent assez souvent dans les marchés côtiers animés pour que les vendeurs vérifient les billets presque sans y penser.|市場の蛍光灯の下では本物に見えたが、あとで店主が透かしを指で擦って確かめ、偽物だと分かった。混み合う海岸部の市場では偽ソル札がそれなりに出回っており、店主たちはほとんど無意識に紙幣を確かめる。",
  ),

  // ---- si 山地(シエラ) ----
  ev(
    "alpaca-fibre-sorting", "gain", ["si"], "🧶", 230,
    "Sorting alpaca fibre by colour at the fair|Clasificando fibra de alpaca por color en la feria|Trier la fibre d'alpaga par couleur à la foire|市でアルパカの毛を色分けする",
    "A trader needed extra hands to sort a season's shearing into dozens of natural shades before the buyers arrived, and quick fingers were paid by the sack cleared. Undyed alpaca fleece sells for more the more precisely its colour is graded.|Un comerciante necesitaba manos extra para clasificar la esquila de la temporada en decenas de tonos naturales antes de que llegaran los compradores, y los dedos rápidos se pagaban por saco despejado. La fibra de alpaca sin teñir se vende más cara cuanto más preciso es su color.|Un négociant avait besoin de bras pour trier la tonte de la saison en des dizaines de teintes naturelles avant l'arrivée des acheteurs, et des doigts rapides étaient payés au sac trié. La fibre d'alpaga non teinte se vend d'autant plus cher que sa couleur est classée avec précision.|買い付け人が来る前に、その季節の刈り毛を何十もの天然色に選り分ける手を商人が求めていた。手早い指は、片付けた袋の数で払われた。染めていないアルパカの毛は、色の選り分けが細かいほど高く売れる。",
  ),
  ev(
    "trekking-porter-tip", "gain", ["si"], "🎒", 250,
    "A grateful tip from a trekking group|Una propina agradecida de un grupo de trekking|Un généreux pourboire d'un groupe de trekking|感謝された登山グループからのチップ",
    "A group of foreign hikers, worn out by the altitude, split an unexpectedly generous tip among the porters who had carried their tents and stove all week. The mountains take a toll on visitors that locals barely notice anymore.|Un grupo de excursionistas extranjeros, agotados por la altura, repartió una propina inesperadamente generosa entre los porteadores que habían cargado sus carpas y cocina toda la semana. Las montañas pasan factura a los visitantes que los locales ya apenas notan.|Un groupe de randonneurs étrangers, épuisés par l'altitude, a partagé un pourboire étonnamment généreux entre les porteurs qui avaient porté tentes et réchaud toute la semaine. Les montagnes éprouvent les visiteurs d'une façon que les habitants ne remarquent presque plus.|標高に消耗した外国人ハイカーの一団が、一週間テントとコンロを担いだポーターたちに、思いがけず気前のよいチップを分けてくれた。この山々が旅行者に与える負担は、地元の人にはもうほとんど気にならない。",
  ),
  ev(
    "soroche-medicine", "loss", ["si"], "😵", 220,
    "Altitude sickness forces a stop for oxygen and coca tea|El mal de altura obliga a parar por oxígeno y mate de coca|Le mal des montagnes force un arrêt pour de l'oxygène et du maté de coca|高山病で酸素とコカ茶に足止め",
    "The headache and nausea came on faster than expected above 4,000 metres, and a canister of bottled oxygen and a round of coca-leaf tea from the nearest stall were not optional. Even people who live at altitude keep both on hand for visitors who climb too fast.|El dolor de cabeza y las náuseas llegaron más rápido de lo esperado por encima de los 4.000 metros, y una bombona de oxígeno embotellado y una ronda de mate de coca del puesto más cercano no fueron opcionales. Hasta quienes viven en altura los tienen a mano.|Le mal de tête et les nausées sont arrivés plus vite que prévu au-dessus de 4 000 mètres, et une bonbonne d'oxygène en bouteille ainsi qu'une tournée de maté de coca de l'étal le plus proche n'étaient pas facultatifs. Même les habitants de l'altitude en gardent sous la main pour les visiteurs.|標高4000メートルを超えたところで、頭痛と吐き気は思ったより早くやってきた。近くの露店で買った酸素ボンベとコカ茶は、なくて済ませられるものではなかった。高地に暮らす人々でさえ、急いで登ってくる客のためにいつも両方を手元に置いている。",
  ),
  ev(
    "huayco-detour", "loss", ["si"], "🪨", 240,
    "A landslide blocks the only road|Un huayco bloquea la única carretera|Un glissement de terrain bloque l'unique route|地滑り(ワイコ)が唯一の道をふさぐ",
    "Heavy rain loosened a slope above the highway overnight, and clearing enough of the rock and mud to pass took the whole day and a paid ride around on a longer track. Mountain roads here are cut and re-cut by the same slopes every rainy season.|La lluvia fuerte soltó una ladera sobre la carretera durante la noche, y despejar suficiente roca y barro para pasar tomó el día entero y un viaje pagado por una pista más larga. Las carreteras de montaña aquí se cortan y recortan por las mismas laderas cada temporada de lluvias.|De fortes pluies ont détaché un versant au-dessus de la route pendant la nuit, et dégager assez de roches et de boue pour passer a pris toute la journée, plus un trajet payé par une piste plus longue. Ici, les routes de montagne sont coupées et recoupées par les mêmes versants à chaque saison des pluies.|夜のうちに豪雨が幹線道路の上の斜面を緩め、通れるだけの岩と泥を取り除くのに丸一日かかり、遠回りの道を有料で乗せてもらう羽目になった。この山道は毎年の雨季に、同じ斜面によって何度も切られては塞がれる。",
    [10, 11, 0],
  ),

  // ---- se 熱帯林(セルバ) ----
  ev(
    "pink-dolphin-guide", "gain", ["se"], "🐬", 240,
    "Guiding tourists to the pink river dolphins|Guiando a turistas hasta los delfines rosados del río|Guider des touristes vers les dauphins roses du fleuve|ピンクのカワイルカを見に案内する",
    "A boatman needed a second pair of eyes to spot the pale shapes surfacing at dusk, and the tip from a boat of delighted tourists more than covered the fuel. The Amazon's pink dolphins are almost blind, navigating the muddy water by sound alone.|Un botero necesitaba un segundo par de ojos para detectar las formas pálidas que asomaban al atardecer, y la propina de un bote de turistas encantados cubrió de sobra el combustible. Los delfines rosados de la Amazonía son casi ciegos y se guían solo por el sonido en el agua turbia.|Un batelier avait besoin d'une seconde paire d'yeux pour repérer les formes pâles émergeant au crépuscule, et le pourboire d'un bateau de touristes ravis a largement couvert l'essence. Les dauphins roses de l'Amazone sont presque aveugles et se guident au son dans l'eau boueuse.|夕暮れに浮かび上がる淡い姿を見つけるのに、船頭はもう一組の目を必要としていた。喜んだ観光客の一団からのチップは燃料代を十分に上回った。アマゾンのピンクイルカはほとんど目が見えず、濁った水の中を音だけで進む。",
  ),
  ev(
    "river-port-fruit-stall", "gain", ["se"], "🍌", 200,
    "Selling fruit the moment the boat docks|Vendiendo fruta en cuanto atraca el barco|Vendre des fruits dès l'accostage du bateau|船が着いた瞬間に果物を売る",
    "A cargo boat pulled in a day early, and a stall stocked in a hurry sold out its bananas and camu camu before the passengers had even finished unloading their bags. Boat schedules on the river are a rumour more than a timetable.|Un barco de carga atracó un día antes, y un puesto abastecido a las prisas agotó sus plátanos y camu camu antes de que los pasajeros terminaran de bajar el equipaje. Los horarios de los barcos en el río son más un rumor que una tabla fija.|Un bateau de fret a accosté un jour plus tôt, et un étal approvisionné à la hâte a écoulé ses bananes et son camu camu avant même que les passagers n'aient fini de descendre leurs bagages. Les horaires des bateaux sur le fleuve tiennent plus de la rumeur que d'un vrai calendrier.|貨物船が予定より一日早く着き、慌てて仕入れた屋台のバナナとカムカムは、乗客が荷物を下ろし終わる前に売り切れた。この川の船の時刻表は、決まりというより噂に近い。",
  ),
  ev(
    "boat-engine-repair", "loss", ["se"], "🛶", 230,
    "The boat's motor gives out mid-river|El motor del bote falla en medio del río|Le moteur du bateau lâche en plein fleuve|川の途中でボートのエンジンが止まる",
    "The outboard sputtered and died a good hour from the nearest village, and the mechanic who eventually rowed out charged double for the trouble of towing a stalled boat back against the current. Spare parts this far upriver cost whatever the seller feels like asking.|El motor fuera de borda tosió y murió a una buena hora del pueblo más cercano, y el mecánico que finalmente remó hasta allí cobró el doble por remolcar un bote varado contra la corriente. Los repuestos, tan río arriba, cuestan lo que el vendedor quiera pedir.|Le hors-bord a toussé puis rendu l'âme à une bonne heure du village le plus proche, et le mécanicien venu à la rame a facturé le double pour remorquer un bateau en panne contre le courant. Les pièces détachées, si loin en amont, coûtent ce que le vendeur veut bien demander.|船外機は近くの村から優に一時間の地点で咳き込んで止まってしまい、やがて漕いでやってきた整備士は、流れに逆らって動かなくなった船を曳く手間として倍額を請求した。この川の奥地では、部品の値段は売り手の言い値でしかない。",
  ),
  ev(
    "dengue-medicine-loss", "loss", ["se"], "🦟", 210,
    "A mosquito-borne fever forces days of rest and medicine|Una fiebre transmitida por mosquito obliga a días de reposo y medicinas|Une fièvre transmise par moustique impose repos et médicaments|蚊が媒介する熱で、薬と休養を強いられる",
    "The fever and joint pain came on fast, and the clinic's fan did little against the heat while the fluids and medicine were paid for out of pocket. Dengue moves through river towns most heavily just after the rains fill every stagnant puddle.|La fiebre y el dolor articular llegaron rápido, y el ventilador de la clínica poco podía contra el calor mientras los sueros y las medicinas se pagaban de su bolsillo. El dengue recorre los pueblos ribereños con más fuerza justo después de que las lluvias llenan cada charco estancado.|La fièvre et les douleurs articulaires sont arrivées vite, et le ventilateur de la clinique ne faisait pas grand-chose contre la chaleur pendant que sérums et médicaments se payaient de sa poche. La dengue frappe le plus fort les villages fluviaux juste après que les pluies ont rempli chaque flaque stagnante.|熱と関節の痛みは急にやってきて、診療所の扇風機は暑さにほとんど役に立たなかった。点滴と薬は自腹だった。デング熱は、雨が水たまりを満たした直後の川辺の町でいちばん激しく広がる。",
    [4, 5, 6],
  ),

  // ---- al 高原南部(アルティプラーノ) ----
  ev(
    "textile-fair-sales", "gain", ["al"], "🧵", 220,
    "A festival crowd buys up handwoven textiles|Una multitud festiva agota los tejidos hechos a mano|Une foule de fête achète tous les textiles tissés main|祭りの人出で手織り布が売れる",
    "The crowd gathered for the festival cleared out an entire family's stock of hand-loomed blankets in a single afternoon, at prices nobody haggled down for once. Weaving here is passed from mother to daughter and rarely written down as a pattern.|La multitud reunida para la fiesta agotó en una sola tarde todo el stock de mantas tejidas a mano de una familia, a precios que por una vez nadie regateó. Aquí el tejido pasa de madre a hija y rara vez queda escrito como patrón.|La foule réunie pour la fête a écoulé en un seul après-midi tout le stock de couvertures tissées main d'une famille, à des prix que, pour une fois, personne n'a marchandés. Ici, le tissage se transmet de mère en fille et est rarement couché sur un patron écrit.|祭りに集まった人出のおかげで、ある一家の手織り毛布の在庫は午後のうちに売り切れた。値切られることもほとんどなかった。この土地の織物は母から娘へ受け継がれ、図案が紙に書き残されることはめったにない。",
  ),
  ev(
    "candelaria-extra-guide-work", "gain", ["al"], "💃", 260,
    "Extra guiding work during the Candelaria crowds|Trabajo extra de guía durante el gentío de la Candelaria|Travail de guide supplémentaire pendant la foule de la Candelaria|カンデラリア祭の人出で臨時の案内役",
    "Tour agencies ran out of licensed guides for the sheer number of visitors the festival drew, and a fluent local willing to work the crowded dance routes for a few days was paid well above the usual rate. Tens of thousands of dancers fill the streets for the occasion.|Las agencias se quedaron sin guías licenciados por la enorme cantidad de visitantes que atrajo la fiesta, y un local con buen dominio del idioma, dispuesto a trabajar las rutas de baile abarrotadas unos días, cobró bien por encima de la tarifa habitual.|Les agences ont manqué de guides agréés face au nombre de visiteurs attirés par la fête, et un habitant à l'aise en langues, prêt à travailler quelques jours sur les parcours de danse bondés, fut payé bien au-dessus du tarif habituel.|祭りが呼び込んだあまりの人出に、旅行会社は有資格の案内人が足りなくなった。混み合う踊りの経路を数日案内できる地元の語学が達者な人は、通常よりずっと高い報酬をもらった。何万人もの踊り手がこの祭りのために通りを埋め尽くす。",
    [10],
  ),
  ev(
    "hailstorm-crop-damage", "loss", ["al"], "🧊", 230,
    "A sudden hailstorm flattens the quinoa|Una granizada repentina aplasta la quinua|Une grêle soudaine couche le quinoa|突然の雹でキヌアがなぎ倒される",
    "Clear skies turned to hail in under an hour, and a season's quinoa was flattened flat enough that the replanting cost came straight out of pocket. Storms roll off the altiplano with almost no warning at this altitude.|El cielo despejado se volvió granizo en menos de una hora, y la quinua de toda la temporada quedó tan aplastada que el costo de resembrar salió directo del bolsillo. Las tormentas bajan del altiplano casi sin previo aviso a esta altura.|Le ciel dégagé s'est changé en grêle en moins d'une heure, et le quinoa de toute la saison fut si couché qu'il fallut payer de sa poche le coût des semis à refaire. À cette altitude, les orages descendent de l'altiplano presque sans prévenir.|晴れていた空は一時間もせずに雹に変わり、その季節のキヌアはすっかりなぎ倒され、蒔き直しの費用は自腹になった。この標高では、嵐はほとんど前触れなくアルティプラーノを駆け下りてくる。",
    [11, 0, 1],
  ),
  ev(
    "paro-roadblock-delay", "loss", ["al"], "🚧", 220,
    "A road blockade delays the bus for hours|Un bloqueo de carretera retrasa el bus por horas|Un barrage routier retarde le bus pendant des heures|道路封鎖(パロ)でバスが何時間も足止め",
    "A local protest over water rights closed the highway with a line of rocks and burning tyres, and the only way through cost a long wait and a detour fare to a driver who knew the back roads. Strikes here can shut a road for a day with almost no notice.|Una protesta local por derechos de agua cerró la carretera con una hilera de piedras y llantas ardiendo, y la única manera de pasar costó una larga espera y una tarifa de desvío a un conductor que conocía los caminos secundarios.|Une manifestation locale pour les droits sur l'eau a fermé l'autoroute avec une ligne de pierres et de pneus enflammés, et la seule façon de passer coûta une longue attente et un supplément à un chauffeur connaissant les routes secondaires.|水利権をめぐる地元の抗議行動が、石と燃えるタイヤの列で幹線道路を塞いだ。通り抜けるには長い足止めと、裏道を知る運転手への迂回料金が必要だった。この土地のストライキは、ほとんど前触れなく道路を一日塞ぐこともある。",
  ),
];
