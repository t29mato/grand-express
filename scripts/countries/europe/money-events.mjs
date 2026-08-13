/**
 * ヨーロッパの青マス・赤マスで起きる出来事(25件。増15・減10)。
 *
 * 地方コード: nord=北欧 / brit=ブリテン諸島 / ibe=イベリア半島 / west=西欧 /
 * cent=中欧 / balk=バルカン半島 / east=東欧
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、7地方それぞれに3件ずつ置いている。
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

export const EUROPE_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "leftluggage-find", "gain", [], "🧳", 210,
    "Left-luggage locker refund|Reembolso de la consigna|Remboursement de la consigne|コインロッカーの返金",
    "The locker at the last station had eaten a coin without opening, and the stationmaster, tired of the same complaint from other travelers, simply handed back double from the office till rather than argue about it. Most European stations still keep a member of staff near the lockers for exactly this reason.|La taquilla de la última estación se tragó una moneda sin abrirse, y el jefe de estación, cansado de oír la misma queja de otros viajeros, sencillamente devolvió el doble de la caja de la oficina en vez de discutir. La mayoría de las estaciones europeas todavía mantienen personal cerca de las taquillas justo por eso.|Le casier de la dernière gare avait avalé une pièce sans s'ouvrir, et le chef de gare, lassé d'entendre la même plainte d'autres voyageurs, rendit tout simplement le double depuis la caisse du bureau plutôt que de discuter. La plupart des gares européennes gardent encore un agent près des casiers pour cette raison précise.|前の駅のコインロッカーが硬貨を呑み込んだまま開かなかった。他の旅客からも同じ苦情を聞き飽きた駅長は、言い争う代わりに窓口の釣り銭箱から倍額を返してくれた。ヨーロッパの駅の多くが、いまもロッカーの近くに係員を置いているのはまさにこのためである。",
  ),
  ev(
    "busker-tips", "gain", [], "🎻", 190,
    "Busking in the station concourse|Tocando música en el vestíbulo de la estación|Faire la manche dans le hall de gare|駅の広間で流しの演奏をする",
    "An open violin case on the concourse floor filled up faster than expected during the evening rush, coins and the odd folded note landing between songs. Station operators across the continent generally look the other way as long as the amp stays quiet and the busker keeps clear of the platform edge.|Un estuche de violín abierto en el suelo del vestíbulo se llenó más rápido de lo esperado durante la hora punta de la tarde, con monedas y algún billete doblado cayendo entre canción y canción. Los operadores de estaciones de todo el continente suelen hacer la vista gorda mientras el amplificador esté bajo y el músico se mantenga lejos del borde del andén.|Un étui à violon ouvert sur le sol du hall s'est rempli plus vite que prévu pendant l'heure de pointe du soir, pièces et quelques billets pliés atterrissant entre les morceaux. Les exploitants de gares du continent ferment généralement les yeux tant que l'ampli reste discret et que le musicien reste loin du bord du quai.|夕方のラッシュのあいだ、広間の床に開いたままのヴァイオリンのケースは予想より早く満ちていった。曲の合間に硬貨や折りたたまれた紙幣が落ちる。大陸じゅうの駅の運営者は、アンプの音が控えめでホームの端に近づかない限り、たいてい見て見ぬふりをする。",
  ),
  ev(
    "misread-timetable", "loss", [], "🗓️", 200,
    "Misreading the 24-hour timetable|Malinterpretando el horario de 24 horas|Une mauvaise lecture de l'horaire sur 24 heures|24時間表記の時刻表を読み違える",
    "A departure printed as \"14:20\" got read as two in the morning rather than two in the afternoon, and the mistake was only caught after a taxi had already been called to the station at an hour when no train was actually running. European timetables print the 24-hour clock as standard, which trips up visitors more often than staff ever admit.|Una salida impresa como «14:20» se leyó como las dos de la madrugada en vez de las dos de la tarde, y el error solo se descubrió después de haber llamado ya a un taxi a la estación a una hora en la que no circulaba ningún tren. Los horarios europeos imprimen el reloj de 24 horas como estándar, algo que confunde a los visitantes más a menudo de lo que el personal admite.|Un départ imprimé « 14 h 20 » fut lu comme deux heures du matin plutôt que deux heures de l'après-midi, et l'erreur ne fut découverte qu'après avoir déjà appelé un taxi pour la gare à une heure où aucun train ne circulait. Les horaires européens impriment l'heure sur 24 heures par défaut, ce qui piège les visiteurs plus souvent que le personnel ne l'admet.|「14:20」と印刷された発車時刻を、午後2時ではなく午前2時と読み違えた。その間違いに気づいたのは、列車が一本も走っていない時間に駅までタクシーを呼んでしまったあとだった。ヨーロッパの時刻表は24時間表記が標準で、係員が認める以上に旅行者を混乱させている。",
    [],
  ),
  ev(
    "coin-not-accepted", "loss", [], "🪙", 180,
    "A vending machine refuses foreign coins|Una máquina expendedora rechaza monedas extranjeras|Un distributeur refuse une monnaie étrangère|自動販売機が外国の硬貨を受け付けない",
    "A handful of change from the last country crossed a border in a coat pocket and turned out to be worthless the moment it was fed into a machine two countries later. Coin-sorting machines are tuned to reject anything that is not the exact weight and diameter of the local currency, no exceptions made for a near miss.|Un puñado de cambio del último país cruzó una frontera en el bolsillo del abrigo y resultó no valer nada en cuanto se metió en una máquina dos países después. Las máquinas clasificadoras de monedas están ajustadas para rechazar cualquier cosa que no tenga el peso y el diámetro exactos de la moneda local, sin excepciones por poco que se parezca.|Une poignée de monnaie du dernier pays a traversé une frontière dans une poche de manteau et s'est révélée sans valeur dès qu'elle fut glissée dans une machine deux pays plus loin. Les trieuses de pièces sont calibrées pour rejeter tout ce qui n'a pas exactement le poids et le diamètre de la monnaie locale, sans exception pour une ressemblance approximative.|前の国で余った小銭がコートのポケットに入ったまま国境を越え、二か国先の自動販売機に入れてみると価値の無いものだと分かった。硬貨選別機は現地通貨と寸分違わぬ重さと直径のものしか受け付けないよう調整されており、多少似ている程度では容赦されない。",
  ),

  // ---- nord 北欧 ----
  ev(
    "herring-catch-bonus", "gain", ["nord"], "🐟", 250,
    "An extra hand on a herring boat|Un ayudante extra en un barco de arenques|Un coup de main en plus sur un bateau à harengs|ニシン漁船の助っ人",
    "A short-handed crew needed one more pair of arms to haul in nets before a squall came through, and the catch was good enough that the skipper paid a full share rather than a token wage. Hands smelled of fish for two days afterward, which the crew treated as a normal cost of the work.|Una tripulación corta de personal necesitaba un par de brazos más para recoger las redes antes de que llegara un chubasco, y la pesca fue tan buena que el patrón pagó una parte completa en vez de un jornal simbólico. Las manos olieron a pescado dos días después, algo que la tripulación consideraba un gasto normal del oficio.|Un équipage à court de bras avait besoin d'une paire de mains de plus pour remonter les filets avant l'arrivée d'un grain, et la pêche fut assez bonne pour que le patron verse une part entière plutôt qu'un salaire symbolique. Les mains sentaient le poisson deux jours après, un coût normal du métier selon l'équipage.|人手の足りない漁船が、突風の来る前に網を引き上げるためにもう一人分の腕を必要としていた。漁の出来が良かったため、船長は形ばかりの日当ではなく一人前の分け前を払ってくれた。手には二日ほど魚の匂いが残ったが、乗組員はそれを仕事につきものの代償だとみなしていた。",
    [4, 5],
  ),
  ev(
    "ferry-cancelled", "loss", ["nord"], "⛴️", 260,
    "A ferry is cancelled for weather|Un ferri se cancela por el tiempo|Un ferry est annulé à cause du temps|悪天候でフェリーが欠航する",
    "The crossing was called off with only an hour's notice once the wind climbed past the safety limit, and the only alternative was a much longer detour by road and a second, more expensive ferry the next morning. Island timetables here are written with the understanding that a certain number of sailings simply will not happen each winter.|La travesía se canceló con solo una hora de aviso en cuanto el viento superó el límite de seguridad, y la única alternativa fue un desvío mucho más largo por carretera y un segundo ferri, más caro, a la mañana siguiente. Los horarios de las islas aquí se redactan asumiendo que cierto número de travesías simplemente no se harán cada invierno.|La traversée fut annulée avec seulement une heure de préavis dès que le vent dépassa la limite de sécurité, et la seule solution fut un détour bien plus long par la route et un second ferry, plus cher, le lendemain matin. Les horaires insulaires ici sont écrits en sachant qu'un certain nombre de traversées ne se feront tout simplement pas chaque hiver.|風が安全基準を超えたとたん、わずか1時間前の通告で航路が欠航になった。唯一の代替手段は、道路での大回りと、翌朝のより高額な二便目のフェリーだった。この土地の島の時刻表は、毎冬ある程度の便が実際には出ないことを織り込んで組まれている。",
    [9, 10],
  ),
  ev(
    "midnight-sun-tour", "gain", ["nord"], "🌞", 230,
    "Guiding a midnight-sun photo tour|Guiando un tour fotográfico del sol de medianoche|Guider un circuit photo du soleil de minuit|白夜の写真ツアーの案内",
    "A coach party of photographers needed someone who actually knew which headland gave the clearest view of the sun sitting on the horizon at midnight, and the tip afterward was better than the guiding fee itself. Nobody in the group quite believed the sky would stay that bright until they saw it for themselves.|Un grupo en autocar de fotógrafos necesitaba a alguien que supiera de verdad qué cabo ofrecía la vista más clara del sol posado en el horizonte a medianoche, y la propina después fue mejor que el propio honorario de guía. Nadie del grupo se creía del todo que el cielo seguiría tan claro hasta verlo con sus propios ojos.|Un groupe de photographes en autocar avait besoin de quelqu'un qui sache vraiment quel promontoire offrait la vue la plus dégagée sur le soleil posé à l'horizon à minuit, et le pourboire valut mieux que les honoraires de guide eux-mêmes. Personne dans le groupe ne croyait vraiment que le ciel resterait aussi clair avant de le voir de ses propres yeux.|写真愛好家のバスツアー客は、真夜中に地平線に沈まぬ太陽を最もよく見渡せる岬をちゃんと知っている案内人を必要としていて、あとで渡されたチップは案内料そのものより良かった。グループの誰も、自分の目で見るまでは空が本当にそんなに明るいままだとは信じていなかった。",
    [2, 3],
  ),

  // ---- brit ブリテン諸島 ----
  ev(
    "pub-quiz-win", "gain", ["brit"], "🍺", 220,
    "Winning the pub quiz|Ganando el pub quiz|Remporter le pub quiz|パブクイズで優勝する",
    "A table of strangers pooled their scraps of trivia knowledge and edged out the regular Tuesday-night champions by a single question, taking home the cash pot the pub had built up over several weeks of nobody quite managing to sweep the board.|Una mesa de desconocidos juntó sus retazos de cultura general y superó por una sola pregunta a los campeones habituales de los martes por la noche, llevándose el bote en efectivo que el pub había acumulado en varias semanas sin que nadie arrasara del todo.|Une tablée d'inconnus a mis en commun ses bribes de culture générale et devancé d'une seule question les champions habituels du mardi soir, empochant la cagnotte que le pub avait accumulée sur plusieurs semaines sans que personne ne rafle vraiment la mise.|見ず知らずの客どうしが一つの卓を囲み、それぞれの雑学をかき集めて、火曜夜の常連チャンピオンをたった一問差で退けた。数週間も誰一人総取りできずに積み上がっていた賞金を持ち帰ることになった。",
  ),
  ev(
    "leaves-delay-refund", "loss", ["brit"], "🍂", 210,
    "A delay refund claim gets rejected|Una reclamación de reembolso por retraso es rechazada|Une demande de remboursement pour retard est rejetée|遅延払い戻しの申請が却下される",
    "The claim form asked for the exact minute the train arrived, and the operator's own recorded time differed from a phone's stopwatch by just enough to fall under the threshold for compensation. Filing again with a screenshot did not change the outcome.|El formulario de reclamación pedía el minuto exacto de llegada del tren, y la hora registrada por la propia operadora difería del cronómetro del teléfono lo justo para quedar por debajo del umbral de compensación. Volver a presentarlo con una captura de pantalla no cambió el resultado.|Le formulaire de réclamation demandait la minute exacte d'arrivée du train, et l'heure enregistrée par l'exploitant différait du chronomètre d'un téléphone de tout juste assez pour tomber sous le seuil d'indemnisation. Le redéposer avec une capture d'écran n'a rien changé.|払い戻し申請書には列車が到着した分刻みの時刻を書く欄があったが、鉄道会社の記録時刻はスマートフォンのストップウォッチとわずかにずれていて、補償の基準をぎりぎり下回ってしまった。画面キャプチャを添えて再申請しても結果は変わらなかった。",
    [6, 7],
  ),
  ev(
    "car-boot-sale", "gain", ["brit"], "📦", 200,
    "Clearing out the boot at a car boot sale|Vaciando el maletero en un mercadillo de coches|Vider son coffre à un vide-grenier auto|カーブートセールで車のトランクを売り払う",
    "A muddy field turned into a car park before dawn, and by mid-morning most of what had been packed loose in the boot was gone, sold to strangers who arrived with torches to get first pick of the good stuff before the light was even properly up.|Un campo embarrado se convirtió en aparcamiento antes del amanecer, y a media mañana casi todo lo que iba suelto en el maletero había desaparecido, vendido a desconocidos que llegaron con linternas para quedarse lo bueno antes de que hubiera luz de verdad.|Un champ boueux s'est transformé en parking avant l'aube, et vers la fin de la matinée, presque tout ce qui traînait en vrac dans le coffre avait disparu, vendu à des inconnus arrivés lampe torche en main pour choisir les bonnes affaires avant même le lever du jour.|夜明け前、ぬかるんだ野原が駐車場に変わり、昼前にはトランクに雑に積んでいた物のほとんどが売れていた。まだ十分に明るくならないうちから懐中電灯を手に良品を先取りしに来た見知らぬ客たちに買われていったのである。",
  ),

  // ---- ibe イベリア半島 ----
  ev(
    "olive-harvest-work", "gain", ["ibe"], "🫒", 240,
    "A day shaking olives from the trees|Un día vareando aceitunas de los olivos|Une journée à gauler les olives|一日オリーブの実を振り落とす",
    "Nets spread under the trees caught whatever a long pole could knock loose, and the pay came by the crate rather than the hour, which meant the fastest workers in the row went home with noticeably more than everyone else.|Las redes tendidas bajo los árboles recogían lo que una vara larga lograba desprender, y el pago se hacía por caja y no por hora, así que los más rápidos de la hilera se fueron a casa con bastante más que los demás.|Des filets tendus sous les arbres recueillaient tout ce qu'une longue perche parvenait à décrocher, et la paie se faisait à la caisse plutôt qu'à l'heure, si bien que les plus rapides de la rangée rentrèrent chez eux avec nettement plus que les autres.|木の下に広げた網が、長い棒で払い落とした実を受け止めていく。賃金は時間ではなく箱の数で払われたため、列でいちばん手の速かった者は他の誰よりも目に見えて多く持ち帰った。",
    [6, 7, 8],
  ),
  ev(
    "siesta-missed-connection", "loss", ["ibe"], "😴", 220,
    "Sleeping through the connecting train during siesta hours|Durmiendo la siesta y perdiendo el tren de enlace|S'endormir pendant la sieste et rater la correspondance|昼寝で乗り継ぎの列車に乗り遅れる",
    "The midday heat and a full lunch made the station bench far too comfortable, and the connecting train pulled out while the alarm meant to prevent exactly this sat unheard at the bottom of a bag. The next one did not leave for another three hours.|El calor del mediodía y una comida completa hicieron que el banco de la estación resultara demasiado cómodo, y el tren de enlace salió mientras la alarma puesta justo para evitar esto sonaba sin que nadie la oyera en el fondo de una bolsa. El siguiente no salía hasta tres horas después.|La chaleur de midi et un repas copieux ont rendu le banc de la gare bien trop confortable, et le train de correspondance est parti pendant que l'alarme censée éviter exactement cela sonnait sans être entendue au fond d'un sac. Le suivant ne partait que trois heures plus tard.|真昼の暑さとたっぷりの昼食のせいで、駅のベンチが心地よすぎた。まさにこの事態を防ぐために鳴らしたはずの目覚ましがバッグの底で誰にも聞かれないまま鳴るなか、乗り継ぎの列車は出発していった。次の便は3時間後まで無かった。",
    [5, 6],
  ),
  ev(
    "tapas-crawl-tip", "gain", ["ibe"], "🍢", 210,
    "Helping a bar find its lost regular|Ayudando a un bar a encontrar a su cliente habitual|Aider un bar à retrouver son habitué disparu|バルの常連客の行方を捜すのを手伝う",
    "An elderly regular hadn't shown up for his usual evening tapas, and knocking on his door to check turned out to be nothing more than a missed bus, but the bar owner insisted on paying for the worry all the same, in the form of a fistful of coins pressed into a hand.|Un cliente habitual de edad avanzada no había aparecido para sus tapas de siempre, y llamar a su puerta para comprobarlo resultó no ser más que un autobús perdido, pero el dueño del bar insistió igualmente en pagar la preocupación con un puñado de monedas.|Un habitué âgé n'était pas venu pour ses tapas du soir habituelles, et frapper à sa porte pour vérifier ne révéla qu'un bus manqué, mais le patron du bar insista pour payer l'inquiétude malgré tout, glissant une poignée de pièces dans une main.|いつもの夕方のタパスに、年配の常連客が姿を見せなかった。心配して家まで訪ねてみると、ただバスに乗り遅れただけだったが、それでもバルの店主は気を揉ませたお詫びだと言って、小銭を一握り手に押しつけてきた。",
  ),

  // ---- west 西欧 ----
  ev(
    "cheese-market-porter", "gain", ["west"], "🧀", 230,
    "Carrying wheels at the cheese market|Cargando ruedas en el mercado del queso|Porter des meules au marché aux fromages|チーズ市場で車輪状のチーズを運ぶ",
    "The market's traditional carrying guild needed an extra pair of shoulders for the morning rush, and hauling stacked wheels on a wooden barrow between the weighing stations earned a cut of the day's fee on top of a very particular smell that lingered for hours.|El gremio tradicional de cargadores del mercado necesitaba un par de hombros extra para la hora punta de la mañana, y llevar ruedas apiladas en una carretilla de madera entre las estaciones de pesaje pagó una parte de la tarifa del día, además de un olor muy particular que duró horas.|La guilde traditionnelle des porteurs du marché avait besoin d'une paire d'épaules de plus pour la cohue du matin, et transporter des meules empilées sur une brouette de bois entre les postes de pesée valut une part de la recette du jour, en plus d'une odeur très particulière qui persista des heures.|市場の伝統的な運搬組合が朝の忙しい時間にもう一人分の肩を必要としていた。木製の一輪台車に積み上げたチーズの車輪を計量所のあいだで運ぶと、その日の手数料の分け前に加えて、何時間も消えない独特の匂いも得ることになった。",
  ),
  ev(
    "motorway-tailback", "loss", ["west"], "🚗", 240,
    "Stuck in a holiday-weekend tailback|Atascado en una caravana de puente|Bloqué dans un bouchon de pont férié|連休の大渋滞に巻き込まれる",
    "Half the continent seemed to have chosen the same motorway for the same long weekend, and a journey planned for two hours took most of the day, with a service station sandwich bought at a price that reflected the captive audience rather than the sandwich itself.|Media Europa parecía haber elegido la misma autopista para el mismo puente, y un trayecto previsto para dos horas ocupó casi todo el día, con un bocadillo de área de servicio comprado a un precio que reflejaba más al público cautivo que al propio bocadillo.|La moitié du continent semblait avoir choisi la même autoroute pour le même week-end prolongé, et un trajet prévu pour deux heures a pris presque toute la journée, avec un sandwich d'aire de service acheté à un prix qui reflétait plus la clientèle captive que le sandwich lui-même.|大陸の半分が同じ連休に同じ高速道路を選んだかのようだった。2時間で着くはずだった道のりはほぼ一日がかりになり、サービスエリアで買ったサンドイッチの値段は、味よりも「逃げ場の無い客」であることを反映していた。",
    [4, 5, 8],
  ),
  ev(
    "monaco-casino-loss", "loss", ["west"], "🎰", 250,
    "A losing streak at the roulette table|Una mala racha en la mesa de ruleta|Une série de pertes à la table de roulette|ルーレット卓での負け続き",
    "The wheel favoured red for nine spins running, and betting against a streak that long felt like it had to end at any moment right up until the money did instead. The house takes no side in the argument and never has to.|La rueda favoreció al rojo durante nueve giros seguidos, y apostar en contra de una racha tan larga daba la sensación de que tenía que acabar en cualquier momento, hasta que fue el dinero el que se acabó antes. La casa no toma partido en la discusión y nunca tiene que hacerlo.|La roue a favorisé le rouge neuf tours d'affilée, et parier contre une série aussi longue donnait l'impression qu'elle devait s'arrêter d'un instant à l'autre — jusqu'à ce que ce soit l'argent qui s'arrête à la place. La maison ne prend jamais parti dans ce débat, et n'en a jamais besoin.|ルーレットは9回連続で赤が出続けた。これほど長く続いた流れはいまにも終わるはずだと賭け続けたが、先に尽きたのは流れではなく手持ちの金のほうだった。カジノはこの議論のどちら側にも与しないし、その必要も無い。",
  ),

  // ---- cent 中欧 ----
  ev(
    "biergarten-shift", "gain", ["cent"], "🍻", 220,
    "Covering an extra shift at the beer garden|Cubriendo un turno extra en el jardín de cerveza|Assurer un service en plus au jardin à bière|ビアガーデンで臨時のシフトに入る",
    "A sudden warm evening emptied every office early and filled the long communal tables outside within the hour, and carrying six full steins at once without spilling a drop earned a reputation, and the tips, of a regular rather than a one-off fill-in.|Una tarde cálida e inesperada vació todas las oficinas temprano y llenó en una hora las largas mesas comunes al aire libre, y llevar seis jarras llenas a la vez sin derramar ni gota ganó la reputación, y las propinas, de alguien fijo y no de un simple sustituto.|Une soirée chaude et inattendue a vidé tous les bureaux tôt et rempli en une heure les longues tables communes en plein air, et porter six chopes pleines à la fois sans en renverser une goutte a valu une réputation, et les pourboires, d'habitué plutôt que de simple remplaçant.|突然の暖かい夕方でオフィスは早々に空になり、1時間もしないうちに屋外の長い共同テーブルは満席になった。ジョッキ6杯を一滴もこぼさず一度に運んでみせると、臨時の代役ではなく常連の店員としての評判とチップを得た。",
    [1, 2, 3],
  ),
  ev(
    "alpine-hut-storm", "loss", ["cent"], "⛰️", 260,
    "Stranded a night by weather in a mountain hut|Atrapado una noche por el mal tiempo en un refugio de montaña|Bloqué une nuit par le mauvais temps dans un refuge de montagne|悪天候で山小屋に一晩足止めされる",
    "The warden refused to let anyone start back down once the cloud dropped and the path iced over, and a bunk, a bowl of soup and a candle for the night all went on the same tab, payable only once safely back in the valley.|El guarda se negó a dejar bajar a nadie en cuanto la niebla se cerró y el camino se heló, y una litera, un plato de sopa y una vela para la noche fueron todo a la misma cuenta, pagadera solo una vez de vuelta a salvo en el valle.|Le gardien refusa de laisser quiconque redescendre une fois le nuage tombé et le sentier verglacé, et un lit, un bol de soupe et une bougie pour la nuit finirent tous sur la même note, payable seulement une fois revenu sain et sauf dans la vallée.|雲が下りてきて道が凍りつくと、山小屋の管理人は誰にも下山を許さなかった。寝台一つ、スープ一杯、一晩ぶんの蝋燭がすべて同じ勘定に付けられ、無事に谷へ戻ってから支払うことになった。",
    [7, 8, 9],
  ),
  ev(
    "christmas-market-stall", "gain", ["cent"], "🎄", 230,
    "Minding a friend's Christmas market stall|Cuidando el puesto de un amigo en el mercadillo de Navidad|Tenir l'étal d'un ami au marché de Noël|友人のクリスマス市の屋台を任される",
    "The regular stallholder came down with a cold two days before the market's busiest weekend, and selling mulled wine and roasted almonds to a steady queue of shoppers in the cold turned out to be more lucrative than expected, cash tin filling fast in gloved hands.|El vendedor habitual del puesto se resfrió dos días antes del fin de semana más concurrido del mercadillo, y vender vino caliente y almendras tostadas a una cola constante de compradores con frío resultó más rentable de lo esperado, con la caja llenándose rápido en manos enguantadas.|Le tenancier habituel de l'étal a attrapé un rhume deux jours avant le week-end le plus chargé du marché, et vendre du vin chaud et des amandes grillées à une file constante de clients transis s'est révélé plus lucratif que prévu, la caisse se remplissant vite dans des mains gantées.|市がいちばん混み合う週末の2日前、いつもの屋台の主人が風邪を引いてしまった。寒さの中を並ぶ客たちにホットワインと炒りアーモンドを売る仕事は、思いのほか実入りが良く、手袋をした手の中で釣り銭箱がみるみる膨らんだ。",
    [8],
  ),

  // ---- balk バルカン半島 ----
  ev(
    "rakija-toast-luck", "gain", ["balk"], "🥃", 200,
    "A stranger's toast at a village wedding|Un brindis de un desconocido en una boda de pueblo|Le toast d'un inconnu à un mariage de village|村の結婚披露宴で見知らぬ人と乾杯する",
    "Walking past a village wedding party spilling out of the church was enough to be pulled in for a toast, and the tradition of pressing a small banknote into a passing guest's hand for good luck left the walk continuing a little richer than it started.|Pasar junto a una boda de pueblo que se desbordaba de la iglesia bastó para que tirasen de alguien hacia un brindis, y la tradición de meter un billete pequeño en la mano de un invitado de paso, por buena suerte, dejó el paseo un poco más rico de lo que empezó.|Passer devant un mariage de village qui débordait de l'église suffit à se faire entraîner pour porter un toast, et la tradition de glisser un petit billet dans la main d'un invité de passage, pour la chance, laissa la promenade un peu plus riche qu'au départ.|教会からあふれ出す村の結婚披露宴の前を通りかかっただけで、乾杯の輪に引き込まれた。縁起担ぎに通りすがりの客の手へ小額紙幣を握らせる習わしのおかげで、歩き始めたときより少し懐が温かくなって道を続けることになった。",
  ),
  ev(
    "mountain-trail-guide-fee", "loss", ["balk"], "🥾", 210,
    "Paying for a guide after losing the trail|Pagando a un guía tras perder el sendero|Payer un guide après avoir perdu le sentier|道に迷ってガイドを雇う羽目になる",
    "The waymarks thinned out well before the ridge, and what looked like a shortcut down through the trees led nowhere useful at all, so the fee for the shepherd willing to walk the group back to the road felt cheap compared to the alternative of staying lost until dark.|Las marcas del sendero se hicieron escasas bastante antes de llegar a la cresta, y lo que parecía un atajo entre los árboles no llevaba a ninguna parte, así que la tarifa del pastor dispuesto a acompañar al grupo de vuelta a la carretera pareció barata comparada con la alternativa de seguir perdidos hasta el anochecer.|Les balises se firent rares bien avant la crête, et ce qui ressemblait à un raccourci à travers les arbres ne menait nulle part d'utile, si bien que le tarif du berger prêt à raccompagner le groupe jusqu'à la route parut bon marché comparé à l'alternative de rester perdu jusqu'à la nuit.|尾根に着くよりずっと手前で道標がまばらになり、近道に見えた林の中の道はどこにも通じていなかった。羊飼いに頼んで道路まで連れ戻してもらう代金は、暗くなるまで迷い続けるという代案に比べれば安いものに思えた。",
    [5, 6, 7],
  ),
  ev(
    "folk-festival-dance", "gain", ["balk"], "💃", 220,
    "Filling in for a dancer at a folk festival|Sustituyendo a una bailarina en un festival folclórico|Remplacer un danseur à un festival folklorique|民俗フェスティバルで踊り手の代役を務める",
    "A dance troupe was short one pair of hands for the closing circle dance, and a quick fifteen minutes learning the steps backstage was enough to join the line for the paid performance, the audience never quite able to tell who had joined that morning.|Un grupo de baile necesitaba un par de manos más para la danza circular de cierre, y quince minutos aprendiendo los pasos entre bastidores bastaron para unirse a la fila en la actuación pagada, sin que el público notara nunca quién se había sumado esa misma mañana.|Une troupe de danse manquait d'une paire de bras pour la ronde de clôture, et un quart d'heure à apprendre les pas en coulisses suffit pour rejoindre la ligne lors de la représentation payée, le public ne devinant jamais qui s'était joint le matin même.|舞踊団が締めくくりの輪舞にもう一人分の手を必要としていた。舞台裏でわずか十五分だけ振りを教わっただけで、有料公演の列に加わることができた。観客には、その朝に加わったばかりだとは最後まで気づかれなかった。",
    [5, 6],
  ),

  // ---- east 東欧 ----
  ev(
    "amber-beachcombing", "gain", ["east"], "🟠", 210,
    "Finding amber after a storm|Encontrando ámbar tras una tormenta|Trouver de l'ambre après une tempête|嵐のあとに琥珀を拾う",
    "A storm the night before had churned up the seabed, and walking the tideline at first light turned up a handful of amber pieces good enough to sell straight to a workshop stall without needing to be polished first. Locals check the beach after every storm for exactly this reason.|Una tormenta la noche anterior había removido el fondo marino, y caminar por la orilla al amanecer sacó a la luz un puñado de trozos de ámbar lo bastante buenos para venderlos directamente a un puesto de taller sin necesidad de pulirlos antes. Los lugareños revisan la playa después de cada tormenta justo por esto.|Une tempête la nuit précédente avait remué le fond marin, et marcher sur la laisse de mer au petit matin fit apparaître une poignée de morceaux d'ambre assez beaux pour être vendus directement à un étal d'atelier sans avoir besoin d'être polis. Les habitants inspectent la plage après chaque tempête justement pour cela.|前の晩の嵐が海底をかき乱し、夜明けの波打ち際を歩くと、磨かなくてもそのまま工房の露店に売れるほど上質な琥珀が何粒か見つかった。地元の人々が嵐のたびに浜を見に行くのは、まさにこのためである。",
    [8, 9, 10],
  ),
  ev(
    "mushroom-forage-sale", "gain", ["east"], "🍄", 230,
    "Selling a basket of forest mushrooms|Vendiendo una cesta de setas del bosque|Vendre un panier de champignons des bois|森で採ったきのこのかごを売る",
    "An early start into the forest after a wet week turned up a full basket of edible mushrooms, and a roadside stall on the way back to the station paid in cash for more than half of it before the basket even made it home.|Una salida temprana al bosque tras una semana lluviosa dio como resultado una cesta llena de setas comestibles, y un puesto junto a la carretera de vuelta a la estación pagó en efectivo por más de la mitad antes de que la cesta llegara siquiera a casa.|Un départ matinal en forêt après une semaine pluvieuse a rempli un panier de champignons comestibles, et un étal au bord de la route sur le chemin du retour vers la gare en a payé plus de la moitié en espèces avant même que le panier n'arrive à la maison.|雨続きの一週間のあと、朝早くから森に入ると食用きのこがかごいっぱいに採れた。駅への帰り道の路傍の屋台が、かごが家に着く前にその半分以上を現金で買い取ってくれた。",
    [5, 6],
  ),
  ev(
    "sauna-lost-key", "loss", ["east"], "🔑", 190,
    "Locking a coat in the sauna changing room|Dejando el abrigo encerrado en el vestuario de la sauna|Enfermer son manteau dans le vestiaire du sauna|サウナの更衣室にコートを閉じ込める",
    "The wristband key snapped off in the locker before the coat, the wallet inside it, and the train ticket could be retrieved, and the attendant on duty could only shrug and point to the locksmith's number taped by the door, a call that was not free.|La pulsera con la llave se rompió en la taquilla antes de poder sacar el abrigo, la cartera de dentro y el billete de tren, y el encargado de turno solo pudo encogerse de hombros y señalar el número del cerrajero pegado junto a la puerta, una llamada que no fue gratis.|Le bracelet-clé s'est cassé dans le casier avant qu'on ait pu récupérer le manteau, le portefeuille à l'intérieur et le billet de train, et le préposé de service n'a pu que hausser les épaules et montrer le numéro du serrurier scotché près de la porte, un appel qui n'était pas gratuit.|コートも中の財布も列車の切符も取り出せないうちに、リストバンド式のロッカーの鍵が壊れてしまった。当番の係員は肩をすくめ、扉に貼られた鍵屋の電話番号を指すだけだった。その電話は無料ではなかった。",
  ),
];
