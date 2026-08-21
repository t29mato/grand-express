/**
 * キューバの青マス・赤マスで起きる出来事(16件。増8・減8)。
 *
 * 地方コード: oc=オクシデンテ(西部) / ce=セントロ(中部) / or=オリエンテ(東部)
 *
 * 地方を指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、3地方それぞれに4件(増2・減2)、土地の産業や気候に結びつけて置いている。
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

export const CUBA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(4件) ----
  ev(
    "guarapo-stand-tip", "gain", [], "🥤", 190,
    "A day running the guarapo press|Un día en la trapiche del guarapo|Une journée au pressoir à guarapo|グアラポ搾り機を回す一日",
    "The hand-cranked press was short a set of arms on a hot afternoon, and turning the roller to squeeze cold, green guarapo out of raw cane paid in coins as fast as cups went out. Nobody who tastes it warm ever asks for it that way twice.|El trapiche de manivela andaba corto de brazos en una tarde calurosa, y girar el rodillo para exprimir guarapo verde y frío de la caña cruda pagaba en monedas tan rápido como salían los vasos. A nadie que lo prueba tibio se le ocurre pedirlo así dos veces.|Le pressoir à manivelle manquait de bras par un après-midi chaud, et tourner le rouleau pour presser du guarapo vert et froid à partir de la canne crue payait en pièces aussi vite que sortaient les gobelets. Personne qui le goûte tiède n'en redemande de cette façon.|暑い午後、手回しの搾り機は人手が足りなかった。生のサトウキビから冷たく青い匂いのグアラポを搾り出すためにローラーを回すと、コップが出ていく端から小銭が入ってきた。ぬるいまま味わった人は二度とそれで頼まない。",
  ),
  ev(
    "almendron-push-tip", "gain", [], "🚗", 170,
    "Push-starting a stalled almendrón|Empujando un almendrón varado|Pousser un almendrón en panne|止まった旧型アメ車を押しがけする",
    "A 1950s almendrón running shared-taxi routes stalled at a light with a full load of passengers, and a shoulder against the trunk for half a block got the engine coughing back to life. Keeping one of these cars running at all is a small daily miracle of improvised parts.|Un almendrón de los años cincuenta que hacía de taxi colectivo se paró en un semáforo con la carga completa de pasajeros, y poner el hombro contra el maletero media cuadra bastó para que el motor volviera a toser en marcha. Mantener uno de estos carros funcionando es un pequeño milagro diario de piezas improvisadas.|Un almendrón des années 1950 assurant un service de taxi collectif a calé à un feu avec sa pleine charge de passagers, et pousser sur le coffre pendant un demi-pâté de maisons a suffi à faire tousser le moteur de nouveau. Garder l'une de ces voitures en état de marche est un petit miracle quotidien de pièces improvisées.|1950年代製の乗合タクシー「アルメンドロン」が満員の客を乗せたまま信号で止まってしまい、トランクを半ブロック押しただけでエンジンが咳き込みながら息を吹き返した。この手の車を一台でも走らせ続けるのは、間に合わせの部品による日々のささやかな奇跡である。",
  ),
  ev(
    "market-pickpocket", "loss", [], "👛", 200,
    "A pickpocket works the crowded market|Un carterista trabaja el mercado abarrotado|Un pickpocket sévit au marché bondé|混み合う市場ですりに遭う",
    "A shove between two stalls was over before it registered as anything, and only at the next stall does the missing weight in a pocket become obvious. Nobody nearby noticed a thing over the noise of vendors calling out prices.|Un empujón entre dos puestos pasó antes de que se notara como algo, y solo en el siguiente puesto se hace evidente el peso que falta en un bolsillo. Nadie cerca notó nada entre el ruido de los vendedores pregonando precios.|Une bousculade entre deux étals est passée avant même d'être remarquée, et ce n'est qu'à l'étal suivant que le poids manquant dans une poche devient évident. Personne aux alentours n'a rien remarqué dans le vacarme des vendeurs criant leurs prix.|露店の合間でぶつかられた程度にしか感じなかったが、次の店に着いてはじめてポケットの軽さに気づいた。値段を呼び込む売り子たちの声にまぎれて、近くの誰も気づかなかった。",
  ),
  ev(
    "pelota-bet-loss", "loss", [], "⚾", 180,
    "Losing a bet on the pelota game|Perdiendo una apuesta por el juego de pelota|Perdre un pari sur le match de pelota|野球(ペロタ)の賭けに負ける",
    "The neighbourhood argued all game long about who had the better lineup, and settling up after a late error handed the other side the win cost more than anyone had meant to risk. Pelota gets argued over on every corner, and money changes hands more often than anyone officially admits.|El barrio discutió todo el partido sobre quién tenía mejor alineación, y saldar cuentas después de que un error tardío le diera la victoria al otro bando costó más de lo que nadie pensaba arriesgar. De pelota se discute en cada esquina, y el dinero cambia de manos más de lo que nadie admite oficialmente.|Le quartier a débattu tout le match de qui avait le meilleur alignement, et régler ses comptes après qu'une erreur tardive a donné la victoire à l'autre camp a coûté plus que quiconque ne comptait risquer. On discute de pelota à chaque coin de rue, et l'argent change de main plus souvent que quiconque ne l'admet officiellement.|試合中ずっと、どちらの打線が上かで近所は言い争っていた。終盤のエラーで相手側に勝ちが転がり込んだあと精算すると、思っていたより多くを賭けていたことになった。ペロタ(野球)はどの街角でも議論の的で、公には認められている以上に頻繁に金が動く。",
  ),

  // ---- oc オクシデンテ(西部) ----
  ev(
    "vega-leaf-sorting", "gain", ["oc"], "🍂", 240,
    "Sorting Vuelta Abajo leaf by hand|Clasificando hoja de Vuelta Abajo a mano|Trier à la main la feuille de Vuelta Abajo|ビエルタ・アバホの葉を手で選別する",
    "A grower short on hands before a buyer's visit paid well for quick fingers that could sort a season's leaf into wrapper, binder and filler grades without tearing any of it. The finest leaves are worth many times what the roughest bundle brings.|Un cultivador corto de manos antes de la visita de un comprador pagó bien por dedos rápidos que pudieran clasificar la hoja de la temporada en capa, capote y tripa sin romper ninguna. Las mejores hojas valen muchas veces lo que trae el atado más tosco.|Un cultivateur en manque de bras avant la visite d'un acheteur a bien payé des doigts rapides capables de trier la feuille de la saison en cape, sous-cape et tripe sans en déchirer aucune. Les meilleures feuilles valent bien des fois ce que rapporte le lot le plus grossier.|買い付け人の訪問を前に人手が足りなかった栽培農家が、その季節の葉を破らずに巻き葉・中巻き葉・中身用に手早く選り分けられる指に、良い賃金を払ってくれた。最上級の葉は、いちばん粗末な束の何倍もの値がつく。",
  ),
  ev(
    "havana-old-town-tip", "gain", ["oc"], "🎷",
    260,
    "A generous tip guiding tourists through Old Havana|Una propina generosa guiando turistas por La Habana Vieja|Un généreux pourboire pour guider des touristes dans La Havane coloniale|旧市街ハバナを案内した気前のよいチップ",
    "A couple of visitors, lost among the colonial squares, paid well for an hour of pointing out balconies, back streets and a good place to hear live music. Old Havana's UNESCO-listed core draws more foreign currency on foot than almost anywhere else on the island.|Una pareja de visitantes, perdida entre las plazas coloniales, pagó bien por una hora señalando balcones, callejones y un buen lugar para oír música en vivo. El casco declarado Patrimonio de la Humanidad de La Habana Vieja atrae a pie más divisa extranjera que casi cualquier otro lugar de la isla.|Un couple de visiteurs, perdu parmi les places coloniales, a bien payé pour une heure à montrer balcons, ruelles et un bon endroit pour entendre de la musique live. Le centre classé UNESCO de La Havane coloniale attire à pied plus de devises étrangères que presque partout ailleurs sur l'île.|植民地時代の広場の間で迷っていた旅行者の二人連れが、バルコニーや裏路地、生演奏の聴ける良い店を一時間案内しただけで気前よく払ってくれた。世界遺産の旧市街ハバナは、島のほかのどこよりも徒歩の観光客から多くの外貨を集める。",
  ),
  ev(
    "apagon-candle-run", "loss", ["oc"], "🕯️", 200,
    "A blackout forces a run for candles and fuel|Un apagón obliga a salir por velas y combustible|Une coupure de courant force à courir chercher bougies et carburant|停電で蝋燭と燃料を探し回る",
    "The power dropped without warning, as it does often enough that most households keep a stash for exactly this, and a run to whichever neighbour still had spare candles and a can of fuel for the generator cost more than a full bill would have.|La luz se fue sin aviso, como pasa lo bastante seguido para que la mayoría de los hogares tenga una reserva justo para esto, y correr a buscar al vecino que aún tuviera velas de sobra y un bidón de combustible para el generador costó más de lo que habría costado una factura completa.|Le courant a coupé sans prévenir, comme cela arrive assez souvent pour que la plupart des foyers gardent une réserve exprès pour ça, et courir chez le voisin qui avait encore des bougies de côté et un bidon de carburant pour le générateur a coûté plus cher qu'une facture complète.|前触れもなく電気が落ちた。よくあることなので大抵の家はこのために蓄えを持っているが、蝋燭と発電機用の燃料をまだ持っている隣人を探して駆け回ると、電気代を丸ごと払うよりも高くついた。",
  ),
  ev(
    "batabano-storm-provisions", "loss", ["oc"], "🌧️", 190,
    "A storm warning forces last-minute provisioning|Un aviso de tormenta obliga a abastecerse a última hora|Une alerte de tempête force à s'approvisionner à la dernière minute|嵐の警報で駆け込みの買い出し",
    "Word came down the coast that a storm was tracking closer than expected, and water, batteries and whatever tinned food was left on the shelves went fast at whatever price the last shop still open was asking. Gulf-facing towns like this one watch the sky more than most.|La noticia bajó por la costa de que una tormenta se acercaba más de lo previsto, y el agua, las pilas y la comida enlatada que quedaba en los estantes volaron al precio que pidiera la última tienda todavía abierta. Pueblos frente al golfo como este vigilan el cielo más que la mayoría.|La nouvelle a couru le long de la côte qu'une tempête se rapprochait plus vite que prévu, et l'eau, les piles et le peu de conserves restant sur les étagères sont partis vite, au prix demandé par la dernière boutique encore ouverte. Les villes tournées vers le golfe comme celle-ci surveillent le ciel plus que la plupart.|嵐が予想より近くを通ると海岸沿いに知らせが伝わり、棚に残っていた水・電池・缶詰は、まだ開いている最後の店がつける値段のままどんどん売れていった。この町のように湾に面した町は、たいていの土地よりも空を気にかけている。",
  ),

  // ---- ce セントロ(中部) ----
  ev(
    "zafra-quota-bonus", "gain", ["ce"], "🌾", 250,
    "A bonus for beating the cutting quota|Un bono por superar la norma de corte|Une prime pour avoir dépassé le quota de coupe|刈り取りノルマを超えた分の褒賞",
    "The mill posted a bonus for any brigade that beat its daily cane quota, and a hard push through the last hour of daylight put one crew well past the mark before the weigh station closed for the night. Every extra tonne cut is one less the next shift has to make up.|El ingenio ofreció un bono para la brigada que superara la norma diaria de corte, y un último empujón en la hora final de luz dejó a una cuadrilla bien por encima de la marca antes de que cerrara la báscula por la noche. Cada tonelada extra cortada es una menos que tiene que recuperar el próximo turno.|L'usine a offert une prime à toute brigade dépassant son quota quotidien de coupe, et un dernier effort dans la dernière heure de jour a mené une équipe bien au-delà de la marque avant la fermeture nocturne de la bascule. Chaque tonne coupée en plus est une tonne de moins pour l'équipe suivante.|工場は一日のノルマを超えた作業班に褒賞を出すと告げ、日暮れ前の最後の一時間を踏ん張った班は、夜に計量所が閉まる前に目標を大きく超えた。多く刈った分だけ、次の班が挽回する量は減る。",
  ),
  ev(
    "parrandas-food-stall", "gain", ["ce"], "🎆", 220,
    "Selling food through the Parrandas all-nighter|Vendiendo comida durante la noche entera de las Parrandas|Vendre à manger pendant la nuit blanche des Parrandas|夜通しのパランダスで軽食を売る",
    "The plaza stayed packed from dusk until the fireworks finally stopped near dawn, and a stall selling fritters and coffee to the crowd waiting between floats barely had time to restock. Remedios empties its kitchens onto the street once a year for exactly this.|La plaza siguió abarrotada desde el atardecer hasta que los fuegos por fin cesaron cerca del amanecer, y un puesto vendiendo frituras y café a la multitud que esperaba entre carrozas apenas tuvo tiempo de reponer. Remedios vuelca sus cocinas a la calle una vez al año justo para esto.|La place est restée bondée du crépuscule jusqu'à ce que les feux d'artifice cessent enfin près de l'aube, et un étal vendant beignets et café à la foule attendant entre les chars a eu à peine le temps de se réapprovisionner. Remedios vide ses cuisines dans la rue une fois par an, exactement pour ça.|夕暮れから花火がようやく止む夜明け近くまで広場は人でいっぱいで、山車の合間を待つ人々にフリトゥーラとコーヒーを売る屋台は補充する暇もないほどだった。レメディオスは年に一度、まさにこのために台所ごと通りへ繰り出す。",
  ),
  ev(
    "cane-fire-evacuation", "loss", ["ce"], "🔥", 230,
    "A cane-field fire forces a sudden evacuation|Un incendio en el cañaveral obliga a una evacuación repentina|Un feu de champ de canne force une évacuation soudaine|サトウキビ畑の火事で急な避難",
    "Smoke rolled over the road faster than anyone expected, and getting clear of the field before the fire brigade arrived meant leaving behind tools and a morning's cut cane that nobody could go back for in time. Dry-season cane fires spread fast and are put out even faster, but not always before something is lost.|El humo cruzó la carretera más rápido de lo esperado, y ponerse a salvo del campo antes de que llegaran los bomberos significó dejar atrás herramientas y la caña cortada esa mañana, que nadie pudo ir a buscar a tiempo. Los incendios de caña en temporada seca se propagan rápido y se apagan aún más rápido, pero no siempre antes de perder algo.|La fumée a traversé la route plus vite que prévu, et s'éloigner du champ avant l'arrivée des pompiers a signifié abandonner outils et canne coupée le matin même, que personne n'a pu récupérer à temps. Les feux de canne en saison sèche se propagent vite et s'éteignent encore plus vite, mais pas toujours avant qu'on y perde quelque chose.|思っていたより早く煙が道を覆い、消防が来る前に畑から離れるには、道具とその朝に刈ったばかりのサトウキビを置いていくしかなかった。乾季のサトウキビ火災は速く広がり、さらに速く消し止められるが、何かを失う前に必ず間に合うとは限らない。",
  ),
  ev(
    "counterfeit-cup-note", "loss", ["ce"], "💵", 180,
    "A counterfeit bill turns up in the change|Un billete falso aparece entre el vuelto|Un faux billet apparaît dans la monnaie|釣り銭に偽札が混ざっていた",
    "The note looked fine under the market's fluorescent lights, and only a shopkeeper's practised rub of the watermark later gave it away as fake. Counterfeit pesos circulate often enough in busy inland markets that vendors check bills almost without thinking.|El billete parecía correcto bajo las luces fluorescentes del mercado, y solo el frotar experto de un tendero sobre la marca de agua lo delató después como falso. Los pesos falsos circulan lo bastante en los mercados concurridos del interior como para que los vendedores revisen los billetes casi sin pensarlo.|Le billet semblait correct sous les néons du marché, et seul le frottement expérimenté d'un commerçant sur le filigrane l'a trahi plus tard comme faux. De faux pesos circulent assez souvent dans les marchés animés de l'intérieur pour que les vendeurs vérifient les billets presque sans y penser.|市場の蛍光灯の下では本物に見えたが、あとで店主が透かしを指で擦って確かめ、偽物だと分かった。内陸の混み合う市場では偽ペソ札がそれなりに出回っており、店主たちはほとんど無意識に紙幣を確かめる。",
  ),

  // ---- or オリエンテ(東部) ----
  ev(
    "moa-extra-shift", "gain", ["or"], "⛏️", 260,
    "An extra shift loading nickel concentrate|Un turno extra cargando concentrado de níquel|Un quart supplémentaire à charger du concentré de nickel|ニッケル精鉱の積み込みで余分の勤務",
    "A ship waiting in Moa's harbor needed its hold filled before the tide turned, and a call went out for extra hands willing to work through the night shift for double pay. The ore has to keep moving whether or not the regular crew is at full strength.|Un barco esperando en el puerto de Moa necesitaba llenar su bodega antes de que cambiara la marea, y se llamó a manos extra dispuestas a trabajar el turno de noche a doble paga. El mineral tiene que seguir moviéndose, esté o no la cuadrilla habitual a plena fuerza.|Un navire attendant dans le port de Moa devait remplir sa cale avant le changement de marée, et on a appelé des bras supplémentaires prêts à travailler le quart de nuit à double paie. Le minerai doit continuer de bouger, que l'équipe habituelle soit ou non au complet.|モアの港で待つ船が、潮が変わる前に船倉を満たす必要に迫られ、夜勤を倍の賃金でこなす余分の人手が急遽求められた。通常の作業班が足りていようといまいと、鉱石は動かし続けなければならない。",
  ),
  ev(
    "son-street-busking", "gain", ["or"], "🎸", 210,
    "Playing son on a Santiago street corner|Tocando son en una esquina de Santiago|Jouer du son au coin d'une rue à Santiago|サンティアゴの街角でソンを弾く",
    "A tres and a pair of clave sticks drew a small crowd on a warm evening, and enough coins landed in the open guitar case to cover more than one round of drinks afterward. Son cubano was born on streets very much like this one.|Un tres y un par de claves reunieron a un pequeño público en una noche cálida, y cayeron suficientes monedas en el estuche abierto de la guitarra como para pagar más de una ronda después. El son cubano nació en calles muy parecidas a esta.|Un tres et une paire de claves ont réuni un petit public par une soirée chaude, et assez de pièces sont tombées dans l'étui ouvert de la guitare pour payer plus d'une tournée après. Le son cubain est né dans des rues très semblables à celle-ci.|暖かい晩、トレスとクラベスの一対が小さな人だかりを引き寄せ、開いたギターケースには後で何杯分もの飲み代をまかなえるだけの小銭が集まった。ソン・クバーノは、まさにこんな通りで生まれた。",
  ),
  ev(
    "hurricane-shutter-cost", "loss", ["or"], "🪵", 220,
    "Boarding up windows ahead of a hurricane|Poniendo tablas en las ventanas antes de un huracán|Condamner les fenêtres avant un ouragan|ハリケーンに備えて窓に板を打ち付ける",
    "With the storm still two days out, plywood and nails were already getting harder to find, and paying above the usual price felt better than gambling on the shops still having any left tomorrow. Nobody on this coast waits until the last morning to decide.|Con la tormenta todavía a dos días, la madera y los clavos ya escaseaban, y pagar por encima del precio habitual se sintió mejor que apostar a que las tiendas todavía tuvieran algo mañana. Nadie en esta costa espera hasta la última mañana para decidir.|La tempête étant encore à deux jours, contreplaqué et clous devenaient déjà plus difficiles à trouver, et payer au-dessus du prix habituel semblait préférable à parier que les boutiques en auraient encore demain. Personne sur cette côte n'attend le dernier matin pour se décider.|嵐はまだ二日先だというのに、合板と釘はすでに手に入りにくくなっていた。明日も店に残っている保証に賭けるより、通常より高い値段を払うほうがましだった。この海岸沿いでは、誰も最後の朝まで決断を待たない。",
  ),
  ev(
    "marimbula-repair", "loss", ["or"], "🎵", 200,
    "A marímbula's metal keys snap before a gig|Se rompen las lengüetas de una marímbula antes de un toque|Les languettes d'une marímbula cassent avant un concert|演奏前にマリンブラの金属片が折れる",
    "Two of the bass keys sheared off during rehearsal, and getting a marímbula playable again before the changüí group's evening show meant paying a metalworker to fashion replacements on short notice. A broken bass line is a problem the whole band feels.|Dos de las lengüetas de bajo se partieron durante el ensayo, y devolver la marímbula a un estado tocable antes del toque nocturno del grupo de changüí significó pagarle a un herrero para que hiciera repuestos con poco margen. Una línea de bajo rota es un problema que siente todo el grupo.|Deux des languettes de basse se sont cassées pendant la répétition, et remettre une marímbula en état de jouer avant le concert du soir du groupe de changüí a signifié payer un ferronnier pour en fabriquer des remplaçantes dans l'urgence. Une ligne de basse cassée est un problème que sent tout le groupe.|リハーサル中に低音用の金属片が二枚折れてしまい、チャンギー楽団のその晩の演奏までにマリンブラを弾ける状態に戻すには、急いで金属工に代わりを作ってもらうしかなかった。低音が壊れると、バンド全体がその穴を感じることになる。",
  ),
];
