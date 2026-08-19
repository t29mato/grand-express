/**
 * エジプトの青マス・赤マスで起きる出来事(21件。増11・減10)。
 *
 * 地方コード: cairo=大カイロ / delta=ナイルデルタ / canal=スエズ運河沿い /
 * medit=地中海沿岸(西) / valley=中部エジプトのナイル渓谷 / upper=上エジプト南部
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
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

export const EGYPT_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "kiosk-cover", "gain", [], "🏪", 200,
    "Covering a shift at a corner kiosk|Cubriendo un turno en un quiosco de esquina|Assurer un service au kiosque du coin|街角の売店の番を頼まれる",
    "The owner needed to step away for a family matter and asked a familiar face to mind the cigarettes, phone credit and cold drinks for a few hours, cash box and all. Every neighbourhood in the country has at least one of these kiosks, open long past when anything larger would have shut.|El dueño tuvo que ausentarse por un asunto familiar y le pidió a una cara conocida que cuidara los cigarrillos, la recarga de móvil y las bebidas frías por unas horas, caja incluida. Cada barrio del país tiene al menos uno de estos quioscos, abiertos mucho después de que cualquier tienda más grande hubiera cerrado.|Le propriétaire a dû s'absenter pour une affaire de famille et a demandé à un visage familier de garder les cigarettes, le crédit téléphonique et les boissons fraîches pendant quelques heures, caisse comprise. Chaque quartier du pays compte au moins un de ces kiosques, ouverts bien après la fermeture de tout commerce plus grand.|店主が家族の用事で出かけることになり、顔なじみに数時間、レジごとタバコと携帯のチャージ、冷たい飲み物の番を頼んだ。国じゅうのどの町内にも、もっと大きな店がとうに閉まったあともずっと開いているこうした売店が少なくとも一軒はある。",
  ),
  ev(
    "truck-unload", "gain", [], "📦", 220,
    "Helping unload a delivery truck at dawn|Ayudando a descargar un camión de reparto al amanecer|Aider à décharger un camion de livraison à l'aube|夜明けの配送トラックの荷下ろしを手伝う",
    "The truck arrived at the market an hour early with nobody scheduled to receive it, and a few strong arms willing to work before sunrise earned cash on the spot once the crates were stacked. Markets across the country run on exactly this kind of informal, unscheduled labour.|El camión llegó al mercado una hora antes de lo previsto sin nadie programado para recibirlo, y unos brazos fuertes dispuestos a trabajar antes del amanecer ganaron dinero al momento en cuanto las cajas quedaron apiladas. Los mercados de todo el país funcionan justo con este tipo de trabajo informal y sin horario fijo.|Le camion est arrivé au marché une heure trop tôt sans personne prévu pour le réceptionner, et quelques bras solides prêts à travailler avant le lever du soleil ont gagné de l'argent sur-le-champ une fois les caisses empilées. Les marchés du pays entier tournent exactement grâce à ce genre de travail informel et non planifié.|トラックは予定より1時間早く市場に着いたが、受け取る人手の手配はまだだった。日の出前から働ける腕っぷしのある者が数人、木箱を積み終えたところでその場で現金をもらった。国じゅうの市場は、まさにこうした計画外の非正規の労働で回っている。",
  ),
  ev(
    "hidden-camera-fine", "loss", [], "📷", 170,
    "A parking fine from a camera you didn't see|Una multa de aparcamiento de una cámara que no viste|Une amende de stationnement d'une caméra qu'on n'a pas vue|見落とした監視カメラの駐車違反",
    "The spot looked ordinary enough, but a notice arrived by text a day later citing a camera mounted somewhere above the street that nobody on the ground ever seems to notice. There is no attendant to argue with any more, only an app to pay through.|El sitio parecía normal, pero un aviso llegó por mensaje al día siguiente citando una cámara montada en algún punto sobre la calle que nadie a pie de calle parece notar nunca. Ya no hay ningún agente con quien discutir, solo una aplicación con la que pagar.|L'endroit semblait tout à fait ordinaire, mais un avis est arrivé par texto le lendemain, citant une caméra montée quelque part au-dessus de la rue que personne au sol ne semble jamais remarquer. Il n'y a plus d'agent avec qui discuter, seulement une appli pour payer.|ごく普通に見える場所だったが、翌日メッセージで通知が届いた。通りのどこか上に設置され、地上からは誰も気づかないらしいカメラのしわざだという。もう文句を言う相手の係員はおらず、アプリで払うしかない。",
  ),
  ev(
    "tawla-loss", "loss", [], "🎲", 190,
    "Losing badly at tawla in a café|Perdiendo feo al tawla en una cafetería|Une lourde défaite au tawla dans un café|カフェのタウラ(バックギャモン)で負ける",
    "The dice kept favouring the man across the board, and by the third game the stakes had crept up well past what either player admitted to wanting. Backgammon boards sit on nearly every café table in the country, and losing gracefully is considered half the game.|Los dados no dejaban de favorecer al hombre del otro lado del tablero, y para la tercera partida la apuesta había subido mucho más de lo que ninguno de los dos admitía querer. Los tableros de backgammon están en casi todas las mesas de café del país, y perder con elegancia se considera la mitad del juego.|Les dés n'arrêtaient pas de favoriser l'homme en face, et à la troisième partie, la mise avait grimpé bien au-delà de ce que l'un ou l'autre admettait vouloir. Les plateaux de backgammon garnissent presque toutes les tables de café du pays, et perdre avec élégance est considéré comme la moitié du jeu.|サイコロは向かいの男にばかり味方し、三局目には賭け金がお互いに認めたくないほど膨らんでいた。バックギャモンの盤は国じゅうのほぼどのカフェのテーブルにも置かれており、潔く負けることも勝負のうちとされる。",
  ),

  // ---- cairo 大カイロ ----
  ev(
    "wedding-photo-assist", "gain", ["cairo"], "📸", 260,
    "A day assisting a wedding photographer|Un día ayudando a un fotógrafo de bodas|Une journée à assister un photographe de mariage|結婚式のカメラマン助手を務める",
    "A photographer overbooked two receptions on the same Thursday night and needed someone to carry lights and hold reflectors at the second one, no experience required beyond steady hands. Thursday evenings are wedding season every week of the year in Cairo, not just in any one month.|Un fotógrafo se pasó reservando dos recepciones la misma noche de jueves y necesitaba a alguien que cargara luces y sostuviera reflectores en la segunda, sin más experiencia requerida que manos firmes. Los jueves por la noche son temporada de bodas todas las semanas del año en El Cairo, no solo en un mes concreto.|Un photographe s'était engagé sur deux réceptions le même jeudi soir et avait besoin de quelqu'un pour porter les éclairages et tenir les réflecteurs à la seconde, sans autre expérience requise que des mains sûres. Le jeudi soir est saison des mariages toutes les semaines de l'année au Caire, pas seulement un mois donné.|あるカメラマンが同じ木曜の夜に披露宴を二件重ねて受けてしまい、二件目で照明とレフ板を持つ手を必要としていた。求められたのは経験ではなく、ぶれない手だけだった。カイロでは木曜の夜は年間を通じて毎週が結婚式シーズンで、特定の月に限らない。",
  ),
  ev(
    "phone-repair-stall", "gain", ["cairo"], "📱", 240,
    "Filling in at a phone repair stall|Cubriendo un puesto de reparación de móviles|Remplacer au comptoir de réparation de téléphones|携帯修理の屋台で代役を務める",
    "A cracked-screen replacement is quick work once you know the trick to it, and the regular technician paid well for someone to cover the counter while he ran to buy parts from a wholesaler two streets over. The stall does more business off a single busy corner than most shops manage from an actual storefront.|Cambiar una pantalla rota es trabajo rápido una vez que se sabe el truco, y el técnico habitual pagó bien a alguien que cubriera el mostrador mientras iba a comprar piezas a un mayorista dos calles más allá. El puesto hace más negocio en una sola esquina concurrida que muchas tiendas con local propio.|Remplacer un écran fissuré est un travail rapide une fois qu'on connaît l'astuce, et le technicien habituel a bien payé quelqu'un pour tenir le comptoir pendant qu'il courait acheter des pièces chez un grossiste deux rues plus loin. Le stand fait plus d'affaires sur un seul coin de rue animé que bien des boutiques avec pignon sur rue.|画面の割れたスマホの交換はコツさえ分かれば早い仕事で、いつもの修理職人は、二筋先の卸業者へ部品を買いに行くあいだカウンターを任せられる相手に良い金を払った。この屋台は、実店舗を構える店の多くより、混み合う一角だけで多くの商いをしている。",
  ),
  ev(
    "taxi-meter-dispute", "loss", ["cairo"], "🚕", 210,
    "A taxi fare argued down the wrong way|Una tarifa de taxi discutida en el sentido equivocado|Un tarif de taxi mal négocié|タクシー料金の交渉に失敗する",
    "The driver didn't turn on the meter, and by the time the destination came into view the agreed price had somehow doubled in a language the passenger only half followed. In an unfamiliar part of a sprawling city, there was no real choice but to pay it.|El conductor no encendió el taxímetro, y para cuando apareció el destino, el precio acordado se había duplicado de algún modo en un idioma que el pasajero solo entendía a medias. En una zona desconocida de una ciudad tan extensa, no había más remedio que pagarlo.|Le chauffeur n'a pas allumé le compteur, et au moment où la destination est apparue, le prix convenu avait mystérieusement doublé dans une langue que le passager ne suivait qu'à moitié. Dans un quartier inconnu d'une ville tentaculaire, il n'y avait guère d'autre choix que de payer.|運転手はメーターを入れず、目的地が見えてくる頃には、半分しか分からない言葉のやり取りのなかでいつのまにか料金が倍になっていた。広大な街の不案内な地区では、払う以外の選びようがなかった。",
  ),

  // ---- delta ナイルデルタ ----
  ev(
    "wheat-threshing-wage", "gain", ["delta"], "🌾", 230,
    "A day's wage threshing wheat by hand|Un jornal trillando trigo a mano|Un salaire journalier à battre le blé à la main|手作業で麦を脱穀する日当",
    "A family short-handed for the harvest paid by the day for anyone willing to turn straw and grain apart under the sun, work that ends with dust in every crease of clothing. The combine harvesters that do most of the country's threshing now still leave plenty of odd corners of field for hand labour.|Una familia con poca mano de obra para la cosecha pagaba por día a quien quisiera separar la paja del grano bajo el sol, un trabajo que termina con polvo en cada pliegue de la ropa. Las cosechadoras que hoy trillan la mayor parte del país todavía dejan bastantes rincones de campo para el trabajo manual.|Une famille à court de bras pour la moisson payait à la journée quiconque acceptait de séparer la paille du grain sous le soleil, un travail qui laisse de la poussière dans chaque pli des vêtements. Les moissonneuses-batteuses qui font l'essentiel du battage du pays laissent encore pas mal de coins de champ pour le travail manuel.|収穫の人手が足りない家族が、日差しの下で藁と実を手で分ける仕事に日当を出していた。終わる頃には服のあらゆる折り目に埃が入り込んでいる。いまや国の脱穀の大半を担うコンバインも、手作業に残す畑の隅はまだたくさんある。",
    [2],
  ),
  ev(
    "cotton-gin-haul", "gain", ["delta"], "🧵", 250,
    "Hauling cotton bales at a gin|Cargando fardos de algodón en la desmotadora|Charrier des balles de coton à l'égreneuse|綿繰り工場で綿花の梱を運ぶ",
    "The gin's regular haulers were short-staffed during the peak of the picking season, and moving heavy bales from truck to storage floor all afternoon paid by the load rather than the hour. The work is seasonal enough that some men only do it a few weeks a year and spend the rest doing something else entirely.|Los cargadores habituales de la desmotadora andaban escasos en pleno pico de la recolección, y mover fardos pesados del camión al almacén toda la tarde se pagaba por carga y no por hora. El trabajo es tan estacional que algunos hombres solo lo hacen unas semanas al año y el resto se dedican a otra cosa por completo.|Les porteurs habituels de l'égreneuse manquaient en plein pic de la cueillette, et déplacer de lourdes balles du camion à l'entrepôt tout l'après-midi se payait au chargement plutôt qu'à l'heure. Le travail est assez saisonnier pour que certains hommes ne le fassent que quelques semaines par an et fassent tout autre chose le reste du temps.|摘み取りの最盛期、綿繰り工場のいつもの荷役の手が足りなくなっていた。トラックから倉庫まで重い梱を運ぶ午後いっぱいの仕事は、時間ではなく運んだ量で払われた。この仕事はあまりに季節限定なので、年に数週間だけこれをして、残りはまったく別の仕事をする者もいる。",
    [4],
  ),
  ev(
    "mango-crate-spoil", "loss", ["delta"], "🥭", 200,
    "A crate of mangoes spoils before it sells|Una caja de mangos se echa a perder antes de venderse|Un cageot de mangues s'abîme avant la vente|マンゴーの木箱が売れる前に傷む",
    "The crate sat one day too long in the heat by the roadside stall, and what looked ripe in the morning had turned soft and unsellable by evening, a loss the seller absorbs as the ordinary cost of a fast-moving crop. Mango season is short enough that nobody expects to sell every crate.|La caja pasó un día de más al calor junto al puesto de la carretera, y lo que por la mañana parecía maduro se volvió blando e invendible por la tarde, una pérdida que el vendedor asume como coste normal de un cultivo que se mueve deprisa. La temporada del mango es tan corta que nadie espera vender todas las cajas.|Le cageot est resté un jour de trop dans la chaleur près de l'étal au bord de la route, et ce qui semblait mûr le matin est devenu mou et invendable le soir, une perte que le vendeur absorbe comme le coût normal d'une récolte qui file vite. La saison des mangues est si courte que personne ne s'attend à vendre chaque cageot.|道端の露店のそばで木箱が一日長く暑さにさらされ、朝には熟して見えたものが夕方には柔らかくなって売り物にならなくなった。足の早い作物の当たり前の損として、売り手はこれを飲み込む。マンゴーの季節はあまりに短く、すべての木箱が売れるとは誰も思っていない。",
    [4, 5],
  ),

  // ---- canal スエズ運河沿い ----
  ev(
    "pilot-apprentice", "gain", ["canal"], "⚓", 260,
    "A day shadowing a canal pilot|Un día acompañando a un práctico del canal|Une journée à suivre un pilote du canal|運河水先案内人に同行する日",
    "Every large ship through the canal must take on a local pilot for the transit, and an apprentice allowed to shadow one for a day picked up a stipend along with hours of watching how a single small boat guides something the size of a building. The pilots' work barely changes with the seasons; ships queue in every month of the year.|Todo buque grande que cruza el canal debe embarcar a un práctico local para el tránsito, y un aprendiz al que dejaron acompañarlo un día se llevó una pequeña paga además de horas viendo cómo una sola embarcación pequeña guía algo del tamaño de un edificio. El trabajo de los prácticos apenas cambia con las estaciones; los barcos hacen cola todos los meses del año.|Tout grand navire traversant le canal doit prendre un pilote local pour la traversée, et un apprenti autorisé à en suivre un pendant une journée a touché une petite indemnité en plus d'heures à observer comment un unique petit bateau guide quelque chose de la taille d'un immeuble. Le travail des pilotes change à peine avec les saisons ; les navires font la queue chaque mois de l'année.|運河を通るすべての大型船は通航のために地元の水先案内人を乗せなければならない。一日同行を許された見習いは、ビルほどもある船をたった一隻の小さな船が導く様子を何時間も見た手当をもらった。水先案内人の仕事は季節でほとんど変わらず、船は一年じゅうどの月も列を作って待っている。",
  ),
  ev(
    "swing-bridge-stranded", "loss", ["canal"], "🌉", 220,
    "Stuck on the wrong side while the bridge swings open|Atrapado en el lado equivocado mientras el puente gira|Coincé du mauvais côté pendant que le pont pivote|可動橋が開いているあいだ、渡れず足止め",
    "The bridge swung open to let a ship through just as the crossing was in reach, and there was nothing to do but wait out the full transit on the wrong bank, missing a connection that would not come again for hours. Locals plan around the schedule; visitors learn it the hard way once.|El puente giró para dejar pasar un barco justo cuando el cruce estaba al alcance, y no quedó más remedio que esperar todo el tránsito en la orilla equivocada, perdiendo un enlace que no volvería a pasar hasta horas después. Los locales planean en torno al horario; los visitantes lo aprenden a las malas una vez.|Le pont a pivoté pour laisser passer un navire juste au moment où la traversée était à portée, et il n'y avait rien à faire que d'attendre la fin du transit du mauvais côté, ratant une correspondance qui ne repasserait pas avant des heures. Les habitants planifient autour de l'horaire ; les visiteurs l'apprennent une fois, à leurs dépens.|渡ろうとしたまさにその時、船を通すために橋が開いてしまい、間違った岸で通過が終わるのを待つほかなかった。乗り継ぎは何時間も先までない。地元の人はこの時刻表を織り込んで動くが、訪れた人はたいてい一度痛い目を見て覚える。",
  ),
  ev(
    "dutyfree-overpay", "loss", ["canal"], "🛍️", 180,
    "Duty-free that turned out cheaper back home|Lo libre de impuestos resultó más barato en casa|Le hors-taxes qui revenait moins cher chez soi|免税品が地元のほうが安かった",
    "The appliance seemed like a bargain in the moment, boxed up and carried onto the train with some pride, only for a cousin to point out later that the same model had gone on sale at home for less the week before. The trip itself was the fun part; the maths afterward less so.|El electrodoméstico parecía una ganga en el momento, embalado y llevado al tren con cierto orgullo, hasta que un primo señaló después que el mismo modelo había salido en oferta en casa por menos la semana anterior. El viaje en sí fue la parte divertida; las cuentas después, menos.|L'appareil semblait une bonne affaire sur le moment, emballé et emporté dans le train avec une certaine fierté, jusqu'à ce qu'un cousin fasse remarquer plus tard que le même modèle avait été soldé chez soi moins cher la semaine précédente. Le voyage en lui-même était la partie amusante ; les calculs après, moins.|その場ではお買い得に見えた家電を、箱に入れて誇らしげに列車に持ち込んだが、あとでいとこに、同じ型がその前の週、地元でもっと安く売られていたと指摘された。旅そのものは楽しかったが、あとの計算はそうでもなかった。",
  ),

  // ---- medit 地中海沿岸(西) ----
  ev(
    "beach-season-waiter", "gain", ["medit"], "🍹", 240,
    "A summer season waiting tables at a beach resort|Una temporada de verano sirviendo mesas en un resort de playa|Une saison d'été à servir dans un complexe balnéaire|海辺リゾートでの夏のホール係",
    "The coast's short summer season needs far more staff than the town has year-round, and a few months of long shifts carrying trays between sunbeds pays enough to matter for the quieter months that follow. Almost everyone who works the season leaves again once the last of the visitors do.|La corta temporada de verano de la costa necesita mucho más personal del que tiene el pueblo el resto del año, y unos meses de turnos largos llevando bandejas entre las hamacas paga lo suficiente como para notarse en los meses más tranquilos que siguen. Casi todos los que trabajan la temporada se van también cuando se van los últimos visitantes.|La courte saison estivale de la côte demande bien plus de personnel que la ville n'en a le reste de l'année, et quelques mois de longs services à porter des plateaux entre les transats rapportent assez pour compter durant les mois plus calmes qui suivent. Presque tous ceux qui travaillent la saison repartent une fois les derniers visiteurs partis.|海岸の短い夏のシーズンには、町が年間を通じて抱える人数よりずっと多くの人手が要る。ビーチチェアの間をトレイを運んで歩く長い勤務の数か月は、そのあとの静かな月々のためになるだけの実入りがある。シーズンで働く者のほとんどは、最後の観光客が去るのと一緒にまた町を去っていく。",
    [3, 4],
  ),
  ev(
    "sunburn-pharmacy", "loss", ["medit"], "🌞", 160,
    "A sunburn bad enough to need the pharmacy|Una quemadura de sol lo bastante fea para ir a la farmacia|Un coup de soleil assez sévère pour aller à la pharmacie|薬局に行くほどひどい日焼け",
    "An afternoon misjudged on a sunbed left skin too painful to sleep on comfortably, and the pharmacist's aloe gel and painkillers cost more than the beach umbrella that would have prevented all of it. The coast's sun is stronger than it feels with a breeze coming off the water.|Una tarde mal calculada en la tumbona dejó la piel demasiado dolorida para dormir cómodo, y el gel de aloe y los analgésicos del farmacéutico costaron más que la sombrilla de playa que lo habría evitado todo. El sol de la costa es más fuerte de lo que parece con la brisa que llega del agua.|Un après-midi mal calculé sur un transat a laissé la peau trop douloureuse pour dormir confortablement, et le gel d'aloès et les antalgiques du pharmacien ont coûté plus cher que le parasol de plage qui aurait tout évité. Le soleil de la côte est plus fort qu'il n'y paraît avec la brise venue de l'eau.|見立てを誤った午後のビーチチェアのせいで、肌は寝るのも辛いほどヒリヒリした。薬剤師のアロエジェルと鎮痛剤の代金は、それを防げたはずのビーチパラソル代より高くついた。海から吹く風のせいで、この沿岸の日差しは体感より強い。",
  ),

  // ---- valley 中部エジプトのナイル渓谷 ----
  ev(
    "cane-harvest-wage", "gain", ["valley"], "🎋", 230,
    "A day's wage cutting cane by hand|Un jornal cortando caña a mano|Un salaire journalier à couper la canne à la main|手作業でサトウキビを刈る日当",
    "The mill needed the last of the field cleared before the cut stalks lost too much sugar sitting in the sun, and a machete and a willingness to work through the heat earned a flat day's rate paid out at sundown. Whole families sometimes work a field together during the short cutting window.|El ingenio necesitaba despejar lo último del campo antes de que los tallos cortados perdieran demasiado azúcar al sol, y un machete y ganas de trabajar bajo el calor ganaron una tarifa fija por jornada, pagada al atardecer. A veces familias enteras trabajan juntas un campo durante la corta ventana de corte.|L'usine avait besoin que le dernier du champ soit dégagé avant que les tiges coupées ne perdent trop de sucre au soleil, et une machette et la volonté de travailler sous la chaleur ont rapporté un tarif fixe à la journée, payé au coucher du soleil. Des familles entières travaillent parfois un champ ensemble pendant la courte fenêtre de coupe.|切った茎が日なたで糖分を失いすぎる前に工場が畑の最後を片付けたがっていた。鉈と暑さの中で働く意志があれば、日没時に払われる一律の日当が稼げた。短い刈り取りの期間には、一家総出で一枚の畑を手掛けることもある。",
    [9, 10, 11],
  ),
  ev(
    "nile-ferry-missed", "loss", ["valley"], "⛴️", 200,
    "The Nile ferry leaves without you|El transbordador del Nilo zarpa sin ti|Le bac du Nil part sans vous|ナイルの渡し船に置いていかれる",
    "The last crossing of the afternoon pulled away from the bank just as the far platform came into view, and the only choice left was to wait for the next one or pay a private boatman a much steeper price to cross alone. There is no bridge for a long stretch either side of here.|La última travesía de la tarde se apartó de la orilla justo cuando apareció el andén de enfrente, y no quedó más remedio que esperar a la siguiente o pagarle a un barquero particular un precio mucho más alto por cruzar solo. No hay puente en un largo tramo a ambos lados de aquí.|La dernière traversée de l'après-midi s'est écartée de la berge juste au moment où le quai d'en face apparaissait, et il ne restait plus qu'à attendre la suivante ou payer un batelier privé un prix bien plus élevé pour traverser seul. Il n'y a pas de pont sur une longue distance de part et d'autre d'ici.|向こう岸のホームが見えたちょうどその時、その日最後の便が岸を離れてしまい、次の便を待つか、一人で渡るために私船の船頭にずっと高い金を払うしかなくなった。ここから両側とも、長い区間に橋が一つもない。",
  ),
  ev(
    "water-jar-batch-sale", "gain", ["valley"], "🏺", 220,
    "Selling a batch of water jars at the roadside|Vendiendo un lote de cántaros junto a la carretera|Vendre un lot de jarres à eau au bord de la route|道端で水甕をひとまとめに売る",
    "A potter's kiln came out of the fire with more good pieces than expected, and a passing truck driver bought half of them on the spot to resell further up the highway. Business like this depends entirely on being in the right place when the kiln happens to open.|Un horno de alfarero salió del fuego con más piezas buenas de lo esperado, y un camionero que pasaba compró la mitad allí mismo para revenderlas más adelante en la carretera. Un negocio así depende por completo de estar en el lugar correcto cuando se abre el horno.|Un four de potier est sorti du feu avec plus de belles pièces que prévu, et un routier de passage en a acheté la moitié sur place pour les revendre plus loin sur la route. Ce genre de commerce dépend entièrement d'être au bon endroit au moment où le four s'ouvre.|陶工の窯から、思っていたより出来の良い品が多く出た。通りがかりのトラック運転手がその場でその半分を買い、幹線道路の先で転売した。この手の商いは、窯が開くまさにその時、そこにいるかどうかにすべてがかかっている。",
  ),

  // ---- upper 上エジプト南部 ----
  ev(
    "felucca-guide-tip", "gain", ["upper"], "⛵", 250,
    "Tips from guiding a felucca through the First Cataract's narrows|Propinas por guiar una falucha por los estrechos de la Primera Catarata|Pourboires pour guider une felouque à travers les étroits de la Première Cataracte|第一急湍の狭い水路でファルーカを操って稼ぐ心づけ",
    "The channel between the granite islands near Aswan takes real local knowledge to read, and a boatman who can point out which rock sits just under the surface earns a grateful tip on top of the fare from passengers who felt the hull scrape a little too close for comfort elsewhere. The rocks have not moved in longer than anyone can say; the water level around them has, thanks to the dam upstream.|El canal entre las islas de granito cerca de Asuán exige conocimiento local de verdad para leerlo, y un barquero capaz de señalar qué roca queda justo bajo la superficie gana una propina agradecida además de la tarifa, de pasajeros que sintieron el casco rozar algo más cerca de lo cómodo en otro tramo. Las rocas no se han movido en más tiempo del que nadie puede precisar; el nivel del agua a su alrededor sí, gracias a la presa río arriba.|Le chenal entre les îles de granit près d'Assouan exige une vraie connaissance locale pour être lu, et un batelier capable de désigner quel rocher affleure juste sous la surface gagne un pourboire reconnaissant en plus du tarif, de passagers qui ont senti la coque frotter d'un peu trop près ailleurs. Les rochers n'ont pas bougé depuis plus longtemps que quiconque ne saurait dire ; le niveau de l'eau autour d'eux, si, grâce au barrage en amont.|アスワン近くの花崗岩の島々のあいだの水路を読むには、本物の土地勘が要る。すぐ水面下にある岩を指し示せる船頭は、ほかの場所で船底が際どく擦れるのを感じた乗客から、運賃に加えて感謝のチップをもらえる。岩そのものは誰にも言えないほど長く動いていないが、その周りの水位は上流のダムのおかげで変わった。",
  ),
  ev(
    "camel-market-haggle-loss", "loss", ["upper"], "🐫", 210,
    "A camel bargain gone wrong at the Tuesday market|Una compra de camello que sale mal en el mercado del martes|Un marché de chameau qui tourne mal au marché du mardi|火曜の市でのラクダ取引に失敗する",
    "The animal looked sound at a glance, but a more practised eye would have caught the limp that only showed up an hour down the road, by which point the seller was long gone into the crowd. Haggling here rewards patience more than confidence.|El animal parecía sano a simple vista, pero un ojo más experto habría notado la cojera que solo se hizo evidente una hora carretera adelante, para cuando el vendedor ya se había perdido entre la multitud. Regatear aquí premia más la paciencia que la confianza.|L'animal semblait sain au premier coup d'œil, mais un œil plus exercé aurait repéré la boiterie qui n'est apparue qu'une heure plus loin sur la route, quand le vendeur avait depuis longtemps disparu dans la foule. Marchander ici récompense davantage la patience que l'assurance.|一見健康そうに見えたが、もっと目の利く者なら、道を一時間行った先で初めて出た足の引きずりに気づいただろう。その頃には売り手はとうに人混みに紛れて消えていた。ここでの値切り交渉は、自信よりも辛抱強さのほうが報われる。",
  ),
  ev(
    "cane-wagon-loading-wage", "gain", ["upper"], "🚂", 240,
    "A day's wage loading cane wagons at harvest|Un jornal cargando vagones de caña en la cosecha|Un salaire journalier à charger les wagons de canne pendant la récolte|収穫期にサトウキビの貨車へ荷積みする日当",
    "The seasonal narrow-gauge line only runs a few months a year, and loading cut cane onto its small wagons before the mill's daily deadline paid a flat rate regardless of how the sun beat down. The track itself will be half lifted again once the season ends.|La línea estacional de vía estrecha solo funciona unos meses al año, y cargar la caña cortada en sus pequeños vagones antes del plazo diario del ingenio pagaba una tarifa fija sin importar cuánto apretara el sol. La propia vía quedará medio levantada de nuevo en cuanto acabe la temporada.|La ligne saisonnière à voie étroite ne fonctionne que quelques mois par an, et charger la canne coupée sur ses petits wagons avant l'heure limite quotidienne de l'usine payait un tarif fixe, quelle que soit l'ardeur du soleil. La voie elle-même sera à moitié redémontée une fois la saison finie.|季節限定の狭軌線は年に数か月しか走らない。工場のその日の締め切りまでに刈ったサトウキビを小さな貨車へ積み込む仕事は、日差しの強さに関わらず一律の日当が出た。この線路自体、シーズンが終わればまた半分は撤去される。",
    [9, 10, 11],
  ),
];
