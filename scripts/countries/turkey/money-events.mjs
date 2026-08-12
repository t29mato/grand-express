/**
 * トルコの青マス・赤マスで起きる出来事(22件。増12・減10)。
 *
 * 地方コード: mar=マルマラ / ege=エーゲ / akd=地中海 / ica=中央アナトリア /
 * kar=黒海 / dogu=東部・南東部
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、6地方それぞれに2〜3件、季節や産業に結びつけて置いている。
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

export const TURKEY_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "firin-gece-vardiyasi", "gain", [], "🥖", 210,
    "Covering a bakery's overnight shift|Cubriendo el turno nocturno de una panadería|Assurer le service de nuit d'une boulangerie|パン屋の夜勤を代わる",
    "The regular baker's apprentice didn't show, and someone was needed to shape the dough and dip rings of simit in molasses syrup before the ovens fired at dawn. Whole streets smell of the first batch by the time the shutters go up, and nobody who helped that night walks past a bakery the same way again.|El aprendiz habitual no se presentó, y hacía falta alguien para dar forma a la masa y bañar los aros de simit en almíbar de melaza antes de que se encendieran los hornos al amanecer. Calles enteras huelen a la primera hornada cuando se levantan las persianas.|L'apprenti habituel ne s'est pas présenté, et il fallait quelqu'un pour façonner la pâte et tremper les anneaux de simit dans le sirop de mélasse avant que les fours ne s'allument à l'aube. Des rues entières sentent la première fournée au lever des rideaux.|いつもの見習いが来なかったので、夜明けに窯へ火を入れる前に生地を成形しシミットの輪を糖蜜シロップに浸す人手が要った。シャッターが開く頃には通り全体が一番窯の匂いに包まれる。その夜手伝った者は、もう同じ目でパン屋の前を通り過ぎられない。",
  ),
  ev(
    "yemek-teslimati-derbi", "gain", [], "🛵", 220,
    "Delivering food orders during a big derby|Repartiendo pedidos de comida durante un gran derbi|Livrer des commandes pendant un grand derby|大きな対抗戦の夜に出前を配る",
    "Every household on the block ordered exactly when the match kicked off, and weaving a scooter between double-parked cars while half the city shouted at the same television paid a rush bonus per delivery. Tips run generous when the home team is winning, and evaporate the moment it concedes.|Todos los hogares de la manzana pidieron justo cuando arrancó el partido, y zigzaguear en moto entre coches mal aparcados mientras medio pueblo gritaba al mismo televisor pagó un plus por hora punta en cada entrega.|Tous les foyers du quartier ont commandé pile au coup d'envoi, et slalomer en scooter entre les voitures en double file pendant que la moitié de la ville criait devant le même écran a valu une prime par livraison.|街区じゅうの家庭がちょうどキックオフの瞬間に注文を入れ、二重駐車の車のあいだをスクーターで縫いながら、街の半分が同じテレビに向かって叫ぶ中を配達すると一件ごとに繁忙手当がついた。ホームチームが勝っているあいだはチップも気前がいいが、失点した瞬間にぴたりと止まる。",
  ),
  ev(
    "tavla-kaybi", "loss", [], "🎲", 190,
    "Losing badly at tavla in the teahouse|Perdiendo feo al tavla en la casa de té|Une lourde défaite au tavla dans la maison de thé|茶屋でタヴラ(バックギャモン)に負ける",
    "The dice kept landing exactly wrong all evening, and by the last game the stakes had crept up well past what seemed reasonable when play began over the first glass of tea. Tavla gets played everywhere from teahouses to ferry decks, and the double-six slam a regular pulls off with a grin is the kind of luck that keeps people coming back to lose again.|Los dados no dejaron de caer mal toda la noche, y para la última partida la apuesta había subido mucho más de lo razonable al empezar sobre el primer vaso de té. Al tavla se juega en todas partes, de las casas de té a las cubiertas de los ferris.|Les dés sont tombés de travers toute la soirée, et à la dernière partie, la mise avait grimpé bien au-delà du raisonnable par rapport au premier verre de thé. On joue au tavla partout, des maisons de thé aux ponts de ferry.|一晩じゅうサイコロがことごとく裏目に出て、最後の一局には最初の一杯のお茶を飲みながら始めたときには妥当に思えた賭け金がずいぶん膨らんでいた。タヴラは茶屋からフェリーの甲板まで至る所で打たれ、常連がにやりと決めるゾロ目の連勝は、また負けに戻ってきたくなる類いの運である。",
  ),
  ev(
    "yanlis-park-cezasi", "loss", [], "🅿️", 150,
    "A parking fine in an unfamiliar town|Una multa de aparcamiento en un pueblo desconocido|Une amende de stationnement dans une ville inconnue|知らない町での駐車違反",
    "The kerb marking was easy to miss without knowing the street, and the fine arrived by text message before the visit was even over. Enforcement is mostly done by camera now, so there is no attendant left to argue with, only an app that accepts payment and offers no sympathy.|La marca del bordillo era fácil de pasar por alto sin conocer la calle, y la multa llegó por mensaje de texto antes de que terminara la visita. Ahora el control se hace sobre todo por cámara, así que ya no hay con quién discutir.|Le marquage du trottoir était facile à manquer sans connaître la rue, et l'amende est arrivée par texto avant même la fin de la visite. Le contrôle se fait surtout par caméra désormais, il n'y a plus personne avec qui discuter.|その通りに不案内だと見落としやすい縁石の印で、訪問が終わらないうちに罰金の通知がメッセージで届いた。取り締まりはいまや大半がカメラによるもので、文句を言う相手の係員さえおらず、支払いを受け付けるだけのアプリが残るのみである。",
  ),

  // ---- mar マルマラ ----
  ev(
    "istanbul-lale-festivali", "gain", ["mar"], "🌷", 240,
    "Working the gate at the tulip festival|Trabajando en la entrada del festival del tulipán|Travailler à l'entrée du festival de la tulipe|チューリップ祭りの受付を手伝う",
    "The park needed extra hands directing crowds around beds replanted overnight, and the pay came with a spare festival badge good for a free visit later in the month. Millions of bulbs bloom at once, and by evening the smell of turned soil clings to the uniform along with a little mud.|El parque necesitaba manos extra para dirigir a la multitud entre parterres replantados de la noche a la mañana, y el pago incluyó una insignia extra del festival válida para una visita gratis más adelante en el mes.|Le parc avait besoin de bras pour orienter la foule autour des massifs replantés du jour au lendemain, et la paie incluait un badge du festival valable pour une visite gratuite plus tard dans le mois.|公園は一夜で植え替えられた花壇の周りに客を誘導する人手を求めており、給金には月内にまた無料で入れる余分の祭りバッジが付いてきた。何百万球もの花が一斉に咲き、夕方には制服に掘り返した土の匂いと少しの泥がまとわりつく。",
    [0],
  ),
  ev(
    "bogaz-vapuru-kacirmak", "loss", ["mar"], "⛴️", 200,
    "Missing the last ferry across the Bosphorus|Perdiendo el último ferri que cruza el Bósforo|Rater le dernier ferry qui traverse le Bosphore|ボスポラス最終便のフェリーに乗り遅れる",
    "The queue at the pier looked short enough right up until the gate closed a full minute early, and the only way across before morning turned out to be a taxi around the bridge traffic at a price with no relation to the ferry fare. Gulls picked at a dropped simit on the empty pier as if to make the point.|La cola en el muelle parecía corta hasta que la puerta cerró un minuto entero antes, y la única forma de cruzar antes del amanecer resultó ser un taxi rodeando el tráfico del puente a un precio sin relación con la tarifa del ferri.|La file au débarcadère semblait courte jusqu'à ce que le portillon ferme une bonne minute en avance, et la seule façon de traverser avant le matin fut un taxi contournant le trafic du pont, à un prix sans rapport avec le tarif du ferry.|桟橋の列は短く見えたが、乗り場はまるまる一分早く閉じてしまい、朝までに渡る手段はフェリー代とは無縁の値段で橋の渋滞を迂回するタクシーしか残らなかった。がらんとした桟橋では、まるでその締めくくりのように、かもめが落ちたシミットをついばんでいた。",
  ),
  ev(
    "trakya-uzum-hasadi", "gain", ["mar"], "🍇", 220,
    "Picking grapes for the Thrace harvest|Recogiendo uvas para la vendimia de Tracia|Cueillir des raisins pour les vendanges de Thrace|トラキアのブドウ収穫を手伝う",
    "The vineyard needed extra hands before the first autumn rain threatened the ripest rows, and the pay came with a crate of seconds too bruised to sell but perfectly fine to eat on the walk home. Hands turn purple by lunch and stay that way for days.|El viñedo necesitaba manos extra antes de que la primera lluvia de otoño amenazara las hileras más maduras, y el pago incluyó una caja de segunda que estaba magullada para vender pero perfecta para comer de camino a casa.|Le vignoble avait besoin de bras avant que la première pluie d'automne ne menace les rangs les plus mûrs, et la paie incluait une caisse de seconde qualité, trop meurtrie pour la vente mais parfaite à manger sur le chemin du retour.|秋いちばんの雨がいちばん熟れた畝を脅かす前にと、葡萄畑は人手を求めていた。給金には売り物にはならないが帰り道に食べるには十分な、傷んだ二級品の箱が付いてきた。手は昼までに紫に染まり、何日もそのままになる。",
    [5],
  ),

  // ---- ege エーゲ ----
  ev(
    "efes-tur-rehberligi", "gain", ["ege"], "🏛️", 230,
    "Guiding a tour group through Ephesus|Guiando a un grupo turístico por Éfeso|Guider un groupe de touristes à Éphèse|エフェソス遺跡のガイドを務める",
    "The licensed guide had a sudden family matter and asked a familiar face from the ticket office to walk the group through the marble streets instead, filling in from memory rather than a script. The tip jar filled up fast once someone in the group started asking genuinely good questions.|El guía titulado tuvo un imprevisto familiar y le pidió a una cara conocida de la taquilla que llevara al grupo por las calles de mármol, improvisando de memoria en vez de con un guion.|Le guide titulaire a eu un imprévu familial et a demandé à un visage familier du guichet de faire visiter les rues de marbre au groupe, en improvisant de mémoire plutôt qu'à partir d'un script.|正規のガイドが急な家族の用事で来られなくなり、切符売り場の顔なじみが代わりに大理石の通りを案内することになった。台本ではなく記憶を頼りに話すはめになった。団体客の一人が本当に鋭い質問をし始めると、チップ入れはあっという間にいっぱいになった。",
  ),
  ev(
    "bodrum-carsi-alisverisi", "loss", ["ege"], "🏺", 210,
    "Talked into too much pottery in the Bodrum bazaar|Convencido de comprar demasiada cerámica en el bazar de Bodrum|Convaincu d'acheter trop de céramique au bazar de Bodrum|ボドルムの市場で陶器を買いすぎてしまう",
    "The shopkeeper poured tea before showing a single item, and by the third glass a modest souvenir budget had somehow become a box of hand-painted plates that will need very careful packing. Bargaining down the price felt like a win right up until the total was added up in the taxi.|El tendero sirvió té antes de mostrar un solo artículo, y para el tercer vaso, un modesto presupuesto de recuerdos se había convertido en una caja de platos pintados a mano que necesitarán un embalaje muy cuidadoso.|Le commerçant a servi du thé avant de montrer le moindre article, et au troisième verre, un modeste budget souvenirs s'était mué en une caisse d'assiettes peintes à la main qui demanderont un emballage très soigné.|店主は一つも品物を見せる前にまず茶を注いだ。三杯目を飲む頃には、控えめなはずのお土産予算はいつの間にか手描きの皿一箱に化けていた。梱包にはよほど気を遣うことになりそうである。値切れたと思ったのも、タクシーの中で合計を足し算するまでのことだった。",
  ),
  ev(
    "cesme-ruzgar-sörfü-okulu", "gain", ["ege"], "🏄", 200,
    "Helping out at the windsurfing school|Ayudando en la escuela de windsurf|Aider à l'école de windsurf|ウィンドサーフスクールを手伝う",
    "The school needed an extra pair of hands hauling boards down to the water before the reliable afternoon wind picked up, and watching beginners fall off the same board over and over never stopped being funny. Sunburn on the back of the neck was the only real cost of the day.|La escuela necesitaba manos extra para llevar las tablas hasta el agua antes de que arreciara el viento fiable de la tarde, y ver a los principiantes caerse una y otra vez de la misma tabla nunca dejó de tener gracia.|L'école avait besoin de bras pour porter les planches jusqu'à l'eau avant que le vent fiable de l'après-midi ne se lève, et voir les débutants tomber sans cesse de la même planche n'a jamais cessé d'être drôle.|信頼できる午後の風が吹き始める前に、ボードを水際まで運ぶ手が要った。初心者が同じボードから何度も落ちる様子は、見ていて飽きることがなかった。首の後ろの日焼けだけが、この日の唯一の代償だった。",
    [2, 3],
  ),

  // ---- akd 地中海 ----
  ev(
    "akdeniz-mandalina-toplama", "gain", ["akd"], "🍊", 240,
    "A day picking mandarins on the coast|Un día recogiendo mandarinas en la costa|Une journée à cueillir des mandarines sur la côte|海岸でみかんを摘む一日",
    "The grove needed pickers before the sweetest fruit of the season went soft on the branch, and a quick pair of hands could fill several crates before the truck arrived at midday. Peeling one on a break left orange oil on the fingers for the rest of the afternoon.|El huerto necesitaba recolectores antes de que la fruta más dulce de la temporada se ablandara en la rama, y unas manos rápidas podían llenar varios cajones antes de que llegara el camión a mediodía.|Le verger avait besoin de cueilleurs avant que le fruit le plus sucré de la saison ne se ramollisse sur la branche, et des mains rapides pouvaient remplir plusieurs caisses avant l'arrivée du camion à midi.|畑は季節でいちばん甘い実が枝の上でやわらかくなる前に摘み手を求めていた。手の速い者なら、正午にトラックが来るまでに何箱も満たせた。休憩に一つ剥くと、午後じゅう指にオレンジの香油が残った。",
    [8],
  ),
  ev(
    "sezlong-fahis-fiyat", "loss", ["akd"], "🏖️", 190,
    "Overpaying for a beach lounger at peak season|Pagando de más por una tumbona en temporada alta|Payer trop cher un transat en pleine saison|最盛期のビーチベッドに払いすぎる",
    "Every umbrella within sight of the water was already spoken for, and the one still free came with a price that made no sense until the attendant pointed out it also happened to be the best-shaded spot on the whole beach. Paying it still felt like losing a small negotiation.|Todas las sombrillas a la vista del agua ya estaban ocupadas, y la única libre venía con un precio que no tenía sentido hasta que el encargado señaló que también era el rincón más sombreado de toda la playa.|Tous les parasols en vue de l'eau étaient déjà pris, et le seul encore libre affichait un prix qui n'avait aucun sens jusqu'à ce que le préposé fasse remarquer que c'était aussi le coin le plus ombragé de toute la plage.|波打ち際の見えるパラソルはすでに全部埋まっており、唯一空いていた一つには、係員が「浜でいちばん日陰が濃い場所でもある」と言うまで理屈の分からない値段がついていた。払ってもなお、小さな交渉に負けたような気分は拭えなかった。",
    [3],
  ),
  ev(
    "oludeniz-tandem-cekim", "gain", ["akd"], "🪂", 230,
    "Filming tandem paragliders for tips|Filmando parapentes en tándem por propinas|Filmer des parapentistes en tandem pour les pourboires|タンデムパラグライダーの撮影で謝礼をもらう",
    "A paragliding outfit needed someone on the beach with a steady phone camera to catch each tandem pair landing, footage the pilots then sold to their passengers on the spot. Watching the same joyful scream land forty times in a row never quite got old.|Una empresa de parapente necesitaba a alguien en la playa con una cámara de móvil firme para captar el aterrizaje de cada pareja en tándem, imágenes que los pilotos luego vendían a sus pasajeros al momento.|Une compagnie de parapente avait besoin de quelqu'un sur la plage avec une caméra de téléphone stable pour filmer l'atterrissage de chaque tandem, images que les pilotes revendaient ensuite sur place à leurs passagers.|パラグライダー業者は、ビーチで着地の瞬間をぶれずに撮る係を求めていた。パイロットはその映像をその場で客に売る。同じ歓喜の叫びが四十回続けて着地するのを見ても、まったく飽きが来なかった。",
  ),

  // ---- ica 中央アナトリア ----
  ev(
    "balon-inis-takibi", "gain", ["ica"], "🎈", 250,
    "Chasing a landed balloon for the ground crew|Persiguiendo un globo aterrizado para el equipo de tierra|Suivre au sol une montgolfière atterrie|地上班として着地した気球を追いかける",
    "The wind carried the basket further than the flight plan expected, and following it by truck across dirt tracks between fairy chimneys paid a flat bonus for getting there before the passengers had even finished their landing toast. Champagne corks pop the moment the basket touches down, tradition or not.|El viento llevó la cesta más lejos de lo previsto en el plan de vuelo, y seguirla en camioneta por caminos de tierra entre chimeneas de hadas pagó un plus fijo por llegar antes de que los pasajeros terminaran su brindis de aterrizaje.|Le vent a porté la nacelle plus loin que prévu au plan de vol, et la suivre en camion sur des pistes de terre entre les cheminées de fées a valu une prime fixe pour arriver avant même que les passagers n'aient fini leur toast d'atterrissage.|風はバスケットを飛行計画より遠くまで運び、妖精の煙突のあいだの土道をトラックで追いかけると、乗客が着陸の乾杯を終える前に追いつけたことで定額の手当がついた。伝統かどうかはさておき、バスケットが地面に着いた瞬間にシャンパンの栓が抜かれる。",
  ),
  ev(
    "konya-hali-pazarligi", "loss", ["ica"], "🧶", 210,
    "Charmed into an expensive carpet in a Konya bazaar|Encantado hasta comprar una alfombra cara en un bazar de Konya|Charmé jusqu'à acheter un tapis cher dans un bazar de Konya|コンヤの市場で高い絨毯を買わされる",
    "The dealer unrolled carpet after carpet across the floor with a showman's patience, explaining the knot count and the dye of each one until walking away without buying any of them felt almost rude. The one finally chosen really was beautiful, which made the price sting a little less.|El comerciante desenrolló alfombra tras alfombra por el suelo con la paciencia de un showman, explicando el número de nudos y el tinte de cada una hasta que marcharse sin comprar ninguna casi parecía de mala educación.|Le marchand a déroulé tapis après tapis sur le sol avec la patience d'un bonimenteur, expliquant le nombre de nœuds et la teinture de chacun, si bien que partir sans en acheter aucun semblait presque impoli.|商人はショーマンさながらの辛抱強さで絨毯を次々と床に広げ、結び目の数と染料をひとつひとつ説明した。何も買わずに立ち去るのがほとんど失礼に思えるほどだった。最後に選んだ一枚は確かに美しく、値段の痛みも少しは和らいだ。",
  ),
  ev(
    "kiraz-kamyon-satisi", "gain", ["ica"], "🍒", 200,
    "Selling cherries from the back of a truck|Vendiendo cerezas desde la caja de un camión|Vendre des cerises à l'arrière d'un camion|トラックの荷台でさくらんぼを売る",
    "An orchard owner with more fruit than the wholesalers would take that week paid by the hour to stand roadside weighing bags for passing drivers, most of whom stopped as much for the smell as the price. What didn't sell by evening went home in a bucket as payment in kind.|Un dueño de huerto con más fruta de la que los mayoristas aceptarían esa semana pagaba por hora estar al borde de la carretera pesando bolsas para los conductores que pasaban, la mayoría de los cuales paraban tanto por el olor como por el precio.|Un propriétaire de verger, avec plus de fruits que les grossistes n'en prendraient cette semaine-là, payait à l'heure pour peser des sacs au bord de la route pour les automobilistes de passage, s'arrêtant autant pour l'odeur que pour le prix.|その週、卸業者が引き取りきれないほど実った果樹園の主が、時給を払って道端で通りすがりの車に袋詰めを量り売りさせた。多くの運転手は値段よりも匂いに誘われて車を止めた。夕方までに売れ残った分は現物払いとしてバケツごと持ち帰った。",
    [2],
  ),

  // ---- kar 黒海 ----
  ev(
    "cay-ilk-hasat", "gain", ["kar"], "🍵", 250,
    "Picking the first tea flush by hand|Recogiendo a mano la primera brotación de té|Cueillir à la main la première récolte de thé|一番茶を手摘みする",
    "The terraced rows needed pickers before the earliest leaves lost their premium price, and a quick pair of hands could fill a basket strapped to the back before the fog burned off the hillside. Payment came by the kilo rather than the hour through the first flush of the season.|Las hileras en terraza necesitaban recolectores antes de que las primeras hojas perdieran su precio superior, y unas manos rápidas podían llenar un cesto atado a la espalda antes de que la niebla se disipara de la ladera.|Les rangées en terrasse avaient besoin de cueilleurs avant que les toutes premières feuilles ne perdent leur prix supérieur, et des mains rapides pouvaient remplir un panier sanglé dans le dos avant que la brume ne se dissipe sur le coteau.|段々畑は最初の葉が最高値を失う前に摘み手を求めていた。手の速い者なら、霧が丘から晴れるまでに背負い籠を満たせた。最初の一番茶のあいだは、時給ではなくキロ単位で払われた。",
    [2, 3],
  ),
  ev(
    "findik-yagmur-zarari", "loss", ["kar"], "🌰", 190,
    "A sudden rain ruins a batch of drying hazelnuts|Una lluvia repentina arruina un lote de avellanas en secado|Une pluie soudaine gâche un lot de noisettes en train de sécher|突然の雨でヘーゼルナッツの干し場が台無しになる",
    "The nuts were spread out on tarpaulins to dry when the sky opened without warning, and everyone in earshot dropped what they were doing to help drag the covers over before the batch started to mould. A share of the spoiled lot came out of the day's pay all the same.|Los frutos estaban tendidos en lonas para secar cuando el cielo se abrió sin previo aviso, y todos los que estaban al alcance del oído dejaron lo que hacían para ayudar a cubrirlos antes de que el lote empezara a enmohecerse.|Les fruits étaient étalés sur des bâches pour sécher quand le ciel s'est ouvert sans prévenir, et tous ceux à portée de voix ont lâché ce qu'ils faisaient pour aider à tirer les bâches avant que le lot ne commence à moisir.|防水シートに広げて干していたところへ、前触れもなく空が開いた。声の届く範囲にいた者は皆、カビが生える前にと手を止めて覆いを引く手伝いに回った。それでも、傷んだ分の埋め合わせはその日の稼ぎから差し引かれた。",
    [4, 5],
  ),
  ev(
    "hamsi-av-yardimi", "gain", ["kar"], "🐟", 210,
    "Helping haul in the anchovy catch|Ayudando a subir la captura de boquerones|Aider à hisser la pêche aux anchois|カタクチイワシの水揚げを手伝う",
    "The boat came in loaded heavier than the regular crew could unload before the market opened, and an extra pair of hands on the nets earned a cut of the catch as well as cash. Winter is when the shoals run thickest, and the whole harbour smells of frying fish by evening.|El barco llegó más cargado de lo que la tripulación habitual podía descargar antes de que abriera el mercado, y unas manos extra en las redes ganaron una parte de la captura además de dinero.|Le bateau est rentré plus chargé que l'équipage habituel ne pouvait décharger avant l'ouverture du marché, et des bras supplémentaires sur les filets ont valu une part de la pêche en plus de l'argent.|船は市場が開く前に通常の乗組員だけでは降ろしきれないほどの水揚げを積んで戻ってきた。網に加わった余分の手は、現金に加えて獲物の分け前も得た。冬は群れがいちばん濃くなる季節で、夕方には港じゅうが揚げ魚の匂いに包まれる。",
    [8, 9],
  ),

  // ---- dogu 東部・南東部 ----
  ev(
    "nemrut-gundogumu-rehberligi", "gain", ["dogu"], "🗿", 240,
    "Guiding photographers to Nemrut for the dawn light|Guiando a fotógrafos hasta el Nemrut para la luz del amanecer|Guider des photographes au Nemrud pour la lumière de l'aube|夜明けの光を撮る写真家をネムルト山へ案内する",
    "A group paid well to be led up the dark trail with a torch timed to reach the eastern terrace just as the first light crossed the row of stone faces, a walk that only comes easily to someone who has made the climb dozens of times before. Nobody complained about the cold once the sky started to turn.|Un grupo pagó bien por que lo guiaran por el sendero oscuro con una linterna cronometrada para llegar a la terraza este justo cuando la primera luz cruzaba la fila de rostros de piedra, una caminata que solo resulta fácil a quien la ha hecho decenas de veces.|Un groupe a bien payé pour être guidé sur le sentier obscur, lampe torche en main, chronométré pour atteindre la terrasse est juste au moment où la première lumière traversait la rangée de visages de pierre, une marche qui ne devient aisée qu'après des dizaines d'ascensions.|一団が、松明を頼りに暗い山道を、最初の光が石の顔の列を渡るちょうどその瞬間に東のテラスへ着くよう案内してもらう代わりにたっぷり払ってくれた。何十回も登った者でなければ楽にはこなせない道のりである。空が色づき始めると、寒さを口にする者はもういなかった。",
  ),
  ev(
    "van-otobus-gecikmesi", "loss", ["dogu"], "🚌", 180,
    "A long bus delay on the road to Van|Un largo retraso de autobús en la carretera a Van|Un long retard de bus sur la route de Van|ヴァンへの道でバスが長時間遅れる",
    "A stretch of mountain road was closed for repairs with no warning posted anywhere online, and the detour added hours to a trip that was already going to arrive after dark. The driver handed out tea from a thermos at the roadside stop, which helped the mood more than the schedule.|Un tramo de la carretera de montaña estaba cerrado por obras sin aviso alguno publicado en internet, y el desvío añadió horas a un viaje que ya iba a llegar de noche.|Un tronçon de route de montagne était fermé pour travaux sans le moindre avis en ligne, et le détour a ajouté des heures à un trajet qui devait déjà arriver après la tombée de la nuit.|山道の一区間が工事のため通行止めになっていたが、ネット上にはどこにも案内が出ていなかった。迂回路のせいで、ただでさえ夜になってから着く予定だった旅程にさらに何時間も加わった。運転手が道端の休憩所で保温瓶から茶を配ってくれたのは、時刻表の助けにはならなくとも気分は和らげてくれた。",
  ),
  ev(
    "antep-fistik-ayiklama", "gain", ["dogu"], "🥜", 220,
    "Helping shell pistachios for the harvest|Ayudando a pelar pistachos en la cosecha|Aider à décortiquer les pistaches de la récolte|ピスタチオの殻むきを手伝う",
    "A grower needed extra hands cracking open the season's first pistachios by the sackful before they went to the baklava kitchens across town, and the pay came with a small bag of the ones split too badly to sell whole. Green stains the fingers stayed for days no matter how hard anyone scrubbed.|Un agricultor necesitaba manos extra para abrir a puñados los primeros pistachos de la temporada antes de que fueran a las cocinas de baklava por toda la ciudad, y el pago incluyó una bolsita de los que se partieron demasiado mal para vender enteros.|Un producteur avait besoin de bras pour décortiquer par sacs les premières pistaches de la saison avant qu'elles ne partent vers les cuisines à baklava de toute la ville, et la paie incluait un petit sac de celles trop abîmées pour être vendues entières.|栽培農家は、街じゅうのバクラヴァ工房へ送る前の今季最初のピスタチオを袋いっぱいに割る人手を求めていた。給金には、割れがひどくて丸のまま売れない分の小袋がついてきた。どれだけこすっても、指の緑の染みは何日も落ちなかった。",
    [5],
  ),

  // ---- 追加の減(gain/lossの比率を整えるための3件) ----
  ev(
    "ada-tekne-deniz-tutmasi", "loss", ["ege"], "🤢", 170,
    "Seasickness on the day-boat crossing to an island|Mareo en el ferri de un día que cruza a una isla|Mal de mer sur le bateau de la journée vers une île|島への日帰り船で船酔いする",
    "The water looked flat enough from the harbour, but the swell past the headland had other ideas, and the crackers handed out by an apologetic crew member did nothing for the rest of the crossing. Solid ground on arrival felt like the best part of the whole excursion.|El agua parecía bastante lisa desde el puerto, pero el oleaje pasado el cabo tenía otros planes, y las galletas que repartió un tripulante compungido no sirvieron de nada el resto de la travesía.|L'eau semblait bien calme depuis le port, mais la houle passé le cap en décida autrement, et les biscuits distribués par un membre d'équipage confus ne firent rien pour le reste de la traversée.|港から見た海面は穏やかそうだったが、岬を過ぎたところのうねりはそうは思っていなかったらしく、すまなそうな乗組員が配ったクラッカーも残りの航海には何の役にも立たなかった。上陸して足が地に着いた瞬間が、この日いちばんの見どころになった。",
  ),
  ev(
    "dolu-firtinasi-bahce-zarari", "loss", ["ica"], "🧊", 200,
    "A sudden hailstorm hits the orchard before harvest|Una granizada repentina golpea el huerto antes de la cosecha|Une grêle soudaine frappe le verger avant la récolte|収穫前の果樹園を突然の雹が襲う",
    "The storm lasted barely ten minutes but left the ground white and the fruit pockmarked, downgrading a season's careful work to the kind of seconds sold cheap for juice rather than the table. Everyone within earshot came out to help sweep the ice off the plastic tunnels before it melted and soaked through anyway.|La tormenta duró apenas diez minutos pero dejó el suelo blanco y la fruta picada, degradando el trabajo cuidadoso de toda una temporada a fruta de segunda vendida barata para zumo.|L'orage n'a duré qu'une dizaine de minutes mais a laissé le sol blanc et les fruits grêlés, ravalant le travail soigné de toute une saison à des fruits de second choix vendus au rabais pour le jus.|嵐はわずか十分ほどで過ぎ去ったが、地面を白く染め、実には無数の傷を残し、丹精込めた一季節の仕事をジュース用に安く売るしかない二級品に格下げしてしまった。声の届く範囲にいた者は皆、どのみち溶けて染み込む前にとビニールトンネルの氷を掃き出す手伝いに出てきた。",
    [1, 2],
  ),
  ev(
    "karadeniz-heyelan-yol-kapanmasi", "loss", ["kar"], "🪨", 180,
    "A landslide after heavy rain closes the coastal road|Un desprendimiento tras lluvias fuertes cierra la carretera costera|Un glissement de terrain après de fortes pluies ferme la route côtière|大雨のあと土砂崩れで海岸道路が通行止めになる",
    "Days of steady rain loosened a slope above the highway, and the mud that came down took a lane of the road with it, backing up traffic for hours along a coast where the mountains leave little room for a detour. Road crews here have cleared this exact bend more times than anyone bothers to count.|Días de lluvia constante aflojaron una ladera sobre la autopista, y el barro que cayó se llevó un carril de la carretera, atascando el tráfico durante horas en una costa donde las montañas dejan poco margen para un desvío.|Des jours de pluie continue ont détrempé un versant au-dessus de la route, et la boue qui en est descendue a emporté une voie, bloquant la circulation des heures durant sur un littoral où les montagnes laissent peu de place à un détour.|何日も降り続いた雨で幹線道路の上の斜面が緩み、崩れた土砂が道路の車線を一本飲み込んで、迂回の余地がほとんどない山がちな海岸沿いを何時間も渋滞させた。この曲がり角を道路作業員が片づけたのは、もはや誰も数える気にならないほどの回数になる。",
    [6, 7],
  ),
];
