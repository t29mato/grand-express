/**
 * ニュージーランドの青マス・赤マスで起きる出来事(28件。増14・減14)。
 *
 * 地方コード: akl=オークランド・ノースランド / wko=ワイカト・ベイオブプレンティ /
 * cni=中央北島・火山台地 / egc=イーストコースト・ホークス・ベイ /
 * tar=タラナキ・ワンガヌイ / wgn=ウェリントン・下部北島 /
 * top=サウス島北端 / cby=カンタベリー / wcs=西海岸 / ota=オタゴ /
 * fld=フィヨルドランド・サウスランド
 *
 * 地方も月も指定しない出来事を6件(増3・減3)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける。そのうえで、11地方それぞれに
 * 1組(増1・減1)を、土地の産業や名物に結びつけて置いている。
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

export const NEWZEALAND_MONEY_EVENTS = [
  // ---- 全国どこでも・通年 ----
  ev(
    "film-extra", "gain", [], "🎬", 240,
    "A day's work as a film extra|Un día de trabajo como extra de cine|Une journée de travail comme figurant|映画のエキストラの日雇い",
    "A production scouting the area needed a crowd of background faces for one long day of filming, and the pay came with a boxed lunch and a warning not to look at the camera. Between big trilogies and smaller local productions, a film crew setting up somewhere in the country is rarely far away.|Una producción que buscaba localizaciones en la zona necesitó una multitud de rostros de fondo para un largo día de rodaje, y la paga incluyó un almuerzo en caja y la advertencia de no mirar a la cámara. Entre grandes trilogías y producciones locales más pequeñas, rara vez hay lejos un rodaje instalándose en algún punto del país.|Une production en repérage dans la région avait besoin d'une foule de figurants pour une longue journée de tournage, et la paie est venue avec un repas en boîte et l'avertissement de ne pas regarder la caméra. Entre grandes trilogies et productions locales plus modestes, un tournage qui s'installe quelque part dans le pays n'est jamais bien loin.|この土地でロケハンをしていた撮影隊が、一日がかりの撮影のために大勢の背景の顔を必要としていた。給金には弁当箱の昼食と「カメラを見るな」という注意が付いてきた。大作三部作から小さな地元制作まで、どこかで撮影隊がセットを組んでいることは珍しくない。",
  ),
  ev(
    "honesty-box", "gain", [], "🥕", 160,
    "Selling surplus veges from the roadside honesty box|Vendiendo verduras sobrantes en el puesto de honestidad junto a la carretera|Vendre des légumes en trop à l'étal de la confiance au bord de la route|道端の無人販売所で余った野菜を売る",
    "A neighbour's unstaffed roadside stall was overflowing with more silverbeet and feijoas than the honesty box could hold, and minding it for an afternoon while they were away earned a cut of the coins left in the tin. Nobody in the district has ever seriously suggested locking it up.|El puesto sin encargado de un vecino junto a la carretera rebosaba de más acelgas y feijoas de las que cabían en la caja de honestidad, y cuidarlo una tarde mientras él estaba fuera dio derecho a una parte de las monedas dejadas en la lata. En el distrito nadie ha propuesto nunca en serio cerrarlo con llave.|L'étal sans surveillant d'un voisin au bord de la route débordait de plus de blettes et de feijoas que la boîte de la confiance ne pouvait en contenir, et le garder un après-midi pendant son absence a valu une part des pièces laissées dans la boîte. Personne dans le coin n'a jamais sérieusement proposé de le cadenasser.|近所の無人販売所には、正直箱に入りきらないほどのフダンソウとフェイジョアがあふれていた。留守のあいだ午後だけ見張りをしたところ、缶に入っていた小銭のいくらかをもらえた。この地区で本気で鍵をかけようと言い出した者はいまだにいない。",
  ),
  ev(
    "generous-tourist", "gain", [], "🧭", 180,
    "A tourist overpays and waves off the change|Un turista paga de más y rechaza el cambio|Un touriste paie trop et refuse la monnaie|旅行者が余分に払っておつりを断る",
    "A visitor, delighted after finally finding the trailhead with directions given in person rather than an app, pressed a note into hand and insisted on not waiting for change. Print maps still beat a dead phone battery at the end of a long back-country day.|Un visitante, encantado tras encontrar por fin el inicio del sendero gracias a indicaciones dadas en persona y no por una app, puso un billete en la mano e insistió en no esperar el cambio. Un mapa en papel aún gana a un móvil sin batería al final de un largo día en el monte.|Un visiteur, ravi d'avoir enfin trouvé le départ du sentier grâce à des indications données de vive voix plutôt que par une appli, a glissé un billet dans la main en refusant d'attendre la monnaie. Une carte papier bat encore un téléphone à plat au bout d'une longue journée en pleine nature.|アプリではなく直接口頭で道を教えてもらい、ようやく登山口を見つけて喜んだ旅行者が、おつりはいらないと紙幣を握らせてきた。長い一日の山歩きの終わりには、紙の地図のほうが電池切れの携帯よりまだ頼りになる。",
  ),
  ev(
    "gravel-chip", "loss", [], "🪨", 170,
    "A stone chip on a gravel back road|Una piedra que salta en un camino de grava|Un éclat de gravier sur une route de campagne|砂利道で跳ねた石が当たる",
    "A truck coming the other way on a narrow unsealed road threw up a stone that starred the windscreen with a soft crack, right in the driver's line of sight. Most rental agreements quietly exclude gravel-road damage from the standard cover, a detail read only after the fact.|Un camión que venía en sentido contrario por un camino sin asfaltar levantó una piedra que estrelló el parabrisas con un chasquido, justo en la línea de visión del conductor. La mayoría de los contratos de alquiler excluyen en letra pequeña los daños en caminos de grava de la cobertura estándar.|Un camion venant en sens inverse sur une route étroite non goudronnée a projeté une pierre qui a étoilé le pare-brise avec un craquement, en plein dans le champ de vision du conducteur. La plupart des contrats de location excluent discrètement les dégâts sur route de gravier de l'assurance standard.|狭い未舗装路を対向してきたトラックが跳ね上げた石が、運転席の視界のど真ん中でフロントガラスを軽い音とともに割った。レンタカーの契約書の多くは、砂利道での損傷を標準補償からひっそり除外している。それに気づくのはたいてい後になってからだ。",
  ),
  ev(
    "rugby-bet", "loss", [], "🏉", 200,
    "Losing a bet on the rugby|Perdiendo una apuesta de rugby|Perdre un pari sur le rugby|ラグビーの賭けに負ける",
    "The All Blacks looked certain to win right up until the final ten minutes, and the friendly wager made at kickoff suddenly stopped feeling like free money. Half the country seems to have an opinion on the starting fifteen, and all of it goes quiet at once when a match turns.|Los All Blacks parecían seguros de ganar hasta los últimos diez minutos, y la apuesta amistosa hecha al empezar el partido dejó de parecer dinero fácil de golpe. Medio país parece tener opinión sobre el quince titular, y todo se calla a la vez cuando el partido se tuerce.|Les All Blacks semblaient promis à la victoire jusqu'aux dix dernières minutes, et le pari amical fait au coup d'envoi a soudain cessé de ressembler à de l'argent facile. La moitié du pays semble avoir un avis sur le quinze titulaire, et tout se tait d'un coup quand le match bascule.|オールブラックスは最後の10分まで勝利は確実に見えたが、キックオフのときに交わした友人との賭けは、急にただの棚ぼたではなくなった。国の半分がスターティングメンバーについて一家言持っているようだが、試合が傾いた瞬間、皆がいっせいに黙り込む。",
  ),
  ev(
    "petrol-spike", "loss", [], "⛽", 190,
    "Fuel prices spike right before a long drive|El precio del combustible sube justo antes de un viaje largo|Le prix du carburant grimpe juste avant un long trajet|長距離ドライブの直前に燃料代が高騰する",
    "The price board at the pump had climbed noticeably overnight, just as a long stretch of state highway with no other station for a hundred kilometres made filling up non-negotiable. Distances between towns here are longer than the map suggests, and so is the tank needed to cover them.|El panel de precios del surtidor había subido notablemente de la noche a la mañana, justo cuando un largo tramo de carretera nacional sin otra gasolinera en cien kilómetros hacía obligatorio llenar el depósito. Las distancias entre pueblos aquí son más largas de lo que sugiere el mapa, y también lo es el depósito necesario para cubrirlas.|Le panneau des prix à la pompe avait nettement grimpé du jour au lendemain, juste au moment où un long tronçon de route nationale sans autre station avant cent kilomètres rendait le plein incontournable. Les distances entre les villes ici sont plus longues que ne le suggère la carte, tout comme le réservoir nécessaire pour les couvrir.|給油所の値段表は一晩でめだって上がっていたが、この先100kmはガソリンスタンドの無い幹線道路が続くため、給油を諦めるわけにはいかなかった。この国の町と町の距離は地図が示すより長く、それを走りきるための燃料タンクも同じだけ大きい。",
  ),

  // ---- akl オークランド・ノースランド ----
  ev(
    "yacht-crew", "gain", ["akl"], "⛵", 260,
    "Crewing a charter yacht for the afternoon|Tripulando un yate chárter por la tarde|Faire équipage sur un voilier de location pour l'après-midi|午後だけチャーターヨットの乗組員になる",
    "A skipper short a deckhand on the Waitematā Harbour offered cash on the spot for anyone who knew how to trim a sail without being asked twice, and the City of Sails lived up to its name for one long, salty afternoon. Auckland is said to have more boats per person than almost anywhere else on Earth.|Un patrón al que le faltaba un tripulante en el puerto de Waitematā ofreció efectivo al momento a quien supiera cazar una vela sin que se lo repitieran dos veces, y la Ciudad de las Velas hizo honor a su nombre durante una larga tarde salada. Se dice que Auckland tiene más barcos por habitante que casi cualquier otro lugar del planeta.|Un skipper à court d'un matelot sur le port de Waitematā a offert de l'argent comptant sur-le-champ à qui savait border une voile sans se le faire répéter, et la Ville des voiles a porté son nom tout un long après-midi salé. On dit qu'Auckland compte plus de bateaux par habitant que presque partout ailleurs sur Terre.|ワイテマタ港で甲板員が足りなかった船長は、二度言われずとも帆の調整ができる者にその場で現金を提示した。「帆の街」はその名にふさわしい、長く潮の香りのする午後になった。オークランドは人口あたりの船の数で地球上でも指折りだと言われる。",
  ),
  ev(
    "bridge-jam", "loss", ["akl"], "🌉", 210,
    "Stuck in a jam on the Harbour Bridge|Atascado en un embotellamiento en el puente del puerto|Coincé dans un bouchon sur le pont du port|ハーバーブリッジの渋滞に巻き込まれる",
    "A stalled truck in the clip-on lanes turned the bridge into a parking lot right at rush hour, and the meter on a booked appointment kept running long after the traffic stopped moving. Aucklanders have complained about this exact bridge for over sixty years without a second crossing ever quite getting built.|Un camión averiado en los carriles añadidos convirtió el puente en un aparcamiento justo en hora punta, y el reloj de una cita reservada siguió corriendo mucho después de que el tráfico dejara de moverse. Los de Auckland llevan más de sesenta años quejándose de este mismo puente sin que se acabe de construir nunca un segundo cruce.|Un camion en panne sur les voies rapportées a transformé le pont en parking en pleine heure de pointe, et le compteur d'un rendez-vous réservé a continué de tourner bien après l'arrêt de la circulation. Les Aucklandais se plaignent de ce même pont depuis plus de soixante ans sans qu'un second franchissement ne finisse jamais par voir le jour.|増設車線でトラックが立ち往生し、ちょうどラッシュ時に橋を駐車場に変えてしまった。渋滞がまったく動かなくなってからも、予約していた約束の時間はどんどん過ぎていった。オークランドの人々はこの橋への不満を60年以上言い続けているが、二本目の渡り方はいまだにきちんと建設されていない。",
  ),

  // ---- wko ワイカト・ベイオブプレンティ ----
  ev(
    "kiwifruit-picking", "gain", ["wko"], "🥝", 250,
    "An extra picking shift at the kiwifruit orchard|Un turno extra de recolección en el huerto de kiwis|Un poste supplémentaire de cueillette au verger de kiwis|キウイフルーツ農園で追加の収穫シフト",
    "The orchard needed one more set of hands to keep up with a packhouse truck already idling at the gate, and picking to a quota by mid-afternoon earned a bonus on top of the hourly rate. The whole district's economy runs on getting this fruit off the vine and cooled within hours.|El huerto necesitaba un par de manos más para no quedarse atrás del camión del centro de envasado ya al ralentí en la entrada, y recolectar hasta la cuota a media tarde ganó un extra sobre la tarifa por hora. La economía de todo el distrito depende de sacar esta fruta de la parra y enfriarla en cuestión de horas.|Le verger avait besoin d'une paire de bras de plus pour ne pas prendre de retard sur le camion de l'atelier d'emballage déjà au ralenti au portail, et cueillir jusqu'au quota en milieu d'après-midi a valu une prime en plus du tarif horaire. L'économie de tout le district repose sur le fait de décrocher ce fruit de la vigne et de le refroidir en quelques heures.|果樹園では、すでに門前でアイドリングしている選果場のトラックに間に合わせるため、もう一人分の手が必要だった。午後半ばまでにノルマ分を摘み終えると、時給に上乗せのボーナスが付いた。この地方全体の経済は、この果実をつるから外して数時間以内に冷やすことに支えられている。",
    [8, 9],
  ),
  ev(
    "dairy-payout-drop", "loss", ["wko"], "🥛", 220,
    "The dairy payout comes in lower than budgeted|El pago lechero llega más bajo de lo presupuestado|Le versement laitier arrive plus bas que budgété|乳価の支払いが予算より低く出た",
    "The co-operative's forecast milk price was revised down again, and a farm that had already spent against last season's number now has to make the difference up somewhere. International milk powder prices swing the whole region's income up and down every year, whether or not any single farm did anything differently.|El precio previsto de la leche por la cooperativa se revisó a la baja de nuevo, y una granja que ya había gastado contando con la cifra de la temporada pasada ahora tiene que cubrir la diferencia de algún modo. Los precios internacionales de la leche en polvo hacen subir y bajar cada año los ingresos de toda la región, haga lo que haga cada granja en particular.|Le prix du lait prévu par la coopérative a de nouveau été révisé à la baisse, et une ferme ayant déjà dépensé sur la base du chiffre de la saison passée doit maintenant combler la différence quelque part. Les prix internationaux du lait en poudre font monter et descendre les revenus de toute la région chaque année, quoi qu'ait fait ou non chaque ferme en particulier.|農協が予想する乳価がまた下方修正され、前シーズンの数字を当てにしてすでに支出していた農場は、どこかでその差を埋めなければならなくなった。国際的な粉ミルクの価格は、個々の農場が何をしようとも、この地方全体の収入を毎年上下させる。",
  ),

  // ---- cni 中央北島・火山台地 ----
  ev(
    "geothermal-guide", "gain", ["cni"], "♨️", 230,
    "Guiding tourists along the geothermal boardwalk|Guiando a turistas por la pasarela geotérmica|Guider des touristes le long de la passerelle géothermique|地熱地帯の遊歩道でツアーを案内する",
    "A guide called in sick and the visitor centre offered a day's pay to anyone who already knew which pools were merely hot and which would actually scald, keeping a coach party safely on the boardwalk between mud pots. The ground itself is warm enough in places that walking off the marked path is simply not an option.|Un guía avisó de que estaba enfermo y el centro de visitantes ofreció el sueldo de un día a quien ya supiera qué pozas eran solo calientes y cuáles quemaban de verdad, manteniendo a un grupo en autocar a salvo en la pasarela entre las calderas de barro. El propio suelo está tan caliente en algunos tramos que salirse del sendero marcado sencillamente no es una opción.|Un guide s'est déclaré malade et le centre d'accueil a offert le salaire d'une journée à qui savait déjà quelles mares étaient simplement chaudes et lesquelles brûlaient pour de bon, gardant un groupe en autocar en sécurité sur la passerelle entre les marmites de boue. Le sol lui-même est par endroits assez chaud pour que sortir du sentier balisé ne soit tout simplement pas une option.|ガイドが急病になり、ビジターセンターは、どの池がただ温かいだけでどれが本当に火傷するほど熱いかをすでに知っている者に、一日分の給金を提示した。泥火山のあいだの遊歩道からバスツアーの団体を安全に外さないようにする仕事だった。地面そのものが場所によってはあまりに熱く、決められた道を外れることは端から選択肢にない。",
  ),
  ev(
    "no-fishing-licence", "loss", ["cni"], "🎣", 210,
    "Caught fishing Lake Taupō without a licence|Pillado pescando en el lago Taupō sin licencia|Pris à pêcher dans le lac Taupō sans permis|無許可でタウポ湖で釣りをして摘発される",
    "A ranger doing routine checks along the lakeshore asked to see a fishing licence that, it turned out, was still sitting on the kitchen table three hundred kilometres away, and the on-the-spot fine reflected it. The lake's trout fishery is managed separately from the rest of the country's, with its own rules and its own rangers.|Un guardaparques haciendo controles rutinarios por la orilla del lago pidió ver una licencia de pesca que, resultó, seguía sobre la mesa de la cocina a trescientos kilómetros de allí, y la multa en el acto lo reflejó. La pesquería de trucha del lago se gestiona por separado del resto del país, con sus propias normas y sus propios guardas.|Un garde effectuant des contrôles de routine le long du lac a demandé à voir un permis de pêche qui, il s'est avéré, était resté sur la table de la cuisine à trois cents kilomètres de là, et l'amende sur place l'a reflété. La pêcherie de truites du lac est gérée séparément du reste du pays, avec ses propres règles et ses propres gardes.|湖岸を定期巡回していたレンジャーが釣り許可証の提示を求めたが、それは300km離れた自宅の台所のテーブルに置いたままだった。その場で切られた罰金の額はそれを物語っていた。この湖のマス釣りは国内の他の場所とは別に管理されており、独自の規則と独自のレンジャーを持つ。",
  ),

  // ---- egc イーストコースト・ホークス・ベイ ----
  ev(
    "apple-harvest-shift", "gain", ["egc"], "🍎", 240,
    "An extra shift at the apple orchard|Un turno extra en el huerto de manzanas|Un poste supplémentaire au verger de pommiers|りんご果樹園で追加のシフト",
    "The packhouse asked for one more late shift before a forecast rain moved in, and finishing the last rows by torchlight earned a bonus that beat the base rate handily. Hawke's Bay ships a large share of the country's apples, and a wet harvest week can bruise a season's profit as easily as the fruit.|El centro de envasado pidió un turno tardío más antes de que llegara la lluvia prevista, y terminar las últimas hileras a la luz de la linterna ganó un extra que superó con creces la tarifa base. Hawke's Bay exporta buena parte de las manzanas del país, y una semana de cosecha lluviosa puede magullar los beneficios de la temporada tan fácilmente como a la fruta.|L'atelier d'emballage a demandé un service tardif de plus avant l'arrivée d'une pluie annoncée, et finir les dernières rangées à la lampe torche a valu une prime dépassant largement le tarif de base. Hawke's Bay expédie une bonne part des pommes du pays, et une semaine de récolte pluvieuse peut meurtrir les profits de la saison aussi facilement que les fruits.|選果場は予報されていた雨が来る前に、もう一晩遅番を求めていた。懐中電灯の明かりで最後の畝を摘み終えると、基本給をゆうに上回るボーナスが付いた。ホークス・ベイは国内のリンゴの多くを出荷しており、雨の収穫週は果実と同じくらい簡単にその年の利益も傷める。",
    [9, 10],
  ),
  ev(
    "hailstorm-crop", "loss", ["egc"], "🧊", 230,
    "A sudden hailstorm bruises the crop|Un granizo repentino magulla la cosecha|Une grêle soudaine meurtrit la récolte|突然の雹が作物を傷める",
    "A ten-minute hailstorm out of a clear afternoon left a scatter of white dents across an orchard's leaves and fruit, downgrading a whole block from export grade to juice grade in one pass. Growers here watch the radar as closely as any pilot, because there is rarely more than a few minutes' warning.|Una granizada de diez minutos en una tarde despejada dejó una salpicadura de golpes blancos en las hojas y la fruta de un huerto, rebajando todo un bloque de calidad de exportación a calidad de zumo de una sola vez. Los productores de aquí vigilan el radar tan de cerca como cualquier piloto, porque rara vez hay más de unos minutos de aviso.|Une grêle de dix minutes en plein après-midi dégagé a laissé une multitude de marques blanches sur les feuilles et les fruits d'un verger, faisant passer tout un bloc de la catégorie export à celle de jus en un seul passage. Les producteurs d'ici surveillent le radar aussi attentivement que n'importe quel pilote, car il y a rarement plus de quelques minutes d'alerte.|晴れていた午後にわずか10分降った雹が、果樹園の葉と実に白い傷を無数に残し、一区画をまるごと輸出用等級からジュース用等級へ格下げしてしまった。ここの生産者はパイロット並みにレーダーを見張っている。警報が出てから数分の猶予しかないことがほとんどだからである。",
  ),

  // ---- tar タラナキ・ワンガヌイ ----
  ev(
    "rig-roustabout", "gain", ["tar"], "🛢️", 260,
    "A roustabout shift on the gas platform crew|Un turno de peón en la cuadrilla de la plataforma de gas|Un poste de manœuvre dans l'équipe de la plateforme gazière|ガス採掘基地の作業員シフト",
    "A supply-boat delay left the onshore crew short-handed for one shift of loading and checking equipment before the weather window closed, and the overtime rate for filling in reflected the short notice. Taranaki's economy has run on offshore gas since the Māui field opened in 1979, though reserves are now well past their peak.|Un retraso en el barco de suministro dejó a la cuadrilla en tierra corta de personal para un turno de carga y revisión de equipo antes de que se cerrara la ventana meteorológica, y la tarifa de horas extra por cubrirlo reflejó el aviso corto. La economía de Taranaki funciona con gas mar adentro desde que se abrió el yacimiento Māui en 1979, aunque las reservas ya han superado su punto máximo.|Un retard du bateau de ravitaillement a laissé l'équipe à terre à court de bras pour un service de chargement et de vérification du matériel avant la fermeture de la fenêtre météo, et le tarif des heures supplémentaires pour combler le poste reflétait le court préavis. L'économie du Taranaki carbure au gaz offshore depuis l'ouverture du champ de Māui en 1979, bien que les réserves aient désormais dépassé leur pic.|補給船の遅れで陸上のチームが人手不足になり、天候の窓が閉じる前に機材の積み込みと点検を行う一勤務を埋める必要が生じた。急な呼び出しだった分、割増賃金にもそれが反映された。タラナキの経済は1979年にマウイ・ガス田が開いて以来、沖合の天然ガスに支えられてきたが、埋蔵量はすでにピークを過ぎている。",
  ),
  ev(
    "jetboat-cancelled", "loss", ["tar"], "🚤", 200,
    "A river jet-boat tour cancels with no refund|Un tour en jet-boat por el río se cancela sin reembolso|Une excursion en jet-boat sur la rivière est annulée sans remboursement|川のジェットボートツアーが払い戻しなしで中止に",
    "The Whanganui River had risen too fast overnight for the operator to run the upper gorge safely, and the booking terms signed the day before turned out to exclude weather cancellations from any refund. The same river's moods are unpredictable enough that it was granted its own legal personhood in 2017, guardians and all.|El río Whanganui había crecido demasiado rápido durante la noche para que el operador navegara con seguridad el desfiladero superior, y las condiciones de la reserva firmadas el día anterior resultaron excluir del reembolso las cancelaciones por clima. Los cambios de humor del mismo río son tan impredecibles que en 2017 se le concedió su propia personalidad jurídica, con guardianes incluidos.|La rivière Whanganui était montée trop vite pendant la nuit pour que l'opérateur puisse naviguer en sécurité dans les gorges supérieures, et les conditions de réservation signées la veille excluaient finalement tout remboursement pour annulation météo. Les humeurs de cette même rivière sont assez imprévisibles pour qu'elle se soit vu accorder sa propre personnalité juridique en 2017, gardiens compris.|一夜のうちにワンガヌイ川があまりに増水し、業者は上流の峡谷を安全には走れなくなった。前日にサインした予約条件には、天候による中止は払い戻しの対象外と細かく書かれていた。この川の気まぐれはあまりに予測しづらく、2017年には後見人付きで独自の法的人格まで認められている。",
  ),

  // ---- wgn ウェリントン・下部北島 ----
  ev(
    "wellywood-shoot", "gain", ["wgn"], "🎥", 250,
    "Extra hands needed for a Wellington film shoot|Se necesitan manos extra para un rodaje en Wellington|Des bras en plus nécessaires pour un tournage à Wellington|ウェリントンの撮影に人手が急募",
    "A production based out of the city's effects studios needed extra riggers for one long night shoot on a closed-off street, no film experience required, just a head for heights and a willingness to hold a cable steady until dawn. The capital's film and effects industry punches well above the size of the city itself.|Una producción con base en los estudios de efectos de la ciudad necesitó riggers extra para un largo rodaje nocturno en una calle cerrada, sin experiencia en cine requerida, solo cabeza para las alturas y disposición a sujetar un cable firme hasta el amanecer. La industria del cine y los efectos de la capital pesa mucho más de lo que sugiere el tamaño de la ciudad.|Une production basée dans les studios d'effets de la ville avait besoin de gréeurs supplémentaires pour un long tournage de nuit sur une rue fermée, sans expérience du cinéma requise, juste la tête pour les hauteurs et la volonté de tenir un câble ferme jusqu'à l'aube. L'industrie du cinéma et des effets spéciaux de la capitale pèse bien plus lourd que la taille de la ville ne le laisserait croire.|市内の特殊効果スタジオを拠点にする制作会社が、封鎖した通りでの長い夜間撮影のため急遽リギング要員を求めていた。映画の経験は不要、必要なのは高所平気なことと、夜明けまでケーブルを支え続ける根気だけだった。この首都の映画・特殊効果産業は、街の規模に見合わないほどの存在感を持つ。",
  ),
  ev(
    "southerly-blowout", "loss", ["wgn"], "🌬️", 190,
    "A sudden southerly flattens the market stall|Un repentino viento del sur tumba el puesto del mercado|Un coup de vent du sud aplatit l'étal du marché|突然の南風が屋台をなぎ倒す",
    "A gust off the harbour with no real warning flattened an unweighted stall in one gust, sending produce rolling down the footpath and a cash box skidding after it. Locals talk about the wind here the way other cities talk about the weather in general, because it rarely lets up long enough to be ignored.|Una racha del puerto sin aviso real tumbó de un solo golpe un puesto sin sujetar, haciendo rodar el género por la acera y la caja de dinero detrás. Aquí la gente habla del viento como otras ciudades hablan del tiempo en general, porque rara vez amaina lo bastante como para ignorarlo.|Une rafale venue du port, sans réel avertissement, a aplati d'un coup un étal mal lesté, envoyant les produits rouler sur le trottoir et la caisse à monnaie glisser derrière eux. Ici, on parle du vent comme d'autres villes parlent de la météo en général, car il ne faiblit que rarement assez longtemps pour qu'on l'ignore.|港から吹き付けた突風は、ほとんど前触れもなく重しをしていない屋台を一撃でなぎ倒し、商品を歩道に転がし、その後を釣り銭箱が滑っていった。この町の人は他の都市が天気全般について話すのと同じ調子で、この風について話す。無視できるほど長く止むことがめったにないからである。",
  ),

  // ---- top サウス島北端 ----
  ev(
    "sauvignon-harvest", "gain", ["top"], "🍇", 250,
    "An extra hand at the sauvignon blanc harvest|Una mano extra en la vendimia de sauvignon blanc|Un bras en plus pour les vendanges du sauvignon blanc|ソーヴィニヨン・ブランの収穫で人手を貸す",
    "The winery needed a night crew to pick before a forecast frost, working by tractor headlight through rows already glittering with dew, and the harvest bonus arrived the same week as the first pressing. Marlborough now produces most of the country's wine grapes, on vines only planted commercially since 1973.|La bodega necesitó una cuadrilla nocturna para vendimiar antes de una helada prevista, trabajando a la luz de los faros del tractor entre hileras ya brillantes de rocío, y el extra de vendimia llegó la misma semana del primer prensado. Marlborough produce hoy la mayoría de la uva de vino del país, en viñas plantadas comercialmente solo desde 1973.|Le domaine avait besoin d'une équipe de nuit pour vendanger avant une gelée annoncée, travaillant à la lumière des phares du tracteur parmi des rangs déjà scintillants de rosée, et la prime de vendanges est arrivée la même semaine que le premier pressurage. Le Marlborough produit aujourd'hui la majeure partie du raisin de cuve du pays, sur des vignes plantées commercialement seulement depuis 1973.|ワイナリーは予報されていた霜が降りる前に収穫を終えるため、夜通し働く人手を求めていた。すでに露に濡れて光る畝のあいだを、トラクターのヘッドライトを頼りに摘み進んだ。収穫ボーナスは最初の搾汁と同じ週に手に入った。マールボロはいまや国内のワイン用ブドウの大半を産するが、商業栽培が始まったのは1973年からにすぎない。",
    [7, 8],
  ),
  ev(
    "sunshine-claim-rained-out", "loss", ["top"], "☔", 150,
    "An outdoor gig gets rained out despite the sunshine claim|Un concierto al aire libre se cancela por lluvia pese a la fama de sol|Un concert en plein air annulé par la pluie malgré la réputation ensoleillée|「日照時間日本一」を謳う町なのに屋外イベントが雨に流れる",
    "The town's long-running boast about the country's highest sunshine hours did nothing to stop a genuinely miserable downpour on the one weekend an outdoor stage had been booked and paid for. Statistics are an average over a whole year, not a promise about any single Saturday.|La vieja fama del pueblo de tener las horas de sol más altas del país no impidió un aguacero de verdad el único fin de semana en que se había reservado y pagado un escenario al aire libre. Las estadísticas son un promedio de todo un año, no una promesa sobre un sábado en concreto.|La vieille réputation de la ville d'avoir le plus grand nombre d'heures d'ensoleillement du pays n'a rien empêché : une averse bien réelle est tombée le seul week-end où une scène en plein air avait été réservée et payée. Les statistiques sont une moyenne sur toute une année, pas une promesse pour un samedi précis.|この町が長年自慢してきた国内一の日照時間も、屋外ステージを予約して代金まで払った、まさにその週末の本降りの雨を止めることはできなかった。統計はあくまで一年を通した平均であって、特定の土曜日についての約束ではない。",
  ),

  // ---- cby カンタベリー ----
  ev(
    "rebuild-labour", "gain", ["cby"], "🏗️", 260,
    "A day labouring on a Christchurch rebuild site|Un día de peón en una obra de reconstrucción en Christchurch|Une journée de manœuvre sur un chantier de reconstruction à Christchurch|クライストチャーチの再建現場で日雇い",
    "A construction site still working through the long list of buildings replaced since the 2011 earthquake needed an extra pair of hands for the day, no trade ticket required for shifting materials and sweeping up. More than a decade on, cranes over the central city are still an ordinary part of the skyline.|Una obra que aún trabajaba en la larga lista de edificios reemplazados desde el terremoto de 2011 necesitó un par de manos extra por el día, sin carné de oficio necesario para mover materiales y barrer. Más de una década después, las grúas sobre el centro siguen siendo parte normal del perfil de la ciudad.|Un chantier travaillant encore sur la longue liste des bâtiments remplacés depuis le séisme de 2011 avait besoin d'une paire de bras en plus pour la journée, aucune carte de métier requise pour déplacer des matériaux et balayer. Plus d'une décennie plus tard, les grues au-dessus du centre-ville font toujours partie normale de l'horizon.|2011年の地震以来建て替えが続く長い建物リストにまだ取り組んでいる建設現場が、資材運びと掃除のために資格不要の一日限りの人手を求めていた。十年余りを経たいまも、中心街の上空にそびえるクレーンはこの街の景色のありふれた一部である。",
  ),
  ev(
    "cricket-ball-windscreen", "loss", ["cby"], "🏏", 140,
    "A stray cricket ball breaks the car windscreen|Una pelota de críquet perdida rompe el parabrisas del coche|Une balle de cricket perdue casse le pare-brise de la voiture|逸れたクリケットボールがフロントガラスを割る",
    "A big hit cleared the boundary rope at the local ground and cleared a parked windscreen too, landing with a crack loud enough that half the crowd turned around before the batter had even finished the run. The club's insurance covers the ground, not the car park.|Un golpazo superó la cuerda del límite del campo local y también un parabrisas aparcado, con un chasquido tan fuerte que medio público se giró antes de que el bateador terminara siquiera la carrera. El seguro del club cubre el campo, no el aparcamiento.|Un grand coup a franchi la corde de limite du terrain local et un pare-brise garé aussi, atterrissant avec un craquement assez fort pour que la moitié du public se retourne avant même que le batteur ait fini sa course. L'assurance du club couvre le terrain, pas le parking.|地元のクリケット場での大きな一打が境界線ロープを越え、駐車していた車のフロントガラスまで越えてしまった。打者がまだ走り終える前に半数の観客が振り向くほど大きな音だった。クラブの保険はグラウンドを補償するが、駐車場は対象外である。",
  ),

  // ---- wcs 西海岸 ----
  ev(
    "pounamu-workshop-tip", "gain", ["wcs"], "💚", 220,
    "A well-tipped shift at the pounamu carving workshop|Un turno bien propinado en el taller de talla de pounamu|Un poste bien récompensé à l'atelier de sculpture du pounamu|ポウナム彫刻工房で心付けをたくさんもらう",
    "A tour group lingered long past closing time asking questions about the stone's origins, and the workshop owner split a generous end-of-day tip with the apprentice who had answered most of them. Genuine pounamu is protected by law from being exported unworked, so every finished piece sold here stays a local's handiwork.|Un grupo turístico se quedó mucho después del cierre haciendo preguntas sobre el origen de la piedra, y el dueño del taller repartió una generosa propina de cierre con el aprendiz que había respondido a la mayoría. El pounamu auténtico está protegido por ley frente a la exportación sin trabajar, así que cada pieza terminada que se vende aquí es obra de un artesano local.|Un groupe de touristes s'est attardé bien après l'heure de fermeture à poser des questions sur l'origine de la pierre, et le propriétaire de l'atelier a partagé un généreux pourboire de fin de journée avec l'apprenti qui avait répondu à la plupart d'entre elles. Le vrai pounamu est protégé par la loi contre l'exportation à l'état brut, si bien que chaque pièce finie vendue ici reste l'œuvre d'un artisan local.|見学ツアーの一団が閉店をとうに過ぎても石の由来について質問を重ね、工房の主人は、その大半に答えていた見習いと一日の終わりのたっぷりしたチップを分け合った。本物のポウナムは未加工のまま輸出することが法律で禁じられているため、ここで売られる完成品はどれも地元の職人の手仕事のままである。",
  ),
  ev(
    "coast-flood-camping", "loss", ["wcs"], "⛺", 180,
    "Heavy Coast rain floods the campsite|La fuerte lluvia de la Costa inunda el camping|De fortes pluies sur la côte inondent le camping|西海岸の豪雨でキャンプ場が水浸しに",
    "A night of the West Coast's famously heavy rain turned the tent site into ankle-deep water by morning, and everything not zipped tight came out soaked, ruined food included. The region can see several metres of rain a year in places, more than almost anywhere else in the country.|Una noche de la lluvia famosamente intensa de la Costa Oeste convirtió el camping en agua a la altura del tobillo para la mañana, y todo lo que no estaba bien cerrado con cremallera salió empapado, comida arruinada incluida. La región puede recibir varios metros de lluvia al año en algunos puntos, más que casi cualquier otro lugar del país.|Une nuit de pluie, réputée intense sur la côte Ouest, a transformé le camping en flaque à hauteur de cheville au matin, et tout ce qui n'était pas soigneusement fermé est ressorti trempé, nourriture gâchée comprise. La région peut recevoir plusieurs mètres de pluie par an par endroits, plus que presque partout ailleurs dans le pays.|西海岸名物の豪雨が一晩降り続き、朝にはテント場が足首まで水に浸かっていた。きちんとジッパーを閉めていなかったものはすべてびしょ濡れになり、食料も台無しになった。この地方は場所によって年間降水量が数mに達することもあり、国内でもとりわけ多い。",
  ),

  // ---- ota オタゴ ----
  ev(
    "winter-festival-bar", "gain", ["ota"], "🍺", 230,
    "An extra bar shift during the Queenstown winter festival|Un turno extra de barra durante el festival de invierno de Queenstown|Un service au bar en plus pendant le festival d'hiver de Queenstown|クイーンズタウン冬祭りでバーの追加シフト",
    "A bar packed with skiers off the mountain for the annual winter festival needed one more pair of hands pulling taps until well past midnight, tips included in a jar that filled twice over. The town's population is said to roughly double during the peak of the ski season.|Un bar abarrotado de esquiadores bajados de la montaña para el festival de invierno anual necesitó un par de manos más tirando cerveza hasta bien pasada la medianoche, propinas incluidas en un bote que se llenó dos veces. Se dice que la población del pueblo se duplica más o menos en el pico de la temporada de esquí.|Un bar bondé de skieurs descendus de la montagne pour le festival d'hiver annuel avait besoin d'une paire de bras de plus pour tirer les bières bien après minuit, pourboires compris dans un bocal rempli deux fois. On dit que la population de la ville double à peu près au pic de la saison de ski.|毎年恒例の冬祭りで山から下りてきたスキーヤーで満員のバーは、真夜中をとうに過ぎてもビールを注ぎ続けるもう一人分の手を必要としていた。チップを入れる瓶は二度も満杯になった。この町の人口はスキーシーズンの最盛期にはほぼ倍になると言われる。",
    [4, 6],
  ),
  ev(
    "bungy-photo-package", "loss", ["ota"], "📸", 170,
    "The bungy jump photo package costs more than expected|El paquete de fotos del puénting cuesta más de lo esperado|Le forfait photos du saut à l'élastique coûte plus que prévu|バンジージャンプの写真パックが思ったより高くつく",
    "The jump itself was covered by the ticket, but the adrenaline made every extra photo, video and branded T-shirt on offer at the bottom platform look like a bargain worth signing up for on the spot. The upsell is as much a part of the ride as the fall.|El salto en sí estaba incluido en la entrada, pero la adrenalina hizo que cada foto extra, cada vídeo y cada camiseta con el logo, ofrecidos en la plataforma de abajo, parecieran una ganga por la que valía la pena apuntarse en el acto. La venta adicional forma tanto parte de la experiencia como la propia caída.|Le saut lui-même était compris dans le billet, mais l'adrénaline a fait paraître chaque photo, vidéo et t-shirt de la marque proposés en supplément sur la plateforme du bas comme une bonne affaire à saisir sur-le-champ. La vente additionnelle fait autant partie de l'expérience que la chute elle-même.|ジャンプ自体はチケットに含まれていたが、アドレナリンのせいで、着地台で勧められる追加の写真も動画もロゴ入りTシャツも、その場でつい申し込みたくなるお得な話に見えてしまった。追加販売は落下そのものと同じくらい体験の一部になっている。",
  ),

  // ---- fld フィヨルドランド・サウスランド ----
  ev(
    "oyster-dredge-extra", "gain", ["fld"], "🦪", 240,
    "An extra hand needed dredging Bluff oysters|Se necesita una mano extra dragando ostras de Bluff|Un bras en plus nécessaire pour draguer les huîtres de Bluff|ブラフ・オイスターの底引き漁で人手が要る",
    "A deckhand missed the boat at dawn, and the skipper offered a share of the day's quota catch to whoever could be at the wharf in ten minutes flat. The oyster season is short and strictly quota-limited, so a boat down a crew member for even one day loses ground it cannot make up later.|Un tripulante perdió el barco al amanecer, y el patrón ofreció una parte de la captura del cupo del día a quien pudiera estar en el muelle en diez minutos justos. La temporada de ostras es corta y con cupo estrictamente limitado, así que un barco sin un tripulante por un solo día pierde terreno que no puede recuperar después.|Un matelot a raté le bateau à l'aube, et le skipper a offert une part de la pêche du quota du jour à quiconque pouvait être au quai en dix minutes montre en main. La saison de l'huître est courte et strictement limitée par quota, si bien qu'un bateau privé d'un membre d'équipage ne serait-ce qu'un jour perd un terrain qu'il ne rattrapera pas.|夜明けに乗組員の一人が船に乗り遅れ、船長は10分以内に埠頭に来られる者にその日の漁獲枠の分け前を約束した。牡蠣漁は期間が短く漁獲枠も厳しく決まっているため、たった一日でも人手を欠いた船は取り戻せない遅れを負う。",
    [4, 6],
  ),
  ev(
    "milford-road-closed", "loss", ["fld"], "🏔️", 210,
    "The Milford Road closes for avalanche control|La carretera de Milford cierra por control de avalanchas|La Milford Road ferme pour contrôle des avalanches|雪崩対策のためミルフォード・ロードが通行止めに",
    "Rangers set off controlled explosive charges above the highway to bring down unstable snow before it could fall on its own, closing the only road in for several hours with no warning beyond a sign at the last town. A tour booked to the minute simply has to wait it out at the roadblock.|Los guardaparques hicieron detonar cargas explosivas controladas sobre la carretera para hacer caer la nieve inestable antes de que cayera por sí sola, cerrando la única vía de acceso durante varias horas sin más aviso que un cartel en el último pueblo. Una excursión reservada al minuto simplemente tiene que esperar en el control.|Des gardes ont déclenché des charges explosives contrôlées au-dessus de la route pour faire tomber la neige instable avant qu'elle ne le fasse d'elle-même, fermant l'unique route d'accès pendant plusieurs heures sans autre avertissement qu'un panneau dans la dernière ville. Une excursion réservée à la minute près doit simplement patienter au barrage.|レンジャーたちは不安定な雪が自然に崩れ落ちる前に、道路の上方で管理された爆破を行って人工的に雪崩を起こした。最後の町にある看板以外に予告はなく、唯一の進入路は数時間にわたって封鎖された。分刻みで予約していたツアーも、通行止めの前でただ待つしかない。",
    [4, 6],
  ),
];
