/**
 * チリの青マス・赤マスで起きる出来事(17件。増9・減8)。
 *
 * 地方コード: ng=ノルテ・グランデ / nc=ノルテ・チコ / ce=セントラル /
 * su=スル / au=アウストラル
 *
 * 地方を指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、ng3・nc2・ce3・su3・au2件を、それぞれの土地の産業や
 * 気候に結びつけて置いている。
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

export const CHILE_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(4件) ----
  ev(
    "empanada-stand-rush", "gain", [], "🥟", 190,
    "A rush of orders at the empanada stand|Un aluvión de pedidos en el puesto de empanadas|Une ruée de commandes au stand d'empanadas|エンパナーダ屋台に注文が殺到する",
    "A queue formed faster than one pair of hands could fold and seal the dough, and helping crimp empanada edges for an hour earned a cut of the takings plus a couple to take home. Empanadas de pino, filled with meat, onion, olive and egg, sell fastest around any national holiday.|Se formó una cola más rápido de lo que un par de manos podía amasar y sellar la masa, y ayudar a repulgar empanadas por una hora ganó una parte de lo recaudado más un par para llevar a casa. Las empanadas de pino, rellenas de carne, cebolla, aceituna y huevo, se venden más rápido en cualquier feriado nacional.|Une file s'est formée plus vite qu'une seule paire de mains ne pouvait plier et sceller la pâte, et aider à replier des empanadas pendant une heure a rapporté une part de la recette plus deux à emporter. Les empanadas de pino, farcies de viande, d'oignon, d'olive et d'œuf, se vendent le plus vite lors de n'importe quel jour férié national.|一組の手で生地を折って閉じる速さを追い越すほど行列ができ、1時間エンパナーダの端をつまんで閉じる手伝いをすると、売上の一部と持ち帰り用の2個をもらえた。肉と玉ねぎ、オリーブ、卵を詰めたエンパナーダ・デ・ピノは、どの国の祝日でもいちばん早く売り切れる。",
  ),
  ev(
    "kino-tip-off", "gain", [], "🎟️", 170,
    "An elderly neighbour shares a Kino win|Una vecina mayor comparte un premio del Kino|Une voisine âgée partage un gain au Kino|年配の隣人がキノの当選金を分けてくれる",
    "An elderly neighbour who always plays the same birthday numbers won a modest Kino prize and insisted on sharing it for the help carrying groceries up four flights of stairs every week. The numbers-drawn lottery is played by people of every age, several times a week, in nearly every neighbourhood.|Una vecina mayor que siempre juega los mismos números de cumpleaños ganó un premio modesto del Kino e insistió en compartirlo por la ayuda de subir las compras cuatro pisos todas las semanas. La lotería de números la juega gente de todas las edades, varias veces por semana, en casi todos los barrios.|Une voisine âgée qui joue toujours les mêmes numéros d'anniversaire a gagné un modeste lot au Kino et a insisté pour le partager en échange de l'aide à monter les courses quatre étages chaque semaine. Cette loterie à numéros est jouée par des gens de tout âge, plusieurs fois par semaine, dans presque tous les quartiers.|いつも自分の誕生日にちなんだ数字で賭ける年配の隣人がキノでささやかな賞金を当て、毎週4階まで買い物を運んでもらっているお礼にと分けてくれた。この数字くじはほとんどどの街区でも、週に何度も、あらゆる年代の人に遊ばれている。",
  ),
  ev(
    "carrete-taxi-surge", "loss", [], "🚕", 200,
    "A night out ends with surge pricing|Una salida termina con tarifa dinámica|Une soirée se termine avec une tarification dynamique|夜遊びの帰りに割増運賃がかかる",
    "The carrete ran long past the last bus, and the ride-hailing app's fare had climbed well past what it showed when the night started. Everyone at the table agreed to split it, which softened the blow but did not erase it.|El carrete se alargó bastante después del último bus, y la tarifa de la aplicación de viajes había subido bastante más de lo que mostraba al empezar la noche. Todos en la mesa acordaron dividirla, lo que suavizó el golpe pero no lo borró.|La fête a duré bien après le dernier bus, et le tarif de l'application de VTC avait grimpé bien au-delà de ce qu'il affichait en début de soirée. Toute la tablée a accepté de partager la note, ce qui a adouci le coup sans l'effacer.|カレテ(飲み会)が最終バスの時間をとっくに過ぎるまで続き、配車アプリの運賃は夜の初めに表示されていた額よりずっと高くなっていた。みんなで割り勘にすることになり、痛手は和らいだが消えはしなかった。",
    [4, 5, 6, 7, 8, 9, 10, 11],
  ),
  ev(
    "micro-fare-evasion-fine", "loss", [], "🚌", 180,
    "Caught without a validated fare card|Sorprendido sin tarjeta de pasaje validada|Pris sans carte de transport validée|運賃カードの未検証を見つかる",
    "An inspector boarded three stops early and asked everyone to show a validated Bip! card, and the fine for a card that had run out of balance without anyone noticing cost far more than the fare itself ever would have.|Un fiscalizador subió tres paradas antes y pidió a todos mostrar la tarjeta Bip! validada, y la multa por una tarjeta que se había quedado sin saldo sin que nadie lo notara costó mucho más de lo que habría costado el pasaje.|Un contrôleur est monté trois arrêts plus tôt et a demandé à tous de montrer une carte Bip! validée, et l'amende pour une carte tombée à court de solde sans que personne ne le remarque a coûté bien plus cher que le trajet lui-même.|検札員がいつもより3停留所早く乗り込み、全員に検証済みのビップ!カードの提示を求めた。誰も気づかないうちに残高が切れていたカードの罰金は、運賃そのものよりずっと高くついた。",
  ),

  // ---- ng ノルテ・グランデ ----
  ev(
    "copper-loading-shift", "gain", ["ng"], "⛏️", 240,
    "An extra shift loading copper concentrate|Un turno extra cargando concentrado de cobre|Un quart de travail en plus pour charger du concentré de cuivre|銅精鉱の積み込みに臨時で入る",
    "A loading crew at the port was short-handed before a ship's tight departure window, and an extra pair of hands for the shift was paid well above the usual day rate. Copper concentrate leaves Chile's northern ports around the clock, timed tightly to shipping schedules set months in advance.|Una cuadrilla de carga en el puerto andaba corta de gente antes de la estrecha ventana de zarpe de un barco, y un par de manos extra para el turno se pagó bastante por encima de la tarifa diaria habitual. El concentrado de cobre sale de los puertos del norte de Chile a toda hora, ajustado a horarios de embarque fijados con meses de antelación.|Une équipe de chargement au port manquait de bras avant le créneau de départ serré d'un navire, et une paire de mains supplémentaire pour le quart fut payée bien au-dessus du tarif journalier habituel. Le concentré de cuivre quitte les ports du nord du Chili à toute heure, calé sur des horaires d'expédition fixés des mois à l'avance.|船の出港までの窓が狭く、港の積み込み班は人手を欲しがっていた。その日の臨時要員は通常の日当をかなり上回る額で雇われた。銅精鉱はチリ北部の港から昼夜を問わず積み出され、何か月も前から決まっている船積みの予定に合わせている。",
  ),
  ev(
    "ghosttown-tour-guide-tip", "gain", ["ng"], "🏚️", 200,
    "A generous tip from a ghost-town tour group|Una propina generosa de un grupo de turistas al pueblo fantasma|Un généreux pourboire d'un groupe de touristes dans la ville fantôme|ゴーストタウン見学の一団からの心付け",
    "A group of visitors spent longer than scheduled asking about the old nitrate offices' fichas and pulperías, and the extra time explaining daily life in a company town was rewarded with a tip well above the standard fee. Guided tours through the abandoned oficinas draw visitors from around the world every week.|Un grupo de visitantes se quedó más tiempo del previsto preguntando por las fichas y las pulperías de las viejas oficinas salitreras, y el tiempo extra explicando la vida diaria en un pueblo de compañía se premió con una propina bastante por encima de la tarifa habitual. Los recorridos guiados por las oficinas abandonadas atraen visitantes de todo el mundo cada semana.|Un groupe de visiteurs est resté plus longtemps que prévu à poser des questions sur les fichas et les épiceries des anciens bureaux du salpêtre, et le temps supplémentaire passé à expliquer la vie quotidienne dans une ville-usine fut récompensé par un pourboire bien au-dessus du tarif habituel. Les visites guidées des oficinas abandonnées attirent chaque semaine des visiteurs du monde entier.|訪問客の一団が、古い硝石事務所のフィチャやプルペリアについて予定より長く質問を続け、企業城下町の日常を説明した余分な時間には、通常の料金をかなり上回る心付けが払われた。廃墟となったオフィシナの見学ツアーには、毎週世界各地から訪問客が集まる。",
  ),
  ev(
    "desert-heat-ac-repair", "loss", ["ng"], "🥵", 220,
    "The truck's air conditioning fails in the desert heat|El aire acondicionado del camión falla en el calor del desierto|La climatisation du camion tombe en panne dans la chaleur du désert|砂漠の暑さの中でトラックのエアコンが壊れる",
    "The compressor gave out on a stretch of highway with no shade for kilometres in either direction, and finishing the drive with the windows down in daytime desert heat made the repair bill feel more than fair once the workshop finally fixed it. Daytime temperatures on the Atacama's salt flats can swing more than 30 degrees from the freezing desert night.|El compresor falló en un tramo de carretera sin sombra por kilómetros en ambas direcciones, y terminar el viaje con las ventanas abajo bajo el calor diurno del desierto hizo que la cuenta del taller pareciera más que justa una vez arreglado. Las temperaturas diurnas en los salares de Atacama pueden variar más de 30 grados respecto a la noche desértica helada.|Le compresseur a lâché sur un tronçon d'autoroute sans ombre sur des kilomètres dans les deux sens, et finir le trajet vitres baissées sous la chaleur diurne du désert a rendu la facture de l'atelier plus que justifiée une fois la réparation faite. Les températures diurnes sur les salars de l'Atacama peuvent varier de plus de 30 degrés par rapport à la nuit désertique glaciale.|両方向とも何キロメートルも日陰の無い区間でコンプレッサーが壊れ、砂漠の日中の暑さの中を窓を開けたまま走り切ることになった。修理が終わる頃には、その代金が高いどころか妥当に思えたほどだった。アタカマの塩湖では、氷点下まで冷え込む砂漠の夜と昼とで気温が30度以上変わることもある。",
  ),

  // ---- nc ノルテ・チコ ----
  ev(
    "pisco-harvest-help", "gain", ["nc"], "🍇", 210,
    "A day helping bring in the muscat grapes|Un día ayudando a cosechar la uva moscatel|Une journée à aider à rentrer le raisin muscat|マスカット種のブドウの収穫を手伝う",
    "A pisco distillery's regular pickers were short by two for the final push before the grapes overripened on the vine, and a long day in the Elqui sun was paid by the crate filled. The valley's clear skies that make it good for stargazing are the same ones that ripen the muscat grapes pisco is distilled from.|A los recolectores habituales de una destilería de pisco les faltaban dos personas para el empujón final antes de que la uva madurara de más en la parra, y un día largo bajo el sol de Elqui se pagó por cajón lleno. Los cielos despejados del valle que lo hacen bueno para observar estrellas son los mismos que maduran la uva moscatel con que se destila el pisco.|Il manquait deux cueilleurs habituels d'une distillerie de pisco pour le dernier effort avant que le raisin ne mûrisse trop sur pied, et une longue journée sous le soleil de l'Elqui fut payée à la caisse remplie. Les ciels dégagés de la vallée, qui la rendent propice à l'observation des étoiles, sont les mêmes qui font mûrir le raisin muscat dont on distille le pisco.|ピスコ蒸留所のいつもの摘み手が、ブドウが熟しすぎる前の最後の追い込みに2人足りず、エルキの日差しの下での長い一日は満たした箱の数で払われた。星空観測に向くこの谷の澄んだ空こそが、ピスコの原料となるマスカット種のブドウを熟させている。",
    [11, 0],
  ),
  ev(
    "observatory-tour-cancelled-refund", "loss", ["nc"], "🔭", 190,
    "A prepaid observatory tour is cancelled for dust|Un tour pagado al observatorio se cancela por polvo en suspensión|Une visite d'observatoire prépayée est annulée pour cause de poussière|砂塵で前払いの天文台ツアーが中止になる",
    "A rare dust haze rolled in from inland and pushed the humidity and particle count just over the limit for opening the dome, and the prepaid tour was cancelled with only a partial refund offered. Observatories here schedule around conditions that are usually excellent, which makes the rare cancelled night sting more.|Una rara neblina de polvo llegó desde el interior y empujó la humedad y el conteo de partículas justo sobre el límite para abrir la cúpula, y el tour pagado se canceló con solo un reembolso parcial. Los observatorios de aquí programan en torno a condiciones que suelen ser excelentes, lo que hace doler más la rara noche cancelada.|Une rare brume de poussière est arrivée de l'intérieur des terres et a fait passer l'humidité et le taux de particules juste au-dessus de la limite pour ouvrir la coupole, et la visite prépayée fut annulée avec seulement un remboursement partiel. Les observatoires d'ici programment autour de conditions habituellement excellentes, ce qui rend plus amère la rare nuit annulée.|内陸から珍しく舞い込んだ砂塵が湿度と粒子数をドームを開けられる限界のわずかに上まで押し上げ、前払いしていたツアーは一部返金だけで中止になった。この地の天文台はふだん申し分ない条件を前提に予定を組んでいるだけに、まれに起こる中止はいっそう痛い。",
  ),

  // ---- ce セントラル ----
  ev(
    "vendimia-grape-picking", "gain", ["ce"], "🍷", 220,
    "A day picking grapes for the vendimia|Un día cosechando uva para la vendimia|Une journée à cueillir du raisin pour les vendanges|収穫祭のブドウを摘む一日",
    "A Colchagua vineyard needed extra cutters before an early-morning rainstorm was forecast to swell the grapes and dilute the harvest, and a rushed morning in the rows was paid by the bin filled rather than the hour. Central Chile's wine valleys export to markets on every inhabited continent.|Un viñedo de Colchagua necesitaba cortadores extra antes de que se pronosticara una tormenta matutina que hincharía la uva y diluiría la cosecha, y una mañana apurada entre las hileras se pagó por bins llenos y no por hora. Los valles vitivinícolas del centro de Chile exportan a mercados de todos los continentes habitados.|Un vignoble de Colchagua avait besoin de coupeurs supplémentaires avant qu'un orage matinal prévu ne gonfle le raisin et dilue la récolte, et une matinée précipitée dans les rangs fut payée à la caisse remplie plutôt qu'à l'heure. Les vallées viticoles du centre du Chili exportent vers des marchés sur tous les continents habités.|朝の嵐がブドウを膨らませて糖度を薄めてしまうという予報を受け、コルチャグアのブドウ畑は追加の刈り手を必要としていた。畝のあいだでの慌ただしい朝は、時給ではなく満たした収穫箱の数で払われた。中部チリのワイン産地は、人の住むすべての大陸の市場へ輸出している。",
    [11, 0],
  ),
  ev(
    "santiago-metro-busker", "gain", ["ce"], "🎸", 180,
    "A good afternoon busking in the Metro|Una buena tarde tocando en el Metro|Un bon après-midi à jouer de la musique dans le métro|地下鉄での大道芸で稼いだ午後",
    "A guitar case left open on a station platform filled faster than usual during the evening rush, when tired commuters seemed more generous than the morning crowd ever is. Santiago's Metro authorises certain platforms and stations for registered musicians rather than leaving it to chance.|Un estuche de guitarra dejado abierto en el andén de una estación se llenó más rápido de lo habitual durante la hora punta de la tarde, cuando los pasajeros cansados parecían más generosos que la multitud de la mañana. El Metro de Santiago autoriza ciertos andenes y estaciones para músicos registrados en vez de dejarlo al azar.|Un étui de guitare laissé ouvert sur un quai de station s'est rempli plus vite que d'habitude pendant l'heure de pointe du soir, quand les usagers fatigués semblaient plus généreux que la foule du matin. Le métro de Santiago autorise certains quais et stations pour des musiciens enregistrés plutôt que de laisser cela au hasard.|ホームに開けて置いたギターケースは、夕方のラッシュのあいだ、疲れた通勤客が朝の人混みよりも気前よく思えるほど、いつもより早く硬貨で満たされた。サンティアゴの地下鉄は、成り行き任せにせず、登録した演奏家に特定のホームや駅を認可している。",
  ),
  ev(
    "smog-day-restriction-fine", "loss", ["ce"], "🚫", 210,
    "Caught driving on a smog-alert restriction day|Sorprendido manejando en día de restricción por alerta de esmog|Pris à conduire un jour de restriction pour alerte au smog|スモッグ警報の走行規制日に運転していて摘発される",
    "A winter smog alert restricted certain licence plates from driving that day, and the ending digit was checked before the reason for forgetting could even be offered. Santiago's basin traps enough vehicle exhaust in winter that the restriction, tied to plate numbers, rotates through the whole city in turn.|Una alerta de esmog invernal restringió circular ese día a ciertas patentes, y el dígito final se revisó antes de que se pudiera siquiera dar la razón del olvido. La cuenca de Santiago atrapa suficiente humo vehicular en invierno como para que la restricción, ligada a los números de patente, rote por toda la ciudad por turnos.|Une alerte au smog hivernal restreignait ce jour-là la circulation de certaines plaques, et le dernier chiffre fut vérifié avant même qu'on ait pu donner la raison de l'oubli. Le bassin de Santiago retient assez de gaz d'échappement en hiver pour que la restriction, liée aux numéros de plaque, tourne à travers toute la ville chacun son tour.|冬のスモッグ警報でその日は特定のナンバープレートの走行が制限されていたが、忘れていた理由を言う間もなく末尾の数字を確認された。サンティアゴの盆地は冬に車の排気をあまりに溜め込むため、ナンバー末尾に基づくこの規制は、市内全域を順番に巡っていく。",
    [4, 5, 6, 7],
  ),

  // ---- su スル ----
  ev(
    "salmon-farm-shift", "gain", ["su"], "🐟", 230,
    "An extra shift at the salmon farm|Un turno extra en el centro de cultivo de salmón|Un quart de travail en plus à la ferme de saumon|サーモン養殖場での臨時勤務",
    "A net-pen crew needed extra hands to move fish between cages before a storm warning, and the wet, cold work was paid at a premium for the short notice. Chile is one of the world's largest salmon exporters, an industry built almost entirely around the sheltered waters of the lake district and the fjords further south.|Una cuadrilla de jaulas necesitaba manos extra para trasladar peces entre jaulas antes de una alerta de temporal, y el trabajo mojado y frío se pagó con recargo por el aviso a última hora. Chile es uno de los mayores exportadores de salmón del mundo, una industria construida casi por completo en torno a las aguas resguardadas de la zona de los lagos y los fiordos más al sur.|Une équipe de cages en filet avait besoin de bras supplémentaires pour déplacer les poissons entre les cages avant une alerte de tempête, et ce travail froid et humide fut payé avec une prime pour le court préavis. Le Chili est l'un des plus grands exportateurs de saumon au monde, une industrie bâtie presque entièrement autour des eaux abritées de la région des lacs et des fjords plus au sud.|嵐の警報の前に、生け簀の間で魚を移す作業に人手が要り、濡れて冷たい仕事は急な呼び出しの分だけ割増で払われた。チリは世界有数のサーモン輸出国で、その産業のほぼすべては湖水地方とさらに南のフィヨルドの穏やかな海に成り立っている。",
  ),
  ev(
    "kuchen-cafe-help", "gain", ["su"], "🍰", 190,
    "Helping out at a German-style kuchen café|Ayudando en un café de kuchen alemán|Un coup de main dans un café à kuchen allemand|ドイツ風ケーキ喫茶を手伝う",
    "A lakeside café ran out of hands on a weekend when three tour buses arrived at once, and an afternoon slicing kuchen and pouring coffee earned tips on top of the wage. Recipes brought by nineteenth-century German-speaking settlers are still handed down in family kitchens across the lake district.|Un café junto al lago se quedó sin manos un fin de semana en que llegaron tres buses de turismo a la vez, y una tarde cortando kuchen y sirviendo café dejó propinas además del sueldo. Recetas traídas por los colonos de habla alemana del siglo XIX todavía se transmiten en cocinas familiares por toda la zona de los lagos.|Un café au bord du lac manquait de bras un week-end où trois bus de touristes arrivèrent en même temps, et un après-midi à découper du kuchen et servir du café rapporta des pourboires en plus du salaire. Des recettes apportées par les colons germanophones du XIXe siècle se transmettent encore dans les cuisines familiales de toute la région des lacs.|3台の観光バスが一度に到着した週末、湖畔のカフェは人手が足りなくなり、午後じゅうクーヘンを切り分けコーヒーを注ぐと、賃金に加えてチップももらえた。19世紀のドイツ語圏の入植者が持ち込んだレシピは、いまも湖水地方の家庭の台所で代々受け継がれている。",
  ),
  ev(
    "ferry-missed-rebooking", "loss", ["su"], "⛴️", 200,
    "Missing the Chiloé ferry and paying to rebook|Perder el ferry a Chiloé y pagar para reprogramar|Rater le ferry pour Chiloé et payer pour reprogrammer|チロエ行きのフェリーに乗り遅れ、変更料金を払う",
    "Traffic backed up for kilometres before the crossing, and the ferry pulled away from the ramp just as the front of the queue came into view, leaving no choice but to pay a change fee for the next sailing. Weekend and holiday traffic can back up for hours at the narrowest crossing points to the south.|El tráfico se acumuló por kilómetros antes del cruce, y el ferry zarpó de la rampa justo cuando el frente de la fila quedó a la vista, sin dejar más opción que pagar un cargo de cambio para el próximo zarpe. El tráfico de fin de semana y feriados puede acumularse por horas en los cruces más angostos hacia el sur.|La circulation s'est accumulée sur des kilomètres avant la traversée, et le ferry a quitté la rampe juste au moment où l'avant de la file devenait visible, ne laissant d'autre choix que de payer des frais de changement pour la prochaine traversée. La circulation de week-end et de jours fériés peut s'accumuler pendant des heures aux points de passage les plus étroits vers le sud.|渡し場の手前で車の列が何キロも延び、列の先頭が見えてきたちょうどそのときフェリーは桟橋を離れてしまい、次の便への変更料金を払うほかなかった。週末や祝日には、南へ向かう最も狭い渡河点で交通が何時間も詰まることがある。",
  ),

  // ---- au アウストラル ----
  ev(
    "wool-shearing-season", "gain", ["au"], "🐑", 220,
    "Shearing season on a Patagonian estancia|Temporada de esquila en una estancia patagónica|Saison de tonte dans une estancia patagonienne|パタゴニアの牧場で毛刈りの季節",
    "An estancia short on hired shearers for the season paid well above the usual day rate for anyone who could keep up with the crew, sorting fleece by hand as fast as it came off each sheep. Wool built Punta Arenas's early fortunes, and shearing season still draws seasonal workers across the region each year.|Una estancia corta de esquiladores contratados para la temporada pagó bastante por sobre la tarifa diaria habitual a quien pudiera seguirle el ritmo a la cuadrilla, clasificando el vellón a mano tan rápido como salía de cada oveja. La lana construyó las primeras fortunas de Punta Arenas, y la temporada de esquila todavía atrae trabajadores de temporada por toda la región cada año.|Une estancia manquant de tondeurs engagés pour la saison paya bien au-dessus du tarif journalier habituel quiconque pouvait suivre le rythme de l'équipe, triant la toison à la main aussi vite qu'elle sortait de chaque mouton. La laine bâtit les premières fortunes de Punta Arenas, et la saison de tonte attire encore chaque année des travailleurs saisonniers dans toute la région.|季節雇いの毛刈り職人が足りなかった牧場は、羊から刈り取られる端から手早く羊毛を仕分けられる人になら、通常の日当をかなり上回る額を払った。羊毛はプンタ・アレナスの初期の富を築いたもので、毛刈りの季節はいまも毎年この地域一帯から季節労働者を集めている。",
    [9, 10, 11],
  ),
  ev(
    "remote-fuel-markup", "loss", ["au"], "⛽", 210,
    "Fuel costs far more this far from a refinery|El combustible cuesta mucho más lejos de una refinería|Le carburant coûte bien plus cher loin d'une raffinerie|精製所から遠いぶん燃料が高くつく",
    "The nearest fuel depot was hundreds of kilometres up the Carretera Austral, and the price per litre reflected every one of them by the time a tanker truck delivered it to the pump. Trucking fuel this far south, often with a ferry crossing along the way, adds a markup drivers in central Chile never see.|El depósito de combustible más cercano estaba a cientos de kilómetros por la Carretera Austral, y el precio por litro reflejaba cada uno de esos kilómetros para cuando un camión cisterna lo entregaba en el surtidor. Transportar combustible tan al sur, a menudo con un cruce en ferry en el camino, agrega un recargo que los conductores del centro de Chile nunca ven.|Le dépôt de carburant le plus proche se trouvait à des centaines de kilomètres le long de la Carretera Austral, et le prix au litre reflétait chacun de ces kilomètres au moment où un camion-citerne le livrait à la pompe. Transporter du carburant aussi loin au sud, souvent avec une traversée en ferry en chemin, ajoute une majoration que les conducteurs du centre du Chili ne voient jamais.|最寄りの燃料基地はカレテラ・アウストラルを何百キロも北へ行った場所にあり、タンクローリーが給油所まで届ける頃には、その距離のすべてが1リットルあたりの値段に上乗せされていた。これほど南まで、しばしばフェリーを挟んで燃料を運ぶことは、中部チリの運転手には縁のない割増料金を生む。",
  ),
];
