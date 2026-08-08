/**
 * 茨城県の青マス・赤マスで起きる出来事(16件。増8・減8)。
 *
 * 地方コード: hok=県北 / cen=県央 / rok=鹿行 / nan=県南 / sei=県西
 *
 * **県の盤面なので、地方まるごとの好不況では差がつかない。**
 * 国の盤面のように「北部が不作」といった書き方をすると茨城では嘘になるので、
 * 差は**行事と季節**でつけている。偕楽園の梅(2〜3月)・笠間の菊(10〜11月)・
 * 奥久慈の新そば(11月)・鉾田のメロン(5〜6月)・古河の桃(3〜4月)・
 * 袋田の氷瀑(1〜2月)・大洗の海開き(7〜8月)・潮来のあやめ(6月)・
 * 筑波山の梅林(2月)・県西の梨と台風(9月)・からっ風(12〜1月)。
 * **同じ2月でも、県央では梅が実入りになり、県南では梅林への渋滞が出費になる。**
 * 地方まるごとではなく、その月にその場所で実際に起きることで差をつけるということ。
 *
 * 地方も月も指定しない出来事を増減それぞれ2件置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
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

export const IBARAKI_MONEY_EVENTS = [
  // ---- 県内どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "hoshiimo-bagging", "gain", [], "🍠", 220,
    "Bagging the dried sweet potato|Envasando el boniato seco|Mise en sachet des patates séchées|干し芋の袋詰め",
    "A farm shed needs a morning of weighing and sealing bags, and pays in cash and broken pieces. Ibaraki dries about nine tenths of all the hoshi-imo eaten in Japan: the potatoes are steamed, sliced and left out in the dry winter wind off the sea.|Un cobertizo necesita una mañana de pesar y cerrar bolsas, y paga en efectivo y en trozos rotos. Ibaraki seca cerca de nueve décimas partes del hoshi-imo de Japón: se cuece al vapor, se corta y se deja al viento seco del invierno.|Un hangar cherche une matinée de bras pour peser et fermer des sachets, payée en espèces et en morceaux cassés. Ibaraki sèche près des neuf dixièmes du hoshi-imo japonais : cuit à la vapeur, tranché, puis laissé au vent sec d'hiver.|農家の作業小屋で午前中ずっと計量と袋詰めをして、現金と欠けたぶんをもらった。茨城は日本で食べられる干し芋のおよそ九割を作る。蒸してから薄く切り、海から吹く冬の乾いた風に当てて干す。",
  ),
  ev(
    "chokubaijo-toban", "gain", [], "🥬", 180,
    "Minding the roadside stall|Atendiendo el puesto de carretera|Tenir l'étal de bord de route|直売所の当番",
    "Somebody has to mind the till while the growers are still in the fields, and goes home with whatever did not sell. Ibaraki has one of the highest farm-stall turnovers in the country, because the growers are close enough to the cities to sell straight to the eater and skip the market entirely.|Alguien tiene que cubrir la caja mientras los agricultores siguen en el campo, y se lleva a casa lo que no se vendió. Ibaraki tiene una de las mayores ventas directas del país: el campo está lo bastante cerca de las ciudades.|Quelqu'un doit tenir la caisse pendant que les maraîchers sont encore aux champs, et repart avec les invendus. Ibaraki compte parmi les plus forts chiffres de vente directe du pays : les champs sont assez près des villes.|作り手がまだ畑にいるあいだ、レジの当番を代わった。売れ残りを持たされて帰る。茨城は農産物直売所の売上が全国有数である。畑が都市に近く、市場を通さず食べる人へ直に売れるからだ。",
  ),
  ev(
    "one-car-per-adult", "loss", [], "⛽", 200,
    "Everything is a drive away|Todo queda a un trayecto|Tout est à une voiture d'ici|どこへ行くにも車",
    "Anywhere worth going is twenty minutes off the nearest line, so the tank goes twice in a week. Ibaraki has one of the highest rates of cars per household in the country, because outside the few rail corridors the buses are thin and the distances are flat and long.|Cualquier sitio que valga la pena queda a veinte minutos de la línea más cercana, y el depósito se llena dos veces en una semana. Ibaraki tiene una de las tasas más altas de coches por hogar del país.|Le moindre endroit intéressant est à vingt minutes de la ligne la plus proche : deux pleins dans la semaine. Ibaraki compte l'un des taux de voitures par ménage les plus élevés du pays.|行きたい場所は最寄りの線から車で二十分の所にあり、一週間で二度給油することになった。茨城は一世帯あたりの自動車保有台数が全国でも多い県である。数少ない鉄道沿線を外れるとバスは細く、平らな道がどこまでも続く。",
  ),
  ev(
    "joban-jutai", "loss", [], "🚗", 240,
    "Stopped on the expressway home|Parado en la autopista de vuelta|Bloqué sur l'autoroute du retour|帰りの高速で動かない",
    "Thirty kilometres of stationary traffic on a Sunday evening, and the fuel burns away without a metre gained. Everything that leaves the prefecture for Tokyo funnels onto the same two or three roads, and the flat land that made them cheap to build gave them nowhere else to go.|Treinta kilómetros parados un domingo por la tarde, y el combustible se va sin moverte. Todo lo que sale hacia Tokio se embudo en dos o tres carreteras.|Trente kilomètres à l'arrêt un dimanche soir, et le carburant part sans avancer. Tout ce qui gagne Tokyo s'entonne sur deux ou trois routes.|日曜の夕方、三十キロの渋滞にはまり、止まったまま燃料だけが減っていく。東京へ向かうものはすべて同じ二、三本の道に集まる。平らで敷きやすかったぶん、他に逃げ道がない。",
  ),

  // ---- 県北(hok) ----
  ev(
    "shinsoba-uchite", "gain", ["hok"], "🍜", 260,
    "The new buckwheat needs hands|El trigo nuevo pide manos|Le sarrasin nouveau réclame des bras|新そばの打ち手が足りない",
    "Every shop in the valley opens the new crop the same week and none of them has enough people to roll it. Hitachi-aki-soba is graded by the hamlet it grew in, and buyers come up from Tokyo for the first cut of the year, so nobody is turned away who can carry a tray.|Todas las casas del valle abren la cosecha nueva la misma semana y a ninguna le sobran manos. El hitachi-aki-soba se clasifica por la aldea donde creció y los compradores suben desde Tokio.|Toutes les maisons de la vallée ouvrent la récolte nouvelle la même semaine et manquent toutes de bras. Le hitachi-aki-soba se classe par hameau et les acheteurs montent de Tokyo.|谷じゅうの店が同じ週にいっせいに新そばを出すので、どこも打ち手が足りない。常陸秋そばは育った字(あざ)ごとに格付けされ、その年の初物を求めて東京から買い手が上ってくる。盆を運べる者なら断られない。",
    [7],
  ),
  ev(
    "hyobaku-tozan", "loss", ["hok"], "🧊", 220,
    "Chains for the frozen falls|Cadenas para la cascada helada|Chaînes pour la chute gelée|氷瀑を見に行って足回りを買う",
    "The road up to the frozen waterfall is sheet ice, and the chains that should have gone on at the bottom have to be bought at the top. In the coldest years the whole 120-metre face turns to ice and the queue of cars starts before dawn, most of them from places that never see snow.|La subida a la cascada helada es una placa de hielo, y las cadenas que debieron montarse abajo hay que comprarlas arriba. En los años más fríos toda la pared de 120 m se congela y la fila empieza antes del alba.|La montée vers la chute gelée est une plaque de glace : les chaînes qu'il fallait monter en bas s'achètent en haut. Les années les plus froides, les 120 m gèlent entièrement.|凍った滝へ上る道は一面の氷で、出る前に履いておくべきものをその場で買う羽目になった。寒い年には高さ120mの岩壁がまるごと凍りつき、夜明け前から車の列ができる。並ぶ車の多くは雪の降らない土地のものである。",
    [9, 10],
  ),

  // ---- 県央(cen) ----
  ev(
    "kairakuen-plum-festival", "gain", ["cen"], "🌸", 280,
    "Pouring tea among the plum trees|Sirviendo té entre los ciruelos|Servir le thé sous les pruniers|梅の下で茶を出す",
    "The festival needs more hands than the town has, and the trays go round from dawn until the last visitor leaves. Kairakuen holds three thousand plum trees of a hundred varieties, and because they open over six weeks rather than all at once, the crowds keep coming through February and March.|La fiesta necesita más manos de las que tiene el pueblo, y las bandejas van y vienen desde el alba. Kairakuen guarda tres mil ciruelos de cien variedades que abren a lo largo de seis semanas, no de golpe.|La fête réclame plus de bras que la ville n'en a : les plateaux circulent dès l'aube. Kairakuen compte trois mille pruniers de cent variétés, qui s'ouvrent sur six semaines et non d'un coup.|梅まつりは町の人手だけでは足りず、夜明けから最後の客が帰るまで盆を運んだ。偕楽園には百品種三千本の梅がある。一斉ではなく六週間かけて順に咲くので、二月から三月いっぱい人が絶えない。",
    [10, 11],
  ),
  ev(
    "kiku-ningyo", "gain", ["cen"], "🌼", 240,
    "Changing the flowers on the dolls|Cambiando las flores de las figuras|Rhabiller les figures de fleurs|菊人形の花を替える",
    "The life-size figures are dressed in living chrysanthemums, and every few days the spent blooms have to be lifted out and fresh plants worked in. Kasama's chrysanthemum festival has run since 1908, the oldest in the country, and the dressing is done by people who learned it from their parents.|Las figuras de tamaño natural van vestidas de crisantemos vivos y cada pocos días hay que sacar los marchitos y meter plantas frescas. La fiesta de Kasama data de 1908, la más antigua del país.|Les figures grandeur nature sont vêtues de chrysanthèmes vivants : tous les deux ou trois jours, il faut ôter les fleurs fanées et en repiquer. La fête de Kasama date de 1908.|等身大の人形は生きた菊を着せられており、数日ごとに傷んだ花を抜いて新しい株を差し込まねばならない。笠間の菊まつりは1908年から続く日本最古のもので、着せ付けは親から習った人の手で行われる。",
    [6, 7],
  ),
  ev(
    "umibiraki-tsukaisugi", "loss", ["cen"], "🏖️", 190,
    "The beach hut takes it all|La caseta de playa se lo lleva todo|La paillote emporte tout|海の家で使い果たす",
    "Parking, a mat, a shower, a bowl of noodles, and the day costs three times what the sea did. The beaches here open in mid-July and the sand is packed by families up from Tokyo, who come because it is the nearest open Pacific to the capital.|Aparcamiento, esterilla, ducha y un cuenco de fideos: el día cuesta el triple que el mar. Las playas abren a mediados de julio y se llenan de familias llegadas de Tokio.|Parking, natte, douche et un bol de nouilles : la journée coûte trois fois la mer. Les plages ouvrent mi-juillet et se remplissent de familles venues de Tokyo.|駐車場、ござ、シャワー、ラーメン一杯。海そのものの三倍の金が飛んだ。この浜は七月半ばに海開きし、東京から上がってきた家族連れで埋まる。首都からいちばん近い外洋の海だからである。",
    [3, 4],
  ),

  // ---- 鹿行(rok) ----
  ev(
    "melon-senka", "gain", ["rok"], "🍈", 250,
    "Sorting melons by sound|Clasificando melones por el sonido|Trier les melons à l'oreille|音でメロンを選り分ける",
    "The sorting shed needs a pair of hands on the line, turning each melon while a machine reads its sugar through the skin. Ibaraki ships more melons than any other prefecture and staggers the varieties so the harvest runs from spring into autumn, which is why the shed needs people for months rather than weeks.|El almacén necesita manos en la línea: girar cada melón mientras una máquina le lee el azúcar a través de la piel. Ibaraki envía más melones que ninguna otra prefectura y escalona las variedades.|La station de tri cherche des bras sur la chaîne : retourner chaque melon pendant qu'une machine lit le sucre à travers la peau. Ibaraki expédie plus de melons que toute autre préfecture, en échelonnant les variétés.|選果場の列に入れられ、機械が皮ごしに糖度を読むあいだ、一つずつメロンを回す役についた。茨城はメロンの出荷量が全国一で、品種をずらしてあるため収穫は春から秋まで続く。作業場が数週間ではなく数か月人を要るのはそのためだ。",
    [1, 2],
  ),
  ev(
    "ayame-yado", "loss", ["rok"], "🛏️", 210,
    "No room left by the water|No queda cuarto junto al agua|Plus une chambre au bord de l'eau|水辺に部屋が残っていない",
    "Every inn along the canals is full for the iris festival, and a bed two towns away costs twice the rate. The irises open for about three weeks in June, and the town brings back the boats that once carried brides between the villages to take visitors down the same channels.|Todas las posadas del canal están llenas por la fiesta del lirio, y una cama a dos pueblos cuesta el doble. Los lirios abren unas tres semanas en junio.|Toutes les auberges des canaux affichent complet pour la fête des iris : un lit à deux villages de là coûte le double. Les iris fleurissent trois semaines en juin.|あやめ祭りのあいだ、水路沿いの宿はどこも満室で、二つ先の町で倍の宿代を払った。あやめは六月の三週間ほど咲く。町はかつて村から村へ花嫁を運んだ舟を出し、同じ水路で客を乗せる。",
    [2],
  ),

  // ---- 県南(nan) ----
  ev(
    "jikken-kyoryoku", "gain", ["nan"], "🔬", 230,
    "Paid to sit in a machine|Pagado por sentarte en una máquina|Payé pour s'asseoir dans une machine|実験に協力して謝礼をもらう",
    "A notice on a corridor board asks for volunteers, and two hours later the work is pressing buttons in a quiet room, for cash. Dozens of national laboratories were moved here in the 1970s and put down in one place, so a town of this size runs on the odd economy of research.|Un aviso en un tablón pide voluntarios, y dos horas después el trabajo es pulsar botones en una sala silenciosa, pagado. Decenas de laboratorios nacionales se trasladaron aquí en los años setenta.|Une annonce sur un panneau cherche des volontaires ; deux heures plus tard, le travail consiste à appuyer sur des boutons dans une salle silencieuse, contre paiement. Des dizaines de laboratoires nationaux y furent transférés dans les années 1970.|廊下の掲示板に被験者募集の紙が貼ってあり、二時間後には静かな部屋でボタンを押して謝礼をもらっていた。1970年代に数十の国立研究機関がここへまとめて移された。この規模の町が研究という妙な経済で回っているのはそのためである。",
  ),
  ev(
    "bairin-jutai", "loss", ["nan"], "🚙", 170,
    "Two hours to reach the plum grove|Dos horas para llegar al ciruelar|Deux heures pour atteindre le verger|梅林まで二時間",
    "One road climbs to the grove and every car in the region is on it, so the parking costs a full day for barely an hour. The plums on the mountain open a little later than the ones in the castle town, which means the same fortnight fills two different places with the same cars.|Un solo camino sube al ciruelar y todos los coches de la comarca están en él: el aparcamiento cuesta un día entero por apenas una hora. Los ciruelos del monte abren algo más tarde que los de la ciudad.|Une seule route monte au verger et toutes les voitures de la région y sont : le parking se paie à la journée pour une heure à peine. Les pruniers du mont fleurissent un peu après ceux de la ville.|梅林へ上る道は一本きりで、界隈じゅうの車がそこにいる。ほとんど使わない駐車場に金を払った。山の梅は城下町の梅より少し遅れて咲くので、同じ二週間が二つの場所を同じ車で埋める。",
    [10],
  ),

  // ---- 県西(sei) ----
  ev(
    "koga-momo", "gain", ["sei"], "🌺", 200,
    "Sweeping the peach blossom|Barriendo la flor del melocotón|Balayer les fleurs de pêcher|桃の花を掃く",
    "The festival hires anyone who will sweep petals and carry water, and pays at the end of each day. The grove was planted in the 1970s on the site of an old castle's outer ground, and the trees are the flowering kind — they are grown for the blossom and never for the fruit.|La fiesta contrata a quien quiera barrer pétalos y acarrear agua, y paga al final de cada jornada. El bosquecillo se plantó en los setenta sobre el recinto exterior de un viejo castillo.|La fête embauche qui veut balayer les pétales et porter l'eau, payé chaque soir. Le verger fut planté dans les années 1970 sur l'enceinte extérieure d'un vieux château.|祭りは花びらを掃き、水を運ぶ者なら誰でも雇い、その日ごとに払う。この桃林は1970年代、古い城の外郭だった土地に植えられた。木はいずれも花桃で、花のために育てられ、実は採らない。",
    [11, 0],
  ),
  ev(
    "nashi-taifu", "loss", ["sei"], "🍐", 260,
    "The pears come down in the night|Las peras caen de noche|Les poires tombent dans la nuit|夜のうちに梨が落ちる",
    "One storm at the wrong moment and the fruit is on the ground a fortnight before picking, worth nothing but juice. Pears here are grown flat on overhead frames so that pickers can walk beneath them, which spreads the weight but gives the wind a sail to push against.|Una tormenta a destiempo y la fruta queda en el suelo quince días antes de la recogida, sin más valor que el zumo. Aquí los perales se conducen en emparrado plano.|Une tempête au mauvais moment et les fruits sont à terre quinze jours avant la cueillette, bons pour le jus. Ici, les poiriers sont conduits à plat sur des treilles.|時期の悪い嵐が一度来ると、収穫の二週間前に実が地面に落ちる。もう果汁にするほかない。この土地の梨は棚に平らに仕立てる。人が下を歩けて重さも分散するが、そのぶん風には帆になる。",
    [5],
  ),
  ev(
    "karakkaze", "loss", ["sei", "nan"], "🌬️", 160,
    "The dry wind gets into everything|El viento seco se mete en todo|Le vent sec s'insinue partout|からっ風が入り込む",
    "A week of hard dry wind off the mountains, and everything has to be washed clean of sand at a price. The same wind is what dries the sweet potato on the coast, so the season that costs money here is the one that pays two counties east.|Una semana de viento seco de la montaña, y hay que pagar para sacar la arena de todo. Ese mismo viento es el que seca el boniato en la costa.|Une semaine de vent sec descendu des monts, et il faut payer pour ôter le sable de tout. C'est ce vent-là qui sèche la patate douce sur la côte.|山から乾いた風が一週間吹き続け、持ち物すべてから砂を洗い落とす費用がかかった。同じ風が、海沿いでは干し芋を乾かしている。ここで出費になる季節が、二郡東では実入りになっているということだ。",
    [8, 9],
  ),
];
