/**
 * ロシアの青マス・赤マスで起きる出来事(22件。増14・減8)。
 *
 * 地方コード: tsn=中央 / szp=北西 / yug=南部・カフカス / vlg=ヴォルガ・ウラル /
 * sib=シベリア / dv=極東
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで6地方それぞれに3件(増2・減1)を置いている。**地方ごとの
 * `gains`/`losses` は、その地方の出来事だけで増・減の両方が引けることを
 * 個別に確認済み**(全国共通の4件に頼らなくても成り立つ)。
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

export const RUSSIA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "pirozhki-na-perone", "gain", [], "🥟", 220,
    "Selling pirozhki on the station platform|Vendiendo pirozhki en el andén de la estación|Vendre des pirojki sur le quai de la gare|駅のホームでピロシキを売る",
    "The train's ten-minute stop was just long enough for a babushka running low on hands to hand over a tray of hot pirozhki and split the takings from the rush of passengers stretching their legs. Every long-distance platform across the country has its own regulars, and returning travellers claim to recognise the good stalls from years back.|La parada de diez minutos del tren fue justo lo bastante larga para que una babushka con pocas manos entregara una bandeja de pirozhki calientes y repartiera las ganancias de la avalancha de pasajeros que estiraban las piernas.|L'arrêt de dix minutes du train fut juste assez long pour qu'une babouchka à court de mains confie un plateau de pirojki chauds et partage les gains de la ruée de voyageurs venus se dégourdir les jambes.|列車のわずか10分の停車時間は、手が足りなくなったおばあさんが熱々のピロシキの盆を託し、脚を伸ばしに降りてきた乗客たちの売上を分け合うにはちょうどいい長さだった。国内の長距離列車のホームにはどこにも常連の売り子がいて、旅慣れた乗客は何年も前から覚えている良い屋台を見分けられるという。",
  ),
  ev(
    "samovar-pochinka", "gain", [], "🫖", 200,
    "Fixing the carriage attendant's samovar|Arreglando el samovar de la encargada del vagón|Réparer le samovar de l'employée du wagon|車掌のサモワールを直す",
    "The provodnitsa's coal-heated samovar had gone cold somewhere past midnight with a whole carriage still wanting tea, and a passenger who happened to know which valve had stuck was rewarded on the spot. Every carriage on a long-distance train still carries one of these urns, boiling water round the clock for tea, instant noodles and whatever else needs hot water at three in the morning.|El samovar calentado a carbón de la encargada del vagón se había enfriado pasada la medianoche con todo un vagón aún queriendo té, y un pasajero que sabía qué válvula se había atascado fue recompensado al instante.|Le samovar chauffé au charbon de l'employée du wagon s'était refroidi bien après minuit alors que tout le wagon voulait encore du thé, et un passager qui savait quelle valve s'était bloquée fut récompensé sur-le-champ.|石炭で沸かす車掌の湯沸かし器サモワールが真夜中過ぎに冷えてしまい、車両じゅうがまだお茶を欲しがっていたところ、どの弁が詰まっているか知っていた乗客がその場で報われた。長距離列車のどの車両にもいまもこの湯沸かし器があり、お茶やカップ麺、深夜3時に湯を求める何にでも、昼夜を分かたず湯を沸かし続けている。",
  ),
  ev(
    "shakhmatnyi-proigrysh", "loss", [], "♟️", 180,
    "Losing a chess bet in the platzkart car|Perdiendo una apuesta de ajedrez en el vagón de platzkart|Perdre un pari d'échecs dans le wagon platzkart|プラツカルト車内でチェスの賭けに負ける",
    "A folding board came out somewhere around hour six of the journey, and a retired engineer who had clearly been playing since childhood took the small stakes without much visible effort. Pocket chess sets are common enough among long-distance regulars that a serious player can expect at least one challenge before the destination.|Un tablero plegable apareció hacia la sexta hora del viaje, y un ingeniero jubilado que claramente llevaba jugando desde niño se llevó las pequeñas apuestas sin mucho esfuerzo visible.|Un échiquier pliant sortit vers la sixième heure du trajet, et un ingénieur à la retraite qui jouait visiblement depuis l'enfance empocha les petites mises sans effort apparent.|旅の6時間目あたりで折りたたみ式の盤が出てきて、子供の頃からずっと指してきたらしい引退した技師が、さして苦労もせず小さな賭け金を持っていった。携帯用のチェスセットは長距離の常連のあいだでは珍しくなく、腕に覚えのある者は目的地に着くまでに少なくとも一度は勝負を挑まれる。",
  ),
  ev(
    "bez-bileta", "loss", [], "🎫", 160,
    "Fined for an unvalidated ticket|Multado por un billete sin validar|Amendé pour un billet non validé|未検証の切符で罰金",
    "The paper ticket looked perfectly valid to an untrained eye, but the conductor's handheld scanner insisted it had never been properly registered at the station kiosk, and no amount of explaining changed the on-the-spot fine that followed. Long-distance conductors check every single ticket at boarding, a habit that dates back to a time long before any of this could be verified electronically.|El billete de papel parecía perfectamente válido a ojos inexpertos, pero el escáner portátil del revisor insistía en que nunca se había registrado correctamente en el quiosco de la estación.|Le billet papier semblait parfaitement valide à un œil non averti, mais le scanner portable du contrôleur insistait qu'il n'avait jamais été correctement enregistré au kiosque de la gare.|素人目には切符はまったく問題なく見えたが、車掌の携帯端末は駅の窓口で正しく登録されていないと言い張り、いくら説明してもその場での罰金は変わらなかった。長距離列車の車掌は乗車時に切符を一枚残らず確かめる習慣を持ち、これはまだ電子的な照合などできなかった時代からの名残である。",
  ),

  // ---- tsn 中央 ----
  ev(
    "goldenring-provodnik", "gain", ["tsn"], "🛕", 260,
    "Guiding lost tourists to a Golden Ring church|Guiando a turistas perdidos hasta una iglesia del Anillo de Oro|Guider des touristes perdus vers une église de l'Anneau d'or|迷った観光客をゴールデンリングの教会へ案内する",
    "A minibus tour had dropped a small group at the wrong side of town with only a blurry map photo to go by, and twenty minutes of walking them to the right bell tower earned an unexpectedly generous tip. Golden Ring towns still lean on this kind of informal local knowledge, since not every winding side street shows up correctly on a phone.|Un minibús turístico había dejado a un pequeño grupo en el lado equivocado del pueblo con solo la foto borrosa de un mapa como guía, y veinte minutos guiándolos hasta el campanario correcto ganaron una propina inesperadamente generosa.|Un minibus touristique avait déposé un petit groupe du mauvais côté de la ville avec pour seul repère la photo floue d'une carte, et vingt minutes à les guider vers le bon clocher rapportèrent un pourboire étonnamment généreux.|観光バスが小さな一団を町の反対側に降ろしてしまい、頼りはぼやけた地図の写真だけだった。正しい鐘楼まで20分かけて案内すると、思いがけず気前のいいチップをもらえた。ゴールデンリングの町々ではいまもこうした地元の勘に頼る場面が多く、曲がりくねった裏通りはスマートフォンの地図でも正しく表示されないことがある。",
  ),
  ev(
    "metro-kiosk-podmoga", "gain", ["tsn"], "🚇", 200,
    "Helping restock a metro souvenir kiosk|Ayudando a reponer un quiosco de recuerdos del metro|Aider à réapprovisionner un kiosque de souvenirs du métro|地下鉄の土産物売店の補充を手伝う",
    "A kiosk owner deep in one of the metro's marble-and-chandelier stations was overwhelmed by a sudden wave of tourists after a viral photo of the station went around, and an extra pair of hands sorting magnets and postcards for an hour was paid well. Several Moscow metro stations, built as showpieces in the Stalin era, draw sightseers who never intend to actually take a train.|El dueño de un quiosco en lo profundo de una de las estaciones de mármol y arañas del metro se vio desbordado por una repentina oleada de turistas tras una foto viral de la estación.|Le propriétaire d'un kiosque au fond d'une des stations de métro en marbre et lustres fut débordé par une soudaine vague de touristes après qu'une photo virale de la station eut circulé.|大理石とシャンデリアで飾られた地下鉄駅の奥にある売店の主は、その駅の写真がネットで拡散したことで突然の観光客の波にのまれていた。1時間ほどマグネットや絵葉書を並べる手伝いをしただけで、しっかり支払ってもらえた。スターリン時代に見世物として建てられたモスクワ地下鉄の駅のいくつかは、電車に乗るつもりのない観光客も惹きつける。",
  ),
  ev(
    "kremlin-ocheredь-bilet", "loss", ["tsn"], "🎟️", 240,
    "A rushed same-day Kremlin ticket costs extra|Un billete urgente para el Kremlin el mismo día cuesta extra|Un billet pour le Kremlin le jour même, pris à la hâte, coûte plus cher|当日焦って買ったクレムリン入場券は割高だった",
    "The advance-booking window online had closed the night before, leaving only a same-day ticket sold at a markup by a booth near the queue, and standing in the sun for an hour first made the extra cost sting even more. Tour groups with pre-purchased tickets bypass the whole line entirely, a fact the queue has plenty of time to resent.|La ventana de reserva anticipada en línea había cerrado la noche anterior, dejando solo un billete del mismo día vendido con recargo en un puesto cerca de la cola.|La fenêtre de réservation en ligne s'était fermée la veille au soir, ne laissant qu'un billet du jour même vendu à prix majoré par un stand près de la file.|前日の夜にはオンラインの事前予約枠が締め切られており、残っていたのは行列脇の窓口が割増で売る当日券だけだった。まず1時間も日なたで並んでから、その割増分がいっそう痛かった。事前に切符を買った団体客は行列をまるごと素通りしていき、その事実を恨む時間だけはたっぷりあった。",
  ),

  // ---- szp 北西 ----
  ev(
    "belye-nochi-reis", "gain", ["szp"], "🚤", 260,
    "An extra White Nights river cruise shift|Un turno extra de crucero fluvial en las noches blancas|Un service supplémentaire de croisière fluviale pendant les nuits blanches|白夜の追加遊覧船便で働く",
    "A boat operator running late-night White Nights cruises needed one more deckhand to handle the unusually long queue of people wanting to see the bridges raise at two in the morning, and the shift paid double for the odd hours. The bridges over the Neva only lift for a few hours each summer night, and boats time their whole route around that narrow window.|Un operador de barcos que hacía cruceros nocturnos de las noches blancas necesitaba un marinero más para atender la cola inusualmente larga de gente que quería ver alzarse los puentes a las dos de la madrugada.|Un exploitant de bateaux menant des croisières nocturnes des nuits blanches avait besoin d'un matelot de plus pour gérer la file inhabituellement longue de gens voulant voir les ponts se lever à deux heures du matin.|白夜の深夜遊覧船を運航する業者は、午前2時の跳ね橋を見ようとする異例の長い行列をさばくため甲板員をもう一人求めており、その変則的な時間帯のぶん倍額が支払われた。ネヴァ川の橋は夏の夜のほんの数時間しか上がらず、船はその狭い時間帯にすべての運航を合わせている。",
  ),
  ev(
    "kizhi-remeslo-lavka", "gain", ["szp"], "🪵", 220,
    "Restocking a Karelian craft stall for Kizhi tourists|Reponiendo un puesto de artesanía carelia para turistas de Kizhi|Réapprovisionner un stand d'artisanat carélien pour les touristes de Kiji|キジ島行き観光客向けのカレリア工芸品店を補充する",
    "The boat-ticket kiosk's neighbouring craft stall had sold out of carved wooden spoons faster than expected after a tour bus unloaded early, and helping unpack a fresh crate before the next boat left earned a share of the morning's sales. Petrozavodsk still serves as the mainland gateway for every visitor heading out to see Kizhi Island's wooden churches.|El puesto de artesanía vecino al quiosco de billetes de barco se había quedado sin cucharas de madera talladas más rápido de lo esperado tras la llegada anticipada de un autobús turístico.|Le stand d'artisanat voisin du kiosque à billets de bateau s'était retrouvé à court de cuillères en bois sculptées plus vite que prévu après le déchargement anticipé d'un car de touristes.|観光バスが早めに到着したせいで、船の切符売り場の隣にある工芸品店は思ったより早く彫刻入りの木製スプーンを売り切ってしまい、次の船が出る前に新しい木箱を開ける手伝いをすると、その朝の売上の分け前をもらえた。ペトロザヴォーツクはいまもキジ島の木造聖堂群を見に行く旅行者すべての本土側の玄関口を担っている。",
  ),
  ev(
    "yantar-poddelka", "loss", ["szp"], "💠", 200,
    "A pricey amber souvenir turns out to be plastic|Un caro recuerdo de ámbar resulta ser plástico|Un souvenir d'ambre coûteux s'avère être en plastique|高値の琥珀土産がプラスチック製だった",
    "The stallholder swore the honey-coloured pendant was genuine Baltic amber, warm to the touch and full of tiny trapped air bubbles just like the real thing, and only a jeweller back home confirmed it was cast resin. Real amber sinks in ordinary tap water and floats only in strong salt water, a simple test almost nobody thinks to try at the market.|El vendedor juraba que el colgante color miel era ámbar báltico auténtico, cálido al tacto y lleno de diminutas burbujas de aire atrapadas como el de verdad, y solo un joyero en casa confirmó que era resina moldeada.|Le vendeur jurait que le pendentif couleur miel était de l'ambre balte authentique, chaud au toucher et plein de minuscules bulles d'air comme le vrai, et seul un bijoutier chez lui confirma qu'il s'agissait de résine moulée.|露天の売り手は、蜂蜜色のペンダントが本物のバルト琥珀で、手に取ると温かく本物そっくりの小さな気泡まで入っていると請け合ったが、帰国後に宝石商が確かめたところ成型樹脂だと分かった。本物の琥珀は真水には沈み、濃い塩水にしか浮かない。市場でそれを試そうと思う人はまずいない。",
  ),

  // ---- yug 南部・カフカス ----
  ev(
    "krasnodar-vinograd-sbor", "gain", ["yug"], "🍇", 260,
    "Helping bring in the grape harvest|Ayudando a recoger la cosecha de uva|Aider à rentrer les vendanges|ぶどうの収穫を手伝う",
    "A vineyard short-handed before an early frost warning paid a flat rate per basket to anyone willing to work fast through a hot afternoon, and the chernozem-black soil under the vines stained hands and boots alike by the end of the row. The mild Kuban climate, unusually warm for Russia, keeps vineyards here productive well past where the growing season ends elsewhere in the country.|Un viñedo con falta de personal antes de una alerta de helada temprana pagaba una tarifa fija por cesto a quien quisiera trabajar rápido durante una tarde calurosa.|Un vignoble en sous-effectif avant une alerte de gel précoce payait un tarif fixe par panier à quiconque acceptait de travailler vite sous une après-midi chaude.|早霜の警報を前に人手が足りなかったぶどう畑は、暑い午後を通して速く働ける者に籠一杯ごとの定額を払った。列の端まで来る頃には、つるの下の黒いチェルノーゼムの土が手も長靴も同じように染めていた。ロシアにしては珍しく温暖なクバンの気候は、国内の他の地域より生育期をずっと長く保っている。",
  ),
  ev(
    "sochi-plyazh-kafe-podrabotka", "gain", ["yug"], "🏖️", 240,
    "Extra tips waiting tables at a beachfront café|Propinas extra sirviendo mesas en un café frente a la playa|Pourboires supplémentaires en servant les tables d'un café en bord de plage|海辺のカフェで臨時のウェイター仕事をしてチップを得る",
    "A beachfront café short a waiter during peak season paid cash for a busy evening shift balancing trays between sun loungers and umbrellas, and the tips alone came to more than the wage. Sochi's subtropical microclimate keeps the beach season running long after resorts further up the Black Sea coast have quietly closed for the year.|Un café frente a la playa con falta de un camarero en temporada alta pagó en efectivo por un turno de noche muy ajetreado sirviendo bandejas entre tumbonas y sombrillas.|Un café en bord de plage manquant d'un serveur en haute saison paya en liquide pour un service du soir chargé, jonglant avec les plateaux entre les transats et les parasols.|繁忙期に給仕が足りなかった海辺のカフェは、デッキチェアとパラソルの間を盆を運んで駆け回る忙しい夜の勤務に現金で払ってくれ、チップだけで賃金を上回った。ソチの亜熱帯性の小気候のおかげで、黒海沿いの他の保養地がとっくに店じまいしたあともビーチシーズンは長く続く。",
  ),
  ev(
    "plyazh-solnechnyi-ozhog", "loss", ["yug"], "☀️", 200,
    "A full day at the beach ends in sunburn|Un día entero de playa termina en quemadura solar|Une journée entière à la plage se termine en coup de soleil|一日中ビーチで過ごして日焼けする",
    "The Black Sea breeze felt cool enough to forget the strength of the sun overhead, and by evening a chemist's shop was doing brisk business in aftersun lotion for a queue of noticeably pink tourists. Locals joke that everyone learns the same lesson exactly once, usually on their first visit.|La brisa del mar Negro se sentía lo bastante fresca como para olvidar la fuerza del sol arriba, y al anochecer una farmacia hacía buen negocio con loción para después del sol para una fila de turistas notablemente rosados.|La brise de la mer Noire semblait assez fraîche pour faire oublier la force du soleil, et le soir venu, une pharmacie faisait de bonnes affaires en lotion après-soleil pour une file de touristes visiblement roses.|黒海から吹く風が涼しく感じられたせいで、頭上の日差しの強さをつい忘れてしまい、夕方には薬局がアフターサンローションを求める目に見えて赤くなった観光客の行列でにぎわっていた。地元の人は、誰もがちょうど一度だけ、たいてい最初の訪問でこの教訓を学ぶのだと冗談を言う。",
  ),

  // ---- vlg ヴォルガ・ウラル ----
  ev(
    "volga-barzha-pogruzka", "gain", ["vlg"], "🚢", 240,
    "Helping load a Volga river barge|Ayudando a cargar una barcaza del Volga|Aider à charger une péniche sur la Volga|ヴォルガ川のはしけの積み込みを手伝う",
    "A cargo barge tied up for the night needed an extra pair of hands to finish loading crates before the river's water level dropped with the morning's lock release, and the foreman paid in cash rather than wait for paperwork. Barge traffic still moves a significant share of freight along the Volga, cheaper than rail for anything that isn't in a hurry.|Una barcaza de carga amarrada para pasar la noche necesitaba manos extra para terminar de cargar cajas antes de que el nivel del río bajara con la apertura matutina de la esclusa.|Une péniche de fret amarrée pour la nuit avait besoin de bras supplémentaires pour finir de charger les caisses avant que le niveau du fleuve ne baisse avec l'ouverture matinale de l'écluse.|夜どまりしていた貨物はしけは、朝の閘門開放で川の水位が下がる前に木箱の積み込みを終えるための手を求めており、親方は書類を待たずに現金で払った。はしけの往来はいまもヴォルガ川沿いの貨物のかなりの割合を運び、急がない荷物には鉄道より安く済む。",
  ),
  ev(
    "kazan-bazar-perevod", "gain", ["vlg"], "🗣️", 220,
    "Translating for a tour group at the Kazan bazaar|Traduciendo para un grupo turístico en el bazar de Kazán|Traduire pour un groupe de touristes au bazar de Kazan|カザンのバザールで観光客の通訳をする",
    "A tour group's guide had lost his voice midway through a haggling session over Tatar leather goods, and stepping in to translate between the stallholder's Tatar-accented Russian and the group's questions was rewarded with a cut of everyone's savings. Kazan's markets still carry on trade in a mix of Russian and Tatar that shifts depending on who is speaking to whom.|El guía de un grupo turístico había perdido la voz a mitad de un regateo por artículos de cuero tártaros, y intervenir para traducir entre el ruso con acento tártaro del vendedor y las preguntas del grupo fue recompensado con parte de los ahorros de todos.|Le guide d'un groupe de touristes avait perdu la voix en pleine négociation pour des articles en cuir tatars, et intervenir pour traduire entre le russe à l'accent tatar du vendeur et les questions du groupe fut récompensé par une part des économies de chacun.|観光団の案内人が、タタール革製品の値切り交渉の途中で声を失ってしまい、店主のタタール訛りのロシア語と団体の質問のあいだを通訳してやると、みんなの浮いたお金の分け前をもらえた。カザンの市場ではいまも、話す相手によってロシア語とタタール語が入り混じる取引が続いている。",
  ),
  ev(
    "uralskii-samotsvet-poddelka", "loss", ["vlg"], "💎", 220,
    "A Ural gemstone turns out to be coloured glass|Una piedra preciosa de los Urales resulta ser vidrio de color|Une pierre précieuse de l'Oural s'avère être du verre coloré|ウラルの宝石が色付きガラスだった",
    "The market stall's malachite-green stone was sold as a piece of genuine Ural mineral wealth, the same region that has produced real malachite and emeralds for centuries, and only a scratch test back at the hotel revealed the too-perfect shine of moulded glass. Genuine stones from the region's mines usually come with a small certificate, precisely because this trick is common enough to expect.|La piedra verde malaquita del puesto del mercado se vendía como una auténtica riqueza mineral de los Urales, la misma región que ha producido malaquita y esmeraldas reales durante siglos, y solo una prueba de rayado en el hotel reveló el brillo demasiado perfecto del vidrio moldeado.|La pierre vert malachite du stand de marché était vendue comme une véritable richesse minérale de l'Oural, cette même région produisant malachite et émeraudes authentiques depuis des siècles, et seul un test de rayure à l'hôtel révéla l'éclat trop parfait du verre moulé.|市場の露店で本物のウラルの鉱物資源として売られていた孔雀石色の石は、何世紀も本物の孔雀石やエメラルドを産してきたその地方のものだと言われたが、ホテルに戻って引っかき試験をしてみると、成型ガラスの出来すぎた輝きが露見した。この地方の鉱山から出る本物の石には、こうした手口が想定されているからこそ小さな鑑定書が添えられるのが普通である。",
  ),

  // ---- sib シベリア ----
  ev(
    "taiga-griby-provodnik", "gain", ["sib"], "🍄", 260,
    "Guiding mushroom pickers deep into the taiga|Guiando a recolectores de setas hasta lo profundo de la taiga|Guider des cueilleurs de champignons au cœur de la taïga|きのこ狩りの一団をタイガの奥へ案内する",
    "A group of city visitors wanted to try foraging but had no idea which birch groves actually held porcini this late in the season, and a couple of hours leading them to a well-remembered patch was paid generously in cash and, half-jokingly, in a share of the basket. Locals treat their best mushroom spots the way others treat a bank account number, rarely shared outside the family.|Un grupo de visitantes de la ciudad quería probar a recolectar pero no tenía ni idea de qué bosques de abedules tenían boletos tan tarde en la temporada.|Un groupe de citadins voulait s'essayer à la cueillette mais n'avait aucune idée des bosquets de bouleaux qui recelaient encore des cèpes si tard dans la saison.|都会から来た一団はきのこ狩りを試したがっていたが、この時期にどの白樺林にポルチーニが残っているのか見当もつかなかった。よく覚えている場所まで数時間案内すると、現金に加え半ば冗談で籠の分け前まで気前よく渡された。地元の人は自分の一番のきのこ場所を、他人なら銀行口座の番号のように扱い、家族の外にはめったに教えない。",
  ),
  ev(
    "poezd-dolgaya-stoyanka-podrabotka", "gain", ["sib"], "🚂", 220,
    "Helping the attendant during a long station stop|Ayudando a la encargada durante una larga parada en la estación|Aider l'employée pendant un long arrêt en gare|長い停車時間に車掌を手伝う",
    "A twenty-minute stop at a Siberian junction gave the carriage attendant just enough time to restock linen and empty the samovar's ash, and an extra pair of hands carrying bundles down the platform and back earned a folded banknote before the whistle blew. Trans-Siberian schedules build in these longer stops on purpose, giving both crew and passengers a chance to stretch out on the platform.|Una parada de veinte minutos en un cruce siberiano dio a la encargada del vagón el tiempo justo para reponer ropa de cama y vaciar las cenizas del samovar.|Un arrêt de vingt minutes à un embranchement sibérien donna à l'employée du wagon juste le temps de réapprovisionner le linge et de vider les cendres du samovar.|シベリアのある分岐駅での20分の停車は、車掌がリネンを補充しサモワールの灰を捨てるのにちょうど足りる時間だった。ホームを行き来して荷物を運ぶ手伝いをすると、発車の笛が鳴る前に折りたたんだ紙幣を渡された。シベリア鉄道のダイヤはわざとこうした長い停車を組み込み、乗務員にも乗客にもホームで体を伸ばす機会を与えている。",
  ),
  ev(
    "sibirskii-moroz-lechenie", "loss", ["sib"], "🥶", 220,
    "A cold snap leads to a frostbite scare|Una ola de frío provoca un susto de congelación|Une vague de froid entraîne une frayeur d'engelure|急な寒波で凍傷になりかける",
    "A short walk between the station and the hotel felt manageable in a city coat, right up until the fingertips went numb faster than expected in weather that locals had shrugged off as merely brisk. A pharmacy visit for cream and a stern lecture about layering cost more than the coat itself was worth back home.|Un corto paseo entre la estación y el hotel parecía manejable con un abrigo urbano, hasta que las puntas de los dedos se entumecieron más rápido de lo esperado con un tiempo que los lugareños habían restado importancia calificándolo de solo fresco.|Une courte marche entre la gare et l'hôtel semblait gérable avec un manteau de ville, jusqu'à ce que le bout des doigts s'engourdisse plus vite que prévu par un temps que les habitants avaient balayé d'un revers de main comme simplement frisquet.|駅からホテルまでの短い道のりは街用のコートでも大丈夫そうに思えたが、地元の人が「少し肌寒い程度」と受け流していた気温の中で、指先は思ったより早く感覚を失っていった。薬局でクリームを買い、重ね着についての手厳しい説教を受けるだけで、国元でのコート代よりも高くついた。",
  ),

  // ---- dv 極東 ----
  ev(
    "vladivostok-rybnyi-rynok-podmoga", "gain", ["dv"], "🐟", 260,
    "Helping sort the morning catch at the fish market|Ayudando a clasificar la pesca matutina en el mercado de pescado|Aider à trier la pêche du matin au marché aux poissons|朝の水揚げを魚市場で仕分ける手伝い",
    "A crab boat had come in with a bigger haul than the usual crew could sort before the market opened, and a couple of hours spent separating king crab from the smaller catch by size earned a cut of the morning's sale plus a crab to take away. Vladivostok's harbour still supplies a large share of the country's crab and salmon, most of it shipped straight on to markets further west.|Un barco cangrejero había vuelto con una pesca mayor de lo que la tripulación habitual podía clasificar antes de que abriera el mercado.|Un bateau à crabes était rentré avec une prise plus grosse que ce que l'équipage habituel pouvait trier avant l'ouverture du marché.|カニ漁船が、市場が開く前に通常の乗組員だけでは仕分けきれないほどの大漁で戻ってきており、タラバガニを大きさ別に選り分ける数時間の手伝いをすると、その朝の売上の分け前とカニ一杯を持ち帰らせてもらえた。ウラジオストクの港はいまも国内のカニと鮭の大きな割合を供給し、そのほとんどはそのまま西方の市場へ運ばれていく。",
  ),
  ev(
    "kamchatka-vulkan-gid", "gain", ["dv"], "🌋", 240,
    "Guiding a small group toward Kamchatka's volcanoes|Guiando a un pequeño grupo hacia los volcanes de Kamchatka|Guider un petit groupe vers les volcans du Kamtchatka|小さな一団をカムチャツカの火山へ案内する",
    "A group of visitors who had only just arrived by plane, the only way in or out, wanted a same-day look at the steaming peaks above the city, and knowing exactly which ridge road offered the clearest view without a permit earned a generous thank-you. With no road or rail link to the rest of the country, every guide here works entirely by word of mouth between arriving flights.|Un grupo de visitantes recién llegados en avión, la única forma de entrar o salir, quería ver el mismo día los picos humeantes sobre la ciudad.|Un groupe de visiteurs tout juste arrivés par avion, seul moyen d'entrer ou de sortir, voulait voir le jour même les sommets fumants au-dessus de la ville.|飛行機で着いたばかりの一団が、それがこの町への唯一の出入り口なのだが、許可証なしでも一番よく見える尾根道をちょうど知っていたので、その日のうちに町の上に立ち上る噴煙の峰を見に案内すると、気前のいい謝礼をもらえた。国内の他の地域と結ぶ道路も鉄道もないこの町では、ガイドの仕事はすべて到着する便のあいだの口コミだけで回っている。",
  ),
  ev(
    "sakhalin-parom-zaderzhka", "loss", ["dv"], "⛴️", 260,
    "A delayed Sakhalin ferry forces an extra night's stay|Un ferri retrasado a Sajalín obliga a una noche extra de estadía|Un ferry retardé pour Sakhaline force une nuit supplémentaire|遅延したサハリン行きフェリーで余計な一泊",
    "Rough seas in the strait pushed the crossing back a full day with no real warning beyond a handwritten notice taped to the ticket window, leaving an unplanned night's hotel bill to cover before the next sailing. The strait between the mainland and the island freezes and roughens often enough that seasoned travellers build a spare day into the schedule as a matter of habit.|El mar agitado en el estrecho retrasó la travesía un día entero sin más aviso real que una nota escrita a mano pegada en la ventanilla de billetes, dejando una factura de hotel no planeada que cubrir antes de la siguiente salida.|Une mer agitée dans le détroit repoussa la traversée d'une journée entière, sans autre avertissement qu'un avis manuscrit collé au guichet, laissant une note d'hôtel imprévue à couvrir avant le départ suivant.|海峡の荒れた海が、切符売り場に貼られた手書きの張り紙以外にろくな予告もなく航海を丸一日遅らせ、次の便までの予定外の宿泊代を払う羽目になった。本土と島を隔てる海峡はしばしば凍結や荒天に見舞われるため、旅慣れた者は習慣として日程に予備日を組み込んでいる。",
  ),
];
