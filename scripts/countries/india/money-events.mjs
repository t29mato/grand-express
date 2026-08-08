/**
 * インドの青マス・赤マスで起きる出来事。
 *
 * 地方コード: him=ヒマラヤ北部 / gan=ガンジス平原 / des=砂漠西部 /
 *             dec=デカン中部 / sou=南インド / eas=東部北東部
 */
function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

function ev(id, kind, regs, emoji, amount, title, narrative) {
  return { id, kind, regs, e: emoji, amount, n: t(title), t: t(narrative) };
}

export const INDIA_MONEY_EVENTS = [
  // ---- 全国どこでも ----
  ev(
    "chai-refused-payment", "gain", [], "☕", 160,
    "The chai wallah won't take payment|El chaiwala no acepta pago|Le chaiwala refuse d'être payé|チャイ屋が代金を受け取らない",
    "The first customer of the day drinks free: by custom the first sale must go well. The clay cup is thrown down and smashed afterwards.|El primer cliente del día bebe gratis: por costumbre, la primera venta debe ir bien. La taza de barro se rompe después.|Le premier client du jour boit gratis : par coutume, la première vente doit bien se passer. La tasse d'argile est ensuite brisée.|その日の最初の客で、初商いは縁起よくと決まっているため代金を取らない。素焼きの器は飲んだあと地面に叩きつけて割る。",
  ),
  ev(
    "train-tatkal-fee", "loss", [], "🎫", 240,
    "Booking at the last minute|Reservar a última hora|Réserver à la dernière minute|直前の切符を買う",
    "Every seat is taken, so the only way on is the premium same-day quota. Indian Railways handles around 8 billion passenger journeys a year.|No queda plaza: el único modo de subir es el cupo del mismo día, con recargo. Los ferrocarriles indios mueven unos 8.000 millones de viajes al año.|Plus une place : il ne reste que le quota du jour, avec supplément. Les chemins de fer indiens assurent quelque 8 milliards de voyages par an.|席が埋まっており、当日枠の割増料金を払った。インド国鉄は年におよそ80億人を運ぶ。",
  ),
  ev(
    "wedding-invitation", "gain", [], "💒", 300,
    "Pulled into a wedding|Una boda que no deja pasar de largo|Entraîné dans un mariage|婚礼に引き込まれた",
    "A family spots a stranger near the procession and will not hear of anything but joining, eating, and leaving with sweets and a gift. Turning down the invitation would be the rude thing.|Una familia ve a un desconocido junto a la procesión e insiste: hay que comer y llevarse dulces y un regalo. Rechazar sería lo grosero.|Une famille repère un inconnu près du cortège et insiste : on mange et on repart avec sucreries et cadeau. Refuser serait impoli.|行列のそばにいた見知らぬ旅人を一家が見つけ、食べていけと譲らず、菓子と土産まで持たされた。断るほうが失礼にあたる。",
  ),
  ev(
    "crowded-carriage-theft", "loss", [], "🎒", 260,
    "A hand in the bag|Una mano en la bolsa|Une main dans le sac|荷物に手が伸びた",
    "A packed general carriage, shoulder against shoulder, and the side pocket is lighter at the next stop. Chain-and-padlock for luggage is sold on every platform.|Un vagón general lleno, hombro contra hombro, y en la siguiente parada el bolsillo pesa menos. En cada andén venden cadenas con candado.|Un wagon général bondé, épaule contre épaule, et à l'arrêt suivant la poche est plus légère. On vend chaînes et cadenas sur chaque quai.|混み合った一般車両で肩が触れ、次の駅では脇のポケットが軽くなっていた。どのホームでも荷物用の鎖と南京錠が売られている。",
  ),

  // ---- ヒマラヤ・北部 ----
  ev(
    "landslide-pass", "loss", ["him"], "⛰️", 280,
    "The pass is closed by a landslide|Un derrumbe cierra el paso|Un éboulement ferme le col|土砂崩れで峠が閉じた",
    "Monsoon rain brings the hillside onto the road, and the wait runs to two days in a tea house. Some Himalayan roads are open only four months a year.|La lluvia monzónica tira la ladera sobre la carretera y la espera se alarga dos días en una casa de té. Algunas rutas del Himalaya abren solo cuatro meses.|La pluie de mousson jette le versant sur la route : deux jours d'attente dans une maison de thé. Certaines routes himalayennes n'ouvrent que quatre mois par an.|モンスーンの雨で斜面が道を塞ぎ、茶屋で二日足止めになった。ヒマラヤの道には年に四か月しか通れないものもある。",
  ),
  ev(
    "monastery-hospitality", "gain", ["him"], "🛕", 240,
    "A night at the monastery|Una noche en el monasterio|Une nuit au monastère|僧院に泊めてもらう",
    "The monks hand out a bed, butter tea and breakfast and refuse anything for it. Ladakh's monasteries have kept travellers for centuries on the trade route.|Los monjes ofrecen cama, té con mantequilla y desayuno, y no aceptan nada. Los monasterios de Ladakh albergan viajeros desde hace siglos.|Les moines offrent lit, thé au beurre et petit-déjeuner sans rien accepter. Les monastères du Ladakh accueillent les voyageurs depuis des siècles.|僧たちは寝床とバター茶と朝食を出し、何も受け取らなかった。ラダックの僧院は交易路の旅人を何世紀も泊めてきた。",
  ),

  // ---- ガンジス平原 ----
  ev(
    "ghat-boatman", "gain", ["gan"], "🪔", 200,
    "The boatman shares the evening take|El barquero comparte la recaudación|Le batelier partage la recette|渡し守が分け前をくれた",
    "The boats going out for the evening lamp ceremony are short of rowers, and the fare is shared out. Thousands of leaf boats with oil lamps are floated every night.|Faltan remeros para la ceremonia de las lámparas y el pasaje se reparte. Cada noche se echan al agua miles de barquitas con velas.|Les barques de la cérémonie des lampes manquent de rameurs, et la recette se partage. Des milliers de barquettes à lampe sont lâchées chaque soir.|夕べの灯明の儀式へ人を渡す舟を漕ぐのを手伝い、分け前をもらった。毎晩、油の灯明をのせた葉の小舟が何千と流される。",
  ),
  ev(
    "monkey-snatch", "loss", ["gan"], "🐒", 180,
    "A monkey takes the glasses|Un mono se lleva las gafas|Un singe emporte les lunettes|猿に眼鏡を取られた",
    "Temple macaques have learned that spectacles get traded back for food. Some troops will only return an item once the fruit is visible.|Los macacos del templo saben que las gafas se cambian por comida. Algunos grupos solo devuelven el objeto cuando ven la fruta.|Les macaques du temple savent qu'on échange les lunettes contre de la nourriture. Certains ne rendent l'objet qu'une fois le fruit visible.|寺の猿は、眼鏡が食べ物と引き換えになることを覚えている。果物を見せるまで返さない群れもある。",
  ),

  // ---- 砂漠・西部 ----
  ev(
    "desert-hospitality", "gain", ["des"], "🐪", 260,
    "A camel herder feeds a stranger|Un camellero da de comer a un forastero|Un chamelier nourrit un inconnu|らくだ飼いにもてなされた",
    "A night's lodging comes with millet bread and buttermilk, and the send-off comes with a bundle. In the Thar, refusing a traveller water is close to unthinkable.|El alojamiento viene con pan de mijo y suero, y la despedida con un hatillo. En el Thar, negar agua a un viajero es casi impensable.|L'hébergement vient avec du pain de millet et du babeurre, et le départ avec un paquet. Dans le Thar, refuser de l'eau à un voyageur est impensable.|雑穀のパンとバターミルクで一晩泊めてもらい、包みまで持たされた。タール砂漠では、旅人に水を断ることはまず考えられない。",
  ),
  ev(
    "sandstorm-repair", "loss", ["des"], "🌪️", 220,
    "Sand in everything|Arena por todas partes|Du sable partout|砂が入り込んだ",
    "A pre-monsoon dust storm turns the afternoon orange, and no camera comes through it clean. These storms can carry sand for hundreds of kilometres.|Una tormenta de polvo previa al monzón vuelve naranja la tarde y ninguna cámara sale limpia de ella. Arrastran arena cientos de kilómetros.|Une tempête de poussière d'avant-mousson orange l'après-midi ; aucun appareil n'en sort indemne. Ces tempêtes portent le sable sur des centaines de kilomètres.|モンスーン前の砂嵐で午後がオレンジ色に染まり、カメラは二度と直らなかった。この嵐は砂を数百km運ぶ。",
  ),

  // ---- デカン・中部 ----
  ev(
    "dabbawala-tip", "gain", ["dec"], "🍱", 180,
    "A quick hand saves the lunchbox|Una mano rápida salva la fiambrera|Une main preste sauve la gamelle|弁当箱を救った",
    "A tin slips from the rack and a quick hand catches it; the carriers pay for the save. The network delivers 200,000 lunches a day with almost no errors.|Una lata se cae del portaequipajes y una mano rápida la atrapa; los repartidores recompensan la salvada. La red entrega 200.000 comidas al día casi sin fallos.|Une gamelle glisse du porte-bagages, une main la rattrape ; les porteurs récompensent le sauvetage. Le réseau livre 200 000 repas par jour, presque sans erreur.|棚から落ちかけた弁当箱を受け止め、運び手たちから礼をもらった。この網は1日20万食を、ほとんど間違いなく届ける。",
  ),
  ev(
    "film-extra", "gain", ["dec"], "🎬", 320,
    "Hired as a film extra|Contratado de extra|Engagé comme figurant|映画のエキストラに雇われた",
    "A crew needs foreign faces for a crowd scene and pays cash for the afternoon. India makes more feature films than any other country.|Un equipo necesita caras extranjeras para una escena de multitud y paga la tarde en efectivo. India produce más largometrajes que ningún país.|Une équipe cherche des visages étrangers pour une scène de foule et paie l'après-midi en espèces. L'Inde produit plus de longs métrages que tout autre pays.|群衆の場面に外国人の顔が要るとのことで、午後ぶんの現金をもらった。インドは世界で最も多くの長編映画を作る。",
  ),
  ev(
    "monsoon-flooded-street", "loss", ["dec"], "🌧️", 240,
    "The street becomes a river|La calle se hace río|La rue devient rivière|通りが川になった",
    "An hour of rain puts the road under water and the auto-rickshaw fare triples. Mumbai has recorded almost a metre of rain in a single day.|Una hora de lluvia inunda la calle y la tarifa del autorickshaw se triplica. Bombay ha registrado casi un metro de lluvia en un día.|Une heure de pluie noie la rue et le prix du rickshaw triple. Bombay a enregistré près d'un mètre de pluie en une journée.|一時間の雨で道が水没し、オートリクシャーの運賃が三倍になった。ムンバイでは一日で1m近い雨を記録したことがある。",
  ),

  // ---- 南インド ----
  ev(
    "temple-meal", "gain", ["sou"], "🍛", 200,
    "A free meal on a banana leaf|Comida gratis en hoja de plátano|Un repas offert sur feuille de bananier|バナナの葉の無料の食事",
    "The temple kitchen feeds everyone who sits down, and refuses money. Some south Indian temples have served meals daily for over a thousand years.|La cocina del templo da de comer a quien se siente y no acepta dinero. Algunos templos del sur sirven comidas a diario desde hace más de mil años.|La cuisine du temple nourrit quiconque s'assoit et refuse l'argent. Certains temples du Sud servent des repas chaque jour depuis plus de mille ans.|寺の厨房は座った者すべてに食事を出し、代金を受け取らない。南インドには千年以上、毎日食事を供してきた寺がある。",
  ),
  ev(
    "backwater-detour", "loss", ["sou"], "🛶", 220,
    "The houseboat runs aground|La casa flotante encalla|La péniche s'échoue|屋形船が座礁した",
    "Water hyacinth chokes the channel and a smaller boat has to be hired to tow the way out. The weed spreads fast enough to close whole stretches of the backwaters.|El jacinto de agua obstruye el canal y hay que pagar otra barca para el remolque. La planta crece tan rápido que cierra tramos enteros.|La jacinthe d'eau bouche le canal et il faut payer une barque pour le remorquage. La plante prolifère au point de fermer des sections entières.|ホテイアオイが水路を塞ぎ、小舟に曳き出してもらうことになった。この水草は繁茂が速く、水路一帯を通行不能にする。",
  ),

  // ---- 東部・北東部 ----
  ev(
    "tea-garden-work", "gain", ["eas"], "🌱", 240,
    "A day in the tea garden|Un día en el jardín de té|Une journée dans la plantation|茶園で一日働く",
    "The plucking season is short and every pair of hands counts, paid by weight. Only the top two leaves and a bud are taken.|La temporada es corta y toda mano cuenta, pagada al peso. Solo se toman las dos hojas superiores y un brote.|La saison est courte et chaque paire de mains compte, payée au poids. On ne prend que les deux feuilles du haut et un bourgeon.|摘採期は短く、人手はいくらあってもよい。重さで日当が決まる。摘むのは一芯二葉だけである。",
  ),
  ev(
    "flood-ferry", "loss", ["eas"], "🌊", 260,
    "The Brahmaputra is too high|El Brahmaputra va muy alto|Le Brahmapoutre est en crue|ブラマプトラが増水した",
    "The river swells until the ferry cannot dock, and the only route left is a long way round. In flood it can be more than 10 km wide.|El río crece hasta que el ferry no puede atracar y solo queda un gran rodeo. En crecida supera los 10 km de ancho.|Le fleuve monte au point que le bac ne peut accoster : long détour payant. En crue, il dépasse 10 km de large.|川が増水して渡し船が着けられず、大きく回る費用がかかった。氾濫時の川幅は10kmを超えることがある。",
  ),
];
