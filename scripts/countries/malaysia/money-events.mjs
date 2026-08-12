/**
 * マレーシアの青マス・赤マスで起きる出来事(22件。増14・減8)。
 *
 * 地方コード: cen=中部 / nor=北部 / eco=東海岸 / sou=南部 / swk=サラワク / sab=サバ
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける。そのうえで6地方それぞれに3件
 * (増2・減1)を、その土地で実際に起こりそうな話として置いている。
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

export const MALAYSIA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年 ----
  ev(
    "mamak-tip", "gain", [], "🍵", 220,
    "A busy night helping out at a mamak stall|Una noche ajetreada ayudando en un puesto mamak|Une soirée animée à aider dans un stand mamak|忙しい夜、マママック屋台で手伝う",
    "The 24-hour mamak stall was short-handed the night a football match packed every plastic stool with fans shouting over glasses of teh tarik, and a few hours clearing tables and running orders earned a cut of the night's tips. Mamak stalls, run by Malaysians of South Indian Muslim descent, serve as much as informal all-hours community living rooms as they do roti canai and curry.|El puesto mamak de 24 horas andaba corto de personal la noche en que un partido de fútbol llenó todos los taburetes de plástico con aficionados gritando sobre vasos de teh tarik, y unas horas recogiendo mesas y llevando pedidos ganaron una parte de las propinas de la noche.|Le stand mamak ouvert 24 h sur 24 manquait de personnel le soir où un match de football remplissait chaque tabouret en plastique de supporters criant par-dessus leurs verres de teh tarik, et quelques heures à débarrasser les tables et courir les commandes ont rapporté une part des pourboires de la nuit.|24時間営業のマママック屋台は、サッカーの試合でプラスチック椅子が満席になり、客がテタレのグラス越しに叫び合う夜、人手が足りていなかった。数時間テーブルを片付け注文を運んだだけで、その夜のチップの分け前を得た。南インド系ムスリムのマレーシア人が営むマママック屋台は、料理を出すだけでなく、24時間開いている地域の茶の間のような役割も果たしている。",
  ),
  ev(
    "durian-lorry", "gain", [], "🥭", 240,
    "Unloading a durian lorry for cash|Descargando un camión de durianes por dinero|Décharger un camion de durians contre de l'argent|ドリアン運搬トラックの積み下ろしを手伝う",
    "A lorry idling outside a wholesale market needed extra hands to unload crates of spiky fruit before the day's heat set in, paid by the basket rather than the hour, gloves strongly recommended but rarely worn by the regulars. Durian season floods markets with more fruit than any one crew can move alone.|Un camión al ralentí frente a un mercado mayorista necesitaba manos extra para descargar cajas de fruta espinosa antes de que apretara el calor del día, pagado por cesta y no por hora, con guantes muy recomendados pero rara vez usados por los habituales.|Un camion au ralenti devant un marché de gros avait besoin de bras supplémentaires pour décharger des caisses de fruits épineux avant que la chaleur du jour ne s'installe, payé au panier plutôt qu'à l'heure, gants vivement recommandés mais rarement portés par les habitués.|卸売市場の前でアイドリングしていたトラックが、日中の暑さが本格化する前にとげだらけの果物の木箱を降ろす人手を求めていた。時給ではなくかご単位の払いで、手袋は強く勧められるが常連はあまりつけない。",
    [3, 4],
  ),
  ev(
    "saman-parking", "loss", [], "🎫", 150,
    "A parking summons for an expired coupon|Una multa de aparcamiento por un cupón caducado|Une contravention de stationnement pour un coupon expiré|駐車券の期限切れで違反切符(サマン)",
    "The paper parking coupon, scratched to mark the arrival time, expired while the errand ran twenty minutes longer than planned, and the yellow saman tucked under the wiper blade was waiting by the time anyone got back to the car. Many Malaysian towns still run on this honesty-based coupon system rather than digital meters.|El cupón de aparcamiento de papel, rascado para marcar la hora de llegada, caducó mientras el recado se alargó veinte minutos más de lo previsto, y el saman amarillo bajo el limpiaparabrisas esperaba al volver al coche.|Le coupon de stationnement en papier, gratté pour marquer l'heure d'arrivée, expira pendant que la course dura vingt minutes de plus que prévu, et le saman jaune glissé sous l'essuie-glace attendait au retour à la voiture.|到着時刻を削って示す紙の駐車券は、用事が予定より20分長引いているあいだに期限切れになり、車に戻ったときにはワイパーの下に黄色い違反切符(サマン)が挟まれていた。マレーシアの多くの町ではいまもデジタルの駐車メーターではなく、この自己申告式の券のしくみが使われている。",
  ),
  ev(
    "bola-taruhan", "loss", [], "⚽", 170,
    "A small bet lost on an English football match|Una pequeña apuesta perdida en un partido de fútbol inglés|Un petit pari perdu sur un match de football anglais|イングランドのサッカー賭けに負ける",
    "The mamak stall's television stayed on English Premier League football until well past midnight, and a friendly bet on the underdog looked good until the ninetieth minute unraveled it completely. Malaysia's devotion to English football, a habit dating back to the colonial era, means match nights fill coffee shops nationwide regardless of kickoff time.|La televisión del puesto mamak siguió con fútbol de la Premier League inglesa hasta bien pasada la medianoche, y una apuesta amistosa por el equipo débil pintaba bien hasta que el minuto noventa lo deshizo todo. La devoción de Malasia por el fútbol inglés llena de gente los cafés en toda la noche del partido, sea cual sea la hora de inicio.|La télévision du stand mamak est restée sur le football de Premier League anglaise bien après minuit, et un pari amical sur l'outsider semblait bien engagé jusqu'à ce que la quatre-vingt-dixième minute ne défasse tout. La dévotion de la Malaisie pour le football anglais remplit les cafés dans tout le pays, quelle que soit l'heure du coup d'envoi.|マママック屋台のテレビは深夜過ぎまでイングランドのプレミアリーグを流し続け、格下チームに賭けた気軽な賭けは90分目まで良い調子だったが、そこですべてが崩れた。植民地時代にまで遡るイングランドサッカーへのマレーシアの熱狂は、キックオフの時刻にかかわらず全国の喫茶店を試合の夜ごとに満席にする。",
  ),

  // ---- cen 中部(クランバレー) ----
  ev(
    "grab-surge", "gain", ["cen"], "🚗", 260,
    "Driving through a surge-pricing downpour|Conduciendo bajo un aguacero con tarifa dinámica|Conduire sous une averse à tarif majoré|土砂降りの中、割増運賃で走る",
    "A sudden afternoon downpour flooded the usual taxi ranks with riders at once, and surge pricing on the app more than doubled the fare for anyone willing to brave KL's flooded underpasses for a few hours. Klang Valley traffic apps track these spikes closely enough that some drivers plan entire shifts around chasing the weather.|Un aguacero repentino de tarde inundó de golpe las paradas de taxi habituales de pasajeros, y la tarifa dinámica de la app más que duplicó el precio para quien se atreviera con los pasos subterráneos anegados de KL durante unas horas.|Une averse soudaine de l'après-midi a inondé d'un coup les stations de taxi habituelles de passagers, et le tarif majoré de l'appli a plus que doublé la course pour qui osait affronter les passages inondés de KL pendant quelques heures.|突然の午後の土砂降りで、いつものタクシー乗り場に客が一気に押し寄せ、アプリの割増運賃が、数時間クアラルンプールの冠水した地下道に挑む気のある者の運賃を2倍以上に押し上げた。クランバレーの交通アプリはこうした急増を細かく捉えており、天気を追いかけてシフトを組む運転手もいるほどだ。",
  ),
  ev(
    "amcorp-flea", "gain", ["cen"], "🕰️", 210,
    "Selling old finds at the Amcorp Mall flea market|Vendiendo hallazgos antiguos en el mercadillo de Amcorp Mall|Vendre de vieilles trouvailles au marché aux puces d'Amcorp Mall|アムコープモールの蚤の市で古物を売る",
    "A box of old vinyl records and odd trinkets cleared out of a relative's storeroom turned into a folding table at Petaling Jaya's weekend flea market, and collectors picked through it faster than expected. The market has run out of the same mall car park for decades and draws a loyal crowd hunting for exactly this kind of forgotten box.|Una caja de discos de vinilo viejos y baratijas sueltas sacadas del trastero de un pariente se convirtió en una mesa plegable en el mercadillo de fin de semana de Petaling Jaya, y los coleccionistas la rebuscaron más rápido de lo esperado.|Une boîte de vieux disques vinyle et de babioles sorties du débarras d'un proche s'est transformée en table pliante au marché aux puces du week-end de Petaling Jaya, et les collectionneurs l'ont fouillée plus vite que prévu.|親戚の物置から出てきた古いレコードや雑多な小物の箱が、週末のプタリンジャヤの蚤の市で折りたたみ机の上の商品になり、コレクターたちは思ったより早くそれを漁っていった。この市場は何十年も同じモールの駐車場で開かれ続けており、まさにこうした忘れられた箱を探す常連客を引き寄せている。",
  ),
  ev(
    "toll-jam", "loss", ["cen"], "🛣️", 180,
    "Wasted fuel stuck in a highway toll jam|Combustible desperdiciado atascado en un peaje de autopista|Carburant gaspillé bloqué à un péage d'autoroute|高速道路の料金所渋滞で燃料を浪費",
    "A broken barrier at one lane backed up the toll plaza for nearly an hour during the evening rush, and the idling engine burned through fuel faster than the trip itself ever would have. Klang Valley's web of privately operated expressways charges tolls at nearly every interchange, and a single stuck gantry can back traffic up for kilometres.|Una barrera averiada en un carril atascó la plaza de peaje casi una hora durante la hora punta de la tarde, y el motor al ralentí quemó más combustible del que habría gastado todo el trayecto.|Une barrière en panne sur une voie a bloqué la gare de péage pendant près d'une heure à l'heure de pointe du soir, et le moteur au ralenti a brûlé plus de carburant que le trajet lui-même n'en aurait consommé.|夕方のラッシュ時、一車線の遮断機の故障が料金所をほぼ1時間詰まらせ、アイドリングするエンジンは道中そのものより多くの燃料を食いつぶした。クランバレーの民間運営の高速道路網はほぼすべてのインターチェンジで料金を取るため、たった一つのゲートの故障が何キロも渋滞を引き起こすことがある。",
  ),

  // ---- nor 北部(ペルリス・ケダ・ペナン・ペラ) ----
  ev(
    "penang-mural-tip", "gain", ["nor"], "🎨", 200,
    "Posing beside a George Town street mural|Posando junto a un mural callejero de George Town|Poser près d'une fresque de rue à George Town|ジョージタウンの壁画のそばでポーズを取る",
    "A tour group wanted a local in the frame beside the famous bicycle mural for a magazine feature, and standing still for twenty minutes of photos paid better than the morning's actual errand would have. George Town's street art trail, begun in 2012, now draws so much foot traffic that some murals have needed repainting from constant touching.|Un grupo turístico quería a un local en el encuadre junto al famoso mural de la bicicleta para un reportaje de revista, y quedarse quieto veinte minutos para las fotos pagó mejor que el recado real de la mañana.|Un groupe de touristes voulait un habitant dans le cadre à côté de la célèbre fresque du vélo pour un reportage de magazine, et rester immobile vingt minutes pour les photos a mieux payé que la course prévue ce matin-là.|観光ツアーの一行が、雑誌の特集記事のために有名な自転車の壁画のそばに地元の人を写り込ませたがり、20分間じっと写真に収まっているだけで、その朝予定していた本来の用事より稼ぎになった。2012年に始まったジョージタウンのストリートアート巡りはいまや人通りが多く、触られすぎて塗り直しが必要になった壁画もある。",
  ),
  ev(
    "sawah-upah", "gain", ["nor"], "🌾", 230,
    "A day's wage helping with the Kedah rice harvest|Un jornal ayudando en la cosecha de arroz de Kedah|Un salaire journalier pour aider à la récolte de riz au Kedah|ケダの稲刈りを手伝って日当をもらう",
    "A rice farmer short on hands before a rainstorm offered a flat day's wage to anyone who could swing a sickle, and by evening a full paddy field's worth of stalks lay bundled and dry under cover just in time. Kedah's paddies are harvested twice a year, and a poorly timed downpour can ruin weeks of growth in an afternoon.|Un agricultor de arroz con falta de manos antes de una tormenta ofreció un jornal fijo a quien supiera manejar una hoz, y para el anochecer todo un arrozal de tallos quedó atado y seco bajo techo justo a tiempo.|Un riziculteur manquant de bras avant un orage offrit un salaire journalier fixe à quiconque savait manier une faucille, et au soir toute une rizière de tiges se retrouva liée et à l'abri, juste à temps.|嵐が来る前に人手が足りなかった稲作農家が、鎌を振れる者なら誰でも日当を払うと申し出た。夕方には田んぼ一面分の稲が束ねられ、間一髪で屋根の下に運び込まれていた。ケダ州の田んぼは年に二度収穫され、タイミングの悪い豪雨が何週間もの生育を一晩で台無しにすることもある。",
    [1, 2],
  ),
  ev(
    "durian-runtuh-kereta", "loss", ["nor"], "🚗", 190,
    "A fallen durian dents a parked motorbike|Un durian caído abolla una moto aparcada|Un durian tombé cabosse une moto garée|落ちてきたドリアンでバイクがへこむ",
    "A fruit ripened overnight and let go from a roadside tree exactly where a motorbike had been parked under its shade, and the dent it left in the fuel tank cost more to fix than the durian itself would ever have sold for. Locals know better than to park under a fruiting tree during the season, but the shade is tempting on a hot afternoon.|Una fruta que maduró de noche se soltó de un árbol junto a la carretera justo donde había aparcada una moto a su sombra, y la abolladura que dejó en el depósito costó más de arreglar de lo que el propio durian se habría vendido.|Un fruit, mûri pendant la nuit, se détacha d'un arbre en bord de route exactement là où une moto était garée à son ombre, et la bosse laissée dans le réservoir coûta plus cher à réparer que le durian lui-même n'aurait jamais valu à la vente.|一晩で熟した果実が道端の木から落ち、ちょうどその陰にバイクが停めてあった場所を直撃した。燃料タンクにできたへこみの修理代は、そのドリアン自体を売って得られたであろう額より高くついた。地元の人は季節中は実のなる木の下に停めないほうがいいと知っているが、暑い午後には日陰が誘惑的すぎる。",
    [1, 2, 3, 4],
  ),

  // ---- eco 東海岸(クランタン・トレンガヌ・パハン) ----
  ev(
    "wau-hadiah", "gain", ["eco"], "🪁", 210,
    "A small prize at a kite-flying competition|Un pequeño premio en un concurso de cometas|Un petit prix à un concours de cerfs-volants|凧揚げ競技会での小さな賞金",
    "A borrowed wau caught an unusually steady wind on the beach and climbed higher and hummed louder than anyone expected, placing well enough in the local competition to take home a modest cash prize. Wau contests are judged on height, stability, and the sound the bow attached to the kite makes as it climbs.|Un wau prestado atrapó un viento inusualmente estable en la playa y subió más alto y zumbó más fuerte de lo esperado, quedando lo bastante bien en el concurso local como para llevarse un modesto premio en metálico.|Un wau emprunté attrapa un vent inhabituellement stable sur la plage et monta plus haut, bourdonnant plus fort que prévu, se classant assez bien au concours local pour rapporter un modeste prix en espèces.|借り物のワウ(装飾凧)が浜辺で珍しく安定した風をつかみ、思っていたより高く上がって大きく唸り、地元の競技会でそれなりの順位に入って、ささやかな賞金を持ち帰ることになった。ワウの競技は、上がる高さと安定性、そして取り付けた弓が上昇中に鳴らす音で審査される。",
  ),
  ev(
    "penyu-sukarelawan", "gain", ["eco"], "🐢", 220,
    "A stipend for a night guarding a turtle nest|Un estipendio por una noche vigilando un nido de tortugas|Une indemnité pour une nuit à surveiller un nid de tortue|海亀の産卵地を一晩見張って謝礼をもらう",
    "A conservation group needed an extra pair of eyes on the beach through the night to log a nesting green turtle and move her eggs to a protected hatchery before poachers or high tide could reach them, work that paid a modest stipend for a mostly sleepless night. Turtle numbers on Malaysia's east coast have fallen sharply since the mid-20th century.|Un grupo conservacionista necesitaba ojos extra en la playa toda la noche para registrar a una tortuga verde anidando y trasladar sus huevos a un vivero protegido antes de que los furtivos o la marea alta los alcanzaran, trabajo pagado con un estipendio modesto por una noche casi sin dormir.|Un groupe de conservation avait besoin d'yeux supplémentaires sur la plage toute la nuit pour recenser une tortue verte en train de pondre et déplacer ses œufs vers une nurserie protégée avant que braconniers ou marée haute ne les atteignent, travail payé d'une modeste indemnité pour une nuit presque blanche.|保護団体が、産卵中のアオウミガメを記録し、密猟者や満潮が届く前に卵を保護された孵化場へ移すため、夜通し浜辺を見張る人手を求めていた。ほとんど眠れない一晩の見返りはささやかな謝礼だった。マレーシア東海岸の海亀の数は20世紀半ば以降大きく減少している。",
    [1, 2, 3, 4],
  ),
  ev(
    "monsun-batal", "loss", ["eco"], "🌊", 200,
    "A monsoon swell cancels a paid boat trip|Un oleaje monzónico cancela una excursión en barco pagada|Une houle de mousson annule une excursion en bateau payée|モンスーンのうねりで予約した船旅が中止に",
    "The boatman refunded most of the fare but kept a deposit for fuel already bought, once the swell off the jetty grew too rough to safely cross to the island as booked, a call made at the very last minute after everyone had already loaded their bags aboard. Northeast monsoon swells can close island crossings for days at a time with little warning.|El barquero devolvió la mayor parte de la tarifa pero se quedó con un depósito por el combustible ya comprado, una vez que el oleaje frente al embarcadero se volvió demasiado fuerte para cruzar con seguridad a la isla, decisión tomada en el último minuto cuando ya todos habían subido el equipaje.|Le batelier remboursa l'essentiel du tarif mais garda un acompte pour le carburant déjà acheté, une fois la houle au large de la jetée devenue trop forte pour traverser en sécurité vers l'île, décision prise à la toute dernière minute alors que tout le monde avait déjà chargé ses sacs à bord.|桟橋沖のうねりが激しくなり、予約していた島への渡航が安全に行えなくなったため、船頭は運賃の大半を払い戻したが、すでに買ってあった燃料代分は保証金として差し引いた。荷物を積み込んだ直後、ぎりぎりの判断だった。北東モンスーンのうねりはほとんど前触れなく、何日も島への渡航を止めてしまうことがある。",
    [7, 8, 9, 10],
  ),

  // ---- sou 南部(ヌグリスンビラン・マラッカ・ジョホール) ----
  ev(
    "jonker-malam", "gain", ["sou"], "🎶", 210,
    "Busking for tourist crowds at the Jonker Street night market|Tocando música para turistas en el mercado nocturno de Jonker Street|Jouer de la musique pour les touristes au marché nocturne de Jonker Street|ジョンカー通り夜市で観光客相手に流し歌をする",
    "A borrowed guitar and a folding stool between two food stalls caught enough of the Friday night crowd's attention to fill a tip jar twice over before the market wound down near midnight. Malacca's weekend pasar malam turns the historic street into a slow-moving river of shoppers, food smoke, and karaoke stalls.|Una guitarra prestada y un taburete plegable entre dos puestos de comida captaron suficiente atención de la multitud del viernes por la noche como para llenar el bote de propinas dos veces antes de que el mercado se recogiera cerca de medianoche.|Une guitare empruntée et un tabouret pliant entre deux étals de nourriture ont attiré assez l'attention de la foule du vendredi soir pour remplir deux fois le pot à pourboires avant que le marché ne ferme vers minuit.|借りたギターと折りたたみ椅子を二つの屋台のあいだに置くと、金曜夜の人混みの注目を十分に集め、市場が真夜中近くに片付き始めるまでにチップ入れは二度も満杯になった。マラッカの週末のパサール・マラム(夜市)は、歴史ある通りを買い物客と食べ物の煙、カラオケの屋台がゆっくり流れる川のような場所に変える。",
  ),
  ev(
    "jb-daytripper", "gain", ["sou"], "💱", 230,
    "Selling snacks to Singaporean day-trippers at a strong exchange rate|Vendiendo aperitivos a turistas de un día de Singapur con un tipo de cambio favorable|Vendre des collations à des visiteurs d'un jour venus de Singapour à un taux de change avantageux|好条件の為替でシンガポールからの日帰り客にお菓子を売る",
    "A cart of snacks parked near the Causeway checkpoint sold out twice over on a weekend when the Singapore dollar was especially strong, since day-trippers crossing over for cheaper everything treated the exchange rate itself as the day's real bargain. Hundreds of thousands cross the Johor-Singapore border most weekends for exactly this reason.|Un carrito de aperitivos aparcado cerca del control de la Causeway se agotó dos veces en un fin de semana en que el dólar de Singapur estaba especialmente fuerte, ya que los visitantes de un día que cruzaban por lo barato de todo trataban el propio tipo de cambio como la verdadera ganga del día.|Un chariot de collations garé près du poste de contrôle de la Causeway s'est vendu deux fois en un week-end où le dollar singapourien était particulièrement fort, les visiteurs d'un jour traversant pour la vie moins chère traitant le taux de change lui-même comme la vraie bonne affaire du jour.|コーズウェイの検問所近くに停めたお菓子の屋台は、シンガポールドルが特に強かった週末に二度も売り切れた。安さを求めて渡ってくる日帰り客にとっては、為替レートそのものがその日いちばんの掘り出し物だったからである。ジョホール―シンガポール国境はほとんどの週末、まさにこの理由で何十万人もが行き交う。",
  ),
  ev(
    "causeway-terperangkap", "loss", ["sou"], "🚦", 180,
    "Hours lost stuck in the Causeway jam|Horas perdidas atascado en el atasco de la Causeway|Des heures perdues coincé dans l'embouteillage de la Causeway|コーズウェイの渋滞に何時間も足止めされる",
    "A booked appointment across the strait slipped away entirely after the immigration queue at the Causeway backed up for kilometres on a public holiday weekend, the deposit for the missed slot gone along with the afternoon. Weekend and holiday crossings between Johor Bahru and Singapore are notorious for queues lasting several hours each way.|Una cita reservada al otro lado del estrecho se esfumó por completo después de que la cola de inmigración en la Causeway se atascara kilómetros en un fin de semana festivo, y el depósito de la cita perdida se fue junto con la tarde.|Un rendez-vous réservé de l'autre côté du détroit s'est complètement envolé après que la file d'immigration à la Causeway s'est étirée sur des kilomètres un week-end férié, l'acompte pour le créneau manqué disparaissant avec l'après-midi.|祝日の週末、コーズウェイの入国審査の列が何キロも延びたせいで、海峡の向こうで予約していた用事は完全に流れてしまい、逃した予約の保証金はその午後もろとも消えた。ジョホールバルとシンガポールを結ぶ週末・祝日の往来は、片道数時間の行列で悪名高い。",
  ),

  // ---- swk サラワク州 ----
  ev(
    "sape-persembahan", "gain", ["swk"], "🎸", 220,
    "Tips for accompanying a sape player at a longhouse gathering|Propinas por acompañar a un músico de sape en una reunión de casa larga|Pourboires pour accompagner un joueur de sape lors d'un rassemblement en maison longue|ロングハウスの集いでサペ奏者に伴奏をつけて謝礼をもらう",
    "A longhouse celebration needed a second hand keeping rhythm on a hollow bamboo tube while the sape player carried the melody late into the night, and guests passing by pressed small notes into a jar set out for exactly that purpose. The sape, a Sarawakian lute, is carved from a single log and traditionally plays long, hypnotic melodic lines.|Una celebración en una casa larga necesitaba una segunda mano marcando el ritmo con un tubo de bambú hueco mientras el músico de sape llevaba la melodía hasta bien entrada la noche, y los invitados que pasaban metían billetes pequeños en un bote dispuesto justo para eso.|Une fête en maison longue avait besoin d'une deuxième main pour battre le rythme sur un tube de bambou creux pendant que le joueur de sape portait la mélodie tard dans la nuit, et les invités de passage glissaient de petits billets dans un bocal prévu à cet effet.|ロングハウスの祝宴で、サペ奏者が夜遅くまで旋律を奏でるあいだ、中空の竹筒でリズムを刻む二人目の手が求められた。通りかかった客たちは、そのために置かれた壺に小銭を入れていった。サラワクの弦楽器サペは一本の丸太から彫り出され、伝統的に長く陶酔的な旋律を奏でる。",
  ),
  ev(
    "lada-hitam", "gain", ["swk"], "🌶️", 220,
    "A day's wage picking black pepper|Un jornal recogiendo pimienta negra|Un salaire journalier pour la cueillette du poivre noir|黒コショウ摘みの日当",
    "A smallholder's pepper vines were dropping ripe berries faster than the family alone could pick them, and a day spent stripping clusters by hand under the trellises paid a flat wage by evening. Sarawak has grown black pepper as a smallholder cash crop since the 19th century and remains one of the world's most respected sources of it.|Las enredaderas de pimienta de un pequeño agricultor soltaban bayas maduras más rápido de lo que la familia sola podía recogerlas, y un día arrancando racimos a mano bajo las espalderas pagó un jornal fijo al anochecer.|Les lianes de poivre d'un petit exploitant laissaient tomber des baies mûres plus vite que la famille seule ne pouvait les cueillir, et une journée à détacher les grappes à la main sous les treillis a rapporté un salaire fixe le soir venu.|小規模農家のコショウのつるは、家族だけでは摘みきれないほどの速さで熟した実を落としていた。棚の下で一日じゅう手で房を摘み取った労働には、夕方に定額の日当が支払われた。サラワクは19世紀から小規模農家の換金作物として黒コショウを栽培しており、いまも世界屈指の評価を得る産地であり続けている。",
    [4, 5, 6],
  ),
  ev(
    "sungai-lewat", "loss", ["swk"], "🛶", 190,
    "A low river strands a boat connection|Un río bajo deja varada una conexión en barco|Une rivière basse bloque une correspondance en bateau|川の水位が低く船の接続が失われる",
    "The express boat upriver couldn't clear a gravel bar after weeks without rain, and the fare for the missed onward connection went unrefunded while an overnight stay at the nearest jetty town ate into the budget instead. Sarawak's interior settlements along the Rajang and Baram rivers depend on water levels high enough for boat traffic, which the dry season can threaten for weeks at a stretch.|El barco expreso río arriba no pudo salvar un banco de grava tras semanas sin lluvia, y la tarifa de la conexión perdida no se reembolsó mientras una noche en el pueblo del embarcadero más cercano se comía el presupuesto.|Le bateau express en amont n'a pas pu franchir un banc de gravier après des semaines sans pluie, et le prix de la correspondance manquée n'a pas été remboursé, une nuit dans la ville-jetée la plus proche grevant le budget à la place.|何週間も雨が降らず、上流行きの急行ボートは砂利州を越えられなかった。乗り継ぎ運賃は払い戻されず、代わりに最寄りの船着き場の町での一泊が予算を圧迫した。ラジャン川やバラム川沿いのサラワク内陸の集落は、船の往来に十分な水位を必要としており、乾季には何週間も水位が下がり続けることがある。",
    [0, 11],
  ),

  // ---- sab サバ州 ----
  ev(
    "sipadan-bantu", "gain", ["sab"], "🤿", 250,
    "Tips for assisting a dive group at Sipadan|Propinas por ayudar a un grupo de buceo en Sipadán|Pourboires pour avoir assisté un groupe de plongée à Sipadan|シパダンでダイビンググループの手伝いをして謝礼をもらう",
    "A dive operator short a boat hand for the day paid well for someone who could count tanks, hand out fins, and keep track of divers surfacing near a current known for sweeping people some distance from the boat. Sipadan's permit system limits the island to a set number of divers a day, which keeps operators competing hard for reliable extra hands.|Un operador de buceo, corto de personal en el barco por un día, pagó bien a quien supiera contar tanques, repartir aletas y llevar la cuenta de los buzos que salían cerca de una corriente conocida por arrastrar a la gente lejos del barco.|Un opérateur de plongée manquant d'un aide sur le bateau pour la journée a bien payé quelqu'un capable de compter les bouteilles, distribuer les palmes et surveiller les plongeurs remontant près d'un courant connu pour emporter les gens loin du bateau.|その日ボート要員が足りなかったダイビング業者は、タンクを数え、フィンを配り、ボートから離れた場所へ人を流すことで知られる潮流の近くで浮上するダイバーを見張れる人を高く雇った。シパダン島は許可証制度で1日あたりの潜水者数が制限されており、業者は信頼できる手伝いの確保を激しく競い合っている。",
  ),
  ev(
    "koko-tuai", "gain", ["sab"], "🍫", 220,
    "A day's wage helping with the cocoa harvest near Tawau|Un jornal ayudando en la cosecha de cacao cerca de Tawau|Un salaire journalier pour aider à la récolte de cacao près de Tawau|タワウ近郊のカカオ収穫を手伝う",
    "A smallholding needed extra hands to split open ripe cocoa pods and scoop the pulpy beans into sacks before the day's heat spoiled the harvest, paid a flat wage for a sticky, sweet-smelling afternoon's work. Cocoa around Tawau has shrunk considerably since palm oil took over most of the region's plantations, but a handful of smallholders still keep the trade alive.|Una pequeña finca necesitaba manos extra para partir vainas maduras de cacao y sacar los granos pulposos en sacos antes de que el calor del día estropeara la cosecha, pagado con un jornal fijo por una tarde pegajosa y de olor dulce.|Une petite exploitation avait besoin de bras supplémentaires pour fendre les cabosses de cacao mûres et verser les fèves pulpeuses dans des sacs avant que la chaleur du jour ne gâche la récolte, payé d'un salaire fixe pour un après-midi collant et parfumé.|小規模農園では、日中の暑さが収穫を台無しにする前に熟したカカオの莢を割り、果肉に包まれた豆を袋にすくい入れる人手を求めていた。ベタベタと甘い香りの漂う午後の労働には定額の日当が支払われた。タワウ周辺のカカオはパーム油に大半のプランテーションを奪われて大きく縮小したが、いまも少数の小規模農家がこの商いを続けている。",
    [5, 6, 7],
  ),
  ev(
    "pacat-hilang", "loss", ["sab"], "🩹", 180,
    "A phone lost to leeches and mud on a jungle trek|Un teléfono perdido entre sanguijuelas y barro en una caminata por la selva|Un téléphone perdu aux sangsues et à la boue lors d'une randonnée en jungle|ジャングルのトレッキングでヒルと泥に紛れて携帯電話を失う",
    "Stopping every few minutes to peel leeches off an ankle eventually meant setting a phone down on a muddy root to free both hands, and by the time the trail continued the phone had vanished into the undergrowth for good. Guides on Kinabalu Park's lower trails warn newcomers about leeches more than almost anything else on the mountain.|Detenerse cada pocos minutos para quitarse sanguijuelas del tobillo acabó significando dejar el teléfono sobre una raíz embarrada para tener las manos libres, y cuando el sendero continuó el teléfono ya había desaparecido para siempre entre la maleza.|S'arrêter toutes les quelques minutes pour détacher des sangsues de sa cheville a fini par obliger à poser le téléphone sur une racine boueuse pour avoir les deux mains libres, et le temps que le sentier reprenne, le téléphone avait disparu pour de bon dans les broussailles.|数分おきに足首からヒルを剥がすため、両手を空けようと携帯電話を泥だらけの木の根の上に置いたのが運の尽きで、道を再び歩き始めた頃には電話は下草の中に永遠に消えていた。キナバル公園の低地の登山道のガイドは、山にまつわるほとんど何よりもまずヒルについて新参者に警告する。",
  ),
];
