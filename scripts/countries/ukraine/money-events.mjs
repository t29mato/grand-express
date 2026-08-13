/**
 * ウクライナの青マス・赤マスで起きる出来事(19件。増10・減9)。
 *
 * 地方コード: ky=キーウ周辺 / pl=ポリッシャ / west=西部・カルパチア /
 * cen=中部 / south=南部・黒海/ドナウ沿岸 / east=東部
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、6地方それぞれに2〜3件、土地や季節に結びつけて置いている。
 *
 * 戦争を出来事の題材にはしていない。争いを娯楽の運試しにしないという
 * 方針(`cities.mjs` と同じ考え方)。
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

export const UKRAINE_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "grain-truck-loading", "gain", [], "🌾", 220,
    "A dawn shift loading a grain truck|Un turno al alba cargando un camión de grano|Un service à l'aube pour charger un camion de grain|夜明けの穀物トラック積み込み",
    "A driver needed an extra pair of hands to finish loading before the weighbridge opened for the day, and the cash came before the truck had even pulled out of the yard. With grain moving out of the country by road, rail and river all at once most autumns, an early riser can usually find this kind of work somewhere nearby.|Un conductor necesitaba manos extra para terminar de cargar antes de que abriera el puente báscula, y el dinero llegó antes de que el camión saliera del patio. Con el grano saliendo del país por carretera, ferrocarril y río a la vez casi todos los otoños, un madrugador suele encontrar este tipo de trabajo cerca.|Un chauffeur avait besoin de bras en plus pour finir le chargement avant l'ouverture du pont-bascule, et l'argent est arrivé avant même que le camion ne quitte la cour. Le grain sortant du pays par la route, le rail et le fleuve à la fois presque chaque automne, un lève-tôt trouve généralement ce genre de travail non loin.|運転手が計量所の開く前に積み込みを終えたくて、人手を求めていた。トラックが車庫を出る前には現金が渡された。ほとんどの秋、穀物は道路と鉄道と川を同時に伝って国外へ運ばれるので、早起きすればこの手の仕事はたいてい近くで見つかる。",
    [5, 6],
  ),
  ev(
    "village-shop-night-cover", "gain", [], "🌙", 200,
    "Covering a village shop's late shift|Cubriendo el turno nocturno de una tienda de pueblo|Assurer le service tardif d'une épicerie de village|村の商店の夜番を代わる",
    "The owner needed to leave early for a family matter and asked a passer-by to mind the till until closing, counting the drawer together afterward by the light of a single bulb. Small village shops like this one often run on exactly this kind of trust between neighbours.|La dueña tuvo que salir antes por un asunto familiar y le pidió a un transeúnte que atendiera la caja hasta el cierre, contando juntos el cajón después a la luz de una sola bombilla. Tiendas de pueblo pequeñas como esta suelen funcionar justo con este tipo de confianza entre vecinos.|La patronne dut partir tôt pour une affaire de famille et demanda à un passant de tenir la caisse jusqu'à la fermeture, comptant ensuite le tiroir-caisse à la lumière d'une seule ampoule. De petites épiceries de village comme celle-ci fonctionnent souvent grâce à ce genre de confiance entre voisins.|店主が急用で早く出なければならず、通りがかりの人にレジ番を頼み、閉店後に一つの電球の明かりの下で一緒に釣り銭を数えた。こうした村の小さな商店は、まさにこの種の隣人どうしの信頼で成り立っている。",
  ),
  ev(
    "unfamiliar-town-parking-fine", "loss", [], "🅿️", 160,
    "A parking fine in an unfamiliar town|Una multa de aparcamiento en un pueblo desconocido|Une amende de stationnement dans une ville inconnue|知らない町での駐車違反",
    "The payment machine only took a local mobile app that refused to install without a Ukrainian phone number, and by the time a warden was found to ask, the ticket was already printed. Small towns increasingly run their own parking systems with no common standard between them.|La máquina de pago solo aceptaba una aplicación móvil local que se negaba a instalarse sin un número de teléfono ucraniano, y para cuando se encontró a un agente a quien preguntar, la multa ya estaba impresa. Cada vez más pueblos gestionan sus propios sistemas de aparcamiento sin un estándar común entre ellos.|Le distributeur n'acceptait qu'une appli mobile locale refusant de s'installer sans numéro de téléphone ukrainien, et le temps de trouver un agent à qui demander, le PV était déjà imprimé. De plus en plus de petites villes gèrent leur propre système de stationnement sans norme commune entre elles.|支払い機はウクライナの電話番号がないとインストールできない地元アプリにしか対応しておらず、係員を見つけて尋ねるころにはもう違反切符が印刷されていた。小さな町ほど独自の駐車システムを運用しており、町ごとに規格がばらばらになりつつある。",
  ),
  ev(
    "stranger-cards-on-train", "loss", [], "🃏", 180,
    "Losing at cards with strangers on a night train|Perdiendo a las cartas con desconocidos en un tren nocturno|Perdre aux cartes avec des inconnus dans un train de nuit|夜行列車で見知らぬ相手とトランプに負ける",
    "The game in the next compartment looked friendly enough from the corridor, and the stakes only seemed to climb once it was too late to leave gracefully. Long overnight routes are common enough on the network that this kind of small-hours card game is almost a genre of its own.|El juego del compartimento de al lado parecía bastante amistoso desde el pasillo, y las apuestas solo parecieron subir cuando ya era tarde para retirarse con elegancia. Los trayectos nocturnos largos son bastante comunes en la red, así que este tipo de partida de cartas de madrugada es casi un género en sí mismo.|La partie dans le compartiment voisin semblait bien amicale depuis le couloir, et les mises n'ont paru grimper qu'une fois trop tard pour se retirer avec élégance. Les longs trajets de nuit sont assez courants sur le réseau pour que ce genre de partie de cartes au petit matin soit presque un genre en soi.|廊下から見えた隣のコンパートメントの勝負はずいぶん和やかそうに見えたが、賭け金が上がり始めたのに気づいたときにはもう抜け出しにくくなっていた。この鉄道網には夜行の長距離便が多く、深夜のこうしたトランプ勝負はほとんど一つの様式になっている。",
  ),

  // ---- ky キーウとその周辺 ----
  ev(
    "kyiv-metro-lost-tourist", "gain", ["ky"], "🚇", 240,
    "Guiding a lost visitor to the deepest station|Guiando a un visitante perdido a la estación más profunda|Guider un visiteur perdu jusqu'à la station la plus profonde|迷った旅行者を最深の駅へ案内する",
    "A visitor was hopelessly turned around trying to find Arsenalna, the deepest metro station in the world at over 105 metres down, and paid gladly for a shortcut through the right escalator bank. The station was built that deep partly to double as a bomb shelter, so the ride down takes long enough for a full conversation.|Un visitante estaba completamente desorientado tratando de encontrar Arsenalna, la estación de metro más profunda del mundo a más de 105 metros bajo tierra, y pagó con gusto por un atajo por la escalera mecánica correcta. La estación se construyó tan profunda en parte para servir también de refugio antiaéreo, así que el descenso dura lo suficiente para una conversación entera.|Un visiteur était complètement perdu en cherchant Arsenalna, la station de métro la plus profonde du monde à plus de 105 mètres sous terre, et il a payé de bon cœur pour un raccourci par le bon escalator. La station fut creusée si profond en partie pour doubler d'abri anti-aérien, si bien que la descente dure assez longtemps pour toute une conversation.|旅行者が、深さ105メートル超という世界一深い地下鉄駅アルセナーリナへの道が分からなくなっていて、正しいエスカレーターへの近道を教えてもらった礼にと喜んで謝礼をくれた。この駅がそれほど深く掘られたのは防空壕を兼ねるためでもあり、下りきるまでの時間だけで会話が一つ済むほど長い。",
  ),
  ev(
    "andriyivskyy-souvenir-haggle", "loss", ["ky"], "🎨", 200,
    "Overpaying for a souvenir on Andriyivskyy Descent|Pagando de más por un recuerdo en la bajada Andriivskyi|Payer trop cher un souvenir dans la descente Andriïvskyi|アンドリーイウシクィイ坂で土産を高く買わされる",
    "A painter's stall on the cobbled hill had exactly the kind of small canvas that looked impossible to leave without, and only later did the price turn out to be roughly double what the stall two doors down was asking for something similar. The street has sold art and trinkets to passers-by for well over a century.|El puesto de un pintor en la cuesta adoquinada tenía justo el tipo de lienzo pequeño imposible de dejar pasar, y solo después resultó que el precio era casi el doble de lo que pedía el puesto dos puertas más allá por algo parecido. La calle lleva vendiendo arte y baratijas a los transeúntes desde hace más de un siglo.|L'étal d'un peintre sur la côte pavée avait exactement le genre de petite toile impossible à laisser filer, et ce n'est que plus tard que le prix s'est avéré presque le double de ce que demandait l'étal deux portes plus loin pour quelque chose de semblable. La rue vend art et bibelots aux passants depuis plus d'un siècle.|石畳の坂にある画家の露店に、どうしても手放せなさそうな小さなキャンバス画があったが、あとになって、二軒先の露店が似たような品をほぼ半値で出していたと分かった。この通りは百年以上前から、道行く人に絵や小物を売り続けてきた。",
  ),
  ev(
    "oleksandriya-fake-guide", "loss", ["ky"], "🌳", 190,
    "A self-appointed park guide who expected a tip|Un guía de parque autoproclamado que esperaba propina|Un guide de parc autoproclamé qui attendait un pourboire|自称ガイドに公園を案内され、チップをせがまれる",
    "A man near the gate to Oleksandriya Park offered directions to the grottoes and waterfalls with such confidence that it took a while to notice he did not actually work there, and by then he was already expecting payment for the tour. The park is large and thinly signposted enough that the offer is tempting every single time.|Un hombre junto a la puerta del parque Oleksandriya ofreció indicaciones a las grutas y cascadas con tanta seguridad que costó un rato notar que en realidad no trabajaba allí, y para entonces ya esperaba que le pagaran el recorrido. El parque es lo bastante grande y con tan pocas señales que la oferta resulta tentadora cada vez.|Un homme près de l'entrée du parc Oleksandriya indiquait le chemin des grottes et des cascades avec tant d'assurance qu'il a fallu un moment pour remarquer qu'il n'y travaillait pas vraiment, et à ce moment-là il attendait déjà d'être payé pour la visite. Le parc est assez vaste et si peu fléché que l'offre est tentante à chaque fois.|オレクサンドリヤ公園の門の近くにいた男が、あまりに自信たっぷりに洞窟や滝への道を案内してくれたので、実は職員ではないと気づくまで少しかかった。気づいたときにはもう案内料を求められていた。公園はあまりに広く標識も少ないので、その申し出はいつも魅力的に見えてしまう。",
  ),

  // ---- pl ポリッシャ(北部) ----
  ev(
    "zone-checkpoint-day-job", "gain", ["pl"], "📋", 260,
    "A day helping at the exclusion zone checkpoint|Un día ayudando en el puesto de control de la zona de exclusión|Une journée à aider au poste de contrôle de la zone d'exclusion|立入禁止区域の検問所を手伝う",
    "The checkpoint needed an extra pair of hands checking permits and logging dosimeter readings against a clipboard list, straightforward work paid by the day for anyone with the right clearance already in hand. Every vehicle and every visitor passing the line gets checked and logged in both directions, without exception.|El puesto de control necesitaba manos extra para revisar permisos y anotar las lecturas del dosímetro en una lista, un trabajo sencillo pagado por día para quien ya tuviera la autorización correspondiente. Cada vehículo y cada visitante que cruza la línea se revisa y se anota en ambos sentidos, sin excepción.|Le poste de contrôle avait besoin de bras pour vérifier les permis et noter les relevés de dosimètre sur une liste, un travail simple payé à la journée pour qui avait déjà l'habilitation requise. Chaque véhicule et chaque visiteur franchissant la ligne est contrôlé et noté dans les deux sens, sans exception.|検問所が、通行証を確認し線量計の数値を控えに書き留める手を求めていた。すでに必要な許可を持つ人になら日払いで頼める、単純な仕事である。境界線を越えるすべての車と人は、行きも帰りも例外なく確認され記録される。",
    [5, 6, 7],
  ),
  ev(
    "polissia-mud-road-delay", "loss", ["pl"], "🚚", 210,
    "A delivery van stuck on a Polissia forest road|Una furgoneta de reparto atascada en un camino forestal de Polesia|Une camionnette de livraison bloquée sur une route forestière de Polésie|ポリッシャの森の道でトラックが立ち往生する",
    "A shortcut through the forest turned to deep mud after a week of rain, and the delivery had to be paid for out of pocket once it arrived four hours late and short two crates that never made it out of the ditch. Unpaved forest roads still connect a fair number of Polissia's smaller villages to the nearest paved route.|Un atajo por el bosque se volvió barro profundo tras una semana de lluvia, y el reparto tuvo que pagarse de propio bolsillo al llegar cuatro horas tarde y con dos cajas menos que nunca salieron de la zanja. Caminos forestales sin asfaltar aún conectan a bastantes pueblos pequeños de Polesia con la carretera pavimentada más cercana.|Un raccourci à travers la forêt s'est changé en boue profonde après une semaine de pluie, et la livraison a dû être payée de sa poche une fois arrivée avec quatre heures de retard et deux caisses en moins restées dans le fossé. Des routes forestières non goudronnées relient encore pas mal de petits villages de Polésie à la route pavée la plus proche.|森を抜ける近道は一週間続いた雨でぬかるみに変わり、配達は4時間遅れ、溝から出せなかった箱二つを欠いたまま届き、その分は自腹で払う羽目になった。ポリッシャの小さな村の少なからぬ数は、いまも未舗装の森の道で最寄りの舗装路とつながっている。",
    [8, 9, 10],
  ),

  // ---- west 西部・カルパチア ----
  ev(
    "hutsul-woodcarving-commission", "gain", ["west"], "🪵", 250,
    "Helping fill a rush commission for a Hutsul carver|Ayudando a completar un encargo urgente de un tallador hutsul|Aider à honorer une commande urgente pour un sculpteur houtsoule|フツルの木彫り師の急な注文を手伝う",
    "A woodcarver with more orders than hands needed someone to sand and oil finished pieces while he kept the chisel moving on the next one, and the extra pair of hands was paid in cash straight from the till drawer. Carved wooden pipes, boxes and crosses from this region travel well beyond the mountains that make them.|Un tallador de madera con más pedidos que manos necesitaba a alguien que lijara y aceitara las piezas terminadas mientras él seguía con el cincel en la siguiente, y las manos extra se pagaron en efectivo directamente del cajón. Pipas, cajas y cruces talladas de esta región viajan mucho más allá de las montañas que las producen.|Un sculpteur sur bois débordé de commandes avait besoin de quelqu'un pour poncer et huiler les pièces finies pendant qu'il continuait au ciseau sur la suivante, et cette aide fut payée en liquide directement depuis la caisse. Pipes, boîtes et croix sculptées de cette région voyagent bien au-delà des montagnes qui les produisent.|注文が手に余っていた木彫り師が、次の作品に彫刻刀を入れ続けるあいだ、仕上がった品にやすりをかけ油を塗る手を求めていた。手伝いの報酬はレジからそのまま現金で渡された。この地方で彫られたパイプや箱、十字架は、それを生んだ山々をはるかに越えて旅していく。",
  ),
  ev(
    "truskavets-pump-room-queue-tip", "gain", ["west"], "💧", 220,
    "Helping direct the queue at the mineral water pump room|Ayudando a organizar la cola en la sala de bombeo de agua mineral|Aider à organiser la file à la salle de pompage d'eau minérale|鉱泉水汲み上げ室の行列整理を手伝う",
    "The morning line for warm cups of Naftusya water was longer and more confused than the one attendant could manage alone, and sorting patients by their prescribed schedule rather than arrival order earned a grateful tip from more than one regular. Some of the people in that line have been coming back every year for decades.|La cola matutina para las tazas de agua tibia de Naftusya era más larga y confusa de lo que un solo encargado podía manejar solo, y ordenar a los pacientes por su horario prescrito en vez de por orden de llegada valió una propina agradecida de más de un habitual. Algunas de las personas de esa cola llevan volviendo cada año durante décadas.|La file matinale pour les tasses tièdes d'eau de Naftoussia était plus longue et plus confuse qu'un seul préposé ne pouvait en gérer seul, et trier les patients selon leur horaire prescrit plutôt que par ordre d'arrivée a valu un pourboire reconnaissant de plus d'un habitué. Certaines personnes de cette file reviennent chaque année depuis des décennies.|朝のナフトゥーシャの温かいカップを求める列は、係員一人では手に負えないほど長く混み合っており、到着順ではなく処方された時間割どおりに患者を並べ直したところ、常連の何人かから礼の心付けをもらった。この列に並ぶ人の中には、何十年も毎年通い続けている者もいる。",
  ),
  ev(
    "lviv-cafe-crowd-wallet", "loss", ["west"], "☕", 200,
    "A wallet slipped away in a crowded Lviv café|Una billetera desaparecida en un café abarrotado de Lviv|Un portefeuille disparu dans un café bondé de Lviv|混み合うリヴィウのカフェで財布をなくす",
    "The queue for a table on Rynok Square was packed shoulder to shoulder, and somewhere between the door and a chair a coat pocket came up empty. The café culture the city is famous for draws exactly this kind of crowd on any afternoon with decent weather.|La cola por una mesa en la plaza del Mercado estaba abarrotada hombro con hombro, y en algún punto entre la puerta y una silla un bolsillo del abrigo quedó vacío. La cultura cafetera por la que la ciudad es famosa atrae justo este tipo de multitud cualquier tarde de buen tiempo.|La file pour une table sur la place du Marché était bondée épaule contre épaule, et quelque part entre la porte et une chaise, une poche de manteau s'est retrouvée vide. La culture du café qui fait la réputation de la ville attire justement ce genre de foule dès qu'il fait beau l'après-midi.|市場広場でテーブルを待つ列は肩がぶつかるほどの混みようで、ドアから椅子までのどこかでコートのポケットが空になっていた。この町の名物である珈琲文化は、天気の良い午後ならいつでもまさにこの手の人混みを呼び込む。",
  ),

  // ---- cen 中部 ----
  ev(
    "roshen-fountain-program-job", "gain", ["cen"], "⛲", 230,
    "Handing out programmes before the fountain show|Repartiendo programas antes del espectáculo de la fuente|Distribuer des programmes avant le spectacle de la fontaine|噴水ショーの前にプログラムを配る",
    "The evening crowd along the Southern Bug needed someone to hand out printed schedules of the music before the jets started, and the pay came with a spot at the front rail for the best view of the display. The show resets and repeats itself every evening regardless of the size of the crowd.|El público de la tarde junto al Bug Meridional necesitaba a alguien que repartiera los horarios impresos de la música antes de que empezaran los chorros, y el pago incluyó un sitio en primera fila para la mejor vista del espectáculo. El espectáculo se reinicia y se repite cada noche sin importar el tamaño del público.|Le public du soir le long du Boug méridional avait besoin de quelqu'un pour distribuer les horaires imprimés de la musique avant que les jets ne démarrent, et la paie incluait une place au premier rang pour la meilleure vue du spectacle. Le spectacle se réinitialise et se répète chaque soir, quelle que soit la taille du public.|南ブーフ川沿いの夕方の人出には、噴水が上がる前に音楽の進行表を配る人手が必要で、報酬には最前列の見やすい場所が付いてきた。この演出は観客の数にかかわらず、毎晩リセットされて繰り返される。",
  ),
  ev(
    "sunflower-oil-jar-break", "loss", ["cen"], "🫙", 170,
    "A jar of sunflower oil breaks in a market bag|Un tarro de aceite de girasol se rompe en la bolsa del mercado|Un bocal d'huile de tournesol se casse dans le sac du marché|市場の袋の中でひまわり油の瓶が割れる",
    "The glass jar bought straight from a farmer's stall was not wrapped for the walk back to the station, and a jolt on the cobblestones left an oily mess through a bag of otherwise perfectly good vegetables. Cold-pressed oil sold this way, straight from the press rather than a bottling line, does not come cheap to replace.|El tarro de vidrio comprado directamente en el puesto de un agricultor no venía envuelto para la vuelta a la estación, y un tropiezo en los adoquines dejó un desastre aceitoso en una bolsa de verduras por lo demás perfectas. El aceite prensado en frío que se vende así, directo de la prensa y no de una línea de embotellado, no sale barato de reponer.|Le bocal en verre acheté directement à l'étal d'un fermier n'était pas emballé pour le trajet jusqu'à la gare, et un cahot sur les pavés a laissé un dégât huileux dans un sac de légumes par ailleurs parfaits. L'huile pressée à froid vendue ainsi, directement du pressoir plutôt que d'une chaîne d'embouteillage, ne coûte pas rien à remplacer.|農家の露店で直接買ったガラス瓶は駅までの帰り道を考えて包まれておらず、石畳でよろけた拍子に、それ以外は上等な野菜が入った袋の中で油まみれになった。瓶詰めラインではなく搾油機から直接売られるこの種の低温圧搾油は、買い直すとなると安くはない。",
  ),

  // ---- south 南部・黒海/ドナウ沿岸 ----
  ev(
    "vylkove-canal-boat-tip", "gain", ["south"], "🚤", 250,
    "Rowing visitors between the delta canals|Remando a visitantes entre los canales del delta|Ramer des visiteurs entre les canaux du delta|デルタの運河のあいだを漕いで観光客を運ぶ",
    "A family needed a second boat when their usual guide's engine failed to start, and rowing them between the reed-lined channels to see the pelicans earned a fare on top of the going rate for the trouble. Getting anywhere in this town by water is still often faster than trying it by the few roads that exist.|Una familia necesitaba una segunda barca cuando el motor de su guía habitual no arrancó, y remarlos entre los canales bordeados de cañas para ver los pelícanos valió una tarifa extra por la molestia. Llegar a cualquier parte de este pueblo por agua sigue siendo a menudo más rápido que intentarlo por las pocas carreteras que hay.|Une famille avait besoin d'une seconde barque quand le moteur de son guide habituel refusa de démarrer, et les faire ramer entre les chenaux bordés de roseaux pour voir les pélicans a valu un tarif en plus pour le dérangement. Se déplacer dans cette ville par l'eau reste souvent plus rapide qu'essayer par les quelques routes qui existent.|いつもの案内人のエンジンがかからず、もう一艘の舟が必要になった一家を、葦の茂る水路を漕いでペリカンの見える場所まで案内すると、手間賃込みで運賃をもらえた。この町ではいまも、数少ない道路より水路のほうが目的地に早く着けることが多い。",
  ),
  ev(
    "izmail-barge-loading-shift", "gain", ["south"], "🛳️", 230,
    "A shift loading crates onto a Danube barge|Un turno cargando cajas en una barcaza del Danubio|Un service à charger des caisses sur une péniche du Danube|ドナウ川のはしけに木箱を積む仕事",
    "The dock foreman needed a few extra hands to get a barge loaded before the tide on the river shifted the mooring depth, and the pay came in cash at the gate the moment the last crate was stacked. Barge traffic here has grown busier than the small port's usual crew can always keep up with.|El capataz del muelle necesitaba unas manos extra para cargar una barcaza antes de que la marea del río cambiara la profundidad del amarre, y el pago llegó en efectivo en la puerta en cuanto se apiló la última caja. El tráfico de barcazas aquí se ha vuelto más intenso de lo que la tripulación habitual del pequeño puerto siempre puede seguir.|Le contremaître des quais avait besoin de bras en plus pour charger une péniche avant que la marée du fleuve ne change la profondeur d'amarrage, et la paie est arrivée en liquide au portail dès la dernière caisse empilée. Le trafic de péniches ici s'est fait plus dense que l'équipe habituelle du petit port n'arrive parfois à suivre.|波止場の親方が、川の水位が変わって係留の深さが変わる前にはしけへの積み込みを終えたいと、あと数人の手を求めていた。最後の木箱を積み終えた瞬間、門のところで現金が渡された。ここのはしけの往来は、この小さな港のいつもの人手では追いつかないほど忙しくなっている。",
  ),
  ev(
    "odesa-beach-vendor-markup", "loss", ["south"], "🏖️", 190,
    "A beach vendor's steep markup on sunscreen|El sobreprecio de un vendedor de playa por el protector solar|La forte majoration d'un vendeur de plage sur la crème solaire|浜辺の売り子が日焼け止めをぼったくる",
    "A midday sunburn made haggling feel pointless, and the only tube of sunscreen for sale on that stretch of sand cost easily three times what it would in any pharmacy a few streets back. Every beach town along this coast seems to have at least one vendor who has priced this exact moment of desperation into the tag.|Una insolación al mediodía hizo que regatear pareciera inútil, y el único tubo de protector solar que se vendía en ese tramo de playa costaba fácilmente el triple de lo que costaría en cualquier farmacia unas calles atrás. Cada pueblo costero de esta orilla parece tener al menos un vendedor que ha puesto precio justo a este momento exacto de desesperación.|Un coup de soleil de midi a rendu tout marchandage inutile, et le seul tube de crème solaire en vente sur cette portion de plage coûtait facilement le triple de ce qu'il vaudrait dans n'importe quelle pharmacie quelques rues plus loin. Chaque station balnéaire de cette côte semble compter au moins un vendeur ayant tarifé jusqu'à ce moment précis de désespoir.|真昼の日焼けのせいで値切る気力も失せていたが、その浜辺の一角で売られていた日焼け止めはたった一本しかなく、数本先の薬局で買うより楽に三倍はした。この沿岸の海辺の町にはどこも、この切羽詰まった瞬間の値段までちゃんと見込んでいる売り子が少なくとも一人はいるようだ。",
    [1, 2, 3],
  ),

  // ---- east 東部 ----
  ev(
    "derzhprom-unofficial-tour-tip", "gain", ["east"], "🏗️", 240,
    "An unofficial architecture tour around Derzhprom|Una visita arquitectónica no oficial por el Derzhprom|Une visite architecturale non officielle autour du Derzhprom|デルジプロム周辺の非公式な建築ツアー",
    "An architecture student hanging around Freedom Square knew the building's history well enough to turn a chance question from a tourist into a twenty-minute tour, ending with a tip better than a shift at the usual part-time job. The square is large enough that a slow walk around its full ring takes the better part of an hour.|Un estudiante de arquitectura que rondaba la plaza de la Libertad conocía tan bien la historia del edificio que convirtió una pregunta casual de un turista en un recorrido de veinte minutos, terminado con una propina mejor que un turno en su trabajo habitual a tiempo parcial. La plaza es tan grande que darle la vuelta completa a paso lento lleva casi una hora.|Un étudiant en architecture qui traînait place de la Liberté connaissait assez bien l'histoire du bâtiment pour transformer une question de touriste en visite de vingt minutes, terminée par un pourboire meilleur qu'un service à son petit boulot habituel. La place est si vaste qu'en faire lentement le tour complet prend presque une heure.|自由広場をぶらついていた建築学科の学生は、この建物の歴史に詳しく、観光客のふとした質問を20分のミニツアーに変え、いつものアルバイトより実入りのよいチップをもらった。広場はあまりに広く、ゆっくり一周するだけでほぼ一時間かかる。",
  ),
  ev(
    "dnipro-embankment-bike-overcharge", "loss", ["east"], "🚲", 210,
    "An overpriced bike rental on the long embankment|Un alquiler de bicicletas caro en el largo malecón|Une location de vélo trop chère sur le long quai|長い河岸遊歩道での割高な自転車レンタル",
    "The kiosk at the start of the promenade quoted an hourly rate that turned out to be per half hour once the receipt printed, and by the time the mistake was clear it was easier to just pay and pedal off along one of Europe's longest riverside walks. Length has its price here in more ways than one.|El quiosco al inicio del paseo dio un precio por hora que resultó ser por media hora en cuanto se imprimió el recibo, y para cuando quedó claro el error, fue más fácil pagar y pedalear por uno de los paseos ribereños más largos de Europa. La longitud tiene aquí su precio de más de una manera.|Le kiosque au début de la promenade a annoncé un tarif horaire qui s'est révélé être à la demi-heure une fois le reçu imprimé, et le temps que l'erreur soit claire, il était plus simple de payer et de pédaler le long de l'une des plus longues promenades fluviales d'Europe. Ici, la longueur a un prix à plus d'un titre.|遊歩道の入口のキオスクが告げた時間料金は、レシートが出てから実は30分単位だったと分かったが、間違いに気づいたころにはもう払って、ヨーロッパでも屈指の長さを誇る川沿いの道を漕ぎ出すほうが楽だった。この長さには、いろいろな意味で代償がついてくる。",
  ),
];
