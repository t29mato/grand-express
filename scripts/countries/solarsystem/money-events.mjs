/**
 * 太陽系の青マス・赤マスで起きる出来事(18件。増9・減9)。
 *
 * 地方コード: core=太陽 / inner=地球型惑星 / belt=小惑星帯 / outer=巨大惑星 /
 * tno=冥王星以遠 / deep=太陽系の縁 / probe=探査機
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、7地方それぞれに2件(増1・減1)置いている。
 */
function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

function ev(id, kind, regs, emoji, amount, title, narrative, months = []) {
  return { id, kind, regs, e: emoji, amount, n: t(title), t: t(narrative), months };
}

export const SOLARSYSTEM_MONEY_EVENTS = [
  // ---- どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "cargo-loading-shift", "gain", [], "📦", 220,
    "A shift loading cargo pods at a waystation|Un turno cargando cápsulas de carga en una estación de paso|Un service à charger des capsules de fret dans une station relais|中継基地での貨物積み込み",
    "The waystation needed extra hands strapping down cargo pods before the next departure window, and the pay came in credits transferred the moment the manifest was signed. Loading has to finish before the window closes — orbital mechanics does not wait for a slow crew.|La estación necesitaba manos extra para asegurar cápsulas de carga antes de la próxima ventana de salida, y el pago llegó en créditos transferidos en cuanto se firmó el manifiesto. La carga debe terminar antes de que se cierre la ventana: la mecánica orbital no espera a una tripulación lenta.|La station relais avait besoin de bras pour arrimer des capsules de fret avant la prochaine fenêtre de départ, et la paie fut versée en crédits dès la signature du manifeste. Le chargement doit finir avant la fermeture de la fenêtre : la mécanique orbitale n'attend pas une équipe lente.|中継基地が、次の出発の窓が開くまでに貨物ポッドを固定する人手を求めていた。積荷目録に署名した瞬間、クレジットが振り込まれた。窓が閉じる前に積み終えなければならない。軌道力学は、のろまな作業班を待ってはくれない。",
  ),
  ev(
    "relay-dish-nightshift", "gain", [], "📡", 200,
    "Covering a night shift on a relay dish|Cubriendo un turno nocturno en una antena de relevo|Assurer un service de nuit sur une antenne relais|中継アンテナの夜勤を代わる",
    "The regular operator called in sick an hour before a scheduled downlink, and watching the signal strength meter until sunrise paid a night premium on top of the usual rate. Every dish in the network has to point at exactly the right patch of sky at exactly the right minute, so a warm body in the chair still matters.|El operador habitual avisó de que estaba enfermo una hora antes de una recepción programada, y vigilar el medidor de intensidad de señal hasta el amanecer pagó un plus nocturno. Cada antena de la red debe apuntar exactamente al punto correcto del cielo en el minuto exacto.|L'opérateur habituel s'est déclaré malade une heure avant une réception programmée, et surveiller le mesureur d'intensité du signal jusqu'à l'aube a valu une prime de nuit. Chaque antenne du réseau doit pointer exactement le bon coin du ciel à la bonne minute.|いつもの担当者が予定された受信の一時間前に病欠の連絡をしてきた。夜明けまで信号強度計を見張ると、通常の手当に夜間割増が上乗せされた。網の中のどのアンテナも、正確な時刻に正確な空の一点を向いていなければならないので、人の目もまだ要る。",
  ),
  ev(
    "docking-fee-overcharge", "loss", [], "🛰️", 190,
    "An overcharged docking fee at an unfamiliar port|Una tarifa de atraque cobrada de más en un puerto desconocido|Des frais d'amarrage excessifs dans un port inconnu|不案内な港で係留料を多く取られる",
    "The berth fee posted on the board turned out to be per hour, not per stay, and by the time anyone noticed the meter had been running most of a day. Every port along this line prices differently, and nothing on the ticket said which kind this one was.|La tarifa de amarque indicada en el tablón resultó ser por hora, no por estancia, y para cuando alguien se dio cuenta, el contador llevaba corriendo casi un día. Cada puerto de esta línea cobra distinto, y nada en el billete decía de qué tipo era este.|Le tarif d'amarrage affiché s'est avéré être à l'heure, pas au séjour, et le temps que quelqu'un s'en aperçoive, le compteur tournait depuis presque une journée entière. Chaque port de cette ligne tarifie différemment, et rien sur le billet ne précisait lequel c'était.|掲示板の係留料は滞在ぶんではなく一時間ごとの値段だったと分かったのは、誰かが気づいたときにはもう一日近く計器が回り続けたあとだった。この路線沿いの港はどこも値付けが違うのに、切符にはどちらの方式かひとことも書かれていなかった。",
  ),
  ev(
    "zero-g-card-game-loss", "loss", [], "🃏", 200,
    "Losing badly at cards in zero gravity|Perdiendo feo a las cartas en gravedad cero|Une lourde défaite aux cartes en apesanteur|無重力での賭けカードに負ける",
    "The cards kept drifting off the little magnetic table faster than anyone could call a hand, and by the time the game broke up the stakes had crept up well past what seemed reasonable at the start. Long transit legs get boring fast, and boredom is expensive when someone else is better at the game.|Las cartas no dejaban de flotar fuera de la mesita magnética más rápido de lo que nadie podía cantar una mano, y para cuando terminó la partida la apuesta había subido mucho más de lo razonable al empezar. Los trayectos largos aburren rápido, y el aburrimiento sale caro cuando otro juega mejor.|Les cartes n'arrêtaient pas de dériver hors de la petite table magnétique plus vite que quiconque ne pouvait annoncer une main, et à la fin de la partie, la mise avait grimpé bien au-delà du raisonnable au départ. Les longs trajets ennuient vite, et l'ennui coûte cher quand un autre joue mieux.|磁石付きの小さな卓から、手札を宣言するより速くカードが漂い出てしまい、勝負が終わるころには最初は妥当に思えた賭け金がずいぶん膨らんでいた。長い航行区間はすぐに退屈になり、退屈は相手のほうが上手なときほど高くつく。",
  ),

  // ---- core 太陽 ----
  ev(
    "corona-mirror-alignment", "gain", ["core"], "🪞", 260,
    "Paid to help align a coronagraph's mirrors|Pagado por ayudar a alinear los espejos de un coronógrafo|Payé pour aider à aligner les miroirs d'un coronographe|コロナグラフの鏡合わせを手伝う",
    "A research team needed an extra pair of hands nudging mirror mounts by fractions of a millimetre while they blocked out the Sun's disk to study the corona around it, work that had to stop the instant anyone's shadow crossed the optics. Getting the alignment right can take longer than the observation itself.|Un equipo de investigación necesitaba manos extra para ajustar los soportes de espejos por fracciones de milímetro mientras bloqueaban el disco solar para estudiar la corona a su alrededor, un trabajo que debía detenerse en cuanto la sombra de alguien cruzara la óptica.|Une équipe de recherche avait besoin de bras pour ajuster des montures de miroirs de fractions de millimètre en occultant le disque solaire afin d'étudier la couronne, un travail qui devait s'arrêter dès qu'une ombre traversait l'optique.|研究チームが、太陽の周りのコロナを観測するために本体の光を遮る鏡の位置を1mm未満の単位で調整する手を求めていた。誰かの影が光学系を横切った瞬間、作業は中断せねばならない。位置合わせだけで観測そのものより長くかかることもある。",
  ),
  ev(
    "heat-shield-overheat-repair", "loss", ["core"], "🥵", 220,
    "An overheated panel needs an expensive swap|Un panel recalentado necesita un cambio caro|Un panneau surchauffé exige un remplacement coûteux|過熱したパネルの高額な交換",
    "A sensor panel left facing the wrong way for too long came back warped and unreadable, and the replacement part had to be flown in from three stops back at a price that reflected exactly how far it had to travel. Nothing in the corona forgives a mistake in orientation for long.|Un panel de sensores dejado demasiado tiempo orientado mal volvió deformado e ilegible, y la pieza de repuesto tuvo que traerse desde tres paradas atrás a un precio que reflejaba exactamente la distancia recorrida.|Un panneau de capteurs laissé trop longtemps mal orienté est revenu déformé et illisible, et la pièce de rechange a dû être acheminée depuis trois arrêts en arrière, à un prix reflétant exactement la distance parcourue.|向きを間違えたまま長く放置されたセンサーパネルは、歪んで読み取れなくなって戻ってきた。交換部品は三つ前の駅からわざわざ運ばれてきて、その分の運賃がそのまま値段に上乗せされた。コロナの中では、向きの間違いを長く見逃してはくれない。",
  ),

  // ---- inner 地球型惑星 ----
  ev(
    "olympus-rover-guide-tip", "gain", ["inner"], "🚙", 250,
    "Guiding tourists up the gentle slope of Olympus Mons|Guiando a turistas por la suave ladera del Olimpo|Guider des touristes sur la pente douce de l'Olympus Mons|オリンポス山の緩斜面へ観光客を案内する",
    "A group paid well to be shown the safest gentle route up the shoulder of the tallest volcano in the Solar System, a route that only makes sense once you have seen how the slope tricks the eye into thinking there is no mountain there at all. Most of the tip came from someone who insisted on driving the return leg themself.|Un grupo pagó bien por que le mostraran la ruta suave y segura por el hombro del volcán más alto del Sistema Solar, una ruta que solo tiene sentido una vez que se ve cómo la pendiente engaña al ojo. La mayor parte de la propina vino de alguien que insistió en conducir el regreso.|Un groupe a bien payé pour qu'on lui montre l'itinéraire sûr et doux sur le flanc du plus haut volcan du Système solaire, un itinéraire qui ne prend son sens qu'une fois vu comment la pente trompe l'œil. L'essentiel du pourboire venait de quelqu'un ayant insisté pour conduire le retour lui-même.|太陽系でいちばん高い火山の裾を安全に登れる緩やかな道を案内してほしいと、一団がたっぷり謝礼を払ってくれた。この道は、斜面がいかに山だと感じさせないほど緩いかを実際に見て初めて意味が分かる。謝礼の大半は、帰り道は自分で運転すると言い張った客からだった。",
    [6, 7],
  ),
  ev(
    "regolith-dust-seal-loss", "loss", ["inner"], "🌫️", 190,
    "Fine dust works its way into a sealed joint|El polvo fino se cuela en una junta sellada|De la fine poussière s'infiltre dans un joint scellé|細かい塵が密閉部に入り込む",
    "The suit joint looked sealed right up until the fine, sharp-edged dust already worked its way past the gasket, and the whole assembly had to be swapped rather than cleaned since scrubbing it would only grind the grit in further. Dust this fine clings by static charge alone and gets everywhere a real breeze never could.|La junta del traje parecía sellada hasta que el polvo fino y afilado ya se había colado más allá de la empaquetadura, y hubo que cambiar el conjunto entero en vez de limpiarlo, pues frotarlo solo incrustaría más la arenilla. Un polvo tan fino se pega solo por carga estática.|Le joint de la combinaison semblait scellé jusqu'à ce que la poussière fine et coupante se soit déjà infiltrée au-delà du joint, et il fallut remplacer tout l'ensemble plutôt que le nettoyer, frotter n'aurait fait qu'incruster davantage le grain. Une poussière si fine colle par la seule charge statique.|宇宙服の関節はしっかり密閉されているように見えたが、鋭く細かい塵はすでにパッキンをすり抜けていた。磨いても粒がさらに食い込むだけなので、部品ごと交換するしかなかった。これほど細かい塵は静電気だけで張り付き、本物の風など無くてもあらゆる隙間に入り込む。",
  ),

  // ---- belt 小惑星帯 ----
  ev(
    "asteroid-cataloguing-fee", "gain", ["belt"], "🔭", 240,
    "Paid to help catalogue newly spotted rocks|Pagado por ayudar a catalogar rocas recién avistadas|Payé pour aider à cataloguer des roches nouvellement repérées|新発見の小惑星の目録作りを手伝う",
    "A survey team needed someone to cross-check faint dots against old plates late into the night, confirming which ones were genuinely new and which had simply been logged under a different name years before. Most of what gets found out here never earns more than a catalogue number.|Un equipo de rastreo necesitaba a alguien que cotejara puntos tenues con placas antiguas hasta bien entrada la noche, para confirmar cuáles eran realmente nuevos y cuáles ya se habían registrado con otro nombre años antes. La mayoría de lo hallado aquí nunca gana más que un número de catálogo.|Une équipe de repérage avait besoin de quelqu'un pour recouper de faibles points avec d'anciens clichés tard dans la nuit, afin de confirmer lesquels étaient vraiment nouveaux et lesquels avaient simplement été enregistrés sous un autre nom des années plus tôt. La plupart de ce qu'on trouve ici ne gagne jamais plus qu'un numéro de catalogue.|観測チームが、夜遅くまで淡い光点を古い乾板と照合し、本当に新しいものか、何年も前に別の名で記録済みのものかを確かめる人手を求めていた。この帯で見つかるもののほとんどは、結局カタログ番号以上のものにはならない。",
  ),
  ev(
    "viewing-dome-micrometeorite-crack", "loss", ["belt"], "🕳️", 210,
    "A micrometeorite chips the observation dome|Un micrometeorito astilla la cúpula de observación|Un micrométéorite ébrèche le dôme d'observation|微小隕石が観測ドームを傷つける",
    "Something too small to have been worth tracking hit the dome hard enough to leave a spiderweb crack right across the best sightline, and dome glass rated for this kind of impact does not come cheap out here. The belt is not crowded by planetary standards, but nothing here is travelling slowly either.|Algo demasiado pequeño para haber merecido seguimiento golpeó la cúpula con fuerza suficiente para dejar una grieta en telaraña justo en la mejor línea de visión, y el cristal de cúpula preparado para este tipo de impacto no sale barato aquí. El cinturón no está abarrotado, pero nada aquí va despacio tampoco.|Quelque chose de trop petit pour avoir mérité un suivi a frappé le dôme assez fort pour y laisser une fissure en toile d'araignée en plein sur la meilleure ligne de visée, et le verre de dôme conçu pour ce genre d'impact ne coûte pas peu ici. La ceinture n'est pas encombrée, mais rien n'y va lentement non plus.|追跡する価値も無いほど小さな何かがドームに当たり、いちばん見晴らしのいい方向にクモの巣状のひびを入れた。この手の衝撃に耐える規格のドームガラスは、ここでは安くない。小惑星帯は惑星ほど混んではいないが、ここを漂うものに遅いものは一つも無い。",
  ),

  // ---- outer 巨大惑星 ----
  ev(
    "great-red-spot-tour-tip", "gain", ["outer"], "🌪️", 260,
    "Guiding a tour along the edge of the storm|Guiando un recorrido junto al borde de la tormenta|Guider une visite le long du bord de la tempête|大嵐の縁を巡るツアーを案内する",
    "A group paid well to be shown the safest viewing distance from the storm's outer bands, close enough to feel small next to it without drifting into turbulence that could shake a hull apart. Knowing exactly where that line sits is worth more than the tour company likes to admit.|Un grupo pagó bien por que le mostraran la distancia de observación más segura desde las bandas exteriores de la tormenta, lo bastante cerca para sentirse pequeño junto a ella sin entrar en una turbulencia capaz de sacudir un casco hasta romperlo.|Un groupe a bien payé pour qu'on lui montre la distance d'observation la plus sûre depuis les bandes extérieures de la tempête, assez près pour se sentir minuscule à côté sans dériver dans une turbulence capable de secouer une coque à la briser.|一団が、嵐の外側の帯からいちばん安全に眺められる距離まで案内してほしいと、たっぷり謝礼を払ってくれた。船体を揺さぶりかねない乱気流に入らず、それでいてその小ささを実感できるぎりぎりの距離である。その境界を正確に知っていることは、ツアー会社が認めたがる以上の値打ちがある。",
  ),
  ev(
    "radiation-dose-treatment-cost", "loss", ["outer"], "☢️", 230,
    "A radiation dose calls for costly treatment|Una dosis de radiación exige un tratamiento caro|Une dose de radiations exige un traitement coûteux|被曝線量が高額な治療を招く",
    "The route looked clear on the chart, but the belts here shift with the planet's own rotation, and the dosimeter's reading by the end of the pass meant a mandatory course of treatment before the next departure would be cleared. Nobody argues with the flight surgeon out here.|La ruta parecía despejada en la carta, pero los cinturones aquí cambian con la propia rotación del planeta, y la lectura del dosímetro al final del paso significó un tratamiento obligatorio antes de autorizar la próxima salida. Aquí nadie discute con el médico de vuelo.|La route semblait dégagée sur la carte, mais les ceintures ici évoluent avec la rotation même de la planète, et la lecture du dosimètre en fin de passage a imposé un traitement obligatoire avant d'autoriser le prochain départ. Ici, personne ne discute avec le médecin de vol.|海図の上では経路は安全に見えたが、この星の放射線帯は自転につれて動く。通過し終えた時点の線量計の値は、次の出発が許可される前に治療を義務づけるものだった。ここでは誰も飛行医官には逆らわない。",
  ),

  // ---- tno 冥王星以遠 ----
  ev(
    "kbo-survey-spotter-fee", "gain", ["tno"], "❄️", 250,
    "Paid for spotting a new object in the survey images|Pagado por detectar un objeto nuevo en las imágenes del rastreo|Payé pour avoir repéré un nouvel objet sur les images de repérage|観測画像の中から新天体を見つけて謝礼を得る",
    "A patient afternoon spent blinking between two images taken nights apart, watching for the one dot that had moved against the fixed stars, turned up a genuine candidate the survey team hadn't caught yet. Most searches like this turn up nothing at all, which is exactly why they pay for the rare one that does.|Una tarde paciente pasada parpadeando entre dos imágenes tomadas noches distintas, buscando el único punto que se había movido respecto a las estrellas fijas, dio con un candidato genuino que el equipo aún no había detectado. La mayoría de estas búsquedas no dan nada.|Un après-midi patient passé à cligner entre deux images prises à des nuits d'intervalle, guettant le seul point ayant bougé par rapport aux étoiles fixes, a révélé un candidat authentique que l'équipe n'avait pas encore repéré. La plupart de ces recherches ne donnent rien du tout.|夜をまたいで撮られた二枚の画像を見比べ、恒星に対して動いた一点だけを辛抱強く探した午後が、観測チームもまだ気づいていなかった正真正銘の候補天体を見つけた。この手の探索はたいてい何も見つからないからこそ、まれに当たったときは謝礼が出る。",
  ),
  ev(
    "deep-cold-rescue-cost", "loss", ["tno"], "🥶", 220,
    "An extreme-cold fault calls for a costly rescue tow|Una avería por frío extremo exige un costoso remolque de rescate|Une panne due au froid extrême exige un remorquage de secours coûteux|極寒による故障が高額な救援を招く",
    "A seal never rated for temperatures this far from the Sun gave out quietly, and by the time anyone noticed, a tow was the only option left at a price that reflected just how far out here truly is. Out past Pluto, help does not arrive quickly at any price.|Una junta nunca calificada para temperaturas tan lejos del Sol falló en silencio, y para cuando alguien lo notó, un remolque era la única opción, a un precio que reflejaba lo lejos que está realmente este lugar. Más allá de Plutón, la ayuda no llega rápido a ningún precio.|Un joint jamais prévu pour des températures aussi éloignées du Soleil a lâché en silence, et le temps que quelqu'un s'en aperçoive, un remorquage était la seule option restante, à un prix reflétant à quel point cet endroit est vraiment loin. Au-delà de Pluton, l'aide n'arrive vite à aucun prix.|太陽からこれほど遠い温度を想定していなかった密閉材が、静かに壊れた。誰かが気づいたときには、牽引を頼むしか手が無く、値段はここがどれほど遠いかをそのまま映していた。冥王星より先では、いくら払っても助けはすぐには来ない。",
  ),

  // ---- deep 太陽系の縁 ----
  ev(
    "dsn-calibration-consult-fee", "gain", ["deep"], "🛠️", 240,
    "A consulting fee for recalibrating a deep-space dish|Un honorario de consultoría por recalibrar una antena de espacio profundo|Des honoraires de conseil pour recalibrer une antenne d'espace lointain|深宇宙アンテナの再調整で謝礼を得る",
    "A ground station needed a second opinion on why its signal-to-noise ratio had quietly worsened over months, and the answer turned out to be a few hundredths of a degree of drift nobody had thought to check. Out here, a signal this faint has no room left to lose any further.|Una estación terrestre necesitaba una segunda opinión sobre por qué su relación señal-ruido había empeorado poco a poco durante meses, y la respuesta resultó ser una deriva de unas pocas centésimas de grado que nadie había pensado en revisar.|Une station au sol avait besoin d'un second avis sur pourquoi son rapport signal-bruit s'était discrètement dégradé sur des mois, et la réponse s'est révélée être une dérive de quelques centièmes de degré que personne n'avait pensé à vérifier.|ある地上局が、信号対雑音比が数か月かけてじわじわ悪化した理由についてもう一つの意見を求めていた。答えは、誰も確かめようとしなかった百分の数度のずれだった。これほど微弱な信号には、これ以上失う余地は無い。",
  ),
  ev(
    "signal-lag-miscommunication-loss", "loss", ["deep"], "⏳", 200,
    "A costly mistake made from a signal-lag misunderstanding|Un error costoso por un malentendido debido al retraso de la señal|Une erreur coûteuse due à un malentendu lié au délai du signal|通信の時間差による思い違いで損をする",
    "A confirmation sent hours ago was assumed to still be waiting for a reply, so a second, more expensive order went out just in case — and both arrived, fully paid, within minutes of each other. At this distance, a conversation is really two monologues that happen to rhyme.|Se asumió que una confirmación enviada horas antes seguía esperando respuesta, así que se envió un segundo pedido, más caro, por si acaso, y ambos llegaron, pagados en su totalidad, con minutos de diferencia. A esta distancia, una conversación son en realidad dos monólogos que casualmente riman.|On a supposé qu'une confirmation envoyée des heures plus tôt attendait toujours une réponse, alors une seconde commande, plus chère, est partie par précaution — et les deux sont arrivées, entièrement payées, à quelques minutes d'écart. À cette distance, une conversation n'est vraiment que deux monologues qui riment par hasard.|何時間も前に送った確認への返事がまだ来ていないと思い込み、念のためにと二度目のより高い注文を出してしまった。結局どちらも支払い済みのまま数分違いで届いた。この距離では、会話とは実のところ、たまたま噛み合っただけの二つの独り言にすぎない。",
  ),

  // ---- probe 探査機 ----
  ev(
    "antenna-realignment-fee", "gain", ["probe"], "📶", 230,
    "Paid to help realign a probe's high-gain antenna|Pagado por ayudar a realinear la antena de alta ganancia de una sonda|Payé pour aider à réaligner l'antenne à haut gain d'une sonde|探査機の高利得アンテナを調整し直す",
    "A tiny drift in pointing had cut a probe's data rate to a crawl, and correcting it took someone willing to nudge the mount by increments too small to feel and wait through the long round-trip to confirm each one worked. The fee was modest, but so was the risk of getting it wrong twice.|Una pequeña deriva en el apuntado había reducido a paso de tortuga la tasa de datos de una sonda, y corregirla exigió a alguien dispuesto a mover el soporte en incrementos demasiado pequeños para notarlos y esperar el largo ida y vuelta para confirmar cada uno.|Une infime dérive de pointage avait réduit à un filet le débit de données d'une sonde, et sa correction a demandé quelqu'un prêt à ajuster le support par incréments trop petits pour être sentis et à attendre le long aller-retour pour confirmer chacun.|わずかな向きのずれが探査機のデータ転送速度を這うような遅さにしていた。直すには、感じ取れないほど小さな刻みで架台を動かし、一つひとつがうまくいったか確かめるための長い往復の待ち時間に耐える人手が要った。謝礼は控えめだったが、二度失敗する危険もそれだけ小さかった。",
  ),
  ev(
    "transmission-window-betting-loss", "loss", ["probe"], "🎲", 190,
    "Losing a bet on when a probe would next transmit|Perdiendo una apuesta sobre cuándo transmitiría de nuevo una sonda|Perdre un pari sur le moment où une sonde transmettrait à nouveau|探査機の次の通信予想に外れる",
    "The pool seemed like easy money — pick the hour a distant probe's next signal would arrive — until it turned out half the table had already read the mission's public schedule and the other half hadn't bothered to check that it existed at all.|El bote parecía dinero fácil —adivinar la hora en que llegaría la próxima señal de una sonda lejana— hasta que resultó que media mesa ya había leído el horario público de la misión y la otra mitad ni se había molestado en comprobar que existiera.|Le pot semblait de l'argent facile — deviner l'heure d'arrivée du prochain signal d'une sonde lointaine — jusqu'à ce qu'il s'avère que la moitié de la table avait déjà lu le calendrier public de la mission et que l'autre moitié n'avait même pas vérifié qu'il existait.|次に届く遠い探査機の信号の時刻を当てるだけの、楽な賭けに思えた。だが結局、卓の半分はすでに公開されている運用予定表を読んでおり、残り半分はそんな表があることさえ確かめていなかった。",
  ),
];
