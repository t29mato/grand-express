/**
 * アジア大陸盤面の青マス・赤マスで起きる出来事(18件。増9・減9)。
 *
 * 地方コード: lev=レヴァント・コーカサス / arb=アラビア半島・湾岸 /
 * cas=中央アジア / sib=シベリア・モンゴル・極東 / eas=東アジア /
 * sas=南アジア / sea=東南アジア
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方でも必ず gain と loss が1件は引ける(他の盤面と同じ約束)。
 * そのうえで7地方それぞれに2件(増1・減1)を置いている。
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

export const ASIA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年 ----
  ev(
    "border-translator", "gain", [], "🗣️", 240,
    "Hired to translate at the border|Contratado para traducir en la frontera|Engagé pour traduire à la frontière|国境で通訳を頼まれる",
    "A queue of travellers and a customs officer were talking past each other in two languages neither fully shared, and a few minutes of translating both ways earned a folded banknote pressed into a hand before the queue moved on. Every border crossing on this continent runs on exactly this kind of unpaid-turned-paid goodwill.|Una cola de viajeros y un agente de aduanas hablaban sin entenderse en dos idiomas que ninguno dominaba del todo, y unos minutos traduciendo en ambos sentidos ganaron un billete doblado antes de que la cola siguiera avanzando. Cada paso fronterizo de este continente funciona con este tipo de buena voluntad.|Une file de voyageurs et un douanier se parlaient sans se comprendre dans deux langues que ni l'un ni l'autre ne maîtrisait pleinement, et quelques minutes à traduire dans les deux sens ont rapporté un billet plié glissé dans la main avant que la file ne reprenne. Chaque poste-frontière du continent fonctionne sur ce genre de bonne volonté.|旅人の列と税関の係官が、どちらも十分には分からない二つの言語ですれ違っていた。数分間、両方向に通訳してやると、列が動き出す前に折りたたんだ紙幣を握らされた。この大陸のどの国境検問所も、こういう無償から始まる好意で回っている。",
  ),
  ev(
    "lostbag-tip", "gain", [], "🧳", 210,
    "Finding a bag left on the platform|Encontrar una maleta olvidada en el andén|Retrouver un sac oublié sur le quai|ホームに忘れられた鞄を見つける",
    "A hard case sat alone on the platform long after its train had pulled out, and running it down the line to the next stop where the owner was frantically searching earned a reward well out of proportion to the effort. The owner insisted, counting out the notes twice.|Una maleta rígida quedó sola en el andén mucho después de que su tren hubiera partido, y llevarla corriendo hasta la siguiente parada, donde el dueño la buscaba frenético, ganó una recompensa desproporcionada al esfuerzo.|Une valise rigide traînait seule sur le quai bien après le départ de son train, et la rapporter en courant jusqu'à l'arrêt suivant, où son propriétaire la cherchait frénétiquement, a rapporté une récompense sans commune mesure avec l'effort.|列車が出たあとも硬いスーツケースがホームにひとつ取り残されていた。次の駅まで走って持っていくと、必死に探していた持ち主から、労力に見合わないほどの礼金を渡された。持ち主は二度も数え直して押し付けてきた。",
  ),
  ev(
    "wrongplatform-taxi", "loss", [], "🚕", 220,
    "Boarding on the wrong platform entirely|Subiendo por completo al andén equivocado|Monter sur le mauvais quai|まったく違うホームに乗ってしまう",
    "Two trains left from platforms with nearly identical signage within a minute of each other, and only after the doors closed did the destination board overhead prove it was the wrong one. A taxi back to the correct station cost more than the ticket that started the whole trip.|Dos trenes salían de andenes con una señalización casi idéntica con un minuto de diferencia, y solo al cerrarse las puertas el panel de destino de arriba demostró que era el equivocado. Un taxi de vuelta a la estación correcta costó más que el billete que empezó todo el viaje.|Deux trains partaient de quais à la signalisation presque identique à une minute d'écart, et ce n'est qu'une fois les portes fermées que le panneau de destination au-dessus a prouvé l'erreur. Un taxi retour vers la bonne gare a coûté plus cher que le billet ayant lancé tout le voyage.|ほとんど同じ表示のホームから一分違いで二本の列車が出ていて、扉が閉まってからようやく頭上の行先表示が間違いだったと分かった。正しい駅まで戻るタクシー代は、そもそもの旅の切符より高くついた。",
  ),
  ev(
    "exchange-shortchange", "loss", [], "💱", 190,
    "Shortchanged at a street exchange counter|Vuelto de menos en un cambista callejero|Rendu de monnaie faussé au bureau de change de rue|路上の両替商で釣りをごまかされる",
    "The exchange rate chalked on the board looked fair enough, but the count handed back across the counter came up short by a bill that had somehow slipped behind the till drawer. Arguing in a language learned an hour ago from a phrasebook did not help.|El tipo de cambio escrito en la pizarra parecía justo, pero el recuento que devolvieron en el mostrador faltaba un billete que de algún modo se había deslizado tras el cajón. Discutir en un idioma aprendido hace una hora en una guía de frases no ayudó.|Le taux de change inscrit à la craie semblait correct, mais la liasse rendue au comptoir manquait un billet, glissé on ne sait comment derrière le tiroir-caisse. Discuter dans une langue apprise une heure plus tôt dans un guide de conversation n'a pas aidé.|黒板に書かれた両替レートは公正に見えたが、カウンター越しに返された札束は、いつの間にかレジの引き出しの奥に滑り込んでいた一枚ぶん足りなかった。一時間前に会話帳で覚えたばかりの言葉で抗議しても無駄だった。",
  ),

  // ---- lev ----
  ev(
    "caravanserai-loading", "gain", ["lev"], "🧺", 250,
    "Loading bales at a caravanserai courtyard|Cargando fardos en el patio de un caravasar|Charger des ballots dans la cour d'un caravansérail|隊商宿の中庭で荷を積む",
    "A merchant's convoy needed extra hands stacking bales before dawn to make an early start over the mountains, and the pay came with a hot flatbread pulled straight from the courtyard oven. The stonework underfoot had carried the same kind of loading for centuries.|La caravana de un mercader necesitaba manos extra para apilar fardos antes del alba y salir temprano hacia las montañas, y el pago vino con un pan plano caliente recién sacado del horno del patio.|La caravane d'un marchand avait besoin de bras pour empiler des ballots avant l'aube afin de partir tôt vers les montagnes, et la paie est venue avec un pain plat chaud sorti tout droit du four de la cour.|商人の隊商が、夜明け前に山越えの早出をするため荷を積む手を求めていた。給金には中庭の窯から出したての温かい平パンが添えられていた。足元の石畳は、何世紀も同じような荷積みを支えてきた。",
  ),
  ev(
    "closedborder-detour", "loss", ["lev"], "🚧", 240,
    "A closed border forces a long detour|Una frontera cerrada obliga a un largo rodeo|Une frontière fermée impose un long détour|閉ざされた国境が大回りを強いる",
    "The direct road across the frontier has sat closed for years over a dispute that shows no sign of ending, so the only way through means paying for a longer route around it entirely. Locals barely mention it anymore, the way people stop mentioning a permanent traffic light.|La carretera directa a través de la frontera lleva años cerrada por una disputa que no muestra señales de terminar, así que la única forma de pasar implica pagar una ruta mucho más larga que la rodee por completo.|La route directe à travers la frontière est fermée depuis des années à cause d'un différend qui ne montre aucun signe de résolution, si bien que le seul passage possible implique de payer un détour bien plus long. Les habitants n'en parlent presque plus.|国境を直接越える道は、終わる気配のない対立のせいで何年も閉ざされたままで、通り抜けるにはすっかり回り道をする長い経路の代金を払うしかない。地元の人はもうほとんど話題にもしない。常設の赤信号のことをいちいち話さなくなるのと同じである。",
  ),

  // ---- arb ----
  ev(
    "pilgrim-porter", "gain", ["arb"], "🧳", 260,
    "Carrying bags for a group of pilgrims|Llevando maletas para un grupo de peregrinos|Porter les bagages d'un groupe de pèlerins|巡礼団の荷物を運ぶ",
    "A family arriving exhausted from a connecting flight paid well over the going rate to have their luggage carried straight to the right platform without a wrong turn. They pressed extra coins into a hand and asked for a blessing to be said in return, unsure which was owed to which.|Una familia que llegaba agotada de un vuelo de conexión pagó bien por encima de la tarifa habitual para que le llevaran el equipaje directo al andén correcto sin un giro equivocado.|Une famille arrivée épuisée d'un vol de correspondance a payé bien au-dessus du tarif habituel pour que ses bagages soient portés directement au bon quai sans un faux pas.|乗り継ぎ便でくたびれ果てて着いた一家が、間違えずにまっすぐ正しいホームまで荷物を運んでもらう代金として、相場よりずっと多く払った。おまけの小銭まで握らせ、代わりに祝福の言葉を求めてきた。",
  ),
  ev(
    "sandstorm-damage", "loss", ["arb"], "🏜️", 230,
    "A sandstorm ruins market goods|Una tormenta de arena arruina la mercancía del mercado|Une tempête de sable ruine les marchandises du marché|砂嵐が市場の品物を台無しにする",
    "A wall of dust rolled through before the stall could be packed away, and everything left uncovered came out the other side gritty enough to be unsellable. Sweeping sand out of the folds of cloth took the rest of the afternoon and never quite finished the job.|Un muro de polvo pasó antes de que el puesto pudiera recogerse, y todo lo que quedó destapado salió al otro lado tan arenoso que no se podía vender. Sacudir la arena de los pliegues de la tela ocupó el resto de la tarde.|Un mur de poussière est passé avant que l'étal ne puisse être rangé, et tout ce qui est resté à découvert en est ressorti trop sableux pour être vendu. Secouer le sable des plis du tissu a occupé le reste de l'après-midi.|露店を片付けきる前に砂の壁が通り過ぎ、覆いをかけていなかったものは砂まみれで売り物にならなくなった。布の折り目から砂を払うだけで午後いっぱいかかり、それでも完全には取りきれなかった。",
  ),

  // ---- cas ----
  ev(
    "melonstall-help", "gain", ["cas"], "🍈", 220,
    "Minding a melon stall for an afternoon|Atendiendo un puesto de melones toda una tarde|Tenir un étal de melons tout un après-midi|一日メロンの露店番をする",
    "A stallholder needed to run an errand and left the whole cart in trust for an afternoon, splitting the takings on return without bothering to count what had been sold. The sweetest melons went first, as they always do.|Un vendedor tuvo que hacer un recado y dejó todo el carro al cuidado durante una tarde, repartiendo la ganancia al volver sin molestarse en contar lo vendido. Los melones más dulces se fueron primero, como siempre.|Un marchand devait faire une course et a confié toute sa charrette pour l'après-midi, partageant la recette à son retour sans même compter ce qui avait été vendu. Les melons les plus sucrés sont partis en premier, comme toujours.|露店の主人が用事のため午後いっぱい荷車をまるごと預けていき、戻ると売った数を数えもせずに稼ぎを山分けした。いちばん甘いメロンから先に売れていくのは、いつものことだった。",
  ),
  ev(
    "bogie-delay-cost", "loss", ["cas"], "🔧", 260,
    "The bogie exchange runs long|El cambio de bogies se alarga|Le changement de bogies s'éternise|台車の履き替えが長引く",
    "The wheel change at the border depot was supposed to take an hour and took most of a day instead, and the wait meant paying for a room at the station guesthouse that had not been part of the plan. The gauge does not care whose schedule it breaks.|El cambio de ruedas en el depósito fronterizo debía tardar una hora, pero llevó casi todo el día, y la espera significó pagar una habitación en la posada de la estación que no entraba en el plan.|Le changement de roues au dépôt frontalier devait prendre une heure et en a pris presque toute la journée, et l'attente a signifié payer une chambre à l'auberge de la gare, imprévue.|国境の車庫での車輪の履き替えは一時間で終わるはずが、ほぼ一日がかりになった。待つあいだ、予定になかった駅の宿泊所の部屋代を払う羽目になった。軌間は誰の予定を狂わせようと構いはしない。",
  ),

  // ---- sib ----
  ev(
    "icecrossing-bonus", "gain", ["sib"], "🥶", 270,
    "Extra pay for the frozen-lake crossing shift|Paga extra por el turno de cruce del lago helado|Prime pour le service de traversée du lac gelé|凍った湖を渡る仕事に割増賃金",
    "The crew laying temporary rail across the ice needed one more set of hands willing to work in the cold, and the shift paid a frost bonus on top of the usual day rate. Nobody complained about the extra layers required to earn it.|La cuadrilla que tendía raíles temporales sobre el hielo necesitaba un par de manos más dispuestas a trabajar con el frío, y el turno pagó un plus por congelación además de la tarifa diaria habitual.|L'équipe posant des rails temporaires sur la glace avait besoin d'une paire de bras de plus prête à travailler dans le froid, et le service a payé une prime de gel en plus du tarif journalier habituel.|氷の上に仮設のレールを敷く作業班が、寒さの中で働ける手をもう一人求めていた。この勤務にはふだんの日当に加えて寒冷手当が付いた。それを稼ぐために着込んだ余分な重ね着に、文句を言う者はいなかった。",
  ),
  ev(
    "frostbite-medicine", "loss", ["sib"], "🩹", 240,
    "A stinging hand needs medicine fast|Una mano que escuece necesita medicina ya|Une main qui brûle a besoin de médicaments vite|かじかんだ手に急いで薬がいる",
    "A glove came off for one careless minute to fix a stuck latch, and the fingers underneath went from cold to alarming fast enough to need the station pharmacy's whole tube of ointment. The pharmacist did not ask how it happened; this far north, everyone already knows.|Un guante se quitó por un descuidado minuto para arreglar un pestillo atascado, y los dedos de debajo pasaron de fríos a alarmantes lo bastante rápido como para necesitar todo el tubo de pomada de la farmacia de la estación.|Un gant a été retiré pour une minute d'inattention afin de réparer un loquet coincé, et les doigts en dessous sont passés du froid à l'inquiétant assez vite pour vider tout le tube de pommade de la pharmacie de la gare.|詰まった掛け金を直そうと、うっかり一分だけ手袋を外した。その下の指は冷たいだけでは済まないほど急に色を変え、駅の薬局のチューブを丸ごと使い切る羽目になった。薬剤師は理由を聞かなかった。これほど北では、誰もがもう知っているからである。",
  ),

  // ---- eas ----
  ev(
    "portcargo-bonus", "gain", ["eas"], "📦", 250,
    "A cargo-handling bonus at the terminal|Una prima por manejo de carga en la terminal|Une prime de manutention au terminal|ターミナルの荷役に割増",
    "A container ship arrived a shift early and the terminal paid a rush bonus to anyone willing to help clear the backlog before the tide turned. The pay slip listed the bonus separately, as if the terminal itself were slightly embarrassed by how much the delay had cost.|Un portacontenedores llegó un turno antes y la terminal pagó una prima de urgencia a quien ayudara a despejar el atasco antes de que cambiara la marea.|Un porte-conteneurs est arrivé un service en avance et le terminal a versé une prime d'urgence à qui aiderait à résorber l'engorgement avant le changement de marée.|コンテナ船が一勤務分早く着き、潮が変わる前に滞貨をさばく手伝いをする者にターミナルが急ぎ手当を払った。給与明細には手当が別項目で記され、遅れがどれほど高くついたかをターミナル自身がいくらか気まずく思っているかのようだった。",
  ),
  ev(
    "ferry-stranded", "loss", ["eas"], "⛴️", 230,
    "A cancelled ferry means a night at the port|Un ferry cancelado significa una noche en el puerto|Un ferry annulé signifie une nuit au port|フェリー欠航で港で一泊",
    "Rough seas cancelled the last sailing of the day without warning, and the only option left was an overpriced room above the ferry terminal shared with a dozen other stranded travellers. The sea, unlike the timetable, does not apologise.|El mar agitado canceló la última salida del día sin aviso, y la única opción que quedó fue una habitación carísima sobre la terminal del ferry, compartida con una docena de viajeros varados más.|La mer agitée a annulé la dernière traversée du jour sans préavis, et la seule option restante fut une chambre hors de prix au-dessus du terminal, partagée avec une douzaine d'autres voyageurs coincés.|荒れた海が予告もなくその日最後の便を欠航させ、残った選択肢はフェリーターミナルの上にある、他に取り残された十数人と分け合う法外な値段の部屋だけだった。海は時刻表と違って謝ってはくれない。",
  ),

  // ---- sas ----
  ev(
    "trekguide-tip", "gain", ["sas"], "🥾", 240,
    "Guiding trekkers past a washed-out bridge|Guiando a excursionistas más allá de un puente arrasado|Guider des randonneurs au-delà d'un pont emporté|流された橋の先へトレッカーを案内する",
    "A group of trekkers found their planned crossing gone and paid gladly for a local shortcut over a footbridge that was not on any map they carried. They insisted on a photo together at the far side, as if the crossing itself were the summit.|Un grupo de excursionistas se encontró con que su cruce previsto había desaparecido y pagó con gusto por un atajo local sobre una pasarela que no aparecía en ningún mapa que llevaran.|Un groupe de randonneurs a trouvé son passage prévu disparu et a payé volontiers pour un raccourci local par une passerelle absente de toute carte qu'ils portaient.|トレッカーの一行は、予定していた渡り場が無くなっているのを見つけ、持っていたどの地図にも載っていない地元の歩道橋の近道の案内を喜んで金で頼んだ。渡りきったところで、まるでそれ自体が頂上であるかのように記念写真をせがまれた。",
  ),
  ev(
    "monsoon-flooded-room", "loss", ["sas"], "🌊", 250,
    "Monsoon water floods a rented room|El agua del monzón inunda una habitación alquilada|L'eau de la mousson inonde une chambre louée|モンスーンの水が借りた部屋を浸す",
    "The gutter outside had never been tested by rain this heavy before, and by morning the floor of a ground-level room was under two centimetres of water that ruined everything left on it. The landlord's apology came with a fresh towel and nothing else.|El canalón de fuera nunca se había puesto a prueba con una lluvia tan fuerte, y por la mañana el suelo de una habitación en planta baja estaba bajo dos centímetros de agua que arruinó todo lo dejado en él.|La gouttière extérieure n'avait jamais été mise à l'épreuve par une pluie aussi forte, et au matin le sol d'une chambre au rez-de-chaussée était sous deux centimètres d'eau ayant tout gâché.|外の雨樋はこれほど激しい雨で試されたことが一度も無く、朝には一階の部屋の床が2センチの水に浸かり、床に置いてあったものを全部だめにしていた。大家の謝罪は、新しいタオル一枚だけだった。",
  ),

  // ---- sea ----
  ev(
    "bambootrain-repair", "gain", ["sea"], "🎋", 230,
    "Helping fix a bamboo train platform|Ayudando a arreglar la plataforma de un tren de bambú|Aider à réparer une plateforme de train de bambou|竹列車の台の修理を手伝う",
    "A salvaged axle needed a new bamboo deck lashed on before the next run, and a spare pair of hands with a knack for knots earned a share of the day's fares once the repaired platform went back into service. It held for the rest of the season.|Un eje recuperado necesitaba una nueva plataforma de bambú atada antes de la siguiente salida, y unas manos extra con maña para los nudos ganaron parte de las tarifas del día una vez la plataforma volvió al servicio.|Un essieu récupéré avait besoin d'un nouveau plancher de bambou ligaturé avant le prochain trajet, et des mains supplémentaires habiles aux nœuds ont gagné une part des recettes du jour une fois la plateforme réparée remise en service.|廃品の車軸に竹の新しい台を縄で組み直す必要があり、結び目の扱いに慣れた手がもう一組加わったおかげで、修理された台が営業に戻ったあとの稼ぎの分け前をもらえた。その台は季節の終わりまでもった。",
  ),
  ev(
    "junglelandslide-delay", "loss", ["sea"], "⛰️", 230,
    "A landslide delay adds an extra night|Un desprendimiento añade una noche extra|Un glissement de terrain ajoute une nuit de plus|土砂崩れでもう一泊増える",
    "A section of the mountain line came down in the rain overnight, and the only train through would not run again until the debris was cleared, which meant an unplanned night at whatever guesthouse still had a bed near the blocked station.|Un tramo de la línea de montaña se vino abajo con la lluvia durante la noche, y el único tren que pasaba por allí no volvería a circular hasta despejar los escombros, lo que significó una noche imprevista en cualquier pensión con cama libre.|Un tronçon de la ligne de montagne s'est effondré sous la pluie pendant la nuit, et l'unique train ne roulerait plus avant le déblaiement des débris, ce qui a signifié une nuit imprévue dans la première pension avec un lit libre.|夜のうちに雨で山岳路線の一区間が崩れ落ち、唯一通っていた列車は瓦礫が片付くまで動かなくなった。封鎖された駅の近くでベッドの空いている宿を探し、予定になかった一泊をする羽目になった。",
  ),
];
