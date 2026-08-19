/**
 * ノルウェーの青マス・赤マスで起きる出来事(19件。増12・減7)。
 *
 * 地方コード: ol=エストラン / ve=ヴェストラン / tr=トロンデラーグ /
 * nn=ヌール・ノルゲ / so=スールラン
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、5地方それぞれに3件、土地の産業や気候に結びつけて置いている。
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

export const NORWAY_MONEY_EVENTS = [
  // ---- 全国どこでも・通年 ----
  ev(
    "ferje-lasting", "gain", [], "🚢", 220,
    "A shift unloading the coastal ferry|Un turno descargando el ferry costero|Un service à décharger le ferry côtier|沿岸フェリーの荷下ろし",
    "The dock crew was short-handed for a delivery of building supplies, and carrying crates off the ramp for a couple of hours paid in cash before the ship pulled out again on schedule. Ports up and down the coast still run on exactly this kind of last-minute hire.|La cuadrilla del muelle andaba corta de manos para una entrega de materiales de construcción, y cargar cajas por la rampa durante un par de horas se pagó en efectivo antes de que el barco zarpara de nuevo según el horario. Los puertos de toda la costa aún funcionan con este tipo de contratación de última hora.|L'équipe du quai manquait de bras pour une livraison de matériaux de construction, et porter des caisses sur la rampe pendant deux heures a été payé en espèces avant que le bateau ne reparte à l'heure. Les ports tout le long de la côte fonctionnent encore avec ce genre d'embauche de dernière minute.|建材の荷を積む埠頭の人手が足りず、数時間タラップで木箱を運ぶと、船が予定どおり出港する前に現金で支払われた。沿岸の港はいまもこうした急な日雇いで回っている。",
  ),
  ev(
    "guide-utenom-sesong", "gain", [], "🧭", 200,
    "Guiding a stray group off-season|Guiando a un grupo despistado fuera de temporada|Guider un groupe égaré hors saison|季節外れの見学団を案内する",
    "A tour bus company came up short on local guides for an unexpected booking, and knowing the town's back streets well enough to fill in for an afternoon paid better than the usual hourly work. Off-season bookings are rare enough that nobody asks too many questions about who fills the gap.|Una empresa de autobuses turísticos se quedó sin guías locales para una reserva inesperada, y conocer bien las callejuelas del pueblo como para suplir una tarde pagó mejor que el trabajo habitual por horas. Las reservas fuera de temporada son tan escasas que nadie hace demasiadas preguntas sobre quién cubre el hueco.|Une compagnie d'autocars touristiques manquait de guides locaux pour une réservation imprévue, et bien connaître les petites rues de la ville pour combler l'après-midi a mieux payé que le travail horaire habituel. Les réservations hors saison sont assez rares pour que personne ne pose trop de questions sur qui comble le vide.|観光バス会社が急な予約に地元ガイドを揃えられずにいた。町の裏通りをよく知っていたので午後だけ代役を務めると、ふだんの時給仕事よりよい実入りになった。季節外れの予約はまれなので、誰が穴を埋めたかを深く詮索する者もいない。",
  ),
  ev(
    "oslo-runde-pris", "loss", [], "🍺", 210,
    "A round of drinks at Oslo prices|Una ronda de copas a precio de Oslo|Une tournée aux prix d'Oslo|オスロ価格の一杯",
    "Buying a round without checking the menu first turns out to be a mistake in a country where alcohol tax alone can double the price of a glass, and the bill for four beers comes to something that would have covered dinner as well back home.|Pagar una ronda sin mirar antes la carta resulta un error en un país donde solo el impuesto al alcohol puede duplicar el precio de una copa, y la cuenta de cuatro cervezas asciende a algo que en casa habría cubierto también la cena.|Payer une tournée sans regarder d'abord le menu s'avère une erreur dans un pays où la seule taxe sur l'alcool peut doubler le prix d'un verre, et l'addition pour quatre bières atteint de quoi, chez soi, avoir aussi payé le dîner.|メニューを見ずに一杯おごったのが失敗だった。酒税だけでグラス一杯の値段が倍になりかねない国で、ビール4杯の勘定は、自国なら夕食まで賄えそうな額になった。",
  ),
  ev(
    "siste-buss-drosje", "loss", [], "🚕", 190,
    "A taxi after the last bus|Un taxi tras el último autobús|Un taxi après le dernier bus|最終バスを逃してタクシー",
    "The evening's last bus pulled away exactly on schedule while still a block off, and the only option left standing in the cold was a taxi whose meter seemed to run faster than the actual distance covered.|El último autobús de la noche arrancó justo a su hora estando aún a una manzana, y la única opción que quedaba, tiritando de frío, fue un taxi cuyo taxímetro parecía correr más rápido que la distancia recorrida.|Le dernier bus du soir est parti pile à l'heure alors qu'il restait encore un pâté de maisons à faire, et la seule option, plantée dans le froid, fut un taxi dont le compteur semblait tourner plus vite que la distance parcourue.|夜の最終バスは、まだ一区画手前だというのにきっかり時刻どおり出てしまい、寒空の下に残された選択肢はタクシーだけだった。走った距離より速くメーターが回っているように思えた。",
  ),

  // ---- ol エストラン(オスロ周辺) ----
  ev(
    "jernbanemuseum-vakt", "gain", ["ol"], "🚂", 230,
    "Minding the door at the railway museum|Vigilando la puerta del museo ferroviario|Surveiller l'entrée du musée ferroviaire|鉄道博物館の受付を手伝う",
    "The museum needed an extra pair of hands checking tickets for a busy weekend of steam-engine demonstrations, and the pay came with the chance to ride the turntable once the gates closed. Retired railwaymen volunteer here often enough that a paid hand mostly just frees them up to talk.|El museo necesitaba manos extra para revisar entradas en un fin de semana movido de demostraciones de locomotoras de vapor, y el pago incluyó la oportunidad de montar en la placa giratoria tras cerrar las puertas. Aquí suelen ofrecerse voluntarios ferroviarios jubilados.|Le musée avait besoin de bras pour vérifier les billets lors d'un week-end chargé de démonstrations de locomotives à vapeur, et la paie incluait la chance de monter sur la plaque tournante une fois les portes fermées. D'anciens cheminots viennent souvent y faire du bénévolat.|蒸気機関車のデモンストレーションで賑わう週末、博物館は入場券確認の人手を求めていた。給金に加え、閉館後に転車台に乗せてもらえた。引退した鉄道員がよく手伝いに来るので、雇われた側はもっぱら話し相手になるだけで済んだ。",
  ),
  ev(
    "sykkel-mot-forkjorsel", "loss", ["ol"], "🚲", 170,
    "A fine for cycling the wrong way down a one-way street|Una multa por ir en bici en sentido contrario por una calle de un solo sentido|Une amende pour avoir roulé à contresens dans une rue à sens unique|一方通行を逆走した罰金",
    "The shortcut through the old town looked clear of traffic and probably was, but the sign at the corner said otherwise, and a police officer on the same bike lane was in no mood to let it go with just a warning.|El atajo por el casco antiguo parecía libre de tráfico, y probablemente lo estaba, pero la señal de la esquina decía lo contrario, y un agente en el mismo carril bici no estaba de humor para dejarlo pasar con solo un aviso.|Le raccourci par la vieille ville semblait dégagé, et l'était sans doute, mais le panneau au coin disait le contraire, et un agent sur la même piste cyclable n'était pas d'humeur à s'en tenir à un simple avertissement.|旧市街を抜ける近道は車の姿もなく、実際そうだったのかもしれないが、角の標識は逆を告げていた。同じ自転車道にいた警官は、警告だけで済ませる気分ではなかった。",
  ),
  ev(
    "jordbaer-bod", "gain", ["ol"], "🍓", 210,
    "A roadside stand selling the season's first strawberries|Un puesto en la carretera con las primeras fresas de la temporada|Un étal en bord de route pour les premières fraises de la saison|路傍の店で今年最初のイチゴを売る",
    "The long summer daylight of the eastern lowlands is said to make the local strawberries unusually sweet, and a handwritten sign by the roadside sold out an entire crate before the afternoon traffic had even properly begun.|Se dice que la larga luz del verano en las tierras bajas del este vuelve especialmente dulces las fresas locales, y un cartel escrito a mano junto a la carretera vendió un cajón entero antes de que empezara de verdad el tráfico de la tarde.|On dit que la longue lumière estivale des basses terres de l'est rend les fraises locales particulièrement sucrées, et un panneau écrit à la main au bord de la route a vendu une cagette entière avant même que la circulation de l'après-midi ne batte vraiment son plein.|東部低地の長い夏の日差しは地元のイチゴを格別に甘くすると言われる。手書きの看板を路傍に出しただけで、午後の交通量が本格的になる前に木箱ひと箱を売り切った。",
    [3],
  ),

  // ---- ve ヴェストラン(フィヨルド地帯) ----
  ev(
    "lakseoppdrett-skift", "gain", ["ve"], "🐟", 240,
    "A shift on a salmon farm|Un turno en una piscifactoría de salmón|Un service dans une ferme aquacole à saumon|サケ養殖場の勤務",
    "The pens needed extra hands for a day of net changes and feed checks out on the fjord, work that pays well precisely because it means several hours on open water in whatever weather shows up. The boat back to shore smelled of fish long after the shift ended.|Las jaulas necesitaban manos extra para un día de cambio de redes y control del pienso en el fiordo, un trabajo bien pagado precisamente porque implica varias horas en mar abierto con el tiempo que haga. La barca de vuelta a tierra olía a pescado mucho después de terminar el turno.|Les cages avaient besoin de bras pour une journée de changement de filets et de contrôle de l'alimentation sur le fjord, un travail bien payé justement parce qu'il signifie plusieurs heures en eau libre par le temps qu'il fasse. Le bateau du retour sentait le poisson longtemps après la fin du service.|フィヨルドの生け簀では、網の張り替えと給餌の点検に一日がかりの人手が要った。どんな天気でも何時間も外海に出ることになるため、実入りはよかった。勤務を終えても、岸へ戻る船はしばらく魚の匂いが抜けなかった。",
  ),
  ev(
    "regn-odelegger-klesvask", "loss", ["ve"], "🌧️", 180,
    "Rain ruins a day's washing left out to dry|La lluvia arruina una colada tendida a secar|La pluie gâche une lessive mise à sécher dehors|外に干した洗濯物が雨で台無し",
    "The forecast looked clear enough to risk hanging the washing outside, which in a town famous for rain on most days of the year turns out to have been an optimistic gamble, and everything has to be rewashed and dried indoors at the laundrette's expense.|El pronóstico parecía lo bastante despejado para arriesgarse a tender la colada fuera, lo que en una ciudad famosa por llover casi todos los días del año resulta haber sido una apuesta demasiado optimista, y todo hay que volver a lavarlo y secarlo dentro, a precio de lavandería.|Les prévisions semblaient assez claires pour risquer d'étendre le linge dehors, ce qui, dans une ville réputée pour la pluie presque tous les jours de l'année, s'avère avoir été un pari bien optimiste, et il faut tout relaver et sécher à l'intérieur, au tarif de la laverie.|天気予報が晴れそうに見えたので外に洗濯物を干す賭けに出たが、一年のほとんどの日に雨が降ることで知られる町では、それは楽観的すぎる賭けだったと分かった。すべてを洗い直し、コインランドリーの料金で室内干しする羽目になった。",
  ),
  ev(
    "oljearbeider-driks", "gain", ["ve"], "🛢️", 250,
    "Good tips from an off-shift oil crew|Buenas propinas de una cuadrilla petrolera fuera de turno|De bons pourboires d'une équipe pétrolière hors service|非番の石油作業員から気前のよいチップ",
    "A crew back from two weeks on an offshore platform tips generously on their first night back on land, and covering an extra table for a busy shift brings in more in one evening than a normal week of tables usually does.|Una cuadrilla que vuelve de dos semanas en una plataforma marina da propinas generosas su primera noche de vuelta en tierra, y cubrir una mesa extra en un turno movido trae más en una noche que lo que suele dar una semana normal de mesas.|Une équipe revenue de deux semaines sur une plateforme offshore laisse de généreux pourboires pour sa première soirée de retour à terre, et couvrir une table de plus lors d'un service chargé rapporte en une soirée plus qu'une semaine normale de tables.|沖合のプラットフォームで2週間過ごしてきた作業員の一団は、陸に戻った最初の夜、気前よくチップをはずむ。忙しい勤務でもう一卓引き受けると、ふだんの一週間分より多くを一晩で稼ぐことになった。",
  ),

  // ---- tr トロンデラーグ ----
  ev(
    "innherred-innhosting", "gain", ["tr"], "🌾", 220,
    "Helping with the grain harvest in Innherred|Ayudando en la cosecha de grano en Innherred|Aider à la moisson en Innherred|インヘッレの穀物収穫を手伝う",
    "A farm on the flat land east of the fjord needed extra hands before a forecast of rain, and a long day riding the trailer and stacking bales paid a flat rate plus dinner with the family once the last field was cleared.|Una granja en las tierras llanas al este del fiordo necesitaba manos extra antes de una previsión de lluvia, y un largo día montado en el remolque y apilando fardos pagó una tarifa fija más cena con la familia una vez despejado el último campo.|Une ferme des terres plates à l'est du fjord avait besoin de bras avant une prévision de pluie, et une longue journée sur la remorque à empiler des balles a payé un forfait plus le dîner en famille une fois le dernier champ dégagé.|フィヨルド東側の平地にある農場が、雨の予報を前に人手を求めていた。荷台に乗って干し草の梱包を積む長い一日は定額の日当に加え、最後の畑を片付けたあとの家族との夕食も付いてきた。",
    [5, 6],
  ),
  ev(
    "roros-markedsdag-tap", "loss", ["tr"], "🎪", 170,
    "A bad wager on market day in Røros|Una mala apuesta en el día de mercado de Røros|Un mauvais pari le jour du marché à Røros|レーロスの市の日に賭けで負ける",
    "The horse-drawn sledge races drew a bigger crowd than expected, and a friendly wager on the obvious favourite went the other way when the sledge caught a rut in the snow on the final turn.|Las carreras de trineos tirados por caballos atrajeron a más público del esperado, y una apuesta amistosa por el favorito evidente salió al revés cuando el trineo se atascó en un surco de nieve en la última curva.|Les courses de traîneaux tirés par des chevaux ont attiré plus de monde que prévu, et un pari amical sur le favori évident a mal tourné quand le traîneau a accroché une ornière de neige au dernier virage.|馬ぞりレースに思いのほか人が集まった。誰もが本命だと思った馬に軽い気持ちで賭けたが、最後のカーブでそりが雪のわだちに引っかかり、賭けは外れた。",
  ),
  ev(
    "studentkafe-ekstravakt", "gain", ["tr"], "☕", 200,
    "An extra shift at a student café near the university|Un turno extra en una cafetería de estudiantes cerca de la universidad|Un service supplémentaire dans un café étudiant près de l'université|大学近くの学生カフェで臨時勤務",
    "Exam week means long queues for coffee at all hours, and a café near campus takes on temporary staff just to keep up, paying by the shift rather than by the hour to make the arrangement worth everyone's trouble.|La semana de exámenes trae largas colas de café a todas horas, y un café cerca del campus contrata personal temporal solo para dar abasto, pagando por turno y no por hora para que el arreglo valga la pena a todos.|La semaine d'examens amène de longues files pour un café à toute heure, et un café près du campus embauche du personnel temporaire juste pour suivre, payant au service plutôt qu'à l'heure pour que l'arrangement en vaille la peine pour tous.|試験週間は一日じゅうコーヒーを求める行列ができる。キャンパス近くのカフェはさばききれず臨時要員を雇い、時給ではなく一勤務ぶんの定額で支払う。",
    [0, 6],
  ),

  // ---- nn 北部 ----
  ev(
    "torskesloying-natt", "gain", ["nn"], "🐟", 260,
    "A night gutting cod on the Lofoten docks|Una noche destripando bacalao en los muelles de Lofoten|Une nuit à vider la morue sur les quais du Lofoten|ロフォーテンの波止場で夜通し鱈をさばく",
    "The boats come in loaded during the winter cod run, and a night spent gutting and hanging fish on the racks pays by the crate rather than the hour, cold, wet work that experienced hands can do twice as fast as anyone new to it.|Los barcos llegan cargados durante la temporada invernal del bacalao, y una noche destripando y colgando pescado en los secaderos se paga por caja y no por hora: un trabajo frío y húmedo que las manos expertas hacen el doble de rápido que cualquier novato.|Les bateaux rentrent chargés durant la campagne hivernale de la morue, et une nuit à vider et suspendre le poisson sur les claies se paie à la caisse plutôt qu'à l'heure, un travail froid et humide que des mains expérimentées abattent deux fois plus vite qu'un débutant.|冬の鱈漁の最盛期には船が満載で戻ってくる。夜通し魚をさばいて棚に吊るす仕事は時給ではなく木箱の数で払われる、冷たく濡れた仕事で、慣れた手なら新米の倍の速さでこなす。",
    [9, 10],
  ),
  ev(
    "piggdekk-for-tidlig", "loss", ["nn"], "🛞", 190,
    "Studded tyres fitted a month too early|Neumáticos con clavos montados un mes demasiado pronto|Pneus cloutés montés un mois trop tôt|冬タイヤを早く履き替えすぎる",
    "A cold snap in early autumn looked like the start of winter for good, so the studded tyres went on early — and then three weeks of unseasonably mild, dry road followed, wearing down metal studs on bare asphalt they were never meant to touch.|Una ola de frío a principios de otoño parecía el inicio definitivo del invierno, así que los neumáticos con clavos se montaron pronto, y luego siguieron tres semanas de carretera seca e impropiamente templada, desgastando los clavos de metal sobre un asfalto que nunca debían tocar.|Un coup de froid au début de l'automne ressemblait au début définitif de l'hiver, alors les pneus cloutés ont été montés tôt — puis trois semaines de route sèche et anormalement douce ont suivi, usant les clous métalliques sur un bitume qu'ils n'étaient jamais censés toucher.|初秋の寒波が本格的な冬の始まりに見えたので早々に冬タイヤに替えたが、そのあと季節外れに穏やかで乾いた道路が三週間も続き、本来触れるはずのない裸のアスファルトで金属鋲がすり減ってしまった。",
  ),
  ev(
    "nordlys-bilde-salg", "gain", ["nn"], "📷", 230,
    "Selling a northern lights photo to a tour operator|Vendiendo una foto de aurora boreal a un operador turístico|Vendre une photo d'aurores boréales à un tour-opérateur|オーロラの写真をツアー会社に売る",
    "A clear, still night and a steady hand produce a shot good enough that a local tour company offers to license it for their brochure, on the condition the exact viewpoint is kept off the internet a little while longer.|Una noche despejada y en calma, y un pulso firme, producen una foto lo bastante buena para que una empresa turística local ofrezca licenciarla para su folleto, con la condición de mantener el punto de vista exacto fuera de internet un poco más.|Une nuit claire et calme, et une main assurée, donnent une photo assez bonne pour qu'une agence touristique locale propose de l'utiliser sous licence pour sa brochure, à condition que le point de vue exact reste hors d'internet encore un moment.|よく晴れて風のない夜、しっかり構えた手が撮った一枚は、地元の旅行会社がパンフレットに使わせてほしいと申し出るほどの出来だった。ただし、この正確な撮影地点はもうしばらくネットに出さないという条件付きである。",
    [7, 9],
  ),

  // ---- so スールラン(南部海岸) ----
  ev(
    "hytte-utleie-uke", "gain", ["so"], "🏡", 260,
    "Renting out the family cabin for a week|Alquilando la cabaña familiar por una semana|Louer le chalet familial pour une semaine|一週間だけ家族の別荘を貸す",
    "A family too busy to use their own coastal cabin during the shared summer break lists it for the week instead, and the rent covers most of a season's worth of upkeep in one booking, provided the renters leave the boathouse key where they found it.|Una familia demasiado ocupada para usar su propia cabaña costera durante las vacaciones de verano compartidas la anuncia esa semana en alquiler, y la renta cubre casi todo el mantenimiento de la temporada en una sola reserva, siempre que los inquilinos dejen la llave del cobertizo donde la encontraron.|Une famille trop occupée pour profiter de son propre chalet côtier pendant les vacances d'été communes le met en location pour la semaine, et le loyer couvre presque tout l'entretien de la saison en une seule réservation, à condition que les locataires laissent la clé du hangar à bateaux là où ils l'ont trouvée.|みんなの夏休みのあいだ自分たちの海辺の別荘を使う暇がない家族が、一週間だけ貸しに出した。借り手がボート小屋の鍵をあった場所に戻してくれさえすれば、この一度の予約でシーズン分の維持費のほとんどが賄えた。",
    [3],
  ),
  ev(
    "solbrent-gaar-glipp-av-vakt", "loss", ["so"], "🌞", 160,
    "A sunburn costs a shift|Una quemadura solar cuesta un turno|Un coup de soleil coûte un service|日焼けで勤務を一日棒に振る",
    "A rare run of clear, warm days on the south coast is not something anyone here plans around, and an afternoon spent enjoying it without sunscreen leaves a burn bad enough to call in sick the next morning, unpaid.|Una rara racha de días despejados y cálidos en la costa sur no es algo con lo que nadie aquí cuente, y una tarde disfrutándola sin protector solar deja una quemadura lo bastante fea como para llamar diciendo que se está enfermo la mañana siguiente, sin paga.|Une rare série de journées claires et chaudes sur la côte sud n'est pas quelque chose sur quoi on compte ici, et un après-midi passé à en profiter sans crème solaire laisse un coup de soleil assez vilain pour appeler malade le lendemain matin, sans solde.|南岸で珍しく晴れて暖かい日が続いても、それを当て込んで予定を立てる者などいない。日焼け止めなしでその午後を楽しんだせいで、翌朝は無給で仕事を休むほどのひどい日焼けを負ってしまった。",
    [3],
  ),
  ev(
    "skagerrak-regatta-mannskap", "gain", ["so"], "⛵", 240,
    "Crewing a boat for the Skagerrak regatta|Formando parte de la tripulación en la regata del Skagerrak|Faire partie de l'équipage pour la régate du Skagerrak|スカゲラク・レガッタの乗員として雇われる",
    "A skipper short one crew member for the weekend race offers a share of the prize pool for anyone who can trim a sail without being told twice, and a strong finish across the strait pays out considerably more than the day would have on land.|Un patrón al que le falta un tripulante para la regata del fin de semana ofrece una parte del premio a quien sepa cazar una vela sin que se lo repitan, y una buena llegada al otro lado del estrecho paga bastante más de lo que habría dado el día en tierra.|Un skipper à qui il manque un équipier pour la course du week-end propose une part de la cagnotte à qui sait border une voile sans se le faire répéter, et une belle arrivée de l'autre côté du détroit rapporte nettement plus que la journée n'aurait valu à terre.|週末レースで乗員が一人足りない船長が、二度言われずに帆を扱える者に賞金の分け前を持ちかけた。海峡の向こうまでよい成績で走りきると、陸での一日仕事よりかなり多く実入りがあった。",
    [3, 4],
  ),
];
