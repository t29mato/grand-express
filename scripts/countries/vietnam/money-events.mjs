/**
 * ベトナムの青マス・赤マスで起きる出来事(25件。増13・減12)。
 *
 * 地方コード: rrd=紅河デルタ / nmt=北部山岳 / btb=北中部沿岸 / ntb=南中部沿岸 /
 * tn=西原高原 / dnb=南東部 / mkd=メコンデルタ
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、7地方それぞれに3件ずつ、その土地の産業や祭りに結びつけて置いている。
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

export const VIETNAM_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "giaohang-shift", "gain", [], "🛵", 220,
    "A day running food delivery|Un día repartiendo comida|Une journée à livrer des repas|フードデリバリーのアルバイト",
    "The app pinged nonstop through the lunch rush, and a helmet plus a phone mount was the only gear needed to start earning by the delivery, no interview required. With a motorbike already parked outside nearly every household, turning one into a food-delivery rig for an afternoon is one of the easiest side jobs in the country.|La aplicación no dejó de sonar durante la hora punta del almuerzo, y un casco y un soporte para el móvil eran todo el equipo necesario para empezar a ganar por entrega, sin entrevista. Con una moto ya aparcada frente a casi todos los hogares, convertir una en furgoneta de reparto de comida por una tarde es uno de los trabajos extra más fáciles del país.|L'appli n'a pas cessé de sonner pendant le rush du déjeuner, et un casque plus un support de téléphone suffisaient pour commencer à gagner à la livraison, sans entretien. Avec une moto déjà garée devant presque chaque foyer, en faire un véhicule de livraison de repas pour un après-midi est l'un des petits boulots les plus simples du pays.|昼どきはアプリの通知が鳴りやまず、ヘルメットとスマホホルダーさえあれば面接なしですぐに配達1件ごとの稼ぎが始められた。ほとんどどの家の前にもすでにバイクが停まっているこの国では、午後だけフードデリバリー用に転用するのは最も手軽な副業の一つである。",
  ),
  ev(
    "phiendich-tour", "gain", [], "🗣️", 260,
    "Interpreting for a lost tour group|Traduciendo para un grupo turístico perdido|Traduire pour un groupe de touristes perdu|迷った観光グループの通訳を務める",
    "A tour guide's English gave out somewhere between the market stalls and the bus, and a few borrowed sentences steered the group back to the right corner in exchange for a folded note pressed into a hand. Foreign tour groups criss-cross the country by the busload, and a guide short on vocabulary is more common than any traveler expects.|El inglés del guía turístico falló en algún punto entre los puestos del mercado y el autobús, y unas frases prestadas devolvieron al grupo a la esquina correcta a cambio de un billete doblado en la mano. Los grupos turísticos extranjeros cruzan el país en autobuses enteros, y un guía corto de vocabulario es más común de lo que cualquier viajero esperaría.|L'anglais du guide a flanché quelque part entre les étals du marché et le bus, et quelques phrases empruntées ont ramené le groupe au bon coin de rue contre un billet plié glissé dans la main. Des groupes de touristes étrangers sillonnent le pays par bus entiers, et un guide à court de vocabulaire est plus fréquent qu'aucun voyageur ne l'imagine.|観光ガイドの英語が市場の露店とバスのあいだのどこかで力尽き、いくつか借り物の文で正しい角まで一行を導くと、手に折りたたんだ紙幣を握らされた。外国人の観光団はバス単位でこの国を巡っており、語彙の足りないガイドは旅行者が思うよりずっとよくあることである。",
  ),
  ev(
    "denbaotrangiao", "loss", [], "🚦", 180,
    "A fine for running a red light|Una multa por saltarse un semáforo|Une amende pour avoir grillé un feu rouge|信号無視の罰金",
    "The intersection looked clear enough at that hour, and a traffic camera disagreed. The fine arrived as a slip handed over on the spot, cash only, no argument accepted about how empty the road had looked a second earlier.|El cruce parecía bastante despejado a esa hora, y una cámara de tráfico no estuvo de acuerdo. La multa llegó como un papel entregado en el momento, solo en efectivo, sin aceptar ningún argumento sobre lo vacía que parecía la calle un segundo antes.|Le carrefour semblait assez dégagé à cette heure-là, et une caméra de circulation n'était pas d'accord. L'amende est arrivée sous forme de papier remis sur place, en espèces uniquement, sans discussion possible sur le vide apparent de la route l'instant d'avant.|その時間帯、交差点は十分空いているように見えたが、交通カメラの見立ては違った。罰金はその場で手渡された紙切れとして届いた。現金のみで、一秒前まで道が空いていたという言い訳は一切通らなかった。",
  ),
  ev(
    "chatchem-market", "loss", [], "🍊", 160,
    "Charged the 'obvious tourist' price|Cobrado el precio de «turista evidente»|Facturé au « tarif touriste évident »|「いかにも観光客」料金を取られる",
    "The fruit seller quoted a number, and only after handing over the cash did it become clear the local standing two stalls down had paid less than half for the same bag. It is a small, well-worn game played on visitors everywhere in the country, and once caught out, there is rarely any getting the difference back.|La vendedora de fruta dijo un precio, y solo después de entregar el dinero quedó claro que el vecino de dos puestos más allá había pagado menos de la mitad por la misma bolsa. Es un pequeño juego muy conocido que se juega a los visitantes en todo el país, y una vez descubierto, rara vez se recupera la diferencia.|La vendeuse de fruits a annoncé un prix, et ce n'est qu'après avoir tendu l'argent qu'il est apparu que le voisin, deux étals plus loin, avait payé moins de la moitié pour le même sac. C'est un petit jeu bien rodé joué aux visiteurs partout dans le pays, et une fois pris, il est rare de récupérer la différence.|果物売りが言い値を告げ、現金を渡したあとになってようやく、二軒隣に立っていた地元の客が同じ袋に半額以下しか払っていなかったと分かった。これは国じゅうで旅行者相手に演じられるありふれた駆け引きで、気づいたときにはもう差額を取り戻すすべはまずない。",
  ),

  // ---- rrd 紅河デルタ ----
  ev(
    "trangan-boatrower", "gain", ["rrd"], "🚣", 240,
    "Rowing tourists through Tràng An's caves|Remando turistas por las cuevas de Tràng An|Faire voguer des touristes dans les grottes de Tràng An|チャンアンの洞窟で観光客を漕ぐ",
    "The regular boatwoman's shoulder was giving her trouble, and taking over her oar for an afternoon of ferrying visitors through the flooded caves paid by the trip rather than the hour. Villagers here have rowed these same narrow channels for generations, long before anyone thought to call the karst valley a tourist site.|A la barquera habitual le dolía el hombro, y tomar su remo durante una tarde llevando visitantes por las cuevas inundadas pagaba por viaje y no por hora. Los aldeanos de aquí llevan generaciones remando por estos mismos canales estrechos, mucho antes de que a nadie se le ocurriera llamar zona turística al valle kárstico.|La batelière habituelle avait mal à l'épaule, et prendre sa rame pour un après-midi à faire voguer des visiteurs dans les grottes inondées se payait au trajet plutôt qu'à l'heure. Les villageois d'ici rament ces mêmes chenaux étroits depuis des générations, bien avant que quiconque ne songe à appeler cette vallée karstique un site touristique.|いつもの舟頭は肩を痛めていて、午後だけ代わりに水没した洞窟を観光客と行き来する櫂を握った。報酬は時間ではなく一往復ごとに払われた。ここの村人は何世代も前からこの同じ狭い水路を漕いできた。誰かがこの奇岩の谷を観光地と呼び始めるよりずっと前からのことである。",
  ),
  ev(
    "longbien-jam", "loss", ["rrd"], "🌉", 170,
    "Stuck on Long Biên Bridge at rush hour|Atascado en el puente Long Biên en hora punta|Coincé sur le pont Long Biên aux heures de pointe|ロンビエン橋でラッシュアワーに立ち往生",
    "The bridge's motorbike lane is barely wide enough for two machines to pass, and a stalled scooter halfway across turned a five-minute crossing into a forty-minute standstill, engine idling the whole way. A missed meeting cost more than the fuel burned waiting.|El carril para motos del puente apenas es lo bastante ancho para que pasen dos vehículos, y un escúter averiado a mitad de camino convirtió un cruce de cinco minutos en cuarenta de parón total, con el motor al ralentí todo el rato. Una reunión perdida costó más que el combustible quemado esperando.|La voie moto du pont est à peine assez large pour que deux engins se croisent, et un scooter en panne à mi-parcours a transformé une traversée de cinq minutes en quarante minutes d'immobilité totale, moteur au ralenti tout du long. Un rendez-vous manqué a coûté plus cher que l'essence brûlée à attendre.|橋のバイク車線は二台がすれ違うのがやっとの幅しかなく、渡り半ばで止まったスクーターのせいで、五分のはずの横断が四十分の立ち往生になった。その間ずっとエンジンをかけたままだった。逃した約束のほうが、待つあいだに燃やしたガソリンより高くついた。",
  ),
  ev(
    "haiduong-lychee", "gain", ["rrd"], "🍒", 210,
    "A day picking lychees in Hải Dương|Un día recogiendo lichis en Hải Dương|Une journée à cueillir des litchis à Hải Dương|ハイズオンでライチを摘む",
    "The orchard needed extra hands before the fruit turned from green to red overnight in the heat, and a full day up a ladder paid by the basket rather than the hour. Thanh Hà's lychees have a narrow window before the sweetness peaks and the skin starts to split.|El huerto necesitaba manos extra antes de que la fruta pasara de verde a roja de la noche a la mañana con el calor, y un día entero subido a una escalera se pagaba por cesta y no por hora. Los lichis de Thanh Hà tienen una ventana estrecha antes de que el dulzor alcance su punto y la piel empiece a agrietarse.|Le verger avait besoin de bras supplémentaires avant que les fruits ne passent du vert au rouge du jour au lendemain sous la chaleur, et une journée entière juchée sur une échelle se payait au panier plutôt qu'à l'heure. Les litchis de Thanh Hà n'ont qu'une fenêtre étroite avant que leur sucre n'atteigne son pic et que la peau ne commence à se fendre.|果樹園は、暑さで一晩のうちに実が緑から赤へ変わってしまう前にと人手を求めていた。一日じゅう梯子に上っての作業は、時間ではなく籠の数で払われた。タインハーのライチは、甘みが極まって皮が裂け始めるまでのごく短い間しか摘み時がない。",
    [1, 2],
  ),
  ev(
    "namdinh-fakegoods", "loss", ["rrd"], "🛍️", 170,
    "Sold a fake antique at a flea market|Vendida una antigüedad falsa en un mercadillo|Vendu une fausse antiquité au marché aux puces|蚤の市で偽物の骨董品を売りつけられる",
    "The stallholder swore the coin had come out of an old mill worker's floorboards, and only a jeweller's loupe back at the hotel showed the 'brass' patina had been painted on that morning. Every flea market has a stall or two working this exact routine, and the polish is always a little too even to be genuine wear.|El vendedor juró que la moneda había salido de las tablas del suelo de un viejo obrero de la fábrica, y solo con una lupa de joyero de vuelta en el hotel se vio que la pátina de «latón» se había pintado esa misma mañana. Todo mercadillo tiene uno o dos puestos que juegan exactamente esta rutina, y el brillo siempre es un poco demasiado uniforme para ser desgaste genuino.|Le vendeur a juré que la pièce sortait du plancher d'un vieil ouvrier de la filature, et ce n'est qu'avec une loupe de bijoutier, de retour à l'hôtel, qu'est apparue une patine « laiton » peinte le matin même. Chaque marché aux puces compte un ou deux étals jouant exactement ce numéro, et le poli est toujours un peu trop régulier pour être une usure véritable.|露天商は、この銭は昔の紡績工の家の床板から出てきたのだと言い張ったが、宿に戻ってから宝石用ルーペで見ると「真鍮」の古びた色はその朝に塗られたものだと分かった。どの蚤の市にもこの手口をやる店が一つや二つはあり、艶が本物の使い込みにしては均一すぎるのが目印である。",
  ),

  // ---- nmt 北部山岳 ----
  ev(
    "hagiang-guide", "gain", ["nmt"], "🏍️", 250,
    "Guiding a motorbike group on the Hà Giang Loop|Guiando a un grupo en moto por el bucle de Hà Giang|Guider un groupe de motards sur la boucle de Hà Giang|ハザン・ループのバイクツアーを案内する",
    "A group of backpackers had rented motorbikes but not a map worth trusting on the mountain's blind switchbacks, and riding ahead to mark the turns for a day paid well above what the same hours would earn lower down in the valley. The pass drops sharply enough on one side that nobody argues about the fee afterward.|Un grupo de mochileros había alquilado motos pero no un mapa fiable para las curvas ciegas de la montaña, y adelantarse en moto para marcar los giros durante un día pagó bastante más de lo que las mismas horas ganarían abajo en el valle. El puerto cae tan abrupto por un lado que nadie discute la tarifa después.|Un groupe de routards avait loué des motos mais pas de carte fiable pour les virages en épingle sans visibilité de la montagne, et rouler en tête pour signaler les virages pendant une journée a rapporté bien plus que les mêmes heures dans la vallée en contrebas. Le col plonge assez abruptement d'un côté pour que personne ne discute le tarif après coup.|バックパッカーの一団はバイクを借りていたが、山の見通しの利かないヘアピンカーブを頼れる地図までは持っていなかった。一日先導してカーブを示す仕事は、谷の下の同じ時間よりずっと高く払われた。峠の片側はあまりに切り立っているので、あとで料金に文句を言う者はいない。",
  ),
  ev(
    "brocade-sale", "gain", ["nmt"], "🧵", 200,
    "Selling handwoven brocade to trekkers|Vendiendo brocado tejido a mano a excursionistas|Vendre du brocart tissé main à des randonneurs|織物を旅行者に売る",
    "A Hmong family's loom had produced more indigo-dyed cloth than the local market could absorb that month, and a folding table set up along the trekking route to Sa Pa caught buyers who would never have found the village itself. Each pattern is specific enough to a clan that weavers can read a stranger's home village off the cloth.|El telar de una familia hmong había producido más tela teñida de índigo de la que el mercado local podía absorber ese mes, y una mesa plegable montada junto a la ruta de senderismo a Sa Pa atrajo a compradores que nunca habrían encontrado la propia aldea. Cada motivo es tan propio de un clan que las tejedoras pueden leer en la tela el pueblo natal de un desconocido.|Le métier à tisser d'une famille hmong avait produit plus de tissu teint à l'indigo que le marché local ne pouvait en absorber ce mois-là, et une table pliante installée le long du sentier de randonnée vers Sa Pa a attiré des acheteurs qui n'auraient jamais trouvé le village lui-même. Chaque motif est propre à un clan au point que les tisserandes peuvent lire dans le tissu le village d'origine d'un inconnu.|モン族のある家の機織り機は、その月の地元の市場が吸収できる以上の藍染め布を織り出していた。サパへのトレッキング道沿いに広げた折りたたみ台が、村自体には決してたどり着かなかったであろう買い手を捕まえた。柄はそれぞれ一族ごとに特有で、織り手は布を見ただけで見知らぬ人の出身の村が分かるという。",
  ),
  ev(
    "mountain-breakdown", "loss", ["nmt"], "🔧", 180,
    "A motorbike breakdown on a mountain pass|Una avería de moto en un puerto de montaña|Une panne de moto sur un col de montagne|山道でバイクが故障する",
    "The engine cut out on a stretch with no phone signal and not another vehicle in sight for what felt like an hour, and the only mechanic within reach charged accordingly for towing a stalled bike back down to the nearest town. Mountain roads here are beautiful and, when something goes wrong, thoroughly unforgiving.|El motor se apagó en un tramo sin cobertura y sin otro vehículo a la vista durante lo que pareció una hora, y el único mecánico al alcance cobró en consecuencia por remolcar la moto averiada hasta el pueblo más cercano. Las carreteras de montaña de aquí son hermosas y, cuando algo sale mal, del todo implacables.|Le moteur a calé sur un tronçon sans réseau et sans autre véhicule en vue pendant ce qui a semblé une heure, et le seul mécanicien à portée a facturé en conséquence le remorquage de la moto en panne jusqu'à la ville la plus proche. Les routes de montagne d'ici sont magnifiques et, quand quelque chose tourne mal, tout à fait impitoyables.|電波の届かない区間でエンジンが止まり、一時間ほども感じられるあいだ他の車両は一台も見えなかった。手の届く範囲にいた唯一の整備士は、故障したバイクを最寄りの町まで引き下ろす料金をそれ相応に取った。この一帯の山道は美しいが、何か起きたときはまったく容赦がない。",
  ),

  // ---- btb 北中部沿岸 ----
  ev(
    "phongnha-caveguide", "gain", ["btb"], "🕯️", 260,
    "Assistant caving guide for a day|Guía auxiliar de espeleología por un día|Guide de spéléologie assistant pour une journée|洞窟ガイド助手のアルバイト",
    "A licensed guide needed a second pair of hands to carry ropes and spare headlamps for a group heading into one of the smaller caves near Phong Nha, no expedition-scale trek required. The region has more limestone cave passages than anyone has ever fully mapped, and new ones are still occasionally found.|Un guía con licencia necesitaba un segundo par de manos para cargar cuerdas y linternas de repuesto para un grupo que entraba en una de las cuevas más pequeñas cerca de Phong Nha, sin necesidad de una expedición a gran escala. La región tiene más galerías de cuevas calizas de las que nadie ha llegado a cartografiar del todo, y de vez en cuando aún se encuentran nuevas.|Un guide agréé avait besoin d'une seconde paire de bras pour porter cordes et lampes frontales de rechange pour un groupe se dirigeant vers l'une des plus petites grottes près de Phong Nha, sans qu'il s'agisse d'une expédition de grande ampleur. La région compte plus de galeries calcaires que quiconque n'en a jamais entièrement cartographié, et on en découvre encore parfois de nouvelles.|正式な資格を持つガイドが、フォンニャ近くの小さめの洞窟に向かう一行のためにロープと予備のヘッドライトを運ぶ助手を求めていた。本格的な探検隊規模ではない仕事だった。この地方には誰も完全には地図化しきれていないほどの石灰岩洞窟があり、いまも時折新しいものが見つかる。",
  ),
  ev(
    "hue-costume", "gain", ["btb"], "👘", 230,
    "Modelling royal Nguyễn robes for photos|Posando con trajes reales Nguyễn para fotos|Poser en habits royaux Nguyễn pour des photos|阮朝の衣装を着てモデルを務める",
    "A photo studio near the citadel needed someone to fill an emperor's robe for a stack of costume portraits after its regular model called in sick, and the pay came with a printed set of the pictures. Renting a royal costume for an hour of photos inside the old walls has become a small cottage industry of its own.|Un estudio fotográfico cerca de la ciudadela necesitaba a alguien para llenar la túnica de emperador para una serie de retratos con vestuario, después de que su modelo habitual avisara de que estaba enfermo, y el pago vino con un juego impreso de las fotos. Alquilar un traje real para una hora de fotos dentro de las viejas murallas se ha convertido en su propia pequeña industria artesanal.|Un studio photo près de la citadelle avait besoin de quelqu'un pour endosser la robe d'empereur pour une série de portraits en costume, son modèle habituel s'étant déclaré malade, et la paie est venue avec un jeu de tirages des photos. Louer un costume royal pour une heure de photos dans les vieux remparts est devenu une petite industrie artisanale à part entière.|王宮そばの写真館は、いつものモデルが急病になったため、衣装を着けた写真一式のために誰かに皇帝の袍を着てもらう必要があった。報酬には印刷された写真一式も付いてきた。古い城壁の中で一時間だけ王家の衣装を借りて写真を撮る商売は、いまや一つの小さな産業になっている。",
  ),
  ev(
    "baotu-boarding", "loss", ["btb"], "🪛", 190,
    "Boarding up windows before a typhoon|Tapiando ventanas antes de un tifón|Barder les fenêtres avant un typhon|台風前に窓を板で塞ぐ",
    "The forecast gave less than a day's warning, and plywood and tape both doubled in price at the hardware store as half the street rushed to buy the same thing at once. Better a spent afternoon than a shattered window by morning.|El pronóstico dio menos de un día de aviso, y el contrachapado y la cinta duplicaron su precio en la ferretería mientras medio vecindario corría a comprar lo mismo a la vez. Mejor gastar una tarde que amanecer con una ventana hecha añicos.|Les prévisions n'ont laissé que moins d'une journée de préavis, et le contreplaqué comme le ruban adhésif ont doublé de prix à la quincaillerie tandis que la moitié de la rue se précipitait pour acheter la même chose en même temps. Mieux vaut une après-midi perdue qu'une fenêtre en miettes au matin.|予報が出たのは一日足らず前で、金物店ではベニヤ板とテープの値段が両方とも倍になった。通りの半分が一斉に同じものを買いに殺到したからである。朝に窓が割れているよりは、午後を費やすほうがましだった。",
    [5, 6, 7],
  ),

  // ---- ntb 南中部沿岸 ----
  ev(
    "tuyhoa-tuna", "gain", ["ntb"], "🐟", 250,
    "A morning at the tuna auction dock|Una mañana en el muelle de subasta de atún|Une matinée au quai de criée du thon|マグロ競り場での朝の仕事",
    "The boats came in before dawn with their catch already iced, and an extra pair of hands hauling and weighing fish paid well for a morning's work before the auction bell even rang. Some of the tuna sold here will be on a plane to a Tokyo market before the day is out.|Los barcos llegaron antes del alba con la captura ya en hielo, y un par de manos extra cargando y pesando pescado se pagó bien por una mañana de trabajo antes incluso de que sonara la campana de la subasta. Parte del atún que se vende aquí estará en un avión rumbo a un mercado de Tokio antes de que acabe el día.|Les bateaux sont arrivés avant l'aube avec leur prise déjà sur glace, et une paire de bras supplémentaire pour porter et peser le poisson a été bien payée pour une matinée de travail, avant même que la cloche de la criée ne sonne. Une partie du thon vendu ici sera dans un avion pour un marché de Tokyo avant la fin de la journée.|船は夜明け前に、すでに氷詰めにした水揚げを積んで入港した。競りの鐘が鳴る前の朝だけ、魚を運んで計量する手伝いはよい稼ぎになった。ここで売られるマグロの一部は、その日のうちに東京の市場行きの飛行機に積まれる。",
  ),
  ev(
    "nhatrang-gamble", "loss", ["ntb"], "🎣", 200,
    "A friendly bet on the fishing boats' catch|Una apuesta amistosa sobre la pesca de los barcos|Un pari amical sur la prise des bateaux de pêche|漁船の水揚げ量に賭けて負ける",
    "Guessing which boat would bring in the biggest haul seemed like good odds from the beach, right up until the boat everyone had bet against came in loaded to the gunwales. Nobody collects on a bet like this without a little luck.|Adivinar qué barco traería la mayor pesca parecía buena apuesta desde la playa, hasta que el barco contra el que todos habían apostado llegó cargado hasta la borda. Nadie cobra una apuesta así sin algo de suerte.|Deviner quel bateau rapporterait la plus grosse prise semblait un bon pari depuis la plage, jusqu'à ce que le bateau contre lequel tout le monde avait parié arrive chargé à ras bord. Personne ne remporte un tel pari sans un peu de chance.|浜辺から見ていると、どの船がいちばんの大漁を持ち帰るかを当てるのはよい賭けに思えた。だが誰もが負けると踏んでいた船が船縁いっぱいの水揚げで帰ってきた。この手の賭けは、多少の運がなければ勝てない。",
  ),
  ev(
    "phanrang-kate", "gain", ["ntb"], "🌾", 220,
    "Helping prepare the Kate festival offerings|Ayudando a preparar las ofrendas del festival Kate|Aider à préparer les offrandes de la fête Kate|カテ祭りの供物の準備を手伝う",
    "A Cham family needed extra hands weaving palm-leaf trays and folding cloth for the towers' guardian statues before the October festival, work that has to be finished before the priests climb the steps at dawn. Being trusted with even a small part of the preparations was treated as an honour, not just a job.|Una familia cham necesitaba manos extra para tejer bandejas de hoja de palma y doblar telas para las estatuas guardianas de las torres antes del festival de octubre, un trabajo que debe terminarse antes de que los sacerdotes suban los escalones al alba. Que confiaran en ti hasta para una pequeña parte de los preparativos se trató como un honor, no solo un trabajo.|Une famille cham avait besoin de bras supplémentaires pour tresser des plateaux de feuilles de palme et plier des tissus pour les statues gardiennes des tours avant la fête d'octobre, un travail qui doit être achevé avant que les prêtres ne gravissent les marches à l'aube. Être digne de confiance, ne serait-ce que pour une petite part des préparatifs, était considéré comme un honneur, pas seulement un travail.|チャム族のある家族は、10月の祭りの前に塔の守護神像のためのヤシの葉の盆編みと布の折りたたみに人手を求めていた。司祭が夜明けに階段を上る前に終わらせなければならない仕事だった。準備のほんの一部でも任されたことは、単なる仕事ではなく名誉として扱われた。",
    [6],
  ),
  ev(
    "nhatrang-sunburn", "loss", ["ntb"], "🏖️", 140,
    "A day at the beach turns into a sunburn|Un día de playa termina en quemadura solar|Une journée à la plage se termine en coup de soleil|海辺での一日が日焼けで終わる",
    "The morning sun felt gentle enough to skip a second coat of sunscreen, and by mid-afternoon the shoulders said otherwise. The only pharmacy in walking distance charged tourist prices for after-sun gel, and there was no negotiating with skin that already hurt.|El sol de la mañana parecía lo bastante suave como para saltarse una segunda capa de protector solar, y a media tarde los hombros dijeron lo contrario. La única farmacia a pie cobró precio de turista por el gel calmante, y no había forma de negociar con una piel que ya dolía.|Le soleil du matin semblait assez doux pour se passer d'une seconde couche de crème solaire, et en milieu d'après-midi, les épaules ont dit le contraire. La seule pharmacie à portée de marche a facturé un tarif touriste pour le gel après-soleil, sans possibilité de négocier avec une peau qui faisait déjà mal.|朝の日差しは日焼け止めを重ね塗りしなくても大丈夫そうに思えたが、午後半ばには肩がそうではないと告げた。歩いて行ける唯一の薬局はアフターサンジェルに観光客料金をつけ、すでに痛む肌では値切る余地もなかった。",
  ),

  // ---- tn 西原高原 ----
  ev(
    "buonmathuot-harvest", "gain", ["tn"], "☕", 230,
    "A day picking coffee cherries|Un día recogiendo cerezas de café|Une journée à cueillir des cerises de café|コーヒーチェリーを摘む一日",
    "The farm paid by the kilo rather than the hour, and stripping ripe red cherries off the branch by hand from dawn until the midday heat set in filled more sacks than expected. A picker's fingers turn faintly red-stained by the end of the day, and stay that way for a week.|La finca pagaba por kilo y no por hora, y despojar a mano las cerezas rojas maduras de la rama desde el alba hasta que apretaba el calor del mediodía llenó más sacos de lo esperado. Los dedos de quien recoge quedan teñidos de un rojo tenue al final del día, y siguen así una semana.|La ferme payait au kilo plutôt qu'à l'heure, et dépouiller à la main les cerises rouges mûres de la branche de l'aube jusqu'à ce que la chaleur de midi s'installe a rempli plus de sacs que prévu. Les doigts du cueilleur se teintent légèrement de rouge à la fin de la journée, et le restent une semaine.|農園は時間ではなくキロ単位で支払った。夜明けから昼の暑さが本格化するまで、手で枝から熟した赤い実をむしり取ると、予想より多くの袋が埋まった。摘み手の指はその日の終わりにはうっすら赤く染まり、一週間はそのままになる。",
    [8, 9],
  ),
  ev(
    "dalat-coldnight", "loss", ["tn"], "🧥", 160,
    "Underdressed for a cold Đà Lạt night|Mal abrigado para una noche fría en Đà Lạt|Mal équipé pour une nuit froide à Đà Lạt|ダラットの寒い夜に薄着で出かける",
    "The daytime sun had made a jacket feel unnecessary, and by nine at night the temperature had dropped enough to send a shivering dash into the nearest shop for an overpriced sweater. Nobody who has spent a season here packs light twice.|El sol del día había hecho parecer innecesaria una chaqueta, y hacia las nueve de la noche la temperatura había bajado lo suficiente como para provocar una carrera temblorosa a la tienda más cercana por un jersey carísimo. Quien ha pasado aquí una temporada no vuelve a viajar ligero de ropa.|Le soleil de la journée avait rendu une veste superflue, et vers neuf heures du soir, la température avait assez chuté pour provoquer une course frissonnante jusqu'à la boutique la plus proche pour un pull hors de prix. Personne ayant passé une saison ici ne voyage léger deux fois.|昼間の日差しのせいで上着なんて要らないと思っていたが、夜9時には気温が下がり、震えながら近くの店に駆け込んで割高なセーターを買う羽目になった。ここで一シーズン過ごした者は、二度と薄着では出かけない。",
  ),
  ev(
    "pleiku-gong", "gain", ["tn"], "🥁", 240,
    "Helping stage a gong ensemble show|Ayudando a montar un espectáculo de conjunto de gongs|Aider à monter un spectacle d'ensemble de gongs|銅鑼演奏の催しを手伝う",
    "A Gia Rai village needed help setting up benches and lanterns for a gong performance arranged for a visiting delegation, and staying to listen through the whole set afterward did not feel like part of the job. The sound of a dozen bronze gongs struck in sequence carries much further than expected across open ground.|Un pueblo gia rai necesitaba ayuda para colocar bancos y faroles para una actuación de gongs organizada para una delegación visitante, y quedarse a escuchar todo el repertorio después no se sintió como parte del trabajo. El sonido de una docena de gongs de bronce tocados en secuencia llega mucho más lejos de lo esperado sobre terreno abierto.|Un village gia rai avait besoin d'aide pour installer bancs et lanternes pour une représentation de gongs organisée à l'intention d'une délégation en visite, et rester écouter tout le morceau ensuite n'a pas eu l'air de faire partie du travail. Le son d'une douzaine de gongs de bronze frappés en séquence porte bien plus loin que prévu en terrain découvert.|ジャライ族のある村は、来訪した一団のために用意された銅鑼演奏のためのベンチと提灯の設営に手伝いを求めていた。そのあと最後まで聞き入ってしまったのは、もはや仕事の一部という感じではなかった。十数個の青銅の銅鑼が次々に打ち鳴らされる音は、開けた土地では思っていたよりずっと遠くまで届く。",
  ),
  ev(
    "coffee-middleman", "loss", ["tn"], "📉", 170,
    "A coffee middleman shaves the price|Un intermediario del café recorta el precio|Un intermédiaire du café rogne le prix|コーヒーの仲買人に値切られる",
    "The buyer who showed up at the farm gate quoted a price well under what the roadside noticeboard had listed that morning, and with no truck of one's own to reach the co-operative depot instead, there was little choice but to take it. Middlemen have squeezed growers this way for decades, one reason so many households now push to sell direct.|El comprador que se presentó en la puerta de la finca ofreció un precio muy por debajo del anotado esa mañana en el tablón junto a la carretera, y sin camión propio para llegar en su lugar al almacén de la cooperativa, apenas hubo elección salvo aceptarlo. Los intermediarios llevan décadas exprimiendo así a los productores, una razón por la que hoy tantos hogares buscan vender de forma directa.|L'acheteur venu à la porte de la ferme a proposé un prix bien inférieur à celui affiché ce matin-là sur le panneau au bord de la route, et sans camion à soi pour rejoindre plutôt l'entrepôt de la coopérative, il n'y avait guère le choix que d'accepter. Les intermédiaires pressurent ainsi les producteurs depuis des décennies, une des raisons pour lesquelles tant de foyers cherchent aujourd'hui à vendre en direct.|農家の門先に現れた買い手は、その朝道端の掲示板に出ていた値よりずっと安い値をつけた。代わりに協同組合の集荷場まで運ぶトラックも持っていなかったので、受け入れるほかなかった。仲買人は何十年もこうして生産者を締め上げてきた。いまでは直接販売を目指す家が多いのはそのためでもある。",
  ),

  // ---- dnb 南東部 ----
  ev(
    "bienhoa-factoryshift", "gain", ["dnb"], "🏭", 260,
    "Covering a shift at the industrial park|Cubriendo un turno en el parque industrial|Assurer un poste au parc industriel|工業団地の勤務を代わる",
    "A factory line was short a worker on a day when an order absolutely had to ship, and standing in for the shift paid overtime rates for standing exactly where told and doing exactly what the line required. Biên Hòa's factories have run three shifts a day for longer than most of their current workers have been alive.|A una línea de fábrica le faltaba un trabajador el día en que un pedido tenía que salir sí o sí, y cubrir el turno pagó tarifas de horas extra por estar exactamente donde te decían y hacer exactamente lo que la línea requería. Las fábricas de Biên Hòa llevan funcionando tres turnos al día desde antes de que nacieran la mayoría de sus trabajadores actuales.|Une chaîne d'usine manquait d'un ouvrier le jour où une commande devait absolument partir, et assurer le poste a payé au tarif des heures supplémentaires pour se tenir exactement là où on le disait et faire exactement ce que la chaîne exigeait. Les usines de Biên Hòa tournent en trois-huit depuis plus longtemps que la plupart de leurs ouvriers actuels ne sont en vie.|工場のラインは、絶対に出荷しなければならない注文がある日に一人足りなかった。指示された場所に立ち、ラインの求めることをそのままこなすだけの穴埋め勤務は、割増賃金で払われた。ビエンホアの工場は、いまの労働者の多くが生まれるよりずっと前から一日三交代で操業している。",
  ),
  ev(
    "vungtau-hydrofoilsurge", "loss", ["dnb"], "🚤", 220,
    "A holiday-weekend hydrofoil price surge|Una subida de precio del hidroala en fin de semana festivo|Une flambée du prix de l'hydroptère un week-end férié|連休の水中翼船運賃高騰",
    "Every seat on the last boat back to the city was booked solid by mid-afternoon, and the only ticket left came from a reseller charging well above the printed fare. Public holidays send half of Hồ Chí Minh City to the beach at once, and the boats fill up long before the queue does.|Todos los asientos del último barco de vuelta a la ciudad estaban vendidos a media tarde, y el único billete que quedaba venía de un revendedor que cobraba muy por encima de la tarifa oficial. Los días festivos mandan a media Hồ Chí Minh a la playa a la vez, y los barcos se llenan mucho antes que la cola.|Toutes les places du dernier bateau retour vers la ville étaient réservées dès le milieu de l'après-midi, et le seul billet restant venait d'un revendeur facturant bien au-dessus du tarif affiché. Les jours fériés envoient la moitié de Hô Chi Minh-Ville à la plage d'un coup, et les bateaux se remplissent bien avant la file d'attente.|市内へ戻る最終便は午後半ばまでに全席埋まっており、残っていた唯一の切符は定価をはるかに超える値をつける転売屋のものだった。祝日にはホーチミン市の住民の半分が一斉に海へ向かうため、行列ができるよりずっと早く船は満席になる。",
  ),
  ev(
    "tayninh-caodai", "gain", ["dnb"], "👁️", 210,
    "Assisting at a Cao Đài ceremony|Ayudando en una ceremonia caodaísta|Assister lors d'une cérémonie caodaïste|カオダイ教の儀式を手伝う",
    "The Holy See needed extra hands directing visitors to the viewing gallery during the noon rite, work that mostly meant pointing politely and asking for quiet. Watching the white-robed procession from just behind the balcony rail was, by common agreement among the other helpers, the better half of the job.|La Santa Sede necesitaba manos extra para dirigir a los visitantes a la galería durante el rito del mediodía, un trabajo que en su mayor parte consistía en señalar con cortesía y pedir silencio. Ver la procesión de túnicas blancas justo detrás de la barandilla del balcón fue, según acuerdo común entre los demás ayudantes, la mejor parte del trabajo.|Le Saint-Siège avait besoin de bras supplémentaires pour diriger les visiteurs vers la galerie durant le rite de midi, un travail consistant surtout à indiquer poliment le chemin et à demander le silence. Regarder la procession en robes blanches juste derrière la rambarde du balcon était, de l'avis commun des autres aides, la meilleure part du travail.|正午の儀式のあいだ、総本山は見学席へ案内する手を求めていた。仕事の大半は丁寧に案内し静粛を求めることだった。バルコニーの手すりのすぐ後ろから白い衣の行列を眺めるのは、ほかの手伝いの者たちの一致した意見によれば、この仕事のいちばんの役得だった。",
  ),

  // ---- mkd メコンデルタ ----
  ev(
    "cairang-boatload", "gain", ["mkd"], "🍈", 230,
    "Loading a fruit boat before dawn at Cái Răng|Cargando una barca de fruta antes del alba en Cái Răng|Charger un bateau de fruits avant l'aube à Cái Răng|夜明け前にカイランで果物船に積み込む",
    "The wholesalers needed extra arms passing crates hand to hand from the dock to the boat before the morning market crowd arrived, paid in cash and a bag of whatever fruit was too bruised to sell. By the time the sun was properly up, the whole transaction had already come and gone.|Los mayoristas necesitaban brazos extra para pasar cajas de mano en mano del muelle a la barca antes de que llegara la multitud del mercado matinal, pagados en efectivo y con una bolsa de la fruta demasiado golpeada para vender. Para cuando el sol ya estaba bien alto, toda la operación ya había terminado.|Les grossistes avaient besoin de bras supplémentaires pour faire passer les caisses de main en main du quai au bateau avant l'arrivée de la foule du marché matinal, payés en espèces et avec un sac des fruits trop abîmés pour être vendus. Le temps que le soleil soit bien levé, toute l'opération était déjà terminée.|卸売業者は、朝の市場の人混みが来る前に、桟橋から船へ木箱を手渡しで運ぶ余分な腕を求めていた。報酬は現金と、傷んで売り物にならない果物の袋だった。日がすっかり昇るころには、取引はもう始まって終わっていた。",
  ),
  ev(
    "chaudoc-pilgrim", "gain", ["mkd"], "🙏", 240,
    "Guiding pilgrims to the Bà Chúa Xứ temple|Guiando a peregrinos hasta el templo de Bà Chúa Xứ|Guider des pèlerins jusqu'au temple de Bà Chúa Xứ|バーチュアスー廟へ参拝客を案内する",
    "A busload of pilgrims arrived without a guide booked, unsure which of the temple's several buildings to visit first, and pointing the way through the incense smoke for an afternoon earned a grateful tip on top of the agreed fee. The temple's spring festival brings in more visitors in a week than the town sees the rest of the year combined.|Un autobús de peregrinos llegó sin guía reservado, sin saber cuál de los varios edificios del templo visitar primero, y señalar el camino entre el humo del incienso durante una tarde ganó una propina agradecida además de la tarifa acordada. El festival de primavera del templo trae en una semana más visitantes de los que el pueblo ve en el resto del año junto.|Un car de pèlerins est arrivé sans guide réservé, ne sachant pas lequel des bâtiments du temple visiter en premier, et indiquer le chemin à travers la fumée d'encens pendant un après-midi a rapporté un pourboire reconnaissant en plus du tarif convenu. La fête de printemps du temple attire en une semaine plus de visiteurs que la ville n'en voit tout le reste de l'année réuni.|参拝客を乗せたバスが、案内を予約せずに到着し、廟のいくつもある建物のどこから見ればいいのか分からずにいた。午後じゅう線香の煙の中を案内すると、約束の報酬に加えて感謝のチップまでもらえた。この廟の春の祭りは、一週間で町がその他の一年間を合わせたより多い参拝客を集める。",
  ),
  ev(
    "flooded-sandals", "loss", ["mkd"], "🩴", 150,
    "Sandals lost in the floodwater|Sandalias perdidas en el agua de la inundación|Sandales perdues dans l'eau de crue|増水でサンダルを流される",
    "Wading across a flooded lane felt manageable right up until the current tugged a sandal off underwater, gone before a hand could reach down to grab it. Replacing a pair in the middle of flood season, when every shop's stock is soaked anyway, costs more than it should.|Vadear un camino inundado parecía manejable hasta que la corriente arrancó una sandalia bajo el agua, desaparecida antes de que una mano pudiera bajar a agarrarla. Reemplazar un par en plena temporada de crecida, cuando de todos modos el stock de todas las tiendas está empapado, cuesta más de lo que debería.|Traverser à gué une ruelle inondée semblait gérable, jusqu'à ce que le courant arrache une sandale sous l'eau, disparue avant qu'une main ne puisse plonger pour la rattraper. Remplacer une paire en pleine saison des crues, quand le stock de chaque boutique est de toute façon trempé, coûte plus cher que ça ne devrait.|水浸しの路地を歩いて渡るのは大丈夫だと思っていたが、水面下で流れがサンダルを引っ張り、手を伸ばす間もなく流されてしまった。増水期の真っ只中、どの店の在庫もどうせ水浸しになっている時期に買い替えるのは、余計に高くつく。",
    [6, 7],
  ),
];
