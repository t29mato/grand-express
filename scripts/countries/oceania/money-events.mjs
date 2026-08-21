/**
 * オセアニア大陸盤面の青マス・赤マスで起きる出来事(16件。増8・減8)。
 *
 * 地方コード: mel=メラネシア / mic=ミクロネシア / pol=ポリネシア
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方でも必ず gain と loss が1件は引ける(他の盤面と同じ約束)。
 * そのうえで3地方それぞれに4件(増2・減2)を置いている。
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

export const OCEANIA_MONEY_EVENTS = [
  // ---- 全地方共通・通年 ----
  ev(
    "deckhand-tip", "gain", [], "⚓", 210,
    "A grateful deckhand hands over a folded note|Un marinero agradecido entrega un billete doblado|Un matelot reconnaissant tend un billet plié|感謝した甲板員が折り畳んだ紙幣を渡してくる",
    "A hand free during the scramble to lash down cargo before a squall hit was worth more to the crew than its owner realised, and the deckhand pressed a folded note into that same hand once the ropes were secure and the rain had passed.|Una mano libre durante la carrera por atar la carga antes de que llegara un chubasco valió para la tripulación más de lo que su dueño imaginaba, y el marinero le puso un billete doblado en esa misma mano en cuanto las cuerdas quedaron aseguradas y pasó la lluvia.|Une main libre pendant la course pour arrimer la cargaison avant qu'une grain n'éclate valait pour l'équipage plus que son propriétaire ne l'imaginait, et le matelot lui glissa un billet plié dans cette même main une fois les cordages assurés et la pluie passée.|スコールが来る前に貨物を縛り付ける大慌ての作業中、空いた手一つがどれほど乗組員の助けになったか、当人は気づいていなかった。ロープが固定され雨が過ぎ去ると、甲板員はまさにその手に折り畳んだ紙幣を握らせた。",
  ),
  ev(
    "cash-only-market-find", "gain", [], "🥭", 190,
    "A market stall sells produce cheaper than you expected|Un puesto del mercado vende productos más baratos de lo esperado|Un étal de marché vend des produits moins cher que prévu|市場の屋台が思ったより安く売ってくれる",
    "The stallholder waved off the change owed on a small note, saying the fruit would only spoil before the next boat anyway, and the leftover coins stayed exactly where they landed: in a traveler's own pocket.|La vendedora del puesto rechazó el cambio que se le debía de un billete pequeño, diciendo que la fruta solo se echaría a perder antes del próximo barco, y las monedas sobrantes se quedaron exactamente donde cayeron: en el bolsillo del viajero.|La tenancière de l'étal a renoncé à rendre la monnaie sur un petit billet, disant que le fruit ne ferait que pourrir avant le prochain bateau de toute façon, et les pièces restantes sont restées exactement là où elles étaient tombées : dans la poche du voyageur.|屋台の店主は小額紙幣のお釣りを受け取らず、どのみち次の船が来る前に果物は傷んでしまうからと言った。余った硬貨はそのまま、旅人自身のポケットに収まった。",
  ),
  ev(
    "missed-tide-fee", "loss", [], "🌊", 200,
    "The tide turns before the boat is loaded|La marea cambia antes de que el barco esté cargado|La marée tourne avant que le bateau ne soit chargé|荷積みが終わる前に潮が変わる",
    "The captain had warned that the tide waits for no manifest, and when the last crate went aboard twenty minutes late, the boat had to burn extra fuel fighting the current out of the channel, a cost quietly passed on to every passenger's fare.|El capitán había advertido que la marea no espera a ningún manifiesto, y cuando la última caja subió a bordo veinte minutos tarde, el barco tuvo que quemar combustible extra luchando contra la corriente para salir del canal, un coste que se repartió discretamente entre el pasaje de todos.|Le capitaine avait prévenu que la marée n'attend aucun manifeste, et quand la dernière caisse est montée à bord avec vingt minutes de retard, le bateau a dû brûler du carburant supplémentaire en luttant contre le courant pour sortir du chenal, un coût discrètement répercuté sur le billet de chaque passager.|船長は、潮は積荷目録を待ってはくれないと警告していた。最後の木箱が20分遅れで積み込まれると、船は水路を出るのに逆潮と戦って余分な燃料を焼くはめになり、その費用はそっと全乗客の運賃に上乗せされた。",
  ),
  ev(
    "customs-form-fee", "loss", [], "📋", 180,
    "A customs form needs a stamp that costs extra|Un formulario de aduanas necesita un sello que cuesta extra|Un formulaire de douane nécessite un tampon payant|税関の書類に追加料金の要る印が必要になる",
    "The form itself was free; the stamp certifying it was not, and the small window that sells them keeps hours nobody has ever managed to fully explain, open just long enough to separate a traveler from a little more cash than expected.|El formulario en sí era gratis; el sello que lo certificaba no, y la pequeña ventanilla que los vende mantiene un horario que nadie ha logrado explicar del todo, abierta justo el tiempo suficiente para separar a un viajero de algo más de dinero del esperado.|Le formulaire lui-même était gratuit ; le tampon qui le certifiait ne l'était pas, et le petit guichet qui les vend garde des horaires que personne n'a jamais réussi à expliquer entièrement, ouvert juste assez longtemps pour séparer un voyageur d'un peu plus d'argent que prévu.|書類そのものは無料だったが、それを証明する印は有料だった。それを売る小さな窓口の営業時間は誰も完全には説明できたためしがなく、旅人から予想より少し多めの現金を切り離すのにちょうど足りるだけ開いている。",
  ),

  // ---- mel: メラネシア ----
  ev(
    "sevusevu-gift", "gain", ["mel"], "🍶", 240,
    "A village welcome ceremony ends with a gift in return|Una ceremonia de bienvenida en el pueblo termina con un regalo a cambio|Une cérémonie d'accueil au village s'achève par un cadeau en retour|村の歓迎の儀式が返礼の贈り物で終わる",
    "Presenting kava root at the sevusevu ceremony was meant as a gift with nothing expected back, but the chief pressed woven mats and a little cash into the visitor's hands anyway, insisting hospitality only works if it runs both directions.|Presentar la raíz de kava en la ceremonia sevusevu se pensaba como un regalo sin nada esperado a cambio, pero el jefe puso de todos modos esteras tejidas y algo de dinero en las manos del visitante, insistiendo en que la hospitalidad solo funciona si corre en ambos sentidos.|Présenter la racine de kava lors de la cérémonie du sevusevu se voulait un cadeau sans rien attendre en retour, mais le chef a tout de même glissé des nattes tissées et un peu d'argent dans les mains du visiteur, insistant sur le fait que l'hospitalité ne fonctionne que si elle va dans les deux sens.|セヴセヴの儀式でカヴァの根を差し出すのは、見返りを求めない贈り物のはずだった。それでも首長は編んだむしろと少しの現金を訪問者の手に握らせ、もてなしは両方向に流れて初めて成り立つのだと言い張った。",
  ),
  ev(
    "shell-money-trade", "gain", ["mel"], "🐚", 260,
    "A trader offers cash for a curious traveler's souvenir|Un comerciante ofrece dinero por el recuerdo de un viajero curioso|Un commerçant offre de l'argent contre le souvenir d'un voyageur curieux|商人が旅行者の物珍しい土産に現金を申し出る",
    "A string of polished shells bought as a curiosity turned out to be worth more to a passing trader than it cost, and the trade was done with a handshake before either side had time to haggle properly.|Una sarta de conchas pulidas comprada por curiosidad resultó valer más para un comerciante de paso de lo que costó, y el trato se cerró con un apretón de manos antes de que ninguna de las partes tuviera tiempo de regatear como es debido.|Un collier de coquillages polis acheté par curiosité s'est révélé valoir plus pour un commerçant de passage que son prix d'achat, et l'affaire s'est conclue par une poignée de main avant que l'une ou l'autre partie n'ait eu le temps de vraiment marchander.|物珍しさで買った磨いた貝の紐が、通りがかりの商人にとって買値より高い値打ちのものだと分かり、どちらもろくに値切る間もないまま握手一つで取引が成立した。",
  ),
  ev(
    "cyclone-shutter-cost", "loss", ["mel"], "🌀", 230,
    "A cyclone warning means paying for emergency shutters|Un aviso de ciclón obliga a pagar por persianas de emergencia|Une alerte cyclonique oblige à payer pour des volets d'urgence|サイクロン警報で緊急の雨戸代がかかる",
    "The guesthouse owner apologised for the sudden charge while nailing plywood over the last open window, explaining that everyone on the island pays the carpenter double once the warning flag goes up, no matter how long they've been a customer.|El dueño de la pensión se disculpó por el cargo repentino mientras clavaba contrachapado sobre la última ventana abierta, explicando que todos en la isla le pagan al carpintero el doble en cuanto se iza la bandera de aviso, sin importar cuánto tiempo lleven siendo clientes.|Le propriétaire de la pension s'est excusé pour ce coût soudain en clouant du contreplaqué sur la dernière fenêtre ouverte, expliquant que tout le monde sur l'île paie le charpentier le double dès que le drapeau d'alerte est hissé, peu importe depuis combien de temps on est client.|ゲストハウスの主人は、最後に残った窓に合板を打ち付けながら突然の追加料金を詫びた。警報旗が上がった途端、島の誰もが大工に二倍払うのだという。どれだけ長い付き合いの客でも例外は無い。",
  ),
  ev(
    "landslip-detour-fare", "loss", ["mel"], "🚧", 210,
    "A washed-out mountain road forces an expensive detour|Un camino de montaña arrasado obliga a un desvío caro|Une route de montagne emportée force un détour coûteux|土砂崩れの山道が高くつく迂回を強いる",
    "The direct road down from the highlands had slid away in the night's rain, and the only alternative was a longer route with a driver who knew every switchback but charged accordingly for the extra fuel and hours.|La carretera directa que bajaba de las tierras altas se había desprendido con la lluvia de la noche, y la única alternativa era una ruta más larga con un conductor que conocía cada curva pero cobraba en consecuencia por el combustible y las horas de más.|La route directe descendant des hautes terres avait glissé sous la pluie de la nuit, et la seule alternative était un trajet plus long avec un chauffeur connaissant chaque lacet mais facturant en conséquence le carburant et les heures supplémentaires.|高地から下る直行路は夜の雨で崩れ落ちてしまい、唯一の代わりはあらゆるつづら折りを知り尽くした運転手による遠回りの道だったが、余分な燃料と時間の分だけ相応の料金を取られた。",
  ),

  // ---- mic: ミクロネシア ----
  ev(
    "diveboat-guide-tip", "gain", ["mic"], "🤿", 250,
    "A dive guide shares a wreck-diving tip that pays off|Un guía de buceo comparte un consejo de buceo en pecios que da fruto|Un guide de plongée partage un conseil sur les épaves qui porte ses fruits|ダイブガイドの沈没船情報が思わぬ収入になる",
    "A guide who usually keeps the best entry point to a wreck to themselves let it slip in exchange for help hauling tanks up a coral beach, and the tip turned into an unexpectedly generous round of drinks bought by grateful fellow divers.|Un guía que normalmente se guarda para sí el mejor punto de entrada a un pecio lo dejó escapar a cambio de ayuda para subir las botellas por una playa de coral, y el dato se tradujo en una ronda de bebidas inesperadamente generosa pagada por otros buceadores agradecidos.|Un guide qui garde d'habitude pour lui le meilleur point d'entrée d'une épave l'a laissé échapper en échange d'aide pour monter les bouteilles sur une plage de corail, et le tuyau s'est transformé en une tournée de boissons généreuse et inattendue offerte par des plongeurs reconnaissants.|普段は沈没船への一番よい進入点を教えないガイドが、珊瑚の浜でタンクを運び上げるのを手伝った礼にそれを漏らしてくれた。その情報のおかげで、感謝したダイバー仲間から思いがけず気前のよい一杯をおごってもらえた。",
  ),
  ev(
    "islandhopper-seat-swap", "gain", ["mic"], "✈️", 220,
    "A window seat swap earns an unexpected thank-you|Un cambio de asiento junto a la ventanilla gana un agradecimiento inesperado|Un échange de siège côté hublot vaut un remerciement inattendu|窓際の席を譲って思わぬ礼をもらう",
    "Trading a window seat on the short inter-island hop for an aisle one seemed like no sacrifice at all, until the grateful passenger turned out to be flying home to a family business and pressed a tip into the traveler's hand at the gate.|Cambiar un asiento de ventanilla en el corto salto interinsular por uno de pasillo no parecía ningún sacrificio, hasta que el pasajero agradecido resultó volar a casa hacia un negocio familiar y le puso una propina en la mano al viajero en la puerta.|Échanger un siège côté hublot sur le court saut inter-îles contre un siège côté couloir ne semblait pas un sacrifice, jusqu'à ce que le passager reconnaissant, rentrant chez lui pour une affaire familiale, glisse un pourboire dans la main du voyageur à la porte d'embarquement.|島間の短い便で窓際の席を通路側と交換するくらい何でもないと思っていたが、その感謝した乗客は実家の商売のために帰郷するところで、搭乗口でチップを手に握らせてくれた。",
  ),
  ev(
    "quarantine-inspection-fee", "loss", ["mic"], "🦟", 220,
    "A biosecurity inspection charges for a second look|Una inspección de bioseguridad cobra por una segunda revisión|Une inspection de biosécurité facture un second contrôle|検疫が再検査の料金を請求する",
    "An inspector found a seed pod nobody could identify stuck to a boot sole and, rather than risk it, ordered a full second inspection of every bag, billed at the standard rate no matter how thoroughly the first one had already gone.|Un inspector encontró una vaina de semilla que nadie pudo identificar pegada a la suela de una bota y, en vez de arriesgarse, ordenó una segunda inspección completa de todas las bolsas, facturada a la tarifa habitual sin importar lo minuciosa que ya hubiera sido la primera.|Un inspecteur a trouvé une gousse que personne ne pouvait identifier collée à une semelle et, plutôt que de prendre un risque, a ordonné une seconde inspection complète de tous les sacs, facturée au tarif habituel quelle qu'ait déjà été la minutie de la première.|検査官が靴底にくっついた誰にも同定できない種の莢を見つけ、危険を冒すよりはと、すべての荷物の完全な再検査を命じた。最初の検査がどれほど念入りだったかに関わらず、通常料金が請求された。",
  ),
  ev(
    "airstrip-fog-lodging", "loss", ["mic"], "🌫️", 240,
    "Fog grounds the flight and an extra night's lodging follows|La niebla deja el vuelo en tierra y sigue una noche extra de alojamiento|Le brouillard cloue le vol au sol et une nuit d'hôtel supplémentaire s'ensuit|霧で便が欠航し、もう一泊の宿代がかかる",
    "The single daily flight sat at the gate for six hours before the fog finally lifted too late to depart, and the only guesthouse within walking distance of the airstrip filled its last room at exactly the going rate, fog or no fog.|El único vuelo diario esperó en la puerta seis horas antes de que la niebla por fin se disipara demasiado tarde para partir, y la única pensión a pie del aeródromo llenó su última habitación exactamente a la tarifa habitual, con niebla o sin ella.|L'unique vol quotidien est resté à la porte d'embarquement six heures avant que le brouillard ne se lève enfin, trop tard pour décoller, et l'unique pension à distance de marche de la piste a rempli sa dernière chambre exactement au tarif habituel, brouillard ou pas.|その日たった一便の飛行機は6時間もゲートで待たされたが、霧が晴れたのは出発するには遅すぎる時刻だった。滑走路から歩ける唯一の宿は、霧があろうとなかろうと通常料金のまま最後の一部屋を埋めた。",
  ),

  // ---- pol: ポリネシア ----
  ev(
    "tapa-cloth-sale", "gain", ["pol"], "🎨", 250,
    "A hand-beaten tapa cloth sells for more than expected|Una tela tapa batida a mano se vende por más de lo esperado|Un tissu tapa battu à la main se vend plus cher que prévu|手作りのタパ布が思ったより高く売れる",
    "A length of bark cloth bought as a wall hanging turned out to carry a family's own painted pattern, rare enough that a visiting collector offered well over the asking price on the spot, no bargaining required.|Un trozo de tela de corteza comprado como colgante de pared resultó llevar un patrón pintado propio de una familia, lo bastante raro como para que un coleccionista de visita ofreciera bastante más del precio pedido allí mismo, sin necesidad de regatear.|Un morceau de tissu d'écorce acheté comme tenture murale s'est révélé porter le motif peint propre à une famille, assez rare pour qu'un collectionneur de passage en offre bien plus que le prix demandé, sur-le-champ, sans marchandage.|壁掛け用にと買ったタパ布の一枚が、ある一族独自の彩色文様を持つ珍しいものだと分かり、たまたま来ていた収集家がその場で言い値をはるかに上回る額を、値切りもせずに申し出た。",
  ),
  ev(
    "whale-season-tip-share", "gain", ["pol"], "🐋", 260,
    "A whale-watching guide shares the season's tip pool|Un guía de avistamiento de ballenas comparte el fondo de propinas de la temporada|Un guide d'observation des baleines partage la cagnotte de pourboires de la saison|ホエールウォッチングのガイドが季節のチップを分けてくれる",
    "A slow morning with no whales in sight turned into an afternoon of steady sightings once the guide changed tactics on a hunch, and the grateful boat's tip jar, split evenly at day's end, worked out better than expected for everyone aboard.|Una mañana lenta sin ballenas a la vista se convirtió en una tarde de avistamientos constantes cuando el guía cambió de táctica siguiendo una corazonada, y el bote de propinas del barco agradecido, repartido a partes iguales al final del día, salió mejor de lo esperado para todos a bordo.|Une matinée calme sans baleine en vue s'est transformée en un après-midi d'observations régulières quand le guide a changé de tactique sur une intuition, et la cagnotte de pourboires du bateau reconnaissant, partagée équitablement en fin de journée, s'est révélée meilleure que prévu pour tout le monde à bord.|クジラの見えない静かな朝が、ガイドが勘で戦術を変えたことで着実に観測できる午後に変わった。感謝に沸いた船のチップ箱は一日の終わりに均等に分けられ、乗船者全員にとって思ったより実入りのよいものになった。",
  ),
  ev(
    "kingtide-sandbag-levy", "loss", ["pol"], "🏝️", 220,
    "A king tide levy pays for emergency sandbags|Un gravamen por marea viva paga sacos de arena de emergencia|Une taxe de grande marée finance des sacs de sable d'urgence|大潮の徴収金で緊急の土のうをまかなう",
    "A community notice board announced a small emergency levy on every visitor and resident alike to cover sandbags for the coming king tide, collected at the guesthouse desk with a shrug and a receipt.|Un tablón comunitario anunció un pequeño gravamen de emergencia a cada visitante y residente por igual para cubrir los sacos de arena de la próxima marea viva, cobrado en el mostrador de la pensión con un encogimiento de hombros y un recibo.|Un panneau d'affichage communautaire a annoncé une petite taxe d'urgence sur chaque visiteur et résident pour couvrir les sacs de sable de la prochaine grande marée, prélevée au bureau de la pension avec un haussement d'épaules et un reçu.|地域の掲示板に、来る大潮に備えた土のう代として訪問者にも住民にも一律の小さな緊急徴収金を課すとの知らせが出た。ゲストハウスの受付で肩をすくめられながら領収書とともに徴収された。",
  ),
  ev(
    "supplyship-delay-storage", "loss", ["pol"], "📦", 200,
    "A delayed supply ship means paying to store your cargo|Un barco de suministro retrasado obliga a pagar por guardar la carga|Un navire de ravitaillement retardé oblige à payer pour stocker le fret|補給船の遅れで荷物の保管代がかかる",
    "Freight booked on the quarterly supply ship sat waiting at the wharf shed for two extra weeks after the vessel's schedule slipped again, and the shed's modest daily storage fee added up steadily while everyone simply waited.|El flete reservado en el barco de suministro trimestral esperó dos semanas más en el cobertizo del muelle después de que el horario del buque volviera a retrasarse, y la modesta tarifa diaria de almacenamiento del cobertizo fue sumando mientras todos, sencillamente, esperaban.|Le fret réservé sur le navire de ravitaillement trimestriel a attendu deux semaines de plus dans le hangar du quai après que l'horaire du navire eut de nouveau glissé, et les modiques frais de stockage journaliers du hangar se sont accumulés pendant que tout le monde attendait, tout simplement.|四半期に一度の補給船に予約していた貨物は、船の予定がまたずれ込んだせいで波止場の倉庫でさらに二週間も待たされ、皆がただ待つ間にも倉庫のささやかな一日あたりの保管料が着実に積み上がっていった。",
  ),
];
