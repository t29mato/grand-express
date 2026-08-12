/**
 * アメリカ合衆国の国情報・地方区分・アイテム・厄災の神・災難・季節。
 *
 * 季節は他の盤面と同じく4月始まりの12ヶ月。国単位の盤面なので、
 * 日本・フランス・インド・韓国・イタリアと同じく「地方まるごとの好不況」で
 * 差をつける。実際の効果(どの地方の収入が何倍になるか)は
 * `src/infrastructure/content/season-and-doom-rules.ts` 側に置く。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const USA_META = {
  id: "usa",
  name: t("United States|Estados Unidos|États-Unis|アメリカ合衆国"),
  blurb: t(
    "A continent-sized country stitched together by a highway grid, a rail network built by rival companies, and forty-eight very different ideas of what \"American\" means|Un país del tamaño de un continente cosido por una red de autopistas, una red ferroviaria construida por compañías rivales, y cuarenta y ocho ideas muy distintas de lo que significa «americano»|Un pays de la taille d'un continent, cousu par une grille d'autoroutes, un réseau ferré bâti par des compagnies rivales, et quarante-huit idées bien différentes de ce que signifie « américain »|大陸ほどの広さを持ち、高速道路網と、競い合う複数の会社が敷いた鉄道網、そして「アメリカらしさ」についての48通りも違う考え方によって縫い合わされた国",
  ),
  // 表示専用の倍率は property-economy.mjs の CURRENCY_MULTIPLIERS が全国ぶんまとめて持つ
  // (世界一周と同じ米ドルなので同じ倍率に揃えてある。理由はREGISTER.md参照)。
  cur: { pre: "$", post: "", mul: 100 },
  start: "newyork",
  // アメリカの伝説・語り話に伝わる4人。鉄道機関士・開拓の種まき・木こり・射撃の名手。
  cpuNames: ["Casey Jones", "Johnny Appleseed", "Paul Bunyan", "Annie Oakley"],
  // 星条旗の赤・白・紺に、ルート66の金と鉄道の鋼灰色を添えた5色。
  stripe: ["#b22234", "#f6efe2", "#3c3b6e", "#f5b31c", "#7f8896"],
};

/** 6地方。区分はアムトラックの地域区分・国勢調査の地方区分をおおむね踏襲。 */
export const USA_REGIONS = {
  ne: t("Northeast — from Maine to the Capital|Noreste — desde Maine hasta la capital|Nord-Est — du Maine à la capitale|北東部(メインから首都まで)"),
  south: t("South — from the Carolinas to Texas|Sur — desde las Carolinas hasta Texas|Sud — des Carolines au Texas|南部(カロライナからテキサスまで)"),
  mw: t("Midwest — the Great Lakes industrial belt|Medio Oeste — el cinturón industrial de los Grandes Lagos|Midwest — la ceinture industrielle des Grands Lacs|中西部(五大湖の工業地帯)"),
  plains: t("Great Plains & Rockies — wheat, cattle and mountain gateways|Grandes Llanuras y Rocosas — trigo, ganado y puertas a las montañas|Grandes Plaines et Rocheuses — blé, bétail et portes des montagnes|大平原・山岳部(小麦と牛、山への玄関口)"),
  sw: t("Southwest — desert, mesa and pueblo country|Suroeste — desierto, mesetas y tierra de pueblos|Sud-Ouest — désert, mesas et pays des pueblos|南西部(砂漠とメサ、プエブロの土地)"),
  pacific: t("Pacific — the West Coast|Pacífico — la costa oeste|Pacifique — la côte ouest|太平洋岸(西海岸)"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は `src/infrastructure/content/item-effect-rules.ts`)。
 */
export const USA_ITEMS = {
  greyhound: {
    e: "🚌",
    price: 240,
    kind: "move",
    n: t("A Greyhound Bus Transfer|Un transbordo en autobús Greyhound|Un transfert en bus Greyhound|グレイハウンドバスの乗り継ぎ券"),
    d: t(
      "Carried 8–12 squares. The driver picks the route.|Te lleva de 8 a 12 casillas. El conductor elige la ruta.|Emporté de 8 à 12 cases. Le chauffeur choisit l'itinéraire.|8〜12マス運ばれる。道順は運転手まかせ。",
    ),
    f: t(
      "Greyhound started in 1914 in Hibbing, Minnesota, hauling iron miners around in a seven-seat car, and its running-dog logo now covers a network of small towns that Amtrak's rails and the airlines never bothered to reach. The company still sells a Discovery Pass allowing unlimited travel for a set number of days, a holdover from an era before anyone assumed everyone owned a car.|Greyhound empezó en 1914 en Hibbing, Minnesota, llevando a mineros del hierro en un coche de siete plazas, y su logo del galgo corriendo cubre hoy una red de pueblos que ni los rieles de Amtrak ni las aerolíneas se molestaron en alcanzar.|Greyhound débuta en 1914 à Hibbing, dans le Minnesota, transportant des mineurs de fer dans une voiture à sept places, et son logo au lévrier couvre aujourd'hui un réseau de petites villes que ni les rails d'Amtrak ni les compagnies aériennes n'ont pris la peine de desservir.|グレイハウンド社は1914年、ミネソタ州ヒビングで鉄鉱山の労働者を7人乗りの車で運ぶ商売として始まった。いまや疾走する犬のロゴを掲げるこの会社の路線網は、アムトラックの線路も航空会社もわざわざ結ぼうとしなかった小さな町々まで覆っている。",
    ),
  },
  roadatlas: {
    e: "🗺️",
    price: 380,
    kind: "pre",
    n: t("The Rand McNally Road Atlas|El atlas de carreteras Rand McNally|L'atlas routier Rand McNally|ランドマクナリー道路地図帳"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Rand McNally, a Chicago print shop since 1856, published its first spiral-bound road atlas in 1924, letting a driver plan a coast-to-coast trip from a single book instead of a glovebox stuffed with state-by-state maps. It still prints a new edition every year, even though most of the cars buying it now also have a screen giving turn-by-turn directions out loud.|Rand McNally, una imprenta de Chicago desde 1856, publicó su primer atlas de carreteras de espiral en 1924, permitiendo planear un viaje de costa a costa desde un solo libro en vez de una guantera llena de mapas estatales.|Rand McNally, imprimerie de Chicago depuis 1856, publia son premier atlas routier à spirale en 1924, permettant de planifier un trajet côte à côte à partir d'un seul livre plutôt que d'une boîte à gants pleine de cartes d'État.|1856年からシカゴで印刷業を営むランドマクナリー社は1924年、リング綴じの道路地図帳を初めて出版し、州ごとの地図で膨れ上がったグローブボックスの代わりに一冊で大陸横断の旅程が組めるようにした。買う車の大半がいまや音声で道案内する画面を備えているにもかかわらず、この地図帳はいまも毎年新版が刷られている。",
    ),
  },
  amtrakcoach: {
    e: "🚋",
    price: 360,
    kind: "pre",
    n: t("Amtrak Coach Ticket|Billete de clase turista de Amtrak|Billet en classe économique Amtrak|アムトラック普通車の切符"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "Amtrak was created by Congress in 1971 as a quasi-public company to take over passenger routes the private railroads had spent a decade trying to abandon as unprofitable, folding dozens of competing lines into one national network overnight. Coach class remains the cheapest way to cross states that the budget airlines don't bother flying between.|Amtrak fue creada por el Congreso en 1971 como una empresa cuasi pública para hacerse cargo de las rutas de pasajeros que los ferrocarriles privados llevaban una década intentando abandonar por no ser rentables.|Amtrak fut créée par le Congrès en 1971 comme entreprise quasi publique pour reprendre les lignes de voyageurs que les compagnies privées cherchaient depuis dix ans à abandonner faute de rentabilité.|アムトラックは1971年、採算が合わないとして民間鉄道会社が10年がかりで手放そうとしていた旅客路線を引き継ぐ準公営会社として、連邦議会によって作られた。何十もの競合路線が一夜にして一つの全国網にまとめられた。普通車は、格安航空会社がわざわざ結ぼうとしない州と州を結ぶいちばん安い手段であり続けている。",
    ),
  },
  acela: {
    e: "🚄",
    price: 640,
    kind: "pre",
    n: t("Acela Express Ticket|Billete del Acela Express|Billet de l'Acela Express|アセラ・エクスプレスの切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "The Acela, launched in 2000, is the closest thing the country has to a true high-speed train, touching 240 km/h on short stretches of the Northeast Corridor between Boston and Washington. Ageing track shared with slower trains and curves laid out more than a century ago keep its average speed well below that of Japan's or France's bullet trains, and a long-planned straighter route still hasn't been built.|El Acela, lanzado en 2000, es lo más parecido a un verdadero tren de alta velocidad que tiene el país, alcanzando 240 km/h en tramos cortos del corredor noreste entre Boston y Washington. Las vías compartidas y las curvas trazadas hace más de un siglo mantienen su velocidad media muy por debajo de la de los trenes bala de Japón o Francia.|L'Acela, lancé en 2000, est ce qui se rapproche le plus d'un vrai train à grande vitesse dans le pays, atteignant 240 km/h sur de courts tronçons du corridor nord-est entre Boston et Washington. Des voies partagées et des courbes tracées il y a plus d'un siècle maintiennent sa vitesse moyenne bien en deçà de celle des trains à grande vitesse japonais ou français.|2000年に登場したアセラは、この国が持つ「本物の高速鉄道」に最も近い存在で、ボストン―ワシントン間の北東回廊の一部区間では時速240kmに達する。だが在来の遅い列車と線路を共有し、1世紀以上前に敷かれたカーブも多いため、平均速度は日本やフランスの新幹線・TGVにはるかに及ばない。まっすぐな専用線を新設する計画は長年語られながら、いまも実現していない。",
    ),
  },
  rabbitfoot: {
    e: "🐇",
    price: 320,
    kind: "passive",
    n: t("A Lucky Rabbit's Foot|Una pata de conejo de la suerte|Un pied de lapin porte-bonheur|幸運のウサギの足"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Carrying a rabbit's foot for luck reached the United States through African American folk traditions rooted in hoodoo practice, which specified it had to be the left hind foot of a rabbit killed in a graveyard, ideally under a full moon, to actually work. The version sold today at gas-station gift racks skips every part of that story except the foot.|La costumbre de llevar una pata de conejo por suerte llegó a Estados Unidos a través de tradiciones populares afroamericanas del hoodoo, que exigían que fuera la pata trasera izquierda de un conejo matado en un cementerio.|La coutume de porter un pied de lapin porte-bonheur est arrivée aux États-Unis via les traditions populaires afro-américaines du hoodoo, qui exigeaient que ce soit la patte arrière gauche d'un lapin tué dans un cimetière.|ウサギの足を幸運のお守りとして持ち歩く風習は、フーズー(呪術的民間信仰)に根ざしたアフリカ系アメリカ人の伝統を通じてアメリカに伝わった。本来は墓地で、できれば満月の夜に殺されたウサギの左後ろ足でなければ効かないとされていたが、いまガソリンスタンドの土産物コーナーで売られている品は、その由来をほとんど省いている。",
    ),
  },
  luckypenny: {
    e: "🪙",
    price: 440,
    kind: "pre",
    n: t("Find a Penny, Pick It Up|Encuentra un centavo, recógelo|Trouve un cent, ramasse-le|落ちていた1セント硬貨を拾う"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "The rhyme \"find a penny, pick it up, all day long you'll have good luck\" has been traced back to at least the 1940s, and the U.S. Mint has stamped out more than 500 billion pennies since 1793. Studies have repeatedly found it now costs the Mint more than one cent to make a single penny, which has not stopped Congress from arguing for over a decade about whether to finally scrap the coin.|La rima «encuentra un centavo, recógelo, y tendrás buena suerte todo el día» se remonta al menos a los años cuarenta, y la Casa de Moneda de EE. UU. ha acuñado más de 500 mil millones de centavos desde 1793.|La comptine « trouve un cent, ramasse-le, et tu auras de la chance toute la journée » remonte au moins aux années 1940, et l'Hôtel des monnaies américain a frappé plus de 500 milliards de cents depuis 1793.|「1セント硬貨を見つけて拾えば、一日じゅう運がいい」という言い習わしは少なくとも1940年代まで遡るとされ、アメリカ造幣局は1793年以来5000億枚を超える1セント硬貨を鋳造してきた。調査のたびに、いまや1セント硬貨を1枚作るのに1セント以上の製造費がかかることが分かっているが、それでも連邦議会はこの硬貨を廃止すべきかどうかを10年以上も議論し続けている。",
    ),
  },
  cribsheet: {
    e: "📝",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("The Crib Sheet|La chuleta|L'antisèche|カンニングペーパー"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommée.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "American students have called a folded, smuggled-in answer sheet a \"crib sheet\" since at least the 19th century, borrowing the word from British boarding schools, where a \"crib\" originally meant a literal, word-for-word translation of a Latin text slipped inside the real assignment. The word survived the shift from Latin homework to standardized tests almost unchanged.|Los estudiantes estadounidenses han llamado «crib sheet» a la hoja de respuestas doblada y colada de contrabando al menos desde el siglo XIX, tomando la palabra de los internados británicos.|Les étudiants américains appellent la feuille de réponses pliée et introduite en fraude une « crib sheet » depuis au moins le XIXe siècle, empruntant le mot aux pensionnats britanniques.|アメリカの生徒たちは少なくとも19世紀から、こっそり持ち込む折りたたんだ答案用紙を「クリブシート」と呼んできた。この語はイギリスの寄宿学校由来で、「クリブ」はもともとラテン語の課題に忍ばせる逐語訳のことを指していた。ラテン語の宿題から標準テストの時代に移っても、この呼び名はほとんど変わらず生き残っている。",
    ),
  },
  lotteryticket: {
    e: "🎫",
    price: 280,
    kind: "pre",
    n: t("A Winning Lottery Ticket|Un billete de lotería premiado|Un billet de loterie gagnant|当たった宝くじ"),
    d: t(
      "Sell it on and take the money.|Véndela y quédate el dinero.|Revends-le et prends l'argent.|売り払って現金にする。",
    ),
    f: t(
      "New Hampshire launched the first modern U.S. state lottery in 1964, nearly a century after almost every state had banned lotteries over corruption scandals. Researchers studying ticket sales have repeatedly found they rise fastest in the poorest zip codes, a pattern that state lottery commissions, which fund everything from schools to road repair with the proceeds, have never managed to advertise away.|New Hampshire lanzó la primera lotería estatal moderna de EE. UU. en 1964, casi un siglo después de que casi todos los estados prohibieran las loterías por escándalos de corrupción.|Le New Hampshire lança la première loterie d'État moderne des États-Unis en 1964, près d'un siècle après que presque tous les États eurent interdit les loteries à cause de scandales de corruption.|ニューハンプシャー州は1964年、現代のアメリカ州営宝くじの第一号を始めた。ほぼ1世紀前、汚職事件をきっかけにほとんどの州で宝くじが禁止されていたのちのことである。宝くじ収益の使い道を調べる研究者たちは、券の売上が最も伸びるのは最も貧しい郵便番号地域であることを繰り返し確認しているが、学校の運営から道路の補修まで収益を充てる州の宝くじ委員会は、その傾向を広告で覆い隠すことができていない。",
    ),
  },
  roadtrip: {
    e: "🚗",
    price: 420,
    kind: "pre",
    n: t("A Spontaneous Road Trip|Un viaje por carretera improvisado|Un road trip improvisé|思い立っての自動車旅行"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "The phrase \"road trip\" only entered everyday American speech after the interstate highway system, signed into law by President Eisenhower in 1956, turned a coast-to-coast drive into something plannable around a two-week vacation instead of an expedition on unpaved roads that could swallow a month. Eisenhower said the idea partly came from a 1919 army convoy he rode across the country, which took 62 days.|La expresión «road trip» solo entró en el habla cotidiana estadounidense después de que el sistema de autopistas interestatales, firmado por el presidente Eisenhower en 1956, convirtiera un viaje de costa a costa en algo planeable en dos semanas de vacaciones.|L'expression « road trip » n'est entrée dans le langage courant américain qu'après que le système d'autoroutes inter-États, signé par le président Eisenhower en 1956, eut transformé un trajet côte à côte en quelque chose de planifiable sur deux semaines de vacances.|「ロードトリップ」という言葉がアメリカの日常語になったのは、1956年にアイゼンハワー大統領が署名した州間高速道路網の整備法で、大陸横断の運転が未舗装路で1か月かかりかねない遠征から、2週間の休暇で計画できるものに変わってからのことだった。アイゼンハワー自身、1919年に62日かけて大陸を横断した陸軍の車列に加わった経験がこの構想の一因だったと語っている。",
    ),
  },
};

/**
 * 厄災の神。第二次大戦の連合軍パイロットのあいだで語られた「グレムリン」
 * (機械にいたずらをする小さな怪物)にした。悪意ではなく、気まぐれな
 * いたずら好きという性格(韓国のトッケビ・イタリアのモナチェッロと同じ
 * 「残酷ではなく、ただ度が過ぎる」造形)で、飛行機だけでなく汽車にも
 * バスにも高速道路にも取り憑く、という体で全地方に広げてある。
 */
export const USA_SPIRIT = {
  e: "🔧",
  n: t("The Gremlin|El Gremlin|Le Gremlin|グレムリン"),
  big: t("The Gremlin's Grand Sabotage|El gran sabotaje del Gremlin|Le grand sabotage du Gremlin|グレムリンの大いたずら"),
  ward: "rabbitfoot",
  arrive: t(
    "<b>🔧 A gremlin has taken an interest in you.</b> Royal Air Force ground crews in the 1920s began blaming unexplained engine trouble on small mischievous creatures that lived in the machinery, a story that spread through the U.S. Army Air Forces during the Second World War and was popularized by a 1943 children's book Walt Disney commissioned but never finished filming. It now rides along with <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🔧 Un gremlin se ha fijado en ti.</b> Las tripulaciones de tierra de la RAF en los años veinte empezaron a culpar de averías inexplicables del motor a pequeñas criaturas traviesas que vivían en la maquinaria, una historia que se difundió por las fuerzas aéreas del ejército de EE. UU. durante la Segunda Guerra Mundial. Ahora viaja junto a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🔧 Un gremlin s'est intéressé à toi.</b> Les équipes au sol de la RAF dans les années 1920 se mirent à blâmer des pannes moteur inexpliquées sur de petites créatures espiègles vivant dans la machinerie, une histoire qui se répandit dans l'armée de l'air américaine pendant la Seconde Guerre mondiale. Il voyage désormais aux côtés de <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🔧 グレムリンに目を付けられた。</b> 1920年代、イギリス空軍の地上整備員たちは原因不明のエンジン故障を、機械の中に住む小さないたずら好きの怪物のせいにし始めた。この話は第二次大戦中アメリカ陸軍航空隊にも広まり、ウォルト・ディズニーが企画しながら映画化までは至らなかった1943年の児童書で世に知られるようになった。いま目的地から最も遠い <b>{0}</b> の傍らに乗り込み、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🔧 <b>The gremlin</b> loses interest and crawls into the luggage of <b>{0}</b>, farthest from {1}.|🔧 <b>El gremlin</b> pierde el interés y se cuela en el equipaje de <b>{0}</b>, el más lejano de {1}.|🔧 <b>Le gremlin</b> se désintéresse et se faufile dans les bagages de <b>{0}</b>, le plus loin de {1}.|🔧 <b>グレムリン</b> は興味を失い、{1} から最も遠い <b>{0}</b> の荷物にもぐり込んだ。",
  ),
  wake: t(
    "<b>{0}</b> has traveled four turns with the gremlin and never once fixed what it broke. It decides the whole route needs a lesson and pulls a wrench out from behind its ear — <b>the Gremlin's Grand Sabotage</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos con el gremlin sin haber arreglado nunca lo que rompió. Decide que toda la ruta necesita una lección y saca una llave inglesa de detrás de la oreja: empieza <b>el gran sabotaje del Gremlin</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> voyage depuis quatre tours avec le gremlin sans jamais avoir réparé ce qu'il a cassé. Il décide que tout l'itinéraire mérite une leçon et sort une clé à molette de derrière son oreille — <b>le grand sabotage du Gremlin</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもグレムリンと旅をしながら、壊されたものを一度も直せずにいた。彼は道中すべてに思い知らせてやろうと耳の後ろからレンチを取り出す。<b>グレムリンの大いたずら</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> the RAF term stuck partly because it rhymed with \"goblin\" and partly because blaming an invisible creature was an easier report to file than admitting a brand-new aircraft type simply had bugs nobody had caught yet.|<b>Tras la historia:</b> el término de la RAF caló en parte porque rimaba con «goblin» y en parte porque culpar a una criatura invisible era un informe más fácil de presentar que admitir que un avión nuevo tenía fallos que nadie había detectado aún.|<b>Derrière l'histoire :</b> le terme de la RAF a pris en partie parce qu'il rimait avec « goblin » (lutin) et en partie parce que blâmer une créature invisible était un rapport plus facile à rédiger que d'admettre qu'un avion tout neuf avait simplement des défauts que personne n'avait encore repérés.|<b>物語の背景:</b> このイギリス空軍発祥の言葉が定着した理由の一つは「ゴブリン」と韻を踏んでいたこと、もう一つは、新型機にまだ誰も気づいていない欠陥があったと認めるより、目に見えない怪物のせいにするほうが報告書を書きやすかったことにある。",
  ),
  pleased: t(
    "It gives its wrench a satisfied little twirl and a coin drops out of a toolbox, rolling to a stop at your feet. <b>{0}</b> gains <span class='money'>+{1}</span>.|Da a su llave inglesa un giro satisfecho y una moneda cae de una caja de herramientas, rodando hasta parar a tus pies. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il fait tourner sa clé à molette d'un air satisfait et une pièce tombe d'une boîte à outils, roulant jusqu'à s'arrêter à tes pieds. <b>{0}</b> gagne <span class='money'>+{1}</span>.|レンチを満足げにくるりと回すと、工具箱から硬貨が一枚こぼれ落ち、足元まで転がってきた。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A rabbit's foot dangles where it can see it, and the gremlin — superstitious in its own small way — slips past <b>{0}</b> without noticing this turn.|Una pata de conejo cuelga donde puede verla, y el gremlin —supersticioso a su manera— pasa de largo junto a <b>{0}</b> sin percatarse esta vuelta.|Un pied de lapin se balance bien en vue, et le gremlin — superstitieux à sa façon — passe devant <b>{0}</b> sans le remarquer ce tour-ci.|ウサギの足がよく見える場所でぶら下がっているのに気づくと、それなりに迷信深いグレムリンは、このターン <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/** 災難7種。グレムリンの機械いたずらな性格に合わせ、慌てるが痛くない話にしてある。 */
export const USA_DOOM = [
  {
    id: "speedingticket",
    n: t("A state trooper's radar catches you speeding|El radar de un policía estatal te pilla a exceso de velocidad|Le radar d'un policier d'État te flashe pour excès de vitesse|州警察のレーダーに速度違反で捕まる"),
    t: t(
      "The stretch of interstate looked as empty as the last fifty miles, right up until the lights came on in the mirror and a trooper who had been clocking traffic from the median strolled up asking, unhurried, whether the driver knew how fast they'd been going. The ticket books of some states are notorious among long-haul truckers, who trade warnings about which counties fund their budgets this way over the CB radio.|El tramo de la interestatal parecía tan vacío como las últimas cincuenta millas, hasta que las luces se encendieron en el retrovisor y un policía que había estado midiendo el tráfico desde la mediana se acercó tranquilamente preguntando si sabía a qué velocidad iba. Las libretas de multas de algunos estados son famosas entre los camioneros de larga distancia.|Le tronçon d'autoroute semblait aussi vide que les cinquante derniers kilomètres, jusqu'à ce que les gyrophares s'allument dans le rétroviseur et qu'un policier posté sur le terre-plein s'approche tranquillement pour demander si le conducteur savait à quelle vitesse il roulait. Les carnets de contraventions de certains États sont réputés parmi les routiers longue distance.|州間高速道路のその区間は、この50マイルとまったく同じようにがら空きに見えていた――バックミラーに赤い光が灯り、中央分離帯から車の流れを計っていた州警察官が、悠然と歩み寄って「ご自分の速度、ご存じでしたか」と尋ねてくるまでは。一部の州の取締簿は長距離トラック運転手のあいだで悪名高く、どの郡が予算をこうして稼いでいるかという情報がCB無線で交換される。",
    ),
  },
  {
    id: "tornado",
    n: t("A tornado warning sends everyone to the basement|Una alerta de tornado manda a todos al sótano|Une alerte tornade envoie tout le monde à la cave|竜巻警報で全員が地下へ避難する"),
    t: t(
      "The sky turned a strange greenish grey in the span of about twenty minutes, and by the time the county siren started its long rising wail, the radio was already reading out which townships to take shelter in immediately. Property gets torn up fast when a funnel cloud actually touches down, and the insurance paperwork afterward takes considerably longer than the storm itself did.|El cielo se volvió de un extraño gris verdoso en unos veinte minutos, y para cuando la sirena del condado empezó su largo aullido ascendente, la radio ya anunciaba qué municipios debían refugiarse de inmediato. Los daños llegan rápido cuando un embudo llega a tocar tierra, y el papeleo del seguro después tarda bastante más que la propia tormenta.|Le ciel prit une étrange teinte gris-vert en une vingtaine de minutes, et le temps que la sirène du comté commence son long hurlement montant, la radio annonçait déjà quelles municipalités devaient se mettre à l'abri immédiatement. Les dégâts vont vite quand un entonnoir touche vraiment le sol, et la paperasse d'assurance qui suit prend nettement plus de temps que la tempête elle-même.|わずか20分ほどのあいだに空は奇妙な緑がかった灰色に変わり、郡のサイレンが長く高まる唸りを上げ始めた頃には、ラジオはすでにどの町がすぐに避難すべきかを読み上げていた。実際に漏斗雲が地面に触れると被害はあっという間に広がり、その後の保険の書類手続きは嵐そのものよりずっと長くかかる。",
    ),
    months: [1, 2],
  },
  {
    id: "governmentshutdown",
    n: t("A government shutdown closes the national park visitor center|Un cierre del gobierno cierra el centro de visitantes del parque nacional|Une fermeture du gouvernement ferme le centre d'accueil du parc national|政府機関の閉鎖で国立公園のビジターセンターが休館になる"),
    t: t(
      "Congress missed the funding deadline again, and a hand-lettered sign taped to the visitor center door announced that federal staff had been furloughed until further notice, leaving the restrooms locked and the rangers who usually answer questions nowhere to be found. Amtrak, run as a federally backed corporation, keeps running through most shutdowns, but plenty of park land quietly becomes a lot less convenient to visit.|El Congreso volvió a fallar en el plazo de financiación, y un cartel escrito a mano pegado en la puerta del centro de visitantes anunciaba que el personal federal estaba suspendido hasta nuevo aviso, dejando los baños cerrados y sin guardaparques a la vista. Amtrak, gestionada como empresa respaldada por el gobierno federal, sigue funcionando durante la mayoría de los cierres.|Le Congrès a de nouveau raté la date limite de financement, et une pancarte manuscrite scotchée sur la porte du centre d'accueil annonçait que le personnel fédéral était mis en congé sans solde jusqu'à nouvel ordre, laissant les toilettes fermées et aucun garde forestier en vue. Amtrak, société soutenue par l'État fédéral, continue de fonctionner pendant la plupart des fermetures.|連邦議会がまたも予算の期限を守れず、ビジターセンターのドアに手書きの貼り紙が貼られ、連邦職員は追って通知があるまで一時帰休になったと告げていた。トイレは施錠され、いつも質問に答えてくれるレンジャーの姿もどこにもない。連邦政府が支援する法人として運営されるアムトラックは、たいていの政府閉鎖のあいだも動き続けるが、国立公園の土地の多くは静かに、訪れるのがずっと不便になる。",
    ),
  },
  {
    id: "wildfire",
    n: t("A wildfire forces an evacuation|Un incendio forestal obliga a evacuar|Un feu de forêt force une évacuation|山火事で避難を強いられる"),
    t: t(
      "Dry lightning had struck the ridgeline three days earlier with no rain behind it, and what started as a thin smudge of smoke on the horizon grew fast enough overnight that the county issued a mandatory evacuation order before most residents had finished their coffee. Decades of suppressing every small fire, instead of letting some burn the way the land once did on its own, left a lot more fuel piled up on the forest floor than there used to be.|Un rayo seco había alcanzado la cresta tres días antes sin lluvia detrás, y lo que empezó como una fina mancha de humo en el horizonte creció tan rápido durante la noche que el condado emitió una orden de evacuación obligatoria antes de que la mayoría hubiera terminado el café. Décadas suprimiendo cada pequeño incendio dejaron mucho más combustible acumulado en el suelo del bosque.|La foudre sèche avait frappé la crête trois jours plus tôt sans pluie derrière elle, et ce qui commença comme une fine traînée de fumée à l'horizon grossit assez vite pendant la nuit pour que le comté émette un ordre d'évacuation obligatoire avant que la plupart des habitants n'aient fini leur café. Des décennies à supprimer chaque petit feu ont laissé bien plus de combustible accumulé au sol de la forêt.|3日前、雨を伴わない乾いた雷が尾根に落ちていた。地平線にうっすら見えていた煙の筋は一晩のうちに急速に広がり、多くの住民がまだコーヒーを飲み終える前に郡は強制避難命令を出した。かつて自然に任せて小さな火事を燃えさせていたのを何十年もすべて消し止め続けてきたせいで、森の地面にはかつてよりずっと多くの燃料が積み重なっている。",
    ),
    months: [3, 4],
  },
  {
    id: "pickuptab",
    n: t("Everyone at the table expects you to pick up the tab|Todos en la mesa esperan que pagues la cuenta|Toute la table s'attend à ce que tu paies l'addition|テーブル全員分の勘定を持たされる"),
    t: t(
      "The check landed face-down in the middle of a table nobody had discussed splitting evenly, and the pause that followed made it clear everyone assumed today's round was the tradition, not a one-time favor. American service work runs almost entirely on tips left on top of the bill, and the unwritten math of who owes what after a group meal has started more quiet arguments than the actual food.|La cuenta cayó bocabajo en medio de una mesa donde nadie había hablado de repartir a partes iguales, y la pausa que siguió dejó claro que todos daban por hecho que hoy invitabas tú, no que era un favor puntual. El servicio estadounidense funciona casi enteramente con propinas añadidas a la cuenta.|L'addition atterrit face contre table au milieu d'une tablée où personne n'avait parlé de partager équitablement, et le silence qui suivit montra clairement que tout le monde tenait pour acquis que c'était la tournée d'aujourd'hui, pas une faveur ponctuelle. Le service américain repose presque entièrement sur les pourboires ajoutés à l'addition.|会計伝票が誰も割り勘の相談などしていないテーブルの真ん中に裏返しで置かれ、その後の間がすべてを物語っていた――今日のこの一回が慣例だと、全員がすでに思い込んでいたのである。アメリカの接客業はほぼ全面的に伝票の上に上乗せするチップで成り立っており、大人数の食事のあと誰がいくら払うべきかという不文律の計算は、料理そのものより多くの静かな言い争いを生んできた。",
    ),
  },
  {
    id: "wrongexit",
    n: t("Taking the wrong highway exit|Tomando la salida equivocada de la autopista|Prendre la mauvaise sortie d'autoroute|高速道路の出口を間違える"),
    t: t(
      "Two exits sat barely half a mile apart with names close enough to blur together at highway speed, and only after several miles of increasingly unfamiliar scenery did the road signs make it clear this was an entirely different route than the one the map had promised. Turning around usually costs more than the missed exit itself, since most American interstates make a driver drive to the next exit before they can even attempt to fix the mistake.|Dos salidas estaban a apenas un kilómetro de distancia con nombres lo bastante parecidos para confundirse a la velocidad de la autopista, y solo tras varios kilómetros de paisaje cada vez más desconocido quedó claro que esta era una ruta totalmente distinta. Dar la vuelta suele costar más que la propia salida perdida.|Deux sorties se trouvaient à peine à un kilomètre l'une de l'autre, avec des noms assez proches pour se confondre à la vitesse de l'autoroute, et ce n'est qu'après plusieurs kilomètres de paysage de plus en plus inconnu que les panneaux ont révélé qu'il s'agissait d'un tout autre itinéraire. Faire demi-tour coûte généralement plus cher que la sortie manquée elle-même.|わずか1キロ足らずしか離れていない二つの出口は、高速道路の速度で読むには紛らわしいほど似た名前を持っていた。見慣れない景色が何マイルも続いたあとになってようやく、地図が約束していたのとはまったく違う道に入ってしまったことが標識でわかった。アメリカの多くの州間高速道路は次の出口まで走らないと引き返す手段すらないため、方向転換のほうが乗り過ごした出口そのものより高くつくことが多い。",
    ),
  },
  {
    id: "threecardmonte",
    n: t("A three-card monte hustler on the corner|Un timador de las tres cartas en la esquina|Un arnaqueur du bonneteau au coin de la rue|街角の三枚カードの詐欺師"),
    t: t(
      "The dealer's hands moved fast enough over three folded cards on a cardboard box that the winning card seemed obvious right up until it wasn't, and the small crowd cheering every correct guess turned out, too late, to be working with him the whole time. City police have chased the same con up and down the same few blocks for generations, and it survives less on any real trick of the hand than on the mark's confidence that they, unlike everyone else, are too sharp to fall for it.|Las manos del repartidor se movían tan rápido sobre tres cartas dobladas en una caja de cartón que la carta ganadora parecía obvia, hasta que dejaba de serlo, y la pequeña multitud que aplaudía cada acierto resultó, demasiado tarde, estar compinchada con él todo el tiempo. La policía de la ciudad ha perseguido el mismo timo por las mismas cuadras durante generaciones.|Les mains du bonimenteur bougeaient assez vite sur trois cartes pliées posées sur une caisse en carton pour que la carte gagnante semble évidente — jusqu'à ce qu'elle ne le soit plus — et la petite foule qui applaudissait chaque bonne réponse s'avéra, trop tard, être de mèche avec lui depuis le début. La police municipale traque la même arnaque dans les mêmes rues depuis des générations.|段ボール箱の上で折り曲げた3枚のカードを操る手さばきはあまりに速く、どのカードが当たりかは一目瞭然に見えた――当たらなくなるまでは。正解するたびに歓声を上げていた小さな人だかりは、実はずっとグルだったと気づいたときにはもう遅かった。市の警察は何世代にもわたって同じ数区画で同じ詐欺を追いかけ続けているが、この手口が生き延びているのは手先の技よりも、「自分だけは引っかからないほど賢い」というカモ自身の思い込みのおかげである。",
    ),
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、日本・フランス・インド・
 * 韓国・イタリアと同じく地方まるごとの好不況で差をつける(効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の usa の項)。
 */
export const USA_SEASONS = [
  {
    e: "⚾",
    n: t("Opening Day|El Día Inaugural|Le jour d'ouverture|オープニングデー"),
    t: t(
      "Major League Baseball's Opening Day sends fans to ballparks across the country on the same week, a ritual old enough that some cities still let schoolchildren skip class for it unofficially, while the national parks post their first ranger-led programs of the year now that mountain roads are finally clear of snow.|El Día Inaugural de las Grandes Ligas lleva a los aficionados a los estadios de todo el país la misma semana, un ritual tan antiguo que en algunas ciudades todavía se deja a los escolares faltar a clase extraoficialmente por él.|Le jour d'ouverture de la Ligue majeure de baseball attire les fans dans les stades du pays la même semaine, un rituel assez ancien pour que certaines villes laissent encore officieusement les écoliers sécher les cours pour l'occasion.|メジャーリーグベースボールのオープニングデーは、全国のスタジアムに同じ週にファンを呼び込む儀式で、いくつかの町ではいまも非公式に子どもが学校を休んでいいとされるほど古い習わしである。山道の雪もようやく解け、国立公園ではその年最初のレンジャー同行プログラムが始まる。",
    ),
    f: t(
      "Cincinnati has hosted the very first game of the season nearly every year since the 1870s, a tradition tied to the city fielding the first fully professional baseball team in 1869.|Cincinnati ha acogido casi todos los años desde la década de 1870 el primer partido de la temporada, una tradición ligada a que la ciudad presentó el primer equipo de béisbol totalmente profesional en 1869.|Cincinnati accueille presque chaque année depuis les années 1870 le tout premier match de la saison, une tradition liée au fait que la ville aligna la première équipe entièrement professionnelle de baseball en 1869.|シンシナティは1870年代以来ほぼ毎年、シーズン最初の試合を開催してきた。1869年に完全プロ野球チームとして最初のチームを作った町であることに由来する伝統である。",
    ),
  },
  {
    e: "🐎",
    n: t("The Kentucky Derby and Memorial Day traffic|El Derbi de Kentucky y el tráfico del Día de los Caídos|Le Derby du Kentucky et les embouteillages du Memorial Day|ケンタッキーダービーとメモリアルデーの渋滞"),
    t: t(
      "The Kentucky Derby, run on the first Saturday of May, packs Churchill Downs for barely two minutes of racing after a full day of mint juleps and enormous hats, while Memorial Day at month's end unofficially opens the summer road-trip season and sends interstate traffic climbing for the first long weekend of the year.|El Derbi de Kentucky, corrido el primer sábado de mayo, llena Churchill Downs para apenas dos minutos de carrera tras un día entero de mint juleps y sombreros enormes.|Le Derby du Kentucky, couru le premier samedi de mai, remplit Churchill Downs pour à peine deux minutes de course après une journée entière de mint juleps et de chapeaux immenses.|5月最初の土曜日に行われるケンタッキーダービーは、ミントジュレップと巨大な帽子で彩られる丸一日のあと、わずか2分ほどのレースのためにチャーチルダウンズを満員にする。月末のメモリアルデーは事実上、夏のロードトリップ・シーズンの幕開けとされ、その年最初の連休で州間高速道路の交通量が急に増える。",
    ),
    f: t(
      "The Derby's tradition of enormous, elaborately decorated hats has no official rule behind it at all; it grew simply because the event has always drawn society photographers, and nobody wanted to be the plain hat in the picture.|La tradición de los enormes sombreros del Derbi no tiene ninguna regla oficial detrás; surgió simplemente porque el evento siempre atrajo a fotógrafos de sociedad y nadie quería ser el sombrero sencillo en la foto.|La tradition des immenses chapeaux du Derby ne repose sur aucune règle officielle ; elle est née simplement parce que l'événement a toujours attiré les photographes mondains, et personne ne voulait être le chapeau tout simple sur la photo.|ダービーの巨大で凝った帽子の伝統には、実は公式な決まりは一切ない。この催しには昔から社交欄の写真家が集まっていたため、誰も写真の中で地味な帽子になりたくなかったというだけで自然に生まれた習わしである。",
    ),
  },
  {
    e: "🛣️",
    n: t("School lets out and the road trips begin|Las clases terminan y empiezan los viajes por carretera|L'école se termine et les road trips commencent|学校が休みになり、ロードトリップが始まる"),
    t: t(
      "Public schools across most of the country let out for summer this month, and station wagons and minivans alike fill the interstates as families head for national parks, beach towns and grandparents' houses, while diners along old Route 66 report their busiest stretch of the year from travelers chasing the nostalgia of the original road.|Las escuelas públicas de la mayor parte del país terminan el curso este mes, y las interestatales se llenan de familias rumbo a parques nacionales, pueblos de playa y casas de los abuelos.|Les écoles publiques de la plupart du pays terminent l'année ce mois-ci, et les autoroutes se remplissent de familles en route vers les parcs nationaux, les villes balnéaires et la maison des grands-parents.|全国の公立学校の大半が今月に夏休みに入り、家族連れを乗せたステーションワゴンやミニバンが国立公園やビーチの町、祖父母の家を目指して州間高速道路を埋め尽くす。旧ルート66沿いのダイナーは、往時の道への郷愁を追う旅行者でその年いちばんの繁忙期を迎える。",
    ),
    f: t(
      "Route 66 was officially decommissioned as a numbered highway in 1985, replaced piece by piece by interstates, yet stretches of the original road still draw enough nostalgia tourism, much of it from overseas, to keep dozens of small-town diners and motels in business.|La Ruta 66 fue oficialmente retirada como autopista numerada en 1985, sustituida poco a poco por interestatales, pero tramos de la carretera original aún atraen suficiente turismo nostálgico, en buena parte extranjero, para mantener abiertos decenas de restaurantes y moteles de pueblo.|La Route 66 fut officiellement déclassée comme autoroute numérotée en 1985, remplacée petit à petit par les autoroutes inter-États, mais des tronçons de la route d'origine attirent encore assez de tourisme nostalgique, en bonne partie étranger, pour maintenir en activité des dizaines de restaurants et motels de petites villes.|ルート66は1985年、番号付き幹線道路としては正式に廃止され、州間高速道路に少しずつ置き換えられたが、旧道の区間はいまも、その多くが海外からの郷愁観光客を惹きつけ続けており、何十軒もの町のダイナーやモーテルを商売として成り立たせている。",
    ),
  },
  {
    e: "🎆",
    n: t("Fireworks for the Fourth of July|Fuegos artificiales por el Cuatro de Julio|Feux d'artifice pour le 4 juillet|独立記念日の花火"),
    t: t(
      "Independence Day fireworks light up small-town skies and big-city skylines alike on the fourth, and the gremlin, like most of the workforce, takes the week off around it rather than pass up a barbecue.|Los fuegos artificiales del Día de la Independencia iluminan tanto cielos de pueblo como perfiles de gran ciudad el día cuatro, y el gremlin, como la mayoría de la fuerza laboral, se toma la semana libre en torno a esa fecha antes que perderse una barbacoa.|Les feux d'artifice du jour de l'Indépendance illuminent aussi bien le ciel des petites villes que la ligne d'horizon des grandes métropoles le quatre, et le gremlin, comme la majorité des travailleurs, prend sa semaine autour de cette date plutôt que de rater un barbecue.|独立記念日の花火は、7月4日に小さな町の空も大都市のスカイラインも同じように照らす。グレムリンも、たいていの働き手と同じくバーベキューを逃したくないので、この前後の週は休みをとる。",
    ),
    f: t(
      "The Fourth of July marks the date the Continental Congress adopted the Declaration of Independence in 1776, though most delegates actually signed the parchment copy over the following weeks and months, not on the fourth itself.|El Cuatro de Julio marca la fecha en que el Congreso Continental adoptó la Declaración de Independencia en 1776, aunque la mayoría de los delegados en realidad firmaron la copia en pergamino en las semanas y meses siguientes, no el propio día cuatro.|Le 4 juillet marque la date à laquelle le Congrès continental adopta la déclaration d'Indépendance en 1776, bien que la plupart des délégués aient en réalité signé la copie sur parchemin dans les semaines et mois suivants, pas le 4 lui-même.|独立記念日は1776年に大陸会議が独立宣言を採択した日にあたるが、実際に代議員の大半が羊皮紙の正式な写しに署名したのは、その後の数週間から数か月にわたってのことで、7月4日そのものではない。",
    ),
  },
  {
    e: "🎡",
    n: t("State fair season|La temporada de las ferias estatales|La saison des foires d'État|州フェアの季節"),
    t: t(
      "State fairs open across the country this month with livestock competitions, deep-fried food on a stick, and butter sculptures that draw crowds as reliably as the midway rides, while a summer heat dome settles over much of the interior and keeps afternoon streets emptier than usual.|Las ferias estatales abren en todo el país este mes con concursos de ganado, comida frita en palo y esculturas de mantequilla que atraen multitudes tan fielmente como las atracciones.|Les foires d'État ouvrent partout dans le pays ce mois-ci avec des concours de bétail, de la nourriture frite sur bâtonnet et des sculptures de beurre qui attirent les foules aussi sûrement que les manèges.|州フェアが今月、全国各地で開かれ、家畜品評会や串に刺した揚げ物、遊園地の乗り物と同じくらい確実に客を集めるバターの彫刻が並ぶ。夏の熱波ドームが内陸の広い範囲を覆い、午後の通りはいつもより人けが少なくなる。",
    ),
    f: t(
      "The tradition of carving a life-size cow out of butter began at the Ohio State Fair in 1903 and has since spread to several other states, with the sculptures kept in a refrigerated case at close to freezing to survive the run of the fair.|La tradición de esculpir una vaca a tamaño real en mantequilla comenzó en la Feria Estatal de Ohio en 1903 y desde entonces se ha extendido a varios otros estados.|La tradition de sculpter une vache grandeur nature dans du beurre a débuté à la foire de l'État de l'Ohio en 1903 et s'est depuis répandue dans plusieurs autres États.|等身大の牛をバターで彫る伝統は1903年、オハイオ州フェアで始まり、その後いくつかの州に広がった。彫刻はフェアの会期中もつよう、氷点に近い冷蔵ケースに収められている。",
    ),
  },
  {
    e: "🍂",
    n: t("Leaf-peeping season begins|Comienza la temporada de observar el follaje|La saison de l'observation des feuillages commence|紅葉狩りシーズンの始まり"),
    t: t(
      "New England's maples turn early this month, and \"leaf peepers\" fill small-town inns along back roads specifically mapped for the drive, while Labor Day at the start of the month sends one last wave of summer travelers home and unofficially reopens the school year.|Los arces de Nueva Inglaterra cambian de color pronto este mes, y los «leaf peepers» llenan las posadas de los pueblos junto a carreteras secundarias trazadas justamente para ese recorrido.|Les érables de Nouvelle-Angleterre changent de couleur tôt ce mois-ci, et les « leaf peepers » remplissent les auberges des petites villes le long de routes secondaires spécialement cartographiées pour cette balade.|ニューイングランドのカエデは今月早くも色づき始め、その眺めのために地図まで作られた裏道沿いの小さな宿は「リーフ・ピーパー(紅葉狩り客)」で埋まる。月初めの労働者の日(レイバーデー)は夏の旅行者最後の波を家路につかせ、事実上の新学期の始まりでもある。",
    ),
    f: t(
      "Vermont's tourism board publishes a weekly \"foliage report\" tracking peak color county by county, a forecast some innkeepers watch more closely each September than the weather itself.|La oficina de turismo de Vermont publica un «informe de follaje» semanal que sigue el pico de color condado por condado, un pronóstico que algunos posaderos vigilan cada septiembre más de cerca que el propio clima.|L'office du tourisme du Vermont publie chaque semaine un « rapport de feuillage » suivant le pic de couleur comté par comté, une prévision que certains aubergistes surveillent chaque septembre de plus près que la météo elle-même.|バーモント州の観光局は郡ごとの紅葉の見頃を追う「フォリッジ・レポート」を毎週発表しており、9月になると天気予報よりこちらを熱心に見る宿の主人もいる。",
    ),
  },
  {
    e: "⚾",
    n: t("The World Series|La Serie Mundial|Les World Series|ワールドシリーズ"),
    t: t(
      "Baseball's championship, oddly named the World Series for a game played almost entirely within one country, closes out the season this month, and the crisp weather that settles in makes it the last comfortable stretch before winter for most of the interior.|El campeonato de béisbol, curiosamente llamado Serie Mundial para un juego que se disputa casi enteramente dentro de un solo país, cierra la temporada este mes, y el clima fresco que se instala hace de este el último tramo agradable antes del invierno.|Le championnat de baseball, curieusement appelé « World Series » pour un jeu disputé presque entièrement dans un seul pays, clôt la saison ce mois-ci, et le temps frais qui s'installe en fait la dernière période agréable avant l'hiver.|「ワールドシリーズ」というほぼ一国内だけで争われる大会にしては妙な名の野球の頂点決定戦が、今月シーズンを締めくくる。冷え込んでくる爽やかな気候は、内陸部の多くにとって冬の前に最後に訪れる過ごしやすい時期となる。",
    ),
    f: t(
      "The name \"World Series\" is generally believed to come not from any claim of global reach but from an early sponsor, the New York World newspaper, or simply from ballpark shorthand for \"the championship of the base ball world\" as American baseball called itself at the time.|Se cree generalmente que el nombre «World Series» no viene de ninguna pretensión de alcance mundial, sino de un patrocinador temprano, el periódico New York World, o simplemente de la abreviatura «campeonato del mundo del béisbol» que el béisbol estadounidense se atribuía entonces.|On pense généralement que le nom « World Series » ne vient d'aucune prétention à une portée mondiale, mais d'un des premiers sponsors, le journal New York World, ou simplement du raccourci désignant le « championnat du monde du baseball » que le baseball américain s'attribuait alors.|「ワールドシリーズ」という名は、世界的な規模を謳ったものではなく、初期のスポンサーだった新聞『ニューヨーク・ワールド』に由来する、あるいは当時のアメリカ野球界が自称していた「野球界の世界選手権」の略にすぎない、というのが定説である。",
    ),
  },
  {
    e: "🦃",
    n: t("The busiest travel day of the year|El día de viaje más ocupado del año|Le jour de voyage le plus chargé de l'année|一年で最も混雑する旅行日"),
    t: t(
      "The Wednesday before Thanksgiving is consistently the single busiest travel day in the country, as tens of millions head home for a meal built around a turkey and a holiday whose harvest-feast origin story is far messier than the schoolroom version usually let on.|El miércoles antes de Acción de Gracias es sistemáticamente el día de viaje más ocupado del país, cuando decenas de millones vuelven a casa para una comida centrada en el pavo.|Le mercredi précédant Thanksgiving est systématiquement le jour de voyage le plus chargé du pays, tandis que des dizaines de millions de personnes rentrent chez elles pour un repas centré sur la dinde.|感謝祭前の水曜日は、この国で例年もっとも旅行が混み合う一日となる。数千万人が七面鳥を囲む食事のために帰省するが、この収穫祭の由来は、学校で教わる話よりもずっと込み入っている。",
    ),
    f: t(
      "The familiar story of a single 1621 harvest feast shared peacefully between Pilgrims and the Wampanoag has been simplified from a far more complicated and often violent history of contact, and Thanksgiving was not fixed as a national holiday on a set date until 1863, during the Civil War.|La conocida historia de un único banquete de la cosecha en 1621 compartido pacíficamente entre los peregrinos y los wampanoag simplifica una historia de contacto mucho más complicada y a menudo violenta.|La célèbre histoire d'un unique festin de la moisson en 1621 partagé paisiblement entre les pèlerins et les Wampanoag simplifie une histoire de contact bien plus compliquée et souvent violente.|1621年の収穫祭でピルグリムとワンパノアグ族が平和に食事を分かち合ったという馴染み深い話は、実際にはもっと込み入った、しばしば暴力を伴う接触の歴史を単純化したものである。感謝祭が決まった日付の国民の祝日として定められたのは、南北戦争のさなかの1863年になってからだった。",
    ),
  },
  {
    e: "🎄",
    n: t("Holiday travel and Christmas markets|Viajes navideños y mercados de Navidad|Voyages des fêtes et marchés de Noël|ホリデーシーズンの旅行とクリスマス市"),
    t: t(
      "Airports and interstates fill up again in the final stretch before Christmas as families make the trip a second time this season, while German-style Christmas markets, a relatively recent import to many American cities, string up lights over hot cocoa stands and ice rinks downtown.|Los aeropuertos y las interestatales se llenan de nuevo en el último tramo antes de Navidad, mientras que los mercados navideños de estilo alemán, una importación relativamente reciente en muchas ciudades estadounidenses, cuelgan luces sobre puestos de chocolate caliente y pistas de hielo.|Les aéroports et les autoroutes se remplissent à nouveau dans la dernière ligne droite avant Noël, tandis que les marchés de Noël de style allemand, importation relativement récente dans de nombreuses villes américaines, tendent des guirlandes lumineuses au-dessus des stands de chocolat chaud et des patinoires.|クリスマス直前の最終盤、空港も州間高速道路もこの季節二度目の帰省ラッシュで再び混み合う。多くのアメリカの都市にとって比較的最近の輸入品であるドイツ風のクリスマス市は、ホットチョコレートの屋台とダウンタウンのスケートリンクの上にイルミネーションを張り巡らせる。",
    ),
    f: t(
      "German-American immigrant communities held small Christmas markets in the 19th century, but the large-scale, festival-style Christkindlmarkt now common in major U.S. cities is mostly a late-20th-century revival, borrowed directly from contemporary German cities rather than continuously handed down.|Las comunidades de inmigrantes germano-americanas celebraban pequeños mercados navideños en el siglo XIX, pero el gran mercado festivo Christkindlmarkt ahora habitual en las grandes ciudades estadounidenses es sobre todo un renacer de finales del siglo XX.|Les communautés d'immigrants germano-américaines tenaient de petits marchés de Noël au XIXe siècle, mais le grand Christkindlmarkt aujourd'hui courant dans les grandes villes américaines est surtout un renouveau de la fin du XXe siècle.|ドイツ系移民のコミュニティは19世紀にも小さなクリスマス市を開いていたが、いま主要都市で見られる大規模な祭り仕立てのクリストキントルマルクトは、途切れず受け継がれてきたものというより、20世紀後半に現代ドイツの都市から直接取り入れられた復興にすぎない。",
    ),
  },
  {
    e: "🏈",
    n: t("New Year's Day bowl games|Los partidos de bowl del Año Nuevo|Les matchs de bowl du jour de l'An|元日のボウルゲーム"),
    t: t(
      "College football bowl games fill television screens on New Year's Day, most fought out in cities warm enough in winter to guarantee good weather for a parade the morning before, and the gremlin, briefly generous for the new year, hands travelers a spare part just when they need it.|Los partidos de bowl del fútbol universitario llenan las pantallas de televisión el día de Año Nuevo, la mayoría disputados en ciudades lo bastante cálidas en invierno para garantizar buen tiempo para un desfile esa misma mañana.|Les matchs de bowl du football universitaire remplissent les écrans de télévision le jour de l'An, la plupart disputés dans des villes assez chaudes en hiver pour garantir du beau temps à un défilé le matin même.|大学アメリカンフットボールのボウルゲームが元日のテレビ画面を埋め尽くす。ほとんどは冬でも暖かく、その朝のパレードに好天が約束される都市で争われる。グレムリンも新年だけは気前がよく、旅人にちょうど必要な部品をこっそり手渡してくれる。",
    ),
    f: t(
      "The Rose Bowl, first played in 1902 and continuously since 1916, is the oldest of the bowl games and is still nicknamed \"the Grandaddy of Them All\" by broadcasters, even though dozens of newer bowls now outnumber it every season.|El Rose Bowl, jugado por primera vez en 1902 y de forma continua desde 1916, es el más antiguo de los bowls y los locutores aún lo apodan «el abuelo de todos», aunque hoy decenas de bowls más nuevos lo superan en número cada temporada.|Le Rose Bowl, disputé pour la première fois en 1902 puis en continu depuis 1916, est le plus ancien des bowls et les commentateurs le surnomment encore « le grand-père de tous », même si des dizaines de bowls plus récents le dépassent désormais en nombre chaque saison.|1902年に初めて開催され、1916年以降は毎年続くローズボウルはボウルゲームの中で最も古く、いまも実況では「みんなの大先輩」と呼ばれているが、いまではそれよりずっと新しいボウルが毎シーズン何十試合も行われている。",
    ),
  },
  {
    e: "🐿️",
    n: t("Groundhog Day and the Super Bowl|El Día de la Marmota y el Super Bowl|Le jour de la marmotte et le Super Bowl|グラウンドホッグ・デーとスーパーボウル"),
    t: t(
      "A groundhog named Punxsutawney Phil is pulled from a fake tree stump on February 2nd to predict, by whether he sees his shadow, six more weeks of winter or an early spring, while the Super Bowl a few days earlier or later empties bars and living rooms alike into a single shared broadcast watched by tens of millions.|Una marmota llamada Punxsutawney Phil es sacada de un tocón falso el 2 de febrero para predecir, según vea o no su sombra, seis semanas más de invierno o una primavera temprana.|Une marmotte nommée Punxsutawney Phil est extraite d'une fausse souche le 2 février pour prédire, selon qu'elle voit ou non son ombre, six semaines d'hiver supplémentaires ou un printemps précoce.|2月2日、パンクサトーニー・フィルという名のグラウンドホッグが偽の切り株から引き出され、影を見るかどうかで冬があと6週間続くか、早い春になるかを占う。その数日前後にはスーパーボウルが行われ、バーもリビングルームも一斉に同じ放送に釘付けになり、数千万人が視聴する。",
    ),
    f: t(
      "Punxsutawney Phil's forecasts, tracked since 1887, have been checked against actual weather records and found to be right only a little better than chance, which the town's official groundhog club insists has never once been Phil's own fault.|Las predicciones de Punxsutawney Phil, registradas desde 1887, se han contrastado con los datos meteorológicos reales y solo aciertan un poco mejor que el azar, algo que el club oficial de la marmota del pueblo insiste en que nunca ha sido culpa de Phil.|Les prédictions de Punxsutawney Phil, suivies depuis 1887, ont été comparées aux relevés météorologiques réels et ne se révèlent justes qu'à peine mieux que le hasard, ce dont le club officiel de la marmotte de la ville jure que ce n'est jamais la faute de Phil.|1887年から記録されているパンクサトーニー・フィルの予想は、実際の気象記録と照合すると偶然よりわずかに勝る程度の的中率しかないが、町の公式グラウンドホッグ・クラブは、それは一度たりともフィルのせいではないと言い張っている。",
    ),
  },
  {
    e: "🌸",
    n: t("Cherry blossoms and spring training|Los cerezos en flor y los entrenamientos de primavera|Les cerisiers en fleurs et l'entraînement de printemps|桜の開花とスプリングトレーニング"),
    t: t(
      "Washington D.C.'s cherry trees, a 1912 gift from Japan, reach peak bloom around this time in a window narrow and weather-dependent enough that the whole festival is planned around a forecast rather than a fixed date, while baseball teams wind down spring training in Florida and Arizona ahead of Opening Day.|Los cerezos de Washington D.C., un regalo de Japón de 1912, alcanzan su máxima floración por estas fechas en una ventana tan estrecha y dependiente del clima que todo el festival se planea según el pronóstico.|Les cerisiers de Washington, cadeau du Japon de 1912, atteignent leur pleine floraison vers cette période, dans une fenêtre si étroite et dépendante de la météo que tout le festival est planifié autour d'une prévision plutôt que d'une date fixe.|1912年に日本から贈られたワシントンD.C.の桜は、この時期に満開を迎える。その時期はあまりに狭く天候に左右されるため、祭りの日程は固定の日付ではなく開花予報をもとに組まれる。野球チームはフロリダとアリゾナでのスプリングトレーニングを終え、オープニングデーに備える。",
    ),
    f: t(
      "The original 1912 shipment of cherry trees from Tokyo had to be burned on arrival in Washington after inspectors found it infested with insects and disease, and it took a second, carefully quarantined shipment two years later to actually plant the trees that stand today.|El envío original de cerezos de Tokio en 1912 tuvo que quemarse al llegar a Washington después de que los inspectores lo encontraran infestado de insectos y enfermedades, y se necesitó un segundo envío, cuidadosamente puesto en cuarentena dos años después.|Le premier envoi de cerisiers de Tokyo en 1912 dut être brûlé à son arrivée à Washington après que les inspecteurs l'eurent trouvé infesté d'insectes et de maladies, et il fallut un second envoi, soigneusement mis en quarantaine deux ans plus tard.|1912年に東京から最初に送られた桜の苗木は、検疫官が害虫と病気に冒されているのを見つけたため、ワシントン到着後に焼却処分せざるを得なかった。今日立っている木々は、2年後に慎重に検疫を経て送られた二度目の苗木によるものである。",
    ),
  },
];
