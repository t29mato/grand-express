/**
 * オーストラリアの国情報・地方区分。
 *
 * アイテム・厄災の神・季節は5都市のレビューのあとに書く(先に方向を
 * 確かめるため)。ここでは都市配置に要る META と REGIONS だけを先に固める。
 */

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

export const AUSTRALIA_META = {
  id: "australia",
  name: t("Australia|Australia|Australie|オーストラリア"),
  blurb: t(
    "An island the size of a continent, where trains cross deserts wider than most countries and the world's oldest living culture still reads the land|Una isla del tamaño de un continente, donde los trenes cruzan desiertos más anchos que muchos países y la cultura viva más antigua del mundo todavía lee la tierra|Une île grande comme un continent, où les trains traversent des déserts plus larges que bien des pays, et où la plus ancienne culture vivante au monde continue de lire la terre|大陸ほどの大きさの島国。列車はたいていの国より広い砂漠を渡り、世界最古の生きた文化がいまも大地を読み続けている",
  ),
  // 表示専用の倍率は property-economy.mjs が全国ぶんまとめて持つ
  // (他の書き起こし国と同じ理由。ここは暫定値100のまま)。
  cur: { pre: "A$", post: "", mul: 100 },
  start: "sydney",
  cpuNames: ["Kookaburra", "Dingo", "Bilby", "Wombat"],
  // 国旗の紺 / 赤い大地のオーカー / ユーカリの緑 / ゴールデン・ワトルの黄 / 砂の白。
  stripe: ["#00247d", "#b5451b", "#4e7a3d", "#f0c419", "#f6efe2"],
};

/** 実際の州・準州にならった7区分。首都特別区(ACT・キャンベラ)はNSWに含める。 */
export const AUSTRALIA_REGIONS = {
  nsw: t("New South Wales, including Canberra|Nueva Gales del Sur, con Canberra|Nouvelle-Galles du Sud, avec Canberra|ニューサウスウェールズ(キャンベラを含む)"),
  vic: t("Victoria|Victoria|Victoria|ヴィクトリア"),
  qld: t("Queensland|Queensland|Queensland|クイーンズランド"),
  sa: t("South Australia|Australia Meridional|Australie-Méridionale|南オーストラリア"),
  wa: t("Western Australia|Australia Occidental|Australie-Occidentale|西オーストラリア"),
  tas: t("Tasmania|Tasmania|Tasmanie|タスマニア"),
  nt: t("Northern Territory|Territorio del Norte|Territoire du Nord|ノーザンテリトリー"),
};

/**
 * アイテム。効果の種類は他の盤面と同じ9種で、名前だけが土地のものになる
 * (対応表は REGISTER.md 経由で src/infrastructure/content/item-effect-rules.ts に登録)。
 * 語はすべてオーストラリア固有の語を選んだ(既存国との衝突確認は
 * REGISTER.md を参照。特に英語圏どうしの衝突に注意した)。
 */
export const AUSTRALIA_ITEMS = {
  willywilly: {
    e: "🌪️",
    price: 240,
    kind: "move",
    n: t("A Ride on the Willy-Willy|Un paseo en el willy-willy|Une balade sur le willy-willy|ウィリー・ウィリーに乗って"),
    d: t(
      "Carried 8–12 squares. The wind picks where you come down.|Te lleva de 8 a 12 casillas. El viento elige dónde bajas.|Emporté de 8 à 12 cases. C'est le vent qui choisit où tu redescends.|8〜12マス運ばれる。どこに着くかは風まかせ。",
    ),
    f: t(
      "A willy-willy is a small, short-lived whirlwind that spins up over hot, dry ground and can lift dust, leaves and loose sheets of tin roofing a surprising distance before it collapses. Outback children are taught to watch for the telltale spinning column of red dust long before it reaches them.|Un willy-willy es un pequeño remolino de vida corta que se forma sobre suelo seco y caliente y puede levantar polvo, hojas y chapas de techo sueltas a una distancia sorprendente antes de disiparse. A los niños del outback se les enseña a vigilar la columna giratoria de polvo rojo mucho antes de que llegue hasta ellos.|Un willy-willy est un petit tourbillon éphémère qui se forme au-dessus d'un sol sec et chaud et peut soulever poussière, feuilles et tôles de toiture sur une distance surprenante avant de s'effondrer. Les enfants de l'outback apprennent à repérer la colonne tournante de poussière rouge bien avant qu'elle ne les atteigne.|ウィリー・ウィリーは、乾いて熱い地面の上に発生する小さく短命なつむじ風で、崩れるまでのあいだに砂埃や葉、外れたトタン屋根を驚くほど遠くまで運ぶことがある。アウトバックの子どもたちは、それが届くよりずっと前に、渦を巻く赤い砂埃の柱を見つける訓練をされている。",
    ),
  },
  swag: {
    e: "🎒",
    price: 380,
    kind: "pre",
    n: t("A Swagman's Reckoning|El cálculo del swagman|Le calcul du swagman|スワッグマンの目算"),
    d: t(
      "Choose exactly how far you travel.|Elige exactamente cuánto avanzas.|Choisis exactement ta distance.|進む数を自分で決められる。",
    ),
    f: t(
      "Itinerant workers called swagmen carried their whole household — a rolled blanket called a swag — on their back and walked between sheep and cattle stations looking for work, timing each day's walk precisely against the distance to the next reliable water. Miscalculating that distance in dry country could be fatal, so a good swagman's reckoning was exact.|Los trabajadores itinerantes llamados swagmen cargaban todo su hogar —una manta enrollada llamada swag— a la espalda y caminaban entre estancias de ovejas y vacas buscando trabajo, calculando cada jornada con precisión según la distancia hasta el siguiente agua fiable. Calcular mal esa distancia en tierra seca podía ser mortal.|Les travailleurs itinérants appelés swagmen portaient toute leur maisonnée — une couverture roulée appelée swag — sur le dos et marchaient entre les stations d'élevage à la recherche de travail, calculant chaque étape avec précision selon la distance jusqu'au prochain point d'eau fiable. Mal calculer cette distance en terre sèche pouvait être fatal.|スワッグマンと呼ばれた渡り労働者は、丸めた毛布「スワッグ」に家財一式を詰めて背負い、羊や牛の牧場を渡り歩いて仕事を探した。次の確実な水場までの距離を正確に見積もりながら一日の行程を決めた。乾いた土地でその距離を見誤れば命取りになりかねず、腕の良いスワッグマンの目算は正確だった。",
    ),
  },
  roadtrain: {
    e: "🚛",
    price: 360,
    kind: "pre",
    n: t("A Lift from a Road Train|Un aventón en un road train|Une place dans un road train|ロードトレインに便乗して"),
    d: t(
      "Roll two dice.|Lanza dos dados.|Lance deux dés.|サイコロを2個振る。",
    ),
    f: t(
      "A road train can pull up to four trailers behind a single prime mover, stretching beyond 50 metres in total, built specifically for outback highways too remote for a rail line to ever reach. Overtaking one on a single-lane road can take several minutes, and drivers are advised to only attempt it on the longest, straightest stretches.|Un road train puede arrastrar hasta cuatro remolques tras un solo tractor, superando los 50 metros en total, diseñado para autopistas del outback demasiado remotas para que llegue jamás una vía férrea. Adelantar a uno en una carretera de un solo carril puede llevar varios minutos.|Un road train peut tracter jusqu'à quatre remorques derrière un seul tracteur, dépassant 50 mètres au total, conçu pour des routes de l'outback trop reculées pour qu'une voie ferrée y arrive jamais. Doubler l'un d'eux sur une route à une voie peut prendre plusieurs minutes.|ロードトレインは1台のトラクターの後ろに最大4台のトレーラーを連結でき、全長50mを超えることもある。鉄道が決して届かないほど遠いアウトバックの幹線道路のために作られた。片側一車線の道でこれを追い越すには数分かかることもあり、いちばん長く直線的な区間でしか試みないよう勧められている。",
    ),
  },
  ghanticket: {
    e: "🚆",
    price: 640,
    kind: "pre",
    n: t("A Ticket on The Ghan|Un billete en El Ghan|Un billet pour le Ghan|ザ・ガン号の切符"),
    d: t(
      "Roll three dice.|Lanza tres dados.|Lance trois dés.|サイコロを3個振る。",
    ),
    f: t(
      "Named after the Afghan cameleers who once opened up the desert routes it now follows by rail, The Ghan runs the full length of the continent from Adelaide to Darwin, a journey of nearly 3,000 km that takes two nights end to end. Camels from those original expeditions still roam wild in the outback today, descendants of animals released once the railway made them unnecessary.|Bautizado en honor a los camelleros afganos que antaño abrieron las rutas del desierto que ahora sigue en tren, El Ghan recorre todo el continente de Adelaida a Darwin, un viaje de casi 3.000 km que dura dos noches de punta a punta. Camellos de aquellas expediciones originales aún vagan salvajes hoy por el outback.|Nommé d'après les chameliers afghans qui ouvrirent jadis les routes désertiques qu'il suit désormais par rail, le Ghan parcourt tout le continent d'Adélaïde à Darwin, un trajet de près de 3 000 km qui dure deux nuits. Des chameaux de ces expéditions originelles errent encore aujourd'hui à l'état sauvage dans l'outback.|かつて砂漠のルートを切り開いたアフガン人ラクダ使いにちなんで名付けられたザ・ガン号は、アデレードからダーウィンまで大陸を縦断する。距離はおよそ3,000km、二晩がかりの旅である。その最初の遠征で使われたラクダの子孫は、鉄道が要らなくなって放たれて以来、いまもアウトバックに野生化して生きている。",
    ),
  },
  vegemite: {
    e: "🍞",
    price: 320,
    kind: "passive",
    n: t("A Jar of Vegemite|Un frasco de Vegemite|Un pot de Vegemite|一瓶のベジマイト"),
    d: t(
      "Automatically blocks the next misfortune.|Bloquea la próxima desgracia.|Bloque le prochain malheur.|次の災難を1回自動で防ぐ。",
    ),
    f: t(
      "Vegemite was developed in 1922 from the leftover brewer's yeast of Australian beer-making, spread thin because its salty, intensely savoury taste overwhelms most people who try more than a scrape. Almost every Australian household keeps a jar, and it is treated less as a food than as a kind of household constant nothing seems to run out of.|Vegemite se desarrolló en 1922 a partir de la levadura sobrante de la fabricación de cerveza australiana; se unta fina porque su sabor salado e intensamente sabroso abruma a quien pruebe más de un poco. Casi todos los hogares australianos guardan un frasco, tratado más como una constante doméstica que como un alimento.|La Vegemite fut mise au point en 1922 à partir de la levure de bière australienne récupérée, tartinée finement car son goût salé et intensément umami accable quiconque en met plus qu'un soupçon. Presque tous les foyers australiens en gardent un pot, traité moins comme un aliment que comme une constante du foyer qui ne semble jamais manquer.|ベジマイトは1922年、オーストラリアのビール醸造で余った酵母から作られた。塩気が強く旨味の濃い味は、少し多めに塗ると大抵の人には強すぎるため、ごく薄く塗る。オーストラリアのほぼすべての家庭に瓶があり、食べ物というよりは切れることのない家庭の定番として扱われている。",
    ),
  },
  canetoad: {
    e: "🐸",
    price: 440,
    kind: "pre",
    n: t("A Cane Toad in a Bucket|Un sapo de caña en un balde|Un crapaud buffle dans un seau|バケツの中のオオヒキガエル"),
    d: t(
      "Drive the misfortune spirit away from you.|Aleja de ti al espíritu de la desgracia.|Chasse loin de toi l'esprit du malheur.|厄災の神を自分から追い払う。",
    ),
    f: t(
      "Cane toads were released in Queensland in 1935 to control a beetle destroying sugar cane, but the beetle lived too high on the stalks for the toad to reach, and the toad itself turned out to be toxic enough to kill almost anything that tried to eat it. It has since spread across most of northern Australia, and even a misfortune spirit knows better than to take a bite.|Los sapos de caña se soltaron en Queensland en 1935 para controlar un escarabajo que destruía la caña de azúcar, pero el escarabajo vivía demasiado alto en el tallo para que el sapo lo alcanzara, y el propio sapo resultó ser lo bastante tóxico como para matar a casi cualquiera que intentara comérselo. Desde entonces se ha extendido por casi todo el norte de Australia, y hasta un espíritu de la desgracia sabe que no conviene morderlo.|Les crapauds buffles furent lâchés au Queensland en 1935 pour contrôler un coléoptère qui détruisait la canne à sucre, mais le coléoptère vivait trop haut sur la tige pour que le crapaud l'atteigne, et le crapaud lui-même s'est révélé assez toxique pour tuer presque tout ce qui tentait de le manger. Il s'est depuis répandu dans presque tout le nord de l'Australie, et même un esprit du malheur sait qu'il vaut mieux ne pas y goûter.|オオヒキガエルは1935年、サトウキビを食い荒らす甲虫を退治するためクイーンズランドに放たれたが、その甲虫は茎の高い場所に棲み、カエルの口には届かなかった。おまけにこのカエル自身が強い毒を持ち、食べようとしたほとんどの生き物を死なせてしまう。以来オーストラリア北部の大半に広がっており、厄災の神でさえひと口かじろうとは思わない。",
    ),
  },
  speewah: {
    e: "📖",
    // クイズを外したときの損失を肩代わりするだけなので、それに見合う値。
    price: 130,
    kind: "passive",
    n: t("A Tale from Speewah|Un cuento de Speewah|Un récit de Speewah|スピーワーの物語"),
    d: t(
      "If you get a quiz wrong, it is counted right instead. Used up.|Si fallas una pregunta, cuenta como acertada. Se gasta.|Si tu rates une question, elle compte juste. Consommé.|クイズを外しても正解扱いになる。1回で無くなる。",
    ),
    f: t(
      "Speewah is a legendary station in bush folklore so vast that stockmen supposedly needed a week just to ride from the front gate to the homestead, and where every impossible feat — a bullock so big its shadow blocked out the sun — was told as plain fact around the campfire. Nobody who tells a Speewah story ever admits it might not be entirely true.|Speewah es una estación legendaria del folclore rural tan vasta que, según se cuenta, los jinetes necesitaban una semana solo para llegar de la puerta a la casa principal, y donde cada hazaña imposible —un buey tan grande que su sombra tapaba el sol— se contaba como pura verdad junto al fuego. Nadie que cuenta un relato de Speewah admite que podría no ser del todo cierto.|Speewah est une station légendaire du folklore rural si vaste que les cavaliers auraient eu besoin d'une semaine rien que pour aller du portail à la ferme, et où chaque exploit impossible — un bœuf si grand que son ombre masquait le soleil — se racontait comme un simple fait autour du feu de camp. Personne ne raconte une histoire de Speewah en admettant qu'elle pourrait ne pas être tout à fait vraie.|スピーワーは奥地の言い伝えに出てくる伝説の牧場で、あまりに広大なため正門から母屋までたどり着くのに牧夫でさえ一週間かかったとされる。その影が太陽を隠すほど巨大な牛など、ありえない話がすべて焚き火端では当たり前の事実として語られた。スピーワーの物語を語る者は、誰一人としてそれが本当ではないかもしれないとは認めない。",
    ),
  },
  cupsweep: {
    e: "🐎",
    price: 280,
    kind: "pre",
    n: t("Winning the Cup Sweep|Ganar la porra de la Copa|Gagner le sweep de la Coupe|カップ・スイープで勝つ"),
    d: t(
      "Cash in the sweep.|Cobra el premio de la porra.|Encaisse le gain du sweep.|くじの賞金を受け取る。",
    ),
    f: t(
      "Almost every Australian office and pub runs an informal sweepstake before the Melbourne Cup horse race each November, selling numbered tickets that assign each entrant a randomly drawn horse regardless of what they know about racing. The race itself is short enough to be nicknamed \"the race that stops a nation\", with the whole country pausing for about three minutes to watch it.|Casi toda oficina y pub australiano organiza una porra informal antes de la carrera hípica Melbourne Cup cada noviembre, vendiendo boletos numerados que asignan a cada participante un caballo al azar, sepa o no de carreras. La carrera en sí es tan corta que se la apoda «la carrera que detiene a una nación», con todo el país deteniéndose unos tres minutos para verla.|Presque tous les bureaux et pubs australiens organisent un sweepstake informel avant la course hippique de la Melbourne Cup chaque novembre, vendant des billets numérotés qui attribuent à chaque participant un cheval tiré au sort, qu'il s'y connaisse en courses ou non. La course elle-même est si courte qu'on la surnomme « la course qui arrête une nation », le pays entier s'arrêtant environ trois minutes pour la regarder.|オーストラリアのほとんどの職場やパブでは、毎年11月のメルボルン・カップ競馬の前に非公式なくじが行われ、競馬に詳しいかどうかに関わらず、番号付きの券でくじ引きの馬が割り当てられる。レース自体は「国を止めるレース」と呼ばれるほど短く、国じゅうが約3分間手を止めて見入る。",
    ),
  },
  twoup: {
    e: "🪙",
    price: 420,
    kind: "pre",
    n: t("A Winning Streak at Two-Up|Una racha ganadora al two-up|Une série gagnante au two-up|トゥーアップの連勝"),
    d: t(
      "Take another turn straight away.|Juega otro turno enseguida.|Rejoue un tour aussitôt.|もう一度すぐ手番が来る。",
    ),
    f: t(
      "Two-up is a gambling game where a spinner tosses two coins from a wooden paddle called a kip and players bet on both landing heads or both landing tails, a pastime soldiers carried between camps in the First World War. It is illegal to play most days of the year, except on Anzac Day, when the law is set aside and even police stations host a game.|El two-up es un juego de apuestas en el que un lanzador arroja dos monedas desde una paleta de madera llamada kip y los jugadores apuestan a que ambas caigan cara o ambas caigan cruz, un pasatiempo que los soldados llevaban de campamento en campamento en la Primera Guerra Mundial. Es ilegal jugarlo casi todo el año, salvo el Día de Anzac, cuando la ley se deja de lado.|Le two-up est un jeu d'argent où un lanceur projette deux pièces depuis une palette de bois appelée kip et les joueurs parient sur pile-pile ou face-face, un passe-temps que les soldats emportaient de camp en camp lors de la Première Guerre mondiale. Il est illégal d'y jouer presque toute l'année, sauf le jour de l'Anzac, où la loi est mise de côté.|トゥーアップは、キップと呼ばれる木製の板から2枚のコインを投げ上げ、両方とも表か両方とも裏に賭ける賭博で、第一次世界大戦中に兵士たちが野営地から野営地へ持ち歩いた娯楽である。一年のほとんどの日は違法だが、アンザック・デーだけは法が棚上げされ、警察署でさえ勝負が開かれる。",
    ),
  },
};

/**
 * 厄災の神。オーストラリアの奥地の民話に伝わるバニップ(沼地や水場に棲むと
 * される、はっきりした姿の分からない生き物)にした。人を苦しめる悪霊では
 * なく、姿を見せない気まぐれな水辺の主として描く(韓国のトッケビ・
 * 茨城のダイダラボウと同じく「残酷ではなく、ただ度が過ぎるだけ」の性格)。
 */
export const AUSTRALIA_SPIRIT = {
  e: "🐊",
  n: t("The Bunyip|El Bunyip|Le Bunyip|バニップ"),
  big: t("The Bunyip's Billabong Bellow|El bramido del Bunyip en el billabong|Le beuglement du Bunyip dans le billabong|バニップの水場の雄叫び"),
  ward: "vegemite",
  arrive: t(
    "<b>🐊 A bunyip has taken an interest in you.</b> Old stories describe this swamp-dwelling creature as something between a seal, a dog and nothing anyone has properly seen, said to boom out of billabongs at night and drag down whoever gets too close to the water's edge. It now follows <b>{0}</b>, the traveler farthest from the destination, and brings a misfortune every turn.|<b>🐊 Un bunyip se ha fijado en ti.</b> Los viejos relatos describen a esta criatura de las ciénagas como algo entre una foca, un perro y nada que nadie haya visto bien, que se dice ruge desde los billabongs de noche y arrastra hacia el fondo a quien se acerque demasiado al agua. Ahora sigue a <b>{0}</b>, el viajero más lejano del destino, y trae una desgracia cada turno.|<b>🐊 Un bunyip s'est intéressé à toi.</b> Les vieux récits décrivent cette créature des marécages comme un croisement entre un phoque, un chien et rien que quiconque ait jamais vraiment vu, censée mugir depuis les billabongs la nuit et entraîner vers le fond quiconque s'approche trop du bord de l'eau. Il suit désormais <b>{0}</b>, le voyageur le plus loin du but, et apporte un malheur chaque tour.|<b>🐊 バニップに目を付けられた。</b> 古い言い伝えによれば、この沼地に棲む生き物はアザラシとも犬ともつかず、誰もはっきり見たことがないという。夜になるとビラボン(三日月湖)から唸り声をあげ、水際に近づきすぎた者を引きずり込むとされる。いま目的地から最も遠い <b>{0}</b> の傍らを歩き、毎ターン災難をもたらす。",
  ),
  moves: t(
    "🐊 <b>The bunyip</b> loses interest and slips toward <b>{0}</b>, farthest from {1}.|🐊 <b>El bunyip</b> pierde el interés y se desliza hacia <b>{0}</b>, el más lejano de {1}.|🐊 <b>Le bunyip</b> se désintéresse et glisse vers <b>{0}</b>, le plus loin de {1}.|🐊 <b>バニップ</b> は興味を失い、{1} から最も遠い <b>{0}</b> のほうへ這っていった。",
  ),
  wake: t(
    "<b>{0}</b> has walked four turns beside the bunyip and never once glimpsed it clearly. It surfaces at last with a bellow that carries across the whole billabong — <b>the Bunyip's Billabong Bellow</b> begins. Every misfortune now strikes twice as hard.|<b>{0}</b> lleva cuatro turnos junto al bunyip sin haberlo visto claramente ni una vez. Por fin emerge con un bramido que recorre todo el billabong: empieza <b>el bramido del Bunyip en el billabong</b>. Cada desgracia golpea ahora el doble.|<b>{0}</b> marche depuis quatre tours aux côtés du bunyip sans jamais l'avoir aperçu clairement. Il refait enfin surface dans un beuglement qui traverse tout le billabong : <b>le beuglement du Bunyip dans le billabong</b> commence. Chaque malheur frappe désormais deux fois plus fort.|<b>{0}</b> は4ターンもバニップのそばを歩いていながら、その姿をはっきり見たことは一度もない。ついに水面に現れ、ビラボン全体に響く雄叫びをあげた。<b>バニップの水場の雄叫び</b> の始まりである。以後、災難の打撃は倍になる。",
  ),
  wakeFact: t(
    "<b>Behind the story:</b> descriptions of the bunyip vary wildly between regions and tellers — some give it flippers, some tusks, some a horse's tail — which folklorists take as a sign the name was applied to many different half-glimpsed things over a long time rather than one single creature.|<b>Tras la historia:</b> las descripciones del bunyip varían enormemente entre regiones y narradores —unos le dan aletas, otros colmillos, otros cola de caballo—, lo que los folcloristas interpretan como señal de que el nombre se aplicó a muchas cosas distintas entrevistas a lo largo del tiempo, no a una sola criatura.|<b>Derrière l'histoire :</b> les descriptions du bunyip varient énormément selon les régions et les conteurs — certains lui donnent des nageoires, d'autres des défenses, d'autres une queue de cheval —, ce que les folkloristes interprètent comme le signe que le nom fut appliqué à de nombreuses choses entraperçues différentes plutôt qu'à une seule créature.|<b>物語の背景:</b> バニップの描写は地方や語り手によって大きく異なり、ひれを持つとする話もあれば、牙や馬の尾を持つとする話もある。民俗学者はこれを、一つの生き物というより、長い年月のあいだにちらりと見えた様々なものにこの名が当てられてきた証しと見ている。",
  ),
  pleased: t(
    "It rolls lazily in the shallows to show off, and a coin someone dropped years ago washes up in the mud. <b>{0}</b> gains <span class='money'>+{1}</span>.|Se revuelca perezosamente en lo bajo para presumir, y una moneda que alguien dejó caer hace años aflora entre el barro. <b>{0}</b> gana <span class='money'>+{1}</span>.|Il se roule paresseusement dans les hauts-fonds pour frimer, et une pièce tombée là des années plus tôt refait surface dans la boue. <b>{0}</b> gagne <span class='money'>+{1}</span>.|得意げに浅瀬でごろごろと転がったはずみで、何年も前に誰かが落とした硬貨が泥の中から浮き上がった。<b>{0}</b> は <span class='money'>+{1}</span> を得た。",
  ),
  wardBody: t(
    "A jar is opened where it can smell it. Bunyips are said to hate the sharp reek of Vegemite above all things, and it sinks back beneath the water, passing <b>{0}</b> without noticing this turn.|Se abre un frasco donde puede olerlo. Dicen que los bunyips odian el hedor intenso de la Vegemite sobre todas las cosas, y se hunde de nuevo bajo el agua, pasando de largo junto a <b>{0}</b> sin percatarse esta vuelta.|On ouvre un pot à portée de son odorat. On dit que les bunyips détestent par-dessus tout la forte odeur de la Vegemite, et il replonge sous l'eau, passant devant <b>{0}</b> sans le remarquer ce tour-ci.|瓶の蓋を、匂いが届く場所で開けた。バニップは何よりベジマイトの強い匂いを嫌うという。彼は水の中へ沈み戻り、このターンは <b>{0}</b> に気づかないまま通り過ぎた。",
  ),
};

/**
 * 災難7種。バニップの気まぐれな水の主という性格に合わせつつ、
 * 自然災害(山火事・サイクロン)と暮らしの中の失敗談を織り交ぜてある。
 * `src/infrastructure/content/season-and-doom-rules.ts` 側の実効果
 * (`DOOM_EFFECT_ID_BY_LEGACY_ID`)は China の7種と対応させて割り当てる予定
 * (詳しくは REGISTER.md)。
 */
export const AUSTRALIA_DOOM = [
  {
    id: "bushfire",
    n: t("A bushfire crosses the ridge|Un incendio forestal cruza la cresta|Un feu de brousse traverse la crête|山火事が尾根を越える"),
    t: t(
      "A total fire ban was in place for days, and still a spark from somewhere turned into a wall of flame that jumped the containment line before the trucks could get ahead of it. Eucalyptus oil in the leaves burns so readily that a bushfire can travel faster than a person can run, and insurers now price the risk suburb by suburb rather than town by town.|Había prohibición total de fuego desde hacía días, y aun así una chispa de algún lugar se convirtió en una pared de llamas que saltó la línea de contención antes de que los camiones pudieran adelantarse. El aceite de eucalipto en las hojas arde con tal facilidad que un incendio forestal puede avanzar más rápido de lo que una persona puede correr.|Une interdiction totale de feu était en vigueur depuis des jours, et pourtant une étincelle venue de quelque part s'est transformée en un mur de flammes qui a franchi la ligne de confinement avant que les camions ne puissent la devancer. L'huile d'eucalyptus dans les feuilles brûle si facilement qu'un feu de brousse peut avancer plus vite qu'une personne ne peut courir.|数日前から全面的な野焼き禁止令が出ていたにもかかわらず、どこからか飛んだ火の粉が消防車が先回りできないうちに防火帯を越える炎の壁に変わった。ユーカリの葉に含まれる油はあまりに燃えやすく、山火事は人が走るより速く進むこともある。保険会社はいまでは町ごとではなく郊外の区画ごとにこの危険を値付けしている。",
    ),
    months: [8, 9, 10],
  },
  {
    id: "coastalcyclone",
    n: t("A cyclone crosses the coast|Un ciclón cruza la costa|Un cyclone traverse la côte|サイクロンが海岸を通る"),
    t: t(
      "The system was tracked for a week before it made landfall, and still it strips roofs and drops trees across roads that stay blocked for days. Building codes written after Cyclone Tracy destroyed most of Darwin in 1974 have made newer houses far sturdier, but older sheds and awnings rarely survive a direct hit.|El sistema se siguió durante una semana antes de tocar tierra, y aun así arranca techos y derriba árboles sobre carreteras que quedan bloqueadas durante días. Las normas de construcción redactadas tras el ciclón Tracy, que destruyó la mayor parte de Darwin en 1974, han hecho las casas nuevas mucho más resistentes, pero cobertizos y toldos viejos rara vez sobreviven a un impacto directo.|Le système fut suivi une semaine avant de toucher terre, et pourtant il arrache les toits et abat des arbres sur des routes qui restent bloquées des jours durant. Les normes de construction rédigées après que le cyclone Tracy eut détruit la majeure partie de Darwin en 1974 ont rendu les maisons neuves bien plus solides, mais les vieux abris et auvents survivent rarement à un impact direct.|この嵐は上陸の一週間前から進路を追われていたが、それでも屋根を剥がし、道路をふさぐ木々をなぎ倒して何日も通行止めにする。1974年にダーウィンの大半を破壊したサイクロン・トレイシーのあとに定められた建築基準のおかげで新しい家ははるかに頑丈になったが、古い物置や日除けは直撃にはめったに耐えられない。",
    ),
    months: [9, 10],
  },
  {
    id: "bogged",
    n: t("Bogged on a black-soil road|Atascado en un camino de tierra negra|Embourbé sur une piste de terre noire|黒土の道でぬかるみにはまる"),
    t: t(
      "A road that was firm and dusty an hour ago turned to axle-deep black mud the moment the rain hit it, and black soil in particular swells and grips a tyre like nothing else once it's wet. There is nothing to do but wait for it to dry out or for another vehicle to happen along with a tow rope, and out here that could be a while.|Una carretera que hacía una hora estaba firme y polvorienta se convirtió en barro negro hasta el eje en cuanto cayó la lluvia, y el suelo negro en particular se hincha y atrapa un neumático como ningún otro una vez mojado. No queda más que esperar a que se seque o a que pase otro vehículo con una cuerda de remolque, y por aquí eso puede tardar.|Une route ferme et poussiéreuse une heure plus tôt s'est changée en boue noire jusqu'à l'essieu dès que la pluie est tombée, et la terre noire en particulier gonfle et agrippe un pneu comme nulle autre une fois mouillée. Il n'y a rien à faire sinon attendre qu'elle sèche ou qu'un autre véhicule passe avec une corde de remorquage, et par ici cela peut prendre du temps.|一時間前まで硬く乾いていた道は、雨が降った瞬間に車軸まで沈む黒い泥に変わった。特に黒土は水を含むと他のどんな土よりもタイヤをがっちりつかんで放さない。乾くのを待つか、けん引ロープを持った別の車が通りかかるのを待つほかなく、こんな場所ではそれにしばらくかかることもある。",
    ),
  },
  {
    id: "sunburn",
    n: t("Sunburn from forgetting the sunscreen|Quemadura de sol por olvidar el protector|Coup de soleil pour avoir oublié la crème|日焼け止めを忘れて日焼けする"),
    t: t(
      "An hour felt like nothing at the time, but the UV index here regularly runs high enough to burn exposed skin in under fifteen minutes, even under cloud. The decades-old \"Slip, Slop, Slap\" campaign — slip on a shirt, slop on sunscreen, slap on a hat — is the reason nearly every local carries a bottle without being asked.|Una hora no pareció nada en su momento, pero el índice UV aquí suele ser tan alto que puede quemar la piel expuesta en menos de quince minutos, incluso con nubes. La campaña de décadas «Slip, Slop, Slap» —ponte camisa, protector y sombrero— es la razón por la que casi todo local lleva un frasco sin que se lo pidan.|Une heure ne semblait rien sur le moment, mais l'indice UV y est souvent assez élevé pour brûler la peau exposée en moins de quinze minutes, même sous les nuages. La campagne vieille de plusieurs décennies « Slip, Slop, Slap » — enfiler un T-shirt, s'enduire de crème, enfiler un chapeau — explique pourquoi presque tous les habitants en portent un flacon sans qu'on le leur demande.|そのときは一時間くらいなんともないと思っていたが、この土地の紫外線指数は曇りの日でも15分足らずで露出した肌を焼くほど高いことがざらにある。何十年も続く「スリップ・スロップ・スラップ(シャツを着て、日焼け止めを塗って、帽子をかぶれ)」の啓発運動のおかげで、地元の人はほぼ誰もが言われなくても日焼け止めを持ち歩いている。",
    ),
  },
  {
    id: "shout",
    n: t("Shouting the whole pub a round|Invitar una ronda a todo el bar|Payer une tournée à tout le pub|パブ全員におごる羽目になる"),
    t: t(
      "Someone announced a win worth celebrating, and the unwritten rule of the shout — each person in the group takes a turn buying a full round — landed on the wrong night to be first in line. Ducking out of a shout when it's your turn is considered close to the rudest thing a person can do at the bar.|Alguien anunció una victoria digna de celebrar, y la regla no escrita de la ronda —cada persona del grupo invita por turnos una ronda completa— cayó justo la noche equivocada para ser el primero en la fila. Escaquearse de invitar cuando te toca se considera casi lo más grosero que se puede hacer en el bar.|Quelqu'un a annoncé une victoire digne d'être fêtée, et la règle tacite de la tournée — chacun du groupe paie à son tour une tournée complète — est tombée le mauvais soir pour être le premier de la file. Se dérober à son tour est considéré comme l'une des choses les plus grossières qu'on puisse faire au bar.|誰かが祝うに値する勝利を報告し、「シャウト」という不文律――グループの一人ひとりが順番に全員分の一杯をおごる――の順番が、よりによって今夜自分から回ってきた。自分の番が来たときにこっそり抜け出すのは、バーで人がしうる中でも最も無作法なふるまいの一つとされる。",
    ),
  },
  {
    id: "huntsman",
    n: t("A huntsman spider drops onto the dashboard|Una araña cazadora cae en el tablero|Une araignée chasseuse tombe sur le tableau de bord|運転中にダッシュボードへ大グモが降ってくる"),
    t: t(
      "It came from the sun visor at highway speed, a hand-sized huntsman spider that is almost entirely harmless but startling enough that pulling over immediately felt like the only option. Huntsman spiders actually help keep a house or car free of other insects, which is exactly the kind of fact that helps nobody in the moment.|Cayó desde la visera a velocidad de autopista, una araña cazadora del tamaño de una mano que es casi del todo inofensiva pero lo bastante sobresaltante como para que detenerse pareciera la única opción. Las arañas cazadoras en realidad ayudan a mantener una casa o un auto libre de otros insectos, un dato que en el momento no sirve de nada.|Elle est tombée du pare-soleil à vitesse d'autoroute, une araignée chasseuse grande comme une main, presque entièrement inoffensive mais assez surprenante pour que s'arrêter immédiatement semble la seule option. Les araignées chasseuses aident en réalité à débarrasser une maison ou une voiture des autres insectes, un fait qui n'aide personne sur le moment.|ハイウェイを走行中、サンバイザーから手のひらほどもある大きなハンツマンスパイダーが落ちてきた。ほとんど無害な種類だが、驚いてとっさに車を停めるほかなかった。ハンツマンスパイダーは実際には家や車から他の虫を減らしてくれる益虫なのだが、その瞬間にはまるで役に立たない知識である。",
    ),
  },
  {
    id: "magpieswoop",
    n: t("A magpie swoops and steals something shiny|Una urraca se abate y roba algo brillante|Une pie plonge et vole un objet brillant|カササギが急降下して光る物を持ち去る"),
    t: t(
      "Nesting magpies defend their territory by diving at anyone who walks too close, clicking their beaks a hair's breadth from an ear, and this one broke off its dive only after snatching a glint of metal straight out of an open bag. Cyclists in swoop-prone parks are a familiar sight each spring, riding with zip ties sticking up from their helmets like unconvincing eyes.|Las cascas de las urracas nidificantes defienden su territorio abatiéndose sobre quien pasa demasiado cerca, chasqueando el pico a un pelo del oído, y esta rompió el picado solo después de arrebatar un destello metálico de una bolsa abierta. Los ciclistas en parques propensos a estos ataques son una estampa habitual cada primavera, con bridas de plástico asomando del casco a modo de ojos poco convincentes.|Les pies en nidification défendent leur territoire en piquant sur quiconque passe trop près, claquant du bec à un cheveu de l'oreille, et celle-ci n'a rompu son piqué qu'après avoir happé un éclat de métal dans un sac ouvert. Les cyclistes dans les parcs à risque sont un spectacle familier chaque printemps, roulant avec des colliers de serrage plantés sur le casque en guise d'yeux peu convaincants.|巣を守るカササギは、近づきすぎた者めがけて急降下し、耳のすぐそばでくちばしを鳴らす。この一羽は、開いたバッグから光る金属をひったくってようやく急降下をやめた。毎年春になると、スウォープ(急降下)の多い公園ではヘルメットに結束バンドを目のように突き立てて走る自転車乗りをよく見かける。",
    ),
    months: [4, 5],
  },
];

/**
 * 季節。4月始まりの12ヶ月。国単位の盤面なので、日本・フランス・インドと
 * 同じく地方まるごとの好不況で差をつける(効果の数値は
 * `src/infrastructure/content/season-and-doom-rules.ts` の australia の項)。
 */
export const AUSTRALIA_SEASONS = [
  {
    e: "🎖️",
    n: t("Anzac Day dawn services|Los servicios del alba de Anzac Day|Les cérémonies à l'aube du jour de l'Anzac|アンザック・デーの夜明けの式典"),
    t: t(
      "Before sunrise on the 25th, crowds gather at war memorials in near-silence for a dawn service marking the 1915 Gallipoli landing, an operation that failed its military objective but became the day both Australia and New Zealand mark their war dead. Two-up, the coin-tossing game soldiers played between shifts, is legally allowed only on this one day of the year.|Antes del amanecer del 25, la gente se reúne en los monumentos de guerra en casi total silencio para un servicio del alba que recuerda el desembarco de Galípoli de 1915, una operación que fracasó en su objetivo militar pero que se convirtió en el día en que Australia y Nueva Zelanda recuerdan a sus caídos. El two-up, el juego de lanzar monedas que los soldados jugaban entre turnos, solo es legal este único día del año.|Avant le lever du soleil le 25, des foules se rassemblent presque en silence aux monuments aux morts pour une cérémonie à l'aube marquant le débarquement de Gallipoli en 1915, une opération qui échoua sur le plan militaire mais devint le jour où l'Australie et la Nouvelle-Zélande honorent leurs morts de guerre. Le two-up, le jeu de pile ou face que les soldats jouaient entre les quarts, n'est légal que ce seul jour de l'année.|25日の日の出前、人々はほぼ無言のまま各地の戦争記念碑に集まり、1915年のガリポリ上陸を悼む夜明けの式典に参列する。この作戦は軍事目標としては失敗に終わったが、オーストラリアとニュージーランド両国が戦没者を悼む日となった。兵士たちが交代の合間に興じたコイン投げの賭博トゥーアップが合法になるのは、一年でこの日だけである。",
    ),
    f: t(
      "The dawn timing recalls the actual hour of the 1915 landing, and the ceremony's closing bugle call, the Last Post, is followed by a minute of silence before a second call, Reveille, formally ends the service.|La hora del alba recuerda la hora real del desembarco de 1915, y la llamada de corneta que cierra la ceremonia, el Last Post, va seguida de un minuto de silencio antes de que una segunda llamada, Reveille, termine formalmente el servicio.|L'heure de l'aube rappelle l'heure réelle du débarquement de 1915, et la sonnerie de clairon qui clôt la cérémonie, le Last Post, est suivie d'une minute de silence avant qu'une seconde sonnerie, le Reveille, ne termine formellement l'office.|夜明けの時刻は1915年の実際の上陸時刻にちなんでおり、式典を締めくくるラッパの調べ「ラスト・ポスト」のあとには1分間の黙祷が続き、もう一つの調べ「レヴェイユ」で正式に式典が終わる。",
    ),
  },
  {
    e: "✨",
    n: t("Vivid Sydney lights up the harbour|Vivid Sydney ilumina el puerto|Vivid Sydney illumine le port|ヴィヴィッド・シドニーが港を彩る"),
    t: t(
      "For nearly a month each autumn, the Sydney Opera House sails and buildings around the harbour are projected with large-scale light art, drawing millions of visitors to a city that otherwise has little going on in the cooler, quieter weeks after daylight saving ends. The festival began in 2009 with a single light installation and now ranks among the largest events of its kind in the world.|Durante casi un mes cada otoño, las velas de la Ópera de Sídney y edificios del puerto se proyectan con arte lumínico a gran escala, atrayendo a millones de visitantes a una ciudad que, si no, tiene poco que ofrecer en las semanas más frescas y tranquilas tras el fin del horario de verano. El festival comenzó en 2009 con una sola instalación lumínica.|Pendant près d'un mois chaque automne, les voiles de l'Opéra de Sydney et les bâtiments du port sont projetés d'art lumineux à grande échelle, attirant des millions de visiteurs dans une ville qui, sinon, a peu d'activité durant les semaines plus fraîches et calmes suivant la fin de l'heure d'été. Le festival a débuté en 2009 avec une seule installation lumineuse.|毎年秋、ほぼ一か月にわたってシドニー・オペラハウスの帆や港周辺の建物に大規模な光の映像が投影され、サマータイムが終わったあとの肌寒く静かな時期に本来なら見どころの少ないこの街に、何百万人もの訪問者を呼び込む。この祭典は2009年、たった一つの光の展示から始まった。",
    ),
    f: t(
      "Vivid now spreads across light, music and ideas programming simultaneously, but the projected artworks on the Opera House sails remain the event's signature image, changing completely from one year's festival to the next.|Vivid ahora abarca simultáneamente programación de luz, música e ideas, pero las obras proyectadas en las velas de la Ópera siguen siendo la imagen distintiva del evento, cambiando por completo de una edición a la siguiente.|Vivid couvre désormais simultanément lumière, musique et programmation d'idées, mais les œuvres projetées sur les voiles de l'Opéra restent l'image emblématique de l'événement, changeant entièrement d'une édition à l'autre.|いまではヴィヴィッドは光・音楽・アイデアの催しを同時に展開するが、オペラハウスの帆に投影される作品はこの祭典を象徴する光景であり続け、年ごとにまったく違う意匠に変わる。",
    ),
  },
  {
    e: "⛷️",
    n: t("The Alpine ski season opens|Se abre la temporada de esquí alpino|La saison de ski alpin s'ouvre|アルパインスキーのシーズンが開幕する"),
    t: t(
      "Resorts in the Snowy Mountains and Victorian Alps open for the King's Birthday long weekend in June whether or not enough natural snow has fallen, backed up by snowmaking machines that can cover the main runs overnight. Australia's ski fields sit at lower altitude and latitude than most of the world's, so the season is comparatively short and snow cover unreliable from one week to the next.|Los complejos de las Montañas Nevadas y los Alpes de Victoria abren para el largo fin de semana del cumpleaños del Rey en junio, haya caído o no suficiente nieve natural, respaldados por máquinas de nieve artificial que pueden cubrir las pistas principales en una noche. Las pistas australianas están a menor altitud y latitud que la mayoría en el mundo.|Les stations des Snowy Mountains et des Alpes victoriennes ouvrent pour le long week-end de l'anniversaire du Roi en juin, qu'il soit tombé assez de neige naturelle ou non, épaulées par des canons à neige capables de couvrir les pistes principales en une nuit. Les domaines skiables australiens se trouvent à une altitude et une latitude plus basses que la plupart dans le monde.|スノーウィー山脈とヴィクトリア・アルプスのリゾートは、自然の積雪が十分にあろうとなかろうと、6月の国王誕生日の連休に合わせて開業する。人工降雪機が一晩で主要コースを覆うことができるからである。オーストラリアのスキー場は世界の多くの場所より標高も緯度も低く、シーズンは比較的短く、積雪は週によって当てにならない。",
    ),
    f: t(
      "Because natural snowfall is unreliable, Australian resorts were early and heavy investors in snowmaking technology, and several now generate most of their early-season base entirely from machines rather than the sky.|Como la nevada natural no es fiable, las estaciones australianas invirtieron pronto y mucho en tecnología de nieve artificial, y varias generan hoy la mayor parte de su base de inicio de temporada por completo con máquinas.|La neige naturelle étant peu fiable, les stations australiennes ont investi tôt et massivement dans la technologie de fabrication de neige, et plusieurs génèrent aujourd'hui l'essentiel de leur base de début de saison entièrement par des machines.|自然の積雪が当てにならないため、オーストラリアのリゾートは早くから人工降雪技術に大きく投資してきた。いくつかのスキー場ではいまやシーズン序盤の雪の大半を、空からではなく機械が生み出している。",
    ),
  },
  {
    e: "🔥",
    n: t("NAIDOC Week honours Aboriginal and Torres Strait Islander history|La Semana NAIDOC honra la historia aborigen y de las islas del Estrecho de Torres|La semaine NAIDOC honore l'histoire aborigène et des îles du détroit de Torres|NAIDOC週間、アボリジナルとトレス海峡諸島民の歴史をたたえる"),
    t: t(
      "The name NAIDOC began decades ago as an acronym for a committee organising the day, and though the committee is long gone the name stuck, now marking a week of ceremonies, art and community events themed each year around a different aspect of Aboriginal and Torres Strait Islander culture and history. Many workplaces and schools mark it with a smoking ceremony or a Welcome to Country performed by a local Traditional Owner.|El nombre NAIDOC comenzó hace décadas como sigla de un comité que organizaba el día, y aunque el comité desapareció hace tiempo, el nombre quedó, marcando hoy una semana de ceremonias, arte y actos comunitarios con un tema distinto cada año sobre algún aspecto de la cultura e historia aborigen y de las islas del Estrecho de Torres. Muchos centros de trabajo y escuelas la marcan con una ceremonia de humo o una Bienvenida al País a cargo de un Propietario Tradicional local.|Le nom NAIDOC est né il y a des décennies comme sigle d'un comité organisant la journée, et bien que ce comité ait disparu depuis longtemps, le nom est resté, marquant désormais une semaine de cérémonies, d'art et d'événements communautaires organisés chaque année autour d'un aspect différent de la culture et de l'histoire aborigène et des îles du détroit de Torres. De nombreux lieux de travail et écoles la marquent d'une cérémonie de fumée ou d'un Welcome to Country donné par un Propriétaire traditionnel local.|NAIDOCという名は数十年前、この日を運営する委員会の略称として生まれた。その委員会はとうに無くなったが名前だけが残り、いまではアボリジナルとトレス海峡諸島民の文化と歴史のさまざまな側面を毎年テーマに据えた、儀式や芸術、地域行事の一週間となっている。多くの職場や学校では、この期間に煙の儀式や、地元の伝統的な土地の所有者による「ウェルカム・トゥ・カントリー」の挨拶が行われる。",
    ),
    f: t(
      "The week's dates were deliberately moved off their original January slot decades ago, in part because that timing sat too close to Australia Day for a celebration many felt deserved its own separate space on the calendar.|Las fechas de la semana se trasladaron deliberadamente de su franja original de enero hace décadas, en parte porque esa fecha quedaba demasiado cerca del Día de Australia para una celebración que muchos sentían que merecía su propio espacio en el calendario.|Les dates de la semaine furent délibérément déplacées de leur créneau original de janvier il y a des décennies, en partie parce que ce moment était trop proche du jour de l'Australie pour une célébration que beaucoup estimaient mériter son propre espace dans le calendrier.|この週の日程は数十年前、もともとの1月の枠から意図的に移された。オーストラリア・デーに近すぎ、独自の場を暦の中に持つべきだと多くの人が感じた祝いだったことも理由の一つである。",
    ),
  },
  {
    e: "🐋",
    n: t("Whales migrate north and wildflowers open|Las ballenas migran al norte y florecen las flores silvestres|Les baleines migrent vers le nord et les fleurs sauvages s'ouvrent|クジラが北へ渡り、野生の花が咲く"),
    t: t(
      "Humpback whales pass close along both coasts on their annual migration to warmer breeding waters, watched from clifftop lookouts without a boat in many places, while Western Australia's dry southwest bursts into one of the most diverse wildflower displays on Earth, with thousands of species found nowhere else. Both events depend entirely on weather that varies year to year, so locals track them the way other places track a harvest.|Las ballenas jorobadas pasan cerca de ambas costas en su migración anual hacia aguas de cría más cálidas, observadas desde miradores en acantilados sin necesidad de barco en muchos lugares, mientras el seco suroeste de Australia Occidental estalla en una de las exhibiciones de flores silvestres más diversas del planeta, con miles de especies que no se hallan en ningún otro lugar.|Les baleines à bosse longent les deux côtes de près lors de leur migration annuelle vers des eaux de reproduction plus chaudes, observées depuis des belvédères de falaise sans bateau en bien des endroits, tandis que le sud-ouest aride de l'Australie-Occidentale éclate en l'une des floraisons sauvages les plus diverses au monde, avec des milliers d'espèces introuvables ailleurs.|ザトウクジラは暖かい繁殖海域への年に一度の回遊で両岸近くを通り、多くの場所では船なしでも崖の展望台から観察できる。同じころ、西オーストラリアの乾いた南西部は地球でも屈指の多様さを誇る野生の花畑となり、他のどこにも生えない種が何千とある。どちらも年ごとに変わる天候しだいなので、地元の人は他の土地が収穫を見守るようにこれを追う。",
    ),
    f: t(
      "Some of Western Australia's everlasting daisies are true to their name in a practical sense: their papery petals keep their colour and shape for years even after being picked and dried, which is why they turn up pressed inside old family Bibles.|Algunas de las siempre vivas de Australia Occidental hacen honor a su nombre en sentido práctico: sus pétalos apergaminados conservan color y forma durante años incluso tras cortarse y secarse, por lo que aparecen prensadas dentro de viejas biblias familiares.|Certaines immortelles d'Australie-Occidentale portent bien leur nom au sens pratique : leurs pétales papyracés gardent couleur et forme pendant des années même une fois cueillis et séchés, d'où leur présence pressées dans de vieilles bibles de famille.|西オーストラリアのエバーラスティング(永遠に咲く)デイジーの一部は、実用的な意味でもその名にふさわしい。紙のような花びらは摘んで乾かしたあとも何年も色と形を保つため、古い家族の聖書に挟まれた押し花としてよく見つかる。",
    ),
  },
  {
    e: "🏉",
    n: t("Grand Final fever grips the footy codes|La fiebre de la final se apodera de los códigos de fútbol|La fièvre de la finale gagne les codes de football|グランドファイナルの熱狂が二つの“フッティー”を包む"),
    t: t(
      "Australian Rules football wraps up its season with a Grand Final that fills the Melbourne Cricket Ground with over 100,000 people, while rugby league's own decider plays out in Sydney the same weekend, splitting the country's footy loyalty along an old north-south line that roughly follows the Victoria–New South Wales border. Office betting pools and last-minute barbecues follow whichever code the local state actually grew up on.|El fútbol australiano cierra su temporada con una final que llena el Melbourne Cricket Ground con más de 100.000 personas, mientras la propia final de la liga de rugby se juega en Sídney el mismo fin de semana, dividiendo la lealtad futbolera del país a lo largo de una vieja línea norte-sur que sigue aproximadamente la frontera entre Victoria y Nueva Gales del Sur.|Le football australien conclut sa saison par une finale qui remplit le Melbourne Cricket Ground de plus de 100 000 personnes, tandis que la finale de la ligue de rugby se joue à Sydney le même week-end, divisant la fidélité footballistique du pays selon une vieille ligne nord-sud qui suit à peu près la frontière entre le Victoria et la Nouvelle-Galles du Sud.|オーストラリアン・フットボールはメルボルン・クリケット・グラウンドを10万人超で埋めるグランドファイナルでシーズンを締めくくり、同じ週末にはラグビーリーグ独自の決勝戦がシドニーで行われる。国のフッティー(フットボール)への忠誠心は、ヴィクトリア州とニューサウスウェールズ州の境界にほぼ沿った古い南北の線で分かれている。",
    ),
    f: t(
      "The two codes' Grand Finals have shared the same September weekend for decades largely by coincidence of history rather than design, since each football code grew up in a different set of colonies before federation with almost no early crossover between them.|Las finales de ambos códigos comparten el mismo fin de semana de septiembre desde hace décadas, en gran parte por coincidencia histórica y no por diseño, ya que cada código futbolístico creció en un conjunto distinto de colonias antes de la federación.|Les finales des deux codes partagent le même week-end de septembre depuis des décennies, en grande partie par coïncidence historique plutôt que par conception, chaque code de football s'étant développé dans un ensemble différent de colonies avant la fédération.|両コードのグランドファイナルが何十年も同じ9月の週末に重なっているのは、意図してのことというより歴史の巡り合わせに近い。それぞれのフットボールは連邦結成以前、別々の植民地でほとんど交わることなく育ったからである。",
    ),
  },
  {
    e: "🕐",
    n: t("Daylight saving begins, and the country splits in two|Empieza el horario de verano, y el país se divide en dos|L'heure d'été commence, et le pays se scinde en deux|サマータイムが始まり、国が二つの時間に分かれる"),
    t: t(
      "Clocks spring forward an hour in the south and east, but Queensland, the Northern Territory and Western Australia all opt out, so for several months a phone call from Sydney to Brisbane or Perth means doing time-zone arithmetic that residents on both sides get wrong constantly. The clash exists because each state and territory sets its own clock policy, and no federal law forces them into agreement.|Los relojes se adelantan una hora en el sur y el este, pero Queensland, el Territorio del Norte y Australia Occidental optan por no hacerlo, así que durante varios meses una llamada de Sídney a Brisbane o Perth exige hacer cálculos de huso horario que la gente de ambos lados se equivoca constantemente. El choque existe porque cada estado y territorio fija su propia política horaria.|Les horloges avancent d'une heure au sud et à l'est, mais le Queensland, le Territoire du Nord et l'Australie-Occidentale s'en dispensent tous, si bien que pendant plusieurs mois, un appel de Sydney à Brisbane ou Perth impose un calcul de fuseau horaire que les habitants des deux côtés ratent sans cesse. Ce désaccord existe car chaque État et territoire fixe sa propre politique horaire.|南部と東部では時計が1時間進むが、クイーンズランド、ノーザンテリトリー、西オーストラリアはこれを採用しない。そのため数か月のあいだ、シドニーからブリスベンやパースへの電話は時差の計算が必要になり、双方の住民ともしょっちゅう間違える。この食い違いは、各州・準州がそれぞれ独自に時刻の方針を定め、それを一致させる連邦法が無いために生じている。",
    ),
    f: t(
      "Queensland has held referendums on adopting daylight saving, and voters — especially those outside the state capital — have rejected it each time, keeping the whole state on standard time year-round.|Queensland ha sometido a referéndum la adopción del horario de verano, y los votantes —especialmente fuera de la capital estatal— lo han rechazado cada vez, manteniendo todo el estado en hora estándar todo el año.|Le Queensland a soumis à référendum l'adoption de l'heure d'été, et les électeurs — surtout hors de la capitale de l'État — l'ont rejetée à chaque fois, maintenant tout l'État à l'heure standard toute l'année.|クイーンズランド州は過去にサマータイム導入を問う住民投票を行ったことがあるが、州都以外の有権者を中心にそのたびに否決され、州全体が一年を通じて標準時のままとなっている。",
    ),
  },
  {
    e: "🏇",
    n: t("The Melbourne Cup, the race that stops a nation|La Copa Melbourne, la carrera que detiene a una nación|La Melbourne Cup, la course qui arrête une nation|メルボルン・カップ、国を止めるレース"),
    t: t(
      "At 3pm on the first Tuesday of November, offices across the country pause for around three minutes to watch a horse race, and Melbourne itself takes the whole day as a public holiday. Office sweepstakes hand out a randomly drawn horse to everyone in the building regardless of racing knowledge, which is usually the closest most spectators come to studying the form.|A las 3 de la tarde del primer martes de noviembre, las oficinas de todo el país se detienen unos tres minutos para ver una carrera de caballos, y la propia Melbourne toma el día entero como festivo. Las porras de oficina reparten un caballo al azar a todos en el edificio, sepan o no de carreras.|À 15h le premier mardi de novembre, les bureaux du pays entier s'arrêtent environ trois minutes pour regarder une course de chevaux, et Melbourne elle-même prend le jour entier comme férié. Les sweepstakes de bureau attribuent un cheval tiré au sort à chacun dans l'immeuble, qu'il s'y connaisse en course ou non.|11月最初の火曜、午後3時になると国じゅうのオフィスが約3分間手を止めて競馬を見守り、メルボルンの町そのものはこの日を丸ごと祝日にする。オフィスのくじでは、競馬に詳しいかどうかに関わらず建物にいる全員に無作為に選ばれた馬が割り当てられる。それがたいていの観客にとって、レースの予想に最も近づく瞬間である。",
    ),
    f: t(
      "The race has been run since 1861 and is a genuine public holiday only in metropolitan Melbourne, though the informal office sweep has spread it into a nationwide ritual well beyond the one city that actually stops work for it.|La carrera se disputa desde 1861 y es festivo oficial solo en el Melbourne metropolitano, aunque la porra informal de oficina la ha extendido como ritual nacional mucho más allá de la única ciudad que de verdad detiene el trabajo por ella.|La course se dispute depuis 1861 et n'est un jour férié officiel que dans le Melbourne métropolitain, bien que le sweep informel de bureau l'ait répandue en un rituel national bien au-delà de la seule ville qui arrête vraiment le travail pour elle.|このレースは1861年から続いており、正式な祝日となるのはメルボルン都市圏だけだが、職場の非公式なくじのおかげで、実際に仕事を止めるのはこの一都市だけであるにもかかわらず、全国的な習わしとして広まっている。",
    ),
  },
  {
    e: "🏏",
    n: t("Christmas on the sand and the Boxing Day Test|Navidad en la arena y el Test de Boxing Day|Noël sur le sable et le Test de Boxing Day|砂浜のクリスマスとボクシングデー・テスト"),
    t: t(
      "Christmas lunch here often means prawns and salad eaten outdoors in high summer rather than the roast dinner the imagery on the cards still shows, and the day after, Boxing Day, tens of thousands pack the Melbourne Cricket Ground for the start of a five-day international cricket Test that has been played there most years since 1950. Between the two, department stores hold some of the biggest sales of the year.|La comida de Navidad aquí suele ser gambas y ensalada al aire libre en pleno verano en vez del asado que aún muestran las postales, y al día siguiente, Boxing Day, decenas de miles llenan el Melbourne Cricket Ground para el inicio de un Test internacional de cricket a cinco días que se juega allí casi todos los años desde 1950. Entre ambas fechas, los grandes almacenes celebran algunas de las mayores rebajas del año.|Le déjeuner de Noël ici, c'est souvent des crevettes et une salade mangées dehors en plein été plutôt que le rôti que montrent encore les cartes, et le lendemain, Boxing Day, des dizaines de milliers de personnes remplissent le Melbourne Cricket Ground pour le début d'un test de cricket international de cinq jours qui s'y joue presque chaque année depuis 1950. Entre les deux, les grands magasins tiennent certains des plus grands soldes de l'année.|この土地のクリスマスの昼食は、カードの絵柄がいまも描くようなローストではなく、真夏の屋外でエビとサラダを食べることが多い。翌日のボクシングデーには、1950年以来ほぼ毎年ここで開かれてきた5日間の国際クリケット・テストマッチの開幕を見ようと、数万人がメルボルン・クリケット・グラウンドに詰めかける。この二日のあいだ、デパートは一年でも指折りの大売り出しを行う。",
    ),
    f: t(
      "Australia's Christmas falls in the middle of summer school holidays, which run from mid-December to late January, so the day doubles as the start of the country's longest and most crowded travel season rather than a midwinter pause.|La Navidad australiana cae en pleno período de vacaciones escolares de verano, que van de mediados de diciembre a finales de enero, así que el día se convierte también en el inicio de la temporada de viajes más larga y concurrida del país.|Le Noël australien tombe en plein milieu des vacances scolaires d'été, qui vont de la mi-décembre à fin janvier, si bien que ce jour marque aussi le début de la saison de voyage la plus longue et la plus chargée du pays.|オーストラリアのクリスマスは、12月半ばから1月末まで続く夏休みの真っただ中にある。そのためこの日は、真冬の静かな一区切りというより、国内でいちばん長く混み合う旅行シーズンの始まりでもある。",
    ),
  },
  {
    e: "🇦🇺",
    n: t("Australia Day, celebrated and contested|El Día de Australia, celebrado y cuestionado|Le jour de l'Australie, célébré et contesté|オーストラリア・デー、祝いと異議が並び立つ日"),
    t: t(
      "26 January marks the 1788 arrival of the First Fleet at Sydney Cove and is a public holiday marked with barbecues, citizenship ceremonies and fireworks, but many Aboriginal and Torres Strait Islander people and their supporters call the same date Invasion Day or Survival Day, marking the start of colonisation rather than a foundation to celebrate. Some local councils have moved their citizenship ceremonies to a different date in response, while the national holiday itself remains fixed.|El 26 de enero marca la llegada en 1788 de la Primera Flota a Sydney Cove y es festivo, celebrado con barbacoas, ceremonias de ciudadanía y fuegos artificiales, pero muchos aborígenes e isleños del Estrecho de Torres y sus aliados llaman a la misma fecha Día de la Invasión o Día de la Supervivencia, marcando el inicio de la colonización y no una fundación que celebrar. Algunos ayuntamientos han trasladado sus ceremonias de ciudadanía a otra fecha en respuesta.|Le 26 janvier marque l'arrivée en 1788 de la Première Flotte à Sydney Cove et est un jour férié célébré par des barbecues, des cérémonies de citoyenneté et des feux d'artifice, mais de nombreux Aborigènes et insulaires du détroit de Torres et leurs soutiens appellent cette même date le jour de l'Invasion ou le jour de la Survie, marquant le début de la colonisation plutôt qu'une fondation à célébrer. Certains conseils locaux ont déplacé leurs cérémonies de citoyenneté à une autre date en réponse.|1月26日は1788年、シドニー・コーブに最初の船団が到着した日を記念する祝日で、バーベキューや市民権授与式、花火で祝われる。しかし多くのアボリジナルとトレス海峡諸島民、そしてその支持者たちは同じ日を「侵略の日」または「生存の日」と呼び、祝うべき建国ではなく植民地化の始まりと位置づけている。これに応じて市民権授与式の日取りを別の日に移した地方自治体もあるが、国の祝日そのものはこの日のまま変わっていない。",
    ),
    f: t(
      "The date has not always been fixed nationwide the way it is now — different colonies and later states marked their own founding anniversaries on different days well into the twentieth century, and 26 January was only standardised as a uniform public holiday across the whole country in 1994.|La fecha no siempre estuvo fijada a nivel nacional como ahora: distintas colonias y luego estados marcaron sus propios aniversarios fundacionales en días distintos hasta bien entrado el siglo XX, y el 26 de enero solo se estandarizó como festivo uniforme en todo el país en 1994.|La date n'a pas toujours été fixée à l'échelle nationale comme aujourd'hui : différentes colonies puis États ont marqué leurs propres anniversaires de fondation à des dates différentes bien avant dans le XXe siècle, et le 26 janvier ne fut normalisé comme jour férié uniforme dans tout le pays qu'en 1994.|この日付は、いまのように全国一律で固定されていたわけではない。かつては植民地ごと、のちには州ごとに、20世紀に入ってからもそれぞれ異なる日に建国記念日を祝っており、1月26日が全国共通の祝日として統一されたのは1994年のことである。",
    ),
  },
  {
    e: "🌈",
    n: t("Peak heat, and Sydney's Mardi Gras parade|El calor máximo, y el desfile del Mardi Gras de Sídney|Le pic de chaleur, et le défilé du Mardi Gras de Sydney|真夏の暑さの盛りと、シドニーのマルディグラ・パレード"),
    t: t(
      "February usually brings the hottest stretch of the year to the southern cities, and it is also when Sydney's Gay and Lesbian Mardi Gras parade fills Oxford Street with floats and costume, an event that began in 1978 as a march that ended in arrests and has since grown into one of the world's largest LGBTQ pride celebrations. The parade now regularly draws visitors from overseas timing their whole trip around it.|Febrero suele traer el tramo más caluroso del año a las ciudades del sur, y también es cuando el desfile del Mardi Gras de Sídney llena Oxford Street de carrozas y disfraces, un evento que comenzó en 1978 como una marcha que terminó en detenciones y desde entonces ha crecido hasta ser una de las mayores celebraciones LGBTQ del mundo.|Février apporte généralement la période la plus chaude de l'année aux villes du sud, et c'est aussi le moment où le défilé du Mardi Gras gay et lesbien de Sydney remplit Oxford Street de chars et de costumes, un événement qui a débuté en 1978 comme une marche qui s'est achevée par des arrestations et qui est depuis devenu l'une des plus grandes célébrations de la fierté LGBTQ au monde.|2月は南部の都市にとって一年でいちばん暑い時期であることが多く、同時にシドニーのゲイ・アンド・レズビアン・マルディグラのパレードがオックスフォード・ストリートを山車と衣装で埋め尽くす時期でもある。この催しは1978年、逮捕者を出して終わった行進として始まり、いまでは世界最大級のLGBTQプライドの祝祭に育っている。",
    ),
    f: t(
      "The 1978 marchers who were arrested had their charges eventually dropped, and in 2016 New South Wales Police issued a formal apology for how that first march was handled decades earlier.|A los manifestantes detenidos en 1978 finalmente se les retiraron los cargos, y en 2016 la Policía de Nueva Gales del Sur emitió una disculpa formal por cómo se gestionó aquella primera marcha décadas antes.|Les manifestants arrêtés en 1978 virent finalement leurs charges abandonnées, et en 2016 la police de Nouvelle-Galles du Sud présenta des excuses officielles pour la manière dont cette première marche avait été gérée des décennies plus tôt.|1978年に逮捕された行進の参加者たちの容疑は最終的に取り下げられ、2016年にはニューサウスウェールズ州警察が、数十年前のその最初の行進の扱いについて正式に謝罪した。",
    ),
  },
  {
    e: "🎉",
    n: t("Moomba, a festival with a name nobody agrees on|Moomba, un festival cuyo nombre nadie termina de aclarar|Moomba, un festival au nom que personne ne s'accorde à expliquer|由来の定まらない名を持つ祭り、ムーンバ"),
    t: t(
      "Melbourne's free autumn festival Moomba has run since 1955 with a parade, fireworks and water-ski shows on the Yarra River, and for decades organisers claimed its name meant \"let's get together and have fun\" in a local Aboriginal language, a translation Aboriginal language experts have since disputed as inaccurate or invented. The festival has kept the name regardless, while newer publicity has quietly dropped the old claim about its meaning.|El festival otoñal gratuito de Melbourne, Moomba, se celebra desde 1955 con desfile, fuegos artificiales y espectáculos de esquí acuático en el río Yarra, y durante décadas los organizadores afirmaron que su nombre significaba «juntémonos y divirtámonos» en una lengua aborigen local, traducción que expertos en esas lenguas han cuestionado después como inexacta o inventada.|Le festival d'automne gratuit de Melbourne, Moomba, se tient depuis 1955 avec défilé, feux d'artifice et spectacles de ski nautique sur la rivière Yarra, et pendant des décennies les organisateurs ont affirmé que son nom signifiait « réunissons-nous et amusons-nous » dans une langue aborigène locale, une traduction que des spécialistes de ces langues ont depuis jugée inexacte ou inventée.|メルボルンの無料の秋祭りムーンバは1955年から続き、パレードや花火、ヤラ川での水上スキーの披露が行われる。主催者は長年、この名は地元のアボリジナル語で「集まって楽しもう」を意味すると説明してきたが、その言語の専門家たちはのちに、この訳は不正確か、あるいは作られたものだと異議を唱えている。祭りはそれでもこの名前を使い続けているが、近年の広報では意味についてのその説明はひっそりと取り下げられている。",
    ),
    f: t(
      "The disputed translation has been publicly acknowledged by the festival's own organisers in recent years, making Moomba a rare case where a long-repeated piece of local lore about a word's meaning was corrected on the record rather than left uncorrected.|La traducción cuestionada ha sido reconocida públicamente por los propios organizadores del festival en años recientes, lo que hace de Moomba un caso poco común en que una idea local repetida durante mucho tiempo sobre el significado de una palabra fue corregida abiertamente.|La traduction contestée a été reconnue publiquement par les organisateurs du festival eux-mêmes ces dernières années, faisant de Moomba un cas rare où une croyance locale longtemps répétée sur le sens d'un mot a été corrigée publiquement plutôt que laissée telle quelle.|この訳への疑義は近年、祭りの主催者自身によって公に認められており、ムーンバはある言葉の意味についての長年繰り返された地域の言い伝えが、そのまま放置されず公式に訂正された珍しい例となっている。",
    ),
  },
];
