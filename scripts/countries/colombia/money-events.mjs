/**
 * コロンビアの青マス・赤マスで起きる出来事(16件。増8・減8)。
 *
 * 地方コード: car=カリブ海岸 / and=アンデス / pac=太平洋岸(チョコ) /
 * lla=東部平原(リャノス) / ama=南部アマゾニア
 *
 * 地方を指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、car・pac・lla・amaに各2件(増1・減1)、andに4件(増2・減2、
 * アンデスが都市数の4割近くを占めるため厚めにした)を、土地の産業や
 * この盤面の芯(川・山・空)に結びつけて置いている。
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
 * (0=4月〜11=3月、他国と同じ並び)。省略すれば通年。
 */
function ev(id, kind, regs, emoji, amount, title, narrative, months = []) {
  return { id, kind, regs, e: emoji, amount, n: t(title), t: t(narrative), months };
}

export const COLOMBIA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(4件) ----
  ev(
    "ayuda-turista-perdido", "gain", [], "🗺️", 190,
    "Helping a lost backpacker find the right bus|Ayudando a un mochilero perdido a encontrar el bus correcto|Aider un routard perdu à trouver le bon bus|道に迷ったバックパッカーにバスを教える",
    "A foreign traveler stood frozen at the terminal, staring at a departure board that made no sense in a hurry, and a few minutes of slow, patient directions were rewarded with more than a simple thank you. Most young Colombians pick up enough school English to help, whatever they claim about their own fluency.|Un viajero extranjero se quedó paralizado en la terminal, mirando un tablero de salidas que no tenía sentido con prisa, y unos minutos de indicaciones pacientes y despacio se recompensaron con algo más que un simple gracias. La mayoría de los jóvenes colombianos manejan suficiente inglés de colegio para ayudar, digan lo que digan sobre su propio nivel.|Un voyageur étranger restait figé au terminal, fixant un tableau des départs incompréhensible dans la précipitation, et quelques minutes d'indications patientes et lentes furent récompensées par bien plus qu'un simple merci. La plupart des jeunes Colombiens ont assez d'anglais scolaire pour aider, quoi qu'ils prétendent de leur propre niveau.|外国人旅行者がターミナルで固まり、急いでは読み解けない出発案内板を見つめていた。ゆっくり辛抱強く数分間道を教えると、簡単なお礼以上のものが返ってきた。多くのコロンビアの若者は、本人がどう謙遜しようと、助けられる程度の学校英語を身につけている。",
  ),
  ev(
    "chiva-empujada", "gain", [], "🚌", 200,
    "Pushing a stranded chiva out of the mud|Empujando una chiva varada fuera del barro|Pousser une chiva embourbée hors de la boue|泥にはまったチバを押す",
    "The colourful bus had sunk a back wheel into a soft shoulder on a rain-slicked curve, and a dozen passengers piling out to push together got it moving again in under ten minutes. The driver split what he could spare from the fare box among the ones who had gotten muddiest.|El bus de colores había hundido una rueda trasera en el borde blando de una curva mojada por la lluvia, y una docena de pasajeros que bajaron a empujar juntos la sacaron en menos de diez minutos. El conductor repartió lo que pudo del dinero del pasaje entre los que quedaron más embarrados.|Le bus coloré avait enfoncé une roue arrière dans l'accotement meuble d'un virage détrempé par la pluie, et une douzaine de passagers descendus pousser ensemble l'ont dégagé en moins de dix minutes. Le chauffeur a partagé ce qu'il pouvait de la caisse entre ceux qui s'étaient le plus salis.|派手な色のバスは、雨に濡れたカーブの柔らかい路肩に後輪をはめてしまったが、十数人の乗客が降りて一緒に押すと10分足らずで動き出した。運転手は運賃箱から出せるだけの金を、いちばん泥まみれになった人たちに分けた。",
  ),
  ev(
    "mercado-carterista", "loss", [], "👛", 190,
    "A pickpocket works the crowded market|Un carterista trabaja el mercado abarrotado|Un pickpocket sévit au marché bondé|混み合う市場ですりに遭う",
    "A shove between two stalls felt like nothing more than the usual crush of the crowd, and only at the next stall did the missing weight in a bag become obvious. Nobody nearby noticed a thing over the noise of vendors calling out prices.|Un empujón entre dos puestos se sintió como el simple bullicio de la multitud, y solo en el siguiente puesto se hizo evidente el peso que faltaba en el bolso. Nadie cerca notó nada entre el ruido de los vendedores pregonando precios.|Une bousculade entre deux étals n'a semblé qu'un mouvement ordinaire de la foule, et ce n'est qu'à l'étal suivant que le poids manquant dans le sac est devenu évident. Personne aux alentours n'a rien remarqué dans le vacarme des vendeurs criant leurs prix.|露店の合間でのぶつかりは、ただの人混みの押し合いにしか感じなかったが、次の店に着いてはじめて鞄の軽さに気づいた。値段を呼び込む売り子たちの声にまぎれて、近くの誰も気づかなかった。",
  ),
  ev(
    "seleccion-apuesta-perdida", "loss", [], "⚽", 170,
    "Losing a bet on the national football team|Perdiendo una apuesta por la selección nacional|Perdre un pari sur l'équipe nationale de football|代表戦の賭けに負ける",
    "The bar had been loud with confidence right up to the final whistle, and settling up with the neighbour who bet the other way cost more than the round of drinks had. La Selección breaks hearts often enough that everyone at the table should have known better.|El bar estaba lleno de confianza hasta el pitido final, y saldar cuentas con el vecino que apostó lo contrario costó más que la ronda de bebidas. La Selección rompe corazones con la frecuencia suficiente como para que todos en la mesa debieran saberlo.|Le bar débordait de confiance jusqu'au coup de sifflet final, et régler ses comptes avec le voisin qui avait parié l'inverse a coûté plus cher que la tournée elle-même. La Selección brise les cœurs assez souvent pour que toute la tablée aurait dû s'en douter.|試合終了の笛が鳴るまでバルは自信に満ちていたが、逆に賭けていた隣人への支払いは、みんなで飲んだ分より高くついた。代表チームはしょっちゅう期待を裏切るのだから、その場の誰もが分かっていたはずだった。",
  ),

  // ---- car カリブ海岸 ----
  ev(
    "descarga-pesquera-madrugada", "gain", ["car"], "🐟", 210,
    "Unloading the catch at dawn|Descargando la pesca al alba|Décharger la prise à l'aube|夜明けの水揚げを手伝う",
    "A boat came in heavier than the crew expected, and extra hands to sort the catch into crates before the ice ran out were paid on the spot. The whole dock smells of the sea for an hour afterward no matter how well it is hosed down.|Un barco llegó más cargado de lo que esperaba la tripulación, y las manos extra para clasificar la pesca en cajones antes de que se acabara el hielo se pagaron en el acto. Todo el muelle huele a mar durante una hora después, por más que se friegue.|Un bateau est arrivé plus chargé que l'équipage ne l'attendait, et les bras supplémentaires pour trier la prise en caisses avant que la glace ne manque furent payés sur-le-champ. Tout le quai sent la mer pendant une heure après, quel que soit le nettoyage au jet.|想定より多い水揚げがあった船で、氷が尽きる前に魚を箱に仕分ける手が求められ、その場で払われた。どれだけ甲板を洗い流しても、桟橋全体が小一時間は海の匂いに包まれる。",
  ),
  ev(
    "billete-falso-vuelto", "loss", ["car"], "💵", 180,
    "A counterfeit bill turns up in the change|Un billete falso aparece entre el vuelto|Un faux billet apparaît dans la monnaie|釣り銭に偽札が混ざっていた",
    "The note looked fine under the stall's bare lightbulb, and only a vendor's practised rub of the watermark later gave it away as fake. Counterfeit pesos circulate often enough in busy coastal markets that stallholders check bills almost without thinking.|El billete parecía correcto bajo el bombillo desnudo del puesto, y solo el frotar experto de un vendedor sobre la marca de agua lo delató después como falso. Los pesos falsos circulan lo bastante en los mercados costeros concurridos como para que los vendedores revisen los billetes casi sin pensarlo.|Le billet semblait correct sous l'ampoule nue de l'étal, et seul le frottement expérimenté d'un vendeur sur le filigrane l'a trahi plus tard comme faux. De faux pesos circulent assez souvent dans les marchés côtiers animés pour que les vendeurs vérifient les billets presque sans y penser.|裸電球の下では本物に見えたが、あとで店主が透かしを指で擦って確かめ、偽物だと分かった。混み合う海岸部の市場では偽ペソ札がそれなりに出回っており、店主たちはほとんど無意識に紙幣を確かめる。",
  ),

  // ---- and アンデス ----
  ev(
    "jornada-recoleccion-cafe", "gain", ["and"], "☕", 220,
    "A day picking coffee, paid by the box|Un día recogiendo café, pagado por caja|Une journée à cueillir le café, payée à la caisse|コーヒーを摘む一日、箱ごとの日当",
    "A farm short on hands before a buyer's deadline paid by the box rather than the hour, and quick fingers among the ripest red cherries filled more crates than expected by sundown. Coffee-region wages still run almost entirely on this piece-rate custom.|Una finca corta de manos antes de la fecha límite de un comprador pagaba por caja y no por hora, y los dedos rápidos entre las cerezas más maduras llenaron más cajones de lo esperado antes del atardecer. Los jornales del eje cafetero todavía funcionan casi por completo con esta costumbre de pago a destajo.|Une ferme en manque de bras avant la date limite d'un acheteur payait à la caisse plutôt qu'à l'heure, et des doigts rapides parmi les cerises les plus mûres ont rempli plus de caisses que prévu avant le coucher du soleil. Les salaires de la région caféière reposent encore presque entièrement sur cette coutume au rendement.|買い付け人の締め切り前で人手が足りなかった農園は、時給ではなく箱の数で払っていた。いちばん熟した赤い実のあいだを手早く動く指は、日暮れまでに予想より多くの箱を満たした。コーヒー地方の賃金は、いまもほぼこの出来高払いの慣習で成り立っている。",
  ),
  ev(
    "hallazgo-esmeralda-guaquero", "gain", ["and"], "💎", 240,
    "A small emerald turns up while panning tailings|Una pequeña esmeralda aparece cerniendo escombros|Une petite émeraude apparaît en tamisant les déblais|残土をふるっていて小さなエメラルドが出てくる",
    "The mine's discarded rock is legally open to guaqueros who pan through it after hours looking for whatever the big operation missed, and a green fleck the size of a fingernail turned out to be worth arguing over with a buyer for twenty minutes. Most days yield nothing at all.|La escombrera de la mina está legalmente abierta a los guaqueros que la ciernen después de horario buscando lo que la operación grande dejó pasar, y una mota verde del tamaño de una uña resultó valer veinte minutos de regateo con un comprador. La mayoría de los días no dan nada.|Les déblais de la mine sont légalement ouverts aux guaqueros qui les tamisent après les heures de travail, cherchant ce que la grande exploitation a laissé passer, et un éclat vert de la taille d'un ongle a fini par valoir vingt minutes de marchandage avec un acheteur. La plupart des jours ne donnent rien du tout.|鉱山が捨てた残土は、大手の採掘がすり抜けたものを求めて業務時間後にふるいにかけるグアケロたちに合法的に開かれている。爪先ほどの緑の欠片が、買い手と20分値切り合うだけの値打ちがあった。ほとんどの日は何も出ない。",
  ),
  ev(
    "derrumbe-via-desvio", "loss", ["and"], "🪨", 230,
    "A landslide forces a costly detour|Un derrumbe obliga a un desvío costoso|Un glissement de terrain force un détour coûteux|地滑りで高くつく迂回を強いられる",
    "Heavy rain loosened a slope above the highway overnight, and with the direct road closed for clearing, the only way through was a longer route and a driver charging accordingly. Mountain roads here are cut and re-cut by the same slopes every rainy season.|La lluvia fuerte soltó una ladera sobre la carretera durante la noche, y con la vía directa cerrada para la limpieza, la única manera de pasar fue una ruta más larga y un conductor que cobró en consecuencia. Las carreteras de montaña aquí se cortan y recortan por las mismas laderas cada temporada de lluvias.|De fortes pluies ont détaché un versant au-dessus de la route pendant la nuit, et la voie directe étant fermée pour le déblaiement, le seul moyen de passer fut un itinéraire plus long et un chauffeur facturant en conséquence. Ici, les routes de montagne sont coupées et recoupées par les mêmes versants à chaque saison des pluies.|夜のうちに豪雨が幹線道路の上の斜面を緩め、直通の道は撤去作業で閉鎖されていたため、通れるのは遠回りの道だけで、運転手はそれに見合う料金を求めた。この山道は毎年の雨季に、同じ斜面によって何度も切られては塞がれる。",
    [10, 11, 0],
  ),
  ev(
    "esmeralda-falsa-timo", "loss", ["and"], "🟢", 220,
    "A 'bargain' emerald turns out to be glass|Una esmeralda 'de ganga' resulta ser vidrio|Une émeraude « à prix cassé » s'avère être du verre|「お買い得」のエメラルドがガラスだった",
    "The stone caught the light beautifully on the street corner and the price seemed too good to walk away from, which was, of course, the entire point. A jeweller's loupe back at the hotel settled the question in about four seconds.|La piedra brillaba hermosa en la esquina y el precio parecía demasiado bueno para dejarlo pasar, que era, claro, todo el punto. Una lupa de joyero de vuelta en el hotel resolvió la duda en unos cuatro segundos.|La pierre accrochait joliment la lumière au coin de la rue et le prix semblait trop beau pour laisser passer, ce qui était, bien sûr, tout l'intérêt de la manœuvre. Une loupe de bijoutier, de retour à l'hôtel, a réglé la question en environ quatre secondes.|街角で見た石は美しく光を受け、値段は見送るには惜しいほどよく見えたが、それこそが騙しの狙いだった。ホテルに戻ってからルーペで見ると、答えは4秒ほどで出た。",
  ),

  // ---- pac 太平洋岸(チョコ) ----
  ev(
    "guia-avistamiento-ballenas", "gain", ["pac"], "🐋", 250,
    "Guiding tourists to the humpback whales|Guiando a turistas hasta las ballenas jorobadas|Guider des touristes vers les baleines à bosse|ザトウクジラを見に観光客を案内する",
    "A boatman needed a second pair of eyes to spot the spray of a breaching whale before it vanished again, and a full boat of delighted tourists tipped well over what the fuel had cost. Humpbacks travel thousands of kilometres from Antarctic waters just to calve in this one stretch of coast.|Un botero necesitaba un segundo par de ojos para detectar el chorro de una ballena saltando antes de que desapareciera de nuevo, y un bote lleno de turistas encantados dejó una propina muy por encima de lo que costó el combustible. Las jorobadas viajan miles de kilómetros desde aguas antárticas solo para parir en este tramo de costa.|Un batelier avait besoin d'une seconde paire d'yeux pour repérer le souffle d'une baleine bondissante avant qu'elle ne disparaisse à nouveau, et un bateau plein de touristes ravis a laissé un pourboire bien au-dessus du coût de l'essence. Les baleines à bosse parcourent des milliers de kilomètres depuis les eaux antarctiques rien que pour mettre bas sur ce tronçon de côte.|跳ねるクジラの潮吹きが再び消える前に見つけるのに、船頭はもう一組の目を必要としていた。喜んだ観光客でいっぱいの船からは、燃料代をずっと上回るチップが渡された。ザトウクジラは、この一区画の海岸で出産するためだけに、南極の海から何千キロも旅してくる。",
    [2, 3, 4, 5, 6],
  ),
  ev(
    "lluvia-arruina-mercaderia", "loss", ["pac"], "🌧️", 210,
    "Relentless rain ruins goods waiting on the dock|La lluvia incesante arruina la mercancía en el muelle|Une pluie incessante gâte la marchandise sur le quai|絶え間ない雨が桟橋の荷を台無しにする",
    "The boat that was supposed to collect the sacks came in two days late, and by then the rain that never really stops here had soaked clean through the tarpaulin covering them. Some of Colombia's highest rainfall totals anywhere are recorded not far from this same dock.|El barco que debía recoger los sacos llegó dos días tarde, y para entonces la lluvia que aquí nunca deja de caer del todo había calado la lona que los cubría. No lejos de este mismo muelle se registran algunos de los totales de lluvia más altos de Colombia.|Le bateau censé récupérer les sacs est arrivé deux jours en retard, et d'ici là, la pluie qui ne s'arrête jamais vraiment ici avait trempé de part en part la bâche qui les couvrait. Non loin de ce même quai sont enregistrés certains des plus hauts totaux de pluie de toute la Colombie.|袋を積み込むはずだった船は2日遅れて到着し、そのころにはこの地でほとんど止むことのない雨が、覆っていた防水シートをすっかり通り抜けていた。この桟橋からそう遠くない場所で、コロンビア屈指の降水量が記録されている。",
  ),

  // ---- lla 東部平原(リャノス) ----
  ev(
    "jornada-vaqueria", "gain", ["lla"], "🐎", 230,
    "A day helping round up the herd|Un día ayudando en la vaquería|Une journée à aider au rassemblement du troupeau|牛の集めを手伝う一日",
    "The ranch was short a rider for the annual round-up, and a spare horse and a full day in the saddle chasing cattle across open grassland earned a solid day's pay by evening. Llanero cowboys still do this work almost entirely on horseback, the ground too soft and too vast for much else.|A la hacienda le faltaba un jinete para la vaquería anual, y un caballo de repuesto y un día entero en la silla arreando ganado por la llanura abierta ganaron un buen jornal para el atardecer. Los llaneros todavía hacen este trabajo casi por completo a caballo, el terreno demasiado blando y vasto para casi cualquier otra cosa.|Le ranch manquait d'un cavalier pour le rassemblement annuel, et un cheval de rechange plus une journée entière en selle à rassembler le bétail sur la plaine ouverte ont valu une bonne paie du soir. Les llaneros font encore ce travail presque entièrement à cheval, le terrain trop meuble et trop vaste pour presque tout le reste.|牧場は年に一度の牛集めに乗り手が足りず、予備の馬に乗って開けた草原で一日中牛を追うと、夕方にはしっかりした日当が出た。ジャネロの牧夫たちは、この仕事をいまもほぼすべて騎馬でこなす。地面が柔らかく広すぎて、他の手段はほとんど使えない。",
    [10, 11],
  ),
  ev(
    "camino-inundado-desvio", "loss", ["lla"], "🚧", 220,
    "A flooded road forces a long detour|Un camino inundado obliga a un largo desvío|Une route inondée force un long détour|冠水した道で長い迂回を強いられる",
    "The road that was solid ground a week ago now sits under half a metre of brown water spreading in every direction, and the only way onward was a driver who knew a longer track around the high side of the plain. Much of the Llanos floods too deep to drive across for months at a time.|El camino que hace una semana era tierra firme ahora está bajo medio metro de agua parda que se extiende en todas direcciones, y la única manera de seguir fue un conductor que conocía una pista más larga por el lado alto de la llanura. Buena parte de los Llanos se inunda demasiado hondo para cruzarla en auto durante meses seguidos.|La route qui était terrain ferme il y a une semaine se trouve maintenant sous un demi-mètre d'eau brune s'étendant dans toutes les directions, et le seul moyen d'avancer fut un chauffeur connaissant une piste plus longue par le côté haut de la plaine. Une bonne partie des Llanos s'inonde trop profondément pour être traversée en voiture pendant des mois d'affilée.|1週間前はしっかりした地面だった道は、いまやあらゆる方向に広がる深さ半メートルの茶色い水の下にある。先へ進む手立ては、平原の高台側を通る遠回りの道を知る運転手だけだった。リャノスの多くは、何か月も続けて車で渡れないほど深く水につかる。",
    [4, 5, 6],
  ),

  // ---- ama 南部アマゾニア ----
  ev(
    "guia-rio-turistas", "gain", ["ama"], "🐬", 240,
    "Guiding river tourists to the pink dolphins|Guiando a turistas fluviales hasta los delfines rosados|Guider des touristes fluviaux vers les dauphins roses|川を訪れる観光客をピンクのイルカに案内する",
    "A boatman needed a second pair of eyes to spot the pale shapes surfacing at dusk, and the tip from a boat of delighted visitors more than covered the fuel for the trip. The river's pink dolphins are almost blind, navigating the muddy water by sound alone.|Un botero necesitaba un segundo par de ojos para detectar las formas pálidas que asomaban al atardecer, y la propina de un bote de visitantes encantados cubrió de sobra el combustible del viaje. Los delfines rosados del río son casi ciegos y se guían solo por el sonido en el agua turbia.|Un batelier avait besoin d'une seconde paire d'yeux pour repérer les formes pâles émergeant au crépuscule, et le pourboire d'un bateau de visiteurs ravis a largement couvert l'essence du trajet. Les dauphins roses du fleuve sont presque aveugles et se guident au son dans l'eau boueuse.|夕暮れに浮かび上がる淡い姿を見つけるのに、船頭はもう一組の目を必要としていた。喜んだ来訪者の一団からのチップは燃料代を十分に上回った。この川のピンクイルカはほとんど目が見えず、濁った水の中を音だけで進む。",
  ),
  ev(
    "helice-tronco-sumergido", "loss", ["ama"], "🛶", 230,
    "The propeller strikes a submerged log|La hélice golpea un tronco sumergido|L'hélice heurte un tronc submergé|プロペラが水没した丸太に当たる",
    "The engine kicked violently and cut out the moment the propeller caught something invisible just beneath the brown water, and the bent shaft needed a mechanic willing to be paid extra for coming out this far upriver. Floating logs and sunken trees are an ordinary hazard on rivers this wide and this muddy.|El motor dio un tirón violento y se apagó en el momento en que la hélice chocó con algo invisible justo bajo el agua parda, y el eje doblado necesitó un mecánico dispuesto a cobrar de más por venir hasta tan río arriba. Los troncos flotantes y los árboles hundidos son un peligro corriente en ríos tan anchos y turbios como este.|Le moteur a violemment sursauté puis calé au moment où l'hélice a heurté quelque chose d'invisible juste sous l'eau brune, et l'arbre tordu a nécessité un mécanicien prêt à se faire payer un supplément pour venir jusque-là en amont. Les troncs flottants et les arbres engloutis sont un danger ordinaire sur des fleuves aussi larges et aussi boueux que celui-ci.|プロペラが茶色い水面のすぐ下に潜む見えない何かに当たった瞬間、エンジンは激しく揺れて止まった。曲がった軸を直すには、これほど川を遡って来るぶんの割増料金を受け入れる整備士が必要だった。浮かぶ丸太や沈んだ木は、これほど幅広く濁った川では珍しくない危険である。",
  ),
];
