/**
 * ドイツの青マス・赤マスで起きる出来事(22件。増14・減8)。
 *
 * 地方コード: nord=北部 / rhein=ラインラント / sw=南西部 / bay=バイエルン /
 * mitte=中部 / ost=東部
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、6地方それぞれに3件(増2・減1)、季節や祭りに結びつけて置いている。
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

export const GERMANY_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "pfandflaschen-sammeln", "gain", [], "🧴", 180,
    "Collecting deposit bottles from a park bin|Recogiendo botellas con depósito de una papelera del parque|Récupérer des bouteilles consignées dans une poubelle de parc|公園のごみ箱から空き瓶(プファント)を集める",
    "Every Pfandflasche returned to a machine is worth 8 to 25 cents, and a park bench covered in half-finished drinks after a warm evening left enough empty bottles stacked by the bin to fill a shopping bag. Students and pensioners alike work the same benches on any evening the weather cooperates, and nobody thinks twice about it.|Cada botella con depósito (Pfandflasche) devuelta a una máquina vale entre 8 y 25 céntimos, y un banco de parque cubierto de bebidas a medio terminar tras una noche cálida dejó suficientes botellas vacías junto a la papelera para llenar una bolsa. Estudiantes y jubilados trabajan los mismos bancos cualquier noche que el tiempo lo permita, y a nadie le parece raro.|Chaque Pfandflasche rapportée à une machine vaut de 8 à 25 centimes, et un banc de parc couvert de boissons à moitié terminées après une soirée chaude a laissé assez de bouteilles vides près de la poubelle pour remplir un sac. Étudiants et retraités travaillent les mêmes bancs dès que le temps le permet, sans que personne n'y trouve rien d'étrange.|プファントフラッシェ(デポジット付きの瓶)は一本返却機に入れると8〜25セントになる。暖かい晩のあと、飲みかけの飲み物だらけになった公園のベンチのそばには、買い物袋いっぱいになるほどの空き瓶がごみ箱の横に積まれていた。天気さえよければ学生も年金生活者も同じベンチを回っており、誰も気にとめない。",
  ),
  ev(
    "postbote-vertretung", "gain", [], "📮", 200,
    "Covering a mail round for a day|Cubriendo una ronda de correos por un día|Assurer une tournée postale pour la journée|郵便配達を一日代わる",
    "The regular carrier's bike had a flat tyre and no spare, so someone was needed at short notice to cover the route on foot before the afternoon post went out. Every parcel had to be checked twice against the list, but the extra pay covered a full day's meals with room to spare.|La bicicleta del cartero habitual tenía una rueda pinchada y sin repuesto, así que hacía falta alguien de urgencia para cubrir la ruta a pie antes de que saliera el correo de la tarde. Cada paquete había que comprobarlo dos veces contra la lista, pero la paga extra cubrió las comidas de todo el día y sobró.|Le vélo du facteur habituel avait un pneu crevé sans rechange, il fallait donc quelqu'un dans l'urgence pour couvrir la tournée à pied avant le départ du courrier de l'après-midi. Chaque colis devait être vérifié deux fois sur la liste, mais la paie supplémentaire a couvert les repas de toute la journée, avec un peu de reste.|いつもの配達員の自転車がパンクし、予備もなかったため、午後便が出る前に急きょ徒歩でルートを代わる人手が必要になった。荷物はすべて配達リストと二重に照合しなければならなかったが、割増賃金は一日分の食費をまかなってなお余りあった。",
  ),
  ev(
    "skat-verlust", "loss", [], "🃏", 190,
    "Losing badly at Skat|Perdiendo feo al Skat|Une lourde défaite au Skat|スカート(トランプ)の勝負に負ける",
    "Skat is played three at a time with a deck that leaves ten cards face down on the table, and the bidding got away from everyone before the last hand was even dealt. It is one of the country's most widely played card games, and the scoring is fiddly enough that newcomers rarely walk away ahead.|El Skat se juega entre tres con una baraja que deja diez cartas boca abajo sobre la mesa, y las pujas se descontrolaron antes de repartir siquiera la última mano. Es uno de los juegos de cartas más populares del país, y el recuento de puntos es tan intrincado que los novatos rara vez salen ganando.|Le Skat se joue à trois avec un jeu qui laisse dix cartes face cachée sur la table, et les enchères ont dérapé avant même que la dernière main ne soit distribuée. C'est l'un des jeux de cartes les plus répandus du pays, et le calcul des points est assez compliqué pour que les débutants en ressortent rarement gagnants.|スカートは三人で行うトランプで、10枚を場に伏せたまま進める。最後の手が配られる前から掛け金が誰の手にも負えないほど膨らんでいた。国内でも屈指の人気を誇るこのカードゲームは点数計算がかなり込み入っており、初心者が勝ち逃げすることはまずない。",
  ),
  ev(
    "falschparken-bussgeld", "loss", [], "🅿️", 150,
    "A parking ticket on an unfamiliar street|Una multa de aparcamiento en una calle desconocida|Une amende de stationnement dans une rue inconnue|不案内な通りでの駐車違反",
    "The sign a block back had explained the resident-only zone clearly enough, but it was easy to miss coming from the other direction, and the fine arrived tucked under the wiper before the errand was even finished. Enforcement runs on a fixed fee schedule printed on the ticket itself, so there is no haggling over it.|El cartel una manzana atrás explicaba con claridad la zona solo para residentes, pero era fácil pasarlo por alto viniendo del otro lado, y la multa llegó bajo el limpiaparabrisas antes de terminar el recado. La sanción sigue una tarifa fija impresa en el propio boleto, así que no hay margen para negociar.|Le panneau un pâté de maisons plus tôt expliquait clairement la zone résidents seulement, mais il était facile de le manquer en arrivant de l'autre côté, et l'amende est arrivée glissée sous l'essuie-glace avant même la fin de la course. La sanction suit un barème fixe imprimé sur le ticket lui-même, impossible donc de négocier.|一区画手前の標識は住民専用区域だとはっきり説明していたが、反対方向から来ると見落としやすく、用事が済む前にワイパーの下に反則金の紙が挟まっていた。金額は切符自体に印刷された固定の表に従うので、交渉の余地はない。",
  ),

  // ---- nord 北部 ----
  ev(
    "kieler-woche-crew", "gain", ["nord"], "⛵", 260,
    "Crewing a boat for Kieler Woche|Formando parte de la tripulación en la Kieler Woche|Faire partie d'un équipage pour la Kieler Woche|キーラー・ヴォッヘでヨットの乗員を務める",
    "A skipper short a hand for the week needed someone who could at least follow orders and not fall overboard, and the pay came with a berth for the week and a grandstand view of the harbour fireworks. Kiel's fjord fills with more than 4,000 boats for the event, so an extra pair of hands is never hard to place.|Un patrón sin tripulante para la semana necesitaba a alguien que al menos siguiera órdenes y no cayera por la borda, y la paga incluyó litera para toda la semana y vista privilegiada de los fuegos artificiales del puerto. El fiordo de Kiel se llena de más de 4.000 barcos para el evento.|Un skipper à court d'un marin pour la semaine avait besoin de quelqu'un capable au moins de suivre les ordres et de ne pas tomber par-dessus bord, et la paie incluait une couchette pour la semaine et une vue de choix sur le feu d'artifice du port. Le fjord de Kiel se remplit de plus de 4 000 bateaux pour l'événement.|一週間、人手が足りない船長が、せめて指示に従って海に落ちない人を求めていた。報酬には一週間分の寝床と港の花火の特等席がついてきた。キール・フィヨルドはこの催しのために4000隻を超える船で埋まるので、手伝いの口はいくらでもある。",
    [3],
  ),
  ev(
    "sylt-strandkorb-verloren", "loss", ["nord"], "🏖️", 200,
    "A wallet left in a rented beach chair|Una billetera olvidada en una silla de playa alquilada|Un portefeuille oublié dans un fauteuil de plage loué|貸し出しビーチチェアに財布を置き忘れる",
    "The wicker beach chair's canopy folded down for a nap in the sun, and the wallet tucked into the side pocket was still there when the chair was returned — to the rental stand, not to its owner. Sylt's beach chairs get rented and shuffled around constantly, so by the time anyone thought to check, three other renters had already sat in it.|La capota de mimbre de la silla de playa se bajó para una siesta al sol, y la billetera guardada en el bolsillo lateral seguía ahí cuando la silla se devolvió, pero al puesto de alquiler, no a su dueño. Las sillas de Sylt se alquilan y cambian de manos sin parar, así que para cuando alguien pensó en revisar, otros tres inquilinos ya se habían sentado.|La capote en osier du fauteuil de plage s'est rabattue pour une sieste au soleil, et le portefeuille glissé dans la poche latérale y était encore quand le fauteuil fut rendu — au stand de location, pas à son propriétaire. Les fauteuils de Sylt changent sans cesse de locataire, si bien qu'au moment d'y penser, trois autres personnes s'y étaient déjà assises.|籐編みのビーチチェアの日よけを下ろして日向で昼寝をした。脇のポケットに入れた財布はそのままだったが、椅子が戻ったのは持ち主のところではなくレンタル所だった。ズュルトのビーチチェアは絶えず貸し出され使い回されるので、誰かが気づいたときにはすでに他の客が三人も座ったあとだった。",
  ),
  ev(
    "fischbroetchen-aushilfe", "gain", ["nord"], "🐟", 220,
    "Helping at a fish-sandwich stall before the ferry|Ayudando en un puesto de bocadillos de pescado antes del ferri|Aider à un stand de sandwichs au poisson avant le ferry|フェリー出港前の魚サンドの屋台を手伝う",
    "The lunch rush before a ferry departure left the stall's owner short-handed, and buttering rolls fast enough to keep the line moving earned a cut of the till besides the smell of herring that took two washes to get out of a jacket. Northern port towns run on exactly this kind of stand, busiest in the ten minutes before a boat leaves.|La hora punta antes de la salida del ferri dejó al dueño del puesto sin manos suficientes, y untar panecillos lo bastante rápido para que la cola no se detuviera dio una parte de la caja, además de un olor a arenque que costó dos lavados quitar de la chaqueta. Los puertos del norte viven de puestos así.|Le coup de feu du déjeuner avant le départ du ferry a laissé le patron du stand à court de bras, et beurrer les petits pains assez vite pour que la file avance a valu une part de la caisse, en plus d'une odeur de hareng qu'il a fallu deux lavages pour enlever de la veste. Les ports du nord tournent grâce à ce genre de stand.|フェリー出港前の昼の混雑で屋台の店主が人手不足になっていた。列を止めないよう手早くパンにバターを塗ると、売上の分け前に加えて、上着から落ちるのに二回洗濯が要るニシンの匂いまでもらった。北部の港町はまさにこうした屋台で回っており、船が出る十分前がいちばん忙しい。",
  ),

  // ---- rhein ラインラント ----
  ev(
    "karneval-wagen-bauen", "gain", ["rhein"], "🎭", 240,
    "Helping build a Karneval float|Ayudando a construir una carroza de Karneval|Aider à construire un char de Karneval|カーニバルの山車づくりを手伝う",
    "The float needed one more pair of hands stapling tissue-paper flowers onto chicken wire before Rosenmontag, and the workshop paid in cash plus all the mulled wine a volunteer could drink while working through the cold night. Cologne's parade committees start planning a full year ahead, so there is always a float somewhere behind schedule.|La carroza necesitaba unas manos más grapando flores de papel de seda sobre malla de gallinero antes del Rosenmontag, y el taller pagó en efectivo más todo el vino caliente que un voluntario pudiera beber trabajando la noche fría. Los comités de Colonia empiezan a planear con un año de antelación.|Le char avait besoin d'une paire de bras de plus pour agrafer des fleurs en papier crépon sur du grillage avant le Rosenmontag, et l'atelier a payé en espèces, plus tout le vin chaud qu'un bénévole pouvait boire en travaillant dans le froid de la nuit. Les comités de Cologne planifient un an à l'avance.|山車はローゼンモンタークまでに、金網に紙の花をホチキスで留める手をもう一人求めていた。工房は現金払いに加えて、寒い夜通しの作業中いくら飲んでもよいホットワインまで出してくれた。ケルンのパレード委員会は一年がかりで準備を進めるので、どこかしら予定より遅れている山車が必ずある。",
    [10],
  ),
  ev(
    "koelsch-bierdeckel-verwirrung", "loss", ["rhein"], "🍺", 180,
    "Losing count of the Kölsch|Perdiendo la cuenta de los Kölsch|Perdre le compte des Kölsch|ケルシュの杯数が分からなくなる",
    "Waiters here keep bringing fresh glasses of the local beer, in its distinctive narrow shape, until a drinker places a coaster on top of the empty one to signal enough — and the coaster stayed in a pocket a little too long. The bill added up every full glass whether it was asked for or not, exactly as the custom promises.|Aquí los camareros no dejan de traer vasos nuevos de la cerveza local, con su forma estrecha característica, hasta que el bebedor pone un posavasos encima del vacío para señalar que basta; y el posavasos se quedó en el bolsillo demasiado tiempo. La cuenta sumó cada vaso lleno, se hubiera pedido o no.|Ici, les serveurs continuent d'apporter des verres frais de la bière locale, dans sa forme étroite caractéristique, jusqu'à ce que le buveur pose un sous-verre sur le vide pour signaler que ça suffit — et le sous-verre est resté trop longtemps dans une poche. L'addition a compté chaque verre plein, demandé ou non.|ここの給仕は、地元ビールの細長いグラスを、飲み手が空いたグラスの上にコースターを乗せてもう十分だと合図するまで次々に運んでくる。そのコースターがポケットに入ったまま少し長く忘れられていた。頼んだかどうかにかかわらず、満杯だったグラスの数だけ勘定に加算された。この土地の作法どおりである。",
  ),
  ev(
    "weihnachtsmarkt-standhilfe", "gain", ["rhein"], "🎄", 230,
    "Minding a Christmas market stall|Atendiendo un puesto del mercado navideño|Tenir un étal du marché de Noël|クリスマス市の屋台番を手伝う",
    "A mulled-wine stand needed an extra pair of hands ladling drinks into mugs through the busiest evening of the season, and the tips alone from a single Advent weekend added up faster than the hourly rate did. Rhineland Christmas markets run for weeks, so the work rarely runs out before the season does.|Un puesto de vino caliente necesitaba manos extra sirviendo con cucharón la bebida en tazas durante la noche más ajetreada de la temporada, y solo las propinas de un fin de semana de Adviento sumaron más rápido que el sueldo por hora. Los mercados navideños de Renania duran semanas.|Un stand de vin chaud avait besoin de bras supplémentaires pour verser la boisson dans des chopes durant la soirée la plus chargée de la saison, et les seuls pourboires d'un week-end de l'Avent ont rapporté plus vite que le tarif horaire. Les marchés de Noël rhénans durent des semaines.|ホットワインの屋台が、シーズン最も混み合う晩にマグへ注ぎ分ける手を求めていた。アドベントの一週末だけのチップでも、時給よりも早く積み上がった。ラインラントのクリスマス市は何週間も続くので、シーズンが終わるより先に仕事がなくなることはめったにない。",
    [8],
  ),

  // ---- sw 南西部 ----
  ev(
    "weinlese-helfer", "gain", ["sw"], "🍇", 250,
    "Picking grapes for the Weinlese|Recogiendo uvas para la Weinlese|Cueillir le raisin pour la Weinlese|ヴァインレーゼ(ブドウ収穫)の摘み手をする",
    "The Neckar valley's steep vineyard rows needed pickers before the first frost threatened the last of the crop, and a fast pair of hands filled bucket after bucket for a flat rate per row cleared. Villages here pay in cash at the end of the day precisely because the harvest window is too short to run payroll properly.|Las empinadas hileras de viñedos del valle del Neckar necesitaban recolectores antes de que la primera helada amenazara la última cosecha, y unas manos rápidas llenaban cubo tras cubo por una tarifa fija por hilera despejada. Los pueblos de aquí pagan en efectivo al final del día porque la ventana de vendimia es demasiado corta.|Les rangs escarpés des vignes de la vallée du Neckar avaient besoin de vendangeurs avant que la première gelée ne menace la dernière récolte, et des mains rapides remplissaient seau après seau pour un tarif fixe par rang débarrassé. Les villages d'ici paient en espèces le soir même, la fenêtre de vendange étant trop courte.|ネッカー渓谷の急な葡萄畑の畝は、最後の収穫を初霜が脅かす前に摘み手を求めていた。手の速い者なら畝一列ぶんの定額で、バケツを次々と満たしていけた。この土地の村々が日払いの現金で支払うのは、収穫の期間があまりに短く、正式な給与手続きが間に合わないからである。",
    [6],
  ),
  ev(
    "schwarzwald-falschparken", "loss", ["sw"], "🅿️", 170,
    "A parking fine on a narrow Black Forest lane|Una multa de aparcamiento en un camino estrecho de la Selva Negra|Une amende de stationnement sur une route étroite de la Forêt-Noire|シュヴァルツヴァルトの細い道での駐車違反",
    "The village street looked wide enough until a delivery van came the other way, and the only space left was clearly marked for residents only. Black Forest villages built for horse carts rather than cars enforce their narrow parking rules strictly, precisely because there is nowhere else to put a wrongly parked car.|La calle del pueblo parecía lo bastante ancha hasta que llegó una furgoneta de reparto en dirección contraria, y el único hueco libre estaba claramente reservado a residentes. Los pueblos de la Selva Negra, construidos para carros de caballos y no para coches, aplican con rigor sus estrechas normas de aparcamiento.|La rue du village semblait assez large jusqu'à l'arrivée d'une camionnette de livraison en sens inverse, et la seule place restante était clairement réservée aux résidents. Les villages de la Forêt-Noire, bâtis pour les charrettes plutôt que pour les voitures, font respecter strictement leurs règles de stationnement étroites.|村の通りは対向から配達車が来るまでは十分な幅に見えたが、残っていた唯一の空きは住民専用とはっきり標示されていた。馬車のために作られ車のためではないシュヴァルツヴァルトの村々は、駐車違反の取り締まりに厳しい。ほかに違反車を置く場所がないからである。",
  ),
  ev(
    "kurbad-aushilfe", "gain", ["sw"], "🧖", 210,
    "Working a shift at the spa town's bathhouse|Trabajando un turno en el balneario del pueblo termal|Faire un service aux thermes de la ville d'eaux|温泉町の浴場で働く",
    "A bathhouse short-staffed for the evening session needed someone to hand out robes and keep the steam room schedule running on time, and the job came with a free soak once the last guest had left. Spa towns like this one run on a strict, almost ceremonial timetable that someone always has to keep.|Un balneario con poco personal para el turno de tarde necesitaba a alguien que repartiera batas y mantuviera puntual el horario de la sala de vapor, y el trabajo incluyó un baño gratis una vez se fue el último huésped. Los balnearios como este siguen un horario estricto, casi ceremonial, que alguien siempre tiene que cuidar.|Des thermes en sous-effectif pour la séance du soir avaient besoin de quelqu'un pour distribuer les peignoirs et tenir à l'heure le programme du hammam, et le poste incluait un bain gratuit une fois le dernier client parti. Les villes d'eaux comme celle-ci suivent un horaire strict, presque cérémoniel.|夜の回で人手が足りない浴場が、バスローブを配りサウナ室の時間割を守らせる係を求めていた。最後の客が帰ったあとには無料で入浴できるおまけまでついた。この手の温泉町は厳格な、ほとんど儀式のような時間割で動いており、誰かが常にそれを守らせる必要がある。",
  ),

  // ---- bay バイエルン ----
  ev(
    "oktoberfest-bedienung", "gain", ["bay"], "🍺", 280,
    "Serving steins at Oktoberfest|Sirviendo jarras en el Oktoberfest|Servir des chopes à l'Oktoberfest|オクトーバーフェストでジョッキを運ぶ",
    "Carrying six full one-litre steins at once without spilling a drop is the unofficial test for a beer tent job, and passing it on the first try earned a full shift's wage plus whatever a grateful table left behind. The festival hires thousands of temporary staff every year, almost all of them gone again by the first weekend of October.|Llevar seis jarras llenas de un litro a la vez sin derramar una gota es la prueba no oficial para trabajar en la carpa de cerveza, y superarla al primer intento dio el sueldo de un turno completo más lo que dejara una mesa agradecida. El festival contrata a miles de trabajadores temporales cada año.|Porter six chopes pleines d'un litre à la fois sans en renverser une goutte est le test officieux pour travailler dans une tente à bière, et le réussir du premier coup a valu le salaire d'un service complet, plus ce qu'une table reconnaissante a laissé. Le festival embauche des milliers d'employés temporaires chaque année.|1リットルジョッキ六杯を一度に、一滴もこぼさず運べるかが、ビールテントで働くための非公式な試験になっている。一発で合格すると、一勤務ぶんの賃金に加えて客からの心づけまで入った。祭りは毎年数千人の臨時スタッフを雇うが、そのほとんどは10月最初の週末までには姿を消す。",
    [5],
  ),
  ev(
    "masskrug-kaution-verloren", "loss", ["bay"], "🍻", 190,
    "A broken beer stein deposit|El depósito de una jarra rota|La consigne d'une chope cassée|割れたビアジョッキの保証金",
    "The heavy glass Maßkrug carries a deposit precisely because tents lose so many of them to souvenir hunters, and one dropped on the cobblestones counted the same as one carried out the gate — the deposit stayed with the tent either way. Nobody argues with the tent staff about it twice.|La pesada jarra de vidrio Maßkrug lleva depósito precisamente porque las carpas pierden muchas a manos de cazadores de recuerdos, y una que se cae sobre el adoquinado cuenta igual que una que se lleva por la puerta: el depósito se queda con la carpa de todos modos. Nadie discute esto dos veces.|La lourde chope en verre Maßkrug est consignée précisément parce que les tentes en perdent tant au profit des chasseurs de souvenirs, et une chope brisée sur les pavés compte comme une chope emportée par la porte — la consigne reste à la tente dans les deux cas. Personne ne discute ça deux fois avec le personnel.|重いガラス製のマスクルーク(1リットルジョッキ)に保証金がかかっているのは、記念に持ち去る客であまりに多く失われるからである。石畳に落として割ったものも、門から持ち出されたものも、テント側からすれば同じ扱いで、保証金は戻ってこない。この点についてテントのスタッフと二度言い争う者はいない。",
  ),
  ev(
    "alpenhuette-saisonjob", "gain", ["bay"], "⛰️", 260,
    "A season's work at an Alpine hut|Una temporada de trabajo en un refugio alpino|Une saison de travail dans un refuge alpin|アルプスの山小屋で一シーズン働く",
    "The mountain hut needed someone to haul supplies up from the valley station before the season's first heavy snowfall closed the trail properly, and the pay reflected exactly how little anyone else wanted the job. Once the snow settles in, everything the hut needs for the whole winter has to already be inside it.|El refugio de montaña necesitaba a alguien que subiera suministros desde la estación del valle antes de que la primera gran nevada de la temporada cerrara bien el sendero, y la paga reflejaba exactamente lo poco que nadie más quería ese trabajo. Una vez que la nieve se asienta, todo lo que necesita el refugio para el invierno ya debe estar dentro.|Le refuge de montagne avait besoin de quelqu'un pour monter des provisions depuis la station de vallée avant que la première grosse chute de neige de la saison ne ferme vraiment le sentier, et la paie reflétait exactement à quel point personne d'autre ne voulait de ce travail. Une fois la neige installée, tout ce dont le refuge a besoin pour l'hiver doit déjà être à l'intérieur.|山小屋は、その季節最初の本格的な積雪が道を閉ざす前に、谷の駅から物資を担ぎ上げる人手を求めていた。誰もやりたがらない仕事だということが、そのまま賃金の高さに表れていた。雪が根雪になってしまえば、その冬じゅう山小屋に必要なものはすべて、あらかじめ中に運び込んでおかなければならない。",
    [8, 9],
  ),

  // ---- mitte 中部 ----
  ev(
    "weihnachtsmarkt-bratwurst", "gain", ["mitte"], "🌭", 220,
    "Grilling Bratwurst at a Thuringian market stall|Asando Bratwurst en un puesto del mercado de Turingia|Griller des Bratwurst à un étal du marché de Thuringe|テューリンゲンの市でブラートヴルストを焼く",
    "A single grill can turn out a sausage every ninety seconds if the coals are hot enough, and a stall owner short-handed for the evening rush paid well for someone who already knew how long to leave one on the fire. Thuringian bratwurst is protected as a regional specialty, and the stallholders take the grilling technique just as seriously as the recipe.|Una sola parrilla puede sacar una salchicha cada noventa segundos si las brasas están lo bastante calientes, y el dueño del puesto, corto de manos para el ajetreo de la tarde, pagó bien a alguien que ya sabía cuánto tiempo dejarla al fuego. La bratwurst de Turingia está protegida como especialidad regional.|Un seul gril peut sortir une saucisse toutes les quatre-vingt-dix secondes si les braises sont assez chaudes, et le tenancier du stand, à court de bras pour le coup de feu du soir, a bien payé quelqu'un qui savait déjà combien de temps la laisser sur le feu. La bratwurst de Thuringe est protégée comme spécialité régionale.|炭が十分熱ければ、一台の焼き台で90秒に一本のペースでソーセージを焼ける。夕方の混雑で人手が足りない屋台の主人は、火にかける時間をすでに心得ている人によい賃金を払った。テューリンゲンのブラートヴルストは地域特産品として保護されており、店主たちはレシピと同じくらい焼き方にもこだわる。",
    [8],
  ),
  ev(
    "thueringer-wald-verlaufen", "loss", ["mitte"], "🌲", 160,
    "Lost on a forest trail in the Thuringian Forest|Perdido en un sendero del bosque de Turingia|Perdu sur un sentier de la forêt de Thuringe|テューリンゲンの森の小道で迷う",
    "Every trail junction looked the same under the same kind of pine, and the marked path chosen at the last fork led an extra two hours out of the way before it rejoined the right one. The forest is criss-crossed with old trade routes now used only by hikers, and not all of them are marked as clearly as the main ones.|Cada cruce del sendero parecía igual bajo el mismo tipo de pino, y el camino señalizado elegido en la última bifurcación llevó dos horas extra fuera de ruta antes de reunirse con el correcto. El bosque está cruzado por antiguas rutas comerciales que ahora solo usan los senderistas.|Chaque croisement de sentier semblait identique sous le même type de pin, et le chemin balisé choisi à la dernière fourche a fait faire deux heures de détour avant de rejoindre le bon. La forêt est sillonnée d'anciennes routes commerciales aujourd'hui utilisées seulement par les randonneurs.|どの分かれ道も同じ種類の松の下でそっくりに見え、最後の分岐で選んだ道標のある道は、正しい道に合流するまで二時間も余計にかかった。この森には昔の交易路が縦横に走っており、いまはハイカーしか使わないが、主要な道ほどはっきり標示されていないものも多い。",
  ),
  ev(
    "bachfest-einlasshelfer", "gain", ["mitte"], "🎻", 230,
    "Ushering at a Bach festival concert|Acomodando en un concierto del festival Bach|Placer à un concert du festival Bach|バッハ音楽祭のコンサートで案内係をする",
    "A choral concert needed someone to show latecomers to the few remaining seats without disturbing the performance, a job that mostly meant standing very still and pointing. The pay was modest, but it came with a seat of one's own for the second half once the doors were finally closed.|Un concierto coral necesitaba a alguien que llevara a los rezagados a los pocos asientos que quedaban sin molestar la interpretación, un trabajo que consistía sobre todo en quedarse muy quieto y señalar. La paga era modesta, pero incluyó asiento propio para la segunda parte una vez cerradas por fin las puertas.|Un concert choral avait besoin de quelqu'un pour guider les retardataires vers les rares places restantes sans déranger l'exécution, un travail consistant surtout à rester très immobile en pointant du doigt. La paie était modeste, mais incluait une place à soi pour la seconde partie une fois les portes enfin fermées.|合唱コンサートで、演奏を邪魔せずに遅れてきた客を残り少ない席へ案内する係が求められていた。仕事といっても、ほとんどはじっと立って指し示すだけだった。報酬はささやかだったが、ようやく扉が閉められたあとの後半は自分の席で聴けるおまけがついた。",
  ),

  // ---- ost 東部 ----
  ev(
    "mauer-tour-trinkgeld", "gain", ["ost"], "🧱", 240,
    "Tips from guiding a Wall history walk|Propinas por guiar un paseo histórico del Muro|Pourboires pour guider une balade sur l'histoire du Mur|壁の歴史をたどる散策の案内で謝礼をもらう",
    "A group of visitors paid well to be shown which stretches of the old death strip are now bike paths and which buildings still carry damage from decades ago left deliberately unrepaired, a route that takes years of living in the city to know properly. Guiding this kind of walk is unofficial work, passed on by word of mouth rather than advertised.|Un grupo de visitantes pagó bien por que les mostraran qué tramos de la antigua franja de la muerte son hoy carriles bici y qué edificios aún conservan daños de hace décadas dejados sin reparar a propósito, una ruta que lleva años de vivir en la ciudad conocer bien. Guiar este tipo de paseo es trabajo no oficial.|Un groupe de visiteurs a bien payé pour se voir montrer quels tronçons de l'ancienne bande de la mort sont aujourd'hui des pistes cyclables et quels bâtiments portent encore des dégâts vieux de plusieurs décennies volontairement laissés en l'état, un itinéraire qu'il faut des années à vivre en ville pour bien connaître. Guider ce genre de balade est un travail non officiel.|一団の観光客が、かつての「死の回廊」のどの区間がいま自転車道になっているか、どの建物がいまも修復されずに残る何十年も前の傷跡を留めているかを案内してもらう代わりに、たっぷり謝礼を払ってくれた。この道筋は何年もこの町に住んでようやく身につくものである。こうした案内は非公式な仕事で、宣伝ではなく口コミで頼まれる。",
  ),
  ev(
    "fahrrad-gestohlen", "loss", ["ost"], "🚲", 220,
    "A bicycle stolen outside an apartment block|Una bicicleta robada frente a un bloque de apartamentos|Un vélo volé devant un immeuble|マンションの前で自転車を盗まれる",
    "Even a good lock through both wheels and the frame is no guarantee here, where a bike left overnight on the street has roughly even odds of still being there by morning depending on the neighbourhood. Police reports get filed by the thousand every month, and almost none of the bikes are ever seen again.|Ni siquiera un buen candado que pase por las dos ruedas y el cuadro es garantía aquí, donde una bici dejada toda la noche en la calle tiene más o menos la mitad de posibilidades de seguir ahí por la mañana, según el barrio. Se presentan miles de denuncias policiales cada mes.|Même un bon cadenas passant par les deux roues et le cadre n'est pas une garantie ici, où un vélo laissé toute la nuit dans la rue a environ une chance sur deux d'y être encore le matin, selon le quartier. Des milliers de plaintes sont déposées chaque mois.|両輪とフレームを通したしっかりした鍵でさえ、ここでは保証にならない。一晩通りに置いた自転車が朝まで無事かどうかは、地区にもよるがほぼ五分五分である。警察への届け出は毎月何千件にもなるが、戻ってくる自転車はほとんどない。",
  ),
  ev(
    "striezelmarkt-standhilfe", "gain", ["ost"], "🎄", 230,
    "Helping at the region's oldest Christmas market|Ayudando en el mercado navideño más antiguo de la región|Aider au plus ancien marché de Noël de la région|地方最古のクリスマス市を手伝う",
    "The oldest documented Christmas market in the country needed extra hands wrapping stollen loaves for the queue that forms before the stall even opens, and a fast wrapper kept pace with customers who had lined up specifically for this one stand. The market has run every December since 1434, so nobody working it treats a single busy evening as anything unusual.|El mercado navideño documentado más antiguo del país necesitaba manos extra envolviendo panes de stollen para la cola que se forma antes incluso de abrir el puesto, y un envoltorio rápido seguía el ritmo de clientes que habían hecho cola específicamente por ese puesto. El mercado funciona cada diciembre desde 1434.|Le plus ancien marché de Noël documenté du pays avait besoin de bras supplémentaires pour emballer des stollen pour la file qui se forme avant même l'ouverture de l'étal, et un emballeur rapide suivait le rythme de clients ayant fait la queue spécifiquement pour ce stand. Le marché se tient chaque décembre depuis 1434.|記録に残る国内最古のクリスマス市では、屋台が開く前から並ぶ行列のためにシュトレンを包む手が足りなかった。手早く包める人は、この屋台のためだけに並んだ客のペースについていけた。この市は1434年から毎年12月に開かれており、そこで働く者は混み合う一晩ぐらい特別なこととは思わない。",
    [8],
  ),
];
