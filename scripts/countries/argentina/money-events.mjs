/**
 * アルゼンチンの青マス・赤マスで起きる出来事(16件。増8・減8)。
 *
 * 地方コード: pa=パンパ・首都圏 / no=北西部(NOA) / me=メソポタミア・北東部 /
 * cu=クージョ / pt=パタゴニア
 *
 * 地方を指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、5地方それぞれに最低2件(増1・減1)、パンパとパタゴニアには
 * さらに1件ずつ足して計12件を地方色として置いている。
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

export const ARGENTINA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(4件) ----
  ev(
    "choripan-platform-stand", "gain", [], "🌭", 190,
    "Selling choripán on a station platform|Vendiendo choripán en el andén|Vendre du choripán sur le quai|駅のホームで choripán(チョリパン)を売る",
    "A grill set up just outside the station gate sold out its chorizo rolls before the evening rush even peaked, and a spare set of tongs earned a cut of the takings for an hour's work. Choripán turns up at any gathering worth having in Argentina, platforms included.|Una parrilla instalada justo afuera del molinete de la estación vendió todos sus choripanes antes de que el pico de la tarde llegara a su máximo, y un par de pinzas extra ganó una parte de lo recaudado por una hora de trabajo. El choripán aparece en cualquier reunión que valga la pena en Argentina, andenes incluidos.|Un grill installé juste devant le portillon de la gare écoula tous ses choripanes avant même le pic de l'heure de pointe du soir, et une paire de pinces supplémentaire rapporta une part de la recette pour une heure de travail. Le choripán apparaît à tout rassemblement qui vaille la peine en Argentine, quais compris.|駅の改札のすぐ外に出した鉄板は、夕方のラッシュが本格化する前にチョリソーのパンを売り切ってしまい、トング片手に手伝った一時間で売上の一部をもらった。チョリパンは、ホームだろうとどこだろうと、アルゼンチンで人が集まる場には必ず現れる。",
  ),
  ev(
    "trasbordo-de-trocha-tip", "gain", [], "📦", 220,
    "A tip for helping at the break-of-gauge yard|Una propina por ayudar en el playón de trasbordo|Un pourboire pour avoir aidé au chantier de transbordement|軌間の切り替え地点で手伝った駄賃",
    "The gang unloading crates from one train to reload them onto another, on the other side of the gauge break, was short-handed for the afternoon, and an extra pair of arms was worth a cash tip on the spot. Argentina's three rail gauges never met, so somewhere this scene has been playing out for over a century.|La cuadrilla que descargaba cajones de un tren para recargarlos en otro, del otro lado del cambio de trocha, andaba corta de manos esa tarde, y un par de brazos extra valió una propina en efectivo en el acto. Las tres trochas argentinas nunca se encontraron, así que en algún lugar esta escena se repite hace más de un siglo.|L'équipe qui déchargeait des caisses d'un train pour les recharger sur un autre, de l'autre côté du changement d'écartement, manquait de bras cet après-midi-là, et une paire de bras supplémentaire valut un pourboire en espèces sur-le-champ. Les trois écartements argentins ne se sont jamais rejoints, si bien que cette scène se répète quelque part depuis plus d'un siècle.|軌間の切り替え地点の向こう側で、荷箱をある列車から別の列車へ積み替える一団はその日の午後、人手が足りず、手を貸しただけでその場で駄賃をもらった。アルゼンチンの3つの軌間は一度も噛み合わなかったので、この光景はどこかで一世紀以上も繰り返されている。",
  ),
  ev(
    "subte-pickpocket", "loss", [], "👛", 200,
    "A pickpocket on a crowded Subte car|Un carterista en un vagón lleno del subte|Un pickpocket dans une rame bondée du subte|混み合う地下鉄の車内ですりに遭う",
    "The doors closed on a packed rush-hour car, and only at the next station does the missing weight in a jacket pocket become obvious. Buenos Aires' Subte has carried this kind of crowd since 1913, and pickpockets have had about as long to work it.|Las puertas se cerraron en un vagón repleto de hora pico, y solo en la próxima estación se hace evidente el peso que falta en un bolsillo de la campera. El subte porteño lleva este tipo de gentío desde 1913, y los carteristas llevan casi el mismo tiempo trabajándolo.|Les portes se refermèrent sur une rame bondée de l'heure de pointe, et ce n'est qu'à la station suivante que le poids manquant dans une poche de veste devient évident. Le subte de Buenos Aires transporte ce genre de foule depuis 1913, et les pickpockets y travaillent depuis presque aussi longtemps.|ラッシュ時の満員の車両でドアが閉まり、次の駅に着いてようやく上着のポケットの軽さに気づいた。ブエノスアイレスの地下鉄は1913年からこの種の混雑を運んでおり、すりもほぼ同じだけの年月をかけて腕を磨いてきた。",
  ),
  ev(
    "cueva-bad-rate", "loss", [], "💸", 210,
    "An informal exchange house shortchanges you|Una cueva financiera te da mal el cambio|Un bureau de change informel te trompe sur le taux|非公式の両替所で損をする",
    "The rate chalked outside the 'cueva' looked fine until the bills were actually counted out, at a rate quietly worse than the one advertised. Informal exchange has long filled the gap between the official rate and what people are actually willing to pay.|La cotización escrita a tiza afuera de la 'cueva' se veía bien hasta que los billetes se contaron de verdad, a un tipo de cambio en silencio peor que el anunciado. El cambio informal lleva mucho tiempo llenando la brecha entre la cotización oficial y lo que la gente está realmente dispuesta a pagar.|Le taux affiché à la craie devant la « cueva » avait l'air correct jusqu'à ce que les billets soient réellement comptés, à un taux discrètement moins bon que celui annoncé. Le change informel comble depuis longtemps l'écart entre le taux officiel et ce que les gens sont réellement prêts à payer.|「クエバ」と呼ばれる非公式の両替所の外にチョークで書かれたレートは良さそうに見えたが、実際に紙幣を数えてみると、表示よりこっそり悪いレートだった。非公式の両替は、公式レートと人々が実際に払ってもよいと思う額との差を長く埋めてきた。",
  ),

  // ---- pa パンパ・首都圏(3件:増2・減1) ----
  ev(
    "grain-elevator-overtime", "gain", ["pa"], "🌾", 230,
    "Overtime loading a grain ship at the port|Horas extra cargando un buque granelero en el puerto|Heures supplémentaires à charger un navire céréalier au port|港で穀物船への積み込みの残業",
    "A ship at Rosario needed its hold topped off before the tide turned, and the elevator crew was paid a premium to keep the conveyor running past the end of the shift. The Paraná's grain terminals rarely stop moving during harvest.|Un buque en Rosario necesitaba completar la bodega antes de que cambiara la marea, y la cuadrilla del silo cobró un plus por mantener la cinta transportadora funcionando después del turno. Las terminales graneleras del Paraná casi no paran durante la cosecha.|Un navire à Rosario devait finir de remplir sa cale avant le changement de marée, et l'équipe du silo fut payée en prime pour garder le tapis roulant en marche après la fin du poste. Les terminaux céréaliers du Paraná s'arrêtent rarement pendant la récolte.|ロサリオの船は潮目が変わる前に船倉を満たす必要があり、サイロの作業員は勤務時間を超えてコンベアを動かし続けたぶんの割増賃金をもらった。収穫期のパラナ川の穀物ターミナルはめったに止まらない。",
    [0, 1],
  ),
  ev(
    "feria-de-mataderos-stall", "gain", ["pa"], "🪗", 180,
    "A good day selling crafts at the Feria de Mataderos|Un buen día vendiendo artesanías en la Feria de Mataderos|Une bonne journée à vendre de l'artisanat à la Feria de Mataderos|マタデロスの市で工芸品がよく売れた日",
    "The Sunday crowd at Buenos Aires' gaucho-themed street fair lingered longer than usual around the leatherwork stall, drawn in by a folk duo playing chamamé nearby. A slow morning turned into a solid day's takings by closing time.|El público del domingo en la feria callejera gauchesca de Buenos Aires se quedó más de lo habitual alrededor del puesto de artículos de cuero, atraído por un dúo folclórico tocando chamamé cerca. Una mañana floja se convirtió en una buena recaudación para el cierre.|Le public du dimanche à la foire de rue gaucho de Buenos Aires s'attarda plus longtemps que d'habitude autour de l'étal de maroquinerie, attiré par un duo folklorique jouant du chamamé tout près. Une matinée calme se transforma en une bonne recette à l'heure de la fermeture.|ブエノスアイレスのガウチョをテーマにした日曜の路上市では、近くでチャマメを弾くフォルクローレのデュオに引き寄せられた客が革製品の屋台の周りに長く留まった。冴えなかった午前中が、閉店までにしっかりした売上に変わった。",
  ),
  ev(
    "bache-tire-repair", "loss", ["pa"], "🕳️", 220,
    "A pothole on a Buenos Aires avenue costs a tyre|Un bache en una avenida porteña se cobra una goma|Un nid-de-poule sur une avenue de Buenos Aires coûte un pneu|ブエノスアイレスの大通りの穴ぼこでタイヤをやられる",
    "The pothole was hidden under a puddle from the last rain, and there was no swerving around it in the middle lane of traffic. Complaints about the state of the pavement are practically a local pastime in the capital.|El bache estaba escondido bajo un charco de la última lluvia, y no hubo forma de esquivarlo en el carril del medio. Quejarse del estado del pavimento es prácticamente un pasatiempo local en la capital.|Le nid-de-poule était caché sous une flaque laissée par la dernière pluie, impossible de l'éviter dans la voie du milieu. Se plaindre de l'état de la chaussée est presque un passe-temps local dans la capitale.|前の雨でできた水たまりの下に隠れていた穴ぼこは、真ん中の車線では避けようがなかった。舗装の状態への不満は、首都ではほとんど地元の娯楽のようなものである。",
  ),

  // ---- no 北西部(NOA、2件:増1・減1) ----
  ev(
    "zafra-cane-cutting-pay", "gain", ["no"], "🎋", 210,
    "A day's pay cutting cane during the zafra|Un jornal cortando caña durante la zafra|Un salaire journalier à couper la canne pendant la zafra|サフラの期間にサトウキビを刈った日当",
    "The mill was short of cutters with the harvest running behind schedule, and a day swinging a machete through the cane rows paid better than most odd jobs around Tucumán that week. The zafra runs for months, but the busiest days pay best.|Al ingenio le faltaban cortadores con la cosecha atrasada, y un día blandiendo el machete entre las hileras de caña pagó mejor que la mayoría de las changas por Tucumán esa semana. La zafra dura meses, pero los días de más apuro pagan mejor.|Le moulin manquait de coupeurs avec la récolte en retard, et une journée à manier la machette entre les rangs de canne paya mieux que la plupart des petits boulots dans les environs de Tucumán cette semaine-là. La zafra dure des mois, mais les jours de rush paient le mieux.|収穫が遅れ気味だった製糖工場は刈り手が足りず、サトウキビの畝でマチェテを振るった一日は、その週トゥクマン周辺のたいていの臨時仕事より稼げた。サフラは数か月続くが、いちばん忙しい日がいちばん実入りがよい。",
    [4, 5, 6],
  ),
  ev(
    "soroche-puna-delay", "loss", ["no"], "😵", 220,
    "Altitude sickness in the high puna forces a stop|El mal de altura en la puna alta obliga a parar|Le mal des montagnes sur la haute puna force un arrêt|プナの高地で高山病に足止めされる",
    "The headache set in faster than expected above 3,700 metres near San Antonio de los Cobres, and a canister of bottled oxygen and a rest at the next town were not optional. The puna doesn't care how carefully the trip was planned.|El dolor de cabeza llegó más rápido de lo esperado por encima de los 3.700 metros cerca de San Antonio de los Cobres, y una bombona de oxígeno y un descanso en el pueblo siguiente no fueron opcionales. La puna no atiende a lo bien planeado que estuviera el viaje.|Le mal de tête est arrivé plus vite que prévu au-dessus de 3 700 mètres près de San Antonio de los Cobres, et une bonbonne d'oxygène ainsi qu'un repos dans la ville suivante n'étaient pas facultatifs. La puna se moque de la minutie avec laquelle le voyage avait été préparé.|サンアントニオ・デ・ロス・コブレス近くの標高3700メートルを超えたあたりで、頭痛は思ったより早くやってきた。酸素ボンベと次の町での休息は避けられなかった。旅程をどれだけ入念に計画していても、プナには関係ない。",
  ),

  // ---- me メソポタミア・北東部(2件:増1・減1) ----
  ev(
    "tarefero-yerba-pay", "gain", ["me"], "🧉", 200,
    "A tarefero's pay for a full sack of yerba|El jornal de un tarefero por una bolsa llena de yerba|La paie d'un tarefero pour un sac plein de maté|イェルバの袋を満たしたタレフェロの日当",
    "The bag slung from the shoulder strap weighed close to the picker's own body weight by the time the field was cleared, and pay came by the kilo rather than the hour. Misiones' yerba mate harvest runs on piecework, sack by sack.|La bolsa colgada de la correa al hombro pesaba casi lo mismo que el propio tarefero cuando se terminó de limpiar el campo, y se pagó por kilo y no por hora. La cosecha de yerba mate en Misiones funciona a destajo, bolsa por bolsa.|Le sac suspendu à la bretelle pesait presque autant que le cueilleur lui-même une fois le champ dégagé, et la paie se fit au kilo plutôt qu'à l'heure. La récolte de maté à Misiones fonctionne à la pièce, sac par sac.|畑を刈り終える頃には、肩紐で吊るした袋は摘み手自身の体重に近い重さになっており、支払いは時間ではなくキロ単位だった。ミシオネスのイェルバ・マテの収穫は、袋ごとの出来高で回っている。",
    [1, 2],
  ),
  ev(
    "gran-capitan-flood-delay", "loss", ["me"], "🌊", 200,
    "Floodwater on the Paraná delays the train|La crecida del Paraná demora el tren|Une crue du Paraná retarde le train|パラナ川の増水が列車を遅らせる",
    "Water crept over the standard-gauge track outside town after days of upstream rain, and El Gran Capitán sat waiting for a track crew to confirm the line was safe before creeping through at a walking pace. Meals and a missed connection came out of pocket.|El agua trepó sobre la vía de trocha estándar a las afueras del pueblo tras días de lluvia río arriba, y El Gran Capitán quedó esperando que una cuadrilla confirmara que la vía era segura antes de avanzar al paso. Las comidas y una combinación perdida salieron del bolsillo.|L'eau a grimpé sur la voie à écartement standard aux abords de la ville après des jours de pluie en amont, et El Gran Capitán attendit qu'une équipe confirme que la voie était sûre avant d'avancer au pas. Repas et correspondance manquée sont sortis de la poche.|上流での数日にわたる雨のあと、町はずれの標準軌の線路に水がじわじわと迫り、エル・グラン・カピタンは保線員が安全を確認するまで待たされ、そのあと徐行で進んだ。食事代と乗り継ぎ損ねの分は自腹になった。",
    [1, 2, 3],
  ),

  // ---- cu クージョ(2件:増1・減1) ----
  ev(
    "vendimia-picking-pay", "gain", ["cu"], "🍇", 210,
    "A day's pay picking grapes for the vendimia|El jornal de un día cosechando uva para la vendimia|Une journée de paie à cueillir du raisin pour les vendanges|ベンディミアのぶどう摘みの日当",
    "The bodega needed extra hands to bring in a block of Malbec before a forecast hailstorm, and picking paid by the bin rather than the hour that week. A ruined harvest is worse for everyone than a rushed one.|La bodega necesitaba manos extra para levantar una parcela de Malbec antes de un granizo pronosticado, y esa semana la cosecha se pagó por bin y no por hora. Una cosecha arruinada es peor para todos que una apurada.|La bodega avait besoin de bras supplémentaires pour rentrer une parcelle de Malbec avant une grêle annoncée, et cette semaine-là la cueillette se payait au bac plutôt qu'à l'heure. Une récolte ruinée est pire pour tout le monde qu'une récolte précipitée.|ワイナリーは雹の予報が出る前にマルベックの区画を収穫するため人手を求め、その週は時給ではなくコンテナの数で支払われた。台無しになった収穫は、急いだ収穫よりみんなにとって痛手が大きい。",
    [11, 0],
  ),
  ev(
    "zonda-wind-damage", "loss", ["cu"], "🌬️", 210,
    "A hot Zonda wind damages a stand of vines|Un viento zonda caliente daña un cuadro de viñas|Un vent chaud, le Zonda, endommage un rang de vignes|熱いソンダ風がぶどうの畝を痛める",
    "The dry wind came down off the Andes without much warning and pushed temperatures up more than fifteen degrees in a few hours, scorching a stand of vines and raising the fire risk across the valley for days after. Growers in Cuyo watch the sky for it every spring.|El viento seco bajó de los Andes sin mucho aviso y subió la temperatura más de quince grados en pocas horas, quemando un cuadro de viñas y elevando el riesgo de incendio en el valle por varios días. Los productores de Cuyo lo vigilan cada primavera.|Le vent sec est descendu des Andes sans grand préavis et a fait grimper la température de plus de quinze degrés en quelques heures, brûlant un rang de vignes et élevant le risque d'incendie dans la vallée pendant plusieurs jours. Les producteurs de Cuyo le guettent chaque printemps.|乾いた風がほとんど前触れなくアンデスから吹き下ろし、数時間のうちに気温を15度以上押し上げ、ぶどうの畝を焦がして、その後何日も谷全体の火災の危険を高めた。クージョの生産者たちは毎年春、この風を空に警戒している。",
    [7, 8, 9],
  ),

  // ---- pt パタゴニア(3件:増1・減2) ----
  ev(
    "esquila-shearing-pay", "gain", ["pt"], "🐑", 240,
    "A shearing crew's pay for a big estancia|El jornal de una cuadrilla de esquila en una gran estancia|La paie d'une équipe de tondeurs pour une grande estancia|大きなestanciaでの毛刈り一団の日当",
    "The flock at this estancia ran into the thousands, and a shearing crew working fast through the pens was paid by the head rather than the day. Wool still leaves Patagonia much as it always has, even though almost nothing else about getting it to port has stayed the same.|El rebaño de esta estancia llegaba a los miles, y una cuadrilla de esquila que trabajó rápido entre los corrales cobró por cabeza y no por día. La lana todavía sale de la Patagonia casi como siempre, aunque casi nada más de cómo llega al puerto haya seguido igual.|Le troupeau de cette estancia se comptait en milliers, et une équipe de tondeurs travaillant vite dans les enclos fut payée à la tête plutôt qu'à la journée. La laine quitte encore la Patagonie à peu près comme toujours, même si presque rien d'autre dans son acheminement au port n'est resté pareil.|このestanciaの群れは数千頭にのぼり、囲いの中を手早くこなした毛刈りの一団は日当ではなく頭数で支払われた。羊毛はいまも昔とほとんど変わらぬやり方でパタゴニアを出ていくが、港へ届くまでの道のりはそれ以外ほとんど様変わりしている。",
    [7, 8],
  ),
  ev(
    "guanaco-crossing-damage", "loss", ["pt"], "🦙", 230,
    "Swerving for a guanaco herd on Ruta 40 costs a repair|Esquivar una tropilla de guanacos en la Ruta 40 sale caro|Faire un écart pour des guanacos sur la Ruta 40 coûte une réparation|国道40号でグアナコの群れを避けて修理代がかかる",
    "A herd of guanacos crossed the highway at dusk without any warning, and the swerve to avoid them ended in a ditch instead. Tow trucks are scarce for hundreds of kilometres along Ruta 40, so the repair bill came with a long wait attached.|Una tropilla de guanacos cruzó la ruta al atardecer sin aviso, y el esquive terminó en la zanja de todos modos. Las gruas escasean por cientos de kilómetros en la Ruta 40, así que la factura del arreglo vino con una espera larga.|Une harde de guanacos a traversé la route au crépuscule sans prévenir, et l'écart pour les éviter a fini dans le fossé quand même. Les dépanneuses sont rares sur des centaines de kilomètres le long de la Ruta 40, alors la facture est venue avec une longue attente en prime.|夕暮れ時、前触れもなくグアナコの群れが道を横切り、それを避けようとした結果、溝にはまってしまった。国道40号線では何百キロもレッカー車が見つからず、修理代には長い待ち時間もついてきた。",
  ),
  ev(
    "ushuaia-cold-snap-heating", "loss", ["pt"], "🥶", 200,
    "An early cold snap in Ushuaia runs up the heating bill|Una ola de frío temprana en Ushuaia sube la factura de calefacción|Un coup de froid précoce à Ushuaia fait grimper la facture de chauffage|ウシュアイアの早い寒波が暖房費を押し上げる",
    "Temperatures dropped hard weeks earlier than usual, and the gas bottle that was supposed to last the month ran out in half that time. At the edge of the Beagle Channel, a cold snap is never really a surprise, just badly timed.|Las temperaturas bajaron fuerte semanas antes de lo habitual, y la garrafa de gas que debía durar el mes se acabó en la mitad de ese tiempo. Al borde del canal Beagle, una ola de frío nunca es realmente una sorpresa, solo mal sincronizada.|Les températures ont chuté fortement des semaines plus tôt que d'habitude, et la bonbonne de gaz censée durer le mois s'est vidée en moitié moins de temps. Au bord du canal Beagle, un coup de froid n'est jamais vraiment une surprise, juste mal calé dans le temps.|例年より何週間も早く気温が急に下がり、1か月もつはずだったガスボンベは半分の期間で底をついた。ビーグル水道のほとりでは、寒波そのものは驚きではなく、ただ時期が悪かっただけである。",
    [4, 5, 10, 11],
  ),
];
