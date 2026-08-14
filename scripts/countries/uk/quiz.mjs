/**
 * イギリスのクイズ(105問)。最初の40問に、2026-08-14に65問を足した。
 * 足した分は難易度7以上の層を厚くするのが主眼(7以上47問、9〜10が15問)。
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
 * 代わりに、通貨・言語・国のかたち・政治制度・食・日常語彙・鉄道史・
 * 憲政史など、**都市カードが触れていない主題**を選んである。
 *
 * 追加分(65問)は鉄道(標準軌の由来・グレート・ウェスタンの広軌・
 * ビーチング斧・車両限界)、制度と呼び方(ブリテン諸島・マン島とチャンネル
 * 諸島がUKでないこと・儀礼的カウンティ)、言語(スコットランド・ゲール語・
 * スコッツ語・古ノルド語由来の地名)、食(コーニッシュパスティのPGI・
 * ハギス・クリームティーの順序論争)、歴史(1603年の同君連合・1801年の
 * 合同・王位継承法・流血巡回裁判)を中心に選んである。ヨーロッパ大陸を
 * またぐ話題(ユーロスター・海峡トンネルなど)は europe 盤面に譲っている。
 * 北アイルランドに触れる問い(ストーモント・儀礼的な旗の使い分けなど)は
 * 確かめられる事実だけに絞ってある。
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
    5,
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

  // --- 追加分(65問、2026-08-14)。難易度7以上の層を厚くするのが主眼。 ---

  q(
    1,
    "What city is the capital of Scotland?|¿Qué ciudad es la capital de Escocia?|Quelle ville est la capitale de l'Écosse ?|スコットランドの首都はどこか?",
    [
      "Edinburgh|Edimburgo|Édimbourg|エディンバラ",
      "Glasgow|Glasgow|Glasgow|グラスゴー",
      "Aberdeen|Aberdeen|Aberdeen|アバディーン",
    ],
    0,
    "Edinburgh has been Scotland's capital since the 15th century, and its historic Old Town, with a castle perched on an extinct volcanic plug, and its New Town were both declared a UNESCO World Heritage Site in 1995.|Edimburgo es la capital de Escocia desde el siglo XV, y tanto su histórico Casco Antiguo, con el castillo sobre un tapón volcánico extinto, como la Ciudad Nueva fueron declarados Patrimonio de la Humanidad por la UNESCO en 1995.|Édimbourg est la capitale de l'Écosse depuis le XVe siècle, et sa vieille ville historique, avec son château perché sur un ancien piton volcanique éteint, ainsi que la ville nouvelle, ont toutes deux été classées au patrimoine mondial de l'UNESCO en 1995.|エディンバラは15世紀からスコットランドの首都であり、死火山の岩頸の上に建つ城を擁する旧市街と新市街の両方が1995年にユネスコの世界遺産に登録された。",
  ),
  q(
    1,
    "What city is the capital of Wales?|¿Qué ciudad es la capital de Gales?|Quelle ville est la capitale du pays de Galles ?|ウェールズの首都はどこか?",
    [
      "Swansea|Swansea|Swansea|スウォンジー",
      "Cardiff|Cardiff|Cardiff|カーディフ",
      "Newport|Newport|Newport|ニューポート",
    ],
    1,
    "Cardiff only became Wales's official capital in 1955, centuries after it had already grown into the country's largest city on the strength of coal exports from the valleys to the north.|Cardiff solo se convirtió en la capital oficial de Gales en 1955, siglos después de haberse convertido ya en la mayor ciudad del país gracias a las exportaciones de carbón de los valles del norte.|Cardiff ne devint la capitale officielle du pays de Galles qu'en 1955, des siècles après être déjà devenue la plus grande ville du pays grâce aux exportations de charbon des vallées du nord.|カーディフが正式にウェールズの首都となったのは1955年になってからのことで、北の谷から産出される石炭の輸出によって同国最大の都市に成長してからも、長い年月が経っていた。",
  ),
  q(
    1,
    "What colour are the UK's traditional street postboxes?|¿De qué color son los buzones tradicionales de las calles del Reino Unido?|De quelle couleur sont les boîtes aux lettres traditionnelles des rues du Royaume-Uni ?|イギリスの街角にある伝統的な郵便ポストは何色か?",
    [
      "Green|Verde|Vert|緑",
      "Blue|Azul|Bleu|青",
      "Red|Rojo|Rouge|赤",
    ],
    2,
    "Postboxes were painted red from 1874 onward specifically to make them easier to spot, after an earlier dark green colour proved so hard to see that people kept walking straight past them.|Los buzones se pintaron de rojo a partir de 1874 precisamente para que se distinguieran mejor, después de que un verde oscuro anterior resultara tan difícil de ver que la gente pasaba de largo sin notarlos.|Les boîtes aux lettres furent peintes en rouge à partir de 1874, précisément pour qu'on les repère plus facilement, après qu'un vert foncé antérieur se soit révélé si difficile à voir que les gens passaient devant sans les remarquer.|郵便ポストは1874年以降、見つけやすくするためにあえて赤く塗られるようになった。それ以前の濃い緑色はあまりに目立たず、人々が気づかず通り過ぎてしまっていたためである。",
  ),
  q(
    1,
    "What colour are London's traditional taxi cabs?|¿De qué color son los taxis tradicionales de Londres?|De quelle couleur sont les taxis traditionnels de Londres ?|ロンドンの伝統的なタクシーは何色か?",
    [
      "Black|Negro|Noir|黒",
      "Yellow|Amarillo|Jaune|黄色",
      "White|Blanco|Blanc|白",
    ],
    0,
    "The classic London cab is nicknamed a \"black cab\" even though modern licensed taxis are now sold in many colours, and drivers must pass a famously demanding test called \"The Knowledge\" that can take years to complete.|El taxi clásico de Londres se apoda «black cab» (taxi negro) aunque los taxis con licencia modernos se venden ya en muchos colores, y los conductores deben aprobar un examen célebremente exigente llamado «The Knowledge», que puede llevar años completar.|Le taxi classique londonien est surnommé « black cab » (taxi noir) bien que les taxis agréés modernes se vendent aujourd'hui en de nombreuses couleurs, et les chauffeurs doivent réussir un examen réputé redoutable appelé « The Knowledge », qui peut prendre des années à préparer.|ロンドンの伝統的なタクシーは今も「ブラックキャブ(黒いタクシー)」と呼ばれるが、実際には現代の認可タクシーは様々な色で売られている。運転手になるには「ザ・ナレッジ」と呼ばれる悪名高く厳しい試験に合格しなければならず、習得に何年もかかることがある。",
  ),
  q(
    2,
    "In which month do people in the UK commonly wear a red poppy to remember war dead?|¿En qué mes suele lucir la gente en el Reino Unido una amapola roja en memoria de los caídos en guerra?|En quel mois les habitants du Royaume-Uni portent-ils couramment un coquelicot rouge en mémoire des morts à la guerre ?|イギリスで戦没者を追悼して赤いポピーの花を身につける習慣があるのは何月か?",
    [
      "September|Septiembre|Septembre|9月",
      "November|Noviembre|Novembre|11月",
      "January|Enero|Janvier|1月",
    ],
    1,
    "The tradition draws on the poem \"In Flanders Fields\", which described poppies growing over First World War battlefields, and paper poppies are sold each year in the run-up to Remembrance Sunday to raise money for veterans.|La tradición se inspira en el poema «In Flanders Fields», que describía amapolas creciendo sobre los campos de batalla de la Primera Guerra Mundial, y cada año se venden amapolas de papel antes del Domingo del Recuerdo para recaudar fondos para veteranos.|La tradition s'inspire du poème « In Flanders Fields », qui décrivait des coquelicots poussant sur les champs de bataille de la Première Guerre mondiale, et des coquelicots en papier sont vendus chaque année à l'approche du Dimanche du Souvenir pour récolter des fonds destinés aux anciens combattants.|この習慣は、第一次世界大戦の戦場に咲くポピーを描いた詩「フランダースの野に」に着想を得ている。追悼記念日曜日を前に、退役軍人のための資金集めとして毎年紙製のポピーが販売される。",
  ),
  q(
    2,
    "What creature appears on the flag of Wales?|¿Qué criatura aparece en la bandera de Gales?|Quelle créature figure sur le drapeau du pays de Galles ?|ウェールズの旗に描かれている生き物は?",
    [
      "A lion|Un león|Un lion|ライオン",
      "An eagle|Un águila|Un aigle|ワシ",
      "A dragon|Un dragón|Un dragon|竜",
    ],
    2,
    "The red dragon, \"Y Ddraig Goch\", has been linked with Wales since medieval legend and was formally added to the national flag only in 1959, on a background split between white and green.|El dragón rojo, «Y Ddraig Goch», se asocia con Gales desde una leyenda medieval y solo se añadió formalmente a la bandera nacional en 1959, sobre un fondo dividido entre blanco y verde.|Le dragon rouge, « Y Ddraig Goch », est associé au pays de Galles depuis une légende médiévale et ne fut ajouté formellement au drapeau national qu'en 1959, sur un fond partagé entre blanc et vert.|赤い竜「イ・ドライグ・ゴッホ」は中世の伝説以来ウェールズと結びついてきたが、白と緑に分かれた地に正式に国旗として加えられたのは1959年になってからだった。",
  ),
  q(
    2,
    "In British English, what word is normally used for what Americans call a \"cookie\"?|En inglés británico, ¿qué palabra se usa normalmente para lo que los estadounidenses llaman «cookie»?|En anglais britannique, quel mot est normalement utilisé pour ce que les Américains appellent un « cookie » ?|イギリス英語で、アメリカ英語の「クッキー」にあたる語として普通使われるのは?",
    [
      "Biscuit|Biscuit|Biscuit|ビスケット",
      "Scone|Scone|Scone|スコーン",
      "Muffin|Muffin|Muffin|マフィン",
    ],
    0,
    "In Britain a \"biscuit\" covers everything from thin crackers to chocolate-coated treats, and the word \"cookie\" is understood but usually reserved for a specific soft, chunky American-style type.|En Gran Bretaña, «biscuit» abarca desde galletas finas hasta dulces bañados en chocolate, y la palabra «cookie» se entiende pero suele reservarse para un tipo concreto, blando y grueso, de estilo estadounidense.|En Grande-Bretagne, « biscuit » englobe tout, des crackers fins aux friandises enrobées de chocolat, et le mot « cookie » est compris mais généralement réservé à un type précis, moelleux et épais, de style américain.|イギリスでは「ビスケット」が薄いクラッカーからチョコレートがけの菓子まで幅広く指す言葉であり、「クッキー」という語も通じるが、通常は柔らかく厚みのあるアメリカ風の特定の種類にだけ使われる。",
  ),
  q(
    2,
    "On what date is Guy Fawkes Night, marked with bonfires and fireworks across Britain, held each year?|¿En qué fecha se celebra cada año la Noche de Guy Fawkes, marcada con hogueras y fuegos artificiales en toda Gran Bretaña?|À quelle date la nuit de Guy Fawkes, marquée par des feux de joie et des feux d'artifice dans toute la Grande-Bretagne, est-elle célébrée chaque année ?|各地でかがり火や花火が上がるガイ・フォークス・ナイトが毎年開かれるのはいつか?",
    [
      "31 October|31 de octubre|Le 31 octobre|10月31日",
      "5 November|5 de noviembre|Le 5 novembre|11月5日",
      "25 December|25 de diciembre|Le 25 décembre|12月25日",
    ],
    1,
    "The date marks the failed Gunpowder Plot of 1605, when Guy Fawkes and fellow conspirators were caught trying to blow up Parliament, and effigies of Fawkes are still burned on bonfires in some towns today.|La fecha conmemora el fallido complot de la pólvora de 1605, cuando Guy Fawkes y sus cómplices fueron sorprendidos intentando volar el Parlamento, y en algunos pueblos aún se queman hoy efigies de Fawkes en las hogueras.|La date commémore l'échec de la conspiration des poudres de 1605, quand Guy Fawkes et ses complices furent surpris en train de tenter de faire sauter le Parlement, et des effigies de Fawkes sont encore brûlées sur des feux de joie dans certaines villes aujourd'hui.|この日付は1605年の火薬陰謀事件の失敗を記念するもので、ガイ・フォークスと共謀者たちが議会を爆破しようとして捕らえられた。今でも一部の町ではフォークスの人形をかがり火で焼く風習が残っている。",
  ),
  q(
    3,
    "What is the traditional pleated Scottish garment, worn like a knee-length skirt by men, called?|¿Cómo se llama la tradicional prenda escocesa plisada, que los hombres llevan a modo de falda hasta la rodilla?|Comment appelle-t-on la tenue écossaise traditionnelle plissée, portée par les hommes comme une jupe s'arrêtant au genou ?|男性が膝丈のスカートのように身につける、スコットランドの伝統的なひだ付きの衣装は?",
    [
      "A sporran|Un sporran|Un sporran|スポーラン",
      "A sash|Una banda|Une écharpe|飾り帯",
      "A kilt|Un kilt|Un kilt|キルト",
    ],
    2,
    "Kilts are traditionally made from tartan, a woven pattern of criss-crossing stripes, and many patterns are today associated with specific Scottish clans or family names, though this link is largely a 19th-century invention rather than an ancient one.|Los kilts se hacen tradicionalmente de tartán, un patrón tejido de rayas entrecruzadas, y hoy muchos diseños se asocian con clanes o apellidos escoceses concretos, aunque ese vínculo es sobre todo un invento del siglo XIX y no algo antiguo.|Les kilts sont traditionnellement confectionnés en tartan, un motif tissé de rayures entrecroisées, et de nombreux motifs sont aujourd'hui associés à des clans ou des noms de famille écossais précis, bien que ce lien soit surtout une invention du XIXe siècle plutôt qu'ancienne.|キルトは伝統的にタータンと呼ばれる、縦横に交差する縞模様の織物で作られる。今日では多くの柄が特定のスコットランドの氏族や家名と結びつけられているが、この結びつきの大半は古来のものではなく、19世紀に作られたものである。",
  ),
  q(
    3,
    "What is the traditional British Sunday meal of roasted meat, potatoes and Yorkshire pudding called?|¿Cómo se llama la comida tradicional británica de los domingos, con carne asada, patatas y Yorkshire pudding?|Comment appelle-t-on le repas britannique traditionnel du dimanche, à base de viande rôtie, de pommes de terre et de Yorkshire pudding ?|焼いた肉・じゃがいも・ヨークシャー・プディングを合わせたイギリスの日曜日の伝統的な食事は?",
    [
      "A Sunday roast|Un Sunday roast|Un Sunday roast|サンデー・ロースト",
      "A ploughman's lunch|Un ploughman's lunch|Un ploughman's lunch|プラウマンズ・ランチ",
      "A cream tea|Un cream tea|Un cream tea|クリームティー",
    ],
    0,
    "Yorkshire pudding, a savoury batter baked until it puffs up and turns crisp, was originally served as a cheap first course to fill diners up before the more expensive meat arrived, a habit some families still keep today.|El Yorkshire pudding, una masa salada horneada hasta que se hincha y queda crujiente, se servía originalmente como primer plato barato para llenar a los comensales antes de que llegara la carne, más cara, una costumbre que algunas familias mantienen hoy.|Le Yorkshire pudding, une pâte salée cuite au four jusqu'à ce qu'elle gonfle et devienne croustillante, était à l'origine servi comme entrée bon marché pour rassasier les convives avant l'arrivée de la viande, plus chère, une habitude que certaines familles conservent encore.|ヨークシャー・プディングは、膨らんでカリッと焼き上がる塩味の生地で、もともとは値の張る肉料理が出る前に客の腹を満たしておく安上がりな前菜として出されていた。この習わしを今も守る家庭がある。",
  ),
  q(
    3,
    "Which annual grass-court tennis tournament, one of the sport's four majors, is held in London each summer?|¿Qué torneo anual de tenis sobre hierba, uno de los cuatro grandes del tenis, se celebra en Londres cada verano?|Quel tournoi annuel de tennis sur gazon, l'un des quatre majeurs du sport, se déroule à Londres chaque été ?|毎年夏にロンドンで開かれる、テニスの四大大会の一つである芝生コートの大会は?",
    [
      "The US Open|El US Open|L'US Open|全米オープン",
      "Wimbledon|Wimbledon|Wimbledon|ウィンブルドン",
      "The French Open|El Roland Garros|Roland-Garros|全仏オープン",
    ],
    1,
    "Wimbledon has been played since 1877 and remains the only one of tennis's four majors still played on grass, with players required to wear predominantly white clothing under a long-standing dress code.|Wimbledon se juega desde 1877 y sigue siendo el único de los cuatro grandes del tenis que aún se disputa sobre hierba, y exige a los jugadores vestir predominantemente de blanco bajo un código de vestimenta de larga tradición.|Wimbledon se joue depuis 1877 et reste le seul des quatre tournois majeurs du tennis encore disputé sur gazon, les joueurs devant porter une tenue à dominante blanche selon un code vestimentaire de longue date.|ウィンブルドンは1877年から開催されており、テニスの四大大会の中でいまも芝生コートで行われる唯一の大会である。選手は長年続く服装規定により、白を基調とした服装を着用することが求められる。",
  ),
  q(
    3,
    "What informal term combines the names of Britain's two oldest and most famous universities?|¿Qué término informal combina los nombres de las dos universidades más antiguas y famosas de Gran Bretaña?|Quel terme informel combine les noms des deux universités les plus anciennes et les plus célèbres de Grande-Bretagne ?|イギリスで最も古く有名な二つの大学の名を組み合わせた通称は?",
    [
      "Camford|Camford|Camford|カムフォード",
      "Britvers|Britvers|Britvers|ブリトヴァーズ",
      "Oxbridge|Oxbridge|Oxbridge|オックスブリッジ",
    ],
    2,
    "\"Oxbridge\" blends Oxford and Cambridge, whose rivalry stretches back centuries and shows up every spring in the Boat Race, a rowing contest on the Thames watched by crowds lining the riverbank.|«Oxbridge» combina Oxford y Cambridge, cuya rivalidad se remonta siglos atrás y se manifiesta cada primavera en la Boat Race, una regata en el Támesis seguida por multitudes que se agolpan en la orilla.|« Oxbridge » combine Oxford et Cambridge, dont la rivalité remonte à des siècles et se manifeste chaque printemps lors de la Boat Race, une course d'aviron sur la Tamise suivie par des foules massées sur les rives.|「オックスブリッジ」はオックスフォードとケンブリッジを組み合わせた語で、両校の対抗心は何世紀もさかのぼる。毎春行われるテムズ川のボートレースにもその伝統が表れ、川岸には大勢の見物客が詰めかける。",
  ),
  q(
    4,
    "What is the long-running cricket rivalry between England and Australia known as?|¿Cómo se conoce la histórica rivalidad de críquet entre Inglaterra y Australia?|Comment appelle-t-on la longue rivalité de cricket entre l'Angleterre et l'Australie ?|イングランドとオーストラリアのあいだで長く続くクリケットの対抗戦は何と呼ばれるか?",
    [
      "The Ashes|The Ashes|The Ashes|アッシズ",
      "The Crown Cup|La Crown Cup|La Crown Cup|クラウン・カップ",
      "The Anchor Trophy|El trofeo Anchor|Le trophée Anchor|アンカー・トロフィー",
    ],
    0,
    "The name dates to an 1882 newspaper obituary mocking English cricket as \"dead\" after a home defeat, and the small urn now presented to the winning side is said to contain the ashes of a burnt bail or ball, though nobody is entirely certain.|El nombre se remonta a una necrológica publicada en 1882 en un periódico que se burlaba del críquet inglés dándolo por «muerto» tras una derrota en casa, y la pequeña urna que hoy se entrega al equipo ganador se dice que contiene las cenizas de un travesaño o una pelota quemados, aunque nadie está del todo seguro.|Le nom remonte à une nécrologie publiée en 1882 dans un journal, moquant le cricket anglais qualifié de « mort » après une défaite à domicile, et la petite urne aujourd'hui remise à l'équipe gagnante contiendrait les cendres d'un bâtonnet ou d'une balle brûlés, bien que personne n'en soit tout à fait certain.|この名は1882年、本拠地での敗北を受けてイングランドのクリケットを「死んだ」とからかった新聞の追悼記事にさかのぼる。勝者に贈られる小さな壺には燃やされたベイルかボールの灰が入っているとされるが、誰も確かなことは分かっていない。",
  ),
  q(
    4,
    "Strictly speaking, what does the name \"Big Ben\" actually refer to?|En sentido estricto, ¿a qué se refiere realmente el nombre «Big Ben»?|À strictement parler, à quoi le nom « Big Ben » fait-il réellement référence ?|厳密に言うと「ビッグベン」という名称は本来何を指すのか?",
    [
      "The clock face|La esfera del reloj|Le cadran de l'horloge|時計の文字盤",
      "The Great Bell|La Gran Campana|La Grande Cloche|大鐘",
      "The entire tower|Toda la torre|La tour entière|塔全体",
    ],
    1,
    "The name \"Big Ben\" was originally given only to the Great Bell that strikes the hour, though it is now popularly used for the whole clock tower, officially renamed the Elizabeth Tower in 2012.|El nombre «Big Ben» se dio originalmente solo a la Gran Campana que marca las horas, aunque hoy se usa popularmente para toda la torre del reloj, renombrada oficialmente Elizabeth Tower en 2012.|Le nom « Big Ben » ne désignait à l'origine que la Grande Cloche sonnant les heures, bien qu'il soit aujourd'hui utilisé populairement pour désigner toute la tour de l'horloge, officiellement rebaptisée Elizabeth Tower en 2012.|「ビッグベン」という名は本来、時を告げる大鐘だけを指していたが、いまでは時計塔全体を指す通称として広く使われている。塔自体は2012年に公式に「エリザベス・タワー」と改名された。",
  ),
  q(
    4,
    "Which curry dish, invented in Britain by South Asian cooks, has repeatedly topped polls of the nation's favourite food?|¿Qué plato de curry, inventado en Gran Bretaña por cocineros del sur de Asia, ha encabezado repetidamente las encuestas sobre la comida favorita del país?|Quel plat au curry, inventé en Grande-Bretagne par des cuisiniers sud-asiatiques, arrive régulièrement en tête des sondages sur le plat préféré du pays ?|南アジア系の料理人がイギリスで生み出したとされ、国民の好きな食べ物調査で繰り返し首位になっているカレー料理は?",
    [
      "Vindaloo|Vindaloo|Vindaloo|ヴィンダルー",
      "Korma|Korma|Korma|コルマ",
      "Chicken tikka masala|Pollo tikka masala|Poulet tikka masala|チキン・ティッカ・マサラ",
    ],
    2,
    "A popular story credits the creamy tomato sauce to a Glasgow cook adding a tin of soup to grilled chicken tikka for a customer who found the dish too dry, though the tale has never been confirmed and several restaurants claim the invention.|Una historia popular atribuye la cremosa salsa de tomate a un cocinero de Glasgow que añadió una lata de sopa al pollo tikka a la parrilla para un cliente que encontraba el plato demasiado seco, aunque la anécdota nunca se ha confirmado y varios restaurantes reclaman la invención.|Une histoire populaire attribue la sauce tomate crémeuse à un cuisinier de Glasgow ayant ajouté une boîte de soupe à du poulet tikka grillé pour un client trouvant le plat trop sec, bien que l'anecdote n'ait jamais été confirmée et que plusieurs restaurants revendiquent l'invention.|よく語られる話では、グラスゴーのある料理人が、焼いたチキンティッカを「パサパサだ」と言う客のためにスープの缶詰を加えたのがこのクリーミーなトマトソースの始まりとされるが、この逸話は確認されておらず、複数のレストランが発明者を名乗っている。",
  ),
  q(
    4,
    "What is the British English word for a circular road junction that traffic flows around?|¿Cuál es la palabra inglesa británica para una intersección circular por la que fluye el tráfico?|Quel est le mot anglais britannique pour une intersection circulaire autour de laquelle circule le trafic ?|交通が周回して流れる円形の交差点を指すイギリス英語の語は?",
    [
      "A roundabout|Una roundabout|Un roundabout|ラウンドアバウト",
      "A rotary loop|Un rotary loop|Une rotary loop|ロータリー・ループ",
      "A ring gate|Un ring gate|Une ring gate|リング・ゲート",
    ],
    0,
    "Britain has tens of thousands of roundabouts, and one town, Swindon, is famous for its \"Magic Roundabout\", where five mini-roundabouts are arranged around a sixth, central one, baffling first-time drivers.|Gran Bretaña tiene decenas de miles de rotondas, y una ciudad, Swindon, es famosa por su «Magic Roundabout», donde cinco minirotondas se disponen alrededor de una sexta, central, que desconcierta a quien conduce por primera vez.|La Grande-Bretagne compte des dizaines de milliers de ronds-points, et une ville, Swindon, est célèbre pour son « Magic Roundabout », où cinq mini-ronds-points s'organisent autour d'un sixième, central, déroutant les conducteurs qui le découvrent.|イギリスには数万か所ものラウンドアバウトがあり、スウィンドンという町は「マジック・ラウンドアバウト」で有名である。五つの小さな環道が中央の一つを囲むように配置されており、初めて運転する人を戸惑わせる。",
  ),
  q(
    4,
    "What are the exams typically taken by students around age 18 in England, Wales and Northern Ireland, used for university entry, called?|¿Cómo se llaman los exámenes que suelen realizar los estudiantes de unos 18 años en Inglaterra, Gales e Irlanda del Norte, usados para entrar en la universidad?|Comment appelle-t-on les examens généralement passés vers 18 ans en Angleterre, au pays de Galles et en Irlande du Nord, utilisés pour l'entrée à l'université ?|イングランド・ウェールズ・北アイルランドで18歳前後に受験し、大学入学に用いられる試験の名称は?",
    [
      "GCSEs|GCSEs|GCSEs|GCSE",
      "A-levels|A-levels|A-levels|Aレベル",
      "Highers|Highers|Highers|ハイヤーズ",
    ],
    1,
    "Students usually study just three or four subjects in depth for their A-levels, a narrower focus than in many other countries, and university offers are often made conditional on achieving specific grades in them.|Los estudiantes suelen cursar solo tres o cuatro asignaturas en profundidad para sus A-levels, un enfoque más estrecho que en muchos otros países, y las ofertas universitarias suelen condicionarse a obtener notas concretas en ellas.|Les élèves n'étudient généralement en profondeur que trois ou quatre matières pour leurs A-levels, une spécialisation plus étroite que dans de nombreux autres pays, et les offres universitaires sont souvent conditionnées à l'obtention de notes précises dans ces matières.|学生はAレベルのために通常たった3〜4科目だけを深く学ぶ。多くの国と比べて的を絞った学び方で、大学からの合格通知はしばしばこれらの科目で特定の成績を取ることを条件に出される。",
  ),
  q(
    5,
    "At Scotland's Highland Games, what is the event called in which competitors throw a long, heavy wooden pole end over end?|En los Juegos de las Tierras Altas de Escocia, ¿cómo se llama la prueba en la que los competidores lanzan un tronco largo y pesado para que gire de punta a punta?|Aux Highland Games écossais, comment appelle-t-on l'épreuve où les concurrents lancent un long poteau de bois lourd pour qu'il bascule bout sur bout ?|スコットランドのハイランド・ゲームズで、選手が長く重い木の柱を縦に回転させて投げる競技は?",
    [
      "Hammer throw|Lanzamiento de martillo|Lancer du marteau|ハンマー投げ",
      "Stone put|Lanzamiento de piedra|Lancer de pierre|石投げ",
      "Tossing the caber|Lanzamiento del caber|Lancer du caber|ケイバー投げ",
    ],
    2,
    "The pole, called a caber, can weigh well over 50 kilograms, and the throw is judged not on distance but on how close to perfectly straight, like the number 12 on a clock, it lands after flipping end over end.|El tronco, llamado caber, puede pesar bien más de 50 kilos, y el lanzamiento no se juzga por la distancia, sino por lo cerca que cae de la perfecta rectitud, como las 12 en punto de un reloj, tras voltear de punta a punta.|Le poteau, appelé caber, peut peser bien plus de 50 kilogrammes, et le lancer n'est pas jugé sur la distance mais sur la précision avec laquelle il retombe parfaitement droit, comme les douze heures d'une horloge, après avoir basculé bout sur bout.|「ケイバー」と呼ばれるこの柱は50kgを優に超えることもあり、判定は飛距離ではなく、縦に一回転したあと時計の12時の方向のようにどれだけまっすぐ着地するかで競われる。",
  ),
  q(
    5,
    "Which famous annual gardening event, held every May in London, is organised by the Royal Horticultural Society?|¿Qué famoso evento de jardinería anual, celebrado cada mayo en Londres, organiza la Royal Horticultural Society?|Quel célèbre événement horticole annuel, organisé chaque mois de mai à Londres, est mis sur pied par la Royal Horticultural Society ?|王立園芸協会が主催し、毎年5月にロンドンで開かれる有名な園芸行事は?",
    [
      "The Chelsea Flower Show|El Chelsea Flower Show|Le Chelsea Flower Show|チェルシー・フラワー・ショー",
      "The Kew Bloom Festival|El Kew Bloom Festival|Le Kew Bloom Festival|キュー・ブルーム・フェスティバル",
      "The Hyde Park Garden Fair|La Hyde Park Garden Fair|La Hyde Park Garden Fair|ハイドパーク・ガーデン・フェア",
    ],
    0,
    "Show gardens are built from scratch on the grounds each year and torn down again within days of closing, so a design that took months of planning and construction can exist for the public to see for barely a week.|Los jardines de exhibición se construyen desde cero cada año en el recinto y se desmontan de nuevo a los pocos días de cerrar, de modo que un diseño que llevó meses de planificación y construcción puede existir para el público apenas una semana.|Les jardins d'exposition sont construits de toutes pièces sur le site chaque année et démantelés quelques jours à peine après la clôture, si bien qu'un aménagement ayant demandé des mois de planification et de construction n'existe pour le public que le temps d'une semaine à peine.|会場の庭園は毎年ゼロから作り上げられ、閉幕からわずか数日で取り壊されてしまう。何か月もかけて計画・施工したデザインが、一般公開されるのはわずか1週間ほどにすぎない。",
  ),
  q(
    5,
    "Which Celtic language, once spoken across most of Scotland, now survives mainly in the Outer Hebrides?|¿Qué lengua celta, hablada antaño en la mayor parte de Escocia, sobrevive hoy sobre todo en las Hébridas Exteriores?|Quelle langue celtique, autrefois parlée dans la majeure partie de l'Écosse, subsiste aujourd'hui surtout dans les Hébrides extérieures ?|かつてはスコットランドの大部分で話されていたが、今は主にアウター・ヘブリディーズ諸島で残るケルト系言語は?",
    [
      "Welsh|Galés|Gallois|ウェールズ語",
      "Scottish Gaelic|Gaélico escocés|Gaélique écossais|スコットランド・ゲール語",
      "Cornish|Córnico|Cornique|コーンウォール語",
    ],
    1,
    "Scottish Gaelic is a different language from Scots, the everyday dialect spoken more widely across the Lowlands, and bilingual road signs in Gaelic and English now appear across much of the Highlands to support its revival.|El gaélico escocés es una lengua distinta del scots, el dialecto cotidiano hablado más ampliamente por las Tierras Bajas, y hoy aparecen señales de tráfico bilingües en gaélico e inglés por buena parte de las Tierras Altas para apoyar su revitalización.|Le gaélique écossais est une langue distincte du scots, le dialecte quotidien parlé plus largement dans les Lowlands, et des panneaux routiers bilingues gaélique-anglais apparaissent aujourd'hui dans une grande partie des Highlands pour soutenir sa renaissance.|スコットランド・ゲール語は、ローランド地方で広く話される日常方言スコッツ語とは別の言語である。今では復興を後押しするため、ハイランド地方の広い範囲でゲール語と英語を併記した道路標識が見られる。",
  ),
  q(
    5,
    "What is the name for the British afternoon treat of scones served with clotted cream and jam?|¿Cómo se llama el tentempié británico de la tarde compuesto por scones servidos con nata cuajada y mermelada?|Comment appelle-t-on la collation britannique de l'après-midi composée de scones servis avec crème caillée et confiture ?|スコーンにクロテッドクリームとジャムを添えて出す、イギリスの午後の軽食は?",
    [
      "High tea|High tea|High tea|ハイティー",
      "Afternoon toast|Afternoon toast|Afternoon toast|アフタヌーン・トースト",
      "A cream tea|Un cream tea|Un cream tea|クリームティー",
    ],
    2,
    "A cream tea also comes with a pot of tea, and the correct order of jam and cream on the scone is a genuine, long-running dispute between Devon, where cream traditionally goes on first, and Cornwall, where jam does.|El cream tea también incluye una tetera, y el orden correcto de mermelada y nata en el scone es una auténtica disputa de larga data entre Devon, donde tradicionalmente va primero la nata, y Cornualles, donde va la mermelada.|Le cream tea s'accompagne aussi d'une théière, et l'ordre correct de la confiture et de la crème sur le scone fait l'objet d'un véritable débat de longue date entre le Devon, où la crème est traditionnellement posée en premier, et les Cornouailles, où c'est la confiture.|クリームティーには紅茶のポットも添えられる。スコーンにジャムとクリームのどちらを先に塗るかは、伝統的にクリームを先に塗るデヴォン州と、ジャムを先に塗るコーンウォール州のあいだで今も続く本物の論争である。",
  ),
  q(
    5,
    "Which major street festival celebrating Caribbean culture is held in London every August?|¿Qué gran festival callejero de celebración de la cultura caribeña se celebra en Londres cada agosto?|Quel grand festival de rue célébrant la culture caribéenne se tient à Londres chaque mois d'août ?|毎年8月にロンドンで開かれる、カリブ文化を祝う大規模な路上祭りは?",
    [
      "The Notting Hill Carnival|El Notting Hill Carnival|Le Notting Hill Carnival|ノッティングヒル・カーニバル",
      "The Camden Parade|El Camden Parade|Le Camden Parade|カムデン・パレード",
      "The Brixton Jubilee|El Brixton Jubilee|Le Brixton Jubilee|ブリクストン・ジュビリー",
    ],
    0,
    "Started in 1966 by members of London's Caribbean community, it has grown into one of the largest street festivals in the world, filling the surrounding streets with sound systems, steel drums and costumed parades over the August bank holiday weekend.|Iniciado en 1966 por miembros de la comunidad caribeña de Londres, ha crecido hasta convertirse en uno de los mayores festivales callejeros del mundo, llenando las calles cercanas de equipos de sonido, tambores de acero y desfiles con disfraces durante el fin de semana del festivo de agosto.|Lancé en 1966 par des membres de la communauté caribéenne de Londres, il est devenu l'un des plus grands festivals de rue au monde, remplissant les rues alentour de sound systems, de tambours métalliques et de défilés costumés pendant le week-end férié d'août.|1966年、ロンドンのカリブ系コミュニティの人々によって始まったこの祭りは、いまや世界最大級の路上祭りに成長した。8月のバンク・ホリデーの週末、周辺の通りはサウンドシステムやスチールドラム、仮装のパレードで埋め尽くされる。",
  ),
  q(
    5,
    "Which prickly plant is the national emblem of Scotland?|¿Qué planta espinosa es el emblema nacional de Escocia?|Quelle plante épineuse est l'emblème national de l'Écosse ?|スコットランドの国章に使われる、とげのある植物は?",
    [
      "The heather|El brezo|La bruyère|ヘザー(ヒース)",
      "The thistle|El cardo|Le chardon|アザミ",
      "The gorse|El tojo|L'ajonc|ハリエニシダ",
    ],
    1,
    "Legend holds that a barefoot Norse invader betrayed his army's stealthy night attack by stepping on a thistle and crying out, and the plant appears today on Scottish coins, the badge of Scotland's rugby team and countless whisky labels.|La leyenda cuenta que un invasor nórdico descalzo delató a su ejército durante un ataque nocturno sigiloso al pisar un cardo y gritar de dolor, y hoy la planta aparece en monedas escocesas, en el emblema del equipo de rugby de Escocia y en incontables etiquetas de whisky.|La légende raconte qu'un envahisseur norrois pieds nus trahit l'attaque nocturne furtive de son armée en marchant sur un chardon et en criant, et la plante figure aujourd'hui sur les pièces écossaises, l'emblème de l'équipe de rugby d'Écosse et d'innombrables étiquettes de whisky.|伝説によれば、裸足のノルド人の侵略者が夜襲の最中にアザミを踏んで叫び声を上げ、味方の奇襲を台無しにしたという。この植物は今もスコットランドの硬貨やラグビー代表のエンブレム、数え切れないウイスキーのラベルに描かれている。",
  ),
  q(
    6,
    "Cornish pasties were traditionally baked with a thick crimped edge along one side, mainly so that whom could eat them without washing their hands first?|Los pasteles córnicos se horneaban tradicionalmente con un borde grueso y rizado a un lado, sobre todo para que quién pudiera comerlos sin lavarse antes las manos?|Les pasties de Cornouailles étaient traditionnellement cuits avec un bord épais et ondulé sur un côté, surtout pour que qui puisse les manger sans se laver les mains au préalable ?|コーニッシュ・パスティは伝統的に片側に厚くひだを寄せた縁を付けて焼かれたが、それは主に誰が手を洗わずに食べられるようにするためだったか?",
    [
      "Fishermen|Los pescadores|Les pêcheurs|漁師",
      "Tin miners|Los mineros del estaño|Les mineurs d'étain|錫の鉱夫",
      "Shepherds|Los pastores|Les bergers|羊飼い",
    ],
    1,
    "The crimped crust served as a disposable handle that let workers with hands covered in coal dust or arsenic-laced tin ore eat their lunch underground without poisoning themselves, and some miners are said to have thrown the crust away afterward rather than eating it.|La corteza rizada servía de asa desechable que permitía a los trabajadores, con las manos llenas de polvo de carbón o de mineral de estaño con arsénico, comer su almuerzo bajo tierra sin envenenarse, y se dice que algunos mineros tiraban después la corteza en lugar de comérsela.|La croûte ondulée servait de poignée jetable permettant aux ouvriers, les mains couvertes de poussière de charbon ou de minerai d'étain chargé d'arsenic, de manger leur repas sous terre sans s'empoisonner, et certains mineurs, dit-on, jetaient ensuite cette croûte au lieu de la manger.|ひだを寄せた縁は使い捨ての持ち手として機能し、石炭の粉や砒素を含む錫鉱石で手が汚れた労働者でも、地下で中毒を起こさずに昼食を取ることができた。この縁の部分は食べずに捨てていた鉱夫もいたと伝わる。",
  ),
  q(
    6,
    "What term describes the historical process, formalised by many Acts of Parliament, of fencing off common land into privately owned fields?|¿Qué término describe el proceso histórico, formalizado por numerosas leyes del Parlamento, de vallar tierras comunales para convertirlas en campos de propiedad privada?|Quel terme désigne le processus historique, formalisé par de nombreuses lois du Parlement, consistant à clôturer des terres communes pour en faire des champs de propriété privée ?|多くの議会制定法によって形式化された、共有地を柵で囲って私有地に変える歴史的な過程を指す語は?",
    [
      "Enclosure|El enclosure (cercamiento)|L'enclosure|囲い込み(エンクロージャー)",
      "Devolution|La devolution|La dévolution|権限委譲",
      "Plantation|La plantation|La plantation|プランテーション",
    ],
    0,
    "Enclosure peaked between the 18th and 19th centuries and reshaped the English countryside into the neat patchwork of hedged fields still visible from the air today, while stripping many small farmers of land they had traditionally grazed and gathered on.|La cerca alcanzó su apogeo entre los siglos XVIII y XIX y transformó el campo inglés en el pulcro mosaico de campos vallados con setos aún visible hoy desde el aire, a la vez que despojó a muchos pequeños agricultores de tierras en las que tradicionalmente pastaban y recolectaban.|L'enclosure atteignit son apogée entre les XVIIIe et XIXe siècles et transforma la campagne anglaise en cette mosaïque nette de champs bordés de haies encore visible aujourd'hui depuis les airs, tout en dépouillant de nombreux petits agriculteurs des terres où ils faisaient traditionnellement paître leur bétail et récoltaient.|「囲い込み(エンクロージャー)」は18〜19世紀にかけて最盛期を迎え、イングランドの田園地帯を、今も空から見える生垣で仕切られた整然としたパッチワーク模様へと作り変えた。その一方で、伝統的に放牧や採集を行ってきた多くの小農から土地を奪う結果にもなった。",
  ),
  q(
    6,
    "In what year did the Stockton and Darlington Railway, widely regarded as the world's first railway to carry fare-paying passengers, open?|¿En qué año abrió el ferrocarril de Stockton a Darlington, considerado ampliamente el primero del mundo en transportar pasajeros de pago?|En quelle année le chemin de fer de Stockton à Darlington, largement considéré comme le premier au monde à transporter des passagers payants, a-t-il ouvert ?|有料の乗客を運んだ世界初の鉄道と広くみなされているストックトン・アンド・ダーリントン鉄道が開業したのは何年か?",
    [
      "1769|1769|1769|1769年",
      "1801|1801|1801|1801年",
      "1825|1825|1825|1825年",
    ],
    2,
    "The line was built mainly to haul coal, and George Stephenson's locomotive Locomotion No. 1 pulled both goods wagons and a single passenger coach called Experiment on the opening day, a modest start to what became a worldwide industry.|La línea se construyó sobre todo para transportar carbón, y la locomotora Locomotion No. 1 de George Stephenson arrastró el día de su inauguración tanto vagones de mercancías como un único vagón de pasajeros llamado Experiment, un modesto inicio de lo que se convertiría en una industria mundial.|La ligne fut construite surtout pour transporter le charbon, et la locomotive Locomotion No. 1 de George Stephenson tira le jour de l'ouverture à la fois des wagons de marchandises et une unique voiture de voyageurs appelée Experiment, modeste début de ce qui deviendrait une industrie mondiale.|この路線は主に石炭輸送のために建設され、開業日にはジョージ・スティーヴンソンの機関車「ロコモーション号」が貨物車とともに「エクスペリメント号」という乗客用車両1両を牽引した。これが、のちに世界規模の産業へと育つ、ささやかな始まりだった。",
  ),
  q(
    6,
    "The nationalised operator British Rail was broken up and its services privatised during which decade?|El operador nacionalizado British Rail se dividió y sus servicios se privatizaron ¿durante qué década?|L'opérateur nationalisé British Rail fut démantelé et ses services privatisés au cours de quelle décennie ?|国有事業者だったブリティッシュ・レイルが解体され、事業が民営化されたのはどの年代か?",
    [
      "The 1970s|Los años 70|Les années 1970|1970年代",
      "The 1990s|Los años 90|Les années 1990|1990年代",
      "The 2010s|Los años 2010|Les années 2010|2010年代",
    ],
    1,
    "The changeover split the old single network into separate companies running trains, owning stations and maintaining the tracks, an unusual structure that later prompted the government to bring the track infrastructure back under public ownership in 2002.|El cambio dividió la antigua red única en compañías separadas que operaban los trenes, poseían las estaciones y mantenían las vías, una estructura inusual que más tarde llevó al gobierno a devolver la infraestructura de vías a manos públicas en 2002.|La transition scinda l'ancien réseau unique en compagnies distinctes exploitant les trains, possédant les gares et entretenant les voies, une structure inhabituelle qui poussa plus tard le gouvernement à renationaliser l'infrastructure des voies en 2002.|この移行によって、それまで一つだった鉄道網は、列車の運行・駅の所有・線路の保守をそれぞれ別々の会社が担う形に分割された。この異例の構造はのちに政府を動かし、2002年には線路インフラだけが公有に戻されることになった。",
  ),
  q(
    6,
    "What is the name of Wales's major festival of competitive music, poetry and performance, traditionally held in August?|¿Cómo se llama el gran festival galés de competiciones de música, poesía y actuación, celebrado tradicionalmente en agosto?|Comment appelle-t-on le grand festival gallois de concours de musique, de poésie et de représentations, traditionnellement tenu en août ?|伝統的に8月に開かれる、音楽・詩・演芸を競い合うウェールズの大きな祭典は?",
    [
      "The Eisteddfod|El Eisteddfod|L'Eisteddfod|エイステズヴォッド",
      "The Ceilidh Fair|El Ceilidh Fair|Le Ceilidh Fair|ケイリー・フェア",
      "The Bardic Games|Los Bardic Games|Les Bardic Games|バード・ゲームズ",
    ],
    0,
    "The National Eisteddfod is conducted almost entirely in Welsh and moves to a different location each year, and its ceremonies still feature robed figures called bards competing for a chair awarded to the best original poem.|El Eisteddfod Nacional se celebra casi enteramente en galés y cambia de sede cada año, y sus ceremonias aún presentan a figuras togadas llamadas bardos que compiten por una silla otorgada al mejor poema original.|L'Eisteddfod national se déroule presque entièrement en gallois et change de lieu chaque année, et ses cérémonies mettent encore en scène des figures en robe appelées bardes, rivalisant pour un fauteuil décerné au meilleur poème original.|全国エイステズヴォッドはほぼ全編ウェールズ語で行われ、開催地は毎年変わる。式典では今も「バード」と呼ばれるローブ姿の詩人たちが、最も優れた創作詩に贈られる椅子を競い合う。",
  ),
  q(
    7,
    "The 1,435mm rail gauge used across most of Britain and much of the world is generally traced back to what?|El ancho de vía de 1.435 mm usado en la mayor parte de Gran Bretaña y de buena parte del mundo suele remontarse a ¿qué?|L'écartement des voies de 1 435 mm utilisé dans la majeure partie de la Grande-Bretagne et de la planète remonte généralement à quoi ?|イギリスの大半と世界の多くで使われる1435mmの軌間は、一般に何にさかのぼるとされるか?",
    [
      "A Roman legal decree|Un decreto legal romano|Un décret légal romain|ローマの法令",
      "The wheel spacing of early horse-drawn wagonways|La separación de ruedas de las primeras vagonetas tiradas por caballos|L'écartement des roues des premières voies de chariots tirés par des chevaux|初期の馬引き貨車軌道の車輪間隔",
      "An international treaty|Un tratado internacional|Un traité international|国際条約",
    ],
    1,
    "Engineer George Stephenson used the spacing already common on colliery wagonways near Newcastle when building his early locomotives, and as his firm exported engines and expertise, the measurement spread to become the world's dominant gauge almost by accident.|El ingeniero George Stephenson usó la separación ya habitual en las vagonetas de las minas de carbón cerca de Newcastle al construir sus primeras locomotoras, y a medida que su empresa exportaba motores y experiencia, la medida se extendió hasta convertirse casi por accidente en el ancho de vía dominante en el mundo.|L'ingénieur George Stephenson utilisa l'écartement déjà courant sur les voies de chariots des houillères près de Newcastle en construisant ses premières locomotives, et à mesure que sa société exportait moteurs et savoir-faire, cette mesure se répandit pour devenir presque par accident l'écartement dominant dans le monde.|技師ジョージ・スティーヴンソンは初期の機関車を作る際、ニューカッスル近郊の炭鉱の貨車軌道ですでに使われていた間隔をそのまま採用した。彼の会社が機関車と技術を輸出するにつれてこの寸法は広まり、ほとんど成り行きで世界で最も普及した軌間になった。",
  ),
  q(
    7,
    "Isambard Kingdom Brunel's Great Western Railway was originally built to a wider track gauge than most of Britain, leading to what problem, sometimes called the \"gauge war\"?|El Great Western Railway de Isambard Kingdom Brunel se construyó originalmente con un ancho de vía mayor que el de casi toda Gran Bretaña, dando lugar a ¿qué problema, a veces llamado la «guerra de anchos»?|Le Great Western Railway d'Isambard Kingdom Brunel fut à l'origine construit avec un écartement de voie plus large que le reste de la Grande-Bretagne, provoquant quel problème, parfois appelé « la guerre des écartements » ?|イザムバード・キングダム・ブルネルのグレート・ウェスタン鉄道は、イギリスの大半より広い軌間で建設されたため、「軌間戦争」とも呼ばれるどんな問題を引き起こしたか?",
    [
      "Trains ran too slowly to be profitable|Los trenes iban demasiado lentos para ser rentables|Les trains roulaient trop lentement pour être rentables|列車が遅すぎて採算が合わなかった",
      "Goods and passengers had to be transferred between trains where the two gauges met|Mercancías y pasajeros debían trasbordarse de tren donde se encontraban los dos anchos|Marchandises et voyageurs devaient être transbordés là où les deux écartements se rencontraient|二つの軌間が接する場所で貨物や乗客を乗り換えさせる必要があった",
      "The trains were too narrow to carry standard freight|Los trenes eran demasiado estrechos para transportar mercancía estándar|Les trains étaient trop étroits pour transporter du fret standard|列車が狭すぎて標準的な貨物を運べなかった",
    ],
    1,
    "Brunel argued his wider 7-foot gauge gave a smoother, faster ride, but the mismatch with the rest of the growing rail network proved too costly, and the last broad-gauge track was converted to standard gauge in a single frantic weekend in 1892.|Brunel sostenía que su ancho de vía de 7 pies daba un viaje más suave y rápido, pero el desajuste con el resto de la red ferroviaria en crecimiento resultó demasiado costoso, y la última vía de ancho ancho se convirtió a ancho estándar en un único y frenético fin de semana en 1892.|Brunel soutenait que son écartement plus large de 7 pieds offrait un trajet plus doux et plus rapide, mais l'incompatibilité avec le reste du réseau ferroviaire en pleine expansion se révéla trop coûteuse, et la dernière voie à large écartement fut convertie à l'écartement standard en un seul week-end frénétique en 1892.|ブルネルは自らの7フィート軌間の方が乗り心地が滑らかで速いと主張したが、拡大を続ける他の鉄道網との不一致はあまりに費用がかさむものだった。最後まで残った広軌の路線も、1892年のたった一度の慌ただしい週末で標準軌へと改修された。",
  ),
  q(
    7,
    "What is the nickname for the sweeping closure of thousands of miles of British railway lines and stations following a 1963 government report?|¿Cómo se apoda el cierre masivo de miles de kilómetros de líneas y estaciones ferroviarias británicas tras un informe gubernamental de 1963?|Comment surnomme-t-on la fermeture massive de milliers de kilomètres de lignes et de gares ferroviaires britanniques à la suite d'un rapport gouvernemental de 1963 ?|1963年の政府報告書を受けて、数千キロにも及ぶイギリスの鉄道路線・駅が一気に閉鎖されたことを指す通称は?",
    [
      "The Beeching Axe|El hacha de Beeching|La hache de Beeching|ビーチング斧",
      "The Great Cutback|El Great Cutback|Le Great Cutback|大削減",
      "The Iron Purge|El Iron Purge|L'Iron Purge|鉄の粛清",
    ],
    0,
    "The report was written by Dr Richard Beeching, a former chemist brought in to make the railways profitable, and although some closed lines have since reopened, many rural communities are still without the station they lost in the 1960s.|El informe lo redactó el doctor Richard Beeching, un antiguo químico llamado a hacer rentables los ferrocarriles, y aunque algunas líneas cerradas han reabierto desde entonces, muchas comunidades rurales siguen sin la estación que perdieron en los años sesenta.|Le rapport fut rédigé par le docteur Richard Beeching, un ancien chimiste chargé de rendre les chemins de fer rentables, et bien que certaines lignes fermées aient rouvert depuis, de nombreuses communautés rurales sont toujours privées de la gare perdue dans les années 1960.|この報告書を書いたのは、鉄道を黒字化するために起用された元化学者リチャード・ビーチング博士だった。閉鎖された路線の一部はその後再開したものの、多くの農村地域は今も1960年代に失った駅を取り戻せていない。",
  ),
  q(
    7,
    "What geographic (not political) term refers to the entire group of islands including both Great Britain and Ireland?|¿Qué término geográfico (no político) designa a todo el grupo de islas que incluye tanto Gran Bretaña como Irlanda?|Quel terme géographique (et non politique) désigne l'ensemble du groupe d'îles comprenant à la fois la Grande-Bretagne et l'Irlande ?|グレートブリテン島とアイルランド島を含む島々全体を指す(政治的ではなく)地理的な用語は?",
    [
      "The Home Nations|The Home Nations|The Home Nations|ホーム・ネイションズ",
      "The British Isles|Las Islas Británicas|Les îles Britanniques|ブリテン諸島",
      "The Anglo Archipelago|El Anglo Archipelago|L'Anglo Archipelago|アングロ諸島",
    ],
    1,
    "The term is geographic rather than political, since it includes the sovereign Republic of Ireland, and for that reason many people in Ireland avoid the phrase, preferring simply \"Britain and Ireland\" instead.|El término es geográfico y no político, ya que incluye a la República de Irlanda, un estado soberano, y por esa razón mucha gente en Irlanda evita la expresión, prefiriendo simplemente «Gran Bretaña e Irlanda».|Le terme est géographique et non politique, puisqu'il englobe la République d'Irlande, un État souverain, et pour cette raison, beaucoup de gens en Irlande évitent l'expression, préférant simplement « la Grande-Bretagne et l'Irlande ».|この語は政治的ではなくあくまで地理的な区分であり、主権国家であるアイルランド共和国も含まれる。そのためアイルランドの多くの人はこの呼び方を避け、単に「ブリテンとアイルランド」という言い方を好む。",
  ),
  q(
    7,
    "Which self-governing island in the Irish Sea, with its own parliament called the Tynwald, is not actually part of the United Kingdom?|¿Qué isla autónoma del mar de Irlanda, con su propio parlamento llamado Tynwald, no forma en realidad parte del Reino Unido?|Quelle île autonome de la mer d'Irlande, dotée de son propre parlement appelé le Tynwald, ne fait en réalité pas partie du Royaume-Uni ?|独自の議会「ティンヴァルド」を持つ自治領で、実はイギリスの一部ではないアイリッシュ海の島は?",
    [
      "Anglesey|Anglesey|Anglesey|アングルシー島",
      "The Isle of Wight|La Isla de Wight|L'île de Wight|ワイト島",
      "The Isle of Man|La Isla de Man|L'île de Man|マン島",
    ],
    2,
    "The Isle of Man is a Crown Dependency, meaning it is linked to the British Crown but governs its own domestic affairs, sets its own taxes and even issues its own banknotes and stamps, while relying on the UK for defence and foreign policy.|La isla de Man es una dependencia de la Corona, lo que significa que está vinculada a la Corona británica pero gobierna sus propios asuntos internos, fija sus propios impuestos e incluso emite sus propios billetes y sellos, aunque depende del Reino Unido en defensa y política exterior.|L'île de Man est une dépendance de la Couronne, ce qui signifie qu'elle est liée à la Couronne britannique mais gère ses propres affaires intérieures, fixe ses propres impôts et émet même ses propres billets de banque et timbres, tout en s'appuyant sur le Royaume-Uni pour la défense et la politique étrangère.|マン島は「クラウン・ディペンデンシー(王室属領)」であり、英国王室とはつながりを持ちながらも、内政や税制は自ら決め、独自の紙幣や切手まで発行している。ただし防衛と外交はイギリスに委ねている。",
  ),
  q(
    7,
    "Jersey and Guernsey, closer to the coast of France than to England, share what constitutional status with the Isle of Man?|Jersey y Guernsey, más cerca de la costa francesa que de Inglaterra, comparten ¿qué estatus constitucional con la isla de Man?|Jersey et Guernesey, plus proches de la côte française que de l'Angleterre, partagent quel statut constitutionnel avec l'île de Man ?|イングランドよりもフランス沿岸に近いジャージー島とガーンジー島は、マン島とどんな憲法上の地位を共有しているか?",
    [
      "Crown Dependency|Dependencia de la Corona|Dépendance de la Couronne|クラウン・ディペンデンシー(王室属領)",
      "Overseas Territory|Territorio de Ultramar|Territoire d'outre-mer|海外領土",
      "Devolved nation|Nación con poderes devueltos|Nation dévolue|権限委譲された国",
    ],
    0,
    "The Channel Islands are the last remnant of the medieval Duchy of Normandy still linked to the English Crown, which is why the British monarch is traditionally toasted there not as king or queen but by the old ducal title.|Las Islas del Canal son el último resto del medieval Ducado de Normandía que aún permanece ligado a la Corona inglesa, razón por la cual allí se brinda tradicionalmente por el monarca británico no como rey o reina, sino con el antiguo título ducal.|Les îles Anglo-Normandes sont le dernier vestige du duché médiéval de Normandie encore rattaché à la Couronne anglaise, raison pour laquelle on y porte traditionnellement un toast au monarque britannique non pas en tant que roi ou reine, mais sous l'ancien titre ducal.|チャンネル諸島は、中世のノルマンディー公国のうちいまもイングランド王室とつながりを保つ最後の名残である。そのため島では伝統的に、英国君主を「王」「女王」としてではなく、古い公爵の称号で祝杯を挙げる。",
  ),
  q(
    7,
    "The Domesday Book, a huge survey of landholdings ordered by a Norman king, was compiled in which year?|El Domesday Book, un enorme censo de propiedades ordenado por un rey normando, se compiló ¿en qué año?|Le Domesday Book, un immense recensement des terres ordonné par un roi normand, fut compilé en quelle année ?|ノルマン人の王の命で行われた土地台帳の大規模調査「ドゥームズデイ・ブック」が編纂されたのは何年か?",
    [
      "1016|1016|1016|1016年",
      "1086|1086|1086|1086年",
      "1215|1215|1215|1215年",
    ],
    1,
    "William the Conqueror ordered the survey to work out exactly who owned what and how much tax it was worth, and it was nicknamed \"Domesday\" because, like the biblical Last Judgement, its verdict on landholding was considered final and beyond appeal.|Guillermo el Conquistador ordenó el censo para averiguar exactamente quién poseía qué y cuánto impuesto valía, y se apodó «Domesday» porque, como el Juicio Final bíblico, su veredicto sobre la propiedad se consideraba definitivo e inapelable.|Guillaume le Conquérant ordonna ce recensement pour déterminer exactement qui possédait quoi et à combien s'élevait l'impôt dû, et il fut surnommé « Domesday » parce que, comme le Jugement dernier biblique, son verdict sur la propriété foncière était considéré comme définitif et sans appel.|ウィリアム征服王は、誰が何を所有しどれだけの税を負うかを正確に把握するためこの調査を命じた。「ドゥームズデイ(最後の審判)」と呼ばれたのは、聖書の最後の審判のように、その裁定が最終的で異議を申し立てられないものとみなされたからである。",
  ),
  q(
    7,
    "The line of zero degrees longitude, from which the world's time zones are measured, passes through which London district?|La línea de longitud cero, desde la cual se miden los husos horarios del mundo, ¿por qué distrito de Londres pasa?|La ligne de longitude zéro, à partir de laquelle sont mesurés les fuseaux horaires du monde, traverse quel quartier de Londres ?|世界の時間帯の基準となる経度0度線が通っているロンドンの地区は?",
    [
      "Kensington|Kensington|Kensington|ケンジントン",
      "Camden|Camden|Camden|カムデン",
      "Greenwich|Greenwich|Greenwich|グリニッジ",
    ],
    2,
    "The line was fixed at the Royal Observatory in Greenwich by international agreement in 1884, largely because so many ships already used British charts based on it, and visitors today can stand with one foot in each hemisphere on a line marked in the observatory's courtyard.|La línea se fijó en el Real Observatorio de Greenwich por acuerdo internacional en 1884, en gran parte porque muchos barcos ya usaban cartas británicas basadas en ella, y hoy los visitantes pueden plantarse con un pie en cada hemisferio sobre una línea marcada en el patio del observatorio.|La ligne fut fixée à l'Observatoire royal de Greenwich par accord international en 1884, en grande partie parce que tant de navires utilisaient déjà des cartes britanniques fondées sur elle, et les visiteurs peuvent aujourd'hui se tenir un pied dans chaque hémisphère sur une ligne tracée dans la cour de l'observatoire.|この線は1884年、国際協定によりグリニッジ天文台を基準に定められた。すでに多くの船がこの線をもとにしたイギリスの海図を使っていたことが大きな理由である。訪れた人は今も、天文台の中庭に引かれた線をまたぎ、片足ずつを東西両半球に置くことができる。",
  ),
  q(
    7,
    "What is notable about the tidal range (the difference between high and low tide) of the River Severn estuary?|¿Qué tiene de destacable el rango de marea (la diferencia entre pleamar y bajamar) del estuario del río Severn?|Qu'a de remarquable l'amplitude de marée (la différence entre marée haute et marée basse) de l'estuaire de la Severn ?|セヴァン川河口の潮汐差(満潮と干潮の差)について特筆すべき点は?",
    [
      "It is among the largest anywhere in the world|Está entre las mayores del mundo|Elle figure parmi les plus grandes au monde|世界でも屈指の大きさである",
      "It barely changes at all through the year|Apenas cambia a lo largo del año|Elle varie à peine tout au long de l'année|一年を通してほとんど変化しない",
      "It reverses direction only once a decade|Cambia de sentido solo una vez por década|Elle change de sens seulement une fois par décennie|向きが変わるのは10年に一度だけである",
    ],
    0,
    "At certain times of year the difference between high and low tide can reach around 15 metres, a swing so large it produces the Severn Bore, a wave that travels upstream against the river's own current.|En ciertas épocas del año, la diferencia entre pleamar y bajamar puede alcanzar unos 15 metros, un vaivén tan grande que produce el Severn Bore, una ola que viaja río arriba en contra de la propia corriente del río.|À certaines périodes de l'année, la différence entre marée haute et marée basse peut atteindre environ 15 mètres, une amplitude si vaste qu'elle produit le mascaret de la Severn, une vague qui remonte le fleuve à contre-courant.|年によっては満潮と干潮の差が約15mにも達することがあり、これほど大きな潮の動きが、川の流れに逆らって上流へ進む波「セヴァン・ボア」を生み出す。",
  ),
  q(
    7,
    "What special legal status did the European Union grant the \"Cornish pasty\" in 2011, restricting the name to pasties made in Cornwall?|¿Qué estatus legal especial concedió la Unión Europea al «Cornish pasty» en 2011, restringiendo el nombre a los pasteles elaborados en Cornualles?|Quel statut juridique spécial l'Union européenne a-t-elle accordé au « Cornish pasty » en 2011, réservant ce nom aux pâtés fabriqués en Cornouailles ?|2011年、EUが「コーニッシュ・パスティ」に与え、コーンウォールで作られたものだけにこの名称の使用を限った特別な法的地位は?",
    [
      "A patented recipe|Una receta patentada|Une recette brevetée|特許を取ったレシピ",
      "Protected Geographical Indication status|Estatus de Indicación Geográfica Protegida|Le statut d'indication géographique protégée|保護地理的表示の地位",
      "A royal warrant|Un royal warrant|Un royal warrant|王室御用達の認可",
    ],
    1,
    "The designation covers the pasty's D-shape and side crimp but, notably, does not require any specific filling recipe, so bakers within Cornwall still argue over what mix of beef, potato, swede and onion counts as authentic.|La denominación cubre la forma en D del pastel y el rizado lateral, pero, cabe destacar, no exige ninguna receta específica de relleno, así que los panaderos de Cornualles siguen discutiendo qué mezcla de ternera, patata, nabo sueco y cebolla se considera auténtica.|La désignation couvre la forme en D du pasty et son bord ondulé sur le côté mais, fait notable, n'impose aucune recette de garniture précise, si bien que les boulangers de Cornouailles se disputent encore sur le mélange de bœuf, pomme de terre, rutabaga et oignon jugé authentique.|この認定はパスティのD字形と側面のひだを対象とするが、注目すべきことに具体的な詰め物のレシピまでは定めていない。そのためコーンウォール内のパン職人たちは、牛肉・じゃがいも・スウェーデ(ルタバガ)・玉ねぎのどんな配合が「本物」かをめぐって今も論争している。",
  ),
  q(
    7,
    "Besides English and Scottish Gaelic, which distinct Germanic language variety, with words like \"bairn\" for child and \"wee\" for small, is spoken across the Scottish Lowlands?|Además del inglés y el gaélico escocés, ¿qué variedad lingüística germánica distinta, con palabras como «bairn» para niño y «wee» para pequeño, se habla por las Tierras Bajas escocesas?|Outre l'anglais et le gaélique écossais, quelle variété linguistique germanique distincte, avec des mots comme « bairn » pour enfant et « wee » pour petit, est parlée dans les Lowlands écossais ?|英語やスコットランド・ゲール語とは別に、子供を意味する「ベアン」や小さいを意味する「ウィー」といった語を持ち、スコットランドのローランド地方で話される独自のゲルマン系言語(方言)は?",
    [
      "Doric French|El francés dórico|Le français dorique|ドリック・フレンチ",
      "Norn|El norn|Le norn|ノルン語",
      "Scots|El scots|Le scots|スコッツ語",
    ],
    2,
    "Scots developed from the same Old English roots as standard English but branched off centuries ago, and linguists still debate whether it should count as a separate language or a dialect of English, a question with no single settled answer.|El scots se desarrolló de las mismas raíces del inglés antiguo que el inglés estándar, pero se separó hace siglos, y los lingüistas aún debaten si debe contarse como una lengua aparte o como un dialecto del inglés, una cuestión sin una única respuesta zanjada.|Le scots s'est développé à partir des mêmes racines de vieil anglais que l'anglais standard, mais s'en est détaché il y a des siècles, et les linguistes débattent encore pour savoir s'il faut le considérer comme une langue à part ou un dialecte de l'anglais, une question sans réponse tranchée.|スコッツ語は標準英語と同じ古英語の系統から生まれたが、何世紀も前に枝分かれした。これを独立した言語とみなすべきか英語の方言とみなすべきかは、言語学者のあいだでもいまだ決着のつかない議論である。",
  ),
  q(
    7,
    "Place names ending in \"-by\" (as in Whitby) or \"-thwaite\" (as in Braithwaite), common in northern England, trace back to which historical settlers?|Los topónimos que terminan en «-by» (como Whitby) o «-thwaite» (como Braithwaite), comunes en el norte de Inglaterra, se remontan a ¿qué colonos históricos?|Les noms de lieux se terminant en « -by » (comme Whitby) ou « -thwaite » (comme Braithwaite), courants dans le nord de l'Angleterre, remontent à quels colons historiques ?|イングランド北部によく見られる、「-by」(ウィットビーなど)や「-thwaite」(ブレイスウェイトなど)で終わる地名は、どんな歴史上の入植者にさかのぼるか?",
    [
      "Norse (Viking) settlers|Colonos nórdicos (vikingos)|Des colons norrois (vikings)|ノルド人(ヴァイキング)の入植者",
      "Norman French settlers|Colonos franconormandos|Des colons normands|ノルマン系フランス人の入植者",
      "Roman legionaries|Legionarios romanos|Des légionnaires romains|ローマの軍団兵",
    ],
    0,
    "\"-by\" meant \"farmstead\" or \"settlement\" and \"-thwaite\" meant \"a cleared piece of land\" in Old Norse, and the dense cluster of such names across Yorkshire and Cumbria still traces the rough outline of the old Viking kingdom known as the Danelaw.|En nórdico antiguo, «-by» significaba «granja» o «asentamiento» y «-thwaite», «un terreno desbrozado», y la densa concentración de tales nombres en Yorkshire y Cumbria aún traza el contorno aproximado del antiguo reino vikingo conocido como Danelaw.|En vieux norrois, « -by » signifiait « ferme » ou « établissement » et « -thwaite », « une parcelle de terre défrichée », et la forte concentration de tels noms en Yorkshire et en Cumbria dessine encore le contour approximatif de l'ancien royaume viking appelé le Danelaw.|古ノルド語で「-by」は「農場」や「集落」を、「-thwaite」は「開墾地」を意味した。ヨークシャーやカンブリアに密集するこうした地名は、いまもかつてのヴァイキング王国「デーンロウ」のおおよその輪郭をたどっている。",
  ),
  q(
    7,
    "In 1603, what event united the crowns (though not yet the parliaments) of England and Scotland under a single monarch?|En 1603, ¿qué acontecimiento unió las coronas (aunque no todavía los parlamentos) de Inglaterra y Escocia bajo un único monarca?|En 1603, quel événement unit les couronnes (mais pas encore les parlements) d'Angleterre et d'Écosse sous un seul monarque ?|1603年、イングランドとスコットランドの王冠(議会はまだ別のまま)を一人の君主のもとに統合した出来事は?",
    [
      "The Treaty of Edinburgh|El Tratado de Edimburgo|Le traité d'Édimbourg|エディンバラ条約",
      "James VI of Scotland inheriting the English throne|Jacobo VI de Escocia heredando el trono inglés|Jacques VI d'Écosse héritant du trône anglais|スコットランド王ジェームズ6世のイングランド王位継承",
      "The marriage of Mary Queen of Scots|El matrimonio de María Estuardo|Le mariage de Marie Stuart|スコットランド女王メアリーの結婚",
    ],
    1,
    "James VI of Scotland became James I of England after his distant cousin Elizabeth I died childless, but the two countries kept separate parliaments, laws and churches for another century, until the 1707 Act of Union merged the parliaments too.|Jacobo VI de Escocia se convirtió en Jacobo I de Inglaterra tras la muerte sin hijos de su prima lejana Isabel I, pero ambos países mantuvieron parlamentos, leyes e iglesias separados durante otro siglo, hasta que el Acta de Unión de 1707 fusionó también los parlamentos.|Jacques VI d'Écosse devint Jacques Ier d'Angleterre après la mort sans enfant de sa cousine éloignée Élisabeth Ire, mais les deux pays conservèrent des parlements, des lois et des Églises distincts pendant un autre siècle, jusqu'à ce que l'Acte d'Union de 1707 fusionne aussi les parlements.|スコットランド王ジェームズ6世は、遠縁にあたるエリザベス1世が子のないまま没したことでイングランド王ジェームズ1世を兼ねることになった。しかし両国は議会・法律・教会をその後もさらに1世紀にわたって別々に保ち、1707年の合同法でようやく議会も一つになった。",
  ),
  q(
    8,
    "Why can most modern continental European double-deck trains not simply run on Britain's mainline railway?|¿Por qué la mayoría de los trenes modernos de dos pisos de la Europa continental no pueden simplemente circular por la red ferroviaria principal de Gran Bretaña?|Pourquoi la plupart des trains modernes à deux étages d'Europe continentale ne peuvent-ils pas tout simplement circuler sur le réseau ferroviaire principal de Grande-Bretagne ?|大陸ヨーロッパの現代の2階建て列車の多くが、そのままではイギリスの幹線鉄道を走れないのはなぜか?",
    [
      "British rails are spaced too far apart|Los raíles británicos están demasiado separados|Les rails britanniques sont trop espacés|イギリスのレール間隔が広すぎるから",
      "British trains run on a different electrical current|Los trenes británicos usan una corriente eléctrica distinta|Les trains britanniques fonctionnent sur un courant électrique différent|イギリスの列車は異なる電流方式で走るから",
      "Britain's tunnels and bridges leave far less clearance around the train|Los túneles y puentes británicos dejan mucho menos espacio alrededor del tren|Les tunnels et les ponts britanniques laissent bien moins d'espace autour du train|イギリスのトンネルや橋は列車周囲の余裕がはるかに小さいから",
    ],
    2,
    "Britain's railways were mostly built earlier and more cheaply than continental networks, so tunnels, bridges and platforms were dug and built to a tighter cross-section, a constraint known as the loading gauge that has never been fully undone since.|Los ferrocarriles británicos se construyeron en su mayoría antes y más barato que las redes continentales, así que túneles, puentes y andenes se excavaron y edificaron con una sección más ajustada, una limitación conocida como el «gálibo» que nunca se ha deshecho por completo desde entonces.|Les chemins de fer britanniques furent pour la plupart construits plus tôt et à moindre coût que les réseaux continentaux, si bien que tunnels, ponts et quais furent creusés et bâtis selon une section plus étroite, une contrainte appelée gabarit de chargement, jamais totalement corrigée depuis.|イギリスの鉄道は大陸の鉄道網より早く、しかも安く建設されたことが多かったため、トンネルや橋、ホームは断面の狭い規格で掘られ・建てられた。この制約は「車両限界(ローディング・ゲージ)」と呼ばれ、それ以来一度も完全には解消されていない。",
  ),
  q(
    8,
    "Traditional Scottish haggis is a savoury pudding made mainly from what?|El haggis escocés tradicional es un pudín salado hecho principalmente de ¿qué?|Le haggis écossais traditionnel est un pudding salé confectionné principalement à partir de quoi ?|伝統的なスコットランドのハギスは主に何から作られる料理か?",
    [
      "Minced beef and breadcrumbs|Carne de vacuno picada y pan rallado|Bœuf haché et chapelure|挽いた牛肉とパン粉",
      "Sheep's offal mixed with oatmeal, suet and spices|Vísceras de oveja mezcladas con avena, sebo y especias|Des abats de mouton mêlés à de l'avoine, du suif et des épices|羊の内臓とオートミール・脂・香辛料の混合",
      "Smoked salmon and potato|Salmón ahumado y patata|Saumon fumé et pomme de terre|燻製サーモンとじゃがいも",
    ],
    1,
    "The mixture is traditionally simmered inside a sheep's stomach casing, though today artificial casings are common, and haggis is the centrepiece of Burns Night suppers every January, addressed with a poem before being ceremonially cut open.|La mezcla se cuece tradicionalmente dentro de la tripa de un estómago de oveja, aunque hoy son comunes las tripas artificiales, y el haggis es el plato central de las cenas de la Noche de Burns cada enero, al que se dirige un poema antes de abrirlo ceremoniosamente.|Le mélange mijote traditionnellement dans une panse de mouton, bien que des boyaux artificiels soient aujourd'hui courants, et le haggis est le plat vedette des soupers de la Burns Night chaque janvier, salué par un poème avant d'être ouvert cérémonieusement.|この具材は伝統的に羊の胃袋の中で煮込まれるが、今では人工のケーシングもよく使われる。ハギスは毎年1月のバーンズ・ナイトの晩餐の主役で、儀式的に切り開かれる前に詩を捧げられる。",
  ),
  q(
    8,
    "In the long-running cream tea dispute, which county is traditionally associated with spreading clotted cream on the scone before the jam?|En la larga disputa del cream tea, ¿a qué condado se asocia tradicionalmente untar primero la nata cuajada en el scone antes que la mermelada?|Dans le débat de longue date sur le cream tea, quel comté est traditionnellement associé au fait d'étaler la crème caillée sur le scone avant la confiture ?|長く続くクリームティー論争で、スコーンにジャムより先にクロテッドクリームを塗る流儀と結びつけられる伝統的な州は?",
    [
      "Devon|Devon|Devon|デヴォン州",
      "Kent|Kent|Kent|ケント州",
      "Norfolk|Norfolk|Norfolk|ノーフォーク州",
    ],
    0,
    "Neighbouring Cornwall insists jam should go on first, and the rivalry is taken seriously enough that both counties have registered protected regional food status and hold events championing their own method.|El vecino Cornualles insiste en que la mermelada debe ir primero, y la rivalidad se toma tan en serio que ambos condados han registrado denominaciones alimentarias regionales protegidas y celebran eventos que defienden su propio método.|Les Cornouailles voisines insistent pour que la confiture soit posée en premier, et la rivalité est prise assez au sérieux pour que les deux comtés aient obtenu des appellations alimentaires régionales protégées et organisent des événements défendant chacun leur méthode.|隣接するコーンウォールでは逆にジャムを先に塗るべきだと主張しており、この対立は真剣そのもので、両州とも自らの流儀を掲げて地域食品の保護表示を登録し、それぞれの方式を称えるイベントまで開いている。",
  ),
  q(
    8,
    "The Act of Union that merged the Kingdom of Great Britain and the Kingdom of Ireland into a single United Kingdom took effect in which year?|El Acta de Unión que fusionó el Reino de Gran Bretaña y el Reino de Irlanda en un único Reino Unido entró en vigor ¿en qué año?|L'Acte d'Union qui fusionna le royaume de Grande-Bretagne et le royaume d'Irlande en un seul Royaume-Uni entra en vigueur en quelle année ?|グレートブリテン王国とアイルランド王国を一つの連合王国へと統合した合同法が発効したのは何年か?",
    [
      "1707|1707|1707|1707年",
      "1801|1801|1801|1801年",
      "1837|1837|1837|1837年",
    ],
    1,
    "The merger abolished the separate Irish parliament in Dublin and gave Ireland seats at Westminster instead, a change pushed through partly in the aftermath of a failed Irish rebellion in 1798.|La fusión abolió el parlamento irlandés independiente en Dublín y dio a Irlanda escaños en Westminster en su lugar, un cambio impulsado en parte tras una fallida rebelión irlandesa de 1798.|La fusion abolit le parlement irlandais distinct à Dublin et donna à la place à l'Irlande des sièges à Westminster, un changement imposé en partie dans la foulée d'une rébellion irlandaise ratée en 1798.|この統合により、ダブリンにあった独立したアイルランド議会は廃止され、代わりにアイルランドはウェストミンスター議会に議席を得た。この変更は1798年に失敗したアイルランドの反乱の余波もあって推し進められた。",
  ),
  q(
    8,
    "Roughly how many people in Scotland reported being able to speak Scottish Gaelic in the most recent censuses, out of a population of over five million?|¿Aproximadamente cuánta gente en Escocia declaró saber hablar gaélico escocés en los censos más recientes, de una población de más de cinco millones?|Environ combien de personnes en Écosse ont-elles déclaré savoir parler le gaélique écossais lors des derniers recensements, sur une population de plus de cinq millions ?|500万人を超えるスコットランドの人口のうち、直近の国勢調査でスコットランド・ゲール語を話せると答えたのはおよそどれくらいか?",
    [
      "Around 1.5 million|Cerca de 1,5 millones|Environ 1,5 million|約150万人",
      "Around 500,000|Cerca de 500.000|Environ 500 000|約50万人",
      "Under 60,000|Menos de 60.000|Moins de 60 000|6万人未満",
    ],
    2,
    "Speaker numbers have fallen for over a century, and the language remains a majority tongue only in a handful of Outer Hebridean communities, prompting government-funded Gaelic-medium schools aimed at slowing the decline.|El número de hablantes lleva más de un siglo cayendo, y la lengua sigue siendo mayoritaria solo en un puñado de comunidades de las Hébridas Exteriores, lo que ha impulsado escuelas en gaélico financiadas por el gobierno para frenar el declive.|Le nombre de locuteurs baisse depuis plus d'un siècle, et la langue ne reste majoritaire que dans une poignée de communautés des Hébrides extérieures, ce qui a poussé à créer des écoles en gaélique financées par l'État pour ralentir ce déclin.|話者数は1世紀以上にわたって減り続けており、この言語が多数派を占めるのはアウター・ヘブリディーズ諸島のごく一部の地域だけになっている。この衰退を緩めようと、政府出資によるゲール語での教育を行う学校が設けられている。",
  ),
  q(
    8,
    "What Gaelic word describes a traditional Scottish or Irish social gathering featuring live folk music and group dancing?|¿Qué palabra gaélica describe una reunión social tradicional escocesa o irlandesa con música folk en directo y baile en grupo?|Quel mot gaélique désigne une réunion sociale traditionnelle écossaise ou irlandaise avec musique folk en direct et danses de groupe ?|生演奏のフォーク音楽と集団での踊りを伴う、伝統的なスコットランドやアイルランドの社交の集まりを指すゲール語は?",
    [
      "A ceilidh|Un ceilidh|Un ceilidh|ケイリー",
      "A hooley reel|Un hooley reel|Un hooley reel|フーリー・リール",
      "A gathering ring|Un gathering ring|Un gathering ring|ギャザリング・リング",
    ],
    0,
    "Dances at a ceilidh are usually called out and taught on the spot by a caller, so no prior experience is needed, and the events remain a fixture of Scottish weddings and Hogmanay, the Scottish New Year celebration.|Los bailes en un ceilidh suelen anunciarse y enseñarse sobre la marcha por un «caller», así que no hace falta experiencia previa, y estos eventos siguen siendo habituales en las bodas escocesas y en Hogmanay, la celebración escocesa de Año Nuevo.|Les danses lors d'un ceilidh sont généralement annoncées et enseignées sur place par un meneur, si bien qu'aucune expérience préalable n'est nécessaire, et ces événements restent un incontournable des mariages écossais et de Hogmanay, la célébration écossaise du Nouvel An.|ケイリーでの踊りは通常、その場で「コーラー」と呼ばれる進行役が声をかけながら教えてくれるため、事前の経験は要らない。今もスコットランドの結婚式や、スコットランドの大晦日の祝祭「ホグマネイ」には欠かせない催しである。",
  ),
  q(
    8,
    "The 1932 mass trespass at Kinder Scout, in which ramblers deliberately walked onto private grouse-moor land, is widely credited with helping to bring about what, decades later?|La invasión masiva de 1932 en Kinder Scout, en la que excursionistas caminaron deliberadamente por tierras privadas de brezales de caza, se le atribuye ampliamente haber ayudado a lograr ¿qué, décadas después?|L'invasion massive de Kinder Scout en 1932, où des randonneurs marchèrent délibérément sur des terres privées de landes à gibier, est largement créditée d'avoir contribué à l'obtention de quoi, des décennies plus tard ?|1932年、ハイカーたちが私有の雷鳥用荒野へあえて踏み入った「キンダー・スカウトの大量不法侵入」は、数十年後の何につながったとされているか?",
    [
      "The abolition of hunting on private land|La abolición de la caza en tierras privadas|L'abolition de la chasse sur les terres privées|私有地での狩猟の廃止",
      "Britain's national parks and legal rights for the public to roam open countryside|Los parques nacionales de Gran Bretaña y el derecho legal del público a recorrer el campo abierto|Les parcs nationaux britanniques et le droit légal du public à parcourir la campagne ouverte|イギリスの国立公園と、公衆が開けた田園地帯を自由に歩ける法的権利",
      "Free rail travel for hikers|Viajes en tren gratuitos para excursionistas|Le voyage en train gratuit pour les randonneurs|ハイカー向けの鉄道無料化",
    ],
    1,
    "Several trespassers were arrested and jailed, which turned public opinion in their favour, and the campaign is often cited as a milestone on the long road to the Countryside and Rights of Way Act, passed nearly seventy years later in 2000.|Varios de los intrusos fueron detenidos y encarcelados, lo que volcó la opinión pública a su favor, y la campaña suele citarse como un hito en el largo camino hacia la Ley del Campo y los Derechos de Paso, aprobada casi setenta años después, en 2000.|Plusieurs des contrevenants furent arrêtés et emprisonnés, ce qui retourna l'opinion publique en leur faveur, et la campagne est souvent citée comme une étape marquante sur le long chemin menant à la loi sur la campagne et les droits de passage, adoptée près de soixante-dix ans plus tard, en 2000.|侵入者の一部は逮捕・投獄され、これが世論を彼らに味方させることになった。この運動は、ほぼ70年後の2000年に成立した「田園地帯と通行権に関する法律」へと至る長い道のりの節目としてよく引き合いに出される。",
  ),
  q(
    8,
    "Roughly what share of Britain's railway route mileage did the Beeching cuts of the 1960s eliminate?|¿Aproximadamente qué proporción del kilometraje de líneas ferroviarias de Gran Bretaña eliminaron los recortes de Beeching en los años sesenta?|Quelle part environ du kilométrage des lignes ferroviaires britanniques les coupes Beeching des années 1960 ont-elles éliminée ?|1960年代のビーチングによる削減で、イギリスの鉄道路線の営業キロのうちおよそどれくらいが失われたか?",
    [
      "About a tenth|Aproximadamente una décima parte|Environ un dixième|およそ10分の1",
      "About a fifth|Aproximadamente una quinta parte|Environ un cinquième|およそ5分の1",
      "About a third|Aproximadamente un tercio|Environ un tiers|およそ3分の1",
    ],
    2,
    "Roughly 4,000 miles of track and over 2,000 stations closed in the years following the report, hitting rural branch lines hardest while leaving the busiest intercity routes largely untouched.|En los años posteriores al informe cerraron unos 4.000 kilómetros de vía y más de 2.000 estaciones, golpeando sobre todo a los ramales rurales mientras dejaban prácticamente intactas las rutas interurbanas más transitadas.|Environ 4 000 kilomètres de voies et plus de 2 000 gares fermèrent dans les années suivant le rapport, frappant surtout les lignes secondaires rurales tout en laissant largement intactes les lignes interurbaines les plus fréquentées.|報告書公表後の数年間で約4000マイルの線路と2000を超える駅が閉鎖され、農村部の支線が最も大きな打撃を受ける一方、利用の多い都市間路線はほぼ手つかずのままだった。",
  ),
  q(
    8,
    "Wales's patron saint's day, marked by many wearing a daffodil or leek, falls on what date?|El día del santo patrón de Gales, marcado por mucha gente al llevar un narciso o un puerro, cae ¿en qué fecha?|La fête du saint patron du pays de Galles, marquée par le port d'une jonquille ou d'un poireau, tombe à quelle date ?|多くの人が水仙やリーキを身につけて祝う、ウェールズの守護聖人の記念日はいつか?",
    [
      "1 March|1 de marzo|Le 1er mars|3月1日",
      "17 March|17 de marzo|Le 17 mars|3月17日",
      "23 April|23 de abril|Le 23 avril|4月23日",
    ],
    0,
    "Saint David is said to have lived on little but bread, water and wild leeks, which may explain why the vegetable became a national symbol alongside the more decorative daffodil, and schoolchildren across Wales still mark the day with traditional dress and eisteddfod-style performances.|Se dice que san David vivió con poco más que pan, agua y puerros silvestres, lo que quizá explique por qué esa verdura se convirtió en símbolo nacional junto al más decorativo narciso, y los escolares de todo Gales aún celebran el día con trajes tradicionales y actuaciones al estilo eisteddfod.|Saint David aurait vécu presque uniquement de pain, d'eau et de poireaux sauvages, ce qui explique peut-être pourquoi ce légume est devenu symbole national aux côtés de la jonquille, plus décorative, et les écoliers de tout le pays de Galles marquent encore ce jour par des costumes traditionnels et des représentations façon eisteddfod.|聖デイヴィッドはパンと水、野生のリーキだけでほぼ生き延びたと伝わり、これが装飾的な水仙とともにこの野菜が国のシンボルとなった理由かもしれない。ウェールズ各地の子どもたちは今もこの日を伝統衣装とエイステズヴォッド風の出し物で祝う。",
  ),
  q(
    8,
    "Northern Ireland's devolved assembly, known by the name of the estate where it sits, is located in which city?|La asamblea autónoma de Irlanda del Norte, conocida por el nombre de la finca donde tiene su sede, ¿en qué ciudad se encuentra?|L'assemblée dévolue d'Irlande du Nord, connue sous le nom du domaine où elle siège, se trouve dans quelle ville ?|議事堂の敷地名から呼ばれる北アイルランドの自治議会があるのはどの都市か?",
    [
      "Derry|Derry|Derry|デリー",
      "Belfast|Belfast|Belfast|ベルファスト",
      "Armagh|Armagh|Armagh|アーマー",
    ],
    1,
    "The assembly meets at Stormont, a large estate on the edge of the city whose parliament building, opened in 1932, sits at the end of a mile-long straight avenue leading up to its front steps.|La asamblea se reúne en Stormont, una gran finca a las afueras de la ciudad cuyo edificio parlamentario, inaugurado en 1932, se alza al final de una avenida recta de más de un kilómetro y medio que lleva hasta su escalinata.|L'assemblée se réunit à Stormont, un vaste domaine en bordure de la ville dont le bâtiment parlementaire, inauguré en 1932, se dresse au bout d'une avenue rectiligne de plus d'un kilomètre menant à son perron.|議会はベルファスト郊外の広大な敷地ストーモントで開かれる。1932年に開かれたこの議事堂は、正面の階段まで1マイルもまっすぐ延びる並木道の先に建っている。",
  ),
  q(
    8,
    "The \"West Lothian question\" refers to a long-debated puzzle about what, arising from devolution to Scotland, Wales and Northern Ireland?|La «cuestión de West Lothian» se refiere a un enigma largamente debatido sobre ¿qué, surgido de la devolución de poderes a Escocia, Gales e Irlanda del Norte?|La « question du West Lothian » désigne une énigme longuement débattue sur quoi, née de la dévolution vers l'Écosse, le pays de Galles et l'Irlande du Nord ?|スコットランド・ウェールズ・北アイルランドへの権限委譲から生じた、長年議論されてきた問題「ウェスト・ロージアン問題」とは何をめぐるものか?",
    [
      "Which currency devolved regions should use|Qué moneda deberían usar las regiones con poderes devueltos|Quelle monnaie les régions dévolues devraient utiliser|権限委譲地域がどの通貨を使うべきか",
      "Whether devolved regions should have their own flags|Si las regiones con poderes devueltos deberían tener bandera propia|Si les régions dévolues devraient avoir leur propre drapeau|権限委譲地域が独自の旗を持つべきか",
      "Whether their MPs should be allowed to vote at Westminster on matters only affecting England|Si sus diputados deberían poder votar en Westminster sobre asuntos que solo afectan a Inglaterra|Si leurs députés devraient pouvoir voter à Westminster sur des questions ne concernant que l'Angleterre|それらの議員がイングランドにしか関わらない案件でウェストミンスターにて投票できるべきか",
    ],
    2,
    "The puzzle takes its name from the Scottish constituency of a politician who raised it in the 1970s, and it remains unresolved because English voters have no equivalent devolved parliament of their own to balance the arrangement.|El enigma toma su nombre de la circunscripción escocesa de un político que lo planteó en los años setenta, y sigue sin resolverse porque los votantes ingleses no cuentan con un parlamento autonómico propio equivalente que equilibre el arreglo.|L'énigme tire son nom de la circonscription écossaise d'un politicien qui la souleva dans les années 1970, et elle demeure non résolue car les électeurs anglais ne disposent d'aucun parlement dévolu équivalent pour équilibrer ce dispositif.|この問題名は、1970年代にこれを提起した政治家のスコットランドの選挙区名にちなむ。イングランドの有権者にはこの仕組みを釣り合わせるための独自の委譲議会が存在しないため、いまも未解決のままである。",
  ),
  q(
    8,
    "In English cricket folklore, which score, and its multiples, is superstitiously nicknamed \"the Nelson\" and considered unlucky?|En el folclore del críquet inglés, ¿qué marcador, y sus múltiplos, se apoda supersticiosamente «el Nelson» y se considera de mala suerte?|Dans le folklore du cricket anglais, quel score, et ses multiples, est surnommé superstitieusement « le Nelson » et considéré comme malchanceux ?|イングランドのクリケットの言い伝えで、「ネルソン」と呼ばれ縁起が悪いとされる得点(とその倍数)は?",
    [
      "111|111|111|111",
      "100|100|100|100",
      "50|50|50|50",
    ],
    0,
    "The nickname supposedly refers to Admiral Horatio Nelson, jokingly described as having \"one eye, one arm and one leg\", though historically he lost neither a leg nor an eye entirely, and some players and umpires still lift their feet off the ground when the score reaches it.|El apodo supuestamente hace referencia al almirante Horatio Nelson, descrito en broma como con «un ojo, un brazo y una pierna», aunque históricamente no perdió del todo ni una pierna ni un ojo, y algunos jugadores y árbitros aún levantan los pies del suelo cuando el marcador llega a esa cifra.|Le surnom ferait référence à l'amiral Horatio Nelson, décrit en plaisantant comme ayant « un œil, un bras et une jambe », bien qu'historiquement il n'ait perdu ni une jambe ni entièrement un œil, et certains joueurs et arbitres lèvent encore les pieds du sol quand le score l'atteint.|この俗称は、冗談で「片目・片腕・片足」と表現された提督ホレーショ・ネルソンにちなむとされるが、実際には彼は足を失っておらず、片目も完全に失明したわけではなかった。それでも一部の選手や審判は今も、得点がこの数字になると足を地面から浮かせる。",
  ),
  q(
    9,
    "The Act of Settlement of 1701, which still shapes the line of royal succession today, was passed mainly to bar members of which faith from the throne?|El Acta de Establecimiento de 1701, que aún determina hoy el orden de sucesión real, se aprobó sobre todo para excluir del trono a los miembros de ¿qué fe?|L'Acte d'Établissement de 1701, qui façonne encore aujourd'hui l'ordre de succession royale, fut adopté principalement pour exclure du trône les membres de quelle confession ?|今日も王位継承順位を規定している1701年の王位継承法は、主にどの信仰を持つ人々を王位から排除するために制定されたか?",
    [
      "Islam|El islam|L'islam|イスラム教",
      "Roman Catholicism|El catolicismo romano|Le catholicisme romain|ローマ・カトリック",
      "Presbyterianism|El presbiterianismo|Le presbytérianisme|長老派",
    ],
    1,
    "The act ensured the crown would pass to Sophia of Hanover and her Protestant descendants, sidelining dozens of Catholics with a stronger hereditary claim, and its religious bar on the monarch remained in force, with minor amendment, until reforms in 2013.|La ley garantizó que la corona pasara a Sofía de Hannover y sus descendientes protestantes, dejando de lado a decenas de católicos con un derecho hereditario más fuerte, y su veto religioso al monarca siguió vigente, con leves enmiendas, hasta las reformas de 2013.|La loi garantit que la couronne passerait à Sophie de Hanovre et à ses descendants protestants, écartant des dizaines de catholiques ayant pourtant un droit héréditaire plus fort, et son interdit religieux sur le monarque resta en vigueur, avec de légers amendements, jusqu'aux réformes de 2013.|この法律により王位はハノーファーのゾフィーとそのプロテスタントの子孫へ渡ることが定められ、より強い世襲上の権利を持つ数十人のカトリック教徒が退けられた。君主に対するこの信仰上の制限は、わずかな修正を経ながらも2013年の改革まで効力を持ち続けた。",
  ),
  q(
    9,
    "The Act of Union that created the \"United Kingdom of Great Britain and Ireland\" took legal effect on which specific date?|El Acta de Unión que creó el «Reino Unido de Gran Bretaña e Irlanda» entró en vigor legalmente ¿en qué fecha concreta?|L'Acte d'Union qui créa le « Royaume-Uni de Grande-Bretagne et d'Irlande » entra légalement en vigueur à quelle date précise ?|「グレートブリテンおよびアイルランド連合王国」を生み出した合同法が法的に発効した具体的な日付は?",
    [
      "4 July 1800|4 de julio de 1800|Le 4 juillet 1800|1800年7月4日",
      "25 December 1800|25 de diciembre de 1800|Le 25 décembre 1800|1800年12月25日",
      "1 January 1801|1 de enero de 1801|Le 1er janvier 1801|1801年1月1日",
    ],
    2,
    "The new union added the red saltire of Saint Patrick to the flag, completing the version of the Union Jack still used today, even though a separate Irish parliament had voted itself out of existence only months earlier under considerable pressure and bribery.|La nueva unión añadió el sotuer rojo de san Patricio a la bandera, completando la versión de la Union Jack que aún se usa hoy, aunque un parlamento irlandés independiente había votado su propia disolución solo meses antes, bajo considerable presión y sobornos.|La nouvelle union ajouta le sautoir rouge de saint Patrick au drapeau, complétant la version de l'Union Jack encore utilisée aujourd'hui, bien qu'un parlement irlandais distinct eût voté sa propre dissolution quelques mois plus tôt seulement, sous forte pression et à coups de pots-de-vin.|この新たな合同により、旗には聖パトリックの赤い斜め十字が加えられ、今も使われているユニオンジャックの図案が完成した。もっとも、独立していたアイルランド議会はそのわずか数か月前、相当な圧力と買収工作のもとで自らの廃止に票を投じていた。",
  ),
  q(
    9,
    "The Severn Estuary's tidal range is often ranked as the world's second-largest, behind only which Canadian bay?|El rango de marea del estuario del Severn suele situarse como el segundo mayor del mundo, solo por detrás de ¿qué bahía canadiense?|L'amplitude de marée de l'estuaire de la Severn est souvent classée deuxième au monde, juste derrière quelle baie canadienne ?|セヴァン河口の潮汐差は、あるカナダの湾に次いで世界第2位とされることが多いが、その湾とは?",
    [
      "The Bay of Fundy|La bahía de Fundy|La baie de Fundy|ファンディ湾",
      "Hudson Bay|La bahía de Hudson|La baie d'Hudson|ハドソン湾",
      "James Bay|La bahía James|La baie James|ジェームズ湾",
    ],
    0,
    "Various measurement methods and locations produce slightly different rankings worldwide, but the Severn's tidal range consistently places among the top handful globally, a resource that has repeatedly attracted, and so far defeated, proposals to build a tidal barrage across it for electricity generation.|Distintos métodos y lugares de medición producen clasificaciones ligeramente diferentes en todo el mundo, pero el rango de marea del Severn se sitúa siempre entre los primeros del planeta, un recurso que ha atraído repetidamente, y hasta ahora frustrado, propuestas de construir una presa de marea para generar electricidad.|Diverses méthodes et divers lieux de mesure produisent des classements légèrement différents à travers le monde, mais l'amplitude de marée de la Severn se situe invariablement parmi les toutes premières du globe, une ressource qui a répétitivement attiré, et jusqu'ici mis en échec, des projets de barrage marémoteur pour produire de l'électricité.|測定方法や場所によって世界の順位は多少変わるものの、セヴァンの潮汐差は常に世界屈指の上位に入る。この資源は発電用の潮汐堰を建設する構想を何度も引き寄せてきたが、いまだに実現には至っていない。",
  ),
  q(
    9,
    "A popular but historically dubious legend claims the 1,435mm standard rail gauge ultimately traces back to the wheel spacing of what?|Una leyenda popular, aunque históricamente dudosa, afirma que el ancho de vía estándar de 1.435 mm se remonta en último término a la separación de ruedas de ¿qué?|Une légende populaire, mais historiquement douteuse, affirme que l'écartement standard de 1 435 mm remonte en fin de compte à l'écartement des roues de quoi ?|標準軌1435mmの起源は、ある物の車輪間隔にまでさかのぼるという、人気ではあるが歴史的には疑わしい伝説があるが、その「ある物」とは?",
    [
      "Medieval siege engines|Máquinas de asedio medievales|Des engins de siège médiévaux|中世の攻城兵器",
      "Ancient Roman war chariots|Antiguos carros de guerra romanos|D'antiques chars de guerre romains|古代ローマの戦車",
      "Viking longships|Drakkars vikingos|Des drakkars vikings|ヴァイキングの長船",
    ],
    1,
    "The story claims Roman roads wore ruts of a particular width that later carts, then wagonways, then railways all had to match, but historians and archaeologists have found no solid evidence connecting Roman roads to any specific standard, and most trace the real explanation instead to 18th- and 19th-century mining wagonways.|La historia sostiene que las calzadas romanas dejaron surcos de una anchura concreta que después carros, luego vagonetas y por último ferrocarriles tuvieron que igualar, pero historiadores y arqueólogos no han hallado pruebas sólidas que conecten las calzadas romanas con ningún estándar específico, y la mayoría remonta la explicación real a las vagonetas mineras de los siglos XVIII y XIX.|L'histoire prétend que les routes romaines creusaient des ornières d'une largeur précise que les charrettes, puis les voies de chariots, puis les chemins de fer durent ensuite tous respecter, mais historiens et archéologues n'ont trouvé aucune preuve solide reliant les routes romaines à un quelconque standard précis, et la plupart font remonter l'explication réelle aux voies de chariots miniers des XVIIIe et XIXe siècles.|この話では、ローマの道路が特定の幅のわだちを刻み、それに後の荷車や鉱山の貨車軌道、そして鉄道までもが合わせ続けたとされる。しかし歴史家や考古学者は、ローマの道路と特定の規格とを結びつける確かな証拠を見つけておらず、実際の由来は多くの場合18〜19世紀の鉱山の貨車軌道にさかのぼるとされている。",
  ),
  q(
    9,
    "Britain's national mapping agency, the Ordnance Survey, was founded in 1791 mainly for what original purpose?|La agencia cartográfica nacional de Gran Bretaña, la Ordnance Survey, se fundó en 1791 principalmente ¿con qué propósito original?|L'agence cartographique nationale de Grande-Bretagne, l'Ordnance Survey, fut fondée en 1791 principalement dans quel but originel ?|イギリスの国立地図作成機関「オードナンス・サーベイ」が1791年に設立された、本来の主な目的は?",
    [
      "To settle property boundary disputes|Resolver disputas sobre linderos de propiedades|Régler des litiges de bornage foncier|土地境界紛争の解決",
      "To help plan the national canal network|Ayudar a planificar la red nacional de canales|Aider à planifier le réseau national de canaux|全国の運河網の計画立案",
      "Military mapping, especially of the Scottish Highlands after the Jacobite risings|La cartografía militar, sobre todo de las Tierras Altas escocesas tras los levantamientos jacobitas|La cartographie militaire, notamment des Highlands écossais après les soulèvements jacobites|ジャコバイトの蜂起後、特にスコットランド高地を対象とした軍事地図の作成",
    ],
    2,
    "Fears of further rebellion and, later, of invasion from revolutionary France pushed the government to fund accurate maps that soldiers could use to move troops quickly, and the agency's detailed civilian maps only became its main output long after those original military concerns had faded.|El temor a nuevas rebeliones y, después, a una invasión de la Francia revolucionaria llevó al gobierno a financiar mapas precisos que los soldados pudieran usar para desplazar tropas con rapidez, y los detallados mapas civiles de la agencia solo se convirtieron en su principal producto mucho después de que aquellas preocupaciones militares originales se desvanecieran.|La crainte de nouvelles rébellions puis d'une invasion par la France révolutionnaire poussa le gouvernement à financer des cartes précises que les soldats pouvaient utiliser pour déplacer rapidement les troupes, et les cartes civiles détaillées de l'agence ne devinrent sa principale production que bien après que ces préoccupations militaires initiales se furent estompées.|反乱の再発や、のちには革命フランスからの侵攻への懸念から、政府は兵を素早く動かすのに使える正確な地図の作成に資金を投じた。この機関の詳細な民生用地図が主な仕事になったのは、こうした当初の軍事的な懸念がすっかり薄れたずっと後のことである。",
  ),
  q(
    9,
    "What are England's \"ceremonial counties\", such as those used for the office of Lord-Lieutenant, mainly used for today?|¿Para qué se usan hoy sobre todo los «condados ceremoniales» de Inglaterra, como los empleados para el cargo de Lord Teniente?|À quoi servent surtout aujourd'hui les « comtés cérémoniels » d'Angleterre, comme ceux utilisés pour la fonction de Lord-Lieutenant ?|ロード・リューテナント(名誉知事)の管轄などに使われる、イングランドの「儀礼的カウンティ」は今日主に何のために用いられているか?",
    [
      "Ceremony and tradition, largely detached from local government boundaries|Ceremonias y tradición, en gran medida desligadas de los límites del gobierno local|La cérémonie et la tradition, largement détachées des limites de l'administration locale|地方自治体の境界とはほぼ切り離された、儀礼と伝統のため",
      "Collecting local taxes|Recaudar impuestos locales|Collecter les impôts locaux|地方税の徴収",
      "Running regional police forces exclusively|Dirigir exclusivamente las fuerzas policiales regionales|Diriger exclusivement les forces de police régionales|地域警察の運営専用",
    ],
    0,
    "Local government reorganisations, especially in 1974, redrew the practical administrative map so many times that today's ceremonial counties often no longer match the areas actually run by local councils, leaving some places with a ceremonial county that differs from their everyday postal or council address.|Las reorganizaciones del gobierno local, sobre todo en 1974, redibujaron tantas veces el mapa administrativo práctico que los condados ceremoniales de hoy a menudo ya no coinciden con las áreas realmente gestionadas por los ayuntamientos, dejando a algunos lugares con un condado ceremonial distinto de su dirección postal o municipal cotidiana.|Les réorganisations de l'administration locale, notamment en 1974, redessinèrent tant de fois la carte administrative pratique que les comtés cérémoniels d'aujourd'hui ne correspondent souvent plus aux zones réellement gérées par les conseils locaux, laissant certains lieux avec un comté cérémoniel différent de leur adresse postale ou municipale quotidienne.|とりわけ1974年の地方行政再編によって実務上の行政地図は何度も引き直され、今日の儀礼的カウンティは実際に地方議会が運営する地域としばしば一致しなくなっている。日常の郵便住所や自治体とは異なる儀礼的カウンティに属する場所も少なくない。",
  ),
  q(
    9,
    "The historic \"Auld Alliance\", first formalised in 1295 and repeatedly invoked against England, was a diplomatic and military partnership between Scotland and which country?|La histórica «Auld Alliance», formalizada por primera vez en 1295 e invocada repetidamente contra Inglaterra, era una alianza diplomática y militar entre Escocia y ¿qué país?|La fameuse « Auld Alliance », formalisée pour la première fois en 1295 et invoquée à plusieurs reprises contre l'Angleterre, était un partenariat diplomatique et militaire entre l'Écosse et quel pays ?|1295年に初めて正式化され、対イングランドの場面で繰り返し呼び起こされた歴史的な「オールド・アライアンス」は、スコットランドとどの国のあいだの外交・軍事的な連携だったか?",
    [
      "Denmark|Dinamarca|Le Danemark|デンマーク",
      "France|Francia|La France|フランス",
      "Spain|España|L'Espagne|スペイン",
    ],
    1,
    "The alliance shaped centuries of Scottish culture, from imported wine and legal terms to a reported historical right for Scots to claim French citizenship, and though it lost its military relevance after 1560, the phrase is still invoked today as a symbol of Franco-Scottish friendship.|La alianza dio forma a siglos de cultura escocesa, desde el vino importado y términos legales hasta un supuesto derecho histórico de los escoceses a reclamar la ciudadanía francesa, y aunque perdió su relevancia militar después de 1560, la frase aún se invoca hoy como símbolo de la amistad franco-escocesa.|L'alliance façonna des siècles de culture écossaise, du vin importé aux termes juridiques en passant par un prétendu droit historique des Écossais à revendiquer la citoyenneté française, et bien qu'elle ait perdu sa pertinence militaire après 1560, l'expression est encore invoquée aujourd'hui comme symbole de l'amitié franco-écossaise.|この同盟は、輸入されたワインや法律用語から、スコットランド人がフランス市民権を主張できたとされる歴史的な権利まで、スコットランドの文化を何世紀にもわたって形作った。1560年以降は軍事的な意味を失ったものの、この言葉は今も仏蘇友好の象徴として引き合いに出される。",
  ),
  q(
    10,
    "Precisely how wide was Isambard Kingdom Brunel's original broad gauge on the Great Western Railway?|¿Cuál era exactamente el ancho de la vía ancha original de Isambard Kingdom Brunel en el Great Western Railway?|Quelle était précisément la largeur de l'écartement large d'origine d'Isambard Kingdom Brunel sur le Great Western Railway ?|イザムバード・キングダム・ブルネルがグレート・ウェスタン鉄道で採用した広軌の正確な幅は?",
    [
      "6 feet exactly|Exactamente 6 pies|Exactement 6 pieds|正確に6フィート",
      "6 feet 6 inches|6 pies 6 pulgadas|6 pieds 6 pouces|6フィート6インチ",
      "7 feet and a quarter of an inch|7 pies y un cuarto de pulgada|7 pieds et un quart de pouce|7フィートと4分の1インチ",
    ],
    2,
    "Brunel chose the unusually wide measurement to allow larger wheels and lower-slung carriages for a smoother, faster ride, and the last remaining stretch of it was converted to standard gauge over a single weekend in May 1892, with hundreds of workers moving rails along the entire line.|Brunel eligió esa medida inusualmente ancha para permitir ruedas más grandes y vagones más bajos, con un viaje más suave y rápido, y el último tramo restante se convirtió a ancho estándar en un solo fin de semana de mayo de 1892, con cientos de obreros moviendo raíles a lo largo de toda la línea.|Brunel choisit cette mesure inhabituellement large pour permettre des roues plus grandes et des voitures plus basses, pour un trajet plus doux et plus rapide, et le dernier tronçon restant fut converti à l'écartement standard en un seul week-end de mai 1892, avec des centaines d'ouvriers déplaçant les rails sur toute la ligne.|ブルネルはより大きな車輪と低い車体を実現し、乗り心地を滑らかで速くするため、この異例の広さを選んだ。最後まで残っていた区間も1892年5月のたった一度の週末で標準軌へと改修され、路線全体で何百人もの作業員がレールを移設した。",
  ),
  q(
    10,
    "The Laws in Wales Acts of 1535 and 1542, which legally incorporated Wales into the Kingdom of England, were passed under which monarch?|Las Leyes de Gales de 1535 y 1542, que incorporaron legalmente Gales al Reino de Inglaterra, se aprobaron bajo ¿qué monarca?|Les Laws in Wales Acts de 1535 et 1542, qui incorporèrent légalement le pays de Galles au royaume d'Angleterre, furent adoptées sous quel monarque ?|ウェールズを法的にイングランド王国へ組み込んだ1535年・1542年の「ウェールズ法」は、どの君主のもとで制定されたか?",
    [
      "Henry VIII|Enrique VIII|Henri VIII|ヘンリー8世",
      "Edward I|Eduardo I|Édouard Ier|エドワード1世",
      "Elizabeth I|Isabel I|Élisabeth Ire|エリザベス1世",
    ],
    0,
    "The acts abolished Welsh marcher lordships, extended English law and administrative structure across Wales, and required legal proceedings to be conducted in English, a language shift that took centuries to fully unwind through later devolution and language-protection laws.|Las leyes abolieron los señoríos fronterizos galeses, extendieron la ley y la estructura administrativa inglesas por todo Gales, y exigieron que los procedimientos legales se llevaran en inglés, un cambio lingüístico que tardó siglos en revertirse plenamente mediante la posterior devolución y las leyes de protección del idioma.|Les lois abolirent les seigneuries des marches galloises, étendirent le droit et la structure administrative anglais à tout le pays de Galles, et exigèrent que les procédures judiciaires se déroulent en anglais, un basculement linguistique qui mit des siècles à se défaire pleinement grâce à la dévolution ultérieure et aux lois de protection de la langue.|この法律によりウェールズの辺境領主制は廃止され、イングランドの法律と行政の仕組みがウェールズ全域に広げられ、裁判手続きは英語で行うことが義務づけられた。この言語上の変化が完全に巻き戻されるまでには、後の権限委譲や言語保護法を経て何世紀もかかった。",
  ),
  q(
    10,
    "Britain's only attempt at a double-deck passenger train, tested on the line out of London Bridge between 1949 and 1971, was abandoned mainly because the tight loading gauge caused what problem?|El único intento británico de un tren de pasajeros de dos pisos, probado en la línea desde London Bridge entre 1949 y 1971, se abandonó sobre todo porque el estrecho gálibo causaba ¿qué problema?|La seule tentative britannique de train de voyageurs à deux étages, testée sur la ligne au départ de London Bridge entre 1949 et 1971, fut abandonnée surtout parce que le gabarit étroit causait quel problème ?|1949年から1971年までロンドン・ブリッジ発の路線で試験されたイギリス唯一の2階建て旅客列車の試みは、狭い車両限界が引き起こしたどんな問題のために主に断念されたか?",
    [
      "Constant mechanical breakdowns|Averías mecánicas constantes|Des pannes mécaniques constantes|絶え間ない機械故障",
      "Ceilings so low inside that boarding and alighting became too slow|Techos interiores tan bajos que subir y bajar se volvía demasiado lento|Des plafonds intérieurs si bas que la montée et la descente devenaient trop lentes|車内の天井が低すぎて乗降に時間がかかりすぎた",
      "The extra weight made it too slow to accelerate|El peso extra lo hacía demasiado lento para acelerar|Le poids supplémentaire le rendait trop lent à accélérer|重量増加で加速が遅すぎた",
    ],
    1,
    "The 4-DD units squeezed extra seats into a low upper deck to fit under the network's Victorian-era bridges and tunnels, but passengers had to stoop through the cramped doorways, and the resulting delays at busy stations outweighed the capacity gained, so the design was never repeated anywhere else on the network.|Las unidades 4-DD apretaban asientos extra en un piso superior bajo para caber bajo los puentes y túneles de la era victoriana de la red, pero los pasajeros tenían que agacharse por las puertas estrechas, y los retrasos resultantes en las estaciones concurridas superaban la capacidad ganada, así que el diseño nunca se repitió en ningún otro punto de la red.|Les rames 4-DD entassaient des sièges supplémentaires dans un étage supérieur bas pour tenir sous les ponts et tunnels de l'époque victorienne du réseau, mais les voyageurs devaient se baisser pour passer les portes exiguës, et les retards qui en résultaient dans les gares fréquentées dépassaient le gain de capacité, si bien que ce modèle ne fut jamais repris ailleurs sur le réseau.|4-DD編成は、ヴィクトリア朝時代に建設された路線の橋やトンネルの下をくぐるため、低い上階に追加の座席を詰め込んだが、乗客は狭い出入口をかがんで通らねばならず、混雑する駅での遅れが定員増加のメリットを上回った。そのためこの設計は路線網の他のどこでも繰り返されることはなかった。",
  ),
  q(
    10,
    "The \"Bloody Assizes\" of 1685, a series of harsh trials led by Judge George Jeffreys, followed the failure of which rebellion?|Las «Bloody Assizes» de 1685, una serie de duros juicios dirigidos por el juez George Jeffreys, siguieron al fracaso de ¿qué rebelión?|Les « Bloody Assizes » de 1685, une série de procès brutaux menés par le juge George Jeffreys, firent suite à l'échec de quelle rébellion ?|判事ジョージ・ジェフリーズが主導した過酷な一連の裁判「流血巡回裁判」(1685年)は、どの反乱の失敗を受けて行われたか?",
    [
      "The Jacobite rising of 1715|El levantamiento jacobita de 1715|Le soulèvement jacobite de 1715|1715年のジャコバイトの蜂起",
      "The Monmouth Rebellion|La rebelión de Monmouth|La rébellion de Monmouth|モンマスの反乱",
      "The Gunpowder Plot|El complot de la pólvora|La conspiration des poudres|火薬陰謀事件",
    ],
    1,
    "The Duke of Monmouth's failed attempt to seize the throne from his uncle James II ended with hundreds of his supporters in the West Country executed or transported to the colonies after brief, one-sided trials, and Jeffreys's brutal reputation earned him the nickname \"the Hanging Judge\".|El fallido intento del duque de Monmouth de arrebatar el trono a su tío Jacobo II terminó con cientos de sus partidarios en el suroeste de Inglaterra ejecutados o deportados a las colonias tras juicios breves y unilaterales, y la brutal reputación de Jeffreys le valió el apodo de «el juez de la horca».|La tentative ratée du duc de Monmouth d'arracher le trône à son oncle Jacques II se solda par l'exécution ou la déportation vers les colonies de centaines de ses partisans dans le sud-ouest de l'Angleterre, à l'issue de procès brefs et à charge, et la réputation brutale de Jeffreys lui valut le surnom de « juge pendeur ».|モンマス公が叔父ジェームズ2世から王位を奪おうとした試みが失敗に終わると、イングランド南西部の支持者数百人が短く一方的な裁判のすえ処刑されるか植民地へ流刑となった。ジェフリーズの容赦ない評判は彼に「絞首判事」という異名を与えた。",
  ),
  q(
    10,
    "In what year was the Bank of England, set up partly to help fund a war against France, founded?|¿En qué año se fundó el Banco de Inglaterra, creado en parte para ayudar a financiar una guerra contra Francia?|En quelle année la Banque d'Angleterre, créée en partie pour aider à financer une guerre contre la France, fut-elle fondée ?|フランスとの戦争資金を賄う目的も兼ねて設立された、イングランド銀行の設立年は?",
    [
      "1694|1694|1694|1694年",
      "1750|1750|1750|1750年",
      "1815|1815|1815|1815年",
    ],
    0,
    "The bank was a private institution for over two centuries before being nationalised in 1946, and its nickname, \"the Old Lady of Threadneedle Street\", comes from the London street where its headquarters still stands.|El banco fue una institución privada durante más de dos siglos antes de nacionalizarse en 1946, y su apodo, «la Vieja Dama de Threadneedle Street», viene de la calle londinense donde aún se alza su sede.|La banque fut une institution privée pendant plus de deux siècles avant d'être nationalisée en 1946, et son surnom, « la Vieille Dame de Threadneedle Street », vient de la rue londonienne où se dresse encore son siège.|イングランド銀行は1946年に国有化されるまで2世紀以上にわたり民間の機関だった。「スレッドニードル街の老婦人」という愛称は、いまも本店が建つロンドンの通りの名にちなむ。",
  ),
];
