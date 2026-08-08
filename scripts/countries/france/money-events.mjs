/**
 * フランスの青マス・赤マスで起きる出来事。
 *
 * 地方コード: idf=イル・ド・フランス / nor=北部ノルマンディ / oue=西部ブルターニュ /
 *             est=東部アルプス / sud=南西部ピレネー / med=地中海コルシカ
 *
 * 地方も月も指定しない出来事(市の日・食事券・宿泊税・高速料金)が
 * 増減それぞれ2件あるので、どの地方・どの月でも必ず1件は引ける。
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

export const FRANCE_MONEY_EVENTS = [
  // ---- 全国どこでも・通年 ----
  ev(
    "jour-de-marche", "gain", [], "🧺", 200,
    "Market day|Día de mercado|Jour de marché|市の立つ日",
    "A stallholder needs a hand setting up at six and packing away at one, and pays in coins and leftovers. Nearly every French commune has its own fixed market day, some of them granted by charter in the Middle Ages and never moved since.|Un puestero necesita una mano para montar a las seis y recoger a la una, y paga en monedas y sobras. Casi cada municipio francés tiene su día de mercado fijo, algunos concedidos por fuero en la Edad Media y nunca cambiados.|Un marchand cherche un coup de main pour monter à six heures et remballer à treize, payé en pièces et en invendus. Presque chaque commune a son jour de marché, parfois octroyé par charte au Moyen Âge et jamais déplacé depuis.|六時の設営と一時の撤収を手伝い、小銭と売れ残りをもらった。フランスではほとんどの市町村に決まった市の日があり、中世に特許状で与えられたまま一度も動いていないものもある。",
  ),
  ev(
    "titre-restaurant", "gain", [], "🎟️", 160,
    "A book of meal vouchers|Un talonario de vales de comida|Un carnet de titres-restaurant|食事券の綴り",
    "Someone hands over a stack of unused vouchers rather than let them expire. French employers pay at least half the value of each one, and millions are spent every working lunchtime.|Alguien reparte sus vales sin usar antes de que caduquen. Los empleadores franceses pagan al menos la mitad de cada uno, y se gastan millones cada mediodía laborable.|Quelqu'un cède ses titres non utilisés plutôt que de les laisser périmer. L'employeur en paie au moins la moitié, et des millions sont dépensés chaque midi ouvré.|期限切れにするくらいならと、使い残しの食事券を譲ってもらった。フランスでは雇い主が券の半額以上を負担し、平日の昼ごとに何百万枚も使われている。",
  ),
  ev(
    "taxe-de-sejour", "loss", [], "🏨", 180,
    "The bill is more than the room|La cuenta supera al cuarto|La note dépasse la chambre|部屋代より多い請求",
    "An unexpected line is added per person per night at checkout. Every commune may levy its own visitor tax, and it goes straight to the tourist office that put up the signposts along the way.|Al pagar aparece una línea inesperada, por persona y noche. Cada municipio puede cobrar su tasa turística, y va directa a la oficina que puso los carteles del recorrido.|Au moment de payer, une ligne inattendue s'ajoute, par personne et par nuit. Chaque commune peut lever sa taxe de séjour, versée à l'office de tourisme qui a posé les panneaux du parcours.|精算のとき、一人一泊あたりの見覚えのない項目が足されていた。宿泊税は各市町村が独自に課すもので、あなたが辿ってきた案内板を立てた観光局に入る。",
  ),
  ev(
    "peage-autoroute", "loss", [], "🛣️", 240,
    "Barrier after barrier|Barrera tras barrera|Barrière après barrière|遮断機の連続",
    "Every fifty kilometres another ticket, another queue, another amount. Most French motorways are concessions built and run by companies that charge for them, so a long drive is billed by the section.|Cada cincuenta kilómetros otro tique, otra cola, otro importe. Casi toda la autopista francesa es concesión de empresas que la cobran, así que un viaje largo se factura por tramos.|Tous les cinquante kilomètres, un autre ticket, une autre file, un autre montant. La plupart des autoroutes françaises sont concédées à des sociétés qui les font payer : un long trajet se facture par section.|五十キロごとに券を取り、列に並び、金額が変わる。フランスの高速道路の多くは会社が建設・運営する有料の路線で、長く走れば区間ごとに請求される。",
  ),

  // ---- イル・ド・フランス ----
  ev(
    "tournage-a-paris", "gain", ["idf"], "🎬", 300,
    "The street is hired for a film|Alquilan la calle para rodar|La rue est louée pour un tournage|通りが撮影に貸し出された",
    "A crew needs the shutters closed and the pavement clear, and pays everyone on the block for the morning. Paris permits around a thousand shoots a year and the street must be left exactly as it was found.|Un equipo necesita los postigos cerrados y la acera libre, y paga a toda la manzana por la mañana. París autoriza cerca de mil rodajes al año y la calle debe quedar tal como estaba.|Une équipe veut les volets fermés et le trottoir libre, et paie tout le pâté de maisons pour la matinée. Paris autorise près de mille tournages par an, à charge de tout remettre en état.|撮影隊が雨戸を閉め、歩道を空けてほしいというので、その区画の全員に午前ぶんの謝礼が出た。パリは年におよそ千件の撮影を許可し、終われば元通りに戻すのが条件である。",
  ),
  ev(
    "crue-de-la-seine", "loss", ["idf"], "🌊", 260,
    "The Seine comes up|El Sena sube|La Seine monte|セーヌが増水する",
    "The riverside roads shut, the boats stop, and the only route left is a long way round. Parisians judge the flood by the stone soldier on the Pont de l'Alma: water at his feet closes the quays, water at his waist stops the traffic on the river.|Se cierran las vías de la ribera, paran los barcos y solo queda un gran rodeo. Los parisinos miden la crecida por el soldado de piedra del Pont de l'Alma: el agua a sus pies cierra los muelles; a la cintura, detiene la navegación.|Les voies sur berge ferment, les bateaux s'arrêtent et il ne reste qu'un long détour. Les Parisiens jugent la crue au soldat de pierre du pont de l'Alma : l'eau à ses pieds ferme les quais, à la taille elle arrête la navigation.|河岸の道は封鎖され、船は止まり、大きく迂回する費用がかかった。パリの人はアルマ橋の石の兵士で水位を測る。足に水が来れば河岸は閉鎖、腰まで来れば川の航行が止まる。",
    [8, 9, 10, 11],
  ),

  // ---- 北部・ノルマンディ ----
  ev(
    "cidre-au-pressoir", "gain", ["nor"], "🍎", 240,
    "A day at the cider press|Un día en el lagar de sidra|Une journée au pressoir|搾り場で一日働く",
    "Shaking the trees, raking up the windfalls, loading the press — a day's work that ends in cash and two bottles. Norman cider apples are grown among grazing cattle and are far too bitter to eat raw.|Sacudir los árboles, recoger la fruta caída, cargar el lagar: una jornada que acaba en dinero y dos botellas. Las manzanas de sidra normandas crecen entre vacas y son demasiado amargas para comerlas crudas.|Secouer les arbres, ramasser les pommes tombées, charger le pressoir : une journée qui finit en argent et deux bouteilles. Les pommes à cidre normandes poussent au milieu des vaches et sont bien trop âpres pour être croquées.|木を揺すり、落ちた実を掻き集め、搾り機に積み込んで、現金と瓶を二本もらって帰る。ノルマンディのシードル用林檎は牛の放牧地に植えられ、そのまま齧るには渋すぎる。",
    [6, 7],
  ),
  ev(
    "coup-de-vent-manche", "loss", ["nor"], "🌬️", 250,
    "A gale in the Channel|Temporal en el Canal|Un coup de vent sur la Manche|ドーバー海峡の突風",
    "The crossing is cancelled at four in the afternoon and every room in the port town doubles in price. Some four hundred ships a day pass through the strait, watched from both coasts, and none of them turn back for weather like this.|Cancelan la travesía a las cuatro de la tarde y en el puerto todas las habitaciones doblan de precio. Unos cuatrocientos barcos al día cruzan el estrecho, vigilados desde ambas costas, y ninguno vuelve atrás por un temporal así.|La traversée est annulée à seize heures et toutes les chambres du port doublent de prix. Quelque quatre cents navires par jour passent le détroit, surveillés des deux côtes, et aucun ne fait demi-tour pour si peu.|午後四時に船は欠航となり、港町の部屋代はどこも倍になった。海峡は一日およそ四百隻が通る航路で、両岸から見張られている。この程度の時化で引き返す船はない。",
    [7, 8, 9, 10],
  ),

  // ---- 西部・ブルターニュ ----
  ev(
    "peche-a-pied", "gain", ["oue"], "🦪", 220,
    "Out on the sand at low water|En la arena con la marea baja|À pied sur l'estran|干潟に出る",
    "The sea goes a long way out, the whole village goes after it with rakes and buckets, and part of the catch sells the same evening. French tides are graded by a coefficient from 20 to 120, printed in the local paper; above 100 nobody stays indoors.|El mar se retira mucho, el pueblo entero sale tras él con rastrillos y cubos, y parte de la captura se vende esa misma tarde. Las mareas francesas se miden con un coeficiente de 20 a 120, publicado en el diario local; por encima de 100 nadie se queda en casa.|La mer se retire loin, tout le village la suit avec râteaux et seaux, et une partie de la pêche se vend le soir même. Les marées françaises se notent d'un coefficient de 20 à 120, imprimé dans le journal ; au-dessus de 100, personne ne reste chez soi.|海はずっと遠くまで退き、村じゅうが熊手とバケツを持って追いかける。獲れたものの一部はその晩のうちに売れた。フランスの潮は20から120までの「係数」で表され、地元紙に載る。100を超える日に家にいる者はいない。",
    [11, 0, 5],
  ),
  ev(
    "crachin", "loss", ["oue"], "🌧️", 170,
    "The drizzle that never stops|La llovizna que no cesa|Le crachin qui ne cesse pas|やまない霧雨",
    "It is not really raining, and yet two hours of it soak a coat through and force the purchase of an oilskin. Brest counts rain on about a hundred and sixty days a year, and since the wind comes with it, nobody there owns an umbrella.|No llueve de verdad, y aun así dos horas bastan para calar un abrigo y obligar a comprar un chubasquero. En Brest hay lluvia unos ciento sesenta días al año y, como viene con viento, allí nadie tiene paraguas.|Il ne pleut pas vraiment, et pourtant deux heures suffisent à tremper un manteau et à faire acheter un ciré. Brest compte environ cent soixante jours de pluie par an et, le vent venant avec, personne n'y possède de parapluie.|降っているとも言えないのに、二時間で全身濡れて、油引きの合羽を買う羽目になった。ブレストの雨の日は年に百六十日ほど。風も一緒に来るので、この街に傘を持つ人はいない。",
    [7, 8, 9, 10],
  ),

  // ---- 東部・アルプス ----
  ev(
    "desalpe", "gain", ["est"], "🐄", 260,
    "Bringing the herd down|Bajando el ganado|La descente des alpages|牛を里へ下ろす",
    "The cows come down from the summer pasture wearing flowers and their biggest bells, and the village pays for every pair of hands on the road. It takes some four hundred litres of milk to make one wheel of mountain cheese, which is why the herds go up at all.|Las vacas bajan del pasto de verano con flores y sus cencerros mayores, y el pueblo paga por cada par de manos en el camino. Hacen falta unos cuatrocientos litros de leche para una rueda de queso de montaña: por eso suben.|Les vaches descendent de l'alpage fleuries et sonnaillées, et le village paie chaque paire de bras sur la route. Il faut quelque quatre cents litres de lait pour une meule de fromage de montagne : voilà pourquoi les troupeaux montent.|牛は花と大きな鈴を付けて夏の放牧地から下りてくる。村は道に出た人手の分だけ払ってくれる。山のチーズは一つ作るのに四百リットルほどの乳が要る。群れが高みへ上がるのはそのためだ。",
    [5, 6],
  ),
  ev(
    "col-ferme", "loss", ["est"], "❄️", 240,
    "The pass is shut|El puerto está cerrado|Le col est fermé|峠が閉まっている",
    "Snow closes the road overnight and the long way round costs a day and a full tank. The Col de l'Iseran, the highest paved pass in the Alps at 2,764 m, is open only about four months a year.|La nieve cierra la carretera de noche y el rodeo cuesta un día y un depósito lleno. El Col de l'Iseran, el paso asfaltado más alto de los Alpes con 2.764 m, solo abre unos cuatro meses al año.|La neige ferme la route dans la nuit et le détour coûte une journée et un plein. Le col de l'Iseran, plus haut col routier des Alpes à 2 764 m, n'est ouvert que quatre mois par an environ.|夜のうちに雪で道が閉ざされ、迂回に一日と満タン一回ぶんかかった。標高2764mでアルプス最高所の舗装峠イズラン峠は、年に四か月ほどしか開かない。",
    [7, 8, 9, 10, 11],
  ),

  // ---- 南西部・ピレネー ----
  ev(
    "truffe-lalbenque", "gain", ["sud"], "🍄", 320,
    "The truffle market opens|Se abre el mercado de la trufa|Le marché aux truffes s'ouvre|トリュフ市が開く",
    "A farmer whose dog is better than his neighbour's shares out what it finds. At Lalbenque the sellers stand behind their baskets and nobody may touch anything until a whistle at half past two; twenty minutes later it is over and everyone has been paid in cash.|Un labrador cuyo perro es mejor que el del vecino reparte lo que encuentra. En Lalbenque los vendedores esperan tras sus cestas y nadie toca nada hasta un silbato a las dos y media; veinte minutos después se acabó y todo se ha pagado en efectivo.|Un paysan dont le chien vaut mieux que celui du voisin partage la trouvaille. À Lalbenque, les vendeurs se tiennent derrière leurs paniers et nul ne touche à rien avant le coup de sifflet de quatorze heures trente ; vingt minutes plus tard, tout est vendu et payé comptant.|隣より鼻の利く犬を連れた農家について行き、見つかったぶんの分け前をもらった。ラルベンクの市では売り手が籠の後ろに立ち、十四時三十分の笛が鳴るまで誰も手を触れられない。二十分後には終わり、支払いはすべて現金である。",
    [8, 9, 10],
  ),
  ev(
    "orage-de-grele", "loss", ["sud"], "🧊", 240,
    "Ten minutes of hail|Diez minutos de granizo|Dix minutes de grêle|十分間の雹",
    "A summer storm strips the vines to the wood and takes a crop that had already been paid for in advance. Wine country answers with lines of ground generators that burn silver iodide into the rising cloud, and in some villages the church bells were once rung for the same purpose.|Una tormenta de verano deja las cepas en madera y se lleva la cosecha ya cobrada. La zona responde con generadores que queman yoduro de plata bajo la nube, y en algunos pueblos antes se tocaban las campanas con el mismo fin.|Un orage d'été met les vignes à nu et emporte une récolte déjà payée d'avance. Le vignoble répond par des générateurs au sol qui brûlent de l'iodure d'argent sous le nuage ; dans certains villages, on sonnait autrefois les cloches pour la même raison.|夏の雷雨がぶどうの葉を落とし、前金をもらってあった収穫を持っていった。産地は地上の発生器からヨウ化銀を雲へ焚き上げて対抗する。かつては同じ目的で教会の鐘を鳴らした村もある。",
    [1, 2, 3],
  ),

  // ---- 地中海・コルシカ ----
  ev(
    "lavande-distillation", "gain", ["med"], "💜", 280,
    "Cutting lavender for the still|Cortando lavanda para el alambique|La coupe de la lavande|蒸留のためにラヴェンダーを刈る",
    "Cutting, loading, then down to the distillery with the trailer steaming behind. It takes well over a hundred kilos of true lavender flowers to draw off a single litre of oil, which is why most of the plateau is planted with a hardier hybrid instead.|Cortar, cargar y bajar a la destilería con el remolque humeando detrás. Hacen falta bastante más de cien kilos de flor de lavanda para sacar un litro de aceite: por eso casi toda la meseta está plantada con un híbrido más resistente.|Couper, charger, puis descendre à la distillerie, la remorque fumante derrière. Il faut bien plus de cent kilos de fleurs de lavande vraie pour tirer un litre d'huile : c'est pourquoi le plateau est surtout planté d'un hybride plus rustique.|刈って、積んで、湯気の立つ荷車を引いて蒸留所へ下る。真正ラヴェンダーは油を一リットル採るのに百キロをはるかに超える花が要る。高原の大半がより丈夫な交配種で埋まっているのはそのためだ。",
    [3, 4],
  ),
  ev(
    "chasse-croise", "loss", ["med"], "🚗", 260,
    "Caught in the great crossing|Atrapado en el cruce del verano|Pris dans le chassé-croisé|大移動に巻き込まれる",
    "The motorway to the coast stops moving at ten in the morning, and the night goes by at a service area. The traffic service has been colouring its calendar since 1976, and the blackest day of the year is the Saturday when those going home and those setting out meet on the same road.|La autopista hacia la costa se detiene a las diez de la mañana y la noche pasa en un área de servicio. El servicio de tráfico colorea su calendario desde 1976, y el día más negro del año es el sábado en que se cruzan los que vuelven y los que salen.|L'autoroute du Sud se fige à dix heures du matin et la nuit se passe sur une aire. Le service d'information routière colorie son calendrier depuis 1976, et le jour le plus noir de l'année est le samedi où ceux qui rentrent croisent ceux qui partent.|海へ向かう高速道路は朝十時に動かなくなり、サービスエリアで一夜を明かすことになった。道路情報の当局は1976年からカレンダーを色分けしており、一年でいちばん黒い日は、帰る人と発つ人が同じ道ですれ違う土曜日である。",
    [3, 4],
  ),
];
