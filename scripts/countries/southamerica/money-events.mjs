/**
 * 南アメリカ大陸の青マス・赤マスで起きる出来事(25件。増15・減10)。
 *
 * 地方コード: car=カリブ海・地峡 / gui=ギアナ3国 / riv=川の国境 /
 * and=アンデス高地 / atc=太平洋岸 / pla=ラプラタ・パンパ・パタゴニア
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、6地方それぞれに3〜5件、都市カードとは違う切り口
 * (日雇い仕事・小さな失敗・地域の祭りや産業)で置いている。
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

export const SOUTHAMERICA_MONEY_EVENTS = [
  // ---- 全国どこでも・通年(どの地方・どの月でも必ず引けるようにするための4件) ----
  ev(
    "market-day-stall", "gain", [], "🧺", 210,
    "A morning minding someone else's market stall|Una mañana atendiendo el puesto de otro en el mercado|Une matinée à tenir l'étal d'un autre au marché|市場で他人の屋台を任される朝",
    "The regular stallholder needed a morning off and paid in cash plus whatever unsold fruit was left at closing, no questions asked about being new to the trade. Every town on this continent seems to build its week around the same two or three market mornings.|El vendedor habitual necesitaba la mañana libre y pagó en efectivo, más la fruta que quedó sin vender al cerrar, sin preguntar por la falta de experiencia. Cada pueblo del continente parece organizar su semana en torno a las mismas dos o tres mañanas de mercado.|Le marchand habituel avait besoin de sa matinée et paya en espèces, plus les fruits invendus à la fermeture, sans poser de question sur le manque d'expérience. Chaque ville du continent semble organiser sa semaine autour des deux ou trois mêmes matinées de marché.|いつもの店主が朝だけ休みたいと言い、現金と閉店時に残った売れ残りの果物で払ってくれた。この商売に不慣れなことは聞かれもしなかった。大陸のどの町も、週に二、三度の同じ市場の朝を軸に一週間が回っているように見える。",
  ),
  ev(
    "border-fx-tip", "gain", [], "💱", 190,
    "A good exchange-rate tip from a fellow traveller|Un buen dato sobre el tipo de cambio de otro viajero|Un bon tuyau de change donné par un autre voyageur|同じ旅人から良い両替の情報をもらう",
    "A stranger waiting in the same queue mentioned, almost as an afterthought, which side street kiosk was giving a noticeably better rate than the official counter, and the difference on even a modest amount of cash was worth the short walk.|Un desconocido en la misma cola mencionó, casi de pasada, qué quiosco de una calle lateral daba un tipo de cambio bastante mejor que la ventanilla oficial, y la diferencia, incluso con poco efectivo, valió el paseo.|Un inconnu dans la même file a mentionné, presque en passant, quel kiosque d'une rue latérale offrait un taux nettement meilleur que le guichet officiel, et la différence, même sur une somme modeste, valait le petit détour.|同じ列に並んでいた見知らぬ人が、何気なくこう教えてくれた。裏通りのある両替所が公式窓口よりだいぶ良いレートを出しているという。わずかな現金でも、その差は少し歩く価値があった。",
  ),
  ev(
    "pickpocket-crowd", "loss", [], "👛", 200,
    "A pickpocket works the crowd|Un carterista trabaja entre la gente|Un pickpocket sévit dans la foule|人混みですりに遭う",
    "A shoulder bump in the thick of a crowded plaza was over before it registered as anything, and only a few streets later does the missing weight in a pocket become obvious. Nobody nearby noticed a thing.|Un roce de hombro en medio de una plaza abarrotada pasó antes de que se notara como algo, y solo unas calles después se hace evidente el peso que falta en un bolsillo. Nadie cerca notó nada.|Un coup d'épaule au cœur d'une place bondée est passé avant même d'être remarqué, et ce n'est que quelques rues plus loin que le poids manquant dans une poche devient évident. Personne aux alentours n'a rien vu.|混み合う広場で肩がぶつかった程度にしか感じなかったが、何本か先の通りに来てはじめてポケットの軽さに気づいた。近くの誰も何にも気づかなかった。",
  ),
  ev(
    "busbreakdown", "loss", [], "🚌", 210,
    "The long-distance bus breaks down|El autobús de larga distancia se avería|Le car longue distance tombe en panne|長距離バスが故障する",
    "The bus pulls onto the shoulder with smoke coming from somewhere under the floor, and the only way to make the connecting service is a shared taxi at a price that assumes there is no other option — which, out here, there usually is not.|El autobús se detiene en el arcén con humo saliendo de algún punto bajo el piso, y la única manera de alcanzar el enlace es un taxi compartido a un precio que asume que no hay otra opción, algo que, aquí, suele ser cierto.|Le car s'arrête sur le bas-côté avec de la fumée sortant de quelque part sous le plancher, et le seul moyen d'attraper la correspondance est un taxi partagé à un prix qui suppose qu'il n'y a pas d'autre option — ce qui, ici, est généralement le cas.|バスは床下のどこかから煙を上げながら路肩に停まった。乗り継ぎに間に合わせる唯一の方法は、他に選択肢が無いことを見越した値段の乗合タクシーで、実際たいていその通りである。",
  ),

  // ---- car カリブ海・地峡 ----
  ev(
    "cartagena-port-load", "gain", ["car"], "📦", 250,
    "A day loading coffee sacks at the port|Un día cargando sacos de café en el puerto|Une journée à charger des sacs de café au port|港でコーヒー袋の積み込みをする",
    "The freighter needed extra hands before the tide turned, and the foreman paid by the sack rather than the hour to anyone who kept up. Shoulders ache for two days afterward, but the pay clears before the ship does.|El buque de carga necesitaba manos extra antes de que cambiara la marea, y el capataz pagó por saco, no por hora, a quien mantuviera el ritmo. Los hombros duelen dos días después, pero el pago llega antes de que zarpe el barco.|Le cargo avait besoin de bras avant le changement de marée, et le contremaître payait au sac plutôt qu'à l'heure quiconque tenait le rythme. Les épaules font mal deux jours après, mais la paie tombe avant que le navire ne largue les amarres.|貨物船は潮目が変わる前に人手を欲しがっていた。監督は時給ではなく袋単位で払い、ついていける者にはそれなりの額を渡した。肩の痛みは二日残るが、船が出港する前に支払いは済む。",
  ),
  ev(
    "medellin-metrocable-guide", "gain", ["car"], "🚡", 230,
    "Guiding first-time riders on the cable car|Guiando a nuevos pasajeros en el teleférico|Guider de nouveaux passagers dans le téléphérique|ケーブルカーの初乗り客を案内する",
    "A tour operator needed someone who could explain, in simple terms, why an ordinary commuter cable car counts as a piece of engineering worth photographing, and the tip jar filled up faster than expected.|Un operador turístico necesitaba a alguien que explicara, en términos sencillos, por qué un teleférico de cercanías corriente merece fotografiarse como obra de ingeniería, y el bote de propinas se llenó más rápido de lo esperado.|Un tour-opérateur avait besoin de quelqu'un capable d'expliquer, simplement, pourquoi un téléphérique de banlieue ordinaire mérite d'être photographié comme prouesse d'ingénierie, et le pot à pourboires s'est rempli plus vite que prévu.|旅行会社は、ふつうの通勤用ロープウェイがなぜ写真に撮る価値のある土木の技なのかを、易しい言葉で説明できる人を探していた。チップ入れは思ったより早くいっぱいになった。",
  ),
  ev(
    "darien-boat-overcharge", "loss", ["car"], "🛥️", 240,
    "The boat around the Darién Gap costs more than quoted|El barco que rodea el Tapón del Darién cuesta más de lo cotizado|Le bateau contournant le bouchon du Darién coûte plus cher qu'annoncé|ダリエン・ギャップを迂回する船が見積もりより高くつく",
    "The price quoted the week before turns out not to include fuel, a life jacket, or the crossing itself, and by the time the boat is loaded there is no real room left to negotiate.|El precio cotizado la semana anterior resulta no incluir el combustible, el chaleco salvavidas ni la travesía en sí, y para cuando el barco está cargado ya no queda margen real para negociar.|Le prix annoncé la semaine précédente ne comprend en fait ni le carburant, ni le gilet de sauvetage, ni la traversée elle-même, et le temps que le bateau soit chargé, il ne reste plus vraiment de marge pour négocier.|一週間前に聞いた値段には、燃料もライフジャケットも肝心の渡航そのものも含まれていなかったとわかる。船に荷が積み終わるころには、もう値切る余地は残っていない。",
  ),

  // ---- gui ギアナ3国 ----
  ev(
    "kourou-launch-crowd", "gain", ["gui"], "🚀", 260,
    "Renting out a rooftop view of a launch|Alquilando una vista del lanzamiento desde la azotea|Louer une vue de lancement depuis un toit|打ち上げが見える屋上を貸し出す",
    "A rocket launch from the space centre draws enough of a crowd that a flat rooftop with a clear line of sight to the coast is suddenly worth charging admission for, folding chairs included.|Un lanzamiento de cohete desde el centro espacial atrae a tanta gente que una azotea plana con vista despejada a la costa de repente vale la pena cobrarla, sillas plegables incluidas.|Un lancement de fusée depuis le centre spatial attire assez de monde pour qu'un toit plat avec vue dégagée sur la côte vaille soudain la peine d'être loué, chaises pliantes comprises.|宇宙基地からのロケット打ち上げは大勢の人を呼ぶので、海岸まで見晴らしのよい平らな屋上が、折りたたみ椅子付きで入場料を取れるほどの見物席になった。",
    [4, 5, 6],
  ),
  ev(
    "linden-bauxite-shift", "gain", ["gui"], "⛏️", 240,
    "An extra shift at the bauxite railhead|Un turno extra en la cabecera del ferrocarril de bauxita|Un service en plus à la tête de ligne de la bauxite|ボーキサイト鉄道の積出駅で臨時の仕事",
    "A wagon short of its usual crew paid well for anyone willing to help sort ore by hand before the next train, dust and all.|Un vagón con menos tripulación de lo habitual pagó bien a quien quisiera ayudar a clasificar el mineral a mano antes del siguiente tren, con polvo incluido.|Un wagon en sous-effectif a bien payé quiconque acceptait de trier le minerai à la main avant le train suivant, poussière comprise.|いつもより人手が足りない貨車が、次の列車が来る前に鉱石を手で選り分けてくれる者に、埃まみれになる代わりにいい賃金を払った。",
  ),
  ev(
    "guiana-downpour-loss", "loss", ["gui"], "🌧️", 190,
    "A tropical downpour ruins the day's stock|Un chubasco tropical arruina la mercancía del día|Une averse tropicale gâche le stock du jour|熱帯のスコールでその日の商品が台無しに",
    "The rain arrived with no real warning, the way it does most afternoons here, and the goods laid out on a cloth in the market square were soaked through before anyone could gather the corners.|La lluvia llegó sin aviso real, como suele ocurrir la mayoría de las tardes aquí, y la mercancía extendida sobre una tela en la plaza del mercado quedó empapada antes de que nadie pudiera recoger las esquinas.|La pluie est arrivée sans vrai préavis, comme presque chaque après-midi ici, et les marchandises étalées sur un tissu place du marché ont été trempées avant qu'on ait pu en ramasser les coins.|この土地のほとんどの午後がそうであるように、雨はほとんど前触れなく降ってきた。市場の広場に布を敷いて並べていた商品は、隅をまとめる間もなくずぶ濡れになった。",
  ),

  // ---- riv 川の国境 ----
  ev(
    "amazon-boat-guide", "gain", ["riv"], "🛶", 230,
    "Guiding a river-dolphin spotting trip|Guiando una salida para avistar delfines de río|Guider une sortie d'observation des dauphins de rivière|川イルカ観察の案内をする",
    "A family of visitors wanted someone who knew where the pink river dolphins tend to surface at this hour, and a slow afternoon on the water turned into a decent afternoon's pay.|Una familia de visitantes quería a alguien que supiera dónde suelen salir a la superficie los delfines rosados del río a esta hora, y una tarde tranquila en el agua se convirtió en una paga decente.|Une famille de visiteurs voulait quelqu'un qui sache où les dauphins roses de rivière ont tendance à faire surface à cette heure, et un après-midi tranquille sur l'eau s'est transformé en une bonne paie.|訪れた家族連れが、この時刻にピンク色のカワイルカが浮上しやすい場所を知る案内人を探していた。川でのゆったりした午後が、まずまずの実入りになった。",
  ),
  ev(
    "riverport-fish-sale", "gain", ["riv"], "🐟", 210,
    "A good catch sells out fast at the river port|Una buena pesca se vende rápido en el puerto fluvial|Une belle pêche se vend vite au port fluvial|川港で豊漁が飛ぶように売れる",
    "The boats came in heavier than usual this morning, and word travelled fast enough that the whole catch was gone from the dock before the ice had even started to melt.|Los botes llegaron más cargados de lo habitual esta mañana, y la noticia corrió tan rápido que toda la pesca se vendió en el muelle antes de que el hielo empezara siquiera a derretirse.|Les bateaux sont rentrés plus chargés que d'habitude ce matin, et la nouvelle a circulé assez vite pour que toute la pêche soit vendue sur le quai avant même que la glace ne commence à fondre.|今朝は舟がいつもより重く帰ってきて、噂はすぐに広まり、氷が溶け始める前に水揚げはすべて桟橋で売り切れた。",
  ),
  ev(
    "boat-engine-repair", "loss", ["riv"], "🔧", 220,
    "A boat engine gives out mid-river|El motor de la barca falla en medio del río|Le moteur du bateau lâche en plein fleuve|川の真ん中でボートのエンジンが止まる",
    "The outboard motor coughs, sputters and dies well short of the far bank, and the only way onward is to pay whoever happens to be passing with a working engine and a rope.|El motor fuera de borda tose, resopla y muere bastante antes de llegar a la otra orilla, y la única forma de seguir es pagarle a quien pase con un motor que funcione y una cuerda.|Le hors-bord tousse, crachote et rend l'âme bien avant l'autre rive, et le seul moyen de continuer est de payer quiconque passe par là avec un moteur qui marche et une corde.|船外機は咳き込み、ぶすぶすと音を立てて、対岸にはまだ遠いところで止まってしまった。動くエンジンと綱を持って通りかかった誰かに払うほかに、先へ進む手立てはない。",
  ),

  // ---- and アンデス高地 ----
  ev(
    "alpaca-wool-stall", "gain", ["and"], "🧶", 220,
    "Minding an alpaca-wool stall at the Sunday market|Atendiendo un puesto de lana de alpaca en el mercado dominical|Tenir un étal de laine d'alpaga au marché du dimanche|日曜市でアルパカ毛織物の屋台を手伝う",
    "The weaver's hands were needed on the loom, not at the counter, and minding the stall for an afternoon paid in cash plus a scarf that did not quite sell.|Las manos de la tejedora hacían falta en el telar, no en el mostrador, y atender el puesto una tarde pagó en efectivo, más una bufanda que no llegó a venderse.|Les mains de la tisserande étaient nécessaires au métier à tisser, pas au comptoir, et tenir l'étal une après-midi a payé en espèces, plus une écharpe restée invendue.|織り手の手は台に向けるべきで店番どころではなく、午後のあいだ屋台を任されると、現金に加えて売れ残った肩掛け一枚をもらえた。",
  ),
  ev(
    "trail-porter-job", "gain", ["and"], "🎒", 240,
    "Portering for a trekking group|Cargando equipaje para un grupo de trekking|Porter les sacs d'un groupe de trek|トレッキング団体の荷物運びをする",
    "A group short one porter for the day's climb paid the going rate without haggling, glad enough to have someone who knew the altitude and the pace it demands.|Un grupo con un cargador menos para la subida del día pagó la tarifa habitual sin regatear, contento de tener a alguien que conociera la altura y el ritmo que exige.|Un groupe manquant d'un porteur pour la montée du jour a payé le tarif habituel sans marchander, bien content d'avoir quelqu'un connaissant l'altitude et le rythme qu'elle impose.|今日の登りに荷担ぎが一人足りない一団は、値切ることなく相場どおりを払った。高度とそれが要求する歩調を心得た者がいて助かったようだった。",
  ),
  ev(
    "soroche-medicine", "loss", ["and"], "💊", 180,
    "Altitude sickness calls for coca tea and a pharmacy visit|El mal de altura obliga a comprar té de coca y visitar la farmacia|Le mal des montagnes impose une tisane de coca et un détour par la pharmacie|高山病で薬局へ寄ることになる",
    "The headache and the shortness of breath both arrived faster than expected at this altitude, and coca tea plus something stronger from the pharmacy counter took most of an afternoon's budget.|El dolor de cabeza y la falta de aire llegaron más rápido de lo esperado a esta altura, y el té de coca más algo más fuerte del mostrador de la farmacia se llevaron buena parte del presupuesto de la tarde.|Le mal de tête et l'essoufflement sont arrivés plus vite que prévu à cette altitude, et la tisane de coca plus quelque chose de plus fort au comptoir de la pharmacie ont englouti l'essentiel du budget de l'après-midi.|この標高では頭痛と息切れがどちらも思ったより早くやってきた。コカ茶と、薬局の窓口でもらったもっと強い薬とで、その日の予算の大半が消えた。",
  ),
  ev(
    "market-day-overcharge", "loss", ["and"], "🥔", 160,
    "Paying the visitor's price at the potato market|Pagando el precio de forastero en el mercado de papas|Payer le prix touriste au marché aux pommes de terre|ジャガイモ市で観光客値段を払わされる",
    "The price quoted in Spanish was noticeably higher than the one murmured in Quechua to the next customer in line, and there was no graceful way to ask for the local rate after the fact.|El precio dicho en español fue notablemente más alto que el que se murmuró en quechua al siguiente cliente de la fila, y no hubo forma elegante de pedir después la tarifa local.|Le prix annoncé en espagnol était nettement plus élevé que celui murmuré en quechua au client suivant dans la file, et il n'y avait aucun moyen élégant de réclamer après coup le tarif local.|スペイン語で告げられた値段は、列の次の客にケチュア語でささやかれた値段よりも明らかに高かった。あとから地元料金を求める上品なやり方は見当たらなかった。",
  ),

  // ---- atc 太平洋岸 ----
  ev(
    "fishing-fleet-day", "gain", ["atc"], "🎣", 230,
    "A day's work on the anchovy fleet|Un día de trabajo en la flota anchovetera|Une journée sur la flotte d'anchois|カタクチイワシ漁船団で一日働く",
    "The boats needed an extra pair of hands for the sorting nets, and the Humboldt Current's cold, nutrient-rich water made for one of the better hauls of the month.|Los barcos necesitaban manos extra para las redes de clasificación, y las aguas frías y ricas en nutrientes de la corriente de Humboldt dieron una de las mejores capturas del mes.|Les bateaux avaient besoin de bras supplémentaires pour les filets de tri, et les eaux froides et riches en nutriments du courant de Humboldt ont donné l'une des meilleures pêches du mois.|舟は選別網を扱う人手を求めていた。栄養豊かで冷たいフンボルト海流の海は、この月でも屈指の豊漁をもたらした。",
  ),
  ev(
    "copper-mine-shift", "gain", ["atc"], "⛏️", 260,
    "A day shift at the copper mine's edge|Un turno de día en el borde de la mina de cobre|Un poste de jour en bordure de la mine de cuivre|銅鉱山の縁での日勤",
    "The mine's contractor was short a truck spotter for the day, and standing in the desert heat directing loaders paid better than almost anything else on offer in town.|La contratista de la mina necesitaba un guía de camiones para el día, y quedarse en el calor del desierto dirigiendo cargadoras pagó mejor que casi cualquier otra cosa disponible en el pueblo.|Le sous-traitant de la mine manquait d'un guide de camions pour la journée, et rester dans la chaleur du désert à diriger les chargeuses payait mieux que presque tout ce qui se trouvait en ville.|鉱山の下請け業者は、その日トラック誘導の人手が足りなかった。砂漠の暑さの中でローダーを誘導する仕事は、町でほかに見つかるどんな仕事よりも実入りがよかった。",
  ),
  ev(
    "camanchaca-delay", "loss", ["atc"], "🌫️", 170,
    "A morning fog closes the coast road|Una niebla matinal cierra la carretera costera|Un brouillard matinal ferme la route côtière|朝霧が海岸道路を閉ざす",
    "The camanchaca rolled in thicker than usual, and the bus sat at the roadside for two hours waiting for enough visibility to move, the fare refunded in nothing but an apology.|La camanchaca llegó más espesa de lo habitual, y el autobús quedó dos horas al borde de la carretera esperando visibilidad suficiente para moverse, sin más reembolso que una disculpa.|La camanchaca est arrivée plus épaisse que d'habitude, et le car est resté deux heures au bord de la route à attendre une visibilité suffisante pour repartir, le prix du billet remboursé par de simples excuses.|カマンチャカの霧はいつもより濃く立ち込め、バスは動けるだけの視界が戻るまで二時間も路肩で待たされた。払い戻されたのは謝罪の言葉だけだった。",
  ),

  // ---- pla ラプラタ・パンパ・パタゴニア ----
  ev(
    "vendimia-harvest-job", "gain", ["pla"], "🍇", 240,
    "A day picking grapes before the frost|Un día cosechando uvas antes de la helada|Une journée de vendange avant le gel|霜が降りる前にブドウを摘む一日",
    "The vineyard needed every pair of hands it could find before the first cold night of the season, and the pay came with as many bruised grapes as anyone cared to eat on the spot.|El viñedo necesitaba todas las manos disponibles antes de la primera noche fría de la temporada, y el pago vino con tantas uvas magulladas como quisiera comer cualquiera en el momento.|Le vignoble avait besoin de toutes les mains disponibles avant la première nuit froide de la saison, et la paie s'est accompagnée d'autant de grappes abîmées qu'on voulait bien en manger sur place.|ワイン畑はその年最初の冷え込む夜が来る前に、集められるだけの人手を求めていた。給金には、その場で好きなだけ食べてよい傷んだブドウがおまけについてきた。",
    [0, 11],
  ),
  ev(
    "buenosaires-tango-busking", "gain", ["pla"], "💃", 220,
    "Busking a tango set for the tourist crowd|Tocando un set de tango para el turisteo|Faire la manche avec un set de tango pour les touristes|観光客相手にタンゴを流しで弾く",
    "A bandoneón player short a dance partner for the street corner routine offered a cut of the hat if the steps could be kept up for three songs running, and they could.|Un bandoneonista sin pareja de baile para el número de la esquina ofreció un porcentaje de la gorra si se podían aguantar los pasos durante tres canciones seguidas, y se pudo.|Un bandonéoniste sans partenaire de danse pour le numéro du coin de rue a proposé une part de la recette du chapeau si les pas tenaient trois chansons d'affilée, et ils ont tenu.|街角の芸に相方を欠いたバンドネオン弾きが、三曲続けて足を運べるなら帽子に集まった金の分け前を出すと持ちかけてきた。実際三曲続いた。",
  ),
  ev(
    "estancia-cattle-drive", "gain", ["pla"], "🐎", 230,
    "Helping move cattle at an estancia|Ayudando a mover el ganado en una estancia|Aider à déplacer le bétail dans une estancia|エスタンシアで牛の移動を手伝う",
    "The ranch was a rider short for moving a herd between paddocks, and staying in the saddle all afternoon without falling off earned a full day's wage and a passable joke at dinner.|A la estancia le faltaba un jinete para trasladar la hacienda entre potreros, y aguantar toda la tarde en la silla sin caerse ganó un jornal completo y una broma pasable en la cena.|L'estancia manquait d'un cavalier pour déplacer le troupeau entre les enclos, et tenir toute l'après-midi en selle sans tomber a valu un salaire complet et une blague passable au dîner.|牧場は放牧地のあいだで群れを移す騎手が一人足りなかった。午後じゅう鞍から落ちずに乗り続けると、丸一日分の賃金と、夕食での及第点のからかいを得た。",
  ),
  ev(
    "futbol-bet-loss", "loss", ["pla"], "⚽", 200,
    "A confident football bet goes wrong|Una apuesta segura de fútbol sale mal|Un pari football trop confiant tourne mal|自信満々のサッカー賭けが外れる",
    "The favourite side went down 1–0 to a stoppage-time goal nobody in the bar saw coming, and the friendly wager placed at half-time looked a lot less clever by full time.|El equipo favorito cayó 1-0 con un gol en el descuento que nadie en el bar vio venir, y la apuesta amistosa hecha en el descanso pareció mucho menos astuta al final del partido.|L'équipe favorite s'est inclinée 1-0 sur un but marqué dans le temps additionnel que personne au bar n'avait vu venir, et le pari amical placé à la mi-temps semblait bien moins malin au coup de sifflet final.|贔屓のチームは、バーの誰も予想しなかったロスタイムの一点で1対0で敗れた。ハーフタイムに交わした気軽な賭けは、試合終了までにずいぶん間の抜けたものに見えた。",
  ),
  ev(
    "carnival-costume-damage", "loss", ["pla"], "🎉", 190,
    "A Carnival costume needs repairs the morning after|Un disfraz de Carnaval necesita arreglos al día siguiente|Un costume de Carnaval a besoin de réparations le lendemain matin|カーニバルの衣装が翌朝には修繕を要する",
    "A sequin cape borrowed for the parade came back torn along one seam after a crowded night on the costanera, and returning it in good repair cost more than the night itself.|Una capa de lentejuelas prestada para el desfile volvió rota por una costura tras una noche de multitud en la costanera, y devolverla arreglada costó más que la propia noche.|Une cape à sequins empruntée pour le défilé est revenue déchirée sur une couture après une nuit de foule sur la costanera, et la rendre réparée a coûté plus cher que la soirée elle-même.|パレードのために借りたスパンコールのマントは、混雑した遊歩道での一晩を経て縫い目が裂けて戻ってきた。きちんと直して返すのに、その晩そのものより金がかかった。",
    [9, 10],
  ),
];
