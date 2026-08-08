/**
 * 世界一周の青マス・赤マスで起きる出来事。
 *
 * 地方コード: eur=ヨーロッパ / asi=アジア / afr=アフリカ・中東 /
 *             nam=北アメリカ / sam=南アメリカ / oce=オセアニア・太平洋
 *
 * 地方も月も指定しない出来事(甲板の手伝い・通訳・小包・査証)が
 * 増減それぞれ2件あるので、どの地方・どの月でも必ず1件は引ける。
 * 月を絞ったものは、南半球の地方では季節が逆になることに合わせてある
 * (0=4月)。
 */
function t(source) {
  const [en, es, fr, ja] = source.split("|");
  return { en, es, fr, ja };
}

/**
 * 出来事1件。`months` を指定すると、その月にしか起こらない
 * (0=4月)。省略すれば通年。
 */
function ev(id, kind, regs, emoji, amount, title, narrative, months = []) {
  return { id, kind, regs, e: emoji, amount, n: t(title), t: t(narrative), months };
}

export const WORLD_MONEY_EVENTS = [
  // ---- どの地方でも・通年 ----
  ev(
    "deck-passage", "gain", [], "🪢", 200,
    "Working a passage|Ganarse el pasaje trabajando|Payer sa traversée en travaillant|甲板を手伝って乗せてもらう",
    "Taking a line, washing down the deck, standing a watch — that buys a stage of the journey for nothing, plus a little cash. A cargo ship may take up to twelve passengers before it counts as a passenger vessel and needs a doctor aboard, which is why freighters carry exactly that many and no more.|Coger un cabo, baldear la cubierta, hacer una guardia: eso paga una etapa del viaje y deja algo de dinero encima. Un carguero puede llevar hasta doce pasajeros antes de contar como buque de pasaje y necesitar médico a bordo: por eso llevan justo esos doce y ni uno más.|Prendre un bout, lessiver le pont, tenir un quart : cela paie une étape du voyage, et un peu d'argent avec. Un cargo peut embarquer jusqu'à douze passagers avant d'être classé navire à passagers et de devoir un médecin à bord ; c'est pourquoi les cargos en prennent douze, jamais treize.|舫いを取り、甲板を洗い、当直に立って、一区間ただで運んでもらったうえに少し現金までもらった。貨物船は乗客が十二人を超えると旅客船扱いになり、船医を乗せなければならない。だから貨物船の客はきっかり十二人で、それ以上は乗せない。",
  ),
  ev(
    "standing-between", "gain", [], "🗣️", 160,
    "Standing between two people|De pie entre dos personas|Debout entre deux personnes|二人のあいだに立つ",
    "Half an hour at a hospital counter, translating in both directions, and the family will not let the favour go unpaid. Around seven thousand languages are counted in the world, and about half of them have fewer than ten thousand speakers left.|Media hora en el mostrador de un hospital, traduciendo en ambos sentidos, y la familia no deja que el favor quede sin pagar. En el mundo se cuentan unas siete mil lenguas, y a la mitad les quedan menos de diez mil hablantes.|Une demi-heure au guichet d'un hôpital, à traduire dans les deux sens, et la famille ne laisse pas le service impayé. On compte environ sept mille langues dans le monde, et la moitié d'entre elles ont moins de dix mille locuteurs.|病院の窓口で三十分、双方の言葉を訳して立っていたら、家族はどうしても受け取ってくれと言って聞かなかった。世界で数えられている言語は7000ほどあり、その半分は話し手が一万人を切っている。",
  ),
  ev(
    "parcel-home", "loss", [], "📦", 180,
    "Sending it home|Mandarlo a casa|Le renvoyer au pays|荷物を家に送る",
    "The bag will not close, so the rest goes into a box at the post office and the postage costs more than what is in it. Under the postal union's rules the country that delivers a parcel is paid by the country that posted it, and the counters set their prices from those accounts.|La bolsa ya no cierra, así que el resto va en una caja de correos y el franqueo cuesta más que su contenido. Según las reglas de la unión postal, al país que entrega el paquete le paga el país que lo envió, y de esas cuentas salen las tarifas del mostrador.|Le sac ne ferme plus : le reste part dans un carton à la poste et l'affranchissement coûte plus cher que le contenu. Selon les règles de l'union postale, le pays qui distribue le colis est payé par celui qui l'a expédié, et c'est de ces comptes que sortent les tarifs du guichet.|鞄が閉まらなくなったので、残りは郵便局で箱に詰めて送った。送料は中身より高くついた。万国郵便連合の取り決めでは、配達する国の取り分は差し出した国が払うことになっていて、窓口の料金はその精算から決まる。",
  ),
  ev(
    "visa-at-the-window", "loss", [], "🛂", 240,
    "The visa is bought at the window|El visado se compra en la ventanilla|Le visa s'achète au guichet|窓口で査証を買う",
    "It is issued on arrival, it is cash only, and the notes must be clean, unmarked and not too old. A queue builds up while somebody holds each note up to the light.|Se expide a la llegada, solo en efectivo, y los billetes tienen que estar limpios, sin marcas y no demasiado viejos. Se forma cola mientras alguien mira cada billete al trasluz.|Il se délivre à l'arrivée, en espèces uniquement, et les billets doivent être propres, sans marque et pas trop anciens. Une file s'allonge pendant qu'on regarde chaque billet à la lumière.|到着時に発給されるが、支払いは現金のみ。紙幣は汚れておらず、書き込みがなく、あまり古くないものに限られる。誰かがあなたの金を透かして見ているあいだ、後ろには列ができていく。",
  ),

  // ---- ヨーロッパ ----
  ev(
    "licensed-pitch", "gain", ["eur"], "🎻", 220,
    "A licensed pitch|Un sitio con licencia|Un emplacement autorisé|許可のいる場所",
    "Two hours on a marked square of tiles in a station passage fill the case with six kinds of coin. The London Underground made busking legal in 2003 and now auditions for its pitches; before that, everyone who played there was breaking the byelaws.|Dos horas sobre un cuadrado marcado en el suelo de un pasillo de estación llenan el estuche de monedas de seis países. El metro de Londres legalizó la música callejera en 2003 y ahora hace audiciones para cada sitio; antes, todo el que tocaba allí incumplía la norma.|Deux heures sur un carré marqué au sol dans un couloir de gare remplissent l'étui de pièces de six pays. Le métro de Londres a légalisé les musiciens de rue en 2003 et fait passer des auditions pour chaque emplacement ; avant cela, quiconque y jouait était en infraction.|駅の通路の、床にしるしのある一角で二時間弾いたら、ケースに六か国の硬貨がたまった。ロンドンの地下鉄が路上演奏を合法にしたのは2003年で、いまは場所ごとにオーディションがある。それ以前にそこで弾いていた人は、みな規則違反だった。",
    [1, 2, 3, 4, 5],
  ),
  ev(
    "berth-supplement", "loss", ["eur"], "🛏️", 200,
    "A ticket is not a bed|Un billete no es una cama|Un billet n'est pas un lit|切符と寝台は別物",
    "The ticket is valid for the night train but not for anywhere to lie down, and the conductor sells the last berth in the corridor at his own unhurried pace. Night trains had almost disappeared from western Europe by 2016 and have been coming back, route by route, ever since.|El billete vale para el tren nocturno pero no para tumbarse en ninguna parte, y el revisor vende la última litera en el pasillo, sin ninguna prisa. Los trenes nocturnos casi habían desaparecido de Europa occidental hacia 2016 y desde entonces vuelven, ruta a ruta.|Le billet est valable pour le train de nuit mais pas pour s'allonger, et le contrôleur vend la dernière couchette dans le couloir, sans se presser. Les trains de nuit avaient presque disparu d'Europe de l'Ouest vers 2016 ; ils reviennent depuis, ligne après ligne.|切符は夜行列車に有効だが、横になる場所の分は入っていない。車掌は廊下で、少しも急がずに最後の寝台を売ってくれた。西ヨーロッパの夜行列車は2016年頃にほぼ消えかけ、それから一路線ずつ戻ってきている。",
  ),

  // ---- アジア ----
  ev(
    "night-market-shift", "gain", ["asi"], "🍜", 230,
    "One shift at the night market|Un turno en el mercado nocturno|Un service au marché de nuit|夜市で一晩働く",
    "Carrying, washing and counting change from six until one, all of it standing in front of a burner. Singapore moved its street cooks indoors into hawker centres from the 1970s, and in 2020 the way they work was added to the UNESCO list.|Cargar, fregar y dar cambio desde las seis hasta la una, de pie todo el rato frente a un fogón. Singapur metió a sus cocineros callejeros en los hawker centres desde los años setenta, y en 2020 esa manera de trabajar entró en la lista de la UNESCO.|Porter, laver, rendre la monnaie de six heures à une heure du matin, debout devant un brûleur. Singapour a fait entrer ses cuisiniers de rue dans des hawker centres à partir des années 1970, et en 2020 cette manière de travailler est entrée sur la liste de l'UNESCO.|六時から一時まで、荷を運び、洗い物をし、釣り銭を数える。そのあいだずっと火口の前に立ちっぱなしだ。シンガポールは1970年代から屋台を「ホーカーセンター」という屋内施設へ集めており、2020年にはその働き方がユネスコの一覧に加えられた。",
  ),
  ev(
    "monsoon-ferries-stop", "loss", ["asi"], "⛴️", 240,
    "The ferries stop for the season|Los ferris paran por temporada|Les bacs s'arrêtent pour la saison|船が季節ごと止まる",
    "From the first heavy rain the small boats are laid up until September, and the way round is by road, twice as long and three times the fare. The same winds once fixed the sailing dates for the whole ocean: out with one monsoon, home with the other, and no choice about the months.|Desde la primera lluvia fuerte las barcas quedan amarradas hasta septiembre, y el rodeo es por carretera, el doble de largo y el triple de caro. Esos mismos vientos fijaban antaño las fechas de navegación de todo el océano: se iba con un monzón y se volvía con el otro, sin elegir los meses.|Dès les premières grosses pluies, les petits bateaux restent à quai jusqu'en septembre, et le détour se fait par la route, deux fois plus long et trois fois plus cher. Ces mêmes vents fixaient jadis les dates de navigation de tout l'océan : on partait avec une mousson et on rentrait avec l'autre, sans choisir ses mois.|最初の大雨から九月まで、小さな船はすべて陸に上げられる。回り道は陸路で、距離は二倍、運賃は三倍になる。かつてこの風は大洋全体の出航期を決めていた。行きは一方のモンスーン、帰りはもう一方。月を選ぶ余地はなかった。",
    [2, 3, 4, 5],
  ),

  // ---- アフリカ・中東 ----
  ev(
    "dhow-cargo", "gain", ["afr"], "⛵", 250,
    "Loading the dhow|Cargando el dhow|Charger le boutre|ダウ船に積み込む",
    "Cement, dates and one motorcycle go aboard by hand along a plank, and the day's work is paid out at dusk in notes off a roll. The winter wind blows from the north-east from November, and the wooden boats still leave with it as they always did.|Cemento, dátiles y una motocicleta suben a bordo a mano por una tabla, y al final del día se paga con billetes sacados de un fajo. El viento de invierno sopla del nordeste desde noviembre, y los barcos de madera siguen saliendo con él como siempre.|Du ciment, des dattes et une moto montent à bord à la main par une planche, et la journée se paie au crépuscule sur un rouleau de billets. Le vent d'hiver souffle du nord-est à partir de novembre, et les bateaux de bois partent toujours avec lui.|セメントと棗と、オートバイが一台。渡した板の上を人の手で運び上げ、日暮れに札束から抜いた紙幣で支払われる。冬の風は十一月から北東に吹き、木造の船はいまも昔と同じように、その風に乗って出ていく。",
    [7, 8, 9],
  ),
  ev(
    "harmattan-dust", "loss", ["afr"], "🌫️", 220,
    "The dust closes everything|El polvo lo cierra todo|La poussière ferme tout|砂塵で何もかも止まる",
    "The wind comes off the desert with the sky the colour of weak tea, the airfield shuts, and the road is done at walking pace behind a lorry nobody can see. The same dust crosses the Atlantic every year and puts phosphorus on the floor of the Amazon.|El viento baja del desierto con el cielo color de té flojo, cierra el aeródromo y la carretera se hace al paso, detrás de un camión que nadie ve. Ese mismo polvo cruza el Atlántico cada año y deja fósforo en el suelo de la Amazonia.|Le vent descend du désert, le ciel prend la couleur d'un thé léger, l'aérodrome ferme et la route se fait au pas derrière un camion qu'on ne voit pas. Cette même poussière traverse l'Atlantique chaque année et dépose du phosphore sur le sol de l'Amazonie.|砂漠から風が来て、空は薄い紅茶の色になる。飛行場は閉鎖、道路は見えないトラックの後ろを歩く速さでついて行くしかない。この砂塵は毎年大西洋を渡り、アマゾンの森の地面にリンを供給している。",
    [8, 9, 10],
  ),

  // ---- 北アメリカ ----
  ev(
    "harvest-run-north", "gain", ["nam"], "🌾", 260,
    "Riding north with the harvest|Subiendo al norte con la cosecha|Monter vers le nord avec la moisson|収穫を追って北へ上がる",
    "A crew starts in Texas in May and finishes on the Canadian prairie in September, cutting whatever is ripe and moving on the same night — and it is short of a driver. The wheat ripens about a hundred and fifty kilometres further north every week, and the machines follow it at exactly that speed.|Una cuadrilla empieza en Texas en mayo y acaba en la pradera canadiense en septiembre, segando lo que está maduro y moviéndose esa misma noche: le falta un conductor. El trigo madura unos ciento cincuenta kilómetros más al norte cada semana, y las máquinas lo siguen justo a esa velocidad.|Une équipe commence au Texas en mai et finit dans la prairie canadienne en septembre, coupant ce qui est mûr et repartant le soir même : il lui manque un conducteur. Le blé mûrit environ cent cinquante kilomètres plus au nord chaque semaine, et les machines le suivent exactement à cette allure.|五月にテキサスで始め、九月にカナダの平原で終える刈り取り班に加わった。熟れたところを刈り、その晩のうちに次へ移る。小麦は一週間ごとに150キロほど北で熟していき、機械はちょうどその速さで追いかける。",
    [1, 2, 3, 4, 5],
  ),
  ev(
    "tip-not-on-the-bill", "loss", ["nam"], "🧾", 190,
    "The tip is not on the bill|La propina no está en la cuenta|Le pourboire n'est pas sur l'addition|勘定書に入っていない分",
    "The total looks reasonable until it turns out that a fifth of it again is expected, and the face across the counter makes that perfectly clear. The federal wage for tipped work has stood at two dollars and thirteen cents an hour since 1991; the rest is supposed to come from the customer.|El total parece razonable hasta que resulta que se espera otro veinte por ciento, y la cara del otro lado del mostrador lo deja clarísimo. El salario federal del trabajo con propina lleva en dos dólares con trece centavos la hora desde 1991: el resto ha de salir del cliente.|Le total paraît raisonnable jusqu'à ce qu'il apparaisse qu'on attend un cinquième de plus, et le visage en face du comptoir le dit très bien. Le salaire fédéral des métiers à pourboire est de deux dollars treize de l'heure depuis 1991 : le reste est censé venir du client.|合計はまともに見えたが、そこにもう二割を足すのが当然だと知らされる。カウンターの向こうの顔がそれを何より雄弁に告げている。チップを前提とする職の連邦最低賃金は1991年から時給2ドル13セントのまま。残りは客が出すことになっている。",
  ),

  // ---- 南アメリカ ----
  ev(
    "hammock-deck", "gain", ["sam"], "🛶", 240,
    "Slinging a hammock on the river boat|Colgando la hamaca en el barco fluvial|Accrocher son hamac sur le bateau du fleuve|川船にハンモックを吊る",
    "An afternoon spent loading sacks and gas bottles buys deck passage and a wage, and the hammock goes up between two families who have done this a dozen times. Belém to Manaus takes about four days going up and less coming down, and everybody sleeps in rows, touching.|Una tarde cargando sacos y bombonas paga el pasaje de cubierta y un jornal, y la hamaca se cuelga entre dos familias que ya lo han hecho una docena de veces. De Belém a Manaos son unos cuatro días aguas arriba y menos al bajar, y todos duermen en filas, rozándose.|Un après-midi à charger sacs et bouteilles de gaz paie le passage sur le pont et un salaire ; le hamac se tend entre deux familles qui ont fait le voyage dix fois. De Belém à Manaus, il faut environ quatre jours en montant et moins en descendant, et tout le monde dort en rangs serrés.|午後いっぱい麻袋とガスボンベを積むのを手伝ったら、甲板の乗船と手間賃をくれた。何度もこの船に乗っている二家族のあいだにハンモックを吊る。ベレンからマナウスまで、上りはおよそ四日、下りはもっと早い。皆が触れ合うほどの間隔で並んで眠る。",
  ),
  ev(
    "road-washed-out", "loss", ["sam"], "🌧️", 230,
    "The rains take the road|Las lluvias se llevan la carretera|Les pluies emportent la route|雨で道がなくなる",
    "A slope comes down in the night, the road is gone for two hundred metres, and the detour is a day and a half of gravel. The wet season here is the southern summer, so the worst driving of the year falls at Christmas.|Una ladera se viene abajo de noche, faltan doscientos metros de carretera y el desvío son día y medio de pista. Aquí la estación de lluvias es el verano austral, así que el peor viaje del año cae en Navidad.|Un versant s'effondre dans la nuit, deux cents mètres de route ont disparu et le détour représente un jour et demi de piste. Ici la saison des pluies est l'été austral : le pire trajet de l'année tombe donc à Noël.|夜のうちに斜面が崩れ、道が二百メートルほど失われた。迂回路は砂利道で一日半かかる。この地方の雨季は南半球の夏なので、一年でいちばん走りにくい時期はクリスマスに当たる。",
    [8, 9, 10, 11],
  ),

  // ---- オセアニア・太平洋 ----
  ev(
    "picking-by-the-bin", "gain", ["oce"], "🍒", 230,
    "Paid by the bin|Pagan por caja|Payé à la caisse|箱いくらで払われる",
    "Cherries from first light, paid by weight, and the good pickers earn twice what the slow ones do on the same tree. New Zealand and Australia bring in seasonal workers from the Pacific islands for these weeks under schemes their own growers asked for.|Cerezas desde el alba, pagadas al peso, y los buenos recolectores sacan el doble que los lentos del mismo árbol. Nueva Zelanda y Australia traen temporeros de las islas del Pacífico para estas semanas, con programas que pidieron sus propios agricultores.|Des cerises dès l'aube, payées au poids, et les bons cueilleurs gagnent le double des lents sur le même arbre. La Nouvelle-Zélande et l'Australie font venir des saisonniers des îles du Pacifique pour ces semaines-là, dans des dispositifs réclamés par leurs propres producteurs.|夜明けからさくらんぼを摘む。支払いは重さで決まるので、同じ木でも手の早い人は遅い人の倍を稼ぐ。ニュージーランドとオーストラリアはこの数週間のために太平洋の島々から季節労働者を受け入れており、その制度は現地の農家自身が求めたものだ。",
    [8, 9, 10],
  ),
  ev(
    "island-freight", "loss", ["oce"], "📦", 240,
    "Everything comes by ship|Todo llega en barco|Tout arrive par bateau|何もかも船で来る",
    "A tin of tomatoes costs three times what it did on the mainland, and the shop's shelves empty in the same order every fortnight until the boat is sighted. On the smallest islands the supply ship calls a few times a year, and the whole calendar is arranged around it.|Una lata de tomate cuesta el triple que en el continente, y las estanterías de la tienda se vacían en el mismo orden cada quince días hasta que se avista el barco. En las islas más pequeñas el buque de suministro llega unas pocas veces al año, y el calendario entero se organiza en torno a él.|Une boîte de tomates coûte trois fois le prix du continent, et les rayons du magasin se vident dans le même ordre tous les quinze jours jusqu'à ce qu'on aperçoive le bateau. Sur les plus petites îles, le navire de ravitaillement passe quelques fois par an, et tout le calendrier s'organise autour de lui.|トマトの缶詰が本土の三倍する。店の棚は二週間ごとに同じ順番で空になっていき、船影が見えるまでそのままだ。ごく小さな島では補給船の寄港は年に数回で、島の予定はすべてその日を軸に組まれる。",
  ),
];
