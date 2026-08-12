/**
 * モロッコの青マス・赤マスで起きる出来事(20件。増12・減8)。
 *
 * 地方コード: rif=北部・リーフ / atl=大西洋岸 / cen=中部・内陸 / atm=アトラス山脈 /
 * sud=南部・砂漠 / est=東部
 *
 * 地方も月も指定しない出来事を4件(増2・減2)置いてあるので、
 * どの地方・どの月でも必ず1件は引ける(他の盤面と同じ約束)。
 * そのうえで、rif・atl・cen・sudの4地方には各3件(増2・減1)、
 * atm・estには各2件(増1・減1)を、地方の産業や地理に結びつけて置いている。
 * **地方ごとの `gains`/`losses` は、その地方の出来事だけで増・減の両方が
 * 引けることを個別に確認済み**(全国共通の4件に頼らなくても成り立つ)。
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

export const MOROCCO_MONEY_EVENTS = [
  // ---- 全国どこでも・通年 ----
  ev(
    "hammam-attendant", "gain", [], "🧖", 220,
    "A day filling in at the hammam|Un día supliendo en el hammam|Une journée à remplacer au hammam|ハンマムの手伝いで一日働く",
    "The usual attendant at the neighbourhood hammam was out sick, and scrubbing backs and hauling buckets of hot water for six hours paid better than expected in tips left on the way out. Nearly every Moroccan neighbourhood has its own public bathhouse, heated the old way with a wood-fired furnace out back, and most people still go weekly rather than bathe only at home.|El encargado habitual del hammam del barrio estaba enfermo, y fregar espaldas y acarrear cubos de agua caliente durante seis horas pagó mejor de lo esperado en propinas al salir. Casi todos los barrios marroquíes tienen su propio baño público, calentado a la vieja usanza con un horno de leña detrás, y la mayoría sigue yendo cada semana en vez de bañarse solo en casa.|Le préposé habituel du hammam du quartier était malade, et frotter les dos et porter des seaux d'eau chaude pendant six heures a rapporté plus que prévu en pourboires à la sortie. Presque chaque quartier marocain a son propre bain public, chauffé à l'ancienne par un four à bois à l'arrière, et la plupart des gens y vont encore chaque semaine plutôt que de se laver seulement chez eux.|近所のハンマム(公衆浴場)のいつもの係員が病欠で、6時間ひたすら背中をこすり熱い湯のバケツを運ぶ仕事は、帰り際に渡されたチップの分、思ったより実入りがよかった。モロッコのほぼどの街区にも独自の公衆浴場があり、裏手の薪炊きの窯で昔ながらに湯を沸かしている。いまも多くの人が自宅の風呂だけでなく毎週通う。",
  ),
  ev(
    "lost-tourist-interpreter", "gain", [], "🗣️", 200,
    "Interpreting for a lost tour group|Haciendo de intérprete para un grupo turístico perdido|Servir d'interprète pour un groupe de touristes perdu|迷った観光客の一団の通訳を務める",
    "A group of visitors had wandered off their guide's route and couldn't make themselves understood to anyone in the alley, so twenty minutes of shuttling between French, Darija and broken English earned a folded banknote and a lot of relieved handshakes. Most Moroccans grow up switching between Arabic, French and often Amazigh before school even starts.|Un grupo de visitantes se había desviado de la ruta de su guía y no lograba hacerse entender con nadie en el callejón, así que veinte minutos alternando entre francés, darija e inglés precario le valieron un billete doblado y muchos apretones de manos aliviados. La mayoría de los marroquíes crece alternando entre árabe, francés y a menudo amazige incluso antes de empezar la escuela.|Un groupe de visiteurs s'était égaré de l'itinéraire de leur guide et ne se faisait comprendre de personne dans la ruelle, alors vingt minutes à jongler entre français, darija et anglais approximatif ont valu un billet plié et beaucoup de poignées de main soulagées. La plupart des Marocains grandissent en alternant entre arabe, français et souvent amazighe avant même l'école.|団体客の一行がガイドの決めたルートからはぐれ、路地の誰とも意思疎通できずにいた。フランス語とダリジャ語(モロッコ方言アラビア語)、片言の英語を20分行き来しただけで、折りたたんだ紙幣とほっとした握手を何度もかわすことになった。モロッコ人の多くは就学前からすでにアラビア語とフランス語、しばしばアマジグ語も行き来しながら育つ。",
  ),
  ev(
    "souk-haggling-loss", "loss", [], "🧵", 180,
    "Losing badly at haggling in the souk|Perdiendo feo regateando en el zoco|Une négociation ratée au souk|市場での値切り交渉に完敗する",
    "The merchant's opening price seemed absurd, so the haggling started confidently — and ended, an hour and three cups of tea later, with a scarf bought at nearly the original asking price anyway. Bargaining is expected in most souks rather than optional, and the ritual of tea, small talk and a slow walk toward the door is as much a part of the transaction as the price itself.|El precio inicial del vendedor parecía absurdo, así que el regateo empezó con confianza, y terminó, una hora y tres tés después, con una bufanda comprada casi al precio de salida original de todos modos. En la mayoría de los zocos se espera regatear, y el ritual del té, la charla y el paso lento hacia la puerta forman parte de la transacción tanto como el precio.|Le prix de départ du marchand semblait absurde, alors la négociation a commencé avec assurance — pour finir, une heure et trois thés plus tard, par l'achat d'une écharpe presque au prix demandé au départ. Le marchandage est attendu dans la plupart des souks plutôt que facultatif, et le rituel du thé, des bavardages et du pas lent vers la porte fait autant partie de la transaction que le prix.|店主の言い値があまりに法外に思えたので、自信満々に値切り交渉を始めた。だが1時間と茶を三杯挟んだのち、結局ほぼ最初の言い値でスカーフを買う羽目になった。たいていの市場では値切りは選択肢ではなく前提であり、茶と世間話、出口へ向かってゆっくり歩き出す仕草までもが値段そのものと同じくらい取引の一部である。",
  ),
  ev(
    "faux-guide-fee", "loss", [], "🧭", 160,
    "An unlicensed guide won't take no for an answer|Un guía no autorizado no acepta un no por respuesta|Un faux guide n'accepte pas de refus|無許可のガイドが「結構です」を聞き入れない",
    "He appeared out of nowhere offering to lead the way to a famous gate that was, it turned out, only two minutes ahead in plain sight, then stood at the corner afterward with an open palm until a few coins changed hands just to end the conversation. Cities with major medinas post signs warning against unofficial faux guides, but a friendly, insistent stranger is hard to shake in a maze of unmarked alleys.|Apareció de la nada ofreciéndose a guiar hasta una famosa puerta que, resultó, estaba a solo dos minutos y a la vista, y luego se plantó en la esquina con la palma abierta hasta que cambiaron de mano unas monedas solo para zanjar la conversación. Las ciudades con grandes medinas colocan carteles advirtiendo contra los guías no oficiales, pero un desconocido simpático e insistente es difícil de quitarse de encima en un laberinto de callejones sin señalizar.|Il est apparu de nulle part en proposant de guider vers une porte célèbre qui, en fin de compte, se trouvait à seulement deux minutes et bien en vue, puis s'est planté au coin de la rue la paume ouverte jusqu'à ce que quelques pièces changent de main juste pour clore la conversation. Les villes aux grandes médinas affichent des panneaux mettant en garde contre les faux guides, mais un inconnu amical et insistant est difficile à décourager dans un labyrinthe de ruelles sans panneaux.|どこからともなく現れ、有名な門まで案内すると申し出てきたが、実はそこは目と鼻の先、わずか2分の場所だった。そのあと角に立って手のひらを差し出したまま、小銭が渡るまで動かず、結局はその場を切り上げるためだけに払う羽目になった。大きな旧市街のある町では無許可の「偽ガイド」への注意書きが掲げられているが、標識のない路地の迷路で、愛想よく食い下がる見知らぬ相手を振り切るのは難しい。",
  ),

  // ---- rif 北部・リーフ ----
  ev(
    "asilah-mural-touchup", "gain", ["rif"], "🎨", 240,
    "Helping touch up a mural before the festival|Ayudando a retocar un mural antes del festival|Aider à retoucher une fresque avant le festival|祭りの前に壁画の仕上げを手伝う",
    "An artist working against the clock before the festival opening needed an extra pair of hands to fill in a background wall while she finished the detail work, paid by the hour and thrown in a spare paint-splattered t-shirt. Whole streets get repainted like this every year, wall by wall, right up until the last morning before the crowds arrive.|Una artista corriendo contra el reloj antes de la inauguración del festival necesitaba manos extra para rellenar un muro de fondo mientras terminaba los detalles, pagado por hora y de propina una camiseta manchada de pintura. Calles enteras se repintan así cada año, muro a muro, hasta la última mañana antes de que lleguen las multitudes.|Une artiste courant contre la montre avant l'ouverture du festival avait besoin d'un coup de main pour remplir un mur de fond pendant qu'elle finissait les détails, payé à l'heure, avec en prime un t-shirt maculé de peinture. Des rues entières sont ainsi repeintes chaque année, mur par mur, jusqu'au dernier matin avant l'arrivée des foules.|祭りの開幕までに間に合わせようと時間と競う画家が、細部を仕上げるあいだ背景の壁を塗り埋める助っ人を求めていた。時給払いで、おまけに絵の具のはねた予備のTシャツまでもらえた。通りは毎年こうして壁一枚ずつ塗り直され、人出が押し寄せる最後の朝まで作業が続く。",
    [1],
  ),
  ev(
    "rif-fish-catch-share", "gain", ["rif"], "🐟", 230,
    "A share of an unusually good catch|Una parte de una pesca inusualmente buena|Une part d'une pêche inhabituellement bonne|異例の大漁の分け前",
    "The boat came in low in the water with far more than the usual haul, and everyone who helped carry crates up from the dock before the ice melted got an equal cut of the extra, no questions asked. Small ports along the Rif coast still divide an unusually large catch this way, informally, long before anything reaches a scale or a ledger.|El barco llegó calado en el agua con mucho más de lo habitual, y todo el que ayudó a subir las cajas desde el muelle antes de que se derritiera el hielo recibió una parte igual del excedente, sin preguntas. Los pequeños puertos de la costa del Rif siguen repartiendo así una pesca inusualmente grande, de manera informal, mucho antes de que nada llegue a una báscula.|Le bateau est rentré bas sur l'eau avec bien plus que la prise habituelle, et tous ceux qui ont aidé à monter les caisses depuis le quai avant que la glace ne fonde ont reçu une part égale du surplus, sans question. Les petits ports de la côte du Rif se partagent encore ainsi une prise inhabituellement grosse, de manière informelle, bien avant que quoi que ce soit n'atteigne une balance.|船は普段よりはるかに多い漁獲で喫水を深く沈めて戻ってきた。氷が溶ける前に桟橋から木箱を運び上げるのを手伝った者は誰もが、詮索なしに余剰分の等しい分け前を受け取った。リーフ海岸沿いの小さな港では、異例の大漁があると、はかりや帳簿に載るずっと前に、いまもこうして非公式に分け合う。",
  ),
  ev(
    "rif-downpour-stall", "loss", ["rif"], "🌧️", 170,
    "A sudden downpour floods the market stalls|Un aguacero repentino inunda los puestos del mercado|Une averse soudaine inonde les étals du marché|突然の豪雨が市場の露店を水浸しにする",
    "The sky over the Rif hills opened without warning, and by the time the tarps went up half the spice sacks and dried fruit on display had already turned to mud in the gutter running down the middle of the street. The Rif catches more rain than almost anywhere else in Morocco, which is exactly why its terraced hillsides stay green long after the plains have gone the colour of straw.|El cielo sobre las colinas del Rif se abrió sin aviso, y para cuando se pusieron las lonas, la mitad de los sacos de especias y la fruta seca expuestos ya se habían convertido en barro en la acequia que baja por el centro de la calle. El Rif recibe más lluvia que casi cualquier otro lugar de Marruecos.|Le ciel au-dessus des collines du Rif s'est ouvert sans prévenir, et le temps de tendre les bâches, la moitié des sacs d'épices et des fruits secs exposés s'était déjà changée en boue dans le caniveau au milieu de la rue. Le Rif reçoit plus de pluie que presque partout ailleurs au Maroc.|前触れもなくリーフの丘の空が開き、シートを張る頃には、並べていた香辛料の袋や乾物の半分がすでに通りの真ん中を流れる溝で泥まみれになっていた。リーフはモロッコのほとんどどこよりも雨が多く、それこそが平野が藁色に変わったあともこの段々畑の丘が緑を保ち続ける理由である。",
    [4, 5],
  ),

  // ---- atl 大西洋岸 ----
  ev(
    "grilled-sardine-shift", "gain", ["atl"], "🐠", 220,
    "Covering a shift at a grilled-sardine stall|Cubriendo un turno en un puesto de sardinas a la parrilla|Assurer un service à un étal de sardines grillées|炭火焼きイワシの屋台の店番を代わる",
    "The regular grill cook needed the afternoon off, and fanning charcoal and turning skewers of sardines for the lunch rush earned a cut of the till plus as much bread and grilled fish as could be eaten on the spot. Every port town along the Atlantic keeps a row of these stalls going right at the harbour, selling the catch within hours of the boats coming in.|El parrillero habitual necesitaba la tarde libre, y avivar el carbón y dar la vuelta a las brochetas de sardinas durante la hora punta del almuerzo valió una parte de la caja además de todo el pan y pescado a la parrilla que se pudiera comer allí mismo.|Le grilladin habituel avait besoin de son après-midi, et attiser le charbon et retourner les brochettes de sardines pendant le coup de feu du déjeuner a rapporté une part de la caisse plus autant de pain et de poisson grillé qu'on pouvait manger sur place.|いつもの焼き手が午後だけ休みを取ったため、炭をあおぎイワシの串を返す仕事を昼どきのかき入れ時に代わって務め、売上の一部と、その場で食べきれるだけのパンと焼き魚を受け取った。大西洋岸のどの港町にも、船が戻って数時間のうちに漁獲を売るこうした屋台の列が港のすぐそばに並んでいる。",
  ),
  ev(
    "fish-auction-haul", "gain", ["atl"], "🎣", 210,
    "A good morning at the fish auction|Una buena mañana en la lonja de pescado|Une bonne matinée à la criée aux poissons|魚のセリで幸先の良い朝",
    "Helping sort and weigh crates before the dawn auction usually paid a flat rate, but a bumper morning meant a bonus split among everyone on the dock once the last lot sold above expectations. Morocco's Atlantic fleet, from Safi down to Agadir, still lands a large share of its catch through these open, shouted auctions rather than fixed contracts.|Ayudar a clasificar y pesar cajas antes de la subasta del amanecer solía pagar una tarifa fija, pero una mañana excepcional significó una bonificación repartida entre todos en el muelle una vez que el último lote se vendió por encima de lo esperado.|Aider à trier et peser les caisses avant la criée de l'aube payait d'habitude un tarif fixe, mais une matinée exceptionnelle a signifié une prime partagée entre tous ceux du quai une fois le dernier lot vendu au-dessus des attentes.|夜明けのセリの前に木箱を仕分けて計量する仕事はふだん定額払いだが、この日は最後の一山が予想を上回る値で売れ、桟橋にいた全員でボーナスを分け合う朝になった。サフィからアガディールまで、モロッコの大西洋岸の漁船団はいまも漁獲の多くを、固定契約ではなくこうした声によるセリを通じて売っている。",
  ),
  ev(
    "artdeco-parking-fine", "loss", ["atl"], "🚗", 170,
    "A parking fine in the old Art Deco district|Una multa de aparcamiento en el viejo barrio Art Déco|Une amende de stationnement dans le vieux quartier Art déco|旧アール・デコ地区での駐車違反の罰金",
    "The street looked wide enough and nobody else's car seemed to mind, but a warden appeared within minutes of the engine switching off, ticket pad already in hand. Morocco's Atlantic coast cities enforce parking rules in their dense colonial-era downtown grids more strictly than the more relaxed medinas further inland.|La calle parecía lo bastante ancha y a nadie más parecía importarle, pero un agente apareció a los pocos minutos de apagar el motor, con el talonario ya en la mano. Las ciudades de la costa atlántica de Marruecos aplican las normas de aparcamiento en sus densos centros de la era colonial con más rigor que las medinas más relajadas del interior.|La rue semblait assez large et personne d'autre ne semblait s'en soucier, mais un agent est apparu quelques minutes après l'arrêt du moteur, carnet déjà en main. Les villes de la côte atlantique du Maroc font respecter le stationnement dans leurs denses centres-villes de l'époque coloniale plus strictement que les médinas plus détendues de l'intérieur.|通りは十分に広く見えたし、他の車も気にしていないようだったが、エンジンを切ってから数分もしないうちに取締員がすでに切符帳を手にして現れた。モロッコの大西洋岸の町は、内陸のもっとゆるい旧市街に比べ、密集した植民地時代の中心街での駐車規則をより厳しく取り締まっている。",
  ),

  // ---- cen 中部・内陸 ----
  ev(
    "medina-shop-model", "gain", ["cen"], "🧣", 230,
    "Modeling scarves for a shop's photos|Modelando pañuelos para las fotos de una tienda|Poser avec des foulards pour les photos d'une boutique|店の商品写真でスカーフのモデルをする",
    "A textile shop owner needed someone to drape a dozen scarves for photos to post online, and an hour of standing still under a bright lamp in the back of the stall paid better than the actual buying customers that afternoon. Small medina shops increasingly sell as much through phone screens to buyers abroad as across the counter.|El dueño de una tienda de tejidos necesitaba a alguien para lucir una docena de pañuelos en fotos que colgar en internet, y una hora quieto bajo una lámpara brillante en el fondo del puesto pagó mejor que los clientes reales de esa tarde.|Le propriétaire d'une boutique de tissus avait besoin de quelqu'un pour draper une douzaine de foulards pour des photos à publier en ligne, et une heure immobile sous une lampe vive au fond de l'échoppe a rapporté plus que les vrais clients de cet après-midi-là.|織物店の店主がオンラインに載せる写真のため、十数枚のスカーフをまとってくれる人を探していた。店の奥で明るいランプの下、1時間じっと立っているだけの仕事は、その日の実際の客より稼ぎになった。旧市街の小さな店は、いまや対面の客と同じくらい、画面越しに海外の買い手へ売ることが増えている。",
  ),
  ev(
    "olive-harvest-day", "gain", ["cen"], "🫒", 210,
    "A day helping harvest olives|Un día ayudando en la cosecha de aceitunas|Une journée à aider à la récolte des olives|オリーブの収穫を手伝う一日",
    "A family with more trees than hands to pick them needed help laying nets and beating branches with long poles, paid in cash at day's end and sent home with a bottle of last year's oil besides. The olive groves around the interior cities are worked mostly by hand, tree by tree, for a harvest that runs just a few weeks each year.|Una familia con más árboles que manos para recolectarlos necesitaba ayuda para tender redes y varear las ramas con palos largos, pagado en efectivo al final del día y con una botella del aceite del año pasado de propina.|Une famille avec plus d'arbres que de bras pour les récolter avait besoin d'aide pour tendre des filets et gauler les branches avec de longues perches, payée en liquide en fin de journée et repartie en plus avec une bouteille d'huile de l'an dernier.|木の数に対して手が足りない家族が、網を張り長い棒で枝を叩く作業の助っ人を求めていた。日暮れに現金で払われ、去年搾ったオイルの瓶までおまけにもらえた。内陸の町を囲むオリーブ畑は、一年でわずか数週間しかない収穫期のあいだ、ほとんど手作業で一本一本世話される。",
    [6, 7],
  ),
  ev(
    "medina-maze-lost", "loss", ["cen"], "🌀", 150,
    "Lost for hours in the medina's alleys|Perdido durante horas en los callejones de la medina|Perdu pendant des heures dans les ruelles de la médina|旧市街の路地で何時間も迷う",
    "Every turn looked exactly like the last one, the phone had no signal under the covered passages, and what should have been a ten-minute walk back to the hotel turned into two hours of dead ends, paid taxi rides that couldn't find the right gate, and one very patient shopkeeper's directions that helped eventually.|Cada giro se parecía exactamente al anterior, el teléfono no tenía señal bajo los pasajes cubiertos, y lo que debía ser una caminata de diez minutos de vuelta al hotel se convirtió en dos horas de callejones sin salida y viajes en taxi pagados que no encontraban la puerta correcta.|Chaque virage ressemblait exactement au précédent, le téléphone n'avait aucun signal sous les passages couverts, et ce qui aurait dû être une marche de dix minutes jusqu'à l'hôtel s'est transformé en deux heures d'impasses et de courses en taxi payées qui ne trouvaient pas la bonne porte.|どの角も直前のものとまったく同じに見え、屋根付きの通路の下では電話の電波も届かない。宿までわずか10分のはずの道のりが、行き止まりとタクシー代の無駄払いを重ねる2時間の迷走になり、最後は根気強い店主の道案内でようやく抜け出せた。",
  ),

  // ---- atm アトラス山脈 ----
  ev(
    "apple-stand-bonus", "gain", ["atm"], "🍎", 210,
    "A bonus for a good day at the apple stand|Una bonificación por un buen día en el puesto de manzanas|Une prime pour une bonne journée à l'étal de pommes|リンゴの露店での好調な一日のボーナス",
    "A passing bus of visitors stopped for photos of the mountain view and cleared out most of the day's crates within twenty minutes, and the stand's owner peeled off an extra note for the help hauling more boxes up from the cellar. Roadside apple stands line the mountain highway every autumn, selling straight from the family orchard behind the house.|Un autobús de visitantes de paso se detuvo para hacer fotos de la vista de la montaña y vació la mayoría de las cajas del día en veinte minutos, y el dueño del puesto añadió un billete extra por la ayuda cargando más cajas desde la bodega.|Un bus de visiteurs de passage s'est arrêté pour photographier la vue sur la montagne et a vidé la plupart des caisses du jour en vingt minutes, et le propriétaire de l'étal a détaché un billet supplémentaire pour l'aide à monter d'autres caisses depuis la cave.|通りすがりの観光バスが山の眺めを写真に収めようと停まり、わずか20分でその日の木箱の大半を売り切った。地下から追加の箱を運び上げる手伝いをした礼として、露店の主人が余分に一枚多く手渡してくれた。毎年秋、山道沿いにはこうした露店が並び、家の裏の果樹園から直接リンゴを売る。",
    [6],
  ),
  ev(
    "mountain-pass-snow-loss", "loss", ["atm"], "🏔️", 180,
    "An early snowfall strands a delivery run|Una nevada temprana deja varada una entrega|Une chute de neige précoce bloque une livraison|早い降雪が配達を立ち往生させる",
    "The pass was clear that morning, but by early afternoon snow had closed it without warning, and the load of goods bound for a mountain village had to be turned back and stored overnight at real cost, along with a night's lodging that hadn't been budgeted for. Middle Atlas roads can close for snow well before winter officially arrives on the calendar.|El puerto estaba despejado esa mañana, pero a primera hora de la tarde la nieve lo había cerrado sin aviso, y el cargamento de mercancías destinado a un pueblo de montaña tuvo que dar la vuelta y guardarse durante la noche, con un coste real, además de un alojamiento no presupuestado.|Le col était dégagé ce matin-là, mais en début d'après-midi la neige l'avait fermé sans prévenir, et le chargement de marchandises destiné à un village de montagne a dû faire demi-tour et être stocké pour la nuit à un coût réel, plus une nuitée non budgétée.|その日の朝は峠は開いていたが、午後早くには前触れもなく雪で閉ざされ、山あいの村へ向かう荷物は引き返してひと晩保管せざるを得なくなり、予定外の宿泊費まで実費でかさんだ。中部アトラスの道路は、暦の上ではまだ冬になっていないうちから雪で閉鎖されることがある。",
    [8, 9],
  ),

  // ---- sud 南部・砂漠 ----
  ev(
    "film-extra-desert", "gain", ["sud"], "🎬", 240,
    "A day as a film extra in the desert|Un día como extra de cine en el desierto|Une journée comme figurant de cinéma dans le désert|砂漠での映画のエキストラで一日働く",
    "A production scouting the dunes needed extra bodies dressed as desert travelers for a wide crowd shot, and six hours of walking back and forth in costume under the sun paid better than it looked, plus a boxed lunch better than expected. Southern Morocco's film industry hires heavily from nearby villages for exactly this kind of work, year-round.|Una producción que buscaba localizaciones en las dunas necesitaba gente extra vestida de viajeros del desierto para un plano de multitud, y seis horas caminando de un lado a otro con vestuario bajo el sol pagaron mejor de lo que parecía.|Une production en repérage dans les dunes avait besoin de figurants habillés en voyageurs du désert pour un plan de foule, et six heures à marcher de long en large en costume sous le soleil ont payé mieux qu'il n'y paraissait.|砂丘でロケハン中の撮影隊が、群衆シーンのため砂漠の旅人に扮するエキストラを求めていた。衣装を着て太陽の下を6時間行ったり来たりするだけの仕事だったが、見た目より実入りが良く、思いのほか立派な弁当までついてきた。モロッコ南部の映画産業は、まさにこうした仕事のために近隣の村から通年で人を雇っている。",
  ),
  ev(
    "lost-hiker-guide", "gain", ["sud"], "🧭", 200,
    "Guiding a lost trekker back to camp|Guiando a un excursionista perdido de vuelta al campamento|Guider un randonneur perdu jusqu'au camp|道に迷ったトレッカーをキャンプまで案内する",
    "A solo hiker had wandered off the marked route as the light started to fade, and knowing the wadi bed well enough to walk them back before dark earned a grateful tip well above what the short walk seemed worth. Marked trails in the pre-Sahara are few, and local knowledge of dry riverbeds and ridgelines matters more than any map out here.|Un excursionista solitario se había desviado de la ruta marcada cuando empezaba a caer la luz, y conocer bien el lecho del uadi para llevarlo de vuelta antes del anochecer le valió una propina agradecida muy por encima de lo que parecía merecer el corto paseo.|Un randonneur solitaire s'était égaré du sentier balisé alors que la lumière commençait à baisser, et bien connaître le lit de l'oued pour le ramener avant la nuit a valu un pourboire reconnaissant bien supérieur à ce que cette courte marche semblait valoir.|一人歩きのトレッカーが日が傾き始めた頃に標識のある道からそれてしまい、暗くなる前にワジ(涸れ川)の川底を熟知した案内で連れ戻すと、その短い道のりにしては破格の謝礼をもらった。サハラ前線に標識のある小径は少なく、この土地では地図よりも涸れ川や尾根筋についての土地勘がものを言う。",
  ),
  ev(
    "sandstorm-camp-loss", "loss", ["sud"], "🌪️", 190,
    "A sandstorm buries the camp's supplies|Una tormenta de arena entierra las provisiones del campamento|Une tempête de sable ensevelit les provisions du camp|砂嵐がキャンプの物資を埋める",
    "The wind rose fast in the early evening, and by the time the tent flaps were finally lashed down, a layer of fine sand had worked its way into everything left uncovered, from the cooking supplies to a box of goods meant for the next day's market run. Sudden windstorms are common enough in the desert that experienced camps weight down every loose item well before dusk out of habit.|El viento se levantó rápido al anochecer, y para cuando por fin se ataron las lonas de las tiendas, una capa de arena fina se había colado en todo lo dejado al descubierto, desde los utensilios de cocina hasta una caja de mercancía para el mercado del día siguiente.|Le vent s'est levé vite en début de soirée, et le temps de bien attacher les pans des tentes, une couche de sable fin s'était infiltrée dans tout ce qui restait à découvert, des ustensiles de cuisine à une caisse de marchandises pour le marché du lendemain.|夕方早くに風が急に強まり、ようやくテントの垂れ幕を縛り終える頃には、覆っていなかったものすべて、調理道具から翌日の市場行きの荷箱まで、細かい砂の層に覆われていた。突発的な砂嵐は砂漠では珍しくなく、経験を積んだキャンプでは習慣として日暮れよりずっと前に、動きそうなものすべてに重しをかけておく。",
  ),

  // ---- est 東部 ----
  ev(
    "citrus-harvest-bonus", "gain", ["est"], "🍊", 210,
    "A bonus for a strong citrus harvest|Una bonificación por una cosecha fuerte de cítricos|Une prime pour une bonne récolte d'agrumes|好調な柑橘の収穫のボーナス",
    "The crates kept coming faster than expected all week, and when the final count came in well above the grower's estimate, everyone who'd picked stayed on the payroll got a small bonus split from the extra sold. The plain here produces enough citrus in a good year that packing houses run extra shifts through the whole picking season.|Las cajas siguieron llegando más rápido de lo esperado toda la semana, y cuando el recuento final superó con creces la estimación del productor, todos los que habían recolectado y seguían en la nómina recibieron una pequeña bonificación repartida de lo vendido de más.|Les caisses ont continué d'arriver plus vite que prévu toute la semaine, et quand le décompte final a largement dépassé l'estimation du producteur, tous ceux qui avaient cueilli et étaient restés sur la liste de paie ont reçu une petite prime tirée du surplus vendu.|一週間ずっと予想より速いペースで木箱が積み上がり、最終的な集計が生産者の見込みを大きく上回ると、収穫を手伝い名簿に残っていた全員に、余分に売れた分から小さなボーナスが分配された。この平野では豊作の年、収穫期のあいだずっと選果場が増員体制で稼働するほどの柑橘が採れる。",
    [10, 11],
  ),
  ev(
    "figuig-road-flat", "loss", ["est"], "🚙", 170,
    "A flat tire on the long road out to the oasis|Un pinchazo en la larga carretera hacia el oasis|Une crevaison sur la longue route vers l'oasis|オアシスへ続く長い道での パンク",
    "The road out toward the oasis runs long and mostly empty, and a sharp stone somewhere along the way put a hole in the spare as well as the original, leaving no choice but to pay well over the going rate to a passing truck driver willing to tow the car the rest of the way. Distances between towns out here are large enough that breaking down without a phone signal is taken seriously.|La carretera hacia el oasis es larga y mayormente vacía, y una piedra afilada en algún punto del camino agujereó tanto la rueda de repuesto como la original, sin más remedio que pagar bien por encima de la tarifa habitual a un camionero de paso.|La route vers l'oasis est longue et surtout déserte, et une pierre coupante quelque part en chemin a percé aussi bien la roue de secours que l'originale, ne laissant d'autre choix que de payer bien au-dessus du tarif habituel un routier de passage.|オアシスへ向かう道は長く、ほとんど人気がない。どこかで鋭い石が予備タイヤまで貫き、通りかかったトラック運転手に相場よりかなり高く払って残りの道のりを牽引してもらうほかなかった。この一帯は町と町の間隔が大きく、電波の届かない場所での故障は軽く見られない。",
  ),
];
