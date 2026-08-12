/**
 * イギリスのクイズ(40問)。
 *
 * 難易度は1〜10で、基準は他の盤面と同じく「その国の外にいる一般的な人が
 * どれくらい答えられそうか」。
 *   1〜3 … 来たことがなくても常識で解ける
 *   4〜6 … 旅行したり少し調べたことがあれば分かる
 *   7〜8 … 理由が土地に結びついていて、踏み込んだ知識が要る
 *   9〜10 … 現地の人か、強い関心のある人でないと難しい
 *
 * ## 都市カードとの重なりについて
 *
 * 都市カード(42件)が扱う具体的な事実(ビッグベンのひび・ロンドン地下鉄・
 * ベケット暗殺・ストーンヘンジの運搬・シェイクスピア・リチャード3世・
 * ベン・ネヴィス・ネス湖・タイタニック号など)はここでは問わない。
 * 代わりに、通貨・言語・国のかたち・政治制度・食・日常語彙など、
 * **都市カードが触れていない主題**を選んである。
 *
 * 選択肢は3つ。正解の位置(`a`)は 0/1/2 がほぼ同数になるよう散らしてある。
 */
function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

/** 1問を組み立てる。`o` は選択肢の配列、`a` は正解の添字。 */
function q(difficulty, question, options, a, fact) {
  return { difficulty, q: t(question), o: options.map(t), a, f: t(fact) };
}

export const UK_QUIZ = [
  q(
    1,
    "What is the capital of the United Kingdom?|¿Cuál es la capital del Reino Unido?|Quelle est la capitale du Royaume-Uni ?|イギリスの首都はどこか?",
    [
      "London|Londres|Londres|ロンドン",
      "Manchester|Mánchester|Manchester|マンチェスター",
      "Liverpool|Liverpool|Liverpool|リヴァプール",
    ],
    0,
    "London has been the seat of government since the medieval period, and its wider metropolitan area now holds roughly a eighth of the entire UK population.|Londres es sede de gobierno desde la época medieval, y su área metropolitana alberga hoy a cerca de un octavo de toda la población del Reino Unido.|Londres est le siège du gouvernement depuis l'époque médiévale, et son aire métropolitaine abrite aujourd'hui près d'un huitième de la population totale du Royaume-Uni.|ロンドンは中世から政治の中心であり続けており、その大都市圏にはいまや英国全体の人口のおよそ8分の1が暮らす。",
  ),
  q(
    1,
    "What language do most people in the United Kingdom speak?|¿Qué idioma habla la mayoría de la gente en el Reino Unido?|Quelle langue la plupart des habitants du Royaume-Uni parlent-ils ?|イギリスで多くの人が話す言語は?",
    [
      "French|Francés|Français|フランス語",
      "German|Alemán|Allemand|ドイツ語",
      "English|Inglés|Anglais|英語",
    ],
    2,
    "English developed from the Germanic speech of Anglo-Saxon settlers, later reshaped by centuries of Norse and Norman French influence, which is why it still carries thousands of French-derived words alongside its Germanic core.|El inglés se desarrolló a partir del habla germánica de los colonos anglosajones, remodelada después por siglos de influencia nórdica y normanda-francesa.|L'anglais s'est développé à partir du parler germanique des colons anglo-saxons, remodelé ensuite par des siècles d'influence norroise et normande-française.|英語はアングロサクソン人の話したゲルマン語系の言葉から発展し、その後何世紀にもわたる古ノルド語とノルマン・フランス語の影響で形を変えた。いまもゲルマン語の核に加えて何千ものフランス語由来の単語を抱えているのはそのためである。",
  ),
  q(
    1,
    "Which continent is the United Kingdom part of?|¿A qué continente pertenece el Reino Unido?|De quel continent le Royaume-Uni fait-il partie ?|イギリスが属する大陸は?",
    [
      "Europe|Europa|Europe|ヨーロッパ",
      "Asia|Asia|Asie|アジア",
      "Africa|África|Afrique|アフリカ",
    ],
    0,
    "The UK sits off the northwest coast of mainland Europe, separated from France by a strait as narrow as 33 kilometres at its closest point, close enough that a tunnel now runs beneath it.|El Reino Unido se sitúa frente a la costa noroeste de la Europa continental, separado de Francia por un estrecho de apenas 33 km en su punto más cercano.|Le Royaume-Uni se trouve au large de la côte nord-ouest de l'Europe continentale, séparé de la France par un détroit large de seulement 33 km à son point le plus étroit.|イギリスはヨーロッパ大陸の北西沖に位置し、最も狭い地点でわずか33kmの海峡でフランスと隔てられている。その近さゆえ、いまは海峡の下にトンネルまで通っている。",
  ),
  q(
    2,
    "What is the currency of the United Kingdom?|¿Cuál es la moneda del Reino Unido?|Quelle est la monnaie du Royaume-Uni ?|イギリスの通貨単位は?",
    [
      "Euro|Euro|Euro|ユーロ",
      "Yen|Yen|Yen|円",
      "Pound sterling|Libra esterlina|Livre sterling|ポンド(スターリング・ポンド)",
    ],
    2,
    "Sterling has been minted in some form since Anglo-Saxon times, making it one of the oldest currencies still in use anywhere, and the UK chose to keep it rather than adopt the euro when it joined what later became the European Union.|La libra esterlina se acuña de alguna forma desde la época anglosajona, lo que la convierte en una de las monedas más antiguas aún en uso, y el Reino Unido optó por conservarla en vez de adoptar el euro.|La livre sterling est frappée sous une forme ou une autre depuis l'époque anglo-saxonne, ce qui en fait l'une des plus anciennes monnaies encore en usage, et le Royaume-Uni choisit de la conserver plutôt que d'adopter l'euro.|スターリング・ポンドはアングロサクソン時代から何らかの形で鋳造され続けており、いまも使われている通貨としては世界最古級である。イギリスは後に欧州連合となる枠組みに加わった際も、ユーロではなくこの通貨を使い続けることを選んだ。",
  ),
  q(
    2,
    "Which side of the road do cars drive on in the United Kingdom?|¿Por qué lado de la carretera circulan los coches en el Reino Unido?|De quel côté de la route les voitures roulent-elles au Royaume-Uni ?|イギリスで車が走行するのは道路のどちら側か?",
    [
      "The right|La derecha|La droite|右側",
      "It depends on the region|Depende de la región|Cela dépend de la région|地方によって異なる",
      "The left|La izquierda|La gauche|左側",
    ],
    2,
    "Driving on the left is thought to descend from mounted travellers keeping their sword arm, usually the right, free to face oncoming traffic, and Britain formalised the rule by law in 1835 while spreading it to many former colonies.|Se cree que conducir por la izquierda desciende de los jinetes que mantenían libre su brazo de la espada, normalmente el derecho, frente al tráfico que venía de frente, y Gran Bretaña formalizó la norma por ley en 1835.|On pense que rouler à gauche remonte aux cavaliers gardant leur bras d'épée, généralement le droit, libre face à la circulation venant en sens inverse, et la Grande-Bretagne formalisa la règle par la loi en 1835.|左側通行の起源は、馬に乗った旅人が対向者に向けて剣を持つ利き腕(たいてい右腕)を自由にしておいたことにさかのぼるとされる。イギリスは1835年に法律でこの規則を定め、多くの旧植民地にも広めた。",
  ),
  q(
    2,
    "What is the nickname commonly used for the flag of the United Kingdom?|¿Cómo se apoda comúnmente a la bandera del Reino Unido?|Comment surnomme-t-on communément le drapeau du Royaume-Uni ?|イギリスの国旗の通称は?",
    [
      "Union Jack|Union Jack|Union Jack|ユニオンジャック",
      "The Tricolour|El Tricolor|Le Tricolore|三色旗",
      "The Maple Leaf|La Hoja de Arce|La Feuille d'érable|メープルリーフ",
    ],
    0,
    "The flag layers the crosses of three patron saints — England's St George, Scotland's St Andrew and Ireland's St Patrick — though Wales, already united with England when the flag was first designed, has never had its own cross added.|La bandera superpone las cruces de tres santos patronos —san Jorge de Inglaterra, san Andrés de Escocia y san Patricio de Irlanda—, aunque Gales, ya unido a Inglaterra cuando se diseñó la bandera, nunca ha visto añadida su propia cruz.|Le drapeau superpose les croix de trois saints patrons — saint Georges pour l'Angleterre, saint André pour l'Écosse et saint Patrick pour l'Irlande —, bien que le pays de Galles, déjà uni à l'Angleterre lors de la conception du drapeau, n'ait jamais vu sa propre croix ajoutée.|この旗はイングランドの聖ジョージ・スコットランドの聖アンドルー・アイルランドの聖パトリックという3人の守護聖人の十字を重ねているが、旗が最初に作られた時点ですでにイングランドと一体化していたウェールズの十字は一度も加えられていない。",
  ),
  q(
    2,
    "What hot drink is most closely associated with British daily life?|¿Qué bebida caliente se asocia más con la vida cotidiana británica?|Quelle boisson chaude est la plus associée au quotidien britannique ?|イギリスの日常生活と最も結びつく温かい飲み物は?",
    [
      "Coffee|Café|Café|コーヒー",
      "Hot chocolate|Chocolate caliente|Chocolat chaud|ホットチョコレート",
      "Tea|Té|Thé|紅茶",
    ],
    2,
    "Tea only became a mass drink after the East India Company began large-scale imports in the 18th century, yet it embedded itself so deeply that offering a visitor a cup remains close to an automatic reflex in most households.|El té solo se convirtió en bebida de masas después de que la Compañía de las Indias Orientales iniciara importaciones a gran escala en el siglo XVIII, y aun así se arraigó tan hondo que ofrecer una taza a una visita sigue siendo casi un reflejo automático.|Le thé ne devint une boisson de masse qu'après que la Compagnie des Indes orientales eut lancé des importations à grande échelle au XVIIIe siècle, et pourtant il s'enracina si profondément qu'offrir une tasse à un visiteur reste presque un réflexe automatique.|紅茶が大衆の飲み物になったのは18世紀に東インド会社が大規模な輸入を始めてからにすぎないが、それでもあまりに深く根付き、来客に一杯出すのはいまもほぼ反射的な習わしになっている。",
  ),
  q(
    3,
    "What is the name of the popular dish of battered, deep-fried fish served with potato chips?|¿Cómo se llama el plato popular de pescado rebozado y frito servido con patatas fritas?|Comment s'appelle le plat populaire de poisson pané et frit, servi avec des frites ?|衣を付けて揚げた魚とポテトフライを合わせた人気料理は?",
    [
      "Paella|Paella|Paella|パエリア",
      "Fish and chips|Pescado con patatas fritas|Fish and chips|フィッシュ・アンド・チップス",
      "Sushi|Sushi|Sushi|寿司",
    ],
    1,
    "The dish likely combined two separate immigrant traditions, fried fish brought by Jewish refugees and fried chips popularised in the north of England, and it became such a wartime staple that it was one of the few foods never rationed in either world war.|El plato probablemente combinó dos tradiciones de inmigrantes distintas, el pescado frito traído por refugiados judíos y las patatas fritas popularizadas en el norte de Inglaterra, y se convirtió en un básico bélico tan esencial que fue uno de los pocos alimentos nunca racionados.|Le plat combina sans doute deux traditions d'immigrants distinctes, le poisson frit apporté par des réfugiés juifs et les frites popularisées dans le nord de l'Angleterre, et il devint un aliment de guerre si essentiel qu'il fut l'un des rares jamais rationnés.|この料理はユダヤ系難民が持ち込んだ揚げ魚と、イングランド北部で広まった揚げポテトという二つの移民の伝統が組み合わさって生まれたとされ、二度の世界大戦を通じて配給の対象にならなかった数少ない食べ物の一つになるほど定着した。",
  ),
  q(
    3,
    "How many nations make up the United Kingdom?|¿Cuántas naciones forman el Reino Unido?|Combien de nations composent le Royaume-Uni ?|イギリスを構成する「国」の数はいくつか?",
    [
      "Three|Tres|Trois|3つ",
      "Five|Cinco|Cinq|5つ",
      "Four|Cuatro|Quatre|4つ",
    ],
    0,
    "England, Scotland, Wales and Northern Ireland each keep the formal status of a \"country\" within the union, which is why the UK fields four separate national football teams rather than one, an arrangement that regularly confuses first-time visitors.|Inglaterra, Escocia, Gales e Irlanda del Norte conservan cada una el estatus formal de «país» dentro de la unión, por lo que el Reino Unido presenta cuatro selecciones nacionales de fútbol distintas en vez de una.|L'Angleterre, l'Écosse, le pays de Galles et l'Irlande du Nord conservent chacun le statut officiel de « pays » au sein de l'union, ce qui explique que le Royaume-Uni aligne quatre équipes nationales de football distinctes plutôt qu'une seule.|イングランド・スコットランド・ウェールズ・北アイルランドはそれぞれ連合王国の中で正式に「国」の地位を保っており、そのためイギリスはサッカーの代表チームを一つではなく四つ持つ。これは初めて訪れる人をよく戸惑わせる仕組みである。",
  ),
  q(
    3,
    "Which of these is a country within the United Kingdom?|¿Cuál de estos es un país dentro del Reino Unido?|Lequel de ces pays fait partie du Royaume-Uni ?|イギリスを構成する国はどれか?",
    [
      "The Republic of Ireland|La República de Irlanda|La République d'Irlande|アイルランド共和国",
      "Portugal|Portugal|Portugal|ポルトガル",
      "Scotland|Escocia|Écosse|スコットランド",
    ],
    2,
    "The Republic of Ireland is a fully separate country that left the union in 1922, which is a common point of confusion, since it still shares the island of Ireland with Northern Ireland, which did remain part of the UK.|La República de Irlanda es un país totalmente aparte que dejó la unión en 1922, un punto de confusión habitual, ya que sigue compartiendo la isla de Irlanda con Irlanda del Norte, que sí permaneció en el Reino Unido.|La République d'Irlande est un pays entièrement séparé, qui a quitté l'union en 1922, source fréquente de confusion, puisqu'elle partage toujours l'île d'Irlande avec l'Irlande du Nord, restée pour sa part dans le Royaume-Uni.|アイルランド共和国は1922年に連合を離脱した完全に別の国であり、よく混同される点である。ただしいまもアイルランド島を北アイルランドと分かち合っており、北アイルランドのほうはイギリスにとどまった。",
  ),
  q(
    3,
    "What red vehicle is iconic in British cities, with two levels for passengers?|¿Qué vehículo rojo, con dos pisos para pasajeros, es icónico en las ciudades británicas?|Quel véhicule rouge à deux étages pour les passagers est emblématique des villes britanniques ?|2階建てで乗客を乗せる、イギリスの町を象徴する赤い乗り物は?",
    [
      "Tram|Tranvía|Tramway|路面電車",
      "Cable car|Teleférico|Téléphérique|ケーブルカー",
      "Double-decker bus|Autobús de dos pisos|Bus à impériale|2階建てバス",
    ],
    2,
    "The double-decker grew out of horse-drawn omnibuses that already stacked outdoor seating on the roof in the 19th century, and London's red livery became standard only after the city's transport network was unified under one operator in 1933.|El autobús de dos pisos surgió de los ómnibus tirados por caballos que ya apilaban asientos al aire libre en el techo en el siglo XIX, y la librea roja de Londres solo se estandarizó tras unificarse la red de transporte bajo un solo operador en 1933.|Le bus à impériale est né des omnibus à chevaux qui empilaient déjà des places en plein air sur le toit au XIXe siècle, et la livrée rouge de Londres ne devint standard qu'après l'unification du réseau de transport sous un seul opérateur en 1933.|2階建てバスは19世紀、屋根の上に屋外席を重ねた馬車の乗合馬車から発展した。ロンドンの赤い車体が標準になったのは、1933年に町の交通網が一つの事業者のもとに統合されてからのことにすぎない。",
  ),
  q(
    4,
    "How many pence make up one pound sterling?|¿Cuántos peniques forman una libra esterlina?|Combien de pence composent une livre sterling ?|1ポンドは何ペンスか?",
    [
      "50 pence|50 peniques|50 pence|50ペンス",
      "100 pence|100 peniques|100 pence|100ペンス",
      "500 pence|500 peniques|500 pence|500ペンス",
    ],
    1,
    "The pound was decimalised into 100 pence only in 1971, replacing a far more complicated older system of pounds, shillings and pence in which twelve pence made a shilling and twenty shillings made a pound.|La libra se decimalizó en 100 peniques recién en 1971, sustituyendo un sistema anterior mucho más complicado de libras, chelines y peniques, en el que doce peniques hacían un chelín y veinte chelines una libra.|La livre ne fut décimalisée en 100 pence qu'en 1971, remplaçant un système antérieur bien plus compliqué de livres, shillings et pence, où douze pence faisaient un shilling et vingt shillings une livre.|ポンドが100ペンスに十進法化されたのは1971年になってからのことで、それ以前ははるかに複雑な、12ペンスで1シリング、20シリングで1ポンドという制度だった。",
  ),
  q(
    4,
    "What is the London Underground railway system popularly nicknamed?|¿Cómo se apoda popularmente al sistema de metro de Londres?|Comment le métro de Londres est-il familièrement surnommé ?|ロンドンの地下鉄の通称は?",
    [
      "The Loop|El Bucle|La Boucle|ザ・ループ",
      "The Metro|El Metro|Le Métro|メトロ",
      "The Tube|El Tubo|Le Tube|チューブ",
    ],
    2,
    "The nickname comes from the circular, tube-shaped tunnels bored for the deepest lines from the 1890s onward, a construction method different from the shallower \"cut and cover\" tunnels of the original 1863 line.|El apodo viene de los túneles circulares en forma de tubo excavados para las líneas más profundas desde la década de 1890, un método de construcción distinto de las excavaciones más superficiales «a cielo abierto» de la línea original de 1863.|Le surnom vient des tunnels circulaires en forme de tube creusés pour les lignes les plus profondes à partir des années 1890, une méthode de construction différente des tranchées couvertes moins profondes de la ligne d'origine de 1863.|この愛称は、1890年代以降に最も深い路線のために掘られた円筒形のトンネルに由来する。1863年開業の最初の路線が使った、地表近くを掘って埋め戻す浅い工法とは異なる方式である。",
  ),
  q(
    4,
    "What surname has the British royal family used since 1917?|¿Qué apellido usa la familia real británica desde 1917?|Quel nom de famille la famille royale britannique porte-t-elle depuis 1917 ?|1917年以来、英国王室が名乗る家名は?",
    [
      "Windsor|Windsor|Windsor|ウィンザー",
      "Tudor|Tudor|Tudor|テューダー",
      "Stuart|Estuardo|Stuart|スチュアート",
    ],
    0,
    "The family changed its name from the German-sounding Saxe-Coburg and Gotha during the First World War, when anti-German feeling ran high, choosing Windsor after the castle that has served as a royal residence for over 900 years.|La familia cambió su apellido, de origen alemán, Sajonia-Coburgo-Gotha, durante la Primera Guerra Mundial, cuando el sentimiento antialemán era intenso, y eligió Windsor por el castillo que ha sido residencia real durante más de 900 años.|La famille changea son nom, à consonance allemande, de Saxe-Cobourg-Gotha, pendant la Première Guerre mondiale, période de sentiment antiallemand intense, choisissant Windsor d'après le château qui sert de résidence royale depuis plus de 900 ans.|王室は第一次大戦中、反ドイツ感情が高まるなかでドイツ風の家名「ザクセン=コーブルク=ゴータ」を改め、900年以上にわたり王室の居城となってきた城にちなんで「ウィンザー」を選んだ。",
  ),
  q(
    4,
    "Which flower is the national emblem of England?|¿Qué flor es el emblema nacional de Inglaterra?|Quelle fleur est l'emblème national de l'Angleterre ?|イングランドの国花は?",
    [
      "Tulip|Tulipán|Tulipe|チューリップ",
      "Lotus|Loto|Lotus|ハス",
      "Rose|Rosa|Rose|バラ",
    ],
    2,
    "The rose is said to commemorate the Wars of the Roses, a 15th-century civil war between the House of Lancaster, symbolised by a red rose, and the House of York, symbolised by a white one, later merged into the red-and-white Tudor rose.|Se dice que la rosa conmemora la Guerra de las Dos Rosas, una guerra civil del siglo XV entre la Casa de Lancaster, simbolizada por una rosa roja, y la Casa de York, simbolizada por una blanca.|La rose est censée commémorer la guerre des Deux-Roses, une guerre civile du XVe siècle entre la maison de Lancastre, symbolisée par une rose rouge, et la maison d'York, symbolisée par une rose blanche.|バラはイングランドの国花で、15世紀にランカスター家(赤バラ)とヨーク家(白バラ)が争った薔薇戦争を偲ぶものとされる。のちに両家は赤と白を重ねたテューダー・ローズへと統合された。",
  ),
  q(
    5,
    "Which bat-and-ball sport, with matches sometimes lasting up to five days, originated in England?|¿Qué deporte de bate y pelota, con partidos que a veces duran hasta cinco días, se originó en Inglaterra?|Quel sport de batte et de balle, dont les matchs peuvent durer jusqu'à cinq jours, est né en Angleterre ?|試合が最長5日にも及ぶことがある、イングランド発祥のバットとボールの競技は?",
    [
      "Baseball|Béisbol|Baseball|野球",
      "Rugby league|Rugby league|Rugby à XIII|ラグビーリーグ",
      "Cricket|Críquet|Cricket|クリケット",
    ],
    2,
    "The longest form, called Test cricket, can end after five full days of play in a draw with no winner at all, an outcome so ordinary to fans that it is not considered a failure of the match but a legitimate result in itself.|La modalidad más larga, el críquet de test, puede terminar tras cinco días completos de juego en empate sin ganador alguno, un desenlace tan normal para los aficionados que no se considera un fallo del partido, sino un resultado legítimo en sí mismo.|La forme la plus longue, le test-match, peut s'achever après cinq jours pleins de jeu sur un match nul sans vainqueur, un dénouement si banal pour les amateurs qu'il n'est pas perçu comme un échec du match mais comme un résultat légitime en soi.|最も長い形式であるテストクリケットは、丸5日間戦っても引き分けで勝者が出ないまま終わることがある。ファンにとってはあまりに当たり前の結末で、試合の失敗ではなく、それ自体が正当な結果とみなされる。",
  ),
  q(
    5,
    "What is a traditional cooked breakfast of eggs, bacon, sausages, beans and more called?|¿Cómo se llama un desayuno tradicional cocinado con huevos, beicon, salchichas, judías y más?|Comment appelle-t-on un petit-déjeuner traditionnel cuisiné avec œufs, bacon, saucisses, haricots et plus ?|卵・ベーコン・ソーセージ・豆などを調理して出す伝統的な朝食の名は?",
    [
      "Full English|Full English|Full English|フル・イングリッシュ",
      "Continental breakfast|Desayuno continental|Petit-déjeuner continental|コンチネンタル・ブレックファスト",
      "Brunch special|Especial de brunch|Spécial brunch|ブランチ・スペシャル",
    ],
    0,
    "A proper Full English is expected to include fried or grilled tomato and mushrooms alongside the meat and eggs, and cafés serving it are often judged by regulars on the quality of just one component: the baked beans.|Un auténtico Full English debe incluir tomate y champiñones fritos o asados junto con la carne y los huevos, y los clientes habituales suelen juzgar los cafés que lo sirven por la calidad de un solo componente: las judías cocidas.|Un vrai Full English doit inclure tomate et champignons frits ou grillés en plus de la viande et des œufs, et les habitués jugent souvent les cafés qui le servent sur la qualité d'un seul élément : les haricots à la sauce tomate.|本格的なフル・イングリッシュには肉と卵に加え、焼いたトマトやきのこも欠かせないとされる。常連客はしばしば、店の良し悪しをたった一つの要素――ベイクドビーンズの出来――で判断する。",
  ),
  q(
    5,
    "What is the UK's public broadcaster, founded in 1922?|¿Cuál es la emisora pública del Reino Unido, fundada en 1922?|Quelle est la radiodiffusion publique du Royaume-Uni, fondée en 1922 ?|1922年に設立された、イギリスの公共放送局は?",
    [
      "Sky|Sky|Sky|スカイ",
      "ITV|ITV|ITV|ITV",
      "The BBC|La BBC|La BBC|BBC",
    ],
    2,
    "The BBC is funded largely by an annual licence fee charged to households that watch live television, a model that has survived over a century partly because it keeps the broadcaster's programming free of advertising.|La BBC se financia sobre todo con un canon anual que pagan los hogares que ven televisión en directo, un modelo que ha sobrevivido más de un siglo en parte porque mantiene su programación libre de publicidad.|La BBC est financée en grande partie par une redevance annuelle facturée aux foyers regardant la télévision en direct, un modèle qui a survécu plus d'un siècle en partie parce qu'il maintient sa programmation libre de publicité.|BBCは主に、生放送のテレビを見る世帯に課される年間受信許可料でまかなわれている。この仕組みが1世紀以上続いているのは、放送内容を広告なしに保てるという理由も大きい。",
  ),
  q(
    5,
    "Boxing Day, a public holiday, falls the day after which celebration?|El Boxing Day, festivo público, cae el día después de qué celebración?|Le Boxing Day, jour férié, tombe le lendemain de quelle fête ?|祝日ボクシング・デーは、何の翌日にあたるか?",
    [
      "New Year's Day|Año Nuevo|Le jour de l'An|元日",
      "Christmas Day|Navidad|Noël|クリスマス",
      "Easter Sunday|Domingo de Pascua|Le dimanche de Pâques|復活祭の日曜日",
    ],
    1,
    "One popular explanation traces the name to alms boxes opened in churches on the 26th to give to the poor, while another points to servants historically receiving a boxed gift and the day off after working through Christmas itself.|Una explicación popular remonta el nombre a las cajas de limosnas abiertas en las iglesias el día 26 para dar a los pobres, mientras que otra apunta a que los sirvientes recibían tradicionalmente un regalo en caja y el día libre.|Une explication populaire fait remonter le nom aux troncs pour les pauvres ouverts dans les églises le 26 pour la charité, tandis qu'une autre évoque les domestiques recevant traditionnellement un cadeau en boîte et leur jour de congé.|よくある説では、この名は26日に教会で貧者への施しの箱を開けたことに由来するとされる。もう一つの説では、クリスマス当日まで働いた使用人に箱入りの贈り物と休日が与えられた慣習にちなむとされる。",
  ),
  q(
    5,
    "Besides English, which language holds official status in Wales?|Además del inglés, ¿qué idioma tiene estatus oficial en Gales?|Outre l'anglais, quelle langue a un statut officiel au pays de Galles ?|英語のほかにウェールズで公用語の地位を持つ言語は?",
    [
      "Welsh|Galés|Gallois|ウェールズ語",
      "Scottish Gaelic|Gaélico escocés|Gaélique écossais|スコットランド・ゲール語",
      "Cornish|Córnico|Cornique|コーンウォール語",
    ],
    0,
    "Welsh is a Celtic language with road signs, school lessons and a dedicated television channel, and roughly one in five people in Wales report being able to speak it, a share the Welsh government has set formal targets to raise.|El galés es una lengua celta presente en señales de tráfico, clases escolares y un canal de televisión propio, y aproximadamente uno de cada cinco habitantes de Gales dice poder hablarlo.|Le gallois est une langue celtique présente sur les panneaux routiers, dans les cours à l'école et sur une chaîne de télévision dédiée, et environ une personne sur cinq au pays de Galles déclare pouvoir le parler.|ウェールズ語はケルト系の言語で、道路標識や学校の授業、専用のテレビチャンネルにまで使われている。ウェールズの人口のおよそ5人に1人が話せると答えており、ウェールズ政府はこの割合を高める公式目標まで掲げている。",
  ),
  q(
    6,
    "What is the longest river entirely within the United Kingdom?|¿Cuál es el río más largo situado enteramente dentro del Reino Unido?|Quel est le plus long fleuve entièrement situé au Royaume-Uni ?|イギリス国内で完結する最も長い川は?",
    [
      "The Severn|El Severn|La Severn|セヴァン川",
      "The Thames|El Támesis|La Tamise|テムズ川",
      "The Trent|El Trent|La Trent|トレント川",
    ],
    0,
    "The Severn runs 354 kilometres from mid-Wales to the Bristol Channel, narrowly beating the Thames, and the Severn Bore, a tidal wave that surges upriver at certain high tides, is famous enough that surfers travel from abroad to ride it.|El Severn recorre 354 km desde el centro de Gales hasta el canal de Bristol, superando por poco al Támesis, y el Severn Bore, una ola de marea que sube por el río en ciertas pleamares, es tan famosa que hay surfistas que viajan desde el extranjero para surfearla.|La Severn parcourt 354 km du centre du pays de Galles jusqu'au canal de Bristol, devançant de peu la Tamise, et le mascaret de la Severn, une vague de marée qui remonte le fleuve à certaines grandes marées, est assez célèbre pour que des surfeurs viennent de l'étranger pour la chevaucher.|セヴァン川はウェールズ中部からブリストル海峡まで354kmを流れ、テムズ川をわずかに上回る長さを持つ。特定の大潮の際に川をさかのぼる「セヴァン・ボア」という潮津波は有名で、海外からわざわざそれに乗りにサーファーがやって来るほどである。",
  ),
  q(
    6,
    "What is a person from Liverpool traditionally nicknamed?|¿Cómo se apoda tradicionalmente a una persona de Liverpool?|Comment surnomme-t-on traditionnellement une personne de Liverpool ?|リヴァプール出身者を伝統的に呼ぶ愛称は?",
    [
      "A Cockney|Un cockney|Un Cockney|コックニー",
      "A Geordie|Un geordie|Un Geordie|ジョーディー",
      "A Scouser|Un scouser|Un Scouser|スカウザー",
    ],
    2,
    "The nickname comes from \"lobscouse\", a cheap sailors' stew of meat and vegetables once common in the port city's poorer households, and the local accent and dialect are themselves referred to simply as \"Scouse\".|El apodo viene de «lobscouse», un guiso barato de marineros con carne y verduras que antes era común en los hogares más pobres de la ciudad portuaria, y al propio acento y dialecto local se los llama simplemente «Scouse».|Le surnom vient de « lobscouse », un ragoût bon marché de marins à base de viande et de légumes autrefois courant dans les foyers modestes de la ville portuaire, et l'accent et le dialecte locaux sont eux-mêmes appelés simplement « Scouse ».|この愛称は「ロブスカウス」という、かつて港町の貧しい家庭でよく作られた肉と野菜の安い船乗りのシチューに由来する。地元の訛りや方言そのものも単に「スカウス」と呼ばれる。",
  ),
  q(
    6,
    "What is London's main theatre district, known for big commercial shows, called?|¿Cómo se llama el principal distrito teatral de Londres, conocido por sus grandes espectáculos comerciales?|Comment appelle-t-on le principal quartier théâtral de Londres, connu pour ses grands spectacles commerciaux ?|大規模な商業演劇で知られるロンドンの主要な劇場街の名は?",
    [
      "The West End|El West End|Le West End|ウェスト・エンド",
      "The East End|El East End|L'East End|イースト・エンド",
      "The South Bank|El South Bank|Le South Bank|サウス・バンク",
    ],
    0,
    "The West End's roughly 40 theatres compete directly with New York's Broadway for staging the world's longest-running musicals, and several venues have hosted the same production continuously for well over three decades.|Los aproximadamente 40 teatros del West End compiten directamente con Broadway de Nueva York por representar los musicales más longevos del mundo, y varios locales han acogido la misma producción de forma ininterrumpida durante más de tres décadas.|Les quelque 40 théâtres du West End rivalisent directement avec Broadway à New York pour la mise en scène des comédies musicales les plus durables au monde, et plusieurs salles accueillent la même production sans interruption depuis plus de trente ans.|ウェスト・エンドのおよそ40の劇場は、世界で最も長く続くミュージカルの上演をめぐってニューヨークのブロードウェイと直接張り合っている。いくつかの劇場は同じ演目を30年以上も途切れず上演し続けている。",
  ),
  q(
    6,
    "Roughly how long did Queen Elizabeth II, Britain's longest-reigning monarch, rule?|¿Cuánto tiempo reinó aproximadamente Isabel II, la monarca británica de mayor reinado?|Combien de temps régna environ Élisabeth II, la monarque britannique au règne le plus long ?|英国史上最長の在位となったエリザベス2世の在位期間はおよそどれくらいか?",
    [
      "50 years|50 años|50 ans|50年",
      "70 years|70 años|70 ans|70年",
      "90 years|90 años|90 ans|90年",
    ],
    1,
    "She acceded in 1952 at the age of 25 following her father's death and reigned until her own death in 2022, seeing fifteen different prime ministers take office over the course of her reign.|Accedió al trono en 1952 a los 25 años tras la muerte de su padre y reinó hasta su propia muerte en 2022, viendo asumir el cargo a quince primeros ministros distintos a lo largo de su reinado.|Elle accéda au trône en 1952 à 25 ans après la mort de son père et régna jusqu'à sa propre mort en 2022, voyant quinze premiers ministres différents entrer en fonction au cours de son règne.|彼女は1952年、父の死を受けて25歳で即位し、2022年に自身が亡くなるまで在位した。その治世のあいだに15人もの首相が就任するのを見届けた。",
  ),
  q(
    6,
    "Which sauce-covered dessert is traditionally set alight with brandy before serving at Christmas?|¿Qué postre bañado en salsa se enciende tradicionalmente con brandy antes de servirlo en Navidad?|Quel dessert nappé est traditionnellement flambé au brandy avant d'être servi à Noël ?|クリスマスに出す前、伝統的にブランデーで火をつける濃厚なデザートは?",
    [
      "Mince pie|Pastel de picadillo|Mince pie|ミンスパイ",
      "Trifle|Trifle|Trifle|トライフル",
      "Christmas pudding|Pudín de Navidad|Pudding de Noël|クリスマス・プディング",
    ],
    0,
    "Older recipes called for a coin to be stirred into the mixture, with whoever found it in their slice said to receive good luck for the year, and the pudding traditionally rests for weeks before Christmas to let its flavour deepen.|Las recetas antiguas pedían mezclar una moneda en la masa, y a quien la encontrara en su porción se le auguraba buena suerte para el año, y el pudín tradicionalmente reposa semanas antes de Navidad para que su sabor se asiente.|Les recettes anciennes demandaient de mélanger une pièce dans la préparation, celui qui la trouvait dans sa part se voyant promettre bonne chance pour l'année, et le pudding repose traditionnellement des semaines avant Noël pour que sa saveur se bonifie.|昔のレシピでは生地にコインを混ぜ込み、自分の一切れの中でそれを見つけた人はその年幸運に恵まれるとされた。プディングは伝統的にクリスマスの何週間も前から寝かせ、味をなじませる。",
  ),
  q(
    7,
    "What historic 1215 document limited the power of the English king for the first time?|¿Qué documento histórico de 1215 limitó por primera vez el poder del rey inglés?|Quel document historique de 1215 limita pour la première fois le pouvoir du roi anglais ?"
    + "|1215年、初めてイングランド王の権力を制限した歴史的文書は?",
    [
      "The Domesday Book|El Domesday Book|Le Domesday Book|ドゥームズデイ・ブック",
      "The Bill of Rights|La Declaración de Derechos|Le Bill of Rights|権利章典",
      "Magna Carta|La Carta Magna|La Grande Charte|マグナ・カルタ",
    ],
    2,
    "Rebellious barons forced King John to seal Magna Carta at Runnymede to stop him taxing and jailing them at will, and although most of its specific clauses have since been repealed, its principle that even a monarch is bound by law still underpins constitutions worldwide.|Barones rebeldes obligaron al rey Juan a sellar la Carta Magna en Runnymede para impedir que los gravara y encarcelara a su antojo, y aunque la mayoría de sus cláusulas específicas se han derogado desde entonces, su principio de que hasta un monarca está sujeto a la ley sigue sustentando constituciones en todo el mundo.|Des barons rebelles forcèrent le roi Jean à sceller la Grande Charte à Runnymede pour l'empêcher de les taxer et de les emprisonner à sa guise, et bien que la plupart de ses clauses précises aient depuis été abrogées, son principe selon lequel même un monarque est soumis au droit sous-tend toujours des constitutions à travers le monde.|反乱を起こした諸侯たちは、王が思うままに課税し投獄するのを止めさせるため、ラニーミードでジョン王にマグナ・カルタへの署名を強いた。個々の条項の多くはその後廃止されたが、「君主でさえ法に従う」という原則はいまも世界各地の憲法を支えている。",
  ),
  q(
    7,
    "In what year was the National Health Service (NHS) founded?|¿En qué año se fundó el Servicio Nacional de Salud (NHS)?|En quelle année le National Health Service (NHS) fut-il fondé ?|国民保健サービス(NHS)が設立されたのは何年か?",
    [
      "1918|1918|1918|1918年",
      "1948|1948|1948|1948年",
      "1965|1965|1965|1965年",
    ],
    1,
    "The NHS launched on 5 July 1948 on the founding idea that treatment should be free at the point of use regardless of ability to pay, funded instead through general taxation, a model that remains one of the most fiercely defended parts of British public life.|El NHS se lanzó el 5 de julio de 1948 sobre la idea fundacional de que el tratamiento debía ser gratuito en el momento de recibirlo, con independencia de la capacidad de pago, financiado en cambio con impuestos generales.|Le NHS fut lancé le 5 juillet 1948 sur l'idée fondatrice que les soins devaient être gratuits au point d'usage, indépendamment des moyens du patient, financés à la place par l'impôt général.|NHSは1948年7月5日、支払い能力に関わらず利用時には無料で診療を受けられるという理念のもと発足し、代わりに一般税で賄われることになった。この仕組みはいまも英国の公共生活の中で最も強く守られている柱の一つである。",
  ),
  q(
    7,
    "What is the informal nickname for London's historic financial district?|¿Cómo se apoda informalmente al histórico distrito financiero de Londres?|Comment surnomme-t-on familièrement le quartier financier historique de Londres ?|ロンドンの歴史ある金融街の通称は?",
    [
      "The City|La City|La City|ザ・シティ",
      "The Strand|El Strand|Le Strand|ザ・ストランド",
      "Whitehall|Whitehall|Whitehall|ホワイトホール",
    ],
    0,
    "The City of London is technically its own tiny local authority, with its own police force and boundary markers, occupying roughly the same square mile the Romans first walled nearly two thousand years ago.|La City de Londres es técnicamente su propia y diminuta autoridad local, con su propia policía y mojones fronterizos, y ocupa aproximadamente la misma milla cuadrada que los romanos amurallaron por primera vez hace casi dos mil años.|La City de Londres est techniquement sa propre petite autorité locale, avec sa propre police et ses propres bornes, occupant à peu près le même mile carré que les Romains fortifièrent il y a près de deux mille ans.|シティ・オブ・ロンドンは厳密には独自の小さな自治体で、独自の警察や境界標識まで持ち、ローマ人が約2000年前に初めて城壁で囲んだのとほぼ同じ「1平方マイル」の範囲を占めている。",
  ),
  q(
    7,
    "What is the East London wordplay tradition, where a phrase hints at a rhyming word left unsaid, called?|¿Cómo se llama la tradición del este de Londres en la que una frase insinúa una palabra que rima y queda sin decir?|Comment appelle-t-on la tradition ludique de l'est de Londres où une expression suggère un mot rimé qui reste tu ?|言葉を省略し、韻を踏む語をほのめかす、イーストロンドンの言葉遊びの伝統は?",
    [
      "Received Pronunciation|Pronunciación Recibida|Received Pronunciation|容認発音",
      "Cockney rhyming slang|Argot rimado cockney|L'argot rimé cockney|コックニー韻踏み俗語",
      "Estuary English|Inglés del estuario|L'anglais de l'estuaire|エスチュアリー英語",
    ],
    1,
    "\"Plates of meat\" for feet or \"dog and bone\" for phone are classic examples, and speakers traditionally drop the rhyming word entirely, leaving only the first part, so that \"use your loaf\" (loaf of bread = head) sounds like nonsense to outsiders.|«Plates of meat» (platos de carne) por «feet» (pies) o «dog and bone» (perro y hueso) por «phone» (teléfono) son ejemplos clásicos, y los hablantes suelen omitir del todo la palabra que rima, dejando solo la primera parte.|« Plates of meat » (assiettes de viande) pour « feet » (pieds) ou « dog and bone » (chien et os) pour « phone » (téléphone) en sont des exemples classiques, et les locuteurs omettent traditionnellement le mot rimé, ne laissant que la première partie.|足(feet)を意味する「プレイツ・オブ・ミート(肉の皿)」や、電話(phone)を意味する「ドッグ・アンド・ボーン(犬と骨)」が代表例である。話し手は伝統的に韻を踏む語そのものを省き、最初の部分だけを残すため、「use your loaf(頭を使え、loafはパン一斤で頭=headの意)」はよそ者には意味不明に聞こえる。",
  ),
  q(
    7,
    "What is the 1707 Act that formally united the Parliaments of England and Scotland called?|¿Cómo se llama el Acta de 1707 que unió formalmente los Parlamentos de Inglaterra y Escocia?|Comment appelle-t-on l'Acte de 1707 qui unit formellement les Parlements d'Angleterre et d'Écosse ?|イングランドとスコットランドの議会を正式に統合した1707年の法律は?",
    [
      "The Act of Settlement|El Acta de Establecimiento|L'Acte d'Établissement|王位継承法",
      "The Act of Union|El Acta de Unión|L'Acte d'Union|合同法",
      "The Act of Supremacy|El Acta de Supremacía|L'Acte de Suprématie|首長法",
    ],
    1,
    "The Act of Union created a single Kingdom of Great Britain with one parliament at Westminster, passed partly because Scotland's finances had been crippled by a failed colonial venture in Panama and the country needed access to England's markets and its bailout.|El Acta de Unión creó un único Reino de Gran Bretaña con un solo parlamento en Westminster, aprobada en parte porque las finanzas de Escocia habían quedado lastradas por un fallido proyecto colonial en Panamá.|L'Acte d'Union créa un unique royaume de Grande-Bretagne doté d'un seul parlement à Westminster, adopté en partie parce que les finances de l'Écosse avaient été ruinées par une entreprise coloniale ratée au Panama.|合同法はウェストミンスターに一つの議会を持つ単一の「グレートブリテン王国」を作り出した。この法律が成立した背景には、パナマでの植民地事業の失敗でスコットランドの財政が壊滅的な打撃を受け、イングランドの市場と救済を必要としていた事情もあった。",
  ),
  q(
    8,
    "What is the lower house of the UK Parliament called?|¿Cómo se llama la cámara baja del Parlamento del Reino Unido?|Comment appelle-t-on la chambre basse du Parlement du Royaume-Uni ?|イギリス議会の下院の名称は?",
    [
      "The House of Lords|La Cámara de los Lores|La Chambre des Lords|貴族院",
      "The Senate|El Senado|Le Sénat|上院(セネート)",
      "The House of Commons|La Cámara de los Comunes|La Chambre des Communes|庶民院",
    ],
    2,
    "Members of the House of Commons are elected directly by voters in local constituencies, while the House of Lords is unelected, made up of appointed life peers, a small number of hereditary peers and senior bishops.|Los miembros de la Cámara de los Comunes se eligen directamente por los votantes en circunscripciones locales, mientras que la Cámara de los Lores no es electa, compuesta por pares vitalicios designados, un pequeño número de pares hereditarios y altos obispos.|Les membres de la Chambre des Communes sont élus directement par les électeurs dans des circonscriptions locales, tandis que la Chambre des Lords n'est pas élue, composée de pairs à vie nommés, d'un petit nombre de pairs héréditaires et d'évêques de haut rang.|庶民院の議員は地元の選挙区で有権者から直接選ばれるのに対し、貴族院は選挙を経ない。任命された一代貴族、少数の世襲貴族、上級聖職者らで構成される。",
  ),
  q(
    8,
    "What term describes the UK's system of government, which has no single written constitutional document?|¿Qué término describe el sistema de gobierno del Reino Unido, que no tiene un único documento constitucional escrito?|Quel terme décrit le système de gouvernement du Royaume-Uni, dépourvu d'un unique document constitutionnel écrit ?|単一の成文憲法を持たないイギリスの統治制度を表す語は?",
    [
      "A single written constitution|Una constitución única y escrita|Une constitution unique et écrite|単一の成文憲法",
      "An uncodified constitution|Una constitución no codificada|Une constitution non codifiée|不文憲法(非成典化)",
      "A model copied directly from the US|Un modelo copiado directamente de EE. UU.|Un modèle copié directement des États-Unis|米国から直接写した制度",
    ],
    1,
    "Britain's constitution instead exists across centuries of statutes, court rulings and unwritten conventions, so a rule as basic as who becomes prime minister rests partly on tradition rather than any single article of law.|La constitución británica existe en cambio repartida en siglos de leyes, sentencias judiciales y convenciones no escritas, de modo que una norma tan básica como quién se convierte en primer ministro descansa en parte en la tradición.|La constitution britannique existe au contraire à travers des siècles de lois, de décisions de justice et de conventions non écrites, si bien qu'une règle aussi fondamentale que la désignation du premier ministre repose en partie sur la tradition.|英国の憲法は、何世紀にもわたる法律・判例・不文の慣行のあいだに散らばって存在している。誰が首相になるかという基本的な決まりごとさえ、単一の条文ではなく一部は伝統に支えられている。",
  ),
  q(
    9,
    "Who designed the London Underground's iconic schematic map in 1931, which abandoned real geography for clarity?|¿Quién diseñó en 1931 el icónico mapa esquemático del metro de Londres, que abandonó la geografía real en favor de la claridad?|Qui conçut en 1931 la célèbre carte schématique du métro de Londres, abandonnant la géographie réelle au profit de la clarté ?|1931年、実際の地理を捨てて分かりやすさを取った、地下鉄の有名な概略地図を作ったのは誰か?",
    [
      "Isambard Kingdom Brunel|Isambard Kingdom Brunel|Isambard Kingdom Brunel|イザムバード・キングダム・ブルネル",
      "Harry Beck|Harry Beck|Harry Beck|ハリー・ベック",
      "Christopher Wren|Christopher Wren|Christopher Wren|クリストファー・レン",
    ],
    1,
    "Beck was an out-of-work electrical draughtsman who modelled the map on circuit diagrams, using only vertical, horizontal and 45-degree lines, and London Transport initially doubted the idea enough to trial it only as a small pamphlet insert.|Beck era un delineante eléctrico desempleado que basó el mapa en diagramas de circuitos, usando solo líneas verticales, horizontales y a 45 grados, y el transporte de Londres al principio dudó tanto de la idea que la probó solo como inserto en un pequeño folleto.|Beck était un dessinateur électricien sans emploi qui modela la carte sur des schémas de circuits, n'utilisant que des lignes verticales, horizontales et à 45 degrés, et les transports londoniens doutèrent d'abord tant de l'idée qu'ils ne la testèrent que sous forme d'un petit dépliant.|ベックは失業中の電気製図工で、電気回路図をもとにこの地図を作り、縦・横・45度の線だけで描いた。ロンドン交通局は当初この案をあまり信用しておらず、まずは小さな折込パンフレットとして試験的に配布するにとどめた。",
  ),
  q(
    9,
    "In what year did most of Ireland leave the union, leading to the current name \"United Kingdom of Great Britain and Northern Ireland\"?|¿En qué año la mayor parte de Irlanda dejó la unión, dando lugar al nombre actual, «Reino Unido de Gran Bretaña e Irlanda del Norte»?|En quelle année la majeure partie de l'Irlande a-t-elle quitté l'union, menant au nom actuel de « Royaume-Uni de Grande-Bretagne et d'Irlande du Nord » ?|「グレートブリテンおよび北アイルランド連合王国」という現在の国名につながる、アイルランドの大半が連合を離脱した年は?",
    [
      "1801|1801|1801|1801年",
      "1922|1922|1922|1922年",
      "1945|1945|1945|1945年",
    ],
    1,
    "The Irish Free State, covering 26 of Ireland's 32 counties, became self-governing in 1922 after a war of independence, leaving the six counties of Northern Ireland alone in the union and forcing the country's official name to be rewritten.|El Estado Libre Irlandés, que abarcaba 26 de los 32 condados de Irlanda, se autogobernó en 1922 tras una guerra de independencia, dejando solos en la unión a los seis condados de Irlanda del Norte y obligando a reescribir el nombre oficial del país.|L'État libre d'Irlande, couvrant 26 des 32 comtés d'Irlande, devint autonome en 1922 après une guerre d'indépendance, laissant seuls dans l'union les six comtés d'Irlande du Nord et forçant la réécriture du nom officiel du pays.|アイルランドの32州のうち26州を占めるアイルランド自由国は、独立戦争を経て1922年に自治を獲得した。連合に残ったのは北アイルランドの6州だけとなり、国の正式名称も書き換えを迫られた。",
  ),
  q(
    9,
    "What does the term \"Received Pronunciation\" refer to?|¿A qué se refiere el término «Received Pronunciation»?|Que désigne le terme « Received Pronunciation » ?|「容認発音(レシーヴド・プロナンシエーション)」とは何を指すか?",
    [
      "A regional Scottish dialect|Un dialecto regional escocés|Un dialecte régional écossais|スコットランドの地方方言",
      "A non-regional accent historically linked to education and the south|Un acento sin marca regional, ligado históricamente a la educación y al sur|Un accent sans marque régionale, historiquement lié à l'éducation et au sud|教育や南部と歴史的に結びついた、地域色のない発音",
      "A Welsh-English pidgin|Un pidgin galés-inglés|Un pidgin gallois-anglais|ウェールズ語と英語のピジン",
    ],
    1,
    "Sometimes called \"BBC English\" or \"the Queen's English\", Received Pronunciation is spoken as a native accent by only a small minority of Britons, despite being the version most often taught to foreign learners of English.|A veces llamado «BBC English» o «el inglés de la Reina», el Received Pronunciation lo habla como acento nativo solo una pequeña minoría de británicos, pese a ser la variante que más se enseña a los estudiantes extranjeros de inglés.|Parfois appelé « BBC English » ou « l'anglais de la Reine », le Received Pronunciation n'est parlé comme accent natif que par une petite minorité de Britanniques, bien qu'il soit la variante la plus souvent enseignée aux apprenants étrangers de l'anglais.|「BBC英語」や「女王の英語」とも呼ばれる容認発音を母語の訛りとして話す英国人はごく少数にすぎないが、それでも外国人が英語を学ぶ際に最もよく教えられる発音である。",
  ),
  q(
    4,
    "What street in London houses the official residence of the Prime Minister?|¿En qué calle de Londres está la residencia oficial del primer ministro?|Dans quelle rue de Londres se trouve la résidence officielle du premier ministre ?|首相官邸があるロンドンの通りの名は?",
    [
      "Downing Street|Downing Street|Downing Street|ダウニング街",
      "Fleet Street|Fleet Street|Fleet Street|フリート街",
      "Whitehall|Whitehall|Whitehall|ホワイトホール",
    ],
    0,
    "Number 10 Downing Street has served as the prime minister's residence since 1735, and despite its narrow Georgian townhouse front, the building actually connects internally to a much larger warren of offices behind it.|El número 10 de Downing Street sirve de residencia del primer ministro desde 1735, y pese a su estrecha fachada de casa georgiana, el edificio se conecta por dentro con un laberinto de oficinas mucho más grande.|Le 10 Downing Street sert de résidence au premier ministre depuis 1735, et malgré son étroite façade de maison géorgienne, le bâtiment se relie en réalité par l'intérieur à un dédale de bureaux bien plus vaste.|ダウニング街10番地は1735年から首相官邸として使われている。ジョージ王朝様式の細い正面とは裏腹に、建物の内部はその奥に広がるはるかに大きな執務室の迷路とつながっている。",
  ),
  q(
    4,
    "What is the minimum legal age to buy alcohol in a British pub?|¿Cuál es la edad legal mínima para comprar alcohol en un pub británico?|Quel est l'âge légal minimum pour acheter de l'alcool dans un pub britannique ?|イギリスのパブで飲酒が認められる法定最低年齢は?",
    [
      "16|16|16|16歳",
      "21|21|21|21歳",
      "18|18|18|18歳",
    ],
    0,
    "The age was set at 18 by a 1988 law, though a long-standing quirk still lets 16- and 17-year-olds legally drink beer, cider or wine with a meal in a pub if accompanied by an adult.|La edad se fijó en 18 años por una ley de 1988, aunque una vieja peculiaridad aún permite a los jóvenes de 16 y 17 años beber legalmente cerveza, sidra o vino con una comida en un pub si van acompañados de un adulto.|L'âge fut fixé à 18 ans par une loi de 1988, bien qu'une particularité de longue date permette encore aux jeunes de 16 et 17 ans de boire légalement bière, cidre ou vin avec un repas dans un pub s'ils sont accompagnés d'un adulte.|飲酒年齢は1988年の法律で18歳と定められたが、いまも長く続く例外があり、16歳・17歳でも大人に同伴されていればパブで食事とともにビールやシードル、ワインを合法的に飲むことができる。",
  ),
  q(
    5,
    "Which sea separates the island of Great Britain from Ireland?|¿Qué mar separa la isla de Gran Bretaña de Irlanda?|Quelle mer sépare l'île de Grande-Bretagne de l'Irlande ?|グレートブリテン島とアイルランドを隔てる海は?",
    [
      "The Irish Sea|El mar de Irlanda|La mer d'Irlande|アイリッシュ海",
      "The North Sea|El mar del Norte|La mer du Nord|北海",
      "The Celtic Deep|El Celtic Deep|Le Celtic Deep|ケルティック・ディープ",
    ],
    0,
    "At its narrowest, between Scotland and Northern Ireland, the Irish Sea is only about 20 kilometres across, close enough that a bridge or tunnel across it has been proposed and shelved by various governments for over a century.|En su punto más estrecho, entre Escocia e Irlanda del Norte, el mar de Irlanda mide solo unos 20 km, lo bastante cerca como para que distintos gobiernos hayan propuesto y archivado un puente o túnel durante más de un siglo.|À son point le plus étroit, entre l'Écosse et l'Irlande du Nord, la mer d'Irlande ne fait qu'environ 20 km de large, assez proche pour qu'un pont ou un tunnel y ait été proposé puis abandonné par divers gouvernements depuis plus d'un siècle.|最も狭いスコットランドと北アイルランドのあいだでは、アイリッシュ海の幅はわずか約20kmしかない。この近さゆえ、橋やトンネルの建設案が1世紀以上にわたって様々な政権によって提案されては棚上げにされてきた。",
  ),
  q(
    5,
    "What does the term \"Bank Holiday\" refer to in the UK?|¿A qué se refiere el término «Bank Holiday» en el Reino Unido?|Que désigne le terme « Bank Holiday » au Royaume-Uni ?|イギリスでいう「バンク・ホリデー」とは何のことか?",
    [
      "A day when only banks are open|Un día en que solo abren los bancos|Un jour où seules les banques sont ouvertes|銀行だけが開いている日",
      "A nationwide public holiday|Un festivo público en todo el país|Un jour férié national|全国的な祝日",
      "A special day for banking transactions only|Un día especial solo para trámites bancarios|Un jour spécial réservé aux opérations bancaires|銀行取引専用の特別な日",
    ],
    1,
    "The name dates to an 1871 law that formally listed days banks were permitted to close, and since almost all other business followed the banks' lead, the term simply stuck as the everyday word for a nationwide public holiday.|El nombre se remonta a una ley de 1871 que enumeraba formalmente los días en que los bancos podían cerrar, y como casi todo el resto de negocios seguía el ejemplo de los bancos, el término simplemente se quedó como la palabra habitual para un festivo nacional.|Le nom remonte à une loi de 1871 qui énumérait formellement les jours où les banques étaient autorisées à fermer, et comme presque tous les autres commerces suivaient l'exemple des banques, le terme est resté tout simplement le mot courant pour un jour férié national.|この名前は1871年、銀行が休業してよい日を正式に定めた法律にさかのぼる。他のほとんどの商店も銀行に倣って休んだため、この語がそのまま全国的な祝日を指す日常語として定着した。",
  ),
  q(
    3,
    "In British English, what is the storage compartment at the back of a car called?|En inglés británico, ¿cómo se llama el compartimento de almacenaje en la parte trasera de un coche?|En anglais britannique, comment appelle-t-on le compartiment de rangement à l'arrière d'une voiture ?|イギリス英語で、車の後部にある荷物入れは何と呼ばれるか?",
    [
      "The trunk|El trunk|Le trunk|トランク(米語)",
      "The boot|El boot|Le boot|ブート",
      "The hatch|El hatch|Le hatch|ハッチ",
    ],
    1,
    "British and American English diverge on dozens of everyday car and road words — boot instead of trunk, bonnet instead of hood, pavement instead of sidewalk — differences that trace back to separate 19th- and 20th-century motoring vocabularies developing on either side of the Atlantic.|El inglés británico y el estadounidense divergen en decenas de palabras cotidianas sobre coches y carreteras —boot en vez de trunk, bonnet en vez de hood, pavement en vez de sidewalk—, diferencias que se remontan a vocabularios automovilísticos que se desarrollaron por separado.|L'anglais britannique et l'anglais américain divergent sur des dizaines de mots quotidiens liés à la voiture et à la route — boot au lieu de trunk, bonnet au lieu de hood, pavement au lieu de sidewalk —, des différences remontant à des vocabulaires automobiles distincts.|イギリス英語とアメリカ英語は、車や道路にまつわる日常語で何十も食い違う。トランクではなくブート、フードではなくボンネット、サイドウォークではなくペイヴメントといった具合で、これらの違いは大西洋の両岸で別々に発展した19〜20世紀の自動車用語にさかのぼる。",
  ),
];
