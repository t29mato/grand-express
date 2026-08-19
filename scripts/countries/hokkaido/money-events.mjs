/**
 * 北海道の青マス・赤マスで起きる出来事(20件。増10・減10)。
 *
 * 地方コード: chuo=道央 / nan=道南 / hoku=道北 / tou=道東
 *
 * どの地方・どの月でも必ず1件は引けるよう、地方も月も指定しない出来事を
 * 増減それぞれ2件置いてある(他の盤面と同じ約束)。
 */
function t(source) {
  const [en, es, fr, ja] = source.split("|");
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

export const HOKKAIDO_MONEY_EVENTS = [
  // ---- 道内どこでも・通年(4件) ----
  ev(
    "dairy-morning-shift", "gain", [], "🥛", 240,
    "An early shift at the milking parlour|Un turno temprano en la sala de ordeño|Une garde matinale à la salle de traite|朝の搾乳を手伝う",
    "The herd does not know it is a holiday, and a spare pair of hands before dawn is paid on the spot. Roughly half of Japan's dairy cattle graze somewhere on this island, so the work is never far to find.|El rebaño no sabe que es festivo, y un par de manos de más antes del alba se paga al momento. Cerca de la mitad del ganado lechero de Japón pasta en algún lugar de esta isla.|Le troupeau ignore que c'est férié, et une paire de bras de plus avant l'aube se paie sur-le-champ. Près de la moitié du bétail laitier du Japon paît quelque part sur cette île.|牛たちは休日を知らない。夜明け前の手伝いはその場で日当をもらえる。日本の乳牛のおよそ半分がこの島のどこかで草を食んでいるので、仕事はいつも近くにある。",
  ),
  ev(
    "kaitakushi-tour-guide", "gain", [], "🎒", 200,
    "Filling in as a local guide|Sustituyendo como guía local|Remplacer comme guide local|地元ガイドの代役",
    "A tour group's guide is stuck on a delayed bus, and someone who knows the town's railway history is paid to talk for an hour. Almost every town on this island has a station that once saw more trains than it does now.|El guía de un grupo turístico está atrapado en un autobús con retraso, y a alguien que conoce la historia ferroviaria del pueblo se le paga por hablar una hora. Casi todos los pueblos de esta isla tienen una estación que antes veía más trenes.|Le guide d'un groupe est coincé dans un bus en retard, et quelqu'un qui connaît l'histoire ferroviaire de la ville est payé pour parler une heure. Presque chaque ville de l'île a une gare qui voyait jadis plus de trains.|団体客の案内人が遅れたバスで足止めされ、町の鉄道史に詳しい者が代わりに1時間ほど話す仕事を頼まれた。この島のほとんどの町には、いまより多くの列車が来ていた時代の駅がある。",
  ),
  ev(
    "gasoline-far-to-everywhere", "loss", [], "⛽", 220,
    "Everywhere is a long drive|Todo queda a un largo trayecto|Tout est à un long trajet|どこへ行くにも長い道のり",
    "The nearest town worth the errand is an hour off, and the tank empties faster than the errand justifies. With so few railways left running, a car is the only practical way to reach most of this island.|El pueblo más cercano que merece el viaje está a una hora, y el depósito se vacía más rápido de lo que justifica el recado. Con tan pocos ferrocarriles en marcha, el coche es la única forma práctica de llegar a la mayor parte de la isla.|La ville la plus proche qui vaille le déplacement est à une heure, et le réservoir se vide plus vite que la course ne le justifie. Avec si peu de lignes encore en service, la voiture reste le seul moyen pratique d'atteindre la majeure partie de l'île.|用事のある町までは車で1時間かかり、その用事に見合わないほどタンクが減った。走る鉄道がこれほど少ないと、この島の大半へは車が唯一現実的な足になる。",
  ),
  ev(
    "daikoubasu-noriokure", "loss", [], "🚌", 200,
    "Missing the once-a-day bus|Perder el autobús de una vez al día|Rater le bus quotidien unique|1日1本のバスに乗り遅れる",
    "The replacement bus that took over from the railway here runs once in the morning and once in the evening, and nothing else. A taxi for the same distance costs several times what the fare would have been.|El autobús sustitutivo que reemplazó al ferrocarril aquí pasa una vez por la mañana y otra por la tarde, y nada más. Un taxi para la misma distancia cuesta varias veces el precio del billete.|Le bus de remplacement qui a succédé au chemin de fer ici passe une fois le matin et une fois le soir, rien de plus. Un taxi pour la même distance coûte plusieurs fois le prix du billet.|ここで鉄道の代わりを務める代行バスは朝と夕方に1本ずつしかない。同じ距離のタクシーは、電車賃だったはずの何倍もする。",
  ),

  // ---- 道央(chuo) ----
  ev(
    "bibai-art-park-volunteer", "gain", ["chuo"], "🎨", 220,
    "Setting up the snow sculpture exhibit|Montando la exposición de esculturas de nieve|Installer l'exposition de sculptures de neige|廃校ギャラリーの雪像を並べる",
    "A former coal town's art park needs extra hands to place the season's sculptures before the first visitors arrive, and pays a flat rate for the morning. Turning a closed school into a gallery was one way this town chose to be seen for something other than its empty mine.|El parque de arte de un antiguo pueblo minero necesita manos extra para colocar las esculturas de la temporada antes de que lleguen los primeros visitantes, y paga una tarifa fija por la mañana. Convertir una escuela cerrada en galería fue una forma que eligió este pueblo para ser visto por algo más que su mina vacía.|Le parc d'art d'une ancienne ville minière a besoin de bras en plus pour installer les sculptures de la saison avant les premiers visiteurs, et paie un tarif fixe pour la matinée. Transformer une école fermée en galerie fut une façon pour cette ville de se faire connaître autrement que par sa mine vide.|元炭鉱町の彫刻公園は、最初の来場者が来る前にその季節の雪像を並べる人手を求めており、午前の作業に定額を払う。廃校を美術館に変えたのは、この町が空になった炭鉱以外の姿で見られるために選んだ道の一つだった。",
    [9, 10],
  ),
  ev(
    "chitose-cargo-shift", "gain", ["chuo"], "✈️", 260,
    "A night shift sorting air cargo|Un turno nocturno clasificando carga aérea|Une garde de nuit à trier le fret aérien|夜間の航空貨物仕分け",
    "The freight terminal is short-staffed for the overnight sort, and seafood bound for Tokyo by morning does not wait. One of Japan's busiest airports runs through the night as much as through the day.|La terminal de carga está corta de personal para la clasificación nocturna, y el marisco con destino a Tokio por la mañana no espera. Uno de los aeropuertos más transitados de Japón funciona tanto de noche como de día.|Le terminal fret manque de personnel pour le tri de nuit, et les fruits de mer en partance pour Tokyo au matin n'attendent pas. L'un des aéroports les plus fréquentés du Japon tourne autant la nuit que le jour.|貨物ターミナルは夜間の仕分けに人手が足りず、朝までに東京へ届けるはずの海産物は待ってくれない。日本有数の利用者数を誇るこの空港は、昼と変わらず夜も動き続けている。",
  ),
  ev(
    "ishikari-turbine-inspection", "gain", ["chuo"], "🌬️", 300,
    "Assisting an offshore wind inspection|Ayudando en una inspección eólica marina|Assister une inspection éolienne offshore|洋上風力の点検を手伝う",
    "A maintenance crew needs an extra hand to log readings on a calm-weather inspection day, paid well because the boat only goes out when conditions allow. New turbines have gone up along this coast faster than the crews to service them.|Un equipo de mantenimiento necesita una mano extra para anotar lecturas en un día tranquilo de inspección, bien pagado porque el barco solo sale cuando las condiciones lo permiten. En esta costa han levantado turbinas más rápido de lo que se forman los equipos para mantenerlas.|Une équipe de maintenance a besoin d'un bras de plus pour noter les relevés par temps calme, bien payé car le bateau ne sort que si les conditions le permettent. Sur cette côte, les éoliennes sont montées plus vite que les équipes pour les entretenir.|保守班は、穏やかな日の点検作業で記録係の手を求めており、船は条件が良い日にしか出ないぶん日当は良い。この海岸では、風車を保守する人手が追いつかないほどの速さで新しいタービンが建てられてきた。",
  ),
  ev(
    "yamasen-kaisen-bunki", "loss", ["chuo"], "🛤️", 260,
    "A closed mountain road doubles the trip|Una carretera de montaña cerrada duplica el viaje|Une route de montagne fermée double le trajet|山線の峠道が通行止め",
    "Snow has closed the pass between the mountain route and the coast, and the only way through now is the long way around by the coastal road. The choice between the two routes has decided how towns here grow or shrink for over a century.|La nieve ha cerrado el puerto entre la ruta de montaña y la costa, y ahora la única forma de pasar es el largo rodeo por la carretera costera. La elección entre ambas rutas lleva más de un siglo decidiendo cómo crecen o menguan los pueblos de aquí.|La neige a fermé le col entre la route de montagne et la côte, et le seul passage désormais est le long détour par la route côtière. Le choix entre ces deux itinéraires décide depuis plus d'un siècle de la croissance ou du déclin des villes d'ici.|山線と海側を結ぶ峠が雪で閉じ、いま通れるのは海沿いの道を大きく回る道だけになった。どちらの経路を選ぶかは、一世紀以上にわたりこのあたりの町の栄枯を左右してきた。",
    [9, 10, 11],
  ),
  ev(
    "iwamizawa-roundhouse-repair", "loss", ["chuo"], "🔧", 200,
    "A preserved roundhouse needs its roof fixed|Un cobertizo circular conservado necesita reparar el techo|Une rotonde préservée a besoin d'un toit réparé|扇形機関庫の屋根を直す",
    "A century-old railway building kept as a local landmark has sprung a leak, and the volunteer group that maintains it is short of funds this month. Keeping the coal era's buildings standing costs money the coal itself no longer earns.|Un edificio ferroviario centenario conservado como referencia local tiene una gotera, y el grupo de voluntarios que lo mantiene anda corto de fondos este mes. Mantener en pie los edificios de la era del carbón cuesta un dinero que el carbón ya no genera.|Un bâtiment ferroviaire centenaire conservé comme repère local a une fuite, et le groupe de bénévoles qui l'entretient manque de fonds ce mois-ci. Maintenir debout les bâtiments de l'ère du charbon coûte un argent que le charbon ne rapporte plus.|地元の目印として残る築百年の鉄道建築に雨漏りが見つかったが、維持する有志の団体は今月資金が足りない。石炭の時代の建物を残しておくには、もう石炭自身が生まない金がかかる。",
  ),

  // ---- 道南(nan) ----
  ev(
    "esashi-herring-mansion-tour", "gain", ["nan"], "🏯", 260,
    "Opening the old herring mansion to visitors|Abriendo la vieja mansión del arenque a los visitantes|Ouvrir l'ancienne demeure du hareng aux visiteurs|鰊御殿を観光客に開ける",
    "The family who still owns one of the old herring-boom mansions needs someone to mind the door for a busy weekend, paid from the entrance fee. The building once housed over a hundred seasonal fishing workers at once.|La familia dueña de una de las viejas mansiones del auge del arenque necesita a alguien que vigile la puerta un fin de semana movido, pagado con la entrada. El edificio llegó a alojar a más de cien trabajadores de temporada a la vez.|La famille propriétaire de l'une des vieilles demeures de l'âge d'or du hareng a besoin de quelqu'un pour surveiller l'entrée un week-end chargé, payé sur le droit d'entrée. Le bâtiment logea autrefois plus de cent saisonniers de la pêche à la fois.|かつての鰊御殿をいまも所有する一家が、忙しい週末の受付を頼んだ。報酬は入館料から出る。この建物はかつて、季節労働者を一度に百人以上住まわせていた。",
  ),
  ev(
    "matsumae-sakura-matsuri", "gain", ["nan"], "🌸", 280,
    "Serving tea under the castle's cherry trees|Sirviendo té bajo los cerezos del castillo|Servir le thé sous les cerisiers du château|城の桜の下で茶を出す",
    "The castle town's cherry blossom festival draws more visitors than the town has hands to serve, and the trays go out from morning to dusk. Some of the varieties planted here bloom later than anywhere else in Japan, stretching the season by weeks.|El festival de los cerezos de la ciudad-castillo atrae más visitantes de los que el pueblo tiene manos para atender, y las bandejas salen de la mañana al anochecer. Algunas variedades plantadas aquí florecen más tarde que en cualquier otro lugar de Japón.|Le festival des cerisiers de la ville-château attire plus de visiteurs que la ville n'a de bras pour les servir, et les plateaux circulent du matin au soir. Certaines variétés plantées ici fleurissent plus tard que partout ailleurs au Japon.|城下町の桜まつりは、町の人手では足りないほどの客を集め、盆は朝から夕方まで出ずっぱりになる。ここに植えられた品種の一部は日本のどこよりも遅く咲き、花の季節を何週間も引き延ばす。",
    [0, 1],
  ),
  ev(
    "okushiri-seawall-inspection", "gain", ["nan"], "🌊", 240,
    "Helping check the sea wall gates|Ayudando a revisar las compuertas del muro marino|Aider à vérifier les portes de la digue|防潮堤の水門を点検する",
    "The island's engineers run a full check of every gate in the sea wall each year, and an extra pair of hands to log readings is paid for the day. The wall has kept the rebuilt town dry through storms that would once have reached it.|Los ingenieros de la isla revisan a fondo cada compuerta del muro marino cada año, y un par de manos extra para anotar lecturas se paga por el día. El muro ha mantenido seco el pueblo reconstruido en tormentas que antes lo habrían alcanzado.|Les ingénieurs de l'île font une révision complète de chaque porte de la digue chaque année, et une paire de bras en plus pour noter les relevés est payée à la journée. La digue a gardé la ville reconstruite au sec lors de tempêtes qui l'auraient jadis atteinte.|島の技術者は毎年、防潮堤のすべての水門を点検する。記録係の手が一日ぶん必要だという。この堤防は、かつてなら届いていたはずの嵐から、建て直された町を守り続けている。",
  ),
  ev(
    "kikonai-shinkansen-kouji", "loss", ["nan"], "🚧", 220,
    "A detour around Shinkansen construction|Un desvío por las obras del Shinkansen|Un détour à cause des travaux du Shinkansen|新幹線の工事で迂回",
    "The road you meant to take is closed for extension work on the line through the tunnel, and the detour costs both time and a toll. The work has been going on for years and is not finished yet.|La carretera que pensabas tomar está cerrada por obras de ampliación de la línea a través del túnel, y el desvío cuesta tiempo y peaje. Las obras llevan años y aún no han terminado.|La route que tu comptais prendre est fermée pour les travaux d'extension de la ligne à travers le tunnel, et le détour coûte temps et péage. Les travaux durent depuis des années et ne sont pas encore finis.|通るはずだった道が、トンネルを抜ける路線の延伸工事で閉じられており、迂回に時間と通行料がかかった。工事はもう何年も続いており、まだ終わっていない。",
  ),
  ev(
    "setana-fune-kesson", "loss", ["nan"], "🚤", 200,
    "A ferry cancelled for high wind|Un ferry cancelado por viento fuerte|Un ferry annulé pour vent fort|強風でフェリーが欠航",
    "The crossing to the island is called off for the day, and the hotel booked on the other side does not refund a cancelled sailing. This stretch of coast is one of the windiest inhabited places in the country.|La travesía a la isla se cancela por hoy, y el hotel reservado al otro lado no reembolsa una travesía cancelada. Este tramo de costa es uno de los lugares habitados con más viento del país.|La traversée vers l'île est annulée pour la journée, et l'hôtel réservé de l'autre côté ne rembourse pas une traversée annulée. Ce tronçon de côte est l'un des lieux habités les plus venteux du pays.|島への航路が今日は欠航になり、向こうで予約していた宿は欠航ぶんを返金してくれない。この海岸沿いは国内でも指折りの風の強い有人地帯である。",
  ),

  // ---- 道北(hoku) ----
  ev(
    "toyotomi-onsen-shift", "gain", ["hoku"], "♨️", 220,
    "Covering the front desk at the hot spring|Cubriendo la recepción del balneario|Assurer l'accueil du bain thermal|油田温泉の受付を手伝う",
    "The oil-field hot spring's usual clerk is out sick, and someone is needed at the desk for the evening rush. Visitors come from well outside the region for a mineral spring found almost nowhere else in Japan.|La recepcionista habitual del balneario de aguas petrolíferas está enferma, y hace falta alguien en el mostrador para la hora punta de la tarde. Vienen visitantes de fuera de la región por un manantial mineral que apenas existe en otro lugar de Japón.|La réceptionniste habituelle du bain thermal pétrolifère est malade, et il faut quelqu'un au comptoir pour l'affluence du soir. Des visiteurs viennent de loin pour une source minérale presque introuvable ailleurs au Japon.|油田温泉のいつもの係が体調を崩し、夕方の混み合う時間の受付に人手が要る。日本ではほとんど他にない鉱泉を目当てに、遠方から訪れる客も多い。",
  ),
  ev(
    "shimokawa-biomass-work", "gain", ["hoku"], "🪵", 240,
    "A day sorting wood for the biomass plant|Un día clasificando madera para la planta de biomasa|Une journée à trier le bois pour la centrale biomasse|バイオマス発電所の木材選別",
    "The forestry cooperative pays day rates to sort wood waste by size before it goes into the boiler. The whole town's heating and power now runs largely on what used to be burned as scrap.|La cooperativa forestal paga jornales por clasificar los residuos de madera por tamaño antes de que entren en la caldera. Ahora la calefacción y la electricidad de todo el pueblo dependen en gran parte de lo que antes se quemaba como desecho.|La coopérative forestière paie à la journée pour trier les déchets de bois par taille avant la chaudière. Le chauffage et l'électricité de toute la ville reposent désormais en grande partie sur ce qui n'était jadis que déchet brûlé.|森林組合は、ボイラーに入れる前の木くずをサイズごとに選別する日当仕事を頼んだ。町全体の暖房と電力は今や、かつては捨てて燃やしていたものに多くを頼っている。",
  ),
  ev(
    "fubuki-doro-fusa", "loss", ["hoku"], "🌨️", 260,
    "Snowed in for an extra night|Aislado por la nieve una noche más|Bloqué par la neige une nuit de plus|吹雪で足止め、宿がもう一泊",
    "The road out is closed until the plough comes through, and the only inn in town charges for the extra night whether you wanted it or not. In the interior, a closed road can mean the nearest open one is an hour's drive away.|La carretera de salida está cerrada hasta que pase la quitanieves, y la única posada del pueblo cobra la noche extra, se quiera o no. En el interior, una carretera cerrada puede significar que la más cercana abierta está a una hora en coche.|La route de sortie est fermée en attendant le chasse-neige, et la seule auberge du village facture la nuit supplémentaire, qu'on le veuille ou non. Dans l'intérieur, une route fermée peut signifier que la plus proche ouverte est à une heure de route.|除雪車が来るまで出る道が閉ざされ、町に一軒しかない宿は望まなくても追加の一泊分を請求してくる。内陸では、道が一本閉じるだけで最寄りの通れる道が車で1時間先ということもある。",
    [8, 9, 10],
  ),
  ev(
    "kazunoko-kakou-fusoku", "loss", ["hoku"], "🐟", 220,
    "A poor herring roe season|Una mala temporada de hueva de arenque|Une mauvaise saison de rogue de hareng|数の子の水揚げが少ない年",
    "The catch feeding the roe-processing plants has come in thin this year, and the price you were quoted for a case has gone up since last week. Much of what the plant handles is imported herring roe rather than local, but even that supply has tightened.|La captura que alimenta las plantas de procesado de hueva ha venido escasa este año, y el precio de una caja ha subido desde la semana pasada. Buena parte de lo que procesa la planta es hueva de arenque importada, pero incluso ese suministro se ha estrechado.|La pêche qui alimente les usines de traitement de la rogue est maigre cette année, et le prix d'une caisse a grimpé depuis la semaine dernière. Une bonne part de ce que traite l'usine est de la rogue de hareng importée, mais même cet approvisionnement s'est resserré.|加工場に入る数の子の原料の水揚げが今年は細く、先週から箱あたりの値段が上がった。加工場が扱う数の子の多くは地元産ではなく輸入だが、その輸入分すら細くなっている。",
  ),

  // ---- 道東(tou) ----
  ev(
    "tsurui-crane-count", "gain", ["tou"], "🕊️", 240,
    "Helping with the winter crane count|Ayudando en el censo invernal de grullas|Aider au recensement hivernal des grues|タンチョウの越冬個体数調査を手伝う",
    "Volunteers are needed to help tally birds at the winter feeding grounds, and the conservation office pays a small stipend for the cold hours. The population here has grown from a few dozen birds a century ago to well over a thousand.|Se necesitan voluntarios para ayudar a contar aves en las zonas de alimentación invernal, y la oficina de conservación paga un pequeño estipendio por las horas de frío. La población ha pasado de unas pocas docenas de aves hace un siglo a más de mil.|Des bénévoles sont recherchés pour aider à recenser les oiseaux sur les aires d'alimentation hivernale, et le bureau de conservation verse une petite indemnité pour les heures de froid. La population est passée de quelques dizaines d'oiseaux il y a un siècle à plus d'un millier.|越冬地での個体数調査を手伝う人手が求められ、保護事務所は寒い中の作業にわずかな手当を出す。この個体数は一世紀前の数十羽から、今では千羽をゆうに超えるまでに回復した。",
    [8, 9, 10],
  ),
  ev(
    "akkeshi-oyster-raft-work", "gain", ["tou"], "🦪", 260,
    "A day turning the oyster rafts|Un día volteando las balsas de ostras|Une journée à retourner les radeaux d'huîtres|牡蠣の養殖筏をひっくり返す",
    "The single-seed method needs the rafts turned regularly so the oysters grow an even shape, and the co-op pays by the raft. The bay has fed people this way since well before it had a name in any language now spoken here.|El método de semilla única exige voltear las balsas con regularidad para que las ostras crezcan con forma pareja, y la cooperativa paga por balsa. La bahía ha alimentado a la gente así desde mucho antes de tener nombre en ninguna lengua hablada hoy aquí.|La méthode à graine unique exige de retourner les radeaux régulièrement pour une forme régulière des huîtres, et la coopérative paie au radeau. La baie nourrit ainsi les gens depuis bien avant d'avoir un nom dans une langue aujourd'hui parlée ici.|シングルシード方式は、牡蠣を均等な形に育てるため筏を定期的にひっくり返す必要があり、組合は筏の数に応じて日当を払う。この湾は、いま話されているどの言語での名を持つよりずっと前から、こうして人を養ってきた。",
  ),
  ev(
    "sake-sokouami-tetsudai", "gain", ["tou"], "🎣", 280,
    "A hand hauling the fixed-net catch|Una mano subiendo la captura de la red fija|Un coup de main pour remonter la prise du filet fixe|定置網漁を手伝う",
    "The autumn salmon run means every boat needs an extra pair of hands at the net before dawn, paid in cash at the dock. The fixed-net method has worked this coast the same way for well over a century.|La remontada otoñal del salmón hace que cada barco necesite manos extra en la red antes del alba, pagadas en efectivo en el muelle. El método de red fija ha trabajado esta costa igual desde hace más de un siglo.|La remontée automnale du saumon fait que chaque bateau a besoin de bras en plus au filet avant l'aube, payés en liquide sur le quai. La méthode du filet fixe travaille cette côte de la même façon depuis plus d'un siècle.|秋の鮭の遡上期には、どの船も夜明け前の網起こしに人手を要り、船着き場でその場で現金を払われる。定置網漁は一世紀以上、この海岸で同じやり方を続けてきた。",
    [5, 6],
  ),
  ev(
    "kion-gekihen-nougu", "loss", ["tou"], "🌾", 240,
    "A sudden frost damages the pasture|Una helada repentina daña el pasto|Un gel soudain endommage le pâturage|急な霜で牧草が傷む",
    "The grassland's growing season is short enough that a single out-of-season frost can set back a cutting the herd was counting on, and feed has to be bought in to cover the gap. The plateau's dairy herds outnumber its people many times over, so a bad cutting is felt everywhere at once.|La temporada de crecimiento del pastizal es tan corta que una sola helada fuera de temporada puede retrasar un corte con el que contaba el rebaño, y hay que comprar forraje para cubrir el hueco. Los rebaños lecheros de la meseta superan varias veces en número a sus habitantes.|La saison de pousse de la prairie est si courte qu'un seul gel hors saison peut retarder une coupe sur laquelle comptait le troupeau, et il faut acheter du fourrage pour combler le manque. Les troupeaux laitiers du plateau dépassent plusieurs fois en nombre ses habitants.|草地の生育期間は短く、季節外れの霜が一度降りるだけで牛が頼りにしていた刈り取りが遅れ、足りない分の飼料を買い足すことになる。この台地の酪農牛の数は住民の数を何倍も上回るため、刈り取りの不作は島じゅうですぐに感じられる。",
    [1, 8],
  ),
];
