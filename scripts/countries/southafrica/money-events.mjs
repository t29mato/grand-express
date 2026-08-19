/**
 * 南アフリカの青マス・赤マスで起きる出来事(22件。増11・減11)。
 *
 * 地方コード: gt=ハウテン / wc=西ケープ / kzn=クワズール・ナタール /
 * ec=東ケープ / fs=自由州 / nw=北西州 / mp=ムプマランガ / lp=リンポポ /
 * nc=北ケープ
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける。そのうえで、9州それぞれに
 * 2件(増1・減1)、その土地に固有の話を置いている。
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

export const SOUTHAFRICA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年 ----
  ev(
    "spaza-shift", "gain", [], "🏪", 200,
    "A shift behind a spaza shop counter|Un turno tras el mostrador de una spaza shop|Un service au comptoir d'une spaza shop|スパザショップの店番を頼まれる",
    "The owner needed someone to mind the till and the fridge of cold drinks while she restocked from a cash-and-carry across town, and paid in cash before locking up. These small, often home-based corner shops fill most South African townships, selling everything from airtime to loose cigarettes.|La dueña necesitaba a alguien que atendiera la caja y la nevera de bebidas mientras reabastecía en un cash-and-carry al otro lado de la ciudad, y pagó en efectivo antes de cerrar. Estas pequeñas tiendas de esquina, a menudo instaladas en casas, llenan la mayoría de los townships sudafricanos.|La propriétaire avait besoin de quelqu'un pour surveiller la caisse et le frigo de boissons pendant qu'elle se réapprovisionnait dans un cash-and-carry de l'autre côté de la ville, et paya en espèces avant de fermer. Ces petites échoppes de coin, souvent installées dans une maison, remplissent la plupart des townships sud-africains.|店主が、街の反対側の卸売店で仕入れをする間、レジと冷蔵の飲み物を見張る人手を求めていた。店を閉める前に現金で払ってくれた。こうした小さな、しばしば自宅を兼ねた角の店は、南アフリカのタウンシップのほとんどを埋めている。",
  ),
  ev(
    "taxi-gaatjie", "gain", [], "🚐", 180,
    "Calling fares on a minibus taxi|Cobrando tarifas en un taxi minibús|Encaisser les tarifs dans un taxi minibus|ミニバスタクシーの車掌を務める",
    "The regular fare-caller had gone home sick, so the driver waved you into the sliding door to shout the route and count change for a day, hand signals and all. Minibus taxis carry the large majority of South African commuters who have no train or bus line near them.|El cobrador habitual se había ido enfermo a casa, así que el conductor te hizo señas para subir por la puerta corredera y gritar la ruta y contar el cambio por un día, con todo y señas de mano. Los taxis minibús transportan a la gran mayoría de los viajeros sudafricanos que no tienen tren ni autobús cerca.|Le crieur habituel était rentré malade, alors le chauffeur t'a fait signe de monter par la porte coulissante pour crier l'itinéraire et rendre la monnaie toute une journée, signes de la main compris. Les taxis minibus transportent la grande majorité des usagers sud-africains qui n'ont ni train ni bus à proximité.|いつもの車掌が病気で休んだため、運転手にスライドドアから乗り込むよう手招きされ、一日だけ行き先を叫んでお釣りを数え、手信号もこなした。近くに鉄道もバスも無い南アフリカの通勤者の大半は、ミニバスタクシーで移動している。",
  ),
  ev(
    "load-shedding-fridge", "loss", [], "💡", 210,
    "Load shedding spoiled a fridge full of groceries|Un corte programado echó a perder la nevera llena de comida|Une coupure programmée a gâché tout le contenu du frigo|計画停電で冷蔵庫の中身が傷む",
    "The power company's rolling blackout schedule slipped by an extra two hours without warning, and a fridge stocked for the week was warm to the touch by the time the lights came back. Eskom's load shedding has been common enough for long enough that most households keep a schedule app just to plan around it.|El horario de cortes programados de la eléctrica se retrasó dos horas más sin aviso, y una nevera abastecida para la semana estaba tibia al tacto cuando volvió la luz. Los cortes de Eskom han sido tan frecuentes durante tanto tiempo que la mayoría de los hogares tiene una app solo para planificar en torno a ellos.|L'horaire des coupures programmées de la compagnie d'électricité a glissé de deux heures de plus sans prévenir, et un frigo garni pour la semaine était tiède au toucher quand le courant est revenu. Les coupures d'Eskom sont si fréquentes depuis si longtemps que la plupart des foyers ont une appli rien que pour s'organiser autour.|電力会社の計画停電の時間が予告なく2時間延び、一週間分の食料を詰めた冷蔵庫は電気が戻る頃には生ぬるくなっていた。エスコム社の計画停電はあまりに長く続いているため、たいていの家庭はそれに合わせて予定を組むための専用アプリを持っている。",
  ),
  ev(
    "pothole-tyre", "loss", [], "🕳️", 160,
    "A pothole took out a tyre|Un bache reventó una llanta|Un nid-de-poule a crevé un pneu|穴ぼこでタイヤをやられる",
    "The hole had opened up wider after the last rains and was invisible under the shadow of an overtaking truck until the wheel dropped into it with a bang. Provincial roads departments across the country stay chronically behind on repairs, so most drivers know which stretches to slow down for.|El bache se había ensanchado tras las últimas lluvias y era invisible bajo la sombra de un camión que adelantaba, hasta que la rueda cayó dentro con un golpe seco. Los departamentos provinciales de caminos van crónicamente atrasados en reparaciones, así que casi todo conductor sabe en qué tramos frenar.|Le trou s'était élargi après les dernières pluies et restait invisible sous l'ombre d'un camion qui doublait, jusqu'à ce que la roue y tombe dans un grand bruit. Les services routiers provinciaux accusent un retard chronique sur les réparations, si bien que la plupart des conducteurs savent où ralentir.|直近の雨で穴はさらに広がっており、追い越していくトラックの影に隠れて見えないまま、車輪がそこに落ちてがつんと音を立てた。全国どこの州道路局も修繕が慢性的に遅れているため、たいていの運転手はどの区間で速度を落とすべきか心得ている。",
  ),

  // ---- gt ハウテン ----
  ev(
    "sandton-loading-bay", "gain", ["gt"], "📦", 200,
    "A day's work at a Sandton loading bay|Un día de trabajo en el muelle de carga de Sandton|Une journée au quai de chargement de Sandton|サントンの積み降ろし場での一日仕事",
    "An office tower needed extra hands to move furniture in before the new tenant's Monday deadline, and the pay came in cash straight from the site foreman. The glass towers of South Africa's busiest financial district run on exactly this kind of short-notice contract labour.|Una torre de oficinas necesitaba manos extra para mover muebles antes de la fecha límite del lunes del nuevo inquilino, y el pago llegó en efectivo directo del capataz de obra. Las torres de cristal del distrito financiero más activo de Sudáfrica funcionan con este tipo de mano de obra contratada de un día para otro.|Une tour de bureaux avait besoin de bras pour déménager du mobilier avant l'échéance du lundi du nouveau locataire, et la paie est venue en espèces directement du chef de chantier. Les tours de verre du quartier financier le plus actif d'Afrique du Sud tournent grâce à ce genre de main-d'œuvre embauchée au dernier moment.|オフィスタワーが、新しいテナントの月曜締切前に家具を運び入れる人手を求めていて、現場監督から直接現金で支払われた。南アフリカで最も活気ある金融街のガラス張りの高層ビル群は、まさにこうした急な日雇い労働に支えられている。",
  ),
  ev(
    "etoll-fine", "loss", ["gt"], "🛣️", 170,
    "A backlog of unpaid e-toll notices caught up with you|Una pila de avisos de peaje electrónico sin pagar te alcanzó|Une pile d'avis de péage électronique impayés a fini par te rattraper|未払いの電子課金通知がたまってしまう",
    "The gantries on Gauteng's highways photograph every passing plate whether or not the driver ever signs up to pay, and years of ignored notices had quietly stacked into a debt collector's letter. The e-toll system was so widely boycotted that the province eventually scrapped it, but old bills kept arriving for years after.|Los pórticos en las autopistas de Gauteng fotografían cada matrícula que pasa, se pague o no, y años de avisos ignorados se habían acumulado en silencio hasta una carta de una agencia de cobros. El sistema de peaje electrónico fue tan boicoteado que la provincia acabó por eliminarlo, pero las viejas facturas siguieron llegando durante años.|Les portiques des autoroutes du Gauteng photographient chaque plaque qui passe, que le conducteur se soit inscrit ou non pour payer, et des années d'avis ignorés s'étaient tranquillement accumulées en une lettre d'agence de recouvrement. Le système de péage électronique fut si largement boycotté que la province a fini par l'abandonner, mais les vieilles factures ont continué d'arriver des années après.|ハウテン州の高速道路のゲートは、支払い登録の有無にかかわらず通過する車のナンバーをすべて撮影しており、無視し続けた何年分もの通知が静かに積み重なって取り立て屋からの手紙になっていた。この電子課金制度はあまりに広くボイコットされ、州は結局これを廃止したが、古い請求書はその後も何年か届き続けた。",
  ),

  // ---- wc 西ケープ ----
  ev(
    "grape-harvest", "gain", ["wc"], "🍇", 220,
    "Picking grapes through the harvest|Recogiendo uvas durante la vendimia|Ramasser du raisin pendant les vendanges|ぶどうの収穫期に摘み手として働く",
    "The estate needed extra hands before an early-morning heatwave could split the ripening bunches, and the crew worked the rows until the trailers were full. The Cape's wine harvest, usually January to March, still relies heavily on seasonal hand-picking despite decades of mechanisation elsewhere in farming.|La finca necesitaba manos extra antes de que una ola de calor matutina partiera los racimos maduros, y la cuadrilla trabajó las hileras hasta llenar los remolques. La vendimia del Cabo, normalmente de enero a marzo, sigue dependiendo en gran medida de la recolección manual estacional pese a décadas de mecanización en otras áreas agrícolas.|Le domaine avait besoin de bras avant qu'une vague de chaleur matinale ne fende les grappes mûres, et l'équipe a travaillé les rangs jusqu'à remplir les remorques. Les vendanges du Cap, généralement de janvier à mars, dépendent encore fortement de la cueillette manuelle saisonnière malgré des décennies de mécanisation ailleurs dans l'agriculture.|農園は、早朝の熱波で熟した房が割れてしまう前に人手を求めていて、一団はトレーラーが満杯になるまで畝を摘み続けた。通常1月から3月にかけて行われるケープ地方のワイン収穫は、農業の他の分野が何十年も機械化される中、いまも季節労働者の手摘みに大きく頼っている。",
    [8, 9, 10],
  ),
  ev(
    "day-zero-fine", "loss", ["wc"], "🚿", 190,
    "A water-restriction fine for using too much during the drought|Multa por restricción de agua por usar de más durante la sequía|Une amende pour restriction d'eau, consommation excessive pendant la sécheresse|干ばつ中の使いすぎで節水制限の罰金",
    "The city's water meter had crept past the household limit set during the years the dams sank low enough that officials warned of a 'Day Zero' when taps might run dry, and the fine notice arrived with the next bill. Cape Town's 2017–2018 drought pushed daily use restrictions to some of the tightest ever imposed on a major world city.|El contador de agua de la ciudad había superado el límite doméstico fijado en los años en que las presas bajaron tanto que las autoridades advirtieron de un 'Día Cero' en que podrían secarse los grifos, y el aviso de multa llegó con la siguiente factura. La sequía de Ciudad del Cabo de 2017-2018 impuso restricciones de uso diario entre las más estrictas jamás vistas en una gran ciudad del mundo.|Le compteur d'eau de la ville avait dépassé la limite par foyer fixée durant les années où les barrages étaient descendus assez bas pour que les autorités avertissent d'un « Jour zéro » où les robinets pourraient se tarir, et l'avis d'amende est arrivé avec la facture suivante. La sécheresse du Cap de 2017-2018 imposa des restrictions d'usage quotidien parmi les plus strictes jamais vues dans une grande ville mondiale.|市の水道メーターは、貯水池がひどく干上がって当局が「デイ・ゼロ(蛇口が涸れる日)」を警告した年に定められた各世帯の上限を超えていて、罰金の通知が次の請求書と共に届いた。2017〜2018年のケープタウンの干ばつは、世界の主要都市でもかつてないほど厳しい日々の使用制限をもたらした。",
  ),

  // ---- kzn クワズール・ナタール ----
  ev(
    "cane-cutting", "gain", ["kzn"], "🌾", 210,
    "A day cutting sugar cane|Un día cortando caña de azúcar|Une journée à couper la canne à sucre|サトウキビ刈りの日雇い仕事",
    "The mill was running behind schedule before the rains were due, and a cane-cutting crew short one pair of hands paid by the tonne rather than the hour. The coastal belt north and south of Durban still supplies most of the country's sugar, cut by hand on the steeper fields machines can't reach.|El ingenio iba retrasado antes de que llegaran las lluvias, y una cuadrilla de corte de caña, corta de un par de manos, pagaba por tonelada y no por hora. El cinturón costero al norte y sur de Durban sigue suministrando la mayor parte del azúcar del país, cortada a mano en los campos más empinados que las máquinas no alcanzan.|L'usine avait pris du retard avant l'arrivée des pluies, et une équipe de coupeurs de canne, à court d'une paire de bras, payait à la tonne plutôt qu'à l'heure. La ceinture côtière au nord et au sud de Durban fournit encore l'essentiel du sucre du pays, coupé à la main sur les champs trop pentus pour les machines.|製糖工場は雨が来る前に予定より遅れており、人手が一人足りないサトウキビ刈りの一団は時給ではなくトン単位で払ってくれた。ダーバンの南北に広がる海岸地帯はいまも国内の砂糖の大半を供給しており、機械が入れない急な畑では手刈りが続いている。",
    [3, 4, 5],
  ),
  ev(
    "kzn-flood-road", "loss", ["kzn"], "🌊", 200,
    "Floodwaters washed out the only road home|Las inundaciones se llevaron el único camino a casa|Les crues ont emporté la seule route vers chez toi|洪水で家に帰る唯一の道が流される",
    "A storm dumped in hours what usually falls in weeks, and the low bridge that was the only way into the valley disappeared under brown water overnight, forcing a long detour and a missed day's pay. KwaZulu-Natal's April 2022 floods were among the deadliest weather disasters in the country's recorded history.|Una tormenta dejó caer en horas lo que normalmente cae en semanas, y el puente bajo que era el único acceso al valle desapareció bajo agua parda de la noche a la mañana, obligando a un largo desvío y a perder un día de sueldo. Las inundaciones de abril de 2022 en KwaZulu-Natal figuran entre los desastres meteorológicos más mortíferos de la historia registrada del país.|Un orage a déversé en quelques heures ce qui tombe normalement en plusieurs semaines, et le pont bas qui était le seul accès à la vallée a disparu sous une eau brune du jour au lendemain, imposant un long détour et une journée de salaire perdue. Les inondations d'avril 2022 au KwaZulu-Natal comptent parmi les catastrophes météorologiques les plus meurtrières de l'histoire du pays.|嵐が普段なら何週間もかけて降る雨を数時間で降らせ、谷への唯一の道だった低い橋が一晩で茶色い水の下に消え、長い迂回と一日分の賃金の損失を強いられた。2022年4月のクワズール・ナタール州の洪水は、この国の記録史上でも屈指の死者を出した気象災害の一つだった。",
  ),

  // ---- ec 東ケープ ----
  ev(
    "wild-coast-guide", "gain", ["ec"], "🥾", 190,
    "Guiding hikers along the Wild Coast|Guiando a excursionistas por la Wild Coast|Guider des randonneurs le long de la Wild Coast|ワイルドコーストのハイカーを案内する",
    "A backpacking group had lost the trail where cattle paths crisscross the real one, and a local guide's fee for walking them safely to the next village came with a hot meal thrown in. The Wild Coast's cliff-top trails run for days between villages with no roads reaching most of them at all.|Un grupo de mochileros había perdido el sendero donde los caminos de ganado se cruzan con el real, y la tarifa de un guía local por llevarlos a salvo hasta el siguiente pueblo incluyó una comida caliente de propina. Los senderos sobre acantilados de la Wild Coast se extienden durante días entre pueblos a los que casi ninguna carretera llega.|Un groupe de routards avait perdu le sentier là où les pistes du bétail croisent le vrai chemin, et le tarif d'un guide local pour les mener sains et saufs jusqu'au village suivant incluait un repas chaud en prime. Les sentiers en falaise de la Wild Coast courent des jours durant entre des villages que presque aucune route n'atteint.|バックパッカーの一団が、牛道が本当の道と交錯する場所で道に迷っていた。地元の案内人が次の村まで無事に導いた謝礼には、温かい食事もおまけについてきた。ワイルドコーストの崖沿いの道は、道路がほとんど通じていない村々の間を何日もかけて続いている。",
  ),
  ev(
    "stokvel-delay", "loss", ["ec"], "💰", 170,
    "This month's stokvel payout was delayed|El pago del stokvel de este mes se retrasó|Le versement du stokvel du mois a été retardé|今月のストクフェルの払い戻しが遅れる",
    "The rotating savings club's treasurer had a family emergency two towns over and couldn't reach the meeting to hand out this cycle's pool, pushing the payout back past the date it was needed. Stokvels, informal savings groups where members pool money and take turns receiving the lump sum, are estimated to hold billions of rand in savings countrywide.|La tesorera del club de ahorro rotativo tuvo una emergencia familiar en otro pueblo y no pudo llegar a la reunión para repartir el fondo de este ciclo, retrasando el pago más allá de la fecha en que se necesitaba. Se calcula que los stokvels, grupos informales de ahorro donde los miembros aportan dinero y se turnan para recibir el total, reúnen miles de millones de rands en ahorros en todo el país.|La trésorière du club d'épargne tournant a eu une urgence familiale dans une autre ville et n'a pas pu se rendre à la réunion pour distribuer la cagnotte de ce cycle, repoussant le versement au-delà de la date où il était nécessaire. Les stokvels, groupes d'épargne informels où les membres mettent de l'argent en commun et reçoivent la somme à tour de rôle, rassembleraient des milliards de rands d'épargne à travers le pays.|回り持ちの貯蓄組合の会計係が二つ先の町で家族の急用に見舞われ、集会に来られず今回分の積立金を配れなかったため、必要な期日を過ぎて払い戻しが延びてしまった。ストクフェル(会員が金を出し合い、順番でまとまった額を受け取る非公式の貯蓄組合)は、全国で数十億ランド規模の貯蓄を抱えているとされる。",
  ),

  // ---- fs 自由州 ----
  ev(
    "maize-harvest", "gain", ["fs"], "🌽", 200,
    "Helping bring in the maize harvest|Ayudando a levantar la cosecha de maíz|Aider à rentrer la récolte de maïs|とうもろこしの収穫を手伝う",
    "The combine harvester broke an axle halfway through the field, and hands were needed to clear the rest before a forecast storm, paid by the day rather than waiting for a repair. The Free State's flat maize belt supplies a large share of South Africa's staple crop, the basis of the ground maize porridge eaten daily in most households.|La cosechadora rompió un eje a mitad del campo, y hicieron falta manos para terminar el resto antes de la tormenta prevista, pagadas por día en vez de esperar la reparación. El llano cinturón maicero del Estado Libre suministra buena parte del cultivo básico de Sudáfrica, base de la papilla de maíz molido que se come a diario en la mayoría de los hogares.|La moissonneuse-batteuse a cassé un essieu à mi-champ, et il a fallu des bras pour finir le reste avant l'orage annoncé, payés à la journée plutôt que d'attendre la réparation. La ceinture maïsicole plate de l'État libre fournit une grande part de la culture de base de l'Afrique du Sud, base de la bouillie de maïs moulu mangée chaque jour dans la plupart des foyers.|コンバインが畑の途中で車軸を折ってしまい、予報されていた嵐の前に残りを刈り終える人手が要り、修理を待たず日払いで雇われた。自由州の平坦なとうもろこし地帯は南アフリカの主食作物の大きな部分を供給しており、ほとんどの家庭で毎日食べられるとうもろこし粥の材料になっている。",
    [3, 4],
  ),
  ev(
    "hailstorm-crop", "loss", ["fs"], "🌩️", 210,
    "A hailstorm flattened a season's crop|Una granizada aplastó la cosecha de la temporada|Une tempête de grêle a couché la récolte de la saison|雹の嵐で一季節分の作物が潰れる",
    "The storm cell that had looked harmless on the horizon dropped hail the size of marbles for eleven minutes, stripping leaves and bruising stems across a field that had looked ready for a good year that morning. Free State farmers lose crops to sudden highveld hailstorms often enough that some now pay for anti-hail insurance as a standing cost of doing business.|La célula de tormenta que parecía inofensiva en el horizonte dejó caer granizo del tamaño de canicas durante once minutos, deshojando y magullando tallos en un campo que esa misma mañana parecía prometer una buena temporada. Los agricultores del Estado Libre pierden cosechas por granizadas repentinas del altiplano tan a menudo que algunos ya pagan un seguro antigranizo como gasto fijo del negocio.|La cellule orageuse qui semblait inoffensive à l'horizon a lâché onze minutes de grêle grosse comme des billes, dépouillant les feuilles et meurtrissant les tiges d'un champ qui, le matin même, promettait une bonne saison. Les agriculteurs de l'État libre perdent des récoltes à cause de grêles soudaines du highveld assez souvent pour que certains paient désormais une assurance anti-grêle en frais courants.|地平線では無害に見えた積乱雲が11分間、ビー玉大の雹を降らせ、その朝はよい実りが見込めそうだった畑一面の葉をむしり茎を傷めた。自由州の農家はハイフェルトの突然の雹嵐で作物を失うことが多く、いまでは事業の固定費として雹害保険に入る者もいる。",
    [10, 11],
  ),

  // ---- nw 北西州 ----
  ev(
    "platinum-shift-marshal", "gain", ["nw"], "⛑️", 220,
    "Standing in as a mine safety marshal|Sustituyendo como supervisor de seguridad de la mina|Remplacer un responsable sécurité à la mine|鉱山の安全誘導係を代行する",
    "A shift marshal had gone down with flu the night before a safety inspection, and the mine paid a flat day rate for someone certified to walk the surface crews through the drill and check reflective vests at the gate. Platinum mines around Rustenburg run strict shift-change safety routines given how deep and how hot the underground workings run.|Un supervisor de turno cayó con gripe la noche antes de una inspección de seguridad, y la mina pagó una tarifa fija diaria a alguien certificado para guiar a las cuadrillas de superficie por el simulacro y revisar los chalecos reflectantes en la puerta. Las minas de platino cerca de Rustenburg mantienen rutinas de seguridad estrictas en cada cambio de turno, dado lo profundas y calurosas que son las labores subterráneas.|Un responsable de poste a eu la grippe la veille d'une inspection de sécurité, et la mine a payé un tarif journalier fixe à quelqu'un de certifié pour guider les équipes de surface dans l'exercice et vérifier les gilets réfléchissants au portail. Les mines de platine autour de Rustenburg suivent des routines de sécurité strictes à chaque changement de poste, vu la profondeur et la chaleur des galeries souterraines.|安全点検の前夜、シフト誘導係がインフルエンザで倒れ、鉱山は資格を持つ代わりの人に、地上要員へ訓練を行い門で反射ベストを確認する仕事を日給で頼んだ。ラステンバーグ周辺の白金鉱山は、地下坑道の深さと暑さゆえに、シフト交代のたびに厳格な安全手順を踏んでいる。",
  ),
  ev(
    "mine-strike-day", "loss", ["nw"], "✊", 180,
    "A day's wage lost to a strike at the mine|Un día de sueldo perdido por una huelga en la mina|Un jour de salaire perdu à cause d'une grève à la mine|鉱山のストライキで一日分の賃金を失う",
    "The union had called a stoppage over stalled wage talks, and picket lines across the gate meant no shift, no pay and a long wait at home for news of when talks might resume. Wage disputes between mineworkers' unions and platinum-belt mining houses have shut down shafts here for weeks at a stretch more than once.|El sindicato había convocado un paro por el estancamiento de las negociaciones salariales, y los piquetes frente a la entrada significaron sin turno, sin sueldo y una larga espera en casa por noticias de cuándo podrían reanudarse las conversaciones. Las disputas salariales entre los sindicatos mineros y las empresas del cinturón del platino han cerrado pozos aquí durante semanas seguidas más de una vez.|Le syndicat avait appelé à un débrayage sur fond de négociations salariales dans l'impasse, et les piquets devant le portail ont signifié pas de poste, pas de paie, et une longue attente à la maison pour savoir quand les discussions reprendraient. Les conflits salariaux entre syndicats de mineurs et sociétés minières de la ceinture du platine ont fermé des puits ici pendant des semaines d'affilée plus d'une fois.|賃金交渉が行き詰まったことを理由に組合がストを呼びかけ、門の前のピケラインのせいでシフトも賃金も無くなり、交渉再開の知らせを家で長く待つことになった。鉱山労働者の組合と白金地帯の鉱山会社との賃金紛争は、これまでにも何度か何週間も坑道を止めてきた。",
  ),

  // ---- mp ムプマランガ ----
  ev(
    "safari-tip", "gain", ["mp"], "🦁", 210,
    "A generous tip for spotting the Big Five|Una propina generosa por avistar los Big Five|Un généreux pourboire pour avoir repéré les Big Five|ビッグファイブを見つけた礼にチップをもらう",
    "A morning game drive had gone quiet for two hours before a low call on the radio put the vehicle onto a leopard draped over a marula branch, and the tourists' tip afterward reflected exactly how rare that sighting was. Guides around Kruger measure a good week by how many of the Big Five — lion, leopard, elephant, buffalo and rhino — a group actually gets to see.|Un safari matutino llevaba dos horas en calma antes de que un aviso discreto por radio situara el vehículo junto a un leopardo tendido sobre una rama de marula, y la propina posterior de los turistas reflejó justo lo raro que fue ese avistamiento. Los guías en torno a Kruger miden una buena semana por cuántos de los Big Five —león, leopardo, elefante, búfalo y rinoceronte— llega a ver un grupo.|Un safari matinal était resté calme pendant deux heures avant qu'un appel discret à la radio ne mène le véhicule vers un léopard allongé sur une branche de marula, et le pourboire des touristes ensuite reflétait exactement la rareté de cette observation. Les guides autour du Kruger jugent une bonne semaine au nombre des Big Five — lion, léopard, éléphant, buffle et rhinocéros — qu'un groupe parvient réellement à voir.|朝のサファリは二時間ほど静かなままだったが、無線の小さな一報で車はマルーラの枝にもたれかかるヒョウのもとへ向かった。その後の観光客からのチップは、その目撃がいかに珍しいものだったかをそのまま物語っていた。クルーガー周辺のガイドたちは、ライオン・ヒョウ・ゾウ・バッファロー・サイの「ビッグファイブ」を一団がどれだけ見られたかで、その週の良し悪しを測る。",
  ),
  ev(
    "baboon-cooler", "loss", ["mp"], "🐒", 150,
    "A baboon raided the campsite cooler box|Un babuino saqueó la nevera portátil del campamento|Un babouin a pillé la glacière du camping|ヒヒがキャンプ場のクーラーボックスを荒らす",
    "The latch looked secure enough until a troop worked out how to flip it in under a minute while backs were turned at the braai, leaving nothing behind but scattered wrappers and one very satisfied baboon on the fence. Camps bordering Kruger post constant warnings about securing food, since local troops have long since learned that tourists mean easy meals.|El pestillo parecía bastante seguro hasta que una tropa averiguó cómo abrirlo en menos de un minuto mientras todos estaban de espaldas junto a la parrilla, dejando solo envoltorios esparcidos y un babuino muy satisfecho sobre la cerca. Los campamentos junto al Kruger avisan constantemente de asegurar la comida, pues las tropas locales aprendieron hace tiempo que los turistas significan comida fácil.|Le loquet semblait assez sûr jusqu'à ce qu'une troupe découvre comment l'ouvrir en moins d'une minute pendant que tout le monde avait le dos tourné au braai, ne laissant que des emballages éparpillés et un babouin très satisfait sur la clôture. Les camps en bordure du Kruger multiplient les avertissements sur la sécurisation de la nourriture, les troupes locales ayant depuis longtemps compris que les touristes riment avec repas facile.|留め金は十分頑丈に見えたが、皆が炭火焼きに気を取られている隙に、群れは一分もかけずにそれを外す方法を覚えていた。残されたのは散らばった包み紙と、柵の上でいかにも満足げなヒヒ一匹だけだった。クルーガー周辺のキャンプ場は食料の管理について絶えず注意を促している。地元の群れはとうに、観光客といえば簡単な食事だと学んでしまっているからだ。",
  ),

  // ---- lp リンポポ ----
  ev(
    "mopane-worms", "gain", ["lp"], "🐛", 180,
    "Selling a bumper batch of mopane worms|Vendiendo una buena cosecha de gusanos mopane|Vendre une belle récolte de chenilles mopane|モパニワームの豊漁を売りさばく",
    "The mopane trees had flushed with caterpillars after good early rains, and a full sack cleaned and dried on the roof sold out at the roadside stall before noon. Dried mopane worms are a widely eaten, protein-rich traditional food across Limpopo and much of southern Africa, sold by the cupful in markets far beyond where the trees grow.|Los árboles de mopane se llenaron de orugas tras buenas lluvias tempranas, y un saco entero limpio y secado en el techo se vendió en el puesto junto a la carretera antes del mediodía. Los gusanos mopane secos son un alimento tradicional muy consumido y rico en proteína en todo Limpopo y buena parte del sur de África, vendidos por tazas en mercados muy lejos de donde crecen los árboles.|Les mopanes s'étaient couverts de chenilles après de bonnes pluies précoces, et un sac plein, nettoyé et séché sur le toit, s'est vendu avant midi à l'étal du bord de route. Les chenilles mopane séchées sont un aliment traditionnel riche en protéines très consommé dans tout le Limpopo et une grande partie de l'Afrique australe, vendues au gobelet sur des marchés bien au-delà de la région où poussent les arbres.|モパニの木々は早めのよい雨のあとで幼虫だらけになり、屋根の上で洗って干した袋いっぱいの分が、道端の露店で昼前に売り切れた。乾燥モパニワームはリンポポ州から南部アフリカの広い範囲で食べられる、タンパク質豊富な伝統食であり、木が育つ地域からはるか離れた市場でもカップ売りされている。",
    [0, 1],
  ),
  ev(
    "borehole-dry", "loss", ["lp"], "🚱", 190,
    "The borehole ran dry in the drought|El pozo se secó durante la sequía|Le forage s'est asséché pendant la sécheresse|干ばつで井戸(ボアホール)が涸れる",
    "The pump had been drawing sand more than water for a week before the borehole finally gave out completely, meaning a paid trip to fill drums from the municipal tanker instead. Much of rural Limpopo depends on boreholes and small dams that repeated drought years have pushed dangerously low.|La bomba llevaba una semana sacando más arena que agua antes de que el pozo se secara por completo, lo que significó pagar un viaje para llenar tambores en el camión cisterna municipal. Buena parte del Limpopo rural depende de pozos y pequeñas presas que años seguidos de sequía han dejado peligrosamente bajos.|La pompe tirait plus de sable que d'eau depuis une semaine avant que le forage ne lâche complètement, obligeant à un aller payant pour remplir des fûts au camion-citerne municipal. Une grande partie du Limpopo rural dépend de forages et de petits barrages que des années de sécheresse répétées ont fait dangereusement baisser.|ポンプは井戸が完全に涸れる前の一週間、水よりも砂ばかりを汲み上げていた。仕方なく市の給水車からドラム缶に水を汲む有料の手配をすることになった。リンポポ州の農村部の多くは、繰り返す干ばつで危険なほど水位が下がった井戸や小さなダムに頼っている。",
    [9, 10, 11],
  ),

  // ---- nc 北ケープ ----
  ev(
    "wildflower-tip", "gain", ["nc"], "🌼", 170,
    "A tip for showing the way to the best bloom|Una propina por indicar el camino a la mejor floración|Un pourboire pour avoir indiqué le meilleur endroit de floraison|花畑の一番良い場所を教えた礼に",
    "A carload of photographers had driven for hours only to find the roadside patch already fading, and pointing them to a farm track where the bloom was still thick earned a tip on the spot. Namaqualand's flower season draws visitors from across the country in years the rains fall at the right time, and locals who know which farm roads to try are worth asking.|Un coche lleno de fotógrafos había conducido horas solo para encontrar el parche junto a la carretera ya marchito, y señalarles una pista de granja donde la floración aún era densa les valió una propina en el acto. La temporada de flores de Namaqualand atrae a visitantes de todo el país en los años en que las lluvias caen en su momento.|Une voiture pleine de photographes avait roulé des heures pour ne trouver que le parterre du bord de route déjà fané, et leur indiquer une piste de ferme où la floraison était encore dense valut un pourboire sur-le-champ. La saison des fleurs du Namaqualand attire des visiteurs de tout le pays les années où les pluies tombent au bon moment.|写真家たちを乗せた車が何時間も走ってきたのに、道端の群生はすでに萎れていた。まだ花が濃く残る農道を教えると、その場でチップをもらえた。ナマクアランドの花の季節は、雨が適切な時期に降った年には全国から観光客を集める。どの農道を試すべきか知る地元の人間は頼りにされる。",
    [4, 5],
  ),
  ev(
    "kalahari-dust", "loss", ["nc"], "🌪️", 150,
    "A Kalahari dust storm ruined the washing on the line|Una tormenta de polvo del Kalahari arruinó la ropa tendida|Une tempête de poussière du Kalahari a gâché le linge étendu|カラハリの砂嵐で干していた洗濯物が台無しに",
    "The sky had been clear an hour earlier, but a wall of red dust rolled in off the flats faster than the washing could be pulled from the line, coating every sheet in fine grit that meant washing the whole load again. Sudden dust storms are common enough on the Kalahari's fringes that some households simply stop hanging laundry outdoors in the driest months.|El cielo había estado despejado una hora antes, pero un muro de polvo rojo llegó desde la llanura más rápido de lo que se pudo retirar la ropa del tendedero, cubriendo cada sábana de arenilla fina, lo que significó lavarlo todo de nuevo. Las tormentas de polvo repentinas son bastante comunes en los márgenes del Kalahari.|Le ciel était dégagé une heure plus tôt, mais un mur de poussière rouge a déferlé depuis la plaine plus vite qu'on ne pouvait décrocher le linge, recouvrant chaque drap d'une fine poussière qui a obligé à tout relaver. Les tempêtes de poussière soudaines sont assez courantes aux marges du Kalahari pour que certains foyers renoncent simplement à étendre le linge dehors durant les mois les plus secs.|一時間前まで空は晴れていたのに、平原から赤い砂埃の壁が洗濯物を取り込むより速く迫ってきて、シーツという シーツを細かい砂で覆ってしまい、洗い直す羽目になった。突然の砂嵐はカラハリの縁ではよくあることで、いちばん乾燥する時期には屋外に洗濯物を干すのをやめる家庭もある。",
  ),
];
